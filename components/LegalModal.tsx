'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50 max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="glass-strong border border-neon-cyan/30 rounded-lg flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-neon-cyan/20">
                <h2 className="text-xl md:text-2xl font-bold heading-robotic text-gradient">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <p className="text-white/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {content}
                </p>
              </div>
              
              {/* Footer */}
              <div className="p-4 md:p-6 border-t border-neon-cyan/20">
                <button
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-electric-blue/20 border border-neon-cyan/30 text-white hover:border-neon-cyan/50 transition-colors text-sm heading-robotic font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}