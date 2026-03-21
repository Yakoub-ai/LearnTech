import { Clock, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function PendingApprovalPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">
          Pending Approval
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-2">
          Your account request has been submitted and is awaiting review.
        </p>
        <p className="text-[var(--color-text-secondary)] mb-8">
          You'll receive access once an admin approves your request.
        </p>

        {user?.email && (
          <div className="flex items-center justify-center gap-2 mb-8 text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-2)] rounded-lg px-4 py-3 border border-[var(--color-border)]">
            <Mail className="w-4 h-4 shrink-0" />
            <span>{user.email}</span>
          </div>
        )}

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
