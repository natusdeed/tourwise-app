import { AFFILIATE_LINK_REL } from '@/lib/affiliate-links'
import { getCheapestDatesFromHouston, type HoustonFareDate } from '@/lib/travelpayouts-data'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type Props = {
  /** Aviasales city or airport code for this guide or route. */
  destination: string | null
}

/**
 * Real cheapest departure dates from Houston.
 * Rendered on the server. If the API has nothing to show, the section is omitted.
 */
export default async function CheapestDatesSection({ destination }: Props) {
  const fares = await getCheapestDatesFromHouston(destination)
  if (fares.length === 0) return null

  return (
    <section
      id="cheapest-dates-from-houston"
      className="glass-strong rounded-xl border border-white/10 p-5 md:p-6 min-w-0 overflow-hidden"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-white heading-robotic break-words">
        Indicative dates from Houston
      </h2>
      <p className="text-white/60 text-sm mt-2 max-w-3xl">
        Indicative monthly samples for one adult in economy, not live or exact fares. The figure is
        not a quote for your trip. Confirm airports, dates, bags, and the total on the partner site.
        Fares are set by the partner and may change.
      </p>
      <ol className="mt-4 divide-y divide-white/10 list-none m-0 p-0">
        {fares.map((fare) => (
          <li key={fareKey(fare)} className="min-w-0">
            <a
              href={fare.searchUrl}
              target="_blank"
              rel={AFFILIATE_LINK_REL}
              aria-label={fareAriaLabel(fare)}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 min-w-0 rounded-lg hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan/70"
            >
              <span className="min-w-0">
                <span className="block text-sm text-white break-words">{formatFareRange(fare)}</span>
                {fare.airline ? (
                  <span className="block text-xs text-white/50 mt-0.5">
                    <span className="sr-only">Airline </span>
                    {fare.airline}
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 text-sm font-semibold tabular-nums text-neon-cyan">
                {formatUsd(fare.price)}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

function fareKey(fare: HoustonFareDate): string {
  return `${fare.departDate}-${fare.returnDate ?? 'oneway'}-${fare.airline ?? 'na'}-${fare.price}`
}

function formatUsd(price: number): string {
  const digits = Number.isInteger(price) ? 0 : 2
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(price)
}

function formatFareRange(fare: HoustonFareDate): string {
  if (!fare.returnDate) return formatDay(fare.departDate)
  if (fare.departDate.slice(0, 4) === fare.returnDate.slice(0, 4)) {
    return `${formatMonthDay(fare.departDate)} – ${formatMonthDay(fare.returnDate)}, ${fare.departDate.slice(0, 4)}`
  }
  return `${formatDay(fare.departDate)} – ${formatDay(fare.returnDate)}`
}

function formatDay(iso: string): string {
  return `${formatMonthDay(iso)}, ${iso.slice(0, 4)}`
}

function formatMonthDay(iso: string): string {
  const [, month, day] = iso.split('-')
  return `${MONTHS[Number(month) - 1]} ${Number(day)}`
}

function fareAriaLabel(fare: HoustonFareDate): string {
  const when = fare.returnDate
    ? `Depart ${formatDay(fare.departDate)}, return ${formatDay(fare.returnDate)}`
    : `Depart ${formatDay(fare.departDate)}`
  const airline = fare.airline ? `, airline ${fare.airline}` : ''
  return `${when}${airline}, ${formatUsd(fare.price)}. Opens Aviasales in a new tab.`
}
