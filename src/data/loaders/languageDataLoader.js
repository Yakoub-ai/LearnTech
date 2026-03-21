/**
 * Dynamic loaders for language data - prevents all content from loading on initial page load
 * Each function returns a Promise resolving to that data slice for the language
 */

export async function loadLanguageMarkdownContent(languageId) {
  try {
    const mod = await import(`../languages/${languageId}-content.js`)
    return mod.content || {}
  } catch {
    return {}
  }
}

export async function loadLanguageQuizzes(languageId) {
  const { languageQuizzes } = await import('../languageQuizzes.js')
  return languageQuizzes[languageId] || {}
}

export async function loadLanguageSkillDiagram(languageId) {
  const { languageSkillDiagrams } = await import('../languageSkillDiagrams.js')
  return languageSkillDiagrams[languageId] || null
}

export async function loadLanguageCodeSandbox(languageId) {
  const { languageCodeSandboxExamples } = await import('../languageCodeSandboxExamples.js')
  return languageCodeSandboxExamples[languageId] || null
}

export async function loadLanguageLabs(languageId) {
  const { interactiveLabs } = await import('../interactiveLabs.js')
  return interactiveLabs.filter(l => l.languageId === languageId)
}

export async function loadLanguageSetupGuide(languageId) {
  const { languageDevSetupGuides } = await import('../languageDevSetupGuides.js')
  return languageDevSetupGuides[languageId] || null
}
