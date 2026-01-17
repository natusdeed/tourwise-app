/**
 * Embassies Index Page
 * 
 * Directory listing all available countries for embassy information
 */

'use client'

import { getAllCountries } from '@/lib/travelData'
import TrustShield from '@/components/TrustShield'
import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EmbassiesPage() {
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
              <span className="text-white">Embassies</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <Building2 className="h-12 w-12 md:h-16 md:w-16 text-neon-cyan" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic text-gradient">
                EMBASSIES & CONSULATES
              </h1>
            </div>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Find diplomatic missions worldwide. Get addresses, contact information, and map links for embassies and
              consulates.
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
                  href={`/embassies/${country.slug}`}
                  className="block glass-strong rounded-xl p-6 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300 h-full group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{country.flagEmoji}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold heading-robotic text-white mb-1 group-hover:text-neon-cyan transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-sm text-white/60">Embassy Locations</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-white/70">
                      <span className="font-semibold">Locations:</span> {country.embassies.length} embassy/consulate
                      {country.embassies.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-white/70">
                      <span className="font-semibold">Services:</span> Visa, Passport, Consular
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neon-cyan group-hover:text-electric-blue transition-colors font-semibold">
                    View Locations
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <div className="glass-strong rounded-xl p-8 border border-neon-cyan/20 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold heading-robotic text-white mb-4">
              EMBASSY SERVICES
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Embassies and consulates provide essential services including visa processing, passport services, consular
              assistance, document notarization, and travel advisories. Contact the nearest location for your specific
              needs.
            </p>
            <p className="text-white/60 text-sm mb-4">
              Tour Wise AI is a travel navigator, not a government agency. Embassy locations, contact information, and
              services may change. Always verify current information with the official government websites before
              visiting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-left">
              <div className="text-white/70 text-sm">
                <strong className="text-white">Visa Services</strong>
                <p className="mt-1">Process visa applications</p>
              </div>
              <div className="text-white/70 text-sm">
                <strong className="text-white">Passport Services</strong>
                <p className="mt-1">Issue and renew passports</p>
              </div>
              <div className="text-white/70 text-sm">
                <strong className="text-white">Consular Help</strong>
                <p className="mt-1">Emergency assistance abroad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
