/**
 * US Visa Suspension Layout
 * 
 * Metadata and SEO for the US visa suspension page
 */

import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'US Immigrant Visa Suspension - 75 Countries Affected January 2026 | TourWise AI',
  description: 'Complete list of 75 countries affected by US State Department immigrant visa suspension effective January 21, 2026. Learn about public charge screening rules, exemptions, and what this means for your travel plans.',
  keywords: [
    'US visa suspension',
    'immigrant visa pause',
    'green card suspension',
    'US State Department visa',
    'public charge screening',
    'visa delays 2026',
    'US immigration news',
    'visa policy changes',
    'travel alerts US',
    'immigrant visa processing',
  ],
  canonicalUrl: 'https://tourwiseai.com/us-visa-suspension',
})

export default function USVisaSuspensionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
