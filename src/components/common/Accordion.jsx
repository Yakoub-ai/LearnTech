import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ title, children, defaultOpen = false, icon: Icon }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] transition-colors cursor-pointer border-none text-left"
      >
        {Icon && <Icon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />}
        <span className="flex-1 text-sm font-medium text-[var(--color-text)]">{title}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          {children}
        </div>
      )}
    </div>
  )
}
