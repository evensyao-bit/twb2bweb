import { getSession } from 'auth-astro/server';
import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // 1. Add Security Headers to all responses
  const response = await next();
  
  // Set security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://cdn.sanity.io",
    "connect-src 'self' https://*.sanity.io https://www.google-analytics.com",
    "font-src 'self' https://fonts.gstatic.com",
    "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // 2. Protect /admin routes
  if (pathname.startsWith('/admin')) {
    console.log('Middleware hit for:', pathname);
    const session = await getSession(context.request);
    console.log('Session found:', !!session);
    
    if (!session) {
      // Redirect to login page if no session exists
      const callbackUrl = encodeURIComponent(pathname);
      return context.redirect(`/login?callbackUrl=${callbackUrl}`);
    }
  }

  return response;
});
