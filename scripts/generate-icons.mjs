import sharp from 'sharp'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = resolve(__dirname, '../public/favicon.svg')
const outDir = resolve(__dirname, '../public/icons')

// Read SVG and upscale viewBox to render crisp at large sizes
const svg = readFileSync(svgPath, 'utf8').replace(
  /width="32" height="32"/,
  'width="512" height="512"'
)

const sizes = [
  { name: 'apple-touch-icon-180x180.png', size: 180 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
]

for (const { name, size } of sizes) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(resolve(outDir, name))
  console.log(`Generated ${name}`)
}

console.log('Done!')
