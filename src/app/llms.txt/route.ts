import { SITE_ORIGIN } from '@/lib/site'

export async function GET() {
  const origin = SITE_ORIGIN
  const content = `# TourWiseAI

> TourWiseAI is an AI-assisted travel planning website. It helps users build trip plans and compare partner booking options for flights, stays, tours and activities, airport transfers, travel eSIMs, car rentals, and travel insurance. Bookings are completed on third-party partner sites. TourWiseAI is not a travel agency and does not process flight or hotel payments directly.

TourWiseAI may earn a commission when users book through partner links, at no extra cost to the user. Details: ${origin}/affiliate-disclosure

## Core product pages
- ${origin}/ — Home / AI trip planner entry
- ${origin}/ai-travel-planner — AI travel planner
- ${origin}/cheap-flights — Cheap flights and route ideas
- ${origin}/travel-deals — Travel deals hub
- ${origin}/airport-transfers — Airport transfers
- ${origin}/travel-esim — Travel eSIM
- ${origin}/travel-insurance — Travel insurance
- ${origin}/things-to-do — Tours and activities
- ${origin}/cheap-flights-from-houston — Houston (IAH & HOU) flight guides

## Faith-based travel
- ${origin}/faith-travel — Faith travel hub
- ${origin}/christian-travel — Christian travel guides
- ${origin}/holy-land-tours-from-usa — Holy Land tours from the USA (planning guide)
- ${origin}/camino-de-santiago-planner — Camino de Santiago planner
- ${origin}/vatican-rome-christian-travel-guide — Vatican / Christian Rome guide
- ${origin}/vatican-rome-christian-itinerary — Rome and Vatican itinerary

## Destination guides
- ${origin}/guides — Cancun, Lagos, and Cape Town planning guides
- ${origin}/guides/cancun — Cancun travel guide, including Houston arrivals
- ${origin}/guides/lagos — Lagos, Nigeria travel guide
- ${origin}/guides/cape-town — Cape Town travel guide

## Destination hubs (on-site)
- ${origin}/africa
- ${origin}/budget
- ${origin}/luxury
- ${origin}/island-retreats
- ${origin}/usa-tours

## Travel documents
- ${origin}/passports
- ${origin}/visas
- ${origin}/embassies

## Company & legal
- ${origin}/about
- ${origin}/contact — don@tourwiseai.com
- ${origin}/privacy-policy
- ${origin}/terms
- ${origin}/affiliate-disclosure

## Partners named on the site
Aviasales (flights), Klook and Tiqets (tours/activities), Kiwitaxi (airport transfers), Airalo (eSIM), EKTA (travel insurance), Localrent (car rentals). Affiliate network mentioned: Travelpayouts. Booking.com is mentioned in the affiliate disclosure and privacy materials.

## Optional
- Sitemap: ${origin}/sitemap.xml
- Blog: ${origin}/blog
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
