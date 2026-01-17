'use client'

import { Plane, FileCheck, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ActionSidebarProps {
  countryName: string;
  countrySlug: string;
}

/**
 * ActionSidebar Component
 * 
 * Right-hand sidebar for monetization through affiliate links.
 * Features:
 * - Slot 1: "Check Visa Now" (iVisa placeholder)
 * - Slot 2: "Book Flights to [Country]" (Expedia/Skyscanner placeholder)
 */
export default function ActionSidebar({ countryName, countrySlug }: ActionSidebarProps) {
  // Placeholder affiliate links - replace with actual affiliate URLs
  const visaCheckUrl = `https://www.ivisa.com/apply-online?country=${countrySlug}`
  const flightBookingUrl = `https://www.expedia.com/Flights/${countryName}`

  return (
    <aside className="hidden lg:block w-80 flex-shrink-0 ml-8">
      <div className="sticky top-24 space-y-6">
        {/* Visa Check CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-xl p-6 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 rounded-lg">
              <FileCheck className="h-6 w-6 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold heading-robotic text-white mb-1">
                CHECK VISA NOW
              </h3>
              <p className="text-sm text-white/70">
                Verify visa requirements and get assistance with your application
              </p>
            </div>
          </div>
          <Link
            href={visaCheckUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-bold heading-robotic py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Check Visa Requirements
            <ExternalLink className="h-4 w-4" />
          </Link>
          <p className="text-xs text-white/50 mt-3 text-center">
            Affiliate partner - we may earn a commission
          </p>
        </motion.div>

        {/* Flight Booking CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-xl p-6 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 rounded-lg">
              <Plane className="h-6 w-6 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold heading-robotic text-white mb-1">
                BOOK FLIGHTS
              </h3>
              <p className="text-sm text-white/70">
                Find the best deals to {countryName}
              </p>
            </div>
          </div>
          <Link
            href={flightBookingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-bold heading-robotic py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Search Flights to {countryName}
            <ExternalLink className="h-4 w-4" />
          </Link>
          <p className="text-xs text-white/50 mt-3 text-center">
            Affiliate partner - we may earn a commission
          </p>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-4"
        >
          <p className="text-xs text-white/50">
            Always verify official requirements with government sources
          </p>
        </motion.div>
      </div>
    </aside>
  )
}
