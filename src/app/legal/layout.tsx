import { ReactNode } from 'react';
import { Header, Footer } from '@/components';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
