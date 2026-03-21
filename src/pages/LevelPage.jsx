import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, List } from 'lucide-react'
import { getRoleById, getRoleIcon } from '../data/roles'
import PageHelmet from '../components/seo/PageHelmet'
import { loadRoleMarkdownContent, loadRoleTopicQuizzes, loadRoleQuizzes } from '../data/loaders/roleDataLoader'
import MarkdownRenderer from '../components/content/MarkdownRenderer'
import Badge from '../components/common/Badge'
import ProgressBar from '../components/progress/ProgressBar'
import useProgress from '../components/progress/useProgress'
import { parseObjectives, extractContentSections } from '../utils/markdownLoader'
import ObjectiveChecklist from '../components/roadmap/ObjectiveChecklist'
import QuizBlock from '../components/interactive/QuizBlock'
import LevelExamBlock from '../components/interactive/LevelExamBlock'
import ReportQuestionModal from '../components/interactive/ReportQuestionModal'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { syncProgressItemToSupabase } from '../utils/progressStorage'

function TableOfContents({ content }) {
  const headings = []
  const regex = /^## (.+)$/gm
  let match
  while ((match = regex.exec(content)) !== null) {
    headings.push({
      text: match[1],
      id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    })
  }

  if (headings.length === 0) return null

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <List className="w-4 h-4 text-[var(--color-primary)]" />
        <h4 className="text-sm font-semibold text-[var(--color-text)]">Table of Contents</h4>
      </div>
      <nav className="space-y-1">
        {headings.map(({ text, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className="block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline py-1 pl-3 border-l-2 border-transparent hover:border-[var(--color-primary)] transition-colors"
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default function LevelPage() {
  const { roleId, level } = useParams()
  const { user } = useAuth()
  const role = getRoleById(roleId)
  const { isObjectiveComplete, toggleObjective, roleProgress, completeTopicQuiz, saveLevelExamScore, getTopicQuizScore, getLevelExamScore } = useProgress(roleId)
  const [markdownContent, setMarkdownContent] = useState({})
  const [topicQuizzesByLevel, setTopicQuizzesByLevel] = useState({})
  const [levelQuizzes, setLevelQuizzes] = useState([])
  const [loadError, setLoadError] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)
  const [reportModal, setReportModal] = useState({ isOpen: false, questionIndex: 0, questionText: '', topicId: '' })

  useEffect(() => {
    if (role?.fileName) {
      setContentLoading(true)
      Promise.all([
        loadRoleMarkdownContent(role.fileName),
        loadRoleTopicQuizzes(roleId),
        loadRoleQuizzes(roleId),
      ])
        .then(([contentData, topicData, quizData]) => {
          setMarkdownContent(contentData)
          setTopicQuizzesByLevel(topicData)
          setLevelQuizzes(quizData[level] || [])
          setContentLoading(false)
        })
        .catch(() => {
          setLoadError('Failed to load content. Please refresh.')
          setContentLoading(false)
        })
    }
  }, [role?.fileName, roleId, level])

  if (!role) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Role Not Found</h1>
        <Link to="/" className="text-[var(--color-primary)]">Back to Home</Link>
      </div>
    )
  }

  const levelCapitalized = level.charAt(0).toUpperCase() + level.slice(1)
  const content = markdownContent?.[level] || ''
  const Icon = getRoleIcon(role.icon)

  const overviewContent = markdownContent?.overview || ''
  const levelRegex = new RegExp(`## ${levelCapitalized}([\\s\\S]*?)(?=\\n## |---\\s*\\n\\s*Return|$)`, 'i')
  const overviewMatch = overviewContent.match(levelRegex)
  const overviewSection = overviewMatch ? overviewMatch[0] : ''
  const objectives = parseObjectives(overviewSection)

  const levelTopicQuizzes = topicQuizzesByLevel[level] || []
  const topicQuizMap = Object.fromEntries(levelTopicQuizzes.map((tq) => [tq.topicId, tq]))
  const quizLinkedIndexes = new Set(levelTopicQuizzes.map((tq) => tq.objectiveIndex))

  const contentSections = content ? extractContentSections(content) : []

  const levelIndex = role.levels.findIndex((l) => l.toLowerCase() === level)
  const prevLevel = levelIndex > 0 ? role.levels[levelIndex - 1] : null
  const nextLevel = levelIndex < role.levels.length - 1 ? role.levels[levelIndex + 1] : null

  const examScore = getLevelExamScore ? getLevelExamScore(level) : null

  function openReportModal(topicId, questionIndex, questionText) {
    setReportModal({ isOpen: true, questionIndex, questionText, topicId })
  }

  function closeReportModal() {
    setReportModal((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <PageHelmet
        title={`${role.name} - ${levelCapitalized} Level`}
        description={`${levelCapitalized} level resources and objectives for ${role.name}. Structured learning path with hands-on exercises.`}
        path={`/dashboard/role/${roleId}/${level}`}
        ogType="article"
      />
      <Link
        to={`/dashboard/role/${roleId}`}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {role.name}
      </Link>

      {loadError && (
        <div className="p-4 text-red-500 text-center">{loadError}</div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {role.name}
          </h1>
          <Badge variant={level}>{levelCapitalized}</Badge>
        </div>

        <p className="text-[var(--color-text-secondary)] mb-4">
          {levelCapitalized} level concept reference and deep dive explanations.
        </p>

        <ProgressBar value={roleProgress[level] || 0} />
      </motion.div>

      {objectives && objectives.length > 0 && (
        <div className="mb-8">
          <ObjectiveChecklist
            objectives={objectives}
            level={level}
            isObjectiveComplete={isObjectiveComplete}
            toggleObjective={toggleObjective}
            quizLinkedIndexes={quizLinkedIndexes}
          />
        </div>
      )}

      {contentLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : content ? (
        <>
          <TableOfContents content={content} />
          {contentSections.length > 0 ? (
            <div className="space-y-10">
              {contentSections.map((section) => {
                const topicQuiz = topicQuizMap[section.slug]
                const savedScore = topicQuiz && getTopicQuizScore ? getTopicQuizScore(level, topicQuiz.topicId) : null
                return (
                  <div key={section.slug}>
                    <MarkdownRenderer content={`## ${section.heading}\n\n${section.content}`} />
                    {topicQuiz && (
                      <div className="mt-6">
                        <QuizBlock
                          questions={topicQuiz.questions}
                          topicTitle={topicQuiz.topicTitle}
                          savedScore={savedScore}
                          onComplete={(score) => {
                            completeTopicQuiz(level, topicQuiz.topicId, topicQuiz.objectiveIndex, score)
                            syncProgressItemToSupabase(supabase, user?.id, roleId, level, 'topicQuiz', topicQuiz.topicId, { score, scoredAt: new Date().toISOString() })
                          }}
                          onReport={(questionIndex, questionText) =>
                            openReportModal(topicQuiz.topicId, questionIndex, questionText)
                          }
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <MarkdownRenderer content={content} />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 mx-auto text-[var(--color-text-secondary)]/30 mb-4" />
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Content Loading</h2>
          <p className="text-[var(--color-text-secondary)]">
            The {levelCapitalized} concept reference for {role.name} is available in the roadmap overview.
          </p>
          <Link to={`/dashboard/role/${roleId}`} className="inline-flex items-center gap-1.5 mt-4 text-[var(--color-primary)] font-medium no-underline">
            View Roadmap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {levelQuizzes.length > 0 && (
        <div className="mt-12">
          <LevelExamBlock
            questions={levelQuizzes}
            roleId={roleId}
            level={level}
            savedScore={examScore}
            onComplete={(score) => {
              saveLevelExamScore(level, score)
              syncProgressItemToSupabase(supabase, user?.id, roleId, level, 'levelExam', 'score', { score, scoredAt: new Date().toISOString() })
            }}
            onReport={(questionIndex, questionText) =>
              openReportModal('level-exam', questionIndex, questionText)
            }
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--color-border)]">
        {prevLevel ? (
          <Link
            to={`/dashboard/role/${roleId}/${prevLevel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {prevLevel} Level
          </Link>
        ) : <div />}
        {nextLevel ? (
          <Link
            to={`/dashboard/role/${roleId}/${nextLevel.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            {nextLevel} Level
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>

      <ReportQuestionModal
        isOpen={reportModal.isOpen}
        onClose={closeReportModal}
        roleId={roleId}
        level={level}
        topicId={reportModal.topicId}
        questionIndex={reportModal.questionIndex}
        questionText={reportModal.questionText}
      />
    </div>
  )
}
