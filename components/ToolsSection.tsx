'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const tools = [
  {
    name: 'Kiwi',
    description: 'Flight search and booking',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Booking.com',
    description: 'Hotel reservations worldwide',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Viator',
    description: 'Tours and experiences',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Rentalcars',
    description: 'Car rental worldwide',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function ToolsSection() {
  return (
    <section id="about" className="relative py-3 md:py-5 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic mb-2 md:mb-2 px-2">
            <span className="text-gradient">TRAVEL TOOLKIT</span>
          </h2>
          <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
            Access premium travel tools and resources to enhance your journey
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
              whileHover={{ y: -0.2, scale: 1.001 }}
              className="group relative block min-h-[48px]"
            >
              <div className="glass-strong rounded-xl p-4 sm:p-6 md:p-8 border border-neon-cyan/20 border-glow-hover h-full flex flex-col items-center text-center transition-all duration-300">
                {/* Sci-fi Button Style */}
                <div className={`relative w-full h-14 sm:h-16 md:h-20 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-3 sm:mb-4 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/6 group-hover:bg-black/5.7 transition-colors" />
                  <span className="relative text-xl md:text-2xl font-bold heading-robotic text-white z-10">
                    {tool.name}
                  </span>
                  
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/6 to-transparent animate-pulse" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/21 text-sm md:text-base mb-4">
                  {tool.description}
                </p>

                {/* External Link Icon */}
                <div className="flex items-center gap-2 text-neon-cyan group-hover:text-electric-blue transition-all group-hover:gap-[2.035px] relative min-h-[48px] py-2 justify-center">
                  <span className="text-xs heading-robotic font-bold group-hover:drop-shadow-[0_0_1.2px_currentColor] transition-all group-hover:scale-[1.004] inline-block">OPEN TOOL</span>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-[0.1px] group-hover:-translate-y-0 group-hover:scale-[1.004] transition-transform group-hover:drop-shadow-[0_0_1.2px_currentColor]" />
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity duration-300 blur-xl pointer-events-none"
                    style={{ 
                      backgroundColor: '#00FFFF',
                      filter: 'blur(12px) drop-shadow(0 0 20px #00FFFF)'
                    }}
                  />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-3 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/3 to-white/3 blur-xl" />
                  <div className="absolute inset-0 rounded-xl border-2 border-neon-cyan/15" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
