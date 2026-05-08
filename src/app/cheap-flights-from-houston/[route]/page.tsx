import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import FAQAccordion from '@/components/FAQAccordion'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'

const routes = {
  'houston-to-lagos-flights': { title: 'Houston to Lagos flights', international: true, destinationAirport: 'Murtala Muhammed International Airport (LOS)' },
  'houston-to-cancun-flights': { title: 'Houston to Cancun flights', international: true, destinationAirport: 'Cancun International Airport (CUN)' },
  'houston-to-london-flights': { title: 'Houston to London flights', international: true, destinationAirport: 'Heathrow (LHR) and Gatwick (LGW)' },
  'houston-to-paris-flights': { title: 'Houston to Paris flights', international: true, destinationAirport: 'Paris Charles de Gaulle Airport (CDG)' },
  'houston-to-rome-flights': { title: 'Houston to Rome flights', international: true, destinationAirport: 'Rome Fiumicino Airport (FCO)' },
  'houston-to-orlando-flights': { title: 'Houston to Orlando flights', international: false, destinationAirport: 'Orlando International Airport (MCO)' },
} as const

type RouteKey = keyof typeof routes

export function generateStaticParams() {
  return Object.keys(routes).map((route) => ({ route }))
}

export function generateMetadata({ params }: { params: { route: string } }): Metadata {
  const route = routes[params.route as RouteKey]
  if (!route) return {}
  return {
    title: route.title.replace(/^./, (m) => m.toUpperCase()),
    description: `Plan ${route.title} with airport notes, booking tips, and links for flights, transfers${route.international ? ', eSIM' : ''}, and trip planning.`,
    alternates: { canonical: `https://tourwiseai.com/cheap-flights-from-houston/${params.route}` },
  }
}

export default function HoustonRoutePage({ params }: { params: { route: string } }) {
  const route = routes[params.route as RouteKey]
  if (!route) return null

  const faqs = [
    { question: `When should I start searching ${route.title}?`, answer: 'Start early enough to compare several date windows and nearby airport options. Flexible travel windows can reveal better value.' },
    { question: `Does TourWiseAI book ${route.title} directly?`, answer: 'No. TourWiseAI helps with planning and links to partner booking sites.' },
    { question: 'Does TourWiseAI use affiliate links?', answer: 'Yes. Some links are affiliate links, which may generate a commission at no extra cost to you.' },
  ]

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">{route.title.replace(/^./, (m) => m.toUpperCase())}</span></h1>
          <p className="text-white/75">Use this route overview to plan before booking: compare dates, check airport logistics, and connect your trip tools.</p>

          <section className="glass-strong rounded-xl border border-white/10 p-6 space-y-2">
            <h2 className="text-xl font-semibold text-white heading-robotic">Route overview</h2>
            <p className="text-white/75">Most Houston routes use George Bush Intercontinental Airport (IAH). For this route, compare travel day flexibility, layover quality, and arrival timing.</p>
          </section>

          <section className="glass-strong rounded-xl border border-white/10 p-6 space-y-2">
            <h2 className="text-xl font-semibold text-white heading-robotic">Airport notes</h2>
            <p className="text-white/75">Houston departure: IAH is the primary long-haul hub. Destination arrival: {route.destinationAirport}.</p>
          </section>

          <section className="glass-strong rounded-xl border border-white/10 p-6 space-y-2">
            <h2 className="text-xl font-semibold text-white heading-robotic">Best planning tips</h2>
            <ul className="list-disc list-inside text-white/75 space-y-1">
              <li>Compare nearby dates and departure times, not only one exact day.</li>
              <li>Review total travel time and overnight layovers, not only base fare.</li>
              <li>Keep transfer and arrival connectivity plans ready before checkout.</li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.flights.aviasales.url} trackingLabel={`${params.route}-flights`} className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Search Flights</ExternalAffiliateLink>
            <ExternalAffiliateLink href={AFFILIATE_LINKS.transfers.kiwitaxi.url} trackingLabel={`${params.route}-transfers`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Book Airport Transfer</ExternalAffiliateLink>
            {route.international ? (
              <ExternalAffiliateLink href={AFFILIATE_LINKS.esim.airalo.url} trackingLabel={`${params.route}-esim`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get Travel eSIM</ExternalAffiliateLink>
            ) : null}
          </div>
          <AffiliateDisclosure />
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/cheap-flights" className="text-neon-cyan underline underline-offset-2">Cheap Flights Hub</Link>
            <Link href="/ai-travel-planner" className="text-neon-cyan underline underline-offset-2">AI Travel Planner</Link>
            <Link href="/travel-insurance" className="text-neon-cyan underline underline-offset-2">Travel Insurance</Link>
            <Link href="/things-to-do" className="text-neon-cyan underline underline-offset-2">Things to Do</Link>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <FAQAccordion title="Route FAQ" items={faqs} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
