import { useState } from 'react'
import { X, Github, Chrome } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginModal({ onClose }) {
  const { signInWithEmail, signUpWithEmail, signInWithGitHub, signInWithGoogle } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleKeyDown = (e) => { if (e.key === 'Escape') onClose() }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password)
        onClose()
      } else {
        await signUpWithEmail(email, password)
        setSuccess('Check your email to confirm your account.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose} onKeyDown={handleKeyDown}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="login-modal-title" className="text-xl font-bold text-[var(--color-text)]">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-transparent border-none cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <p className="text-green-500 text-center py-4">{success}</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer border-none"
              >
                {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-surface)] text-[var(--color-text-secondary)]">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={signInWithGitHub}
                className="flex items-center justify-center gap-2 py-2 px-4 border border-[var(--color-border)] rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface-2)] cursor-pointer bg-transparent"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center gap-2 py-2 px-4 border border-[var(--color-border)] rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface-2)] cursor-pointer bg-transparent"
              >
                <Chrome className="w-4 h-4" />
                <span>Google</span>
              </button>
            </div>

            <p className="text-center text-sm text-[var(--color-text-secondary)]">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null) }}
                className="text-[var(--color-primary)] hover:underline bg-transparent border-none cursor-pointer"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
