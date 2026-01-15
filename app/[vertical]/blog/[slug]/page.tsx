/**
 * Individual Blog Post Page
 * 
 * Dynamic page for each blog post
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getVerticalBySlug } from '@/lib/verticals';
import { getContentItem, getRelatedContent } from '@/lib/content';
import { generateMetadata as generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';
import BlogTemplate from '@/components/templates/BlogTemplate';

interface PageProps {
  params: {
    vertical: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical, slug } = params;
  const verticalConfig = getVerticalBySlug(vertical);
  const post = await getContentItem('blog', slug, vertical);
  
  if (!verticalConfig || !post) {
    return { title: 'Post Not Found | TourWise' };
  }

  return generateSEOMetadata({
    title: post.frontmatter.seoTitle || `${post.frontmatter.title} - ${verticalConfig.displayName}`,
    description: post.frontmatter.seoDescription || post.frontmatter.description,
    keywords: post.frontmatter.keywords || [],
    canonicalUrl: `https://tourwiseai.com/${vertical}/blog/${slug}`,
    ogImage: post.frontmatter.image,
    ogType: 'article',
    publishedTime: post.frontmatter.date,
    author: post.frontmatter.author,
    section: post.frontmatter.category,
    tags: post.frontmatter.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { vertical, slug } = params;
  const verticalConfig = getVerticalBySlug(vertical);
  const post = await getContentItem('blog', slug, vertical);

  if (!verticalConfig || !post) {
    notFound();
  }

  // Get related content
  const [relatedPosts, relatedDestinations] = await Promise.all([
    getRelatedContent(post, 'blog', 3),
    getRelatedContent(post, 'destinations', 3),
  ]);

  // Generate schema
  const articleSchema = generateArticleSchema({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    publishedTime: post.frontmatter.date,
    author: post.frontmatter.author,
    ogImage: post.frontmatter.image,
    section: post.frontmatter.category,
    tags: post.frontmatter.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: verticalConfig.displayName, url: `/${vertical}` },
    { name: 'Blog', url: `/${vertical}/blog` },
    { name: post.frontmatter.title, url: `/${vertical}/blog/${slug}` },
  ]);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogTemplate
        post={post}
        vertical={vertical}
        relatedPosts={relatedPosts}
        relatedDestinations={relatedDestinations}
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
      const posts = await getAllContentItems('blog', vertical.slug);
      posts.forEach((post) => {
        params.push({
          vertical: vertical.slug,
          slug: post.slug,
        });
      });
    } catch (error) {
      console.error(`Error generating params for ${vertical.slug}:`, error);
    }
  }

  return params;
}
