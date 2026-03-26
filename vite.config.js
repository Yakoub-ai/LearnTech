import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      manifest: false,
      includeAssets: ['favicon.svg', 'icons/*.png'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2,ttf,otf}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB (mermaid chunk is ~2.4 MB)
      },
    }),
  ],
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
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/react-markdown/') || id.includes('node_modules/rehype-') || id.includes('node_modules/remark-') || id.includes('node_modules/hast') || id.includes('node_modules/unified') || id.includes('node_modules/mdast') || id.includes('node_modules/micromark') || id.includes('node_modules/vfile') || id.includes('node_modules/unist')) {
            return 'vendor-markdown'
          }
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase'
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons'
          }
          // Heavy page-specific libraries in their own chunks
          if (id.includes('node_modules/mermaid/')) {
            return 'vendor-mermaid'
          }
          if (id.includes('node_modules/recharts/')) {
            return 'vendor-charts'
          }
          if (id.includes('node_modules/@xyflow/')) {
            return 'vendor-flow'
          }
          // Consolidate all remaining node_modules into one chunk to avoid
          // dozens of tiny transitive-dependency files loading on every page
          if (id.includes('node_modules/')) {
            return 'vendor-misc'
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
