/**
 * Progress Storage — Interactive Lab Progress
 */

import { getProgress, saveProgress } from './core.js'

export function getLabProgress(labId) {
  const allProgress = getProgress()
  return allProgress.labs?.[labId] ?? null
}

export function setLabStepComplete(labId, stepIndex, complete = true) {
  const progress = getProgress()
  if (!progress.labs) progress.labs = {}
  if (!progress.labs[labId]) {
    progress.labs[labId] = { steps: [], startedAt: null }
  }

  const labProgress = progress.labs[labId]
  while (labProgress.steps.length <= stepIndex) {
    labProgress.steps.push({ completed: false, completedAt: null })
  }
  labProgress.steps[stepIndex] = {
    completed: complete,
    completedAt: complete ? new Date().toISOString() : null,
  }
  if (!labProgress.startedAt) {
    labProgress.startedAt = new Date().toISOString()
  }

  return saveProgress(progress)
}

export function getAllLabProgress() {
  return getProgress().labs || {}
}
