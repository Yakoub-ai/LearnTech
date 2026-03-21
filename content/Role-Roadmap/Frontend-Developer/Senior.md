# Frontend Developer – Senior Concept Reference


## Web Performance – Core Web Vitals and Measurement

Core Web Vitals are a set of metrics defined by Google to measure the real-world experience of loading, interactivity, and visual stability on a web page. They are the basis for performance standards that affect both user experience and search engine ranking.

The three Core Web Vitals are:

**Largest Contentful Paint (LCP)** measures loading performance — specifically, how long it takes for the largest visible content element (an image, video, or block of text) to render within the viewport. A good LCP is 2.5 seconds or less.

**Interaction to Next Paint (INP)** measures responsiveness — how quickly the page responds to user interactions such as clicks and key presses. It replaced First Input Delay as the responsiveness metric. A good INP is 200 milliseconds or less.

**Cumulative Layout Shift (CLS)** measures visual stability — whether elements on the page move unexpectedly while loading. A good CLS score is 0.1 or less.

**Measurement** happens at two levels. Lab measurement uses tools (Lighthouse in Chrome DevTools, PageSpeed Insights) to simulate load conditions in a controlled environment. Field measurement captures data from real users via the Chrome User Experience Report (CrUX). Lab data is useful during development; field data reflects what users actually experience.

**Code walkthrough:**

```javascript
// Step 1: Why measure in the field — lab scores can look great while
// real users on slow devices and networks have a terrible experience
// The web-vitals library captures actual user metrics

import { onLCP, onINP, onCLS } from 'web-vitals';

// Step 2: Report metrics to your analytics endpoint for real-user monitoring
function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,      // 'LCP', 'INP', or 'CLS'
    value: metric.value,    // Milliseconds for LCP/INP, score for CLS
    rating: metric.rating,  // 'good', 'needs-improvement', or 'poor'
    id: metric.id,          // Unique ID for this page load
    navigationType: metric.navigationType,
  });
  // Step 3: Use sendBeacon so the data is sent even if the user navigates away
  // fetch might be cancelled on page unload; sendBeacon is fire-and-forget
  navigator.sendBeacon('/api/web-vitals', body);
}

// Step 4: Register callbacks — each fires when the metric is finalised
onLCP(sendToAnalytics);   // Largest Contentful Paint — target ≤ 2.5s
onINP(sendToAnalytics);   // Interaction to Next Paint — target ≤ 200ms
onCLS(sendToAnalytics);   // Cumulative Layout Shift — target ≤ 0.1

// Step 5: Using the Performance API for custom timing measurements
// Mark the start and end of an expensive operation to profile it
performance.mark('campaign-data-fetch-start');
await fetch('/api/campaigns');
performance.mark('campaign-data-fetch-end');
performance.measure('campaign-fetch', 'campaign-data-fetch-start', 'campaign-data-fetch-end');

const [measure] = performance.getEntriesByName('campaign-fetch');
console.log(`Campaign fetch took ${measure.duration.toFixed(0)}ms`);
```

**Why it matters:** Performance is a user experience problem. Users abandon slow pages. Senior developers are expected to own performance as a quality concern, not treat it as an afterthought.

**Key things to understand:**

- LCP is most commonly hurt by slow server response times, render-blocking resources, and unoptimised images.
- CLS is most commonly caused by images without explicit width and height attributes, dynamically injected content, and web fonts causing a flash of unstyled text.
- DevTools Performance panel and the Network panel are the primary tools for diagnosing performance problems in development.

**Common pitfalls:**

- Optimising only for Lighthouse scores in a lab environment without verifying that real-user field data improves.
- Fixing the wrong metric — for example, improving visual load speed without addressing slow interaction responsiveness.

---

## Web Performance – Optimisation Techniques (lazy loading, code splitting, caching)

Once you have measured performance and identified bottlenecks, you apply targeted techniques to improve it. The most impactful techniques address initial load time, resource efficiency, and repeat-visit performance.

**Lazy loading** defers the loading of non-critical resources until they are needed. Images below the fold can use the `loading="lazy"` HTML attribute to load only when they approach the viewport. JavaScript modules can be lazily imported using dynamic `import()` syntax, so the browser only downloads the code for a feature when the user navigates to it.

**Code splitting** divides your JavaScript bundle into smaller chunks that are loaded on demand. In a React application, `React.lazy` combined with `Suspense` enables component-level code splitting — the component and its dependencies are only fetched when the component is first rendered. Route-based code splitting (loading code for each route only when the user navigates to it) is the most common and highest-impact application of this technique.

**Caching** allows resources to be stored by the browser or intermediate proxies so they do not need to be re-downloaded on repeat visits. The `Cache-Control` HTTP header controls caching behaviour. Static assets with content hashes in their filenames can be cached indefinitely (`max-age=31536000, immutable`). HTML documents are typically cached for a very short time or not at all so users always receive the latest version.

**Additional techniques** include: compressing assets with Brotli or gzip; optimising images by serving modern formats (WebP, AVIF) at appropriate sizes; eliminating render-blocking scripts by using `defer` or `async` attributes; and preloading critical resources with `<link rel="preload">`.

**Code walkthrough:**

```javascript
// Step 1: Why route-based code splitting — the user only downloads code
// for the page they're viewing, dramatically reducing initial bundle size
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Step 2: React.lazy + dynamic import() — webpack/vite creates a separate
// chunk for each lazy component, loaded on demand
const CampaignDashboard = lazy(() => import('./pages/CampaignDashboard'));
const AnalyticsReport = lazy(() => import('./pages/AnalyticsReport'));
const AudienceBuilder = lazy(() => import('./pages/AudienceBuilder'));

function App() {
  return (
    // Step 3: Suspense provides a fallback while the chunk downloads
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<CampaignDashboard />} />
        <Route path="/analytics" element={<AnalyticsReport />} />
        <Route path="/audiences" element={<AudienceBuilder />} />
      </Routes>
    </Suspense>
  );
}

// Step 4: Why resource hints — tell the browser to prepare resources early
// Place these in the HTML <head> to improve LCP
// <link rel="preload" href="/fonts/brand.woff2" as="font" type="font/woff2" crossorigin>
// <link rel="preconnect" href="https://api.example.com">

// Step 5: Image optimisation — serve modern formats at the right size
// The browser picks the best format it supports
// <picture>
//   <source srcset="/hero.avif" type="image/avif">
//   <source srcset="/hero.webp" type="image/webp">
//   <img src="/hero.jpg" alt="Campaign hero" width="1200" height="600" loading="lazy">
// </picture>

// Step 6: Cache headers (set by server/CDN) — hashed filenames enable aggressive caching
// Static assets: Cache-Control: public, max-age=31536000, immutable
// HTML: Cache-Control: no-cache (always revalidate to get the latest version)
```

**Why it matters:** A slow application costs users time and costs businesses revenue. These techniques are the practical tools a senior developer uses to translate performance measurements into improvements.

**Key things to understand:**

- Code splitting is only beneficial if the split chunks are large enough to justify the additional HTTP request overhead.
- Resource hints (`preload`, `prefetch`, `preconnect`) tell the browser to prioritise or prepare resources in advance, but overusing them can hurt performance by competing for bandwidth.

**Common pitfalls:**

- Applying lazy loading to above-the-fold images, which delays the LCP element and hurts performance.
- Code splitting every component indiscriminately, resulting in hundreds of tiny requests that slow down navigation.
- Setting long cache lifetimes on resources without content hashing, so users receive stale files after a deployment.

---

## Accessibility – WCAG Standards and ARIA

Web accessibility means building interfaces that can be used by people with a wide range of disabilities — visual, auditory, motor, cognitive. The Web Content Accessibility Guidelines (WCAG) provide the internationally recognised framework for evaluating and designing accessible web content.

**WCAG** is organised around four principles, commonly abbreviated as POUR:

- **Perceivable** — users must be able to perceive all information (e.g. images have alt text, videos have captions).
- **Operable** — users must be able to operate all interface components (e.g. all functionality is available via keyboard, no content flashes more than three times per second).
- **Understandable** — users must be able to understand the content and how to operate the UI (e.g. error messages are descriptive, forms have clear labels).
- **Robust** — content must be interpreted reliably by a wide range of user agents, including assistive technologies.

WCAG defines success criteria at three conformance levels: A (minimum), AA (the standard required by most legislation), and AAA (enhanced). The current version is WCAG 2.2, which became the W3C standard in October 2023. The target standard for most projects is WCAG 2.2 Level AA. Note that the EU European Accessibility Act applies from June 2025, making accessibility compliance a legal requirement across the European Union. Senior developers should be familiar with the AA criteria.

**ARIA** (Accessible Rich Internet Applications) is a set of HTML attributes that communicate the role, state, and properties of UI elements to assistive technologies. For example, `role="dialog"` on a modal, `aria-expanded="true"` on an open accordion, and `aria-label="Close"` on an icon button without visible text.

**Code walkthrough:**

```javascript
import { useState, useRef, useEffect } from 'react';

// Step 1: Why focus management matters — in SPAs, screen reader users
// lose context when content changes without a page reload
function Modal({ isOpen, onClose, title, children }) {
  const closeButtonRef = useRef(null);

  // Step 2: Move focus INTO the modal when it opens
  // Without this, keyboard users cannot reach the modal content
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Step 3: role="dialog" + aria-modal tells screen readers this is a modal
    // aria-labelledby links the dialog to its visible title for announcement
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      {children}
      {/* Step 4: aria-label provides the accessible name for icon-only buttons */}
      <button ref={closeButtonRef} aria-label="Close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

// Step 5: Accessible accordion — aria-expanded communicates state to screen readers
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `panel-${title.replace(/\s/g, '-').toLowerCase()}`;

  return (
    <div>
      <button
        aria-expanded={isOpen}       // Tells screen reader if panel is open/closed
        aria-controls={panelId}      // Links button to the panel it controls
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {/* Step 6: role="region" + aria-labelledby makes the content a landmark */}
      <div id={panelId} role="region" aria-labelledby={panelId} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
```

**Why it matters:** Accessibility is a legal requirement in many jurisdictions and a quality standard that benefits all users. Senior developers are responsible for embedding accessible practices in the development process, not retrofitting them later.

**Key things to understand:**

- The first rule of ARIA is: use native HTML elements when they already provide the required semantics and behaviour. `<button>` is better than `<div role="button">` because it is keyboard-focusable and activatable by default.
- `aria-label` provides an accessible name when visible text is absent or insufficient. `aria-labelledby` points to an existing visible element that serves as the label.
- Focus management is a critical accessibility concern in single-page applications. When a modal opens, focus must move into it. When it closes, focus must return to the element that triggered it.

**Common pitfalls:**

- Relying on colour alone to convey information (e.g. red text for errors) without a text label, icon, or other non-colour indicator.
- Adding ARIA roles and attributes to native elements that already have the correct semantics, creating conflicts.
- Building custom interactive components (carousels, comboboxes, date pickers) without implementing the keyboard interaction patterns specified by the ARIA Authoring Practices Guide.

---

## Accessibility – Testing and Auditing

Accessibility testing is the process of verifying that an interface meets WCAG criteria and works correctly with assistive technologies. A robust accessibility testing strategy combines automated scanning, manual keyboard testing, and testing with real screen readers.

**Automated tools** such as Axe, Lighthouse, and the browser DevTools accessibility panel can identify a subset of accessibility violations — typically around 30-40% of all possible issues. These tools check for things like missing alt text, insufficient colour contrast, and form inputs without labels. They are fast and easy to integrate into a CI pipeline, but they cannot verify that a custom interactive component behaves correctly under keyboard navigation or that content makes logical sense to a screen reader user.

**Manual keyboard testing** involves navigating the entire page using only the keyboard — Tab to move forward through focusable elements, Shift+Tab to move backward, Enter and Space to activate controls, arrow keys for composite widgets. Every interactive element must be reachable, clearly focusable (visible focus indicator), and operable.

**Screen reader testing** uses tools like NVDA (Windows), VoiceOver (macOS/iOS), or TalkBack (Android) to verify that the announced content and interaction model match the visual experience. This is the most thorough form of accessibility testing and reveals issues that no automated tool can detect.

**Integrating accessibility into CI** can be achieved with tools like the axe-core library in Jest or Playwright, which runs accessibility checks against rendered components or live pages as part of the test suite.

**Code walkthrough:**

```javascript
// Step 1: Why automated accessibility testing in CI — it catches regressions
// on every PR, not just during manual audits before release
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility audit', () => {
  test('campaign dashboard has no critical violations', async ({ page }) => {
    await page.goto('/campaigns');

    // Step 2: axe-core checks the rendered page against WCAG 2.2 AA rules
    // It catches ~30-40% of issues: missing alt text, contrast, missing labels
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();

    // Step 3: Assert zero violations — CI fails if any are found
    expect(results.violations).toEqual([]);
  });

  test('modal focus management works correctly', async ({ page }) => {
    await page.goto('/campaigns');
    await page.getByRole('button', { name: 'New Campaign' }).click();

    // Step 4: Verify focus moved into the modal — critical for keyboard users
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Step 5: Check that the close button is the focused element
    const closeButton = modal.getByRole('button', { name: 'Close' });
    await expect(closeButton).toBeFocused();

    // Step 6: Verify keyboard trap — Tab should cycle within the modal
    await page.keyboard.press('Tab');
    // Focus should remain inside the dialog, not escape to the page behind
    const focusedElement = page.locator(':focus');
    await expect(modal).toContainText(await focusedElement.textContent());
  });
});
```

**Why it matters:** Shipping inaccessible software and discovering it in a legal challenge or user complaint is far more costly than building accessibly from the start. Senior developers champion the processes that prevent rather than remediate accessibility failures.

**Key things to understand:**

- Automated tools catch a limited subset of issues. A clean automated scan does not mean a page is accessible.
- Colour contrast must be tested for all text and interactive element states (default, hover, focus, disabled) against their backgrounds.
- Component libraries often have known accessibility issues in specific versions. Testing with the actual library version in use is important.

**Common pitfalls:**

- Treating a passing automated scan as complete accessibility validation.
- Testing only the happy path with keyboard and screen reader, missing error states, modal dialogs, and dynamic content updates.
- Not verifying that `aria-live` regions announce content changes to screen readers when the DOM is updated dynamically.

---

## API Design – Principles a Frontend Senior Should Understand

Senior frontend developers do not just consume APIs — they collaborate on their design, advocate for frontend needs in API discussions, and identify design decisions that will create problems during implementation. Understanding API design from a consumer's perspective makes you a more effective collaborator with backend engineers.

**Consistency** is the most valuable property of an API. Consistent naming conventions, consistent error response shapes, and consistent pagination styles dramatically reduce the cognitive overhead of integration. A senior frontend developer should push back on APIs that are inconsistent across resources.

**Error response design** has a significant impact on the frontend. Errors should be returned in a predictable, machine-readable format — a consistent JSON structure with a code, a human-readable message, and optionally field-level validation errors. This allows the frontend to handle errors generically and display appropriate user messages without custom-casing every endpoint.

**Versioning** allows the API to evolve without breaking existing clients. URL versioning (e.g. `/api/v2/`) and header-based versioning are the two common strategies. Frontend developers should understand how the API they consume is versioned and what the migration path looks like when breaking changes are introduced.

**Pagination** strategies (offset-based, cursor-based) have different performance and UX implications. Cursor-based pagination is more efficient for large datasets and supports real-time data better than offset-based.

**Code walkthrough:**

```typescript
// Step 1: Why a typed API client — it enforces consistent error handling
// and provides type safety across all API calls in the application
interface ApiError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>; // Validation errors per field
}

interface PaginatedResponse<T> {
  data: T[];
  cursor: string | null; // null means no more pages
  hasMore: boolean;
}

// Step 2: Generic fetch wrapper that handles all common concerns
async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });

  if (!res.ok) {
    // Step 3: Parse the error body for structured error information
    const error: ApiError = await res.json().catch(() => ({
      code: 'UNKNOWN',
      message: `HTTP ${res.status}`,
    }));
    throw error;
  }

  return res.json();
}

// Step 4: Cursor-based pagination — more efficient than offset for large datasets
// because the database can seek to the cursor position directly
async function fetchAllCampaigns(): Promise<Campaign[]> {
  const allCampaigns: Campaign[] = [];
  let cursor: string | null = null;

  do {
    const url = cursor
      ? `/api/campaigns?cursor=${cursor}&limit=50`
      : '/api/campaigns?limit=50';
    const page = await apiGet<PaginatedResponse<Campaign>>(url);
    allCampaigns.push(...page.data);
    cursor = page.cursor;
  } while (cursor !== null);

  return allCampaigns;
}
```

**Why it matters:** Frontend engineers who understand API design write better integration code, catch problems earlier, and have more productive conversations with backend engineers.

**Key things to understand:**

- HTTP methods should be used semantically: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal. GET requests must be idempotent and safe.
- Response payload size matters for mobile performance. The frontend should request only needed fields where the API supports it (via sparse fieldsets or GraphQL).

**Common pitfalls:**

- Accepting a poorly designed API without raising concerns during design review, then building complex workarounds in the frontend to compensate.
- Not negotiating for detailed validation error responses, resulting in having to display generic error messages to users.

---

## Domain-Driven Design – Applied to Frontend Architecture

Domain-Driven Design (DDD) is a set of principles for tackling complex software by aligning the technical model closely with the business domain. While DDD originated in backend and enterprise contexts, its ideas are directly applicable to how frontend applications are structured.

The core idea is that code organisation should reflect the business concepts and language of the domain rather than technical concerns. In a frontend application, this means organising code around features and business capabilities — `user-profile`, `order-management`, `product-catalogue` — rather than around technical layers — `components`, `services`, `utils`.

**Bounded contexts** in DDD are explicit boundaries within which a particular model and vocabulary apply. In a large frontend application, different parts of the application might have different models of the same underlying data. For example, a `User` in the authentication context might have different properties than a `User` in the admin dashboard context. Recognising these boundaries and not forcing a single model across all contexts leads to simpler, more focused code.

**Ubiquitous language** is the practice of using the same terminology in code as the business and product team uses to describe the domain. Variable names, function names, and component names should map directly to business concepts. This reduces the cognitive translation required when moving between discussions and code.

**Code walkthrough:**

```
// Step 1: Why feature-based structure — code organised by business domain
// is easier to navigate, understand, and delete than code organised by type

src/
├── features/
│   ├── campaign-management/      // Bounded context: campaign CRUD
│   │   ├── components/
│   │   │   ├── CampaignList.tsx
│   │   │   └── CampaignEditor.tsx
│   │   ├── hooks/
│   │   │   └── useCampaigns.ts   // Data fetching for this feature
│   │   ├── api/
│   │   │   └── campaignApi.ts    // API calls scoped to this feature
│   │   ├── types.ts              // Campaign, CampaignStatus, etc.
│   │   └── index.ts              // Step 2: Public API — only export what
│   │                             // other features are allowed to import
│   ├── audience-builder/         // Separate bounded context
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── analytics-reporting/      // Another bounded context
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── shared/                       // Step 3: Truly shared code — design tokens,
│   ├── components/               // UI primitives, auth utilities
│   └── utils/
└── app/                          // App shell: routing, providers, layout
    ├── routes.tsx
    └── providers.tsx

// Step 4: Why index.ts matters — it enforces boundaries between features
// features/campaign-management/index.ts
export { CampaignList } from './components/CampaignList';
export { useCampaigns } from './hooks/useCampaigns';
export type { Campaign } from './types';
// Internal components are NOT exported — other features cannot depend on them
// This prevents the cross-cutting dependencies that make codebases hard to change
```

**Why it matters:** Frontend codebases often grow into difficult-to-navigate collections of generic utilities and technically-named components. Applying DDD thinking produces codebases that are easier for new developers to orient themselves in and easier to evolve in line with business changes.

**Key things to understand:**

- Feature-based folder organisation is the practical expression of bounded contexts in a frontend codebase. Each feature folder is a self-contained module with its own components, hooks, state, and tests.
- DDD is most valuable in complex domains with rich business logic. For simple CRUD applications, it may be over-engineering.

**Common pitfalls:**

- Organising by technical role (all components in one folder, all hooks in another) in a large application, creating cross-cutting dependencies that are hard to track.
- Importing freely between feature modules, breaking the boundaries that DDD aims to establish. Use explicit, limited public APIs between modules.

---

## Architecture Patterns (micro-frontends, monorepo, feature-based structure)

As frontend applications and teams grow, the architecture of the codebase must be intentionally designed to support multiple contributors, fast iteration, and maintainability. Several architectural patterns address these concerns at different scales.

**Feature-based structure** organises code by business feature rather than by technical role. All code related to a feature — components, hooks, API calls, types, tests — lives together. This makes it easy to understand a feature in its entirety and to delete or move it without hunting across multiple directories. It is the recommended starting point for most applications.

**Monorepo** is the practice of storing multiple packages or applications in a single version-controlled repository. A design system, a shared component library, multiple applications, and shared utilities can all live together. Tools like Nx and Turborepo provide monorepo-specific features: efficient caching, dependency graph analysis, and targeted test/build runs that only process code affected by a given change. The trade-off is tooling complexity and the need for discipline around package boundaries.

**Micro-frontends** decompose a single frontend application into smaller, independently deployable pieces — each owned by a different team. Each piece is developed, tested, and deployed independently. Integration happens at runtime (in the browser) via a shell application that composes the pieces. Micro-frontends solve an organisational problem (multiple teams working on one large UI) more than a technical one. They introduce significant complexity and should only be adopted when that complexity is justified by team size and deployment independence requirements.

**Code walkthrough:**

```javascript
// Step 1: Why Module Federation — it lets independently deployed apps
// share code at runtime without rebuilding the entire application
// This is the Webpack 5 / Vite approach to micro-frontends

// --- Shell Application (host) vite.config.ts ---
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'shell',
      // Step 2: Declare remote applications — each is deployed independently
      // The shell loads them at runtime, not at build time
      remotes: {
        campaignApp: 'https://campaigns.cdn.example.com/remoteEntry.js',
        analyticsApp: 'https://analytics.cdn.example.com/remoteEntry.js',
      },
      // Step 3: Shared dependencies prevent duplicate React in the bundle
      shared: ['react', 'react-dom'],
    }),
  ],
});

// --- Shell Application routing ---
import { lazy, Suspense } from 'react';

// Step 4: Import remote components as if they were local modules
// Module Federation resolves the import to the remote URL at runtime
const CampaignDashboard = lazy(() => import('campaignApp/Dashboard'));
const AnalyticsReport = lazy(() => import('analyticsApp/Report'));

function ShellApp() {
  return (
    <div>
      <nav>{/* Shell owns the navigation and shared header */}</nav>
      {/* Step 5: Each remote app renders inside the shell's layout
          Teams deploy independently — no coordination needed for releases */}
      <Suspense fallback={<p>Loading module...</p>}>
        <Routes>
          <Route path="/campaigns/*" element={<CampaignDashboard />} />
          <Route path="/analytics/*" element={<AnalyticsReport />} />
        </Routes>
      </Suspense>
    </div>
  );
}
```

**Why it matters:** Choosing the right architectural pattern for a given team size and application complexity is a key senior responsibility. Poor architectural decisions compound over time and become very expensive to reverse.

**Key things to understand:**

- Start simple. Feature-based structure inside a single repository is the right starting point for most teams. Add monorepo tooling when you have multiple packages with shared code. Consider micro-frontends only when team boundaries and deployment independence cannot be achieved otherwise.
- Architecture decisions should be documented with the reasoning — including the alternatives that were considered and rejected.

**Common pitfalls:**

- Adopting micro-frontends for the technical novelty when a well-structured monolith would serve the team better.
- Setting up a monorepo without enforcing package boundaries, resulting in implicit cross-package dependencies that negate the benefits.
- Not revisiting architectural decisions as the team or application grows, continuing to apply patterns that were right at a smaller scale.

---

## AI-Assisted Development – Practical Use for Frontend Engineers

AI-assisted development tools — code completion assistants, conversational coding agents, and automated review tools — have become a meaningful part of the frontend engineering workflow. A senior developer uses these tools deliberately, understanding their capabilities and their limitations.

**Code generation** is the most immediate capability. AI assistants can generate boilerplate, scaffold components, write unit tests for a given function, and convert designs into markup. The value is in reducing the time spent on repetitive tasks, not in replacing engineering judgment. Generated code must be reviewed with the same rigour as code from any other source.

**Conversational exploration** allows you to ask an AI assistant to explain an unfamiliar API, suggest approaches to a problem, or review a code snippet for issues. This is most useful for exploring options quickly and for learning — understanding why a suggestion is made is as important as the suggestion itself.

**Limitations** that a senior developer must understand: AI models have knowledge cutoffs and may suggest deprecated APIs or patterns. They hallucinate — generating plausible-sounding but incorrect code or references. They do not have context about your specific codebase, team conventions, or business requirements unless you provide it. Generated code may be technically correct but not aligned with your architecture, naming conventions, or performance requirements.

**Workflow integration** includes using AI tools in editors (inline suggestions), in the terminal (command generation), and in code review (automated summaries and issue flagging). The most effective practitioners treat AI tools as a highly capable but unreliable junior contributor: useful for volume work, but requiring oversight and domain-specific correction.

**Code walkthrough:**

```javascript
// Step 1: Why error boundaries — they catch JavaScript errors in the component
// tree and display a fallback UI instead of crashing the entire application
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Step 2: getDerivedStateFromError updates state so the next render shows fallback
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Step 3: componentDidCatch sends the error to your monitoring service
  // This is how you detect production errors that users experience
  componentDidCatch(error, errorInfo) {
    reportToMonitoring({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      // Step 4: Include context to help diagnose — which page, which user segment
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }

  render() {
    if (this.state.hasError) {
      // Step 5: Show a user-friendly fallback, not a white screen
      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <p>We've been notified and are looking into it.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Step 6: Wrap feature boundaries — isolate failures to specific sections
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary>
        <CampaignDashboard /> {/* If this crashes, only this section shows fallback */}
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
```

**Why it matters:** Senior developers set the standard for how AI tools are used on their teams. Thoughtful adoption — with clear guidelines on review, attribution, and appropriate use cases — multiplies team output without compromising quality.

**Key things to understand:**

- Security-sensitive code (authentication, cryptography, data handling) generated by AI must be reviewed with extra care. Plausible-looking security code can have subtle, critical flaws.
- Providing rich context in prompts (the function signature, the types involved, the expected behaviour, the existing patterns in the codebase) dramatically improves output quality.

**Common pitfalls:**

- Accepting generated code without reading and understanding it, which transfers knowledge debt to future maintainers.
- Using AI-generated test cases as a substitute for thinking about what needs to be tested — the AI may generate tests that pass trivially without covering meaningful behaviour.
- Not updating AI tool guidelines as the tools evolve rapidly, leaving the team with outdated practices.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) (Internal – requires company access) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from developers building AI-powered frontend features to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. For frontend engineers, this matters when building interfaces that display AI-generated content, collecting user data that feeds into AI systems, or integrating AI-powered features such as chatbots, recommendations, or content generation. The policy's transparency requirements — informing users when they interact with AI — are directly implemented in the frontend.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Transparency obligations require the frontend to clearly communicate when users are interacting with AI-generated content or AI-powered features.
- GDPR obligations apply to data collected through AI-powered interfaces — consent management and data minimisation are frontend concerns.

**Code walkthrough:**

```javascript
// Step 1: Why AI transparency in the frontend — the AI Policy requires
// users to be clearly informed when interacting with AI-generated content.
// This is a frontend responsibility — the UI must communicate this.

// Step 2: AI disclosure component — used wherever AI-generated content appears
function AIGeneratedBadge({ contentType, modelId }) {
  return (
    <div role="note" aria-label="AI-generated content disclosure" className="ai-badge">
      <span className="ai-badge__icon" aria-hidden="true">🤖</span>
      <span className="ai-badge__text">
        This {contentType} was generated with AI assistance
      </span>
      {/* Step 3: Link to the organisation's AI transparency page */}
      <a href="/ai-transparency" className="ai-badge__link">
        Learn more about our AI use
      </a>
    </div>
  );
}

// Step 4: AI consent gate — collect explicit consent before AI features activate
function AIFeatureGate({ feature, children, onConsent }) {
  const [consented, setConsented] = useState(false);

  if (!consented) {
    return (
      <div role="dialog" aria-label="AI feature consent">
        <p>This feature uses AI to {feature.description}.</p>
        <p>Your input will be processed by {feature.modelProvider}.</p>
        {/* Step 5: Explicit opt-in — not pre-checked, per GDPR requirements */}
        <button onClick={() => { setConsented(true); onConsent(feature.id); }}>
          Enable AI feature
        </button>
        <button onClick={() => window.history.back()}>No thanks</button>
      </div>
    );
  }

  return children;
}
```

**Common pitfalls:**
- Building a frontend AI feature (chatbot, AI-generated content) without ensuring the use case is registered in the AI Register.
- Not implementing the transparency requirements — users must be clearly informed when content is AI-generated or when they are interacting with an AI system.
- Treating the AI Policy as a backend-only concern; frontend design decisions around data collection, user consent, and AI feature presentation are directly governed by the policy.

---

## EU Compliance for Frontend Developers

Senior Frontend Developers in the EU carry direct responsibility for implementing GDPR and ePrivacy compliance at the user interface level. The frontend is where personal data is collected, where consent is obtained, and where transparency obligations are fulfilled — making it the primary enforcement point for many EU regulations. The ePrivacy Directive (and its national implementations) requires that cookies and similar tracking technologies are only set after the user has given informed, specific, and freely-given consent. The GDPR reinforces this with strict requirements for valid consent: it must be an unambiguous affirmative action (no pre-ticked checkboxes), it must be as easy to withdraw as to give, and consent for different purposes must be presented separately.

Cookie consent implementation is one of the most visible compliance obligations for frontend developers. The Transparency and Consent Framework (TCF) 2.2, managed by IAB Europe, provides the industry-standard mechanism for collecting and propagating consent signals across the advertising ecosystem. A senior frontend developer should understand how TCF consent strings are generated, stored, and transmitted to downstream systems. The implementation must ensure that no tracking scripts, analytics pixels, or advertising tags fire before valid consent is obtained for their specific purpose. This requires careful management of script loading order and conditional execution based on the consent state.

GDPR-compliant forms require specific design patterns that go beyond standard UX practices. Every form that collects personal data must clearly state the purpose of collection, identify the data controller, provide a link to the privacy policy, and — where consent is the lawful basis — include an explicit opt-in mechanism. Data minimisation at the form level means collecting only the fields that are strictly necessary for the stated purpose: a newsletter signup should not ask for a phone number, and a claims form should not collect data unrelated to the claim. Frontend developers must also implement field-level validation that prevents over-collection and ensure that optional fields are clearly distinguished from required fields.

The EU AI Act adds transparency obligations that are primarily implemented in the frontend. When users interact with an AI system (such as a chatbot or AI-generated content), they must be clearly informed that they are interacting with AI — not a human. When AI influences decisions that affect users (such as insurance recommendations or claim assessments), the frontend must provide accessible information about how the AI was used and, where applicable, enable the user to request human review. The European Accessibility Act, applicable from June 2025, further requires that all digital interfaces — including consent mechanisms and AI disclosures — are accessible to people with disabilities, conforming to WCAG 2.2 Level AA.

**Code walkthrough:**

```javascript
// GDPR-compliant cookie consent with TCF 2.2 integration
// Ensures no tracking fires before valid consent is obtained

import { useState, useEffect, useCallback } from 'react';

// Purpose IDs as defined by TCF 2.2
const TCF_PURPOSES = {
  STORE_ACCESS: 1,            // Store and/or access information on a device
  BASIC_ADS: 2,               // Select basic ads
  AD_PROFILING: 3,            // Create profiles for personalised advertising
  PERSONALISED_ADS: 4,        // Select personalised ads
  CONTENT_PROFILING: 5,       // Create profiles for personalised content
  PERSONALISED_CONTENT: 6,    // Select personalised content
  AD_PERFORMANCE: 7,          // Measure ad performance
  CONTENT_PERFORMANCE: 8,     // Measure content performance
  MARKET_RESEARCH: 9,         // Understand audiences through statistics
  PRODUCT_DEVELOPMENT: 10,    // Develop and improve services
};

function CookieConsentBanner({ onConsentUpdate }) {
  const [consentState, setConsentState] = useState(null);

  // No tracking scripts load until consent is explicitly given
  // Why: ePrivacy Directive requires consent BEFORE setting non-essential cookies
  const handleAcceptSelected = useCallback((selectedPurposes) => {
    const consent = {
      timestamp: new Date().toISOString(),
      purposes: selectedPurposes,
      version: '2.2',
      // Store consent proof for accountability (GDPR Article 7)
      consentString: generateTCFConsentString(selectedPurposes),
    };
    setConsentState(consent);
    onConsentUpdate(consent);

    // Only NOW activate scripts for consented purposes
    if (selectedPurposes.includes(TCF_PURPOSES.AD_PERFORMANCE)) {
      loadAnalyticsScripts();
    }
  }, [onConsentUpdate]);

  // Reject all must be as easy as accept all (GDPR requirement)
  const handleRejectAll = useCallback(() => {
    const consent = {
      timestamp: new Date().toISOString(),
      purposes: [],  // No purposes consented
      version: '2.2',
    };
    setConsentState(consent);
    onConsentUpdate(consent);
  }, [onConsentUpdate]);

  return (
    <div role="dialog" aria-label="Cookie consent" aria-modal="true">
      <h2>We value your privacy</h2>
      <p>We use cookies for the purposes listed below. Select which you consent to.</p>
      {/* Each purpose must be individually selectable — no bundled consent */}
      {Object.entries(TCF_PURPOSES).map(([name, id]) => (
        <label key={id}>
          {/* No pre-ticked checkboxes — GDPR requires affirmative action */}
          <input type="checkbox" value={id} defaultChecked={false} />
          {name.replace(/_/g, ' ').toLowerCase()}
        </label>
      ))}
      <button onClick={handleRejectAll}>Reject all</button>
      <button onClick={() => handleAcceptSelected(getSelectedPurposes())}>
        Accept selected
      </button>
    </div>
  );
}
```

> **Why it matters:** GDPR consent violations carry penalties of up to 20 million EUR or 4% of global turnover. National data protection authorities across the EU have increasingly targeted cookie consent implementations — with significant fines issued for pre-ticked boxes, dark patterns that make rejection harder than acceptance, and tracking scripts that fire before consent. Frontend developers who implement compliant consent mechanisms, data-minimal forms, and AI transparency disclosures are the first line of defence against regulatory exposure.
