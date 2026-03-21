export const content = {
  beginner: `# JavaScript — Beginner Deep Dive

This guide covers the foundational building blocks of JavaScript. Each section includes detailed explanations, practical code examples, and exercises.

---

## 1. Variables and Data Types

JavaScript has three ways to declare variables: \\\`var\\\`, \\\`let\\\`, and \\\`const\\\`.

**Why it matters:** Variable scoping bugs are among the most common mistakes in JavaScript. Using \\\`let\\\` and \\\`const\\\` instead of \\\`var\\\` prevents entire classes of bugs.

\\\`\\\`\\\`javascript
var name = "Alice";

let count = 0;
count = count + 1;

const MAX_RETRIES = 3;

const str = "Hello";           // string
const num = 42;                // number
const bool = true;             // boolean
const nothing = null;          // null
const notDefined = undefined;  // undefined
const sym = Symbol("id");      // symbol

console.log("5" + 3);     // "53" (string wins)
console.log("5" - 3);     // 2 (number wins)

console.log(0 === "");     // false
console.log(0 === false);  // false
\\\`\\\`\\\`

> **Role connection:** Every web development role uses JavaScript variables and types daily.

---

## 2. Functions and Scope

\\\`\\\`\\\`javascript
function greet(name) { return "Hello, " + name + "!"; }

const greetArrow = (name) => "Hello, " + name + "!";

function createUser(name, role = "viewer") { return { name, role }; }
function sum(...numbers) { return numbers.reduce((t, n) => t + n, 0); }

function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
\\\`\\\`\\\`

> **Role connection:** React components are functions. Node.js APIs use callbacks and closures extensively.

---

## 3. Arrays and Objects

\\\`\\\`\\\`javascript
const fruits = ["apple", "banana", "cherry"];
const upper = fruits.map(f => f.toUpperCase());
const longNames = fruits.filter(f => f.length > 5);
const totalLength = fruits.reduce((sum, f) => sum + f.length, 0);
const found = fruits.find(f => f.startsWith("b"));

const [first, ...rest] = fruits; // Destructuring
const moreFruits = [...fruits, "date"]; // Spread

const user = { name: "Alice", age: 30, address: { city: "Stockholm" } };
const { name, address: { city } } = user;
const updated = { ...user, age: 31 };
const zip = user?.address?.zip; // Optional chaining
\\\`\\\`\\\`

---

## 4. Control Flow

\\\`\\\`\\\`javascript
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";

for (const fruit of ["apple", "banana"]) { console.log(fruit); }
for (const key in user) { console.log(key, user[key]); }
\\\`\\\`\\\`

---

## 5. DOM Manipulation

\\\`\\\`\\\`javascript
const heading = document.getElementById("main-title");
heading.textContent = "New Title"; // Safe text update
heading.classList.add("active");
heading.classList.toggle("highlighted");

const newDiv = document.createElement("div");
newDiv.textContent = "I am new!";
document.body.appendChild(newDiv);
\\\`\\\`\\\`

---

## 6. Events

\\\`\\\`\\\`javascript
const button = document.querySelector("#submit");
button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked:", e.target);
});

document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked item:", e.target.textContent);
  }
});
\\\`\\\`\\\`

---

## 7. Asynchronous JavaScript

\\\`\\\`\\\`javascript
async function loadUser() {
  try {
    const response = await fetch("/api/users/1");
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error("Failed:", error);
  }
}
\\\`\\\`\\\`

---

## 8. ES6+ Features

\\\`\\\`\\\`javascript
const greeting = \\\`Hello, \\\${name}!\\\`;
const map = new Map();
map.set("key", "value");
const set = new Set([1, 2, 2, 3]); // {1, 2, 3}
const value = null ?? "default";
let x = null;
x ??= 10;
\\\`\\\`\\\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Variables | Use \\\`const\\\` by default, \\\`let\\\` when reassigning |
| Functions | Arrow functions for callbacks, closures for state |
| Arrays | Master map, filter, reduce |
| DOM | querySelector + addEventListener |
| Async | async/await with try/catch |

---

## Recommended Videos — Beginner

- **Fireship** — "JavaScript in 100 Seconds" — https://www.youtube.com/watch?v=DHjqpvDnNGE
- **Traversy Media** — "JavaScript Crash Course For Beginners" — https://www.youtube.com/watch?v=hdI2bqOjy3c
- **freeCodeCamp** — "JavaScript Programming – Full Course" — https://www.youtube.com/watch?v=jS4aFq5-91M
`,
  mid: `# JavaScript — Mid Level Deep Dive

Intermediate JavaScript concepts for productive mid-level engineers.

---

## 1. Closures and Lexical Scope

\\\`\\\`\\\`javascript
function createGreeter(greeting) {
  return function(name) { return greeting + ", " + name + "!"; };
}
const sayHello = createGreeter("Hello");
console.log(sayHello("Alice")); // "Hello, Alice!"

function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit(amt) { balance += amt; return balance; },
    withdraw(amt) {
      if (amt > balance) throw new Error("Insufficient funds");
      balance -= amt; return balance;
    },
    getBalance() { return balance; },
  };
}
\\\`\\\`\\\`

---

## 2. Classes and Inheritance

\\\`\\\`\\\`javascript
class Animal {
  constructor(name, sound) { this.name = name; this.sound = sound; }
  speak() { return this.name + " says " + this.sound; }
}

class Dog extends Animal {
  constructor(name, breed) { super(name, "Woof"); this.breed = breed; }
  speak() { return super.speak() + "! (tail wagging)"; }
}

class Counter {
  #count = 0; // Private field
  increment() { this.#count++; }
  get value() { return this.#count; }
}
\\\`\\\`\\\`

---

## 3. Modules

\\\`\\\`\\\`javascript
export function add(a, b) { return a + b; }
export default class Calculator { }
import { add } from './math.js';
const { Chart } = await import('./chart.js'); // Dynamic import
\\\`\\\`\\\`

---

## 4. Error Handling

\\\`\\\`\\\`javascript
class ValidationError extends Error {
  constructor(field, msg) { super(msg); this.name = "ValidationError"; this.field = field; }
}

try {
  if (!email.includes("@")) throw new ValidationError("email", "Invalid");
} catch (err) {
  if (err instanceof ValidationError) console.log(err.field, err.message);
  else throw err;
}
\\\`\\\`\\\`

---

## 5. Fetch API and Async Patterns

\\\`\\\`\\\`javascript
async function loadDashboard() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return { users, posts };
}

const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
fetch("/api/slow", { signal: controller.signal });
\\\`\\\`\\\`

---

## 6. Testing with Jest

\\\`\\\`\\\`javascript
describe("Calculator", () => {
  test("adds numbers", () => { expect(add(2, 3)).toBe(5); });
  test("async data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1 }]) })
    );
    const users = await getUsers();
    expect(users).toHaveLength(1);
  });
});
\\\`\\\`\\\`

---

## 7. Functional Programming

\\\`\\\`\\\`javascript
const pipe = (...fns) => (v) => fns.reduce((a, fn) => fn(a), v);
const transform = pipe((x) => x * 2, (x) => x + 1, (x) => x * x);
console.log(transform(3)); // 49

const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};
\\\`\\\`\\\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Closures | Functions remember their creation scope |
| Classes | Syntactic sugar over prototypes |
| Modules | ES modules enable tree-shaking |
| Fetch | Use async/await with AbortController |
| FP | Composition and immutability for predictable code |

---

## Recommended Videos — Mid Level

- **Web Dev Simplified** — "Learn Closures In 7 Minutes" — https://www.youtube.com/watch?v=3a0I8ICR1Vg
- **Web Dev Simplified** — "JavaScript Async Await" — https://www.youtube.com/watch?v=V_Kr9OSfDeU
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ
`,
  senior: `# JavaScript — Senior Level Deep Dive

Advanced JavaScript topics: event loop, memory, performance, patterns, security.

---

## 1. The Event Loop

\\\`\\\`\\\`javascript
console.log("1 — Sync");
setTimeout(() => console.log("2 — Macrotask"), 0);
Promise.resolve().then(() => console.log("3 — Microtask"));
console.log("4 — Sync");
\\\`\\\`\\\`

\\\`\\\`\\\`mermaid
flowchart TD
    A[Call Stack] --> B{Stack Empty?}
    B -->|No| A
    B -->|Yes| C{Microtask Queue?}
    C -->|Has tasks| D[Execute ALL Microtasks]
    D --> C
    C -->|Empty| E{Macrotask Queue?}
    E -->|Has tasks| F[Execute ONE Macrotask]
    F --> B
    E -->|Empty| G[Wait]
    G --> B
\\\`\\\`\\\`

\\\`\\\`\\\`javascript
function processInChunks(items, size = 100) {
  let i = 0;
  function chunk() {
    const end = Math.min(i + size, items.length);
    for (; i < end; i++) { /* process */ }
    if (i < items.length) setTimeout(chunk, 0);
  }
  chunk();
}
\\\`\\\`\\\`

---

## 2. Memory Management

\\\`\\\`\\\`javascript
class Component {
  constructor() {
    this.handler = () => {};
    window.addEventListener("resize", this.handler);
  }
  destroy() { window.removeEventListener("resize", this.handler); }
}

const cache = new WeakMap();
function getMeta(obj) {
  if (!cache.has(obj)) cache.set(obj, { created: Date.now() });
  return cache.get(obj);
}
\\\`\\\`\\\`

---

## 3. Performance

\\\`\\\`\\\`javascript
function debounce(fn, delay) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), delay); };
}

function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const r = fn(...args);
    cache.set(key, r);
    return r;
  };
}
\\\`\\\`\\\`

---

## 4. Design Patterns

\\\`\\\`\\\`javascript
class EventEmitter {
  constructor() { this.listeners = new Map(); }
  on(evt, cb) {
    if (!this.listeners.has(evt)) this.listeners.set(evt, []);
    this.listeners.get(evt).push(cb);
    return () => this.off(evt, cb);
  }
  off(evt, cb) {
    const cbs = this.listeners.get(evt);
    if (cbs) this.listeners.set(evt, cbs.filter(c => c !== cb));
  }
  emit(evt, ...args) { (this.listeners.get(evt) || []).forEach(cb => cb(...args)); }
}

const strategies = {
  alpha: (a, b) => a.name.localeCompare(b.name),
  date: (a, b) => new Date(b.date) - new Date(a.date),
};
function sortItems(items, strategy) { return [...items].sort(strategies[strategy]); }
\\\`\\\`\\\`

---

## 5. Security Best Practices

**XSS Prevention:** Always use \\\`textContent\\\` for inserting user-provided text. Never pass untrusted data to methods that parse markup. Use a sanitizer library like DOMPurify when rendering rich content.

\\\`\\\`\\\`javascript
element.textContent = userInput;


function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key === "__proto__" || key === "constructor") continue;
    target[key] = source[key];
  }
}

async function securePost(url, data) {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": token },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
}
\\\`\\\`\\\`

---

## 6. Web Workers

\\\`\\\`\\\`javascript
const worker = new Worker("worker.js");
worker.postMessage({ type: "compute", data: [1, 2, 3] });
worker.onmessage = (e) => console.log("Result:", e.data);

self.onmessage = (event) => {
  const result = event.data.data.map(n => n * n);
  self.postMessage(result);
};
\\\`\\\`\\\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Event Loop | Microtasks before macrotasks; never block |
| Memory | Clean up listeners; use WeakMap |
| Performance | Debounce, throttle, memoize |
| Patterns | Observer, Strategy solve recurring problems |
| Security | textContent for text, DOMPurify for HTML, CSRF tokens |
| Workers | Offload CPU work to background threads |

---

## Recommended Videos — Senior Level

- **JSConf EU** — "Jake Archibald on the web browser event loop" — https://www.youtube.com/watch?v=cCOL7MC4Pl0
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ
- **JSUnconf** — "Learning Functional Programming with JavaScript" — https://www.youtube.com/watch?v=e-5obm1G_FY
`,
}
