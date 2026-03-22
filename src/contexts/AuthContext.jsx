import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { syncAllProgressToSupabase } from '../utils/progressStorage'

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
        // Backfill any localStorage progress to Supabase (fire-and-forget)
        syncAllProgressToSupabase(supabase, currentUser.id)
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
          // Backfill any localStorage progress to Supabase (fire-and-forget)
          syncAllProgressToSupabase(supabase, currentUser.id)
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

    // Safety net: if auth never resolves within 10s, unblock the UI
    const timeoutId = setTimeout(() => {
      setLoading((current) => {
        if (current) console.warn('[Auth] Session check timed out — unblocking UI')
        return false
      })
    }, 10_000)

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Skip INITIAL_SESSION if getSession() already handled it
      if (event === 'INITIAL_SESSION' && initialHandled.current) return

      try {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await fetchApprovalStatus(session.user)
        } else {
          setApprovalStatus(null)
          setIsAdmin(false)
          setPendingCount(0)
        }
      } catch (err) {
        console.error('Auth state change error:', err)
        setApprovalStatus(null)
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
      }
    })

    // Explicit session bootstrap — more reliable than waiting for INITIAL_SESSION
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      initialHandled.current = true
      try {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await fetchApprovalStatus(session.user)
        } else {
          setApprovalStatus(null)
        }
      } catch (err) {
        console.error('Auth getSession error:', err)
        setApprovalStatus(null)
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
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
