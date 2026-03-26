/**
 * Notification utilities for push subscriptions and study reminders.
 */

// ── Permission ─────────────────────────────────────────────────────────

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  return Notification.requestPermission()
}

// ── Push Subscription ──────────────────────────────────────────────────

export async function subscribeToPush(supabase, userId) {
  const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
  if (!vapidKey || !navigator.serviceWorker) return null

  const reg = await navigator.serviceWorker.ready
  let sub = await reg.pushManager.getSubscription()

  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    })
  }

  const { endpoint, keys } = sub.toJSON()

  if (supabase) {
    await supabase.from('push_subscriptions').upsert(
      { user_id: userId, endpoint, p256dh: keys.p256dh, auth: keys.auth },
      { onConflict: 'user_id,endpoint' }
    )
  }

  return sub
}

export async function unsubscribeFromPush(supabase, userId) {
  if (!navigator.serviceWorker) return

  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  if (sub) {
    const { endpoint } = sub.toJSON()
    await sub.unsubscribe()
    if (supabase) {
      await supabase.from('push_subscriptions').delete().match({ user_id: userId, endpoint })
    }
  }
}

// ── Preferences ────────────────────────────────────────────────────────

export async function getNotificationPreferences(supabase, userId) {
  if (!supabase) return null
  try {
    const query = supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
    // .single() may not exist on mock clients
    const { data } = typeof query.single === 'function' ? await query.single() : await query
    return Array.isArray(data) ? data[0] || null : data
  } catch {
    return null
  }
}

export async function updateNotificationPreferences(supabase, userId, prefs) {
  if (!supabase) return
  await supabase.from('notification_preferences').upsert(
    { user_id: userId, ...prefs, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  )
}

// ── Service Worker Reminder Scheduling ─────────────────────────────────

export async function sendReminderConfigToSW(config) {
  const reg = await navigator.serviceWorker?.ready
  if (!reg?.active) return
  reg.active.postMessage({
    type: config ? 'SET_REMINDER' : 'CLEAR_REMINDER',
    config,
  })
}

// ── Helpers ────────────────────────────────────────────────────────────

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
