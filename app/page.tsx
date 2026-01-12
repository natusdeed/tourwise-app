'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import ToolsSection from '@/components/ToolsSection'
import ConnectionStatus from '@/components/ConnectionStatus'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ConnectionStatus />
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <FeatureGrid />
        <ToolsSection />
        
        {/* Footer */}
        <footer id="contact" className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-neon-cyan/20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold heading-robotic mb-4">
                <span className="text-gradient text-glow">TOURWISE AI</span>
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6">
                Your next-generation AI travel companion
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
                <span>© 2024 TourWise AI</span>
                <span>•</span>
                <span>Powered by AI</span>
              </div>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </main>
  )
}
