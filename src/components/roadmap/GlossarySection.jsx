import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, Search } from 'lucide-react'
import Badge from '../common/Badge'

const levelLabels = {
  beginner: 'Beginner',
  mid: 'Mid',
  senior: 'Senior',
}

function GlossaryLevelGroup({ level, terms, searchQuery }) {
  const [open, setOpen] = useState(level === 'beginner')

  const filtered = searchQuery
    ? terms.filter(
        (t) =>
          t.term.toLowerCase().includes(searchQuery) ||
          t.definition.toLowerCase().includes(searchQuery)
      )
    : terms

  if (filtered.length === 0) return null

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] transition-colors cursor-pointer border-none text-left"
      >
        <Badge variant={level} className="text-xs px-2 py-0.5">{levelLabels[level]}</Badge>
        <span className="flex-1 text-sm font-medium text-[var(--color-text)]">
          {levelLabels[level]} Concepts
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {filtered.length} term{filtered.length !== 1 ? 's' : ''}
        </span>
        <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-[var(--color-border)]">
              {filtered.map((item) => (
                <div key={item.term} className="px-4 py-3 bg-[var(--color-surface)]">
                  <dt className="text-sm font-semibold text-[var(--color-text)] mb-1">
                    {item.term}
                  </dt>
                  <dd className="text-sm text-[var(--color-text-secondary)] leading-relaxed m-0">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GlossarySection({ glossary, title }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState(false)

  if (!glossary) return null

  const levels = ['beginner', 'mid', 'senior']
  const hasTerms = levels.some((l) => glossary[l]?.length > 0)
  if (!hasTerms) return null

  const normalizedQuery = searchQuery.toLowerCase().trim()

  return (
    <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 mb-4 bg-transparent border-none cursor-pointer text-left p-0"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)]/10">
          <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--color-text)]">
            Glossary
          </h3>
          {title && (
            <p className="text-xs text-[var(--color-text-secondary)]">{title}</p>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>

            <div className="space-y-3">
              {levels.map((level) =>
                glossary[level]?.length > 0 ? (
                  <GlossaryLevelGroup
                    key={level}
                    level={level}
                    terms={glossary[level]}
                    searchQuery={normalizedQuery}
                  />
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
