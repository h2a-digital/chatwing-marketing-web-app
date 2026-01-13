# ChatWing Marketing Website

> A modern, responsive marketing website for the ChatWing dating assistant.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Analytics](#analytics)

## 🎯 Overview

ChatWing Marketing Website is a high-performance, SEO-optimized marketing site built with Next.js 16 and the App Router. It showcases the ChatWing mobile app - an AI-powered dating assistant that analyzes chats and suggests replies in your preferred tone.

**Live Site:** [https://chatwing.h2adigital.com](https://chatwing.h2adigital.com)

## ✨ Features

### Marketing Features

- 🎨 **Modern Design**: Clean, professional design with rounded cards and gradients
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ♿ **Accessible**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- 🎭 **Smooth Animations**: Framer Motion animations with reduced motion support
- 🖼️ **Interactive Gallery**: Carousel with app screenshots and thumbnail navigation
- 📧 **Contact Form**: Spam-protected form with honeypot and SMTP integration
- 🔗 **Deep Linking**: Hash-based navigation for direct section links
- 📄 **Legal Pages**: Modern styled Privacy Policy and Terms of Service

### Technical Features

- ⚡ **Server-Side Rendering**: Next.js 16 App Router with static generation
- 🎯 **SEO Optimized**: Complete metadata, Open Graph tags, and sitemap
- 📊 **Analytics Ready**: PostHog integration with event tracking
- 🔒 **Secure**: Environment-based configuration and input validation
- 🎨 **Tailwind CSS v4**: Modern utility-first styling
- 📧 **Email Integration**: Supabase Edge Functions for unsubscribe functionality
- 🌐 **PWA Ready**: Web manifest and app icons configured

## 🛠️ Tech Stack

### Core

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Infrastructure

- **Email**: SMTP (Apple Mail) / Supabase Edge Functions
- **Analytics**: [PostHog](https://posthog.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Deployment**: Vercel (recommended)

### Development Tools

- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Node Version**: 18.x or higher

## 📁 Project Structure

```
chatwing-marketing-web-app/
├── public/                      # Static assets
│   ├── screenshots/             # App screenshots (uploads, analysis, replies)
│   ├── site.webmanifest         # PWA manifest
│   └── robots.txt               # SEO robots file
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes (contact, unsubscribe)
│   │   ├── legal/               # Legal pages (Privacy, Terms - MDX)
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Homepage
│   │
│   ├── components/              # React components
│   │   ├── Header/              # Navigation with hash routing
│   │   ├── Hero/                # Hero section with app mockup
│   │   ├── Features/            # Core features grid
│   │   ├── Gallery/             # Screenshot carousel
│   │   ├── Download/            # Download CTA section
│   │   └── ...                  # Other sections
│   │
│   ├── content/                 # Content configuration
│   │   ├── site.ts              # Site metadata
│   │   ├── features.ts          # Features content
│   │   └── ...                  # Other content files
│   │
│   ├── services/                # Business logic (singleton pattern)
│   ├── utils/analytics/         # PostHog analytics with EVT constants
│   └── styles/globals.css       # Global styles and animations
│
├── env.ts                       # Environment configuration
├── next.config.ts               # Next.js configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chatwing-marketing-web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values (see [Environment Variables](#environment-variables))

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file with these variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://chatwing.h2adigital.com

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# SMTP Configuration (contact form)
SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_USER=your_email@icloud.com
SMTP_PASS=your_app_specific_password
CONTACT_FROM=noreply@yourdomain.com
CONTACT_TO=support@h2adigital.com

# Supabase Configuration (unsubscribe)
SUPABASE_URL=https://your-project.supabase.co
```

## 💻 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Organization

#### Architecture Patterns

- **Service Pattern**: Business logic in `services/` (singletons)
- **Presenter Pattern**: Component logic in `.presenter.ts` files
- **Repository Pattern**: Data access in `repositories/`

#### Analytics Events

All events are centralized in `src/utils/analytics/analytics.constants.ts`:

```typescript
import { Analytics, EVT } from '@/utils/analytics';

Analytics.instance.capture(EVT.APP_STORE_BUTTON_CLICKED, {
  platform: 'ios',
});
```

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Post-Deployment Checklist

- [ ] Add `og.png` image (1200x630px) to `public/`
- [ ] Configure Google Search Console verification
- [ ] Test all forms and analytics
- [ ] Verify sitemap at `/sitemap.xml`

## 📊 Analytics

PostHog tracks these events:

- App store button clicks
- FAQ item expansions
- Gallery interactions
- Form submissions (success/error)

All event names use the `EVT` constants for type safety.

## 📞 Support

- **Email**: support@h2adigital.com
- **Website**: [https://chatwing.h2adigital.com](https://chatwing.h2adigital.com)
- **Company**: H2A Digital LLC
