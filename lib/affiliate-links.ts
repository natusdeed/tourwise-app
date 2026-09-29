/**
 * Central affiliate link registry for TourWiseAI.
 * All partner URLs should come from this file.
 */
export const AFFILIATE_LINK_REL = 'nofollow sponsored noopener noreferrer' as const

export const AFFILIATE_CATEGORIES = [
  'flights',
  'hotels',
  'tours',
  'esim',
  'transfers',
  'carRentals',
  'bikeRentals',
  'insurance',
  'compensation',
  'seaTravel',
] as const

export type AffiliateCategory = (typeof AFFILIATE_CATEGORIES)[number]

export type AffiliateLinkItem = {
  name: string
  category: AffiliateCategory
  url: string
  description: string
  recommendedButtonText: string
}

export const AFFILIATE_LINKS = {
  flights: {
    aviasales: {
      name: 'Aviasales',
      category: 'flights',
      url: 'https://aviasales.tp.st/qpIjGSzy',
      description: 'Compare flight options and route timing before booking.',
      recommendedButtonText: 'Compare flight options',
    },
  },
  hotels: {
    // ---------------------------------------------------------------------------
    // HOTEL PROGRAMS — paste your own Travelpayouts links below.
    // Dashboard: Travelpayouts → Programs → All Programs → Connect, then Tools →
    // copy each program's link and paste it as `url`. Cards with an empty `url`
    // are hidden automatically across the site until you fill them in.
    // ---------------------------------------------------------------------------
    tripcom: {
      name: 'Trip.com',
      category: 'hotels',
      url: '',
      description: 'Compare hotel prices across thousands of properties worldwide.',
      recommendedButtonText: 'Compare hotel prices',
    },
    bookingcom: {
      name: 'Booking.com',
      category: 'hotels',
      url: '',
      description: 'Hotels, apartments, and guesthouses worldwide.',
      recommendedButtonText: 'Find stays',
    },
    hotelook: {
      name: 'Hotelook',
      category: 'hotels',
      url: '',
      description: 'Hotel metasearch — compare prices across major booking sites.',
      recommendedButtonText: 'Search hotels',
    },
  },
  tours: {
    // ---------------------------------------------------------------------------
    // VIATOR — join in Travelpayouts (Programs → Viator → Connect), then paste
    // your affiliate link as `url`. 8% commission, 30-day cookie, 300k+
    // experiences. The card stays hidden until you fill it in.
    // ---------------------------------------------------------------------------
    viator: {
      name: 'Viator',
      category: 'tours',
      url: '',
      description: 'Top-rated tours, activities, and experiences worldwide.',
      recommendedButtonText: 'Explore tours & activities',
    },
    klook: {
      name: 'Klook',
      category: 'tours',
      url: 'https://klook.tp.st/BUBgkcdK',
      description: 'Discover tours, attraction tickets, and activity bundles.',
      recommendedButtonText: 'Explore booking options',
    },
    tiqets: {
      name: 'Tiqets',
      category: 'tours',
      url: 'https://tiqets.tp.st/4Nt5bARw',
      description: 'Book museum and attraction tickets for major destinations.',
      recommendedButtonText: 'Check current deals',
    },
    wegotrip: {
      name: 'Wegotrip',
      category: 'tours',
      url: 'https://wegotrip.tp.st/ndpQAL9M',
      description: 'Audio-guided and city tour options for flexible itineraries.',
      recommendedButtonText: 'Explore partner deals',
    },
    ticketnetwork: {
      name: 'TicketNetwork',
      category: 'tours',
      url: 'https://ticketnetwork.tp.st/BNn5ubdJ',
      description: 'Find live events and ticketed experiences while traveling.',
      recommendedButtonText: 'Check current offers',
    },
  },
  esim: {
    airalo: {
      name: 'Airalo',
      category: 'esim',
      url: 'https://airalo.tp.st/GAQVa77S',
      description: 'Stay connected abroad with destination-specific data plans.',
      recommendedButtonText: 'Compare eSIM options',
    },
    yesim: {
      name: 'Yesim',
      category: 'esim',
      url: 'https://yesim.tp.st/8nIqLptQ',
      description: 'International eSIM coverage for short and long trips.',
      recommendedButtonText: 'Check current offers',
    },
    drimsim: {
      name: 'Drimsim',
      category: 'esim',
      url: 'https://drimsim.tp.st/uvGifbV1',
      description: 'Alternative travel SIM option for global data access.',
      recommendedButtonText: 'Explore data options',
    },
  },
  transfers: {
    kiwitaxi: {
      name: 'Kiwitaxi',
      category: 'transfers',
      url: 'https://kiwitaxi.tp.st/1ohvPr7V',
      description: 'Pre-book private airport transfers before arrival.',
      recommendedButtonText: 'Book airport transfer',
    },
    welcomePickups: {
      name: 'Welcome Pickups',
      category: 'transfers',
      url: 'https://tp.st/Q6l5lO20',
      description: 'Door-to-door transfer options from airport to hotel.',
      recommendedButtonText: 'Compare transfer options',
    },
    gettransfer: {
      name: 'GetTransfer',
      category: 'transfers',
      url: 'https://gettransfer.tp.st/QSiGZjJO',
      description: 'Compare private transfer offers in major cities.',
      recommendedButtonText: 'Check current deals',
    },
    intui: {
      name: 'Intui Travel',
      category: 'transfers',
      url: 'https://intui.tp.st/wwXLxAYy',
      description: 'Shared and private ride choices for airport arrivals.',
      recommendedButtonText: 'Explore transfer options',
    },
  },
  carRentals: {
    // ---------------------------------------------------------------------------
    // DISCOVER CARS — direct program at discovercars.com/affiliate (free signup,
    // ~$20 avg commission per booking, 365-day cookie). Paste your affiliate link
    // as `url`. Hidden until filled in.
    // ---------------------------------------------------------------------------
    discovercars: {
      name: 'Discover Cars',
      category: 'carRentals',
      url: '',
      description: 'Compare car rental deals worldwide with free cancellation.',
      recommendedButtonText: 'Compare car rental deals',
    },
    localrent: {
      name: 'Localrent',
      category: 'carRentals',
      url: 'https://localrent.tp.st/SOncPyr4',
      description: 'Compare local car rentals for flexible self-drive plans.',
      recommendedButtonText: 'Compare car rentals',
    },
    getrentacar: {
      name: 'GetRentacar',
      category: 'carRentals',
      url: 'https://getrentacar.tp.st/1rTkO3np',
      description: 'Browse alternative rental inventory and pricing.',
      recommendedButtonText: 'Check rental options',
    },
    economybookings: {
      name: 'EconomyBookings',
      category: 'carRentals',
      url: 'https://economybookings.tp.st/MikZp4Vx',
      description: 'Compare rental offers across providers.',
      recommendedButtonText: 'Check current offers',
    },
    qeeq: {
      name: 'QEEQ',
      category: 'carRentals',
      url: 'https://qeeq.tp.st/KsqTipUC',
      description: 'Global car rental options and booking support.',
      recommendedButtonText: 'Explore partner deals',
    },
    autoeurope: {
      name: 'AutoEurope',
      category: 'carRentals',
      url: 'https://autoeurope.tp.st/DxC6Kaix',
      description: 'International rental options for multi-country trips.',
      recommendedButtonText: 'Compare international rentals',
    },
  },
  bikeRentals: {
    bikesbooking: {
      name: 'BikesBooking',
      category: 'bikeRentals',
      url: 'https://bikesbooking.tp.st/J222oCRg',
      description: 'Find motorbike and bicycle rental options by destination.',
      recommendedButtonText: 'Explore bike rental options',
    },
  },
  insurance: {
    ekta: {
      name: 'Ekta Travel Insurance',
      category: 'insurance',
      url: 'https://ektatraveling.tp.st/k2fRJYNJ',
      description: 'Travel insurance options for medical and trip protection.',
      recommendedButtonText: 'Get travel insurance',
    },
  },
  compensation: {
    airhelp: {
      name: 'AirHelp',
      category: 'compensation',
      url: 'https://airhelp.tp.st/PqdZnWfc',
      description: 'Check flight delay or cancellation compensation eligibility.',
      recommendedButtonText: 'Check compensation options',
    },
    compensair: {
      name: 'Compensair',
      category: 'compensation',
      url: 'https://compensair.tp.st/wdUzhr22',
      description: 'Alternative service to evaluate flight compensation claims.',
      recommendedButtonText: 'Explore compensation options',
    },
  },
  seaTravel: {
    searadar: {
      name: 'SeaRadar',
      category: 'seaTravel',
      url: 'https://searadar.tp.st/TXhyLQso',
      description: 'Compare yacht and boat charter options.',
      recommendedButtonText: 'Explore sea travel options',
    },
  },
} as const

export const AFFILIATE_LINK_LIST = Object.values(AFFILIATE_LINKS).flatMap((group) =>
  Object.values(group)
) as AffiliateLinkItem[]

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

  // Stays come up in nearly every itinerary — surface hotel partners when configured.
  if (/\b(hotel|hostel|stay|staying|accommodation|lodging|resort|airbnb|guesthouse|riad|where to stay)\b/i.test(text)) {
    if (AFFILIATE_LINKS.hotels.tripcom.url) {
      push('hotel-trip', AFFILIATE_LINKS.hotels.tripcom, 'Stays came up in your plan.')
    }
    if (AFFILIATE_LINKS.hotels.bookingcom.url) {
      push('hotel-booking', AFFILIATE_LINKS.hotels.bookingcom, 'Compare stays for your dates.')
    }
  }

  if (/\b(museum|tour|activity|attraction|skip-the-line|walking tour|day trip|things to do)\b/i.test(text)) {
    if (AFFILIATE_LINKS.tours.viator.url) {
      push('activities-viator', AFFILIATE_LINKS.tours.viator, 'Top-rated tours and experiences worldwide.')
    }
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
    if (AFFILIATE_LINKS.carRentals.discovercars.url) {
      push('car-discover', AFFILIATE_LINKS.carRentals.discovercars, 'Compare car rental deals worldwide.')
    }
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
