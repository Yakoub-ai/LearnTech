import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, BookOpen, Code2, Users } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-surface)] via-blue-50/50 to-[var(--color-surface)] dark:via-[#001e40]/20 py-20 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-[#001e40]/30 text-[var(--color-primary)] dark:text-[#4495d1] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            16 Interactive Learning Paths
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-text)] tracking-tight leading-tight mb-6">
            Master Any{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] dark:from-[#4495d1] dark:to-[#f15c5b] bg-clip-text text-transparent">
              Tech Role
            </span>
            <br />
            From Zero to Expert
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Comprehensive roadmaps with embedded videos, interactive coding exercises,
            skill diagrams, and step-by-step setup guides for every role in modern tech.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[#003060] text-white rounded-lg font-medium transition-all shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-[var(--color-primary)]/40 no-underline"
            >
              <BookOpen className="w-5 h-5" />
              Explore Roles
            </a>
            <a
              href="#stats"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] text-[var(--color-text)] rounded-lg font-medium transition-colors no-underline"
            >
              Learn More
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { icon: BookOpen, label: '48 Guides', desc: 'Roles + languages' },
            { icon: Code2, label: '190+ Resources', desc: 'Videos, courses, docs' },
            { icon: Users, label: '16 Paths', desc: '11 roles + 5 languages' },
          ].map(({ icon: Icon, label, desc }, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div className="text-sm font-semibold text-[var(--color-text)]">{label}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
