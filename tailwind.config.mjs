import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    // Custom tokens used inside Sanity htmlBlock content.
    // Tailwind cannot scan runtime-injected HTML, so every class used
    // in HTML blocks must be listed here explicitly.
    'font-serif',
    'text-ink-muted',
    'text-ink',
    'bg-ink',
    'border-ink',
    // Opacity variants used in HTML blocks (e.g. bg-ink/10, text-ink/10)
    'bg-ink/5', 'bg-ink/10', 'bg-ink/20',
    'text-ink/10', 'text-ink/20', 'text-ink/40', 'text-ink/60', 'text-ink/80',
    'border-ink/10', 'border-ink/20', 'border-ink/40',
    
    // Pattern-based safelist for common utilities used in CMS content
    {
      pattern: /^(bg|text|border)-(ink|black|white|gray|red|blue|green|yellow|slate|zinc|neutral)(-[0-9]{2,3})?(\/[0-9]{1,3})?$/,
    },
    {
      pattern: /^(flex|grid|items|justify|gap|p|m|w|h|max-w|min-h|rounded|shadow|overflow|z|top|left|right|bottom|aspect)-.+/,
    },
    {
      pattern: /^(text)-(xs|sm|base|lg|xl|[2-9]xl)$/,
    },
    {
      pattern: /^(tracking|leading|font)-(tighter|tight|normal|wide|wider|widest|none|tight|snug|normal|relaxed|loose|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    },
    {
      pattern: /^(uppercase|lowercase|capitalize|italic|not-italic|underline|line-through|no-underline)$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        label: ['"Roboto Flex"', 'sans-serif'],
        serif: ['"Noto Serif TC"', '"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        // Warm dark ink color — used for text, borders in article HTML blocks
        ink: {
          DEFAULT: '#2C2318',   // deep warm brown
          muted: '#A08060',     // warm muted gold/tan for section numbers & labels
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}
