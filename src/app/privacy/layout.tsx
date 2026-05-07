import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | TourWise AI',
  description: 'Learn how TourWise AI collects, uses, and protects your personal information. Our privacy policy covers data collection, AI processing, cookies, and your rights under GDPR and CCPA.',
  keywords: ['Privacy Policy', 'Data Protection', 'GDPR', 'CCPA', 'TourWise AI Privacy', 'Cookie Policy'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tourwiseai.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | TourWise AI',
    description: 'Your privacy is important to us. Learn how we protect your data and respect your rights.',
    type: 'website',
    url: 'https://tourwiseai.com/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
