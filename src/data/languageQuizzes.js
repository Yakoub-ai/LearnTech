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
      }
    ]
  }
}
