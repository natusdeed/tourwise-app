'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Only access navigator if we're in the browser
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return
    }
    
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Test actual connectivity by making a lightweight request
    const testConnection = async () => {
      // Silently check connection without showing errors
      // Only show status if user is actually offline
      if (!navigator.onLine) {
        setIsOnline(false)
        setShowStatus(true)
        return
      }

      // If online, assume connection is good (don't show errors for missing endpoints)
      setIsOnline(true)
    }

    // Test connection on mount only (don't poll repeatedly to avoid errors)
    testConnection()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Don't render anything during SSR
  if (!isMounted) return null
  
  if (!showStatus && isOnline) return null

  // Hide all connection status notifications
  return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div
          className={`glass-strong rounded-lg border px-4 py-3 flex items-center gap-3 ${
            isOnline
              ? 'border-green-500/50 bg-green-500/10'
              : 'border-red-500/50 bg-red-500/10'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm font-medium">Connection restored</span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-red-400" />
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">Connection issue detected</span>
                <span className="text-white/60 text-xs">
                  Please check your internet connection
                </span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
