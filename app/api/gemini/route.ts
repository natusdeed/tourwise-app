/**
 * Gemini API Route
 * 
 * Server-side API for Google Gemini AI travel itinerary generation
 * Keeps API key secure on the server
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchCheapestDeals } from '../flights/route';
import { extractOriginAndDestination, getIATACode } from '@/lib/iata-codes';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { query, flightData, originCode, destinationCode } = body;

    // Validate input
    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('Gemini API key is not configured. Check NEXT_PUBLIC_GEMINI_API_KEY or GEMINI_API_KEY in .env.local');
      return NextResponse.json(
        { error: 'AI service is not configured. Please check server settings.' },
        { status: 500 }
      );
    }

    // Log API key status (without exposing the key)
    console.log('Gemini API key found:', apiKey ? `Present (${apiKey.length} chars)` : 'Missing');

    // Create the prompt for travel itinerary with system instruction
    let systemInstruction = `You are the Senior AI Travel Concierge for TourWise AI. Your goal is to provide world-class, luxury-level travel itineraries that make the user want to book immediately.

Tone: Professional, exciting, and highly organized. Use travel-related emojis (✈️, 🏨, 🌍) to make the text scannable.

CRITICAL INSTRUCTION: If the user asks about "cheap", "deals", "prices", "cost", "affordable", "budget", or "best price", you MUST call the searchFlightPrices function to get REAL-TIME market data before answering. Never guess prices - always use live data when available.

If searchFlightPrices returns success: false or no data is found, you MUST say: "I couldn't find a live price, but here is the typical cost for this route." Then provide general pricing guidance based on typical market rates.

Structure:

Exciting Intro: Acknowledge their destination with a "wow" fact.`;

    // Add real-time flight data to prompt if available
    if (flightData && flightData.price) {
      systemInstruction += `\n\nIMPORTANT: You have access to REAL-TIME flight pricing data. You MUST mention the exact price and airline found:
- Price: $${flightData.price} ${flightData.currency || 'USD'}
- Airline: ${flightData.airline || 'Multiple Airlines'}
- Route: ${flightData.origin || 'Various'} → ${flightData.destination || 'Destination'}

Start your response with: "🎉 I found a live deal for $${flightData.price}! ${flightData.airline || 'Multiple airlines'} are offering flights to your destination right now. This is a real-time price that may change, so act fast!"`;
    }

    systemInstruction += `

Daily Breakdown: Provide a 3-day plan. For each day, suggest:
- Morning: Sightseeing/Activity.
- Afternoon: A local food spot or culture.
- Evening: A high-end or unique accommodation suggestion.

The 'Money' Tip: ${flightData && flightData.price ? `Mention the live flight deal you found ($${flightData.price} on ${flightData.airline || 'multiple airlines'}).` : 'If you found live pricing data, mention it. Otherwise, suggest a specific flight or hotel search they should do right now to lock in a price.'}

Call to Action: Tell them: 'Scroll down to the Travel Toolkit below to book these specific flights and hotels through our partners!'

Format your response using markdown with headers, bold text, bullet points, and emojis for visual appeal.`;

    const userQuery = query.trim();

    // Define the searchFlightPrices function tool for Gemini
    const searchFlightPricesTool = {
      functionDeclarations: [
        {
          name: 'searchFlightPrices',
          description: 'Searches for real-time flight prices from Travelpayouts API. Use this when users ask about cheap flights, deals, prices, or costs. Returns the cheapest available flight price for a given route.',
          parameters: {
            type: 'object',
            properties: {
              originCode: {
                type: 'string',
                description: 'IATA airport code for origin city (e.g., "HOU" for Houston, "NYC" for New York). If not provided, defaults to popular hubs.',
              },
              destinationCode: {
                type: 'string',
                description: 'IATA airport code for destination city (e.g., "LOS" for Lagos, "TYO" for Tokyo). Required.',
              },
            },
            required: ['destinationCode'],
          },
        },
      ],
    };

    // Call Google Gemini API
    // Using stable Gemini 2.5 Flash model with v1beta API endpoint for tools support
    // Note: v1beta is required for function calling/tools support in 2026
    // Model: gemini-2.5-flash (verified for reliable tool use)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      // Build request body with function calling support
      // Check if query mentions price/deals to enable function calling
      const queryLower = userQuery.toLowerCase();
      const shouldUseTools = queryLower.includes('cheap') || 
                            queryLower.includes('deal') || 
                            queryLower.includes('price') || 
                            queryLower.includes('cost') || 
                            queryLower.includes('affordable') || 
                            queryLower.includes('budget') ||
                            queryLower.includes('best price');

      const requestBody: any = {
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction}\n\nUser Query: ${userQuery}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      };

      // Add tools if user is asking about prices/deals
      if (shouldUseTools) {
        requestBody.tools = [searchFlightPricesTool];
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Gemini API error (${apiUrl}):`, response.status, JSON.stringify(errorData, null, 2));
        
        // Provide specific error messages based on status code
        let errorMessage = 'The AI concierge is currently busy. Please try again in 30 seconds.';
        
        if (response.status === 429) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (response.status === 401 || response.status === 403) {
          errorMessage = 'AI service authentication failed. Please contact support.';
        } else if (response.status === 400) {
          errorMessage = errorData.error?.message || 'Invalid request. Please check your search query.';
        } else if (response.status >= 500) {
          errorMessage = 'AI service is temporarily unavailable. Please try again in a few moments.';
        }
        
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status }
        );
      }

      const data = await response.json();

      // Extract the generated text from Gemini response
      if (data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0];
        
        // Check if response was blocked by safety filters
        if (candidate.finishReason === 'SAFETY') {
          console.error('Response blocked by safety filters:', data);
          return NextResponse.json(
            { error: 'Your query was blocked by safety filters. Please try rephrasing your request.' },
            { status: 400 }
          );
        }
        
        // Check for other finish reasons that indicate issues
        if (candidate.finishReason === 'RECITATION') {
          console.error('Response blocked due to recitation:', data);
          return NextResponse.json(
            { error: 'Unable to generate response. Please try a different query.' },
            { status: 400 }
          );
        }
        
        if (candidate.finishReason === 'MAX_TOKENS') {
          console.warn('Response truncated due to token limit:', data);
          // Continue with truncated response rather than error
        }

        // Check if Gemini wants to call a function
        if (candidate.content && candidate.content.parts) {
          const functionCallPart = candidate.content.parts.find(
            (part: any) => part.functionCall
          );

          if (functionCallPart && functionCallPart.functionCall) {
            const functionCall = functionCallPart.functionCall;
            
            // Handle searchFlightPrices function call
            if (functionCall.name === 'searchFlightPrices') {
              const args = functionCall.args || {};
              const funcOriginCode = args.originCode || originCode || undefined;
              const funcDestCode = args.destinationCode || destinationCode || undefined;

              // Try to extract codes from query if not provided
              let finalOriginCode = funcOriginCode;
              let finalDestCode = funcDestCode;

              if (!finalDestCode) {
                const extracted = extractOriginAndDestination(userQuery);
                finalOriginCode = extracted.origin || finalOriginCode;
                finalDestCode = extracted.destination || finalDestCode;
              }

              if (!finalDestCode) {
                // If still no destination, return error
                const errorResponse = {
                  success: false,
                  error: 'Could not determine destination. Please specify a city name.',
                };

                // Send error back to Gemini
                const followUpBody = {
                  contents: [
                    {
                      parts: [
                        { text: `${systemInstruction}\n\nUser Query: ${userQuery}` }
                      ]
                    },
                    {
                      parts: [
                        {
                          functionResponse: {
                            name: 'searchFlightPrices',
                            response: errorResponse,
                          }
                        }
                      ]
                    }
                  ],
                  tools: shouldUseTools ? [searchFlightPricesTool] : undefined,
                  generationConfig: requestBody.generationConfig,
                };

                const followUpResponse = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                  },
                  body: JSON.stringify(followUpBody),
                  signal: controller.signal,
                });

                if (followUpResponse.ok) {
                  const followUpData = await followUpResponse.json();
                  if (followUpData.candidates?.[0]?.content?.parts?.[0]?.text) {
                    return NextResponse.json({
                      success: true,
                      itinerary: followUpData.candidates[0].content.parts[0].text,
                      flightData: null,
                    });
                  }
                }
              }

              // Execute the function
              console.log(`Executing searchFlightPrices: origin=${finalOriginCode}, destination=${finalDestCode}`);
              const flightDeal = await fetchCheapestDeals(finalDestCode, finalOriginCode);

              // Prepare function response
              const functionResponse = flightDeal
                ? {
                    success: true,
                    price: flightDeal.price,
                    currency: flightDeal.currency || 'USD',
                    airline: flightDeal.airline || 'Multiple Airlines',
                    origin: flightDeal.origin || finalOriginCode || 'Various',
                    destination: flightDeal.destination || finalDestCode,
                    departure_at: flightDeal.departure_at,
                    return_at: flightDeal.return_at,
                  }
                : {
                    success: false,
                    message: 'No live pricing data found for this route at this time.',
                  };

              // Send function result back to Gemini for final response
              const followUpBody = {
                contents: [
                  {
                    parts: [
                      { text: `${systemInstruction}\n\nUser Query: ${userQuery}` }
                    ]
                  },
                  {
                    parts: [
                      {
                        functionResponse: {
                          name: 'searchFlightPrices',
                          response: functionResponse,
                        }
                      }
                    ]
                  }
                ],
                tools: shouldUseTools ? [searchFlightPricesTool] : undefined,
                generationConfig: requestBody.generationConfig,
              };

              const followUpResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-goog-api-key': apiKey,
                },
                body: JSON.stringify(followUpBody),
                signal: controller.signal,
              });

              if (!followUpResponse.ok) {
                const errorData = await followUpResponse.json().catch(() => ({}));
                console.error('Follow-up Gemini API error:', followUpResponse.status, errorData);
                
                // If we have flight data, return it with a simple message
                if (flightDeal) {
                  return NextResponse.json({
                    success: true,
                    itinerary: `🎉 I found a live deal for $${flightDeal.price}! ${flightDeal.airline || 'Multiple airlines'} are offering flights to your destination right now. This is a real-time price that may change, so act fast!\n\n## Your Travel Itinerary\n\nI've found great flight deals for your trip. Scroll down to the Travel Toolkit below to book these specific flights and hotels through our partners!`,
                    flightData: flightDeal,
                  });
                }
                
                // Fallback: return itinerary without live data
                return NextResponse.json({
                  success: true,
                  itinerary: `I couldn't find a live price, but here is the typical cost for this route. ${systemInstruction.split('Daily Breakdown')[1] || ''}`,
                  flightData: null,
                });
              }

              const followUpData = await followUpResponse.json();
              
              if (followUpData.candidates?.[0]?.content?.parts?.[0]?.text) {
                const finalItinerary = followUpData.candidates[0].content.parts[0].text;
                
                console.log(`Successfully used Gemini 2.5 Flash with function calling`);
                return NextResponse.json({
                  success: true,
                  itinerary: finalItinerary,
                  flightData: flightDeal,
                });
              }
            }
          }

          // Regular text response (no function call)
          const textPart = candidate.content.parts.find(
            (part: any) => part.text
          );
          
          if (textPart && textPart.text) {
            console.log(`Successfully used Gemini 2.5 Flash model`);
            return NextResponse.json({
              success: true,
              itinerary: textPart.text,
              flightData: flightData || null,
            });
          }
        }
      }
      
      // If we get here, the response format was unexpected
      console.error('Unexpected response format from Gemini API:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: 'Received an unexpected response from the AI service. Please try again.' },
        { status: 500 }
      );
    } catch (apiError: any) {
      clearTimeout(timeoutId);
      
      if (apiError.name === 'AbortError') {
        console.error('Request timeout after 30 seconds');
        return NextResponse.json(
          { error: 'Request timed out. The AI service is taking longer than expected. Please try again with a simpler query.' },
          { status: 504 }
        );
      }
      
      console.error('Error calling Gemini API:', apiError);
      
      // Provide more specific error messages
      let errorMessage = 'An error occurred while processing your request. Please try again.';
      
      if (apiError.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (apiError.message?.includes('JSON')) {
        errorMessage = 'Invalid response from AI service. Please try again.';
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in Gemini API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
