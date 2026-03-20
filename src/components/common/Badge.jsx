const variants = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  mid: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  senior: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  video: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  course: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  interactive: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  docs: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  article: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  paper: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  reference: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  guide: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  internal: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  const classes = variants[variant?.toLowerCase()] || variants.default
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes} ${className}`}>
      {children}
    </span>
  )
}
