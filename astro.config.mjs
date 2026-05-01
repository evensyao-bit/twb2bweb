import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import auth from 'auth-astro';
import partytown from '@astrojs/partytown';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'advanced'
  }),
  vite: {
    resolve: {
      alias: {
        'auth:config': path.resolve(__dirname, './auth.config.ts'),
      },
    },
    optimizeDeps: {
      include: ['auth-astro'],
    },
  },
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: 'a2c16whu',
      dataset: 'production',
      studioBasePath: '/admin',
    }),
    auth(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});

