/**
 * Central affiliate link registry for TourWiseAI.
 * All partner URLs should come from this file.
 */
import { buildAviasalesSearchUrl } from './aviasales'
import { extractOriginAndDestination } from './iata-codes'
export const AFFILIATE_LINK_REL = 'nofollow sponsored noopener noreferrer' as const

export const AFFILIATE_CATEGORIES = [
  'flights',
  'hotels',
  'tours',
  'esim',
  'transfers',
  'carRentals',
  'bikeRentals',
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
      // Houston-only form when a button has no route. Dated route links are built
      // with buildAviasalesSearchUrl at the button that knows the cities.
      url: buildAviasalesSearchUrl({ origin: 'HOU' }),
      description:
        'Opens Aviasales with Houston filled in as the departure city and one adult in economy. Add a destination and dates there. This page does not show a fare.',
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
    // Stay22 destination links live in STAY22_GUIDE_LINKS. Each guide has its own URL.
  },
  tours: {
    // ---------------------------------------------------------------------------
    // VIATOR — destination guide links live in VIATOR_GUIDE_LINKS. Each guide
    // has its own URL. This generic card stays hidden until a single url is set.
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

function stay22GuideLink(city: string, url: string): AffiliateLinkItem {
  return {
    name: 'Stay22',
    category: 'hotels',
    url,
    description: 'Compare hotel options for this destination.',
    recommendedButtonText: `Compare hotels in ${city}`,
  }
}

/** Verified Stay22 links, one per destination guide. */
export const STAY22_GUIDE_LINKS = {
  cancun: stay22GuideLink('Cancun', 'https://booking.stay22.com/tourwiseai/2aWNlm1sBY'),
  lagos: stay22GuideLink('Lagos', 'https://booking.stay22.com/tourwiseai/gaIeh5D0-C'),
  'cape-town': stay22GuideLink('Cape Town', 'https://booking.stay22.com/tourwiseai/DQ2K_dcL9B'),
  london: stay22GuideLink('London', 'https://booking.stay22.com/tourwiseai/HLDcRcTZLw'),
  paris: stay22GuideLink('Paris', 'https://booking.stay22.com/tourwiseai/7W8a7OJL75'),
  rome: stay22GuideLink('Rome', 'https://booking.stay22.com/tourwiseai/pr5mOfO5ZS'),
  dubai: stay22GuideLink('Dubai', 'https://booking.stay22.com/tourwiseai/vnC8xS_Cpt'),
  accra: stay22GuideLink('Accra', 'https://booking.stay22.com/tourwiseai/S0yMGwrcQb'),
  kenya: stay22GuideLink('Kenya', 'https://booking.stay22.com/tourwiseai/3V0IdBZ0Le'),
} as const

function viatorGuideLink(place: string, url: string): AffiliateLinkItem {
  return {
    name: 'Viator',
    category: 'tours',
    url,
    description: 'Tours and activities for this destination.',
    recommendedButtonText: `Book tours & activities in ${place}`,
  }
}

/**
 * Verified Viator links, one per destination guide.
 * Lagos opens the Nigeria page. Kenya opens the Nairobi page.
 */
export const VIATOR_GUIDE_LINKS = {
  cancun: viatorGuideLink(
    'Cancun',
    'https://www.viator.com/Cancun/d631-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  lagos: viatorGuideLink(
    'Nigeria',
    'https://www.viator.com/Nigeria/d22316-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  'cape-town': viatorGuideLink(
    'Cape Town',
    'https://www.viator.com/Cape-Town/d318-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  london: viatorGuideLink(
    'London',
    'https://www.viator.com/London/d737-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  paris: viatorGuideLink(
    'Paris',
    'https://www.viator.com/Paris/d479-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  rome: viatorGuideLink(
    'Rome',
    'https://www.viator.com/Rome/d511-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  dubai: viatorGuideLink(
    'Dubai',
    'https://www.viator.com/Dubai/d828-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  accra: viatorGuideLink(
    'Accra',
    'https://www.viator.com/Accra/d5517-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
  kenya: viatorGuideLink(
    'Nairobi',
    'https://www.viator.com/Nairobi/d5280-ttd?pid=P00322985&mcid=42383&medium=link'
  ),
} as const

export const AFFILIATE_LINK_LIST = Object.values(AFFILIATE_LINKS).flatMap((group) =>
  Object.values(group)
) as AffiliateLinkItem[]

export type AffiliateSuggestion = AffiliateLinkItem & {
  id: string
  reason: string
}

const joinText = (parts: string[]) => parts.join(' ').toLowerCase()

function flightSuggestion(query: string): AffiliateLinkItem {
  const { origin, destination } = extractOriginAndDestination(query)
  return {
    ...AFFILIATE_LINKS.flights.aviasales,
    url: buildAviasalesSearchUrl({
      origin: origin || 'HOU',
      destination,
    }),
  }
}

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
    push('flights', flightSuggestion(query), 'Flights or airports came up in your plan.')
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

  if (/\b(delay|cancellation|denied boarding|compensation|eu ?261|flight disrupt)\b/i.test(text)) {
    push('comp-airhelp', AFFILIATE_LINKS.compensation.airhelp, 'Delays or cancellations mentioned.')
    push('comp-compensair', AFFILIATE_LINKS.compensation.compensair, 'See if you are owed compensation.')
  }

  if (/\b(boat|cruise|yacht|ferry|sailing|sea day)\b/i.test(text)) {
    push('sea-searadar', AFFILIATE_LINKS.seaTravel.searadar, 'Boat or coastal segments.')
  }

  if (out.length === 0) {
    push('flights-default', flightSuggestion(query), 'Lock dates and compare airfare.')
    push('activities-default', AFFILIATE_LINKS.tours.klook, 'Book experiences for your destination.')
  }

  return out.slice(0, 6)
}
