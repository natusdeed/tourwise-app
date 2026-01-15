/**
 * Blog Post Template
 * 
 * Reusable template for blog posts across all verticals
 */

import { Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import type { ContentItem } from '@/lib/content';

interface BlogTemplateProps {
  post: ContentItem;
  vertical: string;
  relatedPosts?: ContentItem[];
  relatedDestinations?: ContentItem[];
}

export default function BlogTemplate({
  post,
  vertical,
  relatedPosts = [],
  relatedDestinations = [],
}: BlogTemplateProps) {
  const { frontmatter, htmlContent } = post;
  const publishDate = frontmatter.date ? new Date(frontmatter.date) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <nav className="text-sm text-white/60 mb-4">
        <Link href={`/${vertical}`} className="hover:text-white transition-colors">
          {vertical.replace('-', ' ').toUpperCase()}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${vertical}/blog`} className="hover:text-white transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{frontmatter.title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold heading-robotic mb-6">
        <span className="text-gradient">{frontmatter.title}</span>
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-8 pb-8 border-b border-white/10">
        {publishDate && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={frontmatter.date}>
              {format(publishDate, 'MMMM d, yyyy')}
            </time>
          </div>
        )}
        {frontmatter.author && (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{frontmatter.author}</span>
          </div>
        )}
        {frontmatter.category && (
          <Link
            href={`/${vertical}/blog/category/${frontmatter.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
          >
            {frontmatter.category}
          </Link>
        )}
      </div>

      {/* Featured Image */}
      {frontmatter.image && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>
      )}

      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${vertical}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-neon-cyan/50 transition-colors text-sm"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Content */}
      <article className="prose prose-invert prose-lg max-w-none mb-12">
        {htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-12 border-t border-white/10">
          <h2 className="text-3xl font-bold heading-robotic mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/${vertical}/blog/${relatedPost.slug}`}
                className="glass-strong rounded-xl p-6 hover:scale-105 transition-transform group"
              >
                {relatedPost.frontmatter.image && (
                  <img
                    src={relatedPost.frontmatter.image}
                    alt={relatedPost.frontmatter.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold heading-robotic mb-2 group-hover:text-neon-cyan transition-colors">
                  {relatedPost.frontmatter.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">
                  {relatedPost.frontmatter.description}
                </p>
                {relatedPost.frontmatter.date && (
                  <time className="text-xs text-white/50 mt-2 block">
                    {format(new Date(relatedPost.frontmatter.date), 'MMMM d, yyyy')}
                  </time>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="mt-12 pt-12 border-t border-white/10">
          <h2 className="text-3xl font-bold heading-robotic mb-6">Explore These Destinations</h2>
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

      {/* Back to Blog */}
      <div className="mt-12">
        <Link
          href={`/${vertical}/blog`}
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-electric-blue transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
