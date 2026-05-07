import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import AffiliateLink from '../../components/AffiliateLink'
import FAQAccordion from '../../components/FAQAccordion'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { generateBestAffiliateLink } from '../../lib/affiliate'
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
    question: 'How many “big” sites per day is realistic?',
    answer:
      'Two major blocks plus meals is generous. Add buffer for security lines, midday heat, and Sabbath or liturgical closures.',
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
      { name: 'Arrival & grounding day', description: 'Jet lag buffer near Tel Aviv or Amman' },
      { name: 'Jerusalem old city', description: 'Via Dolorosa, Holy Sepulchre, Western Wall' },
      { name: 'Galilee loop', description: 'Nazareth, Sea of Galilee, Jordan River baptismal sites' },
    ],
  })

  const deepLink =
    generateBestAffiliateLink({ destination: 'Jerusalem', category: 'tour' }) ||
    'https://www.viator.com'

  const faqJson = faqPageSchema(faqs)

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
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

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
            Holy Land • USA departures
          </p>
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Holy Land tours from the USA</span>
          </h1>
          <p className="text-lg text-white/75">
            Start with your flight arc, add two buffer days, then lock a tour spine. Affiliates help us
            keep tools free—prices stay the same for you.
          </p>
          <AffiliateDisclosure />
          <div className="glass-strong border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white heading-robotic">Quick planning loop</h2>
            <ol className="list-decimal list-inside space-y-2 text-white/75">
              <li>Pick guided vs DIY and your must-see triangle (Jerusalem / Galilee / Bethlehem).</li>
              <li>Book long-haul first; add travel insurance while stateside.</li>
              <li>Stack walking shoes, sun layers, and a respectful modesty kit.</li>
            </ol>
            <AffiliateLink
              href={deepLink}
              trackingLabel="holy_land_tours_search"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
            >
              Compare Holy Land experiences
            </AffiliateLink>
          </div>
          <LeadMagnetForm
            magnetId="holy-land-prep"
            title="Holy Land trip prep sheet"
            description="One-page PDF: documents, modesty notes, and a 10-day pacing sketch."
          />
          <FAQAccordion items={faqs} withJsonLd={false} title="Holy Land FAQ" />
        </div>
      </section>

      <StickyTripCTA
        title="Lock flights before the tour deposit deadline"
        subtitle="Use our affiliate flow to compare carriers, then return to your operator."
        href="/api/affiliate?category=flight&destination=Tel%20Aviv"
        ctaLabel="Open flight affiliate link"
      />
      <Footer />
    </main>
  )
}
