# TypeScript — Mid-Level Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/typescript/mid)

## Prerequisites

- Completion of the TypeScript Beginner guide or equivalent knowledge
- Comfortable with interfaces, generics, and union types
- Experience building TypeScript projects with tsconfig

## Estimated Time

45 hours

---

## 1. Advanced Generics and Constraints

### Generic Constraints with `extends`

Constraints restrict what types can be passed as a type argument:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30 };
getProperty(user, "name");    // string
// getProperty(user, "invalid"); // Error: "invalid" is not a key of user

// Constrain to object types only
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}
```

### Generic Defaults

```typescript
interface ApiResponse<T = unknown, E = Error> {
  data: T | null;
  error: E | null;
  status: number;
}

// Can omit type arguments — T defaults to unknown, E defaults to Error
const response: ApiResponse = { data: null, error: new Error("fail"), status: 500 };

// Or specify just what you need
const userResponse: ApiResponse<User> = { data: user, error: null, status: 200 };
```

### Generic Inference Patterns

TypeScript infers generic type arguments from runtime arguments:

```typescript
function transform<T, R>(value: T, fn: (input: T) => R): R {
  return fn(value);
}

const length = transform("hello", (s) => s.length);
// TypeScript infers: T = string, R = number, length: number
```

### Type-Safe Query Builder

```typescript
class QueryBuilder<T extends object> {
  private conditions: string[] = [];

  where<K extends keyof T>(field: K, value: T[K]): this {
    this.conditions.push(`${String(field)} = ${String(value)}`);
    return this;
  }

  select<K extends keyof T>(...fields: K[]): QueryBuilder<Pick<T, K>> {
    return this as unknown as QueryBuilder<Pick<T, K>>;
  }

  build(): string {
    return "SELECT * FROM table WHERE " + this.conditions.join(" AND ");
  }
}

interface User { name: string; age: number; email: string }

new QueryBuilder<User>()
  .where("age", 30)        // OK — age is number
  // .where("age", "thirty") // Error — string is not assignable to number
  .build();
```

### The Zod Pattern: Single Source of Truth

```typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
});

// Derive the type from the schema — no separate type definition
type User = z.infer<typeof UserSchema>;

// Generic fetch helper: schema in, typed result out
async function fetchTyped<TSchema extends z.ZodTypeAny>(
  url: string,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  const res = await fetch(url);
  return schema.parse(await res.json());
}

const user = await fetchTyped("/api/users/1", UserSchema);
// user is typed as User — inferred from the schema argument
```

This pattern eliminates duplication: one schema handles both runtime validation and compile-time types.

---

## 2. Utility Types

TypeScript ships with built-in utility types that transform existing types.

### `Partial`, `Required`, `Readonly`

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "user" | "moderator";
}

// All properties become optional
type UpdatePayload = Partial<User>;

function updateUser(id: number, updates: Partial<User>): User {
  return { ...getUserById(id), ...updates };
}

updateUser(1, { name: "Bob" }); // Only update name

// All optional properties become required
type StrictConfig = Required<Config>;

// All properties become readonly
type FrozenUser = Readonly<User>;
```

### `Pick`, `Omit`, `Record`

```typescript
type UserPreview = Pick<User, "id" | "name" | "role">;
type CreatePayload = Omit<User, "id">;

type StatusMessages = Record<"success" | "error" | "loading", string>;
const messages: StatusMessages = {
  success: "Done",
  error: "Failed",
  loading: "Please wait...",
};
```

### `Exclude`, `Extract`, `NonNullable`

```typescript
type AllStatuses = "pending" | "active" | "inactive" | "deleted";
type ActiveStatuses = Exclude<AllStatuses, "deleted" | "inactive">;
// "pending" | "active"

type OnlyStrOrNum = Extract<string | number | boolean, string | number>;
// string | number

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string
```

### `ReturnType`, `Parameters`, `Awaited`

```typescript
function createUser(name: string, age: number) {
  return { id: Math.random(), name, age, createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUser>;
// { id: number; name: string; age: number; createdAt: Date }

type CreateUserParams = Parameters<typeof createUser>;
// [string, number]

type Resolved = Awaited<Promise<Promise<string>>>;
// string — recursively unwraps Promise layers
```

### `NoInfer` (TypeScript 5.4+)

```typescript
function createFSM<S extends string>(config: {
  initial: NoInfer<S>;
  states: S[];
}) {
  return config;
}

// S is inferred from states only; initial is checked against it
createFSM({ initial: "idle", states: ["idle", "loading", "done"] }); // OK
// createFSM({ initial: "invalid", states: ["idle", "loading", "done"] }); // Error
```

### Common Pitfalls

- `Omit` does not verify the key exists: `Omit<User, "nonexistent">` compiles fine
- `Partial` is shallow: nested objects remain fully required. For deep optionality, build a custom `DeepPartial`
- `ReturnType` requires `typeof` when used with a value: `ReturnType<typeof myFunction>`

---

## 3. The `satisfies` Operator (TypeScript 5.0+)

`satisfies` validates that a value matches a type **without widening** it:

```typescript
interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
}

// Type annotation: widens to ColorConfig
const colors1: ColorConfig = {
  primary: "#ff0000",
  secondary: "#00ff00",
  accent: "#0000ff",
};
// colors1.primary is string

// satisfies: validates AND retains literal types
const colors2 = {
  primary: "#ff0000",
  secondary: "#00ff00",
  accent: "#0000ff",
} satisfies ColorConfig;
// colors2.primary is "#ff0000"

// Combine with as const for readonly + validated
const colors3 = {
  primary: "#ff0000",
  secondary: "#00ff00",
  accent: "#0000ff",
} as const satisfies ColorConfig;
```

### Practical Uses

```typescript
// Exhaustive record validation
type Theme = "light" | "dark" | "system";

const themeLabels = {
  light: "Light Mode",
  dark: "Dark Mode",
  system: "System Default",
} satisfies Record<Theme, string>;
// Forgetting a key is a compile error

// Type-safe route definitions
type Route = { path: string; method: "GET" | "POST" | "PUT" | "DELETE" };

const routes = {
  getUser: { path: "/users/:id", method: "GET" },
  createUser: { path: "/users", method: "POST" },
} satisfies Record<string, Route>;
// routes.getUser.method is "GET", not just string
```

Use `satisfies` for configuration objects, route definitions, theme values, and test fixtures.

---

## 4. Mapped Types and Conditional Types

### Mapped Types

Mapped types iterate over keys and transform properties:

```typescript
// Re-implement Partial
type MyPartial<T> = { [K in keyof T]?: T[K] };

// Make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Key remapping with template literal types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Filter keys by value type
type OnlyStringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Remove modifiers
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type RequiredProps<T> = { [K in keyof T]-?: T[K] };
```

### Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Extract element type from an array
type ElementType<T> = T extends (infer E)[] ? E : never;
type NumEl = ElementType<number[]>; // number

// Extract return type manually
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### The `infer` Keyword

`infer` captures a sub-type from a pattern match inside a conditional type:

```typescript
// Extract the resolved type of a Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>;          // number

// Extract first element of a tuple
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type H = Head<[1, 2, 3]>; // 1
```

### Distributive vs Non-Distributive Conditional Types

```typescript
// Distributive: evaluates each union member separately
type ToArray<T> = T extends unknown ? T[] : never;
type Result1 = ToArray<string | number>; // string[] | number[]

// Non-distributive: wrap in brackets to evaluate the union as one
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;
type Result2 = ToArrayNonDist<string | number>; // (string | number)[]
```

### Recursive Conditional Types

```typescript
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;
```

---

## 5. Strict Mode and Compiler Flags

### Beyond `strict: true`

These flags are not included in `strict` but are highly recommended:

| Flag | Purpose |
|---|---|
| `noUncheckedIndexedAccess` | `arr[0]` returns `T \| undefined` instead of `T` |
| `exactOptionalPropertyTypes` | Distinguishes between absent property and `undefined` value |
| `noImplicitReturns` | Ensures every code path returns a value |
| `noFallthroughCasesInSwitch` | Prevents accidental switch fallthrough |

### `verbatimModuleSyntax` vs `isolatedModules`

```typescript
// With verbatimModuleSyntax, type-only imports MUST use import type
import type { User } from "./types";     // Correct — erased at compile time
import { UserService } from "./service"; // Correct — kept in output
```

`verbatimModuleSyntax` (TS 5.0+) replaces `isolatedModules` and goes further: it requires `import type` for all type-only imports, making it explicit to bundlers what to erase.

### `exactOptionalPropertyTypes`

```typescript
interface Config {
  theme?: "light" | "dark";
}

// Without exactOptionalPropertyTypes:
const c: Config = { theme: undefined }; // OK

// With exactOptionalPropertyTypes:
// const c: Config = { theme: undefined }; // Error!
// The property must be absent or set to "light" | "dark"
```

---

## 6. Discriminated Unions and Exhaustive Checking

### Modeling Request State

```typescript
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function renderData(state: RequestState<User[]>) {
  switch (state.status) {
    case "idle":
      return "Click to load";
    case "loading":
      return "Loading...";
    case "success":
      return state.data.map((u) => u.name).join(", ");
    case "error":
      return `Error: ${state.error.message}`;
  }
}
```

After checking `state.status === "success"`, TypeScript knows `state.data` exists. Accessing `data` on a `"loading"` state is a compile error.

### Exhaustive Checking with `assertNever`

```typescript
function assertNever(value: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(value));
}

type PaymentMethod =
  | { type: "credit_card"; cardNumber: string }
  | { type: "bank_transfer"; iban: string }
  | { type: "paypal"; email: string };

function processPayment(method: PaymentMethod) {
  switch (method.type) {
    case "credit_card":
      return chargeCard(method.cardNumber);
    case "bank_transfer":
      return initTransfer(method.iban);
    case "paypal":
      return chargePaypal(method.email);
    default:
      return assertNever(method);
      // Adding a new variant without a case triggers a compile error here
  }
}
```

### Boolean Discriminants

```typescript
type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; errors: string[] };

function handle(result: ValidationResult) {
  if (result.valid) {
    console.log(result.value);  // OK
  } else {
    console.log(result.errors); // OK
  }
}
```

---

## 7. Declaration Files and Module Augmentation

### Declaration Files (`.d.ts`)

Declaration files describe the shape of JavaScript code to TypeScript without providing implementations:

```typescript
// global.d.ts
declare const API_URL: string;

// Static asset declarations for bundlers
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}
```

### Module Augmentation

Extend third-party library types without modifying source code:

```typescript
// express-augment.d.ts
import "express"; // This import makes it an augmentation, not a replacement

declare module "express" {
  interface Request {
    userId?: string;
    sessionId?: string;
  }
}
```

Without the import, TypeScript treats the `declare module` as a new ambient module, replacing the existing types. The import establishes it as an augmentation that merges with the original.

### Global Augmentation from Modules

```typescript
// A file with import/export is a module — use declare global
import { SomeType } from "./types";

declare global {
  interface Window {
    analytics: { track(event: string): void };
  }

  // Add properties to the global scope
  var DEBUG: boolean;
}
```

A file without any `import`/`export` is a script whose declarations are global automatically.

---

## 8. Testing Typed Code

### Type-Level Testing with `expect-type`

```typescript
import { expectTypeOf } from "expect-type";

// Compile-time assertions — no runtime execution needed
expectTypeOf<Partial<User>>().not.toEqualTypeOf<User>();
expectTypeOf(add).returns.toBeNumber();
expectTypeOf<ReturnType<typeof createUser>>().toHaveProperty("id");
```

### Using `satisfies` for Test Fixtures

```typescript
const mockUser = {
  id: 1,
  name: "Test User",
  role: "admin",
} satisfies User;
// mockUser.role is "admin" (literal), not string
// Still validated against User shape
```

### Typed Mock Factories

```typescript
function createMockUserService(
  overrides: Partial<UserService> = {},
): UserService {
  return {
    getUser: async (id) => ({ id, name: "Mock", email: "mock@test.com" }),
    updateUser: async () => ({ success: true }),
    deleteUser: async () => {},
    ...overrides,
  };
}

// Tests provide only the methods they care about
const service = createMockUserService({
  getUser: async (id) => ({ id, name: "Alice", email: "alice@test.com" }),
});
```

### Assertion Functions in Tests

```typescript
function assertOk<T>(result: Result<T>): asserts result is { ok: true; value: T } {
  if (!result.ok) throw new Error("Expected ok result: " + result.error);
}

test("createUser returns a user", async () => {
  const result = await createUser("Alice", 30);
  assertOk(result);
  // After assertion, TypeScript knows result.value exists
  expect(result.value.name).toBe("Alice");
});
```

---

## 9. React + TypeScript Patterns

### Typed Component Props

```typescript
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick: () => void;
}

function Button({ label, variant = "primary", disabled, onClick }: ButtonProps) {
  return (
    <button className={variant} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
```

### Typed Hooks

```typescript
const [user, setUser] = useState<User | null>(null);
const [count, setCount] = useState(0); // Inferred as number

const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);
```

### Typed Context

```typescript
interface AuthContext {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthCtx = createContext<AuthContext | null>(null);

function useAuth(): AuthContext {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
```

### Event Handlers

```typescript
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}
```

### Children and Render Props

```typescript
interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

// Generic render prop
interface DataListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

function DataList<T>({ items, renderItem }: DataListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item, i)}</li>)}</ul>;
}
```

---

## 10. Recommended Resources

- **Matt Pocock** — Total TypeScript (totaltypescript.com)
- **TypeScript Deep Dive** — https://basarat.gitbook.io/typescript/
- **Jack Herrington** — "No BS TS" series on YouTube
- **Zod Documentation** — https://zod.dev
- **TypeScript Handbook: Utility Types** — https://www.typescriptlang.org/docs/handbook/utility-types.html

---

## Summary

You now understand intermediate TypeScript patterns:

- **Advanced generics** — constraints, defaults, inference, and the Zod single-source-of-truth pattern
- **Utility types** — `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `ReturnType`, `Parameters`, `Awaited`, `NoInfer`
- **The `satisfies` operator** — type validation without widening
- **Mapped types and conditional types** — type-level transformations, `infer`, distribution
- **Strict mode and compiler flags** — `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`
- **Discriminated unions** — modeling state, exhaustive checking with `assertNever`
- **Declaration files and module augmentation** — extending third-party types safely
- **Testing typed code** — type-level tests, `satisfies` for fixtures, typed mock factories
- **React + TypeScript** — typed props, hooks, context, and event handlers

These skills prepare you for the Senior level, where you will master template literal types, type-level programming, branded types, variance, and performance optimization.

## Next Steps

After completing this level, proceed to [TypeScript Senior](../TypeScript/Senior.md).
