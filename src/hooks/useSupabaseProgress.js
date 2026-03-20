import { useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Debounced Supabase progress write hook
 * Writes to Supabase with 500ms debounce to avoid excessive API calls
 */
export function useSupabaseProgress(userId) {
  const debounceTimers = useRef({})

  const upsertProgress = useCallback(async (params) => {
    if (!supabase || !userId) return

    const { category, itemId, level, itemType, itemIndex, completed } = params

    const { error } = await supabase.from('progress').upsert({
      user_id: userId,
      category,
      item_id: itemId,
      level,
      item_type: itemType,
      item_index: itemIndex,
      completed,
      completed_at: completed ? new Date().toISOString() : null
    }, { onConflict: 'user_id,category,item_id,level,item_type,item_index' })

    if (error) console.error('Supabase progress upsert error:', error)
  }, [userId])

  const debouncedUpsert = useCallback((params) => {
    const key = `${params.category}-${params.itemId}-${params.level}-${params.itemType}-${params.itemIndex}`
    clearTimeout(debounceTimers.current[key])
    debounceTimers.current[key] = setTimeout(() => upsertProgress(params), 500)
  }, [upsertProgress])

  const saveQuizScoreToCloud = useCallback(async ({ category, itemId, level, score }) => {
    if (!supabase || !userId) return

    const { error } = await supabase.from('quiz_scores').upsert({
      user_id: userId,
      category,
      item_id: itemId,
      level,
      score,
      scored_at: new Date().toISOString()
    }, { onConflict: 'user_id,category,item_id,level' })

    if (error) console.error('Supabase quiz score upsert error:', error)
  }, [userId])

  const saveLabProgressToCloud = useCallback(async ({ labId, stepIndex, completed }) => {
    if (!supabase || !userId) return

    const { error } = await supabase.from('lab_progress').upsert({
      user_id: userId,
      lab_id: labId,
      step_index: stepIndex,
      completed,
      completed_at: completed ? new Date().toISOString() : null
    }, { onConflict: 'user_id,lab_id,step_index' })

    if (error) console.error('Supabase lab progress upsert error:', error)
  }, [userId])

  async function loadProgressFromCloud() {
    if (!supabase || !userId) return null

    const [progressResult, quizResult, labResult] = await Promise.all([
      supabase.from('progress').select('*').eq('user_id', userId),
      supabase.from('quiz_scores').select('*').eq('user_id', userId),
      supabase.from('lab_progress').select('*').eq('user_id', userId)
    ])

    if (progressResult.error || quizResult.error || labResult.error) {
      console.error('Error loading progress from cloud')
      return null
    }

    return {
      progress: progressResult.data,
      quizScores: quizResult.data,
      labProgress: labResult.data
    }
  }

  return { debouncedUpsert, saveQuizScoreToCloud, saveLabProgressToCloud, loadProgressFromCloud }
}
