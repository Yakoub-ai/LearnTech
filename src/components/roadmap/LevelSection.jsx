import ResourceTable from './ResourceTable'
import ObjectiveChecklist from './ObjectiveChecklist'
import Badge from '../common/Badge'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'

export default function LevelSection({ roleId, level, resources, objectives, isResourceComplete, isObjectiveComplete, toggleResource, toggleObjective }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant={level.toLowerCase()} className="text-sm px-3 py-1">{level}</Badge>
          <h3 className="text-xl font-bold text-[var(--color-text)]">{level} Level</h3>
        </div>
        <Link
          to={`/dashboard/role/${roleId}/${level.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium no-underline transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Deep Dive
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

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
  )
}
