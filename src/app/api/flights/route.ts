/**
 * Flight Deals API Route
 * 
 * Fetches real-time flight prices from Travelpayouts API
 * Requires TRAVELPAYOUTS_TOKEN environment variable
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchCheapestDeals } from '@/lib/flights';

/**
 * POST endpoint to fetch flight deals
 * Accepts destination code and optional origin code in request body
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { destinationCode, originCode } = body;

    if (!destinationCode || typeof destinationCode !== 'string') {
      return NextResponse.json(
        { error: 'Destination code (IATA) is required' },
        { status: 400 }
      );
    }

    const deals = await fetchCheapestDeals(destinationCode, originCode);

    if (!deals) {
      return NextResponse.json(
        { error: 'No flight deals found for this destination' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deal: deals,
    });
  } catch (error) {
    console.error('Error in flights API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flight deals' },
      { status: 500 }
    );
  }
}
