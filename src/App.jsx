import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RolePage from './pages/RolePage'
import LevelPage from './pages/LevelPage'
import PrerequisitesPage from './pages/PrerequisitesPage'
import ProgressPage from './pages/ProgressPage'
import LanguagesPage from './pages/LanguagesPage'
import LanguagePage from './pages/LanguagePage'
import LanguageLevelPage from './pages/LanguageLevelPage'

export const ThemeContext = createContext()

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prerequisites" element={<PrerequisitesPage />} />
          <Route path="/role/:roleId" element={<RolePage />} />
          <Route path="/role/:roleId/:level" element={<LevelPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/language/:languageId" element={<LanguagePage />} />
          <Route path="/language/:languageId/:level" element={<LanguageLevelPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </Layout>
    </ThemeContext.Provider>
  )
}

export default App
