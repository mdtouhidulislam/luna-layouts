const flowbite = require('flowbite/plugin');
module.exports = {
  prefix: 'smw',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite(), // Enable Flowbite plugin
  ],
};
