'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ExitIntentPopup = dynamic(() => import('@/components/ExitIntentPopup'), { ssr: false })

/**
 * The exit-intent popup pulls in animation code that is not needed for the
 * first paint. Load it after the page load so it does not extend the main-thread
 * work that Lighthouse counts.
 */
export default function DeferredExitIntent() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId = 0
    let timeoutId = 0
    const start = () => setReady(true)
    const onLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 4000 })
      } else {
        timeoutId = window.setTimeout(start, 2000)
      }
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => {
      window.removeEventListener('load', onLoad)
      if (idleId) window.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  if (!ready) return null
  return <ExitIntentPopup />
}
