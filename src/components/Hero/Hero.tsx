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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-300 opacity-60 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-300 opacity-60 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300 opacity-40 blur-3xl"
        />
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
            {/* Emoji badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/80 px-4 py-2 text-sm font-bold text-gray-900 shadow-lg backdrop-blur-sm"
            >
              <span className="text-2xl">💘</span>
              <span>Your AI Dating Wingman</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl leading-tight font-black text-gray-900 md:text-6xl lg:text-7xl"
            >
              Never Run Out of
              <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Things to Say
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mb-8 max-w-xl text-xl font-medium text-gray-700 md:text-2xl lg:mx-0"
            >
              Get confident, flirty replies in seconds. Upload a chat, pick your vibe, send with
              swagger ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AppStoreButtons />
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <span>10M+ Messages</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                <span className="text-2xl">🔥</span>
                <span>2.5× More Dates</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockup with parallax */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
            aria-label="App preview"
          >
            <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
              {/* Phone Frame - z-index lower */}
              <div className="relative z-0 rounded-[3rem] bg-gray-900 p-3 shadow-2xl">
                <div className="aspect-[9/19] overflow-hidden rounded-[2.5rem] bg-white">
                  <Image
                    src="/screenshots/home.PNG"
                    alt="Wingman AI home screen showing reply suggestions"
                    width={360}
                    height={760}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 h-6 w-1/3 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
              </div>

              {/* Floating elements around phone - z-index higher */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 -left-12 z-10 rounded-2xl border-2 border-purple-200 bg-white p-3 shadow-2xl"
              >
                <span className="text-2xl">💬</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-40 -right-12 z-10 rounded-2xl border-2 border-pink-200 bg-white p-3 shadow-2xl"
              >
                <span className="text-2xl">😍</span>
              </motion.div>
              <motion.div
                animate={{ y: [-8, 8, -8], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-32 -left-8 z-10 rounded-2xl border-2 border-indigo-200 bg-white p-3 shadow-2xl"
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-sm font-semibold">Scroll to explore</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
