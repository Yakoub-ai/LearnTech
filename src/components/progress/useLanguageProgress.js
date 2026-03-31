import { useState, useCallback, useRef, useEffect } from 'react'
import {
  setLanguageQuizScore,
  setLanguageTopicQuizScore,
  setLanguageLevelExamScore,
  getLanguageProgress,
  syncProgressItemToSupabase,
} from '../../utils/progressStorage'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const emptyProgress = { beginner: 0, mid: 0, senior: 0, overall: 0 }
const SYNC_DEBOUNCE_MS = 400

export default function useLanguageProgress(languageId) {
  const [, setTick] = useState(0)
  const { user } = useAuth()
  const pendingSyncs = useRef({})

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const debouncedSync = useCallback((level, type, itemId, data) => {
    if (!user?.id) return
    const key = `${languageId}:${level}:${type}:${itemId}`
    clearTimeout(pendingSyncs.current[key]?.timeoutId)
    const fn = () => syncProgressItemToSupabase(supabase, user.id, languageId, level, type, itemId, data)
    pendingSyncs.current[key] = {
      timeoutId: setTimeout(() => {
        delete pendingSyncs.current[key]
        fn()
      }, SYNC_DEBOUNCE_MS),
      fn,
    }
  }, [languageId, user])

  // Flush all pending debounced syncs on tab close to avoid losing progress
  // during the 400ms debounce window.
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

  const saveQuizScore = useCallback((level, score) => {
    setLanguageQuizScore(languageId, level, score)
    debouncedSync(level, 'quiz', 'score', { score, scoredAt: new Date().toISOString() })
    refresh()
  }, [languageId, refresh, debouncedSync])

  const saveLevelExamScore = useCallback((level, score) => {
    setLanguageLevelExamScore(languageId, level, score)
    debouncedSync(level, 'level_exam', 'score', { score, scoredAt: new Date().toISOString() })
    refresh()
  }, [languageId, refresh, debouncedSync])

  const completeTopicQuiz = useCallback((level, topicId, score) => {
    setLanguageTopicQuizScore(languageId, level, topicId, score)
    debouncedSync(level, 'topic_quiz', topicId, { score, scoredAt: new Date().toISOString() })
    refresh()
  }, [languageId, refresh, debouncedSync])

  const stored = getLanguageProgress(languageId)
  const languageProgress = stored
    ? {
        beginner: stored.beginner?.percentage || 0,
        mid: stored.mid?.percentage || 0,
        senior: stored.senior?.percentage || 0,
        overall: stored.overall || 0,
      }
    : emptyProgress

  return {
    languageProgress,
    saveQuizScore,
    saveLevelExamScore,
    completeTopicQuiz,
    refresh,
  }
}
