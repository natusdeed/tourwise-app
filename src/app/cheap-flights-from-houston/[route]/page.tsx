import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import FAQAccordion from '@/components/FAQAccordion'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'
import { generateFAQSchema } from '@/lib/seo'

export function generateStaticParams() {
  return Object.keys(HOUSTON_ROUTES).map((route) => ({ route }))
}

export function generateMetadata({ params }: { params: { route: string } }): Metadata {
  const route = HOUSTON_ROUTES[params.route]
  if (!route) return {}
  return {
    title: `${route.title}: Booking Checklist & Fare Tips | TourWiseAI`,
    description: `Plan and book ${route.title.toLowerCase()} with a step-by-step checklist, fare tips, and links for flights, transfers${route.international ? ', eSIM' : ''}, and trip essentials.`,
    alternates: { canonical: `https://tourwiseai.com/cheap-flights-from-houston/${params.route}` },
  }
}

/**
 * Booking-focused companion to the full route guide at /houston-to-X-flights.
 * Same data source, different job: a condensed checklist for travelers ready to book.
 */
export default function HoustonRoutePage({ params }: { params: { route: string } }) {
  const route = HOUSTON_ROUTES[params.route]
  if (!route) return null

  const sectionClass = 'glass-strong rounded-xl border border-white/10 p-6 space-y-3'
  const h2Class = 'text-xl font-semibold text-white heading-robotic'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script id={`${params.route}-faq`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(route.faqs.slice(0, 4))) }} />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">{route.title}: Booking Guide</span></h1>
          <p className="text-white/75 text-lg">
            Ready to book {route.title.toLowerCase()}? Work through this checklist before you pay:
            {` ${route.flightTime.toLowerCase()}`}, departing Houston Intercontinental (IAH).
            Want the full deep-dive instead? Read the{' '}
            <Link href={route.routePath} className="text-neon-cyan underline underline-offset-2">complete {route.destinationName} route guide</Link>.
          </p>

          <section className={sectionClass}>
            <h2 className={h2Class}>Booking checklist</h2>
            <ol className="list-decimal list-inside space-y-2 text-white/75">
              {route.bookingChecklist.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ol>
          </section>

          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.flights.aviasales.url} trackingLabel={`${params.route}-flights`} className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Search Flights</ExternalAffiliateLink>
            <ExternalAffiliateLink href={AFFILIATE_LINKS.transfers.kiwitaxi.url} trackingLabel={`${params.route}-transfers`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Book Airport Transfer</ExternalAffiliateLink>
            {route.international ? (
              <ExternalAffiliateLink href={AFFILIATE_LINKS.esim.airalo.url} trackingLabel={`${params.route}-esim`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get Travel eSIM</ExternalAffiliateLink>
            ) : null}
            {route.international ? (
              <ExternalAffiliateLink href={AFFILIATE_LINKS.insurance.ekta.url} trackingLabel={`${params.route}-insurance`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get Travel Insurance</ExternalAffiliateLink>
            ) : null}
          </div>

          <section className={sectionClass}>
            <h2 className={h2Class}>Fare tips for this route</h2>
            <ul className="list-disc list-inside space-y-2 text-white/75">
              {route.moneyTips.slice(0, 4).map((tip, i) => (
                <li key={i} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
            <p className="text-white/75 leading-relaxed">{route.bestTimeToBook}</p>
          </section>

          <AffiliateDisclosure />
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href={route.routePath} className="text-neon-cyan underline underline-offset-2">Full {route.destinationName} Guide</Link>
            <Link href="/cheap-flights-from-houston" className="text-neon-cyan underline underline-offset-2">All Houston Routes</Link>
            <Link href="/cheap-flights" className="text-neon-cyan underline underline-offset-2">Cheap Flights Hub</Link>
            <Link href="/ai-travel-planner" className="text-neon-cyan underline underline-offset-2">AI Travel Planner</Link>
            <Link href="/travel-insurance" className="text-neon-cyan underline underline-offset-2">Travel Insurance</Link>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <FAQAccordion title="Route FAQ" items={route.faqs.slice(0, 4)} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
