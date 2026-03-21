// Language-specific code sandbox examples
// Keyed by language ID, each containing array of examples
export const languageCodeSandboxExamples = {
  'python': [
    {
      id: 'py-1',
      title: 'Data Types & Variables Explorer',
      language: 'python',
      level: 'beginner',
      code: `# WHAT YOU'LL LEARN:
# - Python's core data types
# - Type checking and conversion
# - String formatting

# Integers and floats
age = 25
price = 19.99
print(f"age: {age} (type: {type(age).__name__})")
print(f"price: {price} (type: {type(price).__name__})")

# Strings
name = "Alice"
greeting = f"Hello, {name}! You are {age} years old."
print(greeting)
print(f"Name length: {len(name)}, uppercase: {name.upper()}")

# Booleans
is_adult = age >= 18
print(f"Is adult: {is_adult}")

# Lists (mutable, ordered)
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
print(f"Fruits: {fruits}, count: {len(fruits)}")

# Dictionaries (key-value pairs)
person = {"name": name, "age": age, "hobbies": ["reading", "coding"]}
print(f"Person: {person}")
print(f"Hobbies: {person['hobbies']}")

# Tuples (immutable, ordered)
coordinates = (10.5, 20.3)
print(f"Coordinates: {coordinates}")

# Sets (unique values)
unique_nums = {1, 2, 3, 2, 1}
print(f"Unique numbers: {unique_nums}")

# Type conversion
num_str = "42"
num_int = int(num_str)
print(f"Converted: '{num_str}' -> {num_int} (type: {type(num_int).__name__})")

# None type
result = None
print(f"Result is None: {result is None}")

# EXERCISE:
# Create a dictionary representing a book with title, author, pages, and is_available fields
# Print each field with its type`,
      description: 'Explore Python core data types including strings, numbers, lists, dicts, and type conversion.'
    },
    {
      id: 'py-2',
      title: 'List Comprehension Patterns',
      language: 'python',
      level: 'beginner',
      code: `# WHAT YOU'LL LEARN:
# - List comprehensions vs loops
# - Filtering with conditions
# - Nested comprehensions

# Basic comprehension: squares of 1-10
squares = [x**2 for x in range(1, 11)]
print(f"Squares: {squares}")

# With condition: even numbers only
evens = [x for x in range(20) if x % 2 == 0]
print(f"Evens: {evens}")

# Transform strings
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
print(f"Capitalized: {capitalized}")

# Filter and transform
words = ["hello", "world", "hi", "python", "go"]
long_upper = [w.upper() for w in words if len(w) > 3]
print(f"Long words uppercased: {long_upper}")

# Dict comprehension
word_lengths = {w: len(w) for w in words}
print(f"Word lengths: {word_lengths}")

# Set comprehension
first_letters = {w[0] for w in words}
print(f"First letters: {first_letters}")

# Nested: flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(f"Flattened: {flat}")

# Conditional expression (ternary)
labels = ["even" if x % 2 == 0 else "odd" for x in range(6)]
print(f"Labels: {labels}")

# EXERCISE:
# Given a list of temperatures in Celsius, create a comprehension that
# converts to Fahrenheit and filters out any below freezing (32F)
# celsius = [0, 10, -5, 25, 30, -10, 15]`,
      description: 'Master list, dict, and set comprehensions with filtering and transformation patterns.'
    },
    {
      id: 'py-3',
      title: 'Decorator Factory Pattern',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Function decorators
# - Decorator factories (parameterized decorators)
# - functools.wraps for metadata preservation

import functools
import time

# Simple decorator: timing
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "done"

slow_function()

# Decorator factory: retry with configurable attempts
def retry(max_attempts=3, delay=0.1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.01)
def unreliable_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Server unavailable")
    return {"status": "success"}

try:
    result = unreliable_api_call()
    print(f"API result: {result}")
except ConnectionError:
    print("All retries exhausted")

# Decorator that validates arguments
def validate_types(**type_hints):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for param, expected_type in type_hints.items():
                if param in kwargs and not isinstance(kwargs[param], expected_type):
                    raise TypeError(f"{param} must be {expected_type.__name__}")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@validate_types(name=str, age=int)
def create_user(name, age):
    return {"name": name, "age": age}

print(create_user(name="Alice", age=30))

# EXERCISE:
# Create a decorator factory called 'cache_result(max_size=100)'
# that memoizes function results up to max_size entries`,
      description: 'Build parameterized decorators with retry logic, validation, and metadata preservation.'
    },
    {
      id: 'py-4',
      title: 'Context Manager for Resources',
      language: 'python',
      level: 'mid',
      code: `# WHAT YOU'LL LEARN:
# - Writing context managers with __enter__/__exit__
# - contextlib.contextmanager decorator
# - Practical resource management patterns

from contextlib import contextmanager
import time
import json
import os

# Class-based context manager
class Timer:
    def __init__(self, label="Operation"):
        self.label = label
        self.elapsed = 0

    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"{self.label}: {self.elapsed:.4f}s")
        return False  # Don't suppress exceptions

with Timer("Sleep test") as t:
    time.sleep(0.05)
print(f"Captured elapsed: {t.elapsed:.4f}s")

# Generator-based context manager
@contextmanager
def temp_config(overrides):
    """Temporarily override config, restore on exit."""
    original = {"debug": False, "log_level": "INFO"}
    config = {**original, **overrides}
    print(f"Config overridden: {config}")
    try:
        yield config
    finally:
        print(f"Config restored: {original}")

with temp_config({"debug": True, "log_level": "DEBUG"}) as cfg:
    print(f"Using config: {cfg}")

# Practical: JSON file handler with auto-save
@contextmanager
def json_file(path, default=None):
    """Load JSON on enter, save on exit."""
    if os.path.exists(path):
        with open(path, 'r') as f:
            data = json.load(f)
    else:
        data = default if default is not None else {}
    try:
        yield data
    finally:
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Saved to {path}")

# EXERCISE:
# Create a context manager called 'database_transaction'
# that prints "BEGIN", yields, then prints "COMMIT"
# If an exception occurs, print "ROLLBACK" instead`,
      description: 'Build context managers for resource management using both class-based and generator approaches.'
    },
    {
      id: 'py-5',
      title: 'Async Producer-Consumer Pattern',
      language: 'python',
      level: 'senior',
      code: `# WHAT YOU'LL LEARN:
# - asyncio basics: async/await, tasks
# - asyncio.Queue for producer-consumer
# - Structured concurrency with TaskGroup

import asyncio
import random

# Async producer: generates work items
async def producer(queue, producer_id, num_items):
    for i in range(num_items):
        item = f"item-{producer_id}-{i}"
        await asyncio.sleep(random.uniform(0.01, 0.05))
        await queue.put(item)
        print(f"  Producer {producer_id}: produced {item}")
    print(f"  Producer {producer_id}: done")

# Async consumer: processes work items
async def consumer(queue, consumer_id):
    processed = 0
    while True:
        try:
            item = await asyncio.wait_for(queue.get(), timeout=0.2)
            await asyncio.sleep(random.uniform(0.01, 0.03))
            print(f"  Consumer {consumer_id}: processed {item}")
            queue.task_done()
            processed += 1
        except asyncio.TimeoutError:
            break
    print(f"  Consumer {consumer_id}: processed {processed} items total")
    return processed

# Orchestrator
async def main():
    queue = asyncio.Queue(maxsize=5)

    # Start producers and consumers concurrently
    producers = [
        asyncio.create_task(producer(queue, i, 3))
        for i in range(2)
    ]
    consumers = [
        asyncio.create_task(consumer(queue, i))
        for i in range(3)
    ]

    # Wait for all producers to finish
    await asyncio.gather(*producers)

    # Wait for queue to drain
    await queue.join()

    # Gather consumer results
    results = await asyncio.gather(*consumers)
    total = sum(results)
    print(f"\\nTotal items processed: {total}")

asyncio.run(main())

# EXERCISE:
# Add a "priority" field to items and use asyncio.PriorityQueue
# so high-priority items are processed first`,
      description: 'Implement async producer-consumer with asyncio Queue and structured concurrency.'
    }
  ],
  'javascript': [
    {
      id: 'js-1',
      title: 'Array Methods Cheatsheet',
      language: 'javascript',
      level: 'beginner',
      code: `// WHAT YOU'LL LEARN:
// - Core array methods: map, filter, reduce, find
// - Method chaining
// - When to use each method

const users = [
  { name: 'Alice', age: 28, role: 'engineer' },
  { name: 'Bob', age: 35, role: 'designer' },
  { name: 'Charlie', age: 22, role: 'engineer' },
  { name: 'Diana', age: 31, role: 'manager' },
  { name: 'Eve', age: 26, role: 'engineer' },
];

// map: transform each element
const names = users.map(user => user.name);
console.log('Names:', names);

// filter: keep elements matching condition
const engineers = users.filter(user => user.role === 'engineer');
console.log('Engineers:', engineers.map(u => u.name));

// find: get first match
const bob = users.find(user => user.name === 'Bob');
console.log('Found:', bob);

// some / every: boolean checks
const hasMinor = users.some(user => user.age < 18);
const allAdults = users.every(user => user.age >= 18);
console.log('Has minor:', hasMinor, '| All adults:', allAdults);

// reduce: accumulate to single value
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log('Average age:', (totalAge / users.length).toFixed(1));

// reduce: group by role
const byRole = users.reduce((groups, user) => {
  groups[user.role] = groups[user.role] || [];
  groups[user.role].push(user.name);
  return groups;
}, {});
console.log('By role:', byRole);

// Method chaining: engineers over 25, sorted by age
const seniorEngineers = users
  .filter(u => u.role === 'engineer' && u.age > 25)
  .sort((a, b) => b.age - a.age)
  .map(u => \\\`\\\${u.name} (age \\\${u.age})\\\`);
console.log('Senior engineers:', seniorEngineers);

// EXERCISE:
// Add a 'salary' field to each user and use reduce to find
// the highest-paid engineer`,
      description: 'Master JavaScript array methods with practical data transformation examples.'
    },
    {
      id: 'js-2',
      title: 'DOM Manipulation Toolkit',
      language: 'javascript',
      level: 'beginner',
      code: `// WHAT YOU'LL LEARN:
// - querySelector and querySelectorAll
// - Creating and modifying elements
// - Event handling patterns

// Select elements
const heading = document.querySelector('h1');
const allLinks = document.querySelectorAll('a');
const mainContent = document.getElementById('main');

// Create elements dynamically
function createCard(title, description) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '<h3>' + title + '</h3><p>' + description + '</p>';

  // Add a close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.addEventListener('click', () => card.remove());
  card.prepend(closeBtn);

  return card;
}

// Modify existing elements
function toggleClass(selector, className) {
  const el = document.querySelector(selector);
  if (el) el.classList.toggle(className);
}

// Event delegation (efficient for dynamic lists)
function setupList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener('click', (event) => {
    const item = event.target.closest('.list-item');
    if (!item) return;

    if (event.target.matches('.delete-btn')) {
      item.remove();
    } else {
      item.classList.toggle('selected');
    }
  });
}

// Debounced input handler
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((value) => {
  console.log('Searching for:', value);
});

// Usage: inputEl.addEventListener('input', (e) => handleSearch(e.target.value));

console.log('DOM toolkit loaded');

// EXERCISE:
// Create a function that builds a todo list with add/remove/toggle functionality`,
      description: 'Build reusable DOM manipulation functions with event delegation and debouncing.'
    },
    {
      id: 'js-3',
      title: 'Promise Chain vs Async/Await',
      language: 'javascript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Promise chains vs async/await
// - Error handling in both styles
// - Parallel execution with Promise.all

// Simulated API calls
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id });
      else reject(new Error('Invalid user ID'));
    }, 100);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post', userId },
        { id: 2, title: 'Second Post', userId },
      ]);
    }, 100);
  });
}

// Promise chain style
function getUserWithPostsChain(userId) {
  return fetchUser(userId)
    .then(user => {
      console.log('Chain - User:', user.name);
      return fetchPosts(user.id);
    })
    .then(posts => {
      console.log('Chain - Posts:', posts.length);
      return posts;
    })
    .catch(err => {
      console.error('Chain error:', err.message);
      return [];
    });
}

// Async/await style (cleaner!)
async function getUserWithPostsAsync(userId) {
  try {
    const user = await fetchUser(userId);
    console.log('Async - User:', user.name);
    const posts = await fetchPosts(user.id);
    console.log('Async - Posts:', posts.length);
    return posts;
  } catch (err) {
    console.error('Async error:', err.message);
    return [];
  }
}

// Parallel execution
async function getMultipleUsers(ids) {
  const promises = ids.map(id => fetchUser(id));
  const users = await Promise.all(promises);
  console.log('All users:', users.map(u => u.name));
  return users;
}

// Promise.allSettled for graceful handling
async function getMultipleUsersSafe(ids) {
  const results = await Promise.allSettled(ids.map(id => fetchUser(id)));
  const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected').map(r => r.reason.message);
  console.log('Succeeded:', succeeded.length, '| Failed:', failed.length);
  return { succeeded, failed };
}

// Run examples
(async () => {
  await getUserWithPostsChain(1);
  await getUserWithPostsAsync(2);
  await getMultipleUsers([1, 2, 3]);
  await getMultipleUsersSafe([1, -1, 3]);
})();

// EXERCISE:
// Create a fetchWithRetry(url, maxRetries) function that retries failed fetches`,
      description: 'Compare Promise chains with async/await and learn parallel execution patterns.'
    },
    {
      id: 'js-4',
      title: 'Event Delegation Pattern',
      language: 'javascript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Event delegation for dynamic content
// - Custom event system (pub/sub)
// - AbortController for cleanup

// Event delegation: single listener handles all child events
class DelegatedList {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.items = [];
    this._setupDelegation();
  }

  _setupDelegation() {
    if (!this.container) return;
    this.container.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const itemEl = e.target.closest('[data-id]');
      if (!action || !itemEl) return;

      const id = itemEl.dataset.id;
      if (action === 'delete') this.removeItem(id);
      if (action === 'toggle') this.toggleItem(id);
    });
  }

  addItem(text) {
    const id = Date.now().toString();
    this.items.push({ id, text, done: false });
    this._render();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this._render();
  }

  toggleItem(id) {
    const item = this.items.find(item => item.id === id);
    if (item) item.done = !item.done;
    this._render();
  }

  _render() {
    if (!this.container) return;
    this.container.innerHTML = this.items.map(item =>
      '<div data-id="' + item.id + '" class="' + (item.done ? 'done' : '') + '">' +
        '<span data-action="toggle">' + item.text + '</span>' +
        '<button data-action="delete">x</button>' +
      '</div>'
    ).join('');
  }
}

// Custom event emitter (pub/sub pattern)
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback); // Return unsubscribe fn
  }

  off(event, callback) {
    this.listeners.get(event)?.delete(callback);
  }

  emit(event, data) {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }
}

// Usage
const bus = new EventEmitter();
const unsub = bus.on('user:login', (user) => {
  console.log('User logged in:', user.name);
});
bus.emit('user:login', { name: 'Alice' });
unsub(); // Clean up

console.log('Event patterns loaded');

// EXERCISE:
// Add an 'once' method to EventEmitter that auto-unsubscribes after first call`,
      description: 'Implement event delegation for dynamic lists and a custom pub/sub event system.'
    },
    {
      id: 'js-5',
      title: 'Custom Observable Implementation',
      language: 'javascript',
      level: 'senior',
      code: `// WHAT YOU'LL LEARN:
// - Observable pattern (RxJS-style)
// - Operators: map, filter, debounce
// - Subscription lifecycle and cleanup

class Observable {
  constructor(subscribeFn) {
    this._subscribe = subscribeFn;
  }

  subscribe(observer) {
    const safeObserver = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safeObserver);
    return {
      unsubscribe: () => { if (cleanup) cleanup(); }
    };
  }

  // Operator: transform values
  map(transformFn) {
    return new Observable((observer) => {
      const sub = this.subscribe({
        next: (value) => observer.next(transformFn(value)),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
      return () => sub.unsubscribe();
    });
  }

  // Operator: filter values
  filter(predicateFn) {
    return new Observable((observer) => {
      const sub = this.subscribe({
        next: (value) => { if (predicateFn(value)) observer.next(value); },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
      return () => sub.unsubscribe();
    });
  }

  // Operator: take first N values
  take(count) {
    return new Observable((observer) => {
      let taken = 0;
      const sub = this.subscribe({
        next: (value) => {
          if (taken < count) {
            observer.next(value);
            taken++;
            if (taken === count) {
              observer.complete();
              sub.unsubscribe();
            }
          }
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
      return () => sub.unsubscribe();
    });
  }

  // Static: create from array
  static from(array) {
    return new Observable((observer) => {
      array.forEach(item => observer.next(item));
      observer.complete();
    });
  }

  // Static: create from interval
  static interval(ms) {
    return new Observable((observer) => {
      let count = 0;
      const id = setInterval(() => observer.next(count++), ms);
      return () => clearInterval(id);
    });
  }
}

// Usage example
const numbers = Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const sub = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(3)
  .subscribe({
    next: (val) => console.log('Value:', val),
    complete: () => console.log('Done!'),
  });

console.log('Observable pattern loaded');

// EXERCISE:
// Add a 'debounceTime(ms)' operator that only emits after silence`,
      description: 'Build an Observable implementation with chainable operators and subscription management.'
    }
  ],
  'html-css': [
    {
      id: 'hc-1',
      title: 'Semantic HTML Page Structure',
      language: 'html',
      level: 'beginner',
      code: `<!-- WHAT YOU'LL LEARN:
  - Semantic HTML5 elements
  - Proper document structure
  - Accessibility best practices -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML Example</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Understanding Semantic HTML</h1>
      <p>Published <time datetime="2025-01-15">January 15, 2025</time></p>

      <section>
        <h2>Why Semantics Matter</h2>
        <p>Semantic elements convey meaning to browsers and assistive technologies.</p>
        <figure>
          <img src="diagram.png" alt="Diagram showing HTML element hierarchy">
          <figcaption>HTML5 semantic element hierarchy</figcaption>
        </figure>
      </section>

      <section>
        <h2>Common Elements</h2>
        <dl>
          <dt>header</dt>
          <dd>Introductory content or navigation</dd>
          <dt>main</dt>
          <dd>Primary content of the document</dd>
          <dt>article</dt>
          <dd>Self-contained, independently distributable content</dd>
        </dl>
      </section>
    </article>

    <aside>
      <h2>Related Topics</h2>
      <ul>
        <li><a href="#accessibility">Accessibility Guide</a></li>
        <li><a href="#seo">SEO Best Practices</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 Tech Hubben Learning</p>
  </footer>
</body>
</html>

<!-- EXERCISE:
  Add a <details> element with a <summary> for an FAQ section.
  Add a <dialog> element for a modal popup. -->`,
      description: 'Build a properly structured semantic HTML page with accessibility attributes.'
    },
    {
      id: 'hc-2',
      title: 'Flexbox Layout Patterns',
      language: 'css',
      level: 'beginner',
      code: `/* WHAT YOU'LL LEARN:
  - Flex container properties
  - Alignment and distribution
  - Common layout patterns */

/* 1. Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a2e;
  color: white;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

/* 2. Card grid with equal heights */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* grow, shrink, min-width */
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
}

.card-body {
  flex: 1; /* Push footer to bottom */
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

/* 3. Centered content (the holy grail) */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 4. Sidebar layout */
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px; /* Fixed width, no grow/shrink */
  background: #f5f5f5;
}

.main-content {
  flex: 1; /* Takes remaining space */
  padding: 2rem;
}

/* 5. Input group */
.input-group {
  display: flex;
}

.input-group input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
}

.input-group button {
  flex-shrink: 0;
  padding: 0.5rem 1.5rem;
}

/* EXERCISE:
  Create a footer with three columns that stack
  vertically on screens under 600px */`,
      description: 'Learn essential Flexbox patterns for navigation, cards, layouts, and input groups.'
    },
    {
      id: 'hc-3',
      title: 'CSS Grid Dashboard Layout',
      language: 'css',
      level: 'mid',
      code: `/* WHAT YOU'LL LEARN:
  - CSS Grid template areas
  - Responsive grid with auto-fit
  - Named grid lines and placement */

/* Dashboard layout with named areas */
.dashboard {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "sidebar widgets widgets"
    "footer  footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto auto;
  min-height: 100vh;
  gap: 1rem;
  padding: 1rem;
}

.dash-header   { grid-area: header; }
.dash-sidebar  { grid-area: sidebar; }
.dash-main     { grid-area: main; }
.dash-widgets  { grid-area: widgets; }
.dash-footer   { grid-area: footer; }

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main"
      "widgets"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}

/* Auto-fit cards grid */
.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.widget {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Span specific widgets across multiple columns */
.widget--wide {
  grid-column: span 2;
}

.widget--tall {
  grid-row: span 2;
}

/* Dense packing for masonry-like layout */
.widget-grid--dense {
  grid-auto-flow: dense;
}

/* EXERCISE:
  Create a photo gallery grid where the first photo
  spans 2 columns and 2 rows, and remaining photos
  auto-fit into the remaining space */`,
      description: 'Build a responsive dashboard with CSS Grid template areas and auto-fit patterns.'
    },
    {
      id: 'hc-4',
      title: 'Dark Mode Toggle with CSS Variables',
      language: 'css',
      level: 'mid',
      code: `/* WHAT YOU'LL LEARN:
  - CSS custom properties for theming
  - Light/dark mode switching
  - System preference detection */

/* Define theme tokens */
:root {
  /* Light theme (default) */
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #1a1a2e;
  --color-text-secondary: #6c757d;
  --color-primary: #4361ee;
  --color-primary-light: #5a7bff;
  --color-border: #dee2e6;
  --color-shadow: rgba(0, 0, 0, 0.1);
  --radius: 8px;
  --transition: 200ms ease;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg: #0f0f23;
  --color-surface: #1a1a2e;
  --color-text: #e8e8e8;
  --color-text-secondary: #9ca3af;
  --color-primary: #7c8cf8;
  --color-primary-light: #9baaf9;
  --color-border: #2d2d44;
  --color-shadow: rgba(0, 0, 0, 0.3);
}

/* Respect system preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #0f0f23;
    --color-surface: #1a1a2e;
    --color-text: #e8e8e8;
    --color-text-secondary: #9ca3af;
    --color-primary: #7c8cf8;
    --color-primary-light: #9baaf9;
    --color-border: #2d2d44;
    --color-shadow: rgba(0, 0, 0, 0.3);
  }
}

/* Apply tokens */
body {
  background: var(--color-bg);
  color: var(--color-text);
  transition: background var(--transition), color var(--transition);
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px var(--color-shadow);
  padding: 1.5rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background var(--transition);
}

.btn-primary:hover {
  background: var(--color-primary-light);
}

/* Toggle button styles */
.theme-toggle {
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background: var(--color-border);
  cursor: pointer;
  transition: background var(--transition);
}

/* EXERCISE:
  Add a third theme option (e.g., "high contrast")
  with stronger color contrast ratios */`,
      description: 'Implement dark mode theming with CSS custom properties and system preference detection.'
    },
    {
      id: 'hc-5',
      title: 'Container Query Component',
      language: 'css',
      level: 'senior',
      code: `/* WHAT YOU'LL LEARN:
  - Container queries for responsive components
  - Container-type property
  - Component-level responsive design */

/* Define a container context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Base card layout (mobile-first) */
.responsive-card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border, #ddd);
  border-radius: 12px;
  background: white;
}

.card-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.card-meta {
  display: none; /* Hidden in small containers */
}

/* When container is medium width */
@container card (min-width: 400px) {
  .responsive-card {
    grid-template-columns: 150px 1fr;
    align-items: center;
  }

  .card-image {
    aspect-ratio: 1;
    border-radius: 8px;
  }

  .card-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #666;
  }
}

/* When container is large */
@container card (min-width: 600px) {
  .responsive-card {
    grid-template-columns: 200px 1fr auto;
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

/* Nested container for widget area */
.widget-area {
  container-type: inline-size;
  container-name: widgets;
}

@container widgets (min-width: 500px) {
  .widget-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container widgets (min-width: 800px) {
  .widget-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* EXERCISE:
  Create a navigation component that switches from
  hamburger to horizontal layout based on container width */`,
      description: 'Build truly responsive components with CSS container queries that adapt to their context.'
    }
  ],
  'sql': [
    {
      id: 'sq-1',
      title: 'Basic CRUD Operations',
      language: 'sql',
      level: 'beginner',
      code: `-- WHAT YOU'LL LEARN:
-- - CREATE TABLE with constraints
-- - INSERT, SELECT, UPDATE, DELETE
-- - Basic filtering and sorting

-- Create a table with constraints
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department VARCHAR(50) DEFAULT 'General',
    salary NUMERIC(10,2) CHECK (salary > 0),
    hire_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert records
INSERT INTO employees (name, email, department, salary)
VALUES
    ('Alice Smith', 'alice@company.com', 'Engineering', 95000),
    ('Bob Jones', 'bob@company.com', 'Design', 82000),
    ('Charlie Brown', 'charlie@company.com', 'Engineering', 88000),
    ('Diana Ross', 'diana@company.com', 'Marketing', 78000),
    ('Eve Wilson', 'eve@company.com', 'Engineering', 105000);

-- Select with filtering
SELECT name, department, salary
FROM employees
WHERE department = 'Engineering'
  AND salary > 90000
ORDER BY salary DESC;

-- Update records
UPDATE employees
SET salary = salary * 1.10,
    department = 'Senior Engineering'
WHERE department = 'Engineering'
  AND salary > 100000;

-- Delete with safety check
DELETE FROM employees
WHERE is_active = FALSE
  AND hire_date < CURRENT_DATE - INTERVAL '2 years';

-- Aggregate queries
SELECT
    department,
    COUNT(*) AS headcount,
    ROUND(AVG(salary), 2) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
WHERE is_active = TRUE
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY avg_salary DESC;

-- EXERCISE:
-- Add a 'manager_id' column (foreign key to employees.id)
-- Write a query to find employees who earn more than their manager`,
      description: 'Learn fundamental SQL operations: creating tables, CRUD, filtering, and aggregation.'
    },
    {
      id: 'sq-2',
      title: 'JOIN Types Explained',
      language: 'sql',
      level: 'beginner',
      code: `-- WHAT YOU'LL LEARN:
-- - INNER, LEFT, RIGHT, FULL OUTER JOINs
-- - Self-joins
-- - Multi-table joins

-- Setup tables
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    budget NUMERIC(12,2)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(id),
    manager_id INT REFERENCES employees(id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(id)
);

-- INNER JOIN: only matching rows
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- LEFT JOIN: all employees, even without department
SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

-- RIGHT JOIN: all departments, even without employees
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id
GROUP BY d.name;

-- FULL OUTER JOIN: all from both sides
SELECT
    COALESCE(e.name, '(vacant)') AS employee,
    COALESCE(d.name, '(unassigned)') AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- Self-join: employee with their manager
SELECT
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Multi-table join
SELECT
    e.name AS employee,
    d.name AS department,
    p.name AS project
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN projects p ON p.department_id = d.id
ORDER BY d.name, e.name;

-- EXERCISE:
-- Find departments that have projects but no employees assigned
-- (use appropriate JOIN type)`,
      description: 'Master all SQL JOIN types with practical examples including self-joins and multi-table joins.'
    },
    {
      id: 'sq-3',
      title: 'Window Functions for Analytics',
      language: 'sql',
      level: 'mid',
      code: `-- WHAT YOU'LL LEARN:
-- - ROW_NUMBER, RANK, DENSE_RANK
-- - LEAD/LAG for row comparisons
-- - Running totals and moving averages

-- Sample data
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    salesperson VARCHAR(50),
    region VARCHAR(20),
    amount NUMERIC(10,2),
    sale_date DATE
);

-- Ranking within groups
SELECT
    salesperson,
    region,
    amount,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS row_num,
    RANK()       OVER (PARTITION BY region ORDER BY amount DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS dense_rank
FROM sales;

-- Top performer per region
SELECT * FROM (
    SELECT
        salesperson,
        region,
        SUM(amount) AS total_sales,
        ROW_NUMBER() OVER (PARTITION BY region ORDER BY SUM(amount) DESC) AS rn
    FROM sales
    GROUP BY salesperson, region
) ranked
WHERE rn = 1;

-- Compare with previous/next row
SELECT
    sale_date,
    amount,
    LAG(amount, 1) OVER (ORDER BY sale_date)  AS prev_amount,
    LEAD(amount, 1) OVER (ORDER BY sale_date) AS next_amount,
    amount - LAG(amount, 1) OVER (ORDER BY sale_date) AS change
FROM sales
WHERE salesperson = 'Alice';

-- Running total
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM sales;

-- 7-day moving average
SELECT
    sale_date,
    amount,
    ROUND(
        AVG(amount) OVER (
            ORDER BY sale_date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2
    ) AS moving_avg_7d
FROM sales;

-- Percentile rank
SELECT
    salesperson,
    SUM(amount) AS total,
    PERCENT_RANK() OVER (ORDER BY SUM(amount)) AS percentile
FROM sales
GROUP BY salesperson;

-- EXERCISE:
-- Calculate month-over-month growth rate for each salesperson`,
      description: 'Use window functions for ranking, running totals, moving averages, and row comparisons.'
    },
    {
      id: 'sq-4',
      title: 'Recursive CTE for Hierarchy',
      language: 'sql',
      level: 'mid',
      code: `-- WHAT YOU'LL LEARN:
-- - Common Table Expressions (WITH)
-- - Recursive queries for tree structures
-- - Practical hierarchy traversal

-- Org chart table
CREATE TABLE org_chart (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    title VARCHAR(100),
    manager_id INT REFERENCES org_chart(id)
);

INSERT INTO org_chart (id, name, title, manager_id) VALUES
    (1, 'CEO Alice',    'CEO',              NULL),
    (2, 'VP Bob',       'VP Engineering',   1),
    (3, 'VP Carol',     'VP Marketing',     1),
    (4, 'Dir Dave',     'Dir Backend',      2),
    (5, 'Dir Eve',      'Dir Frontend',     2),
    (6, 'Lead Frank',   'Tech Lead',        4),
    (7, 'Dev Grace',    'Senior Dev',       6),
    (8, 'Dev Heidi',    'Junior Dev',       6);

-- Recursive CTE: full org tree with depth
WITH RECURSIVE org_tree AS (
    -- Base case: top-level (no manager)
    SELECT id, name, title, manager_id,
           0 AS depth,
           name AS path
    FROM org_chart
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees with their managers
    SELECT e.id, e.name, e.title, e.manager_id,
           t.depth + 1,
           t.path || ' > ' || e.name
    FROM org_chart e
    INNER JOIN org_tree t ON e.manager_id = t.id
)
SELECT
    REPEAT('  ', depth) || name AS indented_name,
    title,
    depth,
    path
FROM org_tree
ORDER BY path;

-- Find all reports (direct + indirect) for a manager
WITH RECURSIVE reports AS (
    SELECT id, name, title, manager_id
    FROM org_chart
    WHERE manager_id = 2  -- VP Bob's reports

    UNION ALL

    SELECT e.id, e.name, e.title, e.manager_id
    FROM org_chart e
    INNER JOIN reports r ON e.manager_id = r.id
)
SELECT name, title FROM reports;

-- Count total reports per manager
WITH RECURSIVE all_reports AS (
    SELECT id, manager_id, id AS root_manager
    FROM org_chart
    WHERE manager_id IS NOT NULL

    UNION ALL

    SELECT ar.id, e.manager_id, ar.root_manager
    FROM all_reports ar
    JOIN org_chart e ON ar.manager_id = e.id
    WHERE e.manager_id IS NOT NULL
)
SELECT
    oc.name,
    oc.title,
    COUNT(DISTINCT ar.id) AS total_reports
FROM org_chart oc
LEFT JOIN all_reports ar ON ar.root_manager = oc.id
GROUP BY oc.id, oc.name, oc.title
ORDER BY total_reports DESC;

-- EXERCISE:
-- Add a 'budget' column and write a recursive query that sums
-- the budget of each manager plus all their reports' budgets`,
      description: 'Traverse hierarchical data with recursive CTEs for org charts and tree structures.'
    },
    {
      id: 'sq-5',
      title: 'Query Optimization with EXPLAIN',
      language: 'sql',
      level: 'senior',
      code: `-- WHAT YOU'LL LEARN:
-- - Reading EXPLAIN ANALYZE output
-- - Index strategies for common queries
-- - Query rewriting for performance

-- Create a large table for testing
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_amount NUMERIC(10,2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Check query plan BEFORE optimization
EXPLAIN ANALYZE
SELECT customer_id, SUM(total_amount) AS total_spent
FROM orders
WHERE status = 'completed'
  AND created_at >= '2025-01-01'
GROUP BY customer_id
HAVING SUM(total_amount) > 1000
ORDER BY total_spent DESC
LIMIT 10;

-- Create targeted indexes
CREATE INDEX idx_orders_status_date ON orders(status, created_at);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);

-- Covering index (includes all columns needed)
CREATE INDEX idx_orders_covering ON orders(status, created_at, customer_id, total_amount);

-- Check plan AFTER optimization
EXPLAIN ANALYZE
SELECT customer_id, SUM(total_amount) AS total_spent
FROM orders
WHERE status = 'completed'
  AND created_at >= '2025-01-01'
GROUP BY customer_id
HAVING SUM(total_amount) > 1000
ORDER BY total_spent DESC
LIMIT 10;

-- Rewrite: avoid SELECT * (reduces I/O)
-- BAD:  SELECT * FROM orders WHERE ...
-- GOOD: SELECT id, customer_id, total_amount FROM orders WHERE ...

-- Rewrite: use EXISTS instead of IN for subqueries
-- Slow with large subquery:
-- SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders);

-- Faster:
-- SELECT * FROM customers c
-- WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Partial index for common filter
CREATE INDEX idx_orders_active ON orders(created_at)
WHERE status = 'pending';

-- Expression index
CREATE INDEX idx_orders_month ON orders(DATE_TRUNC('month', created_at));

-- Check index usage stats
SELECT
    indexrelname AS index_name,
    idx_scan AS times_used,
    idx_tup_read AS rows_read,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- EXERCISE:
-- Write a query to find unused indexes (idx_scan = 0)
-- that are wasting disk space`,
      description: 'Learn to read EXPLAIN output, create effective indexes, and rewrite queries for performance.'
    }
  ],
  'typescript': [
    {
      id: 'ts-1',
      title: 'Type Annotations Basics',
      language: 'typescript',
      level: 'beginner',
      code: `// WHAT YOU'LL LEARN:
// - Basic type annotations
// - Function signatures
// - Type inference

// Primitive types
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Object type
let user: { name: string; age: number; email?: string } = {
  name: "Alice",
  age: 30,
};

// Function signatures
function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}

// Arrow function with types
const add = (a: number, b: number): number => a + b;

// Void return type
function logMessage(msg: string): void {
  console.log(msg);
}

// Union types
let id: string | number = "abc-123";
id = 42; // Also valid

// Type narrowing with typeof
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// Tuple types
let coordinates: [number, number] = [10.5, 20.3];
let entry: [string, number] = ["Alice", 30];

// Literal types
let direction: "north" | "south" | "east" | "west" = "north";

// Type inference (TypeScript figures out the type)
let inferred = "hello"; // TypeScript knows this is string
let inferredNum = 42;   // TypeScript knows this is number

console.log(greet("World"));
console.log(formatValue("hello"), formatValue(3.14159));
console.log(entry, coordinates);

// EXERCISE:
// Create a function 'describe' that takes a Person object
// (with name, age, and optional role) and returns a description string`,
      description: 'Learn TypeScript fundamentals: type annotations, function signatures, and type narrowing.'
    },
    {
      id: 'ts-2',
      title: 'Interface vs Type Alias',
      language: 'typescript',
      level: 'beginner',
      code: `// WHAT YOU'LL LEARN:
// - When to use interface vs type
// - Extending and intersecting
// - Declaration merging

// Interface: best for object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

// Extending interfaces
interface Admin extends User {
  permissions: string[];
  level: "super" | "regular";
}

// Type alias: flexible, works with unions/tuples
type Status = "active" | "inactive" | "suspended";
type ID = string | number;
type Pair<T> = [T, T];

// Type for object shapes (works like interface)
type Product = {
  id: number;
  name: string;
  price: number;
};

// Intersection type (like extending)
type ProductWithStock = Product & {
  stock: number;
  warehouse: string;
};

// Declaration merging (only interfaces!)
interface User {
  createdAt: Date; // Merges with the original User interface
}

// Interface for function shapes
interface Formatter {
  (value: unknown): string;
}

const jsonFormat: Formatter = (value) => JSON.stringify(value);

// Generic interface
interface Repository<T> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(item: T): void;
  delete(id: number): boolean;
}

// Implementing an interface
class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findAll(): User[] {
    return [...this.users];
  }

  save(user: User): void {
    this.users.push(user);
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

// When to use which:
// Interface: object shapes, class contracts, declaration merging
// Type: unions, tuples, mapped types, complex compositions

// EXERCISE:
// Create an interface ApiResponse<T> with data: T, status: number,
// message: string, and a type alias for common response types`,
      description: 'Understand when to use interfaces vs type aliases with practical patterns.'
    },
    {
      id: 'ts-3',
      title: 'Generic Utility Functions',
      language: 'typescript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Writing generic functions
// - Constraining generics with extends
// - Built-in utility types

// Generic identity with constraint
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Constrained generic: must have 'id'
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Generic key lookup
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

// Generic merge with Partial
function merge<T extends object>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}

// Using built-in utility types
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

// Partial: all properties optional
type UpdateUser = Partial<User>;

// Pick: select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit: exclude specific properties
type CreateUser = Omit<User, "id" | "createdAt">;

// Record: typed key-value object
type UserRoleMap = Record<string, User["role"]>;

// ReturnType: extract function return type
function getUser() {
  return { id: 1, name: "Alice", active: true };
}
type UserResult = ReturnType<typeof getUser>;

// Readonly: immutable version
type FrozenUser = Readonly<User>;

// Required: make all properties required
type StrictUser = Required<Partial<User>>;

// Practical example: type-safe event handler
type EventMap = {
  click: { x: number; y: number };
  keypress: { key: string; code: number };
  submit: { formData: Record<string, string> };
};

function on<K extends keyof EventMap>(
  event: K,
  handler: (payload: EventMap[K]) => void
): void {
  console.log("Registered handler for", event);
  // handler would be called with the correct payload type
}

on("click", (payload) => {
  // payload is { x: number; y: number } - fully typed!
  console.log(payload.x, payload.y);
});

on("keypress", (payload) => {
  // payload is { key: string; code: number }
  console.log(payload.key);
});

// EXERCISE:
// Create a generic 'groupBy' function that takes an array and a key,
// returning a Record<string, T[]> grouped by that key's value`,
      description: 'Master TypeScript generics with constraints, utility types, and type-safe patterns.'
    },
    {
      id: 'ts-4',
      title: 'Discriminated Union Pattern',
      language: 'typescript',
      level: 'mid',
      code: `// WHAT YOU'LL LEARN:
// - Discriminated (tagged) unions
// - Exhaustive checking with never
// - Type-safe state machines

// API Response as discriminated union
type ApiResponse<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string; code: number };

function handleResponse<T>(response: ApiResponse<T>): string {
  switch (response.status) {
    case "loading":
      return "Loading...";
    case "success":
      return "Got data: " + JSON.stringify(response.data);
    case "error":
      return "Error " + response.code + ": " + response.error;
  }
}

// Shape discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      // Exhaustive check: if we miss a case, this won't compile
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// State machine with discriminated unions
type AuthState =
  | { state: "anonymous" }
  | { state: "authenticating"; email: string }
  | { state: "authenticated"; user: { id: number; name: string }; token: string }
  | { state: "error"; message: string; retryCount: number };

type AuthAction =
  | { type: "LOGIN"; email: string; password: string }
  | { type: "LOGIN_SUCCESS"; user: { id: number; name: string }; token: string }
  | { type: "LOGIN_FAILURE"; message: string }
  | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { state: "authenticating", email: action.email };
    case "LOGIN_SUCCESS":
      return { state: "authenticated", user: action.user, token: action.token };
    case "LOGIN_FAILURE":
      const retryCount = state.state === "error" ? state.retryCount + 1 : 1;
      return { state: "error", message: action.message, retryCount };
    case "LOGOUT":
      return { state: "anonymous" };
  }
}

// Type guard function
function isAuthenticated(state: AuthState): state is Extract<AuthState, { state: "authenticated" }> {
  return state.state === "authenticated";
}

console.log(area({ kind: "circle", radius: 5 }));
console.log(handleResponse({ status: "success", data: [1, 2, 3] }));

// EXERCISE:
// Add a "password_reset" state to AuthState and handle
// RESET_PASSWORD and RESET_SUCCESS actions in the reducer`,
      description: 'Build type-safe state machines with discriminated unions and exhaustive checking.'
    },
    {
      id: 'ts-5',
      title: 'Template Literal Type Router',
      language: 'typescript',
      level: 'senior',
      code: `// WHAT YOU'LL LEARN:
// - Template literal types for string parsing
// - Type-level string manipulation
// - Building a type-safe route system

// Basic template literal types
type Greeting = "hello" | "hi";
type Name = "world" | "typescript";
type GreetingMessage = \\\`\\\${Greeting}, \\\${Name}!\\\`;
// Result: "hello, world!" | "hello, typescript!" | "hi, world!" | "hi, typescript!"

// Extract path parameters from route strings
type ExtractParam<T extends string> =
  T extends \\\`\\\${string}:\\\${infer Param}/\\\${infer Rest}\\\`
    ? Param | ExtractParam<Rest>
    : T extends \\\`\\\${string}:\\\${infer Param}\\\`
    ? Param
    : never;

// Test: extract params from route
type UserRoute = ExtractParam<"/users/:userId/posts/:postId">;
// Result: "userId" | "postId"

// Build params object from route string
type RouteParams<T extends string> = {
  [K in ExtractParam<T>]: string;
};

// Test: params object for route
type UserParams = RouteParams<"/users/:userId/posts/:postId">;
// Result: { userId: string; postId: string }

// Type-safe route handler
type RouteHandler<T extends string> = (params: RouteParams<T>) => void;

// Route registry with type-safe handlers
function createRouter() {
  const routes: Array<{ path: string; handler: Function }> = [];

  return {
    get<T extends string>(path: T, handler: RouteHandler<T>) {
      routes.push({ path, handler });
    },
    // Simple route matching (production would use a proper router)
    match(url: string) {
      for (const route of routes) {
        const params = matchRoute(route.path, url);
        if (params) {
          route.handler(params);
          return true;
        }
      }
      return false;
    },
  };
}

function matchRoute(pattern: string, url: string): Record<string, string> | null {
  const patternParts = pattern.split("/");
  const urlParts = url.split("/");
  if (patternParts.length !== urlParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = urlParts[i];
    } else if (patternParts[i] !== urlParts[i]) {
      return null;
    }
  }
  return params;
}

// Usage: fully type-safe!
const router = createRouter();
router.get("/users/:userId", (params) => {
  console.log(params.userId); // Typed as string
});
router.get("/users/:userId/posts/:postId", (params) => {
  console.log(params.userId, params.postId); // Both typed
});

router.match("/users/42/posts/7");

// EXERCISE:
// Add support for query parameters: /search?q=:query&page=:page
// Extract both path params and query params into the type`,
      description: 'Build a type-safe router using template literal types for string parsing at the type level.'
    }
  ]
}
