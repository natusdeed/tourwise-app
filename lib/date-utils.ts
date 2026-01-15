/**
 * Date Validation and Formatting Utility
 * 
 * Handles date validation and formatting for flight search URLs.
 * Prevents invalid dates (e.g., Feb 30) and defaults to next Friday if needed.
 */

/**
 * Get the next available Friday from today
 * @returns Date object for the next Friday
 */
export function getNextFriday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 5 = Friday
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7; // If today is Friday, get next Friday
  
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  nextFriday.setHours(0, 0, 0, 0); // Reset time to midnight
  
  return nextFriday;
}

/**
 * Format date as YYYY-MM-DD for Aviasales API
 * @param date - Date object to format
 * @returns Formatted date string (YYYY-MM-DD)
 */
export function formatDateForAviasales(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Validate if a date is valid (e.g., not Feb 30)
 * @param year - Year
 * @param month - Month (1-12)
 * @param day - Day
 * @returns true if date is valid, false otherwise
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  // Create a date object and check if it matches the input
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Get the last valid day of a given month and year
 * @param year - Year
 * @param month - Month (1-12)
 * @returns Last valid day of the month (28-31)
 */
export function getLastDayOfMonth(year: number, month: number): number {
  // Create a date for the first day of next month, then subtract one day
  const nextMonth = new Date(year, month, 0);
  return nextMonth.getDate();
}

/**
 * Correct an invalid date to the last valid day of that month
 * Safety rule: If date doesn't exist (like Feb 30), automatically change it
 * to the last real day of that month so the flight search doesn't crash.
 * @param year - Year
 * @param month - Month (1-12)
 * @param day - Day (may be invalid)
 * @returns Object with corrected year, month, and day
 */
export function correctInvalidDate(year: number, month: number, day: number): { year: number; month: number; day: number } {
  // Normalize month to valid range
  if (month < 1) month = 1;
  if (month > 12) month = 12;
  
  // Normalize year to reasonable range (current year to 10 years in future)
  const currentYear = new Date().getFullYear();
  if (year < currentYear) year = currentYear;
  if (year > currentYear + 10) year = currentYear + 10;
  
  // Get the last valid day of the month
  const lastDay = getLastDayOfMonth(year, month);
  
  // If the day is invalid (greater than last day or less than 1), correct it
  if (day < 1) {
    day = 1;
  } else if (day > lastDay) {
    day = lastDay;
  }
  
  return { year, month, day };
}

/**
 * Parse date from various formats in a query string
 * Attempts to extract date from natural language or formatted strings
 * @param query - Search query that may contain date information
 * @returns Date object if valid date found, null otherwise
 */
export function extractDateFromQuery(query: string): Date | null {
  if (!query || typeof query !== 'string') {
    return null;
  }

  const queryLower = query.toLowerCase();
  
  // Try to match common date patterns
  // Format: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY, "Feb 20, 2026", "February 20, 2026"
  const patterns = [
    // ISO format: 2026-02-20
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    // US format: 02/20/2026 or 2/20/2026
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    // European format: 20/02/2026 or 20/2/2026
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    // Month name: "Feb 20, 2026" or "February 20, 2026"
    /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2}),?\s+(\d{4})/i,
  ];

  const monthNames: Record<string, number> = {
    'january': 1, 'jan': 1,
    'february': 2, 'feb': 2,
    'march': 3, 'mar': 3,
    'april': 4, 'apr': 4,
    'may': 5,
    'june': 6, 'jun': 6,
    'july': 7, 'jul': 7,
    'august': 8, 'aug': 8,
    'september': 9, 'sep': 9,
    'october': 10, 'oct': 10,
    'november': 11, 'nov': 11,
    'december': 12, 'dec': 12,
  };

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      let year: number;
      let month: number;
      let day: number;

      if (pattern.source.includes('january|february')) {
        // Month name format
        const monthName = match[1].toLowerCase();
        month = monthNames[monthName] || 1;
        day = parseInt(match[2], 10);
        year = parseInt(match[3], 10);
      } else if (pattern.source.includes('\\d{4}') && match[1].length === 4) {
        // ISO format: YYYY-MM-DD
        year = parseInt(match[1], 10);
        month = parseInt(match[2], 10);
        day = parseInt(match[3], 10);
      } else {
        // US/European format: MM/DD/YYYY or DD/MM/YYYY
        // Try US format first (MM/DD/YYYY)
        const first = parseInt(match[1], 10);
        const second = parseInt(match[2], 10);
        const third = parseInt(match[3], 10);
        
        // Heuristic: if first number > 12, it's likely DD/MM/YYYY
        if (first > 12) {
          day = first;
          month = second;
          year = third;
        } else {
          // Assume MM/DD/YYYY
          month = first;
          day = second;
          year = third;
        }
      }

      // Safety Rule: Correct invalid dates automatically
      // If date doesn't exist (like Feb 30), change it to last valid day of that month
      const originalDay = day;
      let correctedDate = { year, month, day };
      
      // Check if date is invalid and correct it
      if (!isValidDate(year, month, day)) {
        correctedDate = correctInvalidDate(year, month, day);
        // Update variables with corrected values
        year = correctedDate.year;
        month = correctedDate.month;
        day = correctedDate.day;
        
        // Log correction in development mode for debugging
        if (process.env.NODE_ENV === 'development' && typeof console !== 'undefined') {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          console.log(`[Date Safety Rule] Corrected invalid date: ${monthNames[month - 1]} ${originalDay}, ${year} → ${monthNames[month - 1]} ${day}, ${year}`);
        }
      }
      
      // Validate that the corrected date is valid (should always pass after correction)
      if (isValidDate(year, month, day)) {
        const date = new Date(year, month - 1, day);
        // Ensure date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // If the corrected date is in the past, adjust to next occurrence of that month/day
        if (date < today) {
          // Move to next year if needed
          const nextYear = today.getFullYear() + 1;
          const adjustedDate = new Date(nextYear, month - 1, day);
          
          // Make sure adjusted date is valid (handles leap years, etc.)
          const finalCorrected = correctInvalidDate(nextYear, month, day);
          return new Date(finalCorrected.year, finalCorrected.month - 1, finalCorrected.day);
        }
        
        return date;
      }
    }
  }

  return null;
}

/**
 * Extract and validate date from query with auto-correction
 * Returns the extracted/corrected date and whether it was corrected
 * @param query - Search query that may contain date information
 * @returns Object with date and correction info
 */
export function extractAndValidateDate(query: string): { date: Date | null; wasCorrected: boolean; originalDay?: number; correctedDay?: number } {
  if (!query || typeof query !== 'string') {
    return { date: null, wasCorrected: false };
  }

  const queryLower = query.toLowerCase();
  
  // Try to match common date patterns
  const patterns = [
    /(\d{4})-(\d{1,2})-(\d{1,2})/,
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2}),?\s+(\d{4})/i,
  ];

  const monthNames: Record<string, number> = {
    'january': 1, 'jan': 1, 'february': 2, 'feb': 2,
    'march': 3, 'mar': 3, 'april': 4, 'apr': 4,
    'may': 5, 'june': 6, 'jun': 6, 'july': 7, 'jul': 7,
    'august': 8, 'aug': 8, 'september': 9, 'sep': 9,
    'october': 10, 'oct': 10, 'november': 11, 'nov': 11,
    'december': 12, 'dec': 12,
  };

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      let year: number;
      let month: number;
      let day: number;

      if (pattern.source.includes('january|february')) {
        const monthName = match[1].toLowerCase();
        month = monthNames[monthName] || 1;
        day = parseInt(match[2], 10);
        year = parseInt(match[3], 10);
      } else if (pattern.source.includes('\\d{4}') && match[1].length === 4) {
        year = parseInt(match[1], 10);
        month = parseInt(match[2], 10);
        day = parseInt(match[3], 10);
      } else {
        const first = parseInt(match[1], 10);
        const second = parseInt(match[2], 10);
        const third = parseInt(match[3], 10);
        
        if (first > 12) {
          day = first;
          month = second;
          year = third;
        } else {
          month = first;
          day = second;
          year = third;
        }
      }

      const originalDay = day;
      let wasCorrected = false;

      // Safety Rule: Correct invalid dates
      if (!isValidDate(year, month, day)) {
        const corrected = correctInvalidDate(year, month, day);
        year = corrected.year;
        month = corrected.month;
        day = corrected.day;
        wasCorrected = true;
      }

      if (isValidDate(year, month, day)) {
        const date = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (date < today) {
          const nextYear = today.getFullYear() + 1;
          const finalCorrected = correctInvalidDate(nextYear, month, day);
          return {
            date: new Date(finalCorrected.year, finalCorrected.month - 1, finalCorrected.day),
            wasCorrected: wasCorrected || (originalDay !== finalCorrected.day),
            originalDay,
            correctedDay: finalCorrected.day
          };
        }
        
        return {
          date,
          wasCorrected,
          originalDay: wasCorrected ? originalDay : undefined,
          correctedDay: wasCorrected ? day : undefined
        };
      }
    }
  }

  return { date: null, wasCorrected: false };
}

/**
 * Get a valid departure date from query or default to next Friday
 * @param query - Search query that may contain date information
 * @returns Valid Date object (either from query or next Friday)
 */
export function getValidDepartureDate(query?: string): Date {
  if (query) {
    const { date } = extractAndValidateDate(query);
    if (date) {
      return date;
    }
  }

  // Default to next Friday
  return getNextFriday();
}
