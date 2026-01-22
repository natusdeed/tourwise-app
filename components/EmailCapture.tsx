'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Check, Mail, Lock } from 'lucide-react'
import { trackEmailSignup } from '@/utils/analytics'

interface EmailCaptureProps {
  colors?: {
    primary: string
    secondary: string
    glowColor: string
  }
}

export default function EmailCapture({ colors = { primary: '#00FFFF', secondary: '#32A8DD', glowColor: '#00FFFF' } }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [socialProofIndex, setSocialProofIndex] = useState(0)

  // Sample social proof messages - rotate through them
  const socialProofMessages = [
    'Mike just subscribed from Chicago',
    'Sarah joined from New York',
    'John signed up from Los Angeles',
    'Emma subscribed from Miami',
    'David joined from Seattle',
    'Lisa signed up from Boston',
  ]

  // Rotate social proof messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialProofIndex((prev) => (prev + 1) % socialProofMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [socialProofMessages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Check if we're online first
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network settings.')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        throw new Error('Please enter a valid email address.')
      }

      // For now, we'll use the contact API or create a dedicated newsletter API
      // You can integrate with your email service provider (e.g., Mailchimp, ConvertKit, etc.)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email.trim(),
          message: 'Newsletter signup from email capture form',
        }),
      })

      if (!response.ok) {
        let errorMsg = 'Failed to subscribe. Please try again.'
        try {
          const errorData = await response.json()
          errorMsg = errorData.error || errorMsg
        } catch {
          errorMsg = response.statusText || errorMsg
        }
        throw new Error(errorMsg)
      }

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setEmail('')
        
        // Track email signup in Google Analytics
        trackEmailSignup('email_capture_form')
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      setErrorMessage(errorMsg)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    'Weekly mistake fares & flash sales',
    'Insider tips from travel experts',
    'Exclusive subscriber-only discounts',
    'Free downloadable packing checklists',
  ]

  return (
    <section className="email-capture relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/60 via-black/80 to-black/60 border-y border-white/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="email-content text-center"
        >
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold heading-robotic mb-4 md:mb-6 leading-tight">
            <span className="text-gradient">Get Your Free 2026 Travel Hacks Guide</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Join 15,000+ smart travelers unlocking exclusive deals up to 70% off flights, hotels, and tours
          </p>

          {/* Benefits List */}
          <ul className="email-benefits flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-10">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 text-white/90 text-sm md:text-base"
              >
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: colors.primary }} />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>

          {/* Email Form */}
          <form 
            onSubmit={handleSubmit}
            className="email-form max-w-lg mx-auto mb-6"
            id="email-signup"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isSubmitting}
                  className="email-input w-full pl-12 pr-4 py-4 md:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300 text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    borderColor: submitStatus === 'error' ? '#ef4444' : undefined,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="email-submit px-6 md:px-8 py-4 md:py-5 bg-[#00BFFF] hover:bg-[#0099CC] text-white font-bold heading-robotic rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-2 border-[#00BFFF]/50 hover:border-[#00BFFF] text-sm md:text-base whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  boxShadow: '0 0 20px rgba(0, 191, 255, 0.4)',
                  backgroundImage: submitStatus === 'success' 
                    ? 'linear-gradient(to right, #10b981, #059669)' 
                    : `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                {isSubmitting ? (
                  'Subscribing...'
                ) : submitStatus === 'success' ? (
                  '✓ Subscribed!'
                ) : (
                  'Get Free Guide + Deals'
                )}
              </button>
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-400 text-sm text-center"
              >
                {errorMessage}
              </motion.p>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-400 text-sm text-center font-medium"
              >
                ✓ Success! Check your email for the free guide.
              </motion.p>
            )}
          </form>

          {/* Privacy Note */}
          <p className="privacy-note text-white/60 text-xs md:text-sm mb-6 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            <span>We respect your privacy. Unsubscribe anytime. No spam, ever.</span>
          </p>

          {/* Social Proof Ticker */}
          <div className="social-proof-ticker relative overflow-hidden">
            <motion.div
              key={socialProofIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="ticker-item text-white/70 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>{socialProofMessages[socialProofIndex]}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
