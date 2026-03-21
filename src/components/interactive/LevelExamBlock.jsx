import React, { useState } from 'react'
import { GraduationCap, Trophy, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import QuizBlock from './QuizBlock'

const PASS_THRESHOLD = 70

/**
 * Level exam wrapper around QuizBlock with exam-specific styling and pass/fail logic.
 *
 * @param {Array} questions - exam questions array
 * @param {string} roleId
 * @param {string} level
 * @param {number|null} savedScore - previously saved score (0-100) or null
 * @param {(score: number) => void} onComplete - called with 0-100 score when exam finishes
 * @param {(questionIndex: number, questionText: string) => void} [onReport]
 */
export default function LevelExamBlock({ questions, roleId, level, savedScore, onComplete, onReport }) {
  const [expanded, setExpanded] = useState(false)
  const [examScore, setExamScore] = useState(savedScore)

  if (!questions || questions.length === 0) return null

  const handleComplete = (score) => {
    setExamScore(score)
    onComplete?.(score)
  }

  const passed = examScore !== null && examScore >= PASS_THRESHOLD

  return (
    <div className="rounded-xl border-2 border-[var(--color-primary)]/30 bg-[var(--color-surface)] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer border-none text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-primary)] mb-0.5">
              Level Exam
            </p>
            <h3 className="text-base font-semibold text-[var(--color-text)]">
              {level.charAt(0).toUpperCase() + level.slice(1)} Level Assessment
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          {/* Score badge */}
          {examScore !== null && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              passed
                ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
            }`}>
              {passed && <Trophy className="w-3.5 h-3.5" />}
              {examScore}% — {passed ? 'Passed' : 'Not yet'}
            </div>
          )}

          <div className="flex flex-col items-end gap-1 text-right">
            <span className="text-xs text-[var(--color-text-secondary)]">
              {questions.length} questions · ~{Math.ceil(questions.length * 1.5)} min
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              Pass: {PASS_THRESHOLD}%
            </span>
          </div>

          {expanded
            ? <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" />
            : <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
          }
        </div>
      </button>

      {/* Exam content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-[var(--color-border)]">
              {!passed && examScore !== null && (
                <div className="mb-4 p-3 rounded-lg bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/20 text-sm text-[var(--color-text-secondary)]">
                  You scored <strong className="text-[var(--color-danger)]">{examScore}%</strong>. You need {PASS_THRESHOLD}% to pass. Review the material and try again.
                </div>
              )}
              <QuizBlock
                questions={questions}
                roleId={roleId}
                level={level}
                onComplete={handleComplete}
                onReport={onReport}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
