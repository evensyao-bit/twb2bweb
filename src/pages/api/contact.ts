import type { APIRoute } from 'astro';
import { validateTurnstileToken } from '../../lib/turnstile';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const token = data['cf-turnstile-response'];

    // 1. Validate Turnstile Token
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Security challenge is required.' }),
        { status: 400 }
      );
    }

    const isValid = await validateTurnstileToken(token);
    if (!isValid) {
      return new Response(
        JSON.stringify({ message: 'Invalid security challenge. Please try again.' }),
        { status: 400 }
      );
    }

    // 2. Forward to Web3Forms
    // Remove the turnstile response from the data sent to Web3Forms to keep it clean
    const { 'cf-turnstile-response': _, ...web3FormData } = data;

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify(web3FormData),
    });


    const contentType = response.headers.get('content-type');
    let result;
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { message: 'External Service Error', debug: text.slice(0, 100) };
    }

    return new Response(JSON.stringify(result), {
      status: response.status,
    });

  } catch (error: any) {
    console.error('Contact form proxy error:', error);
    return new Response(
      JSON.stringify({ 
        message: 'An internal error occurred.', 
        debug: error.message 
      }),
      { status: 500 }
    );
  }

};
