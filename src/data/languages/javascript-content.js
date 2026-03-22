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

### Variable Scope Chain

\`\`\`mermaid
flowchart TB
    G[Global Scope] --> F[Function Scope]
    F --> B[Block Scope]
    B --> V{Variable Lookup}
    V -->|Not found in block| F
    V -->|Not found in function| G
    V -->|Not found in global| E[ReferenceError]
    G --- G1["var lives here"]
    F --- F1["var and let/const"]
    B --- B1["let and const only"]
\`\`\`

### Type Coercion Decision Tree

\`\`\`mermaid
flowchart LR
    A[Operator Used] --> B{Which operator?}
    B -->|"+"| C{Either operand a string?}
    C -->|Yes| D[String concatenation]
    C -->|No| E[Numeric addition]
    B -->|"- * / %"| F[Convert both to numbers]
    B -->|"=="| G[Type coercion then compare]
    B -->|"==="| H[No coercion - strict compare]
\`\`\`

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

### Exercises

**1. Predict the output**
Without running the code, predict what each \`console.log\` prints. Then run it to verify.

\`\`\`javascript
console.log(typeof null);
console.log(typeof undefined);
console.log("10" - 4);
console.log("10" + 4);
console.log(0 == false);
console.log(0 === false);
\`\`\`

<details>
<summary>Hint</summary>

Remember: \`+\` with a string triggers concatenation, while \`-\` always coerces both sides to numbers. \`typeof null\` is a famous historical quirk. \`==\` coerces types; \`===\` does not.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
console.log(typeof null);       // "object"
console.log(typeof undefined);  // "undefined"
console.log("10" - 4);          // 6
console.log("10" + 4);          // "104"
console.log(0 == false);        // true  (loose equality coerces false → 0)
console.log(0 === false);       // false (strict: different types)
\`\`\`

Expected output:
\`\`\`
"object"
"undefined"
6
"104"
true
false
\`\`\`

</details>

**2. Fix the variable declarations**
The code below has three bugs related to variable declarations. Identify and fix each one.

\`\`\`javascript
// Bug 1: should not be reassignable
let MAX_SIZE = 100;
MAX_SIZE = 200; // this should be prevented

// Bug 2: var leaks out of the block
if (true) {
  var message = "hello";
}
console.log(message); // should throw ReferenceError

// Bug 3: accessing before declaration
console.log(counter);
let counter = 0;
\`\`\`

<details>
<summary>Hint</summary>

Use \`const\` for values that must not be reassigned. Use \`let\` (not \`var\`) for block-scoped variables. \`let\` and \`const\` are in the Temporal Dead Zone before their declaration line — accessing them throws a \`ReferenceError\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
// Bug 1 fixed: use const for constants
const MAX_SIZE = 100;
// MAX_SIZE = 200; // TypeError: Assignment to constant variable

// Bug 2 fixed: use let for block scope
if (true) {
  let message = "hello";
}
// console.log(message); // ReferenceError: message is not defined

// Bug 3 fixed: declare before use
let counter = 0;
console.log(counter); // 0
\`\`\`

Expected output:
\`\`\`
0
\`\`\`

</details>

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

### Exercises

**1. Write a function with default parameters and rest args**
Write a function called \`buildMessage\` that takes a \`prefix\` (default \`"Info"\`) and any number of additional \`parts\`. It should return a string in the format \`"[prefix] part1 part2 ..."\`.

\`\`\`javascript
console.log(buildMessage("Error", "file not found", "path: /tmp"));
console.log(buildMessage(undefined, "server started"));
\`\`\`

<details>
<summary>Hint</summary>

Use \`function buildMessage(prefix = "Info", ...parts)\`. Join the parts with a space. Use a template literal to combine the prefix and the joined parts.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function buildMessage(prefix = "Info", ...parts) {
  return \`[\${prefix}] \${parts.join(" ")}\`;
}

console.log(buildMessage("Error", "file not found", "path: /tmp"));
console.log(buildMessage(undefined, "server started"));
\`\`\`

Expected output:
\`\`\`
[Error] file not found path: /tmp
[Info] server started
\`\`\`

</details>

**2. Build a closure-based rate limiter**
Write a function \`createRateLimiter(limit)\` that returns a function. Each time the returned function is called it increments an internal counter. If the counter exceeds \`limit\`, it returns \`"Rate limit exceeded"\` instead of \`"OK"\`. The counter should not be accessible from outside.

\`\`\`javascript
const limiter = createRateLimiter(2);
console.log(limiter()); // "OK"
console.log(limiter()); // "OK"
console.log(limiter()); // "Rate limit exceeded"
\`\`\`

<details>
<summary>Hint</summary>

Declare \`let count = 0\` inside \`createRateLimiter\`. The returned function closes over \`count\` and \`limit\`. Increment \`count\` and compare it to \`limit\` each call.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function createRateLimiter(limit) {
  let count = 0;
  return function() {
    count++;
    if (count > limit) return "Rate limit exceeded";
    return "OK";
  };
}

const limiter = createRateLimiter(2);
console.log(limiter()); // "OK"
console.log(limiter()); // "OK"
console.log(limiter()); // "Rate limit exceeded"
\`\`\`

Expected output:
\`\`\`
OK
OK
Rate limit exceeded
\`\`\`

</details>

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

### Exercises

**1. Transform a list of products**
Given the array below, use \`filter\` and \`map\` in a chain to produce an array of name strings for all products that cost more than 20, uppercased.

\`\`\`javascript
const products = [
  { name: "pen", price: 2 },
  { name: "notebook", price: 8 },
  { name: "laptop", price: 999 },
  { name: "headphones", price: 49 },
];
// Expected: ["LAPTOP", "HEADPHONES"]
\`\`\`

<details>
<summary>Hint</summary>

Chain \`.filter(p => p.price > 20)\` then \`.map(p => p.name.toUpperCase())\`. Each step returns a new array — nothing is mutated.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const products = [
  { name: "pen", price: 2 },
  { name: "notebook", price: 8 },
  { name: "laptop", price: 999 },
  { name: "headphones", price: 49 },
];

const result = products
  .filter(p => p.price > 20)
  .map(p => p.name.toUpperCase());

console.log(result);
\`\`\`

Expected output:
\`\`\`
["LAPTOP", "HEADPHONES"]
\`\`\`

</details>

**2. Safe deep read with optional chaining and nullish coalescing**
Given the \`config\` object below, write a single expression that reads \`config.server.port\` and falls back to \`3000\` if it is missing or \`null\`/\`undefined\`.

\`\`\`javascript
const config1 = { server: { port: 8080 } };
const config2 = { server: {} };
const config3 = {};
\`\`\`

<details>
<summary>Hint</summary>

Use \`config?.server?.port ?? 3000\`. Optional chaining stops evaluation and returns \`undefined\` if any step is \`null\`/\`undefined\`. Nullish coalescing then provides the fallback.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const config1 = { server: { port: 8080 } };
const config2 = { server: {} };
const config3 = {};

console.log(config1?.server?.port ?? 3000);
console.log(config2?.server?.port ?? 3000);
console.log(config3?.server?.port ?? 3000);
\`\`\`

Expected output:
\`\`\`
8080
3000
3000
\`\`\`

</details>

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

### Exercises

**1. Create and append a list dynamically**
In the browser console (or a JS file loaded in a page), write code that:
1. Creates a \`<ul>\` element with the id \`"fruit-list"\`
2. Creates three \`<li>\` elements for "Apple", "Banana", and "Cherry" using \`textContent\`
3. Appends the \`<li>\` elements to the \`<ul>\`, then appends the \`<ul>\` to \`document.body\`

<details>
<summary>Hint</summary>

Use \`document.createElement("ul")\`, \`document.createElement("li")\`, set \`textContent\` on each \`li\`, and call \`ul.append(li)\` for each. Finally call \`document.body.append(ul)\`. Do not use \`innerHTML\` — set each item's \`textContent\` individually.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const ul = document.createElement("ul");
ul.id = "fruit-list";

["Apple", "Banana", "Cherry"].forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  ul.append(li);
});

document.body.append(ul);
// Result: a <ul id="fruit-list"> with three <li> items appears in the page
\`\`\`

Expected output:
\`\`\`
A <ul> with three <li> items is added to the page body.
\`\`\`

</details>

**2. Toggle a class on an element**
Write code that selects the first \`<h1>\` on the page, adds the class \`"highlight"\`, then logs whether the element currently has that class. Then toggle it off and log again.

<details>
<summary>Hint</summary>

Use \`document.querySelector("h1")\`, \`classList.add("highlight")\`, \`classList.contains("highlight")\`, and \`classList.remove("highlight")\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const heading = document.querySelector("h1");
heading.classList.add("highlight");
console.log(heading.classList.contains("highlight")); // true
heading.classList.remove("highlight");
console.log(heading.classList.contains("highlight")); // false
\`\`\`

Expected output:
\`\`\`
true
false
\`\`\`

</details>

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

### Exercises

**1. Attach and remove a one-time click listener**
In the browser console, attach a click listener to \`document.body\` that logs \`"Body clicked!"\`. Then immediately remove it using the same function reference. Click the page and confirm nothing is logged.

<details>
<summary>Hint</summary>

Store the handler in a named function or a \`const\`. Pass the same reference to both \`addEventListener\` and \`removeEventListener\`. Anonymous arrow functions create a new reference each time, so they cannot be removed.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function handleBodyClick() {
  console.log("Body clicked!");
}

document.body.addEventListener("click", handleBodyClick);
document.body.removeEventListener("click", handleBodyClick);
// Clicking the page now logs nothing — listener was removed successfully
\`\`\`

Expected output:
\`\`\`
(nothing logged when page is clicked)
\`\`\`

</details>

**2. Use event delegation to handle a dynamic list**
Given a \`<ul id="todo-list">\` in the page, write a single delegated listener on the \`<ul>\` that logs the \`textContent\` of any \`<li>\` that is clicked. Do not add a listener to each \`<li>\` individually.

<details>
<summary>Hint</summary>

Listen on the \`ul\` element. In the handler, check \`e.target.matches("li")\` before reading \`e.target.textContent\`. This works for items added dynamically later too.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const list = document.querySelector("#todo-list");

list.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked:", e.target.textContent);
  }
});
// One listener handles all current and future <li> children
\`\`\`

Expected output:
\`\`\`
Clicked: (text of the li that was clicked)
\`\`\`

</details>

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

### Exercises

**1. Convert a Promise chain to async/await**
Rewrite the following Promise chain using \`async/await\` and \`try/catch\`.

\`\`\`javascript
function getUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return res.json();
    })
    .then(user => {
      console.log("Got user:", user.name);
      return user;
    })
    .catch(err => {
      console.error("Failed:", err.message);
    });
}
\`\`\`

<details>
<summary>Hint</summary>

Mark the function \`async\`. Replace each \`.then()\` with an \`await\`. Wrap the whole body in \`try { ... } catch (err) { ... }\`. The \`if (!res.ok)\` check stays the same — throw inside try to trigger the catch.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
async function getUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const user = await res.json();
    console.log("Got user:", user.name);
    return user;
  } catch (err) {
    console.error("Failed:", err.message);
  }
}
\`\`\`

Expected output (when request succeeds):
\`\`\`
Got user: Alice
\`\`\`

</details>

**2. Run two requests in parallel**
The code below fetches a user and their posts *sequentially*. Rewrite it to run both requests in parallel using \`Promise.all\`.

\`\`\`javascript
async function loadProfile(userId) {
  const user  = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
  const posts = await fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json());
  return { user, posts };
}
\`\`\`

<details>
<summary>Hint</summary>

Pass both fetch-and-parse expressions as an array to \`Promise.all([...])\`. Destructure the result with \`const [user, posts] = await Promise.all([...])\`. The two requests now fire simultaneously.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
async function loadProfile(userId) {
  const [user, posts] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
  ]);
  return { user, posts };
}
// Time = max(user latency, posts latency) instead of their sum
\`\`\`

Expected output:
\`\`\`
{ user: { ... }, posts: [ ... ] }
\`\`\`

</details>

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

### Exercises

**1. Deduplicate an array using Set**
Write a function \`unique(arr)\` that returns a new array with duplicate values removed, preserving insertion order.

\`\`\`javascript
console.log(unique([1, 2, 2, 3, 1, 4]));
console.log(unique(["a", "b", "a", "c"]));
\`\`\`

<details>
<summary>Hint</summary>

\`new Set(arr)\` creates a Set of unique values. Spreading it with \`[...new Set(arr)]\` converts it back to an array. Sets preserve insertion order.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function unique(arr) {
  return [...new Set(arr)];
}

console.log(unique([1, 2, 2, 3, 1, 4]));
console.log(unique(["a", "b", "a", "c"]));
\`\`\`

Expected output:
\`\`\`
[1, 2, 3, 4]
["a", "b", "c"]
\`\`\`

</details>

**2. Use a Map to count word frequencies**
Write a function \`wordCount(str)\` that splits a string by spaces and returns a \`Map\` where each key is a word and each value is the number of times it appears.

\`\`\`javascript
const counts = wordCount("the cat sat on the mat the cat");
console.log(counts.get("the"));
console.log(counts.get("cat"));
console.log(counts.get("mat"));
\`\`\`

<details>
<summary>Hint</summary>

Use \`str.split(" ")\` to get an array of words. Iterate with \`for...of\`. For each word, use \`map.get(word) ?? 0\` to get the current count, then \`map.set(word, count + 1)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function wordCount(str) {
  const map = new Map();
  for (const word of str.split(" ")) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return map;
}

const counts = wordCount("the cat sat on the mat the cat");
console.log(counts.get("the"));
console.log(counts.get("cat"));
console.log(counts.get("mat"));
\`\`\`

Expected output:
\`\`\`
3
2
1
\`\`\`

</details>

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
    return \`\${greeting}, \${name}!\`;
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

### Exercises

**1. Explain and fix the loop closure bug**
The following code logs \`3, 3, 3\` instead of \`0, 1, 2\`. Explain why, and fix it with a one-character change.

\`\`\`javascript
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach(fn => fn());
\`\`\`

<details>
<summary>Hint</summary>

\`var\` is function-scoped — all three closures share the *same* \`i\` variable. By the time the functions run, the loop has finished and \`i\` is \`3\`. Change \`var\` to \`let\` to create a new binding per iteration.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const fns = [];
for (let i = 0; i < 3; i++) {  // 'let' creates a new binding each iteration
  fns.push(() => console.log(i));
}
fns.forEach(fn => fn());
\`\`\`

Expected output:
\`\`\`
0
1
2
\`\`\`

</details>

**2. Build a memoize function using closures**
Write a function \`memoize(fn)\` that caches the results of a single-argument function. Calling it twice with the same argument should return the cached result (and not call \`fn\` again).

\`\`\`javascript
let callCount = 0;
const slowDouble = (n) => { callCount++; return n * 2; };
const fastDouble = memoize(slowDouble);

console.log(fastDouble(5));    // 10
console.log(fastDouble(5));    // 10 (cached)
console.log(fastDouble(3));    // 6
console.log(callCount);        // 2 — slowDouble was only called twice (5 and 3)
\`\`\`

<details>
<summary>Hint</summary>

Inside \`memoize\`, declare \`const cache = new Map()\`. Return a function that checks \`cache.has(arg)\` before calling \`fn\`. Store the result with \`cache.set(arg, result)\` before returning it.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

let callCount = 0;
const slowDouble = (n) => { callCount++; return n * 2; };
const fastDouble = memoize(slowDouble);

console.log(fastDouble(5));
console.log(fastDouble(5));
console.log(fastDouble(3));
console.log(callCount);
\`\`\`

Expected output:
\`\`\`
10
10
6
2
\`\`\`

</details>

---

## 2. Prototypes and Classes

ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance — they make object-oriented patterns more readable without changing the underlying mechanism.

### The Prototype Chain

Every JavaScript object has a hidden \`[[Prototype]]\` slot pointing to another object. When you access a property, the engine walks this chain until it finds the property or reaches \`null\`.

\`\`\`mermaid
flowchart TB
    A["myArray instance"] --> B["Array.prototype"]
    B --> C["Object.prototype"]
    C --> D["null"]
    A --- A1["Custom properties"]
    B --- B1["map, filter, reduce, forEach"]
    C --- C1["toString, hasOwnProperty, valueOf"]
\`\`\`

\`\`\`interactive-flow
eventLoop
\`\`\`

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

### Exercises

**1. Extend a class and override a method**
Create a class \`Shape\` with a method \`area()\` that returns \`0\`. Then create a subclass \`Rectangle\` that takes \`width\` and \`height\` in its constructor and overrides \`area()\` to return the correct area. Create a subclass \`Square\` that extends \`Rectangle\` and only takes \`side\`.

\`\`\`javascript
const r = new Rectangle(4, 5);
const s = new Square(3);
console.log(r.area()); // 20
console.log(s.area()); // 9
console.log(s instanceof Rectangle); // true
\`\`\`

<details>
<summary>Hint</summary>

In \`Rectangle\`, store \`this.width\` and \`this.height\` and return \`this.width * this.height\` from \`area()\`. In \`Square\`, call \`super(side, side)\` — you don't need to override \`area()\` again.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
class Shape {
  area() { return 0; }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

const r = new Rectangle(4, 5);
const s = new Square(3);
console.log(r.area());
console.log(s.area());
console.log(s instanceof Rectangle);
\`\`\`

Expected output:
\`\`\`
20
9
true
\`\`\`

</details>

**2. Use a private field to enforce an invariant**
Create a class \`PositiveCounter\` with a private \`#count\` field initialized to \`0\`. Add an \`increment()\` method, a \`decrement()\` method that throws a \`RangeError\` if the result would go below \`0\`, and a \`value\` getter.

\`\`\`javascript
const c = new PositiveCounter();
c.increment();
c.increment();
c.decrement();
console.log(c.value);  // 1
c.decrement();
console.log(c.value);  // 0
c.decrement();         // throws RangeError
\`\`\`

<details>
<summary>Hint</summary>

Declare \`#count = 0\` inside the class body. In \`decrement()\`, check \`if (this.#count === 0) throw new RangeError("...")\` before decrementing. Use \`get value()\` to expose the count read-only.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
class PositiveCounter {
  #count = 0;

  increment() { this.#count++; }

  decrement() {
    if (this.#count === 0) throw new RangeError("Count cannot go below 0");
    this.#count--;
  }

  get value() { return this.#count; }
}

const c = new PositiveCounter();
c.increment();
c.increment();
c.decrement();
console.log(c.value);
c.decrement();
console.log(c.value);
try { c.decrement(); } catch (e) { console.log(e.message); }
\`\`\`

Expected output:
\`\`\`
1
0
Count cannot go below 0
\`\`\`

</details>

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

### Exercises

**1. Name the import pattern**
For each import statement, identify whether it uses a *default import*, *named import*, *namespace import*, or *dynamic import*.

\`\`\`javascript
import React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
const { Chart } = await import("./chart.js");
\`\`\`

<details>
<summary>Hint</summary>

Default imports have no braces. Named imports use \`{ name }\`. Namespace imports use \`* as name\`. Dynamic imports use \`import()\` as a function call and must be awaited.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
import React from "react";              // Default import
import { useState, useEffect } from "react"; // Named imports
import * as ReactDOM from "react-dom";  // Namespace import
const { Chart } = await import("./chart.js"); // Dynamic import (code splitting)
\`\`\`

Expected output:
\`\`\`
(this is an identification exercise — no runtime output)
\`\`\`

</details>

**2. Write a module with named and default exports**
Write the contents of two files: \`geometry.js\` (exports a \`circle(r)\` function and a \`rectangle(w, h)\` function as named exports, and exports a \`DEFAULT_UNIT\` constant as the default export) and \`app.js\` (imports and uses all three).

<details>
<summary>Hint</summary>

Use \`export function circle(r) {...}\` and \`export function rectangle(w, h) {...}\` for named exports. Use \`export default "cm"\` for the default export. In \`app.js\`, import with \`import unit, { circle, rectangle } from "./geometry.js"\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
// geometry.js
export function circle(r) {
  return Math.PI * r * r;
}
export function rectangle(w, h) {
  return w * h;
}
export default "cm";

// app.js
import unit, { circle, rectangle } from "./geometry.js";

console.log(circle(5).toFixed(2));   // "78.54"
console.log(rectangle(4, 6));        // 24
console.log(unit);                   // "cm"
\`\`\`

Expected output:
\`\`\`
78.54
24
cm
\`\`\`

</details>

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

### Exercises

**1. Create a custom error class hierarchy**
Create a \`DatabaseError\` class that extends \`Error\`. It should accept a \`message\` and a boolean \`retryable\`. Then write a \`runQuery\` function that throws a \`DatabaseError\` with \`retryable: true\` when given the query \`"FAIL"\`. In the catch block, log whether the error is retryable.

\`\`\`javascript
try {
  runQuery("FAIL");
} catch (err) {
  if (err instanceof DatabaseError) {
    console.log(err.message);
    console.log("Retryable:", err.retryable);
  }
}
\`\`\`

<details>
<summary>Hint</summary>

In the constructor, call \`super(message)\` and set \`this.name = "DatabaseError"\` and \`this.retryable = retryable\`. In \`runQuery\`, throw \`new DatabaseError("Query failed", true)\` when the query is \`"FAIL"\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
class DatabaseError extends Error {
  constructor(message, retryable = false) {
    super(message);
    this.name = "DatabaseError";
    this.retryable = retryable;
  }
}

function runQuery(sql) {
  if (sql === "FAIL") throw new DatabaseError("Query failed", true);
  return [];
}

try {
  runQuery("FAIL");
} catch (err) {
  if (err instanceof DatabaseError) {
    console.log(err.message);
    console.log("Retryable:", err.retryable);
  }
}
\`\`\`

Expected output:
\`\`\`
Query failed
Retryable: true
\`\`\`

</details>

**2. Re-throw unknown errors**
Explain what is wrong with the following error handler, and rewrite it correctly.

\`\`\`javascript
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.log("An error occurred");
  }
}
\`\`\`

<details>
<summary>Hint</summary>

The catch block swallows all errors silently — callers can never know a failure happened and cannot respond accordingly. At minimum, re-throw after logging, or only catch known recoverable errors and let others propagate.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("fetchData failed:", err.message);
    throw err; // re-throw so callers can handle or report the failure
  }
}
\`\`\`

Expected output (on failure):
\`\`\`
fetchData failed: HTTP 404
\`\`\`

</details>

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

### Exercises

**1. Handle partial failures with Promise.allSettled**
Write an \`async\` function \`loadAll(urls)\` that fetches all URLs in parallel and returns an array where each item is either the parsed JSON (on success) or the string \`"error"\` (on failure). Use \`Promise.allSettled\` so that one failing URL does not prevent the others from loading.

<details>
<summary>Hint</summary>

Pass \`urls.map(url => fetch(url).then(r => r.json()))\` to \`Promise.allSettled\`. Each result has a \`status\` field: \`"fulfilled"\` or \`"rejected"\`. Map over results: return \`r.value\` when fulfilled, \`"error"\` when rejected.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
async function loadAll(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url).then(r => r.json()))
  );
  return results.map(r => r.status === "fulfilled" ? r.value : "error");
}

// Example usage:
loadAll(["/api/users", "/api/broken", "/api/posts"]).then(data => {
  console.log(data); // [usersArray, "error", postsArray]
});
\`\`\`

Expected output:
\`\`\`
[{ ...users data... }, "error", { ...posts data... }]
\`\`\`

</details>

**2. Build a timeout wrapper for fetch**
Write a function \`fetchWithTimeout(url, ms)\` that rejects with a \`"Timeout"\` error if the fetch takes longer than \`ms\` milliseconds. Use \`AbortController\` and \`setTimeout\`.

<details>
<summary>Hint</summary>

Create an \`AbortController\`, use \`setTimeout\` to call \`controller.abort()\` after \`ms\` ms, then pass \`{ signal: controller.signal }\` to \`fetch\`. Call \`clearTimeout\` on the timer if the fetch completes first. Rethrow \`AbortError\` as a readable message.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timerId);
    return res.json();
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Timeout");
    throw err;
  }
}
\`\`\`

Expected output (on timeout):
\`\`\`
Error: Timeout
\`\`\`

</details>

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

### Exercises

**1. Write unit tests for a pure function**
Given this \`clamp\` function, write at least three test cases covering the normal range, the lower boundary, and the upper boundary.

\`\`\`javascript
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
\`\`\`

<details>
<summary>Hint</summary>

Use \`describe("clamp", () => { ... })\` with at least one \`test()\` for each: a value within range, a value below \`min\`, and a value above \`max\`. Use \`expect(clamp(x, min, max)).toBe(expected)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
import { describe, test, expect } from "vitest";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

describe("clamp", () => {
  test("returns the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test("clamps to min when value is too low", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test("clamps to max when value is too high", () => {
    expect(clamp(20, 0, 10)).toBe(10);
  });

  test("handles value equal to min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });
});
\`\`\`

Expected output:
\`\`\`
✓ returns the value when within range
✓ clamps to min when value is too low
✓ clamps to max when value is too high
✓ handles value equal to min
\`\`\`

</details>

**2. Identify what makes a function hard to test**
Explain why the following function is hard to unit test, and rewrite it to be testable.

\`\`\`javascript
function greetUser() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : "Good evening";
  document.getElementById("greeting").textContent = greeting;
}
\`\`\`

<details>
<summary>Hint</summary>

The function has two problems: it reads the current time (a side effect that changes every second) and it writes to the DOM (hard to assert in unit tests). Extract the logic into a pure function that takes \`hour\` and returns a string.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
// Pure, testable function — no side effects
function getGreeting(hour) {
  return hour < 12 ? "Good morning" : "Good evening";
}

// Integration layer — calls the pure function and handles the side effect
function greetUser() {
  const greeting = getGreeting(new Date().getHours());
  document.getElementById("greeting").textContent = greeting;
}

// Now testable with no mocking needed:
// expect(getGreeting(9)).toBe("Good morning");
// expect(getGreeting(14)).toBe("Good evening");
\`\`\`

Expected output:
\`\`\`
getGreeting(9)  → "Good morning"
getGreeting(14) → "Good evening"
\`\`\`

</details>

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

### Exercises

**1. Trace a pipe pipeline**
Given the \`pipe\` utility and the following pipeline, trace the intermediate values step by step and predict the final output.

\`\`\`javascript
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);

const addTen  = x => x + 10;
const halve   = x => x / 2;
const negate  = x => -x;

const transform = pipe(addTen, halve, negate);
console.log(transform(6));
\`\`\`

<details>
<summary>Hint</summary>

\`pipe\` applies functions left-to-right. Start with \`6\`, apply \`addTen\` → \`16\`, apply \`halve\` → \`8\`, apply \`negate\` → \`-8\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);

const addTen  = x => x + 10;
const halve   = x => x / 2;
const negate  = x => -x;

const transform = pipe(addTen, halve, negate);
console.log(transform(6)); // 6 → 16 → 8 → -8
\`\`\`

Expected output:
\`\`\`
-8
\`\`\`

</details>

**2. Use reduce to group items**
Without using \`Object.groupBy\`, write a \`groupBy(arr, keyFn)\` function using \`reduce\` that groups an array of objects by a key function.

\`\`\`javascript
const people = [
  { name: "Alice", dept: "eng" },
  { name: "Bob", dept: "sales" },
  { name: "Charlie", dept: "eng" },
];

const grouped = groupBy(people, p => p.dept);
console.log(grouped.eng.map(p => p.name));
console.log(grouped.sales.map(p => p.name));
\`\`\`

<details>
<summary>Hint</summary>

Use \`arr.reduce((acc, item) => { ... }, {})\`. Inside, compute the key with \`keyFn(item)\`. If \`acc[key]\` doesn't exist yet, initialize it to \`[]\`. Then push \`item\` into \`acc[key]\`. Return \`acc\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

const people = [
  { name: "Alice", dept: "eng" },
  { name: "Bob", dept: "sales" },
  { name: "Charlie", dept: "eng" },
];

const grouped = groupBy(people, p => p.dept);
console.log(grouped.eng.map(p => p.name));
console.log(grouped.sales.map(p => p.name));
\`\`\`

Expected output:
\`\`\`
["Alice", "Charlie"]
["Bob"]
\`\`\`

</details>

---

## 8. ES2024 Features You Should Know

ES2024 introduced several features that are now available in all major browsers and Node.js 22+.

\`\`\`javascript
// Object.groupBy — group array items by a key (ES2024)
// NOTE: This is Object.groupBy, NOT Array.prototype.groupBy (the proposal changed)
const people = [
  { name: "Alice", dept: "eng" },
  { name: "Bob", dept: "sales" },
  { name: "Charlie", dept: "eng" },
];
const byDept = Object.groupBy(people, (person) => person.dept);
// { eng: [{ name: "Alice", ... }, { name: "Charlie", ... }], sales: [{ name: "Bob", ... }] }

// Map.groupBy — same but returns a Map (useful when keys aren't strings)
const byLength = Map.groupBy(["hi", "hey", "hello"], (word) => word.length);
// Map { 2 => ["hi"], 3 => ["hey"], 5 => ["hello"] }

// Promise.withResolvers — extract resolve/reject without the executor callback
const { promise, resolve, reject } = Promise.withResolvers();
// Equivalent to: let resolve, reject; const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
// Useful when resolve/reject need to be called from a different scope
setTimeout(() => resolve("done"), 1000);
const result = await promise; // "done"

// structuredClone — deep copy built into the language
const original = { nested: { value: 42 }, date: new Date(), set: new Set([1, 2]) };
const clone = structuredClone(original);
clone.nested.value = 99;
console.log(original.nested.value); // 42 — untouched
// Handles Date, Map, Set, ArrayBuffer, RegExp — NOT functions or DOM nodes
\`\`\`

**Why it matters:** \`Object.groupBy\` eliminates one of the most common \`reduce\` patterns. \`Promise.withResolvers\` cleans up the awkward pattern of extracting \`resolve\`/\`reject\` via closure. \`structuredClone\` replaces the \`JSON.parse(JSON.stringify(x))\` hack for deep copying.

### Exercises

**1. Group an array with Object.groupBy**
Use \`Object.groupBy\` to group the following list of tasks by their \`priority\` field.

\`\`\`javascript
const tasks = [
  { title: "Fix login bug", priority: "high" },
  { title: "Update docs", priority: "low" },
  { title: "Deploy to staging", priority: "high" },
  { title: "Refactor auth module", priority: "medium" },
];

const byPriority = Object.groupBy(tasks, t => t.priority);
console.log(byPriority.high.length);
console.log(byPriority.low[0].title);
\`\`\`

<details>
<summary>Hint</summary>

\`Object.groupBy(array, callbackFn)\` — the callback receives each element and returns the key to group by. The result is a plain object whose keys are the unique return values of the callback.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const tasks = [
  { title: "Fix login bug", priority: "high" },
  { title: "Update docs", priority: "low" },
  { title: "Deploy to staging", priority: "high" },
  { title: "Refactor auth module", priority: "medium" },
];

const byPriority = Object.groupBy(tasks, t => t.priority);
console.log(byPriority.high.length);
console.log(byPriority.low[0].title);
\`\`\`

Expected output:
\`\`\`
2
Update docs
\`\`\`

</details>

**2. Deep clone and verify independence**
Use \`structuredClone\` to clone the object below, mutate the clone, and verify the original is unchanged.

\`\`\`javascript
const original = {
  user: { name: "Alice", scores: [10, 20, 30] },
};
\`\`\`

<details>
<summary>Hint</summary>

Call \`const clone = structuredClone(original)\`. Mutate \`clone.user.name\` and push a value into \`clone.user.scores\`. Then log both originals to confirm they are independent objects.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const original = {
  user: { name: "Alice", scores: [10, 20, 30] },
};

const clone = structuredClone(original);
clone.user.name = "Bob";
clone.user.scores.push(40);

console.log(original.user.name);          // "Alice"
console.log(original.user.scores.length); // 3
console.log(clone.user.name);             // "Bob"
console.log(clone.user.scores.length);    // 4
\`\`\`

Expected output:
\`\`\`
Alice
3
Bob
4
\`\`\`

</details>

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
| ES2024 | \`Object.groupBy\`, \`Promise.withResolvers\`, \`structuredClone\` — modern built-ins |

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

### Exercises

**1. Predict the event loop execution order**
Without running the code, write out the exact order in which numbers will be logged.

\`\`\`javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
queueMicrotask(() => console.log("D"));
console.log("E");
\`\`\`

<details>
<summary>Hint</summary>

Synchronous code runs first (call stack). Then all microtasks drain (\`Promise.then\` and \`queueMicrotask\` are both microtasks, processed in the order they were queued). Only after the microtask queue is empty does the event loop pick up the next macrotask (\`setTimeout\` callback).

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
console.log("A"); // Sync
setTimeout(() => console.log("B"), 0); // Macrotask — queued
Promise.resolve().then(() => console.log("C")); // Microtask — queued
queueMicrotask(() => console.log("D")); // Microtask — queued
console.log("E"); // Sync

// Execution order: A → E → C → D → B
\`\`\`

Expected output:
\`\`\`
A
E
C
D
B
\`\`\`

</details>

**2. Identify the main-thread blocking issue and fix it**
The following function processes a 50,000-item array synchronously. Explain why this blocks the UI and rewrite it to yield to the event loop every 500 items using \`setTimeout\`.

\`\`\`javascript
function processAll(data) {
  return data.map(item => item * 2);
}
\`\`\`

<details>
<summary>Hint</summary>

A synchronous \`map\` over 50,000 items never yields — the call stack is occupied the entire time and no other events (clicks, renders) can be processed. Chunk the work: process 500 items, then \`setTimeout(() => processChunk(), 0)\` to yield before continuing.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function processInChunks(data, chunkSize = 500) {
  return new Promise((resolve) => {
    const results = [];
    let i = 0;

    function processChunk() {
      const end = Math.min(i + chunkSize, data.length);
      for (; i < end; i++) {
        results.push(data[i] * 2);
      }
      if (i < data.length) {
        setTimeout(processChunk, 0); // yield — browser can render and handle events
      } else {
        resolve(results);
      }
    }

    processChunk();
  });
}

processInChunks([1, 2, 3, 4, 5]).then(result => console.log(result));
\`\`\`

Expected output:
\`\`\`
[2, 4, 6, 8, 10]
\`\`\`

</details>

---

### Module Bundling Pipeline

\`\`\`mermaid
flowchart LR
    A[Entry Point] --> B[Resolve Imports]
    B --> C[Build Dependency Graph]
    C --> D[Transform / Transpile]
    D --> E[Tree Shaking]
    E --> F[Code Splitting]
    F --> G[Minify]
    G --> H[Output Bundles]
\`\`\`

## 2. Memory Management

JavaScript has automatic garbage collection, but memory leaks in long-running single-page applications are a real production problem.

### Memory Lifecycle

\`\`\`mermaid
flowchart TB
    A[Allocate Memory] --> B[Use Memory]
    B --> C{Still Reachable?}
    C -->|Yes| B
    C -->|No| D[Mark as Garbage]
    D --> E[GC Sweep]
    E --> F[Free Memory]
    F --> A
\`\`\`

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

### Exercises

**1. Identify the memory leak and fix it**
The class below leaks memory. Identify the cause and write a corrected version with a \`destroy()\` method.

\`\`\`javascript
class Tooltip {
  constructor(element) {
    this.element = element;
    this.data = new Array(5000).fill("tooltip content");
    window.addEventListener("scroll", () => this.updatePosition());
  }

  updatePosition() {
    // uses this.data and this.element
  }
}

const tip = new Tooltip(document.querySelector("#btn"));
// Later: tip is no longer needed, but the object stays alive
\`\`\`

<details>
<summary>Hint</summary>

The inline arrow function passed to \`addEventListener\` creates a new function reference that cannot be removed. Store the handler as \`this.handleScroll = () => this.updatePosition()\` so you can call \`window.removeEventListener("scroll", this.handleScroll)\` in \`destroy()\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
class Tooltip {
  constructor(element) {
    this.element = element;
    this.data = new Array(5000).fill("tooltip content");
    this.handleScroll = () => this.updatePosition(); // store reference
    window.addEventListener("scroll", this.handleScroll);
  }

  updatePosition() {
    // uses this.data and this.element
  }

  destroy() {
    window.removeEventListener("scroll", this.handleScroll); // remove by reference
    this.data = null;       // release large array
    this.element = null;    // release DOM reference
  }
}
\`\`\`

Expected output:
\`\`\`
(no output — this is a structural fix to prevent memory leaks)
\`\`\`

</details>

**2. Choose WeakMap vs Map**
Explain why the following cache implementation could cause a memory leak, and rewrite it using \`WeakMap\`.

\`\`\`javascript
const cache = new Map();

function processElement(domNode) {
  if (!cache.has(domNode)) {
    cache.set(domNode, computeLayout(domNode));
  }
  return cache.get(domNode);
}
\`\`\`

<details>
<summary>Hint</summary>

A \`Map\` holds strong references to its keys. When DOM nodes are removed from the document and otherwise unreachable, the \`Map\` still keeps them alive (and their cached data). A \`WeakMap\` holds *weak* references — when the node is otherwise unreachable, the GC can collect both the node and the cache entry.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const cache = new WeakMap(); // weak reference — GC can reclaim DOM nodes

function processElement(domNode) {
  if (!cache.has(domNode)) {
    cache.set(domNode, computeLayout(domNode));
  }
  return cache.get(domNode);
}
// When domNode is removed from the DOM and all JS references are dropped,
// the WeakMap entry is automatically garbage collected too.
\`\`\`

Expected output:
\`\`\`
(no output — this is a structural fix to prevent memory leaks)
\`\`\`

</details>

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

### Exercises

**1. Implement debounce from scratch**
Write a \`debounce(fn, delay)\` function. The returned function should reset the timer every time it is called and only invoke \`fn\` once the timer has expired without a new call.

\`\`\`javascript
const log = debounce((msg) => console.log(msg), 200);
log("a"); // timer starts
log("b"); // timer resets
log("c"); // timer resets — only this call fires after 200ms
// Expected: only "c" is logged (after 200ms of silence)
\`\`\`

<details>
<summary>Hint</summary>

Declare \`let timerId\` in the outer scope. In the returned function, call \`clearTimeout(timerId)\` first, then \`timerId = setTimeout(() => fn.apply(this, args), delay)\`. Each call cancels the previous timer and starts a fresh one.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const log = debounce((msg) => console.log(msg), 200);
log("a");
log("b");
log("c");
// After 200ms of silence, logs "c"
\`\`\`

Expected output (after 200ms):
\`\`\`
c
\`\`\`

</details>

**2. Implement throttle from scratch**
Write a \`throttle(fn, intervalMs)\` function. The returned function should invoke \`fn\` immediately on the first call, then ignore calls until \`intervalMs\` milliseconds have passed.

\`\`\`javascript
const throttled = throttle(() => console.log("fired"), 1000);
throttled(); // fires immediately
throttled(); // ignored (< 1000ms later)
throttled(); // ignored (< 1000ms later)
// After 1000ms:
throttled(); // fires again
\`\`\`

<details>
<summary>Hint</summary>

Track \`let lastRun = 0\`. In the returned function, get \`const now = Date.now()\`. If \`now - lastRun >= intervalMs\`, update \`lastRun = now\` and call \`fn.apply(this, args)\`. Otherwise skip.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
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

const throttled = throttle(() => console.log("fired"), 1000);
throttled(); // fired
throttled(); // (ignored)
throttled(); // (ignored)
\`\`\`

Expected output:
\`\`\`
fired
\`\`\`

</details>

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

### Exercises

**1. Implement a simple EventEmitter**
Write a minimal \`EventEmitter\` class with \`on(event, fn)\`, \`off(event, fn)\`, and \`emit(event, ...args)\` methods. Test it with a \`"data"\` event.

\`\`\`javascript
const emitter = new EventEmitter();
const handler = (msg) => console.log("Received:", msg);
emitter.on("data", handler);
emitter.emit("data", "hello");    // Received: hello
emitter.off("data", handler);
emitter.emit("data", "world");    // (nothing logged)
\`\`\`

<details>
<summary>Hint</summary>

Use a \`Map\` where each key is an event name and each value is a \`Set\` of listener functions. \`on\` adds to the Set, \`off\` deletes from it, \`emit\` iterates the Set and calls each function with the given args.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
class EventEmitter {
  #listeners = new Map();

  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(fn);
  }

  off(event, fn) {
    this.#listeners.get(event)?.delete(fn);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(fn => fn(...args));
  }
}

const emitter = new EventEmitter();
const handler = (msg) => console.log("Received:", msg);
emitter.on("data", handler);
emitter.emit("data", "hello");
emitter.off("data", handler);
emitter.emit("data", "world");
\`\`\`

Expected output:
\`\`\`
Received: hello
\`\`\`

</details>

**2. Apply the Strategy Pattern**
Refactor the following function to use the Strategy Pattern so that new discount types can be added without modifying the core logic.

\`\`\`javascript
function applyDiscount(order, type) {
  if (type === "percent10") return order.total * 0.9;
  if (type === "fixed5") return order.total - 5;
  if (type === "halfprice") return order.total * 0.5;
  return order.total;
}
\`\`\`

<details>
<summary>Hint</summary>

Create a \`discountStrategies\` object where each key is a strategy name and each value is a function \`(order) => newTotal\`. The main function looks up the strategy and calls it, throwing if the strategy is unknown.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const discountStrategies = {
  percent10: (order) => order.total * 0.9,
  fixed5:    (order) => order.total - 5,
  halfprice: (order) => order.total * 0.5,
};

function applyDiscount(order, type) {
  const strategy = discountStrategies[type];
  if (!strategy) throw new Error(\`Unknown discount type: \${type}\`);
  return strategy(order);
}

console.log(applyDiscount({ total: 100 }, "percent10")); // 90
console.log(applyDiscount({ total: 100 }, "fixed5"));    // 95
console.log(applyDiscount({ total: 100 }, "halfprice")); // 50
\`\`\`

Expected output:
\`\`\`
90
95
50
\`\`\`

</details>

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

### Exercises

**1. Write the safe version of a DOM update function**
A colleague has written a function that sets an element's content using a string concatenation approach that is unsafe for user-supplied input. Write the corrected version that cannot execute injected markup.

The original (unsafe pattern to avoid):
\`\`\`
element.innerHTML = "Results for: " + userQuery;
\`\`\`

Write a safe replacement that uses \`textContent\` and confirm what the page shows when \`userQuery\` is the string \`<b>hello</b>\`.

<details>
<summary>Hint</summary>

\`textContent\` always treats the assigned value as a literal string — angle brackets are never interpreted as HTML tags. The text \`<b>hello</b>\` will appear verbatim on the page instead of being rendered as bold text.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function displayQuery(element, userQuery) {
  element.textContent = "Results for: " + userQuery;
  // textContent escapes all HTML — the string is shown literally
}

// When userQuery = "<b>hello</b>":
// Page shows: Results for: <b>hello</b>   (literal text, no bold tag rendered)
\`\`\`

Expected output (visible text on page):
\`\`\`
Results for: <b>hello</b>
\`\`\`

</details>

**2. Protect a merge function against prototype pollution**
Write a \`secureMerge(target, source)\` function that copies own properties from \`source\` onto \`target\` while blocking the keys \`__proto__\`, \`constructor\`, and \`prototype\`.

\`\`\`javascript
const obj = {};
secureMerge(obj, JSON.parse('{"__proto__": {"hacked": true}, "name": "Alice"}'));
console.log(obj.name);          // "Alice"
console.log(({}).hacked);       // undefined — prototype not polluted
\`\`\`

<details>
<summary>Hint</summary>

Use \`Object.keys(source)\` (not \`for...in\`) to iterate only own keys. Check each key against a blocklist \`Set\` before copying. \`Object.keys\` already skips prototype properties, but the check guards against keys whose *names* are dangerous.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function secureMerge(target, source) {
  const blocked = new Set(["__proto__", "constructor", "prototype"]);
  for (const key of Object.keys(source)) {
    if (!blocked.has(key)) {
      target[key] = source[key];
    }
  }
  return target;
}

const obj = {};
secureMerge(obj, JSON.parse('{"__proto__": {"hacked": true}, "name": "Alice"}'));
console.log(obj.name);
console.log(({}).hacked);
\`\`\`

Expected output:
\`\`\`
Alice
undefined
\`\`\`

</details>

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

### Exercises

**1. Design a Worker communication protocol**
You are building a feature that compresses images in a Web Worker. Design the message protocol (the shape of objects passed via \`postMessage\`) for both directions: main → worker and worker → main. Include a message type, a request ID (so multiple in-flight requests can be tracked), and the relevant data or result.

<details>
<summary>Hint</summary>

Use a \`type\` field to distinguish message kinds (e.g. \`"compress:request"\` and \`"compress:response"\`). Use an \`id\` field (e.g. a UUID or incrementing counter) to match responses back to their requests. Include \`payload\` on the way in and \`result\` (or \`error\`) on the way out.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
// main.js → worker.js
const request = {
  type: "compress:request",
  id: crypto.randomUUID(),    // unique ID to match the response
  payload: imageArrayBuffer,  // ArrayBuffer — use transferables
};
worker.postMessage(request, [request.payload]);

// worker.js → main.js (success)
const successResponse = {
  type: "compress:response",
  id: request.id,             // echo the request ID
  result: compressedBuffer,   // result data
  error: null,
};

// worker.js → main.js (failure)
const errorResponse = {
  type: "compress:response",
  id: request.id,
  result: null,
  error: "Unsupported image format",
};
\`\`\`

Expected output:
\`\`\`
(design exercise — no runtime output)
\`\`\`

</details>

**2. Explain transferable objects**
What is the difference between \`worker.postMessage(data)\` and \`worker.postMessage(data, [data.buffer])\`? When should you use the second form?

<details>
<summary>Hint</summary>

The default \`postMessage\` *copies* the data using the structured clone algorithm — for large \`ArrayBuffer\`s this means copying megabytes of data. Transferable objects (the second argument) *transfer ownership* to the worker with zero copying — after transfer the original buffer is detached and unusable in the main thread.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const buffer = new ArrayBuffer(10 * 1024 * 1024); // 10 MB

// Structured clone — copies the 10 MB (slow for large buffers)
worker.postMessage({ buffer });

// Transferable — zero-copy transfer, buffer is detached in main thread
worker.postMessage({ buffer }, [buffer]);
// After this line: buffer.byteLength === 0 (ownership transferred to worker)
console.log(buffer.byteLength); // 0
\`\`\`

Expected output:
\`\`\`
0
\`\`\`

Use the transferable form for \`ArrayBuffer\`, \`MessagePort\`, \`ImageBitmap\`, and \`OffscreenCanvas\` whenever the sending context no longer needs the data after posting.

</details>

---

## 7. ES2024/ES2025 Advanced Features

Senior engineers must stay current with the evolving language. These features are shipping in engines now (2024-2025).

### Set Methods (ES2025)

\`\`\`javascript
// Set finally gets first-class set operations — no more manual loops
const frontend = new Set(["Alice", "Bob", "Charlie"]);
const backend  = new Set(["Bob", "Diana", "Charlie"]);

frontend.intersection(backend);      // Set {"Bob", "Charlie"}
frontend.union(backend);             // Set {"Alice", "Bob", "Charlie", "Diana"}
frontend.difference(backend);        // Set {"Alice"}
frontend.symmetricDifference(backend); // Set {"Alice", "Diana"}
frontend.isSubsetOf(backend);        // false
frontend.isSupersetOf(backend);      // false
frontend.isDisjointFrom(new Set(["Eve"])); // true
\`\`\`

### Iterator Helpers (ES2025)

\`\`\`javascript
// Lazy iterator methods — no intermediate arrays, process on demand
function* fibonacci() {
  let a = 0, b = 1;
  while (true) { yield a; [a, b] = [b, a + b]; }
}

// .take(), .filter(), .map(), .drop(), .forEach(), .reduce(), .toArray()
const result = fibonacci()
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(5)
  .toArray();
// [0, 20, 80, 340, 1440] — first 5 even Fibonacci numbers × 10
// No infinite array was ever created — lazy evaluation
\`\`\`

### Explicit Resource Management — \`using\` Declarations (ES2025)

\`\`\`javascript
// 'using' ensures cleanup runs when the scope exits (like RAII in C++ or 'with' in Python)
// Requires Symbol.dispose (sync) or Symbol.asyncDispose (async)

class DatabaseConnection {
  constructor(url) { this.url = url; console.log(\`Connected to \${url}\`); }
  query(sql) { /* ... */ }
  [Symbol.dispose]() { console.log(\`Disconnected from \${this.url}\`); }
}

function runQuery() {
  using conn = new DatabaseConnection("postgres://localhost/mydb");
  conn.query("SELECT * FROM users");
  // conn[Symbol.dispose]() is called automatically when scope exits
  // Even if an exception is thrown — like try/finally but built into the language
}

// Async version with 'await using'
class FileHandle {
  [Symbol.asyncDispose]() { return this.close(); }
  async close() { /* flush and close */ }
}

async function processFile() {
  await using file = await openFile("data.csv");
  // file is automatically closed when scope exits
}
\`\`\`

### Decorators (Stage 3 / ES2025)

\`\`\`javascript
// Decorators modify class elements declaratively
function logged(originalMethod, context) {
  return function(...args) {
    console.log(\`Calling \${context.name} with\`, args);
    const result = originalMethod.call(this, ...args);
    console.log(\`\${context.name} returned\`, result);
    return result;
  };
}

class Calculator {
  @logged
  add(a, b) { return a + b; }
}

const calc = new Calculator();
calc.add(2, 3);
// Logs: "Calling add with [2, 3]"
// Logs: "add returned 5"
\`\`\`

### Temporal API (Stage 3, progressing toward inclusion)

\`\`\`javascript
// Temporal replaces the broken Date object with an immutable, timezone-aware API
// Available behind flags or via polyfill — track progress at tc39.es/proposal-temporal
// Temporal.PlainDate — no time, no timezone
const date = Temporal.PlainDate.from("2026-03-21");
const nextWeek = date.add({ days: 7 }); // 2026-03-28 — immutable, returns new object

// Temporal.ZonedDateTime — full timezone support
const meeting = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2026, month: 3, day: 21, hour: 14,
});
const inTokyo = meeting.withTimeZone("Asia/Tokyo");
// Correctly handles DST, leap seconds, and calendar differences
\`\`\`

**Why it matters:** These features represent the maturation of JavaScript as a systems-capable language. \`using\` declarations eliminate an entire class of resource leak bugs. Set methods and Iterator helpers bring JavaScript closer to parity with Python and Rust for data manipulation. Temporal finally fixes the 25-year-old Date mess.

### Exercises

**1. Use Set methods to find common and unique team members**
Given two Sets of team members, use the new ES2025 Set methods to find: (a) members on both teams, (b) members on either team, and (c) members only on the frontend team.

\`\`\`javascript
const frontend = new Set(["Alice", "Bob", "Charlie"]);
const backend  = new Set(["Bob", "Diana", "Charlie", "Eve"]);
\`\`\`

<details>
<summary>Hint</summary>

\`intersection\` returns elements in both sets. \`union\` returns all elements from both. \`difference\` returns elements in the first set that are not in the second.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
const frontend = new Set(["Alice", "Bob", "Charlie"]);
const backend  = new Set(["Bob", "Diana", "Charlie", "Eve"]);

console.log([...frontend.intersection(backend)]);
console.log([...frontend.union(backend)]);
console.log([...frontend.difference(backend)]);
\`\`\`

Expected output:
\`\`\`
["Bob", "Charlie"]
["Alice", "Bob", "Charlie", "Diana", "Eve"]
["Alice"]
\`\`\`

</details>

**2. Consume an infinite generator lazily with Iterator helpers**
Write a generator \`naturals()\` that yields 1, 2, 3, 4, ... infinitely. Then use ES2025 Iterator helpers to get the first 5 numbers that are divisible by 3, as an array.

<details>
<summary>Hint</summary>

\`function* naturals()\` with \`let n = 1; while (true) { yield n++; }\`. Then chain \`.filter(n => n % 3 === 0).take(5).toArray()\`. No intermediate array of infinite values is created — lazily evaluated.

</details>

<details>
<summary>Answer</summary>

\`\`\`javascript
function* naturals() {
  let n = 1;
  while (true) { yield n++; }
}

const result = naturals()
  .filter(n => n % 3 === 0)
  .take(5)
  .toArray();

console.log(result);
\`\`\`

Expected output:
\`\`\`
[3, 6, 9, 12, 15]
\`\`\`

</details>

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
| ES2024/2025 | Set methods, Iterator helpers, \`using\` for resource management, decorators, Temporal API |

---

## Recommended Videos — Senior Level

- **JSConf EU** — "What the heck is the event loop anyway?" (Philip Roberts) — https://www.youtube.com/watch?v=8aGhZQkoFbQ
- **JSConf Asia** — "In the Loop" (Jake Archibald) — https://www.youtube.com/watch?v=cCOL7MC4Pl0
- **JSUnconf** — "Learning Functional Programming with JavaScript" (Anjana Vakil) — https://www.youtube.com/watch?v=e-5obm1G_FY
`,
};
