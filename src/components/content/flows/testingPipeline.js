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

const roseStyle = {
  ...nodeDefaults.style,
  background: '#f43f5e',
  color: '#fff',
  border: '1px solid #e11d48',
}

const nodes = [
  {
    id: 'requirements',
    position: { x: 0, y: 0 },
    data: {
      label: '📋 Requirements',
      detail: 'Test planning starts with understanding what the software should do. Requirements, user stories, and acceptance criteria define what to test and how to measure correctness.',
      tips: ['Review acceptance criteria for testable conditions', 'Identify edge cases and boundary conditions early', 'Clarify ambiguous requirements before writing tests'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'strategy',
    position: { x: 200, y: 0 },
    data: {
      label: '📐 Test Strategy',
      detail: 'Define which test types, tools, environments, and coverage targets apply. The test pyramid guides the ratio: many unit tests, fewer integration tests, fewest E2E tests.',
      tips: ['Follow the test pyramid: many unit, some integration, few E2E', 'Define coverage targets per test level (e.g., 80% branch coverage for unit)', 'Choose tools that fit the tech stack (Jest, Vitest, Playwright, k6)'],
    },
    style: primaryStyle,
  },
  {
    id: 'unit',
    position: { x: 400, y: 0 },
    data: {
      label: '🧪 Unit Tests',
      detail: 'Test individual functions and components in isolation. Fast, cheap, and numerous — they form the base of the test pyramid and catch most bugs early.',
      code: '// Jest / Vitest example\ndescribe("calculateTotal", () => {\n  it("sums items with tax", () => {\n    const items = [\n      { price: 10, qty: 2 },\n      { price: 5, qty: 1 }\n    ];\n    expect(calculateTotal(items, 0.1))\n      .toBe(27.5);\n  });\n});',
      tips: ['Test behaviour, not implementation details', 'Use mocks/stubs for external dependencies (APIs, databases)', 'Aim for fast execution: milliseconds per test'],
    },
    style: greenStyle,
  },
  {
    id: 'integration',
    position: { x: 0, y: 160 },
    data: {
      label: '🔗 Integration Tests',
      detail: 'Verify that components work correctly together — API endpoints with databases, services with message queues, frontend components with state management.',
      code: '// API integration test\ndescribe("POST /api/orders", () => {\n  it("creates order and returns 201",\n    async () => {\n    const res = await request(app)\n      .post("/api/orders")\n      .send({ items: [{ id: 1, qty: 2 }] });\n    expect(res.status).toBe(201);\n    expect(res.body.orderId)\n      .toBeDefined();\n  });\n});',
      tips: ['Use test databases or containers (Testcontainers)', 'Test API contracts between services', 'Integration tests are slower — run them less frequently than unit tests'],
    },
    style: amberStyle,
  },
  {
    id: 'e2e',
    position: { x: 200, y: 160 },
    data: {
      label: '🌐 E2E Tests',
      detail: 'Simulate real user journeys through the full application stack. Interact with the UI in a browser, exercising the complete system from frontend to database.',
      code: '// Playwright example\ntest("user can place an order",\n  async ({ page }) => {\n  await page.goto("/products");\n  await page.click(\n    \'[data-testid="add-to-cart"]\'\n  );\n  await page.click(\n    \'[data-testid="checkout"]\'\n  );\n  await expect(\n    page.locator(".confirmation")\n  ).toBeVisible();\n});',
      tips: ['Cover critical user journeys, not every possible path', 'Use stable selectors (data-testid) not CSS classes', 'Run in CI with headed/headless browser modes'],
    },
    style: roseStyle,
  },
  {
    id: 'performance',
    position: { x: 400, y: 160 },
    data: {
      label: '⚡ Performance Tests',
      detail: 'Measure response times, throughput, and resource usage under load. Identify bottlenecks before they affect real users. Load testing validates capacity planning.',
      code: '// k6 load test\nimport http from "k6/http";\nimport { check } from "k6";\n\nexport const options = {\n  vus: 100,\n  duration: "5m",\n  thresholds: {\n    http_req_duration: ["p95<500"],\n  },\n};\n\nexport default function () {\n  const res = http.get(\n    "https://api.example.com/products"\n  );\n  check(res, {\n    "status 200": (r) => r.status === 200,\n  });\n}',
      tips: ['Define SLOs: p95 latency < 500ms, error rate < 0.1%', 'Test at expected peak load and 2x expected peak', 'Profile CPU, memory, and database queries under load'],
    },
    style: accentStyle,
  },
  {
    id: 'ci',
    position: { x: 200, y: 300 },
    data: {
      label: '🔄 CI/CD Pipeline',
      detail: 'Automate test execution on every commit. Unit tests run on every push, integration tests on PR, E2E and performance tests on merge to main or scheduled.',
      tips: ['Fast feedback: unit tests < 2 min, integration < 10 min', 'Fail the pipeline if tests fail — no exceptions', 'Parallelise test suites for faster CI runs', 'Generate coverage reports and track trends'],
    },
    style: primaryStyle,
  },
  {
    id: 'release',
    position: { x: 400, y: 300 },
    data: {
      label: '🚀 Release Gate',
      detail: 'All quality gates must pass before deployment: test coverage thresholds met, no critical bugs, performance within SLOs, security scan clean.',
      tips: ['Enforce minimum coverage thresholds in CI', 'Block releases on failed tests or security vulnerabilities', 'Use feature flags for gradual rollouts', 'Monitor production after release for regression'],
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
  { id: 'e1', source: 'requirements', target: 'strategy', label: 'plan', ...edgeDefaults },
  { id: 'e2', source: 'strategy', target: 'unit', label: 'write', ...edgeDefaults },
  { id: 'e3', source: 'unit', target: 'integration', label: 'compose', ...edgeDefaults },
  { id: 'e4', source: 'integration', target: 'e2e', label: 'flow', ...edgeDefaults },
  { id: 'e5', source: 'e2e', target: 'performance', label: 'validate', ...edgeDefaults },
  { id: 'e6', source: 'performance', target: 'ci', label: 'automate', ...edgeDefaults },
  { id: 'e7', source: 'ci', target: 'release', label: 'gate', ...edgeDefaults },
  { id: 'e8', source: 'release', target: 'requirements', label: 'next cycle', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'Testing Pipeline — From Requirements to Release',
  nodes,
  edges,
}
