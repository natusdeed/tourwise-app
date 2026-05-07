/**
 * Dynamic Passport Page
 * 
 * Country-specific passport information page with SEO optimization
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import { getCountryBySlug, getAllCountries } from '@/lib/travelData'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo'
import TrustShield from '@/components/TrustShield'
import ActionSidebar from '@/components/ActionSidebar'
import { ExternalLink, Clock, DollarSign, FileText, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

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
    title: `${countryData.name} Passport Requirements ${new Date().getFullYear()} | Tour Wise AI`,
    description: `Complete guide to ${countryData.name} passport application, renewal, requirements, fees, and processing times. Official links and step-by-step instructions.`,
    keywords: [
      `${countryData.name} passport`,
      'passport application',
      'passport renewal',
      'passport requirements',
      'travel documents',
      countryData.name.toLowerCase(),
    ],
    canonicalUrl: `https://tourwiseai.com/passports/${country}`,
  })
}

export default async function PassportPage({ params }: PageProps) {
  const { country } = params
  const countryData = getCountryBySlug(country)

  if (!countryData) {
    notFound()
  }

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Passports', url: '/passports' },
    { name: `${countryData.name} Passport`, url: `/passports/${country}` },
  ])

  const faqSchema = generateFAQSchema([
    {
      question: `How long does it take to get a ${countryData.name} passport?`,
      answer: countryData.passport.processingTime,
    },
    {
      question: `How much does a ${countryData.name} passport cost?`,
      answer: countryData.passport.cost,
    },
    {
      question: `Where can I apply for a ${countryData.name} passport?`,
      answer: `You can apply for a ${countryData.name} passport through the official government website or at designated passport offices. Visit the official website for more information.`,
    },
  ])

  return (
    <>
      <TrustShield />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                  <Link href="/passports" className="hover:text-neon-cyan transition-colors">
                    Passports
                  </Link>
                  {' / '}
                  <span className="text-white">{countryData.name}</span>
                </nav>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{countryData.flagEmoji}</span>
                  <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic text-gradient mb-2">
                      {countryData.name} Passport
                    </h1>
                    <p className="text-lg text-white/70">
                      Complete guide to passport application and renewal
                    </p>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="glass-strong rounded-lg p-4 border border-neon-cyan/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-neon-cyan" />
                      <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">
                        Processing Time
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">{countryData.passport.processingTime}</p>
                  </div>

                  <div className="glass-strong rounded-lg p-4 border border-neon-cyan/20">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-5 w-5 text-neon-cyan" />
                      <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">
                        Cost
                      </span>
                    </div>
                    <p className="text-lg font-bold text-white">{countryData.passport.cost}</p>
                  </div>

                  <div className="glass-strong rounded-lg p-4 border border-neon-cyan/20">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-neon-cyan" />
                      <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">
                        Official Site
                      </span>
                    </div>
                    <a
                      href={countryData.passport.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-neon-cyan hover:text-electric-blue transition-colors flex items-center gap-2"
                    >
                      Visit Official Site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Critical Updates */}
              {countryData.updates.filter((u) => u.type === 'Critical').length > 0 && (
                <div className="mb-8 glass-strong rounded-lg p-6 border border-amber-500/30 bg-amber-500/10">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xl font-bold heading-robotic text-amber-400 mb-2">
                        CRITICAL UPDATES
                      </h3>
                      {countryData.updates
                        .filter((u) => u.type === 'Critical')
                        .map((update, index) => (
                          <div key={index} className="mb-2">
                            <span className="text-sm text-amber-300/70">
                              {new Date(update.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                              {' - '}
                            </span>
                            <span className="text-white font-semibold">{update.title}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Guide Content */}
              <div className="glass-strong rounded-xl p-6 md:p-8 border border-neon-cyan/20 mb-8">
                <div className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold heading-robotic text-gradient mb-6 mt-8 first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold heading-robotic text-neon-cyan mb-4 mt-6">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-white mb-3 mt-4">{children}</h3>
                      ),
                      p: ({ children }) => <p className="mb-4 text-white/90 leading-relaxed">{children}</p>,
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 text-white/90 ml-4">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2 text-white/90 ml-4">{children}</ol>
                      ),
                      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-cyan hover:text-electric-blue underline transition-colors"
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-white">{children}</strong>
                      ),
                    }}
                  >
                    {countryData.passport.guideMarkdown}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Important Notes */}
              <div className="glass-strong rounded-xl p-6 border border-neon-cyan/20">
                <h3 className="text-xl font-bold heading-robotic text-neon-cyan mb-4">
                  IMPORTANT REMINDER
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Tour Wise AI is a travel navigator, not a government agency. The information provided here is for
                  general guidance only. Always verify current requirements, fees, and processing times with the{' '}
                  <a
                    href={countryData.passport.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-electric-blue underline"
                  >
                    official government website
                  </a>{' '}
                  before submitting your application.
                </p>
                <a
                  href={countryData.passport.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-bold heading-robotic py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Visit Official Website
                  <ExternalLink className="h-5 w-5" />
                </a>
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
