import { roles, getRoleIcon } from '../../data/roles'
import { languages, getLanguageIcon } from '../../data/languages'
import { getRoleProgress, getLanguageProgress, getAllLabProgress } from '../../utils/progressStorage'
import { interactiveLabs } from '../../data/labs/index.js'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'
import { Trophy, Target, Flame, FlaskConical } from 'lucide-react'

function safeProgress(roleId) {
  const rp = getRoleProgress(roleId)
  if (!rp) return { beginner: 0, mid: 0, senior: 0, overall: 0 }
  return {
    beginner: rp.beginner?.percentage || 0,
    mid: rp.mid?.percentage || 0,
    senior: rp.senior?.percentage || 0,
    overall: rp.overall || 0,
  }
}

function safeLangProgress(languageId) {
  const lp = getLanguageProgress(languageId)
  if (!lp) return { beginner: 0, mid: 0, senior: 0, overall: 0 }
  return {
    beginner: lp.beginner?.percentage || 0,
    mid: lp.mid?.percentage || 0,
    senior: lp.senior?.percentage || 0,
    overall: lp.overall || 0,
  }
}

export default function ProgressTracker() {
  const totalRoles = roles.length
  const startedRoles = roles.filter(r => safeProgress(r.id).overall > 0).length
  const completedRoles = roles.filter(r => safeProgress(r.id).overall >= 100).length

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">My Learning Progress</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Track your journey across all tech roles and learning paths.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
          <Target className="w-6 h-6 text-[var(--color-primary)] mb-2" />
          <div className="text-2xl font-bold text-[var(--color-text)]">{startedRoles}/{totalRoles}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Roles Started</div>
        </div>
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
          <Trophy className="w-6 h-6 text-amber-500 mb-2" />
          <div className="text-2xl font-bold text-[var(--color-text)]">{completedRoles}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Roles Completed</div>
        </div>
        <div className="p-5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
          <Flame className="w-6 h-6 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-[var(--color-text)]">
            {Math.round(roles.reduce((acc, r) => acc + safeProgress(r.id).overall, 0) / totalRoles)}%
          </div>
          <div className="text-sm text-[var(--color-text-secondary)]">Overall Progress</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Role Paths</h2>
      <div className="space-y-4 mb-10">
        {roles.map((role) => {
          const Icon = getRoleIcon(role.icon)
          const rp = safeProgress(role.id)
          return (
            <Link
              key={role.id}
              to={`/dashboard/role/${role.id}`}
              className="block p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors no-underline"
            >
              <div className="flex items-center gap-4 mb-3">
                <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-semibold text-[var(--color-text)] flex-1">{role.name}</span>
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {Math.round(rp.overall)}%
                </span>
              </div>
              <ProgressBar value={rp.overall} size="sm" showLabel={false} />
              <div className="flex gap-4 mt-2">
                {['beginner', 'mid', 'senior'].map((level) => (
                  <div key={level} className="flex-1">
                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                      <span className="capitalize">{level}</span>
                      <span>{Math.round(rp[level] || 0)}%</span>
                    </div>
                    <ProgressBar
                      value={rp[level] || 0}
                      size="sm"
                      showLabel={false}
                      color={level === 'beginner' ? 'emerald' : level === 'mid' ? 'amber' : 'red'}
                    />
                  </div>
                ))}
              </div>
            </Link>
          )
        })}
      </div>

      <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Language Paths</h2>
      <div className="space-y-4 mb-10">
        {languages.map((lang) => {
          const Icon = getLanguageIcon(lang.icon)
          const lp = safeLangProgress(lang.id)
          return (
            <Link
              key={lang.id}
              to={`/dashboard/language/${lang.id}`}
              className="block p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors no-underline"
            >
              <div className="flex items-center gap-4 mb-3">
                <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-semibold text-[var(--color-text)] flex-1">{lang.name}</span>
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {Math.round(lp.overall)}%
                </span>
              </div>
              <ProgressBar value={lp.overall} size="sm" showLabel={false} />
              <div className="flex gap-4 mt-2">
                {['beginner', 'mid', 'senior'].map((level) => (
                  <div key={level} className="flex-1">
                    <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                      <span className="capitalize">{level}</span>
                      <span>{Math.round(lp[level] || 0)}%</span>
                    </div>
                    <ProgressBar
                      value={lp[level] || 0}
                      size="sm"
                      showLabel={false}
                      color={level === 'beginner' ? 'emerald' : level === 'mid' ? 'amber' : 'red'}
                    />
                  </div>
                ))}
              </div>
            </Link>
          )
        })}
      </div>

      {interactiveLabs.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[var(--color-primary)]" />
            Interactive Labs
          </h2>
          <div className="space-y-3">
            {interactiveLabs.slice(0, 10).map((lab) => {
              const labProgress = getAllLabProgress()[lab.id]
              const completedSteps = labProgress?.steps ? labProgress.steps.filter(s => s?.completed).length : 0
              const totalSteps = lab.steps.length
              const pct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
              return (
                <div key={lab.id} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--color-text)]">{lab.title}</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">{completedSteps}/{totalSteps} steps</span>
                  </div>
                  <ProgressBar value={pct} size="sm" showLabel={false} />
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
