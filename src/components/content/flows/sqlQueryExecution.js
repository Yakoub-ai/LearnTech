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
    id: 'query',
    position: { x: 0, y: 130 },
    data: {
      label: '📝 SQL Query',
      detail: 'The raw SQL text sent by the client. The database engine processes it through several phases before any data is touched.',
      code: 'SELECT c.name, SUM(o.total)\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.date >= \'2025-01-01\'\nGROUP BY c.name\nORDER BY SUM(o.total) DESC\nLIMIT 10;',
    },
    style: base,
  },
  {
    id: 'parser',
    position: { x: 200, y: 130 },
    data: {
      label: '🔤 Parser',
      detail: 'Lexical analysis (tokenization) and syntactic analysis. Validates SQL grammar and produces an Abstract Syntax Tree (AST). Catches syntax errors here.',
      tips: ['Tokenizer: breaks SQL into keywords, identifiers, literals', 'Grammar validation: is the SQL syntactically correct?', 'Output: Abstract Syntax Tree (AST)', 'Parameterized queries: placeholders resolved here'],
    },
    style: primary,
  },
  {
    id: 'analyzer',
    position: { x: 400, y: 50 },
    data: {
      label: '🔍 Semantic Analyzer',
      detail: 'Resolves table and column names against the catalog. Checks permissions. Validates types. Resolves aliases and expands wildcards (SELECT *).',
      tips: ['Do tables/columns exist?', 'Does the user have permission?', 'Are types compatible for joins/comparisons?', 'Resolve * to actual column list', 'Expand views to their definitions'],
    },
    style: sky,
  },
  {
    id: 'rewriter',
    position: { x: 400, y: 210 },
    data: {
      label: '✨ Query Rewriter',
      detail: 'Applies rule-based transformations to simplify the query. Predicate pushdown, constant folding, subquery flattening, view expansion.',
      code: '-- Before rewrite:\nSELECT * FROM orders\nWHERE YEAR(date) = 2025\n\n-- After (sargable rewrite):\nSELECT * FROM orders\nWHERE date >= \'2025-01-01\'\n  AND date < \'2026-01-01\'',
      tips: ['Predicate pushdown: filter early, reduce rows', 'Constant folding: 2+3 → 5 at compile time', 'Subquery flattening: correlated → join', 'Make predicates sargable (index-friendly)'],
    },
    style: sky,
  },
  {
    id: 'optimizer',
    position: { x: 620, y: 130 },
    data: {
      label: '🧮 Query Optimizer',
      detail: 'The brain of the database. Generates multiple execution plans and picks the cheapest one based on table statistics, index availability, and cost estimates.',
      code: 'EXPLAIN (ANALYZE, BUFFERS)\nSELECT ...\n\n-- Key metrics:\n-- cost=0.00..125.40\n-- rows=1000 (estimated)\n-- actual rows=987\n-- Buffers: shared hit=42 read=3',
      tips: ['Cost-based optimizer (CBO) uses statistics', 'Run ANALYZE to update table statistics', 'Considers: Seq Scan, Index Scan, Bitmap Scan', 'Join order matters: N! possible orderings', 'Chooses join algorithm: Nested Loop, Hash, Merge'],
    },
    style: amber,
  },
  {
    id: 'plan',
    position: { x: 820, y: 50 },
    data: {
      label: '📋 Execution Plan',
      detail: 'The chosen plan: a tree of physical operators. Each node reads from children and produces rows for its parent. Leaf nodes access tables/indexes.',
      tips: ['Tree structure: parent consumes child output', 'Leaf nodes: table scans or index lookups', 'Internal nodes: joins, sorts, aggregates', 'EXPLAIN shows estimated; EXPLAIN ANALYZE shows actual'],
    },
    style: green,
  },
  {
    id: 'executor',
    position: { x: 820, y: 210 },
    data: {
      label: '⚙️ Executor',
      detail: 'Walks the plan tree and executes each operator. Uses the buffer pool to read pages from disk or cache. Produces the result set row by row (volcano model) or in batches.',
      tips: ['Volcano model: each operator has next() method', 'Vectorized: process batches of rows (faster)', 'Buffer pool: caches frequently accessed pages', 'Spills to disk if work_mem exceeded (sorts, hashes)'],
    },
    style: primary,
  },
  {
    id: 'result',
    position: { x: 820, y: 350 },
    data: {
      label: '📊 Result Set',
      detail: 'Final rows returned to the client. May be streamed (cursor) or materialized (full result). Includes metadata: column names, types, row count.',
      tips: ['Cursors for large result sets (streaming)', 'LIMIT stops execution early', 'Column metadata sent before rows', 'Network serialization adds overhead'],
    },
    style: base,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const edges = [
  { id: 'e1', source: 'query', target: 'parser', label: 'SQL text', ...edgeDefaults, animated: true },
  { id: 'e2', source: 'parser', target: 'analyzer', label: 'AST', ...edgeDefaults },
  { id: 'e3', source: 'parser', target: 'rewriter', label: 'AST', ...edgeDefaults },
  { id: 'e4', source: 'analyzer', target: 'optimizer', label: 'validated', ...edgeDefaults },
  { id: 'e5', source: 'rewriter', target: 'optimizer', label: 'simplified', ...edgeDefaults },
  { id: 'e6', source: 'optimizer', target: 'plan', label: 'cheapest plan', ...edgeDefaults },
  { id: 'e7', source: 'plan', target: 'executor', label: 'execute', ...edgeDefaults, animated: true },
  { id: 'e8', source: 'executor', target: 'result', label: 'rows', ...edgeDefaults, animated: true },
]

export default {
  title: 'SQL Query Execution Pipeline',
  nodes,
  edges,
}
