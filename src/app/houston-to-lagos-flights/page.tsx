import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-lagos-flights']

export const metadata: Metadata = {
  title: 'Lagos Flights from Houston (IAH): Airlines, Best Time to Book & Tips | TourWiseAI',
  description: 'Complete guide to Houston to Lagos flights: which airlines fly it, when to book for the lowest fares, money-saving tips, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-lagos-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
