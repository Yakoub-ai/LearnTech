# JavaScript — Senior Concept Reference

> Full interactive version available on the [Tech Hub Learning Platform](/language/javascript/senior)

## Prerequisites

- Completion of the JavaScript Mid guide or equivalent knowledge
- Strong understanding of closures, prototypes, and async patterns
- Experience building and testing JavaScript applications

## Estimated Time

60 hours

---

## 1. The Event Loop — A Deep Model

JavaScript is single-threaded: one call stack, one thing at a time. The event loop is the mechanism that makes this single thread appear concurrent. Philip Roberts described it at JSConf EU: "The event loop's job is to look at the stack and look at the task queue. If the stack is empty it takes the first thing on the queue and pushes it on to the stack."

The browser (or Node.js) provides APIs that operate outside the JavaScript runtime. `setTimeout`, `fetch`, `addEventListener` — these run in the browser's C++ layer. When they complete, they push callbacks onto a queue. The event loop moves those callbacks onto the call stack only when the stack is empty.

**Code walkthrough:**

```javascript
// Step 1: Execution order — understand this and you understand the event loop
console.log("1 — Sync");
setTimeout(() => console.log("2 — Macrotask"), 0);
Promise.resolve().then(() => console.log("3 — Microtask"));
queueMicrotask(() => console.log("4 — queueMicrotask"));
console.log("5 — Sync");

// Output: 1, 5, 3, 4, 2
// All sync first → ALL microtasks → ONE macrotask
```

### The Three Queues

1. **Macrotask queue:** `setTimeout`, `setInterval`, I/O callbacks, UI click events. The event loop processes one task at a time, then re-checks microtasks and rendering.

2. **Microtask queue:** Promise `.then()` callbacks, `queueMicrotask()`, `MutationObserver`. Microtasks drain to completion including newly-added ones before any macrotask or render step. A microtask loop that keeps enqueuing new microtasks blocks rendering permanently.

3. **Animation callbacks (`requestAnimationFrame`):** Run during the render steps, before style calculation and paint. Fire at display frequency (~60 Hz) and are skipped for hidden tabs.

### Chunked Processing — Yielding to the Event Loop

```javascript
// Step 2: Anti-pattern — blocking the main thread
function processBlocking(data) {
  return data.map(item => heavyComputation(item)); // blocks for seconds
}

// Step 3: Yielding between chunks allows rendering and user interaction
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
        setTimeout(chunk, 0); // yield to the event loop
      } else {
        resolve(results);
      }
    }
    chunk();
  });
}

// Step 4: Modern Scheduler API — more precise than setTimeout
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
```

**Key takeaway:** Jank (frame drops, unresponsive UI) always has the same root cause: something is blocking the main thread too long. Knowing which queue your code ends up in tells you how it interacts with rendering.

---

## 2. Memory Management

JavaScript has automatic garbage collection, but memory leaks in long-running SPAs are a real production problem.

```javascript
// Step 1: Memory leak — event listener keeps the component alive
class LeakyComponent {
  constructor() {
    this.data = new Array(10_000).fill("large payload");
    this.handler = () => this.handleResize();
    window.addEventListener("resize", this.handler);
    // window holds a reference → cannot be GC'd
  }
  handleResize() { /* uses this.data */ }
}

// Step 2: Fixed — always clean up listeners
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

// Step 3: WeakMap — cache that doesn't prevent garbage collection
const cache = new WeakMap();
function getCachedResult(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, computeExpensive(obj));
  }
  return cache.get(obj);
}
// When obj is GC'd, the WeakMap entry disappears automatically

// Step 4: WeakRef — hold a reference without preventing GC
class ImageCache {
  #cache = new Map();

  get(url) {
    const ref = this.#cache.get(url);
    if (ref) {
      const img = ref.deref(); // returns undefined if GC'd
      if (img) return img;
    }
    return null;
  }

  set(url, imageData) {
    this.#cache.set(url, new WeakRef(imageData));
  }
}

// Step 5: FinalizationRegistry — callback when object is GC'd
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Object associated with "${heldValue}" was garbage collected`);
});
// registry.register(targetObject, "description");
```

### Common Memory Leak Patterns

| Pattern | Cause | Fix |
|---------|-------|-----|
| Window listeners | `window`/`document` holds reference to component | `removeEventListener` in cleanup/destroy |
| Closures in timers | `setInterval` callback references large objects | Clear interval; null references |
| Unbounded caches | Growing `Map`/`Array` with no eviction | Use `WeakMap` or LRU cache |
| Detached DOM nodes | JS variable holds reference after `remove()` | Set reference to `null` |
| Forgotten subscriptions | RxJS, EventEmitter, WebSocket listeners | Unsubscribe in cleanup |

**Diagnosing leaks:** Chrome DevTools → Memory tab → Heap Snapshots. Take a snapshot, trigger the suspected leak, take another. Filter by "Objects allocated between Snapshot 1 and 2."

---

## 3. Performance Optimization

```javascript
// Step 1: Debounce — delay until activity stops
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
const handleSearch = debounce((query) => {
  fetch(`/api/search?q=${query}`).then(renderResults);
}, 300);

// Step 2: Throttle — execute at most once per interval
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
const handleScroll = throttle(() => updatePosition(), 16);

// Step 3: Memoize — cache results of pure functions
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

// Step 4: V8 hidden classes — consistent object shapes
// BAD: different property order creates different hidden classes
function makeUserBad(isAdmin) {
  const user = {};
  if (isAdmin) user.adminId = 1;
  user.name = "Alice";
  return user;
}

// GOOD: consistent shape — V8 can optimize once and reuse
function makeUserGood(name, adminId = null) {
  return { name, adminId }; // always same shape
}

// Step 5: IntersectionObserver — efficient lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("img[data-src]").forEach(img => observer.observe(img));
```

### Debounce vs Throttle Decision Guide

| Scenario | Pattern | Why |
|----------|---------|-----|
| Search-as-you-type | Debounce (300ms) | Fire once after user pauses typing |
| Scroll position tracking | Throttle (16ms / ~60fps) | Fire at steady rate during scroll |
| Window resize handler | Debounce (200ms) | Recalculate layout once after resize ends |
| Button click prevention | Throttle (1000ms) | Prevent double-submit |
| Auto-save in editor | Debounce (2000ms) | Save after user stops editing |

---

## 4. Design Patterns

```javascript
// Step 1: Observer / EventEmitter — decoupled pub/sub
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

// Step 2: Strategy Pattern — swap algorithms at runtime
const sortStrategies = {
  alpha:    (a, b) => a.name.localeCompare(b.name),
  date:     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  priority: (a, b) => b.priority - a.priority,
};

function sortItems(items, strategy = "date") {
  if (!sortStrategies[strategy]) throw new Error(`Unknown: ${strategy}`);
  return [...items].sort(sortStrategies[strategy]);
}

// Step 3: Command Pattern — undo/redo
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

// Step 4: Proxy — intercept and validate property assignments
function createValidatedModel(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const validator = schema[prop];
      if (validator && !validator(value)) {
        throw new TypeError(`Invalid value for ${prop}: ${JSON.stringify(value)}`);
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
userModel.age = 25;     // OK
// userModel.age = -1;  // TypeError
```

---

## 5. Security Best Practices

Security is a discipline woven into daily coding decisions, not a feature added later.

### XSS Prevention

Always use `textContent` for user-provided text — it treats the value as a plain string, never as markup. When rich HTML is required, sanitize with DOMPurify before inserting. Never use `innerHTML` with unsanitized user input.

### Prototype Pollution

```javascript
// Step 1: SAFE — guard against prototype pollution
function safeMerge(target, source) {
  const dangerous = new Set(["__proto__", "constructor", "prototype"]);
  for (const key of Object.keys(source)) {
    if (!dangerous.has(key)) target[key] = source[key];
  }
}

// Step 2: SAFEST — null-prototype objects have no chain to pollute
const safeStore = Object.create(null);
safeStore.user = "alice";
```

### CSRF Prevention

```javascript
// Step 3: Include CSRF token for state-changing requests
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
```

### Security Checklist

| Threat | Prevention |
|--------|-----------|
| XSS | `textContent` for text; DOMPurify for HTML; strict CSP headers |
| Prototype pollution | `Object.keys()` not `for...in`; denylist `__proto__`; `Object.create(null)` |
| CSRF | CSRF tokens in custom headers; `SameSite` cookies |
| Supply chain | Lock dependencies; audit with `npm audit`; Subresource Integrity for CDN scripts |
| ReDoS | Avoid catastrophic backtracking in regex; use re2 for user-supplied patterns |
| Sensitive data exposure | Never store secrets in client-side JS; use `HttpOnly` and `Secure` cookie flags |

**Content Security Policy (CSP)** is your second line of defense: configure at the HTTP header level to restrict which scripts the browser accepts. A strict CSP blocks injected scripts even if an XSS vulnerability exists.

---

## 6. Web Workers

Web Workers run JavaScript in a background thread, completely isolated from the main thread. They cannot access the DOM but can perform CPU-intensive computation without blocking the UI.

```javascript
// Step 1: Spawn a worker and communicate via messages
// main.js
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

// Step 2: worker.js — runs in isolated thread
self.onmessage = (event) => {
  const { type, payload } = event.data;
  if (type === "compress") {
    const result = compressImage(payload);
    self.postMessage({ type: "compress:done", result });
  }
};

// Step 3: Transferable objects — zero-copy transfer of ArrayBuffers
const buffer = new ArrayBuffer(1024 * 1024); // 1 MB
worker.postMessage({ type: "process", buffer }, [buffer]);
// buffer is now detached in main thread — ownership transferred

// Step 4: Worker Pool — reuse workers for repeated tasks
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
```

**Best candidates for Web Workers:** Image processing, video encoding, cryptography, large JSON parsing, data transformation, ML inference. Companies like Figma run their entire rendering engine in a Web Worker.

---

## 7. ES2024/ES2025 Advanced Features

### Set Methods (ES2025)

```javascript
const frontend = new Set(["Alice", "Bob", "Charlie"]);
const backend = new Set(["Bob", "Diana", "Charlie"]);

frontend.intersection(backend);        // Set {"Bob", "Charlie"}
frontend.union(backend);               // Set {"Alice", "Bob", "Charlie", "Diana"}
frontend.difference(backend);          // Set {"Alice"}
frontend.symmetricDifference(backend); // Set {"Alice", "Diana"}
frontend.isSubsetOf(backend);          // false
frontend.isDisjointFrom(new Set(["Eve"])); // true
```

### Iterator Helpers (ES2025)

```javascript
// Lazy iterator methods — no intermediate arrays
function* fibonacci() {
  let a = 0, b = 1;
  while (true) { yield a; [a, b] = [b, a + b]; }
}

const result = fibonacci()
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(5)
  .toArray();
// [0, 20, 80, 340, 1440] — no infinite array was ever created
```

### Explicit Resource Management — `using` Declarations (ES2025)

```javascript
// 'using' ensures cleanup runs when the scope exits (like RAII in C++)
class DatabaseConnection {
  constructor(url) { this.url = url; }
  query(sql) { /* ... */ }
  [Symbol.dispose]() { console.log(`Disconnected from ${this.url}`); }
}

function runQuery() {
  using conn = new DatabaseConnection("postgres://localhost/mydb");
  conn.query("SELECT * FROM users");
  // conn[Symbol.dispose]() called automatically when scope exits
  // Even if an exception is thrown
}

// Async version with 'await using'
async function processFile() {
  await using file = await openFile("data.csv");
  // file is automatically closed when scope exits
}
```

### Decorators (ES2025)

```javascript
function logged(originalMethod, context) {
  return function(...args) {
    console.log(`Calling ${context.name} with`, args);
    const result = originalMethod.call(this, ...args);
    console.log(`${context.name} returned`, result);
    return result;
  };
}

class Calculator {
  @logged
  add(a, b) { return a + b; }
}
```

### Temporal API (Stage 3)

```javascript
// Temporal replaces the broken Date object with immutable, timezone-aware types
const date = Temporal.PlainDate.from("2026-03-21");
const nextWeek = date.add({ days: 7 }); // 2026-03-28 — immutable

const meeting = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2026, month: 3, day: 21, hour: 14,
});
const inTokyo = meeting.withTimeZone("Asia/Tokyo");
// Correctly handles DST, leap seconds, and calendar differences
```

---

## 8. Metaprogramming with Proxy and Reflect

Beyond validation, `Proxy` enables reactive data systems, virtual properties, and access control patterns that are impossible with any other mechanism.

```javascript
// Step 1: Reactive data — notify on changes (Vue 3's reactivity core)
function reactive(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const oldValue = obj[prop];
      const result = Reflect.set(obj, prop, value);
      if (oldValue !== value) {
        onChange(prop, value, oldValue);
      }
      return result;
    },
    deleteProperty(obj, prop) {
      const result = Reflect.deleteProperty(obj, prop);
      onChange(prop, undefined, obj[prop]);
      return result;
    },
  });
}

const state = reactive({ count: 0 }, (prop, newVal) => {
  console.log(`${prop} changed to ${newVal}`);
  renderUI();
});
state.count++; // logs: "count changed to 1"

// Step 2: Negative array indexing (Python-style)
function negativeArray(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      const index = Number(prop);
      if (Number.isInteger(index) && index < 0) {
        return target[target.length + index];
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

const a = negativeArray([10, 20, 30]);
a[-1]; // 30
a[-2]; // 20
```

---

## 9. Node.js Internals and Runtime Diversity

Senior engineers must understand the runtime their code executes in.

### Node.js Event Loop Phases

| Phase | Callbacks Processed |
|-------|-------------------|
| Timers | `setTimeout`, `setInterval` |
| Pending I/O | Deferred I/O callbacks from previous cycle |
| Idle / Prepare | Internal use |
| Poll | I/O events (file reads, network) |
| Check | `setImmediate` callbacks |
| Close | `socket.on('close')` callbacks |

Between each phase, `process.nextTick()` and Promise microtasks drain completely.

### Runtime Diversity (2025-2026)

| Feature | Node.js 22+ | Deno 2 | Bun 1.1+ |
|---------|------------|--------|----------|
| Package manager | npm/pnpm | JSR + npm compat | bun install |
| TypeScript | Via flag (`--experimental-strip-types`) | Native | Native |
| Built-in test runner | `node:test` | `Deno.test` | `bun test` |
| Permissions | None (full access) | Explicit (`--allow-read`) | None |
| Web API compat | Growing (`fetch`, `crypto`) | Full | Full |

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Event Loop | Microtasks drain completely before each macrotask and render; never block the main thread |
| Memory | Remove listeners on cleanup; use WeakMap/WeakRef for GC-friendly caching; profile with DevTools |
| Performance | Debounce user input; throttle scroll; memoize pure functions; consistent object shapes for V8 |
| Design Patterns | Observer for decoupled events; Strategy to replace if/else; Proxy for validation and reactivity |
| Security | `textContent` for user text; guard prototype pollution; CSRF tokens; strict CSP |
| Web Workers | Offload CPU work to background threads; use transferables for large binary data |
| ES2024/2025 | Set methods, Iterator helpers, `using` for resource management, decorators, Temporal API |
| Metaprogramming | Proxy/Reflect for reactive systems, validation, and virtual properties |
| Runtimes | Node.js, Deno, Bun — understand the differences and choose appropriately |

---

## Recommended Videos

- **JSConf EU** — "What the heck is the event loop anyway?" (Philip Roberts) — https://www.youtube.com/watch?v=8aGhZQkoFbQ
- **JSConf Asia** — "In the Loop" (Jake Archibald) — https://www.youtube.com/watch?v=cCOL7MC4Pl0
- **JSUnconf** — "Learning Functional Programming with JavaScript" (Anjana Vakil) — https://www.youtube.com/watch?v=e-5obm1G_FY

---

This is the final level of the JavaScript path. Consider exploring [TypeScript Beginner](../TypeScript/Beginner.md) or role-specific learning tracks on the platform.
