/**
 * Flight utilities for fetching real-time flight prices from Travelpayouts API
 * Requires TRAVELPAYOUTS_TOKEN environment variable
 */

/**
 * Fetch cheapest flight deals from Travelpayouts API
 * @param destinationCode - IATA airport code (e.g., 'LOS' for Lagos)
 * @param originCode - Optional origin IATA code (defaults to popular hubs if not provided)
 * @returns Flight deals data or null if error
 */
export async function fetchCheapestDeals(destinationCode: string, originCode?: string) {
  try {
    const apiToken = process.env.TRAVELPAYOUTS_TOKEN || process.env.TRAVELPAYOUTS_API_TOKEN;

    if (!apiToken) {
      console.error('TRAVELPAYOUTS_TOKEN not configured');
      return null;
    }

    // Use popular origin hubs if not specified (NYC, LAX, LON, etc.)
    const origin = originCode || 'NYC'; // Default to New York as a common origin
    
    // Calculate beginning_of_period (next month)
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const beginningOfPeriod = nextMonth.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Travelpayouts API endpoint for latest prices
    // Documentation: https://travelpayouts.github.io/slate/
    const params = new URLSearchParams({
      currency: 'usd',
      origin: origin,
      destination: destinationCode.toUpperCase(),
      beginning_of_period: beginningOfPeriod,
      period_type: 'month',
      one_way: 'false',
      sorting: 'price',
      trip_class: '0',
      limit: '10',
      page: '1',
    });

    const apiUrl = `https://api.travelpayouts.com/v2/prices/latest?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Access-Token': apiToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`Travelpayouts API error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();

    // Extract cheapest deal from response
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      // Sort by price and get cheapest
      const cheapest = data.data.sort((a: any, b: any) => {
        const priceA = typeof a.value === 'number' ? a.value : parseFloat(a.value) || Infinity;
        const priceB = typeof b.value === 'number' ? b.value : parseFloat(b.value) || Infinity;
        return priceA - priceB;
      })[0];

      return {
        price: Math.round(cheapest.value || 0),
        currency: cheapest.currency || 'USD',
        airline: cheapest.airline || 'Multiple Airlines',
        destination: cheapest.destination || destinationCode.toUpperCase(),
        origin: cheapest.origin || origin,
        departure_at: cheapest.departure_at,
        return_at: cheapest.return_at,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching flight deals:', error);
    return null;
  }
}
