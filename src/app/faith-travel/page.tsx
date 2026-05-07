import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import AffiliateLink from '../../components/AffiliateLink'
import ComparisonTable from '../../components/ComparisonTable'
import FAQAccordion from '../../components/FAQAccordion'
import ItineraryCard from '../../components/ItineraryCard'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { generateBestAffiliateLink } from '../../lib/affiliate'
import { breadcrumbListSchema, touristTripSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Faith Travel Hub | Christian Pilgrimages & Holy Land Planning',
  description:
    'Plan Christian travel with confidence: Holy Land trips, Camino planning, Vatican & Rome walks, and trusted booking partners — with transparent affiliate disclosures.',
  alternates: { canonical: 'https://tourwiseai.com/faith-travel' },
}

const faqs = [
  {
    question: 'What counts as faith-based travel?',
    answer:
      'Anything intentionally spiritual—pilgrimages, mission prep, cathedral cities, biblical sites, or walking routes like the Camino. The goal is alignment between your itinerary and your purpose for going.',
  },
  {
    question: 'Do affiliate links change the price I pay?',
    answer:
      'No. Partners pay a commission on their side. We disclose relationships clearly and only recommend tools we would use ourselves.',
  },
  {
    question: 'Where should I start if I am new?',
    answer:
      'Pick one anchor trip (Holy Land guided tour, DIY Camino stage, or a Rome pilgrimage week), estimate budget and mobility, then build flights and lodging around that spine.',
  },
]

export default function FaithTravelHubPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Faith Travel', path: '/faith-travel' },
  ])

  const tripSchema = touristTripSchema({
    name: 'Faith travel planning hub',
    description:
      'Curated starters for Holy Land itineraries, Camino staging, Vatican & Rome pilgrimage days.',
    itinerary: [
      { name: 'Holy Land tours from the USA', description: 'Flying patterns + guided tour timings' },
      { name: 'Camino de Santiago', description: 'Stages, packs, trains to starting points' },
      { name: 'Vatican & Rome', description: 'Christian sites paired with quieter neighborhoods' },
    ],
  })

  const toursUrl =
    generateBestAffiliateLink({ category: 'tour', vertical: 'faith-travel' }) ||
    'https://www.getyourguide.com'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <Script
        id="faith-travel-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="faith-travel-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
            Faith travel
          </p>
          <h1 className="text-4xl md:text-6xl font-bold heading-robotic">
            <span className="text-gradient">Plan trips that match your purpose</span>
          </h1>
          <p className="text-lg text-white/75 max-w-3xl mx-auto">
            Practical starters for pilgrims and faith-curious travelers. Each deep guide below uses the
            same building blocks: flights, grounding days, respectful pacing, and clear affiliate
            transparency.
          </p>
          <AffiliateDisclosure variant="card" className="text-left max-w-3xl mx-auto" />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-14">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          <ItineraryCard
            title="Holy Land tours from the USA"
            description="Long-haul friendly routing, visa reminders, and when a guided pilgrimage saves time."
            duration="Typical guided trip: 8–11 days"
            region="Israel & Palestine sites"
            href="/holy-land-tours-from-usa"
          />
          <ItineraryCard
            title="Camino de Santiago planner"
            description="Pick a camino, stage length, and pack list without overcomplicating your first walk."
            duration="Often 5–35 days depending on route"
            region="Northern Spain"
            href="/camino-de-santiago-planner"
          />
          <ItineraryCard
            title="Vatican & Rome Christian itinerary"
            description="Liturgy timing, museum tickets, and contemplative pockets beyond the big three basilicas."
            duration="City break: 4–7 days"
            region="Lazio, Italy"
            href="/vatican-rome-christian-itinerary"
          />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <ComparisonTable
            title="Choose your first planning track"
            caption="Compare entry paths for different faith-travel styles"
            columns={[
              { key: 'track', label: 'Track' },
              { key: 'best', label: 'Best for' },
              { key: 'watch', label: 'Watch-outs' },
            ]}
            rows={[
              {
                track: 'Guided Holy Land',
                best: 'First-timers needing shared transport & teaching',
                watch: 'Fixed dates; less flexibility',
              },
              {
                track: 'DIY Camino stage',
                best: 'Walkers who want rhythm + simple lodging',
                watch: 'Bag transfers & weather windows',
              },
              {
                track: 'Rome pilgrimage week',
                best: 'Couples or families mixing art + liturgy',
                watch: 'Museum tickets sell out fast',
              },
            ]}
          />

          <div className="glass-strong border border-neon-cyan/25 rounded-xl p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold heading-robotic text-white">
              Book trusted experiences
            </h2>
            <p className="text-white/70">
              When you are ready to compare operators, start with a neutral search so you can filter
              reviews, duration, and cancellation policies.
            </p>
            <AffiliateLink
              href={toursUrl}
              trackingLabel="faith_travel_tours_deeplink"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
            >
              Search faith-friendly tours & activities
            </AffiliateLink>
          </div>

          <LeadMagnetForm
            magnetId="faith-packing-checklist"
            title="Free faith-travel packing checklist"
            description="PDF with modesty-friendly layers, walking shoe notes, and space for devotional items."
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      <StickyTripCTA
        title="Need flights before you finalize lodgings?"
        subtitle="Grab live fares, then tighten your pilgrimage days."
        href="/api/affiliate?category=flight&vertical=faith-travel"
        ctaLabel="Check flight affiliate link"
      />
      <Footer />
    </main>
  )
}
