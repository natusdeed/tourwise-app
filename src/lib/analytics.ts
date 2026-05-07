/**
 * Re-exports client GA helpers plus lightweight server-side logging hooks.
 */

export {
  initGA4,
  trackAffiliateClick,
  trackEmailSignup,
  trackItineraryCreation,
  initScrollTracking,
  trackCTA,
  trackPageView,
  trackCustomEvent,
} from '@/lib/analytics'

export type ServerLeadMagnetPayload = {
  email: string
  magnetId: string
  source?: string
}

export function logLeadMagnetRequest(payload: ServerLeadMagnetPayload) {
  if (process.env.NODE_ENV === 'development') {
    console.info('[lead-magnet]', payload)
  }
}

export function logAffiliateRedirect(destination: string, label?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.info('[affiliate-click]', { destination, label })
  }
}
