'use client';

import { site } from '@/content/site';
import { AppStoreButtons } from '@/components/ui/AppStoreButtons';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-white to-cyan-50"
    >
      {/* Gradient Orbs - Decorative only */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl"
            >
              {site.app.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-8 max-w-xl text-xl text-gray-600 md:text-2xl lg:mx-0"
            >
              {site.app.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mb-10 max-w-lg text-lg text-gray-500 lg:mx-0"
            >
              The smart grocery app that learns your store&apos;s layout and creates the most
              efficient route. No more backtracking, no more forgotten items.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AppStoreButtons />
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
            aria-label="App preview"
          >
            <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
              {/* Phone Frame */}
              <div className="relative rounded-[3rem] bg-gray-900 p-3 shadow-2xl">
                <div className="aspect-9/19 overflow-hidden rounded-[2.5rem] bg-white">
                  {/* Placeholder for app screenshot */}
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">
                    <Image
                      src="/screenshots/items.PNG"
                      alt="Easly app items screen showing browseable grocery items"
                      width={360}
                      height={760}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>
                {/* Notch */}
                <div
                  className="absolute top-0 left-1/2 h-6 w-1/3 -translate-x-1/2 transform rounded-b-2xl bg-gray-900"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg
            className="h-6 w-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
