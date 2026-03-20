import { useState, useCallback } from 'react'
import {
  getProgress,
  setObjectiveComplete,
  setResourceComplete,
  setQuizScore,
  getRoleProgress as getStoredRoleProgress,
} from '../../utils/progressStorage'

const emptyProgress = { beginner: 0, mid: 0, senior: 0, overall: 0 }

export default function useProgress(roleId) {
  const [, setTick] = useState(0)

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const toggleObjective = useCallback((level, index) => {
    const progress = getProgress()
    const current = progress?.roles?.[roleId]?.[level]?.objectives?.[index]?.completed || false
    setObjectiveComplete(roleId, level, index, !current)
    refresh()
  }, [roleId, refresh])

  const toggleResource = useCallback((level, index) => {
    const progress = getProgress()
    const current = progress?.roles?.[roleId]?.[level]?.resources?.[index]?.completed || false
    setResourceComplete(roleId, level, index, !current)
    refresh()
  }, [roleId, refresh])

  const saveQuizScore = useCallback((level, score) => {
    setQuizScore(roleId, level, score)
    refresh()
  }, [roleId, refresh])

  const isObjectiveComplete = useCallback((level, index) => {
    const progress = getProgress()
    return progress?.roles?.[roleId]?.[level]?.objectives?.[index]?.completed || false
  }, [roleId])

  const isResourceComplete = useCallback((level, index) => {
    const progress = getProgress()
    return progress?.roles?.[roleId]?.[level]?.resources?.[index]?.completed || false
  }, [roleId])

  const getQuizScoreValue = useCallback((level) => {
    const progress = getProgress()
    return progress?.roles?.[roleId]?.[level]?.quizScore?.score ?? null
  }, [roleId])

  const stored = getStoredRoleProgress(roleId)
  const roleProgress = stored
    ? {
        beginner: stored.beginner?.percentage || 0,
        mid: stored.mid?.percentage || 0,
        senior: stored.senior?.percentage || 0,
        overall: stored.overall || 0,
      }
    : emptyProgress

  return {
    roleProgress,
    toggleObjective,
    toggleResource,
    saveQuizScore,
    isObjectiveComplete,
    isResourceComplete,
    getQuizScoreValue,
    refresh,
  }
}
