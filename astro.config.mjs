import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://aurelianepuras-max.github.io',
  base: '/Origini/',
  integrations: [svelte(), tailwind()],
});
