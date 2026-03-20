# Frontend Developer – Mid Concept Reference


## React – Components, Props and State

React is a JavaScript library for building user interfaces through a component-based model. A component is a self-contained unit that encapsulates a piece of the UI — its structure, its styles, and the logic that drives it. You compose components together to build complex interfaces from simple building blocks.

**Components** in modern React are functions that return JSX — a syntax extension that looks like HTML but is transpiled to JavaScript. A component's name must start with a capital letter so React can distinguish it from a plain HTML element.

**Props** (short for properties) are the mechanism by which a parent component passes data down to a child component. They are read-only from the child's perspective — a component must never modify its own props. Props make components reusable: the same `Button` component can render different labels and trigger different actions depending on the props it receives.

**State** is data managed inside a component that can change over time. When state changes, React re-renders the component to reflect the new data. State represents things that are specific to a single instance of a component and that the user or the application can change — for example, whether a dropdown is open, or the current value of a form field.

**Code walkthrough:**

```javascript
// Step 1: Why components — they encapsulate UI + logic into reusable pieces
// Each component is a function that returns JSX (HTML-like syntax)
import { useState } from 'react';

// Step 2: Props are READ-ONLY inputs from the parent
// Destructuring in the parameter makes the API explicit
function CampaignCard({ name, budget, onSelect }) {
  // Step 3: State is data that changes over time and triggers re-renders
  // useState returns [currentValue, setterFunction]
  const [isExpanded, setIsExpanded] = useState(false);

  // Step 4: Event handlers call the setter to update state
  // React re-renders this component when state changes
  const handleToggle = () => {
    setIsExpanded((prev) => !prev); // Use functional form when based on previous state
  };

  return (
    // Step 5: JSX must have a single root — use Fragment (<>...</>) to avoid extra DOM nodes
    <>
      <div className="campaign-card">
        <h3>{name}</h3>
        <p>Budget: ${budget.toLocaleString()}</p>
        <button onClick={handleToggle}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        {/* Step 6: Conditional rendering — only show details when expanded */}
        {isExpanded && <p>Full campaign details here...</p>}
        {/* Step 7: Communicating upward — parent passes a callback as a prop */}
        <button onClick={() => onSelect(name)}>Select</button>
      </div>
    </>
  );
}

// Step 8: The parent composes children and passes data down via props
function CampaignList() {
  const campaigns = [
    { id: 1, name: 'Summer Sale', budget: 50000 },
    { id: 2, name: 'Brand Awareness', budget: 30000 },
  ];

  const handleSelect = (campaignName) => {
    console.log(`Selected: ${campaignName}`);
  };

  return (
    <div>
      {/* Step 9: List rendering — key must be a stable, unique identifier
          Using index as key causes bugs when items are reordered or deleted */}
      {campaigns.map((c) => (
        <CampaignCard key={c.id} name={c.name} budget={c.budget} onSelect={handleSelect} />
      ))}
    </div>
  );
}
```

**Why it matters:** Components, props, and state are the core mental model of React. Every pattern you learn later — hooks, context, Redux — is built on top of this foundation.

**Key things to understand:**

- Data flows downward (from parent to child through props) by default. To communicate upward, a parent passes a callback function as a prop that the child calls.
- Lifting state up means moving state to the closest common ancestor of all components that need it, so it can be passed down as props.
- JSX expressions must have a single root element. If you do not want to add an extra DOM node, use a Fragment (`<>...</>`).

**Common pitfalls:**

- Mutating state directly (e.g. `state.items.push(x)`) instead of creating a new value — React will not detect the change and will not re-render.
- Passing too many props through too many levels of components (prop drilling), which can be addressed with context or state management libraries.

**A note on forms:** Managing form state — tracking input values, validating fields, and handling submission — can become complex as forms grow. For form-heavy applications, libraries like React Hook Form simplify state management and validation for complex forms by reducing re-renders and providing a declarative API for validation rules.

---

## React – Hooks (useState, useEffect, useContext, custom hooks)

Hooks are functions that let you use React features — state, side effects, context — inside functional components. They were introduced to replace class components and have become the standard way to write React code.

**useState** returns a state variable and a setter function. The setter replaces the current state value and triggers a re-render. When the new state depends on the previous state, pass a function to the setter: `setState(prev => prev + 1)`.

**useEffect** runs a side effect after the component renders. Side effects include data fetching, subscriptions, and manually modifying the DOM. The second argument is a dependency array — the effect only re-runs when one of the listed dependencies changes. An empty array means the effect runs once after the initial render. The function can return a cleanup function that runs before the next effect or when the component unmounts.

**useContext** reads the value of a React context. Context provides a way to share a value (such as the currently logged-in user or a theme) across a component tree without passing props at every level. You create a context with `React.createContext`, provide a value with a `Provider` component, and consume it with `useContext`.

**Custom hooks** are functions whose names start with `use` and that call other hooks internally. They let you extract and reuse stateful logic across components. For example, a `useFetch` hook could encapsulate the state and effect logic for making an API request.

**Code walkthrough:**

```javascript
import { useState, useEffect, useContext, createContext } from 'react';

// --- Custom Hook: useFetch ---
// Step 1: Why custom hooks — extract reusable stateful logic
// Any component that needs to fetch data can use this instead of duplicating code
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Step 2: AbortController cancels the fetch if the component unmounts
    // Without this, setting state on an unmounted component causes a memory leak
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    // Step 3: Cleanup function runs on unmount OR when url changes
    return () => controller.abort();
  }, [url]); // Step 4: url in dependency array — re-fetch when URL changes

  return { data, loading, error };
}

// --- Context API ---
// Step 5: Why Context — share values across the tree without prop drilling
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    // Step 6: Provider wraps the tree and passes the value down
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

function Dashboard() {
  // Step 7: useContext reads the nearest Provider's value
  // No need to pass theme through every intermediate component
  const { theme, setTheme } = useContext(ThemeContext);
  const { data, loading, error } = useFetch('/api/campaigns');

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

**Why it matters:** Hooks are the primary tool for managing behaviour in React components. Mastering them allows you to write clean, composable, and testable component logic.

**Key things to understand:**

- Hooks must be called at the top level of a component or custom hook — never inside loops, conditions, or nested functions.
- The dependency array of `useEffect` must include every reactive value the effect uses, or you risk stale closures and subtle bugs.
- `useCallback` and `useMemo` are performance hooks that memoize functions and computed values; use them when you have measured a performance problem, not preemptively.

**Common pitfalls:**

- Omitting dependencies from the `useEffect` dependency array, causing the effect to read stale values.
- Including objects or arrays as dependencies without memoising them, causing the effect to re-run on every render because a new object is created each time.
- Fetching data inside `useEffect` without handling the case where the component unmounts before the fetch completes, causing state updates on unmounted components.

---

## TypeScript – Types, Interfaces and Generics

TypeScript is a superset of JavaScript that adds a static type system. TypeScript code is compiled to plain JavaScript before it runs in the browser. The type system exists only at development time — it catches errors before your code runs rather than at runtime.

**Types** in TypeScript can be primitive (`string`, `number`, `boolean`), composite (`string[]` for an array of strings, `[string, number]` for a tuple), or union types (`string | null` meaning a value is either a string or null). You can also use literal types to restrict a value to a specific set of allowed values, for example `'asc' | 'desc'`.

**Interfaces** describe the shape of an object. They define what properties an object must have and what types those properties must be. Interfaces can extend other interfaces. In React, interfaces are commonly used to define the expected props of a component.

**Generics** allow you to write code that works with a variety of types while remaining type-safe. A generic function or component takes a type parameter (conventionally written as `T`) and uses it in its signature. For example, a `useState` call can be typed as `useState<User | null>(null)` so TypeScript knows the state holds either a `User` object or null.

**Code walkthrough:**

```typescript
// Step 1: Why interfaces for props — they define the contract between
// parent and child, and TypeScript catches mismatches at compile time
interface Campaign {
  id: number;
  name: string;
  budget: number;
  status: 'active' | 'paused' | 'completed'; // Literal union type
}

// Step 2: Component props interface — makes the expected API explicit
interface CampaignTableProps {
  campaigns: Campaign[];
  onSelect: (campaign: Campaign) => void;
  showBudget?: boolean; // Optional prop — defaults to undefined
}

// Step 3: Typing the component function with its props interface
// TypeScript will error if a parent passes the wrong prop types
function CampaignTable({ campaigns, onSelect, showBudget = true }: CampaignTableProps) {
  return (
    <table>
      <tbody>
        {campaigns.map((campaign) => (
          <tr key={campaign.id} onClick={() => onSelect(campaign)}>
            <td>{campaign.name}</td>
            <td>{campaign.status}</td>
            {/* Step 4: TypeScript knows showBudget is boolean here */}
            {showBudget && <td>${campaign.budget.toLocaleString()}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Step 5: Typing useState — explicitly set the type when inference is insufficient
import { useState } from 'react';

function useCampaignSelection() {
  // Without the generic, TypeScript infers 'null' — not 'Campaign | null'
  const [selected, setSelected] = useState<Campaign | null>(null);

  // Step 6: Type narrowing — check for null before accessing properties
  const selectedName = selected?.name ?? 'None selected';

  return { selected, setSelected, selectedName };
}
```

**Why it matters:** TypeScript catches a large class of bugs at compile time — wrong prop types, missing properties, calling methods on null — that would otherwise only surface at runtime or in production.

**Key things to understand:**

- Type inference means TypeScript can often work out the type of a value without an explicit annotation. You only need to annotate when inference is incorrect or insufficiently specific.
- The `unknown` type is the type-safe alternative to `any`. A value of type `unknown` cannot be used until you narrow its type with a check.
- Type assertions (`value as SomeType`) tell the compiler to treat a value as a specific type. Use them sparingly and only when you are certain, because they bypass type checking.

**Common pitfalls:**

- Reaching for `any` when a type is difficult to express, which silences type errors rather than solving them.
- Writing overly complex types early in a project rather than letting TypeScript infer where possible.
- Confusing interfaces and type aliases — they are mostly interchangeable for object shapes, but interfaces can be extended more naturally and are generally preferred for public API contracts.

---

## Front-End Libraries (Redux for state management, component libraries)

As React applications grow, managing state that must be shared across many parts of the application becomes difficult with component state and context alone. State management libraries and component libraries are the two most common categories of third-party tools that address this.

**Redux** is a predictable state container. It stores the entire application state in a single object (the store). State can only be changed by dispatching actions — plain objects that describe what happened. Reducer functions specify how the state changes in response to each action. Redux Toolkit is the modern, recommended way to use Redux; it reduces boilerplate and includes utilities like `createSlice` and `createAsyncThunk`.

The Redux data flow is: a component dispatches an action, the reducer processes it and returns new state, the store updates, and all subscribed components re-render with the new state. This unidirectional flow makes state changes predictable and easy to trace.

**Code walkthrough:**

```javascript
// Step 1: Why Redux Toolkit — it reduces the boilerplate of raw Redux
// createSlice generates action creators and reducer functions automatically
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Step 2: A "slice" defines a piece of state, its reducers, and actions
const campaignSlice = createSlice({
  name: 'campaigns',
  initialState: { items: [], filter: 'all' },
  reducers: {
    // Step 3: Reducers look like mutations but use Immer under the hood
    // so the state update is actually immutable — Redux requires immutability
    addCampaign(state, action) {
      state.items.push(action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Step 4: createSlice auto-generates action creators matching reducer names
export const { addCampaign, setFilter } = campaignSlice.actions;

// Step 5: The store holds ALL application state in one place
const store = configureStore({ reducer: { campaigns: campaignSlice.reducer } });

// Step 6: useSelector reads state; useDispatch sends actions
function CampaignDashboard() {
  const campaigns = useSelector((state) => state.campaigns.items);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(addCampaign({ id: 1, name: 'New Campaign' }))}>
        Add Campaign
      </button>
      <p>Total: {campaigns.length}</p>
    </div>
  );
}
```

**Component libraries** such as Material UI, Ant Design, and Chakra UI provide pre-built, styled, and accessible UI components — buttons, modals, tables, form controls — that you can compose into an application. Using a component library speeds up development and ensures a consistent visual language. The trade-off is that heavy customisation can sometimes be more complex than building components from scratch.

**Why it matters:** Understanding when to use a state management library (and when not to) is an important skill. Many applications can get by with local state and context; Redux adds complexity and should be introduced when that complexity is justified by the scale of the state management problem.

**Key things to understand:**

- Server state (data fetched from an API) and client state (UI state like which tab is active) have different characteristics and are often better managed by different tools. Libraries like TanStack Query (formerly React Query) manage server state specifically.
- Redux DevTools allow you to inspect every action dispatched and the resulting state, and to travel back in time to a previous state.

**Common pitfalls:**

- Adding Redux to a small application where local state and context would suffice, adding unnecessary complexity.
- Storing derived data in the Redux store when it can be calculated from existing state inside a selector.

---

## Build Tools and Package Management

Modern frontend development relies on a set of tools that manage dependencies, transform source code, and bundle it for the browser.

**npm** (Node Package Manager) is the default package manager for Node.js and the primary way to install third-party libraries. The `package.json` file at the root of a project lists its dependencies, scripts, and metadata. Running `npm install` reads `package.json` and downloads all listed packages into a `node_modules` folder. Yarn is a popular alternative to npm that offers the same core functionality with some differences in performance and lock file format.

**Vite** is the modern build tool for React projects. It provides a fast development server with hot module replacement (instant feedback when you change a file) and an optimised production build powered by Rollup. When you create a new React project today, Vite is the recommended starting point. Understanding what a build tool does — transforming JSX and TypeScript into plain JavaScript, resolving imports, and producing optimised bundles — helps you debug issues and configure your project effectively.

Before setting up a React project, make sure you understand: how `package.json` describes a project and its dependencies, how `npm install` and `npm run` work, and what module bundling does (combining many source files into a smaller number of optimised files for the browser).

**Code walkthrough:**

```json5
// Step 1: package.json — the manifest that describes your project
// Every frontend project starts here
{
  "name": "campaign-dashboard",
  "private": true,
  "scripts": {
    // Step 2: Scripts define commands you run with 'npm run <name>'
    "dev": "vite",                    // Start dev server with hot reload
    "build": "tsc && vite build",     // Type-check then bundle for production
    "preview": "vite preview",        // Preview production build locally
    "test": "vitest",                 // Run tests
    "lint": "eslint src/"             // Check code quality
  },
  "dependencies": {
    // Step 3: Dependencies ship to users — keep these minimal
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    // Step 4: devDependencies are build/test tools — NOT shipped to users
    // This distinction affects production bundle size
    "@types/react": "^18.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vitest": "^2.0.0",
    "eslint": "^9.0.0"
  }
}
```

---

## Testing – Unit Tests and Component Tests (Jest, Vitest, React Testing Library)

Testing gives you confidence that your code does what you intend. Unit tests verify isolated pieces of logic. Component tests verify that a UI component renders and behaves correctly from the perspective of a user.

**Jest** is a JavaScript testing framework. It provides test organisation (`describe`, `it`/`test`), assertion methods (`expect(value).toBe(expected)`), and mocking capabilities. Jest runs in Node.js, so it does not have a real browser DOM — instead it uses a simulated DOM provided by jsdom. **Vitest** is a newer alternative that offers the same API surface as Jest but is built on top of Vite, providing faster test execution and native support for ES modules and TypeScript. Vitest is increasingly popular for projects that already use Vite as their build tool.

**React Testing Library (RTL)** provides utilities for rendering React components and interacting with them in tests. It is commonly used alongside a test runner such as Jest or Vitest. The core philosophy of RTL is to test components the way a user would use them — by querying for elements by their visible text, label, or role rather than by implementation details like CSS class names or component state. Key queries include `getByRole`, `getByLabelText`, and `getByText`. Interaction utilities like `userEvent.click` and `userEvent.type` simulate real browser events.

**Code walkthrough:**

```javascript
// Step 1: Why React Testing Library — it tests components the way users
// interact with them, not by inspecting internal state or implementation
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CampaignForm from './CampaignForm';

describe('CampaignForm', () => {
  it('submits the form with the entered campaign name', async () => {
    // Step 2: vi.fn() creates a mock function that records calls
    const handleSubmit = vi.fn();
    render(<CampaignForm onSubmit={handleSubmit} />);

    // Step 3: getByRole queries by ARIA role — resilient to markup changes
    // and encourages accessible component design
    const input = screen.getByRole('textbox', { name: /campaign name/i });
    const submitButton = screen.getByRole('button', { name: /create/i });

    // Step 4: userEvent simulates real user behaviour (typing, clicking)
    await userEvent.type(input, 'Summer Sale 2026');
    await userEvent.click(submitButton);

    // Step 5: Assert on observable behaviour, not internal state
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'Summer Sale 2026' });
  });

  it('shows validation error for empty name', async () => {
    render(<CampaignForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole('button', { name: /create/i }));

    // Step 6: findByRole is async — it waits for the element to appear
    // Use it for content that renders after state updates
    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Campaign name is required');
  });
});
```

**Why it matters:** Tests catch regressions — changes that break existing behaviour — before they reach users. Component tests are especially valuable because they verify the integration between your component logic and its rendered output.

**Key things to understand:**

- Prefer `getByRole` over `getByTestId`. Querying by role encourages accessible component design and makes tests more resilient to markup changes.
- Mocking allows you to replace real implementations (such as API calls) with controlled fakes during testing. Jest provides `jest.fn()` for mock functions and `jest.mock()` for mocking entire modules.
- `async` assertions require `await` combined with RTL's `waitFor` or `findBy` queries, which poll until the element appears or a timeout expires.

**Common pitfalls:**

- Testing implementation details (which internal function was called, what the component's state value is) rather than observable behaviour. This makes tests fragile and expensive to maintain.
- Not cleaning up after tests — RTL does this automatically, but global state (such as mocked modules) must be reset between tests.
- Writing tests so tightly coupled to a specific DOM structure that any refactor breaks dozens of tests even though behaviour is unchanged.

---

## Testing – End-to-End Tests (Playwright)

End-to-end (E2E) tests run a real browser and exercise a real application from the user's point of view. They verify that the entire system — frontend, backend, database — works together correctly for critical user journeys.

**Playwright** is a browser automation library developed by Microsoft. It supports Chromium, Firefox, and WebKit (Safari). Tests are written in JavaScript or TypeScript. You use a `Page` object to navigate to a URL, interact with elements (click, type, select), and make assertions about what is visible.

A typical Playwright test navigates to a page, fills in a form, submits it, and then asserts that the expected outcome appears on the screen. Playwright provides auto-waiting: before interacting with an element, it waits until the element is visible, stable, and ready to receive input.

Playwright also supports API testing (making HTTP requests and asserting on responses), network interception (mocking API responses in browser tests), and screenshot/video capture for debugging.

**Code walkthrough:**

```javascript
// Step 1: Why Playwright — it runs REAL browsers and auto-waits for elements,
// eliminating the flaky sleep-based waits that plague older E2E frameworks
import { test, expect } from '@playwright/test';

test.describe('Campaign creation flow', () => {
  test('user can create a new campaign', async ({ page }) => {
    // Step 2: Navigate to the page — Playwright waits for network idle
    await page.goto('/campaigns');

    // Step 3: getByRole is the preferred locator — matches accessibility roles
    // and is resilient to CSS class or DOM structure changes
    await page.getByRole('button', { name: 'New Campaign' }).click();

    // Step 4: Fill the form using accessible label selectors
    await page.getByLabel('Campaign name').fill('Q3 Retargeting');
    await page.getByLabel('Budget').fill('25000');
    await page.getByRole('button', { name: 'Create' }).click();

    // Step 5: Playwright auto-waits for the assertion to become true
    // No need for explicit waits or sleep statements
    await expect(page.getByText('Q3 Retargeting')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText('Campaign created');
  });

  test('shows error for duplicate campaign name', async ({ page }) => {
    // Step 6: Mock the API response to simulate a server-side error
    // This isolates the frontend test from backend state
    await page.route('/api/campaigns', (route) => {
      route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Campaign name already exists' }),
      });
    });

    await page.goto('/campaigns/new');
    await page.getByLabel('Campaign name').fill('Existing Campaign');
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByRole('alert')).toHaveText('Campaign name already exists');
  });
});
```

**Why it matters:** Unit and component tests run in isolation and cannot catch integration failures — a mismatch between the frontend's assumptions and the backend's actual behaviour. E2E tests cover the gaps.

**Key things to understand:**

- E2E tests are slower and more brittle than unit tests. Limit them to the most critical user journeys (login, checkout, data creation) and rely on unit and component tests for edge cases.
- Playwright's `locator` API is the preferred way to find elements. It supports accessibility-friendly selectors like `page.getByRole('button', { name: 'Submit' })`.
- Tests should be independent and able to run in any order. Use Playwright fixtures and setup/teardown hooks to create the necessary test data and clean up afterwards.

**Common pitfalls:**

- Using fragile selectors based on CSS classes or DOM structure that break whenever the UI is refactored.
- Writing E2E tests for every scenario instead of reserving them for user journeys and covering fine-grained logic with unit tests.
- Not running E2E tests in a realistic environment — tests that pass against a mocked backend but fail in production provide false confidence.

---

## REST APIs – Consuming and Handling Responses

A REST API (Representational State Transfer) is an architectural style for exposing data and operations over HTTP. A frontend application consumes a REST API by making HTTP requests to specific URLs (endpoints) and handling the JSON responses.

The browser's built-in `fetch` function is the standard way to make HTTP requests from JavaScript. You pass it a URL and an optional configuration object specifying the HTTP method (`GET`, `POST`, `PUT`, `DELETE`), headers (such as `Authorization` and `Content-Type`), and request body. `fetch` returns a promise that resolves to a `Response` object. You then call `response.json()` to parse the body as JSON — this is itself asynchronous.

HTTP status codes communicate the outcome of a request. `2xx` codes indicate success. `4xx` codes indicate a client error (the request was malformed or unauthorised). `5xx` codes indicate a server error. Important detail: `fetch` only rejects its promise for network failures, not for `4xx` or `5xx` responses. You must check `response.ok` (a boolean that is true for `2xx` status codes) manually.

**Code walkthrough:**

```javascript
import { useState, useEffect } from 'react';

// Step 1: Why a dedicated hook for API calls — it encapsulates
// loading, error, and data states that EVERY API consumer needs
function useApiGet(endpoint) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(endpoint, {
      signal: controller.signal,
      headers: {
        // Step 2: Authorization header carries the bearer token
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      },
    })
      .then((res) => {
        // Step 3: fetch does NOT reject on 4xx/5xx — you MUST check manually
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [endpoint]);

  return state;
}

// Step 4: Why you must handle all three states in the UI
function CampaignList() {
  const { data, loading, error } = useApiGet('/api/campaigns?page=1&limit=20');

  // Step 5: Loading state — show feedback while the request is in flight
  if (loading) return <p aria-busy="true">Loading campaigns...</p>;
  // Step 6: Error state — display a meaningful message, not a blank screen
  if (error) return <p role="alert">Failed to load campaigns: {error}</p>;
  // Step 7: Success state — render the data
  return (
    <ul>
      {data.campaigns.map((c) => (
        <li key={c.id}>{c.name} — ${c.budget.toLocaleString()}</li>
      ))}
    </ul>
  );
}
```

**Why it matters:** Almost every frontend application communicates with a backend API. Correctly handling loading states, success states, and error states is essential for a good user experience.

**Key things to understand:**

- Authentication is most commonly handled by including a bearer token in the `Authorization` header of each request.
- CORS (Cross-Origin Resource Sharing) is a browser security mechanism that prevents a frontend on one origin from making requests to an API on a different origin unless the API explicitly allows it.
- Pagination is commonly implemented with query parameters — the frontend passes a page number or cursor, and the API returns a subset of the data along with information about whether more pages exist.

**Common pitfalls:**

- Not checking `response.ok` and treating every response as a success, causing silent failures when the server returns a `404` or `500`.
- Not handling the loading and error states in the UI, leaving users with no feedback while a request is in flight or when it fails.
- Storing sensitive tokens in `localStorage` where they are accessible to JavaScript — `httpOnly` cookies are the more secure alternative.

---

## GraphQL – Queries, Mutations and the Differences from REST

GraphQL is a query language for APIs and a runtime for executing those queries. Unlike REST, where the server defines a set of fixed endpoints each returning a fixed data shape, GraphQL exposes a single endpoint and allows the client to specify exactly what data it needs in each request.

A **query** is a read operation. The client writes a query document describing the fields it wants, and the server returns a JSON object with exactly those fields — no more, no less. This eliminates over-fetching (receiving more data than needed) and under-fetching (needing to make multiple requests to assemble required data).

A **mutation** is a write operation — creating, updating, or deleting data. Like queries, mutations specify what fields should be returned after the operation completes.

A **schema** defines the types available in the API and the queries and mutations that can be performed on them. The schema is the contract between the frontend and backend.

On the client side, libraries like Apollo Client manage sending GraphQL requests, caching responses, and providing hooks (such as `useQuery` and `useMutation`) that integrate with React's rendering model.

**Code walkthrough:**

```javascript
// Step 1: Why GraphQL with Apollo — you request exactly the fields you need,
// eliminating over-fetching and reducing payload size for mobile users
import { gql, useQuery, useMutation } from '@apollo/client';

// Step 2: Define the query — only request the fields this component needs
// Unlike REST, the server returns EXACTLY this shape, nothing more
const GET_CAMPAIGNS = gql`
  query GetCampaigns($status: String!) {
    campaigns(status: $status) {
      id
      name
      budget
      performance {
        impressions
        clicks
      }
    }
  }
`;

const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: ID!, $budget: Float!) {
    updateCampaign(id: $id, budget: $budget) {
      id
      budget
    }
  }
`;

function CampaignDashboard() {
  // Step 3: useQuery handles loading, error, and data states automatically
  const { data, loading, error } = useQuery(GET_CAMPAIGNS, {
    variables: { status: 'active' },
  });

  // Step 4: useMutation returns a trigger function and status
  const [updateBudget, { loading: updating }] = useMutation(UPDATE_BUDGET, {
    // Step 5: refetchQueries refreshes the cache after mutation
    refetchQueries: [{ query: GET_CAMPAIGNS, variables: { status: 'active' } }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.campaigns.map((c) => (
        <li key={c.id}>
          {c.name} — {c.performance.clicks}/{c.performance.impressions} clicks
          <button
            disabled={updating}
            onClick={() => updateBudget({ variables: { id: c.id, budget: c.budget * 1.1 } })}
          >
            Increase Budget 10%
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**Why it matters:** GraphQL is widely used in modern frontend development. Understanding its concepts allows you to work with APIs that use it and to evaluate when it is the right choice over REST.

**Key things to understand:**

- GraphQL requests are typically sent over HTTP as `POST` requests, even for read operations (queries).
- The schema is introspectable — tools can query the schema itself to discover available types and operations, enabling powerful tooling like auto-completion in editors.
- GraphQL does not automatically solve N+1 query problems on the server side; that requires additional patterns like DataLoader.

**Common pitfalls:**

- Requesting every available field in a query (effectively treating it like a REST endpoint), which eliminates the bandwidth advantages of GraphQL.
- Confusing GraphQL's single endpoint with a lack of structure — the schema provides strong typing and clear contracts.
- Assuming GraphQL is always better than REST — for simple, resource-oriented APIs with stable data shapes, REST is often simpler.

---

## System Design Basics for Frontend (component architecture, data flow, performance considerations)

System design for frontend engineers is about making deliberate decisions on how to structure a UI application so that it remains maintainable, performant, and understandable as it grows. Unlike backend system design (which focuses on servers and databases), frontend system design focuses on component architecture, data flow, and browser performance.

**Component architecture** is the practice of deciding how to decompose a UI into components. Presentational (or "dumb") components focus on rendering; they receive props and produce output with no knowledge of where the data comes from. Container (or "smart") components manage state and data fetching and pass data down to presentational components. Feature-based organisation groups all files related to a feature — components, hooks, styles, tests — together rather than grouping by type.

**Data flow** refers to how state is managed and how it moves through the application. Local state lives in a single component. Shared state must be lifted to a common ancestor or moved into a global store. Choosing the right level for each piece of state is a key architectural decision. Unidirectional data flow — where data moves in a predictable direction and UI reflects state — makes applications easier to reason about.

**Performance considerations** at the design stage include: avoiding unnecessarily large component trees that re-render frequently; choosing when to split code into separate bundles so the initial load is smaller; and deciding how data is fetched — at the page level or within individual components — to avoid request waterfalls.

**Code walkthrough:**

```javascript
// Step 1: Why useMemo — prevent expensive recalculations on every render
// Only recalculate when the dependency (campaigns or filter) actually changes
import { useState, useMemo, useCallback, lazy, Suspense } from 'react';

function CampaignDashboard({ campaigns }) {
  const [filter, setFilter] = useState('active');

  // Step 2: useMemo caches the filtered result between renders
  // Without it, the filter runs on EVERY render even if campaigns hasn't changed
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => c.status === filter);
  }, [campaigns, filter]);

  // Step 3: useCallback caches the function reference between renders
  // This prevents child components from re-rendering when the parent does
  const handleSelect = useCallback((id) => {
    console.log('Selected campaign:', id);
  }, []);

  return (
    <div>
      <FilterBar onChange={setFilter} />
      {/* Step 4: React.memo on CampaignCard skips re-render if props haven't changed
          Combined with useCallback for handleSelect, this prevents unnecessary renders */}
      {filteredCampaigns.map((c) => (
        <CampaignCard key={c.id} campaign={c} onSelect={handleSelect} />
      ))}
    </div>
  );
}

// Step 5: Why code splitting — only load code for routes the user visits
// The Analytics page bundle is NOT downloaded until the user navigates there
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));

function AppRouter() {
  return (
    // Step 6: Suspense shows a fallback while the lazy component loads
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Suspense>
  );
}
```

**Why it matters:** Individual components that work correctly can still combine into an application that is slow, hard to maintain, or confusing. System design thinking bridges the gap between writing correct code and building a good product.

**Key things to understand:**

- There is no single correct architecture. The right structure depends on the size of the team, the complexity of the domain, and the rate of change in requirements.
- Premature optimisation is a risk — reach for complexity only when you have evidence (measured performance data or clear scaling requirements) that simpler approaches are insufficient.

**Common pitfalls:**

- Designing everything as global state, making it difficult to understand what affects what.
- Creating deeply nested component hierarchies that make data flow and debugging difficult.
- Neglecting to discuss data fetching strategy at the design stage, resulting in request waterfalls or redundant API calls discovered late in development.

---

## Frontend Security — XSS, CSRF and Content Security Policy

Frontend security is the practice of protecting web applications from attacks that exploit the client-side code running in the user's browser. While backend security focuses on protecting servers and databases, frontend security addresses a different attack surface: the browser, the DOM, cookies, and the interaction between the user's browser and external resources.

The three most important frontend security concepts are Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and Content Security Policy (CSP). Understanding these is essential because frontend developers are the first line of defence — the code you write determines whether user input is handled safely and whether the application is vulnerable to injection attacks.

**Why it matters:** A single XSS vulnerability can allow an attacker to steal user session tokens, redirect users to phishing sites, or modify the page content to trick users into revealing sensitive information. For an insurance company handling personal and financial data, frontend security vulnerabilities are a direct path to data breaches and regulatory penalties.

**Key things to understand:**

- Cross-Site Scripting (XSS): occurs when an attacker injects malicious JavaScript that executes in another user's browser. Three types: Stored XSS (malicious script saved in the database and served to other users), Reflected XSS (malicious script in a URL parameter reflected in the page), DOM-based XSS (malicious script manipulates the client-side DOM directly).
- React's built-in protection: React escapes values embedded in JSX by default, preventing most XSS attacks. However, `dangerouslySetInnerHTML` bypasses this protection — never use it with untrusted data. Links with `javascript:` protocol and dynamic `href` values are also attack vectors.
- Cross-Site Request Forgery (CSRF): tricks an authenticated user's browser into making unwanted requests to a site where they are logged in. Mitigations: CSRF tokens (synchroniser tokens), SameSite cookie attribute, checking the Origin header.
- Content Security Policy (CSP): an HTTP header that tells the browser which sources of content (scripts, styles, images, fonts) are allowed. CSP prevents XSS by blocking inline scripts and restricting script sources to trusted domains. Start with a report-only policy to identify violations before enforcing.
- Secure cookies: session cookies should always be set with HttpOnly (not accessible via JavaScript), Secure (only sent over HTTPS), and SameSite=Strict or SameSite=Lax (prevents CSRF). Frontend developers should understand these attributes even though they are typically set by the backend.
- Input sanitisation vs output encoding: sanitise input when you must accept HTML (rich text editors), and always encode output when rendering user-provided content. Libraries like DOMPurify sanitise HTML safely.

**Code walkthrough:**

```javascript
import DOMPurify from 'dompurify';

// Step 1: Why React is mostly safe by default — JSX auto-escapes values
function SafeComponent({ userInput }) {
  // This is SAFE — React escapes the string, so <script> tags render as text
  return <p>{userInput}</p>;
}

// Step 2: Why dangerouslySetInnerHTML is dangerous — it bypasses React's escaping
// Only use it with sanitised content, NEVER with raw user input
function RichContent({ htmlContent }) {
  // Step 3: DOMPurify strips all dangerous HTML (scripts, event handlers)
  const sanitised = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitised }} />;
}

// Step 4: Why href values are an attack vector — javascript: protocol bypasses XSS protection
function UserLink({ url, label }) {
  // Validate that the URL is http/https — block javascript: protocol
  const safeUrl = /^https?:\/\//i.test(url) ? url : '#';
  return (
    // Step 5: rel="noopener noreferrer" prevents tabnapping attacks
    // The opened page cannot access window.opener to redirect this page
    <a href={safeUrl} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

// Step 6: Content Security Policy header — set by the server
// This tells the browser which script/style sources are allowed
// CSP blocks inline scripts even if an XSS vulnerability exists
// Example header (typically set in your web server or CDN config):
// Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
```

**Common pitfalls:**

- Assuming React prevents all XSS — `dangerouslySetInnerHTML`, URL injection via `href`, and third-party libraries that manipulate the DOM directly can all introduce XSS vulnerabilities.
- Not setting a Content Security Policy because "our app works without it" — CSP is a defence-in-depth measure that limits the damage if an XSS vulnerability is exploited.
- Using `target="_blank"` on links without `rel="noopener noreferrer"` — the opened page can access `window.opener` and redirect the original page (tabnapping).
- Storing sensitive data (tokens, personal data) in localStorage, which is accessible to any JavaScript on the page including XSS payloads. Use HttpOnly cookies for session tokens.

---

## CSS Architecture and Tooling

CSS architecture is the practice of organising and structuring stylesheets to be maintainable, scalable, and predictable as an application grows. In small projects, CSS is straightforward. In large applications with multiple developers, CSS quickly becomes a source of bugs, conflicts, and frustration — styles leak across components, specificity wars emerge, and changes in one place break layouts elsewhere.

Modern CSS tooling has evolved to solve these problems. The main approaches are utility-first CSS (Tailwind CSS), CSS Modules (locally scoped class names), CSS-in-JS (styled-components, Emotion), and traditional methodologies (BEM). Each approach has trade-offs, and the right choice depends on the team, the project, and the existing codebase.

**Why it matters:** CSS architecture decisions affect every developer on the team, every day. A well-chosen approach reduces bugs, makes onboarding easier, and keeps the codebase maintainable as it grows. A poor choice — or no deliberate choice at all — leads to specificity conflicts, duplicated styles, and fear of changing CSS because you cannot predict what will break.

**Key things to understand:**

- Tailwind CSS: a utility-first framework that provides small, single-purpose classes (flex, p-4, text-lg, bg-blue-500) that you compose directly in your HTML/JSX. Eliminates the naming problem and keeps styles co-located with components. The purge/content configuration ensures only used classes are included in production builds.
- CSS Modules: a build-tool feature that locally scopes class names by generating unique identifiers. You write normal CSS but import it as a JavaScript module. Styles are guaranteed not to leak across components. Works well with existing CSS knowledge and requires no runtime JavaScript.
- CSS-in-JS (styled-components, Emotion): define styles in JavaScript using template literals or object syntax. Enables dynamic styles based on props, automatic critical CSS extraction, and component-level encapsulation. Adds a runtime cost and increases bundle size.
- When to choose which: Tailwind for rapid development and consistent design systems. CSS Modules for teams comfortable with CSS who want scoping without a new paradigm. CSS-in-JS for highly dynamic UIs where styles depend heavily on component state. BEM for projects with existing BEM conventions or when build tooling is minimal.

**Code walkthrough:**

```javascript
// --- Approach 1: Tailwind CSS ---
// Step 1: Why Tailwind — utility classes co-located with markup eliminate naming
// and prevent style leakage between components
function CampaignCardTailwind({ name, status }) {
  return (
    // Step 2: Responsive prefixes (md:, lg:) replace media queries
    // Conditional classes handle dynamic styling without CSS-in-JS runtime cost
    <div className="p-4 rounded-lg shadow-md bg-white md:p-6 lg:flex lg:gap-4">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <span className={`px-2 py-1 rounded text-sm ${
        status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
      }`}>
        {status}
      </span>
    </div>
  );
}

// --- Approach 2: CSS Modules ---
// Step 3: Why CSS Modules — class names are locally scoped at build time
// You write normal CSS but get automatic collision prevention
// File: CampaignCard.module.css
// .card { padding: 1rem; border-radius: 0.5rem; }
// .title { font-size: 1.125rem; font-weight: 600; }
import styles from './CampaignCard.module.css';

function CampaignCardModules({ name }) {
  // Step 4: styles.card compiles to something like "CampaignCard_card_x3k2"
  // No risk of colliding with another component's .card class
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
    </div>
  );
}
```

**Common pitfalls:**

- Mixing multiple CSS approaches in the same project without clear boundaries — using Tailwind in some components, CSS Modules in others, and inline styles in the rest creates an inconsistent, hard-to-maintain codebase.
- Not configuring Tailwind's design tokens (colours, spacing, fonts) to match the project's design system, resulting in arbitrary values scattered across components.
- Overusing CSS-in-JS for simple styles that do not need dynamic behaviour, adding runtime overhead and complexity without benefit.
- Ignoring CSS fundamentals (specificity, the cascade, the box model) when using tooling — the tools abstract these concepts but do not eliminate them. When something breaks, you need to understand the underlying CSS.

---
