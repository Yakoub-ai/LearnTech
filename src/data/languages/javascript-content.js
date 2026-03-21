export const content = {
  beginner: `# JavaScript — Beginner Deep Dive

JavaScript is a high-level, single-threaded, garbage-collected, interpreted (or just-in-time compiled), prototype-based, multi-paradigm, dynamic language with a non-blocking event loop. It was created in 1995 in just one week by Brendan Eich with the goal of adding an easy-to-learn scripting language to the Netscape browser. Today it powers front-end web apps, servers with Node.js, mobile apps with React Native, and desktop apps with Electron — anything that *can* be built with JavaScript *will* be built with JavaScript.

---

## 1. Variables and Data Types

JavaScript has three ways to declare variables: \`var\`, \`let\`, and \`const\`.

**Why it matters:** Variable scoping bugs are among the most common mistakes in JavaScript. Choosing \`const\` by default and \`let\` when reassignment is needed prevents entire classes of bugs that \`var\` silently introduces.

\`\`\`javascript
// var — function-scoped, hoisted, avoid in modern code
var name = "Alice";

// let — block-scoped, can be reassigned
let count = 0;
count = count + 1;

// const — block-scoped, cannot be reassigned (but objects can be mutated)
const MAX_RETRIES = 3;

// Primitive types
const str     = "Hello";          // string
const num     = 42;               // number
const bool    = true;             // boolean
const nothing = null;             // null (intentional absence)
const notDef  = undefined;        // undefined (uninitialized)
const sym     = Symbol("id");     // symbol (unique key)

// Type coercion gotchas — use === always
console.log("5" + 3);      // "53"  (string concatenation wins)
console.log("5" - 3);      // 2     (numeric subtraction kicks in)
console.log(0 === "");     // false (strict equality, no coercion)
console.log(0 === false);  // false
\`\`\`

JavaScript is *dynamically typed*: a variable can hold any type at any time. This is powerful but demands discipline — always use strict equality (\`===\`) to avoid unexpected coercion surprises.

> **Role connection:** Every web development role uses JavaScript variables and types daily. Front-end engineers, Node.js developers, and full-stack developers all need these fundamentals cold.

---

## 2. Functions and Scope

Functions are first-class objects in JavaScript — they can be stored in variables, passed as arguments, and returned from other functions.

\`\`\`javascript
// Function declaration — hoisted, callable before definition
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function — concise, no own 'this' binding
const greetArrow = (name) => "Hello, " + name + "!";

// Default parameters
function createUser(name, role = "viewer") {
  return { name, role };
}

// Rest parameters — gather remaining args into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

// Closure — inner function remembers the scope it was created in
function createCounter() {
  let count = 0;         // private state
  return {
    increment: () => ++count,
    getCount:  () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2
\`\`\`

**Why it matters:** The closure pattern is everywhere in real JavaScript code — React hooks, Node.js callbacks, module patterns. Understanding that an inner function has access to the variables of its outer function, even after the outer function has returned, is essential.

> **Role connection:** React components are functions. Node.js APIs use callbacks and closures extensively. Every framework you will use builds on these primitives.

---

## 3. Arrays and Objects

Arrays and objects are the workhorses of JavaScript data handling.

\`\`\`javascript
// Array methods — avoid raw loops, use these
const fruits = ["apple", "banana", "cherry"];

const upper     = fruits.map(f => f.toUpperCase());             // transform each
const longNames = fruits.filter(f => f.length > 5);             // keep matching
const totalLen  = fruits.reduce((sum, f) => sum + f.length, 0); // accumulate
const found     = fruits.find(f => f.startsWith("b"));          // first match

// Destructuring and spread
const [first, ...rest] = fruits;                // first = "apple"
const moreFruits = [...fruits, "date"];         // non-mutating append

// Objects
const user = { name: "Alice", age: 30, address: { city: "Stockholm" } };
const { name, address: { city } } = user;       // nested destructuring
const updated = { ...user, age: 31 };           // non-mutating update
const zip = user?.address?.zip;                 // optional chaining -> undefined (not error)
const display = user.nickname ?? "Anonymous";   // nullish coalescing fallback
\`\`\`

**Why it matters:** \`map\`, \`filter\`, and \`reduce\` replace imperative loops with declarative transformations. Optional chaining (\`?.\`) eliminates the endless \`if (x && x.y && x.y.z)\` guards that made older JavaScript hard to read.

---

## 4. Control Flow

\`\`\`javascript
// Ternary for simple branches
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";

// for...of — iterate values (arrays, strings, Sets, Maps)
for (const fruit of ["apple", "banana"]) {
  console.log(fruit);
}

// for...in — iterate object keys (use with caution on arrays)
const person = { name: "Alice", age: 30 };
for (const key in person) {
  console.log(key, person[key]);
}

// Short-circuit evaluation
const username = inputName || "Guest";     // fallback if falsy
const setting  = config?.theme ?? "light"; // fallback if null/undefined
\`\`\`

---

## 5. DOM Manipulation

The Document Object Model is the browser's live representation of the HTML page. JavaScript interacts with it to build dynamic UIs.

\`\`\`javascript
// Selecting elements
const heading  = document.getElementById("main-title");
const allItems = document.querySelectorAll(".list-item"); // returns NodeList

// Modifying elements safely
heading.textContent = "New Title";       // Safe — no HTML parsing
heading.classList.add("active");
heading.classList.toggle("highlighted");

// Creating and inserting elements
const newDiv = document.createElement("div");
newDiv.textContent = "I am new!";
document.body.appendChild(newDiv);

// Reading and setting attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));
\`\`\`

**Why it matters:** Always prefer \`textContent\` when inserting user-provided text. It treats everything as a literal string, preventing injected markup from being interpreted by the browser. This is one of the most impactful security habits you can build early.

---

## 6. Events

Events connect user actions to your code. The browser uses an event loop to queue and dispatch them.

\`\`\`javascript
// Add a listener
const button = document.querySelector("#submit");
button.addEventListener("click", (e) => {
  e.preventDefault();            // stop default browser action
  console.log("Clicked:", e.target);
});

// Event delegation — listen at a parent, filter by target
// More efficient than attaching listeners to every list item
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked item:", e.target.textContent);
  }
});

// Keyboard events
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
\`\`\`

**Why it matters:** Event delegation lets you handle dynamically added elements with a single listener on the parent. It also means far fewer event listeners in memory — important for long-lived single-page apps.

---

## 7. Asynchronous JavaScript

JavaScript is single-threaded but handles I/O asynchronously through its non-blocking event loop. The \`async/await\` syntax makes this look and feel like synchronous code.

\`\`\`javascript
async function loadUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error("Failed to load user:", error.message);
    throw error; // re-throw so callers can handle it too
  }
}
\`\`\`

Under the hood, \`async/await\` is syntactic sugar over Promises. When you \`await\` a Promise, JavaScript leaves the function, does other work, and resumes when the Promise settles. This is how one thread handles thousands of concurrent network requests without blocking the UI.

**Why it matters:** Nearly every real-world JavaScript feature — fetching data, reading files in Node.js, querying databases — is asynchronous. Getting comfortable with \`async/await\` and error handling with \`try/catch\` is non-negotiable.

---

## 8. ES6+ Features

Modern JavaScript (ES2015 and beyond) provides powerful ergonomic features.

\`\`\`javascript
// Template literals
const greeting = \`Hello, \${name}! You have \${count} messages.\`;

// Map — key/value pairs with any key type, preserves insertion order
const roles = new Map();
roles.set("alice", "admin");
roles.set("bob", "viewer");
console.log(roles.get("alice")); // "admin"

// Set — unique values only
const tags = new Set(["js", "web", "js"]); // {"js", "web"}

// Nullish coalescing and optional assignment
const value = null ?? "default";   // "default"
let x = null;
x ??= 10;                          // x is now 10

// Logical assignment
let a = 0;
a ||= 42;    // a is now 42 (because 0 is falsy)
let b = 5;
b &&= b * 2; // b is now 10 (because 5 is truthy)
\`\`\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Variables | \`const\` by default, \`let\` when reassigning, never \`var\` |
| Functions | Arrow functions for callbacks; closures for private state |
| Arrays | Master \`map\`, \`filter\`, \`reduce\` over raw \`for\` loops |
| DOM | \`querySelector\` + \`addEventListener\`; \`textContent\` not \`innerHTML\` |
| Events | Use event delegation for dynamic content |
| Async | \`async/await\` with \`try/catch\`; the event loop keeps JS non-blocking |
| ES6+ | Template literals, Map, Set, optional chaining, nullish coalescing |

---

## Recommended Videos — Beginner

- **Fireship** — "JavaScript in 100 Seconds" — https://www.youtube.com/watch?v=DHjqpvDnNGE
- **Traversy Media** — "JavaScript Crash Course For Beginners" — https://www.youtube.com/watch?v=hdI2bqOjy3c
- **freeCodeCamp** — "JavaScript Programming – Full Course" — https://www.youtube.com/watch?v=jS4aFq5-91M
`,
  mid: `# JavaScript — Mid Level Deep Dive

This guide covers the intermediate concepts that separate productive mid-level engineers from beginners: closures, classes, modules, async patterns, error handling, functional programming, and testing.

---

## 1. Closures and Lexical Scope

A closure is a function that remembers the variables from the scope it was defined in, even after that outer scope has finished executing. Every scope in JavaScript has access to everything *outside* of it — its parent scope, its grandparent scope, and so on.

\`\`\`javascript
// Classic closure — createGreeter closes over "greeting"
function createGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}
const sayHello = createGreeter("Hello");
console.log(sayHello("Alice")); // "Hello, Alice!"
// "greeting" lives on inside the returned function's closure

// Closure for private state — balance is inaccessible from outside
function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit(amt) {
      balance += amt;
      return balance;
    },
    withdraw(amt) {
      if (amt > balance) throw new Error("Insufficient funds");
      balance -= amt;
      return balance;
    },
    getBalance() { return balance; },
  };
}

const account = createBankAccount(100);
account.deposit(50);  // 150
account.withdraw(30); // 120
// There is no way to directly modify "balance" — only through the API
\`\`\`

**Why it matters:** Closures are not a quirky edge case — they are the foundation of modules, React hooks (\`useState\` uses closures to persist values between renders), memoization, event handlers that need private context, and virtually every callback pattern. Web Dev Simplified's key insight: "anything on the inside has access to the things on the outside of its scope, all the way up the chain."

A practical async example: when you use \`fetch\` with \`.then()\`, the callback is a closure that can access variables from the outer function, even though that outer function may have returned long before the network request completed.

---

## 2. Classes and Inheritance

ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance — they make object-oriented patterns more readable without changing the underlying mechanism.

\`\`\`javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.name} says \${this.sound}\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Woof");   // call parent constructor
    this.breed = breed;
  }

  speak() {
    return super.speak() + "! (tail wagging)";
  }
}

// Private fields — truly inaccessible from outside the class
class Counter {
  #count = 0;

  increment() { this.#count++; }
  reset()     { this.#count = 0; }
  get value() { return this.#count; }
}

const c = new Counter();
c.increment();
console.log(c.value); // 1
// console.log(c.#count); // SyntaxError — genuinely private
\`\`\`

**Why it matters:** Private fields (\`#field\`) enforce encapsulation at the language level — unlike the old underscore convention, there is no way to access them from outside the class. This is the pattern to reach for when you need guaranteed data hiding.

---

## 3. Modules

ES modules are the standard for organizing JavaScript code. They enable static analysis and tree-shaking (dead code elimination) by bundlers like Vite and webpack.

\`\`\`javascript
// math.js — named exports
export function add(a, b)      { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159;

// calculator.js — default export
export default class Calculator {
  add(a, b)      { return a + b; }
  subtract(a, b) { return a - b; }
}

// app.js — importing
import Calculator from './calculator.js';      // default import
import { add, PI } from './math.js';           // named imports
import * as MathUtils from './math.js';        // namespace import

// Dynamic import — code-splitting, lazy loading
async function loadChart() {
  const { Chart } = await import('./chart.js');
  return new Chart();
}
\`\`\`

**Why it matters:** Dynamic imports are the mechanism behind route-based code splitting in React and Vue — only the code the user actually needs is loaded, dramatically improving initial page load performance.

---

## 4. Error Handling

Robust error handling makes the difference between applications that crash silently and ones that fail gracefully with useful diagnostic information.

\`\`\`javascript
// Custom error classes — carry structured diagnostic data
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "NetworkError";
    this.status = status;
  }
}

// Handling different error types
async function submitForm(data) {
  try {
    if (!data.email.includes("@")) {
      throw new ValidationError("email", "Invalid email address");
    }
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new NetworkError(response.status, "Request failed");
    }
    return await response.json();
  } catch (err) {
    if (err instanceof ValidationError) {
      showFieldError(err.field, err.message);
    } else if (err instanceof NetworkError) {
      showToast(\`Network error \${err.status}: \${err.message}\`);
    } else {
      throw err; // unknown error — re-throw for the outer handler
    }
  }
}
\`\`\`

**Why it matters:** Generic \`catch (err) { console.log(err) }\` is not error handling — it is error hiding. Using \`instanceof\` to distinguish error types lets you give users meaningful feedback and lets you log, report, or retry based on the actual failure mode.

---

## 5. Fetch API and Async Patterns

\`\`\`javascript
// Run independent requests in parallel — much faster than sequential await
async function loadDashboard() {
  const [users, posts, stats] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/stats").then(r => r.json()),
  ]);
  return { users, posts, stats };
}

// Timeout a slow request with AbortController
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Request timed out");
    throw err;
  }
}

// Promise.allSettled — continue even if some requests fail
async function loadPartialDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return results.map(r => r.status === "fulfilled" ? r.value : null);
}
\`\`\`

**Why it matters:** \`Promise.all\` converts N sequential round trips into one parallel wait. For a dashboard loading 3 independent resources at 200ms each, this cuts load time from 600ms to 200ms. \`Promise.allSettled\` keeps going when one source fails, enabling graceful partial rendering.

---

## 6. Testing with Vitest / Jest

Tests are not optional on professional teams. They are the proof that your code does what you claim, and the safety net that lets you refactor with confidence.

\`\`\`javascript
// math.test.js
import { describe, test, expect, vi } from 'vitest';
import { add, subtract } from './math.js';

describe("Math utilities", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
    expect(subtract(5, 10)).toBe(-5);
  });
});

// Testing async code with mocked fetch
describe("API functions", () => {
  test("fetches user data", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: "Alice" }),
      })
    ));

    const user = await loadUser(1);
    expect(user.name).toBe("Alice");
    expect(fetch).toHaveBeenCalledWith("/api/users/1");
  });
});
\`\`\`

**Why it matters:** Mocking \`fetch\` keeps tests fast, deterministic, and free from network dependencies. Tests that hit real APIs have unpredictable latency and external failure modes. Keep unit tests isolated.

---

## 7. Functional Programming Patterns

Functional programming treats functions as data: they can be passed, returned, and composed. The two key principles are **pure functions** (no side effects, output depends only on input) and **immutability** (never mutate, always create new values).

\`\`\`javascript
// Pure function — same input always gives same output, no side effects
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

// Function composition with pipe — left to right
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);
const transform = pipe(double, addOne, square);
console.log(transform(3)); // double->6, addOne->7, square->49

// Currying — transform multi-argument functions into chainable single-argument functions
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const curriedAdd = curry((a, b, c) => a + b + c);
const add5 = curriedAdd(5);  // partially applied
console.log(add5(3)(2));     // 10

// Immutable array operations — always return new arrays
const numbers = [1, 2, 3, 4, 5];
const doubled      = numbers.map(n => n * 2);          // [2,4,6,8,10]
const evens        = numbers.filter(n => n % 2 === 0); // [2,4]
const total        = numbers.reduce((sum, n) => sum + n, 0); // 15
const withSix      = [...numbers, 6];                  // [1,2,3,4,5,6]
const withoutThree = numbers.filter(n => n !== 3);     // [1,2,4,5]
\`\`\`

**Why it matters:** As Anjana Vakil explains in her JSUnconf talk: "A pure function takes input, uses that and only that to compute an output, and returns it." The payoff is predictability — pure functions are trivially testable, easy to compose, and understandable in isolation without needing to trace global state.

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Closures | Inner functions remember their outer scope, even after it returns |
| Classes | Syntactic sugar over prototypes; \`#private\` fields enforce encapsulation |
| Modules | ES modules enable tree-shaking and code splitting |
| Error Handling | Custom error classes + \`instanceof\` for structured recovery |
| Fetch | \`Promise.all\` for parallel; \`AbortController\` for timeouts |
| Testing | Mock dependencies; test behavior, not implementation |
| FP | Pure functions + immutability = predictable, testable code |

---

## Recommended Videos — Mid Level

- **Web Dev Simplified** — "Learn Closures In 7 Minutes" — https://www.youtube.com/watch?v=3a0I8ICR1Vg
- **Web Dev Simplified** — "JavaScript Async Await" — https://www.youtube.com/watch?v=V_Kr9OSfDeU
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ
`,
  senior: `# JavaScript — Senior Level Deep Dive

This guide covers the advanced topics that define senior JavaScript engineers: the event loop internals, memory management, performance optimization, design patterns, security, and Web Workers.

---

## 1. The Event Loop — A Deep Model

JavaScript is single-threaded: one call stack, one thing at a time. The event loop is the mechanism that makes this single thread appear concurrent. Philip Roberts described it memorably at JSConf EU: "The event loop's job is to look at the stack and look at the task queue. If the stack is empty it takes the first thing on the queue and pushes it on to the stack."

The key insight is that **the browser (or Node.js) provides APIs that operate outside the JavaScript runtime**. \`setTimeout\`, \`fetch\`, \`addEventListener\` — these are not in V8. They run in the browser's C++ layer. When they complete, they push callbacks onto a queue. The event loop moves those callbacks onto the call stack only when the stack is empty.

\`\`\`javascript
// Execution order quiz — understand this and you understand the event loop
console.log("1 — Sync");
setTimeout(() => console.log("2 — Macrotask"), 0);
Promise.resolve().then(() => console.log("3 — Microtask"));
console.log("4 — Sync");
// Output: 1, 4, 3, 2
// Sync first, then ALL microtasks, then ONE macrotask
\`\`\`

\`\`\`mermaid
flowchart TD
    A[Call Stack] --> B{Stack Empty?}
    B -->|No| A
    B -->|Yes| C{Microtask Queue?}
    C -->|Has tasks| D[Execute ALL Microtasks]
    D --> C
    C -->|Empty| E{Render Steps Due?}
    E -->|Yes| F[Style + Layout + Paint]
    F --> G{Macrotask Queue?}
    E -->|No| G
    G -->|Has tasks| H[Execute ONE Macrotask]
    H --> B
    G -->|Empty| I[Wait]
    I --> B
\`\`\`

**The three queues and their crucial differences:**

Jake Archibald's JSConf Asia talk nails the distinction between the three callback queues:

1. **Macrotask queue (task queue):** \`setTimeout\`, \`setInterval\`, I/O callbacks, click events from real user interaction. The event loop processes *one task at a time*, then re-checks everything else.

2. **Microtask queue:** Promise \`.then()\` callbacks, \`queueMicrotask()\`, MutationObserver. Microtasks are processed *to completion including newly-added ones* before any macrotask or render step runs. A microtask loop that keeps enqueuing microtasks blocks rendering permanently — the same as an infinite \`while\` loop.

3. **Animation callbacks (requestAnimationFrame):** Run as part of the render steps, before style calculation and paint. They fire at display frequency (typically 60 Hz) and are skipped for hidden tabs. This is what makes \`requestAnimationFrame\` correct for animation and \`setTimeout\` wrong — \`setTimeout\` fires too often and with timing drift.

\`\`\`javascript
// Anti-pattern: blocking the main thread with heavy sync work
// The browser cannot render while this runs
function processLargeArrayBlocking(data) {
  return data.map(item => heavyComputation(item)); // blocks for seconds
}

// Pattern: chunked processing — yield to the event loop between batches
function processInChunks(items, chunkSize = 100) {
  let i = 0;
  return new Promise((resolve) => {
    const results = [];
    function chunk() {
      const end = Math.min(i + chunkSize, items.length);
      for (; i < end; i++) {
        results.push(heavyComputation(items[i]));
      }
      if (i < items.length) {
        setTimeout(chunk, 0); // yield — allows render + user interaction
      } else {
        resolve(results);
      }
    }
    chunk();
  });
}

// setTimeout(fn, 0) means "run after the current task completes and the stack clears"
// Minimum actual delay is ~4.7ms in most browsers, not truly zero
\`\`\`

**Why it matters:** Understanding the event loop is the prerequisite for diagnosing performance problems. Jank (frame drops, unresponsive UI) always has the same root cause: something is blocking the main thread too long. Knowing *which queue* your code ends up in tells you how it interacts with rendering.

---

## 2. Memory Management

JavaScript has automatic garbage collection, but "automatic" does not mean "infallible." Memory leaks in long-running single-page applications are a real production problem.

\`\`\`javascript
// Memory leak — event listener keeps the component alive forever
class LeakyComponent {
  constructor() {
    this.handler = () => this.handleResize();
    window.addEventListener("resize", this.handler);
    // If destroy() is never called, this object can never be GC'd
  }
  handleResize() { /* ... */ }
}

// Fixed — always clean up listeners in a destroy/unmount method
class Component {
  constructor() {
    this.handler = () => this.handleResize();
    window.addEventListener("resize", this.handler);
  }
  handleResize() { /* ... */ }
  destroy() {
    window.removeEventListener("resize", this.handler);
  }
}

// WeakMap — metadata that doesn't prevent garbage collection
// When the key object is GC'd, the WeakMap entry is also GC'd automatically
const cache = new WeakMap();
function getMetadata(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, { createdAt: Date.now(), hits: 0 });
  }
  const meta = cache.get(obj);
  meta.hits++;
  return meta;
}
\`\`\`

**Common memory leak patterns:**
- Event listeners added to \`window\` or \`document\` but never removed
- Closures in long-lived timers that reference large objects
- Growing arrays or Maps used as caches with no eviction policy
- Detached DOM nodes still referenced by JavaScript variables

---

## 3. Performance Optimization

\`\`\`javascript
// Debounce — delay execution until activity stops
// Use for: search input, form auto-save, window resize handlers
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`).then(/* ... */);
}, 300);

// Throttle — execute at most once per interval
// Use for: scroll handlers, mouse move, rate-limited API calls
function throttle(fn, intervalMs) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= intervalMs) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => updateParallaxPosition(), 16); // ~60fps

// Memoize — cache results of pure functions
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => fibonacci(n));
\`\`\`

**Why it matters:** Philip Roberts demonstrated this live at JSConf EU — flooding the callback queue with scroll events degrades UI performance. A debounced search input fires once per 300ms instead of hundreds of times per second, saving hundreds of network requests and DOM updates.

---

## 4. Design Patterns

\`\`\`javascript
// Observer / EventEmitter — decoupled pub/sub
class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    // Return an unsubscribe function (common React / RxJS pattern)
    return () => this.off(event, callback);
  }

  off(event, callback) {
    this.#listeners.get(event)?.delete(callback);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(cb => cb(...args));
  }
}

const emitter = new EventEmitter();
const unsubscribe = emitter.on("data", (payload) => console.log(payload));
emitter.emit("data", { id: 1 }); // logs { id: 1 }
unsubscribe(); // removes listener

// Strategy Pattern — swap algorithms at runtime without long if/else chains
const sortStrategies = {
  alpha:    (a, b) => a.name.localeCompare(b.name),
  date:     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  priority: (a, b) => b.priority - a.priority,
};

function sortItems(items, strategy) {
  if (!sortStrategies[strategy]) throw new Error(\`Unknown strategy: \${strategy}\`);
  return [...items].sort(sortStrategies[strategy]);
}

// Proxy — intercept and validate object property assignments
function createValidatedModel(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (schema[prop] && !schema[prop](value)) {
        throw new TypeError(\`Invalid value for \${prop}: \${value}\`);
      }
      target[prop] = value;
      return true;
    }
  });
}

const userModel = createValidatedModel({
  age: (v) => typeof v === "number" && v >= 0 && v < 150,
});
userModel.age = 25;    // OK
// userModel.age = -1; // TypeError — schema validation failed
\`\`\`

---

## 5. Security Best Practices

Security is not a feature you add later — it is a discipline woven into daily coding decisions.

**XSS (Cross-Site Scripting):** Use \`textContent\` to insert user-provided text into the DOM — it treats the value as a plain string, never as markup. When rich HTML is unavoidable, sanitize it first with a library like DOMPurify before assigning to the DOM. Avoid passing untrusted content to any API that parses HTML markup.

**Prototype Pollution:** Malicious payloads like \`{"__proto__": {"isAdmin": true}}\` can pollute \`Object.prototype\` if you merge objects naively using \`for...in\`. Always use \`Object.keys()\` (not \`for...in\`) when iterating untrusted data, and block dangerous keys explicitly.

\`\`\`javascript
// SAFE — guard against prototype pollution when merging untrusted objects
function safeMerge(target, source) {
  const dangerous = new Set(["__proto__", "constructor", "prototype"]);
  for (const key of Object.keys(source)) {
    if (!dangerous.has(key)) target[key] = source[key];
  }
}

// SAFER — Object.assign does not follow the prototype chain
const merged = Object.assign(Object.create(null), safeDefaults, userInput);
\`\`\`

**CSRF Prevention:**

\`\`\`javascript
async function securePost(url, data) {
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": token,
    },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
}
\`\`\`

**Content Security Policy** is your second line of defense: configure it at the HTTP header level to restrict which scripts, styles, and origins the browser will accept. A strict CSP blocks injected scripts even if an XSS vulnerability exists in your code.

---

## 6. Web Workers

Web Workers run JavaScript in a background thread, completely isolated from the main thread. They cannot access the DOM, but they can perform CPU-intensive computation without blocking the UI.

\`\`\`javascript
// main.js — spawn a worker and communicate via messages
const worker = new Worker("worker.js");

worker.postMessage({ type: "compress", payload: largeImageData });

worker.onmessage = (event) => {
  const { type, result } = event.data;
  if (type === "compress:done") {
    displayImage(result);
  }
};

worker.onerror = (error) => {
  console.error("Worker error:", error.message);
  worker.terminate();
};

// worker.js — runs in isolated thread, no DOM access
self.onmessage = (event) => {
  const { type, payload } = event.data;
  if (type === "compress") {
    const result = compressImage(payload); // CPU-intensive work
    self.postMessage({ type: "compress:done", result });
  }
};

// Transferable objects — zero-copy transfer of ArrayBuffers
// Far faster than structured clone for large binary data
const buffer = new ArrayBuffer(1024 * 1024); // 1 MB
worker.postMessage({ type: "process", buffer }, [buffer]);
// After transfer, buffer is detached in the main thread — zero-copy
\`\`\`

**Why it matters:** The Philip Roberts event loop talk makes this visceral: a slow synchronous operation blocks the main thread and the browser cannot paint, respond to clicks, or do anything else. Web Workers move that cost to another thread entirely. Image processing, video encoding, cryptography, and large data parsing are all excellent candidates.

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Event Loop | Microtasks drain completely before each macrotask; never block the main thread |
| Memory | Remove event listeners; use WeakMap for GC-friendly metadata |
| Performance | Debounce user input; throttle scroll handlers; memoize pure functions |
| Design Patterns | Observer for decoupled events; Strategy to replace if/else chains; Proxy for validation |
| Security | \`textContent\` for text; DOMPurify for HTML; guard against prototype pollution; CSRF tokens |
| Web Workers | Offload CPU work to background threads with \`postMessage\` |

---

## Recommended Videos — Senior Level

- **JSConf EU** — "What the heck is the event loop anyway?" (Philip Roberts) — https://www.youtube.com/watch?v=8aGhZQkoFbQ
- **JSConf Asia** — "In the Loop" (Jake Archibald) — https://www.youtube.com/watch?v=cCOL7MC4Pl0
- **JSUnconf** — "Learning Functional Programming with JavaScript" (Anjana Vakil) — https://www.youtube.com/watch?v=e-5obm1G_FY
`,
};
