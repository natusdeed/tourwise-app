/**
 * Travel Alerts Page
 * 
 * Centralized page aggregating all travel alerts and updates from all countries
 */

import type { Metadata } from 'next'
import { getAllAlerts } from '@/lib/travelData'
import TrustShield from '@/components/TrustShield'
import Link from 'next/link'
import { AlertTriangle, Calendar, ArrowRight, Info, AlertCircle } from 'lucide-react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Travel Alerts & Visa Updates 2026 | Tour Wise AI',
  description: 'Real-time updates on visa policies, passport delays, and travel regulations. Stay informed about critical travel alerts and border updates from around the world.',
  keywords: [
    'travel alerts',
    'visa updates',
    'passport delays',
    'travel regulations',
    'border updates',
    'travel warnings',
    'immigration news',
    'travel advisories',
  ],
  canonicalUrl: 'https://tourwiseai.com/alerts',
})

export default function AlertsPage() {
  const alerts = getAllAlerts()

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

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
              <span className="text-white">Travel Alerts</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <AlertTriangle className="h-12 w-12 md:h-16 md:w-16 text-neon-cyan" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic text-gradient">
                Global Travel Intelligence & Border Updates
              </h1>
            </div>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest travel alerts, visa policy changes, passport updates, and border regulations from countries worldwide.
            </p>

            {alerts.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-neon-cyan">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  {alerts.length} {alerts.length === 1 ? 'Alert' : 'Alerts'} Active
                </span>
              </div>
            )}
          </div>

          {/* Alerts Feed */}
          {alerts.length === 0 ? (
            <div className="glass-strong rounded-xl p-12 border border-neon-cyan/20 text-center max-w-2xl mx-auto">
              <Info className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-bold heading-robotic text-white mb-4">
                No Active Alerts
              </h2>
              <p className="text-white/70">
                There are currently no active travel alerts. Check back regularly for the latest updates on visa policies, passport regulations, and border changes.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {alerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className="glass-strong rounded-xl border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300 overflow-hidden group"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="p-6 md:p-8">
                    {/* Header Row: Date Badge, Country Info, Type Badge */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      {/* Date Badge */}
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                        <Calendar className="h-4 w-4 text-neon-cyan" />
                        <time className="text-sm font-semibold text-white">
                          {formatDate(alert.date)}
                        </time>
                      </div>

                      {/* Country Flag and Name */}
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-3xl">{alert.countryFlag}</span>
                        <span className="text-lg font-bold heading-robotic text-white">
                          {alert.countryName}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                          alert.type === 'Critical'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                        }`}
                      >
                        {alert.type === 'Critical' ? (
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Critical
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Info
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold heading-robotic text-white mb-4 group-hover:text-neon-cyan transition-colors">
                      {alert.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {alert.summary}
                    </p>

                    {/* Action Button */}
                    <Link
                      href={`/passports/${alert.countrySlug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan/60 transition-all duration-300 font-semibold group/btn"
                    >
                      Read Requirement
                      <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="glass-strong rounded-xl p-8 border border-neon-cyan/20 text-center max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold heading-robotic text-white mb-4">
              STAY INFORMED
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Travel alerts and border updates change frequently. While we strive to provide accurate and up-to-date information, 
              always verify current requirements directly with official government sources or embassies before making travel plans.
            </p>
            <p className="text-white/60 text-sm">
              This page aggregates updates from our country-specific travel guides. For detailed requirements, visit the individual 
              country pages via the &quot;Read Requirement&quot; buttons above.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
