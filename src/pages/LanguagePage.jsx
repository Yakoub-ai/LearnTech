import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Wrench, BrainCircuit, FlaskConical, Lock, ArrowRight } from 'lucide-react'
import { getLanguageById, getLanguageIcon } from '../data/languages'
import { getRoleById } from '../data/roles'
import { getLanguageProgress, isLanguageLevelFullyComplete, getLanguageLevelStats } from '../utils/progressStorage'
import useLanguageProgress from '../components/progress/useLanguageProgress'
import PageHelmet from '../components/seo/PageHelmet'
import StructuredData from '../components/seo/StructuredData'

const SITE_URL = import.meta.env.VITE_APP_URL || 'https://techhubb.se'
import {
  loadLanguageMarkdownContent,
  loadLanguageQuizzes,
  loadLanguageSkillDiagram,
  loadLanguageLabs,
  loadLanguageSetupGuide,
  loadLanguageGlossary,
} from '../data/loaders/languageDataLoader'
import MarkdownRenderer from '../components/content/MarkdownRenderer'
import SkillDiagram from '../components/roadmap/SkillDiagram'
import SetupGuide from '../components/interactive/SetupGuide'
import QuizBlock from '../components/interactive/QuizBlock'
import InteractiveLab from '../components/interactive/InteractiveLab'
import Badge from '../components/common/Badge'
import CompletedLevelShowcase from '../components/roadmap/CompletedLevelShowcase'
import LevelDivider from '../components/roadmap/LevelDivider'
import GlossarySection from '../components/roadmap/GlossarySection'

const tabs = [
  { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
  { id: 'diagram', label: 'Skill Map', icon: BrainCircuit },
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
  const { saveQuizScore } = useLanguageProgress(languageId)
  const [activeTab, setActiveTab] = useState('roadmap')

  const [content, setContent] = useState(null)
  const [langQuizzes, setLangQuizzes] = useState(null)
  const [glossary, setGlossary] = useState(null)
  const [diagram, setDiagram] = useState(undefined)
  const [labs, setLabs] = useState(undefined)
  const [setupGuide, setSetupGuide] = useState(undefined)
  const [loadError, setLoadError] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)

  // Reset tab data when language changes
  useEffect(() => {
    setDiagram(undefined)
    setLabs(undefined)
    setSetupGuide(undefined)
  }, [languageId])

  // Load markdown content and quizzes on mount (needed for roadmap tab)
  useEffect(() => {
    if (!language) return
    setContentLoading(true)
    Promise.allSettled([
      loadLanguageMarkdownContent(languageId),
      loadLanguageQuizzes(languageId),
      loadLanguageGlossary(languageId)
    ]).then(([contentResult, quizzesResult, glossaryResult]) => {
      setContent(contentResult.status   === 'fulfilled' ? contentResult.value   : null)
      setLangQuizzes(quizzesResult.status === 'fulfilled' ? quizzesResult.value : null)
      setGlossary(glossaryResult.status === 'fulfilled' ? glossaryResult.value  : null)
      if (contentResult.status === 'rejected') setLoadError('Failed to load content. Please refresh.')
      setContentLoading(false)
    })
  }, [languageId, language])

  // Load tab-specific data only when that tab is selected
  useEffect(() => {
    if (!language) return
    if (activeTab === 'diagram' && diagram === undefined) {
      loadLanguageSkillDiagram(languageId).then(setDiagram).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'labs' && labs === undefined) {
      loadLanguageLabs(languageId).then(setLabs).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'setup' && setupGuide === undefined) {
      loadLanguageSetupGuide(languageId).then(setSetupGuide).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
  }, [activeTab, languageId, language, diagram, labs, setupGuide])

  if (!language) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Language Not Found</h1>
        <Link to="/dashboard/languages" className="text-[var(--color-primary)]">Back to Languages</Link>
      </div>
    )
  }

  const Icon = getLanguageIcon(language.icon)
  const gradient = colorMap[language.color] || colorMap.blue

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <PageHelmet
        title={`${language.name} Learning Path`}
        description={language.description || `Learn ${language.name} from beginner to senior with structured roadmaps, quizzes, and interactive labs.`}
        path={`/dashboard/language/${languageId}`}
        ogType="article"
        subject={language.name}
        educationalLevel="Beginner, Intermediate, Advanced"
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${language.name} Learning Path`,
        "description": language.description || `Learn ${language.name} from beginner to senior with structured roadmaps, quizzes, and interactive labs.`,
        "url": `${SITE_URL}/dashboard/language/${languageId}`,
        "inLanguage": "en",
        "isAccessibleForFree": false,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Tech Hubben Learning",
          "url": SITE_URL
        },
        "educationalLevel": "Beginner to Senior",
        "teaches": language.name,
        "timeRequired": `PT${(language.estimatedHours?.beginner || 0) + (language.estimatedHours?.mid || 0) + (language.estimatedHours?.senior || 0)}H`,
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "name": `${language.name} — Beginner`,
            "courseMode": "online",
            "educationalLevel": "Beginner",
            "url": `${SITE_URL}/dashboard/language/${languageId}/beginner`
          },
          {
            "@type": "CourseInstance",
            "name": `${language.name} — Mid`,
            "courseMode": "online",
            "educationalLevel": "Intermediate",
            "url": `${SITE_URL}/dashboard/language/${languageId}/mid`
          },
          {
            "@type": "CourseInstance",
            "name": `${language.name} — Senior`,
            "courseMode": "online",
            "educationalLevel": "Advanced",
            "url": `${SITE_URL}/dashboard/language/${languageId}/senior`
          }
        ]
      }} />
      <Link to="/dashboard/languages" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline mb-6 transition-colors">
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
                    to={`/dashboard/role/${roleId}`}
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

      <div role="tablist" aria-label="Language content tabs" className="flex gap-1 mb-8 overflow-x-auto border-b border-[var(--color-border)] pb-px">
        {tabs.map(({ id, label, icon: TabIcon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`tabpanel-${id}`}
            id={`tab-${id}`}
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
        <div role="tabpanel" id="tabpanel-roadmap" aria-labelledby="tab-roadmap">
          {contentLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {language.levels.map((level, index) => {
                const levelKey = level.toLowerCase()
                const levelContent = content ? content[levelKey] : null
                const levelQuizzes = langQuizzes ? langQuizzes[levelKey] : null
                const isComplete = isLanguageLevelFullyComplete(languageId, levelKey)
                const isPreviousComplete = index === 0 || isLanguageLevelFullyComplete(languageId, language.levels[index - 1].toLowerCase())
                const isSoftLocked = index > 0 && !isPreviousComplete
                const stats = isComplete ? getLanguageLevelStats(languageId, levelKey) : null
                const deepDiveUrl = `/dashboard/language/${languageId}/${levelKey}`

                const levelContentBlock = (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant={levelKey}>{level}</Badge>
                      <Link
                        to={deepDiveUrl}
                        className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-light)] no-underline transition-colors font-medium"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        View full guide
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    {levelContent ? (
                      <>
                        <MarkdownRenderer content={(() => { const cut = levelContent.lastIndexOf('\n\n', 2000); return cut > 0 ? levelContent.slice(0, cut) : levelContent.slice(0, 2000); })()} />
                        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                          <Link
                            to={deepDiveUrl}
                            className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)] no-underline transition-colors"
                          >
                            View the complete guide →
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 rounded-lg border border-dashed border-[var(--color-border)] text-center">
                        <p className="text-[var(--color-text-secondary)]">Content coming soon for {level}</p>
                      </div>
                    )}
                    {levelQuizzes && levelQuizzes.length > 0 && (
                      <div className="mt-6">
                        <QuizBlock
                          questions={levelQuizzes}
                          roleId={languageId}
                          level={levelKey}
                          onComplete={(score) => saveQuizScore(levelKey, score)}
                        />
                      </div>
                    )}
                  </div>
                )

                return (
                  <div key={level}>
                    {index > 0 && <LevelDivider nextLevel={level} />}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={isSoftLocked ? 'opacity-60' : ''}
                    >
                      {isSoftLocked && (
                        <div className="flex items-center gap-2 mb-3 px-1">
                          <Lock className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
                          <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                            Complete previous level first
                          </span>
                        </div>
                      )}
                      {isComplete ? (
                        <CompletedLevelShowcase
                          level={level}
                          stats={stats}
                          deepDiveUrl={deepDiveUrl}
                        >
                          {levelContentBlock}
                        </CompletedLevelShowcase>
                      ) : (
                        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                          {levelContentBlock}
                        </div>
                      )}
                    </motion.div>
                  </div>
                )
              })}

              <GlossarySection glossary={glossary} title={`Key concepts and terms for ${language.name}`} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'diagram' && (
        <div role="tabpanel" id="tabpanel-diagram" aria-labelledby="tab-diagram">
          {diagram ? (
            <SkillDiagram diagram={diagram} title={`${language.name} Skill Roadmap`} />
          ) : (
            <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
              <BrainCircuit className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
              <p className="text-[var(--color-text-secondary)]">Skill diagram coming soon</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'labs' && (
        <div role="tabpanel" id="tabpanel-labs" aria-labelledby="tab-labs">
          {labs && labs.length > 0 ? (
            <div className="space-y-6">
              {labs.map((lab) => (
                <InteractiveLab key={lab.id} lab={lab} onSwitchTab={setActiveTab} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
              <FlaskConical className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
              <p className="text-[var(--color-text-secondary)]">Interactive labs coming soon</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'setup' && (
        <div role="tabpanel" id="tabpanel-setup" aria-labelledby="tab-setup">
          {setupGuide ? (
            <SetupGuide guide={setupGuide} roleId={languageId} />
          ) : (
            <div className="p-8 text-center rounded-lg border border-dashed border-[var(--color-border)]">
              <Wrench className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
              <p className="text-[var(--color-text-secondary)]">Dev setup guide coming soon</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
