import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import FAQAccordion from '@/components/FAQAccordion'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import AviasalesSearchLink from '@/components/AviasalesSearchLink'
import CheapestDatesSection from '@/components/CheapestDatesSection'
import KiwiCompareLink from '@/components/KiwiCompareLink'
import AviasalesEmbedWidget from '@/components/AviasalesEmbedWidget'
import { HOUSTON_ROUTES, houstonChecklistMetadata, houstonRouteDestinationIata } from '@/lib/houston-routes'
import { HOUSTON_ORIGIN_IATA, aviasalesScheduleWidgetSrc } from '@/lib/aviasales'
import { generateFAQSchema } from '@/lib/seo'

export function generateStaticParams() {
  return Object.keys(HOUSTON_ROUTES).map((route) => ({ route }))
}

export async function generateMetadata(props: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const params = await props.params;
  const route = HOUSTON_ROUTES[params.route]
  if (!route) return { title: { absolute: 'Route Not Found | TourWiseAI' }, robots: { index: false, follow: false } }
  return houstonChecklistMetadata(route)
}

/**
 * Booking-focused companion to the full route guide at /houston-to-X-flights.
 * Same data source, different job: a condensed checklist for travelers ready to book.
 */
export default async function HoustonRoutePage(props: { params: Promise<{ route: string }> }) {
  const params = await props.params;
  const route = HOUSTON_ROUTES[params.route]
  if (!route) return null

  const destinationIata = houstonRouteDestinationIata(params.route)
  const sectionClass = 'glass-strong rounded-xl border border-white/10 p-6 space-y-3'
  const h2Class = 'text-xl font-semibold text-white heading-robotic'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 overflow-x-hidden">
      <Script id={`${params.route}-faq`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(route.faqs.slice(0, 4))) }} />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5 min-w-0">
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
            <AviasalesSearchLink origin="HOU" destination={destinationIata} trackingLabel={`${params.route}-flights`} className="inline-flex max-w-full rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Search Flights</AviasalesSearchLink>
            <KiwiCompareLink trackingLabel={`${params.route}-kiwi`} />
            <ExternalAffiliateLink href={AFFILIATE_LINKS.transfers.kiwitaxi.url} trackingLabel={`${params.route}-transfers`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Book Airport Transfer</ExternalAffiliateLink>
            {route.international ? (
              <ExternalAffiliateLink href={AFFILIATE_LINKS.esim.airalo.url} trackingLabel={`${params.route}-esim`} className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Get Travel eSIM</ExternalAffiliateLink>
            ) : null}
          </div>

          <CheapestDatesSection destination={destinationIata} />

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
      {destinationIata ? (
        <section className="px-4 sm:px-6 lg:px-8 pb-12 overflow-x-hidden">
          <div className="max-w-5xl mx-auto min-w-0">
            <h2 className="text-xl md:text-2xl font-semibold text-white heading-robotic mb-2">
              Flight times on this route
            </h2>
            <p className="text-white/60 text-sm mb-4 max-w-3xl">
              Timetable from Aviasales. Schedules change; confirm with the airline before you book.
            </p>
            <AviasalesEmbedWidget
              src={aviasalesScheduleWidgetSrc(HOUSTON_ORIGIN_IATA, destinationIata)}
              scriptId={`aviasales-schedule-${HOUSTON_ORIGIN_IATA}-${destinationIata}`}
            />
          </div>
        </section>
      ) : null}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <FAQAccordion title="Route FAQ" items={route.faqs.slice(0, 4)} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
