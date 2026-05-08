export async function GET() {
  const content = `TourWiseAI is an AI-assisted travel planning platform focused on itinerary building, route planning, and travel essentials.
It helps users plan trips and compare partner booking options for flights, transfers, tours, eSIM, and insurance.

Public pages:
https://tourwiseai.com/
https://tourwiseai.com/ai-travel-planner
https://tourwiseai.com/cheap-flights
https://tourwiseai.com/travel-deals
https://tourwiseai.com/travel-esim
https://tourwiseai.com/airport-transfers
https://tourwiseai.com/travel-insurance
https://tourwiseai.com/things-to-do
https://tourwiseai.com/holy-land-tours-from-usa
https://tourwiseai.com/camino-de-santiago-planner
https://tourwiseai.com/vatican-rome-christian-travel-guide
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
