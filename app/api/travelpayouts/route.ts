/**
 * Travelpayouts API Route
 * 
 * Generates Travelpayouts affiliate links using their Partner Links API
 * Requires TRAVELPAYOUTS_MARKER_ID and TRAVELPAYOUTS_TOKEN environment variables
 */

import { NextRequest, NextResponse } from 'next/server';

// Travelpayouts brand program IDs (trs parameter)
// These are common travel brands available through Travelpayouts
const TRAVELPAYOUTS_BRANDS: Record<string, number> = {
  aviasales: 197987, // Aviasales
  booking: 197987, // Booking.com (if available)
  hotellook: 197987, // Hotellook
  default: 197987, // Default to Aviasales
};

export async function GET(request: NextRequest) {
  try {
    // Get Travelpayouts credentials from environment
    const markerId = process.env.TRAVELPAYOUTS_MARKER_ID || process.env.TRAVELPAYOUTS_MARKER;
    const apiToken = process.env.TRAVELPAYOUTS_TOKEN || process.env.TRAVELPAYOUTS_API_TOKEN;

    // Validate credentials
    if (!markerId || !apiToken) {
      console.error('Travelpayouts credentials not configured. Check TRAVELPAYOUTS_MARKER_ID and TRAVELPAYOUTS_TOKEN in .env.local');
      return NextResponse.json(
        { error: 'Travelpayouts service is not configured' },
        { status: 500 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const destination = searchParams.get('destination');
    const category = searchParams.get('category') as 'hotel' | 'tour' | 'flight' | 'activity' | null;
    const brand = searchParams.get('brand') || 'default';
    const subId = searchParams.get('sub_id') || undefined;

    // Determine the base URL based on category
    let baseUrl = 'https://www.aviasales.com';
    
    if (category === 'hotel') {
      baseUrl = 'https://hotellook.com';
    } else if (category === 'flight') {
      baseUrl = 'https://www.aviasales.com';
    } else if (category === 'tour' || category === 'activity') {
      baseUrl = 'https://www.aviasales.com';
    }

    // Build the destination URL
    let targetUrl = baseUrl;
    if (destination) {
      if (category === 'hotel') {
        targetUrl = `${baseUrl}/search?query=${encodeURIComponent(destination)}`;
      } else if (category === 'flight') {
        targetUrl = `${baseUrl}/search?origin_iata=&destination_iata=&depart_date=&return_date=&adults=1&children=0&infants=0&trip_class=0&marker=${markerId}`;
        // Note: For flights, you might want to use Travelpayouts flight search widget instead
      } else {
        targetUrl = `${baseUrl}/search?query=${encodeURIComponent(destination)}`;
      }
    }

    // Get the brand program ID (trs)
    const trs = TRAVELPAYOUTS_BRANDS[brand] || TRAVELPAYOUTS_BRANDS.default;

    try {
      // Call Travelpayouts Partner Links API
      const response = await fetch('https://api.travelpayouts.com/links/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': apiToken,
        },
        body: JSON.stringify({
          trs: trs,
          marker: parseInt(markerId, 10),
          shorten: true,
          links: [
            {
              url: targetUrl,
              sub_id: subId || category || 'general',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Travelpayouts API error:', response.status, JSON.stringify(errorData, null, 2));
        
        // Fallback: Generate direct link with marker if API fails
        const fallbackUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}marker=${markerId}`;
        if (subId) {
          return NextResponse.redirect(`${fallbackUrl}&sub_id=${encodeURIComponent(subId)}`);
        }
        return NextResponse.redirect(fallbackUrl);
      }

      const data = await response.json();

      // Extract the partner URL from response
      if (data && data.partner_url) {
        return NextResponse.redirect(data.partner_url);
      }

      // If response format is different, try to extract from links array
      if (data && data.links && data.links[0] && data.links[0].partner_url) {
        return NextResponse.redirect(data.links[0].partner_url);
      }

      // Fallback to direct link with marker
      const fallbackUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}marker=${markerId}`;
      if (subId) {
        return NextResponse.redirect(`${fallbackUrl}&sub_id=${encodeURIComponent(subId)}`);
      }
      return NextResponse.redirect(fallbackUrl);

    } catch (apiError: any) {
      console.error('Error calling Travelpayouts API:', apiError);
      
      // Fallback: Generate direct link with marker
      const fallbackUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}marker=${markerId}`;
      if (subId) {
        return NextResponse.redirect(`${fallbackUrl}&sub_id=${encodeURIComponent(subId)}`);
      }
      return NextResponse.redirect(fallbackUrl);
    }

  } catch (error) {
    console.error('Unexpected error in Travelpayouts route:', error);
    return NextResponse.json(
      { error: 'Failed to generate Travelpayouts link' },
      { status: 500 }
    );
  }
}
