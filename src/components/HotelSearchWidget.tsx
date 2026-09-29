'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

/**
 * Travelpayouts Hotelook hotel search widget for TourWiseAI.
 *
 * Setup (owner, one time):
 *   Travelpayouts dashboard -> Tools -> Widgets -> Hotel search
 *   -> copy YOUR embed URL (it contains your shmarker/trs)
 *   -> set NEXT_PUBLIC_HOTELOOK_WIDGET_SRC to that URL in Vercel env vars.
 *
 * Until the env var is set this component renders nothing, so the page
 * never shows a broken or unattributed widget.
 */
const HOTEL_WIDGET_SRC = process.env.NEXT_PUBLIC_HOTELOOK_WIDGET_SRC || ''

const SCRIPT_ID = 'hotellook-hotel-search-widget'

type Props = {
  className?: string
}

export default function HotelSearchWidget({ className }: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!HOTEL_WIDGET_SRC) return
    if (!scriptLoaded || !containerRef.current) return

    const moveWidgetIntoContainer = () => {
      const container = containerRef.current
      if (!container) return false

      const scriptEl = document.getElementById(SCRIPT_ID)
      const sibling = scriptEl?.previousElementSibling
      if (
        sibling &&
        sibling !== container &&
        !container.contains(sibling) &&
        (sibling.hasAttribute('data-cascoon-id') ||
          sibling.querySelector('input, [role="combobox"], button') ||
          Boolean(sibling.shadowRoot))
      ) {
        container.appendChild(sibling)
        setWidgetReady(true)
        return true
      }

      const cascoon = document.querySelector<HTMLElement>('[data-cascoon-id]')
      if (cascoon && !container.contains(cascoon)) {
        container.appendChild(cascoon)
        setWidgetReady(true)
        return true
      }

      return false
    }

    if (moveWidgetIntoContainer()) return

    const observer = new MutationObserver(() => {
      if (moveWidgetIntoContainer()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const timeout = window.setTimeout(() => {
      observer.disconnect()
      // Don't leave the skeleton forever if markup never appears
      setWidgetReady(true)
    }, 8000)

    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [scriptLoaded])

  if (!HOTEL_WIDGET_SRC) return null

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}
    >
      {!widgetReady && (
        <div
          className="w-full h-[90px] rounded-md bg-white/10 animate-pulse"
          aria-hidden="true"
        />
      )}
      <Script
        id={SCRIPT_ID}
        src={HOTEL_WIDGET_SRC}
        strategy="afterInteractive"
        charSet="utf-8"
        onLoad={() => setScriptLoaded(true)}
      />
    </div>
  )
}
