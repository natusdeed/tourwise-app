/**
 * Dynamic Embassy Page
 * 
 * Country-specific embassy and consulate information page with SEO optimization
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import { getCountryBySlug, getAllCountries } from '@/lib/travelData'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import TrustShield from '@/components/TrustShield'
import ActionSidebar from '@/components/ActionSidebar'
import { MapPin, ExternalLink, Building2, Phone, Globe } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: {
    country: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = params
  const countryData = getCountryBySlug(country)

  if (!countryData) {
    return {
      title: 'Country Not Found | Tour Wise AI',
    }
  }

  return generateSEOMetadata({
    title: `${countryData.name} Embassies & Consulates Worldwide ${new Date().getFullYear()} | Tour Wise AI`,
    description: `Find ${countryData.name} embassies and consulates worldwide. Get contact information, addresses, map links, and office locations for visa services and consular assistance.`,
    keywords: [
      `${countryData.name} embassy`,
      `${countryData.name} consulate`,
      'embassy locations',
      'consulate offices',
      'diplomatic missions',
      countryData.name.toLowerCase(),
    ],
    canonicalUrl: `https://tourwiseai.com/embassies/${country}`,
  })
}

export default async function EmbassyPage({ params }: PageProps) {
  const { country } = params
  const countryData = getCountryBySlug(country)

  if (!countryData) {
    notFound()
  }

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Embassies', url: '/embassies' },
    { name: `${countryData.name} Embassies`, url: `/embassies/${country}` },
  ])

  return (
    <>
      <TrustShield />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-black pt-20 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-8">
                <nav className="text-sm text-white/60 mb-4">
                  <Link href="/" className="hover:text-neon-cyan transition-colors">
                    Home
                  </Link>
                  {' / '}
                  <Link href="/embassies" className="hover:text-neon-cyan transition-colors">
                    Embassies
                  </Link>
                  {' / '}
                  <span className="text-white">{countryData.name}</span>
                </nav>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{countryData.flagEmoji}</span>
                  <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic text-gradient mb-2">
                      {countryData.name} Embassies
                    </h1>
                    <p className="text-lg text-white/70">
                      Find embassies and consulates worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="glass-strong rounded-xl p-6 border border-neon-cyan/20 mb-8">
                <div className="flex items-start gap-4">
                  <Building2 className="h-6 w-6 text-neon-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold heading-robotic text-white mb-2">
                      EMBASSY & CONSULATE LOCATIONS
                    </h2>
                    <p className="text-white/80 leading-relaxed">
                      Find {countryData.name} diplomatic missions worldwide. Embassies provide full consular services,
                      while consulates typically handle specific regions. Contact the nearest location for visa
                      applications, passport services, and consular assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Embassies List */}
              {countryData.embassies.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {countryData.embassies.map((embassy, index) => (
                    <div
                      key={index}
                      className="glass-strong rounded-xl p-6 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Building2 className="h-5 w-5 text-neon-cyan" />
                            <h3 className="text-xl font-bold heading-robotic text-white">
                              {embassy.city}
                            </h3>
                          </div>

                          <div className="space-y-2 text-white/90">
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{embassy.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {embassy.mapLink && (
                        <a
                          href={embassy.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-neon-cyan hover:text-electric-blue transition-colors text-sm font-semibold"
                        >
                          <Globe className="h-4 w-4" />
                          View on Map
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-strong rounded-xl p-8 border border-neon-cyan/20 text-center mb-8">
                  <Building2 className="h-12 w-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">
                    Embassy information is being updated. Please check the official government website for the most
                    current embassy and consulate locations.
                  </p>
                </div>
              )}

              {/* Important Notes */}
              <div className="glass-strong rounded-xl p-6 border border-neon-cyan/20 mb-8">
                <h3 className="text-xl font-bold heading-robotic text-neon-cyan mb-4">
                  WHAT SERVICES DO EMBASSIES PROVIDE?
                </h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="text-neon-cyan mt-1">•</span>
                    <span>
                      <strong className="text-white">Visa Services:</strong> Process visa applications and provide
                      visa-related information
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neon-cyan mt-1">•</span>
                    <span>
                      <strong className="text-white">Passport Services:</strong> Issue, renew, and provide emergency
                      travel documents
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neon-cyan mt-1">•</span>
                    <span>
                      <strong className="text-white">Consular Assistance:</strong> Help citizens abroad with emergencies,
                      legal issues, and travel advisories
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neon-cyan mt-1">•</span>
                    <span>
                      <strong className="text-white">Notarization:</strong> Notarize documents and provide apostille
                      services
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-neon-cyan mt-1">•</span>
                    <span>
                      <strong className="text-white">Travel Advisories:</strong> Provide updated travel safety
                      information and country-specific advice
                    </span>
                  </li>
                </ul>
              </div>

              {/* Important Reminder */}
              <div className="glass-strong rounded-xl p-6 border border-neon-cyan/20">
                <h3 className="text-xl font-bold heading-robotic text-neon-cyan mb-4">
                  IMPORTANT REMINDER
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Tour Wise AI is a travel navigator, not a government agency. Embassy and consulate locations,
                  contact information, and services may change. Always verify current information with the{' '}
                  <a
                    href={countryData.passport.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-electric-blue underline"
                  >
                    official government website
                  </a>{' '}
                  before visiting or contacting any diplomatic mission.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  <strong>Note:</strong> Embassy hours, contact numbers, and services vary by location. Some services
                  may require appointments. Always check the embassy website or contact them directly before visiting.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <ActionSidebar countryName={countryData.name} countrySlug={countryData.slug} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const countries = getAllCountries()
  return countries.map((country) => ({
    country: country.slug,
  }))
}
