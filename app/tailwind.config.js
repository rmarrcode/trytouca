// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,scss,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
