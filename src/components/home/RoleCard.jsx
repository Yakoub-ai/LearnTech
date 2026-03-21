import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { getRoleIcon } from '../../data/roles'
import ProgressBar from '../progress/ProgressBar'
import { getRoleProgress } from '../../utils/progressStorage'

const colorMap = {
  indigo: 'from-[#005aa0] to-[#004580]',
  emerald: 'from-emerald-500 to-emerald-600',
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  blue: 'from-blue-500 to-blue-600',
  pink: 'from-pink-500 to-pink-600',
  violet: 'from-violet-500 to-violet-600',
  lime: 'from-lime-500 to-lime-600',
  red: 'from-red-500 to-red-600',
  amber: 'from-amber-500 to-amber-600',
}

export default function RoleCard({ role, index }) {
  const Icon = getRoleIcon(role.icon)
  const gradient = colorMap[role.color] || colorMap.indigo
  const rp = getRoleProgress(role.id)
  const progress = rp ? { overall: rp.overall || 0 } : { overall: 0 }
  const totalHours = role.estimatedHours.beginner + role.estimatedHours.mid + role.estimatedHours.senior

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/dashboard/role/${role.id}`}
        className="group block p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300 no-underline h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
        </div>

        <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
          {role.name}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2 leading-relaxed">
          {role.description}
        </p>

        <div className="flex items-center gap-2 mb-3 text-xs text-[var(--color-text-secondary)]">
          <Clock className="w-3.5 h-3.5" />
          <span>{totalHours}+ hours</span>
          <span className="mx-1">|</span>
          <span>{role.levels.length} levels</span>
        </div>

        <ProgressBar value={progress.overall} size="sm" />

        <div className="flex gap-1.5 mt-3">
          {role.levels.map((level) => (
            <span
              key={level}
              className={`text-xs px-2 py-0.5 rounded-full ${
                level === 'Beginner'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : level === 'Mid'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              {level}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}
