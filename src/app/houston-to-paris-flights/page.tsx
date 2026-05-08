import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'

export const metadata: Metadata = {
  title: 'Houston to Paris Flights | TourWiseAI',
  description: 'Plan Houston to Paris flights with airport notes, eSIM and insurance essentials, and route tips.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-paris-flights' },
}

export default function Page() {
  return <HoustonRouteLanding routeTitle="Houston to Paris Flights" routePath="/houston-to-paris-flights" destinationAirport="Paris Charles de Gaulle Airport (CDG)" international />
}
