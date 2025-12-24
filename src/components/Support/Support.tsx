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
    <section id="support" aria-labelledby="support-heading" className="bg-white py-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-12 text-center">
            <h2 id="support-heading" className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have a question or feedback about ChatWing? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-8 md:p-12">
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
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } transition-colors focus:border-transparent focus:ring-2 focus:ring-violet-500`}
                  placeholder="Your name"
                  disabled={form.isSubmitting}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } transition-colors focus:border-transparent focus:ring-2 focus:ring-violet-500`}
                  placeholder="your@email.com"
                  disabled={form.isSubmitting}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  rows={5}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  } resize-none transition-colors focus:border-transparent focus:ring-2 focus:ring-violet-500`}
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
                className="w-full rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {form.isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {form.hasSubmitted && !form.isSubmitting && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center font-medium text-green-600"
                >
                  Message sent successfully! We&apos;ll be in touch soon.
                </motion.p>
              )}
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 border-t border-gray-300 pt-8 text-center">
              <p className="mb-4 text-sm text-gray-600">Or reach us directly at</p>
              <a
                href={`mailto:${site.company.email}`}
                className="rounded text-lg font-medium text-gray-900 underline hover:text-violet-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              >
                {site.company.email}
              </a>
            </div>

            {/* Legal Links */}
            <div className="mt-8 border-t border-gray-300 pt-8">
              <nav aria-label="Legal links">
                <p className="mb-4 text-center text-sm font-medium text-gray-500">
                  Legal Information
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link
                    href="/legal/privacy"
                    className="rounded font-medium text-gray-700 underline hover:text-violet-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/legal/terms"
                    className="rounded font-medium text-gray-700 underline hover:text-violet-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
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
