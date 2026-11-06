import AviasalesEmbedWidget from '@/components/AviasalesEmbedWidget'
import { AVIASALES_POPULAR_ROUTES_WIDGET_SRC } from '@/lib/aviasales'

type Props = {
  /** Matches the page column so the block lines up with the copy above it. */
  widthClassName?: string
}

/**
 * Popular Routes embed. Prices inside the widget come from Aviasales.
 * The sentence under the heading says they change and are not a quote from us.
 */
export default function LiveFaresSection({ widthClassName = 'max-w-6xl' }: Props) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pb-12 overflow-x-hidden">
      <div className={`${widthClassName} mx-auto min-w-0`}>
        <h2 className="heading-robotic text-2xl md:text-3xl font-bold text-white mb-2">
          Aviasales popular-route examples
        </h2>
        <p className="text-white/60 text-sm mb-4 max-w-3xl">
          Indicative examples from Aviasales. These may use different dates or airports, and they are
          not live or exact fares for a trip you selected. Confirm every detail on the partner site.
          Fares are set by the partner and may change. Baggage and fare rules vary by airline and must
          be checked there.
        </p>
        <AviasalesEmbedWidget
          src={AVIASALES_POPULAR_ROUTES_WIDGET_SRC}
          scriptId="aviasales-popular-routes"
        />
      </div>
    </section>
  )
}
