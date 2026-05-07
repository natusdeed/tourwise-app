import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import AffiliateLink from '../../components/AffiliateLink'
import ComparisonTable from '../../components/ComparisonTable'
import FAQAccordion from '../../components/FAQAccordion'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { faqPageSchema, touristTripSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Camino de Santiago Planner — Free Route Guide & Itinerary 2026',
  description:
    'Plan your Camino de Santiago with our free AI planner. Compare routes, find albergues, and get a free 7-day itinerary PDF.',
  alternates: { canonical: 'https://tourwiseai.com/camino-de-santiago-planner' },
}

const faqs = [
  {
    question: 'How much does the Camino cost?',
    answer:
      'Most pilgrims spend about 35 to 75 euros per day depending on accommodation style, season, and gear choices. A full French Way budget often lands between 1,300 and 2,800 euros including food and beds.',
  },
  {
    question: 'How fit do I need to be?',
    answer:
      'You do not need elite fitness, but you should be able to walk several hours daily with a light backpack. A 6 to 8 week training plan with regular walking makes the route much safer and more enjoyable.',
  },
  {
    question: 'Should I walk solo or with a group?',
    answer:
      'Both are common. Solo walkers find community quickly on the trail, while groups offer structure and shared logistics. Choose the style that matches your confidence and travel experience.',
  },
  {
    question: 'What is the best time to walk the Camino?',
    answer:
      'Spring (April to June) and fall (September to October) are best for mild weather and manageable crowds. Summer is hot and busy, while winter has fewer services on many stages.',
  },
  {
    question: 'Do I need to book accommodation ahead?',
    answer:
      'In peak months and major towns, booking ahead can prevent long stressful evenings looking for a bed. Many pilgrims keep flexibility but reserve key stops such as Sarria and Santiago.',
  },
  {
    question: 'How do I prevent blisters?',
    answer:
      'Break in footwear before your trip, keep feet dry, and treat hot spots early with tape or blister plasters. Socks, fit, and pace matter more than expensive gear.',
  },
  {
    question: 'What should I bring?',
    answer:
      'Pack light and focus on essentials: supportive footwear, weather layer, compact backpack, hydration, and foot-care basics. Most first-timers are more comfortable when total pack weight stays low.',
  },
  {
    question: 'Do I need a pilgrim passport or credential?',
    answer:
      'Yes, if you want the Compostela certificate in Santiago. You collect stamps along the route in your credential and show it at the Pilgrim Office at the end.',
  },
]

export default function CaminoPlannerPage() {
  const tripSchema = touristTripSchema({
    name: 'Camino de Santiago Planner — Free Route Guide & Itinerary 2026',
    description:
      'A beginner-friendly Camino planner comparing routes, accommodation options, packing strategy, and realistic walking pace to Santiago de Compostela.',
    url: 'https://tourwiseai.com/camino-de-santiago-planner',
    itinerary: [
      { name: 'Choose your route', description: 'Compare French, Portuguese, Northern, and Primitive routes.' },
      { name: 'Plan accommodation', description: 'Mix albergues, guesthouses, and hotels based on your comfort and budget.' },
      { name: 'Set realistic pace', description: 'Build daily mileage with rest days and recovery buffers.' },
    ],
  })

  const faqJson = faqPageSchema(faqs)

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <Script
        id="camino-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <Script
        id="camino-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
              Camino planning guide
            </p>
            <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
              <span className="text-gradient">
                Camino de Santiago Planner — Free Route Guide & Itinerary 2026
              </span>
            </h1>
            <p className="text-lg text-white/75">
              This guide helps first-time pilgrims compare Camino routes, sleep options, gear, daily
              pace, and practical planning steps so you can build a safer and more realistic walk to
              Santiago.
            </p>
            <Link
              href="/?destination=Camino+de+Santiago"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
            >
              Build My Custom Camino Itinerary
            </Link>
            <AffiliateDisclosure />
          </div>

          <div className="glass-strong border border-white/10 rounded-xl p-6 space-y-2">
            <h2 className="text-lg font-semibold text-white heading-robotic">Quick summary</h2>
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li>The French Way is the best first Camino for most beginners.</li>
              <li>The Portuguese Way is shorter and better for limited time.</li>
              <li>Spring and fall are the best walking seasons.</li>
            </ul>
          </div>

          <ComparisonTable
            title="Camino route comparison"
            columns={[
              { key: 'route', label: 'Route' },
              { key: 'distance', label: 'Distance' },
              { key: 'duration', label: 'Typical duration' },
              { key: 'startEnd', label: 'Start → Finish' },
              { key: 'highlights', label: 'Highlights' },
              { key: 'bestFor', label: 'Best for' },
            ]}
            rows={[
              {
                route: 'French Way (Camino Frances)',
                distance: '500 miles',
                duration: '30 days',
                startEnd: 'St. Jean → Santiago',
                highlights: 'Most popular, full infrastructure',
                bestFor: '#1 for first-timers',
              },
              {
                route: 'Portuguese Way',
                distance: '160 miles',
                duration: '14 days',
                startEnd: 'Porto → Santiago',
                highlights: 'Coastal option, growing fast',
                bestFor: 'Best for limited time',
              },
              {
                route: 'Northern Way (Camino del Norte)',
                distance: '510 miles',
                duration: '35 days',
                startEnd: 'Irun → Santiago',
                highlights: 'Scenic coast, fewer pilgrims',
                bestFor: 'For experienced walkers',
              },
              {
                route: 'Primitive Way (Camino Primitivo)',
                distance: '200 miles',
                duration: '14 days',
                startEnd: 'Oviedo → Santiago',
                highlights: 'Original route, mountain terrain',
                bestFor: 'Most challenging',
              },
            ]}
            caption="Comparison of the most popular Camino de Santiago routes."
          />

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Choosing Your Camino Route</h2>
            <p className="text-white/75">
              The French Way remains the easiest recommendation for first-time pilgrims because it has
              frequent towns, clear waymarking, and many bed options. If you want a shorter plan with
              less total mileage, the Portuguese Way from Porto offers a practical two-week option.
            </p>
            <p className="text-white/75">
              The Northern Way is beautiful and quieter, but weather and stage logistics can feel harder
              for beginners. The Primitive Way is rewarding but includes steep mountain sections, so it is
              better for walkers with stronger conditioning and trail experience.
            </p>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Where to Sleep on the Camino</h2>
            <p className="text-white/75">
              Most pilgrims combine albergues, guesthouses, and occasional hotels depending on budget,
              comfort, and recovery needs. Albergues are social and affordable, while private rooms are
              helpful before long stages or when you need better rest.
            </p>
            <p className="text-white/75">
              Booking ahead matters most in popular towns and weekend arrival windows. You can keep some
              flexibility, but reserve strategic nights in high-demand stops:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li>
                <AffiliateLink
                  program="booking"
                  path="/searchresults.html?ss=Pamplona%2C%20Spain"
                  subid="faith-camino-hotel-pamplona"
                >
                  Find stays in Pamplona
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="booking"
                  path="/searchresults.html?ss=Burgos%2C%20Spain"
                  subid="faith-camino-hotel-burgos"
                >
                  Find stays in Burgos
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="booking"
                  path="/searchresults.html?ss=Sarria%2C%20Spain"
                  subid="faith-camino-hotel-sarria"
                >
                  Find stays in Sarria
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="booking"
                  path="/searchresults.html?ss=Santiago%20de%20Compostela%2C%20Spain"
                  subid="faith-camino-hotel-santiago"
                >
                  Find stays in Santiago de Compostela
                </AffiliateLink>
              </li>
            </ul>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Driving Sections of the Camino</h2>
            <p className="text-white/75">
              Some travelers rent a car before starting the walk or after finishing in Santiago, especially
              for airport transfers and extra regional sightseeing. During the main walking route, most
              pilgrims avoid driving so they can keep the traditional stage flow.
            </p>
            <p className="text-white/75">
              <AffiliateLink
                program="discoverCars"
                path="/es/search/"
                subid="faith-camino-cars-spain"
              >
                Compare car rentals in Spain
              </AffiliateLink>
            </p>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Camino Gear List</h2>
            <p className="text-white/75">
              Lightweight packing protects your knees, feet, and daily energy. Prioritize fit, weather
              protection, and essentials you will use every day rather than packing for every possible
              scenario.
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li>
                <AffiliateLink
                  program="amazon"
                  path="/dp/B07DXJSN6R"
                  subid="faith-camino-gear-boots"
                >
                  Hiking boots
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="amazon"
                  path="/dp/B000EBT6EI"
                  subid="faith-camino-gear-poncho"
                >
                  Rain poncho
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="amazon"
                  path="/dp/B07FVHVBKR"
                  subid="faith-camino-gear-backpack"
                >
                  Lightweight backpack
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="amazon"
                  path="/dp/B01N5G7HBK"
                  subid="faith-camino-gear-headlamp"
                >
                  Headlamp
                </AffiliateLink>
              </li>
            </ul>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Planning Your Camino Pace</h2>
            <p className="text-white/75">
              A realistic pace is usually better than an ambitious pace, especially in your first week.
              Many walkers do well at moderate daily mileage with one recovery day every few stages.
            </p>
            <p className="text-white/75">
              Older walkers can complete the Camino comfortably by increasing buffer time, choosing shorter
              distances, and staying consistent with hydration and recovery. Avoid injury by breaking in
              gear early and avoiding overloaded schedules.
            </p>
            <p className="text-white/75">
              Keep your itinerary flexible enough to adjust for weather, fatigue, or foot issues. A strong
              Camino plan should guide your walk, not force you into avoidable strain.
            </p>
          </section>

          <div id="camino-lead-magnet">
            <LeadMagnetForm
              magnetId="camino-7-day"
              title="Free 7-Day Camino Frances Itinerary PDF"
              description="Perfect for first-timers and older walkers — a realistic paced route with albergue stops and daily mileage."
            />
          </div>

          <FAQAccordion items={faqs} withJsonLd={false} title="Camino de Santiago FAQ" />

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold heading-robotic text-white">Ready to Plan Your Camino?</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/?destination=Camino+de+Santiago"
                className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
              >
                Build My Custom Camino Itinerary
              </Link>
              <Link
                href="#camino-lead-magnet"
                className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
              >
                Get the free 7-day PDF
              </Link>
            </div>
          </section>
        </div>
      </section>

      <StickyTripCTA destination="Camino de Santiago" />
      <Footer />
    </main>
  )
}
