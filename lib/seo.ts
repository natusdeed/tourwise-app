/**
 * SEO Utilities System
 * 
 * Centralized SEO metadata generation, schema markup, and utilities
 */

import type { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  schema?: object; // Custom JSON-LD schema
}

/**
 * Generate Next.js Metadata from SEO data
 */
export function generateMetadata(seoData: SEOData, baseUrl: string = 'https://tourwise.ai'): Metadata {
  const title = seoData.title.includes('|') ? seoData.title : `${seoData.title} | TourWise`;
  const canonicalUrl = seoData.canonicalUrl || baseUrl;
  const ogImage = seoData.ogImage || `${baseUrl}/og-default.jpg`;

  return {
    title,
    description: seoData.description,
    keywords: seoData.keywords?.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: seoData.description,
      url: canonicalUrl,
      siteName: 'TourWise',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
      locale: 'en_US',
      type: seoData.ogType || 'website',
      ...(seoData.publishedTime && { publishedTime: seoData.publishedTime }),
      ...(seoData.modifiedTime && { modifiedTime: seoData.modifiedTime }),
      ...(seoData.section && { section: seoData.section }),
      ...(seoData.tags && { tags: seoData.tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seoData.description,
      images: [ogImage],
    },
    ...(seoData.author && {
      authors: [{ name: seoData.author }],
    }),
  };
}

/**
 * Generate JSON-LD schema for Article (Blog posts)
 */
export function generateArticleSchema(seoData: SEOData, baseUrl: string = 'https://tourwiseai.com'): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoData.title,
    description: seoData.description,
    image: seoData.ogImage || `${baseUrl}/og-default.jpg`,
    datePublished: seoData.publishedTime,
    dateModified: seoData.modifiedTime || seoData.publishedTime,
    author: {
      '@type': 'Person',
      name: seoData.author || 'TourWise Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TourWise',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    ...(seoData.section && { articleSection: seoData.section }),
    ...(seoData.keywords && { keywords: seoData.keywords.join(', ') }),
    ...(seoData.schema && seoData.schema),
  };
}

/**
 * Generate JSON-LD schema for TravelDestination
 */
export function generateDestinationSchema(
  destination: {
    name: string;
    description: string;
    image?: string;
    address?: {
      addressCountry: string;
      addressLocality?: string;
      addressRegion?: string;
    };
    geo?: {
      latitude: number;
      longitude: number;
    };
  },
  baseUrl: string = 'https://tourwiseai.com'
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    image: destination.image || `${baseUrl}/og-default.jpg`,
    ...(destination.address && {
      address: {
        '@type': 'PostalAddress',
        ...destination.address,
      },
    }),
    ...(destination.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: destination.geo.latitude,
        longitude: destination.geo.longitude,
      },
    }),
  };
}

/**
 * Generate JSON-LD schema for BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string = 'https://tourwiseai.com'
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD schema for WebSite with SearchAction
 */
export function generateWebsiteSchema(baseUrl: string = 'https://tourwiseai.com'): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TourWise AI',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD schema for Product/Offer (Flight Deals)
 * Critical for AI Overviews in 2026
 */
export function generateProductSchema(
  product: {
    name: string;
    description: string;
    price: number;
    currency: string;
    availability?: string;
    url?: string;
    image?: string;
    brand?: string;
    category?: string;
  },
  baseUrl: string = 'https://tourwiseai.com'
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${baseUrl}/header-banner.jpg`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'TourWise AI',
    },
    category: product.category || 'Travel',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.availability || 'https://schema.org/InStock',
      url: product.url || baseUrl,
      priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Valid for 7 days
    },
  };
}

/**
 * Generate JSON-LD schema for FAQPage
 * Critical for FAQ rich snippets
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  baseUrl: string = 'https://tourwiseai.com'
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Clean URL for SEO (slug generation)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate clean, SEO-friendly URL
 */
export function generateCleanUrl(parts: string[]): string {
  return '/' + parts.map(part => slugify(part)).join('/');
}
