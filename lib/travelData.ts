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
      guideMarkdown: `# Ghana Passport Application Guide\n\n## Overview\nThe Ghanaian biometric passport is issued by the Ministry of Foreign Affairs and Regional Integration through Passport Application Centres nationwide. Ghana now issues chip-embedded biometric passports; the older machine-readable passports are being phased out.\n\n## Application Methods\n1. **Online Application**: Start your application through the official portal, then book a biometric capture appointment\n2. **Passport Application Centres**: Accra, Kumasi, Takoradi, Tamale, Ho, and other regional centres\n3. **Premium/Express Service**: Available at select centres for urgent travel (additional fees apply)\n\n## Required Documents\n- Completed online application form (printed)\n- Birth certificate or affidavit of birth\n- Proof of Ghanaian citizenship (Ghana Card, old passport, or citizenship documents)\n- Two recent passport photographs meeting biometric specifications\n- Payment receipt from the online portal\n- Guarantor's details where required\n\n## Processing Times\n- **Standard Processing**: 2-3 weeks after biometric capture\n- **Express/Premium Processing**: Faster turnaround at select centres (additional fee)\n- **Emergency Processing**: Limited availability for proven urgent travel\n\n## Important Notes\n- Biometric capture (fingerprints and photo) must be done in person\n- Ensure your Ghana Card details match your application to avoid delays\n- Track your application status online using your application reference number\n- Renew before expiry if you travel frequently — many countries require 6 months validity\n\n## Renewal Process\nRenewals follow the same online-first process. Submit your expiring passport with the renewal application; the biometric capture step is still required.\n\n**Note**: Fees and centre availability change. Always verify current requirements on the official portal before applying.`,
    },
    visa: {
      officialUrl: 'https://www.ghana.gov.gh',
      requirements: [
        'Valid passport with at least 6 months validity',
        'Completed visa application form',
        'Two recent passport photographs',
        'Proof of sufficient funds (bank statements)',
        'Travel itinerary (flight bookings)',
        'Hotel reservation or host invitation letter',
        'Yellow fever vaccination certificate',
        'Return/onward ticket',
      ],
      guideMarkdown: `# Ghana Visa Requirements Guide\n\n## Overview\nMost travelers need a Ghanaian visa arranged **before** departure. Ghana has sharply limited visa-on-arrival — do not assume you can get one at Kotoka International Airport. Apply through the Ghanaian embassy or consulate covering your jurisdiction, or the official online portal where available.\n\n## Visa Types\n1. **Tourist Visa**: For leisure and sightseeing, typically single entry\n2. **Business Visa**: For meetings, conferences, and commercial visits\n3. **Transit Visa**: For passing through Ghana to a third country\n4. **Multiple-Entry Visa**: For frequent travelers (harder to obtain, requires justification)\n\n## General Requirements\nAll visa applicants typically need:\n- Valid passport (minimum 6 months validity beyond travel dates)\n- Completed visa application form\n- Recent passport photographs (white background)\n- Proof of financial means (recent bank statements)\n- Confirmed travel itinerary and return/onward ticket\n- Hotel reservation or a host invitation letter with the host's Ghanaian ID\n- Yellow fever vaccination certificate (mandatory)\n\n## Visa-Free and Visa-Exempt Travelers\n- Citizens of ECOWAS member states: visa-free for stays up to 90 days\n- A small number of additional nationalities have visa-free or visa-on-arrival arrangements — verify for your passport, as these lists change\n\n## Processing Times\n- **Standard Processing**: 5-10 working days at most missions\n- **Express Processing**: 2-3 working days where offered (additional fees apply)\n- Apply at least 3-4 weeks before travel; December demand spikes with diaspora holiday travel\n\n## Application Process\n1. Complete the application on the official portal or embassy website\n2. Upload/prepare all supporting documents\n3. Pay the visa fee (non-refundable)\n4. Attend an in-person appointment if required by your mission\n5. Submit your passport for visa affixing\n6. Collect your passport or receive it by courier\n\n## Important Notes\n- Yellow fever vaccination is mandatory — carry the certificate; it is checked\n- Single-entry visas are the norm; do not plan a side trip to Togo or Côte d'Ivoire expecting to re-enter on the same visa unless you hold multiple entry\n- Requirements vary by embassy — the Ghana mission in Washington may ask for different supporting documents than the one in London\n- Visa fees are non-refundable even if refused\n\n**Note**: Visa policy changes frequently. Always verify current requirements with the Ghanaian embassy or consulate in your country before booking non-refundable travel.`,
    },
    embassies: [
      {
        city: 'Accra',
        address: 'Passport Application Centre, Accra — verify current location on the official portal before visiting',
      },
      {
        city: 'Kumasi',
        address: 'Passport Application Centre, Kumasi — verify current location on the official portal before visiting',
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
      guideMarkdown: `# UK Passport Application Guide\n\n## Overview\nUK passports are issued by His Majesty's Passport Office (HMPO). Most adults apply online at GOV.UK — it is cheaper and faster than the paper form. First-time adult applicants need a countersignatory; renewals are simpler.\n\n## Application Methods\n1. **Online**: Apply at GOV.UK, upload a digital photo, pay by card — the fastest route\n2. **Paper form**: Available from Post Offices (costs more than online)\n3. **Fast Track**: 1-week service for renewals and first child passports, by appointment\n4. **Premium**: Same-day service for renewals at select passport offices (book ahead)\n\n## Required Documents\n- A digital or printed photo meeting the strict UK passport photo rules\n- Your old passport (for renewals)\n- Birth or adoption certificate (first-time applicants)\n- A countersignatory who has known you 2+ years (first adult applications)\n- Supporting documents if your name has changed (deed poll, marriage certificate)\n\n## Processing Times\n- **Standard online**: Around 3 weeks is typical; allow longer in spring/summer peaks\n- **1-week Fast Track**: Available for renewals and child first passports\n- **Same-day Premium**: Renewals only, limited appointments — book early\n\n## Important Notes\n- Photo rules are strict (plain background, no filters, specific dimensions) — most rejections are photo-related\n- Apply well before expiry if you travel often: many countries require 6 months validity, and some airlines enforce it\n- Track your application online with your reference number\n- Report lost or stolen passports immediately; a replacement counts as a first-time application in some respects\n\n**Note**: Fees change periodically. Always confirm the current fee on GOV.UK before paying.`,
    },
    visa: {
      officialUrl: 'https://www.gov.uk/browse/visas-immigration',
      requirements: [
        'Valid passport',
        'UK Electronic Travel Authorisation (ETA) — required for US, EU, and many other nationalities',
        'Standard Visitor visa (for nationalities not eligible for ETA)',
        'Proof of funds and accommodation (visa applicants)',
        'Return/onward ticket',
      ],
      guideMarkdown: `# UK Visa Requirements Guide\n\n## The big change: ETA\nThe UK now requires an **Electronic Travel Authorisation (ETA)** for visitors who do not need a visa — including US citizens (since January 2025) and EU citizens (since April 2025). Apply via the official UK ETA app or GOV.UK **before** you book non-refundable travel. It is quick and cheap, but do not leave it to the last day — and avoid copycat websites charging multiples of the real fee.\n\n## Who needs what\n- **ETA nationalities** (US, EU/EEA, and others): ETA only, for tourism, business visits, and short study up to 6 months\n- **Visa-required nationalities**: Apply for a Standard Visitor visa online, then attend a biometrics appointment at a visa application centre\n- **EU citizens**: Post-Brexit, EU passports no longer grant automatic entry — ETA is required\n\n## Standard Visitor Visa\n1. Apply online at GOV.UK and pay the fee\n2. Book and attend a biometrics appointment (fingerprints and photo)\n3. Submit supporting documents: bank statements, employment letter, accommodation details, travel itinerary\n4. Typical processing: around 3 weeks from biometrics (priority services available in many countries)\n5. The vignette goes in your passport; the UK is moving to eVisas, so check how your status is recorded\n\n## General Requirements\n- Passport valid for your entire stay\n- Proof you will leave the UK (return ticket, ties to home country)\n- Proof of funds for the trip\n- Details of where you will stay\n\n## Important Notes\n- An ETA or visa does not guarantee entry — border officers make the final decision\n- Do not book non-refundable travel before your ETA or visa is approved\n- Overstaying kills future applications; the UK takes immigration history seriously\n- If refused, address the specific refusal reasons before reapplying\n\n**Note**: Immigration rules change. Always verify current requirements on GOV.UK before traveling.`,
    },
    embassies: [
      {
        city: 'London',
        address: 'HMPO passport offices and UKVI centres — verify current locations on GOV.UK before visiting',
      },
      {
        city: 'Regional',
        address: 'Passport offices also operate in Glasgow, Liverpool, Durham, Belfast, Newport, and Peterborough — check GOV.UK for services at each',
      },
    ],
    updates: [
      {
        id: '7',
        date: '2026-09-28',
        title: 'UK ETA now required for US and EU visitors',
        summary: 'Travelers who do not need a UK visa — including US and EU citizens — must now hold an Electronic Travel Authorisation before travel. Apply on the official UK ETA app or GOV.UK and avoid copycat sites.',
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
      guideMarkdown: `# Canada Passport Application Guide\n\n## Overview\nCanadian passports are issued by Immigration, Refugees and Citizenship Canada (IRCC), applied for through Service Canada. Adults choose a 5-year or 10-year validity. First-time applicants need a guarantor; renewals for eligible adults can be done by mail.\n\n## Application Methods\n1. **In person at Service Canada**: Required for first-time adult applications\n2. **By mail**: Available for renewals meeting eligibility criteria\n3. **Online renewal**: Simplified renewal for eligible adults with a recent prior passport\n4. **Urgent service**: Available for proven urgent travel (additional fees, limited)\n\n## Required Documents\n- Completed application form (signed)\n- Proof of Canadian citizenship (birth certificate or citizenship certificate)\n- Two identical passport photos meeting IRCC specifications\n- Valid photo ID\n- A guarantor who meets the requirements (first-time applications)\n- Your most recent passport (for renewals)\n\n## Processing Times\n- **In person**: Around 10 business days plus mailing time\n- **By mail**: Around 20 business days plus mailing time\n- **Urgent**: Next-day or 24-48 hour service where available, with proof of travel\n\n## Important Notes\n- Guarantor rules are specific — read them before asking someone; a rejected guarantor delays everything\n- The 10-year passport costs more upfront but is cheaper per year for frequent travelers\n- Many countries require 6 months passport validity — renew early if you travel often\n- Dual Canadian citizens must travel on a Canadian passport to enter Canada by air\n\n**Note**: Fees and processing times change. Confirm current details on canada.ca before applying.`,
    },
    visa: {
      officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
      requirements: [
        'Valid passport',
        'eTA (Electronic Travel Authorization) — required for visa-exempt air travelers',
        'Visitor visa (TRV) — for nationalities not visa-exempt',
        'Proof of funds and ties to home country (visa applicants)',
        'US citizens: valid US passport (no eTA or visa needed)',
      ],
      guideMarkdown: `# Canada Visa Requirements Guide\n\n## Three doors: pick the right one\n- **US citizens**: Just bring a valid US passport. No eTA, no visa. (US permanent residents need an eTA.)\n- **Visa-exempt nationalities** (UK, EU, Australia, Japan, and others): You need an **eTA** for air travel to Canada. It costs a few dollars, applied online in minutes, and is usually approved quickly — but apply before booking non-refundable travel.\n- **Everyone else**: You need a **visitor visa (Temporary Resident Visa)**. Apply online well in advance; processing varies widely by country, from weeks to months.\n\n## eTA Details\n- Apply on the official IRCC website only — copycat sites overcharge\n- Linked electronically to your passport; valid up to 5 years or until the passport expires\n- Required for air arrivals; not required if entering by land or sea\n- Dual Canadian citizens cannot get an eTA — you must travel on a Canadian passport\n\n## Visitor Visa (TRV)\n1. Apply online via IRCC and pay the fee\n2. Give biometrics (fingerprints and photo) at a Visa Application Centre\n3. Submit supporting documents: bank statements, employment letter, travel history, invitation letter if visiting family, detailed itinerary\n4. Processing: highly variable — check IRCC's current processing times for your country and apply months ahead\n5. If approved, the counterfoil goes in your passport\n\n## General Requirements\n- Passport valid beyond your intended stay\n- Proof of funds for the trip\n- Ties to your home country (job, property, family) — officers want to see you will leave\n- A clear purpose and itinerary for the visit\n\n## Important Notes\n- Never book non-refundable travel before a visa decision\n- A prior refusal (from Canada or the US) must be disclosed — hiding it is far worse than the refusal itself\n- Overstaying or working on a visitor visa can trigger multi-year bans\n\n**Note**: Immigration rules and processing times change. Always verify on canada.ca before making travel plans.`,
    },
    embassies: [
      {
        city: 'Ottawa',
        address: 'IRCC and Service Canada locations — verify current offices on canada.ca before visiting',
      },
      {
        city: 'Nationwide',
        address: 'Service Canada Centres in major cities handle passport applications — check canada.ca for the nearest location and hours',
      },
    ],
    updates: [
      {
        id: '8',
        date: '2026-09-28',
        title: 'Check IRCC processing times before applying',
        summary: 'Canadian visitor visa processing times vary widely by country and season. Check the current published times on canada.ca and apply months before your planned travel.',
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
