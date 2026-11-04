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
          Cheapest flights people are finding right now
        </h2>
        <p className="text-white/60 text-sm mb-4 max-w-3xl">
          Live prices from Aviasales searches. Prices change; check at booking.
        </p>
        <AviasalesEmbedWidget
          src={AVIASALES_POPULAR_ROUTES_WIDGET_SRC}
          scriptId="aviasales-popular-routes"
        />
      </div>
    </section>
  )
}
