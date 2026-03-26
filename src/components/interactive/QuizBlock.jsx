import React, { useState, useMemo } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Trophy, Flag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { shuffleQuiz } from '../../utils/quizShuffle'

export default function QuizBlock({ questions = [], _roleId, _level, onComplete, topicTitle, onReport }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])
  const [shuffleSeed, setShuffleSeed] = useState(0)

  const shuffledQuestions = useMemo(() => shuffleQuiz(questions), [questions, shuffleSeed])

  if (!questions || shuffledQuestions.length === 0) return null

  const question = shuffledQuestions[currentQ]

  const handleSelect = (index) => {
    if (showResult) return
    setSelected(index)
  }

  const handleSubmit = () => {
    if (selected === null) return
    setShowResult(true)
    const correct = selected === question.correctIndex
    if (correct) setScore((s) => s + 1)
    setAnswers((a) => [...a, { question: currentQ, selected, correct }])
  }

  const handleNext = () => {
    if (currentQ + 1 >= shuffledQuestions.length) {
      setFinished(true)
      const finalCorrect = answers.filter(a => a.correct).length
      const finalScore = Math.round((finalCorrect / shuffledQuestions.length) * 100)
      onComplete?.(finalScore)
    } else {
      setCurrentQ((q) => q + 1)
      setSelected(null)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
    setShuffleSeed((s) => s + 1)
  }

  function handleAnswerKeyDown(e, index, totalAnswers) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (index + 1) % totalAnswers
      setSelected(next)
      document.getElementById(`answer-${next}`)?.focus()
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (index - 1 + totalAnswers) % totalAnswers
      setSelected(prev)
      document.getElementById(`answer-${prev}`)?.focus()
    }
  }

  if (finished) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100)
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <Trophy className={`w-12 h-12 mx-auto mb-4 ${percentage >= 70 ? 'text-amber-500' : 'text-[var(--color-text-secondary)]'}`} />
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Quiz Complete!</h3>
        <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">{score}/{shuffledQuestions.length}</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{percentage}% correct</p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] cursor-pointer text-sm font-medium text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div role="form" aria-label={topicTitle ? `Quiz: ${topicTitle}` : 'Quiz'} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {topicTitle && (
        <div className="px-5 pt-4 pb-0">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Topic Quiz</p>
          <h4 className="text-base font-semibold text-[var(--color-text)]">{topicTitle}</h4>
        </div>
      )}
      <div className={`flex items-center justify-between px-5 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]${topicTitle ? ' mt-3' : ''}`}>
        <h4 className="text-sm font-semibold text-[var(--color-text)]">Knowledge Check</h4>
        <div className="flex items-center gap-3">
          {onReport && (
            <button
              onClick={() => onReport(currentQ, question.question)}
              title="Report an issue with this question"
              className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors cursor-pointer border-none bg-transparent p-0"
            >
              <Flag className="w-3.5 h-3.5" />
              Report
            </button>
          )}
          <span className="text-xs text-[var(--color-text-secondary)]">
            Question {currentQ + 1} of {shuffledQuestions.length}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="h-1.5 bg-[var(--color-surface-3)] rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + (showResult ? 1 : 0)) / shuffledQuestions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p id="quiz-question" className="text-[var(--color-text)] font-medium mb-5 leading-relaxed">{question.question}</p>

            <div className="space-y-2.5 mb-5" role="group" aria-labelledby="quiz-question">
              {question.options.map((option, i) => {
                let styles = 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                if (showResult) {
                  if (i === question.correctIndex) {
                    styles = 'border-[var(--color-success)] bg-[var(--color-success)]/5'
                  } else if (i === selected && i !== question.correctIndex) {
                    styles = 'border-[var(--color-danger)] bg-[var(--color-danger)]/5'
                  } else {
                    styles = 'border-[var(--color-border)] opacity-50'
                  }
                } else if (i === selected) {
                  styles = 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                }

                return (
                  <button
                    key={i}
                    id={`answer-${i}`}
                    onClick={() => handleSelect(i)}
                    onKeyDown={(e) => handleAnswerKeyDown(e, i, question.options.length)}
                    aria-pressed={selected === i}
                    aria-describedby={showResult ? 'quiz-result' : undefined}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-lg border-2 transition-all cursor-pointer bg-transparent text-left ${styles}`}
                    disabled={showResult}
                  >
                    <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 text-[var(--color-text-secondary)]">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-[var(--color-text)]">{option}</span>
                    {showResult && i === question.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] ml-auto shrink-0" />
                    )}
                    {showResult && i === selected && i !== question.correctIndex && (
                      <XCircle className="w-5 h-5 text-[var(--color-danger)] ml-auto shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {showResult && question.explanation && (
              <div id="quiz-result" className="p-4 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] mb-4">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <strong className="text-[var(--color-text)]">Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selected === null}
                  aria-disabled={selected === null}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${
                    selected !== null
                      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
                      : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors border-none cursor-pointer"
                >
                  {currentQ + 1 >= shuffledQuestions.length ? 'See Results' : 'Next Question'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
