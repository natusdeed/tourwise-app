/**
 * Cheapest Houston departure dates from the Aviasales Data API.
 *
 * This module is server-only. The Travelpayouts token is read here and sent
 * as a header. It is never returned, logged, or placed in a page URL.
 * When the token is missing or the API has no fares, the result is an empty
 * list so the page can hide the section and still build.
 */
import 'server-only'

import { HOUSTON_ORIGIN_IATA, buildExactAviasalesRoundTrip } from '@/lib/aviasales'
import { getServerEnv } from '@/lib/server-env'

const PRICES_FOR_DATES = 'https://api.travelpayouts.com/aviasales/v3/prices_for_dates'
const GROUPED_PRICES = 'https://api.travelpayouts.com/aviasales/v3/grouped_prices'
const MONTH_MATRIX = 'https://api.travelpayouts.com/v2/prices/month-matrix'

/** Refresh cached fares every 6 hours. */
const REVALIDATE_SECONDS = 21600
const MAX_DATES = 8
const PAGE_LIMIT = '30'

export type HoustonFareDate = {
  departDate: string
  returnDate: string | null
  price: number
  airline: string | null
  searchUrl: string
  /** Calendar date the partner sample was captured, when the payload includes one. */
  capturedOn: string | null
}

type RawFare = {
  departDate: string
  returnDate: string | null
  price: number
  airline: string | null
  capturedOn: string | null
}

/**
 * Up to 8 cheapest round-trip dates from Houston to one destination.
 * Dates cover this month and the next month. Only fares the API actually
 * returned are included.
 */
export async function getCheapestDatesFromHouston(
  destination: string | null | undefined
): Promise<HoustonFareDate[]> {
  const dest = normalizeIata(destination)
  if (!dest || dest === HOUSTON_ORIGIN_IATA) return []

  const token = getServerEnv().travelpayoutsToken?.trim()
  if (!token) return []

  const months = nextMonthKeys(2)
  const earliest = tomorrowIso()

  try {
    // Page 1 is the cheapest offers. If those collapse onto a few departure
    // days, ask for the next page and then the per-day endpoints so the
    // list can reach several different dates.
    let raw = await fetchPricesForDates(token, dest, months, ['1'])
    let ranked = rankFares(raw, dest, months, earliest)
    if (ranked.length < 5) {
      raw = [...raw, ...(await fetchPricesForDates(token, dest, months, ['2']))]
      ranked = rankFares(raw, dest, months, earliest)
    }
    if (ranked.length < 5) {
      raw = [...raw, ...(await fetchGroupedPrices(token, dest, months))]
      ranked = rankFares(raw, dest, months, earliest)
    }
    if (ranked.length < 5) {
      raw = [...raw, ...(await fetchMonthMatrix(token, dest, months))]
      ranked = rankFares(raw, dest, months, earliest)
    }
    return ranked
  } catch {
    return []
  }
}

async function fetchPricesForDates(
  token: string,
  destination: string,
  months: string[],
  pages: string[]
): Promise<RawFare[]> {
  const batches = await Promise.all(
    months.flatMap((month) =>
      pages.map((page) =>
        travelpayoutsGet(
          'prices_for_dates',
          PRICES_FOR_DATES,
          {
            origin: HOUSTON_ORIGIN_IATA,
            destination,
            departure_at: month,
            currency: 'usd',
            cy: 'usd',
            sorting: 'price',
            one_way: 'false',
            unique: 'false',
            direct: 'false',
            market: 'us',
            limit: PAGE_LIMIT,
            page,
          },
          token
        )
      )
    )
  )
  return batches.flatMap((payload) => faresFromPayload(payload))
}

async function fetchGroupedPrices(token: string, destination: string, months: string[]): Promise<RawFare[]> {
  const batches = await Promise.all(
    months.map((month) =>
      travelpayoutsGet(
        'grouped_prices',
        GROUPED_PRICES,
        {
          origin: HOUSTON_ORIGIN_IATA,
          destination,
          group_by: 'departure_at',
          departure_at: month,
          currency: 'usd',
          cy: 'usd',
          one_way: 'false',
          direct: 'false',
          market: 'us',
        },
        token
      )
    )
  )
  return batches.flatMap((payload) => faresFromPayload(payload))
}

async function fetchMonthMatrix(token: string, destination: string, months: string[]): Promise<RawFare[]> {
  const batches = await Promise.all(
    months.map((month) =>
      travelpayoutsGet(
        'month-matrix',
        MONTH_MATRIX,
        {
          origin: HOUSTON_ORIGIN_IATA,
          destination,
          month: `${month}-01`,
          currency: 'usd',
          show_to_affiliates: 'false',
          one_way: 'false',
          market: 'us',
          limit: '31',
        },
        token
      )
    )
  )
  return batches.flatMap((payload) => faresFromPayload(payload))
}

/**
 * GET a Travelpayouts endpoint. The token is a header, never a query param,
 * so it cannot leak into the fetch URL or a log line.
 */
async function travelpayoutsGet(
  name: string,
  endpoint: string,
  params: Record<string, string>,
  token: string
): Promise<unknown | null> {
  const url = new URL(endpoint)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'X-Access-Token': token,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) {
      console.error(`Aviasales fare dates: ${name} responded ${response.status}`)
      return null
    }
    return await response.json()
  } catch {
    console.error(`Aviasales fare dates: ${name} request failed`)
    return null
  }
}

function faresFromPayload(payload: unknown): RawFare[] {
  const root = asRecord(payload)
  if (!root || root.success === false || !currencyIsUsd(root)) return []

  const data = root.data
  if (Array.isArray(data)) {
    return data.flatMap((item) => {
      const fare = fareFromRecord(asRecord(item))
      return fare ? [fare] : []
    })
  }

  const grouped = asRecord(data)
  if (!grouped) return []
  const fares: RawFare[] = []
  for (const [key, value] of Object.entries(grouped)) {
    fares.push(...faresFromValue(value, key))
  }
  return fares
}

function faresFromValue(value: unknown, fallbackDate?: string): RawFare[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => faresFromValue(item, fallbackDate))
  }
  const fare = fareFromRecord(asRecord(value), fallbackDate)
  return fare ? [fare] : []
}

function fareFromRecord(record: Record<string, unknown> | null, fallbackDate?: string): RawFare | null {
  if (!record || !currencyIsUsd(record)) return null
  const departDate =
    dateOnly(record.departure_at) || dateOnly(record.depart_date) || dateOnly(fallbackDate)
  if (!departDate) return null

  const returnRaw = dateOnly(record.return_at) || dateOnly(record.return_date)
  const price = positivePrice(record.price) ?? positivePrice(record.value)
  if (price == null) return null

  return {
    departDate,
    returnDate: returnRaw && returnRaw > departDate ? returnRaw : null,
    price,
    airline: airlineCode(record.airline),
    capturedOn: dateOnly(record.found_at) || dateOnly(record.foundAt),
  }
}

function rankFares(
  fares: RawFare[],
  destination: string,
  months: string[],
  earliest: string
): HoustonFareDate[] {
  const cheapestByDeparture = new Map<string, RawFare>()

  for (const fare of fares) {
    if (!fare.returnDate) continue
    if (fare.departDate < earliest) continue
    if (!months.some((month) => fare.departDate.startsWith(month))) continue
    const current = cheapestByDeparture.get(fare.departDate)
    if (!current || isBetterFare(fare, current)) cheapestByDeparture.set(fare.departDate, fare)
  }

  return [...cheapestByDeparture.values()]
    .sort((a, b) => a.price - b.price || a.departDate.localeCompare(b.departDate))
    .slice(0, MAX_DATES)
    .flatMap((fare) => {
      if (!fare.returnDate) return []
      const exact = buildExactAviasalesRoundTrip({
        origin: HOUSTON_ORIGIN_IATA,
        destination,
        departDate: fare.departDate,
        returnDate: fare.returnDate,
        adults: 1,
        tripClass: 'economy',
      })
      if (!exact.ok) return []
      return [
        {
          departDate: fare.departDate,
          returnDate: fare.returnDate,
          price: fare.price,
          airline: fare.airline,
          searchUrl: exact.url,
          capturedOn: fare.capturedOn,
        },
      ]
    })
}

function isBetterFare(next: RawFare, current: RawFare): boolean {
  if (next.price !== current.price) return next.price < current.price
  if (Boolean(next.airline) !== Boolean(current.airline)) return Boolean(next.airline)
  return Boolean(next.returnDate) && !current.returnDate
}

function currencyIsUsd(payload: Record<string, unknown>): boolean {
  const currency = payload.currency
  if (typeof currency !== 'string' || currency.trim() === '') return true
  return currency.trim().toLowerCase() === 'usd'
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function dateOnly(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const check = new Date(Date.UTC(year, month - 1, day))
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null
  }
  return `${match[1]}-${match[2]}-${match[3]}`
}

function positivePrice(value: unknown): number | null {
  const price = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  if (!Number.isFinite(price) || price <= 0 || price > 100000) return null
  return Math.round(price * 100) / 100
}

function airlineCode(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const code = value.trim().toUpperCase()
  return /^[A-Z0-9]{2}$/.test(code) ? code : null
}

function normalizeIata(code: string | null | undefined): string | null {
  if (!code) return null
  const upper = code.trim().toUpperCase()
  return /^[A-Z]{3}$/.test(upper) ? upper : null
}

/** This month and the following months, as YYYY-MM. */
function nextMonthKeys(count: number): string[] {
  const now = new Date()
  const keys: string[] = []
  for (let index = 0; index < count; index += 1) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + index, 1))
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    keys.push(`${date.getUTCFullYear()}-${month}`)
  }
  return keys
}

/** First departure date Aviasales will still search: tomorrow, UTC. */
function tomorrowIso(): string {
  const now = new Date()
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${date.getUTCFullYear()}-${month}-${day}`
}
