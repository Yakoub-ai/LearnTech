import { MarkerType } from '@xyflow/react'

const base = {
  style: {
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 13,
    fontFamily: 'Inter, system-ui, sans-serif',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  },
}

const primary = { ...base.style, background: '#6366f1', color: '#fff', border: '1px solid #4f46e5' }
const green = { ...base.style, background: '#10b981', color: '#fff', border: '1px solid #059669' }
const amber = { ...base.style, background: '#f59e0b', color: '#fff', border: '1px solid #d97706' }
const sky = { ...base.style, background: '#0ea5e9', color: '#fff', border: '1px solid #0284c7' }

const nodes = [
  {
    id: 'callstack',
    position: { x: 250, y: 0 },
    data: {
      label: '📚 Call Stack',
      detail: 'The call stack is a LIFO (last-in, first-out) data structure that tracks function execution. JavaScript is single-threaded — only ONE function runs at a time.',
      code: 'function a() { b(); }\nfunction b() { c(); }\nfunction c() { console.log("hi"); }\na();\n// Stack: a → b → c → log → pop c → pop b → pop a',
      tips: ['Single-threaded: one function at a time', 'Stack overflow = too many nested calls', 'Async callbacks never interrupt running code'],
    },
    style: primary,
  },
  {
    id: 'webapis',
    position: { x: 500, y: 0 },
    data: {
      label: '🌐 Web APIs / Node APIs',
      detail: 'Browser or Node.js APIs that handle async operations outside the JS engine: setTimeout, fetch, DOM events, file I/O. These run in separate threads managed by the runtime.',
      tips: ['setTimeout, setInterval → Timer thread', 'fetch, XMLHttpRequest → Network thread', 'DOM events → Browser event handlers', 'Node: fs, net, crypto → libuv thread pool'],
    },
    style: base.style,
  },
  {
    id: 'microtask',
    position: { x: 100, y: 170 },
    data: {
      label: '⚡ Microtask Queue',
      detail: 'High-priority queue processed after EVERY call stack frame clears, BEFORE any macrotask. Includes Promise callbacks (.then/.catch/.finally) and queueMicrotask().',
      code: 'Promise.resolve().then(() => {\n  console.log("microtask 1");\n});\nqueueMicrotask(() => {\n  console.log("microtask 2");\n});',
      tips: ['Promises (.then, .catch, .finally)', 'queueMicrotask()', 'MutationObserver callbacks', 'ALWAYS runs before macrotasks', 'Can starve macrotasks if they keep adding more microtasks'],
    },
    style: green,
  },
  {
    id: 'macrotask',
    position: { x: 400, y: 170 },
    data: {
      label: '📦 Macrotask Queue',
      detail: 'Lower-priority queue. Only ONE macrotask is processed per event loop tick, after all microtasks are drained.',
      code: 'setTimeout(() => console.log("macro"), 0);\nPromise.resolve().then(() => console.log("micro"));\nconsole.log("sync");\n// Output: sync → micro → macro',
      tips: ['setTimeout / setInterval', 'setImmediate (Node.js)', 'I/O callbacks', 'UI rendering events', 'MessageChannel'],
    },
    style: amber,
  },
  {
    id: 'eventloop',
    position: { x: 250, y: 320 },
    data: {
      label: '🔄 Event Loop',
      detail: 'The event loop continuously checks: (1) Is the call stack empty? (2) If yes, drain ALL microtasks. (3) Then take ONE macrotask and push its callback onto the call stack. Repeat.',
      tips: ['Runs continuously while the program is alive', 'Each iteration = one "tick"', 'Order: sync code → microtasks → 1 macrotask → microtasks → render → next macrotask'],
    },
    style: sky,
  },
  {
    id: 'render',
    position: { x: 500, y: 320 },
    data: {
      label: '🎨 Render Step',
      detail: 'Browser-only: between macrotasks, the browser may run requestAnimationFrame callbacks, recalculate styles, layout, and paint. Blocked by long-running JS on the call stack.',
      tips: ['requestAnimationFrame runs here', 'Style recalculation → Layout → Paint', 'Aim for <16ms per frame (60fps)', 'Long tasks block rendering → janky UI'],
    },
    style: base.style,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const edges = [
  { id: 'e1', source: 'callstack', target: 'webapis', label: 'async call', ...edgeDefaults, animated: true },
  { id: 'e2', source: 'webapis', target: 'microtask', label: 'Promise', ...edgeDefaults, style: { stroke: '#10b981', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e3', source: 'webapis', target: 'macrotask', label: 'setTimeout', ...edgeDefaults, style: { stroke: '#f59e0b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e4', source: 'eventloop', target: 'microtask', label: 'drain all', ...edgeDefaults, animated: true },
  { id: 'e5', source: 'eventloop', target: 'macrotask', label: 'take one', ...edgeDefaults },
  { id: 'e6', source: 'microtask', target: 'callstack', label: 'execute', ...edgeDefaults, style: { stroke: '#10b981', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' }, animated: true },
  { id: 'e7', source: 'macrotask', target: 'callstack', label: 'execute', ...edgeDefaults, style: { stroke: '#f59e0b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e8', source: 'eventloop', target: 'render', label: 'may render', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'JavaScript Event Loop — Microtasks vs Macrotasks',
  nodes,
  edges,
}
