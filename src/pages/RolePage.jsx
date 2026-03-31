import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Wrench, BrainCircuit, FlaskConical } from 'lucide-react'
import { getRoleById, getRoleIcon } from '../data/roles'
import PageHelmet from '../components/seo/PageHelmet'
import StructuredData from '../components/seo/StructuredData'

const SITE_URL = import.meta.env.VITE_APP_URL || 'https://techhubb.se'
import { parseResourceTable, parseObjectives } from '../utils/markdownLoader'
import { isLevelFullyComplete, getLevelStats } from '../utils/progressStorage'
import {
  loadRoleMarkdownContent,
  loadRoleQuizzes,
  loadRoleSkillDiagram,
  loadRoleLabs,
  loadRoleSetupGuide,
  loadRoleGlossary,
} from '../data/loaders/roleDataLoader'
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline'
import LevelJourneyBlock from '../components/roadmap/LevelJourneyBlock'
import LevelDivider from '../components/roadmap/LevelDivider'
import GlossarySection from '../components/roadmap/GlossarySection'
import SkillDiagram from '../components/roadmap/SkillDiagram'
import SetupGuide from '../components/interactive/SetupGuide'
import InteractiveLab from '../components/interactive/InteractiveLab'
import useProgress from '../components/progress/useProgress'
import { ProgressProvider } from '../contexts/ProgressContext'

const tabs = [
  { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
  { id: 'diagram', label: 'Skill Map', icon: BrainCircuit },
  { id: 'labs', label: 'Interactive Labs', icon: FlaskConical },
  { id: 'setup', label: 'Dev Setup', icon: Wrench },
]

export default function RolePage() {
  const { roleId } = useParams()
  const role = getRoleById(roleId)
  const [activeTab, setActiveTab] = useState('roadmap')
  const progressValue = useProgress(roleId)
  const { roleProgress, saveQuizScore } = progressValue

  const [markdownContent, setMarkdownContent] = useState(null)
  const [quizzes, setQuizzes] = useState(null)
  const [glossary, setGlossary] = useState(null)
  const [diagram, setDiagram] = useState(undefined)
  const [labs, setLabs] = useState(undefined)
  const [setupGuide, setSetupGuide] = useState(undefined)
  const [loadError, setLoadError] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)

  // Reset tab data when role changes
  useEffect(() => {
    setDiagram(undefined)
    setLabs(undefined)
    setSetupGuide(undefined)
  }, [roleId])

  // Load markdown content on mount (needed for roadmap tab)
  useEffect(() => {
    if (!role) return
    setContentLoading(true)
    Promise.allSettled([
      loadRoleMarkdownContent(role.fileName),
      loadRoleQuizzes(roleId),
      loadRoleGlossary(roleId)
    ]).then(([contentResult, quizzesResult, glossaryResult]) => {
      setMarkdownContent(contentResult.status  === 'fulfilled' ? contentResult.value  : null)
      setQuizzes(quizzesResult.status          === 'fulfilled' ? quizzesResult.value  : null)
      setGlossary(glossaryResult.status        === 'fulfilled' ? glossaryResult.value : null)
      if (contentResult.status === 'rejected') setLoadError('Failed to load content. Please refresh.')
      setContentLoading(false)
    })
  }, [roleId, role])

  // Load tab-specific data only when that tab is selected
  useEffect(() => {
    if (!role) return
    if (activeTab === 'diagram' && diagram === undefined) {
      loadRoleSkillDiagram(roleId).then(setDiagram).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'labs' && labs === undefined) {
      loadRoleLabs(roleId).then(setLabs).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
    if (activeTab === 'setup' && setupGuide === undefined) {
      loadRoleSetupGuide(roleId).then(setSetupGuide).catch(() => setLoadError('Failed to load content. Please refresh.'))
    }
  }, [activeTab, roleId, role, diagram, labs, setupGuide])

  if (!role) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Role Not Found</h1>
        <Link to="/" className="text-[var(--color-primary)]">Back to Home</Link>
      </div>
    )
  }

  const Icon = getRoleIcon(role.icon)

  const overview = markdownContent?.overview || ''
  const levelData = {}

  for (const level of role.levels) {
    const levelLower = level.toLowerCase()
    const levelRegex = new RegExp(`## ${level}([\\s\\S]*?)(?=\\n## |---\\s*\\n\\s*Return|$)`, 'i')
    const match = overview.match(levelRegex)
    const section = match ? match[0] : ''
    levelData[levelLower] = {
      resources: parseResourceTable(section),
      objectives: parseObjectives(section),
    }
  }

  return (
    <ProgressProvider value={progressValue}>
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <PageHelmet
        title={role.name}
        description={role.description}
        path={`/dashboard/role/${roleId}`}
        ogType="article"
        subject={role.name}
        educationalLevel="Beginner, Intermediate, Advanced"
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${role.name} Learning Path`,
        "description": role.description,
        "url": `${SITE_URL}/dashboard/role/${roleId}`,
        "inLanguage": "en",
        "isAccessibleForFree": false,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Tech Hubben Learning",
          "url": SITE_URL
        },
        "educationalLevel": "Beginner to Senior",
        "teaches": role.name,
        "timeRequired": `PT${(role.estimatedHours?.beginner || 0) + (role.estimatedHours?.mid || 0) + (role.estimatedHours?.senior || 0)}H`,
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "name": `${role.name} — Beginner`,
            "courseMode": "online",
            "educationalLevel": "Beginner",
            "url": `${SITE_URL}/dashboard/role/${roleId}/beginner`
          },
          {
            "@type": "CourseInstance",
            "name": `${role.name} — Mid`,
            "courseMode": "online",
            "educationalLevel": "Intermediate",
            "url": `${SITE_URL}/dashboard/role/${roleId}/mid`
          },
          {
            "@type": "CourseInstance",
            "name": `${role.name} — Senior`,
            "courseMode": "online",
            "educationalLevel": "Advanced",
            "url": `${SITE_URL}/dashboard/role/${roleId}/senior`
          }
        ]
      }} />
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        All Roles
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
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-lg shrink-0">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">{role.name}</h1>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">{role.description}</p>
          </div>
        </div>
      </motion.div>

      <div role="tablist" aria-label="Role content tabs" className="flex gap-1 mb-8 overflow-x-auto border-b border-[var(--color-border)] pb-px">
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
              <RoadmapTimeline roleId={roleId} levels={role.levels} />

              <div className="mt-8">
                {role.levels.map((level, index) => {
                  const levelKey = level.toLowerCase()
                  const ld = levelData[levelKey] || {}
                  const isComplete = isLevelFullyComplete(roleId, levelKey)
                  const isPreviousComplete = index === 0 || isLevelFullyComplete(roleId, role.levels[index - 1].toLowerCase())
                  const stats = isComplete ? getLevelStats(roleId, levelKey) : null

                  return (
                    <div key={level}>
                      {index > 0 && (
                        <LevelDivider nextLevel={level} />
                      )}
                      <LevelJourneyBlock
                        roleId={roleId}
                        level={level}
                        levelIndex={index}
                        resources={ld.resources}
                        objectives={ld.objectives}
                        levelProgress={roleProgress[levelKey]}
                        isComplete={isComplete}
                        isPreviousComplete={isPreviousComplete}
                        stats={stats}
                        quizzes={quizzes?.[levelKey]}
                        onQuizComplete={(score) => saveQuizScore(levelKey, score)}
                        type="role"
                      />
                    </div>
                  )
                })}
              </div>

              <GlossarySection glossary={glossary} title={`Key concepts and terms for ${role.name}`} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'diagram' && (
        <div role="tabpanel" id="tabpanel-diagram" aria-labelledby="tab-diagram">
          <SkillDiagram diagram={diagram} title={`${role.name} Skill Roadmap`} />
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
              <p className="text-[var(--color-text-secondary)]">Interactive labs coming soon for {role.name}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'setup' && (
        <div role="tabpanel" id="tabpanel-setup" aria-labelledby="tab-setup">
          <SetupGuide guide={setupGuide} roleId={roleId} />
        </div>
      )}
    </div>
    </ProgressProvider>
  )
}
