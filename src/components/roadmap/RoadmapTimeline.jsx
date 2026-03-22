import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { getRoleProgress } from '../../utils/progressStorage'

const levelConfig = {
  Beginner: {
    color: 'emerald',
    bgClass: 'bg-emerald-100 dark:bg-emerald-900/30',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    borderClass: 'border-emerald-300 dark:border-emerald-700',
    dotClass: 'bg-emerald-500',
    description: 'Foundations and core concepts',
  },
  Mid: {
    color: 'amber',
    bgClass: 'bg-amber-100 dark:bg-amber-900/30',
    textClass: 'text-amber-700 dark:text-amber-400',
    borderClass: 'border-amber-300 dark:border-amber-700',
    dotClass: 'bg-amber-500',
    description: 'Intermediate tools and techniques',
  },
  Senior: {
    color: 'red',
    bgClass: 'bg-red-100 dark:bg-red-900/30',
    textClass: 'text-red-700 dark:text-red-400',
    borderClass: 'border-red-300 dark:border-red-700',
    dotClass: 'bg-red-500',
    description: 'Advanced patterns and architecture',
  },
}

export default function RoadmapTimeline({ roleId, levels = ['Beginner', 'Mid', 'Senior'] }) {
  const location = useLocation()
  const progress = getRoleProgress(roleId) || {}

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

      <div className="space-y-6">
        {levels.map((level, index) => {
          const config = levelConfig[level]
          const levelProgress = progress[level.toLowerCase()] || 0
          const isComplete = levelProgress >= 100
          const isActive = location.pathname.includes(level.toLowerCase())

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Link
                to={`/dashboard/role/${roleId}/${level.toLowerCase()}`}
                className={`group relative flex items-start gap-4 p-4 rounded-xl border transition-all no-underline ${
                  isActive
                    ? `${config.bgClass} ${config.borderClass}`
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/30 bg-[var(--color-surface)]'
                } ${isComplete && !isActive ? 'opacity-60' : ''}`}
              >
                <div className="relative z-10 mt-1">
                  {isComplete ? (
                    <CheckCircle2 className={`w-8 h-8 ${config.textClass}`} />
                  ) : (
                    <div className={`w-8 h-8 rounded-full border-2 ${config.borderClass} flex items-center justify-center bg-[var(--color-surface)]`}>
                      <div className={`w-3 h-3 rounded-full ${levelProgress > 0 ? config.dotClass : 'bg-[var(--color-surface-3)]'}`} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-lg font-bold ${isActive ? config.textClass : 'text-[var(--color-text)]'} ${isComplete ? 'line-through' : ''}`}>
                      {level}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bgClass} ${config.textClass}`}>
                      {Math.round(levelProgress)}%
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">{config.description}</p>
                  <div className="h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${config.dotClass} rounded-full transition-all duration-500`}
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all mt-2 shrink-0" />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
