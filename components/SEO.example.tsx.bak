/**
 * SEO Component Usage Examples
 * 
 * This file shows how to use the SEO component in different scenarios
 */

import SEO, { generateSEOMetadata } from '@/components/SEO'
import type { Metadata } from 'next'

// ============================================
// EXAMPLE 1: Using in a Server Component Page
// ============================================

/**
 * In your page.tsx file (Server Component):
 */
export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "My Page Title",
    description: "My page description for SEO",
    canonical: "https://tourwiseai.com/my-page",
    image: "/og-image.jpg",
    keywords: ["travel", "ai", "planning"],
    type: "website"
  })
}

/**
 * In your page component:
 */
export default function MyPage() {
  return (
    <>
      {/* Add schema markup */}
      <SEO 
        title="My Page Title"
        description="My page description"
        canonical="https://tourwiseai.com/my-page"
        image="/og-image.jpg"
        ratingValue="4.9"
        reviewCount="1247"
      />
      
      {/* Your page content */}
      <div>Page content here...</div>
    </>
  )
}

// ============================================
// EXAMPLE 2: Using in a Client Component
// ============================================

/**
 * If you need to use SEO in a client component,
 * you can still use the SEO component for schema markup.
 * Note: Metadata must be set in a parent Server Component.
 */
'use client'

import SEO from '@/components/SEO'

export default function ClientPage() {
  return (
    <>
      <SEO 
        title="Client Page Title"
        description="Client page description"
      />
      <div>Client component content...</div>
    </>
  )
}

// ============================================
// EXAMPLE 3: Blog Post with Article Type
// ============================================

export async function generateBlogMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "10 Best Travel Destinations in 2026",
    description: "Discover the top travel destinations for 2026...",
    canonical: "https://tourwiseai.com/blog/top-destinations-2026",
    image: "/blog/top-destinations.jpg",
    type: "article",
    publishedTime: "2026-01-15T10:00:00Z",
    modifiedTime: "2026-01-16T10:00:00Z",
    author: "TourWise Team",
    keywords: ["travel", "destinations", "2026"]
  })
}

export default function BlogPost() {
  return (
    <>
      <SEO 
        title="10 Best Travel Destinations in 2026"
        description="Discover the top travel destinations..."
        type="article"
      />
      <article>Blog post content...</article>
    </>
  )
}

// ============================================
// EXAMPLE 4: Minimal Usage (Defaults)
// ============================================

export default function SimplePage() {
  return (
    <>
      {/* Uses all default values */}
      <SEO />
      <div>Simple page content...</div>
    </>
  )
}
