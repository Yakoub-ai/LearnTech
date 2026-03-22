// JavaScript Interactive Labs
// Sourced from: interactiveLabs.js (js-lab-1) and languageCodeSandboxExamples.js (js-lab-2 through js-lab-6)

export const labs = [
  // ============================================================
  // JS-LAB-1: DOM Manipulation Challenge (from interactiveLabs.js)
  // ============================================================
  {
    id: 'js-lab-1',
    languageId: 'javascript',
    level: 'beginner',
    title: 'DOM Manipulation Challenge',
    description: 'Learn DOM manipulation by building interactive elements: selectors, events, dynamic content, and local storage.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your JavaScript Environment',
        setupReference: true,
        instruction: 'Before writing JavaScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ (with npm), a code editor with JavaScript extensions (ESLint, Prettier), and browser DevTools. For Node.js projects, create a package.json. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to verify Node.js 20+',
          'Test: `node -e "console.log(\'Hello, World!\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nHello, World!',
        solution: null
      },
      {
        title: 'Step 2: Select and Modify Elements',
        instruction: 'Practice DOM selection methods and modify element content, classes, and styles. The DOM (Document Object Model) is the live tree of HTML elements your JavaScript can read and write. Mastering selectors and mutations is the foundation of all browser interactivity.',
        starterCode: `// DOM Basics — Selecting and Modifying Elements

// Given this HTML structure:
// <div id="app">
//   <h1 class="title">Hello</h1>
//   <ul class="list">
//     <li class="item">Item 1</li>
//     <li class="item active">Item 2</li>
//     <li class="item">Item 3</li>
//   </ul>
//   <button id="action-btn">Click Me</button>
// </div>

// TODO: Select the h1 element and change its text to "Welcome"
// Hint: document.getElementById() or document.querySelector()

// TODO: Select ALL .item elements and add a "visited" class to each

// TODO: Find the .active item and change its background color to #e0f2fe

// TODO: Change the button text to "Clicked!" and disable it`,
        hints: [
          'querySelector returns first match, querySelectorAll returns NodeList',
          'element.classList.add("visited") adds a class',
          'element.textContent = "new text" changes text content'
        ],
        expectedOutput: `h1 text becomes "Welcome"
All .item elements get "visited" class
The .active item gets a blue background
Button shows "Clicked!" and is disabled`,
        solution: `// Select and modify h1
const title = document.querySelector('.title');
title.textContent = 'Welcome';

// Add class to all items
const items = document.querySelectorAll('.item');
items.forEach(item => item.classList.add('visited'));

// Style the active item
const activeItem = document.querySelector('.item.active');
activeItem.style.backgroundColor = '#e0f2fe';

// Update button
const btn = document.getElementById('action-btn');
btn.textContent = 'Clicked!';
btn.disabled = true;`
      },
      {
        title: 'Step 3: Handle Events',
        instruction: 'Add event listeners for click, input, and keyboard events. Build a simple counter with keyboard shortcuts. Events are how your code reacts to user actions — clicks, key presses, form input — without polling or loops.',
        starterCode: `// DOM Events — Build an Interactive Counter

// HTML:
// <div id="counter-app">
//   <span id="count">0</span>
//   <button id="increment">+</button>
//   <button id="decrement">-</button>
//   <button id="reset">Reset</button>
//   <input id="step-input" type="number" value="1" min="1" />
// </div>

let count = 0;
let step = 1;

// TODO: Add click handlers for increment, decrement, reset buttons

// TODO: Add input handler for step-input (changes the step amount)

// TODO: Add keyboard shortcuts: ArrowUp = increment, ArrowDown = decrement, 'r' = reset

function updateDisplay() {
  document.getElementById('count').textContent = count;
}`,
        hints: [
          'element.addEventListener("click", () => { ... })',
          'For keyboard: document.addEventListener("keydown", (e) => { if (e.key === "ArrowUp") ... })',
          'parseInt(input.value) converts the step input to a number'
        ],
        expectedOutput: `Click + → count increases by step
Click - → count decreases by step
Click Reset → count goes to 0
ArrowUp/ArrowDown/R keyboard shortcuts work
Changing step input changes the increment amount`,
        solution: `let count = 0;
let step = 1;

function updateDisplay() {
  document.getElementById('count').textContent = count;
}

document.getElementById('increment').addEventListener('click', () => {
  count += step;
  updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
  count -= step;
  updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

document.getElementById('step-input').addEventListener('input', (e) => {
  step = parseInt(e.target.value) || 1;
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') { count += step; updateDisplay(); }
  if (e.key === 'ArrowDown') { count -= step; updateDisplay(); }
  if (e.key === 'r') { count = 0; updateDisplay(); }
});`
      },
      {
        title: 'Step 4: Create Elements Dynamically',
        instruction: 'Build a todo list that creates, toggles, and removes DOM elements dynamically. Creating elements in JavaScript rather than hard-coding them in HTML lets you build data-driven UIs that respond to user input at runtime.',
        starterCode: `// Dynamic DOM — Todo List

// HTML: <div id="todo-app">
//   <input id="todo-input" placeholder="Add a task..." />
//   <button id="add-btn">Add</button>
//   <ul id="todo-list"></ul>
//   <span id="count-display">0 items</span>
// </div>

const todos = [];

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  // TODO: Create a new todo object { id, text, completed }
  // TODO: Create a <li> element with:
  //   - Checkbox to toggle completion
  //   - Text span (strike-through when completed)
  //   - Delete button (x)
  // TODO: Append to #todo-list
  // TODO: Clear input and update count
}

function updateCount() {
  // TODO: Update the count display with remaining (not completed) items
}

// TODO: Add event listeners for add button and Enter key in input`,
        hints: [
          'document.createElement("li") creates a new element',
          'checkbox.addEventListener("change", ...) for toggle',
          'element.remove() removes it from the DOM'
        ],
        expectedOutput: `Type "Buy groceries" + Enter → new list item appears
Click checkbox → text gets strikethrough
Click x → item is removed
Count shows "2 items" (only non-completed)`,
        solution: `const todos = [];
let nextId = 1;

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;

  const todo = { id: nextId++, text, completed: false };
  todos.push(todo);

  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.gap = '8px';
  li.style.padding = '8px 0';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'x';
  deleteBtn.style.marginLeft = 'auto';

  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    updateCount();
  });

  deleteBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    if (idx > -1) todos.splice(idx, 1);
    li.remove();
    updateCount();
  });

  li.append(checkbox, span, deleteBtn);
  document.getElementById('todo-list').appendChild(li);
  input.value = '';
  updateCount();
}

function updateCount() {
  const remaining = todos.filter(t => !t.completed).length;
  document.getElementById('count-display').textContent = remaining + ' items';
}

document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});`
      }
    ]
  },

  // ============================================================
  // JS-LAB-2: Array Methods Mastery (from js-1 sandbox example)
  // ============================================================
  {
    id: 'js-lab-2',
    languageId: 'javascript',
    level: 'beginner',
    title: 'Array Methods Mastery',
    description: 'Master modern JavaScript array methods — map, filter, reduce, find, some, every — and learn how to chain them to transform data sets elegantly.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your JavaScript Environment',
        setupReference: true,
        instruction: 'Before writing JavaScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ (with npm), a code editor with JavaScript extensions (ESLint, Prettier), and browser DevTools. For Node.js projects, create a package.json. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to verify Node.js 20+',
          'Test: `node -e "console.log(\'Hello, World!\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nHello, World!',
        solution: null
      },
      {
        title: 'Step 2: Transform Data with map and filter',
        instruction: 'Use `Array.prototype.map` to transform every element in an array and `filter` to keep only elements matching a condition. These are the workhorses of functional data pipelines in JavaScript — prefer them over manual `for` loops for clarity and composability.',
        starterCode: `// Array Methods — map and filter

const users = [
  { name: 'Alice', age: 28, role: 'engineer' },
  { name: 'Bob', age: 35, role: 'designer' },
  { name: 'Charlie', age: 22, role: 'engineer' },
  { name: 'Diana', age: 31, role: 'manager' },
  { name: 'Eve', age: 26, role: 'engineer' },
];

// TODO: Use map to extract just the names into a new array
const names = // your code here
console.log('Names:', names);

// TODO: Use filter to get only engineers
const engineers = // your code here
console.log('Engineers:', engineers.map(u => u.name));

// TODO: Use filter to get users older than 27, then map to get their names
const seniorNames = // your code here
console.log('Over 27:', seniorNames);

// TODO: Use some() to check if any user is a manager
const hasManager = // your code here
console.log('Has manager:', hasManager);

// TODO: Use every() to check that all users are adults (age >= 18)
const allAdults = // your code here
console.log('All adults:', allAdults);`,
        hints: [
          'map takes a callback: users.map(user => user.name)',
          'filter takes a predicate: users.filter(user => user.role === "engineer")',
          'Chain them: users.filter(...).map(...)'
        ],
        expectedOutput: `Names: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
Engineers: ['Alice', 'Charlie', 'Eve']
Over 27: ['Alice', 'Bob', 'Diana']
Has manager: true
All adults: true`,
        solution: `const users = [
  { name: 'Alice', age: 28, role: 'engineer' },
  { name: 'Bob', age: 35, role: 'designer' },
  { name: 'Charlie', age: 22, role: 'engineer' },
  { name: 'Diana', age: 31, role: 'manager' },
  { name: 'Eve', age: 26, role: 'engineer' },
];

const names = users.map(user => user.name);
console.log('Names:', names);

const engineers = users.filter(user => user.role === 'engineer');
console.log('Engineers:', engineers.map(u => u.name));

const seniorNames = users.filter(u => u.age > 27).map(u => u.name);
console.log('Over 27:', seniorNames);

const hasManager = users.some(user => user.role === 'manager');
console.log('Has manager:', hasManager);

const allAdults = users.every(user => user.age >= 18);
console.log('All adults:', allAdults);`
      },
      {
        title: 'Step 3: Aggregate Data with reduce',
        instruction: 'Use `Array.prototype.reduce` to collapse an array into a single value — a sum, an average, or even a grouped object. `reduce` is the most general array method and can implement all others, but use it deliberately: it is most readable for accumulation and grouping tasks.',
        starterCode: `const users = [
  { name: 'Alice', age: 28, role: 'engineer', salary: 95000 },
  { name: 'Bob', age: 35, role: 'designer', salary: 85000 },
  { name: 'Charlie', age: 22, role: 'engineer', salary: 78000 },
  { name: 'Diana', age: 31, role: 'manager', salary: 110000 },
  { name: 'Eve', age: 26, role: 'engineer', salary: 92000 },
];

// TODO: Use reduce to calculate total salary
const totalSalary = // your code here
console.log('Total salary:', totalSalary);

// TODO: Use reduce to calculate average age
const avgAge = // your code here
console.log('Average age:', avgAge.toFixed(1));

// TODO: Use reduce to group users by role into an object:
// { engineer: [...], designer: [...], manager: [...] }
const byRole = // your code here
console.log('By role:', byRole);

// TODO: Use reduce to find the highest-paid user object
const highestPaid = // your code here
console.log('Highest paid:', highestPaid.name, highestPaid.salary);`,
        hints: [
          'reduce(callback, initialValue) — initialValue is 0 for sums, {} for grouping',
          'For grouping: (acc, user) => { acc[user.role] = acc[user.role] || []; acc[user.role].push(user); return acc; }',
          'For max: (max, user) => user.salary > max.salary ? user : max'
        ],
        expectedOutput: `Total salary: 460000
Average age: 28.4
By role: { engineer: ['Alice','Charlie','Eve'], designer: ['Bob'], manager: ['Diana'] }
Highest paid: Diana 110000`,
        solution: `const users = [
  { name: 'Alice', age: 28, role: 'engineer', salary: 95000 },
  { name: 'Bob', age: 35, role: 'designer', salary: 85000 },
  { name: 'Charlie', age: 22, role: 'engineer', salary: 78000 },
  { name: 'Diana', age: 31, role: 'manager', salary: 110000 },
  { name: 'Eve', age: 26, role: 'engineer', salary: 92000 },
];

const totalSalary = users.reduce((sum, user) => sum + user.salary, 0);
console.log('Total salary:', totalSalary);

const avgAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
console.log('Average age:', avgAge.toFixed(1));

const byRole = users.reduce((groups, user) => {
  groups[user.role] = groups[user.role] || [];
  groups[user.role].push(user.name);
  return groups;
}, {});
console.log('By role:', byRole);

const highestPaid = users.reduce((max, user) => user.salary > max.salary ? user : max);
console.log('Highest paid:', highestPaid.name, highestPaid.salary);`
      },
      {
        title: 'Step 4: Method Chaining and find',
        instruction: 'Chain multiple array methods together to express complex data queries in a single readable pipeline. Also learn `find` and `findIndex` for locating specific elements. Good method chains read like prose: "get engineers, sort by age descending, take the top 2 names".',
        starterCode: `const users = [
  { name: 'Alice', age: 28, role: 'engineer', salary: 95000 },
  { name: 'Bob', age: 35, role: 'designer', salary: 85000 },
  { name: 'Charlie', age: 22, role: 'engineer', salary: 78000 },
  { name: 'Diana', age: 31, role: 'manager', salary: 110000 },
  { name: 'Eve', age: 26, role: 'engineer', salary: 92000 },
];

// TODO: Chain filter + sort + map:
// Get engineers over 25, sorted by salary descending, return their names
const topEngineers = users
  // .filter(...)
  // .sort(...)
  // .map(...)
console.log('Top engineers:', topEngineers);

// TODO: Use find() to locate the first designer
const designer = // your code here
console.log('First designer:', designer?.name);

// TODO: Use findIndex() to get the index of 'Diana' in the array
const dianaIndex = // your code here
console.log('Diana index:', dianaIndex);

// TODO: Use flatMap to get a single list of skills from each user
const usersWithSkills = [
  { name: 'Alice', skills: ['JS', 'React'] },
  { name: 'Bob', skills: ['CSS', 'Figma'] },
  { name: 'Charlie', skills: ['JS', 'Node'] },
];
const allSkills = // your code here
console.log('All skills:', allSkills);`,
        hints: [
          'sort((a, b) => b.salary - a.salary) sorts descending by salary',
          'find() returns the first matching element (or undefined)',
          'flatMap(u => u.skills) maps then flattens one level'
        ],
        expectedOutput: `Top engineers: ['Alice', 'Eve']
First designer: Bob
Diana index: 3
All skills: ['JS', 'React', 'CSS', 'Figma', 'JS', 'Node']`,
        solution: `const users = [
  { name: 'Alice', age: 28, role: 'engineer', salary: 95000 },
  { name: 'Bob', age: 35, role: 'designer', salary: 85000 },
  { name: 'Charlie', age: 22, role: 'engineer', salary: 78000 },
  { name: 'Diana', age: 31, role: 'manager', salary: 110000 },
  { name: 'Eve', age: 26, role: 'engineer', salary: 92000 },
];

const topEngineers = users
  .filter(u => u.role === 'engineer' && u.age > 25)
  .sort((a, b) => b.salary - a.salary)
  .map(u => u.name);
console.log('Top engineers:', topEngineers);

const designer = users.find(u => u.role === 'designer');
console.log('First designer:', designer?.name);

const dianaIndex = users.findIndex(u => u.name === 'Diana');
console.log('Diana index:', dianaIndex);

const usersWithSkills = [
  { name: 'Alice', skills: ['JS', 'React'] },
  { name: 'Bob', skills: ['CSS', 'Figma'] },
  { name: 'Charlie', skills: ['JS', 'Node'] },
];
const allSkills = usersWithSkills.flatMap(u => u.skills);
console.log('All skills:', allSkills);`
      },
      {
        title: 'Step 5: Real-World Pipeline Challenge',
        instruction: 'Combine everything you have learned to build a data processing pipeline. This is the kind of transformation you will write daily when working with API responses, user lists, or report data. Focus on clarity — each step in the chain should have a single, obvious purpose.',
        starterCode: `// Real-World Challenge: Process an e-commerce order dataset

const orders = [
  { id: 1, customer: 'Alice', items: ['book', 'pen'], total: 45.99, status: 'shipped' },
  { id: 2, customer: 'Bob', items: ['laptop'], total: 1299.00, status: 'pending' },
  { id: 3, customer: 'Alice', items: ['notebook', 'pen', 'marker'], total: 23.50, status: 'delivered' },
  { id: 4, customer: 'Charlie', items: ['book'], total: 14.99, status: 'shipped' },
  { id: 5, customer: 'Bob', items: ['headphones', 'cable'], total: 189.00, status: 'delivered' },
  { id: 6, customer: 'Diana', items: ['book', 'bookmark'], total: 19.99, status: 'pending' },
];

// TODO 1: Get total revenue from delivered orders only
const deliveredRevenue = // your code here
console.log('Delivered revenue: $' + deliveredRevenue.toFixed(2));

// TODO 2: Count unique items ordered across ALL orders (no duplicates)
const uniqueItems = // your code here (hint: Set is useful)
console.log('Unique items ordered:', uniqueItems.size);

// TODO 3: Group orders by customer name, with total spent per customer
// Result: { Alice: 69.49, Bob: 1488, Charlie: 14.99, Diana: 19.99 }
const spendByCustomer = // your code here
console.log('Spend by customer:', spendByCustomer);

// TODO 4: Find the order with the most items
const largestOrder = // your code here
console.log('Largest order:', largestOrder.id, '(' + largestOrder.items.length + ' items)');`,
        hints: [
          'Filter for status === "delivered" then reduce to sum totals',
          'flatMap to get all items, then new Set([...allItems]) for uniqueness',
          'reduce into an object: acc[order.customer] = (acc[order.customer] || 0) + order.total',
          'reduce to find max: (max, o) => o.items.length > max.items.length ? o : max'
        ],
        expectedOutput: `Delivered revenue: $212.50
Unique items ordered: 8
Spend by customer: { Alice: 69.49, Bob: 1488, Charlie: 14.99, Diana: 19.99 }
Largest order: 5 (2 items)`,
        solution: `const orders = [
  { id: 1, customer: 'Alice', items: ['book', 'pen'], total: 45.99, status: 'shipped' },
  { id: 2, customer: 'Bob', items: ['laptop'], total: 1299.00, status: 'pending' },
  { id: 3, customer: 'Alice', items: ['notebook', 'pen', 'marker'], total: 23.50, status: 'delivered' },
  { id: 4, customer: 'Charlie', items: ['book'], total: 14.99, status: 'shipped' },
  { id: 5, customer: 'Bob', items: ['headphones', 'cable'], total: 189.00, status: 'delivered' },
  { id: 6, customer: 'Diana', items: ['book', 'bookmark'], total: 19.99, status: 'pending' },
];

const deliveredRevenue = orders
  .filter(o => o.status === 'delivered')
  .reduce((sum, o) => sum + o.total, 0);
console.log('Delivered revenue: $' + deliveredRevenue.toFixed(2));

const uniqueItems = new Set(orders.flatMap(o => o.items));
console.log('Unique items ordered:', uniqueItems.size);

const spendByCustomer = orders.reduce((acc, o) => {
  acc[o.customer] = parseFloat(((acc[o.customer] || 0) + o.total).toFixed(2));
  return acc;
}, {});
console.log('Spend by customer:', spendByCustomer);

const largestOrder = orders.reduce((max, o) => o.items.length > max.items.length ? o : max);
console.log('Largest order:', largestOrder.id, '(' + largestOrder.items.length + ' items)');`
      }
    ]
  },

  // ============================================================
  // JS-LAB-3: Async/Await and Promises (from js-3 sandbox example)
  // ============================================================
  {
    id: 'js-lab-3',
    languageId: 'javascript',
    level: 'mid',
    title: 'Async/Await and Promise Patterns',
    description: 'Master asynchronous JavaScript: compare Promise chains vs async/await, handle errors gracefully, and run operations in parallel with Promise.all and Promise.allSettled.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your JavaScript Environment',
        setupReference: true,
        instruction: 'Before writing JavaScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ (with npm), a code editor with JavaScript extensions (ESLint, Prettier), and browser DevTools. For Node.js projects, create a package.json. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to verify Node.js 20+',
          'Test: `node -e "console.log(\'Hello, World!\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nHello, World!',
        solution: null
      },
      {
        title: 'Step 2: Understand Promises',
        instruction: 'A Promise represents a value that will be available in the future — either resolved (success) or rejected (failure). Before async/await syntax existed, developers chained `.then()` and `.catch()` calls. Understanding Promise chains helps you read older code and debug async issues even when you write async/await.',
        starterCode: `// Promises — simulated API calls

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id, email: 'user' + id + '@example.com' });
      else reject(new Error('Invalid user ID: ' + id));
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

// TODO: Use Promise chain (.then/.catch) to:
// 1. Fetch user with id 1
// 2. Log their name
// 3. Fetch their posts
// 4. Log the number of posts
// 5. Catch any errors and log the error message
fetchUser(1)
  // .then(...)
  // .then(...)
  // .catch(...)

// TODO: Test the error case: call fetchUser(-1) and handle the rejection
fetchUser(-1)
  // .then(...)
  // .catch(...)`,
        hints: [
          '.then(user => { console.log(user.name); return fetchPosts(user.id); })',
          'Each .then receives the return value of the previous .then',
          '.catch(err => console.error(err.message)) handles rejected promises'
        ],
        expectedOutput: `User: User 1
Posts: 2
Error: Invalid user ID: -1`,
        solution: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id, email: 'user' + id + '@example.com' });
      else reject(new Error('Invalid user ID: ' + id));
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

fetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts.length);
  })
  .catch(err => console.error('Error:', err.message));

fetchUser(-1)
  .then(user => console.log('Should not reach here'))
  .catch(err => console.error('Error:', err.message));`
      },
      {
        title: 'Step 3: Rewrite with async/await',
        instruction: 'Rewrite the same logic using `async`/`await` — syntactic sugar over Promises that lets you write async code that looks synchronous. Wrap await calls in `try/catch` for error handling. Prefer async/await in new code: it is easier to read, easier to debug (stack traces are clearer), and easier to reason about than long `.then()` chains.',
        starterCode: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id, email: 'user' + id + '@example.com' });
      else reject(new Error('Invalid user ID: ' + id));
    }, 100);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'First Post', userId },
      { id: 2, title: 'Second Post', userId },
    ]), 100);
  });
}

// TODO: Write an async function getUserWithPosts(userId) that:
// 1. Awaits fetchUser(userId)
// 2. Logs the user name
// 3. Awaits fetchPosts(user.id)
// 4. Logs the number of posts
// 5. Returns the posts array
// 6. Uses try/catch to handle errors
async function getUserWithPosts(userId) {
  // your code here
}

// TODO: Call it with a valid ID and an invalid ID
// Use an immediately-invoked async function: (async () => { ... })()
(async () => {
  await getUserWithPosts(1);
  await getUserWithPosts(-1);
})();`,
        hints: [
          'Mark the function with async: async function getUserWithPosts(userId) { ... }',
          'const user = await fetchUser(userId); — pauses until the promise resolves',
          'Wrap in try { ... } catch (err) { console.error(err.message); }'
        ],
        expectedOutput: `Async - User: User 1
Async - Posts: 2
Async error: Invalid user ID: -1`,
        solution: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id, email: 'user' + id + '@example.com' });
      else reject(new Error('Invalid user ID: ' + id));
    }, 100);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: 'First Post', userId },
      { id: 2, title: 'Second Post', userId },
    ]), 100);
  });
}

async function getUserWithPosts(userId) {
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

(async () => {
  await getUserWithPosts(1);
  await getUserWithPosts(-1);
})();`
      },
      {
        title: 'Step 4: Parallel Execution with Promise.all',
        instruction: 'When multiple async operations are independent of each other, run them in parallel with `Promise.all` instead of awaiting them sequentially. Sequential awaits are a common performance mistake — if fetching user 1 does not depend on fetching user 2, there is no reason to wait for one before starting the other.',
        starterCode: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id });
      else reject(new Error('Invalid user ID: ' + id));
    }, 100);
  });
}

// TODO: Write getMultipleUsers(ids) using Promise.all
// It should fetch all users in parallel and log their names
async function getMultipleUsers(ids) {
  // Hint: ids.map(id => fetchUser(id)) creates an array of promises
  // Promise.all([p1, p2, p3]) resolves when ALL resolve (rejects if any reject)
}

// TODO: Write getMultipleUsersSafe(ids) using Promise.allSettled
// It should handle mixed success/failure gracefully and log:
// - How many succeeded
// - How many failed and why
async function getMultipleUsersSafe(ids) {
  // Promise.allSettled never rejects — each result has { status, value } or { status, reason }
}

(async () => {
  await getMultipleUsers([1, 2, 3]);
  await getMultipleUsersSafe([1, -1, 3, -2]);
})();`,
        hints: [
          'const promises = ids.map(id => fetchUser(id)); const users = await Promise.all(promises);',
          'Promise.allSettled returns: [{ status: "fulfilled", value }, { status: "rejected", reason }]',
          'results.filter(r => r.status === "fulfilled").map(r => r.value) extracts successes'
        ],
        expectedOutput: `All users: ['User 1', 'User 2', 'User 3']
Succeeded: 2 | Failed: 2
Failed reasons: ['Invalid user ID: -1', 'Invalid user ID: -2']`,
        solution: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'User ' + id });
      else reject(new Error('Invalid user ID: ' + id));
    }, 100);
  });
}

async function getMultipleUsers(ids) {
  const users = await Promise.all(ids.map(id => fetchUser(id)));
  console.log('All users:', users.map(u => u.name));
  return users;
}

async function getMultipleUsersSafe(ids) {
  const results = await Promise.allSettled(ids.map(id => fetchUser(id)));
  const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected').map(r => r.reason.message);
  console.log('Succeeded:', succeeded.length, '| Failed:', failed.length);
  console.log('Failed reasons:', failed);
  return { succeeded, failed };
}

(async () => {
  await getMultipleUsers([1, 2, 3]);
  await getMultipleUsersSafe([1, -1, 3, -2]);
})();`
      },
      {
        title: 'Step 5: Retry Logic and Timeout Patterns',
        instruction: 'Build production-ready async utilities: a `fetchWithRetry` that retries failed operations with exponential backoff, and a `withTimeout` wrapper that rejects if an operation takes too long. These patterns appear in virtually every real-world API client and are expected knowledge at the mid level.',
        starterCode: `// Simulated flaky network call — fails ~50% of the time
let callCount = 0;
function flakyFetch(url) {
  callCount++;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve({ data: 'success from ' + url, attempt: callCount });
      else reject(new Error('Network error on attempt ' + callCount));
    }, 50);
  });
}

// TODO: Implement fetchWithRetry(fn, maxRetries, delayMs = 100)
// - Calls fn()
// - On failure, waits delayMs then retries (up to maxRetries times)
// - On final failure, throws the last error
// - Logs each attempt number
async function fetchWithRetry(fn, maxRetries, delayMs = 100) {
  // Hint: use a for loop, try/catch inside, and:
  // await new Promise(resolve => setTimeout(resolve, delayMs)) to wait
}

// TODO: Implement withTimeout(promise, ms)
// Returns the promise result if it resolves within ms milliseconds
// Otherwise rejects with: new Error('Operation timed out after Xms')
function withTimeout(promise, ms) {
  // Hint: Promise.race([promise, timeoutPromise])
}

// Test fetchWithRetry
(async () => {
  try {
    callCount = 0;
    const result = await fetchWithRetry(() => flakyFetch('/api/data'), 5, 50);
    console.log('Success after', result.attempt, 'attempt(s):', result.data);
  } catch (err) {
    console.error('Failed after all retries:', err.message);
  }
})();`,
        hints: [
          'for (let attempt = 1; attempt <= maxRetries; attempt++) { try { return await fn(); } catch (err) { if (attempt === maxRetries) throw err; await new Promise(r => setTimeout(r, delayMs)); } }',
          'const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Operation timed out after " + ms + "ms")), ms));',
          'return Promise.race([promise, timeout]);'
        ],
        expectedOutput: `Attempt 1 failed, retrying...
Attempt 2 failed, retrying...
Success after 3 attempt(s): success from /api/data`,
        solution: `let callCount = 0;
function flakyFetch(url) {
  callCount++;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve({ data: 'success from ' + url, attempt: callCount });
      else reject(new Error('Network error on attempt ' + callCount));
    }, 50);
  });
}

async function fetchWithRetry(fn, maxRetries, delayMs = 100) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      console.log('Attempt ' + attempt + ' failed, retrying...');
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out after ' + ms + 'ms')), ms)
  );
  return Promise.race([promise, timeout]);
}

(async () => {
  try {
    callCount = 0;
    const result = await fetchWithRetry(() => flakyFetch('/api/data'), 5, 50);
    console.log('Success after', result.attempt, 'attempt(s):', result.data);
  } catch (err) {
    console.error('Failed after all retries:', err.message);
  }
})();`
      }
    ]
  },

  // ============================================================
  // JS-LAB-4: Event Delegation and Custom Event Systems (from js-4)
  // ============================================================
  {
    id: 'js-lab-4',
    languageId: 'javascript',
    level: 'mid',
    title: 'Event Delegation and Custom Event Systems',
    description: 'Learn efficient event handling with event delegation for dynamic content, build a custom pub/sub EventEmitter, and manage listener cleanup with AbortController.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your JavaScript Environment',
        setupReference: true,
        instruction: 'Before writing JavaScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ (with npm), a code editor with JavaScript extensions (ESLint, Prettier), and browser DevTools. For Node.js projects, create a package.json. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to verify Node.js 20+',
          'Test: `node -e "console.log(\'Hello, World!\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nHello, World!',
        solution: null
      },
      {
        title: 'Step 2: Implement Event Delegation',
        instruction: 'Event delegation attaches a single listener to a parent element instead of adding one to every child. This is critical for dynamic lists — if you add items after page load, those items have no listeners unless you use delegation. The key technique is `event.target.closest(selector)` to find the relevant ancestor from the clicked target.',
        starterCode: `// Event Delegation — single listener handles all child events

// HTML structure:
// <ul id="task-list">
//   <li data-id="1">
//     <span class="task-text">Write tests</span>
//     <button class="complete-btn" data-action="complete">Done</button>
//     <button class="delete-btn" data-action="delete">Remove</button>
//   </li>
// </ul>
// <button id="add-task">Add Random Task</button>

let nextId = 5;

// TODO: Set up ONE event listener on #task-list that handles:
// - Clicking "Done" button (data-action="complete"): toggle class "completed" on the <li>
// - Clicking "Remove" button (data-action="delete"): remove the <li> from the DOM
// Use event.target.dataset.action to detect which button was clicked
// Use event.target.closest('li') to find the parent list item

function setupDelegation() {
  const list = document.getElementById('task-list');
  if (!list) return;

  // TODO: Add single click listener here
}

// TODO: Implement addTask(text) — creates a new <li> with the correct data attributes
// New items must work immediately with the delegated listener (no new listeners needed)
function addTask(text) {
  const list = document.getElementById('task-list');
  if (!list) return;
  // Create li with: data-id, span.task-text, button[data-action="complete"], button[data-action="delete"]
}

setupDelegation();
document.getElementById('add-task')?.addEventListener('click', () => {
  addTask('New task ' + nextId++);
});`,
        hints: [
          'list.addEventListener("click", (e) => { const action = e.target.dataset.action; const li = e.target.closest("li"); })',
          'if (action === "complete") li.classList.toggle("completed")',
          'Build the <li> with createElement + textContent + dataset — avoid innerHTML with user content'
        ],
        expectedOutput: `Clicking Done on any task (including dynamically added) marks it complete
Clicking Remove on any task removes it from the list
A single listener handles all interactions — no per-item listeners`,
        solution: `function setupDelegation() {
  const list = document.getElementById('task-list');
  if (!list) return;

  list.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const li = e.target.closest('li');
    if (!action || !li) return;

    if (action === 'complete') li.classList.toggle('completed');
    if (action === 'delete') li.remove();
  });
}

let nextId = 5;

function addTask(text) {
  const list = document.getElementById('task-list');
  if (!list) return;

  const li = document.createElement('li');
  li.dataset.id = String(nextId++);

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  const doneBtn = document.createElement('button');
  doneBtn.className = 'complete-btn';
  doneBtn.dataset.action = 'complete';
  doneBtn.textContent = 'Done';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'delete-btn';
  removeBtn.dataset.action = 'delete';
  removeBtn.textContent = 'Remove';

  li.append(span, doneBtn, removeBtn);
  list.appendChild(li);
}

setupDelegation();
document.getElementById('add-task')?.addEventListener('click', () => {
  addTask('New task ' + nextId);
});`
      },
      {
        title: 'Step 3: Build a Custom EventEmitter',
        instruction: 'Many JavaScript systems (Node.js, state managers, UI frameworks) use a publish/subscribe (pub/sub) pattern where components emit events and others subscribe without direct coupling. Build your own `EventEmitter` class. This teaches you exactly how `Node.js EventEmitter` and browser `CustomEvent` systems work under the hood.',
        starterCode: `// Custom EventEmitter (pub/sub pattern)

class EventEmitter {
  constructor() {
    // TODO: Initialize a Map to store event listeners
    // this.listeners = ...
  }

  // TODO: on(event, callback) — subscribe to an event
  // Should return an unsubscribe function: () => this.off(event, callback)
  on(event, callback) {
  }

  // TODO: off(event, callback) — remove a specific listener
  off(event, callback) {
  }

  // TODO: emit(event, data) — call all listeners for an event with data
  emit(event, data) {
  }

  // TODO: once(event, callback) — auto-unsubscribes after first call
  once(event, callback) {
    // Hint: wrap callback in a wrapper that calls off() then the original callback
  }
}

// Test your implementation:
const emitter = new EventEmitter();

const unsub = emitter.on('user:login', (user) => {
  console.log('Listener 1 — User logged in:', user.name);
});

emitter.on('user:login', (user) => {
  console.log('Listener 2 — Welcome,', user.name);
});

emitter.once('user:login', (user) => {
  console.log('Once listener fired for:', user.name);
});

emitter.emit('user:login', { name: 'Alice' });
unsub(); // Remove listener 1
emitter.emit('user:login', { name: 'Bob' }); // Only listener 2 fires`,
        hints: [
          'Use new Map() for listeners and new Set() for callbacks per event',
          'on: if (!this.listeners.has(event)) this.listeners.set(event, new Set()); this.listeners.get(event).add(callback);',
          'once: const wrapper = (data) => { this.off(event, wrapper); callback(data); }; this.on(event, wrapper);'
        ],
        expectedOutput: `Listener 1 — User logged in: Alice
Listener 2 — Welcome, Alice
Once listener fired for: Alice
Listener 2 — Welcome, Bob`,
        solution: `class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    this.listeners.get(event)?.delete(callback);
  }

  emit(event, data) {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }

  once(event, callback) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      callback(data);
    };
    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();

const unsub = emitter.on('user:login', (user) => {
  console.log('Listener 1 — User logged in:', user.name);
});

emitter.on('user:login', (user) => {
  console.log('Listener 2 — Welcome,', user.name);
});

emitter.once('user:login', (user) => {
  console.log('Once listener fired for:', user.name);
});

emitter.emit('user:login', { name: 'Alice' });
unsub();
emitter.emit('user:login', { name: 'Bob' });`
      },
      {
        title: 'Step 4: Debounce and Throttle Utilities',
        instruction: 'Debounce delays execution until after a period of inactivity — ideal for search inputs where you want to wait until the user stops typing. Throttle limits how often a function can fire — ideal for scroll or resize handlers. These are among the most commonly asked utility implementations in JavaScript interviews.',
        starterCode: `// Debounce: delays execution until after 'delay' ms of inactivity
// TODO: Implement debounce(fn, delay)
// - Each call resets the timer
// - fn is only called once the timer completes without another call
function debounce(fn, delay) {
  // Hint: use a closure variable for the timer id
}

// Throttle: ensures fn fires at most once per 'interval' ms
// TODO: Implement throttle(fn, interval)
// - First call fires immediately
// - Subsequent calls within 'interval' ms are ignored
function throttle(fn, interval) {
  // Hint: track the last call timestamp with Date.now()
}

// Test debounce
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Simulates typing — only the last call should trigger after 300ms
debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hell');
debouncedSearch('hello'); // Only this should log

// Test throttle
const throttledScroll = throttle((position) => {
  console.log('Scroll position:', position);
}, 200);

// Simulates rapid scroll events — should log at most once per 200ms
[100, 200, 300, 400, 500].forEach((pos, i) => {
  setTimeout(() => throttledScroll(pos), i * 50); // Every 50ms
});`,
        hints: [
          'debounce: let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };',
          'throttle: let lastCall = 0; return (...args) => { const now = Date.now(); if (now - lastCall >= interval) { lastCall = now; fn(...args); } };',
          'Both return a new function (closure) that wraps the original fn'
        ],
        expectedOutput: `Searching for: hello
Scroll position: 100
Scroll position: 300
Scroll position: 500`,
        solution: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, interval) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn(...args);
    }
  };
}

const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hell');
debouncedSearch('hello');

const throttledScroll = throttle((position) => {
  console.log('Scroll position:', position);
}, 200);

[100, 200, 300, 400, 500].forEach((pos, i) => {
  setTimeout(() => throttledScroll(pos), i * 50);
});`
      },
      {
        title: 'Step 5: AbortController for Listener Cleanup',
        instruction: 'Memory leaks from forgotten event listeners are a common source of bugs in long-lived JavaScript apps. `AbortController` (originally for fetch cancellation) can also cancel `addEventListener` calls, enabling clean component-style teardown. This pattern is especially important in single-page apps where components are mounted and unmounted repeatedly.',
        starterCode: `// AbortController for event listener cleanup

// TODO: Create a function setupInteractivePanel(containerEl) that:
// 1. Creates an AbortController
// 2. Attaches multiple event listeners using { signal: controller.signal }
// 3. Returns a cleanup function that calls controller.abort() to remove ALL listeners at once

function setupInteractivePanel(containerEl) {
  // const controller = new AbortController();
  // const { signal } = controller;

  // TODO: Add click listener on containerEl — logs 'Panel clicked'
  // containerEl.addEventListener('click', handler, { signal });

  // TODO: Add keydown listener on document — logs key pressed
  // document.addEventListener('keydown', handler, { signal });

  // TODO: Add a resize listener on window — logs window width
  // window.addEventListener('resize', handler, { signal });

  // Return cleanup
  return function cleanup() {
    // controller.abort(); // Removes ALL listeners added with this signal
    console.log('All listeners removed via AbortController');
  };
}

// Simulate using and then destroying the panel
const containerEl = document.createElement('div');
document.body?.appendChild(containerEl);

const cleanup = setupInteractivePanel(containerEl);

// Simulate interactions
containerEl.click();
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

// Teardown — all listeners removed
cleanup();

// These should NOT trigger any logs after cleanup
containerEl.click();
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
console.log('No listeners fired after cleanup');`,
        hints: [
          'new AbortController() creates a controller; its .signal property is passed to addEventListener',
          'addEventListener("click", fn, { signal }) — the listener auto-removes when signal is aborted',
          'controller.abort() removes ALL listeners sharing that signal simultaneously'
        ],
        expectedOutput: `Panel clicked
Key pressed: Enter
All listeners removed via AbortController
No listeners fired after cleanup`,
        solution: `function setupInteractivePanel(containerEl) {
  const controller = new AbortController();
  const { signal } = controller;

  containerEl.addEventListener('click', () => {
    console.log('Panel clicked');
  }, { signal });

  document.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key);
  }, { signal });

  window.addEventListener('resize', () => {
    console.log('Window width:', window.innerWidth);
  }, { signal });

  return function cleanup() {
    controller.abort();
    console.log('All listeners removed via AbortController');
  };
}

const containerEl = document.createElement('div');
document.body?.appendChild(containerEl);

const cleanup = setupInteractivePanel(containerEl);

containerEl.click();
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

cleanup();

containerEl.click();
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
console.log('No listeners fired after cleanup');`
      }
    ]
  },

  // ============================================================
  // JS-LAB-5: ES2024+ Modern JavaScript Features
  // ============================================================
  {
    id: 'js-lab-5',
    languageId: 'javascript',
    level: 'mid',
    title: 'Modern JavaScript: ES2022–2024 Features',
    description: 'Explore the latest JavaScript features: optional chaining, nullish coalescing, structuredClone, Object.groupBy, Array.at, and the new Set methods.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your JavaScript Environment',
        setupReference: true,
        instruction: 'Before writing JavaScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ (with npm), a code editor with JavaScript extensions (ESLint, Prettier), and browser DevTools. For Node.js projects, create a package.json. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to verify Node.js 20+',
          'Test: `node -e "console.log(\'Hello, World!\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nHello, World!',
        solution: null
      },
      {
        title: 'Step 2: Optional Chaining and Nullish Coalescing',
        instruction: 'Optional chaining (`?.`) safely accesses deeply nested properties without throwing if any intermediate value is null or undefined. Nullish coalescing (`??`) provides a fallback only for null/undefined — unlike `||` which also replaces falsy values like `0` and `""`. These two operators eliminate most of the defensive null-check boilerplate in JavaScript.',
        starterCode: `// Optional chaining (?.) and nullish coalescing (??)

const users = [
  {
    id: 1,
    name: 'Alice',
    address: { city: 'London', postcode: 'EC1A 1BB' },
    settings: { theme: 'dark', notifications: { email: true } }
  },
  {
    id: 2,
    name: 'Bob',
    address: null,
    settings: { theme: 'light' }
  },
  {
    id: 3,
    name: 'Charlie',
    // address is missing entirely
    settings: null
  }
];

// TODO: For each user, safely access:
// 1. user.address?.city — return 'Unknown city' if not present (use ??)
// 2. user.settings?.notifications?.email — return false if not present (use ??)
users.forEach(user => {
  const city = // your code here
  const emailNotif = // your code here
  console.log(user.name + ': city=' + city + ', email notifications=' + emailNotif);
});

// TODO: Use Array.at(-1) to get the last user without .length - 1
const lastUser = // your code using Array.at()
console.log('Last user:', lastUser.name);

// TODO: Demonstrate why ?? is better than || for falsy values
const config = { timeout: 0, retries: 0, label: '' };
console.log('timeout with ||:', config.timeout || 5000);   // Bug: 0 becomes 5000
console.log('timeout with ??:', config.timeout ?? 5000);   // Correct: 0 stays 0
console.log('label with ||:', config.label || 'default');   // Bug: '' becomes 'default'
console.log('label with ??:', config.label ?? 'default');   // Correct: '' stays ''`,
        hints: [
          'user.address?.city ?? "Unknown city" — ?. short-circuits to undefined if address is null',
          'user.settings?.notifications?.email ?? false — chain multiple ?. for deep access',
          'Array.at(-1) returns the last element; Array.at(-2) returns second-to-last'
        ],
        expectedOutput: `Alice: city=London, email notifications=true
Bob: city=Unknown city, email notifications=false
Charlie: city=Unknown city, email notifications=false
Last user: Charlie
timeout with ||: 5000
timeout with ??: 0
label with ||: default
label with ??: `,
        solution: `const users = [
  {
    id: 1, name: 'Alice',
    address: { city: 'London', postcode: 'EC1A 1BB' },
    settings: { theme: 'dark', notifications: { email: true } }
  },
  { id: 2, name: 'Bob', address: null, settings: { theme: 'light' } },
  { id: 3, name: 'Charlie', settings: null }
];

users.forEach(user => {
  const city = user.address?.city ?? 'Unknown city';
  const emailNotif = user.settings?.notifications?.email ?? false;
  console.log(user.name + ': city=' + city + ', email notifications=' + emailNotif);
});

const lastUser = users.at(-1);
console.log('Last user:', lastUser.name);

const config = { timeout: 0, retries: 0, label: '' };
console.log('timeout with ||:', config.timeout || 5000);
console.log('timeout with ??:', config.timeout ?? 5000);
console.log('label with ||:', config.label || 'default');
console.log('label with ??:', config.label ?? 'default');`
      },
      {
        title: 'Step 3: Object.groupBy and Array Grouping',
        instruction: '`Object.groupBy` (ES2024) groups array elements by a key function into an object — replacing the common `reduce` grouping pattern with a built-in. Combined with `Map.groupBy` for non-string keys, this dramatically simplifies data aggregation code. Learn both the new built-in and the polyfill pattern for environments that do not yet support it.',
        starterCode: `// Object.groupBy — ES2024 array grouping

const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 999 },
  { id: 2, name: 'T-Shirt', category: 'clothing', price: 29 },
  { id: 3, name: 'Headphones', category: 'electronics', price: 149 },
  { id: 4, name: 'Jeans', category: 'clothing', price: 59 },
  { id: 5, name: 'Phone', category: 'electronics', price: 799 },
  { id: 6, name: 'Jacket', category: 'clothing', price: 119 },
];

// TODO: Use Object.groupBy to group products by category
const byCategory = Object.groupBy(products, product => product.category);
console.log('Electronics:', byCategory.electronics?.map(p => p.name));
console.log('Clothing:', byCategory.clothing?.map(p => p.name));

// TODO: Use Object.groupBy to group by price range
// 'budget' if price < 50, 'mid' if price < 300, 'premium' otherwise
const byPriceRange = Object.groupBy(products, product => {
  // your code here
});
console.log('Budget items:', byPriceRange.budget?.map(p => p.name));
console.log('Premium items:', byPriceRange.premium?.map(p => p.name));

// TODO: Write a polyfill for environments without Object.groupBy
// Implement groupBy(array, keyFn) using reduce
function groupBy(array, keyFn) {
  // your code here
}

const manual = groupBy(products, p => p.category);
console.log('Manual groupBy works:', manual.electronics?.length === byCategory.electronics?.length);`,
        hints: [
          'Object.groupBy(array, item => item.property) — second arg is a callback returning the group key',
          'For price ranges: if (price < 50) return "budget"; if (price < 300) return "mid"; return "premium";',
          'Polyfill: return array.reduce((acc, item) => { const key = keyFn(item); (acc[key] ??= []).push(item); return acc; }, {});'
        ],
        expectedOutput: `Electronics: ['Laptop', 'Headphones', 'Phone']
Clothing: ['T-Shirt', 'Jeans', 'Jacket']
Budget items: ['T-Shirt']
Premium items: ['Laptop', 'Phone']
Manual groupBy works: true`,
        solution: `const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 999 },
  { id: 2, name: 'T-Shirt', category: 'clothing', price: 29 },
  { id: 3, name: 'Headphones', category: 'electronics', price: 149 },
  { id: 4, name: 'Jeans', category: 'clothing', price: 59 },
  { id: 5, name: 'Phone', category: 'electronics', price: 799 },
  { id: 6, name: 'Jacket', category: 'clothing', price: 119 },
];

const byCategory = Object.groupBy(products, product => product.category);
console.log('Electronics:', byCategory.electronics?.map(p => p.name));
console.log('Clothing:', byCategory.clothing?.map(p => p.name));

const byPriceRange = Object.groupBy(products, product => {
  if (product.price < 50) return 'budget';
  if (product.price < 300) return 'mid';
  return 'premium';
});
console.log('Budget items:', byPriceRange.budget?.map(p => p.name));
console.log('Premium items:', byPriceRange.premium?.map(p => p.name));

function groupBy(array, keyFn) {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}

const manual = groupBy(products, p => p.category);
console.log('Manual groupBy works:', manual.electronics?.length === byCategory.electronics?.length);`
      },
      {
        title: 'Step 4: structuredClone and Immutable Updates',
        instruction: '`structuredClone` (ES2022) creates a true deep copy of an object or array, solving the long-standing problem of shallow copies from `Object.assign` and spread. It handles nested objects, arrays, Dates, Maps, Sets, and more. Pair it with immutable update patterns to avoid mutating shared state — a key concept in React state management and functional programming.',
        starterCode: `// structuredClone and immutable updates

const appState = {
  user: { name: 'Alice', preferences: { theme: 'dark', language: 'en' } },
  cart: [
    { id: 1, name: 'Widget', qty: 2 },
    { id: 2, name: 'Gadget', qty: 1 },
  ],
  metadata: { lastUpdated: new Date('2024-01-15'), version: 3 }
};

// Problem with spread — it is only ONE level deep:
const shallowCopy = { ...appState };
shallowCopy.user.name = 'Bob'; // Mutates the ORIGINAL user object
console.log('Original name after shallow mutation:', appState.user.name); // 'Bob' — oops!

// TODO: Use structuredClone to deep copy appState
// Then modify the clone — prove the original is unaffected
const deepCopy = // your code here
deepCopy.user.name = 'Charlie';
deepCopy.cart[0].qty = 99;
console.log('Original name after deep clone mutation:', appState.user.name);
console.log('Original cart[0].qty after deep clone mutation:', appState.cart[0].qty);

// TODO: Write an immutable cart update function
// updateCartItem(cart, itemId, newQty) returns a NEW array with the updated item
// The original cart array must not be modified
function updateCartItem(cart, itemId, newQty) {
  // Hint: use map — return a new object for the matching item, unchanged object for others
}

const originalCart = [
  { id: 1, name: 'Widget', qty: 2 },
  { id: 2, name: 'Gadget', qty: 1 },
];
const updatedCart = updateCartItem(originalCart, 1, 5);
console.log('Original qty:', originalCart[0].qty); // Should still be 2
console.log('Updated qty:', updatedCart[0].qty);   // Should be 5`,
        hints: [
          'structuredClone(obj) returns a complete deep copy — works with nested objects, arrays, Dates',
          'updateCartItem: return cart.map(item => item.id === itemId ? { ...item, qty: newQty } : item)',
          'Spread { ...item, qty: newQty } creates a new object with all existing properties plus the override'
        ],
        expectedOutput: `Original name after shallow mutation: Bob
Original name after deep clone mutation: Bob
Original cart[0].qty after deep clone mutation: 2
Original qty: 2
Updated qty: 5`,
        solution: `const appState = {
  user: { name: 'Alice', preferences: { theme: 'dark', language: 'en' } },
  cart: [
    { id: 1, name: 'Widget', qty: 2 },
    { id: 2, name: 'Gadget', qty: 1 },
  ],
  metadata: { lastUpdated: new Date('2024-01-15'), version: 3 }
};

const shallowCopy = { ...appState };
shallowCopy.user.name = 'Bob';
console.log('Original name after shallow mutation:', appState.user.name);

const deepCopy = structuredClone(appState);
deepCopy.user.name = 'Charlie';
deepCopy.cart[0].qty = 99;
console.log('Original name after deep clone mutation:', appState.user.name);
console.log('Original cart[0].qty after deep clone mutation:', appState.cart[0].qty);

function updateCartItem(cart, itemId, newQty) {
  return cart.map(item => item.id === itemId ? { ...item, qty: newQty } : item);
}

const originalCart = [
  { id: 1, name: 'Widget', qty: 2 },
  { id: 2, name: 'Gadget', qty: 1 },
];
const updatedCart = updateCartItem(originalCart, 1, 5);
console.log('Original qty:', originalCart[0].qty);
console.log('Updated qty:', updatedCart[0].qty);`
      },
      {
        title: 'Step 5: New Set Methods (ES2024)',
        instruction: 'ES2024 adds built-in Set methods for union, intersection, difference, and symmetric difference — operations that previously required verbose custom code. Learn both the new built-ins and the polyfill patterns for older environments. These are especially useful when working with permissions, feature flags, and user group membership logic.',
        starterCode: `// New Set methods (ES2024)

const premiumUsers = new Set(['alice', 'bob', 'charlie', 'diana']);
const activeUsers = new Set(['bob', 'charlie', 'eve', 'frank']);

// TODO: Use the new Set methods:

// 1. Union — all users in either group
const allUsers = premiumUsers.union(activeUsers);
console.log('All users:', [...allUsers]);

// 2. Intersection — users in BOTH groups
const premiumAndActive = premiumUsers.intersection(activeUsers);
console.log('Premium AND active:', [...premiumAndActive]);

// 3. Difference — premium users who are NOT active
const premiumNotActive = premiumUsers.difference(activeUsers);
console.log('Premium but not active:', [...premiumNotActive]);

// 4. Symmetric difference — users in one group but not both
const exclusiveToEither = premiumUsers.symmetricDifference(activeUsers);
console.log('Exclusive to either group:', [...exclusiveToEither]);

// 5. isSubsetOf / isSupersetOf checks
const vipUsers = new Set(['alice', 'bob']);
console.log('VIP is subset of premium:', vipUsers.isSubsetOf(premiumUsers));
console.log('Premium is superset of VIP:', premiumUsers.isSupersetOf(vipUsers));

// TODO: Write polyfills for the three most common operations
// (for environments that do not yet support the new methods)
function setUnion(a, b) { /* your code */ }
function setIntersection(a, b) { /* your code */ }
function setDifference(a, b) { /* your code */ }

console.log('Polyfill union:', [...setUnion(premiumUsers, activeUsers)]);
console.log('Polyfill intersection:', [...setIntersection(premiumUsers, activeUsers)]);
console.log('Polyfill difference:', [...setDifference(premiumUsers, activeUsers)]);`,
        hints: [
          'premiumUsers.union(activeUsers) returns a new Set — available in Node 22+ and modern browsers',
          'setUnion: new Set([...a, ...b])',
          'setIntersection: new Set([...a].filter(x => b.has(x)))',
          'setDifference: new Set([...a].filter(x => !b.has(x)))'
        ],
        expectedOutput: `All users: ['alice', 'bob', 'charlie', 'diana', 'eve', 'frank']
Premium AND active: ['bob', 'charlie']
Premium but not active: ['alice', 'diana']
Exclusive to either group: ['alice', 'diana', 'eve', 'frank']
VIP is subset of premium: true
Premium is superset of VIP: true
Polyfill union: ['alice', 'bob', 'charlie', 'diana', 'eve', 'frank']
Polyfill intersection: ['bob', 'charlie']
Polyfill difference: ['alice', 'diana']`,
        solution: `const premiumUsers = new Set(['alice', 'bob', 'charlie', 'diana']);
const activeUsers = new Set(['bob', 'charlie', 'eve', 'frank']);

const allUsers = premiumUsers.union(activeUsers);
console.log('All users:', [...allUsers]);

const premiumAndActive = premiumUsers.intersection(activeUsers);
console.log('Premium AND active:', [...premiumAndActive]);

const premiumNotActive = premiumUsers.difference(activeUsers);
console.log('Premium but not active:', [...premiumNotActive]);

const exclusiveToEither = premiumUsers.symmetricDifference(activeUsers);
console.log('Exclusive to either group:', [...exclusiveToEither]);

const vipUsers = new Set(['alice', 'bob']);
console.log('VIP is subset of premium:', vipUsers.isSubsetOf(premiumUsers));
console.log('Premium is superset of VIP:', premiumUsers.isSupersetOf(vipUsers));

function setUnion(a, b) { return new Set([...a, ...b]); }
function setIntersection(a, b) { return new Set([...a].filter(x => b.has(x))); }
function setDifference(a, b) { return new Set([...a].filter(x => !b.has(x))); }

console.log('Polyfill union:', [...setUnion(premiumUsers, activeUsers)]);
console.log('Polyfill intersection:', [...setIntersection(premiumUsers, activeUsers)]);
console.log('Polyfill difference:', [...setDifference(premiumUsers, activeUsers)]);`
      }
    ]
  },

  // ============================================================
  // JS-LAB-6: Custom Observable Pattern (from js-5 sandbox example)
  // ============================================================
  {
    id: 'js-lab-6',
    languageId: 'javascript',
    level: 'senior',
    title: 'Custom Observable Implementation',
    description: 'Build a lightweight Observable pattern from scratch — the foundation of RxJS. Implement operators (map, filter, take, debounceTime), understand subscription lifecycle, and manage cleanup to prevent memory leaks.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your JavaScript Environment',
        setupReference: true,
        instruction: 'Before writing JavaScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ (with npm), a code editor with JavaScript extensions (ESLint, Prettier), and browser DevTools. For Node.js projects, create a package.json. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to verify Node.js 20+',
          'Test: `node -e "console.log(\'Hello, World!\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nHello, World!',
        solution: null
      },
      {
        title: 'Step 2: Build the Observable Core',
        instruction: 'An Observable is a function that, when subscribed to, pushes values to an observer over time. Unlike a Promise (one value, eager), an Observable can emit zero, one, or many values lazily (only when subscribed). The subscribe function takes an observer object with `next`, `error`, and `complete` callbacks. This is the exact architecture behind RxJS.',
        starterCode: `// Observable Core

class Observable {
  // TODO: The constructor receives a 'subscribeFn' — a function called with an observer
  // when subscribe() is called. Store it as this._subscribe.
  constructor(subscribeFn) {
    // your code here
  }

  // TODO: subscribe(observer) — calls this._subscribe with a safe observer
  // A 'safe observer' wraps the raw observer so next/error/complete always exist
  // Returns: { unsubscribe: () => cleanup() }
  subscribe(observer) {
    // Safe observer defaults:
    // next: observer.next || (() => {})
    // error: observer.error || ((err) => { throw err; })
    // complete: observer.complete || (() => {})
  }
}

// Test: synchronous Observable from an array of values
const numbers$ = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

numbers$.subscribe({
  next: (val) => console.log('Value:', val),
  complete: () => console.log('Complete!'),
});

// Test: interval Observable — emits every 200ms, unsubscribes after 700ms
const interval$ = new Observable((observer) => {
  let count = 0;
  const id = setInterval(() => observer.next(count++), 200);
  return () => clearInterval(id); // cleanup function
});

const sub = interval$.subscribe({ next: (val) => console.log('Interval:', val) });
setTimeout(() => { sub.unsubscribe(); console.log('Unsubscribed'); }, 700);`,
        hints: [
          'Store subscribeFn: this._subscribe = subscribeFn;',
          'const cleanup = this._subscribe(safeObserver); return { unsubscribe: () => { if (cleanup) cleanup(); } };',
          'safeObserver = { next: observer.next || (() => {}), error: ..., complete: ... }'
        ],
        expectedOutput: `Value: 1
Value: 2
Value: 3
Complete!
Interval: 0
Interval: 1
Interval: 2
Unsubscribed`,
        solution: `class Observable {
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
}

const numbers$ = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

numbers$.subscribe({
  next: (val) => console.log('Value:', val),
  complete: () => console.log('Complete!'),
});

const interval$ = new Observable((observer) => {
  let count = 0;
  const id = setInterval(() => observer.next(count++), 200);
  return () => clearInterval(id);
});

const sub = interval$.subscribe({ next: (val) => console.log('Interval:', val) });
setTimeout(() => { sub.unsubscribe(); console.log('Unsubscribed'); }, 700);`
      },
      {
        title: 'Step 3: Add map, filter, and take Operators',
        instruction: 'Operators are methods on Observable that return a NEW Observable, allowing fluent chaining. Each operator subscribes to the source, transforms values, and forwards them to a new observer. This is "operator chaining" — the same pattern used in RxJS. Understanding how operators compose by wrapping each other is essential for reactive programming at the senior level.',
        starterCode: `class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }

  subscribe(observer) {
    const safe = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safe);
    return { unsubscribe: () => { if (cleanup) cleanup(); } };
  }

  // TODO: map(transformFn) — returns a new Observable
  // Subscribe to 'this', apply transformFn to each value, emit to new observer
  map(transformFn) {
    return new Observable((observer) => {
      const sub = this.subscribe({
        // next: transform the value then call observer.next(transformed)
        // error: forward to observer.error
        // complete: forward to observer.complete
      });
      return () => sub.unsubscribe();
    });
  }

  // TODO: filter(predicateFn) — only emit values where predicateFn returns true
  filter(predicateFn) {
    return new Observable((observer) => {
      // Similar to map, but only call observer.next if predicateFn(value) is true
    });
  }

  // TODO: take(count) — emit only the first N values, then complete
  take(count) {
    return new Observable((observer) => {
      let taken = 0;
      const sub = this.subscribe({
        next: (value) => {
          // Emit value, increment taken
          // When taken === count: call observer.complete(), then sub.unsubscribe()
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
      return () => sub.unsubscribe();
    });
  }

  static from(array) {
    return new Observable((observer) => {
      array.forEach(item => observer.next(item));
      observer.complete();
    });
  }
}

// Test: from [1..10], filter evens, multiply by 10, take first 3
Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(3)
  .subscribe({
    next: (val) => console.log('Value:', val),
    complete: () => console.log('Done!'),
  });`,
        hints: [
          'map next: (value) => observer.next(transformFn(value))',
          'filter next: (value) => { if (predicateFn(value)) observer.next(value); }',
          'take next: if (taken < count) { observer.next(value); taken++; if (taken === count) { observer.complete(); sub.unsubscribe(); } }'
        ],
        expectedOutput: `Value: 20
Value: 40
Value: 60
Done!`,
        solution: `class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }

  subscribe(observer) {
    const safe = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safe);
    return { unsubscribe: () => { if (cleanup) cleanup(); } };
  }

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

  static from(array) {
    return new Observable((observer) => {
      array.forEach(item => observer.next(item));
      observer.complete();
    });
  }
}

Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .take(3)
  .subscribe({
    next: (val) => console.log('Value:', val),
    complete: () => console.log('Done!'),
  });`
      },
      {
        title: 'Step 4: Implement debounceTime Operator',
        instruction: 'The `debounceTime(ms)` operator only emits a value if no new value arrives within `ms` milliseconds — exactly like the debounce utility function but as a composable Observable operator. This is one of the most used RxJS operators for handling search inputs, form validation, and any rapid-fire event streams.',
        starterCode: `class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }

  subscribe(observer) {
    const safe = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safe);
    return { unsubscribe: () => { if (cleanup) cleanup(); } };
  }

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

  // TODO: Implement debounceTime(ms) operator
  // - Each time a new value arrives, cancel the pending timer and start a new one
  // - Only emit a value after 'ms' ms of silence (no new values)
  // - Cleanup: clear the timer on unsubscribe
  debounceTime(ms) {
    return new Observable((observer) => {
      let timer;
      const sub = this.subscribe({
        next: (value) => {
          // Cancel previous timer, start new one that emits after ms
        },
        error: (err) => observer.error(err),
        complete: () => {
          // When source completes, emit any pending value then complete
        },
      });
      return () => {
        clearTimeout(timer);
        sub.unsubscribe();
      };
    });
  }
}

// Test: simulate rapid keystrokes — debounce should only emit the last one
const keystrokes$ = new Observable((observer) => {
  const keys = ['h', 'he', 'hel', 'hell', 'hello'];
  keys.forEach((key, i) => setTimeout(() => observer.next(key), i * 50)); // 50ms apart
  setTimeout(() => observer.complete(), keys.length * 50 + 50);
});

keystrokes$
  .debounceTime(200) // Only emit if no new keystroke within 200ms
  .subscribe({
    next: (val) => console.log('Search query:', val),
    complete: () => console.log('Done'),
  });`,
        hints: [
          'next: clearTimeout(timer); timer = setTimeout(() => observer.next(value), ms);',
          'Track lastValue and hasPending in the closure so you can emit on complete',
          'complete: clearTimeout(timer); if (hasPending) observer.next(lastValue); observer.complete();'
        ],
        expectedOutput: `Search query: hello
Done`,
        solution: `class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }

  subscribe(observer) {
    const safe = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safe);
    return { unsubscribe: () => { if (cleanup) cleanup(); } };
  }

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

  debounceTime(ms) {
    return new Observable((observer) => {
      let timer;
      let lastValue;
      let hasPending = false;

      const sub = this.subscribe({
        next: (value) => {
          clearTimeout(timer);
          lastValue = value;
          hasPending = true;
          timer = setTimeout(() => {
            hasPending = false;
            observer.next(value);
          }, ms);
        },
        error: (err) => observer.error(err),
        complete: () => {
          clearTimeout(timer);
          if (hasPending) observer.next(lastValue);
          observer.complete();
        },
      });
      return () => {
        clearTimeout(timer);
        sub.unsubscribe();
      };
    });
  }
}

const keystrokes$ = new Observable((observer) => {
  const keys = ['h', 'he', 'hel', 'hell', 'hello'];
  keys.forEach((key, i) => setTimeout(() => observer.next(key), i * 50));
  setTimeout(() => observer.complete(), keys.length * 50 + 50);
});

keystrokes$
  .debounceTime(200)
  .subscribe({
    next: (val) => console.log('Search query:', val),
    complete: () => console.log('Done'),
  });`
      },
      {
        title: 'Step 5: Build a Subject (Hot Observable)',
        instruction: 'A Subject is both an Observable and an Observer — you can push values into it imperatively and multiple subscribers all receive the same values simultaneously. This is called a "hot" observable (vs "cold" observables where each subscriber gets its own execution). Subjects are fundamental to building reactive state stores, real-time data streams, and bridging imperative and reactive code.',
        starterCode: `class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }
  subscribe(observer) {
    const safe = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safe);
    return { unsubscribe: () => { if (cleanup) cleanup(); } };
  }
}

// TODO: Implement Subject — extends Observable and acts as its own observer
// A Subject maintains a Set of observers and multicasts to all of them
class Subject extends Observable {
  constructor() {
    // Call super with a subscribe function that adds the observer to this._observers
    // and returns a cleanup that removes it
    super((observer) => {
      // TODO: Add observer to this._observers
      // Return: () => this._observers.delete(observer)
    });
    this._observers = new Set();
  }

  // TODO: next(value) — emit value to all current subscribers
  next(value) {
  }

  // TODO: error(err) — propagate error to all subscribers
  error(err) {
  }

  // TODO: complete() — complete all subscribers and clear the set
  complete() {
  }
}

// Test: two subscribers receive the same values from one Subject
const subject = new Subject();

const sub1 = subject.subscribe({ next: (v) => console.log('Sub1:', v) });
const sub2 = subject.subscribe({ next: (v) => console.log('Sub2:', v) });

subject.next('first');   // Both sub1 and sub2 receive 'first'
subject.next('second');  // Both receive 'second'

sub1.unsubscribe();      // sub1 is removed

subject.next('third');   // Only sub2 receives 'third'
subject.complete();`,
        hints: [
          'super((observer) => { this._observers.add(observer); return () => this._observers.delete(observer); });',
          'next(value) { this._observers.forEach(obs => obs.next(value)); }',
          'complete() { this._observers.forEach(obs => obs.complete()); this._observers.clear(); }'
        ],
        expectedOutput: `Sub1: first
Sub2: first
Sub1: second
Sub2: second
Sub2: third`,
        solution: `class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }
  subscribe(observer) {
    const safe = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => { throw err; }),
      complete: observer.complete || (() => {}),
    };
    const cleanup = this._subscribe(safe);
    return { unsubscribe: () => { if (cleanup) cleanup(); } };
  }
}

class Subject extends Observable {
  constructor() {
    super((observer) => {
      this._observers.add(observer);
      return () => this._observers.delete(observer);
    });
    this._observers = new Set();
  }

  next(value) {
    this._observers.forEach(obs => obs.next(value));
  }

  error(err) {
    this._observers.forEach(obs => obs.error(err));
    this._observers.clear();
  }

  complete() {
    this._observers.forEach(obs => obs.complete());
    this._observers.clear();
  }
}

const subject = new Subject();

const sub1 = subject.subscribe({ next: (v) => console.log('Sub1:', v) });
const sub2 = subject.subscribe({ next: (v) => console.log('Sub2:', v) });

subject.next('first');
subject.next('second');

sub1.unsubscribe();

subject.next('third');
subject.complete();`
      }
    ]
  }
];
