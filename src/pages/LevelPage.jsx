import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, List } from 'lucide-react'
import { getRoleById, getRoleIcon } from '../data/roles'
import { loadRoleMarkdownContent } from '../data/loaders/roleDataLoader'
import MarkdownRenderer from '../components/content/MarkdownRenderer'
import Badge from '../components/common/Badge'
import ProgressBar from '../components/progress/ProgressBar'
import useProgress from '../components/progress/useProgress'
import { parseObjectives } from '../utils/markdownLoader'
import ObjectiveChecklist from '../components/roadmap/ObjectiveChecklist'

function TableOfContents({ content }) {
  const headings = []
  const regex = /^## (.+)$/gm
  let match
  while ((match = regex.exec(content)) !== null) {
    headings.push({
      text: match[1],
      id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    })
  }

  if (headings.length === 0) return null

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <List className="w-4 h-4 text-[var(--color-primary)]" />
        <h4 className="text-sm font-semibold text-[var(--color-text)]">Table of Contents</h4>
      </div>
      <nav className="space-y-1">
        {headings.map(({ text, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline py-1 pl-3 border-l-2 border-transparent hover:border-[var(--color-primary)] transition-colors"
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default function LevelPage() {
  const { roleId, level } = useParams()
  const role = getRoleById(roleId)
  const { isObjectiveComplete, toggleObjective, roleProgress } = useProgress(roleId)
  const [markdownContent, setMarkdownContent] = useState({})

  useEffect(() => {
    if (role?.fileName) {
      loadRoleMarkdownContent(role.fileName).then(setMarkdownContent)
    }
  }, [role?.fileName])

  if (!role) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Role Not Found</h1>
        <Link to="/" className="text-[var(--color-primary)]">Back to Home</Link>
      </div>
    )
  }

  const levelCapitalized = level.charAt(0).toUpperCase() + level.slice(1)
  const content = markdownContent?.[level] || ''
  const Icon = getRoleIcon(role.icon)

  const overviewContent = markdownContent?.overview || ''
  const levelRegex = new RegExp(`## ${levelCapitalized}([\\s\\S]*?)(?=\\n## |---\\s*\\n\\s*Return|$)`, 'i')
  const overviewMatch = overviewContent.match(levelRegex)
  const overviewSection = overviewMatch ? overviewMatch[0] : ''
  const objectives = parseObjectives(overviewSection)

  const levelIndex = role.levels.findIndex((l) => l.toLowerCase() === level)
  const prevLevel = levelIndex > 0 ? role.levels[levelIndex - 1] : null
  const nextLevel = levelIndex < role.levels.length - 1 ? role.levels[levelIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <Link
        to={`/role/${roleId}`}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {role.name}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {role.name}
          </h1>
          <Badge variant={level}>{levelCapitalized}</Badge>
        </div>

        <p className="text-[var(--color-text-secondary)] mb-4">
          {levelCapitalized} level concept reference and deep dive explanations.
        </p>

        <ProgressBar value={roleProgress[level] || 0} />
      </motion.div>

      {objectives && objectives.length > 0 && (
        <div className="mb-8">
          <ObjectiveChecklist
            objectives={objectives}
            level={level}
            isObjectiveComplete={isObjectiveComplete}
            toggleObjective={toggleObjective}
          />
        </div>
      )}

      {content ? (
        <>
          <TableOfContents content={content} />
          <MarkdownRenderer content={content} />
        </>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Content Loading</h2>
          <p className="text-[var(--color-text-secondary)]">
            The {levelCapitalized} concept reference for {role.name} is available in the roadmap overview.
          </p>
          <Link to={`/role/${roleId}`} className="inline-flex items-center gap-1.5 mt-4 text-[var(--color-primary)] font-medium no-underline">
            View Roadmap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--color-border)]">
        {prevLevel ? (
          <Link
            to={`/role/${roleId}/${prevLevel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {prevLevel} Level
          </Link>
        ) : <div />}
        {nextLevel ? (
          <Link
            to={`/role/${roleId}/${nextLevel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            {nextLevel} Level
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
