import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import auth from 'auth-astro';
import partytown from '@astrojs/partytown';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory'
  }),
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

