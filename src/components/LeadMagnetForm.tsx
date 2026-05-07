'use client'

import { FormEvent, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { trackEmailSignup } from '../lib/analytics'

type Props = {
  magnetId: string
  title?: string
  /** Shown beside email field */
  description?: string
  buttonLabel?: string
  /** Optional honeypot field name for bots */
}

export default function LeadMagnetForm({
  magnetId,
  title = 'Grab the checklist',
  description = 'PDF download — we send the link to your inbox.',
  buttonLabel = 'Send me the guide',
}: Props) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (website) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), magnet_id: magnetId }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      trackEmailSignup(`lead_magnet:${magnetId}`)
      setMessage(data.message || 'Check your inbox for the download link.')
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Please try again.')
    }
  }

  return (
    <div className="glass-strong border border-neon-cyan/25 rounded-xl p-5 md:p-6 space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-white heading-robotic">{title}</h3>
        <p className="text-sm text-white/65 mt-1">{description}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="sr-only" htmlFor={`magnet-email-${magnetId}`}>
          Email
        </label>
        <input
          id={`magnet-email-${magnetId}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg bg-midnight/80 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-neon-cyan/60 focus:outline-none focus:ring-1 focus:ring-neon-cyan/40"
        />
        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor={`magnet-url-${magnetId}`}>Website</label>
          <input
            id={`magnet-url-${magnetId}`}
            tabIndex={-1}
            value={website}
            autoComplete="off"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-electric-blue/25 border border-neon-cyan/50 px-4 py-2.5 text-sm font-semibold text-white hover:border-neon-cyan transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </form>
      {message ? (
        <p
          className={`text-sm ${
            status === 'error' ? 'text-red-300' : 'text-neon-cyan'
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
