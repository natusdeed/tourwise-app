'use client'

import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import Script from 'next/script'
import { faqPageSchema } from '../lib/schema'

export type FAQItem = { question: string; answer: string }

type Props = {
  title?: string
  items: FAQItem[]
  /** Inject FAQPage JSON-LD for richer results */
  withJsonLd?: boolean
}

export default function FAQAccordion({ title = 'FAQ', items, withJsonLd = true }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const jsonLd = useMemo(() => JSON.stringify(faqPageSchema(items)), [items])

  return (
    <section className="space-y-4">
      {withJsonLd ? (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}
      <h2 className="text-2xl md:text-3xl font-bold heading-robotic text-white">
        <span className="text-gradient">{title}</span>
      </h2>
      <div className="divide-y divide-white/10 rounded-xl border border-white/10 overflow-hidden glass-strong">
        {items.map((item, idx) => {
          const open = openIndex === idx
          return (
            <div key={idx} className="bg-white/2">
              <button
                type="button"
                className="w-full flex items-center justify-between gap-3 text-left px-4 py-4 md:px-5"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : idx)}
              >
                <span className="font-semibold text-white">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-neon-cyan shrink-0 transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open ? (
                <div className="px-4 pb-4 md:px-5 md:pb-5 text-sm md:text-base text-white/75 leading-relaxed">
                  {item.answer}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
