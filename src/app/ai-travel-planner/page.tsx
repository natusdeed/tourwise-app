import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import FAQAccordion from '@/components/FAQAccordion'
import { faqPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'AI Travel Planner',
  description:
    'Use TourWiseAI to build practical trip plans faster. Compare route ideas, organize priorities, and connect your itinerary with flights, tours, transfers, eSIM, and insurance tools.',
  alternates: { canonical: 'https://tourwiseai.com/ai-travel-planner' },
}

const faqs = [
  { question: 'What is TourWiseAI?', answer: 'TourWiseAI is a travel planning website that helps you organize trip ideas, compare options, and plan your itinerary with AI-assisted guidance.' },
  { question: 'How does TourWiseAI help plan trips?', answer: 'You can describe your destination, dates, and priorities, then use the suggested structure to build a clearer day-by-day plan.' },
  { question: 'Does TourWiseAI book flights directly?', answer: 'No. TourWiseAI helps with planning and links to partner sites where bookings can be completed.' },
]

export default function AiTravelPlannerPage() {
  return (
    <main className="relative min-h-screen pt-20 md:pt-24">
      <Script
        id="ai-planner-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold heading-robotic">
            <span className="text-gradient">AI Travel Planner</span>
          </h1>
          <p className="text-white/75">
            Plan smarter trips with TourWiseAI by turning scattered ideas into a usable itinerary. Start with
            your destination and priorities, then connect your plan to flights, activities, and essentials.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="inline-flex rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20">
              Open the AI Planner
            </Link>
            <Link href="/cheap-flights" className="inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan">
              Compare Cheap Flights
            </Link>
          </div>
          <AffiliateDisclosure />
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <FAQAccordion title="AI Travel Planner FAQ" items={faqs} withJsonLd={false} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
