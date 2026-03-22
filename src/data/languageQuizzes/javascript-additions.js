// JavaScript quiz additions — 15 questions per level
// These extend the base languageQuizzes for the 'javascript' language key.

export const javascriptAdditions = {
  beginner: [
    {
      question: 'What is the output of: console.log(typeof null)?',
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correctIndex: 2,
      explanation:
        'typeof null returns "object" — a well-known historical quirk in JavaScript. null is its own primitive type, but the typeof operator has returned "object" for it since the language was first created.',
    },
    {
      question: 'Which variable declaration is block-scoped and cannot be reassigned?',
      options: ['var', 'let', 'const', 'function'],
      correctIndex: 2,
      explanation:
        'const is block-scoped and cannot be reassigned after declaration. Note that for objects and arrays, const only prevents reassignment of the binding — the contents can still be mutated.',
    },
    {
      question: 'What does Array.prototype.filter() return?',
      options: [
        'The first element that matches the condition',
        'A new array with all elements that pass the test function',
        'The index of the matching element',
        'A boolean indicating whether any element matched',
      ],
      correctIndex: 1,
      explanation:
        'filter() creates a new array containing all elements for which the callback function returns true. It does not mutate the original array.',
    },
    {
      question: 'What is the output of: console.log(0.1 + 0.2 === 0.3)?',
      options: ['true', 'false', 'undefined', 'TypeError'],
      correctIndex: 1,
      explanation:
        '0.1 + 0.2 produces 0.30000000000000004 due to IEEE 754 floating-point precision. The comparison with 0.3 returns false. To compare floating-point numbers safely, use a tolerance check like Math.abs(a - b) < Number.EPSILON.',
    },
    {
      question: 'What does the spread operator (...) do when used with an array?',
      options: [
        'It reverses the array',
        'It creates a shallow copy and expands the array into individual elements',
        'It deep clones the array and all nested objects',
        'It converts the array to a string',
      ],
      correctIndex: 1,
      explanation:
        'The spread operator (...) expands an iterable into individual elements. For arrays, [...arr] creates a shallow copy — nested objects still share references with the original.',
    },
    {
      question: 'What is the output of: console.log("5" + 3)?',
      options: ['"53"', '8', 'NaN', 'TypeError'],
      correctIndex: 0,
      explanation:
        'When one operand of the + operator is a string, JavaScript coerces the other operand to a string and performs concatenation. "5" + 3 becomes "5" + "3", which produces "53".',
    },
    {
      question: 'What is the output of: console.log("5" - 3)?',
      options: ['"53"', '2', 'NaN', 'TypeError'],
      correctIndex: 1,
      explanation:
        'The - operator is only defined for numbers, so JavaScript coerces "5" to the number 5. Then 5 - 3 evaluates to 2. This is different from + which also serves as string concatenation.',
    },
    {
      question: 'Which method adds one or more elements to the end of an array and returns the new length?',
      options: ['push()', 'pop()', 'unshift()', 'concat()'],
      correctIndex: 0,
      explanation:
        'push() adds elements to the end of an array and returns the new length. pop() removes the last element, unshift() adds to the beginning, and concat() returns a new array without mutating the original.',
    },
    {
      question: 'What is the difference between == and === in JavaScript?',
      options: [
        'There is no difference — they are interchangeable',
        '== compares value only; === compares value and type without coercion',
        '=== is slower but more accurate',
        '== only works with strings; === works with all types',
      ],
      correctIndex: 1,
      explanation:
        '== (loose equality) performs type coercion before comparing, so "5" == 5 is true. === (strict equality) compares both value and type with no coercion, so "5" === 5 is false. Best practice is to use === to avoid unexpected coercion bugs.',
    },
    {
      question: 'What does document.querySelector(".myClass") return?',
      options: [
        'All elements with that class as a NodeList',
        'The first element that matches the CSS selector',
        'An array of matching elements',
        'A boolean indicating whether the selector exists',
      ],
      correctIndex: 1,
      explanation:
        'document.querySelector() returns the first element within the document that matches the specified CSS selector. To get all matching elements, use document.querySelectorAll() instead, which returns a NodeList.',
    },
    {
      question: 'What is the output of: console.log(typeof undefined)?',
      options: ['"null"', '"undefined"', '"object"', '"NaN"'],
      correctIndex: 1,
      explanation:
        'typeof undefined correctly returns the string "undefined". This is one of the reliable typeof checks, unlike typeof null which returns "object".',
    },
    {
      question: 'Which of these is the correct arrow function syntax for a single-expression function?',
      options: [
        'const add = (a, b) => { a + b }',
        'const add = (a, b) => a + b',
        'const add = (a, b) -> a + b',
        'const add = function(a, b) => a + b',
      ],
      correctIndex: 1,
      explanation:
        'Arrow functions with a single expression can omit the curly braces and the return keyword — the expression is implicitly returned. If you include curly braces, you must explicitly write return.',
    },
    {
      question: 'What does JSON.parse() do?',
      options: [
        'Converts a JavaScript object to a JSON string',
        'Parses a JSON string and constructs the corresponding JavaScript value or object',
        'Validates whether a string is valid JSON without parsing it',
        'Converts a JavaScript function to a storable string',
      ],
      correctIndex: 1,
      explanation:
        'JSON.parse() takes a JSON-formatted string and converts it into a JavaScript object, array, or primitive. Its counterpart JSON.stringify() does the reverse — converting a JavaScript value to a JSON string.',
    },
    {
      question: 'What is the output of: console.log([1, 2, 3].map(x => x * 2))?',
      options: ['[1, 2, 3]', '[2, 4, 6]', '6', 'undefined'],
      correctIndex: 1,
      explanation:
        'map() creates a new array by calling the provided function on every element of the original array. Here each element is doubled, producing [2, 4, 6]. The original array is not mutated.',
    },
    {
      question: 'What is the purpose of template literals (backtick strings) in JavaScript?',
      options: [
        'They are identical to single-quoted strings',
        'They allow embedded expressions via ${}, multi-line strings, and tagged template functionality',
        'They automatically escape HTML characters',
        'They are only used for regular expressions',
      ],
      correctIndex: 1,
      explanation:
        'Template literals (enclosed in backticks) support string interpolation with ${expression}, multi-line strings without escape characters, and tagged templates for advanced string processing. They were introduced in ES6.',
    },
  ],
  mid: [
    {
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that immediately invokes itself',
        'A function that has access to variables from its outer scope, even after the outer function has returned',
        'A way to prevent a function from being called more than once',
        'A method for closing open network connections',
      ],
      correctIndex: 1,
      explanation:
        'A closure is a function that "remembers" the variables from the lexical scope in which it was defined. This works because inner functions maintain a reference to their outer scope even after the outer function has finished executing.',
    },
    {
      question:
        'Given: const p = Promise.all([fetch("/a"), fetch("/b")]); what does Promise.all do if one request fails?',
      options: [
        'It returns the results from the successful requests only',
        'It waits for all requests and collects both successes and failures',
        'It rejects immediately with the error from the first failed request',
        'It retries the failed request automatically',
      ],
      correctIndex: 2,
      explanation:
        'Promise.all rejects immediately ("fail fast") when any promise in the array rejects. Use Promise.allSettled instead if you want all results regardless of individual failures.',
    },
    {
      question: 'What is the purpose of the # prefix on a class field (e.g., #count)?',
      options: [
        'It marks the field as static so it belongs to the class, not the instance',
        'It makes the field truly private — inaccessible outside the class at the language level',
        'It is a naming convention signaling the field should not be accessed externally',
        'It makes the field read-only',
      ],
      correctIndex: 1,
      explanation:
        'The # prefix creates a genuinely private field enforced by the JavaScript engine. Unlike the underscore naming convention, accessing #field from outside the class causes a SyntaxError — there is no workaround.',
    },
    {
      question: 'What is the output of: const a = [1, 2, 3]; const b = a; b.push(4); console.log(a.length)?',
      options: ['3', '4', 'undefined', 'TypeError'],
      correctIndex: 1,
      explanation:
        'Arrays are reference types in JavaScript. Assigning const b = a does not copy the array — both a and b point to the same array in memory. Pushing to b also modifies a, so a.length is 4.',
    },
    {
      question: 'What does the async keyword do when placed before a function declaration?',
      options: [
        'It makes the function run in a separate thread',
        'It ensures the function always returns a Promise, and allows the use of await inside it',
        'It schedules the function to run after the current call stack clears',
        'It converts the function into a generator',
      ],
      correctIndex: 1,
      explanation:
        'An async function always wraps its return value in a Promise. Inside an async function, you can use await to pause execution until a Promise settles, making asynchronous code read like synchronous code. It does not create a new thread — JavaScript remains single-threaded.',
    },
    {
      question: 'What is the output of: console.log([..."hello"])?',
      options: ['["hello"]', '["h", "e", "l", "l", "o"]', '"hello"', 'TypeError'],
      correctIndex: 1,
      explanation:
        'The spread operator works on any iterable. Strings are iterable, so spreading a string inside an array literal creates an array of individual characters: ["h", "e", "l", "l", "o"].',
    },
    {
      question: 'What is the purpose of Object.freeze()?',
      options: [
        'It prevents the object from being garbage collected',
        'It makes the object and its properties immutable — you cannot add, remove, or modify properties',
        'It deep-freezes the object and all nested objects',
        'It locks the object so only the original creator can modify it',
      ],
      correctIndex: 1,
      explanation:
        'Object.freeze() makes an object shallowly immutable: existing properties cannot be changed, and new properties cannot be added. However, it is shallow — nested objects within a frozen object can still be mutated unless they are also frozen.',
    },
    {
      question: 'What is event delegation and why is it useful?',
      options: [
        'It is a pattern where you assign one event listener to a parent element instead of individual listeners on each child, using event bubbling to handle events from descendants',
        'It is a way to cancel events from propagating down the DOM tree',
        'It is a technique for delegating events to Web Workers for better performance',
        'It is a pattern where events are stored in a queue and processed in batch',
      ],
      correctIndex: 0,
      explanation:
        'Event delegation leverages event bubbling: you attach a single listener to a parent element, then use event.target to determine which child triggered the event. This is more efficient than adding listeners to hundreds of child elements, and it automatically handles dynamically added children.',
    },
    {
      question: 'What is the output of: const { a: x, b: y = 10 } = { a: 5 }; console.log(x, y)?',
      options: ['5 undefined', '5 10', 'undefined 10', 'TypeError'],
      correctIndex: 1,
      explanation:
        'Destructuring with { a: x } assigns the value of property a to a new variable named x (5). The default value b: y = 10 kicks in because b is not present in the source object, so y is 10. The output is 5 10.',
    },
    {
      question: 'What does the nullish coalescing operator (??) do?',
      options: [
        'It is identical to the logical OR (||) operator',
        'It returns the right-hand operand only when the left-hand operand is null or undefined, not for other falsy values like 0 or ""',
        'It throws an error if the left-hand operand is null',
        'It converts null and undefined to false',
      ],
      correctIndex: 1,
      explanation:
        'The ?? operator returns the right side only when the left side is null or undefined. Unlike ||, which treats 0, "", false, and NaN as falsy and falls through, ?? preserves those values. For example: 0 ?? 42 returns 0, but 0 || 42 returns 42.',
    },
    {
      question: 'What is the output of: const fn = () => { return { name: "JS" }; }; console.log(fn())?',
      options: ['undefined', '{ name: "JS" }', 'null', 'SyntaxError'],
      correctIndex: 1,
      explanation:
        'The function has an explicit return statement with the opening brace on the same line as return, so it correctly returns the object. A common pitfall is putting the opening brace on the next line after return, which causes automatic semicolon insertion to return undefined.',
    },
    {
      question: 'What is the difference between Array.from() and the spread operator for converting a NodeList to an array?',
      options: [
        'There is no difference — both produce an identical array',
        'Array.from() can accept a mapping function as a second argument, while the spread operator cannot',
        'The spread operator deep copies DOM nodes; Array.from() does not',
        'Array.from() only works with arrays, not NodeLists',
      ],
      correctIndex: 1,
      explanation:
        'Both Array.from(nodeList) and [...nodeList] convert a NodeList to an array. The key advantage of Array.from() is its optional second argument — a map function — allowing you to transform elements during conversion: Array.from(nodeList, el => el.textContent).',
    },
    {
      question: 'What does addEventListener\'s third parameter { once: true } do?',
      options: [
        'It ensures the listener fires only once per event type, then automatically removes itself',
        'It makes the event handler run in the capturing phase only once',
        'It delays the event handler by one event loop tick',
        'It limits the event to one target element',
      ],
      correctIndex: 0,
      explanation:
        'Passing { once: true } as the options parameter means the listener will be invoked at most once after being added. After it fires, the browser automatically calls removeEventListener for you. This is useful for one-time setup tasks like lazy loading.',
    },
    {
      question: 'What is the output of: Promise.resolve(1).then(x => x + 1).then(x => { console.log(x) })?',
      options: ['1', '2', 'undefined', 'Promise { 2 }'],
      correctIndex: 1,
      explanation:
        'Promise.resolve(1) creates a resolved promise with value 1. The first .then() receives 1, returns 2. The second .then() receives 2 and logs it. Promise chains pass the return value of each .then() callback to the next one.',
    },
    {
      question: 'What is the purpose of the optional chaining operator (?.)?',
      options: [
        'It creates optional function parameters',
        'It safely accesses deeply nested object properties, returning undefined instead of throwing a TypeError if an intermediate property is null or undefined',
        'It makes any variable optional and nullable',
        'It is shorthand for a try-catch block',
      ],
      correctIndex: 1,
      explanation:
        'Optional chaining (?.) short-circuits to undefined if the value before ?. is null or undefined, instead of throwing a TypeError. For example, user?.address?.city safely returns undefined if user or address is null/undefined.',
    },
  ],
  senior: [
    {
      question: 'In what order does this code log? setTimeout(() => log("A"), 0); Promise.resolve().then(() => log("B")); log("C");',
      options: [
        'A, B, C',
        'C, A, B',
        'C, B, A',
        'B, C, A',
      ],
      correctIndex: 2,
      explanation:
        'C logs first (synchronous). Then B logs (Promise.then callbacks are microtasks and drain before any macrotask). Then A logs (setTimeout callbacks are macrotasks, processed after all microtasks clear).',
    },
    {
      question: 'Which of the following is the most correct description of why a while(true) loop blocks browser rendering?',
      options: [
        'The browser pauses rendering to save CPU while JavaScript is running',
        'The JavaScript engine locks the GPU during execution',
        'Rendering is queued as a task, and the event loop cannot process new tasks until the call stack empties',
        'The while loop consumes all available memory, preventing the render thread from running',
      ],
      correctIndex: 2,
      explanation:
        'The browser queues render steps similarly to tasks. The event loop can only process render steps and other callbacks when the call stack is empty. An infinite synchronous loop keeps the stack occupied forever, starving all other work.',
    },
    {
      question: 'Why should you use WeakMap instead of Map when storing metadata keyed by DOM elements or other objects?',
      options: [
        'WeakMap has faster lookup times for all key types',
        'WeakMap keys must be strings, which is safer for DOM elements',
        'WeakMap holds weak references to its keys, allowing the garbage collector to reclaim objects even when they appear in the map',
        'WeakMap is iterable, making it easier to clean up entries manually',
      ],
      correctIndex: 2,
      explanation:
        'WeakMap holds weak (non-preventing) references to its keys. When a key object is garbage collected, the corresponding WeakMap entry is automatically removed. This prevents memory leaks when caching metadata about objects that may be removed from the DOM.',
    },
    {
      question: 'What is the output of: async function foo() { return 1; } console.log(foo())?',
      options: ['1', 'Promise { 1 }', 'undefined', 'Promise { <pending> }'],
      correctIndex: 3,
      explanation:
        'An async function always returns a Promise. When you log the result of foo() without awaiting it, you see Promise { <pending> }. The promise resolves to 1, but console.log runs synchronously before the microtask that resolves the internal value is processed.',
    },
    {
      question: 'What does the following code produce? const obj = {}; obj[{}] = "A"; obj[{x:1}] = "B"; console.log(obj[{}])',
      options: ['"A"', '"B"', 'undefined', 'TypeError'],
      correctIndex: 1,
      explanation:
        'Object keys are strings. When you use an object as a key, JavaScript calls toString() on it, which returns "[object Object]" for all plain objects. Both {} and {x:1} produce the same key string, so the second assignment overwrites the first. obj[{}] returns "B".',
    },
    {
      question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
      options: [
        'The time between garbage collection cycles',
        'The period between entering a block scope and the point where a let or const variable is declared, during which accessing the variable throws a ReferenceError',
        'The time a Promise spends in the pending state',
        'The delay between a setTimeout call and its callback execution',
      ],
      correctIndex: 1,
      explanation:
        'let and const declarations are hoisted to the top of their block scope but are not initialized until the declaration is evaluated. Accessing them before that point throws a ReferenceError. This uninitialized region is called the Temporal Dead Zone.',
    },
    {
      question: 'What is the output of: for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }',
      options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'],
      correctIndex: 1,
      explanation:
        'var is function-scoped, not block-scoped. By the time the setTimeout callbacks run, the for loop has finished and i is 3. All three callbacks close over the same i variable. Using let instead of var would create a new binding per iteration, logging 0, 1, 2.',
    },
    {
      question: 'What is the difference between Object.create(null) and a regular object literal {}?',
      options: [
        'There is no difference',
        'Object.create(null) creates an object with no prototype chain at all — it has no inherited methods like toString or hasOwnProperty',
        'Object.create(null) creates a frozen object',
        '{} has no prototype; Object.create(null) inherits from Object.prototype',
      ],
      correctIndex: 1,
      explanation:
        'Object.create(null) creates a truly empty object with no prototype. This means it has no inherited properties like toString, valueOf, or hasOwnProperty. It is useful for creating clean dictionary-like objects where you do not want prototype pollution.',
    },
    {
      question: 'What happens when you call generator.return(value) on a running generator?',
      options: [
        'It throws a TypeError because generators cannot be stopped externally',
        'It resumes the generator and passes value as the result of the current yield',
        'It forces the generator to finish, returning { value: value, done: true }, and any finally blocks in the generator still execute',
        'It resets the generator to its initial state',
      ],
      correctIndex: 2,
      explanation:
        'Calling return(value) on a generator forces it into a completed state, returning { value, done: true }. If the generator has a try-finally block, the finally block still executes before completion. This is useful for cleanup when you want to stop iteration early.',
    },
    {
      question: 'What is the output of: console.log(typeof NaN)?',
      options: ['"NaN"', '"undefined"', '"number"', '"object"'],
      correctIndex: 2,
      explanation:
        'Despite standing for "Not a Number", NaN is of type "number" in JavaScript. This is because NaN is defined as a special IEEE 754 floating-point value. Use Number.isNaN() (not the global isNaN()) to reliably check for NaN.',
    },
    {
      question: 'What does structuredClone() provide that JSON.parse(JSON.stringify()) does not?',
      options: [
        'Better performance on small objects',
        'Support for cloning Date objects, RegExp, Map, Set, ArrayBuffer, and circular references',
        'The ability to clone functions and class instances with methods',
        'Automatic type validation during cloning',
      ],
      correctIndex: 1,
      explanation:
        'structuredClone() uses the structured clone algorithm, which correctly handles Date, RegExp, Map, Set, ArrayBuffer, and even circular references — all of which JSON.parse(JSON.stringify()) loses or throws on. Neither approach can clone functions.',
    },
    {
      question: 'In a JavaScript module (ESM), what is the difference between a default export and a named export regarding live bindings?',
      options: [
        'Default exports are live bindings; named exports are static snapshots',
        'Named exports are live bindings — if the exporting module updates the value, the importing module sees the change. Default exports of primitives are also live.',
        'Neither has live bindings — both are copied at import time',
        'Only re-exports create live bindings',
      ],
      correctIndex: 1,
      explanation:
        'ES modules create live bindings for all exports (named and default). When the exporting module reassigns a named export, all importers see the updated value. This is fundamentally different from CommonJS require(), which copies the value at the time of import.',
    },
    {
      question: 'What is the output of: Promise.resolve().then(() => console.log(1)).then(() => console.log(2)); Promise.resolve().then(() => console.log(3)).then(() => console.log(4));',
      options: ['1, 2, 3, 4', '1, 3, 2, 4', '3, 1, 4, 2', 'The order is nondeterministic'],
      correctIndex: 1,
      explanation:
        'Microtasks are processed in FIFO order. First, both initial .then() callbacks (logging 1 and 3) are queued. The microtask queue drains: log 1, which queues the callback logging 2. Then log 3, which queues the callback logging 4. Then log 2, then log 4. Result: 1, 3, 2, 4.',
    },
    {
      question: 'What is the purpose of the AbortController API?',
      options: [
        'It cancels JavaScript execution to prevent infinite loops',
        'It provides a signal that can be used to abort asynchronous operations like fetch requests, event listeners, or streams',
        'It is used to terminate Web Workers',
        'It catches and aborts uncaught promise rejections',
      ],
      correctIndex: 1,
      explanation:
        'AbortController creates a signal object that you can pass to fetch(), addEventListener(), or any API that accepts an AbortSignal. Calling controller.abort() causes the associated operation to cancel, rejecting the fetch promise with an AbortError. This is the standard mechanism for cancellation in JavaScript.',
    },
    {
      question: 'What problem does the Proxy object solve in JavaScript, and what is a common use case?',
      options: [
        'It proxies network requests through a server for CORS compliance',
        'It intercepts and redefines fundamental operations on objects (get, set, has, deleteProperty, etc.), enabling patterns like reactive data binding, validation, and logging',
        'It creates a deep copy of an object that stays synchronized with the original',
        'It provides type safety similar to TypeScript at runtime',
      ],
      correctIndex: 1,
      explanation:
        'Proxy wraps an object with custom traps for fundamental operations. For example, a set trap can validate values before assignment, a get trap can implement lazy loading or reactivity (as in Vue 3), and a has trap can customize the in operator. Proxies are the foundation of many modern reactivity systems.',
    },
  ],
};
