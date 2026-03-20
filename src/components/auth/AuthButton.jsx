import { useState, useEffect, useRef } from 'react'
import { User, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import LoginModal from './LoginModal'

export default function AuthButton() {
  const { user, signOut, loading } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!showMenu) return
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showMenu])

  if (loading) return null

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-2)] cursor-pointer bg-transparent"
          aria-label="Sign in"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </button>
        {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      </>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-2)] cursor-pointer bg-transparent"
        aria-label="User menu"
        aria-expanded={showMenu}
        aria-haspopup="menu"
      >
        <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-bold">
          {(user.email?.[0] ?? 'U').toUpperCase()}
        </div>
        <span className="max-w-[120px] truncate">{user.email}</span>
      </button>

      {showMenu && (
        <div role="menu" className="absolute right-0 mt-1 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg z-50 py-1">
          <div className="px-3 py-2 text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)] truncate">
            {user.email}
          </div>
          <button
            role="menuitem"
            onClick={async () => {
              try { await signOut() } catch (e) { console.error('Sign out failed:', e) }
              setShowMenu(false)
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-2)] cursor-pointer bg-transparent border-none"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
