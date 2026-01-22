/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Enable compression
  compress: true,
  
  // Optimize fonts (enabled by default in Next.js, but explicitly set for clarity)
  // Note: Next.js automatically optimizes fonts, this is for documentation
  optimizeFonts: true,
  
  // Enable experimental features for better performance
  // Note: optimizeCss requires 'critters' package - disabled for now to avoid build errors
  // experimental: {
  //   optimizeCss: true,
  // },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://generativelanguage.googleapis.com https://api.travelpayouts.com https://api.resend.com https://tpwidg.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://tpwidg.com; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com https://api.travelpayouts.com https://api.resend.com https://search.aviasales.com https://tpwidg.com https://ipinfo.io https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://tpwidg.com; frame-ancestors 'none';"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
