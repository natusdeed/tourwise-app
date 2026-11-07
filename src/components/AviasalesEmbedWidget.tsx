'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { useConsent } from '@/components/useConsent'

type Props = {
  src: string
  scriptId: string
  className?: string
}

/**
 * Loads one Travelpayouts tpwidg embed after the block is near the screen.
 * The third-party script is not on the page during first paint, so it does
 * not compete with the main heading. Next.js puts the script on document.body;
 * the widget inserts itself just before that script, and we move it here.
 */
export default function AviasalesEmbedWidget({ src, scriptId, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const consent = useConsent()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)

  useEffect(() => {
    setScriptLoaded(false)
    setWidgetReady(false)
  }, [src, scriptId])

  useEffect(() => {
    const node = containerRef.current
    if (!node || shouldLoad || consent !== 'accepted') return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad, consent])

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current) return

    const moveWidgetIntoContainer = () => {
      const container = containerRef.current
      const scriptEl = document.getElementById(scriptId)
      if (!container || !scriptEl) return false

      const sibling = scriptEl.previousElementSibling
      if (
        sibling instanceof HTMLElement &&
        sibling !== container &&
        !container.contains(sibling) &&
        (sibling.hasAttribute('data-cascoon-id') || sibling.tagName === 'TP-CASCOON')
      ) {
        container.appendChild(sibling)
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
      setWidgetReady(true)
    }, 8000)

    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [scriptLoaded, scriptId])

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-w-0 max-w-full overflow-x-hidden pb-8 ${className ?? ''}`}
    >
      {consent !== 'accepted' ? (
        <p className="text-sm text-white/60">
          The Aviasales search form and route examples appear after you accept cookies and the page
          reloads.
        </p>
      ) : null}
      {consent === 'accepted' && !widgetReady && (
        <div className="h-28 w-full rounded-md bg-white/10 animate-pulse" aria-hidden="true" />
      )}
      {shouldLoad ? (
        <Script
          id={scriptId}
          src={src}
          strategy="afterInteractive"
          charSet="utf-8"
          onLoad={() => setScriptLoaded(true)}
        />
      ) : null}
    </div>
  )
}
