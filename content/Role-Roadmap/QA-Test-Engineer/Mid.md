# QA / Test Engineer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the QA / Test Engineer learning path.

---

## Playwright – Modern End-to-End Test Automation

Playwright is a browser automation library developed by Microsoft that supports Chromium, Firefox, and WebKit (Safari) from a single API. It enables writing end-to-end tests that run real browsers, interact with pages the way users do, and verify that the full application stack works correctly together.

Playwright's architecture is built on the concept of browser contexts -- isolated browser sessions that share no state. Each test can run in its own context, providing true test isolation without the overhead of launching separate browser instances. This makes tests faster and more reliable than approaches that share browser state between tests.

The locator API is Playwright's primary mechanism for finding elements on a page. Locators are lazy and auto-waiting: when you write `page.getByRole('button', { name: 'Submit' })`, Playwright does not immediately search the DOM. Instead, it waits until the element is visible, stable, and actionable before interacting with it. This auto-waiting behaviour eliminates the need for explicit sleep statements and dramatically reduces test flakiness.

**Why it matters:** Playwright has become the industry standard for end-to-end test automation due to its reliability, speed, cross-browser support, and developer-friendly API. Mastering Playwright is essential for any mid-level QA engineer working on web applications.

**Key things to understand:**

- Prefer accessibility-based locators (`getByRole`, `getByLabel`, `getByText`) over CSS selectors or XPath. They are more resilient to UI changes and encourage accessible application design.
- Playwright supports API testing (`request.get`, `request.post`) alongside browser testing, allowing you to set up test data via API calls before running UI tests.
- Test fixtures and hooks (`beforeEach`, `afterEach`, `beforeAll`, `afterAll`) manage test setup and teardown. Custom fixtures can encapsulate common setup patterns.
- Playwright's trace viewer captures a complete timeline of each test including screenshots, DOM snapshots, and network requests, making it invaluable for debugging failures.

**Code walkthrough:**

```javascript
// Step 1: Why Playwright — it auto-waits for elements, runs real browsers,
// and supports all major engines (Chromium, Firefox, WebKit) from one API
import { test, expect } from '@playwright/test';

test.describe('Campaign management E2E', () => {
  // Step 2: beforeEach navigates to a known starting point for each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/campaigns');
  });

  test('user can create and delete a campaign', async ({ page }) => {
    // Step 3: getByRole is the preferred locator — matches accessibility roles
    // and survives UI refactors that change CSS classes or DOM structure
    await page.getByRole('button', { name: 'New Campaign' }).click();
    await page.getByLabel('Campaign name').fill('Playwright Test Campaign');
    await page.getByLabel('Budget').fill('15000');
    await page.getByRole('button', { name: 'Save' }).click();

    // Step 4: Playwright auto-waits for the assertion to become true
    // No sleep() needed — it retries until visible or timeout
    await expect(page.getByText('Playwright Test Campaign')).toBeVisible();

    // Step 5: Clean up — delete the campaign to keep tests independent
    await page.getByRole('row', { name: 'Playwright Test Campaign' })
      .getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Step 6: Assert the campaign is gone
    await expect(page.getByText('Playwright Test Campaign')).not.toBeVisible();
  });

  test('shows validation error for empty campaign name', async ({ page }) => {
    await page.getByRole('button', { name: 'New Campaign' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('alert')).toContainText('Name is required');
  });
});
```

**Common pitfalls:**

- Using fragile CSS selectors or XPath expressions that break whenever the UI structure changes.
- Writing tests that depend on a specific execution order. Each test should be independent and able to run in isolation.
- Not using Playwright's built-in assertion methods (`expect(locator).toBeVisible()`, `expect(locator).toHaveText(...)`) which include auto-waiting, and instead using manual waits or raw JavaScript assertions.

---

## Test Automation University – Structured Learning for Test Automation

Test Automation University (TAU) is a free learning platform by Applitools that offers structured courses on test automation across multiple tools, languages, and frameworks. Courses are taught by recognised experts in the testing community and cover topics from beginner automation concepts to advanced patterns like visual testing and AI-assisted testing.

The platform is organised into learning paths. The Web UI testing paths cover tools like Selenium, Cypress, and Playwright. The API testing paths cover REST Assured, Postman, and other tools. There are also paths for mobile testing, CI/CD integration, and programming fundamentals for testers. Each course includes video lessons, quizzes, and hands-on exercises.

TAU is particularly valuable for QA engineers who need to build or strengthen their programming skills in the context of testing. The courses bridge the gap between generic programming tutorials and real-world test automation by teaching concepts through the lens of testing problems.

**Why it matters:** Structured, high-quality learning resources accelerate skill development and prevent the gaps that come from ad-hoc learning. TAU provides a curated path through the test automation landscape, taught by practitioners who understand the challenges testers face.

**Key things to understand:**

- Start with the fundamentals courses (Java or JavaScript/Python for testers) if you are not yet comfortable writing code. Automation frameworks assume programming proficiency.
- The courses on test design patterns (Page Object Model, Screenplay Pattern) teach you how to write maintainable, scalable test code rather than just functional test scripts.
- Visual testing courses introduce the concept of using screenshots and image comparison to detect UI regressions that functional assertions miss.
- Each course awards a certificate upon completion, which helps you track your progress and demonstrate your commitment to continuous learning.

**Code walkthrough:**

```javascript
// Step 1: Why the Page Object Model — it separates locator logic from test logic
// When the UI changes, you update ONE page object, not dozens of tests
export class CampaignPage {
  constructor(page) {
    this.page = page;
    // Step 2: Define locators once — all tests reference these
    this.nameInput = page.getByLabel('Campaign name');
    this.budgetInput = page.getByLabel('Budget');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.campaignTable = page.getByRole('table');
  }

  // Step 3: Encapsulate multi-step actions as methods
  // Tests read like business operations, not DOM manipulations
  async createCampaign(name, budget) {
    await this.page.getByRole('button', { name: 'New Campaign' }).click();
    await this.nameInput.fill(name);
    await this.budgetInput.fill(String(budget));
    await this.saveButton.click();
  }

  async getCampaignRow(name) {
    return this.campaignTable.getByRole('row', { name });
  }
}

// Step 4: Tests become concise and business-focused
import { test, expect } from '@playwright/test';

test('create a campaign via page object', async ({ page }) => {
  await page.goto('/campaigns');
  const campaignPage = new CampaignPage(page);

  await campaignPage.createCampaign('Q4 Retargeting', 25000);

  // Step 5: Assertions are clear — what the user should see
  const row = await campaignPage.getCampaignRow('Q4 Retargeting');
  await expect(row).toBeVisible();
});
```

**Common pitfalls:**

- Watching courses passively without writing code along with the exercises. Active practice is essential for skill retention.
- Jumping to advanced courses before completing the prerequisites, leading to confusion and frustration.
- Focusing only on one tool (e.g., Selenium) when the industry is moving toward modern alternatives like Playwright and Cypress.

---

## API Testing with Postman – Testing Services Directly

API testing involves sending HTTP requests directly to an application's backend services and validating the responses, without going through the user interface. Postman is one of the most widely used tools for this purpose. It provides a graphical interface for constructing requests, organising them into collections, writing test assertions, and automating test execution.

A Postman collection is a group of related API requests organised into folders. Each request specifies the HTTP method, URL, headers, and body. After executing a request, you write tests in JavaScript that run against the response. Postman's test syntax uses the `pm.test` function with Chai-style assertions: `pm.response.to.have.status(200)`, `pm.expect(jsonData.name).to.eql('Alice')`.

Environment variables and collection variables allow you to parameterise your tests. A base URL, authentication token, or test data ID can be stored as a variable and referenced across all requests in a collection. This makes it easy to run the same tests against different environments (development, staging, production) by switching the active environment.

**Why it matters:** API testing catches defects faster than UI testing because it targets the logic layer directly, without the overhead and fragility of browser interaction. Many critical defects -- incorrect business logic, missing validation, broken authentication -- are most efficiently found at the API level.

**Key things to understand:**

- Pre-request scripts run before a request is sent and can be used to generate dynamic data (timestamps, random values) or retrieve authentication tokens.
- Collection Runner and Newman (the command-line companion to Postman) allow you to run entire collections automatically, which is essential for integrating API tests into a CI/CD pipeline.
- Response time assertions (`pm.expect(pm.response.responseTime).to.be.below(500)`) combine functional and performance validation.
- Postman supports request chaining: the response of one request can be saved to a variable and used as input for the next request, enabling complex multi-step workflows.

**Code walkthrough:**

```javascript
// Step 1: Why API testing with code instead of just Postman — code-based tests
// are version-controllable, CI-runnable, and reviewable in pull requests
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

const API_URL = process.env.API_URL || 'http://localhost:3000';

describe('Campaign API', () => {
  let createdId;

  // Step 2: Create test data in beforeAll, clean up in afterAll
  afterAll(async () => {
    if (createdId) {
      await request(API_URL).delete(`/api/campaigns/${createdId}`);
    }
  });

  it('POST /api/campaigns — creates a campaign', async () => {
    const res = await request(API_URL)
      .post('/api/campaigns')
      .send({ name: 'API Test Campaign', budget: 10000 })
      .expect('Content-Type', /json/)
      .expect(201); // Step 3: Assert the status code FIRST — most important check

    // Step 4: Validate the response body structure, not just status
    expect(res.body).toMatchObject({
      name: 'API Test Campaign',
      budget: 10000,
    });
    expect(res.body.id).toBeDefined();
    createdId = res.body.id;
  });

  it('GET /api/campaigns/:id — returns the created campaign', async () => {
    const res = await request(API_URL)
      .get(`/api/campaigns/${createdId}`)
      .expect(200);

    expect(res.body.name).toBe('API Test Campaign');
  });

  // Step 5: Always test error cases — not just happy paths
  it('POST /api/campaigns — returns 400 for missing name', async () => {
    const res = await request(API_URL)
      .post('/api/campaigns')
      .send({ budget: 5000 })
      .expect(400);

    expect(res.body.error).toContain('name');
  });

  // Step 6: Test response time — combine functional and performance checks
  it('GET /api/campaigns — responds within 500ms', async () => {
    const start = Date.now();
    await request(API_URL).get('/api/campaigns').expect(200);
    expect(Date.now() - start).toBeLessThan(500);
  });
});
```

**Common pitfalls:**

- Testing only the happy path (valid inputs, expected responses) and not testing error cases, edge cases, and boundary values.
- Hardcoding values (URLs, tokens, IDs) instead of using variables, making the tests brittle and environment-specific.
- Not validating the response schema (structure and data types) in addition to specific values, which means structural changes can go undetected.

---

## Cypress – Component and End-to-End Testing

Cypress is a JavaScript-based end-to-end testing framework designed specifically for modern web applications. Unlike Selenium-based tools that control the browser from outside, Cypress runs directly inside the browser alongside the application code. This architecture gives Cypress direct access to the DOM, network requests, and application state, enabling features that external tools cannot easily replicate.

Cypress provides a rich interactive test runner that displays the application alongside the test execution. As each test step runs, you can see the command log, inspect DOM snapshots at each step, and time-travel through the test to see exactly what the application looked like at any point. This visual feedback loop makes writing and debugging tests significantly easier.

The Cypress API is designed to be intuitive. Commands like `cy.visit()`, `cy.get()`, `cy.click()`, `cy.type()`, and `cy.should()` chain together fluently. Cypress automatically waits for elements to exist and become actionable before interacting with them, eliminating most timing-related flakiness.

**Why it matters:** Cypress is widely adopted in JavaScript-heavy teams and provides an excellent developer experience for writing and debugging tests. Understanding Cypress alongside Playwright gives a QA engineer the flexibility to work effectively across different teams and projects.

**Key things to understand:**

- Cypress uses a command queue rather than promises or async/await. Commands are enqueued and executed sequentially, which simplifies the test syntax but means you cannot use standard JavaScript `async/await` with Cypress commands.
- Network interception (`cy.intercept()`) allows you to stub API responses, simulate errors, and test how the application handles various backend scenarios without needing a real backend.
- Cypress supports component testing in addition to end-to-end testing, allowing you to mount and test individual React, Vue, or Angular components in isolation.
- The `.should()` command retries its assertion until it passes or times out, providing built-in resilience against timing issues.

**Code walkthrough:**

```javascript
// Step 1: Why test data factories — they generate consistent, realistic test data
// without hardcoding values that become brittle and hard to maintain
import { faker } from '@faker-js/faker';

// Step 2: Factory function creates valid campaign data with sensible defaults
// Override specific fields when a test needs a particular value
function buildCampaign(overrides = {}) {
  return {
    name: faker.company.catchPhrase(),
    budget: faker.number.int({ min: 1000, max: 100000 }),
    status: 'active',
    startDate: faker.date.future().toISOString().split('T')[0],
    channel: faker.helpers.arrayElement(['email', 'display', 'search', 'social']),
    ...overrides, // Step 3: Spread overrides LAST so tests can set specific values
  };
}

// Step 4: Using the factory in tests — each test gets unique, valid data
import { test, expect } from '@playwright/test';

test('display campaign with high budget shows warning', async ({ page, request }) => {
  // Step 5: Create test data via API before the UI test
  // This is faster and more reliable than creating data through the UI
  const campaign = buildCampaign({ budget: 999999, name: 'High Budget Test' });
  await request.post('/api/campaigns', { data: campaign });

  await page.goto('/campaigns');
  const row = page.getByRole('row', { name: 'High Budget Test' });
  // Step 6: Assert on the specific business behaviour being tested
  await expect(row.getByText('Budget warning')).toBeVisible();
});

test('list shows campaigns in correct channel', async ({ page, request }) => {
  const campaign = buildCampaign({ channel: 'email' });
  await request.post('/api/campaigns', { data: campaign });

  await page.goto('/campaigns?channel=email');
  await expect(page.getByText(campaign.name)).toBeVisible();
});
```

**Common pitfalls:**

- Trying to use `async/await` with Cypress commands, which does not work due to Cypress's command queue architecture.
- Over-relying on `cy.wait(milliseconds)` for timing instead of using Cypress's built-in auto-waiting and assertion retries.
- Not leveraging network interception to isolate the frontend from the backend in tests, making tests dependent on backend availability and data state.

---

## Python for Testers – Scripting and Automation

Python is one of the most accessible and versatile programming languages for QA engineers. Its clear syntax, extensive standard library, and rich ecosystem of testing libraries make it an ideal language for writing test scripts, automating repetitive tasks, processing test data, and building custom testing tools.

For QA engineers, Python is useful in several contexts: writing test automation scripts with frameworks like pytest or Robot Framework, building utilities for test data generation, parsing log files to identify patterns, automating environment setup, and creating custom reporting tools. The book "Automate the Boring Stuff with Python" is an excellent starting point because it focuses on practical automation tasks rather than abstract computer science concepts.

pytest is the most popular Python testing framework. It uses a simple function-based syntax (test functions prefixed with `test_`), powerful fixtures for setup and teardown, and a plugin ecosystem that supports HTML reporting, parallel execution, and integration with CI/CD systems. Understanding pytest is essential for any QA engineer working in a Python environment.

**Why it matters:** Programming proficiency separates a manual tester from a test automation engineer. Python's low barrier to entry and practical power make it the ideal first (or second) language for QA engineers who want to expand into automation, tooling, and data analysis.

**Key things to understand:**

- Python's `requests` library is the standard tool for making HTTP requests in scripts, making it easy to write API tests or automate API interactions outside of Postman.
- List comprehensions, dictionaries, and file I/O operations are the Python features you will use most frequently in QA automation work.
- Virtual environments (`venv`) isolate project dependencies, preventing conflicts between different projects on the same machine.
- The `json` and `csv` modules in Python's standard library make it easy to work with the most common test data formats.

**Code walkthrough:**

```javascript
// Step 1: Why visual regression testing — CSS changes can cascade across
// the entire app. Visual tests catch layout/styling regressions that
// functional assertions completely miss.
import { test, expect } from '@playwright/test';

test.describe('Visual regression — campaign dashboard', () => {
  test('dashboard matches baseline screenshot', async ({ page }) => {
    await page.goto('/campaigns');
    // Step 2: Wait for dynamic content to stabilise before capturing
    await page.waitForLoadState('networkidle');

    // Step 3: toHaveScreenshot compares against a stored baseline image
    // On first run, it creates the baseline. On subsequent runs, it diffs.
    await expect(page).toHaveScreenshot('dashboard.png', {
      // Step 4: maxDiffPixelRatio tolerates minor anti-aliasing differences
      // across platforms. Too tight = false positives; too loose = missed regressions
      maxDiffPixelRatio: 0.01,
    });
  });

  test('campaign card renders consistently', async ({ page }) => {
    await page.goto('/campaigns');
    // Step 5: Component-level screenshots are more precise than full-page
    // When a test fails, you immediately know WHICH component changed
    const card = page.locator('.campaign-card').first();
    await expect(card).toHaveScreenshot('campaign-card.png');
  });

  test('responsive layout at mobile width', async ({ page }) => {
    // Step 6: Test visual regressions at specific viewport sizes
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/campaigns');
    await expect(page).toHaveScreenshot('dashboard-mobile.png');
  });
});
// Step 7: Update baselines when changes are intentional:
// npx playwright test --update-snapshots
```

**Common pitfalls:**

- Writing long, monolithic scripts instead of breaking code into reusable functions and modules.
- Not using version control (Git) for test automation code, making it difficult to collaborate and track changes.
- Ignoring error handling in automation scripts, so a single unexpected condition causes the entire script to crash without useful diagnostic information.

---

## Performance Testing with k6 – Load and Stress Testing

k6 is an open-source load testing tool built for modern development workflows. Unlike older tools that use XML configuration or GUI-based test design, k6 tests are written in JavaScript, making them version-controllable, code-reviewable, and easy to integrate into CI/CD pipelines. k6 is designed to generate high load efficiently and produce clear, actionable metrics.

A k6 test script defines scenarios that simulate user behaviour. The simplest test makes HTTP requests in a loop, with k6 managing the virtual users (VUs) and iteration timing. You configure the number of virtual users, the test duration, and optional stages (ramp-up, steady state, ramp-down) to simulate realistic traffic patterns. k6 collects metrics automatically: response time (min, max, median, p90, p95), request rate, failure rate, and data transfer.

Thresholds are pass/fail criteria that you define in the test script. For example, you might require that the 95th percentile response time is below 500ms and the error rate is below 1%. If any threshold is breached, k6 exits with a non-zero code, making it easy to fail a CI pipeline on performance regression.

**Why it matters:** Performance testing ensures that the application meets its performance requirements under expected and peak load conditions. Without performance testing, performance problems are discovered by real users in production, where they are most expensive and embarrassing to fix.

**Key things to understand:**

- Virtual users (VUs) simulate concurrent users. Each VU executes the test script independently and concurrently. The number of VUs determines the level of concurrency.
- Percentile metrics (p90, p95, p99) are more meaningful than averages for performance testing because averages hide outliers. If the p95 response time is 2 seconds, 5% of users are experiencing 2+ second response times.
- Smoke tests (1-2 VUs for a short duration) verify that the script works correctly. Load tests (expected concurrent users) verify normal performance. Stress tests (beyond expected load) identify the breaking point.
- k6 Cloud and Grafana integration allow you to visualise test results in dashboards and track performance trends across releases.

**Code walkthrough:**

```javascript
// Step 1: Why k6 for performance testing — tests are written in JavaScript,
// version-controlled, and integrate into CI pipelines natively
import http from 'k6/http';
import { check, sleep } from 'k6';

// Step 2: options define the load profile — ramp up, sustain, ramp down
// This simulates realistic traffic patterns, not instant spike
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 virtual users
    { duration: '1m',  target: 20 },  // Hold at 20 VUs for 1 minute
    { duration: '10s', target: 0 },   // Ramp down to 0
  ],
  // Step 3: Thresholds are pass/fail criteria — CI fails if breached
  thresholds: {
    http_req_duration: ['p(95)<500'],   // 95th percentile under 500ms
    http_req_failed: ['rate<0.01'],     // Less than 1% error rate
  },
};

// Step 4: Each VU executes this function repeatedly for the test duration
export default function () {
  const res = http.get('https://api.example.com/campaigns');

  // Step 5: check() validates each response without stopping the test
  // Failed checks are reported in the summary but don't abort the load test
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 300ms': (r) => r.timings.duration < 300,
    'body contains campaigns': (r) => r.json().campaigns !== undefined,
  });

  // Step 6: sleep simulates think time — real users don't fire requests continuously
  sleep(1);
}
```

**Common pitfalls:**

- Running performance tests from a single machine with insufficient resources, bottlenecking the test tool rather than the application under test.
- Not establishing a performance baseline before making changes, making it impossible to determine whether performance has improved or degraded.
- Testing against a development environment that has different hardware, configuration, or data volume than production, producing results that do not reflect real-world performance.

---

## BDD and Gherkin – Bridging Communication with Behaviour-Driven Development

Behaviour-Driven Development (BDD) is a collaborative approach to software development that uses structured natural language to describe the expected behaviour of a system. The goal is to create a shared understanding between business stakeholders, developers, and testers about what the software should do before any code is written.

Gherkin is the language used to write BDD scenarios. It uses a simple, keyword-driven syntax: `Given` (the preconditions), `When` (the action), `Then` (the expected outcome), and optionally `And` and `But` for additional steps. For example: "Given a user is logged in, When they click the delete button on a post, Then the post is removed from their profile." These scenarios serve as both requirements documentation and the basis for automated tests.

Cucumber is the most widely used tool for executing Gherkin scenarios. It maps each step in a scenario to a step definition -- a function in code that performs the action or assertion. This creates a living documentation system where the Gherkin scenarios are both human-readable specifications and executable tests that verify the system's behaviour.

**Why it matters:** BDD addresses one of the most common causes of software defects: misunderstanding between the people who specify what the software should do and the people who build it. Gherkin scenarios provide an unambiguous, testable format for requirements that all stakeholders can read and validate.

**Key things to understand:**

- BDD is fundamentally about collaboration and communication, not about test automation. The scenarios are a byproduct of conversations between product owners, developers, and testers (the "Three Amigos" practice).
- Scenarios should describe business behaviour, not implementation details. "When the user clicks the green submit button in the top-right corner" is too implementation-specific; "When the user submits the form" is better.
- Scenario Outlines allow you to run the same scenario with multiple sets of data, reducing duplication.
- Feature files (`.feature`) should be organised by business capability, not by technical component.

**Code walkthrough:**

```javascript
// Step 1: Why parameterised tests — run the same logic with multiple inputs
// instead of duplicating test code. Also called data-driven testing.
import { test, expect } from '@playwright/test';

// Step 2: Define test data as an array of scenarios
// Each row is a distinct test case with its own input and expected output
const campaignScenarios = [
  { name: 'Email Campaign', budget: 5000, expectedTier: 'Basic' },
  { name: 'Display Campaign', budget: 25000, expectedTier: 'Standard' },
  { name: 'Premium Campaign', budget: 100000, expectedTier: 'Premium' },
  { name: 'Zero Budget', budget: 0, expectedTier: 'Draft' },
];

// Step 3: Loop generates one test per scenario — each runs independently
// If one fails, the others still execute and report their own results
for (const scenario of campaignScenarios) {
  test(`campaign with budget ${scenario.budget} shows tier: ${scenario.expectedTier}`, async ({ page }) => {
    await page.goto('/campaigns/new');
    await page.getByLabel('Name').fill(scenario.name);
    await page.getByLabel('Budget').fill(String(scenario.budget));
    await page.getByRole('button', { name: 'Preview' }).click();

    // Step 4: Assert the expected tier based on the budget input
    await expect(page.getByTestId('budget-tier')).toHaveText(scenario.expectedTier);
  });
}

// Step 5: Jest/Vitest equivalent using it.each — same concept, different syntax
// it.each(campaignScenarios)(
//   'tier for budget $budget is $expectedTier',
//   ({ budget, expectedTier }) => {
//     expect(calculateTier(budget)).toBe(expectedTier);
//   }
// );
```

**Common pitfalls:**

- Using BDD as a test automation framework without the collaborative conversations that are its primary purpose. This produces Gherkin scenarios that are essentially rewritten test scripts with no communication benefit.
- Writing scenarios that are too detailed or too technical, making them unreadable for non-technical stakeholders.
- Creating step definitions that are too specific to one scenario, resulting in a large, unmaintainable library of steps instead of reusable building blocks.

---

## CI/CD Test Integration – Running Tests in the Pipeline

Continuous Integration (CI) is the practice of merging code changes frequently and running automated checks on every merge. Continuous Delivery (CD) extends this by automatically deploying changes that pass all checks to staging or production environments. Integrating tests into the CI/CD pipeline is what transforms testing from a manual gate into an automated quality checkpoint.

In a typical pipeline, tests run at multiple stages. Unit tests run first because they are fastest and catch the most common defects. If they pass, integration tests and API tests run. Finally, end-to-end tests run against a deployed environment. This staged approach provides fast feedback: a broken unit test is caught in seconds, while slower E2E tests only run if the faster tests have already passed.

Most modern CI/CD platforms support pipeline steps that execute test commands, collect results in standard formats (JUnit XML, TRX), and publish them in the build or workflow UI. This makes it easy to see which tests failed and why.

**Why it matters:** Tests that do not run automatically are tests that will eventually be forgotten or skipped. CI/CD integration ensures that every code change is verified by the full test suite, catching regressions before they reach users.

**Key things to understand:**

- Test results should be published in a standard format (JUnit XML is the most widely supported) so the CI/CD platform can display them in its UI and track trends over time.
- Flaky tests (tests that pass and fail intermittently) undermine confidence in the pipeline. Track flaky tests, fix them, and quarantine them if necessary until they are stable.
- Parallel test execution reduces pipeline duration. Most test runners support splitting tests across multiple agents or containers.
- Environment-specific configuration (API URLs, credentials) should be managed through pipeline variables and secrets, not hardcoded in test code.

**Code walkthrough:**

```yaml
# Step 1: Why CI test pipeline — tests that don't run automatically
# are tests that will eventually be forgotten or skipped
# .github/workflows/test.yml (GitHub Actions)
name: Test Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  # Step 2: Unit tests run FIRST — they're fastest and catch the most issues
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:unit -- --coverage
      # Step 3: Upload coverage report as an artifact for review
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # Step 4: E2E tests only run IF unit tests pass — saves CI minutes
  e2e-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      # Step 5: Upload test artifacts on failure — screenshots, traces, videos
      # Without these, debugging CI-only failures is nearly impossible
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
      # Step 6: Publish JUnit XML results for PR status checks
      - uses: dorny/test-reporter@v1
        if: always()
        with:
          name: E2E Results
          path: test-results/*.xml
          reporter: java-junit
```

**Common pitfalls:**

- Running all tests in a single pipeline stage, so a slow E2E test blocks feedback on a simple unit test failure.
- Ignoring intermittently failing tests instead of investigating and fixing them, gradually eroding the team's trust in the test suite.
- Not archiving test artifacts (screenshots, videos, logs) on failure, making it difficult to diagnose why a test failed in the pipeline when it passes locally.

---

## Contract Testing with Pact – Preventing Integration Failures

Contract testing verifies that two services (a consumer and a provider) can communicate correctly by testing each side independently against a shared contract. Pact is the most widely used consumer-driven contract testing tool. It works by having the consumer define a contract (called a pact) that describes the requests it will make and the responses it expects, and then verifying that the provider meets that contract.

The process has two phases. First, the consumer test generates a pact file: the consumer's test code makes requests to a mock provider (provided by Pact) and records the expected interactions. Second, the provider test replays those interactions against the real provider service and verifies that the actual responses match the expected ones. If the provider changes its API in a way that breaks the contract, the provider test fails -- before the change is deployed.

This approach is fundamentally different from traditional integration testing, which requires both services to be running simultaneously. Contract testing runs each side independently, making it faster, more reliable, and easier to integrate into CI/CD pipelines.

**Why it matters:** In a microservices architecture, integration failures between services are one of the most common and costly types of defects. Contract testing catches these failures early, in the individual service's build pipeline, rather than in a shared integration environment where failures are harder to diagnose and attribute.

**Key things to understand:**

- Consumer-driven means the consumer defines the contract based on the interactions it actually needs. This avoids over-specification and keeps the contract focused on real usage.
- Pact Broker is a central server that stores pact files and verification results, enabling consumer and provider teams to work independently while sharing contracts.
- The "can I deploy" check uses Pact Broker data to determine whether a specific version of a service is compatible with all its consumers and providers before deploying.
- Contract testing does not replace functional testing. It verifies the shape and structure of the communication, not the business logic of either service.

**Code walkthrough:**

```javascript
// Step 1: Why integration tests at the API boundary — they verify that
// components work together, catching mismatches that unit tests miss
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { setupTestDatabase, teardownTestDatabase } from './helpers/db';

describe('Campaign API — integration tests', () => {
  let app;

  // Step 2: Start a real server and seed a test database
  // Integration tests use real dependencies, not mocks
  beforeAll(async () => {
    await setupTestDatabase();
    app = (await import('../src/app')).default;
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  it('creates a campaign and retrieves it with correct data', async () => {
    // Step 3: Test the full create-then-read cycle
    const createRes = await request(app)
      .post('/api/campaigns')
      .send({ name: 'Integration Test', budget: 15000, channel: 'email' })
      .expect(201);

    const id = createRes.body.id;

    // Step 4: Verify the data persisted correctly by reading it back
    const getRes = await request(app)
      .get(`/api/campaigns/${id}`)
      .expect(200);

    expect(getRes.body).toMatchObject({
      id,
      name: 'Integration Test',
      budget: 15000,
      channel: 'email',
    });
    // Step 5: Verify computed fields that the database generates
    expect(getRes.body.createdAt).toBeDefined();
  });

  it('enforces unique campaign names at the database level', async () => {
    await request(app)
      .post('/api/campaigns')
      .send({ name: 'Unique Name', budget: 5000 })
      .expect(201);

    // Step 6: Duplicate should fail — tests the DB constraint, not just app logic
    await request(app)
      .post('/api/campaigns')
      .send({ name: 'Unique Name', budget: 8000 })
      .expect(409);
  });
});
```

**Common pitfalls:**

- Writing overly specific contracts that assert on every field in a response, making the contract brittle and the provider unable to add new fields without breaking it.
- Treating contract tests as integration tests and trying to verify business logic through them rather than focusing on the API structure.
- Not running provider verification in the provider's CI pipeline, which defeats the purpose of catching breaking changes early.

---
