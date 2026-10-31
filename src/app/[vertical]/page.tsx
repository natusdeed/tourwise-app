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
      title: { absolute: 'Page Not Found | TourWiseAI' },
      robots: { index: false, follow: false },
    };
  }

  const verticalDescriptions: Record<string, string> = {
    africa: 'Plan Africa trips with TourWiseAI guides for safaris, national parks, wildlife, and cultural travel.',
    'christian-travel': 'Plan Christian trips with TourWiseAI guides for holy sites, pilgrimage routes, and biblical destinations.',
    luxury: 'Plan premium trips with TourWiseAI guides for luxury stays and exclusive destinations.',
    budget: 'Plan lower-cost trips with TourWiseAI guides for affordable destinations and money-saving ideas.',
    'usa-tours': 'Plan USA trips with TourWiseAI guides for national parks, cities, and road trips.',
    'island-retreats': 'Plan island trips with TourWiseAI guides for beach and tropical destinations.',
  }

  const seoData = {
    title: `${verticalConfig.displayName} Guides`,
    description: verticalDescriptions[vertical] || verticalConfig.description,
    keywords: verticalConfig.keywords,
    canonicalUrl: `https://www.tourwiseai.com/${vertical}`,
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
