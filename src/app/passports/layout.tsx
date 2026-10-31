import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Passport Guides | TourWiseAI',
  description: 'Country passport guides on TourWiseAI, including requirements, fees, and processing notes.',
  path: '/passports',
})

export default function PassportsLayout({ children }: { children: React.ReactNode }) {
  return children
}
