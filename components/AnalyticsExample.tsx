'use client'

/**
 * Example Component: How to use GA4 tracking with useEffect
 * 
 * This shows the exact pattern you requested:
 * ```tsx
 * import { initGA4, initScrollTracking } from '@/utils/analytics';
 * 
 * useEffect(() => {
 *   initGA4();
 *   initScrollTracking();
 * }, []);
 * ```
 * 
 * IMPORTANT: Make sure to check cookie consent before initializing!
 */

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { initGA4, initScrollTracking } from '@/utils/analytics'

export default function AnalyticsExample() {
  useEffect(() => {
    // Always check cookie consent before initializing analytics
    const consent = Cookies.get('tourwise_consent')
    
    if (consent === 'accepted') {
      // Initialize GA4 (will use NEXT_PUBLIC_GA4_MEASUREMENT_ID from env)
      // This is async and will load the script if needed
      initGA4().then(() => {
        // Initialize scroll tracking after GA4 is ready
        // Note: initScrollTracking is safe to call multiple times
        initScrollTracking()
      }).catch((error) => {
        console.error('[Analytics] Failed to initialize:', error)
      })
    }
  }, [])

  return null // This component doesn't render anything
}

/**
 * SIMPLIFIED VERSION (if you want to use it exactly as shown):
 * 
 * Note: This version assumes the GoogleAnalytics component in layout.tsx
 * has already loaded the script. If you use this pattern, you can call
 * initGA4() synchronously since the script is already loaded.
 * 
 * ```tsx
 * useEffect(() => {
 *   const consent = Cookies.get('tourwise_consent')
 *   if (consent === 'accepted') {
 *     // If script is already loaded by GoogleAnalytics component,
 *     // this will just configure it
 *     initGA4()
 *     initScrollTracking()
 *   }
 * }, [])
 * ```
 */
