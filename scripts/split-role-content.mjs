import { roleMarkdownContent } from '../src/data/markdownContent.js'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const keyToFile = {
  'AI-Engineer': 'ai-engineer-content.js',
  'Backend-Developer': 'backend-developer-content.js',
  'Data-Engineer': 'data-engineer-content.js',
  'Data-Scientist': 'data-scientist-content.js',
  'DevOps-Platform-Engineer': 'devops-platform-engineer-content.js',
  'Frontend-Developer': 'frontend-developer-content.js',
  'Marketing-Technology-Developer': 'marketing-technology-developer-content.js',
  'ML-Engineer': 'ml-engineer-content.js',
  'QA-Test-Engineer': 'qa-test-engineer-content.js',
  'Security-Engineer': 'security-engineer-content.js',
  'Tech-Lead-Architect': 'tech-lead-architect-content.js',
}

const outDir = './src/data/roles'
mkdirSync(outDir, { recursive: true })

for (const [key, fileName] of Object.entries(keyToFile)) {
  const data = roleMarkdownContent[key]
  if (!data) {
    console.error(`Missing key: ${key}`)
    continue
  }

  const fields = ['overview', 'beginner', 'mid', 'senior']
  let fileContent = 'export const content = {\n'
  for (const field of fields) {
    const val = data[field] ?? ''
    // Escape for template literal: backslashes, backticks, ${
    const escaped = val
      .replaceAll('\\', '\\\\')
      .replaceAll('`', '\\`')
      .replaceAll('${', '\\${')
    fileContent += `  ${field}: \`${escaped}\`,\n`
  }
  fileContent += '}\n'

  const outPath = join(outDir, fileName)
  writeFileSync(outPath, fileContent, 'utf8')
  console.log(`Written: ${fileName} (${(fileContent.length / 1024).toFixed(1)} KB)`)
}

console.log('Done!')
