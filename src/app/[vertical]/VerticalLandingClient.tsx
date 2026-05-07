'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, BookOpen, Calendar } from 'lucide-react'
import type { VerticalConfig } from '@/lib/verticals'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import ToolsSection from '@/components/ToolsSection'
import ConnectionStatus from '@/components/ConnectionStatus'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import type { ContentItem } from '@/lib/content'

interface VerticalLandingClientProps {
  verticalConfig: VerticalConfig
}

export default function VerticalLandingClient({ verticalConfig }: VerticalLandingClientProps) {
  const [featuredDestinations, setFeaturedDestinations] = useState<ContentItem[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      try {
        // Fetch content from API
        const [destinationsRes, postsRes] = await Promise.all([
          fetch(`/api/content?type=destinations&vertical=${verticalConfig.slug}&limit=6`),
          fetch(`/api/content?type=blog&vertical=${verticalConfig.slug}&limit=6`),
        ])
        
        if (destinationsRes.ok) {
          const destinations = await destinationsRes.json()
          setFeaturedDestinations(destinations)
        }
        
        if (postsRes.ok) {
          const posts = await postsRes.json()
          setFeaturedPosts(posts)
        }
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [verticalConfig.slug])

  return (
    <main className="relative min-h-screen">
      <ConnectionStatus />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <Hero
          title={verticalConfig.hero.title}
          subtitle={verticalConfig.hero.subtitle}
          placeholder={verticalConfig.hero.placeholder}
          description={verticalConfig.description}
          colors={verticalConfig.colors}
        />

        {/* Feature Grid */}
        <FeatureGrid
          features={verticalConfig.features}
          colors={verticalConfig.colors}
          sectionTitle={`${verticalConfig.displayName.toUpperCase()} FEATURES`}
          sectionDescription={verticalConfig.description}
        />

        {/* Featured Destinations */}
        {!loading && featuredDestinations.length > 0 && (
          <section className="relative py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold heading-robotic mb-2">
                    <span className="text-gradient">
                      FEATURED DESTINATIONS
                    </span>
                  </h2>
                  <p className="text-white/70">Discover incredible places to visit</p>
                </motion.div>
                <Link
                  href={`/${verticalConfig.slug}/destinations`}
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg glass-strong hover:scale-[1.002] transition-transform"
                  style={{ borderColor: `${verticalConfig.colors.primary}30` }}
                >
                  <span className="text-sm heading-robotic">VIEW ALL</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.slug}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -0.3, scale: 1.001 }}
                  >
                    <Link
                      href={`/${verticalConfig.slug}/destinations/${dest.slug}`}
                      className="block group"
                    >
                      <div 
                        className="glass-strong rounded-xl overflow-hidden h-full border border-glow-hover transition-all duration-300"
                        style={{ borderColor: `${verticalConfig.colors.primary}30` }}
                      >
                        {dest.frontmatter.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={dest.frontmatter.image}
                              alt={dest.frontmatter.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div 
                              className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent"
                            />
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center gap-2 text-white/90 mb-1">
                                <MapPin className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Destination</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold heading-robotic mb-2 group-hover:opacity-98 transition-opacity">
                            {dest.frontmatter.title}
                          </h3>
                          <p className="text-white/70 text-sm line-clamp-2 mb-4">
                            {dest.frontmatter.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm" style={{ color: verticalConfig.colors.primary }}>
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-[0.1px] transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 md:hidden text-center">
                <Link
                  href={`/${verticalConfig.slug}/destinations`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-strong"
                  style={{ borderColor: `${verticalConfig.colors.primary}30` }}
                >
                  <span className="text-sm heading-robotic">VIEW ALL DESTINATIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Featured Blog Posts */}
        {!loading && featuredPosts.length > 0 && (
          <section className="relative py-4 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: `${verticalConfig.colors.primary}20` }}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold heading-robotic mb-2">
                    <span className="text-gradient">
                      TRAVEL GUIDES & TIPS
                    </span>
                  </h2>
                  <p className="text-white/70">Expert advice and insights</p>
                </motion.div>
                <Link
                  href={`/${verticalConfig.slug}/blog`}
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg glass-strong hover:scale-[1.002] transition-transform"
                  style={{ borderColor: `${verticalConfig.colors.primary}30` }}
                >
                  <span className="text-sm heading-robotic">VIEW ALL</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -0.3, scale: 1.001 }}
                  >
                    <Link
                      href={`/${verticalConfig.slug}/blog/${post.slug}`}
                      className="block group"
                    >
                      <div 
                        className="glass-strong rounded-xl overflow-hidden h-full border border-glow-hover transition-all duration-300"
                        style={{ borderColor: `${verticalConfig.colors.primary}30` }}
                      >
                        {post.frontmatter.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.frontmatter.image}
                              alt={post.frontmatter.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center gap-2 text-white/90 mb-1">
                                <BookOpen className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Guide</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          {post.frontmatter.category && (
                            <span 
                              className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                              style={{ 
                                backgroundColor: `${verticalConfig.colors.primary}20`,
                                color: verticalConfig.colors.primary 
                              }}
                            >
                              {post.frontmatter.category}
                            </span>
                          )}
                          <h3 className="text-xl font-bold heading-robotic mb-2 group-hover:opacity-30 transition-opacity">
                            {post.frontmatter.title}
                          </h3>
                          <p className="text-white/21 text-sm line-clamp-2 mb-4">
                            {post.frontmatter.description}
                          </p>
                          {post.frontmatter.date && (
                            <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                              <Calendar className="w-3 h-3" />
                              <time>{new Date(post.frontmatter.date).toLocaleDateString()}</time>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm" style={{ color: verticalConfig.colors.primary }}>
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-[0.1px] transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 md:hidden text-center">
                <Link
                  href={`/${verticalConfig.slug}/blog`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-strong"
                  style={{ borderColor: `${verticalConfig.colors.primary}30` }}
                >
                  <span className="text-sm heading-robotic">VIEW ALL GUIDES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Tools Section */}
        <ToolsSection />
        
        {/* Footer */}
        <Footer />
      </motion.div>
    </main>
  )
}
