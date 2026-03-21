import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, TrendingUp, Trophy, Activity } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { formatRoleName } from '../../utils/formatters'

export default function UsageStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    async function load() {
      try {
      const now = new Date()
      const ago7d = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString()

      const [
        totalUsersRes,
        activeUsersRes,
        roleVisitsRes,
        quizEventsRes,
        dailyActiveRes,
      ] = await Promise.all([
        supabase.from('user_approvals').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('user_events').select('user_id').gte('created_at', ago7d),
        supabase.from('user_events').select('event_data').eq('event_type', 'role_visit'),
        supabase.from('user_events').select('event_data').eq('event_type', 'quiz_complete'),
        supabase.from('user_events').select('user_id, created_at').gte('created_at', ago7d).order('created_at'),
      ])

      for (const res of [activeUsersRes, roleVisitsRes, quizEventsRes, dailyActiveRes]) {
        if (res.error) throw res.error
      }

      // Role visit counts
      const roleCounts = {}
      for (const row of (roleVisitsRes.data || [])) {
        const role = row.event_data?.roleId || 'unknown'
        roleCounts[role] = (roleCounts[role] || 0) + 1
      }
      const topRoles = Object.entries(roleCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([role, visits]) => ({
          role: formatRoleName(role),
          visits,
        }))

      // Quiz scores distribution
      const scores = (quizEventsRes.data || [])
        .map(r => r.event_data?.score)
        .filter(s => typeof s === 'number')
      const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null

      // Quiz scores by role
      const quizByRole = {}
      for (const row of (quizEventsRes.data || [])) {
        const role = row.event_data?.roleId || 'unknown'
        const score = row.event_data?.score
        if (typeof score === 'number') {
          if (!quizByRole[role]) quizByRole[role] = []
          quizByRole[role].push(score)
        }
      }
      const quizChartData = Object.entries(quizByRole)
        .map(([role, roleScores]) => ({
          role: formatRoleName(role),
          avgScore: Math.round(roleScores.reduce((a, b) => a + b, 0) / roleScores.length),
        }))
        .sort((a, b) => b.avgScore - a.avgScore)
        .slice(0, 8)

      // Daily active users (last 7 days)
      const dailyMap = {}
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now - i * 24 * 60 * 60 * 1000)
        const key = d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
        dailyMap[key] = new Set()
      }
      for (const row of (dailyActiveRes.data || [])) {
        const d = new Date(row.created_at)
        const key = d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
        if (dailyMap[key]) dailyMap[key].add(row.user_id)
      }
      const dailyActiveData = Object.entries(dailyMap).map(([date, users]) => ({ date, users: users.size }))

      // Unique active users 7d
      const uniqueActive7d = new Set((activeUsersRes.data || []).map(r => r.user_id)).size

      setStats({
        totalApproved: totalUsersRes.count || 0,
        activeUsers7d: uniqueActive7d,
        totalQuizzes: scores.length,
        avgScore,
        topRoles,
        quizChartData,
        dailyActiveData,
      })
      } catch (err) {
        console.error('Failed to load analytics:', err)
        setError('Failed to load analytics. Please try again.')
      }
      setLoading(false)
    }
    load()
  }, [])

  const tooltipStyle = {
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '12px',
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

  if (!stats) return (
    <div className="text-center py-16">
      <Activity className="w-10 h-10 text-[var(--color-text-secondary)] mx-auto mb-3 opacity-40" />
      <p className="text-[var(--color-text-secondary)]">Analytics unavailable — Supabase not configured.</p>
    </div>
  )

  const summaryCards = [
    { label: 'Approved Users', value: stats.totalApproved, icon: Users, color: 'text-blue-500' },
    { label: 'Active (7 days)', value: stats.activeUsers7d, icon: Activity, color: 'text-emerald-500' },
    { label: 'Quizzes Taken', value: stats.totalQuizzes, icon: Trophy, color: 'text-amber-500' },
    { label: 'Avg Quiz Score', value: stats.avgScore !== null ? `${stats.avgScore}%` : '—', icon: TrendingUp, color: 'text-purple-500' },
  ]

  const noData = (
    <div className="flex items-center justify-center h-full text-sm text-[var(--color-text-secondary)] opacity-60">
      No data yet
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <Icon className={`w-5 h-5 ${card.color} mb-2`} />
              <div className="text-2xl font-bold text-[var(--color-text)]">{card.value}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{card.label}</div>
            </div>
          )
        })}
      </div>

      {/* Daily active users */}
      <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Daily Active Users (last 7 days)</h3>
        <div className="h-48">
          {stats.dailyActiveData.every(d => d.users === 0) ? noData : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.dailyActiveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} width={24} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top roles + Quiz scores side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Most Visited Roles</h3>
          <div className="h-48">
            {stats.topRoles.length === 0 ? noData : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topRoles} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="role" width={90} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="visits" fill="var(--color-accent)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Avg Quiz Score by Role</h3>
          <div className="h-48">
            {stats.quizChartData.length === 0 ? noData : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.quizChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="role" width={90} tick={{ fill: 'var(--color-text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Avg Score']} />
                  <Bar dataKey="avgScore" fill="var(--color-primary)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
