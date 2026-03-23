import { useOutletContext } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import StatsBar from '../components/home/StatsBar'
import PageHelmet from '../components/seo/PageHelmet'
import StructuredData from '../components/seo/StructuredData'

const SITE_URL = import.meta.env.VITE_APP_URL || 'https://techhubb.se'

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Tech Career Learning Paths",
  "description": "Structured career roadmaps for tech roles from beginner to senior level",
  "url": SITE_URL,
  "numberOfItems": 16,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "AI Engineer Learning Path", "url": `${SITE_URL}/dashboard/role/ai-engineer` },
    { "@type": "ListItem", "position": 2, "name": "Backend Developer Learning Path", "url": `${SITE_URL}/dashboard/role/backend-developer` },
    { "@type": "ListItem", "position": 3, "name": "Data Engineer Learning Path", "url": `${SITE_URL}/dashboard/role/data-engineer` },
    { "@type": "ListItem", "position": 4, "name": "Data Scientist Learning Path", "url": `${SITE_URL}/dashboard/role/data-scientist` },
    { "@type": "ListItem", "position": 5, "name": "DevOps / Platform Engineer Learning Path", "url": `${SITE_URL}/dashboard/role/devops-platform-engineer` },
    { "@type": "ListItem", "position": 6, "name": "Frontend Developer Learning Path", "url": `${SITE_URL}/dashboard/role/frontend-developer` },
    { "@type": "ListItem", "position": 7, "name": "Marketing Technology Developer Learning Path", "url": `${SITE_URL}/dashboard/role/marketing-technology-developer` },
    { "@type": "ListItem", "position": 8, "name": "ML Engineer Learning Path", "url": `${SITE_URL}/dashboard/role/ml-engineer` },
    { "@type": "ListItem", "position": 9, "name": "QA / Test Engineer Learning Path", "url": `${SITE_URL}/dashboard/role/qa-test-engineer` },
    { "@type": "ListItem", "position": 10, "name": "Security Engineer Learning Path", "url": `${SITE_URL}/dashboard/role/security-engineer` },
    { "@type": "ListItem", "position": 11, "name": "Tech Lead / Architect Learning Path", "url": `${SITE_URL}/dashboard/role/tech-lead-architect` },
    { "@type": "ListItem", "position": 12, "name": "Python Learning Path", "url": `${SITE_URL}/dashboard/language/python` },
    { "@type": "ListItem", "position": 13, "name": "JavaScript Learning Path", "url": `${SITE_URL}/dashboard/language/javascript` },
    { "@type": "ListItem", "position": 14, "name": "TypeScript Learning Path", "url": `${SITE_URL}/dashboard/language/typescript` },
    { "@type": "ListItem", "position": 15, "name": "SQL Learning Path", "url": `${SITE_URL}/dashboard/language/sql` },
    { "@type": "ListItem", "position": 16, "name": "HTML & CSS Learning Path", "url": `${SITE_URL}/dashboard/language/html-css` },
  ]
}

export default function HomePage() {
  const { onSignIn } = useOutletContext()

  return (
    <div>
      <PageHelmet
        title="Tech Learning Platform"
        description="Private learning platform with structured roadmaps, interactive labs, and curated resources for every tech role."
        path="/"
        subject="Technology Education, Software Engineering, Career Development"
        educationalLevel="Beginner, Intermediate, Advanced"
      />
      <StructuredData data={homeStructuredData} />
      <HeroSection onSignIn={onSignIn} />
      <StatsBar />
    </div>
  )
}
