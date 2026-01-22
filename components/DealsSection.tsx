'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Clock, Users, Sparkles } from 'lucide-react'
import type { NicheColorScheme } from '@/lib/niche-config'
import { trackCTA, trackAffiliateClick } from '@/utils/analytics'

interface Deal {
  destination: string
  image: string
  originalPrice: number
  salePrice: number
  discount: number
  spotsLeft: number
  expiresIn: string
  expiresAt?: Date // Optional: specific expiration date
  includes: string[]
  badge: string
}

interface DealsSectionProps {
  colors?: NicheColorScheme
}

// Countdown timer component for deals
function CountdownTimer({ expiresIn, expiresAt }: { expiresIn: string; expiresAt?: Date }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (expiresAt) {
        const now = new Date().getTime()
        const expiration = expiresAt.getTime()
        const difference = expiration - now

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          setTimeLeft({ days, hours, minutes, seconds })
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      } else {
        // Fallback: parse expiresIn string (e.g., "48 hours", "3 days")
        const hoursMatch = expiresIn.match(/(\d+)\s*hours?/i)
        const daysMatch = expiresIn.match(/(\d+)\s*days?/i)
        
        if (hoursMatch) {
          const hours = parseInt(hoursMatch[1])
          const expiration = new Date().getTime() + hours * 60 * 60 * 1000
          const now = new Date().getTime()
          const difference = expiration - now
          
          if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const s = Math.floor((difference % (1000 * 60)) / 1000)
            setTimeLeft({ days: d, hours: h, minutes: m, seconds: s })
          }
        } else if (daysMatch) {
          const days = parseInt(daysMatch[1])
          const expiration = new Date().getTime() + days * 24 * 60 * 60 * 1000
          const now = new Date().getTime()
          const difference = expiration - now
          
          if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const s = Math.floor((difference % (1000 * 60)) / 1000)
            setTimeLeft({ days: d, hours: h, minutes: m, seconds: s })
          }
        }
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [expiresIn, expiresAt])

  if (!timeLeft) {
    return <span className="font-semibold">Expires in {expiresIn}</span>
  }

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span className="font-semibold text-red-500">EXPIRED</span>
  }

  return (
    <div className="flex items-center gap-2">
      {timeLeft.days > 0 && (
        <span className="font-semibold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
      {timeLeft.days === 0 && timeLeft.hours > 0 && (
        <span className="font-semibold">
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
      {timeLeft.days === 0 && timeLeft.hours === 0 && (
        <span className="font-semibold">
          {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
    </div>
  )
}

export default function DealsSection({ colors }: DealsSectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Default color scheme if not provided
  const defaultColors: NicheColorScheme = {
    primary: '#00FFFF',
    secondary: '#32A8DD',
    accent: '#00FFFF',
    textGradient: 'from-[#00FFFF] to-[#32A8DD]',
    glowColor: '#00FFFF',
  }
  
  const activeColors = colors || defaultColors

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const deals: Deal[] = [
    {
      destination: "Bali, Indonesia",
      image: "/deals/bali.jpg",
      originalPrice: 1299,
      salePrice: 699,
      discount: 46,
      spotsLeft: 7,
      expiresIn: "48 hours",
      includes: ["Flights", "4-star hotel", "Tours"],
      badge: "Flash Sale"
    },
    {
      destination: "Paris, France",
      image: "/deals/paris.jpg",
      originalPrice: 1599,
      salePrice: 899,
      discount: 44,
      spotsLeft: 12,
      expiresIn: "3 days",
      includes: ["Round-trip flights", "5-star hotel", "Breakfast"],
      badge: "Limited Time"
    },
    {
      destination: "Tokyo, Japan",
      image: "/deals/tokyo.jpg",
      originalPrice: 1899,
      salePrice: 1099,
      discount: 42,
      spotsLeft: 5,
      expiresIn: "24 hours",
      includes: ["Direct flights", "4-star hotel", "JR Pass", "City tours"],
      badge: "Flash Sale"
    },
    {
      destination: "Dubai, UAE",
      image: "/deals/dubai.jpg",
      originalPrice: 2199,
      salePrice: 1299,
      discount: 41,
      spotsLeft: 15,
      expiresIn: "5 days",
      includes: ["Business class flights", "5-star resort", "Desert safari", "Breakfast"],
      badge: "Popular"
    },
    {
      destination: "Santorini, Greece",
      image: "/deals/santorini.jpg",
      originalPrice: 1699,
      salePrice: 999,
      discount: 41,
      spotsLeft: 8,
      expiresIn: "72 hours",
      includes: ["Flights", "Boutique hotel", "Sunset cruise", "Breakfast"],
      badge: "Limited Time"
    },
    {
      destination: "Maldives",
      image: "/deals/maldives.jpg",
      originalPrice: 2999,
      salePrice: 1799,
      discount: 40,
      spotsLeft: 3,
      expiresIn: "36 hours",
      includes: ["Flights", "Water villa", "All meals", "Snorkeling"],
      badge: "Flash Sale"
    },
    {
      destination: "New York, USA",
      image: "/deals/newyork.jpg",
      originalPrice: 1499,
      salePrice: 849,
      discount: 43,
      spotsLeft: 20,
      expiresIn: "7 days",
      includes: ["Round-trip flights", "4-star hotel", "City pass", "Breakfast"],
      badge: "Best Value"
    },
    {
      destination: "Rome, Italy",
      image: "/deals/rome.jpg",
      originalPrice: 1399,
      salePrice: 799,
      discount: 43,
      spotsLeft: 10,
      expiresIn: "4 days",
      includes: ["Flights", "4-star hotel", "Vatican tour", "Breakfast"],
      badge: "Limited Time"
    },
  ]

  return (
    <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: isMounted ? 0 : 1, y: isMounted ? 30 : 0 }}
          whileInView={isMounted ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={isMounted ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-robotic mb-3 px-2">
            <span className="text-gradient">
              🔥 Limited-Time Deals Ending Soon
            </span>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto px-2 font-medium leading-relaxed">
            Don&apos;t miss out—book now to secure these unbeatable prices before they&apos;re gone
          </p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.destination}
              initial={{ opacity: isMounted ? 0 : 1, y: isMounted ? 50 : 0 }}
              whileInView={isMounted ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true }}
              transition={isMounted ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              whileHover={isMounted ? { y: -8, scale: 1.02 } : undefined}
              className="relative group"
            >
              <div 
                className="glass-strong rounded-xl overflow-hidden border border-glow-hover h-full flex flex-col transition-all duration-300"
                style={{ borderColor: `${activeColors.primary}20` }}
              >
                {/* Image Section */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.destination}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold heading-robotic text-white"
                      style={{
                        background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.secondary})`,
                        boxShadow: `0 0 20px ${activeColors.primary}60`
                      }}
                    >
                      {deal.badge}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold heading-robotic text-white bg-red-500"
                      style={{
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
                      }}
                    >
                      -{deal.discount}%
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  {/* Destination Title */}
                  <h3 className="text-xl md:text-2xl font-bold heading-robotic mb-4 text-white">
                    {deal.destination}
                  </h3>

                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl md:text-3xl font-bold heading-robotic" style={{ color: activeColors.primary }}>
                        ${deal.salePrice}
                      </span>
                      <span className="text-white/60 text-sm line-through">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">
                      Save ${deal.originalPrice - deal.salePrice}
                    </p>
                  </div>

                  {/* Includes List */}
                  <ul className="mb-4 space-y-2 flex-grow">
                    {deal.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                        <span className="text-green-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Urgency Indicators */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-orange-400 text-xs md:text-sm">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">Only {deal.spotsLeft} spots left</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-xs md:text-sm">
                      <Clock className="w-4 h-4" />
                      <CountdownTimer expiresIn={deal.expiresIn} expiresAt={deal.expiresAt} />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      trackCTA('deals_view_deal', `deals_${deal.destination.toLowerCase().replace(/\s+/g, '_')}`)
                      trackAffiliateClick(`deal_${deal.destination}`, 'https://www.aviasales.com/search?marker=692947', deal.salePrice)
                      window.open('https://www.aviasales.com/search?marker=692947', '_blank', 'noopener,noreferrer')
                    }}
                    className="mt-auto px-4 py-3 rounded-lg font-bold heading-robotic text-sm md:text-base text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden min-h-[48px] min-w-[48px]"
                    style={{
                      background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.secondary})`,
                      boxShadow: `0 0 20px ${activeColors.primary}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px ${activeColors.primary}80`
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${activeColors.primary}40`
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <span className="relative z-10">View Deal</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                  <div 
                    className="absolute inset-0 rounded-xl blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${activeColors.primary}, ${activeColors.secondary})`,
                    }}
                  />
                  <div 
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ 
                      borderColor: `${activeColors.primary}60`,
                      boxShadow: `0 0 20px ${activeColors.primary}40`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
