'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Send, MapPin, Phone, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

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

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMsg = 'Failed to send message'
        try {
          const errorData = await response.json()
          errorMsg = errorData.error || errorMsg
        } catch {
          // If response is not JSON, use status text
          errorMsg = response.statusText || errorMsg
        }
        throw new Error(errorMsg)
      }

      // Parse JSON only if response is ok
      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' })
          setSubmitStatus('idle')
          setErrorMessage('')
        }, 3000)
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      setErrorMessage(errorMsg)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'don@tourwiseai.com',
      link: 'mailto:don@tourwiseai.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '7033325956',
      link: 'tel:7033325956',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Richmond, Texas, USA 77407',
      link: '#',
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      link: '#',
    },
  ]

  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
      
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
                <span className="text-sm heading-robotic text-neon-cyan">DATA ENTRY TERMINAL</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold heading-robotic mb-6">
              <span className="text-gradient">CONTACT US</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4" />
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
              Get in touch with our team. We&apos;re here to help you plan your perfect journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-strong rounded-2xl p-8 md:p-10 border border-neon-cyan/30 border-glow-hover">
                <h2 className="text-2xl md:text-3xl font-bold heading-robotic mb-6 text-white">
                  SEND MESSAGE
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm heading-robotic text-neon-cyan mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg border border-neon-cyan/30 focus:border-neon-cyan focus:outline-none text-white placeholder-white/40 transition-all duration-300 focus:ring-2 focus:ring-neon-cyan/20"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm heading-robotic text-neon-cyan mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg border border-neon-cyan/30 focus:border-neon-cyan focus:outline-none text-white placeholder-white/40 transition-all duration-300 focus:ring-2 focus:ring-neon-cyan/20"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm heading-robotic text-neon-cyan mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 glass rounded-lg border border-neon-cyan/30 focus:border-neon-cyan focus:outline-none text-white placeholder-white/40 transition-all duration-300 resize-none focus:ring-2 focus:ring-neon-cyan/20"
                      placeholder="Tell us about your travel plans or questions..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-lg font-bold heading-robotic text-white text-sm md:text-base border border-neon-cyan/50 border-glow-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-lg p-4 border border-green-500/50 bg-green-500/10"
                    >
                      <p className="text-green-400 text-sm heading-robotic">
                        ✓ MESSAGE TRANSMITTED SUCCESSFULLY
                      </p>
                    </motion.div>
                  )}

                  {/* Error Message - Hidden for clean UI */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 0, y: 0 }}
                      className="glass rounded-lg p-4 border border-red-500/50 bg-red-500/10"
                      style={{ display: 'none', visibility: 'hidden' }}
                    >
                      <p className="text-red-400 text-sm heading-robotic flex items-center gap-2">
                        <span className="text-red-500">X</span>
                        <span>{errorMessage || 'TRANSMISSION FAILED. PLEASE TRY AGAIN.'}</span>
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Holographic Contact Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl p-8 md:p-10 border border-electric-blue/30 border-glow-hover h-full relative overflow-hidden">
                {/* Holographic Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-transparent to-neon-cyan/20 animate-pulse" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]" />
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 opacity-9">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold heading-robotic mb-8 text-white">
                    <span className="text-gradient">CONTACT DETAILS</span>
                  </h2>

                  <div className="space-y-6">
                    {contactDetails.map((detail, index) => {
                      const Icon = detail.icon
                      return (
                        <motion.a
                          key={detail.label}
                          href={detail.link}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ x: 8 }}
                          className="flex items-start gap-4 glass rounded-xl p-4 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-electric-blue/6 to-neon-cyan/6 flex items-center justify-center border border-electric-blue/9 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-electric-blue" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs heading-robotic text-electric-blue/80 mb-1">
                              {detail.label}
                            </div>
                            <div className="text-white/27 font-medium">
                              {detail.value}
                            </div>
                          </div>
                        </motion.a>
                      )
                    })}
                  </div>

                  {/* Additional Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-electric-blue/20"
                  >
                    <p className="text-white/60 text-sm leading-relaxed">
                      Our team is available 24/7 to assist you with your travel planning needs. 
                      Whether you have questions about our AI-powered features or need help with your itinerary, 
                      we&apos;re here to help.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
