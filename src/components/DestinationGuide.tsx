import Link from 'next/link'
import Script from 'next/script'
import Footer from '@/components/Footer'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import ExternalAffiliateLink from '@/components/ExternalAffiliateLink'
import FAQAccordion from '@/components/FAQAccordion'
import { breadcrumbListSchema, articleSchema } from '@/lib/schema'
import { SITE_ORIGIN } from '@/lib/site'
import type { DestinationGuideContent } from '@/lib/destination-guides'

const sectionClass = 'glass-strong rounded-xl border border-white/10 p-5 md:p-6 space-y-3 min-w-0'
const h2Class = 'text-xl md:text-2xl font-semibold text-white heading-robotic'

export default function DestinationGuide({ guide }: { guide: DestinationGuideContent }) {
  const pageUrl = `${SITE_ORIGIN}${guide.path}`
  const partners = guide.partners.filter((partner) => partner.url)
  const breadcrumb = breadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: guide.h1, path: guide.path },
  ])
  const article = articleSchema({
    title: guide.h1,
    description: guide.description,
    url: pageUrl,
    datePublished: '2026-11-01',
    dateModified: '2026-11-01',
    imageUrl: `${SITE_ORIGIN}/og-image.jpg`,
  })

  return (
    <main className="relative min-h-screen pt-20 md:pt-24 overflow-x-hidden">
      <Script
        id={`${guide.slug}-breadcrumb`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id={`${guide.slug}-article`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-5 min-w-0">
          <p className="text-sm text-white/60">
            <Link href="/" className="text-neon-cyan hover:underline">Home</Link>
            <span className="px-2">/</span>
            <Link href="/guides" className="text-neon-cyan hover:underline">Guides</Link>
            <span className="px-2">/</span>
            <span>{guide.h1}</span>
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-robotic break-words">
            <span className="text-gradient">{guide.h1}</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed">{guide.lede}</p>
          <AffiliateDisclosure variant="card" />

          {guide.sections.map((section) => (
            <div key={section.heading} className={sectionClass}>
              <h2 className={h2Class}>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-white/70 leading-relaxed break-words">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc list-inside space-y-2 text-white/70">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 48)} className="leading-relaxed break-words">{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.heading === 'Safety and entry' ? (
                <ul className="space-y-2 text-sm">
                  {guide.officialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-cyan hover:underline break-words"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {partners.length > 0 ? (
            <div className={sectionClass}>
              <h2 className={h2Class}>Partner tools</h2>
              <p className="text-white/70 leading-relaxed">
                These open partner sites. TourWiseAI may earn a commission if you book, at no extra cost to you.
              </p>
              <div className="flex flex-wrap gap-3">
                {partners.map((partner) => (
                  <ExternalAffiliateLink
                    key={partner.name}
                    href={partner.url}
                    trackingLabel={`${guide.slug}-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex max-w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-neon-cyan/40 hover:text-neon-cyan"
                  >
                    {partner.recommendedButtonText} · {partner.name}
                  </ExternalAffiliateLink>
                ))}
              </div>
            </div>
          ) : null}

          <div className={sectionClass}>
            <h2 className={h2Class}>A simple 3-day outline</h2>
            <ol className="space-y-4">
              {guide.itinerary.map((day) => (
                <li key={day.day}>
                  <h3 className="text-white font-semibold">{day.day}</h3>
                  <p className="text-white/70 leading-relaxed mt-1">{day.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            {guide.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neon-cyan underline underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <FAQAccordion title="Guide FAQ" items={guide.faqs} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
