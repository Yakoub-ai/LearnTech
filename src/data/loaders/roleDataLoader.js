/**
 * Dynamic loaders for role data - prevents all content from loading on initial page load
 * Each function returns a Promise resolving to that data slice for the role
 */

export async function loadRoleMarkdownContent(roleFileName) {
  const { roleMarkdownContent } = await import('../markdownContent.js')
  return roleMarkdownContent[roleFileName] || {}
}

export async function loadRoleQuizzes(roleId) {
  const { quizzes } = await import('../quizzes.js')
  return quizzes[roleId] || {}
}

export async function loadRoleSkillDiagram(roleId) {
  const { skillDiagrams } = await import('../skillDiagrams.js')
  return skillDiagrams[roleId] || null
}

export async function loadRoleCodeSandbox(roleId) {
  const { codeSandboxExamples } = await import('../codeSandboxExamples.js')
  return codeSandboxExamples[roleId] || null
}

export async function loadRoleLabs(roleId) {
  const { interactiveLabs } = await import('../interactiveLabs.js')
  return interactiveLabs.filter(l => l.roleId === roleId)
}

export async function loadRoleSetupGuide(roleId) {
  const { devSetupGuides } = await import('../devSetupGuides.js')
  return devSetupGuides[roleId] || null
}
