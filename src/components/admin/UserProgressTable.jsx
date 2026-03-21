import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, BookOpen, Trophy, Target } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { formatRoleName } from '../../utils/formatters'

// Compute summary stats from a user's progress rows for a given role
function computeRoleStats(rows) {
  const levels = ['beginner', 'mid', 'senior']
  const byLevel = {}

  for (const level of levels) {
    const levelRows = rows.filter(r => r.level === level)
    const objectives = levelRows.filter(r => r.type === 'objective')
    const resources = levelRows.filter(r => r.type === 'resource')
    const quiz = levelRows.find(r => r.type === 'quiz' && r.item_key === 'score')

    const completedObjectives = objectives.filter(r => r.value?.completed).length
    const completedResources = resources.filter(r => r.value?.completed).length
    const total = objectives.length + resources.length
    const completed = completedObjectives + completedResources

    byLevel[level] = {
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      objectives: { completed: completedObjectives, total: objectives.length },
      resources: { completed: completedResources, total: resources.length },
      quizScore: quiz?.value?.score ?? null,
    }
  }

  const allItems = Object.values(byLevel).reduce((sum, l) => sum + l.objectives.total + l.resources.total, 0)
  const allCompleted = Object.values(byLevel).reduce((sum, l) => sum + l.objectives.completed + l.resources.completed, 0)

  return {
    levels: byLevel,
    overall: allItems > 0 ? Math.round((allCompleted / allItems) * 100) : 0,
  }
}

function ProgressBar({ value }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-[var(--color-border)]">
      <div
        className="h-1.5 rounded-full transition-all"
        style={{
          width: `${value}%`,
          backgroundColor: value === 100 ? 'var(--color-primary)' : 'var(--color-accent)',
        }}
      />
    </div>
  )
}

export default function UserProgressTable() {
  const [data, setData] = useState([]) // array of { user: {id, email, display_name}, roles: { roleId: stats } }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState({}) // userId -> roleId -> bool

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    async function load() {
      try {
      const [progressRes, usersRes] = await Promise.all([
        supabase.from('user_progress').select('*').order('updated_at', { ascending: false }),
        supabase.from('user_approvals').select('id, email, display_name').eq('status', 'approved'),
      ])

      if (progressRes.error) throw progressRes.error
      if (usersRes.error) throw usersRes.error

      const progressRows = progressRes.data || []
      const users = usersRes.data || []

      // Group progress rows by userId
      const byUser = {}
      for (const row of progressRows) {
        if (!byUser[row.user_id]) byUser[row.user_id] = {}
        if (!byUser[row.user_id][row.role_id]) byUser[row.user_id][row.role_id] = []
        byUser[row.user_id][row.role_id].push(row)
      }

      const result = users.map(u => ({
        user: u,
        roles: Object.fromEntries(
          Object.entries(byUser[u.id] || {}).map(([roleId, rows]) => [roleId, computeRoleStats(rows)])
        ),
      })).filter(u => Object.keys(u.roles).length > 0)

      setData(result)
      } catch (err) {
        console.error('Failed to load progress data:', err)
        setError('Failed to load progress data. Please try again.')
      }
      setLoading(false)
    }
    load()
  }, [])

  const toggleExpand = (userId, roleId) => {
    setExpanded(prev => ({
      ...prev,
      [userId]: { ...(prev[userId] || {}), [roleId]: !(prev[userId]?.[roleId]) }
    }))
  }

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
      {error}
    </div>
  )

  if (data.length === 0) return (
    <div className="text-center py-16">
      <BookOpen className="w-10 h-10 text-[var(--color-text-secondary)] mx-auto mb-3 opacity-40" />
      <p className="text-[var(--color-text-secondary)]">No progress data yet. Users need to sync progress by visiting role pages while logged in.</p>
    </div>
  )

  return (
    <div className="space-y-4">
      {data.map(({ user, roles }) => (
        <div key={user.id} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
          {/* User header */}
          <div className="px-4 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
            <div className="font-medium text-sm text-[var(--color-text)]">{user.display_name || '—'}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">{user.email}</div>
          </div>

          {/* Roles */}
          <div className="divide-y divide-[var(--color-border)]">
            {Object.entries(roles).map(([roleId, stats]) => (
              <div key={roleId}>
                {/* Role row */}
                <button
                  onClick={() => toggleExpand(user.id, roleId)}
                  aria-expanded={!!expanded[user.id]?.[roleId]}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface-2)]/50 transition-colors cursor-pointer bg-transparent border-none text-left"
                >
                  {expanded[user.id]?.[roleId]
                    ? <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)] flex-shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)] flex-shrink-0" />
                  }
                  <span className="text-sm font-medium text-[var(--color-text)] flex-1">{formatRoleName(roleId)}</span>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="w-32">
                      <ProgressBar value={stats.overall} />
                    </div>
                    <span className="text-sm font-semibold text-[var(--color-text)] w-10 text-right">{stats.overall}%</span>
                  </div>
                </button>

                {/* Level breakdown (expanded) */}
                {expanded[user.id]?.[roleId] && (
                  <div className="px-10 pb-3 space-y-2">
                    {['beginner', 'mid', 'senior'].map(level => {
                      const l = stats.levels[level]
                      if (l.objectives.total === 0 && l.resources.total === 0) return null
                      return (
                        <div key={level} className="flex items-center gap-4 py-1">
                          <span className="text-xs text-[var(--color-text-secondary)] capitalize w-16">{level}</span>
                          <div className="flex-1">
                            <ProgressBar value={l.percentage} />
                          </div>
                          <span className="text-xs text-[var(--color-text)] w-8 text-right">{l.percentage}%</span>
                          <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] w-28">
                            <Target className="w-3 h-3" />
                            <span>{l.objectives.completed}/{l.objectives.total}</span>
                            <BookOpen className="w-3 h-3 ml-2" />
                            <span>{l.resources.completed}/{l.resources.total}</span>
                          </div>
                          {l.quizScore !== null && (
                            <div className="flex items-center gap-1 text-xs">
                              <Trophy className="w-3 h-3 text-amber-500" />
                              <span className="font-medium text-[var(--color-text)]">{l.quizScore}%</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
