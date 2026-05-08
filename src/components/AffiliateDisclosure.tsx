import Link from 'next/link'

type Props = {
  className?: string
  variant?: 'inline' | 'card'
}

export default function AffiliateDisclosure({ className = '', variant = 'inline' }: Props) {
  const body = (
    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
      <strong className="text-white/90">Affiliate Disclosure:</strong> TourWise AI participates in
      Travelpayouts partner programs (flights, tours, transfers, connectivity, insurance, and related
      travel services). When you click certain links and make a purchase, we may earn a commission at no
      extra cost to you. Some links may earn us a commission at no extra cost to you. This helps keep our
      AI travel planner free.{' '}
      <Link href="/affiliate-disclosure" className="text-neon-cyan hover:underline">
        Read our full disclosure
      </Link>
      .
    </p>
  )

  if (variant === 'card') {
    return (
      <div
        className={`glass-strong rounded-xl border border-neon-cyan/20 p-4 md:p-5 ${className}`}
      >
        {body}
      </div>
    )
  }

  return (
    <div
      className={`border-t border-white/10 pt-4 mt-6 max-w-3xl mx-auto ${className}`}
    >
      {body}
    </div>
  )
}
