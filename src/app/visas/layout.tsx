import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Visa Guides | TourWiseAI',
  description: 'Country visa guides on TourWiseAI, including requirements and application notes.',
  path: '/visas',
})

export default function VisasLayout({ children }: { children: React.ReactNode }) {
  return children
}
