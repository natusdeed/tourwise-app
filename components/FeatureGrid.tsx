'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { NicheFeature, NicheColorScheme } from '@/lib/niche-config'
import { getIconByName } from '@/lib/icon-map'
import { create3DTextShadow, create3DLightTextShadow, hexToRgba } from '@/lib/color-utils'

interface FeatureGridProps {
  features: (NicheFeature & { image?: string })[]
  colors: NicheColorScheme
  sectionTitle?: string
  sectionDescription?: string
}

export default function FeatureGrid({ 
  features, 
  colors, 
  sectionTitle = 'POWERFUL FEATURES',
  sectionDescription = 'Everything you need to plan the perfect trip, powered by cutting-edge AI'
}: FeatureGridProps) {
  return (
    <section id="features" className="relative py-3 md:py-5 lg:py-8 px-4 sm:px-6 lg:px-8">
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
            <span className="text-gradient">
              {sectionTitle}
            </span>
          </h2>
          <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
            {sectionDescription}
          </p>
        </motion.div>

        {/* Feature Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = getIconByName(feature.icon)
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -0.3, scale: 1.001 }}
                className="relative group"
              >
                <div 
                  className="glass-strong rounded-xl overflow-hidden border border-glow-hover h-full flex flex-col transition-all duration-300"
                  style={{ borderColor: `${colors.primary}20` }}
                >
                  {/* Card Header Image with Gradient Overlay */}
                  {/* Image paths should start with "/" and reference files in /public folder */}
                  {feature.image && (
                    <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/12 to-black/18" />
                      
                      {/* Floating Icon - Overlapping bottom edge with 3D effect */}
                      <div 
                        className={`absolute bottom-0 left-6 transform translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-2xl z-10 border-2 border-black/30 group-hover:scale-[1.004] transition-transform duration-300`}
                        style={{
                          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${colors.primary}40`
                        }}
                      >
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-black" />
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow pt-3 sm:pt-3 md:pt-4">
                    {/* Title */}
                    <h3 
                      className="text-xl md:text-2xl font-bold heading-robotic mb-3 text-white transition-all duration-300"
                      style={{ 
                        textShadow: create3DLightTextShadow(0.8),
                        transform: 'perspective(500px) translateZ(0)',
                        transformStyle: 'preserve-3d'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.primary
                        e.currentTarget.style.textShadow = create3DTextShadow(colors.primary, 1)
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'white'
                        e.currentTarget.style.textShadow = create3DLightTextShadow(0.8)
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/27 text-sm md:text-base leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect - Neon Border */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                    <div 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl`}
                    />
                    <div 
                      className="absolute inset-0 rounded-xl border-2"
                      style={{ 
                        borderColor: `${colors.primary}60`,
                        boxShadow: `0 0 20px ${colors.primary}40`
                      }}
                    />
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
