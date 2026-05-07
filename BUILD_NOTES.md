# TourWise AI Faith Travel Build Notes

## Completed
- Step 9: Holy Land Tours from USA page
- Step 10: Camino de Santiago Planner page
- Step 11: Christian Rome & Vatican Itinerary page
- Step 12: Faith Travel hub page
- Step 13: Sitemap update
- Step 14: Homepage faith-travel section

## Verification
- npm run build result: Pass (exit code 0)
- TypeScript status: No TypeScript errors
- AffiliateDisclosure status: Present on all 4 pages (`/holy-land-tours-from-usa`, `/camino-de-santiago-planner`, `/vatican-rome-christian-itinerary`, `/faith-travel`)
- StickyTripCTA destination status: Correct on all 4 pages (`Holy Land`, `Camino de Santiago`, `Rome Vatican`, `Faith Travel`)
- AffiliateLink prop usage status: Money pages use only `program`, `path`, and `subid` props
- Duplicate component check status:
  - Holy Land page: one `FAQAccordion`, one `LeadMagnetForm`
  - Camino page: one `FAQAccordion`, one `LeadMagnetForm`
  - Vatican/Rome page: one `FAQAccordion`, one `LeadMagnetForm`
  - Faith Travel page: one `LeadMagnetForm`; no FAQ required
- Sitemap route status: Includes `/faith-travel`, `/holy-land-tours-from-usa`, `/camino-de-santiago-planner`, `/vatican-rome-christian-itinerary`, `/affiliate-disclosure`
- Homepage and hub affiliate-link guardrails:
  - No `AffiliateLink` import or usage in `src/app/faith-travel/page.tsx`
  - No `AffiliateLink` import or usage in `src/app/page.tsx` faith-travel homepage section

## Existing Warnings
- Existing repo-wide ESLint warnings remain and are unrelated to this build:
  - `@next/next/no-img-element` warnings in several template/vertical files
  - `react-hooks/exhaustive-deps` ref cleanup warning in `components/LazyImage.tsx`

## Skipped / Not Changed
- No new components created
- No homepage redesign performed
- No affiliate links added to the Faith Travel hub page
- No affiliate links added to the homepage faith-travel section
- Placeholder affiliate paths remain until Travelpayouts activation

## Technical Debt To Carry Forward
- `lib/affiliates.ts` and `src/lib/affiliate.ts` coexist — consolidate later
- Placeholder IDs in `lib/affiliates.ts` are not used by money pages
- `logAffiliateRedirect` exists in `src/lib/analytics.ts`; keep integration coverage in follow-up cleanup
