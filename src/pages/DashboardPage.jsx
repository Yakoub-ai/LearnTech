import RoleGrid from '../components/home/RoleGrid'
import LanguageGrid from '../components/home/LanguageGrid'
import PageHelmet from '../components/seo/PageHelmet'

export default function DashboardPage() {
  return (
    <div>
      <PageHelmet
        title="Dashboard — Tech Learning Roadmaps"
        description="Master tech roles with structured roadmaps. 11 career paths including AI Engineer, Backend Developer, DevOps, and more."
        path="/dashboard"
      />
      <RoleGrid />
      <LanguageGrid />
    </div>
  )
}
