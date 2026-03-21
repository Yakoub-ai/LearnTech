export const topicQuizzes = {
  beginner: [
    {
      topicId: "variables-and-data-types",
      topicTitle: "Variables and Data Types",
      objectiveIndex: 0,
      questions: [
        {
          question: "Which keyword should you use by default when declaring a variable in modern JavaScript?",
          options: ["var", "let", "const", "global"],
          correctIndex: 2,
          explanation: "`const` should be the default choice because it prevents reassignment and signals that the binding is stable. Only reach for `let` when you specifically need to reassign the variable."
        },
        {
          question: "What does `typeof null` return in JavaScript?",
          options: ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""],
          correctIndex: 2,
          explanation: "`typeof null` returns `\"object\"` — this is a well-known historical bug in JavaScript. `null` is its own primitive type, not an object, but the bug was never fixed to avoid breaking existing code."
        },
        {
          question: "What is the output of `console.log(\"5\" + 3)` in JavaScript?",
          options: ["8", "\"53\"", "\"8\"", "NaN"],
          correctIndex: 1,
          explanation: "The `+` operator with a string operand performs string concatenation. `\"5\" + 3` coerces the number 3 to `\"3\"` and concatenates, producing `\"53\"`."
        },
        {
          question: "Which statement about `const` is correct?",
          options: [
            "`const` variables cannot be declared inside blocks",
            "`const` prevents both reassignment and mutation of objects",
            "`const` variables are block-scoped and cannot be reassigned",
            "`const` is hoisted as `undefined` just like `var`"
          ],
          correctIndex: 2,
          explanation: "`const` is block-scoped and prevents the variable binding from being reassigned. However, if the value is an object or array, its contents can still be mutated — `const` only locks the binding."
        },
        {
          question: "What is the Temporal Dead Zone (TDZ)?",
          options: [
            "A period during which `var` declarations are inaccessible",
            "The period between the start of a block and a `let`/`const` declaration, during which accessing the variable throws a ReferenceError",
            "A browser API delay before script execution",
            "The time between a Promise being created and resolved"
          ],
          correctIndex: 1,
          explanation: "The TDZ is the region from the start of the block scope until the `let` or `const` declaration is encountered. Accessing the variable in this zone throws a `ReferenceError`, unlike `var` which would return `undefined`."
        },
        {
          question: "How should you correctly check if a value is `NaN`?",
          options: ["value === NaN", "value == NaN", "Number.isNaN(value)", "typeof value === 'NaN'"],
          correctIndex: 2,
          explanation: "`NaN` is the only value in JavaScript that is not equal to itself, so `NaN === NaN` is `false`. Always use `Number.isNaN(value)` for a reliable check."
        },
        {
          question: "What is the difference between `==` and `===` in JavaScript?",
          options: [
            "They are identical; `===` is just an alias for `==`",
            "`==` checks value and type; `===` checks value only",
            "`==` performs type coercion before comparing; `===` requires both value and type to match",
            "`===` only works for primitive types"
          ],
          correctIndex: 2,
          explanation: "Loose equality (`==`) coerces operands to the same type before comparing, which can produce surprising results like `0 == false` being `true`. Strict equality (`===`) requires both value and type to match with no coercion."
        },
        {
          question: "What scope does `var` use?",
          options: ["Block scope", "Module scope", "Function scope", "Global scope only"],
          correctIndex: 2,
          explanation: "`var` is function-scoped, meaning it is accessible throughout the entire function it is declared in (or globally if declared outside any function). It ignores `if` blocks and `for` loops, which is why it causes bugs."
        }
      ]
    },
    {
      topicId: "functions-and-scope",
      topicTitle: "Functions and Scope",
      objectiveIndex: 2,
      questions: [
        {
          question: "Which type of function is hoisted and can be called before its definition in the source file?",
          options: ["Arrow function", "Function expression", "Function declaration", "Immediately Invoked Function Expression (IIFE)"],
          correctIndex: 2,
          explanation: "Function declarations are fully hoisted — both the name and the function body. Function expressions and arrow functions assigned to variables are not hoisted (they only hoist the variable binding as `undefined`)."
        },
        {
          question: "What is a closure in JavaScript?",
          options: [
            "A function that has no parameters",
            "A function that remembers variables from the scope it was defined in, even after that outer scope has finished executing",
            "A function that is called immediately after being defined",
            "A function that cannot access global variables"
          ],
          correctIndex: 1,
          explanation: "A closure is a function that retains access to its lexical scope (the variables from the outer function where it was created), even after the outer function has returned. This is how React hooks and module patterns work."
        },
        {
          question: "What is a key difference between arrow functions and regular functions regarding `this`?",
          options: [
            "Arrow functions create their own `this` binding; regular functions inherit from the enclosing scope",
            "Arrow functions do not have their own `this` binding; they inherit `this` from the enclosing lexical scope",
            "Arrow functions and regular functions behave identically with `this`",
            "Arrow functions always bind `this` to `window`"
          ],
          correctIndex: 1,
          explanation: "Arrow functions do not have their own `this`. They capture `this` from the surrounding lexical scope at the time they are defined. This makes them unsuitable as object methods when you need `this` to refer to the object."
        },
        {
          question: "What does the rest parameter syntax (`...numbers`) do in a function definition?",
          options: [
            "Spreads an array into individual arguments",
            "Collects all remaining arguments into an array",
            "Makes all parameters optional",
            "Limits the function to accepting only three arguments"
          ],
          correctIndex: 1,
          explanation: "The rest parameter syntax (`...name`) gathers all remaining arguments passed to the function into a real array. It must be the last parameter in the function signature."
        },
        {
          question: "What happens if you use an arrow function as an object method and reference `this`?",
          options: [
            "`this` refers to the object, as expected",
            "`this` refers to the enclosing scope at definition time, which is usually the global scope or the outer function — not the object",
            "It throws a TypeError",
            "`this` is `undefined` in strict mode only"
          ],
          correctIndex: 1,
          explanation: "Arrow functions inherit `this` from the lexical scope where they were defined. When defined as a method in an object literal, `this` is not the object — it is the surrounding scope (often `window` or the module scope)."
        },
        {
          question: "In the closure example `createCounter()`, why is `count` inaccessible from outside?",
          options: [
            "Because `count` is declared with `const`",
            "Because JavaScript uses private class fields for it",
            "Because the inner functions form a closure over `count`, and there is no direct reference to it from outside the returned object",
            "Because `count` is a prototype property"
          ],
          correctIndex: 2,
          explanation: "The `count` variable lives in `createCounter`'s local scope. The returned object's methods close over that variable, but outside code has no reference to it — providing true encapsulation through the closure pattern."
        },
        {
          question: "What is the output of `createCounter().getCount()` after calling `increment()` twice and `decrement()` once?",
          options: ["0", "1", "2", "3"],
          correctIndex: 1,
          explanation: "Starting at 0: two increments bring it to 2, then one decrement brings it back to 1. `getCount()` returns the current value of the closed-over `count` variable."
        }
      ]
    },
    {
      topicId: "arrays-and-objects",
      topicTitle: "Arrays and Objects",
      objectiveIndex: 3,
      questions: [
        {
          question: "Which array method transforms each element and returns a new array without mutating the original?",
          options: [".sort()", ".splice()", ".map()", ".push()"],
          correctIndex: 2,
          explanation: "`.map(fn)` applies the callback to every element and returns a new array. The original array is never mutated. `.sort()` and `.splice()` both mutate in place."
        },
        {
          question: "What is the danger of calling `.sort()` on an array of numbers without a comparator?",
          options: [
            "It throws a TypeError",
            "It sorts numerically in ascending order, which is what you want",
            "It sorts lexicographically, so `[10, 2, 1].sort()` gives `[1, 10, 2]` instead of `[1, 2, 10]`",
            "It mutates the array into a Set"
          ],
          correctIndex: 2,
          explanation: "Without a comparator, `.sort()` converts elements to strings and sorts them lexicographically. For numbers, this means `10` comes before `2` because `\"1\" < \"2\"`. Always pass a comparator: `(a, b) => a - b`."
        },
        {
          question: "What does the spread operator (`...`) do when used with an array?",
          options: [
            "Converts the array to a Set",
            "Deeply clones all nested objects",
            "Creates a shallow copy or merges arrays into a new array",
            "Freezes the array against mutation"
          ],
          correctIndex: 2,
          explanation: "Spread creates a shallow copy of an array or expands it into individual elements. For nested arrays/objects, the inner references are still shared — it is not a deep clone."
        },
        {
          question: "What does optional chaining (`?.`) do when the intermediate value is `null` or `undefined`?",
          options: [
            "Throws a TypeError",
            "Returns `null`",
            "Returns `undefined` instead of throwing an error",
            "Returns `false`"
          ],
          correctIndex: 2,
          explanation: "Optional chaining short-circuits and returns `undefined` when the value to the left of `?.` is `null` or `undefined`. This eliminates the need for nested `if (x && x.y && x.y.z)` guards."
        },
        {
          question: "What is the difference between `||` and `??` for providing a default value?",
          options: [
            "They are identical",
            "`||` falls back when the left side is falsy (includes `0`, `\"\"`, `false`); `??` only falls back when `null` or `undefined`",
            "`??` falls back when falsy; `||` falls back only for `null`",
            "`||` is deprecated in favor of `??`"
          ],
          correctIndex: 1,
          explanation: "The `||` operator treats any falsy value (including `0`, `false`, empty string) as a trigger to use the fallback. The `??` nullish coalescing operator only falls back for `null` and `undefined`, so `0 ?? 5` correctly gives `0`."
        },
        {
          question: "What does `Object.entries(user)` return?",
          options: [
            "An array of just the keys",
            "An array of just the values",
            "An array of `[key, value]` pairs",
            "A new object with swapped keys and values"
          ],
          correctIndex: 2,
          explanation: "`Object.entries()` returns an array of `[key, value]` pairs for each own enumerable property of the object. This is useful for iterating over an object with destructuring in a `for...of` loop."
        },
        {
          question: "How do you safely check if an object has a property as its own (not inherited) property?",
          options: [
            "obj.property !== undefined",
            "typeof obj.property !== 'undefined'",
            "Object.hasOwn(obj, 'property')",
            "obj.prototype.hasOwnProperty('property')"
          ],
          correctIndex: 2,
          explanation: "`Object.hasOwn(obj, key)` is the modern way to check for own properties. The older `obj.hasOwnProperty(key)` can be shadowed by object properties, making it unsafe. `'key' in obj` also checks prototype properties."
        }
      ]
    },
    {
      topicId: "control-flow",
      topicTitle: "Control Flow",
      objectiveIndex: 4,
      questions: [
        {
          question: "Why should you use `for...of` instead of `for...in` to iterate over an array?",
          options: [
            "`for...of` is slower but more readable",
            "`for...in` iterates over string keys and can include prototype properties, while `for...of` iterates over the actual values",
            "`for...in` only works on objects with numeric keys",
            "They are interchangeable for arrays"
          ],
          correctIndex: 1,
          explanation: "`for...in` iterates over all enumerable string keys including inherited ones from the prototype chain. For arrays this means you get string indices like `\"0\"`, `\"1\"` and potentially inherited methods. `for...of` iterates values directly and is correct for arrays."
        },
        {
          question: "What is the purpose of the `break` statement in a `switch` block?",
          options: [
            "It exits the entire function",
            "It prevents fall-through to the next `case` block",
            "It skips to the `default` case",
            "It is optional and has no effect"
          ],
          correctIndex: 1,
          explanation: "Without `break`, a `switch` statement falls through from the matched `case` into subsequent cases, executing all of their code. `break` exits the `switch` block after the matched case completes."
        },
        {
          question: "Given `config?.theme ?? \"light\"`, what is returned when `config` is `null`?",
          options: ["null", "undefined", "\"light\"", "TypeError is thrown"],
          correctIndex: 2,
          explanation: "Optional chaining `config?.theme` returns `undefined` when `config` is `null`. Then `undefined ?? \"light\"` evaluates to `\"light\"` because `??` falls back for `null` or `undefined`."
        },
        {
          question: "What is an \"early return\" pattern and why is it preferred?",
          options: [
            "Returning a value before the function body starts — it is a performance trick",
            "Handling edge cases and invalid inputs first with `return`, so the main logic runs without deep nesting",
            "Using `return` inside `for` loops to break out early",
            "Calling a function before it is declared"
          ],
          correctIndex: 1,
          explanation: "Early returns check for guard conditions (null inputs, empty arrays, permission failures) at the top of a function and return immediately. This keeps the happy path at the lowest indentation level, making code much easier to read."
        },
        {
          question: "What is the value of `username` given `const username = 0 || \"Guest\"`?",
          options: ["0", "\"Guest\"", "null", "\"0\""],
          correctIndex: 1,
          explanation: "`0` is falsy, so the `||` operator returns the right-hand side `\"Guest\"`. If you wanted `0` to be a valid value, you would use `??` instead: `0 ?? \"Guest\"` returns `0`."
        }
      ]
    },
    {
      topicId: "dom-manipulation",
      topicTitle: "DOM Manipulation",
      objectiveIndex: 5,
      questions: [
        {
          question: "Why should you use `textContent` instead of `innerHTML` when inserting user-provided text?",
          options: [
            "`textContent` is faster to type",
            "`innerHTML` does not work in all browsers",
            "`textContent` treats the value as plain text with no HTML parsing, preventing XSS attacks",
            "`innerHTML` automatically escapes special characters"
          ],
          correctIndex: 2,
          explanation: "`textContent` inserts the value as a raw string with no HTML interpretation, so injected `<script>` tags or event handlers cannot execute. Using `innerHTML` with unsanitized user input is one of the most common XSS vulnerabilities in web applications."
        },
        {
          question: "What does `document.querySelectorAll('.list-item')` return?",
          options: [
            "An Array of elements",
            "The first matching element",
            "A static NodeList of all matching elements",
            "A live HTMLCollection"
          ],
          correctIndex: 2,
          explanation: "`querySelectorAll` returns a static NodeList, which does not update when the DOM changes. It is not a real Array, so you cannot call `.map()` on it directly — convert with `Array.from()` first."
        },
        {
          question: "Which method is the modern, clean way to remove an element from the DOM?",
          options: ["element.parentNode.removeChild(element)", "element.remove()", "document.deleteElement(element)", "element.destroy()"],
          correctIndex: 1,
          explanation: "`element.remove()` is the modern method that removes the element directly without needing a reference to its parent. The older pattern `parentNode.removeChild(element)` still works but is more verbose."
        },
        {
          question: "How do you add a CSS class to an element using the DOM API?",
          options: [
            "element.class += ' active'",
            "element.style.class = 'active'",
            "element.classList.add('active')",
            "element.setAttribute('class', 'active')"
          ],
          correctIndex: 2,
          explanation: "`classList.add()` is the correct method. It safely appends a class without overwriting existing ones. `element.class` is not a valid property; `setAttribute('class', ...)` replaces all existing classes."
        },
        {
          question: "When should you wait for `DOMContentLoaded` before running DOM manipulation code?",
          options: [
            "Never — DOM is always available",
            "Only when using `querySelector`",
            "When your script is in the `<head>` and runs before the HTML body has been parsed",
            "Only in Internet Explorer"
          ],
          correctIndex: 2,
          explanation: "If a script runs before the HTML is parsed, DOM elements do not yet exist and methods like `getElementById` return `null`. Placing scripts at the bottom of `<body>` or using `DOMContentLoaded` ensures the DOM is ready."
        }
      ]
    },
    {
      topicId: "events",
      topicTitle: "Events",
      objectiveIndex: 6,
      questions: [
        {
          question: "What does `e.preventDefault()` do inside a form submit handler?",
          options: [
            "Stops the event from firing",
            "Removes the event listener",
            "Prevents the browser's default action — in this case, submitting the form and reloading the page",
            "Prevents other listeners on the same element from running"
          ],
          correctIndex: 2,
          explanation: "`preventDefault()` cancels the browser's built-in behavior for that event. For a form submit, this means the page does not reload and the form data is not sent to the server, allowing you to handle submission with JavaScript."
        },
        {
          question: "What is event delegation?",
          options: [
            "Adding the same listener to every child element individually",
            "Attaching a single listener on a parent element and using `e.target` to identify which child was interacted with",
            "Using `CustomEvent` to dispatch events programmatically",
            "Removing event listeners after they fire once"
          ],
          correctIndex: 1,
          explanation: "Event delegation uses event bubbling: a click on a child bubbles up to the parent. By listening on the parent and checking `e.target.matches()`, you handle all current and future children with one listener."
        },
        {
          question: "Why does `removeEventListener` fail when the handler was added as an inline arrow function?",
          options: [
            "Arrow functions cannot be event handlers",
            "Each arrow function expression creates a new function reference, so the reference passed to `removeEventListener` is a different object",
            "`removeEventListener` only works with named functions",
            "The browser garbage-collects arrow function listeners automatically"
          ],
          correctIndex: 1,
          explanation: "To remove a listener, you must pass the exact same function reference that was added. Inline arrow functions like `() => handler()` create a new object each time they are evaluated, so the `remove` call cannot find the original."
        },
        {
          question: "Which event fires continuously as a user types in an input field?",
          options: ["change", "submit", "input", "keyup"],
          correctIndex: 2,
          explanation: "The `input` event fires synchronously after each character change in an input or textarea. The `change` event fires only when the element loses focus after a change, making `input` the right choice for live validation."
        },
        {
          question: "How do you create and dispatch a custom event that bubbles up through the DOM?",
          options: [
            "new Event('name') and element.trigger(event)",
            "new CustomEvent('name', { detail: data, bubbles: true }) and element.dispatchEvent(event)",
            "element.emit('name', data)",
            "document.createEvent('name') and element.fireEvent(event)"
          ],
          correctIndex: 1,
          explanation: "`CustomEvent` lets you include a `detail` payload and set `bubbles: true` so the event propagates up the DOM tree. You dispatch it with `element.dispatchEvent(event)` and listen with `addEventListener`."
        }
      ]
    },
    {
      topicId: "asynchronous-javascript",
      topicTitle: "Asynchronous JavaScript",
      objectiveIndex: 7,
      questions: [
        {
          question: "What happens if you forget the `await` keyword before a `fetch()` call inside an `async` function?",
          options: [
            "The code throws a SyntaxError",
            "The function proceeds with a Promise object instead of the resolved response",
            "The fetch is cancelled",
            "The function becomes synchronous"
          ],
          correctIndex: 1,
          explanation: "Without `await`, the variable receives a `Promise` object immediately, not the resolved value. You would then get errors when trying to call `.json()` or access properties on the Promise rather than the actual response."
        },
        {
          question: "What is the advantage of `Promise.all([req1, req2, req3])` over three sequential `await` calls?",
          options: [
            "It retries failed requests automatically",
            "It runs all requests in parallel, so total time is the maximum of all request times, not their sum",
            "It provides better error messages",
            "It caches results for future calls"
          ],
          correctIndex: 1,
          explanation: "Sequential `await` statements each wait for the previous to finish before starting, resulting in time = sum of all durations. `Promise.all` fires them simultaneously, so you wait only as long as the slowest request."
        },
        {
          question: "Why should you NOT use `await` inside `.forEach()` for sequential async operations?",
          options: [
            "`.forEach()` does not support callbacks",
            "`.forEach()` does not await async callbacks — all iterations start immediately in parallel and the outer async function cannot wait for them to complete",
            "`await` inside `.forEach()` is a syntax error",
            "It causes infinite loops"
          ],
          correctIndex: 1,
          explanation: "`.forEach()` ignores the Promises returned by async callbacks, so the iterations all kick off without waiting. Use `for...of` with `await` if you need sequential async iteration."
        },
        {
          question: "What is `async/await` built on top of in JavaScript?",
          options: ["Callbacks", "Web Workers", "Promises", "Generator functions only"],
          correctIndex: 2,
          explanation: "`async/await` is syntactic sugar over Promises. An `async` function always returns a Promise, and `await` pauses the function's execution until the awaited Promise settles, then resumes with the resolved value."
        },
        {
          question: "How should you handle errors in an `async/await` function?",
          options: [
            "Use `.catch()` on the returned Promise only",
            "Errors in async functions are silently ignored",
            "Wrap the `await` calls in a `try/catch` block",
            "Pass an error callback as the second argument to `async`"
          ],
          correctIndex: 2,
          explanation: "A `try/catch` block around `await` expressions catches both synchronous errors thrown inside the block and rejected Promises from awaited operations, giving you a clean unified error handling pattern."
        }
      ]
    },
    {
      topicId: "es6-features",
      topicTitle: "ES6+ Features",
      objectiveIndex: 8,
      questions: [
        {
          question: "What is the key difference between a `Map` and a plain object (`{}`) as a key-value store?",
          options: [
            "Maps are slower than plain objects",
            "Maps can use any value (including objects and functions) as keys; plain objects only support string and symbol keys",
            "Plain objects have a `size` property; Maps do not",
            "Maps do not preserve insertion order"
          ],
          correctIndex: 1,
          explanation: "A `Map` accepts any value as a key — objects, numbers, functions, etc. Plain objects coerce keys to strings. Maps also have a guaranteed insertion order and a built-in `.size` property."
        },
        {
          question: "What does a `Set` guarantee about its elements?",
          options: [
            "Elements are sorted alphabetically",
            "All elements are unique — duplicates are automatically removed",
            "Elements are immutable",
            "It only accepts string elements"
          ],
          correctIndex: 1,
          explanation: "A `Set` stores only unique values. Adding a duplicate value has no effect. This makes it ideal for deduplication: `new Set(['js', 'web', 'js'])` gives `{\"js\", \"web\"}`."
        },
        {
          question: "What is the difference between `??=` (nullish assignment) and `||=` (logical OR assignment)?",
          options: [
            "They are identical",
            "`??=` only assigns if the left side is `null` or `undefined`; `||=` assigns if falsy (which includes `0` and `\"\"`)",
            "`||=` only assigns if the left side is `null`; `??=` assigns for any falsy value",
            "`??=` is not valid JavaScript syntax"
          ],
          correctIndex: 1,
          explanation: "`??=` uses nullish coalescing semantics: it only assigns if the variable is `null` or `undefined`. `||=` uses OR semantics and triggers on any falsy value including `0`, `false`, and empty strings."
        },
        {
          question: "What does a template literal allow that regular strings do not?",
          options: [
            "Using single quotes",
            "Multiline strings and embedded expressions with `${expression}`",
            "Storing strings in arrays",
            "Automatic HTML escaping"
          ],
          correctIndex: 1,
          explanation: "Template literals (backtick strings) support multiline strings without escape characters and embedded expressions via `${...}`. This replaces string concatenation with a more readable and maintainable syntax."
        },
        {
          question: "How do you use computed property keys in an object literal?",
          options: [
            "{ name: value } where name is a variable",
            "{ [expression]: value } where the expression in brackets is evaluated as the key",
            "{ compute(name): value }",
            "Object.compute({ name: value })"
          ],
          correctIndex: 1,
          explanation: "Computed property keys use square brackets `[expr]` inside the object literal. The expression is evaluated and its string representation becomes the property name. For example, `{ [propName]: 'active' }` uses the value of `propName` as the key."
        }
      ]
    }
  ],

  mid: [
    {
      topicId: "closures-and-lexical-scope",
      topicTitle: "Closures and Lexical Scope",
      objectiveIndex: 0,
      questions: [
        {
          question: "What is a closure in JavaScript?",
          options: [
            "A function with no return value",
            "A function that remembers variables from the scope in which it was defined, even after that outer scope has finished executing",
            "A function that is immediately invoked after definition",
            "A function that is declared with the `class` keyword"
          ],
          correctIndex: 1,
          explanation: "A closure is created when an inner function is defined inside an outer function. The inner function retains access to the outer function's variables through a reference to its lexical environment, even after the outer function returns."
        },
        {
          question: "In the classic `for (var i = 0; i < 3; i++)` loop closure bug, what do all three pushed functions log when called?",
          options: ["0, 1, 2", "0, 0, 0", "3, 3, 3", "undefined, undefined, undefined"],
          correctIndex: 2,
          explanation: "All three functions close over the *same* `i` variable (because `var` is function-scoped, not block-scoped). By the time the functions are called, the loop has finished and `i` is `3`. Using `let` creates a new binding per iteration and fixes this."
        },
        {
          question: "How does replacing `var` with `let` in a closure loop fix the bug?",
          options: [
            "`let` copies the value at the time the function is created",
            "`let` creates a new binding for each iteration of the loop, so each closure captures its own independent copy of `i`",
            "`let` prevents the variable from changing after the loop body runs",
            "`let` is function-scoped, so the functions cannot access it"
          ],
          correctIndex: 1,
          explanation: "`let` is block-scoped and creates a fresh binding per loop iteration. Each closure captures a distinct variable that holds the value from its own iteration, so calling the functions later gives `0, 1, 2` as expected."
        },
        {
          question: "Which of the following is a real-world use of the closure pattern in React?",
          options: [
            "JSX compilation",
            "`useState` — the state value persists between renders because state is stored in a closed-over variable",
            "Virtual DOM reconciliation",
            "CSS-in-JS styling"
          ],
          correctIndex: 1,
          explanation: "React's `useState` stores the current state value in a closure. The getter and setter returned to the component close over that value, which is why state persists between re-renders without being a global variable."
        },
        {
          question: "In the `createBankAccount` example, why is `balance` considered truly private?",
          options: [
            "It is declared with `const`, which prevents external access",
            "It uses a JavaScript private field (`#balance`)",
            "It exists only in `createBankAccount`'s local scope; the only access to it is through the returned methods that close over it",
            "It is stored in a WeakMap"
          ],
          correctIndex: 2,
          explanation: "`balance` is a local variable in `createBankAccount`. Once the function returns, no direct reference to `balance` exists outside — only the returned object's methods, which form a closure over it, can read or modify it."
        },
        {
          question: "What is a 'stale closure' in the context of React hooks?",
          options: [
            "A hook that has been deprecated",
            "A closure inside `useEffect` that captured a value from a previous render and does not reflect the current state",
            "A component that renders without its props",
            "A closure that holds a reference to a removed DOM node"
          ],
          correctIndex: 1,
          explanation: "A stale closure in `useEffect` happens when the dependency array is incomplete. The effect captures a variable at the time of setup; if that variable updates but the effect doesn't re-run, it reads the old (stale) value."
        }
      ]
    },
    {
      topicId: "prototypes-and-classes",
      topicTitle: "Prototypes and Classes",
      objectiveIndex: 1,
      questions: [
        {
          question: "What is the prototype chain in JavaScript?",
          options: [
            "A list of all classes in a module",
            "A linked series of objects where each object's `[[Prototype]]` points to another object, forming the chain used for property lookup",
            "The order in which constructors are called",
            "A TypeScript-specific feature for type inheritance"
          ],
          correctIndex: 1,
          explanation: "Every JavaScript object has an internal `[[Prototype]]` slot pointing to another object. When you access a property, the engine walks this chain — from the object itself, to its prototype, to the prototype's prototype — until it finds the property or reaches `null`."
        },
        {
          question: "ES6 `class` syntax is best described as:",
          options: [
            "A completely new object model replacing prototypes",
            "Syntactic sugar over JavaScript's prototype-based inheritance",
            "A TypeScript feature transpiled for browsers",
            "A way to prevent prototype chain lookups"
          ],
          correctIndex: 1,
          explanation: "ES6 classes are syntactic sugar — they make prototype-based OOP more readable and familiar, but under the hood they still use `[[Prototype]]` chains. `instanceof` checks and method lookup work through the same prototype mechanism."
        },
        {
          question: "What must you call at the beginning of a derived class constructor before accessing `this`?",
          options: [
            "this.init()",
            "super()",
            "parent()",
            "Object.create(this)"
          ],
          correctIndex: 1,
          explanation: "`super()` calls the parent class constructor and initializes the `this` binding for the derived class. Accessing `this` before calling `super()` in a derived class constructor throws a `ReferenceError`."
        },
        {
          question: "What do private class fields (e.g., `#count`) guarantee that the underscore convention (e.g., `_count`) does not?",
          options: [
            "They run faster",
            "They are genuinely inaccessible from outside the class — attempting to access them throws a SyntaxError",
            "They are shared between instances",
            "They are automatically serialized to JSON"
          ],
          correctIndex: 1,
          explanation: "Private fields using `#` are enforced at the language level. Any attempt to access `instance.#field` from outside the class definition is a SyntaxError at parse time. The underscore is only a convention — `_field` is still fully accessible."
        },
        {
          question: "What does `rex instanceof Animal` return when `Dog extends Animal` and `rex` is a `Dog` instance?",
          options: ["false, because rex is a Dog not an Animal", "true, because instanceof walks the prototype chain", "undefined", "It throws a TypeError"],
          correctIndex: 1,
          explanation: "`instanceof` walks the prototype chain. Since `Dog.prototype` has `Animal.prototype` in its chain, `rex instanceof Animal` is `true`. An instance of a subclass is also an instance of all its ancestor classes."
        },
        {
          question: "Why does `[].map()` work even though `map` is not defined directly on the array `[]`?",
          options: [
            "Arrays have `map` built into their constructor directly",
            "`map` is a global function",
            "Property lookup walks the prototype chain: `[]` → `Array.prototype` (where `map` lives) → `Object.prototype`",
            "`map` is injected by the JavaScript runtime at runtime"
          ],
          correctIndex: 2,
          explanation: "When you access a property on an array, the engine first checks the array instance itself. Not finding `map` there, it walks up to `Array.prototype`, where `map` is defined. This is the prototype chain lookup mechanism in action."
        }
      ]
    },
    {
      topicId: "modules",
      topicTitle: "Modules",
      objectiveIndex: 2,
      questions: [
        {
          question: "What is the difference between a named export and a default export?",
          options: [
            "Named exports cannot be imported in other files",
            "A file can have many named exports but only one default export; named imports use the exact exported name (or an alias), default imports can use any name",
            "Default exports are faster than named exports",
            "Named exports require TypeScript types; default exports do not"
          ],
          correctIndex: 1,
          explanation: "A file can contain multiple named exports (`export function add`) but only a single default export (`export default class Calculator`). Named imports must match the exported name or be aliased with `as`; default imports can use any local name."
        },
        {
          question: "What does `import * as MathUtils from './math.js'` create?",
          options: [
            "A copy of the math.js file",
            "A namespace object containing all named exports from math.js as properties",
            "A dynamic import that loads math.js on demand",
            "An object with only the default export"
          ],
          correctIndex: 1,
          explanation: "The namespace import syntax creates an object (`MathUtils`) that contains all named exports from the module as properties. You then access them as `MathUtils.add()`, `MathUtils.PI`, etc."
        },
        {
          question: "What is the purpose of dynamic `import()` and when should you use it?",
          options: [
            "It is an older syntax that should be replaced with static imports",
            "It loads a module at runtime (lazily), enabling code-splitting so users only download code they actually need",
            "It forces a module to reload from the network every time",
            "It is only available in Node.js, not browsers"
          ],
          correctIndex: 1,
          explanation: "Dynamic `import()` returns a Promise and loads the module on demand. This is the mechanism behind route-based code splitting in React and Vue — the bundle for a route is only downloaded when the user navigates to that route."
        },
        {
          question: "What is tree-shaking and which module system enables it?",
          options: [
            "A garbage collection algorithm; it works with CommonJS",
            "Removal of unused exports at build time; it requires ES modules (static `import`/`export`) because the imports are statically analyzable",
            "A polyfill mechanism; it works with AMD modules",
            "A code minification step; it works with any module system"
          ],
          correctIndex: 1,
          explanation: "Tree-shaking is dead code elimination — bundlers like Vite remove exported symbols that are never imported. It requires ES modules because the static `import`/`export` syntax can be analyzed at build time, unlike dynamic `require()` calls in CommonJS."
        },
        {
          question: "What does the re-export syntax `export { add } from './math.js'` do?",
          options: [
            "Imports `add` and uses it internally",
            "Creates a copy of the `add` function",
            "Re-exports `add` from the current module without importing it into local scope",
            "Makes `add` the default export"
          ],
          correctIndex: 2,
          explanation: "Re-export syntax allows a module to act as a public API barrel file, forwarding exports from inner modules to consumers. `add` is not imported into the current module's scope — it is simply passed through."
        }
      ]
    },
    {
      topicId: "error-handling",
      topicTitle: "Error Handling",
      objectiveIndex: 3,
      questions: [
        {
          question: "Why should you create custom error classes instead of throwing plain `Error` objects?",
          options: [
            "Custom errors are faster to throw",
            "They allow you to attach structured data (like error codes and field names) and discriminate error types with `instanceof` for targeted recovery",
            "Plain `Error` objects cannot be caught with `try/catch`",
            "Custom errors are required by all modern browsers"
          ],
          correctIndex: 1,
          explanation: "Custom error classes let you embed context (HTTP status, field name, error code) and use `instanceof` to branch on the exact error type — for example, showing a field validation error vs. scheduling a retry for a 5xx network error."
        },
        {
          question: "What does `err instanceof NetworkError` allow you to do?",
          options: [
            "Convert the error to a string",
            "Log the error to the console automatically",
            "Confirm the error is a `NetworkError` instance and access its custom properties like `.status` and `.retryable`",
            "Re-throw the error as a different type"
          ],
          correctIndex: 2,
          explanation: "`instanceof` checks walk the prototype chain. If `err` is a `NetworkError`, you can safely access `.status` and `.retryable` and decide whether to retry. This enables structured error recovery rather than generic catch-all handlers."
        },
        {
          question: "What is wrong with `catch (err) { console.log(err) }` as an error handling strategy?",
          options: [
            "It is a syntax error",
            "It swallows the error: the caller has no idea something went wrong, the user sees no feedback, and the program continues in a potentially inconsistent state",
            "It only works for synchronous errors",
            "It re-throws the error, crashing the app"
          ],
          correctIndex: 1,
          explanation: "Logging and silently continuing is error *hiding*, not error *handling*. The error is gone — the user sees no feedback, upstream code cannot react to the failure, and silent data corruption can follow."
        },
        {
          question: "What is the correct way to extend the built-in `Error` class?",
          options: [
            "class MyError { constructor(message) { this.message = message; } }",
            "class MyError extends Error { constructor(message) { super(message); this.name = this.constructor.name; } }",
            "function MyError(message) { Error.call(this, message); }",
            "const MyError = Error.extend('MyError');"
          ],
          correctIndex: 1,
          explanation: "When extending `Error`, call `super(message)` to set the `message` property correctly, and set `this.name = this.constructor.name` so the error type shows up properly in stack traces and `instanceof` checks."
        },
        {
          question: "When should you re-throw an error inside a `catch` block?",
          options: [
            "Never — all errors should be handled in the catch block",
            "When the error is not one your code knows how to handle, so callers higher up the call stack can respond to it",
            "Only when the error is a TypeError",
            "When you want to log the error twice"
          ],
          correctIndex: 1,
          explanation: "Re-throwing allows errors to propagate to a handler that understands them. If a catch block only handles `ValidationError`, it should re-throw `NetworkError` or unexpected errors so a global error boundary or the caller can process them."
        }
      ]
    },
    {
      topicId: "advanced-async-patterns",
      topicTitle: "Advanced Async Patterns",
      objectiveIndex: 4,
      questions: [
        {
          question: "What is the key behavioral difference between `Promise.all` and `Promise.allSettled`?",
          options: [
            "They are identical",
            "`Promise.all` rejects immediately if any Promise rejects; `Promise.allSettled` waits for all Promises and returns their outcomes including failures",
            "`Promise.allSettled` runs Promises sequentially; `Promise.all` runs them in parallel",
            "`Promise.all` returns results as objects with a `status` field; `Promise.allSettled` returns raw values"
          ],
          correctIndex: 1,
          explanation: "`Promise.all` short-circuits on the first rejection. `Promise.allSettled` always waits for every Promise to either fulfill or reject and gives you an array of `{ status, value/reason }` objects — useful when you want partial results even if some requests fail."
        },
        {
          question: "What is the purpose of `AbortController` with `fetch`?",
          options: [
            "To retry failed requests automatically",
            "To set request timeouts only",
            "To cancel an in-flight fetch request, preventing stale responses from overwriting newer data",
            "To authenticate requests with OAuth tokens"
          ],
          correctIndex: 2,
          explanation: "`AbortController` lets you cancel a fetch by calling `.abort()` on the controller. Passing the `signal` to `fetch` links them. This prevents race conditions like a slow earlier search result overwriting a newer, faster one."
        },
        {
          question: "When a fetch is cancelled with `AbortController`, what error is thrown?",
          options: [
            "A `TypeError` with message 'fetch failed'",
            "A `NetworkError`",
            "An error where `err.name === 'AbortError'`",
            "No error — the Promise resolves to `null`"
          ],
          correctIndex: 2,
          explanation: "Aborting a fetch causes the Promise to reject with a `DOMException` where `err.name === 'AbortError'`. You should check for this and ignore it (since it was intentional), while re-throwing other errors."
        },
        {
          question: "What makes `async function*` (async generators) useful for paginated APIs?",
          options: [
            "They run faster than regular async functions",
            "They lazily fetch each page on demand with `yield`, allowing the caller to process pages one at a time without loading all data at once",
            "They automatically cache pages in localStorage",
            "They are the only way to use `await` with arrays"
          ],
          correctIndex: 1,
          explanation: "Async generators combine the laziness of generators with async data fetching. They fetch one page per `yield`, letting the consumer iterate with `for await...of`. Only the current page is in memory at any time, which is efficient for large datasets."
        },
        {
          question: "Given three independent API calls each taking 200ms, how long does `Promise.all([req1, req2, req3])` take?",
          options: ["600ms", "400ms", "~200ms", "0ms"],
          correctIndex: 2,
          explanation: "`Promise.all` fires all three requests simultaneously. The total wait time is the duration of the slowest request (~200ms), not the sum of all durations (600ms). This is the primary reason to use `Promise.all` instead of sequential `await`."
        }
      ]
    },
    {
      topicId: "testing-with-vitest-jest",
      topicTitle: "Testing with Vitest / Jest",
      objectiveIndex: 5,
      questions: [
        {
          question: "Why do you mock `fetch` in unit tests instead of making real network calls?",
          options: [
            "Real network calls work fine in tests",
            "Mocking keeps tests fast, deterministic, and independent of external services that may be unavailable or slow",
            "Jest and Vitest cannot handle real Promises",
            "Mocking is only required for integration tests"
          ],
          correctIndex: 1,
          explanation: "Unit tests should run in milliseconds and produce the same result every time. Real network calls introduce flakiness (network failures, slow CI), external dependencies, and are slow. Mocking replaces the dependency with a controlled fake."
        },
        {
          question: "What is the role of `beforeEach` and `afterEach` in a test suite?",
          options: [
            "They define the test assertions",
            "They run setup and teardown around each test to ensure clean state and prevent test pollution",
            "They are aliases for `describe` and `test`",
            "They configure the test runner's parallel execution"
          ],
          correctIndex: 1,
          explanation: "`beforeEach` runs before every test (e.g., setting up fresh mocks), and `afterEach` runs after every test (e.g., restoring mocks). This isolation prevents one test's side effects from affecting another."
        },
        {
          question: "How do you test that an async function rejects with a specific error message in Vitest?",
          options: [
            "expect(fn()).toBe(error)",
            "await expect(fn()).rejects.toThrow('expected message')",
            "try { await fn() } catch(e) { expect(e).toBe(error) }",
            "expect.async(fn()).rejects('message')"
          ],
          correctIndex: 1,
          explanation: "Vitest/Jest's `expect().rejects` matcher lets you assert on the rejection of a Promise. `await expect(promise).rejects.toThrow('message')` is the idiomatic pattern for testing that async functions fail correctly."
        },
        {
          question: "What does `vi.stubGlobal('fetch', vi.fn())` do in a Vitest test?",
          options: [
            "It imports the real `fetch` from the network",
            "It replaces the global `fetch` function with a mock function that can be configured to return specific values",
            "It disables all network requests permanently",
            "It runs `fetch` in a Web Worker"
          ],
          correctIndex: 1,
          explanation: "`vi.stubGlobal` replaces a global variable with the provided value (here, a mock function). You can then configure `.mockResolvedValue()` on it to return specific responses, and use `expect(fetch).toHaveBeenCalledWith(...)` to verify how it was called."
        },
        {
          question: "What does it mean to test 'behavior not implementation'?",
          options: [
            "Only test the UI layer, not utility functions",
            "Write tests that verify what the function does (its output given inputs), not how it does it internally",
            "Skip unit tests and only write end-to-end tests",
            "Test every private function in the module"
          ],
          correctIndex: 1,
          explanation: "Testing behavior means asserting on observable outputs and effects rather than internal implementation details. This allows you to refactor internal code without breaking tests, which is the core value of a test suite."
        }
      ]
    },
    {
      topicId: "functional-programming-patterns",
      topicTitle: "Functional Programming Patterns",
      objectiveIndex: 7,
      questions: [
        {
          question: "What defines a pure function?",
          options: [
            "A function with no parameters",
            "A function whose output depends only on its inputs and which produces no side effects",
            "A function declared with the `pure` keyword",
            "A function that only uses primitive types"
          ],
          correctIndex: 1,
          explanation: "A pure function is deterministic (same inputs always give the same output) and has no side effects (it does not modify external state, make network calls, or log to the console). Pure functions are trivially testable and composable."
        },
        {
          question: "What does the `pipe` higher-order function do?",
          options: [
            "Pipes data to the console",
            "Composes functions left-to-right so the output of one becomes the input of the next",
            "Creates a connection between two Promises",
            "Pipes data from a Node.js readable stream"
          ],
          correctIndex: 1,
          explanation: "`pipe(...fns)` returns a function that passes its argument through each function in order (left to right). `pipe(double, addOne, square)(3)` runs `double(3)` → `6`, then `addOne(6)` → `7`, then `square(7)` → `49`."
        },
        {
          question: "What is currying?",
          options: [
            "Converting a function to use rest parameters",
            "Transforming a multi-argument function into a series of single-argument functions that can be partially applied",
            "A method for memoizing recursive functions",
            "Converting synchronous functions to async"
          ],
          correctIndex: 1,
          explanation: "Currying transforms `f(a, b)` into `f(a)(b)`. Partial application lets you pre-fill some arguments, creating specialized functions. For example, `multiply(2)` returns a `double` function because `multiply` is a curried version of `(a, b) => a * b`."
        },
        {
          question: "Why is immutability a core principle in functional programming?",
          options: [
            "It makes code run faster",
            "It prevents unintended side effects — mutations to shared state are a primary source of bugs in large codebases",
            "JavaScript requires immutability for `const` to work",
            "It is only important in React applications"
          ],
          correctIndex: 1,
          explanation: "When data is never mutated, functions cannot accidentally affect each other through shared references. This makes code predictable, easier to reason about, and trivially safe to call multiple times or in parallel."
        },
        {
          question: "Which of the following is the functional, immutable way to remove the number `3` from `const numbers = [1, 2, 3, 4, 5]`?",
          options: [
            "numbers.splice(numbers.indexOf(3), 1)",
            "numbers.pop()",
            "numbers.filter(n => n !== 3)",
            "delete numbers[2]"
          ],
          correctIndex: 2,
          explanation: "`.filter()` returns a new array with only the elements that pass the predicate. The original `numbers` array is untouched. `.splice()`, `.pop()`, and `delete` all mutate the original array."
        }
      ]
    }
  ],

  senior: [
    {
      topicId: "the-event-loop-a-deep-model",
      topicTitle: "The Event Loop — A Deep Model",
      objectiveIndex: 0,
      questions: [
        {
          question: "Given: `console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4');` — what is the output order?",
          options: ["1, 2, 3, 4", "1, 4, 2, 3", "1, 4, 3, 2", "1, 3, 2, 4"],
          correctIndex: 2,
          explanation: "Synchronous code runs first (1, 4), then ALL microtasks drain (Promise `.then` → 3), then one macrotask runs (`setTimeout` → 2). The order is: sync → microtasks → macrotask."
        },
        {
          question: "What is the difference between the microtask queue and the macrotask queue?",
          options: [
            "Microtasks are for synchronous code; macrotasks are for async code",
            "All microtasks (including newly added ones) drain completely after each task before any macrotask or render step runs; macrotasks execute one at a time per event loop tick",
            "They are the same queue with different priorities",
            "Macrotasks run before microtasks"
          ],
          correctIndex: 1,
          explanation: "After each macrotask (or the initial script), the event loop empties the entire microtask queue — including any microtasks added during microtask processing. Only then does rendering and the next macrotask happen. This is why a runaway microtask loop can freeze the page."
        },
        {
          question: "Which APIs produce macrotasks (not microtasks)?",
          options: [
            "Promise `.then()` callbacks and `queueMicrotask()`",
            "MutationObserver callbacks",
            "`setTimeout`, `setInterval`, and I/O callbacks",
            "All browser APIs produce macrotasks"
          ],
          correctIndex: 2,
          explanation: "`setTimeout` and `setInterval` schedule macrotasks. Promise `.then()` and `queueMicrotask()` schedule microtasks. `requestAnimationFrame` callbacks run during the render steps — distinct from both queues."
        },
        {
          question: "Why does a runaway microtask loop (a microtask that keeps scheduling new microtasks) freeze the browser?",
          options: [
            "It fills up available memory",
            "It prevents the event loop from ever reaching the render step or processing macrotasks, because microtasks drain to completion before rendering",
            "It triggers JavaScript's infinite loop protection",
            "It only freezes Node.js, not browsers"
          ],
          correctIndex: 1,
          explanation: "The event loop must fully drain the microtask queue before proceeding to rendering or the next macrotask. A microtask that continuously enqueues new microtasks keeps the queue non-empty indefinitely, permanently blocking rendering and UI interaction."
        },
        {
          question: "What is the recommended approach for processing a large array on the main thread without blocking the UI?",
          options: [
            "Use a `while` loop with a `break` statement",
            "Process the entire array synchronously since JavaScript is fast enough",
            "Break the work into chunks and use `setTimeout(chunk, 0)` to yield back to the event loop between batches",
            "Store the array in a cookie and read it back asynchronously"
          ],
          correctIndex: 2,
          explanation: "Yielding with `setTimeout(..., 0)` returns control to the event loop between chunks, allowing rendering and user interactions to occur. This prevents jank on large datasets. The modern `scheduler.yield()` API is an even more precise alternative."
        },
        {
          question: "What is `requestAnimationFrame` used for, and how does it differ from `setTimeout`?",
          options: [
            "They are identical — both schedule macrotasks",
            "`requestAnimationFrame` schedules work to run during the render pipeline at display refresh rate (~60Hz) and is skipped for hidden tabs; `setTimeout` queues a macrotask regardless of rendering",
            "`requestAnimationFrame` runs as a microtask before any setTimeout",
            "`requestAnimationFrame` only works in Node.js"
          ],
          correctIndex: 1,
          explanation: "`requestAnimationFrame` aligns work with the browser's rendering cycle, firing at screen refresh rate and being skipped when the tab is backgrounded. It is ideal for animations. `setTimeout(0)` queues a macrotask that may run at any point, not coordinated with rendering."
        }
      ]
    },
    {
      topicId: "memory-management",
      topicTitle: "Memory Management",
      objectiveIndex: 1,
      questions: [
        {
          question: "What is a memory leak in a JavaScript single-page application?",
          options: [
            "A deliberate deletion of a variable",
            "Memory that is allocated but can never be reclaimed by the garbage collector because live references prevent it from being collected",
            "Using too many local variables in a function",
            "Calling `JSON.stringify` on a circular object"
          ],
          correctIndex: 1,
          explanation: "JavaScript uses mark-and-sweep garbage collection. Memory leaks occur when objects remain reachable (referenced) even after they are no longer needed — typically through forgotten event listeners, closures in timers, or growing caches with no eviction policy."
        },
        {
          question: "Why does adding a listener with `window.addEventListener('resize', handler)` inside a class without a corresponding `removeEventListener` cause a memory leak?",
          options: [
            "It doesn't — `window` listeners don't count toward memory",
            "`window` holds a reference to `handler`, which references `this` (the object). Even if all other references to the object are gone, `window` keeps it alive and prevents GC",
            "Resize listeners are automatically removed when the component unmounts",
            "Only `document` listeners cause leaks, not `window` listeners"
          ],
          correctIndex: 1,
          explanation: "The event listener holds a reference to the callback, which often closes over `this`. Since `window` lives for the entire session, the class instance (and everything it references, like `this.data`) is kept alive indefinitely — a classic leak in SPA components."
        },
        {
          question: "What advantage does `WeakMap` offer over a regular `Map` for caching object metadata?",
          options: [
            "It is faster to read from",
            "It allows any key type including primitives",
            "When the key object is garbage collected, the `WeakMap` entry is automatically removed — preventing memory leaks from stale cache entries",
            "It supports synchronous iteration"
          ],
          correctIndex: 2,
          explanation: "`WeakMap` holds *weak* references to its keys. If the key object has no other live references, the GC can collect it and automatically removes the corresponding `WeakMap` entry. A regular `Map` holds a strong reference to keys, preventing GC."
        },
        {
          question: "What is a 'detached DOM node' memory leak?",
          options: [
            "A DOM node that has been cloned",
            "A DOM node that has been removed from the DOM tree but is still referenced by a JavaScript variable, preventing garbage collection",
            "A DOM node with no parent element",
            "A DOM node that failed to load its styles"
          ],
          correctIndex: 1,
          explanation: "When you remove a node from the DOM but a JavaScript variable still holds a reference to it, the node cannot be GC'd. The node is 'detached' — not in the live tree but still occupying memory. Setting the variable to `null` allows GC."
        },
        {
          question: "How do you detect memory leaks in Chrome DevTools?",
          options: [
            "The Network tab shows memory allocation per request",
            "The Sources tab highlights leaked variables in red",
            "The Memory tab's Heap Snapshot tool — take a snapshot, trigger the suspected leak, take another, then compare to find objects allocated between the two snapshots",
            "The Performance tab's memory chart automatically identifies all leaks"
          ],
          correctIndex: 2,
          explanation: "The Chrome DevTools Memory tab's Heap Snapshot comparison is the standard approach. By comparing snapshots before and after a suspected leak trigger, you can filter for objects that were allocated but not collected, pinpointing the source."
        }
      ]
    },
    {
      topicId: "performance-optimization",
      topicTitle: "Performance Optimization",
      objectiveIndex: 2,
      questions: [
        {
          question: "What is the difference between debounce and throttle?",
          options: [
            "They are identical — both limit how often a function fires",
            "Debounce delays execution until activity stops (fires once after quiet period); throttle ensures execution at most once per interval regardless of continued activity",
            "Throttle delays execution until activity stops; debounce fires immediately then blocks",
            "Debounce is for network calls; throttle is for DOM events"
          ],
          correctIndex: 1,
          explanation: "Debounce resets its timer on every call and fires only after the caller has been quiet for the delay period — ideal for search inputs. Throttle fires at a fixed rate regardless of how many calls occur — ideal for scroll or resize handlers."
        },
        {
          question: "What is memoization and when is it appropriate?",
          options: [
            "Storing function source code as a string for faster parsing",
            "Caching the return value of a pure function keyed by its arguments, so repeated calls with the same inputs return the cached result instantly",
            "Pre-loading modules at application startup",
            "Converting async functions to synchronous for performance"
          ],
          correctIndex: 1,
          explanation: "Memoization is appropriate for pure, deterministic, expensive-to-compute functions called repeatedly with the same arguments. Because the output depends only on the input, the cached result is always valid for the same arguments."
        },
        {
          question: "What are V8 'hidden classes' and why do inconsistent object shapes hurt performance?",
          options: [
            "Hidden classes are private CSS classes injected by V8",
            "V8 assigns an internal 'hidden class' (shape) to each object and compiles optimized code for that shape. Objects with different property sets or property order have different hidden classes, causing deoptimization",
            "Hidden classes are a TypeScript-only optimization",
            "They only apply to class instances, not plain objects"
          ],
          correctIndex: 1,
          explanation: "V8 tracks object shapes (which properties exist and in what order) as 'hidden classes'. When many objects share a shape, V8 can JIT-compile highly optimized code for them. Inconsistent shapes — like conditionally adding properties — force V8 to deoptimize and fall back to slower generic code."
        },
        {
          question: "What does `IntersectionObserver` do and why is it preferred over scroll event listeners for lazy loading?",
          options: [
            "It observes changes to element styles",
            "It efficiently notifies you when elements enter or leave the viewport without requiring scroll event listeners that fire hundreds of times per scroll",
            "It monitors network intersection for CDN routing",
            "It replaces `MutationObserver` for DOM changes"
          ],
          correctIndex: 1,
          explanation: "`IntersectionObserver` is a browser API that notifies you asynchronously when a target element crosses a threshold of viewport visibility. Unlike scroll listeners (which fire on every pixel scrolled and force layout recalculation), it uses an efficient C++ implementation with no main-thread layout cost."
        },
        {
          question: "Why should a debounced search handler with a 300ms delay be preferred over an unthrottled `input` event listener?",
          options: [
            "The debounced version fires fewer requests — only after the user pauses typing — saving potentially hundreds of unnecessary network calls per session",
            "The debounced version is required by browser security policies",
            "The unthrottled version sends requests in parallel, which is slower",
            "Debouncing improves JavaScript parse time"
          ],
          correctIndex: 0,
          explanation: "A fast typist can trigger dozens of input events per second. Without debouncing, each keystroke fires a network request. With a 300ms debounce, only one request fires per typing pause, dramatically reducing server load and network traffic."
        }
      ]
    },
    {
      topicId: "design-patterns",
      topicTitle: "Design Patterns",
      objectiveIndex: 3,
      questions: [
        {
          question: "What problem does the Observer pattern solve?",
          options: [
            "Caching expensive computations",
            "Decoupled communication: publishers emit events without knowing who is listening; subscribers react without knowing who emitted",
            "Controlling access to a protected resource",
            "Creating objects without specifying their exact class"
          ],
          correctIndex: 1,
          explanation: "The Observer pattern (also called pub/sub or EventEmitter) enables loose coupling. The emitter does not reference its listeners directly, and listeners can subscribe/unsubscribe independently. This is the architecture behind Node.js EventEmitter and browser CustomEvents."
        },
        {
          question: "In the Strategy pattern, what is being 'swapped'?",
          options: [
            "The object being operated on",
            "The algorithm or behavior used by a function, selected at runtime from a set of interchangeable implementations",
            "The function's return type",
            "The prototype chain of the object"
          ],
          correctIndex: 1,
          explanation: "The Strategy pattern encapsulates a family of algorithms (e.g., sort by date, sort by name, sort by priority) and makes them interchangeable. A function selects the algorithm by name at runtime, eliminating long `if/else` chains and making adding new strategies easy."
        },
        {
          question: "What does the Command pattern enable that direct method calls do not?",
          options: [
            "Faster function execution",
            "Encapsulating operations as objects, enabling undo/redo, operation queuing, and logging",
            "Preventing method calls from throwing exceptions",
            "Calling methods asynchronously"
          ],
          correctIndex: 1,
          explanation: "The Command pattern wraps an action and its inverse in an object. Storing executed commands in a history stack allows `undo()` and `redo()`. Commands can also be serialized, queued, or replayed — making it foundational for text editors and design tools."
        },
        {
          question: "What JavaScript built-in does the Proxy pattern use?",
          options: [
            "Symbol.iterator",
            "Object.freeze()",
            "The `Proxy` object with a handler that intercepts operations (get, set, delete) on the target object",
            "WeakRef for lazy initialization"
          ],
          correctIndex: 2,
          explanation: "JavaScript's built-in `Proxy` object wraps a target object and intercepts operations via a handler. The `set` trap, for example, can validate a value before assigning it, throwing a TypeError for invalid data — building a validation layer transparently."
        },
        {
          question: "The `EventEmitter.on()` method returns a function — what is that function for?",
          options: [
            "It returns the listener itself for chaining",
            "It is an unsubscribe function that removes the listener when called",
            "It returns the current number of listeners",
            "It is the ID needed to call `emit` on that specific listener"
          ],
          correctIndex: 1,
          explanation: "Returning an unsubscribe function is an ergonomic pattern: `const unsub = emitter.on('event', handler); unsub()` removes the listener. This avoids the need to keep a reference to both the emitter and the handler just to clean up later."
        }
      ]
    },
    {
      topicId: "security-best-practices",
      topicTitle: "Security Best Practices",
      objectiveIndex: 4,
      questions: [
        {
          question: "What is an XSS (Cross-Site Scripting) attack and what is the primary prevention in DOM manipulation?",
          options: [
            "Intercepting network requests; prevented by HTTPS",
            "Injecting malicious scripts into a page via unsanitized user input; prevented by using `textContent` (not `innerHTML`) for user-provided text",
            "Overloading the server with requests; prevented by rate limiting",
            "Stealing cookies via CSS; prevented by CSP"
          ],
          correctIndex: 1,
          explanation: "XSS inserts malicious HTML or JavaScript via user input. Using `textContent` treats input as literal text with no HTML parsing, preventing injected `<script>` tags from executing. `innerHTML` with user input is a critical vulnerability."
        },
        {
          question: "What is prototype pollution and how does it work?",
          options: [
            "Overwriting the `Array.prototype` methods to change their behavior",
            "A vulnerability where malicious input like `{\"__proto__\": {\"isAdmin\": true}}` is merged into an object, adding properties to `Object.prototype` that affect all objects in the application",
            "Polluting the global namespace with too many variables",
            "A memory leak caused by extending built-in prototypes"
          ],
          correctIndex: 1,
          explanation: "If you naively merge untrusted user data using `for...in`, a key like `__proto__` sets properties on `Object.prototype`. Since all objects inherit from it, every plain object suddenly has the injected property — a critical security vulnerability."
        },
        {
          question: "What is the safest way to create an object that is immune to prototype pollution?",
          options: [
            "Using `Object.freeze({})`",
            "Using `Object.create(null)` which creates an object with no prototype chain",
            "Using a `class` with private fields",
            "Using `JSON.parse(JSON.stringify({}))`"
          ],
          correctIndex: 1,
          explanation: "`Object.create(null)` creates an object with no `[[Prototype]]` — its prototype is `null`. There is no `Object.prototype` chain to pollute, and `__proto__` set operations have no effect. Ideal for dictionaries that receive untrusted keys."
        },
        {
          question: "What is CSRF (Cross-Site Request Forgery) and how is it mitigated in API requests?",
          options: [
            "A type of XSS attack; mitigated by escaping HTML",
            "An attack where a malicious site triggers authenticated requests to your API on behalf of a logged-in user; mitigated by including a CSRF token in a custom header that the server validates",
            "A DNS hijacking technique; mitigated by HTTPS",
            "SQL injection in a browser context; mitigated by parameterized queries"
          ],
          correctIndex: 1,
          explanation: "CSRF exploits the browser's automatic credential-sending behavior. Cross-origin requests cannot read custom headers, so a CSRF token in `X-CSRF-Token` (read from a meta tag) proves the request originated from your own page, not a malicious one."
        },
        {
          question: "What does a Content Security Policy (CSP) protect against?",
          options: [
            "Server-side injection attacks",
            "Injected scripts by restricting which script sources the browser will execute — blocking inline scripts and scripts from untrusted origins even if an XSS vulnerability exists",
            "Weak cryptographic algorithms in TLS",
            "Cookie theft via the network"
          ],
          correctIndex: 1,
          explanation: "CSP is a server-sent HTTP header that tells the browser which sources of scripts (and other resources) are trusted. A strict CSP like `script-src 'self'` blocks all inline scripts and scripts from other domains, making XSS attacks much harder to exploit even if they exist."
        }
      ]
    },
    {
      topicId: "web-workers",
      topicTitle: "Web Workers",
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the fundamental constraint of Web Workers?",
          options: [
            "They can only run for a maximum of 5 seconds",
            "They run in an isolated background thread and cannot access the DOM",
            "They can only communicate via localStorage",
            "They require a server-side WebSocket connection"
          ],
          correctIndex: 1,
          explanation: "Web Workers run in a completely separate thread with no access to the DOM, `window`, or `document`. They communicate with the main thread exclusively via message passing (`postMessage`/`onmessage`). This isolation is what makes them safe to run in parallel."
        },
        {
          question: "How do the main thread and a Web Worker communicate?",
          options: [
            "Via shared global variables",
            "Via direct function calls across threads",
            "Via `postMessage()` for sending and `onmessage` event handler for receiving — a structured clone of the data is made for each message",
            "Via a shared IndexedDB database"
          ],
          correctIndex: 2,
          explanation: "Web Workers use a message-passing API. Data sent via `postMessage` is structurally cloned (deep-copied) by default, so there are no shared memory hazards. For large binary data, transferable objects (`ArrayBuffer`) can be used for zero-copy transfer."
        },
        {
          question: "What are transferable objects and why are they important for performance?",
          options: [
            "Objects that can be passed between modules",
            "Large binary buffers (e.g., `ArrayBuffer`) that are transferred to the worker with zero-copy — ownership moves from one thread to the other, avoiding expensive data duplication",
            "React components that can be rendered in a Worker",
            "Objects serialized to JSON for Worker communication"
          ],
          correctIndex: 1,
          explanation: "Structurally cloning a large `ArrayBuffer` (e.g., a 10MB image) would copy all that data. Transferring it moves ownership to the worker in O(1) time — the original reference in the main thread becomes detached (unusable), and the worker owns the data."
        },
        {
          question: "What kinds of tasks are best suited for Web Workers?",
          options: [
            "DOM updates and UI rendering",
            "CPU-intensive tasks like image processing, video encoding, cryptography, and large data parsing that would block the UI if run on the main thread",
            "Simple string formatting",
            "Making fetch requests (these must happen on the main thread)"
          ],
          correctIndex: 1,
          explanation: "Web Workers shine for CPU-bound work. Image compression, audio encoding, parsing large JSON datasets, and running ML inference are all examples of work that would freeze the UI on the main thread but run invisibly in a Worker. Workers can also make `fetch` requests."
        },
        {
          question: "What is a Worker Pool and why is it useful?",
          options: [
            "A pool of cached network responses",
            "A group of pre-created workers managed to process a queue of tasks, avoiding the startup cost of creating a new worker for every task",
            "A shared memory pool for workers to read from",
            "A browser API for managing service workers"
          ],
          correctIndex: 1,
          explanation: "Creating a new `Worker` has overhead (spawning a thread, loading the script). A Worker Pool creates a fixed set of workers at startup and reuses them for tasks from a queue. When all workers are busy, new tasks wait in the queue rather than spawning unlimited threads."
        }
      ]
    }
  ],

  exams: {
    beginner: [
      {
        question: "What are the three variable declaration keywords in JavaScript and what differentiates them?",
        options: [
          "`var` (function-scoped, hoisted), `let` (block-scoped, reassignable), `const` (block-scoped, not reassignable)",
          "`var` (block-scoped), `let` (function-scoped), `const` (module-scoped)",
          "`var` and `let` are identical; `const` prevents mutation",
          "`const` is the same as `var` with stricter syntax"
        ],
        correctIndex: 0,
        explanation: "`var` is function-scoped and hoisted as `undefined`. `let` and `const` are block-scoped with a Temporal Dead Zone. `const` additionally prevents reassignment of the binding."
      },
      {
        question: "What is the correct way to check if a value is `NaN`?",
        options: ["value === NaN", "value == NaN", "Number.isNaN(value)", "isNaN(value) — it works identically"],
        correctIndex: 2,
        explanation: "`NaN !== NaN` — it is the only value not equal to itself. `Number.isNaN()` checks strictly for the `NaN` value without coercion. The global `isNaN()` coerces its argument first, causing `isNaN('hello')` to return `true`."
      },
      {
        question: "What is a closure and give a practical example of where it is used?",
        options: [
          "A function with no parameters; used in event handlers",
          "A function that retains access to its outer scope's variables after the outer function returns; used in React hooks, counter factories, and module patterns",
          "A self-invoking function; used to create namespaces",
          "A function that wraps another function to add logging"
        ],
        correctIndex: 1,
        explanation: "A closure preserves its creation scope. `createCounter()` returns methods that close over a private `count` variable — callers can only interact with it through the returned API. React's `useState` uses the same pattern."
      },
      {
        question: "What does `Array.prototype.map()` return?",
        options: [
          "The original array, mutated by the callback",
          "A new array where each element is the return value of the callback applied to the corresponding original element",
          "A single accumulated value",
          "A boolean indicating whether any element matched"
        ],
        correctIndex: 1,
        explanation: "`.map(fn)` creates a new array by applying `fn` to each element. It never mutates the original. This is distinct from `.forEach()` (no return value) and `.reduce()` (accumulates to one value)."
      },
      {
        question: "Why is `innerHTML` considered dangerous for inserting user-provided content?",
        options: [
          "It is slow compared to DOM methods",
          "It parses the string as HTML, allowing injected `<script>` tags or event handler attributes to execute — an XSS vulnerability",
          "It only works in Chrome",
          "It overwrites all CSS classes on the element"
        ],
        correctIndex: 1,
        explanation: "Parsing user input as HTML via `innerHTML` can execute injected JavaScript. Always use `textContent` for plain text. When rich HTML is required (e.g., from a CMS), sanitize with a library like DOMPurify first."
      },
      {
        question: "What is event delegation and why is it preferred for dynamic lists?",
        options: [
          "Adding listeners to every list item individually for explicit control",
          "Listening on a parent element and using `e.target` to identify which child was clicked, so one listener handles all present and future children",
          "Using `CustomEvent` to dispatch click events programmatically",
          "Delegating event handling to a service worker"
        ],
        correctIndex: 1,
        explanation: "Event delegation exploits bubbling. One listener on the parent handles events from all children — even elements added to the DOM after the listener was attached. This is more memory-efficient than attaching one listener per child."
      },
      {
        question: "What is the correct way to run three independent API requests in parallel with async/await?",
        options: [
          "await req1(); await req2(); await req3();",
          "const [a, b, c] = await Promise.all([req1(), req2(), req3()]);",
          "Promise.race([req1(), req2(), req3()])",
          "req1().then(() => req2()).then(() => req3())"
        ],
        correctIndex: 1,
        explanation: "Sequential `await` calls each wait for the previous to finish, totaling all three durations. `Promise.all` fires all three simultaneously, completing in the time of the slowest single request."
      },
      {
        question: "What is the key difference between `||` and `??` for default values?",
        options: [
          "They are identical",
          "`||` returns the right side for any falsy value (0, '', false, null, undefined); `??` only returns the right side for `null` or `undefined`",
          "`??` returns the right side for any falsy value; `||` only returns it for null",
          "`||` is deprecated; always use `??`"
        ],
        correctIndex: 1,
        explanation: "If `0` or an empty string are valid values, `||` gives the wrong default. `0 || 5` → `5` (wrong). `0 ?? 5` → `0` (correct). Use `??` when you only want to fall back for truly absent values."
      },
      {
        question: "What does `for...of` iterate over compared to `for...in`?",
        options: [
          "Both iterate over object keys",
          "`for...of` iterates the values of iterables (arrays, strings, Maps, Sets); `for...in` iterates enumerable string keys including inherited prototype properties",
          "`for...in` iterates array values; `for...of` iterates object keys",
          "They are identical for arrays"
        ],
        correctIndex: 1,
        explanation: "`for...in` gives you keys (potentially from the prototype chain), which is dangerous for arrays. `for...of` gives you values from any iterable. For arrays, always prefer `for...of` or array methods."
      },
      {
        question: "What is the `typeof` result for each of: a string, a number, `null`, `undefined`, and an object?",
        options: [
          "'string', 'number', 'null', 'undefined', 'object'",
          "'string', 'number', 'object', 'undefined', 'object'",
          "'text', 'integer', 'null', 'void', 'object'",
          "'string', 'float', 'object', 'null', 'object'"
        ],
        correctIndex: 1,
        explanation: "`typeof null` returns `'object'` — a famous historical bug in JavaScript. `typeof undefined` returns `'undefined'`. All non-primitive types (plain objects, arrays, functions called without `typeof function`) return `'object'` (functions return `'function'`)."
      },
      {
        question: "What does the spread operator `[...arr]` create?",
        options: [
          "A deep clone of the array including all nested objects",
          "A shallow copy — a new array with the same element references",
          "A frozen array that cannot be mutated",
          "A Set containing unique values from the array"
        ],
        correctIndex: 1,
        explanation: "Spread creates a shallow copy. The top-level array is new, but any nested objects or arrays inside are still shared references. Modifying a nested object via the copy also modifies it in the original."
      },
      {
        question: "What is the Temporal Dead Zone and when does it apply?",
        options: [
          "A browser throttling period for intensive scripts",
          "The region from the start of a block to the `let`/`const` declaration where accessing the variable throws a `ReferenceError`",
          "The delay between `DOMContentLoaded` and the first paint",
          "A period where `var` variables are undefined"
        ],
        correctIndex: 1,
        explanation: "`let` and `const` declarations are hoisted but not initialized. Accessing them before the declaration statement is reached throws a `ReferenceError`. This is the Temporal Dead Zone — unlike `var`, which would return `undefined`."
      },
      {
        question: "Which array method should you use to check if at least one element satisfies a condition?",
        options: [".every()", ".find()", ".some()", ".includes()"],
        correctIndex: 2,
        explanation: "`.some(fn)` returns `true` if the callback returns truthy for at least one element, stopping early on the first match. `.every()` requires all elements to match. `.find()` returns the element itself, not a boolean."
      },
      {
        question: "What is optional chaining (`?.`) and what does it return when the chain fails?",
        options: [
          "A try/catch shorthand; returns `null` on error",
          "A null-safe property access operator; returns `undefined` if any part of the chain is `null` or `undefined` instead of throwing a TypeError",
          "An asynchronous property access; returns a Promise",
          "A way to access private class fields"
        ],
        correctIndex: 1,
        explanation: "`user?.address?.city` returns `undefined` if `user` is null/undefined OR if `user.address` is null/undefined, rather than throwing `TypeError: Cannot read property 'address' of null`. It short-circuits at the first null/undefined in the chain."
      },
      {
        question: "What is the difference between `Map` and a plain object for storing key-value pairs?",
        options: [
          "They are functionally identical",
          "A `Map` accepts any key type, has a `.size` property, preserves insertion order reliably, and has no prototype keys polluting it; plain objects only support string/Symbol keys",
          "Plain objects have a `.size` property; Maps do not",
          "Maps are slower for all operations"
        ],
        correctIndex: 1,
        explanation: "`Map` accepts any value as a key (objects, numbers, etc.), has a reliable `.size`, and has no inherited keys from `Object.prototype`. Plain objects are simpler for known string keys. Choose `Map` when keys are dynamic or non-string."
      },
      {
        question: "Which arrow function syntax uses an implicit return?",
        options: [
          "const fn = (x) => { return x * 2; }",
          "const fn = (x) => x * 2;",
          "const fn = function(x) { return x * 2; }",
          "const fn = (x) => { x * 2; }"
        ],
        correctIndex: 1,
        explanation: "When an arrow function body is a single expression (no braces), the result is implicitly returned. Adding curly braces creates a block body requiring an explicit `return` statement."
      }
    ],

    mid: [
      {
        question: "Explain the classic `var` loop closure bug and how `let` fixes it.",
        options: [
          "`var` is block-scoped so each iteration captures its own `i`; `let` is function-scoped and leaks out of the loop",
          "`var` creates one shared binding for `i` across all iterations; by the time closures run, `i` is the loop's final value. `let` creates a new binding per iteration, so each closure captures its own independent value",
          "The bug only occurs in arrow functions, not regular functions",
          "Both `var` and `let` cause the same bug; you must use `const` instead"
        ],
        correctIndex: 1,
        explanation: "`var` is function-scoped — the single `i` variable is shared by all closures. After the loop, `i` equals the exit condition value. `let` creates a fresh scope per iteration, giving each closure its own independent `i` binding."
      },
      {
        question: "What is the prototype chain and how does property lookup use it?",
        options: [
          "A list of all methods defined on a class",
          "A linked series of objects via `[[Prototype]]` slots. When you access a property, the engine searches the object itself, then its prototype, then the prototype's prototype, until the property is found or `null` is reached",
          "The inheritance list defined by `extends` in a class declaration",
          "A TypeScript-specific feature not present in runtime JavaScript"
        ],
        correctIndex: 1,
        explanation: "Every object's `[[Prototype]]` points to another object. Accessing `obj.method` checks `obj`, then `obj.__proto__`, then `obj.__proto__.__proto__`, etc. This is how `[].map()` works — `map` lives on `Array.prototype`, reached through the chain."
      },
      {
        question: "What is the difference between `Promise.all` and `Promise.allSettled`?",
        options: [
          "They are identical",
          "`Promise.all` rejects on the first failure; `Promise.allSettled` waits for all promises and returns their status and value/reason for each",
          "`Promise.allSettled` runs promises sequentially",
          "`Promise.all` returns objects with `{status, value}`; `Promise.allSettled` returns raw values"
        ],
        correctIndex: 1,
        explanation: "`Promise.all` short-circuits on the first rejection, giving you nothing from the other successful requests. `Promise.allSettled` always returns an array of outcome objects, letting you access partial results when some requests fail."
      },
      {
        question: "What does tree-shaking require from the module system?",
        options: [
          "CommonJS `require()` which bundlers can statically analyze",
          "ES modules with static `import`/`export` statements, allowing bundlers to determine at build time which exports are unused and eliminate them",
          "Dynamic `import()` calls at every usage site",
          "TypeScript type annotations on all exports"
        ],
        correctIndex: 1,
        explanation: "Tree-shaking requires statically analyzable imports — meaning the bundler can read the source and determine which exports are referenced without executing the code. CommonJS `require()` is dynamic and cannot be statically analyzed at build time."
      },
      {
        question: "Why should you create custom error classes instead of throwing plain `Error` objects?",
        options: [
          "Throwing plain errors is a syntax error in strict mode",
          "Custom error classes allow attaching structured context (field, status code, error code) and using `instanceof` to dispatch different recovery strategies per error type",
          "Plain errors do not have stack traces",
          "Custom errors are required for `async/await` to work with `try/catch`"
        ],
        correctIndex: 1,
        explanation: "Generic errors carry only a message. Custom errors can carry the HTTP status, the form field that failed, whether the error is retryable, etc. `instanceof` lets you branch on the exact type, enabling targeted user feedback and recovery logic."
      },
      {
        question: "What is `AbortController` used for with the Fetch API?",
        options: [
          "Setting request timeouts only",
          "Cancelling in-flight fetch requests to prevent stale results from overwriting newer ones, a critical fix for search-as-you-type race conditions",
          "Retrying failed requests",
          "Adding authentication headers to every request"
        ],
        correctIndex: 1,
        explanation: "When users type quickly, a slow earlier request can return after a faster later request, overwriting the correct results. Aborting the previous request when a new one starts prevents this stale-response race condition."
      },
      {
        question: "What does `beforeEach` do in a Vitest/Jest test suite?",
        options: [
          "It defines the expected behavior of the module under test",
          "It runs setup code (like creating fresh mocks or resetting state) before each individual test in the suite, preventing test pollution",
          "It imports the module being tested",
          "It specifies which tests to skip"
        ],
        correctIndex: 1,
        explanation: "`beforeEach` ensures each test starts from a clean slate. Without it, mocks or state from one test can bleed into another, causing order-dependent test failures that are hard to debug."
      },
      {
        question: "What is the principle of immutability in functional programming?",
        options: [
          "Using `Object.freeze()` on all objects",
          "Never modifying existing data — always creating new values when a change is needed, so shared data cannot be accidentally altered by one part of the code",
          "Making all variables `const`",
          "Avoiding the use of loops"
        ],
        correctIndex: 1,
        explanation: "Immutability means transformations return new values rather than modifying existing ones. `arr.filter(...)` returns a new array; it does not alter `arr`. This eliminates an entire class of bugs where one function's side effects corrupt another's data."
      },
      {
        question: "What are ES6 private class fields (`#field`) and how do they differ from the `_field` convention?",
        options: [
          "They are identical in behavior; `#` is just a style preference",
          "`#field` is enforced by the JavaScript engine — accessing it outside the class throws a SyntaxError. `_field` is only a social convention; the property is fully accessible",
          "`#field` is only available in TypeScript",
          "`_field` throws a ReferenceError when accessed externally; `#field` does not"
        ],
        correctIndex: 1,
        explanation: "Private class fields are a language-level feature. Attempting `instance.#field` outside the class body is a SyntaxError caught at parse time. The underscore is only a convention — `obj._count` is completely accessible to anyone."
      },
      {
        question: "How do async generators (`async function*`) benefit paginated API consumers?",
        options: [
          "They automatically retry failed pages",
          "They lazily fetch each page on demand via `yield`, allowing `for await...of` consumers to process pages one at a time without loading all data into memory",
          "They run each page fetch in a separate Web Worker",
          "They cache all pages in a Map for instant subsequent access"
        ],
        correctIndex: 1,
        explanation: "Async generators combine lazy evaluation (only fetch the next page when the consumer asks for it) with async data access. This is memory-efficient for large datasets and enables backpressure — the consumer controls the fetch rate."
      },
      {
        question: "What makes a function 'pure' and why does purity matter for testing?",
        options: [
          "A pure function uses only `const` for variables; it matters because `const` prevents mutation",
          "A pure function's output depends only on its inputs and it has no side effects; it matters because you can test it by just calling it with arguments — no mocking of globals or external state needed",
          "A pure function has no parameters; it matters for tree-shaking",
          "A pure function is declared with the `function` keyword, not as an arrow"
        ],
        correctIndex: 1,
        explanation: "Pure functions are deterministic — same inputs, same output, no external changes. This makes unit tests trivial: just call the function with known inputs and assert on the output. No database, no network, no mocks required."
      },
      {
        question: "What is currying and how does it enable partial application?",
        options: [
          "Converting an array of values to function arguments using spread",
          "Transforming a function that takes multiple arguments into a series of single-argument functions, allowing you to pre-fill some arguments and receive a specialized function",
          "A technique for memoizing functions with multiple arguments",
          "Composing two functions to run sequentially"
        ],
        correctIndex: 1,
        explanation: "Currying transforms `multiply(a, b)` into `multiply(a)(b)`. `multiply(2)` partially applies the first argument and returns a `double` function. This enables reusable, specialized functions without explicit wrappers."
      },
      {
        question: "Why is `super()` required before accessing `this` in a derived class constructor?",
        options: [
          "It is a linting convention, not a hard requirement",
          "The derived class's `this` object is not created until the parent constructor runs. Calling `super()` initializes `this`; accessing it before throws a ReferenceError",
          "It imports the parent class methods into the current scope",
          "It is only required when the parent class has private fields"
        ],
        correctIndex: 1,
        explanation: "In JavaScript's class model, the parent constructor is responsible for creating the `this` object. A derived class has no `this` until `super()` is called. The engine enforces this with a `ReferenceError` to prevent using an uninitialized object."
      },
      {
        question: "What does `vi.restoreAllMocks()` do in `afterEach`?",
        options: [
          "Reruns all tests with the original implementation",
          "Restores all mocked functions to their original implementations, preventing mock state from leaking between tests",
          "Clears the test coverage report",
          "Resets the module registry"
        ],
        correctIndex: 1,
        explanation: "Without restoring mocks, a mock set up in one test can affect subsequent tests. `vi.restoreAllMocks()` in `afterEach` ensures each test starts with the real implementations, keeping tests independent and order-agnostic."
      },
      {
        question: "What is the difference between a named import and a namespace import?",
        options: [
          "They are identical",
          "`import { add } from './math'` brings in one exported symbol; `import * as MathUtils from './math'` creates an object with all exports as properties",
          "Namespace imports only work with default exports",
          "Named imports are tree-shaken; namespace imports cannot be tree-shaken (this is their only difference)"
        ],
        correctIndex: 1,
        explanation: "Named imports pull specific exported symbols into local scope. Namespace imports bundle all exports into a single namespace object. Named imports are generally preferred as they give bundlers more tree-shaking opportunities."
      },
      {
        question: "What problem does re-throwing an unknown error in a `catch` block solve?",
        options: [
          "It logs the error to a monitoring service",
          "It ensures errors that your code cannot handle propagate up to a handler that can — preventing silent swallowing of unexpected failures",
          "It converts the error to a user-friendly message",
          "It prevents the error from showing in the browser console"
        ],
        correctIndex: 1,
        explanation: "A catch block should only handle errors it knows how to handle. Errors from unexpected code paths should be re-thrown so global error boundaries, logging middleware, or callers can respond appropriately rather than the error disappearing silently."
      }
    ],

    senior: [
      {
        question: "Describe the exact execution order: sync code → microtasks → macrotasks. Why does this order matter for UI responsiveness?",
        options: [
          "Macrotasks run first, then sync code, then microtasks",
          "All sync code runs first, then the entire microtask queue drains (including newly enqueued microtasks), then rendering occurs, then one macrotask runs. This order means Promise callbacks (microtasks) always run before the next render frame",
          "Sync code, macrotasks, and microtasks all interleave in random order",
          "Microtasks and macrotasks are the same queue with different labels"
        ],
        correctIndex: 1,
        explanation: "The event loop sequence is: run current sync task → drain all microtasks → render if due → run one macrotask → repeat. Understanding this tells you that Promise chains complete before the next render, and that a runaway microtask loop blocks rendering permanently."
      },
      {
        question: "What are the three most common memory leak patterns in JavaScript SPAs?",
        options: [
          "Using `const` too much, deep object cloning, and excessive use of `Map`",
          "Event listeners on `window`/`document` never removed on component cleanup, closures in long-lived `setInterval` timers referencing large objects, and growing caches (Map/Array) with no eviction policy",
          "Using arrow functions, prototype inheritance, and dynamic imports",
          "Calling `JSON.stringify` frequently, using `async/await`, and large CSS files"
        ],
        correctIndex: 1,
        explanation: "These three patterns keep objects alive beyond their useful lifetime: (1) window/document listeners hold references to entire components, (2) setInterval callbacks prevent GC of their closure scope, (3) unbounded caches grow indefinitely. WeakMap and explicit cleanup solve them."
      },
      {
        question: "What is the difference between debounce and throttle, and which is appropriate for a search-as-you-type input?",
        options: [
          "They are identical; use either for search inputs",
          "Throttle fires at a fixed rate regardless of pauses; debounce fires only after a quiet period. Debounce is correct for search — you want to fire when the user stops typing, not at a fixed interval while they type",
          "Debounce fires at a fixed rate; throttle fires after a quiet period. Throttle is correct for search",
          "Debounce is for scroll events; throttle is for input events"
        ],
        correctIndex: 1,
        explanation: "Throttle fires at most once per interval (ideal for scroll/resize). Debounce fires once after activity stops for a delay period (ideal for search — one request per completed input, not one per keystroke)."
      },
      {
        question: "How does the Observer pattern enable loose coupling, and what is a real JavaScript API that uses it?",
        options: [
          "Observer tightly couples emitters and listeners; it is used in class inheritance",
          "Observer allows publishers to emit events without knowing their subscribers, and subscribers to listen without knowing the publisher. Node.js `EventEmitter` and browser `CustomEvent` / `addEventListener` are canonical examples",
          "Observer is only a design pattern concept with no JavaScript implementation",
          "Observer couples emitters to a central registry that all listeners must reference"
        ],
        correctIndex: 1,
        explanation: "Loose coupling means neither side holds a direct reference to the other. This allows components to communicate without depending on each other's implementation. The browser event system, Node.js EventEmitter, and Redux are all Observer pattern implementations."
      },
      {
        question: "What is prototype pollution and how do you defend against it?",
        options: [
          "Adding too many properties to an object's prototype for performance; defended against by limiting prototype chains",
          "A vulnerability where untrusted input with `__proto__` keys is naively merged into an object, adding properties to `Object.prototype` and affecting all objects. Defend with `Object.create(null)` for data stores and key denylists (`__proto__`, `constructor`, `prototype`)",
          "Overriding built-in `Array.prototype` methods; defended by using `const`",
          "A TypeScript type system issue; defended with strict type checks"
        ],
        correctIndex: 1,
        explanation: "If you merge user-supplied JSON with `for...in`, a payload like `{\"__proto__\": {\"isAdmin\": true}}` sets `isAdmin` on `Object.prototype`, affecting every object in the app. Guard by using `Object.keys()` (not `for...in`), denylisting dangerous keys, or using null-prototype objects."
      },
      {
        question: "Why can Web Workers not access the DOM, and how do they communicate results back to the main thread?",
        options: [
          "Web Workers can access the DOM but only for read operations",
          "The DOM is a single-threaded API — concurrent access from multiple threads would cause race conditions. Workers communicate via `postMessage`, which structurally clones data to send it across the thread boundary",
          "Workers access the DOM through a proxy object that queues DOM operations",
          "Workers use SharedArrayBuffer to send DOM node references"
        ],
        correctIndex: 1,
        explanation: "The DOM API is inherently single-threaded — allowing concurrent reads/writes would require complex locking. Workers are isolated for safety. All communication is via message passing: `postMessage` serializes data (or transfers ownership for ArrayBuffers) across the thread boundary."
      },
      {
        question: "What is V8's hidden class optimization and how do inconsistent object shapes break it?",
        options: [
          "Hidden classes are CSS classes injected at parse time; inconsistent naming causes style recalculation",
          "V8 assigns each object a 'hidden class' (shape) based on its properties and order. Objects with the same shape share optimized JIT code. Adding properties conditionally creates different shapes, causing V8 to deoptimize and use slower generic code paths",
          "Hidden classes are only used for prototype chain lookups",
          "V8 hidden classes are a TypeScript feature compiled away at runtime"
        ],
        correctIndex: 1,
        explanation: "V8 tracks the structure of objects as 'hidden classes' (also called 'shapes' or 'maps'). When millions of objects share a shape, V8 compiles highly optimized machine code for property access. Objects with inconsistent shapes (different properties or orders) get separate hidden classes, defeating this optimization."
      },
      {
        question: "How does `WeakMap` prevent memory leaks that a regular `Map` cache would cause?",
        options: [
          "`WeakMap` has a maximum size limit that prevents unbounded growth",
          "`WeakMap` holds weak references to its keys — when the key object is garbage-collected, the `WeakMap` entry is automatically removed. A `Map` holds strong references, keeping key objects alive even when no other code references them",
          "`WeakMap` serializes keys to strings, freeing the original objects",
          "`WeakMap` and `Map` behave identically for GC"
        ],
        correctIndex: 1,
        explanation: "A regular `Map` keeps its keys alive through strong references — even if your code drops all other references to an object, the Map still references it, preventing GC. `WeakMap` uses weak references; if the object becomes otherwise unreachable, it is collected and the entry disappears."
      },
      {
        question: "What is a transferable object in the context of Web Workers, and when should you use one?",
        options: [
          "A regular JavaScript object serialized to JSON for Worker communication",
          "A large binary object (like `ArrayBuffer`) where ownership is transferred to the Worker instead of being copied — a zero-copy O(1) operation. The original reference becomes detached after transfer. Use for images, audio, or large binary datasets",
          "A React component that can render in a Worker",
          "An object that implements the `Transferable` interface defined in TypeScript"
        ],
        correctIndex: 1,
        explanation: "Structured cloning a large `ArrayBuffer` copies all bytes, which is expensive. Transferring moves ownership — the Worker gets the buffer immediately with no copy. The original reference in the main thread becomes detached (unusable). This is critical for performance with large binary data."
      },
      {
        question: "What is Content Security Policy (CSP) and why is it important even after fixing XSS vulnerabilities?",
        options: [
          "CSP sets the content type header for API responses",
          "CSP is an HTTP header that tells the browser which script sources to trust. Even if an XSS bug exists in your code, a strict CSP blocks the injected script from executing if it does not match the allowed sources — defense in depth",
          "CSP prevents CSRF attacks by blocking cross-origin form submissions",
          "CSP is a JavaScript API for sanitizing HTML strings"
        ],
        correctIndex: 1,
        explanation: "CSP is a browser-enforced policy, not a code-level fix. A strict `script-src 'self'` policy blocks injected inline scripts and scripts from untrusted CDNs, even when a vulnerability in your code allows the injection. It is a critical second line of defense."
      },
      {
        question: "Why does a microtask loop (a microtask that enqueues new microtasks indefinitely) block rendering?",
        options: [
          "Microtasks have higher CPU priority than the render pipeline and preempt it",
          "The event loop must fully drain the microtask queue before proceeding to rendering. A microtask that always enqueues a new microtask keeps the queue non-empty forever, preventing the event loop from ever reaching the render step",
          "The render pipeline runs in the same queue as microtasks and is blocked by queue size",
          "Microtask loops only block rendering in Chrome, not Firefox"
        ],
        correctIndex: 1,
        explanation: "After each task, the event loop processes ALL microtasks to completion before rendering. If microtasks keep adding more microtasks, the queue never empties, the render step is never reached, and the page freezes. This is a distinct risk from `setTimeout` loops, which yield to rendering each iteration."
      },
      {
        question: "How does the Command pattern enable undo/redo functionality?",
        options: [
          "By storing the entire application state after every action",
          "By encapsulating each operation as an object with both `execute()` and `undo()` methods, storing executed commands in a history stack, and popping commands off the stack when the user undoes",
          "By making all functions pure so they can be replayed",
          "By using `Proxy` to intercept all mutations and log them"
        ],
        correctIndex: 1,
        explanation: "The Command pattern wraps each user action in an object that knows both how to do and how to undo the action. A history stack stores executed commands. `undo()` pops the last command and calls its inverse; `redo()` re-executes it. This is how text editors and design tools implement undo."
      },
      {
        question: "What is the Proxy object used for in advanced JavaScript patterns?",
        options: [
          "Making fetch requests through a proxy server",
          "Intercepting and customizing fundamental operations on an object (property get, set, delete, function calls) via traps — enabling validation, reactive data systems, logging, and virtual properties",
          "Creating private copies of objects for encapsulation",
          "Providing a fallback for objects that do not exist"
        ],
        correctIndex: 1,
        explanation: "`new Proxy(target, handler)` wraps an object and intercepts operations via handler traps (`get`, `set`, `has`, `apply`, etc.). This enables transparent validation (reject invalid property values), reactivity systems (notify on changes), and meta-programming patterns unavailable any other way."
      },
      {
        question: "Why is consistent object shape important for V8 JIT performance?",
        options: [
          "Consistent shapes reduce memory usage by sharing property storage",
          "V8 compiles one optimized machine code path per hidden class (shape). If all instances of a logical type share the same shape, the JIT code is compiled once and reused for millions of objects. Inconsistent shapes fragment JIT compilation, forcing V8 into slower generic code",
          "Consistent shapes prevent memory leaks",
          "Only TypeScript enforces shape consistency; JavaScript has no optimization benefit"
        ],
        correctIndex: 1,
        explanation: "When V8 encounters many objects with the same shape, it JIT-compiles highly optimized property access code for that shape and reuses it. Objects created with the same properties in the same order all benefit from this single compiled path. Shape divergence (e.g., conditionally added properties) forces separate, less-optimized code paths."
      },
      {
        question: "How does a Worker Pool improve on spawning a new Worker per task?",
        options: [
          "Worker Pools are slower but simpler to implement",
          "Creating a Worker spawns a thread and loads a script, which has non-trivial startup cost. A pool pre-creates a fixed set of workers and reuses them for tasks from a queue, eliminating startup latency and controlling the maximum number of concurrent threads",
          "Worker Pools allow Workers to access the DOM",
          "Worker Pools allow sharing memory between Workers without `postMessage`"
        ],
        correctIndex: 1,
        explanation: "Worker creation is expensive — it spawns an OS thread and executes the Worker script. For frequent short tasks, this overhead dominates. A pool amortizes startup cost across many tasks. The fixed size also prevents unbounded thread creation under high load."
      }
    ]
  }
};
