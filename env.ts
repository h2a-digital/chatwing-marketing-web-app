const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatwing.h2adigital.com';

// PostHog configuration: reads EXPO_PUBLIC_POSTHOG_* or NEXT_PUBLIC_POSTHOG_* variables
const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''; // set your key via env vars

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'; // default host

// SMTP configuration
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = process.env.SMTP_PORT || '';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const CONTACT_FROM = process.env.CONTACT_FROM || '';
const CONTACT_TO = process.env.CONTACT_TO || '';

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || '';

export const env = {
  SITE_URL,

  // PostHog credentials
  POSTHOG_API_KEY,
  POSTHOG_HOST,

  //SMTP credentials
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_FROM,
  CONTACT_TO,

  // Supabase credentials
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
} as const;
