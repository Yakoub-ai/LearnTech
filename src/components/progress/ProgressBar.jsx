export default function ProgressBar({ value = 0, size = 'md', showLabel = true, color = 'primary' }) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const h = heights[size] || heights.md

  const colors = {
    primary: 'bg-[var(--color-primary)]',
    indigo: 'bg-[var(--color-primary)]',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  }
  const bg = colors[color] || colors.primary

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${h} bg-[var(--color-surface-3)] rounded-full overflow-hidden`}>
        <div
          className={`${h} ${bg} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-[var(--color-text-secondary)] tabular-nums w-10 text-right">
          {Math.round(value)}%
        </span>
      )}
    </div>
  )
}
