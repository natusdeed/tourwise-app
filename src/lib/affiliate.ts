/**
 * Faith-travel and pillar-page helpers layered on shared affiliate utilities.
 */

import { generateAffiliateLink, generateBestAffiliateLink } from '../../lib/affiliates';

export const SHORT_AFFILIATE_DISCLOSURE =
  'When you buy through links on TourWise AI, we may earn a commission at no extra cost to you. See our Affiliate Disclosure for details.';

export function buildAffiliateRedirectUrl(destination: string, label?: string) {
  const params = new URLSearchParams({ to: destination });
  if (label) params.set('label', label);
  return `/api/affiliate-click?${params.toString()}`;
}

export function trackedAffiliateUrl(
  rawUrl: string,
  options?: { label?: string; useRedirect?: boolean }
) {
  if (options?.useRedirect === false) return rawUrl;
  return buildAffiliateRedirectUrl(rawUrl, options?.label);
}

const MARKER =
  process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ||
  process.env.TRAVELPAYOUTS_MARKER ||
  '';

export type AffiliateProgram =
  | 'booking'
  | 'getYourGuide'
  | 'tiqets'
  | 'viator'
  | 'discoverCars'
  | 'kiwi'
  | 'tripCom'
  | 'wayAway'
  | 'hotellook'
  | 'klook'
  | 'amazon';

interface ProgramConfig {
  baseUrl: string;
  buildUrl: (path: string, subid: string) => string;
}

const PROGRAMS: Record<AffiliateProgram, ProgramConfig> = {
  booking: {
    baseUrl: 'https://www.booking.com',
    buildUrl: (path, subid) => {
      const url = new URL(path, 'https://www.booking.com');
      url.searchParams.set('aid', MARKER);
      url.searchParams.set('label', subid);
      return url.toString();
    },
  },
  getYourGuide: {
    baseUrl: 'https://www.getyourguide.com',
    buildUrl: (path, subid) =>
      `https://www.getyourguide.com${path}?partner_id=${MARKER}&utm_medium=online_publisher&placement=tourwise&cmp=${subid}`,
  },
  tiqets: {
    baseUrl: 'https://www.tiqets.com',
    buildUrl: (path, subid) =>
      `https://www.tiqets.com${path}?partner=${MARKER}&utm_source=tourwise&utm_campaign=${subid}`,
  },
  viator: {
    baseUrl: 'https://www.viator.com',
    buildUrl: (path, subid) =>
      `https://www.viator.com${path}?pid=${MARKER}&mcid=42383&medium=link&campaign=${subid}`,
  },
  discoverCars: {
    baseUrl: 'https://www.discovercars.com',
    buildUrl: (path, subid) =>
      `https://www.discovercars.com${path}?a_aid=${MARKER}&a_bid=${subid}`,
  },
  kiwi: {
    baseUrl: 'https://www.kiwi.com',
    buildUrl: (path, subid) =>
      `https://www.kiwi.com${path}?affilid=${MARKER}&subid=${subid}`,
  },
  tripCom: {
    baseUrl: 'https://www.trip.com',
    buildUrl: (path, subid) =>
      `https://www.trip.com${path}?Allianceid=${MARKER}&SID=${subid}`,
  },
  wayAway: {
    baseUrl: 'https://wayaway.io',
    buildUrl: (path, subid) =>
      `https://wayaway.io${path}?marker=${MARKER}.${subid}`,
  },
  hotellook: {
    baseUrl: 'https://hotellook.com',
    buildUrl: (path, subid) =>
      `https://hotellook.com${path}?marker=${MARKER}.${subid}`,
  },
  klook: {
    baseUrl: 'https://www.klook.com',
    buildUrl: (path, subid) =>
      `https://www.klook.com${path}?aid=${MARKER}&utm_campaign=${subid}`,
  },
  amazon: {
    baseUrl: 'https://www.amazon.com',
    buildUrl: (path, subid) => {
      const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || 'tourwiseai-20';
      const url = new URL(path, 'https://www.amazon.com');
      url.searchParams.set('tag', tag);
      url.searchParams.set('ascsubtag', subid);
      return url.toString();
    },
  },
};

export function buildAffiliateUrl(
  program: AffiliateProgram,
  path: string,
  subid: string
): string {
  return PROGRAMS[program].buildUrl(path, subid);
}

/** SubID: `<niche>-<page>-<position>` — e.g. faith-holyland-comparison-row1 */
export function makeSubId(niche: string, page: string, position: string): string {
  return `${niche}-${page}-${position}`.toLowerCase().replace(/\s+/g, '');
}

export { generateAffiliateLink, generateBestAffiliateLink };
