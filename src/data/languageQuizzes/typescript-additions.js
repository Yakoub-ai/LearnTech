// TypeScript quiz additions — 3 questions per level
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
],
};
