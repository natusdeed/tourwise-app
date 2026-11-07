import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CookieBanner from '@/components/CookieBanner'
import ConsentScripts from '@/components/ConsentScripts'
import DeferredExitIntent from '@/components/DeferredExitIntent'
import Script from 'next/script'
import { SITE_ORIGIN, pageMeta } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const homeTitle = 'TourWiseAI | AI Travel Planner & Flight Deals'
const homeDescription =
  'Plan trips with TourWiseAI. Compare partner options for flights, stays, tours, transfers, eSIMs, and insurance.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  ...pageMeta({
    title: homeTitle,
    description: homeDescription,
    path: '/',
  }),
  title: {
    default: homeTitle,
    template: '%s | TourWiseAI',
  },
  keywords: [
    'AI travel planner',
    'cheap flights',
    'travel deals',
    'airport transfers',
    'travel eSIM',
    'travel insurance',
    'things to do',
    'faith travel',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/appicon.png.png', type: 'image/png', sizes: '64x64' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: {
    title: 'TourWiseAI',
    capable: true,
    statusBarStyle: 'default',
  },
  verification: {
    google: 'l9MIF-ubDVb3oevo60dCZoLEKeDqevejMJLRnL1R_nM',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

  // Terms say TourWiseAI is not a travel agency, so this is Organization, not TravelAgency.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TourWiseAI',
    url: SITE_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/appicon.png.png`,
      width: 64,
      height: 64,
    },
    description:
      'TourWiseAI is an AI travel planner that helps people build itineraries and compare partner booking options. Bookings are completed on partner sites.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Richmond',
      addressRegion: 'TX',
      postalCode: '77407',
      addressCountry: 'US',
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
      'Travel Itineraries',
      'Airport Transfers',
      'Travel eSIM',
      'Travel Insurance',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TourWiseAI',
    url: SITE_ORIGIN,
    publisher: {
      '@type': 'Organization',
      name: 'TourWiseAI',
      url: SITE_ORIGIN,
    },
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TourWiseAI',
    url: SITE_ORIGIN,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    description:
      'AI travel planner for building itineraries and comparing partner options for flights, stays, tours, transfers, eSIMs, car rentals, and insurance. TourWiseAI is not a travel agency.',
    provider: {
      '@type': 'Organization',
      name: 'TourWiseAI',
      url: SITE_ORIGIN,
    },
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Runs during HTML parsing, before first paint. next/script beforeInteractive
            only queues work for the Next.js runtime, so a slow bundle still paints the banner. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(/(?:^|; )tourwise_consent=/.test(document.cookie)){document.documentElement.setAttribute("data-consent","1")}}catch(e){}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `html[data-consent] .cookie-banner{display:none!important}`,
          }}
        />
        {/* Preconnect to external APIs for performance - only critical ones */}
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        {/* Defer non-critical preconnects */}
        <link rel="dns-prefetch" href="https://api.travelpayouts.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
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
          id="webapp-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <ConsentScripts gaId={gaId} />
        <Navbar />
        {children}
        <CookieBanner />
        <DeferredExitIntent />
      </body>
    </html>
  )
}
