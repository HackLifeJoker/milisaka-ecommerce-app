import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Serve from project root
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html') // Use root index.html
      }
    }
  },
  server: {
    open: '/index.html' // Load index.html on dev start
  }
});
