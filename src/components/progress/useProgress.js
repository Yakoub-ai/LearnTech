import { useState, useCallback, useRef, useEffect } from 'react'
import {
  getProgress,
  setObjectiveComplete,
  setResourceComplete,
  setQuizScore,
  setTopicQuizScore,
  setLevelExamScore,
  getRoleProgress as getStoredRoleProgress,
  syncProgressItemToSupabase,
} from '../../utils/progressStorage'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const emptyProgress = { beginner: 0, mid: 0, senior: 0, overall: 0 }
const SYNC_DEBOUNCE_MS = 400

export default function useProgress(roleId) {
  const [, setTick] = useState(0)
  const { user } = useAuth()
  // Map of "roleId:level:type:itemId" → timeout ID. Coalesces rapid sync calls
  // for the same item so only the final state reaches Supabase.
  const pendingSyncs = useRef({})

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const debouncedSync = useCallback((level, type, itemId, data) => {
    if (!user?.id) return
    const key = `${roleId}:${level}:${type}:${itemId}`
    clearTimeout(pendingSyncs.current[key]?.timeoutId)
    const fn = () => syncProgressItemToSupabase(supabase, user.id, roleId, level, type, itemId, data)
    pendingSyncs.current[key] = {
      timeoutId: setTimeout(() => {
        delete pendingSyncs.current[key]
        fn()
      }, SYNC_DEBOUNCE_MS),
      fn,
    }
  }, [roleId, user])

  // Flush all pending debounced syncs immediately when the tab is closing,
  // so progress isn't lost during the 400ms debounce window.
  useEffect(() => {
    const flush = () => {
      for (const [key, entry] of Object.entries(pendingSyncs.current)) {
        clearTimeout(entry.timeoutId)
        entry.fn()
        delete pendingSyncs.current[key]
      }
    }
    window.addEventListener('beforeunload', flush)
    return () => window.removeEventListener('beforeunload', flush)
  }, [])

  const toggleObjective = useCallback((level, index) => {
    const progress = getProgress()
    const current = progress?.roles?.[roleId]?.[level]?.objectives?.[index]?.completed || false
    const newCompleted = !current
    setObjectiveComplete(roleId, level, index, newCompleted)
    debouncedSync(level, 'objective', String(index), { completed: newCompleted, completedAt: newCompleted ? new Date().toISOString() : null })
    refresh()
  }, [roleId, refresh, debouncedSync])

  const toggleResource = useCallback((level, index) => {
    const progress = getProgress()
    const current = progress?.roles?.[roleId]?.[level]?.resources?.[index]?.completed || false
    const newCompleted = !current
    setResourceComplete(roleId, level, index, newCompleted)
    debouncedSync(level, 'resource', String(index), { completed: newCompleted, completedAt: newCompleted ? new Date().toISOString() : null })
    refresh()
  }, [roleId, refresh, debouncedSync])

  const saveQuizScore = useCallback((level, score) => {
    setQuizScore(roleId, level, score)
    debouncedSync(level, 'quiz', 'score', { score, scoredAt: new Date().toISOString() })
    refresh()
  }, [roleId, refresh, debouncedSync])

  // completeTopicQuiz: saves topic quiz score AND auto-marks the mapped objective complete
  const completeTopicQuiz = useCallback((level, topicId, objectiveIndex, score) => {
    const now = new Date().toISOString()
    setTopicQuizScore(roleId, level, topicId, score)
    setObjectiveComplete(roleId, level, objectiveIndex, true)
    debouncedSync(level, 'topic_quiz', topicId, { score, scoredAt: now })
    debouncedSync(level, 'objective', String(objectiveIndex), { completed: true, completedAt: now })
    refresh()
  }, [roleId, refresh, debouncedSync])

  const saveLevelExamScore = useCallback((level, score) => {
    setLevelExamScore(roleId, level, score)
    debouncedSync(level, 'level_exam', 'score', { score, scoredAt: new Date().toISOString() })
    refresh()
  }, [roleId, refresh, debouncedSync])

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

  const getTopicQuizScore = useCallback((level, topicId) => {
    const progress = getProgress()
    return progress?.roles?.[roleId]?.[level]?.topicQuizzes?.[topicId]?.score ?? null
  }, [roleId])

  const getLevelExamScore = useCallback((level) => {
    const progress = getProgress()
    return progress?.roles?.[roleId]?.[level]?.levelExam?.score ?? null
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
    completeTopicQuiz,
    saveLevelExamScore,
    isObjectiveComplete,
    isResourceComplete,
    getQuizScoreValue,
    getTopicQuizScore,
    getLevelExamScore,
    refresh,
  }
}
