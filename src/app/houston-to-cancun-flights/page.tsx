import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'

export const metadata: Metadata = {
  title: 'Houston to Cancun Flights | TourWiseAI',
  description: 'Plan Houston to Cancun flights with route notes, airport transfer options, and smart booking tips.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-cancun-flights' },
}

export default function Page() {
  return <HoustonRouteLanding routeTitle="Houston to Cancun Flights" routePath="/houston-to-cancun-flights" destinationAirport="Cancun International Airport (CUN)" international />
}
