'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Gift } from 'lucide-react'

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    // Check if popup was already shown
    if (typeof window === 'undefined') return
    
    const popupShown = localStorage.getItem('exit_popup_shown')
    if (popupShown === 'true') return

    // Detect exit intent - when mouse leaves the top of the viewport
    // This triggers when user moves mouse to the top edge (likely to close tab)
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving upward and near the top (clientY <= 0)
      // Also check relatedTarget to ensure it's actually leaving the document
      if (e.clientY <= 0 && (!e.relatedTarget || (e.relatedTarget as Node).nodeName === 'HTML')) {
        setShow(true)
        localStorage.setItem('exit_popup_shown', 'true')
        // Remove listener after showing to prevent multiple triggers
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // Add a small delay to prevent popup from showing immediately on page load
    const timeoutId = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 2000) // Wait 2 seconds after page load

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleClose = () => {
    setShow(false)
  }

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

      // Submit to contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Exit Intent Subscriber',
          email: email.trim(),
          message: 'Exit intent popup signup - 10% discount claim',
        }),
      })

      if (!response.ok) {
        let errorMsg = 'Failed to claim discount. Please try again.'
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
        
        // Close popup after 3 seconds on success
        setTimeout(() => {
          setShow(false)
        }, 3000)
      } else {
        throw new Error(data.error || 'Failed to claim discount')
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

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-full z-[100]"
          >
            <div className="glass-strong border-2 border-neon-cyan/40 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Animated background glow */}
              <div 
                className="absolute inset-0 opacity-20 animate-pulse pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
                }}
              />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                {/* Gift Icon */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(50, 168, 221, 0.2))',
                      border: '2px solid rgba(0, 255, 255, 0.4)',
                    }}
                  >
                    <Gift className="w-8 h-8" style={{ color: '#00FFFF' }} />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-2xl md:text-3xl font-bold heading-robotic text-center mb-3">
                  <span className="text-gradient">Wait! Don't Miss Out 🎁</span>
                </h3>
                
                {/* Description */}
                <p className="text-white/90 text-center text-base md:text-lg mb-6">
                  Get <span className="font-bold text-neon-cyan">10% off</span> your first booking + our free travel planning guide
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="popup-form space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300 text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        borderColor: submitStatus === 'error' ? '#ef4444' : undefined,
                      }}
                    />
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center"
                    >
                      {errorMessage}
                    </motion.p>
                  )}

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <p className="text-green-400 text-sm font-medium mb-2">
                        ✓ Success! Check your email for your discount code.
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full px-6 py-4 bg-gradient-to-r from-neon-cyan to-electric-blue hover:from-neon-cyan/90 hover:to-electric-blue/90 text-black font-bold heading-robotic rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                    }}
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : submitStatus === 'success' ? (
                      '✓ Discount Claimed!'
                    ) : (
                      'Claim My Discount'
                    )}
                  </button>
                </form>

                {/* Privacy Note */}
                <p className="text-white/50 text-xs text-center mt-4">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
