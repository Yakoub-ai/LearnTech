import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import LoginModal from '../auth/LoginModal'
import Footer from './Footer'

export default function LandingLayout() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [loginOpen, setLoginOpen] = useState(false)

  // Redirect authenticated users straight to the dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true })
    }
  }, [loading, user, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <header className="sticky top-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <span className="font-bold text-lg text-[var(--color-text)]">Tech Hubben Learning</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer text-[var(--color-text-secondary)] border-none bg-transparent"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {user ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium no-underline hover:opacity-90 transition-opacity"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium cursor-pointer border-none hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet context={{ onSignIn: () => setLoginOpen(true) }} />
      </main>

      <Footer />

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  )
}
