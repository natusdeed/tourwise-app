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
  metadataBase: new URL('https://tourwiseai.com'),
  title: 'TourWise AI | Smart AI Travel Planner for Flights, Hotels & Tours',
  description: 'Hyper-personalized travel itineraries powered by advanced AI. Get AI-driven itineraries, real-time flight tracking, and local detection. The future of smart travel planning that solves your travel headaches.',
  keywords: ['AI Travel', 'Cheap Flights', 'Luxury AI Travel', 'Africa Safari Planner', 'Christian Pilgrimage AI', 'Best Hotel Deals', 'TourWise', 'AI flight search', 'smart travel planner', 'hyper-personalized travel'],
  icons: {
    icon: '/appicon.png.png',
    shortcut: '/appicon.png.png',
    apple: '/appicon.png.png',
  },
  appleWebApp: {
    title: 'Tour Wise AI',
    capable: true,
    statusBarStyle: 'default',
  },
  verification: {
    google: '...', // TODO: Add your Google Search Console verification code
    yandex: '...', // TODO: Add your Yandex Webmaster verification code
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
    title: 'TourWise AI: The Future of Smart Travel Planning',
    description: 'Advanced AI-powered travel planning platform delivering hyper-personalized itineraries, real-time flight tracking, and intelligent local detection. Experience the future of travel planning that solves your travel headaches.',
    url: 'https://tourwiseai.com',
    images: [
      {
        url: '/header-banner.jpg.png',
        width: 1200,
        height: 630,
        alt: 'TourWise AI - The Future of Smart Travel Planning',
      },
    ],
    type: 'website',
    siteName: 'TourWise AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TourWise AI: The Future of Smart Travel Planning',
    description: 'Advanced AI-powered travel planning platform delivering hyper-personalized itineraries, real-time flight tracking, and intelligent local detection. Experience the future of travel planning.',
    images: ['/header-banner.jpg.png'],
    creator: '@tourwiseai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization & TravelAgency schema for Knowledge Graph, E-E-A-T, and Domain Authority
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'TravelAgency'],
    name: 'TourWise AI',
    legalName: 'TourWise AI',
    url: 'https://tourwiseai.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tourwiseai.com/appicon.png.png',
      width: 512,
      height: 512,
    },
    description: 'TourWise AI is the leading AI-powered smart travel planner, delivering hyper-personalized travel itineraries, real-time flight tracking, and intelligent local detection to solve travel planning headaches.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Richmond',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Richmond',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-703-332-5956',
      contactType: 'Customer Service',
      email: 'don@tourwiseai.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.youtube.com/@TourWiseAI',
      'https://www.facebook.com/tourwiseai',
      'https://www.instagram.com/tourwiseai',
      'https://x.com/tourwiseai',
      'https://www.tiktok.com/@tourwiseai',
      'https://www.linkedin.com/company/tourwiseai',
    ],
    knowsAbout: [
      'AI Travel Planning',
      'Flight Search',
      'Hotel Booking',
      'Travel Itineraries',
      'Smart Travel Technology',
      'Travel Agency Services',
      'AI-driven Itineraries',
      'Real-time Flight Tracking',
    ],
  }

  // Website schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TourWise AI',
    url: 'https://tourwiseai.com',
    publisher: {
      '@type': 'Organization',
      name: 'TourWise AI',
      url: 'https://tourwiseai.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tourwiseai.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // SoftwareApplication schema for AI Agent Discovery
  // Optimized for Agentic Search - highlights key features AI models look for
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TourWise AI',
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description: 'TourWise AI is an advanced smart travel planner that uses artificial intelligence to create hyper-personalized travel itineraries, provide real-time flight tracking, and offer intelligent local detection. Our AI-driven platform solves common travel planning headaches by automating itinerary creation, finding the best flight deals, and discovering hidden local gems.',
    featureList: [
      'AI-driven itineraries',
      'Real-time flight tracking',
      'Hyper-personalized travel planning',
      'Intelligent flight search',
      'Automated itinerary generation',
      'Price monitoring and alerts',
      'Multi-destination planning',
      'Local detection',
      'Smart travel planner',
      'AI travel assistant',
    ],
    screenshot: 'https://tourwiseai.com/header-banner.jpg.png',
    url: 'https://tourwiseai.com',
    author: {
      '@type': 'Organization',
      name: 'TourWise AI',
      url: 'https://tourwiseai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TourWise AI',
      url: 'https://tourwiseai.com',
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
        <Script
          id="software-application-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
