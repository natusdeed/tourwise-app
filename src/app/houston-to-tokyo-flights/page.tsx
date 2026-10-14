import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-tokyo-flights']

export const metadata: Metadata = {
  title: 'Tokyo Flights from Houston (IAH): Nonstop vs One-Stop, Best Time to Book | TourWiseAI',
  description: 'Complete guide to Houston to Tokyo flights: ANA/United nonstops vs one-stop routings, when to book for cherry blossom season, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-tokyo-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
