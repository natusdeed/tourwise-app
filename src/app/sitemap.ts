/**
 * Next.js Sitemap Route
 * 
 * Generates sitemap.xml for SEO
 */

import { MetadataRoute } from 'next';
import { generateSitemapUrls } from '@/lib/sitemap';
import type { SitemapUrl } from '@/lib/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tourwiseai.com';
  const urls = await generateSitemapUrls(baseUrl);
  const additionalRoutes = [
    '/faith-travel',
    '/holy-land-tours-from-usa',
    '/camino-de-santiago-planner',
    '/vatican-rome-christian-itinerary',
    '/affiliate-disclosure',
  ];

  const additionalUrls: SitemapUrl[] = additionalRoutes.map(path => ({
    loc: `${baseUrl}${path}`,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));

  const allUrls = [...urls, ...additionalUrls];
  const uniqueUrls = Array.from(new Map(allUrls.map(url => [url.loc, url])).values());

  return uniqueUrls.map(url => ({
    url: url.loc,
    lastModified: url.lastmod ? new Date(url.lastmod) : undefined,
    changeFrequency: url.changefreq as any,
    priority: url.priority,
  }));
}
