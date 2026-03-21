export const topicQuizzes = {
  beginner: [
    {
      topicId: "type-annotations-primitives",
      topicTitle: "Type Annotations — Primitives",
      objectiveIndex: 0,
      questions: [
        {
          question: "What happens to TypeScript type annotations at runtime?",
          options: [
            "They are kept and used for runtime validation",
            "They are erased by the compiler and produce zero runtime overhead",
            "They are converted to JavaScript comments",
            "They throw errors if types don't match at runtime"
          ],
          correctIndex: 1,
          explanation: "TypeScript type annotations are a compile-time feature only. The TypeScript compiler erases all type information before emitting JavaScript, so annotations have zero runtime overhead."
        },
        {
          question: "Which type should you use when you genuinely don't know the type of a value, but still want type safety?",
          options: ["any", "object", "unknown", "void"],
          correctIndex: 2,
          explanation: "`unknown` is the type-safe alternative to `any`. Unlike `any`, you must narrow an `unknown` value before calling methods or accessing properties on it. `any` disables type checking entirely."
        },
        {
          question: "What is the type of `city` in `let city = 'Berlin'`?",
          options: ["'Berlin'", "string", "const string", "unknown"],
          correctIndex: 1,
          explanation: "TypeScript infers `string` for `let` declarations because the variable is mutable and could be reassigned to any string. Only `const` declarations narrow to the literal type (e.g., `'Berlin'`)."
        },
        {
          question: "Given `let coordinate: [number, number] = [40.71, -74.00]`, what makes this different from `number[]`?",
          options: [
            "Tuples use less memory than arrays",
            "Tuples enforce a fixed length and specific type at each position",
            "Tuples cannot be destructured",
            "Tuples are mutable but arrays are not"
          ],
          correctIndex: 1,
          explanation: "A tuple type enforces both the length and the type at each index. `[number, number]` must have exactly two numbers. `number[]` can have any number of elements."
        },
        {
          question: "What does TypeScript's excess property checking do?",
          options: [
            "It checks if an object has more properties than allowed at runtime",
            "It rejects object literals with properties not declared in the target type",
            "It auto-removes extra properties during compilation",
            "It warns but never errors on extra properties"
          ],
          correctIndex: 1,
          explanation: "When assigning an object literal directly to a typed variable, TypeScript rejects any properties not defined in the target type. This catches typos in property names like `{ nme: 'Alice' }` when `name` was expected."
        },
        {
          question: "Which of the following correctly declares a readonly array in TypeScript?",
          options: [
            "let scores: const number[] = [1, 2, 3]",
            "let scores: number[] = readonly [1, 2, 3]",
            "let scores: readonly number[] = [1, 2, 3]",
            "let scores: immutable number[] = [1, 2, 3]"
          ],
          correctIndex: 2,
          explanation: "The `readonly` modifier before the element type creates a readonly array. You can also use `ReadonlyArray<number>` as an alternative syntax."
        },
        {
          question: "What is the type of `mixed` in `let mixed = [1, 'two']`?",
          options: ["any[]", "(string | number)[]", "[number, string]", "unknown[]"],
          correctIndex: 1,
          explanation: "TypeScript infers the element type as the union of all element types in the array literal. Since the array contains a number and a string, the inferred type is `(string | number)[]`."
        },
        {
          question: "Which statement about index signatures is correct?",
          options: [
            "Index signatures like `{ [key: string]: number }` allow only string keys",
            "Index signatures require all keys to be known at compile time",
            "Index signatures like `{ [studentName: string]: number }` allow any string key with a number value",
            "Index signatures are only valid on class instances"
          ],
          correctIndex: 2,
          explanation: "An index signature `{ [key: string]: number }` defines a dictionary-style type where any string key maps to a number value. This is useful for dynamic data like score maps or configuration objects."
        }
      ]
    },
    {
      topicId: "interfaces-vs-type-aliases",
      topicTitle: "Interfaces vs Type Aliases",
      objectiveIndex: 1,
      questions: [
        {
          question: "Which unique capability do interfaces have that type aliases do not?",
          options: [
            "Interfaces can define union types",
            "Interfaces support declaration merging — two same-named interfaces combine",
            "Interfaces can use mapped types",
            "Interfaces can define tuple types"
          ],
          correctIndex: 1,
          explanation: "Declaration merging allows two `interface` declarations with the same name to be automatically combined. Type aliases with the same name cause a compile error. This is why you augment global types (like `Window`) with interfaces."
        },
        {
          question: "Which of the following can ONLY be expressed with a type alias, not an interface?",
          options: [
            "An object shape with optional properties",
            "A union type like `string | number`",
            "An interface that extends another interface",
            "A class implementation contract"
          ],
          correctIndex: 1,
          explanation: "Type aliases can represent unions, tuples, primitives, and computed types. Interfaces are limited to object shapes. `type ID = string | number` cannot be written as an interface."
        },
        {
          question: "What does `interface AdminUser extends User` accomplish?",
          options: [
            "It creates a new interface with all User properties plus AdminUser's own properties",
            "It makes AdminUser an alias for User",
            "It removes User's properties and replaces them with AdminUser's",
            "It creates a union of User and AdminUser"
          ],
          correctIndex: 0,
          explanation: "Interface extension creates a new interface that inherits all properties from the parent interface and adds new ones. `AdminUser` will have all properties of `User` plus any properties declared in `AdminUser`."
        },
        {
          question: "What does the `implements` keyword do when used with an interface?",
          options: [
            "It copies all interface properties into the class automatically",
            "It requires the class to provide all members defined in the interface",
            "It makes the class extend the interface at runtime",
            "It merges the interface declaration with the class"
          ],
          correctIndex: 1,
          explanation: "`implements` tells TypeScript that a class must satisfy the contract defined by an interface. The class must provide all properties and methods listed in the interface, or the compiler will error."
        },
        {
          question: "According to TypeScript best practices, when should you prefer `interface` over `type`?",
          options: [
            "Always — interfaces are strictly better than type aliases",
            "For public API shapes, class contracts, and when declaration merging is needed",
            "Only when defining primitive type aliases",
            "Only when working with React components"
          ],
          correctIndex: 1,
          explanation: "The TypeScript team recommends `interface` for public API shapes and class contracts because they support declaration merging and are more extensible. Use `type` for unions, tuples, primitives, and computed types."
        },
        {
          question: "What does `type AdminUser = User & { role: 'admin'; permissions: string[] }` create?",
          options: [
            "A union of User and the role/permissions object",
            "An intersection type combining all User properties with role and permissions",
            "A type that can be either User or the role/permissions object",
            "A mapped type of User"
          ],
          correctIndex: 1,
          explanation: "The `&` operator creates an intersection type — a type that has ALL properties from both sides. `AdminUser` will have everything from `User` plus `role` and `permissions`. Intersection combines; union (`|`) chooses one."
        }
      ]
    },
    {
      topicId: "enums-and-why-as-const-is-often-better",
      topicTitle: "Enums and Why `as const` Is Often Better",
      objectiveIndex: 2,
      questions: [
        {
          question: "What unexpected behavior does `Object.values(Direction)` exhibit when `Direction` is a numeric enum?",
          options: [
            "It returns undefined for all values",
            "It returns both the numeric values AND the string names due to reverse mapping",
            "It returns only the member names as strings",
            "It throws a runtime error"
          ],
          correctIndex: 1,
          explanation: "Numeric enums compile to an object with reverse mappings: both `Direction.Up === 0` and `Direction[0] === 'Up'`. So `Object.values(Direction)` returns `[0, 1, 2, 3, 'Up', 'Down', 'Left', 'Right']` — probably not what you want."
        },
        {
          question: "What is the primary advantage of using `as const` over the `enum` keyword?",
          options: [
            "`as const` provides better runtime performance",
            "`as const` objects are plain JavaScript with no special compilation — no reverse mapping, works with all bundlers",
            "`as const` automatically generates TypeScript types",
            "`as const` is required by the TypeScript compiler in strict mode"
          ],
          correctIndex: 1,
          explanation: "`as const` creates a plain JavaScript object frozen to literal types. It produces exactly the object you wrote with no reverse mapping bloat, and works correctly with Vite, esbuild, and other tools that require `--isolatedModules`."
        },
        {
          question: "Given `const LOG_LEVELS = { Info: 'INFO' } as const`, how do you extract a union type of the values?",
          options: [
            "type LogLevel = LOG_LEVELS[keyof LOG_LEVELS]",
            "type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS]",
            "type LogLevel = keyof typeof LOG_LEVELS",
            "type LogLevel = valueof LOG_LEVELS"
          ],
          correctIndex: 1,
          explanation: "You need `typeof LOG_LEVELS` to get the type of the object, then `[keyof typeof LOG_LEVELS]` to index into it and extract a union of all value types. The result is `'INFO'` (or a wider union for objects with multiple members)."
        },
        {
          question: "Why is `const enum` explicitly discouraged in library code?",
          options: [
            "It is not supported in TypeScript 4.0+",
            "It generates larger output than regular enums",
            "It inlines values and breaks with `--isolatedModules`, which most modern bundlers require",
            "It cannot be used with string values"
          ],
          correctIndex: 2,
          explanation: "`const enum` inlines numeric values at the call site and disappears at runtime. However, this requires cross-file analysis that tools using `--isolatedModules` (Vite, esbuild, SWC) cannot perform, causing build failures."
        },
        {
          question: "With a string enum like `enum LogLevel { Info = 'INFO' }`, can you pass the raw string `'INFO'` to a function expecting `LogLevel`?",
          options: [
            "Yes, TypeScript accepts string literals that match enum values",
            "No, you must use `LogLevel.Info` — string enums enforce nominal typing",
            "Only if you cast with `as LogLevel`",
            "Yes, but only with `strict: false`"
          ],
          correctIndex: 1,
          explanation: "String enums enforce nominal typing in TypeScript's otherwise structural system. You cannot pass `'INFO'` directly where `LogLevel` is expected — you must use `LogLevel.Info`. This is one reason the `as const` pattern is preferred: it accepts raw string literals."
        },
        {
          question: "In what scenario does using the `enum` keyword still make the most sense?",
          options: [
            "When you need the union type of enum values",
            "When using numeric bitmasks where the integer values are semantically meaningful",
            "When building React components",
            "When you want to avoid importing the object in every file"
          ],
          correctIndex: 1,
          explanation: "Numeric enums are still appropriate when the integer values themselves carry meaning, such as in bitmask flags (e.g., `Read = 1, Write = 2, Execute = 4`), or in projects with ORM/code-generation tooling that expects enum syntax."
        }
      ]
    },
    {
      topicId: "union-and-intersection-types",
      topicTitle: "Union and Intersection Types",
      objectiveIndex: 3,
      questions: [
        {
          question: "What does a union type `string | number` mean?",
          options: [
            "The value must be both a string and a number simultaneously",
            "The value can be either a string or a number",
            "The value is always converted to a string at runtime",
            "The value combines string and number properties"
          ],
          correctIndex: 1,
          explanation: "A union type `A | B` means the value can be of type A OR type B. Before using type-specific methods, you must narrow the type using `typeof`, `instanceof`, or a discriminant property."
        },
        {
          question: "What is a discriminated union?",
          options: [
            "A union type that uses `Exclude` to remove members",
            "A union of object types sharing a common literal-typed property used to narrow the type",
            "A union type that discriminates between primitives and objects",
            "A union that can only contain string literals"
          ],
          correctIndex: 1,
          explanation: "A discriminated union is a union of object types where each member shares a common property (the discriminant) with a unique literal type, like `kind: 'circle'`. TypeScript uses this to narrow the type in switch/if statements."
        },
        {
          question: "Given `type Person = HasName & HasAge & HasEmail`, what must a `Person` value contain?",
          options: [
            "At least one of: name, age, or email",
            "Either name+age or age+email",
            "All of: name, age, and email",
            "None required — it is an empty type"
          ],
          correctIndex: 2,
          explanation: "An intersection type `A & B & C` requires the value to satisfy ALL of the combined types. A `Person` must have `name` from `HasName`, `age` from `HasAge`, AND `email` from `HasEmail`."
        },
        {
          question: "Why must you narrow a union type before calling type-specific methods?",
          options: [
            "TypeScript requires explicit narrowing as a syntax rule",
            "Without narrowing, TypeScript only allows operations valid for all members of the union",
            "Narrowing improves runtime performance",
            "Union types are erased without narrowing"
          ],
          correctIndex: 1,
          explanation: "On a `string | number`, you can only call methods that exist on BOTH types. To call `.toUpperCase()` (string-only), you must first narrow to confirm it's a string. TypeScript enforces this to prevent runtime errors."
        },
        {
          question: "What is the key advantage of using string literal unions like `'pending' | 'active' | 'inactive'` over an enum?",
          options: [
            "Literal unions are faster at runtime",
            "Literal unions require less memory",
            "Literal unions are plain JavaScript — no special compilation, readable in stack traces, and accept raw strings directly",
            "Literal unions can be extended later without breaking changes"
          ],
          correctIndex: 2,
          explanation: "String literal unions compile to nothing — they're purely a TypeScript concept. The values are readable strings at runtime, they work with all tools, and callers can pass raw string literals without importing anything."
        }
      ]
    },
    {
      topicId: "generics-basics",
      topicTitle: "Generics Basics",
      objectiveIndex: 4,
      questions: [
        {
          question: "What problem do generics solve that `any` cannot?",
          options: [
            "Generics allow functions to accept multiple types",
            "Generics preserve the specific type through the function, while `any` loses type information",
            "Generics improve runtime performance",
            "Generics allow optional parameters"
          ],
          correctIndex: 1,
          explanation: "With `any`, TypeScript gives up — you lose all type information. With generics, the type flows through: `firstElement<T>(arr: T[]): T` returns the same type that was passed in, so callers get full type checking and autocomplete."
        },
        {
          question: "In `function longest<T extends { length: number }>(a: T, b: T): T`, what does `extends { length: number }` do?",
          options: [
            "It limits T to arrays only",
            "It constrains T to any type that has a `length` property",
            "It extends the T type with a length property at runtime",
            "It prevents T from being a string"
          ],
          correctIndex: 1,
          explanation: "The `extends` constraint requires the type argument to have at least a `length: number` property. This allows the function to work with both strings and arrays (which both have `.length`) while rejecting numbers or other types."
        },
        {
          question: "Given `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`, what is the return type of `getProperty(user, 'name')` when `user` has `name: string`?",
          options: ["unknown", "any", "string", "keyof T"],
          correctIndex: 2,
          explanation: "`T[K]` is an indexed access type that resolves to the type of the property `K` in `T`. If `T` is `{ name: string; age: number }` and `K` is `'name'`, then `T[K]` resolves to `string`."
        },
        {
          question: "When do you need to explicitly write a type argument like `firstElement<number>([1,2,3])`?",
          options: [
            "Always — TypeScript cannot infer generic type arguments",
            "Never — TypeScript always infers them",
            "Rarely — only when TypeScript cannot infer the type from the arguments",
            "Only when the type is a primitive"
          ],
          correctIndex: 2,
          explanation: "TypeScript infers generic type arguments from the runtime arguments in most cases. You only need to provide them explicitly when inference is ambiguous or impossible, such as when there are no runtime arguments to infer from."
        },
        {
          question: "What does `interface ApiResponse<T>` allow you to do?",
          options: [
            "Create a single fixed type for all API responses",
            "Create a family of related types where the data shape varies but the wrapper structure is consistent",
            "Validate API responses at runtime",
            "Automatically generate API endpoints"
          ],
          correctIndex: 1,
          explanation: "Generic interfaces let you parameterize part of the type. `ApiResponse<User>` and `ApiResponse<Product[]>` share the same `status`, `message`, and `timestamp` fields but have different `data` types — all from one interface definition."
        },
        {
          question: "In the `Result<T, E = Error>` type, what does `E = Error` mean?",
          options: [
            "E must always be an instance of Error",
            "E is constrained to extend Error",
            "Error is the default type for E if none is provided",
            "E and Error are the same type"
          ],
          correctIndex: 2,
          explanation: "Generic type parameters can have default values using `=`. If you write `Result<string>`, TypeScript uses `Error` for `E` automatically. This is analogous to default function parameter values."
        }
      ]
    },
    {
      topicId: "function-types-and-overloads",
      topicTitle: "Function Types and Overloads",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the difference between `void` and `never` as return types?",
          options: [
            "`void` means no return value; `never` means the function always throws or never terminates",
            "`void` and `never` are interchangeable",
            "`never` means the function returns null; `void` means it returns undefined",
            "`void` is for async functions; `never` is for sync functions"
          ],
          correctIndex: 0,
          explanation: "`void` indicates a function performs side effects and returns nothing useful (actually returns `undefined`). `never` indicates the function NEVER returns — it always throws an error or runs infinitely. `never` is also the empty type (no possible values)."
        },
        {
          question: "What is the key rule about function overload signatures in TypeScript?",
          options: [
            "The implementation signature is visible to callers and must be called directly",
            "Overload signatures are checked in order — put less specific signatures first",
            "The implementation signature is NOT visible to callers; only the overload signatures are",
            "Overloads require at least four signatures"
          ],
          correctIndex: 2,
          explanation: "When you write overloads, callers see only the overload signatures (not the implementation). The implementation signature is internal and must be compatible with all overload signatures. Overloads are matched in declaration order."
        },
        {
          question: "Why should you prefer `unknown` over `any` for parameters that accept values of uncertain type?",
          options: [
            "`unknown` is faster at runtime",
            "`unknown` forces you to check the type before using it, preventing unsafe operations",
            "`any` is deprecated in modern TypeScript",
            "`unknown` provides better autocomplete suggestions"
          ],
          correctIndex: 1,
          explanation: "`unknown` is the type-safe sibling of `any`. With `any`, TypeScript lets you call any method without checking. With `unknown`, you must narrow the type first — TypeScript enforces that you handle all possibilities before operating on the value."
        },
        {
          question: "Given the overload `function parse(input: string): number; function parse(input: number): string;`, what is the return type of `parse('42')`?",
          options: ["string | number", "string", "number", "unknown"],
          correctIndex: 2,
          explanation: "TypeScript matches the call against overload signatures in order. `parse('42')` matches `parse(input: string): number`, so the return type is `number`. This is the benefit of overloads over simple union types — the return type is correlated to the input type."
        },
        {
          question: "What does `type MathOperation = (a: number, b: number) => number` define?",
          options: [
            "A class with a math operation method",
            "A function that can only add numbers",
            "A type alias for a function signature — any function taking two numbers and returning a number",
            "An interface for a math class"
          ],
          correctIndex: 2,
          explanation: "This is a function type alias. It defines the shape of any function that accepts two `number` parameters and returns a `number`. Variables annotated with this type must be compatible functions."
        },
        {
          question: "What does `function sum(...numbers: number[]): number` demonstrate?",
          options: [
            "Named parameters in TypeScript",
            "A rest parameter that collects any number of additional arguments into an array",
            "An optional parameter",
            "A variadic generic function"
          ],
          correctIndex: 1,
          explanation: "The `...` syntax declares a rest parameter, which collects all remaining arguments into a typed array. `sum(1, 2, 3, 4, 5)` works because all extra arguments are collected into `numbers: number[]`."
        }
      ]
    },
    {
      topicId: "tsconfig-json-essentials",
      topicTitle: "tsconfig.json Essentials",
      objectiveIndex: 6,
      questions: [
        {
          question: "What does enabling `strict: true` in tsconfig.json do?",
          options: [
            "It enables only `strictNullChecks`",
            "It enables a single strict flag for null checks",
            "It enables a group of seven strict flags simultaneously, including `strictNullChecks` and `noImplicitAny`",
            "It prevents the use of `any` entirely"
          ],
          correctIndex: 2,
          explanation: "`strict: true` is shorthand for enabling seven flags at once: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictPropertyInitialization`, `strictBindCallApply`, `useUnknownInCatchVariables`, and `alwaysStrict`."
        },
        {
          question: "Which tsconfig flag makes array index access return `T | undefined` instead of just `T`?",
          options: ["strictNullChecks", "noUncheckedIndexedAccess", "strictArrayAccess", "safeIndexAccess"],
          correctIndex: 1,
          explanation: "`noUncheckedIndexedAccess` adds `undefined` to the type of any array or object index access (like `arr[0]` or `dict['key']`), because the index might be out of bounds. Known properties declared in the type remain unaffected."
        },
        {
          question: "Why is `skipLibCheck: true` commonly used in tsconfig.json?",
          options: [
            "It skips checking your own source files",
            "It skips type-checking `.d.ts` declaration files from node_modules, speeding up compilation",
            "It disables strict mode for library code",
            "It prevents TypeScript from downloading type definitions"
          ],
          correctIndex: 1,
          explanation: "`skipLibCheck: true` tells TypeScript to skip type-checking all `.d.ts` declaration files, including those in `node_modules`. This is common because third-party types can have errors or incompatibilities that aren't your responsibility to fix."
        },
        {
          question: "What is the purpose of `declaration: true` in tsconfig.json?",
          options: [
            "It enables `declare` keywords in code",
            "It generates `.d.ts` type declaration files alongside the compiled JavaScript output",
            "It requires all variables to have explicit type declarations",
            "It enables module declarations"
          ],
          correctIndex: 1,
          explanation: "`declaration: true` instructs TypeScript to emit `.d.ts` files alongside the compiled `.js` files. This is essential for library authors — consumers of your library use these `.d.ts` files for type checking without accessing your source."
        },
        {
          question: "What does the `strictNullChecks` flag prevent?",
          options: [
            "Using null in your code at all",
            "Using `null` and `undefined` where a non-nullable value is expected without explicit checking",
            "Functions from returning null",
            "Variables from being reassigned to null"
          ],
          correctIndex: 1,
          explanation: "With `strictNullChecks`, `null` and `undefined` are not assignable to other types by default. You must explicitly type a value as `string | null` if it can be null, and narrow it before use. This catches a major source of runtime errors."
        }
      ]
    },
    {
      topicId: "type-inference-and-type-narrowing",
      topicTitle: "Type Inference and Type Narrowing",
      objectiveIndex: 7,
      questions: [
        {
          question: "What is the difference between `const direction = 'north'` and `let direction = 'north'` in terms of inferred type?",
          options: [
            "Both infer `string`",
            "`const` infers the literal type `'north'`; `let` infers the wider `string` type",
            "`const` infers `string`; `let` infers `'north'`",
            "Both infer `'north'`"
          ],
          correctIndex: 1,
          explanation: "`const` variables cannot be reassigned, so TypeScript narrows to the literal type `'north'`. `let` variables can be reassigned to any string, so TypeScript widens to `string`."
        },
        {
          question: "What narrowing technique does `if ('bark' in pet)` use?",
          options: [
            "typeof narrowing",
            "instanceof narrowing",
            "in-operator narrowing (property existence check)",
            "truthiness narrowing"
          ],
          correctIndex: 2,
          explanation: "The `in` operator narrows a union type by checking if a property exists on the value. If `'bark' in pet` is true, TypeScript knows `pet` must be `Dog` (assuming only `Dog` has `bark`). This is useful when types share no common discriminant."
        },
        {
          question: "What is a type predicate, and when would you use one?",
          options: [
            "A runtime validation function — it validates data from external sources",
            "A function returning `value is SomeType` that tells TypeScript how to narrow the type based on a custom check",
            "A decorator that adds type information to a class",
            "A compiler flag that enables stricter inference"
          ],
          correctIndex: 1,
          explanation: "A type predicate is a function with a return type of `value is T` (e.g., `function isUser(x: unknown): x is User`). When it returns true, TypeScript narrows the type of `value` to `T` in the calling scope."
        },
        {
          question: "What is the JavaScript quirk that means `typeof null === 'object'`, and how does it affect narrowing?",
          options: [
            "It has no effect — TypeScript handles null separately",
            "`typeof null` returns `'object'`, so `typeof value === 'object'` does NOT filter out null — you must also check `value !== null`",
            "`typeof null` returns `'null'` in TypeScript even though it returns `'object'` in JavaScript",
            "TypeScript corrects this quirk automatically in strict mode"
          ],
          correctIndex: 1,
          explanation: "Due to a historical JavaScript bug, `typeof null === 'object'`. So when narrowing with `typeof value === 'object'`, you must also check `value !== null` to exclude null from the narrowed type, or TypeScript will include null in the result."
        },
        {
          question: "What does `function assertIsNumber(value: unknown): asserts value is number` do?",
          options: [
            "It returns true if value is a number",
            "After calling this function, TypeScript treats value as number in the subsequent code",
            "It converts value to a number at runtime",
            "It is equivalent to a type cast with `as number`"
          ],
          correctIndex: 1,
          explanation: "An assertion function with `asserts value is T` tells TypeScript: if this function returns normally (without throwing), then `value` is of type `T` in the code that follows. If the value is wrong, the function throws, preventing incorrect usage."
        },
        {
          question: "Why does `Array.filter` NOT automatically narrow types without a type predicate?",
          options: [
            "TypeScript doesn't understand Array.filter",
            "Array.filter returns `T[]` — TypeScript can't infer that only certain subtypes survive the filter without an explicit predicate",
            "Type predicates are banned in callbacks",
            "Array.filter works with generics, not union types"
          ],
          correctIndex: 1,
          explanation: "`arr.filter(x => typeof x === 'string')` returns `(string | number)[]`, not `string[]`. TypeScript doesn't analyze the callback body to infer the output type. Use a type predicate: `arr.filter((x): x is string => typeof x === 'string')` to get `string[]`."
        }
      ]
    }
  ],

  mid: [
    {
      topicId: "advanced-generics",
      topicTitle: "Advanced Generics",
      objectiveIndex: 0,
      questions: [
        {
          question: "What does `K extends keyof T` accomplish in a generic constraint?",
          options: [
            "It limits K to string types only",
            "It ensures K is a valid key of T, preventing access to nonexistent properties",
            "It creates a new key K on T",
            "It extends T with a new key K"
          ],
          correctIndex: 1,
          explanation: "`K extends keyof T` constrains K to be one of the actual keys of T. This prevents passing invalid property names and lets TypeScript infer the correct return type from `T[K]`."
        },
        {
          question: "In `interface ApiResponse<T = unknown, E = Error>`, what does `= unknown` mean?",
          options: [
            "T must extend unknown",
            "T defaults to `unknown` if no type argument is provided",
            "T is unknown at runtime",
            "T is always unknown regardless of what is passed"
          ],
          correctIndex: 1,
          explanation: "Generic type parameters can have default values using `=`. If you write `ApiResponse` without a type argument, T defaults to `unknown`. This mirrors JavaScript default function parameters."
        },
        {
          question: "With the Zod pattern `type User = z.infer<typeof UserSchema>`, what is the relationship between the schema and the type?",
          options: [
            "They are independent — changes to the schema don't affect the type",
            "The type is derived from the schema — a single source of truth for both runtime validation and compile-time types",
            "The schema is generated from the type",
            "They must be manually kept in sync"
          ],
          correctIndex: 1,
          explanation: "`z.infer<typeof Schema>` extracts the TypeScript type that the Zod schema represents. This creates a single source of truth: edit the schema and the type updates automatically, eliminating the duplication of maintaining separate validator and type definitions."
        },
        {
          question: "What does `function merge<T extends object, U extends object>(a: T, b: U): T & U` return?",
          options: [
            "A union of T and U",
            "An intersection type combining all properties from both T and U",
            "A new object type with only shared properties",
            "Either T or U depending on runtime values"
          ],
          correctIndex: 1,
          explanation: "The return type `T & U` is an intersection — the merged object has all properties from both T and U. TypeScript infers the exact types of T and U from the arguments, so the return type is precise."
        },
        {
          question: "In the `QueryBuilder<T>` example where `.where<K extends keyof T>(field: K, value: T[K])` is used, what does `T[K]` enforce?",
          options: [
            "That value is always a string",
            "That value must match the type of the property K in T",
            "That K must be a number index",
            "That value is optional"
          ],
          correctIndex: 1,
          explanation: "`T[K]` is an indexed access type — it resolves to the type of property `K` in `T`. So `.where('age', 30)` works because `T['age']` is `number`, but `.where('age', 'thirty')` fails because `'thirty'` is not `number`."
        },
        {
          question: "What is the benefit of a generic `fetchTyped<TSchema>(url, schema): Promise<z.infer<TSchema>>` helper?",
          options: [
            "It validates data faster than manual type assertions",
            "Callers get the correct inferred type without writing type arguments — the type flows from the schema argument",
            "It eliminates the need for async/await",
            "It caches responses automatically"
          ],
          correctIndex: 1,
          explanation: "TypeScript infers `TSchema` from the `schema` argument, and `z.infer<TSchema>` resolves to the correct type. The caller passes a Zod schema and gets back a properly typed result — no type arguments or type assertions needed."
        }
      ]
    },
    {
      topicId: "utility-types",
      topicTitle: "Utility Types",
      objectiveIndex: 1,
      questions: [
        {
          question: "What does `Partial<User>` produce?",
          options: [
            "A type where all User properties are required",
            "A type where all User properties become optional",
            "A type with only optional properties from User",
            "A type with half of User's properties"
          ],
          correctIndex: 1,
          explanation: "`Partial<T>` makes all properties of T optional by adding `?` to each. It's commonly used for update payloads where only a subset of fields needs to be provided."
        },
        {
          question: "What is the difference between `Pick<User, 'id' | 'name'>` and `Omit<User, 'email' | 'age' | 'role'>`?",
          options: [
            "They produce the same type if User has exactly those properties",
            "Pick includes only the listed keys; Omit excludes the listed keys — same result if the unlisted keys match",
            "Pick is for required properties; Omit is for optional ones",
            "They are completely different utility types with no relation"
          ],
          correctIndex: 1,
          explanation: "Both `Pick` and `Omit` select a subset of an object type's properties, just from different directions. `Pick` includes only what you name; `Omit` excludes what you name. They may produce the same type depending on the keys chosen."
        },
        {
          question: "What does `Record<'success' | 'error' | 'loading', string>` create?",
          options: [
            "A union type of those three strings",
            "An object type where each of those three keys maps to a string value",
            "An enum with those three values",
            "A tuple of three strings"
          ],
          correctIndex: 1,
          explanation: "`Record<Keys, Value>` creates an object type with each key from the `Keys` union mapping to the `Value` type. It's equivalent to `{ success: string; error: string; loading: string }`."
        },
        {
          question: "What does `Exclude<'pending' | 'active' | 'deleted', 'deleted'>` produce?",
          options: [
            "'deleted'",
            "'pending' | 'active'",
            "'pending' | 'active' | 'deleted'",
            "never"
          ],
          correctIndex: 1,
          explanation: "`Exclude<T, U>` removes from union `T` any member that is assignable to `U`. Excluding `'deleted'` from the three-member union leaves `'pending' | 'active'`."
        },
        {
          question: "How do you get the return type of an existing function `createUser` without duplicating the type?",
          options: [
            "type NewUser = createUser",
            "type NewUser = ReturnType<createUser>",
            "type NewUser = ReturnType<typeof createUser>",
            "type NewUser = typeof createUser.returnType"
          ],
          correctIndex: 2,
          explanation: "`ReturnType` accepts a function type, not a value. You need `typeof createUser` to get the function's type first, then `ReturnType<typeof createUser>` extracts its return type. This avoids duplicating the type definition."
        },
        {
          question: "What is a common pitfall with `Partial<T>` when T has nested objects?",
          options: [
            "`Partial<T>` makes all properties required instead of optional",
            "`Partial<T>` only makes top-level properties optional — nested objects remain fully required",
            "`Partial<T>` fails to compile when T has nested types",
            "`Partial<T>` converts nested objects to `any`"
          ],
          correctIndex: 1,
          explanation: "`Partial<T>` is shallow — it only adds `?` to the top-level properties. Nested object types remain required. For deeply optional types, you need a custom `DeepPartial<T>` recursive utility type."
        },
        {
          question: "What does `Awaited<Promise<Promise<string>>>` resolve to?",
          options: [
            "Promise<string>",
            "Promise<Promise<string>>",
            "string",
            "unknown"
          ],
          correctIndex: 2,
          explanation: "`Awaited<T>` recursively unwraps Promise types, simulating the behavior of `await`. `Awaited<Promise<Promise<string>>>` unwraps both layers and resolves to `string`."
        }
      ]
    },
    {
      topicId: "mapped-types-and-conditional-types",
      topicTitle: "Mapped Types and Conditional Types",
      objectiveIndex: 2,
      questions: [
        {
          question: "What does `[K in keyof T]` do in a mapped type?",
          options: [
            "It filters T to only include keys named K",
            "It iterates over every key K in type T, allowing you to transform each property",
            "It creates a new key K on T",
            "It checks if K is a valid key of T"
          ],
          correctIndex: 1,
          explanation: "`[K in keyof T]` is the mapped type syntax — it iterates over all keys of T, naming each one `K`. You can then define a new value type for each key, effectively transforming the entire object type."
        },
        {
          question: "In `` type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] } ``, what does `as` do?",
          options: [
            "It casts K to string",
            "It remaps (renames) the keys in the output type using a template literal",
            "It filters out keys that are not strings",
            "It marks the property as optional"
          ],
          correctIndex: 1,
          explanation: "The `as` clause in a mapped type enables key remapping — you can transform the output key name. Here, each key `K` is renamed to `` `get${Capitalize<K>}` ``, turning `name` into `getName` in the resulting type."
        },
        {
          question: "What does `[K in keyof T as T[K] extends string ? K : never]` do?",
          options: [
            "It makes all string properties optional",
            "It filters the mapped type to only include keys whose value type extends string",
            "It converts all string values to `never`",
            "It creates a union of all string property names"
          ],
          correctIndex: 1,
          explanation: "When the remapped key resolves to `never`, that property is excluded from the output type. This pattern filters a mapped type to include only properties that satisfy a condition — here, only string-valued properties."
        },
        {
          question: "What is `infer` used for in conditional types?",
          options: [
            "To infer the type of a JavaScript value at runtime",
            "To capture and extract a sub-type from a pattern match in a conditional type",
            "To enable inference mode in the TypeScript compiler",
            "To infer the return type of a generic function"
          ],
          correctIndex: 1,
          explanation: "`infer` appears inside the `extends` clause of a conditional type to capture a type from the pattern being matched. For example, `T extends (infer E)[] ? E : never` extracts the element type `E` from an array type `T`."
        },
        {
          question: "Given `type ToArray<T> = T extends unknown ? T[] : never`, what is `ToArray<string | number>`?",
          options: [
            "(string | number)[]",
            "string[] | number[]",
            "never",
            "unknown[]"
          ],
          correctIndex: 1,
          explanation: "Conditional types are distributive over unions by default. `ToArray<string | number>` distributes: `ToArray<string> | ToArray<number>` = `string[] | number[]`. Each union member is evaluated separately."
        },
        {
          question: "How do you prevent distribution of a conditional type over a union?",
          options: [
            "Use `noDistribute: true` in tsconfig",
            "Wrap both sides in square brackets: `[T] extends [U] ? X : Y`",
            "Use `Exclude` to prevent the union from distributing",
            "Distribution cannot be prevented"
          ],
          correctIndex: 1,
          explanation: "Wrapping both the check type and the constraint in tuples `[T] extends [U]` prevents distribution. TypeScript checks the whole union as a single type instead of evaluating each member separately."
        }
      ]
    },
    {
      topicId: "strict-mode-and-compiler-flags",
      topicTitle: "Strict Mode and Compiler Flags",
      objectiveIndex: 3,
      questions: [
        {
          question: "What does `noUncheckedIndexedAccess` change about array element access?",
          options: [
            "It prevents all array index access at compile time",
            "It adds `undefined` to the type of array index access, forcing you to handle potentially out-of-bounds access",
            "It checks array bounds at runtime",
            "It requires you to use `.at()` instead of bracket notation"
          ],
          correctIndex: 1,
          explanation: "With `noUncheckedIndexedAccess`, `arr[0]` has type `T | undefined` instead of `T`. This forces you to check for undefined before using the value, preventing silent out-of-bounds access bugs."
        },
        {
          question: "Why do tools like Vite and esbuild require `isolatedModules: true`?",
          options: [
            "They cannot process TypeScript files without this flag",
            "They transpile files independently without cross-file type analysis, so code must be safe to transform in isolation",
            "It speeds up Vite's hot module replacement",
            "It prevents circular imports"
          ],
          correctIndex: 1,
          explanation: "Tools like esbuild and Vite transpile each file independently for performance. They cannot look at other files to resolve type information. `isolatedModules: true` ensures your code doesn't use features that require cross-file analysis (like `const enum`)."
        },
        {
          question: "What is the difference between `import type { User }` and `import { User }` with `verbatimModuleSyntax`?",
          options: [
            "There is no difference — both work the same",
            "`import type` is erased at compile time; with `verbatimModuleSyntax`, all type-only imports must use `import type`",
            "`import type` is for interfaces; `import` is for classes",
            "`import type` is only valid in `.d.ts` files"
          ],
          correctIndex: 1,
          explanation: "`verbatimModuleSyntax` (TS 5.0+) enforces that any import used only as a type must be written as `import type`. This makes it explicit to bundlers that the import is type-only and can be erased safely."
        },
        {
          question: "What does `exactOptionalPropertyTypes` distinguish that standard TypeScript does not?",
          options: [
            "It distinguishes between `string` and `String`",
            "It distinguishes between a property being absent and a property explicitly set to `undefined`",
            "It requires all optional properties to have explicit types",
            "It prevents optional properties from being accessed without checking"
          ],
          correctIndex: 1,
          explanation: "With `exactOptionalPropertyTypes`, `{ theme?: 'light' | 'dark' }` means the `theme` key must either be absent or set to `'light'` or `'dark'`. Setting `theme: undefined` is an error — absence and explicit `undefined` are different."
        }
      ]
    },
    {
      topicId: "discriminated-unions-and-exhaustive-checking",
      topicTitle: "Discriminated Unions and Exhaustive Checking",
      objectiveIndex: 4,
      questions: [
        {
          question: "What makes a union type a 'discriminated union'?",
          options: [
            "It contains only primitive types",
            "Each member has a common property with a unique literal type that TypeScript can use to narrow",
            "It uses the `discriminate` keyword",
            "It contains exactly two members"
          ],
          correctIndex: 1,
          explanation: "A discriminated union has a shared property (the discriminant) with a unique literal type per member, like `status: 'idle' | 'loading' | 'success' | 'error'`. TypeScript uses this to narrow to the exact variant inside switch/if blocks."
        },
        {
          question: "What does `assertNever(value: never): never` do in an exhaustive switch statement?",
          options: [
            "It throws an error if any case is reached",
            "If all cases are handled, TypeScript knows `value` is `never` at the default — adding a new union member causes a compile error at the default case",
            "It prevents the switch from falling through",
            "It is a runtime assertion that always throws"
          ],
          correctIndex: 1,
          explanation: "After handling all union members in a switch, TypeScript narrows the remaining type to `never`. Passing it to `assertNever(value: never)` compiles only when value is truly `never`. If you add a new union member and forget to handle it, TypeScript errors because the unhandled member isn't `never`."
        },
        {
          question: "Why is a discriminated union better than a flat object with optional properties for modeling request state?",
          options: [
            "Discriminated unions use less memory",
            "TypeScript ensures you can only access properties valid for the current state — accessing `data` on `loading` state is a compile error",
            "Discriminated unions are faster at runtime",
            "Optional properties can't be typed in TypeScript"
          ],
          correctIndex: 1,
          explanation: "With a discriminated union like `RequestState<T>`, after checking `state.status === 'success'`, TypeScript knows `state.data` exists. With a flat object using `data?: T; error?: Error`, TypeScript can't tell if data is available without exhaustive checking."
        },
        {
          question: "In the `PaymentMethod` discriminated union, what prevents accessing `method.iban` when `method.type === 'credit_card'`?",
          options: [
            "Runtime checking throws an error",
            "TypeScript narrows `method` to the `credit_card` variant which doesn't have `iban`, causing a compile error",
            "The `iban` property is private",
            "TypeScript removes the property at compile time"
          ],
          correctIndex: 1,
          explanation: "After narrowing on `method.type === 'credit_card'`, TypeScript knows `method` is `{ type: 'credit_card'; cardNumber: string; expiry: string; cvv: string }`. Since `iban` doesn't exist on this type, accessing it is a compile-time error."
        },
        {
          question: "A `ValidationResult` discriminated union uses `valid: true` and `valid: false` as the discriminant. What does this enable?",
          options: [
            "Runtime boolean checking",
            "After `if (result.valid)`, TypeScript knows `result.value` exists; in the else branch, it knows `result.errors` exists",
            "Automatic validation at runtime",
            "Type narrowing only works with string discriminants"
          ],
          correctIndex: 1,
          explanation: "Boolean discriminants work just as well as string ones. After `if (result.valid)`, TypeScript narrows to `{ valid: true; value: string }`, making `result.value` accessible. In the else branch, it narrows to `{ valid: false; errors: string[] }`."
        }
      ]
    },
    {
      topicId: "declaration-files-d-ts",
      topicTitle: "Declaration Files (.d.ts)",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the purpose of a `.d.ts` declaration file?",
          options: [
            "It contains compiled JavaScript output",
            "It describes the shape of JavaScript code to TypeScript without providing implementations",
            "It is a configuration file for TypeScript",
            "It contains only interface definitions"
          ],
          correctIndex: 1,
          explanation: "Declaration files (`.d.ts`) contain only type information — no executable code. They tell TypeScript the types of variables, functions, and modules in JavaScript code that wasn't written in TypeScript, or in compiled library output."
        },
        {
          question: "What does `declare module '*.png'` accomplish?",
          options: [
            "It installs PNG support in TypeScript",
            "It tells TypeScript that importing a `.png` file yields a string (the URL/path)",
            "It prevents `.png` files from being imported",
            "It compiles PNG files to base64 strings"
          ],
          correctIndex: 1,
          explanation: "Bundlers like Webpack and Vite transform non-JS file imports. `declare module '*.png'` tells TypeScript that when you `import src from './image.png'`, `src` is a `string`. Without this, TypeScript would error on such imports."
        },
        {
          question: "Why must `declare global` be used inside a module file (one with import/export)?",
          options: [
            "It's a TypeScript syntax requirement with no semantic meaning",
            "A file without imports/exports is an ambient script that already affects the global scope — `declare global` is only needed inside modules to escape the module scope",
            "Global declarations are not allowed outside modules",
            "It prevents naming conflicts with local variables"
          ],
          correctIndex: 1,
          explanation: "A TypeScript file without any `import`/`export` is treated as an ambient script, meaning its declarations are global automatically. A file WITH `import`/`export` is a module with its own scope — you need `declare global {}` to explicitly add to the global scope."
        },
        {
          question: "What is a key rule for `.d.ts` declaration files?",
          options: [
            "They must contain at least one function implementation",
            "They should never contain implementations — only type declarations",
            "They must use `interface` instead of `type`",
            "They must be co-located with source `.ts` files"
          ],
          correctIndex: 1,
          explanation: "Declaration files (`.d.ts`) must contain ONLY type declarations (`declare`, `interface`, `type`). Any implementation code belongs in `.ts` files. Declaration files are purely for describing shapes to the type checker."
        }
      ]
    },
    {
      topicId: "module-augmentation-and-ambient-modules",
      topicTitle: "Module Augmentation and Ambient Modules",
      objectiveIndex: 6,
      questions: [
        {
          question: "What does `declare module 'express' { interface Request { userId?: string } }` accomplish?",
          options: [
            "It replaces Express's Request type entirely",
            "It adds `userId` to Express's Request interface via declaration merging, without modifying the library",
            "It creates a new module that wraps Express",
            "It requires importing from a different path"
          ],
          correctIndex: 1,
          explanation: "Module augmentation uses declaration merging to extend types from third-party libraries. The augmented `Request` interface merges with Express's original — your middleware can now set `req.userId` with full type safety."
        },
        {
          question: "Why is module augmentation preferred over forking a library to add types?",
          options: [
            "Module augmentation is faster at runtime",
            "It allows extending library types without modifying source code — you get updates from the library while keeping your type extensions",
            "Forking libraries is not allowed by TypeScript",
            "Module augmentation generates better .d.ts files"
          ],
          correctIndex: 1,
          explanation: "Forking means maintaining your own copy of the library, missing updates and security fixes. Module augmentation extends the type information in your project only, leaving the original library untouched and upgradable."
        },
        {
          question: "What does `declare module 'totally-untyped-lib'` (with no body) do?",
          options: [
            "It removes the library from the TypeScript project",
            "It declares the entire module as `any` — TypeScript will accept any import from it without type checking",
            "It errors because a module declaration requires a body",
            "It generates automatic types for the library"
          ],
          correctIndex: 1,
          explanation: "An empty `declare module 'name'` (ambient module without a body) tells TypeScript the module exists and treats all its exports as `any`. This is a quick way to silence errors for completely untyped libraries while you add proper types later."
        },
        {
          question: "What must be true for a file containing `declare module 'some-lib' {}` to work as a module augmentation (not a replacement)?",
          options: [
            "The file must use `.d.ts` extension",
            "The file must import from the module being augmented first, making it a module augmentation rather than an ambient declaration",
            "The file must be listed in tsconfig.json `files`",
            "The augmented module must already have types"
          ],
          correctIndex: 1,
          explanation: "To augment (extend) an existing module's types, you must import from it first: `import 'express'`. Without the import, TypeScript treats the `declare module` as a new ambient module declaration that replaces the existing types."
        }
      ]
    },
    {
      topicId: "testing-typed-code",
      topicTitle: "Testing Typed Code",
      objectiveIndex: 7,
      questions: [
        {
          question: "What does `expectTypeOf(add).returns.toBeNumber()` test?",
          options: [
            "It tests the runtime return value of `add`",
            "It tests at the type level that `add`'s return type is `number` — fails at compile time if wrong",
            "It validates that add returns a number at runtime",
            "It is a Jest matcher for numerical assertions"
          ],
          correctIndex: 1,
          explanation: "`expectTypeOf` from the `expect-type` library performs compile-time type assertions. The test fails if the type doesn't match — no runtime execution needed. It's used to test generic types and utility types."
        },
        {
          question: "Why is `satisfies` useful for test data declarations?",
          options: [
            "It converts the test data to JSON automatically",
            "It validates the object against the type without widening — you get type checking AND literal type preservation",
            "It makes test data immutable",
            "It is equivalent to `as const`"
          ],
          correctIndex: 1,
          explanation: "`satisfies User` checks that the object matches the `User` type but doesn't widen the inferred types. Unlike `const data: User = {...}` (which widens to `User`), `satisfies` keeps the specific literal types while still validating the shape."
        },
        {
          question: "What is the purpose of `function createMockUserService(overrides: Partial<UserService>): UserService`?",
          options: [
            "To generate random test data",
            "To create a fully typed mock where callers provide only the methods they need to override, while defaults fill the rest",
            "To spy on UserService method calls",
            "To validate that UserService is correctly implemented"
          ],
          correctIndex: 1,
          explanation: "A mock factory using `Partial<Service>` lets tests override only the specific methods relevant to that test while the factory provides safe defaults. This is type-safe — override types are checked against the real interface."
        },
        {
          question: "What advantage does `asserts result is { ok: true; value: T }` provide in tests?",
          options: [
            "It speeds up test execution",
            "After calling the assertion, TypeScript narrows the type — subsequent code can access `result.value` without another check",
            "It generates test documentation",
            "It prevents the test from running if the assertion is wrong"
          ],
          correctIndex: 1,
          explanation: "Assertion functions narrow the type for all code that follows the call. In a test, after `assertOk(result)`, TypeScript knows `result.value` exists and has the correct type — no need for additional type guards in the test body."
        }
      ]
    }
  ],

  senior: [
    {
      topicId: "template-literal-types",
      topicTitle: "Template Literal Types",
      objectiveIndex: 0,
      questions: [
        {
          question: "What does the type `` type ColorVariant = `${Shade}-${Color}` `` produce when `Shade = 'light' | 'dark'` and `Color = 'red' | 'green' | 'blue'`?",
          options: [
            "A single string type `'light-dark-red-green-blue'`",
            "A union of all combinations: `'light-red' | 'light-green' | 'light-blue' | 'dark-red' | 'dark-green' | 'dark-blue'`",
            "An array of color variant strings",
            "A Record mapping shade to color"
          ],
          correctIndex: 1,
          explanation: "Template literal types distribute over union members, creating all combinations. Two unions with 2 and 3 members produce a 6-member union (2 × 3) of all possible combinations."
        },
        {
          question: "What does `Capitalize<T>` do in `type EventHandler = `on${Capitalize<DOMEvent>}``?",
          options: [
            "It uppercases the entire string",
            "It uppercases only the first character of each DOMEvent member",
            "It removes lowercase letters",
            "It converts the string to camelCase"
          ],
          correctIndex: 1,
          explanation: "`Capitalize<T>` is a built-in string manipulation type that uppercases only the first character. Combined with template literals, `onClick | onFocus | onBlur` is generated from `'click' | 'focus' | 'blur'`."
        },
        {
          question: "In the `ExtractParams` type that extracts `:userId` and `:postId` from a route string, what TypeScript feature is being used?",
          options: [
            "Regex matching in the type system",
            "Recursive conditional types with `infer` to parse string patterns",
            "Mapped types over string characters",
            "Runtime string parsing at the type level"
          ],
          correctIndex: 1,
          explanation: "Template literal types combined with `infer` in conditional types can parse string patterns at the type level. The pattern `` `${string}:${infer Param}/${infer Rest}` `` matches the route and captures param names recursively."
        },
        {
          question: "What real-world benefit do template literal types provide for router APIs like Hono?",
          options: [
            "They make routes faster at runtime",
            "They enable type-safe route parameters — TypeScript knows which params exist and auto-completes them",
            "They validate URLs before making HTTP requests",
            "They generate route documentation automatically"
          ],
          correctIndex: 1,
          explanation: "With template literal types, a router can extract parameter names from a route string like `/users/:userId` at the type level. The handler's `params` argument is typed with exactly those keys, providing autocomplete and preventing typos."
        },
        {
          question: "What does `type CSSLength = `${number}${CSSUnit}`` accomplish?",
          options: [
            "It validates CSS at runtime",
            "It creates a type that only accepts strings matching a number followed by a valid CSS unit, like `'100px'` or `'50vh'`",
            "It converts numbers to CSS strings automatically",
            "It generates CSS classes from TypeScript types"
          ],
          correctIndex: 1,
          explanation: "Template literal types can combine a number literal type with string union members. `CSSLength` accepts any string that is a number followed by one of the valid units. Invalid strings like `'100'` (no unit) or `'px100'` (wrong order) are type errors."
        }
      ]
    },
    {
      topicId: "type-level-programming",
      topicTitle: "Type-Level Programming",
      objectiveIndex: 1,
      questions: [
        {
          question: "What does `type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T` do?",
          options: [
            "It makes the top-level object readonly",
            "It recursively makes every nested property at every depth readonly",
            "It converts the object to a tuple",
            "It creates a readonly version of T only if T is an array"
          ],
          correctIndex: 1,
          explanation: "This is a recursive mapped type. For object types, it applies `readonly` to each key and recursively calls itself on each value. For non-object types (primitives), it returns the type unchanged. The recursion bottoms out at primitives."
        },
        {
          question: "Given `type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : []`, what is `Tail<[1, 2, 3]>`?",
          options: ["[1, 2]", "[2, 3]", "[3]", "[]"],
          correctIndex: 1,
          explanation: "The pattern `[unknown, ...infer R]` matches a tuple with at least one element, capturing the rest in `R`. For `[1, 2, 3]`, the first element (1) is consumed, and `R` captures `[2, 3]`."
        },
        {
          question: "What practical use case justifies recursive type utilities like `DeepPartial` and `DeepReadonly` in real projects?",
          options: [
            "They are only useful for academic type puzzles",
            "They correctly type deeply nested structures like config objects, API responses, or Redux state without manual type duplication",
            "They improve runtime performance for nested object access",
            "They are required by TypeScript strict mode"
          ],
          correctIndex: 1,
          explanation: "In real applications, you often deal with deeply nested structures — config files, API payloads, state trees. `DeepPartial` and `DeepReadonly` apply transformations at every nesting level, saving you from manually creating nested partial/readonly types."
        },
        {
          question: "Why does TypeScript have a recursion depth limit for recursive types?",
          options: [
            "TypeScript only allows 10 type parameters",
            "Deep recursion can cause the type checker to run indefinitely or use excessive memory, so TypeScript terminates evaluation",
            "Recursion is not allowed in conditional types",
            "The limit is a performance optimization for small types only"
          ],
          correctIndex: 1,
          explanation: "TypeScript limits recursion depth (~1000 for most patterns) to prevent infinite loops in the type checker that could cause the IDE/compiler to hang. Very deep recursive types can hit this limit, which is why you should use accumulator patterns or depth counters."
        },
        {
          question: "What does `type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }` demonstrate?",
          options: [
            "A union of all primitive types",
            "A self-referential recursive type that can represent any valid JSON structure",
            "A mapped type over JSON keys",
            "A conditional type for JSON parsing"
          ],
          correctIndex: 1,
          explanation: "This is a recursive type alias that references itself. `JSONValue` can be a primitive, an array of `JSONValue`, or an object with `JSONValue` values — accurately modeling the recursive nature of JSON data."
        }
      ]
    },
    {
      topicId: "branded-nominal-types",
      topicTitle: "Branded / Nominal Types",
      objectiveIndex: 2,
      questions: [
        {
          question: "Why does TypeScript's structural typing allow `getUser(productId)` to compile without error when `getUser` expects a `UserId`?",
          options: [
            "TypeScript has a bug in number type checking",
            "Both UserId and ProductId are just `number` aliases — they have the same structure, so they're interchangeable",
            "TypeScript ignores type names for primitive types",
            "The function signature is incorrect"
          ],
          correctIndex: 1,
          explanation: "TypeScript uses structural typing — if two types have the same shape, they are compatible. `type UserId = number` and `type ProductId = number` are both just `number`. Without branding, they're completely interchangeable."
        },
        {
          question: "How does `type Brand<T, B extends string> = T & { readonly [brand]: B }` prevent mixing UserId with ProductId?",
          options: [
            "It adds a runtime check that throws on mismatch",
            "It adds a unique phantom property to the type — `UserId` has brand `'UserId'` and `ProductId` has `'ProductId'`, making them structurally incompatible",
            "It changes the underlying primitive type",
            "It prevents type widening"
          ],
          correctIndex: 1,
          explanation: "The brand adds a unique `symbol`-keyed property to the type. `UserId` has `{ [brand]: 'UserId' }` and `ProductId` has `{ [brand]: 'ProductId' }`. These are structurally different, so TypeScript rejects assigning one where the other is expected — at zero runtime cost."
        },
        {
          question: "What does `z.string().email().brand('Email')` from Zod accomplish?",
          options: [
            "It creates a runtime Email class",
            "It creates a branded string type `Email` where the brand is applied only after the value passes Zod's email validation",
            "It adds email validation to TypeScript's type system",
            "It generates a regex for email validation"
          ],
          correctIndex: 1,
          explanation: "Zod's `.brand()` creates a branded type that can only be obtained by parsing through the schema. After `EmailSchema.parse('alice@example.com')`, the result is typed as `Email` — proving it was validated. Raw strings can't be passed where `Email` is expected."
        },
        {
          question: "What is a 'phantom type' in the context of branded types?",
          options: [
            "A type that appears at runtime but not in source code",
            "A type-level marker that exists only in the type system and has no runtime representation",
            "A type that TypeScript cannot infer",
            "A deprecated TypeScript feature"
          ],
          correctIndex: 1,
          explanation: "The brand property `{ readonly [brand]: B }` is a phantom type — it exists only in TypeScript's type system. At runtime, branded values are plain numbers or strings. The brand is erased like all type annotations, adding zero overhead."
        },
        {
          question: "When is using branded types most valuable in a production application?",
          options: [
            "For all string and number types in the codebase",
            "For IDs, validated inputs, monetary amounts, and security-sensitive values where accidental mixing would cause business logic errors",
            "Only in library code consumed by external teams",
            "For performance-critical code paths"
          ],
          correctIndex: 1,
          explanation: "Branded types shine where mixing values would cause hard-to-debug business logic errors: passing an `OrderId` to a `UserId` slot, adding EUR to USD amounts, or using an unvalidated string where a validated email is required. The compile-time error prevents the bug entirely."
        }
      ]
    },
    {
      topicId: "variance-covariance-and-contravariance",
      topicTitle: "Variance (Covariance and Contravariance)",
      objectiveIndex: 3,
      questions: [
        {
          question: "If `Dog extends Animal`, what is the relationship between `ReadonlyBox<Dog>` and `ReadonlyBox<Animal>` (covariant)?",
          options: [
            "`ReadonlyBox<Animal>` extends `ReadonlyBox<Dog>`",
            "`ReadonlyBox<Dog>` extends `ReadonlyBox<Animal>` — subtype relationship is preserved",
            "They are unrelated types",
            "They are identical types"
          ],
          correctIndex: 1,
          explanation: "Covariant types preserve the subtype direction. Since `Dog` is more specific than `Animal`, `ReadonlyBox<Dog>` is more specific than `ReadonlyBox<Animal>`. A `ReadonlyBox<Dog>` can be used where `ReadonlyBox<Animal>` is expected — safe because you can only read, not write."
        },
        {
          question: "Why is `Handler<Animal>` assignable to `Handler<Dog>` (contravariance) even though `Dog` extends `Animal`?",
          options: [
            "TypeScript has a bug in function type checking",
            "A handler that accepts any Animal can safely handle a Dog — the subtype direction reverses for input positions",
            "Handler types are always assignable regardless of type parameters",
            "Animal and Dog have the same structure"
          ],
          correctIndex: 1,
          explanation: "Contravariance reverses the direction for input positions. A `Handler<Animal>` can handle any `Animal`, including `Dog`. So where you need a `Handler<Dog>`, you can use `Handler<Animal>` — it accepts more. The subtype relationship reverses: `Handler<Animal>` is a subtype of `Handler<Dog>`."
        },
        {
          question: "What does the `in` variance annotation mean in `interface Consumer<in T>`?",
          options: [
            "T is an input to the type — T only appears in parameter (input/contravariant) positions",
            "T must be imported from another module",
            "T is constrained to built-in types",
            "T is invariant"
          ],
          correctIndex: 0,
          explanation: "The `in` annotation marks T as contravariant — T should only appear in input (parameter) positions. This helps the compiler check variance correctly and can speed up type checking by making the variance explicit."
        },
        {
          question: "Why is a mutable container type `MutableBox<T>` invariant (neither covariant nor contravariant)?",
          options: [
            "Mutable containers are always invariant by language design",
            "Because you can both read and write — covariance would allow unsafe writes; contravariance would allow unsafe reads",
            "Because TypeScript uses structural typing for classes",
            "Because mutable types cannot be generic"
          ],
          correctIndex: 1,
          explanation: "A mutable container must be invariant because it allows both reading and writing. If `MutableBox<Dog>` were covariant with `MutableBox<Animal>`, you could write an `Animal` (not a `Dog`) into a `MutableBox<Dog>` — breaking type safety. Invariance prevents both unsafe read and write directions."
        },
        {
          question: "What is the difference between method syntax and property syntax for functions in interfaces with respect to variance?",
          options: [
            "They are identical in variance behavior",
            "Method syntax is bivariant (less safe); property syntax enforces correct contravariance with `strictFunctionTypes`",
            "Property syntax is bivariant; method syntax is contravariant",
            "Only property syntax works with `strictFunctionTypes`"
          ],
          correctIndex: 1,
          explanation: "With `strictFunctionTypes`, function types in property positions are checked contravariantly (correct behavior). Method syntax (`method(): void`) remains bivariant for backward compatibility with existing code. For stricter safety, prefer property syntax `method: () => void`."
        }
      ]
    },
    {
      topicId: "monorepo-typescript-configuration",
      topicTitle: "Monorepo TypeScript Configuration",
      objectiveIndex: 4,
      questions: [
        {
          question: "What does `composite: true` enable in a TypeScript project?",
          options: [
            "It allows importing from multiple TypeScript versions",
            "It enables project references — the project can be referenced by other projects and TypeScript tracks which outputs need rebuilding",
            "It enables composite types like union and intersection",
            "It allows multiple tsconfig.json files in one project"
          ],
          correctIndex: 1,
          explanation: "`composite: true` marks a project as a referenceable TypeScript project. It requires `declaration: true` (to generate .d.ts files for consumers) and enables incremental builds that only recompile changed packages."
        },
        {
          question: "What is the benefit of using `tsc --build` over plain `tsc` in a monorepo?",
          options: [
            "It is faster for single-package projects",
            "`--build` uses project references to rebuild only changed packages and their dependents, skipping unchanged packages",
            "`--build` generates better error messages",
            "`--build` enables all strict flags automatically"
          ],
          correctIndex: 1,
          explanation: "`tsc --build` understands the project reference graph. It checks which packages have changed and only rebuilds those plus their dependents. Without `--build`, `tsc` compiles everything from scratch every time."
        },
        {
          question: "Why does `declarationMap: true` matter for developer experience in a monorepo?",
          options: [
            "It creates source maps for JavaScript output",
            "It makes 'Go to Definition' jump to the TypeScript source file instead of the .d.ts declaration file",
            "It generates HTML documentation from types",
            "It maps type errors to the correct line numbers"
          ],
          correctIndex: 1,
          explanation: "Declaration maps create a mapping from the `.d.ts` file back to the original `.ts` source. When you Cmd+Click on a function from another package in your monorepo, your editor takes you to the source code, not the generated declaration file."
        },
        {
          question: "What must you include in `typeRoots` if you set it explicitly in tsconfig.json?",
          options: [
            "Your own type declarations directory only",
            "You must include `node_modules/@types` explicitly, or TypeScript will stop looking there for @types packages",
            "All directories containing .ts files",
            "The TypeScript standard library path"
          ],
          correctIndex: 1,
          explanation: "`typeRoots` overrides the default type search locations. If you specify it, TypeScript only looks in the directories you list. You must explicitly include `node_modules/@types` or you'll lose all `@types/*` package type resolution."
        }
      ]
    },
    {
      topicId: "javascript-to-typescript-migration-strategies",
      topicTitle: "JavaScript-to-TypeScript Migration Strategies",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the recommended first step when migrating a large JavaScript codebase to TypeScript?",
          options: [
            "Enable `strict: true` immediately to find all errors at once",
            "Enable `allowJs: true` and `checkJs: false` to compile .js files without type checking, then migrate files incrementally",
            "Rename all .js files to .ts immediately",
            "Add `@ts-ignore` to every file"
          ],
          correctIndex: 1,
          explanation: "The incremental approach starts with `allowJs: true` so TypeScript compiles .js files without errors. You then migrate files one at a time from .js to .ts, adding types progressively without blocking the rest of the team."
        },
        {
          question: "Why should you prefer `@ts-expect-error` over `@ts-ignore` during migration?",
          options: [
            "`@ts-expect-error` is the newer syntax and `@ts-ignore` is deprecated",
            "`@ts-expect-error` errors if there's nothing to suppress — preventing stale suppressions when the underlying issue is fixed",
            "`@ts-ignore` doesn't work in strict mode",
            "`@ts-expect-error` is required for declaration files"
          ],
          correctIndex: 1,
          explanation: "`@ts-expect-error` validates that the next line actually has a type error. Once you fix the underlying issue, TypeScript will error on the suppression itself, reminding you to remove it. `@ts-ignore` silently suppresses — it stays even after the issue is fixed, hiding problems."
        },
        {
          question: "In the migration phases, why is enabling `strictNullChecks` described as 'typically the hardest phase'?",
          options: [
            "It requires rewriting all function signatures",
            "It surfaces every place in the codebase where null/undefined was assumed to be impossible, often requiring widespread defensive checks or explicit typing",
            "It doesn't work with `allowJs: true`",
            "It requires upgrading to the latest TypeScript version"
          ],
          correctIndex: 1,
          explanation: "`strictNullChecks` forces you to handle every potential null/undefined throughout the codebase. In a large JavaScript project, there are typically hundreds of places where null safety was implicit — each must be addressed explicitly."
        },
        {
          question: "What is the purpose of adding JSDoc type annotations (`@param {string} name`) to .js files before converting them to TypeScript?",
          options: [
            "JSDoc is required by TypeScript when migrating",
            "JSDoc provides incremental type information without renaming files, enabling the editor to give feedback before full TypeScript adoption",
            "JSDoc annotations are automatically converted to TypeScript types",
            "JSDoc prevents TypeScript from checking the file"
          ],
          correctIndex: 1,
          explanation: "JSDoc type annotations in .js files give TypeScript (with `checkJs: true`) partial type information. This is useful as an intermediate step — developers get some type checking and editor assistance before the file is fully converted to TypeScript."
        },
        {
          question: "Why should you avoid using `any` as a crutch during migration?",
          options: [
            "`any` is not allowed when `allowJs: true` is set",
            "`any` defeats the purpose of migration — it silences errors without providing type safety, leaving the same bugs that motivated the migration",
            "`any` causes runtime performance issues",
            "`any` is deprecated in TypeScript 5.0+"
          ],
          correctIndex: 1,
          explanation: "The goal of migrating to TypeScript is to add type safety and catch bugs. Replacing implicit JavaScript `any` with explicit TypeScript `any` provides zero safety improvement. Use specific types, `unknown`, or well-typed generics instead."
        }
      ]
    },
    {
      topicId: "performance-type-checking-speed",
      topicTitle: "Performance — Type Checking Speed",
      objectiveIndex: 6,
      questions: [
        {
          question: "What does `tsc --generateTrace ./trace-output` produce, and why is it useful?",
          options: [
            "It generates a source map for debugging",
            "It produces a performance trace of the type checker, showing which types and operations are slow",
            "It traces all import chains in the project",
            "It generates a dependency graph for the project"
          ],
          correctIndex: 1,
          explanation: "`--generateTrace` creates a trace file compatible with Chrome DevTools. Analyzed with `@typescript/analyze-trace`, it shows which types are being instantiated most and which files are slowest — the primary tool for diagnosing type-check performance issues."
        },
        {
          question: "Why is `interface FastConfig extends Base, DB, Cache {}` faster than `type SlowConfig = Base & DB & Cache`?",
          options: [
            "Interfaces are always faster than type aliases",
            "Interface extension is cached by the compiler; type intersections are re-evaluated at every use site",
            "Type intersections create larger objects at runtime",
            "There is no performance difference between them"
          ],
          correctIndex: 1,
          explanation: "TypeScript caches the result of interface extension, so the merged type is computed once and reused. Type intersections are re-evaluated each time the type is instantiated. For types used in many places, this difference compounds significantly."
        },
        {
          question: "Why do large union types (30+ members) in mapped positions cause performance issues?",
          options: [
            "TypeScript has a hard limit of 30 union members",
            "Mapping over large unions can cause exponential type instantiation — each combination multiplies the work",
            "Large unions require more memory for string storage",
            "Mapped types cannot handle unions with more than 10 members"
          ],
          correctIndex: 1,
          explanation: "When a large union appears in a mapped type position, TypeScript may need to instantiate the mapped type for each union member. With many members and nested mappings, this becomes exponential. For permission-style mappings, a `Record<string, boolean>` is often preferable."
        },
        {
          question: "What does `--extendedDiagnostics` output that helps identify slow types?",
          options: [
            "A list of all type errors with suggested fixes",
            "Type instantiation counts — a very high `Instantiations` number indicates expensive generic types",
            "Memory usage per file",
            "A list of all imported modules"
          ],
          correctIndex: 1,
          explanation: "`--extendedDiagnostics` prints compilation statistics including the total number of type instantiations. A high instantiation count (millions) usually points to expensive generic or conditional types that are being evaluated too many times."
        },
        {
          question: "What does annotating complex function return types explicitly do for performance?",
          options: [
            "It prevents TypeScript from checking the return type",
            "It helps the type checker by providing the return type directly, avoiding the need to infer it from potentially complex expressions",
            "It generates faster JavaScript output",
            "It is required when using `isolatedDeclarations`"
          ],
          correctIndex: 1,
          explanation: "When TypeScript has to infer a complex return type from a function body with many conditional expressions, it can be slow. Explicitly annotating `function createUser(): { id: string; name: string }` gives the checker the answer directly, skipping inference."
        }
      ]
    },
    {
      topicId: "advanced-patterns",
      topicTitle: "Advanced Patterns",
      objectiveIndex: 7,
      questions: [
        {
          question: "In the type-safe Builder pattern, what prevents calling `.build()` before setting required fields?",
          options: [
            "A runtime check throws an error if fields are missing",
            "The `build()` method has a `this` parameter constraint — it's only callable when the state type parameter indicates all required fields are set",
            "The builder throws in the constructor if called without arguments",
            "TypeScript's strict mode prevents incomplete builders"
          ],
          correctIndex: 1,
          explanation: "The `build()` method uses a polymorphic `this` constraint: `build(this: Builder<{ host: true; port: true; database: true }>)`. If the builder's state type parameter doesn't match, TypeScript reports an error — `.build()` doesn't exist on the incomplete builder type."
        },
        {
          question: "What does the type-safe state machine (`Order<S extends OrderState>`) prevent that a plain string-based implementation cannot?",
          options: [
            "Invalid order IDs",
            "Calling `.transition()` with an invalid next state for the current state — only valid transitions are callable",
            "Runtime state mutation",
            "Creating orders with empty item lists"
          ],
          correctIndex: 1,
          explanation: "The `transition<Next extends TransitionMap[S]>` constraint means TypeScript knows which transitions are valid for each state. A `delivered` order has `TransitionMap['delivered'] = never`, so `.transition()` can't be called with any argument — compile-time enforcement of business rules."
        },
        {
          question: "In the type-safe dependency injection `Container`, what does `resolve<K extends keyof ServiceMap>(key: K): ServiceMap[K]` guarantee?",
          options: [
            "That the service is instantiated correctly",
            "That the returned service is typed as the exact service type for key K — no type assertions needed at the call site",
            "That the service exists in the map at compile time",
            "That the service implements a specific interface"
          ],
          correctIndex: 1,
          explanation: "Because the return type is `ServiceMap[K]`, TypeScript infers the exact return type from the key. `container.resolve('logger')` returns `{ log(message: string): void }` — fully typed, without any `as` casts at the call site."
        },
        {
          question: "What does the `Money<Currency extends string>` opaque type prevent that plain `{ amount: number; currency: string }` cannot?",
          options: [
            "Negative monetary amounts",
            "Adding amounts of different currencies — `add(usd, eur)` is a compile error because their branded `Currency` types differ",
            "Floating point precision errors",
            "Creating money without a currency"
          ],
          correctIndex: 1,
          explanation: "The `Money<'USD'>` and `Money<'EUR'>` types are structurally different because their `Currency` generic parameter (and brand symbol) differ. `add<C>(a: Money<C>, b: Money<C>)` requires both arguments to have the same currency type — mixing currencies is a compile-time error."
        },
        {
          question: "Why does the type-safe builder use `return this as any` internally even though the external API is fully typed?",
          options: [
            "It's a TypeScript bug that requires the cast",
            "The state type parameter evolution (`State & { host: true }`) can't be expressed safely with `this` — the cast is contained within the method while the typed API surface remains correct for callers",
            "`as any` is required for all fluent builders",
            "It prevents TypeScript from checking the implementation"
          ],
          correctIndex: 1,
          explanation: "The implementation needs to return a builder with a different state type, which requires a type assertion (`as any`) internally. The important thing is that the method's return type signature is correct — callers see the right types. Containing `any` in the implementation while exposing a typed API is an accepted pattern."
        }
      ]
    }
  ],

  exams: {
    beginner: [
      {
        question: "What is the purpose of TypeScript's type system?",
        options: [
          "To replace JavaScript at runtime",
          "To add compile-time type checking that catches bugs before execution, with zero runtime overhead",
          "To restrict JavaScript to object-oriented patterns only",
          "To add runtime type validation automatically"
        ],
        correctIndex: 1,
        explanation: "TypeScript adds a static type system on top of JavaScript. All type information is erased at compile time — the output is plain JavaScript. The benefit is catching type errors during development in the editor or build step."
      },
      {
        question: "Given `function greet(name: string, greeting?: string): string`, which call is valid?",
        options: [
          "greet()",
          "greet('Alice', 'Hi', 'extra')",
          "greet('Alice')",
          "greet(42)"
        ],
        correctIndex: 2,
        explanation: "`name` is required (no `?`), `greeting` is optional (has `?`). So `greet('Alice')` is valid — `greeting` defaults to `undefined` and is handled by the function body. `greet()` omits the required `name`; `greet(42)` passes a number where string is expected."
      },
      {
        question: "What is type widening in TypeScript?",
        options: [
          "Converting a specific type to a less specific one, such as `'hello'` to `string`",
          "Expanding a union type to include more members",
          "Adding properties to an interface",
          "Converting number to bigint"
        ],
        correctIndex: 0,
        explanation: "Type widening occurs when TypeScript infers a broader type than the specific value. `let x = 'hello'` widens from the literal `'hello'` to `string` because the variable is mutable. `const x = 'hello'` keeps the literal type."
      },
      {
        question: "Which of the following correctly uses an interface to define a class contract?",
        options: [
          "class Dog extends Serializable { }",
          "class Dog implements Serializable { serialize() { return ''; } deserialize(d: string) {} }",
          "interface Dog = Serializable",
          "class Dog : Serializable { }"
        ],
        correctIndex: 1,
        explanation: "`implements` is the keyword for class-to-interface contracts. The class must provide all members declared in the interface. `extends` is for class-to-class inheritance or interface-to-interface extension."
      },
      {
        question: "What is the type of `atLeastOne: [string, ...number[]]` at index 0?",
        options: ["number", "string | number", "string", "unknown"],
        correctIndex: 2,
        explanation: "A rest tuple `[string, ...number[]]` has `string` at position 0 (required) and any number of `number` elements after. The first element is always `string`."
      },
      {
        question: "Why does `typeof null === 'object'` matter when writing type guards?",
        options: [
          "It doesn't — TypeScript handles null separately from objects",
          "You must add `&& value !== null` when narrowing with `typeof x === 'object'` to exclude null from the narrowed type",
          "It means null is always treated as an object in TypeScript",
          "TypeScript automatically excludes null from object narrowing"
        ],
        correctIndex: 1,
        explanation: "This is a JavaScript quirk. When writing `if (typeof value === 'object')`, null still passes because `typeof null === 'object'`. To narrow to non-null objects, you need `typeof value === 'object' && value !== null`."
      },
      {
        question: "What does `const config = { retries: 3 } as const` do to the type of `config.retries`?",
        options: ["number", "3", "readonly number", "const"],
        correctIndex: 1,
        explanation: "`as const` freezes the type to literal values. `config.retries` becomes type `3` (the specific literal number), not `number`. All properties also become `readonly`."
      },
      {
        question: "Which of these correctly types a function that never returns?",
        options: [
          "function crash(): void { throw new Error('bad') }",
          "function crash(): undefined { throw new Error('bad') }",
          "function crash(): never { throw new Error('bad') }",
          "function crash(): null { throw new Error('bad') }"
        ],
        correctIndex: 2,
        explanation: "`never` is the correct return type for functions that always throw or run infinitely — they never produce a value. `void` means the function returns `undefined` (a normal return). Only `never` accurately models 'this function never completes normally'."
      },
      {
        question: "What is the benefit of `strict: true` in tsconfig.json?",
        options: [
          "It prevents you from using third-party libraries",
          "It enables seven strict flags at once, catching null errors, implicit any, and unsafe function types",
          "It forces you to annotate every variable",
          "It disables type inference"
        ],
        correctIndex: 1,
        explanation: "`strict: true` enables a bundle of flags: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictPropertyInitialization`, `strictBindCallApply`, `useUnknownInCatchVariables`, and `alwaysStrict`. Always enable it on new projects."
      },
      {
        question: "Given `type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number }`, what happens if you add a `triangle` variant but forget to handle it in a switch with `assertNever`?",
        options: [
          "The code compiles fine and handles triangles as undefined",
          "The `default: assertNever(shape)` case will cause a compile error because `shape` is no longer `never`",
          "TypeScript adds a default handler automatically",
          "The switch statement throws at runtime"
        ],
        correctIndex: 1,
        explanation: "After handling `circle` and `square`, TypeScript narrows `shape` to `never` in the default case. Adding `triangle` means the unhandled `triangle` variant reaches `assertNever(value: never)` — passing a `triangle` object where `never` is expected is a compile error."
      },
      {
        question: "What does `Array.filter((x): x is string => typeof x === 'string')` accomplish vs `Array.filter(x => typeof x === 'string')`?",
        options: [
          "They are identical — both return `string[]`",
          "The type predicate version returns `string[]`; without it, filter returns the original union type `(string | number)[]`",
          "The type predicate version is slower at runtime",
          "The type predicate version also filters at the type level"
        ],
        correctIndex: 1,
        explanation: "Without a type predicate, TypeScript can't infer that the filtered array contains only strings — it returns the original array type. The type predicate `(x): x is string` explicitly tells TypeScript the output type, resulting in `string[]`."
      },
      {
        question: "What is the difference between `Required<Config>` and `Config` where `Config` has all optional properties?",
        options: [
          "They are the same type",
          "`Required<Config>` makes all previously optional properties mandatory — `?` is removed from every property",
          "`Required<Config>` adds default values to optional properties",
          "`Required<Config>` makes all properties readonly"
        ],
        correctIndex: 1,
        explanation: "`Required<T>` is the opposite of `Partial<T>`. It removes the `?` modifier from every property, making all optional properties required. Useful for fully-resolved config after merging with defaults."
      },
      {
        question: "Which statement about TypeScript's `unknown` type is correct?",
        options: [
          "`unknown` can be assigned to any other type without narrowing",
          "`unknown` and `any` are identical in behavior",
          "`unknown` requires type narrowing before you can call methods or access properties",
          "`unknown` is only valid as a return type"
        ],
        correctIndex: 2,
        explanation: "`unknown` is the type-safe top type. You can assign anything to `unknown`, but you must narrow before using it. This forces you to handle all possibilities explicitly, unlike `any` which disables checking."
      },
      {
        question: "What is the output of `typeof firstElement(['a', 'b', 'c'])` when `firstElement<T>(arr: T[]): T | undefined`?",
        options: [
          "`any`",
          "`string | undefined`",
          "`string`",
          "`unknown`"
        ],
        correctIndex: 1,
        explanation: "TypeScript infers `T = string` from the `string[]` argument. The return type `T | undefined` becomes `string | undefined`. This is better than `any[]` because callers know exactly what type they might get back."
      },
      {
        question: "When should you use a type alias over an interface for object shapes?",
        options: [
          "Always — type aliases are more powerful",
          "When you need declaration merging or class implementation contracts",
          "When the type involves unions, intersections, computed types, or consistency requires it in a project that uses type aliases throughout",
          "Never — interfaces should always be used for object shapes"
        ],
        correctIndex: 2,
        explanation: "For object shapes, both work. Use `type` when the object shape involves unions/intersections, when you want consistency with a codebase that uses type aliases, or for computed types. Use `interface` when declaration merging or class `implements` is needed."
      }
    ],

    mid: [
      {
        question: "What does `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never` extract?",
        options: [
          "The parameter types of function T",
          "The return type R of function T using conditional type inference",
          "Whether T is a function",
          "The `this` type of function T"
        ],
        correctIndex: 1,
        explanation: "This is a manual implementation of the built-in `ReturnType<T>`. The conditional type checks if T is a function, and `infer R` captures the return type from the pattern. If T isn't a function, the result is `never`."
      },
      {
        question: "What is the difference between `Exclude<T, U>` and `Extract<T, U>`?",
        options: [
          "`Exclude` keeps matching members; `Extract` removes them",
          "`Exclude` removes union members assignable to U; `Extract` keeps only members assignable to U",
          "They are inverses in name only — functionally identical",
          "`Exclude` works on object types; `Extract` works on unions"
        ],
        correctIndex: 1,
        explanation: "`Exclude<T, U>` removes from T any member assignable to U. `Extract<T, U>` keeps only members of T assignable to U. They are complementary: `Exclude<A|B|C, B> = A|C`; `Extract<A|B|C, B> = B`."
      },
      {
        question: "What does `type OnlyStringProps<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] }` produce?",
        options: [
          "An object with all properties converted to string",
          "An object containing only properties whose value type is string",
          "An object with all non-string properties set to never",
          "A union of string property names"
        ],
        correctIndex: 1,
        explanation: "The key remapping with `as T[K] extends string ? K : never` excludes keys where the value type isn't string (by mapping them to `never`). The result is an object type with only string-valued properties."
      },
      {
        question: "Why is `noUncheckedIndexedAccess` considered a significant safety improvement over standard `strict: true`?",
        options: [
          "It prevents all array access",
          "It catches out-of-bounds access at compile time by adding `undefined` to index access return types",
          "It is included in `strict: true` automatically",
          "It only applies to dictionary objects, not arrays"
        ],
        correctIndex: 1,
        explanation: "Standard `strict: true` doesn't protect against out-of-bounds array access — `arr[999]` returns `T`, not `T | undefined`. `noUncheckedIndexedAccess` adds `undefined`, forcing you to check, which prevents a common source of runtime errors."
      },
      {
        question: "In module augmentation, what is required to extend an existing module's types rather than declare a new ambient module?",
        options: [
          "The file must have a `.d.ts` extension",
          "The file must import from the module being augmented, establishing it as a module augmentation",
          "The file must use `namespace` syntax",
          "The augmented interface must have the same number of properties"
        ],
        correctIndex: 1,
        explanation: "Without an import, TypeScript treats `declare module 'x' {}` as a new ambient module declaration, overriding the existing types. With an import like `import 'express'`, TypeScript recognizes it as an augmentation that merges with the existing module types."
      },
      {
        question: "What does `type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T` do that `Readonly<T>` does not?",
        options: [
          "They are equivalent — both apply readonly deeply",
          "`DeepReadonly` recursively applies `readonly` to all nested properties; `Readonly<T>` only applies to the top level",
          "`DeepReadonly` works with arrays; `Readonly` does not",
          "`DeepReadonly` is a built-in utility type; `Readonly` is custom"
        ],
        correctIndex: 1,
        explanation: "Built-in `Readonly<T>` only makes top-level properties readonly. `DeepReadonly<T>` recursively processes nested objects, making all properties at all depths readonly. Essential for deeply nested immutable data structures."
      },
      {
        question: "What is the Zod schema pattern's main advantage in a full-stack TypeScript application?",
        options: [
          "It eliminates the need for any types at all",
          "It provides a single source of truth — one schema validates data at runtime AND generates the TypeScript type, avoiding duplication",
          "It automatically generates REST API routes",
          "It replaces TypeScript interfaces in all scenarios"
        ],
        correctIndex: 1,
        explanation: "Without Zod, you maintain a TypeScript type AND a separate validator. With Zod, `type User = z.infer<typeof UserSchema>` derives the type from the schema. Change the schema, and the type updates automatically — no risk of them diverging."
      },
      {
        question: "In type-level testing, what does `expectTypeOf<Partial<User>>().not.toEqualTypeOf<User>()` verify?",
        options: [
          "That User has no optional properties",
          "At compile time, that `Partial<User>` is NOT the same type as `User`",
          "That User fails Partial type checking",
          "Nothing — this assertion always passes"
        ],
        correctIndex: 1,
        explanation: "`expectTypeOf` assertions run at compile time. This assertion verifies that the type produced by `Partial<User>` is different from `User` — which it is, because `Partial` makes properties optional. If they were somehow the same type, this would be a compile error."
      },
      {
        question: "What is the difference between distributive and non-distributive conditional types?",
        options: [
          "They are identical — distribution is always enabled",
          "Distributive evaluates each union member separately; non-distributive (wrapped in []) evaluates the whole union as one type",
          "Non-distributive types require `infer`; distributive types do not",
          "Distribution only applies to object types, not union types"
        ],
        correctIndex: 1,
        explanation: "Default conditional types `T extends U ? X : Y` distribute over unions — each member is evaluated separately. Wrapping in brackets `[T] extends [U]` prevents distribution, treating the entire union as a single type. This changes results for unions: `T[] | number[]` vs `(T | number)[]`."
      },
      {
        question: "What makes discriminated unions particularly valuable for modeling UI state in frontend applications?",
        options: [
          "They are faster than plain objects",
          "They ensure you handle every state (loading, error, success) and prevent accessing data that doesn't exist in the current state",
          "They automatically trigger re-renders",
          "They reduce bundle size"
        ],
        correctIndex: 1,
        explanation: "With a discriminated union `{ status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: Error }`, TypeScript ensures you check the status before accessing `data` or `error`. You can't accidentally render stale data or miss the error state."
      },
      {
        question: "What is the purpose of `type Parameters<T> = T extends (...args: infer P) => any ? P : never`?",
        options: [
          "To extract the return type of T",
          "To extract the parameter types tuple of function T",
          "To count the number of parameters in T",
          "To check if T is a function"
        ],
        correctIndex: 1,
        explanation: "`Parameters<T>` extracts the parameter types as a tuple. For `function createUser(name: string, age: number)`, `Parameters<typeof createUser>` is `[string, number]`. This avoids duplicating the parameter types when you need to reference them elsewhere."
      },
      {
        question: "In `class QueryBuilder<T>.where<K extends keyof T>(field: K, value: T[K])`, what prevents `builder.where('age', 'thirty')` when age is typed as number?",
        options: [
          "A runtime validation check",
          "`T[K]` resolves to the type of the property `K` in `T` — for `age: number`, it requires a number value",
          "The `extends keyof T` constraint prevents string values",
          "TypeScript checks property values at compile time by default"
        ],
        correctIndex: 1,
        explanation: "`T[K]` is an indexed access type. When `K = 'age'` and `T = { age: number; ... }`, `T[K]` resolves to `number`. Passing `'thirty'` (a string) where `number` is required is a compile-time error."
      },
      {
        question: "What does `satisfies` do that type annotation doesn't when writing test fixtures?",
        options: [
          "They are identical — `satisfies` is just newer syntax",
          "`satisfies` validates the type without widening — you keep literal types while getting type checking; annotation widens to the target type",
          "`satisfies` generates test assertions automatically",
          "`satisfies` is for runtime assertions; annotation is for compile-time"
        ],
        correctIndex: 1,
        explanation: "With `const data: User = { role: 'admin' }`, `data.role` widens to `string`. With `const data = { role: 'admin' } satisfies User`, `data.role` stays as literal `'admin'` — TypeScript validates the shape but keeps the specific type."
      },
      {
        question: "Which approach is recommended for handling exhaustive checking in discriminated unions?",
        options: [
          "Use optional chaining on all property accesses",
          "Add a `default` case that passes the value to `assertNever(value: never)` — TypeScript errors if any variant isn't handled",
          "Use `Object.keys()` to iterate over all variants",
          "Add a catch-all `else` branch that returns null"
        ],
        correctIndex: 1,
        explanation: "`assertNever` works because after handling all union members, TypeScript narrows the type to `never`. Passing a `never` value to a function expecting `never` is only valid if the type is truly `never`. A new unhandled union member breaks this invariant with a compile error."
      },
      {
        question: "What does `verbatimModuleSyntax` enforce that `isolatedModules` does not?",
        options: [
          "They enforce identical rules — `verbatimModuleSyntax` is just the newer name",
          "`verbatimModuleSyntax` requires type-only imports to explicitly use `import type` syntax; `isolatedModules` only disables certain features",
          "`verbatimModuleSyntax` validates module paths at compile time",
          "`verbatimModuleSyntax` is a weaker version of `isolatedModules`"
        ],
        correctIndex: 1,
        explanation: "`isolatedModules` disables features incompatible with single-file transpilation (like `const enum`). `verbatimModuleSyntax` goes further: it requires `import type` for type-only imports, ensuring the transpiler knows exactly what to erase."
      },
      {
        question: "When writing a generic `createMockService<T>(overrides: Partial<T>): T` factory, what TypeScript behavior ensures the overrides are type-checked?",
        options: [
          "TypeScript checks overrides at runtime using reflection",
          "`Partial<T>` makes all T's properties optional but keeps their types — an override with the wrong type causes a compile error",
          "The factory uses `as any` to bypass checking",
          "TypeScript doesn't check Partial types"
        ],
        correctIndex: 1,
        explanation: "`Partial<T>` makes properties optional but doesn't change their types. `{ getUser: (id: string) => User }` would fail if `T.getUser` expects `(id: number) => User`. The override must match the original method signature."
      }
    ],

    senior: [
      {
        question: "What does `type PathOf<T> = T extends object ? { [K in keyof T & string]: `${K}` | PathOf<T[K]> }[keyof T & string] : never` generate?",
        options: [
          "A union of all top-level keys of T",
          "A union of all dot-notation path strings to every property at every depth in T",
          "A mapped type of T with string keys",
          "A type that validates dot-notation path strings at runtime"
        ],
        correctIndex: 1,
        explanation: "This recursive template literal type generates all valid property paths. For `{ a: { b: number } }`, it produces `'a' | 'a.b'`. Used in type-safe form libraries and configuration utilities to provide autocomplete for nested property paths."
      },
      {
        question: "Given `type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length']`, what TypeScript technique is being used?",
        options: [
          "Numeric literal type arithmetic",
          "Encoding numbers as tuple lengths and using spread to simulate addition at the type level",
          "Conditional type arithmetic",
          "Template literal number parsing"
        ],
        correctIndex: 1,
        explanation: "TypeScript doesn't support arithmetic operators in types. The workaround is to represent numbers as tuple lengths: `BuildTuple<3>` creates `[unknown, unknown, unknown]`. Concatenating two tuples and reading `.length` gives the sum — type-level arithmetic."
      },
      {
        question: "What is the key difference between how `const enum` and `as const` work at runtime?",
        options: [
          "They produce identical runtime output",
          "`const enum` values are inlined at the call site and the enum disappears; `as const` objects remain as plain objects at runtime",
          "`as const` is erased like `const enum`",
          "`const enum` creates a class; `as const` creates a frozen object"
        ],
        correctIndex: 1,
        explanation: "`const enum` values are substituted by the compiler and the enum object doesn't exist at runtime. `as const` objects ARE present at runtime as plain JavaScript objects. This is why `as const` works with `isolatedModules` (each file is standalone) while `const enum` does not."
      },
      {
        question: "In the type-safe state machine, why is `TransitionMap['delivered'] = never` important?",
        options: [
          "It marks delivered orders as deleted",
          "It means there are no valid transitions from `delivered` — calling `.transition()` on a delivered order is a compile-time error",
          "`never` is required as the last state in all state machines",
          "It prevents the order from being serialized"
        ],
        correctIndex: 1,
        explanation: "When `TransitionMap[S] = never`, the generic constraint `Next extends TransitionMap[S]` means `Next extends never`, which is unsatisfiable. TypeScript reports an error because no argument can satisfy `extends never`. This encodes terminal states in the type system."
      },
      {
        question: "What does `interface Producer<out T>` communicate about T?",
        options: [
          "T is an output and the interface is covariant in T — Producer<Dog> can be used where Producer<Animal> is expected",
          "T is an input and the interface is contravariant",
          "T can appear in both input and output positions",
          "`out` means T must be an object type"
        ],
        correctIndex: 0,
        explanation: "The `out` variance annotation marks T as covariant — T only appears in output (return) positions. This allows `Producer<Dog>` to be assignable to `Producer<Animal>` since a producer of `Dog` is also a valid producer of `Animal`. The compiler verifies T doesn't appear in input positions."
      },
      {
        question: "What makes `tsc --build` significantly different from `tsc` alone in a project with references?",
        options: [
          "They produce identical output — `--build` is just an alias",
          "`--build` understands the project reference graph and only recompiles changed packages; `tsc` alone ignores references",
          "`--build` generates better error messages",
          "`--build` enables all strict flags"
        ],
        correctIndex: 1,
        explanation: "`tsc --build` uses the project reference graph defined in `references: []` arrays. It determines which packages changed, rebuilds only those and their dependents, and uses cached `.d.ts` files for unchanged packages. `tsc` alone ignores project references entirely."
      },
      {
        question: "What is the purpose of `@typescript/analyze-trace` in a performance investigation?",
        options: [
          "It analyzes runtime performance of TypeScript-compiled code",
          "It analyzes the trace file from `--generateTrace`, showing the most expensive type instantiations and hotspots",
          "It traces import chains to find circular dependencies",
          "It generates a performance report for CI"
        ],
        correctIndex: 1,
        explanation: "`--generateTrace` captures a log of all type checker operations. `@typescript/analyze-trace` processes this log and surfaces the most expensive types, showing which generic instantiations or conditional types are causing slow type checking."
      },
      {
        question: "What is the progressive strict mode migration strategy, and why is it recommended over enabling `strict: true` immediately?",
        options: [
          "There is no difference — both approaches are equivalent",
          "Progressive strict mode enables one flag at a time (noImplicitAny first, then strictNullChecks, etc.), allowing the team to fix errors in manageable batches without blocking development",
          "Progressive mode generates fewer compile errors",
          "Progressive mode is only for JavaScript files with `allowJs`"
        ],
        correctIndex: 1,
        explanation: "Enabling `strict: true` on a large JS-to-TS migration at once can produce thousands of errors, grinding development to a halt. Progressive strict mode lets you enable one flag at a time, fixing errors in waves. This keeps the build green while making progress toward full strict mode."
      },
      {
        question: "Why does TypeScript's `strictFunctionTypes` flag make function types in property syntax safer than method syntax?",
        options: [
          "Property syntax enables covariance; method syntax enables contravariance",
          "With `strictFunctionTypes`, property function types are checked contravariantly (correct); method syntax remains bivariant for backward compatibility",
          "Method syntax is not affected by any strict flags",
          "Property syntax requires explicit return type annotations"
        ],
        correctIndex: 1,
        explanation: "`strictFunctionTypes` enables contravariant checking for function types in property positions — the correct behavior for input parameters. Method syntax (`method(): void`) is excluded for backward compatibility with many existing TypeScript patterns. This means method syntax has slightly weaker type safety."
      },
      {
        question: "In the branded `Money<Currency>` type, why is `declare const currencyBrand: unique symbol` used rather than a string property?",
        options: [
          "Symbols are faster than strings at runtime",
          "A `unique symbol` is globally unique and cannot be accidentally recreated — ensuring the brand is unforgeable from outside the module",
          "String properties would be visible in JSON serialization",
          "TypeScript requires unique symbols for all branded types"
        ],
        correctIndex: 1,
        explanation: "A `unique symbol` created with `declare const x: unique symbol` is type-incompatible with all other symbols, including other unique symbols. This makes the brand truly opaque — external code cannot accidentally satisfy it, ensuring only the module's constructor functions create valid branded values."
      },
      {
        question: "What does `isolatedDeclarations` (a newer TypeScript feature) enable for monorepo build performance?",
        options: [
          "It prevents declaration files from being generated",
          "It requires explicit return types on exported functions, enabling declaration file generation to be parallelized without type inference across files",
          "It isolates each module from the global scope",
          "It speeds up JavaScript output generation only"
        ],
        correctIndex: 1,
        explanation: "`isolatedDeclarations` requires exported functions and variables to have explicit types, so each file's declaration can be emitted independently without cross-file type analysis. This unlocks parallel declaration generation, dramatically speeding up builds in large monorepos."
      },
      {
        question: "When a type-level test uses `type Result = GetFieldType<DeepObject, 'a.b.c'>` and the expected result is `number`, how would you write the compile-time assertion?",
        options: [
          "assert(Result === number)",
          "expectTypeOf<Result>().toEqualTypeOf<number>()",
          "type Test = Result extends number ? true : false",
          "const test: Result = 0 as number"
        ],
        correctIndex: 1,
        explanation: "`expectTypeOf<Result>().toEqualTypeOf<number>()` from the `expect-type` library is the idiomatic way to write compile-time type assertions. It fails at compile time (not runtime) if the types don't match exactly — bidirectional, not just assignability."
      },
      {
        question: "What does `type Zip<A, B> = A extends [infer AH, ...infer AT] ? B extends [infer BH, ...infer BT] ? [[AH, BH], ...Zip<AT, BT>] : [] : []` demonstrate?",
        options: [
          "A union type combining A and B",
          "Recursive tuple manipulation at the type level — processing element-by-element to pair corresponding elements",
          "A mapped type over tuple indices",
          "A conditional type selecting between A and B"
        ],
        correctIndex: 1,
        explanation: "This is recursive tuple processing at the type level. The pattern destructures both tuples head/tail, pairs the heads, and recursively zips the tails. `Zip<['a','b'], [1,2]>` produces `[['a',1],['b',2]]` — all computed at compile time."
      },
      {
        question: "What is `declarationMap: true` and why is it important in a monorepo?",
        options: [
          "It maps type errors to source lines",
          "It creates source map files that link generated .d.ts files back to original .ts source files, enabling 'Go to Definition' to jump to source",
          "It generates documentation from type declarations",
          "It maps module names to file paths"
        ],
        correctIndex: 1,
        explanation: "Without `declarationMap`, 'Go to Definition' in your editor jumps to the `.d.ts` file in a referenced package's `dist` folder. With `declarationMap: true`, it follows the map back to the original `.ts` source file — a major developer experience improvement in monorepos."
      },
      {
        question: "In a migration where you cannot fix all `strictNullChecks` errors immediately, which approach is better: `// @ts-ignore` or `// @ts-expect-error`?",
        options: [
          "`@ts-ignore` is better because it's simpler",
          "`@ts-expect-error` is better because it errors when the suppression is no longer needed, preventing stale suppressions",
          "They are identical in all scenarios",
          "`@ts-expect-error` is only valid in test files"
        ],
        correctIndex: 1,
        explanation: "During migration, `@ts-expect-error` with a comment referencing a ticket is better than `@ts-ignore`. When you fix the underlying type issue, `@ts-expect-error` becomes an error itself (because there's nothing to suppress), reminding you to clean it up. `@ts-ignore` stays silently forever."
      },
      {
        question: "What is the risk of using `type SlowConfig = A & B & C & D & E` repeatedly in a large codebase?",
        options: [
          "No risk — type intersections are always evaluated instantly",
          "The intersection is re-evaluated at every usage site, which can compound into significant type-check slowdowns in large codebases",
          "The intersection creates larger JavaScript output",
          "TypeScript limits intersections to 4 members"
        ],
        correctIndex: 1,
        explanation: "Unlike `interface extends` (which is cached), type intersections are re-evaluated wherever the type is used. With many properties and widespread usage, this can substantially increase type instantiation counts and slow down the type checker."
      }
    ]
  }
};
