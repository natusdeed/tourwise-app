import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-madrid-flights']

export const metadata: Metadata = {
  title: 'Madrid Flights from Houston (IAH): Nonstop, Best Time to Book & Tips | TourWiseAI',
  description: 'Complete guide to Houston to Madrid flights: Iberia nonstop, when to book for the lowest fares, money-saving tips, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-madrid-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
