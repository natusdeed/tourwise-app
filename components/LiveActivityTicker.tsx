'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LiveActivityTicker Component
 * 
 * Displays a rotating ticker of live user activities to create social proof.
 * Automatically cycles through different activities every 4 seconds.
 * 
 * Features:
 * - Animated text transitions
 * - Live indicator dot with pulse animation
 * - Smooth fade in/out effects
 * - Responsive design
 */
export function LiveActivityTicker() {
  const activities = [
    "Sarah from Texas just booked a trip to Bali",
    "Mike from New York found a $299 flight to Paris",
    "Lisa from California saved $450 on hotels",
    "James from Florida just created an itinerary"
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activities.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [activities.length])

  return (
    <div className="live-ticker glass rounded-lg px-4 py-3 border border-white/10 flex items-center gap-3 overflow-hidden">
      {/* Animated Live Dot */}
      <motion.span
        className="ticker-dot relative flex-shrink-0 w-3 h-3 rounded-full bg-neon-cyan"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Pulsing ring effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-neon-cyan"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.span>

      {/* Activity Text with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="ticker-text text-white/80 text-sm md:text-base flex-1 truncate"
        >
          {activities[current]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
