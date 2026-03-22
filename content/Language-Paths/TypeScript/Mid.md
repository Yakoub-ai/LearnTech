# TypeScript -- Mid-Level Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/typescript/mid)

## Prerequisites

- Completion of the TypeScript Beginner guide or equivalent knowledge
- Comfortable with interfaces, generics, and union types
- Experience building TypeScript projects with tsconfig

## Estimated Time

45 hours

---

## 1. Advanced Generics and Constraints

At the beginner level you learned to write generic functions and interfaces. Now we go deeper: constraints, defaults, inference patterns, and real-world generic architectures.

### Constrained Generics

```typescript
// K must be a valid key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// T must have at least a toString method
function printAll<T extends { toString(): string }>(items: T[]): void {
    items.forEach(item => console.log(item.toString()));
}

// Both arguments must be objects
function merge<T extends object, U extends object>(a: T, b: U): T & U {
    return { ...a, ...b };
}
```

### Generic Defaults

Generic type parameters can have default values, just like function default parameters:

```typescript
interface ApiResponse<T = unknown, E = Error> {
    data: T | null;
    error: E | null;
    status: number;
}

// Use without specifying T -- defaults to unknown
const response: ApiResponse = { data: null, error: new Error("fail"), status: 500 };

// Specify only T -- E defaults to Error
const userResponse: ApiResponse<User> = { data: user, error: null, status: 200 };
```

### Generic Inference Patterns

TypeScript infers generic type arguments from runtime arguments:

```typescript
function transform<T, R>(value: T, fn: (input: T) => R): R {
    return fn(value);
}

const length = transform("hello", s => s.length);
// TypeScript infers T = string, R = number

// Type-safe query builder using chained generics
class QueryBuilder<T extends object> {
    where<K extends keyof T>(field: K, value: T[K]): this {
        // T[K] ensures the value matches the field's type
        return this;
    }

    select<K extends keyof T>(...fields: K[]): QueryBuilder<Pick<T, K>> {
        return this as unknown as QueryBuilder<Pick<T, K>>;
    }
}

interface User { name: string; age: number; email: string }

new QueryBuilder<User>()
    .where("age", 30)        // OK: 30 matches number
    // .where("age", "thirty")  // Error: string is not assignable to number
    .select("name", "email");
```

### Linking Types to Runtime Values (Zod Pattern)

A powerful pattern where the runtime validator and the TypeScript type share a single source of truth:

```typescript
import { z } from "zod";

const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().positive()
});

// Derive the TypeScript type directly from the schema
type User = z.infer<typeof UserSchema>;
// { id: string; name: string; email: string; age: number }

// Generic fetch helper: pass any schema, get back the inferred type
async function fetchTyped<TSchema extends z.ZodTypeAny>(
    url: string, schema: TSchema
): Promise<z.infer<TSchema>> {
    const res = await fetch(url);
    return schema.parse(await res.json());
}

const user = await fetchTyped("/api/users/1", UserSchema);
// user is typed as User -- no type argument needed
```

---

## 2. Utility Types

TypeScript ships with built-in utility types that transform existing types. These are essential tools you will use daily.

### Partial, Required, Readonly

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: "admin" | "user";
}

// All properties become optional
type UpdatePayload = Partial<User>;

// All optional properties become required
type StrictConfig = Required<Config>;

// All properties become readonly
type FrozenUser = Readonly<User>;
```

**Common pitfall:** `Partial<T>` is shallow -- it only makes top-level properties optional. Nested objects remain fully required. For deeply optional types, you need a custom `DeepPartial<T>`.

### Pick, Omit, Record

```typescript
type UserPreview = Pick<User, "id" | "name">;
type CreatePayload = Omit<User, "id">;
type StatusMessages = Record<"success" | "error" | "loading", string>;

// Compose utility types
type PublicProfile = Readonly<Pick<User, "name" | "role">>;
```

**Caution:** `Omit` does not verify the key exists -- `Omit<User, "nonexistent">` compiles without error.

### Exclude, Extract, NonNullable

```typescript
type AllStatuses = "pending" | "active" | "inactive" | "deleted";
type ActiveStatuses = Exclude<AllStatuses, "deleted" | "inactive">;
// "pending" | "active"

type OnlyStrOrNum = Extract<string | number | boolean, string | number>;
// string | number

type DefiniteString = NonNullable<string | null | undefined>;
// string
```

### ReturnType, Parameters, Awaited

```typescript
function createUser(name: string, age: number) {
    return { id: Math.random(), name, age, createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUser>;
// { id: number; name: string; age: number; createdAt: Date }

type CreateParams = Parameters<typeof createUser>;
// [string, number]

type Resolved = Awaited<Promise<Promise<string>>>;
// string -- recursively unwraps all Promise layers
```

### NoInfer (TypeScript 5.4+)

Prevents a type parameter from being inferred from a specific argument:

```typescript
function createFSM<S extends string>(config: {
    initial: NoInfer<S>;
    states: S[];
}) { return config; }

// S is inferred only from states array, then initial is checked against it
createFSM({ initial: "idle", states: ["idle", "loading", "done"] }); // OK
// createFSM({ initial: "invalid", states: ["idle", "loading", "done"] }); // Error
```

---

## 3. The `satisfies` Operator (TypeScript 5.0+)

The `satisfies` operator validates that a value matches a type **without widening it**:

```typescript
interface ColorConfig {
    primary: string;
    secondary: string;
    accent: string;
}

// With type annotation: value is widened
const colors1: ColorConfig = { primary: "#ff0000", secondary: "#00ff00", accent: "#0000ff" };
// colors1.primary is string

// With satisfies: validated BUT retains literal types
const colors2 = {
    primary: "#ff0000",
    secondary: "#00ff00",
    accent: "#0000ff"
} satisfies ColorConfig;
// colors2.primary is "#ff0000"

// Combine with as const for readonly + validated
const colors3 = {
    primary: "#ff0000",
    secondary: "#00ff00",
    accent: "#0000ff"
} as const satisfies ColorConfig;
```

### Practical Uses

```typescript
type Theme = "light" | "dark" | "system";

// Ensures all keys are present -- missing one is a compile error
const themeLabels = {
    light: "Light Mode",
    dark: "Dark Mode",
    system: "System Default"
} satisfies Record<Theme, string>;

// Route definitions with precise method types
type Route = { path: string; method: "GET" | "POST" | "PUT" | "DELETE" };
const routes = {
    getUser: { path: "/users/:id", method: "GET" },
    createUser: { path: "/users", method: "POST" }
} satisfies Record<string, Route>;
// routes.getUser.method is "GET", not just string
```

---

## 4. Mapped Types and Conditional Types

### Mapped Types

Mapped types iterate over keys to transform an object type:

```typescript
// Re-implementing Partial
type MyPartial<T> = { [K in keyof T]?: T[K] };

// Make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Key remapping with template literals
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
// Getters<{ name: string; age: number }>
// = { getName: () => string; getAge: () => number }

// Filter keys by value type
type OnlyStringProperties<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Modifier removal
type Mutable<T> = { -readonly [K in keyof T]: T[K] };  // remove readonly
type RequiredProps<T> = { [K in keyof T]-?: T[K] };     // remove optional
```

### Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

// Using infer to capture sub-types
type ElementType<T> = T extends (infer E)[] ? E : never;
type NumEl = ElementType<number[]>;  // number

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### Distribution over Unions

Conditional types **distribute** over unions by default:

```typescript
type ToArray<T> = T extends unknown ? T[] : never;
type Result = ToArray<string | number>;
// string[] | number[]  (each member evaluated separately)

// Prevent distribution by wrapping in tuple
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;
type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]  (union stays together)
```

---

## 5. Discriminated Unions and Exhaustive Checking

### Modeling State with Discriminated Unions

```typescript
type RequestState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: Error };

function renderUser(state: RequestState<User>) {
    switch (state.status) {
        case "idle":    return "Click to load";
        case "loading": return "Loading...";
        case "success": return state.data.name;  // data is available
        case "error":   return state.error.message;  // error is available
    }
}
```

### Exhaustive Checking with `assertNever`

```typescript
function assertNever(value: never): never {
    throw new Error(`Unhandled: ${JSON.stringify(value)}`);
}

type PaymentMethod =
    | { type: "credit_card"; cardNumber: string }
    | { type: "bank_transfer"; iban: string }
    | { type: "paypal"; email: string };

function processPayment(method: PaymentMethod): string {
    switch (method.type) {
        case "credit_card":   return `Card: ${method.cardNumber}`;
        case "bank_transfer": return `IBAN: ${method.iban}`;
        case "paypal":        return `PayPal: ${method.email}`;
        default: return assertNever(method);
        // If a new variant is added and not handled,
        // TypeScript errors because method is not 'never'
    }
}
```

**Why discriminated unions beat flat objects:** With `{ data?: T; error?: Error }`, TypeScript cannot tell if `data` is available without runtime checks. With a discriminated union, the compiler **guarantees** which properties exist after checking the discriminant.

---

## 6. Strict Mode and Compiler Flags

### Beyond `strict: true`

These flags are not included in `strict` but are highly recommended:

| Flag | Effect |
|---|---|
| `noUncheckedIndexedAccess` | `arr[0]` returns `T \| undefined` instead of `T` |
| `verbatimModuleSyntax` | Requires `import type` for type-only imports |
| `exactOptionalPropertyTypes` | Distinguishes absent property from `undefined` |
| `noImplicitReturns` | Errors on code paths that don't return a value |
| `noFallthroughCasesInSwitch` | Errors on switch cases without `break` or `return` |

### `verbatimModuleSyntax` (TS 5.0+)

```typescript
// With verbatimModuleSyntax, type-only imports must use import type
import type { User } from "./types";    // erased at compile time
import { createUser } from "./factory"; // kept at runtime
```

### `exactOptionalPropertyTypes`

```typescript
interface Theme {
    color?: "light" | "dark";
}

// Without exactOptionalPropertyTypes:
const t: Theme = { color: undefined }; // OK

// With exactOptionalPropertyTypes:
const t: Theme = { color: undefined }; // Error!
// The property must be absent or "light" | "dark", not undefined
```

---

## 7. Declaration Files and Module Augmentation

### Declaration Files (`.d.ts`)

Declaration files describe the shape of JavaScript code without providing implementations:

```typescript
// env.d.ts -- tell TypeScript about non-JS imports
declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}
```

### Module Augmentation

Extend types from third-party libraries without modifying their source:

```typescript
// express-augment.d.ts
import "express";

declare module "express" {
    interface Request {
        userId?: string;
        sessionToken?: string;
    }
}
```

**Critical rule:** The file must `import` from the module being augmented. Without the import, TypeScript treats it as a new ambient module that **replaces** the existing types.

### Global Augmentation

```typescript
// A file WITH import/export is a module -- needs declare global
export {};  // makes this a module

declare global {
    interface Window {
        analytics: { track(event: string): void };
    }
}
```

A file **without** any `import`/`export` is an ambient script -- its declarations are global automatically.

---

## 8. Testing Typed Code

### Type-Level Tests with `expect-type`

```typescript
import { expectTypeOf } from "expect-type";

// These assertions run at compile time, not runtime
expectTypeOf<Partial<User>>().not.toEqualTypeOf<User>();
expectTypeOf(add).returns.toBeNumber();
expectTypeOf<ReturnType<typeof createUser>>().toHaveProperty("id");
```

### Typed Mock Factories

```typescript
interface UserService {
    getUser(id: string): Promise<User>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
}

function createMockUserService(
    overrides: Partial<UserService> = {}
): UserService {
    return {
        getUser: async () => ({ id: "1", name: "Test", email: "t@t.com", age: 25, role: "user" }),
        updateUser: async (_, data) => ({ id: "1", name: "Test", ...data } as User),
        deleteUser: async () => {},
        ...overrides
    };
}

// Tests override only what they need
const mock = createMockUserService({
    getUser: async () => ({ id: "2", name: "Custom", email: "c@c.com", age: 30, role: "admin" })
});
```

### Using `satisfies` for Test Fixtures

```typescript
const testUser = {
    id: "user-123",
    name: "Test User",
    email: "test@example.com",
    role: "admin"
} satisfies User;
// testUser.role is "admin" (literal), not string -- useful in assertions
```

---

## 9. React + TypeScript Patterns

### Typed Component Props

```typescript
interface ButtonProps {
    label: string;
    variant: "primary" | "secondary" | "danger";
    disabled?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ label, variant, disabled = false, onClick }: ButtonProps) {
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
const [count, setCount] = useState(0);  // inferred as number

const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    // TypeScript knows user might be null
    if (user) {
        document.title = user.name;
    }
}, [user]);
```

### Typed Context

```typescript
interface AuthContext {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthCtx = createContext<AuthContext | null>(null);

function useAuth(): AuthContext {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
```

### Generic Components

```typescript
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
    return <ul>{items.map(item => <li key={keyExtractor(item)}>{renderItem(item)}</li>)}</ul>;
}

// Usage -- T is inferred from items
<List items={users} renderItem={u => u.name} keyExtractor={u => u.id} />
```

---

## 10. Recommended Resources

- **Total TypeScript** by Matt Pocock -- https://www.totaltypescript.com/
- **TypeScript Deep Dive** by Basarat -- https://basarat.gitbook.io/typescript/
- **Type Challenges** -- https://github.com/type-challenges/type-challenges
- **Jack Herrington** -- Advanced TypeScript patterns -- https://www.youtube.com/@jherr

---

## Summary

You now understand intermediate TypeScript patterns:

- **Advanced generics** -- constraints, defaults, inference chains, Zod integration
- **Utility types** -- Partial, Required, Pick, Omit, Record, Exclude, Extract, ReturnType, Parameters, Awaited, NoInfer
- **`satisfies` operator** -- type-safe defaults without widening
- **Mapped and conditional types** -- key remapping, `infer`, distribution
- **Discriminated unions** -- exhaustive checking with `assertNever`
- **Compiler flags** -- `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`
- **Declaration files** -- `.d.ts`, module augmentation, global augmentation
- **Testing typed code** -- `expect-type`, typed mocks, `satisfies` fixtures
- **React + TypeScript** -- typed props, hooks, context, generic components

---

## Next Steps

After completing this level, proceed to [TypeScript Senior](../TypeScript/Senior.md).
