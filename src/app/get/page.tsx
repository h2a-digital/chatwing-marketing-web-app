'use client';

import { useEffect, useState, useRef } from 'react';
import { AppStoreButtons } from '@/components/ui/AppStoreButtons';
import { site } from '@/content/site';
import Image from 'next/image';

// Detect OS
function getOS(): 'ios' | 'android' | 'other' {
  if (typeof window === 'undefined') return 'other';
  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'other';
}

export default function DownloadPage() {
  const os = getOS();
  const [showFallback, setShowFallback] = useState(false);
  const attemptedRef = useRef(false);

  // Store URLs
  const APP_STORE_URL = site.store.iosUrl; // e.g. https://apps.apple.com/app/xxx
  // const PLAY_STORE_URL = site.store.androidUrl; // e.g. https://play.google.com/store/apps/details?id=xxx

  useEffect(() => {
    if (attemptedRef.current) return;
    attemptedRef.current = true;

    // Auto-redirect based on OS
    if (os === 'ios') {
      window.location.href = APP_STORE_URL;
    }
    // else if (os === 'android') {
    //   window.location.href = PLAY_STORE_URL;
    // }

    // If redirect fails (app store blocked / very slow), show fallback UI
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2000);

    const handleVisibility = () => {
      if (document.hidden) clearTimeout(timer);
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [os, APP_STORE_URL]);

  const isMobile = os !== 'other';

  // --- MOBILE FALLBACK ---
  if (isMobile && showFallback) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-gray-50 to-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-500 shadow-lg">
              <Image
                src={'/images/icon.png'}
                alt={`${site.app.name} logo`}
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-xl">
            <h1 className="mb-3 text-2xl font-bold text-gray-900">Download {site.app.name}</h1>
            <p className="mb-8 text-base text-gray-600">
              Couldn't open the store automatically. Choose your platform below.
            </p>

            <div className="flex justify-center">
              <AppStoreButtons />
            </div>

            {/* Features List */}
            <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg
                    className="h-5 w-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Context-Aware</h3>
                  <p className="text-sm text-gray-600">Replies that fit the moment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg
                    className="h-5 w-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tone Controls</h3>
                  <p className="text-sm text-gray-600">Confident, playful, or flirty</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg
                    className="h-5 w-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Screenshot + Text</h3>
                  <p className="text-sm text-gray-600">Upload or paste instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- DESKTOP VIEW ---
  if (!isMobile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-violet-50 via-white to-indigo-50 px-4 py-24">
        <div className="w-full max-w-3xl">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-500 shadow-lg">
              <Image
                src={'/images/icon.png'}
                alt={`${site.app.name} logo`}
                width={250}
                height={250}
              />
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-12 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Download {site.app.name}
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Get Wingman AI on your mobile device
            </p>

            <div className="mb-8 flex justify-center">
              <AppStoreButtons />
            </div>

            {/* Features List */}
            <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg
                    className="h-5 w-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Context-Aware</h3>
                  <p className="text-sm text-gray-600">Replies that fit the moment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg
                    className="h-5 w-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tone Controls</h3>
                  <p className="text-sm text-gray-600">Confident, playful, or flirty</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <svg
                    className="h-5 w-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Screenshot + Text</h3>
                  <p className="text-sm text-gray-600">Upload or paste instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- MOBILE LOADING STATE (attempting redirect) ---
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-gray-50 to-white">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-500 shadow-lg">
            <svg
              className="h-10 w-10 animate-pulse text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-violet-500"></div>
        <p className="text-lg font-semibold text-gray-900">Opening store...</p>
        <p className="mt-2 text-sm text-gray-500">Please wait</p>
      </div>
    </main>
  );
}
