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
  const base = languageQuizzes[languageId] || {}
  try {
    const mod = await import(`../languageQuizzes/${languageId}-additions.js`)
    const addns = mod.additions || {}
    const merged = {}
    for (const level of ['beginner', 'mid', 'senior']) {
      const baseQs = base[level] || []
      const addQs = addns[level] || []
      const seen = new Set(baseQs.map((q) => q.question))
      merged[level] = [...baseQs, ...addQs.filter((q) => !seen.has(q.question))]
    }
    return merged
  } catch {
    return base
  }
}

export async function loadLanguageSkillDiagram(languageId) {
  const { languageSkillDiagrams } = await import('../languageSkillDiagrams.js')
  return languageSkillDiagrams[languageId] || null
}

export async function loadLanguageLabs(languageId) {
  try {
    const mod = await import(`../labs/${languageId}-labs.js`)
    return mod.labs || []
  } catch {
    return []
  }
}

export async function loadLanguageSetupGuide(languageId) {
  const { languageDevSetupGuides } = await import('../languageDevSetupGuides.js')
  return languageDevSetupGuides[languageId] || null
}

export async function loadLanguageTopicQuizzes(languageId) {
  try {
    const mod = await import(`../languageQuizzes/${languageId}-topics.js`)
    return mod.topicQuizzes || {}
  } catch {
    return {}
  }
}

export async function loadLanguageGlossary(languageId) {
  try {
    const mod = await import(`../glossaries/${languageId}-glossary.js`)
    return mod.default || null
  } catch {
    return null
  }
}
