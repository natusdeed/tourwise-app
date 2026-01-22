'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import type { NicheColorScheme } from '@/lib/niche-config'

interface TestimonialProps {
  quote: string
  author: string
  avatar: string
  colors?: NicheColorScheme
  verified?: boolean
  className?: string
}

/**
 * Testimonial Component
 * 
 * A beautiful testimonial card that displays user feedback with an avatar,
 * quote, and author information. Matches the glass-morphism design style
 * of the TourWise app.
 * 
 * @param quote - The testimonial quote/text
 * @param author - The author's name
 * @param avatar - Path to the avatar image (should be in /public folder)
 * @param colors - Optional color scheme (defaults to neon-cyan theme)
 * @param verified - Whether to show "verified traveler" badge
 * @param className - Additional CSS classes
 */
export default function Testimonial({
  quote,
  author,
  avatar,
  colors = {
    primary: '#00FFFF',
    secondary: '#32A8DD',
    accent: '#00FFFF',
    textGradient: 'from-[#00FFFF] to-[#32A8DD]',
    glowColor: '#00FFFF',
  },
  verified = true,
  className = '',
}: TestimonialProps) {
  // Prevent hydration mismatches by ensuring animations only activate on client
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: isMounted ? 0 : 1, y: isMounted ? 20 : 0 }}
      whileInView={isMounted ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={isMounted ? { duration: 0.6 } : { duration: 0 }}
      whileHover={isMounted ? { y: -4, scale: 1.01 } : undefined}
      className={`relative group ${className}`}
    >
      <div
        className="glass-strong rounded-xl p-6 md:p-8 border border-glow-hover overflow-hidden transition-all duration-300"
        style={{ borderColor: `${colors.primary}20` }}
      >
        {/* Content */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
              style={{
                borderColor: `${colors.primary}40`,
                boxShadow: `0 0 20px ${colors.primary}30`,
              }}
            >
              <Image
                src={avatar}
                alt={author}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 80px"
              />
              {/* Gradient overlay for better visual effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
            </div>
          </div>

          {/* Quote and Author */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Quote */}
            <p
              className="text-white/90 text-sm md:text-base leading-relaxed italic relative pl-4"
              style={{
                borderLeft: `3px solid ${colors.primary}40`,
              }}
            >
              "{quote}"
            </p>

            {/* Author Info */}
            <div className="flex flex-col gap-1">
              <span
                className="text-white font-semibold text-sm md:text-base heading-robotic"
                style={{
                  color: colors.primary,
                  textShadow: `0 0 10px ${colors.primary}40`,
                }}
              >
                - {author}
              </span>
              {verified && (
                <span className="text-white/60 text-xs md:text-sm flex items-center gap-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: colors.primary,
                      boxShadow: `0 0 8px ${colors.primary}`,
                    }}
                  />
                  Verified traveler
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-20 blur-xl"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl border-2"
            style={{
              borderColor: `${colors.primary}60`,
              boxShadow: `0 0 20px ${colors.primary}40`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
