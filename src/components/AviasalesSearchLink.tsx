'use client'

import { useState, type ComponentProps } from 'react'
import { AFFILIATE_LINK_REL } from '@/lib/affiliate-links'
import {
  DISCOVERY_HANDOFF_NOTE,
  buildAviasalesCityPrefillUrl,
  buildExactAviasalesRoundTrip,
  type AviasalesTripClass,
} from '@/lib/aviasales'
import { trackAffiliateClick } from '@/utils/analytics'

type Props = Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'> & {
  origin?: string | null
  destination?: string | null
  departDate?: string | null
  returnDate?: string | null
  adults?: number
  tripClass?: AviasalesTripClass
  trackingLabel?: string
  analyticsPrice?: number
}

function hasText(value: string | null | undefined): boolean {
  return value != null && value.trim() !== ''
}

/**
 * Flight handoff. With both dates, the href is the exact round trip or the
 * link stays date-free and the validation message explains why. Without
 * dates, the href is the partner form and does not invent a trip.
 */
export default function AviasalesSearchLink({
  origin,
  destination,
  departDate,
  returnDate,
  adults,
  tripClass,
  trackingLabel,
  analyticsPrice,
  onClick,
  children,
  ...rest
}: Props) {
  const exactAttempt = hasText(departDate) || hasText(returnDate)
  const exact = exactAttempt
    ? buildExactAviasalesRoundTrip({
        origin,
        destination,
        departDate,
        returnDate,
        adults,
        tripClass,
      })
    : null
  const prefill = buildAviasalesCityPrefillUrl({ origin, destination, adults, tripClass })
  const href = exact?.ok ? exact.url : prefill
  const [blocked, setBlocked] = useState<string | null>(null)

  return (
    <span className="inline-flex min-w-0 max-w-full flex-col items-stretch">
      <a
        {...rest}
        href={href}
        target="_blank"
        rel={AFFILIATE_LINK_REL}
        onClick={(event) => {
          if (exact?.ok) {
            const again = buildExactAviasalesRoundTrip({
              origin,
              destination,
              departDate,
              returnDate,
              adults,
              tripClass,
            })
            if (!again.ok || again.url !== href) {
              event.preventDefault()
              setBlocked(
                again.ok
                  ? 'This search no longer matches the selected dates. We will not change them.'
                  : again.errors.join(' ')
              )
              return
            }
          }
          trackAffiliateClick(trackingLabel ?? 'aviasales_search', href, analyticsPrice)
          onClick?.(event)
        }}
      >
        {children}
      </a>
      {exact?.ok ? (
        <span className="mt-1 text-xs leading-relaxed text-white/60">{exact.summary}</span>
      ) : null}
      {exact && !exact.ok ? (
        <span role="alert" className="mt-1 text-xs leading-relaxed text-amber-200">
          {exact.errors.join(' ')}
        </span>
      ) : null}
      {!exact ? (
        <span className="mt-1 text-xs leading-relaxed text-white/50">{DISCOVERY_HANDOFF_NOTE}</span>
      ) : null}
      {blocked ? (
        <span role="alert" className="mt-1 text-xs leading-relaxed text-amber-200">
          {blocked}
        </span>
      ) : null}
    </span>
  )
}
