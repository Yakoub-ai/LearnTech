import { useState, lazy, Suspense } from 'react'
import { Play, RotateCcw, Copy, Check } from 'lucide-react'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

export default function CodeSandbox({ examples = [], roleId }) {
  const [activeExample, setActiveExample] = useState(0)
  const [code, setCode] = useState(examples[0]?.code || '')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const currentExample = examples[activeExample]

  const handleRun = () => {
    if (!currentExample) return
    const lang = currentExample.language?.toLowerCase()

    if (lang === 'javascript' || lang === 'js') {
      try {
        const logs = []
        const mockConsole = { log: (...args) => logs.push(args.map(String).join(' ')), error: (...args) => logs.push('Error: ' + args.map(String).join(' ')) }
        const fn = new Function('console', code)
        fn(mockConsole)
        setOutput(logs.join('\n') || '(no output)')
      } catch (err) {
        setOutput(`Error: ${err.message}`)
      }
    } else {
      setOutput(`// ${currentExample.language} execution is not available in the browser.\n// Copy this code and run it locally in your development environment.\n// See the Setup Guide tab for installation instructions.`)
    }
  }

  const handleReset = () => {
    setCode(currentExample?.code || '')
    setOutput('')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExampleChange = (index) => {
    setActiveExample(index)
    setCode(examples[index]?.code || '')
    setOutput('')
  }

  if (!examples || examples.length === 0) return null

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 overflow-x-auto">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleExampleChange(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer border-none transition-colors ${
                i === activeExample
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <button onClick={handleCopy} className="p-1.5 rounded hover:bg-[var(--color-surface-3)] cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]" title="Copy code">
            {copied ? <Check className="w-4 h-4 text-[var(--color-success)]" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={handleReset} className="p-1.5 rounded hover:bg-[var(--color-surface-3)] cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]" title="Reset code">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={handleRun} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium cursor-pointer border-none transition-colors">
            <Play className="w-3.5 h-3.5" />
            Run
          </button>
        </div>
      </div>

      {currentExample?.description && (
        <div className="px-4 py-2 bg-[var(--color-surface-2)]/50 border-b border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-secondary)]">{currentExample.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
          <div className="px-3 py-1.5 bg-[var(--color-surface-3)] border-b border-[var(--color-border)]">
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">
              {currentExample?.language || 'code'}
            </span>
          </div>
          <Suspense fallback={
            <div className="h-80 flex items-center justify-center text-[var(--color-text-secondary)] text-sm">
              Loading editor...
            </div>
          }>
            <MonacoEditor
              height="320px"
              language={currentExample?.language === 'js' ? 'javascript' : currentExample?.language || 'javascript'}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 8 },
                automaticLayout: true,
              }}
            />
          </Suspense>
        </div>

        <div>
          <div className="px-3 py-1.5 bg-[var(--color-surface-3)] border-b border-[var(--color-border)]">
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">output</span>
          </div>
          <pre className="h-80 p-4 overflow-auto text-sm font-mono text-[var(--color-text-secondary)] bg-[#1e1e1e] text-gray-300 m-0 whitespace-pre-wrap">
            {output || '// Click "Run" to execute the code\n// or copy it to your local environment'}
          </pre>
        </div>
      </div>
    </div>
  )
}
