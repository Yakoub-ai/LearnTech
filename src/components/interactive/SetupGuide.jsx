import { useState } from 'react'
import { Terminal, CheckCircle2, Circle, Copy, Check, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react'
import CopyButton from '../common/CopyButton'

function StepItem({ step, index, isComplete, onToggle }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-xl border transition-colors ${
      isComplete
        ? 'border-[var(--color-success)]/30 bg-[var(--color-success)]/5'
        : 'border-[var(--color-border)] bg-[var(--color-surface)]'
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 cursor-pointer border-none bg-transparent text-left"
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          className="mt-0.5 shrink-0 border-none bg-transparent cursor-pointer p-0"
        >
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />
          ) : (
            <Circle className="w-5 h-5 text-[var(--color-text-secondary)]/40" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--color-primary)]">Step {index + 1}</span>
            <h4 className={`text-sm font-semibold ${isComplete ? 'text-[var(--color-success)] line-through' : 'text-[var(--color-text)]'}`}>
              {step.title}
            </h4>
          </div>
          {step.description && (
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{step.description}</p>
          )}
        </div>
        {expanded ? <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0 mt-1" /> : <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0 mt-1" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 space-y-3">
          {step.commands?.map((cmd, i) => (
            <div key={i} className="rounded-lg bg-[#1e1e1e] overflow-hidden">
              {cmd.description && (
                <div className="px-3 py-1.5 border-b border-gray-700 text-xs text-gray-400">
                  {cmd.description}
                </div>
              )}
              <div className="flex items-center gap-2 px-3 py-2">
                <Terminal className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <code className="flex-1 text-sm font-mono text-emerald-400 overflow-x-auto">
                  {cmd.cmd}
                </code>
                <CopyButton text={cmd.cmd} className="!bg-gray-700 !border-gray-600 !text-gray-300" />
              </div>
            </div>
          ))}

          {step.verification && (
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                <span className="text-xs font-semibold text-[var(--color-text)]">Verification</span>
              </div>
              <div className="rounded bg-[#1e1e1e] px-3 py-2 mb-1">
                <code className="text-xs font-mono text-emerald-400">{step.verification.cmd}</code>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Expected: {step.verification.expected}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SetupGuide({ guide, roleId }) {
  const [completedSteps, setCompletedSteps] = useState({})
  const [showTroubleshooting, setShowTroubleshooting] = useState(false)

  if (!guide) return null

  const toggleStep = (index) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const completedCount = Object.values(completedSteps).filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[var(--color-text)]">Local Development Setup</h3>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {completedCount}/{guide.steps?.length || 0} steps done
        </span>
      </div>

      {guide.prerequisites && guide.prerequisites.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
          <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Prerequisites</h4>
          <ul className="space-y-1">
            {guide.prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        {guide.steps?.map((step, index) => (
          <StepItem
            key={index}
            step={step}
            index={index}
            isComplete={completedSteps[index]}
            onToggle={() => toggleStep(index)}
          />
        ))}
      </div>

      {guide.troubleshooting && guide.troubleshooting.length > 0 && (
        <div>
          <button
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] cursor-pointer border-none bg-transparent transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            Troubleshooting ({guide.troubleshooting.length} tips)
            {showTroubleshooting ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {showTroubleshooting && (
            <div className="mt-3 space-y-3">
              {guide.troubleshooting.map((item, i) => (
                <div key={i} className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                    {item.problem}
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300/80">{item.solution}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
