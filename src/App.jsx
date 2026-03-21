import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext, Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './components/common/ErrorBoundary'

const RolePage = lazy(() => import('./pages/RolePage'))
const LevelPage = lazy(() => import('./pages/LevelPage'))
const PrerequisitesPage = lazy(() => import('./pages/PrerequisitesPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const LanguagesPage = lazy(() => import('./pages/LanguagesPage'))
const LanguagePage = lazy(() => import('./pages/LanguagePage'))
const LanguageLevelPage = lazy(() => import('./pages/LanguageLevelPage'))

export const ThemeContext = createContext()

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]" />
    </div>
  )
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
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/prerequisites" element={<PrerequisitesPage />} />
              <Route path="/role/:roleId" element={<RolePage />} />
              <Route path="/role/:roleId/:level" element={<LevelPage />} />
              <Route path="/languages" element={<LanguagesPage />} />
              <Route path="/language/:languageId" element={<LanguagePage />} />
              <Route path="/language/:languageId/:level" element={<LanguageLevelPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ThemeContext.Provider>
  )
}

export default App
