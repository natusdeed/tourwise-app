/**
 * Destination Page Template
 * 
 * Reusable template for destination pages across all verticals
 */

import { MapPin, Calendar, DollarSign, Star } from 'lucide-react';
import Link from 'next/link';
import { generateBestAffiliateLink } from '@/lib/affiliates';
import type { ContentItem } from '@/lib/content';

interface DestinationTemplateProps {
  destination: ContentItem;
  vertical: string;
  relatedDestinations?: ContentItem[];
  relatedGuides?: ContentItem[];
}

export default function DestinationTemplate({
  destination,
  vertical,
  relatedDestinations = [],
  relatedGuides = [],
}: DestinationTemplateProps) {
  const { frontmatter, htmlContent } = destination;
  
  const hotelLink = generateBestAffiliateLink({
    destination: frontmatter.title,
    category: 'hotel',
    vertical,
  });
  
  const tourLink = generateBestAffiliateLink({
    destination: frontmatter.title,
    category: 'tour',
    vertical,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-8">
        <nav className="text-sm text-white/60 mb-4">
          <Link href={`/${vertical}`} className="hover:text-white transition-colors">
            {vertical.replace('-', ' ').toUpperCase()}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{frontmatter.title}</span>
        </nav>
        
        <h1 className="text-4xl md:text-5xl font-bold heading-robotic mb-4">
          <span className="text-gradient">{frontmatter.title}</span>
        </h1>
        
        <p className="text-xl text-white/80 mb-6">
          {frontmatter.description}
        </p>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          {frontmatter.location && (
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4" />
              <span>{frontmatter.location}</span>
            </div>
          )}
          {frontmatter.bestTime && (
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="w-4 h-4" />
              <span>Best Time: {frontmatter.bestTime}</span>
            </div>
          )}
          {frontmatter.budget && (
            <div className="flex items-center gap-2 text-white/70">
              <DollarSign className="w-4 h-4" />
              <span>{frontmatter.budget}</span>
            </div>
          )}
          {frontmatter.rating && (
            <div className="flex items-center gap-2 text-white/70">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{frontmatter.rating}/5</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Image */}
      {frontmatter.image && (
        <div className="mb-12 rounded-xl overflow-hidden">
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Overview Section */}
          <section className="glass-strong rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold heading-robotic mb-4">Overview</h2>
            {htmlContent && (
              <div
                className="prose prose-invert max-w-none text-white/80"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </section>

          {/* Things to Do */}
          {frontmatter.thingsToDo && frontmatter.thingsToDo.length > 0 && (
            <section className="glass-strong rounded-xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold heading-robotic mb-6">Things to Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frontmatter.thingsToDo.map((activity: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                    <span className="text-white/80">{activity}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Travel Tips */}
          {frontmatter.travelTips && frontmatter.travelTips.length > 0 && (
            <section className="glass-strong rounded-xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold heading-robotic mb-6">Travel Tips</h2>
              <ul className="space-y-3">
                {frontmatter.travelTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-white/80">
                    <span className="text-neon-cyan">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Where to Stay */}
          {hotelLink && (
            <section className="glass-strong rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold heading-robotic mb-4">Where to Stay</h3>
              <p className="text-white/70 text-sm mb-4">
                Find the perfect accommodation for your stay
              </p>
              <a
                href={hotelLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-6 rounded-lg bg-neon-cyan text-black font-bold hover:bg-electric-blue transition-colors"
              >
                Book Hotels
              </a>
            </section>
          )}

          {/* Book Tours */}
          {tourLink && (
            <section className="glass-strong rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold heading-robotic mb-4">Tours & Activities</h3>
              <p className="text-white/70 text-sm mb-4">
                Discover amazing tours and experiences
              </p>
              <a
                href={tourLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-6 rounded-lg bg-neon-cyan text-black font-bold hover:bg-electric-blue transition-colors"
              >
                Book Tours
              </a>
            </section>
          )}

          {/* Quick Facts */}
          {frontmatter.quickFacts && (
            <section className="glass-strong rounded-xl p-6">
              <h3 className="text-xl font-bold heading-robotic mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                {Object.entries(frontmatter.quickFacts).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm text-white/60 uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="text-white/90">{value as string}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>

      {/* Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold heading-robotic mb-6">Related Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${vertical}/destinations/${dest.slug}`}
                className="glass-strong rounded-xl p-6 hover:scale-105 transition-transform group"
              >
                {dest.frontmatter.image && (
                  <img
                    src={dest.frontmatter.image}
                    alt={dest.frontmatter.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
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
      )}

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold heading-robotic mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${vertical}/blog/${guide.slug}`}
                className="glass-strong rounded-xl p-6 hover:scale-105 transition-transform group"
              >
                {guide.frontmatter.image && (
                  <img
                    src={guide.frontmatter.image}
                    alt={guide.frontmatter.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
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
      )}
    </div>
  );
}
