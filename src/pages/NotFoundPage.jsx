import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl font-extrabold text-[var(--color-primary)] mb-4">404</p>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">Page Not Found</h1>
      <p className="text-[var(--color-text-secondary)] mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium no-underline">
          Go Home
        </Link>
        <Link to="/dashboard/languages" className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)] text-sm font-medium no-underline">
          Browse Languages
        </Link>
      </div>
    </div>
  )
}
