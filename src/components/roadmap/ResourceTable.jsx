import { ExternalLink, Video, BookOpen, Code2, FileText, GraduationCap, Newspaper, FlaskConical, BookMarked, Building2 } from 'lucide-react'
import Badge from '../common/Badge'
import YouTubeEmbed from './YouTubeEmbed'
import { extractYouTubeId } from '../../utils/youtubeUtils'

const typeIcons = {
  Video: Video,
  Course: GraduationCap,
  Interactive: Code2,
  Docs: BookOpen,
  Article: Newspaper,
  Paper: FlaskConical,
  Reference: BookMarked,
  Guide: FileText,
  Internal: Building2,
}

export default function ResourceTable({ resources, _roleId, level, isResourceComplete, toggleResource }) {
  if (!resources || resources.length === 0) return null

  return (
    <div className="space-y-3">
      {resources.map((resource, index) => {
        const Icon = typeIcons[resource.type] || BookOpen
        const youtubeId = extractYouTubeId(resource.url)
        const isComplete = isResourceComplete?.(level, index)

        return (
          <div key={index} className="group">
            <div
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${
                isComplete
                  ? 'border-[var(--color-success)]/30 bg-[var(--color-success)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30'
              }`}
            >
              {toggleResource && (
                <input
                  type="checkbox"
                  checked={isComplete || false}
                  onChange={() => toggleResource(level, index)}
                  className="mt-1 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] cursor-pointer shrink-0 accent-[var(--color-primary)]"
                />
              )}

              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                resource.type === 'Video' ? 'bg-red-100 dark:bg-red-900/30' :
                resource.type === 'Course' ? 'bg-blue-100 dark:bg-blue-900/30' :
                resource.type === 'Interactive' ? 'bg-purple-100 dark:bg-purple-900/30' :
                'bg-gray-100 dark:bg-gray-800'
              }`}>
                <Icon className={`w-4.5 h-4.5 ${
                  resource.type === 'Video' ? 'text-red-600 dark:text-red-400' :
                  resource.type === 'Course' ? 'text-blue-600 dark:text-blue-400' :
                  resource.type === 'Interactive' ? 'text-purple-600 dark:text-purple-400' :
                  'text-gray-600 dark:text-gray-400'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {resource.topic}
                  </span>
                  <Badge variant={resource.type?.toLowerCase()}>{resource.type}</Badge>
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] no-underline mt-1 flex items-center gap-1.5 transition-colors"
                >
                  {resource.title}
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-50" />
                </a>

              </div>
            </div>

            {youtubeId && (
              <div className="mt-2 ml-7">
                <YouTubeEmbed videoId={youtubeId} title={resource.title} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
