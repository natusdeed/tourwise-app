'use client'

import { openConsentBanner } from '@/lib/consent'

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      id="cookie-settings"
      onClick={() => openConsentBanner()}
      className="inline-flex min-h-[44px] items-center bg-transparent p-0 text-xs text-white underline underline-offset-2 hover:text-neon-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-sm"
    >
      Cookie settings
    </button>
  )
}
