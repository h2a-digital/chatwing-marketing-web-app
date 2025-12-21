'use client';

import { features } from '@/content/features';
import { motion } from 'framer-motion';

const icons = {
  offline: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  stores: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  collab: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  stats: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
};

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-linear-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 id="features-heading" className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Core Features
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Everything you need for smarter, faster grocery shopping
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.article
              key={feature.icon}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 transition-all duration-300 focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2 hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl">
                {/* Decorative gradient background on hover */}
                <div className="absolute inset-0 bg-amber-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative">
                  {/* Icon Container */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-400 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {icons[feature.icon as keyof typeof icons]}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-500">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-gray-600">{feature.body}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
