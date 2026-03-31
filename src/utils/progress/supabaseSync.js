/**
 * Progress Storage — Supabase Sync
 *
 * Dual-write layer: localStorage is the source of truth; Supabase is a
 * cloud backup for multi-device sync. All functions here are fire-and-forget
 * — they never throw and never block the UI.
 *
 * Sync flow on login:
 *   1. pullAndMergeFromSupabase() — remote wins on timestamp ties
 *   2. syncAllProgressToSupabase() — push merged local state
 *
 * Per-update sync is handled by the useProgress / useLanguageProgress hooks
 * using a 400ms debounce per item key, so rapid clicks produce a single write.
 */

import { getLanguageById } from '../../data/languages.js'
import { getProgress, saveProgress, getInitialRoleProgress, ensureLevelData } from './core.js'

/**
 * Upsert a single progress item to Supabase.
 * Called after each localStorage write when the user is authenticated.
 *
 * @param {object} supabase  - Supabase client
 * @param {string} userId    - Auth user UUID
 * @param {string} roleId    - Role or language ID
 * @param {string} level     - 'beginner' | 'mid' | 'senior'
 * @param {string} type      - 'objective' | 'resource' | 'quiz' | 'topic_quiz' | 'level_exam'
 * @param {string} itemKey   - Item index as string, 'score', or topic slug
 * @param {object} value     - { completed } or { score, scoredAt }
 */
export async function syncProgressItemToSupabase(supabase, userId, roleId, level, type, itemKey, value) {
  if (!supabase || !userId) return
  try {
    await supabase.from('user_progress').upsert(
      { user_id: userId, role_id: roleId, level, type, item_key: itemKey, value, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,role_id,level,type,item_key' }
    )
  } catch {
    // fire and forget — sync failures must never break the app
  }
}

/**
 * Bulk-sync all localStorage progress to Supabase.
 * Called once on login to backfill progress accumulated before login.
 * Batches in chunks of 100 to stay within Supabase request limits.
 */
export async function syncAllProgressToSupabase(supabase, userId) {
  if (!supabase || !userId) return
  try {
    const allProgress = getProgress()
    const rows = []
    const now  = new Date().toISOString()

    const processSection = (sectionData) => {
      for (const [roleId, roleData] of Object.entries(sectionData || {})) {
        for (const level of ['beginner', 'mid', 'senior']) {
          const levelData = roleData[level]
          if (!levelData) continue

          ;(levelData.objectives || []).forEach((obj, i) => {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'objective', item_key: String(i), value: obj, updated_at: now })
          })

          ;(levelData.resources || []).forEach((res, i) => {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'resource', item_key: String(i), value: res, updated_at: now })
          })

          if (levelData.quizScore) {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'quiz', item_key: 'score', value: levelData.quizScore, updated_at: now })
          }

          for (const [topicId, topicData] of Object.entries(levelData.topicQuizzes || {})) {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'topic_quiz', item_key: topicId, value: topicData, updated_at: now })
          }

          if (levelData.levelExam) {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'level_exam', item_key: 'score', value: levelData.levelExam, updated_at: now })
          }
        }
      }
    }

    processSection(allProgress.roles)
    processSection(allProgress.languages)

    if (rows.length === 0) return

    for (let i = 0; i < rows.length; i += 100) {
      await supabase.from('user_progress').upsert(
        rows.slice(i, i + 100),
        { onConflict: 'user_id,role_id,level,type,item_key' }
      )
    }
  } catch {
    // fire and forget
  }
}

/**
 * Pull all progress rows from Supabase and merge into localStorage.
 * Called once on login BEFORE pushing, so Device B never overwrites Device A's data.
 * Uses timestamp comparison — the newer value always wins.
 */
export async function pullAndMergeFromSupabase(supabase, userId) {
  if (!supabase || !userId) return
  try {
    const { data: rows, error } = await supabase
      .from('user_progress')
      .select('role_id, level, type, item_key, value, updated_at')
      .eq('user_id', userId)

    if (error || !rows || rows.length === 0) return

    const progress = getProgress()
    if (!progress.roles)     progress.roles     = {}
    if (!progress.languages) progress.languages = {}

    for (const row of rows) {
      const { role_id, level, type, item_key, value, updated_at } = row

      // Classify the row: known language IDs go to 'languages', everything else to 'roles'
      const section  = getLanguageById(role_id) ? 'languages' : 'roles'
      const levelData = ensureLevelData(progress, section, role_id, level)

      if (type === 'objective') {
        if (!levelData.objectives) levelData.objectives = []
        const idx = parseInt(item_key, 10)
        while (levelData.objectives.length <= idx) {
          levelData.objectives.push({ completed: false, completedAt: null })
        }
        const local       = levelData.objectives[idx]
        const remoteNewer = !local.completedAt || (updated_at && updated_at > local.completedAt)
        if (remoteNewer || (!local.completed && value.completed)) {
          levelData.objectives[idx] = value
        }

      } else if (type === 'resource') {
        if (!levelData.resources) levelData.resources = []
        const idx = parseInt(item_key, 10)
        while (levelData.resources.length <= idx) {
          levelData.resources.push({ completed: false, completedAt: null })
        }
        const local       = levelData.resources[idx]
        const remoteNewer = !local.completedAt || (updated_at && updated_at > local.completedAt)
        if (remoteNewer || (!local.completed && value.completed)) {
          levelData.resources[idx] = value
        }

      } else if (type === 'quiz') {
        const local       = levelData.quizScore
        const remoteNewer = !local || !local.scoredAt || (updated_at && updated_at > local.scoredAt)
        if (remoteNewer) levelData.quizScore = value

      } else if (type === 'topic_quiz') {
        if (!levelData.topicQuizzes) levelData.topicQuizzes = {}
        const local       = levelData.topicQuizzes[item_key]
        const remoteNewer = !local || !local.scoredAt || (updated_at && updated_at > local.scoredAt)
        if (remoteNewer) levelData.topicQuizzes[item_key] = value

      } else if (type === 'level_exam') {
        const local       = levelData.levelExam
        const remoteNewer = !local || !local.scoredAt || (updated_at && updated_at > local.scoredAt)
        if (remoteNewer) levelData.levelExam = value
      }
    }

    saveProgress(progress)
  } catch {
    // never block login on a sync failure
  }
}
