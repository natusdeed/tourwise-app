import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | TourWise AI',
  description: 'TourWise AI participates in affiliate marketing programs. Learn how affiliate relationships work and how they support our free AI travel planning service.',
  keywords: ['Affiliate Disclosure', 'Affiliate Marketing', 'TourWise AI', 'Travel Affiliates', 'Transparency'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tourwiseai.com/affiliate-disclosure',
  },
  openGraph: {
    title: 'Affiliate Disclosure | TourWise AI',
    description: 'Transparency is important to us. Learn how affiliate relationships support our free travel planning service.',
    type: 'website',
    url: 'https://tourwiseai.com/affiliate-disclosure',
  },
}

export default function AffiliateDisclosureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}