import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'

export const metadata: Metadata = {
  title: 'Cheap Flights from Houston',
  description:
    'Explore Houston route guides with planning tips, airport notes, and next-step links for flights, transfers, eSIM, and trip planning.',
  alternates: { canonical: 'https://tourwiseai.com/cheap-flights-from-houston' },
}

const routes = [
  { href: '/cheap-flights-from-houston/houston-to-lagos-flights', label: 'Houston to Lagos flights' },
  { href: '/cheap-flights-from-houston/houston-to-cancun-flights', label: 'Houston to Cancun flights' },
  { href: '/cheap-flights-from-houston/houston-to-london-flights', label: 'Houston to London flights' },
  { href: '/cheap-flights-from-houston/houston-to-paris-flights', label: 'Houston to Paris flights' },
  { href: '/cheap-flights-from-houston/houston-to-rome-flights', label: 'Houston to Rome flights' },
  { href: '/cheap-flights-from-houston/houston-to-orlando-flights', label: 'Houston to Orlando flights' },
]

export default function CheapFlightsFromHoustonPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">Cheap Flights from Houston</span></h1>
          <p className="text-white/75">Route guides for Houston travelers looking to plan smarter before booking.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className="glass-strong rounded-xl border border-white/10 p-5 text-white hover:border-neon-cyan/50">
                {route.label}
              </Link>
            ))}
          </div>
          <AffiliateDisclosure />
        </div>
      </section>
      <Footer />
    </main>
  )
}
