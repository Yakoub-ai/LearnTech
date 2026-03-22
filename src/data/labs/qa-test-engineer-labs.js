export const labs = [
  // ============================================================
  // QA-LAB-1: Test Automation Suite (from interactiveLabs.js)
  // ============================================================
  {
    id: 'qa-lab-1',
    roleId: 'qa-test-engineer',
    level: 'beginner',
    title: 'Test Automation Suite',
    description: 'Learn to write unit tests, mock dependencies, and create integration tests for a user service.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Write Unit Tests',
        instruction: 'Write unit tests for a simple calculator module using assertion patterns.',
        starterCode: `// calculator.js — module under test
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// calculator.test.js — write tests
// TODO: Test add with positive numbers, negative numbers, zero
// TODO: Test subtract
// TODO: Test multiply
// TODO: Test divide including the zero case

describe('Calculator', () => {
  describe('add', () => {
    // TODO: Write at least 3 test cases
  });

  describe('divide', () => {
    // TODO: Test normal division and division by zero
  });
});`,
        hints: [
          'Use test() or it() for each test case',
          'expect(add(2, 3)).toBe(5) for simple assertions',
          'Use expect(() => divide(1, 0)).toThrow("Division by zero") for error testing'
        ],
        expectedOutput: `PASS calculator.test.js
  Calculator
    add
      ✓ adds two positive numbers
      ✓ adds negative numbers
      ✓ adds zero
    divide
      ✓ divides evenly
      ✓ returns decimal for non-even division
      ✓ throws on division by zero`,
        solution: `describe('Calculator', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    test('adds negative numbers', () => {
      expect(add(-1, -2)).toBe(-3);
    });
    test('adds zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(subtract(10, 3)).toBe(7);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });
    test('multiplies by zero', () => {
      expect(multiply(4, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides evenly', () => {
      expect(divide(10, 2)).toBe(5);
    });
    test('returns decimal', () => {
      expect(divide(7, 2)).toBe(3.5);
    });
    test('throws on division by zero', () => {
      expect(() => divide(1, 0)).toThrow('Division by zero');
    });
  });
});`
      },
      {
        title: 'Step 2: Mock Dependencies',
        instruction: 'Write tests for a user service that depends on a database. Use mocks to isolate the unit under test.',
        starterCode: `// userService.js
class UserService {
  constructor(database) {
    this.db = database;
  }

  async getUser(id) {
    const user = await this.db.findById(id);
    if (!user) throw new Error('User not found');
    return { ...user, fullName: user.firstName + ' ' + user.lastName };
  }

  async createUser(data) {
    if (!data.email) throw new Error('Email required');
    return await this.db.insert(data);
  }
}

// userService.test.js
// TODO: Create a mock database
// TODO: Test getUser success and not-found cases
// TODO: Test createUser validation and success

describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    // TODO: Set up mock database and service
  });

  // TODO: Write test cases
});`,
        hints: [
          'Create mockDb with jest.fn(): { findById: jest.fn(), insert: jest.fn() }',
          'Use mockDb.findById.mockResolvedValue({...}) to set return values',
          'Use mockDb.findById.mockResolvedValue(null) for the not-found case'
        ],
        expectedOutput: `PASS userService.test.js
  UserService
    getUser
      ✓ returns user with fullName
      ✓ throws when user not found
    createUser
      ✓ creates user successfully
      ✓ throws when email missing`,
        solution: `describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      findById: jest.fn(),
      insert: jest.fn(),
    };
    service = new UserService(mockDb);
  });

  describe('getUser', () => {
    test('returns user with fullName', async () => {
      mockDb.findById.mockResolvedValue({
        id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com'
      });

      const user = await service.getUser(1);
      expect(user.fullName).toBe('John Doe');
      expect(mockDb.findById).toHaveBeenCalledWith(1);
    });

    test('throws when user not found', async () => {
      mockDb.findById.mockResolvedValue(null);
      await expect(service.getUser(99)).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    test('creates user successfully', async () => {
      const userData = { email: 'new@test.com', firstName: 'New' };
      mockDb.insert.mockResolvedValue({ id: 2, ...userData });

      const result = await service.createUser(userData);
      expect(result.id).toBe(2);
      expect(mockDb.insert).toHaveBeenCalledWith(userData);
    });

    test('throws when email missing', async () => {
      await expect(service.createUser({ firstName: 'No Email' }))
        .rejects.toThrow('Email required');
    });
  });
});`
      }
    ]
  },

  // ============================================================
  // QA-LAB-2: Comprehensive Jest Unit Testing (from qa-1)
  // ============================================================
  {
    id: 'qa-lab-2',
    roleId: 'qa-test-engineer',
    level: 'beginner',
    title: 'Comprehensive Jest Unit Testing',
    description: 'Build a full Jest test suite covering pure functions, validation logic, edge cases, and code coverage reporting.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing Jest tests, ensure your QA environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, Jest installed as a dev dependency, and a basic npm project initialized. Complete all setup steps and verify your test runner before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `npx jest --version` to verify Jest is installed',
          'Ensure package.json has "test": "jest" in the scripts section'
        ],
        expectedOutput: `node --version  →  v22.x.x
npx jest --version  →  29.x.x
npm test  →  No tests found (ready to write)`,
        solution: null
      },
      {
        title: 'Step 2: Write Tests for Pure Functions',
        instruction: `Write a Jest test suite for math and string utility functions. WHAT: Unit tests validate a single unit of code in isolation. WHY: Catching bugs at the unit level is 10x cheaper than finding them in production — fast feedback, no side effects, no network. HOW: Use describe() to group related tests, test() or it() for individual cases, and Jest matchers (toBe, toEqual, toThrow) for assertions. Cover the happy path, edge cases, and error conditions.`,
        starterCode: `// utils.js — functions under test
function sum(a, b) {
  return a + b;
}

function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

function slugify(text) {
  // TODO: implement slugify
  // 'Hello World' -> 'hello-world'
}

// utils.test.js
// TODO: Write tests for sum, validateEmail, and slugify

describe('Math functions', () => {
  test('sum should add two numbers correctly', () => {
    // TODO: Test sum(2, 3) === 5 and sum(-1, 1) === 0
  });

  test('sum handles floating point', () => {
    // TODO: Use toBeCloseTo for floating-point assertions
  });
});

describe('Validation functions', () => {
  // TODO: Test validateEmail with valid and invalid emails
  // Valid: 'test@example.com', 'user.name@domain.co.uk'
  // Invalid: 'invalid.email', '@example.com', 'user@', ''
});

describe('slugify', () => {
  // TODO: Test slugify converts spaces, handles uppercase, special chars
});`,
        hints: [
          'For floating point use expect(result).toBeCloseTo(0.3) not toBe(0.3)',
          'Group related assertions: test valid emails in one test, invalid in another',
          'Implement slugify: text.toLowerCase().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "")'
        ],
        expectedOutput: `PASS utils.test.js
  Math functions
    ✓ sum should add two numbers correctly (2ms)
    ✓ sum handles floating point (1ms)
  Validation functions
    ✓ validateEmail should accept valid emails (1ms)
    ✓ validateEmail should reject invalid emails (1ms)
  slugify
    ✓ converts spaces to hyphens (1ms)
    ✓ lowercases input (1ms)
    ✓ removes special characters (1ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total`,
        solution: `function slugify(text) {
  return text.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

describe('Math functions', () => {
  test('sum should add two numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-1, 1)).toBe(0);
  });

  test('sum handles floating point', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe('Validation functions', () => {
  test('validateEmail should accept valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  test('validateEmail should reject invalid emails', () => {
    expect(validateEmail('invalid.email')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('slugify', () => {
  test('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('lowercases input', () => {
    expect(slugify('TypeScript')).toBe('typescript');
  });

  test('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
});`
      },
      {
        title: 'Step 3: Parametrize Tests with test.each',
        instruction: `Eliminate duplicated test cases by using Jest's test.each() for data-driven tests. WHAT: test.each() runs the same test logic against multiple inputs from a table. WHY: Reduces boilerplate, makes adding new cases trivial, and surfaces data-specific failures clearly. HOW: Pass an array of [input, expected] tuples; Jest auto-names each run with the values.`,
        starterCode: `// Add to utils.test.js

// Currently we have repetitive individual tests:
test('validateEmail accepts test@example.com', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});
test('validateEmail accepts user@domain.co.uk', () => {
  expect(validateEmail('user@domain.co.uk')).toBe(true);
});

// TODO: Replace the above with test.each()
// TODO: Also write a test.each for invalid emails
// TODO: Write a test.each for slugify covering 4+ input/output pairs

describe('validateEmail — parametrized', () => {
  test.each([
    // TODO: [email, expected] pairs
  ])('validateEmail(%s) === %s', (email, expected) => {
    // TODO: assertion
  });
});`,
        hints: [
          'Syntax: test.each([[input, expected], ...])("label %s → %s", (a, b) => { ... })',
          'Include both true and false cases in the same table for full coverage',
          'Tagged template literal form also works: test.each`email | expected`'
        ],
        expectedOutput: `PASS utils.test.js
  validateEmail — parametrized
    ✓ validateEmail(test@example.com) === true
    ✓ validateEmail(user@domain.co.uk) === true
    ✓ validateEmail(invalid.email) === false
    ✓ validateEmail(@example.com) === false
    ✓ validateEmail() === false`,
        solution: `describe('validateEmail — parametrized', () => {
  test.each([
    ['test@example.com', true],
    ['user@domain.co.uk', true],
    ['admin+tag@company.io', true],
    ['invalid.email', false],
    ['@example.com', false],
    ['user@', false],
    ['', false],
  ])('validateEmail(%s) === %s', (email, expected) => {
    expect(validateEmail(email)).toBe(expected);
  });
});

describe('slugify — parametrized', () => {
  test.each([
    ['Hello World', 'hello-world'],
    ['TypeScript 5.0', 'typescript-50'],
    ['Hello, World!', 'hello-world'],
    ['already-slugged', 'already-slugged'],
    ['  spaces  ', 'spaces'],
  ])('slugify(%s) === %s', (input, expected) => {
    expect(slugify(input.trim())).toBe(expected);
  });
});`
      },
      {
        title: 'Step 4: Enforce Coverage Thresholds',
        instruction: `Configure Jest to fail the build if code coverage drops below your team's thresholds. WHAT: Coverage thresholds define the minimum % of lines, branches, functions, and statements that must be tested. WHY: Coverage gates prevent regressions from being merged — untested paths are high-risk in production. HOW: Add a coverageThreshold config to jest.config.js and run tests with --coverage. Fix any gaps by adding tests for uncovered branches.`,
        starterCode: `// jest.config.js — configure coverage thresholds
/** @type {import('jest').Config} */
const config = {
  // TODO: Set testEnvironment to 'node'
  // TODO: Enable collectCoverage
  // TODO: Set coverageDirectory to 'coverage'
  // TODO: Add coverageThreshold requiring:
  //   global: branches 80%, functions 90%, lines 85%, statements 85%
  // TODO: Set coveragePathIgnorePatterns to exclude node_modules
};

export default config;

// Then run: npx jest --coverage
// Fix any red lines in the coverage report by adding missing tests`,
        hints: [
          'coverageThreshold: { global: { branches: 80, functions: 90, lines: 85, statements: 85 } }',
          'Run "npx jest --coverage --verbose" to see which lines are uncovered',
          'Look for uncovered "else" branches — those are often missing edge-case tests'
        ],
        expectedOutput: `----------|---------|----------|---------|---------|
File      | % Stmts | % Branch | % Funcs | % Lines |
----------|---------|----------|---------|---------|
utils.js  |   92.31 |    87.50 |  100.00 |   92.31 |
----------|---------|----------|---------|---------|
All files |   92.31 |    87.50 |  100.00 |   92.31 |

Jest: "global" coverage threshold for branches (80%) met.
Jest: "global" coverage threshold for functions (90%) met.
Tests: 12 passed, 12 total`,
        solution: `/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
};

export default config;`
      }
    ]
  },

  // ============================================================
  // QA-LAB-3: Playwright End-to-End Testing (from qa-2)
  // ============================================================
  {
    id: 'qa-lab-3',
    roleId: 'qa-test-engineer',
    level: 'mid',
    title: 'Playwright End-to-End Testing',
    description: 'Build a full Playwright E2E test suite covering login flows, session persistence, accessibility, and CI pipeline integration.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing Playwright tests, ensure your QA environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, @playwright/test installed, browser binaries downloaded via `npx playwright install`, and a sample app running at localhost:3000. Complete all setup steps and verify Playwright before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `npx playwright --version` to verify installation',
          'Run `npx playwright install` to download browser binaries (Chromium, Firefox, WebKit)'
        ],
        expectedOutput: `npx playwright --version  →  Version 1.x.x
npx playwright install    →  Downloading Chromium... done
Sample app running at http://localhost:3000`,
        solution: null
      },
      {
        title: 'Step 2: Write the Login Flow Tests',
        instruction: `Write Playwright tests for a login page covering the happy path, invalid credentials, and form validation. WHAT: E2E tests drive a real browser against your running application. WHY: They catch integration bugs that unit tests cannot — broken API calls, missing CSS selectors, incorrect redirects. HOW: Use page.fill() to enter text, page.click() to interact, and expect(page).toHaveURL() / expect(locator).toBeVisible() to assert outcomes. Always use beforeEach() to navigate to the starting URL.`,
        starterCode: `import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Navigate to the login page
  });

  test('should login with valid credentials', async ({ page }) => {
    // TODO: Fill email and password fields
    // TODO: Click submit button
    // TODO: Assert URL matches /dashboard
    // TODO: Assert welcome message is visible
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // TODO: Fill with wrong credentials
    // TODO: Submit
    // TODO: Assert error message 'Invalid credentials' is visible
  });

  test('should require email field', async ({ page }) => {
    // TODO: Submit form without filling email
    // TODO: Assert HTML5 validation or custom error appears
  });
});`,
        hints: [
          'Use page.fill(\'input[name="email"]\', \'user@example.com\') to fill inputs',
          'await expect(page).toHaveURL(/\\/dashboard/) checks the current URL with a regex',
          'await expect(page.locator(\'text=Invalid credentials\')).toBeVisible() checks element visibility'
        ],
        expectedOutput: `Running 3 tests using 1 worker

  ✓ Login Flow › should login with valid credentials (1.2s)
  ✓ Login Flow › should show error with invalid credentials (0.8s)
  ✓ Login Flow › should require email field (0.5s)

  3 passed (3.1s)`,
        solution: `import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\\/dashboard/);
    await expect(page.locator('text=Welcome User')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should require email field', async ({ page }) => {
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // HTML5 validation prevents submit; URL should not change
    await expect(page).toHaveURL(/\\/login/);
  });
});`
      },
      {
        title: 'Step 3: Test Session Persistence and Multi-Tab Behaviour',
        instruction: `Test that a login session persists across new browser tabs using Playwright's shared browser context. WHAT: A browser context is an isolated session (cookies, localStorage) shared across multiple pages. WHY: Session bugs — where navigation in a new tab logs users out — are invisible to single-page tests and extremely costly if missed. HOW: Use context.newPage() to open a second tab in the same context, then navigate to a protected route and assert the user is still authenticated.`,
        starterCode: `import { test, expect } from '@playwright/test';

test.describe('Session Persistence', () => {
  test('should persist login session across new tabs', async ({ page, context }) => {
    // Step 1: Log in on the main page
    await page.goto('http://localhost:3000/login');
    // TODO: Fill credentials and submit

    // Step 2: Wait for redirect to dashboard
    // TODO: waitForURL with /dashboard pattern

    // Step 3: Open a new tab in the SAME browser context
    // TODO: const newPage = await context.newPage();

    // Step 4: Navigate the new tab to a protected route
    // TODO: Navigate newPage to /dashboard

    // Step 5: Assert the new tab did not redirect to /login
    // TODO: Check URL is still /dashboard (not /login)
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    // TODO: Navigate directly to /dashboard without logging in
    // TODO: Assert redirected to /login
  });
});`,
        hints: [
          'await page.waitForURL(/\\/dashboard/) blocks until navigation completes',
          'const newPage = await context.newPage() — this shares cookies with the original page',
          'To test logged-out state, use a fresh page fixture (no prior login in beforeEach)'
        ],
        expectedOutput: `Running 2 tests using 1 worker

  ✓ Session Persistence › should persist login session across new tabs (2.1s)
  ✓ Session Persistence › should redirect unauthenticated users to login (0.6s)

  2 passed (2.8s)`,
        solution: `import { test, expect } from '@playwright/test';

test.describe('Session Persistence', () => {
  test('should persist login session across new tabs', async ({ page, context }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\\/dashboard/);

    const newPage = await context.newPage();
    await newPage.goto('http://localhost:3000/dashboard');
    await expect(newPage).toHaveURL(/\\/dashboard/);
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page).toHaveURL(/\\/login/);
  });
});`
      },
      {
        title: 'Step 4: Add CI Configuration with GitHub Actions',
        instruction: `Configure Playwright to run in CI/CD with GitHub Actions. WHAT: CI pipelines run your E2E tests on every pull request against multiple browsers. WHY: Without CI, E2E tests only catch regressions when developers remember to run them locally — bugs ship to production. HOW: Create a .github/workflows/e2e.yml that installs dependencies, starts your dev server, and runs Playwright against Chromium and Firefox. Use Playwright's built-in reporter for artifact upload.`,
        starterCode: `# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # TODO: Add checkout step
      # TODO: Add Node.js setup step (version 22)
      # TODO: Install npm dependencies
      # TODO: Install Playwright browsers (with system deps)
      # TODO: Start the application server in the background
      # TODO: Wait for server to be ready
      # TODO: Run Playwright tests
      # TODO: Upload test report as artifact on failure

# playwright.config.ts — add these CI-specific settings:
# - reporter: process.env.CI ? 'github' : 'html'
# - retries: process.env.CI ? 2 : 0
# - forbidOnly: !!process.env.CI  (prevents test.only from blocking CI)`,
        hints: [
          'Use actions/checkout@v4 and actions/setup-node@v4 for the first two steps',
          'npx playwright install --with-deps installs browsers + OS-level dependencies',
          'Use actions/upload-artifact@v4 to save the playwright-report/ folder on failure'
        ],
        expectedOutput: `GitHub Actions run — E2E Tests:

  ✓ Set up Node.js 22
  ✓ Install dependencies
  ✓ Install Playwright Browsers
  ✓ Start dev server
  ✓ Run Playwright tests
      Running 5 tests using 2 workers
      5 passed (12.3s)
  ✓ Upload report (skipped — all tests passed)`,
        solution: `# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Start dev server
        run: npm run dev &

      - name: Wait for server
        run: npx wait-on http://localhost:3000 --timeout 30000

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

# playwright.config.ts additions:
# reporter: process.env.CI ? 'github' : 'html',
# retries: process.env.CI ? 2 : 0,
# forbidOnly: !!process.env.CI,`
      }
    ]
  },

  // ============================================================
  // QA-LAB-4: k6 Performance and Load Testing (from qa-3)
  // ============================================================
  {
    id: 'qa-lab-4',
    roleId: 'qa-test-engineer',
    level: 'senior',
    title: 'k6 Performance and Load Testing',
    description: 'Design and run realistic load tests with k6: ramp-up stages, custom metrics, thresholds, and performance budgets integrated with CI.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running load tests, ensure your QA environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, k6 installed (npm install --save-dev k6 or via Homebrew), and a target API or test server to load. Complete all setup steps and verify k6 before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `npx k6 --version` to verify k6 is installed',
          'Use https://httpbin.org/get as a safe public target for practice runs'
        ],
        expectedOutput: `npx k6 --version  →  k6 v0.x.x (go1.xx.x)
k6 can also be installed globally: brew install k6`,
        solution: null
      },
      {
        title: 'Step 2: Write a Staged Load Test with Custom Metrics',
        instruction: `Build a k6 load test with realistic ramp-up stages and custom metrics. WHAT: Load tests simulate concurrent users over time — ramp up, sustain, then ramp down. WHY: Performance regressions are invisible until they hit production traffic. A 300ms p95 target broken by a new database query can crash your service. HOW: Use stages to define virtual user counts over time, Rate and Trend metrics for granular tracking, and group() to namespace related requests.`,
        starterCode: `import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// TODO: Create custom metrics
// - errorRate: tracks request failure rate (Rate)
// - responseTimes: tracks per-endpoint latency (Trend)

// TODO: Configure stages:
// Stage 1: ramp from 0 to 20 VUs over 30s
// Stage 2: hold at 100 VUs for 90s
// Stage 3: ramp down to 0 over 30s

// TODO: Add thresholds:
// - p(95) of http_req_duration < 500ms
// - p(99) of http_req_duration < 1000ms
// - errors rate < 10%

export const options = {
  // TODO: stages array
  // TODO: thresholds object
};

export default function () {
  group('User Flow', () => {
    // TODO: GET /users endpoint
    // TODO: check() for status 200 and response time < 500ms
    // TODO: add to errorRate and responseTimes
    // TODO: sleep(1)

    // TODO: POST /login with credentials
    // TODO: sleep(2)
  });
}`,
        hints: [
          'const errorRate = new Rate("errors"); const responseTimes = new Trend("response_times");',
          'check() returns true/false — negate and add to errorRate: check(...) || errorRate.add(1)',
          'responseTimes.add(res.timings.duration) records per-request latency'
        ],
        expectedOutput: `k6 run test.js

  scenarios: (100.00%) 1 scenario, 100 max VUs, 3m30s max duration

  ✓ status is 200
  ✓ response time < 500ms

  checks.........................: 97.34%  ✓ 4867  ✗ 133
  data_received..................: 2.1 MB  10 kB/s
  http_req_duration..............: avg=145ms  p(95)=421ms  p(99)=891ms
  errors.........................: 1.33%   ✓ threshold met (< 10%)

  ✓ 3 thresholds met`,
        solution: `import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const responseTimes = new Trend('response_times');

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 100 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.1']
  }
};

export default function () {
  group('User Flow', () => {
    const res = http.get('https://api.example.com/users');

    check(res, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500
    }) || errorRate.add(1);

    responseTimes.add(res.timings.duration);
    sleep(1);

    http.post('https://api.example.com/login', {
      username: 'user@example.com',
      password: 'password123'
    });
    sleep(2);
  });
}`
      },
      {
        title: 'Step 3: Add Scenario-Based Load Profiles',
        instruction: `Model real user behaviour by defining named k6 scenarios with different executors. WHAT: Scenarios let you run different load shapes simultaneously — constant VUs for background noise, ramping arrival rate for a traffic spike, and a single VU smoke test for baseline. WHY: Real traffic is not uniform. Simulating mixed workloads exposes contention between endpoints that single-scenario tests miss. HOW: Use the scenarios key in options with executors: constant-vus, ramping-arrival-rate, or per-vu-iterations.`,
        starterCode: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    // TODO: 'smoke' — 1 VU, 1 iteration, verify baseline
    smoke: {
      // executor: 'per-vu-iterations'
      // vus: 1, iterations: 1, maxDuration: '30s'
    },

    // TODO: 'average_load' — 10 VUs for 2 minutes (constant-vus)
    average_load: {
      // executor: 'constant-vus'
      // startTime: '10s' (start after smoke)
    },

    // TODO: 'spike' — ramp arrival rate from 0 to 100 req/s over 30s
    spike: {
      // executor: 'ramping-arrival-rate'
      // preAllocatedVUs: 50
    }
  }
};

export default function () {
  // TODO: Request the /api/health endpoint
  // TODO: check for status 200
  // TODO: sleep(1)
}`,
        hints: [
          'Each scenario needs: executor, and executor-specific options (vus, duration, stages, etc.)',
          'startTime staggers scenarios; without it they all start simultaneously',
          'ramping-arrival-rate needs preAllocatedVUs and stages with target (requests/s)'
        ],
        expectedOutput: `k6 run scenarios.js

  scenarios: (100.00%) 3 scenarios, 51 max VUs
    smoke: 1 VU, 1 iteration
    average_load: 10 VUs, 2m duration (start: 10s)
    spike: ramping arrival rate 0→100 req/s, 30s

  ✓ status is 200
  http_req_duration: avg=98ms p(95)=310ms
  iterations: 1842`,
        solution: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    smoke: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '30s',
    },
    average_load: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      startTime: '10s',
    },
    spike: {
      executor: 'ramping-arrival-rate',
      startTime: '30s',
      preAllocatedVUs: 50,
      stages: [
        { target: 0, duration: '0s' },
        { target: 100, duration: '30s' },
        { target: 0, duration: '10s' },
      ],
    },
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}`
      },
      {
        title: 'Step 4: Integrate Performance Tests into CI',
        instruction: `Add k6 performance tests to your CI pipeline with pass/fail gates based on thresholds. WHAT: A CI performance gate runs a short smoke test on every PR and a full load test nightly. WHY: Without automated gates, performance regressions merge silently. A 5-second API response is invisible in code review. HOW: Configure k6 thresholds so that breaches exit with a non-zero status (k6 does this by default), then use GitHub Actions to run the test and block the PR if it fails.`,
        starterCode: `# .github/workflows/performance.yml
name: Performance Tests

on:
  # TODO: Run a smoke test on every pull_request
  # TODO: Run a full load test on schedule (nightly at 2am UTC)

jobs:
  smoke-test:
    runs-on: ubuntu-latest
    # TODO: Only run on pull_request event
    steps:
      # TODO: checkout
      # TODO: Install k6 (use grafana/k6-action or apt-get install k6)
      # TODO: Start dev server
      # TODO: Run k6 with --vus 1 --duration 30s and --out json=results.json
      # TODO: Upload results.json as artifact

  load-test:
    runs-on: ubuntu-latest
    # TODO: Only run on schedule event
    steps:
      # TODO: Same setup, but run full staged test script
      # TODO: Upload k6 HTML report

# k6 smoke script: k6 run --vus 1 --duration 30s --threshold 'http_req_duration<500' test.js`,
        hints: [
          'Use "if: github.event_name == \'pull_request\'" to conditionally run a job',
          'grafana/k6-action@v0.3 is the official GitHub Action for k6',
          'k6 exits with code 99 when thresholds fail — CI detects this as a failed step'
        ],
        expectedOutput: `GitHub Actions — Performance Tests (PR):

  ✓ Install k6
  ✓ Start dev server
  ✓ Run k6 smoke test (1 VU, 30s)
      http_req_duration: avg=87ms p(95)=201ms
      ✓ threshold met: p(95)<500ms
  ✓ Upload results

PR check: PASSED — performance within budget`,
        solution: `# .github/workflows/performance.yml
name: Performance Tests

on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # nightly at 2am UTC

jobs:
  smoke-test:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install k6
        run: |
          sudo gpg -k
          sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
          echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update && sudo apt-get install k6

      - name: Start dev server
        run: npm ci && npm run dev &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run k6 smoke test
        run: k6 run --vus 1 --duration 30s --out json=results.json k6/smoke.js

      - uses: actions/upload-artifact@v4
        with:
          name: k6-smoke-results
          path: results.json

  load-test:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install k6
        run: sudo apt-get install k6
      - name: Run full load test
        run: k6 run --out json=load-results.json k6/load.js
      - uses: actions/upload-artifact@v4
        with:
          name: k6-load-results
          path: load-results.json`
      }
    ]
  },

  // ============================================================
  // QA-LAB-5: API Contract Testing (from qa-4)
  // ============================================================
  {
    id: 'qa-lab-5',
    roleId: 'qa-test-engineer',
    level: 'mid',
    title: 'API Contract Testing with JSON Schema',
    description: 'Validate REST API responses against JSON Schema contracts, covering status codes, headers, response shape, and consumer-driven contract testing patterns.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running API contract tests, ensure your QA environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, axios and ajv installed as dev dependencies, and a target REST API (local or staging). Complete all setup steps and verify your API is reachable before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `npm install --save-dev axios ajv` to install dependencies',
          'Test connectivity: curl http://localhost:8000/api/users'
        ],
        expectedOutput: `npm install --save-dev axios ajv  →  added 2 packages
curl http://localhost:8000/api/users  →  {"data":[],"pagination":{...}}`,
        solution: null
      },
      {
        title: 'Step 2: Define JSON Schema Contracts',
        instruction: `Write JSON Schema definitions that act as a formal contract for your API responses. WHAT: A JSON Schema contract defines the exact shape, types, and constraints an API response must satisfy. WHY: Without contracts, breaking API changes (renaming fields, changing types) go undetected until a consumer crashes in production. HOW: Use JSON Schema's type, required, properties, and format keywords. Compile with Ajv and validate response.data to surface every schema violation at once.`,
        starterCode: `const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // Enables 'email' and 'date-time' formats

// TODO: Define userSchema
// Required fields: id (integer >= 1), name (string, minLength 1),
//                  email (string, format 'email'), created_at (string, format 'date-time')
// Optional: role (string, enum ['admin', 'user', 'viewer'])
// additionalProperties: false (strict mode)
const userSchema = {
  // TODO
};

// TODO: Define userListSchema
// Required: data (array of userSchema), pagination (object with page, per_page, total)
const userListSchema = {
  // TODO
};

// Validate a sample response against the schema
const sampleUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  created_at: '2025-01-15T10:30:00Z',
  role: 'admin'
};

const validate = ajv.compile(userSchema);
const valid = validate(sampleUser);
console.log('Valid:', valid);
if (!valid) console.log('Errors:', validate.errors);`,
        hints: [
          'JSON Schema type "integer" for whole numbers; "number" allows decimals',
          'additionalProperties: false rejects any field not declared in properties',
          'Use $ref or inline items: userSchema inside userListSchema\'s data array'
        ],
        expectedOutput: `Valid: true
(no errors)

// Testing with a bad sample (missing email):
Valid: false
Errors: [ { instancePath: '', message: "must have required property 'email'" } ]`,
        solution: `const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email', 'created_at'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    created_at: { type: 'string', format: 'date-time' },
    role: { type: 'string', enum: ['admin', 'user', 'viewer'] }
  },
  additionalProperties: false
};

const userListSchema = {
  type: 'object',
  required: ['data', 'pagination'],
  properties: {
    data: { type: 'array', items: userSchema },
    pagination: {
      type: 'object',
      required: ['page', 'per_page', 'total'],
      properties: {
        page: { type: 'integer', minimum: 1 },
        per_page: { type: 'integer', minimum: 1 },
        total: { type: 'integer', minimum: 0 }
      }
    }
  }
};

const sampleUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  created_at: '2025-01-15T10:30:00Z',
  role: 'admin'
};

const validate = ajv.compile(userSchema);
const valid = validate(sampleUser);
console.log('Valid:', valid);
if (!valid) console.log('Errors:', validate.errors);`
      },
      {
        title: 'Step 3: Build the Contract Test Runner',
        instruction: `Implement a reusable contract test runner that checks status codes, headers, and response schemas. WHAT: A contract test runner makes HTTP requests and validates the response against your schema contracts from Step 2. WHY: Running contracts against a real API (not mocks) catches drift between what the team documents and what the server actually returns. HOW: Use axios with validateStatus: () => true so non-2xx responses do not throw, then check status, headers, and schema independently to surface all violations in one run.`,
        starterCode: `const axios = require('axios');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const BASE_URL = 'http://localhost:8000/api';

// TODO: Implement contractTest(name, { method, path, expectedStatus, schema, headers })
// - Make the HTTP request (don't throw on non-2xx)
// - Compare response.status to expectedStatus
// - Check each required header
// - Validate response.data against schema using Ajv
// - Log [PASS] or [FAIL] with error details
// - Return boolean

async function contractTest(name, options) {
  // TODO
}

// TODO: Implement runSuite() that runs all 4 tests in parallel:
// 1. GET /users — status 200, userListSchema, content-type: application/json
// 2. GET /users/1 — status 200, userSchema
// 3. GET /users/99999 — status 404, no schema
// 4. POST /users (no body) — status 422, no schema

async function runSuite() {
  // TODO
}

runSuite();`,
        hints: [
          'axios({ method, url, validateStatus: () => true }) — never throws, always resolves',
          'response.headers keys are lowercase: "content-type", not "Content-Type"',
          'Promise.all([...contractTests]) runs all in parallel and waits for all results'
        ],
        expectedOutput: `API Contract Tests
==================================================
[PASS] GET /users returns paginated list
[PASS] GET /users/1 returns a single user
[PASS] GET /users/99999 returns 404
[PASS] POST /users without body returns 422

4/4 contract tests passed`,
        solution: `const axios = require('axios');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const BASE_URL = 'http://localhost:8000/api';

async function contractTest(name, { method, path, expectedStatus, schema, headers }) {
  try {
    const response = await axios({
      method,
      url: BASE_URL + path,
      validateStatus: () => true
    });

    const errors = [];

    if (response.status !== expectedStatus) {
      errors.push(\`Status: expected \${expectedStatus}, got \${response.status}\`);
    }

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        if (response.headers[key.toLowerCase()] !== value) {
          errors.push(\`Header \${key}: expected "\${value}", got "\${response.headers[key.toLowerCase()]}"\`);
        }
      }
    }

    if (schema) {
      const validate = ajv.compile(schema);
      const valid = validate(response.data);
      if (!valid) {
        validate.errors.forEach(err => {
          errors.push(\`Schema: \${err.instancePath} \${err.message}\`);
        });
      }
    }

    const status = errors.length === 0 ? 'PASS' : 'FAIL';
    console.log(\`[\${status}] \${name}\`);
    errors.forEach(e => console.log(\`        \${e}\`));
    return errors.length === 0;

  } catch (err) {
    console.log(\`[ERROR] \${name}: \${err.message}\`);
    return false;
  }
}

async function runSuite() {
  console.log('API Contract Tests\\n' + '='.repeat(50));

  const results = await Promise.all([
    contractTest('GET /users returns paginated list', {
      method: 'GET', path: '/users', expectedStatus: 200,
      schema: userListSchema, headers: { 'content-type': 'application/json' }
    }),
    contractTest('GET /users/1 returns a single user', {
      method: 'GET', path: '/users/1', expectedStatus: 200, schema: userSchema
    }),
    contractTest('GET /users/99999 returns 404', {
      method: 'GET', path: '/users/99999', expectedStatus: 404, schema: null
    }),
    contractTest('POST /users without body returns 422', {
      method: 'POST', path: '/users', expectedStatus: 422, schema: null
    })
  ]);

  const passed = results.filter(Boolean).length;
  console.log(\`\\n\${passed}/\${results.length} contract tests passed\`);
}

runSuite();`
      },
      {
        title: 'Step 4: Extend with PUT and Authentication Tests',
        instruction: `Add contract tests for mutating endpoints (PUT) and authenticated routes. WHAT: PUT endpoints accept a request body and return the updated resource — both the request shape and response shape need validation. Authentication tests verify that protected endpoints reject requests without credentials. WHY: Create/update paths have higher bug density than read paths, and auth failures in production are security incidents. HOW: Pass a data payload to axios for PUT, and test 401 responses for missing/invalid Bearer tokens.`,
        starterCode: `// Extend contractTest to support request body and auth headers:

// TODO: Add 'body' and 'auth' options to contractTest
// - If body is provided, pass it as axios data
// - If auth is 'bearer', add Authorization: Bearer <token> header

// TODO: Add these 3 new tests to runSuite():

// Test 5: PUT /users/1 with valid payload
// - Send: { name: 'Alice Updated', email: 'alice.updated@example.com' }
// - Expect: status 200, response matches userSchema

// Test 6: DELETE /users/1 with valid auth
// - Expect: status 204, no response body to validate

// Test 7: GET /admin/users without auth token
// - Expect: status 401
// - Verify response has 'error' field in body

// BONUS: Test that the PUT response id matches the one you sent (id: 1)
// Hint: add a custom 'assertions' callback option to contractTest`,
        hints: [
          'Pass the token in headers: { Authorization: "Bearer test-token-123" }',
          'Status 204 means no response body — skip schema validation for DELETE',
          'For id matching, add an optional assertions: (data) => { ... } callback to contractTest'
        ],
        expectedOutput: `API Contract Tests
==================================================
[PASS] GET /users returns paginated list
[PASS] GET /users/1 returns a single user
[PASS] GET /users/99999 returns 404
[PASS] POST /users without body returns 422
[PASS] PUT /users/1 updates and returns user
[PASS] DELETE /users/1 returns 204
[PASS] GET /admin/users without auth returns 401

7/7 contract tests passed`,
        solution: `async function contractTest(name, { method, path, expectedStatus, schema, headers, body, auth, assertions }) {
  try {
    const requestHeaders = { ...headers };
    if (auth === 'bearer') {
      requestHeaders['Authorization'] = 'Bearer test-token-123';
    }

    const response = await axios({
      method,
      url: BASE_URL + path,
      data: body,
      headers: requestHeaders,
      validateStatus: () => true
    });

    const errors = [];

    if (response.status !== expectedStatus) {
      errors.push(\`Status: expected \${expectedStatus}, got \${response.status}\`);
    }

    if (schema && response.data) {
      const validate = ajv.compile(schema);
      if (!validate(response.data)) {
        validate.errors.forEach(err =>
          errors.push(\`Schema: \${err.instancePath} \${err.message}\`)
        );
      }
    }

    if (assertions && errors.length === 0) {
      try {
        assertions(response.data);
      } catch (e) {
        errors.push(\`Assertion: \${e.message}\`);
      }
    }

    const status = errors.length === 0 ? 'PASS' : 'FAIL';
    console.log(\`[\${status}] \${name}\`);
    errors.forEach(e => console.log(\`        \${e}\`));
    return errors.length === 0;

  } catch (err) {
    console.log(\`[ERROR] \${name}: \${err.message}\`);
    return false;
  }
}

// Additional tests:
contractTest('PUT /users/1 updates and returns user', {
  method: 'PUT', path: '/users/1', expectedStatus: 200,
  body: { name: 'Alice Updated', email: 'alice.updated@example.com' },
  schema: userSchema,
  assertions: (data) => {
    if (data.id !== 1) throw new Error(\`Expected id 1, got \${data.id}\`);
  }
}),
contractTest('DELETE /users/1 returns 204', {
  method: 'DELETE', path: '/users/1', expectedStatus: 204,
  auth: 'bearer', schema: null
}),
contractTest('GET /admin/users without auth returns 401', {
  method: 'GET', path: '/admin/users', expectedStatus: 401, schema: null
})`
      }
    ]
  },

  // ============================================================
  // QA-LAB-6: Visual Regression Testing (from qa-5)
  // ============================================================
  {
    id: 'qa-lab-6',
    roleId: 'qa-test-engineer',
    level: 'senior',
    title: 'Visual Regression Testing with Playwright',
    description: 'Implement pixel-level visual regression testing: capture baselines, compare screenshots with tolerance thresholds, generate diff images, and integrate into CI to block UI regressions.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before running visual regression tests, ensure your QA environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, @playwright/test installed with browser binaries, pngjs and pixelmatch installed for image comparison, and your application running at localhost:3000. Complete all setup steps and verify Playwright before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `npm install --save-dev pngjs pixelmatch` for image comparison utilities',
          'Run `npx playwright install` to ensure browser binaries are present'
        ],
        expectedOutput: `npx playwright --version  →  Version 1.x.x
node -e "require('pixelmatch')"  →  (no error)
Sample app running at http://localhost:3000`,
        solution: null
      },
      {
        title: 'Step 2: Build the Screenshot Comparison Utility',
        instruction: `Write the core visual regression utility that compares a current screenshot against a saved baseline. WHAT: Visual regression testing captures the UI as a PNG, then diffs it pixel-by-pixel against a previously approved baseline. WHY: CSS regressions — broken layouts, invisible text, shifted buttons — are invisible in code review but immediately obvious to users. HOW: Use Playwright's page.screenshot(), pngjs to parse PNGs, and pixelmatch to count differing pixels. If no baseline exists, save the current screenshot as the new baseline.`,
        starterCode: `const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const BASELINE_DIR = path.join(__dirname, '__baselines__');
const CURRENT_DIR = path.join(__dirname, '__current__');
const DIFF_DIR = path.join(__dirname, '__diffs__');

// TODO: Ensure all three directories exist (create if missing)
[BASELINE_DIR, CURRENT_DIR, DIFF_DIR].forEach(dir => {
  // TODO: use fs.mkdirSync with { recursive: true }
});

// TODO: Implement compareScreenshots(baselineBuffer, currentBuffer, diffPath)
// Returns: { match: boolean, mismatchPercentage: number, mismatchedPixels: number }
// - Return { match: false, mismatchPercentage: 100, reason: 'dimension mismatch' } if sizes differ
// - Use pixelmatch with threshold: 0.1, includeAA: false
// - Write diff PNG to diffPath
// - match = true if mismatchPercentage < 0.5

function compareScreenshots(baselineBuffer, currentBuffer, diffPath) {
  // TODO
}

// TODO: Implement visualTest(page, name, options = {})
// options: { selector: null, threshold: 0.5 }
// - If selector provided, screenshot only that element (use boundingBox)
// - Otherwise, fullPage screenshot
// - Save current to CURRENT_DIR
// - If no baseline: save as baseline and return { isNew: true }
// - Otherwise: compare and return result

async function visualTest(page, name, options = {}) {
  // TODO
}

module.exports = { visualTest };`,
        hints: [
          'PNG.sync.read(buffer) parses a PNG buffer; PNG.sync.write(png) serializes back',
          'pixelmatch(img1.data, img2.data, diff.data, width, height, opts) returns pixel count',
          'page.locator(selector).boundingBox() returns { x, y, width, height } for clip option'
        ],
        expectedOutput: `// First run (no baseline):
[NEW BASELINE] homepage-full

// Second run (no visual change):
[PASS] homepage-full - 0.00% diff

// After a CSS change:
[FAIL] homepage-full - 2.34% diff
Diff image saved to __diffs__/homepage-full-diff.png`,
        solution: `const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const BASELINE_DIR = path.join(__dirname, '__baselines__');
const CURRENT_DIR = path.join(__dirname, '__current__');
const DIFF_DIR = path.join(__dirname, '__diffs__');

[BASELINE_DIR, CURRENT_DIR, DIFF_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function compareScreenshots(baselineBuffer, currentBuffer, diffPath) {
  const baseline = PNG.sync.read(baselineBuffer);
  const current = PNG.sync.read(currentBuffer);

  if (baseline.width !== current.width || baseline.height !== current.height) {
    return { match: false, mismatchPercentage: 100, reason: 'dimension mismatch' };
  }

  const { width, height } = baseline;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    baseline.data, current.data, diff.data,
    width, height,
    { threshold: 0.1, includeAA: false }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const mismatchPercentage = (mismatchedPixels / totalPixels) * 100;

  return { match: mismatchPercentage < 0.5, mismatchPercentage, mismatchedPixels };
}

async function visualTest(page, name, options = {}) {
  const { selector = null, threshold = 0.5 } = options;
  const screenshotOptions = { fullPage: !selector };

  if (selector) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible' });
    screenshotOptions.clip = await element.boundingBox();
  }

  const currentBuffer = await page.screenshot(screenshotOptions);
  const baselinePath = path.join(BASELINE_DIR, \`\${name}.png\`);
  const currentPath = path.join(CURRENT_DIR, \`\${name}.png\`);
  const diffPath = path.join(DIFF_DIR, \`\${name}-diff.png\`);

  fs.writeFileSync(currentPath, currentBuffer);

  if (!fs.existsSync(baselinePath)) {
    fs.writeFileSync(baselinePath, currentBuffer);
    console.log(\`  [NEW BASELINE] \${name}\`);
    return { isNew: true };
  }

  const baselineBuffer = fs.readFileSync(baselinePath);
  const result = compareScreenshots(baselineBuffer, currentBuffer, diffPath);

  console.log(\`  [\${result.match ? 'PASS' : 'FAIL'}] \${name} - \${result.mismatchPercentage.toFixed(2)}% diff\`);
  return result;
}

module.exports = { visualTest };`
      },
      {
        title: 'Step 3: Write the Visual Regression Test Suite',
        instruction: `Write Playwright tests that use your visualTest utility to assert UI consistency across key pages. WHAT: Each test navigates to a page, waits for it to be fully rendered, then calls visualTest() to compare against the stored baseline. WHY: Covering multiple pages (homepage, nav, login form, authenticated dashboard) ensures regressions anywhere in the app are caught, not just on the pages developers happen to test manually. HOW: Use page.waitForLoadState('networkidle') to ensure no pending requests, and test both full-page and component-scoped screenshots for precision.`,
        starterCode: `const { test, expect } = require('@playwright/test');
const { visualTest } = require('./visualTest');

test.describe('Visual Regression Tests', () => {

  test('Homepage renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    // TODO: Wait for network idle (no pending requests)
    // TODO: Call visualTest for 'homepage-full'
    // TODO: If not new baseline, assert result.match === true
  });

  test('Navigation bar is consistent', async ({ page }) => {
    await page.goto('http://localhost:3000');
    // TODO: Visual test scoped to 'nav' selector
    // TODO: Assert match if baseline exists
  });

  test('Login form layout is stable', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    // TODO: Visual test scoped to 'form' selector
  });

  test('Dashboard renders after login', async ({ page }) => {
    // TODO: Log in programmatically
    // TODO: Wait for dashboard to load
    // TODO: Visual test for 'dashboard' with mismatchPercentage < 1.0
    // Note: Use result.mismatchPercentage for a looser threshold on dynamic content
  });
});`,
        hints: [
          'await page.waitForLoadState("networkidle") waits until no network requests for 500ms',
          'if (!result.isNew) { expect(result.match).toBe(true); } — skip assertion on first run',
          'For dynamic content (avatars, timestamps), use expect(result.mismatchPercentage).toBeLessThan(1.0)'
        ],
        expectedOutput: `Running 4 tests using 1 worker

  Visual Regression Tests
    ✓ Homepage renders correctly (1.8s)
       [NEW BASELINE] homepage-full
    ✓ Navigation bar is consistent (0.9s)
       [NEW BASELINE] navbar
    ✓ Login form layout is stable (0.7s)
       [NEW BASELINE] login-form
    ✓ Dashboard renders after login (2.3s)
       [NEW BASELINE] dashboard

  4 passed (6.0s) — baselines saved to __baselines__/`,
        solution: `const { test, expect } = require('@playwright/test');
const { visualTest } = require('./visualTest');

test.describe('Visual Regression Tests', () => {
  test('Homepage renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const result = await visualTest(page, 'homepage-full');
    if (!result.isNew) {
      expect(result.match).toBe(true);
    }
  });

  test('Navigation bar is consistent', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const result = await visualTest(page, 'navbar', { selector: 'nav' });
    if (!result.isNew) {
      expect(result.match).toBe(true);
    }
  });

  test('Login form layout is stable', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    const result = await visualTest(page, 'login-form', { selector: 'form' });
    if (!result.isNew) {
      expect(result.match).toBe(true);
    }
  });

  test('Dashboard renders after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\\/dashboard/);

    const result = await visualTest(page, 'dashboard');
    if (!result.isNew) {
      expect(result.mismatchPercentage).toBeLessThan(1.0);
    }
  });
});`
      },
      {
        title: 'Step 4: Dark Mode and CI Integration',
        instruction: `Extend your visual regression suite to test dark mode variants, and configure CI to upload diff images as artifacts when tests fail. WHAT: Dark mode requires a separate set of baselines since the pixel data is fundamentally different from light mode. WHY: Many teams ship dark mode bugs because visual tests only cover one theme. CI artifact upload makes failed diff images reviewable by anyone in the team, not just the developer who ran the test locally. HOW: Toggle the theme via a data attribute or class, use a separate baseline name suffix (-dark), and upload __diffs__/ in your CI workflow on failure.`,
        starterCode: `// Add to visual-regression.spec.js:

test('Homepage renders correctly in dark mode', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // TODO: Enable dark mode by:
  // Option A: clicking a theme toggle button
  // Option B: evaluating document.documentElement.setAttribute('data-theme', 'dark')

  // TODO: Wait for theme transition animation to complete (300ms)

  // TODO: Run visual test with name 'homepage-full-dark'
  // TODO: Assert match if baseline exists
});

// .github/workflows/visual-regression.yml
// TODO: Add a workflow that:
// 1. Runs on pull_request
// 2. Installs deps and Playwright browsers
// 3. Starts dev server
// 4. Runs: npx playwright test visual-regression.spec.js
// 5. On FAILURE: uploads __diffs__/ and __current__/ as artifacts
// 6. On SUCCESS: uploads __baselines__/ to track approved baselines`,
        hints: [
          'await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark")) — no selector needed',
          'await page.waitForTimeout(350) allows CSS transitions to complete before screenshotting',
          'In CI, use "if: failure()" on the artifact upload step so it only runs on test failures'
        ],
        expectedOutput: `Running 5 tests using 1 worker

  Visual Regression Tests
    ✓ Homepage renders correctly (1.8s)         [PASS] 0.00% diff
    ✓ Navigation bar is consistent (0.9s)       [PASS] 0.00% diff
    ✓ Login form layout is stable (0.7s)        [PASS] 0.00% diff
    ✓ Dashboard renders after login (2.3s)      [PASS] 0.12% diff
    ✓ Homepage renders correctly in dark mode   [PASS] 0.00% diff

  5 passed (7.1s)

GitHub Actions (on CSS regression):
  ✗ Homepage renders correctly — [FAIL] 2.34% diff
  Uploading diff artifacts → __diffs__/homepage-full-diff.png`,
        solution: `// visual-regression.spec.js addition:
test('Homepage renders correctly in dark mode', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(350); // allow CSS transition

  const result = await visualTest(page, 'homepage-full-dark');
  if (!result.isNew) {
    expect(result.match).toBe(true);
  }
});

// .github/workflows/visual-regression.yml:
// name: Visual Regression Tests
// on:
//   pull_request:
//     branches: [main]
// jobs:
//   visual:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - uses: actions/setup-node@v4
//         with: { node-version: 22, cache: npm }
//       - run: npm ci
//       - run: npx playwright install --with-deps
//       - run: npm run dev &
//       - run: npx wait-on http://localhost:3000
//       - run: npx playwright test visual-regression.spec.js
//       - uses: actions/upload-artifact@v4
//         if: failure()
//         with:
//           name: visual-regression-diffs
//           path: |
//             __diffs__/
//             __current__/
//           retention-days: 14`
      }
    ]
  }
];
