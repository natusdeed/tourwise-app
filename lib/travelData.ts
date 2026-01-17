/**
 * Travel Bureau Data Architecture
 * 
 * Contains country-specific information for passports, visas, and embassies.
 * This data powers the Travel Bureau module for Tour Wise AI.
 */

export interface CountryInfo {
  name: string;
  slug: string; // e.g., 'nigeria', 'usa'
  flagEmoji: string;
  passport: {
    officialUrl: string;
    processingTime: string;
    cost: string;
    guideMarkdown: string;
  };
  visa: {
    officialUrl: string;
    requirements: string[];
    guideMarkdown: string;
  };
  embassies: {
    city: string;
    address: string;
    mapLink?: string;
  }[];
  updates: {
    id: string;
    date: string;
    title: string;
    summary: string;
    type: 'Critical' | 'Info';
  }[];
}

/**
 * Country data indexed by slug
 */
export const COUNTRY_DATA: Record<string, CountryInfo> = {
  nigeria: {
    name: 'Nigeria',
    slug: 'nigeria',
    flagEmoji: '🇳🇬',
    passport: {
      officialUrl: 'https://immigration.gov.ng',
      processingTime: '2-4 weeks (standard), 1-2 weeks (express)',
      cost: '₦35,000 (32-page), ₦70,000 (64-page)',
      guideMarkdown: `# Nigeria Passport Application Guide

## Overview
The Nigerian passport is issued by the Nigeria Immigration Service (NIS). This guide provides essential information for obtaining your Nigerian passport.

## Application Methods
1. **Online Application**: Visit the [Nigeria Immigration Service portal](https://immigration.gov.ng)
2. **In-Person**: Visit designated passport offices nationwide
3. **Express Service**: Available for urgent travel (additional fees apply)

## Required Documents
- Completed passport application form
- Birth certificate or sworn affidavit
- Proof of Nigerian citizenship (National ID, Voter's Card, or Old Passport)
- Two recent passport photographs (white background)
- Payment receipt (bank teller or online payment confirmation)
- Marriage certificate (if applicable, for name change)

## Processing Times
- **Standard Processing**: 2-4 weeks
- **Express Processing**: 1-2 weeks (additional ₦15,000 fee)
- **Emergency Processing**: 3-5 working days (limited availability)

## Fees (2026)
- 32-page passport: ₦35,000
- 64-page passport: ₦70,000
- Express service: Additional ₦15,000

## Important Notes
- Ensure all documents are original or properly certified copies
- Photographs must be recent (within 6 months) and meet specific requirements
- All fees must be paid through designated banks or online channels
- Track your application status online using your reference number

## Renewal Process
If renewing an expired passport, submit your old passport along with the renewal application. The process is generally faster than a new application.

**Note**: Always verify current requirements with the [official Nigeria Immigration Service website](https://immigration.gov.ng) as policies may change.`,
    },
    visa: {
      officialUrl: 'https://immigration.gov.ng/visa',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application form',
        'Two recent passport photographs',
        'Proof of sufficient funds (bank statements)',
        'Travel itinerary (flight bookings)',
        'Hotel reservation or accommodation proof',
        'Travel insurance (required for some countries)',
        'Invitation letter (for business/family visits)',
        'Yellow fever vaccination certificate',
      ],
      guideMarkdown: `# Nigeria Visa Requirements Guide

## Overview
Visa requirements for entering Nigeria vary based on your nationality and purpose of visit. This guide provides general information for travelers.

## Visa Types
1. **Tourist Visa**: For leisure and sightseeing (30-90 days)
2. **Business Visa**: For business meetings and conferences
3. **Transit Visa**: For travelers passing through Nigeria
4. **Diplomatic/Official Visa**: For government officials
5. **Temporary Work Permit**: For short-term employment

## General Requirements
All visa applicants typically need:
- Valid passport (minimum 6 months validity)
- Completed visa application form
- Recent passport photographs
- Proof of financial means
- Travel itinerary
- Accommodation proof
- Yellow fever vaccination certificate

## Visa-Free Countries
Citizens of ECOWAS member states can enter Nigeria without a visa for stays up to 90 days. Check current visa-free agreements before traveling.

## Processing Times
- **Standard Processing**: 5-10 working days
- **Express Processing**: 2-3 working days (additional fees apply)
- **Emergency Processing**: 24-48 hours (subject to approval)

## Application Process
1. Complete online application at [Nigeria Immigration Service](https://immigration.gov.ng/visa)
2. Upload required documents
3. Pay visa fees online
4. Schedule appointment (if required)
5. Submit documents at embassy/consulate
6. Track application status
7. Collect visa or receive via courier

## Fees (Approximate, 2026)
- Tourist Visa (Single Entry): $75 - $150
- Tourist Visa (Multiple Entry): $150 - $250
- Business Visa: $100 - $200
- Express Processing: Additional $50 - $100

## Important Notes
- Yellow fever vaccination is mandatory for all travelers
- Some nationalities may require additional documents or interviews
- Visa fees are non-refundable
- Processing times may vary during peak seasons
- Always check current requirements with the Nigerian embassy in your country

**Note**: Visa requirements change frequently. Always verify current information with the [official Nigeria Immigration Service website](https://immigration.gov.ng/visa) or your nearest Nigerian embassy/consulate.`,
    },
    embassies: [
      {
        city: 'Abuja',
        address: 'Plot 753, Diplomatic Drive, Central Business District, Abuja, Nigeria',
        mapLink: 'https://maps.google.com/?q=7.4951,5.6183',
      },
      {
        city: 'Lagos',
        address: '11 Kofo Abayomi Street, Victoria Island, Lagos, Nigeria',
        mapLink: 'https://maps.google.com/?q=6.4281,3.4219',
      },
    ],
    updates: [
      {
        id: 'nigeria-critical-visa-suspension-2026-01-15',
        date: '2026-01-15',
        title: '🇺🇸 US Suspends Immigrant Visas (Green Cards)',
        summary: 'The US State Department has paused all Immigrant Visa processing for Nigerian nationals effective Jan 21, 2026, due to new public charge screening rules. Tourist and Student visas are technically exempt from this specific order but expect extreme delays. Official source: https://travel.state.gov/content/travel/en/News/visas-news.html',
        type: 'Critical',
      },
      {
        id: '1',
        date: '2026-01-15',
        title: 'New passport application portal launched',
        summary: 'Nigeria Immigration Service has launched a new online portal for passport applications. The new system offers improved user experience and faster processing times.',
        type: 'Info',
      },
      {
        id: '2',
        date: '2026-01-10',
        title: 'Visa processing times updated - expect delays during peak season',
        summary: 'Due to increased travel demand, visa processing times may be extended by 3-5 business days during peak seasons. Applicants are advised to apply well in advance.',
        type: 'Info',
      },
    ],
  },
  usa: {
    name: 'United States',
    slug: 'usa',
    flagEmoji: '🇺🇸',
    passport: {
      officialUrl: 'https://travel.state.gov/content/travel/en/passports.html',
      processingTime: '6-9 weeks (routine), 2-3 weeks (expedited)',
      cost: '$130 (booklet), $30 (card only), $160 (booklet + card)',
      guideMarkdown: `# United States Passport Application Guide

## Overview
U.S. passports are issued by the U.S. Department of State. This guide provides comprehensive information for obtaining or renewing your U.S. passport.

## Application Methods
1. **First-Time Applicants**: Must apply in person at a passport acceptance facility
2. **Renewals**: Can apply by mail if eligible
3. **Expedited Service**: Available for urgent travel needs

## Required Documents (First-Time Applicants)
- DS-11 passport application form (completed but NOT signed)
- Proof of U.S. citizenship (birth certificate, naturalization certificate, or previous passport)
- Valid government-issued photo ID (driver's license, state ID, or military ID)
- Photocopy of front and back of ID
- One recent passport photo (2x2 inches, white background)
- Payment for fees (check or money order, plus credit/debit card for execution fee)

## Renewal by Mail Requirements
You can renew by mail if:
- Your previous passport is undamaged and in your possession
- Was issued when you were 16 or older
- Was issued within the last 15 years
- Has your current name (or you can legally document name change)

## Processing Times (2026)
- **Routine Service**: 6-9 weeks from receipt
- **Expedited Service**: 2-3 weeks from receipt (additional $60 fee)
- **Emergency Travel**: 1-2 business days (by appointment only, additional fees apply)

## Fees
- **Adult Passport Book (16+)**: $130
- **Adult Passport Card (16+)**: $30
- **Adult Book + Card (16+)**: $160
- **Child Passport Book (under 16)**: $100
- **Child Passport Card (under 16)**: $15
- **Child Book + Card (under 16)**: $115
- **Execution Fee** (first-time applicants): $35
- **Expedited Service**: $60 (additional)

## Passport Validity
- Adult passports (16+): Valid for 10 years
- Child passports (under 16): Valid for 5 years

## Important Notes
- Processing times do not include mailing time (add 2 weeks each way)
- All applicants under 16 must appear in person with both parents/guardians
- Photos must meet specific requirements (white background, neutral expression, no glasses)
- Name changes require supporting documentation

## Expedited Service
For urgent travel, you can:
1. Pay for expedited service ($60) when applying
2. Use Priority Mail Express for faster delivery
3. Schedule an appointment at a Regional Passport Agency for life-or-death emergencies

## Application Locations
- **Post Offices**: Many U.S. Post Offices accept passport applications
- **Passport Agencies**: Regional agencies for urgent travel
- **Public Libraries/Clerks**: Some local government offices accept applications

**Note**: Always verify current requirements and fees at [travel.state.gov](https://travel.state.gov/content/travel/en/passports.html) as policies and fees may change.`,
    },
    visa: {
      officialUrl: 'https://travel.state.gov/content/travel/en/us-visas.html',
      requirements: [
        'Valid passport (minimum 6 months validity beyond intended stay)',
        'Nonimmigrant Visa Application (DS-160) form',
        'Application fee payment receipt',
        'Photo meeting U.S. visa requirements',
        'Supporting documents (varies by visa type)',
        'Interview appointment confirmation',
        'Financial proof (bank statements, sponsorship letters)',
        'Travel itinerary',
        'Purpose of visit documentation',
        'Ties to home country proof',
      ],
      guideMarkdown: `# United States Visa Requirements Guide

## Overview
Most foreign nationals need a visa to enter the United States. This guide provides general information about U.S. visa types and requirements.

## Visa Types
1. **B-1/B-2 Visitor Visa**: Business and tourism (most common)
2. **F-1 Student Visa**: For academic studies
3. **J-1 Exchange Visitor Visa**: For work and study exchange programs
4. **H-1B Work Visa**: For specialty occupations
5. **L-1 Intracompany Transfer Visa**: For employees of multinational companies
6. **O-1 Extraordinary Ability Visa**: For individuals with extraordinary abilities

## Visa Waiver Program (VWP)
Citizens of 40+ countries can travel to the U.S. without a visa for stays up to 90 days using ESTA (Electronic System for Travel Authorization). ESTA costs $21 and is valid for 2 years.

## General Requirements
All visa applicants need:
- Valid passport (6+ months validity)
- Completed DS-160 online application form
- Application fee payment ($185 for most nonimmigrant visas)
- Photo meeting U.S. requirements
- Interview appointment (most applicants)
- Supporting documents based on visa type

## Application Process
1. **Complete DS-160 Form**: Online nonimmigrant visa application
2. **Pay Visa Fee**: $185 (standard nonimmigrant visa)
3. **Schedule Interview**: At nearest U.S. embassy/consulate
4. **Gather Documents**: Based on visa type and purpose
5. **Attend Interview**: In-person or via video (depending on location)
6. **Wait for Processing**: Typically 3-5 business days after approval
7. **Receive Visa**: Via courier or pick up at embassy

## Required Documents (Tourist/Business Visa)
- DS-160 confirmation page
- Appointment confirmation
- Valid passport
- One recent photograph
- Financial evidence (bank statements)
- Travel itinerary
- Proof of ties to home country (employment, property, family)
- Invitation letter (if visiting family/friends)

## Processing Times
- **Standard Processing**: 3-5 business days after interview
- **Administrative Processing**: Additional 2-8 weeks (if required)
- **Peak Season**: May take longer (summer, holidays)

## Interview Tips
- Arrive on time with all documents
- Answer questions honestly and concisely
- Bring proof of strong ties to home country
- Be prepared to explain your travel plans
- Dress professionally

## Fees (2026)
- **Nonimmigrant Visa (B, F, J, etc.)**: $185
- **Petition-Based Visas (H, L, O, etc.)**: $190 (petition fee) + $185 (visa fee)
- **K Visa (Fiancé/e)**: $265
- **ESTA (Visa Waiver)**: $21

## Visa Denial
Common reasons for denial:
- Insufficient financial resources
- Weak ties to home country
- Incomplete application
- Immigration intent concerns
- Previous visa violations

## Important Notes
- Visa fees are non-refundable, even if denied
- Visa validity varies (single entry, multiple entry, validity period)
- Length of stay is determined by CBP at port of entry
- Overstaying your visa can result in a ban from future entry
- Always check current requirements with the U.S. embassy in your country

**Note**: Visa requirements and processes change frequently. Always verify current information at [travel.state.gov](https://travel.state.gov/content/travel/en/us-visas.html) or with your nearest U.S. embassy/consulate.`,
    },
    embassies: [
      {
        city: 'Washington, D.C.',
        address: '2201 C Street NW, Washington, D.C. 20520, United States',
        mapLink: 'https://maps.google.com/?q=38.8977,-77.0365',
      },
      {
        city: 'New York',
        address: '799 United Nations Plaza, New York, NY 10017, United States',
        mapLink: 'https://maps.google.com/?q=40.7489,-73.9680',
      },
      {
        city: 'Los Angeles',
        address: '11000 Wilshire Boulevard, Los Angeles, CA 90024, United States',
        mapLink: 'https://maps.google.com/?q=34.0522,-118.2437',
      },
      {
        city: 'Chicago',
        address: '77 West Wacker Drive, Chicago, IL 60601, United States',
        mapLink: 'https://maps.google.com/?q=41.8781,-87.6298',
      },
    ],
    updates: [
      {
        id: '3',
        date: '2026-01-20',
        title: 'New passport processing times announced - expect 6-9 weeks for routine service',
        summary: 'The U.S. Department of State has updated standard passport processing times. Routine service now takes 6-9 weeks, while expedited service takes 2-3 weeks. Additional fees apply for expedited processing.',
        type: 'Info',
      },
      {
        id: '4',
        date: '2026-01-12',
        title: 'ESTA requirements updated - mandatory for all VWP travelers',
        summary: 'Effective immediately, all travelers from Visa Waiver Program countries must have a valid ESTA authorization before boarding flights to the United States. ESTA applications should be submitted at least 72 hours before travel.',
        type: 'Critical',
      },
      {
        id: '5',
        date: '2026-01-05',
        title: 'Visa interview wait times reduced in major cities',
        summary: 'Good news for visa applicants: wait times for interview appointments have been reduced in major U.S. cities including New York, Los Angeles, and Chicago. Book your appointment early to secure preferred dates.',
        type: 'Info',
      },
    ],
  },
  // Placeholder entries for other pilot countries (to be populated)
  ghana: {
    name: 'Ghana',
    slug: 'ghana',
    flagEmoji: '🇬🇭',
    passport: {
      officialUrl: 'https://www.ghana.gov.gh',
      processingTime: '2-3 weeks',
      cost: 'GHS 150',
      guideMarkdown: `# Ghana Passport Application Guide\n\nComprehensive guide coming soon...`,
    },
    visa: {
      officialUrl: 'https://www.ghana.gov.gh',
      requirements: ['Valid passport', 'Application form', 'Photographs'],
      guideMarkdown: `# Ghana Visa Requirements Guide\n\nComprehensive guide coming soon...`,
    },
    embassies: [
      {
        city: 'Accra',
        address: 'Embassy details coming soon',
      },
    ],
    updates: [
      {
        id: 'ghana-critical-visa-suspension-2026-01-15',
        date: '2026-01-15',
        title: '🇺🇸 US Suspends Immigrant Visas (Green Cards)',
        summary: 'The US State Department has paused all Immigrant Visa processing for Ghanaian nationals effective Jan 21, 2026, due to new public charge screening rules. Tourist and Student visas are technically exempt from this specific order but expect extreme delays. Official source: https://travel.state.gov/content/travel/en/News/visas-news.html',
        type: 'Critical',
      },
      {
        id: '6',
        date: '2026-01-18',
        title: 'Passport application process streamlined',
        summary: 'Ghana Immigration Service has simplified the passport application process with new online features. Applicants can now track their application status in real-time.',
        type: 'Info',
      },
    ],
  },
  uk: {
    name: 'United Kingdom',
    slug: 'uk',
    flagEmoji: '🇬🇧',
    passport: {
      officialUrl: 'https://www.gov.uk/browse/abroad/passports',
      processingTime: '3-6 weeks',
      cost: '£93.50',
      guideMarkdown: `# UK Passport Application Guide\n\nComprehensive guide coming soon...`,
    },
    visa: {
      officialUrl: 'https://www.gov.uk/browse/visas-immigration',
      requirements: ['Valid passport', 'Application form', 'Supporting documents'],
      guideMarkdown: `# UK Visa Requirements Guide\n\nComprehensive guide coming soon...`,
    },
    embassies: [
      {
        city: 'London',
        address: 'Embassy details coming soon',
      },
    ],
    updates: [
      {
        id: '7',
        date: '2026-01-14',
        title: 'Brexit-related visa changes now in effect',
        summary: 'Updated visa requirements for EU citizens traveling to the UK are now fully implemented. Travelers should review new documentation requirements before booking trips.',
        type: 'Critical',
      },
    ],
  },
  canada: {
    name: 'Canada',
    slug: 'canada',
    flagEmoji: '🇨🇦',
    passport: {
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html',
      processingTime: '10-20 business days',
      cost: '$120 CAD',
      guideMarkdown: `# Canada Passport Application Guide\n\nComprehensive guide coming soon...`,
    },
    visa: {
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
      requirements: ['Valid passport', 'Electronic Travel Authorization (eTA)', 'Supporting documents'],
      guideMarkdown: `# Canada Visa Requirements Guide\n\nComprehensive guide coming soon...`,
    },
    embassies: [
      {
        city: 'Ottawa',
        address: 'Embassy details coming soon',
      },
    ],
    updates: [
      {
        id: '8',
        date: '2026-01-16',
        title: 'eTA system update - faster processing',
        summary: 'Canada\'s Electronic Travel Authorization (eTA) system has been updated with faster processing times. Most applications are now approved within minutes instead of hours.',
        type: 'Info',
      },
    ],
  },
};

/**
 * Get country data by slug
 */
export function getCountryBySlug(slug: string): CountryInfo | null {
  return COUNTRY_DATA[slug.toLowerCase()] || null;
}

/**
 * Get all available countries
 */
export function getAllCountries(): CountryInfo[] {
  return Object.values(COUNTRY_DATA);
}

/**
 * Check if a country slug exists
 */
export function isValidCountry(slug: string): boolean {
  return slug.toLowerCase() in COUNTRY_DATA;
}

/**
 * Travel Alert Interface
 */
export interface TravelAlert {
  id: string;
  date: string;
  title: string;
  summary: string;
  type: 'Critical' | 'Info';
  countryName: string;
  countrySlug: string;
  countryFlag: string;
}

/**
 * Get all travel alerts from all countries, sorted by date (newest first)
 */
export function getAllAlerts(): TravelAlert[] {
  const alerts: TravelAlert[] = [];
  
  // Loop through all countries
  Object.values(COUNTRY_DATA).forEach((country) => {
    // Collect all updates from this country
    country.updates.forEach((update) => {
      alerts.push({
        id: update.id,
        date: update.date,
        title: update.title,
        summary: update.summary,
        type: update.type,
        countryName: country.name,
        countrySlug: country.slug,
        countryFlag: country.flagEmoji,
      });
    });
  });
  
  // Sort by date (newest first)
  alerts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });
  
  return alerts;
}
