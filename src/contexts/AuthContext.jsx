import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { syncAllProgressToSupabase, pullAndMergeFromSupabase } from '../utils/progressStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [approvalStatus, setApprovalStatus] = useState(null) // 'pending' | 'approved' | 'denied' | null
  const [isAdmin, setIsAdmin] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)

  const fetchApprovalStatus = useCallback(async (currentUser) => {
    if (!supabase || !currentUser) {
      // No Supabase configured — dev mode, grant access
      setApprovalStatus('approved')
      setIsAdmin(false)
      return
    }

    try {
      // Check admin status via app_metadata (server-side, set via Supabase dashboard or admin API)
      const adminFlag = currentUser.app_metadata?.role === 'admin'
      setIsAdmin(adminFlag)

      if (adminFlag) {
        setApprovalStatus('approved')
        // Pull remote progress first, then push merged state (fire-and-forget)
        pullAndMergeFromSupabase(supabase, currentUser.id)
          .then(() => syncAllProgressToSupabase(supabase, currentUser.id))
        // Fetch pending count for admin badge
        const { count } = await supabase
          .from('user_approvals')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')
        setPendingCount(count || 0)
        return
      }

      const { data, error } = await supabase
        .from('user_approvals')
        .select('status')
        .eq('id', currentUser.id)
        .single()

      if (error || !data) {
        // Row not yet created (e.g., trigger hasn't fired) — treat as pending
        setApprovalStatus('pending')
      } else {
        setApprovalStatus(data.status)
        if (data.status === 'approved') {
          // Pull remote progress first, then push merged state (fire-and-forget)
          pullAndMergeFromSupabase(supabase, currentUser.id)
            .then(() => syncAllProgressToSupabase(supabase, currentUser.id))
        }
      }
    } catch {
      setApprovalStatus('pending')
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      setApprovalStatus('approved')
      return
    }

    // Track whether initial session has already been handled by getSession()
    // to avoid double-processing when onAuthStateChange also fires INITIAL_SESSION
    const initialHandled = { current: false }
    // Prevent duplicate concurrent approval checks
    const approvalCheckRunning = { current: false }

    // Safety net: getSession() reads localStorage (instant), so 3s is ample.
    // Only fires if Supabase is unreachable or something is truly broken.
    const timeoutId = setTimeout(() => {
      setLoading((current) => {
        if (current) console.warn('[Auth] Session check timed out — unblocking UI')
        return false
      })
    }, 3_000)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Skip INITIAL_SESSION if getSession() already handled it
      if (event === 'INITIAL_SESSION' && initialHandled.current) return

      // Unblock the UI immediately — don't wait for the approval DB query
      setSession(session)
      setUser(session?.user ?? null)
      clearTimeout(timeoutId)
      setLoading(false)

      if (session?.user) {
        // Fetch approval status in background (non-blocking)
        if (!approvalCheckRunning.current) {
          approvalCheckRunning.current = true
          fetchApprovalStatus(session.user).finally(() => {
            approvalCheckRunning.current = false
          })
        }
      } else {
        setApprovalStatus(null)
        setIsAdmin(false)
        setPendingCount(0)
      }
    })

    // Explicit session bootstrap — reads from localStorage, resolves instantly
    supabase.auth.getSession().then(({ data: { session } }) => {
      initialHandled.current = true

      // Unblock the UI immediately
      setSession(session)
      setUser(session?.user ?? null)
      clearTimeout(timeoutId)
      setLoading(false)

      if (session?.user) {
        // Fetch approval status in background (non-blocking)
        if (!approvalCheckRunning.current) {
          approvalCheckRunning.current = true
          fetchApprovalStatus(session.user).finally(() => {
            approvalCheckRunning.current = false
          })
        }
      } else {
        setApprovalStatus(null)
      }
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [fetchApprovalStatus])

  async function signInWithEmail(email, password) {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signUpWithEmail(email, password) {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  async function signInWithGitHub() {
    if (!supabase) throw new Error('Supabase not configured')
    const base = import.meta.env.VITE_APP_URL || window.location.origin
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${base}/dashboard` }
    })
    if (error) throw error
  }

  async function signInWithGoogle() {
    if (!supabase) throw new Error('Supabase not configured')
    const base = import.meta.env.VITE_APP_URL || window.location.origin
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${base}/dashboard` }
    })
    if (error) throw error
  }

  async function signOut() {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{
      user, session, loading,
      approvalStatus, isAdmin, pendingCount,
      signInWithEmail, signUpWithEmail,
      signInWithGitHub, signInWithGoogle,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
