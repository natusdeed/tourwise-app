'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { initScrollTracking } from '@/utils/analytics'

interface GoogleAnalyticsProps {
  measurementId?: string
}

/**
 * Google Analytics 4 Component
 * 
 * This component loads GA4 only after user accepts cookies.
 * It respects the cookie consent banner and initializes tracking.
 * 
 * Usage:
 * <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
 * 
 * Or set NEXT_PUBLIC_GA4_MEASUREMENT_ID in your .env file
 */
export default function GoogleAnalytics({ 
  measurementId 
}: GoogleAnalyticsProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [scrollCleanup, setScrollCleanup] = useState<(() => void) | null>(null)

  // Get measurement ID from prop or environment variable
  const ga4Id = measurementId || process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''

  useEffect(() => {
    // Check cookie consent
    const consent = Cookies.get('tourwise_consent')
    if (consent === 'accepted' && ga4Id) {
      setShouldLoad(true)
    }
  }, [ga4Id])

  // Initialize scroll tracking after GA4 is loaded
  useEffect(() => {
    if (shouldLoad && typeof window !== 'undefined' && window.gtag) {
      // Small delay to ensure GA4 is fully initialized
      const timer = setTimeout(() => {
        const cleanup = initScrollTracking()
        if (cleanup) {
          setScrollCleanup(() => cleanup)
        }
      }, 1000)

      return () => {
        clearTimeout(timer)
        if (scrollCleanup) {
          scrollCleanup()
        }
      }
    }
  }, [shouldLoad, scrollCleanup])

  // Don't render if no measurement ID or consent not given
  if (!ga4Id || !shouldLoad) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
