'use client'

import { X, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * TrustShield Component
 * 
 * A dismissible alert banner that emphasizes Tour Wise AI is a navigator,
 * not a government agency. Users should verify information with official sources.
 */
export default function TrustShield() {
  const [isVisible, setIsVisible] = useState(true)

  // Check if user has previously dismissed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('trustShieldDismissed')
      if (dismissed === 'true') {
        setIsVisible(false)
      }
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('trustShieldDismissed', 'true')
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-amber-500/20 border-b border-amber-500/30 backdrop-blur-md"
          style={{
            paddingTop: '80px', // Account for navbar height
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Shield className="h-5 w-5 text-amber-400 flex-shrink-0" />
                </motion.div>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  <span className="font-bold text-amber-400">Important:</span> Tour Wise AI is a{' '}
                  <span className="font-semibold text-neon-cyan">travel navigator</span>, not a government agency.
                  Always{' '}
                  <span className="font-semibold underline decoration-amber-400">verify information</span> with official
                  government sources before making travel decisions.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Dismiss warning"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
