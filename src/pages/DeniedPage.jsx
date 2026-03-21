import { ShieldX } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function DeniedPage() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">
          Access Denied
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Your account request was not approved. If you believe this is a mistake, please contact the platform administrator.
        </p>
        <button
          onClick={signOut}
          className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)] text-sm font-medium cursor-pointer hover:bg-[var(--color-surface-3)] transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
