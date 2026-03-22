import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import ResourceTable from './ResourceTable'
import ObjectiveChecklist from './ObjectiveChecklist'
import Badge from '../common/Badge'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'

export default function LevelSection({ roleId, level, resources, objectives, isResourceComplete, isObjectiveComplete, toggleResource, toggleObjective, levelProgress = 0 }) {
  const isLevelComplete = levelProgress >= 100
  const [expanded, setExpanded] = useState(!isLevelComplete)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant={level.toLowerCase()} className="text-sm px-3 py-1">{level}</Badge>
          <h3 className={`text-xl font-bold text-[var(--color-text)] transition-all ${isLevelComplete ? 'line-through opacity-60' : ''}`}>
            {level} Level
          </h3>
          {isLevelComplete && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/dashboard/role/${roleId}/${level.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium no-underline transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Deep Dive
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {isLevelComplete && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-3)] transition-colors cursor-pointer bg-transparent border-none"
              aria-label={expanded ? 'Collapse section' : 'Expand section'}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-6">
              {resources && resources.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                    Resources
                  </h4>
                  <ResourceTable
                    resources={resources}
                    roleId={roleId}
                    level={level.toLowerCase()}
                    isResourceComplete={isResourceComplete}
                    toggleResource={toggleResource}
                    showVideoEmbed={false}
                  />
                </div>
              )}

              {objectives && objectives.length > 0 && (
                <ObjectiveChecklist
                  objectives={objectives}
                  level={level.toLowerCase()}
                  isObjectiveComplete={isObjectiveComplete}
                  toggleObjective={toggleObjective}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
