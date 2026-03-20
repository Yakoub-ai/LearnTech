import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export default function DiagramBlock({ diagram }) {
  const ref = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!diagram || !ref.current) return

    const render = async () => {
      try {
        ref.current.innerHTML = ''
        const id = `mermaid-inline-${Date.now()}-${Math.random().toString(36).slice(2)}`
        const { svg } = await mermaid.render(id, diagram)
        if (ref.current) {
          ref.current.innerHTML = svg
        }
        setError(null)
      } catch (err) {
        setError('Failed to render diagram')
      }
    }

    render()
  }, [diagram])

  if (error) {
    return (
      <div className="my-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-center text-sm text-[var(--color-text-secondary)]">
        {error}
      </div>
    )
  }

  return (
    <div className="my-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-auto">
      <div ref={ref} className="flex justify-center [&>svg]:max-w-full" />
    </div>
  )
}
