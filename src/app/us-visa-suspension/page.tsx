/**
 * US Visa Suspension Page
 * 
 * Information about the US State Department's pause on immigrant visa processing
 * for nationals from 75 countries effective January 21, 2026
 */

'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import TrustShield from '@/components/TrustShield'
import Link from 'next/link'
import { AlertTriangle, Search, ExternalLink, Info, Calendar, Plane, Users } from 'lucide-react'
import { motion } from 'framer-motion'

// List of 75 affected countries
const AFFECTED_COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Antigua and Barbuda',
  'Armenia',
  'Azerbaijan',
  'Bahamas',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belize',
  'Bhutan',
  'Bosnia and Herzegovina',
  'Brazil',
  'Burma (Myanmar)',
  'Cambodia',
  'Cameroon',
  'Cape Verde',
  'Colombia',
  'Côte d\'Ivoire',
  'Cuba',
  'Democratic Republic of the Congo',
  'Dominica',
  'Egypt',
  'Eritrea',
  'Ethiopia',
  'Fiji',
  'The Gambia',
  'Georgia',
  'Ghana',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Haiti',
  'Iran',
  'Iraq',
  'Jamaica',
  'Jordan',
  'Kazakhstan',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Lebanon',
  'Liberia',
  'Libya',
  'North Macedonia',
  'Moldova',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Nepal',
  'Nicaragua',
  'Nigeria',
  'Pakistan',
  'Republic of the Congo',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Senegal',
  'Sierra Leone',
  'Somalia',
  'South Sudan',
  'Sudan',
  'Syria',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tunisia',
  'Uganda',
  'Uruguay',
  'Uzbekistan',
  'Yemen',
]

export default function USVisaSuspensionPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return AFFECTED_COUNTRIES
    }
    const query = searchQuery.toLowerCase()
    return AFFECTED_COUNTRIES.filter(country => 
      country.toLowerCase().includes(query)
    )
  }, [searchQuery])

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
              <Link href="/alerts" className="hover:text-neon-cyan transition-colors">
                Travel Alerts
              </Link>
              {' / '}
              <span className="text-white">US Visa Suspension</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <AlertTriangle className="h-12 w-12 md:h-16 md:w-16 text-red-500" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic text-gradient">
                US IMMIGRANT VISA SUSPENSION
              </h1>
            </div>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-4">
              The US State Department has paused all Immigrant Visa processing for nationals from <span className="text-neon-cyan font-semibold">75 countries</span> effective <span className="text-neon-cyan font-semibold">January 21, 2026</span>, due to new public charge screening rules.
            </p>

            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-neon-cyan" />
                <span>Effective: January 21, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-neon-cyan" />
                <span>75 Countries Affected</span>
              </div>
            </div>
          </div>

          {/* Critical Alert Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-xl p-6 md:p-8 border-2 border-red-500/40 mb-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold heading-robotic text-white mb-4">
                  IMPORTANT INFORMATION
                </h2>
                <div className="space-y-3 text-white/90 leading-relaxed">
                  <p>
                    <span className="font-semibold text-neon-cyan">What&apos;s Affected:</span> This pause affects <strong>immigrant visas only</strong> (green cards processed abroad). <strong>Nonimmigrant visas</strong> like tourist, student, or work visas are technically exempt from this specific order, but expect extreme delays due to increased scrutiny.
                  </p>
                  <p>
                    <span className="font-semibold text-neon-cyan">What This Means:</span> Nationals from these 75 countries may still attend interviews and submit applications, but <strong>no immigrant visas will be issued</strong> during the suspension period.
                  </p>
                  <p>
                    <span className="font-semibold text-neon-cyan">Exception:</span> Dual nationals who apply using a valid passport from a country <strong>not on this list</strong> are exempt from this suspension.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-neon-cyan/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="text-center text-white/60 text-sm mt-3">
              {filteredCountries.length === AFFECTED_COUNTRIES.length 
                ? 'Showing all 75 affected countries'
                : `Showing ${filteredCountries.length} of ${AFFECTED_COUNTRIES.length} countries`
              }
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="glass rounded-lg p-4 border border-neon-cyan/20 hover:border-neon-cyan/40 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <span className="text-white font-medium text-sm md:text-base">
                  {country}
                </span>
              </motion.div>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No countries found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {/* Additional Information Box */}
          <div className="glass-strong rounded-xl p-6 md:p-8 border border-neon-cyan/20 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Info className="h-6 w-6 text-neon-cyan flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold heading-robotic text-white mb-4">
                  WHAT YOU NEED TO KNOW
                </h2>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-neon-cyan mb-2">Why This Happened</h3>
                    <p className="text-sm">
                      The US State Department implemented this pause to establish new public charge screening procedures. This is part of updated immigration policy requiring enhanced verification that immigrants can support themselves financially without relying on public benefits.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neon-cyan mb-2">Next Steps</h3>
                    <p className="text-sm">
                      If you&apos;re from one of these countries and have an immigrant visa application in process, contact your nearest US embassy or consulate for guidance. Monitor official updates from the State Department for when processing resumes.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neon-cyan mb-2">Stay Updated</h3>
                    <p className="text-sm">
                      Visa policies change frequently. Always verify the latest requirements directly with official government sources or your nearest embassy before making travel plans or submitting applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Official Source Link */}
          <div className="glass-strong rounded-xl p-6 md:p-8 border border-neon-cyan/20 text-center">
            <h2 className="text-xl font-bold heading-robotic text-white mb-4">
              OFFICIAL SOURCE
            </h2>
            <p className="text-white/70 mb-4">
              For the latest official information and updates, visit the US State Department website:
            </p>
            <a
              href="https://travel.state.gov/content/travel/en/News/visas-news/immigrant-visa-processing-updates-for-nationalities-at-high-risk-of-public-benefits-usage.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan/60 transition-all duration-300 font-semibold group"
            >
              View Official Announcement
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 glass rounded-xl p-6 border border-white/10 text-center max-w-4xl mx-auto">
            <p className="text-white/60 text-sm leading-relaxed">
              <strong className="text-white/80">Disclaimer:</strong> TourWise AI is a travel navigator, not a government agency. 
              Visa requirements and processes can change frequently. Always verify current requirements, fees, and processing times 
              with the official government websites or nearest embassy/consulate before applying.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
