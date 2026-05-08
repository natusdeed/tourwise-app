import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import AviasalesWidgetContainer from '@/components/AviasalesWidgetContainer'
import FAQAccordion from '@/components/FAQAccordion'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { breadcrumbListSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cheap Flights & Travel Deals | TourWiseAI',
  description: 'Find cheap flights, compare route ideas, and plan smarter trips with TourWiseAI.',
  alternates: { canonical: 'https://tourwiseai.com/cheap-flights' },
}

const houstonRoutes = [
  {
    route: 'Houston to Lagos',
    href: '/houston-to-lagos-flights',
    useCase: 'Popular for family visits, long-stay trips, and holiday travel planning.',
  },
  {
    route: 'Houston to London',
    href: '/houston-to-london-flights',
    useCase: 'Strong option for culture trips, business travel, and quick Europe connections.',
  },
  {
    route: 'Houston to Cancun',
    href: '/houston-to-cancun-flights',
    useCase: 'Great for short beach escapes and last-minute weekend sun breaks.',
  },
  {
    route: 'Houston to Orlando',
    href: '/houston-to-orlando-flights',
    useCase: 'Ideal for family vacations, theme park plans, and school holiday travel.',
  },
  {
    route: 'Houston to Paris',
    href: '/houston-to-paris-flights',
    useCase: 'Best for international bucket-list trips with flexible date shopping.',
  },
  {
    route: 'Houston to Rome',
    href: '/houston-to-rome-flights',
    useCase: 'Useful for Italy trips, faith travel planning, and multi-city Europe routes.',
  },
]

export default function CheapFlightsPage() {
  const faqItems = [
    { question: 'Can TourWiseAI find cheap flights?', answer: 'TourWiseAI helps you compare options and route ideas, then connects you to partner tools for current flight offers.' },
    { question: 'Does TourWiseAI book flights directly?', answer: 'No. TourWiseAI is a planning platform and sends you to partner booking pages.' },
    { question: 'Are prices guaranteed?', answer: 'No. Flight prices can change quickly based on dates, demand, and inventory.' },
    { question: 'How can I use TourWiseAI before booking?', answer: 'Use the AI planner to map your trip structure, then compare flights and essentials before checkout.' },
    { question: 'Does TourWiseAI earn affiliate commissions?', answer: 'Yes, some links are affiliate links and may earn a commission at no extra cost to you.' },
  ]

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script
        id="cheap-flights-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbListSchema([
              { name: 'Home', path: '/' },
              { name: 'Cheap Flights', path: '/cheap-flights' },
            ])
          ),
        }}
      />
      <Script
        id="cheap-flights-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Find Cheap Flights for Your Next Trip',
            url: 'https://tourwiseai.com/cheap-flights',
            description: metadata.description,
          }),
        }}
      />
      <Script
        id="cheap-flights-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Popular routes from Houston',
            itemListElement: houstonRoutes.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.route,
              url: `https://tourwiseai.com${item.href}`,
            })),
          }),
        }}
      />
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Find Cheap Flights for Your Next Trip</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-5 max-w-3xl mx-auto">
            Compare flight options, plan smarter routes, and use TourWiseAI to organize the rest of your trip around better travel choices.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#search-cheap-flights"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-5 py-3 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
            >
              Search Flight Deals
            </a>
            <Link
              href="/ai-travel-planner"
              className="inline-flex rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              Build Itinerary with AI
            </Link>
          </div>
          <AffiliateDisclosure className="mt-6" />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white mb-6">
            Popular routes from Houston
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
                  Check Flight Options
                </ExternalAffiliateLink>
                <Link
                  href={item.href}
                  className="mt-2 text-xs text-neon-cyan underline underline-offset-2"
                >
                  Route planning guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/travel-deals" className="glass-strong rounded-xl border border-white/10 p-4 text-white/90 hover:border-neon-cyan/40">Travel Deals</Link>
          <Link href="/airport-transfers" className="glass-strong rounded-xl border border-white/10 p-4 text-white/90 hover:border-neon-cyan/40">Airport Transfers</Link>
          <Link href="/travel-esim" className="glass-strong rounded-xl border border-white/10 p-4 text-white/90 hover:border-neon-cyan/40">Travel eSIM</Link>
          <Link href="/travel-insurance" className="glass-strong rounded-xl border border-white/10 p-4 text-white/90 hover:border-neon-cyan/40">Travel Insurance</Link>
        </div>
      </section>

      <section id="search-cheap-flights" className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white mb-3">
            Search Flight Deals
          </h2>
          <p className="text-white/70 text-sm md:text-base mb-6 max-w-3xl">
            Use TourWiseAI to plan the trip, then compare current flight options through our travel partners.
          </p>
          <ExternalAffiliateLink
            href={AFFILIATE_LINKS.flights.aviasales.url}
            trackingLabel="cheap_flights_compare_flights"
            className="mb-5 inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
          >
            Compare Flights
          </ExternalAffiliateLink>
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
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <FAQAccordion title="Cheap Flights FAQ" items={faqItems} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
