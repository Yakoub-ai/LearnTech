import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Header />
      <div className="flex flex-1">
        {!isHome && <Sidebar />}
        <main className={`flex-1 ${isHome ? '' : 'overflow-y-auto h-[calc(100vh-4rem)]'}`}>
          {children}
          {isHome && <Footer />}
        </main>
      </div>
    </div>
  )
}
