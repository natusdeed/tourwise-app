'use client'

import { useEffect, useState, type ComponentType, type ReactNode } from 'react'

type Props<P> = {
  load: () => Promise<{ default: ComponentType<P> }>
  fallback: ReactNode
  componentProps?: P
}

/**
 * Loads a below-the-fold component after the browser is idle so it does not
 * compete with the first paint of the homepage headline.
 */
export default function IdleMount<P extends object>({ load, fallback, componentProps }: Props<P>) {
  const [Comp, setComp] = useState<ComponentType<P> | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = () => {
      load().then((mod) => {
        if (!cancelled) setComp(() => mod.default)
      })
    }
    let cancelIdle: () => void
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(run, { timeout: 2000 })
      cancelIdle = () => window.cancelIdleCallback(idleId)
    } else {
      const timeoutId = window.setTimeout(run, 1)
      cancelIdle = () => window.clearTimeout(timeoutId)
    }

    return () => {
      cancelled = true
      cancelIdle()
    }
  }, [load])

  if (!Comp) return fallback
  return <Comp {...(componentProps as P)} />
}
