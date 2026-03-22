# TypeScript — Beginner Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/typescript/beginner)

## Prerequisites

- Solid understanding of JavaScript (ES6+ features)
- Familiarity with Node.js and npm
- Completion of the JavaScript Mid guide is recommended

## Estimated Time

35 hours

---

## 1. Type Annotations and Inference

TypeScript adds a type system on top of JavaScript. The most fundamental concept is the **type annotation**: you tell the compiler what type a variable, parameter, or return value should be.

### Primitive Types

TypeScript has the same primitive types as JavaScript, but you can annotate them explicitly:

```typescript
let username: string = "alice";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
let bigNum: bigint = 9007199254740991n;
let uniqueKey: symbol = Symbol("id");
```

### Type Inference

You do not need to annotate everything. TypeScript infers types from context:

```typescript
let city = "Berlin";   // inferred: string
let count = 42;        // inferred: number
let active = true;     // inferred: boolean
```

Hover over any variable in VS Code (Cmd/Ctrl+K, Cmd/Ctrl+I) to see what TypeScript has inferred.

### `const` vs `let` and Literal Types

```typescript
const direction = "north";  // type: "north" (literal type)
let mutable = "north";      // type: string (widened because let is mutable)
```

`const` declarations cannot be reassigned, so TypeScript narrows them to the exact literal value. `let` declarations are mutable, so TypeScript widens to the base type.

### `any` vs `unknown`

```typescript
let dangerous: any = "hello";
dangerous.nonExistent.method(); // No compile error — crashes at runtime

let safe: unknown = "hello";
// safe.toUpperCase(); // Error: Object is of type 'unknown'
if (typeof safe === "string") {
  safe.toUpperCase(); // OK after narrowing
}
```

- `any` disables all type checking — avoid it whenever possible
- `unknown` is the type-safe counterpart: you must narrow before using it
- Prefer `unknown` when you genuinely do not know the type

### Arrays and Tuples

```typescript
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob"];

// Readonly array — cannot push, pop, or modify
let frozen: readonly number[] = [1, 2, 3];

// Tuple: fixed length, typed per position
let coordinate: [number, number] = [40.71, -74.00];

// Labeled tuple for clarity
let user: [name: string, age: number] = ["Alice", 30];

// Optional and rest elements in tuples
let flexible: [string, number?] = ["hello"];
let atLeastOne: [string, ...number[]] = ["scores", 95, 87, 92];
```

**Pitfalls:**
- Tuples look like arrays at runtime — TypeScript only enforces structure at compile time
- `const point = [1, 2] as const` creates a readonly tuple type `readonly [1, 2]`

### Object Types and Index Signatures

```typescript
let person: { name: string; age: number; email?: string } = {
  name: "Alice",
  age: 30,
};

// Readonly properties
let config: { readonly host: string; readonly port: number } = {
  host: "localhost",
  port: 3000,
};

// Index signatures for dynamic keys
let scores: { [studentName: string]: number } = {};
scores["Alice"] = 95;
```

When you assign an object literal directly to a typed variable, TypeScript performs **excess property checking** — it rejects any properties not declared in the target type. This catches typos like `{ nme: "Alice" }` when `name` was expected.

---

## 2. Interfaces vs Type Aliases

TypeScript gives you two ways to name a type: `interface` and `type`. They overlap significantly but have important differences.

### Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Extension — creates a new interface with all parent properties
interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

// Declaration merging — two same-named interfaces combine
interface Window {
  myCustomProperty: string;
}

// Class contracts
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

class UserModel implements Serializable {
  constructor(public name: string) {}
  serialize(): string { return JSON.stringify({ name: this.name }); }
  deserialize(data: string): void { this.name = JSON.parse(data).name; }
}
```

### Type Aliases

```typescript
type ID = string | number;              // Union (cannot be an interface)
type Callback = (data: string) => void; // Function type
type Pair<T> = [T, T];                  // Tuple with generics
type StringOrNull = string | null;      // Nullable

// Intersection for combining object shapes
type AdminUser = User & {
  role: "admin";
  permissions: string[];
};
```

### When to Use Which

| Scenario | Recommendation |
|---|---|
| Object shapes for public APIs | `interface` — supports `extends` and declaration merging |
| Union types (`string \| number`) | `type` — interfaces cannot represent unions |
| Tuples and function types | `type` — more natural syntax |
| Class contracts | `interface` — works with `implements` |
| Mapped or computed types | `type` — interfaces cannot do this |
| Library augmentation (e.g., `Window`) | `interface` — requires declaration merging |

**Performance note:** `interface extends` is faster for the compiler than type intersection (`&`). The TypeScript compiler caches interface relationships but must recompute intersections each time.

---

## 3. Enums vs `as const`

### Numeric Enums and Their Quirks

```typescript
enum Direction { Up, Down, Left, Right }

// Compiled JavaScript includes reverse mappings:
// { Up: 0, Down: 1, ..., 0: "Up", 1: "Down", ... }

Object.values(Direction);
// [0, 1, 2, 3, "Up", "Down", "Left", "Right"] — probably not what you want
```

### String Enums

```typescript
enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}
```

String enums have no reverse mapping, but they enforce nominal typing: you cannot pass `"INFO"` directly where `LogLevel` is expected — you must use `LogLevel.Info`.

### The Modern Alternative: `as const`

```typescript
const LOG_LEVELS = {
  Debug: "DEBUG",
  Info: "INFO",
  Warn: "WARN",
  Error: "ERROR",
} as const;

// Extract a union of the values
type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];
// "DEBUG" | "INFO" | "WARN" | "ERROR"

function log(message: string, level: LogLevel): void {
  console.log(`[${level}] ${message}`);
}

log("Starting", LOG_LEVELS.Info); // OK
log("Starting", "INFO");          // Also OK — raw strings are accepted
```

**Why `as const` is often better:**
- Plain JavaScript — no special compilation, no runtime surprises
- Raw string literals are accepted directly (no import needed)
- Works with `--isolatedModules` (required by Vite, esbuild)
- No reverse-mapping bloat

**When enums still make sense:**
- Numeric bitmasks where integer values carry meaning (`Read = 1, Write = 2, Execute = 4`)
- Projects with ORM/code-generation tooling that expects enum syntax

---

## 4. Union and Intersection Types

### Union Types

A union type `A | B` means the value can be A **or** B:

```typescript
type StringOrNumber = string | number;

function formatId(id: StringOrNumber): string {
  if (typeof id === "string") {
    return id.toUpperCase();       // TypeScript knows id is string
  }
  return "#" + id.toString().padStart(6, "0"); // id is number
}
```

### String Literal Unions

```typescript
type Status = "pending" | "active" | "inactive" | "deleted";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
```

String literal unions are plain JavaScript — no compilation overhead, readable in stack traces, and callers pass raw strings directly.

### Discriminated Unions

```typescript
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
  }
}
```

Each member shares a common property (`kind`) with a unique literal type. TypeScript uses this discriminant to narrow the type in switch/if blocks.

### Intersection Types

An intersection type `A & B` requires the value to satisfy **all** types:

```typescript
type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };

type Person = HasName & HasAge & HasEmail;
// Must have name, age, AND email

type Timestamped<T> = T & { createdAt: Date; updatedAt: Date };
```

**Key distinction:** Union widens (either A or B); intersection narrows (both A and B).

---

## 5. Generics Basics

Generics let you write reusable code that works with any type while preserving type safety. Think of them as "type parameters."

### The Problem Generics Solve

```typescript
// Without generics: type information is lost
function firstElementAny(arr: any[]): any {
  return arr[0];
}
const val = firstElementAny([1, 2, 3]); // val is any — no help

// With generics: type flows through
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
const num = firstElement([1, 2, 3]);           // num is number | undefined
const str = firstElement(["a", "b", "c"]);     // str is string | undefined
```

### Generic Constraints

```typescript
// T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "hi");     // OK — strings have .length
longest([1, 2, 3], [4, 5]); // OK — arrays have .length
// longest(10, 20);          // Error — numbers don't have .length
```

### Key Constraint: `keyof`

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age");   // number
// getProperty(user, "invalid");         // Error
```

### Generic Interfaces and Default Type Parameters

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

`E = Error` provides a default: `Result<string>` is the same as `Result<string, Error>`.

### Generic Classes

```typescript
class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
}

const numberStack = new Stack<number>();
numberStack.push(1);
const top = numberStack.pop(); // number | undefined
```

TypeScript infers generic type arguments from runtime arguments — you rarely need to write them explicitly. Only provide them when inference is ambiguous.

---

## 6. Function Types and Overloads

### Function Type Annotations

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function greet(name: string, greeting?: string): string {
  return (greeting || "Hello") + ", " + name + "!";
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### Function Type Aliases

```typescript
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;
```

### Function Overloads

```typescript
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): string | number {
  if (typeof input === "string") return parseInt(input, 10);
  return input.toString();
}

const num = parse("42"); // TypeScript knows: number
const str = parse(42);   // TypeScript knows: string
```

**Rules:**
- The implementation signature is NOT visible to callers
- Overloads are checked in declaration order — put more specific signatures first
- Often, generics or conditional types are simpler than overloads

### `void`, `never`, and `unknown`

| Type | Meaning |
|---|---|
| `void` | Function returns nothing useful (actually returns `undefined`) |
| `never` | Function never returns — always throws or runs infinitely |
| `unknown` | Value of uncertain type — must narrow before using |

```typescript
function logMessage(msg: string): void {
  console.log(msg);
}

function throwError(message: string): never {
  throw new Error(message);
}

function processInput(input: unknown): string {
  if (typeof input === "string") return input.toUpperCase();
  if (typeof input === "number") return input.toFixed(2);
  return String(input);
}
```

`never` also represents the empty type (no possible values). After exhaustive narrowing, the remaining type is `never`.

---

## 7. tsconfig.json Essentials

### Recommended Starter Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "sourceMap": true,
    "declaration": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### What `strict: true` Enables

`strict: true` is shorthand for seven flags:

| Flag | What It Catches |
|---|---|
| `strictNullChecks` | `null`/`undefined` used where a value is expected |
| `noImplicitAny` | Parameters without type annotations |
| `strictFunctionTypes` | Unsafe function parameter assignment |
| `strictPropertyInitialization` | Class properties not set in constructor |
| `strictBindCallApply` | Incorrect `.call`, `.bind`, `.apply` arguments |
| `useUnknownInCatchVariables` | Makes caught errors `unknown` instead of `any` |
| `alwaysStrict` | Emits `"use strict"` in output files |

Always enable `strict: true` on new projects.

### Key Options Explained

- **`moduleResolution: "bundler"`** (TS 5.0+) — matches how modern bundlers resolve imports. Use for Vite, esbuild, webpack projects.
- **`verbatimModuleSyntax`** (TS 5.0+) — enforces `import type` for type-only imports. Replaces the older `isolatedModules` flag.
- **`noUncheckedIndexedAccess`** — makes `arr[0]` return `T | undefined` instead of `T`, catching out-of-bounds access.
- **`skipLibCheck: true`** — skips type-checking `.d.ts` files from node_modules, speeding up compilation.
- **`declaration: true`** — generates `.d.ts` files alongside compiled JavaScript; essential for library authors.

---

## 8. Type Inference and Type Narrowing

### Type Inference

TypeScript infers types from context so you write fewer annotations:

```typescript
let message = "hello";   // string
let count = 42;           // number
let items = [1, 2, 3];   // number[]
let mixed = [1, "two"];  // (string | number)[]

function add(a: number, b: number) {
  return a + b; // return type inferred: number
}

const direction = "north"; // type: "north" (literal)
let mutable = "north";     // type: string (widened)
```

### Narrowing Techniques

**`typeof` narrowing:**
```typescript
function process(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // value is string
  }
  return value.toFixed(2); // value is number
}
```

**`instanceof` narrowing:**
```typescript
function formatDate(input: string | Date): string {
  if (input instanceof Date) {
    return input.toISOString(); // input is Date
  }
  return new Date(input).toISOString(); // input is string
}
```

**`in` operator narrowing:**
```typescript
interface Dog { bark(): void; breed: string }
interface Cat { meow(): void; color: string }

function petSound(pet: Dog | Cat): void {
  if ("bark" in pet) {
    pet.bark(); // pet is Dog
  } else {
    pet.meow(); // pet is Cat
  }
}
```

**Truthiness narrowing:**
```typescript
function printLength(str: string | null | undefined): void {
  if (str) {
    console.log(str.length); // str is string (not null/undefined)
  }
}
```

**Discriminated union narrowing:**
```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
  }
}
```

### Custom Type Guards

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "email" in value
  );
}

if (isUser(input)) {
  console.log(input.name); // TypeScript knows input is User
}
```

### Assertion Functions

```typescript
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Expected a number, got " + typeof value);
  }
}

function double(input: unknown): number {
  assertIsNumber(input);
  return input * 2; // TypeScript knows input is number after assertion
}
```

### Important Pitfalls

- `typeof null === "object"` — you must add `value !== null` when narrowing objects
- `Array.filter` does not narrow types by default — use a type predicate: `arr.filter((x): x is string => typeof x === "string")`
- Narrowing only applies within the current scope; assign to a new variable if needed across function calls

---

## 9. Practical Tips for Beginners

### Let TypeScript Infer

Do not over-annotate. Write annotations for function parameters and complex return types, but let inference handle the rest:

```typescript
// Unnecessary — TypeScript infers the return type
function add(a: number, b: number): number {
  return a + b;
}

// Better — annotate parameters, let return type be inferred
function add(a: number, b: number) {
  return a + b;
}
```

### Use `as const` for Constant Data

```typescript
const config = {
  apiUrl: "https://api.example.com",
  retries: 3,
  timeout: 5000,
} as const;
// config.retries has type 3, not number
// config.apiUrl has type "https://api.example.com", not string
```

### Avoid `any` — Use `unknown` Instead

When receiving data from an external source (API, user input, parsed JSON), type it as `unknown` and narrow:

```typescript
async function fetchData(url: string): Promise<unknown> {
  const res = await fetch(url);
  return res.json();
}

const data = await fetchData("/api/users");
if (Array.isArray(data)) {
  // data is now narrowed to any[]
}
```

### Use Exhaustive Switches

```typescript
function assertNever(value: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(value));
}

function handleShape(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    default: return assertNever(shape); // Compile error if a case is missing
  }
}
```

---

## 10. Recommended Resources

- **The TypeScript Handbook** — https://www.typescriptlang.org/docs/handbook/
- **TypeScript Playground** — https://www.typescriptlang.org/play
- **freeCodeCamp** — "Learn TypeScript – Full Tutorial"
- **Jack Herrington** — "No BS TS" series on YouTube
- **Matt Pocock** — Total TypeScript (totaltypescript.com)

---

## Summary

You now understand the core building blocks of TypeScript:

- **Type annotations** — primitives, arrays, tuples, objects, and index signatures
- **Interfaces vs type aliases** — when to use each and how they differ
- **Enums and `as const`** — trade-offs and the modern `as const` pattern
- **Union and intersection types** — composing types with `|` and `&`
- **Generics basics** — writing reusable, type-safe functions, interfaces, and classes
- **Function types** — parameters, return types, overloads, `void`, `never`, `unknown`
- **tsconfig.json** — essential compiler options and strict mode
- **Type inference and narrowing** — letting TypeScript work for you

These foundations prepare you for the Mid level, where you will explore advanced generics, utility types, conditional types, and more.

## Next Steps

After completing this level, proceed to [TypeScript Mid](../TypeScript/Mid.md).
