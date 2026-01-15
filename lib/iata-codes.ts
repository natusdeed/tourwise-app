/**
 * IATA Airport Code Mapping Utility
 * 
 * Maps city names to IATA airport codes for flight search functionality.
 * Supports both origin and destination city lookups.
 */

/**
 * Comprehensive mapping of city names to IATA codes
 * Includes common variations and major cities worldwide
 */
export const CITY_TO_IATA: Record<string, string> = {
  // Major US Cities
  'houston': 'HOU',
  'new york': 'NYC',
  'new york city': 'NYC',
  'nyc': 'NYC',
  'los angeles': 'LAX',
  'lax': 'LAX',
  'chicago': 'ORD',
  'miami': 'MIA',
  'san francisco': 'SFO',
  'seattle': 'SEA',
  'boston': 'BOS',
  'atlanta': 'ATL',
  'dallas': 'DFW',
  'denver': 'DEN',
  'philadelphia': 'PHL',
  'phoenix': 'PHX',
  'las vegas': 'LAS',
  'washington': 'DCA',
  'washington dc': 'DCA',
  'dc': 'DCA',
  
  // African Cities
  'lagos': 'LOS',
  'nairobi': 'NBO',
  'cape town': 'CPT',
  'johannesburg': 'JNB',
  'cairo': 'CAI',
  'casablanca': 'CMN',
  'accra': 'ACC',
  'abuja': 'ABV',
  'dakar': 'DSS',
  'addis ababa': 'ADD',
  'dar es salaam': 'DAR',
  'kinshasa': 'FIH',
  
  // European Cities
  'london': 'LON',
  'paris': 'PAR',
  'rome': 'ROM',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'amsterdam': 'AMS',
  'berlin': 'BER',
  'munich': 'MUC',
  'frankfurt': 'FRA',
  'vienna': 'VIE',
  'zurich': 'ZRH',
  'milan': 'MIL',
  'athens': 'ATH',
  'dublin': 'DUB',
  'lisbon': 'LIS',
  'stockholm': 'ARN',
  'copenhagen': 'CPH',
  'oslo': 'OSL',
  'brussels': 'BRU',
  'warsaw': 'WAW',
  'prague': 'PRG',
  'budapest': 'BUD',
  'istanbul': 'IST',
  
  // Asian Cities
  'tokyo': 'TYO',
  'singapore': 'SIN',
  'bangkok': 'BKK',
  'hong kong': 'HKG',
  'seoul': 'ICN',
  'beijing': 'PEK',
  'shanghai': 'PVG',
  'mumbai': 'BOM',
  'delhi': 'DEL',
  'bangalore': 'BLR',
  'chennai': 'MAA',
  'kolkata': 'CCU',
  'hyderabad': 'HYD',
  'dubai': 'DXB',
  'abu dhabi': 'AUH',
  'doha': 'DOH',
  'kuala lumpur': 'KUL',
  'jakarta': 'CGK',
  'manila': 'MNL',
  'ho chi minh city': 'SGN',
  'hanoi': 'HAN',
  'taipei': 'TPE',
  'osaka': 'OSA',
  
  // Australian/Oceania Cities
  'sydney': 'SYD',
  'melbourne': 'MEL',
  'brisbane': 'BNE',
  'perth': 'PER',
  'auckland': 'AKL',
  'wellington': 'WLG',
  
  // South American Cities
  'sao paulo': 'SAO',
  'rio de janeiro': 'RIO',
  'buenos aires': 'BUE',
  'lima': 'LIM',
  'bogota': 'BOG',
  'santiago': 'SCL',
  'caracas': 'CCS',
  
  // Middle Eastern Cities
  'riyadh': 'RUH',
  'jeddah': 'JED',
  'kuwait': 'KWI',
  'beirut': 'BEY',
  'tel aviv': 'TLV',
  'jerusalem': 'JRS',
  
  // Canadian Cities
  'toronto': 'YYZ',
  'vancouver': 'YVR',
  'montreal': 'YUL',
  'calgary': 'YYC',
};

/**
 * Extract IATA code from a city name or query string
 * @param cityName - City name or query string containing city name
 * @returns IATA code if found, null otherwise
 */
export function getIATACode(cityName: string): string | null {
  if (!cityName || typeof cityName !== 'string') {
    return null;
  }

  const normalized = cityName.toLowerCase().trim();
  
  // Direct lookup
  if (CITY_TO_IATA[normalized]) {
    return CITY_TO_IATA[normalized];
  }

  // Try to find city name in the string
  for (const [city, code] of Object.entries(CITY_TO_IATA)) {
    if (normalized.includes(city) || city.includes(normalized)) {
      return code;
    }
  }

  // Check if it's already a 3-letter uppercase code
  const codeMatch = normalized.match(/\b[a-z]{3}\b/i);
  if (codeMatch && codeMatch[0].length === 3) {
    return codeMatch[0].toUpperCase();
  }

  return null;
}

/**
 * Extract origin and destination IATA codes from a search query
 * Attempts to identify both cities mentioned in the query
 * @param query - Search query string
 * @returns Object with origin and destination codes, or null if not found
 */
export function extractOriginAndDestination(query: string): {
  origin: string | null;
  destination: string | null;
} {
  if (!query || typeof query !== 'string') {
    return { origin: null, destination: null };
  }

  const queryLower = query.toLowerCase();
  const found: { origin: string | null; destination: string | null } = {
    origin: null,
    destination: null,
  };

  // Common patterns: "from X to Y", "X to Y", "X - Y", "X -> Y"
  const patterns = [
    /from\s+([^,\s]+(?:\s+[^,\s]+)?)\s+to\s+([^,\s]+(?:\s+[^,\s]+)?)/i,
    /([^,\s]+(?:\s+[^,\s]+)?)\s+to\s+([^,\s]+(?:\s+[^,\s]+)?)/i,
    /([^,\s]+(?:\s+[^,\s]+)?)\s*[-–—]\s*([^,\s]+(?:\s+[^,\s]+)?)/i,
    /([^,\s]+(?:\s+[^,\s]+)?)\s*->\s*([^,\s]+(?:\s+[^,\s]+)?)/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1] && match[2]) {
      found.origin = getIATACode(match[1].trim());
      found.destination = getIATACode(match[2].trim());
      if (found.origin && found.destination) {
        return found;
      }
    }
  }

  // If no pattern match, try to find two cities in the query
  const cities: string[] = [];
  for (const [city, code] of Object.entries(CITY_TO_IATA)) {
    if (queryLower.includes(city)) {
      cities.push(code);
    }
  }

  // If we found exactly two cities, use them
  if (cities.length === 2) {
    // Try to determine which is origin and which is destination based on word order
    const firstCity = cities[0];
    const secondCity = cities[1];
    
    // Check if query mentions "from" before first city
    const fromIndex = queryLower.indexOf('from');
    const firstCityIndex = queryLower.indexOf(CITY_TO_IATA[Object.keys(CITY_TO_IATA).find(k => CITY_TO_IATA[k] === firstCity)!] || '');
    
    if (fromIndex !== -1 && fromIndex < firstCityIndex) {
      found.origin = firstCity;
      found.destination = secondCity;
    } else {
      // Default: first mentioned is origin, second is destination
      found.origin = firstCity;
      found.destination = secondCity;
    }
    
    return found;
  }

  // If only one city found, assume it's the destination
  if (cities.length === 1) {
    found.destination = cities[0];
  }

  return found;
}

/**
 * Check if a city name is recognized
 * @param cityName - City name to check
 * @returns true if city is recognized, false otherwise
 */
export function isCityRecognized(cityName: string): boolean {
  return getIATACode(cityName) !== null;
}
