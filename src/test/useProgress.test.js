import { renderHook, act } from '@testing-library/react'
import useProgress from '../components/progress/useProgress'

const STORAGE_KEY = 'tech-hub-learning-progress'

beforeEach(() => {
  localStorage.clear()
})

// ─── isObjectiveComplete ──────────────────────────────────────────────────────

describe('isObjectiveComplete', () => {
  it('returns false initially for any objective', () => {
    const { result } = renderHook(() => useProgress('engineer'))
    expect(result.current.isObjectiveComplete('beginner', 0)).toBe(false)
    expect(result.current.isObjectiveComplete('mid', 5)).toBe(false)
  })
})

// ─── toggleObjective ─────────────────────────────────────────────────────────

describe('toggleObjective', () => {
  it('marks an objective complete after one toggle', () => {
    const { result } = renderHook(() => useProgress('engineer'))

    act(() => {
      result.current.toggleObjective('beginner', 0)
    })

    expect(result.current.isObjectiveComplete('beginner', 0)).toBe(true)
  })

  it('marks an objective incomplete after two toggles', () => {
    const { result } = renderHook(() => useProgress('engineer'))

    act(() => {
      result.current.toggleObjective('beginner', 0)
    })
    act(() => {
      result.current.toggleObjective('beginner', 0)
    })

    expect(result.current.isObjectiveComplete('beginner', 0)).toBe(false)
  })

  it('can complete multiple objectives independently', () => {
    const { result } = renderHook(() => useProgress('engineer'))

    act(() => {
      result.current.toggleObjective('beginner', 0)
      result.current.toggleObjective('beginner', 2)
    })

    expect(result.current.isObjectiveComplete('beginner', 0)).toBe(true)
    expect(result.current.isObjectiveComplete('beginner', 1)).toBe(false)
    expect(result.current.isObjectiveComplete('beginner', 2)).toBe(true)
  })

  it('works across different levels', () => {
    const { result } = renderHook(() => useProgress('engineer'))

    act(() => {
      result.current.toggleObjective('beginner', 0)
      result.current.toggleObjective('senior', 0)
    })

    expect(result.current.isObjectiveComplete('beginner', 0)).toBe(true)
    expect(result.current.isObjectiveComplete('senior', 0)).toBe(true)
    expect(result.current.isObjectiveComplete('mid', 0)).toBe(false)
  })
})

// ─── isResourceComplete ───────────────────────────────────────────────────────

describe('isResourceComplete', () => {
  it('returns false initially', () => {
    const { result } = renderHook(() => useProgress('designer'))
    expect(result.current.isResourceComplete('beginner', 0)).toBe(false)
  })
})

// ─── toggleResource ───────────────────────────────────────────────────────────

describe('toggleResource', () => {
  it('marks a resource complete after one toggle', () => {
    const { result } = renderHook(() => useProgress('designer'))

    act(() => {
      result.current.toggleResource('beginner', 0)
    })

    expect(result.current.isResourceComplete('beginner', 0)).toBe(true)
  })

  it('marks a resource incomplete after two toggles', () => {
    const { result } = renderHook(() => useProgress('designer'))

    act(() => {
      result.current.toggleResource('beginner', 0)
    })
    act(() => {
      result.current.toggleResource('beginner', 0)
    })

    expect(result.current.isResourceComplete('beginner', 0)).toBe(false)
  })

  it('can complete multiple resources independently', () => {
    const { result } = renderHook(() => useProgress('designer'))

    act(() => {
      result.current.toggleResource('mid', 0)
      result.current.toggleResource('mid', 3)
    })

    expect(result.current.isResourceComplete('mid', 0)).toBe(true)
    expect(result.current.isResourceComplete('mid', 1)).toBe(false)
    expect(result.current.isResourceComplete('mid', 3)).toBe(true)
  })
})

// ─── saveQuizScore ────────────────────────────────────────────────────────────

describe('saveQuizScore', () => {
  it('saves a quiz score and retrieves it via getQuizScoreValue', () => {
    const { result } = renderHook(() => useProgress('pm'))

    act(() => {
      result.current.saveQuizScore('beginner', 85)
    })

    expect(result.current.getQuizScoreValue('beginner')).toBe(85)
  })

  it('returns null before any quiz score is saved', () => {
    const { result } = renderHook(() => useProgress('pm'))
    expect(result.current.getQuizScoreValue('senior')).toBeNull()
  })

  it('overwrites a previous score', () => {
    const { result } = renderHook(() => useProgress('pm'))

    act(() => {
      result.current.saveQuizScore('mid', 60)
    })
    act(() => {
      result.current.saveQuizScore('mid', 95)
    })

    expect(result.current.getQuizScoreValue('mid')).toBe(95)
  })

  it('saves scores for different levels independently', () => {
    const { result } = renderHook(() => useProgress('pm'))

    act(() => {
      result.current.saveQuizScore('beginner', 70)
      result.current.saveQuizScore('senior', 90)
    })

    expect(result.current.getQuizScoreValue('beginner')).toBe(70)
    expect(result.current.getQuizScoreValue('senior')).toBe(90)
  })
})

// ─── roleProgress percentages ─────────────────────────────────────────────────

describe('roleProgress', () => {
  it('returns zero percentages when no progress has been recorded', () => {
    const { result } = renderHook(() => useProgress('analyst'))
    expect(result.current.roleProgress.beginner).toBe(0)
    expect(result.current.roleProgress.mid).toBe(0)
    expect(result.current.roleProgress.senior).toBe(0)
    expect(result.current.roleProgress.overall).toBe(0)
  })

  it('updates roleProgress percentages after toggling objectives', () => {
    const { result } = renderHook(() => useProgress('analyst'))

    act(() => {
      result.current.toggleObjective('beginner', 0)
    })

    // After one objective is completed, beginner percentage should be > 0
    // (exact value depends on total objectives counted)
    expect(result.current.roleProgress.beginner).toBeGreaterThan(0)
  })
})

// ─── isolation between roleIds ────────────────────────────────────────────────

describe('isolation between different roleIds', () => {
  it('progress for one roleId does not affect another', () => {
    const { result: engineerResult } = renderHook(() => useProgress('engineer'))
    const { result: designerResult } = renderHook(() => useProgress('designer'))

    act(() => {
      engineerResult.current.toggleObjective('beginner', 0)
    })

    expect(engineerResult.current.isObjectiveComplete('beginner', 0)).toBe(true)
    expect(designerResult.current.isObjectiveComplete('beginner', 0)).toBe(false)
  })
})
