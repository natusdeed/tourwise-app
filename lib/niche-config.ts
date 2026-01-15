/**
 * Niche Configuration System
 * 
 * This file defines all available niches for the TourWise AI platform.
 * Each niche has its own theme (colors), content (text, features), and SEO metadata.
 */

export interface NicheColorScheme {
  primary: string;      // Main brand color
  secondary: string;    // Secondary brand color
  accent: string;       // Accent/highlight color
  textGradient: string; // Gradient for text effects (e.g., "from-[color] to-[color]")
  glowColor: string;    // Color for glow effects (hex or CSS color)
}

export interface NicheFeature {
  icon: string;         // Icon name (lucide-react compatible)
  title: string;        // Feature title
  description: string;  // Feature description
  color: string;        // Tailwind gradient class (e.g., "from-[#color] to-[#color]")
}

export interface NicheConfig {
  slug: string;                    // URL slug (e.g., 'christian', 'safari', 'luxury')
  displayName: string;             // Human-readable name (e.g., 'Christian Pilgrimage')
  shortName: string;               // Short name for UI (e.g., 'Christian Tours')
  description: string;             // SEO meta description
  hero: {
    title: string;                 // Main hero headline
    subtitle: string;              // Hero subheading
    placeholder: string;           // Search placeholder text
  };
  colors: NicheColorScheme;
  features: NicheFeature[];        // Niche-specific features
  keywords: string[];              // SEO keywords
}

/**
 * All available niches configuration
 */
export const niches: Record<string, NicheConfig> = {
  christian: {
    slug: 'christian',
    displayName: 'Christian Pilgrimage',
    shortName: 'Christian Tours',
    description: 'Discover sacred destinations and plan your spiritual journey with AI-powered Christian pilgrimage tours. Visit holy sites, historical churches, and meaningful locations around the world.',
    hero: {
      title: 'YOUR SPIRITUAL JOURNEY',
      subtitle: 'AWAITS WITH AI',
      placeholder: 'I want to visit the Holy Land for 7 days, budget is $3k...',
    },
    colors: {
      primary: '#D4AF37',      // Gold - represents faith and divinity
      secondary: '#8B4513',    // Brown - represents earth and tradition
      accent: '#FFD700',       // Bright gold for highlights
      textGradient: 'from-[#D4AF37] to-[#FFD700]',
      glowColor: '#D4AF37',
    },
    features: [
      {
        icon: 'Church',
        title: 'SACRED DESTINATIONS',
        description: 'Plan visits to holy sites, historical churches, and pilgrimage routes worldwide with AI-curated spiritual journeys.',
        color: 'from-[#D4AF37] to-[#FFD700]',
      },
      {
        icon: 'BookOpen',
        title: 'BIBLICAL HISTORY',
        description: 'Explore destinations rich in biblical history with detailed guides on their spiritual significance and historical context.',
        color: 'from-[#8B4513] to-[#D4AF37]',
      },
      {
        icon: 'Heart',
        title: 'FAITH COMMUNITY',
        description: 'Connect with faith communities and find accommodations near religious sites for meaningful spiritual experiences.',
        color: 'from-[#FFD700] via-[#D4AF37] to-[#FFD700]',
      },
    ],
    keywords: ['christian pilgrimage', 'holy land tours', 'religious travel', 'biblical destinations', 'spiritual journeys'],
  },
  safari: {
    slug: 'safari',
    displayName: 'African Safari',
    shortName: 'Safari Adventures',
    description: 'Experience the wild beauty of Africa with AI-powered safari planning. Track the Big Five, witness incredible wildlife, and explore national parks with expert itineraries.',
    hero: {
      title: 'YOUR WILD ADVENTURE',
      subtitle: 'STARTS WITH AI',
      placeholder: 'I want to see the Big Five in Kenya for 10 days, budget is $5k...',
    },
    colors: {
      primary: '#228B22',      // Forest green - represents nature and wilderness
      secondary: '#CD853F',    // Sandy brown - represents African savanna
      accent: '#32CD32',       // Lime green for highlights
      textGradient: 'from-[#228B22] to-[#32CD32]',
      glowColor: '#228B22',
    },
    features: [
      {
        icon: 'Binoculars',
        title: 'WILDLIFE SAFARIS',
        description: 'Track the Big Five and witness incredible wildlife in their natural habitats with AI-optimized safari itineraries.',
        color: 'from-[#228B22] to-[#32CD32]',
      },
      {
        icon: 'Camera',
        title: 'PHOTOGRAPHY TOURS',
        description: 'Capture stunning wildlife moments with expert-guided photography tours designed for perfect shots of African landscapes.',
        color: 'from-[#CD853F] to-[#228B22]',
      },
      {
        icon: 'Mountain',
        title: 'NATIONAL PARKS',
        description: 'Explore world-famous national parks and game reserves with detailed guides on the best viewing times and locations.',
        color: 'from-[#32CD32] via-[#228B22] to-[#32CD32]',
      },
    ],
    keywords: ['african safari', 'wildlife tours', 'big five', 'kenya safari', 'south africa safari', 'tanzania safari'],
  },
  luxury: {
    slug: 'luxury',
    displayName: 'Luxury Escape',
    shortName: 'Luxury Travel',
    description: 'Indulge in premium travel experiences with AI-curated luxury escapes. From 5-star resorts to private jets, plan your opulent journey to the world\'s most exclusive destinations.',
    hero: {
      title: 'YOUR LUXURY ESCAPE',
      subtitle: 'DESIGNED BY AI',
      placeholder: 'I want a luxury trip to the Maldives for 5 days, budget is $10k...',
    },
    colors: {
      primary: '#FFD700',      // Gold - represents luxury and opulence
      secondary: '#000000',    // Black - represents elegance and sophistication
      accent: '#C0C0C0',       // Silver for highlights
      textGradient: 'from-[#FFD700] to-[#C0C0C0]',
      glowColor: '#FFD700',
    },
    features: [
      {
        icon: 'Sparkles',
        title: '5-STAR RESORTS',
        description: 'Discover the world\'s most exclusive resorts and luxury accommodations handpicked by AI for unparalleled comfort.',
        color: 'from-[#FFD700] to-[#C0C0C0]',
      },
      {
        icon: 'Plane',
        title: 'PREMIUM TRAVEL',
        description: 'Access private jets, first-class flights, and VIP experiences with seamless booking through our luxury travel network.',
        color: 'from-[#000000] to-[#FFD700]',
      },
      {
        icon: 'Crown',
        title: 'EXCLUSIVE ACCESS',
        description: 'Gain entry to exclusive venues, private tours, and bespoke experiences unavailable to regular travelers.',
        color: 'from-[#FFD700] via-[#C0C0C0] to-[#FFD700]',
      },
    ],
    keywords: ['luxury travel', '5 star resorts', 'private jets', 'premium travel', 'exclusive destinations', 'luxury vacations'],
  },
};

/**
 * Get niche configuration by slug
 */
export function getNicheBySlug(slug: string): NicheConfig | null {
  return niches[slug] || null;
}

/**
 * Get all available niches
 */
export function getAllNiches(): NicheConfig[] {
  return Object.values(niches);
}

/**
 * Check if a niche slug exists
 */
export function isValidNiche(slug: string): boolean {
  return slug in niches;
}
