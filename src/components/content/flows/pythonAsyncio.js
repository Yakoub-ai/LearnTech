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
const rose = { ...base, background: '#f43f5e', color: '#fff', border: '1px solid #e11d48' }

const nodes = [
  {
    id: 'main',
    position: { x: 300, y: 0 },
    data: {
      label: '🚀 asyncio.run(main())',
      detail: 'Entry point for async Python. Creates the event loop, runs the main coroutine until complete, then shuts down the loop. Only one event loop per thread.',
      code: 'import asyncio\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_users(),\n        fetch_orders(),\n        fetch_products(),\n    )\n    return results\n\nasyncio.run(main())',
      tips: ['One event loop per thread', 'asyncio.run() is the standard entry point', 'Never call asyncio.run() inside an already-running loop', 'Use uvloop for 2-4x faster event loop'],
    },
    style: primary,
  },
  {
    id: 'eventloop',
    position: { x: 300, y: 130 },
    data: {
      label: '🔄 Event Loop',
      detail: 'The central scheduler. Continuously checks for ready coroutines and I/O events. Runs one coroutine at a time until it hits an await, then switches to another ready coroutine.',
      tips: ['Single-threaded: cooperative multitasking', 'Coroutines voluntarily yield at await points', 'Never blocks — I/O is delegated to OS', 'Uses selectors (epoll/kqueue) for I/O readiness'],
    },
    style: amber,
  },
  {
    id: 'coroutine1',
    position: { x: 50, y: 260 },
    data: {
      label: '🔵 Coroutine A (Running)',
      detail: 'Currently executing coroutine. Runs synchronous code until it hits an await expression, then suspends and returns control to the event loop.',
      code: 'async def fetch_users():\n    # Runs until await\n    url = build_url("/users")\n    \n    # Suspends here — yields to event loop\n    response = await aiohttp.get(url)\n    \n    # Resumes when I/O completes\n    data = await response.json()\n    return data',
      tips: ['Only ONE coroutine runs at a time', 'await = suspension point', 'CPU-bound code between awaits blocks the loop', 'Use asyncio.to_thread() for CPU-bound work'],
    },
    style: green,
  },
  {
    id: 'coroutine2',
    position: { x: 300, y: 260 },
    data: {
      label: '⏸️ Coroutine B (Suspended)',
      detail: 'Waiting for an I/O operation to complete. Suspended at an await point. Will be resumed by the event loop when the awaited future resolves.',
    },
    style: sky,
  },
  {
    id: 'coroutine3',
    position: { x: 550, y: 260 },
    data: {
      label: '⏸️ Coroutine C (Suspended)',
      detail: 'Also waiting for I/O. Multiple coroutines can be suspended simultaneously — this is how asyncio achieves concurrency without threads.',
    },
    style: sky,
  },
  {
    id: 'io',
    position: { x: 50, y: 400 },
    data: {
      label: '💾 I/O Operations',
      detail: 'Network requests, file reads, database queries. The OS handles these in the background while the event loop runs other coroutines. Non-blocking I/O via epoll/kqueue.',
      tips: ['Network: aiohttp, httpx (async)', 'Database: asyncpg, aiomysql, motor', 'Files: aiofiles', 'DNS: aiodns', 'OS-level non-blocking I/O'],
    },
    style: base,
  },
  {
    id: 'gather',
    position: { x: 300, y: 400 },
    data: {
      label: '🔀 asyncio.gather()',
      detail: 'Runs multiple coroutines concurrently and waits for all of them to complete. Returns results in the same order as the input coroutines.',
      code: 'async def fetch_all():\n    # All three run concurrently\n    users, orders, products = await asyncio.gather(\n        fetch_users(),      # ~200ms\n        fetch_orders(),     # ~300ms  \n        fetch_products(),   # ~150ms\n    )\n    # Total: ~300ms (not 650ms!)\n    return users, orders, products',
      tips: ['Concurrent, NOT parallel (single thread)', 'return_exceptions=True to handle per-task errors', 'asyncio.TaskGroup (3.11+) is the modern alternative', 'TaskGroup cancels all tasks on first exception'],
    },
    style: primary,
  },
  {
    id: 'semaphore',
    position: { x: 550, y: 400 },
    data: {
      label: '🚦 Semaphore / Rate Limit',
      detail: 'Controls concurrency level. Limits how many coroutines can run a section of code simultaneously. Essential for rate-limiting API calls.',
      code: 'sem = asyncio.Semaphore(10)  # max 10 concurrent\n\nasync def fetch_with_limit(url):\n    async with sem:\n        # Only 10 coroutines here at once\n        return await aiohttp.get(url)\n\n# Launch 1000 requests, 10 at a time\nawait asyncio.gather(\n    *[fetch_with_limit(url) for url in urls]\n)',
      tips: ['Semaphore(N): limit to N concurrent', 'BoundedSemaphore: cannot release more than acquired', 'Essential for API rate limiting', 'asyncio.Lock for mutual exclusion (N=1)'],
    },
    style: rose,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const edges = [
  { id: 'e1', source: 'main', target: 'eventloop', label: 'start loop', ...edgeDefaults, animated: true },
  { id: 'e2', source: 'eventloop', target: 'coroutine1', label: 'run', ...edgeDefaults, animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' } },
  { id: 'e3', source: 'eventloop', target: 'coroutine2', label: 'waiting', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e4', source: 'eventloop', target: 'coroutine3', label: 'waiting', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e5', source: 'coroutine1', target: 'io', label: 'await I/O', ...edgeDefaults },
  { id: 'e6', source: 'io', target: 'eventloop', label: 'I/O ready', ...edgeDefaults, style: { stroke: '#f59e0b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e7', source: 'eventloop', target: 'gather', label: 'schedule', ...edgeDefaults },
  { id: 'e8', source: 'gather', target: 'coroutine2', label: 'spawn', ...edgeDefaults },
  { id: 'e9', source: 'gather', target: 'coroutine3', label: 'spawn', ...edgeDefaults },
  { id: 'e10', source: 'semaphore', target: 'coroutine1', label: 'throttle', ...edgeDefaults, style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '5 5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f43f5e' } },
]

export default {
  title: 'Python asyncio — Cooperative Concurrency',
  nodes,
  edges,
}
