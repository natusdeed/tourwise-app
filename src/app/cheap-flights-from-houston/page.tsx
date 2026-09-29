import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import FAQAccordion from '@/components/FAQAccordion'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'
import { generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Cheap Flights from Houston (IAH & HOU): Route Guides & Booking Tips | TourWiseAI',
  description:
    'Houston flight guides for IAH and Hobby: which airport to use, route-by-route booking tips for Lagos, Cancun, London, Paris, Rome, and Orlando, and how Houston travelers pay less.',
  alternates: { canonical: 'https://tourwiseai.com/cheap-flights-from-houston' },
}

const hubFaqs = [
  {
    question: 'Which Houston airport should I fly from: IAH or Hobby?',
    answer:
      'George Bush Intercontinental (IAH) is Houston\u2019s long-haul and legacy-carrier hub \u2014 every international route in these guides departs from IAH. Hobby (HOU) is Southwest\u2019s stronghold plus ultra-low-cost carriers, and it frequently wins on total domestic and short-haul price. Always compare both airports; they have different airlines and often different fares.',
  },
  {
    question: 'How far ahead should Houston travelers book international flights?',
    answer:
      'For peak periods (summer Europe, December Africa), 3\u20136 months ahead. For shoulder season, 6\u201312 weeks is the sweet spot. For domestic leisure like Orlando or Cancun off-peak, 3\u20138 weeks is usually plenty. The single biggest lever is date flexibility, not the booking site.',
  },
  {
    question: 'Do these guides book flights directly?',
    answer:
      'No. TourWiseAI is a planning guide \u2014 each route page explains who flies the route, when to book, and how to pay less, then links you to partner booking tools to compare live fares.',
  },
  {
    question: 'Why is Houston to Lagos so expensive in December?',
    answer:
      'Detty December: Houston has one of the largest Nigerian diaspora communities in the US, and demand for mid-December to early-January travel overwhelms the limited one-stop capacity to Lagos. Book by September or expect peak pricing.',
  },
]

export default function CheapFlightsFromHoustonPage() {
  const routes = Object.values(HOUSTON_ROUTES)
  const sectionClass = 'glass-strong rounded-xl border border-white/10 p-6 space-y-3'
  const h2Class = 'text-2xl font-semibold text-white heading-robotic'

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script id="houston-hub-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(hubFaqs)) }} />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">Cheap Flights from Houston</span></h1>
          <p className="text-white/75 text-lg max-w-3xl leading-relaxed">
            Route-by-route flight guides for Houston travelers \u2014 which airlines fly each route,
            when to book, how to pay less, and what to sort before you go. Built for the way
            Houstonians actually travel, from Detty December Lagos trips to shoulder-season Europe.
          </p>

          <section className={sectionClass}>
            <h2 className={h2Class}>IAH vs Hobby: which Houston airport?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/70">
              <div>
                <h3 className="font-semibold text-white mb-1">George Bush Intercontinental (IAH)</h3>
                <p className="leading-relaxed">Houston\u2019s long-haul gateway and United hub. Every international route in these guides \u2014 Lagos, Cancun, London, Paris, Rome \u2014 departs from IAH. More frequencies, more rebooking options when things go wrong, and the only choice for Africa and Europe.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">William P. Hobby (HOU)</h3>
                <p className="leading-relaxed">Southwest\u2019s Houston stronghold plus Spirit and Frontier. Frequently the cheapest all-in option for domestic and short-haul international (Cancun, Orlando) once Southwest\u2019s two free checked bags are factored in. Smaller, faster to navigate, easier parking.</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">Rule of thumb: compare both airports on every trip. They have different airlines, different fee structures, and often meaningfully different total prices.</p>
          </section>

          <section className="space-y-4">
            <h2 className={h2Class}>Route guides</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <Link key={route.slug} href={route.routePath} className="glass-strong rounded-xl border border-white/10 p-5 hover:border-neon-cyan/50 transition-colors group">
                  <h3 className="font-semibold text-white group-hover:text-neon-cyan transition-colors">{route.title}</h3>
                  <p className="text-sm text-white/60 mt-1">{route.flightTime}</p>
                  <p className="text-sm text-white/70 mt-2 leading-relaxed">{route.overview[0].split('. ')[0]}.</p>
                  <span className="text-sm text-neon-cyan mt-3 inline-block">Read the guide &rarr;</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>How Houston travelers pay less</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li className="leading-relaxed"><strong className="text-white">Compare connecting cities, not just dates.</strong> On long-haul routes like Houston\u2013Lagos, the connecting city (Istanbul vs London vs Doha) moves the fare more than shifting by a day.</li>
              <li className="leading-relaxed"><strong className="text-white">Tuesday/Wednesday departures price lower</strong> on average across nearly every route in these guides.</li>
              <li className="leading-relaxed"><strong className="text-white">Book peak travel absurdly early.</strong> Christmas, spring break, and Detty December reward 3\u20136 month advance booking; procrastination is the most expensive strategy.</li>
              <li className="leading-relaxed"><strong className="text-white">Do the baggage math.</strong> Southwest\u2019s two free bags and ULCC bag fees flip the \u201Ccheapest fare\u201D ranking constantly \u2014 compare totals, not headlines.</li>
              <li className="leading-relaxed"><strong className="text-white">Set fare alerts 3+ months out</strong> on the routes you actually fly, and pounce when the price dips rather than trying to time the absolute bottom.</li>
            </ul>
          </section>

          <AffiliateDisclosure />
          <div className="max-w-6xl"><FAQAccordion title="Houston Flights FAQ" items={hubFaqs} /></div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
