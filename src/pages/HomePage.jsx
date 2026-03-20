import HeroSection from '../components/home/HeroSection'
import RoleGrid from '../components/home/RoleGrid'
import LanguageGrid from '../components/home/LanguageGrid'
import StatsBar from '../components/home/StatsBar'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <RoleGrid />
      <LanguageGrid />
    </div>
  )
}
