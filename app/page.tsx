'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { useState, useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import ConnectionStatus from '@/components/ConnectionStatus'
import { getAllVerticals, type VerticalConfig } from '@/lib/verticals'

// Lazy load heavy components to improve initial page load  
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-white/70">Loading...</div></div>,
  ssr: true, // Enable SSR for Hero component
})

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

const EmailCapture = dynamic(() => import('@/components/EmailCapture'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true,
})

const LegalModal = dynamic(() => import('@/components/LegalModal'), {
  ssr: false,
})

export default function Home() {
  // Use state to ensure verticals are only loaded on client side
  const [verticals, setVerticals] = useState<VerticalConfig[]>([])
  const [isClient, setIsClient] = useState(false)
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

  // Get stats for vertical cards
  const getVerticalStats = (slug: string): { tours: string; rating: string; isPopular: boolean } => {
    const statsMap: Record<string, { tours: string; rating: string; isPopular: boolean }> = {
      'africa': { tours: '2,340+ tours available', rating: '4.8', isPopular: true },
      'christian-travel': { tours: '1,850+ tours available', rating: '4.9', isPopular: false },
      'luxury': { tours: '3,200+ tours available', rating: '4.9', isPopular: true },
      'usa-tours': { tours: '4,500+ tours available', rating: '4.7', isPopular: true },
      'budget': { tours: '2,100+ tours available', rating: '4.6', isPopular: false },
      'island-retreats': { tours: '1,900+ tours available', rating: '4.8', isPopular: false },
    }
    return statsMap[slug] || { tours: '1,000+ tours available', rating: '4.5', isPopular: false }
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
      icon: 'BrainCircuit',
      title: 'Your Perfect Itinerary in Minutes, Not Hours',
      description: 'Our advanced AI learns your travel style, budget, and preferences to craft personalized day-by-day plans. Say goodbye to endless research and hello to stress-free planning.',
      stat: '⚡ Average planning time: Just 2 minutes',
      cta: 'See How It Works',
      color: 'from-[#00FFFF] to-[#32A8DD]',
      image: '/feature-ai.jpg.png',
    },
    {
      icon: 'PlaneDeparture',
      title: 'Find the Cheapest Flights—Automatically',
      description: 'We scan 500+ airlines in real-time to find you unbeatable prices. Get instant price drop alerts and never overpay for flights again.',
      stat: '💰 Travelers save an average of $347 per trip',
      cta: 'Start Saving Now',
      color: 'from-[#32A8DD] to-[#00FFFF]',
      image: '/feature-flight.jpg.png',
    },
    {
      icon: 'Hotel',
      title: 'Exclusive Hotel Deals Up to 50% Off',
      description: 'Unlock member-only rates and secret deals from our premium partner hotels worldwide. Luxury stays at budget-friendly prices.',
      stat: '🏨 Access to 15,000+ properties globally',
      cta: 'Browse Hotel Deals',
      color: 'from-[#00FFFF] via-[#32A8DD] to-[#00FFFF]',
      image: '/feature-hotel.jpg.png',
    },
  ]

  // FAQ Schema for Agentic Search - answers common travel planning prompts
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I plan a budget trip with AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TourWise AI helps you plan budget trips by analyzing your destination, travel dates, and budget constraints. Our AI-driven itineraries automatically find the best flight deals, affordable accommodations, and cost-effective activities. Simply tell our AI your budget and travel preferences, and it will create a personalized itinerary that maximizes value while staying within your budget.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a smart travel planner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A smart travel planner is an AI-powered platform like TourWise AI that uses artificial intelligence to create hyper-personalized travel itineraries. It provides real-time flight tracking, finds the best hotel deals, and offers intelligent local detection to help you discover hidden gems. Smart travel planners automate the entire planning process, saving you time and ensuring you get the best travel experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does AI-driven itinerary planning work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI-driven itinerary planning uses advanced artificial intelligence to analyze your travel preferences, budget, dates, and interests. TourWise AI processes this information to automatically generate a complete travel itinerary including flights, hotels, activities, and local recommendations. The AI learns from millions of travel data points to suggest the best options tailored specifically to you.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I track flight prices in real-time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! TourWise AI offers real-time flight tracking that monitors prices across thousands of airlines. Our system sends you alerts when prices drop, helping you book flights at the best possible rates. The real-time tracking feature continuously scans for deals and notifies you immediately when your desired routes become available at lower prices.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes TourWise AI the best smart travel planner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TourWise AI stands out as the best smart travel planner because it combines AI-driven itineraries, real-time flight tracking, and hyper-personalized planning in one platform. Our AI understands your unique travel style and automatically creates complete itineraries that solve common travel planning headaches. We offer free access to advanced AI travel planning tools that typically cost hundreds of dollars.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a travel itinerary with AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creating a travel itinerary with TourWise AI is simple: just describe your trip in natural language (e.g., "I want to go to Tokyo for 5 days, budget is $2k"). Our AI analyzes your request and generates a complete itinerary including flights, hotels, daily activities, restaurant recommendations, and local tips. The entire process takes seconds, and you can refine your itinerary based on the AI\'s suggestions.',
        },
      },
    ],
  }

  // BreadcrumbList Schema for site hierarchy understanding
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tourwiseai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Features',
        item: 'https://tourwiseai.com#features',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Itineraries',
        item: 'https://tourwiseai.com#itineraries',
      },
    ],
  }

  return (
    <main className="relative min-h-screen">
      {/* FAQ Schema for Agentic Search - helps AI models understand common questions */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* BreadcrumbList Schema for site hierarchy */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ConnectionStatus />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Default Hero for Homepage */}
        <Hero
          title="Your Dream Trip, Planned by AI in 60 Seconds"
          subtitle="Stop wasting hours on research. Get personalized itineraries, exclusive deals, and hidden local gems—all in one click."
          placeholder="I want to go to Tokyo for 5 days, budget is $2k..."
          description="Experience the future of travel planning. Our AI crafts your perfect itinerary, finds unbeatable flight deals, and reveals hidden gems you'd never discover alone."
          colors={defaultColors}
          backgroundImage="/header-banner.jpg.png"
        />

        {/* Trust Partners Section */}
        <section className="relative py-3 md:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-black/60 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-white text-xs md:text-sm heading-robotic mb-4 md:mb-6 lg:mb-8 tracking-wider font-semibold">
                ✈️ TRUSTED BY 15,000+ TRAVELERS WORLDWIDE
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12 grayscale-[0.3] hover:grayscale-0 transition-all duration-500">
                {/* Expedia Logo Placeholder */}
                <div className="flex items-center justify-center h-8 md:h-10">
                  <span className="text-white text-lg md:text-xl font-bold">Expedia</span>
                </div>
                {/* Booking.com Logo Placeholder */}
                <div className="flex items-center justify-center h-8 md:h-10">
                  <span className="text-white text-lg md:text-xl font-bold">Booking.com</span>
                </div>
                {/* TripAdvisor Logo Placeholder */}
                <div className="flex items-center justify-center h-8 md:h-10">
                  <span className="text-white text-lg md:text-xl font-bold">TripAdvisor</span>
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
                <span className="text-gradient">Discover Your Perfect Travel Style</span>
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 leading-relaxed">
                Choose your adventure and unlock expert guides, curated destinations, and personalized itineraries designed for your unique travel style
              </p>
            </motion.div>

            {/* Vertical Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-2 md:mb-3">
              {isClient && verticals.length > 0 && verticals.map((vertical, index) => {
                const stats = getVerticalStats(vertical.slug)
                return (
                  <motion.div
                    key={vertical.slug}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ y: -0.3, scale: 1.001 }}
                    className="relative group"
                  >
                    <div 
                      className="vertical-card glass-strong overflow-hidden border border-glow-hover h-full flex flex-col transition-all duration-300"
                      style={{ 
                        borderColor: `${vertical.colors.primary}20`,
                        borderRadius: '12px',
                        minHeight: '420px',
                        height: '100%'
                      }}
                    >
                      {/* Card Image */}
                      <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden">
                        <Image
                          src={getVerticalImage(vertical.slug)}
                          alt={vertical.shortName}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/9 to-black/15" />
                        
                        {/* Popular Badge */}
                        {stats.isPopular && (
                          <span 
                            className="badge-popular absolute top-3 right-3 px-3 py-1 text-xs font-bold heading-robotic rounded-full backdrop-blur-sm border"
                            style={{ 
                              backgroundColor: `${vertical.colors.primary}20`,
                              borderColor: vertical.colors.primary,
                              color: vertical.colors.primary
                            }}
                          >
                            Most Popular
                          </span>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold heading-robotic text-white mb-3">
                          {vertical.shortName}
                        </h3>

                        {/* Description */}
                        <p className="text-white/80 text-sm md:text-base mb-4 flex-grow">
                          {vertical.description}
                        </p>

                        {/* Card Stats */}
                        <div className="card-stats flex items-center justify-between mb-4 text-sm text-white/70">
                          <span>{stats.tours}</span>
                          <span className="rating flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {stats.rating}
                          </span>
                        </div>

                        {/* CTA Button */}
                        <a 
                          href="https://www.aviasales.com/search?marker=692947"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-secondary w-full"
                          onClick={() => {
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'cta_click', {
                                cta_name: `vertical_${vertical.slug}`,
                                cta_location: 'vertical_card'
                              })
                              window.gtag('event', 'affiliate_click', {
                                link_name: `vertical_${vertical.slug}`,
                                destination: 'https://www.aviasales.com/search?marker=692947'
                              })
                            }
                          }}
                        >
                          <button
                            className="cta-secondary w-full px-4 py-3 text-sm md:text-base font-semibold heading-robotic rounded-lg flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300 border min-h-[48px] min-w-[48px]"
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: `${vertical.colors.primary}40`,
                              color: vertical.colors.primary
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = `${vertical.colors.primary}20`
                              e.currentTarget.style.borderColor = vertical.colors.primary
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.borderColor = `${vertical.colors.primary}40`
                            }}
                          >
                            <span>Find {vertical.shortName.replace(' Tours', '').replace('Travel', '')} Deals</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </a>
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
                  </motion.div>
                )
              })}
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
        
        {/* Email Capture Section - Enhanced Newsletter Signup */}
        <EmailCapture colors={defaultColors} />
        
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
