import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { roles, getRoleIcon } from '../../data/roles'
import { languages, getLanguageIcon } from '../../data/languages'

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
        else {
          setQuery('')
          setResults([])
        }
      }
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const matched = []

    roles.forEach((role) => {
      if (role.name.toLowerCase().includes(q) || role.description.toLowerCase().includes(q)) {
        matched.push({
          type: 'role',
          roleId: role.id,
          roleName: role.name,
          icon: role.icon,
          title: role.name,
          subtitle: role.description.slice(0, 100) + '...',
          path: `/role/${role.id}`,
        })
      }

      role.levels.forEach((level) => {
        if (level.toLowerCase().includes(q)) {
          matched.push({
            type: 'level',
            roleId: role.id,
            roleName: role.name,
            icon: role.icon,
            title: `${role.name} - ${level}`,
            subtitle: `${level} level learning path`,
            path: `/role/${role.id}/${level.toLowerCase()}`,
          })
        }
      })
    })

    languages.forEach((lang) => {
      if (lang.name.toLowerCase().includes(q) || lang.description.toLowerCase().includes(q)) {
        matched.push({
          type: 'language',
          languageIcon: lang.icon,
          title: lang.name,
          subtitle: lang.description.slice(0, 100) + '...',
          path: `/language/${lang.id}`,
        })
      }

      lang.levels.forEach((level) => {
        if (level.toLowerCase().includes(q)) {
          matched.push({
            type: 'level',
            title: `${lang.name} - ${level}`,
            subtitle: `${level} level language path`,
            path: `/language/${lang.id}/${level.toLowerCase()}`,
          })
        }
      })
    })

    const keywords = ['prerequisites', 'setup', 'git', 'vs code', 'security', 'progress', 'languages']
    keywords.forEach((kw) => {
      if (kw.includes(q)) {
        if (kw === 'prerequisites' || kw === 'setup' || kw === 'git' || kw === 'vs code') {
          matched.push({
            type: 'page',
            title: 'Prerequisites & Setup',
            subtitle: 'Development environment setup guides',
            path: '/prerequisites',
          })
        }
        if (kw === 'progress') {
          matched.push({
            type: 'page',
            title: 'My Progress',
            subtitle: 'Track your learning progress',
            path: '/progress',
          })
        }
        if (kw === 'languages') {
          matched.push({
            type: 'page',
            title: 'Language Deep Dives',
            subtitle: 'Python, JavaScript, HTML/CSS, SQL, TypeScript learning paths',
            path: '/languages',
          })
        }
      }
    })

    setResults(matched.slice(0, 10))
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 bg-[var(--color-surface)] rounded-xl shadow-2xl border border-[var(--color-border)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border)]">
          <Search className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, languages, topics..."
            className="flex-1 py-4 bg-transparent border-none outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 text-base"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-[var(--color-surface-2)] cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((result, i) => {
              const Icon = result.languageIcon ? getLanguageIcon(result.languageIcon) : (result.icon ? getRoleIcon(result.icon) : ArrowRight)
              return (
                <button
                  key={i}
                  onClick={() => {
                    navigate(result.path)
                    onClose()
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer border-none bg-transparent text-left"
                >
                  <Icon className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--color-text)] truncate">{result.title}</div>
                    <div className="text-xs text-[var(--color-text-secondary)] truncate">{result.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                </button>
              )
            })}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-8 text-center text-[var(--color-text-secondary)] text-sm">
            No results found for "{query}"
          </div>
        )}

        {!query && (
          <div className="p-6 text-center text-[var(--color-text-secondary)] text-sm">
            Start typing to search across roles, languages, and content
          </div>
        )}
      </div>
    </div>
  )
}
