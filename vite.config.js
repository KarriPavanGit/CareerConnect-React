import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Fallback to index.html
  server: {
    middlewareMode: 'html',
    proxy: {
      '**': 'http://localhost:3000',
    },
  },
});
