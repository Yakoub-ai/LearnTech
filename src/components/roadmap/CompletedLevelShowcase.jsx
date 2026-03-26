import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronDown, ChevronUp, BookOpen, ArrowRight, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'

const levelColors = {
  beginner: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    accent: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  },
  mid: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    accent: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  },
  senior: {
    border: 'border-l-red-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    accent: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  },
}

export default function CompletedLevelShowcase({
  level,
  stats,
  deepDiveUrl,
  children,
}) {
  const [expanded, setExpanded] = useState(false)
  const levelKey = level.toLowerCase()
  const colors = levelColors[levelKey] || levelColors.beginner

  const completedDate = stats?.completedAt
    ? new Date(stats.completedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <div className={`rounded-xl border border-[var(--color-border)] border-l-4 ${colors.border} ${colors.bg} overflow-hidden transition-all`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-transparent border-none cursor-pointer text-left"
      >
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colors.badge}`}>
          <Trophy className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={levelKey} className="text-xs px-2 py-0.5">{level}</Badge>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] flex-wrap">
            {completedDate && <span>{completedDate}</span>}
            {stats?.objectives && (
              <span>{stats.objectives.completed}/{stats.objectives.total} Objectives</span>
            )}
            {stats?.resources && (
              <span>{stats.resources.completed}/{stats.resources.total} Resources</span>
            )}
            {stats?.quizScore != null && (
              <span>Quiz: {stats.quizScore}%</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {deepDiveUrl && (
            <Link
              to={deepDiveUrl}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium no-underline transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Deep Dive
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          <div className="p-1 rounded-md text-[var(--color-text-secondary)]">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="showcase-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-[var(--color-border)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
