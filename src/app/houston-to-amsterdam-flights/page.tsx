import type { Metadata } from 'next'
import HoustonRouteLanding from '@/components/HoustonRouteLanding'
import { HOUSTON_ROUTES, houstonGuideMetadata } from '@/lib/houston-routes'

const route = HOUSTON_ROUTES['houston-to-amsterdam-flights']

export const metadata: Metadata = houstonGuideMetadata(route)

export default function Page() {
  return <HoustonRouteLanding route={route} />
}
