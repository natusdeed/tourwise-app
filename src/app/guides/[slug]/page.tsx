import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationGuide from '@/components/DestinationGuide'
import { DESTINATION_GUIDES, getDestinationGuide } from '@/lib/destination-guides'
import { pageMeta } from '@/lib/site'

type PageProps = { params: { slug: string } }

export function generateStaticParams() {
  return DESTINATION_GUIDES.map((guide) => ({ slug: guide.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getDestinationGuide(params.slug)
  if (!guide) {
    return { title: { absolute: 'Guide Not Found | TourWiseAI' }, robots: { index: false, follow: false } }
  }
  return pageMeta({
    title: guide.title,
    description: guide.description,
    path: guide.path,
    type: 'article',
  })
}

export default function GuidePage({ params }: PageProps) {
  const guide = getDestinationGuide(params.slug)
  if (!guide) notFound()
  return <DestinationGuide guide={guide} />
}
