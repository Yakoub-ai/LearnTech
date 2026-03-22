import { Lightbulb } from 'lucide-react'

export default function KeyTakeaway({ children }) {
  return (
    <div className="my-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Why It Matters</h5>
          <div className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
