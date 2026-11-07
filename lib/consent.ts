/** Cookie name shared with the consent banner. Not a secret. */
export const CONSENT_COOKIE = 'tourwise_consent'
export const CONSENT_EVENT = 'tourwise-consent'
export const OPEN_CONSENT_EVENT = 'tourwise-open-consent'

export type ConsentChoice = 'accepted' | 'declined'

/**
 * Decode one cookie value. A stray "%" throws inside decodeURIComponent;
 * that, and any value other than the two known choices, means no choice yet.
 */
export function parseConsentValue(raw: string | null | undefined): ConsentChoice | null {
  if (raw == null || raw === '') return null
  let decoded = raw
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    return null
  }
  if (decoded === 'accepted' || decoded === 'declined') return decoded
  return null
}

/** Read the consent choice from a Cookie header or document.cookie string. */
export function parseConsentCookieHeader(header: string | null | undefined): ConsentChoice | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const trimmed = part.trim()
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    if (trimmed.slice(0, eq) !== CONSENT_COOKIE) continue
    return parseConsentValue(trimmed.slice(eq + 1))
  }
  return null
}

export function readConsent(): ConsentChoice | null {
  if (typeof document === 'undefined') return null
  try {
    return parseConsentCookieHeader(document.cookie)
  } catch {
    return null
  }
}

/**
 * First-party cookie names we are allowed to expire when consent is rejected.
 * The consent cookie itself is kept, because it stores the rejection.
 * HttpOnly cookies are invisible here. Cookies set for another path or domain,
 * including Travelpayouts and Google Analytics cookies on their own hosts,
 * cannot be cleared by this page.
 */
export function nonEssentialFirstPartyCookieNames(header: string | null | undefined): string[] {
  if (!header) return []
  const names: string[] = []
  for (const part of header.split(';')) {
    const name = part.trim().split('=')[0]
    if (!name || name === CONSENT_COOKIE) continue
    if (!names.includes(name)) names.push(name)
  }
  return names
}

export function clearNonEssentialFirstPartyCookies(): void {
  if (typeof document === 'undefined') return
  for (const name of nonEssentialFirstPartyCookieNames(document.cookie)) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
  }
}

export function notifyConsent(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

/**
 * Escape on a banner opened from Cookie settings dismisses it and keeps the
 * stored choice. A first visit has no choice, so Escape is not that path.
 */
export function escapeDismissesSettings(
  openedFromSettings: boolean,
  choice: ConsentChoice | null,
): boolean {
  return openedFromSettings && choice !== null
}

/** Drop the pre-paint hide so the banner can show over an existing choice. */
export function openConsentBanner(): void {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute('data-consent')
  document.documentElement.setAttribute('data-consent-open', '1')
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

/**
 * Runs while the HTML is parsed, before the body paints.
 * Only a known choice hides the banner. A bad value must not throw.
 */
export const CONSENT_BOOT_SCRIPT =
  '(function(){try{var parts=document.cookie.split(";");for(var i=0;i<parts.length;i++){var part=parts[i].trim();var eq=part.indexOf("=");if(eq<0)continue;if(part.slice(0,eq)!=="tourwise_consent")continue;var value;try{value=decodeURIComponent(part.slice(eq+1))}catch(e){return}if(value==="accepted"||value==="declined"){document.documentElement.setAttribute("data-consent","1")}return}}catch(e){}})();'
