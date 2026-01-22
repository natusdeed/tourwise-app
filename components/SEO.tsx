'use client'

import Script from 'next/script'
import type { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  ratingValue?: string
  reviewCount?: string
}

/**
 * SEO Component for Next.js App Router
 * 
 * This component adds JSON-LD schema markup to pages.
 * For metadata (title, description, etc.), use the generateSEOMetadata() function
 * in your page.tsx files with the Metadata API.
 * 
 * Usage:
 * ```tsx
 * // In your page component
 * <SEO 
 *   title="Page Title"
 *   description="Page description"
 *   canonical="https://tourwiseai.com/page"
 *   image="/og-image.jpg"
 * />
 * ```
 */
export default function SEO({
  title = "TourWise AI - Plan Your Perfect Trip with AI in 60 Seconds",
  description = "Get personalized travel itineraries, find the cheapest flights, and discover exclusive hotel deals. Join 15,000+ travelers saving time and money with AI-powered trip planning.",
  canonical,
  image = "/header-banner.jpg.png",
  type = "website",
  ratingValue = "4.9",
  reviewCount = "1247"
}: SEOProps) {
  const siteUrl = "https://tourwiseai.com"
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const canonicalUrl = canonical || siteUrl

  // TravelAgency schema for SEO and Knowledge Graph
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "TourWise AI",
    "description": description,
    "url": siteUrl,
    "logo": `${siteUrl}/appicon.png.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount
    },
    "sameAs": [
      "https://www.facebook.com/tourwiseai",
      "https://www.instagram.com/tourwiseai",
      "https://x.com/tourwiseai",
      "https://www.youtube.com/@TourWiseAI",
      "https://www.tiktok.com/@tourwiseai",
      "https://www.linkedin.com/company/tourwiseai"
    ]
  }

  return (
    <Script
      id="travel-agency-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(travelAgencySchema)
      }}
    />
  )
}

/**
 * Generate Next.js Metadata for use in page.tsx files
 * 
 * Usage in page.tsx:
 * ```tsx
 * export async function generateMetadata(): Promise<Metadata> {
 *   return generateSEOMetadata({
 *     title: "Page Title",
 *     description: "Page description",
 *     canonical: "https://tourwiseai.com/page",
 *     image: "/og-image.jpg"
 *   })
 * }
 * ```
 */
export function generateSEOMetadata({
  title = "TourWise AI - Plan Your Perfect Trip with AI in 60 Seconds",
  description = "Get personalized travel itineraries, find the cheapest flights, and discover exclusive hotel deals. Join 15,000+ travelers saving time and money with AI-powered trip planning.",
  canonical,
  image = "/header-banner.jpg.png",
  type = "website",
  keywords,
  publishedTime,
  modifiedTime,
  author
}: {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  author?: string
}): Metadata {
  const siteUrl = "https://tourwiseai.com"
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const canonicalUrl = canonical || siteUrl

  // Ensure title includes site name if not already present
  const fullTitle = title.includes('|') || title.includes('TourWise') 
    ? title 
    : `${title} | TourWise AI`

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: type,
      title: fullTitle,
      description: description,
      url: canonicalUrl,
      siteName: 'TourWise AI',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: [fullImageUrl],
      creator: '@tourwiseai',
    },
    ...(author && {
      authors: [{ name: author }],
    }),
  }
}
