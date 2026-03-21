export const content = {
  beginner: `# TypeScript Deep Dive — Beginner Level

## 1. Type Annotations — Primitives

TypeScript adds a type system on top of JavaScript. The most fundamental concept is the **type annotation**: you tell the compiler what type a variable, parameter, or return value should be.

### Primitive Types

TypeScript has the same primitive types as JavaScript, but you can annotate them explicitly.

\`\`\`typescript
let username: string = "alice";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

let bigNum: bigint = 9007199254740991n;
let uniqueKey: symbol = Symbol("id");

let city = "Berlin"; // TypeScript infers: string
let count = 42;      // TypeScript infers: number
\`\`\`

**Why it matters:** Type annotations catch bugs at compile time rather than at runtime. A misspelled property or a wrong argument type is caught instantly in your editor, saving hours of debugging.

**Key things to understand:**
- TypeScript **erases** all type annotations at compile time — they produce zero runtime overhead
- Type inference means you do not need to annotate everything; TypeScript is smart enough to figure out most types from context
- The \`any\` type opts out of type checking — avoid it whenever possible; use \`unknown\` when you genuinely don't know the type
- In VS Code, hover over any variable (or press Cmd/Ctrl+K, Cmd/Ctrl+I) to see what TypeScript has inferred — this is one of the fastest ways to learn

> **Role connection:** Frontend Developers use TypeScript in React, Angular, and Vue projects. Backend Developers use it with Node.js and frameworks like NestJS. Full-Stack Developers benefit from shared types between client and server.

### Arrays and Tuples

\`\`\`typescript
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

let frozen: readonly number[] = [1, 2, 3];

let coordinate: [number, number] = [40.7128, -74.0060];
let record: [string, number, boolean] = ["Alice", 30, true];

let user: [name: string, age: number] = ["Alice", 30];

const [lat, lng] = coordinate;
console.log(lat); // 40.7128

let flexible: [string, number?] = ["hello"];

let atLeastOne: [string, ...number[]] = ["scores", 95, 87, 92];
\`\`\`

**Common pitfalls:**
- Tuples look like arrays at runtime — TypeScript only enforces their structure at compile time
- \`const\` assertions can create readonly tuple types: \`const point = [1, 2] as const\`
- Array destructuring works with tuples but loses type narrowing if you spread

### Object Types

\`\`\`typescript
let person: { name: string; age: number; email?: string } = {
    name: "Alice",
    age: 30
};

let config: { readonly host: string; readonly port: number } = {
    host: "localhost",
    port: 3000
};

let scores: { [studentName: string]: number } = {};
scores["Alice"] = 95;
scores["Bob"] = 87;

let company: {
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    employees: number;
} = {
    name: "Tech Corp",
    address: {
        street: "123 Main St",
        city: "Berlin",
        country: "Germany"
    },
    employees: 500
};
\`\`\`

**Why it matters:** Object types model the shape of your data. In a real application, almost everything — API responses, database records, component props — is an object. Getting the types right means your editor auto-completes every property and catches every typo.

When you define an object type inline, TypeScript will reject any property not included in that shape. This is called **excess property checking** and it prevents silent bugs from misspelled field names.

---

## 2. Interfaces vs Type Aliases

TypeScript gives you two ways to name an object type: \`interface\` and \`type\`. They overlap significantly but have important differences.

### Interfaces

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

function greet(user: User): string {
    return "Hello, " + user.name + "!";
}

interface AdminUser extends User {
    role: "admin";
    permissions: string[];
}

interface SuperAdmin extends AdminUser {
    canDeleteUsers: boolean;
}

interface Window {
    myCustomProperty: string;
}

interface Serializable {
    serialize(): string;
    deserialize(data: string): void;
}

class UserModel implements Serializable {
    constructor(public name: string, public age: number) {}

    serialize(): string {
        return JSON.stringify({ name: this.name, age: this.age });
    }

    deserialize(data: string): void {
        const parsed = JSON.parse(data);
        this.name = parsed.name;
        this.age = parsed.age;
    }
}
\`\`\`

### Type Aliases

\`\`\`typescript
type User = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
};

type ID = string | number;
type Callback = (data: string) => void;
type Pair<T> = [T, T];
type StringOrNull = string | null;

type AdminUser = User & {
    role: "admin";
    permissions: string[];
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
\`\`\`

### When to Use Which

\`\`\`mermaid
graph TD
    A[Need to name a type?] --> B{Object shape?}
    B -->|Yes| C{Will it be extended/merged?}
    B -->|No| D[Use type alias]
    C -->|Yes, by classes or declaration merging| E[Use interface]
    C -->|No, or using intersections| F[Either works — be consistent]
    D --> G[Unions, tuples, primitives, mapped types]
    E --> H[API contracts, class shapes, library augmentation]
\`\`\`

**Key things to understand:**
- **Interfaces** support declaration merging — two interfaces with the same name combine. Type aliases cannot merge.
- **Type aliases** can represent unions, tuples, primitives, and computed types. Interfaces cannot.
- For object shapes, **prefer \`interface\`** — \`extends\` is faster for the compiler than type intersection (\`&\`). The TypeScript compiler caches interface relationships but must recompute intersections each time.
- The TypeScript team generally recommends \`interface\` for public API shapes and \`type\` for everything else.
- Avoid the pattern of creating a separate \`types.ts\` file for every feature folder — co-locate types with the code that uses them and let inference carry them further.

> **Role connection:** Frontend Developers define component prop interfaces. Backend Developers define API request/response interfaces. Full-Stack Developers share interfaces between client and server code.

---

## 3. Enums and Why \`as const\` Is Often Better

Enums let you define a set of named constants. TypeScript supports both numeric and string enums. But there is an important debate about whether to use the \`enum\` keyword at all.

### Numeric Enums

\`\`\`typescript
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}

function handleResponse(status: HttpStatus): void {
    if (status === HttpStatus.OK) {
        console.log("Success!");
    } else if (status === HttpStatus.NotFound) {
        console.log("Not found!");
    }
}

handleResponse(HttpStatus.OK);

console.log(HttpStatus[200]); // "OK"  — reverse mapping
console.log(HttpStatus.OK);    // 200
\`\`\`

### The Problem with Numeric Enums

Numeric enums compile to an object with **reverse mappings**. The compiled JavaScript for \`enum Direction { Up, Down, Left, Right }\` looks like this:

\`\`\`javascript
// Compiled output — not what you expect
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
// Results in: { Up: 0, Down: 1, Left: 2, Right: 3, 0: "Up", 1: "Down", 2: "Left", 3: "Right" }
\`\`\`

If you call \`Object.values(Direction)\`, you get \`[0, 1, 2, 3, "Up", "Down", "Left", "Right"]\` — probably not what you intended.

### String Enums

\`\`\`typescript
enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}

function log(message: string, level: LogLevel): void {
    console.log("[" + level + "] " + message);
}

log("Application started", LogLevel.Info);
\`\`\`

String enums do NOT have reverse mappings, which makes them cleaner. But you still cannot pass the raw string \`"INFO"\` directly — you must use \`LogLevel.Info\`. This enforces nominal (name-based) typing in an otherwise structural type system.

### The Modern Alternative: \`as const\`

Many experienced TypeScript developers prefer a plain object with \`as const\` over the \`enum\` keyword:

\`\`\`typescript
const LOG_LEVELS = {
    Debug: "DEBUG",
    Info: "INFO",
    Warn: "WARN",
    Error: "ERROR"
} as const;

// Extract the union type from the values
type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];
// LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR"

function log(message: string, level: LogLevel): void {
    console.log("[" + level + "] " + message);
}

// You can use the object...
log("Starting", LOG_LEVELS.Info);

// ...or just pass the string literal directly
log("Starting", "INFO");

// Direction example
const DIRECTIONS = {
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT"
} as const;

type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];
\`\`\`

**Why \`as const\` is often better:**
- It is plain JavaScript — no special compilation step, no surprises at runtime
- You can pass raw string literals directly without importing the object everywhere
- The object values are what you expect — no reverse mapping bloat
- Works correctly with \`--isolatedModules\` (required by Vite, esbuild, and most modern bundlers)
- \`const enum\` inlines values and disappears at runtime, but is explicitly discouraged in library code and breaks with \`isolatedModules\`

**When enums still make sense:**
- Numeric enums where the integer values are meaningful (e.g., bitmasks)
- Projects with heavy ORM or code-generation tooling that expect enum syntax
- Teams migrating from C# or Java where the mental model maps well

> **Role connection:** Backend Developers use enums or \`as const\` for status codes, roles, and config options. Frontend Developers use them for component variants and theme values. The \`as const\` pattern is increasingly the community standard.

---

## 4. Union and Intersection Types

Unions and intersections are the core of TypeScript's type algebra. They let you compose types from simpler building blocks.

### Union Types

\`\`\`typescript
type StringOrNumber = string | number;

function formatId(id: StringOrNumber): string {
    // You must narrow the type before using type-specific methods
    if (typeof id === "string") {
        return id.toUpperCase();
    } else {
        return "#" + id.toString().padStart(6, "0");
    }
}

console.log(formatId("abc"));  // "ABC"
console.log(formatId(42));      // "#000042"

type Status = "pending" | "active" | "inactive" | "deleted";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function setStatus(userId: number, status: Status): void {
    console.log("Setting user " + userId + " to " + status);
}

setStatus(1, "active");  // OK

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
\`\`\`

### Intersection Types

\`\`\`typescript
type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };

type Person = HasName & HasAge & HasEmail;

const alice: Person = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
};

type Timestamped<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};

type WithId<T> = T & {
    id: number;
};

interface Product {
    name: string;
    price: number;
}

type DBProduct = WithId<Timestamped<Product>>;
\`\`\`

\`\`\`mermaid
graph LR
    A[Union A | B] --> A1[Value is A]
    A --> A2[Value is B]
    B[Intersection A & B] --> B1[Value has all of A AND all of B]

    style A fill:#e3f2fd
    style B fill:#e8f5e9
\`\`\`

**Key things to understand:**
- **Union** = "either this OR that" (widens the type)
- **Intersection** = "this AND that" (narrows / combines the type)
- Unions of object types with a shared discriminant field (like \`kind\`) enable **discriminated unions** — one of TypeScript's most powerful patterns
- String literal unions like \`"pending" | "active" | "inactive"\` are often a better choice than \`enum\` for simple categorical values

---

## 5. Generics Basics

Generics allow you to write reusable code that works with any type while preserving type safety. Think of them as "type parameters" — like function parameters, but for types. This is how TypeScript enables flexibility without resorting to \`any\`.

### The Problem Generics Solve

\`\`\`typescript
// Without generics: lose type safety
function firstElementAny(arr: any[]): any {
    return arr[0];
}
const val = firstElementAny([1, 2, 3]); // val is "any" — editor gives no help

// With generics: full type safety
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const num = firstElement([1, 2, 3]);           // num is number
const str = firstElement(["a", "b", "c"]);     // str is string
const user = firstElement([{ name: "Alice" }]); // user is { name: string }
\`\`\`

TypeScript infers the type argument \`T\` from what you pass in — you rarely need to write it explicitly.

### Generic Functions

\`\`\`typescript
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

const p = pair("hello", 42); // p is [string, number]

// Constrained generic: T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

longest("hello", "hi");       // OK — strings have .length
longest([1, 2, 3], [4, 5]);   // OK — arrays have .length

// Generic with a key constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name");  // string — TypeScript knows the return type
const age = getProperty(user, "age");    // number
\`\`\`

### Generic Interfaces and Types

\`\`\`typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}

type UserResponse = ApiResponse<{ id: number; name: string; email: string }>;
type ProductListResponse = ApiResponse<{ id: number; name: string; price: number }[]>;

type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return { ok: false, error: "Division by zero" };
    }
    return { ok: true, value: a / b };
}

const result = divide(10, 3);
if (result.ok) {
    console.log(result.value); // TypeScript knows this is number
} else {
    console.log(result.error); // TypeScript knows this is string
}

class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const top = numberStack.pop(); // top is number | undefined
\`\`\`

\`\`\`mermaid
graph TD
    A["Generic Function<br/>identity&lt;T&gt;(arg: T): T"] --> B["Called with string<br/>identity('hello')"]
    A --> C["Called with number<br/>identity(42)"]
    A --> D["Called with User<br/>identity(user)"]
    B --> E["Returns: string"]
    C --> F["Returns: number"]
    D --> G["Returns: User"]

    style A fill:#fff3e0
    style E fill:#e3f2fd
    style F fill:#e3f2fd
    style G fill:#e3f2fd
\`\`\`

**Why it matters:** Without generics, you would either lose type safety (using \`any\`) or duplicate code for every type. Generics give you both flexibility and safety. Every major TypeScript library — React, Express, Prisma — uses generics extensively. When you write \`useState<User | null>(null)\` in React, you are passing a type argument to a generic function.

> **Role connection:** Frontend Developers use generics with React component props and hooks. Backend Developers use them with ORM models and API handlers. Library authors use generics to make their APIs flexible yet type-safe.

---

## 6. Function Types and Overloads

Functions are first-class citizens in TypeScript. You can type parameters, return values, and even the function itself.

### Function Type Annotations

\`\`\`typescript
function add(a: number, b: number): number {
    return a + b;
}

const multiply = (a: number, b: number): number => a * b;

function greet(name: string, greeting?: string): string {
    return (greeting || "Hello") + ", " + name + "!";
}

greet("Alice");             // "Hello, Alice!"
greet("Alice", "Bonjour");  // "Bonjour, Alice!"

function createUser(name: string, role: string = "viewer"): { name: string; role: string } {
    return { name, role };
}

function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4, 5); // 15

type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;

interface EventHandler {
    (event: string, data: unknown): void;
}

const handleClick: EventHandler = (event, data) => {
    console.log("Event:", event, "Data:", data);
};
\`\`\`

### Function Overloads

\`\`\`typescript
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): string | number {
    if (typeof input === "string") {
        return parseInt(input, 10);
    } else {
        return input.toString();
    }
}

const num = parse("42");   // TypeScript knows this returns number
const str = parse(42);      // TypeScript knows this returns string

function addEventListener(event: "click", handler: (e: MouseEvent) => void): void;
function addEventListener(event: "keydown", handler: (e: KeyboardEvent) => void): void;
function addEventListener(event: "scroll", handler: (e: Event) => void): void;
function addEventListener(event: string, handler: (e: Event) => void): void {
    document.addEventListener(event, handler);
}

addEventListener("click", (e) => {
    console.log(e.clientX, e.clientY); // e is MouseEvent
});
\`\`\`

**Common pitfalls:**
- The implementation signature is NOT visible to callers — only the overload signatures are
- Overloads are checked in order — put more specific signatures first
- Often, generics or union types are simpler than overloads

### Void, Never, and Unknown

\`\`\`typescript
function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // runs forever
    }
}

function processInput(input: unknown): string {
    // Must narrow the type before using it
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    if (typeof input === "number") {
        return input.toFixed(2);
    }
    if (input instanceof Date) {
        return input.toISOString();
    }
    return String(input);
}

let dangerous: any = "hello";
dangerous.nonExistent.method(); // No error at compile time — crashes at runtime!

let safe: unknown = "hello";
// safe.toUpperCase(); // Error: Object is of type 'unknown'
// Must narrow first:
if (typeof safe === "string") {
    safe.toUpperCase(); // OK
}
\`\`\`

**Key things to understand:**
- Use \`void\` for functions that perform side effects and return nothing
- Use \`never\` for functions that always throw or never terminate — it also represents the empty type (no possible values)
- Use \`unknown\` instead of \`any\` when you do not know the type — it forces you to check before using it
- \`any\` disables type checking; \`unknown\` preserves it

---

## 7. tsconfig.json Essentials

The \`tsconfig.json\` file configures the TypeScript compiler. Understanding its key options is essential for every TypeScript project.

### Core Configuration

\`\`\`json
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
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,

        "verbatimModuleSyntax": true,

        "sourceMap": true,
        "declaration": true,

        "skipLibCheck": true,

        "resolveJsonModule": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
\`\`\`

**Why it matters:** A misconfigured \`tsconfig.json\` can silently disable important type checks or cause hard-to-debug module resolution issues. The \`strict\` flag alone enables seven sub-flags that catch common bugs.

**Key tsconfig options explained:**
- \`moduleResolution: "bundler"\` (TS 5.0+) — matches how modern bundlers (Vite, esbuild, webpack) resolve imports. Use this instead of \`"node"\` or \`"node16"\` for bundled applications.
- \`verbatimModuleSyntax\` (TS 5.0+) — enforces \`import type\` for type-only imports. Replaces the older \`isolatedModules\` flag. Required for correct behavior with esbuild, Vite, and SWC.

### What "strict" Enables

The \`strict: true\` flag is a shorthand for enabling all of these simultaneously:

| Flag | What it catches |
|---|---|
| \`strictNullChecks\` | Catches \`null\`/\`undefined\` being used where a value is expected |
| \`noImplicitAny\` | Catches parameters without a type annotation |
| \`strictFunctionTypes\` | Catches unsafe function parameter assignment |
| \`strictPropertyInitialization\` | Catches class properties not set in the constructor |
| \`strictBindCallApply\` | Catches incorrect arguments to \`.call\`, \`.bind\`, \`.apply\` |
| \`useUnknownInCatchVariables\` | Makes caught errors \`unknown\` instead of \`any\` |
| \`alwaysStrict\` | Emits "use strict" in output files |

Always enable \`strict: true\`. There is almost no good reason to leave it off in a new project.

> **Role connection:** DevOps Engineers configure TypeScript builds in CI/CD pipelines. Full-Stack Developers maintain shared tsconfig files in monorepos. Library authors use \`declaration: true\` to generate .d.ts files for consumers.

---

## 8. Type Inference and Type Narrowing

TypeScript's type inference and narrowing system means you write fewer annotations while maintaining full type safety.

### Type Inference

TypeScript infers types from the context of how values are used — you don't need to annotate everything.

\`\`\`typescript
let message = "hello";     // string
let count = 42;            // number
let items = [1, 2, 3];    // number[]
let mixed = [1, "two"];   // (string | number)[]

function add(a: number, b: number) {
    return a + b; // TypeScript infers return type: number
}

let user = {
    name: "Alice",
    age: 30,
    isAdmin: false
};
// user is { name: string; age: number; isAdmin: boolean }

const direction = "north"; // Type: "north" (literal — not widened because it's const)
let mutable = "north";     // Type: string (can be reassigned, so widened)

const config = {
    api: "https://api.example.com",
    timeout: 5000,
    retries: 3
} as const;
// All properties are readonly literal types

names.forEach((name) => {
    // TypeScript knows name is string — no annotation needed
    console.log(name.toUpperCase());
});

document.addEventListener("click", (event) => {
    // TypeScript knows event is MouseEvent — inferred from the event name
    console.log(event.clientX, event.clientY);
});
\`\`\`

**The key insight**: Inference means types defined in one place flow automatically to every place that value is consumed. Rather than re-annotating the same type at every layer, define it once and let TypeScript carry it through.

### Type Narrowing

Type narrowing is how TypeScript refines a broad type to a more specific one inside a conditional block.

\`\`\`typescript
function processValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        return value.toUpperCase(); // value is string here
    }
    if (typeof value === "number") {
        return value.toFixed(2); // value is number here
    }
    return value ? "true" : "false"; // value is boolean here
}

function formatDate(input: string | Date): string {
    if (input instanceof Date) {
        return input.toISOString(); // input is Date here
    }
    return new Date(input).toISOString(); // input is string here
}

interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; color: string; }

function petSound(pet: Dog | Cat): void {
    if ("bark" in pet) {
        pet.bark(); // pet is Dog here
    } else {
        pet.meow(); // pet is Cat here
    }
}

function printLength(str: string | null | undefined): void {
    if (str) {
        console.log(str.length); // str is string here (not null/undefined)
    } else {
        console.log("No string provided");
    }
}

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "rectangle":
            return shape.width * shape.height;
    }
}
\`\`\`

\`\`\`mermaid
graph TD
    A["value: string | number | Date | null"] -->|typeof === 'string'| B["value: string"]
    A -->|typeof === 'number'| C["value: number"]
    A -->|instanceof Date| D["value: Date"]
    A -->|=== null| E["value: null"]
    A -->|truthiness check| F["value: string | number | Date"]

    style A fill:#fff3e0
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#e8f5e9
    style F fill:#e8f5e9
\`\`\`

### Custom Type Guards

\`\`\`typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

interface User {
    name: string;
    email: string;
}

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
        // TypeScript knows input is User here
        console.log(input.name, input.email);
    }
}

function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
        throw new Error("Expected a number, got " + typeof value);
    }
}

function double(input: unknown): number {
    assertIsNumber(input);
    // After the assertion, TypeScript knows input is number
    return input * 2;
}
\`\`\`

**Why it matters:** Type narrowing means TypeScript tracks the type of a variable as it flows through your code. You rarely need type assertions (\`as\`) when you use narrowing correctly. This is one of the features that makes TypeScript dramatically more powerful than simple type annotations.

**Common pitfalls:**
- \`typeof null === "object"\` — this JavaScript quirk means typeof narrowing does not filter out null
- Narrowing only works in the same scope — assign to a variable if you need to narrow across function calls
- Array.filter does not narrow types by default — use a type predicate: \`arr.filter((x): x is string => typeof x === "string")\`

---

## 9. Recommended Resources — Beginner

- **freeCodeCamp** — "Learn TypeScript – Full Tutorial" — https://www.youtube.com/watch?v=30LWjhZzg50
- **Jack Herrington** — "No BS TS" series — https://www.youtube.com/watch?v=LKVHFHJsiO0
- **The TypeScript Handbook** — https://www.typescriptlang.org/docs/handbook/
- **TypeScript Playground** — https://www.typescriptlang.org/play (experiment directly in your browser)

---

## Summary — Beginner Level

You now understand the core building blocks of TypeScript:
- **Type annotations** — primitives, arrays, tuples, and objects
- **Interfaces vs type aliases** — when to use each and how they differ
- **Enums and \`as const\`** — the trade-offs of \`enum\` vs plain object patterns
- **Union and intersection types** — composing types with | and &
- **Generics basics** — writing reusable, type-safe functions and classes
- **Function types** — parameters, return types, overloads, void, never, unknown
- **tsconfig.json** — essential compiler options and strict mode
- **Type inference and narrowing** — letting TypeScript work for you

These foundations prepare you for the Mid level, where you will explore advanced generics, utility types, conditional types, and more.
`,
  mid: `# TypeScript Deep Dive — Mid Level

## 1. Advanced Generics

At the beginner level you learned to write generic functions and interfaces. Now we go deeper: constraints, defaults, inference patterns, and real-world generic architectures.

### Generic Constraints

Constraints restrict what types can be passed as a type argument. Use \`extends\` to require the type argument to have certain properties.

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// getProperty(user, "invalid");         // Error — "invalid" is not a key of user

interface Printable {
    toString(): string;
}

function printAll<T extends Printable>(items: T[]): void {
    items.forEach(item => console.log(item.toString()));
}

function merge<T extends object, U extends object>(a: T, b: U): T & U {
    return { ...a, ...b };
}

const merged = merge({ name: "Alice" }, { age: 30 });
// merged is { name: string } & { age: number }
\`\`\`

### Generic Defaults

Generic type parameters can have default values, just like function default parameters.

\`\`\`typescript
interface ApiResponse<T = unknown, E = Error> {
    data: T | null;
    error: E | null;
    status: number;
}

const userResponse: ApiResponse<User> = {
    data: { name: "Alice", age: 30, email: "a@b.com" },
    error: null,
    status: 200
};

const genericResponse: ApiResponse = {
    data: null,
    error: new Error("Something went wrong"),
    status: 500
};

type EventMap<T extends Record<string, unknown> = Record<string, unknown>> = {
    [K in keyof T]: (payload: T[K]) => void;
};

interface AppEvents {
    login: { userId: string };
    logout: { reason: string };
    error: { code: number; message: string };
}

type AppEventHandlers = EventMap<AppEvents>;
\`\`\`

### Generic Inference Patterns

TypeScript infers generic type arguments from the runtime arguments — you rarely need to write them explicitly.

\`\`\`typescript
function createPair<A, B>(a: A, b: B) {
    return { first: a, second: b };
}

const pair = createPair("hello", 42);
// TypeScript infers: { first: string; second: number }

function transform<T, R>(value: T, fn: (input: T) => R): R {
    return fn(value);
}

const length = transform("hello", (s) => s.length);
// TypeScript infers: length is number

class QueryBuilder<T extends object> {
    private conditions: string[] = [];
    private selectedFields: string[] = [];

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.conditions.push(String(field) + " = " + String(value));
        return this;
    }

    select<K extends keyof T>(...fields: K[]): QueryBuilder<Pick<T, K>> {
        this.selectedFields = fields.map(String);
        return this as unknown as QueryBuilder<Pick<T, K>>;
    }

    build(): string {
        const fields = this.selectedFields.length > 0
            ? this.selectedFields.join(", ")
            : "*";
        const where = this.conditions.length > 0
            ? " WHERE " + this.conditions.join(" AND ")
            : "";
        return "SELECT " + fields + " FROM table" + where;
    }
}

interface User {
    name: string;
    age: number;
    email: string;
}

const query = new QueryBuilder<User>()
    .select("name", "email")
    .where("age", 30)
    .build();
\`\`\`

### Linking Generic Types to Runtime Values (Zod Pattern)

A powerful real-world pattern: use a schema validation library so that the runtime validator and the TypeScript type are a single source of truth.

\`\`\`typescript
import { z } from "zod";

const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().positive()
});

// Infer the TypeScript type directly from the schema — no separate type definition
type User = z.infer<typeof UserSchema>;
// { id: string; name: string; email: string; age: number }

async function fetchUser(id: string): Promise<User> {
    const res = await fetch("/api/users/" + id);
    const json = await res.json();
    // parse() validates at runtime AND returns a properly typed User
    return UserSchema.parse(json);
}

// Generic fetch helper: pass any Zod schema, get back the inferred type
async function fetchTyped<TSchema extends z.ZodTypeAny>(
    url: string,
    schema: TSchema
): Promise<z.infer<TSchema>> {
    const res = await fetch(url);
    const json = await res.json();
    return schema.parse(json);
}

const user = await fetchTyped("/api/users/1", UserSchema);
// user is typed as User — no type argument needed, inferred from schema
\`\`\`

**Why it matters:** Advanced generics are the backbone of every major TypeScript library. React's component types, Prisma's query builder, tRPC's end-to-end type safety — all rely on sophisticated generic patterns. The Zod pattern eliminates the duplication of maintaining a type definition and a validator separately: one schema gives you both.

> **Role connection:** Full-Stack Developers use generic inference in tRPC and Zod. Backend Developers use constrained generics in ORM type definitions. Library authors build entire APIs around generic inference chains.

---

## 2. Utility Types

TypeScript ships with built-in utility types that transform existing types. These are essential tools you will use daily.

### Partial, Required, Readonly

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: "admin" | "user" | "moderator";
}

type UpdateUserPayload = Partial<User>;

function updateUser(id: number, updates: Partial<User>): User {
    const existing = getUserById(id);
    return { ...existing, ...updates };
}

updateUser(1, { name: "Bob" }); // Only update the name

interface Config {
    host?: string;
    port?: number;
    debug?: boolean;
}

type StrictConfig = Required<Config>;

type FrozenUser = Readonly<User>;

function freeze<T extends object>(obj: T): Readonly<T> {
    return Object.freeze(obj);
}
\`\`\`

### Pick, Omit, Record

\`\`\`typescript
type UserPreview = Pick<User, "id" | "name" | "role">;

type CreateUserPayload = Omit<User, "id">;

type UserRoles = Record<string, "admin" | "user" | "moderator">;

const roles: UserRoles = {
    alice: "admin",
    bob: "user",
    charlie: "moderator"
};

type StatusMessages = Record<"success" | "error" | "loading", string>;

const messages: StatusMessages = {
    success: "Operation completed",
    error: "Something went wrong",
    loading: "Please wait..."
};

type PublicUserProfile = Readonly<Pick<User, "name" | "role">>;
\`\`\`

### Exclude, Extract, NonNullable, ReturnType, Parameters

\`\`\`typescript
type AllStatuses = "pending" | "active" | "inactive" | "deleted";
type ActiveStatuses = Exclude<AllStatuses, "deleted" | "inactive">;

type StringOrNumber = string | number | boolean | null;
type OnlyStrOrNum = Extract<StringOrNumber, string | number>;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;

function createUser(name: string, age: number) {
    return { id: Math.random(), name, age, createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUser>;

type CreateUserParams = Parameters<typeof createUser>;

type UserPromise = Promise<User>;
type ResolvedUser = Awaited<UserPromise>;

type DeepPromise = Promise<Promise<Promise<string>>>;
type DeepResolved = Awaited<DeepPromise>;

// NoInfer (TS 5.4) — prevents a type parameter from being inferred from a specific argument
function createFSM<S extends string>(config: {
    initial: NoInfer<S>;
    states: S[];
}) {
    return config;
}

// Without NoInfer, TypeScript would infer S from "idle" AND from the states array
// With NoInfer on initial, S is inferred only from states, and "idle" is checked against it
createFSM({ initial: "idle", states: ["idle", "loading", "done"] }); // OK
// createFSM({ initial: "invalid", states: ["idle", "loading", "done"] }); // Error
\`\`\`

\`\`\`mermaid
graph TD
    A["User<br/>{id, name, email, age, role}"] --> B["Partial&lt;User&gt;<br/>all optional"]
    A --> C["Required&lt;User&gt;<br/>all required"]
    A --> D["Pick&lt;User, 'name' | 'email'&gt;<br/>{name, email}"]
    A --> E["Omit&lt;User, 'id'&gt;<br/>{name, email, age, role}"]
    A --> F["Readonly&lt;User&gt;<br/>all readonly"]

    style A fill:#fff3e0
    style B fill:#e3f2fd
    style C fill:#e3f2fd
    style D fill:#e3f2fd
    style E fill:#e3f2fd
    style F fill:#e3f2fd
\`\`\`

**Common pitfalls:**
- \`Omit\` does not verify the key exists — \`Omit<User, "nonexistent">\` compiles without error
- \`Partial\` only affects top-level properties — use a custom \`DeepPartial\` for nested objects
- \`ReturnType\` requires \`typeof\` when used with a value: \`ReturnType<typeof myFunction>\`
- Prefer \`ReturnType\` and \`Parameters\` over manually duplicating type signatures from existing functions

---

## 3. The \\\`satisfies\\\` Operator (TypeScript 5.0+)

The \\\`satisfies\\\` operator validates that a value matches a type without widening it. This gives you the best of both worlds: type checking AND precise inference.

### The Problem \\\`satisfies\\\` Solves

\\\`\\\`\\\`typescript
interface ColorConfig {
    primary: string;
    secondary: string;
    accent: string;
}

// With type annotation: value is widened to ColorConfig
const colors1: ColorConfig = {
    primary: "#ff0000",
    secondary: "#00ff00",
    accent: "#0000ff"
};
// colors1.primary is string — no literal type info

// With satisfies: value is validated BUT retains literal types
const colors2 = {
    primary: "#ff0000",
    secondary: "#00ff00",
    accent: "#0000ff"
} satisfies ColorConfig;
// colors2.primary is "#ff0000" — literal type preserved!

// With as const + satisfies: readonly AND validated
const colors3 = {
    primary: "#ff0000",
    secondary: "#00ff00",
    accent: "#0000ff"
} as const satisfies ColorConfig;
\\\`\\\`\\\`

### Practical Uses

\\\`\\\`\\\`typescript
// Type-safe configuration with precise inference
type Route = {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
};

const routes = {
    getUser: { path: "/users/:id", method: "GET" },
    createUser: { path: "/users", method: "POST" },
    deleteUser: { path: "/users/:id", method: "DELETE" },
} satisfies Record<string, Route>;

// routes.getUser.method is "GET" (not just string)

// Ensuring exhaustive record keys
type Theme = "light" | "dark" | "system";

const themeLabels = {
    light: "Light Mode",
    dark: "Dark Mode",
    system: "System Default",
} satisfies Record<Theme, string>;
// If you forget a key, TypeScript errors at compile time
\\\`\\\`\\\`

**Why it matters:** Before \\\`satisfies\\\`, you had to choose between type validation (annotation) and precise inference (\\\`as const\\\`). The \\\`satisfies\\\` operator removes this trade-off. Use it for configuration objects, route definitions, theme values, and any constant data that should be validated against a type while retaining its literal types.

---

## 4. Mapped Types and Conditional Types

Mapped types and conditional types are the programmable layer of TypeScript's type system. They let you transform types algorithmically.

### Mapped Types

\`\`\`typescript
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

interface User {
    name: string;
    age: number;
    email: string;
}

type NullableUser = Nullable<User>;

// Key remapping with template literal types
type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Filter keys by value type
type OnlyStringProperties<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type StringUserProps = OnlyStringProperties<User>;
// { name: string; email: string }

type Mutable<T> = {
    -readonly [K in keyof T]: T[K]; // remove readonly
};

type RequiredProps<T> = {
    [K in keyof T]-?: T[K]; // remove optional
};
\`\`\`

### Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false
type C = IsString<"hello">;  // true

type ElementType<T> = T extends (infer E)[] ? E : never;

type NumArrayEl = ElementType<number[]>;   // number
type StrArrayEl = ElementType<string[]>;   // string
type NotArray = ElementType<string>;       // never

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type RT = MyReturnType<(x: number) => string>; // string

// Distribution: conditional types distribute over unions
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]  (distributed — each member gets its own array)

type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;

type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]  (non-distributed — the union stays together)

type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
\`\`\`

\`\`\`mermaid
graph TD
    A["Conditional Type<br/>T extends U ? X : Y"] --> B{Does T extend U?}
    B -->|Yes| C["Result: X"]
    B -->|No| D["Result: Y"]

    E["Mapped Type<br/>{[K in keyof T]: ...}"] --> F["Iterates over each key K"]
    F --> G["Transforms the value type T[K]"]
    F --> H["Can remap keys with 'as'"]
    F --> I["Can add/remove modifiers"]

    style A fill:#e3f2fd
    style E fill:#e8f5e9
\`\`\`

**Key things to understand:**
- \`infer\` in conditional types lets you extract a type from a pattern — like regex capture groups for types
- Conditional types are **distributive** over unions by default — each member is evaluated separately
- Mapped types with \`as never\` filtering and conditional types together enable powerful type transformations
- These are the building blocks for the utility types you already use (Partial, Pick, ReturnType, etc.)

> **Role connection:** Library authors use mapped and conditional types to build type-safe APIs. Frontend Developers encounter them in React's component type utilities. Backend Developers use them in ORM type builders.

---

## 5. Strict Mode and Compiler Flags

Understanding compiler flags beyond \`strict: true\` gives you fine-grained control over type safety.

### Beyond strict: true

\`\`\`typescript
// noUncheckedIndexedAccess — enables safer array and object access
const arr: string[] = ["a", "b", "c"];
// Without flag: string
// With flag:    string | undefined
const item = arr[10];

// Access a dictionary
interface Dict {
    [key: string]: string;
    knownProp: string;
}

declare const dict: Dict;
dict.knownProp;     // string (known property — always safe)
dict["dynamicKey"]; // string | undefined (with noUncheckedIndexedAccess)

// exactOptionalPropertyTypes — distinguishes missing vs explicitly undefined
interface Settings {
    theme?: "light" | "dark";
}

const s1: Settings = { theme: undefined }; // Error with exactOptionalPropertyTypes
const s3: Settings = {};           // OK
const s4: Settings = { theme: "dark" }; // OK
\`\`\`

### isolatedModules and verbatimModuleSyntax

\`\`\`typescript
// isolatedModules: true — required by Vite, esbuild, SWC
// These bundlers transpile each file independently, so they cannot
// perform cross-file type analysis. This means:

// Bad: regular import of a type — bundler may not know it's type-only
import { User } from "./types";

// Good: type-only import — bundler knows to erase it
import type { User } from "./types";
import { createUser } from "./factory";

// verbatimModuleSyntax (TS 5.0+) — even stricter: enforces type-only imports
// for anything that doesn't exist at runtime
import { type User, createUser } from "./module";
\`\`\`

**Why it matters:** Modern build tools like esbuild, Vite, and SWC transpile each file independently — they cannot do cross-file type analysis. Flags like \`isolatedModules\` and \`verbatimModuleSyntax\` ensure your code works with these tools.

---

## 6. Discriminated Unions and Exhaustive Checking

Discriminated unions are arguably TypeScript's most important pattern for modeling real-world domain logic.

### Building Discriminated Unions

\`\`\`typescript
type RequestState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: Error; retryCount: number };

function renderState<T>(state: RequestState<T>): string {
    switch (state.status) {
        case "idle":
            return "Ready to fetch";
        case "loading":
            return "Loading...";
        case "success":
            return "Got data: " + JSON.stringify(state.data);
        case "error":
            return "Error: " + state.error.message +
                " (retried " + state.retryCount + " times)";
    }
}

type ValidationResult =
    | { valid: true; value: string }
    | { valid: false; errors: string[] };

function validateEmail(input: string): ValidationResult {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (emailRegex.test(input)) {
        return { valid: true, value: input.toLowerCase() };
    }
    return { valid: false, errors: ["Invalid email format"] };
}

type PaymentMethod =
    | { type: "credit_card"; cardNumber: string; expiry: string; cvv: string }
    | { type: "bank_transfer"; iban: string; bic: string }
    | { type: "paypal"; email: string }
    | { type: "crypto"; walletAddress: string; chain: "ethereum" | "bitcoin" };

function processPayment(method: PaymentMethod): void {
    switch (method.type) {
        case "credit_card":
            console.log("Charging card ending in " + method.cardNumber.slice(-4));
            break;
        case "bank_transfer":
            console.log("Transferring to IBAN " + method.iban);
            break;
        case "paypal":
            console.log("PayPal payment to " + method.email);
            break;
        case "crypto":
            console.log("Sending to " + method.chain + " wallet " + method.walletAddress);
            break;
    }
}
\`\`\`

### Exhaustive Checking

\`\`\`typescript
function assertNever(value: never): never {
    throw new Error("Unexpected value: " + JSON.stringify(value));
}

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "triangle":
            return 0.5 * shape.base * shape.height;
        default:
            // If you add a new shape and forget to handle it,
            // TypeScript will error here because shape won't be "never"
            return assertNever(shape);
    }
}
\`\`\`

**Why it matters:** Exhaustive checking turns your switch statements into compile-time-verified state machines. When you add a new variant, the compiler tells you every place in the codebase that needs updating. This is a massive improvement over string comparisons in plain JavaScript.

> **Role connection:** Frontend Developers model UI state machines (loading, error, success). Backend Developers model request processing pipelines. Full-Stack Developers share domain types with exhaustive patterns across the stack.

---

## 7. Declaration Files (.d.ts)

Declaration files describe the shape of JavaScript code to TypeScript without providing implementations.

### Writing Declaration Files

\`\`\`typescript
declare module "analytics-lib" {
    interface AnalyticsConfig {
        apiKey: string;
        endpoint?: string;
        debug?: boolean;
    }

    interface EventProperties {
        [key: string]: string | number | boolean;
    }

    export function init(config: AnalyticsConfig): void;
    export function track(event: string, properties?: EventProperties): void;
    export function identify(userId: string, traits?: Record<string, unknown>): void;
    export function page(name?: string): void;
}

declare global {
    interface Window {
        analytics: {
            track(event: string, data?: Record<string, unknown>): void;
        };
        __APP_VERSION__: string;
    }

    var API_BASE_URL: string;
}

declare module "*.json" {
    const value: Record<string, unknown>;
    export default value;
}

declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    const content: string;
    export default content;
}
\`\`\`

**Common pitfalls:**
- Declaration files (.d.ts) should never contain implementations — only types
- \`declare global\` requires the file to have at least one import or export (to be a module)
- \`typeRoots\` replaces the default type lookup — if you set it, you must include \`node_modules/@types\`
- Ambient module declarations (\`declare module "x"\`) should be in .d.ts files, not .ts files

---

## 8. Module Augmentation and Ambient Modules

Module augmentation lets you extend existing types from libraries without modifying their source code.

### Augmenting Third-Party Libraries

\`\`\`typescript
import "express";

declare module "express" {
    interface Request {
        userId?: string;
        sessionToken?: string;
        permissions?: string[];
    }
}

import { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    if (token) {
        req.userId = decodeToken(token).userId;
        req.permissions = decodeToken(token).permissions;
    }
    next();
}

declare module "react" {
    interface CSSProperties {
        // Allow custom CSS properties
        [key: \`--\${string}\`]: string | number;
    }
}

declare module "@prisma/client" {
    interface PrismaClient {
        $softDelete<T>(model: string, id: number): Promise<T>;
    }
}
\`\`\`

### Ambient Modules for Untyped Libraries

\`\`\`typescript
declare module "legacy-chart-lib" {
    interface ChartOptions {
        width: number;
        height: number;
        title?: string;
        data: number[];
    }

    export class Chart {
        constructor(element: HTMLElement, options: ChartOptions);
        render(): void;
        update(data: number[]): void;
        destroy(): void;
    }

    export function createChart(element: HTMLElement, options: ChartOptions): Chart;
}

declare module "totally-untyped-lib";
\`\`\`

**Why it matters:** In real projects you will always encounter libraries that need type adjustments — Express middleware, custom Prisma extensions, environment variables. Module augmentation lets you add type safety without forking the library.

> **Role connection:** Backend Developers augment Express, Fastify, and Prisma types. Frontend Developers augment React, CSS, and component library types. DevOps Engineers augment environment and configuration types.

---

## 9. Testing Typed Code

TypeScript introduces unique testing considerations: type-level tests, generics mocking, and test utilities.

### Type-Level Testing with Expect-Type

\`\`\`typescript
import { expectTypeOf } from "expect-type";

function add(a: number, b: number): number {
    return a + b;
}

expectTypeOf(add).returns.toBeNumber();
expectTypeOf(add).parameters.toEqualTypeOf<[number, number]>();

interface ApiResponse<T> {
    data: T;
    status: number;
}

expectTypeOf<ApiResponse<string>>().toMatchTypeOf<{ data: string; status: number }>();

type User = { name: string; age: number };
type PartialUser = Partial<User>;

expectTypeOf<{ name: string }>().toMatchTypeOf<PartialUser>();
expectTypeOf<{ name: string; invalid: boolean }>().not.toMatchTypeOf<User>();
\`\`\`

### Testing with Type-Safe Mocks

\`\`\`typescript
interface UserService {
    getUser(id: number): Promise<User>;
    updateUser(id: number, data: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<void>;
    listUsers(page: number, limit: number): Promise<User[]>;
}

function createMockUserService(overrides: Partial<UserService> = {}): UserService {
    return {
        getUser: async () => ({ name: "Test User", age: 25, email: "test@test.com" }),
        updateUser: async (_, data) => ({ name: "Test User", age: 25, email: "test@test.com", ...data }),
        deleteUser: async () => {},
        listUsers: async () => [],
        ...overrides
    } as UserService;
}

const mockService = createMockUserService({
    getUser: async (id) => ({
        name: "Alice",
        age: 30,
        email: "alice@test.com"
    })
});

type Result<T> =
    | { ok: true; value: T }
    | { ok: false; error: string };

function assertOk<T>(result: Result<T>): asserts result is { ok: true; value: T } {
    if (!result.ok) {
        throw new Error("Expected ok result, got error: " + result.error);
    }
}
\`\`\`

### Testing Patterns Summary

\`\`\`typescript
const testUser = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
} satisfies User;

const TEST_USERS = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
] as const;

function createTestData<T>(defaults: T, overrides: Partial<T> = {}): T {
    return { ...defaults, ...overrides };
}
\`\`\`

**Key things to understand:**
- Type-level tests verify your generic types and utility types work correctly — they run at compile time, not runtime
- \`satisfies\` is excellent for test data — it validates the type without widening
- Assertion functions (\`asserts x is Y\`) make tests cleaner by narrowing types after validation
- Mock factories using \`Partial<T>\` keep tests type-safe while allowing overrides

---

## 10. Recommended Resources — Mid Level

- **Matt Pocock** — "Advanced TypeScript" series — https://www.youtube.com/watch?v=dLPgQRbVquo
- **Jack Herrington** — "TypeScript Generics" — https://www.youtube.com/watch?v=nViEqpgwxHE
- **Matt Pocock** — "Why I Don't Use Enums" — https://www.youtube.com/watch?v=jjMbPt_H3RQ
- **TypeScript Deep Dive** by Basarat — https://basarat.gitbook.io/typescript/

---

## Summary — Mid Level

You now have intermediate mastery of TypeScript's type system:
- **Advanced generics** — constraints, defaults, and inference patterns for building flexible APIs
- **Zod integration** — single source of truth for runtime validation and compile-time types
- **Utility types** — Partial, Required, Pick, Omit, Record, Exclude, Extract, ReturnType and when to use each
- **Mapped types** — transforming object types programmatically with key remapping and modifier changes
- **Conditional types** — type-level branching with infer, distribution, and recursive patterns
- **Compiler flags** — noUncheckedIndexedAccess, isolatedModules, verbatimModuleSyntax
- **Discriminated unions** — modeling domain logic with exhaustive checking
- **Declaration files** — typing untyped JavaScript and module augmentation
- **Testing typed code** — type-level tests, typed mocks, and assertion functions

The Senior level covers type-level programming, branded types, variance, monorepo configuration, and migration strategies.
`,
  senior: `# TypeScript Deep Dive — Senior Level

## 1. Template Literal Types

Template literal types bring string manipulation into the type system. Combined with mapped types, they enable type-safe string transformations that were previously impossible.

### Basics of Template Literal Types

\`\`\`typescript
type Greeting = \`Hello, \${string}\`;

const valid: Greeting = "Hello, World";   // OK
const valid2: Greeting = "Hello, Alice";  // OK

type Color = "red" | "green" | "blue";
type Shade = "light" | "dark";

type ColorVariant = \`\${Shade}-\${Color}\`;
// "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"

type CSSUnit = "px" | "em" | "rem" | "vh" | "vw" | "%";
type CSSLength = \`\${number}\${CSSUnit}\`;

const width: CSSLength = "100px";   // OK
const height: CSSLength = "50vh";   // OK

type DOMEvent = "click" | "focus" | "blur" | "input" | "change";
type EventHandler = \`on\${Capitalize<DOMEvent>}\`;
// "onClick" | "onFocus" | "onBlur" | "onInput" | "onChange"
\`\`\`

### String Manipulation Types

\`\`\`typescript
type Upper = Uppercase<"hello">;       // "HELLO"
type Lower = Lowercase<"HELLO">;       // "hello"
type Cap = Capitalize<"hello">;         // "Hello"
type Uncap = Uncapitalize<"Hello">;     // "hello"

type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type EventMap<Events extends string> = {
    [E in Events as EventName<E>]: (event: E) => void;
};

type ButtonEvents = EventMap<"click" | "hover" | "focus">;
// { onClick: (event: "click") => void; onHover: ...; onFocus: ... }

type PathOf<T, Prefix extends string = ""> = T extends object
    ? {
        [K in keyof T & string]:
            | \`\${Prefix}\${K}\`
            | PathOf<T[K], \`\${Prefix}\${K}.\`>
    }[keyof T & string]
    : never;

interface Config {
    server: {
        host: string;
        port: number;
    };
    database: {
        url: string;
        pool: {
            min: number;
            max: number;
        };
    };
}

type ConfigPath = PathOf<Config>;
// "server" | "server.host" | "server.port" | "database" | "database.url" | ...

function get<T, P extends PathOf<T>>(obj: T, path: P): unknown {
    return (path as string).split(".").reduce((o: any, k) => o?.[k], obj);
}
\`\`\`

### Advanced Template Literal Parsing

\`\`\`typescript
type ExtractParams<T extends string> =
    T extends \`\${string}:\${infer Param}/\${infer Rest}\`
        ? Param | ExtractParams<Rest>
        : T extends \`\${string}:\${infer Param}\`
            ? Param
            : never;

type RouteParams = ExtractParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"

type ParamRecord<T extends string> = Record<ExtractParams<T>, string>;

function createRoute<T extends string>(
    path: T,
    handler: (params: ParamRecord<T>) => void
): void {
    // implementation
}

createRoute("/users/:userId/posts/:postId", (params) => {
    console.log(params.userId);  // OK — TypeScript knows these exist
    console.log(params.postId);  // OK
    // console.log(params.invalid); // Error
});
\`\`\`

**Why it matters:** Template literal types enable type-safe string APIs — route parameters, CSS values, SQL queries, event names. Libraries like Hono, tRPC, and Prisma use these techniques to provide auto-complete for string-based APIs.

> **Role connection:** Full-Stack Developers use template literal types in route definitions (Hono, Express). Backend Developers use them for type-safe query builders. Library authors use them to build string-aware APIs.

---

## 2. Type-Level Programming

TypeScript's type system is Turing-complete. You can write recursive types, perform arithmetic, and build complex type computations.

### Recursive Types

\`\`\`typescript
type DeepReadonly<T> = T extends Function
    ? T
    : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

type DeepPartial<T> = T extends Function
    ? T
    : T extends object
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : T;

type DeepFlatten<T> = T extends readonly (infer E)[]
    ? DeepFlatten<E>
    : T;

type Nested = number[][][];
type Flat = DeepFlatten<Nested>; // number

type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

type GetFieldType<T, P extends string> =
    P extends \`\${infer Head}.\${infer Rest}\`
        ? Head extends keyof T
            ? GetFieldType<T[Head], Rest>
            : never
        : P extends keyof T
            ? T[P]
            : never;

interface DeepObject {
    a: {
        b: {
            c: number;
            d: string;
        };
        e: boolean;
    };
}

type Result = GetFieldType<DeepObject, "a.b.c">; // number
type Result2 = GetFieldType<DeepObject, "a.e">;   // boolean
\`\`\`

### Tuple Manipulation

\`\`\`typescript
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : [];
type Last<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : never;

type H = Head<[1, 2, 3]>;  // 1
type T2 = Tail<[1, 2, 3]>;  // [2, 3]
type L = Last<[1, 2, 3]>;  // 3

type Reverse<T extends readonly unknown[]> =
    T extends readonly [infer Head, ...infer Tail]
        ? [...Reverse<Tail>, Head]
        : [];

type Reversed = Reverse<[1, 2, 3, 4]>; // [4, 3, 2, 1]

type Length<T extends readonly unknown[]> = T["length"];

type Len = Length<[string, number, boolean]>; // 3

type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];

type Combined = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

type Zip<A extends readonly unknown[], B extends readonly unknown[]> =
    A extends readonly [infer AH, ...infer AT]
        ? B extends readonly [infer BH, ...infer BT]
            ? [[AH, BH], ...Zip<AT, BT>]
            : []
        : [];

type Zipped = Zip<["a", "b", "c"], [1, 2, 3]>;
// [["a", 1], ["b", 2], ["c", 3]]
\`\`\`

### Type Arithmetic

\`\`\`typescript
type BuildTuple<N extends number, T extends unknown[] = []> =
    T["length"] extends N ? T : BuildTuple<N, [...T, unknown]>;

type Add<A extends number, B extends number> =
    [...BuildTuple<A>, ...BuildTuple<B>]["length"];

type Sum = Add<3, 4>; // 7

type Subtract<A extends number, B extends number> =
    BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
        ? R["length"]
        : never;

type Diff = Subtract<7, 3>; // 4

type IsGreaterThan<A extends number, B extends number> =
    A extends B ? false
    : BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
        ? R extends [] ? false : true
        : false;

type GT = IsGreaterThan<5, 3>; // true
type EQ = IsGreaterThan<3, 3>; // false
\`\`\`

**Key things to understand:**
- TypeScript has a recursion depth limit (~1000 for most operations) — deep recursive types can hit it
- Use tail-call style recursion with accumulators to go deeper
- Type-level arithmetic is fun but rarely needed in production — use it sparingly
- The real value is in recursive utility types (DeepPartial, DeepReadonly, path types)

---

## 3. Branded / Nominal Types

TypeScript uses structural typing — if two types have the same shape, they are interchangeable. Branded types add a unique "tag" to prevent accidental mixing.

### The Problem

\`\`\`typescript
type UserId = number;
type ProductId = number;
type OrderId = number;

function getUser(id: UserId): void { /* ... */ }

const userId: UserId = 42;
const productId: ProductId = 42;

getUser(productId); // No error! Both are just "number" — structural typing
\`\`\`

### The Solution: Branded Types

\`\`\`typescript
declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;
type OrderId = Brand<number, "OrderId">;

function userId(id: number): UserId {
    return id as UserId;
}

function productId(id: number): ProductId {
    return id as ProductId;
}

function getUser(id: UserId): void {
    console.log("Getting user:", id);
}

const uid = userId(42);
const pid = productId(42);

getUser(uid);  // OK
// getUser(pid);  // Error: ProductId is not assignable to UserId

type Email = Brand<string, "Email">;
type URL = Brand<string, "URL">;
type NonEmptyString = Brand<string, "NonEmptyString">;

function validateEmail(input: string): Email | null {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(input) ? (input as Email) : null;
}

function sendEmail(to: Email, subject: string, body: string): void {
    // "to" is guaranteed to be a validated email
    console.log("Sending to:", to);
}

const email = validateEmail("alice@example.com");
if (email) {
    sendEmail(email, "Hello", "World"); // OK — email is validated
}
\`\`\`

### Branded Types with Zod

\`\`\`typescript
import { z } from "zod";

const EmailSchema = z.string().email().brand("Email");
type Email = z.infer<typeof EmailSchema>;

const PositiveIntSchema = z.number().int().positive().brand("PositiveInt");
type PositiveInt = z.infer<typeof PositiveIntSchema>;

const email = EmailSchema.parse("alice@example.com"); // Email
const count = PositiveIntSchema.parse(42);              // PositiveInt
\`\`\`

**Why it matters:** Branded types prevent an entire class of bugs — passing the wrong ID to a function, using unvalidated strings where validated ones are expected, confusing amounts in different currencies. They encode business rules in the type system.

\`\`\`mermaid
graph LR
    A["number"] --> B["UserId<br/>(branded)"]
    A --> C["ProductId<br/>(branded)"]
    A --> D["OrderId<br/>(branded)"]

    B -->|"Accepted"| E["getUser()"]
    C -->|"Rejected at compile time"| E
    D -->|"Rejected at compile time"| E

    style B fill:#e8f5e9
    style C fill:#ffebee
    style D fill:#ffebee
\`\`\`

> **Role connection:** Backend Developers use branded types for IDs, validated inputs, and monetary amounts. Full-Stack Developers use them with Zod for end-to-end type safety. Security-conscious teams brand sensitive data (PII, tokens) to prevent accidental logging.

---

## 4. Variance (Covariance and Contravariance)

Variance describes how subtype relationships in generic types relate to the subtype relationships of their parameters.

### Understanding Variance

\`\`\`typescript
class Animal {
    name: string = "";
}
class Dog extends Animal {
    breed: string = "";
}
class GoldenRetriever extends Dog {
    isGolden: true = true;
}

// Covariance: safe for read-only (output) positions
type ReadonlyBox<T> = { readonly value: T };

const dogBox: ReadonlyBox<Dog> = { value: new Dog() };
const animalBox: ReadonlyBox<Animal> = dogBox; // OK — covariant

// Contravariance: safe for write-only (input) positions
type Handler<T> = (value: T) => void;

const handleAnimal: Handler<Animal> = (a: Animal) => console.log(a.name);
const handleDog: Handler<Dog> = handleAnimal; // OK — contravariant

// Invariance: required for read-write positions
type MutableBox<T> = { value: T };

const mutableDogBox: MutableBox<Dog> = { value: new Dog() };
// const mutableAnimalBox: MutableBox<Animal> = mutableDogBox; // Error — invariant
\`\`\`

### Explicit Variance Annotations (TypeScript 4.7+)

\`\`\`typescript
interface Producer<out T> {  // covariant — T only appears in output
    get(): T;
}

interface Consumer<in T> {  // contravariant — T only appears in input
    accept(value: T): void;
}

interface Processor<in out T> {  // invariant — T appears in both
    process(value: T): T;
}

interface EventHandler {
    // Method syntax — bivariant (less safe — TypeScript allows both directions)
    handleEvent(event: Event): void;
}

interface StrictEventHandler {
    // Property syntax — contravariant (safer — stricter checking)
    handleEvent: (event: Event) => void;
}
\`\`\`

\`\`\`mermaid
graph TD
    subgraph Covariance["Covariance (out)"]
        A1["Dog extends Animal"] --> A2["Producer&lt;Dog&gt; extends Producer&lt;Animal&gt;"]
    end

    subgraph Contravariance["Contravariance (in)"]
        B1["Dog extends Animal"] --> B2["Consumer&lt;Animal&gt; extends Consumer&lt;Dog&gt;"]
    end

    subgraph Invariance["Invariance (in out)"]
        C1["Dog extends Animal"] --> C2["MutableBox&lt;Dog&gt; ≠ MutableBox&lt;Animal&gt;"]
    end

    style Covariance fill:#e8f5e9
    style Contravariance fill:#e3f2fd
    style Invariance fill:#fff3e0
\`\`\`

**Key things to understand:**
- **Covariance**: safe for read-only access. Outputs preserve subtype direction.
- **Contravariance**: safe for write-only access. Inputs reverse subtype direction.
- **Invariance**: required for read-write access. No subtype relationship.
- \`strictFunctionTypes\` enables correct contravariance for function types — always keep it on
- Explicit variance annotations (\`in\`, \`out\`) help the compiler check faster and catch incorrect usage

---

## 5. Monorepo TypeScript Configuration

Large TypeScript projects use project references and composite builds to manage compilation across packages.

### Project References

\`\`\`json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../shared" }
    ],
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`json
{
    "files": [],
    "references": [
        { "path": "./packages/shared" },
        { "path": "./packages/api" },
        { "path": "./packages/web" }
    ]
}
\`\`\`

### Build Orchestration

\`\`\`bash
# Build all packages in dependency order
tsc --build

# Build with verbose output to see what gets rebuilt
tsc --build --verbose

# Clean all build outputs
tsc --build --clean

# Force rebuild everything
tsc --build --force

# Watch mode — only rebuilds changed packages
tsc --build --watch
\`\`\`

### Shared Base Configuration

\`\`\`json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "noImplicitReturns": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "composite": true
    }
}
\`\`\`

\`\`\`json
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../shared" }
    ],
    "include": ["src/**/*"]
}
\`\`\`

**Why it matters:** Without project references, a monorepo with 20 packages would type-check ALL code on every build. With project references, TypeScript only rebuilds changed packages and their dependents. This can reduce build times from minutes to seconds.

**Common pitfalls:**
- \`composite: true\` requires \`declaration: true\` — the compiler needs .d.ts files for cross-project references
- \`declarationMap: true\` enables "Go to Definition" to jump to source instead of .d.ts files
- Path aliases (\`@shared/...\`) need both tsconfig paths AND a bundler/runtime resolver (tsconfig-paths, Vite config, etc.)
- \`tsc --build\` is different from \`tsc\` — it uses project references, while \`tsc\` alone does not

> **Role connection:** DevOps Engineers configure monorepo build pipelines with project references. Architecture-focused Seniors design the package dependency graph. Full-Stack Developers maintain shared type packages consumed by both frontend and backend.

---

## 6. JavaScript-to-TypeScript Migration Strategies

Migrating a large JavaScript codebase to TypeScript is one of the most impactful things a senior engineer can lead.

### The Incremental Approach

\`\`\`json
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": false,
        "strict": false,
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "noEmit": true
    },
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`typescript
// Step 1: JSDoc in .js files — cheap, incremental type info
/**
 * @param {string} name
 * @param {number} age
 * @returns {{ name: string, age: number, id: string }}
 */
function createUser(name, age) {
    return { name, age, id: crypto.randomUUID() };
}

// Step 2: Rename to .ts, add proper annotations
interface User {
    name: string;
    age: number;
    id: string;
}

function createUser(name: string, age: number): User {
    return { name, age, id: crypto.randomUUID() };
}
\`\`\`

### Progressive Strict Mode

Enable strict flags one at a time, fixing errors at each step, rather than trying to fix everything at once:

\`\`\`json
// Phase 1: Allow JS, no checking
{
    "compilerOptions": {
        "strict": false,
        "allowJs": true
    }
}
\`\`\`

\`\`\`json
// Phase 2: No implicit any — fixes the biggest productivity gain
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true
    }
}
\`\`\`

\`\`\`json
// Phase 3: Null checks — typically the hardest phase
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
\`\`\`

\`\`\`json
// Phase 4: Full strict mode
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true
    }
}
\`\`\`

### Migration Automation

\`\`\`typescript
// Use @ts-expect-error (not @ts-ignore) to mark known issues
function legacyCode(data: any): void {
    // @ts-expect-error — will fix in JIRA-1234
    const result = data.someUntypedMethod();
}
// @ts-expect-error errors if there is nothing to suppress (prevents stale suppressions)
// @ts-ignore suppresses silently — never use it in migrated code

// Track migration progress programmatically
import * as fs from "fs";
import * as path from "path";

function countFiles(dir: string): { ts: number; js: number } {
    let ts = 0;
    let js = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== "node_modules") {
            const sub = countFiles(path.join(dir, entry.name));
            ts += sub.ts;
            js += sub.js;
        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
            ts++;
        } else if (entry.name.endsWith(".js") || entry.name.endsWith(".jsx")) {
            js++;
        }
    }
    return { ts, js };
}

const result = countFiles("./src");
const total = result.ts + result.js;
const percentage = ((result.ts / total) * 100).toFixed(1);
console.log("TypeScript: " + result.ts + "/" + total + " (" + percentage + "%)");
console.log("JavaScript: " + result.js + "/" + total);
\`\`\`

**Why it matters:** Migration is a multi-month effort that must not block feature development. The incremental approach lets you migrate one file at a time while the rest of the team continues shipping. Progressive strict mode prevents a flood of thousands of errors on day one.

**Common pitfalls:**
- Do NOT try to enable \`strict: true\` on a large codebase all at once — you will get thousands of errors
- \`strictNullChecks\` is the hardest flag to enable — it typically requires the most code changes
- Prefer \`@ts-expect-error\` over \`@ts-ignore\` — it errors if the suppression is no longer needed
- Avoid using \`any\` as a crutch — it defeats the purpose of the migration

---

## 7. Performance — Type Checking Speed

As TypeScript projects grow, type checking can become a bottleneck. Understanding what makes types slow is critical.

### Measuring Type Check Performance

\`\`\`bash
# Generate a trace of the type checker
tsc --generateTrace ./trace-output

# Analyze the trace with @typescript/analyze-trace
npx @typescript/analyze-trace ./trace-output

# Quick performance measurement
time tsc --noEmit

# Watch for type instantiation count
tsc --noEmit --extendedDiagnostics
# Look for:
#   Types:  xxxxx
#   Instantiations:  xxxxxxx  <-- high numbers indicate complex generics
#   Check time:  x.xxs
\`\`\`

### Common Performance Issues

\`\`\`typescript
// Expensive: deep recursive conditional types
type DeepCheck<T> =
    T extends string ? "string"
    : T extends number ? "number"
    : T extends boolean ? "boolean"
    : T extends null ? "null"
    : T extends undefined ? "undefined"
    : T extends Array<infer E> ? DeepCheck<E>
    : T extends object ? { [K in keyof T]: DeepCheck<T[K]> }
    : "unknown";

// Slow: type intersection with many members
type SlowConfig = BaseConfig & DatabaseConfig & CacheConfig & LogConfig & AuthConfig;

// Fast: use interface extends instead of intersection
interface FastConfig extends BaseConfig, DatabaseConfig, CacheConfig, LogConfig, AuthConfig {}

// Slow: large union in mapped position
type AllPermissions = "read" | "write" | "delete" | "admin"; // grows to 50+ members
type PermissionMap = Record<AllPermissions, boolean>; // triggers exponential instantiation

// Fast: use string index signature for dynamic keys
type PermissionMapFast = Record<string, boolean>;

// Always annotate complex return types explicitly — helps the checker
export function createUser(name: string): { id: string; name: string } {
    return { id: crypto.randomUUID(), name };
}
\`\`\`

### Performance Best Practices

\`\`\`typescript
// Prefer interface over type intersection for the compiler
interface Good {
    a: string;
    b: number;
}

// Avoid large union types (30+ members) in mapped positions
type Status = "active" | "inactive";

// Bound recursive types with a depth counter to prevent runaway instantiation
type DeepReadonly<T, Depth extends unknown[] = []> =
    Depth["length"] extends 10
        ? T // Stop recursion at depth 10
        : T extends object
            ? { readonly [K in keyof T]: DeepReadonly<T[K], [...Depth, unknown]> }
            : T;
\`\`\`

**Key things to understand:**
- Interface \`extends\` is faster than type intersection (\`&\`) for the compiler
- Large union types (30+ members) in mapped positions can cause exponential type instantiation
- \`--generateTrace\` is your primary diagnostic tool — learn to read the trace output
- \`isolatedDeclarations\` enables parallelized declaration generation, dramatically speeding up builds in large monorepos
- Incremental builds (\`--incremental\`) cache type-checking results between builds

> **Role connection:** Tech Leads monitor type-check times as part of CI performance. Architecture Seniors design type structures that scale. DevOps Engineers configure incremental and parallel builds in CI/CD.

---

## 8. Advanced Patterns

### Builder Pattern with Types

\`\`\`typescript
interface BuilderState {
    host: boolean;
    port: boolean;
    database: boolean;
}

type ServerConfig = {
    host: string;
    port: number;
    database: string;
    ssl?: boolean;
    maxConnections?: number;
};

class ServerConfigBuilder<State extends BuilderState = { host: false; port: false; database: false }> {
    private config: Partial<ServerConfig> = {};

    host(host: string): ServerConfigBuilder<State & { host: true }> {
        this.config.host = host;
        return this as any;
    }

    port(port: number): ServerConfigBuilder<State & { port: true }> {
        this.config.port = port;
        return this as any;
    }

    database(db: string): ServerConfigBuilder<State & { database: true }> {
        this.config.database = db;
        return this as any;
    }

    ssl(enabled: boolean): this {
        this.config.ssl = enabled;
        return this;
    }

    maxConnections(max: number): this {
        this.config.maxConnections = max;
        return this;
    }

    // build() is ONLY available when all required fields are set
    build(
        this: ServerConfigBuilder<{ host: true; port: true; database: true }>
    ): ServerConfig {
        return this.config as ServerConfig;
    }
}

const config = new ServerConfigBuilder()
    .host("localhost")
    .port(5432)
    .database("mydb")
    .ssl(true)
    .build(); // OK — all required fields are set

// new ServerConfigBuilder().build(); // Error — missing host, port, database
\`\`\`

### State Machines with Types

\`\`\`typescript
type OrderState = "draft" | "submitted" | "approved" | "shipped" | "delivered" | "cancelled";

type TransitionMap = {
    draft: "submitted" | "cancelled";
    submitted: "approved" | "cancelled";
    approved: "shipped" | "cancelled";
    shipped: "delivered";
    delivered: never;
    cancelled: never;
};

interface Order<S extends OrderState> {
    id: string;
    state: S;
    items: string[];
    transition<Next extends TransitionMap[S]>(to: Next): Order<Next>;
}

function createOrder(id: string, items: string[]): Order<"draft"> {
    return {
        id,
        state: "draft",
        items,
        transition<Next extends TransitionMap["draft"]>(to: Next): Order<Next> {
            return { ...this, state: to } as Order<Next>;
        }
    };
}

const order = createOrder("ORD-001", ["Widget"]);
const submitted = order.transition("submitted");   // OK
const approved = submitted.transition("approved");  // OK
const shipped = approved.transition("shipped");     // OK
const delivered = shipped.transition("delivered");  // OK
// shipped.transition("cancelled"); // OK — cancelled is valid from shipped
// delivered.transition("anything"); // Error — delivered has no valid transitions
\`\`\`

### Type-Safe Dependency Injection

\`\`\`typescript
type ServiceMap = {
    logger: { log(message: string): void };
    database: { query(sql: string): Promise<unknown[]> };
    cache: { get(key: string): unknown; set(key: string, value: unknown): void };
    auth: { verify(token: string): Promise<{ userId: string }> };
};

class Container {
    private services = new Map<string, unknown>();

    register<K extends keyof ServiceMap>(key: K, service: ServiceMap[K]): void {
        this.services.set(key, service);
    }

    resolve<K extends keyof ServiceMap>(key: K): ServiceMap[K] {
        const service = this.services.get(key);
        if (!service) {
            throw new Error("Service not registered: " + String(key));
        }
        return service as ServiceMap[K];
    }
}

const container = new Container();

container.register("logger", {
    log(message: string) { console.log(message); }
});

container.register("cache", {
    get(key: string) { return null; },
    set(key: string, value: unknown) { /* ... */ }
});

const logger = container.resolve("logger"); // Typed as { log(message: string): void }
logger.log("Hello");
\`\`\`

### Opaque Type Modules

\`\`\`typescript
declare const currencyBrand: unique symbol;

export type Money<Currency extends string = string> = {
    readonly amount: number;
    readonly currency: Currency;
    readonly [currencyBrand]: Currency;
};

export function money<C extends string>(amount: number, currency: C): Money<C> {
    return { amount, currency } as Money<C>;
}

export function add<C extends string>(a: Money<C>, b: Money<C>): Money<C> {
    return money(a.amount + b.amount, a.currency);
}

const usd = money(100, "USD");
const eur = money(50, "EUR");

const total = add(usd, money(50, "USD")); // OK — same currency
// add(usd, eur); // Error — USD and EUR are different branded types
\`\`\`

**Why it matters:** These advanced patterns encode business rules directly into the type system. A state machine type prevents invalid state transitions. A builder type prevents incomplete construction. Branded money types prevent currency mixing. Bugs that would otherwise require careful runtime checks or code review are caught instantly by the compiler.

---

## 9. Recommended Resources — Senior Level

- **Matt Pocock** — Total TypeScript workshop — https://www.totaltypescript.com/
- **Matt Pocock** — "Advanced TypeScript" series — https://www.youtube.com/watch?v=dLPgQRbVquo
- **Theo (t3dotgg)** — "TypeScript Performance and Inference" — https://www.youtube.com/watch?v=RmGHnYUqQ4k
- **Matt Pocock** — "Why I Don't Use Enums" — https://www.youtube.com/watch?v=jjMbPt_H3RQ
- **TypeScript Performance wiki** — https://github.com/microsoft/TypeScript/wiki/Performance

---

## Summary — Senior Level

You now have expert-level TypeScript knowledge spanning:
- **Template literal types** — type-safe string manipulation, route parsing, and event naming
- **Type-level programming** — recursive types, tuple manipulation, and type arithmetic
- **Branded/nominal types** — preventing accidental type mixing with compile-time brands
- **Variance** — covariance, contravariance, invariance, and explicit variance annotations
- **Monorepo configuration** — project references, composite builds, and shared base configs
- **Migration strategies** — incremental adoption, progressive strict mode, and automation
- **Performance** — measuring type-check speed, avoiding expensive patterns, isolatedDeclarations
- **Advanced patterns** — type-safe builders, state machines, dependency injection, and opaque types

These are the skills that enable you to design type systems for large-scale applications, guide migration efforts, and build libraries that provide exceptional developer experience through TypeScript's type system.
`,
};
