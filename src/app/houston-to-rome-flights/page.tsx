import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'

export const metadata: Metadata = {
  title: 'Houston to Rome Flights | TourWiseAI',
  description: 'Plan Houston to Rome flights with route guidance and key travel essentials before booking.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-rome-flights' },
}

export default function Page() {
  return <HoustonRouteLanding routeTitle="Houston to Rome Flights" routePath="/houston-to-rome-flights" destinationAirport="Rome Fiumicino Airport (FCO)" international />
}
