/**
 * Google Analytics 4 (GA4) Tracking Utilities
 * 
 * This file provides functions to track user interactions and events
 * for analytics purposes. All tracking respects user cookie consent.
 */

// Extend Window interface to include gtag and dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

/**
 * Initialize Google Analytics 4
 * Call this function after user accepts cookies
 * @param measurementId - Your GA4 Measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export const initGA4 = (measurementId: string) => {
  if (typeof window === 'undefined') return

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  
  // Define gtag function
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  
  // Make gtag available globally
  window.gtag = gtag
  
  // Initialize GA4
  gtag('js', new Date())
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  })
}

/**
 * Track affiliate link clicks
 * @param linkName - Name/identifier of the affiliate link
 * @param destination - Destination URL or location
 * @param price - Price value (optional)
 */
export const trackAffiliateClick = (
  linkName: string,
  destination: string,
  price?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'affiliate_click', {
    link_name: linkName,
    destination: destination,
    ...(price && { price: price }),
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track email signups
 * @param source - Source of the signup (e.g., 'hero', 'popup', 'footer')
 */
export const trackEmailSignup = (source: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'email_signup', {
    signup_source: source,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track itinerary creation
 * @param destination - Destination name
 * @param duration - Trip duration (e.g., '7 days')
 * @param budget - Budget amount (optional)
 */
export const trackItineraryCreation = (
  destination: string,
  duration?: string,
  budget?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'itinerary_created', {
    destination: destination,
    ...(duration && { duration: duration }),
    ...(budget && { budget: budget }),
    timestamp: new Date().toISOString(),
  })
}

/**
 * Initialize scroll depth tracking
 * Tracks when users scroll to 25%, 50%, 75%, and 100% of the page
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined' || !window.gtag) return

  const milestones = [25, 50, 75, 100]
  const reached = new Set<number>()

  const handleScroll = () => {
    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !reached.has(milestone)) {
        reached.add(milestone)
        window.gtag('event', 'scroll_depth', {
          depth: milestone,
          page: window.location.pathname,
        })
      }
    })
  }

  // Throttle scroll events for better performance
  let ticking = false
  const throttledHandleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', throttledHandleScroll, { passive: true })

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', throttledHandleScroll)
  }
}

/**
 * Track CTA button clicks
 * @param ctaName - Name/identifier of the CTA button
 * @param location - Location on the page (e.g., 'hero', 'sidebar', 'footer')
 */
export const trackCTA = (ctaName: string, location: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'cta_click', {
    cta_name: ctaName,
    cta_location: location,
  })
}

/**
 * Track page views manually (if needed)
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    ...(pageTitle && { page_title: pageTitle }),
  })
}

/**
 * Track custom events
 * @param eventName - Name of the custom event
 * @param eventParams - Additional parameters for the event
 */
export const trackCustomEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, {
    ...eventParams,
    timestamp: new Date().toISOString(),
  })
}
