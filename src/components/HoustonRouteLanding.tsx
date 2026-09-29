import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import FAQAccordion from '@/components/FAQAccordion'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { breadcrumbListSchema } from '@/lib/schema'
import { generateFAQSchema } from '@/lib/seo'
import type { HoustonRouteDetails } from '@/lib/houston-routes'

type Props = {
  route: HoustonRouteDetails
}

/**
 * Full editorial guide for a Houston route. Rendered by the static route
 * pages (/houston-to-lagos-flights etc.). Content comes from lib/houston-routes.ts.
 */
export default function HoustonRouteLanding({ route }: Props) {
  const sectionClass = 'glass-strong rounded-xl border border-white/10 p-5 md:p-6 space-y-3'
  const h2Class = 'text-xl md:text-2xl font-semibold text-white heading-robotic'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script id={`${route.routePath}-breadcrumb`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema([{ name: 'Home', path: '/' }, { name: 'Cheap Flights', path: '/cheap-flights' }, { name: 'Cheap Flights from Houston', path: '/cheap-flights-from-houston' }, { name: route.title, path: route.routePath }])) }} />
      <Script id={`${route.routePath}-webpage`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: route.title, url: `https://tourwiseai.com${route.routePath}` }) }} />
      <Script id={`${route.routePath}-faq`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(route.faqs)) }} />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">{route.title}</span></h1>
          <p className="text-white/75 text-lg">
            {route.destinationName} via {route.destinationAirport} &mdash; {route.flightTime}.
            A practical planning guide for Houston travelers: who flies the route, when to book,
            how to pay less, and what to sort before you go.
          </p>

          <div className={sectionClass}>
            <h2 className={h2Class}>Route overview</h2>
            {route.overview.map((para, i) => (
              <p key={i} className="text-white/70 leading-relaxed">{para}</p>
            ))}
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class}>Airlines and routing</h2>
            <p className="text-white/70 leading-relaxed">{route.airlines}</p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class}>Best time to book</h2>
            <p className="text-white/70 leading-relaxed">{route.bestTimeToBook}</p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class}>How to pay less on this route</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              {route.moneyTips.map((tip, i) => (
                <li key={i} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.flights.aviasales.url} trackingLabel={`${route.routePath}-flights`} className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Compare flight options</ExternalAffiliateLink>
            <ExternalAffiliateLink href={AFFILIATE_LINKS.transfers.kiwitaxi.url} trackingLabel={`${route.routePath}-transfer`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Book airport transfer</ExternalAffiliateLink>
            {route.international ? <ExternalAffiliateLink href={AFFILIATE_LINKS.esim.airalo.url} trackingLabel={`${route.routePath}-esim`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get travel eSIM</ExternalAffiliateLink> : null}
            {route.international ? <ExternalAffiliateLink href={AFFILIATE_LINKS.insurance.ekta.url} trackingLabel={`${route.routePath}-insurance`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get travel insurance</ExternalAffiliateLink> : null}
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class}>Arrival guide: {route.destinationName}</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              {route.arrivalTips.map((tip, i) => (
                <li key={i} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          <AffiliateDisclosure />
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/cheap-flights" className="text-neon-cyan underline underline-offset-2">Cheap Flights</Link>
            <Link href="/cheap-flights-from-houston" className="text-neon-cyan underline underline-offset-2">All Houston Routes</Link>
            <Link href="/ai-travel-planner" className="text-neon-cyan underline underline-offset-2">AI Travel Planner</Link>
            <Link href="/travel-deals" className="text-neon-cyan underline underline-offset-2">Travel Deals</Link>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-12"><div className="max-w-5xl mx-auto"><FAQAccordion title="Route FAQ" items={route.faqs} /></div></section>
      <Footer />
    </main>
  )
}
