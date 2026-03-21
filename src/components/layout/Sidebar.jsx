import { Link, useLocation } from 'react-router-dom'
import { roles } from '../../data/roles'
import { getRoleIcon } from '../../data/roles'
import { languages, getLanguageIcon } from '../../data/languages'
import { ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function Sidebar() {
  const location = useLocation()
  const { isAdmin, pendingCount } = useAuth()
  const [expandedRole, setExpandedRole] = useState(null)
  const [expandedLanguage, setExpandedLanguage] = useState(null)

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      <nav className="p-4 space-y-1">
        <Link
          to="/dashboard"
          className={`block px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
            location.pathname === '/dashboard'
              ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]'
          }`}
        >
          All Roles
        </Link>
        <Link
          to="/dashboard/prerequisites"
          className={`block px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
            location.pathname === '/dashboard/prerequisites'
              ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]'
          }`}
        >
          Prerequisites
        </Link>

        <div className="pt-4 pb-2">
          <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]/60">
            Role Paths
          </span>
        </div>

        {roles.map((role) => {
          const Icon = getRoleIcon(role.icon)
          const isActive = location.pathname.startsWith(`/dashboard/role/${role.id}`)
          const isExpanded = expandedRole === role.id || isActive

          return (
            <div key={role.id}>
              <button
                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border-none bg-transparent text-left ${
                  isActive
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate flex-1">{role.name}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-6 mt-1 space-y-0.5">
                  <Link
                    to={`/dashboard/role/${role.id}`}
                    className={`block px-3 py-1.5 rounded text-xs no-underline transition-colors ${
                      location.pathname === `/dashboard/role/${role.id}`
                        ? 'text-[var(--color-primary)] font-medium'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    Overview
                  </Link>
                  {role.levels.map((level) => (
                    <Link
                      key={level}
                      to={`/dashboard/role/${role.id}/${level.toLowerCase()}`}
                      className={`block px-3 py-1.5 rounded text-xs no-underline transition-colors ${
                        location.pathname === `/dashboard/role/${role.id}/${level.toLowerCase()}`
                          ? 'text-[var(--color-primary)] font-medium'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {level}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="pt-4 pb-2">
          <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]/60">
            Language Paths
          </span>
        </div>

        {languages.map((lang) => {
          const Icon = getLanguageIcon(lang.icon)
          const isActive = location.pathname.startsWith(`/dashboard/language/${lang.id}`)
          const isExpanded = expandedLanguage === lang.id || isActive

          return (
            <div key={lang.id}>
              <button
                onClick={() => setExpandedLanguage(isExpanded ? null : lang.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border-none bg-transparent text-left ${
                  isActive
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate flex-1">{lang.name}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-6 mt-1 space-y-0.5">
                  <Link
                    to={`/dashboard/language/${lang.id}`}
                    className={`block px-3 py-1.5 rounded text-xs no-underline transition-colors ${
                      location.pathname === `/dashboard/language/${lang.id}`
                        ? 'text-[var(--color-primary)] font-medium'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    Overview
                  </Link>
                  {lang.levels.map((level) => (
                    <Link
                      key={level}
                      to={`/dashboard/language/${lang.id}/${level.toLowerCase()}`}
                      className={`block px-3 py-1.5 rounded text-xs no-underline transition-colors ${
                        location.pathname === `/dashboard/language/${lang.id}/${level.toLowerCase()}`
                          ? 'text-[var(--color-primary)] font-medium'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {level}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="pt-4">
          <Link
            to="/dashboard/progress"
            className={`block px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
              location.pathname === '/dashboard/progress'
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]'
            }`}
          >
            My Progress
          </Link>
        </div>

        {isAdmin && (
          <div className="pt-2">
            <Link
              to="/dashboard/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                location.pathname === '/dashboard/admin'
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="flex-1">Admin</span>
              {pendingCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-white font-medium">
                  {pendingCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>
    </aside>
  )
}
