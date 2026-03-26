const CACHE_NAME = 'techhubb-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/icons/apple-touch-icon-180x180.png',
  '/icons/pwa-192x192.png',
  '/icons/pwa-512x512.png',
]

// ── Install: pre-cache shell ────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// ── Activate: clean old caches ──────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// ── Fetch: network-first for navigations & API, cache-first for assets ──
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip Supabase auth endpoints (tokens should never be cached)
  if (url.hostname.endsWith('.supabase.co') && url.pathname.startsWith('/auth/')) return

  // Fonts & images: cache-first
  if (
    request.destination === 'font' ||
    request.destination === 'image' ||
    url.pathname.startsWith('/fonts/')
  ) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
      )
    )
    return
  }

  // Navigation requests: network-first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/'))
    )
    return
  }

  // JS/CSS assets (hashed filenames): cache-first
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
      )
    )
    return
  }

  // Everything else: network-first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
      .catch(() => caches.match(request))
  )
})

// ── Study Reminder Scheduling ───────────────────────────────────────────

let reminderTimeoutId = null

function scheduleNextReminder(config) {
  if (reminderTimeoutId) clearTimeout(reminderTimeoutId)
  if (!config || !config.enabled) return

  const { time, days } = config
  const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const now = new Date()
  const [hours, minutes] = time.split(':').map(Number)

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
      scheduleNextReminder(config)
    }, ms)
    break
  }
}

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SET_REMINDER') {
    scheduleNextReminder(event.data.config)
  }
  if (event.data?.type === 'CLEAR_REMINDER') {
    if (reminderTimeoutId) clearTimeout(reminderTimeoutId)
    reminderTimeoutId = null
  }
})

// ── Push Notifications ──────────────────────────────────────────────────

self.addEventListener('push', (event) => {
  const data = event.data?.json?.() ?? {}
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
