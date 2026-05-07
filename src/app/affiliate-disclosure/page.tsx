'use client'

import { motion } from 'framer-motion'
import { Link2, DollarSign, Shield, Info, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AffiliateDisclosurePage() {
  const sections = [
    {
      icon: Info,
      title: 'What is an Affiliate Relationship?',
      content: [
        {
          text: 'TourWise AI participates in affiliate marketing programs. This means we may earn commissions when you make purchases through links on our website.',
        },
        {
          text: 'These affiliate relationships help us provide our AI travel planning services free of charge to users.',
        },
      ],
    },
    {
      icon: Link2,
      title: 'How Affiliate Links Work',
      content: [
        {
          subtitle: 'Tracking Cookies',
          text: 'When you click an affiliate link on our site, a tracking cookie is placed in your browser. This cookie helps identify that your visit originated from TourWise AI.',
        },
        {
          subtitle: 'No Additional Cost to You',
          text: 'You pay exactly the same price whether you use our affiliate links or go directly to the travel partner\'s website. The commission comes from the partner, not from you.',
        },
        {
          subtitle: 'Commission Earnings',
          text: 'We earn a small commission if you complete a booking within a specified time period (usually 30 days) after clicking our link.',
        },
      ],
    },
    {
      icon: DollarSign,
      title: 'Our Affiliate Partners',
      content: [
        {
          subtitle: 'Travelpayouts Network',
          text: 'We work with Travelpayouts, which connects us with major travel partners including Aviasales, Booking.com, and other travel booking platforms.',
        },
        {
          subtitle: 'Transparency',
          text: 'We only partner with reputable travel companies that we trust and would recommend to our users.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Your Trust Matters',
      content: [
        {
          subtitle: 'Unbiased Recommendations',
          text: 'Our AI recommendations are based on travel data and user preferences, not on commission rates. We prioritize finding the best deals for you.',
        },
        {
          subtitle: 'User Experience First',
          text: 'Affiliate partnerships allow us to maintain a free service while providing value to travelers worldwide.',
        },
      ],
    },
    {
      icon: CheckCircle,
      title: 'Questions?',
      content: [
        {
          text: 'If you have questions about our affiliate relationships or how we make money, please contact us at don@tourwiseai.com.',
        },
      ],
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

      {/* Header Section */}
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
                <span className="text-sm heading-robotic text-neon-cyan">AFFILIATE DISCLOSURE</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold heading-robotic mb-6">
              <span className="text-gradient">AFFILIATE DISCLOSURE</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4" />
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-4">
              Transparency is important to us. This page explains how affiliate relationships work and how they support our free service.
            </p>
            <p className="text-white/50 text-sm md:text-base">
              Last Updated: January 15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclosure Sections */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          {sections.map((section, sectionIndex) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="glass-strong rounded-2xl p-6 md:p-10 border border-neon-cyan/30 border-glow-hover"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-neon-cyan" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold heading-robotic mb-6 text-white">
                      <span className="text-gradient">{section.title}</span>
                    </h2>
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: sectionIndex * 0.1 + itemIndex * 0.1 }}
                          className="glass rounded-xl p-5 md:p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300"
                        >
                          {'subtitle' in item && item.subtitle && (
                            <h3 className="text-lg md:text-xl font-semibold heading-robotic mb-3 text-neon-cyan">
                              {item.subtitle}
                            </h3>
                          )}
                          <p className="text-white/80 text-sm md:text-base leading-relaxed">
                            {item.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-2xl p-8 md:p-12 border border-electric-blue/30 border-glow-hover text-center"
          >
            <Shield className="w-16 h-16 text-electric-blue mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold heading-robotic mb-4 text-white">
              <span className="text-gradient">QUESTIONS ABOUT AFFILIATES?</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-6">
              We believe in full transparency. If you have questions about our affiliate relationships, please contact us.
            </p>
            <a
              href="mailto:don@tourwiseai.com"
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/40 hover:border-neon-cyan/60 text-neon-cyan font-semibold heading-robotic transition-all duration-300 hover:scale-105"
            >
              Contact Us: don@tourwiseai.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}