import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizBlock({ questions = [], roleId, level, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  if (!questions || questions.length === 0) return null

  const question = questions[currentQ]

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
    if (currentQ + 1 >= questions.length) {
      setFinished(true)
      const finalScore = Math.round(((score + (selected === question?.correctIndex ? 0 : 0)) / questions.length) * 100)
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
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <Trophy className={`w-12 h-12 mx-auto mb-4 ${percentage >= 70 ? 'text-amber-500' : 'text-[var(--color-text-secondary)]'}`} />
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Quiz Complete!</h3>
        <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">{score}/{questions.length}</p>
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
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
        <h4 className="text-sm font-semibold text-[var(--color-text)]">Knowledge Check</h4>
        <span className="text-xs text-[var(--color-text-secondary)]">
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>

      <div className="p-5">
        <div className="h-1.5 bg-[var(--color-surface-3)] rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-[var(--color-text)] font-medium mb-5 leading-relaxed">{question.question}</p>

            <div className="space-y-2.5 mb-5">
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
                    onClick={() => handleSelect(i)}
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
              <div className="p-4 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] mb-4">
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
                  {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
