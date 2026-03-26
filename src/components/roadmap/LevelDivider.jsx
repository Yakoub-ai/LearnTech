import { ChevronDown } from 'lucide-react'

const levelColors = {
  Beginner: 'text-emerald-500',
  Mid: 'text-amber-500',
  Senior: 'text-red-500',
}

export default function LevelDivider({ nextLevel }) {
  const color = levelColors[nextLevel] || 'text-[var(--color-text-secondary)]'

  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-0.5 h-6 bg-[var(--color-border)]" />
      <div className={`flex items-center gap-1.5 text-xs font-medium ${color} py-1`}>
        <ChevronDown className="w-3.5 h-3.5" />
        <span>Next: {nextLevel} Level</span>
      </div>
      <div className="w-0.5 h-6 bg-[var(--color-border)]" />
    </div>
  )
}
