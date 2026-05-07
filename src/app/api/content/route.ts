/**
 * Content API Route
 * 
 * Server-side API for fetching content items
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllContentItems } from '@/lib/content';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as 'destinations' | 'blog' | 'guides' | null;
  const vertical = searchParams.get('vertical') || undefined;
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  if (!type || (type !== 'destinations' && type !== 'blog' && type !== 'guides')) {
    return NextResponse.json(
      { error: 'Invalid type. Must be destinations, blog, or guides' },
      { status: 400 }
    );
  }

  try {
    const items = await getAllContentItems(type, vertical, limit);
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
