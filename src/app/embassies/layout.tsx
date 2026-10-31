import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Embassy Guides | TourWiseAI',
  description: 'Embassy and consulate directories on TourWiseAI, with contact and location notes.',
  path: '/embassies',
})

export default function EmbassiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
