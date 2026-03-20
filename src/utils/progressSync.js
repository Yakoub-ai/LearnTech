import { supabase } from '../lib/supabase'
import { getProgress, saveProgress } from './progressStorage'

/**
 * Extracts the boolean completed value from a progress item.
 * localStorage stores items as objects { completed, completedAt } but may
 * contain legacy plain booleans; handle both gracefully.
 */
function isCompleted(item) {
  if (typeof item === 'boolean') return item
  if (item && typeof item === 'object') return !!item.completed
  return false
}

/**
 * Merges localStorage progress into Supabase on first login.
 * Supabase is source of truth; localStorage data only used to fill gaps.
 */
export async function syncLocalProgressToCloud(userId) {
  if (!supabase || !userId) return

  const local = getProgress()
  if (!local) return

  const rows = []

  // Convert localStorage format to Supabase rows
  for (const [roleId, roleData] of Object.entries(local.roles || {})) {
    for (const [level, levelData] of Object.entries(roleData)) {
      if (!levelData) continue
      ;(levelData.objectives || []).forEach((item, index) => {
        const completed = isCompleted(item)
        rows.push({ user_id: userId, category: 'role', item_id: roleId, level, item_type: 'objective', item_index: index, completed, completed_at: completed ? new Date().toISOString() : null })
      })
      ;(levelData.resources || []).forEach((item, index) => {
        const completed = isCompleted(item)
        rows.push({ user_id: userId, category: 'role', item_id: roleId, level, item_type: 'resource', item_index: index, completed, completed_at: completed ? new Date().toISOString() : null })
      })
    }
  }

  for (const [langId, langData] of Object.entries(local.languages || {})) {
    for (const [level, levelData] of Object.entries(langData)) {
      if (!levelData) continue
      ;(levelData.objectives || []).forEach((item, index) => {
        const completed = isCompleted(item)
        rows.push({ user_id: userId, category: 'language', item_id: langId, level, item_type: 'objective', item_index: index, completed, completed_at: completed ? new Date().toISOString() : null })
      })
      ;(levelData.resources || []).forEach((item, index) => {
        const completed = isCompleted(item)
        rows.push({ user_id: userId, category: 'language', item_id: langId, level, item_type: 'resource', item_index: index, completed, completed_at: completed ? new Date().toISOString() : null })
      })
    }
  }

  if (rows.length === 0) return

  const { error } = await supabase.from('progress').upsert(rows, {
    onConflict: 'user_id,category,item_id,level,item_type,item_index',
    ignoreDuplicates: true  // Don't overwrite cloud data with local data
  })

  if (error) console.error('Error syncing local progress to cloud:', error)
}

/**
 * Loads progress from Supabase and merges into localStorage format.
 * Used to populate localStorage cache after login.
 */
export async function syncCloudProgressToLocal(userId) {
  if (!supabase || !userId) return

  const { data, error } = await supabase.from('progress').select('*').eq('user_id', userId)
  if (error || !data) return

  const progress = getProgress() || { roles: {}, languages: {}, labs: {}, lastUpdated: new Date().toISOString() }

  for (const row of data) {
    const { category, item_id, level, item_type, item_index, completed, completed_at } = row
    const target = category === 'role' ? progress.roles : progress.languages
    if (!target[item_id]) target[item_id] = {}
    if (!target[item_id][level]) target[item_id][level] = { objectives: [], resources: [], quizScore: null }
    const arr = item_type === 'objective' ? target[item_id][level].objectives : target[item_id][level].resources
    // Write in the same format progressStorage uses: { completed, completedAt }
    arr[item_index] = { completed: !!completed, completedAt: completed_at ?? null }
  }

  progress.lastUpdated = new Date().toISOString()
  saveProgress(progress)
}
