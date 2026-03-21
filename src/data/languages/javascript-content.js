export const content = {
  beginner: `# JavaScript — Beginner Deep Dive

JavaScript is a high-level, single-threaded, garbage-collected, interpreted (or just-in-time compiled), prototype-based, multi-paradigm, dynamic language with a non-blocking event loop. It was created in 1995 in just one week by Brendan Eich with the goal of adding an easy-to-learn scripting language to the Netscape browser. Today it powers front-end web apps, servers with Node.js, mobile apps with React Native, and desktop apps with Electron — anything that *can* be built with JavaScript *will* be built with JavaScript.

## What you will learn

- Declare variables with \`const\`, \`let\`, and \`var\` and understand why choice matters
- Identify JavaScript's primitive types and understand dynamic typing and coercion
- Write functions in all three styles (declaration, expression, arrow) and understand closures
- Manipulate arrays with \`map\`, \`filter\`, \`reduce\` and objects with destructuring and spread
- Write conditional logic and loops using modern idioms
- Select and modify DOM elements safely without XSS risk
- Handle user events and understand event delegation
- Write asynchronous code with \`async/await\` and handle errors with \`try/catch\`
- Use modern ES6+ features: template literals, Map, Set, optional chaining, nullish coalescing

---

## 1. Variables and Data Types

JavaScript has three ways to declare variables: \`var\`, \`let\`, and \`const\`.

**Why it matters:** Variable scoping bugs are among the most common mistakes in JavaScript. Choosing \`const\` by default and \`let\` when reassignment is needed prevents entire classes of bugs that \`var\` silently introduces.

### JavaScript Primitive Types

| Type | Example | \`typeof\` result | Notes |
|------|---------|------------------|-------|
| \`string\` | \`"hello"\` | \`"string"\` | Immutable sequence of UTF-16 code units |
| \`number\` | \`42\`, \`3.14\` | \`"number"\` | IEEE 754 double-precision float; includes \`Infinity\`, \`NaN\` |
| \`boolean\` | \`true\`, \`false\` | \`"boolean"\` | Only two values |
| \`null\` | \`null\` | \`"object"\` ⚠️ | Historical bug in JS — \`null\` is its own type |
| \`undefined\` | \`undefined\` | \`"undefined"\` | Variable declared but not assigned |
| \`symbol\` | \`Symbol("id")\` | \`"symbol"\` | Unique, non-enumerable key |
| \`bigint\` | \`9007199254740993n\` | \`"bigint"\` | Arbitrary-precision integer (ES2020) |

### Variable Declaration Rules

| Keyword | Scope | Re-assignable | Hoisted | When to use |
|---------|-------|---------------|---------|-------------|
| \`const\` | Block | No | Yes (TDZ) | Default choice — most variables |
| \`let\` | Block | Yes | Yes (TDZ) | When you need to reassign |
| \`var\` | Function | Yes | Yes (as \`undefined\`) | Never — avoid in modern code |

TDZ = Temporal Dead Zone. Accessing a \`const\` or \`let\` before its declaration throws a \`ReferenceError\`.

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

// typeof quirk
console.log(typeof null);       // "object" — famous JS bug
console.log(typeof undefined);  // "undefined"
console.log(typeof NaN);        // "number" — NaN is a number type!

// NaN is the only value not equal to itself
console.log(NaN === NaN);  // false
console.log(Number.isNaN(NaN)); // true — always use this to check for NaN
\`\`\`

JavaScript is *dynamically typed*: a variable can hold any type at any time. This is powerful but demands discipline — always use strict equality (\`===\`) to avoid unexpected coercion surprises.

**Common pitfalls:**
- Using \`==\` instead of \`===\` — loose equality coerces types silently
- Checking \`typeof null === "object"\` and concluding it is an object — it is not
- Using \`var\` in loops and expecting block scope — \`var\` leaks out of \`if\` and \`for\` blocks

> **Role connection:** Every web development role uses JavaScript variables and types daily. Front-end engineers, Node.js developers, and full-stack developers all need these fundamentals cold.

---

## 2. Functions and Scope

Functions are first-class objects in JavaScript — they can be stored in variables, passed as arguments, and returned from other functions.

### Three Ways to Write Functions

\`\`\`javascript
// 1. Function declaration — hoisted, callable before definition in the source file
function greet(name) {
  return \`Hello, \${name}!\`;
}

// 2. Function expression — NOT hoisted, assigned to a variable
const greetExpr = function(name) {
  return \`Hello, \${name}!\`;
};

// 3. Arrow function — concise, no own 'this' binding, not usable as constructor
const greetArrow = (name) => \`Hello, \${name}!\`;
// Single expression: implicit return, no braces needed
// Multiple statements require braces + explicit return
const greetVerbose = (name) => {
  const msg = \`Hello, \${name}!\`;
  return msg;
};

// Default parameters
function createUser(name, role = "viewer") {
  return { name, role };
}
console.log(createUser("Alice"));          // { name: "Alice", role: "viewer" }
console.log(createUser("Bob", "admin"));   // { name: "Bob", role: "admin" }

// Rest parameters — gather remaining args into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// Closure — inner function remembers the scope it was created in
function createCounter() {
  let count = 0;         // private state
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount:  () => count,
    reset:     () => { count = 0; },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.getCount()); // 1
// count is inaccessible from outside — only through the API
\`\`\`

**Why it matters:** The closure pattern is everywhere in real JavaScript code — React hooks, Node.js callbacks, module patterns. Understanding that an inner function has access to the variables of its outer function, even after the outer function has returned, is essential.

**Common pitfalls:**
- Using arrow functions as object methods when you need \`this\` — arrow functions inherit \`this\` from the enclosing scope, not the object
- Forgetting the \`return\` keyword in a multi-statement arrow function body
- Declaring functions with \`function\` expressions inside loops (fine) but expecting them to be hoisted (they are not)

> **Role connection:** React components are functions. Node.js APIs use callbacks and closures extensively. Every framework you will use builds on these primitives.

---

## 3. Arrays and Objects

Arrays and objects are the workhorses of JavaScript data handling.

### Essential Array Methods

| Method | Purpose | Returns | Mutates? |
|--------|---------|---------|----------|
| \`.map(fn)\` | Transform each element | New array | No |
| \`.filter(fn)\` | Keep elements where \`fn\` returns \`true\` | New array | No |
| \`.reduce(fn, init)\` | Accumulate to single value | Single value | No |
| \`.find(fn)\` | First element where \`fn\` is \`true\` | Element or \`undefined\` | No |
| \`.findIndex(fn)\` | Index of first match | Number or \`-1\` | No |
| \`.some(fn)\` | True if any element matches | Boolean | No |
| \`.every(fn)\` | True if all elements match | Boolean | No |
| \`.includes(v)\` | True if value exists | Boolean | No |
| \`.flat(depth)\` | Flatten nested arrays | New array | No |
| \`.flatMap(fn)\` | Map then flatten one level | New array | No |
| \`.sort(fn)\` | Sort in place | Same array | **YES** |
| \`.splice()\` | Add/remove elements in place | Removed elements | **YES** |

\`\`\`javascript
// Array methods — avoid raw loops, use these
const fruits = ["apple", "banana", "cherry"];

const upper     = fruits.map(f => f.toUpperCase());             // ["APPLE","BANANA","CHERRY"]
const longNames = fruits.filter(f => f.length > 5);             // ["banana","cherry"]
const totalLen  = fruits.reduce((sum, f) => sum + f.length, 0); // 18
const found     = fruits.find(f => f.startsWith("b"));          // "banana"

// Destructuring and spread
const [first, ...rest] = fruits;                // first = "apple", rest = ["banana","cherry"]
const moreFruits = [...fruits, "date"];         // non-mutating append — original unchanged
const copy       = [...fruits];                 // shallow clone

// Objects
const user = { name: "Alice", age: 30, address: { city: "Stockholm" } };
const { name, age }                = user;           // basic destructuring
const { address: { city } }        = user;           // nested destructuring
const { name: userName }           = user;           // rename on destructure
const { role = "viewer", ...rest2 } = user;          // default value + collect rest

const updated = { ...user, age: 31 };           // non-mutating update
const zip     = user?.address?.zip;             // optional chaining -> undefined (no error)
const display = user.nickname ?? "Anonymous";   // nullish coalescing — only for null/undefined

// Object methods
const keys   = Object.keys(user);    // ["name","age","address"]
const values = Object.values(user);  // ["Alice",30,{city:"Stockholm"}]
const entries = Object.entries(user);// [["name","Alice"],["age",30],...]

// Check if property exists
console.log("name" in user);              // true — checks own AND prototype
console.log(Object.hasOwn(user, "name")); // true — own properties only (modern)

// Deep cloning — structuredClone (built-in, no library needed)
const original = { name: "Alice", address: { city: "Stockholm" } };
const deepCopy = structuredClone(original);
deepCopy.address.city = "Oslo";
console.log(original.address.city); // "Stockholm" — original is untouched
// structuredClone handles nested objects, arrays, Maps, Sets, Dates, RegExps
// It does NOT clone functions, DOM nodes, or symbols
\`\`\`

**Why it matters:** \`map\`, \`filter\`, and \`reduce\` replace imperative loops with declarable transformations that are readable and composable. Optional chaining (\`?.\`) eliminates the endless \`if (x && x.y && x.y.z)\` guards that made older JavaScript hard to read.

**Common pitfalls:**
- Using \`.sort()\` without a comparator — it sorts *lexicographically* by default (\`[10,2,1].sort()\` → \`[1,10,2]\`)
- Mutating the array inside \`.map()\` or \`.filter()\` — these should be pure
- Confusing spread (\`...obj\`) which is a *shallow* copy — nested objects are still shared references

---

## 4. Control Flow

\`\`\`javascript
// Ternary for simple branches
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";

// if/else — use for anything complex or multi-line
if (user.role === "admin") {
  allowAll();
} else if (user.role === "moderator") {
  allowPartial();
} else {
  denyAccess();
}

// switch with explicit fall-through control
switch (action.type) {
  case "increment":
    return { count: state.count + 1 };
  case "decrement":
    return { count: state.count - 1 };
  case "reset":
    return { count: 0 };
  default:
    return state;
}

// for...of — iterate values (arrays, strings, Sets, Maps, NodeLists)
for (const fruit of ["apple", "banana"]) {
  console.log(fruit);
}

// for...of with index (using entries)
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit);
}

// for...in — iterate object keys (use with caution on arrays)
const person = { name: "Alice", age: 30 };
for (const key in person) {
  if (Object.hasOwn(person, key)) {  // guard against prototype properties
    console.log(key, person[key]);
  }
}

// Short-circuit evaluation
const username = inputName || "Guest";      // fallback if falsy (0, "", false, null, undefined)
const setting  = config?.theme ?? "light";  // fallback only if null or undefined (stricter)

// Early returns — reduce nesting
function processOrder(order) {
  if (!order) return null;
  if (!order.items.length) return { total: 0 };
  // happy path — no nesting needed
  return { total: order.items.reduce((sum, item) => sum + item.price, 0) };
}
\`\`\`

**Common pitfalls:**
- Using \`||\` instead of \`??\` for defaults — \`0 || 5\` gives \`5\` (wrong if 0 is valid); \`0 ?? 5\` gives \`0\` (correct)
- \`for...in\` on arrays iterates *string keys* and prototype properties — always use \`for...of\` for arrays
- Missing \`break\` in switch statements causes unintended fall-through

---

## 5. DOM Manipulation

The Document Object Model is the browser's live representation of the HTML page. JavaScript interacts with it to build dynamic UIs.

\`\`\`javascript
// Selecting elements
const heading   = document.getElementById("main-title");
const firstItem = document.querySelector(".list-item");     // first match
const allItems  = document.querySelectorAll(".list-item");  // all matches — NodeList

// NodeList is not an Array — convert if you need array methods
const itemsArray = Array.from(allItems);
const texts = itemsArray.map(el => el.textContent);

// Modifying elements SAFELY
heading.textContent = "New Title";       // SAFE — no HTML parsing, treats as plain text
heading.classList.add("active");
heading.classList.remove("inactive");
heading.classList.toggle("highlighted");
heading.classList.replace("old-class", "new-class");

// Setting styles
heading.style.color = "#6366f1";
heading.style.fontSize = "1.5rem";

// Reading and setting attributes
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.setAttribute("aria-label", "Visit example site");
console.log(link.getAttribute("href"));
link.removeAttribute("data-stale");

// Creating and inserting elements — SAFE insertion
const newDiv = document.createElement("div");
newDiv.textContent = "I am new!";        // textContent is always safe for user-provided text
newDiv.className = "card";
document.body.appendChild(newDiv);

// Modern insertion — more flexible than appendChild
const list = document.querySelector("ul");
const newItem = document.createElement("li");
newItem.textContent = "New item";
list.append(newItem);                    // append at end
list.prepend(newItem);                   // prepend at start
heading.after(newItem);                  // insert after heading in DOM

// Removing elements
const oldItem = document.querySelector(".outdated");
oldItem?.remove();                       // remove() is modern and clean

// Reading layout dimensions
const rect = heading.getBoundingClientRect(); // { top, left, width, height, ... }
\`\`\`

**Why it matters:** Always prefer \`textContent\` when inserting user-provided text. It treats everything as a literal string, preventing injected markup from being interpreted by the browser. Assigning user input via \`innerHTML\` is one of the top XSS vulnerabilities in production web applications.

**Common pitfalls:**
- Using \`innerHTML\` with any user-controlled value without sanitization — a critical XSS risk
- \`querySelectorAll\` returns a *static* NodeList — it does not update when the DOM changes
- Calling DOM methods before the document is loaded — always wait for \`DOMContentLoaded\` or place scripts at the bottom of \`<body>\`

---

## 6. Events

Events connect user actions to your code. The browser uses an event loop to queue and dispatch them.

\`\`\`javascript
// Add a listener
const button = document.querySelector("#submit");
button.addEventListener("click", (e) => {
  e.preventDefault();            // stop default browser action (form submit, link follow)
  console.log("Clicked:", e.target);
});

// Remove a listener — must keep reference to the same function
function handleClick(e) {
  console.log("Clicked");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);  // works — same reference

// Event delegation — listen at a parent, filter by target
// Single listener handles all present and future children
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked item:", e.target.textContent);
    e.target.classList.toggle("selected");
  }
});

// Common event types
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.key === "Enter" && e.ctrlKey) submitForm();
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    openSearch();
  }
});

// Custom events — dispatch and listen to your own events
const orderPlaced = new CustomEvent("orderPlaced", {
  detail: { orderId: 123, total: 49.99 },
  bubbles: true,
});
document.querySelector("#checkout").dispatchEvent(orderPlaced);

document.addEventListener("orderPlaced", (e) => {
  console.log("Order placed:", e.detail.orderId);
});

// Input events for live validation
const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", (e) => {
  const valid = e.target.value.includes("@");
  e.target.classList.toggle("error", !valid);
});
\`\`\`

**Why it matters:** Event delegation lets you handle dynamically added elements with a single listener on the parent. It also means far fewer event listeners in memory — important for long-lived single-page apps where you add and remove DOM nodes continuously.

**Common pitfalls:**
- Adding the same event listener twice — it fires twice (unlike jQuery's \`.on()\`)
- Forgetting \`e.preventDefault()\` inside a form's submit handler — the page reloads
- Creating arrow functions inline and then trying to \`removeEventListener\` — arrow functions create a new reference each time, so the remove call does nothing

---

## 7. Asynchronous JavaScript

JavaScript is single-threaded but handles I/O asynchronously through its non-blocking event loop. The \`async/await\` syntax makes this look and feel like synchronous code.

\`\`\`javascript
// Promises — the foundation of async JS
const fetchUser = (id) =>
  fetch(\`/api/users/\${id}\`)
    .then((res) => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return res.json();
    });

// async/await — syntactic sugar over Promises, much more readable
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

// Parallel requests — Promise.all fires all at once, waits for all
async function loadDashboard() {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return { user, posts };
}
// This takes max(user_time, posts_time), NOT user_time + posts_time

// POST request with JSON body
async function createPost(title, body) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
}
\`\`\`

Under the hood, \`async/await\` is syntactic sugar over Promises. When you \`await\` a Promise, JavaScript leaves the function, does other work, and resumes when the Promise settles. This is how one thread handles thousands of concurrent network requests without blocking the UI.

**Why it matters:** Nearly every real-world JavaScript feature — fetching data, reading files in Node.js, querying databases — is asynchronous. Getting comfortable with \`async/await\` and error handling with \`try/catch\` is non-negotiable.

**Common pitfalls:**
- Forgetting \`await\` — the function proceeds immediately with a \`Promise\` object instead of the resolved value
- Using \`await\` inside \`.forEach()\` — \`.forEach\` does not wait for async callbacks; use \`for...of\` instead
- Calling two \`await\`s sequentially when they could run in parallel with \`Promise.all\`

---

## 8. ES6+ Features

Modern JavaScript (ES2015 and beyond) provides powerful ergonomic features.

\`\`\`javascript
// Template literals — multiline strings and embedded expressions
const greeting = \`Hello, \${name}! You have \${count} messages.\`;
const multiline = \`
  <div class="card">
    <h2>\${user.name}</h2>
    <p>\${user.bio}</p>
  </div>
\`;

// Map — key/value pairs with ANY key type, preserves insertion order
const roles = new Map();
roles.set("alice", "admin");
roles.set("bob", "viewer");
console.log(roles.get("alice")); // "admin"
console.log(roles.size);         // 2
for (const [user, role] of roles) {
  console.log(user, role);
}

// Set — unique values only
const tags = new Set(["js", "web", "js"]); // {"js", "web"} — duplicate removed
tags.add("css");
console.log(tags.has("js"));  // true
console.log([...tags]);       // ["js","web","css"]

// Nullish coalescing and optional assignment
const value = null ?? "default";   // "default" — only if null or undefined
let x = null;
x ??= 10;                          // x is now 10 (assignment only if null/undefined)

// Logical assignment
let a = 0;
a ||= 42;    // a is now 42 (because 0 is falsy — use ?? if 0 is a valid value)
let b = 5;
b &&= b * 2; // b is now 10 (because 5 is truthy)

// Object shorthand and computed keys
const propName = "status";
const user2 = {
  name,                           // shorthand: name: name
  [propName]: "active",           // computed key: { status: "active" }
  greet() { return \`Hi, \${this.name}\`; },  // method shorthand
};
\`\`\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Variables | \`const\` by default, \`let\` when reassigning, never \`var\` |
| Types | 7 primitives; \`typeof null === "object"\` is a known bug |
| Functions | Arrow functions for callbacks; closures for private state |
| Arrays | Master \`map\`, \`filter\`, \`reduce\` over raw \`for\` loops; \`structuredClone\` for deep copies |
| DOM | \`querySelector\` + \`addEventListener\`; \`textContent\` not \`innerHTML\` |
| Events | Use event delegation for dynamic content |
| Async | \`async/await\` with \`try/catch\`; \`Promise.all\` for parallel work |
| ES6+ | Template literals, Map, Set, optional chaining, nullish coalescing |

---

## Recommended Videos — Beginner

- **Fireship** — "JavaScript in 100 Seconds" — https://www.youtube.com/watch?v=DHjqpvDnNGE
- **Traversy Media** — "JavaScript Crash Course For Beginners" — https://www.youtube.com/watch?v=hdI2bqOjy3c
- **freeCodeCamp** — "JavaScript Programming – Full Course" — https://www.youtube.com/watch?v=jS4aFq5-91M
`,
  mid: `# JavaScript — Mid Level Deep Dive

You know the basics. Now you need the *mental models* that separate engineers who write working code from those who write *maintainable, production-grade* code. This guide covers the intermediate concepts that define mid-level JavaScript engineers: closures, prototypes, classes, modules, async patterns, error handling, functional programming, and testing.

## What you will learn

- Explain exactly what a closure is and where it appears in real frameworks
- Understand JavaScript's prototype chain and how ES6 classes map onto it
- Organize code into reusable ES modules with named and default exports
- Write robust error handling with custom error classes and \`instanceof\` discrimination
- Use advanced \`Promise\` APIs: \`Promise.all\`, \`Promise.allSettled\`, \`AbortController\`
- Write effective unit tests with Vitest/Jest including mocking async dependencies
- Apply functional programming principles: pure functions, immutability, composition, currying
- Write generator functions and understand lazy iteration

---

## 1. Closures and Lexical Scope

A closure is a function that remembers the variables from the scope it was defined in, even after that outer scope has finished executing. Every scope in JavaScript has access to everything *outside* of it — its parent scope, its grandparent scope, and so on all the way to the global scope.

\`\`\`javascript
// Classic closure — createGreeter closes over "greeting"
function createGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}
const sayHello = createGreeter("Hello");
const sayHi    = createGreeter("Hi");
console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHi("Bob"));     // "Hi, Bob!"
// sayHello and sayHi each have their own independent closure

// Closure for private state — balance is truly inaccessible from outside
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
account.withdraw(30); // 120
// There is absolutely no way to directly read or modify "balance"

// React's useState is built on this closure pattern
function useState(initialValue) {
  let state = initialValue;
  const getState = () => state;
  const setState = (newValue) => {
    state = typeof newValue === "function" ? newValue(state) : newValue;
  };
  return [getState, setState];
}
\`\`\`

**Why it matters:** Closures are not a quirky edge case — they are the foundation of modules, React hooks (\`useState\` uses closures to persist values between renders), memoization, and virtually every callback pattern.

**Common pitfalls:**

\`\`\`javascript
// Classic loop closure bug — var leaks out of the loop
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i)); // all three close over the SAME i
}
fns.forEach(fn => fn()); // 3, 3, 3 — NOT 0, 1, 2

// Fix: use let (creates a new binding per iteration)
for (let i = 0; i < 3; i++) {
  fns.push(() => console.log(i)); // each closes over its own i
}
fns.forEach(fn => fn()); // 0, 1, 2
\`\`\`

> **Role connection:** Every React hook (\`useCallback\`, \`useMemo\`, \`useEffect\`) creates closures. Understanding stale closures in \`useEffect\` (the dependency array issue) is a rite of passage for every React developer.

---

## 2. Prototypes and Classes

ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance — they make object-oriented patterns more readable without changing the underlying mechanism.

### The Prototype Chain

Every JavaScript object has a hidden \`[[Prototype]]\` slot pointing to another object. When you access a property, the engine walks this chain until it finds the property or reaches \`null\`.

\`\`\`javascript
// The prototype chain in plain sight
const arr = [1, 2, 3];
// arr → Array.prototype → Object.prototype → null
console.log(arr.__proto__ === Array.prototype);         // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
// This is why [].map() works — map lives on Array.prototype

// Manual prototype setup (rarely used in modern code)
const animal = {
  speak() { return \`\${this.name} makes a sound\`; }
};
const dog = Object.create(animal);
dog.name = "Rex";
console.log(dog.speak()); // "Rex makes a sound" — inherited from animal
\`\`\`

### ES6 Classes

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
    super(name, "Woof");   // call parent constructor first
    this.breed = breed;
  }

  speak() {
    return super.speak() + "! (tail wagging)";
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.speak());           // "Rex says Woof! (tail wagging)"
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true — inheritance chain

// Private fields — truly inaccessible from outside the class
class Counter {
  #count = 0;
  #limit;

  constructor(limit = Infinity) {
    this.#limit = limit;
  }

  increment() {
    if (this.#count >= this.#limit) throw new RangeError("Counter limit reached");
    return ++this.#count;
  }

  reset()     { this.#count = 0; }
  get value() { return this.#count; }

  static create(limit) { return new Counter(limit); }
}

const c = Counter.create(3);
c.increment(); // 1
c.increment(); // 2
c.increment(); // 3
// c.increment();  // RangeError
// console.log(c.#count); // SyntaxError — genuinely private
\`\`\`

**Why it matters:** Private fields (\`#field\`) enforce encapsulation at the language level — unlike the old underscore convention, there is no way to access them from outside the class.

> **Role connection:** Class-based patterns are central to Angular, NestJS, and TypeORM. Understanding the prototype chain helps when debugging inherited methods or unexpected behavior with \`this\`.

---

## 3. Modules

ES modules are the standard for organizing JavaScript code. They enable static analysis and tree-shaking (dead code elimination) by bundlers like Vite and webpack.

\`\`\`javascript
// math.js — named exports
export function add(a, b)      { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159;

// calculator.js — default export (one per file)
export default class Calculator {
  add(a, b)      { return a + b; }
  subtract(a, b) { return a - b; }
}

// app.js — importing
import Calculator from './calculator.js';      // default import (name is up to you)
import { add, PI } from './math.js';           // named imports
import { add as mathAdd } from './math.js';    // rename on import
import * as MathUtils from './math.js';        // namespace import

// Re-exporting — index files bundle exports from a directory
export { add, subtract } from './math.js';
export { default as Calculator } from './calculator.js';
// consumers: import { add, Calculator } from './utils'

// Dynamic import — code-splitting, lazy loading
async function loadChart() {
  const { Chart } = await import('./chart.js');
  // Only downloaded when this function is called
  return new Chart();
}
\`\`\`

**Why it matters:** Dynamic imports are the mechanism behind route-based code splitting in React and Vue — only the code the user actually needs is loaded. Tree-shaking eliminates exported functions that are never imported, shrinking bundle sizes.

---

## 4. Error Handling

Robust error handling makes the difference between applications that crash silently and ones that fail gracefully with useful diagnostic information.

\`\`\`javascript
// Custom error classes — carry structured diagnostic data
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
    if (!response.ok) throw new NetworkError(response.status, "Request failed");
    return await response.json();
  } catch (err) {
    if (err instanceof ValidationError) {
      showFieldError(err.field, err.message);
    } else if (err instanceof NetworkError && err.retryable) {
      scheduleRetry(() => submitForm(data));
    } else if (err instanceof AppError) {
      showToast(\`Error [\${err.code}]: \${err.message}\`);
    } else {
      console.error("Unexpected error:", err);
      throw err; // re-throw unknown errors
    }
  }
}
\`\`\`

**Why it matters:** Generic \`catch (err) { console.log(err) }\` is not error handling — it is error hiding. Using \`instanceof\` lets you give users meaningful feedback and lets you log, report, or retry based on the actual failure mode.

> **Role connection:** Backend Node.js engineers use custom error hierarchies to map business errors to HTTP status codes. Frontend engineers use them in global error boundaries and toast notification systems.

---

## 5. Advanced Async Patterns

\`\`\`javascript
// Promise.all — run independent requests in parallel
async function loadDashboard() {
  const [users, posts, stats] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/stats").then(r => r.json()),
  ]);
  return { users, posts, stats };
}
// 3 requests × 200ms each → total time: ~200ms (parallel, not 600ms)

// Promise.allSettled — continue even if some requests fail
async function loadPartialDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return results.map(r => r.status === "fulfilled" ? r.value : null);
}

// AbortController — cancel an in-flight fetch
let abortController = null;
inputEl.addEventListener("input", async (e) => {
  abortController?.abort();                      // cancel previous request
  abortController = new AbortController();
  try {
    const results = await fetch(
      \`/api/search?q=\${e.target.value}\`,
      { signal: abortController.signal }
    ).then(r => r.json());
    renderResults(results);
  } catch (err) {
    if (err.name !== "AbortError") throw err;   // ignore intentional aborts
  }
});

// Async generators — lazy async iteration (useful for pagination/streaming)
async function* fetchPages(baseUrl) {
  let page = 1;
  while (true) {
    const data = await fetch(\`\${baseUrl}?page=\${page}\`).then(r => r.json());
    if (!data.items.length) break;
    yield data.items;
    page++;
  }
}

for await (const items of fetchPages("/api/products")) {
  renderItems(items);
}
\`\`\`

**Why it matters:** \`Promise.all\` converts N sequential round trips into one parallel wait. \`AbortController\` prevents stale responses from overwriting newer data — the classic search debouncing bug.

---

## 6. Testing with Vitest / Jest

Tests are not optional on professional teams. They are the proof that your code does what you claim, and the safety net that lets you refactor with confidence.

\`\`\`javascript
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { add, subtract, divide } from './math.js';

describe("Math utilities", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("throws on division by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });
});

// Testing async code with mocked fetch
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
\`\`\`

**Why it matters:** Mocking \`fetch\` keeps tests fast, deterministic, and free from network dependencies. The \`beforeEach\`/\`afterEach\` pattern ensures mocks are fresh per test and don't bleed between tests.

> **Role connection:** Modern teams require 70-80%+ code coverage. CI pipelines run tests on every commit and block merges on failure. Writing testable code — with dependency injection and clear separation of concerns — is as important as writing working code.

---

## 7. Functional Programming Patterns

Functional programming treats functions as data: they can be passed, returned, and composed. The two key principles are **pure functions** (no side effects, output depends only on input) and **immutability** (never mutate, always create new values).

\`\`\`javascript
// Pure function — same input always gives same output, no side effects
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

// Function composition — pipe (left to right)
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);
const transform = pipe(double, addOne, square);
console.log(transform(3)); // double->6, addOne->7, square->49

// Currying — partially apply multi-argument functions
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const multiply = curry((a, b) => a * b);
const double2  = multiply(2);
const triple   = multiply(3);
console.log(double2(5)); // 10
console.log(triple(4));  // 12

// Immutable array operations — always return new arrays
const numbers = [1, 2, 3, 4, 5];
const doubled      = numbers.map(n => n * 2);           // [2,4,6,8,10]
const evens        = numbers.filter(n => n % 2 === 0);  // [2,4]
const total        = numbers.reduce((sum, n) => sum + n, 0); // 15
const withoutThree = numbers.filter(n => n !== 3);      // [1,2,4,5]
// numbers is unchanged in all cases

// Real-world functional pipeline
const processOrders = (orders) =>
  orders
    .filter(order => order.status === "paid")
    .map(order => ({ ...order, total: order.items.reduce((s, i) => s + i.price, 0) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10); // top 10 highest-value paid orders
\`\`\`

**Why it matters:** Pure functions are trivially testable (no mocking needed), easy to compose, and understandable in isolation without needing to trace global state.

> **Role connection:** React's functional components and hooks are built on FP principles. Redux reducers are pure functions by requirement. Lodash/fp and RxJS are functional programming libraries used widely in production codebases.

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Closures | Inner functions remember their outer scope; the foundation of React hooks and modules |
| Prototypes | Classes are syntax sugar; the prototype chain explains \`instanceof\` and method lookup |
| Modules | ES modules enable tree-shaking; dynamic \`import()\` enables code splitting |
| Error Handling | Custom error classes + \`instanceof\` for structured recovery; never swallow errors |
| Async | \`Promise.all\` for parallel; \`AbortController\` for cancellation; \`allSettled\` for partial data |
| Testing | Mock dependencies; \`beforeEach\`/\`afterEach\` for isolation; test behavior not implementation |
| FP | Pure functions + immutability = predictable, composable, testable code |

---

## Recommended Videos — Mid Level

- **Web Dev Simplified** — "Learn Closures In 7 Minutes" — https://www.youtube.com/watch?v=3a0I8ICR1Vg
- **Web Dev Simplified** — "JavaScript Async Await" — https://www.youtube.com/watch?v=V_Kr9OSfDeU
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ
`,
  senior: `# JavaScript — Senior Level Deep Dive

Senior JavaScript engineers don't just write code that works — they write code that performs under load, scales with team size, remains maintainable after years of development, and resists adversarial inputs. This guide covers the advanced topics that define that level: the event loop internals, memory management, performance optimization, design patterns, security, Web Workers, and meta-programming.

## What you will learn

- Model the JavaScript runtime precisely: call stack, microtask queue, macrotask queue, and render steps
- Diagnose and fix memory leaks: detached DOM nodes, closure-captured references, unbounded caches
- Apply debounce, throttle, and memoization to prevent performance regressions under real-world load
- Implement Observer, Strategy, Command, and Proxy design patterns with practical JavaScript examples
- Identify and prevent XSS, CSRF, and prototype pollution vulnerabilities in application code
- Offload CPU-bound work to Web Workers using \`postMessage\` and transferable objects
- Use Proxy and Reflect to build validation frameworks and reactive data systems
- Understand V8 optimization hints: monomorphic functions, hidden classes, and deoptimization triggers

---

## 1. The Event Loop — A Deep Model

JavaScript is single-threaded: one call stack, one thing at a time. The event loop is the mechanism that makes this single thread appear concurrent. Philip Roberts described it memorably at JSConf EU: "The event loop's job is to look at the stack and look at the task queue. If the stack is empty it takes the first thing on the queue and pushes it on to the stack."

The key insight is that **the browser (or Node.js) provides APIs that operate outside the JavaScript runtime**. \`setTimeout\`, \`fetch\`, \`addEventListener\` — these are not in V8. They run in the browser's C++ layer. When they complete, they push callbacks onto a queue. The event loop moves those callbacks onto the call stack only when the stack is empty.

\`\`\`javascript
// Execution order quiz — understand this and you understand the event loop
console.log("1 — Sync");
setTimeout(() => console.log("2 — Macrotask"), 0);
Promise.resolve().then(() => console.log("3 — Microtask"));
queueMicrotask(() => console.log("4 — queueMicrotask"));
console.log("5 — Sync");
// Output: 1, 5, 3, 4, 2
// All sync first → ALL microtasks (including newly added ones) → ONE macrotask
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

1. **Macrotask queue:** \`setTimeout\`, \`setInterval\`, I/O callbacks, UI click events. The event loop processes *one task at a time*, then re-checks everything else.

2. **Microtask queue:** Promise \`.then()\` callbacks, \`queueMicrotask()\`, MutationObserver. Microtasks are processed *to completion including newly-added ones* before any macrotask or render step runs. A microtask loop that keeps enqueuing new microtasks blocks rendering permanently.

3. **Animation callbacks (requestAnimationFrame):** Run as part of the render steps, before style and paint. They fire at display frequency (~60 Hz) and are skipped for hidden tabs.

\`\`\`javascript
// Anti-pattern: blocking the main thread
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

// Scheduler API (modern browsers) — more precise than setTimeout
async function processWithScheduler(items) {
  const results = [];
  for (const item of items) {
    results.push(heavyComputation(item));
    if (results.length % 100 === 0) {
      await scheduler.yield(); // yield to the browser scheduler
    }
  }
  return results;
}
\`\`\`

**Why it matters:** Jank (frame drops, unresponsive UI) always has the same root cause: something is blocking the main thread too long. Knowing *which queue* your code ends up in tells you how it interacts with rendering.

> **Role connection:** Front-end performance engineers use this model when profiling Chrome DevTools flame charts. Node.js backend engineers use it to understand why CPU-bound code blocks the server from handling new requests.

---

## 2. Memory Management

JavaScript has automatic garbage collection, but memory leaks in long-running single-page applications are a real production problem.

\`\`\`javascript
// Memory leak — event listener keeps the component alive forever
class LeakyComponent {
  constructor() {
    this.data = new Array(10_000).fill("large payload");
    this.handler = () => this.handleResize();
    window.addEventListener("resize", this.handler);
    // Even if app code no longer references this object,
    // window holds a reference via the listener → cannot be GC'd
  }
  handleResize() { /* uses this.data */ }
}

// Fixed — always clean up listeners
class Component {
  constructor() {
    this.data = new Array(10_000).fill("large payload");
    this.handler = () => this.handleResize();
    window.addEventListener("resize", this.handler);
  }
  handleResize() { /* ... */ }
  destroy() {
    window.removeEventListener("resize", this.handler);
    this.data = null;
  }
}

// WeakMap — cache that doesn't prevent garbage collection
const cache = new WeakMap();
function getCachedResult(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, computeExpensive(obj));
  }
  return cache.get(obj);
}
// When obj is GC'd, the WeakMap entry is also GC'd automatically

// Detached DOM node — still referenced by JS after removal
let savedRef;
function createLeak() {
  const node = document.createElement("div");
  document.body.appendChild(node);
  savedRef = node;                // JS variable holds reference
  document.body.removeChild(node); // removed from DOM but NOT from memory
}
// Fix: set savedRef = null when done with the node
\`\`\`

**Common memory leak patterns:**
- Event listeners added to \`window\` or \`document\` but never removed
- Closures in long-lived timers that reference large objects
- Growing \`Map\` or arrays used as caches with no eviction policy — use LRU or \`WeakMap\`
- Detached DOM nodes still referenced by JavaScript variables
- \`setInterval\` callbacks that reference \`this\` — the interval keeps the object alive

**Diagnosing leaks:** Chrome DevTools → Memory tab → Heap Snapshots. Take a snapshot, trigger the suspected leak, take another. Filter by "Objects allocated between Snapshot 1 and 2."

---

## 3. Performance Optimization

\`\`\`javascript
// Debounce — delay execution until activity stops
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`).then(renderResults);
}, 300); // waits 300ms after user stops typing

// Throttle — execute at most once per interval
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

// V8 hidden classes — write consistent object shapes
// Bad: different property order creates different hidden classes → deoptimization
function makeUser(isAdmin) {
  const user = {};
  if (isAdmin) user.adminId = 1; // some objects have adminId, some don't
  user.name = "Alice";           // different shape each time
  return user;
}

// Good: consistent shape — V8 can optimize once and reuse
function makeUser(name, adminId = null) {
  return { name, adminId }; // always same shape — V8 loves this
}

// Intersection Observer — efficient visibility detection
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("img[data-src]").forEach(img => observer.observe(img));
\`\`\`

**Why it matters:** A debounced search input fires once per 300ms instead of hundreds of times per second, saving hundreds of network requests. Consistent object shapes let V8 compile highly optimized machine code that reuses across all objects of the same shape.

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
    return () => this.off(event, callback); // returns unsubscribe fn
  }

  off(event, callback) {
    this.#listeners.get(event)?.delete(callback);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(cb => cb(...args));
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

// Strategy Pattern — swap algorithms at runtime
const sortStrategies = {
  alpha:    (a, b) => a.name.localeCompare(b.name),
  date:     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  priority: (a, b) => b.priority - a.priority,
};

function sortItems(items, strategy = "date") {
  if (!sortStrategies[strategy]) throw new Error(\`Unknown strategy: \${strategy}\`);
  return [...items].sort(sortStrategies[strategy]); // non-mutating
}

// Command Pattern — encapsulate operations for undo/redo
class CommandHistory {
  #history = [];
  #redoStack = [];

  execute(command) {
    command.execute();
    this.#history.push(command);
    this.#redoStack = [];
  }

  undo() {
    const command = this.#history.pop();
    if (command) {
      command.undo();
      this.#redoStack.push(command);
    }
  }

  redo() {
    const command = this.#redoStack.pop();
    if (command) {
      command.execute();
      this.#history.push(command);
    }
  }
}

// Proxy — intercept and validate property assignments
function createValidatedModel(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const validator = schema[prop];
      if (validator && !validator(value)) {
        throw new TypeError(\`Invalid value for \${prop}: \${JSON.stringify(value)}\`);
      }
      target[prop] = value;
      return true;
    },
  });
}

const userModel = createValidatedModel({
  age:   (v) => typeof v === "number" && v >= 0 && v < 150,
  email: (v) => typeof v === "string" && v.includes("@"),
  role:  (v) => ["admin", "moderator", "viewer"].includes(v),
});
userModel.age   = 25;               // OK
userModel.email = "alice@acme.com"; // OK
// userModel.age = -1;              // TypeError
\`\`\`

---

## 5. Security Best Practices

Security is not a feature you add later — it is a discipline woven into daily coding decisions.

**XSS (Cross-Site Scripting):** Use \`textContent\` to insert user-provided text into the DOM — it treats the value as a plain string, never as markup. When rich HTML is required, sanitize with DOMPurify before inserting. Never insert untrusted content via \`innerHTML\` or \`insertAdjacentHTML\` without sanitization.

**Prototype Pollution:** Malicious payloads like \`{"__proto__": {"isAdmin": true}}\` can pollute \`Object.prototype\` if you merge untrusted objects naively with \`for...in\`.

\`\`\`javascript
// SAFE — guard against prototype pollution
function safeMerge(target, source) {
  const dangerous = new Set(["__proto__", "constructor", "prototype"]);
  for (const key of Object.keys(source)) {
    if (!dangerous.has(key)) target[key] = source[key];
  }
}

// SAFEST — null-prototype objects have no prototype chain to pollute
const safeStore = Object.create(null);
safeStore.user = "alice";

// CSRF Prevention — always include a token for state-changing requests
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

// Subresource Integrity — verify CDN scripts haven't been tampered
// Add integrity attribute to script tags:
// integrity="sha384-abc123..." crossorigin="anonymous"
\`\`\`

**Content Security Policy** is your second line of defense: configure at the HTTP header level to restrict which scripts the browser will accept. A strict CSP blocks injected scripts even if an XSS vulnerability exists in your code.

> **Role connection:** Security engineers perform code review specifically for these vulnerabilities. Bug bounty programs regularly award thousands of dollars for XSS and CSRF findings in production apps.

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
  console.error("Worker error:", error.message, "at line", error.lineno);
  worker.terminate();
};

// worker.js — runs in isolated thread, no DOM access
self.onmessage = (event) => {
  const { type, payload } = event.data;
  if (type === "compress") {
    const result = compressImage(payload); // CPU-intensive — does not block UI
    self.postMessage({ type: "compress:done", result });
  }
};

// Transferable objects — zero-copy transfer of ArrayBuffers
const buffer = new ArrayBuffer(1024 * 1024); // 1 MB
worker.postMessage({ type: "process", buffer }, [buffer]);
// After transfer, buffer is detached in the main thread — ownership transferred, zero copy

// Worker Pool — reuse workers for repeated tasks
class WorkerPool {
  #workers = [];
  #queue = [];

  constructor(script, size = navigator.hardwareConcurrency || 4) {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(script);
      worker.busy = false;
      worker.onmessage = (e) => {
        worker.busy = false;
        worker.currentResolve?.(e.data);
        this.#drain();
      };
      this.#workers.push(worker);
    }
  }

  run(data) {
    return new Promise((resolve) => {
      const available = this.#workers.find(w => !w.busy);
      if (available) {
        available.busy = true;
        available.currentResolve = resolve;
        available.postMessage(data);
      } else {
        this.#queue.push({ data, resolve });
      }
    });
  }

  #drain() {
    if (!this.#queue.length) return;
    const available = this.#workers.find(w => !w.busy);
    if (available) {
      const { data, resolve } = this.#queue.shift();
      available.busy = true;
      available.currentResolve = resolve;
      available.postMessage(data);
    }
  }
}
\`\`\`

**Why it matters:** Web Workers move CPU-intensive cost to another thread entirely. Image processing, video encoding, cryptography, and large data parsing are all excellent candidates. Companies like Figma run their entire rendering engine in a Web Worker to keep the UI thread free.

> **Role connection:** Performance-critical front-end roles are expected to know this pattern. Companies with complex editors (Figma, Google Maps, Adobe) use Web Workers extensively.

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Event Loop | Microtasks drain completely before each macrotask and render; never block the main thread |
| Memory | Remove event listeners on cleanup; use WeakMap for GC-friendly metadata; profile with DevTools |
| Performance | Debounce user input; throttle scroll handlers; memoize pure functions; consistent object shapes |
| Design Patterns | Observer for decoupled events; Strategy to replace if/else chains; Proxy for validation |
| Security | \`textContent\` for user text; DOMPurify for HTML; guard prototype pollution; CSRF tokens |
| Web Workers | Offload CPU work to background threads; use transferables for large binary data |

---

## Recommended Videos — Senior Level

- **JSConf EU** — "What the heck is the event loop anyway?" (Philip Roberts) — https://www.youtube.com/watch?v=8aGhZQkoFbQ
- **JSConf Asia** — "In the Loop" (Jake Archibald) — https://www.youtube.com/watch?v=cCOL7MC4Pl0
- **JSUnconf** — "Learning Functional Programming with JavaScript" (Anjana Vakil) — https://www.youtube.com/watch?v=e-5obm1G_FY
`,
};
