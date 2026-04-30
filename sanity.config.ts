import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// ── Preview Action ──────────────────────────────────────────────────────────
// Opens the Astro preview page for the current draft document in a new tab.
const ASTRO_DEV_URL = 'http://localhost:4321';
const PREVIEW_SECRET = 'tobe-preview-2024'; // must match PREVIEW_SECRET in .env

function PreviewAction(props: any) {
  const slug = props.draft?.slug?.current || props.published?.slug?.current;
  return {
    label: '👁 Preview in Browser',
    onHandle: () => {
      if (!slug) {
        alert('Please add and save a slug before previewing.');
        return;
      }
      const url = `${ASTRO_DEV_URL}/api/preview?slug=${slug}&token=${PREVIEW_SECRET}`;
      window.open(url, '_blank');
    },
  };
}



export default defineConfig({
  name: 'default',
  title: '拓必工作室 CMS',
  basePath: '/admin',

  projectId: 'a2c16whu',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [
      {
        name: 'post',
        title: 'Post',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
          { name: 'publishedAt', title: 'Published at', type: 'datetime' },
          { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] },
          { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
          { name: 'excerpt', title: 'Excerpt', type: 'text' },
          { name: 'author', title: 'Author', type: 'string' },
          { 
            name: 'body', 
            title: 'Body', 
            type: 'array', 
            of: [
              { 
                type: 'block',
                marks: {
                  annotations: [
                    {
                      name: 'color',
                      title: 'Text Color',
                      type: 'object',
                      fields: [
                        {
                          name: 'hex',
                          title: 'Color Hex',
                          type: 'string',
                          description: 'e.g. #ff0000'
                        }
                      ]
                    }
                  ]
                }
              },
              { type: 'image', options: { hotspot: true } },
              {
                name: 'youtube',
                type: 'object',
                title: 'YouTube Video',
                fields: [
                  { name: 'url', type: 'url', title: 'YouTube video URL' }
                ]
              },
              {
                name: 'htmlBlock',
                type: 'object',
                title: 'Custom HTML/CSS',
                fields: [
                  { name: 'html', title: 'HTML Code', type: 'text' },
                  { name: 'css', title: 'CSS Code (Optional)', type: 'text' }
                ]
              }
            ] 
          },
        ],
      },
      {
        name: 'service',
        title: 'Service',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'price', title: 'Price', type: 'string' },
        ],
      },
    ],
  },

  document: {
    actions: (prev, ctx) => {
      if (ctx.schemaType !== 'post') return prev;
      
      // Keep Publish as the primary action (index 0)
      // Insert Preview as the second action
      const newActions = [...prev];
      const publishIndex = prev.findIndex(a => a.name === 'PublishAction');
      
      if (publishIndex !== -1) {
        newActions.splice(publishIndex + 1, 0, PreviewAction);
        return newActions;
      }
      
      return [PreviewAction, ...prev];
    },
  },
});
