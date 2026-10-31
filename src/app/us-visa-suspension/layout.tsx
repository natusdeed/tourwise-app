/**
 * US Visa Suspension Layout
 *
 * Metadata and SEO for the US visa suspension page
 */

import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'US Immigrant Visa Suspension | TourWiseAI',
  description:
    'Countries affected by the US immigrant visa suspension effective January 21, 2026, and screening notes.',
  path: '/us-visa-suspension',
})

export default function USVisaSuspensionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
