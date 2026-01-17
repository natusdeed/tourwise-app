/**
 * Visas Index Page
 * 
 * Directory listing all available countries for visa information
 */

'use client'

import { getAllCountries } from '@/lib/travelData'
import TrustShield from '@/components/TrustShield'
import Link from 'next/link'
import { Plane, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VisasPage() {
  const countries = getAllCountries()

  return (
    <>
      <TrustShield />
      <div className="min-h-screen bg-black pt-20 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-neon-cyan transition-colors">
                Home
              </Link>
              {' / '}
              <span className="text-white">Visas</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <Plane className="h-12 w-12 md:h-16 md:w-16 text-neon-cyan" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic text-gradient">
                VISA GUIDE
              </h1>
            </div>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Complete visa information for countries worldwide. Find requirements, application process, fees, and
              official links.
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {countries.map((country, index) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Link
                  href={`/visas/${country.slug}`}
                  className="block glass-strong rounded-xl p-6 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300 h-full group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{country.flagEmoji}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold heading-robotic text-white mb-1 group-hover:text-neon-cyan transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-sm text-white/60">Visa Guide</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-white/70">
                      <span className="font-semibold">Requirements:</span> {country.visa.requirements.length} items
                    </div>
                    <div className="text-sm text-white/70">
                      <span className="font-semibold">Official Site:</span> Available
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neon-cyan group-hover:text-electric-blue transition-colors font-semibold">
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <div className="glass-strong rounded-xl p-8 border border-neon-cyan/20 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold heading-robotic text-white mb-4">
              IMPORTANT INFORMATION
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Tour Wise AI is a travel navigator, not a government agency. Visa requirements and processes can change
              frequently. Always verify current requirements, fees, and processing times with the official government
              websites or nearest embassy/consulate before applying.
            </p>
            <p className="text-white/60 text-sm">
              Visa requirements vary by nationality and purpose of visit. Some countries offer visa-free travel or
              visa-on-arrival options. Check the specific country guide for details.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
