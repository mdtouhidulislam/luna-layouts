import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
//import flowbitePlugin from 'flowbite/plugin';
//import postcssPrefixer from 'postcss-prefixer';
//import autoprefixer from 'autoprefixer';
export default defineConfig({
  plugins: [tailwindcss()], //flowbitePlugin
  build: {
    minify: false,
    sourcemap: true, // Generates readable JS and CSS source maps
    rollupOptions: {
      treeshake: true, // Enable tree-shaking to remove unused Flowbite code
      external: [
        /src\/layouts\/color-palette\.html/, // Exclude this file
      ],
      /*
      input: {
        main: path.resolve(__dirname, 'index.html'), // Main entry point
        gridShop: path.resolve(__dirname, 'src/layouts/grid-shop.html'), // Additional entry point
      },
      */
    },
  },
  /*
  css: {
    postcss: {
      plugins: [
        postcssPrefixer({
          prefix: 'smw:',
          ignore: [/^(smw:|smw\\:)/], // Improved regex to match both variants
        }),
        //autoprefixer(), // Add autoprefixer
      ],
    },
  },
  */
});
