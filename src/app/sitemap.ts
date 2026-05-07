/**
 * Next.js Sitemap Route
 * 
 * Generates sitemap.xml for SEO
 */

import { MetadataRoute } from 'next';
import { generateSitemapUrls } from '@/lib/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tourwiseai.com';
  const urls = await generateSitemapUrls(baseUrl);

  return urls.map(url => ({
    url: url.loc,
    lastModified: url.lastmod ? new Date(url.lastmod) : undefined,
    changeFrequency: url.changefreq as any,
    priority: url.priority,
  }));
}
