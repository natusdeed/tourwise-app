import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy | TourWiseAI',
  description:
    'How TourWiseAI collects, uses, and protects personal information, including cookies and privacy rights.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
