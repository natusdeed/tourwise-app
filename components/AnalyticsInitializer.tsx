'use client'

/**
 * Analytics Initializer Component
 * 
 * This component demonstrates how to initialize GA4 and scroll tracking
 * using the useEffect pattern. You can use this pattern in any component
 * where you need to ensure analytics is initialized.
 * 
 * Usage:
 * ```tsx
 * import AnalyticsInitializer from '@/components/AnalyticsInitializer'
 * 
 * // In your component:
 * <AnalyticsInitializer />
 * ```
 * 
 * Or use the pattern directly:
 * ```tsx
 * import { initGA4, initScrollTracking } from '@/utils/analytics'
 * 
 * useEffect(() => {
 *   initGA4()
 *   initScrollTracking()
 * }, [])
 * ```
 */

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { initGA4, initScrollTracking } from '@/utils/analytics'

export default function AnalyticsInitializer() {
  useEffect(() => {
    // Check cookie consent before initializing
    const consent = Cookies.get('tourwise_consent')
    
    if (consent === 'accepted') {
      // Initialize GA4 (will use NEXT_PUBLIC_GA4_MEASUREMENT_ID from env)
      // This is async and will load the script if needed
      initGA4().then(() => {
        // Initialize scroll tracking after GA4 is ready
        // Note: This will only initialize once even if called multiple times
        initScrollTracking()
      }).catch((error) => {
        console.error('[Analytics] Failed to initialize GA4:', error)
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}
