/**
 * Next.js Sitemap Route
 * 
 * Generates sitemap.xml for SEO
 */

import { MetadataRoute } from 'next';
import { generateSitemapUrls } from '@/lib/sitemap';
import type { SitemapUrl } from '@/lib/sitemap';
import { getAllContentItems } from '@/lib/content';
import { SITE_ORIGIN } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_ORIGIN;
  const urls = await generateSitemapUrls(baseUrl);
  const additionalRoutes = [
    '/faith-travel',
    '/cheap-flights',
    '/cheap-flights-from-houston',
    '/cheap-flights-from-houston/houston-to-lagos-flights',
    '/cheap-flights-from-houston/houston-to-cancun-flights',
    '/cheap-flights-from-houston/houston-to-london-flights',
    '/cheap-flights-from-houston/houston-to-paris-flights',
    '/cheap-flights-from-houston/houston-to-rome-flights',
    '/cheap-flights-from-houston/houston-to-orlando-flights',
    '/cheap-flights-from-houston/houston-to-accra-flights',
    '/cheap-flights-from-houston/houston-to-mexico-city-flights',
    '/cheap-flights-from-houston/houston-to-dubai-flights',
    '/cheap-flights-from-houston/houston-to-tokyo-flights',
    '/cheap-flights-from-houston/houston-to-madrid-flights',
    '/cheap-flights-from-houston/houston-to-amsterdam-flights',
    '/houston-to-lagos-flights',
    '/houston-to-cancun-flights',
    '/houston-to-london-flights',
    '/houston-to-paris-flights',
    '/houston-to-rome-flights',
    '/houston-to-orlando-flights',
    '/houston-to-accra-flights',
    '/houston-to-mexico-city-flights',
    '/houston-to-dubai-flights',
    '/houston-to-tokyo-flights',
    '/houston-to-madrid-flights',
    '/houston-to-amsterdam-flights',
    '/travel-deals',
    '/ai-travel-planner',
    '/airport-transfers',
    '/travel-esim',
    '/travel-insurance',
    '/things-to-do',
    '/holy-land-tours-from-usa',
    '/camino-de-santiago-planner',
    '/vatican-rome-christian-itinerary',
    '/vatican-rome-christian-travel-guide',
    '/guides',
    '/guides/cancun',
    '/guides/lagos',
    '/guides/cape-town',
    '/affiliate-disclosure',
    '/privacy-policy',
    '/terms',
    '/alerts',
    '/us-visa-suspension',
    '/blog',
    '/blog/how-to-use-ai-to-plan-a-trip',
    '/blog/cheap-flights-from-houston',
    '/blog/travel-essentials-before-you-book',
    '/contact',
    '/about',
  ];

  const additionalUrls: SitemapUrl[] = additionalRoutes.map(path => ({
    loc: `${baseUrl}${path}`,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));

  const posts = await getAllContentItems('posts');
  for (const post of posts) {
    additionalUrls.push({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.frontmatter.modifiedTime || post.frontmatter.date,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  const allUrls = [...urls, ...additionalUrls];
  const uniqueUrls = Array.from(new Map(allUrls.map(url => [url.loc, url])).values());

  return uniqueUrls.map(url => ({
    url: url.loc,
    lastModified: url.lastmod ? new Date(url.lastmod) : undefined,
    changeFrequency: url.changefreq as any,
    priority: url.priority,
  }));
}
