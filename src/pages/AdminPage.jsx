import React, { useState, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { CheckCircle2, XCircle, Clock, Users, Shield, RefreshCw, Flag } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import UserProgressTable from '../components/admin/UserProgressTable'
import UsageStats from '../components/admin/UsageStats'
import QuizReportsPanel from '../components/admin/QuizReportsPanel'

const STATUS_TABS = ['pending', 'approved', 'denied', 'all']

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    denied: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || ''}`}>
      {status === 'pending' && <Clock className="w-3 h-3" />}
      {status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
      {status === 'denied' && <XCircle className="w-3 h-3" />}
      {status}
    </span>
  )
}

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const [activeSection, setActiveSection] = useState('users')
  const [activeTab, setActiveTab] = useState('pending')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const [counts, setCounts] = useState({ pending: 0, approved: 0, denied: 0 })
  const [progressKey, setProgressKey] = useState(0)
  const [analyticsKey, setAnalyticsKey] = useState(0)
  const [reportsKey, setReportsKey] = useState(0)
  const [newReportCount, setNewReportCount] = useState(0)
  const [error, setError] = useState(null)

  const fetchUsers = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    setError(null)

    const query = supabase
      .from('user_approvals')
      .select('*')
      .order('requested_at', { ascending: false })

    if (activeTab !== 'all') {
      query.eq('status', activeTab)
    }

    const { data, error: queryError } = await query
    if (queryError) {
      console.error('Failed to fetch users:', queryError)
      setError('Failed to load users. Please try again.')
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }, [activeTab])

  const fetchCounts = useCallback(async () => {
    if (!supabase) return
    const statuses = ['pending', 'approved', 'denied']
    const results = await Promise.all(
      statuses.map(s =>
        supabase.from('user_approvals').select('*', { count: 'exact', head: true }).eq('status', s)
      )
    )
    setCounts({
      pending: results[0].count || 0,
      approved: results[1].count || 0,
      denied: results[2].count || 0,
    })
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    fetchCounts()
  }, [fetchCounts, users])

  useEffect(() => {
    async function fetchNewReportCount() {
      if (!supabase) return
      const { count } = await supabase
        .from('quiz_reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
      setNewReportCount(count || 0)
    }
    fetchNewReportCount()
  }, [reportsKey])

  // Guard after all hooks — placing it earlier violates Rules of Hooks
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  async function updateStatus(userId, status) {
    if (!supabase) return
    setActionLoading(userId)
    const { error: updateError } = await supabase
      .from('user_approvals')
      .update({ status, reviewed_at: new Date().toISOString(), reviewed_by: user.id })
      .eq('id', userId)
    if (updateError) {
      console.error('Failed to update user status:', updateError)
    }
    await fetchUsers()
    setActionLoading(null)
  }

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  function handleRefresh() {
    if (activeSection === 'users') {
      fetchUsers()
      fetchCounts()
    } else if (activeSection === 'progress') {
      setProgressKey(k => k + 1)
    } else if (activeSection === 'analytics') {
      setAnalyticsKey(k => k + 1)
    } else if (activeSection === 'reports') {
      setReportsKey(k => k + 1)
      setNewReportCount(0)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] cursor-pointer transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Section nav */}
      <div className="flex gap-1 border-b border-[var(--color-border)] mb-6" role="tablist" aria-label="Admin sections">
        {[
          { id: 'users', label: 'Users', badge: counts.pending > 0 ? counts.pending : null },
          { id: 'progress', label: 'Progress' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'reports', label: 'Reports', icon: Flag, badge: newReportCount > 0 ? newReportCount : null },
        ].map(({ id, label, badge }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeSection === id}
            aria-controls={`section-${id}`}
            onClick={() => setActiveSection(id)}
            className={`px-4 py-2 text-sm font-medium cursor-pointer border-none bg-transparent transition-colors border-b-2 -mb-px ${
              activeSection === id
                ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text)]'
            }`}
          >
            {label}
            {badge && (
              <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-white">{badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Users section */}
      {activeSection === 'users' && (
        <div id="section-users" role="tabpanel">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Pending', count: counts.pending, icon: Clock, color: 'text-amber-500' },
              { label: 'Approved', count: counts.approved, icon: CheckCircle2, color: 'text-emerald-500' },
              { label: 'Denied', count: counts.denied, icon: XCircle, color: 'text-red-500' },
            ].map(({ label, count, icon: Icon, color }) => (
              <div key={label} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
                <Icon className={`w-5 h-5 ${color} mb-2`} />
                <div className="text-2xl font-bold text-[var(--color-text)]">{count}</div>
                <div className="text-xs text-[var(--color-text-secondary)]">{label}</div>
              </div>
            ))}
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 mb-6 border-b border-[var(--color-border)]" role="tablist" aria-label="User status filter">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize cursor-pointer border-none bg-transparent transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text)]'
                }`}
              >
                {tab}
                {tab === 'pending' && counts.pending > 0 && (
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-white">
                    {counts.pending}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* User table */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-10 h-10 text-[var(--color-text-secondary)] mx-auto mb-3 opacity-40" />
              <p className="text-[var(--color-text-secondary)]">No {activeTab === 'all' ? '' : activeTab} users found.</p>
            </div>
          ) : (
            <div className="border border-[var(--color-border)] rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[600px]" aria-label="User approvals">
                <thead>
                  <tr className="bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Requested</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr
                      key={u.id}
                      className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]/40'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm text-[var(--color-text)]">
                          {u.display_name || '—'}
                        </div>
                        <div className="text-xs text-[var(--color-text-secondary)]">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={u.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                        {formatDate(u.requested_at)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {u.status !== 'approved' && (
                            <button
                              onClick={() => updateStatus(u.id, 'approved')}
                              disabled={actionLoading === u.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium cursor-pointer border-none transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Approve
                            </button>
                          )}
                          {u.status !== 'denied' && (
                            <button
                              onClick={() => updateStatus(u.id, 'denied')}
                              disabled={actionLoading === u.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium cursor-pointer border-none transition-colors disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Deny
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Progress section */}
      {activeSection === 'progress' && (
        <div id="section-progress" role="tabpanel">
          <UserProgressTable key={progressKey} />
        </div>
      )}

      {/* Analytics section */}
      {activeSection === 'analytics' && (
        <div id="section-analytics" role="tabpanel">
          <UsageStats key={analyticsKey} />
        </div>
      )}

      {/* Reports section */}
      {activeSection === 'reports' && (
        <div id="section-reports" role="tabpanel">
          <QuizReportsPanel key={reportsKey} />
        </div>
      )}
    </div>
  )
}
