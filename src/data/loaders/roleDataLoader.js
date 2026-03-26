/**
 * Dynamic loaders for role data - prevents all content from loading on initial page load
 * Each function returns a Promise resolving to that data slice for the role
 */

export async function loadRoleMarkdownContent(roleFileName) {
  try {
    const roleId = roleFileName.toLowerCase()
    const mod = await import(`../roles/${roleId}-content.js`)
    return mod.content || {}
  } catch {
    return {}
  }
}

export async function loadRoleQuizzes(roleId) {
  const { quizzes } = await import('../quizzes.js')
  return quizzes[roleId] || {}
}

export async function loadRoleSkillDiagram(roleId) {
  const { skillDiagrams } = await import('../skillDiagrams.js')
  return skillDiagrams[roleId] || null
}

export async function loadRoleLabs(roleId) {
  try {
    const mod = await import(`../labs/${roleId}-labs.js`)
    return mod.labs || []
  } catch {
    return []
  }
}

export async function loadRoleSetupGuide(roleId) {
  const { devSetupGuides } = await import('../devSetupGuides.js')
  return devSetupGuides[roleId] || null
}

export async function loadRoleTopicQuizzes(roleId) {
  try {
    const mod = await import(`../quizzes/${roleId}-topics.js`)
    return mod.topicQuizzes || {}
  } catch {
    return {}
  }
}

export async function loadRoleGlossary(roleId) {
  try {
    const mod = await import(`../glossaries/${roleId}-glossary.js`)
    return mod.default || null
  } catch {
    return null
  }
}
