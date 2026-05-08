import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import AviasalesWidgetContainer from '@/components/AviasalesWidgetContainer'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'

export const metadata: Metadata = {
  title: 'Cheap Flights & Travel Deals | TourWise AI',
  description: 'Find cheap flights, compare route ideas, and plan smarter trips with TourWise AI.',
  alternates: { canonical: 'https://tourwiseai.com/cheap-flights' },
}

const houstonRoutes = [
  {
    route: 'Houston to Lagos',
    useCase: 'Popular for family visits, long-stay trips, and holiday travel planning.',
  },
  {
    route: 'Houston to London',
    useCase: 'Strong option for culture trips, business travel, and quick Europe connections.',
  },
  {
    route: 'Houston to Cancun',
    useCase: 'Great for short beach escapes and last-minute weekend sun breaks.',
  },
  {
    route: 'Houston to New York',
    useCase: 'Useful for city breaks, work trips, and event-driven travel dates.',
  },
  {
    route: 'Houston to Orlando',
    useCase: 'Ideal for family vacations, theme park plans, and school holiday travel.',
  },
  {
    route: 'Houston to Paris',
    useCase: 'Best for international bucket-list trips with flexible date shopping.',
  },
]

export default function CheapFlightsPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Find Cheap Flights for Your Next Trip</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-5 max-w-3xl mx-auto">
            Compare flight options, discover route ideas, and plan smarter with TourwiseAI.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#search-cheap-flights"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-5 py-3 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
            >
              Search Flights
            </a>
            <Link
              href="/"
              className="inline-flex rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              Explore Trip Planner
            </Link>
          </div>
          <AffiliateDisclosure className="mt-6" />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white mb-6">
            Cheap Flights from Houston
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {houstonRoutes.map((item) => (
              <article
                key={item.route}
                className="glass-strong rounded-xl border border-white/10 p-5 flex flex-col h-full"
              >
                <h3 className="heading-robotic text-lg font-semibold text-white">{item.route}</h3>
                <p className="mt-3 text-sm text-white/70 flex-grow">{item.useCase}</p>
                <ExternalAffiliateLink
                  href={AFFILIATE_LINKS.flights.aviasales.url}
                  trackingLabel={`cheap_flights_${item.route.toLowerCase().replace(/\s+/g, '_')}`}
                  className="mt-4 inline-flex items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-2.5 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                  aria-label={`Check flight deals for ${item.route}, opens in a new tab`}
                >
                  Check Flight Deals
                </ExternalAffiliateLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="search-cheap-flights" className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white mb-3">
            Search Cheap Flights
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-6 max-w-3xl">
            Use this space to load the supported Aviasales widget and let users search flights directly from
            TourwiseAI.
          </p>
          <AviasalesWidgetContainer />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-xl border border-white/10 p-6 md:p-8">
            <p className="text-sm text-white/70">
              Disclosure: TourwiseAI may earn a commission when you book through some links, at no extra
              cost to you.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
