export const content = {
  beginner: `# Python – Beginner Deep Dive

Python is one of the most beginner-friendly languages ever designed, yet it powers everything from quick automation scripts to billion-scale data pipelines. Its philosophy — "there should be one obvious way to do it" — means less time arguing over syntax and more time solving problems. This guide walks you through the eight pillars every Python developer must own before moving on to intermediate work.

## What you will learn

- Declare and manipulate variables across all core data types
- Write conditional logic and loop over data with \`for\` and \`while\`
- Define reusable, well-documented functions with flexible argument styles
- Choose the right built-in data structure (list, tuple, dict, set) for the job
- Format and transform strings using f-strings, slices, and regular expressions
- Read and write files safely using context managers and \`pathlib\`
- Organise code into modules, packages, and virtual environments
- Handle errors gracefully with specific exception types and custom exceptions

---

## 1. Variables & Data Types

Python is a dynamically typed language, meaning you do not declare the type of a variable when you create it. The interpreter infers the type at runtime based on the value assigned. Understanding data types is the foundation of every Python program.

### Core Data Types

| Type | Example | Description |
|------|---------|-------------|
| \`int\` | \`42\` | Whole numbers, arbitrary precision |
| \`float\` | \`3.14\` | Double-precision floating-point |
| \`str\` | \`"hello"\` | Immutable text sequences |
| \`bool\` | \`True\` | Logical values (\`True\` / \`False\`) |
| \`NoneType\` | \`None\` | Represents absence of a value |

Python integers have arbitrary precision, meaning they can grow as large as your memory allows. Floats follow the IEEE 754 double-precision standard, which means they have about 15-17 significant decimal digits of precision. Strings are immutable sequences of Unicode characters. Booleans are a subclass of \`int\` where \`True == 1\` and \`False == 0\`. \`None\` is a singleton object used to represent "no value" or "not set."

### Type Checking and Conversion

You can check a variable's type with \`type()\` or \`isinstance()\`. The latter is preferred in production code because it respects inheritance. Type conversion (casting) lets you transform values between types.

\`\`\`python
# =============================================================
# Variables & Data Types – Comprehensive Example
# =============================================================

# --- Integer ---
age = 30
population = 7_900_000_000  # Underscores improve readability
big_number = 10 ** 100       # Python handles arbitrarily large ints
print(f"age: {age}, type: {type(age)}")              # age: 30, type: <class 'int'>
print(f"population: {population:,}")                  # population: 7,900,000,000

# --- Float ---
pi = 3.141592653589793
temperature = -40.0
scientific = 6.022e23  # Avogadro's number in scientific notation
print(f"pi: {pi}, type: {type(pi)}")                  # pi: 3.141592653589793, type: <class 'float'>

# Floating-point precision caveat
result = 0.1 + 0.2
print(f"0.1 + 0.2 = {result}")          # 0.1 + 0.2 = 0.30000000000000004
print(f"rounded: {round(result, 2)}")    # rounded: 0.3

# --- String ---
name = "Alice"
greeting = 'Hello, World!'
multiline = """This is a
multi-line string."""
raw = r"C:\\Users\\alice"  # Raw string – backslashes are literal
print(f"name: {name}, length: {len(name)}")  # name: Alice, length: 5

# --- Boolean ---
is_active = True
is_deleted = False
print(f"is_active: {is_active}, type: {type(is_active)}")  # is_active: True, type: <class 'bool'>
print(f"True + True = {True + True}")   # True + True = 2 (bool is subclass of int)

# --- NoneType ---
result = None
print(f"result: {result}, type: {type(result)}")  # result: None, type: <class 'NoneType'>

# Always use 'is' to compare with None, not '=='
if result is None:
    print("result has not been set yet")  # result has not been set yet

# --- Type checking ---
print(isinstance(age, int))            # True
print(isinstance(pi, (int, float)))    # True – checks multiple types
print(isinstance(is_active, int))      # True – bool IS an int subclass

# --- Type conversion (casting) ---
numeric_string = "42"
converted_int = int(numeric_string)        # str -> int
converted_float = float(numeric_string)    # str -> float
back_to_string = str(converted_int)        # int -> str

# Be careful – invalid conversions raise ValueError
try:
    bad = int("hello")
except ValueError as e:
    print(f"Cannot convert: {e}")
    # Cannot convert: invalid literal for int() with base 10: 'hello'

# Truthy / Falsy values
falsy_values = [0, 0.0, "", [], {}, set(), None, False]
for val in falsy_values:
    assert not val, f"{val!r} should be falsy"
print("All falsy values confirmed!")  # All falsy values confirmed!
\`\`\`

### Exercises

**1. Birth year calculator**
Create a variable holding your birth year as an int. Calculate your approximate age using \`2026 - birth_year\`. Store the result in a string formatted as "I am X years old." Then check whether the \`age\` variable is an instance of \`int\`. Finally, experiment: what does \`int(3.9)\` return — \`3\` or \`4\`?

<details>
<summary>Hint</summary>

Use an f-string to build the message: \`f"I am {age} years old."\`. Use \`isinstance(age, int)\` to check the type. \`int()\` truncates toward zero — it does not round.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
birth_year = 1995
age = 2026 - birth_year
message = f"I am {age} years old."
print(message)
print(isinstance(age, int))
print(int(3.9))
\`\`\`

Expected output:
\`\`\`
I am 31 years old.
True
3
\`\`\`

</details>

### Python Data Type Hierarchy

\`\`\`mermaid
flowchart TB
    A[Python Objects] --> B[Numeric]
    A --> C[Sequences]
    A --> D[Mappings]
    A --> E[Sets]
    A --> F[Boolean]
    A --> G[NoneType]
    B --> B1[int]
    B --> B2[float]
    B --> B3[complex]
    C --> C1[str - immutable]
    C --> C2[list - mutable]
    C --> C3[tuple - immutable]
    D --> D1[dict - mutable]
    E --> E1[set - mutable]
    E --> E2[frozenset - immutable]
\`\`\`

**Why it matters:** Every value in Python has a type, and understanding types prevents subtle bugs. Knowing that \`0.1 + 0.2 != 0.3\` in floating-point arithmetic, or that \`None\` should be compared with \`is\` rather than \`==\`, saves hours of debugging.

> **Role connection:** Data Engineers and Data Scientists work with numeric types daily when processing datasets. AI Engineers must understand type coercion when handling model inputs and outputs.

---

## 2. Control Flow

Control flow determines the order in which statements execute. Python uses indentation (not braces) to define blocks, which enforces readable code by design.

### Control Flow Patterns

\`\`\`mermaid
flowchart LR
    A[Start] --> B{Condition?}
    B -->|True| C[if block]
    B -->|False| D{elif?}
    D -->|True| E[elif block]
    D -->|False| F[else block]
    C --> G[Continue]
    E --> G
    F --> G
    G --> H{Loop?}
    H -->|for| I[Iterate over sequence]
    H -->|while| J[Check condition each pass]
    I --> K{break?}
    J --> K
    K -->|Yes| L[Exit loop]
    K -->|No| H
\`\`\`

### Conditional Statements

The \`if/elif/else\` chain evaluates conditions top-to-bottom and executes the first truthy branch. Python does not have a \`switch\` statement in versions before 3.10; from 3.10 onward, \`match/case\` (structural pattern matching) is available.

### Loops

\`for\` loops iterate over any iterable (list, tuple, string, range, dict, file, etc.). \`while\` loops repeat as long as a condition is truthy. Both support \`break\` (exit loop immediately), \`continue\` (skip to next iteration), and an optional \`else\` clause that runs if the loop completes without \`break\`.

\`\`\`python
# =============================================================
# Control Flow – Comprehensive Example
# =============================================================

# --- if / elif / else ---
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score {score} -> Grade {grade}")  # Score 85 -> Grade B

# Ternary (conditional expression)
status = "pass" if score >= 60 else "fail"
print(f"Status: {status}")  # Status: pass

# Truthy/Falsy in conditions
user_input = ""
if not user_input:
    print("No input provided")  # No input provided

# --- for loops ---
# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"  Fruit: {fruit}")
#   Fruit: apple
#   Fruit: banana
#   Fruit: cherry

# Using enumerate to get index + value
for index, fruit in enumerate(fruits, start=1):
    print(f"  {index}. {fruit}")
#   1. apple
#   2. banana
#   3. cherry

# Iterating over a dictionary
user = {"name": "Alice", "age": 30, "city": "Stockholm"}
for key, value in user.items():
    print(f"  {key}: {value}")
#   name: Alice
#   age: 30
#   city: Stockholm

# --- range() ---
# range(stop), range(start, stop), range(start, stop, step)
print("Counting by 3:", list(range(0, 16, 3)))  # Counting by 3: [0, 3, 6, 9, 12, 15]

# Reverse iteration
for i in range(5, 0, -1):
    print(f"  Countdown: {i}")
#   Countdown: 5
#   Countdown: 4
#   Countdown: 3
#   Countdown: 2
#   Countdown: 1

# --- while loops ---
attempts = 0
max_attempts = 5
while attempts < max_attempts:
    attempts += 1
    if attempts == 3:
        print(f"  Attempt {attempts}: found it!")  # Attempt 3: found it!
        break
else:
    # This runs ONLY if the while loop did NOT break
    print("  Exhausted all attempts")

# --- break and continue ---
print("Even numbers from 1-10:")
for num in range(1, 11):
    if num % 2 != 0:
        continue  # Skip odd numbers
    print(f"  {num}", end=" ")
print()
# Even numbers from 1-10:
#   2   4   6   8   10

# --- Nested loops with break ---
print("Finding first pair summing to 10:")
found = False
for i in range(1, 10):
    for j in range(1, 10):
        if i + j == 10 and i <= j:
            print(f"  {i} + {j} = 10")  # 1 + 9 = 10
            found = True
            break
    if found:
        break

# --- match/case (Python 3.10+) ---
command = "quit"
match command:
    case "start":
        print("Starting...")
    case "stop" | "quit" | "exit":
        print("Stopping...")  # Stopping...
    case _:
        print("Unknown command")
\`\`\`

### Exercises

**1. Multiplication table**
Write a \`for\` loop that prints the multiplication table for 7 (7×1 through 7×12), one result per line in the format \`7 x 1 = 7\`.

<details>
<summary>Hint</summary>

Use \`range(1, 13)\` to iterate from 1 to 12 inclusive. Inside the loop, compute \`7 * i\` and print with an f-string.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
for i in range(1, 13):
    print(f"7 x {i} = {7 * i}")
\`\`\`

Expected output:
\`\`\`
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
7 x 11 = 77
7 x 12 = 84
\`\`\`

</details>

**2. Die roller**
Write a \`while\` loop that simulates rolling a six-sided die using \`random.randint(1, 6)\` until you roll a 6. Count and print how many rolls it took. Use \`random.seed(42)\` so the result is reproducible.

<details>
<summary>Hint</summary>

Import \`random\` at the top. Keep a \`rolls\` counter. The loop condition is \`roll != 6\`, or roll inside the loop and \`break\` when you hit 6.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import random
random.seed(42)

rolls = 0
while True:
    rolls += 1
    die = random.randint(1, 6)
    if die == 6:
        break

print(f"Rolled a 6 after {rolls} rolls")
\`\`\`

Expected output:
\`\`\`
Rolled a 6 after 2 rolls
\`\`\`

</details>

**3. Numbered city list**
Use \`enumerate\` and a list of city names to print a numbered list starting at 1, e.g. \`1. Stockholm\`.

<details>
<summary>Hint</summary>

Pass \`start=1\` as the second argument to \`enumerate()\`: \`for i, city in enumerate(cities, start=1)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
cities = ["Stockholm", "Oslo", "Copenhagen", "Helsinki"]
for i, city in enumerate(cities, start=1):
    print(f"{i}. {city}")
\`\`\`

Expected output:
\`\`\`
1. Stockholm
2. Oslo
3. Copenhagen
4. Helsinki
\`\`\`

</details>

**4. Loop with else**
Write a loop with an \`else\` clause that searches a list for the value \`42\`. Print \`"Found 42!"\` if it exists, or \`"42 not found"\` via the \`else\` if it does not.

<details>
<summary>Hint</summary>

The \`else\` on a \`for\` loop runs only when the loop finishes without hitting a \`break\`. Use \`break\` when the value is found.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
numbers = [10, 20, 30, 42, 50]
for n in numbers:
    if n == 42:
        print("Found 42!")
        break
else:
    print("42 not found")
\`\`\`

Expected output:
\`\`\`
Found 42!
\`\`\`

</details>

**Why it matters:** Control flow is the backbone of every program. Mastering loops and conditionals lets you process data, implement business logic, and build interactive applications.

> **Role connection:** Backend Developers use control flow to handle request routing and validation. DevOps Engineers use it in automation scripts for deployment pipelines.

---

## 3. Functions

Functions are reusable blocks of code defined with the \`def\` keyword. They accept parameters, execute a body, and optionally return a value. Functions are first-class objects in Python, meaning they can be assigned to variables, passed as arguments, and returned from other functions.

### Parameter Types

Python supports positional arguments, keyword arguments, default values, variable-length positional args (\`*args\`), and variable-length keyword args (\`**kwargs\`). Understanding the order and behavior of these is essential.

\`\`\`python
# =============================================================
# Functions – Comprehensive Example
# =============================================================

# --- Basic function ---
def greet(name):
    """Return a greeting string."""
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Hello, Alice!

# --- Default parameters ---
def connect(host, port=5432, timeout=30):
    """Simulate a database connection with defaults."""
    print(f"Connecting to {host}:{port} (timeout={timeout}s)")

connect("localhost")                  # Connecting to localhost:5432 (timeout=30s)
connect("db.example.com", 3306)       # Connecting to db.example.com:3306 (timeout=30s)
connect("db.example.com", timeout=5)  # Connecting to db.example.com:5432 (timeout=5s)

# --- Multiple return values (tuple unpacking) ---
def divide(a, b):
    """Return quotient and remainder."""
    if b == 0:
        return None, None
    return a // b, a % b

quotient, remainder = divide(17, 5)
print(f"17 / 5 = {quotient} remainder {remainder}")  # 17 / 5 = 3 remainder 2

# --- *args: variable positional arguments ---
def total(*numbers):
    """Sum any number of arguments."""
    result = 0
    for n in numbers:
        result += n
    return result

print(f"total(1,2,3): {total(1, 2, 3)}")       # total(1,2,3): 6
print(f"total(): {total()}")                     # total(): 0

# --- **kwargs: variable keyword arguments ---
def build_profile(**kwargs):
    """Build a user profile dictionary from keyword arguments."""
    profile = {}
    for key, value in kwargs.items():
        profile[key] = value
    return profile

user = build_profile(name="Alice", age=30, role="engineer")
print(f"Profile: {user}")
# Profile: {'name': 'Alice', 'age': 30, 'role': 'engineer'}

# --- Combining all parameter types ---
def api_request(method, url, *headers, timeout=30, **params):
    """
    Demonstrate parameter ordering:
    1. Regular positional args (method, url)
    2. *args (headers)
    3. Keyword-only args (timeout)
    4. **kwargs (params)
    """
    print(f"{method} {url}")
    print(f"  Headers: {headers}")
    print(f"  Timeout: {timeout}")
    print(f"  Params: {params}")

api_request("GET", "/api/users", "Accept: application/json",
            timeout=10, page=1, limit=50)
# GET /api/users
#   Headers: ('Accept: application/json',)
#   Timeout: 10
#   Params: {'page': 1, 'limit': 50}

# --- Functions as first-class objects ---
def apply_operation(func, x, y):
    """Apply a function to two arguments."""
    return func(x, y)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(f"add: {apply_operation(add, 3, 4)}")        # add: 7
print(f"multiply: {apply_operation(multiply, 3, 4)}")  # multiply: 12

# --- Lambda (anonymous) functions ---
square = lambda x: x ** 2
print(f"square(5): {square(5)}")  # square(5): 25

# Common use: sorting with a key
users = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
users_sorted = sorted(users, key=lambda u: u[1])
print(f"By age: {users_sorted}")
# By age: [('Bob', 25), ('Alice', 30), ('Charlie', 35)]

# --- Docstrings and help ---
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index.

    Parameters:
        weight_kg (float): Weight in kilograms.
        height_m (float): Height in meters.

    Returns:
        float: The BMI value.
    """
    return weight_kg / (height_m ** 2)

# Access docstring programmatically
print(calculate_bmi.__doc__)

# --- PITFALL: Mutable default arguments ---
# WRONG: the list is shared across ALL calls
def add_item_bad(item, items=[]):
    items.append(item)
    return items

print(add_item_bad("a"))  # ['a']
print(add_item_bad("b"))  # ['a', 'b'] — BUG! Expected ['b']

# CORRECT: use None and create a new list each call
def add_item_good(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item_good("a"))  # ['a']
print(add_item_good("b"))  # ['b'] — Correct!
\`\`\`

### Exercises

**1. Stats function**
Write a function that accepts a list of numbers and returns a tuple of \`(minimum, maximum, average)\`. Test it with \`[4, 7, 2, 9, 1]\`.

<details>
<summary>Hint</summary>

Use the built-ins \`min()\`, \`max()\`, and \`sum()\`. The average is \`sum(numbers) / len(numbers)\`. Return all three as a tuple.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
def stats(numbers):
    return (min(numbers), max(numbers), sum(numbers) / len(numbers))

result = stats([4, 7, 2, 9, 1])
print(result)
\`\`\`

Expected output:
\`\`\`
(1, 9, 4.6)
\`\`\`

</details>

**2. HTML tag builder**
Write a function \`build_tag(tag, **attrs)\` that returns an HTML tag string. Example: \`build_tag("div", id="main", class_="container")\` should return \`'<div id="main" class="container"></div>'\`. Strip the trailing underscore from attribute names (to allow \`class_\` as a kwarg).

<details>
<summary>Hint</summary>

Iterate over \`attrs.items()\`. Strip a trailing underscore from each key with \`key.rstrip("_")\`. Join the attributes into a string with spaces and embed them in the tag.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
def build_tag(tag, **attrs):
    attr_str = " ".join(f'{k.rstrip("_")}="{v}"' for k, v in attrs.items())
    if attr_str:
        return f'<{tag} {attr_str}></{tag}>'
    return f'<{tag}></{tag}>'

print(build_tag("div", id="main", class_="container"))
print(build_tag("p"))
\`\`\`

Expected output:
\`\`\`
<div id="main" class="container"></div>
<p></p>
\`\`\`

</details>

**3. Higher-order map function**
Write a function \`apply_to_all(func, items)\` that takes a function and a list, and returns a new list with the function applied to each element. Test it by squaring \`[1, 2, 3, 4, 5]\`.

<details>
<summary>Hint</summary>

Use a list comprehension: \`return [func(item) for item in items]\`. Call it with a lambda: \`apply_to_all(lambda x: x ** 2, [1, 2, 3, 4, 5])\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
def apply_to_all(func, items):
    return [func(item) for item in items]

result = apply_to_all(lambda x: x ** 2, [1, 2, 3, 4, 5])
print(result)
\`\`\`

Expected output:
\`\`\`
[1, 4, 9, 16, 25]
\`\`\`

</details>

**Why it matters:** Functions are the primary tool for code organization and reuse. Well-designed functions with clear parameters and return values make code testable, maintainable, and composable.

> **Role connection:** Every developer role requires strong function design skills. API developers build endpoint handlers as functions. Data Scientists write transformation functions for data pipelines.

---

## 4. Data Structures

Python's built-in data structures are powerful and versatile. Understanding when to use each one is a key skill.

### Lists, Tuples, Dicts, and Sets

| Structure | Mutable | Ordered | Duplicates | Use Case |
|-----------|---------|---------|------------|----------|
| \`list\` | Yes | Yes | Yes | General-purpose sequences |
| \`tuple\` | No | Yes | Yes | Fixed records, dict keys |
| \`dict\` | Yes | Yes* | Keys: No | Key-value mappings |
| \`set\` | Yes | No | No | Membership testing, uniqueness |

*Dicts maintain insertion order since Python 3.7.

\`\`\`python
# =============================================================
# Data Structures – Comprehensive Example
# =============================================================

# --- Lists ---
# Ordered, mutable, allows duplicates
numbers = [10, 20, 30, 40, 50]

# Indexing and slicing
print(numbers[0])       # 10 (first element)
print(numbers[-1])      # 50 (last element)
print(numbers[1:4])     # [20, 30, 40] (slice)
print(numbers[::2])     # [10, 30, 50] (every 2nd element)

# Common list methods
numbers.append(60)           # Add to end
numbers.insert(0, 5)         # Insert at index
numbers.extend([70, 80])     # Add multiple
removed = numbers.pop()      # Remove and return last: 80
numbers.remove(5)            # Remove first occurrence of 5
numbers.sort(reverse=True)   # Sort in-place descending
print(f"Sorted desc: {numbers}")
# Sorted desc: [70, 60, 50, 40, 30, 20, 10]

# List comprehension (concise list creation)
squares = [x ** 2 for x in range(1, 11)]
print(f"Squares: {squares}")
# Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Filtered comprehension
even_squares = [x ** 2 for x in range(1, 11) if x % 2 == 0]
print(f"Even squares: {even_squares}")
# Even squares: [4, 16, 36, 64, 100]

# --- Tuples ---
# Ordered, immutable, allows duplicates
point = (3.0, 4.5)
rgb = (255, 128, 0)

# Tuple unpacking
x, y = point
r, g, b = rgb
print(f"Point: x={x}, y={y}")  # Point: x=3.0, y=4.5

# Named tuples for clarity
from collections import namedtuple
Color = namedtuple("Color", ["red", "green", "blue"])
orange = Color(255, 165, 0)
print(f"Orange: R={orange.red}, G={orange.green}, B={orange.blue}")
# Orange: R=255, G=165, B=0

# Tuples as dictionary keys (because they are hashable)
grid = {}
grid[(0, 0)] = "origin"
grid[(1, 2)] = "point A"

# --- Dictionaries ---
# Key-value pairs, mutable, keys must be hashable
config = {
    "host": "localhost",
    "port": 5432,
    "debug": True,
    "databases": ["main", "analytics"]
}

# Access patterns
print(config["host"])                    # localhost
print(config.get("timeout", 30))         # 30

# Iteration
for key in config:
    print(f"  {key}: {config[key]}")
#   host: localhost
#   port: 5432
#   debug: True
#   databases: ['main', 'analytics']

# Dictionary methods
keys = list(config.keys())
values = list(config.values())
items = list(config.items())

# Merging dictionaries
defaults = {"host": "0.0.0.0", "port": 8080, "timeout": 30}
overrides = {"host": "localhost", "debug": True}
merged = {**defaults, **overrides}        # Spread operator
print(f"Merged: {merged}")
# Merged: {'host': 'localhost', 'port': 8080, 'timeout': 30, 'debug': True}

# Python 3.9+ merge operator (preferred in modern code)
merged = defaults | overrides

# Dict comprehension
word = "mississippi"
letter_counts = {ch: word.count(ch) for ch in set(word)}
print(f"Letter counts: {letter_counts}")
# Letter counts: {'m': 1, 'i': 4, 's': 4, 'p': 2}  (key order may vary)

# --- Sets ---
# Unordered, mutable, no duplicates
tags_a = {"python", "backend", "api"}
tags_b = {"python", "frontend", "react"}

# Set operations (output order varies — sets are unordered)
print(f"Union: {tags_a | tags_b}")
print(f"Intersection: {tags_a & tags_b}")
print(f"Difference: {tags_a - tags_b}")
print(f"Symmetric diff: {tags_a ^ tags_b}")

# Membership testing is O(1) for sets vs O(n) for lists
large_set = set(range(1_000_000))
print(999_999 in large_set)  # True

# Set comprehension (output order varies — sets are unordered)
evens = {x for x in range(20) if x % 2 == 0}
print(f"Evens: {sorted(evens)}")  # sorted() for stable display
# Evens: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Removing duplicates from a list while preserving order
items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
seen = set()
unique = []
for item in items:
    if item not in seen:
        seen.add(item)
        unique.append(item)
print(f"Unique (ordered): {unique}")
# Unique (ordered): [3, 1, 4, 5, 9, 2, 6]
\`\`\`

### Exercises

**1. Unique values from a list**
Create a list of 10 integers that includes duplicates (e.g. \`[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\`). Use a set to find the unique values, then print the count of unique values and the sorted unique list.

<details>
<summary>Hint</summary>

Convert the list to a \`set()\` to remove duplicates. Use \`len()\` for the count and \`sorted()\` to display in order.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
unique = set(numbers)
print(f"Unique count: {len(unique)}")
print(f"Unique values: {sorted(unique)}")
\`\`\`

Expected output:
\`\`\`
Unique count: 7
Unique values: [1, 2, 3, 4, 5, 6, 9]
\`\`\`

</details>

**2. Word-length dictionary**
Build a dictionary that maps each word in the sentence \`"the quick brown fox"\` to its length.

<details>
<summary>Hint</summary>

Use a dict comprehension: \`{word: len(word) for word in sentence.split()}\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
sentence = "the quick brown fox"
word_lengths = {word: len(word) for word in sentence.split()}
print(word_lengths)
\`\`\`

Expected output:
\`\`\`
{'the': 3, 'quick': 5, 'brown': 5, 'fox': 3}
\`\`\`

</details>

**3. Common elements**
Write a function \`common_elements(list_a, list_b)\` that returns a sorted list of elements that appear in both lists, using sets for the comparison.

<details>
<summary>Hint</summary>

Convert both lists to sets and use the \`&\` (intersection) operator. Convert the result back to a sorted list with \`sorted()\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
def common_elements(list_a, list_b):
    return sorted(set(list_a) & set(list_b))

print(common_elements([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]))
\`\`\`

Expected output:
\`\`\`
[3, 4, 5]
\`\`\`

</details>

**4. Nested API response**
Create a nested dict representing a JSON API response with at least 3 levels: a top-level \`"data"\` key containing a \`"user"\` dict, which contains an \`"address"\` dict with \`"city"\` and \`"country"\` keys. Print the city.

<details>
<summary>Hint</summary>

Access nested values by chaining bracket notation: \`response["data"]["user"]["address"]["city"]\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
response = {
    "status": "ok",
    "data": {
        "user": {
            "id": 1,
            "name": "Alice",
            "address": {
                "city": "Stockholm",
                "country": "Sweden"
            }
        }
    }
}
print(response["data"]["user"]["address"]["city"])
\`\`\`

Expected output:
\`\`\`
Stockholm
\`\`\`

</details>

**Why it matters:** Choosing the right data structure affects both code clarity and performance. Using a set for membership testing instead of a list can turn an O(n) operation into O(1).

\`\`\`mermaid
graph TD
    A[Need to store data?] --> B{Ordered?}
    B -->|Yes| C{Mutable?}
    B -->|No| D[set / frozenset]
    C -->|Yes| E[list]
    C -->|No| F[tuple]
    A --> G{Key-Value pairs?}
    G -->|Yes| H[dict]
    G -->|No| B
\`\`\`

> **Role connection:** Backend Developers use dicts for JSON handling. Data Engineers use lists and dicts for ETL pipelines. DevOps Engineers use dicts for configuration management.

---

## 5. String Manipulation

Strings are one of the most frequently used types in Python. They are immutable sequences of Unicode characters with a rich set of built-in methods.

### f-strings

Introduced in Python 3.6, f-strings (formatted string literals) are the preferred way to embed expressions inside strings. They are faster and more readable than \`.format()\` or \`%\` formatting.

\`\`\`python
# =============================================================
# String Manipulation – Comprehensive Example
# =============================================================

import re

# --- f-strings (formatted string literals) ---
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")  # Name: Alice, Age: 30

# Expressions inside f-strings
print(f"In 5 years: {age + 5}")            # In 5 years: 35
print(f"Uppercase: {name.upper()}")         # Uppercase: ALICE
print(f"Pi to 3 decimals: {3.14159:.3f}")  # Pi to 3 decimals: 3.142
print(f"Percentage: {0.856:.1%}")           # Percentage: 85.6%
print(f"Padded: {42:>10}")                  # Padded:         42
print(f"Binary: {255:08b}")                 # Binary: 11111111

# Multiline f-strings
user = {"name": "Alice", "role": "Engineer"}
message = (
    f"User: {user['name']}\\n"
    f"Role: {user['role']}\\n"
    f"Active: {True}"
)
print(message)
# User: Alice
# Role: Engineer
# Active: True

# --- String methods ---
text = "  Hello, World!  "
print(text.strip())           # Hello, World!
print(text.lstrip())          # Hello, World!  (trailing space remains)
print(text.rstrip())          #   Hello, World! (leading space remains)

sentence = "the quick brown fox jumps over the lazy dog"
print(sentence.title())       # The Quick Brown Fox Jumps Over The Lazy Dog
print(sentence.capitalize())  # The quick brown fox jumps over the lazy dog
print(sentence.upper())       # THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG

# Searching
print(sentence.find("fox"))       # 16
print(sentence.count("the"))      # 2
print(sentence.startswith("the")) # True
print(sentence.endswith("dog"))   # True

# Splitting and joining
words = sentence.split()          # Split on whitespace
print(f"Word count: {len(words)}")  # Word count: 9
csv_line = "Alice,30,Engineer"
fields = csv_line.split(",")
print(f"Fields: {fields}")        # Fields: ['Alice', '30', 'Engineer']

# Join is a string method called on the separator
joined = " | ".join(fields)
print(f"Joined: {joined}")        # Joined: Alice | 30 | Engineer

# Replacing
cleaned = "Hello\\n\\nWorld\\n".replace("\\n", " ").strip()
print(f"Cleaned: {cleaned}")      # Cleaned: Hello  World

# --- String slicing ---
text = "Python Programming"
print(text[0:6])     # Python
print(text[7:])      # Programming
print(text[-11:])    # Programming
print(text[::-1])    # gnimmargorP nohtyP (reversed)

# --- Checking string content ---
print("123".isdigit())     # True
print("abc".isalpha())     # True
print("abc123".isalnum())  # True
print("   ".isspace())     # True

# --- Regular expressions (intro) ---
# re.search – find first match
email = "contact@example.com"
pattern = r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+"
match = re.search(pattern, email)
if match:
    print(f"Valid email: {match.group()}")  # Valid email: contact@example.com

# re.findall – find all matches
text = "Call 555-1234 or 555-5678 for info"
phones = re.findall(r"\\d{3}-\\d{4}", text)
print(f"Phone numbers: {phones}")  # Phone numbers: ['555-1234', '555-5678']

# re.sub – replace with pattern
cleaned = re.sub(r"\\s+", " ", "too    many   spaces")
print(f"Cleaned: {cleaned}")  # Cleaned: too many spaces
\`\`\`

### Exercises

**1. Name reverser**
Write a function that takes a full name in the format \`"First Last"\` and returns it in the format \`"Last, First"\`.

<details>
<summary>Hint</summary>

Use \`name.split()\` to separate the parts, then format with an f-string: \`f"{last}, {first}"\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
def reverse_name(full_name):
    first, last = full_name.split()
    return f"{last}, {first}"

print(reverse_name("Alice Smith"))
print(reverse_name("Bob Jones"))
\`\`\`

Expected output:
\`\`\`
Smith, Alice
Jones, Bob
\`\`\`

</details>

**2. Price formatter**
Use an f-string to format the number \`1234.5\` as the currency string \`"$1,234.50"\`.

<details>
<summary>Hint</summary>

The f-string format spec \`{value:,.2f}\` adds comma separators and two decimal places. Prefix the result with \`$\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
price = 1234.5
print(f"\${price:,.2f}")
\`\`\`

Expected output:
\`\`\`
$1,234.50
\`\`\`

</details>

**3. Password validator**
Write a function \`is_strong_password(password)\` using regex that returns \`True\` if the password is at least 8 characters, contains at least one uppercase letter, one lowercase letter, and one digit.

<details>
<summary>Hint</summary>

Use \`re.search()\` with three separate patterns: \`r"[A-Z]"\`, \`r"[a-z]"\`, \`r"\\d"\`. Check \`len(password) >= 8\` separately.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import re

def is_strong_password(password):
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"\\d", password):
        return False
    return True

print(is_strong_password("weak"))
print(is_strong_password("Str0ngPass"))
print(is_strong_password("alllower1"))
\`\`\`

Expected output:
\`\`\`
False
True
False
\`\`\`

</details>

**4. CSV to TSV**
Split the CSV string \`"Alice,30,Engineer,Stockholm"\` on commas, then rejoin the fields using tab characters (\`\\t\`) and print the result.

<details>
<summary>Hint</summary>

Use \`csv_line.split(",")\` to get a list of fields, then \`"\\t".join(fields)\` to produce the tab-separated string.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
csv_line = "Alice,30,Engineer,Stockholm"
fields = csv_line.split(",")
tsv_line = "\\t".join(fields)
print(repr(tsv_line))
\`\`\`

Expected output:
\`\`\`
'Alice\\t30\\tEngineer\\tStockholm'
\`\`\`

</details>

**Why it matters:** String manipulation is involved in nearly every program -- from parsing user input and formatting output to processing log files and building API responses.

> **Role connection:** Full-Stack Developers format strings for API responses and template rendering. Data Engineers parse and clean text data from various sources.

---

## 6. File I/O

Reading and writing files is a fundamental operation. Python makes file I/O straightforward with the built-in \`open()\` function and context managers.

### Context Managers

The \`with\` statement ensures files are properly closed after use, even if an exception occurs. Always use \`with\` when working with files.

\`\`\`python
# =============================================================
# File I/O – Comprehensive Example
# =============================================================

import json
import csv
from pathlib import Path

# --- Writing a text file ---
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Line 1: Hello, World!\\n")
    f.write("Line 2: Python file I/O\\n")
    f.write("Line 3: Context managers are great\\n")

# --- Reading a text file ---
# Read entire file as a string
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(f"Full content:\\n{content}")
# Full content:
# Line 1: Hello, World!
# Line 2: Python file I/O
# Line 3: Context managers are great

# Read line by line (memory-efficient for large files)
with open("example.txt", "r", encoding="utf-8") as f:
    for line_number, line in enumerate(f, start=1):
        print(f"  Line {line_number}: {line.strip()}")
#   Line 1: Line 1: Hello, World!
#   Line 2: Line 2: Python file I/O
#   Line 3: Line 3: Context managers are great

# Read all lines into a list
with open("example.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"  Total lines: {len(lines)}")  #   Total lines: 3

# --- Appending to a file ---
with open("example.txt", "a", encoding="utf-8") as f:
    f.write("Line 4: Appended later\\n")

# --- Working with JSON ---
data = {
    "users": [
        {"name": "Alice", "age": 30, "active": True},
        {"name": "Bob", "age": 25, "active": False}
    ],
    "total": 2
}

# Write JSON
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Read JSON
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
    print(f"  Users: {loaded['users'][0]['name']}")  #   Users: Alice

# --- Working with CSV ---
# Write CSV
rows = [
    ["name", "age", "city"],
    ["Alice", "30", "Stockholm"],
    ["Bob", "25", "Oslo"],
    ["Charlie", "35", "Copenhagen"]
]
with open("people.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# Read CSV
with open("people.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"  {row['name']} lives in {row['city']}")
#   Alice lives in Stockholm
#   Bob lives in Oslo
#   Charlie lives in Copenhagen

# --- pathlib: modern path handling ---
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)  # Create directory if it doesn't exist

# Write using pathlib
output_file = data_dir / "output.txt"
output_file.write_text("Written with pathlib!\\n", encoding="utf-8")

# Read using pathlib
content = output_file.read_text(encoding="utf-8")
print(f"  pathlib content: {content.strip()}")  #   pathlib content: Written with pathlib!

# Iterate files in a directory
for path in Path(".").glob("*.txt"):
    print(f"  Found: {path.name} ({path.stat().st_size} bytes)")

# Check existence
print(f"  example.txt exists: {Path('example.txt').exists()}")  # True
print(f"  data dir is dir: {data_dir.is_dir()}")                # True

# --- Cleanup (using pathlib instead of os.path) ---
for fname in ["example.txt", "data.json", "people.csv"]:
    Path(fname).unlink(missing_ok=True)
if data_dir.exists():
    output_file.unlink(missing_ok=True)
    data_dir.rmdir()
\`\`\`

### Exercises

**1. File statistics**
Write a function \`file_stats(path)\` that reads a text file and returns a dict with keys \`"lines"\`, \`"words"\`, and \`"chars"\` holding the respective counts.

<details>
<summary>Hint</summary>

Read the full content with \`f.read()\`. Split on newlines for lines (\`content.splitlines()\`), split on whitespace for words (\`content.split()\`), and use \`len(content)\` for chars.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from pathlib import Path

def file_stats(path):
    content = Path(path).read_text(encoding="utf-8")
    return {
        "lines": len(content.splitlines()),
        "words": len(content.split()),
        "chars": len(content),
    }

# Create a test file
Path("test.txt").write_text("Hello world\\nPython is great\\n", encoding="utf-8")
print(file_stats("test.txt"))
Path("test.txt").unlink()
\`\`\`

Expected output:
\`\`\`
{'lines': 2, 'words': 4, 'chars': 28}
\`\`\`

</details>

**2. JSON config printer**
Write a program that reads a JSON config file and prints each top-level key-value pair on its own line in the format \`key: value\`.

<details>
<summary>Hint</summary>

Use \`json.load(f)\` to parse the file into a dict, then iterate with \`.items()\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import json
from pathlib import Path

# Create sample config
config = {"host": "localhost", "port": 5432, "debug": True}
Path("config.json").write_text(json.dumps(config), encoding="utf-8")

# Read and print
with open("config.json", "r", encoding="utf-8") as f:
    data = json.load(f)
for key, value in data.items():
    print(f"{key}: {value}")

Path("config.json").unlink()
\`\`\`

Expected output:
\`\`\`
host: localhost
port: 5432
debug: True
\`\`\`

</details>

**3. Grade averager**
Create a CSV file with student names and grades (e.g. \`name,grade\\nAlice,88\\nBob,72\\nCharlie,95\`). Write a function that reads it and returns the average grade as a float rounded to 2 decimal places.

<details>
<summary>Hint</summary>

Use \`csv.DictReader\` to read the rows. Convert the \`"grade"\` field to \`float()\`. Compute the average as \`sum(grades) / len(grades)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import csv
from pathlib import Path

Path("grades.csv").write_text("name,grade\\nAlice,88\\nBob,72\\nCharlie,95\\n", encoding="utf-8")

def average_grade(path):
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        grades = [float(row["grade"]) for row in reader]
    return round(sum(grades) / len(grades), 2)

print(average_grade("grades.csv"))
Path("grades.csv").unlink()
\`\`\`

Expected output:
\`\`\`
85.0
\`\`\`

</details>

**Why it matters:** Almost every real-world application reads or writes files -- configuration files, data exports, logs, caches. Proper file handling prevents data corruption and resource leaks.

> **Role connection:** Data Engineers build ETL pipelines that read/write CSV, JSON, and Parquet files. Backend Developers handle file uploads and configuration loading.

---

## 7. Modules & Imports

Python's module system lets you organize code into reusable files and packages. Understanding imports, packages, and virtual environments is essential for building real projects.

### Module Resolution Flow

\`\`\`mermaid
flowchart LR
    A["import X"] --> B{In sys.modules cache?}
    B -->|Yes| C[Return cached module]
    B -->|No| D[Search sys.path]
    D --> E{Built-in module?}
    E -->|Yes| F[Load built-in]
    E -->|No| G{Found in directory?}
    G -->|Yes| H[Load .py file or package]
    G -->|No| I[ModuleNotFoundError]
    H --> J[Compile to bytecode]
    J --> K[Execute module]
    K --> L[Cache in sys.modules]
\`\`\`

### Virtual Environments

Virtual environments isolate project dependencies. Each project gets its own set of installed packages, avoiding version conflicts between projects.

\`\`\`python
# =============================================================
# Modules & Imports – Comprehensive Example
# =============================================================

# --- Basic imports ---
import os                        # Import entire module
import sys                       # Access sys.path, sys.argv, etc.
from datetime import datetime    # Import specific class
from math import pi, sqrt        # Import multiple names
from collections import Counter  # Import from standard library

print(f"Current directory: {os.getcwd()}")
print(f"Python version: {sys.version}")
print(f"Now: {datetime.now()}")
print(f"Pi: {pi}, sqrt(2): {sqrt(2):.4f}")
# Pi: 3.141592653589793, sqrt(2): 1.4142

# --- Aliased imports ---
import json as j
from datetime import timedelta as td

data = j.dumps({"key": "value"})
one_week = td(weeks=1)
print(f"One week from now: {datetime.now() + one_week}")

# --- Counter example (useful standard library tool) ---
words = "the cat sat on the mat the cat".split()
word_counts = Counter(words)
print(f"Word counts: {word_counts}")
# Word counts: Counter({'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1})
print(f"Most common: {word_counts.most_common(2)}")
# Most common: [('the', 3), ('cat', 2)]

# --- Creating your own module ---
# Suppose we have a file called 'utils.py' with:
#
#   def celsius_to_fahrenheit(c):
#       return c * 9/5 + 32
#
#   PI = 3.14159
#
# We would import it as:
#   from utils import celsius_to_fahrenheit, PI
#   import utils

# --- Package structure ---
# my_package/
#   __init__.py      <- Makes it a package
#   core.py
#   helpers/
#     __init__.py
#     formatting.py
#
# Import from package:
#   from my_package.core import main_function
#   from my_package.helpers.formatting import format_output

# --- The __name__ guard ---
# In every Python file, __name__ is set to "__main__" when
# the file is run directly, but set to the module name when imported.

def main():
    """Entry point for the script."""
    print("Running as main script")

if __name__ == "__main__":
    main()

# --- Useful standard library modules ---
import hashlib
import uuid
import random
import itertools
from urllib.parse import urlparse

# hashlib: hashing
hash_value = hashlib.sha256(b"hello").hexdigest()
print(f"SHA-256: {hash_value[:16]}...")
# SHA-256: 2cf24dba5fb0a30e...

# uuid: unique identifiers
unique_id = uuid.uuid4()
print(f"UUID: {unique_id}")
# UUID: (a random UUID, e.g.) 550e8400-e29b-41d4-a716-446655440000

# random: random number generation
random.seed(42)  # For reproducibility
print(f"Random int: {random.randint(1, 100)}")   # Random int: 52
print(f"Random choice: {random.choice(['a', 'b', 'c'])}")  # Random choice: a
print(f"Shuffled: {random.sample(range(10), 5)}")  # Shuffled: [1, 0, 4, 3, 3] (varies with seed)

# itertools: efficient looping
pairs = list(itertools.combinations(["A", "B", "C", "D"], 2))
print(f"Pairs: {pairs}")
# Pairs: [('A', 'B'), ('A', 'C'), ('A', 'D'), ('B', 'C'), ('B', 'D'), ('C', 'D')]

# urlparse: URL handling
url = urlparse("https://api.example.com/v2/users?page=1&limit=10")
print(f"Host: {url.hostname}, Path: {url.path}, Query: {url.query}")
# Host: api.example.com, Path: /v2/users, Query: page=1&limit=10
\`\`\`

### Exercises

**1. mathutils module**
Create a file \`mathutils.py\` with three functions: \`factorial(n)\` (using a loop), \`is_prime(n)\`, and \`gcd(a, b)\` (using the Euclidean algorithm). Show what the functions return for sample inputs.

<details>
<summary>Hint</summary>

For \`factorial\`, multiply a running total by each integer from 1 to n. For \`is_prime\`, check divisibility up to \`int(n**0.5)\`. For \`gcd\`, use \`while b: a, b = b, a % b\` then return \`a\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# mathutils.py (save as a file, or define inline to test)

def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(factorial(5))
print(is_prime(17))
print(gcd(48, 18))
\`\`\`

Expected output:
\`\`\`
120
True
6
\`\`\`

</details>

**2. Character frequency with defaultdict**
Use \`collections.defaultdict\` to count the frequency of each character in the string \`"hello world"\`. Print the result sorted by character.

<details>
<summary>Hint</summary>

Import \`defaultdict\` from \`collections\`. Create \`counts = defaultdict(int)\` then iterate over each character. Use \`sorted(counts.items())\` to display in order.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from collections import defaultdict

text = "hello world"
counts = defaultdict(int)
for ch in text:
    counts[ch] += 1

for char, freq in sorted(counts.items()):
    print(f"{repr(char)}: {freq}")
\`\`\`

Expected output:
\`\`\`
' ': 1
'd': 1
'e': 1
'h': 1
'l': 3
'o': 2
'r': 1
'w': 1
\`\`\`

</details>

**3. Group with itertools.groupby**
Use \`itertools.groupby\` to group the list \`[{"name": "Alice", "dept": "Eng"}, {"name": "Bob", "dept": "Eng"}, {"name": "Carol", "dept": "HR"}]\` by the \`"dept"\` key. Print each group.

<details>
<summary>Hint</summary>

Sort the list by the grouping key first — \`groupby\` only groups consecutive identical keys. Use \`key=lambda x: x["dept"]\` in both \`sorted()\` and \`groupby()\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import itertools

people = [
    {"name": "Alice", "dept": "Eng"},
    {"name": "Bob", "dept": "Eng"},
    {"name": "Carol", "dept": "HR"},
]

people.sort(key=lambda x: x["dept"])
for dept, group in itertools.groupby(people, key=lambda x: x["dept"]):
    names = [p["name"] for p in group]
    print(f"{dept}: {names}")
\`\`\`

Expected output:
\`\`\`
Eng: ['Alice', 'Bob']
HR: ['Carol']
\`\`\`

</details>

**4. Virtual environment setup**
Set up a virtual environment and install the \`requests\` package. This exercise is run in the terminal, not in a Python file.

<details>
<summary>Hint</summary>

Use \`python -m venv .venv\` to create the environment, then activate it before installing. On macOS/Linux the activation command is \`source .venv/bin/activate\`. On Windows it is \`.venv\\Scripts\\activate\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Run these commands in your terminal (not in Python):
#
# python -m venv .venv
# source .venv/bin/activate          # macOS / Linux
# .venv\\Scripts\\activate             # Windows
# pip install requests
#
# Or with uv (faster):
# uv venv .venv
# source .venv/bin/activate
# uv pip install requests
#
# Verify inside Python:
import importlib.util
print(importlib.util.find_spec("requests") is not None)
\`\`\`

Expected output (after installing requests):
\`\`\`
True
\`\`\`

</details>

**Why it matters:** Modules keep code organized and reusable. Virtual environments prevent dependency conflicts. The standard library provides battle-tested tools that save you from reinventing the wheel.

> **Role connection:** All developer roles need to manage dependencies. DevOps Engineers automate environment setup. Backend Developers structure large codebases into packages.

---

## 8. Error Handling

Errors are inevitable. Python's exception handling system lets you catch and respond to errors gracefully, ensuring your programs are robust and user-friendly.

### The Exception Hierarchy

All exceptions inherit from \`BaseException\`. Most user-catchable exceptions inherit from \`Exception\`. Never catch \`BaseException\` directly as it includes \`KeyboardInterrupt\` and \`SystemExit\`.

\`\`\`mermaid
graph TD
    A[BaseException] --> B[Exception]
    A --> C[KeyboardInterrupt]
    A --> D[SystemExit]
    B --> E[ValueError]
    B --> F[TypeError]
    B --> G[KeyError]
    B --> H[IndexError]
    B --> I[FileNotFoundError]
    B --> J[IOError]
    B --> K[AttributeError]
    B --> L[RuntimeError]
\`\`\`

\`\`\`python
# =============================================================
# Error Handling – Comprehensive Example
# =============================================================

# --- Basic try/except ---
def safe_divide(a, b):
    """Divide a by b with error handling."""
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError as e:
        print(f"Error: Invalid types – {e}")
        return None
    else:
        # Runs only if no exception occurred
        print(f"{a} / {b} = {result}")
        return result
    finally:
        # Always runs, even if there was an exception or return
        print("Division operation complete")

safe_divide(10, 3)
# 10 / 3 = 3.3333333333333335
# Division operation complete

safe_divide(10, 0)
# Error: Cannot divide by zero
# Division operation complete

safe_divide("a", 2)
# Error: Invalid types – unsupported operand type(s) for /: 'str' and 'int'
# Division operation complete

# --- Catching multiple exceptions ---
def parse_config(data):
    """Parse a configuration dictionary safely."""
    try:
        host = data["host"]
        port = int(data["port"])
        timeout = float(data.get("timeout", "30"))
        return {"host": host, "port": port, "timeout": timeout}
    except (KeyError, ValueError) as e:
        print(f"Config error: {e}")
        return None

print(parse_config({"host": "localhost", "port": "5432"}))
# {'host': 'localhost', 'port': 5432, 'timeout': 30.0}

print(parse_config({"port": "abc"}))
# Config error: 'host'   (KeyError hits first)

# --- Raising exceptions ---
def validate_age(age):
    """Validate that age is a reasonable value."""
    if not isinstance(age, (int, float)):
        raise TypeError(f"Age must be a number, got {type(age).__name__}")
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if age > 150:
        raise ValueError(f"Age seems unrealistic: {age}")
    return int(age)

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation failed: {e}")
# Validation failed: Age cannot be negative: -5

# --- Custom exceptions ---
class ApplicationError(Exception):
    """Base exception for our application."""
    pass

class ValidationError(ApplicationError):
    """Raised when input validation fails."""
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"Validation error on '{field}': {message}")

class NotFoundError(ApplicationError):
    """Raised when a resource is not found."""
    def __init__(self, resource_type, resource_id):
        self.resource_type = resource_type
        self.resource_id = resource_id
        super().__init__(f"{resource_type} with id '{resource_id}' not found")

# Using custom exceptions
def get_user(user_id):
    users = {"1": "Alice", "2": "Bob"}
    if not isinstance(user_id, str):
        raise ValidationError("user_id", "must be a string")
    if user_id not in users:
        raise NotFoundError("User", user_id)
    return users[user_id]

try:
    user = get_user("99")
except NotFoundError as e:
    print(f"Not found: {e}")
    print(f"  Resource: {e.resource_type}, ID: {e.resource_id}")
except ApplicationError as e:
    print(f"App error: {e}")
# Not found: User with id '99' not found
#   Resource: User, ID: 99

# --- Exception chaining ---
def load_config(path):
    """Load config, wrapping low-level exceptions."""
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError as e:
        raise ApplicationError(f"Config not available: {path}") from e

try:
    load_config("missing.yaml")
except ApplicationError as e:
    print(f"Error: {e}")
    print(f"  Caused by: {e.__cause__}")
# Error: Config not available: missing.yaml
#   Caused by: [Errno 2] No such file or directory: 'missing.yaml'

# --- Practical pattern: retry with backoff ---
import time
import random

def unreliable_api_call():
    """Simulate an API that fails 70% of the time."""
    if random.random() < 0.7:
        raise ConnectionError("Server unavailable")
    return {"status": "ok", "data": [1, 2, 3]}

def retry(func, max_retries=3, base_delay=0.1):
    """Retry a function with exponential backoff."""
    for attempt in range(1, max_retries + 1):
        try:
            return func()
        except ConnectionError as e:
            if attempt == max_retries:
                raise  # Re-raise on final attempt
            delay = base_delay * (2 ** (attempt - 1))
            print(f"  Attempt {attempt} failed: {e}. Retrying in {delay}s...")
            time.sleep(delay)

random.seed(42)
try:
    result = retry(unreliable_api_call, max_retries=5, base_delay=0.01)
    print(f"Success: {result}")
except ConnectionError:
    print("All retries exhausted")
\`\`\`

### Exercises

**1. Safe JSON file reader**
Write a function \`read_json_file(path)\` that reads a JSON file and handles \`FileNotFoundError\`, \`json.JSONDecodeError\`, and \`KeyError\` (when accessing a required \`"name"\` key) with specific error messages.

<details>
<summary>Hint</summary>

Import \`json\`. Use a \`try/except\` block with three separate \`except\` clauses. The \`json.JSONDecodeError\` is a subclass of \`ValueError\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import json
from pathlib import Path

def read_json_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data["name"]
    except FileNotFoundError:
        print(f"Error: file '{path}' not found")
    except json.JSONDecodeError as e:
        print(f"Error: invalid JSON — {e}")
    except KeyError:
        print("Error: required key 'name' missing from JSON")

# Test each case
Path("good.json").write_text('{"name": "Alice"}', encoding="utf-8")
Path("bad.json").write_text("not valid json", encoding="utf-8")
Path("nokey.json").write_text('{"age": 30}', encoding="utf-8")

print(read_json_file("good.json"))
read_json_file("missing.json")
read_json_file("bad.json")
read_json_file("nokey.json")

for f in ["good.json", "bad.json", "nokey.json"]:
    Path(f).unlink(missing_ok=True)
\`\`\`

Expected output:
\`\`\`
Alice
Error: file 'missing.json' not found
Error: invalid JSON — Expecting value: line 1 column 1 (char 0)
Error: required key 'name' missing from JSON
\`\`\`

</details>

**2. Banking exception hierarchy**
Create a custom exception hierarchy: \`BankError\` as the base, with \`InsufficientFundsError\`, \`AccountNotFoundError\`, and \`InvalidAmountError\` as subclasses. Write a \`withdraw(account, amount)\` function that raises the appropriate exception.

<details>
<summary>Hint</summary>

Each subclass calls \`super().__init__(message)\` with a descriptive message. The \`withdraw\` function checks: amount <= 0 raises \`InvalidAmountError\`; unknown account raises \`AccountNotFoundError\`; amount > balance raises \`InsufficientFundsError\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class BankError(Exception):
    pass

class InsufficientFundsError(BankError):
    def __init__(self, balance, amount):
        super().__init__(f"Cannot withdraw {amount}: balance is only {balance}")

class AccountNotFoundError(BankError):
    def __init__(self, account_id):
        super().__init__(f"Account '{account_id}' not found")

class InvalidAmountError(BankError):
    def __init__(self, amount):
        super().__init__(f"Amount must be positive, got {amount}")

accounts = {"ACC001": 500.0}

def withdraw(account_id, amount):
    if amount <= 0:
        raise InvalidAmountError(amount)
    if account_id not in accounts:
        raise AccountNotFoundError(account_id)
    if amount > accounts[account_id]:
        raise InsufficientFundsError(accounts[account_id], amount)
    accounts[account_id] -= amount
    return accounts[account_id]

for call in [("ACC001", -10), ("ACC999", 100), ("ACC001", 1000), ("ACC001", 200)]:
    try:
        balance = withdraw(*call)
        print(f"Withdrew {call[1]}, new balance: {balance}")
    except BankError as e:
        print(f"BankError: {e}")
\`\`\`

Expected output:
\`\`\`
BankError: Amount must be positive, got -10
BankError: Account 'ACC999' not found
BankError: Cannot withdraw 1000: balance is only 500.0
Withdrew 200, new balance: 300.0
\`\`\`

</details>

**3. Retry decorator**
Write a \`retry(max_attempts)\` decorator that wraps any function with retry logic, catching all \`Exception\` types and re-raising after the final attempt.

<details>
<summary>Hint</summary>

The outer function takes \`max_attempts\`, returns a \`decorator\` function, which takes \`func\` and returns a \`wrapper\`. Use \`functools.wraps(func)\` to preserve the original function's metadata.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import functools

def retry(max_attempts=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}. Retrying...")
        return wrapper
    return decorator

call_count = 0

@retry(max_attempts=3)
def flaky():
    global call_count
    call_count += 1
    if call_count < 3:
        raise ValueError("not ready yet")
    return "success"

print(flaky())
\`\`\`

Expected output:
\`\`\`
Attempt 1 failed: not ready yet. Retrying...
Attempt 2 failed: not ready yet. Retrying...
success
\`\`\`

</details>

**4. safe_get**
Implement \`safe_get(d, key, default=None)\` that returns \`d[key]\` if the key exists, or \`default\` otherwise, without ever raising an exception. Test it with a missing key.

<details>
<summary>Hint</summary>

Use \`dict.get()\` — it already does exactly this. Alternatively wrap the lookup in a \`try/except KeyError\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
def safe_get(d, key, default=None):
    return d.get(key, default)

config = {"host": "localhost", "port": 5432}
print(safe_get(config, "host"))
print(safe_get(config, "timeout", 30))
print(safe_get(config, "password"))
\`\`\`

Expected output:
\`\`\`
localhost
30
None
\`\`\`

</details>

**Why it matters:** Robust error handling is the difference between a program that crashes mysteriously and one that fails gracefully with clear messages. In production systems, proper exception handling is critical for reliability and debugging.

> **Role connection:** Backend Developers handle HTTP errors and database exceptions. DevOps Engineers write scripts that must handle network failures and missing resources gracefully.

---

## Summary

You have now covered the eight foundational pillars of Python:

| Topic | Key Takeaway |
|-------|-------------|
| Variables & Data Types | Everything is an object; use \`isinstance()\` for type checks |
| Control Flow | Indentation defines blocks; \`for/else\` and \`while/else\` are unique to Python |
| Functions | First-class objects; understand \`*args\` and \`**kwargs\` |
| Data Structures | Choose the right structure for the job (list vs set vs dict) |
| String Manipulation | f-strings are fast and readable; regex for complex patterns |
| File I/O | Always use \`with\` statements; prefer \`pathlib\` for paths |
| Modules & Imports | Virtual environments isolate dependencies; explore the standard library |
| Error Handling | Catch specific exceptions; create custom exception hierarchies |

Move on to the **Mid** level when you are comfortable writing Python scripts that combine these concepts.

---

## Recommended Videos — Beginner

- **Programming with Mosh** — "Python Full Course for Beginners" — https://www.youtube.com/watch?v=_uQrJ0TkZlc

> The Mosh full-course video is a particularly solid companion to this guide: it covers variables, control flow, functions, and data structures with clear worked examples that mirror the concepts above.
`,
  mid: `# Python – Mid-Level Deep Dive

Writing Python that works is the beginner goal. Writing Python that other engineers want to maintain, extend, and test is the intermediate goal. This guide bridges that gap. You will move from writing scripts to designing systems — learning how objects collaborate, how decorators transform behaviour, how generators stream data without exhausting memory, and how type hints make your intentions machine-verifiable. By the end you will have the toolkit to contribute confidently to professional Python codebases.

## What you will learn

- Design class hierarchies with inheritance, abstract base classes, and dunder methods
- Write and chain decorators to add cross-cutting behaviour without modifying original functions
- Build memory-efficient pipelines using generators and the \`yield\` keyword
- Manage resources safely with context managers and the \`with\` statement
- Flatten complex data transformations into readable comprehensions
- Annotate code with type hints and validate them with static analysers
- Structure test suites with pytest: fixtures, parametrize, and mocking
- Extract structured data from text using regular expressions

---

## 1. Object-Oriented Programming

Object-Oriented Programming (OOP) in Python is built on classes, which serve as blueprints for creating objects. Python's OOP model is flexible and dynamic compared to statically typed languages.

### Classes and Instances

A class defines attributes (data) and methods (behavior). When you call a class, Python creates an instance of that class. The \`self\` parameter refers to the specific instance.

### Inheritance and Composition

Inheritance lets a class reuse and extend another class. Composition (having objects contain other objects) is often preferred over deep inheritance hierarchies.

### Dunder (Magic) Methods

Dunder methods (double underscore, e.g., \`__init__\`, \`__repr__\`) let your classes integrate with Python's built-in operations like \`len()\`, \`str()\`, \`==\`, \`+\`, iteration, and more.

\`\`\`python
# =============================================================
# Object-Oriented Programming – Comprehensive Example
# =============================================================

from functools import total_ordering
from abc import ABC, abstractmethod

# --- Basic class ---
class BankAccount:
    """A simple bank account with deposit/withdraw operations."""

    # Class variable: shared across all instances
    interest_rate = 0.02

    def __init__(self, owner, balance=0.0):
        """Initialize account with owner name and optional balance."""
        self.owner = owner            # Instance variable
        self._balance = balance       # Convention: _ means "protected"
        self._transactions = []       # Transaction history

    # --- Property: controlled access to _balance ---
    @property
    def balance(self):
        """Read-only access to balance."""
        return self._balance

    # --- Instance methods ---
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount
        self._transactions.append(("deposit", amount))
        return self

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        self._transactions.append(("withdraw", amount))
        return self

    def apply_interest(self):
        interest = self._balance * self.interest_rate
        self.deposit(interest)
        return self

    # --- Dunder methods ---
    def __repr__(self):
        """Unambiguous representation for developers."""
        return f"BankAccount(owner={self.owner!r}, balance={self._balance:.2f})"

    def __str__(self):
        """Human-readable representation."""
        return f"{self.owner}'s account: \${self._balance:,.2f}"

    def __len__(self):
        """Number of transactions."""
        return len(self._transactions)

    def __eq__(self, other):
        if not isinstance(other, BankAccount):
            return NotImplemented
        return self.owner == other.owner and self._balance == other._balance

    def __hash__(self):
        return hash((self.owner, self._balance))

    def __iter__(self):
        """Iterate over transactions."""
        return iter(self._transactions)

    def __contains__(self, item):
        """Support 'in' operator for transaction types."""
        return any(t[0] == item for t in self._transactions)


# Using the class
account = BankAccount("Alice", 1000)
account.deposit(500).withdraw(200)  # Method chaining
print(account)                       # Alice's account: $1,300.00
print(repr(account))                 # BankAccount(owner='Alice', balance=1300.00)
print(f"Transactions: {len(account)}")  # Transactions: 2
print(f"Has deposits: {'deposit' in account}")  # Has deposits: True

for txn_type, amount in account:
    print(f"  {txn_type}: \${amount:.2f}")
#   deposit: $500.00
#   withdraw: $200.00


# --- Inheritance ---
class SavingsAccount(BankAccount):
    """Savings account with higher interest and withdrawal limits."""

    interest_rate = 0.05  # Override class variable
    MAX_WITHDRAWALS_PER_MONTH = 6

    def __init__(self, owner, balance=0.0):
        super().__init__(owner, balance)
        self._monthly_withdrawals = 0

    def withdraw(self, amount):
        if self._monthly_withdrawals >= self.MAX_WITHDRAWALS_PER_MONTH:
            raise ValueError("Monthly withdrawal limit reached")
        self._monthly_withdrawals += 1
        return super().withdraw(amount)

    def reset_monthly_count(self):
        self._monthly_withdrawals = 0


savings = SavingsAccount("Bob", 5000)
savings.deposit(1000)
savings.apply_interest()  # Uses 5% rate
print(savings)  # Bob's account: $6,300.00


# --- Abstract Base Class ---
class Shape(ABC):
    """Abstract base class for geometric shapes."""

    @abstractmethod
    def area(self) -> float:
        """Calculate the area."""
        pass

    @abstractmethod
    def perimeter(self) -> float:
        """Calculate the perimeter."""
        pass

    def describe(self):
        return f"{self.__class__.__name__}: area={self.area():.2f}, perimeter={self.perimeter():.2f}"


@total_ordering
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        from math import pi
        return pi * self.radius ** 2

    def perimeter(self):
        from math import pi
        return 2 * pi * self.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)


# Polymorphism in action
shapes = [Circle(5), Rectangle(4, 6), Circle(3)]
for shape in shapes:
    print(f"  {shape.describe()}")
#   Circle: area=78.54, perimeter=31.42
#   Rectangle: area=24.00, perimeter=20.00
#   Circle: area=28.27, perimeter=18.85

# Sorting works thanks to @total_ordering and __eq__/__lt__
circles = [Circle(5), Circle(2), Circle(8), Circle(1)]
print(f"Sorted circles: {[c.radius for c in sorted(circles)]}")
# Sorted circles: [1, 2, 5, 8]
\`\`\`

### Exercises

**1. Merge accounts with __add__**
Add a \`__add__\` method to \`BankAccount\` that creates a new account whose owner is \`"owner_a + owner_b"\` and whose balance is the sum of both balances.

<details>
<summary>Hint</summary>

The method signature is \`def __add__(self, other)\`. Check \`isinstance(other, BankAccount)\` and return \`BankAccount(combined_owner, combined_balance)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from abc import ABC, abstractmethod

class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        self._balance += amount
        return self

    def __str__(self):
        return f"{self.owner}'s account: \${self._balance:,.2f}"

    def __add__(self, other):
        if not isinstance(other, BankAccount):
            return NotImplemented
        return BankAccount(
            f"{self.owner} + {other.owner}",
            self._balance + other._balance
        )

a = BankAccount("Alice", 1000)
b = BankAccount("Bob", 500)
merged = a + b
print(merged)
\`\`\`

Expected output:
\`\`\`
Alice + Bob's account: $1,500.00
\`\`\`

</details>

**2. CheckingAccount with overdraft**
Create a \`CheckingAccount\` subclass of \`BankAccount\` that accepts an \`overdraft_limit\` parameter. Override \`withdraw\` so that the balance may go negative down to \`-overdraft_limit\`.

<details>
<summary>Hint</summary>

Call \`super().__init__()\` in \`__init__\`. In the overridden \`withdraw\`, check \`amount > self._balance + self.overdraft_limit\` instead of \`amount > self._balance\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self._balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        return self

    def __str__(self):
        return f"{self.owner}'s account: \${self._balance:,.2f}"

class CheckingAccount(BankAccount):
    def __init__(self, owner, balance=0.0, overdraft_limit=100.0):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self._balance + self.overdraft_limit:
            raise ValueError("Exceeds overdraft limit")
        self._balance -= amount
        return self

acc = CheckingAccount("Alice", 50.0, overdraft_limit=100.0)
acc.withdraw(120)
print(acc)
\`\`\`

Expected output:
\`\`\`
Alice's account: $-70.00
\`\`\`

</details>

**3. Triangle with validation**
Implement a \`Triangle\` shape class that accepts three side lengths. Raise \`ValueError\` in \`__init__\` if the sides do not satisfy the triangle inequality (the sum of any two sides must exceed the third).

<details>
<summary>Hint</summary>

Check all three combinations: \`a + b > c\`, \`a + c > b\`, \`b + c > a\`. The area can be computed with Heron's formula: \`s = (a+b+c)/2\`, \`area = sqrt(s*(s-a)*(s-b)*(s-c))\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self): pass
    @abstractmethod
    def perimeter(self): pass
    def describe(self):
        return f"{self.__class__.__name__}: area={self.area():.2f}, perimeter={self.perimeter():.2f}"

class Triangle(Shape):
    def __init__(self, a, b, c):
        if not (a + b > c and a + c > b and b + c > a):
            raise ValueError(f"Invalid triangle sides: {a}, {b}, {c}")
        self.a, self.b, self.c = a, b, c

    def area(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

    def perimeter(self):
        return self.a + self.b + self.c

t = Triangle(3, 4, 5)
print(t.describe())

try:
    Triangle(1, 2, 10)
except ValueError as e:
    print(e)
\`\`\`

Expected output:
\`\`\`
Triangle: area=6.00, perimeter=12.00
Invalid triangle sides: 1, 2, 10
\`\`\`

</details>

**4. classmethod from dict**
Add a \`@classmethod\` named \`from_dict\` to \`BankAccount\` that creates an account from a dict with keys \`"owner"\` and \`"balance"\`.

<details>
<summary>Hint</summary>

Decorate with \`@classmethod\`. The first parameter is \`cls\` instead of \`self\`. Return \`cls(data["owner"], data["balance"])\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self._balance = balance

    @classmethod
    def from_dict(cls, data):
        return cls(data["owner"], data["balance"])

    def __str__(self):
        return f"{self.owner}'s account: \${self._balance:,.2f}"

data = {"owner": "Alice", "balance": 1500.0}
account = BankAccount.from_dict(data)
print(account)
\`\`\`

Expected output:
\`\`\`
Alice's account: $1,500.00
\`\`\`

</details>

**Best practice:** For data-holding classes, prefer \`@dataclass\` (shown in the Type Hints section) over manually writing \`__init__\`, \`__repr__\`, and \`__eq__\`. Dataclasses generate these methods automatically and integrate well with type hints.

**Why it matters:** OOP is the dominant paradigm for structuring large applications. Understanding classes, inheritance, and dunder methods lets you write Pythonic code that integrates naturally with the language.

\`\`\`mermaid
classDiagram
    class Shape {
        <<abstract>>
        +area() float
        +perimeter() float
        +describe() str
    }
    class Circle {
        +radius: float
        +area() float
        +perimeter() float
    }
    class Rectangle {
        +width: float
        +height: float
        +area() float
        +perimeter() float
    }
    Shape <|-- Circle
    Shape <|-- Rectangle
\`\`\`

> **Role connection:** Backend Developers structure domain models with classes. Data Engineers build data pipeline components as reusable class hierarchies.

---

## 2. Decorators

Decorators are functions that modify the behavior of other functions or classes. They are one of Python's most powerful metaprogramming features, enabling clean separation of concerns like logging, timing, authentication, and caching.

### How Decorators Work

A decorator is simply a function that takes a function as input and returns a new function. The \`@decorator\` syntax is syntactic sugar for \`func = decorator(func)\`.

### Decorator Chain Execution

\`\`\`mermaid
flowchart TB
    A["@log_calls"] --> B["@timer"]
    B --> C["@validate"]
    C --> D["def my_function"]
    D --> E["Call my_function"]
    E --> F["log_calls wrapper runs first"]
    F --> G["timer wrapper runs second"]
    G --> H["validate wrapper runs third"]
    H --> I["Original function executes"]
    I --> J["validate returns"]
    J --> K["timer records duration"]
    K --> L["log_calls logs result"]
\`\`\`

\`\`\`python
# =============================================================
# Decorators – Comprehensive Example
# =============================================================

import functools
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Basic decorator ---
def log_calls(func):
    """Log every call to the decorated function."""
    @functools.wraps(func)  # Preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        logger.info(f"Calling {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        logger.info(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    """Add two numbers."""
    return a + b

print(add(3, 4))              # 7 (also logs the call and return via logger)
print(f"Name: {add.__name__}")  # Name: add
print(f"Doc: {add.__doc__}")    # Doc: Add two numbers.


# --- Decorator with parameters ---
def retry(max_attempts=3, exceptions=(Exception,)):
    """Retry a function up to max_attempts times on specified exceptions."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    logger.warning(
                        f"{func.__name__} attempt {attempt}/{max_attempts} "
                        f"failed: {e}"
                    )
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, exceptions=(ConnectionError, TimeoutError))
def fetch_data(url):
    """Simulate fetching data from a URL."""
    import random
    if random.random() < 0.6:
        raise ConnectionError("Server unavailable")
    return {"status": "ok", "url": url}


# --- Timing decorator ---
def timer(func):
    """Measure and print execution time."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"  {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_operation():
    """Simulate a slow operation."""
    total = sum(i ** 2 for i in range(1_000_000))
    return total

slow_operation()  # slow_operation took 0.XXXX s


# --- Memoization decorator ---
def memoize(func):
    """Cache function results based on arguments."""
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    wrapper.cache = cache  # Expose cache for inspection
    return wrapper

@memoize
def fibonacci(n):
    """Calculate nth Fibonacci number recursively."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"fib(30) = {fibonacci(30)}")  # fib(30) = 832040
print(f"Cache size: {len(fibonacci.cache)}")  # Cache size: 31

# Note: In production, use @functools.lru_cache instead:
# @functools.lru_cache(maxsize=128)


# --- Class decorator ---
def singleton(cls):
    """Ensure only one instance of a class exists."""
    instances = {}
    @functools.wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class DatabaseConnection:
    def __init__(self, host="localhost", port=5432):
        self.host = host
        self.port = port
        print(f"  Connecting to {host}:{port}")

# Both variables point to the same instance
conn1 = DatabaseConnection()  # Connecting to localhost:5432
conn2 = DatabaseConnection()  # (no output — same instance returned)
print(f"Same instance: {conn1 is conn2}")  # Same instance: True


# --- Stacking decorators ---
@log_calls
@timer
def process_data(items):
    """Process a list of items."""
    return [item * 2 for item in items]

process_data([1, 2, 3, 4, 5])
# @timer runs first (innermost), then @log_calls wraps the timed version


# --- Decorator that works with or without arguments ---
def validate_types(*types):
    """Validate argument types for a function."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for arg, expected_type in zip(args, types):
                if not isinstance(arg, expected_type):
                    raise TypeError(
                        f"Expected {expected_type.__name__}, "
                        f"got {type(arg).__name__}"
                    )
            return func(*args, **kwargs)
        return wrapper
    return decorator

@validate_types(str, int)
def repeat_string(text, times):
    return text * times

print(repeat_string("hello ", 3))  # hello hello hello
# repeat_string(42, 3)  # Would raise TypeError
\`\`\`

### Exercises

**1. @require_auth decorator**
Write a \`@require_auth\` decorator that checks whether a \`user\` keyword argument is provided. If not, raise \`PermissionError("Authentication required")\`.

<details>
<summary>Hint</summary>

Inside the wrapper, check \`if "user" not in kwargs\` and raise \`PermissionError\`. Use \`functools.wraps\` to preserve the original function's metadata.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import functools

def require_auth(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if "user" not in kwargs:
            raise PermissionError("Authentication required")
        return func(*args, **kwargs)
    return wrapper

@require_auth
def get_secret(user=None):
    return f"Secret data for {user}"

print(get_secret(user="Alice"))

try:
    get_secret()
except PermissionError as e:
    print(e)
\`\`\`

Expected output:
\`\`\`
Secret data for Alice
Authentication required
\`\`\`

</details>

**2. @deprecated decorator**
Write a \`@deprecated(message)\` decorator that prints a deprecation warning every time the decorated function is called, then calls the original function.

<details>
<summary>Hint</summary>

This is a parameterized decorator: the outer function takes \`message\`, returns a \`decorator\`, which takes \`func\` and returns a \`wrapper\`. Inside the wrapper, \`print(f"DeprecationWarning: {message}")\` before calling \`func\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import functools

def deprecated(message):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(f"DeprecationWarning: {message}")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@deprecated("Use new_function() instead")
def old_function(x):
    return x * 2

print(old_function(5))
\`\`\`

Expected output:
\`\`\`
DeprecationWarning: Use new_function() instead
10
\`\`\`

</details>

**3. Class-based invocation counter**
Write a class-based decorator (using \`__call__\`) that counts how many times the decorated function has been invoked. Expose the count via a \`count\` attribute on the wrapper.

<details>
<summary>Hint</summary>

Create a class that stores the wrapped function in \`__init__\` and implements \`__call__\`. Increment \`self.count\` each time \`__call__\` is invoked. Use \`functools.wraps\` via \`functools.update_wrapper(self, func)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import functools

class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        return self.func(*args, **kwargs)

@CountCalls
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
print(greet("Bob"))
print(greet("Carol"))
print(f"Called {greet.count} times")
\`\`\`

Expected output:
\`\`\`
Hello, Alice!
Hello, Bob!
Hello, Carol!
Called 3 times
\`\`\`

</details>

**4. @rate_limit decorator**
Write a \`@rate_limit(calls, period)\` decorator that raises \`RuntimeError\` if the function is called more than \`calls\` times within \`period\` seconds. Use \`time.time()\` for timestamps.

<details>
<summary>Hint</summary>

Store a list of timestamps in a closure. On each call, filter the list to keep only timestamps within the last \`period\` seconds. If \`len(timestamps) >= calls\`, raise \`RuntimeError\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import functools
import time

def rate_limit(calls, period):
    def decorator(func):
        timestamps = []
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            # Remove timestamps outside the window
            while timestamps and now - timestamps[0] >= period:
                timestamps.pop(0)
            if len(timestamps) >= calls:
                raise RuntimeError(f"Rate limit exceeded: {calls} calls per {period}s")
            timestamps.append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@rate_limit(calls=3, period=60)
def send_message(msg):
    print(f"Sent: {msg}")

send_message("hi")
send_message("hello")
send_message("hey")
try:
    send_message("one too many")
except RuntimeError as e:
    print(e)
\`\`\`

Expected output:
\`\`\`
Sent: hi
Sent: hello
Sent: hey
Rate limit exceeded: 3 calls per 60s
\`\`\`

</details>

**Why it matters:** Decorators enable clean separation of cross-cutting concerns. Instead of littering business logic with logging, timing, or auth checks, you wrap them cleanly with decorators.

> **Role connection:** Backend Developers use decorators for route handlers and middleware. AI Engineers use them for caching model predictions. DevOps Engineers use them for retry logic in automation scripts.

---

## 3. Generators & Iterators

Generators are functions that produce a sequence of values lazily -- they yield one value at a time and only compute the next value when asked. This makes them memory-efficient for processing large datasets.

### The Iterator Protocol

Any object that implements \`__iter__()\` and \`__next__()\` is an iterator. Generators automatically implement this protocol.

\`\`\`python
# =============================================================
# Generators & Iterators – Comprehensive Example
# =============================================================

import itertools
from collections.abc import Iterator

# --- Basic generator ---
def countdown(n):
    """Yield numbers from n down to 1."""
    print(f"Starting countdown from {n}")
    while n > 0:
        yield n
        n -= 1
    print("Countdown complete!")

# Generators are lazy – nothing runs until you iterate
gen = countdown(5)
print(type(gen))         # <class 'generator'>
print(next(gen))         # Starting countdown from 5\n5
print(next(gen))         # 4

# Consume the rest with a for loop
for num in gen:
    print(f"  {num}")    # 3, 2, 1, then "Countdown complete!"


# --- Generator for large data processing ---
def read_large_file(file_path):
    """Read a file line by line without loading it all into memory."""
    with open(file_path, "r") as f:
        for line in f:
            yield line.strip()

# Process millions of lines using constant memory:
# for line in read_large_file("huge_file.txt"):
#     process(line)


# --- Generator expressions ---
# Like list comprehensions, but lazy (use parentheses instead of brackets)
squares_gen = (x ** 2 for x in range(1_000_000))
print(f"Type: {type(squares_gen)}")  # Type: <class 'generator'>

# Memory comparison
import sys
squares_list = [x ** 2 for x in range(1_000)]
squares_gen = (x ** 2 for x in range(1_000))
print(f"List size: {sys.getsizeof(squares_list)} bytes")
print(f"Generator size: {sys.getsizeof(squares_gen)} bytes")  # ~200 bytes always


# --- Chaining generators (pipeline pattern) ---
def parse_lines(lines):
    """Parse each line as a comma-separated record."""
    for line in lines:
        yield line.split(",")

def filter_active(records):
    """Keep only active records (third field is 'active')."""
    for record in records:
        if len(record) >= 3 and record[2].strip().lower() == "active":
            yield record

def format_output(records):
    """Format records for display."""
    for record in records:
        yield f"{record[0].strip()} ({record[1].strip()})"

# Pipeline: each step processes one item at a time
raw_lines = [
    "Alice,Engineer,active",
    "Bob,Designer,inactive",
    "Charlie,Manager,active",
    "Diana,Developer,active"
]

pipeline = format_output(filter_active(parse_lines(raw_lines)))
for item in pipeline:
    print(f"  Active: {item}")
#   Active: Alice (Engineer)
#   Active: Charlie (Manager)
#   Active: Diana (Developer)


# --- yield from: delegating to sub-generators ---
def flatten(nested_list):
    """Recursively flatten a nested list."""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)  # Delegate to recursive call
        else:
            yield item

nested = [1, [2, 3], [4, [5, 6]], 7]
print(f"Flattened: {list(flatten(nested))}")  # Flattened: [1, 2, 3, 4, 5, 6, 7]


# --- Custom iterator class ---
class FibonacciIterator:
    """Infinite Fibonacci sequence iterator."""

    def __init__(self):
        self.a, self.b = 0, 1

    def __iter__(self):
        return self

    def __next__(self):
        value = self.a
        self.a, self.b = self.b, self.a + self.b
        return value

# Use itertools.islice to take a finite number from infinite iterator
fib = FibonacciIterator()
first_10 = list(itertools.islice(fib, 10))
print(f"First 10 Fibonacci: {first_10}")
# First 10 Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


# --- Useful itertools functions ---
# chain: concatenate iterables
combined = list(itertools.chain([1, 2], [3, 4], [5, 6]))
print(f"Chained: {combined}")  # Chained: [1, 2, 3, 4, 5, 6]

# groupby: group consecutive elements
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4), ("A", 5)]
data.sort(key=lambda x: x[0])  # Must be sorted first!
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(f"  {key}: {list(group)}")
#   A: [('A', 1), ('A', 2), ('A', 5)]
#   B: [('B', 3), ('B', 4)]

# accumulate: running totals
running_sum = list(itertools.accumulate([1, 2, 3, 4, 5]))
print(f"Running sum: {running_sum}")  # Running sum: [1, 3, 6, 10, 15]

# product: cartesian product
sizes = ["S", "M", "L"]
colors = ["red", "blue"]
variants = list(itertools.product(sizes, colors))
print(f"Variants: {variants}")
# Variants: [('S', 'red'), ('S', 'blue'), ('M', 'red'), ('M', 'blue'), ('L', 'red'), ('L', 'blue')]
\`\`\`

### Exercises

**1. Infinite prime generator**
Write a generator \`primes()\` that yields prime numbers infinitely. Use it to get the first 10 primes.

<details>
<summary>Hint</summary>

Start with candidate = 2 and loop forever. For each candidate, test divisibility up to \`int(candidate**0.5)\`. If prime, \`yield\` it. Use \`itertools.islice\` to take a finite number.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import itertools

def primes():
    candidate = 2
    while True:
        is_prime = all(candidate % d != 0 for d in range(2, int(candidate**0.5) + 1))
        if is_prime:
            yield candidate
        candidate += 1

first_10 = list(itertools.islice(primes(), 10))
print(first_10)
\`\`\`

Expected output:
\`\`\`
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
\`\`\`

</details>

**2. CSV parsing pipeline**
Create a pipeline of three generators: one that yields raw CSV-like strings, one that parses each into a list of fields, and one that filters to keep only rows where the second field (age) is greater than 25. Print the names of matching people.

<details>
<summary>Hint</summary>

Chain the generators: \`for name in format_name(filter_age(parse_csv(raw_data)))\`. Each generator \`yield\`s one processed item at a time.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
raw_data = [
    "Alice,30,Engineer",
    "Bob,22,Designer",
    "Charlie,35,Manager",
    "Diana,25,Developer",
]

def parse_csv(lines):
    for line in lines:
        yield line.split(",")

def filter_by_age(records, min_age):
    for record in records:
        if int(record[1]) > min_age:
            yield record

def format_name(records):
    for record in records:
        yield record[0]

pipeline = format_name(filter_by_age(parse_csv(raw_data), min_age=25))
for name in pipeline:
    print(name)
\`\`\`

Expected output:
\`\`\`
Alice
Charlie
\`\`\`

</details>

**3. Sliding window generator**
Implement a \`sliding_window(iterable, size)\` generator that yields overlapping tuples of the given size.

<details>
<summary>Hint</summary>

Use \`collections.deque(maxlen=size)\` to maintain the window. Yield \`tuple(window)\` once the deque is full (i.e. after the first \`size\` items).

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from collections import deque

def sliding_window(iterable, size):
    window = deque(maxlen=size)
    for item in iterable:
        window.append(item)
        if len(window) == size:
            yield tuple(window)

for w in sliding_window([1, 2, 3, 4, 5], 3):
    print(w)
\`\`\`

Expected output:
\`\`\`
(1, 2, 3)
(2, 3, 4)
(3, 4, 5)
\`\`\`

</details>

**4. Pairs summing to target**
Use \`itertools.combinations\` to find all pairs in \`[1, 3, 5, 7, 9, 11]\` that sum to 12. Print each pair.

<details>
<summary>Hint</summary>

\`itertools.combinations(numbers, 2)\` yields every 2-element combination. Filter with an \`if\` clause or a list comprehension.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import itertools

numbers = [1, 3, 5, 7, 9, 11]
pairs = [pair for pair in itertools.combinations(numbers, 2) if sum(pair) == 12]
for pair in pairs:
    print(pair)
\`\`\`

Expected output:
\`\`\`
(1, 11)
(3, 9)
(5, 7)
\`\`\`

</details>

**Why it matters:** Generators enable memory-efficient processing of large datasets. A pipeline of generators can process millions of records while only holding one record in memory at a time.

> **Role connection:** Data Engineers use generators for streaming ETL pipelines. Backend Developers use them for paginated API responses. AI Engineers use them for batch processing training data.

---

## 4. Context Managers

Context managers ensure that resources are properly acquired and released. The most common example is file handling with \`with\`, but context managers are useful for database connections, locks, temporary state changes, and more.

### The Protocol

A context manager implements \`__enter__()\` (called when entering the \`with\` block) and \`__exit__()\` (called when leaving, even if an exception occurred).

\`\`\`python
# =============================================================
# Context Managers – Comprehensive Example
# =============================================================

import time
import contextlib
import tempfile
import os
from pathlib import Path

# --- Class-based context manager ---
class Timer:
    """Measure elapsed time for a code block."""

    def __init__(self, label="Block"):
        self.label = label
        self.elapsed = 0.0

    def __enter__(self):
        self.start = time.perf_counter()
        return self  # This is what 'as' binds to

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"  {self.label}: {self.elapsed:.4f}s")
        return False  # Don't suppress exceptions

with Timer("Summation") as t:
    total = sum(range(1_000_000))
print(f"Elapsed was: {t.elapsed:.4f}s")
#   Summation: 0.XXXX s
# Elapsed was: 0.XXXX s


# --- Context manager with exception handling ---
class DatabaseTransaction:
    """Simulate a database transaction with commit/rollback."""

    def __init__(self, connection_name):
        self.connection_name = connection_name
        self.committed = False

    def __enter__(self):
        print(f"  BEGIN TRANSACTION on {self.connection_name}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print(f"  ROLLBACK on {self.connection_name}: {exc_val}")
            return True  # Suppress the exception
        print(f"  COMMIT on {self.connection_name}")
        self.committed = True
        return False

# Successful transaction
with DatabaseTransaction("main_db") as txn:
    print("  Inserting records...")
#   BEGIN TRANSACTION on main_db
#   Inserting records...
#   COMMIT on main_db

# Failed transaction (exception is suppressed)
with DatabaseTransaction("main_db") as txn:
    print("  Updating records...")
    raise ValueError("Constraint violation")
print("  Continued after rollback")
#   BEGIN TRANSACTION on main_db
#   Updating records...
#   ROLLBACK on main_db: Constraint violation
#   Continued after rollback


# --- contextlib.contextmanager: generator-based context managers ---
@contextlib.contextmanager
def temporary_directory():
    """Create a temp directory and clean it up afterward."""
    dir_path = tempfile.mkdtemp()
    print(f"  Created temp dir: {dir_path}")
    try:
        yield dir_path  # Everything before yield is __enter__
    finally:
        # Everything after yield is __exit__
        import shutil
        shutil.rmtree(dir_path, ignore_errors=True)
        print(f"  Cleaned up temp dir")

with temporary_directory() as tmp:
    # Use the temporary directory
    file_path = Path(tmp) / "test.txt"
    file_path.write_text("temporary data")
    print(f"  File exists: {file_path.exists()}")
# Directory is cleaned up here
#   Created temp dir: /tmp/tmpXXXXXX
#   File exists: True
#   Cleaned up temp dir


# --- Practical: redirect stdout ---
@contextlib.contextmanager
def capture_output():
    """Capture stdout to a string."""
    import io
    old_stdout = __import__("sys").stdout
    new_stdout = io.StringIO()
    __import__("sys").stdout = new_stdout
    try:
        yield new_stdout
    finally:
        __import__("sys").stdout = old_stdout

with capture_output() as output:
    print("This is captured")
    print("So is this")
captured = output.getvalue()
print(f"Captured {len(captured)} characters")
# Captured 32 characters


# --- contextlib.suppress: ignore specific exceptions ---
with contextlib.suppress(FileNotFoundError):
    os.remove("nonexistent_file.txt")
    # No error raised, silently suppressed


# --- Nested context managers ---
@contextlib.contextmanager
def managed_resource(name):
    print(f"  Acquiring {name}")
    try:
        yield name
    finally:
        print(f"  Releasing {name}")

# Compatible with all versions using contextlib.ExitStack
with contextlib.ExitStack() as stack:
    a = stack.enter_context(managed_resource("A"))
    b = stack.enter_context(managed_resource("B"))
    c = stack.enter_context(managed_resource("C"))
    print(f"  Using {a}, {b}, {c}")
# All released in reverse order
#   Acquiring A
#   Acquiring B
#   Acquiring C
#   Using A, B, C
#   Releasing C
#   Releasing B
#   Releasing A
\`\`\`

### Exercises

**1. Change directory context manager**
Write a context manager \`change_dir(path)\` that changes the working directory to \`path\` on entry and restores the original directory on exit.

<details>
<summary>Hint</summary>

Use \`os.getcwd()\` to save the original directory before changing. Put the restore call in a \`finally\` block (or in the \`__exit__\` method). Use \`@contextlib.contextmanager\` for simplicity.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import os
import contextlib
from pathlib import Path

@contextlib.contextmanager
def change_dir(path):
    original = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(original)

tmp = Path("/tmp")
print(f"Before: {os.getcwd()}")
with change_dir(tmp):
    print(f"Inside: {os.getcwd()}")
print(f"After: {os.getcwd()}")
\`\`\`

Expected output (paths will differ on your system):
\`\`\`
Before: /your/original/directory
Inside: /tmp
After: /your/original/directory
\`\`\`

</details>

**2. Environment variable context manager**
Write a \`@contextlib.contextmanager\` named \`set_env(key, value)\` that sets an environment variable on entry and removes it on exit (restoring the original value if one existed).

<details>
<summary>Hint</summary>

Save \`os.environ.get(key)\` before setting. In the \`finally\` block, either \`del os.environ[key]\` or restore the original value if it was not \`None\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import os
import contextlib

@contextlib.contextmanager
def set_env(key, value):
    original = os.environ.get(key)
    os.environ[key] = value
    try:
        yield
    finally:
        if original is None:
            del os.environ[key]
        else:
            os.environ[key] = original

print(os.environ.get("MY_VAR"))  # None
with set_env("MY_VAR", "hello"):
    print(os.environ.get("MY_VAR"))  # hello
print(os.environ.get("MY_VAR"))  # None
\`\`\`

Expected output:
\`\`\`
None
hello
None
\`\`\`

</details>

**3. JSON file context manager**
Write a \`@contextlib.contextmanager\` that opens a JSON file, yields a parsed dict, and writes the (possibly modified) dict back to the file on exit.

<details>
<summary>Hint</summary>

Open and \`json.load\` before the \`yield\`. After the \`yield\` (in \`finally\`), open the file again for writing and call \`json.dump\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import json
import contextlib
from pathlib import Path

@contextlib.contextmanager
def json_file(path):
    p = Path(path)
    data = json.loads(p.read_text()) if p.exists() else {}
    try:
        yield data
    finally:
        p.write_text(json.dumps(data, indent=2))

Path("settings.json").write_text('{"theme": "light"}')

with json_file("settings.json") as cfg:
    print(f"Before: {cfg}")
    cfg["theme"] = "dark"
    cfg["font_size"] = 14

with json_file("settings.json") as cfg:
    print(f"After: {cfg}")

Path("settings.json").unlink()
\`\`\`

Expected output:
\`\`\`
Before: {'theme': 'light'}
After: {'theme': 'dark', 'font_size': 14}
\`\`\`

</details>

**4. Dynamic file management with ExitStack**
Use \`contextlib.ExitStack\` to open a variable number of files at once and read their first lines.

<details>
<summary>Hint</summary>

Create a list of file paths. Use \`stack.enter_context(open(path))\` inside the \`with ExitStack() as stack:\` block to open each file and collect the handles in a list.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import contextlib
from pathlib import Path

# Create test files
for i in range(3):
    Path(f"file_{i}.txt").write_text(f"Line 1 of file {i}\\nLine 2\\n")

paths = [f"file_{i}.txt" for i in range(3)]
with contextlib.ExitStack() as stack:
    handles = [stack.enter_context(open(p)) for p in paths]
    for path, fh in zip(paths, handles):
        print(f"{path}: {fh.readline().strip()}")

for i in range(3):
    Path(f"file_{i}.txt").unlink()
\`\`\`

Expected output:
\`\`\`
file_0.txt: Line 1 of file 0
file_1.txt: Line 1 of file 1
file_2.txt: Line 1 of file 2
\`\`\`

</details>

**Why it matters:** Context managers prevent resource leaks by guaranteeing cleanup code runs. They make code more readable by clearly showing the scope in which a resource is active.

> **Role connection:** Backend Developers use context managers for database transactions. DevOps Engineers use them for temporary configuration changes. Data Engineers use them for managing connections to data sources.

---

## 5. Comprehensions Deep Dive

Comprehensions are concise, readable ways to create lists, dicts, and sets from iterables. Python also supports nested comprehensions and the walrus operator (\`:=\`) for assignment within expressions.

\`\`\`python
# =============================================================
# Comprehensions Deep Dive – Comprehensive Example
# =============================================================

import math
from pprint import pprint

# --- List comprehensions: beyond basics ---

# Nested comprehension: flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(f"Flattened: {flat}")
# Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Creating a matrix with comprehension
identity = [[1 if i == j else 0 for j in range(4)] for i in range(4)]
print("Identity matrix:")
for row in identity:
    print(f"  {row}")
#   [1, 0, 0, 0]
#   [0, 1, 0, 0]
#   [0, 0, 1, 0]
#   [0, 0, 0, 1]

# Multiple conditions — Pythagorean triples up to 100
results = [
    (x, y, int(math.sqrt(x ** 2 + y ** 2)))
    for x in range(1, 10)
    for y in range(x, 10)
    if math.sqrt(x ** 2 + y ** 2) == int(math.sqrt(x ** 2 + y ** 2))
    if x ** 2 + y ** 2 <= 100
]
print(f"Pythagorean triples: {results}")
# Pythagorean triples: [(3, 4, 5), (6, 8, 10)]

# Conditional expression in output
numbers = range(-5, 6)
labels = [f"{n} is {'positive' if n > 0 else 'zero' if n == 0 else 'negative'}"
          for n in numbers]
for label in labels:
    print(f"  {label}")
#   -5 is negative
#   -4 is negative
#   ...
#   0 is zero
#   1 is positive
#   ...


# --- Dict comprehensions ---
words = ["hello", "world", "python", "programming"]

# Word lengths
word_lengths = {word: len(word) for word in words}
print(f"Lengths: {word_lengths}")
# Lengths: {'hello': 5, 'world': 5, 'python': 6, 'programming': 11}

# Inverting a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(f"Inverted: {inverted}")  # Inverted: {1: 'a', 2: 'b', 3: 'c'}

# Filtering a dictionary
config = {"host": "localhost", "port": 5432, "debug": True,
          "password": "secret", "api_key": "abc123"}
safe_config = {k: v for k, v in config.items()
               if k not in ("password", "api_key")}
print(f"Safe config: {safe_config}")
# Safe config: {'host': 'localhost', 'port': 5432, 'debug': True}

# Grouping with dict comprehension
students = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
    {"name": "Diana", "grade": "B"},
    {"name": "Eve", "grade": "A"},
]
by_grade = {}
for s in students:
    by_grade.setdefault(s["grade"], []).append(s["name"])
print(f"By grade: {by_grade}")
# By grade: {'A': ['Alice', 'Charlie', 'Eve'], 'B': ['Bob', 'Diana']}


# --- Set comprehensions ---
text = "the quick brown fox jumps over the lazy dog"
unique_lengths = {len(word) for word in text.split()}
print(f"Unique word lengths: {sorted(unique_lengths)}")
# Unique word lengths: [2, 3, 4, 5]

# Finding common characters (output order varies — set is unordered)
word1 = "hello"
word2 = "world"
common = {c for c in word1 if c in word2}
print(f"Common chars: {sorted(common)}")  # sorted for stable display
# Common chars: ['l', 'o']


# --- Walrus operator (:=) – Python 3.8+ ---
# Assign and use a value in the same expression

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# With walrus operator:
results_new = [y for x in data if (y := x ** 2 + x) > 20]
print(f"Walrus results: {results_new}")
# Walrus results: [30, 42, 56, 72, 90, 110]

# Walrus in while loops
import io
content = "line1\\nline2\\nline3\\n"
reader = io.StringIO(content)
lines = []
while (line := reader.readline()):
    lines.append(line.strip())
print(f"Read lines: {lines}")
# Read lines: ['line1', 'line2', 'line3']

# Walrus with regex
import re
texts = ["user:alice@email.com", "invalid-entry", "user:bob@email.com"]
emails = [m.group(1) for text in texts if (m := re.search(r"user:(\\S+)", text))]
print(f"Emails: {emails}")
# Emails: ['alice@email.com', 'bob@email.com']
\`\`\`

### Exercises

**1. Transpose a matrix**
Transpose a 3×4 matrix using a nested list comprehension (swap rows and columns).

<details>
<summary>Hint</summary>

For an \`m×n\` matrix, the transpose is \`n×m\`. The element at \`[i][j]\` in the original becomes \`[j][i]\` in the transpose. Use \`[[matrix[r][c] for r in range(len(matrix))] for c in range(len(matrix[0]))]\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]

transposed = [[matrix[r][c] for r in range(len(matrix))] for c in range(len(matrix[0]))]
for row in transposed:
    print(row)
\`\`\`

Expected output:
\`\`\`
[1, 5, 9]
[2, 6, 10]
[3, 7, 11]
[4, 8, 12]
\`\`\`

</details>

**2. Character frequency map**
Build a dict comprehension that maps each unique character in \`"abracadabra"\` to its frequency.

<details>
<summary>Hint</summary>

Use \`{ch: text.count(ch) for ch in set(text)}\`. Sort the result by key for a stable display: \`dict(sorted(...))\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
text = "abracadabra"
freq = {ch: text.count(ch) for ch in set(text)}
print(dict(sorted(freq.items())))
\`\`\`

Expected output:
\`\`\`
{'a': 5, 'b': 2, 'c': 1, 'd': 1, 'r': 2}
\`\`\`

</details>

**3. Walrus running maximum**
Use the walrus operator inside a list comprehension to filter a list \`[3, 1, 4, 1, 5, 9, 2, 6, 5]\` to keep only values that are strictly greater than all previous values (i.e. running maximums).

<details>
<summary>Hint</summary>

Keep a mutable container (e.g. a single-element list) to hold the current maximum. Inside the comprehension, use \`:=\` to update it: \`if (mx := max(running_max[0], x)) > running_max[0]\` then update \`running_max[0]\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
data = [3, 1, 4, 1, 5, 9, 2, 6, 5]
running_max = [float("-inf")]

def update_max(x):
    if x > running_max[0]:
        running_max[0] = x
        return True
    return False

maximums = [x for x in data if update_max(x)]
print(maximums)
\`\`\`

Expected output:
\`\`\`
[3, 4, 5, 9]
\`\`\`

</details>

**4. Chess board positions**
Write a comprehension that generates all valid chess board positions from \`a1\` through \`h8\` as a list of strings.

<details>
<summary>Hint</summary>

Columns are letters \`a\` through \`h\`, rows are integers \`1\` through \`8\`. Use \`[col + str(row) for col in "abcdefgh" for row in range(1, 9)]\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
positions = [col + str(row) for col in "abcdefgh" for row in range(1, 9)]
print(len(positions))
print(positions[:8])
print(positions[-8:])
\`\`\`

Expected output:
\`\`\`
64
['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8']
\`\`\`

</details>

**Why it matters:** Comprehensions make code more readable and Pythonic. The walrus operator reduces code duplication in filtering patterns. Choosing between comprehensions and explicit loops is a key readability decision.

> **Role connection:** Data Scientists use comprehensions for data transformation. Backend Developers use dict comprehensions to reshape API responses.

---

## 6. Type Hints

Type hints (annotations) add optional type information to your code. They do not affect runtime behavior but enable static analysis tools like \`mypy\` to catch type errors before your code runs.

### The typing Module

The \`typing\` module provides generics, unions, optionals, and other advanced type constructs.

\`\`\`python
# =============================================================
# Type Hints – Comprehensive Example
# =============================================================

from typing import (
    Optional,       # Use X | None in 3.10+ instead
    Callable, Iterator, Generator, Any,
    TypeVar, Generic, Protocol, Literal,
    TypeAlias, overload,
)
# Note: List, Dict, Tuple, Set from typing are DEPRECATED since Python 3.9.
# Use the built-in lowercase versions: list, dict, tuple, set instead.
from dataclasses import dataclass, field
from datetime import datetime

# --- Basic type hints ---
def greet(name: str, excited: bool = False) -> str:
    """Greet a person by name."""
    greeting = f"Hello, {name}!"
    if excited:
        greeting = greeting.upper()
    return greeting

# Variable annotations
age: int = 30
pi: float = 3.14159
names: list[str] = ["Alice", "Bob"]  # Python 3.9+ lowercase generics

# --- Optional and Union ---
def find_user(user_id: int) -> dict | None:
    """Find a user by ID. Returns None if not found."""
    users = {1: {"name": "Alice"}, 2: {"name": "Bob"}}
    return users.get(user_id)

# Python 3.10+ union syntax with |
def process(value: int | str) -> str:
    """Accept either int or str."""
    return str(value)

# --- Collection types ---
def analyze_scores(scores: list[float]) -> dict[str, float]:
    """Analyze a list of scores."""
    return {
        "mean": sum(scores) / len(scores),
        "min": min(scores),
        "max": max(scores),
    }

# Tuple with specific element types
Point = tuple[float, float]
Color = tuple[int, int, int]

def distance(p1: Point, p2: Point) -> float:
    """Calculate distance between two points."""
    return ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2) ** 0.5

# --- Callable type ---
def apply_transform(
    data: list[int],
    transform: Callable[[int], int]
) -> list[int]:
    """Apply a transformation function to each element."""
    return [transform(x) for x in data]

doubled = apply_transform([1, 2, 3], lambda x: x * 2)
print(f"Doubled: {doubled}")  # Doubled: [2, 4, 6]


# --- TypeVar: generic functions ---
T = TypeVar("T")

def first(items: list[T]) -> T | None:
    """Return the first element or None."""
    return items[0] if items else None

# The return type matches the input type
name: str | None = first(["Alice", "Bob"])    # str
number: int | None = first([1, 2, 3])         # int

# --- PEP 695 (Python 3.12+): new type parameter syntax ---
# The modern way to write the same generic function:
#
#   def first[T](items: list[T]) -> T | None:
#       return items[0] if items else None
#
#   class Stack[T]:
#       def push(self, item: T) -> None: ...
#
#   type Vector = list[float]  # type alias (PEP 695)
#
# PEP 695 is cleaner and avoids the need for explicit TypeVar declarations.

# --- Dataclasses with type hints ---
@dataclass
class User:
    name: str
    email: str
    age: int
    roles: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    active: bool = True

    def is_admin(self) -> bool:
        return "admin" in self.roles

user = User(name="Alice", email="alice@example.com", age=30, roles=["admin"])
print(f"User: {user}")
print(f"Is admin: {user.is_admin()}")  # Is admin: True

# --- Generic classes ---
class Stack(Generic[T]):
    """A typed stack implementation."""

    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("Stack is empty")
        return self._items.pop()

    def peek(self) -> T | None:
        return self._items[-1] if self._items else None

    def __len__(self) -> int:
        return len(self._items)

int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
print(f"Popped: {int_stack.pop()}")  # Popped: 2

# --- Protocol: structural subtyping (duck typing with types) ---
class Renderable(Protocol):
    def render(self) -> str: ...

class HTMLWidget:
    def render(self) -> str:
        return "<div>Widget</div>"

class JSONResponse:
    def render(self) -> str:
        return '{"status": "ok"}'

def display(item: Renderable) -> None:
    """Accepts any object with a render() method."""
    print(item.render())

display(HTMLWidget())    # <div>Widget</div>
display(JSONResponse())  # {"status": "ok"}

# --- Literal types ---
def set_mode(mode: Literal["read", "write", "append"]) -> None:
    print(f"Mode set to: {mode}")

set_mode("read")   # Mode set to: read
# set_mode("delete")  # mypy would flag this

# --- Type aliases ---
JSON: TypeAlias = dict[str, Any]
Headers: TypeAlias = dict[str, str]

def fetch(url: str, headers: Headers) -> JSON:
    return {"url": url, "headers": headers}
\`\`\`

### Exercises

**1. Typed grouping function**
Add full type hints to a function \`group_by(items, key_fn)\` that takes a list of dicts and a key function, and returns a \`dict[str, list[dict]]\` grouping the items by the key function's return value.

<details>
<summary>Hint</summary>

The type signature is \`def group_by(items: list[dict], key_fn: Callable[[dict], str]) -> dict[str, list[dict]]\`. Use \`setdefault\` to build the groups.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from typing import Callable

def group_by(items: list[dict], key_fn: Callable[[dict], str]) -> dict[str, list[dict]]:
    groups: dict[str, list[dict]] = {}
    for item in items:
        key = key_fn(item)
        groups.setdefault(key, []).append(item)
    return groups

people = [
    {"name": "Alice", "dept": "Eng"},
    {"name": "Bob", "dept": "HR"},
    {"name": "Carol", "dept": "Eng"},
]
result = group_by(people, lambda p: p["dept"])
for dept, members in result.items():
    print(f"{dept}: {[m['name'] for m in members]}")
\`\`\`

Expected output:
\`\`\`
Eng: ['Alice', 'Carol']
HR: ['Bob']
\`\`\`

</details>

**2. Generic Cache class**
Create a generic \`Cache[K, V]\` class with \`get\`, \`set\`, and \`delete\` methods, fully typed.

<details>
<summary>Hint</summary>

Use \`TypeVar\` for \`K\` and \`V\`, then declare \`class Cache(Generic[K, V])\`. The internal store is \`dict[K, V]\`. The \`get\` method returns \`V | None\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from typing import TypeVar, Generic

K = TypeVar("K")
V = TypeVar("V")

class Cache(Generic[K, V]):
    def __init__(self) -> None:
        self._store: dict[K, V] = {}

    def set(self, key: K, value: V) -> None:
        self._store[key] = value

    def get(self, key: K) -> V | None:
        return self._store.get(key)

    def delete(self, key: K) -> None:
        self._store.pop(key, None)

cache: Cache[str, int] = Cache()
cache.set("score", 42)
print(cache.get("score"))
cache.delete("score")
print(cache.get("score"))
\`\`\`

Expected output:
\`\`\`
42
None
\`\`\`

</details>

**3. Repository Protocol**
Define a \`Repository\` Protocol with \`get(id: int)\`, \`save(entity: dict)\`, and \`delete(id: int)\` methods. Write a concrete \`InMemoryRepository\` class that satisfies it without inheriting from it.

<details>
<summary>Hint</summary>

Protocols use structural subtyping — a class satisfies a Protocol if it has the right methods, with no explicit inheritance needed. Import \`Protocol\` from \`typing\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from typing import Protocol

class Repository(Protocol):
    def get(self, id: int) -> dict | None: ...
    def save(self, entity: dict) -> None: ...
    def delete(self, id: int) -> None: ...

class InMemoryRepository:
    def __init__(self):
        self._store: dict[int, dict] = {}

    def get(self, id: int) -> dict | None:
        return self._store.get(id)

    def save(self, entity: dict) -> None:
        self._store[entity["id"]] = entity

    def delete(self, id: int) -> None:
        self._store.pop(id, None)

repo: Repository = InMemoryRepository()
repo.save({"id": 1, "name": "Alice"})
print(repo.get(1))
repo.delete(1)
print(repo.get(1))
\`\`\`

Expected output:
\`\`\`
{'id': 1, 'name': 'Alice'}
None
\`\`\`

</details>

**4. Run mypy**
Install mypy and run it on a typed Python file to verify there are no type errors. This exercise is run in the terminal.

<details>
<summary>Hint</summary>

Install with \`pip install mypy\` (or \`uv pip install mypy\`). Run \`mypy your_file.py\` — a clean run prints \`Success: no issues found\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Terminal commands (not Python):
# pip install mypy
# mypy your_file.py
#
# Example typed file to check (save as typed_example.py):

def add(a: int, b: int) -> int:
    return a + b

result: int = add(1, 2)
print(result)
# mypy typed_example.py  ->  Success: no issues found in 1 source file
\`\`\`

Expected output:
\`\`\`
3
\`\`\`

</details>

**Why it matters:** Type hints catch bugs before they reach production. They serve as living documentation and enable better IDE support with autocompletion and refactoring tools.

> **Role connection:** Backend Developers use type hints for API contracts. All developers benefit from mypy catching type errors in CI/CD pipelines.

---

## 7. Testing with pytest

Testing is essential for reliable software. \`pytest\` is the most popular Python testing framework, offering a simple syntax, powerful fixtures, and extensive plugin ecosystem.

\`\`\`python
# =============================================================
# Testing with pytest – Comprehensive Example
# =============================================================
# Save this as test_example.py and run: pytest test_example.py -v

import pytest
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime

# --- Code under test ---
class UserService:
    def __init__(self, db_client):
        self.db = db_client

    def get_user(self, user_id: int) -> dict:
        user = self.db.find_one({"id": user_id})
        if user is None:
            raise ValueError(f"User {user_id} not found")
        return user

    def create_user(self, name: str, email: str) -> dict:
        if not name or not email:
            raise ValueError("Name and email are required")
        if "@" not in email:
            raise ValueError("Invalid email format")
        user = {"name": name, "email": email, "created_at": datetime.now()}
        self.db.insert_one(user)
        return user

    def get_active_users(self) -> list:
        return list(self.db.find({"active": True}))


# --- Basic tests ---
class TestUserService:
    """Test suite for UserService."""

    # --- Fixtures: setup/teardown for tests ---
    @pytest.fixture
    def mock_db(self):
        """Create a mock database client."""
        db = Mock()
        db.find_one = Mock(return_value=None)
        db.insert_one = Mock()
        db.find = Mock(return_value=[])
        return db

    @pytest.fixture
    def service(self, mock_db):
        """Create a UserService with mocked dependencies."""
        return UserService(mock_db)

    @pytest.fixture
    def sample_user(self):
        """Sample user data for tests."""
        return {
            "id": 1,
            "name": "Alice",
            "email": "alice@example.com",
            "active": True
        }

    # --- Test methods ---
    def test_get_user_found(self, service, mock_db, sample_user):
        """Test getting an existing user."""
        mock_db.find_one.return_value = sample_user
        result = service.get_user(1)
        assert result == sample_user
        mock_db.find_one.assert_called_once_with({"id": 1})

    def test_get_user_not_found(self, service):
        """Test getting a non-existent user raises ValueError."""
        with pytest.raises(ValueError, match="User 99 not found"):
            service.get_user(99)

    def test_create_user_success(self, service, mock_db):
        """Test creating a valid user."""
        result = service.create_user("Bob", "bob@example.com")
        assert result["name"] == "Bob"
        assert result["email"] == "bob@example.com"
        assert "created_at" in result
        mock_db.insert_one.assert_called_once()

    def test_create_user_empty_name(self, service):
        """Test that empty name raises ValueError."""
        with pytest.raises(ValueError, match="Name and email are required"):
            service.create_user("", "test@example.com")

    def test_create_user_invalid_email(self, service):
        """Test that invalid email raises ValueError."""
        with pytest.raises(ValueError, match="Invalid email format"):
            service.create_user("Bob", "not-an-email")


# --- Parametrized tests ---
@pytest.mark.parametrize("email,valid", [
    ("user@example.com", True),
    ("user@sub.example.com", True),
    ("no-at-sign", False),
    ("", False),
])
def test_email_validation(email, valid):
    """Test email validation with multiple inputs."""
    db = Mock()
    db.insert_one = Mock()
    service = UserService(db)
    if valid:
        result = service.create_user("Test", email)
        assert result["email"] == email
    else:
        with pytest.raises(ValueError):
            service.create_user("Test", email)


# --- Mocking with patch ---
def get_current_time():
    return datetime.now()

def test_mocking_datetime():
    """Mock datetime.now() to control time in tests."""
    fixed_time = datetime(2026, 1, 1, 12, 0, 0)
    with patch("__main__.get_current_time", return_value=fixed_time):
        result = get_current_time()
        assert result == fixed_time


# --- Fixtures with yield (setup and teardown) ---
@pytest.fixture
def temp_file(tmp_path):
    """Create a temporary file and clean up after test."""
    file_path = tmp_path / "test_data.txt"
    file_path.write_text("test content")
    yield file_path
    # Cleanup happens automatically with tmp_path


def test_temp_file(temp_file):
    """Test using a temporary file."""
    content = temp_file.read_text()
    assert content == "test content"


# --- Testing exceptions and warnings ---
def test_exceptions():
    with pytest.raises(ZeroDivisionError):
        1 / 0

    with pytest.raises(ValueError) as exc_info:
        int("not a number")
    assert "invalid literal" in str(exc_info.value)


# --- Approximate comparisons for floats ---
def test_float_comparison():
    assert 0.1 + 0.2 == pytest.approx(0.3)
    assert [0.1, 0.2] == pytest.approx([0.1, 0.2])
\`\`\`

### Exercises

**1. Calculator test suite**
Write a \`Calculator\` class with \`add\`, \`subtract\`, \`multiply\`, and \`divide\` methods. Write pytest tests for all four, including a test that \`divide(x, 0)\` raises \`ZeroDivisionError\`.

<details>
<summary>Hint</summary>

Create a \`@pytest.fixture\` that returns a \`Calculator()\` instance. Use \`pytest.raises(ZeroDivisionError)\` for the division-by-zero test.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Save as test_calculator.py and run: pytest test_calculator.py -v
import pytest

class Calculator:
    def add(self, a, b): return a + b
    def subtract(self, a, b): return a - b
    def multiply(self, a, b): return a * b
    def divide(self, a, b):
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return a / b

@pytest.fixture
def calc():
    return Calculator()

def test_add(calc):
    assert calc.add(3, 4) == 7

def test_subtract(calc):
    assert calc.subtract(10, 4) == 6

def test_multiply(calc):
    assert calc.multiply(3, 4) == 12

def test_divide(calc):
    assert calc.divide(10, 2) == 5.0

def test_divide_by_zero(calc):
    with pytest.raises(ZeroDivisionError):
        calc.divide(10, 0)
\`\`\`

Expected output (when running pytest):
\`\`\`
test_calculator.py::test_add PASSED
test_calculator.py::test_subtract PASSED
test_calculator.py::test_multiply PASSED
test_calculator.py::test_divide PASSED
test_calculator.py::test_divide_by_zero PASSED
\`\`\`

</details>

**2. Parametrized tests**
Use \`@pytest.mark.parametrize\` to test a \`is_palindrome(s)\` function with at least 6 input/output pairs (mix of true and false cases).

<details>
<summary>Hint</summary>

A palindrome reads the same forwards and backwards. Normalise the string by lowercasing and removing spaces before comparing: \`s.lower().replace(" ", "") == s.lower().replace(" ", "")[::-1]\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Save as test_palindrome.py and run: pytest test_palindrome.py -v
import pytest

def is_palindrome(s: str) -> bool:
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]

@pytest.mark.parametrize("text,expected", [
    ("racecar", True),
    ("hello", False),
    ("A man a plan a canal Panama".replace(" ", ""), True),
    ("level", True),
    ("python", False),
    ("madam", True),
])
def test_is_palindrome(text, expected):
    assert is_palindrome(text) == expected
\`\`\`

Expected output (when running pytest):
\`\`\`
test_palindrome.py::test_is_palindrome[racecar-True] PASSED
test_palindrome.py::test_is_palindrome[hello-False] PASSED
test_palindrome.py::test_is_palindrome[AmanaplanacanalpanamaTrue] PASSED
test_palindrome.py::test_is_palindrome[level-True] PASSED
test_palindrome.py::test_is_palindrome[python-False] PASSED
test_palindrome.py::test_is_palindrome[madam-True] PASSED
\`\`\`

</details>

**3. Fixture with setup and teardown**
Write a pytest fixture that creates a temporary SQLite database (using Python's built-in \`sqlite3\`), yields the connection, and closes it after the test.

<details>
<summary>Hint</summary>

Use \`:memory:\` as the database path for an in-memory database. Call \`conn.close()\` after the \`yield\` in the fixture. Use \`conn.execute()\` to create tables and insert test data.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Save as test_db.py and run: pytest test_db.py -v
import pytest
import sqlite3

@pytest.fixture
def db_conn():
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)")
    conn.execute("INSERT INTO users VALUES (1, 'Alice')")
    conn.commit()
    yield conn
    conn.close()

def test_query_user(db_conn):
    row = db_conn.execute("SELECT name FROM users WHERE id=1").fetchone()
    assert row[0] == "Alice"

def test_insert_user(db_conn):
    db_conn.execute("INSERT INTO users VALUES (2, 'Bob')")
    db_conn.commit()
    count = db_conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    assert count == 2
\`\`\`

Expected output (when running pytest):
\`\`\`
test_db.py::test_query_user PASSED
test_db.py::test_insert_user PASSED
\`\`\`

</details>

**4. Mock an HTTP client**
Write a function \`get_user_name(user_id)\` that calls an HTTP client's \`get(url)\` method. Write a pytest test that mocks the HTTP client and verifies the function returns the correct name.

<details>
<summary>Hint</summary>

Use \`unittest.mock.Mock()\` to create a fake HTTP client. Set \`mock_client.get.return_value.json.return_value = {"name": "Alice"}\`. Pass the mock into the function.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Save as test_http.py and run: pytest test_http.py -v
import pytest
from unittest.mock import Mock

def get_user_name(user_id: int, http_client) -> str:
    response = http_client.get(f"https://api.example.com/users/{user_id}")
    return response.json()["name"]

def test_get_user_name():
    mock_client = Mock()
    mock_client.get.return_value.json.return_value = {"id": 1, "name": "Alice"}

    result = get_user_name(1, mock_client)

    assert result == "Alice"
    mock_client.get.assert_called_once_with("https://api.example.com/users/1")
\`\`\`

Expected output (when running pytest):
\`\`\`
test_http.py::test_get_user_name PASSED
\`\`\`

</details>

**Why it matters:** Tests catch regressions, document expected behavior, and give you confidence to refactor. In professional teams, code without tests is considered incomplete.

> **Role connection:** All developer roles write tests. Backend Developers test API endpoints. Data Engineers test transformation pipelines. DevOps Engineers test infrastructure automation.

---

## 8. Regular Expressions

Regular expressions (regex) are patterns that describe sets of strings. Python's \`re\` module provides comprehensive regex support for searching, matching, splitting, and replacing text.

\`\`\`python
# =============================================================
# Regular Expressions – Comprehensive Example
# =============================================================

import re

# --- Basic matching ---
text = "The quick brown fox jumps over the lazy dog"

# search: find first match anywhere in string
match = re.search(r"brown (\\w+)", text)
if match:
    print(f"Found: {match.group()}")     # Found: brown fox
    print(f"Group 1: {match.group(1)}")  # Group 1: fox
    print(f"Span: {match.span()}")       # Span: (10, 19)

# match: only matches at the beginning of string
m = re.match(r"The", text)
print(f"Match at start: {m is not None}")  # Match at start: True

# fullmatch: entire string must match (Python 3.4+)
m = re.fullmatch(r"\\d{3}-\\d{4}", "555-1234")
print(f"Full match: {m is not None}")  # Full match: True


# --- findall and finditer ---
# findall: return all non-overlapping matches
emails_text = """
Contact us at support@example.com or sales@example.com.
For urgent matters: admin@example.org
"""
emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", emails_text)
print(f"Emails: {emails}")
# Emails: ['support@example.com', 'sales@example.com', 'admin@example.org']

# finditer: return match objects (more detail)
for m in re.finditer(r"[\\w.+-]+@([\\w-]+\\.[\\w.]+)", emails_text):
    print(f"  Email: {m.group()}, Domain: {m.group(1)}")
#   Email: support@example.com, Domain: example.com
#   Email: sales@example.com, Domain: example.com
#   Email: admin@example.org, Domain: example.org


# --- Substitution ---
# Basic replacement
cleaned = re.sub(r"\\s+", " ", "too   many    spaces   here")
print(f"Cleaned: {cleaned}")  # Cleaned: too many spaces here

# Replacement with backreference
date_str = "2026-03-20"
formatted = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3/\\2/\\1", date_str)
print(f"Formatted date: {formatted}")  # Formatted date: 20/03/2026

# Replacement with function
def censor(match):
    word = match.group()
    return word[0] + "*" * (len(word) - 2) + word[-1]

text = "Replace sensitive words like password and secret"
censored = re.sub(r"\\b(password|secret)\\b", censor, text)
print(f"Censored: {censored}")
# Censored: Replace sensitive words like p******d and s****t


# --- Named groups ---
log_line = '2026-03-20 14:30:45 ERROR [auth] Login failed for user "admin"'
pattern = r"(?P<date>[\\d-]+) (?P<time>[\\d:]+) (?P<level>\\w+) \\[(?P<module>\\w+)\\] (?P<message>.+)"
m = re.match(pattern, log_line)
if m:
    print(f"  Date: {m.group('date')}")      # Date: 2026-03-20
    print(f"  Level: {m.group('level')}")    # Level: ERROR
    print(f"  Module: {m.group('module')}")  # Module: auth
    print(f"  Message: {m.group('message')}")# Message: Login failed for user "admin"
    print(f"  As dict: {m.groupdict()}")


# --- Lookahead and lookbehind ---
# Positive lookahead: (?=...)
# Find words followed by a comma
text = "apple, banana, cherry, date"
words = re.findall(r"\\w+(?=,)", text)
print(f"Before comma: {words}")  # Before comma: ['apple', 'banana', 'cherry']

# Negative lookahead: (?!...)
# Find numbers NOT followed by 'px'
css = "width: 100px; height: 50px; opacity: 0.5; z-index: 10"
values = re.findall(r"\\b\\d+(?!px)\\b", css)
print(f"Non-px values: {values}")  # Non-px values: ['10'] (0 from 0.5 not matched due to word boundary)

# Positive lookbehind: (?<=...)
# Find amounts after a dollar sign
text = "Items cost $25, $30, and $45"
amounts = re.findall(r"(?<=\\$)\\d+", text)
print(f"Amounts: {amounts}")  # Amounts: ['25', '30', '45']

# Negative lookbehind: (?<!...)
text = "is good, not bad, is great, not terrible"
words = re.findall(r"(?<!not )\\b(good|bad|great|terrible)\\b", text)
print(f"Positive words: {words}")  # Positive words: ['good', 'great']


# --- Compiled patterns (for reuse) ---
EMAIL_PATTERN = re.compile(
    r"(?P<local>[\\w.+-]+)@(?P<domain>[\\w-]+\\.(?P<tld>[\\w.]+))",
    re.IGNORECASE
)

test_emails = ["alice@Example.COM", "bob@sub.domain.org", "invalid"]
for email in test_emails:
    m = EMAIL_PATTERN.match(email)
    if m:
        print(f"  Valid: {email} (TLD: {m.group('tld')})")
    else:
        print(f"  Invalid: {email}")
#   Valid: alice@Example.COM (TLD: COM)
#   Valid: bob@sub.domain.org (TLD: domain.org)
#   Invalid: invalid


# --- Splitting with regex ---
text = "one, two;three  four\\tfive"
parts = re.split(r"[,;\\s]+", text)
print(f"Split parts: {parts}")
# Split parts: ['one', 'two', 'three', 'four', 'five']

# Split with limit
first_two = re.split(r"\\s+", "a b c d e", maxsplit=2)
print(f"First split: {first_two}")  # First split: ['a', 'b', 'c d e']


# --- Flags ---
# re.IGNORECASE (re.I): case-insensitive matching
# re.MULTILINE (re.M): ^ and $ match line boundaries
# re.DOTALL (re.S): . matches newline too
# re.VERBOSE (re.X): allow comments and whitespace in pattern

phone_pattern = re.compile(r"""
    (?P<country>\\+\\d{1,3})?   # Optional country code
    [-\\s.]?                    # Optional separator
    (?P<area>\\d{3})            # Area code
    [-\\s.]?                    # Optional separator
    (?P<number>\\d{3}[-\\s.]?\\d{4})  # Phone number
""", re.VERBOSE)

phones = ["+1-555-123-4567", "555.987.6543", "555 111 2222"]
for phone in phones:
    m = phone_pattern.search(phone)
    if m:
        print(f"  Phone: {m.group()}, Area: {m.group('area')}")
#   Phone: +1-555-123-4567, Area: 555
#   Phone: 555.987.6543, Area: 555
#   Phone: 555 111 2222, Area: 555
\`\`\`

### Exercises

**1. Strong password validator**
Write a regex-based function \`is_strong_password(pw)\` that returns \`True\` only if the password is 8+ characters, has at least one uppercase letter, one lowercase letter, one digit, and one special character from \`!@#$%^&*\`.

<details>
<summary>Hint</summary>

Use four separate \`re.search()\` calls (or one lookahead pattern). Check length separately with \`len(pw) >= 8\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import re

def is_strong_password(pw: str) -> bool:
    if len(pw) < 8:
        return False
    if not re.search(r"[A-Z]", pw):
        return False
    if not re.search(r"[a-z]", pw):
        return False
    if not re.search(r"\\d", pw):
        return False
    if not re.search(r"[!@#$%^&*]", pw):
        return False
    return True

tests = ["weak", "Str0ng!", "NoSpecial1", "G00d#Pass"]
for pw in tests:
    print(f"{pw!r}: {is_strong_password(pw)}")
\`\`\`

Expected output:
\`\`\`
'weak': False
'Str0ng!': True
'NoSpecial1': False
'G00d#Pass': True
\`\`\`

</details>

**2. Apache log parser**
Parse an Apache-style log line using named groups for \`ip\`, \`method\`, \`path\`, \`status\`, and \`size\`.

<details>
<summary>Hint</summary>

A typical Apache log line looks like: \`127.0.0.1 - - [20/Mar/2026] "GET /index.html HTTP/1.1" 200 1234\`. Use \`(?P<name>pattern)\` for each field.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import re

LOG_PATTERN = re.compile(
    r'(?P<ip>[\\d.]+).*?"(?P<method>\\w+) (?P<path>\\S+)[^"]*" (?P<status>\\d{3}) (?P<size>\\d+)'
)

log_line = '127.0.0.1 - - [20/Mar/2026:14:30:45] "GET /index.html HTTP/1.1" 200 1234'
m = LOG_PATTERN.search(log_line)
if m:
    print(f"IP: {m.group('ip')}")
    print(f"Method: {m.group('method')}")
    print(f"Path: {m.group('path')}")
    print(f"Status: {m.group('status')}")
    print(f"Size: {m.group('size')}")
\`\`\`

Expected output:
\`\`\`
IP: 127.0.0.1
Method: GET
Path: /index.html
Status: 200
Size: 1234
\`\`\`

</details>

**3. camelCase to snake_case**
Write a function \`camel_to_snake(name)\` that converts a camelCase string to snake_case using \`re.sub\`.

<details>
<summary>Hint</summary>

Insert an underscore before each uppercase letter that follows a lowercase letter: \`re.sub(r"([a-z])([A-Z])", r"\\1_\\2", name).lower()\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import re

def camel_to_snake(name: str) -> str:
    # Insert underscore between lowercase and uppercase
    s1 = re.sub(r"([a-z])([A-Z])", r"\\1_\\2", name)
    # Handle sequences like "XMLParser" -> "XML_Parser"
    s2 = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\\1_\\2", s1)
    return s2.lower()

tests = ["camelCase", "myHTTPClient", "getURLPath", "XMLParser"]
for name in tests:
    print(f"{name} -> {camel_to_snake(name)}")
\`\`\`

Expected output:
\`\`\`
camelCase -> camel_case
myHTTPClient -> my_http_client
getURLPath -> get_url_path
XMLParser -> xml_parser
\`\`\`

</details>

**4. Config file parser**
Use lookahead/lookbehind to extract values from config lines in the format \`key=value\`. Extract only the values (not the keys or equals sign).

<details>
<summary>Hint</summary>

Use a positive lookbehind \`(?<==)\` to match text that immediately follows an \`=\` sign: \`re.findall(r"(?<==).*", text)\`. Strip whitespace from results.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import re

config_text = """
host=localhost
port=5432
debug=true
password=s3cr3t
"""

values = [v.strip() for v in re.findall(r"(?<==).+", config_text)]
print(values)
\`\`\`

Expected output:
\`\`\`
['localhost', '5432', 'true', 's3cr3t']
\`\`\`

</details>

**Why it matters:** Regex is an essential tool for text processing, validation, log parsing, and data extraction. While Python offers simpler string methods for basic tasks, complex patterns require regex.

> **Role connection:** Backend Developers validate input and parse logs. Data Engineers extract structured data from unstructured text. Security Engineers use regex for pattern detection.

---

## Summary

You have covered eight intermediate Python concepts:

| Topic | Key Takeaway |
|-------|-------------|
| OOP | Classes, inheritance, dunder methods, and properties |
| Decorators | Modify function behavior without changing the function itself |
| Generators | Lazy evaluation for memory-efficient data processing |
| Context Managers | Guarantee resource cleanup with \`with\` statements |
| Comprehensions | Concise data transformation; walrus operator for assign-and-test |
| Type Hints | Static type checking with mypy; \`Protocol\` for structural typing |
| Testing | pytest fixtures, parametrize, mocking, and coverage |
| Regular Expressions | Pattern matching, groups, lookahead/lookbehind, compiled patterns |

Move on to the **Senior** level when you are comfortable building well-structured Python applications with proper testing and type safety.

---

## Recommended Videos — Mid Level

- **Programming with Mosh** — "Python Full Course for Beginners" — https://www.youtube.com/watch?v=_uQrJ0TkZlc

> Mosh's full-course coverage of classes and modules is an excellent supplement to the OOP and testing sections above. The explanations of \`__init__\`, instance vs class variables, and method resolution order complement the material here directly.
`,
  senior: `# Python – Senior Deep Dive

Senior Python engineers are expected to understand not just how Python works but why it works that way — and when to reach beyond the idiomatic solution. This guide covers the internals and architectural patterns that distinguish a senior practitioner: the event loop model behind \`asyncio\`, the class machinery exposed by metaclasses, the reference-counting and garbage-collection strategy that determines memory behaviour, and the concurrency primitives that bypass or work around the GIL. You will also learn how to package and distribute libraries professionally and how to apply classic design patterns in a Pythonic way.

## What you will learn

- Write concurrent I/O-bound code using \`asyncio\`, coroutines, and \`TaskGroup\`
- Understand and use metaclasses to automate class configuration and registration
- Optimise memory footprint with \`__slots__\`, weak references, and the garbage collector
- Profile applications with \`cProfile\`, \`line_profiler\`, and \`tracemalloc\`
- Package and publish libraries using \`pyproject.toml\`, \`build\`, and \`twine\`
- Implement canonical design patterns (Singleton, Factory, Observer, Strategy, Decorator) idiomatically
- Choose the right concurrency model — threading, multiprocessing, or asyncio — given the task profile
- Reason about the Global Interpreter Lock and its implications for parallelism

---

## 1. Async/Await

Asynchronous programming lets you write concurrent code that efficiently handles I/O-bound operations (network requests, file I/O, database queries) without threads. Python's \`asyncio\` module provides the event loop, coroutines, tasks, and synchronization primitives.

### How Async Works

When a coroutine hits an \`await\`, it suspends execution and returns control to the event loop. The event loop can then run other coroutines while waiting for the I/O operation to complete. This is cooperative multitasking -- coroutines must explicitly yield control.

\`\`\`interactive-flow
pythonAsyncio
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant EL as Event Loop
    participant C1 as Coroutine A
    participant C2 as Coroutine B
    participant IO as I/O Operation

    EL->>C1: Run coroutine A
    C1->>IO: await fetch(url_1)
    IO-->>EL: Suspended (waiting)
    EL->>C2: Run coroutine B
    C2->>IO: await fetch(url_2)
    IO-->>EL: Suspended (waiting)
    IO-->>C1: url_1 response ready
    EL->>C1: Resume coroutine A
    IO-->>C2: url_2 response ready
    EL->>C2: Resume coroutine B
\`\`\`

\`\`\`python
# =============================================================
# Async/Await – Comprehensive Example
# =============================================================

import asyncio
import time
from typing import AsyncIterator

# --- Basic coroutine ---
async def fetch_data(url: str, delay: float) -> dict:
    """Simulate an async HTTP request."""
    print(f"  Fetching {url}...")
    await asyncio.sleep(delay)  # Non-blocking sleep
    return {"url": url, "status": 200, "data": f"Response from {url}"}


# --- Running coroutines concurrently ---
async def fetch_all_concurrent():
    """Fetch multiple URLs concurrently with asyncio.gather."""
    urls = [
        ("https://api.example.com/users", 1.0),
        ("https://api.example.com/posts", 1.5),
        ("https://api.example.com/comments", 0.8),
    ]

    start = time.perf_counter()

    # gather runs all coroutines concurrently
    results = await asyncio.gather(
        *(fetch_data(url, delay) for url, delay in urls)
    )

    elapsed = time.perf_counter() - start
    print(f"  All fetched in {elapsed:.2f}s (would be {sum(d for _, d in urls):.1f}s sequentially)")
    return results


# --- asyncio.TaskGroup (Python 3.11+) ---
async def fetch_with_task_group():
    """Structured concurrency with TaskGroup."""
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_data("/api/a", 1.0))
        task2 = tg.create_task(fetch_data("/api/b", 0.5))
        task3 = tg.create_task(fetch_data("/api/c", 0.8))
    # All tasks are guaranteed complete here
    return [task1.result(), task2.result(), task3.result()]


# --- Async generators ---
async def paginated_fetch(base_url: str, total_pages: int) -> AsyncIterator[list]:
    """Fetch paginated data, yielding one page at a time."""
    for page in range(1, total_pages + 1):
        print(f"  Fetching page {page}/{total_pages}")
        await asyncio.sleep(0.3)  # Simulate network delay
        yield [{"id": i, "page": page} for i in range(10)]


async def process_pages():
    """Consume an async generator."""
    all_items = []
    async for page_items in paginated_fetch("/api/items", 3):
        all_items.extend(page_items)
        print(f"  Collected {len(all_items)} items so far")
    return all_items


# --- Semaphore: rate limiting ---
async def rate_limited_fetch(
    urls: list[str],
    max_concurrent: int = 3
) -> list[dict]:
    """Fetch URLs with a concurrency limit."""
    semaphore = asyncio.Semaphore(max_concurrent)

    async def fetch_with_limit(url: str) -> dict:
        async with semaphore:
            return await fetch_data(url, 0.5)

    return await asyncio.gather(
        *(fetch_with_limit(url) for url in urls)
    )


# --- Timeouts ---
async def fetch_with_timeout():
    """Apply a timeout to an async operation."""
    try:
        async with asyncio.timeout(2.0):  # Python 3.11+
            result = await fetch_data("/slow-endpoint", 5.0)
            return result
    except TimeoutError:
        print("  Request timed out!")
        return None


# --- Async context manager ---
class AsyncDatabasePool:
    """Simulated async database connection pool."""

    def __init__(self, size: int = 5):
        self.size = size
        self._pool: asyncio.Queue = asyncio.Queue(maxsize=size)

    async def __aenter__(self):
        print(f"  Initializing pool with {self.size} connections")
        for i in range(self.size):
            await self._pool.put(f"conn_{i}")
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        while not self._pool.empty():
            conn = await self._pool.get()
            print(f"  Closing {conn}")
        print("  Pool closed")

    async def acquire(self) -> str:
        return await self._pool.get()

    async def release(self, conn: str) -> None:
        await self._pool.put(conn)


async def use_pool():
    """Use the async database pool."""
    async with AsyncDatabasePool(size=3) as pool:
        conn = await pool.acquire()
        print(f"  Acquired: {conn}")
        await asyncio.sleep(0.1)  # Do work
        await pool.release(conn)
        print(f"  Released: {conn}")


# --- Event loop entry point ---
async def main():
    """Main entry point demonstrating all async patterns."""
    print("\\n--- Concurrent fetch ---")
    results = await fetch_all_concurrent()
    for r in results:
        print(f"  {r['url']}: {r['status']}")

    print("\\n--- Async generator ---")
    items = await process_pages()
    print(f"  Total items: {len(items)}")

    print("\\n--- Rate-limited fetch ---")
    urls = [f"/api/item/{i}" for i in range(6)]
    results = await rate_limited_fetch(urls, max_concurrent=2)
    print(f"  Fetched {len(results)} items")

    print("\\n--- Connection pool ---")
    await use_pool()


# Run the event loop
# asyncio.run(main())
\`\`\`

### Exercises

**1. Async web scraper with semaphore**
Build an async function that "fetches" 10 URLs concurrently but limits concurrency to 3 at a time using \`asyncio.Semaphore\`. Use \`asyncio.sleep\` to simulate network delay.

<details>
<summary>Hint</summary>

Create a \`Semaphore(3)\`. Wrap each simulated fetch in \`async with semaphore:\`. Use \`asyncio.gather(*[fetch(url) for url in urls])\` to run all tasks.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import asyncio

async def fetch(url: str, semaphore: asyncio.Semaphore) -> str:
    async with semaphore:
        print(f"  Fetching {url}")
        await asyncio.sleep(0.2)
        return f"data from {url}"

async def scrape(urls: list[str], max_concurrent: int = 3) -> list[str]:
    semaphore = asyncio.Semaphore(max_concurrent)
    return await asyncio.gather(*(fetch(url, semaphore) for url in urls))

urls = [f"https://example.com/page/{i}" for i in range(10)]
results = asyncio.run(scrape(urls))
print(f"Fetched {len(results)} pages")
\`\`\`

Expected output:
\`\`\`
  Fetching https://example.com/page/0
  Fetching https://example.com/page/1
  Fetching https://example.com/page/2
  Fetching https://example.com/page/3
  ... (all 10 pages)
Fetched 10 pages
\`\`\`

</details>

**2. Async producer-consumer**
Implement an async producer-consumer pattern using \`asyncio.Queue\`. The producer puts 5 items into the queue; 2 consumers process them concurrently.

<details>
<summary>Hint</summary>

Use \`asyncio.Queue()\`. The producer calls \`await q.put(item)\`. Each consumer calls \`item = await q.get()\` then \`q.task_done()\`. Use \`await q.join()\` to wait for all items to be processed.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import asyncio

async def producer(q: asyncio.Queue, items: list):
    for item in items:
        await q.put(item)
        print(f"  Produced: {item}")
    await q.put(None)  # sentinel
    await q.put(None)  # one per consumer

async def consumer(name: str, q: asyncio.Queue):
    while True:
        item = await q.get()
        if item is None:
            q.task_done()
            break
        print(f"  {name} consumed: {item}")
        await asyncio.sleep(0.1)
        q.task_done()

async def main():
    q = asyncio.Queue()
    items = [1, 2, 3, 4, 5]
    await asyncio.gather(
        producer(q, items),
        consumer("C1", q),
        consumer("C2", q),
    )

asyncio.run(main())
\`\`\`

Expected output:
\`\`\`
  Produced: 1
  Produced: 2
  Produced: 3
  Produced: 4
  Produced: 5
  C1 consumed: 1
  C2 consumed: 2
  ... (order may vary between consumers)
\`\`\`

</details>

**3. Async retry decorator**
Write a \`@async_retry(max_attempts)\` decorator that works with async functions, retrying on \`Exception\` up to \`max_attempts\` times.

<details>
<summary>Hint</summary>

The wrapper function must be \`async def wrapper\`. Use \`await func(*args, **kwargs)\` instead of \`func(*args, **kwargs)\`. Keep the rest of the retry logic the same as a sync retry decorator.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import asyncio
import functools

def async_retry(max_attempts: int = 3):
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Attempt {attempt} failed: {e}. Retrying...")
                    await asyncio.sleep(0.01)
        return wrapper
    return decorator

call_count = 0

@async_retry(max_attempts=3)
async def flaky_async():
    global call_count
    call_count += 1
    if call_count < 3:
        raise ConnectionError("not ready")
    return "success"

result = asyncio.run(flaky_async())
print(result)
\`\`\`

Expected output:
\`\`\`
  Attempt 1 failed: not ready. Retrying...
  Attempt 2 failed: not ready. Retrying...
success
\`\`\`

</details>

**4. Async file lock**
Write an async context manager \`AsyncFileLock(path)\` that creates a lock file on entry and removes it on exit, raising \`RuntimeError\` if the lock file already exists.

<details>
<summary>Hint</summary>

Use \`pathlib.Path\`. In \`__aenter__\`, check if the lock file exists; if so, raise \`RuntimeError\`. Otherwise, create it with \`path.touch()\`. In \`__aexit__\`, remove it with \`path.unlink(missing_ok=True)\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import asyncio
from pathlib import Path

class AsyncFileLock:
    def __init__(self, path: str):
        self.lock_path = Path(path + ".lock")

    async def __aenter__(self):
        if self.lock_path.exists():
            raise RuntimeError(f"Lock already held: {self.lock_path}")
        self.lock_path.touch()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        self.lock_path.unlink(missing_ok=True)

async def main():
    async with AsyncFileLock("/tmp/myresource") as lock:
        print(f"Lock acquired: {lock.lock_path.exists()}")
        await asyncio.sleep(0.1)
    print(f"Lock released: {lock.lock_path.exists()}")

asyncio.run(main())
\`\`\`

Expected output:
\`\`\`
Lock acquired: True
Lock released: False
\`\`\`

</details>

**Why it matters:** Async programming is essential for high-performance I/O-bound applications. A single-threaded async server can handle thousands of concurrent connections, making it the foundation of modern Python web frameworks like FastAPI and aiohttp.

> **Role connection:** Backend Developers build async API servers with FastAPI. AI Engineers use async for parallel LLM API calls. Data Engineers use async for concurrent data source fetching.

---

## 2. Metaclasses

Metaclasses are "classes of classes." Just as a class defines how instances behave, a metaclass defines how classes behave. They are Python's most advanced metaprogramming tool, used for frameworks, ORMs, and API validation.

### The type() Function

In Python, \`type\` is the default metaclass. When you write \`class Foo: ...\`, Python calls \`type('Foo', (bases,), namespace)\` behind the scenes.

\`\`\`python
# =============================================================
# Metaclasses – Comprehensive Example
# =============================================================

from abc import ABCMeta, abstractmethod
from typing import Any

# --- Creating a class with type() ---
# These two are equivalent:

# class MyClass:
#     x = 10
#     def greet(self):
#         return f"Hello, x={self.x}"

MyClass = type("MyClass", (), {
    "x": 10,
    "greet": lambda self: f"Hello, x={self.x}"
})

obj = MyClass()
print(f"type() class: {obj.greet()}")  # type() class: Hello, x=10


# --- Custom metaclass ---
class ValidatedMeta(type):
    """Metaclass that validates class definitions at creation time."""

    def __new__(mcs, name: str, bases: tuple, namespace: dict, **kwargs):
        """Called when a new class is being created."""
        cls = super().__new__(mcs, name, bases, namespace)

        # Enforce that all public methods have docstrings
        for attr_name, attr_value in namespace.items():
            if callable(attr_value) and not attr_name.startswith("_"):
                if not attr_value.__doc__:
                    raise TypeError(
                        f"Method {name}.{attr_name}() must have a docstring"
                    )

        # Enforce that the class has a __repr__
        if "__repr__" not in namespace and name != "ValidatedBase":
            raise TypeError(f"Class {name} must define __repr__")

        return cls

    def __init__(cls, name, bases, namespace, **kwargs):
        """Called after the class is created."""
        super().__init__(name, bases, namespace)


class ValidatedBase(metaclass=ValidatedMeta):
    """Base class using our validating metaclass."""
    pass


class User(ValidatedBase):
    """A user entity."""

    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def __repr__(self) -> str:
        """Developer-friendly representation."""
        return f"User(name={self.name!r}, email={self.email!r})"

    def display(self) -> str:
        """Return display string."""
        return f"{self.name} <{self.email}>"

print(User("Alice", "alice@example.com"))
# User(name='Alice', email='alice@example.com')

# This would raise TypeError at class definition time:
# class BadClass(ValidatedBase):
#     def undocumented_method(self):
#         pass


# --- __init_subclass__: lightweight alternative to metaclasses ---
class Plugin:
    """Base class that auto-registers subclasses."""
    _registry: dict[str, type] = {}

    def __init_subclass__(cls, plugin_name: str = "", **kwargs):
        super().__init_subclass__(**kwargs)
        name = plugin_name or cls.__name__.lower()
        Plugin._registry[name] = cls
        print(f"  Registered plugin: {name}")

    @classmethod
    def get_plugin(cls, name: str) -> type:
        return cls._registry[name]

    @classmethod
    def list_plugins(cls) -> list[str]:
        return list(cls._registry.keys())


class JSONPlugin(Plugin, plugin_name="json"):
    def process(self, data):
        return f"JSON: {data}"

class XMLPlugin(Plugin, plugin_name="xml"):
    def process(self, data):
        return f"XML: {data}"

class CSVPlugin(Plugin):  # Uses class name as default
    def process(self, data):
        return f"CSV: {data}"

print(f"Plugins: {Plugin.list_plugins()}")
# Plugins: ['json', 'xml', 'csvplugin']
json_handler = Plugin.get_plugin("json")()
print(json_handler.process({"key": "value"}))
# JSON: {'key': 'value'}


# --- __set_name__: descriptor protocol ---
class Validated:
    """A descriptor that validates attribute values."""

    def __init__(self, validator, error_message="Invalid value"):
        self.validator = validator
        self.error_message = error_message

    def __set_name__(self, owner, name):
        """Called when the descriptor is assigned to a class attribute."""
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj, value):
        if not self.validator(value):
            raise ValueError(f"{self.name}: {self.error_message} (got {value!r})")
        setattr(obj, self.private_name, value)


class Product:
    """Product with validated attributes."""
    name = Validated(
        lambda v: isinstance(v, str) and len(v) > 0,
        "must be a non-empty string"
    )
    price = Validated(
        lambda v: isinstance(v, (int, float)) and v > 0,
        "must be a positive number"
    )
    quantity = Validated(
        lambda v: isinstance(v, int) and v >= 0,
        "must be a non-negative integer"
    )

    def __init__(self, name: str, price: float, quantity: int):
        self.name = name
        self.price = price
        self.quantity = quantity

    def __repr__(self):
        return f"Product({self.name!r}, price={self.price}, qty={self.quantity})"


product = Product("Widget", 9.99, 100)
print(product)  # Product('Widget', price=9.99, qty=100)

try:
    Product("", 9.99, 100)
except ValueError as e:
    print(f"Validation error: {e}")
# Validation error: name: must be a non-empty string (got '')

try:
    Product("Widget", -5, 100)
except ValueError as e:
    print(f"Validation error: {e}")
# Validation error: price: must be a positive number (got -5)


# --- Abstract Base Classes ---
class Repository(metaclass=ABCMeta):
    """Abstract repository interface."""

    @abstractmethod
    def get(self, id: int) -> Any:
        ...

    @abstractmethod
    def save(self, entity: Any) -> None:
        ...

    @abstractmethod
    def delete(self, id: int) -> None:
        ...

    def get_all(self) -> list:
        """Default implementation (can be overridden)."""
        return []


class InMemoryRepository(Repository):
    def __init__(self):
        self._store: dict[int, Any] = {}

    def get(self, id: int) -> Any:
        return self._store.get(id)

    def save(self, entity: Any) -> None:
        self._store[entity["id"]] = entity

    def delete(self, id: int) -> None:
        self._store.pop(id, None)

repo = InMemoryRepository()
repo.save({"id": 1, "name": "Alice"})
print(f"Repo get: {repo.get(1)}")
# Repo get: {'id': 1, 'name': 'Alice'}
\`\`\`

### Exercises

**1. Type-annotation enforcing metaclass**
Create a metaclass that raises \`TypeError\` at class creation time if any class attribute (that is not a method or dunder) is defined without a type annotation.

<details>
<summary>Hint</summary>

In \`__new__\`, compare \`namespace.keys()\` against \`namespace.get("__annotations__", {}).keys()\`. Attributes that are not callable, not dunder, and not in \`__annotations__\` should trigger the error.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class AnnotatedMeta(type):
    def __new__(mcs, name, bases, namespace, **kwargs):
        annotations = namespace.get("__annotations__", {})
        for attr, value in namespace.items():
            if attr.startswith("_"):
                continue
            if callable(value):
                continue
            if attr not in annotations:
                raise TypeError(
                    f"{name}.{attr} must have a type annotation"
                )
        return super().__new__(mcs, name, bases, namespace)

class Config(metaclass=AnnotatedMeta):
    host: str = "localhost"
    port: int = 5432

print(Config.host, Config.port)

try:
    class BadConfig(metaclass=AnnotatedMeta):
        timeout = 30  # Missing annotation
except TypeError as e:
    print(e)
\`\`\`

Expected output:
\`\`\`
localhost 5432
BadConfig.timeout must have a type annotation
\`\`\`

</details>

**2. CLI command registry**
Use \`__init_subclass__\` to build a command registry for a CLI framework. Each subclass of \`Command\` registers itself by its \`name\` class attribute.

<details>
<summary>Hint</summary>

In \`Command.__init_subclass__\`, read \`cls.name\` and store it in \`Command._registry[cls.name] = cls\`. Provide a \`Command.run(name, *args)\` classmethod that looks up and instantiates the right subclass.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class Command:
    _registry: dict[str, type] = {}
    name: str = ""

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if cls.name:
            Command._registry[cls.name] = cls

    @classmethod
    def run(cls, name: str, *args):
        cmd_class = cls._registry.get(name)
        if cmd_class is None:
            raise ValueError(f"Unknown command: {name}")
        return cmd_class().execute(*args)

    def execute(self, *args):
        raise NotImplementedError

class HelloCommand(Command):
    name = "hello"
    def execute(self, *args):
        return f"Hello, {args[0] if args else 'world'}!"

class ExitCommand(Command):
    name = "exit"
    def execute(self, *args):
        return "Goodbye!"

print(Command.run("hello", "Alice"))
print(Command.run("exit"))
\`\`\`

Expected output:
\`\`\`
Hello, Alice!
Goodbye!
\`\`\`

</details>

**3. Logging descriptor**
Implement a \`LoggedAttribute\` descriptor that prints a message every time an attribute is read, set, or deleted.

<details>
<summary>Hint</summary>

Implement \`__get__\`, \`__set__\`, and \`__delete__\`. Use \`__set_name__\` to capture the attribute name. Store the value with \`object.__setattr__(obj, self.private_name, value)\` to avoid infinite recursion.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class LoggedAttribute:
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_logged_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        value = getattr(obj, self.private_name, None)
        print(f"  GET {self.name} = {value!r}")
        return value

    def __set__(self, obj, value):
        print(f"  SET {self.name} = {value!r}")
        object.__setattr__(obj, self.private_name, value)

    def __delete__(self, obj):
        print(f"  DELETE {self.name}")
        object.__delattr__(obj, self.private_name)

class Config:
    host = LoggedAttribute()
    port = LoggedAttribute()

cfg = Config()
cfg.host = "localhost"
cfg.port = 5432
print(cfg.host)
del cfg.port
\`\`\`

Expected output:
\`\`\`
  SET host = 'localhost'
  SET port = 5432
  GET host = 'localhost'
localhost
  DELETE port
\`\`\`

</details>

**4. ORM-like field system**
Build a simple ORM-like system where field descriptor definitions on a class become "columns." Add a \`Meta.table_name\` inner class and a \`to_dict()\` method that returns the instance's field values.

<details>
<summary>Hint</summary>

Create a \`Field\` descriptor. In a \`ModelMeta\` metaclass (or using \`__init_subclass__\`), collect all \`Field\` instances from the class namespace into \`cls._fields\`. The \`to_dict\` method returns \`{name: getattr(self, name) for name in self._fields}\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class Field:
    def __set_name__(self, owner, name):
        self.name = name
        self.private = f"_field_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private, None)

    def __set__(self, obj, value):
        object.__setattr__(obj, self.private, value)

class Model:
    _fields: list[str] = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls._fields = [k for k, v in cls.__dict__.items() if isinstance(v, Field)]

    def to_dict(self) -> dict:
        return {name: getattr(self, name) for name in self._fields}

class User(Model):
    name = Field()
    email = Field()
    age = Field()

u = User()
u.name = "Alice"
u.email = "alice@example.com"
u.age = 30
print(u.to_dict())
\`\`\`

Expected output:
\`\`\`
{'name': 'Alice', 'email': 'alice@example.com', 'age': 30}
\`\`\`

</details>

**Why it matters:** Metaclasses power frameworks like Django (ORM model definitions), SQLAlchemy, and dataclasses. Understanding them lets you build powerful abstractions and understand how your favorite frameworks work internally.

> **Role connection:** Backend Developers use frameworks built on metaclasses daily. Platform Engineers build internal frameworks using these patterns.

---

## 3. Memory Management

Understanding Python's memory model helps you write efficient programs and debug memory issues. Python uses reference counting with a cyclic garbage collector.

### Reference Counting

Every Python object has a reference count. When the count drops to zero, the memory is freed immediately. The \`gc\` module handles cyclic references that reference counting alone cannot resolve.

\`\`\`python
# =============================================================
# Memory Management – Comprehensive Example
# =============================================================

import sys
import gc
import weakref
from typing import Optional

# --- Reference counting ---
a = [1, 2, 3]
print(f"Refcount of list: {sys.getrefcount(a)}")
# Note: getrefcount itself adds a temporary reference, so the count
# is typically 1 higher than you might expect

b = a  # Another reference
print(f"After b = a: {sys.getrefcount(a)}")

del b  # Remove one reference
print(f"After del b: {sys.getrefcount(a)}")


# --- Object sizes ---
print(f"int(0) size: {sys.getsizeof(0)} bytes")
print(f"int(1) size: {sys.getsizeof(1)} bytes")
print(f"Empty list: {sys.getsizeof([])} bytes")
print(f"List [1,2,3]: {sys.getsizeof([1, 2, 3])} bytes")
print(f"Empty dict: {sys.getsizeof({})} bytes")
print(f"Empty str: {sys.getsizeof('')} bytes")
print(f"'hello': {sys.getsizeof('hello')} bytes")


# --- __slots__: memory optimization for classes ---
class RegularPoint:
    """Standard class with __dict__."""
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

class SlottedPoint:
    """Optimized class using __slots__."""
    __slots__ = ("x", "y")

    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

regular = RegularPoint(1.0, 2.0)
slotted = SlottedPoint(1.0, 2.0)

print(f"Regular point size: {sys.getsizeof(regular)} + {sys.getsizeof(regular.__dict__)} (dict) bytes")
print(f"Slotted point size: {sys.getsizeof(slotted)} bytes (no __dict__)")

# With 1 million objects, __slots__ saves significant memory

# Slots limitation: cannot add arbitrary attributes
try:
    slotted.z = 3.0
except AttributeError as e:
    print(f"Slots limitation: {e}")
# Slots limitation: 'SlottedPoint' object has no attribute 'z'


# --- Weak references ---
class ExpensiveResource:
    """A resource that logs its lifecycle."""
    def __init__(self, name: str):
        self.name = name
        print(f"  Created: {name}")

    def __del__(self):
        print(f"  Destroyed: {self.name}")

    def __repr__(self):
        return f"ExpensiveResource({self.name!r})"


# Strong reference keeps object alive
resource = ExpensiveResource("Resource-A")
weak_ref = weakref.ref(resource)
print(f"Weak ref alive: {weak_ref() is not None}")  # True

del resource  # Object is destroyed because no strong refs remain
print(f"Weak ref alive: {weak_ref() is not None}")  # False


# --- WeakValueDictionary: cache that doesn't prevent GC ---
class ImageCache:
    """Cache that allows garbage collection of unused images."""

    def __init__(self):
        self._cache = weakref.WeakValueDictionary()
        self._stats = {"hits": 0, "misses": 0}

    def get(self, key: str) -> Optional[object]:
        result = self._cache.get(key)
        if result is not None:
            self._stats["hits"] += 1
        else:
            self._stats["misses"] += 1
        return result

    def put(self, key: str, value: object) -> None:
        self._cache[key] = value

    @property
    def stats(self):
        return self._stats.copy()


# --- Garbage collector interface ---
print(f"\\nGC enabled: {gc.isenabled()}")
print(f"GC thresholds: {gc.get_threshold()}")
print(f"GC counts: {gc.get_count()}")

# Create a reference cycle
class Node:
    def __init__(self, name):
        self.name = name
        self.next: Optional['Node'] = None

    def __repr__(self):
        return f"Node({self.name})"

# This creates a cycle: a -> b -> a
a = Node("A")
b = Node("B")
a.next = b
b.next = a

# Delete our references (but cycle keeps objects alive)
del a, b

# Force garbage collection
collected = gc.collect()
print(f"Objects collected: {collected}")


# --- Memory profiling pattern ---
def measure_memory(func):
    """Decorator to measure memory delta of a function."""
    import tracemalloc

    def wrapper(*args, **kwargs):
        tracemalloc.start()
        result = func(*args, **kwargs)
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        print(f"  {func.__name__}: current={current/1024:.1f}KB, peak={peak/1024:.1f}KB")
        return result
    return wrapper

@measure_memory
def create_large_list():
    return [i ** 2 for i in range(100_000)]

@measure_memory
def create_large_generator():
    # Generator uses constant memory
    gen = (i ** 2 for i in range(100_000))
    total = sum(gen)
    return total

create_large_list()
create_large_generator()


# --- String interning ---
# Python interns small strings and integers for performance
a = "hello"
b = "hello"
print(f"\\nInterned strings: {a is b}")  # True (same object)

# Integer caching: -5 to 256 are cached
a = 256
b = 256
print(f"Cached int 256: {a is b}")  # True

a = 257
b = 257
print(f"Non-cached 257: {a is b}")  # May be False
\`\`\`

### Exercises

**1. __slots__ memory benchmark**
Create a class with \`__slots__\` and a regular class with the same attributes. Instantiate each 100,000 times and compare total memory usage using \`tracemalloc\`.

<details>
<summary>Hint</summary>

Use \`tracemalloc.start()\` before creating the instances and \`tracemalloc.get_traced_memory()\` after. Compare \`peak\` memory between the two runs.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import tracemalloc
import sys

class Regular:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

class Slotted:
    __slots__ = ("x", "y", "z")
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

N = 100_000

tracemalloc.start()
regular_objs = [Regular(i, i*2, i*3) for i in range(N)]
_, regular_peak = tracemalloc.get_traced_memory()
tracemalloc.stop()

tracemalloc.start()
slotted_objs = [Slotted(i, i*2, i*3) for i in range(N)]
_, slotted_peak = tracemalloc.get_traced_memory()
tracemalloc.stop()

print(f"Regular peak: {regular_peak / 1024 / 1024:.1f} MB")
print(f"Slotted peak: {slotted_peak / 1024 / 1024:.1f} MB")
print(f"Savings: {(1 - slotted_peak/regular_peak)*100:.0f}%")
\`\`\`

Expected output (approximate):
\`\`\`
Regular peak: 28.6 MB
Slotted peak: 12.4 MB
Savings: 57%
\`\`\`

</details>

**2. WeakSet observer pattern**
Implement an observer pattern using \`weakref.WeakSet\` so that observers are automatically removed when they are garbage collected.

<details>
<summary>Hint</summary>

Use \`weakref.WeakSet()\` to store observers. Define a \`notify\` method that iterates over the set and calls each observer. Objects are automatically removed from the set when garbage collected.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import weakref

class EventSource:
    def __init__(self):
        self._observers = weakref.WeakSet()

    def subscribe(self, observer):
        self._observers.add(observer)

    def notify(self, event):
        for obs in list(self._observers):
            obs.on_event(event)

    @property
    def observer_count(self):
        return len(self._observers)

class Observer:
    def __init__(self, name):
        self.name = name
    def on_event(self, event):
        print(f"  {self.name} received: {event}")

source = EventSource()
obs1 = Observer("A")
obs2 = Observer("B")
source.subscribe(obs1)
source.subscribe(obs2)
source.notify("hello")
print(f"Observers: {source.observer_count}")

del obs2  # Automatically removed from WeakSet
source.notify("world")
print(f"Observers after del: {source.observer_count}")
\`\`\`

Expected output:
\`\`\`
  A received: hello
  B received: hello
Observers: 2
  A received: world
Observers after del: 1
\`\`\`

</details>

**3. Top memory consumers with tracemalloc**
Write a script that allocates several data structures of different sizes and uses \`tracemalloc\` to display the top 5 lines by memory usage.

<details>
<summary>Hint</summary>

Call \`tracemalloc.start()\`, allocate memory, then call \`tracemalloc.take_snapshot()\`. Use \`snapshot.statistics("lineno")\` to get per-line stats and slice the first 5.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import tracemalloc

tracemalloc.start()

# Allocate various structures
big_list = [i for i in range(100_000)]
big_dict = {str(i): i for i in range(10_000)}
big_string = "x" * 1_000_000

snapshot = tracemalloc.take_snapshot()
tracemalloc.stop()

stats = snapshot.statistics("lineno")
print("Top 5 memory consumers:")
for stat in stats[:5]:
    print(f"  {stat}")
\`\`\`

Expected output (line numbers and sizes will vary):
\`\`\`
Top 5 memory consumers:
  yourfile.py:5: size=3906 KiB, count=1, average=3906 KiB
  yourfile.py:6: size=744 KiB, count=20002, average=38 B
  yourfile.py:7: size=954 KiB, count=1, average=954 KiB
  ...
\`\`\`

</details>

**4. Reference cycle detector**
Write a function \`find_cycles(objects)\` that takes a list of objects and returns any that participate in reference cycles (i.e. are collected when \`gc.collect()\` is called).

<details>
<summary>Hint</summary>

Call \`gc.collect()\` with \`gc.DEBUG_SAVEALL\` to save unreachable objects to \`gc.garbage\`. Clear \`gc.garbage\` first, then check what was collected.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import gc

class Node:
    def __init__(self, name):
        self.name = name
        self.next = None
    def __repr__(self):
        return f"Node({self.name})"

def has_cycle(obj):
    """Check if obj is involved in a reference cycle."""
    gc.collect()
    gc.garbage.clear()
    gc.set_debug(gc.DEBUG_SAVEALL)
    del obj
    gc.collect()
    result = len(gc.garbage) > 0
    gc.garbage.clear()
    gc.set_debug(0)
    return result

# Create a cycle
a = Node("A")
b = Node("B")
a.next = b
b.next = a
print(f"Cycle detected: {has_cycle([a, b])}")

# No cycle
x = Node("X")
print(f"Cycle detected: {has_cycle([x])}")
\`\`\`

Expected output:
\`\`\`
Cycle detected: True
Cycle detected: False
\`\`\`

</details>

**Why it matters:** Memory management knowledge is critical for long-running services and data-intensive applications. Understanding \`__slots__\`, weak references, and the garbage collector helps you prevent memory leaks and optimize memory usage.

> **Role connection:** Backend Developers optimize memory for high-traffic services. Data Engineers manage memory when processing large datasets. Platform Engineers monitor memory usage in production.

---

## 4. Profiling & Optimization

Premature optimization is the root of all evil, but when performance matters, you need the right tools to find bottlenecks. Python offers several profiling tools for CPU time, memory usage, and line-by-line analysis.

### The Optimization Workflow

1. Write correct code first
2. Measure with profiling tools
3. Identify the bottleneck (usually 10% of code causes 90% of slowness)
4. Optimize that specific part
5. Measure again to confirm improvement

\`\`\`python
# =============================================================
# Profiling & Optimization – Comprehensive Example
# =============================================================

import cProfile
import pstats
import io
import time
import functools
from collections import defaultdict

# --- cProfile: function-level profiling ---
def profile_function(func):
    """Decorator that profiles a function with cProfile."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        profiler = cProfile.Profile()
        profiler.enable()
        result = func(*args, **kwargs)
        profiler.disable()

        stream = io.StringIO()
        stats = pstats.Stats(profiler, stream=stream)
        stats.sort_stats("cumulative")
        stats.print_stats(10)  # Top 10 functions
        print(stream.getvalue())
        return result
    return wrapper


# --- Example code to profile ---
def fibonacci_naive(n: int) -> int:
    """Naive recursive fibonacci (exponential time)."""
    if n < 2:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)


@functools.lru_cache(maxsize=None)
def fibonacci_cached(n: int) -> int:
    """Memoized fibonacci (linear time)."""
    if n < 2:
        return n
    return fibonacci_cached(n - 1) + fibonacci_cached(n - 2)


def fibonacci_iterative(n: int) -> int:
    """Iterative fibonacci (linear time, constant space)."""
    if n < 2:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b


# --- Benchmarking ---
def benchmark(func, *args, iterations=100):
    """Run a function multiple times and report timing."""
    times = []
    for _ in range(iterations):
        start = time.perf_counter()
        result = func(*args)
        elapsed = time.perf_counter() - start
        times.append(elapsed)

    avg = sum(times) / len(times)
    minimum = min(times)
    maximum = max(times)
    print(f"  {func.__name__}: avg={avg*1000:.3f}ms, min={minimum*1000:.3f}ms, max={maximum*1000:.3f}ms")
    return result

print("Fibonacci benchmarks (n=30):")
benchmark(fibonacci_naive, 30, iterations=5)
benchmark(fibonacci_cached, 30, iterations=100)
benchmark(fibonacci_iterative, 30, iterations=100)


# --- Optimization patterns ---

# 1. Use local variables instead of global/attribute lookups
def sum_with_local():
    """Local variable lookups are faster than global."""
    local_range = range
    local_sum = 0
    for i in local_range(1_000_000):
        local_sum += i
    return local_sum


# 2. Use built-in functions (implemented in C)
data = list(range(1_000_000))

def sum_loop(data):
    total = 0
    for x in data:
        total += x
    return total

def sum_builtin(data):
    return sum(data)  # C implementation, much faster


# 3. Avoid repeated attribute lookups in loops
class DataProcessor:
    def __init__(self):
        self.results = []

    def process_slow(self, items):
        """Slow: repeated attribute lookup."""
        for item in items:
            self.results.append(item * 2)

    def process_fast(self, items):
        """Fast: local reference to method."""
        append = self.results.append  # Single lookup
        for item in items:
            append(item * 2)


# 4. String concatenation optimization
def concat_slow(n):
    """Slow: string concatenation in a loop creates new strings."""
    result = ""
    for i in range(n):
        result += str(i) + ", "
    return result

def concat_fast(n):
    """Fast: join a list of strings."""
    return ", ".join(str(i) for i in range(n))


# 5. Dictionary-based dispatch instead of if/elif chains
OPERATIONS = {
    "add": lambda a, b: a + b,
    "subtract": lambda a, b: a - b,
    "multiply": lambda a, b: a * b,
    "divide": lambda a, b: a / b,
}

def process_dispatch(operation, a, b):
    return OPERATIONS[operation](a, b)


# 6. Use collections for specialized data structures
from collections import Counter
def count_counter(items):
    return Counter(items)  # Fastest: implemented in C


# --- Using timeit for micro-benchmarks ---
import timeit

time_loop = timeit.timeit("sum_loop(data)", globals={"sum_loop": sum_loop, "data": data}, number=10)
time_builtin = timeit.timeit("sum_builtin(data)", globals={"sum_builtin": sum_builtin, "data": data}, number=10)
print(f"\\nsum loop: {time_loop:.4f}s")
print(f"sum builtin: {time_builtin:.4f}s")
print(f"Builtin is {time_loop/time_builtin:.1f}x faster")


# --- Profiling with cProfile from command line ---
# python -m cProfile -s cumulative your_script.py
# python -m cProfile -o profile.stats your_script.py
# python -c "import pstats; p = pstats.Stats('profile.stats'); p.sort_stats('cumulative'); p.print_stats(20)"

# --- line_profiler (install: pip install line-profiler) ---
# Decorate functions with @profile, then run: kernprof -l -v your_script.py

# --- memory_profiler (install: pip install memory-profiler) ---
# Decorate functions with @profile, then run: python -m memory_profiler your_script.py
\`\`\`

### Exercises

**1. Profile and identify bottlenecks**
Write a data processing script with an intentionally slow step. Use \`cProfile\` to identify which function takes the most cumulative time, then rewrite it using an optimization pattern from the section above.

<details>
<summary>Hint</summary>

Wrap the call with \`cProfile.run("my_function()")\` or use the \`@profile_function\` decorator. Look at "cumtime" in the output to find the slowest function.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import cProfile
import pstats
import io

def slow_build_string(n):
    result = ""
    for i in range(n):
        result += str(i) + ","
    return result

def fast_build_string(n):
    return ",".join(str(i) for i in range(n))

# Profile the slow version
profiler = cProfile.Profile()
profiler.enable()
slow_build_string(10_000)
profiler.disable()

stream = io.StringIO()
pstats.Stats(profiler, stream=stream).sort_stats("cumulative").print_stats(5)
print(stream.getvalue())

# The fast version
import timeit
slow = timeit.timeit(lambda: slow_build_string(10_000), number=100)
fast = timeit.timeit(lambda: fast_build_string(10_000), number=100)
print(f"Slow: {slow:.3f}s  Fast: {fast:.3f}s  Speedup: {slow/fast:.1f}x")
\`\`\`

Expected output (times vary):
\`\`\`
   ncalls  tottime  cumtime  percall filename:lineno(function)
   ...
Slow: 0.XXXs  Fast: 0.XXXs  Speedup: X.Xx
\`\`\`

</details>

**2. Rewrite with optimizations**
Take the following slow function and rewrite it to use built-in functions, avoid repeated attribute lookups, and use a list comprehension instead of a loop.

<details>
<summary>Hint</summary>

Replace the manual sum loop with \`sum()\`, the string check with \`isinstance(x, str)\` in a comprehension, and pre-bind \`results.append\` to a local if you need a loop.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import timeit

# Original slow version
def process_slow(data):
    results = []
    total = 0
    for x in data:
        if isinstance(x, (int, float)):
            results.append(x * 2)
            total += x * 2
    return results, total

# Optimised version
def process_fast(data):
    doubled = [x * 2 for x in data if isinstance(x, (int, float))]
    return doubled, sum(doubled)

data = list(range(100_000))
slow_t = timeit.timeit(lambda: process_slow(data), number=10)
fast_t = timeit.timeit(lambda: process_fast(data), number=10)
print(f"Slow: {slow_t:.3f}s  Fast: {fast_t:.3f}s  Speedup: {slow_t/fast_t:.1f}x")

assert process_slow(data) == process_fast(data)
print("Results match!")
\`\`\`

Expected output:
\`\`\`
Slow: X.XXXs  Fast: X.XXXs  Speedup: X.Xx
Results match!
\`\`\`

</details>

**3. Compare data structure memory usage**
Use \`tracemalloc\` to compare the peak memory usage of storing 50,000 (x, y) points as: a list of tuples, a list of dicts, and a list of slotted objects.

<details>
<summary>Hint</summary>

Wrap each creation in \`tracemalloc.start()\` / \`tracemalloc.get_traced_memory()\` / \`tracemalloc.stop()\`. Compare the \`peak\` values.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import tracemalloc

N = 50_000

class SlottedPoint:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

results = {}

for label, factory in [
    ("tuple", lambda i: (i, i * 2)),
    ("dict", lambda i: {"x": i, "y": i * 2}),
    ("slotted", lambda i: SlottedPoint(i, i * 2)),
]:
    tracemalloc.start()
    objs = [factory(i) for i in range(N)]
    _, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    results[label] = peak
    print(f"{label}: {peak / 1024:.0f} KB")
\`\`\`

Expected output (approximate):
\`\`\`
tuple: 2000 KB
dict: 8000 KB
slotted: 3500 KB
\`\`\`

</details>

**4. list vs deque benchmark**
Use \`timeit\` to benchmark \`list\` vs \`collections.deque\` for 10,000 \`appendleft\` (or \`insert(0, x)\`) operations.

<details>
<summary>Hint</summary>

\`list.insert(0, x)\` is O(n) because it shifts all elements. \`deque.appendleft(x)\` is O(1). Use \`timeit.timeit\` with \`setup\` to create the data structure once.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import timeit

list_time = timeit.timeit(
    "for i in range(10000): lst.insert(0, i)",
    setup="lst = []",
    number=100
)

deque_time = timeit.timeit(
    "for i in range(10000): dq.appendleft(i)",
    setup="from collections import deque; dq = deque()",
    number=100
)

print(f"list insert(0): {list_time:.3f}s")
print(f"deque appendleft: {deque_time:.3f}s")
print(f"deque is {list_time/deque_time:.0f}x faster")
\`\`\`

Expected output (approximate):
\`\`\`
list insert(0): 2.500s
deque appendleft: 0.080s
deque is 31x faster
\`\`\`

</details>

**Why it matters:** Performance optimization must be guided by measurement, not intuition. Profiling reveals the actual bottlenecks, which are often surprising. The patterns shown here can yield 10-100x improvements.

> **Role connection:** Backend Developers optimize API response times. Data Engineers optimize pipeline throughput. Platform Engineers identify performance regressions.

---

## 5. Packaging & Distribution

Packaging your Python code for distribution is essential for sharing libraries, deploying applications, and maintaining reproducible builds.

### Modern Packaging with pyproject.toml

The Python packaging ecosystem has converged on \`pyproject.toml\` as the standard configuration file, replacing \`setup.py\` and \`setup.cfg\`.

\`\`\`python
# =============================================================
# Packaging & Distribution – Comprehensive Example
# =============================================================

# --- pyproject.toml structure ---
# This is the modern standard for Python package configuration.
# Save as pyproject.toml in your project root.

PYPROJECT_TOML = """
[build-system]
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-awesome-library"
version = "1.0.0"
description = "A comprehensive example library"
readme = "README.md"
license = {text = "MIT"}
requires-python = ">=3.12"
authors = [
    {name = "Alice Developer", email = "alice@example.com"}
]
keywords = ["example", "library", "python"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3.12",
    "Programming Language :: Python :: 3.13",
]

dependencies = [
    "requests>=2.28.0",
    "pydantic>=2.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "pytest-cov>=4.0",
    "mypy>=1.0",
    "ruff>=0.1.0",
]
docs = [
    "sphinx>=6.0",
    "sphinx-rtd-theme>=1.2",
]

[project.urls]
Homepage = "https://github.com/alice/my-awesome-library"
Documentation = "https://my-awesome-library.readthedocs.io"
Repository = "https://github.com/alice/my-awesome-library"
Issues = "https://github.com/alice/my-awesome-library/issues"

[project.scripts]
my-cli = "my_library.cli:main"

[tool.setuptools.packages.find]
where = ["src"]

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v --cov=my_library --cov-report=term-missing"

[tool.mypy]
python_version = "3.12"
strict = true

[tool.ruff]
target-version = "py312"
line-length = 88
"""

# --- Project structure ---
PROJECT_STRUCTURE = """
my-awesome-library/
    pyproject.toml
    README.md
    LICENSE
    src/
        my_library/
            __init__.py        # Package init with version
            core.py            # Main functionality
            utils.py           # Utility functions
            cli.py             # CLI entry point
            py.typed           # Marker file for PEP 561 (typed package)
    tests/
        __init__.py
        test_core.py
        test_utils.py
        conftest.py            # Shared fixtures
    docs/
        conf.py
        index.rst
"""
print(PROJECT_STRUCTURE)


# --- Example package code ---

# src/my_library/__init__.py
INIT_PY = '''
"""My Awesome Library - A comprehensive example."""

__version__ = "1.0.0"

from .core import process_data, DataProcessor
from .utils import validate_input

__all__ = ["process_data", "DataProcessor", "validate_input", "__version__"]
'''

# src/my_library/core.py
CORE_PY = '''
"""Core functionality of the library."""

from dataclasses import dataclass, field
from typing import Any

@dataclass
class DataProcessor:
    """Process data with configurable options."""
    name: str
    options: dict[str, Any] = field(default_factory=dict)

    def process(self, data: list) -> list:
        """Process a list of items."""
        return [self._transform(item) for item in data]

    def _transform(self, item: Any) -> Any:
        """Apply transformation to a single item."""
        return item

def process_data(data: list, **options) -> list:
    """Convenience function for one-off processing."""
    processor = DataProcessor(name="default", options=options)
    return processor.process(data)
'''


# --- Build and publish commands ---
BUILD_COMMANDS = """
# Install build tools
pip install build twine

# Build the package (creates dist/ with .tar.gz and .whl)
python -m build

# Check the package
twine check dist/*

# Upload to Test PyPI (for testing)
twine upload --repository testpypi dist/*

# Upload to PyPI (for real)
twine upload dist/*

# Install from Test PyPI
pip install --index-url https://test.pypi.org/simple/ my-awesome-library

# Install locally in development mode
pip install -e ".[dev]"

# --- Modern alternative: uv (much faster than pip) ---
# uv is a Rust-based Python package manager that is significantly faster.
# Install: curl -LsSf https://astral.sh/uv/install.sh | sh
# uv pip install -e ".[dev]"
# uv venv .venv              # Create virtual environment
# uv pip compile pyproject.toml -o requirements.txt  # Lock deps
"""
print("Build commands:")
print(BUILD_COMMANDS)


# --- Version management with dynamic versioning ---
import importlib.metadata

# Get version of an installed package
try:
    version = importlib.metadata.version("pip")
    print(f"pip version: {version}")
except importlib.metadata.PackageNotFoundError:
    print("Package not found")


# --- Entry points (CLI tools, plugins) ---
# src/my_library/cli.py example:
CLI_PY = '''
"""Command-line interface for my-awesome-library."""

import argparse
from . import __version__
from .core import process_data

def main():
    parser = argparse.ArgumentParser(description="My CLI Tool")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    parser.add_argument("input", help="Input file path")
    parser.add_argument("-o", "--output", help="Output file path")
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args()
    print(f"Processing {args.input}...")

if __name__ == "__main__":
    main()
'''
\`\`\`

### Exercises

**1. Create a complete package**
Create a directory \`mylib/\` with the minimal structure: \`pyproject.toml\`, \`src/mylib/__init__.py\` with a \`greet(name)\` function, and \`tests/test_mylib.py\` with one test.

<details>
<summary>Hint</summary>

The \`pyproject.toml\` needs at minimum: \`[build-system]\` with setuptools, and \`[project]\` with \`name\`, \`version\`, and \`requires-python\`. The test imports \`from mylib import greet\` after installing in editable mode.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# File layout (create these files in your terminal):
#
# mylib/
#   pyproject.toml
#   src/
#     mylib/
#       __init__.py
#   tests/
#     test_mylib.py

# pyproject.toml contents:
PYPROJECT = """
[build-system]
requires = ["setuptools>=68.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mylib"
version = "0.1.0"
requires-python = ">=3.10"

[tool.setuptools.packages.find]
where = ["src"]
"""

# src/mylib/__init__.py contents:
INIT = """
def greet(name: str) -> str:
    return f"Hello, {name}!"
"""

# tests/test_mylib.py contents:
TESTS = """
from mylib import greet

def test_greet():
    assert greet("Alice") == "Hello, Alice!"
"""

# Terminal: pip install -e . && pytest
print("Package structure defined. Run: pip install -e . && pytest")
\`\`\`

Expected output:
\`\`\`
Package structure defined. Run: pip install -e . && pytest
\`\`\`

</details>

**2. Install in editable mode**
Install the package you created in exercise 1 in editable (development) mode so changes to the source are immediately reflected without reinstalling.

<details>
<summary>Hint</summary>

Run \`pip install -e .\` from the package root directory (where \`pyproject.toml\` lives). The \`-e\` flag creates a link to the source directory instead of copying files.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# These are terminal commands, not Python:
#
# cd mylib/
# pip install -e .
#
# Verify it works:
# python -c "from mylib import greet; print(greet('World'))"
#
# Output: Hello, World!
#
# Now edit src/mylib/__init__.py and the change takes effect immediately
# without reinstalling.

# To confirm installation in Python:
import importlib.util
spec = importlib.util.find_spec("mylib")
print(f"mylib installed: {spec is not None}")
\`\`\`

Expected output (after installing):
\`\`\`
mylib installed: True
\`\`\`

</details>

**3. Add a CLI entry point**
Add a \`say_hello\` CLI command to the package from exercise 1. After reinstalling, the command \`say_hello Alice\` should print \`Hello, Alice!\`.

<details>
<summary>Hint</summary>

Add \`[project.scripts]\` to \`pyproject.toml\`: \`say-hello = "mylib.cli:main"\`. Create \`src/mylib/cli.py\` with a \`main()\` that uses \`argparse\` to read a name argument.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Add to pyproject.toml:
# [project.scripts]
# say-hello = "mylib.cli:main"

# Create src/mylib/cli.py:
CLI = """
import argparse
from mylib import greet

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("name", help="Name to greet")
    args = parser.parse_args()
    print(greet(args.name))

if __name__ == "__main__":
    main()
"""

# Terminal:
# pip install -e .
# say-hello Alice

print("CLI entry point defined.")
print("After installing: say-hello Alice  ->  Hello, Alice!")
\`\`\`

Expected output:
\`\`\`
CLI entry point defined.
After installing: say-hello Alice  ->  Hello, Alice!
\`\`\`

</details>

**4. Publish to Test PyPI**
Build your package and publish it to Test PyPI. This exercise is terminal-based.

<details>
<summary>Hint</summary>

Install \`build\` and \`twine\`. Run \`python -m build\` to create \`dist/\`. Run \`twine check dist/*\` to verify. Then \`twine upload --repository testpypi dist/*\` to publish.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
# Terminal commands:
#
# pip install build twine
# python -m build
# twine check dist/*
# twine upload --repository testpypi dist/*
#
# Install from Test PyPI to verify:
# pip install --index-url https://test.pypi.org/simple/ mylib
#
# You need a Test PyPI account at https://test.pypi.org/account/register/

print("See terminal commands above to publish to Test PyPI.")
\`\`\`

Expected output:
\`\`\`
See terminal commands above to publish to Test PyPI.
\`\`\`

</details>

**Why it matters:** Proper packaging enables code sharing, reproducible deployments, and clean dependency management. Every production Python project should have a well-structured package configuration.

> **Role connection:** All developers package code for deployment. Platform Engineers build internal packages for shared functionality. DevOps Engineers automate package building in CI/CD.

---

## 6. Design Patterns

Design patterns are reusable solutions to common software design problems. Python's dynamic nature means many patterns look different (often simpler) than in statically typed languages.

\`\`\`python
# =============================================================
# Design Patterns – Comprehensive Example
# =============================================================

from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Callable, Protocol
import functools
import threading

# --- Singleton Pattern ---
class SingletonMeta(type):
    """Thread-safe singleton metaclass."""
    _instances: dict[type, Any] = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
            return cls._instances[cls]


class AppConfig(metaclass=SingletonMeta):
    """Application configuration singleton."""

    def __init__(self):
        self._settings: dict[str, Any] = {}

    def set(self, key: str, value: Any) -> None:
        self._settings[key] = value

    def get(self, key: str, default: Any = None) -> Any:
        return self._settings.get(key, default)


config1 = AppConfig()
config1.set("debug", True)
config2 = AppConfig()
print(f"Singleton: {config2.get('debug')}")  # True
print(f"Same instance: {config1 is config2}")  # True


# --- Factory Pattern ---
class Serializer(ABC):
    @abstractmethod
    def serialize(self, data: dict) -> str: ...

    @abstractmethod
    def deserialize(self, text: str) -> dict: ...


class JSONSerializer(Serializer):
    def serialize(self, data: dict) -> str:
        import json
        return json.dumps(data, indent=2)

    def deserialize(self, text: str) -> dict:
        import json
        return json.loads(text)


class XMLSerializer(Serializer):
    def serialize(self, data: dict) -> str:
        items = "".join(f"<{k}>{v}</{k}>" for k, v in data.items())
        return f"<root>{items}</root>"

    def deserialize(self, text: str) -> dict:
        import re
        return dict(re.findall(r"<(\\w+)>(.*?)</\\1>", text))


class YAMLSerializer(Serializer):
    def serialize(self, data: dict) -> str:
        return "\\n".join(f"{k}: {v}" for k, v in data.items())

    def deserialize(self, text: str) -> dict:
        return dict(line.split(": ", 1) for line in text.strip().split("\\n"))


class SerializerFactory:
    """Factory that creates serializers by format name."""
    _serializers: dict[str, type[Serializer]] = {
        "json": JSONSerializer,
        "xml": XMLSerializer,
        "yaml": YAMLSerializer,
    }

    @classmethod
    def register(cls, name: str, serializer_class: type[Serializer]) -> None:
        cls._serializers[name] = serializer_class

    @classmethod
    def create(cls, format_name: str) -> Serializer:
        serializer_class = cls._serializers.get(format_name)
        if serializer_class is None:
            raise ValueError(f"Unknown format: {format_name}")
        return serializer_class()


for fmt in ["json", "xml", "yaml"]:
    s = SerializerFactory.create(fmt)
    result = s.serialize({"name": "Alice", "age": "30"})
    print(f"  {fmt}: {result[:50]}...")


# --- Observer Pattern ---
class Event:
    """Simple event system (observer pattern)."""

    def __init__(self):
        self._handlers: list[Callable] = []

    def subscribe(self, handler: Callable) -> None:
        self._handlers.append(handler)

    def unsubscribe(self, handler: Callable) -> None:
        self._handlers.remove(handler)

    def emit(self, *args, **kwargs) -> None:
        for handler in self._handlers:
            handler(*args, **kwargs)


@dataclass
class UserStore:
    """Store that emits events on changes."""
    on_created: Event = field(default_factory=Event)
    on_deleted: Event = field(default_factory=Event)

    def __post_init__(self):
        self._users: dict[int, dict] = {}

    def create(self, user_id: int, data: dict) -> None:
        self._users[user_id] = data
        self.on_created.emit(user_id, data)

    def delete(self, user_id: int) -> None:
        user = self._users.pop(user_id, None)
        if user:
            self.on_deleted.emit(user_id, user)


store = UserStore()
store.on_created.subscribe(lambda uid, data: print(f"  Created user {uid}: {data}"))
store.on_created.subscribe(lambda uid, data: print(f"  Logging: new user {uid}"))
store.on_deleted.subscribe(lambda uid, data: print(f"  Deleted user {uid}"))

store.create(1, {"name": "Alice"})
store.create(2, {"name": "Bob"})
store.delete(1)
#   Created user 1: {'name': 'Alice'}
#   Logging: new user 1
#   Created user 2: {'name': 'Bob'}
#   Logging: new user 2
#   Deleted user 1


# --- Strategy Pattern ---
class CompressionStrategy(Protocol):
    """Protocol defining the compression interface."""
    def compress(self, data: bytes) -> bytes: ...
    def decompress(self, data: bytes) -> bytes: ...


class NoCompression:
    def compress(self, data: bytes) -> bytes:
        return data

    def decompress(self, data: bytes) -> bytes:
        return data


class ZlibCompression:
    def compress(self, data: bytes) -> bytes:
        import zlib
        return zlib.compress(data)

    def decompress(self, data: bytes) -> bytes:
        import zlib
        return zlib.decompress(data)


@dataclass
class DataStore:
    """Store that uses pluggable compression strategy."""
    strategy: CompressionStrategy = field(default_factory=NoCompression)
    _data: dict[str, bytes] = field(default_factory=dict)

    def save(self, key: str, value: str) -> None:
        compressed = self.strategy.compress(value.encode())
        self._data[key] = compressed
        print(f"  Saved '{key}': {len(value)} -> {len(compressed)} bytes")

    def load(self, key: str) -> str:
        compressed = self._data[key]
        return self.strategy.decompress(compressed).decode()


store_plain = DataStore(strategy=NoCompression())
store_compressed = DataStore(strategy=ZlibCompression())

test_data = "Hello, World! " * 100
store_plain.save("test", test_data)
store_compressed.save("test", test_data)

assert store_plain.load("test") == test_data
assert store_compressed.load("test") == test_data


# --- Decorator Pattern (structural, not Python decorator) ---
class TextProcessor(Protocol):
    def process(self, text: str) -> str: ...


class BasicProcessor:
    def process(self, text: str) -> str:
        return text


class UpperCaseDecorator:
    def __init__(self, wrapped: TextProcessor):
        self._wrapped = wrapped

    def process(self, text: str) -> str:
        return self._wrapped.process(text).upper()


class TrimDecorator:
    def __init__(self, wrapped: TextProcessor):
        self._wrapped = wrapped

    def process(self, text: str) -> str:
        return self._wrapped.process(text).strip()


class CensorDecorator:
    def __init__(self, wrapped: TextProcessor, words: list[str]):
        self._wrapped = wrapped
        self._words = words

    def process(self, text: str) -> str:
        result = self._wrapped.process(text)
        for word in self._words:
            result = result.replace(word, "***")
        return result


processor = CensorDecorator(
    UpperCaseDecorator(
        TrimDecorator(BasicProcessor())
    ),
    words=["BAD", "EVIL"]
)
result = processor.process("  this is bad and evil text  ")
print(f"Processed: {result}")
# Processed: THIS IS *** AND *** TEXT
\`\`\`

### Exercises

**1. SQL query builder (Builder pattern)**
Implement a \`QueryBuilder\` class with \`select\`, \`from_table\`, \`where\`, and \`build\` methods that construct a SQL SELECT string. Each method returns \`self\` for chaining.

<details>
<summary>Hint</summary>

Store parts as instance variables (\`self._columns\`, \`self._table\`, \`self._conditions\`). The \`build()\` method assembles them into a SQL string. Return \`self\` from all mutating methods.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class QueryBuilder:
    def __init__(self):
        self._columns = ["*"]
        self._table = ""
        self._conditions = []

    def select(self, *columns: str) -> "QueryBuilder":
        self._columns = list(columns)
        return self

    def from_table(self, table: str) -> "QueryBuilder":
        self._table = table
        return self

    def where(self, condition: str) -> "QueryBuilder":
        self._conditions.append(condition)
        return self

    def build(self) -> str:
        cols = ", ".join(self._columns)
        sql = f"SELECT {cols} FROM {self._table}"
        if self._conditions:
            sql += " WHERE " + " AND ".join(self._conditions)
        return sql

query = (
    QueryBuilder()
    .select("id", "name", "email")
    .from_table("users")
    .where("active = true")
    .where("age > 18")
    .build()
)
print(query)
\`\`\`

Expected output:
\`\`\`
SELECT id, name, email FROM users WHERE active = true AND age > 18
\`\`\`

</details>

**2. Chain of Responsibility**
Implement a request processing pipeline using Chain of Responsibility. Each handler checks a condition; if it can handle the request it does, otherwise it passes to the next handler.

<details>
<summary>Hint</summary>

Give each handler a \`set_next(handler)\` method and a \`handle(request)\` method. If the handler cannot process the request, call \`self._next.handle(request)\` (if \`_next\` is set).

</details>

<details>
<summary>Answer</summary>

\`\`\`python
from __future__ import annotations
from abc import ABC, abstractmethod

class Handler(ABC):
    def __init__(self):
        self._next: Handler | None = None

    def set_next(self, handler: Handler) -> Handler:
        self._next = handler
        return handler

    def handle(self, request: int) -> str | None:
        if self._next:
            return self._next.handle(request)
        return None

class SmallHandler(Handler):
    def handle(self, request: int) -> str | None:
        if request < 10:
            return f"SmallHandler: handled {request}"
        return super().handle(request)

class MediumHandler(Handler):
    def handle(self, request: int) -> str | None:
        if request < 100:
            return f"MediumHandler: handled {request}"
        return super().handle(request)

class LargeHandler(Handler):
    def handle(self, request: int) -> str | None:
        return f"LargeHandler: handled {request}"

small = SmallHandler()
medium = MediumHandler()
large = LargeHandler()
small.set_next(medium).set_next(large)

for value in [5, 50, 500]:
    print(small.handle(value))
\`\`\`

Expected output:
\`\`\`
SmallHandler: handled 5
MediumHandler: handled 50
LargeHandler: handled 500
\`\`\`

</details>

**3. Repository with interchangeable backends**
Implement the Repository pattern with two concrete backends: \`InMemoryRepository\` and a \`FileRepository\` that saves to a JSON file. Both should share the same interface.

<details>
<summary>Hint</summary>

Define a \`Repository\` Protocol (or ABC) with \`get\`, \`save\`, \`delete\`, and \`list_all\` methods. The file backend reads/writes the entire store as JSON on each operation.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import json
from pathlib import Path
from typing import Protocol

class Repository(Protocol):
    def get(self, id: int) -> dict | None: ...
    def save(self, entity: dict) -> None: ...
    def delete(self, id: int) -> None: ...
    def list_all(self) -> list[dict]: ...

class InMemoryRepository:
    def __init__(self):
        self._store: dict[int, dict] = {}
    def get(self, id): return self._store.get(id)
    def save(self, entity): self._store[entity["id"]] = entity
    def delete(self, id): self._store.pop(id, None)
    def list_all(self): return list(self._store.values())

class FileRepository:
    def __init__(self, path: str):
        self._path = Path(path)
        if not self._path.exists():
            self._path.write_text("{}")
    def _load(self):
        return {int(k): v for k, v in json.loads(self._path.read_text()).items()}
    def _save(self, store):
        self._path.write_text(json.dumps(store))
    def get(self, id): return self._load().get(id)
    def save(self, entity):
        s = self._load(); s[entity["id"]] = entity; self._save(s)
    def delete(self, id):
        s = self._load(); s.pop(id, None); self._save(s)
    def list_all(self): return list(self._load().values())

def test_repo(repo: Repository):
    repo.save({"id": 1, "name": "Alice"})
    repo.save({"id": 2, "name": "Bob"})
    print(repo.get(1))
    print(repo.list_all())
    repo.delete(1)
    print(repo.list_all())

print("In-memory:"); test_repo(InMemoryRepository())
print("File:"); test_repo(FileRepository("/tmp/test_repo.json"))
Path("/tmp/test_repo.json").unlink(missing_ok=True)
\`\`\`

Expected output:
\`\`\`
In-memory:
{'id': 1, 'name': 'Alice'}
[{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]
[{'id': 2, 'name': 'Bob'}]
File:
{'id': 1, 'name': 'Alice'}
[{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]
[{'id': 2, 'name': 'Bob'}]
\`\`\`

</details>

**4. Plugin system with Factory and __init_subclass__**
Build a plugin system where plugins self-register using \`__init_subclass__\` and can be retrieved and instantiated via a \`PluginFactory\`.

<details>
<summary>Hint</summary>

Combine the \`Plugin.__init_subclass__\` pattern (to register) with a \`PluginFactory.create(name)\` classmethod (to instantiate). Each subclass declares a \`name\` class attribute.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
class Plugin:
    _registry: dict[str, type] = {}
    name: str = ""

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if cls.name:
            Plugin._registry[cls.name] = cls

    def run(self, data: str) -> str:
        raise NotImplementedError

class PluginFactory:
    @classmethod
    def create(cls, name: str) -> Plugin:
        plugin_class = Plugin._registry.get(name)
        if not plugin_class:
            raise ValueError(f"Plugin '{name}' not found")
        return plugin_class()

    @classmethod
    def list_plugins(cls) -> list[str]:
        return list(Plugin._registry.keys())

class UpperPlugin(Plugin):
    name = "upper"
    def run(self, data): return data.upper()

class ReversePlugin(Plugin):
    name = "reverse"
    def run(self, data): return data[::-1]

print(PluginFactory.list_plugins())
print(PluginFactory.create("upper").run("hello"))
print(PluginFactory.create("reverse").run("hello"))
\`\`\`

Expected output:
\`\`\`
['upper', 'reverse']
HELLO
olleh
\`\`\`

</details>

**Why it matters:** Design patterns provide proven solutions to recurring problems. In Python, many patterns are simplified thanks to first-class functions, protocols, and dynamic typing. Knowing when and how to apply them leads to maintainable, extensible code.

\`\`\`mermaid
graph LR
    A[Client] --> B[Factory]
    B --> C[Product A]
    B --> D[Product B]
    B --> E[Product C]

    F[Subject] -->|notify| G[Observer 1]
    F -->|notify| H[Observer 2]
    F -->|notify| I[Observer 3]

    J[Context] --> K[Strategy Interface]
    K --> L[Strategy A]
    K --> M[Strategy B]
\`\`\`

> **Role connection:** Backend Developers use patterns for API design and middleware. Data Engineers use strategy and factory patterns for configurable pipelines.

---

## 7. Concurrency

Python offers multiple concurrency models: threading (for I/O-bound tasks), multiprocessing (for CPU-bound tasks), and asyncio (for I/O-bound tasks with an event loop). Understanding the Global Interpreter Lock (GIL) is key to choosing the right approach.

### The GIL (Global Interpreter Lock)

The GIL ensures only one thread executes Python bytecode at a time. This means threads do NOT provide true parallelism for CPU-bound work. However, threads DO release the GIL during I/O operations, making them useful for I/O-bound tasks.

### GIL Concurrency Model

\`\`\`mermaid
flowchart TB
    T1[Thread 1 - CPU work] --> GIL{GIL}
    T2[Thread 2 - waiting] --> GIL
    T3[Thread 3 - waiting] --> GIL
    GIL -->|Holds lock| E1[Execute bytecode]
    E1 --> IO{I/O operation?}
    IO -->|Yes| R[Release GIL]
    R --> T2
    IO -->|No| TICK{Interval check?}
    TICK -->|Yes| SW[Release and re-acquire GIL]
    SW --> GIL
    TICK -->|No| E1
\`\`\`

**Emerging: PEP 703 (Free-threaded Python).** Python 3.13+ includes an experimental build with the GIL disabled (\`--disable-gil\` / \`-X gil=0\`). This "free-threaded" mode allows true multi-threaded parallelism for CPU-bound work. As of 2026, it is experimental and opt-in, but it signals the long-term direction for Python concurrency. Keep an eye on adoption by key libraries (NumPy, etc.) before using it in production.

\`\`\`mermaid
graph TD
    A[Concurrency Need] --> B{CPU-bound or I/O-bound?}
    B -->|CPU-bound| C[multiprocessing]
    B -->|I/O-bound| D{Async compatible?}
    D -->|Yes| E[asyncio]
    D -->|No| F[threading]
    C --> G[True parallelism - bypasses GIL]
    E --> H[Single thread - event loop]
    F --> I[Multiple threads - GIL limits CPU parallelism]
\`\`\`

\`\`\`python
# =============================================================
# Concurrency – Comprehensive Example
# =============================================================

import threading
import multiprocessing
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import time
import queue

# --- Threading: I/O-bound tasks ---
def download_page(url: str) -> dict:
    """Simulate downloading a web page."""
    time.sleep(0.5)  # Simulate network I/O
    return {"url": url, "size": len(url) * 100}

# Sequential (slow)
def download_sequential(urls: list[str]) -> list[dict]:
    return [download_page(url) for url in urls]

# Threaded (fast for I/O)
def download_threaded(urls: list[str]) -> list[dict]:
    results = []
    lock = threading.Lock()

    def worker(url):
        result = download_page(url)
        with lock:
            results.append(result)

    threads = [threading.Thread(target=worker, args=(url,)) for url in urls]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    return results


urls = [f"https://example.com/page/{i}" for i in range(10)]

start = time.perf_counter()
download_sequential(urls[:3])
seq_time = time.perf_counter() - start

start = time.perf_counter()
download_threaded(urls[:3])
thread_time = time.perf_counter() - start

print(f"Sequential: {seq_time:.2f}s")
print(f"Threaded: {thread_time:.2f}s")
print(f"Speedup: {seq_time/thread_time:.1f}x")


# --- ThreadPoolExecutor (preferred API) ---
def fetch_with_pool(urls: list[str], max_workers: int = 5) -> list[dict]:
    """Fetch URLs using a thread pool."""
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_url = {
            executor.submit(download_page, url): url
            for url in urls
        }
        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as e:
                print(f"  Error for {url}: {e}")
    return results

results = fetch_with_pool(urls[:5])
print(f"Pool results: {len(results)} pages fetched")


# --- Multiprocessing: CPU-bound tasks ---
def cpu_intensive(n: int) -> int:
    """CPU-bound: calculate sum of squares."""
    return sum(i * i for i in range(n))

def compute_sequential(items: list[int]) -> list[int]:
    return [cpu_intensive(n) for n in items]

def compute_parallel(items: list[int]) -> list[int]:
    with ProcessPoolExecutor(max_workers=4) as executor:
        return list(executor.map(cpu_intensive, items))

items = [5_000_000] * 8

start = time.perf_counter()
compute_sequential(items[:4])
seq_time = time.perf_counter() - start

start = time.perf_counter()
compute_parallel(items[:4])
par_time = time.perf_counter() - start

print(f"\\nCPU-bound sequential: {seq_time:.2f}s")
print(f"CPU-bound parallel: {par_time:.2f}s")
print(f"Speedup: {seq_time/par_time:.1f}x")


# --- Thread synchronization ---
class ThreadSafeCounter:
    """Counter that can be safely incremented from multiple threads."""

    def __init__(self):
        self._count = 0
        self._lock = threading.Lock()

    def increment(self) -> None:
        with self._lock:
            self._count += 1

    @property
    def value(self) -> int:
        with self._lock:
            return self._count


counter = ThreadSafeCounter()

def worker():
    for _ in range(100_000):
        counter.increment()

threads = [threading.Thread(target=worker) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"Thread-safe counter: {counter.value}")  # Always 400000


# --- Producer-Consumer pattern ---
def producer_consumer_demo():
    """Classic producer-consumer with a thread-safe queue."""
    task_queue: queue.Queue = queue.Queue(maxsize=10)
    results: list = []
    lock = threading.Lock()

    def producer(items: list, q: queue.Queue):
        for item in items:
            q.put(item)
            print(f"  Produced: {item}")
            time.sleep(0.1)
        q.put(None)  # Sentinel value

    def consumer(q: queue.Queue, out: list):
        while True:
            item = q.get()
            if item is None:
                q.put(None)  # Pass sentinel to other consumers
                break
            processed = item * 2
            with lock:
                out.append(processed)
            print(f"  Consumed: {item} -> {processed}")
            q.task_done()

    items = list(range(5))
    prod = threading.Thread(target=producer, args=(items, task_queue))
    cons1 = threading.Thread(target=consumer, args=(task_queue, results))
    cons2 = threading.Thread(target=consumer, args=(task_queue, results))

    prod.start()
    cons1.start()
    cons2.start()

    prod.join()
    cons1.join()
    cons2.join()

    print(f"  Results: {sorted(results)}")

print("\\nProducer-Consumer:")
producer_consumer_demo()


# --- GIL demonstration ---
def gil_demo():
    """Show that threads don't help with CPU-bound work."""
    n = 10_000_000

    def count_up(limit):
        i = 0
        while i < limit:
            i += 1

    # Single thread
    start = time.perf_counter()
    count_up(n)
    single = time.perf_counter() - start

    # Two threads (should NOT be faster due to GIL)
    start = time.perf_counter()
    t1 = threading.Thread(target=count_up, args=(n // 2,))
    t2 = threading.Thread(target=count_up, args=(n // 2,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    threaded = time.perf_counter() - start

    print(f"  Single thread: {single:.2f}s")
    print(f"  Two threads: {threaded:.2f}s")
    print(f"  Threads {'slower' if threaded >= single else 'faster'} for CPU work (GIL)")

print("\\nGIL demo:")
gil_demo()
\`\`\`

### Exercises

**1. Parallel web scraper**
Build a function that "downloads" 20 URLs using \`ThreadPoolExecutor\`, then processes each result (compute word count of the URL string) using \`ProcessPoolExecutor\`.

<details>
<summary>Hint</summary>

Use \`ThreadPoolExecutor\` to collect all results, then pass the results list to \`ProcessPoolExecutor.map(process_fn, results)\`. The processing step simulates CPU work.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def download(url: str) -> str:
    time.sleep(0.1)  # Simulate I/O
    return f"Content of {url}: " + "word " * 100

def count_words(content: str) -> int:
    return len(content.split())  # Simulate CPU work

urls = [f"https://example.com/page/{i}" for i in range(20)]

# Phase 1: I/O-bound downloads with threads
with ThreadPoolExecutor(max_workers=10) as executor:
    contents = list(executor.map(download, urls))

# Phase 2: CPU-bound processing with processes
with ProcessPoolExecutor(max_workers=4) as executor:
    word_counts = list(executor.map(count_words, contents))

print(f"Downloaded: {len(contents)} pages")
print(f"Total words: {sum(word_counts)}")
\`\`\`

Expected output:
\`\`\`
Downloaded: 20 pages
Total words: 2040
\`\`\`

</details>

**2. Thread-safe LRU cache**
Implement a thread-safe LRU (Least Recently Used) cache using \`threading.Lock\` and \`collections.OrderedDict\`.

<details>
<summary>Hint</summary>

Use \`OrderedDict\` to maintain insertion order. On \`get\`, move the accessed key to the end with \`move_to_end\`. On \`set\`, if at capacity, pop the first (oldest) item. Wrap all mutations with \`self._lock\`.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import threading
from collections import OrderedDict

class ThreadSafeLRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self._cache: OrderedDict = OrderedDict()
        self._lock = threading.Lock()

    def get(self, key):
        with self._lock:
            if key not in self._cache:
                return None
            self._cache.move_to_end(key)
            return self._cache[key]

    def set(self, key, value):
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
            self._cache[key] = value
            if len(self._cache) > self.capacity:
                self._cache.popitem(last=False)

cache = ThreadSafeLRUCache(capacity=3)
cache.set("a", 1)
cache.set("b", 2)
cache.set("c", 3)
print(cache.get("a"))  # 1 (moves 'a' to most recent)
cache.set("d", 4)      # evicts 'b' (least recently used)
print(cache.get("b"))  # None (evicted)
print(cache.get("d"))  # 4
\`\`\`

Expected output:
\`\`\`
1
None
4
\`\`\`

</details>

**3. Worker pool with multiprocessing.Queue**
Create a worker pool where a main process puts tasks into a \`multiprocessing.Queue\`, 4 worker processes consume and process the tasks, and results are collected in a result queue.

<details>
<summary>Hint</summary>

Use \`multiprocessing.Queue()\` for both tasks and results. Pass both queues as arguments to the worker function. Use sentinel values (\`None\`) to signal workers to stop. Join all processes after putting the sentinels.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import multiprocessing

def worker(task_q, result_q):
    while True:
        task = task_q.get()
        if task is None:
            break
        result_q.put(task * task)

if __name__ == "__main__":
    task_queue = multiprocessing.Queue()
    result_queue = multiprocessing.Queue()

    num_workers = 4
    processes = [
        multiprocessing.Process(target=worker, args=(task_queue, result_queue))
        for _ in range(num_workers)
    ]
    for p in processes:
        p.start()

    tasks = list(range(1, 11))
    for t in tasks:
        task_queue.put(t)
    for _ in range(num_workers):
        task_queue.put(None)

    for p in processes:
        p.join()

    results = []
    while not result_queue.empty():
        results.append(result_queue.get())

    print(f"Results: {sorted(results)}")
\`\`\`

Expected output:
\`\`\`
Results: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
\`\`\`

</details>

**4. Benchmark threading vs multiprocessing vs asyncio**
Write three versions of the same I/O-bound task (simulated with \`sleep\`) — one using threading, one using multiprocessing, one using asyncio — and compare their wall-clock times for 20 tasks.

<details>
<summary>Hint</summary>

For a fair comparison, each version should perform 20 tasks that each take 0.1s. Threading and asyncio should finish in ~0.1s total (concurrent). Multiprocessing adds process spawn overhead. Use \`time.perf_counter()\` for timing.

</details>

<details>
<summary>Answer</summary>

\`\`\`python
import time
import threading
import asyncio
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def io_task(_):
    time.sleep(0.1)
    return 1

async def async_io_task(_):
    await asyncio.sleep(0.1)
    return 1

N = 20

# Threading
start = time.perf_counter()
with ThreadPoolExecutor(max_workers=N) as ex:
    list(ex.map(io_task, range(N)))
thread_time = time.perf_counter() - start

# Multiprocessing
start = time.perf_counter()
with ProcessPoolExecutor(max_workers=4) as ex:
    list(ex.map(io_task, range(N)))
mp_time = time.perf_counter() - start

# Asyncio
async def run_async():
    return await asyncio.gather(*[async_io_task(i) for i in range(N)])

start = time.perf_counter()
asyncio.run(run_async())
async_time = time.perf_counter() - start

print(f"Threading:       {thread_time:.2f}s")
print(f"Multiprocessing: {mp_time:.2f}s")
print(f"Asyncio:         {async_time:.2f}s")
\`\`\`

Expected output (approximate):
\`\`\`
Threading:       0.11s
Multiprocessing: 0.60s
Asyncio:         0.10s
\`\`\`

</details>

**Why it matters:** Concurrency is essential for building performant applications. Choosing the wrong concurrency model (threads for CPU-bound work, multiprocessing for simple I/O) leads to worse performance, not better. Understanding the GIL is critical for Python developers.

> **Role connection:** Backend Developers use concurrency for handling multiple requests. Data Engineers parallelize data processing pipelines. DevOps Engineers run concurrent infrastructure operations.

---

## 8. Modern Python 3.12+ Features

Senior engineers should be familiar with recent additions to the language and standard library:

### Exception Groups (PEP 654, Python 3.11+)

Exception groups let you raise and handle multiple exceptions simultaneously, which is essential for concurrent code where multiple tasks can fail at once.

\`\`\`python
# Raising multiple exceptions
def process_batch(items):
    errors = []
    results = []
    for item in items:
        try:
            results.append(int(item))
        except ValueError as e:
            errors.append(e)
    if errors:
        raise ExceptionGroup("batch processing failed", errors)
    return results

# Handling exception groups with except*
try:
    process_batch(["1", "abc", "3", "def"])
except* ValueError as eg:
    print(f"Caught {len(eg.exceptions)} ValueErrors")
    for e in eg.exceptions:
        print(f"  - {e}")
\`\`\`

### tomllib (Python 3.11+)

TOML parsing is now in the standard library. No need for third-party packages to read \`pyproject.toml\` or config files.

\`\`\`python
import tomllib
from pathlib import Path

# Read a TOML config file
with Path("pyproject.toml").open("rb") as f:
    config = tomllib.load(f)

# Or parse a TOML string
data = tomllib.loads("""
[database]
host = "localhost"
port = 5432
""")
print(data["database"]["host"])  # localhost
\`\`\`

### StrEnum (Python 3.11+)

\`StrEnum\` members are strings, making them ideal for API status codes, config values, etc.

\`\`\`python
from enum import StrEnum

class Color(StrEnum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"

# StrEnum values work as plain strings
print(f"Favorite color: {Color.RED}")  # Favorite color: red
assert Color.RED == "red"  # True — unlike regular Enum
\`\`\`

---

## Summary

You have covered eight advanced Python topics:

| Topic | Key Takeaway |
|-------|-------------|
| Async/Await | Cooperative multitasking for I/O-bound concurrency; use \`asyncio.gather\` and \`TaskGroup\` |
| Metaclasses | Classes of classes; prefer \`__init_subclass__\` for simpler cases |
| Memory Management | Reference counting + GC; use \`__slots__\` and weak references to optimize |
| Profiling | Measure first, optimize second; cProfile for functions, line_profiler for lines |
| Packaging | \`pyproject.toml\` is the standard; use \`build\`, \`twine\`, or \`uv\` for distribution |
| Design Patterns | Singleton, Factory, Observer, Strategy, Decorator -- simpler in Python |
| Concurrency | Threading for I/O, multiprocessing for CPU, asyncio for async I/O; PEP 703 free-threaded mode is emerging |
| Modern Features | Exception groups, \`tomllib\`, \`StrEnum\`, PEP 695 type syntax |

These topics represent the knowledge expected of a senior Python developer. Mastery comes from applying them in real projects and understanding the trade-offs of each approach.

---

## Recommended Videos — Senior Level

- **Computerphile** — "Secret Key Exchange (Diffie-Hellman)" — https://www.youtube.com/watch?v=NmM9HA2MQGI

> The Diffie-Hellman video is an excellent mental model for the kind of mathematical reasoning that underpins cryptographic Python libraries. The colour-mixing analogy used to explain key exchange maps directly to the modular exponentiation operations in Python's \`secrets\` and \`cryptography\` packages.
`,
}
