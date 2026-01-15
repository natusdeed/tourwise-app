'use client'

import { motion } from 'framer-motion'
import { Search, Send, AlertCircle, Sparkles } from 'lucide-react'
import { useState, FormEvent, useEffect, useRef } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import { generatePDF, Resolution } from 'react-to-pdf'
import Script from 'next/script'
import type { NicheColorScheme } from '@/lib/niche-config'
import { create3DTextShadow, create3DLightTextShadow } from '@/lib/color-utils'
import { extractOriginAndDestination, getIATACode, isCityRecognized } from '@/lib/iata-codes'
import { getValidDepartureDate, formatDateForAviasales } from '@/lib/date-utils'
import { generateProductSchema } from '@/lib/seo'
import { detectLocation, getDetectedCity, verifyIPinfoConfig } from '@/lib/detectLocation'

interface HeroProps {
  title: string
  subtitle: string
  placeholder: string
  description?: string
  colors: NicheColorScheme
  backgroundImage?: string
}

/**
 * Build Aviasales search URL with proper formatting
 * @param originCode - Origin IATA code (e.g., 'HOU')
 * @param destinationCode - Destination IATA code (e.g., 'LOS')
 * @param departDate - Departure date (defaults to next Friday)
 * @returns Formatted Aviasales URL
 */
function buildAviasalesUrl(
  originCode: string | null,
  destinationCode: string | null,
  departDate?: Date
): string {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '692947'
  const baseUrl = 'https://search.aviasales.com/flights/'
  
  // Use provided date or default to next Friday
  const date = departDate || getValidDepartureDate()
  const formattedDate = formatDateForAviasales(date)
  
  // Default to empty strings if codes not provided (Aviasales will handle it)
  const origin = originCode || ''
  const destination = destinationCode || ''
  
  const params = new URLSearchParams({
    origin_iata: origin,
    destination_iata: destination,
    depart_date: formattedDate,
    adults: '1',
    children: '0',
    infants: '0',
    trip_class: '0',
    marker: marker,
    with_request: 'true',
  })
  
  return `${baseUrl}?${params.toString()}`
}

export default function Hero({ title, subtitle, placeholder, description, colors, backgroundImage }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAccessingMarketData, setIsAccessingMarketData] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [itinerary, setItinerary] = useState<string | null>(null)
  const [flightData, setFlightData] = useState<{ price: number; currency: string; airline: string; destination: string; origin?: string } | null>(null)
  const [destinationCode, setDestinationCode] = useState<string | null>(null)
  const [originCode, setOriginCode] = useState<string | null>(null)
  const [cityError, setCityError] = useState<string | null>(null)
  const [aviasalesUrl, setAviasalesUrl] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [detectedCity, setDetectedCity] = useState<string | null>(null)
  const [locationDetected, setLocationDetected] = useState(false)
  const itineraryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-detect location on page load
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    let isCancelled = false

    // Verify IPinfo is configured (development only)
    if (process.env.NODE_ENV === 'development') {
      verifyIPinfoConfig()
    }

    const detectUserLocation = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Hero] Starting location detection...')
        }

        // Wrap in additional try-catch to prevent any errors from bubbling up
        const city = await Promise.resolve(getDetectedCity()).catch(() => null)
        
        // Check if component is still mounted before updating state
        if (!isCancelled && city) {
          setDetectedCity(city)
          setLocationDetected(true)
          // Pre-fill search query with detected city
          setSearchQuery(`Traveling from ${city}? Where to next?`)
          
          if (process.env.NODE_ENV === 'development') {
            console.log('[Hero] Location detected and search query updated:', city)
          }
        } else if (!isCancelled && process.env.NODE_ENV === 'development') {
          console.log('[Hero] Location detection completed but no city found')
        }
      } catch (error) {
        // Silently fail - don't show error to user
        // Errors are already handled in detectLocation utility
        // This catch is a safety net
        if (!isCancelled && process.env.NODE_ENV === 'development') {
          // Only log in development, never throw
          console.warn('[Hero] Location detection failed (caught in component):', error)
        }
      }
    }

    // Defer location detection to avoid blocking initial render
    // Use requestIdleCallback if available, otherwise use a longer timeout
    let timeoutId: ReturnType<typeof setTimeout> | number | null = null
    
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      timeoutId = requestIdleCallback(() => {
        detectUserLocation()
      }, { timeout: 2000 }) as unknown as number
    } else {
      timeoutId = setTimeout(() => {
        detectUserLocation()
      }, 2000) // Increased delay to 2 seconds
    }

    // Cleanup function
    return () => {
      isCancelled = true
      if (timeoutId !== null) {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          cancelIdleCallback(timeoutId as number)
        } else {
          clearTimeout(timeoutId as ReturnType<typeof setTimeout>)
        }
      }
    }
  }, [isMounted])

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Auto-dismiss city error after 5 seconds
  useEffect(() => {
    if (cityError) {
      const timer = setTimeout(() => {
        setCityError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [cityError])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)
    setCityError(null)
    setItinerary(null)
    setFlightData(null)
    setDestinationCode(null)
    setOriginCode(null)
    setAviasalesUrl(null)

    try {
      // Check if we're online first (only in browser)
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && !navigator.onLine) {
        throw new Error('No internet connection. Please check your network settings.')
      }

      // Check if query mentions price/deals to show market data indicator
      const queryLower = searchQuery.trim().toLowerCase()
      const shouldAccessMarketData = queryLower.includes('cheap') || 
                                    queryLower.includes('deal') || 
                                    queryLower.includes('price') || 
                                    queryLower.includes('cost') || 
                                    queryLower.includes('affordable') || 
                                    queryLower.includes('budget') ||
                                    queryLower.includes('best price')
      
      // Set market data indicator after a short delay to show it's happening
      if (shouldAccessMarketData) {
        setTimeout(() => setIsAccessingMarketData(true), 2000) // Show after 2 seconds of loading
      }

      // Extract origin and destination codes from query
      const { origin, destination } = extractOriginAndDestination(searchQuery.trim())
      
      // Validate that at least destination is recognized
      if (!destination) {
        setCityError('Please enter a valid city name.')
        setIsLoading(false)
        return
      }

      setOriginCode(origin)
      setDestinationCode(destination)

      // Build Aviasales URL with validated date
      const departDate = getValidDepartureDate(searchQuery.trim())
      const url = buildAviasalesUrl(origin, destination, departDate)
      setAviasalesUrl(url)

      // Call Gemini API to generate travel itinerary
      // Gemini will automatically call searchFlightPrices if user asks about prices/deals
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 45000) // 45 second timeout (server has 30s, give buffer)
      
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery.trim(),
          originCode: origin,
          destinationCode: destination,
        }),
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        // Use the error message from API if available, otherwise provide a helpful default
        const errorMessage = errorData.error || `Request failed with status ${response.status}. Please try again.`
        throw new Error(errorMessage)
      }

      const data = await response.json()
      
      if (data.success && data.itinerary) {
        setItinerary(data.itinerary)
        
        // Update flight data if Gemini found live pricing
        if (data.flightData) {
          setFlightData({
            price: data.flightData.price,
            currency: data.flightData.currency || 'USD',
            airline: data.flightData.airline || 'Multiple Airlines',
            destination: data.flightData.destination || destination || '',
            origin: data.flightData.origin || origin || '',
          })
        }
      } else {
        // If response doesn't have success flag, check for error message
        const errorMsg = data.error || 'Unable to generate itinerary. Please try again.'
        throw new Error(errorMsg)
      }
      
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError' || err.name === 'TimeoutError') {
          setError('Request timed out. The AI service is taking longer than expected. Please try again with a simpler query.')
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('Network')) {
          setError('Network error. Please check your internet connection and try again.')
        } else {
          // Use the specific error message from the API
          setError(err.message)
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
      setIsAccessingMarketData(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-3">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={backgroundImage}
              alt="Hero background"
              fill
              priority
              quality={85}
              className="object-cover"
              style={{ objectPosition: 'center' }}
              sizes="100vw"
            />
          </div>
        </div>
      )}

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 heading-robotic px-2"
        >
          <span className="text-gradient">
            {title}
          </span>
          <br />
          <span className="text-gradient">
            {subtitle}
          </span>
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div 
              className="relative glass-strong rounded-lg border border-glow-hover overflow-hidden"
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className="flex items-center">
                <div className="pl-4 pr-2">
                  <Search className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isLoading 
                      ? 'Thinking...' 
                      : locationDetected && detectedCity
                        ? `Traveling from ${detectedCity}? Where to next?`
                        : placeholder
                  }
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 py-4 md:py-5 text-sm md:text-base w-full disabled:opacity-70 disabled:cursor-wait"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 md:px-6 py-4 md:py-5 min-h-[48px] disabled:cursor-not-allowed transition-all duration-300 text-black font-semibold heading-robotic text-sm md:text-base flex items-center gap-2 group hover:scale-[1.005] hover:shadow-lg hover:shadow-cyan-500/5"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                  }}
                >
                  <span>
                    {isAccessingMarketData 
                      ? 'ACCESSING LIVE MARKET DATA...' 
                      : isLoading 
                        ? 'THINKING...' 
                        : 'SEARCH'}
                  </span>
                  {isLoading ? (
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                  ) : (
                    <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-[0.1px] transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {/* Loading Message */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <div 
                className="glass-strong rounded-lg border border-glow-hover px-6 py-4 flex items-center gap-3"
                style={{ 
                  borderColor: `${colors.primary}40`,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  boxShadow: `0 0 20px ${colors.glowColor}30`
                }}
              >
                <Sparkles className="w-5 h-5 animate-pulse" style={{ color: colors.primary }} />
                <p className="text-white/90 text-sm md:text-base heading-robotic" style={{ color: colors.primary }}>
                  {isAccessingMarketData 
                    ? 'Accessing Live Market Data...' 
                    : 'Consulting the AI Travel Expert...'}
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 max-w-2xl mx-auto"
            >
              <div 
                className="glass-strong rounded-lg border border-red-500/50 bg-red-500/10 px-6 py-4 flex items-start gap-3"
                style={{ 
                  borderColor: 'rgba(239, 68, 68, 0.5)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)'
                }}
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-400 text-sm md:text-base font-medium">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* City Validation Error Message */}
          {cityError && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 max-w-2xl mx-auto"
            >
              <div 
                className="glass-strong rounded-lg border border-yellow-500/50 bg-yellow-500/10 px-4 py-3 flex items-start gap-3"
                style={{ 
                  borderColor: 'rgba(234, 179, 8, 0.5)',
                  backgroundColor: 'rgba(234, 179, 8, 0.1)'
                }}
              >
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-yellow-400 text-xs md:text-sm font-medium">{cityError}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Itinerary Response */}
          {itinerary && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-4xl mx-auto"
            >
              <div 
                ref={itineraryRef}
                className="glass-strong rounded-lg border border-glow-hover p-6 md:p-8 overflow-hidden"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  boxShadow: '0 8px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <Sparkles className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 
                    className="text-lg md:text-xl font-bold heading-robotic"
                    style={{ color: colors.primary }}
                  >
                    YOUR AI-GENERATED ITINERARY
                  </h3>
                </div>

                {/* Itinerary Content */}
                <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="prose prose-invert prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-ul:text-white/90 prose-li:text-white/90 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0" style={{ color: colors.primary }}>
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-bold mb-3 mt-5" style={{ color: colors.primary }}>
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold mb-2 mt-4" style={{ color: colors.secondary }}>
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-3 text-white/90 leading-relaxed">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 space-y-2 text-white/90">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 space-y-2 text-white/90">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="ml-4">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-white">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-white/95">{children}</em>
                        ),
                      }}
                    >
                      {itinerary}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Product Schema for AI Overviews - Critical for 2026 SEO */}
                {flightData && flightData.price && (
                  <Script
                    id="product-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(
                        generateProductSchema({
                          name: `Flight Deal: ${flightData.origin || 'Various'} to ${flightData.destination}`,
                          description: `Real-time flight deal from ${flightData.airline} for ${flightData.origin || 'Various'} to ${flightData.destination}`,
                          price: flightData.price,
                          currency: flightData.currency || 'USD',
                          availability: 'https://schema.org/InStock',
                          url: aviasalesUrl || 'https://tourwiseai.com',
                          brand: flightData.airline,
                          category: 'Travel',
                        })
                      ),
                    }}
                  />
                )}

                {/* LIVE DEAL Card - Enhanced with BOOK NOW button */}
                {flightData && flightData.price && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="mt-6 mb-6 p-6 rounded-xl border-2 relative overflow-hidden"
                    style={{
                      borderColor: '#10b981',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Animated background glow */}
                    <div 
                      className="absolute inset-0 opacity-20 animate-pulse"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                      }}
                    />
                    
                    <div className="relative z-10">
                      {/* Header with LIVE DEAL badge */}
                      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold heading-robotic text-white animate-pulse"
                            style={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              boxShadow: '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)'
                            }}
                          >
                            <span className="relative flex h-2 w-2 mr-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            ✈️ LIVE DEAL
                          </span>
                        </div>
                      </div>

                      {/* Price and Route Info */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl md:text-5xl font-bold heading-robotic" style={{ color: '#10b981' }}>
                            ${flightData.price}
                          </span>
                          <span className="text-white/70 text-sm md:text-base">
                            {flightData.currency || 'USD'}
                          </span>
                        </div>
                        <p className="text-white/90 text-sm md:text-base mb-1">
                          <span className="font-semibold">{flightData.airline}</span>
                          {flightData.origin && flightData.destination && (
                            <span className="text-white/70">
                              {' '}• {flightData.origin} → {flightData.destination}
                            </span>
                          )}
                        </p>
                        <p className="text-white/60 text-xs md:text-sm">
                          Real-time price • May change soon
                        </p>
                      </div>

                      {/* BOOK NOW Button */}
                      {aviasalesUrl && (
                        <a
                          href={aviasalesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-4 rounded-lg font-bold heading-robotic text-lg md:text-xl text-white transition-all duration-300 relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              <span>🚀</span>
                              <span>BOOK NOW</span>
                              <span>→</span>
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                          </motion.button>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={async () => {
                      if (itineraryRef.current) {
                        try {
                          await generatePDF(itineraryRef, {
                            filename: 'TourWise-Itinerary.pdf',
                            resolution: Resolution.HIGH,
                            page: {
                              format: 'A4',
                              margin: '10mm',
                            },
                            canvas: {
                              mimeType: 'image/png',
                              qualityRatio: 1,
                            },
                          })
                        } catch (error) {
                          console.error('Error generating PDF:', error)
                          setError('Failed to generate PDF. Please try again.')
                        }
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{
                      borderColor: colors.primary,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: 'white',
                      boxShadow: `0 0 10px ${colors.primary}40`
                    }}
                  >
                    <span className="text-lg">📥</span>
                    <span className="text-sm heading-robotic font-medium">DOWNLOAD AS PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setItinerary(null)
                      setSearchQuery('')
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      borderColor: `${colors.primary}40`,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: colors.primary
                    }}
                  >
                    <span className="text-sm heading-robotic font-medium">CREATE NEW SEARCH</span>
                  </button>
                </div>

                {/* Search Live Deals CTA */}
                {aviasalesUrl && destinationCode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6"
                  >
                    <a
                      href={aviasalesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-lg font-bold heading-robotic text-lg md:text-xl text-white transition-all duration-300 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          boxShadow: '0 0 30px rgba(16, 185, 129, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <span>✈️</span>
                          <span>SEARCH LIVE DEALS ON AVIASALES</span>
                          <span>→</span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.button>
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick-Link Bar - High Revenue Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 md:mt-8 max-w-3xl mx-auto px-4"
        >
          <div 
            className="glass-strong rounded-lg border border-glow-hover px-4 md:px-6 py-3 md:py-4"
            style={{ 
              borderColor: `${colors.primary}30`,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 justify-items-center">
              {/* Cheap Flights Button */}
              <motion.a
                href="https://www.aviasales.com/search?marker=692947"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.005, y: -0.2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-2 px-3 md:px-4 py-3 rounded-md transition-all duration-300 cursor-pointer min-h-[48px] w-full max-w-[200px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.primary}20`
                }}
              >
                <span className="text-lg md:text-xl">✈️</span>
                <span 
                  className="text-xs md:text-sm font-medium heading-robotic whitespace-nowrap transition-all duration-300 relative z-10"
                  style={{
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Cheap Flights
                </span>
                {/* Neon-blue glow on hover */}
                <div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md pointer-events-none"
                  style={{ 
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.primary}40`
                  }}
                />
              </motion.a>

              {/* Best Hotels Button */}
              <motion.a
                href="https://www.aviasales.com/search?marker=692947"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.005, y: -0.2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-2 px-3 md:px-4 py-3 rounded-md transition-all duration-300 cursor-pointer min-h-[48px] w-full max-w-[200px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.primary}20`
                }}
              >
                <span className="text-lg md:text-xl">🏨</span>
                <span 
                  className="text-xs md:text-sm font-medium heading-robotic whitespace-nowrap transition-all duration-300 relative z-10"
                  style={{
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Best Hotels
                </span>
                {/* Neon-blue glow on hover */}
                <div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md pointer-events-none"
                  style={{ 
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.primary}40`
                  }}
                />
              </motion.a>

              {/* Car Rentals Button */}
              <motion.a
                href="https://www.aviasales.com/search?marker=692947"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.005, y: -0.2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-2 px-3 md:px-4 py-3 rounded-md transition-all duration-300 cursor-pointer min-h-[48px] w-full max-w-[200px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.primary}20`
                }}
              >
                <span className="text-lg md:text-xl">🚗</span>
                <span 
                  className="text-xs md:text-sm font-medium heading-robotic whitespace-nowrap transition-all duration-300 relative z-10"
                  style={{
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Car Rentals
                </span>
                {/* Neon-blue glow on hover */}
                <div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md pointer-events-none"
                  style={{ 
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.primary}40`
                  }}
                />
              </motion.a>

              {/* Tours & Activities Button */}
              <motion.a
                href="https://www.aviasales.com/search?marker=692947"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.005, y: -0.2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-2 px-3 md:px-4 py-3 rounded-md transition-all duration-300 cursor-pointer min-h-[48px] w-full max-w-[200px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${colors.primary}20`
                }}
              >
                <span className="text-lg md:text-xl">🎟️</span>
                <span 
                  className="text-xs md:text-sm font-medium heading-robotic whitespace-nowrap transition-all duration-300 relative z-10"
                  style={{
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Tours & Activities
                </span>
                {/* Neon-blue glow on hover */}
                <div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-md pointer-events-none"
                  style={{ 
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.primary}40`
                  }}
                />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-4 sm:mt-6 md:mt-8 text-white/70 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-4"
        >
          {description || 'Let AI craft your dream itinerary, find the best flights, and discover hidden gems'}
        </motion.p>
      </div>

      {/* Floating Particles Effect */}
      {isMounted && typeof window !== 'undefined' && window.innerWidth && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const width = window.innerWidth || 1920
            const height = window.innerHeight || 1080
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: colors.primary }}
                initial={{
                  x: Math.random() * width,
                  y: Math.random() * height,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * height],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
