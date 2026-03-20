import { Key } from 'lucide-react'

export default function ConceptCard({ children }) {
  return (
    <div className="my-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5">
          <Key className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h5 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Key Concepts</h5>
          <div className="text-sm text-emerald-700 dark:text-emerald-300/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
