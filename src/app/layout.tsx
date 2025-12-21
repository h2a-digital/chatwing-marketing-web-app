import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import '../styles/globals.css';
import { site } from '@/content/site';
import { Toast, AnalyticsHost } from '@/components';
import { env } from '../../env';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: `${site.app.name} - ${site.app.tagline}`,
    template: `%s | ${site.app.name}`,
  },
  description:
    "The smart grocery app that learns your store's layout and creates the most efficient route. No more backtracking, no more forgotten items.",
  keywords: [
    'grocery app',
    'shopping list app',
    'shopping list',
    'grocery list',
    'route optimization',
    'smart shopping',
    'grocery planning',
    'aisle organization',
    'store layout',
    'shopping efficiency',
    'grocery list organizer',
  ],
  authors: [{ name: site.company.name, url: 'https://h2adigital.com' }],
  creator: site.company.name,
  applicationName: site.app.name,
  category: 'Productivity',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.SITE_URL,
    title: `${site.app.name} - ${site.app.tagline}`,
    description:
      "The smart grocery app that learns your store's layout and creates the most efficient route. Download for iOS.",
    siteName: site.app.name,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${site.app.name} - Smart Grocery Shopping App`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wingmanapp',
    creator: '@wingmanapp',
    title: `${site.app.name} - ${site.app.tagline}`,
    description:
      'Never backtrack through the store again. The smart grocery app that optimizes your shopping route.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'y9xUcPL8jCrDt5sfUnOKnqs3J-4APi3Iw7f4JQbCJGE',
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', url: '/icon0.svg', type: 'image/svg+xml' },
    { rel: 'icon', url: '/icon1.png', type: 'image/png', sizes: '32x32' },
    { rel: 'apple-touch-icon', url: '/apple-icon.png', sizes: '180x180' },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fredoka.className} antialiased`}>
        {children}
        <AnalyticsHost />
        <Toast />
      </body>
    </html>
  );
}
