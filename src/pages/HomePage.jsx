import { useOutletContext } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import StatsBar from '../components/home/StatsBar'
import PageHelmet from '../components/seo/PageHelmet'

export default function HomePage() {
  const { onSignIn } = useOutletContext()

  return (
    <div>
      <PageHelmet
        title="Tech Learning Platform"
        description="Private learning platform with structured roadmaps, interactive labs, and curated resources for every tech role."
        path="/"
      />
      <HeroSection onSignIn={onSignIn} />
      <StatsBar />
    </div>
  )
}
