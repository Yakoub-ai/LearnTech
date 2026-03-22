# JavaScript — Beginner Concept Reference

> Full interactive version available on the [Tech Hub Learning Platform](/language/javascript/beginner)

## Prerequisites

- Basic understanding of HTML and CSS
- A web browser with developer tools (Chrome, Firefox, or Edge)
- No prior JavaScript experience required

## Estimated Time

40 hours

---

## 1. Variables and Data Types

JavaScript has three keywords for declaring variables: `var`, `let`, and `const`. Choosing the right one prevents entire categories of bugs.

`const` should be your default choice. It prevents reassignment of the binding, which makes code easier to reason about. Use `let` only when you need to reassign the variable (loop counters, accumulators). Never use `var` in modern code — it is function-scoped instead of block-scoped, which causes unexpected behavior in loops and conditionals.

**Code walkthrough:**

```javascript
// Step 1: const is block-scoped and cannot be reassigned
// Use it for values that should not change binding
const MAX_RETRIES = 3;
const API_URL = "https://api.example.com";

// Step 2: let is block-scoped and CAN be reassigned
// Use it for counters, accumulators, or values that change
let count = 0;
count = count + 1; // OK — let allows reassignment

// Step 3: var is function-scoped — avoid in modern code
// It leaks out of if/for blocks, causing subtle bugs
var legacyName = "Alice"; // hoisted to function scope

// Step 4: const does NOT mean immutable for objects/arrays
// It only locks the binding — contents can still change
const user = { name: "Alice", age: 30 };
user.age = 31;        // OK — mutating the object
// user = {};          // TypeError — reassigning the binding
```

### JavaScript Primitive Types

JavaScript has seven primitive types. Every value that is not an object (including arrays and functions) is a primitive.

| Type | Example | `typeof` result | Notes |
|------|---------|-----------------|-------|
| `string` | `"hello"` | `"string"` | Immutable sequence of UTF-16 code units |
| `number` | `42`, `3.14` | `"number"` | IEEE 754 double-precision; includes `Infinity`, `NaN` |
| `boolean` | `true`, `false` | `"boolean"` | Only two values |
| `null` | `null` | `"object"` | Historical bug — `null` is its own type |
| `undefined` | `undefined` | `"undefined"` | Variable declared but not assigned |
| `symbol` | `Symbol("id")` | `"symbol"` | Unique, non-enumerable key |
| `bigint` | `9007199254740993n` | `"bigint"` | Arbitrary-precision integer (ES2020) |

### Type Coercion and Strict Equality

JavaScript silently converts types in certain operations. This is called type coercion. It is the source of many beginner bugs.

```javascript
// Step 5: The + operator with a string does concatenation, not addition
console.log("5" + 3);      // "53" — number coerced to string
console.log("5" - 3);      // 2   — string coerced to number

// Step 6: Always use === (strict equality) to avoid coercion
console.log(0 == false);    // true — loose equality coerces
console.log(0 === false);   // false — strict equality, no coercion

// Step 7: typeof null is a famous JS bug
console.log(typeof null);       // "object" — known historical bug
console.log(typeof undefined);  // "undefined"

// Step 8: NaN is the only value not equal to itself
console.log(NaN === NaN);        // false
console.log(Number.isNaN(NaN));  // true — always use this to check
```

**Key takeaways:**
- Use `const` by default, `let` when reassignment is needed, never `var`
- Always use `===` instead of `==`
- Use `Number.isNaN()` to check for `NaN`, not `=== NaN`

---

## 2. Functions and Scope

Functions are first-class objects in JavaScript — they can be stored in variables, passed as arguments, and returned from other functions. This is the foundation of callbacks, event handlers, and frameworks like React.

### Three Ways to Write Functions

```javascript
// Step 1: Function declaration — hoisted, callable before its line in the source
function greet(name) {
  return `Hello, ${name}!`;
}

// Step 2: Function expression — NOT hoisted, assigned to a variable
const greetExpr = function(name) {
  return `Hello, ${name}!`;
};

// Step 3: Arrow function — concise, no own 'this' binding
// Single expression = implicit return (no braces, no return keyword)
const greetArrow = (name) => `Hello, ${name}!`;

// Multiple statements require braces + explicit return
const greetVerbose = (name) => {
  const msg = `Hello, ${name}!`;
  return msg;
};
```

### Default and Rest Parameters

```javascript
// Step 4: Default parameters provide fallback values
function createUser(name, role = "viewer") {
  return { name, role };
}
createUser("Alice");          // { name: "Alice", role: "viewer" }
createUser("Bob", "admin");   // { name: "Bob", role: "admin" }

// Step 5: Rest parameters gather remaining args into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4, 5); // 15
```

### Closures — Your First Mental Model

A closure is a function that remembers the variables from the scope it was created in, even after the outer function has returned. This is not an advanced concept — it is how JavaScript works at its core.

```javascript
// Step 6: createCounter closes over the 'count' variable
function createCounter() {
  let count = 0;         // private state — inaccessible from outside
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount:  () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.getCount()); // 1
// count is truly private — no way to access it directly
```

**Common pitfalls:**
- Using arrow functions as object methods when you need `this` — arrow functions inherit `this` from the enclosing scope
- Forgetting the `return` keyword in a multi-statement arrow function body
- Expecting function expressions to be hoisted (they are not)

---

## 3. Arrays and Objects

Arrays and objects are the workhorses of JavaScript data handling. Mastering array methods eliminates the need for most manual loops.

### Essential Array Methods

| Method | Purpose | Returns | Mutates? |
|--------|---------|---------|----------|
| `.map(fn)` | Transform each element | New array | No |
| `.filter(fn)` | Keep matching elements | New array | No |
| `.reduce(fn, init)` | Accumulate to single value | Single value | No |
| `.find(fn)` | First element matching | Element or `undefined` | No |
| `.some(fn)` | True if any match | Boolean | No |
| `.every(fn)` | True if all match | Boolean | No |
| `.includes(v)` | True if value exists | Boolean | No |
| `.flat(depth)` | Flatten nested arrays | New array | No |
| `.sort(fn)` | Sort in place | Same array | **YES** |
| `.splice()` | Add/remove in place | Removed elements | **YES** |

```javascript
// Step 1: map — transform each element into a new array
const fruits = ["apple", "banana", "cherry"];
const upper = fruits.map(f => f.toUpperCase());
// ["APPLE", "BANANA", "CHERRY"]

// Step 2: filter — keep elements that pass the test
const longNames = fruits.filter(f => f.length > 5);
// ["banana", "cherry"]

// Step 3: reduce — accumulate to a single value
const totalLen = fruits.reduce((sum, f) => sum + f.length, 0);
// 18

// Step 4: find — first element that matches
const found = fruits.find(f => f.startsWith("b"));
// "banana"

// Step 5: Destructuring and spread — non-mutating patterns
const [first, ...rest] = fruits;
// first = "apple", rest = ["banana", "cherry"]
const moreFruits = [...fruits, "date"];
// ["apple", "banana", "cherry", "date"] — original unchanged
```

### Objects — Destructuring, Spread, and Modern Patterns

```javascript
// Step 6: Object destructuring extracts properties into variables
const user = { name: "Alice", age: 30, address: { city: "Stockholm" } };
const { name, age } = user;

// Step 7: Nested destructuring and renaming
const { address: { city } } = user;        // city = "Stockholm"
const { name: userName } = user;            // userName = "Alice"

// Step 8: Spread creates a shallow copy with updates
const updated = { ...user, age: 31 };      // non-mutating update

// Step 9: Optional chaining — safe nested access
const zip = user?.address?.zip;             // undefined (no error)

// Step 10: Nullish coalescing — default only for null/undefined
const display = user.nickname ?? "Anonymous";

// Step 11: Deep cloning with structuredClone (built-in)
const deepCopy = structuredClone(user);
deepCopy.address.city = "Oslo";
console.log(user.address.city); // "Stockholm" — original untouched
```

**Common pitfalls:**
- `.sort()` without a comparator sorts lexicographically: `[10, 2, 1].sort()` gives `[1, 10, 2]`
- Spread (`...obj`) is a shallow copy — nested objects are still shared references
- `||` for defaults treats `0` and `""` as falsy; use `??` when those are valid values

---

## 4. Control Flow

```javascript
// Step 1: Ternary for simple branches
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";

// Step 2: for...of — iterate VALUES of arrays, strings, Sets, Maps
for (const fruit of ["apple", "banana"]) {
  console.log(fruit);
}

// Step 3: for...of with index using entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit);
}

// Step 4: for...in — iterate KEYS of objects (use with caution)
const person = { name: "Alice", age: 30 };
for (const key in person) {
  if (Object.hasOwn(person, key)) {
    console.log(key, person[key]);
  }
}

// Step 5: Early returns reduce nesting
function processOrder(order) {
  if (!order) return null;
  if (!order.items.length) return { total: 0 };
  return { total: order.items.reduce((sum, item) => sum + item.price, 0) };
}
```

**Key rules:**
- Use `for...of` for arrays and iterables, `for...in` for object keys (with `Object.hasOwn` guard)
- Use `??` instead of `||` when `0`, `""`, or `false` are valid values
- Prefer early returns over deeply nested `if/else` blocks

---

## 5. DOM Manipulation

The Document Object Model is the browser's live representation of the HTML page. JavaScript interacts with it to build dynamic user interfaces.

```javascript
// Step 1: Select elements
const heading = document.getElementById("main-title");
const firstItem = document.querySelector(".list-item");     // first match
const allItems = document.querySelectorAll(".list-item");   // all matches

// Step 2: NodeList is not an Array — convert if needed
const itemsArray = Array.from(allItems);
const texts = itemsArray.map(el => el.textContent);

// Step 3: Modify elements SAFELY with textContent (not innerHTML)
heading.textContent = "New Title";       // SAFE — no HTML parsing
heading.classList.add("active");
heading.classList.toggle("highlighted");

// Step 4: Create and insert elements
const newDiv = document.createElement("div");
newDiv.textContent = "I am new!";
newDiv.className = "card";
document.body.appendChild(newDiv);

// Step 5: Modern insertion methods
const list = document.querySelector("ul");
const newItem = document.createElement("li");
newItem.textContent = "New item";
list.append(newItem);    // at end
list.prepend(newItem);   // at start

// Step 6: Remove elements
const oldItem = document.querySelector(".outdated");
oldItem?.remove();       // modern, clean removal
```

**Security rule:** Always use `textContent` for user-provided text. It treats everything as a literal string, preventing injected markup from executing. Using `innerHTML` with unsanitized user input is one of the top XSS vulnerabilities in production web applications.

**Common pitfalls:**
- `querySelectorAll` returns a static NodeList — it does not update when the DOM changes
- Calling DOM methods before the document is loaded — use `DOMContentLoaded` or place scripts at the bottom of `<body>`

---

## 6. Events and Event Delegation

Events connect user actions (clicks, keystrokes, scrolls) to your code.

```javascript
// Step 1: Add a click listener
const button = document.querySelector("#submit");
button.addEventListener("click", (e) => {
  e.preventDefault();  // stop default browser action
  console.log("Clicked:", e.target);
});

// Step 2: Remove a listener — must keep the same function reference
function handleClick(e) { console.log("Clicked"); }
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Step 3: Event delegation — one listener on the parent handles all children
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked item:", e.target.textContent);
    e.target.classList.toggle("selected");
  }
});

// Step 4: Keyboard events
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.key === "Enter" && e.ctrlKey) submitForm();
});

// Step 5: Input events for live validation
const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", (e) => {
  const valid = e.target.value.includes("@");
  e.target.classList.toggle("error", !valid);
});

// Step 6: Custom events
const orderPlaced = new CustomEvent("orderPlaced", {
  detail: { orderId: 123, total: 49.99 },
  bubbles: true,
});
document.querySelector("#checkout").dispatchEvent(orderPlaced);
```

**Why event delegation matters:** A single listener on a parent element handles events from all children — including elements added to the DOM after the listener was attached. This is more memory-efficient and works with dynamically created elements.

**Common pitfalls:**
- Adding the same listener twice causes it to fire twice
- Inline arrow functions cannot be removed with `removeEventListener` — they create a new reference each time
- Forgetting `e.preventDefault()` inside a form submit handler causes the page to reload

---

## 7. Asynchronous JavaScript

JavaScript is single-threaded but handles I/O asynchronously through its non-blocking event loop. The `async/await` syntax makes asynchronous code look and feel synchronous.

```javascript
// Step 1: Basic fetch with async/await
async function loadUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to load user:", error.message);
    throw error; // re-throw so callers can handle it too
  }
}

// Step 2: Parallel requests with Promise.all
async function loadDashboard() {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return { user, posts };
}
// Takes max(user_time, posts_time), NOT user_time + posts_time

// Step 3: POST request with JSON body
async function createPost(title, body) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
}
```

**Key mental model:** When you `await` a Promise, JavaScript pauses the current function, does other work (handles events, renders the UI), and resumes when the Promise settles. This is how one thread handles thousands of concurrent network requests without blocking the UI.

**Common pitfalls:**
- Forgetting `await` — the variable holds a `Promise` object instead of the resolved value
- Using `await` inside `.forEach()` — `.forEach` does not wait for async callbacks; use `for...of`
- Calling two `await`s sequentially when they could run in parallel with `Promise.all`

---

## 8. ES6+ Features

Modern JavaScript provides powerful ergonomic features that you should use daily.

```javascript
// Step 1: Template literals — multiline strings and embedded expressions
const greeting = `Hello, ${name}! You have ${count} messages.`;

// Step 2: Map — key/value pairs with ANY key type
const roles = new Map();
roles.set("alice", "admin");
roles.set("bob", "viewer");
console.log(roles.get("alice")); // "admin"
console.log(roles.size);         // 2

// Step 3: Set — unique values only
const tags = new Set(["js", "web", "js"]);
// {"js", "web"} — duplicate removed
tags.add("css");
console.log(tags.has("js")); // true

// Step 4: Nullish coalescing and assignment
const value = null ?? "default";   // "default"
let x = null;
x ??= 10;                         // x is now 10

// Step 5: Logical assignment
let a = 0;
a ||= 42;   // a is now 42 (0 is falsy)
let b = 5;
b &&= b * 2; // b is now 10 (5 is truthy)

// Step 6: Object shorthand and computed keys
const propName = "status";
const user2 = {
  name,                           // shorthand: name: name
  [propName]: "active",           // computed key: { status: "active" }
  greet() { return `Hi`; },      // method shorthand
};
```

**When to use Map vs Object:**
- Use `Map` when keys are dynamic, non-string, or you need `.size` and guaranteed insertion order
- Use plain objects for known string keys, JSON serialization, and destructuring

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Variables | `const` by default, `let` when reassigning, never `var` |
| Types | 7 primitives; `typeof null === "object"` is a known bug; always use `===` |
| Functions | Arrow functions for callbacks; closures for private state |
| Arrays | `map`, `filter`, `reduce` over raw loops; `structuredClone` for deep copies |
| DOM | `querySelector` + `addEventListener`; `textContent` not `innerHTML` |
| Events | Event delegation for dynamic content; one listener handles all children |
| Async | `async/await` with `try/catch`; `Promise.all` for parallel work |
| ES6+ | Template literals, Map, Set, optional chaining, nullish coalescing |

---

## Recommended Videos

- **Fireship** — "JavaScript in 100 Seconds" — https://www.youtube.com/watch?v=DHjqpvDnNGE
- **Traversy Media** — "JavaScript Crash Course For Beginners" — https://www.youtube.com/watch?v=hdI2bqOjy3c
- **freeCodeCamp** — "JavaScript Programming – Full Course" — https://www.youtube.com/watch?v=jS4aFq5-91M

---

## Next Steps

After completing this level, proceed to [JavaScript Mid](../JavaScript/Mid.md).
