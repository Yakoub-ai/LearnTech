import ProgressTracker from '../components/progress/ProgressTracker'
import PageHelmet from '../components/seo/PageHelmet'

export default function ProgressPage() {
  return (
    <>
      <PageHelmet
        title="My Progress"
        description="Track your learning progress across all tech roles and programming languages on Tech Hubben Learning."
        path="/progress"
      />
      <ProgressTracker />
    </>
  )
}
