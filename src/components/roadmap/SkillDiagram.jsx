import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { Maximize2, Minimize2 } from 'lucide-react'

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'strict',
  fontFamily: 'Inter, system-ui, sans-serif',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: false,
    curve: 'basis',
  },
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#fff',
    primaryBorderColor: '#4f46e5',
    lineColor: '#94a3b8',
    secondaryColor: '#f1f5f9',
    tertiaryColor: '#f8fafc',
  },
})

export default function SkillDiagram({ diagram, title = 'Skill Roadmap' }) {
  const containerRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!diagram || !containerRef.current) return

    const render = async () => {
      try {
        containerRef.current.innerHTML = ''
        const id = `mermaid-${Date.now()}`
        const { svg } = await mermaid.render(id, diagram)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
        setError(null)
      } catch (err) {
        setError('Failed to render diagram')
        console.error('Mermaid render error:', err)
      }
    }

    render()
  }, [diagram])

  if (!diagram) return null

  return (
    <div className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden ${
      expanded ? 'fixed inset-4 z-50 shadow-2xl' : ''
    }`}>
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
        <h4 className="text-sm font-semibold text-[var(--color-text)]">{title}</h4>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-[var(--color-surface-3)] cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]"
        >
          {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black/50 -z-10" onClick={() => setExpanded(false)} />
      )}

      <div className={`p-4 overflow-auto ${expanded ? 'h-[calc(100%-3rem)]' : 'max-h-[500px]'}`}>
        {error ? (
          <div className="text-center py-8 text-[var(--color-text-secondary)] text-sm">{error}</div>
        ) : (
          <div ref={containerRef} className="flex justify-center [&>svg]:max-w-full" />
        )}
      </div>
    </div>
  )
}
