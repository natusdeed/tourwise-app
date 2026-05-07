import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | TourWise AI',
  description: 'Read the Terms & Conditions for TourWise AI. Learn about our service nature, liability limitations, affiliate disclosures, and user conduct policies.',
  keywords: ['Terms of Service', 'Terms and Conditions', 'TourWise AI Terms', 'User Agreement', 'Service Terms'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tourwiseai.com/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | TourWise AI',
    description: 'Please read these terms carefully before using TourWise AI. By using our service, you agree to be bound by these terms.',
    type: 'website',
    url: 'https://tourwiseai.com/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
