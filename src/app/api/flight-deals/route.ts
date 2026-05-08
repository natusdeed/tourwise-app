import { NextRequest, NextResponse } from 'next/server'
import { fetchCheapestDeals } from '@/lib/flights'

/**
 * Future-ready server route for partner flight deals.
 * Uses TRAVELPAYOUTS_TOKEN server-side only (never NEXT_PUBLIC).
 */
export async function GET(request: NextRequest) {
  const destination = request.nextUrl.searchParams.get('destination')?.toUpperCase() || ''
  const origin = request.nextUrl.searchParams.get('origin')?.toUpperCase() || undefined

  if (!/^[A-Z]{3}$/.test(destination)) {
    return NextResponse.json(
      { success: false, error: 'destination must be a 3-letter IATA code' },
      { status: 400 }
    )
  }

  const hasToken = Boolean(process.env.TRAVELPAYOUTS_TOKEN)
  if (!hasToken) {
    return NextResponse.json({
      success: true,
      source: 'fallback',
      message: 'Live pricing is unavailable in this environment.',
      deals: [],
    })
  }

  const deal = await fetchCheapestDeals(destination, origin)
  return NextResponse.json({
    success: true,
    source: 'travelpayouts',
    deals: deal ? [deal] : [],
  })
}
