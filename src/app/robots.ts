import { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const blocked = ['/api/', '/admin/', '/dashboard/', '/private/']

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: blocked },
      { userAgent: 'Googlebot', allow: '/', disallow: blocked },
      { userAgent: 'Bingbot', allow: '/', disallow: blocked },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: blocked },
      { userAgent: 'PerplexityBot', allow: '/', disallow: blocked },
      { userAgent: 'Google-Extended', allow: '/', disallow: blocked },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: blocked },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
