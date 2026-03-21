/**
 * Progress Storage Utilities
 * localStorage-based tracking for learning progress, objectives, resources, and quizzes
 */

const STORAGE_KEY = 'tech-hubben-learning-progress';
const LEGACY_STORAGE_KEY = 'tech-hub-learning-progress';

// Migrate legacy key on first load
(function migrateLegacyStorage() {
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, legacy);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
})();

/**
 * Initialize progress storage structure
 * @returns {object} Initial progress object
 */
function getInitialProgress() {
  return {
    roles: {},
    languages: {},
    labs: {},
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Initialize a role's progress structure
 * @returns {object} Initial role progress
 */
function getInitialRoleProgress() {
  return {
    beginner: {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    },
    mid: {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    },
    senior: {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    }
  };
}

/**
 * Get all progress from localStorage
 * @returns {object} The complete progress object
 */
export function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getInitialProgress();
  } catch (error) {
    console.warn('Failed to retrieve progress from localStorage:', error);
    return getInitialProgress();
  }
}

/**
 * Save progress to localStorage
 * @param {object} progress - The progress object to save
 * @returns {boolean} Success status
 */
export function saveProgress(progress) {
  try {
    progress.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error);
    return false;
  }
}

/**
 * Get progress for a specific role
 * Returns progress breakdown by level with completion percentages
 *
 * @param {string} roleId - The role identifier
 * @returns {object} Progress object with {beginner: {...}, mid: {...}, senior: {...}, overall: number}
 */
export function getRoleProgress(roleId) {
  const allProgress = getProgress();

  if (!allProgress.roles[roleId]) {
    return null;
  }

  const roleProgress = allProgress.roles[roleId];
  const levels = ['beginner', 'mid', 'senior'];

  const result = {};
  let totalItems = 0;
  let completedItems = 0;

  levels.forEach(level => {
    const levelData = roleProgress[level] || {};
    const objectives = levelData.objectives || [];
    const resources = levelData.resources || [];

    const totalObjectives = objectives.length;
    const completedObjectives = objectives.filter(obj => obj.completed).length;

    const totalResources = resources.length;
    const completedResources = resources.filter(res => res.completed).length;

    const total = totalObjectives + totalResources;
    const completed = completedObjectives + completedResources;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    result[level] = {
      percentage,
      objectives: {
        completed: completedObjectives,
        total: totalObjectives
      },
      resources: {
        completed: completedResources,
        total: totalResources
      },
      quizScore: levelData.quizScore,
      completed: levelData.completed,
      startedAt: levelData.startedAt,
      completedAt: levelData.completedAt
    };

    totalItems += total;
    completedItems += completed;
  });

  result.overall = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return result;
}

/**
 * Mark an objective as complete or incomplete
 *
 * @param {string} roleId - The role identifier
 * @param {string} level - The level ('beginner', 'mid', 'senior')
 * @param {number} objectiveIndex - The index of the objective
 * @param {boolean} complete - Whether the objective is complete
 * @returns {boolean} Success status
 */
export function setObjectiveComplete(roleId, level, objectiveIndex, complete = true) {
  const progress = getProgress();

  if (!progress.roles[roleId]) {
    progress.roles[roleId] = getInitialRoleProgress();
  }

  if (!progress.roles[roleId][level]) {
    progress.roles[roleId][level] = {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    };
  }

  const levelProgress = progress.roles[roleId][level];

  // Ensure objectives array is initialized
  if (!levelProgress.objectives) {
    levelProgress.objectives = [];
  }

  // Ensure the objective exists at this index
  while (levelProgress.objectives.length <= objectiveIndex) {
    levelProgress.objectives.push({ completed: false, completedAt: null });
  }

  levelProgress.objectives[objectiveIndex] = {
    completed: complete,
    completedAt: complete ? new Date().toISOString() : null
  };

  // Mark level as started
  if (!levelProgress.startedAt) {
    levelProgress.startedAt = new Date().toISOString();
  }

  // Check if all items are complete to mark level as completed
  const allObjectivesComplete = levelProgress.objectives.every(obj => obj.completed);
  const allResourcesComplete = (levelProgress.resources || []).every(res => res.completed);

  if (allObjectivesComplete && allResourcesComplete && levelProgress.resources.length > 0) {
    levelProgress.completed = true;
    levelProgress.completedAt = new Date().toISOString();
  } else if (!allObjectivesComplete || !allResourcesComplete) {
    levelProgress.completed = false;
    levelProgress.completedAt = null;
  }

  return saveProgress(progress);
}

/**
 * Mark a resource as complete or incomplete
 *
 * @param {string} roleId - The role identifier
 * @param {string} level - The level ('beginner', 'mid', 'senior')
 * @param {number} resourceIndex - The index of the resource
 * @param {boolean} complete - Whether the resource is complete
 * @returns {boolean} Success status
 */
export function setResourceComplete(roleId, level, resourceIndex, complete = true) {
  const progress = getProgress();

  if (!progress.roles[roleId]) {
    progress.roles[roleId] = getInitialRoleProgress();
  }

  if (!progress.roles[roleId][level]) {
    progress.roles[roleId][level] = {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    };
  }

  const levelProgress = progress.roles[roleId][level];

  // Ensure resources array is initialized
  if (!levelProgress.resources) {
    levelProgress.resources = [];
  }

  // Ensure the resource exists at this index
  while (levelProgress.resources.length <= resourceIndex) {
    levelProgress.resources.push({ completed: false, completedAt: null });
  }

  levelProgress.resources[resourceIndex] = {
    completed: complete,
    completedAt: complete ? new Date().toISOString() : null
  };

  // Mark level as started
  if (!levelProgress.startedAt) {
    levelProgress.startedAt = new Date().toISOString();
  }

  // Check if all items are complete to mark level as completed
  const allObjectivesComplete = (levelProgress.objectives || []).every(obj => obj.completed);
  const allResourcesComplete = levelProgress.resources.every(res => res.completed);

  if (allObjectivesComplete && allResourcesComplete && levelProgress.objectives.length > 0) {
    levelProgress.completed = true;
    levelProgress.completedAt = new Date().toISOString();
  } else if (!allObjectivesComplete || !allResourcesComplete) {
    levelProgress.completed = false;
    levelProgress.completedAt = null;
  }

  return saveProgress(progress);
}

/**
 * Set quiz score for a level
 *
 * @param {string} roleId - The role identifier
 * @param {string} level - The level ('beginner', 'mid', 'senior')
 * @param {number} score - The quiz score (typically 0-100)
 * @returns {boolean} Success status
 */
export function setQuizScore(roleId, level, score) {
  const progress = getProgress();

  if (!progress.roles[roleId]) {
    progress.roles[roleId] = getInitialRoleProgress();
  }

  if (!progress.roles[roleId][level]) {
    progress.roles[roleId][level] = {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    };
  }

  progress.roles[roleId][level].quizScore = {
    score,
    scoredAt: new Date().toISOString()
  };

  return saveProgress(progress);
}

/**
 * Get progress for all roles
 *
 * @returns {object} Progress object mapping roleId to progress data
 */
export function getAllProgress() {
  const allProgress = getProgress();
  const result = {};

  for (const [roleId, roleProgress] of Object.entries(allProgress.roles)) {
    result[roleId] = getRoleProgress(roleId);
  }

  return result;
}

/**
 * Reset progress for a specific role
 *
 * @param {string} roleId - The role identifier
 * @returns {boolean} Success status
 */
export function resetProgress(roleId) {
  const progress = getProgress();

  if (progress.roles[roleId]) {
    progress.roles[roleId] = getInitialRoleProgress();
    return saveProgress(progress);
  }

  return true;
}

/**
 * Reset all progress data
 *
 * @returns {boolean} Success status
 */
export function resetAllProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('Failed to reset progress:', error);
    return false;
  }
}

/**
 * Get progress for a specific objective
 *
 * @param {string} roleId - The role identifier
 * @param {string} level - The level
 * @param {number} objectiveIndex - The objective index
 * @returns {object|null} Objective progress or null
 */
export function getObjectiveProgress(roleId, level, objectiveIndex) {
  const progress = getProgress();
  const roleProgress = progress.roles[roleId];

  if (!roleProgress || !roleProgress[level] || !roleProgress[level].objectives) {
    return null;
  }

  return roleProgress[level].objectives[objectiveIndex] || null;
}

/**
 * Get progress for a specific resource
 *
 * @param {string} roleId - The role identifier
 * @param {string} level - The level
 * @param {number} resourceIndex - The resource index
 * @returns {object|null} Resource progress or null
 */
export function getResourceProgress(roleId, level, resourceIndex) {
  const progress = getProgress();
  const roleProgress = progress.roles[roleId];

  if (!roleProgress || !roleProgress[level] || !roleProgress[level].resources) {
    return null;
  }

  return roleProgress[level].resources[resourceIndex] || null;
}

/**
 * Bulk update progress for multiple items
 *
 * @param {string} roleId - The role identifier
 * @param {string} level - The level
 * @param {Array} updates - Array of {type: 'objective'|'resource', index: number, completed: boolean}
 * @returns {boolean} Success status
 */
export function bulkUpdateProgress(roleId, level, updates) {
  const progress = getProgress();

  if (!progress.roles[roleId]) {
    progress.roles[roleId] = getInitialRoleProgress();
  }

  if (!progress.roles[roleId][level]) {
    progress.roles[roleId][level] = {
      objectives: [],
      resources: [],
      quizScore: null,
      completed: false,
      startedAt: null,
      completedAt: null
    };
  }

  const levelProgress = progress.roles[roleId][level];

  updates.forEach(update => {
    const { type, index, completed } = update;

    if (type === 'objective') {
      if (!levelProgress.objectives) levelProgress.objectives = [];
      while (levelProgress.objectives.length <= index) {
        levelProgress.objectives.push({ completed: false, completedAt: null });
      }
      levelProgress.objectives[index] = {
        completed,
        completedAt: completed ? new Date().toISOString() : null
      };
    } else if (type === 'resource') {
      if (!levelProgress.resources) levelProgress.resources = [];
      while (levelProgress.resources.length <= index) {
        levelProgress.resources.push({ completed: false, completedAt: null });
      }
      levelProgress.resources[index] = {
        completed,
        completedAt: completed ? new Date().toISOString() : null
      };
    }
  });

  return saveProgress(progress);
}

/**
 * Export progress data as JSON
 * Useful for backup or sharing progress
 *
 * @returns {string} JSON string of progress data
 */
export function exportProgressData() {
  const progress = getProgress();
  return JSON.stringify(progress, null, 2);
}

/**
 * Import progress data from JSON
 * Overwrites current progress
 *
 * @param {string} jsonData - JSON string of progress data
 * @returns {boolean} Success status
 */
export function importProgressData(jsonData) {
  try {
    const data = JSON.parse(jsonData);
    if (
      typeof data !== 'object' || data === null ||
      typeof data.roles !== 'object' ||
      typeof data.languages !== 'object' ||
      typeof data.labs !== 'object'
    ) {
      console.warn('Invalid progress data structure');
      return false;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn('Failed to import progress data:', error);
    return false;
  }
}

// ──────────────────────────────────────────────────
// Topic Quiz & Level Exam Progress (Roles)
// ──────────────────────────────────────────────────

/**
 * Store a topic quiz score for a role level.
 *
 * @param {string} roleId
 * @param {string} level - 'beginner' | 'mid' | 'senior'
 * @param {string} topicId - slug matching the content section heading
 * @param {number} score - 0-100
 */
export function setTopicQuizScore(roleId, level, topicId, score) {
  const progress = getProgress()
  if (!progress.roles[roleId]) progress.roles[roleId] = getInitialRoleProgress()
  const levelProgress = progress.roles[roleId][level] ||
    { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null }
  progress.roles[roleId][level] = levelProgress
  if (!levelProgress.topicQuizzes) levelProgress.topicQuizzes = {}
  levelProgress.topicQuizzes[topicId] = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

/**
 * Store the level exam score for a role level.
 *
 * @param {string} roleId
 * @param {string} level
 * @param {number} score - 0-100
 */
export function setLevelExamScore(roleId, level, score) {
  const progress = getProgress()
  if (!progress.roles[roleId]) progress.roles[roleId] = getInitialRoleProgress()
  const levelProgress = progress.roles[roleId][level] ||
    { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null }
  progress.roles[roleId][level] = levelProgress
  levelProgress.levelExam = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

// ──────────────────────────────────────────────────
// Language Progress
// ──────────────────────────────────────────────────

/**
 * Get progress for a specific language (mirrors getRoleProgress)
 */
export function getLanguageProgress(languageId) {
  const allProgress = getProgress();
  if (!allProgress.languages || !allProgress.languages[languageId]) {
    return null;
  }
  const langProgress = allProgress.languages[languageId];
  const levels = ['beginner', 'mid', 'senior'];
  const result = {};
  let totalItems = 0;
  let completedItems = 0;

  levels.forEach(level => {
    const levelData = langProgress[level] || {};
    const objectives = levelData.objectives || [];
    const resources = levelData.resources || [];
    const completedObjectives = objectives.filter(o => o.completed).length;
    const completedResources = resources.filter(r => r.completed).length;
    const total = objectives.length + resources.length;
    const completed = completedObjectives + completedResources;

    result[level] = {
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      quizScore: levelData.quizScore,
      completed: levelData.completed
    };
    totalItems += total;
    completedItems += completed;
  });

  result.overall = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  return result;
}

/**
 * Set quiz score for a language level
 */
export function setLanguageQuizScore(languageId, level, score) {
  const progress = getProgress();
  if (!progress.languages) progress.languages = {};
  if (!progress.languages[languageId]) {
    progress.languages[languageId] = getInitialRoleProgress();
  }
  if (!progress.languages[languageId][level]) {
    progress.languages[languageId][level] = { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null };
  }
  progress.languages[languageId][level].quizScore = { score, scoredAt: new Date().toISOString() };
  return saveProgress(progress);
}

/**
 * Store a topic quiz score for a language level.
 */
export function setLanguageTopicQuizScore(languageId, level, topicId, score) {
  const progress = getProgress()
  if (!progress.languages) progress.languages = {}
  if (!progress.languages[languageId]) progress.languages[languageId] = getInitialRoleProgress()
  const levelProgress = progress.languages[languageId][level] ||
    { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null }
  progress.languages[languageId][level] = levelProgress
  if (!levelProgress.topicQuizzes) levelProgress.topicQuizzes = {}
  levelProgress.topicQuizzes[topicId] = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

/**
 * Store the level exam score for a language level.
 */
export function setLanguageLevelExamScore(languageId, level, score) {
  const progress = getProgress()
  if (!progress.languages) progress.languages = {}
  if (!progress.languages[languageId]) progress.languages[languageId] = getInitialRoleProgress()
  const levelProgress = progress.languages[languageId][level] ||
    { objectives: [], resources: [], quizScore: null, completed: false, startedAt: null, completedAt: null }
  progress.languages[languageId][level] = levelProgress
  levelProgress.levelExam = { score, scoredAt: new Date().toISOString() }
  return saveProgress(progress)
}

// ──────────────────────────────────────────────────
// Interactive Lab Progress
// ──────────────────────────────────────────────────

/**
 * Get progress for a specific lab
 */
export function getLabProgress(labId) {
  const allProgress = getProgress();
  if (!allProgress.labs) return null;
  return allProgress.labs[labId] || null;
}

/**
 * Mark a lab step as complete/incomplete
 */
export function setLabStepComplete(labId, stepIndex, complete = true) {
  const progress = getProgress();
  if (!progress.labs) progress.labs = {};
  if (!progress.labs[labId]) {
    progress.labs[labId] = { steps: [], startedAt: null };
  }
  const labProgress = progress.labs[labId];
  while (labProgress.steps.length <= stepIndex) {
    labProgress.steps.push({ completed: false, completedAt: null });
  }
  labProgress.steps[stepIndex] = {
    completed: complete,
    completedAt: complete ? new Date().toISOString() : null
  };
  if (!labProgress.startedAt) {
    labProgress.startedAt = new Date().toISOString();
  }
  return saveProgress(progress);
}

/**
 * Get all lab progress
 */
export function getAllLabProgress() {
  const allProgress = getProgress();
  return allProgress.labs || {};
}

// ──────────────────────────────────────────────────
// Supabase Sync (dual-write — fire and forget)
// ──────────────────────────────────────────────────

/**
 * Sync a single progress item to Supabase.
 * Called after localStorage writes when the user is authenticated.
 * Never throws, never blocks UI.
 *
 * @param {object} supabase - Supabase client
 * @param {string} userId - Auth user UUID
 * @param {string} roleId - Role or language ID
 * @param {string} level - 'beginner' | 'mid' | 'senior'
 * @param {string} type - 'objective' | 'resource' | 'quiz'
 * @param {string} itemKey - Item index as string ('0', '1') or 'score' for quiz
 * @param {object} value - { completed: bool } or { score: number, date: string }
 */
export async function syncProgressItemToSupabase(supabase, userId, roleId, level, type, itemKey, value) {
  if (!supabase || !userId) return
  try {
    await supabase.from('user_progress').upsert(
      { user_id: userId, role_id: roleId, level, type, item_key: itemKey, value, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,role_id,level,type,item_key' }
    )
  } catch {
    // fire and forget — analytics must never break the app
  }
}

/**
 * Bulk-sync all localStorage progress to Supabase.
 * Called once on login to backfill any progress accumulated before login.
 * Runs in the background, never blocks.
 *
 * @param {object} supabase - Supabase client
 * @param {string} userId - Auth user UUID
 */
export async function syncAllProgressToSupabase(supabase, userId) {
  if (!supabase || !userId) return
  try {
    const allProgress = getProgress()
    const rows = []
    const now = new Date().toISOString()

    const processSection = (sectionKey, sectionData) => {
      for (const [roleId, roleData] of Object.entries(sectionData || {})) {
        for (const level of ['beginner', 'mid', 'senior']) {
          const levelData = roleData[level]
          if (!levelData) continue

          // objectives
          ;(levelData.objectives || []).forEach((obj, i) => {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'objective', item_key: String(i), value: obj, updated_at: now })
          })

          // resources
          ;(levelData.resources || []).forEach((res, i) => {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'resource', item_key: String(i), value: res, updated_at: now })
          })

          // quiz
          if (levelData.quizScore) {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'quiz', item_key: 'score', value: levelData.quizScore, updated_at: now })
          }

          // topic quizzes
          for (const [topicId, topicData] of Object.entries(levelData.topicQuizzes || {})) {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'topic_quiz', item_key: topicId, value: topicData, updated_at: now })
          }

          // level exam
          if (levelData.levelExam) {
            rows.push({ user_id: userId, role_id: roleId, level, type: 'level_exam', item_key: 'score', value: levelData.levelExam, updated_at: now })
          }
        }
      }
    }

    processSection('roles', allProgress.roles)
    processSection('languages', allProgress.languages)

    if (rows.length === 0) return

    // Batch in chunks of 100 to stay within Supabase limits
    for (let i = 0; i < rows.length; i += 100) {
      await supabase.from('user_progress').upsert(
        rows.slice(i, i + 100),
        { onConflict: 'user_id,role_id,level,type,item_key' }
      )
    }
  } catch {
    // fire and forget
  }
}
