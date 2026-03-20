import { languages } from '../../data/languages'
import LanguageCard from './LanguageCard'

export default function LanguageGrid() {
  return (
    <section id="languages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
          Language Deep Dives
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Master the core languages of modern tech with progressive learning paths,
          hands-on exercises, and real-world code examples at every level.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {languages.map((language, index) => (
          <LanguageCard key={language.id} language={language} index={index} />
        ))}
      </div>
    </section>
  )
}
