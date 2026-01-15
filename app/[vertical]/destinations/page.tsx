/**
 * Destinations Index Page
 * 
 * Lists all destinations for a vertical
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getVerticalBySlug } from '@/lib/verticals';
import { getAllContentItems } from '@/lib/content';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { MapPin, ArrowRight } from 'lucide-react';

interface PageProps {
  params: {
    vertical: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical } = params;
  const verticalConfig = getVerticalBySlug(vertical);
  
  if (!verticalConfig) {
    return { title: 'Vertical Not Found | TourWise' };
  }

  return generateSEOMetadata({
    title: `${verticalConfig.displayName} Destinations - Complete Travel Guide`,
    description: `Discover amazing destinations for ${verticalConfig.displayName.toLowerCase()}. Expert guides, itineraries, and travel tips for every destination.`,
    keywords: [...verticalConfig.keywords, 'destinations', 'travel guides'],
    canonicalUrl: `https://tourwiseai.com/${vertical}/destinations`,
  });
}

export default async function DestinationsPage({ params }: PageProps) {
  const { vertical } = params;
  const verticalConfig = getVerticalBySlug(vertical);

  if (!verticalConfig) {
    notFound();
  }

  const destinations = await getAllContentItems('destinations', vertical);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <nav className="text-sm text-white/60 mb-4">
          <Link href={`/${vertical}`} className="hover:text-white transition-colors">
            {verticalConfig.displayName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Destinations</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold heading-robotic mb-4">
          <span className="text-gradient">{verticalConfig.displayName} Destinations</span>
        </h1>
        <p className="text-xl text-white/80 mb-12">
          Explore incredible destinations for {verticalConfig.displayName.toLowerCase()} travel
        </p>

        {/* Destinations Grid */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${vertical}/destinations/${dest.slug}`}
                className="group glass-strong rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                {dest.frontmatter.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.frontmatter.image}
                      alt={dest.frontmatter.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-neon-cyan/70 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Destination</span>
                  </div>
                  <h2 className="text-xl font-bold heading-robotic mb-2 group-hover:text-neon-cyan transition-colors">
                    {dest.frontmatter.title}
                  </h2>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">
                    {dest.frontmatter.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-neon-cyan">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No destinations found yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllVerticals } = await import('@/lib/verticals');
  const verticals = getAllVerticals();
  return verticals.map((vertical) => ({
    vertical: vertical.slug,
  }));
}
