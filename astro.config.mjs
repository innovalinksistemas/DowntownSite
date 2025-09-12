import { defineConfig, passthroughImageService } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

import sitemap from 'astro-sitemap';

// https://astro.build/config
export default defineConfig({
  i18n:{
    defaultLocale: "es",
    locales: ["es","en"],
  },

  image: {
    service: passthroughImageService(),
  },
  site: 'https://lafortunadowntown.com/',
  integrations: [tailwind(), react(), sitemap()],
  adapter: netlify()
});