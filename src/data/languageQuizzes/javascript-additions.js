// JavaScript quiz additions — 3 questions per level
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
  ],
};
