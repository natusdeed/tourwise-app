import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'

export const metadata: Metadata = {
  title: 'Houston to London Flights | TourWiseAI',
  description: 'Plan Houston to London flights with IAH/HOU notes, transfer prep, and practical route guidance.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-london-flights' },
}

export default function Page() {
  return <HoustonRouteLanding routeTitle="Houston to London Flights" routePath="/houston-to-london-flights" destinationAirport="Heathrow (LHR) or Gatwick (LGW)" international />
}
