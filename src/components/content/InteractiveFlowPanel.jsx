import { X } from 'lucide-react'

export default function InteractiveFlowPanel({ node, onClose }) {
  const { label, detail, code, tips } = node.data || {}

  return (
    <div className="absolute right-4 top-4 bottom-4 w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-y-auto z-10">
      {/* Header */}
      <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
        <h5 className="text-sm font-semibold text-[var(--color-text)] truncate">
          {label || node.id}
        </h5>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-[var(--color-surface-3)] cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {detail && (
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{detail}</p>
        )}

        {code && (
          <div>
            <div className="text-xs font-semibold text-[var(--color-text)] mb-1.5 uppercase tracking-wide">
              Example
            </div>
            <pre className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg p-3 overflow-x-auto">
              <code className="text-xs font-mono text-[var(--color-text)]">{code}</code>
            </pre>
          </div>
        )}

        {tips && tips.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-[var(--color-text)] mb-1.5 uppercase tracking-wide">
              Key Points
            </div>
            <ul className="space-y-1.5">
              {tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                >
                  <span className="text-[var(--color-primary)] mt-0.5 shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!detail && !code && !tips && (
          <p className="text-sm text-[var(--color-text-secondary)] italic">
            No additional details available for this node.
          </p>
        )}
      </div>
    </div>
  )
}
