/**
 * Progress Storage — barrel re-export
 *
 * All logic now lives in focused modules under src/utils/progress/.
 * This file keeps all existing imports across the codebase working unchanged.
 */

export { getProgress, saveProgress, getInitialRoleProgress } from './progress/core.js'

export {
  getRoleProgress,
  getAllProgress,
  getObjectiveProgress,
  getResourceProgress,
  setObjectiveComplete,
  setResourceComplete,
  setQuizScore,
  setTopicQuizScore,
  setLevelExamScore,
  bulkUpdateProgress,
  resetProgress,
  resetAllProgress,
  isLevelFullyComplete,
  getLevelStats,
  exportProgressData,
  importProgressData,
} from './progress/roleProgress.js'

export {
  getLanguageProgress,
  setLanguageQuizScore,
  setLanguageTopicQuizScore,
  setLanguageLevelExamScore,
  isLanguageLevelFullyComplete,
  getLanguageLevelStats,
} from './progress/languageProgress.js'

export {
  getLabProgress,
  setLabStepComplete,
  getAllLabProgress,
} from './progress/labProgress.js'

export {
  syncProgressItemToSupabase,
  syncAllProgressToSupabase,
  pullAndMergeFromSupabase,
} from './progress/supabaseSync.js'
