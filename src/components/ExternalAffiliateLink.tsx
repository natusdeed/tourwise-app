'use client'

import type { ComponentProps } from 'react'
import { AFFILIATE_LINK_REL } from '@/lib/affiliate-links'
import { trackAffiliateClick } from '@/utils/analytics'

export type ExternalAffiliateLinkProps = Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'> & {
  href: string
  trackingLabel?: string
  /** Optional price for GA affiliate_click events */
  analyticsPrice?: number
}

/**
 * Outbound Travelpayouts / partner link with required SEO-safe rel + new-tab behavior.
 */
export default function ExternalAffiliateLink({
  href,
  trackingLabel,
  analyticsPrice,
  children,
  onClick,
  ...rest
}: ExternalAffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel={AFFILIATE_LINK_REL}
      onClick={(e) => {
        trackAffiliateClick(trackingLabel ?? 'external_affiliate', href, analyticsPrice)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
