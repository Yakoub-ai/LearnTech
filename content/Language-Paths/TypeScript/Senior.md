# TypeScript — Senior Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/typescript/senior)

## Prerequisites

- Completion of the TypeScript Mid guide or equivalent knowledge
- Strong understanding of advanced generics, mapped types, and conditional types
- Experience maintaining large TypeScript codebases

## Estimated Time

55 hours

---

## 1. Template Literal Types

Template literal types combine string literal types with template syntax to create powerful string-pattern types.

### Basic Composition

```typescript
type Shade = "light" | "dark";
type Color = "red" | "green" | "blue";

type ColorVariant = `${Shade}-${Color}`;
// "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"
// 2 x 3 = 6 combinations — all generated automatically
```

### Built-In String Manipulation Types

TypeScript provides four intrinsic string manipulation types:

```typescript
type Upper = Uppercase<"hello">;     // "HELLO"
type Lower = Lowercase<"HELLO">;     // "hello"
type Cap   = Capitalize<"hello">;    // "Hello"
type Uncap = Uncapitalize<"Hello">;  // "hello"
```

### Event Handler Types

```typescript
type DOMEvent = "click" | "focus" | "blur" | "keydown";
type EventHandler = `on${Capitalize<DOMEvent>}`;
// "onClick" | "onFocus" | "onBlur" | "onKeydown"
```

### CSS Length Types

```typescript
type CSSUnit = "px" | "em" | "rem" | "vh" | "vw" | "%";
type CSSLength = `${number}${CSSUnit}`;
// Accepts "100px", "1.5em", "50vh" — rejects "100" or "px100"

function setWidth(el: HTMLElement, width: CSSLength) {
  el.style.width = width;
}
setWidth(el, "100px"); // OK
// setWidth(el, "100");  // Error — no unit
```

### Parsing Route Parameters with `infer`

```typescript
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<Rest>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type Params = ExtractParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"
```

This recursive pattern is how routers like Hono provide type-safe route parameters. The handler's `params` object is typed with exactly the extracted keys.

### Getter/Setter Generation

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface User { name: string; age: number }
type UserAccessors = Getters<User> & Setters<User>;
// { getName: () => string; getAge: () => number; setName: (value: string) => void; setAge: (value: number) => void }
```

---

## 2. Type-Level Programming and Recursive Types

### Recursive Mapped Types

```typescript
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
```

These are essential for deeply nested structures like configuration objects, API responses, and state trees.

### Recursive Tuple Operations

```typescript
// Remove the first element
type Tail<T extends readonly unknown[]> =
  T extends readonly [unknown, ...infer R] ? R : [];

type T = Tail<[1, 2, 3]>; // [2, 3]

// Get the first element
type Head<T extends readonly unknown[]> =
  T extends readonly [infer H, ...unknown[]] ? H : never;

type H = Head<[1, 2, 3]>; // 1

// Reverse a tuple
type Reverse<T extends readonly unknown[]> =
  T extends readonly [infer H, ...infer Tail]
    ? [...Reverse<Tail>, H]
    : [];

type R = Reverse<[1, 2, 3]>; // [3, 2, 1]
```

### Type-Level Arithmetic via Tuple Length

```typescript
type BuildTuple<N extends number, T extends unknown[] = []> =
  T["length"] extends N ? T : BuildTuple<N, [...T, unknown]>;

type Add<A extends number, B extends number> =
  [...BuildTuple<A>, ...BuildTuple<B>]["length"];

type Sum = Add<3, 4>; // 7
```

TypeScript has no arithmetic operators in types. The workaround encodes numbers as tuple lengths: concatenate two tuples and read `.length` to get the sum.

### Self-Referential Types

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

This type accurately models the recursive nature of JSON data. Any valid JSON structure satisfies `JSONValue`.

### Dot-Notation Path Types

```typescript
type PathOf<T> = T extends object
  ? {
      [K in keyof T & string]: K | `${K}.${PathOf<T[K]>}`;
    }[keyof T & string]
  : never;

interface Config {
  db: { host: string; port: number };
  cache: { ttl: number };
}

type ConfigPath = PathOf<Config>;
// "db" | "db.host" | "db.port" | "cache" | "cache.ttl"
```

Used in type-safe form libraries and configuration utilities to provide autocomplete for nested property paths.

### Recursion Depth Limits

TypeScript limits recursion depth (~1000 levels) to prevent the type checker from hanging. For deeply recursive types:

- Use an accumulator pattern with a depth counter tuple
- Break large unions into smaller groups
- Replace unbounded recursion with iterative mapped types where possible

---

## 3. Branded and Nominal Types

### The Problem: Structural Typing Allows Mixing

```typescript
type UserId = number;
type ProductId = number;

function getUser(id: UserId): User { /* ... */ }

const productId: ProductId = 42;
getUser(productId); // Compiles without error — both are just number
```

### The Solution: Branded Types

```typescript
declare const brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;

function getUser(id: UserId): User { /* ... */ }

const userId = 1 as UserId;
const productId = 42 as ProductId;

getUser(userId);     // OK
// getUser(productId); // Error — ProductId is not assignable to UserId
```

The brand is a **phantom type** — it exists only in the type system. At runtime, branded values are plain numbers or strings. Zero runtime overhead.

### Constructor Functions for Brands

```typescript
function createUserId(id: number): UserId {
  if (id <= 0) throw new Error("UserId must be positive");
  return id as UserId;
}

function createProductId(id: number): ProductId {
  if (id <= 0) throw new Error("ProductId must be positive");
  return id as ProductId;
}
```

### Brands with Zod

```typescript
const EmailSchema = z.string().email().brand("Email");
type Email = z.infer<typeof EmailSchema>;

const email = EmailSchema.parse("alice@example.com"); // Email (branded)
// const raw: Email = "alice@example.com"; // Error — must go through parse
```

Zod's `.brand()` ensures the branded type can only be obtained after successful validation.

### When to Use Branded Types

- **IDs** — prevent mixing `UserId`, `OrderId`, `ProductId`
- **Validated inputs** — distinguish `Email` from `string`
- **Monetary amounts** — prevent adding `Money<"USD">` to `Money<"EUR">`
- **Security-sensitive values** — separate `SanitizedHTML` from raw `string`

---

## 4. Variance: Covariance, Contravariance, and Invariance

### Covariance (Output Positions)

If `Dog extends Animal`, then `ReadonlyBox<Dog>` is assignable to `ReadonlyBox<Animal>`:

```typescript
interface ReadonlyBox<out T> {
  get(): T;
}

declare const dogBox: ReadonlyBox<Dog>;
const animalBox: ReadonlyBox<Animal> = dogBox; // OK — covariant
```

The `out` annotation marks T as covariant — T appears only in output (return) positions.

### Contravariance (Input Positions)

For input positions, the direction reverses:

```typescript
interface Handler<in T> {
  handle(value: T): void;
}

declare const animalHandler: Handler<Animal>;
const dogHandler: Handler<Dog> = animalHandler; // OK — contravariant
```

A handler that accepts any `Animal` can safely handle a `Dog`. The `in` annotation marks T as contravariant.

### Invariance (Both Positions)

Mutable containers must be invariant:

```typescript
interface MutableBox<in out T> {
  get(): T;
  set(value: T): void;
}

// MutableBox<Dog> is NOT assignable to MutableBox<Animal>
// because you could write an Animal that isn't a Dog
```

### Method vs Property Syntax and `strictFunctionTypes`

```typescript
interface EventTarget {
  // Method syntax — bivariant (less safe, for backward compatibility)
  addEventListener(type: string, handler: (e: Event) => void): void;

  // Property syntax — contravariant with strictFunctionTypes (correct)
  onEvent: (e: Event) => void;
}
```

For stricter type safety, prefer property syntax `fn: (arg: T) => R` over method syntax `fn(arg: T): R`.

### Explicit Variance Annotations (TypeScript 4.7+)

```typescript
interface Producer<out T> { produce(): T }       // Covariant
interface Consumer<in T> { consume(value: T): void }  // Contravariant
interface Transform<in I, out O> { run(input: I): O } // Mixed
```

These annotations help the compiler check variance correctly and can improve type-checking speed.

---

## 5. TC39 Decorators (Stage 3 Standard)

TypeScript 5.0+ supports the standardized TC39 decorator proposal (not the legacy `experimentalDecorators`):

```typescript
function logged<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext,
) {
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    console.log(`Calling ${String(context.name)}`);
    return target.apply(this, args);
  } as T;
}

class UserService {
  @logged
  getUser(id: number) {
    return { id, name: "Alice" };
  }
}
```

Key differences from legacy decorators:
- Standard decorators receive a `context` object (not `target, key, descriptor`)
- They work with `--experimentalDecorators` disabled
- They are the future standard — prefer these for new code

---

## 6. `const` Type Parameters (TS 5.0) and `using` Declarations (TS 5.2)

### `const` Type Parameters

Without `const`, TypeScript widens literal types in generic arguments:

```typescript
function routes<const T extends readonly { path: string; method: string }[]>(
  config: T,
): T {
  return config;
}

const r = routes([
  { path: "/users", method: "GET" },
  { path: "/users", method: "POST" },
]);
// r[0].method is "GET" (not string) — const preserves literal types
```

Without `const`, `method` would widen to `string`. The `const` modifier on the type parameter applies `as const` inference to the argument.

### `using` Declarations (Explicit Resource Management)

```typescript
class DatabaseConnection implements Disposable {
  [Symbol.dispose]() {
    console.log("Connection closed");
  }

  query(sql: string) { /* ... */ }
}

function runQuery() {
  using conn = new DatabaseConnection();
  conn.query("SELECT * FROM users");
  // conn is automatically disposed when the block exits
}

// Async version
class FileHandle implements AsyncDisposable {
  async [Symbol.asyncDispose]() {
    console.log("File closed");
  }
}

async function readFile() {
  await using file = new FileHandle();
  // file is disposed when the block exits
}
```

This is the TypeScript implementation of the TC39 Explicit Resource Management proposal, similar to Python's `with` or C#'s `using`.

---

## 7. Monorepo Configuration and Project References

### Project References

```json
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}

// packages/web/tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    { "path": "../shared" }
  ]
}

// Root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "packages/shared" },
    { "path": "packages/web" },
    { "path": "packages/api" }
  ]
}
```

### `composite: true`

Marks a project as a valid reference target. Requires:
- `declaration: true` — generates `.d.ts` files for downstream consumers
- Explicitly defined `rootDir`

Downstream packages import from `.d.ts` files rather than re-type-checking source, making monorepo builds fast.

### `tsc --build`

```bash
tsc --build          # Build all referenced projects, skip unchanged
tsc --build --force  # Force full rebuild
tsc --build --clean  # Remove output files
```

`--build` understands the project reference graph: it determines which packages changed, rebuilds only those and their dependents, and uses cached `.d.ts` files for unchanged packages.

### `declarationMap: true`

Creates source maps linking generated `.d.ts` files back to original `.ts` source. This makes "Go to Definition" in your editor jump to the source code, not the generated declaration file.

### `typeRoots` Warning

If you set `typeRoots` explicitly, you must include `node_modules/@types`, or TypeScript will stop finding `@types/*` packages:

```json
{
  "compilerOptions": {
    "typeRoots": ["./types", "./node_modules/@types"]
  }
}
```

---

## 8. JavaScript-to-TypeScript Migration Strategies

### Phase 1: Enable `allowJs` and Coexist

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "outDir": "./dist"
  }
}
```

JavaScript files compile through TypeScript without type-checking. Migrate files one at a time.

### Phase 2: Add JSDoc Types to JavaScript

```javascript
/**
 * @param {string} name
 * @param {number} age
 * @returns {{ id: number, name: string, age: number }}
 */
function createUser(name, age) {
  return { id: Math.random(), name, age };
}
```

With `checkJs: true`, TypeScript reads JSDoc annotations and provides type checking without renaming files.

### Phase 3: Progressive Strict Mode

Enable strict flags one at a time:

1. `noImplicitAny` — the easiest to fix; add type annotations
2. `strictNullChecks` — the hardest; surfaces every implicit null assumption
3. `strictFunctionTypes` — catches unsafe function parameter assignments
4. `strict: true` — enables the remaining flags

### `@ts-expect-error` over `@ts-ignore`

```typescript
// @ts-expect-error TODO(TICKET-123): Fix null handling after migration
const user = legacyGetUser();
```

`@ts-expect-error` becomes an error itself when the suppression is no longer needed, preventing stale suppressions. `@ts-ignore` stays silently forever.

### Avoid `any` as a Migration Crutch

Replacing implicit JavaScript `any` with explicit TypeScript `any` provides zero safety improvement. Use specific types, `unknown`, or `Partial` to provide real type safety incrementally.

---

## 9. Performance: Type-Checking Speed

### Diagnosing Slow Type Checking

```bash
# Print compilation statistics including instantiation counts
tsc --noEmit --extendedDiagnostics

# Generate a detailed trace for analysis
tsc --noEmit --generateTrace ./trace-output

# Analyze the trace
npx @typescript/analyze-trace ./trace-output
```

A high "Instantiations" count (millions) usually points to expensive generic or conditional types.

### Common Performance Problems and Fixes

**Problem: Deep recursive conditional types over large unions**
```typescript
// Slow — each union member triggers separate evaluation
type Permissions = "read:users" | "write:users" | ... ; // 30+ members
type PermissionMap = { [K in Permissions]: boolean };     // OK
type CheckPerm<P extends Permissions> = P extends `read:${infer R}` ? R : never; // Slow with large union
```

**Fix:** Break up large unions, cap recursion with depth counters, or use `Record<string, boolean>` for large permission sets.

**Problem: Type intersections re-evaluated at every use site**
```typescript
// Slow — re-computed everywhere it's used
type SlowConfig = Base & DB & Cache & Auth & Logging;

// Fast — cached by the compiler
interface FastConfig extends Base, DB, Cache, Auth, Logging {}
```

**Problem: Expensive inferred return types**
```typescript
// Slow — TypeScript must infer the complex return type
function createService() {
  return { /* 20+ methods with complex signatures */ };
}

// Fast — explicit return type, inference skipped
function createService(): ServiceInterface {
  return { /* ... */ };
}
```

### `isolatedDeclarations` (TypeScript 5.5+)

Requires explicit types on all exported functions and variables. This enables parallel declaration file generation without cross-file type analysis:

```typescript
// Required with isolatedDeclarations
export function createUser(name: string, age: number): User {
  return { id: crypto.randomUUID(), name, age };
}
```

---

## 10. Advanced Patterns

### Type-Safe Builder Pattern

```typescript
interface BuilderState {
  host?: true;
  port?: true;
  database?: true;
}

class ConnectionBuilder<State extends BuilderState = {}> {
  private config: Record<string, unknown> = {};

  host(h: string): ConnectionBuilder<State & { host: true }> {
    this.config.host = h;
    return this as any;
  }

  port(p: number): ConnectionBuilder<State & { port: true }> {
    this.config.port = p;
    return this as any;
  }

  database(db: string): ConnectionBuilder<State & { database: true }> {
    this.config.database = db;
    return this as any;
  }

  // build() is only callable when all required fields are set
  build(
    this: ConnectionBuilder<{ host: true; port: true; database: true }>,
  ): Connection {
    return new Connection(this.config);
  }
}

new ConnectionBuilder()
  .host("localhost")
  .port(5432)
  .database("mydb")
  .build(); // OK

// new ConnectionBuilder()
//   .host("localhost")
//   .build(); // Error — port and database not set
```

### Type-Safe State Machine

```typescript
type OrderState = "draft" | "submitted" | "paid" | "shipped" | "delivered";

type TransitionMap = {
  draft: "submitted";
  submitted: "paid";
  paid: "shipped";
  shipped: "delivered";
  delivered: never; // Terminal state — no valid transitions
};

class Order<S extends OrderState> {
  constructor(
    public readonly state: S,
    public readonly data: OrderData,
  ) {}

  transition<Next extends TransitionMap[S]>(
    next: Next,
  ): Order<Next> {
    return new Order(next, this.data);
  }
}

const order = new Order("draft", data)
  .transition("submitted")
  .transition("paid")
  .transition("shipped")
  .transition("delivered");

// order.transition("draft"); // Error — no valid transitions from "delivered"
```

### Type-Safe Dependency Injection

```typescript
interface ServiceMap {
  logger: { log(msg: string): void };
  db: { query(sql: string): Promise<unknown[]> };
  cache: { get(key: string): unknown; set(key: string, value: unknown): void };
}

class Container {
  private services = new Map<string, unknown>();

  register<K extends keyof ServiceMap>(key: K, service: ServiceMap[K]): void {
    this.services.set(key, service);
  }

  resolve<K extends keyof ServiceMap>(key: K): ServiceMap[K] {
    const service = this.services.get(key);
    if (!service) throw new Error(`Service ${key} not registered`);
    return service as ServiceMap[K];
  }
}

const container = new Container();
container.register("logger", { log: console.log });
const logger = container.resolve("logger");
// logger is typed as { log(msg: string): void } — no type assertions needed
```

### Opaque Money Type

```typescript
declare const currencyBrand: unique symbol;

type Money<Currency extends string> = {
  readonly amount: number;
  readonly currency: Currency;
  readonly [currencyBrand]: Currency;
};

function money<C extends string>(amount: number, currency: C): Money<C> {
  return { amount, currency } as Money<C>;
}

function add<C extends string>(a: Money<C>, b: Money<C>): Money<C> {
  return money(a.amount + b.amount, a.currency);
}

const usd = money(10, "USD");
const eur = money(20, "EUR");

add(usd, usd); // OK — both are Money<"USD">
// add(usd, eur); // Error — Money<"USD"> is not Money<"EUR">
```

---

## 11. Recommended Resources

- **TypeScript Performance Wiki** — https://github.com/microsoft/TypeScript/wiki/Performance
- **Matt Pocock** — Total TypeScript (totaltypescript.com)
- **Type Challenges** — https://github.com/type-challenges/type-challenges
- **TypeScript Playground** — https://www.typescriptlang.org/play
- **`@typescript/analyze-trace`** — https://github.com/nicolo-ribaudo/analyzer-trace

---

## Summary

You now understand advanced TypeScript patterns for production codebases:

- **Template literal types** — string pattern types, route parsing, getter/setter generation
- **Type-level programming** — recursive types, tuple manipulation, type-level arithmetic, dot-notation paths
- **Branded/nominal types** — phantom brands, Zod integration, opaque monetary types
- **Variance** — covariance, contravariance, invariance, explicit `in`/`out` annotations, method vs property syntax
- **TC39 decorators** — the standard decorator API replacing legacy `experimentalDecorators`
- **`const` type parameters and `using` declarations** — TypeScript 5.x features
- **Monorepo configuration** — project references, `composite`, `tsc --build`, `declarationMap`
- **Migration strategies** — progressive strict mode, `@ts-expect-error`, JSDoc bridge
- **Performance** — `--generateTrace`, `--extendedDiagnostics`, interface vs intersection, `isolatedDeclarations`
- **Advanced patterns** — type-safe builders, state machines, dependency injection, opaque types

## Next Steps

This is the final level of the TypeScript path. Consider exploring:
- Role-specific learning tracks on the platform
- Contributing to open-source TypeScript projects
- Building type-safe libraries with advanced generic patterns
- TypeScript type challenges (type-challenges on GitHub)
