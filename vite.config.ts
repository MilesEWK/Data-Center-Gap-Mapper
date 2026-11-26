/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works from any sub-path (e.g. GitHub Pages project sites).
  base: './',
  plugins: [react()],
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  build: {
    rolldownOptions: {
      output: {
        // Keep the 200 kB search log in its own chunk so the app code stays small and caches separately.
        codeSplitting: { groups: [{ name: 'search-log', test: /searchLog\.json/ }] },
      },
    },
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
})
