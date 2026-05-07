'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, Shield, AlertTriangle, Link as LinkIcon, UserX, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TermsPage() {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        {
          text: 'By using TourWise AI, you agree to these terms. If you do not agree, please stop using the service immediately.',
        },
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Nature of Service (The AI Disclaimer)',
      content: [
        {
          text: 'TourWise AI is an AI-powered planning tool. We are not a travel agency.',
        },
        {
          text: 'We provide information and suggestions, but we do not process payments for flights or hotels directly.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Limitation of Liability',
      content: [
        {
          subtitle: 'Information Accuracy',
          text: 'Travel information (prices, availability, safety) changes rapidly. We are not responsible for any inaccuracies in AI-generated plans or price differences on third-party sites.',
        },
        {
          subtitle: 'Final Booking',
          text: 'All bookings are made on third-party partner sites. Their terms and cancellation policies apply to your purchase.',
        },
      ],
    },
    {
      icon: LinkIcon,
      title: 'Affiliate Disclosure',
      content: [
        {
          text: 'Some links on this site are affiliate links. We receive a commission if you make a purchase through these links, which supports our free AI service.',
        },
      ],
    },
    {
      icon: UserX,
      title: 'User Conduct',
      content: [
        {
          text: 'You agree not to use our AI to generate spam, malicious content, or attempt to reverse-engineer our proprietary prompts.',
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
                <span className="text-sm heading-robotic text-neon-cyan">TERMS & CONDITIONS</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold heading-robotic mb-6">
              <span className="text-gradient">TERMS & CONDITIONS</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4" />
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-4">
              Please read these terms carefully before using TourWise AI. By using our service, you agree to be bound by these terms.
            </p>
            <p className="text-white/50 text-sm md:text-base">
              Last Updated: January 15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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
            <FileText className="w-16 h-16 text-electric-blue mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold heading-robotic mb-4 text-white">
              <span className="text-gradient">QUESTIONS ABOUT OUR TERMS?</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-6">
              If you have any questions about these Terms & Conditions, please contact us.
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
