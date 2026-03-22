import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminPage from '../pages/AdminPage'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

// ─── Supabase mock ────────────────────────────────────────────────────────────
// AdminPage uses a mutable fluent builder: .from().select().order() then
// optionally .eq(), all awaited on the same object. The mock must be thenable
// AND have all chain methods.
vi.mock('../lib/supabase', () => {
  function makeQuery(result) {
    const q = {
      select: vi.fn(),
      order: vi.fn(),
      eq: vi.fn(),
      then: (res, rej) => Promise.resolve(result).then(res, rej),
      catch: (rej) => Promise.resolve(result).catch(rej),
      finally: (fn) => Promise.resolve(result).finally(fn),
    }
    q.select.mockReturnValue(q)
    q.order.mockReturnValue(q)
    q.eq.mockReturnValue(q)
    return q
  }
  return {
    supabase: {
      from: vi.fn((table) => {
        if (table === 'quiz_reports') return makeQuery({ count: 0 })
        return makeQuery({ data: [], error: null, count: 0 })
      }),
    },
  }
})

// ─── Auth mock ────────────────────────────────────────────────────────────────
vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

// ─── Heavy child components (return null — factories are hoisted before JSX
//     transform runs so JSX is unavailable here) ────────────────────────────
vi.mock('../components/admin/UserProgressTable', () => ({ default: () => null }))
vi.mock('../components/admin/UsageStats', () => ({ default: () => null }))
vi.mock('../components/admin/QuizReportsPanel', () => ({ default: () => null }))

// ─── Helpers ──────────────────────────────────────────────────────────────────
function renderAdminPage(authState, initialPath = '/admin') {
  useAuth.mockReturnValue(authState)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    </MemoryRouter>
  )
}

beforeEach(() => vi.clearAllMocks())

// ─── Auth guard ───────────────────────────────────────────────────────────────
describe('AdminPage — auth guard', () => {
  it('redirects to /dashboard when user is not an admin', async () => {
    renderAdminPage({ user: { id: '1' }, isAdmin: false })
    await waitFor(() => {
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
    })
    expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
  })

  it('renders the admin dashboard when user is an admin', async () => {
    renderAdminPage({ user: { id: '1' }, isAdmin: true })
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument()
    })
  })
})

// ─── Admin UI ─────────────────────────────────────────────────────────────────
describe('AdminPage — UI structure', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: { id: '1' }, isAdmin: true })
  })

  it('renders all four section tabs', async () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /users/i })).toBeInTheDocument()
    })
    expect(screen.getByRole('tab', { name: /progress/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /analytics/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /reports/i })).toBeInTheDocument()
  })

  it('shows the Refresh button', async () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
    })
  })

  it('shows empty-state message when no users are returned', async () => {
    // supabase mock already returns data: [] — empty state should appear
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/no pending users found/i)).toBeInTheDocument()
    })
  })
})
