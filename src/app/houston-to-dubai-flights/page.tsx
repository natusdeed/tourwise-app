import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-dubai-flights']

export const metadata: Metadata = {
  title: 'Dubai Flights from Houston (IAH): Nonstop vs One-Stop, Best Time to Book | TourWiseAI',
  description: 'Complete guide to Houston to Dubai flights: Emirates nonstop vs one-stop routings, when to book, money-saving tips, and arrival essentials.',
  alternates: { canonical: 'https://tourwiseai.com/houston-to-dubai-flights' },
}

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
