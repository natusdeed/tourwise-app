/**
 * Travelpayouts API Route
 *
 * For flight / tour / activity categories we redirect to the curated
 * Travelpayouts short links (tp.st). These are the only affiliate URLs
 * we use site-wide and they keep our private marker / API token off the
 * client. For hotel category we still call the Travelpayouts Partner
 * Links API (Hotellook) since there is no tp.st short link for hotels.
 *
 * No tokens, marker IDs or dashboard URLs are ever returned to the
 * browser — they only travel server -> Travelpayouts.
 */

import { NextRequest, NextResponse } from 'next/server'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'

export const dynamic = 'force-dynamic'

const HOTELLOOK_BASE = 'https://hotellook.com'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const destination = searchParams.get('destination')
    const category = searchParams.get('category') as
      | 'hotel'
      | 'tour'
      | 'flight'
      | 'activity'
      | null

    // Flights -> Aviasales tp.st short link (no token / marker exposure).
    if (category === 'flight' || (!category && !destination)) {
      return NextResponse.redirect(AFFILIATE_LINKS.flights.aviasales.url)
    }

    // Tours / activities -> Klook tp.st short link.
    if (category === 'tour' || category === 'activity') {
      return NextResponse.redirect(AFFILIATE_LINKS.tours.klook.url)
    }

    // Hotels -> Hotellook (Travelpayouts) via Partner Links API.
    if (category === 'hotel') {
      return await buildHotelLink(destination)
    }

    return NextResponse.redirect(AFFILIATE_LINKS.flights.aviasales.url)
  } catch (error) {
    console.error('Unexpected error in Travelpayouts route:', error)
    return NextResponse.redirect(AFFILIATE_LINKS.flights.aviasales.url)
  }
}

async function buildHotelLink(destination: string | null) {
  const markerId =
    process.env.TRAVELPAYOUTS_MARKER_ID || process.env.TRAVELPAYOUTS_MARKER
  const apiToken =
    process.env.TRAVELPAYOUTS_TOKEN || process.env.TRAVELPAYOUTS_API_TOKEN

  const targetUrl = destination
    ? `${HOTELLOOK_BASE}/search?query=${encodeURIComponent(destination)}`
    : HOTELLOOK_BASE

  if (!markerId || !apiToken) {
    return NextResponse.redirect(AFFILIATE_LINKS.flights.aviasales.url)
  }

  try {
    const response = await fetch(
      'https://api.travelpayouts.com/links/v1/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': apiToken,
        },
        body: JSON.stringify({
          trs: 197987,
          marker: parseInt(markerId, 10),
          shorten: true,
          links: [{ url: targetUrl, sub_id: 'hotel' }],
        }),
      }
    )

    if (response.ok) {
      const data = await response.json().catch(() => null)
      const partnerUrl =
        data?.partner_url || data?.links?.[0]?.partner_url || null
      if (partnerUrl) return NextResponse.redirect(partnerUrl)
    }

    return NextResponse.redirect(targetUrl)
  } catch (apiError) {
    console.error('Travelpayouts hotel link error:', apiError)
    return NextResponse.redirect(targetUrl)
  }
}
