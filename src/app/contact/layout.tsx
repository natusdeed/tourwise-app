import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Contact TourWiseAI',
  description:
    'Email don@tourwiseai.com or call (703) 332-5956. TourWiseAI responds within 24 hours about AI trip planning.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
