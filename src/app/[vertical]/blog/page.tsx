/**
 * Blog Index Page
 * 
 * Lists all blog posts for a vertical
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getVerticalBySlug } from '@/lib/verticals';
import { getAllContentItems } from '@/lib/content';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

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
    title: `${verticalConfig.displayName} Travel Blog - Guides, Tips & Itineraries`,
    description: `Expert travel guides, tips, and itineraries for ${verticalConfig.displayName.toLowerCase()}. Plan your perfect trip with our comprehensive blog.`,
    keywords: [...verticalConfig.keywords, 'travel blog', 'travel guides', 'travel tips'],
    canonicalUrl: `https://tourwiseai.com/${vertical}/blog`,
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { vertical } = params;
  const verticalConfig = getVerticalBySlug(vertical);

  if (!verticalConfig) {
    notFound();
  }

  const posts = await getAllContentItems('blog', vertical);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <nav className="text-sm text-white/60 mb-4">
          <Link href={`/${vertical}`} className="hover:text-white transition-colors">
            {verticalConfig.displayName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Blog</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold heading-robotic mb-4">
          <span className="text-gradient">{verticalConfig.displayName} Travel Blog</span>
        </h1>
        <p className="text-xl text-white/80 mb-12">
          Expert guides, tips, and insights for {verticalConfig.displayName.toLowerCase()} travel
        </p>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${vertical}/blog/${post.slug}`}
                className="group glass-strong rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                {post.frontmatter.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  {post.frontmatter.category && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs mb-3 bg-neon-cyan/20 text-neon-cyan">
                      {post.frontmatter.category}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-neon-cyan/70 mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Article</span>
                  </div>
                  <h2 className="text-xl font-bold heading-robotic mb-2 group-hover:text-neon-cyan transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">
                    {post.frontmatter.description}
                  </p>
                  {post.frontmatter.date && (
                    <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
                      <Calendar className="w-3 h-3" />
                      <time>{format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}</time>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-neon-cyan">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No blog posts found yet. Check back soon!</p>
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
