import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { DESTINATION_GUIDES } from '@/lib/destination-guides'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Destination Guides | TourWiseAI',
  description:
    'Planning guides for Cancun, Lagos, and Cape Town, with seasons, neighborhoods, and partner tools for flights and arrivals.',
  path: '/guides',
})

export default function GuidesIndexPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Destination Guides</span>
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-3xl">
            Short planning guides. They explain how to shape a trip. Bookings happen on partner sites.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {DESTINATION_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.path}
                className="glass-strong rounded-xl border border-white/10 p-5 hover:border-neon-cyan/50 transition-colors min-w-0"
              >
                <h2 className="text-white font-semibold">{guide.h1}</h2>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">{guide.description}</p>
                <span className="text-sm text-neon-cyan mt-3 inline-block">Read the guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
