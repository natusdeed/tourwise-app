import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'

export const metadata: Metadata = {
  title: 'Houston to Lagos Flights | TourWiseAI',
  description: 'Plan Houston to Lagos flights with route notes, IAH/HOU context, and booking essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-lagos-flights' },
}

export default function Page() {
  return <HoustonRouteLanding routeTitle="Houston to Lagos Flights" routePath="/houston-to-lagos-flights" destinationAirport="Murtala Muhammed International Airport (LOS)" international />
}
