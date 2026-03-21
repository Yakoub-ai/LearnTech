import React, { useState } from 'react'
import { X, Flag, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const REASONS = [
  { value: 'incorrect_answer', label: 'Incorrect answer' },
  { value: 'ambiguous_question', label: 'Ambiguous question' },
  { value: 'outdated_info', label: 'Outdated information' },
  { value: 'other', label: 'Other' },
]

/**
 * Modal for flagging a quiz question with an error/issue.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} roleId
 * @param {string} level
 * @param {string|null} topicId
 * @param {number} questionIndex
 * @param {string} questionText
 */
export default function ReportQuestionModal({ isOpen, onClose, roleId, level, topicId, questionIndex, questionText }) {
  const { user } = useAuth()
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleClose = () => {
    onClose()
    // Reset after animation
    setTimeout(() => {
      setReason('')
      setDetails('')
      setSubmitted(false)
      setError(null)
    }, 300)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reason || !user) return
    setSubmitting(true)
    setError(null)
    try {
      const { error: dbError } = await supabase.from('quiz_reports').insert({
        user_id: user.id,
        role_id: roleId,
        level,
        topic_id: topicId || null,
        question_text: questionText,
        question_index: questionIndex,
        reason,
        details: details.trim() || null,
      })
      if (dbError) throw dbError
      setSubmitted(true)
    } catch (err) {
      setError('Failed to submit report. Please try again.')
      console.error('Report submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-lg rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-[var(--color-text)]">
                <Flag className="w-4 h-4 text-[var(--color-danger)]" />
                <h2 className="text-sm font-semibold">Report a Question</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-1 rounded-md hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {submitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-[var(--color-success)] mx-auto mb-3" />
                  <p className="font-medium text-[var(--color-text)] mb-1">Report submitted</p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-5">Thank you — we'll review this question.</p>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] text-sm text-[var(--color-text)] transition-colors cursor-pointer border border-[var(--color-border)]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Question preview */}
                  <div className="p-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-secondary)] mb-1">Question</p>
                    <p className="text-sm text-[var(--color-text)] line-clamp-3">{questionText}</p>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                      What's wrong with this question? <span className="text-[var(--color-danger)]">*</span>
                    </label>
                    <div className="space-y-2">
                      {REASONS.map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="radio"
                            name="reason"
                            value={value}
                            checked={reason === value}
                            onChange={() => setReason(value)}
                            className="accent-[var(--color-primary)]"
                          />
                          <span className="text-sm text-[var(--color-text)]">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                      Additional details (optional)
                    </label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={3}
                      placeholder="Describe the issue..."
                      maxLength={500}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] resize-none focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-[var(--color-danger)]">{error}</p>
                  )}

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface-2)] text-sm text-[var(--color-text)] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!reason || submitting}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none ${
                        reason && !submitting
                          ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] cursor-pointer'
                          : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] cursor-not-allowed'
                      }`}
                    >
                      {submitting ? 'Submitting…' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
