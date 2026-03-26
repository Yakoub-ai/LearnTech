import { useState, useEffect, useCallback } from 'react'
import { Settings, Bell, BellOff, Clock, Calendar, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import {
  requestNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  getNotificationPreferences,
  updateNotificationPreferences,
  sendReminderConfigToSW,
} from '../utils/notifications'

const ALL_DAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
]

export default function SettingsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [permissionState, setPermissionState] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  )

  const [remindersEnabled, setRemindersEnabled] = useState(false)
  const [reminderTime, setReminderTime] = useState('18:00')
  const [reminderDays, setReminderDays] = useState(['mon', 'tue', 'wed', 'thu', 'fri'])
  const [saved, setSaved] = useState(false)

  const fetchPrefs = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const prefs = await getNotificationPreferences(supabase, user.id)
    if (prefs) {
      setRemindersEnabled(prefs.study_reminders_enabled)
      setReminderTime(prefs.reminder_time?.slice(0, 5) || '18:00')
      setReminderDays(prefs.reminder_days || ['mon', 'tue', 'wed', 'thu', 'fri'])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchPrefs()
  }, [fetchPrefs])

  // Sync reminder config to service worker whenever prefs change
  useEffect(() => {
    if (loading) return
    if (remindersEnabled && permissionState === 'granted') {
      sendReminderConfigToSW({ enabled: true, time: reminderTime, days: reminderDays })
    } else {
      sendReminderConfigToSW(null)
    }
  }, [remindersEnabled, reminderTime, reminderDays, permissionState, loading])

  async function handleToggleReminders() {
    const newValue = !remindersEnabled

    if (newValue) {
      const perm = await requestNotificationPermission()
      setPermissionState(perm)
      if (perm !== 'granted') return

      await subscribeToPush(supabase, user.id)
    } else {
      sendReminderConfigToSW(null)
    }

    setRemindersEnabled(newValue)
  }

  function toggleDay(day) {
    setReminderDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  async function handleSave() {
    setSaving(true)
    await updateNotificationPreferences(supabase, user.id, {
      study_reminders_enabled: remindersEnabled,
      reminder_time: reminderTime,
      reminder_days: reminderDays,
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const notificationsSupported = 'Notification' in window && 'serviceWorker' in navigator

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-6 h-6 text-[var(--color-primary)]" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Settings</h1>
      </div>

      {/* Study Reminders Section */}
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Study Reminders</h2>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Get daily notifications to remind you to study. Notifications are sent locally from your browser.
        </p>

        {!notificationsSupported && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm">
            Your browser does not support notifications.
          </div>
        )}

        {permissionState === 'denied' && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
            Notification permission was denied. Please enable it in your browser settings.
          </div>
        )}

        {/* Enable toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {remindersEnabled ? (
              <Bell className="w-4 h-4 text-emerald-500" />
            ) : (
              <BellOff className="w-4 h-4 text-[var(--color-text-secondary)]" />
            )}
            <span className="text-sm font-medium text-[var(--color-text)]">
              {remindersEnabled ? 'Reminders enabled' : 'Reminders disabled'}
            </span>
          </div>
          <button
            onClick={handleToggleReminders}
            disabled={!notificationsSupported || permissionState === 'denied'}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer border-none ${
              remindersEnabled
                ? 'bg-emerald-500'
                : 'bg-[var(--color-surface-3)]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            role="switch"
            aria-checked={remindersEnabled}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                remindersEnabled ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>

        {/* Time and day pickers (shown when enabled) */}
        {remindersEnabled && (
          <div className="space-y-5 border-t border-[var(--color-border)] pt-5">
            {/* Time picker */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)] mb-2">
                <Clock className="w-4 h-4" />
                Reminder time
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm"
              />
            </div>

            {/* Day selector */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)] mb-2">
                <Calendar className="w-4 h-4" />
                Reminder days
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_DAYS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => toggleDay(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                      reminderDays.includes(key)
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setReminderDays(['mon', 'tue', 'wed', 'thu', 'fri'])}
                  className="text-xs text-[var(--color-primary)] hover:underline cursor-pointer bg-transparent border-none"
                >
                  Weekdays
                </button>
                <button
                  onClick={() => setReminderDays(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])}
                  className="text-xs text-[var(--color-primary)] hover:underline cursor-pointer bg-transparent border-none"
                >
                  Every day
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium cursor-pointer border-none hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving...' : 'Save preferences'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-500 font-medium">Saved!</span>
          )}
        </div>
      </section>
    </div>
  )
}
