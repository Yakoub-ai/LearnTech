# JavaScript — Mid-Level Concept Reference

> Full interactive version available on the [Tech Hub Learning Platform](/language/javascript/mid)

## Prerequisites

- Completion of the JavaScript Beginner guide or equivalent knowledge
- Comfortable with DOM manipulation, events, and ES6+ syntax
- Experience building small interactive web pages

## Estimated Time

50 hours

---

## 1. Closures and Lexical Scope

A closure is a function that remembers the variables from the scope it was defined in, even after that outer scope has finished executing. Every function in JavaScript forms a closure — but the term matters most when an inner function outlives its parent.

**Code walkthrough:**

```javascript
// Step 1: Classic closure — createGreeter closes over "greeting"
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}
const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob");      // "Hi, Bob!"
// Each function has its own independent closure with its own "greeting"

// Step 2: Closure for private state — balance is truly inaccessible
function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit(amt) {
      if (amt <= 0) throw new RangeError("Deposit must be positive");
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
// There is no way to directly read or modify "balance"

// Step 3: React's useState is built on this closure pattern
function useState(initialValue) {
  let state = initialValue;
  const getState = () => state;
  const setState = (newValue) => {
    state = typeof newValue === "function" ? newValue(state) : newValue;
  };
  return [getState, setState];
}
```

### The Classic Loop Closure Bug

```javascript
// Step 4: var leaks out of the loop — all closures share one i
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach(fn => fn()); // 3, 3, 3 — NOT 0, 1, 2

// Step 5: Fix with let — creates a new binding per iteration
for (let i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach(fn => fn()); // 0, 1, 2
```

### Stale Closures in React

A stale closure occurs when a `useEffect` or event handler captures a value from a previous render and does not see updated state. This happens when the dependency array in `useEffect` is incomplete — the effect retains the variable from the render cycle it was created in.

**Key takeaways:**
- Closures are the foundation of React hooks, module patterns, and memoization
- The loop bug with `var` is fixed by `let` (new binding per iteration)
- Always include all referenced variables in `useEffect` dependency arrays to avoid stale closures

---

## 2. Prototypes and Classes

ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance. Understanding the prototype chain explains `instanceof`, method lookup, and why `[].map()` works.

```javascript
// Step 1: The prototype chain
const arr = [1, 2, 3];
// arr → Array.prototype → Object.prototype → null
// map() lives on Array.prototype — found via the chain

// Step 2: ES6 Classes
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    return `${this.name} says ${this.sound}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Woof");   // must call super() before using this
    this.breed = breed;
  }
  speak() {
    return super.speak() + "! (tail wagging)";
  }
}

const rex = new Dog("Rex", "Labrador");
rex instanceof Dog;    // true
rex instanceof Animal; // true — inheritance chain

// Step 3: Private fields — truly inaccessible from outside
class Counter {
  #count = 0;
  #limit;

  constructor(limit = Infinity) {
    this.#limit = limit;
  }

  increment() {
    if (this.#count >= this.#limit) throw new RangeError("Limit reached");
    return ++this.#count;
  }

  get value() { return this.#count; }
  static create(limit) { return new Counter(limit); }
}

const c = Counter.create(3);
c.increment(); // 1
// c.#count;   // SyntaxError — genuinely private
```

**Key takeaways:**
- Classes are syntax sugar over prototypes — `instanceof` and method lookup use the prototype chain
- Private fields (`#field`) are enforced at the language level — no access from outside
- Always call `super()` before accessing `this` in derived class constructors

---

## 3. ES Modules

ES modules are the standard for organizing JavaScript code. They enable static analysis and tree-shaking by bundlers.

```javascript
// Step 1: Named exports (many per file)
// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159;

// Step 2: Default export (one per file)
// calculator.js
export default class Calculator {
  add(a, b) { return a + b; }
}

// Step 3: Importing
import Calculator from './calculator.js';      // default import
import { add, PI } from './math.js';           // named imports
import { add as mathAdd } from './math.js';    // rename on import
import * as MathUtils from './math.js';        // namespace import

// Step 4: Re-exporting — barrel files bundle exports from a directory
export { add, subtract } from './math.js';
export { default as Calculator } from './calculator.js';

// Step 5: Dynamic import — code-splitting and lazy loading
async function loadChart() {
  const { Chart } = await import('./chart.js');
  return new Chart(); // only downloaded when called
}
```

**Why it matters:** Dynamic imports are the mechanism behind route-based code splitting in React and Vue. Tree-shaking eliminates exported functions that are never imported, shrinking bundle sizes. CommonJS `require()` cannot be tree-shaken because it is dynamic.

---

## 4. Error Handling

Robust error handling is the difference between applications that crash silently and ones that fail gracefully.

```javascript
// Step 1: Custom error classes carry structured diagnostic data
class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(message, "VALIDATION_ERROR");
    this.field = field;
  }
}

class NetworkError extends AppError {
  constructor(status, message) {
    super(message, "NETWORK_ERROR");
    this.status = status;
    this.retryable = status >= 500;
  }
}

// Step 2: instanceof discrimination for targeted recovery
async function submitForm(data) {
  try {
    if (!data.email.includes("@")) {
      throw new ValidationError("email", "Invalid email address");
    }
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new NetworkError(response.status, "Request failed");
    return await response.json();
  } catch (err) {
    if (err instanceof ValidationError) {
      showFieldError(err.field, err.message);
    } else if (err instanceof NetworkError && err.retryable) {
      scheduleRetry(() => submitForm(data));
    } else {
      throw err; // re-throw unknown errors — never silently swallow them
    }
  }
}
```

**Key rule:** Generic `catch (err) { console.log(err) }` is error hiding, not error handling. Use `instanceof` to give users meaningful feedback and to log, report, or retry based on the actual failure mode. Always re-throw errors you cannot handle.

---

## 5. Advanced Async Patterns

```javascript
// Step 1: Promise.all — run independent requests in parallel
async function loadDashboard() {
  const [users, posts, stats] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/stats").then(r => r.json()),
  ]);
  return { users, posts, stats };
}

// Step 2: Promise.allSettled — continue even if some fail
async function loadPartialDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return results.map(r => r.status === "fulfilled" ? r.value : null);
}

// Step 3: AbortController — cancel in-flight fetch
let abortController = null;
inputEl.addEventListener("input", async (e) => {
  abortController?.abort();
  abortController = new AbortController();
  try {
    const results = await fetch(
      `/api/search?q=${e.target.value}`,
      { signal: abortController.signal }
    ).then(r => r.json());
    renderResults(results);
  } catch (err) {
    if (err.name !== "AbortError") throw err;
  }
});

// Step 4: Promise.withResolvers (ES2024) — cleaner deferred pattern
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve("done"), 1000);
const result = await promise; // "done"

// Step 5: Async generators — lazy pagination
async function* fetchPages(baseUrl) {
  let page = 1;
  while (true) {
    const data = await fetch(`${baseUrl}?page=${page}`).then(r => r.json());
    if (!data.items.length) break;
    yield data.items;
    page++;
  }
}

for await (const items of fetchPages("/api/products")) {
  renderItems(items);
}
```

**Key takeaways:**
- `Promise.all` converts N sequential round trips into one parallel wait
- `Promise.allSettled` gives you partial results when some requests fail
- `AbortController` prevents stale responses from overwriting newer data

---

## 6. Testing with Vitest / Jest

Tests are not optional on professional teams. They are the safety net that lets you refactor with confidence.

```javascript
// Step 1: Basic test structure
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { add, divide } from './math.js';

describe("Math utilities", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("throws on division by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });
});

// Step 2: Mocking fetch for async tests
describe("API functions", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("fetches user data successfully", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: "Alice" }),
    });

    const user = await loadUser(1);
    expect(user.name).toBe("Alice");
    expect(fetch).toHaveBeenCalledWith("/api/users/1");
  });

  test("throws on non-ok response", async () => {
    fetch.mockResolvedValue({ ok: false, status: 404 });
    await expect(loadUser(999)).rejects.toThrow("HTTP error: 404");
  });
});
```

**Key principles:**
- Mock external dependencies (fetch, databases) to keep tests fast and deterministic
- Use `beforeEach`/`afterEach` to ensure clean state between tests
- Test behavior (inputs and outputs), not implementation details
- Modern alternative: Node.js 22+ ships with a built-in test runner (`node:test`)

---

## 7. Functional Programming Patterns

Functional programming treats functions as data. The two key principles are pure functions (no side effects) and immutability (never mutate, always create new).

```javascript
// Step 1: Pure function — same input always gives same output
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

// Step 2: Function composition — pipe (left to right)
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);
const transform = pipe(double, addOne, square);
transform(3); // double→6, addOne→7, square→49

// Step 3: Currying — partially apply multi-argument functions
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const multiply = curry((a, b) => a * b);
const double2 = multiply(2);
const triple = multiply(3);
double2(5); // 10
triple(4);  // 12

// Step 4: Immutable operations — always return new arrays
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);         // [2,4,6,8,10]
const evens = numbers.filter(n => n % 2 === 0);  // [2,4]
const total = numbers.reduce((sum, n) => sum + n, 0); // 15
// numbers is unchanged in all cases

// Step 5: Real-world functional pipeline
const processOrders = (orders) =>
  orders
    .filter(order => order.status === "paid")
    .map(order => ({
      ...order,
      total: order.items.reduce((s, i) => s + i.price, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
```

**Key takeaways:**
- Pure functions are trivially testable — no mocking needed
- Immutability eliminates shared-state mutation bugs
- `pipe()` lets you compose small, focused functions into complex transformations
- React reducers, Redux, and RxJS are all built on FP principles

---

## 8. ES2024 Features

ES2024 introduced features now available in all major browsers and Node.js 22+.

```javascript
// Step 1: Object.groupBy — group array items by a key
const people = [
  { name: "Alice", dept: "eng" },
  { name: "Bob", dept: "sales" },
  { name: "Charlie", dept: "eng" },
];
const byDept = Object.groupBy(people, (person) => person.dept);
// { eng: [{...}, {...}], sales: [{...}] }

// Step 2: Map.groupBy — returns a Map (useful for non-string keys)
const byLength = Map.groupBy(["hi", "hey", "hello"], (word) => word.length);
// Map { 2 => ["hi"], 3 => ["hey"], 5 => ["hello"] }

// Step 3: Promise.withResolvers — extract resolve/reject cleanly
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve("done"), 1000);

// Step 4: structuredClone — deep copy built into the language
const original = { nested: { value: 42 }, date: new Date(), set: new Set([1, 2]) };
const clone = structuredClone(original);
clone.nested.value = 99;
console.log(original.nested.value); // 42 — untouched
// Handles Date, Map, Set, ArrayBuffer, RegExp — NOT functions or DOM nodes
```

**Why it matters:**
- `Object.groupBy` replaces the most common `reduce` pattern
- `Promise.withResolvers` eliminates the awkward closure pattern for extracting `resolve`/`reject`
- `structuredClone` replaces the `JSON.parse(JSON.stringify(x))` hack for deep copying

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Closures | Inner functions remember outer scope; foundation of React hooks and modules |
| Prototypes | Classes are syntax sugar; the prototype chain explains `instanceof` and method lookup |
| Modules | ES modules enable tree-shaking; dynamic `import()` enables code splitting |
| Error Handling | Custom error classes + `instanceof` for structured recovery; never swallow errors |
| Async | `Promise.all` for parallel; `AbortController` for cancellation; `allSettled` for partial data |
| Testing | Mock dependencies; `beforeEach`/`afterEach` for isolation; test behavior not implementation |
| FP | Pure functions + immutability = predictable, composable, testable code |
| ES2024 | `Object.groupBy`, `Promise.withResolvers`, `structuredClone` |

---

## Recommended Videos

- **Web Dev Simplified** — "Learn Closures In 7 Minutes" — https://www.youtube.com/watch?v=3a0I8ICR1Vg
- **Web Dev Simplified** — "JavaScript Async Await" — https://www.youtube.com/watch?v=V_Kr9OSfDeU
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ

---

## Next Steps

After completing this level, proceed to [JavaScript Senior](../JavaScript/Senior.md).
