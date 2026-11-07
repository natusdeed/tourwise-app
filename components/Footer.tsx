import { Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'
import CookieSettingsButton from '@/components/CookieSettingsButton'

const social = [
  {
    href: 'https://www.youtube.com/@TourWiseAI',
    label: 'YouTube',
    icon: <Youtube className="w-5 h-5 text-red-400" />,
    box: 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30',
  },
  {
    href: 'https://www.facebook.com/tourwiseai',
    label: 'Facebook',
    icon: <Facebook className="w-5 h-5 text-blue-400" />,
    box: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30',
  },
  {
    href: 'https://www.instagram.com/tourwiseai',
    label: 'Instagram',
    icon: <Instagram className="w-5 h-5 text-pink-400" />,
    box: 'bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 border border-pink-500/30',
  },
  {
    href: 'https://x.com/tourwiseai',
    label: 'X (Twitter)',
    icon: <Twitter className="w-5 h-5 text-gray-400" />,
    box: 'bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-600/30',
  },
  {
    href: 'https://www.tiktok.com/@tourwiseai',
    label: 'TikTok',
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    box: 'bg-gradient-to-br from-black/40 to-gray-900/40 border border-gray-700/30',
  },
  {
    href: 'https://www.linkedin.com/company/tourwiseai',
    label: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5 text-blue-400" />,
    box: 'bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-600/30',
  },
]

export default function Footer() {
  return (
    <footer className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-neon-cyan/20">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="text-center md:text-left min-w-0">
            <h3 className="text-2xl md:text-3xl font-bold heading-robotic mb-4">
              <span className="text-gradient">TOURWISE AI</span>
            </h3>
            <p className="text-white/70 text-sm md:text-base mb-6">
              Your next-generation AI travel companion
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 text-sm heading-robotic">LEGAL</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4 text-sm heading-robotic">COMPANY</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-neon-cyan text-xs md:text-sm transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed mt-4">
              Plan Smart. Travel Further.
            </p>
          </div>

          <div className="text-center md:text-left min-w-0">
            <h4 className="text-white font-semibold mb-4 text-sm heading-robotic">CONNECT</h4>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative min-h-[40px] min-w-[40px]"
                  aria-label={item.label}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.box}`}>
                    {item.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neon-cyan/10 pt-6 md:pt-8 min-w-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left min-w-0">
            <div className="flex min-w-0 flex-col md:flex-row items-center gap-2 md:gap-4 text-xs md:text-sm text-white/60">
              <span>© 2026 TourWise AI. Plan Smart. Travel Further.</span>
              <span className="text-white/60 max-w-md md:max-w-lg text-center md:text-left">
                Disclosure: TourwiseAI may earn a commission when you book through some links, at no
                extra cost to you.
              </span>
            </div>
            <a
              href="https://mercyspeaksdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm text-white/60 hover:text-neon-cyan transition-colors duration-200"
            >
              A Mercy Speaks Digital Project.
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
