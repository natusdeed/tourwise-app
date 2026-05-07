import { CalendarRange, MapPin } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string
  description?: string
  duration?: string
  region?: string
  href?: string
  ctaLabel?: string
}

export default function ItineraryCard({
  title,
  description,
  duration,
  region,
  href,
  ctaLabel = 'View itinerary',
}: Props) {
  const CardInner = (
    <>
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 p-2">
          <MapPin className="w-5 h-5 text-neon-cyan" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white heading-robotic">{title}</h3>
          {duration ? (
            <p className="text-xs uppercase tracking-wide text-white/55 flex items-center gap-2">
              <CalendarRange className="w-4 h-4" />
              {duration}
            </p>
          ) : null}
          {region ? (
            <p className="text-sm text-neon-cyan/90">{region}</p>
          ) : null}
        </div>
      </div>
      {description ? (
        <p className="text-sm text-white/70 leading-relaxed mt-4">{description}</p>
      ) : null}
      {href ? (
        <div className="mt-5">
          <span className="text-sm font-semibold text-neon-cyan">{ctaLabel} →</span>
        </div>
      ) : null}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="block glass-strong border border-neon-cyan/20 rounded-xl p-5 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.08)] transition-all duration-200"
      >
        {CardInner}
      </Link>
    )
  }

  return (
    <article className="glass-strong border border-neon-cyan/20 rounded-xl p-5">
      {CardInner}
    </article>
  )
}
