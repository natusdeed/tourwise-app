/**
 * Canonical site URL and page metadata.
 *
 * Vercel serves https://www.tourwiseai.com and redirects the apex there.
 * Every public title, canonical, sitemap URL, and social image should use this host.
 */

import type { Metadata } from 'next'

export const SITE_ORIGIN = 'https://www.tourwiseai.com'
export const SITE_NAME = 'TourWiseAI'
export const OG_IMAGE_PATH = '/og-image.jpg'
export const TITLE_LIMIT = 60
export const DESCRIPTION_LIMIT = 155

const BRAND_SUFFIX = ` | ${SITE_NAME}`

/** Turn an apex or relative path into the www canonical URL. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl
      .replace(/https:\/\/(?!www\.)tourwiseai\.com/g, SITE_ORIGIN)
      .replace(/https:\/\/tourwise\.ai/g, SITE_ORIGIN)
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return path === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`
}

/**
 * One brand suffix, 60 characters or fewer.
 * Titles that already include the brand and fit are left unchanged.
 */
export function fitTitle(raw: string): string {
  let title = raw.replace(/\s+/g, ' ').trim()
  const suffixPattern = /(?:\s*[|—–-]\s*)Tour\s*Wise(?:\s*AI)?\s*$/i

  for (let i = 0; i < 3; i += 1) {
    if (!suffixPattern.test(title)) break
    title = title.replace(suffixPattern, '').trim()
  }

  if (!title) return SITE_NAME

  if (/tourwise/i.test(title) && title.length <= TITLE_LIMIT) {
    return title
  }

  if (title.length + BRAND_SUFFIX.length <= TITLE_LIMIT) {
    return `${title}${BRAND_SUFFIX}`
  }

  const maxStem = TITLE_LIMIT - BRAND_SUFFIX.length
  let stem = title.slice(0, maxStem)
  const space = stem.lastIndexOf(' ')
  if (space >= 18) stem = stem.slice(0, space)
  stem = stem.replace(/(?:\s+(?:&|and|or|of|the|a|an|to|for))+$/i, '')
  stem = stem.replace(/[|—–\-:,&\s]+$/, '')
  const fitted = `${stem}${BRAND_SUFFIX}`
  return fitted.length <= TITLE_LIMIT ? fitted : fitted.slice(0, TITLE_LIMIT)
}

/** 155 characters or fewer, cut on a word boundary. */
export function fitDescription(raw: string): string {
  const text = raw.replace(/\s+/g, ' ').trim()
  if (text.length <= DESCRIPTION_LIMIT) return text

  let cut = text.slice(0, DESCRIPTION_LIMIT)
  const space = cut.lastIndexOf(' ')
  if (space >= 90) cut = cut.slice(0, space)
  return cut.replace(/[.,;:\s]+$/, '')
}

export function pageMeta(input: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: string
}): Metadata {
  const title = input.title.trim()
  const description = input.description.trim()

  if (title.length > TITLE_LIMIT) {
    throw new Error(`SEO title is ${title.length} characters (max ${TITLE_LIMIT}): ${title}`)
  }
  if (description.length > DESCRIPTION_LIMIT) {
    throw new Error(
      `SEO description is ${description.length} characters (max ${DESCRIPTION_LIMIT}): ${description}`
    )
  }

  const url = absoluteUrl(input.path)
  const image = input.image || OG_IMAGE_PATH

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: input.type || 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'TourWiseAI AI travel planner',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@tourwiseai',
    },
  }
}
