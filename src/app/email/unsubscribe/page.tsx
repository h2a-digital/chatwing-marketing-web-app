'use client';

import { StatusCard } from '@/components/ui/StatusCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { UnsubscribeState } from './page.model';
import UnsubscribePresenter from './page.presenter';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const presenter = useMemo(() => new UnsubscribePresenter(), []);

  const [state, setState] = useState<UnsubscribeState>({
    status: 'loading',
    title: 'Processing...',
    message: 'Updating your email preferences…',
  });

  useEffect(() => {
    const processUnsubscribe = async () => {
      const uid = searchParams?.get('uid');
      const token = searchParams?.get('token');

      const result = await presenter.handleUnsubscribe(uid, token);
      setState(result);
    };

    processUnsubscribe();
  }, [searchParams, presenter]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <StatusCard status={state.status} title={state.title} message={state.message}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            href="/legal/privacy"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Privacy Policy
          </Link>
        </div>
      </StatusCard>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
          <StatusCard
            status="loading"
            title="Processing..."
            message="Updating your email preferences…"
          />
        </main>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
