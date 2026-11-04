import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Travel Insurance | TourWiseAI',
  description:
    'Notes on travel insurance for medical costs and trip changes, before you pay for bookings you cannot cancel.',
  path: '/travel-insurance',
})

export default function TravelInsurancePage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Travel Insurance</span>
          </h1>
          <p className="text-white/75">
            Travel insurance can help with medical costs abroad and with trip changes. Read a policy
            before you pay for bookings you cannot cancel.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ai-travel-planner"
              className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              Plan Trip First
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
