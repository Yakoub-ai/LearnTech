export const labs = [
  // ============================================================
  // ts-lab-1: existing lab from interactiveLabs.js
  // ============================================================
  {
    id: 'ts-lab-1',
    languageId: 'typescript',
    level: 'beginner',
    title: 'Type a JavaScript Module',
    description: 'Learn TypeScript basics by adding types to an existing JavaScript module: basic types, interfaces, generics, and type guards.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Add Basic Type Annotations',
        instruction: 'Convert plain JavaScript functions to TypeScript by adding type annotations for parameters and return values.',
        starterCode: `// TODO: Add TypeScript types to these JavaScript functions

// Convert this JS function to TS:
function greet(name) {
  return "Hello, " + name + "!";
}

// Convert: handle optional and default parameters
function createUser(name, age, email) {
  return { name, age, email: email || "not provided" };
}

// Convert: handle arrays and return type
function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// Convert: handle union types (value can be string or number)
function formatValue(value) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}`,
        hints: [
          'greet(name: string): string',
          'Optional params: email?: string. Default: age: number = 0',
          'Union types: value: string | number'
        ],
        expectedOutput: `function greet(name: string): string
function createUser(name: string, age: number, email?: string): {...}
function sum(numbers: number[]): number
function formatValue(value: string | number): string`,
        solution: `function greet(name: string): string {
  return "Hello, " + name + "!";
}

function createUser(
  name: string,
  age: number,
  email?: string
): { name: string; age: number; email: string } {
  return { name, age, email: email || "not provided" };
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

function formatValue(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}`
      },
      {
        title: 'Step 3: Define Interfaces',
        instruction: 'Create TypeScript interfaces for a blog system: Post, Author, and Comment.',
        starterCode: `// TODO: Define interfaces for a blog system

// Interface: Author
// - id: number
// - name: string
// - email: string
// - bio?: string (optional)

// Interface: Comment
// - id: number
// - author: Author
// - text: string
// - createdAt: Date

// Interface: Post
// - id: number
// - title: string
// - content: string
// - author: Author
// - tags: string[]
// - comments: Comment[]
// - published: boolean
// - createdAt: Date
// - updatedAt?: Date (optional)

// TODO: Create a function that takes a Post and returns a summary string
// Format: "Title by Author (X comments)"

// TODO: Create a function that filters posts by tag`,
        hints: [
          'interface Author { id: number; name: string; ... }',
          'Use the interfaces as types: function getPostSummary(post: Post): string',
          'Filter: posts.filter(p => p.tags.includes(tag))'
        ],
        expectedOutput: `interface Author { id: number; name: string; email: string; bio?: string }
interface Post { ... }
getPostSummary(post) → "My Post by Alice (3 comments)"
filterByTag(posts, "typescript") → Post[]`,
        solution: `interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

interface Comment {
  id: number;
  author: Author;
  text: string;
  createdAt: Date;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  tags: string[];
  comments: Comment[];
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

function getPostSummary(post: Post): string {
  return \`\${post.title} by \${post.author.name} (\${post.comments.length} comments)\`;
}

function filterByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(p => p.tags.includes(tag));
}`
      },
      {
        title: 'Step 4: Use Generics',
        instruction: 'Create generic utility functions that work with any type while maintaining type safety.',
        starterCode: `// TODO: Implement generic utility functions

// Generic function: first element of any array
// function first<T>(arr: T[]): T | undefined

// Generic function: unique values from an array
// function unique<T>(arr: T[]): T[]

// Generic interface: API response wrapper
// interface ApiResponse<T> { data: T; status: number; message: string }

// Generic function: create a typed API response
// function createResponse<T>(data: T, status: number, message: string): ApiResponse<T>

// Test your generics:
// first([1, 2, 3]) → number
// first(["a", "b"]) → string
// unique([1, 2, 2, 3, 3]) → [1, 2, 3]
// createResponse({ name: "Alice" }, 200, "OK") → ApiResponse<{name: string}>`,
        hints: [
          'function first<T>(arr: T[]): T | undefined { return arr[0]; }',
          'unique: return [...new Set(arr)] or use Array.from(new Set(arr))',
          'The generic T flows through: createResponse<User>(user, 200, "OK") returns ApiResponse<User>'
        ],
        expectedOutput: `first([1,2,3]) → 1 (type: number)
unique([1,2,2,3]) → [1,2,3] (type: number[])
createResponse(user, 200, "OK") → { data: User, status: 200, message: "OK" }`,
        solution: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function createResponse<T>(data: T, status: number, message: string): ApiResponse<T> {
  return { data, status, message };
}

// Usage — TypeScript infers the generic type:
const num = first([1, 2, 3]);         // number | undefined
const str = first(["a", "b"]);        // string | undefined
const nums = unique([1, 2, 2, 3, 3]); // number[]

const response = createResponse(
  { name: "Alice", age: 30 },
  200,
  "OK"
); // ApiResponse<{ name: string; age: number }>`
      }
    ]
  },

  // ============================================================
  // ts-lab-2: Type Annotations Basics (from ts-1)
  // ============================================================
  {
    id: 'ts-lab-2',
    languageId: 'typescript',
    level: 'beginner',
    title: 'Type Annotations Basics',
    description: 'Master TypeScript fundamentals: primitive types, arrays, object shapes, function signatures, union types, tuple types, and literal types with type inference.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Primitive Types and Arrays',
        instruction: `Add explicit type annotations to all variables below. TypeScript can infer types automatically, but writing them explicitly helps you build the mental model for what each variable holds.\n\nWHY: Explicit annotations are self-documenting and catch errors at the declaration site rather than deep in usage. TypeScript's primitive types map directly to JavaScript's runtime types, so there are no hidden conversions.\n\nHOW: Use a colon followed by the type after the variable name: \`let name: string = "Alice"\`. For arrays, append \`[]\` to the element type or use the generic \`Array<T>\` form.`,
        starterCode: `// Add type annotations to every variable declaration

let username = "Alice";
let age = 30;
let isActive = true;
let score = null;
let pending = undefined;

// Arrays — annotate each
let scores = [95, 87, 92];
let tags = ["typescript", "node", "react"];

// Object type — annotate the shape inline
let user = {
  name: "Alice",
  age: 30,
};

// TODO: Add a third property 'email' of type string (optional)

console.log(username, age, isActive);
console.log(scores, tags);
console.log(user);`,
        hints: [
          'Primitive annotations: let username: string = "Alice"',
          'Array shorthand: let scores: number[] = [95, 87, 92]',
          'Optional object property: email?: string inside the inline type'
        ],
        expectedOutput: `Alice 30 true
[95, 87, 92] ['typescript', 'node', 'react']
{ name: 'Alice', age: 30 }`,
        solution: `let username: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
let score: number | null = null;
let pending: undefined = undefined;

let scores: number[] = [95, 87, 92];
let tags: string[] = ["typescript", "node", "react"];

let user: { name: string; age: number; email?: string } = {
  name: "Alice",
  age: 30,
};

console.log(username, age, isActive);
console.log(scores, tags);
console.log(user);`
      },
      {
        title: 'Step 3: Function Signatures and Union Types',
        instruction: `TypeScript shines in function signatures — annotate parameters, return types, and use union types to express values that can be one of several types.\n\nWHY: Annotated function signatures act as contracts. Callers know exactly what they can pass in and what they will receive back. The compiler rejects mismatched calls before runtime.\n\nHOW: \`function greet(name: string, greeting: string = "Hello"): string\`. For union types use the pipe operator: \`string | number\`. Narrow unions inside the function body with \`typeof\`.`,
        starterCode: `// TODO: Add type annotations to each function

function greet(name, greeting = "Hello") {
  return greeting + ", " + name + "!";
}

// Arrow function — annotate parameters and return type
const add = (a, b) => a + b;

// void return type — the function logs but returns nothing
function logMessage(msg) {
  console.log(msg);
}

// Union type: value can be string or number
// Use typeof narrowing to handle both branches
function formatValue(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

console.log(greet("World"));
console.log(add(3, 4));
logMessage("hello from TypeScript");
console.log(formatValue("hello"), formatValue(3.14159));`,
        hints: [
          'Default parameter still needs an annotation: greeting: string = "Hello"',
          'Arrow function: const add = (a: number, b: number): number => a + b',
          'Union: function formatValue(value: string | number): string'
        ],
        expectedOutput: `Hello, World!
7
hello from TypeScript
HELLO 3.14`,
        solution: `function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}

const add = (a: number, b: number): number => a + b;

function logMessage(msg: string): void {
  console.log(msg);
}

function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

console.log(greet("World"));
console.log(add(3, 4));
logMessage("hello from TypeScript");
console.log(formatValue("hello"), formatValue(3.14159));`
      },
      {
        title: 'Step 4: Tuple Types and Literal Types',
        instruction: `Tuple types encode fixed-length arrays where each position has its own type. Literal types restrict a variable to a precise set of allowed values, turning strings and numbers into enum-like constraints.\n\nWHY: Tuples are useful when a function returns two related values of different types (e.g., \`[value, setter]\`). Literal types eliminate invalid states at compile time — a \`direction\` that can only be one of four strings prevents typos and bad data.\n\nHOW: Tuple syntax: \`[string, number]\`. Literal union: \`"north" | "south" | "east" | "west"\`.`,
        starterCode: `// Tuple types — fixed-length, mixed-type arrays
// TODO: annotate these tuples
let coordinates = [10.5, 20.3];   // two numbers
let entry = ["Alice", 30];         // string then number
let rgb = [255, 128, 0];           // three numbers (a colour)

// Literal types — restrict to exact values
// TODO: annotate with a literal union type
let direction = "north";
let httpMethod = "GET";
let status = "pending";

// TODO: Write a function 'move' that accepts a direction literal
// and returns a string describing the movement
// e.g. move("north") → "Moving north"

// TODO: Write a function 'parseCoord' that accepts a coordinate
// tuple [number, number] and returns a formatted string
// e.g. parseCoord([10.5, 20.3]) → "lat: 10.5, lng: 20.3"

console.log(coordinates, entry, rgb);
console.log(direction, httpMethod, status);`,
        hints: [
          'Tuple: let coordinates: [number, number] = [10.5, 20.3]',
          'Literal union: let direction: "north" | "south" | "east" | "west" = "north"',
          'Function param: function move(dir: "north" | "south" | "east" | "west"): string'
        ],
        expectedOutput: `[10.5, 20.3] ['Alice', 30] [255, 128, 0]
north GET pending
Moving north
lat: 10.5, lng: 20.3`,
        solution: `let coordinates: [number, number] = [10.5, 20.3];
let entry: [string, number] = ["Alice", 30];
let rgb: [number, number, number] = [255, 128, 0];

type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Status = "pending" | "active" | "completed" | "cancelled";

let direction: Direction = "north";
let httpMethod: HttpMethod = "GET";
let status: Status = "pending";

function move(dir: Direction): string {
  return \`Moving \${dir}\`;
}

function parseCoord(coord: [number, number]): string {
  return \`lat: \${coord[0]}, lng: \${coord[1]}\`;
}

console.log(coordinates, entry, rgb);
console.log(direction, httpMethod, status);
console.log(move("north"));
console.log(parseCoord([10.5, 20.3]));`
      },
      {
        title: 'Step 5: Type Inference and the describe Function',
        instruction: `TypeScript infers types from initial values — you do not always need to write annotations. In this step, explore inference and then implement the exercise from the sandbox: a \`describe\` function that takes a \`Person\` object with an optional \`role\` field.\n\nWHY: Understanding where inference works lets you write concise code without sacrificing safety. Knowing when to add explicit annotations (function signatures, return types) is the key professional skill.\n\nHOW: Hover over variables in VS Code to see the inferred type. For the \`describe\` function, use an interface for \`Person\` and a template literal for the return string.`,
        starterCode: `// TypeScript infers these types automatically — no annotation needed
let inferred = "hello";   // hover in VS Code: string
let inferredNum = 42;     // hover: number
let inferredArr = [1, 2]; // hover: number[]

// TODO: Define a Person interface with:
// - name: string
// - age: number
// - role?: string (optional)

// TODO: Implement describe(person: Person): string
// If role is provided: "Alice (30) — Developer"
// If no role:          "Alice (30)"

// Test cases
// describe({ name: "Alice", age: 30, role: "Developer" })
// → "Alice (30) — Developer"
// describe({ name: "Bob", age: 25 })
// → "Bob (25)"`,
        hints: [
          'interface Person { name: string; age: number; role?: string }',
          'Use a ternary for the optional role: person.role ? \` — \${person.role}\` : ""',
          'Template literal: `\${person.name} (\${person.age})\${rolePart}`'
        ],
        expectedOutput: `Alice (30) — Developer
Bob (25)`,
        solution: `let inferred = "hello";
let inferredNum = 42;
let inferredArr = [1, 2];

interface Person {
  name: string;
  age: number;
  role?: string;
}

function describe(person: Person): string {
  const rolePart = person.role ? \` — \${person.role}\` : "";
  return \`\${person.name} (\${person.age})\${rolePart}\`;
}

console.log(describe({ name: "Alice", age: 30, role: "Developer" }));
console.log(describe({ name: "Bob", age: 25 }));`
      }
    ]
  },

  // ============================================================
  // ts-lab-3: Interface vs Type Alias (from ts-2)
  // ============================================================
  {
    id: 'ts-lab-3',
    languageId: 'typescript',
    level: 'beginner',
    title: 'Interface vs Type Alias',
    description: 'Understand when to use interfaces vs type aliases: object shapes, union types, declaration merging, generic interfaces, and implementing contracts with classes.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Define Interfaces for Object Shapes',
        instruction: `Interfaces are TypeScript's primary tool for describing object shapes. They are extendable, support declaration merging, and communicate intent clearly to other developers.\n\nWHY: Interfaces enforce a contract: any value assigned to an interface type must have exactly those properties (plus any extras allowed by excess property rules). Extending interfaces models inheritance hierarchies cleanly.\n\nHOW: Use \`interface Name { prop: type }\`. Extend with \`interface Child extends Parent { ... }\`. Mark optional fields with \`?\`.`,
        starterCode: `// TODO: Define a User interface with:
// - id: number
// - name: string
// - email: string

// TODO: Extend User to create an Admin interface that adds:
// - permissions: string[]
// - level: "super" | "regular"

// TODO: Create instances of each and log them

// Bonus: add a function isAdmin(user: User | Admin): boolean
// that returns true when the value has a 'permissions' field`,
        hints: [
          'interface User { id: number; name: string; email: string }',
          'interface Admin extends User { permissions: string[]; level: "super" | "regular" }',
          'Type guard: "permissions" in user'
        ],
        expectedOutput: `{ id: 1, name: 'Alice', email: 'alice@example.com' }
{ id: 2, name: 'Bob', ..., permissions: ['read', 'write'], level: 'super' }
isAdmin(bob) → true`,
        solution: `interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
  level: "super" | "regular";
}

const alice: User = { id: 1, name: "Alice", email: "alice@example.com" };
const bob: Admin = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  permissions: ["read", "write"],
  level: "super",
};

function isAdmin(user: User | Admin): user is Admin {
  return "permissions" in user;
}

console.log(alice);
console.log(bob);
console.log("isAdmin(bob) →", isAdmin(bob));`
      },
      {
        title: 'Step 3: Type Aliases for Unions and Computed Types',
        instruction: `Type aliases can do things interfaces cannot: express union types, tuple types, mapped types, and conditional types. They are the right tool when you need more than a simple object shape.\n\nWHY: A union type alias like \`type Status = "active" | "inactive" | "suspended"\` is more expressive than a plain string and makes invalid states unrepresentable at compile time.\n\nHOW: \`type Alias = SomeType\`. Intersection: \`type AB = A & B\`. A type alias cannot be re-opened (no declaration merging), which is sometimes intentional.`,
        starterCode: `// TODO: Create type aliases for:
// - Status: union of "active" | "inactive" | "suspended"
// - ID: union of string | number
// - Pair<T>: tuple [T, T]

// TODO: Create a Product type alias (object shape) with:
// - id: number, name: string, price: number

// TODO: Use an intersection to create ProductWithStock:
// Product & { stock: number; warehouse: string }

// TODO: Write a function checkStatus(status: Status): string
// Returns a human-readable message for each status value

const p: any = { id: 1, name: "Widget", price: 9.99, stock: 50, warehouse: "A" };
// Cast p to ProductWithStock and log its properties`,
        hints: [
          'type Status = "active" | "inactive" | "suspended"',
          'type Pair<T> = [T, T]',
          'type ProductWithStock = Product & { stock: number; warehouse: string }'
        ],
        expectedOutput: `active → Account is active
{ id: 1, name: 'Widget', price: 9.99, stock: 50, warehouse: 'A' }`,
        solution: `type Status = "active" | "inactive" | "suspended";
type ID = string | number;
type Pair<T> = [T, T];

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductWithStock = Product & {
  stock: number;
  warehouse: string;
};

function checkStatus(status: Status): string {
  switch (status) {
    case "active":      return "Account is active";
    case "inactive":    return "Account is inactive";
    case "suspended":   return "Account is suspended";
  }
}

const p: ProductWithStock = { id: 1, name: "Widget", price: 9.99, stock: 50, warehouse: "A" };
console.log("active →", checkStatus("active"));
console.log(p);`
      },
      {
        title: 'Step 4: Generic Interfaces and Class Contracts',
        instruction: `Generic interfaces describe shapes that work with any type T, while \`implements\` lets a class declare that it satisfies an interface contract. TypeScript verifies the class at compile time.\n\nWHY: A generic \`Repository<T>\` interface captures the full CRUD pattern once and lets you type-safely implement it for User, Product, or any other entity.\n\nHOW: \`interface Repo<T> { findById(id: number): T | undefined }\`. A class then says \`class UserRepo implements Repo<User> { ... }\` and must provide every method.`,
        starterCode: `interface User {
  id: number;
  name: string;
  email: string;
}

// TODO: Define a generic Repository<T> interface with:
// - findById(id: number): T | undefined
// - findAll(): T[]
// - save(item: T): void
// - delete(id: number): boolean

// TODO: Implement UserRepository that satisfies Repository<User>
// Store users in a private array

// Test:
// const repo = new UserRepository();
// repo.save({ id: 1, name: "Alice", email: "alice@example.com" });
// console.log(repo.findById(1));
// console.log(repo.findAll());
// console.log(repo.delete(1));
// console.log(repo.findAll());`,
        hints: [
          'interface Repository<T> { findById(id: number): T | undefined; ... }',
          'class UserRepository implements Repository<User> { private users: User[] = []; }',
          'findById: return this.users.find(u => u.id === id)'
        ],
        expectedOutput: `{ id: 1, name: 'Alice', email: 'alice@example.com' }
[{ id: 1, name: 'Alice', email: 'alice@example.com' }]
true
[]`,
        solution: `interface User {
  id: number;
  name: string;
  email: string;
}

interface Repository<T> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(item: T): void;
  delete(id: number): boolean;
}

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

const repo = new UserRepository();
repo.save({ id: 1, name: "Alice", email: "alice@example.com" });
console.log(repo.findById(1));
console.log(repo.findAll());
console.log(repo.delete(1));
console.log(repo.findAll());`
      },
      {
        title: 'Step 5: ApiResponse Generic and the Exercise',
        instruction: `Complete the sandbox exercise: create a generic \`ApiResponse<T>\` interface and a type alias for common response shapes.\n\nWHY: A typed API response wrapper eliminates guessing at what a network call returns. When every response goes through \`ApiResponse<T>\`, callers know the data shape, status code, and message at compile time.\n\nHOW: Combine a generic interface with type aliases for common specialisations. Add a helper \`ok<T>\` function that constructs a success response so you practice how the generic flows end-to-end.`,
        starterCode: `// TODO: Define interface ApiResponse<T> with:
// - data: T
// - status: number
// - message: string
// - timestamp: Date (optional)

// TODO: Type aliases for common response shapes:
// type UserResponse = ApiResponse<User>
// type ListResponse<T> = ApiResponse<T[]>

interface User {
  id: number;
  name: string;
  email: string;
}

// TODO: Write helper functions:
// ok<T>(data: T, message?: string): ApiResponse<T>
//   → status 200, message defaults to "OK"
// fail(status: number, message: string): ApiResponse<never>
//   → data is never (no data on error)

// Test:
// const userRes = ok<User>({ id: 1, name: "Alice", email: "alice@example.com" });
// const listRes = ok([1, 2, 3], "Fetched numbers");
// const errRes  = fail(404, "Not found");
// console.log(userRes, listRes, errRes);`,
        hints: [
          'interface ApiResponse<T> { data: T; status: number; message: string; timestamp?: Date }',
          'ok<T>(data: T, message = "OK"): ApiResponse<T> { return { data, status: 200, message } }',
          'fail returns ApiResponse<never> — never means "this field will never hold a value"'
        ],
        expectedOutput: `{ data: { id: 1, name: 'Alice', email: 'alice@example.com' }, status: 200, message: 'OK' }
{ data: [1, 2, 3], status: 200, message: 'Fetched numbers' }
{ data: undefined, status: 404, message: 'Not found' }`,
        solution: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp?: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
}

type UserResponse = ApiResponse<User>;
type ListResponse<T> = ApiResponse<T[]>;

function ok<T>(data: T, message: string = "OK"): ApiResponse<T> {
  return { data, status: 200, message };
}

function fail(status: number, message: string): ApiResponse<never> {
  return { data: undefined as never, status, message };
}

const userRes: UserResponse = ok<User>({ id: 1, name: "Alice", email: "alice@example.com" });
const listRes: ListResponse<number> = ok([1, 2, 3], "Fetched numbers");
const errRes = fail(404, "Not found");

console.log(userRes);
console.log(listRes);
console.log(errRes);`
      }
    ]
  },

  // ============================================================
  // ts-lab-4: Generic Utility Functions (from ts-3)
  // ============================================================
  {
    id: 'ts-lab-4',
    languageId: 'typescript',
    level: 'mid',
    title: 'Generics and Utility Types',
    description: 'Master TypeScript generics with constraints, keyof, and built-in utility types (Partial, Pick, Omit, Record, Readonly, Required, ReturnType) through practical type-safe patterns.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Generic Functions with Constraints',
        instruction: `Generic functions let you write algorithms that work with any type while the compiler preserves that type through the call. Constraints (\`T extends Something\`) restrict which types are allowed, giving you access to specific properties or methods inside the function.\n\nWHY: Without generics, you must choose between \`any\` (unsafe) and writing a separate function per type (repetitive). Generics give you type safety and reuse simultaneously.\n\nHOW: \`function fn<T>(x: T): T\`. Add constraints: \`function fn<T extends { id: number }>(x: T)\`. Use \`keyof T\` to restrict a second type parameter to the keys of the first.`,
        starterCode: `// TODO: Implement these generic functions

// 1. first<T>(arr: T[]): T | undefined
//    Returns the first element, or undefined for empty arrays

// 2. findById<T extends { id: number }>(items: T[], id: number): T | undefined
//    Finds an item by its numeric id property

// 3. pluck<T, K extends keyof T>(items: T[], key: K): T[K][]
//    Extracts all values for a given key from an array of objects

// 4. merge<T extends object>(target: T, source: Partial<T>): T
//    Merges source (all-optional) properties into target

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
];

// Test all four functions with the users array`,
        hints: [
          'first: return arr[0]; — TypeScript infers the return type from T',
          'pluck: return items.map(item => item[key]); — K extends keyof T ensures key is valid',
          'merge: return { ...target, ...source } as T'
        ],
        expectedOutput: `{ id: 1, name: 'Alice', email: 'alice@example.com' }
{ id: 2, name: 'Bob', email: 'bob@example.com' }
['Alice', 'Bob']
{ id: 1, name: 'Alice', email: 'updated@example.com' }`,
        solution: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

function merge<T extends object>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
];

console.log(first(users));
console.log(findById(users, 2));
console.log(pluck(users, "name"));
console.log(merge(users[0], { email: "updated@example.com" }));`
      },
      {
        title: 'Step 3: Built-in Utility Types',
        instruction: `TypeScript ships with a library of utility types that transform existing types rather than describing new ones. Learn the six most commonly used: \`Partial\`, \`Required\`, \`Pick\`, \`Omit\`, \`Record\`, and \`Readonly\`.\n\nWHY: Instead of duplicating interface definitions (e.g., an "update" version of User with all fields optional), utility types derive new types from existing ones. This keeps your types DRY and automatically stays in sync when the source interface changes.\n\nHOW: \`Partial<User>\` makes all fields optional. \`Pick<User, "id" | "name">\` keeps only those keys. \`Omit<User, "id">\` removes them. \`Record<string, number>\` creates a typed dictionary.`,
        starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

// TODO: Using only utility types (no new interfaces), create:

// UpdateUser  — all User fields optional (for PATCH requests)
// UserPreview — only id and name (for list views)
// CreateUser  — everything except id and createdAt (for POST requests)
// UserRoleMap — a dictionary mapping username strings to User["role"]
// FrozenUser  — an immutable version of User

// TODO: Write a function patchUser(user: User, patch: UpdateUser): User
// that merges the patch into the user and returns the result

const alice: User = {
  id: 1, name: "Alice", email: "alice@example.com",
  role: "admin", createdAt: new Date("2024-01-01")
};

// Demonstrate each derived type with a concrete value`,
        hints: [
          'type UpdateUser = Partial<User>',
          'type UserPreview = Pick<User, "id" | "name">',
          'type CreateUser = Omit<User, "id" | "createdAt">'
        ],
        expectedOutput: `Patched user: { id: 1, name: 'Alice', email: 'new@example.com', role: 'user', createdAt: ... }
Preview: { id: 1, name: 'Alice' }
Role map: { alice: 'admin', bob: 'user' }`,
        solution: `interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

type UpdateUser  = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
type CreateUser  = Omit<User, "id" | "createdAt">;
type UserRoleMap = Record<string, User["role"]>;
type FrozenUser  = Readonly<User>;

function patchUser(user: User, patch: UpdateUser): User {
  return { ...user, ...patch };
}

const alice: User = {
  id: 1, name: "Alice", email: "alice@example.com",
  role: "admin", createdAt: new Date("2024-01-01"),
};

const patched = patchUser(alice, { email: "new@example.com", role: "user" });
console.log("Patched user:", patched);

const preview: UserPreview = { id: alice.id, name: alice.name };
console.log("Preview:", preview);

const roleMap: UserRoleMap = { alice: "admin", bob: "user" };
console.log("Role map:", roleMap);`
      },
      {
        title: 'Step 4: ReturnType and Type-Safe Event Handlers',
        instruction: `\`ReturnType<typeof fn>\` extracts the return type of a function at the type level. Combined with mapped types and \`keyof\`, you can build event systems where each event name is paired with its exact payload type.\n\nWHY: This pattern eliminates entire categories of runtime errors in event-driven code. The compiler enforces that every handler receives the right payload shape for its event.\n\nHOW: Define an \`EventMap\` type mapping event names to payload shapes. Use a generic \`on<K extends keyof EventMap>\` function so TypeScript narrows the payload to \`EventMap[K]\` inside the handler.`,
        starterCode: `// 1. ReturnType
function getUser() {
  return { id: 1, name: "Alice", active: true };
}

// TODO: Create a type alias UserResult using ReturnType
// Then create a variable of that type

// 2. Type-safe event system
// TODO: Define EventMap with three events:
// - "click":   { x: number; y: number }
// - "keypress": { key: string; code: number }
// - "submit":   { formData: Record<string, string> }

// TODO: Implement on<K extends keyof EventMap>(
//   event: K, handler: (payload: EventMap[K]) => void
// ): void
// For now, just log "Registered handler for <event>"

// TODO: Register handlers for all three events and verify
// that the payload is correctly typed in each handler body`,
        hints: [
          'type UserResult = ReturnType<typeof getUser>',
          'type EventMap = { click: { x: number; y: number }; ... }',
          'on("click", (payload) => { /* payload.x and payload.y are typed */ })'
        ],
        expectedOutput: `Registered handler for click
Registered handler for keypress
Registered handler for submit`,
        solution: `function getUser() {
  return { id: 1, name: "Alice", active: true };
}

type UserResult = ReturnType<typeof getUser>;
const result: UserResult = { id: 1, name: "Alice", active: true };

type EventMap = {
  click:    { x: number; y: number };
  keypress: { key: string; code: number };
  submit:   { formData: Record<string, string> };
};

function on<K extends keyof EventMap>(
  event: K,
  handler: (payload: EventMap[K]) => void
): void {
  console.log("Registered handler for", event);
}

on("click", (payload) => {
  console.log(payload.x, payload.y);
});

on("keypress", (payload) => {
  console.log(payload.key, payload.code);
});

on("submit", (payload) => {
  console.log(payload.formData);
});`
      },
      {
        title: 'Step 5: Build a groupBy Generic Function',
        instruction: `Implement the sandbox exercise: a generic \`groupBy\` function that organises an array of objects by a given key, returning a \`Record<string, T[]>\`.\n\nWHY: \`groupBy\` is a fundamental data-transformation utility. Implementing it generically is a classic TypeScript interview exercise because it requires \`keyof\`, indexed access types (\`T[K]\`), and \`Record\` — all in one function.\n\nHOW: The key constraint is \`K extends keyof T\`. The return type is \`Record<string, T[]>\`. Inside the body, use \`String(item[key])\` to convert the key value to a string for the dictionary key.`,
        starterCode: `// TODO: Implement groupBy<T, K extends keyof T>(
//   items: T[],
//   key: K
// ): Record<string, T[]>
//
// For each item, convert item[key] to a string and use it as
// the bucket name. Push the item into that bucket.

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Widget A", category: "widgets", price: 9.99  },
  { id: 2, name: "Gadget B", category: "gadgets", price: 24.99 },
  { id: 3, name: "Widget C", category: "widgets", price: 14.99 },
  { id: 4, name: "Gadget D", category: "gadgets", price: 49.99 },
  { id: 5, name: "Donut E",  category: "donuts",  price: 1.99  },
];

// Test 1: group by category
// const byCategory = groupBy(products, "category");
// console.log(Object.keys(byCategory));    // ["widgets", "gadgets", "donuts"]
// console.log(byCategory["widgets"].length); // 2

// Test 2: group by price — shows that any key works
// const byPrice = groupBy(products, "price");
// console.log(Object.keys(byPrice));`,
        hints: [
          'Start with const result: Record<string, T[]> = {}',
          'const bucket = String(item[key]); result[bucket] = result[bucket] ?? [];',
          'result[bucket].push(item); at the end of the loop'
        ],
        expectedOutput: `[ 'widgets', 'gadgets', 'donuts' ]
2
[ '9.99', '24.99', '14.99', '49.99', '1.99' ]`,
        solution: `function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const bucket = String(item[key]);
    if (!result[bucket]) result[bucket] = [];
    result[bucket].push(item);
  }
  return result;
}

const products: Product[] = [
  { id: 1, name: "Widget A", category: "widgets", price: 9.99  },
  { id: 2, name: "Gadget B", category: "gadgets", price: 24.99 },
  { id: 3, name: "Widget C", category: "widgets", price: 14.99 },
  { id: 4, name: "Gadget D", category: "gadgets", price: 49.99 },
  { id: 5, name: "Donut E",  category: "donuts",  price: 1.99  },
];

const byCategory = groupBy(products, "category");
console.log(Object.keys(byCategory));
console.log(byCategory["widgets"].length);

const byPrice = groupBy(products, "price");
console.log(Object.keys(byPrice));`
      }
    ]
  },

  // ============================================================
  // ts-lab-5: Discriminated Union Pattern (from ts-4)
  // ============================================================
  {
    id: 'ts-lab-5',
    languageId: 'typescript',
    level: 'mid',
    title: 'Discriminated Unions and State Machines',
    description: 'Build type-safe state machines using discriminated (tagged) unions, exhaustive checking with never, type guard functions, and the reducer pattern — eliminating entire classes of runtime errors.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Your First Discriminated Union',
        instruction: `A discriminated union is a union type where every member shares a literal "discriminant" property (often called \`kind\`, \`type\`, or \`status\`). TypeScript narrows the type inside each \`switch\` branch using that discriminant.\n\nWHY: Without discriminated unions you must use runtime checks like \`if ("data" in response)\` and cast manually. With them, the compiler narrows the type for you — no casts needed.\n\nHOW: Each union member must have a unique literal value for the discriminant property. Use a \`switch\` on that property and TypeScript narrows the type inside each \`case\` automatically.`,
        starterCode: `// TODO: Define ApiResponse<T> as a discriminated union:
// | { status: "loading" }
// | { status: "success"; data: T }
// | { status: "error"; error: string; code: number }

// TODO: Implement handleResponse<T>(response: ApiResponse<T>): string
// "loading" → "Loading..."
// "success" → "Got data: " + JSON.stringify(response.data)
// "error"   → "Error " + response.code + ": " + response.error

// Test cases:
// handleResponse({ status: "loading" })
// handleResponse({ status: "success", data: [1, 2, 3] })
// handleResponse({ status: "error", error: "Not found", code: 404 })`,
        hints: [
          'type ApiResponse<T> = | { status: "loading" } | { status: "success"; data: T } | ...',
          'Inside case "success": TypeScript knows response.data exists',
          'Inside case "error": TypeScript knows response.code and response.error exist'
        ],
        expectedOutput: `Loading...
Got data: [1,2,3]
Error 404: Not found`,
        solution: `type ApiResponse<T> =
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

console.log(handleResponse({ status: "loading" }));
console.log(handleResponse({ status: "success", data: [1, 2, 3] }));
console.log(handleResponse({ status: "error", error: "Not found", code: 404 }));`
      },
      {
        title: 'Step 3: Exhaustive Checking with never',
        instruction: `Exhaustive checking ensures the compiler tells you when you have missed a case in a discriminated union switch — even after adding new members to the union months later.\n\nWHY: Without exhaustive checking, adding a new shape to a union silently produces wrong results at runtime. With it, the compiler errors on the \`never\` branch, forcing you to handle the new case.\n\nHOW: Add a \`default\` case that assigns \`shape\` to a \`never\`-typed variable: \`const _exhaustive: never = shape\`. If any case is missing, TypeScript will report a type error because the unhandled variant is not assignable to \`never\`.`,
        starterCode: `// TODO: Define the Shape discriminated union:
// | { kind: "circle";    radius: number }
// | { kind: "rectangle"; width: number; height: number }
// | { kind: "triangle";  base: number; height: number }

// TODO: Implement area(shape: Shape): number
// Use Math.PI * r² for circle, w*h for rectangle, 0.5*b*h for triangle
// Add a default branch that assigns shape to a variable of type never
// (this is the exhaustive check)

// Test:
// area({ kind: "circle", radius: 5 })      → ~78.54
// area({ kind: "rectangle", width: 4, height: 6 }) → 24
// area({ kind: "triangle", base: 3, height: 8 })   → 12`,
        hints: [
          'case "circle": return Math.PI * shape.radius ** 2',
          'default: const _exhaustive: never = shape; return _exhaustive;',
          'Try adding | { kind: "hexagon"; side: number } to the union — the compiler will error'
        ],
        expectedOutput: `78.53981633974483
24
12`,
        solution: `type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle";  base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

console.log(area({ kind: "circle",    radius: 5 }));
console.log(area({ kind: "rectangle", width: 4, height: 6 }));
console.log(area({ kind: "triangle",  base: 3,  height: 8 }));`
      },
      {
        title: 'Step 4: Type-Safe Auth State Machine',
        instruction: `Model a complete authentication flow as a state machine using discriminated unions for both states and actions. Implement a pure reducer function that transitions between states.\n\nWHY: State machines make illegal states unrepresentable. When \`AuthState\` is a union, you cannot accidentally read \`user.token\` in the \`"anonymous"\` state — the compiler simply does not allow it.\n\nHOW: Define separate union types for states and actions. The reducer takes the current state and an action and returns a new state. Add a type guard \`isAuthenticated\` that narrows \`AuthState\` to only the authenticated variant.`,
        starterCode: `// TODO: Define AuthState discriminated union:
// | { state: "anonymous" }
// | { state: "authenticating"; email: string }
// | { state: "authenticated"; user: { id: number; name: string }; token: string }
// | { state: "error"; message: string; retryCount: number }

// TODO: Define AuthAction discriminated union:
// | { type: "LOGIN";         email: string; password: string }
// | { type: "LOGIN_SUCCESS"; user: { id: number; name: string }; token: string }
// | { type: "LOGIN_FAILURE"; message: string }
// | { type: "LOGOUT" }

// TODO: Implement authReducer(state: AuthState, action: AuthAction): AuthState
// LOGIN        → authenticating
// LOGIN_SUCCESS → authenticated
// LOGIN_FAILURE → error (increment retryCount if already in error state)
// LOGOUT       → anonymous

// TODO: Implement type guard isAuthenticated(state: AuthState)
// returns state is Extract<AuthState, { state: "authenticated" }>

// Simulate a login flow and log each state`,
        hints: [
          'LOGIN_FAILURE: const retryCount = state.state === "error" ? state.retryCount + 1 : 1',
          'isAuthenticated: return state.state === "authenticated"',
          'Extract<AuthState, { state: "authenticated" }> narrows to the authenticated member'
        ],
        expectedOutput: `{ state: 'anonymous' }
{ state: 'authenticating', email: 'alice@example.com' }
{ state: 'authenticated', user: { id: 1, name: 'Alice' }, token: 'tok_abc' }
isAuthenticated: true
{ state: 'anonymous' }`,
        solution: `type AuthState =
  | { state: "anonymous" }
  | { state: "authenticating"; email: string }
  | { state: "authenticated"; user: { id: number; name: string }; token: string }
  | { state: "error"; message: string; retryCount: number };

type AuthAction =
  | { type: "LOGIN";         email: string; password: string }
  | { type: "LOGIN_SUCCESS"; user: { id: number; name: string }; token: string }
  | { type: "LOGIN_FAILURE"; message: string }
  | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { state: "authenticating", email: action.email };
    case "LOGIN_SUCCESS":
      return { state: "authenticated", user: action.user, token: action.token };
    case "LOGIN_FAILURE": {
      const retryCount = state.state === "error" ? state.retryCount + 1 : 1;
      return { state: "error", message: action.message, retryCount };
    }
    case "LOGOUT":
      return { state: "anonymous" };
  }
}

function isAuthenticated(
  state: AuthState
): state is Extract<AuthState, { state: "authenticated" }> {
  return state.state === "authenticated";
}

let auth: AuthState = { state: "anonymous" };
console.log(auth);

auth = authReducer(auth, { type: "LOGIN", email: "alice@example.com", password: "secret" });
console.log(auth);

auth = authReducer(auth, {
  type: "LOGIN_SUCCESS",
  user: { id: 1, name: "Alice" },
  token: "tok_abc",
});
console.log(auth);
console.log("isAuthenticated:", isAuthenticated(auth));

auth = authReducer(auth, { type: "LOGOUT" });
console.log(auth);`
      },
      {
        title: 'Step 5: Extend the State Machine',
        instruction: `Complete the sandbox exercise: add a \`"password_reset"\` state and corresponding actions to the auth state machine. This tests whether you can safely extend a discriminated union without breaking existing code.\n\nWHY: Real state machines grow over time. TypeScript's exhaustive checking ensures that every switch statement is updated when a new variant is added — giving you compile-time confidence across the entire codebase.\n\nHOW: Add the new state to \`AuthState\`, new actions to \`AuthAction\`, and handle them in the reducer. The \`isAuthenticated\` type guard and the other cases should compile without changes.`,
        starterCode: `// Paste your solution from Step 4 here, then extend it:

// TODO: Add to AuthState:
// | { state: "password_reset"; email: string; resetToken: string }

// TODO: Add to AuthAction:
// | { type: "RESET_PASSWORD"; email: string }
// | { type: "RESET_SUCCESS"; resetToken: string }

// TODO: Add cases to authReducer:
// RESET_PASSWORD → password_reset state (you need email from the current state if authenticating,
//                  or store it in the action)
// RESET_SUCCESS  → keep password_reset state, update resetToken (or go back to anonymous)

// Simulate a password reset flow:
// anonymous → LOGIN → authenticating → RESET_PASSWORD → password_reset → RESET_SUCCESS → anonymous`,
        hints: [
          'RESET_PASSWORD action should carry email: string so you do not need to read it from state',
          'RESET_SUCCESS can transition to anonymous (user must log in again)',
          'The existing switch cases compile unchanged — only the new ones need to be added'
        ],
        expectedOutput: `{ state: 'anonymous' }
{ state: 'authenticating', email: 'alice@example.com' }
{ state: 'password_reset', email: 'alice@example.com', resetToken: '' }
{ state: 'anonymous' }`,
        solution: `type AuthState =
  | { state: "anonymous" }
  | { state: "authenticating"; email: string }
  | { state: "authenticated"; user: { id: number; name: string }; token: string }
  | { state: "error"; message: string; retryCount: number }
  | { state: "password_reset"; email: string; resetToken: string };

type AuthAction =
  | { type: "LOGIN";          email: string; password: string }
  | { type: "LOGIN_SUCCESS";  user: { id: number; name: string }; token: string }
  | { type: "LOGIN_FAILURE";  message: string }
  | { type: "LOGOUT" }
  | { type: "RESET_PASSWORD"; email: string }
  | { type: "RESET_SUCCESS" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { state: "authenticating", email: action.email };
    case "LOGIN_SUCCESS":
      return { state: "authenticated", user: action.user, token: action.token };
    case "LOGIN_FAILURE": {
      const retryCount = state.state === "error" ? state.retryCount + 1 : 1;
      return { state: "error", message: action.message, retryCount };
    }
    case "LOGOUT":
      return { state: "anonymous" };
    case "RESET_PASSWORD":
      return { state: "password_reset", email: action.email, resetToken: "" };
    case "RESET_SUCCESS":
      return { state: "anonymous" };
  }
}

let auth: AuthState = { state: "anonymous" };
console.log(auth);

auth = authReducer(auth, { type: "LOGIN", email: "alice@example.com", password: "secret" });
console.log(auth);

auth = authReducer(auth, { type: "RESET_PASSWORD", email: "alice@example.com" });
console.log(auth);

auth = authReducer(auth, { type: "RESET_SUCCESS" });
console.log(auth);`
      }
    ]
  },

  // ============================================================
  // ts-lab-6: Template Literal Type Router (from ts-5)
  // ============================================================
  {
    id: 'ts-lab-6',
    languageId: 'typescript',
    level: 'senior',
    title: 'Template Literal Types and Type-Safe Routing',
    description: 'Build a type-safe URL router using template literal types, conditional types, and recursive type inference to extract route parameters at the type level — no runtime parsing needed for type safety.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Basic Template Literal Types',
        instruction: `Template literal types combine string literal types using backtick syntax at the type level. TypeScript evaluates all combinations into a union of string literals.\n\nWHY: Template literal types let you encode string patterns in the type system rather than at runtime. A route like \`"/users/:userId"\` can be parsed into its parameter names at compile time with zero runtime overhead.\n\nHOW: Use backtick syntax with \`\${TypeUnion}\` inside a type definition: \`type Route = \\\`/\${Entity}\\\`\`. The result is a union of every combination of the interpolated union members.`,
        starterCode: `// TODO: Define these template literal types:

// 1. Greeting = "hello" | "hi"
//    Name = "world" | "typescript"
//    GreetingMessage: combine them → "hello, world!" | "hello, typescript!" | ...

// 2. HttpMethod = "get" | "post" | "put" | "delete"
//    Entity = "users" | "products" | "orders"
//    ApiEndpoint: combine like "/api/users", "/api/products", etc.

// 3. EventName<T extends string>: template literal generic
//    Given T = "click" | "hover", produce "on:click" | "on:hover"

// Log the possible values by creating a variable for each type
// (TypeScript will error if you assign an invalid string)

const msg1: any = "hello, world!";     // TODO: replace 'any' with GreetingMessage
const endpoint: any = "/api/users";    // TODO: replace 'any' with ApiEndpoint
const event: any = "on:click";        // TODO: replace 'any' with EventName<"click" | "hover">`,
        hints: [
          'type GreetingMessage = `${Greeting}, ${Name}!`',
          'type ApiEndpoint = `/api/${Entity}`',
          'type EventName<T extends string> = `on:${T}`'
        ],
        expectedOutput: `hello, world!
/api/users
on:click`,
        solution: `type Greeting = "hello" | "hi";
type Name = "world" | "typescript";
type GreetingMessage = \`\${Greeting}, \${Name}!\`;

type HttpMethod = "get" | "post" | "put" | "delete";
type Entity = "users" | "products" | "orders";
type ApiEndpoint = \`/api/\${Entity}\`;

type EventName<T extends string> = \`on:\${T}\`;

const msg1: GreetingMessage = "hello, world!";
const endpoint: ApiEndpoint = "/api/users";
const event: EventName<"click" | "hover"> = "on:click";

console.log(msg1);
console.log(endpoint);
console.log(event);`
      },
      {
        title: 'Step 3: Extract Route Parameters at the Type Level',
        instruction: `Conditional types with \`infer\` let TypeScript "pattern-match" on string types and extract sub-strings. Combined with recursion, you can extract all \`:param\` segments from a route string purely at the type level.\n\nWHY: A route like \`"/users/:userId/posts/:postId"\` should produce \`{ userId: string; postId: string }\` automatically — not by hand-maintenance. Any time the route string changes, the parameter type updates with it.\n\nHOW: Use \`T extends \\\`\${string}:\${infer Param}/\${infer Rest}\\\` ? Param | ExtractParam<Rest> : ...\` to peel off parameters one segment at a time recursively.`,
        starterCode: `// TODO: Implement the recursive conditional type ExtractParam<T extends string>
// It should extract all :paramName segments from a route string as a union of strings
//
// Example:
// ExtractParam<"/users/:userId">                     → "userId"
// ExtractParam<"/users/:userId/posts/:postId">        → "userId" | "postId"
// ExtractParam<"/a/:x/b/:y/c/:z">                    → "x" | "y" | "z"
// ExtractParam<"/no-params">                          → never

// TODO: Using ExtractParam, define RouteParams<T extends string>
// which maps each extracted param name to string:
// RouteParams<"/users/:userId/posts/:postId"> → { userId: string; postId: string }

// Verify the types compile (add a few typed variables):
type UserParams    = any; // TODO: RouteParams<"/users/:userId">
type CommentParams = any; // TODO: RouteParams<"/posts/:postId/comments/:commentId">`,
        hints: [
          'T extends `${string}:${infer Param}/${infer Rest}` ? Param | ExtractParam<Rest> : ...',
          'Second branch: T extends `${string}:${infer Param}` ? Param : never',
          'RouteParams<T> = { [K in ExtractParam<T>]: string }'
        ],
        expectedOutput: `Types compile successfully — no runtime output for type-only definitions`,
        solution: `type ExtractParam<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParam<Rest>
    : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

type RouteParams<T extends string> = {
  [K in ExtractParam<T>]: string;
};

type UserParams    = RouteParams<"/users/:userId">;
type CommentParams = RouteParams<"/posts/:postId/comments/:commentId">;

// These compile — hover in VS Code to see the resolved types
const userParams: UserParams = { userId: "42" };
const commentParams: CommentParams = { postId: "7", commentId: "99" };

console.log(userParams);
console.log(commentParams);`
      },
      {
        title: 'Step 4: Build the Type-Safe Router',
        instruction: `Combine the type utilities from Step 3 with a runtime router implementation. The \`get\` method's generic parameter ties the route string literal to the handler's parameter type, so TypeScript knows exactly which params exist inside each handler.\n\nWHY: Type safety at the call site means you cannot accidentally access \`params.typoParam\` — the compiler rejects it. The route string itself becomes the source of truth for both the type and the runtime matcher.\n\nHOW: The \`createRouter\` factory returns an object with a \`get<T extends string>(path: T, handler: RouteHandler<T>)\` method. Inside \`get\`, TypeScript infers \`T\` from the string literal passed as \`path\` and propagates it through \`RouteHandler<T>\`.`,
        starterCode: `type ExtractParam<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParam<Rest>
    : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

type RouteParams<T extends string> = { [K in ExtractParam<T>]: string };
type RouteHandler<T extends string> = (params: RouteParams<T>) => void;

// TODO: Implement matchRoute(pattern: string, url: string): Record<string, string> | null
// Split both by "/", check lengths match, extract :param segments into a params object
// Return null if any non-param segment does not match

// TODO: Implement createRouter() that returns:
// {
//   get<T extends string>(path: T, handler: RouteHandler<T>): void
//   match(url: string): boolean
// }
// get() stores { path, handler } in an internal array
// match() loops through stored routes, calls matchRoute, invokes handler on first match

// Usage:
// const router = createRouter();
// router.get("/users/:userId", (params) => { console.log(params.userId); });
// router.get("/users/:userId/posts/:postId", (params) => {
//   console.log(params.userId, params.postId);
// });
// router.match("/users/42");
// router.match("/users/42/posts/7");`,
        hints: [
          'matchRoute: split by "/", check lengths, build params from segments starting with ":"',
          'createRouter: const routes: Array<{ path: string; handler: Function }> = []',
          'match: for each route call matchRoute; if non-null, call handler(params) and return true'
        ],
        expectedOutput: `42
42 7`,
        solution: `type ExtractParam<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParam<Rest>
    : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

type RouteParams<T extends string> = { [K in ExtractParam<T>]: string };
type RouteHandler<T extends string> = (params: RouteParams<T>) => void;

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

function createRouter() {
  const routes: Array<{ path: string; handler: Function }> = [];

  return {
    get<T extends string>(path: T, handler: RouteHandler<T>) {
      routes.push({ path, handler });
    },
    match(url: string): boolean {
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

const router = createRouter();

router.get("/users/:userId", (params) => {
  console.log(params.userId);
});

router.get("/users/:userId/posts/:postId", (params) => {
  console.log(params.userId, params.postId);
});

router.match("/users/42");
router.match("/users/42/posts/7");`
      },
      {
        title: 'Step 5: Extend the Router with Query Parameters',
        instruction: `Complete the sandbox exercise: extend the type system to handle query parameters in the format \`/search?q=:query&page=:page\`, extracting both path params and query params into a single typed object.\n\nWHY: Production routers handle both path and query parameters. This exercise consolidates everything: template literal types, conditional types, recursive inference, union merging, and generics — applied to a real engineering problem.\n\nHOW: Split the route string into the path part and query string part at \`?\`. Extract params from each independently and merge the resulting types with an intersection (\`&\`).`,
        starterCode: `// Given: ExtractParam and RouteParams from the previous step

type ExtractParam<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParam<Rest>
    : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

// TODO: Define ExtractQueryParam<T extends string>
// Handles "q=:query&page=:page" → "query" | "page"
// Hint: split on "&" recursively, then extract the part after "="

// TODO: Define FullRouteParams<T extends string>
// Split T at "?" into Path and Query parts
// Return RouteParams<Path> & QueryParams<Query>
// where QueryParams uses ExtractQueryParam

// Example:
// FullRouteParams<"/search?q=:query&page=:page">
// → { q is NOT a param — only the :name after = matters }
// → { query: string; page: string }

// TODO: Update the router's get() to accept routes with query strings
// The runtime match() can ignore query params for now (or handle them)

// Test:
// router.get("/search?q=:query&page=:page", (params) => {
//   console.log(params.query, params.page); // fully typed
// });`,
        hints: [
          'type ExtractQueryParam<T extends string> = T extends `${string}=:${infer P}&${infer Rest}` ? P | ExtractQueryParam<Rest> : T extends `${string}=:${infer P}` ? P : never',
          'Split at "?": T extends `${infer Path}?${infer Query}` ? RouteParams<Path> & QueryParams<Query> : RouteParams<T>',
          'For the runtime match, parse the actual URL query string with url.split("?") and URLSearchParams'
        ],
        expectedOutput: `typescript 1`,
        solution: `type ExtractParam<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParam<Rest>
    : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

type RouteParams<T extends string> = { [K in ExtractParam<T>]: string };

type ExtractQueryParam<T extends string> =
  T extends \`\${string}=:\${infer Param}&\${infer Rest}\`
    ? Param | ExtractQueryParam<Rest>
    : T extends \`\${string}=:\${infer Param}\`
    ? Param
    : never;

type QueryParams<T extends string> = { [K in ExtractQueryParam<T>]: string };

type FullRouteParams<T extends string> =
  T extends \`\${infer Path}?\${infer Query}\`
    ? RouteParams<Path> & QueryParams<Query>
    : RouteParams<T>;

type RouteHandler<T extends string> = (params: FullRouteParams<T>) => void;

function matchRoute(pattern: string, url: string): Record<string, string> | null {
  const [patternPath, patternQuery] = pattern.split("?");
  const [urlPath, urlQuery] = url.split("?");

  const patternParts = patternPath.split("/");
  const urlParts = urlPath.split("/");
  if (patternParts.length !== urlParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = urlParts[i];
    } else if (patternParts[i] !== urlParts[i]) {
      return null;
    }
  }

  if (patternQuery && urlQuery) {
    const queryParams = new URLSearchParams(urlQuery);
    const patternQueryParts = patternQuery.split("&");
    for (const part of patternQueryParts) {
      const [key, value] = part.split("=");
      if (value && value.startsWith(":")) {
        const paramName = value.slice(1);
        const actualValue = queryParams.get(key);
        if (actualValue !== null) params[paramName] = actualValue;
      }
    }
  }

  return params;
}

function createRouter() {
  const routes: Array<{ path: string; handler: Function }> = [];
  return {
    get<T extends string>(path: T, handler: RouteHandler<T>) {
      routes.push({ path, handler });
    },
    match(url: string): boolean {
      for (const route of routes) {
        const params = matchRoute(route.path, url);
        if (params) { route.handler(params); return true; }
      }
      return false;
    },
  };
}

const router = createRouter();

router.get("/search?q=:query&page=:page", (params) => {
  console.log(params.query, params.page);
});

router.match("/search?q=typescript&page=1");`
      }
    ]
  },

  // ============================================================
  // ts-lab-7: Enums, Literals & as const
  // ============================================================
  {
    id: 'ts-lab-7',
    languageId: 'typescript',
    level: 'beginner',
    title: 'Enums, Literals & as const',
    description: 'Learn how to model fixed sets of values using numeric and string enums, const enums, as const assertions, and literal types for discriminated unions.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Numeric and String Enums',
        instruction: `Define a \`Direction\` numeric enum and a \`Status\` string enum, then use them in function signatures.\n\nWHY: Enums give meaningful names to sets of related constants. Numeric enums auto-increment from 0 (or a chosen start), so you get both a name and a number. String enums have no auto-increment, but they produce readable values in serialized output (useful for APIs and logs).\n\nHOW: Use \`enum Direction { Up, Down, Left, Right }\` for numeric (Up = 0, Down = 1, …). For string enums, assign each member a string literal: \`enum Status { Active = "ACTIVE" }\`.`,
        starterCode: `// TODO: Define a numeric enum for cardinal directions
// Direction.Up should be 0, Down = 1, Left = 2, Right = 3

// TODO: Define a string enum for request status
// Status.Active = "ACTIVE", Idle = "IDLE", Error = "ERROR"

// TODO: Add TypeScript types to these functions using the enums above

function move(direction) {
  console.log(\`Moving \${Direction[direction]}\`);
}

function getStatusLabel(status) {
  if (status === Status.Error) return "Something went wrong";
  return \`Status: \${status}\`;
}

move(Direction.Up);
console.log(getStatusLabel(Status.Active));`,
        hints: [
          'enum Direction { Up, Down, Left, Right } — Up auto-gets value 0',
          'String enum: enum Status { Active = "ACTIVE", Idle = "IDLE", Error = "ERROR" }',
          'Use the enum as a type: function move(direction: Direction): void'
        ],
        expectedOutput: `Moving Up
Status: ACTIVE`,
        solution: `enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum Status {
  Active = "ACTIVE",
  Idle = "IDLE",
  Error = "ERROR",
}

function move(direction: Direction): void {
  console.log(\`Moving \${Direction[direction]}\`);
}

function getStatusLabel(status: Status): string {
  if (status === Status.Error) return "Something went wrong";
  return \`Status: \${status}\`;
}

move(Direction.Up);          // Moving Up
console.log(getStatusLabel(Status.Active)); // Status: ACTIVE`
      },
      {
        title: 'Step 3: Const Enums vs Regular Enums',
        instruction: `Compare \`const enum\` with a regular \`enum\` and understand the compile-time trade-off.\n\nWHY: Regular enums emit a JavaScript object at runtime that lets you reverse-lookup values (e.g. \`Direction[0] === "Up"\`). \`const enum\` members are inlined by the compiler — the JS output has no object at all, just the raw literal values. This is faster and smaller, but you can no longer iterate over the enum at runtime.\n\nHOW: Prefix the declaration with \`const\`: \`const enum Color { Red, Green, Blue }\`. Try compiling both versions with \`tsc\` and compare the emitted JS.`,
        starterCode: `// Regular enum — emits a JS object at runtime
enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

// TODO: Convert this to a const enum and observe the difference
// When compiled, const enum values are inlined as numbers in the output
enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
}

function log(level: LogLevel, message: string): void {
  if (level >= LogLevel.Warn) {
    console.error(\`[\${LogLevel[level]}] \${message}\`);
  } else {
    console.log(\`[\${LogLevel[level]}] \${message}\`);
  }
}

// TODO: Why does this break if LogLevel becomes a const enum?
// LogLevel[level] — reverse lookup only works on regular enums
log(LogLevel.Info, "Server started");
log(LogLevel.Error, "Connection failed");`,
        hints: [
          'Add const before enum: const enum LogLevel { ... }',
          'After converting, tsc will fail on LogLevel[level] — reverse lookup requires a runtime object',
          'Fix: use a lookup table Record<LogLevel, string> or keep LogLevel as a regular enum',
          'const enums are ideal for simple switch/if comparisons where you never need the name at runtime'
        ],
        expectedOutput: `[Info] Server started
[Error] Connection failed

// With const enum the compiled JS inlines the number:
// if (level >= 2) { ... }  — no LogLevel object in output`,
        solution: `// Regular enum — keeps a runtime object, supports reverse lookup
enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

// const enum — inlined at compile time, no runtime object
const enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
}

// Because LogLevel is const, reverse lookup doesn't exist at runtime.
// Use a plain object instead:
const LogLevelName: Record<LogLevel, string> = {
  [LogLevel.Debug]: "Debug",
  [LogLevel.Info]: "Info",
  [LogLevel.Warn]: "Warn",
  [LogLevel.Error]: "Error",
};

function log(level: LogLevel, message: string): void {
  if (level >= LogLevel.Warn) {
    console.error(\`[\${LogLevelName[level]}] \${message}\`);
  } else {
    console.log(\`[\${LogLevelName[level]}] \${message}\`);
  }
}

log(LogLevel.Info, "Server started");
log(LogLevel.Error, "Connection failed");`
      },
      {
        title: 'Step 4: as const for Object Literals',
        instruction: `Use \`as const\` to freeze an object literal and derive a union type from its values.\n\nWHY: Without \`as const\`, TypeScript widens the type of an object literal — \`{ method: "GET" }\` becomes \`{ method: string }\`, losing the literal information. Adding \`as const\` makes every value its own literal type and marks all properties as \`readonly\`.\n\nHOW: Append \`as const\` after the object literal. To derive a union of its values, combine \`keyof typeof\` with indexed access: \`typeof CONFIG[keyof typeof CONFIG]\`.`,
        starterCode: `// Without as const — TypeScript widens types to string
const ROUTES = {
  home: "/",
  users: "/users",
  profile: "/profile",
};

// TODO: Add 'as const' to ROUTES and observe what changes in the types

// TODO: Derive a Route type that is the union of all values in ROUTES
// Expected: type Route = "/" | "/users" | "/profile"
// Hint: use typeof ROUTES[keyof typeof ROUTES]

// TODO: Use your Route type in this function signature
function navigate(path) {
  console.log(\`Navigating to \${path}\`);
}

// This should produce a type error — "/unknown" is not a valid Route
navigate("/profile");
// navigate("/unknown"); // uncomment to see the error`,
        hints: [
          'const ROUTES = { home: "/" } as const',
          'type Route = typeof ROUTES[keyof typeof ROUTES]',
          'keyof typeof ROUTES gives the union of key names: "home" | "users" | "profile"',
          'Indexed access ROUTES["home"] narrows to the literal type "/"'
        ],
        expectedOutput: `Navigating to /profile

// Type error (expected):
// Argument of type '"/unknown"' is not assignable to parameter of type '"/" | "/users" | "/profile"'`,
        solution: `const ROUTES = {
  home: "/",
  users: "/users",
  profile: "/profile",
} as const;

// Derive the union of all value literals
type Route = typeof ROUTES[keyof typeof ROUTES];
// Equivalent to: type Route = "/" | "/users" | "/profile"

function navigate(path: Route): void {
  console.log(\`Navigating to \${path}\`);
}

navigate(ROUTES.profile); // Navigating to /profile
// navigate("/unknown");  // Error: not assignable to type Route`
      },
      {
        title: 'Step 5: Literal Types and Discriminated Unions',
        instruction: `Use a literal "kind" field as a discriminant to safely narrow a union type.\n\nWHY: Discriminated unions are the idiomatic TypeScript pattern for modelling data that can be one of several distinct shapes. A shared literal field (the discriminant) lets TypeScript narrow the type inside a switch or if-else without needing runtime instanceof checks.\n\nHOW: Give each member of the union a \`kind\` property with a unique string literal type. In the handler function, switch on \`event.kind\` — TypeScript knows which branch has which shape.`,
        starterCode: `// TODO: Define three event types with a 'kind' discriminant field
// MouseEvent: kind = "mouse", x: number, y: number
// KeyboardEvent: kind = "keyboard", key: string
// ResizeEvent: kind = "resize", width: number, height: number

// TODO: Define an AppEvent union type from the three types above

// TODO: Implement handleEvent so each branch has the correct narrowed type
function handleEvent(event) {
  // switch on event.kind
  // In the "mouse" branch TypeScript should know event.x and event.y exist
}

handleEvent({ kind: "mouse", x: 100, y: 200 });
handleEvent({ kind: "keyboard", key: "Enter" });
handleEvent({ kind: "resize", width: 1920, height: 1080 });`,
        hints: [
          'type MouseEvent = { kind: "mouse"; x: number; y: number }',
          'type AppEvent = MouseEvent | KeyboardEvent | ResizeEvent',
          'switch (event.kind) { case "mouse": ... } — TypeScript narrows the type in each case',
          'Add a default branch that calls a never-typed variable to ensure exhaustive handling'
        ],
        expectedOutput: `Mouse click at (100, 200)
Key pressed: Enter
Window resized to 1920x1080`,
        solution: `type MouseEvent = { kind: "mouse"; x: number; y: number };
type KeyboardEvent = { kind: "keyboard"; key: string };
type ResizeEvent = { kind: "resize"; width: number; height: number };

type AppEvent = MouseEvent | KeyboardEvent | ResizeEvent;

function handleEvent(event: AppEvent): void {
  switch (event.kind) {
    case "mouse":
      console.log(\`Mouse click at (\${event.x}, \${event.y})\`);
      break;
    case "keyboard":
      console.log(\`Key pressed: \${event.key}\`);
      break;
    case "resize":
      console.log(\`Window resized to \${event.width}x\${event.height}\`);
      break;
    default: {
      // Exhaustive check — TypeScript errors if a new event kind is added
      const _exhaustive: never = event;
      throw new Error(\`Unhandled event: \${_exhaustive}\`);
    }
  }
}

handleEvent({ kind: "mouse", x: 100, y: 200 });
handleEvent({ kind: "keyboard", key: "Enter" });
handleEvent({ kind: "resize", width: 1920, height: 1080 });`
      }
    ]
  },

  // ============================================================
  // ts-lab-8: Zod API Layer
  // ============================================================
  {
    id: 'ts-lab-8',
    languageId: 'typescript',
    level: 'mid',
    title: 'Zod API Layer',
    description: 'Build a fully-typed API validation layer using Zod: define schemas, derive TypeScript types with z.infer, compose complex schemas, and handle parse errors gracefully.',
    estimatedMinutes: 35,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Install Zod: npm install zod',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Basic Schema Definition',
        instruction: `Define a Zod schema for a \`User\` object with validation constraints on each field.\n\nWHY: Zod schemas are executable validators — they check data at runtime while simultaneously describing the TypeScript type. You write the shape once and get both runtime safety and static type checking.\n\nHOW: Use \`z.object({})\` to define the shape, \`z.string().min(2)\` for strings with constraints, \`z.string().email()\` for email format validation, and \`z.number().positive()\` for numeric constraints.`,
        starterCode: `import { z } from "zod";

// TODO: Define a UserSchema with these fields and constraints:
// - name: string, minimum 2 characters
// - email: string, must be valid email format
// - age: number, must be positive (> 0)
// - role: must be one of "admin" | "user" | "guest" (use z.enum)
// - bio: optional string (use .optional())

const UserSchema = z.object({
  // fill this in
});

// Test with valid data — should not throw
const validUser = UserSchema.parse({
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  role: "admin",
});
console.log("Valid:", validUser);

// Test with invalid data — should throw ZodError
try {
  UserSchema.parse({
    name: "A",          // too short
    email: "not-email", // invalid format
    age: -5,            // not positive
    role: "superuser",  // not in enum
  });
} catch (err) {
  console.log("Validation failed (expected)");
}`,
        hints: [
          'z.string().min(2) — minimum length of 2 characters',
          'z.string().email() — validates email format',
          'z.number().positive() — must be greater than 0',
          'z.enum(["admin", "user", "guest"]) — restricts to these exact values',
          'Append .optional() to make a field optional: z.string().optional()'
        ],
        expectedOutput: `Valid: { name: 'Alice', email: 'alice@example.com', age: 30, role: 'admin', bio: undefined }
Validation failed (expected)`,
        solution: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Must be a valid email address"),
  age: z.number().positive("Age must be a positive number"),
  role: z.enum(["admin", "user", "guest"]),
  bio: z.string().optional(),
});

const validUser = UserSchema.parse({
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  role: "admin",
});
console.log("Valid:", validUser);

try {
  UserSchema.parse({
    name: "A",
    email: "not-email",
    age: -5,
    role: "superuser",
  });
} catch (err) {
  console.log("Validation failed (expected)");
}`
      },
      {
        title: 'Step 3: Type Inference with z.infer',
        instruction: `Derive the TypeScript type for a Zod schema using \`z.infer\` so the schema and the type never fall out of sync.\n\nWHY: Writing a separate \`interface User\` alongside a \`UserSchema\` creates two sources of truth that can diverge. \`z.infer<typeof UserSchema>\` generates the TypeScript type directly from the schema. Add a field to the schema and the type updates automatically — no manual sync required.\n\nHOW: Use the utility type \`z.infer<typeof MySchema>\` to derive the type. Export both the schema and the type.`,
        starterCode: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
  role: z.enum(["admin", "user", "guest"]),
  bio: z.string().optional(),
});

// TODO: Derive the User type from UserSchema using z.infer
// type User = ...

// TODO: Write a function createUser that accepts a User and returns it
// The return type should be User (inferred from z.infer)
function createUser(data) {
  return data;
}

// TODO: Add a new field 'createdAt: z.date()' to UserSchema above
// Notice that the User type automatically includes the new field — no manual update needed

const user = createUser({
  name: "Bob",
  email: "bob@example.com",
  age: 25,
  role: "user",
  createdAt: new Date(),
});

console.log(user.name, user.role);`,
        hints: [
          'type User = z.infer<typeof UserSchema>',
          'The inferred type is a plain TypeScript interface — you can use it anywhere you use a type or interface',
          'Try hovering over "User" in your editor to see the generated type definition',
          'z.date() validates that the value is a JavaScript Date instance'
        ],
        expectedOutput: `Bob user`,
        solution: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
  role: z.enum(["admin", "user", "guest"]),
  bio: z.string().optional(),
  createdAt: z.date(),
});

// Derived entirely from the schema — always in sync
type User = z.infer<typeof UserSchema>;

function createUser(data: User): User {
  return data;
}

const user = createUser({
  name: "Bob",
  email: "bob@example.com",
  age: 25,
  role: "user",
  createdAt: new Date(),
});

console.log(user.name, user.role); // Bob user`
      },
      {
        title: 'Step 4: Composing Schemas',
        instruction: `Build a \`CreateUserRequest\` schema from reusable parts and a discriminated union \`ApiResponse<T>\` for success/error responses.\n\nWHY: Zod schemas are composable — you can extend, merge, and nest them just like TypeScript types. \`z.discriminatedUnion\` is Zod's equivalent of a TypeScript discriminated union: it uses a key to pick which schema to validate against.\n\nHOW: Use \`.omit()\` or \`.extend()\` to derive schemas from existing ones. Use \`z.discriminatedUnion("key", [SchemaA, SchemaB])\` for discriminated unions.`,
        starterCode: `import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
  role: z.enum(["admin", "user", "guest"]),
});

// TODO: Derive CreateUserRequest by omitting 'id' from UserSchema
// (a new user doesn't have an id yet)
const CreateUserRequestSchema = /* ... */;

// TODO: Define a generic ApiResponse using z.discriminatedUnion on a "success" field
// Success case: { success: true, data: T }
// Error case:   { success: false, error: string }
// Hint: Zod doesn't support true generics — define two concrete schemas and union them
const SuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(), // data can be any validated payload
});

const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

const ApiResponseSchema = /* z.discriminatedUnion(...) */;

type ApiResponse = z.infer<typeof ApiResponseSchema>;

const ok: ApiResponse = { success: true, data: { id: 1, name: "Alice" } };
const err: ApiResponse = { success: false, error: "Not found" };

console.log(ok.success, err.error);`,
        hints: [
          'UserSchema.omit({ id: true }) — creates a new schema without the id field',
          'z.discriminatedUnion("success", [SuccessResponseSchema, ErrorResponseSchema])',
          'z.literal(true) matches only the boolean value true',
          'For a truly generic response schema at runtime, use z.unknown() for the data field and validate separately'
        ],
        expectedOutput: `true Not found`,
        solution: `import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
  role: z.enum(["admin", "user", "guest"]),
});

const CreateUserRequestSchema = UserSchema.omit({ id: true });
type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

const SuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
});

const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

const ApiResponseSchema = z.discriminatedUnion("success", [
  SuccessResponseSchema,
  ErrorResponseSchema,
]);

type ApiResponse = z.infer<typeof ApiResponseSchema>;

const ok: ApiResponse = { success: true, data: { id: 1, name: "Alice" } };
const err: ApiResponse = { success: false, error: "Not found" };

console.log(ok.success, err.error); // true Not found`
      },
      {
        title: 'Step 5: Safe Parse and Error Handling',
        instruction: `Use \`safeParse\` instead of \`parse\` to handle invalid data without throwing, and format ZodError messages for API consumers.\n\nWHY: \`parse\` throws a \`ZodError\` on failure. In a request handler this means you must wrap every call in try/catch. \`safeParse\` returns a discriminated union \`{ success: true, data } | { success: false, error }\` that you can inspect without exceptions — the same shape as the ApiResponse you built in the previous step.\n\nHOW: Call \`schema.safeParse(value)\`. Check \`result.success\`. If false, access \`result.error.issues\` to get the array of field-level errors.`,
        starterCode: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
  role: z.enum(["admin", "user", "guest"]),
});

type User = z.infer<typeof UserSchema>;

// TODO: Implement validateUser using safeParse (not parse)
// Return { success: true, data: User } or { success: false, errors: string[] }
function validateUser(input: unknown) {
  // use UserSchema.safeParse(input)
  // if failed, map result.error.issues to an array of strings like:
  // "name: String must contain at least 2 character(s)"
}

// Test cases
console.log(validateUser({ name: "Alice", email: "alice@example.com", age: 30, role: "admin" }));
console.log(validateUser({ name: "A", email: "bad", age: -1, role: "unknown" }));`,
        hints: [
          'const result = UserSchema.safeParse(input)',
          'result.success is true when valid, false when not',
          'result.error.issues is an array of { path: string[], message: string } objects',
          'Format each issue: issue.path.join(".") + ": " + issue.message'
        ],
        expectedOutput: `{ success: true, data: { name: 'Alice', email: 'alice@example.com', age: 30, role: 'admin' } }
{
  success: false,
  errors: [
    'name: String must contain at least 2 character(s)',
    'email: Invalid email',
    'age: Number must be greater than 0',
    'role: Invalid enum value. Expected ...'
  ]
}`,
        solution: `import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().positive(),
  role: z.enum(["admin", "user", "guest"]),
});

type User = z.infer<typeof UserSchema>;

type ValidationResult =
  | { success: true; data: User }
  | { success: false; errors: string[] };

function validateUser(input: unknown): ValidationResult {
  const result = UserSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.issues.map(
    (issue) => \`\${issue.path.join(".") || "root"}: \${issue.message}\`
  );
  return { success: false, errors };
}

console.log(validateUser({ name: "Alice", email: "alice@example.com", age: 30, role: "admin" }));
console.log(validateUser({ name: "A", email: "bad", age: -1, role: "unknown" }));`
      }
    ]
  },

  // ============================================================
  // ts-lab-9: Mapped & Conditional Types
  // ============================================================
  {
    id: 'ts-lab-9',
    languageId: 'typescript',
    level: 'mid',
    title: 'Mapped & Conditional Types',
    description: 'Master TypeScript\'s type-level programming: use keyof, indexed access, mapped types, conditional types, and the infer keyword to recreate standard utility types from scratch.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: keyof and Indexed Access',
        instruction: `Use \`keyof\` to get a union of an object type's keys, then use indexed access (\`T[K]\`) to get the type at a specific key.\n\nWHY: \`keyof\` and indexed access are the foundation of every mapped and utility type. They let you work with the shape of a type programmatically — derive keys as strings, pick the value type at a given key, or compute the union of all possible values.\n\nHOW: \`keyof User\` produces \`"id" | "name" | "email"\`. \`User["name"]\` produces \`string\`. \`User[keyof User]\` produces the union of all value types.`,
        starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// TODO: Use keyof to define the UserKey type
// Expected: "id" | "name" | "email" | "isActive"
type UserKey = /* keyof ... */;

// TODO: Use indexed access to get the type of the 'name' field
// Expected: string
type UserName = /* User["name"] */;

// TODO: Use T[keyof T] to get the union of all value types in User
// Expected: number | string | boolean
type UserValues = /* User[keyof User] */;

// TODO: Write a generic function getProperty<T, K extends keyof T> that
// returns the value of obj[key] with the correct type T[K]
function getProperty(obj, key) {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com", isActive: true };
const name = getProperty(user, "name"); // should be inferred as string
const id = getProperty(user, "id");     // should be inferred as number
console.log(name, id);`,
        hints: [
          'type UserKey = keyof User',
          'type UserName = User["name"]',
          'type UserValues = User[keyof User]',
          'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]'
        ],
        expectedOutput: `Alice 1`,
        solution: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type UserKey = keyof User;             // "id" | "name" | "email" | "isActive"
type UserName = User["name"];          // string
type UserValues = User[keyof User];    // number | string | boolean

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com", isActive: true };
const name = getProperty(user, "name"); // string
const id = getProperty(user, "id");     // number
console.log(name, id); // Alice 1`
      },
      {
        title: 'Step 3: Mapped Types',
        instruction: `Write mapped types that transform every property in an object type — making all properties \`readonly\` or all properties nullable.\n\nWHY: Mapped types let you apply a uniform transformation to every key in a type without repeating yourself. They are the mechanism behind built-in types like \`Readonly<T>\`, \`Partial<T>\`, and \`Required<T>\`.\n\nHOW: The syntax is \`{ [K in keyof T]: ... }\`. Add \`readonly\` before the key to make it read-only. Use \`T[K] | null\` to make the value nullable.`,
        starterCode: `interface Config {
  host: string;
  port: number;
  debug: boolean;
}

// TODO: Write a mapped type MyReadonly<T> that makes all properties readonly
// Expected: { readonly host: string; readonly port: number; readonly debug: boolean }
type MyReadonly<T> = {
  // [K in keyof T]: ...
};

// TODO: Write a mapped type Nullable<T> that makes all properties nullable (T[K] | null)
// Expected: { host: string | null; port: number | null; debug: boolean | null }
type Nullable<T> = {
  // [K in keyof T]: ...
};

// Verify by using the types
const frozen: MyReadonly<Config> = { host: "localhost", port: 3000, debug: true };
// frozen.host = "other"; // This should be a type error — uncomment to verify

const maybeConfig: Nullable<Config> = { host: null, port: 3000, debug: null };
console.log(frozen.host, maybeConfig.port);`,
        hints: [
          'type MyReadonly<T> = { readonly [K in keyof T]: T[K] }',
          'type Nullable<T> = { [K in keyof T]: T[K] | null }',
          'The "in" keyword iterates over every member of the keyof T union',
          'T[K] is the indexed access that gives you the original value type for each key'
        ],
        expectedOutput: `localhost 3000`,
        solution: `interface Config {
  host: string;
  port: number;
  debug: boolean;
}

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

const frozen: MyReadonly<Config> = { host: "localhost", port: 3000, debug: true };
// frozen.host = "other"; // Error: cannot assign to readonly property

const maybeConfig: Nullable<Config> = { host: null, port: 3000, debug: null };
console.log(frozen.host, maybeConfig.port); // localhost 3000`
      },
      {
        title: 'Step 4: Conditional Types',
        instruction: `Use conditional types (\`T extends U ? X : Y\`) to write types that branch based on the shape of \`T\`.\n\nWHY: Conditional types are the if/else of the type system. They allow you to express relationships that depend on the structure of a type — for example, "if T is nullable, remove the null; if T is an array, extract the element type".\n\nHOW: The syntax mirrors a ternary: \`type NonNullable<T> = T extends null | undefined ? never : T\`. The \`infer\` keyword lets you capture a type inside the extends clause.`,
        starterCode: `// TODO: Write a MyNonNullable<T> type that removes null and undefined from T
// Examples:
// MyNonNullable<string | null>      → string
// MyNonNullable<number | undefined> → number
// MyNonNullable<string | null | undefined> → string
type MyNonNullable<T> = /* T extends ... ? never : T */;

// TODO: Write an IsArray<T> type that resolves to true if T is an array, false otherwise
// Examples:
// IsArray<string[]> → true
// IsArray<string>   → false
// IsArray<number[]> → true
type IsArray<T> = /* T extends any[] ? ... : ... */;

// TODO: Write an Unpack<T> type that extracts the element type from an array
// Examples:
// Unpack<string[]>  → string
// Unpack<number[]>  → number
// Unpack<string>    → string (non-arrays pass through unchanged)
// Hint: use 'infer E' inside the extends clause
type Unpack<T> = /* T extends (infer E)[] ? E : T */;

// Verify
type T1 = MyNonNullable<string | null>;          // string
type T2 = IsArray<string[]>;                      // true
type T3 = IsArray<number>;                        // false
type T4 = Unpack<string[]>;                       // string
type T5 = Unpack<number>;                         // number`,
        hints: [
          'type MyNonNullable<T> = T extends null | undefined ? never : T',
          'type IsArray<T> = T extends any[] ? true : false',
          'type Unpack<T> = T extends (infer E)[] ? E : T',
          'infer introduces a type variable that TypeScript fills in during the check'
        ],
        expectedOutput: `// All type assertions hold — no TypeScript errors

type T1 = string              // MyNonNullable<string | null>
type T2 = true                // IsArray<string[]>
type T3 = false               // IsArray<number>
type T4 = string              // Unpack<string[]>
type T5 = number              // Unpack<number>`,
        solution: `type MyNonNullable<T> = T extends null | undefined ? never : T;

type IsArray<T> = T extends any[] ? true : false;

type Unpack<T> = T extends (infer E)[] ? E : T;

// Verification (no runtime output — check with tsc or hover in IDE)
type T1 = MyNonNullable<string | null>;           // string
type T2 = IsArray<string[]>;                       // true
type T3 = IsArray<number>;                         // false
type T4 = Unpack<string[]>;                        // string
type T5 = Unpack<number>;                          // number

// Runtime assertion to confirm the file compiles
const x: T1 = "hello";
console.log(x); // hello`
      },
      {
        title: 'Step 5: Recreate Utility Types',
        instruction: `Implement your own \`Partial<T>\`, \`Required<T>\`, \`Pick<T, K>\`, and \`Omit<T, K>\` from scratch using mapped types.\n\nWHY: Understanding how utility types are implemented demystifies a large portion of advanced TypeScript. Once you can write these yourself, you can create domain-specific utility types using the same building blocks.\n\nHOW: Use \`?\` in a mapped type to make properties optional, \`-?\` to remove optionality, restrict \`K\` with \`extends keyof T\` for Pick, and use \`Exclude<keyof T, K>\` in a mapped type for Omit.`,
        starterCode: `// Implement each utility type from scratch.
// Do not use the built-in TypeScript versions.

// TODO: MyPartial<T> — make all properties optional
type MyPartial<T> = {
  // [K in keyof T]?: ...
};

// TODO: MyRequired<T> — make all properties required (remove optionality)
// Hint: -? removes the optional modifier
type MyRequired<T> = {
  // [K in keyof T]-?: ...
};

// TODO: MyPick<T, K extends keyof T> — keep only the keys in K
type MyPick<T, K extends keyof T> = {
  // [P in K]: ...
};

// TODO: MyOmit<T, K extends keyof T> — remove the keys in K
// Hint: use Exclude<keyof T, K> to get the remaining keys
type MyOmit<T, K extends keyof T> = {
  // [P in Exclude<keyof T, K>]: ...
};

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

// Verify
type PartialUser = MyPartial<User>;      // all optional
type RequiredUser = MyRequired<User>;    // bio no longer optional
type UserPreview = MyPick<User, "id" | "name">;  // only id and name
type UserWithoutBio = MyOmit<User, "bio">;        // no bio field`,
        hints: [
          'type MyPartial<T> = { [K in keyof T]?: T[K] }',
          'type MyRequired<T> = { [K in keyof T]-?: T[K] }',
          'type MyPick<T, K extends keyof T> = { [P in K]: T[P] }',
          'type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }',
          'Exclude<"a"|"b"|"c", "b"> results in "a"|"c" — it filters a union'
        ],
        expectedOutput: `// All type assignments compile without errors:
const p: MyPartial<User> = {};             // ok — all optional
const r: MyRequired<User> = { id: 1, name: "Alice", email: "a@b.com", bio: "hi" }; // ok — bio now required
const preview: MyPick<User, "id"|"name"> = { id: 1, name: "Alice" }; // ok
const noBio: MyOmit<User, "bio"> = { id: 1, name: "Alice", email: "a@b.com" }; // ok`,
        solution: `type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

const p: MyPartial<User> = {};
const r: MyRequired<User> = { id: 1, name: "Alice", email: "alice@example.com", bio: "Developer" };
const preview: MyPick<User, "id" | "name"> = { id: 1, name: "Alice" };
const noBio: MyOmit<User, "bio"> = { id: 1, name: "Alice", email: "alice@example.com" };

console.log(r.name, preview.id, noBio.email); // Alice 1 alice@example.com`
      }
    ]
  },

  // ============================================================
  // ts-lab-10: JS-to-TS Migration
  // ============================================================
  {
    id: 'ts-lab-10',
    languageId: 'typescript',
    level: 'senior',
    title: 'JS-to-TS Migration',
    description: 'Learn the incremental strategy for migrating a JavaScript codebase to TypeScript: tsconfig strict mode, fixing implicit any errors, typing function signatures, and writing declaration files.',
    estimatedMinutes: 40,
    steps: [
      {
        title: 'Step 1: Set Up Your TypeScript Environment',
        setupReference: true,
        instruction: 'Before writing TypeScript, ensure your development environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 22 LTS (via nvm), TypeScript 5.x installed globally, ts-node or tsx for running .ts files directly, and VS Code with built-in TypeScript IntelliSense. Complete all setup steps and verify compilation works before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `tsc --version` to verify TypeScript installation',
          'Test: `echo "console.log(\'TS works\')" > test.ts && npx ts-node test.ts`'
        ],
        expectedOutput: 'TypeScript 5.x.x\nts-node v10.x.x\nTS works (compilation and execution successful)',
        solution: null
      },
      {
        title: 'Step 2: Initial Migration',
        instruction: `Rename a \`.js\` file to \`.ts\` and see what TypeScript reports — without changing any code yet.\n\nWHY: The first step in any JS→TS migration is not to fix all errors at once. Run the compiler to see what it finds. Common initial errors: implicit \`any\` on parameters, missing return types, and implicit globals. This gives you a prioritized list of what needs attention.\n\nHOW: Rename the file, run \`tsc --noEmit --allowJs\` to check without emitting output. The \`allowJs\` flag lets TypeScript process \`.js\` files alongside \`.ts\` files — useful during an incremental migration.`,
        starterCode: `// This is JavaScript code. Rename this file to migration.ts
// Run: npx tsc --noEmit migration.ts
// and observe the errors TypeScript reports.

// No type annotations — TypeScript will infer what it can
// and flag implicit 'any' where it cannot

function processOrder(order) {
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = order.coupon ? order.coupon.value : 0;
  return {
    orderId: order.id,
    total: total - discount,
    currency: order.currency,
  };
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

const result = processOrder({
  id: "ORD-001",
  items: [{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }],
  coupon: { value: 5 },
  currency: "USD",
});

console.log(formatCurrency(result.total, result.currency));`,
        hints: [
          'tsc will report: Parameter \'order\' implicitly has an \'any\' type',
          'These errors exist because TypeScript cannot infer the shape of the parameter from its usage alone',
          'The goal of this step is to SEE the errors, not fix them yet — understand what tsc is telling you',
          'In a real migration, add "allowJs": true and "checkJs": true to tsconfig.json to check JS files before renaming them'
        ],
        expectedOutput: `migration.ts(7,22): error TS7006: Parameter 'order' implicitly has an 'any' type.
migration.ts(14,27): error TS7006: Parameter 'amount' implicitly has an 'any' type.
migration.ts(14,35): error TS7006: Parameter 'currency' implicitly has an 'any' type.

// After adding types:
$25.00`,
        solution: `// migration.ts — after initial type annotations

interface OrderItem {
  price: number;
  quantity: number;
}

interface Coupon {
  value: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  coupon?: Coupon;
  currency: string;
}

interface OrderResult {
  orderId: string;
  total: number;
  currency: string;
}

function processOrder(order: Order): OrderResult {
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = order.coupon ? order.coupon.value : 0;
  return {
    orderId: order.id,
    total: total - discount,
    currency: order.currency,
  };
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

const result = processOrder({
  id: "ORD-001",
  items: [{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }],
  coupon: { value: 5 },
  currency: "USD",
});

console.log(formatCurrency(result.total, result.currency)); // $25.00`
      },
      {
        title: 'Step 3: tsconfig Strict Mode',
        instruction: `Enable \`"strict": true\` in \`tsconfig.json\` and understand what each flag it activates actually does.\n\nWHY: TypeScript's \`strict\` flag is a shorthand that enables a bundle of strictness checks. On a fresh project you should always enable it. On a migrating project you enable it incrementally — either all at once and fix the errors, or one flag at a time.\n\nHOW: Add \`"strict": true\` to your \`tsconfig.json\` compilerOptions. The key sub-flags are: \`noImplicitAny\` (no untyped parameters), \`strictNullChecks\` (null/undefined are not assignable to other types), \`strictFunctionTypes\`, and \`strictPropertyInitialization\`.`,
        starterCode: `// tsconfig.json to create in your project root:
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "commonjs",
//     "strict": true,
//     "outDir": "./dist",
//     "rootDir": "./src"
//   }
// }

// The following code has errors under strict mode.
// Fix each one and explain what flag it violates.

// Error 1: strictNullChecks — value can be null
function getLength(value: string | null) {
  return value.length; // null is not safe to access .length on
}

// Error 2: noImplicitAny — callback parameter has no type
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // this is fine — TypeScript infers n: number

// Harder case: callback from an untyped source
function applyToAll(arr: any[], fn) {  // fn has implicit any
  return arr.map(fn);
}

// Error 3: strictNullChecks — result of find can be undefined
const items = [{ id: 1, name: "apple" }, { id: 2, name: "banana" }];
function findItem(id: number) {
  const item = items.find(i => i.id === id);
  return item.name; // item might be undefined
}`,
        hints: [
          'Fix null: use optional chaining value?.length or a null check: if (value === null) return 0',
          'Fix implicit any on fn: (fn: (item: any) => any) or use a generic: <T, R>(arr: T[], fn: (item: T) => R)',
          'Fix undefined from find: check for undefined before accessing — if (!item) return null',
          'strict: true enables ~8 flags; the most impactful are noImplicitAny and strictNullChecks'
        ],
        expectedOutput: `// After fixes — no TypeScript errors with strict: true

getLength("hello") // 5
getLength(null)    // 0 (handled null case)
findItem(1)        // "apple"
findItem(99)       // null (handled undefined case)`,
        solution: `// tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "commonjs",
//     "strict": true,
//     "outDir": "./dist",
//     "rootDir": "./src"
//   }
// }

// Fix 1: handle null with a guard (strictNullChecks)
function getLength(value: string | null): number {
  if (value === null) return 0;
  return value.length;
}

// Fix 2: explicit generic removes implicit any (noImplicitAny)
function applyToAll<T, R>(arr: T[], fn: (item: T) => R): R[] {
  return arr.map(fn);
}

// Fix 3: handle undefined from Array.find (strictNullChecks)
const items = [{ id: 1, name: "apple" }, { id: 2, name: "banana" }];
function findItem(id: number): string | null {
  const item = items.find(i => i.id === id);
  if (!item) return null;
  return item.name;
}

console.log(getLength("hello")); // 5
console.log(getLength(null));    // 0
console.log(findItem(1));        // apple
console.log(findItem(99));       // null`
      },
      {
        title: 'Step 4: Typing Function Signatures',
        instruction: `Replace \`any\` with proper types or \`unknown\` in function signatures, and add explicit return types.\n\nWHY: \`any\` opts the value out of the type system entirely — TypeScript will not catch errors involving it. \`unknown\` is the safer alternative: it forces you to narrow the type before using it. Explicit return types act as a contract — if the implementation returns something unexpected, TypeScript tells you at the function, not at every call site.\n\nHOW: Replace \`any\` parameter types with proper interfaces or generics. Replace \`any\` return types with the actual shape. Use \`unknown\` for values you genuinely don't know the type of, then narrow with \`typeof\`, \`instanceof\`, or a type guard.`,
        starterCode: `// These functions use 'any' — replace with proper types

// BAD: any erases type safety
function parseJson(input: any): any {
  return JSON.parse(input);
}

// BAD: any on parameter means anything goes
function logError(error: any): void {
  console.error(error.message); // what if error has no .message?
}

// BAD: any[] loses element type information
function firstNonNull(arr: any[]): any {
  return arr.find(x => x !== null && x !== undefined);
}

// TODO: Fix parseJson — input should be string, return should be unknown
// (we can't know what JSON.parse returns at compile time without runtime checks)

// TODO: Fix logError — use unknown and narrow to Error before accessing .message

// TODO: Fix firstNonNull using a generic T so the return type preserves element type`,
        hints: [
          'parseJson(input: string): unknown — return unknown forces callers to narrow',
          'logError(error: unknown): if (error instanceof Error) { console.error(error.message) }',
          'firstNonNull<T>(arr: (T | null | undefined)[]): T | undefined',
          'unknown is like any but safe — you must narrow before using'
        ],
        expectedOutput: `// Type-safe versions compile without errors

const data = parseJson(\'{"name":"Alice"}\');
// data is unknown — must narrow before use:
if (typeof data === "object" && data !== null && "name" in data) {
  console.log((data as { name: string }).name); // Alice
}

logError(new Error("timeout")); // Error: timeout
logError("plain string error"); // plain string error

firstNonNull([null, undefined, 42, "hello"]); // 42 (type: number | string)`,
        solution: `// Fixed: proper types instead of any

function parseJson(input: string): unknown {
  return JSON.parse(input);
}

function logError(error: unknown): void {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  } else if (typeof error === "string") {
    console.error("Error:", error);
  } else {
    console.error("Unknown error:", error);
  }
}

function firstNonNull<T>(arr: (T | null | undefined)[]): T | undefined {
  return arr.find((x): x is T => x !== null && x !== undefined);
}

const data = parseJson('{"name":"Alice"}');
if (typeof data === "object" && data !== null && "name" in data) {
  console.log((data as { name: string }).name); // Alice
}

logError(new Error("timeout"));
logError("plain string error");

const result = firstNonNull([null, undefined, 42, "hello"]);
console.log(result); // 42`
      },
      {
        title: 'Step 5: Declaration Files',
        instruction: `Write a \`.d.ts\` declaration file to add types to a JavaScript module that ships without them.\n\nWHY: Many older npm packages don't include TypeScript types. Without a declaration file, TypeScript treats every import from them as \`any\`. Writing a \`.d.ts\` file teaches TypeScript the shape of the module so you get IntelliSense and type checking for all uses.\n\nHOW: Create a file with the same name as the module (e.g. \`math-utils.d.ts\`). Use \`declare module "module-name" { ... }\` to describe its exports. For local files without types, place the \`.d.ts\` file alongside the \`.js\` file.`,
        starterCode: `// Imagine this is a legacy JS file: math-utils.js
// It has no TypeScript types. You cannot modify it.
//
// export function add(a, b) { return a + b; }
// export function multiply(a, b) { return a * b; }
// export function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
// export const PI = 3.14159;
// export function formatNumber(n, decimals) { return n.toFixed(decimals); }

// TODO: Write the declaration file for math-utils
// Create a file called math-utils.d.ts with declare module "math-utils" { ... }
// or, for a local file, a file math-utils.d.ts in the same folder with
// the export declarations (no 'declare module' wrapper needed for ambient declarations)

// The declarations you need:
// add(a: number, b: number): number
// multiply(a: number, b: number): number
// clamp(value: number, min: number, max: number): number
// PI: number  (use 'const')
// formatNumber(n: number, decimals: number): string

// Once the .d.ts file exists, this import should type-check:
// import { add, PI } from "./math-utils";
// const sum: number = add(1, 2);  // OK
// const x: string = add(1, 2);   // Error: number not assignable to string`,
        hints: [
          'declare module "./math-utils" { export function add(a: number, b: number): number; ... }',
          'For ambient declarations in a .d.ts file (same folder), omit declare module and just write export function ...',
          'declare const PI: number — use declare for values you are describing but not implementing',
          'Place the .d.ts file alongside the .js file — TypeScript will pick it up automatically'
        ],
        expectedOutput: `// math-utils.d.ts content:

declare module "./math-utils" {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export function clamp(value: number, min: number, max: number): number;
  export const PI: number;
  export function formatNumber(n: number, decimals: number): string;
}

// After creating the .d.ts file:
// import { add, PI } from "./math-utils";
// add(1, 2)          → 3  (type: number)
// add(1, "2")        → Type error: Argument of type 'string' is not assignable to 'number'`,
        solution: `// math-utils.d.ts
// Place this file alongside math-utils.js

declare module "./math-utils" {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export function clamp(value: number, min: number, max: number): number;
  export const PI: number;
  export function formatNumber(n: number, decimals: number): string;
}

// --- Usage in typed TypeScript file ---
// import { add, multiply, clamp, PI, formatNumber } from "./math-utils";

// const sum: number = add(3, 4);               // 7
// const product: number = multiply(3, 4);       // 12
// const limited: number = clamp(150, 0, 100);   // 100
// const circle: number = 2 * PI * 5;            // ~31.4
// const formatted: string = formatNumber(3.14159, 2); // "3.14"

// Type error examples (caught by TypeScript):
// add(1, "2");          // Error: string not assignable to number
// const x: string = add(1, 2); // Error: number not assignable to string`
      }
    ]
  }
];
