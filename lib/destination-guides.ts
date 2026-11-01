import { AFFILIATE_LINKS, type AffiliateLinkItem } from './affiliate-links'

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
  faqs: { question: string; answer: string }[]
  related: { href: string; label: string }[]
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
    partners: cancunPartners,
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
    partners: lagosPartners,
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
    partners: capeTownPartners,
    officialLinks: [
      {
        href: 'https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/SouthAfrica.html',
        label: 'US State Department: South Africa',
      },
    ],
  },
]

export function getDestinationGuide(slug: string) {
  return DESTINATION_GUIDES.find((guide) => guide.slug === slug) ?? null
}
