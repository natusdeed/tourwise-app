/**
 * Vertical Configuration System
 * 
 * Defines all travel verticals for the multi-niche platform
 */

import { NicheColorScheme, NicheFeature } from './niche-config';

export interface VerticalConfig {
  slug: string;                    // URL slug (e.g., 'africa', 'christian-travel')
  displayName: string;             // Human-readable name
  shortName: string;               // Short name for UI
  description: string;             // SEO meta description
  hero: {
    title: string;
    subtitle: string;
    placeholder: string;
  };
  colors: NicheColorScheme;
  features: NicheFeature[];
  keywords: string[];
  meta: {
    category: string;
    focus: string[];
    targetAudience: string;
  };
}

/**
 * All vertical configurations
 */
export const verticals: Record<string, VerticalConfig> = {
  'africa': {
    slug: 'africa',
    displayName: 'Africa Travel',
    shortName: 'Africa Tours',
    description: 'Discover the wild beauty of Africa with expert travel guides. Plan safaris, explore national parks, experience vibrant cultures, and witness incredible wildlife across the African continent.',
    hero: {
      title: 'YOUR AFRICAN ADVENTURE',
      subtitle: 'STARTS HERE',
      placeholder: 'I want to see the Big Five in Kenya for 10 days, budget is $5k...',
    },
    colors: {
      primary: '#228B22',
      secondary: '#CD853F',
      accent: '#32CD32',
      textGradient: 'from-[#228B22] to-[#32CD32]',
      glowColor: '#228B22',
    },
    features: [
      {
        icon: 'Binoculars',
        title: 'SAFARI EXPERIENCES',
        description: 'Track the Big Five and witness incredible wildlife in their natural habitats with expertly planned safari itineraries.',
        color: 'from-[#228B22] to-[#32CD32]',
      },
      {
        icon: 'Mountain',
        title: 'NATIONAL PARKS',
        description: 'Explore world-famous national parks and game reserves with detailed guides on the best viewing times and locations.',
        color: 'from-[#CD853F] to-[#228B22]',
      },
      {
        icon: 'Camera',
        title: 'CULTURAL IMMERSION',
        description: 'Experience vibrant African cultures, traditional ceremonies, and authentic local experiences across the continent.',
        color: 'from-[#32CD32] via-[#228B22] to-[#32CD32]',
      },
    ],
    keywords: ['africa travel', 'safari tours', 'big five', 'kenya safari', 'south africa', 'tanzania', 'wildlife', 'national parks'],
    meta: {
      category: 'adventure',
      focus: ['safaris', 'wildlife', 'national parks', 'cultural tours'],
      targetAudience: 'adventure seekers, wildlife enthusiasts, nature lovers',
    },
  },
  'christian-travel': {
    slug: 'christian-travel',
    displayName: 'Christian Travel',
    shortName: 'Christian Tours',
    description: 'Plan your spiritual journey with Christian travel guides. Visit holy sites, historical churches, pilgrimage routes, and biblical destinations around the world.',
    hero: {
      title: 'YOUR SPIRITUAL JOURNEY',
      subtitle: 'AWAITS',
      placeholder: 'I want to visit the Holy Land for 7 days, budget is $3k...',
    },
    colors: {
      primary: '#D4AF37',
      secondary: '#8B4513',
      accent: '#FFD700',
      textGradient: 'from-[#D4AF37] to-[#FFD700]',
      glowColor: '#D4AF37',
    },
    features: [
      {
        icon: 'Church',
        title: 'SACRED DESTINATIONS',
        description: 'Plan visits to holy sites, historical churches, and pilgrimage routes worldwide with detailed spiritual journey guides.',
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
    keywords: ['christian pilgrimage', 'holy land tours', 'religious travel', 'biblical destinations', 'spiritual journeys', 'pilgrimage'],
    meta: {
      category: 'spiritual',
      focus: ['pilgrimages', 'holy sites', 'biblical destinations', 'church tours'],
      targetAudience: 'christian travelers, pilgrims, religious groups',
    },
  },
  'luxury': {
    slug: 'luxury',
    displayName: 'Luxury Travel',
    shortName: 'Luxury Escapes',
    description: 'Indulge in premium travel experiences with curated luxury escapes. From 5-star resorts to private jets, plan your opulent journey to the world\'s most exclusive destinations.',
    hero: {
      title: 'YOUR LUXURY ESCAPE',
      subtitle: 'DESIGNED FOR YOU',
      placeholder: 'I want a luxury trip to the Maldives for 5 days, budget is $10k...',
    },
    colors: {
      primary: '#FFD700',
      secondary: '#000000',
      accent: '#C0C0C0',
      textGradient: 'from-[#FFD700] to-[#C0C0C0]',
      glowColor: '#FFD700',
    },
    features: [
      {
        icon: 'Sparkles',
        title: '5-STAR RESORTS',
        description: 'Discover the world\'s most exclusive resorts and luxury accommodations handpicked for unparalleled comfort and service.',
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
    meta: {
      category: 'luxury',
      focus: ['5-star hotels', 'private travel', 'exclusive experiences', 'premium dining'],
      targetAudience: 'luxury travelers, high-net-worth individuals, VIP clients',
    },
  },
  'budget': {
    slug: 'budget',
    displayName: 'Budget Travel',
    shortName: 'Budget Adventures',
    description: 'Travel the world without breaking the bank. Discover affordable destinations, budget-friendly accommodations, money-saving tips, and incredible experiences for every traveler.',
    hero: {
      title: 'TRAVEL MORE',
      subtitle: 'SPEND LESS',
      placeholder: 'I want to visit Southeast Asia for 2 weeks, budget is $1.5k...',
    },
    colors: {
      primary: '#4CAF50',
      secondary: '#2196F3',
      accent: '#FFC107',
      textGradient: 'from-[#4CAF50] to-[#2196F3]',
      glowColor: '#4CAF50',
    },
    features: [
      {
        icon: 'Wallet',
        title: 'BUDGET-FRIENDLY',
        description: 'Discover affordable destinations and money-saving strategies to make your travel dreams a reality without overspending.',
        color: 'from-[#4CAF50] to-[#2196F3]',
      },
      {
        icon: 'MapPin',
        title: 'HIDDEN GEMS',
        description: 'Explore underrated destinations that offer incredible experiences at a fraction of the cost of tourist hotspots.',
        color: 'from-[#2196F3] to-[#4CAF50]',
      },
      {
        icon: 'PiggyBank',
        title: 'SAVE MORE',
        description: 'Get insider tips on finding deals, using travel rewards, and maximizing your budget for maximum adventure.',
        color: 'from-[#FFC107] via-[#4CAF50] to-[#2196F3]',
      },
    ],
    keywords: ['budget travel', 'cheap travel', 'affordable destinations', 'backpacking', 'travel deals', 'budget accommodations'],
    meta: {
      category: 'budget',
      focus: ['affordable destinations', 'budget accommodations', 'money-saving tips', 'deals'],
      targetAudience: 'budget-conscious travelers, backpackers, students, young professionals',
    },
  },
  'usa-tours': {
    slug: 'usa-tours',
    displayName: 'USA Tours',
    shortName: 'USA Travel',
    description: 'Explore the diverse landscapes and vibrant cities of the United States. From national parks to bustling metropolises, discover the best of America with comprehensive travel guides.',
    hero: {
      title: 'DISCOVER AMERICA',
      subtitle: 'YOUR WAY',
      placeholder: 'I want to tour the West Coast for 10 days, budget is $3k...',
    },
    colors: {
      primary: '#E63946',
      secondary: '#457B9D',
      accent: '#F1FAEE',
      textGradient: 'from-[#E63946] to-[#457B9D]',
      glowColor: '#E63946',
    },
    features: [
      {
        icon: 'Mountain',
        title: 'NATIONAL PARKS',
        description: 'Explore America\'s stunning national parks, from the Grand Canyon to Yosemite, with detailed guides and itineraries.',
        color: 'from-[#E63946] to-[#457B9D]',
      },
      {
        icon: 'Building',
        title: 'CITY ADVENTURES',
        description: 'Discover vibrant cities, iconic landmarks, and hidden gems in America\'s most exciting urban destinations.',
        color: 'from-[#457B9D] to-[#E63946]',
      },
      {
        icon: 'Route',
        title: 'ROAD TRIPS',
        description: 'Plan epic road trips across America with curated routes, stops, and must-see attractions along the way.',
        color: 'from-[#F1FAEE] via-[#E63946] to-[#457B9D]',
      },
    ],
    keywords: ['usa travel', 'american tours', 'national parks usa', 'usa road trips', 'american cities', 'usa destinations'],
    meta: {
      category: 'domestic',
      focus: ['national parks', 'city tours', 'road trips', 'american landmarks'],
      targetAudience: 'american travelers, international visitors, road trippers, nature enthusiasts',
    },
  },
  'island-retreats': {
    slug: 'island-retreats',
    displayName: 'Island Retreats',
    shortName: 'Island Retreats',
    description: 'Unwind in paradise. From the Maldives to the Caribbean, let AI find your perfect stretch of white sand and clear blue water.',
    hero: {
      title: 'YOUR ISLAND PARADISE',
      subtitle: 'AWAITS',
      placeholder: 'I want a beach vacation in the Maldives for 7 days, budget is $4k...',
    },
    colors: {
      primary: '#00CED1',
      secondary: '#87CEEB',
      accent: '#48D1CC',
      textGradient: 'from-[#00CED1] to-[#87CEEB]',
      glowColor: '#00CED1',
    },
    features: [
      {
        icon: 'Umbrella',
        title: 'BEACH PARADISE',
        description: 'Discover pristine beaches and crystal-clear waters at the world\'s most beautiful island destinations with expertly curated retreats.',
        color: 'from-[#00CED1] to-[#87CEEB]',
      },
      {
        icon: 'Wave',
        title: 'TROPICAL ESCAPES',
        description: 'From overwater bungalows to beachfront resorts, find your perfect island accommodation with AI-powered recommendations.',
        color: 'from-[#87CEEB] to-[#00CED1]',
      },
      {
        icon: 'Sun',
        title: 'RELAXATION & LUXURY',
        description: 'Experience ultimate relaxation with spa treatments, water sports, and luxury amenities in idyllic island settings.',
        color: 'from-[#48D1CC] via-[#00CED1] to-[#87CEEB]',
      },
    ],
    keywords: ['island vacations', 'beach resorts', 'maldives', 'caribbean', 'tropical paradise', 'island retreats', 'beach destinations'],
    meta: {
      category: 'leisure',
      focus: ['beach vacations', 'tropical destinations', 'island resorts', 'water activities'],
      targetAudience: 'honeymooners, couples, relaxation seekers, beach lovers',
    },
  },
};

/**
 * Get vertical configuration by slug
 */
export function getVerticalBySlug(slug: string): VerticalConfig | null {
  return verticals[slug] || null;
}

/**
 * Get all available verticals
 */
export function getAllVerticals(): VerticalConfig[] {
  return Object.values(verticals);
}

/**
 * Check if a vertical slug exists
 */
export function isValidVertical(slug: string): boolean {
  return slug in verticals;
}

/**
 * Get vertical slugs
 */
export function getVerticalSlugs(): string[] {
  return Object.keys(verticals);
}
