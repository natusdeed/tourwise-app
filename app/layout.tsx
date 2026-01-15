import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TourWise AI | Smart AI Travel Planner for Flights, Hotels & Tours',
  description: 'Plan your dream trip in seconds with TourWise AI. Get the best deals on flights, luxury escapes, Christian tours, and more. Travel smarter, further, and cheaper today!',
  keywords: ['AI Travel', 'Cheap Flights', 'Luxury AI Travel', 'Africa Safari Planner', 'Christian Pilgrimage AI', 'Best Hotel Deals', 'TourWise'],
  icons: {
    icon: '/appicon.png.png',
    shortcut: '/appicon.png.png',
    apple: '/appicon.png.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tourwiseai.com',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: 'TourWise AI: Your Personal AI Travel Concierge',
    description: 'Stop searching, start traveling. Let AI find your next adventure.',
    images: [
      {
        url: '/header-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'TourWise AI - Smart Travel Planning',
      },
    ],
    type: 'website',
    siteName: 'TourWise AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TourWise AI: Your Personal AI Travel Concierge',
    description: 'Stop searching, start traveling. Let AI find your next adventure.',
    images: ['/header-banner.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization schema for Knowledge Graph
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TourWise AI',
    url: 'https://tourwiseai.com',
    logo: 'https://tourwiseai.com/appicon.png.png',
    description: 'AI-powered travel planning platform for flights, hotels, and tours',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-703-332-5956',
      contactType: 'Customer Service',
      email: 'don@tourwiseai.com',
      areaServed: 'Worldwide',
    },
    sameAs: [
      // Add social media profiles when available
    ],
  }

  // Website schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TourWise AI',
    url: 'https://tourwiseai.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tourwiseai.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external APIs for performance - only critical ones */}
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        {/* Defer non-critical preconnects */}
        <link rel="dns-prefetch" href="https://api.travelpayouts.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        <link rel="dns-prefetch" href="https://tpwidg.com" />
        <link rel="dns-prefetch" href="https://ipinfo.io" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Travelpayouts Widget - Lazy load after page is fully interactive */}
        <Script
          id="travelpayouts-widget"
          src="https://tpwidg.com/content?currency=usd&trs=484247&shmarker=692947&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23FFFFFF&light=%23FFFFFF&secondary=%230B1120&special=%2332A8DD&color_focused=%2332a8dd&border_radius=0&no_labels=true&plain=true&promo_id=7879&campaign_id=100"
          strategy="lazyOnload"
        />
        <Navbar />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
