import { motion } from 'framer-motion'
import { Lock, ArrowRight, BookOpen, Code2, GraduationCap, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import { useAuth } from '../../contexts/AuthContext'

export default function HeroSection({ onSignIn }) {
  const { user } = useAuth()

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)] py-24 sm:py-32 min-h-[90vh] flex items-center">
      <AnimatedBackground />

      {/* Bottom fade into StatsBar */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-surface-2)] to-transparent pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Invite-only badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm text-[var(--color-text-secondary)] text-sm font-medium mb-8">
            <Lock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            Private Platform — Access by Approval
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--color-text)] tracking-tight leading-[1.1] mb-6">
            Your Path to{' '}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] dark:from-[#4495d1] dark:to-[#7ec8f0] bg-clip-text text-transparent">
              Tech Mastery
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated roadmaps, embedded video courses, interactive coding labs,
            and structured guides — covering every role in modern tech.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[#003060] text-white rounded-lg font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-[var(--color-primary)]/40 no-underline text-base"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[#003060] text-white rounded-lg font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-[var(--color-primary)]/40 border-none cursor-pointer text-base"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onSignIn}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm hover:bg-[var(--color-surface-2)] text-[var(--color-text)] rounded-lg font-semibold transition-colors border-solid cursor-pointer text-base"
                >
                  Request Access
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: GraduationCap, label: '16 Role Paths', desc: 'From junior to senior' },
            { icon: BookOpen, label: '48 Guides', desc: 'Structured learning' },
            { icon: Code2, label: 'Interactive Labs', desc: 'Hands-on practice' },
            { icon: ShieldCheck, label: 'Private Access', desc: 'Curated community' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-[var(--color-surface)]/70 backdrop-blur-sm border border-[var(--color-border)] text-center"
              >
                <Icon className="w-5 h-5 mx-auto mb-2 text-[var(--color-primary)]" />
                <div className="text-sm font-semibold text-[var(--color-text)]">{item.label}</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.desc}</div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
