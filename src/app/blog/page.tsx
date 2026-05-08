import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import { getAllContentItems } from '@/lib/content'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Faith travel blog | TourWise AI',
  description: 'Guides and field notes for Christian travel, pilgrimage planning, and slow tourism.',
  alternates: { canonical: 'https://tourwiseai.com/blog' },
}

export default async function BlogIndexPage() {
  const posts = await getAllContentItems('posts')
  const categories = ['AI Travel Tips', 'Flight Deals', 'Destination Guides', 'Faith-Based Travel', 'Travel Essentials', 'Budget Travel']
  const blogIndexSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TourWiseAI Blog',
    url: 'https://tourwiseai.com/blog',
    description: metadata.description,
    hasPart: posts.slice(0, 12).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      url: `https://tourwiseai.com/blog/${post.slug}`,
      datePublished: post.frontmatter.date,
      description: post.frontmatter.description,
    })),
  }

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-16">
      <Script
        id="blog-index-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="space-y-3 text-center md:text-left">
          <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Stories from the road</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Practical travel content designed to support itinerary planning, smarter booking decisions, and better trip execution.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category) => (
              <span key={category} className="text-xs px-2 py-1 rounded-full border border-white/15 text-white/70">
                {category}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => {
            const date = post.frontmatter.date ? new Date(post.frontmatter.date) : null
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-strong border border-neon-cyan/20 rounded-xl p-5 hover:border-neon-cyan/50 transition-colors"
              >
                <div className="space-y-2">
                  {date ? (
                    <p className="text-xs text-white/55">
                      <time dateTime={post.frontmatter.date}>{format(date, 'MMM d, yyyy')}</time>
                    </p>
                  ) : null}
                  <h2 className="text-xl font-semibold text-white heading-robotic">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-sm text-white/70">{post.frontmatter.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        <section className="glass-strong border border-white/10 rounded-xl p-5 md:p-6">
          <h2 className="text-xl font-semibold text-white heading-robotic">Plan, then book smarter</h2>
          <p className="text-sm text-white/70 mt-2">
            Use the AI planner to shape your route before booking flights, transfers, and activities.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/ai-travel-planner" className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">
              Open AI Planner
            </Link>
            <Link href="/travel-deals" className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">
              Explore Travel Deals
            </Link>
          </div>
        </section>

        {posts.length === 0 ? (
          <div className="glass-strong border border-white/10 rounded-xl p-6 text-white/65">
            New posts ship soon. Meanwhile, explore{' '}
            <Link href="/faith-travel" className="text-neon-cyan hover:underline">
              Faith travel hub
            </Link>
            .
          </div>
        ) : null}
      </div>
      <Footer />
    </main>
  )
}
