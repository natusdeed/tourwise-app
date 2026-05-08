import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import AffiliateCard from '@/components/AffiliateCard'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { breadcrumbListSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Travel Deals',
  description:
    'Explore travel deals and essentials on TourWiseAI, including flights, tours, airport transfers, eSIM options, and travel insurance tools.',
  alternates: { canonical: 'https://tourwiseai.com/travel-deals' },
}

export default function TravelDealsPage() {
  const sections = [
    { title: 'Flights', cards: [AFFILIATE_LINKS.flights.aviasales] },
    { title: 'Tours & Activities', cards: [AFFILIATE_LINKS.tours.klook, AFFILIATE_LINKS.tours.tiqets, AFFILIATE_LINKS.tours.wegotrip] },
    { title: 'Airport Transfers', cards: [AFFILIATE_LINKS.transfers.kiwitaxi, AFFILIATE_LINKS.transfers.welcomePickups, AFFILIATE_LINKS.transfers.gettransfer] },
    { title: 'Travel eSIM', cards: [AFFILIATE_LINKS.esim.airalo, AFFILIATE_LINKS.esim.yesim, AFFILIATE_LINKS.esim.drimsim] },
    { title: 'Car Rentals', cards: [AFFILIATE_LINKS.carRentals.localrent, AFFILIATE_LINKS.carRentals.economybookings, AFFILIATE_LINKS.carRentals.qeeq] },
    { title: 'Travel Insurance', cards: [AFFILIATE_LINKS.insurance.ekta] },
    { title: 'Flight Compensation', cards: [AFFILIATE_LINKS.compensation.airhelp, AFFILIATE_LINKS.compensation.compensair] },
    { title: 'Bike Rentals', cards: [AFFILIATE_LINKS.bikeRentals.bikesbooking] },
    { title: 'Sea Travel', cards: [AFFILIATE_LINKS.seaTravel.searadar] },
  ]

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script
        id="travel-deals-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema([{ name: 'Home', path: '/' }, { name: 'Travel Deals', path: '/travel-deals' }])) }}
      />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic"><span className="text-gradient">Travel Deals</span></h1>
          <p className="text-white/75">A central hub to compare options, check current offers, and explore partner deals for every stage of your trip.</p>
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-white heading-robotic">{section.title}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.cards.map((card) => (
                  <AffiliateCard
                    key={`${section.title}-${card.name}`}
                    affiliate={card}
                    trackingLabel={`travel_deals_${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${card.name.toLowerCase().replace(/\s+/g, '_')}`}
                  />
                ))}
              </div>
            </section>
          ))}
          <AffiliateDisclosure />
        </div>
      </section>
      <Footer />
    </main>
  )
}
