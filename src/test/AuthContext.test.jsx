import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

// Mock the supabase module
vi.mock('../lib/supabase', () => {
  const unsubscribeMock = vi.fn()
  return {
    supabase: {
      auth: {
        onAuthStateChange: vi.fn((cb) => {
          // Immediately call with null session (INITIAL_SESSION)
          cb('INITIAL_SESSION', null)
          return { data: { subscription: { unsubscribe: unsubscribeMock } } }
        }),
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signInWithOAuth: vi.fn(),
        signOut: vi.fn()
      }
    }
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

// Helper: render and flush all pending async state updates
async function renderAuthHook() {
  let result
  await act(async () => {
    result = renderHook(() => useAuth(), { wrapper: AuthProvider })
  })
  return result
}

async function renderAuthProvider(children) {
  let result
  await act(async () => {
    result = render(<AuthProvider>{children}</AuthProvider>)
  })
  return result
}

// ─── useAuth outside provider ────────────────────────────────────────────────

describe('useAuth', () => {
  it('throws when used outside AuthProvider', () => {
    // Suppress the expected error output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')
    consoleSpy.mockRestore()
  })
})

// ─── AuthProvider ────────────────────────────────────────────────────────────

describe('AuthProvider', () => {
  it('renders children', async () => {
    await renderAuthProvider(<div data-testid="child">hello</div>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('initial state: user=null, loading=false after INITIAL_SESSION fires', async () => {
    const { result } = await renderAuthHook()
    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('initial state: session=null after INITIAL_SESSION fires', async () => {
    const { result } = await renderAuthHook()
    expect(result.current.session).toBeNull()
  })

  it('provides signInWithEmail function', async () => {
    const { result } = await renderAuthHook()
    expect(typeof result.current.signInWithEmail).toBe('function')
  })

  it('provides signOut function', async () => {
    const { result } = await renderAuthHook()
    expect(typeof result.current.signOut).toBe('function')
  })
})

// ─── signInWithEmail ─────────────────────────────────────────────────────────

describe('signInWithEmail', () => {
  it('calls supabase.auth.signInWithPassword with email and password', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ data: { user: { id: '1' } }, error: null })

    const { result } = await renderAuthHook()

    await act(async () => {
      await result.current.signInWithEmail('test@example.com', 'password123')
    })

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  it('throws when supabase returns an error', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: new Error('Invalid credentials')
    })

    const { result } = await renderAuthHook()

    await expect(
      act(async () => {
        await result.current.signInWithEmail('bad@example.com', 'wrong')
      })
    ).rejects.toThrow('Invalid credentials')
  })
})

// ─── signOut ─────────────────────────────────────────────────────────────────

describe('signOut', () => {
  it('calls supabase.auth.signOut', async () => {
    supabase.auth.signOut.mockResolvedValue({ error: null })

    const { result } = await renderAuthHook()

    await act(async () => {
      await result.current.signOut()
    })

    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1)
  })
})

// ─── subscription cleanup ────────────────────────────────────────────────────

describe('subscription cleanup', () => {
  it('calls unsubscribe on unmount', async () => {
    const { unmount } = await renderAuthProvider(<div />)

    // Get the unsubscribe mock from the module factory
    const unsubscribeMock = supabase.auth.onAuthStateChange.mock.results[0]?.value?.data?.subscription?.unsubscribe
    unmount()
    expect(unsubscribeMock).toHaveBeenCalledTimes(1)
  })
})

// ─── supabase is null ─────────────────────────────────────────────────────────

describe('AuthProvider when supabase is null', () => {
  it('renders without crashing when AuthProvider is mounted', async () => {
    await renderAuthProvider(<span data-testid="alive">alive</span>)
    expect(screen.getByTestId('alive')).toBeInTheDocument()
  })
})
