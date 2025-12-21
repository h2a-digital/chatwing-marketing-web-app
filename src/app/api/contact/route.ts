import { ContactSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { env } from '../../../../env';
import { escapeHtml } from './route.utils';

export const runtime = 'nodejs'; // ensure Node runtime (not Edge)

const Rate = {
  WINDOW_MS: 60_000,
  MAX: 5,
  bucket: new Map<string, number[]>(),
  hit(key: string) {
    const now = Date.now();
    const arr = this.bucket.get(key) ?? [];
    const fresh = arr.filter((t) => now - t < this.WINDOW_MS);
    if (fresh.length >= this.MAX) return false;
    fresh.push(now);
    this.bucket.set(key, fresh);
    return true;
  },
};

export async function POST(req: Request) {
  try {
    // Basic per-IP throttle
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      // @ts-expect-error (not typed on standard Request)
      req.ip ||
      'unknown';
    if (!Rate.hit(ip)) {
      return NextResponse.json(
        { ok: false, error: { kind: 'Validation', message: 'Too many requests' } },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: { kind: 'Validation', message: 'Invalid input' } },
        { status: 400 }
      );
    }

    const { name, email, message, hp } = parsed.data;

    // Honeypot: silently accept to avoid tipping off bots
    if (hp && hp.length > 0) {
      return NextResponse.json({ ok: true, data: null });
    }

    // Create transporter (STARTTLS on 587)
    console.log('SMTP Config:', {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      user: env.SMTP_USER,
      hasPassword: env.SMTP_PASS,
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
    });

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      debug: true, // Enable debug output
      logger: true, // Log to console
    });

    const from = env.CONTACT_FROM;
    const to = env.CONTACT_TO;
    if (!from || !to) {
      return NextResponse.json(
        { ok: false, error: { kind: 'Unknown', message: 'Mail not configured' } },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from, // shows as From: hello@h2adigital.com
      to, // goes to your inbox
      replyTo: email, // so you can reply directly
      subject: `[Wingman Support] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    });

    return NextResponse.json({ ok: true, data: null });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { ok: false, error: { kind: 'Unknown', message: 'Mail send failed', cause: error } },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: { kind: 'Validation', message: 'Method not allowed' } },
    { status: 405 }
  );
}
