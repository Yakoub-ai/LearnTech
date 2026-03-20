# QA / Test Engineer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the QA / Test Engineer learning path.

---

## Test Strategy and Architecture – Designing the Testing Approach

A test strategy is a high-level document that defines how testing will be approached across a product or organisation. It answers questions like: what types of testing will be performed, who is responsible for each type, what tools will be used, what environments are needed, what the entry and exit criteria are, and how test results will be reported and acted upon. A test architecture describes how tests are structured, organised, and maintained as a codebase.

Martin Fowler's practical test pyramid article is one of the most influential pieces of writing on test strategy. It argues that a well-designed test suite has many fast unit tests, a moderate number of integration tests, and a small number of end-to-end tests. This shape maximises feedback speed and minimises maintenance cost. The article also discusses the tradeoffs between test fidelity (how closely a test resembles real usage) and test speed (how quickly the test provides feedback).

At the senior level, you are expected to design test strategies that balance risk, cost, and speed. This means making deliberate decisions about which features require E2E coverage, which can be adequately tested at the integration level, and which can be verified with unit tests alone. It also means defining standards for test code quality, naming conventions, folder structure, and maintenance practices.

**Why it matters:** Without a deliberate test strategy, teams end up with ad-hoc test suites that are slow, fragile, expensive to maintain, and provide uneven coverage. A well-designed strategy ensures that testing effort is invested where it provides the most value.

**Key things to understand:**

- Risk-based testing allocates more testing effort to the areas of the system that are most critical, most complex, or most likely to contain defects.
- The testing quadrants (Brian Marick's model) categorise tests along two axes: business-facing vs. technology-facing, and supporting the team vs. critiquing the product. This framework helps identify gaps in the testing approach.
- Test architecture includes decisions about the page object model (or other abstraction patterns), shared fixtures, test data strategies, and how tests are distributed across repositories and pipelines.
- A living test strategy document is reviewed and updated as the product, team, and technology evolve. A strategy written once and never revisited quickly becomes irrelevant.

**Code walkthrough:**

```javascript
// Step 1: Why a test architecture pattern — without structure, test suites
// become a tangled mess of duplicated setup and brittle assertions
// This shows a layered test architecture with shared fixtures

// --- test/fixtures/campaign.fixture.js ---
// Step 2: Shared fixtures encapsulate setup logic used across test levels
import { test as base, expect } from '@playwright/test';
import { CampaignApi } from './helpers/campaign-api';

export const test = base.extend({
  // Step 3: Custom fixture creates test data via API before each test
  // and cleans it up afterwards — tests are always isolated
  campaignApi: async ({ request }, use) => {
    const api = new CampaignApi(request);
    await use(api);
    // Automatic cleanup after each test
    await api.deleteAllTestCampaigns();
  },

  // Step 4: Fixture for seeding a campaign — reusable across many tests
  seededCampaign: async ({ campaignApi }, use) => {
    const campaign = await campaignApi.create({
      name: `Test-${Date.now()}`,
      budget: 10000,
      status: 'active',
    });
    await use(campaign);
  },
});

// --- test/e2e/campaign-list.spec.js ---
// Step 5: Tests consume fixtures — clean, declarative, no setup noise
test('campaign list shows seeded campaign', async ({ page, seededCampaign }) => {
  await page.goto('/campaigns');
  await expect(page.getByText(seededCampaign.name)).toBeVisible();
});

test('can edit seeded campaign budget', async ({ page, seededCampaign }) => {
  await page.goto(`/campaigns/${seededCampaign.id}/edit`);
  await page.getByLabel('Budget').fill('20000');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('$20,000')).toBeVisible();
});
```

**Common pitfalls:**

- Defining a test strategy on paper without implementing the tooling, infrastructure, and processes to support it.
- Treating the test pyramid as a rigid rule rather than a guideline. Some systems genuinely need more integration tests than unit tests, depending on their architecture.
- Not involving developers in the test strategy, resulting in a QA-owned strategy that does not align with how the codebase is structured or how the team works.

---

## Google Testing Blog – Industry Perspectives on Testing at Scale

The Google Testing Blog is a long-running publication by Google's engineering productivity team. It covers testing practices, tools, and philosophies developed at one of the largest software engineering organisations in the world. The blog's articles address topics such as test flakiness, test automation strategy, testing in CI/CD, code review for test quality, and the economics of testing.

The blog is valuable not because Google's practices should be copied directly -- their scale and context are unique -- but because the underlying principles are universal. Articles on topics like reducing test flakiness, the cost of slow tests, and the value of hermetic tests provide insights that apply to teams of any size. The blog also introduces concepts like "testing on the toilet" (short, actionable testing tips) and "test sizes" (small, medium, large) as an alternative to the traditional unit/integration/E2E labels.

Senior QA engineers benefit from reading broadly across the industry to challenge their assumptions and discover approaches they might not encounter in their own team. The Google Testing Blog is one of the highest-quality sources for this kind of learning.

**Why it matters:** Senior engineers are expected to have a broad perspective on testing that goes beyond the practices of their own team. Reading and synthesising industry knowledge enables you to evaluate new approaches, challenge conventional wisdom, and bring proven ideas to your organisation.

**Key things to understand:**

- Google uses test sizes (small, medium, large) based on resource constraints rather than scope labels (unit, integration, E2E). Small tests run in a single process, medium tests can use localhost network, and large tests can use external resources. This classification focuses on reliability and speed rather than scope.
- Hermetic tests are tests that are completely self-contained and do not depend on external services, shared databases, or network access. They are the most reliable and the fastest to run.
- The "testing tax" is the ongoing cost of maintaining a test suite: fixing broken tests, updating tests when behaviour changes, and waiting for slow tests. A well-designed strategy minimises this tax.
- Flaky tests (tests that pass and fail non-deterministically) are one of the most damaging problems in a test suite because they erode trust and lead teams to ignore test failures.

**Code walkthrough:**

```javascript
// Step 1: Why flaky test detection — flaky tests erode trust in the test suite.
// This script analyses test run history to identify non-deterministic failures.
import fs from 'fs';

// Step 2: Parse JUnit XML results from multiple CI runs
function analyseTestRuns(resultsDir) {
  const runs = fs.readdirSync(resultsDir).map((file) => {
    const xml = fs.readFileSync(`${resultsDir}/${file}`, 'utf-8');
    return parseJunitXml(xml); // Returns { testName, passed, runId, timestamp }
  });

  // Step 3: Group results by test name and check for inconsistency
  const testHistory = {};
  for (const run of runs.flat()) {
    if (!testHistory[run.testName]) testHistory[run.testName] = [];
    testHistory[run.testName].push(run.passed);
  }

  // Step 4: A test is flaky if it has BOTH passes and failures
  // Consistent failures are bugs, not flakiness
  const flakyTests = Object.entries(testHistory)
    .filter(([_, results]) => results.includes(true) && results.includes(false))
    .map(([name, results]) => ({
      name,
      flakinessRate: results.filter((r) => !r).length / results.length,
      totalRuns: results.length,
    }))
    .sort((a, b) => b.flakinessRate - a.flakinessRate);

  return flakyTests;
}

// Step 5: Output a report for the team — prioritise by flakiness rate
const flaky = analyseTestRuns('./test-results-history');
console.table(flaky);
// Step 6: Quarantine tests above a threshold until they're fixed
// flaky.filter(t => t.flakinessRate > 0.1).forEach(t => quarantine(t.name));
```

**Common pitfalls:**

- Trying to adopt Google-scale practices (like their testing infrastructure) in a small team where simpler approaches would be more effective.
- Reading blog posts without critically evaluating how the advice applies to your specific context, team size, and technology stack.
- Ignoring the economic perspective on testing -- every test has a cost to write, maintain, and run, and the benefit must justify that cost.

---

## Quality Engineering – Beyond Testing to Quality Culture

Quality engineering is a mindset shift from "testing the product to find defects" to "engineering the process to prevent defects." It encompasses all activities that improve the quality of the software and the efficiency of the team: test automation, CI/CD, monitoring, developer experience, process improvement, and cultural change.

A quality engineer does not just write tests. They analyse where defects originate and implement systemic improvements. If bugs are frequently introduced in a specific module, they might introduce static analysis rules, pair programming sessions, or architectural refactoring -- not just more tests. If deployments frequently cause incidents, they might implement feature flags, canary deployments, or improved monitoring -- not just more regression testing.

The shift from QA (quality assurance through testing) to quality engineering (quality through systemic improvement) reflects the industry's recognition that testing alone cannot ensure quality. Quality must be built into every stage of the development process, from requirements gathering through design, coding, testing, deployment, and monitoring.

**Why it matters:** Senior QA engineers are expected to influence quality at the systemic level, not just at the test execution level. Quality engineering is the framework for thinking about and improving quality across the entire delivery pipeline.

**Key things to understand:**

- Quality metrics (defect escape rate, mean time to detect, test coverage, flaky test rate, lead time for changes) provide data for quality improvement decisions. Without metrics, improvement efforts are based on intuition rather than evidence.
- Defect escape rate -- the percentage of defects found in production rather than in testing -- is one of the most important quality metrics. A decreasing escape rate indicates improving quality processes.
- Quality engineering requires collaboration with developers, product owners, and operations. It is not a solo discipline.
- The cost of quality includes prevention costs (training, tools, processes), appraisal costs (testing, code review), internal failure costs (rework, debugging), and external failure costs (production incidents, customer complaints). Investment in prevention reduces all other costs.

**Code walkthrough:**

```javascript
// Step 1: Why performance benchmarking in tests — catch performance
// regressions the same way you catch functional regressions: in CI
import { describe, it, expect } from 'vitest';
import { performance } from 'perf_hooks';

function segmentCustomers(customers) {
  // Simulated segmentation logic
  return customers.reduce((acc, c) => {
    const tier = c.totalSpend > 10000 ? 'premium' : c.totalSpend > 1000 ? 'standard' : 'basic';
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {});
}

describe('segmentCustomers — performance benchmarks', () => {
  // Step 2: Generate realistic dataset size for benchmarking
  const customers = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    totalSpend: Math.random() * 20000,
  }));

  it('segments 100k customers in under 50ms', () => {
    const start = performance.now();
    const result = segmentCustomers(customers);
    const duration = performance.now() - start;

    // Step 3: Assert both correctness AND performance
    expect(result.premium).toBeGreaterThan(0);
    expect(result.standard).toBeGreaterThan(0);
    expect(result.basic).toBeGreaterThan(0);

    // Step 4: Performance threshold — CI fails if this regresses
    expect(duration).toBeLessThan(50);
    console.log(`Segmentation took ${duration.toFixed(2)}ms`);
  });

  // Step 5: Track performance over time by logging to CI artifacts
  // Compare against previous runs to detect gradual degradation
  it('maintains consistent memory usage', () => {
    const before = process.memoryUsage().heapUsed;
    segmentCustomers(customers);
    const after = process.memoryUsage().heapUsed;
    const memoryDelta = (after - before) / 1024 / 1024; // MB

    expect(memoryDelta).toBeLessThan(50); // Less than 50MB
  });
});
```

**Common pitfalls:**

- Equating quality engineering with test automation. Automation is one tool, not the whole discipline.
- Implementing quality metrics without acting on them. Metrics are only valuable if they drive decisions and improvements.
- Trying to improve quality in isolation without the support and involvement of the development team and management.

---

## Shift-Left Testing – Moving Quality Earlier in the Lifecycle

Shift-left testing is the practice of moving testing activities earlier in the software development lifecycle. Instead of testing only after the code is written and deployed to a test environment, shift-left testing integrates quality activities into every phase: requirements review, design review, code writing, and code review.

The economic argument for shift-left is compelling. The cost of fixing a defect increases exponentially the later it is discovered. A requirements misunderstanding caught during a design review costs almost nothing to fix. The same misunderstanding discovered in production after deployment can cost orders of magnitude more in rework, incident response, and customer impact.

Shift-left practices include: participating in requirements review to identify ambiguities and testability issues before development begins; integrating static analysis and linting into the development workflow to catch coding errors automatically; writing unit tests during development (or before, in TDD); running automated tests on every commit in CI; and performing code reviews with a quality and testability lens.

Test-Driven Development (TDD) is a development practice where tests are written before the production code. The cycle is: write a failing test that defines the desired behaviour (red), write the minimal code to make the test pass (green), then refactor the code while keeping all tests green. TDD produces code that is inherently testable (because the test was written first) and provides immediate documentation of the intended behaviour. TDD is not just "writing tests first" -- it is a design practice that drives code toward small, focused, loosely coupled modules because those are the easiest to test.

Static analysis tools examine code without executing it. They detect bugs, code smells, security vulnerabilities, and style violations. For QA engineers, the key static analysis tools include ESLint (JavaScript/TypeScript linting), SonarQube (comprehensive code quality platform), Pylint (Python linting), and Snyk (dependency vulnerability scanning). Integrating these tools into the CI pipeline and the developer's editor creates a continuous quality feedback loop. SonarQube quality gates can be integrated into CI pipelines to block merges when code quality drops below defined thresholds (coverage, duplication, security vulnerabilities, code smells). Dependency scanning (Snyk, npm audit, pip audit) identifies known vulnerabilities in third-party packages -- this is critical because most modern applications have hundreds of dependencies, each with their own potential security issues.

**Why it matters:** Shift-left testing is not about testing earlier for its own sake. It is about reducing the feedback loop so that defects are discovered when they are cheapest to fix and closest to the person who introduced them. Defects caught by static analysis cost virtually nothing to fix because the developer is already working in the relevant code. TDD prevents defects from being introduced in the first place by requiring the developer to think about correctness before writing the implementation.

**Key things to understand:**

- Test-Driven Development (TDD) is the most extreme form of shift-left: tests are written before the code, defining the desired behaviour as executable specifications. The red-green-refactor cycle (write a failing test, write the minimum code to pass it, refactor) builds quality into the development process itself.
- Static analysis tools (ESLint, SonarQube, Pylint) detect common errors, code smells, and security vulnerabilities without running the code. Integrating them into the editor and CI pipeline catches issues at the earliest possible moment.
- Shift-left does not mean abandoning right-side activities like E2E testing, monitoring, and production observability. It means complementing them with earlier activities to reduce the volume of defects that reach the later stages.
- Requirements traceability links each test case to the requirement it verifies, making it possible to identify untested requirements and understand the impact of requirement changes on the test suite.
- The value of static analysis depends on rule configuration. Too many rules or too-strict rules produce noise that developers learn to ignore. Start with a focused ruleset targeting high-impact issues and expand gradually.

**Code walkthrough:**

```javascript
// Step 1: Why mutation testing — it measures test QUALITY, not just coverage.
// Mutation testing changes your source code (introduces "mutants") and checks
// whether your tests catch the change. Survived mutants = weak tests.

// --- stryker.config.js (Stryker mutation testing framework) ---
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  // Step 2: Target the business logic files — mutation testing is CPU-intensive,
  // so scope it to the most critical modules
  mutate: [
    'src/services/campaign-budget.js',
    'src/services/audience-segmentation.js',
    '!src/**/*.test.js',
  ],

  // Step 3: Use the appropriate test runner
  testRunner: 'vitest',

  // Step 4: Reporters generate a detailed HTML report showing each mutant
  reporters: ['html', 'clear-text', 'progress'],

  // Step 5: Thresholds define quality gates
  // 'high' = good score, 'low' = pipeline fails below this
  thresholds: {
    high: 80,    // 80%+ killed mutants = strong tests
    low: 60,     // Below 60% = pipeline fails
    break: 50,   // Hard floor — never go below 50%
  },

  // Step 6: Mutators define what changes Stryker makes to your code:
  // - Replace > with >= (boundary mutant)
  // - Replace true with false (boolean mutant)
  // - Remove function calls (method mutant)
  // If a test still passes after the change, that test is WEAK
};

// Run: npx stryker run
// Review: open reports/mutation/html/index.html
// Each surviving mutant shows a specific gap in your test assertions
```

**Common pitfalls:**

- Interpreting shift-left as "QA should write unit tests" rather than "the whole team should care about quality from the start."
- Eliminating later-stage testing in the name of shift-left, creating gaps in coverage for integration and production-like scenarios.
- Overwhelming developers with quality gates (linting rules, mandatory coverage thresholds, mandatory reviews) to the point where they slow down delivery without proportional quality benefit.
- Mandating 100% code coverage as a quality gate, which incentivises writing tests that achieve coverage without verifying meaningful behaviour.
- Ignoring static analysis warnings until they accumulate to the point where the backlog is overwhelming and demoralising.
- Applying TDD rigidly to every piece of code, including exploratory prototypes where the requirements are not yet understood. TDD is most valuable when the desired behaviour can be clearly defined.

---

## Accessibility Testing – WCAG Compliance and Inclusive Design

Accessibility testing verifies that a web application can be used by people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments. The Web Content Accessibility Guidelines (WCAG) 2.2 provide the internationally recognised standard for evaluating accessibility. Most legislation and organisational policies require conformance to WCAG 2.2 Level AA.

Accessibility testing combines automated scanning, manual testing, and assistive technology testing. Automated tools (axe-core, Lighthouse, Pa11y) can detect approximately 30-40% of accessibility issues -- those with clear, programmatically verifiable rules, such as missing alt text, insufficient colour contrast, and form inputs without labels. The remaining 60-70% of issues require human judgment: Is the tab order logical? Do screen reader announcements make sense? Can a keyboard-only user complete all critical tasks?

The EU European Accessibility Act applies from June 2025, making digital accessibility a legal requirement across the European Union. This elevates accessibility from a best practice to a compliance obligation. Senior QA engineers must be able to plan and execute accessibility audits, interpret the results, and prioritise remediation.

**Why it matters:** Accessibility affects a significant portion of the user population and is increasingly a legal requirement. A senior QA engineer who can lead accessibility testing and advocate for inclusive design adds substantial value to any product team.

**Key things to understand:**

- WCAG is organised around four principles (POUR): Perceivable, Operable, Understandable, Robust. Each principle contains guidelines, and each guideline contains testable success criteria at levels A, AA, and AAA.
- Keyboard testing is the single most impactful manual accessibility test. Navigate the entire application using only the keyboard (Tab, Shift+Tab, Enter, Space, Escape, arrow keys) and verify that all interactive elements are reachable, focusable, and operable.
- Screen reader testing (NVDA on Windows, VoiceOver on macOS) reveals issues that no automated tool can detect, such as nonsensical reading order, missing announcements for dynamic content updates, and confusing navigation landmarks.
- axe-core can be integrated into Playwright or Cypress tests to run automated accessibility checks as part of the CI pipeline, catching regressions with every build.

**Code walkthrough:**

```javascript
// Step 1: Why automated accessibility testing — it catches the 30-40% of
// WCAG violations that are programmatically detectable, on every build
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility — WCAG 2.2 AA compliance', () => {
  const criticalPages = ['/campaigns', '/campaigns/new', '/analytics', '/login'];

  // Step 2: Test every critical page — accessibility regressions can be introduced
  // by any CSS or HTML change
  for (const pagePath of criticalPages) {
    test(`${pagePath} has no WCAG 2.2 AA violations`, async ({ page }) => {
      await page.goto(pagePath);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        // Step 3: Exclude known third-party widgets you can't control
        .exclude('.third-party-chat-widget')
        .analyze();

      // Step 4: Log violations for debugging before the assertion fails
      if (results.violations.length > 0) {
        console.log('Accessibility violations:', JSON.stringify(results.violations, null, 2));
      }
      expect(results.violations).toEqual([]);
    });
  }

  // Step 5: Test dynamic states — modals, dropdowns, error states
  test('campaign form error state is accessible', async ({ page }) => {
    await page.goto('/campaigns/new');
    await page.getByRole('button', { name: 'Save' }).click(); // Trigger validation errors

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
```

**Common pitfalls:**

- Relying solely on automated accessibility tools and declaring the application "accessible" based on a clean scan.
- Testing only the default state of components and missing accessibility issues in error states, expanded states, and dynamically loaded content.
- Treating accessibility as a one-time audit rather than an ongoing practice integrated into the definition of done for every feature.

---

## Security Testing – OWASP and Application Security Fundamentals

Security testing evaluates an application's ability to protect its data and functionality from unauthorised access, manipulation, and disruption. The OWASP (Open Web Application Security Project) Testing Guide provides a comprehensive methodology for security testing of web applications, and the OWASP Top 10 lists the most critical security risks that affect web applications.

The OWASP Top 10 includes risks such as injection (SQL injection, command injection), broken authentication, sensitive data exposure, cross-site scripting (XSS), insecure deserialization, and security misconfiguration. A senior QA engineer should be able to test for these vulnerabilities using both manual techniques and automated tools.

Security testing includes several approaches: SAST (Static Application Security Testing) analyses source code for vulnerabilities without running the application; DAST (Dynamic Application Security Testing) tests the running application by sending malicious inputs and observing responses; and penetration testing is a targeted, manual approach where a tester attempts to exploit vulnerabilities in the system.

**Why it matters:** Security vulnerabilities can result in data breaches, financial loss, regulatory penalties, and reputational damage. QA engineers who understand security testing add a critical layer of protection beyond functional correctness.

**Key things to understand:**

- SQL injection is one of the most common and dangerous vulnerabilities. It occurs when user input is incorporated into SQL queries without proper sanitisation or parameterisation. Testing for it involves submitting SQL metacharacters (single quotes, semicolons, comment markers) in input fields and observing the response.
- Cross-site scripting (XSS) occurs when an application includes untrusted data in its HTML output without proper escaping. Testing for it involves submitting script tags or event handlers in input fields and checking whether they are executed in the browser.
- Authentication and authorisation testing verifies that users can only access resources they are entitled to. This includes testing for broken access controls: can a regular user access admin endpoints? Can user A read user B's data?
- SAST tools (SonarQube, Snyk, Checkmarx) can be integrated into the CI pipeline to scan code for known vulnerability patterns on every commit.

**Code walkthrough:**

```javascript
// Step 1: Why security testing in QA — security bugs are functional bugs
// that happen to be exploitable. Test them the same way.
import { test, expect } from '@playwright/test';

test.describe('Security testing — OWASP Top 10', () => {
  // Step 2: XSS testing — verify the app escapes user input properly
  test('XSS payloads are escaped in campaign name', async ({ page, request }) => {
    const xssPayload = '<script>alert("xss")</script>';

    // Create a campaign with a malicious name via API
    await request.post('/api/campaigns', {
      data: { name: xssPayload, budget: 1000 },
    });

    await page.goto('/campaigns');
    // Step 3: The script should be rendered as TEXT, not executed
    // If the page has an alert dialog, XSS succeeded — the test fails
    const dialogs = [];
    page.on('dialog', (d) => dialogs.push(d));

    await page.waitForTimeout(1000);
    expect(dialogs).toHaveLength(0); // No dialogs = XSS was blocked
    // The escaped text should be visible as plain text
    await expect(page.getByText(xssPayload)).toBeVisible();
  });

  // Step 4: Broken access control — verify users can't access other users' data
  test('user cannot access another user\'s campaigns', async ({ request }) => {
    const res = await request.get('/api/campaigns/other-user-campaign-id', {
      headers: { 'Authorization': 'Bearer user-a-token' },
    });
    // Step 5: Should return 403 Forbidden, not 200 with someone else's data
    expect(res.status()).toBe(403);
  });

  // Step 6: SQL injection testing — verify parameterised queries
  test('SQL injection in search does not expose data', async ({ request }) => {
    const res = await request.get("/api/campaigns?search=' OR 1=1 --");
    expect(res.status()).toBe(200);
    const body = await res.json();
    // Should return empty results, not all campaigns
    expect(body.campaigns).toHaveLength(0);
  });
});
```

**Common pitfalls:**

- Treating security testing as a separate activity done once before release rather than an ongoing practice integrated into the development lifecycle.
- Only testing the happy path and not attempting to bypass security controls with unexpected inputs, modified requests, or direct API access.
- Assuming that using a web framework's built-in security features (CSRF tokens, input validation) eliminates the need for security testing. Implementation errors and configuration mistakes can still introduce vulnerabilities.

---

## Visual Regression Testing – Detecting Unintended UI Changes

Visual regression testing uses automated screenshot comparison to detect unintended changes in the appearance of a user interface. Unlike functional tests that verify behaviour (what the application does), visual tests verify appearance (what the application looks like). They catch issues such as misaligned elements, overlapping text, broken layouts, incorrect colours, and missing icons that functional assertions would miss.

Playwright has built-in support for visual comparisons through its `toHaveScreenshot()` assertion. On the first run, it captures a baseline screenshot. On subsequent runs, it captures a new screenshot and compares it pixel-by-pixel against the baseline. If the difference exceeds a configurable threshold, the test fails and produces a diff image highlighting the changed areas. Baselines are stored in the repository alongside the test code.

Visual regression testing is most valuable for design-heavy applications, component libraries, and situations where pixel-perfect consistency matters. It complements functional testing by catching a class of defects -- visual regressions -- that functional tests are not designed to detect.

**Why it matters:** Visual regressions are easy to introduce (a CSS change in one component can cascade across the application) and difficult to catch manually. Automated visual testing provides consistent, repeatable verification of the application's appearance across every build.

**Key things to understand:**

- Baseline management is critical. When a visual change is intentional (a redesign, a new feature), baselines must be updated explicitly. The process of reviewing and approving baseline changes should be part of the code review workflow.
- Threshold configuration determines how much difference is tolerated before a test fails. Too tight a threshold produces false positives from anti-aliasing and font rendering differences across platforms. Too loose a threshold misses real regressions.
- Visual tests should target stable, isolated components or pages to reduce flakiness. Dynamic content (timestamps, random data, animations) must be mocked or masked to prevent false failures.
- Cross-browser visual testing (running visual comparisons in Chromium, Firefox, and WebKit) catches rendering differences between browser engines.

**Code walkthrough:**

```javascript
// Step 1: Why visual regression testing — functional tests verify behaviour,
// but cannot catch misaligned elements, broken layouts, or incorrect colours.
// Screenshot comparison catches the visual defects that code assertions miss.
import { test, expect } from '@playwright/test';

test.describe('Visual regression — campaign dashboard', () => {
  // Step 2: Capture a baseline screenshot on the first run.
  // On subsequent runs, Playwright compares against the stored baseline
  // and fails if pixel differences exceed the configured threshold.
  test('campaign list renders correctly', async ({ page }) => {
    await page.goto('/campaigns');

    // Step 3: Mask dynamic content — timestamps and live counts change every run
    // Without masking, these produce false failures on every build
    await page.evaluate(() => {
      document.querySelectorAll('[data-testid="last-updated"]').forEach(el => {
        el.textContent = 'MASKED';  // Replace timestamp with static text
      });
    });

    // Step 4: Component-level screenshot — more precise than full-page
    // Why component? A full-page failure is hard to locate; a component failure
    // points directly to the affected area
    const campaignList = page.getByTestId('campaign-list');
    await expect(campaignList).toHaveScreenshot('campaign-list.png', {
      maxDiffPixelRatio: 0.01,  // Allow 1% pixel difference (anti-aliasing)
    });
  });

  // Step 5: Test key UI states — not just the default, loaded state
  test('empty state renders correctly', async ({ page }) => {
    // Mock the API to return no campaigns
    await page.route('/api/campaigns', route => {
      route.fulfill({ status: 200, body: JSON.stringify([]) });
    });

    await page.goto('/campaigns');
    await expect(page.getByTestId('empty-state')).toHaveScreenshot('empty-state.png');
  });

  // Step 6: Cross-browser visual testing — render differences are real bugs
  // Run in playwright.config.js with projects: [{name: 'chromium'}, {name: 'firefox'}]
  test('campaign card matches design across browsers', async ({ page }) => {
    await page.goto('/campaigns');
    const firstCard = page.getByTestId('campaign-card').first();
    await expect(firstCard).toHaveScreenshot('campaign-card.png', {
      // Baselines are stored per-browser automatically by Playwright
      maxDiffPixelRatio: 0.02,
    });
  });
});

// Step 7: Baseline update workflow — intentional changes require explicit approval
// Run: npx playwright test --update-snapshots
// The updated baseline files appear as a diff in the PR for human review
// Never auto-approve baseline updates without reviewing the visual diff
```

**Common pitfalls:**

- Running visual tests against pages with dynamic content (live data, timestamps, ads) without mocking or masking the dynamic areas, resulting in constant false failures.
- Not establishing a clear process for reviewing and approving baseline updates, leading to baselines being rubber-stamped without meaningful review.
- Capturing full-page screenshots instead of component-level screenshots, making it difficult to identify which specific element changed when a test fails.

---

## AI Policy, AI Checklist, and Secure AI Framework – Internal Guidelines

As AI-assisted tools become increasingly integrated into the testing workflow -- including AI-powered test generation, intelligent test selection, AI-assisted bug triage, and automated test maintenance -- it is essential to follow the organisation's policies and frameworks for responsible AI use.

The AI Policy defines the boundaries and governance for AI adoption within the organisation. It covers topics such as approved tools and models, data classification rules (what data can and cannot be sent to external AI services), intellectual property considerations for AI-generated code, and accountability for AI-assisted outputs.

The AI Checklist provides a practical, step-by-step verification process for teams adopting AI tools. It ensures that security, privacy, compliance, and quality considerations are addressed before an AI tool is deployed in a production workflow. The Secure AI Framework provides the technical guardrails for AI system integration, covering areas such as model access control, data handling, prompt injection prevention, and output validation.

**Why it matters:** AI tools are powerful but introduce new categories of risk: data leakage (sending sensitive test data to external services), hallucinated test cases (AI-generated tests that assert incorrect behaviour), and over-reliance on AI-generated outputs without human review. Following the organisation's AI guidelines ensures that AI adoption is both effective and responsible.

**Key things to understand:**

- Never send sensitive data (customer data, credentials, proprietary business logic) to external AI services without explicit approval under the AI Policy.
- AI-generated test code must be reviewed with the same rigour as human-written code. AI models can produce tests that pass but test the wrong thing, or that contain subtle logical errors.
- The AI Checklist should be completed before introducing any new AI-assisted testing tool into the team's workflow.
- The Secure AI Framework provides guidance on technical controls for AI integration, including input/output validation, access management, and audit logging.

**Code walkthrough:**

```javascript
// Step 1: AI-assisted test generation — use AI to accelerate boilerplate,
// but always review the output with the same rigour as any other code.
// This example shows the workflow: prompt → generate → verify → commit.

// Example prompt to an AI assistant:
// "Generate Playwright tests for a campaign creation form with fields:
//  name (required, max 100 chars), budget (required, number > 0),
//  start_date (required), end_date (must be after start_date).
//  Include validation error state tests."

// AI-generated output (reviewed by: [engineer name], verified: [date]):
import { test, expect } from '@playwright/test';

test.describe('AI-assisted test generation — campaign form', () => {
  // Step 2: The AI generated these happy-path and validation tests
  // The engineer must verify: correct selectors, correct assertions,
  // correct business rules (e.g., does the budget minimum match the real rule?)
  test('creates campaign with valid data', async ({ page }) => {
    await page.goto('/campaigns/new');
    await page.getByLabel('Campaign name').fill('Q3 Home Insurance');
    await page.getByLabel('Budget').fill('50000');
    await page.getByLabel('Start date').fill('2026-07-01');
    await page.getByLabel('End date').fill('2026-09-30');
    await page.getByRole('button', { name: 'Create campaign' }).click();
    await expect(page.getByText('Campaign created')).toBeVisible();
  });

  test('shows error for budget below minimum', async ({ page }) => {
    await page.goto('/campaigns/new');
    await page.getByLabel('Budget').fill('0');  // Step 3: AI got this right — test boundary
    await page.getByRole('button', { name: 'Create campaign' }).click();
    // Why: verifies the validation message, not just that an error appears
    await expect(page.getByText('Budget must be greater than 0')).toBeVisible();
  });

  // Step 4: What the AI did NOT generate — engineer added these edge cases
  // AI tools tend to test obvious happy paths and miss complex business rules
  test('end date must be after start date', async ({ page }) => {
    await page.goto('/campaigns/new');
    await page.getByLabel('Start date').fill('2026-09-30');
    await page.getByLabel('End date').fill('2026-07-01'); // Before start date
    await page.getByRole('button', { name: 'Create campaign' }).click();
    await expect(page.getByText('End date must be after start date')).toBeVisible();
  });
});

// Step 5: AI Policy compliance — what must NOT be sent to AI tools
const AI_TOOL_RULES = [
  'Do NOT paste real customer data or production database records',
  'Do NOT share internal API keys, tokens, or connection strings',
  'Do NOT send proprietary business logic from confidential source files',
  'Use the organisation\'s approved AI tools only (see AI Policy)',
  'Always review generated tests before adding them to the test suite',
];

console.log('AI testing guidelines:');
AI_TOOL_RULES.forEach((rule, i) => console.log(`  [${i + 1}] ${rule}`));

// Step 6: Verify AI-generated tests actually test the right thing
// Run: npx playwright test --reporter=list
// Check: do failing tests fail for the right reason?
// Check: do passing tests provide meaningful coverage or just inflate metrics?
```

**Common pitfalls:**

- Assuming that AI-generated tests are correct because they pass. A test that asserts incorrect expectations will pass and provide false confidence.
- Sending production data or sensitive business logic to AI services for test generation without checking the data classification requirements in the AI Policy.
- Adopting AI testing tools without completing the AI Checklist, bypassing the governance process that exists to protect the organisation.

---

## Quality Metrics and Reporting – Data-Driven Quality Improvement

Quality metrics are quantitative measures that track the effectiveness of testing activities and the overall quality of the software. For a senior QA engineer, metrics are not just numbers to report -- they are the basis for identifying problems, making decisions, and demonstrating the value of quality investments.

Key quality metrics include: defect escape rate (the ratio of defects found in production to defects found in testing); test coverage (the percentage of code, requirements, or risk areas covered by tests); mean time to detect (the average time between a defect being introduced and being discovered); mean time to resolve (the average time between defect discovery and fix deployment); flaky test rate (the percentage of tests that fail intermittently); and test execution time (how long the test suite takes to run in CI).

Effective quality reporting presents metrics in context: trends over time, comparisons between releases, and correlation with process changes. A single-point metric ("we have 80% code coverage") is less useful than a trend ("coverage increased from 65% to 80% over three sprints after we introduced coverage gates"). Dashboards that update automatically from CI/CD data are more reliable and less effort than manual reports.

**Why it matters:** Without metrics, quality improvement is based on intuition and anecdote. With metrics, you can identify where to invest testing effort, demonstrate the impact of quality initiatives, and make evidence-based decisions about risk and release readiness.

**Key things to understand:**

- Defect escape rate is the most important metric for measuring the overall effectiveness of the quality process. A decreasing escape rate means fewer defects are reaching production.
- Code coverage is a useful indicator but not a goal in itself. 80% coverage with meaningful assertions is far more valuable than 95% coverage with trivial assertions that do not verify real behaviour.
- Flaky tests are a critical metric because they directly undermine the value of the test suite. If tests fail randomly, the team stops trusting test results and may ignore real failures.
- Quality metrics should be visible to the whole team, not just the QA team. Quality is a shared responsibility, and metrics should inform everyone's decisions.

**Code walkthrough:**

```javascript
// Step 1: Why test observability — without metrics on your test suite itself,
// you can't detect drift: slowing execution, growing flakiness, declining coverage
import fs from 'fs';

// Step 2: Parse test run results and compute key quality metrics
function computeQualityMetrics(testResultsPath) {
  const results = JSON.parse(fs.readFileSync(testResultsPath, 'utf-8'));

  const total = results.testSuites.length;
  const passed = results.testSuites.filter(s => s.status === 'passed').length;
  const failed = results.testSuites.filter(s => s.status === 'failed').length;
  const skipped = results.testSuites.filter(s => s.status === 'skipped').length;

  // Step 3: Calculate execution time to detect slow test drift
  const totalDuration = results.testSuites.reduce((sum, s) => sum + s.duration, 0);
  const slowTests = results.testSuites
    .filter(s => s.duration > 30000) // Tests taking over 30 seconds
    .sort((a, b) => b.duration - a.duration);

  return {
    // Step 4: Key metrics for the quality dashboard
    passRate: ((passed / total) * 100).toFixed(1) + '%',
    failedCount: failed,
    skippedCount: skipped,
    totalDurationMinutes: (totalDuration / 60000).toFixed(1),
    slowestTests: slowTests.slice(0, 5).map(t => ({
      name: t.name,
      duration: `${(t.duration / 1000).toFixed(1)}s`,
    })),
    // Step 5: Track these over time — trends matter more than point values
    timestamp: new Date().toISOString(),
    commit: process.env.GITHUB_SHA || 'local',
  };
}

// Step 6: Append to a metrics file — build a time-series for trend analysis
const metrics = computeQualityMetrics('./test-results/results.json');
const history = JSON.parse(fs.readFileSync('./metrics-history.json', 'utf-8'));
history.push(metrics);
fs.writeFileSync('./metrics-history.json', JSON.stringify(history, null, 2));
```

**Common pitfalls:**

- Using metrics as performance targets for individuals, which incentivises gaming (writing trivial tests for coverage, closing bugs without fixing them) rather than genuine improvement.
- Reporting metrics without analysis. A dashboard full of numbers without interpretation and recommended actions is information noise, not actionable intelligence.
- Measuring too many things at once. Start with 3-5 key metrics that align with the team's current quality challenges and expand only when those are well-understood and acted upon.

---

## Regulatory and Compliance Testing

Regulatory and compliance testing verifies that software systems meet the requirements imposed by laws, regulations, industry standards, and internal policies. In the financial services sector -- and insurance specifically -- this is not optional: Finansinspektionen (the Swedish Financial Supervisory Authority), the EU's DORA regulation, and GDPR all impose requirements that directly affect how software is tested, documented, and maintained.

Unlike functional testing (does the feature work?) or performance testing (does it work fast enough?), compliance testing asks: can we prove that the system meets its regulatory obligations? This requires traceability (linking requirements to test cases to test results), audit trails (immutable records of what was tested, when, and by whom), and evidence packages (documented proof of testing activities for regulatory audits).

**Why it matters:** In a regulated industry like insurance, inadequate testing documentation can result in regulatory findings, fines, or restrictions on business activities -- regardless of whether the software actually works correctly. A senior QA engineer in this environment must understand not just how to test, but how to document and evidence testing activities in a way that satisfies regulatory scrutiny.

**Key things to understand:**

- Traceability matrix: a bidirectional mapping between requirements and test cases. Every requirement must have at least one test case, and every test case must trace back to a requirement. This ensures complete coverage and makes it possible to assess the impact of requirement changes on the test suite.
- Audit trails: testing activities must produce immutable records -- who ran which tests, when, with what results, in what environment. Test management systems and CI/CD pipeline logs provide this naturally, but the records must be retained according to the organisation's retention policy.
- Test data masking: regulatory testing often requires realistic test data, but using production data containing personal information violates GDPR. Data masking (replacing sensitive values with realistic but fictitious alternatives) and synthetic data generation solve this problem.
- Finansinspektionen (FI) requirements: FFFS 2014:5 (governance and control) and the outsourcing regulations require financial institutions to demonstrate adequate IT risk management, including testing of critical systems. The regulations do not prescribe specific testing methods but require documented processes and evidence.
- DORA (Digital Operational Resilience Act): requires financial entities to implement ICT risk management frameworks including testing of ICT systems. DORA specifically requires threat-led penetration testing (TLPT) for significant financial institutions.
- Environment parity: regulatory testing often requires tests to run in environments that closely mirror production. Differences between test and production environments (data volumes, network configuration, integrations) can invalidate test results.
- Evidence packages: for regulatory audits, compile test evidence into structured packages: test plan, test cases with traceability, test execution results, defect reports and resolutions, environment descriptions, and sign-off records.

**Code walkthrough:**

```javascript
// Step 1: Why k6 for load testing in regulated environments — it produces
// documented, repeatable performance evidence for compliance audits
import http from 'k6/http';
import { check, group } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
  // Step 2: Scenarios model realistic load patterns for compliance evidence
  scenarios: {
    average_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 50 },   // Ramp to normal load
        { duration: '5m', target: 50 },   // Sustain normal load
        { duration: '1m', target: 0 },    // Ramp down
      ],
    },
    peak_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '8m',  // Start after average load completes
      stages: [
        { duration: '1m', target: 200 },  // Ramp to peak
        { duration: '3m', target: 200 },  // Sustain peak
        { duration: '1m', target: 0 },
      ],
    },
  },
  // Step 3: Thresholds become the documented performance requirements
  thresholds: {
    http_req_duration: ['p(95)<1000', 'p(99)<3000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Step 4: Group operations map to business-critical user journeys
  // Each group's metrics are reported separately for the evidence package
  group('View campaign list', () => {
    const res = http.get(`${__ENV.BASE_URL}/api/campaigns`);
    check(res, { 'campaigns loaded': (r) => r.status === 200 });
  });
}

// Step 5: Generate HTML report — this becomes part of the audit evidence
export function handleSummary(data) {
  return { 'performance-report.html': htmlReport(data) };
}
```

**Common pitfalls:**

- Treating regulatory testing as a checkbox exercise performed before release rather than an integrated part of the development process.
- Maintaining traceability manually in spreadsheets instead of using dedicated test management tools that automate the linkage between requirements and test cases.
- Using production data for testing without proper masking, violating GDPR and potentially exposing sensitive customer information.
- Not retaining test evidence according to the required retention periods -- if an auditor asks for test records from two years ago and they do not exist, the testing effectively did not happen from a compliance perspective.
- Assuming that automated test results alone satisfy compliance requirements -- regulators often expect documented test plans, risk assessments, and sign-off by responsible individuals, not just pass/fail reports.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from QA engineers evaluating AI-powered testing tools to testers validating AI features in production applications.

**Why it matters:** The AI Policy affects QA engineers in two ways: when using AI-assisted testing tools (which must comply with the policy's data handling and approved tool requirements) and when testing AI-powered features (which must be validated against the policy's transparency, fairness, and robustness requirements).

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins — this includes AI-assisted testing tools adopted by the QA team.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- When testing AI-powered features, verify that the transparency requirements are implemented — users must be informed when they interact with AI.
- The AI Policy's data classification requirements constrain what test data can be sent to AI services — never send production customer data to external AI tools without explicit approval.

**Code walkthrough:**

```javascript
// Step 1: Why test data masking — regulatory testing needs realistic data,
// but using production data with real PII violates GDPR. Masking generates
// data that looks real but contains no actual personal information.
import { faker } from '@faker-js/faker/locale/sv'; // Swedish locale for realistic local data

// Step 2: Factory that generates GDPR-compliant test data
function generateMaskedCustomer(overrides = {}) {
  return {
    // Step 3: Faker generates realistic but entirely synthetic data
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    // Step 4: Swedish-format personal number (personnummer) — synthetic only
    personalNumber: generateSyntheticPersonnummer(),
    phone: faker.phone.number('+46 7# ### ## ##'),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode('#####'),
      country: 'SE',
    },
    ...overrides,
  };
}

// Step 5: Generate a valid-format but non-real Swedish personal number
function generateSyntheticPersonnummer() {
  const year = faker.number.int({ min: 1950, max: 2005 });
  const month = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0');
  const day = String(faker.number.int({ min: 1, max: 28 })).padStart(2, '0');
  const suffix = String(faker.number.int({ min: 1000, max: 9999 }));
  return `${year}${month}${day}-${suffix}`; // Format only, not a real person
}

// Step 6: Batch generate test data for performance and load testing
function generateTestDataset(count) {
  return Array.from({ length: count }, () => generateMaskedCustomer());
}
// Usage: const testCustomers = generateTestDataset(10000);
```

**Common pitfalls:**
- Adopting AI-assisted testing tools without completing the AI Checklist and verifying compliance with the AI Policy.
- Testing AI features only for functional correctness without validating the policy's transparency and fairness requirements.
- Sending sensitive test data to AI-powered testing tools without checking the data classification requirements.

---

## AI-Powered Development for QA and Test Engineers

AI-assisted development tools are increasingly relevant to QA and test engineering workflows. These tools can generate test cases from specifications, create test data, write page object models, suggest assertions for existing test code, and help diagnose flaky tests — tasks that are well-suited to AI assistance because they follow recognisable patterns.

AI assistants are most effective for testing tasks when given precise context: the feature specification, the existing test patterns in the codebase, the testing framework conventions, and the types of assertions expected. They can also help explain unfamiliar test frameworks, generate API test collections, and draft BDD scenarios from user stories.

**Why it matters:** Senior QA engineers who use AI tools effectively can accelerate test development — particularly for generating boilerplate test structures, creating test data sets, and writing repetitive assertions. Understanding the limitations is critical: AI-generated tests can assert incorrect expectations, test the wrong behaviour, or provide false confidence through tests that always pass.

**Key things to understand:**
- AI-generated test cases must be reviewed with the same rigour as human-written tests. A test that asserts the wrong expected value will pass and provide false confidence.
- AI tools are effective for: generating test boilerplate, creating test data, writing assertions for straightforward behaviour, translating test cases between frameworks, and drafting BDD scenarios.
- AI tools are poorly suited for: identifying what needs to be tested (test design requires human judgment about risk and business impact), writing tests for complex business logic without deep domain context, and security testing.
- Data privacy applies to AI tool use: do not paste production data, customer records, or sensitive business logic into AI assistants. Follow the organisation's AI Policy for approved tools.

**Code walkthrough:**

```javascript
// Step 1: Why mobile testing patterns — responsive web apps must be tested
// on actual mobile viewports and touch interactions, not just desktop browsers
import { test, expect, devices } from '@playwright/test';

// Step 2: Playwright provides device descriptors with real viewport/UA strings
test.use(devices['iPhone 14']);

test.describe('Mobile testing — campaign dashboard', () => {
  test('hamburger menu is visible on mobile', async ({ page }) => {
    await page.goto('/campaigns');

    // Step 3: Desktop nav should be hidden; mobile hamburger should be visible
    await expect(page.getByRole('navigation', { name: 'Main' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
  });

  test('touch interactions work for swipe-to-delete', async ({ page }) => {
    await page.goto('/campaigns');
    const card = page.locator('.campaign-card').first();

    // Step 4: Simulate touch swipe gesture
    const box = await card.boundingBox();
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);

    // Swipe left to reveal delete action
    await page.mouse.move(box.x + box.width - 10, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 10, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();

    // Step 5: Assert the swipe revealed the delete button
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  });
});
```

**Common pitfalls:**
- Using AI to generate tests without reviewing whether the assertions verify meaningful behaviour — AI-generated tests may achieve code coverage without testing anything important.
- Over-relying on AI for test design decisions that require human judgment about risk, business impact, and user behaviour.
- Not establishing team conventions around AI tool use in testing, leading to inconsistent test quality and patterns.

---

## EU Compliance for QA / Test Engineers

Senior QA and Test Engineers in EU-regulated environments bear the responsibility of verifying that software systems meet regulatory compliance requirements — and producing the documented evidence that proves it. In a Swedish insurance company, the regulatory landscape includes GDPR, the EU AI Act, DORA, NIS2, and Finansinspektionen's FFFS regulations, all of which impose requirements that must be testable, tested, and evidenced. Compliance testing is not a separate activity performed before an audit — it must be integrated into the standard testing pipeline so that every release is verifiable against regulatory obligations.

GDPR test scenarios are a critical component of the QA strategy for any system that processes personal data. Senior QA engineers must design and maintain test suites that verify: the right to erasure works correctly (requesting deletion of a customer's data results in complete removal from all data stores within 30 days), the right to data portability produces a complete and machine-readable export, the right to access returns all personal data held about an individual, consent mechanisms function correctly (no tracking or processing occurs without valid consent), data minimisation is enforced (APIs do not return more personal data than necessary for the stated purpose), and retention policies are automatically enforced (data is deleted or anonymised after the defined retention period). These tests must use synthetic test data — never production data containing real personal information — and the test data generation must itself be GDPR-compliant.

Compliance testing automation requires a traceability framework that links regulatory requirements to test cases to test results. Every GDPR article, EU AI Act obligation, and DORA requirement that affects the system under test should be mapped to specific test cases, and test execution results should be automatically compiled into evidence packages for regulatory audit. This traceability must be bidirectional: given a regulation, you can find all tests that verify it; given a test, you can identify which regulation it satisfies. Test management systems and CI/CD pipeline logs provide the raw data, but QA engineers must design the structure that makes it auditable. For DORA specifically, test evidence must include: the test plan, the environment description, the test execution results, the defect reports and their resolution status, and sign-off by the responsible individual.

When testing AI-powered features, QA engineers must verify the EU AI Act's transparency requirements — that users are clearly informed when they interact with an AI system — and fairness requirements — that the system does not produce discriminatory outcomes. This means designing test scenarios that check: AI disclosure labels are visible and accessible, human override mechanisms function correctly, the system degrades gracefully when the AI component is unavailable, and outputs do not vary systematically across protected groups in ways that would indicate bias. For high-risk AI systems in insurance, QA engineers should also verify that the conformity assessment documentation accurately reflects the system's actual behaviour.

**Code walkthrough:**

```python
# GDPR compliance test automation with regulatory traceability
# Produces auditable evidence for Finansinspektionen and IMY reviews
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
import json

class Regulation(Enum):
    GDPR_ART_17 = "GDPR Article 17 — Right to Erasure"
    GDPR_ART_15 = "GDPR Article 15 — Right of Access"
    GDPR_ART_20 = "GDPR Article 20 — Right to Data Portability"
    GDPR_ART_7 = "GDPR Article 7 — Conditions for Consent"
    EU_AI_ACT_ART_13 = "EU AI Act Article 13 — Transparency"
    DORA_ART_25 = "DORA Article 25 — ICT System Testing"

@dataclass
class ComplianceTestCase:
    test_id: str
    regulation: Regulation
    description: str
    passed: bool
    evidence: str
    executed_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

@dataclass
class ComplianceEvidencePackage:
    """Auditable evidence package for regulatory review."""
    package_id: str
    system_name: str
    test_results: list[ComplianceTestCase]
    generated_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

    def summary(self) -> dict:
        by_regulation = {}
        for tc in self.test_results:
            reg = tc.regulation.value
            by_regulation.setdefault(reg, {"passed": 0, "failed": 0})
            by_regulation[reg]["passed" if tc.passed else "failed"] += 1

        return {
            "package_id": self.package_id,
            "system": self.system_name,
            "total_tests": len(self.test_results),
            "passed": sum(1 for t in self.test_results if t.passed),
            "failed": sum(1 for t in self.test_results if not t.passed),
            "by_regulation": by_regulation,
            "overall_compliant": all(t.passed for t in self.test_results),
            "generated_at": self.generated_at.isoformat(),
        }

# Example: build a GDPR compliance evidence package
def run_gdpr_compliance_suite(api_base_url: str) -> ComplianceEvidencePackage:
    """Run GDPR compliance tests and produce audit evidence.
    Why automate? Manual compliance testing cannot keep pace with release frequency."""
    results = [
        ComplianceTestCase(
            test_id="GDPR-ERASURE-001",
            regulation=Regulation.GDPR_ART_17,
            description="Customer deletion request removes all personal data within 30 days",
            passed=True,
            evidence="Verified: 0 rows remaining in customers, claims, policies tables",
        ),
        ComplianceTestCase(
            test_id="GDPR-CONSENT-001",
            regulation=Regulation.GDPR_ART_7,
            description="No analytics tracking fires before explicit consent",
            passed=True,
            evidence="Network log shows 0 tracking requests before consent click",
        ),
    ]

    package = ComplianceEvidencePackage(
        package_id=f"GDPR-{datetime.now(timezone.utc).strftime('%Y%m%d')}",
        system_name="claims-portal",
        test_results=results,
    )
    print(json.dumps(package.summary(), indent=2))
    return package
```

> **Why it matters:** In regulated industries, untested compliance is indistinguishable from non-compliance. When Finansinspektionen or IMY requests evidence that a system meets GDPR, EU AI Act, or DORA requirements, the organisation must produce documented test results — not just assertions that the system was "built to comply." QA engineers who build automated compliance testing with regulatory traceability ensure that every release carries verifiable proof of compliance, reducing the risk of regulatory findings that can result in fines, operational restrictions, or reputational damage.
