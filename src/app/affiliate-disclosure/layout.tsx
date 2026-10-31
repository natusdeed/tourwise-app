import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Affiliate Disclosure | TourWiseAI',
  description: 'TourWiseAI may earn a commission from partner links at no extra cost to you.',
  path: '/affiliate-disclosure',
})

export default function AffiliateDisclosureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
