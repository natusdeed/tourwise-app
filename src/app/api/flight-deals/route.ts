import { NextRequest, NextResponse } from 'next/server'
import { fetchCheapestDeals } from '@/lib/flights'
import { getServerEnv } from '@/lib/server-env'

/**
 * Future-ready server route for partner flight deals.
 * Uses TRAVELPAYOUTS_TOKEN server-side only (never NEXT_PUBLIC).
 */
export async function GET(request: NextRequest) {
  const rawDestination = request.nextUrl.searchParams.get('destination')?.trim() || ''
  const destinationAliasMap: Record<string, string> = {
    lagos: 'LOS',
    london: 'LON',
    cancun: 'CUN',
    orlando: 'MCO',
    paris: 'PAR',
    rome: 'ROM',
  }
  const destination = (
    /^[A-Za-z]{3}$/.test(rawDestination)
      ? rawDestination.toUpperCase()
      : destinationAliasMap[rawDestination.toLowerCase()]
  ) || ''
  const origin = request.nextUrl.searchParams.get('origin')?.toUpperCase() || undefined

  if (!/^[A-Z]{3}$/.test(destination)) {
    return NextResponse.json(
      {
        success: false,
        error: 'destination must be a 3-letter IATA code or a supported city name',
      },
      { status: 400 }
    )
  }

  const { travelpayoutsToken } = getServerEnv()
  const hasToken = Boolean(travelpayoutsToken)
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
