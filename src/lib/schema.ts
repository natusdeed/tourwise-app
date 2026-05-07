/**
 * JSON-LD helpers used across pages.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tourwiseai.com'

export type BreadcrumbEntry = { name: string; path: string }

export function breadcrumbListSchema(entries: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      item: `${BASE}${e.path.startsWith('/') ? e.path : `/${e.path}`}`,
    })),
  }
}

export function articleSchema(opts: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  imageUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    image: opts.imageUrl,
    author: { '@type': 'Organization', name: 'TourWise AI' },
    publisher: {
      '@type': 'Organization',
      name: 'TourWise AI',
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
  }
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function touristTripSchema(opts: {
  name: string
  description: string
  url?: string
  itinerary?: string[] | { name: string; description?: string }[]
}) {
  const itinerary = opts.itinerary?.map((step, i) => {
    if (typeof step === 'string') {
      return {
        '@type': 'TouristAttraction',
        position: i + 1,
        name: step,
      }
    }

    return {
      '@type': 'TouristAttraction',
      position: i + 1,
      name: step.name,
      ...(step.description ? { description: step.description } : {}),
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: opts.name,
    description: opts.description,
    ...(opts.url ? { url: opts.url } : {}),
    ...(itinerary?.length ? { itinerary } : {}),
    provider: {
      '@type': 'Organization',
      name: 'TourWise AI',
      url: BASE,
    },
  }
}
