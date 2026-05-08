import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vatican Rome Christian Travel Guide',
  description:
    'Plan a Christian trip to Rome and the Vatican with itinerary guidance, practical planning notes, and related faith travel resources.',
  alternates: { canonical: 'https://tourwiseai.com/vatican-rome-christian-travel-guide' },
}

export default function VaticanRomeChristianTravelGuidePage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Vatican Rome Christian Travel Guide</span>
          </h1>
          <p className="text-white/75">
            Use this guide entry point to access our full Rome and Vatican planning content for Christian travelers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/vatican-rome-christian-itinerary" className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">
              Open Full Rome & Vatican Itinerary
            </Link>
            <Link href="/faith-travel" className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">
              Explore Faith Travel Hub
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
