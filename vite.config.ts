import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import isWsl from 'is-wsl'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    emptyOutDir: true,
    // wsl 下输出到 c 盘目录
    outDir: isWsl ? '/mnt/c/code/utools/nat-utools' : 'dist',
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
  },
})
