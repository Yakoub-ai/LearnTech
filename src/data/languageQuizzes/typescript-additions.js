// TypeScript quiz additions — 11 questions per level
// These supplement the main languageQuizzes.js entries for 'typescript'
export const additions = {
  beginner: [
  {
    question: 'What is the key difference between the `any` and `unknown` types in TypeScript?',
    options: [
      '`any` and `unknown` are identical — both disable type checking',
      '`unknown` requires you to narrow the type before using it; `any` skips all type checks',
      '`unknown` is only valid for function parameters; `any` works everywhere',
      '`any` is for primitive types; `unknown` is for object types',
    ],
    correctIndex: 1,
    explanation:
      '`unknown` is the type-safe counterpart to `any`. You must narrow an `unknown` value (with typeof, instanceof, or a type guard) before calling methods or accessing properties on it. `any` skips all checking entirely, which hides bugs.',
  },
  {
    question:
      'A team debates whether to use `enum Direction { Up, Down, Left, Right }` or a plain object with `as const`. Which statement best describes the trade-off?',
    options: [
      'Enums are always preferred because they are more readable and produce cleaner JavaScript output',
      'The `as const` object pattern is identical to an enum at runtime',
      'Numeric enums compile to a reverse-mapped object (e.g., both `Direction.Up === 0` and `Direction[0] === "Up"`), which can cause unexpected behavior with `Object.values()`; `as const` objects produce exactly what you write',
      '`const enum` and `as const` are the same thing — both are erased at compile time',
    ],
    correctIndex: 2,
    explanation:
      'Numeric TypeScript enums generate a reverse mapping at runtime, so `Object.values(Direction)` returns both the numeric values and the string names. A POJO with `as const` produces exactly the object you wrote — no surprises, no bloat, and it works with every modern bundler.',
  },
  {
    question: 'Given `const config = { retries: 3, timeout: 5000 } as const`, what is the type of `config.retries`?',
    options: ['number', '3', 'readonly number', 'const number'],
    correctIndex: 1,
    explanation:
      '`as const` applies a "const assertion" that narrows every value to its literal type and marks every property as `readonly`. So `config.retries` has type `3` (the literal number three), not the wider `number` type.',
  },
  {
    question: 'What does the `readonly` modifier do when applied to an array, e.g. `readonly string[]`?',
    options: [
      'It prevents the array variable from being reassigned to a different array',
      'It prevents mutation methods like push, pop, and splice from being called on the array',
      'It deep-freezes the array so no element can be changed at runtime',
      'It is identical to using `const` for the array variable',
    ],
    correctIndex: 1,
    explanation:
      'A `readonly string[]` (or equivalently `ReadonlyArray<string>`) removes mutating methods such as push, pop, and splice from the type, preventing accidental mutation. Note that `const` prevents reassignment of the variable but does not prevent mutation of the array contents.',
  },
  {
    question: 'What is a tuple type in TypeScript?',
    options: [
      'A special object type that can only have two properties',
      'An array type with a fixed number of elements where each position has a known type',
      'A union type that combines exactly two types',
      'An ordered set of key-value pairs similar to a Map',
    ],
    correctIndex: 1,
    explanation:
      'A tuple is typed as, for example, `[string, number]`, which means an array with exactly a string at index 0 and a number at index 1. This is useful for things like coordinate pairs or the return value of `useState` in React.',
  },
  {
    question: 'Which TypeScript operator lets you narrow a type inside an `if` block using a runtime check on primitive types?',
    options: [
      'The `is` keyword',
      'The `typeof` operator',
      'The `keyof` operator',
      'The `infer` keyword',
    ],
    correctIndex: 1,
    explanation:
      '`typeof` checks the runtime kind of a value (e.g. `"string"`, `"number"`, `"boolean"`). When used inside an `if` statement, TypeScript narrows the type of the variable in that branch, so you can safely call string methods after `if (typeof x === "string")`.',
  },
  {
    question: 'What is a union type in TypeScript?',
    options: [
      'A type that must satisfy two interfaces at the same time',
      'A type that can be one of several specified types, written with `|`',
      'A type that merges all properties from two object types',
      'A database join operation performed on TypeScript interfaces',
    ],
    correctIndex: 1,
    explanation:
      'A union type like `string | number` means a value can be either a `string` or a `number`. TypeScript will only let you use operations that are valid for all members of the union until you narrow it down with a type guard.',
  },
  {
    question: 'What does enabling `"strict": true` in `tsconfig.json` do?',
    options: [
      'It prevents the use of `any` entirely and throws a compiler error if `any` appears anywhere',
      'It enables a group of strictness flags including `strictNullChecks`, `strictFunctionTypes`, and `noImplicitAny`',
      'It forces all functions to have explicit return type annotations',
      'It makes TypeScript error on all ES2015+ syntax to ensure broad browser compatibility',
    ],
    correctIndex: 1,
    explanation:
      '`"strict": true` is a shorthand that enables several flags at once, including `strictNullChecks` (no implicit `null`/`undefined`), `noImplicitAny` (no implicit `any`), and `strictFunctionTypes`. This catches the most common categories of bugs and is the recommended default for new projects.',
  },
  {
    question: 'What is the difference between a type assertion (`value as SomeType`) and a type guard?',
    options: [
      'Type assertions are checked at runtime; type guards are only compile-time hints',
      'A type assertion tells the compiler "trust me, this is SomeType" with no runtime check; a type guard actually verifies the type at runtime before narrowing',
      'Type assertions work only on primitive types; type guards work only on objects',
      'They are interchangeable — both produce the same compiled JavaScript output',
    ],
    correctIndex: 1,
    explanation:
      'A type assertion (`as SomeType`) is purely a compile-time instruction to the TypeScript checker — it does nothing at runtime and will not catch wrong types. A type guard (such as a `typeof` check or an `instanceof` check) performs an actual runtime test and causes TypeScript to narrow the type safely within that branch.',
  },
  {
    question: 'What is optional chaining (`?.`) useful for in TypeScript?',
    options: [
      'It makes a property optional in an interface definition',
      'It short-circuits property access or method calls and returns `undefined` if the left-hand side is `null` or `undefined`, avoiding a runtime error',
      'It allows calling a function only if it returns a truthy value',
      'It is TypeScript-only syntax that is removed after compilation and replaced with a `try/catch`',
    ],
    correctIndex: 1,
    explanation:
      'Optional chaining (`?.`) lets you safely access deeply nested properties without manually checking each level for `null` or `undefined`. For example, `user?.address?.city` returns `undefined` instead of throwing if `user` or `address` is nullish. TypeScript understands this pattern and narrows types accordingly.',
  },
  {
    question: 'What is the `never` type used for in TypeScript?',
    options: [
      'It represents a value that is always `undefined`',
      'It represents a value that can never occur, useful for exhaustiveness checks and functions that always throw or never return',
      'It is an alias for `void` and is used for functions with no return value',
      'It marks a type as deprecated so the compiler warns when it is used',
    ],
    correctIndex: 1,
    explanation:
      '`never` is the bottom type — a value of type `never` can never actually exist. It appears as the return type of functions that always throw, in unreachable code, and in exhaustiveness checks for discriminated unions where every case has been handled.',
  },
],
  mid: [
  {
    question:
      'You have `interface ApiResponse<T = unknown, E = Error>`. What does the `= unknown` part do?',
    options: [
      'It makes the `T` parameter required and defaults it to `unknown` if a wrong type is passed',
      'It provides a default type argument so `ApiResponse` can be used without specifying `T`, in which case `T` is `unknown`',
      'It forces all usages of `ApiResponse` to use `unknown` as the data type',
      'It is equivalent to `ApiResponse<any>` and disables type checking for the data field',
    ],
    correctIndex: 1,
    explanation:
      'Default type parameters work like default function parameters. Writing `ApiResponse` without a type argument is the same as writing `ApiResponse<unknown, Error>`. This makes the generic convenient to use when the exact type is not yet known, while still being safer than `any`.',
  },
  {
    question:
      'What does `type NewUser = ReturnType<typeof createUser>` do, and why is it useful?',
    options: [
      'It calls `createUser()` at compile time and stores the result in a type',
      'It extracts the return type of the `createUser` function into a reusable type alias, so the type stays in sync automatically if the function signature changes',
      'It creates a new function type that matches `createUser`\'s signature',
      'It is identical to writing `type NewUser = Parameters<typeof createUser>[0]`',
    ],
    correctIndex: 1,
    explanation:
      '`ReturnType<T>` is a built-in conditional utility type that extracts the return type of a function type. Using `typeof createUser` first converts the function value to its type. This approach keeps the type definition DRY — if `createUser` is updated, `NewUser` automatically reflects the change without any manual edits.',
  },
  {
    question:
      'You import Zod and write: `const UserSchema = z.object({ name: z.string(), age: z.number() }); type User = z.infer<typeof UserSchema>;`. What is the main advantage of this approach over defining the `User` interface separately?',
    options: [
      'Zod schemas are faster to type-check than TypeScript interfaces',
      'The `User` type is automatically inferred from the schema — the runtime validator and the TypeScript type share a single source of truth, eliminating duplication',
      'It allows `User` to be used as a generic constraint without any type arguments',
      'Zod schemas generate declaration files automatically, which speeds up build times',
    ],
    correctIndex: 1,
    explanation:
      '`z.infer<typeof UserSchema>` derives the TypeScript type directly from the Zod schema. This means you define your data shape once (in the schema), and the type follows automatically. If you update the schema, the type updates too — no risk of the two falling out of sync.',
  },
  {
    question: 'What does `Partial<User>` produce if `User` is `{ name: string; age: number }`?',
    options: [
      '`{ name?: string | undefined; age?: number | undefined }` — all properties become optional',
      '`{ name: string | null; age: number | null }` — all properties become nullable',
      '`{ name: string } | { age: number }` — a union of each property individually',
      '`{}` — an empty object type, because Partial removes all required properties',
    ],
    correctIndex: 0,
    explanation:
      '`Partial<T>` maps over every property of `T` and makes it optional (`?`). This is useful for update/patch payloads where you only want to send the fields that changed, without needing to provide all required fields.',
  },
  {
    question: 'What is a type predicate in TypeScript?',
    options: [
      'A conditional expression checked at compile time, similar to a ternary in a type position',
      'A function whose return type is written as `paramName is SomeType`, telling TypeScript to narrow the parameter\'s type to `SomeType` when the function returns `true`',
      'A decorator that validates that a class implements a given interface',
      'A special comment syntax that asserts a variable is of a certain type',
    ],
    correctIndex: 1,
    explanation:
      'A type predicate has the form `function isString(x: unknown): x is string { ... }`. When the function returns `true`, TypeScript narrows the type of `x` to `string` in the calling scope. This lets you encapsulate complex type-checking logic and reuse it across the codebase.',
  },
  {
    question: 'What does the `keyof` operator produce?',
    options: [
      'An array of the property names of a type at runtime',
      'A union type of the literal property name types of an object type',
      'A `Record` type mapping each property key to `boolean`',
      'The number of properties in a type',
    ],
    correctIndex: 1,
    explanation:
      '`keyof T` produces a union of the string (or number/symbol) literal types representing the keys of `T`. For example, `keyof { name: string; age: number }` is `"name" | "age"`. This is the foundation for many generic utility types like `Pick` and `Record`.',
  },
  {
    question: 'What does `Pick<User, "name" | "email">` produce?',
    options: [
      'A type that removes `name` and `email` from `User`, keeping everything else',
      'A type that contains only the `name` and `email` properties from `User`',
      'A runtime function that extracts those two fields from a `User` object',
      'A union type `User["name"] | User["email"]`',
    ],
    correctIndex: 1,
    explanation:
      '`Pick<T, K>` creates a new type by selecting only the keys listed in `K` from `T`. It is the complement of `Omit`. Use `Pick` when you want to explicitly allow only a subset of properties, for example when building a safe view model or a DTO.',
  },
  {
    question: 'What is declaration merging with `interface` in TypeScript?',
    options: [
      'Combining two interfaces with `&` to create an intersection type',
      'The ability to declare the same interface name multiple times and have TypeScript automatically merge all declarations into one combined interface',
      'Extending a third-party interface definition by rewriting it locally in a new file',
      'Using `implements` to merge the methods of two parent interfaces into a class',
    ],
    correctIndex: 1,
    explanation:
      'When you declare an `interface` with the same name in the same scope (or in an ambient declaration file), TypeScript merges all declarations into a single interface. This is how libraries like Express let you augment `Request` with custom properties — you add a new declaration in a `.d.ts` file and the two merge automatically.',
  },
  {
    question: 'You write `function identity<T extends { length: number }>(arg: T): T`. What does `extends { length: number }` do here?',
    options: [
      'It restricts `T` so it can only be `string` or `Array`',
      'It is a generic constraint that requires whatever type is passed for `T` to have at least a `length` property of type `number`',
      'It makes `T` inherit all methods from the `{ length: number }` type',
      'It tells TypeScript to default `T` to `{ length: number }` when no type argument is provided',
    ],
    correctIndex: 1,
    explanation:
      'Generic constraints with `extends` limit the set of types that can be used as the type argument. Here, any type that has a numeric `length` property (arrays, strings, typed arrays, etc.) is acceptable, but plain numbers or objects without `length` are not. This lets the function safely access `arg.length` inside its body.',
  },
  {
    question: 'What is the purpose of an index signature like `{ [key: string]: number }` in TypeScript?',
    options: [
      'It declares a type that can only be used as a dictionary key, not as a value',
      'It describes an object with an open-ended set of string keys whose values are all `number`',
      'It is required before you can use bracket notation (`obj["key"]`) on any TypeScript object',
      'It prevents accessing the object with dot notation to enforce consistent key access',
    ],
    correctIndex: 1,
    explanation:
      'An index signature says "this object may have any number of string keys, and every value must be a `number`". It is useful for typed dictionaries and maps. Note that it also affects named properties on the same interface — if you add `name: string`, TypeScript will error because `string` is not assignable to `number`.',
  },
  {
    question: 'What does `typeof` in a type position do, as in `type Config = typeof defaultConfig`?',
    options: [
      'It evaluates `defaultConfig` at runtime and converts the result into a type',
      'It extracts the TypeScript type of a variable or value, allowing you to use it as a type annotation elsewhere',
      'It is identical to using the `ReturnType` utility type',
      'It checks whether `defaultConfig` is `undefined` and returns `never` if so',
    ],
    correctIndex: 1,
    explanation:
      'In a type position, `typeof someValue` queries the type of the variable from the type system. This avoids duplicating the type — if `defaultConfig` already has an inferred type, `typeof defaultConfig` captures it exactly. It is different from the runtime `typeof` operator, which returns a string like `"object"`.',
  },
  {
    question: 'What is a basic conditional type in TypeScript, such as `T extends string ? "yes" : "no"`?',
    options: [
      'A runtime ternary that picks a value based on the JavaScript type of `T`',
      'A type-level ternary that resolves to `"yes"` when `T` is assignable to `string`, and `"no"` otherwise',
      'A shorthand for writing an overloaded function with two return types',
      'A way to produce a compile error when `T` is not `string`',
    ],
    correctIndex: 1,
    explanation:
      'Conditional types (`T extends U ? X : Y`) let you express type logic similar to ternary expressions, but entirely at the type level. When `T` is assignable to `U`, the whole type resolves to `X`; otherwise it resolves to `Y`. Many built-in utility types like `NonNullable` and `ReturnType` are implemented with conditional types.',
  },
],
  senior: [
  {
    question:
      'You define `type Brand<T, B extends string> = T & { readonly [brand]: B }` where `brand` is a `unique symbol`. What class of runtime bugs does this pattern prevent?',
    options: [
      'It prevents `null` and `undefined` from being assigned to branded values',
      'It prevents structurally identical primitive types (e.g., `UserId` and `ProductId`, both `number`) from being used interchangeably — enforcing nominal typing at compile time',
      'It prevents branded values from being serialized to JSON, which protects sensitive data',
      'It prevents the TypeScript compiler from widening literal types to their base types',
    ],
    correctIndex: 1,
    explanation:
      'TypeScript normally uses structural typing, so `UserId = number` and `ProductId = number` are identical and can be swapped. Branded types inject a unique phantom property (using `unique symbol` so no two brands share the same key) that makes `UserId` and `ProductId` structurally distinct — even though both hold a plain `number` at runtime. This catches a whole class of ID-confusion bugs at compile time with zero runtime overhead.',
  },
  {
    question:
      'In a TypeScript monorepo using project references, what is the purpose of `"composite": true` in each package\'s `tsconfig.json`?',
    options: [
      'It enables multiple tsconfig files to be merged together into a single configuration',
      'It tells the TypeScript compiler that this project can be referenced by other projects, and it requires `declaration: true` so that .d.ts files are emitted for downstream packages to consume without re-checking the source',
      'It enables the `--build` flag, which is otherwise unavailable in regular TypeScript projects',
      'It activates incremental compilation caching for the entire monorepo',
    ],
    correctIndex: 1,
    explanation:
      '`composite: true` marks a project as a valid reference target. It enforces that `declaration: true` is set (so .d.ts files are produced) and that `rootDir` is explicitly defined. Downstream packages import from those .d.ts files rather than re-type-checking all source files, which is what makes monorepo builds fast.',
  },
  {
    question:
      'You notice that `tsc --noEmit --extendedDiagnostics` reports a very high "Instantiations" count. Which of the following is the most likely cause and the correct fix?',
    options: [
      'Too many files in `include` — fix by reducing the number of source files',
      'Using `interface extends` instead of type intersections — fix by switching to `&` for all type composition',
      'A deeply recursive conditional or mapped type being evaluated against a large union — fix by capping recursion depth, breaking up the union, or replacing with an interface where possible',
      'Enabling `strict: true` — fix by disabling `strictNullChecks` to reduce instantiation count',
    ],
    correctIndex: 2,
    explanation:
      'High instantiation counts typically stem from conditional or mapped types being evaluated for every member of a large union, or from unbounded recursive type aliases. Solutions include bounding recursion with a depth counter tuple, splitting large unions, and preferring `interface extends` over type intersections — the latter is processed more efficiently by the checker.',
  },
  {
    question:
      'What problem does the `satisfies` operator (introduced in TypeScript 4.9) solve that a direct type annotation does not?',
    options: [
      'It allows assigning `null` to a variable without enabling `strictNullChecks`',
      'It validates that an expression matches a type while still inferring the most specific (narrowest) type for the variable, instead of widening it to the annotated type',
      'It is a runtime assertion that throws if the value does not match the type',
      'It prevents a variable from being reassigned after its initial assignment',
    ],
    correctIndex: 1,
    explanation:
      'With a direct annotation like `const palette: Record<string, Color> = { red: [255,0,0] }`, TypeScript widens `palette.red` to `Color` and loses knowledge that it is specifically an array. With `const palette = { red: [255,0,0] } satisfies Record<string, Color>`, the type is validated against `Record<string, Color>` but `palette.red` retains its tuple/array type. You get validation without sacrificing inference.',
  },
  {
    question:
      'You have a discriminated union `type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number }`. How do you implement exhaustiveness checking so TypeScript errors if a new variant is added but not handled?',
    options: [
      'Add a `default: throw new Error()` to the switch — TypeScript infers exhaustiveness from the throw',
      'Use a `default` branch that assigns the value to a variable of type `never`: `const _exhaustive: never = shape` — TypeScript errors if `shape` can still be any type other than `never` at that point',
      'Add `| never` to the union definition, which causes a compile error when a case is unhandled',
      'Enable the `noFallthroughCasesInSwitch` compiler option, which also enforces exhaustiveness',
    ],
    correctIndex: 1,
    explanation:
      'After handling every known variant in a switch, the remaining type of the discriminant is `never`. Assigning it to `const _exhaustive: never = shape` causes a compile error the moment a new variant is added that is not handled, because TypeScript can no longer prove the value is `never`. This is the standard exhaustiveness pattern.',
  },
  {
    question:
      'What is variance in the context of TypeScript\'s type system, and why does `strictFunctionTypes` matter?',
    options: [
      'Variance describes how many type parameters a generic can accept; `strictFunctionTypes` limits this to one',
      'Variance describes how subtype relationships propagate through type constructors; `strictFunctionTypes` makes function parameter types checked contravariantly instead of bivariantly, catching unsound callback substitutions',
      'Variance is the degree of type widening applied to literals; `strictFunctionTypes` disables widening for function return types',
      'Variance is only relevant for class hierarchies; `strictFunctionTypes` has no effect on plain functions',
    ],
    correctIndex: 1,
    explanation:
      'A type constructor is covariant if it preserves the subtype order (e.g., `Array<Cat>` is a subtype of `Array<Animal>`). Function parameters are contravariant — a handler for `Animal` is safe where a handler for `Cat` is expected, not the reverse. Without `strictFunctionTypes`, TypeScript checked function parameters bivariantly (both directions), which is unsound. Enabling it catches bugs where a narrow callback type is substituted for a wider one.',
  },
  {
    question:
      'What are template literal types, and what is an advanced use case for them?',
    options: [
      'They allow JavaScript template literals to be used inside `.d.ts` files',
      'They construct new string literal types by combining other string literal types, enabling things like generating event name unions (`"on${Capitalize<EventName>}"`) or CSS property types from a set of tokens',
      'They are a runtime feature that validates string interpolation at compile time',
      'They are an alias for tagged template literals and are erased before type checking',
    ],
    correctIndex: 1,
    explanation:
      'Template literal types operate at the type level on string literals. When a type parameter is a union, the result is a union of all combinations. This enables powerful patterns such as generating all `onXxx` event handler names from a `"click" | "focus" | "blur"` union, or building a type-safe i18n key system from a nested object type.',
  },
  {
    question:
      'What is the purpose of a `.d.ts` declaration file, and when would you write one by hand?',
    options: [
      'A `.d.ts` file contains TypeScript source code that is compiled separately to allow tree-shaking',
      'A `.d.ts` file contains only type information (no runtime code) and is used to describe the types of a JavaScript module or third-party library that has no built-in TypeScript support',
      'A `.d.ts` file is automatically generated by Babel and should never be edited manually',
      'A `.d.ts` file is required for every TypeScript file so the compiler can cache its output',
    ],
    correctIndex: 1,
    explanation:
      'Declaration files describe the shape of a JavaScript module to the TypeScript compiler without containing any runnable code. You write one by hand when you are consuming a JavaScript package with no `@types` package available, or when you are publishing a library and want to ship type definitions alongside the compiled output.',
  },
  {
    question:
      'What is the difference between `moduleResolution: "node16"` and `moduleResolution: "bundler"` in TypeScript?',
    options: [
      '`node16` is for CommonJS projects; `bundler` is for ESM-only projects — they are otherwise identical',
      '`node16` enforces the full Node.js ESM resolution algorithm including file extensions in imports and `exports` map support; `bundler` is for tools like Vite/esbuild that do not require extensions and apply their own `exports` map resolution',
      '`bundler` mode disables all module resolution and delegates it entirely to the build tool, ignoring `paths` and `baseUrl`',
      '`node16` only supports CommonJS; to use ESM you must switch to `nodenext`',
    ],
    correctIndex: 1,
    explanation:
      '`node16`/`nodenext` mirrors the Node.js native ESM resolver, which requires explicit `.js` extensions in relative imports and respects `package.json` `exports` fields. `bundler` mode is designed for bundler workflows where the bundler handles extensions — it allows extension-less imports and does not enforce the full Node.js resolution rules.',
  },
  {
    question:
      'What does the `NoInfer<T>` utility type (added in TypeScript 5.4) do?',
    options: [
      'It prevents TypeScript from inferring a type for `T` and forces the caller to always provide an explicit type argument',
      'It blocks TypeScript from using a particular occurrence of `T` as an inference site, so inference is driven by other usages of the same type parameter',
      'It is an alias for `never` used to mark positions where inference would be unsafe',
      'It disables generic type inference globally for the function it is applied to',
    ],
    correctIndex: 1,
    explanation:
      'By wrapping a parameter type with `NoInfer<T>`, you tell TypeScript "do not infer `T` from this argument — only from the other places where `T` appears". The classic use case is a fallback parameter: `function withDefault<T>(values: T[], fallback: NoInfer<T>): T`. Without `NoInfer`, the fallback could widen `T`\'s inferred type; with it, `T` is inferred from `values` alone and the fallback is simply checked against that result.',
  },
  {
    question:
      'What is type-level programming in TypeScript, and what is a practical example?',
    options: [
      'Writing TypeScript that runs at compile time to generate JavaScript output, similar to macros in other languages',
      'Using recursive types, conditional types, mapped types, and template literals to encode logic entirely in the type system — such as a type-safe router that infers URL parameter types from a path string literal',
      'Writing types inside comments so they are not compiled, used for documentation purposes only',
      'Constructing types dynamically at runtime using reflection APIs',
    ],
    correctIndex: 1,
    explanation:
      'Type-level programming treats the TypeScript type system as a computation engine. A practical example is a router utility type that, given a literal type `"/users/:id/posts/:postId"`, produces `{ id: string; postId: string }` by parsing the string using template literal and conditional types. This gives full type safety on route parameters with zero runtime overhead — the computation happens entirely during type checking.',
  },
],
};
