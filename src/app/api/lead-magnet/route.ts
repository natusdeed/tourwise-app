import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  magnet_id: z.string().min(1),
})

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

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendApiKey = process.env.RESEND_API_KEY
  const resendFromEmail = process.env.RESEND_FROM_EMAIL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey || !resendFromEmail || !siteUrl) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    // Store in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
    const { error: insertError } = await supabase
      .from('leads')
      .insert({ email, name, magnet_id, source: 'tourwise' })

    if (insertError) {
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    // Send the magnet via email
    const resend = new Resend(resendApiKey)
    const baseUrl = siteUrl.replace(/\/$/, '')
    const downloadUrl = `${baseUrl}/lead-magnets/${encodeURIComponent(magnet_id)}.pdf`

    await resend.emails.send({
      from: resendFromEmail,
      to: email,
      subject: 'Your free TourWise AI itinerary is ready',
      html: `<p>Hi${name ? ` ${name}` : ''},</p><p>Your free itinerary is ready: <a href="${downloadUrl}">Download it here</a>.</p><p>Reply to this email if you have any questions about planning your trip.</p>`,
    })

    return NextResponse.json({ ok: true, downloadUrl })
  } catch {
    return NextResponse.json({ error: 'Failed to process lead magnet request' }, { status: 500 })
  }
}
