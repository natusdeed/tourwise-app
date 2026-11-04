import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'

const secondaryClass =
  'inline-flex max-w-full min-w-0 items-center justify-center whitespace-normal text-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan'

type Props = {
  trackingLabel: string
  className?: string
}

/** Secondary flight button. Aviasales stays the filled primary button. */
export default function KiwiCompareLink({ trackingLabel, className }: Props) {
  return (
    <ExternalAffiliateLink
      href={AFFILIATE_LINKS.flights.kiwi.url}
      trackingLabel={trackingLabel}
      rel="sponsored noopener noreferrer"
      className={className ?? secondaryClass}
      aria-label="Also compare on Kiwi.com, opens in a new tab"
    >
      Also compare on Kiwi.com
    </ExternalAffiliateLink>
  )
}
