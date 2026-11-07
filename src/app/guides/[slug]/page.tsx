import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationGuide from '@/components/DestinationGuide'
import { DESTINATION_GUIDES, getDestinationGuide } from '@/lib/destination-guides'
import { pageMeta } from '@/lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return DESTINATION_GUIDES.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
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

export default async function GuidePage(props: PageProps) {
  const params = await props.params;
  const guide = getDestinationGuide(params.slug)
  if (!guide) notFound()
  return <DestinationGuide guide={guide} />
}
