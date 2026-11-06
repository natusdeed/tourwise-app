import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildAviasalesCityPrefillUrl,
  buildAviasalesSearchUrl,
  buildExactAviasalesRoundTrip,
  chicagoCalendarDate,
  flightHandoffDecision,
  getAviasalesMarker,
} from '../lib/aviasales.ts'

const TODAY = '2026-11-06'
const FIXTURE = {
  origin: 'IAD',
  destination: 'IAH',
  departDate: '2026-11-16',
  returnDate: '2026-12-14',
  adults: 1,
  tripClass: 'economy' as const,
  today: TODAY,
}

function exactFixture(overrides: Record<string, unknown> = {}) {
  return buildExactAviasalesRoundTrip({ ...FIXTURE, ...overrides })
}

test('exact round trip keeps IAD, IAH, and both full dates in order', () => {
  const result = exactFixture()
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.path, 'IAD1611IAH14121')
  assert.equal(result.origin, 'IAD')
  assert.equal(result.destination, 'IAH')
  assert.equal(result.departDate, '2026-11-16')
  assert.equal(result.returnDate, '2026-12-14')
  assert.ok(result.departDate < result.returnDate)
  const departAt = result.path.indexOf('1611')
  const returnAt = result.path.indexOf('1412')
  assert.equal(result.path.indexOf('IAD'), 0)
  assert.ok(departAt > result.path.indexOf('IAD'))
  assert.ok(result.path.indexOf('IAH') > departAt)
  assert.ok(returnAt > result.path.indexOf('IAH'))
  assert.ok(result.path.endsWith('1'))
  const url = new URL(result.url)
  assert.equal(url.pathname, '/search/IAD1611IAH14121')
  assert.equal(url.hostname, 'www.aviasales.com')
  for (const blocked of ['DCA', 'BWI', 'HOU', 'NYC']) {
    assert.equal(url.pathname.includes(blocked), false)
  }
  const marker = getAviasalesMarker()
  assert.equal(url.searchParams.get('marker'), marker || null)
  assert.equal(
    [...url.searchParams.keys()].filter((key) => key !== 'marker').length,
    0
  )
  assert.match(result.summary, /November 16, 2026/)
  assert.match(result.summary, /December 14, 2026/)
  assert.match(result.summary, /Fares are set by the partner and may change/)
  assert.match(result.summary, /Baggage and fare rules vary by airline/)
})

test('cross-year and year-end dates stay in the owned dates and the path order', () => {
  const crossYear = exactFixture({
    departDate: '2026-12-20',
    returnDate: '2027-01-05',
  })
  assert.equal(crossYear.ok, true)
  if (!crossYear.ok) return
  assert.equal(crossYear.path, 'IAD2012IAH05011')
  assert.equal(crossYear.departDate, '2026-12-20')
  assert.equal(crossYear.returnDate, '2027-01-05')
  assert.ok(crossYear.path.indexOf('2012') < crossYear.path.indexOf('0501'))

  const yearEnd = exactFixture({
    departDate: '2026-12-31',
    returnDate: '2027-01-01',
  })
  assert.equal(yearEnd.ok, true)
  if (!yearEnd.ok) return
  assert.equal(yearEnd.path, 'IAD3112IAH01011')
  assert.equal(yearEnd.departDate, '2026-12-31')
  assert.equal(yearEnd.returnDate, '2027-01-01')
})

test('a later year that the day-month link would change is rejected', () => {
  const result = exactFixture({
    departDate: '2027-11-16',
    returnDate: '2027-11-20',
  })
  assert.equal(result.ok, false)
  if (result.ok) return
  assert.match(result.errors.join(' '), /November 16, 2026/)
  assert.equal('url' in result, false)
})

test('missing, past, reversed, and invalid dates do not produce a search URL', () => {
  const cases = [
    { departDate: '', returnDate: '2026-12-14' },
    { departDate: '2026-11-16', returnDate: '' },
    { departDate: '2026-11-01', returnDate: '2026-11-08' },
    { departDate: TODAY, returnDate: '2026-11-20' },
    { departDate: '2026-12-14', returnDate: '2026-11-16' },
    { departDate: '2026-11-16', returnDate: '2026-11-16' },
    { departDate: '2026-02-31', returnDate: '2026-03-02' },
    { departDate: '16 Nov 2026', returnDate: '2026-12-14' },
    { departDate: '2028-02-29', returnDate: '2028-03-02' },
  ]
  for (const overrides of cases) {
    const result = exactFixture(overrides)
    assert.equal(result.ok, false, JSON.stringify(overrides))
  }
})

test('airport and passenger mistakes are rejected instead of substituted', () => {
  const cases = [
    { origin: '', destination: 'IAH' },
    { origin: 'washington', destination: 'IAH' },
    { origin: 'DCA', destination: 'washington' },
    { origin: 'TH', destination: 'IAH' },
    { origin: 'IAD', destination: 'IAD' },
    { origin: 'iad', destination: ' iah ' },
    { origin: "IAD<script>", destination: 'IAH' },
    { origin: 'NYC', destination: 'IAH' },
    { origin: 'LON', destination: 'IAH' },
    { adults: 0 },
    { adults: 10 },
    { adults: 1.5 },
    { adults: null },
    { tripClass: 'premium' },
    { tripClass: '' },
  ]
  for (const overrides of cases) {
    const result = exactFixture(overrides)
    if (overrides.origin === 'iad') {
      assert.equal(result.ok, true)
      if (result.ok) {
        assert.equal(result.origin, 'IAD')
        assert.equal(result.destination, 'IAH')
      }
      continue
    }
    assert.equal(result.ok, false, JSON.stringify(overrides))
    if (!result.ok) {
      assert.equal(result.errors.join(' ').includes('DCA'), false)
    }
  }
})

test('validation wording matches the approved lines', () => {
  const missing = exactFixture({ origin: '', destination: '', departDate: '', returnDate: '' })
  assert.equal(missing.ok, false)
  if (!missing.ok) {
    assert.match(missing.errors.join('\n'), /Enter an origin airport code \(for example, IAH\)\./)
    assert.match(missing.errors.join('\n'), /Enter a destination airport code\./)
    assert.match(missing.errors.join('\n'), /Choose a departure date\./)
    assert.match(missing.errors.join('\n'), /Choose a return date\./)
  }
  const past = exactFixture({ departDate: '2026-11-01' })
  assert.equal(past.ok, false)
  if (!past.ok) assert.match(past.errors.join(' '), /Choose a departure date after today \(Central Time\)\./)
  const reversed = exactFixture({ departDate: '2026-12-20', returnDate: '2026-12-01' })
  assert.equal(reversed.ok, false)
  if (!reversed.ok) assert.match(reversed.errors.join(' '), /Choose a return date after your departure date\./)
  const city = exactFixture({ origin: 'LON' })
  assert.equal(city.ok, false)
  if (!city.ok) {
    assert.match(city.errors.join(' '), /LON covers more than one airport\. Enter one airport code, such as IAH or HOU\./)
  }
  const leap = exactFixture({ departDate: '2028-02-29', returnDate: '2028-03-02' })
  assert.equal(leap.ok, false)
  if (!leap.ok) {
    assert.match(leap.errors.join(' '), /Aviasales links don't include a year, so February 29 can't be set/)
  }
  const shifted = exactFixture({ departDate: '2027-11-16', returnDate: '2027-11-20' })
  assert.equal(shifted.ok, false)
  if (!shifted.ok) {
    assert.match(
      shifted.errors.join(' '),
      /Aviasales links save only the day and month, so November 16, 2027 would open as November 16, 2026/
    )
  }
})

test('discovery links do not invent dates, and a failed exact search does not shift them', () => {
  const discovery = new URL(buildAviasalesCityPrefillUrl({ origin: 'IAD', destination: 'IAH' }))
  assert.equal(discovery.pathname, '/')
  assert.equal(discovery.searchParams.get('params'), 'IADIAH1')
  assert.equal(discovery.pathname.includes('search'), false)

  const shifted = new URL(
    buildAviasalesSearchUrl({
      ...FIXTURE,
      departDate: '2026-11-01',
      returnDate: '2026-11-08',
      today: TODAY,
    })
  )
  assert.equal(shifted.pathname, '/')
  assert.equal(shifted.pathname.includes('search'), false)

  const omitted = new URL(buildAviasalesSearchUrl({ origin: 'IAD', destination: 'IAH', today: TODAY }))
  assert.equal(omitted.pathname, '/')
})

test('the same selection keeps the same path when the clock is still before departure', () => {
  const first = exactFixture({ today: '2026-11-06' })
  const later = exactFixture({ today: '2026-11-10' })
  assert.equal(first.ok && later.ok && first.path === later.path, true)
  const tooLate = buildAviasalesSearchUrl({
    ...FIXTURE,
    today: '2026-11-20',
  })
  assert.equal(new URL(tooLate).pathname.includes('search'), false)
})

test('Chicago calendar date does not follow the UTC day', () => {
  assert.equal(chicagoCalendarDate(new Date('2026-11-06T05:30:00.000Z')), '2026-11-05')
  assert.equal(chicagoCalendarDate(new Date('2026-11-06T06:30:00.000Z')), '2026-11-06')
  assert.equal(chicagoCalendarDate(new Date('2026-03-08T07:30:00.000Z')), '2026-03-08')
  assert.equal(chicagoCalendarDate(new Date('2026-03-08T08:30:00.000Z')), '2026-03-08')
})

test('flight redirect forwards a complete trip and rejects a partial one', () => {
  const exact = flightHandoffDecision({ ...FIXTURE, adults: '1' })
  assert.equal(exact.type, 'exact')
  if (exact.type === 'exact') {
    assert.equal(new URL(exact.url).pathname, '/search/IAD1611IAH14121')
  }
  const partial = flightHandoffDecision({
    origin: 'IAD',
    destination: 'IAH',
    departDate: '2026-11-16',
    today: TODAY,
  })
  assert.equal(partial.type, 'invalid')
  const discovery = flightHandoffDecision({ destination: 'IAH' })
  assert.equal(discovery.type, 'discovery')
  if (discovery.type === 'discovery') {
    assert.equal(new URL(discovery.url).pathname, '/')
  }
})
