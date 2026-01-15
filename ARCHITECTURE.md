# TourWise Multi-Niche Travel Platform - Architecture Documentation

## Overview

This is a production-ready, multi-niche travel planning & booking affiliate platform built with Next.js 14, TypeScript, and Tailwind CSS. The platform supports 5 travel verticals, each with its own destinations, blog system, and affiliate monetization.

## Vertical Structure

The platform supports 5 travel verticals:

1. **/africa** - African safaris, wildlife, and adventure
2. **/christian-travel** - Christian pilgrimages and biblical destinations
3. **/luxury** - Luxury travel experiences
4. **/budget** - Budget-friendly travel guides
5. **/usa-tours** - USA destinations and tours

## Folder Structure

```
tourwise-app/
├── app/
│   ├── [vertical]/              # Dynamic vertical pages
│   │   ├── page.tsx             # Vertical landing page
│   │   ├── destinations/         # Destination pages
│   │   │   ├── page.tsx         # Destinations index
│   │   │   └── [slug]/          # Individual destination
│   │   └── blog/                # Blog system
│   │       ├── page.tsx         # Blog index
│   │       └── [slug]/          # Individual blog post
│   ├── api/
│   │   └── affiliate/           # Affiliate link API
│   ├── sitemap.ts               # SEO sitemap
│   └── robots.ts                # Robots.txt
├── components/
│   └── templates/                # Reusable page templates
│       ├── DestinationTemplate.tsx
│       ├── BlogTemplate.tsx
│       └── InternalLinking.tsx
├── content/                      # Markdown content files
│   ├── destinations/            # Destination markdown files
│   └── blog/                    # Blog post markdown files
├── lib/
│   ├── affiliates.ts            # Affiliate link manager
│   ├── content.ts               # Content management system
│   ├── seo.ts                   # SEO utilities
│   ├── sitemap.ts               # Sitemap generation
│   └── verticals.ts             # Vertical configurations
└── public/
    └── images/                   # Image assets
```

## Key Systems

### 1. Affiliate Link Manager (`lib/affiliates.ts`)

Centralized system for managing affiliate partners:
- Stores partner configurations (Booking.com, GetYourGuide, etc.)
- Generates deep links per destination
- Allows global partner swapping without editing pages
- Supports category-specific links (hotel, tour, activity)

**Usage:**
```typescript
import { generateBestAffiliateLink } from '@/lib/affiliates';

const hotelLink = generateBestAffiliateLink({
  destination: 'Kenya',
  category: 'hotel',
  vertical: 'africa'
});
```

### 2. Content Management System (`lib/content.ts`)

Markdown-based CMS for destinations and blog posts:
- Reads markdown files from `content/` directory
- Parses frontmatter for metadata
- Converts markdown to HTML
- Supports filtering by vertical
- Related content suggestions

**Content File Structure:**
```markdown
---
title: Destination Name
description: Short description
slug: destination-slug
vertical: africa
location: Kenya, East Africa
bestTime: June to October
budget: $2,000 - $5,000
rating: 4.8
image: /images/destinations/image.jpg
featured: true
tags: [safari, wildlife]
---

# Content in Markdown
```

### 3. SEO System (`lib/seo.ts`)

Comprehensive SEO utilities:
- Metadata generation for Next.js
- JSON-LD schema markup (Article, Destination, Breadcrumb)
- OpenGraph tags
- Twitter cards
- Clean URL generation

**Features:**
- Automatic schema generation
- Breadcrumb navigation
- Article metadata
- Destination schema

### 4. Vertical Configuration (`lib/verticals.ts`)

Defines all travel verticals with:
- Color schemes
- Hero content
- Features
- SEO keywords
- Meta information

### 5. Reusable Templates

**DestinationTemplate** - Standard destination page layout:
- Overview section
- Things to do
- Travel tips
- Affiliate booking sections
- Related destinations/guides

**BlogTemplate** - Standard blog post layout:
- Article content
- Meta information
- Tags and categories
- Related posts/destinations

**InternalLinking** - Components for:
- Related destinations
- Related guides
- Book trip sections

## Routing Structure

### Vertical Pages
- `/[vertical]` - Landing page for each vertical
- `/[vertical]/destinations` - All destinations for vertical
- `/[vertical]/destinations/[slug]` - Individual destination
- `/[vertical]/blog` - All blog posts for vertical
- `/[vertical]/blog/[slug]` - Individual blog post

### Static Generation

All pages use Next.js static generation for performance:
- `generateStaticParams()` for dynamic routes
- Pre-rendered at build time
- Fast page loads
- SEO-friendly

## Affiliate System

### Configuration

Edit `lib/affiliates.ts` to:
- Add new partners
- Update tracking parameters
- Set priorities
- Enable/disable partners

### API Route

`/api/affiliate` - Redirects to affiliate links with tracking:
- Query parameters: destination, category, vertical, partner
- Automatically selects best partner
- Handles tracking parameters

## Content Creation

### Adding Destinations

1. Create markdown file in `content/destinations/`
2. Add frontmatter with required fields
3. Write content in markdown
4. Add images to `public/images/destinations/`

### Adding Blog Posts

1. Create markdown file in `content/blog/`
2. Add frontmatter with required fields
3. Write content in markdown
4. Add images to `public/images/blog/`

## SEO Features

### Automatic SEO
- Dynamic metadata generation
- Schema markup
- Sitemap generation
- Robots.txt
- Clean URLs
- Internal linking

### Manual Optimization
- Custom SEO titles/descriptions in frontmatter
- Keyword optimization
- Image alt tags
- Heading hierarchy

## Performance

- Static site generation
- Image optimization (Next.js Image component)
- Code splitting
- Lazy loading
- Optimized builds

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Production Deployment

1. Set `NEXT_PUBLIC_BASE_URL` environment variable
2. Update affiliate tracking IDs in `lib/affiliates.ts`
3. Add images to `public/images/`
4. Build and deploy

## Customization

### Adding a New Vertical

1. Add configuration to `lib/verticals.ts`
2. Create content in `content/` directories
3. Routes are automatically generated

### Changing Affiliate Partners

Edit `lib/affiliates.ts` - no need to change individual pages.

### Styling

Uses Tailwind CSS with custom utilities in `app/globals.css`.

## Content Requirements

Each vertical should have:
- At least 3 destinations
- At least 3 blog posts
- Featured content for landing pages
- Proper SEO metadata

## Next Steps

1. Add more content for each vertical
2. Update affiliate tracking IDs
3. Add images to public/images/
4. Configure environment variables
5. Test affiliate links
6. Optimize images
7. Add analytics
