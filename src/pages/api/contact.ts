export const prerender = false;

import type { APIRoute } from 'astro';
import { validateTurnstileToken } from '../../lib/turnstile';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const token = data['cf-turnstile-response'];

    // 1. Validate Turnstile Token
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: 'Security challenge is required.' }),
        { status: 400 }
      );
    }

    const isTurnstileValid = await validateTurnstileToken(token);

    if (!isTurnstileValid) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid security challenge. Please try again.' }),
        { status: 400 }
      );
    }

    // 2. Return success to allow client-side submission to Web3Forms
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Turnstile verification error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'Internal verification error.', 
        debug: error.message 
      }),
      { status: 500 }
    );
  }
};
