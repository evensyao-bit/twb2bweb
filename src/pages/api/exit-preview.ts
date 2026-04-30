export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Clear the preview cookie
  cookies.delete('sanity-preview', { path: '/' });

  // Redirect to home
  return redirect('/', 307);
};
