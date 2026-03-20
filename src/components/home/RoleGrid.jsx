import { roles } from '../../data/roles'
import RoleCard from './RoleCard'

export default function RoleGrid() {
  return (
    <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
          Choose Your Learning Path
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Each role includes a structured roadmap from beginner to senior level with curated resources,
          embedded videos, interactive exercises, and comprehensive guides.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {roles.map((role, index) => (
          <RoleCard key={role.id} role={role} index={index} />
        ))}
      </div>
    </section>
  )
}
