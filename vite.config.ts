import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: resolve(__dirname, 'build'),
    rollupOptions: {
      output: {
        manualChunks: { lodash: ['lodash'] }
      },
    },
  },
  publicDir: resolve(__dirname, 'public'),
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          title: 'PROductify',
        },
      },
    }),
    react({
      include: '**/*.{jsx,tsx}',
    }),
  ],
  resolve: {
    alias: {
      store: resolve(__dirname, 'src', 'store'),
      components: resolve(__dirname, 'src', 'components'),
      context: resolve(__dirname, 'src', 'context'),
      hooks: resolve(__dirname, 'src', 'hooks'),
      services: resolve(__dirname, 'src', 'services'),
      assets: resolve(__dirname, 'src', 'assets'),
      utils: resolve(__dirname, 'src', 'utils'),
      types: resolve(__dirname, 'src', 'types'),
      providers: resolve(__dirname, 'src', 'providers'),
      '@': resolve(__dirname, 'src')
    }
  }
});