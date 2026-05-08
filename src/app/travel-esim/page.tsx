import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'

export const metadata: Metadata = {
  title: 'Travel eSIM',
  description:
    'Find travel eSIM options for international trips and stay connected from arrival through departure.',
  alternates: { canonical: 'https://tourwiseai.com/travel-esim' },
}

export default function TravelEsimPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">Travel eSIM</span></h1>
          <p className="text-white/75">Set up mobile data before departure so you can navigate, message, and access confirmations when you land.</p>
          <div className="flex flex-wrap gap-3">
            <ExternalAffiliateLink href={AFFILIATE_LINKS.esim.airalo.url} trackingLabel="travel-esim-airalo" className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">Get Travel eSIM</ExternalAffiliateLink>
            <Link href="/travel-deals" className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">See All Travel Deals</Link>
          </div>
          <AffiliateDisclosure />
        </div>
      </section>
      <Footer />
    </main>
  )
}
