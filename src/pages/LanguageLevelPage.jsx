import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { getLanguageById, getLanguageIcon } from '../data/languages'
import { loadLanguageMarkdownContent, loadLanguageQuizzes } from '../data/loaders/languageDataLoader'
import { setLanguageQuizScore, syncProgressItemToSupabase } from '../utils/progressStorage'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import MarkdownRenderer from '../components/content/MarkdownRenderer'
import QuizBlock from '../components/interactive/QuizBlock'
import ReportQuestionModal from '../components/interactive/ReportQuestionModal'
import Badge from '../components/common/Badge'
import PageHelmet from '../components/seo/PageHelmet'

const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  amber: 'from-amber-500 to-amber-600',
  orange: 'from-orange-500 to-orange-600',
  cyan: 'from-cyan-500 to-cyan-600',
  indigo: 'from-[#005aa0] to-[#004580]',
}

export default function LanguageLevelPage() {
  const { languageId, level } = useParams()
  const language = getLanguageById(languageId)
  const { user } = useAuth()

  const [content, setContent] = useState(null)
  const [levelQuizzes, setLevelQuizzes] = useState([])
  const [loadError, setLoadError] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)
  const [reportModal, setReportModal] = useState({ isOpen: false, questionIndex: 0, questionText: '' })

  function openReportModal(questionIndex, questionText) {
    setReportModal({ isOpen: true, questionIndex, questionText })
  }
  function closeReportModal() {
    setReportModal((prev) => ({ ...prev, isOpen: false }))
  }

  useEffect(() => {
    if (!language) return
    setContentLoading(true)
    Promise.all([
      loadLanguageMarkdownContent(languageId),
      loadLanguageQuizzes(languageId)
    ]).then(([data, quizData]) => {
      setContent(data[level] || '')
      setLevelQuizzes(quizData[level] || [])
      setContentLoading(false)
    }).catch(() => {
      setLoadError('Failed to load content. Please refresh.')
      setContentLoading(false)
    })
  }, [languageId, level, language])

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
  const levelCapitalized = level ? level.charAt(0).toUpperCase() + level.slice(1) : ''

  const levelOrder = language?.levels?.map(l => l.toLowerCase()) || ['beginner', 'mid', 'senior']
  const currentIndex = levelOrder.indexOf(level)
  const prevLevel = currentIndex > 0 ? levelOrder[currentIndex - 1] : null
  const nextLevel = currentIndex < levelOrder.length - 1 ? levelOrder[currentIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <PageHelmet
        title={`${language.name} - ${levelCapitalized} Level`}
        description={`${levelCapitalized} level ${language.name} learning guide with structured content, quizzes, and exercises.`}
        path={`/dashboard/language/${languageId}/${level}`}
        ogType="article"
      />
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6">
        <Link to="/dashboard/languages" className="hover:text-[var(--color-primary)] no-underline transition-colors">
          Languages
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/dashboard/language/${languageId}`} className="hover:text-[var(--color-primary)] no-underline transition-colors">
          {language.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--color-text)]">{levelCapitalized}</span>
      </div>

      {loadError && (
        <div className="p-4 text-red-500 text-center">{loadError}</div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[var(--color-text)]">{language.name}</h1>
              <Badge variant={level}>{levelCapitalized}</Badge>
            </div>
            <p className="text-[var(--color-text-secondary)] mt-1">
              {level === 'beginner' && 'Foundations and core concepts'}
              {level === 'mid' && 'Intermediate patterns and techniques'}
              {level === 'senior' && 'Advanced topics and expert knowledge'}
            </p>
          </div>
        </div>
      </motion.div>

      {contentLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : content ? (
        <MarkdownRenderer content={content} />
      ) : (
        <div className="p-12 text-center rounded-lg border border-dashed border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Content Coming Soon</h2>
          <p className="text-[var(--color-text-secondary)]">
            The {levelCapitalized} guide for {language.name} is currently being developed.
          </p>
        </div>
      )}

      {levelQuizzes.length > 0 && (
        <div className="mt-10">
          <QuizBlock
            questions={levelQuizzes}
            roleId={languageId}
            level={level}
            onComplete={(score) => {
              setLanguageQuizScore(languageId, level, score)
              syncProgressItemToSupabase(supabase, user?.id, languageId, level, 'quiz', 'score', { score, scoredAt: new Date().toISOString() })
            }}
            onReport={openReportModal}
          />
        </div>
      )}

      <ReportQuestionModal
        isOpen={reportModal.isOpen}
        onClose={closeReportModal}
        roleId={languageId}
        level={level}
        topicId=""
        questionIndex={reportModal.questionIndex}
        questionText={reportModal.questionText}
      />

      <div className="flex justify-between mt-12 pt-6 border-t border-[var(--color-border)]">
        {prevLevel ? (
          <Link
            to={`/dashboard/language/${languageId}/${prevLevel}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {prevLevel.charAt(0).toUpperCase() + prevLevel.slice(1)}
          </Link>
        ) : <div />}
        {nextLevel ? (
          <Link
            to={`/dashboard/language/${languageId}/${nextLevel}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            {nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)}
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
