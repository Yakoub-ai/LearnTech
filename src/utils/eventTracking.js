/**
 * Event Tracking Utility
 * Fire-and-forget event logging to Supabase user_events table.
 * Never throws, never blocks UI.
 */

/**
 * Track a user event
 * @param {object} supabase - Supabase client (or null if not configured)
 * @param {string|null} userId - The authenticated user's UUID
 * @param {string} eventType - 'page_view' | 'role_visit' | 'quiz_complete' | 'resource_click' | 'tab_switch'
 * @param {object} eventData - Arbitrary metadata (roleId, level, score, path, etc.)
 */
export async function trackEvent(supabase, userId, eventType, eventData = {}) {
  if (!supabase || !userId) return
  try {
    await supabase.from('user_events').insert({
      user_id: userId,
      event_type: eventType,
      event_data: eventData,
    })
  } catch {
    // Intentionally swallowed — analytics must never break the app
  }
}
