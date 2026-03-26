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
    include: /\.(jsx?|tsx?)$/,
    exclude: /\.js$/,
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/')) {
            // Heavy page-specific libraries stay in their own chunks
            // (only loaded when the user navigates to those pages)
            if (id.includes('node_modules/react-markdown/') || id.includes('node_modules/rehype-') || id.includes('node_modules/remark-') || id.includes('node_modules/hast') || id.includes('node_modules/unified') || id.includes('node_modules/mdast') || id.includes('node_modules/micromark') || id.includes('node_modules/vfile') || id.includes('node_modules/unist')) {
              return 'vendor-markdown'
            }
            if (id.includes('node_modules/mermaid/')) {
              return 'vendor-mermaid'
            }
            if (id.includes('node_modules/recharts/')) {
              return 'vendor-charts'
            }
            if (id.includes('node_modules/@xyflow/')) {
              return 'vendor-flow'
            }
            // Everything else (react, framer-motion, supabase, lucide, etc.)
            // in one core chunk — these are always loaded together on every page,
            // so a single request is better than 5 separate ones
            return 'vendor-core'
          }
        },
      },
    },
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
