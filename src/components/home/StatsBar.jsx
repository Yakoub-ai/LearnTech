import { motion } from 'framer-motion'
import { BookOpen, Video, Code2, GraduationCap, Trophy, Users } from 'lucide-react'

const stats = [
  { icon: Users, value: '16', label: 'Learning Paths', color: 'text-[var(--color-primary)]' },
  { icon: GraduationCap, value: '48', label: 'Learning Guides', color: 'text-emerald-500' },
  { icon: Video, value: '70+', label: 'Video Tutorials', color: 'text-red-500' },
  { icon: BookOpen, value: '190+', label: 'Curated Resources', color: 'text-blue-500' },
  { icon: Code2, value: '16', label: 'Code Sandboxes', color: 'text-purple-500' },
  { icon: Trophy, value: '150+', label: 'Quiz Questions', color: 'text-amber-500' },
]

export default function StatsBar() {
  return (
    <section id="stats" className="bg-[var(--color-surface-2)] border-y border-[var(--color-border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
              <div className="text-2xl font-bold text-[var(--color-text)]">{value}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
