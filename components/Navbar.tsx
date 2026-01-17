'use client'

import { motion } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown, FileText, Plane, Building2, AlertTriangle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTravelDocsOpen, setIsTravelDocsOpen] = useState(false)
  const [isMobileDocsOpen, setIsMobileDocsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const travelDocsRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (travelDocsRef.current && !travelDocsRef.current.contains(event.target as Node)) {
        setIsTravelDocsOpen(false)
      }
    }

    if (isTravelDocsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isTravelDocsOpen])

  const travelDocsLinks = [
    { name: 'Passport Guides', href: '/passports', icon: FileText },
    { name: 'Visa Requirements', href: '/visas', icon: Plane },
    { name: 'Embassy Locator', href: '/embassies', icon: Building2 },
    { name: '⚠️ Latest Alerts', href: '/alerts', icon: AlertTriangle },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-[100] border-b border-neon-cyan/20 overflow-visible"
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
              
              {/* Logo container with AI badge at the end */}
              <div className="flex items-center gap-2 md:gap-3">
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
                
                {/* AI Badge - At the end of the text */}
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-xs md:text-sm font-bold heading-robotic bg-gradient-to-r from-neon-cyan to-electric-blue text-black px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-neon-cyan/50 shadow-lg shadow-cyan-500/50"
                >
                  AI
                </motion.span>
              </div>
            </Link>
          </motion.div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12" style={{ marginLeft: '20px' }}>
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
            
            {/* Travel Docs Dropdown */}
            <motion.div
              ref={travelDocsRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setIsTravelDocsOpen(!isTravelDocsOpen)}
                onMouseEnter={() => setIsTravelDocsOpen(true)}
                className="flex items-center gap-1.5 text-base lg:text-lg heading-robotic font-bold text-white hover:text-[#00FFFF] transition-all duration-300 cursor-pointer hover:scale-110"
                aria-expanded={isTravelDocsOpen}
                aria-haspopup="true"
              >
                Travel Docs
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${isTravelDocsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isTravelDocsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={() => setIsTravelDocsOpen(false)}
                  className="absolute top-full right-0 mt-2 min-w-[200px] w-64 glass-strong rounded-lg border border-gray-700 shadow-xl overflow-hidden z-[100]"
                  style={{
                    background: 'rgba(17, 24, 39, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {travelDocsLinks.map((link, index) => {
                    const Icon = link.icon
                    const isLast = index === travelDocsLinks.length - 1
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => {
                          setIsTravelDocsOpen(false)
                          setIsMenuOpen(false)
                        }}
                        className={`flex items-center gap-3 px-4 py-3 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-all duration-200 border-b border-white/5 ${
                          isLast ? 'last:border-b-0 bg-red-500/10 hover:bg-red-500/20' : ''
                        } ${isLast ? 'border-t-2 border-red-500/40' : ''}`}
                      >
                        <Icon className={`h-5 w-5 flex-shrink-0 ${isLast ? 'text-red-400' : ''}`} />
                        <span className={`font-semibold ${isLast ? 'text-red-400' : ''}`}>{link.name}</span>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </motion.div>
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
            className="md:hidden py-4 space-y-2 overflow-x-hidden"
          >
            {navLinks.map((link) => (
              link.name === 'Features' ? (
                <a
                  key={link.name}
                  href="/#features"
                  onClick={handleFeaturesClick}
                  className="block min-h-[44px] flex items-center text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
                >
                  {link.name}
                </a>
              ) : link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block min-h-[44px] flex items-center text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
                >
                  {link.name}
                </Link>
              ) : null
            ))}
            
            {/* Mobile Travel Docs Section - Accordion Style */}
            <div className="pt-2 border-t border-white/10">
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileDocsOpen(!isMobileDocsOpen)}
                className="w-full flex items-center justify-between min-h-[44px] text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
                aria-expanded={isMobileDocsOpen}
                aria-haspopup="true"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  Travel Docs
                </span>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${isMobileDocsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Accordion Content */}
              {isMobileDocsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/5 border-l-2 border-neon-cyan/30 mt-1">
                    {travelDocsLinks.map((link, index) => {
                      const Icon = link.icon
                      const isLast = index === travelDocsLinks.length - 1
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => {
                            setIsMenuOpen(false)
                            setIsMobileDocsOpen(false)
                          }}
                          className={`flex items-center gap-3 min-h-[44px] text-base heading-robotic font-bold hover:bg-white/10 transition-all duration-200 py-3 pl-8 pr-4 ${
                            isLast 
                              ? 'text-red-400 hover:text-red-300 bg-red-500/10 border-t-2 border-red-500/40' 
                              : 'text-white/90 hover:text-neon-cyan'
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span>{link.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
