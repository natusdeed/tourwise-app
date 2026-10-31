import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Airport Transfers | TourWiseAI',
  description: 'Plan airport transfers before you fly with TourWiseAI partner tools. Partner named on site: Kiwitaxi.',
  path: '/airport-transfers',
})

export default function AirportTransfersPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">Airport Transfers</span></h1>
          <p className="text-white/75">Reduce arrival stress by pre-booking airport pickups after you lock your flights and lodging.</p>
          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.transfers.kiwitaxi.url} trackingLabel="airport-transfers-kiwi" className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Book Airport Transfer</ExternalAffiliateLink>
            <Link href="/cheap-flights" className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">Go to Cheap Flights</Link>
          </div>
          <AffiliateDisclosure />
        </div>
      </section>
      <Footer />
    </main>
  )
}
