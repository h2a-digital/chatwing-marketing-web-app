import posthog from 'posthog-js';
import type { AnalyticsServicePort, InitParams } from './analytics.model';

export default class AnalyticsService implements AnalyticsServicePort {
  private static _instance: AnalyticsService;
  static get instance(): AnalyticsService {
    if (!this._instance) this._instance = new AnalyticsService();
    return this._instance;
  }

  private initialised = false;

  init({ apiKey, host }: InitParams): void {
    if (this.initialised || typeof window === 'undefined') return;

    posthog.init(apiKey, {
      api_host: host ?? 'https://app.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
    });

    const systemProperties = { site: 'wingman-marketing' };

    posthog.register(systemProperties);

    this.initialised = true;
  }

  identify(distinctId: string, properties?: Record<string, unknown>): void {
    posthog.identify(distinctId, properties);
  }

  capture(event: string, properties?: Record<string, unknown>): void {
    posthog.capture(event, properties);
  }

  register(properties: Record<string, unknown>, days?: number): void {
    posthog.register(properties, days);
  }

  // On web, a "screen" maps nicely to a manual $pageview event
  screen(name: string, properties?: Record<string, unknown>): void {
    posthog.capture('$pageview', {
      name,
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...properties,
    });
  }

  // posthog-js supports group analytics
  group(type: string, key: string, properties?: Record<string, unknown>): void {
    posthog.group(type, key, properties);
  }

  // posthog-js exposes shutdown in recent versions; if missing, this is a harmless no-op
  shutdown(): void {
    // @ts-expect-error Optional in some versions; if present, call it
    if (typeof posthog.shutdown === 'function') posthog.shutdown();
  }

  reset(): void {
    posthog.reset();
  }
}
