/**
 * Affiliate Link API Route
 * 
 * Generates affiliate links dynamically with proper tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateBestAffiliateLink } from '@/lib/affiliates';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const destination = searchParams.get('destination');
  const category = searchParams.get('category') as 'hotel' | 'tour' | 'flight' | 'activity' | null;
  const vertical = searchParams.get('vertical') || undefined;
  const partner = searchParams.get('partner') || undefined;

  const options = {
    destination: destination || undefined,
    category: category || undefined,
    vertical: vertical,
  };

  // If specific partner requested, use it; otherwise get best
  const affiliateLink = partner
    ? generateBestAffiliateLink({ ...options })
    : generateBestAffiliateLink(options);

  if (!affiliateLink) {
    return NextResponse.json(
      { error: 'No affiliate link available' },
      { status: 404 }
    );
  }

  // Redirect to affiliate link
  return NextResponse.redirect(affiliateLink);
}
