import {
  getProgress,
  getRoleProgress,
  setObjectiveComplete,
  setResourceComplete,
  setQuizScore,
  getObjectiveProgress,
  getResourceProgress,
  getLanguageProgress,
  setLanguageQuizScore,
  getLabProgress,
  setLabStepComplete,
  getAllLabProgress,
  resetProgress,
  resetAllProgress,
  pullAndMergeFromSupabase,
} from '../utils/progressStorage'

const STORAGE_KEY = 'tech-hubben-learning-progress'

beforeEach(() => {
  localStorage.clear()
})

// ─── getProgress ────────────────────────────────────────────────────────────

describe('getProgress', () => {
  it('returns initial structure when localStorage is empty', () => {
    const progress = getProgress()
    expect(progress).toHaveProperty('roles')
    expect(progress).toHaveProperty('languages')
    expect(progress).toHaveProperty('labs')
    expect(progress).toHaveProperty('lastUpdated')
    expect(progress.roles).toEqual({})
    expect(progress.languages).toEqual({})
    expect(progress.labs).toEqual({})
  })

  it('returns stored data when localStorage has valid JSON', () => {
    const stored = { roles: { dev: {} }, languages: {}, labs: {}, lastUpdated: '2024-01-01' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    const progress = getProgress()
    expect(progress.roles).toHaveProperty('dev')
  })

  it('returns initial state (does not throw) when localStorage has corrupted JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{')
    expect(() => getProgress()).not.toThrow()
    const progress = getProgress()
    expect(progress.roles).toEqual({})
    expect(progress.languages).toEqual({})
  })
})

// ─── setObjectiveComplete / getObjectiveProgress ─────────────────────────────

describe('setObjectiveComplete', () => {
  it('marks an objective as complete', () => {
    setObjectiveComplete('engineer', 'beginner', 0, true)
    const obj = getObjectiveProgress('engineer', 'beginner', 0)
    expect(obj.completed).toBe(true)
    expect(obj.completedAt).not.toBeNull()
  })

  it('marks an objective as incomplete', () => {
    setObjectiveComplete('engineer', 'beginner', 0, true)
    setObjectiveComplete('engineer', 'beginner', 0, false)
    const obj = getObjectiveProgress('engineer', 'beginner', 0)
    expect(obj.completed).toBe(false)
    expect(obj.completedAt).toBeNull()
  })

  it('handles multiple objectives independently', () => {
    setObjectiveComplete('engineer', 'mid', 0, true)
    setObjectiveComplete('engineer', 'mid', 2, true)
    expect(getObjectiveProgress('engineer', 'mid', 0).completed).toBe(true)
    expect(getObjectiveProgress('engineer', 'mid', 1).completed).toBe(false)
    expect(getObjectiveProgress('engineer', 'mid', 2).completed).toBe(true)
  })

  it('state persists across calls', () => {
    setObjectiveComplete('engineer', 'senior', 0, true)
    setObjectiveComplete('engineer', 'senior', 1, true)
    // A fresh read should still show both complete
    expect(getObjectiveProgress('engineer', 'senior', 0).completed).toBe(true)
    expect(getObjectiveProgress('engineer', 'senior', 1).completed).toBe(true)
  })

  it('returns true on success', () => {
    const result = setObjectiveComplete('engineer', 'beginner', 0, true)
    expect(result).toBe(true)
  })
})

// ─── setResourceComplete / getResourceProgress ───────────────────────────────

describe('setResourceComplete', () => {
  it('marks a resource as complete', () => {
    setResourceComplete('designer', 'beginner', 0, true)
    const res = getResourceProgress('designer', 'beginner', 0)
    expect(res.completed).toBe(true)
    expect(res.completedAt).not.toBeNull()
  })

  it('marks a resource as incomplete', () => {
    setResourceComplete('designer', 'beginner', 0, true)
    setResourceComplete('designer', 'beginner', 0, false)
    const res = getResourceProgress('designer', 'beginner', 0)
    expect(res.completed).toBe(false)
    expect(res.completedAt).toBeNull()
  })

  it('handles multiple resources independently', () => {
    setResourceComplete('designer', 'mid', 0, true)
    setResourceComplete('designer', 'mid', 2, true)
    expect(getResourceProgress('designer', 'mid', 0).completed).toBe(true)
    expect(getResourceProgress('designer', 'mid', 1).completed).toBe(false)
    expect(getResourceProgress('designer', 'mid', 2).completed).toBe(true)
  })
})

// ─── setQuizScore ─────────────────────────────────────────────────────────────

describe('setQuizScore', () => {
  it('saves a quiz score correctly', () => {
    setQuizScore('engineer', 'beginner', 85)
    const progress = getProgress()
    const quizScore = progress.roles['engineer']['beginner'].quizScore
    expect(quizScore).not.toBeNull()
    expect(quizScore.score).toBe(85)
    expect(quizScore.scoredAt).toBeTruthy()
  })

  it('overwrites a previous quiz score', () => {
    setQuizScore('engineer', 'beginner', 60)
    setQuizScore('engineer', 'beginner', 90)
    const progress = getProgress()
    expect(progress.roles['engineer']['beginner'].quizScore.score).toBe(90)
  })

  it('saves scores for different levels independently', () => {
    setQuizScore('engineer', 'beginner', 70)
    setQuizScore('engineer', 'senior', 95)
    const progress = getProgress()
    expect(progress.roles['engineer']['beginner'].quizScore.score).toBe(70)
    expect(progress.roles['engineer']['senior'].quizScore.score).toBe(95)
  })
})

// ─── lab step toggle ──────────────────────────────────────────────────────────

describe('setLabStepComplete', () => {
  it('marks a lab step as complete', () => {
    setLabStepComplete('lab-js-basics', 0, true)
    const lab = getLabProgress('lab-js-basics')
    expect(lab.steps[0].completed).toBe(true)
  })

  it('marks a lab step as incomplete', () => {
    setLabStepComplete('lab-js-basics', 0, true)
    setLabStepComplete('lab-js-basics', 0, false)
    const lab = getLabProgress('lab-js-basics')
    expect(lab.steps[0].completed).toBe(false)
    expect(lab.steps[0].completedAt).toBeNull()
  })

  it('handles multiple steps independently', () => {
    setLabStepComplete('lab-css', 0, true)
    setLabStepComplete('lab-css', 2, true)
    const lab = getLabProgress('lab-css')
    expect(lab.steps[0].completed).toBe(true)
    expect(lab.steps[1].completed).toBe(false)
    expect(lab.steps[2].completed).toBe(true)
  })

  it('sets startedAt on first interaction', () => {
    setLabStepComplete('lab-new', 0, true)
    const lab = getLabProgress('lab-new')
    expect(lab.startedAt).not.toBeNull()
  })
})

// ─── getRoleProgress ─────────────────────────────────────────────────────────

describe('getRoleProgress', () => {
  it('returns null when role has no progress data', () => {
    const result = getRoleProgress('nonexistent-role')
    expect(result).toBeNull()
  })

  it('returns structured progress after adding objectives', () => {
    setObjectiveComplete('pm', 'beginner', 0, true)
    setObjectiveComplete('pm', 'beginner', 1, true)
    const result = getRoleProgress('pm')
    expect(result).not.toBeNull()
    expect(result.beginner).toBeDefined()
    expect(result.beginner.objectives.completed).toBe(2)
    expect(result.beginner.objectives.total).toBe(2)
    expect(result.beginner.percentage).toBe(100)
  })

  it('calculates overall percentage across levels', () => {
    setObjectiveComplete('analyst', 'beginner', 0, true)
    setObjectiveComplete('analyst', 'mid', 0, false)
    const result = getRoleProgress('analyst')
    expect(typeof result.overall).toBe('number')
    expect(result.overall).toBeGreaterThanOrEqual(0)
    expect(result.overall).toBeLessThanOrEqual(100)
  })

  it('returns quizScore in the level data', () => {
    setQuizScore('analyst', 'beginner', 75)
    const result = getRoleProgress('analyst')
    expect(result.beginner.quizScore).not.toBeNull()
    expect(result.beginner.quizScore.score).toBe(75)
  })

  it('counts completed resources separately from objectives', () => {
    setObjectiveComplete('dev', 'senior', 0, true)
    setResourceComplete('dev', 'senior', 0, true)
    const result = getRoleProgress('dev')
    expect(result.senior.objectives.completed).toBe(1)
    expect(result.senior.resources.completed).toBe(1)
    expect(result.senior.percentage).toBe(100)
  })
})

// ─── getLanguageProgress ──────────────────────────────────────────────────────

describe('getLanguageProgress', () => {
  it('returns null when language has no progress data', () => {
    const result = getLanguageProgress('python')
    expect(result).toBeNull()
  })

  it('returns structured progress after saving a language quiz score', () => {
    setLanguageQuizScore('python', 'beginner', 80)
    const result = getLanguageProgress('python')
    expect(result).not.toBeNull()
    expect(result.beginner).toBeDefined()
    expect(result.beginner.quizScore).toBeDefined()
    expect(result.beginner.quizScore.score).toBe(80)
  })

  it('computes overall percentage', () => {
    setLanguageQuizScore('rust', 'mid', 60)
    const result = getLanguageProgress('rust')
    // No objectives/resources, so total items = 0 → overall = 0
    expect(result.overall).toBe(0)
  })
})

// ─── getAllLabProgress ────────────────────────────────────────────────────────

describe('getAllLabProgress', () => {
  it('returns an empty object when no labs have been started', () => {
    const result = getAllLabProgress()
    expect(result).toEqual({})
  })

  it('returns all started labs', () => {
    setLabStepComplete('lab-a', 0, true)
    setLabStepComplete('lab-b', 1, true)
    const result = getAllLabProgress()
    expect(result).toHaveProperty('lab-a')
    expect(result).toHaveProperty('lab-b')
  })
})

// ─── resetProgress / resetAllProgress ────────────────────────────────────────

describe('resetProgress', () => {
  it('resets a specific role to initial state', () => {
    setObjectiveComplete('qa', 'beginner', 0, true)
    resetProgress('qa')
    const result = getRoleProgress('qa')
    expect(result.beginner.objectives.completed).toBe(0)
  })

  it('does not affect other roles', () => {
    setObjectiveComplete('devops', 'beginner', 0, true)
    setObjectiveComplete('security', 'beginner', 0, true)
    resetProgress('devops')
    expect(getRoleProgress('security').beginner.objectives.completed).toBe(1)
  })
})

describe('resetAllProgress', () => {
  it('clears all progress from localStorage', () => {
    setObjectiveComplete('engineer', 'beginner', 0, true)
    resetAllProgress()
    const progress = getProgress()
    expect(progress.roles).toEqual({})
  })
})

// ─── pullAndMergeFromSupabase ──────────────────────────────────────────────────

function makeSupabase(rows) {
  return {
    from: () => ({
      select: () => ({
        eq: () => Promise.resolve({ data: rows, error: null }),
      }),
    }),
  }
}

const FUTURE = '2099-01-01T00:00:00.000Z'
const PAST = '2000-01-01T00:00:00.000Z'

describe('pullAndMergeFromSupabase', () => {
  it('does nothing when supabase is null', async () => {
    await expect(pullAndMergeFromSupabase(null, 'user-1')).resolves.toBeUndefined()
  })

  it('does nothing when userId is null', async () => {
    await expect(pullAndMergeFromSupabase(makeSupabase([]), null)).resolves.toBeUndefined()
  })

  it('does nothing when Supabase returns no rows', async () => {
    await pullAndMergeFromSupabase(makeSupabase([]), 'user-1')
    expect(getProgress().roles).toEqual({})
  })

  it('populates empty localStorage with Supabase data', async () => {
    const rows = [
      { role_id: 'engineer', level: 'beginner', type: 'objective', item_key: '0',
        value: { completed: true, completedAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    const progress = getProgress()
    expect(progress.roles.engineer.beginner.objectives[0].completed).toBe(true)
  })

  it('remote-newer wins: overwrites older local objective', async () => {
    setObjectiveComplete('engineer', 'beginner', 0, true)
    // Force an old completedAt onto the local entry
    const progress = getProgress()
    progress.roles.engineer.beginner.objectives[0].completedAt = PAST
    progress.roles.engineer.beginner.objectives[0].completed = false
    localStorage.setItem('tech-hubben-learning-progress', JSON.stringify(progress))

    const rows = [
      { role_id: 'engineer', level: 'beginner', type: 'objective', item_key: '0',
        value: { completed: true, completedAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    expect(getProgress().roles.engineer.beginner.objectives[0].completed).toBe(true)
  })

  it('local-newer wins: does not overwrite newer local objective', async () => {
    setObjectiveComplete('engineer', 'beginner', 0, true)
    const progress = getProgress()
    progress.roles.engineer.beginner.objectives[0].completedAt = FUTURE
    localStorage.setItem('tech-hubben-learning-progress', JSON.stringify(progress))

    const rows = [
      { role_id: 'engineer', level: 'beginner', type: 'objective', item_key: '0',
        value: { completed: false, completedAt: PAST }, updated_at: PAST },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    expect(getProgress().roles.engineer.beginner.objectives[0].completed).toBe(true)
  })

  it('adds Supabase items that are not present in localStorage', async () => {
    // Local has objective 0, Supabase has objective 1
    setObjectiveComplete('engineer', 'beginner', 0, true)
    const rows = [
      { role_id: 'engineer', level: 'beginner', type: 'objective', item_key: '1',
        value: { completed: true, completedAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    const objs = getProgress().roles.engineer.beginner.objectives
    expect(objs[0].completed).toBe(true)
    expect(objs[1].completed).toBe(true)
  })

  it('merges quiz score from Supabase when none exists locally', async () => {
    const rows = [
      { role_id: 'engineer', level: 'mid', type: 'quiz', item_key: 'score',
        value: { score: 90, scoredAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    expect(getProgress().roles.engineer.mid.quizScore.score).toBe(90)
  })

  it('merges topic_quiz score from Supabase', async () => {
    const rows = [
      { role_id: 'engineer', level: 'beginner', type: 'topic_quiz', item_key: 'arrays',
        value: { score: 80, scoredAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    expect(getProgress().roles.engineer.beginner.topicQuizzes.arrays.score).toBe(80)
  })

  it('merges level_exam score from Supabase', async () => {
    const rows = [
      { role_id: 'engineer', level: 'senior', type: 'level_exam', item_key: 'score',
        value: { score: 95, scoredAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    expect(getProgress().roles.engineer.senior.levelExam.score).toBe(95)
  })

  it('classifies language IDs under languages section', async () => {
    const rows = [
      { role_id: 'python', level: 'beginner', type: 'objective', item_key: '0',
        value: { completed: true, completedAt: FUTURE }, updated_at: FUTURE },
    ]
    await pullAndMergeFromSupabase(makeSupabase(rows), 'user-1')
    const progress = getProgress()
    expect(progress.languages.python.beginner.objectives[0].completed).toBe(true)
    expect(progress.roles.python).toBeUndefined()
  })

  it('does not throw when Supabase rejects', async () => {
    const broken = {
      from: () => ({
        select: () => ({
          eq: () => Promise.reject(new Error('network error')),
        }),
      }),
    }
    await expect(pullAndMergeFromSupabase(broken, 'user-1')).resolves.toBeUndefined()
  })

  it('does not throw when Supabase returns an error object', async () => {
    const errClient = {
      from: () => ({
        select: () => ({
          eq: () => Promise.resolve({ data: null, error: { message: 'DB error' } }),
        }),
      }),
    }
    await expect(pullAndMergeFromSupabase(errClient, 'user-1')).resolves.toBeUndefined()
  })
})
