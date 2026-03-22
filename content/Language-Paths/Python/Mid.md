# Python — Mid-Level Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/python/mid)

## Topics Covered

- Object-Oriented Programming (classes, inheritance, polymorphism, dataclasses)
- Decorators and Higher-Order Functions
- Generators and Iterators
- Context Managers
- Comprehensions Deep Dive (walrus operator, nested comprehensions)
- Type Hints and Static Analysis (PEP 695, `typing` module, mypy)
- Testing with pytest (fixtures, parametrize, mocking)
- Regular Expressions

## Prerequisites

- Completion of the Python Beginner guide or equivalent knowledge
- Comfortable with functions, data structures, and error handling
- Experience writing small Python scripts
- A working Python 3.12+ installation

## Estimated Time

50 hours

---

## 1. Object-Oriented Programming

OOP in Python is built on classes that serve as blueprints for creating objects. Python's OOP model is more flexible than statically typed languages — classes can be modified at runtime, methods are just functions bound to instances, and duck typing means "if it quacks like a duck, treat it like one."

### Classes and Instances

```python
class BankAccount:
    interest_rate = 0.02  # Class variable (shared)

    def __init__(self, owner, balance=0.0):
        self.owner = owner          # Instance variable (unique)
        self._balance = balance     # Convention: _ means "protected"

    @property
    def balance(self):
        """Read-only access to balance."""
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount
        return self  # Method chaining
```

### Key Concepts

- **Class variables** are shared across all instances; **instance variables** are unique to each object
- **`@property`** converts a method into a computed attribute accessed without parentheses
- **`self`** refers to the specific instance — Python passes it explicitly
- Use `_name` for protected attributes and `__name` for name-mangled private attributes

### Inheritance

```python
class SavingsAccount(BankAccount):
    interest_rate = 0.05  # Override class variable

    def __init__(self, owner, balance=0.0):
        super().__init__(owner, balance)  # Initialize parent
        self._monthly_withdrawals = 0

    def withdraw(self, amount):
        if self._monthly_withdrawals >= 6:
            raise ValueError("Monthly withdrawal limit reached")
        self._monthly_withdrawals += 1
        return super().withdraw(amount)
```

### Abstract Base Classes

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

    @abstractmethod
    def perimeter(self) -> float: ...

# Cannot instantiate Shape directly — must implement all abstract methods
```

### Dunder (Magic) Methods

Dunder methods let your classes integrate with Python's built-in operations:

| Method          | Enables                      |
|-----------------|------------------------------|
| `__init__`      | Constructor                  |
| `__repr__`      | Developer-friendly `repr()`  |
| `__str__`       | Human-friendly `str()`       |
| `__len__`       | `len(obj)`                   |
| `__eq__`        | `obj1 == obj2`               |
| `__lt__`        | `obj1 < obj2` (and sorting)  |
| `__iter__`      | `for x in obj`               |
| `__contains__`  | `x in obj`                   |
| `__getitem__`   | `obj[key]`                   |
| `__add__`       | `obj1 + obj2`                |

### Dataclasses (Prefer for Data-Holding Classes)

```python
from dataclasses import dataclass, field

@dataclass
class User:
    name: str
    email: str
    age: int
    roles: list[str] = field(default_factory=list)
    active: bool = True
```

`@dataclass` auto-generates `__init__`, `__repr__`, and `__eq__`. Use `frozen=True` for immutable instances, `order=True` for comparison methods.

### Practice Exercises

1. Add `__add__` to `BankAccount` that merges two accounts.
2. Create a `CheckingAccount` subclass with an overdraft limit.
3. Implement a `Triangle` shape class with validation.
4. Convert a manual class into a `@dataclass`.

---

## 2. Decorators

Decorators modify the behavior of functions or classes without changing their source code. A decorator is simply a function that takes a function and returns a new function.

### Basic Decorator

```python
import functools

def log_calls(func):
    @functools.wraps(func)  # Preserves __name__, __doc__
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    """Add two numbers."""
    return a + b
```

`@log_calls` above `def add` is syntactic sugar for `add = log_calls(add)`.

### Decorator with Parameters (Decorator Factory)

```python
def retry(max_attempts=3, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
        return wrapper
    return decorator

@retry(max_attempts=5, exceptions=(ConnectionError,))
def fetch_data(url):
    ...
```

### Stacking Decorators

```python
@log_calls   # Runs second (outer)
@timer       # Runs first (inner)
def process():
    ...
```

### Key Built-in Decorators

| Decorator                   | Purpose                                    |
|-----------------------------|--------------------------------------------|
| `@functools.wraps`          | Preserve wrapped function metadata         |
| `@functools.lru_cache`      | Memoize function results                   |
| `@staticmethod`             | No `self` or `cls` parameter               |
| `@classmethod`              | Receives `cls` (the class) as first arg    |
| `@property`                 | Computed attribute access                  |

### Practice Exercises

1. Write a `@require_auth` decorator that checks for a `user` kwarg.
2. Write a `@deprecated(message)` decorator that prints a warning.
3. Write a class-based decorator (using `__call__`) that counts invocations.
4. Write a `@rate_limit(calls=5, period=60)` decorator.

---

## 3. Generators and Iterators

Generators produce values lazily — they yield one value at a time and only compute the next when asked. This makes them ideal for processing large datasets.

### The Iterator Protocol

Any object implementing `__iter__()` and `__next__()` is an iterator. Generators implement this automatically.

### Generator Functions

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

gen = countdown(5)
print(next(gen))  # 5
print(next(gen))  # 4
```

### Generator Expressions

```python
# List comprehension — materializes everything in memory
squares_list = [x ** 2 for x in range(1_000_000)]

# Generator expression — lazy, constant memory
squares_gen = (x ** 2 for x in range(1_000_000))
```

### Pipeline Pattern

Chain generators for memory-efficient data processing:

```python
def parse(lines):
    for line in lines:
        yield line.split(",")

def filter_active(records):
    for r in records:
        if r[2].strip() == "active":
            yield r

def format_output(records):
    for r in records:
        yield f"{r[0]} ({r[1]})"

# Each step processes one item at a time
pipeline = format_output(filter_active(parse(raw_lines)))
```

### yield from

Delegates to a sub-generator:

```python
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item
```

### Useful itertools Functions

| Function              | Purpose                                |
|-----------------------|----------------------------------------|
| `chain`               | Concatenate iterables                  |
| `islice`              | Slice an iterator (works on infinite)  |
| `groupby`             | Group consecutive equal elements       |
| `accumulate`          | Running totals                         |
| `product`             | Cartesian product                      |
| `combinations`        | r-length combinations                  |

### Practice Exercises

1. Write a generator that yields prime numbers infinitely.
2. Create a data pipeline that parses, filters, and transforms CSV-like data.
3. Implement `sliding_window(iterable, size)` as a generator.
4. Use `itertools.combinations` to find pairs summing to a target.

---

## 4. Context Managers

Context managers ensure resources are properly acquired and released. The `with` statement handles this automatically, even if exceptions occur.

### The Protocol

| Method       | When Called                            | Purpose           |
|--------------|---------------------------------------|--------------------|
| `__enter__`  | Entering the `with` block             | Acquire resource   |
| `__exit__`   | Leaving the `with` block (always)     | Release resource   |

### Class-Based Context Manager

```python
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        return False  # Don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))
print(f"Elapsed: {t.elapsed:.4f}s")
```

### Generator-Based (contextlib)

```python
from contextlib import contextmanager

@contextmanager
def temporary_directory():
    dir_path = tempfile.mkdtemp()
    try:
        yield dir_path        # Before yield = __enter__
    finally:
        shutil.rmtree(dir_path)  # After yield = __exit__
```

### Key contextlib Utilities

| Utility                 | Purpose                                      |
|-------------------------|----------------------------------------------|
| `@contextmanager`       | Generator-based context manager              |
| `suppress(ExcType)`     | Silently swallow specific exceptions         |
| `ExitStack`             | Manage a dynamic number of context managers  |

### Parenthesized Context Managers (Python 3.10+)

```python
with (
    open("input.txt") as fin,
    open("output.txt", "w") as fout,
):
    fout.write(fin.read())
```

### Practice Exercises

1. Write a context manager that changes the working directory and restores it on exit.
2. Write a `@contextmanager` that opens a file, yields a parsed JSON dict, and writes changes back on exit.
3. Use `ExitStack` to dynamically open a variable number of files.
4. Write a context manager that sets and restores an environment variable.

---

## 5. Comprehensions Deep Dive

### Nested Comprehensions

```python
# Flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]

# Identity matrix
identity = [[1 if i == j else 0 for j in range(4)] for i in range(4)]
```

### Dict and Set Comprehensions

```python
word_lengths = {word: len(word) for word in words}
unique_lengths = {len(word) for word in words}
```

### Walrus Operator (:=)

Python 3.8+ allows assignment within expressions:

```python
# Compute once, use twice
results = [y for x in data if (y := x ** 2 + x) > 20]

# In while loops
while (line := reader.readline()):
    process(line)
```

### When to Use a Generator Function Instead

If your comprehension spans multiple lines or has complex logic, refactor it into a generator function. Readability trumps conciseness.

### Practice Exercises

1. Transpose a matrix using a nested list comprehension.
2. Build a character frequency dict comprehension.
3. Use the walrus operator to filter a list while computing a running max.
4. Generate all valid chess positions (a1 through h8) with a comprehension.

---

## 6. Type Hints

Type hints add optional type information. They do not affect runtime, but tools like **mypy** use them to catch bugs before your code runs.

### Basic Annotations

```python
def greet(name: str, excited: bool = False) -> str:
    return f"Hello, {name}!" if not excited else f"HELLO, {name}!"

age: int = 30
names: list[str] = ["Alice", "Bob"]  # Python 3.9+ lowercase generics
```

### Union and Optional

```python
# Python 3.10+ — use | for unions
def find_user(user_id: int) -> dict | None:
    return users.get(user_id)

# Equivalent to Optional[dict]
```

### TypeVar and Generics

```python
from typing import TypeVar, Generic

T = TypeVar("T")

def first(items: list[T]) -> T | None:
    return items[0] if items else None
```

### PEP 695 (Python 3.12+): New Type Parameter Syntax

```python
# Modern syntax — no explicit TypeVar needed
def first[T](items: list[T]) -> T | None:
    return items[0] if items else None

class Stack[T]:
    def push(self, item: T) -> None: ...

type Vector = list[float]  # Type alias
```

### Protocol (Structural Subtyping)

```python
from typing import Protocol

class Renderable(Protocol):
    def render(self) -> str: ...

# Any class with a render() method satisfies this — no inheritance needed
```

### Literal and TypeAlias

```python
from typing import Literal, TypeAlias

def set_mode(mode: Literal["read", "write", "append"]) -> None: ...

JSON: TypeAlias = dict[str, Any]
```

### Running mypy

```bash
pip install mypy
mypy your_file.py --strict
```

### Practice Exercises

1. Add full type hints to a function that processes a list of dicts.
2. Create a generic `Cache[K, V]` class with get, set, and delete.
3. Define a `Protocol` for a Repository pattern.
4. Run mypy on your code and fix all type errors.

---

## 7. Testing with pytest

Testing is essential for reliable software. pytest offers simple syntax, powerful fixtures, and an extensive plugin ecosystem.

### Basic Tests

```python
def test_addition():
    assert 1 + 1 == 2

def test_exception():
    with pytest.raises(ValueError, match="bad value"):
        raise ValueError("bad value")
```

### Fixtures

```python
@pytest.fixture
def mock_db():
    db = Mock()
    db.find_one = Mock(return_value=None)
    return db

@pytest.fixture
def service(mock_db):
    return UserService(mock_db)

def test_get_user(service, mock_db):
    mock_db.find_one.return_value = {"name": "Alice"}
    assert service.get_user(1)["name"] == "Alice"
```

### Parametrize

```python
@pytest.mark.parametrize("email,valid", [
    ("user@example.com", True),
    ("no-at-sign", False),
    ("", False),
])
def test_email_validation(email, valid):
    ...
```

### Mocking

```python
from unittest.mock import Mock, patch

def test_api_call():
    with patch("module.requests.get") as mock_get:
        mock_get.return_value.json.return_value = {"status": "ok"}
        result = fetch_api("/endpoint")
        assert result["status"] == "ok"
```

### Float Comparisons

```python
assert 0.1 + 0.2 == pytest.approx(0.3)
```

### Running Tests

```bash
pip install pytest pytest-cov
pytest -v --cov=. --cov-report=term-missing
```

### Practice Exercises

1. Write tests for a Calculator class with add, subtract, multiply, divide.
2. Use `@pytest.mark.parametrize` with 10+ input/output pairs.
3. Write a fixture that sets up and tears down a temporary database.
4. Mock an HTTP client and test a function that calls an external API.

---

## 8. Regular Expressions

Python's `re` module provides comprehensive regex support.

### Core Functions

| Function       | Purpose                                |
|----------------|----------------------------------------|
| `re.search`    | Find first match anywhere in string    |
| `re.match`     | Match only at the start of string      |
| `re.fullmatch` | Entire string must match               |
| `re.findall`   | Return all non-overlapping matches     |
| `re.finditer`  | Iterator of match objects              |
| `re.sub`       | Replace matches                        |
| `re.split`     | Split string by pattern                |

### Named Groups

```python
pattern = r"(?P<date>[\d-]+) (?P<level>\w+) (?P<message>.+)"
m = re.match(pattern, log_line)
if m:
    print(m.group("level"))
    print(m.groupdict())
```

### Lookahead and Lookbehind

```python
# Positive lookahead: find words followed by comma
re.findall(r"\w+(?=,)", "apple, banana, cherry")

# Positive lookbehind: find amounts after $
re.findall(r"(?<=\$)\d+", "Items cost $25 and $30")
```

### Compiled Patterns

```python
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+", re.IGNORECASE)
for email in test_emails:
    if EMAIL.match(email):
        print(f"Valid: {email}")
```

### Verbose Mode

```python
phone = re.compile(r"""
    (?P<area>\d{3})     # Area code
    [-.\s]?             # Optional separator
    (?P<number>\d{3}    # First three digits
    [-.\s]?             # Optional separator
    \d{4})              # Last four digits
""", re.VERBOSE)
```

### Practice Exercises

1. Write a regex that validates strong passwords (8+ chars, upper, lower, digit, special).
2. Parse an Apache-style log line into components using named groups.
3. Write a function converting camelCase to snake_case with `re.sub`.
4. Use lookahead/lookbehind to extract values from `key=value` pairs.

---

## Summary

| Topic              | Key Takeaway                                                    |
|--------------------|-----------------------------------------------------------------|
| OOP                | Classes, inheritance, dunder methods, dataclasses               |
| Decorators         | Modify function behavior without changing the function          |
| Generators         | Lazy evaluation for memory-efficient data processing            |
| Context Managers   | Guarantee resource cleanup with `with` statements               |
| Comprehensions     | Concise transformation; walrus operator for assign-and-test     |
| Type Hints         | Static checking with mypy; Protocol for structural typing       |
| Testing            | pytest fixtures, parametrize, mocking, and coverage             |
| Regular Expressions| Pattern matching, groups, lookahead/lookbehind                  |

## What to Learn Next

Move on to the **Senior** level when you are comfortable building well-structured Python applications with proper testing and type safety.

## Recommended Resources

- **Programming with Mosh** — "Python Full Course" — https://www.youtube.com/watch?v=_uQrJ0TkZlc
- **pytest documentation** — https://docs.pytest.org/
- **mypy documentation** — https://mypy.readthedocs.io/
- **Real Python** — Intermediate topics — https://realpython.com/

---

After completing this level, proceed to [Python Senior](../Python/Senior.md).
