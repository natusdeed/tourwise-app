import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import FAQAccordion from '@/components/FAQAccordion'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { breadcrumbListSchema } from '@/lib/schema'

type Props = {
  routeTitle: string
  routePath: string
  destinationAirport: string
  international: boolean
}

export default function HoustonRouteLanding({ routeTitle, routePath, destinationAirport, international }: Props) {
  const faqs = [
    { question: `Can TourWiseAI book ${routeTitle} directly?`, answer: 'No. TourWiseAI helps plan the route and links to partner booking tools.' },
    { question: 'Are fares guaranteed?', answer: 'No. Prices and inventory can change at any time.' },
    { question: 'How should I compare options?', answer: 'Compare date flexibility, total duration, layovers, and arrival timing before booking.' },
  ]

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script id={`${routePath}-breadcrumb`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema([{ name: 'Home', path: '/' }, { name: 'Cheap Flights', path: '/cheap-flights' }, { name: routeTitle, path: routePath }])) }} />
      <Script id={`${routePath}-webpage`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: routeTitle, url: `https://tourwiseai.com${routePath}` }) }} />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">{routeTitle}</span></h1>
          <p className="text-white/75">Use this planning guide to compare flight options and organize your essentials before booking.</p>
          <div className="glass-strong rounded-xl border border-white/10 p-5">
            <h2 className="text-xl font-semibold text-white heading-robotic">Route overview</h2>
            <p className="mt-2 text-white/70">Travelers usually depart via IAH for this route, while HOU can be useful for some domestic or connecting legs. Arrival airport: {destinationAirport}.</p>
          </div>
          <div className="glass-strong rounded-xl border border-white/10 p-5">
            <h2 className="text-xl font-semibold text-white heading-robotic">Planning tips</h2>
            <ul className="mt-2 list-disc list-inside space-y-1 text-white/70">
              <li>Compare nearby dates and check total travel time, not only headline fare.</li>
              <li>Review baggage policies and connection times before checkout.</li>
              <li>Plan arrival logistics early for smoother airport transfers.</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.flights.aviasales.url} trackingLabel={`${routePath}-flights`} className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Compare flight options</ExternalAffiliateLink>
            <ExternalAffiliateLink href={AFFILIATE_LINKS.transfers.kiwitaxi.url} trackingLabel={`${routePath}-transfer`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Book airport transfer</ExternalAffiliateLink>
            {international ? <ExternalAffiliateLink href={AFFILIATE_LINKS.esim.airalo.url} trackingLabel={`${routePath}-esim`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get travel eSIM</ExternalAffiliateLink> : null}
            {international ? <ExternalAffiliateLink href={AFFILIATE_LINKS.insurance.ekta.url} trackingLabel={`${routePath}-insurance`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get travel insurance</ExternalAffiliateLink> : null}
          </div>
          <AffiliateDisclosure />
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/cheap-flights" className="text-neon-cyan underline underline-offset-2">Cheap Flights</Link>
            <Link href="/ai-travel-planner" className="text-neon-cyan underline underline-offset-2">AI Travel Planner</Link>
            <Link href="/travel-deals" className="text-neon-cyan underline underline-offset-2">Travel Deals</Link>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-12"><div className="max-w-5xl mx-auto"><FAQAccordion title="Route FAQ" items={faqs} /></div></section>
      <Footer />
    </main>
  )
}
