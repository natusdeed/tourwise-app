'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="relative min-h-screen">
      <Navbar />
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <AlertTriangle className="w-24 h-24 md:w-32 md:h-32 text-red-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold heading-robotic mb-4">
            <span className="text-gradient">Something Went Wrong</span>
          </h1>
          
          <p className="text-white/70 text-lg md:text-xl mb-8 max-w-lg mx-auto">
            We encountered an unexpected error. Don't worry, we're here to help you get back on track.
          </p>
          
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
              <p className="text-red-300 text-sm font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/40 hover:border-neon-cyan/60 text-neon-cyan font-semibold heading-robotic rounded-lg transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/40 hover:border-neon-cyan/60 text-neon-cyan font-semibold heading-robotic rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}
