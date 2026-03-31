/**
 * Progress Storage — Core
 * Shared primitives: storage key, read/write, initial structures, and
 * generic helpers used by roleProgress, languageProgress, and supabaseSync.
 */

const STORAGE_KEY = 'tech-hubben-learning-progress'
const LEGACY_STORAGE_KEY = 'tech-hub-learning-progress'

// Module-level cache to avoid redundant JSON parse/stringify on every call.
// Invalidated on every saveProgress() call.
let _progressCache = null

// Migrate legacy key on first load
;(function migrateLegacyStorage() {
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacy && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, legacy)
      localStorage.removeItem(LEGACY_STORAGE_KEY)
    }
  } catch {
    // ignore storage errors
  }
})()

function getInitialProgress() {
  return {
    roles: {},
    languages: {},
    labs: {},
    lastUpdated: new Date().toISOString(),
  }
}

export function getInitialRoleProgress() {
  return {
    beginner: { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null },
    mid:      { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null },
    senior:   { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null },
  }
}

export function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    _progressCache = stored ? JSON.parse(stored) : getInitialProgress()
    return _progressCache
  } catch (error) {
    console.warn('Failed to retrieve progress from localStorage:', error)
    return getInitialProgress()
  }
}

export function saveProgress(progress) {
  try {
    progress.lastUpdated = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    _progressCache = progress
    return true
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error)
    return false
  }
}

// ─── Shared internal helpers ───────────────────────────────────────────────

/** Ensure the section/id/level path exists in the progress object. Returns the level data. */
export function ensureLevelData(progress, section, id, level) {
  if (!progress[section]) progress[section] = {}
  if (!progress[section][id]) progress[section][id] = getInitialRoleProgress()
  if (!progress[section][id][level]) {
    progress[section][id][level] = {
      objectives: [], resources: [], quizScore: null,
      completed: false, startedAt: null, completedAt: null,
    }
  }
  return progress[section][id][level]
}

/**
 * Generic writer for objective or resource completion.
 * Pads the array to the index, sets the item, updates startedAt, and
 * recalculates the level's completed flag.
 */
export function setItemComplete(progress, section, id, level, field, index, complete) {
  const levelData = ensureLevelData(progress, section, id, level)

  if (!levelData[field]) levelData[field] = []
  while (levelData[field].length <= index) {
    levelData[field].push({ completed: false, completedAt: null })
  }
  levelData[field][index] = {
    completed: complete,
    completedAt: complete ? new Date().toISOString() : null,
  }

  if (!levelData.startedAt) levelData.startedAt = new Date().toISOString()

  const allObjectivesComplete = (levelData.objectives || []).every(o => o.completed)
  const allResourcesComplete  = (levelData.resources  || []).every(r => r.completed)
  const hasObjectives = (levelData.objectives || []).length > 0
  const hasResources  = (levelData.resources  || []).length > 0

  if (allObjectivesComplete && allResourcesComplete && hasObjectives && hasResources) {
    levelData.completed = true
    levelData.completedAt = new Date().toISOString()
  } else if (!allObjectivesComplete || !allResourcesComplete) {
    levelData.completed = false
    levelData.completedAt = null
  }

  return saveProgress(progress)
}

/** Shared quiz score writer (role or language). */
export function setQuizScoreInternal(section, id, level, score) {
  const progress = getProgress()
  const levelData = ensureLevelData(progress, section, id, level)
  levelData.quizScore = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

/** Shared topic quiz score writer (role or language). */
export function setTopicScoreInternal(section, id, level, topicId, score) {
  const progress = getProgress()
  const levelData = ensureLevelData(progress, section, id, level)
  if (!levelData.topicQuizzes) levelData.topicQuizzes = {}
  levelData.topicQuizzes[topicId] = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

/** Shared level exam score writer (role or language). */
export function setExamScoreInternal(section, id, level, score) {
  const progress = getProgress()
  const levelData = ensureLevelData(progress, section, id, level)
  levelData.levelExam = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

// ─── Shared percentage calculation ────────────────────────────────────────

function calculateLevelStats(levelData) {
  const objectives = levelData.objectives || []
  const resources  = levelData.resources  || []
  const completedObjectives = objectives.filter(o => o.completed).length
  const completedResources  = resources.filter(r => r.completed).length

  let total     = objectives.length + resources.length
  let completed = completedObjectives + completedResources

  // Assessments are only weighted in if the level has been started
  if (total > 0) {
    total += 2
    if (levelData.quizScore) completed += 2

    const topicQuizzes = levelData.topicQuizzes || {}
    if (Object.keys(topicQuizzes).length > 0) { total += 2; completed += 2 }

    total += 2
    if (levelData.levelExam) completed += 2
  }

  return {
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    objectives: { completed: completedObjectives, total: objectives.length },
    resources:  { completed: completedResources,  total: resources.length },
    total,
    completed,
  }
}

/**
 * Generic progress calculator for roles or languages.
 * Returns { beginner, mid, senior, overall } with percentage and sub-stats,
 * or null if the entity has no stored progress.
 */
export function getEntityProgress(section, id) {
  const allProgress = getProgress()
  const entityData  = allProgress[section]?.[id]
  if (!entityData) return null

  const result = {}
  let totalItems     = 0
  let completedItems = 0

  for (const level of ['beginner', 'mid', 'senior']) {
    const levelData = entityData[level] || {}
    const stats     = calculateLevelStats(levelData)

    result[level] = {
      percentage:  stats.percentage,
      objectives:  stats.objectives,
      resources:   stats.resources,
      quizScore:   levelData.quizScore   ?? null,
      topicQuizzes: levelData.topicQuizzes ?? null,
      levelExam:   levelData.levelExam   ?? null,
      completed:   levelData.completed   ?? false,
      startedAt:   levelData.startedAt   ?? null,
      completedAt: levelData.completedAt ?? null,
    }

    totalItems     += stats.total
    completedItems += stats.completed
  }

  result.overall = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  return result
}
