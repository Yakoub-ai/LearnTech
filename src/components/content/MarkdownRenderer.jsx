import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { useMemo, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import KeyTakeaway from './KeyTakeaway'
import PitfallAlert from './PitfallAlert'
import ConceptCard from './ConceptCard'
import DiagramBlock from './DiagramBlock'
import CopyButton from '../common/CopyButton'
import { extractYouTubeId } from '../../utils/youtubeUtils'
import YouTubeEmbed from '../roadmap/YouTubeEmbed'

const InteractiveFlow = lazy(() => import('./InteractiveFlow'))

function InteractiveFlowBlock({ flowName }) {
  return (
    <Suspense
      fallback={
        <div className="my-6 p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-center text-sm text-[var(--color-text-secondary)]">
          Loading interactive diagram…
        </div>
      }
    >
      <InteractiveFlow flowName={flowName.trim()} />
    </Suspense>
  )
}

function CodeBlock({ className, children }) {
  const code = String(children).replace(/\n$/, '')
  const language = className?.replace('language-', '') || ''

  if (language === 'mermaid') {
    return <DiagramBlock diagram={code} />
  }

  if (language === 'interactive-flow') {
    return <InteractiveFlowBlock flowName={code} />
  }

  return (
    <div className="relative group mb-4">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      {language && (
        <div className="absolute left-3 top-0 -translate-y-1/2 px-2 py-0.5 rounded text-xs font-mono bg-[var(--color-primary)] text-white">
          {language}
        </div>
      )}
      <pre className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg p-4 pt-6 overflow-x-auto">
        <code className={`text-sm font-mono text-[var(--color-text)] ${className || ''}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

function processContent(markdown) {
  if (!markdown) return ''

  let processed = markdown

  processed = processed.replace(
    /\*\*Why it matters:\*\*\s*([\s\S]*?)(?=\n\n\*\*|\n---|\n##|$)/g,
    '<div data-callout="takeaway">$1</div>'
  )

  processed = processed.replace(
    /\*\*Common pitfalls:\*\*\s*([\s\S]*?)(?=\n\n\*\*|\n---|\n##|$)/g,
    '<div data-callout="pitfall">$1</div>'
  )

  processed = processed.replace(
    /\*\*Key things to understand:\*\*\s*([\s\S]*?)(?=\n\n\*\*|\n---|\n##|$)/g,
    '<div data-callout="key">$1</div>'
  )

  return processed
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), ['data-callout']],
    code: [...(defaultSchema.attributes?.code || []), ['className']],
    span: [...(defaultSchema.attributes?.span || []), ['className']],
  },
}

export default function MarkdownRenderer({ content, className = '' }) {
  const processedContent = useMemo(() => processContent(content), [content])

  const components = {
    h2: ({ children }) => (
      <h2 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="text-2xl font-bold mt-10 mb-4 text-[var(--color-text)] scroll-mt-20 pb-2 border-b border-[var(--color-border)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-[var(--color-text)]">
        {children}
      </h3>
    ),
    p: ({ children }) => {
      if (typeof children === 'string' || (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string')) {
        const text = typeof children === 'string' ? children : children[0]
        const ytId = extractYouTubeId(text)
        if (ytId) {
          return <YouTubeEmbed videoId={ytId} title={text} />
        }
      }
      return <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">{children}</p>
    },
    a: ({ href, children }) => {
      // YouTube links → render as embedded player with thumbnail
      if (href) {
        const ytId = extractYouTubeId(href)
        if (ytId) {
          const title = typeof children === 'string'
            ? children
            : Array.isArray(children)
              ? children.map(c => (typeof c === 'string' ? c : '')).join('')
              : ''
          return <YouTubeEmbed videoId={ytId} title={title || undefined} />
        }
      }
      // SPA navigation for internal links
      if (href && (href.startsWith('/language/') || href.startsWith('/role/'))) {
        return (
          <Link
            to={href}
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] underline decoration-[var(--color-primary)]/30 hover:decoration-[var(--color-primary)] transition-colors"
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] underline decoration-[var(--color-primary)]/30 hover:decoration-[var(--color-primary)] transition-colors"
        >
          {children}
        </a>
      )
    },
    code: ({ className, children }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="bg-[var(--color-surface-3)] text-[var(--color-primary)] px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      return <CodeBlock className={className}>{children}</CodeBlock>
    },
    pre: ({ children }) => <>{children}</>,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left p-3 bg-[var(--color-surface-3)] border-b-2 border-[var(--color-border)] font-semibold text-sm text-[var(--color-text)]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="p-3 border-b border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]">
        {children}
      </td>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 py-2 my-4 bg-[var(--color-primary)]/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-[var(--color-border)]" />,
    ul: ({ children }) => <ul className="mb-4 pl-6 space-y-1.5 list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 pl-6 space-y-1.5 list-decimal">{children}</ol>,
    li: ({ children }) => <li className="text-[var(--color-text-secondary)] leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="text-[var(--color-text)] font-semibold">{children}</strong>,
    div: ({ children, ...props }) => {
      const calloutType = props['data-callout']
      if (calloutType === 'takeaway') {
        return <KeyTakeaway>{children}</KeyTakeaway>
      }
      if (calloutType === 'pitfall') {
        return <PitfallAlert>{children}</PitfallAlert>
      }
      if (calloutType === 'key') {
        return <ConceptCard>{children}</ConceptCard>
      }
      return <div {...props}>{children}</div>
    },
  }

  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
