'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import ConnectionStatus from '@/components/ConnectionStatus'
import { getAllVerticals, type VerticalConfig } from '@/lib/verticals'

// Lazy load heavy components to improve initial page load
const FeatureGrid = dynamic(() => import('@/components/FeatureGrid'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true,
})

const ToolsSection = dynamic(() => import('@/components/ToolsSection'), {
  loading: () => <div className="min-h-[300px]" />,
  ssr: true,
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: true,
})

const LegalModal = dynamic(() => import('@/components/LegalModal'), {
  ssr: false,
})

export default function Home() {
  // Use state to ensure verticals are only loaded on client side
  const [verticals, setVerticals] = useState<VerticalConfig[]>([])
  const [isClient, setIsClient] = useState(false)
  const [email, setEmail] = useState('')
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      setVerticals(getAllVerticals())
    } catch (error) {
      console.error('Error loading verticals:', error)
      setVerticals([])
    }
  }, [])

  // Map vertical slugs to their card images
  const getVerticalImage = (slug: string): string => {
    const imageMap: Record<string, string> = {
      'africa': '/card-safari.jpg.jpg',
      'christian-travel': '/card-christian.jpg.jpg',
      'luxury': '/card-luxury.jpg.jpg',
      'usa-tours': '/card-usa.jpg.jpg',
      'budget': '/card-budget.jpg.jpg',
      'island-retreats': '/card-island.jpg.png',
    }
    return imageMap[slug] || ''
  }
  
  // Default theme for homepage (original neon-cyan theme)
  const defaultColors = {
    primary: '#00FFFF',
    secondary: '#32A8DD',
    accent: '#00FFFF',
    textGradient: 'from-[#00FFFF] to-[#32A8DD]',
    glowColor: '#00FFFF',
  }

  const defaultFeatures = [
    {
      icon: 'Sparkles',
      title: 'AI ITINERARIES',
      description: 'Get personalized travel plans crafted by advanced AI that understands your preferences, budget, and travel style.',
      color: 'from-[#00FFFF] to-[#32A8DD]',
      image: '/feature-ai.jpg.png',
    },
    {
      icon: 'Plane',
      title: 'FLIGHT SCANNING',
      description: 'Real-time flight price monitoring and alerts. We scan thousands of airlines to find you the best deals instantly.',
      color: 'from-[#32A8DD] to-[#00FFFF]',
      image: '/feature-flight.jpg.png',
    },
    {
      icon: 'Hotel',
      title: 'HOTEL DEALS',
      description: 'Discover hidden gems and exclusive hotel deals. Our AI compares prices across all major booking platforms.',
      color: 'from-[#00FFFF] via-[#32A8DD] to-[#00FFFF]',
      image: '/feature-hotel.jpg.png',
    },
  ]

  return (
    <main className="relative min-h-screen">
      <ConnectionStatus />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Default Hero for Homepage */}
        <Hero
          title="PLAN YOUR PERFECT TRIP"
          subtitle="WITH AI"
          placeholder="I want to go to Tokyo for 5 days, budget is $2k..."
          description="Let AI craft your dream itinerary, find the best flights, and discover hidden gems"
          colors={defaultColors}
          backgroundImage="/header-banner.jpg.png"
        />

        {/* Trust Partners Section */}
        <section className="relative py-3 md:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-white/50 text-xs md:text-sm heading-robotic mb-4 md:mb-6 lg:mb-8 tracking-wider">
                TRUSTED BY TRAVELERS WORLDWIDE
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Expedia Logo Placeholder */}
                <div className="flex items-center justify-center h-8 md:h-10">
                  <span className="text-white/70 text-lg md:text-xl font-bold">Expedia</span>
                </div>
                {/* Booking.com Logo Placeholder */}
                <div className="flex items-center justify-center h-8 md:h-10">
                  <span className="text-white/70 text-lg md:text-xl font-bold">Booking.com</span>
                </div>
                {/* TripAdvisor Logo Placeholder */}
                <div className="flex items-center justify-center h-8 md:h-10">
                  <span className="text-white/70 text-lg md:text-xl font-bold">TripAdvisor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Niche Selector Section - Central Hub */}
        <section id="niches" className="relative py-2 md:py-4 lg:py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-3 md:mb-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic mb-3 md:mb-4 px-2">
                <span className="text-gradient">EXPLORE TRAVEL VERTICALS</span>
              </h2>
              <p className="text-white text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
                Choose your travel style and discover expert guides, destinations, and itineraries tailored to your interests
              </p>
            </motion.div>

            {/* Vertical Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-2 md:mb-3">
              {isClient && verticals.length > 0 && verticals.map((vertical, index) => (
                <motion.div
                  key={vertical.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -0.3, scale: 1.001 }}
                  className="relative group"
                >
                  <a 
                    href="https://www.aviasales.com/search?marker=692947"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div 
                      className="glass-strong overflow-hidden border border-glow-hover h-full flex flex-col transition-all duration-300 cursor-pointer"
                      style={{ 
                        borderColor: `${vertical.colors.primary}20`,
                        borderRadius: '12px',
                        minHeight: '420px',
                        height: '100%'
                      }}
                    >
                      {/* Card Header Image with Gradient Overlay */}
                      <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden">
                        <Image
                          src={getVerticalImage(vertical.slug)}
                          alt={vertical.shortName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        {/* Optimized Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/9 to-black/15" />
                        
                        {/* Title Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="relative text-xl md:text-2xl font-bold heading-robotic text-white z-10 px-4 text-center">
                            {vertical.shortName}
                          </h3>
                        </div>
                        
                        {/* Scanline Effect on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/4 to-transparent animate-pulse" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                        {/* Description */}
                        <p className="text-white text-sm md:text-base mb-4 flex-grow">
                          {vertical.description}
                        </p>

                        {/* CTA */}
                        <div 
                          className="flex items-center gap-2 group-hover:gap-[2.035px] transition-all duration-300 relative min-h-[48px] py-2" 
                          style={{ color: vertical.colors.primary }}
                        >
                          <span className="text-sm heading-robotic font-bold group-hover:drop-shadow-[0_0_1.2px_currentColor] transition-all group-hover:scale-[1.0036] inline-block">EXPLORE NOW</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-[0.1px] group-hover:scale-[1.0036] transition-transform group-hover:drop-shadow-[0_0_1.2px_currentColor]" />
                          {/* Glow effect on hover */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity duration-300 blur-xl pointer-events-none"
                            style={{ 
                              backgroundColor: vertical.colors.primary,
                              filter: `blur(12px) drop-shadow(0 0 20px ${vertical.colors.primary})`
                            }}
                          />
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity duration-300 pointer-events-none" style={{ borderRadius: '12px' }}>
                        <div 
                          className="absolute inset-0 blur-xl"
                          style={{ 
                            backgroundColor: vertical.colors.primary,
                            opacity: 0.036,
                            borderRadius: '12px'
                          }}
                        />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
              {isClient && verticals.length === 0 && (
                <div className="col-span-full text-center text-white/50 py-8">
                  Loading verticals...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Default Features Section */}
        <FeatureGrid
          features={defaultFeatures}
          colors={defaultColors}
          sectionTitle="POWERFUL FEATURES"
          sectionDescription="Everything you need to plan the perfect trip, powered by cutting-edge AI"
        />

        <ToolsSection />
        
        {/* Newsletter Signup Section */}
        <section id="signup" className="relative py-3 md:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/60 via-black/80 to-black/60 border-y border-white/10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic mb-4 md:mb-6">
                <span className="text-gradient">GET SECRET TRAVEL DEALS</span>
              </h2>
              
              {/* Description */}
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-3 md:mb-3 max-w-2xl mx-auto leading-relaxed">
                Join 5,000+ travelers getting AI-powered flight and hotel deals delivered to their inbox.
              </p>
              
              {/* Email Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  // Handle form submission here
                  console.log('Email submitted:', email)
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold heading-robotic rounded-lg transition-all duration-300 transform hover:scale-[1.005] hover:shadow-[0_0_2px_rgba(0,191,255,0.06)] border-2 border-[#00BFFF]/50 hover:border-[#00BFFF] text-sm md:text-base whitespace-nowrap"
                  style={{
                    boxShadow: '0 0 15px rgba(0, 191, 255, 0.4)',
                  }}
                >
                  JOIN NOW
                </button>
              </form>
              
              {/* Privacy Policy Link */}
              <p className="text-white/60 text-xs md:text-sm mt-4">
                By signing up, you agree to our{' '}
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-neon-cyan hover:text-[#00FFFF] underline transition-colors duration-200"
                >
                  Privacy Policy
                </button>
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
        
        {/* Privacy Policy Modal */}
        {showPrivacyModal && (
          <LegalModal
            isOpen={showPrivacyModal}
            onClose={() => setShowPrivacyModal(false)}
            title="Privacy Policy"
            content="TourWise AI values your privacy. We use cookies to track affiliate referrals and improve user experience. We do not sell your data."
          />
        )}
      </motion.div>
    </main>
  )
}
