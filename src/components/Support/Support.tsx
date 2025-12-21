'use client';

import { site } from '@/content/site';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ContactSchema } from '@/lib/validations';
import SupportPresenter from './Support.presenter';
import type { SupportFormVM } from './Support.model';

export function Support() {
  const presenter = useMemo(() => new SupportPresenter(), []);

  const [form, setForm] = useState<SupportFormVM>({
    name: '',
    email: '',
    message: '',
    hp: '',
    isSubmitting: false,
    hasSubmitted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const validation = ContactSchema.safeParse({
      name: form.name,
      email: form.email,
      message: form.message,
      hp: form.hp,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setForm((prev) => ({ ...prev, isSubmitting: true }));

    const success = await presenter.submitForm({
      name: form.name,
      email: form.email,
      message: form.message,
      hp: form.hp,
    });

    if (success) {
      setForm({
        name: '',
        email: '',
        message: '',
        hp: '',
        isSubmitting: false,
        hasSubmitted: true,
      });
    } else {
      setForm((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <section id="support" aria-labelledby="support-heading" className="py-24 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 id="support-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 border border-gray-200">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="hp"
                value={form.hp}
                onChange={(e) => setForm((prev) => ({ ...prev, hp: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors`}
                  placeholder="Your name"
                  disabled={form.isSubmitting}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors`}
                  placeholder="your@email.com"
                  disabled={form.isSubmitting}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none`}
                  placeholder="Tell us how we can help..."
                  disabled={form.isSubmitting}
                  required
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={form.isSubmitting}
                className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                {form.isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {form.hasSubmitted && !form.isSubmitting && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-600 font-medium"
                >
                  Message sent successfully! We'll be in touch soon.
                </motion.p>
              )}
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t border-gray-300 text-center">
              <p className="text-sm text-gray-600 mb-4">Or reach us directly at</p>
              <a
                href={`mailto:${site.company.email}`}
                className="text-lg text-gray-900 font-medium hover:text-gray-700 underline focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
              >
                {site.company.email}
              </a>
            </div>

            {/* Legal Links */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <nav aria-label="Legal links">
                <p className="text-sm font-medium text-gray-500 mb-4 text-center">
                  Legal Information
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link
                    href="/legal/privacy"
                    className="text-gray-700 hover:text-gray-900 font-medium underline focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/legal/terms"
                    className="text-gray-700 hover:text-gray-900 font-medium underline focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
                  >
                    Terms of Service
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
