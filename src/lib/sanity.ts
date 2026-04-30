import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'a2c16whu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-04-24',
});

// Preview client — bypasses CDN and includes draft documents
export const previewClient = createClient({
  projectId: 'a2c16whu',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-24',
  token: import.meta.env.SANITY_PREVIEW_TOKEN,
  perspective: 'previewDrafts',
});
