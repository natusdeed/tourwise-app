'use client'

import { useId } from 'react'

type Props = {
  className?: string
}

export default function AviasalesWidgetContainer({ className }: Props) {
  const widgetContainerId = useId().replace(/:/g, '')

  return (
    <div className={className}>
      <div className="rounded-xl border border-neon-cyan/25 bg-black/30 p-5 md:p-6">
        <p className="text-sm text-white/75 mb-3">
          Aviasales live search widget placeholder.
        </p>
        <div
          id={`aviasales-widget-${widgetContainerId}`}
          className="min-h-[280px] rounded-lg border border-dashed border-white/25 bg-black/20 flex items-center justify-center text-center px-4"
        >
          <span className="text-sm text-white/55">
            Paste Aviasales/Travelpayouts supported widget bootstrap code here.
          </span>
        </div>
      </div>
      {/* 
        Aviasales widget integration instructions:
        1) Keep widget script loading client-side only inside this component.
        2) Mount the widget into the container id above.
        3) Do not expose private API/account credentials in client code.
      */}
    </div>
  )
}
