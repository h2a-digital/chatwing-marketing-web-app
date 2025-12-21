'use client';

import { how } from '@/content/how';
import { motion } from 'framer-motion';

const icons = {
  list: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  organize: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  ),
  route: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  ),
  improve: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  ),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-white py-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2
            id="how-it-works-heading"
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
          >
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Four simple steps to effortless shopping
          </p>
        </motion.div>

        {/* Desktop Timeline - Horizontal */}
        <div className="relative hidden lg:block">
          {/* Connection Line - Enhanced with gradient and shadow */}
          <div
            className="absolute top-14 right-0 left-0 h-1 rounded-full bg-linear-to-r from-transparent via-amber-200 to-transparent"
            style={{ left: '10%', right: '10%' }}
          >
            {/* Inner gradient for depth */}
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-300/50 via-amber-400/50 to-amber-300/50 blur-sm" />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {how.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number Circle */}
                <div className="text-md relative z-10 mb-9 flex h-12 w-12 items-center justify-center font-bold">
                  {item.step}
                </div>

                {/* Icon Container */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-all duration-300 hover:scale-110 hover:bg-amber-50 hover:text-amber-500">
                  {icons[item.id as keyof typeof icons]}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Timeline - Vertical */}
        <div className="space-y-8 lg:hidden">
          {how.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Left Side - Step Number */}
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-base font-bold text-white shadow-lg">
                  {item.step}
                </div>
                {/* Vertical Line */}
                {index < how.length - 1 && <div className="mt-4 h-full w-0.5 bg-gray-300" />}
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 pb-8">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                    {icons[item.id as keyof typeof icons]}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="leading-relaxed text-gray-600">{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
