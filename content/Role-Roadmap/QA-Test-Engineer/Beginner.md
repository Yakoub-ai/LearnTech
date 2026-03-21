# QA / Test Engineer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the QA / Test Engineer learning path.

---

## QA Roadmap – Orientation and the QA Landscape

Quality Assurance is a discipline that spans the entire software development lifecycle. It is not limited to finding bugs after code is written; it encompasses prevention, detection, and continuous improvement of the processes that produce software. The QA roadmap provides a structured overview of the skills, tools, and concepts a QA engineer needs to master at each stage of their career.

The roadmap covers areas such as testing fundamentals, test design techniques, automation, API testing, performance testing, CI/CD integration, and soft skills like communication and analytical thinking. Having this bird's-eye view early on helps you understand where each skill fits into the broader picture and prevents you from over-investing in one area while neglecting others.

Understanding the full landscape also helps you communicate effectively with developers, product owners, and managers. When you can articulate what you do and why it matters in the context of the whole delivery process, you become a more effective advocate for quality.

**Why it matters:** Without a clear map of the discipline, beginners often dive into automation tools before understanding testing fundamentals, or focus exclusively on manual testing without awareness of the full spectrum. The roadmap prevents these gaps.

**Key things to understand:**

- QA is broader than testing. It includes process improvement, risk analysis, requirements review, and collaboration with the development team to prevent defects.
- Testing is one activity within QA. It involves executing software to find defects and verify that requirements are met.
- QC (quality control) focuses on identifying defects in the finished product, while QA focuses on improving the processes that create the product.
- The QA role varies significantly across organisations. Some teams expect QA engineers to write automation code; others focus on exploratory and manual testing; many expect both.

**Code walkthrough:**

```javascript
// Step 1: Why start with a simple test — understanding the test runner's
// structure (describe/it/expect) is the foundation of all test automation
const { describe, it, expect } = require('@jest/globals');

// Step 2: describe groups related tests — mirrors how you'd organise test cases
// in a test plan: by feature or module
describe('Campaign Budget Calculator', () => {

  // Step 3: Each 'it' block is a single test case with a clear description
  // The description should state the expected behaviour, not the implementation
  it('calculates daily budget from monthly budget', () => {
    const monthlyBudget = 3000;
    const daysInMonth = 30;

    // Step 4: The function under test — keep it isolated from external dependencies
    const dailyBudget = monthlyBudget / daysInMonth;

    // Step 5: expect().toBe() is the simplest assertion
    // toBe uses strict equality (===) — suitable for primitives
    expect(dailyBudget).toBe(100);
  });

  it('returns zero when monthly budget is zero', () => {
    // Step 6: Always test edge cases — zero, negative, boundary values
    // These are where bugs most commonly hide
    expect(0 / 30).toBe(0);
  });

  it('handles division by zero gracefully', () => {
    // Step 7: In JavaScript, division by zero returns Infinity, not an error
    // A good test documents this surprising behaviour
    expect(3000 / 0).toBe(Infinity);
  });
});
```

**Common pitfalls:**

- Skipping fundamentals and jumping directly into learning automation frameworks without understanding what to test or why.
- Treating QA as a purely technical role and neglecting the communication, documentation, and process improvement aspects.
- Assuming QA is only about finding bugs rather than about preventing them through better processes and earlier involvement.

---

## Testing Fundamentals – The Test Pyramid, Test Types, and ISTQB Foundations

The ISTQB (International Software Testing Qualifications Board) Foundation Level syllabus (v4.0, released 2023) is the industry standard body of knowledge for software testing. It defines the vocabulary, principles, and techniques that form the common language of the profession. Even if you never take the certification exam, the syllabus provides a structured foundation that most testing literature and job descriptions assume you know.

The test pyramid is a model that describes the ideal distribution of test types in a software project. At the base are unit tests -- fast, isolated, and numerous. In the middle are integration tests (sometimes called service tests) that verify the interaction between components. At the top are end-to-end (E2E) tests that exercise the full system through its user interface. The pyramid shape reflects the principle that you should have many fast, cheap tests at the bottom and fewer slow, expensive tests at the top.

Testing is broadly divided into functional testing (does the software do what it should?) and non-functional testing (how well does it do it?). Functional testing includes unit testing, integration testing, system testing, and acceptance testing. Non-functional testing includes performance testing, security testing, usability testing, and accessibility testing.

**Why it matters:** These fundamentals are the vocabulary and mental models you will use every day. Understanding the test pyramid prevents you from building a test suite that is slow, brittle, and expensive to maintain. Understanding test types helps you choose the right approach for each situation.

**Key things to understand:**

- The seven testing principles from ISTQB: testing shows the presence of defects (not their absence), exhaustive testing is impossible, early testing saves time and money, defects cluster together, the pesticide paradox (repeating the same tests stops finding new bugs), testing is context-dependent, and the absence-of-errors fallacy.
- Static testing (reviewing code, requirements, and designs without executing them) catches defects earlier and more cheaply than dynamic testing (executing the software).
- Test levels (unit, integration, system, acceptance) correspond to different scopes and objectives. Each level answers a different question about the software.
- Regression testing is the practice of re-running existing tests after changes to ensure that previously working functionality has not been broken.

**Code walkthrough:**

```javascript
// Step 1: Why test pure functions first — they have no side effects,
// no dependencies, and always return the same output for the same input.
// This makes them the easiest and most valuable code to test.
const { describe, it, expect } = require('@jest/globals');

// The function under test: a pure function with clear inputs and outputs
function calculateCTR(clicks, impressions) {
  if (impressions === 0) return 0;
  return parseFloat(((clicks / impressions) * 100).toFixed(2));
}

describe('calculateCTR — Click-Through Rate', () => {
  // Step 2: Happy path — the most common, expected usage
  it('calculates CTR as a percentage', () => {
    expect(calculateCTR(50, 1000)).toBe(5.0);
  });

  // Step 3: Boundary value — test at the edge of valid input
  // Boundary values are where bugs statistically cluster (ISTQB principle)
  it('returns 0 when there are no impressions', () => {
    expect(calculateCTR(10, 0)).toBe(0);
  });

  it('returns 100 when every impression gets a click', () => {
    expect(calculateCTR(500, 500)).toBe(100.0);
  });

  // Step 4: Equivalence partitioning — one representative from each class
  // Low CTR partition, medium CTR partition, high CTR partition
  it('handles fractional results with two decimal places', () => {
    expect(calculateCTR(1, 3)).toBe(33.33); // Fractional partition
  });

  // Step 5: Negative/invalid input — what happens with bad data?
  it('handles zero clicks', () => {
    expect(calculateCTR(0, 1000)).toBe(0);
  });
});
```

**Common pitfalls:**

- Inverting the test pyramid by writing mostly E2E tests and few unit tests, resulting in a slow, fragile test suite that takes hours to run and is expensive to maintain.
- Treating the ISTQB syllabus as purely theoretical without connecting its principles to practical testing decisions.
- Confusing test levels with test types. Test levels describe scope (unit vs. system); test types describe purpose (functional vs. performance).

---

## QA Certification – Hands-On Practice with freeCodeCamp

The freeCodeCamp Quality Assurance certification provides hands-on experience with testing in a real development environment. It covers writing tests with Chai (an assertion library for Node.js), building and testing web applications, and understanding how automated tests validate application behaviour.

The curriculum is structured around projects. You do not just read about testing -- you write tests for real applications and verify your own code. This project-based approach builds practical skills that reading documentation alone cannot provide. The certification covers both functional testing (testing routes and responses in a web application) and unit testing (testing individual functions and modules).

Working through the certification also introduces you to the rhythm of test-driven development: write a test, see it fail, write the code to make it pass, refactor. Even if you do not adopt strict TDD as your daily practice, experiencing this cycle builds intuition about how tests relate to the code they verify.

**Why it matters:** Theoretical knowledge of testing is necessary but not sufficient. You need practice writing tests, interpreting failures, and debugging both the code under test and the tests themselves. The freeCodeCamp certification provides this practice in a structured, guided environment.

**Key things to understand:**

- Assertion libraries like Chai provide methods to express expectations about values: `expect(result).to.equal(5)`, `expect(array).to.have.lengthOf(3)`, `expect(response).to.have.status(200)`.
- Functional tests for web applications typically make HTTP requests to routes and assert on the response status, headers, and body content.
- Test suites are organised into `describe` blocks (grouping related tests) and `it` blocks (individual test cases). This structure makes test output readable and helps locate failures.
- The freeCodeCamp certification requires you to complete projects to earn the credential, reinforcing that QA is a practice-based skill.

**Code walkthrough:**

```javascript
// Step 1: Why async tests — most real-world operations (API calls, DB queries)
// are asynchronous. Tests must await them to verify the actual result.
const { describe, it, expect } = require('@jest/globals');

// Simulates an async API call to fetch campaign data
async function fetchCampaign(id) {
  // In real code this would call an API; here we simulate the delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 'invalid') reject(new Error('Campaign not found'));
      else resolve({ id, name: 'Summer Sale', status: 'active' });
    }, 100);
  });
}

describe('fetchCampaign — async tests', () => {
  // Step 2: Use async/await in the test function to wait for the result
  it('returns campaign data for a valid ID', async () => {
    const campaign = await fetchCampaign('camp-123');

    // Step 3: toEqual performs deep equality — use it for objects and arrays
    // toBe uses strict reference equality and would fail for objects
    expect(campaign).toEqual({
      id: 'camp-123',
      name: 'Summer Sale',
      status: 'active',
    });
  });

  // Step 4: Testing that a function rejects — use .rejects matcher
  it('throws an error for an invalid ID', async () => {
    await expect(fetchCampaign('invalid')).rejects.toThrow('Campaign not found');
  });

  // Step 5: Testing with a timeout — ensure slow operations complete
  it('resolves within 200ms', async () => {
    const start = Date.now();
    await fetchCampaign('camp-456');
    expect(Date.now() - start).toBeLessThan(200);
  });
});
```

**Common pitfalls:**

- Writing assertions that are too vague (e.g., only checking that a response has status 200 without verifying the response body contains the expected data).
- Copying test code without understanding what each assertion checks, which defeats the purpose of learning.
- Skipping the projects and only reading the instructions, missing the hands-on practice that builds real competence.

---

## Manual Testing – Techniques and Exploratory Testing

Manual testing is the practice of executing test cases by a human tester without the aid of automation scripts. It includes both scripted testing (following pre-written test cases step by step) and exploratory testing (simultaneously designing and executing tests based on the tester's understanding of the system).

Scripted manual testing is valuable when you need documented, repeatable verification -- for example, during acceptance testing or when following a regulatory compliance checklist. Each test case specifies preconditions, steps, expected results, and actual results. The tester follows the steps precisely and records whether the outcome matches the expectation.

Exploratory testing is a more creative, investigative approach. The tester uses their knowledge of the system, user behaviour, and common failure patterns to design tests on the fly. Exploratory testing is particularly effective at finding defects that scripted tests miss because they follow unexpected paths through the application. Session-based test management (SBTM) provides structure to exploratory testing by organising it into timed sessions with charters, notes, and debriefs.

**Why it matters:** Even in highly automated environments, manual testing remains essential. Automation verifies what you already know should work; exploratory testing discovers what you did not anticipate. Senior QA engineers rely on exploratory testing to evaluate new features, assess risk, and build understanding of system behaviour.

**Key things to understand:**

- Exploratory testing is not random clicking. It is skilled, intentional investigation guided by heuristics, domain knowledge, and risk awareness.
- Test case design techniques from ISTQB (equivalence partitioning, boundary value analysis, decision tables, state transition testing) apply to both manual and automated testing.
- Equivalence partitioning divides input data into groups (partitions) where the system is expected to behave the same way, and you test one representative from each group.
- Boundary value analysis tests the edges of equivalence partitions, where defects are statistically most likely to occur.

**Code walkthrough:**

```javascript
// Step 1: Why setup and teardown — tests should be independent and repeatable.
// beforeEach/afterEach ensure each test starts from a clean, known state.
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals');

// Simulated in-memory database for testing
let campaignStore = [];

describe('Campaign Store — setup and teardown', () => {
  // Step 2: beforeEach runs BEFORE every test — seeds known test data
  // This guarantees each test starts with the same state
  beforeEach(() => {
    campaignStore = [
      { id: 1, name: 'Email Blast', budget: 5000 },
      { id: 2, name: 'Display Ads', budget: 10000 },
    ];
  });

  // Step 3: afterEach runs AFTER every test — cleans up side effects
  afterEach(() => {
    campaignStore = [];
  });

  it('starts with two campaigns', () => {
    expect(campaignStore).toHaveLength(2);
  });

  it('can add a campaign without affecting other tests', () => {
    campaignStore.push({ id: 3, name: 'Social', budget: 3000 });
    expect(campaignStore).toHaveLength(3);
    // Step 4: Even though we modified the store, beforeEach resets it
    // for the next test — tests are isolated from each other
  });

  it('still has two campaigns because beforeEach reset the store', () => {
    // Step 5: This test proves isolation — the push in the previous test
    // did not leak into this one
    expect(campaignStore).toHaveLength(2);
  });
});
```

**Common pitfalls:**

- Treating manual testing as unskilled work that anyone can do. Effective manual testing requires deep system knowledge, analytical thinking, and creativity.
- Writing test cases that are so detailed they leave no room for the tester to notice unexpected behaviour outside the scripted steps.
- Neglecting to document findings during exploratory testing, making it impossible to reproduce or communicate discovered issues.

---

## Bug Reporting – Clear Communication of Defects

A bug report is the primary communication artifact between a tester and the development team. Its purpose is to convey enough information for a developer to understand, reproduce, and fix a defect efficiently. A poorly written bug report wastes time, causes misunderstandings, and may result in the defect being closed as "cannot reproduce."

A good bug report contains: a clear, descriptive title; the environment (browser, operating system, application version); preconditions (the state the system must be in before the steps); numbered steps to reproduce; the expected result (what should happen); the actual result (what actually happened); severity and priority; and supporting evidence such as screenshots, videos, or log files.

Writing effective bug reports is a skill that distinguishes a strong QA engineer from an average one. The ability to isolate the minimal reproduction steps, identify the relevant environment details, and describe the defect unambiguously saves the development team significant time and builds trust between testers and developers.

**Why it matters:** A defect that cannot be reproduced from the bug report is a defect that will not be fixed. Clear, consistent bug reporting directly impacts how quickly defects are resolved and how effectively the QA team collaborates with development.

**Key things to understand:**

- Severity describes the impact of the defect on the system (critical, major, minor, trivial). Priority describes how urgently it should be fixed. A cosmetic typo on the login page might be low severity but high priority if it is the first thing customers see.
- Minimal reproduction steps are essential. Remove any steps that are not necessary to trigger the defect. The fewer the steps, the easier it is for the developer to isolate the root cause.
- Screenshots and screen recordings are not substitutes for written steps -- they are supplements. Written steps are searchable, version-controllable, and accessible; visual evidence adds clarity.
- Bug reports should describe observed facts, not opinions or assumptions about the root cause. "The save button does not respond when clicked" is better than "I think the event handler is broken."

**Code walkthrough:**

```javascript
// Step 1: Why mocking — tests should be isolated from external dependencies.
// jest.fn() creates a controllable fake that records how it was called.
const { describe, it, expect, jest } = require('@jest/globals');

// Step 2: Mock the entire fetch API — we don't want tests hitting real servers
global.fetch = jest.fn();

async function submitCampaign(name, budget) {
  const response = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, budget }),
  });
  if (!response.ok) throw new Error('Submission failed');
  return response.json();
}

describe('submitCampaign — mocking basics', () => {
  // Step 3: Configure the mock to return a specific response
  // This makes the test deterministic — it always returns the same thing
  it('sends campaign data to the API', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: 'Test', budget: 5000 }),
    });

    const result = await submitCampaign('Test', 5000);

    // Step 4: Verify HOW the mock was called — the request shape matters
    expect(fetch).toHaveBeenCalledWith('/api/campaigns', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ name: 'Test', budget: 5000 }),
    }));

    expect(result).toEqual({ id: 1, name: 'Test', budget: 5000 });
  });

  // Step 5: Test error paths by making the mock return a failure
  it('throws when the API returns an error', async () => {
    fetch.mockResolvedValue({ ok: false, status: 400 });
    await expect(submitCampaign('', 0)).rejects.toThrow('Submission failed');
  });
});
```

**Common pitfalls:**

- Writing vague titles like "Button doesn't work" instead of specific ones like "Save button on user profile page does not submit form when clicked in Firefox 120."
- Including unnecessary steps that obscure the actual reproduction path and make the report harder to follow.
- Mixing multiple defects into a single bug report, making it difficult to track, assign, and verify each one independently.

---

## HTTP for Testers – Understanding Web Communication

HTTP (HyperText Transfer Protocol) is the foundation of communication on the web. Every interaction between a browser and a web server, every API call, and every test that interacts with a web application relies on HTTP. A QA engineer does not need to implement HTTP servers, but must understand how HTTP works to test web applications effectively.

An HTTP request consists of a method (GET, POST, PUT, DELETE, PATCH), a URL (the address of the resource), headers (metadata about the request, such as content type and authentication tokens), and optionally a body (the data being sent, typically in JSON format for APIs). The server responds with a status code, response headers, and a response body.

Status codes are grouped by their first digit: 1xx (informational), 2xx (success), 3xx (redirection), 4xx (client error), and 5xx (server error). The most common codes a tester encounters are 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorised), 403 (Forbidden), 404 (Not Found), and 500 (Internal Server Error). Understanding these codes helps you quickly identify whether a failure is on the client side or the server side.

**Why it matters:** HTTP knowledge is essential for API testing, debugging web application issues, reading network traces in browser developer tools, and understanding error responses. Without it, a tester can observe that something is broken but cannot articulate where or why.

**Key things to understand:**

- GET requests retrieve data and should not modify server state. POST requests create new resources. PUT requests replace a resource entirely. PATCH requests modify part of a resource. DELETE requests remove a resource.
- Headers carry important metadata. `Content-Type` tells the server what format the request body is in. `Authorization` carries authentication credentials. `Accept` tells the server what response format the client expects.
- HTTPS is HTTP over TLS (Transport Layer Security), which encrypts the communication between client and server. All production applications should use HTTPS.
- Cookies are small pieces of data sent by the server and stored by the browser. They are automatically included in subsequent requests to the same domain and are commonly used for session management.

**Code walkthrough:**

```javascript
// Step 1: Why snapshot testing — it captures the "shape" of output
// and alerts you when it changes, catching unintended regressions
const { describe, it, expect } = require('@jest/globals');

function formatCampaignReport(campaign) {
  return {
    title: campaign.name.toUpperCase(),
    summary: `${campaign.impressions.toLocaleString()} impressions, ${campaign.clicks} clicks`,
    ctr: `${((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%`,
    status: campaign.active ? 'ACTIVE' : 'PAUSED',
  };
}

describe('formatCampaignReport — snapshot testing', () => {
  it('matches the expected output structure', () => {
    const report = formatCampaignReport({
      name: 'Summer Sale',
      impressions: 150000,
      clicks: 4500,
      active: true,
    });

    // Step 2: toMatchSnapshot() saves the output on first run
    // On subsequent runs, it compares against the saved snapshot
    // If the output changes, the test FAILS — forcing you to review the change
    expect(report).toMatchSnapshot();

    // Step 3: toMatchInlineSnapshot puts the snapshot right in the test file
    // This is easier to review in code review than a separate .snap file
    expect(report.ctr).toMatchInlineSnapshot(`"3.00%"`);
  });

  // Step 4: When the snapshot changes intentionally (e.g., new field added),
  // run: jest --updateSnapshot (or press 'u' in watch mode)
  // This updates the saved snapshot to match the new output
});
```

**Common pitfalls:**

- Ignoring HTTP status codes during testing and only checking whether the page looks correct visually. A page that renders with a 500 error in the background may appear to work but indicates a serious server-side problem.
- Not understanding the difference between authentication (proving who you are) and authorisation (proving what you are allowed to do), which leads to incomplete security testing.
- Overlooking CORS (Cross-Origin Resource Sharing) errors in the browser console, which indicate that the browser is blocking requests to a different domain for security reasons.

---

## Browser Developer Tools – Inspecting and Debugging

Browser developer tools (DevTools) are built into every modern browser and provide a suite of utilities for inspecting, debugging, and profiling web applications. For a QA engineer, DevTools are an essential daily tool for understanding application behaviour, capturing evidence for bug reports, and verifying that the application works correctly at the network and DOM levels.

The most important panels for a QA engineer are: the Elements panel (inspect and modify the HTML and CSS of a page), the Console panel (view JavaScript errors and log messages), the Network panel (inspect every HTTP request and response made by the page), and the Application panel (inspect cookies, local storage, and session storage).

The Network panel is particularly valuable for QA work. It shows every request the page makes, including the URL, method, status code, response time, and response body. When a feature is not working as expected, the Network panel often reveals the root cause -- a failed API call, an unexpected response, or a missing request that should have been made.

**Why it matters:** DevTools transform a tester from someone who can only describe symptoms ("the page is blank") into someone who can provide root-cause evidence ("the GET request to /api/users returned a 500 with the error message 'database connection timeout'"). This dramatically improves the quality of bug reports and the speed of defect resolution.

**Key things to understand:**

- The Console panel shows JavaScript errors (in red) and warnings (in yellow). These often indicate real bugs even when the page appears to work visually.
- The Network panel can be filtered by request type (XHR/Fetch for API calls, JS for scripts, CSS for stylesheets, Img for images) to focus on relevant traffic.
- The Elements panel allows you to modify HTML and CSS in real time to test visual changes or reproduce layout issues without changing the source code.
- The Responsive Design Mode (device toolbar) lets you simulate different screen sizes and devices, which is essential for testing responsive layouts.

**Code walkthrough:**

```javascript
// Step 1: Why configure test coverage — it shows which lines of code
// your tests execute, revealing untested paths and dead code
// jest.config.js
module.exports = {
  // Step 2: collectCoverageFrom specifies which files to measure
  // Exclude test files, config, and generated code from the metric
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.test.{js,ts}',
    '!src/**/*.spec.{js,ts}',
    '!src/generated/**',
  ],

  // Step 3: coverageThresholds enforce minimum coverage in CI
  // If coverage drops below these numbers, the test run FAILS
  coverageThreshold: {
    global: {
      branches: 70,    // % of if/else paths tested
      functions: 80,   // % of functions called by tests
      lines: 80,       // % of lines executed by tests
      statements: 80,  // % of statements executed
    },
  },

  // Step 4: Coverage reporters — 'text' for terminal, 'html' for a browsable report
  coverageReporters: ['text', 'text-summary', 'html', 'lcov'],

  // Step 5: Run coverage with: npx jest --coverage
  // The HTML report at coverage/index.html lets you click into each file
  // and see exactly which lines are covered (green) and uncovered (red)

  // Step 6: Important — high coverage does NOT mean good tests
  // A test that executes a line without asserting anything meaningful
  // still counts as "covered" but provides zero value
};
```

**Common pitfalls:**

- Forgetting to check the Console panel for JavaScript errors. A page that appears functional may be throwing errors that affect specific user flows.
- Clearing the Network panel accidentally and losing the evidence of a failed request. Use the "Preserve log" option to keep network entries across page navigations.
- Not using the Network panel's timing information to identify slow API calls that degrade user experience, even when the functional behaviour is correct.

---
