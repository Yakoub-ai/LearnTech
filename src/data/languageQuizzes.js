// Language-specific quizzes
// Keyed by language ID, each with beginner/mid/senior arrays
export const languageQuizzes = {
  'python': {
    beginner: [
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'func', 'def', 'fn'],
        correctIndex: 2,
        explanation: 'Python uses the "def" keyword to define functions, followed by the function name and parentheses.'
      },
      {
        question: 'What is the output of: print(type([1, 2, 3]))?',
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'array'>", "<class 'set'>"],
        correctIndex: 1,
        explanation: 'Square brackets create a list in Python. Lists are ordered, mutable sequences.'
      },
      {
        question: 'Which statement correctly opens a file for reading in Python?',
        options: ["open('file.txt', 'w')", "open('file.txt', 'r')", "file.open('file.txt')", "read('file.txt')"],
        correctIndex: 1,
        explanation: 'The open() function with mode "r" opens a file for reading. This is also the default mode if none is specified.'
      },
      {
        question: 'What does the "elif" keyword do in Python?',
        options: ['Ends a loop', 'Defines an else-if condition', 'Creates an alias', 'Handles an exception'],
        correctIndex: 1,
        explanation: '"elif" is short for "else if" and allows you to check multiple conditions in sequence after an initial "if" statement.'
      },
      {
        question: 'Which data structure uses key-value pairs in Python?',
        options: ['List', 'Tuple', 'Set', 'Dictionary'],
        correctIndex: 3,
        explanation: 'Dictionaries store data as key-value pairs using curly braces, e.g., {"name": "Alice", "age": 30}.'
      },
      {
        question: 'What is the correct way to create a list comprehension that collects even numbers from 1 to 10?',
        options: [
          '[x for x in range(1, 11) if x % 2 == 0]',
          '(x for x in range(1, 11) if x % 2 == 0)',
          '[x in range(1, 11) where x % 2 == 0]',
          'list.filter(lambda x: x % 2 == 0, range(1, 11))',
        ],
        correctIndex: 0,
        explanation: 'List comprehensions use the form [expression for item in iterable if condition]. The first option collects every x from range(1, 11) where x is divisible by 2, producing [2, 4, 6, 8, 10].'
      },
      {
        question: "Which of the following correctly demonstrates Python's preferred way to compare a variable against None?",
        options: [
          'if value == None:',
          'if value is None:',
          'if value === None:',
          'if None.equals(value):',
        ],
        correctIndex: 1,
        explanation: 'PEP 8 recommends using `is` and `is not` to compare with None because None is a singleton. `== None` works but can be overridden by custom __eq__ methods; `is None` always tests identity.'
      },
      {
        question: 'What is the difference between a list and a tuple in Python?',
        options: [
          'Lists allow duplicates; tuples do not',
          'Lists are ordered; tuples are unordered',
          'Lists are mutable; tuples are immutable',
          'Lists support indexing; tuples do not',
        ],
        correctIndex: 2,
        explanation: 'Both lists and tuples are ordered sequences that allow duplicates and support indexing. The key difference is mutability: lists can be modified after creation (append, remove, etc.) while tuples cannot.'
      }
    ],
    mid: [
      {
        question: 'What does the @staticmethod decorator do?',
        options: ['Makes a method private', 'Binds a method to the class instance', 'Defines a method that does not receive self or cls', 'Prevents method overriding'],
        correctIndex: 2,
        explanation: '@staticmethod defines a method that belongs to the class namespace but does not receive an implicit first argument (self or cls).'
      },
      {
        question: 'What is a generator in Python?',
        options: ['A class that generates random numbers', 'A function that uses yield to produce a sequence of values lazily', 'A module for creating test data', 'A built-in function for creating lists'],
        correctIndex: 1,
        explanation: 'Generators use the yield keyword to produce values one at a time, enabling lazy evaluation and memory-efficient iteration over large datasets.'
      },
      {
        question: 'Which typing construct indicates a function can return either a string or None?',
        options: ['str | None (or Optional[str])', 'Union[str]', 'Nullable[str]', 'str?'],
        correctIndex: 0,
        explanation: 'Optional[str] from the typing module (or str | None in Python 3.10+) indicates a value that can be a string or None.'
      },
      {
        question: 'What does the __init__ method do in a Python class?',
        options: ['Destroys the object', 'Initializes a new instance of the class', 'Creates a static method', 'Imports required modules'],
        correctIndex: 1,
        explanation: '__init__ is the constructor method called automatically when a new instance of a class is created. It initializes the object attributes.'
      },
      {
        question: 'Which testing framework is included in the Python standard library?',
        options: ['pytest', 'nose', 'unittest', 'mocha'],
        correctIndex: 2,
        explanation: 'unittest is the built-in testing framework in Python. While pytest is very popular, it is a third-party package that must be installed separately.'
      },
      {
        question: 'What does the `yield` keyword do inside a Python function?',
        options: [
          'Returns a value and terminates the function immediately',
          'Turns the function into a generator that produces values lazily',
          'Pauses the current thread and switches to another coroutine',
          'Raises a StopIteration exception',
        ],
        correctIndex: 1,
        explanation: 'When a function contains `yield`, calling it returns a generator object instead of executing the body. Each call to next() on the generator resumes from after the last yield, enabling memory-efficient lazy evaluation.'
      },
      {
        question: 'Which decorator is used to define a method that receives the class itself (not an instance) as its first argument?',
        options: [
          '@staticmethod',
          '@property',
          '@classmethod',
          '@abstractmethod',
        ],
        correctIndex: 2,
        explanation: '@classmethod receives `cls` as its first argument — the class itself rather than an instance. It is commonly used for alternative constructors (e.g., `MyClass.from_string(...)`).'
      },
      {
        question: 'In Python type hints, what does `Optional[str]` mean?',
        options: [
          'The parameter is not required and will be auto-filled',
          'The value can be a str or None',
          'The return type is unknown',
          'The function has an optional overload for str',
        ],
        correctIndex: 1,
        explanation: '`Optional[str]` from the `typing` module is equivalent to `Union[str, None]` (or `str | None` in Python 3.10+). It signals that the value may be a string or may be absent (None).'
      }
    ],
    senior: [
      {
        question: 'What is the purpose of asyncio.gather()?',
        options: ['To collect garbage', 'To run multiple coroutines concurrently and wait for all to complete', 'To merge multiple lists', 'To synchronize threads'],
        correctIndex: 1,
        explanation: 'asyncio.gather() schedules multiple coroutines to run concurrently and returns their results when all have completed, enabling efficient concurrent I/O operations.'
      },
      {
        question: 'What is a metaclass in Python?',
        options: ['A class that cannot be instantiated', 'A class whose instances are themselves classes', 'A deprecated feature replaced by decorators', 'A class used only for type checking'],
        correctIndex: 1,
        explanation: 'A metaclass is a class whose instances are classes. It controls class creation and can customize class behavior. The default metaclass is "type".'
      },
      {
        question: 'Which module helps investigate memory usage of Python objects?',
        options: ['os', 'sys (sys.getsizeof)', 'memory', 'gc only'],
        correctIndex: 1,
        explanation: 'sys.getsizeof() returns the size of an object in bytes. For deeper analysis, third-party tools like tracemalloc (stdlib) and objgraph can be used.'
      },
      {
        question: 'What is the Global Interpreter Lock (GIL)?',
        options: ['A design pattern for thread safety', 'A mutex that allows only one thread to execute Python bytecode at a time', 'A lock on global variables', 'A security feature preventing code injection'],
        correctIndex: 1,
        explanation: 'The GIL is a mutex in CPython that ensures only one thread executes Python bytecode at a time, which simplifies memory management but limits true parallelism for CPU-bound tasks.'
      },
      {
        question: 'Which design pattern uses __new__ to ensure only one instance of a class exists?',
        options: ['Factory', 'Observer', 'Singleton', 'Strategy'],
        correctIndex: 2,
        explanation: 'The Singleton pattern restricts instantiation to a single object. In Python, overriding __new__ is a common way to implement it by returning the same instance on every call.'
      },
      {
        question: 'What is the primary purpose of Python metaclasses?',
        options: [
          'To create abstract base classes that cannot be instantiated',
          'To control how classes themselves are created and configured',
          'To enforce interface contracts at runtime',
          'To provide multiple inheritance without the diamond problem',
        ],
        correctIndex: 1,
        explanation: 'A metaclass is the class of a class — it controls class creation, not instance creation. By defining `__new__` or `__init__` on a metaclass you can automatically add methods, enforce constraints, or register subclasses at class-definition time.'
      },
      {
        question: 'When should you prefer `multiprocessing` over `threading` in Python?',
        options: [
          'When tasks involve many network requests',
          'When tasks are CPU-bound and need true parallelism',
          'When tasks share large amounts of mutable state',
          'When the code needs to run on a single CPU core',
        ],
        correctIndex: 1,
        explanation: 'CPython threads are limited by the Global Interpreter Lock (GIL), which prevents true parallel execution of Python bytecode. `multiprocessing` spawns separate interpreter processes, each with its own GIL, enabling real parallelism for CPU-bound work.'
      },
      {
        question: 'What does `asyncio.gather(*coroutines)` return when all coroutines complete successfully?',
        options: [
          'A single coroutine that runs them sequentially',
          'A list of results in the order the coroutines finished',
          'A list of results in the order they were passed in',
          'A dictionary mapping coroutine names to results',
        ],
        correctIndex: 2,
        explanation: '`asyncio.gather()` runs all coroutines concurrently and returns a list of their return values in the same order the coroutines were passed — not the order they completed. This makes it easy to associate results with their inputs.'
      }
    ]
  },

  'javascript': {
    beginner: [
      {
        question: 'What is the difference between let and var?',
        options: ['There is no difference', 'let is block-scoped while var is function-scoped', 'var is block-scoped while let is function-scoped', 'let cannot be reassigned'],
        correctIndex: 1,
        explanation: 'let is block-scoped (limited to the enclosing {} block), while var is function-scoped and can lead to unexpected behavior due to hoisting.'
      },
      {
        question: 'Which method adds an element to the end of an array?',
        options: ['array.pop()', 'array.shift()', 'array.push()', 'array.unshift()'],
        correctIndex: 2,
        explanation: 'push() adds one or more elements to the end of an array and returns the new length. pop() removes the last element, shift() removes the first, and unshift() adds to the beginning.'
      },
      {
        question: 'What does document.querySelector(".menu") select?',
        options: ['All elements with class "menu"', 'The first element with class "menu"', 'The element with id "menu"', 'All elements named "menu"'],
        correctIndex: 1,
        explanation: 'querySelector() returns the first element matching the CSS selector. The dot prefix indicates a class selector. Use querySelectorAll() to get all matching elements.'
      },
      {
        question: 'What does === do differently from ==?',
        options: ['Nothing, they are identical', '=== checks both value and type without coercion', '=== only checks type', '== is stricter than ==='],
        correctIndex: 1,
        explanation: '=== is the strict equality operator that checks both value and type without type coercion, while == performs type coercion before comparison (e.g., "1" == 1 is true but "1" === 1 is false).'
      },
      {
        question: 'Which keyword is used to handle errors in JavaScript?',
        options: ['catch only', 'try...catch', 'error...handle', 'rescue'],
        correctIndex: 1,
        explanation: 'The try...catch statement wraps code that might throw an error in a try block and handles it in the catch block, preventing the program from crashing.'
      },
      {
        question: 'What is the output of: console.log(typeof null)?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        explanation: 'typeof null returns "object" — a well-known historical quirk in JavaScript. null is its own primitive type, but the typeof operator has returned "object" for it since the language was first created.'
      },
      {
        question: 'Which variable declaration is block-scoped and cannot be reassigned?',
        options: ['var', 'let', 'const', 'function'],
        correctIndex: 2,
        explanation: 'const is block-scoped and cannot be reassigned after declaration. Note that for objects and arrays, const only prevents reassignment of the binding — the contents can still be mutated.'
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
        explanation: 'filter() creates a new array containing all elements for which the callback function returns true. It does not mutate the original array.'
      }
    ],
    mid: [
      {
        question: 'What is a closure in JavaScript?',
        options: ['A way to close browser windows', 'A function that retains access to its outer scope variables after the outer function has returned', 'A method for closing database connections', 'A syntax for ending code blocks'],
        correctIndex: 1,
        explanation: 'A closure is created when a function retains access to variables from its lexical scope even after the outer function has finished executing. This enables data encapsulation and factory patterns.'
      },
      {
        question: 'What does Object.create(proto) do?',
        options: ['Clones an object deeply', 'Creates a new object with proto as its prototype', 'Creates a class from an object', 'Freezes an object'],
        correctIndex: 1,
        explanation: 'Object.create() creates a new object with the specified object as its prototype, enabling prototypal inheritance without using constructor functions or classes.'
      },
      {
        question: 'What is the purpose of ES Modules (import/export)?',
        options: ['To compress JavaScript files', 'To organize code into reusable, isolated modules with explicit dependencies', 'To convert JavaScript to TypeScript', 'To run JavaScript on the server'],
        correctIndex: 1,
        explanation: 'ES Modules provide a standardized way to split code into separate files with explicit imports and exports, enabling better code organization, tree-shaking, and dependency management.'
      },
      {
        question: 'What does async/await simplify?',
        options: ['Synchronous loops', 'Working with Promises by writing asynchronous code in a synchronous style', 'DOM manipulation', 'CSS animations'],
        correctIndex: 1,
        explanation: 'async/await is syntactic sugar over Promises that lets you write asynchronous code that reads like synchronous code, making it easier to handle sequential async operations and errors.'
      },
      {
        question: 'Which array method returns a new array with elements that pass a test function?',
        options: ['map()', 'filter()', 'reduce()', 'forEach()'],
        correctIndex: 1,
        explanation: 'filter() creates a new array with all elements that pass the test implemented by the provided callback function. map() transforms elements, reduce() accumulates a value, and forEach() has no return value.'
      },
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A function that immediately invokes itself',
          'A function that has access to variables from its outer scope, even after the outer function has returned',
          'A way to prevent a function from being called more than once',
          'A method for closing open network connections',
        ],
        correctIndex: 1,
        explanation: 'A closure is a function that "remembers" the variables from the lexical scope in which it was defined. This works because inner functions maintain a reference to their outer scope even after the outer function has finished executing.'
      },
      {
        question: 'Given: const p = Promise.all([fetch("/a"), fetch("/b")]); what does Promise.all do if one request fails?',
        options: [
          'It returns the results from the successful requests only',
          'It waits for all requests and collects both successes and failures',
          'It rejects immediately with the error from the first failed request',
          'It retries the failed request automatically',
        ],
        correctIndex: 2,
        explanation: 'Promise.all rejects immediately ("fail fast") when any promise in the array rejects. Use Promise.allSettled instead if you want all results regardless of individual failures.'
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
        explanation: 'The # prefix creates a genuinely private field enforced by the JavaScript engine. Unlike the underscore naming convention, accessing #field from outside the class causes a SyntaxError — there is no workaround.'
      }
    ],
    senior: [
      {
        question: 'In what order does the event loop process its queues?',
        options: ['Microtasks and macrotasks are processed in FIFO order together', 'Macrotasks first, then microtasks', 'All microtasks are drained before the next macrotask runs', 'The order is random and non-deterministic'],
        correctIndex: 2,
        explanation: 'The event loop processes one macrotask (e.g., setTimeout callback), then drains the entire microtask queue (Promises, queueMicrotask) before picking up the next macrotask.'
      },
      {
        question: 'What causes a memory leak from event listeners?',
        options: ['Using addEventListener instead of onclick', 'Adding listeners to elements that are removed from the DOM without removing the listeners', 'Using arrow functions as callbacks', 'Using named functions as callbacks'],
        correctIndex: 1,
        explanation: 'When DOM elements are removed but their event listeners still reference them (or their closures hold references), the garbage collector cannot free that memory, causing a leak.'
      },
      {
        question: 'What is the main benefit of Web Workers?',
        options: ['They speed up DOM rendering', 'They run JavaScript on a separate thread, preventing UI blocking for CPU-intensive tasks', 'They replace service workers', 'They enable server-side rendering'],
        correctIndex: 1,
        explanation: 'Web Workers run scripts in background threads separate from the main thread, allowing CPU-intensive computations without freezing the user interface.'
      },
      {
        question: 'Which technique improves performance by delaying function execution until after a pause in calls?',
        options: ['Throttling', 'Debouncing', 'Memoization', 'Lazy loading'],
        correctIndex: 1,
        explanation: 'Debouncing delays execution until a specified time has passed since the last call. This is useful for search inputs or resize handlers where you only need the final value.'
      },
      {
        question: 'What is the primary defense against Cross-Site Scripting (XSS)?',
        options: ['Using HTTPS', 'Sanitizing and escaping user input before rendering it in the DOM', 'Minifying JavaScript', 'Using strict mode'],
        correctIndex: 1,
        explanation: 'XSS attacks inject malicious scripts via user input. The primary defense is sanitizing/escaping all user-provided content before inserting it into the DOM, along with Content Security Policy headers.'
      },
      {
        question: 'In what order does this code log? setTimeout(() => log("A"), 0); Promise.resolve().then(() => log("B")); log("C");',
        options: [
          'A, B, C',
          'C, A, B',
          'C, B, A',
          'B, C, A',
        ],
        correctIndex: 2,
        explanation: 'C logs first (synchronous). Then B logs (Promise.then callbacks are microtasks and drain before any macrotask). Then A logs (setTimeout callbacks are macrotasks, processed after all microtasks clear).'
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
        explanation: 'The browser queues render steps similarly to tasks. The event loop can only process render steps and other callbacks when the call stack is empty. An infinite synchronous loop keeps the stack occupied forever, starving all other work.'
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
        explanation: 'WeakMap holds weak (non-preventing) references to its keys. When a key object is garbage collected, the corresponding WeakMap entry is automatically removed. This prevents memory leaks when caching metadata about objects that may be removed from the DOM.'
      }
    ]
  },

  'html-css': {
    beginner: [
      {
        question: 'Which HTML element is the correct semantic tag for main navigation?',
        options: ['<div id="nav">', '<nav>', '<menu>', '<navigation>'],
        correctIndex: 1,
        explanation: 'The <nav> element represents a section of navigation links. Using semantic elements improves accessibility and SEO compared to generic <div> elements.'
      },
      {
        question: 'What does the "action" attribute on a <form> element specify?',
        options: ['The HTTP method to use', 'The URL where the form data is sent', 'The encoding type', 'The form validation rules'],
        correctIndex: 1,
        explanation: 'The action attribute defines the URL that processes the form submission. The method attribute (GET/POST) defines how data is sent.'
      },
      {
        question: 'In the CSS box model, what is the correct order from inside to outside?',
        options: ['Margin, border, padding, content', 'Content, padding, border, margin', 'Content, margin, padding, border', 'Padding, content, border, margin'],
        correctIndex: 1,
        explanation: 'The CSS box model layers from inside out are: content (the actual element), padding (space around content), border (around padding), and margin (space outside the border).'
      },
      {
        question: 'Which CSS property makes a flex container distribute items evenly with space between them?',
        options: ['align-items: center', 'justify-content: space-between', 'flex-wrap: wrap', 'flex-direction: row'],
        correctIndex: 1,
        explanation: 'justify-content: space-between distributes flex items so that the first item is at the start, the last at the end, and remaining items have equal space between them.'
      },
      {
        question: 'What does the CSS media query @media (max-width: 768px) target?',
        options: ['Screens wider than 768px', 'Screens exactly 768px wide', 'Screens 768px wide or narrower', 'Print layouts only'],
        correctIndex: 2,
        explanation: 'max-width: 768px applies styles when the viewport width is 768px or less. This is a common breakpoint for targeting tablet and mobile devices in responsive design.'
      },
      {
        question: 'What is the purpose of the alt attribute on an <img> element?',
        options: [
          'It sets the image title shown on hover',
          'It provides a text description read by screen readers and displayed when the image fails to load',
          'It controls the image dimensions',
          'It specifies a fallback image URL',
        ],
        correctIndex: 1,
        explanation: 'The alt attribute provides alternative text for an image. Screen readers announce it to visually impaired users, and browsers display it when the image cannot be loaded. An empty alt="" tells assistive technology to ignore the image (suitable for decorative images).'
      },
      {
        question: 'Which CSS unit is relative to the font-size of the root (<html>) element?',
        options: ['em', 'rem', 'px', 'vh'],
        correctIndex: 1,
        explanation: 'rem (root em) is always relative to the font-size set on the <html> element (typically 16px by default). Unlike em, which is relative to the current element\'s font-size and can compound unpredictably, rem stays consistent no matter how deeply nested the element is.'
      },
      {
        question: 'What does box-sizing: border-box do in CSS?',
        options: [
          'It removes the margin from the box model calculation',
          'It makes the element\'s width and height include padding and border, not just the content area',
          'It forces all elements to have a visible border',
          'It sets the display type to block',
        ],
        correctIndex: 1,
        explanation: 'By default (content-box), width and height apply only to the content area — padding and border are added on top. With border-box, the specified width and height include padding and border, making layout arithmetic much more intuitive. Most modern CSS resets apply box-sizing: border-box to all elements.'
      }
    ],
    mid: [
      {
        question: 'What are CSS custom properties (CSS variables) and how are they scoped?',
        options: ['They are preprocessor variables scoped to files', 'They are runtime variables defined with -- prefix and scoped to the element and its descendants', 'They are constants that cannot change', 'They are only available in JavaScript'],
        correctIndex: 1,
        explanation: 'CSS custom properties (e.g., --primary-color: blue) are scoped to the element they are declared on and inherited by descendants. They can be updated at runtime, unlike preprocessor variables.'
      },
      {
        question: 'Which CSS property creates a smooth transition between two animation states?',
        options: ['transform', 'transition', 'animation-fill-mode', 'will-change'],
        correctIndex: 1,
        explanation: 'The transition property defines how CSS property changes occur over a duration, e.g., transition: opacity 0.3s ease. For complex multi-step animations, use @keyframes with the animation property.'
      },
      {
        question: 'What does BEM stand for in CSS methodology?',
        options: ['Block, Element, Modifier', 'Build, Extend, Merge', 'Base, Extension, Mixin', 'Browser, Engine, Module'],
        correctIndex: 0,
        explanation: 'BEM (Block, Element, Modifier) is a naming convention for CSS classes. A Block is a standalone entity, an Element is a part of a block, and a Modifier is a variant (e.g., button__icon--large).'
      },
      {
        question: 'Which attribute makes an image accessible to screen readers?',
        options: ['title', 'alt', 'aria-label (on images)', 'name'],
        correctIndex: 1,
        explanation: 'The alt attribute provides alternative text for images, which screen readers announce to visually impaired users. It also displays when the image fails to load.'
      },
      {
        question: 'What does the ::before pseudo-element do?',
        options: ['Selects the element before the current one in the DOM', 'Creates a virtual child element before the content of the selected element', 'Triggers before the page loads', 'Applies styles before other rules'],
        correctIndex: 1,
        explanation: '::before creates a pseudo-element that is the first child of the selected element. It requires a content property and is often used for decorative elements without extra HTML.'
      },
      {
        question: 'What is the difference between display: none and visibility: hidden?',
        options: [
          'They are identical — both hide the element and remove it from the document flow',
          'display: none removes the element from layout entirely; visibility: hidden hides it but keeps its space in the layout',
          'visibility: hidden also removes the element from the layout',
          'display: none only works on block elements',
        ],
        correctIndex: 1,
        explanation: 'display: none collapses the element completely — it takes up no space and is not rendered. visibility: hidden makes the element invisible but it still occupies its original space in the document flow. A third option, opacity: 0, also keeps the space but retains pointer events unlike visibility: hidden.'
      },
      {
        question: 'In a CSS Grid layout, what does the fr unit represent?',
        options: [
          'A fixed pixel fraction of the container',
          'A fraction of the available free space in the grid container after fixed-size tracks are allocated',
          'Font-relative units, identical to rem',
          'A minimum size constraint',
        ],
        correctIndex: 1,
        explanation: 'fr stands for fractional unit. After fixed and min-content tracks are placed, the remaining space in the grid container is divided proportionally among fr-sized tracks. For example, grid-template-columns: 1fr 2fr creates two columns where the second is twice the width of the first.'
      },
      {
        question: 'Which ARIA attribute should be added to a button that controls an expandable panel to communicate its current state?',
        options: [
          'role="toggle"',
          'aria-expanded="true" or aria-expanded="false"',
          'aria-hidden="false"',
          'aria-selected="true"',
        ],
        correctIndex: 1,
        explanation: 'aria-expanded tells assistive technologies whether the element the button controls is currently expanded (true) or collapsed (false). This must be toggled with JavaScript when the panel opens or closes. Without it, screen reader users cannot determine the state of the UI.'
      }
    ],
    senior: [
      {
        question: 'What is ITCSS in CSS architecture?',
        options: ['A CSS framework like Bootstrap', 'Inverted Triangle CSS: a methodology that organizes styles from generic to specific to reduce specificity conflicts', 'A CSS-in-JS library', 'An inline style optimization tool'],
        correctIndex: 1,
        explanation: 'ITCSS (Inverted Triangle CSS) organizes CSS in layers from generic (settings, tools, resets) to specific (components, utilities), creating a healthy specificity graph that minimizes conflicts.'
      },
      {
        question: 'What do CSS container queries allow that media queries cannot?',
        options: ['Querying viewport width', 'Styling elements based on the size of their parent container rather than the viewport', 'Querying device orientation', 'Checking network speed'],
        correctIndex: 1,
        explanation: 'Container queries (@container) let components adapt their styles based on the size of their containing element, enabling truly reusable components that respond to their context, not just viewport size.'
      },
      {
        question: 'What is the purpose of CSS cascade layers (@layer)?',
        options: ['To create visual layering with z-index', 'To explicitly control the order of precedence between groups of styles, regardless of specificity', 'To lazy-load CSS files', 'To create CSS animations in layers'],
        correctIndex: 1,
        explanation: '@layer allows authors to define explicit layers of specificity. Styles in later-declared layers override earlier ones regardless of selector specificity, giving developers more control over the cascade.'
      },
      {
        question: 'Which CSS property hints to the browser that an element will change, allowing rendering optimization?',
        options: ['display: none', 'will-change', 'visibility: hidden', 'contain: strict'],
        correctIndex: 1,
        explanation: 'will-change tells the browser which properties will animate, allowing it to set up optimizations (like promoting the element to its own compositor layer) before the change occurs.'
      },
      {
        question: 'What are design tokens in a design system?',
        options: ['Authentication tokens for design tools', 'The smallest named units of design decisions (colors, spacing, typography) stored as platform-agnostic variables', 'Encrypted CSS values', 'Build-time compilation flags'],
        correctIndex: 1,
        explanation: 'Design tokens are atomic design decisions (e.g., color-primary: #0066cc, spacing-md: 16px) stored in a format that can be transformed into CSS variables, iOS values, Android resources, etc.'
      },
      {
        question: 'What problem do CSS cascade layers (@layer) primarily solve?',
        options: [
          'They allow CSS to be lazy-loaded in layers for performance',
          'They give authors explicit control over the order of precedence between groups of styles, removing the need to fight specificity wars between third-party libraries and custom code',
          'They create z-index stacking contexts automatically',
          'They scope CSS variables to specific components',
        ],
        correctIndex: 1,
        explanation: '@layer lets you define named layers (e.g., @layer reset, base, components, utilities) where later-declared layers always win over earlier ones regardless of selector specificity. This solves the classic problem of a third-party library\'s high-specificity selectors overriding your own styles — just put library styles in an earlier layer.'
      },
      {
        question: 'What is the key architectural advantage of utility-first CSS (e.g., Tailwind CSS) over component-based CSS (e.g., BEM)?',
        options: [
          'Utility-first produces smaller HTML file sizes',
          'Utility-first eliminates the need for any CSS files',
          'Utility-first avoids naming abstractions and stylesheet growth — the CSS bundle size is bounded by the number of utilities, not the number of components',
          'Utility-first is easier to read for developers unfamiliar with CSS',
        ],
        correctIndex: 2,
        explanation: 'In component-based CSS, every new component typically adds new CSS rules, causing the stylesheet to grow unboundedly over time. With utility-first CSS, you compose design directly in the HTML from a fixed set of atomic classes. The CSS bundle stops growing after all utilities are generated — new components add HTML but no new CSS. This is a fundamental difference in how stylesheet size scales.'
      },
      {
        question: 'What distinguishes CSS container queries from media queries in terms of component design?',
        options: [
          'Container queries are faster to evaluate than media queries',
          'Container queries allow a component to adapt its styles based on the size of its own parent container, making it reusable regardless of where in the page it is placed',
          'Container queries only work on flex containers',
          'Container queries require JavaScript to function',
        ],
        correctIndex: 1,
        explanation: 'Media queries respond to the viewport width, which means a component\'s responsive behaviour is tied to the page layout. Container queries (@container) respond to the nearest containment ancestor\'s size, so the same component can render differently in a narrow sidebar and a wide main area — without any layout-aware wrappers or JavaScript.'
      }
    ]
  },

  'sql': {
    beginner: [
      {
        question: 'Which SQL clause is used to filter rows returned by a query?',
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctIndex: 2,
        explanation: 'The WHERE clause filters rows before grouping. HAVING filters after grouping, ORDER BY sorts results, and GROUP BY groups rows for aggregate functions.'
      },
      {
        question: 'What type of JOIN returns only rows that have matching values in both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
        correctIndex: 2,
        explanation: 'INNER JOIN returns only the rows where there is a match in both tables. LEFT JOIN includes all rows from the left table, RIGHT JOIN from the right, and FULL OUTER JOIN from both.'
      },
      {
        question: 'Which aggregate function counts the number of non-NULL values in a column?',
        options: ['SUM()', 'COUNT(*)', 'COUNT(column)', 'TOTAL()'],
        correctIndex: 2,
        explanation: 'COUNT(column) counts non-NULL values in that column. COUNT(*) counts all rows including NULLs. SUM() adds numeric values together.'
      },
      {
        question: 'What is a subquery?',
        options: ['A query that runs on a subset of columns', 'A query nested inside another query', 'A query that only returns one row', 'A query without a WHERE clause'],
        correctIndex: 1,
        explanation: 'A subquery is a SELECT statement embedded within another SQL statement. It can appear in WHERE, FROM, or SELECT clauses and is evaluated first to provide data to the outer query.'
      },
      {
        question: 'What is the purpose of an index in SQL?',
        options: ['To enforce unique constraints only', 'To speed up data retrieval by creating an optimized lookup structure', 'To store backup copies of data', 'To sort data permanently in the table'],
        correctIndex: 1,
        explanation: 'An index creates a data structure (usually a B-tree) that allows the database to find rows quickly without scanning the entire table, significantly improving query performance on indexed columns.'
      },
      {
        question: 'You have an index on the `order_date` column, but the following query still performs a full table scan. What is the most likely cause?\n\nSELECT SUM(total) FROM orders WHERE YEAR(order_date) = 2025;',
        options: [
          'The index needs to be rebuilt with REINDEX before it can be used',
          'Applying a function to an indexed column prevents the database from using the index',
          'SUM() aggregate functions always force a full table scan',
          'The index is on the wrong data type for year comparisons',
        ],
        correctIndex: 1,
        explanation: 'When you wrap an indexed column in a function such as YEAR(), the database cannot use a B-tree index on that column. The index stores the raw date values in sorted order; after applying a function the result has no connection to those stored values. The fix is to rewrite the filter as an explicit date range: WHERE order_date >= \'2025-01-01\' AND order_date < \'2026-01-01\'.'
      },
      {
        question: 'Which of the following correctly explains why `SELECT *` is considered an anti-pattern in production queries?',
        options: [
          'SELECT * is slower because the SQL parser takes longer to expand the wildcard',
          'SELECT * fetches all columns, increasing network transfer and memory use, and can break application code if the schema changes',
          'SELECT * cannot be used with WHERE clauses',
          'SELECT * always forces the database to perform a sequential scan',
        ],
        correctIndex: 1,
        explanation: 'SELECT * retrieves every column in the table, which increases the amount of data transferred over the network and loaded into memory. More importantly, if a column is added, removed, or reordered, application code that relies on column position or assumes a fixed set of columns can silently break. Naming only the columns you need makes queries self-documenting and resilient to schema changes.'
      },
      {
        question: 'A query uses `WHERE status = \'cancelled\' AND order_date < \'2024-01-01\'`. You have a composite index on `(status, order_date)`. Which of the following statements about this index is correct?',
        options: [
          'The index cannot be used because the query has two conditions',
          'The index is used for both conditions: equality on status narrows the set, then the range on order_date filters within it',
          'The index is only used for the order_date condition because date columns are more selective',
          'Composite indexes are only useful when both conditions use equality operators',
        ],
        correctIndex: 1,
        explanation: 'A composite index on (status, order_date) is used left to right. The leading equality condition on status eliminates all rows with other statuses, then the inequality on order_date further narrows the result within the matching status group. This is the ideal use of a composite index: equality filters first, range filters last.'
      }
    ],
    mid: [
      {
        question: 'What does a window function like ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) do?',
        options: ['Deletes duplicate rows', 'Assigns a sequential number to rows within each department, ordered by salary descending', 'Groups rows by department', 'Creates a new table partition'],
        correctIndex: 1,
        explanation: 'Window functions perform calculations across a set of rows related to the current row. PARTITION BY divides rows into groups, and ORDER BY determines the numbering order within each partition.'
      },
      {
        question: 'What is a CTE (Common Table Expression)?',
        options: ['A permanent database view', 'A temporary named result set defined with WITH that exists only for the duration of a single query', 'A stored procedure', 'A type of index'],
        correctIndex: 1,
        explanation: 'A CTE (WITH ... AS) creates a temporary, named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. It improves readability and can be recursive.'
      },
      {
        question: 'What does COMMIT do in a transaction?',
        options: ['Starts a new transaction', 'Undoes all changes since the transaction began', 'Permanently saves all changes made during the transaction', 'Locks the table for other users'],
        correctIndex: 2,
        explanation: 'COMMIT permanently applies all changes made during the current transaction to the database. ROLLBACK undoes them. Transactions ensure atomicity: all changes succeed or none do.'
      },
      {
        question: 'What is a database view?',
        options: ['A physical copy of a table', 'A saved query that acts as a virtual table', 'A user interface for databases', 'A type of index'],
        correctIndex: 1,
        explanation: 'A view is a stored SELECT query that behaves like a virtual table. It does not store data itself but provides an abstraction layer, simplifying complex queries and controlling access.'
      },
      {
        question: 'What is Third Normal Form (3NF)?',
        options: ['A table with at least three columns', 'A state where all non-key attributes depend only on the primary key with no transitive dependencies', 'A table with three indexes', 'A backup strategy using three copies'],
        correctIndex: 1,
        explanation: '3NF requires that every non-key column depends only on the primary key (not on other non-key columns). This eliminates transitive dependencies and reduces data redundancy.'
      },
      {
        question: 'You add an index to a column but the database\'s query planner still chooses a full table scan over the index. What is the most likely reason?',
        options: [
          'The index was created with incorrect syntax and is invalid',
          'The query needs columns that are not in the index, so fetching each row individually via the index costs more than batch-reading the whole table',
          'Full table scans are always chosen when the table has more than one million rows',
          'The database requires a VACUUM before newly created indexes become active',
        ],
        correctIndex: 1,
        explanation: 'An index only stores values for its indexed columns plus a row ID. If the query needs additional columns not in the index, the database must perform a separate heap fetch for each matching row. When the matching set is large, those individual random reads can be slower than a sequential full table scan that reads everything in batches. The solution is a covering index (using INCLUDE in PostgreSQL) that adds the extra columns so the query can be satisfied entirely from the index — an index-only scan.'
      },
      {
        question: 'You have a composite index on `(user_id, created_at)` and want to query: `WHERE user_id = 136 AND created_at BETWEEN \'2013-01-01\' AND \'2013-12-31\'`. How does the index column order affect this query?',
        options: [
          'Column order does not matter; the optimizer will use whichever column is more selective',
          'user_id should be second because created_at is used for range filtering and must lead the index',
          'user_id as the leading column is correct: equality on user_id narrows rows first, then the range on created_at filters within those rows',
          'The index cannot be used because BETWEEN operators require a separate index',
        ],
        correctIndex: 2,
        explanation: 'A composite index is usable from left to right. Placing user_id first with an equality condition is ideal: the database jumps directly to all rows for that user, then uses the sorted created_at values within that group to apply the range filter. If created_at were leading, the range condition would prevent the database from using user_id for filtering at all, because inequality operators stop further index use on subsequent columns.'
      },
      {
        question: 'Which window function correctly returns the rank of each product by price within its category, assigning the same rank to ties but NOT skipping subsequent rank numbers?',
        options: [
          'ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)',
          'RANK() OVER (PARTITION BY category ORDER BY price DESC)',
          'DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC)',
          'NTILE(1) OVER (PARTITION BY category ORDER BY price DESC)',
        ],
        correctIndex: 2,
        explanation: 'DENSE_RANK() assigns the same rank to tied values and does not skip numbers after a tie. For example, two products priced at $100 both receive rank 1, and the next product receives rank 2. RANK() also handles ties but skips numbers — those two $100 products still both get rank 1, but the next product gets rank 3 (skipping 2). ROW_NUMBER() never assigns the same number to two rows even if their values are identical.'
      }
    ],
    senior: [
      {
        question: 'What information does an EXPLAIN (or EXPLAIN ANALYZE) output provide?',
        options: ['The SQL syntax errors', 'The execution plan showing how the database will process the query, including join methods, scan types, and estimated costs', 'The table creation DDL', 'The list of users with access'],
        correctIndex: 1,
        explanation: 'EXPLAIN shows the query execution plan: which indexes are used, join algorithms (nested loop, hash, merge), scan types (sequential vs index), estimated rows, and actual timings with ANALYZE.'
      },
      {
        question: 'What is a covering index?',
        options: ['An index that spans multiple tables', 'An index that includes all columns needed by a query, so the table data does not need to be accessed', 'An index on a primary key', 'A backup index for disaster recovery'],
        correctIndex: 1,
        explanation: 'A covering index contains all columns referenced in a query. The database can satisfy the query entirely from the index without looking up the actual table rows, greatly improving performance.'
      },
      {
        question: 'What is table partitioning used for?',
        options: ['Splitting a table across multiple databases for redundancy', 'Dividing a large table into smaller physical segments based on a key to improve query performance and maintenance', 'Creating read-only copies', 'Encrypting sensitive columns'],
        correctIndex: 1,
        explanation: 'Partitioning splits a large table into smaller physical pieces (e.g., by date range or hash). Queries can skip irrelevant partitions (partition pruning), and maintenance operations run on individual partitions.'
      },
      {
        question: 'What is the difference between optimistic and pessimistic locking?',
        options: ['They are the same but with different names', 'Optimistic locking checks for conflicts at commit time; pessimistic locking acquires locks upfront to prevent conflicts', 'Optimistic locking is faster because it uses no locks at all', 'Pessimistic locking only works in NoSQL databases'],
        correctIndex: 1,
        explanation: 'Pessimistic locking acquires locks before modifying data, preventing others from making conflicting changes. Optimistic locking allows concurrent access but checks for conflicts (via version numbers or timestamps) before committing.'
      },
      {
        question: 'What is a zero-downtime schema migration?',
        options: ['Dropping and recreating tables instantly', 'A multi-phase approach where schema changes are applied gradually without taking the application offline', 'Running migrations only during off-peak hours', 'Using a different database for each migration'],
        correctIndex: 1,
        explanation: 'Zero-downtime migrations use techniques like expand-and-contract: add new columns/tables, deploy code that writes to both old and new, backfill data, switch reads, then remove old columns -- all without downtime.'
      },
      {
        question: 'In PostgreSQL\'s MVCC implementation, what happens internally when you UPDATE a row?',
        options: [
          'The existing row is modified in place and the old value is stored in a separate undo log',
          'The old row version has its xmax set to the current transaction ID, and a new row version is written with xmin set to the current transaction ID',
          'The row is locked and written to a write-ahead log; the heap page is not changed until COMMIT',
          'A copy of the row is written to a temporary buffer and swapped atomically with the original at COMMIT',
        ],
        correctIndex: 1,
        explanation: 'PostgreSQL\'s MVCC model never modifies rows in place. Instead, an UPDATE marks the old row version as expired by setting its hidden xmax column to the current transaction ID, then inserts a brand-new row version with xmin set to the current transaction ID. Concurrent readers see whichever version matches their transaction snapshot. The old "dead tuple" remains on disk until VACUUM reclaims the space, which is why long-running transactions and high-churn tables require careful autovacuum tuning.'
      },
      {
        question: 'You need to add a foreign key constraint to an `orders` table with 50 million rows without blocking application writes. What is the correct PostgreSQL approach?',
        options: [
          'Use a transaction-level table lock and add the constraint inside a single long transaction',
          'Add the constraint as NOT VALID (instant, skips existing rows), then validate it separately with ALTER TABLE ... VALIDATE CONSTRAINT',
          'Drop and recreate the orders table with the constraint defined in CREATE TABLE',
          'Use CREATE INDEX CONCURRENTLY on the foreign key column before adding the constraint',
        ],
        correctIndex: 1,
        explanation: 'The two-step approach keeps writes unblocked throughout. NOT VALID adds the constraint immediately without scanning existing rows — new rows are checked from that point on. The subsequent VALIDATE CONSTRAINT scans existing rows holding only a ShareUpdateExclusiveLock, which blocks neither reads nor writes (only other DDL). This is the standard zero-downtime pattern for adding referential integrity to large existing tables.'
      },
      {
        question: 'When choosing between a Nested Loop Join, Hash Join, and Merge Join, which combination of conditions makes a Hash Join the best choice?',
        options: [
          'Both tables are small and one has an index on the join column',
          'Both tables are large, there are no indexes on the join columns, and memory is sufficient to build a hash table from the smaller table',
          'Both inputs are already sorted on the join key and the query requires the result in sorted order',
          'The outer table returns only a few rows after filtering and the inner table has an index on the join key',
        ],
        correctIndex: 1,
        explanation: 'A Hash Join builds an in-memory hash table from the smaller relation, then probes it with each row from the larger relation — O(N + M) cost with no index requirement. It is optimal when both tables are large, no useful index exists on the join columns, and the smaller table fits in work_mem. A Nested Loop is best when the outer side is small and the inner has an index (O(N log M)). A Merge Join wins when both inputs arrive pre-sorted, avoiding the sort cost and enabling a single linear pass through each.'
      }
    ]
  },

  'typescript': {
    beginner: [
      {
        question: 'What is the purpose of type annotations in TypeScript?',
        options: ['To make code run faster', 'To explicitly declare the expected type of a variable, parameter, or return value for compile-time checking', 'To add comments to code', 'To convert JavaScript to a compiled language'],
        correctIndex: 1,
        explanation: 'Type annotations (e.g., let name: string) tell the TypeScript compiler what type a value should be, catching type errors at compile time before the code runs.'
      },
      {
        question: 'What is the difference between an interface and a type alias?',
        options: ['There is no difference', 'Interfaces can be extended with "extends" and merged via declaration merging; type aliases use intersections and cannot be merged', 'Type aliases are faster at runtime', 'Interfaces can only describe objects with methods'],
        correctIndex: 1,
        explanation: 'Interfaces support declaration merging (adding properties in multiple declarations) and extends. Type aliases use & for intersection and can represent unions, tuples, and primitives -- which interfaces cannot.'
      },
      {
        question: 'What does a union type like string | number mean?',
        options: ['The value is both a string and a number simultaneously', 'The value can be either a string or a number', 'The value is converted from string to number', 'It creates a new type called stringnumber'],
        correctIndex: 1,
        explanation: 'A union type (A | B) means the value can be any one of the listed types. You must narrow the type (e.g., with typeof checks) before using type-specific methods.'
      },
      {
        question: 'What does the generic syntax <T> allow in a function?',
        options: ['It creates an HTML tag', 'It defines a type parameter that makes the function work with any type while preserving type information', 'It makes the function private', 'It specifies the return type'],
        correctIndex: 1,
        explanation: 'Generics (e.g., function identity<T>(arg: T): T) let you write reusable functions that work with multiple types while maintaining type safety, instead of using "any".'
      },
      {
        question: 'What is the tsconfig.json file used for?',
        options: ['To configure the web server', 'To specify TypeScript compiler options and project settings', 'To list npm dependencies', 'To define environment variables'],
        correctIndex: 1,
        explanation: 'tsconfig.json configures the TypeScript compiler: which files to include, the target JavaScript version, module system, strictness level, output directory, and many other compilation options.'
      },
      {
        question: 'What is the key difference between the `any` and `unknown` types in TypeScript?',
        options: [
          '`any` and `unknown` are identical — both disable type checking',
          '`unknown` requires you to narrow the type before using it; `any` skips all type checks',
          '`unknown` is only valid for function parameters; `any` works everywhere',
          '`any` is for primitive types; `unknown` is for object types',
        ],
        correctIndex: 1,
        explanation: '`unknown` is the type-safe counterpart to `any`. You must narrow an `unknown` value (with typeof, instanceof, or a type guard) before calling methods or accessing properties on it. `any` skips all checking entirely, which hides bugs.'
      },
      {
        question: 'A team debates whether to use `enum Direction { Up, Down, Left, Right }` or a plain object with `as const`. Which statement best describes the trade-off?',
        options: [
          'Enums are always preferred because they are more readable and produce cleaner JavaScript output',
          'The `as const` object pattern is identical to an enum at runtime',
          'Numeric enums compile to a reverse-mapped object (e.g., both `Direction.Up === 0` and `Direction[0] === "Up"`), which can cause unexpected behavior with `Object.values()`; `as const` objects produce exactly what you write',
          '`const enum` and `as const` are the same thing — both are erased at compile time',
        ],
        correctIndex: 2,
        explanation: 'Numeric TypeScript enums generate a reverse mapping at runtime, so `Object.values(Direction)` returns both the numeric values and the string names. A POJO with `as const` produces exactly the object you wrote — no surprises, no bloat, and it works with every modern bundler.'
      },
      {
        question: 'Given `const config = { retries: 3, timeout: 5000 } as const`, what is the type of `config.retries`?',
        options: ['number', '3', 'readonly number', 'const number'],
        correctIndex: 1,
        explanation: '`as const` applies a "const assertion" that narrows every value to its literal type and marks every property as `readonly`. So `config.retries` has type `3` (the literal number three), not the wider `number` type.'
      }
    ],
    mid: [
      {
        question: 'What does the Partial<T> utility type do?',
        options: ['Makes all properties of T required', 'Makes all properties of T optional', 'Removes all methods from T', 'Extracts only string properties from T'],
        correctIndex: 1,
        explanation: 'Partial<T> constructs a type with all properties of T set to optional. This is useful for update functions where you only want to provide a subset of fields.'
      },
      {
        question: 'What is a mapped type in TypeScript?',
        options: ['A type created by the Map class', 'A type that transforms each property of an existing type using a mapping syntax like { [K in keyof T]: ... }', 'An array type with map method', 'A geographic coordinates type'],
        correctIndex: 1,
        explanation: 'Mapped types iterate over keys of a type and transform them: { [K in keyof T]: NewType }. Built-in utility types like Partial, Required, and Readonly are implemented as mapped types.'
      },
      {
        question: 'What does a conditional type like T extends string ? A : B do?',
        options: ['Checks at runtime if T is a string', 'Selects type A if T is assignable to string, otherwise selects type B, resolved at compile time', 'Creates an if-else statement', 'Converts T to a string'],
        correctIndex: 1,
        explanation: 'Conditional types choose between two types based on a condition. They are resolved at compile time and are especially powerful when combined with generics for type-level logic.'
      },
      {
        question: 'What does enabling "strict": true in tsconfig.json do?',
        options: ['Disables all type checking', 'Enables a set of strict type-checking options including strictNullChecks, noImplicitAny, and others', 'Makes all variables read-only', 'Prevents any imports'],
        correctIndex: 1,
        explanation: '"strict": true is a shorthand that enables multiple strict flags: strictNullChecks, strictFunctionTypes, strictBindCallApply, noImplicitAny, noImplicitThis, and alwaysStrict.'
      },
      {
        question: 'What is the infer keyword used for in conditional types?',
        options: ['To infer the return type of a function at runtime', 'To declare a type variable within a conditional type that TypeScript should infer from context', 'To import types automatically', 'To create inference rules for ESLint'],
        correctIndex: 1,
        explanation: 'infer lets you extract and name a type within a conditional type. For example, type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never extracts the return type R.'
      },
      {
        question: 'You have `interface ApiResponse<T = unknown, E = Error>`. What does the `= unknown` part do?',
        options: [
          'It makes the `T` parameter required and defaults it to `unknown` if a wrong type is passed',
          'It provides a default type argument so `ApiResponse` can be used without specifying `T`, in which case `T` is `unknown`',
          'It forces all usages of `ApiResponse` to use `unknown` as the data type',
          'It is equivalent to `ApiResponse<any>` and disables type checking for the data field',
        ],
        correctIndex: 1,
        explanation: 'Default type parameters work like default function parameters. Writing `ApiResponse` without a type argument is the same as writing `ApiResponse<unknown, Error>`. This makes the generic convenient to use when the exact type is not yet known, while still being safer than `any`.'
      },
      {
        question: 'What does `type NewUser = ReturnType<typeof createUser>` do, and why is it useful?',
        options: [
          'It calls `createUser()` at compile time and stores the result in a type',
          'It extracts the return type of the `createUser` function into a reusable type alias, so the type stays in sync automatically if the function signature changes',
          'It creates a new function type that matches `createUser`\'s signature',
          'It is identical to writing `type NewUser = Parameters<typeof createUser>[0]`',
        ],
        correctIndex: 1,
        explanation: '`ReturnType<T>` is a built-in conditional utility type that extracts the return type of a function type. Using `typeof createUser` first converts the function value to its type. This approach keeps the type definition DRY — if `createUser` is updated, `NewUser` automatically reflects the change without any manual edits.'
      },
      {
        question: 'You import Zod and write: `const UserSchema = z.object({ name: z.string(), age: z.number() }); type User = z.infer<typeof UserSchema>;`. What is the main advantage of this approach over defining the `User` interface separately?',
        options: [
          'Zod schemas are faster to type-check than TypeScript interfaces',
          'The `User` type is automatically inferred from the schema — the runtime validator and the TypeScript type share a single source of truth, eliminating duplication',
          'It allows `User` to be used as a generic constraint without any type arguments',
          'Zod schemas generate declaration files automatically, which speeds up build times',
        ],
        correctIndex: 1,
        explanation: '`z.infer<typeof UserSchema>` derives the TypeScript type directly from the Zod schema. This means you define your data shape once (in the schema), and the type follows automatically. If you update the schema, the type updates too — no risk of the two falling out of sync.'
      }
    ],
    senior: [
      {
        question: 'What are template literal types used for?',
        options: ['Creating HTML templates', 'Constructing string types by combining literal types with template string syntax, enabling type-safe string patterns', 'Template rendering at runtime', 'Internationalization'],
        correctIndex: 1,
        explanation: 'Template literal types (e.g., type Route = `/${string}`) create string types from combinations of literals and other types, enabling type-safe event names, API routes, CSS properties, and more.'
      },
      {
        question: 'What is type-level programming in TypeScript?',
        options: ['Writing programs that only work with types', 'Using the type system as a computation language with recursion, conditionals, and mapping to derive complex types at compile time', 'Programming without any types', 'Using only primitive types'],
        correctIndex: 1,
        explanation: 'Type-level programming treats the TypeScript type system as a functional programming language, using recursive conditional types, mapped types, and template literals to compute complex types at compile time.'
      },
      {
        question: 'What is a branded type (nominal typing) in TypeScript?',
        options: ['A type with a company logo', 'A technique that adds a unique phantom property to a type to prevent accidental interchangeability of structurally identical types', 'A type exported from a branded package', 'A type with a registered trademark'],
        correctIndex: 1,
        explanation: 'Branded types add a unique tag (e.g., type USD = number & { __brand: "USD" }) to distinguish structurally identical types, preventing bugs like mixing USD and EUR amounts.'
      },
      {
        question: 'What is the key challenge when setting up TypeScript in a monorepo?',
        options: ['TypeScript cannot work in monorepos', 'Configuring project references, composite builds, and path aliases so packages can reference each other with proper type checking and incremental compilation', 'Choosing between npm and yarn', 'Installing TypeScript in every package'],
        correctIndex: 1,
        explanation: 'Monorepo TypeScript requires project references (composite: true) for cross-package type checking, path aliases (paths in tsconfig) for imports, and incremental builds (tsc --build) for performance.'
      },
      {
        question: 'What is the recommended strategy for migrating a large JavaScript codebase to TypeScript?',
        options: ['Rewrite everything at once', 'Incrementally adopt TypeScript by enabling allowJs, adding .ts files gradually, starting with strict: false and increasing strictness over time', 'Only add .d.ts files without changing any .js files', 'Use JSDoc comments exclusively instead of TypeScript'],
        correctIndex: 1,
        explanation: 'Incremental migration uses allowJs to mix JS and TS files, converts files one by one starting with leaf modules, and gradually enables stricter compiler options as the codebase matures.'
      },
      {
        question: 'You define `type Brand<T, B extends string> = T & { readonly [brand]: B }` where `brand` is a `unique symbol`. What class of runtime bugs does this pattern prevent?',
        options: [
          'It prevents `null` and `undefined` from being assigned to branded values',
          'It prevents structurally identical primitive types (e.g., `UserId` and `ProductId`, both `number`) from being used interchangeably — enforcing nominal typing at compile time',
          'It prevents branded values from being serialized to JSON, which protects sensitive data',
          'It prevents the TypeScript compiler from widening literal types to their base types',
        ],
        correctIndex: 1,
        explanation: 'TypeScript normally uses structural typing, so `UserId = number` and `ProductId = number` are identical and can be swapped. Branded types inject a unique phantom property (using `unique symbol` so no two brands share the same key) that makes `UserId` and `ProductId` structurally distinct — even though both hold a plain `number` at runtime. This catches a whole class of ID-confusion bugs at compile time with zero runtime overhead.'
      },
      {
        question: 'In a TypeScript monorepo using project references, what is the purpose of `"composite": true` in each package\'s `tsconfig.json`?',
        options: [
          'It enables multiple tsconfig files to be merged together into a single configuration',
          'It tells the TypeScript compiler that this project can be referenced by other projects, and it requires `declaration: true` so that .d.ts files are emitted for downstream packages to consume without re-checking the source',
          'It enables the `--build` flag, which is otherwise unavailable in regular TypeScript projects',
          'It activates incremental compilation caching for the entire monorepo',
        ],
        correctIndex: 1,
        explanation: '`composite: true` marks a project as a valid reference target. It enforces that `declaration: true` is set (so .d.ts files are produced) and that `rootDir` is explicitly defined. Downstream packages import from those .d.ts files rather than re-type-checking all source files, which is what makes monorepo builds fast.'
      },
      {
        question: 'You notice that `tsc --noEmit --extendedDiagnostics` reports a very high "Instantiations" count. Which of the following is the most likely cause and the correct fix?',
        options: [
          'Too many files in `include` — fix by reducing the number of source files',
          'Using `interface extends` instead of type intersections — fix by switching to `&` for all type composition',
          'A deeply recursive conditional or mapped type being evaluated against a large union — fix by capping recursion depth, breaking up the union, or replacing with an interface where possible',
          'Enabling `strict: true` — fix by disabling `strictNullChecks` to reduce instantiation count',
        ],
        correctIndex: 2,
        explanation: 'High instantiation counts typically stem from conditional or mapped types being evaluated for every member of a large union, or from unbounded recursive type aliases. Solutions include bounding recursion with a depth counter tuple, splitting large unions, and preferring `interface extends` over type intersections — the latter is processed more efficiently by the checker.'
      }
    ]
  }
}
