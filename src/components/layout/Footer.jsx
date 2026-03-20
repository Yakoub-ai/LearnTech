import { Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/LF.png" alt="Tech Hub Learning" className="h-8 w-auto" />
              <span className="font-bold text-[var(--color-text)]">Tech Hub Learning Platform</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-md">
              Interactive learning paths for 11 tech roles. From zero knowledge to production-ready skills
              with embedded videos, hands-on coding, and comprehensive guides.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-[var(--color-text)] mb-3">Quick Links</h4>
            <ul className="space-y-2 list-none p-0">
              <li><Link to="/" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors">All Roles</Link></li>
              <li><Link to="/prerequisites" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors">Prerequisites</Link></li>
              <li><Link to="/progress" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors">My Progress</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-[var(--color-text)] mb-3">Resources</h4>
            <ul className="space-y-2 list-none p-0">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" /> roadmap.sh
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Tech & Innovation Hub Solutions. Built for learners, by engineers.
          </p>
        </div>
      </div>
    </footer>
  )
}
