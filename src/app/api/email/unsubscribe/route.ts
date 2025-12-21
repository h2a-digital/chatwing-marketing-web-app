import { NextResponse } from 'next/server';
import { env } from '../../../../../env';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, token } = body;

    // Validate input
    if (!uid || !token) {
      return NextResponse.json(
        {
          ok: false,
          error: { kind: 'Validation', message: 'Missing required parameters' },
        },
        { status: 400 }
      );
    }

    // Call Supabase Edge Function
    const supabaseUrl = env.SUPABASE_URL;
    if (!supabaseUrl) {
      console.error('SUPABASE_URL not configured');
      return NextResponse.json(
        {
          ok: false,
          error: { kind: 'Unknown', message: 'Service not configured' },
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${supabaseUrl}/functions/v1/email-unsubscribe?uid=${uid}&token=${token}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          ok: false,
          error: {
            kind: 'Unknown',
            message:
              errorData.message ||
              "We couldn't verify that link. It may have expired. Contact support@h2adigital.com for help.",
          },
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          kind: 'Unknown',
          message: 'Failed to process unsubscribe request',
        },
      },
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
