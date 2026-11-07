'use client'

import { useEffect, useState } from 'react'
import { CONSENT_EVENT, readConsent, type ConsentChoice } from '@/lib/consent'

/** Null until the browser cookie is read, so optional scripts are absent from the first HTML. */
export function useConsent(): ConsentChoice | null {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)

  useEffect(() => {
    const sync = () => setChoice(readConsent())
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    return () => window.removeEventListener(CONSENT_EVENT, sync)
  }, [])

  return choice
}
