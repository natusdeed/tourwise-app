import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service | TourWiseAI',
  description:
    'TourWiseAI terms: an AI planning tool, not a travel agency. Bookings are completed on partner sites.',
  path: '/terms',
})

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
