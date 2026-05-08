/**
 * Server-only environment helpers.
 * Keeps secret access centralized so API routes stay clean and future-safe.
 */

type ServerEnv = {
  travelpayoutsToken?: string
}

export function getServerEnv(): ServerEnv {
  return {
    travelpayoutsToken: process.env.TRAVELPAYOUTS_TOKEN || process.env.TRAVELPAYOUTS_API_TOKEN,
  }
}
