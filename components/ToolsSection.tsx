'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Check } from 'lucide-react'
import { getIconByName } from '@/lib/icon-map'
import { useState } from 'react'

const tools = [
  {
    name: 'Viator Tours',
    description: 'Book 300,000+ experiences worldwide',
    badge: 'Most Popular',
    icon: 'Compass',
    cta: 'Explore Tours',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-purple-500 to-pink-500',
    benefits: [
      'Free cancellation',
      'Best price guarantee',
      'Instant confirmation',
    ],
  },
  {
    name: 'Booking.com',
    description: 'Compare 2M+ properties instantly',
    badge: 'Best Deals',
    icon: 'Building2',
    cta: 'Find Hotels',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-blue-500 to-cyan-500',
    benefits: [
      'Free cancellation',
      'Best price guarantee',
      'Instant confirmation',
    ],
  },
  {
    name: 'Aviasales',
    description: 'Find the cheapest flights worldwide',
    badge: 'Top Rated',
    icon: 'Plane',
    cta: 'Search Flights',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-yellow-400 to-orange-500',
    benefits: [
      'Free cancellation',
      'Best price guarantee',
      'Instant confirmation',
    ],
  },
  {
    name: 'Rentalcars',
    description: 'Rent a car in 160+ countries',
    badge: 'Trusted',
    icon: 'Car',
    cta: 'Rent a Car',
    url: 'https://www.aviasales.com/search?marker=692947',
    color: 'from-green-500 to-emerald-500',
    benefits: [
      'Free cancellation',
      'Best price guarantee',
      'Instant confirmation',
    ],
  },
]

interface ToolCardProps {
  tool: typeof tools[0]
  Icon: React.ComponentType<{ className?: string }>
  index: number
}

function ToolCard({ tool, Icon, index }: ToolCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative min-h-[48px] h-full"
      style={{ perspective: '1000px' }}
    >
      <div
        className="tool-card relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div
          className="tool-front glass-strong rounded-xl p-4 sm:p-6 md:p-8 border border-neon-cyan/20 border-glow-hover h-full flex flex-col items-center text-center transition-all duration-300 relative cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Badge */}
          {tool.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold heading-robotic text-white"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(50, 168, 221, 0.2) 100%)',
                  border: '1px solid rgba(0, 255, 255, 0.4)',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                  color: '#00FFFF',
                  textShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
                }}
              >
                {tool.badge}
              </span>
            </div>
          )}

          {/* Icon and Name */}
          <div
            className={`relative w-full h-14 sm:h-16 md:h-20 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/6 group-hover:bg-black/5.7 transition-colors" />
            <Icon className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white z-10" />
            <span className="relative text-lg sm:text-xl md:text-2xl font-bold heading-robotic text-white z-10">
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

          {/* CTA Button */}
          <div className="flex items-center gap-2 text-neon-cyan group-hover:text-electric-blue transition-all group-hover:gap-[2.035px] relative min-h-[48px] py-2 justify-center mt-auto">
            <span className="text-xs heading-robotic font-bold group-hover:drop-shadow-[0_0_1.2px_currentColor] transition-all group-hover:scale-[1.004] inline-block">
              {tool.cta}
            </span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-[0.1px] group-hover:-translate-y-0 group-hover:scale-[1.004] transition-transform group-hover:drop-shadow-[0_0_1.2px_currentColor]" />
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity duration-300 blur-xl pointer-events-none"
              style={{
                backgroundColor: '#00FFFF',
                filter: 'blur(12px) drop-shadow(0 0 20px #00FFFF)',
              }}
            />
          </div>

          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-3 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/3 to-white/3 blur-xl" />
            <div className="absolute inset-0 rounded-xl border-2 border-neon-cyan/15" />
          </div>
        </div>

        {/* Back Side */}
        <div
          className="tool-back glass-strong rounded-xl p-4 sm:p-6 md:p-8 border border-neon-cyan/20 border-glow-hover h-full flex flex-col items-center justify-center text-center transition-all duration-300 relative cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Benefits List */}
          <ul className="tool-benefits space-y-3 sm:space-y-4 w-full">
            {tool.benefits?.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-center justify-center gap-2 text-white/90 text-sm sm:text-base"
              >
                <Check
                  className="w-5 h-5 flex-shrink-0"
                  style={{
                    color: '#00FFFF',
                    filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))',
                  }}
                />
                <span className="heading-robotic font-medium">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Link on Back */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-6 sm:mt-8 flex items-center gap-2 text-neon-cyan hover:text-electric-blue transition-all hover:gap-[2.035px] relative px-4 py-2 rounded-lg border border-neon-cyan/40 hover:border-neon-cyan/60"
            style={{
              background:
                'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(50, 168, 221, 0.1) 100%)',
            }}
          >
            <span className="text-xs heading-robotic font-bold">
              {tool.cta}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-3 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/3 to-white/3 blur-xl" />
            <div className="absolute inset-0 rounded-xl border-2 border-neon-cyan/15" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

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
          <div className="toolkit-header flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 md:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-robotic px-2">
              <span className="text-gradient">FREE TRAVEL TOOLKIT</span>
            </h2>
            <span className="value-badge inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full glass-strong border border-neon-cyan/40 text-sm sm:text-base font-semibold heading-robotic text-white whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(50, 168, 221, 0.15) 100%)',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                color: '#00FFFF',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              }}
            >
              $297 Value - Completely Free
            </span>
          </div>
          <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
            Access premium travel tools and resources to enhance your journey
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {tools.map((tool, index) => {
            const Icon = getIconByName(tool.icon)
            return (
              <ToolCard key={tool.name} tool={tool} Icon={Icon} index={index} />
            )
          })}
        </div>
      </div>
    </section>
  )
}
