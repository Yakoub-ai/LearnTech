import { MarkerType } from '@xyflow/react'

const base = {
  padding: '12px 16px',
  borderRadius: 12,
  fontSize: 13,
  fontFamily: 'Inter, system-ui, sans-serif',
  border: '1px solid var(--color-border)',
  background: 'var(--color-surface-2)',
  color: 'var(--color-text)',
  cursor: 'pointer',
}

const primary = { ...base, background: '#6366f1', color: '#fff', border: '1px solid #4f46e5' }
const green = { ...base, background: '#10b981', color: '#fff', border: '1px solid #059669' }
const amber = { ...base, background: '#f59e0b', color: '#fff', border: '1px solid #d97706' }
const sky = { ...base, background: '#0ea5e9', color: '#fff', border: '1px solid #0284c7' }

const nodes = [
  {
    id: 'trigger',
    position: { x: 0, y: 120 },
    data: {
      label: '⚡ State Change',
      detail: 'A render is triggered when state changes (useState/useReducer), props change, or a parent re-renders. React schedules a re-render — it does NOT happen immediately.',
      code: 'const [count, setCount] = useState(0);\n\n// This schedules a re-render\nsetCount(prev => prev + 1);\n// count is still 0 here!\n// New value available on next render',
      tips: ['setState is asynchronous — batched by default', 'React 18+: automatic batching across all contexts', 'Strict mode double-renders in development only'],
    },
    style: base,
  },
  {
    id: 'render',
    position: { x: 200, y: 120 },
    data: {
      label: '🔄 Render Phase',
      detail: 'React calls your component function to compute the new JSX. This creates a new virtual DOM tree (React Elements). This phase is PURE — no side effects.',
      code: 'function Counter({ label }) {\n  const [count, setCount] = useState(0);\n  // This code runs during render\n  // Must be pure: no API calls,\n  // no DOM manipulation\n  return (\n    <div>\n      <span>{label}: {count}</span>\n      <button onClick={() => setCount(c => c + 1)}>\n        +1\n      </button>\n    </div>\n  );\n}',
      tips: ['Component function = render function', 'Must be pure: same props → same JSX', 'Side effects go in useEffect, not render', 'Can be interrupted by React (concurrent mode)'],
    },
    style: primary,
  },
  {
    id: 'reconcile',
    position: { x: 420, y: 40 },
    data: {
      label: '🔍 Reconciliation (Diff)',
      detail: 'React compares the new virtual DOM with the previous one using its diffing algorithm. It identifies the minimum set of changes needed.',
      tips: ['O(n) diffing using heuristics', 'Same type → update props, recurse children', 'Different type → tear down and rebuild', 'Keys help React identify which items changed in lists', 'Without keys: unnecessary re-mounts and lost state'],
    },
    style: amber,
  },
  {
    id: 'fiber',
    position: { x: 420, y: 200 },
    data: {
      label: '🧵 Fiber Tree',
      detail: 'React\'s internal work-in-progress tree. Each fiber node represents a component instance with its state, props, and effect list. Enables concurrent rendering.',
      tips: ['Linked list of work units', 'Each fiber has: child, sibling, return pointers', 'Enables pausing/resuming work (time-slicing)', 'Priority lanes for urgent vs deferred updates'],
    },
    style: sky,
  },
  {
    id: 'commit',
    position: { x: 640, y: 120 },
    data: {
      label: '✏️ Commit Phase',
      detail: 'React applies the computed changes to the real DOM. This phase is synchronous and cannot be interrupted. DOM mutations happen here.',
      tips: ['Synchronous — cannot be interrupted', 'DOM insertions, updates, deletions', 'Ref attachments happen here', 'useLayoutEffect runs synchronously after commit'],
    },
    style: green,
  },
  {
    id: 'dom',
    position: { x: 840, y: 50 },
    data: {
      label: '🖥️ DOM Update',
      detail: 'The browser\'s real DOM is updated with the minimum necessary changes. Only changed nodes are touched — React batches these for performance.',
      tips: ['Minimal DOM operations', 'Batched for fewer reflows', 'className, style, textContent, etc.'],
    },
    style: base,
  },
  {
    id: 'paint',
    position: { x: 840, y: 200 },
    data: {
      label: '🎨 Browser Paint',
      detail: 'The browser recalculates styles, runs layout, and paints pixels to the screen. This is the step where the user actually sees changes.',
      tips: ['Style → Layout → Paint → Composite', 'useEffect runs AFTER paint (non-blocking)', 'useLayoutEffect runs BEFORE paint (blocking)', 'Aim for <16ms total to maintain 60fps'],
    },
    style: base,
  },
  {
    id: 'effects',
    position: { x: 640, y: 280 },
    data: {
      label: '🔧 Effects',
      detail: 'useEffect callbacks run asynchronously after the browser paints. Used for side effects: data fetching, subscriptions, DOM measurements.',
      code: 'useEffect(() => {\n  // Runs after paint\n  const data = await fetch("/api/data");\n  setData(data);\n\n  return () => {\n    // Cleanup on unmount or\n    // before next effect run\n  };\n}, [dependency]);',
      tips: ['useEffect: async, after paint', 'useLayoutEffect: sync, before paint', 'Cleanup function for subscriptions', 'Dependencies array controls when it re-runs'],
    },
    style: primary,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const edges = [
  { id: 'e1', source: 'trigger', target: 'render', label: 'schedule', ...edgeDefaults, animated: true },
  { id: 'e2', source: 'render', target: 'reconcile', label: 'new vDOM', ...edgeDefaults },
  { id: 'e3', source: 'render', target: 'fiber', label: 'build fibers', ...edgeDefaults },
  { id: 'e4', source: 'reconcile', target: 'commit', label: 'diff result', ...edgeDefaults },
  { id: 'e5', source: 'fiber', target: 'commit', label: 'effect list', ...edgeDefaults },
  { id: 'e6', source: 'commit', target: 'dom', label: 'mutate', ...edgeDefaults, animated: true },
  { id: 'e7', source: 'dom', target: 'paint', label: 'repaint', ...edgeDefaults },
  { id: 'e8', source: 'paint', target: 'effects', label: 'after paint', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e9', source: 'effects', target: 'trigger', label: 'may setState', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'React Rendering Pipeline — Trigger → Render → Reconcile → Commit → Paint',
  nodes,
  edges,
}
