# Python — Beginner Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/python/beginner)

## Topics Covered

- Variables and Data Types
- Control Flow (if/elif/else, loops, match/case)
- Functions and Parameters (including the mutable default arguments pitfall)
- Data Structures (lists, dicts, sets, tuples)
- String Manipulation and f-strings
- File I/O (text, JSON, CSV, pathlib)
- Modules, Imports, and Virtual Environments
- Error Handling (try/except/else/finally)

## Prerequisites

- No prior programming experience required
- A working Python 3.12+ installation (3.13 recommended as of 2025-2026)
- Familiarity with using a text editor or IDE (VS Code with the Python extension is an excellent free choice)
- A virtual environment tool (`python -m venv` or [uv](https://docs.astral.sh/uv/) as a modern, faster alternative)

## Estimated Time

40 hours

---

## 1. Variables and Data Types

Python is dynamically typed — you never write `int x = 5`, you just write `x = 5`. The interpreter figures out the type at runtime. Despite this flexibility, every value has a concrete type that determines what operations are valid.

### Core Types at a Glance

| Type       | Example             | Key Property                         |
|------------|---------------------|--------------------------------------|
| `int`      | `42`                | Arbitrary precision (no overflow)    |
| `float`    | `3.14`              | IEEE 754 double (~15 digits)         |
| `str`      | `"hello"`           | Immutable Unicode text               |
| `bool`     | `True` / `False`    | Subclass of `int`                    |
| `NoneType` | `None`              | Singleton representing "no value"    |

### Important Nuances

- **Arbitrary-precision integers**: `10 ** 100` works without overflow. Python handles big numbers natively.
- **Floating-point surprise**: `0.1 + 0.2` evaluates to `0.30000000000000004` due to IEEE 754. Use `round()` or `math.isclose()` for comparisons.
- **Booleans are ints**: `True + True == 2` and `False == 0`. This is by design — `bool` is a subclass of `int`.
- **None identity**: Always use `is None` and `is not None`, never `== None`. `None` is a singleton; `is` checks identity.
- **Truthy/Falsy**: `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`, and `False` are all falsy. Everything else is truthy.

### Type Checking and Conversion

```python
age = 30
print(type(age))                 # <class 'int'>
print(isinstance(age, int))      # True — preferred in production
print(isinstance(True, int))     # True — bool IS an int subclass

# Conversion (casting)
int("42")        # 42
float("3.14")    # 3.14
str(100)         # "100"
int(3.9)         # 3 (truncates toward zero, NOT rounding)
```

### Practice Exercises

1. Create a variable holding your birth year as an `int`. Calculate your approximate age.
2. Explore: what does `int(3.9)` return? Is it 3 or 4? Why?
3. Confirm that `0.1 + 0.2 != 0.3` and then fix the comparison using `round()`.
4. List all the falsy values you can think of and verify with `bool()`.

---

## 2. Control Flow

Control flow determines the order statements execute. Python uses **indentation** (not braces) to define blocks, which makes readable code a syntactic requirement.

### Conditionals: if / elif / else

```python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "F"
```

### Ternary Expression

```python
status = "pass" if score >= 60 else "fail"
```

### For Loops

`for` iterates over any iterable — lists, tuples, strings, ranges, dicts, files, and more.

```python
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# With index using enumerate
for i, fruit in enumerate(["apple", "banana"], start=1):
    print(f"{i}. {fruit}")

# range(start, stop, step)
for i in range(0, 16, 3):
    print(i)  # 0, 3, 6, 9, 12, 15
```

### While Loops

```python
attempts = 0
while attempts < 5:
    attempts += 1
    if attempts == 3:
        break
else:
    # Runs ONLY if the loop finished without break
    print("Exhausted all attempts")
```

### Match/Case (Python 3.10+)

Structural pattern matching replaces long `if/elif` chains for many use cases:

```python
command = "quit"
match command:
    case "start":
        print("Starting...")
    case "stop" | "quit" | "exit":
        print("Stopping...")
    case _:
        print("Unknown command")
```

### Practice Exercises

1. Write a for loop that prints the multiplication table for 7 (7x1 through 7x12).
2. Use `enumerate` to print a numbered list of city names.
3. Write a `while` loop that simulates rolling a die until you get a 6.
4. Write a `for/else` loop that searches a list for a value.

---

## 3. Functions

Functions are reusable blocks of code. They are **first-class objects** in Python — you can assign them to variables, pass them as arguments, and return them from other functions.

### Parameter Types

Python supports several parameter styles, and the order matters:

1. Positional arguments
2. `*args` — variable positional arguments (collected as a tuple)
3. Keyword-only arguments (those after `*args` or a bare `*`)
4. `**kwargs` — variable keyword arguments (collected as a dict)

```python
def api_request(method, url, *headers, timeout=30, **params):
    print(f"{method} {url}, headers={headers}, timeout={timeout}, params={params}")

api_request("GET", "/users", "Accept: json", timeout=10, page=1)
```

### The Mutable Default Argument Pitfall

This is one of Python's most common gotchas:

```python
# WRONG — the list is shared across ALL calls
def add_item_bad(item, items=[]):
    items.append(item)
    return items

print(add_item_bad("a"))  # ['a']
print(add_item_bad("b"))  # ['a', 'b'] — BUG!

# CORRECT — use None and create a new list each call
def add_item_good(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Lambda Functions

```python
square = lambda x: x ** 2
sorted_users = sorted(users, key=lambda u: u[1])
```

### Docstrings

Every function should have a docstring explaining what it does:

```python
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """
    Calculate Body Mass Index.

    Parameters:
        weight_kg: Weight in kilograms.
        height_m: Height in meters.

    Returns:
        The BMI value.
    """
    return weight_kg / (height_m ** 2)
```

### Practice Exercises

1. Write a function returning `(min, max, average)` from a list of numbers.
2. Write a higher-order function that takes a function and a list, and applies the function to each element.
3. Write a function with `**kwargs` that builds an HTML tag string.
4. Demonstrate the mutable default argument bug and fix it.

---

## 4. Data Structures

Python's four core built-in data structures each serve a different purpose:

| Structure | Mutable | Ordered | Duplicates | Best For                     |
|-----------|---------|---------|------------|------------------------------|
| `list`    | Yes     | Yes     | Yes        | General-purpose sequences    |
| `tuple`   | No      | Yes     | Yes        | Fixed records, dict keys     |
| `dict`    | Yes     | Yes*    | Keys: No   | Key-value mappings           |
| `set`     | Yes     | No      | No         | Membership testing, dedup    |

*Dicts maintain insertion order since Python 3.7 (language spec).

### Lists

```python
numbers = [10, 20, 30, 40, 50]
numbers[0]       # 10 (first)
numbers[-1]      # 50 (last)
numbers[1:4]     # [20, 30, 40] (slice)
numbers[::2]     # [10, 30, 50] (every 2nd)

# Key methods: append, insert, extend, pop, remove, sort
# List comprehension
squares = [x ** 2 for x in range(1, 11)]
```

### Tuples

Immutable sequences. Useful as dict keys (since they are hashable) and for returning multiple values from functions.

```python
point = (3.0, 4.5)
x, y = point  # Unpacking

from collections import namedtuple
Color = namedtuple("Color", ["red", "green", "blue"])
orange = Color(255, 165, 0)
```

### Dictionaries

```python
config = {"host": "localhost", "port": 5432}
config["host"]              # Direct access (KeyError if missing)
config.get("timeout", 30)   # Safe access with default

# Merging (Python 3.9+)
merged = defaults | overrides

# Dict comprehension
word_lengths = {w: len(w) for w in ["hello", "world"]}
```

### Sets

```python
a = {"python", "backend", "api"}
b = {"python", "frontend", "react"}
a | b   # Union
a & b   # Intersection
a - b   # Difference

# Membership testing is O(1) for sets vs O(n) for lists
999_999 in set(range(1_000_000))  # Instant
```

### Choosing the Right Structure

- Need ordered, mutable collection? **list**
- Need an immutable record or dict key? **tuple**
- Need key-value pairs? **dict**
- Need fast membership testing or dedup? **set**

### Practice Exercises

1. Create a list of 10 random integers, then use a set to find unique values.
2. Build a dictionary that maps each word in a sentence to its length.
3. Write a function that returns common elements of two lists using sets.
4. Create a nested dict representing a JSON API response.

---

## 5. String Manipulation

Strings are immutable sequences of Unicode characters with a rich set of built-in methods.

### f-strings (Preferred Formatting)

```python
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")
print(f"In 5 years: {age + 5}")
print(f"Pi to 3 decimals: {3.14159:.3f}")
print(f"Percentage: {0.856:.1%}")         # 85.6%
print(f"Padded: {42:>10}")               # Right-align
print(f"Binary: {255:08b}")              # 11111111
```

### Common String Methods

```python
text = "  Hello, World!  "
text.strip()          # "Hello, World!"
text.upper()          # "  HELLO, WORLD!  "
text.lower()          # "  hello, world!  "

sentence = "the quick brown fox"
sentence.split()      # ["the", "quick", "brown", "fox"]
" | ".join(["a", "b", "c"])  # "a | b | c"

sentence.find("fox")      # 16 (or -1 if not found)
sentence.replace("fox", "cat")
sentence.startswith("the")  # True
```

### String Slicing

```python
text = "Python"
text[0:3]    # "Pyt"
text[::-1]   # "nohtyP" (reversed)
```

### Regular Expressions (Intro)

```python
import re
emails = re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", text)
cleaned = re.sub(r"\s+", " ", "too   many  spaces")
```

### Practice Exercises

1. Write a function that takes "First Last" and returns "Last, First".
2. Use an f-string to format a price as "$1,234.56".
3. Split a CSV string and reconstruct it as tab-separated.
4. Write a regex that finds all phone numbers in a string.

---

## 6. File I/O

Always use the `with` statement when working with files — it guarantees the file is closed even if an exception occurs.

### Reading and Writing Text Files

```python
# Write
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Line 1\nLine 2\n")

# Read entire file
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Read line by line (memory-efficient for large files)
with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

### JSON Files

```python
import json

# Write
with open("data.json", "w") as f:
    json.dump({"name": "Alice", "age": 30}, f, indent=2)

# Read
with open("data.json", "r") as f:
    data = json.load(f)
```

### CSV Files

```python
import csv

with open("people.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"])
```

### pathlib (Modern Path Handling)

```python
from pathlib import Path

data_dir = Path("data")
data_dir.mkdir(exist_ok=True)

output = data_dir / "output.txt"
output.write_text("Hello!", encoding="utf-8")
content = output.read_text(encoding="utf-8")

for path in Path(".").glob("*.txt"):
    print(f"{path.name}: {path.stat().st_size} bytes")
```

### Practice Exercises

1. Write a function that reads a text file and returns `{"lines": N, "words": N, "chars": N}`.
2. Write a program that reads a JSON config file and prints each key-value pair.
3. Create a CSV with student grades and compute the average.
4. Use `pathlib` to list all `.py` files recursively in a directory.

---

## 7. Modules and Imports

### Import Styles

```python
import os                        # Full module
from datetime import datetime    # Specific name
from math import pi, sqrt        # Multiple names
import json as j                 # Alias
```

### Creating Your Own Module

Any `.py` file is a module. Create `utils.py` with functions, then import them from another file.

### Package Structure

```
my_package/
    __init__.py       # Makes it a package
    core.py
    helpers/
        __init__.py
        formatting.py
```

### The `__name__` Guard

```python
def main():
    print("Running as script")

if __name__ == "__main__":
    main()
```

This ensures `main()` only runs when the file is executed directly, not when imported.

### Virtual Environments

Virtual environments isolate project dependencies:

```bash
# Standard library approach
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
pip install requests

# Modern alternative (faster)
uv venv .venv
source .venv/bin/activate
uv pip install requests
```

### Useful Standard Library Modules

| Module         | Purpose                              |
|----------------|--------------------------------------|
| `collections`  | Counter, defaultdict, deque          |
| `itertools`    | Efficient looping combinators        |
| `pathlib`      | Object-oriented file system paths    |
| `json`         | JSON encoding/decoding               |
| `re`           | Regular expressions                  |
| `hashlib`      | Secure hashing                       |
| `uuid`         | Unique identifiers                   |
| `random`       | Random number generation             |

### Practice Exercises

1. Create a module `mathutils.py` with `factorial`, `is_prime`, and `gcd`. Import and use them.
2. Use `collections.Counter` to count word frequencies in a string.
3. Set up a virtual environment and install the `requests` package.
4. Use `itertools.combinations` to find all 2-element pairs in a list.

---

## 8. Error Handling

Errors are inevitable. Python's exception system lets you catch and respond to them gracefully.

### The Exception Hierarchy

```
BaseException
├── KeyboardInterrupt   (Ctrl+C — do NOT catch this)
├── SystemExit          (sys.exit — do NOT catch this)
└── Exception           (catch this or its subclasses)
    ├── ValueError
    ├── TypeError
    ├── KeyError
    ├── IndexError
    ├── FileNotFoundError
    └── ...
```

**Rule**: Never catch `BaseException` directly. Always catch `Exception` or more specific types.

### try / except / else / finally

```python
def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None
    except TypeError as e:
        print(f"Type error: {e}")
        return None
    else:
        # Only runs if NO exception occurred
        return result
    finally:
        # ALWAYS runs
        print("Division complete")
```

### Raising Exceptions

```python
def validate_age(age):
    if not isinstance(age, (int, float)):
        raise TypeError(f"Expected number, got {type(age).__name__}")
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    return int(age)
```

### Custom Exceptions

```python
class ApplicationError(Exception):
    """Base exception for our application."""
    pass

class NotFoundError(ApplicationError):
    def __init__(self, resource_type, resource_id):
        self.resource_type = resource_type
        self.resource_id = resource_id
        super().__init__(f"{resource_type} '{resource_id}' not found")
```

### Exception Chaining

```python
try:
    with open("config.yaml") as f:
        return f.read()
except FileNotFoundError as e:
    raise ApplicationError("Config not available") from e
```

### Practice Exercises

1. Write a function that reads a JSON file, handling `FileNotFoundError`, `json.JSONDecodeError`, and `KeyError`.
2. Create a custom exception hierarchy for a banking app.
3. Write a retry function that catches `ConnectionError` up to 3 times.
4. Demonstrate exception chaining with `raise ... from ...`.

---

## Summary

| Topic                  | Key Takeaway                                                |
|------------------------|-------------------------------------------------------------|
| Variables & Data Types | Everything is an object; use `isinstance()` for type checks |
| Control Flow           | Indentation defines blocks; `for/else` is unique to Python  |
| Functions              | First-class objects; beware mutable default arguments       |
| Data Structures        | Choose the right one: list vs set vs dict vs tuple          |
| String Manipulation    | f-strings are fast and readable; regex for complex patterns |
| File I/O               | Always use `with`; prefer `pathlib` for paths               |
| Modules & Imports      | Virtual environments isolate dependencies                   |
| Error Handling         | Catch specific exceptions; create custom hierarchies        |

## What to Learn Next

Move on to the **Mid** level when you can comfortably write Python scripts that combine these concepts — reading files, processing data, handling errors, and organizing code into modules.

## Recommended Resources

- **Programming with Mosh** — "Python Full Course for Beginners" — https://www.youtube.com/watch?v=_uQrJ0TkZlc
- **Python Official Tutorial** — https://docs.python.org/3/tutorial/
- **Real Python** — https://realpython.com/ (beginner-friendly articles)

---

After completing this level, proceed to [Python Mid](../Python/Mid.md).
