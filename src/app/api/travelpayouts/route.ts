/**
 * Travelpayouts API Route
 *
 * Flight clicks open an Aviasales link. A complete round trip keeps the
 * airport codes and both dates. Anything less stays a date-free form, or
 * returns the validation message. Tour and activity clicks still use the
 * curated tp.st short links. Hotel clicks use the Travelpayouts Partner
 * Links API (Hotellook). The API token stays on the server.
 */

import { NextRequest, NextResponse } from 'next/server'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'
import { buildAviasalesCityPrefillUrl, flightHandoffDecision } from '@/lib/aviasales'
import { getIATACode } from '@/lib/iata-codes'

export const dynamic = 'force-dynamic'

const HOTELLOOK_BASE = 'https://hotellook.com'

function discoveryCode(value: string | null): string | null {
  if (!value || !value.trim()) return null
  const trimmed = value.trim()
  if (/^[A-Za-z]{3}$/.test(trimmed)) return trimmed.toUpperCase()
  return getIATACode(trimmed)
}

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

    const flightRedirect = () => {
      const decision = flightHandoffDecision({
        origin: origin,
        destination: destination,
        departDate: searchParams.get('departDate'),
        returnDate: searchParams.get('returnDate'),
        adults: searchParams.get('adults'),
        tripClass: searchParams.get('tripClass'),
      })
      if (decision.type === 'invalid') {
        return new NextResponse(decision.errors.join('\n'), {
          status: 400,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
      }
      if (decision.type === 'exact') return NextResponse.redirect(decision.url)
      return NextResponse.redirect(
        buildAviasalesCityPrefillUrl({
          origin: discoveryCode(origin),
          destination: discoveryCode(destination),
        })
      )
    }

    // Flights -> Aviasales. Dates are forwarded only when the exact contract passes.
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
    return NextResponse.redirect(buildAviasalesCityPrefillUrl({ origin: 'HOU' }))
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
