# TypeScript -- Beginner Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/typescript/beginner)

## Prerequisites

- Solid understanding of JavaScript (ES6+ features)
- Familiarity with Node.js and npm
- Completion of the JavaScript Mid guide is recommended

## Estimated Time

35 hours

---

## 1. Type Annotations and Inference

TypeScript adds a static type system on top of JavaScript. The most fundamental concept is the **type annotation**: you tell the compiler what type a variable, parameter, or return value should be.

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
let city = "Berlin";   // inferred as string
let count = 42;        // inferred as number
const PI = 3.14159;    // inferred as literal 3.14159 (const narrows)
```

**Key rule:** `const` declarations infer literal types because the value cannot change. `let` declarations infer wider types because the value can be reassigned.

### The `any` vs `unknown` Distinction

- `any` disables type checking entirely -- avoid it whenever possible
- `unknown` is the type-safe counterpart: you must narrow it before use

```typescript
let dangerous: any = "hello";
dangerous.nonExistent();  // no compile error -- crashes at runtime

let safe: unknown = "hello";
// safe.toUpperCase();  // Error: Object is of type 'unknown'
if (typeof safe === "string") {
    safe.toUpperCase();  // OK after narrowing
}
```

### Arrays and Tuples

```typescript
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob"];

// Readonly arrays prevent mutation
let frozen: readonly number[] = [1, 2, 3];
// frozen.push(4);  // Error: Property 'push' does not exist

// Tuples: fixed-length arrays with specific types at each position
let coordinate: [number, number] = [40.71, -74.00];
let record: [string, number, boolean] = ["Alice", 30, true];

// Labeled tuples (TS 4.0+)
let user: [name: string, age: number] = ["Alice", 30];

// Optional tuple elements
let flexible: [string, number?] = ["hello"];

// Rest elements in tuples
let atLeastOne: [string, ...number[]] = ["scores", 95, 87, 92];
```

**Common pitfall:** Tuples look like arrays at runtime. TypeScript only enforces their structure at compile time.

### Object Types and Index Signatures

```typescript
let person: { name: string; age: number; email?: string } = {
    name: "Alice",
    age: 30
};

// Index signatures for dynamic keys
let scores: { [studentName: string]: number } = {};
scores["Alice"] = 95;
scores["Bob"] = 87;
```

When you assign an object literal directly to a typed variable, TypeScript performs **excess property checking** -- it rejects any properties not declared in the target type. This catches typos like `{ nme: "Alice" }` when `name` was expected.

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

// Extension
interface AdminUser extends User {
    role: "admin";
    permissions: string[];
}

// Declaration merging -- unique to interfaces
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
    serialize() { return JSON.stringify({ name: this.name }); }
    deserialize(data: string) { this.name = JSON.parse(data).name; }
}
```

### Type Aliases

```typescript
type ID = string | number;              // unions
type Callback = (data: string) => void; // function types
type Pair<T> = [T, T];                  // tuples
type StringOrNull = string | null;      // nullable

type AdminUser = User & {               // intersections
    role: "admin";
    permissions: string[];
};
```

### When to Use Which

| Use `interface` when... | Use `type` when... |
|---|---|
| Defining object shapes for public APIs | Defining unions, tuples, or primitives |
| Class `implements` contracts | Using mapped or conditional types |
| You need declaration merging | Intersection types with `&` |
| Extending with `extends` | Renaming primitives (e.g., `type ID = string`) |

**Performance note:** `interface extends` is faster for the compiler than type intersection (`&`). The TypeScript compiler caches interface relationships but must recompute intersections each time.

---

## 3. Enums vs `as const`

### Numeric Enums and Their Quirks

```typescript
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}
```

Numeric enums compile to a **reverse-mapped object**:

```javascript
// Compiled output
{ Up: 0, Down: 1, Left: 2, Right: 3, 0: "Up", 1: "Down", 2: "Left", 3: "Right" }
```

This means `Object.values(Direction)` returns `[0, 1, 2, 3, "Up", "Down", "Left", "Right"]` -- probably not what you intended.

### String Enums

```typescript
enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}
```

String enums do NOT have reverse mappings, but they enforce **nominal typing**: you cannot pass the raw string `"INFO"` where `LogLevel` is expected. You must use `LogLevel.Info`.

### The Modern Alternative: `as const`

```typescript
const LOG_LEVELS = {
    Debug: "DEBUG",
    Info: "INFO",
    Warn: "WARN",
    Error: "ERROR"
} as const;

// Extract a union type from the values
type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];
// "DEBUG" | "INFO" | "WARN" | "ERROR"

function log(message: string, level: LogLevel): void {
    console.log(`[${level}] ${message}`);
}

log("Starting", LOG_LEVELS.Info);  // use the object
log("Starting", "INFO");           // or just pass the string
```

**Why `as const` is often preferred:**
- Plain JavaScript with no special compilation
- Accepts raw string literals directly
- No reverse mapping bloat
- Works with `--isolatedModules` (required by Vite, esbuild)

**When enums still make sense:**
- Numeric bitmasks (`Read = 1, Write = 2, Execute = 4`)
- Projects with ORM tooling that expects enum syntax

### `const enum` Caveat

`const enum` inlines values and disappears at runtime. It is **explicitly discouraged** in library code because it requires cross-file analysis that `--isolatedModules` tools cannot perform.

---

## 4. Union and Intersection Types

### Union Types

A union type `A | B` means the value can be type A **or** type B:

```typescript
type StringOrNumber = string | number;

function formatId(id: StringOrNumber): string {
    if (typeof id === "string") {
        return id.toUpperCase();       // narrowed to string
    } else {
        return "#" + id.toString().padStart(6, "0"); // narrowed to number
    }
}
```

**String literal unions** are often better than enums for simple categories:

```typescript
type Status = "pending" | "active" | "inactive" | "deleted";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
```

### Discriminated Unions

A union of object types sharing a common literal-typed property:

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

### Intersection Types

An intersection type `A & B` requires the value to satisfy **all** combined types:

```typescript
type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };

type Person = HasName & HasAge & HasEmail;
// Must have name, age, AND email
```

**Mental model:**
- **Union** = "either this OR that" (widens)
- **Intersection** = "this AND that" (narrows/combines)

---

## 5. Generics Basics

Generics allow you to write reusable code that works with any type while preserving type safety.

### The Problem Generics Solve

```typescript
// Without generics -- type information is lost
function firstAny(arr: any[]): any { return arr[0]; }
const val = firstAny([1, 2, 3]); // val is any -- no help from editor

// With generics -- type flows through
function first<T>(arr: T[]): T | undefined { return arr[0]; }
const num = first([1, 2, 3]);           // num is number | undefined
const str = first(["a", "b", "c"]);     // str is string | undefined
```

### Generic Constraints

```typescript
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

longest("hello", "hi");       // OK -- strings have .length
longest([1, 2, 3], [4, 5]);   // OK -- arrays have .length
// longest(10, 20);            // Error -- numbers don't have .length
```

### Indexed Access with Generics

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// getProperty(user, "invalid");          // Error
```

### Generic Interfaces

```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

type UserResponse = ApiResponse<{ id: number; name: string }>;

// Default type parameters
type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };
```

TypeScript infers generic type arguments from runtime arguments -- you rarely need to write `<number>` explicitly.

---

## 6. Function Types, `void`, `never`, and `unknown`

### Function Type Annotations

```typescript
function add(a: number, b: number): number { return a + b; }

// Optional and default parameters
function greet(name: string, greeting?: string): string {
    return (greeting || "Hello") + ", " + name + "!";
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}

// Function type alias
type MathOperation = (a: number, b: number) => number;
const subtract: MathOperation = (a, b) => a - b;
```

### Function Overloads

```typescript
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): string | number {
    if (typeof input === "string") return parseInt(input, 10);
    return input.toString();
}

const num = parse("42");  // TypeScript knows: number
const str = parse(42);    // TypeScript knows: string
```

The implementation signature is **not visible** to callers -- only the overload signatures are.

### `void` vs `never` vs `unknown`

```typescript
// void: returns nothing useful (returns undefined)
function logMessage(msg: string): void { console.log(msg); }

// never: NEVER returns (always throws or runs forever)
function throwError(message: string): never {
    throw new Error(message);
}

// unknown: type-safe alternative to any
function processInput(input: unknown): string {
    if (typeof input === "string") return input.toUpperCase();
    if (typeof input === "number") return input.toFixed(2);
    return String(input);
}
```

**Prefer `unknown` over `any`** when you genuinely do not know the type. It forces you to narrow before use.

---

## 7. tsconfig.json Essentials

### Recommended Starter Configuration

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "verbatimModuleSyntax": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "sourceMap": true,
        "declaration": true,
        "skipLibCheck": true,
        "resolveJsonModule": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

### What `strict: true` Enables

| Flag | What it catches |
|---|---|
| `strictNullChecks` | `null`/`undefined` used where a value is expected |
| `noImplicitAny` | Parameters without a type annotation |
| `strictFunctionTypes` | Unsafe function parameter assignment |
| `strictPropertyInitialization` | Class properties not set in constructor |
| `strictBindCallApply` | Incorrect `.call`, `.bind`, `.apply` arguments |
| `useUnknownInCatchVariables` | Caught errors typed as `unknown` instead of `any` |
| `alwaysStrict` | Emits `"use strict"` in output files |

**Always enable `strict: true` on new projects.** There is almost no good reason to leave it off.

### Key Flags Beyond `strict`

- **`noUncheckedIndexedAccess`** -- makes `arr[0]` return `T | undefined` instead of `T`, catching out-of-bounds access
- **`verbatimModuleSyntax`** (TS 5.0+) -- enforces `import type` for type-only imports; replaces the older `isolatedModules`
- **`moduleResolution: "bundler"`** (TS 5.0+) -- matches how Vite, esbuild, and webpack resolve imports
- **`skipLibCheck: true`** -- skips type-checking `.d.ts` files in node_modules for faster compilation
- **`declaration: true`** -- generates `.d.ts` files alongside compiled JavaScript; essential for library authors

---

## 8. Type Narrowing and Type Guards

Type narrowing is how TypeScript refines a broad type to a more specific one inside a conditional block.

### Built-in Narrowing

```typescript
function processValue(value: string | number | boolean): string {
    if (typeof value === "string") return value.toUpperCase();
    if (typeof value === "number") return value.toFixed(2);
    return value ? "true" : "false";  // boolean here
}

function formatDate(input: string | Date): string {
    if (input instanceof Date) return input.toISOString();
    return new Date(input).toISOString();
}

// Property existence narrowing with 'in'
interface Dog { bark(): void; breed: string }
interface Cat { meow(): void; color: string }

function petSound(pet: Dog | Cat): void {
    if ("bark" in pet) {
        pet.bark();  // narrowed to Dog
    } else {
        pet.meow();  // narrowed to Cat
    }
}
```

### Discriminated Union Narrowing

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

### Custom Type Guards (Type Predicates)

```typescript
function isUser(value: unknown): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "email" in value
    );
}

function processInput(input: unknown): void {
    if (isUser(input)) {
        console.log(input.name, input.email);  // narrowed to User
    }
}
```

### Assertion Functions

```typescript
function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
        throw new Error("Expected number, got " + typeof value);
    }
}

function double(input: unknown): number {
    assertIsNumber(input);
    return input * 2;  // TypeScript knows input is number after assertion
}
```

### Common Pitfalls

- **`typeof null === "object"`** -- you must add `value !== null` when narrowing with `typeof x === "object"`
- **Narrowing is scoped** -- only works within the block where the check occurs
- **`Array.filter` does not narrow automatically** -- use a type predicate:

```typescript
const mixed: (string | number)[] = ["a", 1, "b", 2];
const strings = mixed.filter((x): x is string => typeof x === "string");
// strings is string[], not (string | number)[]
```

---

## 9. Practical Tips for Beginners

### Hover to Learn

In VS Code, hover over any variable (or press Cmd/Ctrl+K, Cmd/Ctrl+I) to see what TypeScript has inferred. This is one of the fastest ways to learn.

### Let Inference Do the Work

Do not over-annotate. Infer where possible, annotate where necessary:

```typescript
// Unnecessary -- TypeScript already knows this is number
const count: number = 42;

// Necessary -- function parameters are not inferred
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Necessary -- complex return types or public API signatures
function createUser(name: string): { id: number; name: string } {
    return { id: Math.random(), name };
}
```

### Avoid Common Anti-Patterns

- Do not use `any` as a crutch -- use `unknown` and narrow
- Do not create a giant `types.ts` file -- co-locate types with the code that uses them
- Do not use `as` type assertions unless you truly know better than the compiler
- Do not disable `strict` mode to make errors go away

---

## 10. Recommended Resources

- **The TypeScript Handbook** -- https://www.typescriptlang.org/docs/handbook/
- **TypeScript Playground** -- https://www.typescriptlang.org/play
- **freeCodeCamp** -- "Learn TypeScript - Full Tutorial" -- https://www.youtube.com/watch?v=30LWjhZzg50
- **Jack Herrington** -- "No BS TS" series -- https://www.youtube.com/watch?v=LKVHFHJsiO0
- **Matt Pocock** -- "Total TypeScript" -- https://www.totaltypescript.com/

---

## Summary

You now understand the core building blocks of TypeScript:

- **Type annotations and inference** -- primitives, arrays, tuples, objects, and how TypeScript infers types
- **Interfaces vs type aliases** -- when to use each and how they differ
- **Enums and `as const`** -- the trade-offs and the modern `as const` pattern
- **Union and intersection types** -- composing types with `|` and `&`
- **Generics basics** -- writing reusable, type-safe functions and interfaces
- **Function types** -- parameters, return types, overloads, `void`, `never`, `unknown`
- **tsconfig.json** -- essential compiler options and strict mode
- **Type narrowing** -- type guards, assertion functions, and discriminated unions

---

## Next Steps

After completing this level, proceed to [TypeScript Mid](../TypeScript/Mid.md).
