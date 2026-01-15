# TourWise - Multi-Niche Travel Planning & Booking Platform

A production-ready, multi-niche travel planning and booking affiliate platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Features

### Multi-Niche Vertical System
- **5 Travel Verticals**: Africa, Christian Travel, Luxury, Budget, USA Tours
- Each vertical has its own landing page, destinations, and blog
- Scalable architecture for adding new verticals

### Content Management
- Markdown-based CMS for destinations and blog posts
- Easy content creation and management
- Automatic content parsing and HTML generation

### SEO Optimization
- Dynamic metadata generation
- JSON-LD schema markup (Article, Destination, Breadcrumb)
- OpenGraph and Twitter cards
- Automatic sitemap generation
- Clean URL structure
- Internal linking system

### Affiliate Monetization
- Centralized affiliate link manager
- Support for multiple partners (Booking.com, GetYourGuide, Viator, etc.)
- Deep link generation per destination
- Easy partner swapping without editing pages
- Category-specific links (hotel, tour, activity)

### Reusable Templates
- Destination page template
- Blog post template
- Category pages
- Internal linking components

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory and add your API keys:

```bash
# Google Gemini API Key (required for AI travel itinerary generation)
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Or use NEXT_PUBLIC_GEMINI_API_KEY if you need client-side access (not recommended)
# NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env.local` file

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the platform.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
tourwise-app/
├── app/                    # Next.js app directory
│   ├── [vertical]/         # Dynamic vertical pages
│   ├── api/               # API routes
│   └── sitemap.ts         # SEO sitemap
├── components/             # React components
│   └── templates/         # Reusable page templates
├── content/               # Markdown content files
│   ├── destinations/      # Destination markdown files
│   └── blog/             # Blog post markdown files
├── lib/                   # Core systems
│   ├── affiliates.ts     # Affiliate link manager
│   ├── content.ts        # Content management
│   ├── seo.ts            # SEO utilities
│   └── verticals.ts      # Vertical configurations
└── public/               # Static assets
```

## 🎨 Travel Verticals

### 1. Africa (`/africa`)
African safaris, wildlife viewing, and adventure travel.

### 2. Christian Travel (`/christian-travel`)
Christian pilgrimages, biblical destinations, and spiritual journeys.

### 3. Luxury (`/luxury`)
Luxury travel experiences, 5-star resorts, and premium accommodations.

### 4. Budget (`/budget`)
Budget-friendly travel guides, affordable destinations, and money-saving tips.

### 5. USA Tours (`/usa-tours`)
USA destinations, national parks, and American travel experiences.

## 📝 Adding Content

### Create a Destination

1. Create a markdown file in `content/destinations/`
2. Add frontmatter with required fields:
```markdown
---
title: Destination Name
description: Short description
slug: destination-slug
vertical: africa
location: Country, Region
bestTime: June to October
budget: $2,000 - $5,000
rating: 4.8
image: /images/destinations/image.jpg
featured: true
tags: [safari, wildlife]
---
```

3. Write content in markdown below the frontmatter

### Create a Blog Post

1. Create a markdown file in `content/blog/`
2. Add frontmatter:
```markdown
---
title: Blog Post Title
description: Short description
slug: blog-post-slug
vertical: africa
date: 2024-01-15
author: Author Name
category: Planning Guide
tags: [safari, tips]
featured: true
---
```

3. Write content in markdown

## 🔗 Affiliate System

### Configure Affiliate Partners

Edit `lib/affiliates.ts` to add or update partners:

```typescript
export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  booking: {
    id: 'booking',
    name: 'Booking.com',
    baseUrl: 'https://www.booking.com',
    trackingParam: 'aid=YOUR_AFFILIATE_ID',
    enabled: true,
    priority: 10,
  },
  // Add more partners...
};
```

### Generate Affiliate Links

```typescript
import { generateBestAffiliateLink } from '@/lib/affiliates';

const hotelLink = generateBestAffiliateLink({
  destination: 'Kenya',
  category: 'hotel',
  vertical: 'africa'
});
```

## 🎯 SEO Features

### Automatic SEO
- Dynamic metadata for all pages
- Schema markup (JSON-LD)
- Sitemap generation
- Robots.txt
- Clean URLs
- Internal linking

### Manual Optimization
- Custom SEO titles/descriptions in frontmatter
- Keyword optimization
- Image alt tags
- Proper heading hierarchy

## 🛠️ Customization

### Add a New Vertical

1. Add configuration to `lib/verticals.ts`:
```typescript
export const verticals: Record<string, VerticalConfig> = {
  'new-vertical': {
    slug: 'new-vertical',
    displayName: 'New Vertical',
    // ... configuration
  },
};
```

2. Create content in `content/destinations/` and `content/blog/`
3. Routes are automatically generated

### Change Styling

- Edit `app/globals.css` for global styles
- Use Tailwind CSS classes in components
- Vertical-specific colors are defined in `lib/verticals.ts`

## 📊 Performance

- Static site generation for fast loads
- Image optimization with Next.js Image
- Code splitting
- Optimized builds

## 🔒 Production Checklist

- [ ] Set up Gemini API key in `.env.local` (see Environment Setup above)
- [ ] Update affiliate tracking IDs in `lib/affiliates.ts`
- [ ] Set `NEXT_PUBLIC_BASE_URL` environment variable
- [ ] Add images to `public/images/`
- [ ] Test all affiliate links
- [ ] Verify SEO metadata
- [ ] Test AI itinerary generation feature
- [ ] Add analytics (Google Analytics, etc.)
- [ ] Set up error monitoring
- [ ] Configure CDN for images

## 📚 Documentation

See `ARCHITECTURE.md` for detailed architecture documentation.

## 🤝 Contributing

This is a production platform. When adding features:
1. Follow the existing architecture patterns
2. Use TypeScript for type safety
3. Add content to appropriate directories
4. Test affiliate links
5. Verify SEO metadata

## 📄 License

Private - All rights reserved

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
