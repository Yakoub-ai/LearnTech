/**
 * Converts a kebab-case role/language slug into a human-readable title.
 * e.g. "frontend-developer" → "Frontend Developer"
 */
export function formatRoleName(slug) {
  return slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
}
