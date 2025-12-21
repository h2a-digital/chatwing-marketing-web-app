import type { EVT } from './analytics.constants';

export interface InitParams {
  apiKey: string;
  host: string; // e.g. https://eu.posthog.com
}

export interface AnalyticsServicePort {
  init(params: InitParams): void;
  identify(distinctId: string, properties?: Record<string, unknown>): void;
  capture(event: string, properties?: Record<string, unknown>): void;
  register(properties: Record<string, unknown>, days?: number): void;
  screen(name: string, properties?: Record<string, unknown>): void;
  group(type: string, key: string, properties?: Record<string, unknown>): void;
  shutdown(): void;
  reset(): void;
}

export type AnalyticsEvent = (typeof EVT)[keyof typeof EVT];
