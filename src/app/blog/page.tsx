import type { Metadata } from 'next'
import Link from 'next/link'
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

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 pb-16">
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="space-y-3 text-center md:text-left">
          <p className="text-xs tracking-[0.25em] uppercase text-neon-cyan heading-robotic">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">Stories from the road</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Long-form companions to the AI planner—focused on pilgrimage pacing, ticketing, and
            respectful travel.
          </p>
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
