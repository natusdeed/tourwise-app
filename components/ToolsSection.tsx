'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const tools = [
  {
    name: 'Kiwi',
    description: 'Flight search and booking',
    url: 'https://www.kiwi.com',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Booking.com',
    description: 'Hotel reservations worldwide',
    url: 'https://www.booking.com',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Viator',
    description: 'Tours and experiences',
    url: 'https://www.viator.com',
    color: 'from-purple-500 to-pink-500',
  },
]

export default function ToolsSection() {
  return (
    <section id="about" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic mb-4">
            <span className="text-gradient text-glow">TRAVEL TOOLKIT</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Access premium travel tools and resources to enhance your journey
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool, index) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative block"
            >
              <div className="glass-strong rounded-xl p-6 md:p-8 border border-neon-cyan/20 border-glow-hover h-full flex flex-col items-center text-center transition-all duration-300">
                {/* Sci-fi Button Style */}
                <div className={`relative w-full h-16 md:h-20 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <span className="relative text-xl md:text-2xl font-bold heading-robotic text-white z-10">
                    {tool.name}
                  </span>
                  
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm md:text-base mb-4">
                  {tool.description}
                </p>

                {/* External Link Icon */}
                <div className="flex items-center gap-2 text-neon-cyan group-hover:text-electric-blue transition-colors">
                  <span className="text-xs heading-robotic">OPEN TOOL</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 blur-xl" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
