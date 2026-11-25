/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works from any sub-path (e.g. GitHub Pages project sites).
  base: './',
  plugins: [react()],
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
})
