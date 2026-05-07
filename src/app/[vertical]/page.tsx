/**
 * Vertical Landing Page
 * 
 * Dynamic page for each travel vertical (africa, christian-travel, luxury, budget, usa-tours)
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getVerticalBySlug } from '@/lib/verticals';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateDestinationSchema } from '@/lib/seo';
import VerticalLandingClient from './VerticalLandingClient';
import Script from 'next/script';

interface PageProps {
  params: {
    vertical: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical } = params;
  const verticalConfig = getVerticalBySlug(vertical);
  
  if (!verticalConfig) {
    return {
      title: 'Vertical Not Found | TourWise',
    };
  }

  const seoData = {
    title: `${verticalConfig.displayName} - Expert Travel Guides & Planning`,
    description: verticalConfig.description,
    keywords: verticalConfig.keywords,
    canonicalUrl: `https://tourwiseai.com/${vertical}`,
  };

  return generateSEOMetadata(seoData);
}

export default async function VerticalPage({ params }: PageProps) {
  const { vertical } = params;
  const verticalConfig = getVerticalBySlug(vertical);

  if (!verticalConfig) {
    notFound();
  }

  // Generate schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: verticalConfig.displayName, url: `/${vertical}` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VerticalLandingClient verticalConfig={verticalConfig} />
    </>
  );
}

export async function generateStaticParams() {
  const { getAllVerticals } = await import('@/lib/verticals');
  const verticals = getAllVerticals();
  return verticals.map((vertical) => ({
    vertical: vertical.slug,
  }));
}
