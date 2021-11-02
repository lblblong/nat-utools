import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    outDir: 'build'
  },
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'src/',
        replacement: path.resolve(__dirname, 'src') + '/',
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  }
})
