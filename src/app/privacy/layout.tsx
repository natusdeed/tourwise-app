import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Privacy Policy | TourWiseAI',
    description:
      'How TourWiseAI collects, uses, and protects personal information, including cookies and privacy rights.',
    path: '/privacy-policy',
  }),
  robots: { index: false, follow: true },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
