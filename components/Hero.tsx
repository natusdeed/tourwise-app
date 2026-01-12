'use client'

import { motion } from 'framer-motion'
import { Search, Send, AlertCircle } from 'lucide-react'
import { useState, FormEvent, useEffect } from 'react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Check if we're online first
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network settings.')
      }

      // TODO: Implement search functionality
      // For now, simulate a network request to test connection
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch('/api/health', {
        method: 'GET',
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Server is not responding. Please try again later.')
      }

      console.log('Search query:', searchQuery)
      // Here you would normally make the actual search API call
      
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError' || err.name === 'TimeoutError') {
          setError('Request timed out. Please check your connection and try again.')
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError('Unable to connect to the server. Please check your internet connection.')
        } else {
          setError(err.message)
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 via-transparent to-black/50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 heading-robotic"
        >
          <span className="text-gradient text-glow">
            PLAN YOUR PERFECT TRIP
          </span>
          <br />
          <span className="text-white">
            WITH AI
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
            <div className="relative glass-strong rounded-lg border border-neon-cyan/30 border-glow-hover overflow-hidden">
              <div className="flex items-center">
                <div className="pl-4 pr-2">
                  <Search className="w-5 h-5 text-neon-cyan" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="I want to go to Tokyo for 5 days, budget is $2k..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 py-4 md:py-5 text-sm md:text-base w-full"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 md:px-6 py-4 md:py-5 bg-gradient-to-r from-neon-cyan to-electric-blue hover:from-electric-blue hover:to-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-black font-semibold heading-robotic text-sm md:text-base flex items-center gap-2 group"
                >
                  <span className="hidden sm:inline">{isLoading ? 'SEARCHING...' : 'SEARCH'}</span>
                  <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </form>
          
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 glass-strong rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 text-sm font-medium">{error}</p>
                <p className="text-white/60 text-xs mt-1">
                  If the problem persists, please check your internet connection or try refreshing the page.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 md:mt-8 text-white/70 text-sm md:text-base max-w-xl mx-auto"
        >
          Let AI craft your dream itinerary, find the best flights, and discover hidden gems
        </motion.p>
      </div>

      {/* Floating Particles Effect */}
      {typeof window !== 'undefined' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * windowSize.height],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
