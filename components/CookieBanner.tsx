'use client'

import { useState, useLayoutEffect } from 'react'
import Cookies from 'js-cookie'
import { CONSENT_COOKIE, notifyConsent } from '@/lib/consent'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  // Present in the first HTML so a first visit paints it with the page.
  // Returning visitors are hidden by the blocking head script before paint.
  const [showBanner, setShowBanner] = useState(true)

  useLayoutEffect(() => {
    if (!Cookies.get(CONSENT_COOKIE)) return
    document.documentElement.setAttribute('data-consent', '1')
    setShowBanner(false)
  }, [])

  const handleAccept = () => {
    // Set a cookie for 365 days
    Cookies.set(CONSENT_COOKIE, 'accepted', { expires: 365, sameSite: 'lax' })
    document.documentElement.setAttribute('data-consent', '1')
    notifyConsent()
    setShowBanner(false)
    window.location.reload()
  }

  const handleDecline = () => {
    Cookies.set(CONSENT_COOKIE, 'declined', { expires: 365, sameSite: 'lax' })
    document.documentElement.setAttribute('data-consent', '1')
    notifyConsent()
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
        <div
          className="cookie-banner fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-2xl"
        >
          <div className="glass-strong border border-neon-cyan/30 border-glow-hover rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-md relative">
            {/* Close Button */}
            <button
              onClick={handleDecline}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex min-w-0 flex-col md:flex-row items-start gap-4 pr-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/30 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-neon-cyan" />
                </div>
              </div>

              {/* Text Content */}
              <div className="min-w-0 flex-1 text-white">
                <h3 className="text-base md:text-lg font-bold heading-robotic mb-2 text-gradient">
                  🍪 We Value Your Travel Privacy
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                  TourWise AI uses cookies to personalize your trip planning and track affiliate referrals so we can keep our service free.{' '}
                  By clicking <span className="text-neon-cyan font-semibold">&quot;Accept All&quot;</span>, you agree to our use of cookies.{' '}
                  Read our <Link href="/privacy-policy" className="text-neon-cyan hover:text-electric-blue underline transition-colors">Privacy Policy</Link>.
                </p>

                {/* Buttons */}
                <div className="flex min-w-0 flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDecline}
                    className="px-6 py-2.5 text-sm font-semibold heading-robotic text-white/80 hover:text-white border border-neon-cyan/30 hover:border-neon-cyan/50 rounded-lg transition-all duration-300 glass hover:bg-white/5"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-6 py-2.5 text-sm font-semibold heading-robotic text-black bg-gradient-to-r from-neon-cyan to-electric-blue hover:from-neon-cyan/90 hover:to-electric-blue/90 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
