import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  magnet_id: z.string().min(1),
  // Itinerary delivery (magnet_id === 'itinerary-delivery')
  destination: z.string().max(120).optional(),
  tripLength: z.string().max(60).optional(),
  itinerary: z.string().max(60000).optional(),
})

/** Escape HTML then lightly render markdown for email bodies. */
function markdownToEmailHtml(markdown: string): string {
  const escaped = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  const lines = escaped.split('\n')
  const html: string[] = []
  let inList = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (/^#{1,4}\s+/.test(trimmed)) {
      if (inList) { html.push('</ul>'); inList = false }
      const text = trimmed.replace(/^#{1,4}\s+/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html.push(`<h3 style="color:#0ea5e9;margin:18px 0 8px;">${text}</h3>`)
    } else if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) { html.push('<ul style="margin:8px 0;padding-left:20px;">'); inList = true }
      const text = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html.push(`<li style="margin:4px 0;">${text}</li>`)
    } else if (trimmed === '') {
      if (inList) { html.push('</ul>'); inList = false }
    } else {
      if (inList) { html.push('</ul>'); inList = false }
      const text = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html.push(`<p style="margin:8px 0;">${text}</p>`)
    }
  }
  if (inList) html.push('</ul>')
  return html.join('\n')
}

const emailShell = (inner: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px;">
    ${inner}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size: 12px; color: #6b7280;">
      Affiliate disclosure: Some links on TourWiseAI are affiliate links, which means we may earn a commission
      at no additional cost to you.
    </p>
    <p style="font-size: 12px; color: #6b7280;">
      You're receiving this because you requested it on TourWiseAI. Unsubscribe anytime by replying STOP.
    </p>
  </div>
`

type LeadMagnetConfig = {
  supabaseUrl: string
  supabaseServiceRoleKey: string
  resendApiKey: string
  fromEmail: string
  replyToEmail?: string
  siteUrl: string
}

function getLeadMagnetConfig(): { config: LeadMagnetConfig | null; missingVars: string[] } {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendApiKey = process.env.RESEND_API_KEY
  // Backward-compatible env support:
  // - preferred: LEAD_MAGNET_FROM_EMAIL
  // - fallback: RESEND_FROM_EMAIL
  const fromEmail = process.env.LEAD_MAGNET_FROM_EMAIL || process.env.RESEND_FROM_EMAIL
  // Optional reply-to for lead magnet responses.
  const replyToEmail = process.env.LEAD_MAGNET_REPLY_TO_EMAIL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  const missingVars: string[] = []
  if (!supabaseUrl) missingVars.push('SUPABASE_URL')
  if (!supabaseServiceRoleKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY')
  if (!resendApiKey) missingVars.push('RESEND_API_KEY')
  if (!fromEmail) missingVars.push('LEAD_MAGNET_FROM_EMAIL (or RESEND_FROM_EMAIL)')
  if (!siteUrl) missingVars.push('NEXT_PUBLIC_SITE_URL')

  if (missingVars.length > 0) {
    return { config: null, missingVars }
  }

  const safeSupabaseUrl = supabaseUrl as string
  const safeSupabaseServiceRoleKey = supabaseServiceRoleKey as string
  const safeResendApiKey = resendApiKey as string
  const safeFromEmail = fromEmail as string
  const safeSiteUrl = siteUrl as string

  return {
    config: {
      supabaseUrl: safeSupabaseUrl,
      supabaseServiceRoleKey: safeSupabaseServiceRoleKey,
      resendApiKey: safeResendApiKey,
      fromEmail: safeFromEmail,
      replyToEmail,
      siteUrl: safeSiteUrl,
    },
    missingVars,
  }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { email, name, magnet_id, destination, tripLength, itinerary } = parsed.data

  const { config, missingVars } = getLeadMagnetConfig()
  if (!config) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[lead-magnet] Missing required environment variables:', missingVars)
    }

    return NextResponse.json(
      {
        error: 'Lead magnet service is not configured on the server.',
        details: process.env.NODE_ENV !== 'production' ? { missingVars } : undefined,
      },
      { status: 500 }
    )
  }

  try {
    const { supabaseUrl, supabaseServiceRoleKey, resendApiKey, fromEmail, replyToEmail, siteUrl } = config

    // Store lead in Supabase.
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
    const { error: insertError } = await supabase
      .from('leads')
      .insert({ email, name, magnet_id, source: 'tourwise' })

    if (insertError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[lead-magnet] Failed to save lead:', insertError)
      }
      return NextResponse.json({ error: 'Unable to save your request right now. Please try again.' }, { status: 500 })
    }

    // Send the lead magnet email via Resend (server-side only).
    const resend = new Resend(resendApiKey)
    const baseUrl = siteUrl.replace(/\/$/, '')

    if (magnet_id === 'itinerary-delivery') {
      if (!itinerary || itinerary.trim().length === 0) {
        return NextResponse.json({ error: 'No itinerary to send.' }, { status: 400 })
      }
      const tripLabel = [destination, tripLength].filter(Boolean).join(' · ')
      const capped = itinerary.length > 15000 ? itinerary.slice(0, 15000) + '\n\n…' : itinerary
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Your ${destination ? `${destination} ` : ''}itinerary is here ✈️`,
        replyTo: replyToEmail || undefined,
        html: emailShell(`
          <p>Hi${name ? ` ${name}` : ''},</p>
          <p>Here's the personalized itinerary you just built with TourWiseAI${tripLabel ? ` <strong>(${tripLabel})</strong>` : ''}:</p>
          ${markdownToEmailHtml(capped)}
          <p style="margin-top:20px;">Next step: lock in the essentials for your dates —</p>
          <ul style="padding-left:20px;">
            <li><a href="${baseUrl}/travel-deals">Compare flights, stays, tours, transfers, eSIMs and insurance</a></li>
            <li><a href="${baseUrl}/cheap-flights">Find cheap flights</a></li>
          </ul>
          <p><strong>TourWiseAI</strong><br/>Smarter travel planning, zero guesswork.</p>
        `),
      })
      return NextResponse.json({ ok: true, message: 'Your itinerary is on its way to your inbox.' })
    }

    // If a direct PDF is not uploaded yet, this can point to a guide landing page instead.
    const guideUrl = `${baseUrl}/holy-land-tours-from-usa`

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your Free 12-Day Holy Land Itinerary Guide',
      replyTo: replyToEmail || undefined,
      html: emailShell(`
          <p>Hi${name ? ` ${name}` : ''},</p>
          <p>
            Thank you for requesting the free 12-day Holy Land itinerary guide from TourWiseAI.
          </p>
          <p>
            We are excited to help you plan a meaningful and smooth trip. You can access the guide details here:
            <a href="${guideUrl}">${guideUrl}</a>
          </p>
          <p>
            If a direct PDF download is not yet available, this page will be updated with the final PDF link after upload.
          </p>
          <p><strong>TourWiseAI</strong><br/>Smarter travel planning for faith-led journeys.</p>
      `),
    })

    return NextResponse.json({
      ok: true,
      message: 'Success! Your guide details are on the way to your inbox.',
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[lead-magnet] Failed to process request:', error)
    }
    return NextResponse.json(
      { error: 'We could not send your guide right now. Please try again in a moment.' },
      { status: 500 }
    )
  }
}
