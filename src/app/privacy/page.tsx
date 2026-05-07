import { redirect } from 'next/navigation'

// Redirect /privacy to /privacy-policy for backward compatibility
export default function PrivacyRedirect() {
  redirect('/privacy-policy')
}