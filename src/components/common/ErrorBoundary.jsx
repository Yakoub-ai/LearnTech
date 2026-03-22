import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Page error:', error, info)
    this.props.onError?.(error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Something went wrong</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">An unexpected error occurred. Please try refreshing the page.</p>
          <div className="flex gap-3">
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium cursor-pointer border-none"
            >
              Refresh
            </button>
            <Link to="/" className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)] text-sm font-medium no-underline">
              Go Home
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
