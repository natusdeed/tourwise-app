'use client'

import { motion } from 'framer-motion'
import { Menu, Plane, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const scrollToFeatures = () => {
    setIsMenuOpen(false)
    
    // Wait for the page to be ready
    if (typeof window === 'undefined') return
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.querySelector('#features')
        if (element && typeof window !== 'undefined') {
          // Calculate offset for navbar height
          const navbarHeight = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navbarHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 150)
    })
  }

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // If we're on the home page, just scroll
    if (pathname === '/') {
      scrollToFeatures()
    } else {
      // If we're on another page, navigate to home first
      // Store intent to scroll in sessionStorage
      sessionStorage.setItem('scrollToFeatures', 'true')
      router.push('/')
    }
  }

  // Handle scroll to features after navigation to home page
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined') {
      // Check if we need to scroll after navigation
      const shouldScroll = sessionStorage.getItem('scrollToFeatures')
      if (shouldScroll === 'true') {
        sessionStorage.removeItem('scrollToFeatures')
        scrollToFeatures()
      } else if (window.location.hash === '#features') {
        // Also handle direct hash navigation
        scrollToFeatures()
      }
    }
  }, [pathname])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-neon-cyan/20 relative overflow-hidden"
      style={{ 
        background: 'rgba(8, 12, 24, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 group"
            >
              {/* Sparkle Icon with Animation */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-neon-cyan"
              >
                <Sparkles className="h-8 w-8 md:h-10 md:w-10" />
              </motion.div>
              
              {/* Enhanced Text Logo - Clear and Sharp */}
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold heading-robotic relative z-10">
                {/* Gradient overlay - 100% visible, no lighting effects */}
                <span 
                  className="relative"
                  style={{
                    background: 'linear-gradient(135deg, #00FFFF 0%, #32A8DD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block'
                  }}
                >
                  TOURWISE
                </span>
              </span>
              
              {/* AI Badge */}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-sm md:text-base font-bold heading-robotic bg-gradient-to-r from-neon-cyan to-electric-blue text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-neon-cyan/50 shadow-lg shadow-cyan-500/50"
              >
                AI
              </motion.span>
            </Link>
          </motion.div>

          {/* Realistic plane flying between logo and Home button with smooth U-turns (doesn't affect layout or clicks) */}
          <div className="hidden md:flex items-center pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2">
            <motion.div
              aria-hidden="true"
              className="relative"
              animate={{ 
                x: ['-280px', '280px', '280px', '-280px'],
                rotate: [0, 0, 180, 180]
              }}
              transition={{ 
                x: {
                  duration: 48,
                  ease: [0.4, 0, 0.2, 1],
                  repeat: Infinity,
                  repeatType: 'loop',
                  times: [0, 0.47, 0.53, 1]
                },
                rotate: {
                  duration: 48,
                  ease: [0.4, 0, 0.2, 1],
                  repeat: Infinity,
                  repeatType: 'loop',
                  times: [0, 0.47, 0.53, 1]
                }
              }}
            >
              {/* Motion trail effect */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 h-[2px] w-24 bg-gradient-to-l from-white/40 via-white/20 to-transparent blur-sm" />
              
              {/* Plane with realistic glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
                className="text-white"
                style={{ 
                  filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.7)) drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Plane className="h-16 w-16" />
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10" style={{ marginLeft: '20px' }}>
            {navLinks.map((link, index) => (
              link.name === 'Features' ? (
                <motion.a
                  key={link.name}
                  href="/#features"
                  onClick={handleFeaturesClick}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-base lg:text-lg heading-robotic font-bold text-white hover:text-[#00FFFF] transition-colors duration-300 cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ) : link.href.startsWith('/') ? (
                <motion.span
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base lg:text-lg heading-robotic font-bold text-white hover:text-[#00FFFF] transition-all duration-300 cursor-pointer hover:scale-110 inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.span>
              ) : null
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neon-cyan hover:text-electric-blue transition-colors p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={32} className="text-glow" />
            ) : (
              <Menu size={32} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-5"
          >
            {navLinks.map((link) => (
              link.name === 'Features' ? (
                <a
                  key={link.name}
                  href="/#features"
                  onClick={handleFeaturesClick}
                  className="block text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-2"
                >
                  {link.name}
                </a>
              ) : link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-2"
                >
                  {link.name}
                </Link>
              ) : null
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
