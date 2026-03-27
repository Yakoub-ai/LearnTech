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

### TypeScript vs JavaScript Relationship

\`\`\`mermaid
flowchart LR
    A[TypeScript Source] --> B[TS Compiler - tsc]
    B --> C[Type Checking]
    C -->|Errors| D[Fix Types]
    D --> B
    C -->|Pass| E[Emit JavaScript]
    E --> F[Valid JS - runs anywhere]
    A --- N1["Superset of JS"]
    F --- N2["Types erased at runtime"]
\`\`\`

### Type Hierarchy

\`\`\`mermaid
flowchart TB
    U[unknown - top type] --> A[any]
    U --> S[string]
    U --> N[number]
    U --> B[boolean]
    U --> O[object]
    S --> SL["string literals"]
    N --> NL["numeric literals"]
    B --> T[true]
    B --> F[false]
    SL --> NV[never - bottom type]
    NL --> NV
    T --> NV
    F --> NV
\`\`\`

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

### Exercises

**1. Annotate a user profile object**
Declare a variable \`profile\` with explicit type annotations for \`username\` (string), \`level\` (number), and \`isPremium\` (boolean). Assign it values and log the username.

<details>
<summary>Hint</summary>

Use an inline object type annotation: \`let profile: { username: string; level: number; isPremium: boolean } = { ... }\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
let profile: { username: string; level: number; isPremium: boolean } = {
    username: "alice",
    level: 5,
    isPremium: true
};
console.log(profile.username);
\`\`\`

Expected output:
\`\`\`
alice
\`\`\`

</details>

**2. Fix a tuple type**
The following code has a type error. Identify the problem and fix it so TypeScript accepts it.

\`\`\`typescript
let point: [number, number] = [10, 20, 30];
\`\`\`

<details>
<summary>Hint</summary>

A tuple type \`[number, number]\` only allows exactly two elements. Either change the tuple type or remove the extra element.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
// Option 1: fix the value
let point: [number, number] = [10, 20];
console.log(point[0], point[1]);

// Option 2: fix the type
let point2: [number, number, number] = [10, 20, 30];
console.log(point2[0], point2[1], point2[2]);
\`\`\`

Expected output:
\`\`\`
10 20
10 20 30
\`\`\`

</details>

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

type MyReadonly<T> = {
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

### Exercises

**1. Model a blog post with an interface**
Define an \`interface Post\` with \`id\` (number), \`title\` (string), \`body\` (string), \`publishedAt\` (Date), and an optional \`tags\` (string array). Then write a function \`summarize(post: Post): string\` that returns the title and tag count.

<details>
<summary>Hint</summary>

Use \`post.tags?.length ?? 0\` or check if \`tags\` is defined before accessing \`.length\`. Optional properties are accessed the same way as regular ones, but TypeScript requires you to handle the undefined case.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
interface Post {
    id: number;
    title: string;
    body: string;
    publishedAt: Date;
    tags?: string[];
}

function summarize(post: Post): string {
    const tagCount = post.tags ? post.tags.length : 0;
    return post.title + " (" + tagCount + " tags)";
}

const post: Post = {
    id: 1,
    title: "Hello TypeScript",
    body: "...",
    publishedAt: new Date("2024-01-01"),
    tags: ["ts", "tutorial"]
};

console.log(summarize(post));
\`\`\`

Expected output:
\`\`\`
Hello TypeScript (2 tags)
\`\`\`

</details>

**2. Extend an interface**
Starting from the \`Post\` interface above, define a \`FeaturedPost\` interface that extends \`Post\` and adds a \`heroImageUrl\` (string) and \`priority\` (number). Create a value of this type and log its title and priority.

<details>
<summary>Hint</summary>

Use \`interface FeaturedPost extends Post { ... }\`. The extending interface inherits all fields from the base interface.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
interface Post {
    id: number;
    title: string;
    body: string;
    publishedAt: Date;
    tags?: string[];
}

interface FeaturedPost extends Post {
    heroImageUrl: string;
    priority: number;
}

const featured: FeaturedPost = {
    id: 2,
    title: "TypeScript Tips",
    body: "...",
    publishedAt: new Date("2024-06-01"),
    heroImageUrl: "https://example.com/img.png",
    priority: 1
};

console.log(featured.title + " — priority " + featured.priority);
\`\`\`

Expected output:
\`\`\`
TypeScript Tips — priority 1
\`\`\`

</details>

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

### Exercises

**1. Create an \`as const\` status object**
Define a \`STATUSES\` object using \`as const\` with values \`"pending"\`, \`"active"\`, and \`"archived"\`. Derive a \`Status\` type from it. Write a function \`describe(s: Status): string\` that returns a human-readable label for each status.

<details>
<summary>Hint</summary>

Use \`type Status = typeof STATUSES[keyof typeof STATUSES]\` to extract the union. Then use a series of \`if\` checks or a switch statement on the string value inside the function.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
const STATUSES = {
    Pending: "pending",
    Active: "active",
    Archived: "archived"
} as const;

type Status = typeof STATUSES[keyof typeof STATUSES];

function describe(s: Status): string {
    switch (s) {
        case "pending": return "Awaiting review";
        case "active": return "Currently active";
        case "archived": return "No longer active";
    }
}

console.log(describe("active"));
console.log(describe(STATUSES.Pending));
\`\`\`

Expected output:
\`\`\`
Currently active
Awaiting review
\`\`\`

</details>

**2. Spot the runtime surprise**
Given \`enum Color { Red, Green, Blue }\`, what does \`Object.values(Color).length\` equal at runtime, and why?

<details>
<summary>Hint</summary>

Numeric enums generate reverse mappings. The compiled object contains both \`Red: 0\` and \`0: "Red"\` — so the number of entries is doubled.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
enum Color { Red, Green, Blue }

console.log(Object.values(Color).length); // 6
console.log(Object.values(Color));
\`\`\`

Expected output:
\`\`\`
6
[ 0, 1, 2, 'Red', 'Green', 'Blue' ]
\`\`\`

The numeric enum compiles to an object with both forward (\`Red → 0\`) and reverse (\`0 → "Red"\`) mappings, giving 6 entries instead of 3. This is why \`as const\` objects are often preferred.

</details>

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
    B["Intersection A & B"] --> B1["Value has all of A AND all of B"]

    style A fill:#e3f2fd
    style B fill:#e8f5e9
\`\`\`

**Key things to understand:**
- **Union** = "either this OR that" (widens the type)
- **Intersection** = "this AND that" (narrows / combines the type)
- Unions of object types with a shared discriminant field (like \`kind\`) enable **discriminated unions** — one of TypeScript's most powerful patterns
- String literal unions like \`"pending" | "active" | "inactive"\` are often a better choice than \`enum\` for simple categorical values

### Exercises

**1. Write a \`formatId\` function**
Write a function \`formatId\` that accepts \`id: string | number\`. If it is a string, return it in uppercase. If it is a number, return it formatted as a 4-digit zero-padded string (e.g. \`7\` → \`"0007"\`).

<details>
<summary>Hint</summary>

Use \`typeof id === "string"\` to narrow the type. For the number case, \`id.toString().padStart(4, "0")\` produces the zero-padded string.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    } else {
        return id.toString().padStart(4, "0");
    }
}

console.log(formatId("abc"));
console.log(formatId(7));
console.log(formatId(42));
\`\`\`

Expected output:
\`\`\`
ABC
0007
0042
\`\`\`

</details>

**2. Compute the area of a discriminated union shape**
Define a \`Shape\` union with \`"circle"\` (radius) and \`"square"\` (side). Write \`getArea(shape: Shape): number\`.

<details>
<summary>Hint</summary>

Use a \`switch\` on \`shape.kind\`. The area of a circle is \`Math.PI * radius ** 2\`. The area of a square is \`side ** 2\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
    }
}

console.log(getArea({ kind: "circle", radius: 5 }).toFixed(2));
console.log(getArea({ kind: "square", side: 4 }));
\`\`\`

Expected output:
\`\`\`
78.54
16
\`\`\`

</details>

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
    console.log(result.value.toFixed(4)); // TypeScript knows this is number
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

### Exercises

**1. Write a generic \`identity\` function**
Write a generic function \`identity<T>(value: T): T\` that returns whatever is passed in. Call it with a string and a number and log both results.

<details>
<summary>Hint</summary>

The type parameter \`T\` is declared inside angle brackets after the function name. TypeScript infers it automatically from the argument — you do not need to write \`identity<string>("hello")\` explicitly.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function identity<T>(value: T): T {
    return value;
}

const s = identity("hello");
const n = identity(42);
console.log(s);
console.log(n);
\`\`\`

Expected output:
\`\`\`
hello
42
\`\`\`

</details>

**2. Generic Stack — push and pop**
Using the \`Stack<T>\` class from the examples above, create a \`Stack<string>\`, push \`"first"\` and \`"second"\`, then pop twice and log each popped value.

<details>
<summary>Hint</summary>

\`pop()\` returns \`T | undefined\` because the stack might be empty. You can use \`console.log(stack.pop())\` directly — \`undefined\` would just print as \`undefined\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
class Stack<T> {
    private items: T[] = [];
    push(item: T): void { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
}

const stack = new Stack<string>();
stack.push("first");
stack.push("second");
console.log(stack.pop());
console.log(stack.pop());
\`\`\`

Expected output:
\`\`\`
second
first
\`\`\`

</details>

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

### Exercises

**1. Type a \`sum\` variadic function**
Write a function \`sum\` that accepts any number of \`number\` arguments using a rest parameter and returns their total. Log \`sum(1, 2, 3, 4, 5)\`.

<details>
<summary>Hint</summary>

Rest parameters use the syntax \`...numbers: number[]\`. Use \`Array.prototype.reduce\` or a \`for...of\` loop to total them up.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4, 5));
\`\`\`

Expected output:
\`\`\`
15
\`\`\`

</details>

**2. Safe \`processInput\` with \`unknown\`**
Write a function \`processInput(input: unknown): string\` that returns \`"string: <value>"\` for strings, \`"number: <value>"\` for numbers, and \`"other"\` for anything else.

<details>
<summary>Hint</summary>

Use \`typeof input === "string"\` and \`typeof input === "number"\` to narrow the type before accessing it. You cannot call string or number methods on \`unknown\` without narrowing first.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function processInput(input: unknown): string {
    if (typeof input === "string") {
        return "string: " + input;
    }
    if (typeof input === "number") {
        return "number: " + input;
    }
    return "other";
}

console.log(processInput("hello"));
console.log(processInput(42));
console.log(processInput(true));
\`\`\`

Expected output:
\`\`\`
string: hello
number: 42
other
\`\`\`

</details>

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

const names = ["Alice", "Bob", "Charlie"];
names.forEach((name) => {
    // TypeScript knows name is string — no annotation needed
    console.log(name.toUpperCase());
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

### Exercises

**1. Narrow a \`string | number | boolean\` union**
Write a function \`describe(value: string | number | boolean): string\` that returns \`"text: <value>"\` for strings, \`"num: <value>"\` for numbers, and \`"flag: <value>"\` for booleans.

<details>
<summary>Hint</summary>

Use a chain of \`typeof\` checks. After checking for \`"string"\` and \`"number"\`, TypeScript narrows the remaining type to \`boolean\` automatically — no third \`typeof\` check is needed.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function describe(value: string | number | boolean): string {
    if (typeof value === "string") {
        return "text: " + value;
    }
    if (typeof value === "number") {
        return "num: " + value;
    }
    return "flag: " + value;
}

console.log(describe("hello"));
console.log(describe(42));
console.log(describe(true));
\`\`\`

Expected output:
\`\`\`
text: hello
num: 42
flag: true
\`\`\`

</details>

**2. Write a custom type guard**
Write a type guard \`isDate(value: unknown): value is Date\` that returns \`true\` only when \`value\` is an instance of \`Date\`. Then use it to safely call \`.toISOString()\` on an unknown value.

<details>
<summary>Hint</summary>

Use \`value instanceof Date\` as the check. The return type \`value is Date\` is a type predicate — it tells TypeScript to narrow the type to \`Date\` inside any \`if\` block where this function returns \`true\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function isDate(value: unknown): value is Date {
    return value instanceof Date;
}

function formatMaybeDate(value: unknown): string {
    if (isDate(value)) {
        return value.toISOString();
    }
    return "not a date";
}

console.log(formatMaybeDate(new Date("2024-01-15")));
console.log(formatMaybeDate("2024-01-15"));
\`\`\`

Expected output:
\`\`\`
2024-01-15T00:00:00.000Z
not a date
\`\`\`

</details>

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
    .where("age", 30)
    .select("name", "email")
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

### Exercises

**1. Write a type-safe \`merge\` function**
Write a generic function \`merge<T extends object, U extends object>(a: T, b: U): T & U\` that combines two objects. Verify that the result has all properties from both objects with correct types.

<details>
<summary>Hint</summary>

Use the spread operator \`{ ...a, ...b }\` for the implementation. The return type \`T & U\` is an intersection — TypeScript ensures the result has all properties of both \`T\` and \`U\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function merge<T extends object, U extends object>(a: T, b: U): T & U {
    return { ...a, ...b };
}

const result = merge({ name: "Alice" }, { age: 30, role: "admin" });
console.log(result.name);
console.log(result.age);
console.log(result.role);
\`\`\`

Expected output:
\`\`\`
Alice
30
admin
\`\`\`

</details>

**2. Generic \`transform\` function**
Write a generic function \`transform<T, R>(value: T, fn: (input: T) => R): R\` that applies \`fn\` to \`value\` and returns the result. Call it to convert a string to its length, and to convert a number to a boolean (\`n > 0\`).

<details>
<summary>Hint</summary>

TypeScript will infer both \`T\` and \`R\` from the arguments — you do not need to write the type parameters explicitly when calling.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function transform<T, R>(value: T, fn: (input: T) => R): R {
    return fn(value);
}

const len = transform("hello", (s) => s.length);
const isPositive = transform(5, (n) => n > 0);
console.log(len);
console.log(isPositive);
\`\`\`

Expected output:
\`\`\`
5
true
\`\`\`

</details>

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
// "pending" | "active"

type StringOrNumber = string | number | boolean | null;
type OnlyStrOrNum = Extract<StringOrNumber, string | number>;
// string | number

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

function createUser(name: string, age: number) {
    return { id: Math.random(), name, age, createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUser>;

type CreateUserParams = Parameters<typeof createUser>;
// [string, number]

type UserPromise = Promise<User>;
type ResolvedUser = Awaited<UserPromise>;

type DeepPromise = Promise<Promise<Promise<string>>>;
type DeepResolved = Awaited<DeepPromise>;
// string

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

### Exercises

**1. Build an update payload type**
Given an interface \`Product { id: number; name: string; price: number; stock: number }\`, use a utility type to create an \`UpdateProductPayload\` type where \`id\` is required but all other fields are optional. Write a function \`applyUpdate\` that merges the payload into an existing product.

<details>
<summary>Hint</summary>

Combine \`Pick\` and \`Partial\`: \`Pick<Product, "id"> & Partial<Omit<Product, "id">>\`. This keeps \`id\` required while making every other field optional.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

type UpdateProductPayload = Pick<Product, "id"> & Partial<Omit<Product, "id">>;

function applyUpdate(existing: Product, update: UpdateProductPayload): Product {
    return { ...existing, ...update };
}

const original: Product = { id: 1, name: "Widget", price: 9.99, stock: 100 };
const updated = applyUpdate(original, { id: 1, price: 7.99 });
console.log(updated.name + " now costs $" + updated.price);
\`\`\`

Expected output:
\`\`\`
Widget now costs $7.99
\`\`\`

</details>

**2. Use \`ReturnType\` and \`Parameters\`**
Given a function \`createSession(userId: string, expiresIn: number): { token: string; userId: string; expiresAt: number }\`, use \`ReturnType\` and \`Parameters\` to derive types for the return value and the parameter tuple without duplicating the type definitions.

<details>
<summary>Hint</summary>

Use \`typeof createSession\` to refer to the function type at the type level. \`ReturnType<typeof createSession>\` gives the return type; \`Parameters<typeof createSession>\` gives a tuple of parameter types.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function createSession(userId: string, expiresIn: number) {
    return {
        token: "tok_" + Math.random().toString(36).slice(2),
        userId,
        expiresAt: Date.now() + expiresIn * 1000
    };
}

type Session = ReturnType<typeof createSession>;
type CreateSessionArgs = Parameters<typeof createSession>;

const args: CreateSessionArgs = ["user_42", 3600];
const session: Session = createSession(...args);
console.log("Token for", session.userId, ":", session.token.slice(0, 12) + "...");
\`\`\`

Expected output:
\`\`\`
Token for user_42 : tok_...
\`\`\`

</details>

---

## 3. The \`satisfies\` Operator (TypeScript 5.0+)

The \`satisfies\` operator validates that a value matches a type without widening it. This gives you the best of both worlds: type checking AND precise inference.

### The Problem \`satisfies\` Solves

\`\`\`typescript
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
\`\`\`

### Practical Uses

\`\`\`typescript
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
\`\`\`

**Why it matters:** Before \`satisfies\`, you had to choose between type validation (annotation) and precise inference (\`as const\`). The \`satisfies\` operator removes this trade-off. Use it for configuration objects, route definitions, theme values, and any constant data that should be validated against a type while retaining its literal types.

### Exercises

**1. Use \`satisfies\` for a theme config**
Define a \`type Theme = "light" | "dark" | "high-contrast"\`. Create a \`themeColors\` object mapping each theme to a hex string, using \`satisfies Record<Theme, string>\`. Verify that TypeScript catches a missing key.

<details>
<summary>Hint</summary>

If you omit one of the three keys from the object, TypeScript will show an error at compile time because \`satisfies Record<Theme, string>\` requires all three keys to be present. Add all three to make it compile.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type Theme = "light" | "dark" | "high-contrast";

const themeColors = {
    light: "#ffffff",
    dark: "#1a1a1a",
    "high-contrast": "#000000",
} satisfies Record<Theme, string>;

// themeColors.dark is "#1a1a1a" — literal type preserved
console.log(themeColors.dark);
console.log(themeColors.light);
\`\`\`

Expected output:
\`\`\`
#1a1a1a
#ffffff
\`\`\`

</details>

**2. Compare annotation vs \`satisfies\`**
Create two objects: one annotated as \`ColorConfig\` and one using \`satisfies ColorConfig\`. Access the \`primary\` property of both and explain what type TypeScript infers in each case.

<details>
<summary>Hint</summary>

With a type annotation \`const x: ColorConfig = { ... }\`, TypeScript widens the type to \`string\`. With \`satisfies\`, the literal type \`"#ff0000"\` is preserved. Both compile correctly — the difference shows up when you hover over the property in an IDE.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
interface ColorConfig {
    primary: string;
    secondary: string;
}

// Annotated: primary is widened to string
const colors1: ColorConfig = {
    primary: "#ff0000",
    secondary: "#00ff00",
};

// satisfies: primary retains literal type "#ff0000"
const colors2 = {
    primary: "#ff0000",
    secondary: "#00ff00",
} satisfies ColorConfig;

// Both log the same value at runtime
console.log(colors1.primary); // string at type level
console.log(colors2.primary); // "#ff0000" at type level
\`\`\`

Expected output:
\`\`\`
#ff0000
#ff0000
\`\`\`

</details>

---

### Type Narrowing Flow

\`\`\`mermaid
flowchart TB
    A["value: string | number | null"] --> B{typeof check}
    B -->|"typeof === string"| C["value: string"]
    B -->|"typeof === number"| D["value: number"]
    A --> E{null check}
    E -->|"value === null"| F["value: null"]
    E -->|"value !== null"| G["value: string | number"]
    A --> H{instanceof check}
    H -->|"value instanceof Date"| I["value: Date"]
    A --> J{"in operator"}
    J -->|"'name' in value"| K["value has name property"]
\`\`\`

### Generic Constraints Flow

\`\`\`mermaid
flowchart LR
    A["T"] --> B{"extends constraint?"}
    B -->|"T extends string"| C["T accepts string and subtypes"]
    B -->|"T extends object"| D["T accepts any object type"]
    B -->|"K extends keyof T"| E["K limited to keys of T"]
    C --> F["Compiler enforces constraint"]
    D --> F
    E --> F
    F --> G["Type-safe generic usage"]
\`\`\`

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

### Exercises

**1. Build a \`Nullable<T>\` mapped type**
Implement \`type Nullable<T> = { [K in keyof T]: T[K] | null }\`. Apply it to a \`Point\` interface with \`x\` and \`y\` as numbers. Verify the result allows \`null\` for both fields.

<details>
<summary>Hint</summary>

A mapped type iterates over \`keyof T\` and transforms each value type. Appending \`| null\` to \`T[K]\` makes every property nullable.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

interface Point {
    x: number;
    y: number;
}

type NullablePoint = Nullable<Point>;

const p: NullablePoint = { x: 10, y: null };
console.log(p.x, p.y);
\`\`\`

Expected output:
\`\`\`
10 null
\`\`\`

</details>

**2. Use \`infer\` to extract array element type**
Write a conditional type \`ElementType<T>\` that extracts the element type from an array type. If \`T\` is not an array, it should resolve to \`never\`. Test it with \`number[]\`, \`string[]\`, and \`boolean\`.

<details>
<summary>Hint</summary>

Use the pattern \`T extends (infer E)[] ? E : never\`. The \`infer E\` captures whatever type the array contains.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type ElementType<T> = T extends (infer E)[] ? E : never;

// These are type-level assertions — no runtime output, verified by the compiler:
type N = ElementType<number[]>;  // number
type S = ElementType<string[]>;  // string
type X = ElementType<boolean>;   // never

// Runtime demonstration using a generic function:
function first<T>(arr: T[]): ElementType<T[]> {
    return arr[0] as ElementType<T[]>;
}

console.log(first([1, 2, 3]));
console.log(first(["a", "b"]));
\`\`\`

Expected output:
\`\`\`
1
a
\`\`\`

</details>

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

### Exercises

**1. Model a loading state machine**
Define \`type LoadState<T>\` as a discriminated union with variants: \`"idle"\`, \`"loading"\`, \`"success"\` (with \`data: T\`), and \`"error"\` (with \`message: string\`). Write \`renderMessage\` that returns a human-readable string for each variant.

<details>
<summary>Hint</summary>

Use \`status\` as the discriminant field. A \`switch\` on \`state.status\` will narrow the type inside each case, giving you access to \`state.data\` only in the \`"success"\` case and \`state.message\` only in the \`"error"\` case.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type LoadState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string };

function renderMessage<T>(state: LoadState<T>): string {
    switch (state.status) {
        case "idle":    return "Nothing loaded yet";
        case "loading": return "Loading...";
        case "success": return "Loaded: " + JSON.stringify(state.data);
        case "error":   return "Error: " + state.message;
    }
}

console.log(renderMessage({ status: "idle" }));
console.log(renderMessage({ status: "loading" }));
console.log(renderMessage({ status: "success", data: { name: "Alice" } }));
console.log(renderMessage({ status: "error", message: "Not found" }));
\`\`\`

Expected output:
\`\`\`
Nothing loaded yet
Loading...
Loaded: {"name":"Alice"}
Error: Not found
\`\`\`

</details>

**2. Add exhaustive checking with \`assertNever\`**
Take the \`Shape\` union from above and add a fourth variant \`{ kind: "pentagon"; sides: number }\`. Update \`getArea\` to handle it, using \`assertNever\` in the \`default\` case. Demonstrate that forgetting to handle the new case causes a compile error.

<details>
<summary>Hint</summary>

The \`assertNever\` function takes \`never\` as its parameter. If your switch is not exhaustive, TypeScript will error because the value passed to \`assertNever\` won't be \`never\` — it will be the unhandled variant type.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function assertNever(value: never): never {
    throw new Error("Unhandled case: " + JSON.stringify(value));
}

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "triangle"; base: number; height: number }
    | { kind: "pentagon"; sides: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":   return Math.PI * shape.radius ** 2;
        case "square":   return shape.side ** 2;
        case "triangle": return 0.5 * shape.base * shape.height;
        case "pentagon": return (shape.sides ** 2 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5)))) / 4;
        default:         return assertNever(shape);
    }
}

console.log(getArea({ kind: "square", side: 4 }));
\`\`\`

Expected output:
\`\`\`
16
\`\`\`

</details>

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

### Exercises

**1. Augment the Express \`Request\` type**
Write a module augmentation that adds \`currentUser?: { id: string; role: string }\` to Express's \`Request\` interface. Show how middleware would set this property and a route handler would read it.

<details>
<summary>Hint</summary>

Module augmentation for Express requires importing the module first, then using \`declare module "express" { interface Request { ... } }\`. The \`currentUser\` property should be optional since unauthenticated requests won't have it.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
import "express";

declare module "express" {
    interface Request {
        currentUser?: { id: string; role: string };
    }
}

// Middleware sets the property
import { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
    // In a real app, decode a JWT here
    req.currentUser = { id: "user_42", role: "admin" };
    next();
}

// Route handler reads it
function getProfile(req: Request, res: Response): void {
    if (!req.currentUser) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    res.json({ userId: req.currentUser.id, role: req.currentUser.role });
}
\`\`\`

</details>

**2. Write an ambient module declaration**
Write a \`.d.ts\` declaration for a hypothetical \`"simple-logger"\` module that exports a \`log(level: "info" | "warn" | "error", message: string): void\` function and a \`Logger\` class with the same method as an instance method.

<details>
<summary>Hint</summary>

Use \`declare module "simple-logger" { ... }\`. Inside, use \`export function\` for the standalone function and \`export class Logger { ... }\` for the class. No implementation bodies — only type signatures.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
// simple-logger.d.ts
declare module "simple-logger" {
    type LogLevel = "info" | "warn" | "error";

    export function log(level: LogLevel, message: string): void;

    export class Logger {
        constructor(prefix?: string);
        log(level: LogLevel, message: string): void;
    }
}
\`\`\`

</details>

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

### Exercises

**1. Build a typed mock factory**
Write a generic function \`createMock<T>(defaults: T, overrides: Partial<T> = {}): T\` that merges defaults with overrides. Use it to create a test user object with a default name that can be overridden.

<details>
<summary>Hint</summary>

The implementation is \`{ ...defaults, ...overrides }\`. The generic constraint ensures \`overrides\` only contains keys that exist in \`T\`, preventing typos in test setup.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
}

function createMock<T>(defaults: T, overrides: Partial<T> = {}): T {
    return { ...defaults, ...overrides };
}

const defaultUser: User = { id: 1, name: "Test User", email: "test@test.com", role: "user" };

const adminUser = createMock(defaultUser, { name: "Alice", role: "admin" });
const guestUser = createMock(defaultUser, { id: 2, name: "Bob" });

console.log(adminUser.name + " is " + adminUser.role);
console.log(guestUser.name + " is " + guestUser.role);
\`\`\`

Expected output:
\`\`\`
Alice is admin
Bob is user
\`\`\`

</details>

**2. Use an assertion function in a test**
Write an assertion function \`assertDefined<T>(value: T | null | undefined): asserts value is T\` that throws if the value is nullish. Show how this narrows the type so you can access properties without further null checks.

<details>
<summary>Hint</summary>

The return type \`asserts value is T\` tells TypeScript that after this function returns normally (without throwing), the type of \`value\` has been narrowed to \`T\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
function assertDefined<T>(value: T | null | undefined): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error("Expected a defined value, got " + value);
    }
}

interface User {
    name: string;
    email: string;
}

function findUser(id: number): User | null {
    return id === 1 ? { name: "Alice", email: "alice@example.com" } : null;
}

const user = findUser(1);
assertDefined(user); // TypeScript now knows user is User, not User | null
console.log(user.name);
console.log(user.email);
\`\`\`

Expected output:
\`\`\`
Alice
alice@example.com
\`\`\`

</details>

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
- **Utility types** — Partial, Required, Pick, Omit, Record, Exclude, Extract, ReturnType, NoInfer and when to use each
- **The \`satisfies\` operator** — type validation without widening, the best of both worlds
- **Mapped types** — transforming object types programmatically with key remapping and modifier changes
- **Conditional types** — type-level branching with infer, distribution, and recursive patterns
- **Compiler flags** — noUncheckedIndexedAccess, verbatimModuleSyntax, isolatedModules
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

### Exercises

**1. Build an \`EventName\` mapped type**
Using template literal types, define \`type EventHandlers<Events extends string>\` that maps each event name to an \`on\${Capitalize<Event>}\` handler function \`(event: Event) => void\`. Apply it to \`"click" | "submit" | "reset"\`.

<details>
<summary>Hint</summary>

Use a mapped type with key remapping: \`[E in Events as \`on\${Capitalize<E>}\`]: (event: E) => void\`. The \`Capitalize\` built-in type capitalizes the first letter of a string type.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type EventHandlers<Events extends string> = {
    [E in Events as \`on\${Capitalize<E>}\`]: (event: E) => void;
};

type FormHandlers = EventHandlers<"click" | "submit" | "reset">;
// { onClick: (event: "click") => void; onSubmit: ...; onReset: ... }

const handlers: FormHandlers = {
    onClick: (e) => console.log("clicked:", e),
    onSubmit: (e) => console.log("submitted:", e),
    onReset: (e) => console.log("reset:", e),
};

handlers.onClick("click");
handlers.onSubmit("submit");
\`\`\`

Expected output:
\`\`\`
clicked: click
submitted: submit
\`\`\`

</details>

**2. Extract URL parameters with template literal types**
Define \`ExtractParams<T extends string>\` that extracts \`":param"\` names from a URL pattern string. Test it with \`"/products/:productId/reviews/:reviewId"\`.

<details>
<summary>Hint</summary>

Use recursive conditional types with \`infer\`: \`T extends \`\${string}:\${infer Param}/\${infer Rest}\` ? Param | ExtractParams<Rest> : ...\`. The recursion handles multiple parameters.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type ExtractParams<T extends string> =
    T extends \`\${string}:\${infer Param}/\${infer Rest}\`
        ? Param | ExtractParams<Rest>
        : T extends \`\${string}:\${infer Param}\`
            ? Param
            : never;

type ProductReviewParams = ExtractParams<"/products/:productId/reviews/:reviewId">;
// "productId" | "reviewId"

type RouteHandler<T extends string> = (params: Record<ExtractParams<T>, string>) => void;

const handler: RouteHandler<"/products/:productId/reviews/:reviewId"> = (params) => {
    console.log("Product:", params.productId);
    console.log("Review:", params.reviewId);
};

handler({ productId: "prod_1", reviewId: "rev_42" });
\`\`\`

Expected output:
\`\`\`
Product: prod_1
Review: rev_42
\`\`\`

</details>

---

### TypeScript Compiler Pipeline

\`\`\`mermaid
flowchart LR
    A[Source Code] --> B[Scanner]
    B --> C[Parser]
    C --> D[Binder]
    D --> E[Checker]
    E --> F[Emitter]
    F --> G[JavaScript Output]
    B --- B1["Tokenize source text"]
    C --- C1["Build AST"]
    D --- D1["Create symbol table"]
    E --- E1["Type check all nodes"]
    F --- F1["Generate .js and .d.ts"]
\`\`\`

### Conditional Type Resolution

\`\`\`mermaid
flowchart TB
    A["T extends U ? X : Y"] --> B{Is T a union?}
    B -->|Yes| C[Distribute over union members]
    C --> D["Apply condition to each member"]
    D --> E[Collect results into union]
    B -->|No| F{Does T extend U?}
    F -->|Yes| G[Resolve to X]
    F -->|No| H[Resolve to Y]
    G --> I[Final type]
    H --> I
    E --> I
\`\`\`

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
type T2 = Tail<[1, 2, 3]>; // [2, 3]
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

### Exercises

**1. Implement \`DeepPartial<T>\`**
Write a recursive \`DeepPartial<T>\` type that makes every property at every nesting level optional. Test it against a nested config interface.

<details>
<summary>Hint</summary>

Check \`T extends object\` before recursing. For non-object types (strings, numbers, etc.) just return \`T\` unchanged. This prevents infinite recursion on primitives.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type DeepPartial<T> = T extends Function
    ? T
    : T extends object
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : T;

interface AppConfig {
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

type PartialConfig = DeepPartial<AppConfig>;

// All fields are optional at every level
const patch: PartialConfig = {
    server: { port: 5000 },
    database: { pool: { max: 20 } }
};

console.log(patch.server?.port);
console.log(patch.database?.pool?.max);
\`\`\`

Expected output:
\`\`\`
5000
20
\`\`\`

</details>

**2. Build tuple \`Head\` and \`Tail\` types**
Implement \`Head<T>\` (returns the first element type) and \`Tail<T>\` (returns the remaining elements as a tuple). Verify with \`[string, number, boolean]\`.

<details>
<summary>Hint</summary>

Use rest patterns in conditional types: \`T extends [infer H, ...unknown[]] ? H : never\` for Head, and \`T extends [unknown, ...infer R] ? R : []\` for Tail.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type Head<T extends readonly unknown[]> =
    T extends readonly [infer H, ...unknown[]] ? H : never;

type Tail<T extends readonly unknown[]> =
    T extends readonly [unknown, ...infer R] ? R : [];

// Type-level verification (no runtime output — checked by compiler):
type H = Head<[string, number, boolean]>; // string
type T = Tail<[string, number, boolean]>; // [number, boolean]

// Runtime demonstration
function head<T extends unknown[]>(arr: T): Head<T> {
    return arr[0] as Head<T>;
}

function tail<T extends unknown[]>(arr: T): Tail<T> {
    return arr.slice(1) as unknown as Tail<T>;
}

console.log(head([1, 2, 3]));
console.log(tail([1, 2, 3]));
\`\`\`

Expected output:
\`\`\`
1
[ 2, 3 ]
\`\`\`

</details>

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

### Exercises

**1. Create branded ID types**
Define a \`Brand<T, B>\` utility and use it to create distinct \`UserId\`, \`PostId\`, and \`CommentId\` types from \`number\`. Write constructor functions for each and a \`getPost(id: PostId)\` function. Demonstrate that passing a \`UserId\` causes a compile error.

<details>
<summary>Hint</summary>

Use \`declare const brand: unique symbol\` and \`type Brand<T, B extends string> = T & { readonly [brand]: B }\`. The constructor functions use \`id as UserId\` to cast the plain number to the branded type — this is the only place the cast is needed.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<number, "UserId">;
type PostId = Brand<number, "PostId">;
type CommentId = Brand<number, "CommentId">;

const toUserId = (id: number): UserId => id as UserId;
const toPostId = (id: number): PostId => id as PostId;
const toCommentId = (id: number): CommentId => id as CommentId;

function getPost(id: PostId): string {
    return "Fetching post " + id;
}

const uid = toUserId(1);
const pid = toPostId(2);

console.log(getPost(pid));
// getPost(uid); // Error: Argument of type 'UserId' is not assignable to parameter of type 'PostId'
\`\`\`

Expected output:
\`\`\`
Fetching post 2
\`\`\`

</details>

**2. Brand a validated string**
Create a \`ValidatedEmail\` branded type. Write \`parseEmail(input: string): ValidatedEmail | null\` that validates the format and returns the branded type on success. Write \`sendWelcome(email: ValidatedEmail): void\`. Show that a plain string cannot be passed to \`sendWelcome\`.

<details>
<summary>Hint</summary>

The validation function is the boundary where you cast from \`string\` to \`ValidatedEmail\` using \`input as ValidatedEmail\`. Everything downstream that requires \`ValidatedEmail\` is protected — only strings that passed through \`parseEmail\` will have that type.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

type ValidatedEmail = Brand<string, "ValidatedEmail">;

function parseEmail(input: string): ValidatedEmail | null {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(input) ? (input as ValidatedEmail) : null;
}

function sendWelcome(email: ValidatedEmail): void {
    console.log("Welcome email sent to:", email);
}

const good = parseEmail("alice@example.com");
const bad = parseEmail("not-an-email");

if (good) sendWelcome(good);
if (bad) sendWelcome(bad); // never runs — bad is null
console.log("bad result:", bad);

// sendWelcome("alice@example.com"); // Error: plain string not assignable to ValidatedEmail
\`\`\`

Expected output:
\`\`\`
Welcome email sent to: alice@example.com
bad result: null
\`\`\`

</details>

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

### Exercises

**1. Demonstrate covariance with a readonly box**
Define \`ReadonlyBox<T> = { readonly value: T }\`. Show that a \`ReadonlyBox<Dog>\` can be assigned to \`ReadonlyBox<Animal>\` (covariant), but a \`MutableBox<Dog>\` cannot be assigned to \`MutableBox<Animal>\` (invariant).

<details>
<summary>Hint</summary>

Covariance is safe because a readonly box only ever produces values — you can safely read a \`Dog\` as an \`Animal\`. Mutability breaks this because if you could write an \`Animal\` into a \`MutableBox<Dog>\`, you could put a \`Cat\` there, corrupting the \`Dog\` box.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
class Animal { name: string = ""; }
class Dog extends Animal { breed: string = ""; }

type ReadonlyBox<T> = { readonly value: T };
type MutableBox<T> = { value: T };

const dogReadonlyBox: ReadonlyBox<Dog> = { value: new Dog() };
const animalReadonlyBox: ReadonlyBox<Animal> = dogReadonlyBox; // OK — covariant

console.log("Covariant assignment works:", animalReadonlyBox.value.name);

const dogMutableBox: MutableBox<Dog> = { value: new Dog() };
// const animalMutableBox: MutableBox<Animal> = dogMutableBox; // Error — invariant

console.log("Mutable box stays as Dog:", dogMutableBox.value.name);
\`\`\`

Expected output:
\`\`\`
Covariant assignment works:
Mutable box stays as Dog:
\`\`\`

</details>

**2. Contravariance with function parameters**
Define \`type Printer<T> = (value: T) => void\`. Show that a \`Printer<Animal>\` can be assigned to \`Printer<Dog>\` (contravariant), and explain why this is safe.

<details>
<summary>Hint</summary>

A function that handles \`Animal\` can safely handle a \`Dog\` because \`Dog\` is a subtype of \`Animal\` — it has everything \`Animal\` has plus more. The subtype relationship flips for function parameters: \`Printer<Animal>\` is a subtype of \`Printer<Dog>\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
class Animal { name: string = "Animal"; }
class Dog extends Animal { breed: string = "Unknown"; }

type Printer<T> = (value: T) => void;

const printAnimal: Printer<Animal> = (a) => console.log("Animal:", a.name);
const printDog: Printer<Dog> = printAnimal; // OK — contravariant

// Safe: printAnimal accepts any Animal, and Dog is an Animal
printDog(Object.assign(new Dog(), { name: "Rex", breed: "Labrador" }));
\`\`\`

Expected output:
\`\`\`
Animal: Rex
\`\`\`

</details>

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

### Exercises

**1. Design a monorepo tsconfig structure**
Describe the three tsconfig files you would create for a monorepo with packages \`shared\`, \`api\` (depends on shared), and \`web\` (depends on shared). What fields are required in each, and why?

<details>
<summary>Hint</summary>

The root \`tsconfig.json\` has \`files: []\` and only \`references\`. Each package needs \`composite: true\` and \`declaration: true\`. Packages that depend on others list them in \`references\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`json
// Root tsconfig.json — orchestrates builds
{
    "files": [],
    "references": [
        { "path": "./packages/shared" },
        { "path": "./packages/api" },
        { "path": "./packages/web" }
    ]
}
\`\`\`

\`\`\`json
// packages/shared/tsconfig.json — no dependencies
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true
    },
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`json
// packages/api/tsconfig.json — depends on shared
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true
    },
    "references": [{ "path": "../shared" }],
    "include": ["src/**/*"]
}
\`\`\`

Key reasons: \`composite: true\` enables incremental builds and cross-project references. \`declaration: true\` generates .d.ts files that other packages consume. \`declarationMap: true\` enables "Go to Definition" to jump to source files.

</details>

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

### Exercises

**1. Plan a migration strategy**
You have a 500-file JavaScript codebase. Describe the four phases of a progressive TypeScript migration and which tsconfig flags you would enable in each phase.

<details>
<summary>Hint</summary>

Phase 1 adds TypeScript to the toolchain without breaking anything. Phase 2 enables the flag with the highest benefit-to-effort ratio. Phase 3 tackles the most common and hardest flag. Phase 4 turns on full strict mode.

</details>

<details>
<summary>Answer</summary>

**Phase 1 — Zero friction entry:**
Enable \`allowJs: true\`, \`checkJs: false\`, \`strict: false\`. TypeScript is now in the build pipeline but makes no demands. Start renaming the most stable utility files from \`.js\` to \`.ts\`.

**Phase 2 — noImplicitAny:**
Enable \`noImplicitAny: true\`. This single flag delivers the most type-safety improvement for the effort. It forces all parameters and return values to have explicit types, which surfaces most structural type information.

**Phase 3 — strictNullChecks:**
Enable \`strictNullChecks: true\`. This is typically the hardest phase because null/undefined are pervasive. Use \`@ts-expect-error\` (never \`@ts-ignore\`) for genuine unknowns and track them in a backlog.

**Phase 4 — Full strict:**
Enable \`strict: true\` plus \`noUncheckedIndexedAccess: true\`. By this point most errors are already fixed so the remaining count is manageable.

</details>

**2. Explain \`@ts-expect-error\` vs \`@ts-ignore\`**
Describe the difference between \`@ts-expect-error\` and \`@ts-ignore\`, and explain which one you should use during a migration and why.

<details>
<summary>Hint</summary>

The key difference is what happens when the suppressed error no longer exists. One directive will itself become an error (useful for tracking progress); the other stays silent forever.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
// @ts-ignore: silently suppresses the next line — forever.
// Even after you fix the underlying issue, it stays quiet.
// Never use in migrated code — it hides bugs.

// @ts-expect-error: suppresses the next line BUT raises its own error
// if the suppressed error is no longer present.
// This makes stale suppressions visible — ideal for migration tracking.

function legacyFn(data: any) {
    // @ts-expect-error — TODO: type this properly in JIRA-1234
    const result = data.untypedMethod();
    return result;
}

// Once you type data properly, the @ts-expect-error itself becomes an error:
// "Unused '@ts-expect-error' directive."
// This tells you the suppression is no longer needed — clean it up.
\`\`\`

During migration always use \`@ts-expect-error\`. It acts as a self-cleaning TODO: as you fix the underlying types, suppressions automatically surface as errors to be removed.

</details>

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

### Exercises

**1. Rewrite a slow intersection as a fast interface**
Rewrite \`type Config = BaseConfig & DatabaseConfig & CacheConfig\` as an \`interface Config\` that extends all three. Explain why this is faster for the TypeScript compiler.

<details>
<summary>Hint</summary>

The TypeScript compiler caches interface relationships between builds but must recompute intersection types each time they are encountered. Use \`interface Config extends BaseConfig, DatabaseConfig, CacheConfig {}\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
interface BaseConfig { host: string; port: number; }
interface DatabaseConfig { dbUrl: string; poolSize: number; }
interface CacheConfig { cacheUrl: string; ttl: number; }

// Slow — intersection recomputed every time
type SlowConfig = BaseConfig & DatabaseConfig & CacheConfig;

// Fast — interface relationship is cached
interface FastConfig extends BaseConfig, DatabaseConfig, CacheConfig {}

const config: FastConfig = {
    host: "localhost",
    port: 3000,
    dbUrl: "postgres://...",
    poolSize: 10,
    cacheUrl: "redis://...",
    ttl: 300
};

console.log(config.host + ":" + config.port);
\`\`\`

Expected output:
\`\`\`
localhost:3000
\`\`\`

The TypeScript compiler caches interface \`extends\` relationships in its internal symbol table. Type intersections (\`&\`) are recomputed at each use site. For configs extended in many files, \`interface extends\` can cut type-check time significantly.

</details>

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
// shipped.transition("cancelled"); // Error — shipped can only transition to "delivered"
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

### Exercises

**1. Build a type-safe state machine**
Define a traffic light state machine with states \`"red"\`, \`"green"\`, \`"yellow"\` and a transition map where \`red → green\`, \`green → yellow\`, \`yellow → red\`. Write a \`transition\` function that only accepts valid next states.

<details>
<summary>Hint</summary>

Use a \`TransitionMap\` type that maps each state to its allowed next states. The \`transition\` function should be generic: \`function transition<S extends State, Next extends TransitionMap[S]>(current: S, next: Next): Next\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
type TrafficState = "red" | "green" | "yellow";

type TransitionMap = {
    red: "green";
    green: "yellow";
    yellow: "red";
};

function transition<S extends TrafficState, Next extends TransitionMap[S]>(
    _current: S,
    next: Next
): Next {
    return next;
}

const s1 = transition("red", "green");     // OK
const s2 = transition("green", "yellow");  // OK
const s3 = transition("yellow", "red");    // OK
// transition("red", "yellow"); // Error — red can only go to green

console.log("red →", s1);
console.log("green →", s2);
console.log("yellow →", s3);
\`\`\`

Expected output:
\`\`\`
red → green
green → yellow
yellow → red
\`\`\`

</details>

**2. Type-safe Money with currency branding**
Define a \`Money<C extends string>\` type branded by currency. Write \`add\` and \`subtract\` functions that only work on the same currency. Demonstrate that mixing currencies is a compile error.

<details>
<summary>Hint</summary>

Use \`declare const currencyBrand: unique symbol\` and include it as a readonly property in the \`Money\` type. The generic parameter \`C\` ties the currency string to the brand, making \`Money<"USD">\` and \`Money<"EUR">\` incompatible.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
declare const currencyBrand: unique symbol;

type Money<C extends string> = {
    readonly amount: number;
    readonly currency: C;
    readonly [currencyBrand]: C;
};

function money<C extends string>(amount: number, currency: C): Money<C> {
    return { amount, currency } as Money<C>;
}

function add<C extends string>(a: Money<C>, b: Money<C>): Money<C> {
    return money(a.amount + b.amount, a.currency);
}

function subtract<C extends string>(a: Money<C>, b: Money<C>): Money<C> {
    return money(a.amount - b.amount, a.currency);
}

const price = money(100, "USD");
const tax = money(8.5, "USD");
const total = add(price, tax);
console.log(total.amount + " " + total.currency);

const eur = money(50, "EUR");
// add(price, eur); // Error: Money<"USD"> is not assignable to Money<"EUR">
\`\`\`

Expected output:
\`\`\`
108.5 USD
\`\`\`

</details>

---

## 9. TypeScript 5.x Features for Seniors

### \`const\` Type Parameters (TS 5.0)

The \`const\` modifier on a type parameter infers literal types by default — no \`as const\` needed at the call site.

\`\`\`typescript
// Without const: T is inferred as string[]
function routes<T extends readonly string[]>(paths: T): T {
    return paths;
}
const r1 = routes(["home", "about"]); // string[]

// With const: T is inferred as readonly ["home", "about"]
function routesConst<const T extends readonly string[]>(paths: T): T {
    return paths;
}
const r2 = routesConst(["home", "about"]); // readonly ["home", "about"]

// Practical example: type-safe event emitter
function defineEvents<const T extends Record<string, unknown[]>>(events: T) {
    return events;
}

const events = defineEvents({
    click: [{ x: 0, y: 0 }],
    keydown: [{ key: "" }],
});
// events.click is [{ x: number; y: number }] — literal structure preserved
\`\`\`

### \`using\` Declarations — Explicit Resource Management (TS 5.2)

The \`using\` keyword implements the TC39 Explicit Resource Management proposal. It ensures cleanup via the \`Symbol.dispose\` and \`Symbol.asyncDispose\` protocols.

\`\`\`typescript
class DatabaseConnection implements Disposable {
    constructor(private url: string) {
        console.log("Connected to " + url);
    }

    query(sql: string): unknown[] {
        return []; // simplified
    }

    [Symbol.dispose](): void {
        console.log("Connection closed");
    }
}

function runQuery() {
    using conn = new DatabaseConnection("postgres://localhost/mydb");
    // conn is automatically disposed when the scope exits
    return conn.query("SELECT * FROM users");
    // "Connection closed" is logged here — even if query() throws
}

// Async version
class FileHandle implements AsyncDisposable {
    async [Symbol.asyncDispose](): Promise<void> {
        // await this.close();
        console.log("File closed");
    }
}

async function processFile() {
    await using handle = new FileHandle();
    // handle is disposed when scope exits
}
\`\`\`

**Why it matters:** \`using\` replaces try/finally for resource cleanup (database connections, file handles, locks). It is the TypeScript equivalent of Python's \`with\` statement or C#'s \`using\` block.

### TC39 Decorators (TS 5.0+ — Stage 3 Standard)

TypeScript 5.0 ships TC39 standard decorators. These are **different from legacy experimental decorators** (\`experimentalDecorators: true\`). The new decorators follow the Stage 3 TC39 proposal and will work in plain JavaScript too.

\`\`\`typescript
// TC39 decorator — a plain function that receives the target and context
function log<This, Args extends unknown[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    return function (this: This, ...args: Args): Return {
        console.log("Calling " + String(context.name) + " with", args);
        const result = target.call(this, ...args);
        console.log("Result:", result);
        return result;
    };
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

// Decorator metadata (TS 5.2+)
const VALIDATORS = Symbol("validators");

function validate(regex: RegExp) {
    return function <This, Value extends string>(
        _target: ClassAccessorDecoratorTarget<This, Value>,
        context: ClassAccessorDecoratorContext<This, Value>
    ) {
        context.metadata[VALIDATORS] ??= {};
        (context.metadata[VALIDATORS] as Record<string | symbol, RegExp>)[context.name] = regex;
    };
}

class UserForm {
    @validate(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)
    accessor email = "" as string;

    @validate(/^\\+?[\\d\\s-]{7,15}$/)
    accessor phone = "" as string;
}
\`\`\`

**Key things to understand:**
- TC39 decorators are **not compatible** with legacy \`experimentalDecorators\` — do not mix them
- Legacy decorators are still supported but should be considered deprecated for new projects
- TC39 decorators work on classes, methods, accessors, and fields
- Decorator metadata (\`context.metadata\`) replaces \`reflect-metadata\` for new code
- Frameworks like Angular and NestJS are migrating to TC39 decorators — check your framework's documentation

### Exercises

**1. Use \`const\` type parameters**
Write a function \`defineRoutes<const T extends Record<string, { path: string; method: string }>>(routes: T): T\`. Verify that without the \`const\` modifier the method values are widened to \`string\`, but with it they retain their literal types like \`"GET"\`.

<details>
<summary>Hint</summary>

Declare two versions of the function — one with \`const T\` and one without. Compare what TypeScript infers for the \`method\` property of the returned object.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
// Without const: method is inferred as string
function defineRoutesWide<T extends Record<string, { path: string; method: string }>>(
    routes: T
): T {
    return routes;
}

// With const: method retains literal type "GET", "POST", etc.
function defineRoutes<const T extends Record<string, { path: string; method: string }>>(
    routes: T
): T {
    return routes;
}

const wide = defineRoutesWide({
    getUser: { path: "/users/:id", method: "GET" },
});
// wide.getUser.method is string

const precise = defineRoutes({
    getUser: { path: "/users/:id", method: "GET" },
    createUser: { path: "/users", method: "POST" },
});
// precise.getUser.method is "GET"
// precise.createUser.method is "POST"

console.log(precise.getUser.method);
console.log(precise.createUser.method);
\`\`\`

Expected output:
\`\`\`
GET
POST
\`\`\`

</details>

**2. Implement a \`Disposable\` class with \`using\`**
Create a \`Timer\` class that implements \`Disposable\`. The constructor logs \`"Timer started"\` and \`[Symbol.dispose]\` logs \`"Timer stopped"\`. Use it with the \`using\` keyword in a function and verify the dispose log appears.

<details>
<summary>Hint</summary>

\`using\` requires the \`lib\` in tsconfig to include \`"ES2022"\` or higher, and the \`target\` to be ES2022+. The dispose method is called automatically when the variable goes out of scope, whether the scope exits normally or via an exception.

</details>

<details>
<summary>Answer</summary>

\`\`\`typescript
class Timer implements Disposable {
    private start: number;

    constructor(private name: string) {
        this.start = Date.now();
        console.log("Timer started: " + name);
    }

    elapsed(): number {
        return Date.now() - this.start;
    }

    [Symbol.dispose](): void {
        console.log("Timer stopped: " + this.name + " (" + this.elapsed() + "ms)");
    }
}

function runTask(): void {
    using timer = new Timer("task");
    // do some work
    let sum = 0;
    for (let i = 0; i < 1000000; i++) sum += i;
    console.log("Sum:", sum);
    // timer is disposed here automatically
}

runTask();
\`\`\`

Expected output (timing will vary):
\`\`\`
Timer started: task
Sum: 499999500000
Timer stopped: task (Xms)
\`\`\`

</details>

---

## 10. Recommended Resources — Senior Level

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
- **TypeScript 5.x features** — \`const\` type parameters, \`using\` declarations, TC39 decorators, and decorator metadata

These are the skills that enable you to design type systems for large-scale applications, guide migration efforts, and build libraries that provide exceptional developer experience through TypeScript's type system.
`,
};
