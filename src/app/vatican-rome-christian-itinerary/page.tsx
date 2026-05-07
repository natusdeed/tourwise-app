import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import AffiliateLink from '../../components/AffiliateLink'
import FAQAccordion from '../../components/FAQAccordion'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { generateBestAffiliateLink } from '../../lib/affiliate'
import { breadcrumbListSchema, touristTripSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Vatican & Rome Christian Itinerary | 4–7 Day Plan',
  description:
    'Prioritize St. Peter’s, the Vatican Museums, and contemplative walks through Rome’s Christian layers—with transparent affiliate partners.',
  alternates: { canonical: 'https://tourwiseai.com/vatican-rome-christian-itinerary' },
}

const faqs = [
  {
    question: 'Should I book Vatican Museums online?',
    answer:
      'Yes—morning entry sells out weeks ahead in peak season. Choose early slots to pair with an afternoon rest.',
  },
  {
    question: 'How do I respect dress codes?',
    answer:
      'Shoulders and knees covered in basilicas. Light layers beat heavy coats in shoulder seasons.',
  },
  {
    question: 'Where can I find quiet prayer time?',
    answer:
      'Try Santa Maria in Trastevere at off hours, or the Scala Santa early morning before tour buses arrive.',
  },
]

export default function VaticanRomePage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Faith Travel', path: '/faith-travel' },
    { name: 'Vatican & Rome', path: '/vatican-rome-christian-itinerary' },
  ])

  const tripSchema = touristTripSchema({
    name: 'Christian week in Rome & Vatican City',
    description: 'Balanced mix of major basilicas, museum blocks, and neighborhood prayer walks.',
    itinerary: [
      { name: 'Vatican morning', description: 'Museums + St. Peter’s dome or grottoes' },
      { name: 'Major basilicas', description: 'St. John Lateran, St. Mary Major, St. Paul Outside the Walls' },
      { name: 'Local Rome', description: 'Trastevere, Jewish quarter history, evening mass' },
    ],
  })

  const activitiesUrl =
    generateBestAffiliateLink({ destination: 'Vatican', category: 'activity' }) ||
    'https://www.getyourguide.com'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <Script
        id="rome-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="rome-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
              Vatican • Rome
            </p>
            <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
              <span className="text-gradient">Vatican & Rome Christian itinerary</span>
            </h1>
            <p className="text-lg text-white/75">
              Anchor on liturgy times, then wrap museums and neighborhood walks. Affiliate partners help
              us fund free AI tools—your ticket price stays the same.
            </p>
            <AffiliateDisclosure />
          </div>

          <div className="glass-strong border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white heading-robotic">4-day rhythm</h2>
            <ul className="list-disc list-inside space-y-2 text-white/75">
              <li>Day 1: Arrive, evening mass near your apartment.</li>
              <li>Day 2: Vatican block + long lunch break.</li>
              <li>Day 3: Basilica day with metro + walking connectors.</li>
              <li>Day 4: Slow Trastevere + departure buffer.</li>
            </ul>
            <AffiliateLink
              href={activitiesUrl}
              trackingLabel="vatican_rome_skip_lines"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
            >
              Browse Vatican & Rome experiences
            </AffiliateLink>
          </div>

          <LeadMagnetForm
            magnetId="vatican-rome-walks"
            title="Walking map PDF"
            description="Printable day blocks with prayer pauses and cafe stops."
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      <StickyTripCTA
        title="Need a central apartment or hotel?"
        subtitle="Book refundable rates when Vatican tickets are still pending."
        href="/api/affiliate?category=hotel&destination=Rome"
        ctaLabel="Search stays (affiliate)"
      />
      <Footer />
    </main>
  )
}
