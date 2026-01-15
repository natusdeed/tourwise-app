'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Zap, Globe, Brain, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const missionFeatures = [
    {
      icon: Brain,
      title: 'AI-POWERED INTELLIGENCE',
      description: 'Advanced machine learning algorithms that understand your travel preferences and craft personalized experiences.',
    },
    {
      icon: Globe,
      title: 'GLOBAL CONNECTIVITY',
      description: 'Seamless integration with travel services worldwide, connecting you to destinations across the globe.',
    },
    {
      icon: Zap,
      title: 'REAL-TIME OPTIMIZATION',
      description: 'Instant updates on prices, availability, and recommendations powered by live data streams.',
    },
  ]

  const visionPoints = [
    {
      icon: Target,
      title: 'UNIVERSAL ACCESS',
      description: 'Making premium travel planning accessible to everyone, regardless of budget or experience.',
    },
    {
      icon: Eye,
      title: 'FUTURE OF TRAVEL',
      description: 'Pioneering the next generation of travel technology with AI at the forefront.',
    },
    {
      icon: Shield,
      title: 'TRUSTED PLATFORM',
      description: 'Building a secure, reliable ecosystem that travelers can depend on for all their journey needs.',
    },
  ]

  const whyChooseUs = [
    {
      title: 'CUTTING-EDGE AI',
      description: 'Our proprietary AI engine learns from millions of travel patterns to deliver unmatched recommendations.',
      stat: '99.8%',
      statLabel: 'Accuracy Rate',
    },
    {
      title: 'COMPREHENSIVE COVERAGE',
      description: 'From flights to hotels, activities to dining—we cover every aspect of your journey in one platform.',
      stat: '10M+',
      statLabel: 'Destinations',
    },
    {
      title: '24/7 SUPPORT',
      description: 'Round-the-clock assistance from our AI travel experts, ready to help whenever you need it.',
      stat: '24/7',
      statLabel: 'Available',
    },
  ]

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      
      {/* Back to Home Button */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-neon-cyan transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm md:text-base font-medium">Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Command Center Header */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <div className="glass-strong px-6 py-2 rounded-full border border-neon-cyan/30">
                <span className="text-sm heading-robotic text-neon-cyan">COMMAND CENTER</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold heading-robotic mb-6">
              <span className="text-gradient">ABOUT TOURWISE AI</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4" />
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Revolutionizing travel planning through artificial intelligence and cutting-edge technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic mb-6 text-center">
              <span className="text-gradient">OUR MISSION</span>
            </h2>
            <div className="glass-strong rounded-2xl p-8 md:p-12 border border-neon-cyan/30 border-glow-hover">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-center mb-8">
                Revolutionizing travel with AI-powered intelligence that transforms how people discover, plan, and experience the world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {missionFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="glass rounded-xl p-6 border border-neon-cyan/20 hover:border-neon-cyan/40 transition-all duration-300"
                    >
                      <div className="mb-4">
                        <Icon className="w-10 h-10 text-neon-cyan" />
                      </div>
                      <h3 className="text-lg font-bold heading-robotic mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic mb-6 text-center">
              <span className="text-gradient text-glow">THE VISION</span>
            </h2>
            <div className="glass-strong rounded-2xl p-8 md:p-12 border border-electric-blue/30 border-glow-hover">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-center mb-12">
                Global connectivity through intelligent travel solutions that make every journey seamless, personalized, and unforgettable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visionPoints.map((point, index) => {
                  const Icon = point.icon
                  return (
                    <motion.div
                      key={point.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      whileHover={{ y: -8 }}
                      className="relative glass rounded-xl p-6 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-electric-blue/10 rounded-bl-full blur-2xl" />
                      <div className="relative">
                        <div className="mb-4">
                          <Icon className="w-10 h-10 text-electric-blue" />
                        </div>
                        <h3 className="text-lg font-bold heading-robotic mb-3 text-white">
                          {point.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic mb-12 text-center">
              <span className="text-gradient">WHY CHOOSE US</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="relative glass-strong rounded-2xl p-8 border border-neon-cyan/30 border-glow-hover overflow-hidden"
                >
                  {/* Holographic Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-white/3 opacity-0 hover:opacity-10 transition-opacity duration-500" />
                  
                  {/* Stat Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="glass px-4 py-2 rounded-full border border-neon-cyan/40">
                      <div className="text-2xl font-bold text-gradient">{item.stat}</div>
                      <div className="text-xs heading-robotic text-neon-cyan/80">{item.statLabel}</div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold heading-robotic mb-4 text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/21 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Scanline Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
