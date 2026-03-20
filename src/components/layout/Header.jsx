import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Search, BarChart3, Menu, X } from 'lucide-react'
import { ThemeContext } from '../../App'
import SearchModal from '../common/SearchModal'
import AuthButton from '../auth/AuthButton'

export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <img src="/LF.png" alt="Tech Hub Learning" className="h-9 w-auto" />
              <span className="font-bold text-lg text-[var(--color-text)] hidden sm:block">
                Tech Hub Learning
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                Roles
              </Link>
              <Link to="/languages" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                Languages
              </Link>
              <Link to="/prerequisites" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
                Prerequisites
              </Link>
              <Link to="/progress" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline">
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
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Roles
              </Link>
              <Link to="/languages" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Languages
              </Link>
              <Link to="/prerequisites" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
                Prerequisites
              </Link>
              <Link to="/progress" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] no-underline">
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
