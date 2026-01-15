/**
 * Affiliate Link Manager System
 * 
 * This centralized system manages all affiliate partners and generates
 * deep links per destination. Swap partners globally without editing pages.
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  baseUrl: string;
  trackingParam: string;
  deepLinkTemplate?: string; // For partners with destination-specific URLs
  enabled: boolean;
  vertical?: string[]; // Optional: restrict to specific verticals
  priority: number; // Higher priority = shown first
  useApi?: boolean; // If true, use API route for link generation
}

export interface AffiliateLinkOptions {
  destination?: string;
  category?: 'hotel' | 'tour' | 'flight' | 'activity';
  queryParams?: Record<string, string>;
  vertical?: string;
}

/**
 * All affiliate partners configuration
 */
export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  booking: {
    id: 'booking',
    name: 'Booking.com',
    baseUrl: 'https://www.booking.com',
    trackingParam: 'aid=1234567', // Replace with your actual affiliate ID
    enabled: true,
    priority: 10,
  },
  getyourguide: {
    id: 'getyourguide',
    name: 'GetYourGuide',
    baseUrl: 'https://www.getyourguide.com',
    trackingParam: 'partner_id=ABCDEF', // Replace with your actual affiliate ID
    enabled: true,
    priority: 9,
  },
  viator: {
    id: 'viator',
    name: 'Viator',
    baseUrl: 'https://www.viator.com',
    trackingParam: 'pid=P123456', // Replace with your actual affiliate ID
    enabled: true,
    priority: 8,
  },
  expedia: {
    id: 'expedia',
    name: 'Expedia',
    baseUrl: 'https://www.expedia.com',
    trackingParam: 'rfrr=123456', // Replace with your actual affiliate ID
    enabled: true,
    priority: 7,
  },
  airbnb: {
    id: 'airbnb',
    name: 'Airbnb',
    baseUrl: 'https://www.airbnb.com',
    trackingParam: 'ref_id=ABC123', // Replace with your actual affiliate ID
    enabled: true,
    priority: 6,
  },
  travelpayouts: {
    id: 'travelpayouts',
    name: 'Travelpayouts',
    baseUrl: 'https://www.travelpayouts.com',
    trackingParam: '', // Handled via API
    enabled: true,
    useApi: true, // Use API route for link generation
    priority: 15, // Highest priority - Travelpayouts is primary affiliate network
  },
};

/**
 * Generate affiliate link for a specific partner
 */
export function generateAffiliateLink(
  partnerId: string,
  options: AffiliateLinkOptions = {}
): string | null {
  const partner = AFFILIATE_PARTNERS[partnerId];

  if (!partner || !partner.enabled) {
    return null;
  }

  // Check if partner is restricted to specific verticals
  if (partner.vertical && options.vertical && !partner.vertical.includes(options.vertical)) {
    return null;
  }

  // If partner uses API, return API route URL
  if (partner.useApi) {
    const params = new URLSearchParams();
    if (options.destination) params.set('destination', options.destination);
    if (options.category) params.set('category', options.category);
    if (options.vertical) params.set('vertical', options.vertical);
    if (options.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }
    return `/api/travelpayouts?${params.toString()}`;
  }

  let url = partner.baseUrl;

  // Add destination-specific deep link if template exists
  if (partner.deepLinkTemplate && options.destination) {
    url = partner.deepLinkTemplate.replace('{destination}', encodeURIComponent(options.destination));
  } else if (options.destination) {
    // Generic destination search
    url = `${url}/search?ss=${encodeURIComponent(options.destination)}`;
  }

  // Add category-specific paths
  if (options.category === 'hotel') {
    url = `${url}${url.includes('?') ? '&' : '?'}type=hotel`;
  } else if (options.category === 'tour' || options.category === 'activity') {
    url = `${url}${url.includes('?') ? '&' : '?'}type=activity`;
  }

  // Add tracking parameter
  if (partner.trackingParam) {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}${partner.trackingParam}`;
  }

  // Add custom query parameters
  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      url = `${url}&${key}=${encodeURIComponent(value)}`;
    });
  }

  return url;
}

/**
 * Get the best affiliate partner for a given context
 */
export function getBestAffiliatePartner(
  options: AffiliateLinkOptions = {}
): AffiliatePartner | null {
  const enabledPartners = Object.values(AFFILIATE_PARTNERS)
    .filter(partner => {
      if (!partner.enabled) return false;
      if (partner.vertical && options.vertical && !partner.vertical.includes(options.vertical)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.priority - a.priority);

  return enabledPartners[0] || null;
}

/**
 * Generate affiliate link using the best partner for context
 */
export function generateBestAffiliateLink(options: AffiliateLinkOptions = {}): string | null {
  const partner = getBestAffiliatePartner(options);
  if (!partner) return null;

  return generateAffiliateLink(partner.id, options);
}

/**
 * Get all enabled partners for a vertical
 */
export function getEnabledPartnersForVertical(vertical?: string): AffiliatePartner[] {
  return Object.values(AFFILIATE_PARTNERS)
    .filter(partner => {
      if (!partner.enabled) return false;
      if (partner.vertical && vertical && !partner.vertical.includes(vertical)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.priority - a.priority);
}
