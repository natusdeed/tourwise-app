'use client'

import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import type { ComponentProps } from 'react'
import { trackAffiliateClick } from '@/lib/analytics'
import {
  buildAffiliateRedirectUrl,
  buildAffiliateUrl,
  type AffiliateProgram,
} from '@/lib/affiliate'

type LegacyProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  trackingLabel?: string
  /** If true (default), route through /api/affiliate-click for consistent server logs + client GA. */
  useServerRedirect?: boolean
  external?: boolean
}

type ProgramProps = {
  program: AffiliateProgram
  path: string
  subid: string
  children: React.ReactNode
  className?: string
}

export type AffiliateLinkProps = LegacyProps | ProgramProps

function isProgramProps(p: AffiliateLinkProps): p is ProgramProps {
  return 'program' in p
}

export default function AffiliateLink(props: AffiliateLinkProps) {
  if (isProgramProps(props)) {
    return <AffiliateProgramLink {...props} />
  }
  return <LegacyAffiliateLink {...props} />
}

function AffiliateProgramLink({ program, path, subid, children, className }: ProgramProps) {
  const url = useMemo(() => buildAffiliateUrl(program, path, subid), [program, path, subid])

  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') return
    const payload = JSON.stringify({ program, subid, ts: Date.now() })
    const blob = new Blob([payload], { type: 'application/json' })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/affiliate-click', blob)
    } else {
      void fetch('/api/affiliate-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      })
    }

    window.gtag?.('event', 'affiliate_click', {
      program,
      subid,
      link_name: subid,
      destination: url,
    })
  }, [program, subid, url])

  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

function LegacyAffiliateLink({
  href,
  trackingLabel,
  useServerRedirect = true,
  external,
  className,
  children,
  onClick,
  ...rest
}: LegacyProps) {
  const outbound = external ?? /^https?:\/\//i.test(href)
  const resolved = useServerRedirect ? buildAffiliateRedirectUrl(href, trackingLabel) : href

  const handleClick: ComponentProps<'a'>['onClick'] = (e) => {
    trackAffiliateClick(trackingLabel || 'affiliate_link', href)
    onClick?.(e)
  }

  if (!outbound && !useServerRedirect) {
    return (
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={resolved}
      className={className}
      rel={outbound ? 'nofollow sponsored noopener noreferrer' : 'noopener noreferrer'}
      target={outbound ? '_blank' : undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}
