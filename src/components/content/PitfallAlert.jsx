import { AlertTriangle } from 'lucide-react'

export default function PitfallAlert({ children }) {
  return (
    <div className="my-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h5 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Common Pitfalls</h5>
          <div className="text-sm text-amber-700 dark:text-amber-300/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
