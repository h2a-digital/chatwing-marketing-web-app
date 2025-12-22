'use client';

import { how } from '@/content/how';
import { motion } from 'framer-motion';

const icons = {
  upload: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
      />
    </svg>
  ),
  analyze: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  tone: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  ),
  send: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  ),
};

const stepGradients = [
  'from-pink-500 to-rose-500',
  'from-purple-500 to-violet-500',
  'from-blue-500 to-indigo-500',
  'from-violet-500 to-purple-600',
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="how-it-works-heading"
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
          >
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Get better replies in four simple steps
          </p>
        </motion.div>

        {/* Desktop - Horizontal layout */}
        <div className="hidden lg:block">
          {/* Connection line */}
          <div className="relative mb-12">
            <div className="absolute top-8 right-[8%] left-[8%] h-0.5 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            <div className="relative grid grid-cols-4 gap-6">
              {how.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  {/* Step number */}
                  <div
                    className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stepGradients[index]} text-white shadow-lg`}
                  >
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>

                  {/* Content card */}
                  <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    {/* Icon */}
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stepGradients[index]} text-white`}
                    >
                      {icons[item.id as keyof typeof icons]}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet - Vertical layout */}
        <div className="space-y-6 lg:hidden">
          {how.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              {/* Left - Step number and line */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stepGradients[index]} text-white shadow-md`}
                >
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                {index < how.length - 1 && <div className="mt-4 w-0.5 flex-1 bg-gray-200" />}
              </div>

              {/* Right - Content */}
              <div className="flex-1 pb-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${stepGradients[index]} text-white`}
                    >
                      {icons[item.id as keyof typeof icons]}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="leading-relaxed text-gray-600">{item.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
