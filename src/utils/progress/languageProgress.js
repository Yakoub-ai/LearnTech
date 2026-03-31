/**
 * Progress Storage — Language Progress
 * All language-specific CRUD and percentage queries.
 * Mirrors the role progress structure using the shared generic helpers.
 */

import {
  getProgress,
  getEntityProgress,
  setQuizScoreInternal,
  setTopicScoreInternal,
  setExamScoreInternal,
} from './core.js'

// ─── Read ──────────────────────────────────────────────────────────────────

/**
 * Get progress for a specific language.
 * Returns { beginner, mid, senior, overall } with per-level percentages,
 * or null if the language has no stored progress.
 */
export function getLanguageProgress(languageId) {
  return getEntityProgress('languages', languageId)
}

// ─── Write ─────────────────────────────────────────────────────────────────

export function setLanguageQuizScore(languageId, level, score) {
  return setQuizScoreInternal('languages', languageId, level, score)
}

export function setLanguageTopicQuizScore(languageId, level, topicId, score) {
  return setTopicScoreInternal('languages', languageId, level, topicId, score)
}

export function setLanguageLevelExamScore(languageId, level, score) {
  return setExamScoreInternal('languages', languageId, level, score)
}

// ─── Completion helpers ────────────────────────────────────────────────────

export function isLanguageLevelFullyComplete(languageId, level) {
  const progress = getLanguageProgress(languageId)
  if (!progress?.[level]) return false
  const lp = progress[level]
  return lp.percentage >= 100 && lp.quizScore != null
}

export function getLanguageLevelStats(languageId, level) {
  const allProgress = getProgress()
  const langData    = allProgress.languages?.[languageId]?.[level]
  if (!langData) return null
  const objectives = langData.objectives || []
  const resources  = langData.resources  || []
  return {
    objectives:  { completed: objectives.filter(o => o.completed).length, total: objectives.length },
    resources:   { completed: resources.filter(r => r.completed).length,  total: resources.length  },
    quizScore:   langData.quizScore?.score ?? null,
    completedAt: langData.completedAt      || null,
  }
}
