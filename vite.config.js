import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
  oxc: {
    include: /\.(jsx|tsx|ts)$/,
    exclude: /\.js$/,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
