import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import flowbitePlugin from 'flowbite/plugin';
export default defineConfig({
  plugins: [tailwindcss(), flowbitePlugin],
  build: {
    minify: false,
    sourcemap: true, // Generates readable JS and CSS source maps
    rollupOptions: {
      treeshake: true, // Enable tree-shaking to remove unused Flowbite code
    },
  },
});
