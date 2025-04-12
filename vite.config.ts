import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/maps/',
  plugins: [react()],
  resolve: {
    alias: {
      '@scripts': fileURLToPath(new URL('./scripts', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
