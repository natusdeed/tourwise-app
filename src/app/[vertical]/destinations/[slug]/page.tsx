/**
 * Individual Destination Page
 * 
 * Dynamic page for each destination
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getVerticalBySlug } from '@/lib/verticals';
import { getContentItem, getRelatedContent } from '@/lib/content';
import { generateMetadata as generateSEOMetadata, generateDestinationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import DestinationTemplate from '@/components/templates/DestinationTemplate';

interface PageProps {
  params: {
    vertical: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical, slug } = params;
  const verticalConfig = getVerticalBySlug(vertical);
  const destination = await getContentItem('destinations', slug, vertical);
  
  if (!verticalConfig || !destination) {
    return { title: 'Destination Not Found | TourWise' };
  }

  return generateSEOMetadata({
    title: `${destination.frontmatter.title} - ${verticalConfig.displayName} Travel Guide`,
    description: destination.frontmatter.seoDescription || destination.frontmatter.description,
    keywords: [
      ...(destination.frontmatter.keywords || []),
      destination.frontmatter.title,
      verticalConfig.displayName,
    ],
    canonicalUrl: `https://tourwiseai.com/${vertical}/destinations/${slug}`,
    ogImage: destination.frontmatter.image,
  });
}

export default async function DestinationPage({ params }: PageProps) {
  const { vertical, slug } = params;
  const verticalConfig = getVerticalBySlug(vertical);
  const destination = await getContentItem('destinations', slug, vertical);

  if (!verticalConfig || !destination) {
    notFound();
  }

  // Get related content
  const [relatedDestinations, relatedGuides] = await Promise.all([
    getRelatedContent(destination, 'destinations', 3),
    getRelatedContent(destination, 'blog', 3),
  ]);

  // Generate schema
  const destinationSchema = generateDestinationSchema({
    name: destination.frontmatter.title,
    description: destination.frontmatter.description,
    image: destination.frontmatter.image,
    address: destination.frontmatter.location ? {
      addressCountry: destination.frontmatter.location.split(', ').pop() || '',
      addressLocality: destination.frontmatter.location.split(', ')[0] || '',
    } : undefined,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: verticalConfig.displayName, url: `/${vertical}` },
    { name: 'Destinations', url: `/${vertical}/destinations` },
    { name: destination.frontmatter.title, url: `/${vertical}/destinations/${slug}` },
  ]);

  return (
    <>
      <Script
        id="destination-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DestinationTemplate
        destination={destination}
        vertical={vertical}
        relatedDestinations={relatedDestinations}
        relatedGuides={relatedGuides}
      />
    </>
  );
}

export async function generateStaticParams() {
  const { getAllVerticals } = await import('@/lib/verticals');
  const { getAllContentItems } = await import('@/lib/content');
  
  const verticals = getAllVerticals();
  const params: Array<{ vertical: string; slug: string }> = [];

  for (const vertical of verticals) {
    try {
      const destinations = await getAllContentItems('destinations', vertical.slug);
      destinations.forEach((dest) => {
        params.push({
          vertical: vertical.slug,
          slug: dest.slug,
        });
      });
    } catch (error) {
      console.error(`Error generating params for ${vertical.slug}:`, error);
    }
  }

  return params;
}
