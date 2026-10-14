import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-mexico-city-flights']

export const metadata: Metadata = {
  title: 'Mexico City Flights from Houston: Airlines, Best Time to Book & Tips | TourWiseAI',
  description: 'Complete guide to Houston to Mexico City flights: nonstop airlines, when to book for the lowest fares, money-saving tips, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-mexico-city-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
