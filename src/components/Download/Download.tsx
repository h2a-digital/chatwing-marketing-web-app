'use client';

import { motion } from 'framer-motion';
import { AppStoreButtons } from '@/components/ui/AppStoreButtons';

export function Download() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative overflow-hidden py-32"
    >
      {/* Romantic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50" />

      {/* Animated chat bubbles decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 h-24 w-32 rounded-3xl bg-pink-400 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-20 bottom-20 h-32 w-40 rounded-full bg-purple-400 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/3 h-28 w-28 rounded-2xl bg-indigo-400 blur-2xl"
        />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Emoji decoration */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="mb-8 flex justify-center gap-4 text-6xl"
          >
            <span>💬</span>
            <span>💘</span>
            <span>✨</span>
          </motion.div>

          <h2
            id="download-heading"
            className="mb-6 text-5xl font-black text-gray-900 md:text-6xl lg:text-7xl"
          >
            Ready to Level Up
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Your Dating Game?
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-gray-600">
            Join thousands getting confident replies in seconds ⚡
          </p>

          <div className="flex justify-center">
            <AppStoreButtons />
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">10M+ Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold">2.5× More Dates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💯</span>
              <span className="font-semibold">AI-Powered</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
