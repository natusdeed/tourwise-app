import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-amsterdam-flights']

export const metadata: Metadata = {
  title: 'Amsterdam Flights from Houston (IAH): Nonstop, Best Time to Book & Tips | TourWiseAI',
  description: 'Complete guide to Houston to Amsterdam flights: KLM nonstop, when to book for tulip season, money-saving tips, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-amsterdam-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
