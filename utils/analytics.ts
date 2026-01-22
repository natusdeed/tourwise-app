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
 * Load Google Analytics script dynamically
 * @param measurementId - Your GA4 Measurement ID
 */
const loadGAScript = (measurementId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      resolve()
      return
    }

    // Load the GA4 script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load GA4 script'))
    document.head.appendChild(script)
  })
}

/**
 * Initialize Google Analytics 4
 * Call this function after user accepts cookies
 * If no measurementId is provided, it will use NEXT_PUBLIC_GA4_MEASUREMENT_ID from env
 * This function will load the GA4 script if it's not already loaded
 * @param measurementId - Your GA4 Measurement ID (e.g., 'G-XXXXXXXXXX') - optional
 */
export const initGA4 = async (measurementId?: string) => {
  if (typeof window === 'undefined') return

  // Get measurement ID from parameter or environment variable
  const ga4Id = measurementId || process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  
  if (!ga4Id) {
    console.warn('[GA4] No measurement ID provided. Set NEXT_PUBLIC_GA4_MEASUREMENT_ID or pass it as parameter.')
    return
  }

  // Check if already initialized to prevent duplicate initialization
  if (window.gtag && window.dataLayer?.length > 0) {
    // Check if this measurement ID is already configured
    const isConfigured = window.dataLayer.some((item: any) => 
      item[0] === 'config' && item[1] === ga4Id
    )
    if (isConfigured) {
      return // Already initialized
    }
  }

  // Load the GA4 script if not already loaded
  try {
    await loadGAScript(ga4Id)
  } catch (error) {
    console.error('[GA4] Failed to load script:', error)
    return
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  
  // Define gtag function if it doesn't exist
  if (!window.gtag) {
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag
  }
  
  // Initialize GA4
  window.gtag('js', new Date())
  window.gtag('config', ga4Id, {
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

// Store cleanup function reference to prevent multiple listeners
let scrollTrackingCleanup: (() => void) | null = null
let isScrollTrackingInitialized = false

/**
 * Initialize scroll depth tracking
 * Tracks when users scroll to 25%, 50%, 75%, and 100% of the page
 * Safe to call multiple times - will only initialize once
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined' || !window.gtag) return

  // Prevent multiple initializations
  if (isScrollTrackingInitialized) {
    return
  }

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
  isScrollTrackingInitialized = true

  // Store cleanup function
  scrollTrackingCleanup = () => {
    window.removeEventListener('scroll', throttledHandleScroll)
    isScrollTrackingInitialized = false
    scrollTrackingCleanup = null
  }

  // Return cleanup function
  return scrollTrackingCleanup
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
