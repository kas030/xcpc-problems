import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: process.env.SITE_URL || 'https://kas030.github.io',
  base: process.env.BASE_PATH || '/xcpc-problems',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
  },
});
