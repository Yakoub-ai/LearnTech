import { CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ObjectiveChecklist({ objectives, level, isObjectiveComplete, toggleObjective }) {
  if (!objectives || objectives.length === 0) return null

  const completedCount = objectives.filter((_, i) => isObjectiveComplete?.(level, i)).length

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
        <h4 className="text-sm font-semibold text-[var(--color-text)]">
          Learning Objectives
        </h4>
        <span className="text-xs font-medium text-[var(--color-text-secondary)] tabular-nums">
          {completedCount}/{objectives.length} completed
        </span>
      </div>
      <div className="p-4 space-y-2">
        {objectives.map((objective, index) => {
          const isComplete = isObjectiveComplete?.(level, index)
          return (
            <motion.button
              key={index}
              onClick={() => toggleObjective?.(level, index)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer border-none text-left ${
                isComplete
                  ? 'bg-[var(--color-success)]/5'
                  : 'hover:bg-[var(--color-surface-2)]'
              }`}
              whileTap={{ scale: 0.99 }}
            >
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-[var(--color-text-secondary)]/40 shrink-0 mt-0.5" />
              )}
              <span className={`text-sm leading-relaxed ${
                isComplete
                  ? 'text-[var(--color-success)] line-through opacity-70'
                  : 'text-[var(--color-text)]'
              }`}>
                {objective}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
