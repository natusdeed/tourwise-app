import { AFFILIATE_LINKS, STAY22_GUIDE_LINKS, type AffiliateLinkItem } from './affiliate-links'
import { buildAviasalesCityPrefillUrl } from './aviasales'

export type GuideSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type DestinationGuideContent = {
  slug: string
  path: string
  title: string
  description: string
  h1: string
  lede: string
  sections: GuideSection[]
  itinerary: { day: string; text: string }[]
  /** Overrides the default “A simple 3-day outline” heading. */
  itineraryHeading?: string
  faqs: { question: string; answer: string }[]
  related: { href: string; label: string }[]
  /** Stay22 hotel search for this destination. */
  stay: AffiliateLinkItem
  partners: AffiliateLinkItem[]
  officialLinks: { href: string; label: string }[]
}

const cancunPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.tours.tiqets,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const lagosPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const capeTownPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.tours.tiqets,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const londonPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.tours.tiqets,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const parisPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.tours.tiqets,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const romePartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.tours.tiqets,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const dubaiPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.tours.tiqets,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const accraPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

const kenyaPartners = [
  AFFILIATE_LINKS.flights.aviasales,
  AFFILIATE_LINKS.tours.klook,
  AFFILIATE_LINKS.transfers.kiwitaxi,
  AFFILIATE_LINKS.esim.airalo,
  AFFILIATE_LINKS.carRentals.localrent,
  AFFILIATE_LINKS.insurance.ekta,
]

/**
 * Flight card for a guide. The stored URL has the cities and no dates, so a
 * static build cannot freeze a departure in the past. The page button builds
 * fresh dates in the browser.
 */
const GUIDE_FLIGHT_DESTINATION: Record<string, string> = {
  cancun: 'CUN',
  lagos: 'LOS',
  'cape-town': 'CPT',
  london: 'LON',
  paris: 'PAR',
  rome: 'ROM',
  dubai: 'DXB',
  accra: 'ACC',
  kenya: 'NBO',
}

export function guideFlightDestination(slug: string): string | null {
  return GUIDE_FLIGHT_DESTINATION[slug] ?? null
}

function withHoustonFlights(
  partners: readonly AffiliateLinkItem[],
  destinationIata: string
): AffiliateLinkItem[] {
  return partners.map((partner) => {
    if (partner.name !== 'Aviasales') return partner
    return {
      ...partner,
      url: buildAviasalesCityPrefillUrl({ origin: 'HOU', destination: destinationIata }),
      description:
        'Opens an Aviasales search from Houston to this destination. Dates are a sample about three weeks out for a 7-night economy trip, for one adult. Change the dates on Aviasales before you book. TourWiseAI does not sell the ticket or show a fare.',
      recommendedButtonText: 'Compare flights from Houston',
    }
  })
}

export const DESTINATION_GUIDES: DestinationGuideContent[] = [
  {
    slug: 'cancun',
    path: '/guides/cancun',
    title: 'Cancun Travel Guide from Houston | TourWiseAI',
    description:
      'Plan Cancun from Houston: seasons, the Hotel Zone and downtown, airport arrival, getting around, and a simple 3-day outline.',
    h1: 'Cancun Travel Guide',
    lede:
      'A practical outline for US travelers, especially from Houston. It covers when the trip feels different, how people actually move around, and what to sort before you fly. Live fares and tickets stay on partner sites.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'December through April is the drier, busier beach season. Spring break and the Christmas–New Year period draw the largest US crowds, so hotels and flights fill earlier.',
          'June through November is Atlantic hurricane season. Skies can still be clear for days at a time, and demand is often lighter, but a storm can change a beach week. If you travel then, read the forecast before you lock nonrefundable plans and consider travel insurance.',
          'Late April to May, and late November into early December, sit between the holiday peaks and the heart of storm season. They are a common choice when you want warm water without the busiest weeks.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'You fly into Cancun International Airport (CUN). From Houston, both George Bush Intercontinental (IAH) and Hobby (HOU) are used for this trip. The Houston to Cancun flight guide covers nonstop options, bag differences, and how the two airports compare.',
          'Other US cities usually connect or fly nonstop depending on the season. Compare the live itinerary, including bags and the time you actually land, before you pick a fare.',
        ],
        bullets: [
          'Read the Houston to Cancun flight guide before you book from Texas.',
          'Give yourself time after landing. Several US flights often arrive together, and immigration can queue.',
          'Have the address of where you are staying. Drivers and, sometimes, the arrival form ask for it.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'The Hotel Zone is a long, thin island strip. Walking the whole zone is not realistic. Visitors use taxis, prebooked transfers, or the bus that runs between the zone and downtown. Ask where the nearest stop is, because the strip is stretched out.',
          'A rental car is more useful for a day outside the zone, toward cenotes or the Riviera Maya, than for hopping between Hotel Zone resorts. Downtown is easier on foot once you are there.',
          'Isla Mujeres is a separate boat ride. Ferries leave from the Puerto Juarez side of downtown and from points in the Hotel Zone. Check the day’s schedule at the pier. Weather can cancel boats.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'These are areas, not hotel recommendations.',
          'The Hotel Zone is the beach strip between the airport and downtown. It suits a trip that is mostly sand, pools, and resort restaurants. Places at opposite ends of the zone are not a short walk apart.',
          'Downtown Cancun, often called El Centro, is on the mainland. It is closer to markets, local food, and the Puerto Juarez ferry. The beach is a ride away.',
          'If most of your days are south of the city, some travelers base in Playa del Carmen instead and treat Cancun as the airport. That is a different trip, with its own traffic back to CUN.',
        ],
      },
      {
        heading: 'Things to do',
        paragraphs: [
          'A first trip does not need a packed list. Pick a beach day, one boat day, and one outing that leaves the zone.',
        ],
        bullets: [
          'Hotel Zone beach time. Swim where lifeguards and flags are visible, and do not assume every stretch of water is calm.',
          'Isla Mujeres for a slower day: the ferry, a golf-cart loop or a walk, and lunch that is not on a schedule.',
          'A ruins or cenote day. Chichen Itza is a long round trip from Cancun. Closer cenotes and smaller sites are easier if you only have a few hours.',
          'Downtown for Mercado 28 and a meal that is not inside a resort.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Install a travel eSIM before you fly if your phone supports one. You then have data for the transfer driver and maps as soon as you leave the terminal. Airport SIM counters are optional, not required.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Entry rules change. Before you buy a nonrefundable ticket, read the US Department of State information for Mexico and the Mexican immigration site, and confirm what applies to your passport. This guide does not state a visa length or a fee.',
          'In the airport, sales staff pitch timeshares and tours in the arrivals hall. You can keep walking to a transfer you already booked.',
          'Use the same habits you would in any busy tourist area: watch drinks, agree the ride before you get in an unmarked car, and do not leave bags on the beach while you swim.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Arrive and stay near the beach',
        text: 'Land at CUN, take the transfer you booked, and keep the first evening local to where you are staying. The Hotel Zone is long enough that a “quick” trip to the other end is not quick after a flight.',
      },
      {
        day: 'Day 2 — Isla Mujeres',
        text: 'Take a morning ferry, walk or ride the island at an easy pace, and come back before the last boats get crowded. If the wind is up, swap this day with Day 3.',
      },
      {
        day: 'Day 3 — Downtown or one outing inland',
        text: 'Use downtown for food and the market, or book a single cenote or ruins visit with a return that still leaves a buffer before your flight. Do not stack Isla Mujeres and Chichen Itza on the same day.',
      },
    ],
    faqs: [
      {
        question: 'Which Houston airport is used for Cancun?',
        answer:
          'Both IAH and Hobby show up on this route. The Houston to Cancun flight guide explains how the airlines and airports differ. Compare the total trip, including bags, not only the headline fare.',
      },
      {
        question: 'Do I need to book the airport transfer ahead?',
        answer:
          'It is the calmer option. Arrivals has a lot of people selling rides and timeshares. A named pickup lets you walk past that and meet a driver you already chose.',
      },
      {
        question: 'Is a rental car worth it for a short Cancun trip?',
        answer:
          'Not for moving around the Hotel Zone. It is more useful if you are driving yourself to cenotes or along the Riviera Maya. Otherwise a transfer plus taxis or the bus is enough.',
      },
      {
        question: 'What should I confirm before I book?',
        answer:
          'Your passport validity, the current entry rules on the official Mexico and US State Department pages, and whether your dates fall in hurricane season. This page does not replace those sources.',
      },
    ],
    related: [
      { href: '/houston-to-cancun-flights', label: 'Houston to Cancun flights' },
      { href: '/cheap-flights-from-houston', label: 'Cheap flights from Houston' },
      { href: '/guides/lagos', label: 'Lagos travel guide' },
      { href: '/guides/cape-town', label: 'Cape Town travel guide' },
    ],
    stay: STAY22_GUIDE_LINKS.cancun,
    partners: withHoustonFlights(cancunPartners, 'CUN'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Mexico.html',
        label: 'US State Department: Mexico',
      },
      { href: 'https://www.gob.mx/inm', label: 'Mexican National Institute of Migration' },
    ],
  },
  {
    slug: 'lagos',
    path: '/guides/lagos',
    title: 'Lagos, Nigeria Travel Guide | TourWiseAI',
    description:
      'Plan Lagos with a Houston departure in mind: seasons, Island and mainland bases, airport arrival, traffic, and a 3-day outline.',
    h1: 'Lagos Travel Guide',
    lede:
      'Lagos is a large coastal city, not a single neighborhood. Most first trips from the US, including Houston, go more smoothly when you pick one base, prebook the airport ride, and leave room for traffic.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'November through March is generally the drier stretch. December is a major travel month for the Nigerian diaspora, including from Houston, so flights on that corridor are in high demand. The Houston to Lagos flight guide explains that booking window.',
          'April through October is wetter. Rain can slow traffic that is already heavy. The dry months can also bring Harmattan dust from the north. Neither season is “wrong”; pack for the one you chose and do not plan outdoor time to the minute.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'International flights use Murtala Muhammed International Airport (LOS). The Houston flight guide treats this as an IAH trip with a connection, not a Hobby nonstop, and describes the journey as a long one-stop day. Read that page for routing ideas, then compare live itineraries.',
          'A short connection is a gamble on a trip this long. If the tickets are on one booking, the airline handles a missed link. Separate tickets do not.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'Distance on a map is not the time in the car. Crossing from the mainland, where the airport sits, to Victoria Island or Lekki can take much longer at rush hour than a first-time visitor expects. Put the airport pickup and the ride back to LOS on the plan before you add activities.',
          'Many visitors use a prebooked transfer or a ride-hailing app. The yellow danfo buses are the everyday city network. They are crowded and not the simplest choice on a first afternoon with luggage.',
          'A rental car does not remove traffic, and driving in central Lagos is a local skill. Compare a rental only if your days are outside the core, and you are comfortable with the roads. For a short first trip, arranged rides are the simpler default.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'These are districts, not hotel picks.',
          'Victoria Island and Ikoyi are the usual first-trip bases: restaurants, offices, and many hotels sit here, on the Island side of the lagoons. You still need a ride between them at busy hours.',
          'Lekki stretches east. Some beaches and newer districts are a long drive from Ikoyi once traffic builds. Stay in Lekki if that is where your days are, not because the map looks close.',
          'Ikeja, near the airport on the mainland, fits a late arrival or an early departure. It is a poor base if every plan is on the Island.',
        ],
      },
      {
        heading: 'Things to do',
        bullets: [
          'Lekki Conservation Centre and its canopy walk, with time reserved for the drive.',
          'Nike Art Gallery, a large private gallery. Check that it is open on your day.',
          'Freedom Park on Lagos Island, an easier cultural stop than a cross-town stack of sights.',
          'A beach afternoon at Lekki or near the Landmark area. Water quality and crowds vary. Go with a local recommendation for the specific beach.',
          'Food is part of the trip: suya, jollof, and pepper soup show up all over the city. Pick busy places rather than an empty room.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Set up a travel eSIM, or confirm your carrier’s roaming, before you land. You will want data for the driver and for traffic. The Houston flight guide also suggests carrying some US dollars as a backup because airport ATMs are not a plan you should depend on.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Do not treat visa, yellow-fever, or passport rules on a blog as current. Read the US State Department Nigeria page and the CDC travel page, then confirm the rule for your nationality with the Nigerian mission that handles your passport. Requirements change, and they are not the same for every traveler.',
          'Use transport you arranged, especially after dark. Keep phones and jewelry low-key in traffic. Tell someone your hotel and your rough plan for the day.',
          'Give the ride to LOS more time than the map suggests. Missing the flight because of Third Mainland traffic is a common, avoidable mistake.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Land and stop',
        text: 'Clear LOS, meet the transfer you booked, and go to the Island or Ikeja base you chose. Eat nearby. Do not schedule a second neighborhood on arrival night.',
      },
      {
        day: 'Day 2 — One side of the city',
        text: 'Pick either Lekki (conservation centre, and a beach or gallery if the drive allows) or Lagos Island. Do not try both. Traffic is the itinerary.',
      },
      {
        day: 'Day 3 — The other errand, then the airport',
        text: 'Use the morning for one nearby stop, Freedom Park if you are already on the Island, then leave for LOS with a wide buffer. A “quick” mainland crossing is how people miss flights.',
      },
    ],
    faqs: [
      {
        question: 'Is there a nonstop flight from Houston to Lagos?',
        answer:
          'The Houston to Lagos flight guide says there is no regularly scheduled nonstop, and to plan on one stop from IAH. Check that page, then compare current itineraries before you book.',
      },
      {
        question: 'Should I stay near the airport or on Victoria Island?',
        answer:
          'Stay near the airport for a short overnight. Stay on Victoria Island or Ikoyi if your days are on the Island. Lekki only makes sense when your plans are already there. Crossing the lagoons can take a large part of the day.',
      },
      {
        question: 'Do I need a car in Lagos?',
        answer:
          'Most first trips do not. A prebooked airport ride and ride-hailing cover a short visit. A rental does not skip the traffic.',
      },
      {
        question: 'Where do I check entry rules?',
        answer:
          'The US State Department Nigeria page, the CDC travel page, and the Nigerian mission for your passport. This guide does not list visa fees, stay lengths, or vaccine rules as facts.',
      },
    ],
    related: [
      { href: '/houston-to-lagos-flights', label: 'Houston to Lagos flights' },
      { href: '/africa', label: 'Africa travel hub' },
      { href: '/guides/cape-town', label: 'Cape Town travel guide' },
      { href: '/guides/cancun', label: 'Cancun travel guide' },
    ],
    stay: STAY22_GUIDE_LINKS.lagos,
    partners: withHoustonFlights(lagosPartners, 'LOS'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Nigeria.html',
        label: 'US State Department: Nigeria',
      },
      {
        href: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/nigeria',
        label: 'CDC travel page: Nigeria',
      },
    ],
  },
  {
    slug: 'cape-town',
    path: '/guides/cape-town',
    title: 'Cape Town Travel Guide | TourWiseAI',
    description:
      'Plan Cape Town by season: City Bowl and Atlantic bases, Table Mountain weather, the peninsula, and a simple 3-day outline.',
    h1: 'Cape Town Travel Guide',
    lede:
      'Cape Town rewards a loose plan. Wind closes the mountain cableway, the peninsula is a full day, and the neighborhood you sleep in changes how much of the trip you spend in a car.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'November through March is summer: warmer water, longer days, and the busiest beaches. The south-easterly wind, the Cape Doctor, can still shut the cableway and make the Atlantic side feel harsh.',
          'June through August is winter: cooler, wetter on the peninsula, and quieter. People come then for greener hills and for whales along the coast. Sightings are not guaranteed.',
          'Table Mountain is a weather decision, not a calendar one. Check the cableway status the morning you go, and keep a backup that does not depend on the summit.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'You land at Cape Town International (CPT), east of the city. A prebooked transfer is the simplest handoff into town. In light traffic the City Bowl is a short ride. Rush hour is not.',
          'Houston does not have a dedicated Cape Town flight page on this site. Travelers from IAH usually connect. Compare the whole itinerary, and leave a long connection if the tickets are separate. TourWiseAI does not sell the flight.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'MyCiTi buses cover parts of the central city, the airport corridor, and some of the Atlantic seaboard. They are useful inside that network. They are not how you do a Cape Point day.',
          'Ride-hailing works for evenings in town. A rental car is the practical tool for the Cape Peninsula, Chapman’s Peak, and the winelands. People drive on the left. Do not plan the peninsula and a wine valley on the same day unless you enjoy rushing.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'Areas only. No property on this page is a recommendation.',
          'The City Bowl and Gardens put you under the mountain and within walking distance of the center. Trails start nearby. Hills are real.',
          'The V&A Waterfront is a contained harbor area. It is an easy first night and a simple place to eat. It is not a residential neighborhood.',
          'Sea Point has a promenade and a more everyday street life, still close to town. Camps Bay faces the beach and sits farther out. It is windy, and trips back to the center take longer than the map suggests.',
        ],
      },
      {
        heading: 'Things to do',
        bullets: [
          'Table Mountain by cableway, or a hike such as Platteklip if the weather is settled and you are fit. Turn around if cloud is dropping. The mountain is not a casual add-on in a gale.',
          'A walk through Bo-Kaap. Keep it respectful: people live there.',
          'One full day on the Cape Peninsula toward Cape Point. Stop early and often. The point is the coast, not a single photo.',
          'Kirstenbosch gardens when you want a slower afternoon.',
          'Robben Island when the ferry is running. Tickets and weather both cancel departures. Book ahead and have another plan.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'A travel eSIM installed before you fly covers maps at the curb and the MyCiTi or ride-hail handoff. You do not need to buy a SIM from the first counter you see.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Confirm entry rules on the US State Department South Africa page and with South African authorities before you pay for a fare you cannot change. This guide does not list visa types or fees.',
          'Keep phones in a pocket on busy streets and in parked cars. At night, use a ride rather than a long walk between districts you do not know.',
          'On the mountain and the peninsula, weather is the safety issue. Wind, wet rock, and a late start cause more ruined days than a tight schedule does.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Land and stay central',
        text: 'Transfer in, drop bags in the City Bowl, Gardens, or the Waterfront, and keep the evening on foot nearby. Bo-Kaap works if you still have daylight and energy. Skip the peninsula.',
      },
      {
        day: 'Day 2 — Mountain, then a garden or the promenade',
        text: 'Go up Table Mountain in the morning if the cableway or the hike is actually open. If it is closed, swap in Kirstenbosch or a Sea Point walk and try the mountain the next clear morning.',
      },
      {
        day: 'Day 3 — One long loop',
        text: 'Choose either the Cape Peninsula or Robben Island, not both. End with enough time to return the car or reach CPT without a last-minute dash.',
      },
    ],
    faqs: [
      {
        question: 'Do I need a car in Cape Town?',
        answer:
          'Not for a Waterfront and City Bowl trip. You do want one, or a driver, for Cape Point and the winelands. MyCiTi and ride-hailing cover a lot of the central city.',
      },
      {
        question: 'What if Table Mountain is closed?',
        answer:
          'Wind and cloud shut the cableway often. Treat the summit as optional. Kirstenbosch, Bo-Kaap, and the peninsula still work on a windy day, though the coast road can feel exposed.',
      },
      {
        question: 'How do I get from CPT into town?',
        answer:
          'A prebooked transfer is the simplest arrival. MyCiTi also serves the airport. Build extra time if you land in the evening rush.',
      },
      {
        question: 'Where do I verify entry rules?',
        answer:
          'The US State Department South Africa page and official South African government sources. Do not rely on a guide, including this one, for a visa decision.',
      },
    ],
    related: [
      { href: '/africa', label: 'Africa travel hub' },
      { href: '/africa/destinations/south-africa-cape-town', label: 'Cape Town destination note' },
      { href: '/guides/lagos', label: 'Lagos travel guide' },
      { href: '/guides/cancun', label: 'Cancun travel guide' },
    ],
    stay: STAY22_GUIDE_LINKS['cape-town'],
    partners: withHoustonFlights(capeTownPartners, 'CPT'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/SouthAfrica.html',
        label: 'US State Department: South Africa',
      },
    ],
  },
  {
    slug: 'london',
    path: '/guides/london',
    title: 'London Travel Guide from Houston | TourWiseAI',
    description:
      'Plan London from Houston: seasons, Heathrow and City bases, getting around, eSIM tips, and a simple 3-day outline.',
    h1: 'London Travel Guide',
    lede:
      'A calm outline for US travelers, especially from Houston. It covers when the city feels different, how people actually move between neighborhoods, and what to sort before you fly. Live tickets stay on partner sites.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'Late spring and early autumn are the usual shoulder windows for milder days and slightly lighter museum queues. Summer brings longer evenings and denser crowds at the big sights. Winter is shorter on daylight and wetter. It suits theater, museums, and indoor markets more than a park-heavy plan.',
          'Public holidays and school breaks change how busy central London feels. If your trip is short, pick one cluster of neighborhoods and leave the rest for another visit.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'Most long-haul flights from Houston use George Bush Intercontinental (IAH) and arrive at Heathrow (LHR). Gatwick, Stansted, and London City show up on some connecting itineraries. The Houston to London flight guide is the place to compare routing ideas. Then check the live itinerary on a flight search partner before you book.',
          'Build time after landing for immigration, bags, and the ride into town. A tight evening plan on arrival night is how people start a trip tired.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'Within Zones 1 and 2, the Underground, Overground, Elizabeth line, buses, and walking cover most visitor days. Contactless bank cards and mobile wallets work on Transport for London gates for most travelers. Confirm your card works before you rely on it.',
          'A prebooked airport transfer is the simplest handoff after a long flight, especially with luggage or a late arrival. Trains and the Elizabeth line are efficient when you know which station your lodging is near. A rental car is rarely the right tool for a first central London trip. Parking and the Congestion Charge make driving a local skill.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'These are areas, not hotel recommendations.',
          'Westminster and the South Bank put you near major landmarks on foot. The walks between them are longer than a map suggests.',
          'South Kensington and Kensington suit museum days (Natural History, Science, and the V&A) and quieter residential streets.',
          'Covent Garden, Soho, and Fitzrovia are convenient for theaters and restaurants, and noisier at night.',
          'Shoreditch and East London work if your days lean toward markets and contemporary neighborhoods rather than palace sightseeing.',
          'Pick a base near the places you will visit twice. Crossing the city for every meal costs more time than the Tube map implies.',
        ],
      },
      {
        heading: 'Things to do',
        paragraphs: [
          'A first trip does not need every landmark. Choose one major ticketed site per day and leave open time for walking.',
        ],
        bullets: [
          'A Westminster loop: Parliament, the Westminster Abbey exterior or interior if you booked ahead, and a South Bank walk.',
          'One museum morning: the British Museum, the National Gallery, or a South Kensington museum. Not all three.',
          'The Tower of London if history is the priority. Arrive early and leave a buffer for security.',
          'A neighborhood afternoon in Covent Garden, Borough Market, or a park (Hyde Park or Regent’s Park) when the weather cooperates.',
          'An evening theater or a simple dinner reservation. Last-minute West End tickets are a gamble on popular shows.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Install a travel eSIM before you fly if your phone supports one. You then have data for maps, Transport for London journey planning, and the transfer driver as soon as you leave the terminal. Airport SIM counters are optional.',
        ],
      },
      {
        heading: 'Insurance and buffers',
        paragraphs: [
          'Long-haul itineraries benefit from trip cover you actually understand. Medical, delay, and cancellation rules differ by policy. Compare options before you pay for nonrefundable tickets or tours. This guide does not recommend a specific policy.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Entry rules for the UK change. Before you buy a nonrefundable ticket, read the US Department of State United Kingdom page and the official UK government guidance for your nationality. This guide does not state a visa length or a fee.',
          'Use the same habits you would in any large city: keep phones secure on crowded trains, agree the ride before you get into an unmarked car, and leave bag rules to each museum’s own site.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Arrive and stay central',
        text: 'Land, take the transfer or train you planned, drop bags, and keep the evening within walking distance of your base. Skip a second borough on arrival night.',
      },
      {
        day: 'Day 2 — One major site and a neighborhood',
        text: 'Book one ticketed highlight for the morning. Use the afternoon for a nearby neighborhood walk and an early dinner. Do not stack the Tower and a full museum day.',
      },
      {
        day: 'Day 3 — Museums or parks, then buffer',
        text: 'Choose either a museum morning or a park and market loop. Leave a wide buffer before your ride back to the airport. Heathrow lines are not a last-minute errand.',
      },
    ],
    faqs: [
      {
        question: 'Is Heathrow the only London airport from Houston?',
        answer:
          'Heathrow is the most common long-haul arrival from IAH. Some connecting tickets use Gatwick or other airports. Compare the full itinerary, including the ground transfer, not only the flight time.',
      },
      {
        question: 'Do I need a rental car?',
        answer:
          'For a central London trip, no. Transit and walking cover most first visits. A car makes more sense for day trips outside the city if you are comfortable driving on the left.',
      },
      {
        question: 'Where do I check entry rules?',
        answer:
          'Official UK government pages and the US State Department United Kingdom page. Do not rely on a guide, including this one, for an immigration decision.',
      },
    ],
    related: [
      { href: '/houston-to-london-flights', label: 'Houston to London flights' },
      { href: '/cheap-flights-from-houston', label: 'Cheap flights from Houston' },
      { href: '/travel-esim', label: 'Travel eSIM' },
      { href: '/airport-transfers', label: 'Airport transfers' },
      { href: '/guides', label: 'Guides hub' },
    ],
    stay: STAY22_GUIDE_LINKS.london,
    partners: withHoustonFlights(londonPartners, 'LON'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/UnitedKingdom.html',
        label: 'US State Department: United Kingdom',
      },
      { href: 'https://www.gov.uk/visit-uk', label: 'UK government: visit the UK' },
    ],
  },
  {
    slug: 'paris',
    path: '/guides/paris',
    title: 'Paris Travel Guide from Houston | TourWiseAI',
    description:
      'Plan Paris from Houston: seasons, Right Bank and Left Bank bases, Metro tips, eSIM, and a simple 3-day outline.',
    h1: 'Paris Travel Guide',
    lede:
      'A practical outline for US travelers, especially from Houston. It covers when the city feels different, how neighborhoods relate on foot, and what to sort before you fly. Live tickets stay on partner sites.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'Spring and early autumn are the usual shoulder seasons for milder weather and slightly calmer museum lines. Summer brings longer days and denser crowds around the Seine landmarks. Winter is quieter outdoors and better for indoor museums and cafés. Daylight is short.',
          'Major holidays and fashion or sports weeks can fill central hotels. For a short first trip, one or two arrondissements as a base beats a checklist of every landmark.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'Flights from Houston typically leave IAH and arrive at Paris Charles de Gaulle (CDG). Orly appears on some connecting itineraries. The Houston to Paris flight guide covers routing ideas. Compare the live itinerary before you lock a booking.',
          'A prebooked transfer or a clear RER and Metro plan to your station saves the first hour after a long flight. Have the address of where you are staying in French and English.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'The Metro and RER cover the city and the airports. Walking between nearby arrondissements is often faster than a multi-transfer Metro hop. Buses fill gaps when stations are far apart.',
          'A rental car is a poor fit for a first central Paris trip. Day trips outside the city are a separate decision. If you rent, start outside the densest core and confirm parking at your lodging.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'Areas only. No property on this page is a recommendation.',
          'The Louvre, Rivoli, and the Marais put you near major museums and walkable streets, with tourist density to match.',
          'Saint-Germain and the Latin Quarter suit Left Bank walks, bookshops, and river crossings on foot.',
          'The Opera and the Grands Boulevards are convenient for department stores and transit hubs.',
          'The 7th, near the Eiffel Tower, works if that skyline is your priority. Other sights then take longer on transit.',
          'Stay where you will return each evening. Crossing Paris for every meal adds fatigue faster than the map suggests.',
        ],
      },
      {
        heading: 'Things to do',
        paragraphs: [
          'Pick one major ticketed site per day. Book timed entries when the venue offers them.',
        ],
        bullets: [
          'A Louvre or Musée d’Orsay morning. Not both on the same short day.',
          'A Seine walk: Île de la Cité, the Notre-Dame exterior, and a bridge loop without stacking every church.',
          'A Marais or Saint-Germain afternoon for streets, cafés, and smaller museums.',
          'The Eiffel Tower area or Trocadéro views. Summit tickets sell out and queues vary. Have a ground-level plan if timed entry is full.',
          'One evening reservation. Popular restaurants book ahead in peak months.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Set up a travel eSIM before you fly if your phone supports one. Data at the curb covers maps, Metro apps, and your transfer. You do not need the first SIM counter you see at CDG.',
        ],
      },
      {
        heading: 'Insurance and buffers',
        paragraphs: [
          'Compare travel insurance before nonrefundable museum tickets or tours. Policies differ on medical cover abroad and on trip interruption. This page does not pick a product for you.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Confirm entry rules on the US State Department France page and official French government sources for your nationality before you buy a booking you cannot change. This guide does not list visa types or fees.',
          'Use normal big-city habits: watch bags on the Metro, avoid unmarked rides, and keep phones secure in crowded tourist spots.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Land and stay nearby',
        text: 'Transfer in, drop bags, and keep the evening to a short walk and a simple meal. Skip a second major museum on arrival day.',
      },
      {
        day: 'Day 2 — One museum and one neighborhood',
        text: 'Timed museum entry in the morning. Afternoon in the Marais or Saint-Germain. Early dinner near your base.',
      },
      {
        day: 'Day 3 — River landmarks or tower views',
        text: 'Choose either a Seine and Île de la Cité loop or an Eiffel Tower area visit. Do not rush a stack of both with a late airport dash. Leave a wide buffer for CDG.',
      },
    ],
    faqs: [
      {
        question: 'CDG or Orly from Houston?',
        answer:
          'Most Houston itineraries use CDG. Confirm the airport on your ticket and plan the ground transfer to match the station nearest your lodging.',
      },
      {
        question: 'Do I need a museum pass?',
        answer:
          'Only if your plan has several paid museums on consecutive days. For one or two sites, single timed tickets are often simpler. Check each venue’s own site.',
      },
      {
        question: 'Where do I verify entry rules?',
        answer:
          'The US State Department France page and official French sources. Do not treat a blog as immigration advice.',
      },
    ],
    related: [
      { href: '/houston-to-paris-flights', label: 'Houston to Paris flights' },
      { href: '/cheap-flights-from-houston', label: 'Cheap flights from Houston' },
      { href: '/things-to-do', label: 'Things to do' },
      { href: '/travel-esim', label: 'Travel eSIM' },
      { href: '/guides', label: 'Guides hub' },
    ],
    stay: STAY22_GUIDE_LINKS.paris,
    partners: withHoustonFlights(parisPartners, 'PAR'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/France.html',
        label: 'US State Department: France',
      },
    ],
  },
  {
    slug: 'rome',
    path: '/guides/rome',
    title: 'Rome Travel Guide from Houston | TourWiseAI',
    description:
      'Plan Rome from Houston: seasons, centro storico bases, Vatican timing, getting around, and a simple 3-day outline.',
    h1: 'Rome Travel Guide',
    lede:
      'Rome rewards a short list and comfortable shoes. The historic center is walkable in pieces, the Vatican is its own half-day, and the neighborhood you sleep in decides how much of the trip you spend in a taxi.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'Spring and autumn are the usual shoulder seasons for milder walking weather. Summer is hot, crowded at the Colosseum and Vatican, and better for early starts. Winter is quieter outdoors. Some hours of daylight are short, and rain is possible.',
          'If faith sites are your priority, see also the Vatican and Christian Rome guide on this site. This page stays a general city outline.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'You fly into Rome Fiumicino (FCO) on most long-haul itineraries. Ciampino (CIA) appears on some European connections. From Houston, compare current options on the Houston to Rome flight guide. Schedules change by season.',
          'A prebooked transfer into the centro is the simplest arrival after a long flight. Trains from FCO work when you know which station is closest to your lodging.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'Much of the historic center is best on foot. The Metro has limited coverage inside the centro. Buses and trams fill gaps. Taxis and ride-hailing help for hills, late nights, or the hop between the Vatican and the Colosseum when you are already tired.',
          'A rental car is rarely useful inside the limited traffic zone (ZTL). Day trips outside Rome are a different plan. If you rent, pick up outside the tightest historic streets.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'Districts only. No property on this page is a recommendation.',
          'The centro storico, around the Pantheon, Navona, and Campo de’ Fiori, puts landmarks on foot and stays busy late into the evening.',
          'Trastevere is across the river: lively dinners, and a longer walk or a bus to the Colosseum.',
          'A base near the Vatican suits a pilgrimage-focused trip. Other ancient sites then take transit time.',
          'Monti and Esquilino sit closer to Termini and the Colosseum side of town.',
          'Choose the base that matches the half of the city you will visit twice.',
        ],
      },
      {
        heading: 'Things to do',
        paragraphs: [
          'Book timed entries for the Colosseum and Vatican Museums when they are offered. One major site per morning is enough.',
        ],
        bullets: [
          'The Colosseum and Roman Forum area. Leave a full morning. Do not add the Vatican the same day.',
          'The Vatican Museums and St. Peter’s. Treat them as a half-day with security lines. Dress codes apply for the basilica.',
          'A centro walk: the Pantheon, Piazza Navona, and the Trevi Fountain. Expect crowds. Go early or late.',
          'A Trastevere evening for dinner streets, or a quieter afternoon in a park such as Villa Borghese if you need shade.',
          'For a faith-focused day order, use the Christian Rome itinerary on this site.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Install a travel eSIM before you fly. You will want data for maps, translation, and the driver at FCO. Airport SIM counters are optional.',
        ],
      },
      {
        heading: 'Insurance and buffers',
        paragraphs: [
          'Summer heat and long museum lines make medical and trip cover worth reading carefully. Compare policies before nonrefundable tickets. This guide does not endorse a specific plan.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Confirm entry rules on the US State Department Italy page and official Italian sources for your nationality. This guide does not state visa fees or stay lengths.',
          'Pickpockets work crowded Metro cars and tourist piazzas. Keep bags closed and phones secure. At night, use a known ride between neighborhoods you do not know on foot.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Arrive and a centro evening',
        text: 'Transfer in, drop bags, and stay near your base for a short walk and dinner. Skip the Colosseum on arrival day.',
      },
      {
        day: 'Day 2 — Ancient Rome',
        text: 'Colosseum and Forum in the morning. Afternoon rest or a nearby neighborhood. Early dinner.',
      },
      {
        day: 'Day 3 — Vatican or centro',
        text: 'Choose either the Vatican half-day or a lighter centro and Pantheon loop. Not both before a flight. Leave a wide buffer for FCO.',
      },
    ],
    faqs: [
      {
        question: 'How do I combine this with the Vatican faith pages?',
        answer:
          'Use this guide for flights, neighborhoods, and pacing. Use the Vatican Christian guides for pilgrimage-specific sequencing and site context.',
      },
      {
        question: 'Do I need a car in Rome?',
        answer:
          'Not for a centro-focused trip. Transit, walking, and occasional taxis cover most first visits.',
      },
      {
        question: 'Where do I check entry rules?',
        answer:
          'The US State Department Italy page and official Italian government sources. Do not rely on a guide, including this one, for an immigration decision.',
      },
    ],
    related: [
      { href: '/houston-to-rome-flights', label: 'Houston to Rome flights' },
      { href: '/vatican-rome-christian-travel-guide', label: 'Vatican Rome Christian travel guide' },
      { href: '/vatican-rome-christian-itinerary', label: 'Vatican Rome Christian itinerary' },
      { href: '/christian-travel/destinations/vatican-rome', label: 'Vatican and Rome destination note' },
      { href: '/guides', label: 'Guides hub' },
    ],
    stay: STAY22_GUIDE_LINKS.rome,
    partners: withHoustonFlights(romePartners, 'ROM'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Italy.html',
        label: 'US State Department: Italy',
      },
    ],
  },
  {
    slug: 'dubai',
    path: '/guides/dubai',
    title: 'Dubai Travel Guide from Houston | TourWiseAI',
    description:
      'Plan Dubai from Houston: cooler months, Marina and Downtown bases, metro vs transfer, eSIM, and a simple 3-day outline.',
    h1: 'Dubai Travel Guide',
    lede:
      'Dubai is spread out. The neighborhood you sleep in, the month you visit, and whether you prebook the airport ride matter more than a long landmark list.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'November through March is the usual cooler window for outdoor days and desert evenings. Summer is very hot. Outdoor plans shrink to early morning and late night, and many visitors lean on malls, pools, and indoor attractions.',
          'Holiday weeks around Christmas–New Year and major local holidays fill hotels. For a first short trip, pick one coastal base and one inland outing rather than every tower on the skyline.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'You land at Dubai International (DXB) on most itineraries. Al Maktoum (DWC) appears on some flights. Confirm the airport on your ticket. The Houston to Dubai flight guide is the starting point for routing ideas. Then compare the live itinerary.',
          'A prebooked transfer is the calmest arrival after a long haul. Have the hotel address ready. An Arabic copy helps if you have one.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'The Metro covers a useful spine along Sheikh Zayed Road and parts of the Marina and Downtown corridors. It does not replace a car or taxi for every beach or desert plan.',
          'Ride-hailing and taxis are widely used. A rental car helps if your days leave the Metro map. Driving is on the right, and parking rules vary by mall and beach. For a short first visit based on Metro-linked areas, transfers plus the Metro often suffice.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'Areas only. No property on this page is a recommendation.',
          'Downtown Dubai suits Burj Khalifa views, Dubai Mall, and fountain evenings. It is busy, and it is a common first-timer base.',
          'Dubai Marina and JBR are coastal and walkable along the waterfront. They sit farther from historic Dubai.',
          'Business Bay sits near Downtown with a slightly different skyline feel.',
          'Historic Dubai, around the Creek and Al Fahidi, suits heritage walks. Modern beaches then take a ride.',
          'Stay where your evenings will be. Crossing the city at rush hour is not a quick hop.',
        ],
      },
      {
        heading: 'Things to do',
        bullets: [
          'A Downtown evening: the mall, the fountain, and exterior tower views. Summit tickets are timed and sell out. Have a ground-level plan.',
          'Historic Dubai: a Creek crossing and the Al Fahidi streets, with heat and local dress norms in mind.',
          'One desert evening outing if weather and energy allow. Book a reputable operator and treat it as a half-day, not a filler between malls.',
          'Beach time at JBR or another public beach your lodging recommends. Swim where conditions are posted.',
          'Indoor options such as museums and mall attractions for hot afternoons.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Install a travel eSIM before you fly. Data at the curb covers maps, ride-hail, and Metro apps. Airport SIM desks are optional.',
        ],
      },
      {
        heading: 'Insurance and buffers',
        paragraphs: [
          'Desert outings, water activities, and long-haul tickets are good reasons to read a travel insurance policy before you pay. Compare cover. This page does not pick one.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Confirm entry rules on the US State Department United Arab Emirates page and official UAE sources for your nationality. This guide does not state visa types or fees.',
          'Local laws and dress expectations in public and at religious sites differ from many US cities. Read current guidance before you travel. Use licensed transport and keep valuables secure in crowded malls.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Land and stay near your base',
        text: 'Transfer in, rest, and keep the evening local to Downtown or the Marina, whichever you chose. Skip the desert on arrival night.',
      },
      {
        day: 'Day 2 — City icons',
        text: 'Downtown or the historic Creek in the cooler parts of the day. Indoor time during peak heat. An early evening fountain or waterfront walk.',
      },
      {
        day: 'Day 3 — Desert or beach, then buffer',
        text: 'Choose either a desert outing or a beach day. Not both before a long flight home. Leave a wide buffer for DXB.',
      },
    ],
    faqs: [
      {
        question: 'Is Dubai walkable?',
        answer:
          'Within Marina and JBR, or within parts of Downtown, yes in the cooler months. Between districts, plan the Metro, a taxi, or a transfer.',
      },
      {
        question: 'Do I need a car?',
        answer:
          'Not for a Metro-linked Downtown or Marina trip. A car helps for scattered beach and desert plans if you are comfortable driving.',
      },
      {
        question: 'Where do I verify entry rules?',
        answer:
          'The US State Department UAE page and official UAE government sources. Do not rely on a guide, including this one, for an immigration decision.',
      },
    ],
    related: [
      { href: '/houston-to-dubai-flights', label: 'Houston to Dubai flights' },
      { href: '/cheap-flights-from-houston', label: 'Cheap flights from Houston' },
      { href: '/things-to-do', label: 'Things to do' },
      { href: '/travel-esim', label: 'Travel eSIM' },
      { href: '/guides', label: 'Guides hub' },
    ],
    stay: STAY22_GUIDE_LINKS.dubai,
    partners: withHoustonFlights(dubaiPartners, 'DXB'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/UnitedArabEmirates.html',
        label: 'US State Department: United Arab Emirates',
      },
    ],
  },
  {
    slug: 'accra',
    path: '/guides/accra',
    title: 'Accra, Ghana Travel Guide from Houston | TourWiseAI',
    description:
      'Plan Accra from Houston: dry season timing, Airport and Osu bases, transfers, eSIM, and a simple 3-day outline with Cape Coast as optional.',
    h1: 'Accra Travel Guide',
    lede:
      'Accra is a coastal capital with distinct neighborhoods, not a single downtown strip. Most first trips from the US, including Houston, go more smoothly when you pick one base, prebook the airport ride, and leave room for traffic.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'November through March is generally the drier stretch many visitors prefer for outdoor days. Rainier periods can slow traffic that is already heavy. Harmattan dust can appear in the drier months. Pack with air quality and heat in mind either way.',
          'Holiday travel around Christmas and major local celebrations fills flights on the Houston corridor. Read the Houston to Accra flight guide for routing context, then compare live itineraries.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'International flights use Kotoka International Airport (ACC). From Houston, plan on a connecting itinerary. Confirm current options on the flight guide and a flight search partner. A short connection on a trip this long is a gamble. Prefer one ticket when you can.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'Traffic defines the day. Distance on a map is not the time in the car. Put the airport pickup and the return to ACC on the plan before you stack museums and beach time.',
          'Many visitors use a prebooked transfer or ride-hailing. Tro-tros are the everyday shared network. They are crowded and not the simplest choice on a first afternoon with luggage. A rental car does not remove traffic. Arranged rides are the simpler default for a short first visit.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'Districts only. No property on this page is a recommendation.',
          'Airport Residential and other areas near ACC suit late arrivals and early departures.',
          'Osu and Labone are common visitor bases for restaurants and a central feel. You still need rides between errands.',
          'Cantonments and the streets nearby skew residential and sit close to many embassies.',
          'Coastal stretches toward the west fit beach-focused days. Confirm the ride time back into central Accra at rush hour before you choose that base.',
          'Stay where your evenings will be. Crossing the city twice a day for meals is how short trips feel longer than they are.',
        ],
      },
      {
        heading: 'Things to do',
        bullets: [
          'Kwame Nkrumah Memorial Park, or a comparable history stop. Check opening hours for your day.',
          'The Independence Square and Black Star Gate area as an orientation walk, with heat and sun in mind.',
          'Arts and markets: the Artists Alliance gallery or a comparable space. Makola is intense. Go with a local tip if it is your first market day.',
          'Beach time at a specific beach your host recommends. Conditions and facilities vary.',
          'An optional day toward Cape Coast and Elmina for the castles and coastal history. Treat it as a full day with an early start, not a half-day add-on. Confirm current site rules before you go.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Set up a travel eSIM, or confirm roaming, before you land. You will want data for the driver and for traffic. Carry a payment backup. Do not depend on a single airport ATM.',
        ],
      },
      {
        heading: 'Insurance and buffers',
        paragraphs: [
          'Medical cover abroad and trip interruption matter on a long-haul trip. Compare policies before nonrefundable tickets. This guide does not choose one for you.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Do not treat visa, yellow-fever, or passport rules on a blog as current. Read the US State Department Ghana page and the CDC travel page, then confirm the rule for your nationality with the Ghanaian mission that handles your passport. This site’s Ghana passport and visa hubs are for navigation. Still verify on official sources before you buy.',
          'Use transport you arranged, especially after dark. Keep phones low-key in traffic. Tell someone your hotel and a rough plan for the day. Give the ride to ACC more time than the map suggests.',
        ],
      },
    ],
    itinerary: [
      {
        day: 'Day 1 — Land and stop',
        text: 'Clear ACC, meet the transfer you booked, and go to your base. Eat nearby. Do not schedule Cape Coast on arrival day.',
      },
      {
        day: 'Day 2 — Accra core',
        text: 'One history stop and one neighborhood or gallery. Keep the afternoon flexible for heat and traffic.',
      },
      {
        day: 'Day 3 — Beach or Cape Coast, then buffer',
        text: 'Either a local beach afternoon or an early Cape Coast day. Not both before an evening flight. Leave a wide buffer for ACC.',
      },
    ],
    faqs: [
      {
        question: 'Is there a nonstop from Houston to Accra?',
        answer:
          'Plan on a connection. Check the Houston to Accra flight guide and live itineraries. Do not assume a nonstop exists because another city pair has one.',
      },
      {
        question: 'Should I stay near the airport?',
        answer:
          'Only for a short overnight. Stay in Osu, Labone, or a similar district if your days are in the city. A beach base only makes sense when your plans are already there.',
      },
      {
        question: 'Where do I check entry and health rules?',
        answer:
          'The US State Department Ghana page, the CDC travel page, and the Ghanaian mission for your passport. This guide does not list visa fees or vaccine rules as facts.',
      },
    ],
    related: [
      { href: '/houston-to-accra-flights', label: 'Houston to Accra flights' },
      { href: '/africa', label: 'Africa travel hub' },
      { href: '/passports/ghana', label: 'Ghana passports' },
      { href: '/visas/ghana', label: 'Ghana visas' },
      { href: '/guides', label: 'Guides hub' },
    ],
    stay: STAY22_GUIDE_LINKS.accra,
    partners: withHoustonFlights(accraPartners, 'ACC'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Ghana.html',
        label: 'US State Department: Ghana',
      },
      {
        href: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/ghana',
        label: 'CDC travel page: Ghana',
      },
    ],
  },
  {
    slug: 'kenya',
    path: '/guides/kenya',
    title: 'Kenya Safari Planning Guide | TourWiseAI',
    description:
      'Plan a Kenya safari: dry-season timing, Nairobi arrival, park pacing, flights from the US/Houston, eSIM, and a simple outline.',
    h1: 'Kenya Safari Planning Guide',
    lede:
      'A Kenya trip is usually Nairobi plus one or two park bases, not a city sightseeing loop. Pacing, season, and how you move between parks matter more than a long animal checklist.',
    sections: [
      {
        heading: 'When to go',
        paragraphs: [
          'The classic dry window many safari planners prefer runs from the middle of the year into early autumn, when vegetation is thinner and animals often gather near water. Wildlife movement, including any migration timing in the Maasai Mara, changes by year. Treat a “migration month” claim as orientation, not a guarantee.',
          'Greener months can still be excellent for certain parks and can mean fewer vehicles. Rain can make some roads slower. Pick the season that matches your comfort with heat, dust, and mud, then book lodges and flights that fit that choice.',
          'For broader Africa context, see the Kenya safari hub and the safari planning post already on this site.',
        ],
      },
      {
        heading: 'How to get there',
        paragraphs: [
          'International flights use Jomo Kenyatta International Airport (NBO) in Nairobi. From Houston and most of the US, expect a connecting itinerary. Compare the whole journey, including the layover. Separate tickets on a trip this long are risky.',
          'A domestic flight or a long road transfer then takes you toward the Maasai Mara, Amboseli, or another reserve. Build a buffer night in Nairobi if you land late and have an early bush flight.',
          'TourWiseAI does not sell the safari package. Use flight and activity partners for live inventory.',
        ],
      },
      {
        heading: 'Getting around',
        paragraphs: [
          'In Nairobi, a prebooked transfer is the simplest airport handoff. Ride-hailing works in parts of the city. Do not treat a night walk between unfamiliar districts as the default.',
          'Between parks, most visitors use a scheduled safari flight or a driver arranged by a lodge or operator. Driving yourself on a first safari is a specialist choice, not the default for a short US trip. If you compare a rental for Nairobi only, confirm parking and security at your lodging.',
        ],
      },
      {
        heading: 'Where to stay',
        paragraphs: [
          'Bases, not property picks.',
          'Nairobi is for arrival, departure, and any single city stop. It is usually one night at each end, not the heart of the safari.',
          'The Maasai Mara area is the classic savannah base. Treat the transfers in and out as part of the itinerary.',
          'The Amboseli area is known for elephant-focused drives and views toward Kilimanjaro on clear days. Visibility is not guaranteed.',
          'Other reserves, for example Laikipia or Tsavo, suit travelers with more days. Do not stack three parks into a short first trip unless you enjoy airports.',
        ],
      },
      {
        heading: 'Things to do',
        bullets: [
          'Game drives at dawn and late afternoon, when lodges schedule them. Midday is often rest time for a reason.',
          'One cultural visit only if a lodge or a known operator arranges it. Skip rushed roadside stops.',
          'In Nairobi, one city highlight if your buffer night allows. Do not give up park time for a packed city list.',
          'The Big Five explainer on this site is vocabulary only. Sightings are never promised.',
        ],
      },
      {
        heading: 'Connectivity and eSIM',
        paragraphs: [
          'Install a travel eSIM before you fly. Coverage in the parks is uneven. Download offline maps and lodge contacts while you still have a strong signal in Nairobi. Airport SIM counters are optional.',
        ],
      },
      {
        heading: 'Insurance and buffers',
        paragraphs: [
          'Safari travel pairs well with medical and evacuation cover you have actually read. Compare policies before you pay deposits. This guide does not recommend a specific insurer.',
        ],
      },
      {
        heading: 'Safety and entry',
        paragraphs: [
          'Confirm entry, passport, and health rules on the US State Department Kenya page and the CDC travel page, then with the Kenyan mission for your nationality. This guide does not list visa fees or vaccine rules as facts.',
          'Follow lodge guidance on walking after dark, vehicle safety, and distance from wildlife. Keep valuables secure in Nairobi traffic.',
        ],
      },
    ],
    itineraryHeading: 'A simple safari outline',
    itinerary: [
      {
        day: 'Arrival — Nairobi buffer',
        text: 'Land at NBO, transfer to your city lodging, and rest. Do not schedule a same-day bush flight after a long haul unless the timing is truly comfortable.',
      },
      {
        day: 'Parks — one reserve',
        text: 'Spend the middle of the trip in one reserve. Depth in one park is calmer than a rushed hop between parks on a first safari.',
      },
      {
        day: 'Return — buffer before the flight',
        text: 'Add a second park only if the trip is long enough for another transfer day. Otherwise return to Nairobi with time before the international flight.',
      },
    ],
    faqs: [
      {
        question: 'Can I safari from Houston in a long weekend?',
        answer:
          'Not realistically. Leave enough nights for the international flight, a Nairobi buffer, and at least a few park mornings.',
      },
      {
        question: 'Do I need a rental car?',
        answer:
          'Usually no for a lodge-based safari. Transfers and safari vehicles are part of the trip. A Nairobi-only rental is a separate, optional choice.',
      },
      {
        question: 'Where do I verify entry and health rules?',
        answer:
          'The US State Department Kenya page, the CDC travel page, and the Kenyan mission for your passport. This guide does not list visa fees or vaccine rules as facts.',
      },
    ],
    related: [
      { href: '/africa/destinations/kenya-safari', label: 'Kenya safari hub' },
      { href: '/africa', label: 'Africa travel hub' },
      { href: '/africa/blog/big-five-africa-guide', label: 'Big Five guide' },
      { href: '/africa/blog/africa-safari-planning-guide', label: 'Safari planning guide' },
      { href: '/cheap-flights-from-houston', label: 'Cheap flights from Houston' },
      { href: '/guides', label: 'Guides hub' },
    ],
    stay: STAY22_GUIDE_LINKS.kenya,
    partners: withHoustonFlights(kenyaPartners, 'NBO'),
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Kenya.html',
        label: 'US State Department: Kenya',
      },
      {
        href: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/kenya',
        label: 'CDC travel page: Kenya',
      },
    ],
  },
]

export function getDestinationGuide(slug: string) {
  return DESTINATION_GUIDES.find((guide) => guide.slug === slug) ?? null
}
