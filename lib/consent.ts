/** Cookie name shared with the consent banner. Not a secret. */
export const CONSENT_COOKIE = 'tourwise_consent'
export const CONSENT_EVENT = 'tourwise-consent'

export type ConsentChoice = 'accepted' | 'declined'

export function readConsent(): ConsentChoice | null {
  if (typeof document === 'undefined') return null
  const parts = document.cookie.split(';')
  for (const part of parts) {
    const [name, ...rest] = part.trim().split('=')
    if (name !== CONSENT_COOKIE) continue
    const value = decodeURIComponent(rest.join('='))
    if (value === 'accepted' || value === 'declined') return value
  }
  return null
}

export function notifyConsent(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
