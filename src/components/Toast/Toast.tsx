'use client';

import { ToastKind } from '@/repositories';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import type { ToastViewportVM } from './Toast.model';
import { ToastPresenter } from './Toast.presenter';

function AutoDismiss({
  id,
  durationMs,
  onDismiss,
}: {
  id: string;
  durationMs: number;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [id, durationMs, onDismiss]);

  return null;
}

// Toast Icon Component
function ToastIcon({ kind }: { kind: ToastKind }) {
  const iconClasses = 'h-5 w-5';

  switch (kind) {
    case 'success':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'error':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case 'warning':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    default: // info
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
  }
}

// Get toast styling based on kind
function getToastStyles(kind: ToastKind) {
  switch (kind) {
    case 'success':
      return {
        bg: 'bg-white',
        border: 'border-green-200',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        titleColor: 'text-gray-900',
        descColor: 'text-gray-600',
      };
    case 'error':
      return {
        bg: 'bg-white',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        titleColor: 'text-gray-900',
        descColor: 'text-gray-600',
      };
    case 'warning':
      return {
        bg: 'bg-white',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        titleColor: 'text-gray-900',
        descColor: 'text-gray-600',
      };
    default: // info
      return {
        bg: 'bg-white',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        titleColor: 'text-gray-900',
        descColor: 'text-gray-600',
      };
  }
}

export default function Toast() {
  const presenter = useMemo(() => new ToastPresenter(), []);
  const [vm, setVm] = useState<ToastViewportVM>({ toasts: [] });

  useEffect(() => presenter.subscribe(setVm), [presenter]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6">
      <AnimatePresence>
        {vm.toasts.map((toast) => {
          const styles = getToastStyles(toast.kind);

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pointer-events-auto w-full max-w-sm"
            >
              <div
                className={`relative overflow-hidden rounded-2xl border ${styles.border} ${styles.bg} p-4 shadow-xl`}
                role="alert"
                aria-live="polite"
                aria-label={toast.title || toast.description || 'Notification'}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`shrink-0 rounded-xl ${styles.iconBg} p-2 ${styles.iconColor}`}>
                    <ToastIcon kind={toast.kind} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    {toast.title && (
                      <p className={`font-semibold ${styles.titleColor} leading-tight`}>{toast.title}</p>
                    )}
                    {toast.description && (
                      <p className={`mt-1 text-sm ${styles.descColor} leading-relaxed`}>
                        {toast.description}
                      </p>
                    )}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => presenter.dismiss(toast.id)}
                    className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    aria-label="Dismiss notification"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Auto Dismiss */}
              <AutoDismiss
                id={toast.id}
                durationMs={toast.durationMs ?? 3500}
                onDismiss={() => presenter.dismiss(toast.id)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
