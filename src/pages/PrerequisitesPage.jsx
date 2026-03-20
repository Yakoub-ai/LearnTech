import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GitBranch, Code2, Shield, Users, GitPullRequest, Scale, Lock } from 'lucide-react'
import { roleMarkdownContent } from '../data/markdownContent'
import MarkdownRenderer from '../components/content/MarkdownRenderer'

const sections = [
  { id: 'overview', title: 'Prerequisites Overview', icon: BookOpen, key: 'prerequisites' },
  { id: 'vscode', title: 'VS Code Setup', icon: Code2, key: 'vs-code-setup' },
  { id: 'git', title: 'Git Setup', icon: GitBranch, key: 'git' },
  { id: 'git-workflow', title: 'Git Collaboration Workflow', icon: Users, key: 'git-collaboration-workflow' },
  { id: 'branching', title: 'Branching Strategy', icon: GitPullRequest, key: 'branching-strategy' },
  { id: 'code-review', title: 'Code Review', icon: BookOpen, key: 'code-review' },
  { id: 'secure-ai', title: 'Secure AI Framework', icon: Shield, key: 'secure-ai-framework' },
  { id: 'eu-compliance', title: 'EU Compliance Guide', icon: Scale, key: 'eu-compliance-guide' },
  { id: 'secure-dev', title: 'Secure Dev Environment', icon: Lock, key: 'secure-dev-environment' },
]

export default function PrerequisitesPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const prereqContent = roleMarkdownContent._prerequisites || {}
  const currentContent = prereqContent[activeSection] || prereqContent[sections.find(s => s.id === activeSection)?.key] || ''

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Prerequisites & Setup</h1>
        <p className="text-[var(--color-text-secondary)]">
          Essential tools, configurations, and guides needed before starting any role-based learning path.
        </p>
      </motion.div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {sections.map(({ id, title, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer border transition-colors ${
              activeSection === id
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/30'
            }`}
          >
            <Icon className="w-4 h-4" />
            {title}
          </button>
        ))}
      </div>

      {currentContent ? (
        <MarkdownRenderer content={currentContent} />
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
            {sections.find(s => s.id === activeSection)?.title}
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Content for this section is available in the Role-Roadmap/Prerequisites directory.
          </p>
        </div>
      )}
    </div>
  )
}
