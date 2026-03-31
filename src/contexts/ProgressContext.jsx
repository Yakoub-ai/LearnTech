import { createContext, useContext } from 'react'

const ProgressContext = createContext(null)

/**
 * Provides the full useProgress() return value to the component tree,
 * so deep children (LevelSection, ObjectiveChecklist, ResourceTable) can
 * consume progress callbacks without prop drilling through LevelJourneyBlock.
 *
 * Usage in RolePage:
 *   const progressValue = useProgress(roleId)
 *   <ProgressProvider value={progressValue}>...</ProgressProvider>
 */
export function ProgressProvider({ children, value }) {
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

/**
 * Returns the progress context value, or null if used outside a ProgressProvider.
 * Consumers should handle the null case with optional chaining.
 */
export function useProgressContext() {
  return useContext(ProgressContext)
}
