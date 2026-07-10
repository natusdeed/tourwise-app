'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

/**
 * Exact Aviasales / Travelpayouts search widget for TourWiseAI.
 * Do not alter the URL — every query param is account- and brand-specific.
 */
const AVIASALES_WIDGET_SRC =
  'https://tpwidg.com/content?currency=usd&trs=484247&shmarker=692947&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23C9922A&color_button=%230A1F44&color_icons=%230A1F44&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23D8C29A&color_focused=%23C9922A&border_radius=1&plain=false&promo_id=7879&campaign_id=100'

const SCRIPT_ID = 'aviasales-flight-search-widget'

type Props = {
  className?: string
}

/**
 * Loads the real Aviasales search form with next/script (afterInteractive).
 *
 * Travelpayouts injects its UI as a sibling before the script tag. Next.js places
 * afterInteractive scripts on document.body, so after load we move the injected
 * widget node into this container so it appears where the component is placed.
 */
export default function FlightSearchWidget({ className }: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
        src={AVIASALES_WIDGET_SRC}
        strategy="afterInteractive"
        charSet="utf-8"
        onLoad={() => setScriptLoaded(true)}
      />
    </div>
  )
}
