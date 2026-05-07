import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { logAffiliateRedirect } from '../../../lib/analytics'

function resolveDestination(request: NextRequest, raw: string) {
  try {
    const absolute = new URL(raw)
    if (['http:', 'https:'].includes(absolute.protocol)) {
      return absolute.toString()
    }
  } catch {
    // fall through for relative paths
  }

  if (raw.startsWith('/') && !raw.startsWith('//')) {
    return new URL(raw, request.nextUrl.origin).toString()
  }

  return null
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const target = url.searchParams.get('to')
  const label = url.searchParams.get('label') ?? undefined

  if (!target) {
    return NextResponse.json({ error: 'Missing `to` query parameter' }, { status: 400 })
  }

  const resolved = resolveDestination(request, target)
  if (!resolved) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  logAffiliateRedirect(resolved, label)

  return NextResponse.redirect(resolved)
}

/** Fire-and-forget logging from client (sendBeacon / fetch keepalive). */
export async function POST(request: NextRequest) {
  try {
    const text = await request.text()
    const data = text ? JSON.parse(text) : {}
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    await supabase.from('affiliate_clicks').insert({
      program: data.program,
      subid: data.subid,
      user_agent: request.headers.get('user-agent') || '',
      referer: request.headers.get('referer') || '',
    })
  } catch {
    // fail silently — never block redirects or navigation
  }

  return NextResponse.json({ ok: true })
}
