import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '../../components/AffiliateDisclosure'
import LeadMagnetForm from '../../components/LeadMagnetForm'
import StickyTripCTA from '../../components/StickyTripCTA'

export const metadata: Metadata = {
  title: 'Faith-Based Travel Planning — Holy Land, Camino & Rome',
  description:
    'Plan meaningful Christian and faith-based trips with TourWise AI guides for the Holy Land, Camino de Santiago, Rome, and future pilgrimage routes.',
  alternates: { canonical: 'https://tourwiseai.com/faith-travel' },
}

export default function FaithTravelHubPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-28">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />

      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">
            Faith travel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">
              Faith-Based Travel Planning — Holy Land, Camino & Rome
            </span>
          </h1>
          <p className="text-lg text-white/75 max-w-4xl">
            TourWise AI helps Christian travelers and faith-based groups plan meaningful trips with a clear
            structure from first idea to final day-by-day route.
          </p>
          <p className="text-white/70 max-w-4xl">
            We cover pilgrimage routes, spiritual landmarks, hotels, tickets, pacing, and practical details
            for destinations including the Holy Land, Camino de Santiago, and Christian Rome with the
            Vatican.
          </p>
          <div className="pt-1">
            <Link
              href="#faith-guides"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
            >
              Explore Faith Travel Guides
            </Link>
          </div>
          <AffiliateDisclosure />
        </div>
      </section>

      <section id="faith-guides" className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white">
            Choose Your Faith Travel Guide
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/holy-land-tours-from-usa"
              className="glass-strong rounded-xl border border-white/10 p-6 transition hover:border-neon-cyan/50"
            >
              <h3 className="heading-robotic text-xl font-semibold text-white">
                Holy Land Tours from USA
              </h3>
              <p className="mt-3 text-white/75">
                Compare Christian Holy Land tour operators, routes, prices, group sizes, and what to know
                before booking Israel.
              </p>
            </Link>
            <Link
              href="/camino-de-santiago-planner"
              className="glass-strong rounded-xl border border-white/10 p-6 transition hover:border-neon-cyan/50"
            >
              <h3 className="heading-robotic text-xl font-semibold text-white">
                Camino de Santiago Planner
              </h3>
              <p className="mt-3 text-white/75">
                Compare Camino routes, plan your walking pace, find places to stay, and get a
                beginner-friendly Camino itinerary.
              </p>
            </Link>
            <Link
              href="/vatican-rome-christian-itinerary"
              className="glass-strong rounded-xl border border-white/10 p-6 transition hover:border-neon-cyan/50"
            >
              <h3 className="heading-robotic text-xl font-semibold text-white">
                Christian Rome & Vatican
              </h3>
              <p className="mt-3 text-white/75">
                Build a 5-day Rome and Vatican pilgrimage with skip-the-line ticket tips, Christian sites,
                and day trip ideas.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white">Coming Soon</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <article className="glass-strong rounded-xl border border-white/10 p-5">
              <h3 className="heading-robotic text-lg font-semibold text-white">Camino Portugues</h3>
              <p className="mt-2 text-sm text-white/70">
                Route-focused planning for coastal and central path options.
              </p>
            </article>
            <article className="glass-strong rounded-xl border border-white/10 p-5">
              <h3 className="heading-robotic text-lg font-semibold text-white">
                Reformation Tour Germany
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Christian heritage stops, rail routing, and city-by-city pacing.
              </p>
            </article>
            <article className="glass-strong rounded-xl border border-white/10 p-5">
              <h3 className="heading-robotic text-lg font-semibold text-white">
                Greece + Turkey (Footsteps of Paul)
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Biblical history route builder with practical transfer planning.
              </p>
            </article>
            <article className="glass-strong rounded-xl border border-white/10 p-5">
              <h3 className="heading-robotic text-lg font-semibold text-white">Israel for Pastors</h3>
              <p className="mt-2 text-sm text-white/70">
                Group-first itineraries for teaching teams and church leaders.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <LeadMagnetForm
            magnetId="faith-travel-notify"
            title="Get Notified When New Faith Travel Guides Launch"
            description="Join the TourWise AI faith travel list and we’ll send new pilgrimage guides, route ideas, and planning resources as they go live."
          />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-5xl mx-auto glass-strong rounded-xl border border-white/10 p-6 md:p-8 space-y-4">
          <h2 className="heading-robotic text-2xl font-bold text-white">
            Ready to Plan a Faith-Based Trip?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/?destination=Faith+Travel"
              className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
            >
              Start Planning with TourWise AI
            </Link>
            <Link
              href="/holy-land-tours-from-usa"
              className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              View the Holy Land Guide
            </Link>
          </div>
        </div>
      </section>

      <StickyTripCTA destination="Faith Travel" />
      <Footer />
    </main>
  )
}
