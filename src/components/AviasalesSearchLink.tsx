'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { AFFILIATE_LINK_REL } from '@/lib/affiliate-links'
import {
  buildAviasalesCityPrefillUrl,
  buildAviasalesSearchUrl,
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

/**
 * Flight link whose sample dates are chosen in the browser, not at build time.
 * Static HTML only includes a date-free form (cities filled in). After the
 * page loads, and again on click, the href becomes a real search for dates
 * that are still in the future.
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
  const prefill = buildAviasalesCityPrefillUrl({ origin, destination, adults, tripClass })
  const [href, setHref] = useState(prefill)

  useEffect(() => {
    setHref(
      buildAviasalesSearchUrl({
        origin,
        destination,
        departDate,
        returnDate,
        adults,
        tripClass,
      })
    )
  }, [origin, destination, departDate, returnDate, adults, tripClass])

  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel={AFFILIATE_LINK_REL}
      onClick={(event) => {
        const fresh = buildAviasalesSearchUrl({
          origin,
          destination,
          departDate,
          returnDate,
          adults,
          tripClass,
        })
        event.currentTarget.href = fresh
        setHref(fresh)
        trackAffiliateClick(trackingLabel ?? 'aviasales_search', fresh, analyticsPrice)
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
