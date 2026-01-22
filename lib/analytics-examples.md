# Google Analytics 4 Tracking Examples

This file shows how to use the GA4 tracking functions throughout your application.

## Setup

1. Add your GA4 Measurement ID to your `.env.local` file:
```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Or pass it directly to the component:
```tsx
<GoogleAnalytics measurementId="G-XXXXXXXXXX" />
```

## Usage Examples

### Track CTA Button Clicks

```tsx
import { trackCTA } from '@/utils/analytics'

<button
  onClick={() => {
    trackCTA('create_itinerary', 'hero')
    // Your button action here
  }}
>
  Create My Free Itinerary
</button>
```

### Track Affiliate Link Clicks

```tsx
import { trackAffiliateClick } from '@/utils/analytics'

<a
  href="https://www.aviasales.com/search?marker=692947"
  onClick={() => {
    trackAffiliateClick('aviasales_flights', 'https://www.aviasales.com', 699)
  }}
>
  View Flight Deals
</a>
```

### Track Email Signups

```tsx
import { trackEmailSignup } from '@/utils/analytics'

// After successful email submission
if (response.ok) {
  trackEmailSignup('footer_newsletter')
}
```

### Track Itinerary Creation

```tsx
import { trackItineraryCreation } from '@/utils/analytics'

// After itinerary is successfully created
trackItineraryCreation(
  'Bali, Indonesia',
  '7 days',
  3000
)
```

### Track Custom Events

```tsx
import { trackCustomEvent } from '@/utils/analytics'

// Track any custom event
trackCustomEvent('deal_viewed', {
  deal_id: 'bali-699',
  deal_name: 'Bali Flash Sale',
  deal_price: 699
})
```

### Track Page Views (Manual)

```tsx
import { trackPageView } from '@/utils/analytics'

// Track a specific page view
trackPageView('/destinations/bali', 'Bali Travel Guide')
```

## Automatic Tracking

The following events are tracked automatically:

- **Scroll Depth**: Tracks when users scroll to 25%, 50%, 75%, and 100% of the page
- **Page Views**: Automatically tracked by GA4 on page navigation

## Important Notes

1. **Cookie Consent**: All tracking respects the cookie consent banner. GA4 only loads after user accepts cookies.

2. **Type Safety**: All functions check if `window.gtag` exists before tracking, so they're safe to call anywhere.

3. **Performance**: Scroll tracking is throttled using `requestAnimationFrame` for optimal performance.

4. **Privacy**: All tracking functions include timestamps and respect user privacy settings.
