import ResourceTable from './ResourceTable'
import ObjectiveChecklist from './ObjectiveChecklist'
import Badge from '../common/Badge'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import { useProgressContext } from '../../contexts/ProgressContext'

export default function LevelSection({ roleId, level, resources, objectives, levelProgress = 0, embedded = false, type = 'role' }) {
  const ctx = useProgressContext()
  const isObjectiveComplete = ctx?.isObjectiveComplete
  const isResourceComplete  = ctx?.isResourceComplete
  const toggleObjective     = ctx?.toggleObjective
  const toggleResource      = ctx?.toggleResource
  const levelKey = level.toLowerCase()
  const deepDiveUrl = type === 'role'
    ? `/dashboard/role/${roleId}/${levelKey}`
    : `/dashboard/language/${roleId}/${levelKey}`

  // When embedded inside CompletedLevelShowcase, always show content without header chrome
  if (embedded) {
    return (
      <div className="space-y-6">
        {objectives && objectives.length > 0 && (
          <ObjectiveChecklist
            objectives={objectives}
            level={levelKey}
            isObjectiveComplete={isObjectiveComplete}
            toggleObjective={toggleObjective}
          />
        )}
        {resources && resources.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ResourceTable
              resources={resources}
              roleId={roleId}
              level={levelKey}
              isResourceComplete={isResourceComplete}
              toggleResource={toggleResource}
              showVideoEmbed={false}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant={levelKey} className="text-sm px-3 py-1">{level}</Badge>
          <h3 className="text-xl font-bold text-[var(--color-text)]">
            {level} Level
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={deepDiveUrl}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium no-underline transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Deep Dive
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      {levelProgress > 0 && levelProgress < 100 && (
        <div className="h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      )}

      <div className="space-y-6">
        {objectives && objectives.length > 0 && (
          <ObjectiveChecklist
            objectives={objectives}
            level={levelKey}
            isObjectiveComplete={isObjectiveComplete}
            toggleObjective={toggleObjective}
          />
        )}

        {resources && resources.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ResourceTable
              resources={resources}
              roleId={roleId}
              level={levelKey}
              isResourceComplete={isResourceComplete}
              toggleResource={toggleResource}
              showVideoEmbed={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
