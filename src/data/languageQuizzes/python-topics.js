export const topicQuizzes = {
  beginner: [
    {
      topicId: "variables-and-data-types",
      topicTitle: "Variables & Data Types",
      objectiveIndex: 0,
      questions: [
        {
          question: "What does Python's `type()` function return for the value `True`?",
          options: ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "<class 'NoneType'>"],
          correctIndex: 0,
          explanation: "`True` is an instance of `bool`, so `type(True)` returns `<class 'bool'>`. Although `bool` is a subclass of `int`, `type()` returns the exact class, not a parent."
        },
        {
          question: "Which of the following is the correct way to compare a variable to `None` in Python?",
          options: ["if x == None:", "if x is None:", "if x === None:", "if x.isNone():"],
          correctIndex: 1,
          explanation: "Python convention (and PEP 8) is to use `is` for comparisons with `None` because `None` is a singleton. Using `==` can be overridden by `__eq__`, leading to unexpected results."
        },
        {
          question: "What is the result of `0.1 + 0.2 == 0.3` in Python?",
          options: ["True", "False", "TypeError", "None"],
          correctIndex: 1,
          explanation: "Floating-point arithmetic follows IEEE 754, so `0.1 + 0.2` evaluates to `0.30000000000000004`, not exactly `0.3`. Use `round()` or `math.isclose()` for float comparisons."
        },
        {
          question: "What is the result of `True + True` in Python?",
          options: ["True", "2", "TypeError", "False"],
          correctIndex: 1,
          explanation: "`bool` is a subclass of `int`, so `True == 1` and `False == 0`. Arithmetic on booleans works as integers, so `True + True` equals `2`."
        },
        {
          question: "Which function should you prefer for type checking in production code: `type()` or `isinstance()`?",
          options: ["`type()` because it is more precise", "`isinstance()` because it respects inheritance", "Both are equally preferred", "Neither; use `__class__` directly"],
          correctIndex: 1,
          explanation: "`isinstance()` is preferred in production because it correctly handles subclasses. For example, `isinstance(True, int)` returns `True`, reflecting that `bool` is a subclass of `int`."
        },
        {
          question: "What does the expression `int(3.9)` return in Python?",
          options: ["4", "3", "3.9", "ValueError"],
          correctIndex: 1,
          explanation: "`int()` truncates toward zero, so `int(3.9)` returns `3`, not `4`. To round to the nearest integer, use the built-in `round()` function."
        },
        {
          question: "Which of these values is NOT falsy in Python?",
          options: ["0", "\"\"", "[]", "\"False\""],
          correctIndex: 3,
          explanation: "The string `\"False\"` is a non-empty string, so it is truthy. Falsy values include `0`, `0.0`, `\"\"`, `[]`, `{}`, `set()`, `None`, and `False`."
        },
        {
          question: "What does `isinstance(True, int)` return?",
          options: ["False", "True", "TypeError", "None"],
          correctIndex: 1,
          explanation: "`bool` is a subclass of `int` in Python, so any `bool` is also an `int`. Therefore `isinstance(True, int)` returns `True`."
        }
      ]
    },
    {
      topicId: "control-flow",
      topicTitle: "Control Flow",
      objectiveIndex: 1,
      questions: [
        {
          question: "In Python, what defines a block of code inside an `if` statement?",
          options: ["Curly braces `{}`", "Indentation", "The `begin`/`end` keywords", "Parentheses"],
          correctIndex: 1,
          explanation: "Python uses indentation to define code blocks. Unlike most languages, there are no braces or keywords — consistent indentation is both syntactic and mandatory."
        },
        {
          question: "What does the `else` clause of a `for` loop do?",
          options: ["Runs if the loop body raised an exception", "Runs if the loop completed without hitting a `break`", "Runs on each iteration after the body", "Runs if the iterable was empty"],
          correctIndex: 1,
          explanation: "A `for/else` clause executes the `else` block only if the loop finished normally (without `break`). This is a unique Python feature useful for search loops."
        },
        {
          question: "Which Python version introduced `match/case` structural pattern matching?",
          options: ["3.8", "3.9", "3.10", "3.12"],
          correctIndex: 2,
          explanation: "`match/case` (structural pattern matching) was introduced in Python 3.10. It provides a more expressive alternative to long `if/elif` chains for pattern-based dispatch."
        },
        {
          question: "What is the output of `list(range(0, 16, 3))`?",
          options: ["[0, 3, 6, 9, 12, 15]", "[3, 6, 9, 12, 15]", "[0, 3, 6, 9, 12]", "[0, 3, 6, 9, 12, 15, 18]"],
          correctIndex: 0,
          explanation: "`range(start, stop, step)` generates values starting at `start`, incrementing by `step`, stopping before `stop`. So `range(0, 16, 3)` gives `[0, 3, 6, 9, 12, 15]`."
        },
        {
          question: "What does `continue` do inside a loop?",
          options: ["Exits the loop immediately", "Skips to the next iteration", "Pauses execution for one cycle", "Restarts the loop from the beginning"],
          correctIndex: 1,
          explanation: "`continue` skips the rest of the current iteration body and jumps to the next iteration of the loop. `break` is used to exit the loop entirely."
        },
        {
          question: "What is the ternary (conditional) expression syntax in Python?",
          options: ["`x ? a : b`", "`a if x else b`", "`if x then a else b`", "`x and a or b`"],
          correctIndex: 1,
          explanation: "Python's conditional expression is `value_if_true if condition else value_if_false`. For example, `status = 'pass' if score >= 60 else 'fail'`."
        },
        {
          question: "What does `enumerate(fruits, start=1)` yield for the list `[\"apple\", \"banana\"]`?",
          options: ["[(0, 'apple'), (1, 'banana')]", "[(1, 'apple'), (2, 'banana')]", "[('apple', 1), ('banana', 2)]", "[(1, 0), (2, 1)]"],
          correctIndex: 1,
          explanation: "`enumerate()` produces `(index, value)` tuples. With `start=1`, the first index is `1`, giving `(1, 'apple'), (2, 'banana')`."
        }
      ]
    },
    {
      topicId: "functions",
      topicTitle: "Functions",
      objectiveIndex: 2,
      questions: [
        {
          question: "What does `*args` represent in a Python function definition?",
          options: ["A single required argument named args", "A variable number of keyword arguments", "A variable number of positional arguments", "A pointer to args in memory"],
          correctIndex: 2,
          explanation: "`*args` collects any extra positional arguments into a tuple named `args`. It allows a function to accept any number of positional arguments beyond those explicitly defined."
        },
        {
          question: "What does `**kwargs` represent in a function definition?",
          options: ["Two times the value of `kwargs`", "A variable number of keyword arguments passed as a dict", "A variable number of positional arguments", "A power operator applied to kwargs"],
          correctIndex: 1,
          explanation: "`**kwargs` collects additional keyword arguments into a dictionary. It allows functions to accept arbitrary keyword arguments not explicitly defined in the signature."
        },
        {
          question: "What is the correct order of parameter types in a Python function signature?",
          options: ["*args, positional, **kwargs, keyword-only", "positional, *args, keyword-only, **kwargs", "keyword-only, positional, *args, **kwargs", "**kwargs, *args, positional"],
          correctIndex: 1,
          explanation: "The correct order is: regular positional args, then `*args`, then keyword-only args (those after `*args`), then `**kwargs`. Violating this order causes a `SyntaxError`."
        },
        {
          question: "What decorator is used to preserve the `__name__` and `__doc__` of a wrapped function?",
          options: ["@wraps from functools", "@preserve_metadata", "@pass_through", "@keep_signature"],
          correctIndex: 0,
          explanation: "`@functools.wraps(func)` copies metadata like `__name__`, `__doc__`, and `__module__` from the original function to the wrapper, which is essential for introspection and debugging."
        },
        {
          question: "What does a function return if it has no `return` statement?",
          options: ["0", "An empty string", "None", "Raises a RuntimeError"],
          correctIndex: 2,
          explanation: "A function without a `return` statement implicitly returns `None`. This is the same as writing `return None` at the end."
        },
        {
          question: "What does `lambda x: x ** 2` produce?",
          options: ["A string representation of the formula", "An anonymous function that squares its argument", "An error because lambda cannot use `**`", "The square of x for the current value of x"],
          correctIndex: 1,
          explanation: "`lambda` creates an anonymous (unnamed) function. `lambda x: x ** 2` is equivalent to `def f(x): return x ** 2`. It is commonly used with `sorted()`, `map()`, and `filter()`."
        },
        {
          question: "How do you access a function's docstring programmatically?",
          options: ["`func.doc`", "`func.__docstring__`", "`func.__doc__`", "`help(func).__doc__`"],
          correctIndex: 2,
          explanation: "Every Python function stores its docstring in the `__doc__` attribute. You can also use `help(func)` to print it in a formatted way."
        },
        {
          question: "What does it mean that functions are 'first-class objects' in Python?",
          options: ["Functions run faster than other objects", "Functions can be assigned to variables, passed as arguments, and returned from other functions", "Functions have higher priority than classes", "Functions must be defined before they are used"],
          correctIndex: 1,
          explanation: "First-class objects can be used anywhere a value can be used. Python functions can be stored in variables, passed as arguments to other functions, and returned as values."
        }
      ]
    },
    {
      topicId: "data-structures",
      topicTitle: "Data Structures",
      objectiveIndex: 3,
      questions: [
        {
          question: "Which Python built-in data structure is ordered, mutable, and allows duplicates?",
          options: ["tuple", "set", "frozenset", "list"],
          correctIndex: 3,
          explanation: "A `list` is ordered (maintains insertion order), mutable (can be changed), and allows duplicate values. Tuples are immutable; sets and frozensets do not allow duplicates."
        },
        {
          question: "Since which Python version do dictionaries maintain insertion order?",
          options: ["3.5", "3.6", "3.7", "3.9"],
          correctIndex: 2,
          explanation: "Dictionaries maintain insertion order as part of the language specification from Python 3.7 onward. In CPython 3.6 it was an implementation detail, but 3.7 made it official."
        },
        {
          question: "What is the time complexity of membership testing (`x in s`) for a `set`?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
          correctIndex: 2,
          explanation: "Sets use a hash table internally, so membership testing is O(1) on average. Lists require scanning each element, giving O(n). This makes sets far superior for large membership checks."
        },
        {
          question: "What does `dict.get(key, default)` do when the key is not present?",
          options: ["Raises a KeyError", "Returns None", "Returns the default value", "Inserts the key with the default value"],
          correctIndex: 2,
          explanation: "`dict.get(key, default)` returns the specified `default` value (or `None` if not provided) when the key does not exist, avoiding a `KeyError`."
        },
        {
          question: "Which data structure should you use to store an (x, y) coordinate that must be used as a dictionary key?",
          options: ["list", "dict", "set", "tuple"],
          correctIndex: 3,
          explanation: "Dictionary keys must be hashable. Tuples are immutable and hashable, so `(x, y)` works as a dict key. Lists are mutable and unhashable, so they cannot be used as keys."
        },
        {
          question: "What is the result of `{\"a\": 1} | {\"b\": 2}` in Python 3.9+?",
          options: ["{'a': 1, 'b': 2}", "{'b': 2}", "TypeError", "{'a': 1} {'b': 2}"],
          correctIndex: 0,
          explanation: "The `|` operator merges two dictionaries in Python 3.9+, returning a new dict. If keys overlap, the right operand's values win. It is equivalent to `{**d1, **d2}`."
        },
        {
          question: "What does the following list comprehension produce: `[x**2 for x in range(1, 6) if x % 2 == 0]`?",
          options: ["[1, 4, 9, 16, 25]", "[4, 16]", "[2, 4]", "[4, 16, 36]"],
          correctIndex: 1,
          explanation: "The comprehension squares each `x` from 1 to 5, but only where `x` is even. Even numbers in `range(1, 6)` are 2 and 4, so the result is `[4, 16]`."
        },
        {
          question: "What is the set operation to get all elements in set A that are NOT in set B?",
          options: ["A & B", "A | B", "A - B", "A ^ B"],
          correctIndex: 2,
          explanation: "`A - B` (set difference) returns all elements that are in A but not in B. `A & B` is intersection, `A | B` is union, and `A ^ B` is symmetric difference."
        }
      ]
    },
    {
      topicId: "string-manipulation",
      topicTitle: "String Manipulation",
      objectiveIndex: 4,
      questions: [
        {
          question: "Which string formatting method was introduced in Python 3.6 and is currently the preferred approach?",
          options: ["%-formatting", ".format() method", "f-strings", "Template strings"],
          correctIndex: 2,
          explanation: "f-strings (formatted string literals), introduced in Python 3.6, are the preferred approach. They are faster than `.format()` or `%` formatting and more readable."
        },
        {
          question: "What does `\"hello world\".split()` return?",
          options: ["['hello world']", "['h','e','l','l','o',' ','w','o','r','l','d']", "['hello', 'world']", "('hello', 'world')"],
          correctIndex: 2,
          explanation: "`.split()` without arguments splits on any whitespace and removes leading/trailing whitespace, returning a list of words: `['hello', 'world']`."
        },
        {
          question: "What does `\" | \".join([\"Alice\", \"30\", \"Engineer\"])` return?",
          options: ["'Alice | 30 | Engineer'", "['Alice', '30', 'Engineer']", "'Alice|30|Engineer'", "TypeError"],
          correctIndex: 0,
          explanation: "`.join()` is a string method called on the separator. It concatenates all items in the iterable with the separator between each, giving `'Alice | 30 | Engineer'`."
        },
        {
          question: "What does `text[::-1]` do to a string?",
          options: ["Removes every second character", "Returns the last character only", "Reverses the string", "Returns all characters except the last"],
          correctIndex: 2,
          explanation: "The slice `[::-1]` starts from the end, steps backwards by 1, and stops at the beginning — effectively reversing the string."
        },
        {
          question: "Which `re` function returns ALL non-overlapping matches of a pattern in a string as a list?",
          options: ["re.search()", "re.match()", "re.findall()", "re.fullmatch()"],
          correctIndex: 2,
          explanation: "`re.findall()` returns a list of all non-overlapping matches. `re.search()` returns only the first match object, `re.match()` only checks the start of the string."
        },
        {
          question: "What does `f\"{0.856:.1%}\"` produce?",
          options: ["'85.6%'", "'0.856%'", "'0.9%'", "'85.60%'"],
          correctIndex: 0,
          explanation: "The format spec `:.1%` multiplies by 100 and appends a `%` sign, formatting to 1 decimal place. So `0.856` becomes `'85.6%'`."
        },
        {
          question: "What does `\"  Hello  \".strip()` return?",
          options: ["'  Hello  '", "'Hello'", "'Hello  '", "'  Hello'"],
          correctIndex: 1,
          explanation: "`.strip()` removes leading and trailing whitespace from both ends of the string, returning `'Hello'`. Use `.lstrip()` or `.rstrip()` to strip only one side."
        }
      ]
    },
    {
      topicId: "file-io",
      topicTitle: "File I/O",
      objectiveIndex: 5,
      questions: [
        {
          question: "Why should you use `with open(...)` instead of `f = open(...)`?",
          options: ["It is faster", "It automatically closes the file even if an exception occurs", "It is the only way to read binary files", "It prevents other processes from accessing the file"],
          correctIndex: 1,
          explanation: "The `with` statement (context manager) guarantees that the file is closed when the block exits, even if an exception is raised. This prevents resource leaks and data corruption."
        },
        {
          question: "Which file mode string appends content to an existing file?",
          options: ["'w'", "'r'", "'a'", "'x'"],
          correctIndex: 2,
          explanation: "Mode `'a'` opens the file for appending: the file pointer is at the end and new data is written after existing content. Mode `'w'` truncates (empties) the file first."
        },
        {
          question: "Which method reads a file line by line without loading the entire file into memory?",
          options: ["f.read()", "f.readlines()", "Iterating over the file object with `for line in f`", "f.readline_iter()"],
          correctIndex: 2,
          explanation: "Iterating over the file object (`for line in f`) reads one line at a time from disk, making it memory-efficient for large files. `f.readlines()` loads all lines into a list."
        },
        {
          question: "Which module provides a modern, object-oriented interface for file system paths?",
          options: ["os.path", "shutil", "pathlib", "glob"],
          correctIndex: 2,
          explanation: "`pathlib` (introduced in Python 3.4) provides `Path` objects that offer a clean, object-oriented interface for path manipulation, replacing many `os.path` calls."
        },
        {
          question: "What function is used to write a Python dict to a JSON file?",
          options: ["json.stringify()", "json.dump()", "json.encode()", "json.write()"],
          correctIndex: 1,
          explanation: "`json.dump(data, file)` serializes `data` to a JSON-formatted string and writes it to the open `file` object. `json.dumps()` returns the JSON as a string instead."
        },
        {
          question: "What does `pathlib.Path(\"data\") / \"output.txt\"` produce?",
          options: ["A division error", "A new Path object for 'data/output.txt'", "The string 'data/output.txt'", "An integer"],
          correctIndex: 1,
          explanation: "`pathlib` overloads the `/` operator for path joining. `Path(\"data\") / \"output.txt\"` creates a new `Path` object representing `data/output.txt` in a platform-independent way."
        }
      ]
    },
    {
      topicId: "modules-and-imports",
      topicTitle: "Modules & Imports",
      objectiveIndex: 6,
      questions: [
        {
          question: "What is the purpose of a virtual environment in Python?",
          options: ["To run Python code in a browser", "To isolate project dependencies and avoid version conflicts", "To speed up Python execution", "To allow multiple Python versions to coexist"],
          correctIndex: 1,
          explanation: "Virtual environments isolate each project's installed packages so that different projects can use different package versions without conflicts. Each project gets its own `site-packages` directory."
        },
        {
          question: "What does `if __name__ == \"__main__\":` guard against?",
          options: ["Prevents the file from being imported", "Runs code only when the file is executed directly, not when imported", "Checks that the module name is correct", "Prevents recursion in the module"],
          correctIndex: 1,
          explanation: "When a Python file is run directly, `__name__` is set to `'__main__'`. When it is imported, `__name__` is the module name. This guard ensures certain code only runs on direct execution."
        },
        {
          question: "What is the correct syntax to import `pi` and `sqrt` from the `math` module?",
          options: ["import math.pi, math.sqrt", "from math import pi, sqrt", "import {pi, sqrt} from math", "using math: pi, sqrt"],
          correctIndex: 1,
          explanation: "`from module import name1, name2` imports specific names directly into the current namespace. This is the standard way to import specific names from a module."
        },
        {
          question: "What makes a directory a Python package?",
          options: ["Having a `package.json` file", "Containing an `__init__.py` file", "Being listed in `sys.path`", "Having a capital letter in its name"],
          correctIndex: 1,
          explanation: "A directory becomes a Python package when it contains an `__init__.py` file (which can be empty). This file is executed when the package is imported."
        },
        {
          question: "What does `from collections import Counter` do?",
          options: ["Creates a new Counter object", "Imports the Counter class from the collections module into the current namespace", "Counts the items in the collections module", "Imports the entire collections module as Counter"],
          correctIndex: 1,
          explanation: "This imports the `Counter` class from the `collections` standard library module, making it available directly as `Counter` in the current namespace."
        },
        {
          question: "Which `import` alias is commonly used for the `json` module per convention?",
          options: ["import json as j", "There is no convention; json is always imported as json", "import json as JSON", "from json import *"],
          correctIndex: 1,
          explanation: "The `json` module has no widespread aliasing convention. Unlike `numpy` (aliased as `np`) or `pandas` (as `pd`), `json` is typically imported with its full name: `import json`."
        }
      ]
    },
    {
      topicId: "error-handling",
      topicTitle: "Error Handling",
      objectiveIndex: 7,
      questions: [
        {
          question: "What is the parent class of almost all user-catchable exceptions in Python?",
          options: ["BaseException", "Exception", "Error", "RuntimeError"],
          correctIndex: 1,
          explanation: "Most user-catchable exceptions inherit from `Exception`. `BaseException` also includes `KeyboardInterrupt` and `SystemExit`, which should generally not be caught in application code."
        },
        {
          question: "When does the `else` clause of a `try/except/else` block execute?",
          options: ["Always, after try and except", "Only when an exception was raised", "Only when no exception was raised in the try block", "Only when the exception was successfully caught"],
          correctIndex: 2,
          explanation: "The `else` clause runs only if the `try` block completed without raising any exception. It separates the success path from the error handling logic."
        },
        {
          question: "When does the `finally` clause execute?",
          options: ["Only when no exception occurs", "Only when an exception is caught", "Always, regardless of whether an exception occurred", "Only when the function returns"],
          correctIndex: 2,
          explanation: "The `finally` clause always executes, even if an exception occurred or the function returned early. It is used for cleanup code like closing files or releasing locks."
        },
        {
          question: "How do you define a custom exception class in Python?",
          options: ["class MyError(Error): pass", "class MyError(Exception): pass", "def MyError(Exception): pass", "error MyError extends Exception"],
          correctIndex: 1,
          explanation: "Custom exceptions are created by subclassing `Exception` (or a more specific exception). This makes them catchable with `except MyError` while not interfering with unrelated exceptions."
        },
        {
          question: "What does `raise ValueError(\"bad value\") from e` do?",
          options: ["Replaces the original exception with ValueError", "Creates a chained exception where ValueError wraps e, preserving e as the cause", "Raises both exceptions simultaneously", "Suppresses e and raises ValueError"],
          correctIndex: 1,
          explanation: "Exception chaining with `from e` sets the `__cause__` attribute of the new exception to `e`. This preserves the full traceback chain and shows both the original and new error."
        },
        {
          question: "Which exception is raised when you try to access a dictionary key that does not exist?",
          options: ["IndexError", "ValueError", "KeyError", "AttributeError"],
          correctIndex: 2,
          explanation: "Accessing a missing dictionary key with `d[key]` raises `KeyError`. Use `d.get(key)` or `d.get(key, default)` to avoid this exception."
        },
        {
          question: "Why should you never catch `BaseException` directly?",
          options: ["It causes infinite recursion", "It also catches `KeyboardInterrupt` and `SystemExit`, preventing normal program termination", "It is deprecated in Python 3", "It re-raises all exceptions automatically"],
          correctIndex: 1,
          explanation: "`BaseException` is the root of all exceptions including `KeyboardInterrupt` (Ctrl+C) and `SystemExit`. Catching it prevents users from stopping the program and masks critical system signals."
        }
      ]
    }
  ],

  mid: [
    {
      topicId: "object-oriented-programming",
      topicTitle: "Object-Oriented Programming",
      objectiveIndex: 0,
      questions: [
        {
          question: "What is the difference between a class variable and an instance variable?",
          options: [
            "Class variables are faster; instance variables are slower",
            "Class variables are shared across all instances; instance variables are unique to each instance",
            "Instance variables must be declared in `__class__`; class variables in `__init__`",
            "There is no difference; both are stored in `__dict__`"
          ],
          correctIndex: 1,
          explanation: "A class variable (defined directly in the class body) is shared across all instances. An instance variable (assigned via `self.x = ...`) is unique to each object instance."
        },
        {
          question: "What does the `@property` decorator do?",
          options: [
            "Makes an attribute read-only at the class level",
            "Converts a method into a computed attribute that is accessed without parentheses",
            "Caches the method result",
            "Makes the method available as a class method"
          ],
          correctIndex: 1,
          explanation: "`@property` lets you define a getter method that is accessed like an attribute (without `()`). Combined with `@x.setter` you can add validation while keeping a clean interface."
        },
        {
          question: "What does `super().__init__(...)` do in a subclass?",
          options: [
            "Creates a new instance of the parent class",
            "Calls the parent class's `__init__` method to initialize inherited attributes",
            "Converts the subclass back to the parent class",
            "Checks that the subclass correctly inherits from the parent"
          ],
          correctIndex: 1,
          explanation: "`super().__init__(...)` invokes the parent class's initializer, ensuring inherited attributes are properly initialized. This is essential in cooperative multiple inheritance."
        },
        {
          question: "What is the purpose of `__repr__` vs `__str__`?",
          options: [
            "`__repr__` is for end users; `__str__` is for developers",
            "`__repr__` is an unambiguous developer representation; `__str__` is a human-readable display string",
            "They are identical; Python uses them interchangeably",
            "`__repr__` is used by `print()`; `__str__` is used by `repr()`"
          ],
          correctIndex: 1,
          explanation: "`__repr__` should return an unambiguous string for developers (ideally one that could recreate the object). `__str__` is for user-friendly display. `print()` uses `__str__`, and the REPL uses `__repr__`."
        },
        {
          question: "What is an Abstract Base Class (ABC) used for?",
          options: [
            "To create instances that cannot hold data",
            "To define an interface that subclasses must implement",
            "To make classes that run faster due to skipped method resolution",
            "To prevent a class from having more than one parent"
          ],
          correctIndex: 1,
          explanation: "An ABC (via `abc.ABC`) enforces that subclasses implement all `@abstractmethod` methods. Attempting to instantiate a class that leaves abstract methods unimplemented raises `TypeError`."
        },
        {
          question: "What does `@total_ordering` from `functools` provide?",
          options: [
            "Automatic sorting of all class attributes",
            "Fills in missing comparison methods given `__eq__` and one of `__lt__`, `__le__`, `__gt__`, or `__ge__`",
            "Makes all instances of a class orderable by memory address",
            "Provides a `total` method that sums all numeric attributes"
          ],
          correctIndex: 1,
          explanation: "`@total_ordering` auto-generates the remaining comparison dunder methods from `__eq__` and one ordering method. This reduces boilerplate when you want a fully comparable class."
        },
        {
          question: "What does the `__contains__` dunder method enable?",
          options: [
            "Using `len()` on the object",
            "Using the `in` operator to test membership",
            "Using `iter()` to iterate over the object",
            "Using `next()` to get the next element"
          ],
          correctIndex: 1,
          explanation: "`__contains__` is called when you use the `in` operator, e.g., `'deposit' in account`. It lets you define custom membership testing logic for your class."
        }
      ]
    },
    {
      topicId: "decorators",
      topicTitle: "Decorators",
      objectiveIndex: 1,
      questions: [
        {
          question: "What is `@decorator` syntactic sugar for?",
          options: [
            "`decorator.apply(func)`",
            "`func = decorator(func)`",
            "`decorator.__call__(func)()`",
            "`func.decorate(decorator)`"
          ],
          correctIndex: 1,
          explanation: "`@decorator` above a `def` is exactly equivalent to `func = decorator(func)` written after the definition. It passes the function to the decorator and rebinds the name to the result."
        },
        {
          question: "Why should you use `@functools.wraps(func)` inside a decorator?",
          options: [
            "To make the decorator run faster",
            "To preserve the original function's `__name__`, `__doc__`, and other metadata",
            "To prevent the decorator from being applied twice",
            "To enable the decorator to accept keyword arguments"
          ],
          correctIndex: 1,
          explanation: "Without `@functools.wraps`, the wrapper function's `__name__` and `__doc__` replace the original's. `@functools.wraps` copies these attributes, keeping introspection and debugging tools accurate."
        },
        {
          question: "When stacking decorators `@A` then `@B` on a function, which runs first?",
          options: [
            "@A (outermost) runs first",
            "@B (innermost) runs first",
            "Both run simultaneously",
            "The order depends on the decorator implementation"
          ],
          correctIndex: 1,
          explanation: "With `@A` above `@B`, the function is first wrapped by B (innermost), then that result is wrapped by A. So B's wrapper executes first when the function is called."
        },
        {
          question: "What is a decorator factory (parameterized decorator)?",
          options: [
            "A decorator that works only on factory functions",
            "A function that returns a decorator, allowing parameters to be passed to the decorator",
            "A class whose instances are decorators",
            "A decorator stored in the `functools` module"
          ],
          correctIndex: 1,
          explanation: "A decorator factory is a function that accepts parameters and returns a decorator. For example, `@retry(max_attempts=3)` calls `retry(3)` which returns the actual decorator."
        },
        {
          question: "What does a memoization decorator do?",
          options: [
            "Logs every call to the function",
            "Caches the results of function calls based on arguments to avoid recomputation",
            "Limits how many times a function can be called",
            "Measures the execution time of the function"
          ],
          correctIndex: 1,
          explanation: "A memoize decorator stores the results of previous calls in a cache (usually a dict keyed by arguments). If the same arguments are seen again, the cached result is returned instantly."
        },
        {
          question: "What does `@singleton` as a class decorator guarantee?",
          options: [
            "The class can only have one method",
            "Only one instance of the class ever exists",
            "The class cannot be subclassed",
            "The class is thread-safe"
          ],
          correctIndex: 1,
          explanation: "A `@singleton` decorator intercepts `__call__` on the class. The first call creates and stores the instance; subsequent calls return the cached instance, ensuring only one exists."
        }
      ]
    },
    {
      topicId: "generators-and-iterators",
      topicTitle: "Generators & Iterators",
      objectiveIndex: 2,
      questions: [
        {
          question: "What keyword is used inside a function to make it a generator?",
          options: ["return", "yield", "async", "iterate"],
          correctIndex: 1,
          explanation: "The `yield` keyword turns a regular function into a generator function. When called, it returns a generator object rather than executing the body immediately."
        },
        {
          question: "What is the main memory advantage of using a generator expression over a list comprehension?",
          options: [
            "Generator expressions are faster to create",
            "Generators produce values lazily one at a time, using constant memory regardless of dataset size",
            "List comprehensions use linked lists, which are slower",
            "Generators compress data automatically"
          ],
          correctIndex: 1,
          explanation: "A generator expression (using parentheses) is lazy — it yields one value at a time. A list comprehension (using brackets) materialises all values in memory at once, which fails for very large datasets."
        },
        {
          question: "What does the Iterator Protocol require an object to implement?",
          options: [
            "`__len__` and `__getitem__`",
            "`__iter__` and `__next__`",
            "`__enter__` and `__exit__`",
            "`__call__` and `__contains__`"
          ],
          correctIndex: 1,
          explanation: "An iterator must implement `__iter__()` (returning itself) and `__next__()` (returning the next value or raising `StopIteration`). Generators implement this protocol automatically."
        },
        {
          question: "What does `yield from sub_generator` do?",
          options: [
            "Creates a new generator that wraps `sub_generator`",
            "Delegates iteration to `sub_generator`, yielding each of its values",
            "Returns the return value of `sub_generator` immediately",
            "Pauses the current generator until `sub_generator` is exhausted"
          ],
          correctIndex: 1,
          explanation: "`yield from` delegates to a sub-iterable, yielding each of its values in turn. It also transparently handles `send()` and `throw()` calls, making it essential for generator pipelines."
        },
        {
          question: "Which `itertools` function must receive a SORTED iterable to work correctly?",
          options: ["itertools.chain", "itertools.groupby", "itertools.accumulate", "itertools.product"],
          correctIndex: 1,
          explanation: "`itertools.groupby` groups consecutive elements that share the same key. It does NOT sort; if the input is not sorted by key, the same key may appear in multiple groups."
        },
        {
          question: "What does `itertools.islice(fib, 10)` do when `fib` is an infinite iterator?",
          options: [
            "Raises StopIteration after 10 items",
            "Returns the first 10 items without consuming the rest of the iterator",
            "Creates a new infinite iterator that repeats the pattern",
            "Collects 10 items then empties the iterator"
          ],
          correctIndex: 1,
          explanation: "`itertools.islice` returns an iterator that yields at most `n` items from the input, stopping early. This allows safely consuming a finite slice from an infinite generator."
        }
      ]
    },
    {
      topicId: "context-managers",
      topicTitle: "Context Managers",
      objectiveIndex: 3,
      questions: [
        {
          question: "What two methods define the context manager protocol?",
          options: [
            "`__start__` and `__stop__`",
            "`__enter__` and `__exit__`",
            "`__open__` and `__close__`",
            "`__begin__` and `__end__`"
          ],
          correctIndex: 1,
          explanation: "The context manager protocol requires `__enter__()` (called on entering the `with` block; its return value is bound to `as` name) and `__exit__()` (called on exit, even after exceptions)."
        },
        {
          question: "What does `__exit__` returning `True` mean?",
          options: [
            "The context manager completed successfully",
            "The exception raised inside the `with` block is suppressed",
            "The `with` block will be re-entered",
            "The resource was properly released"
          ],
          correctIndex: 1,
          explanation: "If `__exit__` returns a truthy value, any exception raised in the `with` block is suppressed (not propagated). Returning `False` or `None` lets the exception propagate normally."
        },
        {
          question: "Which decorator from `contextlib` lets you write a generator-based context manager?",
          options: [
            "@contextlib.manager",
            "@contextlib.contextmanager",
            "@contextlib.with_statement",
            "@contextlib.generator_cm"
          ],
          correctIndex: 1,
          explanation: "`@contextlib.contextmanager` turns a generator function into a context manager. Everything before `yield` acts as `__enter__`; everything after (in `finally`) acts as `__exit__`."
        },
        {
          question: "What does `contextlib.suppress(FileNotFoundError)` do?",
          options: [
            "Raises FileNotFoundError silently",
            "Creates a context manager that swallows the specified exception type",
            "Logs the exception without re-raising it",
            "Converts FileNotFoundError into a warning"
          ],
          correctIndex: 1,
          explanation: "`contextlib.suppress` provides a clean way to ignore specific exceptions. Code inside the `with` block that raises the specified exception type will have it silently caught and discarded."
        },
        {
          question: "When would you use `contextlib.ExitStack`?",
          options: [
            "When you need to nest more than two `with` statements",
            "When the number of context managers to enter is only known at runtime",
            "When `__exit__` needs to be called in parallel",
            "When you want to disable exception suppression"
          ],
          correctIndex: 1,
          explanation: "`ExitStack` dynamically manages a variable number of context managers. You call `stack.enter_context(cm)` for each, and all are properly cleaned up when the stack exits."
        }
      ]
    },
    {
      topicId: "comprehensions-deep-dive",
      topicTitle: "Comprehensions Deep Dive",
      objectiveIndex: 4,
      questions: [
        {
          question: "How do you write a nested list comprehension to flatten a matrix `[[1,2],[3,4]]`?",
          options: [
            "[row for row in matrix for num in row]",
            "[num for row in matrix for num in row]",
            "[[num for num in row] for row in matrix]",
            "[num for num in row for row in matrix]"
          ],
          correctIndex: 1,
          explanation: "To flatten, use `[num for row in matrix for num in row]`. The outer `for` iterates over rows, the inner `for` iterates over elements in each row. Reading left-to-right mirrors nested `for` loops."
        },
        {
          question: "What does the walrus operator `:=` do?",
          options: [
            "Checks type equality",
            "Assigns a value to a variable and returns that value within an expression",
            "Creates a shallow copy of a variable",
            "Compares two objects by identity"
          ],
          correctIndex: 1,
          explanation: "The walrus operator (`:=`, PEP 572, Python 3.8+) assigns a value to a name and returns that value, all within an expression. It eliminates redundant computation in comprehension filters."
        },
        {
          question: "What syntax creates a dict comprehension that maps each word to its length?",
          options: [
            "[word: len(word) for word in words]",
            "{word: len(word) for word in words}",
            "(word: len(word) for word in words)",
            "dict[word: len(word) for word in words]"
          ],
          correctIndex: 1,
          explanation: "Dict comprehensions use curly braces with a `key: value` expression: `{word: len(word) for word in words}`. Square brackets create lists; parentheses create generators."
        },
        {
          question: "What does a set comprehension produce?",
          options: [
            "An ordered collection with no duplicates",
            "An unordered collection with no duplicates",
            "An ordered collection with duplicates removed from the start",
            "A frozenset"
          ],
          correctIndex: 1,
          explanation: "Set comprehensions (using `{expr for x in iterable}`) produce a `set` — unordered and deduplicated. They use the same curly brace syntax as dict comprehensions but without a `key: value` pair."
        },
        {
          question: "When should you prefer a generator function over a complex comprehension?",
          options: [
            "Always, because generators are always faster",
            "When the comprehension spans multiple lines or the logic is complex enough to hurt readability",
            "Only when the result exceeds 1 million items",
            "When the comprehension uses the walrus operator"
          ],
          correctIndex: 1,
          explanation: "As the content notes: readability is more important than micro-optimization. Overly complex comprehensions should be refactored into explicit generator functions for clarity."
        }
      ]
    },
    {
      topicId: "type-hints",
      topicTitle: "Type Hints",
      objectiveIndex: 5,
      questions: [
        {
          question: "Do Python type hints affect runtime behavior?",
          options: [
            "Yes, they enforce types at runtime by default",
            "No, they are only used by static analysis tools and have no runtime effect",
            "Yes, but only for function arguments, not return types",
            "Only when `from __future__ import annotations` is used"
          ],
          correctIndex: 1,
          explanation: "Type hints are purely informational at runtime. Python does not enforce them automatically. Static analysis tools like `mypy` use them to check for type errors before code runs."
        },
        {
          question: "What does `Optional[str]` mean in a type hint?",
          options: [
            "The parameter is optional and defaults to an empty string",
            "The value is either a `str` or `None`",
            "The value must be provided but can be empty",
            "The return value is cached"
          ],
          correctIndex: 1,
          explanation: "`Optional[X]` is shorthand for `Union[X, None]`. It indicates the value can be either type `X` or `None`. In Python 3.10+, you can write `str | None` instead."
        },
        {
          question: "What is a `TypeVar` used for in Python type hints?",
          options: [
            "Defining custom primitive types",
            "Creating generic functions where the type of input and output are linked",
            "Aliasing complex type expressions",
            "Validating types at runtime"
          ],
          correctIndex: 1,
          explanation: "`TypeVar` defines a type variable for generic functions. For example, `T = TypeVar('T')` lets you write `def first(items: list[T]) -> Optional[T]` where the return type matches the element type."
        },
        {
          question: "What is the purpose of `Protocol` in Python's type system?",
          options: [
            "Defining network communication protocols",
            "Enabling structural subtyping: any class implementing the required methods satisfies the Protocol",
            "Enforcing that subclasses call `super()`",
            "Marking a class as an ABC"
          ],
          correctIndex: 1,
          explanation: "`Protocol` enables duck-typing with static checking. Any class that has the required methods satisfies the protocol without explicit inheritance — a form of structural subtyping."
        },
        {
          question: "What does `@dataclass` automatically generate for an annotated class?",
          options: [
            "Only `__init__`",
            "`__init__`, `__repr__`, and `__eq__` by default",
            "All dunder methods including `__hash__` and `__lt__`",
            "Only `__repr__` and `__str__`"
          ],
          correctIndex: 1,
          explanation: "`@dataclass` auto-generates `__init__`, `__repr__`, and `__eq__` by default. Additional dunders like `__hash__` and `__lt__` can be enabled with decorator parameters such as `frozen=True` or `order=True`."
        },
        {
          question: "What tool is used to statically check Python type hints?",
          options: ["pylint", "flake8", "mypy", "black"],
          correctIndex: 2,
          explanation: "`mypy` is the primary static type checker for Python. It reads type annotations and flags type mismatches before runtime. It can be integrated into CI/CD pipelines."
        }
      ]
    },
    {
      topicId: "testing-with-pytest",
      topicTitle: "Testing with pytest",
      objectiveIndex: 6,
      questions: [
        {
          question: "What is a pytest fixture?",
          options: [
            "A special assertion that always passes",
            "A reusable setup function that provides test data or dependencies to test functions",
            "A test that runs before all other tests",
            "A configuration file for pytest"
          ],
          correctIndex: 1,
          explanation: "Fixtures are functions decorated with `@pytest.fixture` that set up state, return values, or clean up after tests. Tests declare them as parameters and pytest injects them automatically."
        },
        {
          question: "How do you test that a function raises a specific exception in pytest?",
          options: [
            "try/except inside the test",
            "assert raises(ValueError)",
            "with pytest.raises(ValueError): ...",
            "pytest.expect_exception(ValueError)"
          ],
          correctIndex: 2,
          explanation: "`with pytest.raises(ExceptionType):` is the idiomatic way to assert that code raises an exception. If the exception is NOT raised, the test fails. You can also match the message with `match=`."
        },
        {
          question: "What does `@pytest.mark.parametrize` enable?",
          options: [
            "Running the test in parallel",
            "Running the same test with multiple sets of input/output values",
            "Marking a test as expected to fail",
            "Skipping the test on certain platforms"
          ],
          correctIndex: 1,
          explanation: "`@pytest.mark.parametrize` runs the decorated test once for each set of parameters provided. This eliminates duplicate test functions and makes edge case coverage easy to extend."
        },
        {
          question: "What does `Mock()` from `unittest.mock` create?",
          options: [
            "A real database connection for testing",
            "A fake object that records calls and can have configurable return values",
            "A copy of a real object with logging added",
            "An object that raises exceptions on every call"
          ],
          correctIndex: 1,
          explanation: "`Mock()` creates a flexible fake object. You can configure `return_value`, `side_effect`, and assert how it was called with `assert_called_once_with()` etc. It is used to isolate units from dependencies."
        },
        {
          question: "How does pytest compare floating-point numbers reliably?",
          options: [
            "assert a == b (exact equality)",
            "assert abs(a - b) < 1e-9 (manual tolerance)",
            "assert a == pytest.approx(b)",
            "float_assert(a, b)"
          ],
          correctIndex: 2,
          explanation: "`pytest.approx()` handles floating-point imprecision by treating values as equal if they are within a relative tolerance (default 1e-6). `assert 0.1 + 0.2 == pytest.approx(0.3)` passes."
        },
        {
          question: "What does `@patch('module.function_name')` do?",
          options: [
            "Imports `function_name` from `module`",
            "Temporarily replaces `function_name` in `module` with a `Mock` for the duration of the test",
            "Wraps the function with a logging layer",
            "Marks the function as deprecated"
          ],
          correctIndex: 1,
          explanation: "`@patch` replaces the target with a `Mock` object for the duration of the test, then restores the original. This isolates the code under test from external dependencies like databases or APIs."
        }
      ]
    },
    {
      topicId: "regular-expressions",
      topicTitle: "Regular Expressions",
      objectiveIndex: 7,
      questions: [
        {
          question: "What is the difference between `re.search()` and `re.match()`?",
          options: [
            "`re.search()` is faster; `re.match()` is more accurate",
            "`re.match()` only checks the start of the string; `re.search()` searches anywhere in the string",
            "`re.search()` returns all matches; `re.match()` returns the first",
            "They are identical"
          ],
          correctIndex: 1,
          explanation: "`re.match()` anchors to the beginning of the string and only succeeds if the pattern matches from position 0. `re.search()` scans the entire string for the first location where the pattern matches."
        },
        {
          question: "What does `re.sub(r'\\s+', ' ', text)` do?",
          options: [
            "Removes all whitespace",
            "Replaces all sequences of one or more whitespace characters with a single space",
            "Counts the number of whitespace characters",
            "Splits the string on whitespace"
          ],
          correctIndex: 1,
          explanation: "`\\s+` matches one or more whitespace characters. `re.sub` replaces each non-overlapping match with `' '`, effectively normalizing multiple spaces to one."
        },
        {
          question: "What syntax is used to create a named capture group in a regex pattern?",
          options: [
            "`(name:...)`",
            "`(?P<name>...)`",
            "`(?name=...)`",
            "`[name:...]`"
          ],
          correctIndex: 1,
          explanation: "Named groups use `(?P<name>pattern)`. You access them with `match.group('name')` or `match.groupdict()`, making complex patterns much more readable than numbered groups."
        },
        {
          question: "What does a positive lookahead `(?=...)` do?",
          options: [
            "Matches and consumes the pattern",
            "Asserts that the pattern follows at the current position without consuming characters",
            "Looks back at previously matched text",
            "Makes the match case-insensitive"
          ],
          correctIndex: 1,
          explanation: "A lookahead `(?=...)` is a zero-width assertion: it checks that the pattern is present at the current position but does not consume any characters. The match position does not advance."
        },
        {
          question: "Why should you compile a regex pattern with `re.compile()` when using it repeatedly?",
          options: [
            "Compiled patterns accept more syntax",
            "Compiling caches the parsed pattern for reuse, improving performance in loops",
            "Only compiled patterns support named groups",
            "Compiled patterns are thread-safe; others are not"
          ],
          correctIndex: 1,
          explanation: "`re.compile()` parses the pattern into an internal representation once. Reusing the compiled object avoids re-parsing on every call, which is a significant improvement in tight loops."
        }
      ]
    }
  ],

  senior: [
    {
      topicId: "async-await",
      topicTitle: "Async/Await",
      objectiveIndex: 0,
      questions: [
        {
          question: "What happens when a coroutine hits an `await` expression?",
          options: [
            "The thread blocks until the awaited operation completes",
            "The coroutine suspends and returns control to the event loop, which can run other coroutines",
            "A new thread is spawned to handle the awaited operation",
            "The program pauses and waits for user input"
          ],
          correctIndex: 1,
          explanation: "Python's async model is cooperative multitasking. `await` suspends the current coroutine and yields control back to the event loop, which can then run other ready coroutines while the I/O completes."
        },
        {
          question: "What does `asyncio.gather()` do?",
          options: [
            "Runs coroutines sequentially and collects results",
            "Runs multiple coroutines concurrently and returns all results when all complete",
            "Creates a pool of threads for each coroutine",
            "Cancels all coroutines if one fails"
          ],
          correctIndex: 1,
          explanation: "`asyncio.gather()` schedules all provided coroutines to run concurrently on the event loop and returns a list of results in the same order as the inputs, once all have completed."
        },
        {
          question: "What is `asyncio.TaskGroup` (Python 3.11+) used for?",
          options: [
            "Creating a group of threads",
            "Structured concurrency: all tasks in the group must complete before the block exits, and failures cancel siblings",
            "Limiting the number of concurrent coroutines",
            "Scheduling tasks to run at a specific time"
          ],
          correctIndex: 1,
          explanation: "`TaskGroup` provides structured concurrency. All tasks created inside are guaranteed to finish before leaving the block. If any task raises an exception, remaining tasks are cancelled."
        },
        {
          question: "How do you limit the number of concurrent async operations?",
          options: [
            "Pass `max_concurrent` to `asyncio.gather()`",
            "Use `asyncio.Semaphore(n)` and `async with semaphore:` inside each coroutine",
            "Use `asyncio.Queue` with `maxsize=n`",
            "Use `threading.Semaphore` inside the coroutine"
          ],
          correctIndex: 1,
          explanation: "`asyncio.Semaphore(n)` limits concurrent access to `n`. Wrapping each operation with `async with semaphore:` ensures at most `n` coroutines execute that guarded code simultaneously."
        },
        {
          question: "What keyword is used to define a coroutine function in Python?",
          options: [
            "def async",
            "async def",
            "coroutine def",
            "await def"
          ],
          correctIndex: 1,
          explanation: "Coroutine functions are defined with `async def`. Calling an `async def` function returns a coroutine object; you must `await` it (or schedule it as a task) to actually run it."
        },
        {
          question: "What class must a custom async context manager implement?",
          options: [
            "`__enter__` and `__exit__`",
            "`__aenter__` and `__aexit__`",
            "`__async_enter__` and `__async_exit__`",
            "`__start__` and `__stop__`"
          ],
          correctIndex: 1,
          explanation: "Async context managers implement `__aenter__` and `__aexit__` (both defined with `async def`). They are used with `async with`, allowing `await` expressions inside setup and teardown."
        },
        {
          question: "What is the entry point to run the asyncio event loop from synchronous code?",
          options: [
            "`asyncio.start(coro)`",
            "`asyncio.run(coro)`",
            "`loop = asyncio.get_event_loop(); loop.run_until_complete(coro)`",
            "Both B and C are valid; `asyncio.run()` is the modern preferred way"
          ],
          correctIndex: 3,
          explanation: "`asyncio.run()` (Python 3.7+) is the modern, preferred way to run the top-level coroutine. The older `loop.run_until_complete()` pattern still works but is more verbose."
        }
      ]
    },
    {
      topicId: "metaclasses",
      topicTitle: "Metaclasses",
      objectiveIndex: 1,
      questions: [
        {
          question: "What is the default metaclass for all Python classes?",
          options: ["object", "type", "meta", "BaseClass"],
          correctIndex: 1,
          explanation: "`type` is Python's built-in metaclass. When you write `class Foo: ...`, Python internally calls `type('Foo', (object,), namespace)` to create the class object."
        },
        {
          question: "What does `type('MyClass', (), {'x': 10})` produce?",
          options: [
            "An instance of MyClass with attribute x=10",
            "A new class named MyClass with class attribute x=10",
            "A metaclass named MyClass",
            "TypeError because type() cannot create classes"
          ],
          correctIndex: 1,
          explanation: "`type(name, bases, namespace)` dynamically creates a new class. Here it creates a class named `'MyClass'` with no base classes (besides `object`) and class attribute `x = 10`."
        },
        {
          question: "What is `__init_subclass__` used for?",
          options: [
            "Initializing the metaclass",
            "Hooking into subclass creation to perform registration or validation without writing a full metaclass",
            "Preventing a class from being subclassed",
            "Calling `__init__` on the parent before the child"
          ],
          correctIndex: 1,
          explanation: "`__init_subclass__` is a classmethod called on a base class whenever a new subclass is created. It is a simpler alternative to metaclasses for use cases like auto-registration."
        },
        {
          question: "What does a descriptor's `__set_name__` method receive as arguments?",
          options: [
            "The descriptor instance and the attribute value",
            "The owner class and the name the descriptor is assigned to",
            "The instance and the owner class",
            "The metaclass and the namespace dict"
          ],
          correctIndex: 1,
          explanation: "`__set_name__(self, owner, name)` is called at class creation time. `owner` is the class the descriptor is defined on; `name` is the attribute name. This lets descriptors know their own name."
        },
        {
          question: "When does a custom metaclass's `__new__` method execute?",
          options: [
            "When an instance of the class is created",
            "When the class itself is being defined (at class creation time)",
            "When the metaclass is first imported",
            "When `super().__new__()` is called in the class"
          ],
          correctIndex: 1,
          explanation: "A metaclass's `__new__` is called at class creation time, before the class object exists. This allows modifying the class namespace, adding methods, or enforcing conventions."
        },
        {
          question: "What is the difference between a metaclass and `__init_subclass__`?",
          options: [
            "There is no difference; they are interchangeable",
            "Metaclasses control the full class creation process including `__new__`; `__init_subclass__` is a simpler hook that only runs after subclass creation",
            "Metaclasses are for built-in types only; `__init_subclass__` is for user-defined classes",
            "`__init_subclass__` requires no base class; metaclasses require inheriting from `type`"
          ],
          correctIndex: 1,
          explanation: "Metaclasses offer full control over class creation including `__new__` and `__init__`. `__init_subclass__` is a lighter hook that runs after the subclass is created, sufficient for registration or simple validation."
        }
      ]
    },
    {
      topicId: "memory-management",
      topicTitle: "Memory Management",
      objectiveIndex: 2,
      questions: [
        {
          question: "How does Python primarily manage memory?",
          options: [
            "Manual memory management with malloc/free",
            "Reference counting, supplemented by a cyclic garbage collector",
            "Mark-and-sweep garbage collection only",
            "Generational garbage collection without reference counting"
          ],
          correctIndex: 1,
          explanation: "Python uses reference counting as its primary mechanism: when an object's count reaches zero, memory is freed immediately. A cyclic GC handles reference cycles that reference counting alone cannot resolve."
        },
        {
          question: "What does adding `__slots__` to a class do?",
          options: [
            "Prevents adding new methods to the class",
            "Replaces the per-instance `__dict__` with fixed slots, reducing memory per instance significantly",
            "Makes the class thread-safe",
            "Locks the class attributes from modification"
          ],
          correctIndex: 1,
          explanation: "By declaring `__slots__`, the class uses a compact fixed-size structure instead of a `__dict__` per instance. This can reduce per-instance memory by 50-70%, important when creating millions of objects."
        },
        {
          question: "What is the limitation of using `__slots__`?",
          options: [
            "The class cannot be serialized",
            "You cannot add arbitrary instance attributes not listed in `__slots__`",
            "Methods cannot use `self`",
            "The class cannot be subclassed"
          ],
          correctIndex: 1,
          explanation: "With `__slots__`, only the declared attribute names can be set on instances. Trying to assign any other attribute raises `AttributeError`. You lose the flexible `__dict__` dictionary."
        },
        {
          question: "What is a weak reference and why is it used?",
          options: [
            "A reference that can be modified after creation",
            "A reference that does not increase the object's reference count, allowing GC to collect the object",
            "A reference stored in a file for persistence",
            "A reference shared between threads"
          ],
          correctIndex: 1,
          explanation: "A weak reference (via `weakref.ref()`) does not increment the reference count, so the object can be garbage collected when no strong references remain. The weak ref then returns `None` upon access."
        },
        {
          question: "Which Python integers are cached (interned) and always share the same object?",
          options: [
            "All integers",
            "Integers in the range -5 to 256",
            "Integers from 0 to 1000",
            "Only 0 and 1"
          ],
          correctIndex: 1,
          explanation: "CPython caches (interns) small integers from -5 to 256. Variables holding these values always reference the same object in memory. Integers outside this range may or may not share objects."
        },
        {
          question: "What module provides tools to measure current and peak memory allocation?",
          options: ["gc", "sys", "tracemalloc", "memory_profiler"],
          correctIndex: 2,
          explanation: "`tracemalloc` (standard library, Python 3.4+) traces Python memory allocations. `tracemalloc.get_traced_memory()` returns `(current, peak)` in bytes since tracing started."
        }
      ]
    },
    {
      topicId: "profiling-and-optimization",
      topicTitle: "Profiling & Optimization",
      objectiveIndex: 3,
      questions: [
        {
          question: "What is the correct workflow for performance optimization?",
          options: [
            "Optimize as you write code, before measuring",
            "Write correct code first, then measure, then optimize the specific bottleneck",
            "Rewrite everything in C as soon as performance matters",
            "Use global variables to avoid attribute lookup overhead"
          ],
          correctIndex: 1,
          explanation: "The correct workflow: write correct code -> measure with profiling tools -> identify the bottleneck (usually 10% of code causes 90% of slowness) -> optimize that part -> measure again."
        },
        {
          question: "Which standard library module provides function-level CPU profiling?",
          options: ["timeit", "cProfile", "tracemalloc", "perf"],
          correctIndex: 1,
          explanation: "`cProfile` is the standard library's deterministic profiler. It records how many times each function is called and the time spent. Run with `python -m cProfile -s cumulative script.py`."
        },
        {
          question: "What is `@functools.lru_cache` used for?",
          options: [
            "Logging all calls to the function",
            "Caching function results in a Least Recently Used cache to avoid recomputation",
            "Limiting the rate of function calls",
            "Measuring execution time"
          ],
          correctIndex: 1,
          explanation: "`@functools.lru_cache` memoizes a function's return values, storing up to `maxsize` results. When called with the same arguments, it returns the cached result instantly. It's production-grade memoization."
        },
        {
          question: "Why is using the built-in `sum()` faster than a manual loop for summing a list?",
          options: [
            "Built-ins skip type checking",
            "`sum()` uses multiple threads",
            "Built-in functions are implemented in C and iterate without Python bytecode overhead",
            "`sum()` uses lazy evaluation"
          ],
          correctIndex: 2,
          explanation: "Python built-ins like `sum()`, `min()`, `max()` are implemented in C. They iterate over the iterable entirely in C without the per-iteration bytecode interpretation overhead of a Python `for` loop."
        },
        {
          question: "What does `timeit.timeit()` measure?",
          options: [
            "Wall-clock time of a script file",
            "The execution time of a small code snippet, running it many times for accuracy",
            "Memory allocated during a function call",
            "The number of function calls made"
          ],
          correctIndex: 1,
          explanation: "`timeit.timeit(stmt, number=n)` runs `stmt` exactly `n` times and returns the total elapsed time. Running many iterations averages out variability, giving reliable micro-benchmarks."
        }
      ]
    },
    {
      topicId: "packaging-and-distribution",
      topicTitle: "Packaging & Distribution",
      objectiveIndex: 4,
      questions: [
        {
          question: "What file is the modern standard for Python package configuration?",
          options: ["setup.py", "setup.cfg", "pyproject.toml", "package.json"],
          correctIndex: 2,
          explanation: "`pyproject.toml` (PEP 517/518/621) is the current standard for Python package metadata and build configuration. It replaces the older `setup.py` and `setup.cfg` approaches."
        },
        {
          question: "What does `pip install -e \".[dev]\"` do?",
          options: [
            "Installs the package in a separate environment",
            "Installs the package in editable mode with optional 'dev' dependencies",
            "Exports the package to a .whl file",
            "Edits the package metadata"
          ],
          correctIndex: 1,
          explanation: "`-e` installs the package in editable mode (development mode), so code changes are reflected without reinstalling. `[dev]` installs the optional dependencies listed under `[project.optional-dependencies] dev`."
        },
        {
          question: "Which tool is used to build distribution archives (`.tar.gz` and `.whl`) from `pyproject.toml`?",
          options: ["twine", "build", "pip", "setuptools"],
          correctIndex: 1,
          explanation: "`python -m build` (from the `build` package) reads `pyproject.toml` and produces source distributions (`.tar.gz`) and wheels (`.whl`) in the `dist/` directory."
        },
        {
          question: "What does `twine upload dist/*` do?",
          options: [
            "Builds the package artifacts",
            "Uploads the distribution files to PyPI (or Test PyPI)",
            "Validates the package structure",
            "Installs the package from dist/"
          ],
          correctIndex: 1,
          explanation: "`twine` is the tool for securely uploading packages to PyPI. `twine upload dist/*` uploads all build artifacts. Use `--repository testpypi` to first test on Test PyPI."
        },
        {
          question: "What file in a package directory marks it as a PEP 561 typed package?",
          options: ["__types__.py", "py.typed", "typing.marker", "__typed__.py"],
          correctIndex: 1,
          explanation: "An empty `py.typed` marker file in the package directory tells type checkers (like `mypy`) that the package ships type information. This is specified in PEP 561."
        }
      ]
    },
    {
      topicId: "design-patterns",
      topicTitle: "Design Patterns",
      objectiveIndex: 5,
      questions: [
        {
          question: "What does the Singleton pattern guarantee?",
          options: [
            "A class can only have one method",
            "Only one instance of a class exists throughout the application",
            "All class attributes are immutable",
            "The class cannot be garbage collected"
          ],
          correctIndex: 1,
          explanation: "The Singleton pattern ensures a class has at most one instance and provides a global access point to it. In Python, the `SingletonMeta` metaclass intercepts `__call__` to return the same instance."
        },
        {
          question: "What problem does the Factory pattern solve?",
          options: [
            "It prevents object creation entirely",
            "It decouples object creation from the code that uses the object, allowing the type to be determined at runtime",
            "It ensures all created objects are singletons",
            "It automatically registers all created objects"
          ],
          correctIndex: 1,
          explanation: "The Factory pattern centralizes object creation. A factory method or class selects and constructs the appropriate concrete type based on parameters, hiding the details from the caller."
        },
        {
          question: "In the Observer pattern, what is the role of `emit()` on an Event object?",
          options: [
            "Registers a new subscriber",
            "Notifies all subscribed handlers by calling them with the provided arguments",
            "Removes all subscribers",
            "Serializes the event to a log"
          ],
          correctIndex: 1,
          explanation: "`emit()` iterates over all registered handlers and calls each one with the provided arguments. This is the notification mechanism of the observer/event pattern."
        },
        {
          question: "What does the Strategy pattern enable?",
          options: [
            "Building objects step by step",
            "Defining a family of algorithms and making them interchangeable at runtime without changing the context",
            "Decorating objects with additional behavior",
            "Ensuring only one algorithm instance exists"
          ],
          correctIndex: 1,
          explanation: "The Strategy pattern defines an interface for algorithms and allows swapping implementations at runtime. For example, a `DataStore` can switch between `NoCompression` and `ZlibCompression` strategies."
        },
        {
          question: "What makes the structural Decorator pattern different from Python's `@decorator` syntax?",
          options: [
            "They are the same pattern applied in different contexts",
            "The structural Decorator pattern wraps objects to add behavior dynamically; Python's `@decorator` wraps functions at definition time",
            "The structural Decorator pattern only works with classes",
            "Python's `@decorator` modifies the original function; the structural pattern does not"
          ],
          correctIndex: 1,
          explanation: "The GoF structural Decorator wraps objects (not functions) to add behavior while preserving the interface. Python's `@decorator` syntax is a language feature for wrapping callable objects at definition time."
        }
      ]
    },
    {
      topicId: "concurrency",
      topicTitle: "Concurrency",
      objectiveIndex: 6,
      questions: [
        {
          question: "What does the Global Interpreter Lock (GIL) prevent?",
          options: [
            "Multiple processes from running simultaneously",
            "Multiple threads from executing Python bytecode truly in parallel on multiple CPU cores",
            "Async coroutines from running concurrently",
            "Imports from running in parallel"
          ],
          correctIndex: 1,
          explanation: "The GIL ensures only one thread executes Python bytecode at a time, even on multi-core systems. CPU-bound threads cannot achieve true parallelism. I/O threads release the GIL during I/O."
        },
        {
          question: "For CPU-bound tasks, which Python concurrency model achieves true parallelism?",
          options: [
            "threading",
            "asyncio",
            "multiprocessing",
            "concurrent.futures.ThreadPoolExecutor"
          ],
          correctIndex: 2,
          explanation: "`multiprocessing` spawns separate processes, each with its own Python interpreter and GIL. This achieves true CPU parallelism. Threads cannot do so because of the GIL."
        },
        {
          question: "Why is `threading` still useful for I/O-bound tasks despite the GIL?",
          options: [
            "The GIL is automatically disabled for I/O operations",
            "Threads release the GIL during I/O system calls, allowing other threads to run Python code",
            "I/O operations don't need the GIL at all",
            "Threading uses a different GIL than the main thread"
          ],
          correctIndex: 1,
          explanation: "When a thread performs I/O (network, disk), it releases the GIL. Other threads can then run Python code while the first thread waits for the I/O to complete. This makes threading effective for I/O-bound tasks."
        },
        {
          question: "What does `ThreadPoolExecutor.submit()` return?",
          options: [
            "The result of the function immediately",
            "A `Future` object representing the pending result",
            "A coroutine that must be awaited",
            "A thread handle"
          ],
          correctIndex: 1,
          explanation: "`submit()` schedules the function for execution and immediately returns a `Future`. Call `future.result()` to block until the result is available, or use `as_completed()` to process results as they finish."
        },
        {
          question: "What is the purpose of `threading.Lock()` when modifying shared state?",
          options: [
            "To prevent the GIL from activating",
            "To ensure only one thread modifies shared state at a time, preventing race conditions",
            "To speed up the operation by batching updates",
            "To make the object thread-local"
          ],
          correctIndex: 1,
          explanation: "A `Lock` provides mutual exclusion. Only one thread can hold the lock at a time. Wrapping critical sections with `with lock:` prevents race conditions where multiple threads read-modify-write shared state."
        },
        {
          question: "Which concurrency model is best suited for I/O-bound tasks when all libraries are async-compatible?",
          options: [
            "threading",
            "multiprocessing",
            "asyncio",
            "concurrent.futures.ProcessPoolExecutor"
          ],
          correctIndex: 2,
          explanation: "`asyncio` handles I/O-bound concurrency most efficiently for async-compatible code: a single thread handles thousands of concurrent operations via an event loop with no thread overhead."
        }
      ]
    }
  ],

  exams: {
    beginner: [
      {
        question: "Which of the following correctly creates a list of squares for even numbers from 1 to 10?",
        options: [
          "[x**2 for x in range(1,11) if x%2==0]",
          "[x**2 if x%2==0 for x in range(1,11)]",
          "[x**2 for x in range(2,11,2) if x>0]",
          "Both A and C are correct"
        ],
        correctIndex: 3,
        explanation: "Option A filters with `if` after the `for` clause. Option C steps through only even numbers. Both produce `[4, 16, 36, 64, 100]`. Option B has invalid syntax — the `if` clause must come after the `for`."
      },
      {
        question: "What is the output of `print(type(None))`?",
        options: ["<class 'None'>", "<class 'NoneType'>", "<class 'null'>", "None"],
        correctIndex: 1,
        explanation: "`None` is the sole instance of `NoneType`. `type(None)` returns `<class 'NoneType'>`. It is not the same as having no type — it is a specific singleton type."
      },
      {
        question: "Which method removes and returns the last item from a list?",
        options: ["list.remove()", "list.delete()", "list.pop()", "list.discard()"],
        correctIndex: 2,
        explanation: "`list.pop()` removes and returns the last item (or the item at the given index). `remove()` removes the first occurrence of a value but does not return it. `discard()` is a set method."
      },
      {
        question: "What does the `with` statement guarantee when used with file objects?",
        options: [
          "The file is read completely into memory",
          "The file is closed automatically when the block exits, even on exception",
          "The file is locked against other processes",
          "The file is flushed on every write"
        ],
        correctIndex: 1,
        explanation: "The `with` statement calls `__exit__` on the context manager when leaving the block. For files, this calls `close()`, guaranteeing no resource leak even if an exception occurs."
      },
      {
        question: "What is the difference between `append()` and `extend()` on a list?",
        options: [
          "`append` adds multiple items; `extend` adds one",
          "`append` adds one item (the argument itself) to the end; `extend` adds each element of an iterable",
          "They are identical",
          "`extend` creates a new list; `append` modifies in place"
        ],
        correctIndex: 1,
        explanation: "`append(x)` adds `x` as a single element. `extend(iterable)` unpacks the iterable and appends each element. So `[1].append([2,3])` gives `[1,[2,3]]` but `[1].extend([2,3])` gives `[1,2,3]`."
      },
      {
        question: "Which import style makes the `datetime` class available directly as `datetime`?",
        options: [
          "import datetime",
          "from datetime import datetime",
          "import datetime.datetime",
          "using datetime"
        ],
        correctIndex: 1,
        explanation: "`from datetime import datetime` imports only the `datetime` class from the `datetime` module. Then you use it directly as `datetime.now()`. `import datetime` requires `datetime.datetime.now()`."
      },
      {
        question: "What does `{**d1, **d2}` do when both dicts share a key?",
        options: [
          "Raises a KeyError",
          "The key from `d1` wins",
          "The key from `d2` wins (right side takes precedence)",
          "Both values are kept in a list"
        ],
        correctIndex: 2,
        explanation: "When merging dicts with `{**d1, **d2}`, keys from `d2` overwrite keys from `d1`. The rightmost dict's values take precedence for duplicate keys."
      },
      {
        question: "What exception is raised by `int('hello')`?",
        options: ["TypeError", "ValueError", "ConversionError", "AttributeError"],
        correctIndex: 1,
        explanation: "`int()` raises `ValueError` when the string cannot be converted to an integer. `TypeError` would be raised if the argument is not a string or number type at all."
      },
      {
        question: "What does `sentence.find('fox')` return if 'fox' is not in the string?",
        options: ["None", "False", "-1", "0"],
        correctIndex: 2,
        explanation: "`.find()` returns `-1` when the substring is not found. This is different from `.index()`, which raises a `ValueError` on failure."
      },
      {
        question: "What is the purpose of a virtual environment?",
        options: [
          "To run Python in a Docker container",
          "To isolate project dependencies so different projects can have different package versions",
          "To compile Python code to machine code",
          "To speed up Python startup"
        ],
        correctIndex: 1,
        explanation: "Virtual environments create an isolated `site-packages` directory per project. This prevents version conflicts when different projects require different versions of the same library."
      },
      {
        question: "What does `numbers.sort(reverse=True)` do?",
        options: [
          "Returns a new sorted list in descending order",
          "Sorts the list in-place in descending order and returns None",
          "Reverses the list without sorting",
          "Creates a reversed copy"
        ],
        correctIndex: 1,
        explanation: "`list.sort()` sorts the list in-place and returns `None`. To get a new sorted list, use `sorted(numbers, reverse=True)`. In-place modification avoids creating a new list object."
      },
      {
        question: "What is the `re.sub()` function used for?",
        options: [
          "Finding all matches in a string",
          "Replacing matched patterns in a string",
          "Splitting a string by a pattern",
          "Compiling a regex for reuse"
        ],
        correctIndex: 1,
        explanation: "`re.sub(pattern, replacement, string)` replaces all non-overlapping occurrences of `pattern` in `string` with `replacement`. It can also accept a function as the replacement."
      },
      {
        question: "Which data structure should you use for fast membership testing on a large collection?",
        options: ["list", "tuple", "set", "dict values"],
        correctIndex: 2,
        explanation: "Sets use hash tables for O(1) average membership testing. Lists require O(n) linear scans. For read-only membership testing, a `frozenset` is also O(1) and hashable."
      },
      {
        question: "What is the correct way to define a custom exception in Python?",
        options: [
          "class MyError: raise Exception",
          "class MyError(Exception): pass",
          "def MyError(Exception): pass",
          "raise MyError from Exception"
        ],
        correctIndex: 1,
        explanation: "Custom exceptions are defined by subclassing `Exception` (or a more specific subclass like `ValueError`). Inheriting from `Exception` makes them catchable with `except MyError`."
      },
      {
        question: "What is the output of `list(range(5, 0, -1))`?",
        options: ["[5, 4, 3, 2, 1]", "[5, 4, 3, 2, 1, 0]", "[4, 3, 2, 1, 0]", "[0, 1, 2, 3, 4]"],
        correctIndex: 0,
        explanation: "`range(start, stop, step)` with negative step counts down. `range(5, 0, -1)` goes 5, 4, 3, 2, 1 — stopping before 0. The stop value is exclusive."
      },
      {
        question: "Which of these is the Pythonic way to check if a string is empty?",
        options: [
          "if len(s) == 0:",
          "if s == '':",
          "if not s:",
          "if s.isEmpty():"
        ],
        correctIndex: 2,
        explanation: "Empty strings are falsy in Python, so `if not s:` is the idiomatic check. It is equivalent to `if s == ''` but more Pythonic. `len(s) == 0` is also correct but verbose."
      },
      {
        question: "What does `pathlib.Path('data') / 'file.txt'` create?",
        options: [
          "Divides the path string by 'file.txt'",
          "A new Path object for 'data/file.txt' in a platform-independent way",
          "A tuple of ('data', 'file.txt')",
          "A file object"
        ],
        correctIndex: 1,
        explanation: "`pathlib.Path` overloads the `/` operator for path joining. It always uses the correct separator for the current OS, making cross-platform path handling simple."
      },
      {
        question: "What does `json.dump(data, f)` do?",
        options: [
          "Reads JSON from file f into data",
          "Converts data to a JSON string",
          "Serializes data to JSON and writes it to the open file f",
          "Validates that data is JSON-serializable"
        ],
        correctIndex: 2,
        explanation: "`json.dump()` serializes the Python object to JSON format and writes it directly to a file object. `json.dumps()` (note the 's') returns the JSON as a string instead."
      },
      {
        question: "What does `'mississippi'.count('s')` return?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "The string 'mississippi' contains 'm-i-s-s-i-s-s-i-p-p-i'. Counting 's' characters: positions 3, 4, 6, 7 = 4 occurrences."
      },
      {
        question: "Which statement about Python's `bool` type is correct?",
        options: [
          "`bool` is unrelated to `int`",
          "`bool` is a subclass of `int` where `True == 1` and `False == 0`",
          "`True` and `False` cannot be used in arithmetic",
          "`bool` is a subclass of `str`"
        ],
        correctIndex: 1,
        explanation: "In Python, `bool` is a subclass of `int`. `True` has the integer value `1` and `False` has the value `0`. This means `True + True == 2` and `True * 5 == 5`."
      }
    ],

    mid: [
      {
        question: "What does `@functools.lru_cache(maxsize=128)` do to a function?",
        options: [
          "Logs the 128 most recent calls",
          "Caches up to 128 distinct results keyed by arguments, evicting the least recently used",
          "Limits the function to 128 calls total",
          "Runs the function 128 times and averages results"
        ],
        correctIndex: 1,
        explanation: "`lru_cache` memoizes function results in a cache of at most `maxsize` entries. When full, the least recently used entry is evicted. Arguments must be hashable."
      },
      {
        question: "What does `@abstractmethod` enforce?",
        options: [
          "The method runs before `__init__`",
          "Any concrete subclass must implement this method, or instantiation raises TypeError",
          "The method cannot be called on instances",
          "The method is inherited but not overridable"
        ],
        correctIndex: 1,
        explanation: "Decorating a method with `@abstractmethod` in an ABC prevents the class from being instantiated unless all abstract methods are implemented in a concrete subclass."
      },
      {
        question: "What is the purpose of `yield from` in a generator?",
        options: [
          "Returns a value from the generator and stops iteration",
          "Delegates iteration to a sub-iterable, yielding each of its values transparently",
          "Creates a generator from a list",
          "Sends a value into a generator"
        ],
        correctIndex: 1,
        explanation: "`yield from iterable` delegates to the sub-iterable, forwarding each value. It also passes through `send()` and `throw()` calls, making it essential for generator delegation and pipelines."
      },
      {
        question: "What does `contextlib.contextmanager` require of the decorated generator function?",
        options: [
          "It must yield exactly once; code before yield is setup, code in finally is teardown",
          "It must yield all resources in a list",
          "It must have a try/except block",
          "It must subclass ContextManager"
        ],
        correctIndex: 0,
        explanation: "A `@contextlib.contextmanager` generator must yield exactly once. The code before `yield` is `__enter__`, the yielded value is what `as` binds to, and code in `finally` after `yield` is `__exit__`."
      },
      {
        question: "In pytest, what is the scope of a fixture decorated with `@pytest.fixture(scope='module')`?",
        options: [
          "A new fixture instance for every test function",
          "A single fixture instance shared across all tests in the same module",
          "A fixture shared across the entire test session",
          "A fixture that only runs once and is never reset"
        ],
        correctIndex: 1,
        explanation: "Fixture scope controls lifetime. `scope='module'` creates one fixture instance per module file, shared by all tests in that file. Scopes are: `function` (default), `class`, `module`, `session`."
      },
      {
        question: "What does `re.VERBOSE` (re.X) flag enable?",
        options: [
          "Verbose error messages",
          "Whitespace and comments inside the pattern string for readability",
          "Matching across multiple lines",
          "Case-insensitive matching"
        ],
        correctIndex: 1,
        explanation: "`re.VERBOSE` allows you to add whitespace and `#` comments inside the pattern. Python ignores the whitespace and comments, letting you format complex patterns across multiple lines."
      },
      {
        question: "What is structural subtyping (duck typing with types) in Python?",
        options: [
          "Inheriting from multiple base classes",
          "A class satisfies a `Protocol` by having the required methods, without explicit inheritance",
          "Using `isinstance()` to check types at runtime",
          "Defining all types with `TypeVar`"
        ],
        correctIndex: 1,
        explanation: "`Protocol` enables structural subtyping: any class with the required methods satisfies the protocol without explicitly inheriting from it. This matches Python's duck-typing philosophy."
      },
      {
        question: "What is the difference between `re.findall()` and `re.finditer()`?",
        options: [
          "`findall` returns match objects; `finditer` returns strings",
          "`findall` returns a list of strings; `finditer` returns an iterator of match objects",
          "They are identical",
          "`finditer` only finds the first match"
        ],
        correctIndex: 1,
        explanation: "`findall()` returns a list of matching strings (or groups). `finditer()` returns a lazy iterator of `Match` objects, which provides more information (position, groups) and is memory-efficient."
      },
      {
        question: "What does the walrus operator (`:=`) do in a list comprehension?",
        options: [
          "Assigns to a class variable",
          "Assigns a value to a variable within the expression, usable in the filter condition",
          "Compares two values by identity",
          "Creates a copy of the value"
        ],
        correctIndex: 1,
        explanation: "`:=` assigns and returns a value within an expression. In `[y for x in data if (y := compute(x)) > 0]`, `compute(x)` is called once and its result is both tested and used in the output."
      },
      {
        question: "What does `@pytest.mark.parametrize('x,y', [(1,1),(2,4)])` do?",
        options: [
          "Runs the test once with a tuple argument `(1,1),(2,4)`",
          "Runs the test twice: once with `x=1,y=1` and once with `x=2,y=4`",
          "Skips the test unless x and y are defined",
          "Marks the test as expected to fail"
        ],
        correctIndex: 1,
        explanation: "`parametrize` expands a single test into multiple test cases. Here, the test runs twice: first with `x=1, y=1`, then with `x=2, y=4`. Each case appears as a separate test in the output."
      },
      {
        question: "When does a generator expression compute its values?",
        options: [
          "When it is created",
          "Lazily, one value at a time as the generator is iterated",
          "In a background thread",
          "All at once when first accessed"
        ],
        correctIndex: 1,
        explanation: "Generator expressions are lazy: they produce the next value only when `next()` is called. No values are computed upfront, making them memory-efficient for large or infinite sequences."
      },
      {
        question: "What does `dataclass(frozen=True)` produce?",
        options: [
          "A class that cannot have subclasses",
          "An immutable dataclass whose instances cannot have attributes modified after creation",
          "A class that is serialized to JSON automatically",
          "A class with all fields set to their default values"
        ],
        correctIndex: 1,
        explanation: "`frozen=True` makes the dataclass immutable: setting or deleting fields after `__init__` raises `FrozenInstanceError`. Frozen instances are also hashable by default."
      },
      {
        question: "What does `Mock().assert_called_once_with(x=1)` verify?",
        options: [
          "That the mock will be called once in the future",
          "That the mock was called exactly once, with keyword argument `x=1`",
          "That the mock returns `x=1` when called",
          "That the mock was created with `x=1`"
        ],
        correctIndex: 1,
        explanation: "`assert_called_once_with()` asserts that the Mock was called exactly one time and with the specified arguments. If the call count or arguments differ, it raises `AssertionError`."
      },
      {
        question: "What is a class-based decorator (using `__call__`)?",
        options: [
          "A decorator defined inside a class body",
          "A class whose instances are callable and can wrap functions, maintaining state between calls",
          "A decorator that only works on class methods",
          "A metaclass used to modify decorators"
        ],
        correctIndex: 1,
        explanation: "A class whose `__call__` method wraps the decorated function acts as a decorator. This approach allows the decorator to maintain state (like call counts) as instance attributes."
      },
      {
        question: "What does `isinstance(obj, Protocol)` check in Python?",
        options: [
          "That `obj` explicitly inherits from `Protocol`",
          "Structural compatibility: whether `obj` has the required attributes and methods (with `runtime_checkable`)",
          "That `obj` was created by the Protocol factory",
          "Nothing; Protocols cannot be used with isinstance"
        ],
        correctIndex: 1,
        explanation: "With `@runtime_checkable`, `isinstance(obj, MyProtocol)` checks that `obj` has the required methods structurally. Without `@runtime_checkable`, using Protocol with `isinstance` raises `TypeError`."
      },
      {
        question: "What is the primary advantage of using a generator pipeline (chained generators)?",
        options: [
          "Generators run in parallel automatically",
          "Each stage processes one item at a time, so the entire pipeline uses constant memory",
          "Generators skip type checking",
          "Pipelines are automatically cached"
        ],
        correctIndex: 1,
        explanation: "Chained generators process data in a single pass: each item flows through all stages before the next item starts. Only one item is in memory at any stage, regardless of total dataset size."
      },
      {
        question: "What does `Literal['read', 'write']` as a type hint express?",
        options: [
          "The parameter must be a string",
          "The parameter must be exactly one of the literal values 'read' or 'write'",
          "The parameter is read-write",
          "The parameter defaults to 'read'"
        ],
        correctIndex: 1,
        explanation: "`Literal` restricts the allowed values to the specified literals. A static checker like `mypy` will flag any call where the argument is not one of the listed values."
      },
      {
        question: "What is a positive lookbehind `(?<=...)` in regex?",
        options: [
          "Matches and consumes the text behind the current position",
          "Asserts that the specified pattern precedes the current position without consuming it",
          "Matches text that does NOT precede the pattern",
          "Allows the pattern to span multiple lines"
        ],
        correctIndex: 1,
        explanation: "A positive lookbehind `(?<=pattern)` is a zero-width assertion that matches only if `pattern` is immediately before the current position. It does not consume any characters."
      },
      {
        question: "What does `__iter__` returning `self` on a class signify?",
        options: [
          "The class is its own iterator (not just iterable)",
          "The class is a singleton",
          "The class can be used as a dict key",
          "The class supports reverse iteration"
        ],
        correctIndex: 0,
        explanation: "An iterable's `__iter__` can return a separate iterator object. But if `__iter__` returns `self` and `__next__` is defined, the object IS both the iterable and the iterator, consuming it in place."
      },
      {
        question: "What is the primary role of `conftest.py` in a pytest project?",
        options: [
          "It configures the Python interpreter",
          "It defines fixtures and plugins shared across all tests in the same directory and below",
          "It lists all test files to include",
          "It sets environment variables for tests"
        ],
        correctIndex: 1,
        explanation: "`conftest.py` is automatically loaded by pytest. Fixtures defined there are available to all test files in the same directory and subdirectories without explicit imports."
      },
      {
        question: "What is the difference between `dict.items()` and just iterating over the dict?",
        options: [
          "There is no difference",
          "Iterating over the dict yields only keys; `.items()` yields (key, value) tuples",
          "`.items()` returns a sorted list; iterating does not",
          "`.items()` copies the dict; iteration does not"
        ],
        correctIndex: 1,
        explanation: "Iterating over a dict directly yields only keys. `.items()` returns a view of (key, value) tuples. Use `for k, v in d.items():` to unpack both in a loop."
      }
    ],

    senior: [
      {
        question: "What is cooperative multitasking in the context of `asyncio`?",
        options: [
          "The OS schedules coroutines across CPU cores",
          "Coroutines must explicitly yield control to the event loop via `await`; no preemption occurs",
          "Multiple threads cooperate to share the GIL",
          "asyncio automatically parallelizes I/O tasks"
        ],
        correctIndex: 1,
        explanation: "asyncio uses cooperative multitasking: coroutines run until they explicitly `await` something, at which point they yield control. The event loop then runs another ready coroutine. No involuntary preemption occurs."
      },
      {
        question: "What happens if a task in an `asyncio.TaskGroup` raises an exception?",
        options: [
          "Only that task is cancelled; others continue",
          "All sibling tasks in the group are cancelled and an `ExceptionGroup` is raised",
          "The exception is silently ignored",
          "The event loop is stopped"
        ],
        correctIndex: 1,
        explanation: "In `TaskGroup`, if any task fails, all remaining sibling tasks are cancelled. When all tasks have finished or been cancelled, an `ExceptionGroup` containing all exceptions is raised."
      },
      {
        question: "What does `__slots__` do to memory usage for a class with millions of instances?",
        options: [
          "Increases memory by allocating slots upfront",
          "Reduces memory by replacing the per-instance `__dict__` with a compact fixed-size structure",
          "Has no effect on memory, only on attribute access speed",
          "Moves instances to shared memory"
        ],
        correctIndex: 1,
        explanation: "`__slots__` eliminates the per-instance `__dict__` dictionary. For classes with millions of instances, this can reduce memory consumption by 50-70% since each `__dict__` has significant overhead."
      },
      {
        question: "When does Python's cyclic garbage collector run?",
        options: [
          "Every time an object is deleted",
          "Periodically when the number of newly allocated objects since the last collection exceeds a threshold",
          "Only when `gc.collect()` is called manually",
          "In a background thread continuously"
        ],
        correctIndex: 1,
        explanation: "The cyclic GC runs automatically based on thresholds (see `gc.get_threshold()`). It checks for reference cycles that reference counting cannot resolve. It can also be triggered manually with `gc.collect()`."
      },
      {
        question: "Why can't threading achieve true CPU parallelism in CPython?",
        options: [
          "Python threads are too slow to start",
          "The GIL prevents multiple threads from executing Python bytecode simultaneously",
          "Thread scheduling is non-deterministic",
          "Python threads share the same memory and cannot run truly independently"
        ],
        correctIndex: 1,
        explanation: "The Global Interpreter Lock (GIL) ensures only one thread executes Python bytecode at a time, even on multi-core systems. CPU-bound threads therefore cannot parallelize computation."
      },
      {
        question: "What is the role of `build-backend` in `pyproject.toml`?",
        options: [
          "Specifies the Python version to use",
          "Names the build backend (e.g., setuptools) that produces distribution artifacts from the source",
          "Lists the test framework to use",
          "Configures linting rules"
        ],
        correctIndex: 1,
        explanation: "`build-backend` (under `[build-system]`) specifies the tool that actually constructs the distribution. PEP 517 standardized this interface, allowing tools like `python -m build` to work with any compliant backend."
      },
      {
        question: "What problem does the Factory pattern with `register()` solve?",
        options: [
          "It ensures only one factory exists",
          "It allows new product types to be added without modifying the factory class",
          "It validates all created products",
          "It caches created products"
        ],
        correctIndex: 1,
        explanation: "A factory with a `register()` method follows the Open/Closed Principle: you can extend it with new types by calling `register('new_type', NewClass)` without touching the factory's existing code."
      },
      {
        question: "What is the difference between `asyncio.gather()` and `TaskGroup`?",
        options: [
          "They are identical in behavior",
          "`gather()` does not cancel siblings on failure; `TaskGroup` does and provides structured concurrency",
          "`gather()` supports structured concurrency; `TaskGroup` is less safe",
          "`TaskGroup` is faster because it avoids the event loop"
        ],
        correctIndex: 1,
        explanation: "`asyncio.gather()` by default lets other tasks continue if one fails. `TaskGroup` (Python 3.11+) provides structured concurrency: failure cancels siblings and exceptions are grouped."
      },
      {
        question: "What does `weakref.WeakValueDictionary` provide that a regular dict does not?",
        options: [
          "Thread-safe access",
          "Entries are automatically removed when the value object is garbage collected",
          "Faster lookups for string keys",
          "The ability to store unhashable keys"
        ],
        correctIndex: 1,
        explanation: "`WeakValueDictionary` stores weak references to values. When the value has no more strong references and is garbage collected, its entry is automatically removed from the dict. This is ideal for caches."
      },
      {
        question: "In Python's design patterns, what makes modules natural singletons?",
        options: [
          "Modules use `SingletonMeta` internally",
          "Python caches imported modules in `sys.modules`; subsequent imports return the same object",
          "Module-level code runs in a locked context",
          "Python interns module objects"
        ],
        correctIndex: 1,
        explanation: "When a module is first imported, Python executes it and stores the result in `sys.modules`. All subsequent `import` statements return the cached module object, making module-level state shared and singleton-like."
      },
      {
        question: "What does `ProcessPoolExecutor.map(func, items)` provide compared to `executor.submit()`?",
        options: [
          "`map()` submits tasks one at a time; `submit()` batches them",
          "`map()` applies `func` to all items and returns results in the original order; `submit()` gives individual Future objects",
          "`map()` uses threads; `submit()` uses processes",
          "They are identical"
        ],
        correctIndex: 1,
        explanation: "`executor.map()` distributes items across workers and returns results in the same order as inputs. `executor.submit()` returns individual `Future` objects, allowing more fine-grained control and out-of-order result processing."
      },
      {
        question: "What does a metaclass's `__new__` method receive as arguments?",
        options: [
          "The class name only",
          "The metaclass, class name, tuple of base classes, and the namespace dict",
          "The class instance and its arguments",
          "Only the namespace dict"
        ],
        correctIndex: 1,
        explanation: "`type.__new__(mcs, name, bases, namespace)` receives the metaclass, the class name as a string, a tuple of base classes, and a dict of the class namespace. This is when class creation actually happens."
      },
      {
        question: "What does the `Strategy` pattern enable at runtime?",
        options: [
          "Ensuring only one algorithm instance exists",
          "Swapping algorithm implementations interchangeably without changing the context that uses them",
          "Composing algorithms by wrapping one inside another",
          "Notifying observers when an algorithm is selected"
        ],
        correctIndex: 1,
        explanation: "The Strategy pattern defines interchangeable algorithm objects. The context delegates to the current strategy, which can be changed at runtime. This avoids complex conditionals and makes algorithms independently testable."
      },
      {
        question: "What is `cProfile`'s `cumtime` statistic?",
        options: [
          "Time spent only within the function, excluding sub-calls",
          "Total cumulative time spent in the function and all functions it called",
          "Average time per call",
          "Number of times the function was called"
        ],
        correctIndex: 1,
        explanation: "`cumtime` is the cumulative time: time spent in the function itself plus all functions it called. It shows total wall-clock cost. `tottime` shows only time in the function itself, excluding sub-calls."
      },
      {
        question: "What is the key difference between threading and multiprocessing for CPU-bound work in Python?",
        options: [
          "Threads are faster for CPU-bound work",
          "Multiprocessing bypasses the GIL by using separate processes, achieving true parallelism for CPU-bound tasks",
          "Threading uses multiple cores; multiprocessing uses one",
          "There is no performance difference"
        ],
        correctIndex: 1,
        explanation: "Each `multiprocessing.Process` gets its own GIL, so processes truly run in parallel across CPU cores. Threads share one GIL and cannot parallelize CPU-bound Python code."
      },
      {
        question: "What does integer caching in CPython mean for the range `-5 to 256`?",
        options: [
          "These integers cannot be used in arithmetic",
          "Variables holding these values always reference the same cached object in memory",
          "These integers are stored in a database",
          "These integers are compiled to machine code"
        ],
        correctIndex: 1,
        explanation: "CPython pre-allocates and caches integer objects from -5 to 256. Any variable assigned a value in this range points to the same object. This is why `a = 256; b = 256; a is b` is `True`."
      },
      {
        question: "What does `importlib.metadata.version('package_name')` return?",
        options: [
          "The Python version",
          "The installed version string of the specified package",
          "The version of importlib",
          "The date the package was installed"
        ],
        correctIndex: 1,
        explanation: "`importlib.metadata.version()` reads the installed package metadata and returns its version string. This is the standard way to programmatically get a dependency's version without importing it."
      },
      {
        question: "In the Observer pattern, what is the trade-off of using a plain list vs weak references for storing handlers?",
        options: [
          "There is no trade-off; both behave identically",
          "A plain list keeps handlers alive preventing GC; weak refs allow handlers to be collected when no other references exist",
          "Weak refs are faster; plain lists are more correct",
          "Plain lists support more handler types"
        ],
        correctIndex: 1,
        explanation: "Storing handlers in a plain list keeps them alive as long as the observable exists. Using weak reference storage lets handlers be garbage collected when callers no longer hold strong references, preventing memory leaks."
      },
      {
        question: "What does `asyncio.timeout(n)` do in Python 3.11+?",
        options: [
          "Sets the global event loop timeout",
          "Creates a context manager that cancels the enclosed code if it runs longer than `n` seconds",
          "Delays execution by `n` seconds",
          "Limits concurrent operations to `n`"
        ],
        correctIndex: 1,
        explanation: "`async with asyncio.timeout(seconds):` creates a deadline. If the enclosed async code does not complete within `seconds`, it is cancelled and `TimeoutError` is raised."
      },
      {
        question: "What is the purpose of `__exit__`'s three arguments `(exc_type, exc_val, exc_tb)` in a context manager?",
        options: [
          "They are ignored; context managers cannot inspect exceptions",
          "They provide information about any exception that occurred, allowing the context manager to handle or suppress it",
          "They are the return values of `__enter__`",
          "They represent the three possible exit states: normal, exception, and timeout"
        ],
        correctIndex: 1,
        explanation: "If an exception occurred in the `with` block, `exc_type`, `exc_val`, `exc_tb` are set to the exception's type, value, and traceback. If no exception occurred, all three are `None`."
      }
    ]
  }
};
