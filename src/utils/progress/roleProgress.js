/**
 * Progress Storage — Role Progress
 * All role-specific CRUD, percentage queries, and helpers.
 */

import {
  getProgress,
  saveProgress,
  getInitialRoleProgress,
  getEntityProgress,
  ensureLevelData,
  setItemComplete,
  setQuizScoreInternal,
  setTopicScoreInternal,
  setExamScoreInternal,
} from './core.js'

// ─── Read ──────────────────────────────────────────────────────────────────

/**
 * Get progress for a specific role.
 * Returns { beginner, mid, senior, overall } with per-level percentages and
 * sub-stats, or null if the role has no stored progress.
 */
export function getRoleProgress(roleId) {
  return getEntityProgress('roles', roleId)
}

export function getAllProgress() {
  const allProgress = getProgress()
  const result = {}
  for (const roleId of Object.keys(allProgress.roles || {})) {
    result[roleId] = getRoleProgress(roleId)
  }
  return result
}

export function getObjectiveProgress(roleId, level, objectiveIndex) {
  const progress = getProgress()
  return progress.roles?.[roleId]?.[level]?.objectives?.[objectiveIndex] ?? null
}

export function getResourceProgress(roleId, level, resourceIndex) {
  const progress = getProgress()
  return progress.roles?.[roleId]?.[level]?.resources?.[resourceIndex] ?? null
}

// ─── Write ─────────────────────────────────────────────────────────────────

export function setObjectiveComplete(roleId, level, objectiveIndex, complete = true) {
  return setItemComplete(getProgress(), 'roles', roleId, level, 'objectives', objectiveIndex, complete)
}

export function setResourceComplete(roleId, level, resourceIndex, complete = true) {
  return setItemComplete(getProgress(), 'roles', roleId, level, 'resources', resourceIndex, complete)
}

export function setQuizScore(roleId, level, score) {
  return setQuizScoreInternal('roles', roleId, level, score)
}

export function setTopicQuizScore(roleId, level, topicId, score) {
  return setTopicScoreInternal('roles', roleId, level, topicId, score)
}

export function setLevelExamScore(roleId, level, score) {
  return setExamScoreInternal('roles', roleId, level, score)
}

export function bulkUpdateProgress(roleId, level, updates) {
  const progress  = getProgress()
  const levelData = ensureLevelData(progress, 'roles', roleId, level)
  const now       = new Date().toISOString()

  for (const { type, index, completed } of updates) {
    const field = type === 'objective' ? 'objectives' : type === 'resource' ? 'resources' : null
    if (!field) continue
    if (!levelData[field]) levelData[field] = []
    while (levelData[field].length <= index) {
      levelData[field].push({ completed: false, completedAt: null })
    }
    levelData[field][index] = { completed, completedAt: completed ? now : null }
  }

  if (!levelData.startedAt) levelData.startedAt = now

  return saveProgress(progress)
}

// ─── Reset ─────────────────────────────────────────────────────────────────

export function resetProgress(roleId) {
  const progress = getProgress()
  if (progress.roles?.[roleId]) {
    progress.roles[roleId] = getInitialRoleProgress()
    return saveProgress(progress)
  }
  return true
}

export function resetAllProgress() {
  try {
    localStorage.removeItem('tech-hubben-learning-progress')
    return true
  } catch (error) {
    console.warn('Failed to reset progress:', error)
    return false
  }
}

// ─── Completion helpers ────────────────────────────────────────────────────

/**
 * A level is "fully complete" when percentage is 100 AND the quiz has been taken.
 * Used by the dashboard to decide whether to compact a level into a showcase card.
 */
export function isLevelFullyComplete(roleId, level) {
  const progress = getRoleProgress(roleId)
  if (!progress?.[level]) return false
  const lp = progress[level]
  return lp.percentage >= 100 && lp.quizScore != null
}

/**
 * Returns { objectives, resources, quizScore, completedAt } for the completed
 * level showcase display, or null if no progress exists.
 */
export function getLevelStats(roleId, level) {
  const allProgress = getProgress()
  const roleData    = allProgress.roles?.[roleId]?.[level]
  if (!roleData) return null
  const progress = getRoleProgress(roleId)
  if (!progress?.[level]) return null
  return {
    objectives: progress[level].objectives || { completed: 0, total: 0 },
    resources:  progress[level].resources  || { completed: 0, total: 0 },
    quizScore:  roleData.quizScore?.score  ?? null,
    completedAt: roleData.completedAt      || null,
  }
}

// ─── Export / Import ───────────────────────────────────────────────────────

export function exportProgressData() {
  return JSON.stringify(getProgress(), null, 2)
}

export function importProgressData(jsonData) {
  try {
    const data = JSON.parse(jsonData)
    if (
      typeof data !== 'object' || data === null ||
      typeof data.roles !== 'object' ||
      typeof data.languages !== 'object' ||
      typeof data.labs !== 'object'
    ) {
      console.warn('Invalid progress data structure')
      return false
    }
    localStorage.setItem('tech-hubben-learning-progress', JSON.stringify(data))
    return true
  } catch (error) {
    console.warn('Failed to import progress data:', error)
    return false
  }
}
