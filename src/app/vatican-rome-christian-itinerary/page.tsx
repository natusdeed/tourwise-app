import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import AffiliateLink from '../../components/AffiliateLink'
import FAQAccordion from '../../components/FAQAccordion'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'
import { faqPageSchema, touristTripSchema } from '../../lib/schema'

export const metadata: Metadata = {
  title: 'Christian Rome & Vatican Itinerary — 5-Day Guide for Pilgrims 2026',
  description:
    "A 5-day Christian itinerary for Rome and the Vatican. Skip-the-line tickets, hotel picks near St. Peter's, and a free PDF guide.",
  alternates: { canonical: 'https://tourwiseai.com/vatican-rome-christian-itinerary' },
}

const faqs = [
  {
    question: 'What is the Vatican dress code?',
    answer:
      'Visitors should cover shoulders and knees when entering churches and Vatican sites. Lightweight layers are usually the easiest way to stay comfortable while meeting the dress code.',
  },
  {
    question: 'How early should I arrive at the Vatican?',
    answer:
      'Arrive at least 30 to 45 minutes before your timed entry, especially in high season. Early slots are typically calmer and help you avoid the longest queues.',
  },
  {
    question: 'Are papal audience tickets free?',
    answer:
      'Yes, standard papal audience tickets are free, but reservations are still required. You may pay service fees only if you book through third-party organizers.',
  },
  {
    question: 'What are the best catacombs to visit in Rome?',
    answer:
      'The Catacombs of San Callisto and San Sebastiano are popular starting points for Christian pilgrims. Guided visits are recommended to understand the historical and spiritual context.',
  },
  {
    question: 'Can I do Assisi as a day trip from Rome?',
    answer:
      'Yes, many travelers visit Assisi in one day by train or guided tour. It is a long day, so leave early and keep your Rome schedule lighter the day before or after.',
  },
  {
    question: 'Do I need travel insurance for Italy?',
    answer:
      'Travel insurance is strongly recommended for medical support, delays, and cancellation protection. It can be especially useful when your plan includes timed tickets and day trips.',
  },
  {
    question: 'Is Rome safe for solo Christian pilgrims?',
    answer:
      'Rome is generally safe for solo travelers when you use normal city precautions. Stay alert in crowded transit zones and keep valuables secure near major landmarks.',
  },
  {
    question: 'What is the best time to visit Rome?',
    answer:
      'Spring and fall are usually the best seasons for weather and manageable crowds. Summer is hotter and busier, while winter can be quieter with shorter daylight hours.',
  },
]

export default function VaticanRomePage() {
  const tripSchema = touristTripSchema({
    name: 'Christian Rome & Vatican Itinerary — 5-Day Guide for Pilgrims 2026',
    description:
      'A five-day Christian itinerary for Rome and Vatican City with practical route planning, sacred sites, catacombs, and optional day trips.',
    url: 'https://tourwiseai.com/vatican-rome-christian-itinerary',
    itinerary: [
      {
        name: "Day 1: Vatican Museums, Sistine Chapel, and St. Peter's Basilica",
        description: 'Start with core Vatican landmarks and timed-entry planning.',
      },
      {
        name: 'Day 2: Christian Rome sites',
        description: 'Pantheon, San Clemente, and Santa Maria Maggiore.',
      },
      {
        name: 'Day 3: Catacombs and Appian Way',
        description: 'Historical Christian underground sites and an evening in Trastevere.',
      },
    ],
  })

  const faqJson = faqPageSchema(faqs)

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <Script
        id="rome-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <Script
        id="rome-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
              Christian pilgrimage planning
            </p>
            <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
              <span className="text-gradient">
                Christian Rome & Vatican Itinerary — 5-Day Guide for Pilgrims 2026
              </span>
            </h1>
            <p className="text-lg text-white/75">
              This page helps Christian travelers plan Rome, the Vatican, catacombs, Assisi, and
              meaningful day trips with a realistic day-by-day structure.
            </p>
            <Link
              href="/?destination=Rome+Vatican"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
            >
              Build My Custom Rome Vatican Itinerary
            </Link>
            <AffiliateDisclosure />
          </div>

          <div className="glass-strong border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white heading-robotic">Quick summary</h2>
            <ul className="list-disc list-inside space-y-2 text-white/75">
              <li>Start with Vatican Museums, Sistine Chapel, and St. Peter&apos;s Basilica.</li>
              <li>Reserve skip-the-line tickets before arrival.</li>
              <li>Add Assisi, Pompeii, or Florence if you have extra time.</li>
            </ul>
          </div>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white heading-robotic">
              5-Day Christian Rome & Vatican Itinerary
            </h2>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white heading-robotic">
                Day 1: Vatican Museums + Sistine Chapel + St. Peter&apos;s Basilica
              </h3>
              <p className="text-white/75">
                Begin with timed entry for the Vatican Museums, then flow into the Sistine Chapel and end
                at St. Peter&apos;s Basilica. Keep this day focused to avoid museum fatigue.
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/75">
                <li>
                  <AffiliateLink
                    program="tiqets"
                    path="/en/rome-vatican-museums-tickets/"
                    subid="faith-vatican-tiqets-museums"
                  >
                    Vatican Museums tickets
                  </AffiliateLink>
                </li>
                <li>
                  <AffiliateLink
                    program="tiqets"
                    path="/en/rome-sistine-chapel-tickets/"
                    subid="faith-vatican-tiqets-sistine"
                  >
                    Sistine Chapel tickets
                  </AffiliateLink>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white heading-robotic">
                Day 2: Christian Rome (Pantheon, San Clemente, Santa Maria Maggiore)
              </h3>
              <p className="text-white/75">
                Group central and basilica stops to reduce long transfers and preserve energy for prayer,
                reflection, and unhurried site visits.
              </p>
              <p className="text-white/75">
                <AffiliateLink
                  program="getYourGuide"
                  path="/rome-l33/christian-rome-tour/"
                  subid="faith-vatican-gyg-christianrome"
                >
                  Christian Rome guided tour
                </AffiliateLink>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white heading-robotic">
                Day 3: Catacombs + Appian Way + Trastevere
              </h3>
              <p className="text-white/75">
                Keep this day balanced: historical catacombs in the morning, Appian Way context in the
                afternoon, and a slower evening in Trastevere.
              </p>
              <p className="text-white/75">
                <AffiliateLink
                  program="getYourGuide"
                  path="/rome-l33/catacombs-tour/"
                  subid="faith-vatican-gyg-catacombs"
                >
                  Rome catacombs tour
                </AffiliateLink>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white heading-robotic">Day 4: Day trip to Assisi</h3>
              <p className="text-white/75">
                Assisi is often the most meaningful Christian day trip from Rome. Start early, keep your
                plan realistic, and prioritize key Franciscan sites.
              </p>
              <p className="text-white/75">
                <AffiliateLink
                  program="getYourGuide"
                  path="/assisi-l4461/"
                  subid="faith-vatican-gyg-assisi"
                >
                  Assisi day trip options
                </AffiliateLink>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white heading-robotic">
                Day 5: Day trip to Pompeii or Florence
              </h3>
              <p className="text-white/75">
                Choose Pompeii if you want early Christian and biblical-era historical context, or Florence
                if art and church architecture are your priority. Keep travel time and return logistics in
                mind before committing to either option.
              </p>
            </div>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">How to Plan Your Vatican Day</h2>
            <p className="text-white/75">
              Book timed tickets in advance and arrive early to reduce queue stress at security. Modest
              clothing is required, and entry checks can slow down peak-hour arrivals.
            </p>
            <p className="text-white/75">
              Plan Vatican Museums, Sistine Chapel, and St. Peter&apos;s Basilica as one focused block
              instead of overloading extra stops into the same day.
            </p>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">
              Christian Rome Sites Worth Prioritizing
            </h2>
            <p className="text-white/75">
              Prioritize the Pantheon, Basilica of San Clemente, Santa Maria Maggiore, St. John Lateran,
              and Scala Sancta. These sites cover early church history, liturgical heritage, and major
              Christian art traditions.
            </p>
            <p className="text-white/75">
              Group visits by neighborhood to reduce transit fatigue and preserve time for slower
              exploration rather than rushing between distant locations.
            </p>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">
              Catacombs, Appian Way, and Trastevere
            </h2>
            <p className="text-white/75">
              Rome&apos;s catacombs are important for understanding the earliest Christian communities and
              burial practices. Guided context helps this day feel meaningful instead of purely logistical.
            </p>
            <p className="text-white/75">
              Avoid packing too many activities into this route. Trastevere works well as a calmer evening
              stop with churches, walkable streets, and flexible dining options.
            </p>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">
              Best Day Trips from Rome for Christian Travelers
            </h2>
            <p className="text-white/75">
              Assisi is the best first day trip for most Christian pilgrims because of its strong spiritual
              significance and manageable day-trip structure.
            </p>
            <p className="text-white/75">
              Pompeii and Florence are strong optional add-ons when you have extra time. Choose based on
              your interests: archaeology and biblical-era context for Pompeii, or sacred art and church
              architecture for Florence.
            </p>
          </section>

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white heading-robotic">Hotels Near Vatican</h2>
            <p className="text-white/75">
              Staying near St. Peter&apos;s can simplify early Vatican entry and reduce transfer time:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/75">
              <li>
                <AffiliateLink
                  program="booking"
                  path="/hotel/it/rome-cavalieri.html"
                  subid="faith-vatican-hotel-cavalieri"
                >
                  Rome Cavalieri
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="booking"
                  path="/hotel/it/residenza-paolo-vi.html"
                  subid="faith-vatican-hotel-paolov"
                >
                  Residenza Paolo VI
                </AffiliateLink>
              </li>
              <li>
                <AffiliateLink
                  program="booking"
                  path="/hotel/it/borgo-pio.html"
                  subid="faith-vatican-hotel-borgiopio"
                >
                  Borgo Pio hotel options
                </AffiliateLink>
              </li>
            </ul>
          </section>

          <div id="vatican-lead-magnet">
            <LeadMagnetForm
              magnetId="vatican-5-day"
              title="Free 5-Day Christian Rome Itinerary PDF"
              description="Get a simple day-by-day Rome and Vatican pilgrimage plan with ticket tips, hotel ideas, and optional day trips."
            />
          </div>

          <FAQAccordion items={faqs} withJsonLd={false} title="Christian Rome & Vatican FAQ" />

          <section className="glass-strong border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold heading-robotic text-white">
              Ready to Plan Your Rome Pilgrimage?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/?destination=Rome+Vatican"
                className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
              >
                Build My Custom Rome Vatican Itinerary
              </Link>
              <Link
                href="#vatican-lead-magnet"
                className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
              >
                Get the free 5-day PDF
              </Link>
            </div>
          </section>
        </div>
      </section>

      <StickyTripCTA destination="Rome Vatican" />
      <Footer />
    </main>
  )
}
