import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import ErrorBoundary from '../common/ErrorBoundary'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--color-primary)] focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main id="main-content" className="flex-1 overflow-y-auto h-[calc(100dvh-4rem)]">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
