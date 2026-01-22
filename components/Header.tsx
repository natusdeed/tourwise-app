'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Sparkles, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/**
 * Header Component
 * 
 * A comprehensive header with sticky functionality, search bar, navigation,
 * and CTA button. Matches the TourWise glass-morphism design system.
 * 
 * Features:
 * - Sticky header after scrolling 100px
 * - Integrated search functionality
 * - Destinations dropdown menu
 * - Responsive mobile menu
 * - "Plan My Trip" CTA button
 */
export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const destinationsRef = useRef<HTMLDivElement>(null)

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationsRef.current && !destinationsRef.current.contains(event.target as Node)) {
        setIsDestinationsOpen(false)
      }
    }

    if (isDestinationsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDestinationsOpen])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results or handle search
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const destinationsLinks = [
    { name: 'Popular Destinations', href: '/destinations/popular' },
    { name: 'Beach Getaways', href: '/destinations/beach' },
    { name: 'Adventure', href: '/destinations/adventure' },
    { name: 'Luxury Escapes', href: '/destinations/luxury' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`main-header fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isSticky ? 'sticky' : ''
      }`}
      style={
        !isSticky
          ? {
              background: 'rgba(8, 12, 24, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
            }
          : undefined
      }
    >
      <div className="header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="logo flex-shrink-0 flex items-center gap-2 md:gap-3 group">
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
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold heading-robotic">
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
              <span className="text-xs md:text-sm font-bold heading-robotic bg-gradient-to-r from-neon-cyan to-electric-blue text-black px-2 py-1 rounded-full border border-neon-cyan/50">
                AI
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="header-search hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="search"
                placeholder="Search destinations, hotels, tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-12 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20 transition-all text-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <button
                type="submit"
                className="search-btn absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-neon-cyan hover:text-electric-blue hover:bg-white/5 rounded transition-all"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav hidden lg:flex items-center gap-6 xl:gap-8">
            <Link 
              href="/" 
              className="text-white hover:text-neon-cyan transition-colors duration-300 text-sm font-semibold heading-robotic"
            >
              Home
            </Link>
            
            {/* Destinations Dropdown */}
            <div ref={destinationsRef} className="dropdown relative">
              <button
                type="button"
                onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                onMouseEnter={() => setIsDestinationsOpen(true)}
                className="flex items-center gap-1 text-white hover:text-neon-cyan transition-colors duration-300 text-sm font-semibold heading-robotic"
                aria-expanded={isDestinationsOpen}
                aria-haspopup="true"
              >
                Destinations
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDestinationsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {isDestinationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsDestinationsOpen(false)}
                    className="dropdown-menu absolute top-full left-0 mt-2 min-w-[220px] glass-strong rounded-lg border border-white/10 shadow-xl overflow-hidden z-[100]"
                    style={{
                      background: 'rgba(17, 24, 39, 0.98)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                    }}
                  >
                    {destinationsLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsDestinationsOpen(false)}
                        className="block px-4 py-3 text-white hover:bg-neon-cyan/20 hover:text-neon-cyan transition-all duration-200 border-b border-white/5 last:border-b-0 text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/deals" 
              className="text-white hover:text-neon-cyan transition-colors duration-300 text-sm font-semibold heading-robotic"
            >
              Deals
            </Link>
            <Link 
              href="/#features" 
              className="text-white hover:text-neon-cyan transition-colors duration-300 text-sm font-semibold heading-robotic"
            >
              Features
            </Link>
            <Link 
              href="/travel-docs" 
              className="text-white hover:text-neon-cyan transition-colors duration-300 text-sm font-semibold heading-robotic"
            >
              Travel Docs
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/#features')}
            className="cta-header hidden lg:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-bold heading-robotic text-sm rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
          >
            Plan My Trip
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-neon-cyan hover:text-electric-blue transition-colors p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-glow" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-white/10"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Search destinations, hotels, tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20 transition-all text-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-neon-cyan hover:text-electric-blue rounded transition-all"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 space-y-2 border-t border-white/10"
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block min-h-[44px] flex items-center text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
              >
                Home
              </Link>

              {/* Mobile Destinations Dropdown */}
              <div className="border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
                  className="w-full flex items-center justify-between min-h-[44px] text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
                >
                  <span>Destinations</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isDestinationsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isDestinationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/5 border-l-2 border-neon-cyan/30"
                  >
                    {destinationsLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsDestinationsOpen(false)
                        }}
                        className="block min-h-[44px] text-base heading-robotic font-medium text-white/90 hover:text-neon-cyan hover:bg-white/10 transition-all duration-200 py-3 pl-8 pr-4"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              <Link
                href="/deals"
                onClick={() => setIsMenuOpen(false)}
                className="block min-h-[44px] flex items-center text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
              >
                Deals
              </Link>
              <Link
                href="/#features"
                onClick={() => setIsMenuOpen(false)}
                className="block min-h-[44px] flex items-center text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
              >
                Features
              </Link>
              <Link
                href="/travel-docs"
                onClick={() => setIsMenuOpen(false)}
                className="block min-h-[44px] flex items-center text-base heading-robotic font-bold text-white hover:text-neon-cyan transition-colors duration-300 py-3 px-4"
              >
                Travel Docs
              </Link>

              {/* Mobile CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsMenuOpen(false)
                  router.push('/#features')
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-bold heading-robotic text-base rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
              >
                Plan My Trip
              </motion.button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
