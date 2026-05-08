import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  magnet_id: z.string().min(1),
})

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

  const { email, name, magnet_id } = parsed.data

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
    // If a direct PDF is not uploaded yet, this can point to a guide landing page instead.
    const guideUrl = `${baseUrl}/holy-land-tours-from-usa`

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your Free 12-Day Holy Land Itinerary Guide',
      replyTo: replyToEmail || undefined,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
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
          <p style="font-size: 12px; color: #6b7280;">
            Affiliate disclosure: Some links on TourWiseAI are affiliate links, which means we may earn a commission
            at no additional cost to you.
          </p>
        </div>
      `,
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
