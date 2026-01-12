'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
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
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      try {
        const response = await fetch('/api/health', {
          method: 'HEAD',
          cache: 'no-cache',
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        if (!response.ok) {
          setIsOnline(false)
          setShowStatus(true)
        } else {
          setIsOnline(true)
        }
      } catch (error) {
        clearTimeout(timeoutId)
        // If health check fails, it might be because the endpoint doesn't exist
        // Try a different approach - check if we can reach a known good endpoint
        const fallbackController = new AbortController()
        const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), 3000)
        
        try {
          await fetch('https://www.google.com/favicon.ico', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache',
            signal: fallbackController.signal,
          })
          clearTimeout(fallbackTimeoutId)
          setIsOnline(true)
        } catch {
          clearTimeout(fallbackTimeoutId)
          setIsOnline(false)
          setShowStatus(true)
        }
      }
    }

    // Test connection on mount and periodically
    testConnection()
    const interval = setInterval(testConnection, 30000) // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  if (!showStatus && isOnline) return null

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
