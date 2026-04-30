export const prerender = false;

import type { APIRoute } from 'astro';

const PREVIEW_SECRET = import.meta.env.PREVIEW_SECRET ?? 'tobe-preview-2024';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const slug = url.searchParams.get('slug');

  // Validate token
  if (token !== PREVIEW_SECRET) {
    return new Response('Invalid preview token', { status: 401 });
  }

  if (!slug) {
    return new Response('Missing slug parameter', { status: 400 });
  }

  // Set preview cookie (1 hour expiry)
  cookies.set('sanity-preview', 'true', {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60,
    sameSite: 'lax',
  });

  // Redirect to the preview page
  return redirect(`/blog/preview/${slug}`, 307);
};
