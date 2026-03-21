import React, { useState, useEffect, createContext, Suspense, lazy, useRef } from 'react'
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingLayout from './components/layout/LandingLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './components/common/ErrorBoundary'
import { useAuth } from './contexts/AuthContext'
import { trackEvent } from './utils/eventTracking'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const RolePage = lazy(() => import('./pages/RolePage'))
const LevelPage = lazy(() => import('./pages/LevelPage'))
const PrerequisitesPage = lazy(() => import('./pages/PrerequisitesPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const LanguagesPage = lazy(() => import('./pages/LanguagesPage'))
const LanguagePage = lazy(() => import('./pages/LanguagePage'))
const LanguageLevelPage = lazy(() => import('./pages/LanguageLevelPage'))
const PendingApprovalPage = lazy(() => import('./pages/PendingApprovalPage'))
const DeniedPage = lazy(() => import('./pages/DeniedPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

export const ThemeContext = createContext()

function PageTracker() {
  const location = useLocation()
  const { user } = useAuth()
  const supabaseRef = useRef(null)

  useEffect(() => {
    // lazy import to avoid circular deps
    import('./lib/supabase').then(({ supabase }) => {
      supabaseRef.current = supabase
    })
  }, [])

  useEffect(() => {
    trackEvent(supabaseRef.current, user?.id ?? null, 'page_view', { path: location.pathname })
  }, [location.pathname, user?.id])

  return null
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]" />
    </div>
  )
}

// Redirects from old paths to new /dashboard paths
function RedirectRole() {
  const { roleId, level } = useParams()
  return <Navigate to={level ? `/dashboard/role/${roleId}/${level}` : `/dashboard/role/${roleId}`} replace />
}

function RedirectLanguage() {
  const { languageId, level } = useParams()
  return <Navigate to={level ? `/dashboard/language/${languageId}/${level}` : `/dashboard/language/${languageId}`} replace />
}

function RedirectSimple({ to }) {
  return <Navigate to={to} replace />
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('tech-hub-dark-mode')
    if (saved !== null) return JSON.parse(saved)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem('tech-hub-dark-mode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ErrorBoundary>
        <PageTracker />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public landing */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Auth status pages (accessible while logged in but not approved) */}
            <Route path="/pending" element={<PendingApprovalPage />} />
            <Route path="/denied" element={<DeniedPage />} />

            {/* Protected dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/role/:roleId" element={<RolePage />} />
                <Route path="/dashboard/role/:roleId/:level" element={<LevelPage />} />
                <Route path="/dashboard/languages" element={<LanguagesPage />} />
                <Route path="/dashboard/language/:languageId" element={<LanguagePage />} />
                <Route path="/dashboard/language/:languageId/:level" element={<LanguageLevelPage />} />
                <Route path="/dashboard/progress" element={<ProgressPage />} />
                <Route path="/dashboard/prerequisites" element={<PrerequisitesPage />} />
                <Route path="/dashboard/admin" element={<AdminPage />} />
              </Route>
            </Route>

            {/* Legacy redirects for bookmarked URLs */}
            <Route path="/role/:roleId" element={<RedirectRole />} />
            <Route path="/role/:roleId/:level" element={<RedirectRole />} />
            <Route path="/language/:languageId" element={<RedirectLanguage />} />
            <Route path="/language/:languageId/:level" element={<RedirectLanguage />} />
            <Route path="/languages" element={<RedirectSimple to="/dashboard/languages" />} />
            <Route path="/prerequisites" element={<RedirectSimple to="/dashboard/prerequisites" />} />
            <Route path="/progress" element={<RedirectSimple to="/dashboard/progress" />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ThemeContext.Provider>
  )
}

export default App
