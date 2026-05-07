'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { trackCTA } from '../lib/analytics'

type Props = {
  /** Legacy/simple API */
  destination?: string
  /** Existing API used across current pages */
  title?: string
  subtitle?: string
  href?: string
  ctaLabel?: string
  /** Fire after scroll depth (px) to avoid distracting immediate pop-in */
  revealAfterPx?: number
}

export default function StickyTripCTA({
  destination,
  title,
  subtitle,
  href,
  ctaLabel,
  revealAfterPx = 400,
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > revealAfterPx)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [revealAfterPx])

  if (!visible) return null

  const resolvedHref = href || (destination ? `/?destination=${encodeURIComponent(destination)}` : '/')
  const resolvedLabel = ctaLabel || `Plan My Free ${destination ? `${destination} ` : ''}Itinerary ->`

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-sm z-50">
      <div className="glass-strong border border-neon-cyan/30 rounded-xl p-4 shadow-lg shadow-black/40">
        {title ? (
          <p className="font-semibold text-white text-sm md:text-base leading-snug mb-1">{title}</p>
        ) : null}
        {subtitle ? <p className="text-white/60 text-xs md:text-sm mb-3">{subtitle}</p> : null}
        <Link
          href={resolvedHref}
          className="block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-6 rounded-xl shadow-2xl text-center transition"
          onClick={() => {
            if (typeof window !== 'undefined' && 'gtag' in window) {
              ;(window as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'cta_click', {
                source: 'sticky',
                destination,
              })
            }
            trackCTA(`sticky:${resolvedLabel}`, 'sticky_banner')
          }}
        >
          {resolvedLabel}
        </Link>
      </div>
    </div>
  )
}
