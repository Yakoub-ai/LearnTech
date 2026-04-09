import { MarkerType } from '@xyflow/react'

const nodeDefaults = {
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

const primaryStyle = {
  ...nodeDefaults.style,
  background: '#6366f1',
  color: '#fff',
  border: '1px solid #4f46e5',
}

const accentStyle = {
  ...nodeDefaults.style,
  background: '#0ea5e9',
  color: '#fff',
  border: '1px solid #0284c7',
}

const greenStyle = {
  ...nodeDefaults.style,
  background: '#10b981',
  color: '#fff',
  border: '1px solid #059669',
}

const amberStyle = {
  ...nodeDefaults.style,
  background: '#f59e0b',
  color: '#fff',
  border: '1px solid #d97706',
}

const nodes = [
  {
    id: 'requirements',
    position: { x: 0, y: 0 },
    data: {
      label: '📋 Requirements',
      detail: 'Gather functional requirements (what the system must do) and non-functional requirements (performance, reliability, security, scalability). Clarify constraints: budget, timeline, team skills.',
      tips: ['Distinguish must-have from nice-to-have requirements', 'Quantify non-functional requirements: "p99 latency < 200ms"', 'Identify regulatory and compliance constraints early'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'capacity',
    position: { x: 220, y: 0 },
    data: {
      label: '📊 Capacity Estimation',
      detail: 'Estimate scale: users, requests per second, data volume, storage growth. Back-of-envelope calculations drive architecture decisions and infrastructure sizing.',
      code: '# Example estimation:\nDAU = 10M users\nRPS = DAU / 86400 * avg_actions\n    = 10M / 86400 * 5\n    = ~580 RPS (avg)\n    = ~2900 RPS (5x peak)\n\nStorage = users * avg_data_per_user\n        = 10M * 2KB = ~20GB/year',
      tips: ['Estimate average AND peak load (typically 3-5x average)', 'Calculate read:write ratio — it drives caching and database choices', 'Plan for 10x current scale to avoid near-term re-architecture'],
    },
    style: accentStyle,
  },
  {
    id: 'highlevel',
    position: { x: 440, y: 0 },
    data: {
      label: '🏗️ High-Level Design',
      detail: 'Define the major components and their interactions. Draw the system diagram: clients, load balancers, application servers, databases, caches, message queues, CDN.',
      tips: ['Start with a box-and-arrow diagram on a whiteboard', 'Identify the data flow from client request to response', 'Choose between monolith and microservices based on team size and complexity', 'Consider the CAP theorem for distributed components'],
    },
    style: primaryStyle,
  },
  {
    id: 'components',
    position: { x: 0, y: 160 },
    data: {
      label: '🧩 Component Design',
      detail: 'Design each major component in detail: API layer, business logic, data access, caching strategy, async processing. Define clear interfaces between components.',
      tips: ['Each component should have a single, clear responsibility', 'Design for failure: what happens when this component goes down?', 'Define API contracts before implementation', 'Apply SOLID principles at the component level'],
    },
    style: accentStyle,
  },
  {
    id: 'datamodel',
    position: { x: 220, y: 160 },
    data: {
      label: '🗄️ Data Model',
      detail: 'Design the schema, choose database types (relational, document, key-value, graph), and plan indexing strategies. Data model decisions are the hardest to change later.',
      tips: ['Relational (PostgreSQL) for structured data with complex queries', 'Document (MongoDB) for flexible schemas with hierarchical data', 'Redis for caching and rate limiting', 'Design indexes based on query patterns, not just the schema'],
    },
    style: amberStyle,
  },
  {
    id: 'adr',
    position: { x: 440, y: 160 },
    data: {
      label: '📝 Architecture Decision Record',
      detail: 'Document each significant decision with context, options considered, decision made, and consequences. ADRs create an audit trail of architectural reasoning.',
      code: '# ADR-001: Database choice\n\n## Context\nNeed persistent storage for user\nprofiles and activity data.\n\n## Decision\nPostgreSQL for profiles (relational),\nRedis for session cache.\n\n## Consequences\n+ Strong consistency for user data\n+ Fast reads from cache\n- Must manage two data stores',
      tips: ['Write ADRs for decisions that are costly to reverse', 'Include alternatives considered and why they were rejected', 'Keep ADRs in version control alongside the code'],
    },
    style: primaryStyle,
  },
  {
    id: 'review',
    position: { x: 220, y: 300 },
    data: {
      label: '🔍 Design Review',
      detail: 'Present the design to the team for review. Identify risks, gaps, and assumptions. Incorporate feedback before committing to implementation.',
      tips: ['Walk through failure scenarios: what if X goes down?', 'Review security implications at every integration point', 'Verify the design meets all non-functional requirements', 'Get buy-in from the team who will implement it'],
    },
    style: greenStyle,
  },
  {
    id: 'implement',
    position: { x: 440, y: 300 },
    data: {
      label: '🚀 Implementation',
      detail: 'Build incrementally, starting with the critical path. Validate assumptions early with prototypes or spikes. Revisit the design as you learn more.',
      tips: ['Start with the hardest or riskiest component first', 'Build vertical slices (full feature) not horizontal layers', 'Use feature flags for incremental rollout', 'Revisit architecture decisions as you learn — the design is a living document'],
    },
    style: greenStyle,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'requirements', target: 'capacity', label: 'estimate', ...edgeDefaults },
  { id: 'e2', source: 'capacity', target: 'highlevel', label: 'design', ...edgeDefaults },
  { id: 'e3', source: 'highlevel', target: 'components', label: 'decompose', ...edgeDefaults },
  { id: 'e4', source: 'components', target: 'datamodel', label: 'model', ...edgeDefaults },
  { id: 'e5', source: 'datamodel', target: 'adr', label: 'document', ...edgeDefaults },
  { id: 'e6', source: 'adr', target: 'review', label: 'present', ...edgeDefaults },
  { id: 'e7', source: 'review', target: 'implement', label: 'approved', ...edgeDefaults },
  { id: 'e8', source: 'review', target: 'components', label: 'revise', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'System Design Flow — From Requirements to Architecture',
  nodes,
  edges,
}
