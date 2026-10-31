'use client'

import Script from 'next/script'
import type { Metadata } from 'next'
import { absoluteUrl, fitDescription, fitTitle, pageMeta } from '@/lib/site'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
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
 *   canonical="https://www.tourwiseai.com/page"
 *   image="/og-image.jpg"
 * />
 * ```
 */
export default function SEO({
  title = "TourWise AI - Plan Your Perfect Trip with AI in 60 Seconds",
  description = "Get personalized travel itineraries, find the cheapest flights, and discover exclusive hotel deals with AI-powered trip planning.",
  canonical,
  image = "/og-image.jpg",
  type = "website",
}: SEOProps) {
  const siteUrl = "https://www.tourwiseai.com"
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const canonicalUrl = canonical || siteUrl

  // Organization schema. Terms say TourWiseAI is not a travel agency.
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TourWiseAI",
    "description": description,
    "url": siteUrl,
    "logo": `${siteUrl}/appicon.png.png`,
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
      id="page-organization-schema"
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
 *     canonical: "https://www.tourwiseai.com/page",
 *     image: "/og-image.jpg"
 *   })
 * }
 * ```
 */
export function generateSEOMetadata({
  title = "TourWise AI - Plan Your Perfect Trip with AI in 60 Seconds",
  description = "Get personalized travel itineraries, find the cheapest flights, and discover exclusive hotel deals with AI-powered trip planning.",
  canonical,
  image = "/og-image.jpg",
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
  return {
    ...pageMeta({
      title: fitTitle(title),
      description: fitDescription(description),
      path: absoluteUrl(canonical || '/'),
      type: type === 'article' ? 'article' : 'website',
      image,
    }),
    keywords: keywords?.join(', '),
    ...(author && { authors: [{ name: author }] }),
    ...(publishedTime || modifiedTime ? {} : {}),
  }
}
