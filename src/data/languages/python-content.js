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
print(f"age: {age}, type: {type(age)}")              # <class 'int'>
print(f"population: {population:,}")                  # 7,900,000,000

# --- Float ---
pi = 3.141592653589793
temperature = -40.0
scientific = 6.022e23  # Avogadro's number in scientific notation
print(f"pi: {pi}, type: {type(pi)}")                  # <class 'float'>

# Floating-point precision caveat
result = 0.1 + 0.2
print(f"0.1 + 0.2 = {result}")          # 0.30000000000000004
print(f"rounded: {round(result, 2)}")    # 0.3

# --- String ---
name = "Alice"
greeting = 'Hello, World!'
multiline = """This is a
multi-line string."""
raw = r"C:\\Users\\alice"  # Raw string – backslashes are literal
print(f"name: {name}, length: {len(name)}")

# --- Boolean ---
is_active = True
is_deleted = False
print(f"is_active: {is_active}, type: {type(is_active)}")
print(f"True + True = {True + True}")   # 2 (bool is subclass of int)

# --- NoneType ---
result = None
print(f"result: {result}, type: {type(result)}")

# Always use 'is' to compare with None, not '=='
if result is None:
    print("result has not been set yet")

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

# Truthy / Falsy values
falsy_values = [0, 0.0, "", [], {}, set(), None, False]
for val in falsy_values:
    assert not val, f"{val!r} should be falsy"
print("All falsy values confirmed!")

# EXERCISE:
# 1. Create a variable holding your birth year as an int.
# 2. Calculate your approximate age using 2026 - birth_year.
# 3. Store the result as a string with the message "I am X years old."
# 4. Check whether the age variable is an instance of int.
# 5. Experiment: what happens when you call int(3.9)? Is it 3 or 4?
\`\`\`

**Why it matters:** Every value in Python has a type, and understanding types prevents subtle bugs. Knowing that \`0.1 + 0.2 != 0.3\` in floating-point arithmetic, or that \`None\` should be compared with \`is\` rather than \`==\`, saves hours of debugging.

> **Role connection:** Data Engineers and Data Scientists work with numeric types daily when processing datasets. AI Engineers must understand type coercion when handling model inputs and outputs.

---

## 2. Control Flow

Control flow determines the order in which statements execute. Python uses indentation (not braces) to define blocks, which enforces readable code by design.

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

print(f"Score {score} -> Grade {grade}")  # Grade B

# Ternary (conditional expression)
status = "pass" if score >= 60 else "fail"
print(f"Status: {status}")

# Truthy/Falsy in conditions
user_input = ""
if not user_input:
    print("No input provided")  # This prints because "" is falsy

# --- for loops ---
# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"  Fruit: {fruit}")

# Using enumerate to get index + value
for index, fruit in enumerate(fruits, start=1):
    print(f"  {index}. {fruit}")

# Iterating over a dictionary
user = {"name": "Alice", "age": 30, "city": "Stockholm"}
for key, value in user.items():
    print(f"  {key}: {value}")

# --- range() ---
# range(stop), range(start, stop), range(start, stop, step)
print("Counting by 3:", list(range(0, 16, 3)))  # [0, 3, 6, 9, 12, 15]

# Reverse iteration
for i in range(5, 0, -1):
    print(f"  Countdown: {i}")

# --- while loops ---
attempts = 0
max_attempts = 5
while attempts < max_attempts:
    attempts += 1
    if attempts == 3:
        print(f"  Attempt {attempts}: found it!")
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

# --- Nested loops with break ---
print("Finding first pair summing to 10:")
found = False
for i in range(1, 10):
    for j in range(1, 10):
        if i + j == 10 and i <= j:
            print(f"  {i} + {j} = 10")
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
        print("Stopping...")
    case _:
        print("Unknown command")

# EXERCISE:
# 1. Write a for loop that prints the multiplication table for 7 (7x1 through 7x12).
# 2. Write a while loop that simulates rolling a die (use random.randint(1,6))
#    until you roll a 6. Count how many rolls it took.
# 3. Use enumerate and a list of city names to print "1. Stockholm", "2. Oslo", etc.
# 4. Write a loop with an else clause that searches a list for a value.
\`\`\`

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

connect("localhost")                  # Uses defaults
connect("db.example.com", 3306)       # Override port
connect("db.example.com", timeout=5)  # Keyword argument

# --- Multiple return values (tuple unpacking) ---
def divide(a, b):
    """Return quotient and remainder."""
    if b == 0:
        return None, None
    return a // b, a % b

quotient, remainder = divide(17, 5)
print(f"17 / 5 = {quotient} remainder {remainder}")  # 3 remainder 2

# --- *args: variable positional arguments ---
def total(*numbers):
    """Sum any number of arguments."""
    result = 0
    for n in numbers:
        result += n
    return result

print(f"total(1,2,3): {total(1, 2, 3)}")       # 6
print(f"total(): {total()}")                     # 0

# --- **kwargs: variable keyword arguments ---
def build_profile(**kwargs):
    """Build a user profile dictionary from keyword arguments."""
    profile = {}
    for key, value in kwargs.items():
        profile[key] = value
    return profile

user = build_profile(name="Alice", age=30, role="engineer")
print(f"Profile: {user}")

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

# --- Functions as first-class objects ---
def apply_operation(func, x, y):
    """Apply a function to two arguments."""
    return func(x, y)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(f"add: {apply_operation(add, 3, 4)}")        # 7
print(f"multiply: {apply_operation(multiply, 3, 4)}")  # 12

# --- Lambda (anonymous) functions ---
square = lambda x: x ** 2
print(f"square(5): {square(5)}")  # 25

# Common use: sorting with a key
users = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
users_sorted = sorted(users, key=lambda u: u[1])
print(f"By age: {users_sorted}")

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

# EXERCISE:
# 1. Write a function that accepts a list of numbers and returns
#    a tuple of (minimum, maximum, average).
# 2. Write a function with **kwargs that builds an HTML tag string,
#    e.g., build_tag("div", id="main", class_="container")
#    -> '<div id="main" class="container"></div>'
# 3. Write a higher-order function that takes a function and a list,
#    and returns a new list with the function applied to each element.
\`\`\`

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

# List comprehension (concise list creation)
squares = [x ** 2 for x in range(1, 11)]
print(f"Squares: {squares}")

# Filtered comprehension
even_squares = [x ** 2 for x in range(1, 11) if x % 2 == 0]
print(f"Even squares: {even_squares}")

# --- Tuples ---
# Ordered, immutable, allows duplicates
point = (3.0, 4.5)
rgb = (255, 128, 0)

# Tuple unpacking
x, y = point
r, g, b = rgb
print(f"Point: x={x}, y={y}")

# Named tuples for clarity
from collections import namedtuple
Color = namedtuple("Color", ["red", "green", "blue"])
orange = Color(255, 165, 0)
print(f"Orange: R={orange.red}, G={orange.green}, B={orange.blue}")

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
print(config["host"])                    # Direct access (KeyError if missing)
print(config.get("timeout", 30))         # .get() with default value

# Iteration
for key in config:
    print(f"  {key}: {config[key]}")

# Dictionary methods
keys = list(config.keys())
values = list(config.values())
items = list(config.items())

# Merging dictionaries
defaults = {"host": "0.0.0.0", "port": 8080, "timeout": 30}
overrides = {"host": "localhost", "debug": True}
merged = {**defaults, **overrides}        # Spread operator
print(f"Merged: {merged}")

# Python 3.9+ merge operator (preferred in modern code)
merged = defaults | overrides

# Dict comprehension
word = "mississippi"
letter_counts = {ch: word.count(ch) for ch in set(word)}
print(f"Letter counts: {letter_counts}")

# --- Sets ---
# Unordered, mutable, no duplicates
tags_a = {"python", "backend", "api"}
tags_b = {"python", "frontend", "react"}

# Set operations
print(f"Union: {tags_a | tags_b}")                # All tags
print(f"Intersection: {tags_a & tags_b}")          # Common tags
print(f"Difference: {tags_a - tags_b}")            # In A but not B
print(f"Symmetric diff: {tags_a ^ tags_b}")        # In one but not both

# Membership testing is O(1) for sets vs O(n) for lists
large_set = set(range(1_000_000))
print(999_999 in large_set)  # Instant lookup

# Set comprehension
evens = {x for x in range(20) if x % 2 == 0}
print(f"Evens: {evens}")

# Removing duplicates from a list while preserving order
items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
seen = set()
unique = []
for item in items:
    if item not in seen:
        seen.add(item)
        unique.append(item)
print(f"Unique (ordered): {unique}")

# EXERCISE:
# 1. Create a list of 10 random integers, then use a set to find unique values.
# 2. Build a dictionary that maps each word in a sentence to its length.
# 3. Write a function that takes two lists and returns their common elements using sets.
# 4. Create a nested dict representing a JSON API response with at least 3 levels.
\`\`\`

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
print(f"Name: {name}, Age: {age}")

# Expressions inside f-strings
print(f"In 5 years: {age + 5}")
print(f"Uppercase: {name.upper()}")
print(f"Pi to 3 decimals: {3.14159:.3f}")
print(f"Percentage: {0.856:.1%}")          # 85.6%
print(f"Padded: {42:>10}")                 # Right-align in 10 chars
print(f"Binary: {255:08b}")               # 11111111

# Multiline f-strings
user = {"name": "Alice", "role": "Engineer"}
message = (
    f"User: {user['name']}\\n"
    f"Role: {user['role']}\\n"
    f"Active: {True}"
)
print(message)

# --- String methods ---
text = "  Hello, World!  "
print(text.strip())           # Remove whitespace from both ends
print(text.lstrip())          # Remove from left
print(text.rstrip())          # Remove from right

sentence = "the quick brown fox jumps over the lazy dog"
print(sentence.title())       # The Quick Brown Fox...
print(sentence.capitalize())  # The quick brown fox...
print(sentence.upper())       # THE QUICK BROWN FOX...

# Searching
print(sentence.find("fox"))       # 16 (index of first occurrence)
print(sentence.count("the"))      # 2
print(sentence.startswith("the")) # True
print(sentence.endswith("dog"))   # True

# Splitting and joining
words = sentence.split()          # Split on whitespace
print(f"Word count: {len(words)}")
csv_line = "Alice,30,Engineer"
fields = csv_line.split(",")
print(f"Fields: {fields}")

# Join is a string method called on the separator
joined = " | ".join(fields)
print(f"Joined: {joined}")        # Alice | 30 | Engineer

# Replacing
cleaned = "Hello\\n\\nWorld\\n".replace("\\n", " ").strip()
print(f"Cleaned: {cleaned}")

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
    print(f"Valid email: {match.group()}")

# re.findall – find all matches
text = "Call 555-1234 or 555-5678 for info"
phones = re.findall(r"\\d{3}-\\d{4}", text)
print(f"Phone numbers: {phones}")

# re.sub – replace with pattern
cleaned = re.sub(r"\\s+", " ", "too    many   spaces")
print(f"Cleaned: {cleaned}")

# EXERCISE:
# 1. Write a function that takes a full name "First Last" and returns "Last, First".
# 2. Use an f-string to format a price as "$1,234.56" (hint: use :,.2f).
# 3. Write a regex that validates a simple password: at least 8 chars,
#    one uppercase, one lowercase, one digit.
# 4. Split a CSV string and reconstruct it as a tab-separated string.
\`\`\`

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

# Read line by line (memory-efficient for large files)
with open("example.txt", "r", encoding="utf-8") as f:
    for line_number, line in enumerate(f, start=1):
        print(f"  Line {line_number}: {line.strip()}")

# Read all lines into a list
with open("example.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"  Total lines: {len(lines)}")

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
    print(f"  Users: {loaded['users'][0]['name']}")

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

# --- pathlib: modern path handling ---
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)  # Create directory if it doesn't exist

# Write using pathlib
output_file = data_dir / "output.txt"
output_file.write_text("Written with pathlib!\\n", encoding="utf-8")

# Read using pathlib
content = output_file.read_text(encoding="utf-8")
print(f"  pathlib content: {content.strip()}")

# Iterate files in a directory
for path in Path(".").glob("*.txt"):
    print(f"  Found: {path.name} ({path.stat().st_size} bytes)")

# Check existence
print(f"  example.txt exists: {Path('example.txt').exists()}")
print(f"  data dir is dir: {data_dir.is_dir()}")

# --- Cleanup (using pathlib instead of os.path) ---
for fname in ["example.txt", "data.json", "people.csv"]:
    Path(fname).unlink(missing_ok=True)
if data_dir.exists():
    output_file.unlink(missing_ok=True)
    data_dir.rmdir()

# EXERCISE:
# 1. Write a function that reads a text file and returns a dict with
#    "lines" (count), "words" (count), and "chars" (count).
# 2. Write a program that reads a JSON config file and prints each
#    key-value pair on its own line.
# 3. Create a CSV file with student grades and write a function that
#    reads it and calculates the average grade.
\`\`\`

**Why it matters:** Almost every real-world application reads or writes files -- configuration files, data exports, logs, caches. Proper file handling prevents data corruption and resource leaks.

> **Role connection:** Data Engineers build ETL pipelines that read/write CSV, JSON, and Parquet files. Backend Developers handle file uploads and configuration loading.

---

## 7. Modules & Imports

Python's module system lets you organize code into reusable files and packages. Understanding imports, packages, and virtual environments is essential for building real projects.

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
print(f"Most common: {word_counts.most_common(2)}")

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

# uuid: unique identifiers
unique_id = uuid.uuid4()
print(f"UUID: {unique_id}")

# random: random number generation
random.seed(42)  # For reproducibility
print(f"Random int: {random.randint(1, 100)}")
print(f"Random choice: {random.choice(['a', 'b', 'c'])}")
print(f"Shuffled: {random.sample(range(10), 5)}")

# itertools: efficient looping
pairs = list(itertools.combinations(["A", "B", "C", "D"], 2))
print(f"Pairs: {pairs}")

# urlparse: URL handling
url = urlparse("https://api.example.com/v2/users?page=1&limit=10")
print(f"Host: {url.hostname}, Path: {url.path}, Query: {url.query}")

# EXERCISE:
# 1. Create a module called mathutils.py with functions for factorial,
#    is_prime, and gcd. Import and use them from another file.
# 2. Use collections.defaultdict to count character frequencies in a string.
# 3. Use itertools.groupby to group a sorted list of dicts by a key.
# 4. Set up a virtual environment and install the 'requests' package.
#    (In terminal: python -m venv .venv && source .venv/bin/activate && pip install requests)
#    Or use uv (modern, faster alternative to pip):
#    (uv venv .venv && source .venv/bin/activate && uv pip install requests)
\`\`\`

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

safe_divide(10, 3)   # Success path
safe_divide(10, 0)   # ZeroDivisionError path
safe_divide("a", 2)  # TypeError path

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

# Test with valid and invalid data
print(parse_config({"host": "localhost", "port": "5432"}))
print(parse_config({"port": "abc"}))  # KeyError for host + ValueError

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

# EXERCISE:
# 1. Write a function that reads a JSON file and handles FileNotFoundError,
#    json.JSONDecodeError, and KeyError with specific messages.
# 2. Create a custom exception hierarchy for a banking app:
#    BankError -> InsufficientFundsError, AccountNotFoundError, InvalidAmountError
# 3. Write a retry decorator that wraps any function with retry logic.
# 4. Implement a safe_get(dict, key, default) that never raises an exception.
\`\`\`

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
print(f"Transactions: {len(account)}")  # 2
print(f"Has deposits: {'deposit' in account}")  # True

for txn_type, amount in account:
    print(f"  {txn_type}: \${amount:.2f}")


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
print(savings)


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

# Sorting works thanks to @total_ordering and __eq__/__lt__
circles = [Circle(5), Circle(2), Circle(8), Circle(1)]
print(f"Sorted circles: {[c.radius for c in sorted(circles)]}")

# EXERCISE:
# 1. Add a __add__ method to BankAccount that merges two accounts.
# 2. Create a CheckingAccount subclass with an overdraft_limit parameter.
# 3. Implement a Triangle shape class with validation (sum of any two sides > third).
# 4. Add a @classmethod to BankAccount that creates an account from a dict.
\`\`\`

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

print(add(3, 4))              # Logs the call and return
print(f"Name: {add.__name__}")  # 'add' (preserved by functools.wraps)
print(f"Doc: {add.__doc__}")    # 'Add two numbers.'


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

slow_operation()


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

print(f"fib(30) = {fibonacci(30)}")  # Fast due to memoization
print(f"Cache size: {len(fibonacci.cache)}")

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
conn1 = DatabaseConnection()
conn2 = DatabaseConnection()
print(f"Same instance: {conn1 is conn2}")  # True


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

print(repeat_string("hello ", 3))  # "hello hello hello "
# repeat_string(42, 3)  # Would raise TypeError

# EXERCISE:
# 1. Write a @require_auth decorator that checks if a 'user' kwarg is provided.
# 2. Write a @rate_limit(calls=5, period=60) decorator that limits function calls.
# 3. Write a @deprecated(message) decorator that prints a warning when called.
# 4. Write a class-based decorator (using __call__) that counts invocations.
\`\`\`

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
print(next(gen))         # Starting countdown from 5 \\n 5
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
print(f"Type: {type(squares_gen)}")

# Memory comparison
import sys
squares_list = [x ** 2 for x in range(1_000)]
squares_gen = (x ** 2 for x in range(1_000))
print(f"List size: {sys.getsizeof(squares_list)} bytes")
print(f"Generator size: {sys.getsizeof(squares_gen)} bytes")  # ~120 bytes always


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


# --- yield from: delegating to sub-generators ---
def flatten(nested_list):
    """Recursively flatten a nested list."""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)  # Delegate to recursive call
        else:
            yield item

nested = [1, [2, 3], [4, [5, 6]], 7]
print(f"Flattened: {list(flatten(nested))}")  # [1, 2, 3, 4, 5, 6, 7]


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


# --- Useful itertools functions ---
# chain: concatenate iterables
combined = list(itertools.chain([1, 2], [3, 4], [5, 6]))
print(f"Chained: {combined}")

# groupby: group consecutive elements
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4), ("A", 5)]
data.sort(key=lambda x: x[0])  # Must be sorted first!
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(f"  {key}: {list(group)}")

# accumulate: running totals
running_sum = list(itertools.accumulate([1, 2, 3, 4, 5]))
print(f"Running sum: {running_sum}")  # [1, 3, 6, 10, 15]

# product: cartesian product
sizes = ["S", "M", "L"]
colors = ["red", "blue"]
variants = list(itertools.product(sizes, colors))
print(f"Variants: {variants}")

# EXERCISE:
# 1. Write a generator that yields prime numbers infinitely.
# 2. Create a pipeline of generators that reads a CSV-like list of strings,
#    parses them, filters by a condition, and transforms the output.
# 3. Implement a sliding_window(iterable, size) generator.
# 4. Use itertools.combinations to find all pairs in a list that sum to a target.
\`\`\`

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

# Failed transaction (exception is suppressed)
with DatabaseTransaction("main_db") as txn:
    print("  Updating records...")
    raise ValueError("Constraint violation")
print("  Continued after rollback")  # This runs because exception was suppressed


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
    file_path = os.path.join(tmp, "test.txt")
    with open(file_path, "w") as f:
        f.write("temporary data")
    print(f"  File exists: {os.path.exists(file_path)}")
# Directory is cleaned up here


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

# Python 3.10+ parenthesized context managers
# with (
#     managed_resource("A") as a,
#     managed_resource("B") as b,
# ):
#     print(f"  Using {a} and {b}")

# Compatible with older versions using contextlib.ExitStack
with contextlib.ExitStack() as stack:
    a = stack.enter_context(managed_resource("A"))
    b = stack.enter_context(managed_resource("B"))
    c = stack.enter_context(managed_resource("C"))
    print(f"  Using {a}, {b}, {c}")
# All released in reverse order


# EXERCISE:
# 1. Write a context manager that changes the working directory
#    and restores it on exit.
# 2. Write a context manager that sets an environment variable
#    and removes it on exit.
# 3. Write a @contextmanager that opens a file, yields a JSON-parsed dict,
#    and writes changes back on exit.
# 4. Use ExitStack to dynamically manage a variable number of files.
\`\`\`

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

# Creating a matrix with comprehension
identity = [[1 if i == j else 0 for j in range(4)] for i in range(4)]
print("Identity matrix:")
for row in identity:
    print(f"  {row}")

# Multiple conditions
results = [
    (x, y)
    for x in range(1, 10)
    for y in range(x, 10)  # Note: y starts from x (avoids duplicates)
    if (x ** 2 + y ** 2) == int(math.sqrt(x ** 2 + y ** 2)) ** 2
    if x ** 2 + y ** 2 <= 100
]
print(f"Pythagorean-ish pairs: {results}")

# Conditional expression in output
numbers = range(-5, 6)
labels = [f"{n} is {'positive' if n > 0 else 'zero' if n == 0 else 'negative'}"
          for n in numbers]
for label in labels:
    print(f"  {label}")


# --- Dict comprehensions ---
words = ["hello", "world", "python", "programming"]

# Word lengths
word_lengths = {word: len(word) for word in words}
print(f"Lengths: {word_lengths}")

# Inverting a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(f"Inverted: {inverted}")

# Filtering a dictionary
config = {"host": "localhost", "port": 5432, "debug": True,
          "password": "secret", "api_key": "abc123"}
safe_config = {k: v for k, v in config.items()
               if k not in ("password", "api_key")}
print(f"Safe config: {safe_config}")

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


# --- Set comprehensions ---
text = "the quick brown fox jumps over the lazy dog"
unique_lengths = {len(word) for word in text.split()}
print(f"Unique word lengths: {sorted(unique_lengths)}")

# Finding common characters
word1 = "hello"
word2 = "world"
common = {c for c in word1 if c in word2}
print(f"Common chars: {common}")


# --- Walrus operator (:=) – Python 3.8+ ---
# Assign and use a value in the same expression

# Without walrus operator:
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
results_old = []
for x in data:
    y = x ** 2 + x
    if y > 20:
        results_old.append(y)

# With walrus operator:
results_new = [y for x in data if (y := x ** 2 + x) > 20]
print(f"Walrus results: {results_new}")

# Walrus in while loops
import io
content = "line1\\nline2\\nline3\\n"
reader = io.StringIO(content)
lines = []
while (line := reader.readline()):
    lines.append(line.strip())
print(f"Read lines: {lines}")

# Walrus with regex
import re
texts = ["user:alice@email.com", "invalid-entry", "user:bob@email.com"]
emails = [m.group(1) for text in texts if (m := re.search(r"user:(\\S+)", text))]
print(f"Emails: {emails}")


# --- Performance: comprehensions vs loops ---
# Comprehensions are typically 10-30% faster than equivalent for loops
# because the iteration happens in C internally

# However, readability is more important than micro-optimization
# Bad: overly complex comprehension
# result = [transform(x) for x in data if validate(x) for y in process(x) if filter(y)]
# Better: use a generator function

# EXERCISE:
# 1. Transpose a matrix using a nested list comprehension.
# 2. Build a dict comprehension that creates a frequency map of characters.
# 3. Use the walrus operator to filter a list while also computing a
#    running maximum.
# 4. Write a comprehension that generates all valid chess board positions
#    (a1 through h8).
\`\`\`

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
def find_user(user_id: int) -> Optional[dict]:
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
print(f"Doubled: {doubled}")

# --- TypeVar: generic functions ---
T = TypeVar("T")

def first(items: list[T]) -> Optional[T]:
    """Return the first element or None."""
    return items[0] if items else None

# The return type matches the input type
name: Optional[str] = first(["Alice", "Bob"])    # str
number: Optional[int] = first([1, 2, 3])         # int

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
print(f"Is admin: {user.is_admin()}")

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

    def peek(self) -> Optional[T]:
        return self._items[-1] if self._items else None

    def __len__(self) -> int:
        return len(self._items)

int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
print(f"Popped: {int_stack.pop()}")

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

display(HTMLWidget())    # Works – has render()
display(JSONResponse())  # Works – has render()

# --- Literal types ---
def set_mode(mode: Literal["read", "write", "append"]) -> None:
    print(f"Mode set to: {mode}")

set_mode("read")   # OK
# set_mode("delete")  # mypy would flag this

# --- Type aliases ---
JSON: TypeAlias = dict[str, Any]
Headers: TypeAlias = dict[str, str]

def fetch(url: str, headers: Headers) -> JSON:
    return {"url": url, "headers": headers}

# EXERCISE:
# 1. Add full type hints to a function that processes a list of dicts
#    and returns grouped results.
# 2. Create a generic Cache[K, V] class with get, set, and delete methods.
# 3. Define a Protocol for a Repository pattern (get, save, delete methods).
# 4. Run mypy on your code: pip install mypy && mypy your_file.py
\`\`\`

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

# EXERCISE:
# 1. Write tests for a Calculator class with add, subtract, multiply, divide.
# 2. Use @pytest.mark.parametrize to test a function with 10+ input/output pairs.
# 3. Write a fixture that sets up and tears down a temporary database.
# 4. Mock an HTTP client and test a function that calls an external API.
# Run: pip install pytest pytest-cov && pytest --cov=. -v
\`\`\`

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
    print(f"Found: {match.group()}")     # brown fox
    print(f"Group 1: {match.group(1)}")  # fox
    print(f"Span: {match.span()}")       # (10, 19)

# match: only matches at the beginning of string
m = re.match(r"The", text)
print(f"Match at start: {m is not None}")  # True

# fullmatch: entire string must match (Python 3.4+)
m = re.fullmatch(r"\\d{3}-\\d{4}", "555-1234")
print(f"Full match: {m is not None}")  # True


# --- findall and finditer ---
# findall: return all non-overlapping matches
emails_text = """
Contact us at support@example.com or sales@example.com.
For urgent matters: admin@example.org
"""
emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", emails_text)
print(f"Emails: {emails}")

# finditer: return match objects (more detail)
for m in re.finditer(r"[\\w.+-]+@([\\w-]+\\.[\\w.]+)", emails_text):
    print(f"  Email: {m.group()}, Domain: {m.group(1)}")


# --- Substitution ---
# Basic replacement
cleaned = re.sub(r"\\s+", " ", "too   many    spaces   here")
print(f"Cleaned: {cleaned}")

# Replacement with backreference
date_str = "2026-03-20"
formatted = re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3/\\2/\\1", date_str)
print(f"Formatted date: {formatted}")  # 20/03/2026

# Replacement with function
def censor(match):
    word = match.group()
    return word[0] + "*" * (len(word) - 2) + word[-1]

text = "Replace sensitive words like password and secret"
censored = re.sub(r"\\b(password|secret)\\b", censor, text)
print(f"Censored: {censored}")


# --- Named groups ---
log_line = '2026-03-20 14:30:45 ERROR [auth] Login failed for user "admin"'
pattern = r"(?P<date>[\\d-]+) (?P<time>[\\d:]+) (?P<level>\\w+) \\[(?P<module>\\w+)\\] (?P<message>.+)"
m = re.match(pattern, log_line)
if m:
    print(f"  Date: {m.group('date')}")
    print(f"  Level: {m.group('level')}")
    print(f"  Module: {m.group('module')}")
    print(f"  Message: {m.group('message')}")
    print(f"  As dict: {m.groupdict()}")


# --- Lookahead and lookbehind ---
# Positive lookahead: (?=...)
# Find words followed by a comma
text = "apple, banana, cherry, date"
words = re.findall(r"\\w+(?=,)", text)
print(f"Before comma: {words}")  # ['apple', 'banana', 'cherry']

# Negative lookahead: (?!...)
# Find numbers NOT followed by 'px'
css = "width: 100px; height: 50px; opacity: 0.5; z-index: 10"
values = re.findall(r"\\b\\d+(?!px)\\b", css)
print(f"Non-px values: {values}")

# Positive lookbehind: (?<=...)
# Find amounts after a dollar sign
text = "Items cost $25, $30, and $45"
amounts = re.findall(r"(?<=\\$)\\d+", text)
print(f"Amounts: {amounts}")  # ['25', '30', '45']

# Negative lookbehind: (?<!...)
# Find words NOT preceded by "not "
text = "is good, not bad, is great, not terrible"
# This is a simplified example
words = re.findall(r"(?<!not )\\b(good|bad|great|terrible)\\b", text)
print(f"Positive words: {words}")


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


# --- Splitting with regex ---
text = "one, two;three  four\\tfive"
parts = re.split(r"[,;\\s]+", text)
print(f"Split parts: {parts}")

# Split with limit
first_two = re.split(r"\\s+", "a b c d e", maxsplit=2)
print(f"First split: {first_two}")  # ['a', 'b', 'c d e']


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

# EXERCISE:
# 1. Write a regex that validates a strong password (8+ chars, upper, lower, digit, special).
# 2. Parse an Apache-style log line into its components using named groups.
# 3. Write a function that converts camelCase to snake_case using re.sub.
# 4. Use lookahead/lookbehind to extract values from a config file format (key=value).
\`\`\`

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

# EXERCISE:
# 1. Build an async web scraper that fetches 10 URLs concurrently
#    with a semaphore limit of 3.
# 2. Implement an async producer-consumer pattern using asyncio.Queue.
# 3. Create an async retry decorator that works with async functions.
# 4. Write an async context manager for a file-based lock.
\`\`\`

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
print(f"type() class: {obj.greet()}")


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
json_handler = Plugin.get_plugin("json")()
print(json_handler.process({"key": "value"}))


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
print(product)

try:
    Product("", 9.99, 100)  # Invalid name
except ValueError as e:
    print(f"Validation error: {e}")

try:
    Product("Widget", -5, 100)  # Invalid price
except ValueError as e:
    print(f"Validation error: {e}")


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

# EXERCISE:
# 1. Create a metaclass that enforces all class attributes are type-annotated.
# 2. Use __init_subclass__ to build a command registry for a CLI framework.
# 3. Implement a descriptor that logs all attribute access (get/set/delete).
# 4. Build a simple ORM-like system where field definitions become table columns.
\`\`\`

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
print(f"int(2**30) size: {sys.getsizeof(2**30)} bytes")
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
# Regular: ~160 bytes/object, Slotted: ~56 bytes/object

# Slots limitation: cannot add arbitrary attributes
try:
    slotted.z = 3.0
except AttributeError as e:
    print(f"Slots limitation: {e}")


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
    # Consume it to force evaluation
    total = sum(gen)
    return total

create_large_list()
create_large_generator()


# --- String interning ---
# Python interns small strings and integers for performance
a = "hello"
b = "hello"
print(f"\\nInterned strings: {a is b}")  # True (same object)

a = "hello world!"
b = "hello world!"
print(f"Non-interned: {a is b}")  # May be False (depends on implementation)

# Integer caching: -5 to 256 are cached
a = 256
b = 256
print(f"Cached int 256: {a is b}")  # True

a = 257
b = 257
print(f"Non-cached 257: {a is b}")  # May be False

# EXERCISE:
# 1. Create a class with __slots__ and benchmark its memory usage
#    vs a regular class with 1 million instances.
# 2. Implement a WeakSet-based observer pattern where observers
#    are automatically removed when garbage collected.
# 3. Use tracemalloc to find the top 10 memory-consuming lines in a script.
# 4. Create a reference cycle detector that identifies cycles in a graph of objects.
\`\`\`

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
            self.results.append(item * 2)  # self.results lookup each iteration

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
def process_if_chain(operation, a, b):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        return a / b

OPERATIONS = {
    "add": lambda a, b: a + b,
    "subtract": lambda a, b: a - b,
    "multiply": lambda a, b: a * b,
    "divide": lambda a, b: a / b,
}

def process_dispatch(operation, a, b):
    return OPERATIONS[operation](a, b)


# 6. Use collections for specialized data structures
def count_naive(items):
    counts = {}
    for item in items:
        if item in counts:
            counts[item] += 1
        else:
            counts[item] = 1
    return counts

def count_defaultdict(items):
    counts = defaultdict(int)
    for item in items:
        counts[item] += 1
    return counts

from collections import Counter
def count_counter(items):
    return Counter(items)  # Fastest: implemented in C


# --- Using timeit for micro-benchmarks ---
# In terminal: python -m timeit -s "data = list(range(1000))" "sum(data)"

# In code:
import timeit

time_loop = timeit.timeit("sum_loop(data)", globals={"sum_loop": sum_loop, "data": data}, number=10)
time_builtin = timeit.timeit("sum_builtin(data)", globals={"sum_builtin": sum_builtin, "data": data}, number=10)
print(f"\\nsum loop: {time_loop:.4f}s")
print(f"sum builtin: {time_builtin:.4f}s")
print(f"Builtin is {time_loop/time_builtin:.1f}x faster")


# --- Profiling with cProfile from command line ---
# python -m cProfile -s cumulative your_script.py
# python -m cProfile -o profile.stats your_script.py
# Then analyze: python -c "import pstats; p = pstats.Stats('profile.stats'); p.sort_stats('cumulative'); p.print_stats(20)"

# --- line_profiler (install: pip install line-profiler) ---
# Decorate functions with @profile, then run:
# kernprof -l -v your_script.py

# --- memory_profiler (install: pip install memory-profiler) ---
# Decorate functions with @profile, then run:
# python -m memory_profiler your_script.py

# EXERCISE:
# 1. Profile a data processing script with cProfile and identify the top 3 bottlenecks.
# 2. Rewrite a slow function using the optimization patterns above and measure the improvement.
# 3. Use tracemalloc to compare memory usage of different data structures.
# 4. Write a benchmark suite that compares list vs deque for append/pop operations.
\`\`\`

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
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "my-awesome-library"
version = "1.0.0"
description = "A comprehensive example library"
readme = "README.md"
license = {text = "MIT"}
requires-python = ">=3.10"
authors = [
    {name = "Alice Developer", email = "alice@example.com"}
]
keywords = ["example", "library", "python"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
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
python_version = "3.10"
strict = true

[tool.ruff]
target-version = "py310"
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
"""
print("Build commands:")
print(BUILD_COMMANDS)


# --- Version management with dynamic versioning ---
# Option 1: Single source of truth in __init__.py (shown above)
# Option 2: Use setuptools-scm for git-based versioning
# Option 3: Use importlib.metadata

import importlib.metadata

# Get version of an installed package
try:
    version = importlib.metadata.version("pip")
    print(f"pip version: {version}")
except importlib.metadata.PackageNotFoundError:
    print("Package not found")


# --- Entry points (CLI tools, plugins) ---
# Defined in pyproject.toml under [project.scripts]:
# my-cli = "my_library.cli:main"

# src/my_library/cli.py example:
CLI_PY = '''
"""Command-line interface for my-awesome-library."""

import argparse
import sys
from . import __version__
from .core import process_data

def main():
    parser = argparse.ArgumentParser(description="My CLI Tool")
    parser.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    parser.add_argument("input", help="Input file path")
    parser.add_argument("-o", "--output", help="Output file path")
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args()

    # Process data
    print(f"Processing {args.input}...")

if __name__ == "__main__":
    main()
'''

# EXERCISE:
# 1. Create a complete package with pyproject.toml, source code, and tests.
# 2. Build the package and install it locally with pip install -e .
# 3. Add a CLI entry point and verify it works after installation.
# 4. Publish to Test PyPI and install from there.
\`\`\`

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
# In Python, modules are natural singletons. For classes:

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


# Both reference the same instance
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
        # Simplified XML parsing for demonstration
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


# Usage
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


# Subscribe to events
store = UserStore()
store.on_created.subscribe(lambda uid, data: print(f"  Created user {uid}: {data}"))
store.on_created.subscribe(lambda uid, data: print(f"  Logging: new user {uid}"))
store.on_deleted.subscribe(lambda uid, data: print(f"  Deleted user {uid}"))

store.create(1, {"name": "Alice"})
store.create(2, {"name": "Bob"})
store.delete(1)


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


# Switch strategies at runtime
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


# Compose processors
processor = CensorDecorator(
    UpperCaseDecorator(
        TrimDecorator(BasicProcessor())
    ),
    words=["BAD", "EVIL"]
)
result = processor.process("  this is bad and evil text  ")
print(f"Processed: {result}")

# EXERCISE:
# 1. Implement a Builder pattern for constructing complex SQL queries.
# 2. Create a Chain of Responsibility pattern for request processing middleware.
# 3. Implement the Repository pattern with interchangeable storage backends.
# 4. Build a plugin system using the Factory pattern and __init_subclass__.
\`\`\`

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
        # Submit all tasks
        future_to_url = {
            executor.submit(download_page, url): url
            for url in urls
        }

        # Process results as they complete
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

# Sequential
def compute_sequential(items: list[int]) -> list[int]:
    return [cpu_intensive(n) for n in items]

# Multiprocessing
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


# --- multiprocessing with shared state ---
def shared_state_demo():
    """Demonstrate shared state with multiprocessing."""
    # Shared value (atomic operations)
    counter = multiprocessing.Value("i", 0)  # 'i' = integer
    lock = multiprocessing.Lock()

    def worker(shared_counter, lk, increments):
        for _ in range(increments):
            with lk:
                shared_counter.value += 1

    processes = []
    for _ in range(4):
        p = multiprocessing.Process(
            target=worker,
            args=(counter, lock, 100_000)
        )
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

    print(f"  Shared counter: {counter.value}")  # 400000

print("\\nShared state:")
shared_state_demo()


# --- concurrent.futures: map pattern ---
def process_batch(batch_id: int) -> dict:
    """Process a batch of data."""
    time.sleep(0.3)
    return {"batch_id": batch_id, "records": batch_id * 100}

print("\\nBatch processing with futures.map:")
with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(process_batch, range(8)))
    for r in results:
        print(f"  Batch {r['batch_id']}: {r['records']} records")


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

# EXERCISE:
# 1. Build a parallel web scraper that downloads pages with ThreadPoolExecutor
#    and processes them with ProcessPoolExecutor.
# 2. Implement a thread-safe LRU cache using threading.Lock.
# 3. Create a worker pool that processes tasks from a multiprocessing.Queue.
# 4. Benchmark threading vs multiprocessing vs asyncio for the same I/O task.
\`\`\`

**Why it matters:** Concurrency is essential for building performant applications. Choosing the wrong concurrency model (threads for CPU-bound work, multiprocessing for simple I/O) leads to worse performance, not better. Understanding the GIL is critical for Python developers.

> **Role connection:** Backend Developers use concurrency for handling multiple requests. Data Engineers parallelize data processing pipelines. DevOps Engineers run concurrent infrastructure operations.

---

## Summary

You have covered seven advanced Python topics:

| Topic | Key Takeaway |
|-------|-------------|
| Async/Await | Cooperative multitasking for I/O-bound concurrency; use \`asyncio.gather\` and \`TaskGroup\` |
| Metaclasses | Classes of classes; prefer \`__init_subclass__\` for simpler cases |
| Memory Management | Reference counting + GC; use \`__slots__\` and weak references to optimize |
| Profiling | Measure first, optimize second; cProfile for functions, line_profiler for lines |
| Packaging | \`pyproject.toml\` is the standard; use \`build\` and \`twine\` for distribution |
| Design Patterns | Singleton, Factory, Observer, Strategy, Decorator -- simpler in Python |
| Concurrency | Threading for I/O, multiprocessing for CPU, asyncio for async I/O; mind the GIL |

These topics represent the knowledge expected of a senior Python developer. Mastery comes from applying them in real projects and understanding the trade-offs of each approach.

---

## Recommended Videos — Senior Level

- **Computerphile** — "Secret Key Exchange (Diffie-Hellman)" — https://www.youtube.com/watch?v=NmM9HA2MQGI

> The Diffie-Hellman video is an excellent mental model for the kind of mathematical reasoning that underpins cryptographic Python libraries. The colour-mixing analogy used to explain key exchange maps directly to the modular exponentiation operations in Python's \`secrets\` and \`cryptography\` packages.
`,
}
