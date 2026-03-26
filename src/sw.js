import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// Precache all Vite-built assets
precacheAndRoute(self.__WB_MANIFEST)

// Cache fonts (CacheFirst, 1 year)
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxAgeSeconds: 365 * 24 * 60 * 60 }),
    ],
  })
)

// Cache images (CacheFirst, 30 days)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
)

// Cache Supabase API GET requests (NetworkFirst, 1 hour)
registerRoute(
  ({ url }) => url.hostname.endsWith('.supabase.co') && url.pathname.startsWith('/rest/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 }),
    ],
    networkTimeoutSeconds: 5,
  }),
  'GET'
)

// ── Study Reminder Scheduling ──────────────────────────────────────────

let reminderTimeoutId = null

function scheduleNextReminder(config) {
  if (reminderTimeoutId) clearTimeout(reminderTimeoutId)
  if (!config || !config.enabled) return

  const { time, days } = config // time = "HH:MM", days = ["mon","tue",...]
  const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const now = new Date()
  const [hours, minutes] = time.split(':').map(Number)

  // Find the next occurrence
  for (let offset = 0; offset <= 7; offset++) {
    const target = new Date(now)
    target.setDate(target.getDate() + offset)
    target.setHours(hours, minutes, 0, 0)

    if (target <= now) continue
    const dayName = dayMap[target.getDay()]
    if (!days.includes(dayName)) continue

    const ms = target - now
    reminderTimeoutId = setTimeout(() => {
      self.registration.showNotification('Time to study!', {
        body: 'Your daily study session is waiting. Keep your streak going!',
        icon: '/icons/pwa-192x192.png',
        badge: '/icons/pwa-192x192.png',
        tag: 'study-reminder',
        data: { url: '/dashboard' },
      })
      // Schedule the next one
      scheduleNextReminder(config)
    }, ms)
    break
  }
}

// Listen for messages from the app to update reminder config
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SET_REMINDER') {
    scheduleNextReminder(event.data.config)
  }
  if (event.data?.type === 'CLEAR_REMINDER') {
    if (reminderTimeoutId) clearTimeout(reminderTimeoutId)
    reminderTimeoutId = null
  }
})

// ── Push Notifications ─────────────────────────────────────────────────

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || 'Tech Hubben'
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/pwa-192x192.png',
    badge: '/icons/pwa-192x192.png',
    tag: data.tag || 'general',
    data: { url: data.url || '/dashboard' },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/dashboard'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(url))
      if (existing) return existing.focus()
      return self.clients.openWindow(url)
    })
  )
})
