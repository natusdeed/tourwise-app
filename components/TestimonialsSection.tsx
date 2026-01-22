'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, CheckCircle2 } from 'lucide-react'

interface Testimonial {
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  trip: string
  verified: boolean
}

/**
 * TestimonialsSection Component
 * 
 * Displays a grid of customer testimonials with ratings, avatars, and verified badges.
 * Uses glass-morphism design matching the TourWise app aesthetic.
 * 
 * Features:
 * - Responsive grid layout
 * - Star ratings display
 * - Verified traveler badges
 * - Trip type tags
 * - Smooth animations on scroll
 */
export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Jessica Rodriguez",
      location: "Miami, FL",
      avatar: "/avatars/jessica.jpg",
      rating: 5,
      text: "TourWise AI planned my entire European trip in under 5 minutes. The recommendations were spot-on, and I saved over $600!",
      trip: "2-week Europe tour",
      verified: true
    },
    {
      name: "Marcus Chen",
      location: "San Francisco, CA",
      avatar: "/avatars/marcus.jpg",
      rating: 5,
      text: "Best travel planning tool I've ever used. The AI actually understands what I'm looking for.",
      trip: "Solo Asia adventure",
      verified: true
    },
    {
      name: "Emily Parker",
      location: "Austin, TX",
      avatar: "/avatars/emily.jpg",
      rating: 5,
      text: "Found hidden gems I would never have discovered on my own. The local recommendations were incredible!",
      trip: "Family vacation to Italy",
      verified: true
    }
  ]

  return (
    <section className="testimonials-section py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-gradient leading-tight"
        >
          Loved by Travelers Worldwide
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="testimonial-card glass-strong rounded-xl p-6 border border-glow-hover overflow-hidden transition-all duration-300 group"
            >
              {/* Header with Avatar, Name, Location, and Rating */}
              <div className="testimonial-header flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0 relative w-14 h-14 rounded-full overflow-hidden border-2 border-neon-cyan/40">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=00FFFF&color=000&size=128`
                    }}
                  />
                </div>

                {/* Name, Location, and Verified Badge */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-base mb-1 heading-robotic">
                    {testimonial.name}
                  </h4>
                  <p className="location text-white/60 text-sm mb-2">
                    {testimonial.location}
                  </p>
                  {testimonial.verified && (
                    <span className="verified-badge inline-flex items-center gap-1 text-xs text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded-full border border-neon-cyan/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Traveler
                    </span>
                  )}
                </div>

                {/* Rating Stars */}
                <div className="rating flex-shrink-0 flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-neon-cyan text-neon-cyan"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="testimonial-text text-white/90 text-sm md:text-base leading-relaxed mb-4 italic">
                "{testimonial.text}"
              </p>

              {/* Trip Tag */}
              <span className="trip-tag inline-block text-xs text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {testimonial.trip}
              </span>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/40 to-electric-blue/40 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
