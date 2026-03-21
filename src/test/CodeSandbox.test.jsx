import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CodeSandbox from '../components/interactive/CodeSandbox'

// Monaco Editor is a heavy browser dependency — replace it with a lightweight stub
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}))

// navigator.clipboard is not available in jsdom by default
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  configurable: true
})

const singleExample = [
  {
    title: 'Hello World',
    language: 'javascript',
    code: 'console.log("Hello, World!")',
    description: 'A basic JS example'
  }
]

const multipleExamples = [
  {
    title: 'Example One',
    language: 'javascript',
    code: 'console.log("one")',
    description: 'First example'
  },
  {
    title: 'Example Two',
    language: 'javascript',
    code: 'console.log("two")',
    description: 'Second example'
  },
  {
    title: 'Example Three',
    language: 'python',
    code: 'print("three")',
    description: 'Python example'
  }
]

// ─── graceful handling of empty/null ─────────────────────────────────────────

describe('CodeSandbox empty/null examples', () => {
  it('renders nothing when examples prop is empty array', () => {
    const { container } = render(<CodeSandbox examples={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when examples prop is not provided', () => {
    const { container } = render(<CodeSandbox />)
    expect(container.firstChild).toBeNull()
  })
})

// ─── basic rendering ──────────────────────────────────────────────────────────

describe('CodeSandbox basic rendering', () => {
  it('renders without crashing with a valid examples prop', () => {
    expect(() => render(<CodeSandbox examples={singleExample} />)).not.toThrow()
  })

  it('renders the Monaco editor', async () => {
    render(<CodeSandbox examples={singleExample} />)
    // Monaco is inside Suspense — wait for it to resolve
    expect(await screen.findByTestId('monaco-editor')).toBeInTheDocument()
  })

  it('shows the initial code in the editor', async () => {
    render(<CodeSandbox examples={singleExample} />)
    const editor = await screen.findByTestId('monaco-editor')
    expect(editor).toHaveValue('console.log("Hello, World!")')
  })

  it('renders the example title as a tab', () => {
    render(<CodeSandbox examples={singleExample} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders the example description', () => {
    render(<CodeSandbox examples={singleExample} />)
    expect(screen.getByText('A basic JS example')).toBeInTheDocument()
  })

  it('renders Run, Reset, and Copy buttons', () => {
    render(<CodeSandbox examples={singleExample} />)
    expect(screen.getByTitle('Copy code')).toBeInTheDocument()
    expect(screen.getByTitle('Reset code')).toBeInTheDocument()
    expect(screen.getByText('Run')).toBeInTheDocument()
  })

  it('renders the output panel with default placeholder text', () => {
    render(<CodeSandbox examples={singleExample} />)
    expect(screen.getByText(/click "Run" to execute the code/i)).toBeInTheDocument()
  })
})

// ─── tab switching ────────────────────────────────────────────────────────────

describe('CodeSandbox tab switching', () => {
  it('renders a tab button for each example', () => {
    render(<CodeSandbox examples={multipleExamples} />)
    expect(screen.getByText('Example One')).toBeInTheDocument()
    expect(screen.getByText('Example Two')).toBeInTheDocument()
    expect(screen.getByText('Example Three')).toBeInTheDocument()
  })

  it('switches to the second example when its tab is clicked', async () => {
    render(<CodeSandbox examples={multipleExamples} />)

    fireEvent.click(screen.getByText('Example Two'))

    const editor = await screen.findByTestId('monaco-editor')
    expect(editor).toHaveValue('console.log("two")')
  })

  it('shows description for the active example after tab switch', () => {
    render(<CodeSandbox examples={multipleExamples} />)
    fireEvent.click(screen.getByText('Example Two'))
    expect(screen.getByText('Second example')).toBeInTheDocument()
  })

  it('switches back to the first example', async () => {
    render(<CodeSandbox examples={multipleExamples} />)

    fireEvent.click(screen.getByText('Example Two'))
    fireEvent.click(screen.getByText('Example One'))

    const editor = await screen.findByTestId('monaco-editor')
    expect(editor).toHaveValue('console.log("one")')
  })

  it('clears output when switching tabs', () => {
    render(<CodeSandbox examples={multipleExamples} />)

    // Run the first example to generate output
    fireEvent.click(screen.getByText('Run'))

    // Switch tab — output should be cleared
    fireEvent.click(screen.getByText('Example Two'))
    expect(screen.getByText(/click "Run" to execute the code/i)).toBeInTheDocument()
  })
})

// ─── run JavaScript ───────────────────────────────────────────────────────────

describe('CodeSandbox Run button', () => {
  it('executes JavaScript code and shows console.log output', () => {
    render(<CodeSandbox examples={singleExample} />)
    fireEvent.click(screen.getByText('Run'))
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })

  it('shows an error message when the code throws', async () => {
    const badExample = [{ title: 'Bad Code', language: 'javascript', code: 'throw new Error("oops")' }]
    render(<CodeSandbox examples={badExample} />)
    fireEvent.click(screen.getByText('Run'))
    expect(screen.getByText(/Error: oops/i)).toBeInTheDocument()
  })

  it('shows a notice for non-JS languages that execution is not available in browser', () => {
    const pythonExample = [{ title: 'Python', language: 'python', code: 'print("hi")' }]
    render(<CodeSandbox examples={pythonExample} />)
    fireEvent.click(screen.getByText('Run'))
    expect(screen.getByText(/execution is not available in the browser/i)).toBeInTheDocument()
  })
})

// ─── reset button ─────────────────────────────────────────────────────────────

describe('CodeSandbox Reset button', () => {
  it('clears the output when Reset is clicked', () => {
    render(<CodeSandbox examples={singleExample} />)

    // Run to produce output
    fireEvent.click(screen.getByText('Run'))
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()

    // Reset should clear it
    fireEvent.click(screen.getByTitle('Reset code'))
    expect(screen.getByText(/click "Run" to execute the code/i)).toBeInTheDocument()
  })
})
