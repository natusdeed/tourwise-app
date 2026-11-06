'use client'

import { useMemo, useState } from 'react'
import { AFFILIATE_LINK_REL } from '@/lib/affiliate-links'
import { buildExactAviasalesRoundTrip, type AviasalesTripClass } from '@/lib/aviasales'
import { trackAffiliateClick } from '@/utils/analytics'

const CABINS: { value: AviasalesTripClass; label: string }[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
]

const fieldClass =
  'w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40'

/**
 * Owned round-trip fields. The partner link is created only after the
 * airport codes and both dates pass the exact-search check.
 */
export default function ExactFlightSearch() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [adults, setAdults] = useState('1')
  const [tripClass, setTripClass] = useState<AviasalesTripClass>('economy')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    const adultCount = /^[1-9]$/.test(adults) ? Number(adults) : Number.NaN
    return buildExactAviasalesRoundTrip({
      origin,
      destination,
      departDate,
      returnDate,
      adults: adultCount,
      tripClass,
    })
  }, [submitted, origin, destination, departDate, returnDate, adults, tripClass])

  return (
    <form
      id="exact-flight-search"
      className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <h3 className="heading-robotic text-lg font-semibold text-white">Round-trip airport and date search</h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
        Enter one origin airport, one destination airport, and both dates, including the year.
        Missing fields are not filled in. This search is one cabin and adults only. Children and
        one-way trips are not sent from here.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm text-white/80">
          Origin airport
          <input
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className={`${fieldClass} mt-1 uppercase`}
            placeholder="IAD"
            autoComplete="off"
            maxLength={3}
            aria-label="Origin airport code"
          />
        </label>
        <label className="block text-sm text-white/80">
          Destination airport
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className={`${fieldClass} mt-1 uppercase`}
            placeholder="IAH"
            autoComplete="off"
            maxLength={3}
            aria-label="Destination airport code"
          />
        </label>
        <label className="block text-sm text-white/80">
          Departure
          <input
            type="date"
            value={departDate}
            onChange={(event) => setDepartDate(event.target.value)}
            className={`${fieldClass} mt-1`}
            aria-label="Departure date"
          />
        </label>
        <label className="block text-sm text-white/80">
          Return
          <input
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
            className={`${fieldClass} mt-1`}
            aria-label="Return date"
          />
        </label>
        <label className="block text-sm text-white/80">
          Adults
          <input
            type="number"
            min={1}
            max={9}
            step={1}
            value={adults}
            onChange={(event) => setAdults(event.target.value)}
            className={`${fieldClass} mt-1`}
            aria-label="Number of adults"
          />
        </label>
        <label className="block text-sm text-white/80">
          Cabin
          <select
            value={tripClass}
            onChange={(event) => setTripClass(event.target.value as AviasalesTripClass)}
            className={`${fieldClass} mt-1`}
            aria-label="Cabin"
          >
            {CABINS.map((cabin) => (
              <option key={cabin.value} value={cabin.value} className="text-black">
                {cabin.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
      >
        Check this trip
      </button>
      {result && !result.ok ? (
        <p role="alert" className="mt-3 text-sm leading-relaxed text-amber-200">
          {result.errors.join(' ')}
        </p>
      ) : null}
      {result?.ok ? (
        <div className="mt-4 space-y-2">
          <p className="text-sm leading-relaxed text-white/80">{result.summary}</p>
          <a
            href={result.url}
            target="_blank"
            rel={AFFILIATE_LINK_REL}
            className="inline-flex max-w-full rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20"
            onClick={() => trackAffiliateClick('exact_round_trip', result.url)}
          >
            Compare these airports and dates on Aviasales
          </a>
        </div>
      ) : null}
    </form>
  )
}
