import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Code2, BookOpen, Wrench, BrainCircuit, FlaskConical } from 'lucide-react'
import { getRoleById, getRoleIcon } from '../data/roles'
import { parseResourceTable, parseObjectives } from '../utils/markdownLoader'
import {
  loadRoleMarkdownContent,
  loadRoleQuizzes,
  loadRoleSkillDiagram,
  loadRoleCodeSandbox,
  loadRoleLabs,
  loadRoleSetupGuide,
} from '../data/loaders/roleDataLoader'
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline'
import LevelSection from '../components/roadmap/LevelSection'
import SkillDiagram from '../components/roadmap/SkillDiagram'
import CodeSandbox from '../components/interactive/CodeSandbox'
import SetupGuide from '../components/interactive/SetupGuide'
import QuizBlock from '../components/interactive/QuizBlock'
import InteractiveLab from '../components/interactive/InteractiveLab'
import useProgress from '../components/progress/useProgress'

const tabs = [
  { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
  { id: 'diagram', label: 'Skill Map', icon: BrainCircuit },
  { id: 'sandbox', label: 'Code Lab', icon: Code2 },
  { id: 'labs', label: 'Interactive Labs', icon: FlaskConical },
  { id: 'setup', label: 'Dev Setup', icon: Wrench },
]

export default function RolePage() {
  const { roleId } = useParams()
  const role = getRoleById(roleId)
  const [activeTab, setActiveTab] = useState('roadmap')
  const { isObjectiveComplete, isResourceComplete, toggleObjective, toggleResource, saveQuizScore } = useProgress(roleId)

  const [markdownContent, setMarkdownContent] = useState(null)
  const [quizzes, setQuizzes] = useState(null)
  const [diagram, setDiagram] = useState(null)
  const [examples, setExamples] = useState(null)
  const [labs, setLabs] = useState(null)
  const [setupGuide, setSetupGuide] = useState(null)

  // Load markdown content on mount (needed for roadmap tab)
  useEffect(() => {
    if (!role) return
    loadRoleMarkdownContent(role.fileName).then(setMarkdownContent)
    loadRoleQuizzes(roleId).then(setQuizzes)
  }, [roleId, role])

  // Load tab-specific data only when that tab is selected
  useEffect(() => {
    if (!role) return
    if (activeTab === 'diagram' && diagram === null) {
      loadRoleSkillDiagram(roleId).then(setDiagram)
    }
    if (activeTab === 'sandbox' && examples === null) {
      loadRoleCodeSandbox(roleId).then((data) => setExamples(data || []))
    }
    if (activeTab === 'labs' && labs === null) {
      loadRoleLabs(roleId).then(setLabs)
    }
    if (activeTab === 'setup' && setupGuide === null) {
      loadRoleSetupGuide(roleId).then(setSetupGuide)
    }
  }, [activeTab, roleId, role, diagram, examples, labs, setupGuide])

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
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        All Roles
      </Link>

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
        <div className="space-y-10">
          <RoadmapTimeline roleId={roleId} levels={role.levels} />

          {role.levels.map((level) => {
            const ld = levelData[level.toLowerCase()] || {}
            return (
              <div key={level}>
                <LevelSection
                  roleId={roleId}
                  level={level}
                  resources={ld.resources}
                  objectives={ld.objectives}
                  isResourceComplete={isResourceComplete}
                  isObjectiveComplete={isObjectiveComplete}
                  toggleResource={toggleResource}
                  toggleObjective={toggleObjective}
                />

                {quizzes && quizzes[level.toLowerCase()] && (
                  <div className="mt-6">
                    <QuizBlock
                      questions={quizzes[level.toLowerCase()]}
                      roleId={roleId}
                      level={level.toLowerCase()}
                      onComplete={(score) => saveQuizScore(level.toLowerCase(), score)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'diagram' && (
        <SkillDiagram diagram={diagram} title={`${role.name} Skill Roadmap`} />
      )}

      {activeTab === 'sandbox' && (
        <CodeSandbox examples={examples || []} roleId={roleId} />
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
            <p className="text-[var(--color-text-secondary)]">Interactive labs coming soon for {role.name}</p>
          </div>
        )
      )}

      {activeTab === 'setup' && (
        <SetupGuide guide={setupGuide} roleId={roleId} />
      )}
    </div>
  )
}
