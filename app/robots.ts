/**
 * Robots.txt Route
 * All-Access SEO Strategy - Optimized for Google, Apple (Siri), and AI LLMs (ChatGPT/Perplexity)
 * Explicitly allows all major search engines and AI crawlers
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tourwiseai.com';
  
  return {
    rules: [
      // Allow All - Default rule
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Allow Apple (Siri)
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Allow Apple AI
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Allow AI Bots - GPTBot (ChatGPT)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Allow AI Bots - CCBot (Common Crawl, used by many AI models)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Allow AI Bots - Google-Extended (Google AI training)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Additional AI crawlers for comprehensive coverage
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Search Engine bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
