# Frontend Developer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Frontend developers build the user interfaces and client-side experiences that end users interact with directly. The role covers HTML, CSS, JavaScript, component frameworks, accessibility, performance, and browser compatibility.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| HTML / CSS / JS Basics | [freeCodeCamp – Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design-v9/) | Interactive |
| JavaScript | [roadmap.sh – JavaScript](https://roadmap.sh/javascript) | Interactive |
| Frontend Roadmap | [roadmap.sh – Frontend](https://roadmap.sh/frontend) | Interactive |

> **Alternative comprehensive path:** [freeCodeCamp – Full Stack Developer](https://www.freecodecamp.org/learn/full-stack-developer-v9/) is a self-contained curriculum covering HTML, CSS, JavaScript, React, databases, and backend basics. Use this if you prefer one structured track rather than individual resources.

### After completing Beginner you should be able to:

- Explain the purpose of semantic HTML elements and choose the correct element for a given piece of content
- Build a well-structured HTML document that is readable by both browsers and assistive technologies
- Explain how the CSS box model determines the size and spacing of elements on a page
- Apply Flexbox and CSS Grid to create common layout patterns such as navigation bars, card grids, and two-column designs
- Build a responsive web page that adapts its layout to different screen sizes using media queries
- Explain the difference between var, let, and const, and identify when to use each
- Write JavaScript functions that accept parameters, return values, and handle different data types
- Manipulate the DOM by selecting elements, changing their content and styles, and responding to user events
- Explain the difference between synchronous and asynchronous code execution
- Write asynchronous code using promises and async/await to fetch data from an API

For deep explanations of each concept, see the [Beginner Concept Reference](Frontend-Developer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| React | [roadmap.sh – React](https://roadmap.sh/react) | Interactive |
| Front-End Libraries | [freeCodeCamp – Front End Development Libraries](https://www.freecodecamp.org/learn/front-end-development-libraries-v9/) | Interactive |
| TypeScript | [roadmap.sh – TypeScript](https://roadmap.sh/typescript) | Interactive |
| Testing Basics | [How to Test Apps with Jest, Testing Library and Cypress – freeCodeCamp](https://www.freecodecamp.org/news/test-a-react-app-with-jest-testing-library-and-cypress/) (note: Vitest is an increasingly popular alternative to Jest for modern projects) | Article |
| Testing Reference | [React Testing Library – Official Docs](https://testing-library.com/docs/react-testing-library/intro/) | Docs |
| End-to-End Testing | [Playwright – Getting Started](https://playwright.dev/docs/intro) | Docs |
| APIs (REST / GraphQL) | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| GraphQL | [GraphQL Foundations – Pluralsight](https://www.pluralsight.com/courses/graphql-foundations) | Course |
| System Design Basics | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| MDN Reference | [MDN Web Docs](https://developer.mozilla.org) | Docs |
| Web Security | [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Scripting_Prevention_Cheat_Sheet.html) | Docs |
| CSS Tooling | [Tailwind CSS Documentation](https://tailwindcss.com/docs) | Docs |
| Routing | [React Router – Tutorial](https://reactrouter.com/en/main/start/tutorial) | Docs |
| Forms and Validation | [React Hook Form](https://react-hook-form.com/get-started) + [Zod](https://zod.dev/) | Docs |

### After completing Mid you should be able to:

- Build React applications using functional components, passing data through props, and managing local state with useState
- Explain the component lifecycle and apply useEffect correctly to synchronise side effects such as data fetching and subscriptions
- Use useContext to share state across a component tree without prop drilling
- Write custom React hooks to encapsulate and reuse stateful logic across components
- Apply TypeScript types and interfaces to React props, function signatures, and API response shapes
- Use TypeScript generics to write reusable, type-safe utility functions and components
- Write unit tests for JavaScript functions using Jest and assert expected outcomes
- Write component tests using React Testing Library that interact with the UI the way a user would
- Write end-to-end tests with Playwright that cover critical user journeys in a running application
- Consume a REST API from a React application, handle loading and error states, and display the retrieved data
- Write and execute GraphQL queries and mutations from a frontend client, and explain the key differences from REST
- Identify common frontend system design concerns such as component composition, data flow direction, and performance trade-offs
- Identify common frontend security vulnerabilities (XSS, CSRF) and apply appropriate mitigations
- Explain the differences between client-side rendering, server-side rendering, and static site generation

For deep explanations of each concept, see the [Mid Concept Reference](Frontend-Developer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Web Performance | [web.dev – Learn Performance](https://web.dev/learn/performance) | Interactive |
| Accessibility | [web.dev – Learn Accessibility](https://web.dev/learn/accessibility) | Interactive |
| Advanced AI Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| API Design | [Design APIs Like a Senior Engineer](https://www.youtube.com/watch?v=7iHl71nt49o) | Video |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| Next.js / SSR | [Next.js – Getting Started](https://nextjs.org/docs/getting-started) | Docs |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Explain the three Core Web Vitals (LCP, INP, CLS), what each measures, and what a good score looks like
- Identify performance bottlenecks in a web application using browser DevTools and Lighthouse
- Apply lazy loading and code splitting to reduce the initial bundle size and improve load time
- Explain caching strategies for static assets and API responses, and choose an appropriate strategy for a given scenario
- Apply WCAG success criteria to audit a user interface and identify accessibility failures
- Use ARIA roles and attributes correctly to communicate the purpose and state of interactive components to assistive technologies
- Build and run an automated accessibility audit using available tooling, interpret the results, and prioritise fixes
- Evaluate API design decisions from a frontend perspective, including versioning, error response shapes, and pagination strategies
- Apply domain-driven design concepts to organise a frontend codebase around business domains rather than technical layers
- Compare architecture patterns such as micro-frontends, monorepo organisation, and feature-based folder structures, and justify a choice for a given project context
- Identify practical ways to integrate AI-assisted development tools into a daily frontend engineering workflow to improve productivity and code quality
- Apply AI governance requirements (Secure AI Framework, AI Policy, AI Checklist) when building frontend applications that integrate AI features

For deep explanations of each concept, see the [Senior Concept Reference](Frontend-Developer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
