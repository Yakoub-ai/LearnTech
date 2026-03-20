import HeroSection from '../components/home/HeroSection'
import RoleGrid from '../components/home/RoleGrid'
import LanguageGrid from '../components/home/LanguageGrid'
import StatsBar from '../components/home/StatsBar'
import PageHelmet from '../components/seo/PageHelmet'

export default function HomePage() {
  return (
    <div>
      <PageHelmet
        title="Tech Learning Roadmaps"
        description="Master tech roles with structured roadmaps. 11 career paths including AI Engineer, Backend Developer, DevOps, and more."
        path="/"
      />
      <HeroSection />
      <StatsBar />
      <RoleGrid />
      <LanguageGrid />
    </div>
  )
}
