import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Code2, BookOpen, Wrench, BrainCircuit, FlaskConical } from 'lucide-react'
import { getLanguageById, getLanguageIcon } from '../data/languages'
import { getRoleById } from '../data/roles'
import {
  loadLanguageMarkdownContent,
  loadLanguageQuizzes,
  loadLanguageSkillDiagram,
  loadLanguageCodeSandbox,
  loadLanguageLabs,
  loadLanguageSetupGuide,
} from '../data/loaders/languageDataLoader'
import MarkdownRenderer from '../components/content/MarkdownRenderer'
import SkillDiagram from '../components/roadmap/SkillDiagram'
import CodeSandbox from '../components/interactive/CodeSandbox'
import SetupGuide from '../components/interactive/SetupGuide'
import QuizBlock from '../components/interactive/QuizBlock'
import InteractiveLab from '../components/interactive/InteractiveLab'
import Badge from '../components/common/Badge'

const tabs = [
  { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
  { id: 'diagram', label: 'Skill Map', icon: BrainCircuit },
  { id: 'sandbox', label: 'Code Lab', icon: Code2 },
  { id: 'labs', label: 'Interactive Labs', icon: FlaskConical },
  { id: 'setup', label: 'Dev Setup', icon: Wrench },
]

const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  amber: 'from-amber-500 to-amber-600',
  orange: 'from-orange-500 to-orange-600',
  cyan: 'from-cyan-500 to-cyan-600',
  indigo: 'from-[#005aa0] to-[#004580]',
}

export default function LanguagePage() {
  const { languageId } = useParams()
  const language = getLanguageById(languageId)
  const [activeTab, setActiveTab] = useState('roadmap')

  const [content, setContent] = useState(null)
  const [langQuizzes, setLangQuizzes] = useState(null)
  const [diagram, setDiagram] = useState(undefined)
  const [examples, setExamples] = useState(undefined)
  const [labs, setLabs] = useState(undefined)
  const [setupGuide, setSetupGuide] = useState(undefined)
  const [loadError, setLoadError] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)

  // Reset tab data when language changes
  useEffect(() => {
    setDiagram(undefined)
    setExamples(undefined)
    setLabs(undefined)
    setSetupGuide(undefined)
  }, [languageId])

  // Load markdown content and quizzes on mount (needed for roadmap tab)
  useEffect(() => {
    if (!language) return
    setContentLoading(true)
    Promise.all([
      loadLanguageMarkdownContent(languageId),
      loadLanguageQuizzes(languageId)
    ]).then(([c, q]) => {
      setContent(c)
      setLangQuizzes(q)
      setContentLoading(false)
    }).catch(() => {
      setLoadError('Failed to load content. Please refresh.')
      setContentLoading(false)
    })
  }, [languageId, language])

  // Load tab-specific data only when that tab is selected
  useEffect(() => {
    if (!language) return
    if (activeTab === 'diagram' && diagram === undefined) {
      loadLanguageSkillDiagram(languageId).then(setDiagram).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'sandbox' && examples === undefined) {
      loadLanguageCodeSandbox(languageId).then((data) => setExamples(data || [])).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'labs' && labs === undefined) {
      loadLanguageLabs(languageId).then(setLabs).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'setup' && setupGuide === undefined) {
      loadLanguageSetupGuide(languageId).then(setSetupGuide).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
  }, [activeTab, languageId, language, diagram, examples, labs, setupGuide])

  if (!language) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Language Not Found</h1>
        <Link to="/languages" className="text-[var(--color-primary)]">Back to Languages</Link>
      </div>
    )
  }

  const Icon = getLanguageIcon(language.icon)
  const gradient = colorMap[language.color] || colorMap.blue

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <Link to="/languages" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        All Languages
      </Link>

      {loadError && (
        <div className="p-4 text-red-500 text-center">{loadError}</div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">{language.name}</h1>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">{language.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {language.relatedRoles.map((roleId) => {
                const role = getRoleById(roleId)
                return role ? (
                  <Link
                    key={roleId}
                    to={`/role/${roleId}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors no-underline"
                  >
                    {role.name}
                  </Link>
                ) : null
              })}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-1 mb-8 overflow-x-auto border-b border-[var(--color-border)] pb-px">
        {tabs.map(({ id, label, icon: TabIcon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer bg-transparent whitespace-nowrap ${
              activeTab === id
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border)]'
            }`}
          >
            <TabIcon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'roadmap' && (
        contentLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            {language.levels.map((level) => {
              const levelKey = level.toLowerCase()
              const levelContent = content ? content[levelKey] : null
              const levelQuizzes = langQuizzes ? langQuizzes[levelKey] : null
              return (
                <div key={level}>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={levelKey}>{level}</Badge>
                    <Link
                      to={`/language/${languageId}/${levelKey}`}
                      className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] no-underline"
                    >
                      View full guide →
                    </Link>
                  </div>
                  {levelContent ? (
                    <MarkdownRenderer content={levelContent.slice(0, 2000) + '\n\n---\n\n*[View the complete guide →](/language/' + languageId + '/' + levelKey + ')*'} />
                  ) : (
                    <div className="p-6 rounded-lg border border-dashed border-[var(--color-border)] text-center">
                      <p className="text-[var(--color-text-secondary)]">Content coming soon for {language.name} {level}</p>
                    </div>
                  )}
                  {levelQuizzes && levelQuizzes.length > 0 && (
                    <div className="mt-6">
                      <QuizBlock
                        questions={levelQuizzes}
                        roleId={languageId}
                        level={levelKey}
                        onComplete={() => {}}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      )}

      {activeTab === 'diagram' && (
        diagram ? (
          <SkillDiagram diagram={diagram} title={`${language.name} Skill Roadmap`} />
        ) : (
          <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
            <BrainCircuit className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
            <p className="text-[var(--color-text-secondary)]">Skill diagram coming soon</p>
          </div>
        )
      )}

      {activeTab === 'sandbox' && (
        examples && examples.length > 0 ? (
          <CodeSandbox examples={examples} roleId={languageId} />
        ) : (
          <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
            <Code2 className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
            <p className="text-[var(--color-text-secondary)]">Code examples coming soon</p>
          </div>
        )
      )}

      {activeTab === 'labs' && (
        labs && labs.length > 0 ? (
          <div className="space-y-6">
            {labs.map((lab) => (
              <InteractiveLab key={lab.id} lab={lab} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
            <FlaskConical className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
            <p className="text-[var(--color-text-secondary)]">Interactive labs coming soon</p>
          </div>
        )
      )}

      {activeTab === 'setup' && (
        setupGuide ? (
          <SetupGuide guide={setupGuide} roleId={languageId} />
        ) : (
          <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
            <Wrench className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
            <p className="text-[var(--color-text-secondary)]">Dev setup guide coming soon</p>
          </div>
        )
      )}
    </div>
  )
}
