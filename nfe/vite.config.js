import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    react(),
    polyfillNode()
  ],
  resolve: {
    alias: {
      // Polyfill `global` as `globalThis`
      'global': 'globalthis',
    },
  },
});