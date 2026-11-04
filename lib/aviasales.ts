/**
 * Aviasales flight-search links for TourWiseAI.
 *
 * The old Travelpayouts short link opened the Aviasales homepage with only a
 * marker. Aviasales then tried to relaunch a saved search and showed
 * "Oops, the search failed to launch" with empty From/To.
 *
 * A working link uses Aviasales' documented path:
 *   https://www.aviasales.com/search/{ORIGIN}{DDMM}{DEST}{DDMM}{adults}
 * Economy adds no class letter. The Travelpayouts marker is the same account
 * marker already configured for this site (env, or the marker on the
 * existing search widget).
 */

/** Existing Aviasales search widget. Do not change query params. */
export const AVIASALES_WIDGET_SRC =
  'https://tpwidg.com/content?currency=usd&trs=484247&shmarker=692947&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23C9922A&color_button=%230A1F44&color_icons=%230A1F44&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23D8C29A&color_focused=%23C9922A&border_radius=1&plain=false&promo_id=7879&campaign_id=100'

/**
 * Aviasales Popular Routes widget. Query string is the account embed.
 * Do not add or restyle parameters.
 */
export const AVIASALES_POPULAR_ROUTES_WIDGET_SRC =
  'https://tpwidg.com/content?currency=usd&trs=484247&shmarker=692947&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100'

/**
 * Aviasales flight timetable widget. The account embed is HOU → LON.
 * Route pages replace only origin and destination.
 */
const AVIASALES_SCHEDULE_WIDGET_SRC =
  'https://tpwidg.com/content?currency=usd&trs=484247&shmarker=692947&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=HOU&destination=LON&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100'

export function aviasalesScheduleWidgetSrc(origin: string, destination: string): string {
  const url = new URL(AVIASALES_SCHEDULE_WIDGET_SRC)
  url.searchParams.set('origin', origin)
  url.searchParams.set('destination', destination)
  return url.toString()
}

/** Houston city code. Aviasales treats this as both Hobby and IAH. */
export const HOUSTON_ORIGIN_IATA = 'HOU'

const DEPART_OFFSET_DAYS = 21
const DEFAULT_NIGHTS = 7

export type AviasalesTripClass = 'economy' | 'business' | 'comfort' | 'first'

export type AviasalesSearchInput = {
  origin?: string | null
  destination?: string | null
  departDate?: Date | string | null
  returnDate?: Date | string | null
  adults?: number
  tripClass?: AviasalesTripClass
}

type YMD = { y: number; m: number; d: number }

/**
 * Account marker already used by this site.
 * Prefer env so it can be rotated without a code change. Otherwise read the
 * marker baked into the existing widget URL. Never invent a new id.
 */
export function getAviasalesMarker(): string {
  const fromEnv = (
    process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ||
    process.env.TRAVELPAYOUTS_MARKER ||
    ''
  ).trim()
  if (fromEnv) return fromEnv

  try {
    const marker = new URL(AVIASALES_WIDGET_SRC).searchParams.get('shmarker') || ''
    return marker.split('.')[0] || ''
  } catch {
    return ''
  }
}

function utcToday(): YMD {
  const now = new Date()
  return { y: now.getUTCFullYear(), m: now.getUTCMonth() + 1, d: now.getUTCDate() }
}

function addDays(ymd: YMD, days: number): YMD {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d))
  dt.setUTCDate(dt.getUTCDate() + days)
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }
}

function formatDDMM(ymd: YMD): string {
  return String(ymd.d).padStart(2, '0') + String(ymd.m).padStart(2, '0')
}

function parseDateInput(value: Date | string | null | undefined): YMD | null {
  if (!value) return null
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null
    return { y: value.getFullYear(), m: value.getMonth() + 1, d: value.getDate() }
  }
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim())
  if (!iso) return null
  const y = Number(iso[1])
  const m = Number(iso[2])
  const d = Number(iso[3])
  const check = new Date(Date.UTC(y, m - 1, d))
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) {
    return null
  }
  return { y, m, d }
}

function normalizeIata(code: string | null | undefined): string | null {
  if (!code) return null
  const upper = code.trim().toUpperCase()
  return /^[A-Z]{2,3}$/.test(upper) ? upper : null
}

function classLetter(tripClass: AviasalesTripClass): string {
  // Aviasales docs: economy is empty. Business is "c", not "b".
  if (tripClass === 'business') return 'c'
  if (tripClass === 'comfort') return 'w'
  if (tripClass === 'first') return 'f'
  return ''
}

function clampAdults(adults: number | undefined): number {
  if (!Number.isFinite(adults)) return 1
  return Math.min(9, Math.max(1, Math.floor(adults as number)))
}

/** "7 days", "2 weeks", "10 nights" -> night count. Unknown text returns null. */
export function nightsFromText(text: string | null | undefined): number | null {
  if (!text) return null
  const match = text.toLowerCase().match(/(\d+)\s*(night|nights|day|days|week|weeks)/)
  if (!match) return null
  const amount = Number(match[1])
  if (!Number.isFinite(amount) || amount < 1) return null
  const unit = match[2]
  const nights = unit.startsWith('week') ? amount * 7 : amount
  return Math.min(nights, 60)
}

function compareYmd(a: YMD, b: YMD): number {
  if (a.y !== b.y) return a.y - b.y
  if (a.m !== b.m) return a.m - b.m
  return a.d - b.d
}

function daysBetween(start: YMD, end: YMD): number {
  const ms = Date.UTC(end.y, end.m - 1, end.d) - Date.UTC(start.y, start.m - 1, start.d)
  return Math.round(ms / 86400000)
}

/**
 * Departure must be tomorrow or later. If a date is already past, keep the
 * same trip length and start it tomorrow so a cached page cannot reopen a
 * search Aviasales will reject.
 */
function clampTripToTomorrow(depart: YMD, ret: YMD): { depart: YMD; ret: YMD } {
  const nights = Math.max(1, daysBetween(depart, ret))
  const earliest = addDays(utcToday(), 1)
  let nextDepart = depart
  let nextReturn = ret
  if (compareYmd(nextDepart, earliest) < 0) {
    nextDepart = earliest
    nextReturn = addDays(nextDepart, nights)
  }
  if (compareYmd(nextReturn, nextDepart) <= 0) {
    nextReturn = addDays(nextDepart, DEFAULT_NIGHTS)
  }
  return { depart: nextDepart, ret: nextReturn }
}

/**
 * Build an Aviasales URL that opens a real search.
 * With both cities, this is the results page. With only an origin, this is
 * the search form prefilled so Aviasales does not restore a broken search.
 */
export function buildAviasalesSearchUrl(input: AviasalesSearchInput = {}): string {
  const adults = clampAdults(input.adults)
  const tripClass = input.tripClass ?? 'economy'
  const origin = normalizeIata(input.origin) || HOUSTON_ORIGIN_IATA
  const destination = normalizeIata(input.destination)
  const cabin = classLetter(tripClass)

  let params: string
  let url: URL

  if (destination) {
    const requestedDepart = parseDateInput(input.departDate) ?? addDays(utcToday(), DEPART_OFFSET_DAYS)
    let requestedReturn = parseDateInput(input.returnDate) ?? addDays(requestedDepart, DEFAULT_NIGHTS)
    if (compareYmd(requestedReturn, requestedDepart) <= 0) {
      requestedReturn = addDays(requestedDepart, DEFAULT_NIGHTS)
    }
    const { depart, ret } = clampTripToTomorrow(requestedDepart, requestedReturn)
    params = `${origin}${formatDDMM(depart)}${destination}${formatDDMM(ret)}${cabin}${adults}`
    url = new URL(`https://www.aviasales.com/search/${params}`)
  } else {
    // Prefilled form. Adults are required or Aviasales rejects the link.
    params = `${origin}${cabin}${adults}`
    url = new URL('https://www.aviasales.com/')
    url.searchParams.set('params', params)
  }

  const marker = getAviasalesMarker()
  if (marker) url.searchParams.set('marker', marker)
  return url.toString()
}

/**
 * Search form with the cities filled in and no dates.
 * This string does not change from day to day, so it is safe to put in
 * static HTML. The click handler replaces it with a fresh dated search.
 */
export function buildAviasalesCityPrefillUrl(
  input: Pick<AviasalesSearchInput, 'origin' | 'destination' | 'adults' | 'tripClass'> = {}
): string {
  const adults = clampAdults(input.adults)
  const tripClass = input.tripClass ?? 'economy'
  const origin = normalizeIata(input.origin) || HOUSTON_ORIGIN_IATA
  const destination = normalizeIata(input.destination)
  const cabin = classLetter(tripClass)
  const params = destination ? `${origin}${destination}${cabin}${adults}` : `${origin}${cabin}${adults}`
  const url = new URL('https://www.aviasales.com/')
  url.searchParams.set('params', params)
  const marker = getAviasalesMarker()
  if (marker) url.searchParams.set('marker', marker)
  return url.toString()
}
