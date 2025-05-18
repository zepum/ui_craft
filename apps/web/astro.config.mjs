// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // site: "FIXME",
  prefetch: true,
  integrations: [react(), mdx(), sitemap()],
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
});
