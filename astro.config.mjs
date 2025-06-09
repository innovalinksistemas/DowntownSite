import { defineConfig, passthroughImageService } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  i18n:{
    defaultLocale: "es",
    locales: ["es","en"],
  },

  image: {
    service: passthroughImageService(),
  },

  integrations: [tailwind(), react()],
  adapter: netlify()
});