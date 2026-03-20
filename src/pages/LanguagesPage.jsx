import { motion } from 'framer-motion'
import { Code2, Sparkles } from 'lucide-react'
import { languages } from '../data/languages'
import { getRoleById } from '../data/roles'
import LanguageCard from '../components/home/LanguageCard'

export default function LanguagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          5 Language Deep Dives
        </div>
        <h1 className="text-4xl font-extrabold text-[var(--color-text)] mb-4">
          Language Learning Paths
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Master the core programming languages of modern tech — from fundamentals to expert-level patterns,
          with hands-on exercises, quizzes, and interactive labs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
        {languages.map((language, index) => (
          <LanguageCard key={language.id} language={language} index={index} />
        ))}
      </div>

      <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-[var(--color-primary)]" />
          Languages by Role
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div key={lang.id} className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">{lang.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {lang.relatedRoles.map((roleId) => {
                  const role = getRoleById(roleId)
                  return role ? (
                    <span key={roleId} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface-3)] text-[var(--color-text-secondary)]">
                      {role.name}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
