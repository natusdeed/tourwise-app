'use client'

import { motion } from 'framer-motion'
import { Home, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function NotFound() {
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
            <AlertCircle className="w-24 h-24 md:w-32 md:h-32 text-neon-cyan mx-auto" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold heading-robotic mb-4">
            <span className="text-gradient">404</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold heading-robotic mb-4 text-white">
            Page Not Found
          </h2>
          
          <p className="text-white/70 text-lg md:text-xl mb-8 max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/40 hover:border-neon-cyan/60 text-neon-cyan font-semibold heading-robotic rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}
