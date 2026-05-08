/**
 * Central Travelpayouts short links (tp.st) for Tourwise AI.
 * Use only these URLs for monetized outbound CTAs site-wide.
 */

export const AFFILIATE_LINK_REL = 'nofollow sponsored noopener noreferrer' as const

export type AffiliateLinkItem = {
  /** Visible partner / product name */
  partner: string
  /** Default CTA label */
  label: string
  url: string
}

export const AFFILIATE_LINKS = {
  flights: {
    aviasales: {
      partner: 'Aviasales',
      label: 'Find Cheap Flights',
      url: 'https://aviasales.tp.st/qpIjGSzy',
    },
  },
  tours: {
    klook: {
      partner: 'Klook',
      label: 'Book Activities',
      url: 'https://klook.tp.st/BUBgkcdK',
    },
    tiqets: {
      partner: 'Tiqets',
      label: 'Attractions & Tickets',
      url: 'https://tiqets.tp.st/4Nt5bARw',
    },
    wegotrip: {
      partner: 'Wegotrip',
      label: 'Audio Tours / City Tours',
      url: 'https://wegotrip.tp.st/ndpQAL9M',
    },
    ticketnetwork: {
      partner: 'TicketNetwork',
      label: 'Events Near You',
      url: 'https://ticketnetwork.tp.st/BNn5ubdJ',
    },
  },
  esim: {
    airalo: {
      partner: 'Airalo',
      label: 'Get Travel eSIM',
      url: 'https://airalo.tp.st/GAQVa77S',
    },
    yesim: {
      partner: 'Yesim',
      label: 'Compare eSIM Plans',
      url: 'https://yesim.tp.st/8nIqLptQ',
    },
    drimsim: {
      partner: 'Drimsim',
      label: 'Backup Travel SIM',
      url: 'https://drimsim.tp.st/uvGifbV1',
    },
  },
  transfers: {
    kiwitaxi: {
      partner: 'Kiwitaxi',
      label: 'Book Airport Transfer',
      url: 'https://kiwitaxi.tp.st/1ohvPr7V',
    },
    welcomePickups: {
      partner: 'Welcome Pickups',
      label: 'Private Airport Pickup',
      url: 'https://tp.st/Q6l5lO20',
    },
    gettransfer: {
      partner: 'GetTransfer',
      label: 'Compare Transfers',
      url: 'https://gettransfer.tp.st/QSiGZjJO',
    },
    intui: {
      partner: 'Intui Travel',
      label: 'Shared/Private Transfer',
      url: 'https://intui.tp.st/wwXLxAYy',
    },
  },
  carRentals: {
    localrent: {
      partner: 'Localrent',
      label: 'Rent a Car',
      url: 'https://localrent.tp.st/SOncPyr4',
    },
    getrentacar: {
      partner: 'GetRentacar',
      label: 'Alternative Car Rental',
      url: 'https://getrentacar.tp.st/1rTkO3np',
    },
    economybookings: {
      partner: 'EconomyBookings',
      label: 'Compare Car Rentals',
      url: 'https://economybookings.tp.st/MikZp4Vx',
    },
    qeeq: {
      partner: 'QEEQ',
      label: 'More Car Rental Deals',
      url: 'https://qeeq.tp.st/KsqTipUC',
    },
    autoeurope: {
      partner: 'AutoEurope',
      label: 'International Car Rental',
      url: 'https://autoeurope.tp.st/DxC6Kaix',
    },
  },
  bikeRentals: {
    bikesbooking: {
      partner: 'BikesBooking',
      label: 'Rent a Bike',
      url: 'https://bikesbooking.tp.st/J222oCRg',
    },
  },
  insurance: {
    ekta: {
      partner: 'Ekta Travel Insurance',
      label: 'Get Travel Insurance',
      url: 'https://ektatraveling.tp.st/k2fRJYNJ',
    },
  },
  compensation: {
    airhelp: {
      partner: 'AirHelp',
      label: 'Claim Flight Compensation',
      url: 'https://airhelp.tp.st/PqdZnWfc',
    },
    compensair: {
      partner: 'Compensair',
      label: 'Check Compensation',
      url: 'https://compensair.tp.st/wdUzhr22',
    },
  },
  seaTravel: {
    searadar: {
      partner: 'SeaRadar',
      label: 'Book Yacht / Boat Rental',
      url: 'https://searadar.tp.st/TXhyLQso',
    },
  },
} as const

export type AffiliateSuggestion = AffiliateLinkItem & {
  id: string
  reason: string
}

const joinText = (parts: string[]) => parts.join(' ').toLowerCase()

/**
 * Lightweight, keyword-based suggestions after an AI itinerary (no extra API calls).
 */
export function getContextualAffiliateSuggestions(query: string, itinerary: string): AffiliateSuggestion[] {
  const text = joinText([query, itinerary])
  const out: AffiliateSuggestion[] = []
  const seen = new Set<string>()

  const push = (id: string, item: AffiliateLinkItem, reason: string) => {
    if (seen.has(id)) return
    seen.add(id)
    out.push({ id, ...item, reason })
  }

  const flying =
    /\b(flight|fly|flying|airline|airport|ticket|layover|boarding)\b/i.test(text) ||
    /\b(round\s*-?trip|roundtrip|nonstop|layover)\b/i.test(text)
  if (flying) {
    push('flights', AFFILIATE_LINKS.flights.aviasales, 'Flights or airports came up in your plan.')
  }

  if (/\b(museum|tour|activity|attraction|skip-the-line|walking tour|day trip|things to do)\b/i.test(text)) {
    push('activities-klook', AFFILIATE_LINKS.tours.klook, 'Activities and tours match your itinerary.')
    push('attractions-tiqets', AFFILIATE_LINKS.tours.tiqets, 'Timed tickets and museum-style stops.')
  }

  if (
    /\b(international|abroad|overseas|passport|visa|another country|border)\b/i.test(text) ||
    /\b(europe|asia|africa|oceania|middle east)\b/i.test(text)
  ) {
    push('esim-airalo', AFFILIATE_LINKS.esim.airalo, 'International trip — stay connected abroad.')
    push('esim-yesim', AFFILIATE_LINKS.esim.yesim, 'Compare data plans for your route.')
  }

  if (/\b(airport|arrival|landing|pickup|transfer|shuttle|taxi from)\b/i.test(text)) {
    push('transfer-kiwi', AFFILIATE_LINKS.transfers.kiwitaxi, 'Airport arrival — pre-book a transfer.')
    push('transfer-welcome', AFFILIATE_LINKS.transfers.welcomePickups, 'Private pickup options.')
  }

  if (/\b(road trip|drive|rent a car|driving|highway|self-?drive)\b/i.test(text)) {
    push('car-localrent', AFFILIATE_LINKS.carRentals.localrent, 'Road-trip style routing.')
    push('car-compare', AFFILIATE_LINKS.carRentals.economybookings, 'Compare rental rates.')
  }

  if (/\b(insurance|medical cover|trip protection|cancel(lation)? policy)\b/i.test(text)) {
    push('insurance-ekta', AFFILIATE_LINKS.insurance.ekta, 'Protection came up in your plan.')
  }

  if (/\b(delay|cancellation|denied boarding|compensation|eu ?261|flight disrupt)\b/i.test(text)) {
    push('comp-airhelp', AFFILIATE_LINKS.compensation.airhelp, 'Delays or cancellations mentioned.')
    push('comp-compensair', AFFILIATE_LINKS.compensation.compensair, 'See if you are owed compensation.')
  }

  if (/\b(boat|cruise|yacht|ferry|sailing|sea day)\b/i.test(text)) {
    push('sea-searadar', AFFILIATE_LINKS.seaTravel.searadar, 'Boat or coastal segments.')
  }

  if (out.length === 0) {
    push('flights-default', AFFILIATE_LINKS.flights.aviasales, 'Lock dates and compare airfare.')
    push('activities-default', AFFILIATE_LINKS.tours.klook, 'Book experiences for your destination.')
  }

  return out.slice(0, 6)
}
