'use client'

import { motion } from 'framer-motion'
import { Plane, Hotel, Compass, Car, ShieldAlert, Smartphone, Bus, Scale, type LucideIcon } from 'lucide-react'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'

type TravelDealCard = {
  id: string
  title: string
  blurb: string
  icon: LucideIcon
  cta: string | null
  href: string | null
  trackingLabel: string | null
  isPlaceholder: boolean
}

const deals: TravelDealCard[] = [
  {
    id: 'flights',
    title: 'Flights',
    blurb: 'Compare routes and carriers.',
    icon: Plane,
    cta: AFFILIATE_LINKS.flights.aviasales.recommendedButtonText,
    href: AFFILIATE_LINKS.flights.aviasales.url,
    trackingLabel: 'home_deals_flights',
    isPlaceholder: false,
  },
  {
    id: 'stays',
    title: 'Stays',
    blurb: 'Lock trip dates with our planner first, then book your favorite hotel site.',
    icon: Hotel,
    cta: null,
    href: null,
    trackingLabel: null,
    isPlaceholder: true,
  },
  {
    id: 'tours',
    title: 'Tours & activities',
    blurb: 'Tickets, day trips, and experiences.',
    icon: Compass,
    cta: AFFILIATE_LINKS.tours.klook.recommendedButtonText,
    href: AFFILIATE_LINKS.tours.klook.url,
    trackingLabel: 'home_deals_tours',
    isPlaceholder: false,
  },
  {
    id: 'transfers',
    title: 'Airport transfers',
    blurb: 'Private rides and pre-booked pickups.',
    icon: Bus,
    cta: AFFILIATE_LINKS.transfers.kiwitaxi.recommendedButtonText,
    href: AFFILIATE_LINKS.transfers.kiwitaxi.url,
    trackingLabel: 'home_deals_transfers',
    isPlaceholder: false,
  },
  {
    id: 'esim',
    title: 'Travel eSIM',
    blurb: 'Data before you land.',
    icon: Smartphone,
    cta: AFFILIATE_LINKS.esim.airalo.recommendedButtonText,
    href: AFFILIATE_LINKS.esim.airalo.url,
    trackingLabel: 'home_deals_esim',
    isPlaceholder: false,
  },
  {
    id: 'cars',
    title: 'Car rentals',
    blurb: 'Local and international options.',
    icon: Car,
    cta: AFFILIATE_LINKS.carRentals.localrent.recommendedButtonText,
    href: AFFILIATE_LINKS.carRentals.localrent.url,
    trackingLabel: 'home_deals_cars',
    isPlaceholder: false,
  },
  {
    id: 'insurance',
    title: 'Travel insurance',
    blurb: 'Medical and trip protection.',
    icon: ShieldAlert,
    cta: AFFILIATE_LINKS.insurance.ekta.recommendedButtonText,
    href: AFFILIATE_LINKS.insurance.ekta.url,
    trackingLabel: 'home_deals_insurance',
    isPlaceholder: false,
  },
  {
    id: 'compensation',
    title: 'Flight compensation',
    blurb: 'Delays, cancellations, disruptions.',
    icon: Scale,
    cta: AFFILIATE_LINKS.compensation.airhelp.recommendedButtonText,
    href: AFFILIATE_LINKS.compensation.airhelp.url,
    trackingLabel: 'home_deals_compensation',
    isPlaceholder: false,
  },
]

export default function TravelDealsSection() {
  return (
    <section
      id="travel-deals"
      className="relative py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      aria-labelledby="travel-deals-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto">
          <h2
            id="travel-deals-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold heading-robotic mb-3"
          >
            <span className="text-gradient">Travel deals &amp; essentials</span>
          </h2>
          <p className="text-white/75 text-sm md:text-base leading-relaxed">
            Hand-picked partner tools for the trip phase you&apos;re in.{' '}
            <span className="text-white/60">
              Disclosure: TourwiseAI may earn a commission when you book through some links, at no extra
              cost to you.
            </span>
          </p>
          <p className="text-white/55 text-xs mt-3">
            Some links may earn us a commission at no extra cost to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {deals.map((deal, index) => {
            const Icon = deal.icon
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="glass-strong rounded-xl border border-neon-cyan/15 p-5 flex flex-col h-full hover:border-neon-cyan/35 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-neon-cyan/10 border border-neon-cyan/25 p-2">
                    <Icon className="w-5 h-5 text-neon-cyan" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-white heading-robotic">{deal.title}</h3>
                </div>
                <p className="text-sm text-white/65 leading-relaxed flex-grow mb-4">{deal.blurb}</p>
                {deal.isPlaceholder ? (
                  <span className="text-xs text-white/45 font-medium heading-robotic border border-white/10 rounded-lg px-3 py-2 text-center">
                    Stays — plan dates first
                  </span>
                ) : deal.href && deal.cta && deal.trackingLabel ? (
                  <ExternalAffiliateLink
                    href={deal.href}
                    trackingLabel={deal.trackingLabel}
                    className="inline-flex items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-2.5 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20 transition-colors text-center"
                    aria-label={`${deal.cta} — opens ${deal.title} partner in a new tab`}
                  >
                    {deal.cta}
                  </ExternalAffiliateLink>
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
