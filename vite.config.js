import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // Serve from project root

  // ⭐ StackBlitz fix: disable Vite's filesystem watchers
  server: {
    open: '/index.html',
    hmr: {
      overlay: false,
      server: false // ⭐ Prevents Vite from using fsevents-based watcher
    },
    watch: {
      usePolling: true, // ⭐ Forces polling instead of fsevents
      interval: 100     // Reasonable polling speed
    }
  },

  // ⭐ StackBlitz fix: disable dependency pre-bundling
  optimizeDeps: {
    disabled: true
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});

