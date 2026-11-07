'use client'

import { useEffect } from 'react'
import { readConsent } from '@/lib/consent'
import { useConsent } from '@/components/useConsent'

const DRIVE_ID = 'travelpayouts-drive'
const DRIVE_SRC = 'https://tp-em.com/NDg0MjQ3.js?t=484247'

function removeNode(id: string) {
  document.getElementById(id)?.remove()
}

function ensureScript(id: string, src: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.body.appendChild(script)
}

/**
 * Affiliate drive script and Google Analytics load only after the visitor
 * accepts cookies. Rejection removes them if they were added in this visit.
 */
export default function ConsentScripts({ gaId }: { gaId?: string }) {
  const choice = useConsent()

  useEffect(() => {
    if (choice !== 'accepted') {
      removeNode(DRIVE_ID)
      removeNode('ga-src')
      removeNode('ga-init')
      return
    }

    ensureScript(DRIVE_ID, DRIVE_SRC)
    if (!gaId) return
    ensureScript('ga-src', `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`)
    if (!document.getElementById('ga-init')) {
      const inline = document.createElement('script')
      inline.id = 'ga-init'
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js', new Date());gtag('config', ${JSON.stringify(gaId)});`
      document.body.appendChild(inline)
    }
  }, [choice, gaId])

  return null
}

export function consentAllowsOptionalScripts(): boolean {
  return readConsent() === 'accepted'
}
