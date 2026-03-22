import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]" aria-hidden="true" />
    </div>
  )
}

export default function ProtectedRoute() {
  const { user, loading, approvalStatus } = useAuth()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/" replace />

  // Approval check is still in progress (background DB query)
  if (approvalStatus === null) return <PageLoader />

  if (approvalStatus === 'pending') {
    return <Navigate to="/pending" replace />
  }

  if (approvalStatus === 'denied') {
    return <Navigate to="/denied" replace />
  }

  return <Outlet />
}
