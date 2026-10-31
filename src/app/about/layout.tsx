import type { Metadata } from 'next'
import { pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'About TourWiseAI — AI Travel Planning',
  description:
    'TourWiseAI is an AI travel planner that helps you build itineraries and compare partner booking options. Based in Richmond, Texas.',
  path: '/about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
