import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import ComparisonTable from '../../components/ComparisonTable'
import FAQAccordion from '../../components/FAQAccordion'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { breadcrumbListSchema, faqPageSchema, touristTripSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Holy Land Tours from the USA | Planning Guide',
  description:
    'How US travelers plan Holy Land tours: flight hubs, guided vs DIY, respectful pacing, and booking partners (affiliate disclosure included).',
  alternates: { canonical: 'https://tourwiseai.com/holy-land-tours-from-usa' },
}

const faqs = [
  {
    question: 'Do I need a guided tour?',
    answer:
      'Not always, but many first-timers prefer a guide for border crossings, security briefings, and historical context at biblical sites.',
  },
  {
    question: 'Which US hubs have the smoothest connections?',
    answer:
      'NYC/IAD/ATL/MIA/FRA or IST combos are common depending on carriers. Aim for overnight eastbound hops to steal a workable arrival day.',
  },
  {
    question: 'How many "big" sites per day is realistic?',
    answer:
      'Two major blocks plus meals is generous. Add buffer for security lines, midday heat, and Sabbath or liturgical closures.',
  },
]

const comparisonColumns = [
  { key: 'focus', label: 'Operator Focus' },
  { key: 'bestFor', label: 'Best For' },
  { key: 'watchout', label: 'Watch Out For' },
]

const comparisonRows = [
  {
    focus: 'Pilgrimage-heavy itineraries',
    bestFor: 'First-time faith travelers who want detailed biblical context',
    watchout: 'Can feel rushed if your group also wants slower reflection time',
  },
  {
    focus: 'Mixed pilgrimage + local culture',
    bestFor: 'Families balancing sacred sites, food, and manageable transfer days',
    watchout: 'Optional add-ons can inflate final package cost',
  },
  {
    focus: 'Small-group boutique pacing',
    bestFor: 'Travelers who prefer fewer sites per day and deeper time on location',
    watchout: 'Higher per-person pricing and fewer departure dates',
  },
]

export default function HolyLandToursPage() {
  const breadcrumbs = breadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Faith Travel', path: '/faith-travel' },
    { name: 'Holy Land tours from the USA', path: '/holy-land-tours-from-usa' },
  ])

  const tripSchema = touristTripSchema({
    name: 'Holy Land tours from the United States',
    description:
      'Flight-first planning for American travelers considering guided Holy Land pilgrimages.',
    itinerary: [
      { name: 'Arrival and grounding day', description: 'Jet lag buffer near Tel Aviv or Amman' },
      { name: 'Jerusalem old city', description: 'Via Dolorosa, Holy Sepulchre, Western Wall' },
      { name: 'Galilee loop', description: 'Nazareth, Sea of Galilee, Jordan River baptismal sites' },
    ],
  })

  const faqJson = faqPageSchema(faqs)

  return (
    <main className="relative min-h-screen pt-20 pb-28 md:pt-24">
      <div className="pointer-events-none fixed inset-0 grid-background opacity-30" />
      <Script
        id="holy-land-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="holy-land-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <Script
        id="holy-land-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      <section className="relative px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="heading-robotic text-xs uppercase tracking-[0.25em] text-neon-cyan">
            Holy Land • USA departures
          </p>
          <h1 className="heading-robotic text-4xl font-bold md:text-5xl">
            <span className="text-gradient">Holy Land tours from the USA</span>
          </h1>
          <p className="text-lg text-white/75">
            Start with your flight arc, add two buffer days, then lock a tour spine. Affiliates help us
            keep tools free while prices stay the same for you.
          </p>
          <AffiliateDisclosure />

          <div className="glass-strong space-y-4 rounded-xl border border-white/10 p-6">
            <h2 className="heading-robotic text-xl font-semibold text-white">Quick planning loop</h2>
            <ol className="list-inside list-decimal space-y-2 text-white/75">
              <li>Pick guided vs DIY and your must-see triangle (Jerusalem / Galilee / Bethlehem).</li>
              <li>Book long-haul first, then lock insurance and transfer backups while still stateside.</li>
              <li>Pack walking shoes, sun layers, hydration strategy, and a modesty-ready day kit.</li>
            </ol>
            <div className="flex flex-wrap gap-3">
              <ExternalAffiliateLink
                href={AFFILIATE_LINKS.tours.klook.url}
                trackingLabel="faith-holyland-klook"
                className="text-neon-cyan underline underline-offset-2 hover:text-white/90 text-sm font-medium"
                aria-label="Book activities for the Holy Land on Klook in a new tab"
              >
                Compare Holy Land experiences
              </ExternalAffiliateLink>
              <ExternalAffiliateLink
                href={AFFILIATE_LINKS.tours.wegotrip.url}
                trackingLabel="faith-holyland-wegotrip"
                className="text-neon-cyan underline underline-offset-2 hover:text-white/90 text-sm font-medium"
                aria-label="Browse audio and city tours for the Holy Land on Wegotrip in a new tab"
              >
                Explore guided day tours
              </ExternalAffiliateLink>
            </div>
          </div>

          <ComparisonTable
            title="How to pick your operator style"
            columns={comparisonColumns}
            rows={comparisonRows}
            caption="Operator style comparison for Holy Land tours from the USA."
          />

          <section className="glass-strong space-y-4 rounded-xl border border-white/10 p-6">
            <h2 className="heading-robotic text-xl font-semibold text-white">Sample 12-day pacing</h2>
            <p className="text-white/75">
              Keep each day realistic: two major site blocks, one transition block, and evening recovery
              time. This protects energy for your highest-priority biblical sites.
            </p>
            <ul className="list-inside list-disc space-y-2 text-white/75">
              <li>Days 1-2: arrival, rest, and orientation setup.</li>
              <li>Days 3-5: Jerusalem and Old City priority sequence.</li>
              <li>Days 6-8: Bethlehem, Jordan Valley, and Dead Sea corridor.</li>
              <li>Days 9-10: Galilee loop with lighter evening commitments.</li>
              <li>Days 11-12: flex day, contingency, and departure staging.</li>
            </ul>
          </section>

          <LeadMagnetForm
            magnetId="holy-land-12-day"
            title="Get the Free 12-Day Holy Land Itinerary PDF"
            description="We send the PDF to your inbox instantly so you can compare operators with a clear framework."
          />

          <FAQAccordion items={faqs} withJsonLd={false} title="Holy Land FAQ" />
        </div>
      </section>

      <StickyTripCTA destination="Holy Land" />
      <Footer />
    </main>
  )
}
