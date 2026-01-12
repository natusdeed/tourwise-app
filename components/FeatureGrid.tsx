'use client'

import { motion } from 'framer-motion'
import { Sparkles, Plane, Hotel } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI ITINERARIES',
    description: 'Get personalized travel plans crafted by advanced AI that understands your preferences, budget, and travel style.',
    color: 'from-neon-cyan to-electric-blue',
  },
  {
    icon: Plane,
    title: 'FLIGHT SCANNING',
    description: 'Real-time flight price monitoring and alerts. We scan thousands of airlines to find you the best deals instantly.',
    color: 'from-electric-blue to-neon-cyan',
  },
  {
    icon: Hotel,
    title: 'HOTEL DEALS',
    description: 'Discover hidden gems and exclusive hotel deals. Our AI compares prices across all major booking platforms.',
    color: 'from-neon-cyan via-electric-blue to-neon-cyan',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
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
            <span className="text-gradient text-glow">POWERFUL FEATURES</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Everything you need to plan the perfect trip, powered by cutting-edge AI
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="glass-strong rounded-xl p-6 md:p-8 border border-neon-cyan/20 border-glow-hover h-full flex flex-col transition-all duration-300">
                  {/* Icon */}
                  <div className={`mb-6 w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold heading-robotic mb-3 text-white group-hover:text-neon-cyan transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm md:text-base leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl`} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
