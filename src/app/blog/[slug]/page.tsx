import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import Footer from '@/components/Footer'
import { getAllContentItems, getContentItem, getRelatedContent } from '@/lib/content'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateMetadata as generateSEOMetadata,
} from '@/lib/seo'
import Link from 'next/link'
import { format } from 'date-fns'

type PageProps = { params: { slug: string } }

export async function generateStaticParams() {
  const posts = await getAllContentItems('posts')
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getContentItem('posts', params.slug)
  if (!post) {
    return { title: 'Post not found | TourWise AI' }
  }

  const { frontmatter } = post
  return generateSEOMetadata({
    title: frontmatter.seoTitle || frontmatter.title,
    description: frontmatter.seoDescription || frontmatter.description,
    keywords: frontmatter.keywords || [],
    canonicalUrl: `https://tourwiseai.com/blog/${params.slug}`,
    ogImage: frontmatter.image,
    ogType: 'article',
    publishedTime: frontmatter.date,
    author: frontmatter.author,
    section: frontmatter.category,
    tags: frontmatter.tags,
  })
}

export default async function SiteBlogPostPage({ params }: PageProps) {
  const post = await getContentItem('posts', params.slug)
  if (!post) {
    notFound()
  }

  const related = await getRelatedContent(post, 'posts', 3)
  const publishDate = post.frontmatter.date ? new Date(post.frontmatter.date) : null

  const articleSchema = generateArticleSchema({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    publishedTime: post.frontmatter.date,
    author: post.frontmatter.author,
    ogImage: post.frontmatter.image,
    section: post.frontmatter.category,
    tags: post.frontmatter.tags,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://tourwiseai.com' },
    { name: 'Blog', url: 'https://tourwiseai.com/blog' },
    { name: post.frontmatter.title, url: `https://tourwiseai.com/blog/${post.slug}` },
  ])

  return (
    <>
      <Script
        id="blog-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="relative min-h-screen pt-20 md:pt-24 pb-16">
        <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
        <article className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <nav className="text-sm text-white/60 flex flex-wrap gap-2 items-center">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/faith-travel" className="hover:text-white">
              Faith travel
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white line-clamp-1">{post.frontmatter.title}</span>
          </nav>

          <header className="space-y-3">
            {post.frontmatter.category ? (
              <p className="text-xs uppercase tracking-[0.2em] text-neon-cyan heading-robotic">
                {post.frontmatter.category}
              </p>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
              <span className="text-gradient">{post.frontmatter.title}</span>
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              {publishDate ? (
                <time dateTime={post.frontmatter.date}>
                  {format(publishDate, 'MMMM d, yyyy')}
                </time>
              ) : null}
              {post.frontmatter.author ? <span>By {post.frontmatter.author}</span> : null}
            </div>
            <p className="text-lg text-white/75">{post.frontmatter.description}</p>
          </header>

          {post.htmlContent ? (
            <div
              className="space-y-4 text-white/85 leading-relaxed [&_a]:text-neon-cyan [&_a:hover]:underline [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-xl [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          ) : null}

          {related.length ? (
            <section className="pt-10 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-semibold text-white">Related posts</h2>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="text-neon-cyan hover:underline font-medium"
                    >
                      {item.frontmatter.title}
                    </Link>
                    <p className="text-sm text-white/60">{item.frontmatter.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
        <Footer />
      </main>
    </>
  )
}
