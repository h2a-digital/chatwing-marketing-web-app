'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { site } from '@/content/site';
import { AppStoreButtons } from '@/components/ui/AppStoreButtons';
import Image from 'next/image';
import { env } from '../../../../env';

// Detect mobile device
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod/.test(userAgent);
}

export default function InvitePage() {
  const params = useParams();
  const code = params.code as string;
  const [showFallback, setShowFallback] = useState(false);
  const hasAttemptedRedirect = useRef(false);

  useEffect(() => {
    if (hasAttemptedRedirect.current) return;
    hasAttemptedRedirect.current = true;

    const isMobile = isMobileDevice();
    if (!isMobile) return;

    // 1) Let iOS try the universal link naturally (Safari, WhatsApp, Messages)

    // 2) Fallback attempt for in-app browsers (Instagram, TikTok, etc.)
    //    Try custom URL scheme after 1.2s
    const schemeTimer = setTimeout(() => {
      window.location.href = `${env.APP_SCHEME}://i/${code}`;
    }, 1200);

    // 3) After 2.5s, show the fallback "App Not Installed" UI
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 2500);

    // 4) If app opened and page goes to background, cancel timers
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(schemeTimer);
        clearTimeout(fallbackTimer);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(schemeTimer);
      clearTimeout(fallbackTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [code]);

  // Check if mobile for rendering
  const isMobile = isMobileDevice();

  // Mobile view with fallback
  if (isMobile && showFallback) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-gray-50 to-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl from-amber-400 to-amber-500 shadow-lg">
              <Image
                src={'/images/icon.png'}
                alt={`${site.app.name} logo`}
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-xl transition-all duration-300">
            <h1 className="mb-3 text-2xl font-bold text-gray-900">App Not Installed</h1>
            <p className="mb-8 text-base text-gray-600">
              Download {site.app.name} to accept this invitation and start shopping smarter.
            </p>

            <div className="flex justify-center">
              <AppStoreButtons />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Desktop view
  if (!isMobile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-indigo-50 via-white to-cyan-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl from-amber-400 to-amber-500 shadow-lg">
              <Image
                src={'/images/icon.png'}
                alt={`${site.app.name} logo`}
                width={250}
                height={250}
              />
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-12 text-center shadow-xl transition-all duration-300">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Open on Mobile</h1>
            <p className="mb-12 text-xl text-gray-600">
              This invitation link is designed for mobile devices. Please open it on your phone or
              tablet to continue.
            </p>

            {/* Divider */}
            <div className="mb-12 border-t-2 border-gray-200" />

            {/* Download Section */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Download {site.app.name}</h2>
              <p className="mb-8 text-lg text-gray-600">
                Get the smart grocery app on your mobile device
              </p>

              {/* App Store Buttons */}
              <div className="flex justify-center">
                <AppStoreButtons />
              </div>
            </div>

            {/* Features List */}
            <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                  <svg
                    className="h-5 w-5 text-amber-500"
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
                  <h3 className="font-semibold text-gray-900">Smart Routes</h3>
                  <p className="text-sm text-gray-600">Optimized shopping paths</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                  <svg
                    className="h-5 w-5 text-amber-500"
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
                  <h3 className="font-semibold text-gray-900">Real-time Collaboration</h3>
                  <p className="text-sm text-gray-600">Shop together seamlessly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                  <svg
                    className="h-5 w-5 text-amber-500"
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
                  <h3 className="font-semibold text-gray-900">Shopping Analytics</h3>
                  <p className="text-sm text-gray-600">Track spending & habits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Loading state while attempting to open app
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-gray-50 to-white">
      <div className="text-center">
        {/* Icon with pulse animation */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-amber-500 shadow-lg">
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

        {/* Loading spinner */}
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-400"></div>
        <p className="text-lg font-semibold text-gray-900">Opening {site.app.name}...</p>
        <p className="mt-2 text-sm text-gray-500">Please wait</p>
      </div>
    </main>
  );
}
