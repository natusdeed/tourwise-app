# Google Analytics 4 - useEffect Pattern Usage

## Quick Start

You can now use the exact pattern you requested in any component:

```tsx
'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { initGA4, initScrollTracking } from '@/utils/analytics'

export default function YourComponent() {
  useEffect(() => {
    // Check cookie consent before initializing
    const consent = Cookies.get('tourwise_consent')
    
    if (consent === 'accepted') {
      // Initialize GA4 (uses NEXT_PUBLIC_GA4_MEASUREMENT_ID from env)
      initGA4().then(() => {
        // Initialize scroll tracking after GA4 is ready
        initScrollTracking()
      })
    }
  }, [])

  return (
    // Your component JSX
  )
}
```

## Important Notes

1. **Cookie Consent**: Always check for cookie consent before initializing analytics
2. **Async Pattern**: `initGA4()` is async and returns a Promise. It will load the GA4 script if it's not already loaded.
3. **Scroll Tracking**: `initScrollTracking()` is safe to call multiple times - it will only initialize once.

## Environment Variable

Make sure you have your GA4 Measurement ID in `.env.local`:

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Alternative: If Script is Already Loaded

If you're using the `<GoogleAnalytics />` component in your layout (which loads the script), you can use a simpler pattern:

```tsx
useEffect(() => {
  const consent = Cookies.get('tourwise_consent')
  if (consent === 'accepted') {
    // Script is already loaded, just configure
    initGA4()
    initScrollTracking()
  }
}, [])
```

## See Also

- `components/AnalyticsInitializer.tsx` - Example component using this pattern
- `components/AnalyticsExample.tsx` - Detailed example with comments
- `lib/analytics-examples.md` - More tracking function examples
