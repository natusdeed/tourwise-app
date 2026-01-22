'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, CheckCircle2, DollarSign, Headphones } from 'lucide-react'

/**
 * TrustBadges Component
 * 
 * Displays trust badges and security indicators to build user confidence.
 * Uses icons as fallbacks if images are not available.
 * 
 * Features:
 * - SSL Secure badge
 * - Verified Reviews badge
 * - Money-back guarantee badge
 * - 24/7 Support badge
 * - Responsive grid layout
 * - Hover animations
 */
export function TrustBadges() {
  const badges = [
    {
      id: 'ssl-secure',
      image: '/badges/ssl-secure.svg',
      alt: 'SSL Secure',
      icon: Shield,
      label: 'SSL Secure',
      description: '256-bit encryption'
    },
    {
      id: 'verified-reviews',
      image: '/badges/verified-reviews.svg',
      alt: 'Verified Reviews',
      icon: CheckCircle2,
      label: 'Verified Reviews',
      description: 'Real traveler feedback'
    },
    {
      id: 'money-back',
      image: '/badges/money-back.svg',
      alt: 'Best Price Guarantee',
      icon: DollarSign,
      label: 'Best Price',
      description: 'Guaranteed lowest rates'
    },
    {
      id: '24-7-support',
      image: '/badges/24-7-support.svg',
      alt: '24/7 Support',
      icon: Headphones,
      label: '24/7 Support',
      description: 'Always here to help'
    }
  ]

  return (
    <div className="trust-badges flex flex-wrap items-center justify-center gap-6 md:gap-8 py-8">
      {badges.map((badge, index) => {
        const IconComponent = badge.icon

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            {/* Badge Image/Icon */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              {/* Try to load image, fallback to icon */}
              <div className="relative w-full h-full">
                <Image
                  src={badge.image}
                  alt={badge.alt}
                  fill
                  className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 64px, 80px"
                  onError={(e) => {
                    // Hide image on error, show icon instead
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                {/* Icon Fallback - always visible, hidden when image loads */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-neon-cyan" />
                </div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Badge Label */}
            <div className="text-center">
              <p className="text-white/90 text-xs md:text-sm font-semibold mb-0.5">
                {badge.label}
              </p>
              <p className="text-white/60 text-xs">
                {badge.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
