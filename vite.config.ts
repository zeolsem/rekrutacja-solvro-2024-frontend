import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://zeolsem.github.io/rekrutacja-solvro-2024-frontend/',
})
