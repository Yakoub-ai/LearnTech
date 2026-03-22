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
        title: 'Step 1: Add Basic Type Annotations',
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
        title: 'Step 2: Define Interfaces',
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
        title: 'Step 3: Use Generics',
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
let score: null = null;
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

interface User {
  id: number;
  name: string;
  email: string;
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
  }
];
