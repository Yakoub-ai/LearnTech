import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { Flag, CheckCircle, XCircle, Eye, RefreshCw, AlertCircle } from 'lucide-react'

const STATUS_OPTIONS = ['all', 'new', 'reviewed', 'resolved', 'dismissed']

const REASON_LABELS = {
  incorrect_answer: 'Incorrect Answer',
  ambiguous_question: 'Ambiguous Question',
  outdated_info: 'Outdated Info',
  other: 'Other',
}

const STATUS_STYLES = {
  new: 'bg-yellow-500/10 text-yellow-500',
  reviewed: 'bg-blue-500/10 text-blue-500',
  resolved: 'bg-green-500/10 text-green-500',
  dismissed: 'bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)]',
}

export default function QuizReportsPanel() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('new')
  const [actionLoading, setActionLoading] = useState({})

  const fetchReports = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('quiz_reports')
        .select('*')
        .order('created_at', { ascending: false })
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }
      const { data, error: err } = await query
      if (err) throw err
      setReports(data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => { fetchReports() }, [fetchReports])

  async function updateStatus(id, status) {
    if (!supabase) return
    setActionLoading((prev) => ({ ...prev, [id]: true }))
    try {
      const { error: err } = await supabase
        .from('quiz_reports')
        .update({ status, reviewed_at: new Date().toISOString() })
        .eq('id', id)
      if (err) throw err
      setReports((prev) => prev.map((r) => r.id === id ? { ...r, status } : r))
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }))
    }
  }

  const counts = {
    new: reports.filter((r) => r.status === 'new').length,
    reviewed: reports.filter((r) => r.status === 'reviewed').length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
  }

  if (!supabase) {
    return (
      <div className="p-8 text-center text-[var(--color-text-secondary)]">
        Supabase not configured.
      </div>
    )
  }

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'New', value: counts.new, icon: AlertCircle, color: 'text-yellow-500' },
          { label: 'Reviewed', value: counts.reviewed, icon: Eye, color: 'text-blue-500' },
          { label: 'Resolved', value: counts.resolved, icon: CheckCircle, color: 'text-green-500' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span>
            </div>
            <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters + refresh */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={fetchReports}
          className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 text-red-500 text-center rounded-xl border border-[var(--color-border)]">{error}</div>
      ) : reports.length === 0 ? (
        <div className="p-12 text-center text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border)]">
          <Flag className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p>No {statusFilter === 'all' ? '' : statusFilter} reports</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
                <th className="text-left p-3 font-medium text-[var(--color-text-secondary)]">Date</th>
                <th className="text-left p-3 font-medium text-[var(--color-text-secondary)]">Role / Level</th>
                <th className="text-left p-3 font-medium text-[var(--color-text-secondary)]">Question</th>
                <th className="text-left p-3 font-medium text-[var(--color-text-secondary)]">Reason</th>
                <th className="text-left p-3 font-medium text-[var(--color-text-secondary)]">Status</th>
                <th className="text-left p-3 font-medium text-[var(--color-text-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, i) => (
                <tr
                  key={report.id}
                  className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]'}`}
                >
                  <td className="p-3 text-[var(--color-text-secondary)] whitespace-nowrap">
                    {new Date(report.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-[var(--color-text)]">
                    <div className="font-medium capitalize">{report.role_id?.replace(/-/g, ' ')}</div>
                    <div className="text-xs text-[var(--color-text-secondary)] capitalize">{report.level}</div>
                  </td>
                  <td className="p-3 text-[var(--color-text)] max-w-xs">
                    <div className="truncate">{report.question_text}</div>
                    {report.details && (
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">{report.details}</div>
                    )}
                  </td>
                  <td className="p-3 text-[var(--color-text-secondary)]">
                    {REASON_LABELS[report.reason] || report.reason}
                  </td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[report.status]}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {report.status !== 'reviewed' && (
                        <button
                          onClick={() => updateStatus(report.id, 'reviewed')}
                          disabled={actionLoading[report.id]}
                          className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors disabled:opacity-50"
                          title="Mark Reviewed"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {report.status !== 'resolved' && (
                        <button
                          onClick={() => updateStatus(report.id, 'resolved')}
                          disabled={actionLoading[report.id]}
                          className="p-1.5 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors disabled:opacity-50"
                          title="Resolve"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {report.status !== 'dismissed' && (
                        <button
                          onClick={() => updateStatus(report.id, 'dismissed')}
                          disabled={actionLoading[report.id]}
                          className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] transition-colors disabled:opacity-50"
                          title="Dismiss"
                        >
                          <XCircle className="w-3.5 h-3.5" />
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
  )
}
