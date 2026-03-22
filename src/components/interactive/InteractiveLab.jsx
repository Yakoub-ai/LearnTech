import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown, Lightbulb, Eye, EyeOff, CheckCircle2, Clock, Wrench } from 'lucide-react'

function ExpectedOutputToggle({ output }) {
  const [show, setShow] = useState(false)
  return (
    <div className="mb-4">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer bg-transparent border-none"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {show ? 'Hide Expected Output' : 'Show Expected Output'}
      </button>
      {show && (
        <div className="mt-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <pre className="text-sm text-emerald-800 dark:text-emerald-300 font-mono whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}
import CopyButton from '../common/CopyButton'
import { getLabProgress, setLabStepComplete } from '../../utils/progressStorage'

function StepCard({ step, stepIndex, labId, isActive, onActivate, onSwitchTab }) {
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const labProgress = getLabProgress(labId)
  const isComplete = labProgress?.steps?.[stepIndex]?.completed || false

  const handleComplete = () => {
    setLabStepComplete(labId, stepIndex, !isComplete)
  }

  return (
    <div className={`border rounded-xl transition-all ${
      isActive
        ? 'border-[var(--color-primary)] bg-[var(--color-surface)]'
        : isComplete
        ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10'
        : 'border-[var(--color-border)] bg-[var(--color-surface)]'
    }`}>
      <button
        onClick={onActivate}
        className="w-full flex items-center gap-3 p-4 text-left cursor-pointer bg-transparent border-none"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
          isComplete
            ? 'bg-emerald-500 text-white'
            : isActive
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)]'
        }`}>
          {isComplete ? <CheckCircle2 className="w-4 h-4" /> : stepIndex + 1}
        </div>
        <span className={`font-medium flex-1 ${isComplete ? 'text-emerald-700 dark:text-emerald-400' : 'text-[var(--color-text)]'}`}>
          {step.title}
        </span>
        {isActive ? <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" /> : <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)]" />}
      </button>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-4 pb-4"
        >
          {step.setupReference && (
            <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Environment Setup Required
                </p>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                Make sure your development environment is ready before continuing.
              </p>
              <button
                onClick={() => onSwitchTab?.('setup')}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer border-none"
              >
                Go to Dev Setup →
              </button>
            </div>
          )}

          <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">{step.instruction}</p>

          {step.starterCode && (
            <div className="relative group mb-4">
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <CopyButton text={step.starterCode} />
              </div>
              <div className="absolute left-3 top-0 -translate-y-1/2 px-2 py-0.5 rounded text-xs font-mono bg-[var(--color-primary)] text-white">
                starter code
              </div>
              <pre className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg p-4 pt-6 overflow-x-auto">
                <code className="text-sm font-mono text-[var(--color-text)]">
                  {step.starterCode}
                </code>
              </pre>
            </div>
          )}

          {step.hints && step.hints.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer bg-transparent border-none"
              >
                <Lightbulb className="w-4 h-4" />
                {showHints ? 'Hide Hints' : `Show ${step.hints.length} Hint${step.hints.length > 1 ? 's' : ''}`}
              </button>
              {showHints && (
                <ul className="mt-2 pl-6 space-y-1 list-disc">
                  {step.hints.map((hint, i) => (
                    <li key={i} className="text-sm text-amber-700 dark:text-amber-400">{hint}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step.expectedOutput && (
            <ExpectedOutputToggle output={step.expectedOutput} />
          )}

          {step.solution && (
            <div className="mb-4">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)] cursor-pointer bg-transparent border-none"
              >
                {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
              {showSolution && (
                <div className="relative group mt-2">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <CopyButton text={step.solution} />
                  </div>
                  <pre className="bg-[var(--color-surface-2)] border border-[var(--color-primary)]/30 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-[var(--color-text)]">{step.solution}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border transition-colors ${
              isComplete
                ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400'
                : 'bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isComplete ? 'Completed' : 'Mark Complete'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default function InteractiveLab({ lab, onSwitchTab }) {
  const [activeStep, setActiveStep] = useState(0)
  const labProgress = getLabProgress(lab.id)
  const completedSteps = lab.steps.filter((_, i) => labProgress?.steps?.[i]?.completed).length
  const progressPercent = lab.steps.length > 0 ? Math.round((completedSteps / lab.steps.length) * 100) : 0

  return (
    <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] overflow-hidden">
      <div className="p-6 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-2)]">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-[var(--color-text)]">{lab.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            lab.level === 'beginner'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : lab.level === 'mid'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {lab.level}
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{lab.description}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <Clock className="w-3.5 h-3.5" />
            ~{lab.estimatedMinutes} min
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {completedSteps}/{lab.steps.length} steps
          </div>
          <div className="flex-1 h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-medium text-[var(--color-text-secondary)]">{progressPercent}%</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {lab.steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            stepIndex={i}
            labId={lab.id}
            isActive={activeStep === i}
            onActivate={() => setActiveStep(activeStep === i ? -1 : i)}
            onSwitchTab={onSwitchTab}
          />
        ))}
      </div>
    </div>
  )
}
