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
    'Upload a dating chat or profile and get AI-powered reply suggestions in the tone you want. Keep conversations engaging and confident.',
  keywords: [
    'dating assistant',
    'AI dating',
    'reply suggestions',
    'pickup lines',
    'chat analysis',
    'conversation help',
    'dating app messages',
    'tone selector',
    'text analysis',
    'Wingman AI',
  ],
  authors: [{ name: site.company.name, url: 'https://wingman.ai' }],
  creator: site.company.name,
  applicationName: site.app.name,
  category: 'Lifestyle',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.SITE_URL,
    title: `${site.app.name} - ${site.app.tagline}`,
    description: 'Upload a dating chat or profile and get AI-powered reply suggestions in seconds.',
    siteName: site.app.name,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${site.app.name} - AI Dating Assistant`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wingmanai',
    creator: '@wingmanai',
    title: `${site.app.name} - ${site.app.tagline}`,
    description: 'Get confident, on-brand dating replies with Wingman AI.',
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
    google: '',
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
