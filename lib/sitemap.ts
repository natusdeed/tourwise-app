/**
 * Sitemap Generation Utility
 * 
 * Generates sitemap for all pages, destinations, blog posts, and travel docs
 * All-Access SEO Strategy - ensures comprehensive coverage for all search engines and AI crawlers
 */

import { getAllVerticals } from './verticals';
import { getAllContentItems } from './content';
import { getAllCountries } from './travelData';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap URLs
 */
export async function generateSitemapUrls(baseUrl: string = 'https://tourwiseai.com'): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = [];

  // Homepage - Priority 1.0
  urls.push({
    loc: baseUrl,
    changefreq: 'daily',
    priority: 1.0,
  });

  // Base Routes - Priority 0.8, weekly frequency
  const baseRoutes = [
    { path: '/about', changefreq: 'weekly' as const },
    { path: '/contact', changefreq: 'weekly' as const },
  ];

  for (const route of baseRoutes) {
    urls.push({
      loc: `${baseUrl}${route.path}`,
      changefreq: route.changefreq,
      priority: 0.8,
    });
  }

  // Travel Docs Indexes - Priority 0.8, weekly frequency
  const travelDocRoutes = ['/passports', '/visas', '/embassies'];
  for (const route of travelDocRoutes) {
    urls.push({
      loc: `${baseUrl}${route}`,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Dynamic Country Pages from travelData
  // Passports, Visas, and Embassies for each country
  const countries = getAllCountries();
  for (const country of countries) {
    // Passport pages
    urls.push({
      loc: `${baseUrl}/passports/${country.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    });

    // Visa pages
    urls.push({
      loc: `${baseUrl}/visas/${country.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    });

    // Embassy pages
    urls.push({
      loc: `${baseUrl}/embassies/${country.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Vertical pages
  const verticals = getAllVerticals();
  for (const vertical of verticals) {
    urls.push({
      loc: `${baseUrl}/${vertical.slug}`,
      changefreq: 'weekly',
      priority: 0.9,
    });

    // Blog index
    urls.push({
      loc: `${baseUrl}/${vertical.slug}/blog`,
      changefreq: 'daily',
      priority: 0.8,
    });

    // Destinations index
    urls.push({
      loc: `${baseUrl}/${vertical.slug}/destinations`,
      changefreq: 'weekly',
      priority: 0.8,
    });

    // Get destinations and blog posts
    try {
      const destinations = await getAllContentItems('destinations', vertical.slug);
      const blogPosts = await getAllContentItems('blog', vertical.slug);

      // Add destination URLs
      for (const dest of destinations) {
        urls.push({
          loc: `${baseUrl}/${vertical.slug}/destinations/${dest.slug}`,
          lastmod: dest.frontmatter.modifiedTime || dest.frontmatter.date,
          changefreq: 'monthly',
          priority: 0.7,
        });
      }

      // Add blog post URLs
      for (const post of blogPosts) {
        urls.push({
          loc: `${baseUrl}/${vertical.slug}/blog/${post.slug}`,
          lastmod: post.frontmatter.modifiedTime || post.frontmatter.date,
          changefreq: 'monthly',
          priority: 0.7,
        });
      }
    } catch (error) {
      console.error(`Error generating sitemap for vertical ${vertical.slug}:`, error);
    }
  }

  return urls;
}

/**
 * Generate sitemap XML
 */
export async function generateSitemapXml(baseUrl: string = 'https://tourwiseai.com'): Promise<string> {
  const urls = await generateSitemapUrls(baseUrl);
  const currentDate = new Date().toISOString().split('T')[0];

  const urlEntries = urls.map(url => {
    return `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `    <priority>${url.priority}</priority>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}
