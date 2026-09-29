import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-cancun-flights']

export const metadata: Metadata = {
  title: 'Cancun Flights from Houston (IAH): Airlines, Best Time to Book & Tips | TourWiseAI',
  description: 'Complete guide to Houston to Cancun flights: which airlines fly it, when to book for the lowest fares, money-saving tips, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-cancun-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
