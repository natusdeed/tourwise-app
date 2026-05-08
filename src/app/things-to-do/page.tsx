import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'

export const metadata: Metadata = {
  title: 'Things to Do',
  description:
    'Discover tours and activities you can add to your itinerary, with practical planning tips for timing, tickets, and logistics.',
  alternates: { canonical: 'https://tourwiseai.com/things-to-do' },
}

export default function ThingsToDoPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">Things to Do</span></h1>
          <p className="text-white/75">Use this page to shortlist experiences after your route and budget are clear.</p>
          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.tours.klook.url} trackingLabel="things-to-do-klook" className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Browse Tours & Activities</ExternalAffiliateLink>
            <Link href="/travel-deals" className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">More Travel Deals</Link>
          </div>
          <AffiliateDisclosure />
        </div>
      </section>
      <Footer />
    </main>
  )
}
