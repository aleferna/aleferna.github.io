// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { markdownInclude } from './src/lib/markdown-include.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://alex-fernandes.com',
  markdown: {
    // Astro's default Markdown processor, plus <!-- include: URL --> support (see the plugin).
    processor: satteri({ mdastPlugins: [markdownInclude] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
