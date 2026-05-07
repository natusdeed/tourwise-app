import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import AffiliateLink from '../../components/AffiliateLink'
import ComparisonTable from '../../components/ComparisonTable'
import FAQAccordion from '../../components/FAQAccordion'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { generateBestAffiliateLink } from '../../lib/affiliate'
import { breadcrumbListSchema, touristTripSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Camino de Santiago Planner | Stages, Gear & Trains',
  description:
    'Plan your first Camino: popular starting points, daily distances, gear, and affiliate-backed booking shortcuts.',
  alternates: { canonical: 'https://tourwiseai.com/camino-de-santiago-planner' },
}

const faqs = [
  {
    question: 'Which Camino should beginners pick?',
    answer:
      'The French Way from St. Jean Pied de Port is classic but steep on day one. The Portuguese Way or last 100km from Sarria are gentler intros.',
  },
  {
    question: 'Do I need to book albergues?',
    answer:
      'Busy seasons (May–September) reward early arrivals or light booking for private albergues. Winter walkers can wing it more.',
  },
  {
    question: 'What is a realistic daily distance?',
    answer:
      'Most first-timers settle into 18–24 km after a week. Build two short days every five walking days.',
  },
]

export default function CaminoPlannerPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Faith Travel', path: '/faith-travel' },
    { name: 'Camino planner', path: '/camino-de-santiago-planner' },
  ])

  const tripSchema = touristTripSchema({
    name: 'Camino de Santiago walking plan',
    description: 'Lightweight staging for first-time pilgrims walking to Santiago de Compostela.',
    itinerary: [
      { name: 'Transport to start', description: 'Train or bus to your chosen jump-off' },
      { name: 'Walking rhythm', description: 'Early starts, cafe breaks, foot care' },
      { name: 'Santiago finale', description: 'Cathedral visit, compostela pickup, rest day' },
    ],
  })

  const stayUrl =
    generateBestAffiliateLink({ destination: 'Santiago de Compostela', category: 'hotel' }) ||
    'https://www.booking.com'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <Script
        id="camino-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="camino-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
              Walking pilgrimage
            </p>
            <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
              <span className="text-gradient">Camino de Santiago planner</span>
            </h1>
            <p className="text-lg text-white/75">
              Build a humane pace: train to your start, walk shorter days at first, and protect your
              feet like they are sacred—because on the Camino, they are.
            </p>
            <AffiliateDisclosure />
          </div>

          <ComparisonTable
            title="Pick your start personality"
            columns={[
              { key: 'start', label: 'Start' },
              { key: 'vibe', label: 'Vibe' },
              { key: 'days', label: 'Typical duration' },
            ]}
            rows={[
              { start: 'St. Jean • French Way', vibe: 'Social + challenging kickoff', days: '30–35' },
              { start: 'Sarria • last 100km', vibe: 'Credential-friendly sprint', days: '5–7' },
              { start: 'Porto • Portuguese', vibe: 'Coastal breezes + cafes', days: '10–14' },
            ]}
          />

          <div className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Book Santiago nights early</h2>
            <p className="text-white/70 text-sm md:text-base">
              Your final city is small; festivals and finishing waves fill beds fast. Affiliate links keep
              our planner free.
            </p>
            <AffiliateLink
              href={stayUrl}
              trackingLabel="camino_santiago_lodging"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
            >
              Search stays in Santiago
            </AffiliateLink>
          </div>

          <LeadMagnetForm
            magnetId="camino-starter"
            title="Camino starter PDF"
            description="Training week, pack weight targets, and albergue etiquette on one page."
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      <StickyTripCTA
        title="Flying into Madrid or Porto?"
        subtitle="Grab intercity trains after you secure international legs."
        href="/api/affiliate?category=flight&destination=Madrid"
        ctaLabel="Open flight affiliate link"
      />
      <Footer />
    </main>
  )
}
