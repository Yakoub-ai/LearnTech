export const labs = [
  // ============================================================
  // fe-lab-1: Build a Component Library (existing lab — copied exactly)
  // ============================================================
  {
    id: 'fe-lab-1',
    roleId: 'frontend-developer',
    level: 'beginner',
    title: 'Build a Component Library',
    description: 'Create reusable UI components step by step — a Button, Input, Card, and a themeable wrapper.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building React components, ensure your frontend environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Node.js 22 LTS, npm, and a React project scaffolded with Vite. Run `npm create vite@latest my-components -- --template react` to bootstrap your project.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` and `npm --version` to verify your environment',
          'Bootstrap with `npm create vite@latest my-components -- --template react` then `cd my-components && npm install`'
        ],
        expectedOutput: 'Node.js v22.x.x\nnpm 10.x.x\nVite + React project created and running at localhost:5173',
        solution: null
      },
      {
        title: 'Step 2: Create a Button Component',
        instruction: 'Build a reusable Button component with variant support (primary, secondary, danger) and size options (sm, md, lg).',
        starterCode: `// Button.jsx — Reusable button component
// Props: variant ('primary'|'secondary'|'danger'), size ('sm'|'md'|'lg'), children, onClick, disabled

const variantStyles = {
  // TODO: Define styles for each variant
  // primary: blue background, white text
  // secondary: gray background, dark text
  // danger: red background, white text
};

const sizeStyles = {
  // TODO: Define padding/font-size for each size
};

function Button({ variant = 'primary', size = 'md', children, onClick, disabled }) {
  // TODO: Combine variant + size styles
  // Add disabled styling (opacity, cursor)
  // Return a <button> element
  return null;
}

// Usage examples:
// <Button variant="primary" size="lg" onClick={handleClick}>Save</Button>
// <Button variant="danger" size="sm" disabled>Delete</Button>`,
        hints: [
          'Use an object to map variant names to CSS class strings',
          'Combine classes with template literals: `${variantStyles[variant]} ${sizeStyles[size]}`',
          'Add disabled styles conditionally: disabled ? "opacity-50 cursor-not-allowed" : ""'
        ],
        expectedOutput: `<button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
<button class="bg-red-500 text-white px-2 py-1 rounded opacity-50" disabled>Delete</button>`,
        solution: `const variantStyles = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

function Button({ variant = 'primary', size = 'md', children, onClick, disabled }) {
  const classes = [
    variantStyles[variant],
    sizeStyles[size],
    'rounded font-medium transition-colors',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}`
      },
      {
        title: 'Step 3: Create an Input Component',
        instruction: 'Build a reusable Input component with label, error state, and helper text support.',
        starterCode: `// Input.jsx — Reusable input with label and validation
// Props: label, type, value, onChange, error, helperText, placeholder, required

function Input({ label, type = 'text', value, onChange, error, helperText, placeholder, required }) {
  // TODO: Render label (with required indicator *)
  // TODO: Render input with error border styling
  // TODO: Show error message OR helper text below input
  return null;
}

// Usage:
// <Input label="Email" type="email" error="Invalid email" required />
// <Input label="Name" helperText="Enter your full name" />`,
        hints: [
          'Use a wrapper div with flex-col for vertical layout',
          'Error state: change border to red and show error text in red',
          'Required indicator: {required && <span className="text-red-500">*</span>}'
        ],
        expectedOutput: `Label with * for required fields
Input with red border when error prop is set
Error message shown in red below input
Helper text shown in gray when no error`,
        solution: `function Input({ label, type = 'text', value, onChange, error, helperText, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={\`px-3 py-2 border rounded-lg outline-none transition-colors \${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-blue-500'
        }\`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {!error && helperText && <span className="text-sm text-gray-500">{helperText}</span>}
    </div>
  );
}`
      },
      {
        title: 'Step 4: Create a Card Component',
        instruction: 'Build a Card component with header, body, and footer sections. Add hover effects and optional image support.',
        starterCode: `// Card.jsx — Composable card component
// Props: title, subtitle, children (body), footer, image, onClick

function Card({ title, subtitle, children, footer, image, onClick }) {
  // TODO: Build a card with:
  //   - Optional image at top (full width)
  //   - Header section with title and subtitle
  //   - Body section (children)
  //   - Optional footer section
  //   - Hover shadow effect
  //   - onClick makes the whole card clickable
  return null;
}

// Usage:
// <Card title="Project Alpha" subtitle="Due March 15" footer={<Button>View</Button>}>
//   <p>A brief description of the project...</p>
// </Card>`,
        hints: [
          'Use overflow-hidden on the wrapper for image clipping',
          'Add hover:shadow-lg and transition-shadow for hover effect',
          'Use cursor-pointer when onClick is provided'
        ],
        expectedOutput: `A card with rounded corners, subtle shadow
Image fills the top area
Title is bold, subtitle is smaller and gray
Footer is at the bottom with a top border`,
        solution: `function Card({ title, subtitle, children, footer, image, onClick }) {
  return (
    <div
      className={\`bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg \${
        onClick ? 'cursor-pointer' : ''
      }\`}
      onClick={onClick}
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {children && <div className="mt-3 text-gray-700">{children}</div>}
      </div>
      {footer && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}`
      },
      {
        title: 'Step 5: Add Theme Support',
        instruction: 'Create a ThemeProvider that uses React Context to provide color theme values to all components. Update Button to use theme colors.',
        starterCode: `// ThemeProvider.jsx — Context-based theming
import { createContext, useContext, useState } from 'react';

const themes = {
  light: {
    primary: '#3b82f6',
    danger: '#ef4444',
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
  },
  dark: {
    primary: '#60a5fa',
    danger: '#f87171',
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
  },
};

// TODO: Create ThemeContext
// TODO: Create ThemeProvider component with theme state and toggle function
// TODO: Create useTheme hook
// TODO: Create ThemeToggle button component`,
        hints: [
          'const ThemeContext = createContext()',
          'ThemeProvider should manage [theme, setTheme] state and provide { theme, colors, toggleTheme }',
          'useTheme = () => useContext(ThemeContext)'
        ],
        expectedOutput: `<ThemeProvider>
  <ThemeToggle /> → switches between light/dark
  <Button> → uses theme.primary color
</ThemeProvider>`,
        solution: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const colors = themes[theme];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="px-3 py-1 rounded border">
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}`
      }
    ]
  },

  // ============================================================
  // fe-lab-2: React Component with Hooks (from fe-1 codeSandbox example)
  // ============================================================
  {
    id: 'fe-lab-2',
    roleId: 'frontend-developer',
    level: 'beginner',
    title: 'React Hooks & Async Data Fetching',
    description: 'Build a UserProfile component that fetches data asynchronously using useState and useEffect — the foundation of real-world React data flows.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building frontend features, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, npm, a code editor with ESLint/Prettier extensions, and browser DevTools familiarity. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` and `npm --version` to verify your environment',
          'Bootstrap a project with `npm create vite@latest my-app -- --template react-ts`'
        ],
        expectedOutput: 'Node.js v22.x.x\nnpm 10.x.x\nVite project created and running at localhost:5173',
        solution: null
      },
      {
        title: 'Step 2: Model Your State',
        instruction: 'WHAT: Define TypeScript types and initial state for a user profile component.\n\nWHY: Modelling state up-front prevents bugs and makes your component\'s data flow obvious to teammates — a core habit in professional React development.\n\nHOW: Create a User interface, then declare three state variables: the user object (initially null), a loading boolean, and a nullable error string. Use the useState generic overload to give TypeScript full type information from the start.',
        starterCode: `import { useState } from 'react';

// TODO: Define a User interface with id (number), name (string), email (string)

// TODO: Define the component props — it receives a userId: number

export function UserProfile({ userId }) {
  // TODO: Declare state for user (User | null), loading (boolean), error (string | null)
  // Start loading as true because we fetch immediately on mount

  return <div>...</div>;
}`,
        hints: [
          'interface User { id: number; name: string; email: string; }',
          'useState<User | null>(null) gives TypeScript the type without an initial value',
          'Three separate state variables (user, loading, error) beat a single object — fewer re-renders when only one changes'
        ],
        expectedOutput: `// Types and state declared:
interface User { id: number; name: string; email: string; }
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);`,
        solution: `import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return <div>...</div>;
}`
      },
      {
        title: 'Step 3: Fetch Data with useEffect',
        instruction: 'WHAT: Add a useEffect that fetches user data from `/api/users/:id` whenever the userId prop changes.\n\nWHY: useEffect is the right place for side effects (network requests, subscriptions) because it runs after render and can be cleaned up. Always handle loading AND error states — users see your error UI far more than developers do.\n\nHOW: Inside useEffect, write an async inner function (you cannot mark the effect callback itself as async), call fetch, check response.ok, parse JSON, and update state in a try/catch/finally block. Pass [userId] as the dependency array so it re-runs when the prop changes.',
        starterCode: `import { useState, useEffect } from 'react';

interface User { id: number; name: string; email: string; }

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Define async fetchUser function here (not on the effect callback)
    // TODO: Call fetch(\`/api/users/\${userId}\`)
    // TODO: Throw if !response.ok
    // TODO: Parse JSON and call setUser
    // TODO: Catch errors and call setError
    // TODO: Call setLoading(false) in finally
    // TODO: Call fetchUser()
  }, [userId]); // <-- dependency array

  return <div>...</div>;
}`,
        hints: [
          'Define `const fetchUser = async () => { ... }` inside useEffect, then call fetchUser() on the next line',
          'Check `if (!response.ok) throw new Error("Failed to fetch")` before calling response.json()',
          'The finally block runs whether the fetch succeeds or fails — perfect for setLoading(false)'
        ],
        expectedOutput: `// Effect runs on mount and whenever userId changes
// loading → true while fetching
// user → populated with parsed JSON on success
// error → populated with message on failure
// loading → false in both cases (finally)`,
        solution: `import { useState, useEffect } from 'react';

interface User { id: number; name: string; email: string; }

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return <div>...</div>;
}`
      },
      {
        title: 'Step 4: Render Loading, Error, and Success States',
        instruction: 'WHAT: Render three distinct UI states — loading skeleton, error message, and the user profile card.\n\nWHY: Every async component has three possible states. Handling all three makes your UI trustworthy and accessible. Returning early for loading/error keeps the happy-path JSX clean and easy to read.\n\nHOW: Use early returns for loading and error before the main return. In the success state, use optional chaining (user?.name) to satisfy TypeScript even though you know user is set. Add a role="alert" to error output so screen readers announce it.',
        starterCode: `// Continue from Step 3 — add the render logic below the useEffect

  if (loading) {
    // TODO: Return a loading indicator div
  }

  if (error) {
    // TODO: Return an error div with role="alert" and the error message
  }

  // TODO: Return the user card — show user.name and user.email
  // Use optional chaining (user?.name) to keep TypeScript happy
  return null;`,
        hints: [
          'if (loading) return <div aria-busy="true">Loading...</div>;',
          'if (error) return <div role="alert">Error: {error}</div>;',
          'Optional chaining: user?.name is safe even if TypeScript cannot prove user is non-null here'
        ],
        expectedOutput: `// While fetching:    <div aria-busy="true">Loading...</div>
// On network error:  <div role="alert">Error: Failed to fetch</div>
// On success:        <div class="user-card"><h2>Alice</h2><p>alice@example.com</p></div>`,
        solution: `import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div aria-busy="true">Loading...</div>;
  if (error) return <div role="alert">Error: {error}</div>;

  return (
    <div className="user-card">
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}`
      },
      {
        title: 'Step 5: Prevent State Updates on Unmounted Components',
        instruction: 'WHAT: Add a cleanup mechanism so the effect does not try to set state after the component unmounts.\n\nWHY: If a user navigates away while a fetch is in flight, React will log a warning and may cause memory leaks. The pattern is to track whether the component is still mounted using a local boolean flag and only call setState when isMounted is true. This is fundamental to production-grade React code.\n\nHOW: Declare let isMounted = true at the top of the effect, wrap all setState calls in if (isMounted) checks, and return a cleanup function that sets isMounted = false.',
        starterCode: `useEffect(() => {
  // TODO: Declare: let isMounted = true

  const fetchUser = async () => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // TODO: Only call setUser if isMounted
    } catch (err) {
      // TODO: Only call setError if isMounted
    } finally {
      // TODO: Only call setLoading(false) if isMounted
    }
  };

  fetchUser();

  // TODO: Return cleanup function that sets isMounted = false
}, [userId]);`,
        hints: [
          'let isMounted = true at the very top of the effect body, before fetchUser is defined',
          'Wrap: if (isMounted) setUser(data); — same pattern for setError and setLoading',
          'Cleanup: return () => { isMounted = false; }; — this runs when the component unmounts or userId changes'
        ],
        expectedOutput: `// If userId changes mid-fetch, the old fetch's setState calls are silently ignored
// No "Can't perform a React state update on an unmounted component" warning
// The cleanup function fires on every dependency change and on unmount`,
        solution: `useEffect(() => {
  let isMounted = true;

  const fetchUser = async () => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      if (isMounted) setUser(data);
    } catch (err) {
      if (isMounted) setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchUser();

  return () => {
    isMounted = false;
  };
}, [userId]);`
      }
    ]
  },

  // ============================================================
  // fe-lab-3: Fetching Data with Error Handling (from fe-2 codeSandbox example)
  // ============================================================
  {
    id: 'fe-lab-3',
    roleId: 'frontend-developer',
    level: 'mid',
    title: 'Production-Grade Data Fetching Patterns',
    description: 'Build a PostList component with robust data fetching — race condition prevention, abort signals, retry logic, and polished loading/empty/error UI states.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building frontend features, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, npm, a code editor with ESLint/Prettier extensions, and browser DevTools familiarity. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` and `npm --version` to verify your environment',
          'Bootstrap a project with `npm create vite@latest my-app -- --template react-ts`'
        ],
        expectedOutput: 'Node.js v22.x.x\nnpm 10.x.x\nVite project created and running at localhost:5173',
        solution: null
      },
      {
        title: 'Step 2: Build the Base Fetch Effect',
        instruction: 'WHAT: Create a PostList component that fetches posts from `/api/posts` on mount, managing loading, error, and data state.\n\nWHY: Starting with a clean three-state model (loading / error / data) before adding complexity is the professional approach — it forces you to think about every code path users will experience.\n\nHOW: Initialise loading as false (unlike individual profile components, a list usually shows a spinner only after a brief delay). Use an inner async function inside useEffect. Always reset loading, error, and data together to avoid stale combinations.',
        starterCode: `import { useEffect, useState } from 'react';

// A single post shape
// { id: number, title: string, body: string }

export function PostList() {
  // TODO: Declare posts (array), loading (bool, start false), error (null | string)

  useEffect(() => {
    // TODO: Define async fetchPosts function
    // - Set loading true
    // - Fetch /api/posts
    // - Throw if !response.ok with message 'Network response failed'
    // - Parse JSON, call setPosts and setError(null)
    // - On catch: setError(err.message) and setPosts([])
    // - In finally: setLoading(false)
    // TODO: Call fetchPosts()
  }, []);

  // TODO: Render loading, error, empty, and list states
  return null;
}`,
        hints: [
          'setPosts([]) in the catch block prevents rendering stale data from a previous successful fetch',
          'setError(null) in the success branch clears any previous error — always clear sibling state',
          'For the list, map posts to <li key={post.id}>{post.title}</li>'
        ],
        expectedOutput: `// loading=true  → <p>Loading posts...</p>
// error set     → <p>Error: Network response failed</p>
// posts empty   → <p>No posts yet.</p>
// posts present → <ul> with one <li> per post title </ul>`,
        solution: `import { useEffect, useState } from 'react';

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Network response failed');
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`
      },
      {
        title: 'Step 3: Prevent Race Conditions with a Mounted Flag',
        instruction: 'WHAT: Add an isMounted guard so that state is never updated after the component unmounts or after a new fetch starts.\n\nWHY: Without this guard, if a user rapidly filters or navigates, multiple in-flight requests can resolve out of order, silently corrupting displayed data. This is the most common async bug in React codebases.\n\nHOW: Declare let isMounted = true before fetchPosts, wrap every setState call in if (isMounted), and return a cleanup function that sets isMounted = false. The cleanup runs both on unmount AND before the effect re-runs (if you add a dependency).',
        starterCode: `useEffect(() => {
  // TODO: let isMounted = true

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Network response failed');
      const data = await response.json();
      // TODO: guard setPosts and setError with isMounted
    } catch (err) {
      // TODO: guard setError and setPosts with isMounted
    } finally {
      // TODO: guard setLoading with isMounted
    }
  }

  fetchPosts();

  // TODO: return cleanup that sets isMounted = false
}, []);`,
        hints: [
          'if (isMounted) { setPosts(data); setError(null); } — group related state updates under one guard',
          'The cleanup fires before the next effect run AND on unmount — covers both race condition scenarios',
          'AbortController is an alternative approach for true fetch cancellation (covered in the bonus step)'
        ],
        expectedOutput: `// Rapid unmount/remount scenario:
// First fetch resolves AFTER unmount → isMounted is false → no setState → no warning
// Second fetch starts → first effect cleanup already ran → isMounted = false for old closure`,
        solution: `useEffect(() => {
  let isMounted = true;

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Network response failed');
      const data = await response.json();
      if (isMounted) {
        setPosts(data);
        setError(null);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        setPosts([]);
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  }

  fetchPosts();

  return () => {
    isMounted = false;
  };
}, []);`
      },
      {
        title: 'Step 4: Add a Retry Button',
        instruction: 'WHAT: Extract the fetch logic so it can be triggered both on mount and by a "Retry" button click, using AbortController to cancel in-flight requests.\n\nWHY: Network errors are transient. Giving users a retry action instead of forcing a full page reload is a UX standard for data-heavy applications. AbortController is the correct modern pattern for cancelling fetch requests — it signals the browser to abandon the in-flight request and lets you ignore the resulting AbortError in your catch block.\n\nHOW: Wrap the fetch logic in useCallback with an empty dep array. Inside, create an AbortController and pass its signal to fetch(). Catch and ignore AbortError. Return a cleanup function that calls controller.abort() so React can cancel any in-flight request when the component unmounts.',
        starterCode: `import { useEffect, useState, useCallback } from 'react';

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Define fetchPosts with useCallback (no deps needed here since it only uses setters)
  // Wrap the full try/catch/finally fetch logic inside

  useEffect(() => {
    // TODO: call fetchPosts() on mount
  }, [fetchPosts]);

  if (loading) return <p>Loading posts...</p>;

  if (error) return (
    <div>
      <p>Error: {error}</p>
      {/* TODO: Add a <button onClick={fetchPosts}>Retry</button> */}
    </div>
  );

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`,
        hints: [
          'useCallback(() => { ... }, []) memoises fetchPosts — stable reference prevents the useEffect dependency from firing in a loop',
          'Create an AbortController inside fetchPosts, pass its signal to fetch(), and return () => controller.abort() as the cleanup',
          'The Retry button simply calls fetchPosts() — no extra state needed'
        ],
        expectedOutput: `// On error: "Error: Network response failed" + [Retry] button
// Click Retry: loading spinner appears, then either posts list or error again
// On success: clean posts list with no Retry button visible`,
        solution: `import { useEffect, useState, useCallback } from 'react';

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
        signal: controller.signal
      });
      if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p>Loading posts...</p>;

  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={fetchPosts}>Retry</button>
    </div>
  );

  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`
      },
      {
        title: 'Step 5: Enhance the Post List UI',
        instruction: 'WHAT: Upgrade the plain list into a styled, accessible post card layout with a loading skeleton.\n\nWHY: Real applications replace spinner text with skeleton screens because they reduce perceived load time by up to 20% (Nielsen Norman Group research). Accessible markup — heading hierarchy, list semantics, and aria-busy — ensures the UI works for all users.\n\nHOW: Replace the loading paragraph with three skeleton placeholder divs using animate-pulse. Wrap the list in a <section> with an accessible heading. Render each post as a card showing title and a truncated body. Use aria-busy on the container to signal loading state to assistive technologies.',
        starterCode: `// Replace the loading/list returns with polished UI

// Skeleton component (no state needed)
function PostSkeleton() {
  // TODO: Return a div with 3 skeleton rows using animate-pulse and bg-gray-200
}

// Replace if (loading) return ... with:
if (loading) {
  return (
    <section aria-busy="true" aria-label="Loading posts">
      {/* TODO: Render 3 PostSkeleton components */}
    </section>
  );
}

// Replace the <ul> return with a styled card grid:
return (
  <section aria-label="Posts">
    <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
    {/* TODO: Render posts as cards — each card shows post.title (h3) and first 100 chars of post.body */}
  </section>
);`,
        hints: [
          'Skeleton: <div className="animate-pulse space-y-2"><div className="h-4 bg-gray-200 rounded w-3/4" /><div className="h-3 bg-gray-200 rounded w-full" /></div>',
          'Truncate body: {post.body.slice(0, 100)}{post.body.length > 100 ? "..." : ""}',
          'Card wrapper: <article key={post.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">'
        ],
        expectedOutput: `// Loading: 3 animated grey skeleton blocks
// Loaded: grid of post cards, each with bold title and truncated body
// Screen reader: section is labelled "Posts", heading "Latest Posts" is announced`,
        solution: `function PostSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-lg space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}

// In PostList:
if (loading) {
  return (
    <section aria-busy="true" aria-label="Loading posts" className="space-y-3">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </section>
  );
}

return (
  <section aria-label="Posts">
    <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
    <div className="space-y-3">
      {posts.map(post => (
        <article key={post.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium text-gray-900">{post.title}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {post.body.slice(0, 100)}{post.body.length > 100 ? '...' : ''}
          </p>
        </article>
      ))}
    </div>
  </section>
);`
      }
    ]
  },

  // ============================================================
  // fe-lab-4: Jest Unit Tests for React Components (from fe-3 codeSandbox example)
  // ============================================================
  {
    id: 'fe-lab-4',
    roleId: 'frontend-developer',
    level: 'senior',
    title: 'Testing React Components with Jest & React Testing Library',
    description: 'Write a complete test suite for a LoginForm component — covering rendering, user interactions, validation feedback, and async submission — using industry-standard testing practices.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building frontend features, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, npm, a code editor with ESLint/Prettier extensions, and browser DevTools familiarity. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` and `npm --version` to verify your environment',
          'Install testing tools: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event`'
        ],
        expectedOutput: 'Node.js v22.x.x\nnpm 10.x.x\nAll testing packages installed — npm test runs without errors',
        solution: null
      },
      {
        title: 'Step 2: Test Initial Rendering',
        instruction: 'WHAT: Write the first test — verify that the LoginForm renders all required fields and the submit button.\n\nWHY: Render tests are the cheapest and most stable tests. They establish a baseline: if the component does not render its basic structure, all other tests will fail too. Querying by accessible roles and labels also validates that your markup is accessible.\n\nHOW: Use `render(<LoginForm />)` and query with `screen.getByLabelText` for inputs and `screen.getByRole("button")` for the submit button. Prefer accessible queries over data-testid — they test what real users and assistive tech see.',
        starterCode: `import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form with email and password inputs', () => {
    render(<LoginForm />);

    // TODO: Assert email input is in the document (use getByLabelText with /email/i)
    // TODO: Assert password input is in the document (use getByLabelText with /password/i)
    // TODO: Assert a button named "Login" or "Sign in" is in the document
  });
});`,
        hints: [
          'screen.getByLabelText(/email/i) finds an input associated with a label containing "email" (case-insensitive)',
          'screen.getByRole("button", { name: /login/i }) queries by ARIA role and accessible name',
          'toBeInTheDocument() comes from @testing-library/jest-dom — import it in your jest setup file'
        ],
        expectedOutput: `PASS LoginForm.test.tsx
  LoginForm
    ✓ renders login form with email and password inputs`,
        solution: `import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form with email and password inputs', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});`
      },
      {
        title: 'Step 3: Test Form Submission with User Events',
        instruction: 'WHAT: Write a test that simulates a user typing credentials and clicking Login, then verifies the onSubmit callback is called with the correct values.\n\nWHY: Interaction tests are higher-value than snapshot tests — they prove that user actions trigger the right outcomes. Using userEvent over fireEvent is the current RTL best practice because userEvent simulates real browser events (focus, keydown, input, change, blur) rather than synthetic ones.\n\nHOW: Set up `userEvent.setup()` before the test body. Use `await user.type(element, text)` for keyboard input and `await user.click(element)` for clicks. Assert the mock callback using `toHaveBeenCalledWith` with the exact expected payload.',
        starterCode: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with valid credentials', async () => {
    // TODO: Set up userEvent (userEvent.setup())
    // TODO: Create a jest.fn() for handleSubmit
    // TODO: Render <LoginForm onSubmit={handleSubmit} />
    // TODO: Type 'test@example.com' into the email field
    // TODO: Type 'password123' into the password field
    // TODO: Click the login button
    // TODO: waitFor and assert handleSubmit was called with { email, password }
  });
});`,
        hints: [
          'const user = userEvent.setup(); must be called before render — it creates a stateful user session',
          'await user.type(screen.getByLabelText(/email/i), "test@example.com") simulates typing each character',
          'waitFor is needed because form submission may trigger async React state updates before calling onSubmit'
        ],
        expectedOutput: `PASS LoginForm.test.tsx
  LoginForm
    ✓ submits form with valid credentials
    // handleSubmit called with: { email: 'test@example.com', password: 'password123' }`,
        solution: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});`
      },
      {
        title: 'Step 4: Test Validation Error States',
        instruction: 'WHAT: Write tests that verify validation error messages appear when the form is submitted with invalid or missing data.\n\nWHY: Validation feedback is one of the most user-facing parts of any form. Testing it ensures error messages are announced correctly and prevents regressions when the validation logic changes.\n\nHOW: Submit the form empty (do not type anything), then use `findByRole("alert")` or `findByText` to asynchronously wait for error messages. Test both field-level errors (inline) and an error summary if your form has one. Use `not.toHaveBeenCalled()` to confirm submission is blocked.',
        starterCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm validation', () => {
  it('shows error when submitted with empty email', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    // TODO: Click submit without filling in any fields
    // TODO: Wait for and assert an error message about email
    // TODO: Assert handleSubmit was NOT called
  });

  it('shows error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    // TODO: Type 'not-an-email' into the email field
    // TODO: Click submit
    // TODO: Wait for and assert an "invalid email" error message
  });
});`,
        hints: [
          'findByText(/email is required/i) returns a Promise — await it without needing waitFor wrapper',
          'expect(handleSubmit).not.toHaveBeenCalled() runs synchronously after the await — no race condition',
          'findByRole("alert") is useful if errors use role="alert" — matches any element with that ARIA role'
        ],
        expectedOutput: `PASS LoginForm.test.tsx
  LoginForm validation
    ✓ shows error when submitted with empty email
    ✓ shows error for invalid email format
    // handleSubmit never called in either test`,
        solution: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm validation', () => {
  it('shows error when submitted with empty email', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('shows error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});`
      },
      {
        title: 'Step 5: Test Accessibility and Loading States',
        instruction: 'WHAT: Write tests that verify accessibility attributes (aria-invalid, aria-busy) and the loading state during async submission.\n\nWHY: Accessibility tests catch broken ARIA patterns before they reach users with assistive technology. Loading state tests prevent the UI from accidentally allowing double-submission — a common bug that causes duplicate API calls.\n\nHOW: After triggering a validation error, use `toHaveAttribute("aria-invalid", "true")` to check field ARIA state. For the loading test, mock the onSubmit prop as an async function, submit the form, and use `queryByRole` immediately after to assert the button is disabled or a spinner is visible.',
        starterCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm accessibility', () => {
  it('marks invalid fields with aria-invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    // TODO: Submit empty form
    // TODO: Wait for the email input to have aria-invalid="true"
    // Hint: use findByRole('textbox', { name: /email/i }) or getByLabelText
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    // TODO: Create handleSubmit that returns a Promise that never resolves (simulates slow API)
    render(<LoginForm onSubmit={handleSubmit} />);

    // TODO: Fill valid data and click submit
    // TODO: Immediately assert the button is disabled (do NOT await the submission)
  });
});`,
        hints: [
          'findByLabelText(/email/i) returns the input — then chain .then(el => expect(el).toHaveAttribute("aria-invalid", "true"))',
          'Slow submit mock: const handleSubmit = jest.fn(() => new Promise(() => {})) — never resolves',
          'Check button: expect(screen.getByRole("button", { name: /login/i })).toBeDisabled()'
        ],
        expectedOutput: `PASS LoginForm.test.tsx
  LoginForm accessibility
    ✓ marks invalid fields with aria-invalid
    ✓ disables submit button while submitting`,
        solution: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm accessibility', () => {
  it('marks invalid fields with aria-invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    const emailInput = await screen.findByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn(() => new Promise(() => {})); // never resolves
    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });
});`
      }
    ]
  },

  // ============================================================
  // fe-lab-5: Custom Hook with Tests (from fe-4 codeSandbox example)
  // ============================================================
  {
    id: 'fe-lab-5',
    roleId: 'frontend-developer',
    level: 'mid',
    title: 'Building and Testing a Custom useFetch Hook',
    description: 'Extract data-fetching logic into a reusable useFetch hook with full loading/error/refetch support, then write comprehensive tests using renderHook from React Testing Library.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building frontend features, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, npm, a code editor with ESLint/Prettier extensions, and browser DevTools familiarity. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` and `npm --version` to verify your environment',
          'Install: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`'
        ],
        expectedOutput: 'Node.js v22.x.x\nnpm 10.x.x\nAll packages installed — npm test passes',
        solution: null
      },
      {
        title: 'Step 2: Define the Hook Signature',
        instruction: 'WHAT: Create the skeleton for a useFetch hook that accepts a URL string and an options object, and returns { data, loading, error, refetch }.\n\nWHY: Custom hooks are React\'s primary code-reuse mechanism. Extracting async logic from components into a hook makes components thinner, the logic independently testable, and the pattern reusable across your entire application with a single import.\n\nHOW: Start with three state variables (data, loading, error), a useCallback-wrapped fetch function, and a useEffect that calls it on mount. Export the four return values. Keep the hook\'s surface area minimal — callers should not need to know how fetching works.',
        starterCode: `import { useState, useEffect, useCallback } from 'react';

// TODO: Export useFetch(url, options = {})
// It should return: { data, loading, error, refetch }

// State:
//   data: null initially, set to parsed JSON on success
//   loading: false initially (set to true while fetching)
//   error: null initially, set to error message on failure

// fetchData (useCallback):
//   - setLoading(true), setError(null)
//   - fetch(url, options)
//   - Throw if HTTP error: \`HTTP \${response.status}: \${response.statusText}\`
//   - setData(json) on success
//   - setError(err.message) and setData(null) on catch
//   - setLoading(false) in finally

// useEffect: call fetchData() when url changes (dep: [fetchData])`,
        hints: [
          'useCallback(() => { ... }, [url]) — url in deps so a new URL triggers a fresh memoised function; options is excluded from deps intentionally (callers should memoize it with useMemo to avoid infinite re-renders)',
          'useEffect(() => { fetchData(); }, [fetchData]) — depends on the memoised function, not url directly',
          'Return { data, loading, error, refetch: fetchData } — expose fetchData as refetch for manual triggers'
        ],
        expectedOutput: `// useFetch('/api/users') returns:
// { data: null, loading: true, error: null, refetch: fn } — immediately
// { data: [...], loading: false, error: null, refetch: fn } — after success
// { data: null, loading: false, error: 'HTTP 404: Not Found', refetch: fn } — after failure`,
        solution: `import { useState, useEffect, useCallback } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  // Note: options is intentionally excluded from deps — callers must memoize
  // it with useMemo/useCallback to avoid infinite re-renders.
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}`
      },
      {
        title: 'Step 3: Test Success and Error Paths',
        instruction: 'WHAT: Write tests using renderHook to verify useFetch correctly handles a successful response and a failed response.\n\nWHY: Testing a hook directly with renderHook is cleaner than mounting a component — you test the logic unit in isolation, making failures easier to diagnose and tests faster to run.\n\nHOW: Mock global.fetch with jest.fn() in beforeEach. For the success test, mock a resolved response with ok: true and a json() method. For the error test, mock ok: false with a status and statusText. Use waitFor to await the async state transitions.',
        starterCode: `import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFetch', () => {
  it('returns data on successful fetch', async () => {
    const mockData = { users: [{ id: 1, name: 'Alice' }] };
    // TODO: Mock global.fetch to resolve with { ok: true, json: async () => mockData }
    // TODO: renderHook useFetch with '/api/users'
    // TODO: Assert loading is true initially
    // TODO: waitFor loading is false
    // TODO: Assert data equals mockData and error is null
  });

  it('returns error on failed fetch', async () => {
    // TODO: Mock global.fetch to resolve with { ok: false, status: 404, statusText: 'Not Found' }
    // TODO: renderHook useFetch with '/api/missing'
    // TODO: waitFor loading is false
    // TODO: Assert data is null and error is 'HTTP 404: Not Found'
  });
});`,
        hints: [
          'global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData })',
          'const { result } = renderHook(() => useFetch("/api/users"))',
          'result.current gives you the current return value of the hook — access data, loading, error from it'
        ],
        expectedOutput: `PASS useFetch.test.js
  useFetch
    ✓ returns data on successful fetch
    ✓ returns error on failed fetch`,
        solution: `import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFetch', () => {
  it('returns data on successful fetch', async () => {
    const mockData = { users: [{ id: 1, name: 'Alice' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('/api/users'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useFetch('/api/missing'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('HTTP 404: Not Found');
  });
});`
      },
      {
        title: 'Step 4: Test the Refetch Function',
        instruction: 'WHAT: Write a test verifying that calling result.current.refetch() triggers a second network request.\n\nWHY: The refetch capability is a key feature of the hook — users can trigger data refreshes without remounting the component. Testing it ensures the useCallback memoisation is working correctly and that fetch is called the right number of times.\n\nHOW: Set up global.fetch to always resolve successfully. After the initial load, call result.current.refetch() inside an act() wrapper, then assert fetch was called exactly twice.',
        starterCode: `import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetch } from './useFetch';

it('supports manual refetch', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ count: 1 }),
  });

  const { result } = renderHook(() => useFetch('/api/count'));

  // Wait for initial fetch to complete
  await waitFor(() => expect(result.current.loading).toBe(false));

  // TODO: Call result.current.refetch() wrapped in act()
  // TODO: Wait for loading to go false again
  // TODO: Assert global.fetch was called exactly 2 times
});`,
        hints: [
          'await act(async () => { await result.current.refetch(); }) — act ensures React state updates are flushed',
          'expect(global.fetch).toHaveBeenCalledTimes(2) — one for mount, one for manual refetch',
          'You can also assert result.current.data is still correct after the refetch'
        ],
        expectedOutput: `PASS useFetch.test.js
  useFetch
    ✓ supports manual refetch
    // fetch called twice: once on mount, once on refetch()`,
        solution: `import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetch } from './useFetch';

it('supports manual refetch', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ count: 1 }),
  });

  const { result } = renderHook(() => useFetch('/api/count'));

  await waitFor(() => expect(result.current.loading).toBe(false));

  await act(async () => {
    await result.current.refetch();
  });

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(global.fetch).toHaveBeenCalledTimes(2);
});`
      },
      {
        title: 'Step 5: Extend with a Skip Option',
        instruction: 'WHAT: Add a skip option to useFetch that prevents automatic fetching on mount when set to true.\n\nWHY: Conditional fetching is a real-world requirement — for example, you may not want to fetch until the user has entered a search query, or until a parent component has finished its own loading. The skip pattern avoids the need for complex conditional hook calls (which violate the Rules of Hooks).\n\nHOW: Accept options.skip in the hook. In the useEffect, check if skip is true and return early without calling fetchData. Write a test that verifies fetch is NOT called when skip: true, and IS called after the skip flag is changed to false via hook re-render.',
        starterCode: `// Extend useFetch signature:
export function useFetch(url, options = {}) {
  const { skip = false, ...fetchOptions } = options;

  // ... existing state ...

  const fetchData = useCallback(async () => {
    // ... existing fetch logic using fetchOptions instead of options ...
  }, [url]);

  useEffect(() => {
    // TODO: If skip is true, return early without calling fetchData
    fetchData();
  }, [fetchData, skip]); // <-- add skip to deps

  return { data, loading, error, refetch: fetchData };
}

// Test:
it('does not fetch when skip is true', async () => {
  global.fetch = jest.fn();
  renderHook(() => useFetch('/api/data', { skip: true }));

  // Give React time to run effects
  await new Promise(resolve => setTimeout(resolve, 50));

  // TODO: Assert fetch was never called
});`,
        hints: [
          'if (skip) return; inside useEffect before calling fetchData()',
          'Destructure skip from options before the useCallback so the fetchData closure does not close over skip accidentally',
          'expect(global.fetch).not.toHaveBeenCalled() — simple assertion that proves the guard works'
        ],
        expectedOutput: `// skip: true  → fetch never called, data/loading/error stay at initial values
// skip: false → fetch called immediately on effect run
// Changing skip from true to false (via rerender) → fetch called once`,
        solution: `import { useState, useEffect, useCallback } from 'react';

export function useFetch(url, options = {}) {
  const { skip = false, ...fetchOptions } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, [fetchData, skip]);

  return { data, loading, error, refetch: fetchData };
}

// Test for skip:
it('does not fetch when skip is true', async () => {
  global.fetch = jest.fn();
  renderHook(() => useFetch('/api/data', { skip: true }));
  await new Promise(resolve => setTimeout(resolve, 50));
  expect(global.fetch).not.toHaveBeenCalled();
});`
      }
    ]
  },

  // ============================================================
  // fe-lab-6: Accessible Form Component (from fe-5 codeSandbox example)
  // ============================================================
  {
    id: 'fe-lab-6',
    roleId: 'frontend-developer',
    level: 'senior',
    title: 'Building Accessible Forms with WAI-ARIA',
    description: 'Build a fully accessible contact form following WAI-ARIA guidelines — with field-level validation, an error summary, screen reader live regions, and keyboard-navigable error links.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building frontend features, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS, npm, a code editor with ESLint/Prettier extensions, and browser DevTools familiarity. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` and `npm --version` to verify your environment',
          'Install axe for accessibility testing: `npm install --save-dev @axe-core/react jest-axe`'
        ],
        expectedOutput: 'Node.js v22.x.x\nnpm 10.x.x\nAll packages installed — npm test passes',
        solution: null
      },
      {
        title: 'Step 2: Build Accessible Form Fields',
        instruction: 'WHAT: Create the form structure with properly associated labels, required indicators, and ARIA attributes on each input.\n\nWHY: Approximately 7.6 million people in the US have difficulty seeing. Screen readers read form inputs by their associated label — without `htmlFor`/`id` pairing and `aria-required`, visually impaired users cannot understand what a field is for or know it is mandatory. This is also a legal requirement under WCAG 2.1 AA.\n\nHOW: For each field, pair a `<label htmlFor="field-id">` with `<input id="field-id">`. Add `aria-required="true"` on required inputs. Use `noValidate` on the form to disable browser-native validation (so you control the UX). Link each error to its input with `aria-describedby="error-field-id"`.',
        starterCode: `import React, { useState } from 'react';

export function AccessibleContactForm({ onSubmit }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  // TODO: Render a <form> with noValidate and aria-label="Contact form"
  // TODO: Name field:
  //   - <label htmlFor="field-name">Name *</label>
  //   - <input id="field-name" name="name" aria-required="true" />
  // TODO: Email field (type="email"):
  //   - Same pattern as name
  // TODO: Message field (<textarea>):
  //   - Same pattern
  // TODO: <button type="submit">Send Message</button>

  return null;
}`,
        hints: [
          'noValidate on <form> disables the browser popup — you handle errors instead for consistent UX',
          'aria-required="true" (string, not boolean) is the correct ARIA spelling',
          'The asterisk (*) on the label is visual-only — add aria-hidden="true" to the * span so screen readers do not read "Name star"'
        ],
        expectedOutput: `// Screen reader announces:
// "Name, required, edit text" — name field
// "Email, required, edit text" — email field
// "Message, required, text area" — message field
// Form submission calls e.preventDefault()`,
        solution: `import React, { useState } from 'react';

export function AccessibleContactForm({ onSubmit }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-name">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          aria-required="true"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-email">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="field-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-required="true"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="field-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          aria-required="true"
        />
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}`
      },
      {
        title: 'Step 3: Add Field-Level Validation and aria-invalid',
        instruction: 'WHAT: Add validators for each field and mark invalid inputs with `aria-invalid="true"` and linked error messages via `aria-describedby`.\n\nWHY: `aria-invalid` tells screen readers that a field has failed validation — they announce "invalid" along with the field name. `aria-describedby` links the error text element to the input so the error is read when the user focuses the field. Without these, screen reader users hear no indication that a field is wrong.\n\nHOW: Create a validators object keyed by field name. Run validation on submit and store errors in state. Set `aria-invalid={!!errors.fieldName}` and `aria-describedby={errors.fieldName ? "error-fieldName" : undefined}` on each input. Render the error as `<span id="error-fieldName" role="alert">`.',
        starterCode: `// Add to AccessibleContactForm:

const validators = {
  name: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
  email: (v) => (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) ? '' : 'Enter a valid email address'),
  message: (v) => (v.trim().length < 10 ? 'Message must be at least 10 characters' : ''),
};

function validate() {
  // TODO: Run each validator, return object of { fieldName: errorMessage }
  // Only include a field if its validator returns a non-empty string
}

function handleSubmit(e) {
  e.preventDefault();
  // TODO: Run validate(), setErrors with results
  // TODO: If no errors, call onSubmit(values)
}

// In the input JSX — add these attributes:
// aria-invalid={!!errors.name}
// aria-describedby={errors.name ? 'error-name' : undefined}

// Below each input — conditionally render:
// {errors.name && <span id="error-name" role="alert">{errors.name}</span>}`,
        hints: [
          'Object.entries(validators).reduce((acc, [field, fn]) => { const msg = fn(values[field]); if (msg) acc[field] = msg; return acc; }, {})',
          'aria-invalid accepts a boolean in React JSX — {!!errors.name} coerces to true/false',
          'role="alert" causes the error to be announced immediately by screen readers without focus movement'
        ],
        expectedOutput: `// Empty name submit:
// Input gets aria-invalid="true"
// Span with role="alert" appears: "Name must be at least 2 characters"
// Screen reader announces the error immediately (live region)
// onSubmit is NOT called`,
        solution: `const validators = {
  name: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : ''),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address'),
  message: (v) => (v.trim().length < 10 ? 'Message must be at least 10 characters' : ''),
};

function validate() {
  const newErrors = {};
  for (const [field, validator] of Object.entries(validators)) {
    const error = validator(values[field]);
    if (error) newErrors[field] = error;
  }
  return newErrors;
}

function handleSubmit(e) {
  e.preventDefault();
  const newErrors = validate();
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    onSubmit?.(values);
  }
}

// In the name input JSX:
// aria-invalid={!!errors.name}
// aria-describedby={errors.name ? 'error-name' : undefined}
// Below it:
// {errors.name && <span id="error-name" role="alert" style={{ color: 'red' }}>{errors.name}</span>}`
      },
      {
        title: 'Step 4: Add an Error Summary',
        instruction: 'WHAT: Add an error summary div at the top of the form that lists all validation errors as focusable links, and programmatically focus it on submit failure.\n\nWHY: An error summary is a WCAG best practice for forms with multiple fields. It provides a single, predictable location for all errors. Programmatic focus means keyboard and screen reader users are automatically brought to the error list — they do not have to hunt through the form to find what went wrong.\n\nHOW: Use `useRef` to hold a reference to the summary div. In handleSubmit, if there are errors, call `errorSummaryRef.current?.focus()` after `setErrors`. Give the summary `role="alert"`, `tabIndex={-1}` (so it can receive programmatic focus), and render each error as an anchor linking to `#field-name`.',
        starterCode: `import React, { useState, useRef } from 'react';

export function AccessibleContactForm({ onSubmit }) {
  // ... existing state ...
  const errorSummaryRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // TODO: Focus the error summary
      return;
    }

    onSubmit?.(values);
  }

  const errorIds = Object.keys(errors);

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {/* TODO: Render error summary when errorIds.length > 0 */}
      {/* It should have: ref, role="alert", tabIndex={-1}, aria-label */}
      {/* Inside: a heading "Please fix the following errors:" and a <ul> */}
      {/* Each <li>: <a href={\`#field-\${field}\`}>{errors[field]}</a> */}

      {/* ... rest of fields ... */}
    </form>
  );
}`,
        hints: [
          'errorSummaryRef.current?.focus() — optional chaining prevents errors if the ref is null',
          'tabIndex={-1} allows programmatic focus with .focus() but removes the element from tab order (correct here)',
          'The href links like #field-name scroll to and focus the input with that id — keyboard navigation within the page'
        ],
        expectedOutput: `// On invalid submit:
// Error summary appears at top with role="alert"
// Browser focus moves to summary — screen reader announces: "Form has 2 errors"
// Each error is a link: clicking "Enter a valid email address" moves focus to the email input`,
        solution: `const errorIds = Object.keys(errors);

// In JSX, before the fields:
{errorIds.length > 0 && (
  <div
    ref={errorSummaryRef}
    role="alert"
    tabIndex={-1}
    aria-label={\`Form has \${errorIds.length} error(s)\`}
    style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red' }}
  >
    <p>Please fix the following errors:</p>
    <ul>
      {errorIds.map((field) => (
        <li key={field}>
          <a href={\`#field-\${field}\`}>{errors[field]}</a>
        </li>
      ))}
    </ul>
  </div>
)}

// In handleSubmit:
if (Object.keys(newErrors).length > 0) {
  errorSummaryRef.current?.focus();
  return;
}`
      },
      {
        title: 'Step 5: Add Success Announcement and Clear Errors on Change',
        instruction: 'WHAT: Add a success live region that announces form submission to screen readers, and clear each field\'s error as the user types to fix it.\n\nWHY: Without a live region, screen reader users submit the form and hear silence — they do not know if it worked. The `aria-live="polite"` attribute tells the screen reader to announce new content when the user is idle. Clearing errors on change is a UX standard that reduces frustration — users should not see stale errors while actively fixing them.\n\nHOW: Track a submitted boolean in state. After successful submission, set it to true and render a `<p role="status" aria-live="polite">` thank-you message. In handleChange, check if the changed field has an error and remove it from the errors object using a functional setErrors update.',
        starterCode: `// Add submitted state:
const [submitted, setSubmitted] = useState(false);

function handleChange(e) {
  const { name, value } = e.target;
  setValues(prev => ({ ...prev, [name]: value }));

  // TODO: If errors[name] exists, remove it from errors state
  // Hint: use setErrors with a functional update that deletes the key
}

function handleSubmit(e) {
  // ... validation ...
  // On success:
  // TODO: setSubmitted(true)
  onSubmit?.(values);
}

// In JSX, after the submit button:
{/* TODO: Render success message when submitted is true */}
{/* Use role="status" and aria-live="polite" */}`,
        hints: [
          'setErrors(prev => { const next = { ...prev }; delete next[name]; return next; }) — immutable delete',
          'role="status" is softer than role="alert" — it waits for the user to finish what they are doing before announcing',
          'aria-live="polite" on a non-alert element also works — the combination of role="status" makes the intent clear to browsers'
        ],
        expectedOutput: `// While typing in an invalid field:
//   Error disappears as soon as the user starts editing (live feedback)
// After successful submit:
//   <p role="status" aria-live="polite">Thank you! Your message has been sent.</p>
//   Screen reader announces: "Thank you! Your message has been sent."`,
        solution: `const [submitted, setSubmitted] = useState(false);

function handleChange(e) {
  const { name, value } = e.target;
  setValues(prev => ({ ...prev, [name]: value }));
  if (errors[name]) {
    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const newErrors = validate();
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    errorSummaryRef.current?.focus();
    return;
  }

  setSubmitted(true);
  onSubmit?.(values);
}

// In JSX after the submit button:
{submitted && (
  <p role="status" aria-live="polite" style={{ color: 'green', marginTop: '1rem' }}>
    Thank you! Your message has been sent.
  </p>
)}`
      }
    ]
  }
];
