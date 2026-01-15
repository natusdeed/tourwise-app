'use client'

import { motion } from 'framer-motion'
import { Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import LegalModal from './LegalModal'

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'affiliate' | null>(null)

  // Legal document content
  const legalContent = {
    privacy: {
      title: 'Privacy Policy',
      content: 'TourWise AI values your privacy. We use cookies to track affiliate referrals and improve user experience. We do not sell your data.',
    },
    terms: {
      title: 'Terms of Service',
      content: 'TourWise AI provides travel information and AI planning. All bookings are fulfilled by third-party partners. We are not liable for travel disruptions.',
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      content: 'TourWise AI is a participant in affiliate programs including Travelpayouts. We may earn a commission on bookings made through our links at no additional cost to you.',
    },
  }

  return (
    <>
      <footer className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-neon-cyan/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
              {/* Brand Section */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold heading-robotic mb-4">
                  <span className="text-gradient">TOURWISE AI</span>
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-6">
                  Your next-generation AI travel companion
                </p>
              </div>

              {/* Legal Section */}
              <div className="text-center md:text-left">
                <h4 className="text-white font-semibold mb-4 text-sm heading-robotic">LEGAL</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/affiliate-disclosure"
                      className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200"
                    >
                      Affiliate Disclosure
                    </Link>
                  </li>
                </ul>
              </div>

              {/* About Section */}
              <div className="text-center md:text-left">
                <h4 className="text-white font-semibold mb-4 text-sm heading-robotic">ABOUT</h4>
                <Link 
                  href="/about"
                  className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200 inline-block mb-2"
                >
                  About TourWise AI
                </Link>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed mt-3">
                  Plan Smart. Travel Further.
                </p>
              </div>

              {/* Social Media Section */}
              <div className="text-center md:text-left">
                <h4 className="text-white font-semibold mb-4 text-sm heading-robotic">CONNECT</h4>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                  <motion.a
                    href="https://www.youtube.com/@TourWiseAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative min-h-[40px] min-w-[40px]"
                    aria-label="YouTube"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-red-500/60 group-hover:bg-red-500/30">
                      <Youtube className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/tourwiseai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative min-h-[40px] min-w-[40px]"
                    aria-label="Facebook"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-blue-500/60 group-hover:bg-blue-500/30">
                      <Facebook className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/tourwiseai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative min-h-[40px] min-w-[40px]"
                    aria-label="Instagram"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-pink-500/60 group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:via-purple-500/30 group-hover:to-orange-500/30">
                      <Instagram className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://x.com/tourwiseai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative min-h-[40px] min-w-[40px]"
                    aria-label="X (Twitter)"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-600/30 flex items-center justify-center transition-all duration-300 group-hover:border-gray-500/60 group-hover:bg-gray-700/30">
                      <Twitter className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.tiktok.com/@tourwiseai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative min-h-[40px] min-w-[40px]"
                    aria-label="TikTok"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-black/40 to-gray-900/40 border border-gray-700/30 flex items-center justify-center transition-all duration-300 group-hover:border-gray-600/60 group-hover:bg-black/50">
                      <svg className="w-5 h-5 text-white group-hover:text-gray-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/company/tourwiseai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative min-h-[40px] min-w-[40px]"
                    aria-label="LinkedIn"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-600/30 flex items-center justify-center transition-all duration-300 group-hover:border-blue-500/60 group-hover:bg-blue-600/30">
                      <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neon-cyan/10 pt-6 md:pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs md:text-sm text-white/60">
                  <span>© 2026 TourWise AI. Plan Smart. Travel Further.</span>
                </div>
                <a 
                  href="https://mercyspeaksdigital.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-white/50 hover:text-neon-cyan transition-colors duration-200"
                >
                  A Mercy Speaks Digital Project.
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  )
}