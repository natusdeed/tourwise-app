/**
 * Travelpayouts API Route
 *
 * Flight clicks redirect to an Aviasales search deep link that keeps the
 * existing Travelpayouts marker. Tour and activity clicks still use the
 * curated tp.st short links. Hotel clicks use the Travelpayouts Partner
 * Links API (Hotellook). The API token stays on the server.
 */

import { NextRequest, NextResponse } from 'next/server'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { buildAviasalesSearchUrl } from '@/lib/aviasales'
import { getIATACode } from '@/lib/iata-codes'

export const dynamic = 'force-dynamic'

const HOTELLOOK_BASE = 'https://hotellook.com'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const destination = searchParams.get('destination')
    const origin = searchParams.get('origin')
    const category = searchParams.get('category') as
      | 'hotel'
      | 'tour'
      | 'flight'
      | 'activity'
      | null

    const flightRedirect = () =>
      NextResponse.redirect(
        buildAviasalesSearchUrl({
          origin: (origin && getIATACode(origin)) || 'HOU',
          destination: destination ? getIATACode(destination) : null,
        })
      )

    // Flights -> prefilled Aviasales search (Houston when no origin is given).
    if (category === 'flight' || (!category && !destination)) {
      return flightRedirect()
    }

    // Tours / activities -> Klook tp.st short link.
    if (category === 'tour' || category === 'activity') {
      return NextResponse.redirect(AFFILIATE_LINKS.tours.klook.url)
    }

    // Hotels -> Hotellook (Travelpayouts) via Partner Links API.
    if (category === 'hotel') {
      return await buildHotelLink(destination)
    }

    return flightRedirect()
  } catch (error) {
    console.error('Unexpected error in Travelpayouts route:', error)
    return NextResponse.redirect(buildAviasalesSearchUrl({ origin: 'HOU' }))
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
