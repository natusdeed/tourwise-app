'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { AVIASALES_WIDGET_SRC } from '@/lib/aviasales'

/**
 * Exact Aviasales / Travelpayouts search widget for TourWiseAI.
 * The embed URL lives in lib/aviasales.ts so the account marker is not copied
 * a second time. searchUrl is www.aviasales.com/search, which is the results
 * prefix Aviasales documents (the widget appends the route path).
 */

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

      // Only the node inserted before this script. A page can host more than
      // one tpwidg embed, and a document-wide query would move the wrong one.
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
    <div className={className} style={{ width: '100%', maxWidth: '100%' }}>
      <p className="mb-3 max-w-3xl text-sm leading-relaxed text-white/60">
        This is Aviasales&apos; own search form. TourWiseAI does not choose airports or dates here.
        Fares are set by the partner and may change. Baggage and fare rules vary by airline and must
        be checked on the partner site.
      </p>
      <div ref={containerRef} style={{ width: '100%', maxWidth: '100%' }}>
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
    </div>
  )
}
