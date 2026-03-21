import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon, Search, BarChart3, Menu, X } from 'lucide-react'
import { ThemeContext } from '../../App'
import SearchModal from '../common/SearchModal'
import AuthButton from '../auth/AuthButton'

export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-3 no-underline">
              <span className="font-bold text-lg text-[var(--color-text)]">
                Tech Hub Learning
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                Roles
              </Link>
              <Link to="/dashboard/languages" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                Languages
              </Link>
              <Link to="/dashboard/prerequisites" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                Prerequisites
              </Link>
              <Link to="/dashboard/progress" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" />
                  Progress
                </span>
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <AuthButton />
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] text-sm hover:border-[var(--color-primary)] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline text-xs px-1.5 py-0.5 rounded bg-[var(--color-surface-3)] border border-[var(--color-border)] font-mono">
                  Ctrl+K
                </kbd>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer text-[var(--color-text-secondary)] border-none bg-transparent"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer text-[var(--color-text-secondary)] border-none bg-transparent"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-2">
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Roles
              </Link>
              <Link to="/dashboard/languages" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Languages
              </Link>
              <Link to="/dashboard/prerequisites" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Prerequisites
              </Link>
              <Link to="/dashboard/progress" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Progress
              </Link>
            </nav>
          )}
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
