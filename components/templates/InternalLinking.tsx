/**
 * Internal Linking Components
 * 
 * Reusable components for internal linking blocks
 */

import Link from 'next/link';
import { ArrowRight, MapPin, BookOpen, Plane } from 'lucide-react';
import type { ContentItem } from '@/lib/content';

interface RelatedDestinationsProps {
  destinations: ContentItem[];
  vertical: string;
  title?: string;
}

export function RelatedDestinations({
  destinations,
  vertical,
  title = 'Related Destinations',
}: RelatedDestinationsProps) {
  if (destinations.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold heading-robotic">{title}</h2>
        <Link
          href={`/${vertical}/destinations`}
          className="flex items-center gap-2 text-neon-cyan hover:text-electric-blue transition-colors text-sm"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/${vertical}/destinations/${dest.slug}`}
            className="glass-strong rounded-xl p-6 hover:scale-105 transition-transform group"
          >
            {dest.frontmatter.image && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={dest.frontmatter.image}
                  alt={dest.frontmatter.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex items-center gap-2 text-neon-cyan/70 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Destination</span>
            </div>
            <h3 className="text-xl font-bold heading-robotic mb-2 group-hover:text-neon-cyan transition-colors">
              {dest.frontmatter.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-2">
              {dest.frontmatter.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface RelatedGuidesProps {
  guides: ContentItem[];
  vertical: string;
  title?: string;
}

export function RelatedGuides({
  guides,
  vertical,
  title = 'Related Guides',
}: RelatedGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold heading-robotic">{title}</h2>
        <Link
          href={`/${vertical}/blog`}
          className="flex items-center gap-2 text-neon-cyan hover:text-electric-blue transition-colors text-sm"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/${vertical}/blog/${guide.slug}`}
            className="glass-strong rounded-xl p-6 hover:scale-105 transition-transform group"
          >
            {guide.frontmatter.image && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={guide.frontmatter.image}
                  alt={guide.frontmatter.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex items-center gap-2 text-neon-cyan/70 mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Guide</span>
            </div>
            <h3 className="text-xl font-bold heading-robotic mb-2 group-hover:text-neon-cyan transition-colors">
              {guide.frontmatter.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-2">
              {guide.frontmatter.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface BookTripSectionProps {
  destination?: string;
  vertical: string;
  title?: string;
}

export function BookTripSection({
  destination,
  vertical,
  title = 'Book This Trip',
}: BookTripSectionProps) {
  const hotelLink = destination
    ? `/api/affiliate?destination=${encodeURIComponent(destination)}&category=hotel&vertical=${vertical}`
    : null;
  const tourLink = destination
    ? `/api/affiliate?destination=${encodeURIComponent(destination)}&category=tour&vertical=${vertical}`
    : null;

  if (!hotelLink && !tourLink) return null;

  return (
    <section className="glass-strong rounded-xl p-8 mt-12">
      <h2 className="text-3xl font-bold heading-robotic mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {hotelLink && (
          <a
            href={hotelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-xl p-6 hover:scale-105 transition-transform text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-cyan/20 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors">
              <Plane className="w-8 h-8 text-neon-cyan" />
            </div>
            <h3 className="text-xl font-bold heading-robotic mb-2">Book Hotels</h3>
            <p className="text-white/70 text-sm mb-4">
              Find the perfect accommodation for your stay
            </p>
            <span className="inline-flex items-center gap-2 text-neon-cyan text-sm">
              Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        )}
        {tourLink && (
          <a
            href={tourLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-xl p-6 hover:scale-105 transition-transform text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-cyan/20 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors">
              <MapPin className="w-8 h-8 text-neon-cyan" />
            </div>
            <h3 className="text-xl font-bold heading-robotic mb-2">Book Tours</h3>
            <p className="text-white/70 text-sm mb-4">
              Discover amazing tours and experiences
            </p>
            <span className="inline-flex items-center gap-2 text-neon-cyan text-sm">
              Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
