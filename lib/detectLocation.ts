/**
 * Location Detection Utility
 * Uses IPinfo.io API to detect user's location and language preferences
 * Caches results in localStorage for 24 hours to minimize API calls
 */

export interface LocationData {
  city: string
  region: string
  country: string
  countryCode: string
  language: string
  timestamp: number
}

const STORAGE_KEY = 'tourwise_location_data'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

/**
 * Country to language mapping
 * Maps country codes to language codes
 */
const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  NG: 'en', // Nigeria -> English
  MX: 'es', // Mexico -> Spanish
  // Add more mappings as needed
}

/**
 * Get cached location data from localStorage
 */
function getCachedLocation(): LocationData | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (!cached) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[IPinfo] No cached location found')
      }
      return null
    }

    const data: LocationData = JSON.parse(cached)
    const now = Date.now()
    const age = now - data.timestamp
    const ageHours = Math.floor(age / (1000 * 60 * 60))

    // Check if cache is still valid (within 24 hours)
    if (age < CACHE_DURATION) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[IPinfo] Using cached location (${ageHours}h old):`, {
          city: data.city,
          country: data.country,
        })
      }
      return data
    }

    // Cache expired, remove it
    localStorage.removeItem(STORAGE_KEY)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[IPinfo] Cache expired (${ageHours}h old), fetching new location...`)
    }
    return null
  } catch (error) {
    console.error('[IPinfo] Error reading cached location:', error)
    return null
  }
}

/**
 * Save location data to localStorage
 */
function saveCachedLocation(data: LocationData): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving location to cache:', error)
  }
}

/**
 * Detect user's location using IPinfo.io API
 * Returns cached data if available and valid, otherwise fetches new data
 */
export async function detectLocation(): Promise<LocationData | null> {
  // Only run on client side
  if (typeof window === 'undefined') {
    return null
  }

  // Check cache first
  const cached = getCachedLocation()
  if (cached) {
    return cached
  }

  // Get token from environment
  // NEXT_PUBLIC_ variables are available in client-side code
  const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN

  // Validate token
  if (!token || token === 'your_ipinfo_token_here' || token.trim() === '') {
    // Log in development to help with debugging
    if (process.env.NODE_ENV === 'development') {
      console.warn('[IPinfo] Token not configured. Set NEXT_PUBLIC_IPINFO_TOKEN in .env.local')
    }
    return null
  }

  // Log successful token detection in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[IPinfo] Token detected, attempting location detection...')
  }

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

  try {
    // Additional safety check - ensure token is valid before making request
    if (!token || token.length < 10) {
      return null
    }

    // Wrap fetch in Promise.resolve to catch any synchronous errors
    const response = await Promise.resolve(
      fetch(
        `https://ipinfo.io/json?token=${encodeURIComponent(token)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal,
          // Add mode to handle CORS properly
          mode: 'cors',
          credentials: 'omit',
        }
      )
    ).catch(() => null)

    // If fetch failed, response will be null
    if (!response) {
      return null
    }

    clearTimeout(timeoutId)

    if (!response.ok) {
      // Don't throw, just return null for non-200 responses
      console.warn(`IPinfo API returned ${response.status}: ${response.statusText}`)
      return null
    }

    const data = await response.json()

    // Validate response data
    if (!data || typeof data !== 'object') {
      console.warn('Invalid response from IPinfo API')
      return null
    }

    // Extract location information
    const city = data.city || ''
    const region = data.region || ''
    const country = data.country_name || data.country || ''
    const countryCode = data.country || ''

    // If no city data, don't cache invalid data
    if (!city) {
      return null
    }

    // Determine language based on country mapping
    // Default to 'en' if no mapping exists
    const language = COUNTRY_LANGUAGE_MAP[countryCode] || 'en'

    const locationData: LocationData = {
      city,
      region,
      country,
      countryCode,
      language,
      timestamp: Date.now(),
    }

    // Cache the result
    saveCachedLocation(locationData)

    // Log success in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[IPinfo] Location detected successfully:', {
        city: locationData.city,
        country: locationData.country,
        language: locationData.language,
      })
    }

    return locationData
  } catch (error) {
    clearTimeout(timeoutId)
    
    // Handle different error types silently - never throw
    try {
      if (error instanceof Error) {
        // AbortError is expected for timeouts
        if (error.name === 'AbortError') {
          // Silent timeout - expected behavior
          return null
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          // Network errors - silently fail
          return null
        } else if (error.message.includes('TypeError')) {
          // Type errors from fetch - silently fail
          return null
        }
      }
    } catch (nestedError) {
      // Even error handling can fail - ensure we always return null
      return null
    }
    
    // Always return null on error to prevent unhandled exceptions
    return null
  }
}

/**
 * Get user's detected city (from cache or API)
 * Returns null if detection fails
 * Never throws - always returns null on error
 */
export async function getDetectedCity(): Promise<string | null> {
  try {
    const location = await detectLocation().catch(() => null)
    return location?.city || null
  } catch (error) {
    // Safety net - ensure we never throw
    return null
  }
}

/**
 * Get user's detected language (from cache or API)
 * Returns 'en' as default if detection fails
 */
export async function getDetectedLanguage(): Promise<string> {
  const location = await detectLocation()
  return location?.language || 'en'
}

/**
 * Clear cached location data
 * Useful for testing or forcing a fresh detection
 */
export function clearLocationCache(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  if (process.env.NODE_ENV === 'development') {
    console.log('[IPinfo] Location cache cleared')
  }
}

/**
 * Verify IPinfo configuration
 * Returns true if token is configured, false otherwise
 * Useful for debugging
 */
export function verifyIPinfoConfig(): boolean {
  const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN
  const isConfigured = token && token !== 'your_ipinfo_token_here' && token.trim().length >= 10
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[IPinfo] Configuration check:', {
      hasToken: !!token,
      isValid: isConfigured,
      tokenLength: token?.length || 0,
    })
  }
  
  return isConfigured
}
