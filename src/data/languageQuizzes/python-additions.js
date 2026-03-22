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
    {
      question: 'What is the output of: print(type([]))?',
      options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'object'>"],
      correctIndex: 1,
      explanation:
        'An empty pair of square brackets [] creates an empty list in Python. type([]) returns <class \'list\'>. Python does not have a built-in array type — the list type serves that role.',
    },
    {
      question: 'What does the range(5) function generate?',
      options: [
        'Numbers 1 through 5: [1, 2, 3, 4, 5]',
        'Numbers 0 through 4: [0, 1, 2, 3, 4]',
        'Numbers 0 through 5: [0, 1, 2, 3, 4, 5]',
        'A single number: 5',
      ],
      correctIndex: 1,
      explanation:
        'range(5) generates numbers starting from 0 up to but not including 5, producing 0, 1, 2, 3, 4. It is a lazy sequence — it does not create a list in memory but yields values on demand.',
    },
    {
      question: 'What is the output of: print("hello" * 3)?',
      options: ['hellohellohello', 'hello 3', 'TypeError', 'hello*3'],
      correctIndex: 0,
      explanation:
        'Python supports string repetition with the * operator. "hello" * 3 repeats the string three times, producing "hellohellohello". This works with any sequence type (strings, lists, tuples).',
    },
    {
      question: 'Which keyword is used to handle exceptions in Python?',
      options: ['catch', 'except', 'handle', 'rescue'],
      correctIndex: 1,
      explanation:
        'Python uses try/except blocks for exception handling. The except keyword catches exceptions, unlike many other languages that use catch. You can catch specific exception types with except ValueError as e: or catch all exceptions with a bare except:.',
    },
    {
      question: 'What does the in keyword do when used in an if statement like: if "a" in "apple"?',
      options: [
        'It checks if "a" is a variable defined in the scope of "apple"',
        'It checks if the substring "a" exists within the string "apple"',
        'It iterates over each character in "apple"',
        'It checks if "a" and "apple" are the same type',
      ],
      correctIndex: 1,
      explanation:
        'The in operator checks for membership. For strings, it checks if the left operand is a substring of the right operand. For lists and tuples, it checks if the element exists in the collection. "a" in "apple" returns True.',
    },
    {
      question: 'What is the output of: print(bool(""), bool("0"), bool(0))?',
      options: [
        'False, False, False',
        'False, True, False',
        'True, True, False',
        'False, False, True',
      ],
      correctIndex: 1,
      explanation:
        'In Python, empty strings are falsy but non-empty strings (including "0") are truthy. The integer 0 is falsy. So bool("") is False, bool("0") is True (non-empty string), and bool(0) is False.',
    },
    {
      question: 'What is a dictionary in Python?',
      options: [
        'An ordered list of unique elements',
        'A collection of key-value pairs where keys must be hashable and unique',
        'A sorted sequence of strings',
        'A text file containing word definitions',
      ],
      correctIndex: 1,
      explanation:
        'A Python dictionary (dict) stores key-value pairs. Keys must be hashable (strings, numbers, tuples) and unique. Since Python 3.7, dictionaries maintain insertion order. Access values with dict[key] or dict.get(key, default).',
    },
    {
      question: 'What is the Pythonic way to check if a list is empty?',
      options: [
        'if len(my_list) == 0:',
        'if my_list == []:',
        'if not my_list:',
        'if my_list.isEmpty():',
      ],
      correctIndex: 2,
      explanation:
        'The Pythonic way is to use the truthiness of the collection directly: if not my_list: evaluates to True when the list is empty. Empty sequences are falsy in Python. This is preferred over checking len() == 0 per PEP 8.',
    },
    {
      question: 'What does the .strip() method do on a string?',
      options: [
        'Removes all spaces from the string',
        'Removes leading and trailing whitespace (or specified characters) from the string',
        'Splits the string into a list',
        'Converts the string to lowercase',
      ],
      correctIndex: 1,
      explanation:
        '.strip() removes leading and trailing whitespace characters by default. You can pass specific characters to strip: "##hello##".strip("#") returns "hello". Use .lstrip() or .rstrip() to strip only one side.',
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
    {
      question: 'What is the output of: x = [1, 2, 3]; y = x[:]; y.append(4); print(len(x))?',
      options: ['3', '4', 'TypeError', 'None'],
      correctIndex: 0,
      explanation:
        'x[:] creates a shallow copy of the list, so y is a new list. Appending to y does not affect x. len(x) remains 3. This is different from y = x which would make both names point to the same list object.',
    },
    {
      question: 'What is the difference between @staticmethod and @classmethod?',
      options: [
        'There is no meaningful difference — they are interchangeable',
        '@staticmethod receives no implicit first argument; @classmethod receives the class (cls) as its first argument',
        '@staticmethod can only be called on instances; @classmethod can only be called on the class',
        '@classmethod cannot access class attributes',
      ],
      correctIndex: 1,
      explanation:
        '@staticmethod is essentially a plain function that lives inside a class for organizational purposes — it receives no implicit first argument. @classmethod receives cls, giving it access to the class itself and its attributes, which is useful for alternative constructors and class-level logic.',
    },
    {
      question: 'What does the walrus operator (:=) do in Python 3.8+?',
      options: [
        'It is an alternative to the == comparison operator',
        'It assigns a value to a variable as part of an expression, so you can assign and use the value in the same line',
        'It creates a constant that cannot be reassigned',
        'It is a bitwise shift operator',
      ],
      correctIndex: 1,
      explanation:
        'The walrus operator (:=) performs assignment within an expression. For example: if (n := len(data)) > 10: print(n) assigns len(data) to n and checks the condition in one step. It reduces code repetition in while loops and comprehensions.',
    },
    {
      question: 'What is the output of: print({1, 2, 3} & {2, 3, 4})?',
      options: ['{1, 2, 3, 4}', '{2, 3}', 'TypeError', '{1, 4}'],
      correctIndex: 1,
      explanation:
        'The & operator on sets computes the intersection — elements present in both sets. {1, 2, 3} & {2, 3, 4} returns {2, 3}. Other set operators include | (union), - (difference), and ^ (symmetric difference).',
    },
    {
      question: 'What is a context manager in Python, and which dunder methods does it require?',
      options: [
        'A class that manages memory allocation, requiring __alloc__ and __dealloc__',
        'An object that defines __enter__ and __exit__ methods, used with the with statement for resource management',
        'A function decorated with @contextmanager that requires __init__ and __del__',
        'A module-level manager that requires __import__ and __export__',
      ],
      correctIndex: 1,
      explanation:
        'Context managers implement __enter__ (called when entering the with block) and __exit__ (called when leaving, even if an exception occurs). They ensure proper resource cleanup — the most common example is file handling: with open("file.txt") as f: automatically closes the file.',
    },
    {
      question: 'What is the output of: def f(a, b=[]): b.append(a); return b; print(f(1)); print(f(2))?',
      options: [
        '[1] then [2]',
        '[1] then [1, 2]',
        '[1, 2] then [1, 2]',
        'TypeError',
      ],
      correctIndex: 1,
      explanation:
        'Default mutable arguments (like lists) are created once when the function is defined, not on each call. Each call to f() mutates the same list object. The first call produces [1], the second produces [1, 2]. The fix is to use None as the default and create a new list inside the function.',
    },
    {
      question: 'What is the difference between a generator expression and a list comprehension?',
      options: [
        'They produce the same result — generator expressions are just syntactic sugar',
        'A generator expression uses parentheses and produces values lazily (one at a time), while a list comprehension uses brackets and creates the entire list in memory',
        'Generator expressions are faster for all use cases',
        'List comprehensions cannot include conditionals; generator expressions can',
      ],
      correctIndex: 1,
      explanation:
        'A list comprehension [x for x in range(1000000)] creates the entire list in memory. A generator expression (x for x in range(1000000)) yields values one at a time, using almost no memory. Use generators when you only need to iterate once or when the dataset is large.',
    },
    {
      question: 'What does *args and **kwargs mean in a function signature?',
      options: [
        '*args collects positional arguments into a tuple; **kwargs collects keyword arguments into a dictionary',
        '*args collects keyword arguments; **kwargs collects positional arguments',
        'Both collect all arguments into a single list',
        '*args is required; **kwargs is optional',
      ],
      correctIndex: 0,
      explanation:
        '*args packs extra positional arguments into a tuple, and **kwargs packs extra keyword arguments into a dictionary. They allow functions to accept an arbitrary number of arguments. The names "args" and "kwargs" are conventions — only the * and ** syntax matters.',
    },
    {
      question: 'What is the output of: print([i**2 for i in range(5) if i % 2 != 0])?',
      options: ['[0, 1, 4, 9, 16]', '[1, 9]', '[0, 4, 16]', '[1, 4, 9]'],
      correctIndex: 1,
      explanation:
        'This list comprehension iterates over range(5) (0-4), filters for odd numbers (i % 2 != 0 gives 1 and 3), then squares them. 1**2 = 1 and 3**2 = 9, producing [1, 9].',
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
    {
      question: 'What is the Method Resolution Order (MRO) in Python, and which algorithm determines it?',
      options: [
        'MRO is the order in which base classes are searched for a method, determined by the C3 linearization algorithm',
        'MRO is determined alphabetically by class name',
        'MRO follows a simple depth-first search of the inheritance tree',
        'MRO is random and changes between interpreter runs',
      ],
      correctIndex: 0,
      explanation:
        'Python uses the C3 linearization algorithm to compute the Method Resolution Order. It ensures that a class always appears before its parents and that the order of bases in the class definition is preserved. You can inspect it with MyClass.__mro__ or MyClass.mro().',
    },
    {
      question: 'What is the output of: from dataclasses import dataclass; @dataclass class Point: x: int = 0; y: int = 0; p = Point(1, 2); print(p == Point(1, 2))?',
      options: ['False', 'True', 'TypeError', 'None'],
      correctIndex: 1,
      explanation:
        'Dataclasses automatically generate __eq__ based on all fields. Two dataclass instances with the same field values are considered equal. Without @dataclass, the default __eq__ compares by identity (is), which would return False for two separate instances.',
    },
    {
      question: 'What does __slots__ do on a Python class, and why would you use it?',
      options: [
        'It limits the number of instances that can be created',
        'It replaces the instance __dict__ with a fixed set of attribute slots, reducing memory usage and slightly speeding up attribute access',
        'It makes all attributes private',
        'It enables multi-threading safety for the class',
      ],
      correctIndex: 1,
      explanation:
        'Defining __slots__ = ("x", "y") on a class tells Python to allocate a fixed struct for those attributes instead of a per-instance __dict__. This saves ~40-50% memory per instance and provides slightly faster attribute access. The trade-off is that you cannot add arbitrary attributes dynamically.',
    },
    {
      question: 'What is the difference between deepcopy and copy in the copy module?',
      options: [
        'There is no difference for mutable objects',
        'copy() creates a shallow copy (new object but shared references for nested objects); deepcopy() recursively copies all nested objects',
        'deepcopy() is only for lists; copy() works with any type',
        'copy() is faster because it uses C extensions; deepcopy() is pure Python',
      ],
      correctIndex: 1,
      explanation:
        'copy.copy() creates a new container but the elements inside still reference the same objects. copy.deepcopy() recursively copies all nested objects, creating fully independent copies. deepcopy() also handles circular references correctly by tracking already-copied objects.',
    },
    {
      question: 'What is a descriptor in Python, and how does the @property decorator use it?',
      options: [
        'A descriptor is any object that defines __get__, __set__, or __delete__. @property creates a descriptor that routes attribute access through getter/setter/deleter methods',
        'A descriptor is a docstring attached to a class. @property reads the descriptor string',
        'A descriptor is a type annotation. @property enforces the type at runtime',
        'A descriptor is a metaclass hook. @property registers the class with the descriptor registry',
      ],
      correctIndex: 0,
      explanation:
        'The descriptor protocol (__get__, __set__, __delete__) is a fundamental mechanism in Python. When you access an attribute, Python checks if the class attribute is a descriptor and invokes the appropriate method. @property is a built-in descriptor that turns methods into managed attributes with getter, setter, and deleter.',
    },
    {
      question: 'What does functools.lru_cache do, and what is its main limitation?',
      options: [
        'It caches the results of a function based on its arguments, but the arguments must be hashable (so it cannot cache calls with list or dict arguments)',
        'It limits the rate of function calls to prevent API abuse',
        'It caches function source code for faster reloading',
        'It stores function results in a Redis-compatible cache',
      ],
      correctIndex: 0,
      explanation:
        'functools.lru_cache memoizes function results in a Least Recently Used cache. When the function is called with the same arguments again, it returns the cached result instead of recomputing. Arguments must be hashable (immutable) to be used as cache keys — passing a list will raise a TypeError.',
    },
    {
      question: 'What is the output of: async def gen(): yield 1; yield 2; async for x in gen(): print(x) — what kind of object does gen() produce?',
      options: [
        'A regular generator',
        'An asynchronous generator — it requires async for to iterate and can use await internally',
        'A coroutine that returns a list',
        'A synchronous iterator with async wrappers',
      ],
      correctIndex: 1,
      explanation:
        'A function defined with async def that contains yield creates an asynchronous generator. It must be iterated with async for (or calling __anext__()). Unlike regular generators, async generators can use await expressions internally to perform asynchronous operations between yields.',
    },
    {
      question: 'What problem does the __init_subclass__ hook solve, and when was it introduced?',
      options: [
        'It initializes subclass instances automatically — introduced in Python 3.0',
        'It is called when a class is subclassed, allowing the parent to customize or validate subclasses without needing a metaclass — introduced in Python 3.6',
        'It replaces __init__ for abstract classes — introduced in Python 3.8',
        'It prevents a class from being subclassed — introduced in Python 3.5',
      ],
      correctIndex: 1,
      explanation:
        '__init_subclass__(cls, **kwargs) is called on the parent class whenever it is subclassed. It provides a simpler alternative to metaclasses for common tasks like registering subclasses, enforcing constraints, or injecting methods. Introduced in Python 3.6 via PEP 487.',
    },
    {
      question: 'What is the difference between `raise` and `raise from` when re-raising exceptions?',
      options: [
        'They are identical — `from` is optional syntax sugar',
        '`raise NewError() from original` sets __cause__ on the new exception, creating an explicit exception chain. `raise NewError()` sets __context__ implicitly but may expose internal details',
        '`raise from` suppresses the original exception entirely',
        '`raise from` is only valid inside finally blocks',
      ],
      correctIndex: 1,
      explanation:
        '`raise X from Y` explicitly chains exceptions by setting X.__cause__ = Y and X.__suppress_context__ = True. The traceback shows "The above exception was the direct cause of...". Without `from`, Python still sets __context__ implicitly, showing "During handling of... another exception occurred", which can be confusing.',
    },
  ],
}
