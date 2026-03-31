import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import CompletedLevelShowcase from './CompletedLevelShowcase'
import LevelSection from './LevelSection'
import QuizBlock from '../interactive/QuizBlock'

export default function LevelJourneyBlock({
  roleId,
  level,
  levelIndex,
  resources,
  objectives,
  levelProgress,
  isComplete,
  isPreviousComplete,
  stats,
  quizzes,
  onQuizComplete,
  type = 'role',
}) {
  const levelKey = level.toLowerCase()
  const isSoftLocked = levelIndex > 0 && !isPreviousComplete
  const deepDiveUrl = type === 'role'
    ? `/dashboard/role/${roleId}/${levelKey}`
    : `/dashboard/language/${roleId}/${levelKey}`

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: levelIndex * 0.1 }}
      >
        <CompletedLevelShowcase
          level={level}
          stats={stats}
          deepDiveUrl={deepDiveUrl}
        >
          <div className="space-y-6">
            <LevelSection
              roleId={roleId}
              level={level}
              resources={resources}
              objectives={objectives}
              levelProgress={levelProgress}
              embedded
            />
            {quizzes && quizzes.length > 0 && (
              <QuizBlock
                questions={quizzes}
                roleId={roleId}
                level={levelKey}
                onComplete={onQuizComplete}
              />
            )}
          </div>
        </CompletedLevelShowcase>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: levelIndex * 0.1 }}
      className={isSoftLocked ? 'opacity-60' : ''}
    >
      {isSoftLocked && (
        <div className="flex items-center gap-2 mb-3 px-1">
          <Lock className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
          <span className="text-xs text-[var(--color-text-secondary)] font-medium">
            Complete previous level first
          </span>
        </div>
      )}

      <div className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 ${isSoftLocked ? 'pointer-events-auto' : ''}`}>
        <LevelSection
          roleId={roleId}
          level={level}
          resources={resources}
          objectives={objectives}
          levelProgress={levelProgress}
          type={type}
        />

        {quizzes && quizzes.length > 0 && (
          <div className="mt-6">
            <QuizBlock
              questions={quizzes}
              roleId={roleId}
              level={levelKey}
              onComplete={onQuizComplete}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
