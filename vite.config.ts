import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: path.resolve(__dirname, 'build'),
    rollupOptions: {
      output: {
        manualChunks: { lodash: ['lodash'] }
      },
    },
  },
  publicDir: path.resolve(__dirname, 'public'),
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
      exclude: 'firebase-messaging-sw.example.js'
    }),
  ],
  resolve: {
    alias: {
      store: path.resolve(__dirname, 'src', 'store'),
      components: path.resolve(__dirname, 'src', 'components'),
      context: path.resolve(__dirname, 'src', 'context'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      services: path.resolve(__dirname, 'src', 'services'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      types: path.resolve(__dirname, 'src', 'types'),
      src: path.resolve(__dirname, 'src')
    }
  }
});