'use client';

import { motion } from 'framer-motion';
import { AppStoreButtons } from '@/components/ui/AppStoreButtons';

export function Download() {
  return (
    <section id="download" aria-labelledby="download-heading" className="bg-white py-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 id="download-heading" className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Ready to Transform Your Shopping?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
            Download Wingman now and never backtrack through the store again
          </p>
          <div className="flex justify-center">
            <AppStoreButtons />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
