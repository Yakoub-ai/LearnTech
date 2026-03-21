/**
 * Additional Python quiz questions — supplements the base set in languageQuizzes.js
 * Keyed by level: beginner / mid / senior
 */
export const additions = {
  beginner: [
    {
      question: 'What is the correct way to create a list comprehension that collects even numbers from 1 to 10?',
      options: [
        '[x for x in range(1, 11) if x % 2 == 0]',
        '(x for x in range(1, 11) if x % 2 == 0)',
        '[x in range(1, 11) where x % 2 == 0]',
        'list.filter(lambda x: x % 2 == 0, range(1, 11))',
      ],
      correctIndex: 0,
      explanation:
        'List comprehensions use the form [expression for item in iterable if condition]. The first option collects every x from range(1, 11) where x is divisible by 2, producing [2, 4, 6, 8, 10].',
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
      explanation:
        'PEP 8 recommends using `is` and `is not` to compare with None because None is a singleton. `== None` works but can be overridden by custom __eq__ methods; `is None` always tests identity.',
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
      explanation:
        'Both lists and tuples are ordered sequences that allow duplicates and support indexing. The key difference is mutability: lists can be modified after creation (append, remove, etc.) while tuples cannot.',
    },
  ],
  mid: [
    {
      question: 'What does the `yield` keyword do inside a Python function?',
      options: [
        'Returns a value and terminates the function immediately',
        'Turns the function into a generator that produces values lazily',
        'Pauses the current thread and switches to another coroutine',
        'Raises a StopIteration exception',
      ],
      correctIndex: 1,
      explanation:
        'When a function contains `yield`, calling it returns a generator object instead of executing the body. Each call to next() on the generator resumes from after the last yield, enabling memory-efficient lazy evaluation.',
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
      explanation:
        '@classmethod receives `cls` as its first argument — the class itself rather than an instance. It is commonly used for alternative constructors (e.g., `MyClass.from_string(...)`).',
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
      explanation:
        '`Optional[str]` from the `typing` module is equivalent to `Union[str, None]` (or `str | None` in Python 3.10+). It signals that the value may be a string or may be absent (None).',
    },
  ],
  senior: [
    {
      question: 'What is the primary purpose of Python metaclasses?',
      options: [
        'To create abstract base classes that cannot be instantiated',
        'To control how classes themselves are created and configured',
        'To enforce interface contracts at runtime',
        'To provide multiple inheritance without the diamond problem',
      ],
      correctIndex: 1,
      explanation:
        'A metaclass is the class of a class — it controls class creation, not instance creation. By defining `__new__` or `__init__` on a metaclass you can automatically add methods, enforce constraints, or register subclasses at class-definition time.',
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
      explanation:
        'CPython threads are limited by the Global Interpreter Lock (GIL), which prevents true parallel execution of Python bytecode. `multiprocessing` spawns separate interpreter processes, each with its own GIL, enabling real parallelism for CPU-bound work.',
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
      explanation:
        '`asyncio.gather()` runs all coroutines concurrently and returns a list of their return values in the same order the coroutines were passed — not the order they completed. This makes it easy to associate results with their inputs.',
    },
  ],
}
