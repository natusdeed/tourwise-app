import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'

export const metadata: Metadata = {
  title: 'Houston to Orlando Flights | TourWiseAI',
  description: 'Plan Houston to Orlando flights with airport tips and transfer-focused planning guidance.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-orlando-flights' },
}

export default function Page() {
  return <HoustonRouteLanding routeTitle="Houston to Orlando Flights" routePath="/houston-to-orlando-flights" destinationAirport="Orlando International Airport (MCO)" international={false} />
}
