import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import { useAuth } from '../contexts/AuthContext'

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

function renderInRouter(authState, initialPath = '/dashboard') {
  useAuth.mockReturnValue(authState)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/pending" element={<div>Pending Page</div>} />
        <Route path="/denied" element={<div>Denied Page</div>} />
      </Routes>
    </MemoryRouter>
  )
}

beforeEach(() => vi.clearAllMocks())

describe('ProtectedRoute — loading states', () => {
  it('shows accessible spinner while auth is resolving', () => {
    renderInRouter({ user: null, loading: true, approvalStatus: null })
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
  })

  it('shows spinner when user is set but approvalStatus is null (background DB check in progress)', () => {
    renderInRouter({ user: { id: '1' }, loading: false, approvalStatus: null })
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
  })
})

describe('ProtectedRoute — unauthenticated', () => {
  it('redirects to / when no user is logged in', () => {
    renderInRouter({ user: null, loading: false, approvalStatus: null })
    expect(screen.getByText('Home Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})

describe('ProtectedRoute — approval gate', () => {
  it('redirects to /pending when approval is pending', () => {
    renderInRouter({ user: { id: '1' }, loading: false, approvalStatus: 'pending' })
    expect(screen.getByText('Pending Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('redirects to /denied when approval is denied', () => {
    renderInRouter({ user: { id: '1' }, loading: false, approvalStatus: 'denied' })
    expect(screen.getByText('Denied Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders the outlet when user is approved', () => {
    renderInRouter({ user: { id: '1' }, loading: false, approvalStatus: 'approved' })
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
