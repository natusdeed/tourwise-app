import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import type { AffiliateLinkItem } from '@/lib/affiliate-links'

type AffiliateCardProps = {
  affiliate: AffiliateLinkItem
  title?: string
  trackingLabel?: string
  className?: string
}

export default function AffiliateCard({
  affiliate,
  title,
  trackingLabel,
  className = '',
}: AffiliateCardProps) {
  return (
    <article className={`glass-strong rounded-xl border border-white/10 p-5 ${className}`.trim()}>
      <p className="text-xs uppercase tracking-wide text-neon-cyan/80">{affiliate.category}</p>
      <h3 className="mt-1 text-lg font-semibold text-white heading-robotic">{title ?? affiliate.name}</h3>
      <p className="mt-2 text-sm text-white/70">{affiliate.description}</p>
      <ExternalAffiliateLink
        href={affiliate.url}
        trackingLabel={trackingLabel ?? `affiliate_card_${affiliate.name.toLowerCase().replace(/\s+/g, '_')}`}
        className="mt-4 inline-flex rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20"
      >
        {affiliate.recommendedButtonText}
      </ExternalAffiliateLink>
    </article>
  )
}
