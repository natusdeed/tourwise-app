/**
 * Aviasales flight-search links for TourWiseAI.
 *
 * The old Travelpayouts short link opened the Aviasales homepage with only a
 * marker. Aviasales then tried to relaunch a saved search and showed
 * "Oops, the search failed to launch" with empty From/To.
 *
 * A working link uses Aviasales' documented path:
 *   https://www.aviasales.com/search/{ORIGIN}{DDMM}{DEST}{DDMM}{adults}
 * Economy adds no class letter. The Travelpayouts help center says the date
 * is day and month only — two digits each, with no year. Exact searches are
 * built only when that day-month encoding still opens the selected years.
 * The Travelpayouts marker is the same account marker already configured
 * for this site (env, or the marker on the existing search widget).
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

/**
 * Hobby's airport code. Some Aviasales tools also treat HOU as a Houston
 * city code. Exact searches pass the code the traveler typed and do not
 * swap it for IAH or for a second airport.
 */
export const HOUSTON_ORIGIN_IATA = 'HOU'

export type AviasalesTripClass = 'economy' | 'business' | 'comfort' | 'first'

/**
 * City codes Aviasales searches as several airports. An exact handoff has
 * to name one airport, so these are rejected instead of being forwarded.
 */
const METRO_CODES = new Set([
  'BJS',
  'BUE',
  'CHI',
  'LON',
  'MIL',
  'MOW',
  'NYC',
  'OSA',
  'PAR',
  'RIO',
  'ROM',
  'SAO',
  'SEL',
  'STO',
  'TYO',
  'WAS',
  'YTO',
])

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const PARTNER_FARE_NOTE =
  'Fares are set by the partner and may change. Baggage and fare rules vary by airline and must be checked on the partner site.'

export const DISCOVERY_HANDOFF_NOTE =
  'Choose your airports and dates on Aviasales. This link is not an exact-trip quote. ' +
  PARTNER_FARE_NOTE

export type AviasalesSearchInput = {
  origin?: string | null
  destination?: string | null
  departDate?: Date | string | null
  returnDate?: Date | string | null
  adults?: number
  tripClass?: AviasalesTripClass
  /** Test clock. Production callers leave this empty. */
  today?: string | null
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

function formatDDMM(ymd: YMD): string {
  return String(ymd.d).padStart(2, '0') + String(ymd.m).padStart(2, '0')
}

function formatIso(ymd: YMD): string {
  return `${ymd.y}-${String(ymd.m).padStart(2, '0')}-${String(ymd.d).padStart(2, '0')}`
}

/** Calendar date in America/Chicago, so UTC midnight does not pick the wrong day. */
export function chicagoCalendarDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value
  return `${year}-${month}-${day}`
}

function parseExactIso(value: string): YMD | null {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
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

function calendarDateInput(value: Date | string | null | undefined): string | null {
  if (value == null || value === '') return null
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null
    return formatIso({
      y: value.getUTCFullYear(),
      m: value.getUTCMonth() + 1,
      d: value.getUTCDate(),
    })
  }
  return value.trim()
}

function classLetter(tripClass: AviasalesTripClass): string {
  // Aviasales docs: economy is empty. Business is "c", not "b".
  if (tripClass === 'business') return 'c'
  if (tripClass === 'comfort') return 'w'
  if (tripClass === 'first') return 'f'
  return ''
}

function prefillAdults(adults: number | undefined): number {
  if (!Number.isInteger(adults) || (adults as number) < 1 || (adults as number) > 9) return 1
  return adults as number
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

export function formatCalendarDate(iso: string): string {
  const parsed = parseExactIso(iso)
  if (!parsed) return iso
  return `${MONTH_NAMES[parsed.m - 1]} ${parsed.d}, ${parsed.y}`
}

function withMarker(url: URL): string {
  const marker = getAviasalesMarker()
  if (marker) url.searchParams.set('marker', marker)
  return url.toString()
}

/**
 * First calendar date on or after `notBefore` with this month and day.
 * That is the only year an Aviasales DDMM link can select.
 */
function resolveDdmm(month: number, day: number, notBefore: YMD): YMD | null {
  for (let year = notBefore.y; year <= notBefore.y + 1; year += 1) {
    const candidate = parseExactIso(
      `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    )
    if (!candidate) continue
    if (compareYmd(candidate, notBefore) >= 0) return candidate
  }
  return null
}

export type ExactRoundTripInput = {
  origin?: string | null
  destination?: string | null
  departDate?: string | null
  returnDate?: string | null
  adults?: number | null
  tripClass?: string | null
  /** YYYY-MM-DD. Tests pin this. Omitted means today's date in Chicago. */
  today?: string | null
}

export type ExactRoundTripSuccess = {
  ok: true
  url: string
  path: string
  origin: string
  destination: string
  departDate: string
  returnDate: string
  adults: number
  tripClass: AviasalesTripClass
  summary: string
}

export type ExactRoundTripResult = ExactRoundTripSuccess | { ok: false; errors: string[] }

function readAirport(value: string | null | undefined, label: string, errors: string[]): string | null {
  if (value == null || value.trim() === '') {
    errors.push(`${label} airport code is required. We will not guess it.`)
    return null
  }
  const code = value.trim().toUpperCase()
  if (!/^[A-Z]{3}$/.test(code)) {
    errors.push(`${label} must be a 3-letter airport code. We will not substitute a different airport.`)
    return null
  }
  if (METRO_CODES.has(code)) {
    errors.push(`${code} is a city code, not one airport. Enter a single airport code. We will not pick one for you.`)
    return null
  }
  return code
}

function readIso(value: string | null | undefined, label: string, errors: string[]): YMD | null {
  if (value == null || value.trim() === '') {
    errors.push(`${label} date is required. We will not guess it.`)
    return null
  }
  const trimmed = value.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    errors.push(`${label} date must be YYYY-MM-DD. We will not move it to another day.`)
    return null
  }
  const parsed = parseExactIso(trimmed)
  if (!parsed) {
    errors.push(`${label} date is not a real calendar date.`)
    return null
  }
  if (parsed.m === 2 && parsed.d === 29) {
    errors.push(
      'February 29 cannot be locked in an Aviasales link, because the link has no year. Enter that date on the partner site.'
    )
    return null
  }
  return parsed
}

function readAdults(adults: number | null | undefined, errors: string[]): number | null {
  if (adults == null) {
    errors.push('Enter the number of adults from 1 to 9. We will not guess it.')
    return null
  }
  if (!Number.isInteger(adults) || adults < 1 || adults > 9) {
    errors.push('Adults must be a whole number from 1 to 9. We will not change the number.')
    return null
  }
  return adults
}

function readCabin(tripClass: string | null | undefined, errors: string[]): AviasalesTripClass | null {
  if (tripClass == null || tripClass.trim() === '') {
    errors.push('Choose a cabin: economy, business, comfort, or first.')
    return null
  }
  const cabin = tripClass.trim().toLowerCase()
  if (cabin === 'economy' || cabin === 'business' || cabin === 'comfort' || cabin === 'first') {
    return cabin
  }
  errors.push('Cabin must be economy, business, comfort, or first. We will not change it.')
  return null
}

function yearMismatch(label: string, requested: YMD, resolved: YMD | null): string {
  const requestedText = formatCalendarDate(formatIso(requested))
  if (!resolved) {
    return `${label} ${requestedText} cannot be kept in an Aviasales link. Enter that date on the partner site.`
  }
  return `${label} ${requestedText} would open as ${formatCalendarDate(formatIso(resolved))}. Aviasales links store the day and month only, so this link is not created.`
}

/**
 * Round-trip search URL that keeps the typed airport codes and both full
 * dates. Missing or unsafe inputs return errors and no URL.
 */
export function buildExactAviasalesRoundTrip(input: ExactRoundTripInput): ExactRoundTripResult {
  const errors: string[] = []
  const origin = readAirport(input.origin, 'Origin', errors)
  const destination = readAirport(input.destination, 'Destination', errors)
  if (origin && destination && origin === destination) {
    errors.push('Origin and destination must be different airports.')
  }
  const depart = readIso(input.departDate, 'Departure', errors)
  const ret = readIso(input.returnDate, 'Return', errors)
  const adults = readAdults(input.adults, errors)
  const tripClass = readCabin(input.tripClass, errors)

  let today = chicagoCalendarDate()
  if (input.today != null && input.today.trim() !== '') {
    const parsedToday = parseExactIso(input.today.trim())
    if (!parsedToday) {
      errors.push('Today must be YYYY-MM-DD.')
    } else {
      today = formatIso(parsedToday)
    }
  }
  const todayYmd = parseExactIso(today)

  if (!origin || !destination || !depart || !ret || adults == null || !tripClass || !todayYmd) {
    return { ok: false, errors }
  }
  if (compareYmd(depart, todayYmd) <= 0) {
    errors.push('Departure must be after today (America/Chicago). We will not move the date.')
  }
  if (compareYmd(ret, depart) <= 0) {
    errors.push('Return date must be after the departure date. We will not move either date.')
  }
  if (errors.length > 0) return { ok: false, errors }

  const resolvedDepart = resolveDdmm(depart.m, depart.d, todayYmd)
  const resolvedReturn = resolveDdmm(ret.m, ret.d, depart)
  if (!resolvedDepart || compareYmd(resolvedDepart, depart) !== 0) {
    errors.push(yearMismatch('Departure', depart, resolvedDepart))
  }
  if (!resolvedReturn || compareYmd(resolvedReturn, ret) !== 0) {
    errors.push(yearMismatch('Return', ret, resolvedReturn))
  }
  if (errors.length > 0) return { ok: false, errors }

  const path = `${origin}${formatDDMM(depart)}${destination}${formatDDMM(ret)}${classLetter(tripClass)}${adults}`
  const departIso = formatIso(depart)
  const returnIso = formatIso(ret)
  const cabinLabel = tripClass.charAt(0).toUpperCase() + tripClass.slice(1)
  const adultLabel = adults === 1 ? '1 adult' : `${adults} adults`
  const summary = `Round trip · ${origin} → ${destination} · Depart ${formatCalendarDate(departIso)} · Return ${formatCalendarDate(returnIso)} · ${adultLabel} · ${cabinLabel}. These are the airports and dates in this search. ${PARTNER_FARE_NOTE}`
  const url = withMarker(new URL(`https://www.aviasales.com/search/${path}`))
  return {
    ok: true,
    url,
    path,
    origin,
    destination,
    departDate: departIso,
    returnDate: returnIso,
    adults,
    tripClass,
    summary,
  }
}

export type FlightHandoff =
  | { type: 'exact'; url: string; summary: string }
  | { type: 'discovery'; url: string }
  | { type: 'invalid'; errors: string[] }

function blankToNull(value: string | number | null | undefined): string | null {
  if (value == null) return null
  const text = String(value).trim()
  return text === '' ? null : text
}

/**
 * Flight redirect contract. A partial date or passenger field is an error.
 * A request with no dates stays a date-free partner form.
 */
export function flightHandoffDecision(input: {
  origin?: string | null
  destination?: string | null
  departDate?: string | null
  returnDate?: string | null
  adults?: string | number | null
  tripClass?: string | null
  today?: string | null
}): FlightHandoff {
  const departDate = blankToNull(input.departDate)
  const returnDate = blankToNull(input.returnDate)
  const adultsText = blankToNull(input.adults)
  const cabinText = blankToNull(input.tripClass)
  const startedExact = Boolean(departDate || returnDate || adultsText || cabinText)

  if (!startedExact) {
    return {
      type: 'discovery',
      url: buildAviasalesCityPrefillUrl({
        origin: input.origin,
        destination: input.destination,
      }),
    }
  }

  const adults =
    adultsText == null ? null : /^[1-9]$/.test(adultsText) ? Number(adultsText) : Number.NaN

  const exact = buildExactAviasalesRoundTrip({
    origin: input.origin,
    destination: input.destination,
    departDate,
    returnDate,
    adults,
    tripClass: cabinText ?? 'economy',
    today: input.today,
  })
  if (!exact.ok) return { type: 'invalid', errors: exact.errors }
  return { type: 'exact', url: exact.url, summary: exact.summary }
}

/**
 * Dated search when the exact contract passes. Otherwise a date-free form.
 * Never invents a departure, a return, or a different airport.
 */
export function buildAviasalesSearchUrl(input: AviasalesSearchInput = {}): string {
  const departDate = calendarDateInput(input.departDate)
  const returnDate = calendarDateInput(input.returnDate)
  if (departDate || returnDate) {
    const exact = buildExactAviasalesRoundTrip({
      origin: input.origin,
      destination: input.destination,
      departDate,
      returnDate,
      adults: input.adults,
      tripClass: input.tripClass,
      today: input.today,
    })
    if (exact.ok) return exact.url
  }
  return buildAviasalesCityPrefillUrl(input)
}

function prefillCode(code: string | null | undefined): string | null {
  if (code == null || code.trim() === '') return null
  const upper = code.trim().toUpperCase()
  return /^[A-Z]{3}$/.test(upper) ? upper : null
}

/**
 * Search form with the cities filled in and no dates.
 * The string does not change from day to day. It is not an exact-trip quote.
 * A blank origin uses Houston (HOU). A non-empty origin that is not a
 * 3-letter code is left off the link instead of being replaced.
 */
export function buildAviasalesCityPrefillUrl(
  input: Pick<AviasalesSearchInput, 'origin' | 'destination' | 'adults' | 'tripClass'> = {}
): string {
  const adults = prefillAdults(input.adults)
  const tripClass = input.tripClass ?? 'economy'
  const cabin = classLetter(tripClass)
  const originBlank = input.origin == null || input.origin.trim() === ''
  const destinationBlank = input.destination == null || input.destination.trim() === ''
  const origin = originBlank ? HOUSTON_ORIGIN_IATA : prefillCode(input.origin)
  const destination = destinationBlank ? null : prefillCode(input.destination)
  const url = new URL('https://www.aviasales.com/')
  if (!origin) return withMarker(url)
  if (!destinationBlank && !destination) {
    url.searchParams.set('params', `${origin}${cabin}${adults}`)
    return withMarker(url)
  }
  const path = destination ? `${origin}${destination}${cabin}${adults}` : `${origin}${cabin}${adults}`
  url.searchParams.set('params', path)
  return withMarker(url)
}
