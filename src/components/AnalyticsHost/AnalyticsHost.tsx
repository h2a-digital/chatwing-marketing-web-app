'use client';

import { useEffect } from 'react';
import { Analytics } from '@/utils/analytics';
import { env } from '../../../env';

export function AnalyticsHost() {
  useEffect(() => {
    // Initialize analytics on client-side
    if (typeof window !== 'undefined' && env.POSTHOG_API_KEY) {
      Analytics.instance.init({
        apiKey: env.POSTHOG_API_KEY,
        host: env.POSTHOG_HOST,
      });
    }
  }, []);

  return null;
}
