// Language markdown content - populated by language deep dive files
// Keyed by language fileName, with beginner/mid/senior markdown strings
export const languageMarkdownContent = {
  'Python': {
    beginner: `# Python – Beginner Deep Dive

This guide covers the foundational building blocks of Python programming. Each section includes detailed explanations, practical code examples, and exercises to solidify your understanding.

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

# Python 3.9+ merge operator
# merged = defaults | overrides

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

# --- Cleanup ---
import os
for f in ["example.txt", "data.json", "people.csv"]:
    if os.path.exists(f):
        os.remove(f)
if data_dir.exists():
    output_file.unlink()
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
- **freeCodeCamp** — "Learn Python – Full Course for Beginners" — https://www.youtube.com/watch?v=rfscVS0vtbw
- **Fireship** — "Python in 100 Seconds" — https://www.youtube.com/watch?v=x7X9w_GIm1s
`,
    mid: `# Python – Mid-Level Deep Dive

This guide covers intermediate Python concepts that separate beginners from effective Python developers. You will learn object-oriented programming, decorators, generators, context managers, type hints, testing, and more.

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
    Optional, Union, List, Dict, Tuple, Set,
    Callable, Iterator, Generator, Any,
    TypeVar, Generic, Protocol, Literal,
    TypeAlias, overload
)
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

- **Programming with Mosh** — "Object-Oriented Programming, Simplified" — https://www.youtube.com/watch?v=pTB0EiLXUC8
- **Tech With Tim** — "Python Asynchronous Programming – AsyncIO & Async/Await" — https://www.youtube.com/watch?v=t5Bo1Je9EmE
- **Corey Schafer** — "Python SQLite Tutorial" — https://www.youtube.com/watch?v=pd-0G0MigUA
`,
    senior: `# Python – Senior Deep Dive

This guide covers advanced Python concepts for experienced developers. Topics include async programming, metaclasses, memory management, profiling, packaging, design patterns, and concurrency.

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

- **Tech With Tim** — "Python Asynchronous Programming – AsyncIO & Async/Await" — https://www.youtube.com/watch?v=t5Bo1Je9EmE
- **freeCodeCamp** — "Scikit-Learn Course – Machine Learning in Python Tutorial" — https://www.youtube.com/watch?v=pqNCD_5r0IU
- **Computerphile** — "Secret Key Exchange (Diffie-Hellman)" — https://www.youtube.com/watch?v=NmM9HA2MQGI
`
  },
  'JavaScript': {
    beginner: `# JavaScript — Beginner Deep Dive

This guide covers the foundational building blocks of JavaScript. Each section includes detailed explanations, practical code examples, and exercises.

---

## 1. Variables and Data Types

JavaScript has three ways to declare variables: \\\`var\\\`, \\\`let\\\`, and \\\`const\\\`.

**Why it matters:** Variable scoping bugs are among the most common mistakes in JavaScript. Using \\\`let\\\` and \\\`const\\\` instead of \\\`var\\\` prevents entire classes of bugs.

\\\`\\\`\\\`javascript
// var is function-scoped and hoisted — avoid in modern code
var name = "Alice";

// let is block-scoped — use for values that change
let count = 0;
count = count + 1;

// const is block-scoped — use for values that don't change
const MAX_RETRIES = 3;

// JavaScript primitive types
const str = "Hello";           // string
const num = 42;                // number
const bool = true;             // boolean
const nothing = null;          // null
const notDefined = undefined;  // undefined
const sym = Symbol("id");      // symbol

// Type coercion — be careful!
console.log("5" + 3);     // "53" (string wins)
console.log("5" - 3);     // 2 (number wins)

// Always use === (strict equality)
console.log(0 === "");     // false
console.log(0 === false);  // false
\\\`\\\`\\\`

> **Role connection:** Every web development role uses JavaScript variables and types daily.

---

## 2. Functions and Scope

\\\`\\\`\\\`javascript
// Function declaration — hoisted
function greet(name) { return "Hello, " + name + "!"; }

// Arrow function — shorter syntax
const greetArrow = (name) => "Hello, " + name + "!";

// Default and rest parameters
function createUser(name, role = "viewer") { return { name, role }; }
function sum(...numbers) { return numbers.reduce((t, n) => t + n, 0); }

// Closure — function remembers its outer scope
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
\\\`\\\`\\\`

> **Role connection:** React components are functions. Node.js APIs use callbacks and closures extensively.

---

## 3. Arrays and Objects

\\\`\\\`\\\`javascript
const fruits = ["apple", "banana", "cherry"];
const upper = fruits.map(f => f.toUpperCase());
const longNames = fruits.filter(f => f.length > 5);
const totalLength = fruits.reduce((sum, f) => sum + f.length, 0);
const found = fruits.find(f => f.startsWith("b"));

const [first, ...rest] = fruits; // Destructuring
const moreFruits = [...fruits, "date"]; // Spread

const user = { name: "Alice", age: 30, address: { city: "Stockholm" } };
const { name, address: { city } } = user;
const updated = { ...user, age: 31 };
const zip = user?.address?.zip; // Optional chaining
\\\`\\\`\\\`

---

## 4. Control Flow

\\\`\\\`\\\`javascript
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";

for (const fruit of ["apple", "banana"]) { console.log(fruit); }
for (const key in user) { console.log(key, user[key]); }
\\\`\\\`\\\`

---

## 5. DOM Manipulation

\\\`\\\`\\\`javascript
const heading = document.getElementById("main-title");
heading.textContent = "New Title"; // Safe text update
heading.classList.add("active");
heading.classList.toggle("highlighted");

const newDiv = document.createElement("div");
newDiv.textContent = "I am new!";
document.body.appendChild(newDiv);
\\\`\\\`\\\`

---

## 6. Events

\\\`\\\`\\\`javascript
const button = document.querySelector("#submit");
button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked:", e.target);
});

// Event delegation
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Clicked item:", e.target.textContent);
  }
});
\\\`\\\`\\\`

---

## 7. Asynchronous JavaScript

\\\`\\\`\\\`javascript
// async/await — the modern approach
async function loadUser() {
  try {
    const response = await fetch("/api/users/1");
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error("Failed:", error);
  }
}
\\\`\\\`\\\`

---

## 8. ES6+ Features

\\\`\\\`\\\`javascript
const greeting = \\\`Hello, \\\${name}!\\\`;
const map = new Map();
map.set("key", "value");
const set = new Set([1, 2, 2, 3]); // {1, 2, 3}
const value = null ?? "default";
let x = null;
x ??= 10;
\\\`\\\`\\\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Variables | Use \\\`const\\\` by default, \\\`let\\\` when reassigning |
| Functions | Arrow functions for callbacks, closures for state |
| Arrays | Master map, filter, reduce |
| DOM | querySelector + addEventListener |
| Async | async/await with try/catch |

---

## Recommended Videos — Beginner

- **Fireship** — "JavaScript in 100 Seconds" — https://www.youtube.com/watch?v=DHjqpvDnNGE
- **Traversy Media** — "JavaScript Crash Course For Beginners" — https://www.youtube.com/watch?v=hdI2bqOjy3c
- **freeCodeCamp** — "JavaScript Programming – Full Course" — https://www.youtube.com/watch?v=jS4aFq5-91M
`,
    mid: `# JavaScript — Mid Level Deep Dive

Intermediate JavaScript concepts for productive mid-level engineers.

---

## 1. Closures and Lexical Scope

\\\`\\\`\\\`javascript
function createGreeter(greeting) {
  return function(name) { return greeting + ", " + name + "!"; };
}
const sayHello = createGreeter("Hello");
console.log(sayHello("Alice")); // "Hello, Alice!"

// Data privacy
function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit(amt) { balance += amt; return balance; },
    withdraw(amt) {
      if (amt > balance) throw new Error("Insufficient funds");
      balance -= amt; return balance;
    },
    getBalance() { return balance; },
  };
}
\\\`\\\`\\\`

---

## 2. Classes and Inheritance

\\\`\\\`\\\`javascript
class Animal {
  constructor(name, sound) { this.name = name; this.sound = sound; }
  speak() { return this.name + " says " + this.sound; }
}

class Dog extends Animal {
  constructor(name, breed) { super(name, "Woof"); this.breed = breed; }
  speak() { return super.speak() + "! (tail wagging)"; }
}

class Counter {
  #count = 0; // Private field
  increment() { this.#count++; }
  get value() { return this.#count; }
}
\\\`\\\`\\\`

---

## 3. Modules

\\\`\\\`\\\`javascript
export function add(a, b) { return a + b; }
export default class Calculator { }
import { add } from './math.js';
const { Chart } = await import('./chart.js'); // Dynamic import
\\\`\\\`\\\`

---

## 4. Error Handling

\\\`\\\`\\\`javascript
class ValidationError extends Error {
  constructor(field, msg) { super(msg); this.name = "ValidationError"; this.field = field; }
}

try {
  if (!email.includes("@")) throw new ValidationError("email", "Invalid");
} catch (err) {
  if (err instanceof ValidationError) console.log(err.field, err.message);
  else throw err;
}
\\\`\\\`\\\`

---

## 5. Fetch API and Async Patterns

\\\`\\\`\\\`javascript
async function loadDashboard() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return { users, posts };
}

// AbortController for timeouts
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
fetch("/api/slow", { signal: controller.signal });
\\\`\\\`\\\`

---

## 6. Testing with Jest

\\\`\\\`\\\`javascript
describe("Calculator", () => {
  test("adds numbers", () => { expect(add(2, 3)).toBe(5); });
  test("async data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1 }]) })
    );
    const users = await getUsers();
    expect(users).toHaveLength(1);
  });
});
\\\`\\\`\\\`

---

## 7. Functional Programming

\\\`\\\`\\\`javascript
const pipe = (...fns) => (v) => fns.reduce((a, fn) => fn(a), v);
const transform = pipe((x) => x * 2, (x) => x + 1, (x) => x * x);
console.log(transform(3)); // 49

const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};
\\\`\\\`\\\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Closures | Functions remember their creation scope |
| Classes | Syntactic sugar over prototypes |
| Modules | ES modules enable tree-shaking |
| Fetch | Use async/await with AbortController |
| FP | Composition and immutability for predictable code |

---

## Recommended Videos — Mid Level

- **Web Dev Simplified** — "Learn Closures In 7 Minutes" — https://www.youtube.com/watch?v=3a0I8ICR1Vg
- **Web Dev Simplified** — "JavaScript Async Await" — https://www.youtube.com/watch?v=V_Kr9OSfDeU
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ
`,
    senior: `# JavaScript — Senior Level Deep Dive

Advanced JavaScript topics: event loop, memory, performance, patterns, security.

---

## 1. The Event Loop

\\\`\\\`\\\`javascript
console.log("1 — Sync");
setTimeout(() => console.log("2 — Macrotask"), 0);
Promise.resolve().then(() => console.log("3 — Microtask"));
console.log("4 — Sync");
// Output: 1, 4, 3, 2
\\\`\\\`\\\`

\\\`\\\`\\\`mermaid
flowchart TD
    A[Call Stack] --> B{Stack Empty?}
    B -->|No| A
    B -->|Yes| C{Microtask Queue?}
    C -->|Has tasks| D[Execute ALL Microtasks]
    D --> C
    C -->|Empty| E{Macrotask Queue?}
    E -->|Has tasks| F[Execute ONE Macrotask]
    F --> B
    E -->|Empty| G[Wait]
    G --> B
\\\`\\\`\\\`

\\\`\\\`\\\`javascript
// Break heavy work into chunks
function processInChunks(items, size = 100) {
  let i = 0;
  function chunk() {
    const end = Math.min(i + size, items.length);
    for (; i < end; i++) { /* process */ }
    if (i < items.length) setTimeout(chunk, 0);
  }
  chunk();
}
\\\`\\\`\\\`

---

## 2. Memory Management

\\\`\\\`\\\`javascript
// Clean up event listeners to prevent leaks
class Component {
  constructor() {
    this.handler = () => {};
    window.addEventListener("resize", this.handler);
  }
  destroy() { window.removeEventListener("resize", this.handler); }
}

// WeakMap for non-leaking caches
const cache = new WeakMap();
function getMeta(obj) {
  if (!cache.has(obj)) cache.set(obj, { created: Date.now() });
  return cache.get(obj);
}
\\\`\\\`\\\`

---

## 3. Performance

\\\`\\\`\\\`javascript
function debounce(fn, delay) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), delay); };
}

function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const r = fn(...args);
    cache.set(key, r);
    return r;
  };
}
\\\`\\\`\\\`

---

## 4. Design Patterns

\\\`\\\`\\\`javascript
// Observer / EventEmitter
class EventEmitter {
  constructor() { this.listeners = new Map(); }
  on(evt, cb) {
    if (!this.listeners.has(evt)) this.listeners.set(evt, []);
    this.listeners.get(evt).push(cb);
    return () => this.off(evt, cb);
  }
  off(evt, cb) {
    const cbs = this.listeners.get(evt);
    if (cbs) this.listeners.set(evt, cbs.filter(c => c !== cb));
  }
  emit(evt, ...args) { (this.listeners.get(evt) || []).forEach(cb => cb(...args)); }
}

// Strategy Pattern
const strategies = {
  alpha: (a, b) => a.name.localeCompare(b.name),
  date: (a, b) => new Date(b.date) - new Date(a.date),
};
function sortItems(items, strategy) { return [...items].sort(strategies[strategy]); }
\\\`\\\`\\\`

---

## 5. Security Best Practices

**XSS Prevention:** Always use \\\`textContent\\\` for inserting user-provided text. Never pass untrusted data to methods that parse markup. Use a sanitizer library like DOMPurify when rendering rich content.

\\\`\\\`\\\`javascript
// SAFE — plain text insertion
element.textContent = userInput;

// Sanitization for rich content
// import DOMPurify from 'dompurify';
// element.innerHTML = DOMPurify.sanitize(richContent);

// Prototype pollution prevention
function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key === "__proto__" || key === "constructor") continue;
    target[key] = source[key];
  }
}

// CSRF tokens in requests
async function securePost(url, data) {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": token },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
}
\\\`\\\`\\\`

---

## 6. Web Workers

\\\`\\\`\\\`javascript
const worker = new Worker("worker.js");
worker.postMessage({ type: "compute", data: [1, 2, 3] });
worker.onmessage = (e) => console.log("Result:", e.data);

// worker.js
self.onmessage = (event) => {
  const result = event.data.data.map(n => n * n);
  self.postMessage(result);
};
\\\`\\\`\\\`

---

## Summary

| Topic | Key Takeaway |
|-------|-------------|
| Event Loop | Microtasks before macrotasks; never block |
| Memory | Clean up listeners; use WeakMap |
| Performance | Debounce, throttle, memoize |
| Patterns | Observer, Strategy solve recurring problems |
| Security | textContent for text, DOMPurify for HTML, CSRF tokens |
| Workers | Offload CPU work to background threads |

---

## Recommended Videos — Senior Level

- **JSConf EU** — "Jake Archibald on the web browser event loop" — https://www.youtube.com/watch?v=cCOL7MC4Pl0
- **JSConf** — "What the heck is the event loop anyway?" — https://www.youtube.com/watch?v=8aGhZQkoFbQ
- **JSUnconf** — "Learning Functional Programming with JavaScript" — https://www.youtube.com/watch?v=e-5obm1G_FY
`
  },
  'HTML-CSS': {
    beginner: `# HTML & CSS — Beginner Deep Dive

Welcome to the foundational deep dive into **HTML & CSS**. These two technologies form the bedrock of every website on the internet. HTML provides the structure and meaning, while CSS controls the visual presentation. Mastering them is essential for every web developer, regardless of specialization.

> **Role connection:** Whether you become a front-end engineer, full-stack developer, or even a back-end developer who occasionally touches templates, understanding semantic HTML and CSS layout is non-negotiable. Designers, QA engineers, and product managers also benefit from knowing how the web is built.

---

## 1. Semantic HTML5

Semantic HTML means using elements that convey **meaning** about the content they contain, rather than relying solely on generic \\\`<div>\\\` and \\\`<span>\\\` tags. HTML5 introduced a rich set of semantic elements that improve accessibility, SEO, and code readability.

### Why Semantic Elements Matter

Before HTML5, developers structured pages almost entirely with \\\`<div>\\\` elements, adding classes like \\\`class="header"\\\` or \\\`class="nav"\\\` to indicate purpose. Search engines and assistive technologies had to guess what each \\\`<div>\\\` meant. Semantic elements remove that guesswork.

**Why it matters:** Screen readers announce semantic elements by role (e.g., "navigation" or "main content"), enabling users with disabilities to jump between sections. Search engines use semantic structure to better understand and rank your pages.

### Core Semantic Elements

\\\`\\\`\\\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Semantic HTML5 Example</title>
</head>
<body>

  <!-- The <header> element represents introductory content -->
  <!-- Typically contains the site logo, title, and primary navigation -->
  <header>
    <h1>Tech Hub Learning Platform</h1>
    <nav aria-label="Primary navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- The <main> element wraps the dominant content of the page -->
  <!-- There should be only ONE <main> per page -->
  <main>
    <!-- <article> is a self-contained composition that could be -->
    <!-- independently distributed or reused (blog post, news story) -->
    <article>
      <h2>Understanding Semantic HTML</h2>
      <p>Published on <time datetime="2026-03-15">March 15, 2026</time></p>

      <!-- <section> groups thematically related content -->
      <section>
        <h3>What Are Semantic Elements?</h3>
        <p>Semantic elements clearly describe their meaning to both
           the browser and the developer.</p>
      </section>

      <section>
        <h3>Benefits of Semantic HTML</h3>
        <p>Improved accessibility, better SEO, and cleaner code.</p>
      </section>

      <!-- <figure> wraps self-contained content like images, -->
      <!-- diagrams, or code snippets with an optional caption -->
      <figure>
        <img src="/images/semantic-diagram.png"
             alt="Diagram showing semantic HTML5 element hierarchy" />
        <figcaption>Figure 1: Semantic HTML5 element hierarchy</figcaption>
      </figure>
    </article>

    <!-- <aside> holds content tangentially related to the main content -->
    <aside>
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/css-basics">CSS Basics</a></li>
        <li><a href="/accessibility">Web Accessibility</a></li>
      </ul>
    </aside>
  </main>

  <!-- The <footer> element represents the footer of its nearest -->
  <!-- sectioning content or the entire page -->
  <footer>
    <p>&copy; 2026 Tech Hub Solutions. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </nav>
  </footer>

</body>
</html>
\\\`\\\`\\\`

### The \\\`<details>\\\` and \\\`<summary>\\\` Elements

These elements provide native, interactive disclosure widgets without JavaScript:

\\\`\\\`\\\`html
<!-- <details> creates an expandable/collapsible section -->
<!-- The <summary> is the always-visible clickable heading -->
<details>
  <summary>What browsers support semantic HTML5?</summary>
  <p>All modern browsers fully support HTML5 semantic elements.
     For legacy IE support, you can use the html5shiv polyfill,
     though this is rarely needed in 2026.</p>
</details>

<details open>
  <!-- The "open" attribute makes it expanded by default -->
  <summary>Can I nest semantic elements?</summary>
  <p>Yes! For example, an <code>&lt;article&gt;</code> can contain
     multiple <code>&lt;section&gt;</code> elements, each with its
     own <code>&lt;header&gt;</code> and <code>&lt;footer&gt;</code>.</p>
</details>

<!-- EXERCISE: Create a FAQ page with at least 5 <details> elements -->
<!-- covering HTML5 semantic elements. Each answer should contain -->
<!-- at least one code example. -->
\\\`\\\`\\\`

> **Role connection:** Front-end developers structure every page with these elements. Accessibility specialists audit sites for proper semantic usage. Even back-end developers writing server-rendered templates need to produce semantically correct HTML.

---

## 2. Forms & Inputs

Forms are the primary way users interact with web applications — from login screens to search bars to multi-step wizards. HTML5 introduced powerful built-in validation and new input types that reduce the need for JavaScript.

### Building a Complete Form

\\\`\\\`\\\`html
<!-- The <form> element groups all form controls -->
<!-- action: where data is sent; method: HTTP method -->
<form action="/api/register" method="POST" novalidate>

  <!-- Always wrap inputs with <label> for accessibility -->
  <!-- The "for" attribute must match the input's "id" -->
  <div class="form-group">
    <label for="fullName">Full Name</label>
    <input
      type="text"
      id="fullName"
      name="fullName"
      required
      minlength="2"
      maxlength="100"
      placeholder="Enter your full name"
      autocomplete="name"
    />
    <!-- The "required" attribute prevents form submission if empty -->
    <!-- "minlength" and "maxlength" set character limits -->
  </div>

  <div class="form-group">
    <label for="email">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="you@example.com"
      autocomplete="email"
    />
    <!-- type="email" triggers built-in email format validation -->
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number, one uppercase
             and lowercase letter, and at least 8 characters"
      autocomplete="new-password"
    />
    <!-- "pattern" uses a regex for custom validation rules -->
    <!-- "title" shows on hover and in validation messages -->
  </div>

  <div class="form-group">
    <label for="birthdate">Date of Birth</label>
    <input
      type="date"
      id="birthdate"
      name="birthdate"
      min="1920-01-01"
      max="2010-12-31"
    />
    <!-- type="date" provides a native date picker -->
  </div>

  <div class="form-group">
    <label for="experience">Years of Experience</label>
    <input
      type="number"
      id="experience"
      name="experience"
      min="0"
      max="50"
      step="1"
      value="0"
    />
  </div>

  <!-- Grouping related controls with <fieldset> and <legend> -->
  <fieldset>
    <legend>Preferred Role</legend>

    <div>
      <input type="radio" id="frontend" name="role" value="frontend" />
      <label for="frontend">Front-End Developer</label>
    </div>
    <div>
      <input type="radio" id="backend" name="role" value="backend" />
      <label for="backend">Back-End Developer</label>
    </div>
    <div>
      <input type="radio" id="fullstack" name="role" value="fullstack" checked />
      <label for="fullstack">Full-Stack Developer</label>
    </div>
  </fieldset>

  <!-- Dropdown select -->
  <div class="form-group">
    <label for="framework">Favorite Framework</label>
    <select id="framework" name="framework">
      <option value="" disabled selected>Choose one...</option>
      <optgroup label="JavaScript">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </optgroup>
      <optgroup label="CSS">
        <option value="tailwind">Tailwind CSS</option>
        <option value="bootstrap">Bootstrap</option>
      </optgroup>
    </select>
  </div>

  <!-- Textarea for multi-line input -->
  <div class="form-group">
    <label for="bio">Short Bio</label>
    <textarea
      id="bio"
      name="bio"
      rows="4"
      maxlength="500"
      placeholder="Tell us about yourself..."
    ></textarea>
  </div>

  <!-- Checkbox for boolean options -->
  <div class="form-group">
    <input type="checkbox" id="terms" name="terms" required />
    <label for="terms">I agree to the Terms of Service</label>
  </div>

  <button type="submit">Register</button>
  <button type="reset">Clear Form</button>
</form>

<!-- EXERCISE: Build a contact form with fields for name, email, -->
<!-- subject (dropdown), message (textarea), and a file upload. -->
<!-- Use appropriate validation attributes on every field. -->
\\\`\\\`\\\`

### HTML5 Input Types Reference

\\\`\\\`\\\`html
<!-- These input types provide built-in UI and validation -->
<input type="text" />       <!-- Plain text -->
<input type="email" />      <!-- Email validation -->
<input type="url" />        <!-- URL validation -->
<input type="tel" />        <!-- Telephone (mobile keyboard) -->
<input type="search" />     <!-- Search with clear button -->
<input type="number" />     <!-- Numeric with spinners -->
<input type="range" />      <!-- Slider control -->
<input type="date" />       <!-- Date picker -->
<input type="time" />       <!-- Time picker -->
<input type="datetime-local" /> <!-- Date + time picker -->
<input type="month" />      <!-- Month/year picker -->
<input type="week" />       <!-- Week picker -->
<input type="color" />      <!-- Color picker -->
<input type="file" />       <!-- File upload -->
<input type="hidden" />     <!-- Hidden data -->

<!-- The datalist element provides autocomplete suggestions -->
<input type="text" list="languages" id="langInput" />
<datalist id="languages">
  <option value="JavaScript" />
  <option value="Python" />
  <option value="TypeScript" />
  <option value="Rust" />
  <option value="Go" />
</datalist>
\\\`\\\`\\\`

**Why it matters:** Proper form construction is critical for usability, accessibility, and data quality. Native validation attributes reduce JavaScript bundle size, improve performance, and work even when scripts fail to load.

---

## 3. CSS Selectors & Specificity

Selectors determine which HTML elements your styles apply to. Understanding specificity — how the browser decides which rule wins when multiple rules target the same element — is fundamental to writing predictable CSS.

### Selector Types

\\\`\\\`\\\`css
/* --- Type (element) selectors --- */
/* Targets ALL elements of that type */
/* Specificity: 0-0-1 */
p {
  line-height: 1.6;
}

h1 {
  font-size: 2.5rem;
}

/* --- Class selectors --- */
/* Targets elements with the specified class */
/* Specificity: 0-1-0 */
.card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.card--featured {
  border-color: #3b82f6;
}

/* --- ID selectors --- */
/* Targets the ONE element with that ID */
/* Specificity: 1-0-0 (very high — use sparingly!) */
#main-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* --- Attribute selectors --- */
/* Target elements based on their attributes */
/* Specificity: 0-1-0 (same as a class) */
input[type="email"] {
  background-image: url('/icons/email.svg');
  background-repeat: no-repeat;
  padding-left: 2rem;
}

a[href^="https://"] {
  /* ^= means "starts with" */
  color: green;
}

a[href$=".pdf"] {
  /* $= means "ends with" */
  color: red;
}

a[href*="example"] {
  /* *= means "contains" */
  text-decoration: underline;
}

/* --- Universal selector --- */
/* Matches everything; specificity: 0-0-0 */
* {
  margin: 0;
  padding: 0;
}
\\\`\\\`\\\`

### Combinators

\\\`\\\`\\\`css
/* Descendant combinator (space) */
/* Selects ALL <p> elements inside .article, at any depth */
.article p {
  margin-bottom: 1em;
}

/* Child combinator (>) */
/* Selects only DIRECT <li> children of .nav-list */
.nav-list > li {
  display: inline-block;
}

/* Adjacent sibling combinator (+) */
/* Selects the <p> immediately after an <h2> */
h2 + p {
  font-size: 1.125rem;
  color: #4a5568;
}

/* General sibling combinator (~) */
/* Selects ALL <p> elements that follow an <h2> at the same level */
h2 ~ p {
  line-height: 1.8;
}

/* Combining multiple selectors */
/* A nav link that is hovered and has the .active class */
nav a.active:hover {
  color: #2563eb;
  text-decoration: none;
}
\\\`\\\`\\\`

### Specificity Calculation

\\\`\\\`\\\`css
/*
Specificity is calculated as a three-part value: (ID, Class, Type)

  Selector                  | Specificity
  --------------------------|-----------
  p                         | 0-0-1
  .card                     | 0-1-0
  p.card                    | 0-1-1
  #header                   | 1-0-0
  #header .nav a            | 1-1-1
  #header .nav a:hover      | 1-2-1
  style="..."  (inline)     | Beats all normal rules
  !important                | Beats inline (avoid this!)

  Higher specificity always wins, regardless of source order.
  When specificity is equal, the LAST rule in source order wins.
*/

/* Example: Which color wins? */
p { color: black; }            /* 0-0-1 */
.intro { color: blue; }       /* 0-1-0  — this wins over the p rule */
#hero .intro { color: red; }  /* 1-1-0  — this wins over .intro */

/* EXERCISE: Calculate the specificity of each selector below */
/* and determine which background-color would be applied to */
/* <div id="app" class="container main"> */
/*   div            -> ??? */
/*   .container     -> ??? */
/*   div.container  -> ??? */
/*   #app           -> ??? */
/*   #app.container -> ??? */
\\\`\\\`\\\`

**Why it matters:** Specificity bugs are among the most common CSS issues. Understanding how specificity works prevents the temptation to use \\\`!important\\\` everywhere, leading to maintainable stylesheets.

> **Role connection:** Every front-end developer spends significant time debugging CSS specificity issues. Understanding the cascade and specificity model saves hours of frustration and produces cleaner code.

---

## 4. The Box Model

Every HTML element is a rectangular box. The CSS box model describes how the browser calculates the total size of each element by combining content, padding, border, and margin.

\\\`\\\`\\\`css
/*
  The Box Model (from inside out):

  +----------------------------------+
  |            MARGIN                |
  |  +---------------------------+   |
  |  |         BORDER            |   |
  |  |  +--------------------+   |   |
  |  |  |      PADDING       |   |   |
  |  |  |  +-------------+   |   |   |
  |  |  |  |   CONTENT   |   |   |   |
  |  |  |  +-------------+   |   |   |
  |  |  +--------------------+   |   |
  |  +---------------------------+   |
  +----------------------------------+
*/

/* Without box-sizing: border-box */
/* Total width = width + padding-left + padding-right
                       + border-left + border-right */
.box-content {
  box-sizing: content-box; /* default behavior */
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width: 300 + 20 + 20 + 5 + 5 = 350px */
}

/* With box-sizing: border-box */
/* Total width = width (padding and border included) */
.box-border {
  box-sizing: border-box; /* much easier to work with */
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width: 300px (content shrinks to 250px) */
}

/* Best practice: Apply border-box globally */
*,
*::before,
*::after {
  box-sizing: border-box;
}
\\\`\\\`\\\`

### Display Types

\\\`\\\`\\\`css
/* Block elements take the full available width */
/* They start on a new line */
.block-element {
  display: block;
  /* <div>, <p>, <h1>-<h6>, <section> are block by default */
}

/* Inline elements only take as much width as needed */
/* They flow within text; width/height have no effect */
.inline-element {
  display: inline;
  /* <span>, <a>, <strong>, <em> are inline by default */
  /* width: 200px;  <-- this would be IGNORED */
}

/* Inline-block: flows inline but respects width/height */
.inline-block-element {
  display: inline-block;
  width: 200px;
  height: 100px;
  vertical-align: top;
}

/* None: removes the element from the document flow entirely */
.hidden {
  display: none;
  /* The element is not rendered and takes up no space */
  /* Compare with visibility: hidden which hides but keeps space */
}
\\\`\\\`\\\`

### Margin Collapsing

\\\`\\\`\\\`css
/*
  Vertical margins collapse: when two block elements are stacked,
  their vertical margins don't add up — the larger one wins.
*/

.paragraph-a {
  margin-bottom: 20px;
}

.paragraph-b {
  margin-top: 30px;
}

/*
  The gap between .paragraph-a and .paragraph-b is 30px, NOT 50px.
  This is margin collapsing — the larger margin wins.

  Margin collapsing does NOT happen:
  - With horizontal (left/right) margins
  - On flex or grid items
  - When there is padding or border between elements
  - On floated or absolutely positioned elements
*/

/* EXERCISE: Create a card component that is 350px wide, has */
/* 24px of internal spacing, a 2px border, and 16px of space */
/* between cards. Use border-box sizing. Calculate the content */
/* area width. */
\\\`\\\`\\\`

**Why it matters:** If you do not understand the box model, every layout you build will behave unpredictably. The \\\`border-box\\\` fix alone prevents countless layout bugs.

---

## 5. Flexbox

Flexbox is a one-dimensional layout model designed for distributing space among items in a container. It excels at alignment, direction, and order control.

### Flex Container Properties

\\\`\\\`\\\`css
/* A flex container is created with display: flex */
.flex-container {
  display: flex;

  /* flex-direction: controls the main axis */
  flex-direction: row;           /* default: left to right */
  /* flex-direction: row-reverse;   right to left */
  /* flex-direction: column;        top to bottom */
  /* flex-direction: column-reverse; bottom to top */

  /* flex-wrap: should items wrap to new lines? */
  flex-wrap: nowrap;             /* default: single line */
  /* flex-wrap: wrap;               wrap to new lines */
  /* flex-wrap: wrap-reverse;       wrap upward */

  /* Shorthand: flex-flow combines direction + wrap */
  /* flex-flow: row wrap; */

  /* justify-content: alignment along the MAIN axis */
  justify-content: flex-start;   /* default: packed at start */
  /* justify-content: flex-end;     packed at end */
  /* justify-content: center;       centered */
  /* justify-content: space-between; first/last at edges, equal gaps */
  /* justify-content: space-around;  equal space around each item */
  /* justify-content: space-evenly;  equal space between all */

  /* align-items: alignment along the CROSS axis */
  align-items: stretch;          /* default: fill container height */
  /* align-items: flex-start;      top of container */
  /* align-items: flex-end;        bottom of container */
  /* align-items: center;          vertically centered */
  /* align-items: baseline;        aligned by text baseline */

  /* gap: space BETWEEN flex items (modern approach) */
  gap: 1rem;
}
\\\`\\\`\\\`

### Flex Item Properties

\\\`\\\`\\\`css
.flex-item {
  /* flex-grow: how much extra space should this item take? */
  /* 0 = don't grow (default), 1 = take equal share */
  flex-grow: 0;

  /* flex-shrink: how much should this item shrink? */
  /* 1 = shrink equally (default), 0 = don't shrink */
  flex-shrink: 1;

  /* flex-basis: the initial size before growing/shrinking */
  /* auto = use width/height, or a specific value like 200px */
  flex-basis: auto;

  /* Shorthand: flex combines grow, shrink, basis */
  /* flex: 1;           same as flex: 1 1 0% */
  /* flex: 0 0 200px;   fixed 200px, won't grow or shrink */
  /* flex: 2 1 auto;    grows 2x, shrinks normally */

  /* align-self: override align-items for this item only */
  align-self: center;

  /* order: change visual order without changing HTML */
  order: 0; /* default; lower numbers appear first */
}
\\\`\\\`\\\`

### Practical Flexbox Layouts

\\\`\\\`\\\`html
<!-- Classic navigation bar -->
<nav class="navbar">
  <a href="/" class="logo">TechHub</a>
  <ul class="nav-links">
    <li><a href="/courses">Courses</a></li>
    <li><a href="/paths">Paths</a></li>
    <li><a href="/community">Community</a></li>
  </ul>
  <div class="nav-actions">
    <button class="btn btn-outline">Log In</button>
    <button class="btn btn-primary">Sign Up</button>
  </div>
</nav>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Navigation bar using flexbox */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a202c;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-actions {
  display: flex;
  gap: 0.75rem;
}

/* Centering an element perfectly (the "holy grail" of CSS) */
.perfect-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Card row that wraps */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card-grid .card {
  flex: 1 1 300px; /* grow, shrink, minimum 300px */
  max-width: 400px;
}

/* EXERCISE: Create a footer with three columns: */
/* company info (left), navigation links (center), */
/* and social media icons (right). Use flexbox to */
/* distribute them evenly. On small screens, they */
/* should stack vertically. */
\\\`\\\`\\\`

**Why it matters:** Flexbox solves layout problems that plagued CSS for years — vertical centering, equal-height columns, and dynamic spacing. It is the go-to tool for component-level layouts.

---

## 6. CSS Grid

CSS Grid is a two-dimensional layout system that handles both rows and columns simultaneously. It is ideal for page-level layouts and complex grid-based designs.

### Grid Container Properties

\\\`\\\`\\\`css
.grid-container {
  display: grid;

  /* Define columns using grid-template-columns */
  /* Three equal columns using the fr (fraction) unit */
  grid-template-columns: 1fr 1fr 1fr;

  /* Shorthand: repeat(count, size) */
  /* grid-template-columns: repeat(3, 1fr); */

  /* Mixed units: fixed sidebar + flexible main + fixed aside */
  /* grid-template-columns: 250px 1fr 200px; */

  /* Define rows */
  grid-template-rows: auto 1fr auto;

  /* gap: space between grid cells */
  gap: 1.5rem;
  /* Or separately: row-gap and column-gap */

  /* grid-template-areas: name regions of the grid */
  grid-template-areas:
    "header  header  header"
    "sidebar main    aside"
    "footer  footer  footer";
}

/* Place items into named areas */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }
\\\`\\\`\\\`

### Auto-Fit and Auto-Fill

\\\`\\\`\\\`css
/* Responsive grid WITHOUT media queries */
.responsive-grid {
  display: grid;
  gap: 1.5rem;

  /* auto-fit: columns expand to fill available space */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* auto-fill: keeps empty columns if there is space */
.auto-fill-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/*
  auto-fit vs auto-fill:
  - auto-fit: if there are fewer items than columns, items STRETCH
  - auto-fill: if there are fewer items than columns, empty tracks remain
*/
\\\`\\\`\\\`

### Placing Items on the Grid

\\\`\\\`\\\`css
/* Grid items can span multiple columns/rows */
.featured-card {
  /* Span from column line 1 to column line 3 (2 columns) */
  grid-column: 1 / 3;

  /* Span 2 rows */
  grid-row: span 2;
}

.full-width {
  /* Span all columns, regardless of how many there are */
  grid-column: 1 / -1;
}
\\\`\\\`\\\`

### Complete Page Layout

\\\`\\\`\\\`html
<div class="page-layout">
  <header class="page-header">Header</header>
  <nav class="page-nav">Navigation</nav>
  <main class="page-main">
    <h2>Main Content</h2>
    <div class="card-grid">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
      <div class="card">Card 4</div>
      <div class="card">Card 5</div>
      <div class="card">Card 6</div>
    </div>
  </main>
  <aside class="page-sidebar">Sidebar</aside>
  <footer class="page-footer">Footer</footer>
</div>
\\\`\\\`\\\`

\\\`\\\`\\\`css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header  header"
    "nav    main    sidebar"
    "footer footer  footer";
  grid-template-columns: 220px 1fr 280px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 0;
}

.page-header  { grid-area: header;  background: #1a202c; color: white; padding: 1rem; }
.page-nav     { grid-area: nav;     background: #f7fafc; padding: 1rem; }
.page-main    { grid-area: main;    padding: 2rem; }
.page-sidebar { grid-area: sidebar; background: #f7fafc; padding: 1rem; }
.page-footer  { grid-area: footer;  background: #2d3748; color: white; padding: 1rem; }

/* Nested responsive card grid inside main */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

/* EXERCISE: Build a photo gallery layout where the first image */
/* spans 2 columns and 2 rows, while the rest are 1x1. Use */
/* grid-template-columns with auto-fit and minmax. */
\\\`\\\`\\\`

**Why it matters:** CSS Grid is the most powerful layout tool in CSS. Combined with Flexbox, you can build any layout imaginable without hacks, floats, or external frameworks.

> **Role connection:** Grid is essential for front-end developers building dashboards, landing pages, and any multi-column layout. Understanding when to use Grid vs. Flexbox is a key interview topic.

---

## 7. Responsive Design

Responsive design ensures your website works well on all screen sizes — from phones to ultra-wide monitors. The core tools are media queries, relative units, and a mobile-first approach.

### Mobile-First Approach

\\\`\\\`\\\`css
/*
  Mobile-first means you write base styles for mobile,
  then use min-width media queries to ADD styles for larger screens.
  This is the recommended approach because:
  1. Mobile styles are simpler (single column)
  2. Mobile users don't download desktop CSS
  3. It forces you to prioritize content
*/

/* Base styles (mobile) */
.container {
  width: 100%;
  padding: 0 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large desktop (1280px and up) */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }

  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
\\\`\\\`\\\`

### Relative Units

\\\`\\\`\\\`css
/*
  Relative units scale with context, making designs flexible.

  rem  — relative to root font-size (usually 16px)
  em   — relative to parent's font-size
  %    — relative to parent's dimension
  vw   — 1% of viewport width
  vh   — 1% of viewport height
  vmin — 1% of the smaller viewport dimension
  vmax — 1% of the larger viewport dimension
  ch   — width of the "0" character in the current font
*/

html {
  font-size: 16px; /* 1rem = 16px */
}

body {
  font-size: 1rem;       /* 16px */
  line-height: 1.5;       /* 24px (1.5 * 16px) */
}

h1 {
  font-size: 2.5rem;     /* 40px */
}

h2 {
  font-size: 2rem;       /* 32px */
}

/* Fluid typography: scales between a min and max size */
.fluid-heading {
  /* Minimum 1.5rem, preferred 4vw, maximum 3rem */
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Use ch units for readable line lengths */
.prose {
  max-width: 65ch; /* Roughly 65 characters per line — ideal for reading */
}

/* EXERCISE: Create a hero section that takes up the full viewport */
/* height, centers its content, and uses fluid typography for the */
/* heading (min 2rem, max 5rem). */
\\\`\\\`\\\`

### The Viewport Meta Tag

\\\`\\\`\\\`html
<!-- This tag is REQUIRED for responsive design to work on mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!--
  width=device-width — sets viewport width to the device width
  initial-scale=1.0  — sets the initial zoom level to 100%

  Without this tag, mobile browsers render the page at ~980px wide
  and then shrink it down, making everything tiny.
-->
\\\`\\\`\\\`

**Why it matters:** Over 50% of web traffic comes from mobile devices. A site that is not responsive loses half its potential audience. Mobile-first design also produces cleaner, more performant CSS.

---

## 8. Links, Images & Media

Properly handling links, images, and media elements is essential for performance, accessibility, and user experience.

### Responsive Images

\\\`\\\`\\\`html
<!-- The <picture> element provides art direction -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-wide.avif"
    type="image/avif"
  />
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-wide.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 640px)"
    srcset="/images/hero-medium.webp"
    type="image/webp"
  />
  <img
    src="/images/hero-small.jpg"
    alt="Team collaborating on a web project"
    width="800"
    height="400"
    loading="lazy"
  />
</picture>

<!-- Using srcset for resolution switching -->
<img
  src="/images/profile-200.jpg"
  srcset="
    /images/profile-200.jpg 200w,
    /images/profile-400.jpg 400w,
    /images/profile-800.jpg 800w
  "
  sizes="
    (min-width: 1024px) 400px,
    (min-width: 640px) 50vw,
    100vw
  "
  alt="Portrait of a developer"
  width="400"
  height="400"
  loading="lazy"
  decoding="async"
/>

<!--
  Key attributes:
  - alt: REQUIRED for accessibility (describe the image content)
  - width/height: prevents layout shift (CLS) as the image loads
  - loading="lazy": defers loading until near the viewport
  - decoding="async": lets the browser decode off the main thread
-->
\\\`\\\`\\\`

### Video and Audio

\\\`\\\`\\\`html
<!-- HTML5 video with multiple formats -->
<video
  controls
  width="640"
  height="360"
  poster="/images/video-poster.jpg"
  preload="metadata"
>
  <source src="/videos/intro.webm" type="video/webm" />
  <source src="/videos/intro.mp4" type="video/mp4" />

  <!-- Captions for accessibility -->
  <track
    kind="captions"
    src="/captions/intro-en.vtt"
    srclang="en"
    label="English"
    default
  />

  <p>Your browser does not support HTML5 video.
     <a href="/videos/intro.mp4">Download the video</a>.</p>
</video>

<!-- HTML5 audio -->
<audio controls preload="metadata">
  <source src="/audio/podcast-ep1.ogg" type="audio/ogg" />
  <source src="/audio/podcast-ep1.mp3" type="audio/mpeg" />
  <p>Your browser does not support the audio element.</p>
</audio>

<!-- Responsive iframe for embedded content -->
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/rg7Fvvl3taU"
    title="Tutorial: CSS Grid Layout"
    allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Make iframes responsive with aspect-ratio */
.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
}

.video-wrapper iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 8px;
}

/* Responsive images should never overflow their container */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* EXERCISE: Create an image gallery page with at least 6 images */
/* using the <picture> element. Each image should have: */
/*   - AVIF and WebP sources for large screens */
/*   - A JPEG fallback */
/*   - Proper alt text */
/*   - Lazy loading */
/*   - Width and height attributes to prevent CLS */
\\\`\\\`\\\`

### Link Best Practices

\\\`\\\`\\\`html
<!-- External links should open in new tabs with security attributes -->
<a href="https://developer.mozilla.org"
   target="_blank"
   rel="noopener noreferrer">
  MDN Web Docs
</a>

<!-- Skip navigation link for keyboard/screen reader users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Download link -->
<a href="/files/cheatsheet.pdf" download="html-css-cheatsheet.pdf">
  Download Cheat Sheet (PDF)
</a>

<!-- Email and phone links -->
<a href="mailto:hello@techhub.dev">Email Us</a>
<a href="tel:+15551234567">Call Us</a>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Style the skip link: hidden until focused */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: #1a202c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0 0 4px 4px;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
\\\`\\\`\\\`

**Why it matters:** Images often account for the majority of a page's total weight. Proper image optimization through responsive formats, lazy loading, and correct sizing can cut load times in half. Accessible links and media make your site usable by everyone.

> **Role connection:** Performance optimization through responsive images directly impacts Core Web Vitals scores, which affect SEO rankings and user experience metrics that product teams track.

---

## Beginner Level Summary

\\\`\\\`\\\`mermaid
graph TD
    A[HTML & CSS Fundamentals] --> B[Semantic HTML5]
    A --> C[Forms & Inputs]
    A --> D[CSS Selectors]
    A --> E[Box Model]
    A --> F[Flexbox]
    A --> G[CSS Grid]
    A --> H[Responsive Design]
    A --> I[Links Images & Media]

    B --> J[Accessible Structure]
    C --> J
    D --> K[Predictable Styling]
    E --> K
    F --> L[Modern Layouts]
    G --> L
    H --> M[Works Everywhere]
    I --> M

    J --> N[Production-Ready Web Pages]
    K --> N
    L --> N
    M --> N
\\\`\\\`\\\`

These eight topics form the complete foundation for building modern web pages. With semantic HTML, proper form handling, the box model, Flexbox, Grid, and responsive design, you can construct any layout and ensure it works across devices and is accessible to all users.

---

## Recommended Videos — Beginner

- **freeCodeCamp** — "Learn HTML5 and CSS3 From Scratch – Full Course" — https://www.youtube.com/watch?v=mU6anWqZJcc
- **Fireship** — "HTML in 100 Seconds" — https://www.youtube.com/watch?v=ok-plXXHlWw
- **freeCodeCamp** — "CSS Tutorial – Full Course for Beginners" — https://www.youtube.com/watch?v=OXGznpKZ_sA
`,

    mid: `# HTML & CSS — Mid-Level Deep Dive

Welcome to the mid-level deep dive. You have a solid foundation in HTML and CSS. Now it is time to learn the techniques that separate functional code from professional, scalable, and polished work. These topics cover maintainability, interactivity, accessibility, and advanced layout capabilities.

> **Role connection:** Mid-level front-end developers are expected to build component libraries, implement design systems, write accessible interfaces, and deliver smooth animations. These skills are also critical for full-stack developers building production UIs.

---

## 1. CSS Custom Properties (Variables)

CSS Custom Properties (commonly called CSS variables) enable dynamic, reusable values throughout your stylesheets. Unlike preprocessor variables (Sass/Less), they are live in the browser and can be updated at runtime with JavaScript.

### Defining and Using Variables

\\\`\\\`\\\`css
/* Define custom properties on :root for global scope */
:root {
  /* Color palette */
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #93c5fd;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Neutral scale */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Fira Code', 'Cascadia Code', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* Layout */
  --border-radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}

/* Use variables with var() */
.button {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}
\\\`\\\`\\\`

### Fallback Values

\\\`\\\`\\\`css
/* var() accepts a second argument as a fallback */
.card {
  padding: var(--card-padding, 1.5rem);
  color: var(--card-text-color, var(--color-gray-800, #333));
  background: var(--card-bg, white);
  border-radius: var(--card-radius, var(--border-radius));
}
\\\`\\\`\\\`

### Theming with Custom Properties

\\\`\\\`\\\`css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --border-color: #e5e7eb;
}

/* Dark theme via a data attribute on <html> or <body> */
[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border-color: #374151;
}

/* Also respect OS preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border-color: #374151;
  }
}

/* Components automatically adapt */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-base),
              color var(--transition-base);
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}
\\\`\\\`\\\`

### Dynamic Updates via JavaScript

\\\`\\\`\\\`html
<div class="color-picker-demo">
  <label for="themeColor">Choose accent color:</label>
  <input type="color" id="themeColor" value="#3b82f6" />
</div>

<script>
  const colorInput = document.getElementById('themeColor');
  colorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty(
      '--color-primary', e.target.value
    );
  });

  // Read a custom property value
  const styles = getComputedStyle(document.documentElement);
  const currentPrimary = styles.getPropertyValue('--color-primary').trim();
</script>

<!-- EXERCISE: Create a theme customizer panel that lets users -->
<!-- adjust primary color, border-radius, and font-size using -->
<!-- range sliders and a color picker. All changes should be -->
<!-- reflected in real-time across the entire page via CSS variables. -->
\\\`\\\`\\\`

**Why it matters:** CSS Custom Properties are the foundation of modern theming and design tokens. They enable dark mode, user preferences, and dynamic styling without CSS-in-JS overhead.

> **Role connection:** Design system engineers and front-end architects use custom properties as the bridge between design tokens and implementation. This is a core skill for building themeable component libraries.

---

## 2. Animations & Transitions

Smooth animations and transitions make interfaces feel responsive and polished. CSS provides two primary mechanisms: transitions for simple state changes and keyframe animations for complex sequences.

### Transitions

\\\`\\\`\\\`css
.button {
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  /* transition: property duration timing-function delay */
  transition: background-color 200ms ease,
              transform 200ms ease,
              box-shadow 200ms ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.3);
}

/* Timing functions control the animation curve */
.ease-examples {
  /* ease:        slow start, fast middle, slow end (default) */
  /* linear:      constant speed */
  /* ease-in:     slow start, fast end */
  /* ease-out:    fast start, slow end */
  /* ease-in-out: slow start and end */
  /* cubic-bezier(x1, y1, x2, y2): custom curve */

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
\\\`\\\`\\\`

### Keyframe Animations

\\\`\\\`\\\`css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Apply animations */
.fade-in-element {
  animation: fadeIn 0.6s ease-out forwards;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-gray-200);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Skeleton loading placeholder */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
\\\`\\\`\\\`

### Transform Property

\\\`\\\`\\\`css
/* Transforms change an element visually WITHOUT affecting document flow */
.transform-examples {
  transform: translate(20px, -10px);
  transform: translateX(50%);
  transform: scale(1.5);
  transform: rotate(45deg);
  transform: skew(10deg, 5deg);

  /* Combine multiple transforms */
  transform: translateX(20px) rotate(15deg) scale(1.1);
}

/* Performance: transform and opacity are GPU-accelerated */
/* They do NOT trigger layout recalculation (reflow) */
/* ALWAYS prefer transform over changing top/left/width/height */

/* Card flip animation */
.card-flip {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.card-flip-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  position: relative;
}

.card-flip:hover .card-flip-inner {
  transform: rotateY(180deg);
}

.card-flip-front,
.card-flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.card-flip-front {
  background: var(--color-primary);
  color: white;
}

.card-flip-back {
  background: var(--color-secondary);
  color: white;
  transform: rotateY(180deg);
}

/* EXERCISE: Create a notification toast that slides in from the */
/* right side, stays for 3 seconds, then slides out. Use */
/* @keyframes with animation-fill-mode: forwards. */
\\\`\\\`\\\`

### Respecting User Preferences

\\\`\\\`\\\`css
/* CRITICAL: Respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
\\\`\\\`\\\`

**Why it matters:** Animations improve perceived performance (loading skeletons feel faster than blank screens) and make interactions feel natural. But uncontrolled animations can cause performance problems and accessibility issues.

---

## 3. BEM Methodology

BEM (Block-Element-Modifier) is a naming convention for CSS classes that makes your code more readable, maintainable, and scalable. It solves the problem of CSS class name collisions and specificity wars.

### BEM Structure

\\\`\\\`\\\`css
/*
  Block:    A standalone component (.card, .menu, .form)
  Element:  A part of a block (.card__title, .menu__item)
  Modifier: A variation (.card--featured, .menu__item--active)

  Pattern:
    .block {}
    .block__element {}
    .block--modifier {}
    .block__element--modifier {}
*/

/* --- BLOCK: card --- */
.card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: box-shadow var(--transition-fast);
}

/* --- ELEMENTS: parts of the card --- */
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__content {
  padding: var(--space-6);
}

.card__title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.card__description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-gray-200);
}

.card__tag {
  font-size: var(--font-size-sm);
  padding: var(--space-1) var(--space-2);
  background: var(--color-gray-100);
  border-radius: 4px;
}

/* --- MODIFIERS: variations --- */
.card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.card--compact .card__content {
  padding: var(--space-4);
}

.card--horizontal {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card__tag--primary {
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.card__tag--success {
  background: #d1fae5;
  color: #065f46;
}
\\\`\\\`\\\`

### BEM in HTML

\\\`\\\`\\\`html
<article class="card">
  <img class="card__image" src="/img/course.jpg" alt="CSS Course" />
  <div class="card__content">
    <h3 class="card__title">Advanced CSS Techniques</h3>
    <p class="card__description">
      Master animations, custom properties, and modern layout methods.
    </p>
  </div>
  <footer class="card__footer">
    <span class="card__tag card__tag--primary">CSS</span>
    <span class="card__tag">12 lessons</span>
  </footer>
</article>

<!-- Featured modifier adds special styling -->
<article class="card card--featured">
  <img class="card__image" src="/img/featured.jpg" alt="Featured Course" />
  <div class="card__content">
    <h3 class="card__title">Design Systems from Scratch</h3>
    <p class="card__description">
      Build a complete design system with tokens, components, and docs.
    </p>
  </div>
  <footer class="card__footer">
    <span class="card__tag card__tag--success">New</span>
    <span class="card__tag">8 lessons</span>
  </footer>
</article>

<!-- EXERCISE: Design a navigation component using BEM with -->
<!-- .nav, .nav__list, .nav__item, .nav__link, and modifiers -->
<!-- for --active, --disabled, and --mobile. -->
\\\`\\\`\\\`

**Why it matters:** As projects grow, CSS without a naming convention becomes a tangled mess of overrides and \\\`!important\\\` hacks. BEM provides a clear contract: every class tells you what component it belongs to, what part it is, and what variation it represents.

> **Role connection:** Teams building shared component libraries rely on BEM or similar methodologies to prevent class name collisions and make code reviewable.

---

## 4. Accessibility / ARIA

Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites. ARIA (Accessible Rich Internet Applications) provides attributes that bridge gaps in native HTML semantics.

### Fundamental ARIA Attributes

\\\`\\\`\\\`html
<!-- ARIA roles describe what an element IS -->
<div role="alert">
  Your changes have been saved successfully.
</div>

<div role="tablist" aria-label="Course sections">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
    Overview
  </button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
    Curriculum
  </button>
  <button role="tab" id="tab-3" aria-selected="false" aria-controls="panel-3" tabindex="-1">
    Reviews
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <p>Course overview content goes here.</p>
</div>

<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <p>Curriculum details go here.</p>
</div>

<div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
  <p>Reviews content goes here.</p>
</div>
\\\`\\\`\\\`

### ARIA States and Properties

\\\`\\\`\\\`html
<!-- aria-expanded: for collapsible content -->
<button aria-expanded="false" aria-controls="dropdown-menu" id="menu-trigger">
  Menu
</button>
<ul id="dropdown-menu" role="menu" hidden>
  <li role="menuitem"><a href="/profile">Profile</a></li>
  <li role="menuitem"><a href="/settings">Settings</a></li>
  <li role="menuitem"><a href="/logout">Log Out</a></li>
</ul>

<!-- aria-live: for dynamic content updates -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <span id="search-status">Showing 24 results for "CSS Grid"</span>
</div>

<!-- aria-describedby: links an element to its description -->
<label for="username">Username</label>
<input type="text" id="username"
  aria-describedby="username-hint username-error"
  aria-invalid="true" />
<p id="username-hint" class="hint">Must be 3-20 characters</p>
<p id="username-error" class="error" role="alert">
  Username is already taken
</p>

<!-- aria-label: provides a label when no visible text exists -->
<button aria-label="Close dialog" class="close-btn">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<!-- aria-hidden: hides decorative elements from screen readers -->
<span aria-hidden="true" class="icon">&#9733;</span>
<span>4.5 out of 5 stars</span>
\\\`\\\`\\\`

### Focus Management

\\\`\\\`\\\`css
/* Default focus styles — NEVER remove without a replacement */
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* :focus-visible targets only keyboard focus (not mouse clicks) */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
\\\`\\\`\\\`

### Accessible Modal Dialog

\\\`\\\`\\\`html
<dialog id="confirmDialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Deletion</h2>
  <p>Are you sure you want to delete this course? This action cannot be undone.</p>
  <div class="dialog-actions">
    <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
    <button class="btn btn-danger" id="confirmBtn">Delete</button>
  </div>
</dialog>

<button id="openDialogBtn">Delete Course</button>

<script>
  const dialog = document.getElementById('confirmDialog');
  document.getElementById('openDialogBtn').addEventListener('click', () => {
    dialog.showModal();
  });
  document.getElementById('cancelBtn').addEventListener('click', () => {
    dialog.close();
  });
</script>
\\\`\\\`\\\`

\\\`\\\`\\\`css
dialog {
  border: none;
  border-radius: var(--border-radius);
  padding: var(--space-8);
  max-width: 480px;
  width: 90vw;
  box-shadow: var(--shadow-lg);
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.dialog-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  margin-top: var(--space-6);
}

/* EXERCISE: Build an accessible dropdown menu that: */
/* 1. Toggles with aria-expanded */
/* 2. Traps focus within the menu when open */
/* 3. Closes on Escape key */
/* 4. Returns focus to the trigger button on close */
/* 5. Uses role="menu" and role="menuitem" */
\\\`\\\`\\\`

**Why it matters:** Approximately 15% of the world's population has some form of disability. Accessible websites are not just a moral imperative — they are often a legal requirement (ADA, WCAG 2.1 AA, EAA in Europe).

---

## 5. SVG (Scalable Vector Graphics)

SVG provides resolution-independent graphics that look sharp on any screen. They are XML-based, can be styled with CSS, animated, and manipulated with JavaScript.

### Inline SVG Basics

\\\`\\\`\\\`html
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24" width="24" height="24"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true" class="icon">
  <!--
    viewBox="minX minY width height"
    Defines the coordinate system for the SVG.
    The SVG scales to fit its container while
    maintaining the aspect ratio defined by viewBox.
  -->
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>

<!-- SVG icon with accessible label -->
<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24" width="24" height="24"
  role="img" aria-label="Notification bell"
  class="icon icon--bell">
  <title>Notification bell</title>
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
</svg>
\\\`\\\`\\\`

### Styling SVG with CSS

\\\`\\\`\\\`css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.icon:hover { transform: scale(1.1); }

/* Color variants */
.icon--primary { color: var(--color-primary); }
.icon--success { color: var(--color-success); }
.icon--error   { color: var(--color-error); }

/* Size variants */
.icon--sm { width: 16px; height: 16px; }
.icon--lg { width: 32px; height: 32px; }
.icon--xl { width: 48px; height: 48px; }

/* Animated SVG drawing effect */
@keyframes draw {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}

.icon--animated path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 1.5s ease forwards;
}
\\\`\\\`\\\`

### Creating SVG Shapes

\\\`\\\`\\\`html
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="illustration">
  <rect x="10" y="10" width="100" height="80" rx="8" ry="8" fill="#3b82f6" opacity="0.8" />
  <circle cx="200" cy="50" r="40" fill="#8b5cf6" />
  <ellipse cx="320" cy="50" rx="60" ry="30" fill="#10b981" opacity="0.7" />
  <line x1="10" y1="130" x2="390" y2="130" stroke="#e5e7eb" stroke-width="2" />
  <polyline points="50,200 100,160 150,220 200,180 250,240"
            fill="none" stroke="#f59e0b" stroke-width="3" />
  <polygon points="320,160 360,240 280,240" fill="#ef4444" opacity="0.8" />
  <!-- Path: M=move, L=line, C=cubic bezier, Z=close -->
  <path d="M 50 280 C 50 260, 100 250, 150 270 S 250 290, 350 260"
        fill="none" stroke="#3b82f6" stroke-width="2" />
  <text x="200" y="295" text-anchor="middle" font-size="14" fill="#4b5563">
    SVG Shapes Demo
  </text>
</svg>

<!-- EXERCISE: Create an SVG bar chart showing monthly revenue -->
<!-- data for 6 months. Use <rect> for bars, <text> for labels, -->
<!-- and CSS for colors. Add a hover highlight effect. -->
\\\`\\\`\\\`

**Why it matters:** SVG icons are smaller than icon fonts, can be individually styled and animated, and provide better accessibility. SVG illustrations scale perfectly on retina displays.

---

## 6. Advanced Grid Layouts

Building on Grid fundamentals, advanced techniques include subgrid, named grid lines, and combining Grid with Flexbox for complex layouts.

### Named Grid Lines

\\\`\\\`\\\`css
.dashboard {
  display: grid;
  grid-template-columns:
    [sidebar-start] 260px
    [sidebar-end main-start] 1fr
    [main-end panel-start] 320px
    [panel-end];
  grid-template-rows:
    [header-start] 64px
    [header-end content-start] 1fr
    [content-end footer-start] auto
    [footer-end];
  min-height: 100vh;
}

.dashboard__header  { grid-column: sidebar-start / panel-end; grid-row: header-start / header-end; }
.dashboard__sidebar { grid-column: sidebar-start / sidebar-end; grid-row: content-start / footer-end; }
.dashboard__main    { grid-column: main-start / main-end; grid-row: content-start / content-end; padding: var(--space-6); overflow-y: auto; }
.dashboard__panel   { grid-column: panel-start / panel-end; grid-row: content-start / content-end; }
\\\`\\\`\\\`

### CSS Subgrid

\\\`\\\`\\\`css
/*
  Subgrid lets child elements participate in the parent's grid.
  Without subgrid, nested grids create independent track sizing.
  With subgrid, inner items align to the outer grid tracks.
*/

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Each card aligns its internal layout to consistent row heights */
.card-list .card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4; /* image, title, description, footer */
  gap: 0;
}

/* Now all card titles align across cards */
.card-list .card__title  { padding: var(--space-4); }
.card-list .card__desc   { padding: 0 var(--space-4); }
.card-list .card__footer { padding: var(--space-4); align-self: end; }
\\\`\\\`\\\`

### Combining Grid and Flexbox

\\\`\\\`\\\`css
/*
  Rule of thumb:
  - Grid for PAGE LAYOUT (2D, rows + columns)
  - Flexbox for COMPONENT LAYOUT (1D, row OR column)
*/

/* Page layout with Grid */
.app-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

/* Navigation items use Flexbox inside a Grid area */
.app-nav {
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  gap: var(--space-2);
  background: var(--bg-secondary);
  width: 240px;
}

.app-nav__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

/* Main content uses Grid for its children */
.app-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  padding: var(--space-6);
  align-content: start;
}

/* Each widget card uses Flexbox internally */
.widget-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.widget-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.widget-card__body {
  flex: 1;
  padding: var(--space-4);
}

/* EXERCISE: Build a Kanban board layout with Grid for the */
/* columns and Flexbox for the vertically stacked cards. */
\\\`\\\`\\\`

**Why it matters:** Real-world layouts require combining layout tools. Knowing when to use Grid vs. Flexbox (and how to nest them) is what distinguishes mid-level from junior CSS developers.

---

## 7. Pseudo-Elements & Pseudo-Classes

Pseudo-elements create virtual elements you can style without adding HTML. Pseudo-classes select elements based on their state or position in the DOM.

### Pseudo-Elements

\\\`\\\`\\\`css
/* ::before and ::after insert content before/after an element */
/* They REQUIRE the content property (even if empty) */

.section-title {
  position: relative;
  display: inline-block;
  margin-bottom: var(--space-6);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 2px;
}

/* Quotation marks on blockquotes */
.fancy-quote {
  position: relative;
  padding-left: var(--space-8);
  font-style: italic;
  color: var(--text-secondary);
}

.fancy-quote::before {
  content: '\\201C';
  position: absolute;
  left: 0;
  top: -0.25rem;
  font-size: 4rem;
  color: var(--color-primary);
  line-height: 1;
  font-style: normal;
}

/* Required field indicator */
.required-label::after {
  content: ' *';
  color: var(--color-error);
  font-weight: bold;
}

/* Custom bullet list */
.custom-list {
  list-style: none;
  padding-left: 0;
}

.custom-list li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: var(--space-2);
}

.custom-list li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: bold;
}
\\\`\\\`\\\`

### Advanced Pseudo-Classes

\\\`\\\`\\\`css
/* :nth-child patterns */
.table tr:nth-child(odd) { background: var(--color-gray-50); }
.grid-item:nth-child(3n) { grid-column: span 2; }
.list-item:nth-child(-n+3) { font-weight: bold; }
.list-item:nth-child(n+4):nth-child(-n+7) { opacity: 0.8; }

/* :focus-visible — keyboard focus only */
.button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* :has() — the "parent selector" */
.card:has(img) { grid-template-rows: 200px auto; }
.form-group:has(input:invalid) {
  border-left: 3px solid var(--color-error);
  padding-left: var(--space-3);
}
.form-group:has(input:focus) label {
  color: var(--color-primary);
  font-weight: 600;
}

/* :not() — exclude matching elements */
a:not(.btn) {
  color: var(--color-primary);
  text-decoration: underline;
}

input:not([type="submit"]):not([type="button"]) {
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-3);
}

/* :empty — select elements with no children or text */
.message:empty { display: none; }
.message:not(:empty) {
  padding: var(--space-3);
  border-radius: var(--border-radius);
  background: var(--color-gray-100);
}

/* EXERCISE: Create a pricing table where: */
/* 1. The middle plan uses :nth-child(2) for emphasis */
/* 2. Each feature list uses ::before with a checkmark or X */
/* 3. The :has() selector highlights the hovered card */
\\\`\\\`\\\`

**Why it matters:** Pseudo-elements reduce HTML clutter. Advanced pseudo-classes like \\\`:has()\\\` and \\\`:focus-visible\\\` are game-changers that reduce the need for JavaScript.

---

## 8. CSS Functions

CSS includes powerful built-in functions that enable dynamic calculations, responsive sizing, and logic-like behavior without JavaScript.

### calc()

\\\`\\\`\\\`css
.sidebar { width: calc(100vw - 260px); }
.container { width: calc(100% - 2 * var(--space-6)); margin: 0 auto; }
.content-area {
  --header-height: 64px;
  --footer-height: 48px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}
\\\`\\\`\\\`

### min(), max(), and clamp()

\\\`\\\`\\\`css
/* min() returns the smallest value */
.container { width: min(1200px, 90%); margin: 0 auto; }

/* max() returns the largest value */
.sidebar { width: max(200px, 25%); }

/* clamp(minimum, preferred, maximum) */
.fluid-text { font-size: clamp(1rem, 2.5vw, 2rem); }
.fluid-heading { font-size: clamp(1.75rem, 5vw, 4rem); }
.responsive-padding { padding: clamp(1rem, 3vw, 3rem); }

/* Fluid spacing system */
:root {
  --space-fluid-sm: clamp(0.5rem, 1vw, 1rem);
  --space-fluid-md: clamp(1rem, 2vw, 2rem);
  --space-fluid-lg: clamp(1.5rem, 4vw, 4rem);
  --space-fluid-xl: clamp(2rem, 6vw, 6rem);
}
\\\`\\\`\\\`

### counter() and env()

\\\`\\\`\\\`css
/* CSS Counters — automatic numbering */
.chapter-list { counter-reset: chapter; }
.chapter-list h2 { counter-increment: chapter; }
.chapter-list h2::before {
  content: "Chapter " counter(chapter) ": ";
  color: var(--color-primary);
  font-weight: 700;
}

/* Nested counters */
.outline { counter-reset: section; }
.outline h3 { counter-increment: section; counter-reset: subsection; }
.outline h3::before { content: counter(chapter) "." counter(section) " "; }
.outline h4 { counter-increment: subsection; }
.outline h4::before { content: counter(chapter) "." counter(section) "." counter(subsection) " "; }

/* env() — access environment variables for safe areas */
.app-container {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

.bottom-nav {
  padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
}

/* EXERCISE: Create a table of contents component that: */
/* 1. Automatically numbers chapters and sections using CSS counters */
/* 2. Uses clamp() for fluid font sizing */
/* 3. Handles safe-area-inset for mobile devices */
/* 4. Uses min() for a responsive max-width */
\\\`\\\`\\\`

**Why it matters:** CSS functions replace much of what previously required JavaScript calculations. \\\`clamp()\\\` alone can eliminate most media queries for typography.

> **Role connection:** Design system engineers use these functions to create fluid design tokens. Every front-end developer should know \\\`clamp()\\\` for responsive typography and \\\`calc()\\\` for dynamic spacing.

---

## Mid-Level Summary

\\\`\\\`\\\`mermaid
graph TD
    A[Mid-Level HTML & CSS] --> B[CSS Custom Properties]
    A --> C[Animations & Transitions]
    A --> D[BEM Methodology]
    A --> E[Accessibility / ARIA]
    A --> F[SVG]
    A --> G[Advanced Grid]
    A --> H[Pseudo-elements & Pseudo-classes]
    A --> I[CSS Functions]

    B --> J[Theming & Design Tokens]
    C --> K[Polished UX]
    D --> L[Scalable CSS Architecture]
    E --> M[Inclusive Interfaces]
    F --> N[Resolution-Independent Graphics]
    G --> O[Complex Layouts]
    H --> P[Less HTML Smarter CSS]
    I --> Q[Dynamic Without JS]

    J --> R[Professional Front-End Development]
    K --> R
    L --> R
    M --> R
    N --> R
    O --> R
    P --> R
    Q --> R
\\\`\\\`\\\`

These mid-level topics elevate your CSS from functional to professional. You can now build themeable component systems, create smooth animations, structure CSS with BEM, make interfaces accessible, leverage SVG, construct complex layouts, and reduce JavaScript with modern CSS features.

---

## Recommended Videos — Mid Level

- **Kevin Powell** — "Learn flexbox the easy way" — https://www.youtube.com/watch?v=u044iM9xsWU
- **Kevin Powell** — "Learn CSS Grid the easy way" — https://www.youtube.com/watch?v=rg7Fvvl3taU
- **Slaying The Dragon** — "Learn CSS Grid – A 13 Minute Deep Dive" — https://www.youtube.com/watch?v=EiNiSFIPIQE
`,

    senior: `# HTML & CSS — Senior Deep Dive

Welcome to the senior deep dive. At this level, you are not just writing CSS — you are architecting CSS systems that scale across teams, products, and platforms. These topics cover the decisions that affect entire organizations: architecture, performance, design tokens, and cutting-edge CSS capabilities.

> **Role connection:** Senior and staff front-end engineers, design system architects, and tech leads need to make decisions about CSS strategy that affect dozens of developers and millions of users. These topics directly inform those architectural decisions.

---

## 1. CSS Architecture at Scale

Choosing the right CSS architecture is one of the most impactful decisions for a front-end team. The wrong choice leads to specificity wars, bloated bundles, and developer frustration.

### ITCSS (Inverted Triangle CSS)

\\\`\\\`\\\`css
/*
  ITCSS organizes CSS from generic to specific:

  Layer 1: Settings    — variables, config (no CSS output)
  Layer 2: Tools       — mixins, functions (no CSS output)
  Layer 3: Generic     — reset, normalize, box-sizing
  Layer 4: Elements    — bare HTML element styles (h1, a, p)
  Layer 5: Objects     — layout patterns (container, grid)
  Layer 6: Components  — UI components (card, button, modal)
  Layer 7: Utilities   — overrides, helpers (!important ok here)
*/

/* === Layer 1: Settings === */
:root {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --font-family-base: 'Inter', sans-serif;
  --max-width-content: 1200px;
  --grid-gutter: 1.5rem;
}

/* === Layer 3: Generic === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  text-size-adjust: 100%;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

/* === Layer 4: Elements === */
body {
  font-family: var(--font-family-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 { line-height: 1.2; font-weight: 700; }
a { color: var(--color-brand-primary); text-decoration: none; }
a:hover { text-decoration: underline; }

/* === Layer 5: Objects === */
.o-container {
  width: min(var(--max-width-content), 100% - var(--grid-gutter) * 2);
  margin-inline: auto;
}

.o-stack > * + * { margin-block-start: var(--stack-space, 1.5rem); }
.o-cluster { display: flex; flex-wrap: wrap; gap: var(--cluster-space, 1rem); }

/* === Layer 6: Components === */
.c-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 150ms ease;
}

.c-button--primary { background: var(--color-brand-primary); color: white; }

/* === Layer 7: Utilities === */
.u-visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
}

.u-text-center { text-align: center !important; }
\\\`\\\`\\\`

### CUBE CSS

\\\`\\\`\\\`css
/*
  CUBE CSS: Composition, Utility, Block, Exception
  Embraces the cascade rather than fighting it.
*/

/* === COMPOSITION: Layout primitives === */
.flow > * + * { margin-block-start: var(--flow-space, 1em); }

.sidebar-layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter, var(--space-6));
}
.sidebar-layout > :first-child { flex-basis: 20rem; flex-grow: 1; }
.sidebar-layout > :last-child { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }

.grid-layout {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, auto-fit), minmax(var(--grid-min, 250px), 1fr));
  gap: var(--gutter, var(--space-6));
}

/* === BLOCK: Component-level styles === */
.card {
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

/* === EXCEPTION: Data-attribute driven states === */
.card[data-variant="featured"] { border: 2px solid var(--color-brand-primary); }
.card[data-state="loading"] { opacity: 0.6; pointer-events: none; }
.button[data-size="sm"] { padding: var(--space-1) var(--space-3); font-size: var(--font-size-sm); }
.button[data-size="lg"] { padding: var(--space-3) var(--space-8); font-size: var(--font-size-lg); }
\\\`\\\`\\\`

### Utility-First Approach

\\\`\\\`\\\`css
/*
  Utility-first composes styles from small utility classes.
  Pros: Fast development, consistent design, small production CSS
  Cons: Verbose HTML, learning curve
*/

/* Spacing utilities */
.m-0 { margin: 0; }
.mt-4 { margin-block-start: var(--space-4); }
.p-4 { padding: var(--space-4); }
.px-6 { padding-inline: var(--space-6); }

/* Display and flex utilities */
.flex { display: flex; }
.grid { display: grid; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: var(--space-4); }

/* Width utilities */
.w-full { width: 100%; }
.max-w-prose { max-width: 65ch; }

/* EXERCISE: Design a CSS architecture for a medium-sized SaaS */
/* application. Document your approach and create the first 3 layers. */
\\\`\\\`\\\`

**Why it matters:** CSS architecture determines how quickly your team can ship features and how maintainable your codebase remains at scale.

> **Role connection:** Senior engineers make these foundational decisions. You need to evaluate trade-offs and ensure the chosen approach works for your team.

---

## 2. Container Queries

Container queries are a paradigm shift in responsive design. Instead of adapting to the **viewport** width, components adapt to the width of their **container**.

### Basic Container Queries

\\\`\\\`\\\`css
/* Step 1: Establish a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
  /* Shorthand: container: card / inline-size; */
}

/* Step 2: Write @container rules */
.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  padding: var(--space-4);
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 200px 1fr;
    padding: var(--space-6);
  }
}

@container card (min-width: 800px) {
  .card {
    grid-template-columns: 300px 1fr auto;
    align-items: center;
  }
}
\\\`\\\`\\\`

### Responsive Components

\\\`\\\`\\\`html
<!-- Same card component works in any context -->
<!-- In a narrow sidebar: renders vertically -->
<aside class="sidebar">
  <div class="card-wrapper">
    <article class="card">
      <img class="card__image" src="/img/course.jpg" alt="Course" />
      <div class="card__body">
        <h3 class="card__title">Advanced CSS</h3>
        <p class="card__desc">Master modern CSS techniques.</p>
      </div>
    </article>
  </div>
</aside>

<!-- In a wide main area: renders horizontally -->
<main class="content">
  <div class="card-wrapper">
    <article class="card">
      <img class="card__image" src="/img/course.jpg" alt="Course" />
      <div class="card__body">
        <h3 class="card__title">Advanced CSS</h3>
        <p class="card__desc">Master modern CSS techniques.</p>
      </div>
    </article>
  </div>
</main>
\\\`\\\`\\\`

\\\`\\\`\\\`css
/* Container query units */
.card__title {
  font-size: clamp(1rem, 3cqi, 1.5rem);
}

/* Style queries (experimental) */
@container style(--theme: dark) {
  .card { background: var(--color-gray-800); color: var(--color-gray-100); }
}

/* EXERCISE: Build a responsive dashboard widget that adapts */
/* at 300px, 500px container widths using container queries only. */
\\\`\\\`\\\`

**Why it matters:** Container queries solve the "component reusability" problem that media queries cannot. A card that adapts to its container works everywhere without modification.

---

## 3. Cascade Layers

\\\`@layer\\\` gives you explicit control over the cascade ordering. This is transformative for managing specificity at scale, especially with third-party CSS.

### Defining and Ordering Layers

\\\`\\\`\\\`css
/* Declare layer order — later layers have HIGHER priority */
@layer reset, base, components, utilities;

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer base {
  body { font-family: var(--font-family-base); line-height: 1.6; }
  h1 { font-size: 2.5rem; }
  a { color: var(--color-brand-primary); }
}

@layer components {
  .card { background: white; border-radius: var(--border-radius); box-shadow: var(--shadow-sm); padding: var(--space-6); }
  .button { padding: var(--space-2) var(--space-4); border-radius: 6px; font-weight: 600; cursor: pointer; }
}
\\\`\\\`\\\`

### Managing Third-Party CSS

\\\`\\\`\\\`css
/* Third-party gets lowest priority */
@layer third-party, reset, tokens, base, layouts, components, utilities;

/* Import third-party CSS into a named layer */
@import url('https://cdn.example.com/datepicker.css') layer(third-party);
@import url('https://cdn.example.com/rich-text-editor.css') layer(third-party);

/* Your component styles ALWAYS override third-party */
@layer components {
  .datepicker-trigger {
    background: var(--color-brand-primary);
    border-radius: var(--border-radius);
  }
}
\\\`\\\`\\\`

### Nested Layers

\\\`\\\`\\\`css
@layer components {
  @layer buttons {
    .btn { padding: 0.5rem 1rem; }
    .btn--primary { background: blue; color: white; }
  }
  @layer cards {
    .card { padding: 1.5rem; border-radius: 8px; }
  }
  @layer modals {
    .modal { position: fixed; inset: 0; z-index: 1000; }
  }
}

/* Reference nested layers with dot notation */
@layer components.buttons {
  .btn--danger { background: red; color: white; }
}

/*
  IMPORTANT: Unlayered styles beat ALL layered styles.
  This is by design — it provides an escape hatch.
*/

/* EXERCISE: Refactor a project's CSS into cascade layers */
/* handling reset, third-party, base, layouts, components, utilities. */
\\\`\\\`\\\`

**Why it matters:** Cascade layers solve the specificity management problem that has plagued CSS since its inception. They are critical for large codebases and design systems.

> **Role connection:** Architects and tech leads defining CSS strategy need to decide whether and how to adopt cascade layers. This affects build tooling, workflows, and migration paths.

---

## 4. Performance Optimization

CSS directly impacts Core Web Vitals — the metrics Google uses for search ranking.

### Core Web Vitals and CSS

\\\`\\\`\\\`css
/*
  LCP (Largest Contentful Paint) — main content load speed
  CLS (Cumulative Layout Shift)  — layout stability
  INP (Interaction to Next Paint) — interaction responsiveness
  CSS affects ALL THREE.
*/

/* === Reducing CLS === */
img, video { max-width: 100%; height: auto; }

/* Use aspect-ratio for responsive containers */
.video-wrapper { aspect-ratio: 16 / 9; width: 100%; background: var(--color-gray-200); }

/* Prevent web font FOUT */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

/* Match fallback font metrics to minimize shift */
@font-face {
  font-family: 'Inter-fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}

body { font-family: 'Inter', 'Inter-fallback', sans-serif; }

/* Reserve space for dynamic content */
.ad-slot { min-height: 250px; contain: layout; }
\\\`\\\`\\\`

### Content Visibility and Containment

\\\`\\\`\\\`css
/* content-visibility: skips rendering off-screen content */
.below-fold-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}

.article-card {
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;
}

/* CSS containment */
.sidebar-widget {
  contain: layout style paint;
}
\\\`\\\`\\\`

### Animation Performance

\\\`\\\`\\\`css
/*
  Rendering pipeline: Style > Layout > Paint > Composite

  - Layout (reflow): width, height, margin, padding
  - Paint: color, background, box-shadow
  - Composite: transform, opacity (GPU-accelerated, cheapest)

  ALWAYS prefer transform/opacity for animations.
*/

/* GOOD: GPU accelerated */
.animate-slide {
  transition: transform 300ms ease, opacity 300ms ease;
}
.animate-slide.is-hidden {
  transform: translateX(-100%);
  opacity: 0;
}

/* BAD: Triggers layout on every frame */
.animate-slide-bad { transition: left 300ms ease; position: relative; }
.animate-slide-bad.is-hidden { left: -100%; }

/* will-change hint */
.card:hover { will-change: transform; }
.card:hover .card__image { transform: scale(1.05); }

/*
  CAUTION with will-change:
  - Don't apply to everything (wastes GPU memory)
  - Apply BEFORE animation starts
  - Never use: will-change: all
*/

.complex-animation { isolation: isolate; }

/* EXERCISE: Audit a real website using DevTools Performance tab. */
/* Identify CSS-caused layout shifts and document fixes. */
\\\`\\\`\\\`

**Why it matters:** A 100ms increase in load time can reduce conversions by 7%. CSS performance directly affects LCP and CLS.

---

## 5. Design Systems & Tokens

Design tokens are the atomic values of a design system — colors, typography, spacing — stored in a platform-agnostic format.

### Token Architecture

\\\`\\\`\\\`css
/*
  Three-tier token architecture:
  Tier 1: Global tokens (raw values)
  Tier 2: Alias tokens (semantic meaning)
  Tier 3: Component tokens (specific usage)
*/

/* === Tier 1: Global Tokens === */
:root {
  --global-color-blue-50: #eff6ff;
  --global-color-blue-100: #dbeafe;
  --global-color-blue-500: #3b82f6;
  --global-color-blue-600: #2563eb;
  --global-color-blue-700: #1d4ed8;
  --global-color-blue-900: #1e3a8a;

  --global-color-gray-50: #f9fafb;
  --global-color-gray-200: #e5e7eb;
  --global-color-gray-600: #4b5563;
  --global-color-gray-900: #111827;

  --global-color-red-500: #ef4444;
  --global-color-green-500: #10b981;

  --global-space-1: 0.25rem;
  --global-space-2: 0.5rem;
  --global-space-4: 1rem;
  --global-space-6: 1.5rem;
  --global-space-8: 2rem;

  --global-font-size-sm: 0.875rem;
  --global-font-size-base: 1rem;
  --global-font-size-xl: 1.25rem;
  --global-font-size-2xl: 1.5rem;
  --global-font-size-4xl: 2.25rem;

  --global-font-weight-normal: 400;
  --global-font-weight-semibold: 600;
  --global-font-weight-bold: 700;

  --global-radius-sm: 4px;
  --global-radius-md: 8px;
  --global-radius-lg: 12px;
  --global-radius-full: 9999px;

  --global-shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --global-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --global-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
}

/* === Tier 2: Alias / Semantic Tokens === */
:root {
  --color-surface-primary: var(--global-color-gray-50);
  --color-surface-secondary: white;
  --color-text-primary: var(--global-color-gray-900);
  --color-text-secondary: var(--global-color-gray-600);
  --color-text-inverse: white;
  --color-action-primary: var(--global-color-blue-600);
  --color-action-primary-hover: var(--global-color-blue-700);
  --color-action-danger: var(--global-color-red-500);
  --color-border-default: var(--global-color-gray-200);
  --color-border-focus: var(--global-color-blue-500);
}

/* Dark theme: only alias tokens change */
[data-theme="dark"] {
  --color-surface-primary: var(--global-color-gray-900);
  --color-surface-secondary: #1f2937;
  --color-text-primary: var(--global-color-gray-50);
  --color-text-secondary: #d1d5db;
  --color-border-default: #374151;
}

/* === Tier 3: Component Tokens === */
.c-button {
  --_button-padding-x: var(--global-space-4);
  --_button-padding-y: var(--global-space-2);
  --_button-radius: var(--global-radius-md);
  --_button-font-size: var(--global-font-size-base);

  display: inline-flex;
  align-items: center;
  gap: var(--global-space-2);
  padding: var(--_button-padding-y) var(--_button-padding-x);
  font-size: var(--_button-font-size);
  font-weight: var(--global-font-weight-semibold);
  border-radius: var(--_button-radius);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;
}

.c-button--primary {
  background: var(--color-action-primary);
  color: var(--color-text-inverse);
}

.c-button--primary:hover {
  background: var(--color-action-primary-hover);
}
\\\`\\\`\\\`

### Multi-Platform Token Format

\\\`\\\`\\\`css
/*
  Tokens stored in platform-agnostic JSON, transformed via
  Style Dictionary or Tokens Studio into:
  - CSS:     --color-brand-primary: #3b82f6;
  - iOS:     static let brandPrimary = UIColor(hex: "#3b82f6")
  - Android: <color name="brand_primary">#3b82f6</color>

  Example token source:
  {
    "color": {
      "brand": {
        "primary": {
          "$value": "#3b82f6",
          "$type": "color"
        }
      }
    }
  }
*/

/* EXERCISE: Design a complete token architecture for a SaaS product */
/* with color, typography, spacing, radius, and shadow scales. */
/* Include semantic aliases and a dark theme. */
\\\`\\\`\\\`

**Why it matters:** Design tokens ensure consistency across platforms and enable theming. They are the single source of truth for a design system.

---

## 6. Advanced Selectors

Modern CSS selectors enable more expressive, maintainable CSS with precise specificity control.

### :is() and :where()

\\\`\\\`\\\`css
/*
  :is() — matches any selector in its list
  Specificity: takes the HIGHEST in the list

  :where() — same behavior but specificity is ALWAYS 0
*/

/* Before :is() */
.header a:hover, .header a:focus,
.footer a:hover, .footer a:focus,
.sidebar a:hover, .sidebar a:focus {
  color: var(--color-action-primary);
}

/* After :is() */
:is(.header, .footer, .sidebar) a:is(:hover, :focus) {
  color: var(--color-action-primary);
  text-decoration: underline;
}

/* :where() for zero-specificity base styles */
:where(h1, h2, h3, h4, h5, h6) {
  line-height: 1.25;
  font-weight: 700;
}

/* Easy to override */
h2 { font-size: var(--global-font-size-2xl); }

/* :where() for reset styles */
:where(ul, ol) { list-style: none; padding: 0; }
.article-content ul { list-style: disc; padding-left: 1.5rem; }
\\\`\\\`\\\`

### Complex :not() and :has()

\\\`\\\`\\\`css
/* :not() with multiple selectors */
input:not([type="submit"], [type="button"], [type="hidden"]) {
  border: 1px solid var(--color-border-default);
  padding: var(--global-space-2) var(--global-space-4);
  border-radius: var(--global-radius-md);
}

/* :has() — the parent selector */
.form-group:has(:focus-visible) {
  background: var(--global-color-blue-50);
  border-radius: var(--global-radius-md);
}

.card:has(> img) { padding-top: 0; }
.card:not(:has(> img)) { border-top: 4px solid var(--color-action-primary); }

/* Layout changes based on content */
body:has(.modal[open]) { overflow: hidden; }
body:has(.sidebar.is-collapsed) .main-content { grid-column: 1 / -1; }

/* Quantity queries */
.tag-list:has(:nth-child(4)) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--global-space-2);
}

.tag-list:has(:only-child) { justify-content: center; }
\\\`\\\`\\\`

### Selector Performance

\\\`\\\`\\\`css
/*
  Browser matching is RIGHT-TO-LEFT.
  Avoid: .wrapper * { }  (matches every element)
  Avoid: .a .b .c .d .e { }  (deep chains)
  Prefer: .card { }  (single class)

  :has() can be expensive on large DOMs.
  Avoid complex descendant selectors with :has()
  on elements appearing thousands of times.
*/

/* EXERCISE: Refactor these selectors using :is(), :where(), :has(): */
/*   div.container > ul > li.active > a.link:hover { } */
/*   .nav a:hover, .nav a:focus, .nav a:active { } */
\\\`\\\`\\\`

**Why it matters:** \\\`:is()\\\`, \\\`:where()\\\`, and \\\`:has()\\\` are the biggest selector additions in a decade, drastically reducing repetition and enabling patterns that previously required JavaScript.

> **Role connection:** Design system architects use \\\`:where()\\\` for zero-specificity base styles. \\\`:has()\\\` reduces the need for JavaScript-based conditional styling.

---

## 7. Modern CSS Features

CSS is evolving rapidly. These cutting-edge features are shipping in browsers now.

### Modern Color Functions

\\\`\\\`\\\`css
/*
  OKLCH: perceptually uniform color space.
  oklch(lightness chroma hue / alpha)
*/

:root {
  --brand-hue: 250;
  --color-brand-100: oklch(95% 0.05 var(--brand-hue));
  --color-brand-300: oklch(78% 0.15 var(--brand-hue));
  --color-brand-500: oklch(58% 0.20 var(--brand-hue));
  --color-brand-700: oklch(38% 0.18 var(--brand-hue));
  --color-brand-900: oklch(18% 0.08 var(--brand-hue));
  /* Changing --brand-hue generates a new palette with */
  /* consistent perceived lightness */
}

/* color-mix() — blend colors */
.button--primary:hover {
  background: color-mix(in oklch, var(--color-brand-500) 80%, black);
}

.overlay {
  background: color-mix(in srgb, var(--color-brand-500) 30%, transparent);
}

.badge--light {
  background: color-mix(in oklch, var(--color-brand-500) 15%, white);
  color: var(--color-brand-700);
}
\\\`\\\`\\\`

### View Transitions

\\\`\\\`\\\`css
/* Cross-fade between DOM states */
::view-transition-old(root) { animation: fade-out 300ms ease; }
::view-transition-new(root) { animation: fade-in 300ms ease; }

@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

/* Named transitions for specific elements */
.page-title { view-transition-name: page-title; }
.hero-image  { view-transition-name: hero-image; }

::view-transition-old(page-title) { animation: slide-out-left 300ms ease; }
::view-transition-new(page-title) { animation: slide-in-right 300ms ease; }

@keyframes slide-out-left {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100px); opacity: 0; }
}
@keyframes slide-in-right {
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* MPA transitions */
@view-transition { navigation: auto; }
\\\`\\\`\\\`

### Scroll-Driven Animations

\\\`\\\`\\\`css
/* Reading progress bar tied to scroll */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--color-brand-500);
  transform-origin: left;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Reveal on scroll */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: reveal auto ease both;
  animation-timeline: view();
  animation-range: entry 20% entry 60%;
}

@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}

/* Parallax */
.hero-bg {
  animation: parallax auto linear;
  animation-timeline: scroll();
}

@keyframes parallax {
  from { transform: translateY(0); }
  to { transform: translateY(-20%); }
}

/* Sticky header shrink */
.site-header {
  --_header-height: 80px;
  height: var(--_header-height);
  animation: shrink-header auto linear forwards;
  animation-timeline: scroll();
  animation-range: 0 200px;
}

@keyframes shrink-header {
  to { --_header-height: 56px; box-shadow: var(--global-shadow-md); }
}

/* EXERCISE: Build a storytelling page with scroll-driven animations */
/* for revealing sections, fading backgrounds, and a progress bar. */
\\\`\\\`\\\`

### Additional Modern Features

\\\`\\\`\\\`css
/* Native CSS nesting */
.card {
  background: white;
  border-radius: var(--global-radius-md);

  & .card__title { font-size: var(--global-font-size-xl); }
  &:hover { box-shadow: var(--global-shadow-md); }
  &.card--featured { border: 2px solid var(--color-brand-500); }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* Popover API */
[popover] {
  border: 1px solid var(--color-border-default);
  border-radius: var(--global-radius-md);
  box-shadow: var(--global-shadow-lg);
  padding: var(--global-space-4);
  max-width: 300px;
}

/* Anchor positioning (experimental) */
.tooltip {
  position: absolute;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}

/* EXERCISE: Create a page showcasing 5 modern CSS features: */
/* nesting, color-mix(), container queries, scroll-driven */
/* animations, and view transitions. -->
\\\`\\\`\\\`

**Why it matters:** Modern CSS features eliminate the need for JavaScript in many UI patterns — scroll effects, color manipulation, component responsiveness, page transitions. Staying current means shipping faster, lighter code.

> **Role connection:** Senior engineers evaluate which modern features are production-ready, plan migration strategies from JS-based solutions to CSS-native ones, and mentor teams on adoption.

---

## Senior Level Summary

\\\`\\\`\\\`mermaid
graph TD
    A[Senior HTML & CSS] --> B[CSS Architecture]
    A --> C[Container Queries]
    A --> D[Cascade Layers]
    A --> E[Performance]
    A --> F[Design Tokens]
    A --> G[Advanced Selectors]
    A --> H[Modern CSS Features]

    B --> I[ITCSS / CUBE / Utility-First]
    C --> J[Context-Aware Components]
    D --> K[Specificity Control at Scale]
    E --> L[Core Web Vitals Optimization]
    F --> M[Cross-Platform Design Systems]
    G --> N[Expressive Low-Specificity CSS]
    H --> O[JS-Free Interactions]

    I --> P[Scalable CSS Strategy]
    J --> P
    K --> P
    L --> Q[Fast User Experience]
    M --> Q
    N --> R[Maintainable Codebase]
    O --> R

    P --> S[Production Excellence]
    Q --> S
    R --> S
\\\`\\\`\\\`

At the senior level, your CSS decisions have organizational impact. You architect systems that support dozens of developers, optimize for millions of users, and adopt modern features strategically. The combination of cascade layers, container queries, design tokens, and performance optimization defines the state-of-the-art in CSS engineering.

---

## Recommended Videos — Senior Level

- **Kevin Powell** — "Learn CSS Grid the easy way" — https://www.youtube.com/watch?v=rg7Fvvl3taU
- **Fireship** — "HTML in 100 Seconds" — https://www.youtube.com/watch?v=ok-plXXHlWw
- **freeCodeCamp** — "CSS Tutorial – Full Course for Beginners" — https://www.youtube.com/watch?v=OXGznpKZ_sA
`
  },
  'SQL': {
    beginner: `# SQL Deep Dive — Beginner Level

## 1. SELECT Fundamentals

The \`SELECT\` statement is the cornerstone of SQL. Every time you retrieve data from a database, you use \`SELECT\`. Understanding its clauses deeply is the foundation for everything else in SQL.

### The Basic SELECT

At its simplest, \`SELECT\` retrieves columns from a table. The \`FROM\` clause tells the database which table to query.

\`\`\`sql
-- Select specific columns
SELECT first_name, last_name, email
FROM employees;

-- Select all columns (use sparingly in production)
SELECT *
FROM employees;

-- Select with column aliases for readability
SELECT
    first_name AS "First Name",
    last_name AS "Last Name",
    hire_date AS "Date Hired"
FROM employees;
\`\`\`

**Why it matters:** Selecting only the columns you need reduces network transfer, memory usage, and makes your queries self-documenting. \`SELECT *\` in production code is an anti-pattern because schema changes can break your application.

> **Role connection:** Backend developers write SELECT queries thousands of times. Data engineers use them to build ETL pipelines. Frontend developers consume the data these queries return through APIs.

### WHERE — Filtering Rows

The \`WHERE\` clause filters which rows are returned. It evaluates a condition for each row and only includes rows where the condition is true.

\`\`\`sql
-- Simple equality filter
SELECT first_name, last_name, department
FROM employees
WHERE department = 'Engineering';

-- Numeric comparison
SELECT product_name, price
FROM products
WHERE price > 50.00;

-- Date comparison
SELECT order_id, order_date, total
FROM orders
WHERE order_date >= '2025-01-01';

-- Combining conditions
SELECT first_name, last_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary > 80000;
\`\`\`

**Why it matters:** Without \`WHERE\`, you fetch every row in the table — potentially millions of records. Proper filtering is the first line of defense against slow queries and wasted resources.

### ORDER BY — Sorting Results

\`ORDER BY\` controls the order of your result set. Without it, the database returns rows in an arbitrary order (often insertion order, but never guaranteed).

\`\`\`sql
-- Sort ascending (default)
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary;

-- Sort descending
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- Multi-column sort
SELECT first_name, last_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;

-- Sort by column position (less readable, but useful in UNION queries)
SELECT first_name, last_name, salary
FROM employees
ORDER BY 3 DESC;

-- Sort by alias
SELECT
    first_name,
    last_name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;
\`\`\`

### LIMIT and OFFSET — Pagination

\`LIMIT\` restricts the number of rows returned. \`OFFSET\` skips a number of rows before starting to return results.

\`\`\`sql
-- Get top 10 highest-paid employees
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;

-- Pagination: page 2 with 20 items per page
SELECT product_name, price
FROM products
ORDER BY product_name
LIMIT 20 OFFSET 20;

-- PostgreSQL also supports FETCH FIRST syntax (SQL standard)
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 10 ROWS ONLY;
\`\`\`

**Why it matters:** APIs almost always paginate results. Understanding LIMIT/OFFSET is essential for building any list or table UI. Note that OFFSET-based pagination becomes slow on large datasets — cursor-based pagination is preferred at scale.

### DISTINCT — Removing Duplicates

\`DISTINCT\` eliminates duplicate rows from results.

\`\`\`sql
-- Get unique departments
SELECT DISTINCT department
FROM employees
ORDER BY department;

-- DISTINCT on multiple columns (unique combinations)
SELECT DISTINCT department, job_title
FROM employees
ORDER BY department, job_title;

-- Count distinct values
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;
\`\`\`

\`\`\`mermaid
flowchart TD
    A[SELECT Statement] --> B[FROM - Which table?]
    B --> C[WHERE - Filter rows]
    C --> D[GROUP BY - Aggregate]
    D --> E[HAVING - Filter groups]
    E --> F[ORDER BY - Sort results]
    F --> G[LIMIT/OFFSET - Paginate]
\`\`\`

> The order above is the **logical processing order** of a SQL query. The database processes FROM first, then WHERE, then GROUP BY, and so on. Understanding this order helps you debug queries.

### EXERCISE: SELECT Fundamentals

\`\`\`sql
-- EXERCISE: Given a "products" table with columns:
-- product_id, product_name, category, price, stock_quantity, created_at

-- 1. Select all products in the 'Electronics' category, sorted by price descending
-- 2. Get the 5 most recently created products
-- 3. Find all unique categories
-- 4. Select products priced between $10 and $50, showing only name and price
\`\`\`

---

## 2. Filtering & Sorting

### Comparison Operators

SQL provides standard comparison operators that work on numbers, strings, and dates.

\`\`\`sql
-- Equality and inequality
SELECT * FROM products WHERE price = 29.99;
SELECT * FROM products WHERE category != 'Clothing';
SELECT * FROM products WHERE category <> 'Clothing'; -- Same as !=

-- Greater/less than
SELECT * FROM orders WHERE total > 100;
SELECT * FROM employees WHERE hire_date < '2024-01-01';

-- Greater/less than or equal
SELECT * FROM products WHERE stock_quantity >= 10;
SELECT * FROM orders WHERE total <= 500;
\`\`\`

### AND, OR, NOT — Logical Operators

Logical operators combine multiple conditions. Understanding operator precedence is critical.

\`\`\`sql
-- AND: both conditions must be true
SELECT * FROM employees
WHERE department = 'Engineering'
  AND salary > 90000;

-- OR: at least one condition must be true
SELECT * FROM employees
WHERE department = 'Engineering'
   OR department = 'Marketing';

-- NOT: negates a condition
SELECT * FROM products
WHERE NOT category = 'Discontinued';

-- IMPORTANT: AND has higher precedence than OR
-- This query is ambiguous without parentheses:
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Books'
  AND price > 20;

-- The above is actually evaluated as:
-- category = 'Electronics' OR (category = 'Books' AND price > 20)

-- Use parentheses to be explicit:
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Books')
  AND price > 20;
\`\`\`

**Why it matters:** Operator precedence bugs are among the most common SQL mistakes. Always use parentheses when mixing AND and OR. A missing parenthesis can silently return wrong results.

### IN — Matching Against a List

\`IN\` tests whether a value matches any value in a list. It is cleaner than chaining multiple \`OR\` conditions.

\`\`\`sql
-- Instead of multiple OR conditions
SELECT * FROM employees
WHERE department IN ('Engineering', 'Marketing', 'Sales');

-- NOT IN
SELECT * FROM employees
WHERE department NOT IN ('HR', 'Legal');

-- IN with a subquery
SELECT * FROM orders
WHERE customer_id IN (
    SELECT customer_id
    FROM customers
    WHERE country = 'Germany'
);
\`\`\`

### BETWEEN — Range Filtering

\`BETWEEN\` is inclusive on both ends. It works with numbers, dates, and strings.

\`\`\`sql
-- Numeric range (inclusive)
SELECT product_name, price
FROM products
WHERE price BETWEEN 10 AND 50;
-- Equivalent to: price >= 10 AND price <= 50

-- Date range
SELECT order_id, order_date
FROM orders
WHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';

-- NOT BETWEEN
SELECT * FROM products
WHERE price NOT BETWEEN 100 AND 500;
\`\`\`

### LIKE — Pattern Matching

\`LIKE\` performs pattern matching using wildcards: \`%\` (any sequence of characters) and \`_\` (single character).

\`\`\`sql
-- Starts with 'John'
SELECT * FROM employees WHERE first_name LIKE 'John%';

-- Ends with 'son'
SELECT * FROM employees WHERE last_name LIKE '%son';

-- Contains 'tech'
SELECT * FROM products WHERE product_name LIKE '%tech%';

-- Single character wildcard
SELECT * FROM products WHERE sku LIKE 'A_B__';
-- Matches: A1B23, AXB99, etc.

-- Case-insensitive matching (PostgreSQL)
SELECT * FROM employees WHERE first_name ILIKE 'john%';

-- Escape special characters
SELECT * FROM products WHERE description LIKE '%50\\%%' ESCAPE '\\\\';
-- Matches descriptions containing "50%"
\`\`\`

### IS NULL / IS NOT NULL

\`NULL\` represents the absence of a value. You cannot use \`=\` to check for NULL — you must use \`IS NULL\`.

\`\`\`sql
-- Find rows with NULL values
SELECT first_name, last_name, phone
FROM employees
WHERE phone IS NULL;

-- Find rows with non-NULL values
SELECT first_name, last_name, phone
FROM employees
WHERE phone IS NOT NULL;

-- Common mistake — this NEVER returns rows:
SELECT * FROM employees WHERE phone = NULL;  -- WRONG!

-- COALESCE: provide a default for NULL values
SELECT
    first_name,
    COALESCE(phone, 'No phone on file') AS phone
FROM employees;

-- NULLIF: return NULL if two values are equal
SELECT NULLIF(discount, 0) AS effective_discount
FROM orders;
\`\`\`

**Why it matters:** NULL handling is one of the trickiest parts of SQL. NULL propagates through expressions: \`NULL + 5 = NULL\`, \`NULL = NULL\` is not true (it is unknown). This "three-valued logic" causes subtle bugs in WHERE clauses and aggregations.

### EXERCISE: Filtering & Sorting

\`\`\`sql
-- EXERCISE: Given an "orders" table with columns:
-- order_id, customer_id, order_date, status, total, shipping_address, notes

-- 1. Find all orders with status 'pending' or 'processing' placed in 2025
-- 2. Find orders where notes contain the word 'urgent' (case-insensitive)
-- 3. Find orders with a total between $100 and $500, excluding cancelled orders
-- 4. Find orders where shipping_address is not provided
-- 5. List orders sorted by status (ascending) then total (descending)
\`\`\`

---

## 3. INSERT, UPDATE, DELETE

### INSERT — Adding Data

\`INSERT\` adds new rows to a table. Always specify column names for clarity and resilience to schema changes.

\`\`\`sql
-- Insert a single row with explicit columns
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES ('Jane', 'Smith', 'jane.smith@company.com', 'Engineering', 95000);

-- Insert multiple rows at once (much faster than separate INSERTs)
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES
    ('Widget A', 'Hardware', 29.99, 100),
    ('Widget B', 'Hardware', 39.99, 75),
    ('Gadget X', 'Electronics', 149.99, 50);

-- Insert with RETURNING (PostgreSQL) — get the generated ID back
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES ('Bob', 'Jones', 'bob.jones@company.com', 'Marketing', 72000)
RETURNING employee_id, first_name, last_name;

-- Insert from a SELECT (copy data between tables)
INSERT INTO employee_archive (first_name, last_name, email, department)
SELECT first_name, last_name, email, department
FROM employees
WHERE terminated_date IS NOT NULL;

-- Insert with ON CONFLICT (upsert in PostgreSQL)
INSERT INTO products (sku, product_name, price)
VALUES ('WIDGET-001', 'Widget A', 34.99)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price,
    updated_at = NOW();
\`\`\`

**Why it matters:** Understanding INSERT patterns is essential for any application that writes data. Bulk inserts (multi-row VALUES) are dramatically faster than inserting one row at a time. RETURNING eliminates the need for a follow-up SELECT.

### UPDATE — Modifying Data

\`UPDATE\` changes existing rows. Always include a \`WHERE\` clause unless you intentionally want to update every row.

\`\`\`sql
-- Update a single row
UPDATE employees
SET salary = 100000
WHERE employee_id = 42;

-- Update multiple columns
UPDATE employees
SET
    salary = 105000,
    department = 'Senior Engineering',
    updated_at = NOW()
WHERE employee_id = 42;

-- Update with a calculation
UPDATE products
SET price = price * 1.10  -- 10% price increase
WHERE category = 'Electronics';

-- Update with RETURNING
UPDATE employees
SET salary = salary * 1.05
WHERE department = 'Engineering'
RETURNING employee_id, first_name, salary AS new_salary;

-- Update from another table (PostgreSQL syntax)
UPDATE orders
SET status = 'vip_processing'
FROM customers
WHERE orders.customer_id = customers.customer_id
  AND customers.tier = 'VIP';

-- DANGEROUS: Update without WHERE affects ALL rows!
-- UPDATE employees SET salary = 0;  -- DO NOT RUN THIS!
\`\`\`

**Why it matters:** An UPDATE without a WHERE clause is one of the most common destructive mistakes in SQL. In production, always test your WHERE clause with a SELECT first.

### DELETE — Removing Data

\`DELETE\` removes rows from a table. Like UPDATE, always use a WHERE clause unless you mean to delete everything.

\`\`\`sql
-- Delete specific rows
DELETE FROM orders
WHERE status = 'cancelled'
  AND order_date < '2024-01-01';

-- Delete with RETURNING
DELETE FROM expired_sessions
WHERE expires_at < NOW()
RETURNING session_id, user_id;

-- Delete using a subquery
DELETE FROM products
WHERE product_id IN (
    SELECT product_id FROM products
    WHERE stock_quantity = 0
      AND last_sold_date < NOW() - INTERVAL '1 year'
);

-- TRUNCATE: faster than DELETE for removing all rows
-- Resets auto-increment, cannot be rolled back in some databases
TRUNCATE TABLE temp_import_data;

-- Safe deletion pattern: SELECT first, then DELETE
-- Step 1: Verify what will be deleted
SELECT * FROM orders
WHERE status = 'cancelled' AND order_date < '2024-01-01';
-- Step 2: If the results look correct, run the DELETE
DELETE FROM orders
WHERE status = 'cancelled' AND order_date < '2024-01-01';
\`\`\`

> **Role connection:** In production systems, many teams avoid hard DELETE and instead use "soft deletes" — setting a \`deleted_at\` timestamp column. This preserves data for auditing and makes recovery possible.

### EXERCISE: DML Operations

\`\`\`sql
-- EXERCISE:
-- 1. Insert 3 new products into a products table
-- 2. Increase the price of all 'Electronics' products by 15%
-- 3. Delete all orders older than 2 years with status 'cancelled'
-- 4. Write an upsert that updates a product's price if the SKU exists,
--    or inserts a new product if it does not
\`\`\`

---

## 4. JOINs

JOINs combine rows from two or more tables based on a related column. They are the fundamental mechanism for working with relational data.

### INNER JOIN

An \`INNER JOIN\` returns only rows that have matching values in both tables.

\`\`\`sql
-- Basic INNER JOIN
SELECT
    e.first_name,
    e.last_name,
    d.department_name,
    d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Multi-table JOIN
SELECT
    o.order_id,
    c.customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;
\`\`\`

\`\`\`mermaid
flowchart LR
    subgraph "INNER JOIN"
        A[Table A] --- C{Matching Rows}
        B[Table B] --- C
        C --> D[Result: Only matches]
    end
\`\`\`

### LEFT JOIN (LEFT OUTER JOIN)

A \`LEFT JOIN\` returns all rows from the left table and matching rows from the right table. Non-matching rows get NULL for the right table's columns.

\`\`\`sql
-- Find all employees, including those without a department
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- Find employees who are NOT in any department
SELECT
    e.first_name,
    e.last_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE d.department_id IS NULL;

-- Find customers who have never placed an order
SELECT
    c.customer_name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
\`\`\`

**Why it matters:** LEFT JOIN with a NULL check is one of the most useful patterns in SQL. It efficiently finds "orphan" records — customers without orders, users without profiles, products without sales.

### RIGHT JOIN and FULL OUTER JOIN

\`\`\`sql
-- RIGHT JOIN: all rows from the right table
-- (less common; you can usually rewrite as a LEFT JOIN)
SELECT
    e.first_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- FULL OUTER JOIN: all rows from both tables
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- Find unmatched rows on EITHER side
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id IS NULL OR d.department_id IS NULL;
\`\`\`

### CROSS JOIN

A \`CROSS JOIN\` produces the Cartesian product — every combination of rows from both tables.

\`\`\`sql
-- Every combination of size and color
SELECT
    s.size_name,
    c.color_name
FROM sizes s
CROSS JOIN colors c
ORDER BY s.size_name, c.color_name;

-- Useful for generating date series with categories
SELECT
    d.date,
    cat.category_name
FROM generate_series('2025-01-01'::date, '2025-12-31'::date, '1 day') AS d(date)
CROSS JOIN categories cat;
\`\`\`

### Self-Joins

A self-join joins a table to itself. Common for hierarchical data like org charts.

\`\`\`sql
-- Find employees and their managers
SELECT
    emp.first_name AS employee,
    emp.last_name AS employee_last,
    mgr.first_name AS manager,
    mgr.last_name AS manager_last
FROM employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.employee_id;

-- Find products in the same category with a higher price
SELECT
    p1.product_name AS product,
    p2.product_name AS more_expensive_alternative,
    p1.price AS current_price,
    p2.price AS alternative_price
FROM products p1
INNER JOIN products p2
    ON p1.category = p2.category
    AND p2.price > p1.price
ORDER BY p1.product_name, p2.price;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "JOIN Types Visual"
        direction LR
        IJ["INNER JOIN<br/>Only matching rows"]
        LJ["LEFT JOIN<br/>All left + matching right"]
        RJ["RIGHT JOIN<br/>All right + matching left"]
        FJ["FULL OUTER JOIN<br/>All rows from both"]
        CJ["CROSS JOIN<br/>Every combination"]
    end
\`\`\`

### EXERCISE: JOINs

\`\`\`sql
-- EXERCISE: Given tables: customers, orders, order_items, products

-- 1. List all customers with their order count (include customers with 0 orders)
-- 2. Find products that have never been ordered
-- 3. Show each order with the customer name and total item count
-- 4. Find employees who report to the same manager
-- 5. Generate a report showing every product-month combination for 2025
\`\`\`

---

## 5. Aggregate Functions

Aggregate functions compute a single result from a set of input rows. They are essential for reporting and analytics.

### COUNT, SUM, AVG, MIN, MAX

\`\`\`sql
-- COUNT: number of rows
SELECT COUNT(*) AS total_employees FROM employees;

-- COUNT with column name skips NULLs
SELECT COUNT(phone) AS employees_with_phone FROM employees;

-- COUNT DISTINCT
SELECT COUNT(DISTINCT department) AS dept_count FROM employees;

-- SUM: total of numeric values
SELECT SUM(total) AS revenue
FROM orders
WHERE order_date >= '2025-01-01';

-- AVG: arithmetic mean
SELECT AVG(salary) AS avg_salary FROM employees;

-- MIN and MAX
SELECT
    MIN(price) AS cheapest,
    MAX(price) AS most_expensive,
    AVG(price) AS average_price
FROM products;

-- Combine multiple aggregates
SELECT
    COUNT(*) AS total_orders,
    SUM(total) AS total_revenue,
    AVG(total) AS avg_order_value,
    MIN(total) AS smallest_order,
    MAX(total) AS largest_order
FROM orders
WHERE status = 'completed';
\`\`\`

### GROUP BY

\`GROUP BY\` divides rows into groups and applies aggregate functions to each group.

\`\`\`sql
-- Revenue by department
SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    SUM(salary) AS total_payroll
FROM employees
GROUP BY department
ORDER BY total_payroll DESC;

-- Orders per month
SELECT
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*) AS order_count,
    SUM(total) AS monthly_revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- Multi-column GROUP BY
SELECT
    department,
    job_title,
    COUNT(*) AS headcount,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department, job_title
ORDER BY department, avg_salary DESC;
\`\`\`

**Why it matters:** GROUP BY is the basis of every business report: sales by region, users by signup month, errors by type. Understanding it well is non-negotiable for any database work.

### HAVING — Filtering Groups

\`HAVING\` filters groups after aggregation. \`WHERE\` filters rows before aggregation.

\`\`\`sql
-- Find departments with more than 10 employees
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;

-- Find products with total sales over $10,000
SELECT
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS total_sales
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.product_name
HAVING SUM(oi.quantity * oi.unit_price) > 10000
ORDER BY total_sales DESC;

-- WHERE vs HAVING
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2023-01-01'   -- Filters ROWS before grouping
GROUP BY department
HAVING AVG(salary) > 80000        -- Filters GROUPS after aggregation
ORDER BY avg_salary DESC;
\`\`\`

> **Role connection:** Data analysts spend most of their time writing GROUP BY queries for dashboards and reports. Backend developers use them for summary endpoints. Understanding the WHERE vs HAVING distinction prevents a whole class of bugs.

### EXERCISE: Aggregate Functions

\`\`\`sql
-- EXERCISE:
-- 1. Find the total revenue per product category
-- 2. List months where total revenue exceeded $50,000
-- 3. Find the top 5 customers by total spending
-- 4. Calculate the average order value per customer,
--    but only for customers with at least 3 orders
-- 5. Show the percentage of total revenue each category represents
\`\`\`

---

## 6. Subqueries

A subquery is a query nested inside another query. They enable powerful multi-step logic within a single SQL statement.

### Scalar Subqueries

A scalar subquery returns a single value and can be used anywhere a value is expected.

\`\`\`sql
-- Find employees earning above average
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Use scalar subquery in SELECT
SELECT
    first_name,
    last_name,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS above_avg
FROM employees
ORDER BY above_avg DESC;

-- Scalar subquery with MAX
SELECT *
FROM orders
WHERE total = (SELECT MAX(total) FROM orders);
\`\`\`

### Column and Table Subqueries

\`\`\`sql
-- IN with subquery (column subquery)
SELECT customer_name, email
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE total > 500
);

-- Table subquery (derived table) in FROM
SELECT
    dept_stats.department,
    dept_stats.avg_salary,
    dept_stats.employee_count
FROM (
    SELECT
        department,
        AVG(salary) AS avg_salary,
        COUNT(*) AS employee_count
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE dept_stats.avg_salary > 75000;
\`\`\`

### Correlated Subqueries

A correlated subquery references a column from the outer query. It executes once for each row of the outer query.

\`\`\`sql
-- Find employees earning more than their department average
SELECT e.first_name, e.last_name, e.salary, e.department
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e.department
);

-- Find the most recent order for each customer
SELECT o.*
FROM orders o
WHERE o.order_date = (
    SELECT MAX(o2.order_date)
    FROM orders o2
    WHERE o2.customer_id = o.customer_id
);
\`\`\`

### EXISTS

\`EXISTS\` tests whether a subquery returns any rows. It is often more efficient than \`IN\` for large datasets.

\`\`\`sql
-- Find customers who have placed at least one order
SELECT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
);

-- Find products never ordered
SELECT p.product_name
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.product_id
);
\`\`\`

**Why it matters:** EXISTS often outperforms IN when the subquery returns many rows, because EXISTS can short-circuit — it stops as soon as it finds one matching row. NOT EXISTS is particularly useful and handles NULLs correctly, unlike NOT IN.

### EXERCISE: Subqueries

\`\`\`sql
-- EXERCISE:
-- 1. Find all products priced above the average product price
-- 2. Find customers whose total spending is in the top 10%
-- 3. For each department, find the employee with the highest salary
--    (use a correlated subquery)
-- 4. Find orders that contain at least one product from the 'Electronics' category
--    (use EXISTS)
\`\`\`

---

## 7. Basic Indexing

Indexes are data structures that speed up data retrieval. Without indexes, the database must scan every row in a table to find matches — a "sequential scan" or "full table scan."

### Creating Indexes

\`\`\`sql
-- Create a basic index on a single column
CREATE INDEX idx_employees_department
ON employees (department);

-- Create a unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_employees_email
ON employees (email);

-- Composite index (multi-column)
CREATE INDEX idx_orders_customer_date
ON orders (customer_id, order_date);

-- Drop an index
DROP INDEX idx_employees_department;
\`\`\`

### When to Index

\`\`\`mermaid
flowchart TD
    A[Should I add an index?] --> B{Is the column in WHERE, JOIN, or ORDER BY?}
    B -->|Yes| C{Is the table large?}
    B -->|No| D[Probably not needed]
    C -->|Yes| E{Is the column selective?}
    C -->|No| D
    E -->|Yes| F[Add an index]
    E -->|No| G[Index may not help much]
    F --> H{Heavy writes on this table?}
    H -->|Yes| I[Monitor write performance]
    H -->|No| J[Good to go]
\`\`\`

**Guidelines for indexing:**
- Index columns used in \`WHERE\`, \`JOIN\`, and \`ORDER BY\` clauses
- Index foreign key columns (they are not indexed automatically in PostgreSQL)
- High-selectivity columns benefit most (e.g., email vs. boolean status)
- Every index adds overhead to INSERT, UPDATE, and DELETE operations
- Composite indexes should list the most selective column first

### B-tree Concept

The default index type is a B-tree (balanced tree). It keeps data sorted, enabling efficient lookups, range scans, and ordering.

\`\`\`sql
-- B-tree indexes support these operations efficiently:
-- Equality: WHERE email = 'user@example.com'
-- Range: WHERE price BETWEEN 10 AND 50
-- Prefix: WHERE name LIKE 'John%' (but NOT '%John')
-- Ordering: ORDER BY created_at DESC

-- B-tree index on created_at enables efficient sorting
CREATE INDEX idx_orders_created ON orders (created_at DESC);
\`\`\`

### EXPLAIN Basics

\`EXPLAIN\` shows you the query plan — how the database will execute your query.

\`\`\`sql
-- Show the query plan
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

-- Show the plan with actual execution times
EXPLAIN ANALYZE SELECT * FROM employees WHERE department = 'Engineering';

-- Example output (simplified):
-- Seq Scan on employees  (cost=0.00..25.00 rows=5 width=100)
--   Filter: (department = 'Engineering')

-- After creating an index:
-- Index Scan using idx_employees_department on employees
--   Index Cond: (department = 'Engineering')
\`\`\`

**Why it matters:** EXPLAIN is how you diagnose slow queries. If you see "Seq Scan" on a large table where you expected an index to be used, something is wrong — perhaps the index does not exist, or the statistics are stale.

### EXERCISE: Indexing

\`\`\`sql
-- EXERCISE:
-- 1. Create indexes to speed up these queries:
--    a. SELECT * FROM orders WHERE customer_id = 123 AND status = 'pending';
--    b. SELECT * FROM products WHERE category = 'Electronics' ORDER BY price;
-- 2. Run EXPLAIN on both queries before and after adding indexes
-- 3. Why would an index on a boolean column (like is_active) be less useful?
\`\`\`

---

## 8. Data Types & Constraints

### Common Data Types

\`\`\`sql
-- Numeric types
CREATE TABLE example_numbers (
    id          SERIAL PRIMARY KEY,       -- Auto-incrementing integer
    quantity    INTEGER NOT NULL,          -- Whole numbers
    price       DECIMAL(10, 2),           -- Exact decimal (10 digits, 2 after point)
    rating      NUMERIC(3, 2),            -- Same as DECIMAL
    big_number  BIGINT,                   -- Large integers
    is_active   BOOLEAN DEFAULT true      -- true/false
);

-- String types
CREATE TABLE example_strings (
    id          SERIAL PRIMARY KEY,
    code        CHAR(5),                  -- Fixed-length (padded with spaces)
    name        VARCHAR(255),             -- Variable-length with max
    description TEXT,                     -- Variable-length, no max
    sku         VARCHAR(50) NOT NULL
);

-- Date/time types
CREATE TABLE example_dates (
    id           SERIAL PRIMARY KEY,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    birth_date   DATE,                    -- Date only, no time
    start_time   TIME,                    -- Time only, no date
    duration     INTERVAL                 -- A span of time
);

-- Other useful types (PostgreSQL)
CREATE TABLE example_other (
    id           SERIAL PRIMARY KEY,
    metadata     JSONB,                   -- JSON data (binary, indexable)
    tags         TEXT[],                   -- Array of text
    ip_address   INET,                    -- IP address
    price_range  INT4RANGE,               -- Range type
    unique_id    UUID DEFAULT gen_random_uuid()
);
\`\`\`

### Constraints

Constraints enforce data integrity at the database level. They prevent invalid data from ever entering your tables.

\`\`\`sql
-- PRIMARY KEY: uniquely identifies each row
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL
);

-- Composite primary key
CREATE TABLE order_items (
    order_id    INTEGER,
    product_id  INTEGER,
    quantity    INTEGER NOT NULL,
    unit_price  DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

-- FOREIGN KEY: enforces referential integrity
CREATE TABLE orders (
    order_id     SERIAL PRIMARY KEY,
    customer_id  INTEGER NOT NULL,
    order_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    total        DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- UNIQUE: no duplicate values
CREATE TABLE users (
    user_id  SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email    VARCHAR(255) UNIQUE NOT NULL
);

-- CHECK: custom validation
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price        DECIMAL(10, 2) CHECK (price >= 0),
    stock        INTEGER CHECK (stock >= 0),
    category     VARCHAR(50),
    created_at   TIMESTAMP DEFAULT NOW(),
    CONSTRAINT valid_category CHECK (
        category IN ('Electronics', 'Clothing', 'Books', 'Food', 'Other')
    )
);

-- NOT NULL: prevents NULL values
-- DEFAULT: provides a value when none is specified
CREATE TABLE audit_log (
    log_id      SERIAL PRIMARY KEY,
    action      VARCHAR(50) NOT NULL,
    table_name  VARCHAR(100) NOT NULL,
    record_id   INTEGER NOT NULL,
    changed_by  VARCHAR(100) NOT NULL,
    changed_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
\`\`\`

\`\`\`mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : "appears in"
    CUSTOMERS {
        int customer_id PK
        varchar email UK
        varchar name
    }
    ORDERS {
        int order_id PK
        int customer_id FK
        date order_date
        decimal total
    }
    ORDER_ITEMS {
        int order_id PK
        int product_id PK
        int quantity
        decimal unit_price
    }
    PRODUCTS {
        int product_id PK
        varchar product_name
        decimal price
        int stock
    }
\`\`\`

**Why it matters:** Constraints are your safety net. They catch bugs at the database level before bad data propagates through your application. A missing FOREIGN KEY can lead to orphaned records. A missing NOT NULL can cause NullPointerExceptions in your application code.

> **Role connection:** Schema design with proper types and constraints is a critical skill for backend developers, data engineers, and DBAs. Getting the schema right at the start saves enormous refactoring effort later.

### EXERCISE: Data Types & Constraints

\`\`\`sql
-- EXERCISE:
-- 1. Design a schema for a blog application with tables:
--    users, posts, comments, tags, post_tags (many-to-many)
-- 2. Include appropriate data types, primary keys, foreign keys,
--    NOT NULL, UNIQUE, CHECK, and DEFAULT constraints
-- 3. Add an index on posts.author_id and comments.post_id
-- 4. What happens when you try to delete a user who has posts?
--    How should you handle this with ON DELETE?
\`\`\`

---

## Summary — Beginner Level

You now have a solid foundation in SQL:
- **SELECT** to retrieve data with filtering, sorting, and pagination
- **Filtering** with comparison operators, logical operators, and pattern matching
- **DML** operations to insert, update, and delete data safely
- **JOINs** to combine data across related tables
- **Aggregations** for summarizing data into reports
- **Subqueries** for multi-step logic within a single query
- **Indexes** to speed up queries on large tables
- **Data types and constraints** to design robust schemas

Next up in the Mid level: window functions, CTEs, transactions, views, and query optimization.

---

## Recommended Videos — Beginner

- **Fireship** — "SQL Explained in 100 Seconds" — https://www.youtube.com/watch?v=zsjvFFKOm3c
- **freeCodeCamp** — "SQL Tutorial – Full Database Course for Beginners" — https://www.youtube.com/watch?v=HXV3zeQKqGY
- **freeCodeCamp** — "Database Design Course – Learn how to design and plan a database" — https://www.youtube.com/watch?v=ztHopE5Wnpc
`,
    mid: `# SQL Deep Dive — Mid Level

## 1. Window Functions

Window functions perform calculations across a set of rows that are related to the current row — without collapsing them into a single output row like GROUP BY does. They are one of the most powerful features in SQL.

### ROW_NUMBER, RANK, DENSE_RANK

These functions assign a number to each row within a partition.

\`\`\`sql
-- ROW_NUMBER: unique sequential number, no ties
SELECT
    employee_id,
    first_name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS dept_rank
FROM employees;

-- RANK: same rank for ties, skips numbers after ties
-- DENSE_RANK: same rank for ties, does NOT skip numbers
SELECT
    product_name,
    category,
    price,
    RANK() OVER (ORDER BY price DESC) AS price_rank,
    DENSE_RANK() OVER (ORDER BY price DESC) AS price_dense_rank
FROM products;

-- Example output:
-- Product     | Price  | RANK | DENSE_RANK
-- Widget A    | 100.00 |    1 |          1
-- Widget B    | 100.00 |    1 |          1
-- Widget C    |  90.00 |    3 |          2   <-- RANK skips 2, DENSE_RANK does not
-- Widget D    |  80.00 |    4 |          3
\`\`\`

**Why it matters:** Window functions solve problems that are extremely cumbersome with subqueries — like "get the top N per group" or "find the second highest salary per department."

### Top-N Per Group

\`\`\`sql
-- Get the top 3 highest-paid employees per department
WITH ranked AS (
    SELECT
        first_name,
        last_name,
        department,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS rn
    FROM employees
)
SELECT first_name, last_name, department, salary
FROM ranked
WHERE rn <= 3;
\`\`\`

### LEAD and LAG

\`LEAD\` looks at the next row, \`LAG\` looks at the previous row within the partition.

\`\`\`sql
-- Compare each month's revenue with the previous month
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue,
    LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC('month', order_date)) AS prev_month,
    SUM(total) - LAG(SUM(total)) OVER (
        ORDER BY DATE_TRUNC('month', order_date)
    ) AS month_over_month_change,
    ROUND(
        (SUM(total) - LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC('month', order_date)))
        / LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC('month', order_date)) * 100,
        2
    ) AS pct_change
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- Track employee salary history changes
SELECT
    employee_id,
    effective_date,
    salary,
    LAG(salary) OVER (PARTITION BY employee_id ORDER BY effective_date) AS prev_salary,
    salary - LAG(salary) OVER (
        PARTITION BY employee_id ORDER BY effective_date
    ) AS salary_change
FROM salary_history;
\`\`\`

### NTILE

\`NTILE\` distributes rows into a specified number of roughly equal groups (buckets).

\`\`\`sql
-- Divide customers into quartiles by total spending
SELECT
    customer_id,
    customer_name,
    total_spent,
    NTILE(4) OVER (ORDER BY total_spent DESC) AS spending_quartile
FROM (
    SELECT
        c.customer_id,
        c.customer_name,
        SUM(o.total) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.customer_name
) customer_totals;

-- Percentile ranking
SELECT
    product_name,
    price,
    NTILE(100) OVER (ORDER BY price) AS price_percentile
FROM products;
\`\`\`

### SUM OVER — Running Totals and Moving Averages

\`\`\`sql
-- Running total of revenue
SELECT
    order_date,
    total,
    SUM(total) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders
ORDER BY order_date;

-- 7-day moving average
SELECT
    order_date,
    daily_revenue,
    AVG(daily_revenue) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM (
    SELECT
        order_date,
        SUM(total) AS daily_revenue
    FROM orders
    GROUP BY order_date
) daily;

-- Cumulative percentage
SELECT
    department,
    salary_total,
    SUM(salary_total) OVER (ORDER BY salary_total DESC) AS cumulative,
    ROUND(
        SUM(salary_total) OVER (ORDER BY salary_total DESC) * 100.0
        / SUM(salary_total) OVER (),
        2
    ) AS cumulative_pct
FROM (
    SELECT department, SUM(salary) AS salary_total
    FROM employees
    GROUP BY department
) dept_salaries;
\`\`\`

\`\`\`mermaid
flowchart LR
    subgraph "Window Function Frame"
        A["UNBOUNDED PRECEDING"]
        B["3 PRECEDING"]
        C["CURRENT ROW"]
        D["3 FOLLOWING"]
        E["UNBOUNDED FOLLOWING"]
    end
    A --> B --> C --> D --> E
\`\`\`

**Why it matters:** Running totals and moving averages are essential for financial reporting, dashboards, and time-series analysis. Without window functions, these calculations require self-joins or application-level code that is both slower and harder to maintain.

### EXERCISE: Window Functions

\`\`\`sql
-- EXERCISE:
-- 1. Rank products within each category by sales volume
-- 2. Calculate month-over-month growth percentage for revenue
-- 3. Find the 2nd most recent order for each customer
-- 4. Compute a 30-day moving average of daily signups
-- 5. Assign customers to deciles (10 groups) by lifetime value
\`\`\`

---

## 2. Common Table Expressions (CTEs)

CTEs (using the \`WITH\` clause) create named temporary result sets that exist only for the duration of a single query. They improve readability and enable complex multi-step logic.

### Basic CTEs

\`\`\`sql
-- Simple CTE
WITH active_customers AS (
    SELECT customer_id, customer_name, email
    FROM customers
    WHERE status = 'active'
)
SELECT
    ac.customer_name,
    COUNT(o.order_id) AS order_count
FROM active_customers ac
LEFT JOIN orders o ON ac.customer_id = o.customer_id
GROUP BY ac.customer_name;

-- Multiple CTEs
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', order_date)
),
monthly_costs AS (
    SELECT
        DATE_TRUNC('month', expense_date) AS month,
        SUM(amount) AS costs
    FROM expenses
    GROUP BY DATE_TRUNC('month', expense_date)
)
SELECT
    r.month,
    r.revenue,
    c.costs,
    r.revenue - COALESCE(c.costs, 0) AS profit
FROM monthly_revenue r
LEFT JOIN monthly_costs c ON r.month = c.month
ORDER BY r.month;
\`\`\`

**Why it matters:** CTEs make complex queries readable. Instead of deeply nested subqueries that are hard to parse, CTEs let you name each logical step and build on it sequentially — like writing well-factored functions.

> **Role connection:** In data engineering, CTEs are the bread and butter of building data transformation pipelines within SQL (especially in tools like dbt). Backend developers use them for complex business logic queries.

### Chained CTEs

CTEs can reference earlier CTEs in the same WITH block.

\`\`\`sql
WITH
-- Step 1: Calculate total spending per customer
customer_spending AS (
    SELECT
        customer_id,
        SUM(total) AS total_spent,
        COUNT(*) AS order_count,
        MAX(order_date) AS last_order_date
    FROM orders
    GROUP BY customer_id
),
-- Step 2: Classify customers into tiers
customer_tiers AS (
    SELECT
        cs.*,
        CASE
            WHEN total_spent >= 10000 THEN 'Platinum'
            WHEN total_spent >= 5000 THEN 'Gold'
            WHEN total_spent >= 1000 THEN 'Silver'
            ELSE 'Bronze'
        END AS tier
    FROM customer_spending cs
),
-- Step 3: Aggregate by tier
tier_summary AS (
    SELECT
        tier,
        COUNT(*) AS customer_count,
        AVG(total_spent) AS avg_spending,
        AVG(order_count) AS avg_orders
    FROM customer_tiers
    GROUP BY tier
)
SELECT * FROM tier_summary ORDER BY avg_spending DESC;
\`\`\`

### EXERCISE: CTEs

\`\`\`sql
-- EXERCISE:
-- 1. Write a CTE-based query to find "churned" customers
--    (no order in the last 90 days, but had orders before)
-- 2. Build a multi-step CTE that:
--    a. Calculates daily revenue
--    b. Adds 7-day and 30-day moving averages
--    c. Flags days where revenue dropped more than 20% from the 7-day average
\`\`\`

---

## 3. Recursive Queries

Recursive CTEs allow a query to reference itself, enabling traversal of hierarchical or graph-like data structures.

### Basic Recursive CTE Structure

\`\`\`sql
-- Recursive CTE has two parts:
-- 1. Base case (anchor): the starting point
-- 2. Recursive case: references the CTE itself

-- Generate a sequence of numbers 1-10
WITH RECURSIVE numbers AS (
    -- Base case
    SELECT 1 AS n
    UNION ALL
    -- Recursive case
    SELECT n + 1
    FROM numbers
    WHERE n < 10
)
SELECT n FROM numbers;
\`\`\`

### Organizational Hierarchy (Tree Traversal)

\`\`\`sql
-- Org chart: find all reports under a manager (direct and indirect)
WITH RECURSIVE org_tree AS (
    -- Base case: start with the CEO (or target manager)
    SELECT
        employee_id,
        first_name,
        last_name,
        manager_id,
        0 AS depth,
        first_name || ' ' || last_name AS path
    FROM employees
    WHERE manager_id IS NULL  -- CEO has no manager

    UNION ALL

    -- Recursive case: find direct reports
    SELECT
        e.employee_id,
        e.first_name,
        e.last_name,
        e.manager_id,
        ot.depth + 1,
        ot.path || ' > ' || e.first_name || ' ' || e.last_name
    FROM employees e
    INNER JOIN org_tree ot ON e.manager_id = ot.employee_id
)
SELECT
    REPEAT('  ', depth) || first_name || ' ' || last_name AS org_chart,
    depth,
    path
FROM org_tree
ORDER BY path;
\`\`\`

### Bill of Materials

\`\`\`sql
-- BOM: find all components of a product, including sub-components
WITH RECURSIVE bom AS (
    -- Base case: top-level product
    SELECT
        component_id,
        component_name,
        parent_id,
        quantity,
        1 AS level,
        ARRAY[component_id] AS path
    FROM components
    WHERE parent_id IS NULL AND component_id = 1  -- Product #1

    UNION ALL

    -- Recursive: sub-components
    SELECT
        c.component_id,
        c.component_name,
        c.parent_id,
        c.quantity * bom.quantity AS quantity,  -- Multiply quantities down
        bom.level + 1,
        bom.path || c.component_id
    FROM components c
    INNER JOIN bom ON c.parent_id = bom.component_id
    WHERE NOT c.component_id = ANY(bom.path)  -- Cycle detection!
)
SELECT
    REPEAT('  ', level - 1) || component_name AS component,
    quantity,
    level
FROM bom
ORDER BY path;
\`\`\`

### Cycle Detection

\`\`\`sql
-- Detect cycles in a graph (e.g., circular references)
WITH RECURSIVE graph_walk AS (
    SELECT
        node_id,
        connected_to,
        ARRAY[node_id] AS visited,
        false AS has_cycle
    FROM edges
    WHERE node_id = 1

    UNION ALL

    SELECT
        e.node_id,
        e.connected_to,
        gw.visited || e.connected_to,
        e.connected_to = ANY(gw.visited) AS has_cycle
    FROM edges e
    INNER JOIN graph_walk gw ON e.node_id = gw.connected_to
    WHERE NOT e.connected_to = ANY(gw.visited)
)
SELECT * FROM graph_walk;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Recursive CTE Execution"
        A["Anchor Query<br/>(Base Case)"] --> B["Working Table<br/>(Current iteration)"]
        B --> C{"More rows?"}
        C -->|Yes| D["Recursive Query<br/>(References CTE)"]
        D --> B
        C -->|No| E["Final Result Set"]
    end
\`\`\`

**Why it matters:** Recursive queries handle hierarchical data that would otherwise require multiple round trips to the database or complex application logic. Org charts, category trees, file systems, and dependency graphs all benefit from recursive CTEs.

### EXERCISE: Recursive Queries

\`\`\`sql
-- EXERCISE:
-- 1. Build an org chart query that shows each employee's
--    full chain of command from CEO to them
-- 2. Given a "categories" table with parent_id, build a breadcrumb
--    path for each category (e.g., "Electronics > Computers > Laptops")
-- 3. Write a recursive query that generates a date series
--    from 2025-01-01 to 2025-12-31
\`\`\`

---

## 4. Transactions & ACID

### What is ACID?

\`\`\`mermaid
flowchart LR
    A["<b>A</b>tomicity<br/>All or nothing"] --> B["<b>C</b>onsistency<br/>Valid state to valid state"]
    B --> C["<b>I</b>solation<br/>Concurrent transactions<br/>don't interfere"]
    C --> D["<b>D</b>urability<br/>Committed data<br/>survives crashes"]
\`\`\`

### BEGIN, COMMIT, ROLLBACK

\`\`\`sql
-- Basic transaction
BEGIN;
    UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;
COMMIT;

-- If something goes wrong, rollback
BEGIN;
    UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
    -- Oops, target account does not exist
    UPDATE accounts SET balance = balance + 500 WHERE account_id = 999;
    -- Check if the update affected any rows
    -- If not, rollback
ROLLBACK;

-- Practical pattern in application code (pseudocode):
-- try {
--     BEGIN;
--     ... multiple operations ...
--     COMMIT;
-- } catch (error) {
--     ROLLBACK;
--     throw error;
-- }
\`\`\`

**Why it matters:** Without transactions, a failure between two related operations (like a money transfer) can leave your data in an inconsistent state — money debited from one account but never credited to another.

### Savepoints

Savepoints allow partial rollbacks within a transaction.

\`\`\`sql
BEGIN;
    INSERT INTO orders (customer_id, total) VALUES (1, 100.00);
    SAVEPOINT order_created;

    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (currval('orders_order_id_seq'), 42, 2);

    -- Something goes wrong with the item
    ROLLBACK TO SAVEPOINT order_created;

    -- The order INSERT is preserved, try a different item
    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (currval('orders_order_id_seq'), 43, 1);

COMMIT;
\`\`\`

### Isolation Levels

\`\`\`sql
-- Read Uncommitted (PostgreSQL treats this as Read Committed)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- Read Committed (PostgreSQL default) — each statement sees
-- only data committed before the statement began
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read — the transaction sees a snapshot from
-- its start; no phantom reads
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable — strongest isolation; transactions behave
-- as if executed one at a time
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

| Isolation Level  | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
|-----------------|-------------|---------------------|---------------|
| Read Uncommitted | Possible    | Possible            | Possible      |
| Read Committed   | Prevented   | Possible            | Possible      |
| Repeatable Read  | Prevented   | Prevented           | Possible*     |
| Serializable     | Prevented   | Prevented           | Prevented     |

*PostgreSQL's Repeatable Read actually prevents phantom reads too.

### Deadlocks

\`\`\`sql
-- Deadlock scenario:
-- Transaction 1:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- waits for Transaction 2 to release lock on account_id = 2
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Transaction 2 (concurrent):
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE account_id = 2;
-- waits for Transaction 1 to release lock on account_id = 1
UPDATE accounts SET balance = balance + 50 WHERE account_id = 1;
-- DEADLOCK! The database will detect this and abort one transaction.

-- Prevention: always lock resources in a consistent order
-- (e.g., always lock the lower account_id first)
BEGIN;
UPDATE accounts SET balance = balance - 100
WHERE account_id = 1;  -- Lock 1 first
UPDATE accounts SET balance = balance + 100
WHERE account_id = 2;  -- Then lock 2
COMMIT;
\`\`\`

> **Role connection:** Every backend developer who works with databases must understand transactions. Mishandled transactions cause data corruption, lost updates, and race conditions that are extremely hard to debug in production.

### EXERCISE: Transactions

\`\`\`sql
-- EXERCISE:
-- 1. Write a transaction that transfers money between accounts,
--    verifying sufficient balance before the transfer
-- 2. Write a transaction with a savepoint that inserts an order
--    and its items, rolling back only the items if they fail
-- 3. Describe a scenario where Repeatable Read prevents a bug
--    that Read Committed would allow
\`\`\`

---

## 5. Views & Materialized Views

### Creating Views

A view is a named query that acts like a virtual table. It does not store data — it re-executes the query each time it is accessed.

\`\`\`sql
-- Create a view for active customer summary
CREATE VIEW active_customer_summary AS
SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total) AS total_spent,
    MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.status = 'active'
GROUP BY c.customer_id, c.customer_name, c.email;

-- Use the view like a table
SELECT * FROM active_customer_summary
WHERE total_spent > 1000
ORDER BY total_spent DESC;

-- Views can reference other views
CREATE VIEW vip_customers AS
SELECT *
FROM active_customer_summary
WHERE total_spent >= 10000;
\`\`\`

**Why it matters:** Views encapsulate complex queries, provide a stable interface to changing schemas, and can enforce security by exposing only certain columns to certain users.

### Updatable Views

Some views allow INSERT, UPDATE, and DELETE operations to pass through to the underlying table.

\`\`\`sql
-- Simple views on a single table are automatically updatable
CREATE VIEW active_employees AS
SELECT employee_id, first_name, last_name, email, department, salary
FROM employees
WHERE status = 'active';

-- This UPDATE modifies the underlying employees table
UPDATE active_employees
SET salary = 95000
WHERE employee_id = 42;

-- WITH CHECK OPTION prevents rows from "disappearing" from the view
CREATE VIEW active_employees_checked AS
SELECT employee_id, first_name, last_name, email, department, salary, status
FROM employees
WHERE status = 'active'
WITH CHECK OPTION;

-- This would FAIL because the row would no longer match the view's WHERE:
UPDATE active_employees_checked
SET status = 'inactive'
WHERE employee_id = 42;
-- ERROR: new row violates check option for view
\`\`\`

### Materialized Views

Materialized views store the query result physically. They are faster to read but need to be refreshed to stay current.

\`\`\`sql
-- Create a materialized view for a slow dashboard query
CREATE MATERIALIZED VIEW monthly_sales_report AS
SELECT
    DATE_TRUNC('month', o.order_date) AS month,
    p.category,
    COUNT(DISTINCT o.order_id) AS order_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.status = 'completed'
GROUP BY DATE_TRUNC('month', o.order_date), p.category;

-- Create an index on the materialized view for fast queries
CREATE INDEX idx_msr_month ON monthly_sales_report (month);

-- Query it like a regular table (fast — reads stored data)
SELECT * FROM monthly_sales_report
WHERE month >= '2025-01-01'
ORDER BY month, category;

-- Refresh the materialized view (re-runs the query and replaces data)
REFRESH MATERIALIZED VIEW monthly_sales_report;

-- Concurrent refresh (does not lock reads while refreshing)
-- Requires a UNIQUE index
CREATE UNIQUE INDEX idx_msr_unique ON monthly_sales_report (month, category);
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_report;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "View Types"
        V["Regular View<br/>Re-executes query each time<br/>Always fresh data<br/>No storage overhead"]
        MV["Materialized View<br/>Stores result physically<br/>Fast reads<br/>Must be refreshed"]
    end
    V -->|"Too slow?"| MV
    MV -->|"Need real-time?"| V
\`\`\`

### Refresh Strategies

\`\`\`sql
-- Strategy 1: Cron job (refresh on a schedule)
-- Run via pg_cron or external scheduler
-- REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_report;

-- Strategy 2: Trigger-based (refresh after data changes)
CREATE OR REPLACE FUNCTION refresh_sales_report()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_report;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_refresh_sales
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_sales_report();
-- WARNING: This can be slow for high-write tables

-- Strategy 3: Lazy refresh (track staleness, refresh on read if stale)
-- Implemented in application logic
\`\`\`

### EXERCISE: Views

\`\`\`sql
-- EXERCISE:
-- 1. Create a view that shows each product with its total sales,
--    average rating, and stock status
-- 2. Create a materialized view for a monthly revenue dashboard
-- 3. Add a unique index and set up concurrent refresh
-- 4. When would you choose a regular view vs. a materialized view?
\`\`\`

---

## 6. Query Optimization

### EXPLAIN ANALYZE

\`EXPLAIN ANALYZE\` actually runs the query and shows both the planned and actual execution metrics.

\`\`\`sql
-- Basic explain
EXPLAIN ANALYZE
SELECT c.customer_name, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01'
GROUP BY c.customer_name
ORDER BY total_spent DESC;

-- Key things to look for in the output:
-- 1. Seq Scan vs Index Scan (Index is usually better for selective queries)
-- 2. Actual rows vs estimated rows (large difference = stale statistics)
-- 3. Nested Loop vs Hash Join vs Merge Join
-- 4. Sort method: quicksort vs top-N heapsort vs external merge
-- 5. Total execution time
\`\`\`

### Reading an Execution Plan

\`\`\`sql
-- Example execution plan (annotated):
-- Sort  (cost=150.23..152.12 rows=750 width=48)
--        (actual time=5.123..5.234 rows=750 loops=1)
--   Sort Key: total_spent DESC
--   Sort Method: quicksort  Memory: 80kB
--   -> HashAggregate  (cost=100.00..120.00 rows=750 width=48)
--          (actual time=4.012..4.567 rows=750 loops=1)
--        Group Key: c.customer_name
--        -> Hash Join  (cost=25.00..85.00 rows=5000 width=36)
--               (actual time=0.456..3.012 rows=5000 loops=1)
--             Hash Cond: (o.customer_id = c.customer_id)
--             -> Seq Scan on orders o  (cost=0.00..45.00 rows=5000 width=12)
--                    (actual time=0.012..1.234 rows=5000 loops=1)
--                  Filter: (order_date >= '2025-01-01')
--                  Rows Removed by Filter: 3000
--             -> Hash  (cost=15.00..15.00 rows=800 width=28)
--                    (actual time=0.234..0.234 rows=800 loops=1)
--                  -> Seq Scan on customers c  ...
-- Planning Time: 0.234 ms
-- Execution Time: 5.456 ms
\`\`\`

### Index Selection Strategies

\`\`\`sql
-- Composite index for multi-column queries
-- Column order matters! Most selective first, or match your WHERE clause
CREATE INDEX idx_orders_status_date ON orders (status, order_date);

-- This query uses the index efficiently:
SELECT * FROM orders WHERE status = 'pending' AND order_date > '2025-01-01';

-- This query can use the index (leading column matches):
SELECT * FROM orders WHERE status = 'pending';

-- This query CANNOT use the index (skips the leading column):
SELECT * FROM orders WHERE order_date > '2025-01-01';
-- For this query, you need a separate index on order_date

-- Covering index (includes all needed columns, avoids table lookup)
CREATE INDEX idx_orders_covering ON orders (customer_id)
INCLUDE (order_date, total, status);

-- Index for LIKE queries
CREATE INDEX idx_products_name_pattern ON products
USING btree (product_name varchar_pattern_ops);
-- Now this is fast: WHERE product_name LIKE 'Widget%'
\`\`\`

### Query Rewriting

\`\`\`sql
-- Anti-pattern: OR on different columns prevents index use
SELECT * FROM orders
WHERE customer_id = 123 OR order_date = '2025-06-01';

-- Rewrite with UNION for better index usage
SELECT * FROM orders WHERE customer_id = 123
UNION
SELECT * FROM orders WHERE order_date = '2025-06-01';

-- Anti-pattern: function on indexed column prevents index use
SELECT * FROM orders WHERE YEAR(order_date) = 2025;

-- Rewrite to use range instead
SELECT * FROM orders
WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';

-- Anti-pattern: implicit type conversion
SELECT * FROM users WHERE phone = 5551234;  -- phone is VARCHAR

-- Fix: use matching type
SELECT * FROM users WHERE phone = '5551234';

-- Anti-pattern: SELECT * with JOIN (fetches unnecessary data)
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.customer_id;

-- Fix: select only needed columns
SELECT o.order_id, o.total, c.customer_name
FROM orders o JOIN customers c ON o.customer_id = c.customer_id;
\`\`\`

### Statistics

\`\`\`sql
-- Update statistics for the query planner
ANALYZE orders;
ANALYZE customers;

-- Update statistics for all tables
ANALYZE;

-- Check current statistics
SELECT
    schemaname,
    tablename,
    n_live_tup,
    n_dead_tup,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
\`\`\`

**Why it matters:** Query optimization is a critical skill for anyone working with databases at scale. A single slow query can bring down an entire application. Understanding execution plans lets you fix performance problems methodically rather than guessing.

### EXERCISE: Query Optimization

\`\`\`sql
-- EXERCISE:
-- 1. Run EXPLAIN ANALYZE on a query with and without an index.
--    Compare the execution times and scan types.
-- 2. Find a query that uses Seq Scan and rewrite it or add an
--    index to switch it to Index Scan.
-- 3. Identify which of these queries can use an index on (status, order_date):
--    a. WHERE status = 'active'
--    b. WHERE order_date = '2025-01-01'
--    c. WHERE status = 'active' AND order_date > '2025-01-01'
--    d. WHERE status IN ('active', 'pending') AND order_date > '2025-01-01'
\`\`\`

---

## 7. Normalization

Normalization is the process of organizing data to reduce redundancy and improve integrity. Understanding normal forms helps you design efficient, reliable schemas.

### First Normal Form (1NF)

A table is in 1NF if every column contains only atomic (indivisible) values and there are no repeating groups.

\`\`\`sql
-- VIOLATION of 1NF: multiple values in one column
-- | order_id | products            |
-- | 1        | Widget, Gadget, Bolt|

-- FIXED: one value per cell
-- order_items table:
-- | order_id | product_id |
-- | 1        | 10         |
-- | 1        | 20         |
-- | 1        | 30         |
\`\`\`

### Second Normal Form (2NF)

1NF + every non-key column depends on the entire primary key (no partial dependencies). Relevant for composite primary keys.

\`\`\`sql
-- VIOLATION of 2NF (composite key: order_id, product_id)
-- | order_id | product_id | product_name | quantity |
-- product_name depends only on product_id, not the full key

-- FIXED: separate into two tables
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL
);

CREATE TABLE order_items (
    order_id   INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity   INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
\`\`\`

### Third Normal Form (3NF)

2NF + no transitive dependencies (non-key columns depend only on the primary key, not on other non-key columns).

\`\`\`sql
-- VIOLATION of 3NF:
-- employees: employee_id, department_id, department_name, department_location
-- department_name depends on department_id, not on employee_id

-- FIXED: move department info to its own table
CREATE TABLE departments (
    department_id   SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location        VARCHAR(100)
);

CREATE TABLE employees (
    employee_id   SERIAL PRIMARY KEY,
    first_name    VARCHAR(50) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id)
);
\`\`\`

### Beyond 3NF — BCNF, 4NF, 5NF

\`\`\`sql
-- Boyce-Codd Normal Form (BCNF):
-- Every determinant is a candidate key.
-- Rarely violated if you are already in 3NF.

-- 4NF: No multi-valued dependencies
-- Example violation: a student can have multiple hobbies AND multiple
-- phone numbers, stored in one table:
-- | student_id | hobby    | phone      |
-- This creates spurious combinations.

-- FIXED: separate tables
CREATE TABLE student_hobbies (
    student_id INTEGER REFERENCES students(student_id),
    hobby      VARCHAR(100),
    PRIMARY KEY (student_id, hobby)
);

CREATE TABLE student_phones (
    student_id INTEGER REFERENCES students(student_id),
    phone      VARCHAR(20),
    PRIMARY KEY (student_id, phone)
);

-- 5NF: Join dependencies — very rare in practice.
-- The table cannot be decomposed into smaller tables and
-- reconstructed via joins without loss.
\`\`\`

### Denormalization Trade-offs

\`\`\`sql
-- Normalized (3NF): requires JOIN at query time
SELECT
    o.order_id,
    c.customer_name,
    c.email
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- Denormalized: customer_name stored directly on orders
-- Faster reads, but data can become inconsistent
SELECT order_id, customer_name, customer_email
FROM orders_denormalized;

-- When to denormalize:
-- 1. Read-heavy workloads with rare writes
-- 2. Reporting/analytics tables
-- 3. When JOIN performance is a proven bottleneck
-- 4. Caching layers (materialized views)

-- When to stay normalized:
-- 1. Write-heavy workloads (updates in one place)
-- 2. Data integrity is critical
-- 3. Storage efficiency matters
-- 4. The schema is still evolving
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Unnormalized Data"] --> B["1NF: Atomic values"]
    B --> C["2NF: No partial dependencies"]
    C --> D["3NF: No transitive dependencies"]
    D --> E["BCNF: Every determinant is a key"]
    E --> F["4NF: No multi-valued dependencies"]
    F --> G["5NF: No join dependencies"]

    D -.->|"Most applications<br/>stop here"| H["Good enough<br/>for production"]
    E -.->|"Denormalize for<br/>read performance"| I["Strategic<br/>denormalization"]
\`\`\`

### EXERCISE: Normalization

\`\`\`sql
-- EXERCISE:
-- 1. Identify the normal form violations in this table:
--    | student_id | name    | courses          | advisor_name | advisor_dept |
--    | 1          | Alice   | Math, Physics    | Dr. Smith    | Science      |
-- 2. Normalize it to 3NF, creating appropriate tables
-- 3. For a high-traffic e-commerce product page, what data would
--    you denormalize and why?
\`\`\`

---

## 8. Stored Procedures & Functions

### Creating Functions

\`\`\`sql
-- Simple function returning a scalar value
CREATE OR REPLACE FUNCTION calculate_tax(subtotal DECIMAL, tax_rate DECIMAL DEFAULT 0.08)
RETURNS DECIMAL AS $$
BEGIN
    RETURN ROUND(subtotal * tax_rate, 2);
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT
    order_id,
    total,
    calculate_tax(total) AS tax,
    total + calculate_tax(total) AS total_with_tax
FROM orders;

-- Function returning a table
CREATE OR REPLACE FUNCTION get_department_report(dept_name VARCHAR)
RETURNS TABLE (
    employee_name TEXT,
    salary DECIMAL,
    hire_date DATE,
    years_of_service DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.first_name || ' ' || e.last_name,
        e.salary,
        e.hire_date,
        ROUND(EXTRACT(EPOCH FROM (NOW() - e.hire_date)) / 86400 / 365.25, 1)
    FROM employees e
    WHERE e.department = dept_name
    ORDER BY e.salary DESC;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM get_department_report('Engineering');
\`\`\`

### Control Flow

\`\`\`sql
CREATE OR REPLACE FUNCTION categorize_customer(customer_id_param INTEGER)
RETURNS TEXT AS $$
DECLARE
    total_spent DECIMAL;
    order_count INTEGER;
    last_order DATE;
    result TEXT;
BEGIN
    -- Get customer metrics
    SELECT
        COALESCE(SUM(total), 0),
        COUNT(*),
        MAX(order_date)
    INTO total_spent, order_count, last_order
    FROM orders
    WHERE customer_id = customer_id_param;

    -- IF/ELSIF/ELSE
    IF order_count = 0 THEN
        result := 'No Orders';
    ELSIF total_spent >= 10000 AND last_order >= CURRENT_DATE - INTERVAL '90 days' THEN
        result := 'VIP Active';
    ELSIF total_spent >= 10000 THEN
        result := 'VIP Inactive';
    ELSIF total_spent >= 1000 THEN
        result := 'Regular';
    ELSE
        result := 'Low Value';
    END IF;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- LOOP example: process items in batches
CREATE OR REPLACE FUNCTION archive_old_orders(cutoff_date DATE, batch_size INTEGER DEFAULT 1000)
RETURNS INTEGER AS $$
DECLARE
    total_archived INTEGER := 0;
    batch_count INTEGER;
BEGIN
    LOOP
        -- Move a batch of old orders to archive
        WITH moved AS (
            DELETE FROM orders
            WHERE order_id IN (
                SELECT order_id FROM orders
                WHERE order_date < cutoff_date
                AND status = 'completed'
                LIMIT batch_size
            )
            RETURNING *
        )
        INSERT INTO orders_archive SELECT * FROM moved;

        GET DIAGNOSTICS batch_count = ROW_COUNT;
        total_archived := total_archived + batch_count;

        -- Exit when no more rows to process
        EXIT WHEN batch_count = 0;

        -- Give other transactions a chance
        PERFORM pg_sleep(0.1);
    END LOOP;

    RETURN total_archived;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Error Handling

\`\`\`sql
CREATE OR REPLACE FUNCTION safe_transfer(
    from_account INTEGER,
    to_account INTEGER,
    amount DECIMAL
)
RETURNS TEXT AS $$
DECLARE
    from_balance DECIMAL;
BEGIN
    -- Validate amount
    IF amount <= 0 THEN
        RAISE EXCEPTION 'Transfer amount must be positive: %', amount;
    END IF;

    -- Check balance
    SELECT balance INTO from_balance
    FROM accounts
    WHERE account_id = from_account
    FOR UPDATE;  -- Lock the row

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Source account % not found', from_account;
    END IF;

    IF from_balance < amount THEN
        RAISE EXCEPTION 'Insufficient funds. Balance: %, Requested: %',
            from_balance, amount;
    END IF;

    -- Perform transfer
    UPDATE accounts SET balance = balance - amount WHERE account_id = from_account;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_account;

    -- Log the transfer
    INSERT INTO transfer_log (from_account, to_account, amount, transferred_at)
    VALUES (from_account, to_account, amount, NOW());

    RETURN 'Transfer successful';

EXCEPTION
    WHEN OTHERS THEN
        -- Log the error
        INSERT INTO error_log (error_message, error_detail, occurred_at)
        VALUES (SQLERRM, SQLSTATE, NOW());
        -- Re-raise the exception
        RAISE;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Stored Procedures (PostgreSQL 11+)

Procedures differ from functions in that they can manage transactions (COMMIT/ROLLBACK within the body).

\`\`\`sql
CREATE OR REPLACE PROCEDURE process_pending_orders()
LANGUAGE plpgsql AS $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT order_id, customer_id, total
        FROM orders
        WHERE status = 'pending'
        ORDER BY order_date
    LOOP
        BEGIN
            -- Process each order
            UPDATE orders SET status = 'processing' WHERE order_id = rec.order_id;
            INSERT INTO order_events (order_id, event_type, created_at)
            VALUES (rec.order_id, 'processing_started', NOW());

            -- Commit each order independently
            COMMIT;
        EXCEPTION
            WHEN OTHERS THEN
                ROLLBACK;
                INSERT INTO order_errors (order_id, error, occurred_at)
                VALUES (rec.order_id, SQLERRM, NOW());
                COMMIT;
        END;
    END LOOP;
END;
$$;

-- Call a procedure
CALL process_pending_orders();
\`\`\`

> **Role connection:** Stored procedures and functions move business logic into the database. This can be beneficial for performance (no network round trips) and for enforcing rules regardless of which application accesses the database. However, it can make testing and version control harder, so many teams prefer application-level logic with transactions.

### EXERCISE: Stored Procedures & Functions

\`\`\`sql
-- EXERCISE:
-- 1. Write a function that takes a product_id and returns its
--    total sales, average order quantity, and number of orders
-- 2. Write a function with error handling that creates a user
--    account, checking for duplicate email and username
-- 3. Write a procedure that processes refunds in batches,
--    committing after each batch
\`\`\`

---

## Summary — Mid Level

You have now mastered intermediate SQL concepts:
- **Window functions** for row-by-row calculations without collapsing groups
- **CTEs** for readable, composable multi-step queries
- **Recursive queries** for hierarchical data traversal
- **Transactions** for safe, atomic multi-operation changes
- **Views** and **materialized views** for query encapsulation and caching
- **Query optimization** using EXPLAIN, indexes, and rewriting patterns
- **Normalization** principles for designing clean schemas
- **Stored procedures** and **functions** for database-level logic

Next up in the Senior level: execution plan internals, index internals, partitioning, locking, performance tuning, migrations, and advanced patterns.

---

## Recommended Videos — Mid Level

- **Kai Sassnowski** — "Things every developer absolutely, positively needs to know about database indexing" — https://www.youtube.com/watch?v=HubezKbFL7E
- **freeCodeCamp** — "SQL Tutorial – Full Database Course for Beginners" — https://www.youtube.com/watch?v=HXV3zeQKqGY
- **freeCodeCamp** — "Database Design Course – Learn how to design and plan a database" — https://www.youtube.com/watch?v=ztHopE5Wnpc
`,
    senior: `# SQL Deep Dive — Senior Level

## 1. Execution Plans Deep Dive

Understanding execution plans in depth is what separates developers who can write queries from developers who can make queries fast. The query planner translates your SQL into a physical execution plan — a tree of operations that fetches, filters, joins, and sorts data.

### Scan Types

\`\`\`sql
-- Sequential Scan (Seq Scan)
-- Reads every row in the table. Used when no suitable index exists
-- or when a large percentage of rows need to be read.
EXPLAIN ANALYZE
SELECT * FROM orders WHERE total > 10;
-- Seq Scan on orders (cost=0.00..1500.00 rows=45000 width=64)
--   Filter: (total > 10)

-- Index Scan
-- Traverses the B-tree index to find matching rows, then fetches
-- the actual row data from the table (heap).
EXPLAIN ANALYZE
SELECT * FROM orders WHERE order_id = 12345;
-- Index Scan using orders_pkey on orders (cost=0.43..8.45 rows=1 width=64)
--   Index Cond: (order_id = 12345)

-- Index Only Scan
-- All needed columns are in the index. No table (heap) access needed.
-- This is the fastest scan type.
CREATE INDEX idx_orders_covering ON orders (customer_id) INCLUDE (total, order_date);

EXPLAIN ANALYZE
SELECT customer_id, total, order_date FROM orders WHERE customer_id = 100;
-- Index Only Scan using idx_orders_covering on orders
--   Index Cond: (customer_id = 100)
--   Heap Fetches: 0  <-- No table access!

-- Bitmap Index Scan + Bitmap Heap Scan
-- For medium-selectivity queries. Builds a bitmap of matching pages,
-- then reads those pages in physical order (reduces random I/O).
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'pending';
-- Bitmap Heap Scan on orders (cost=25.00..500.00 rows=2000 width=64)
--   Recheck Cond: (status = 'pending')
--   -> Bitmap Index Scan on idx_orders_status (cost=0.00..24.50 rows=2000)
--        Index Cond: (status = 'pending')
\`\`\`

\`\`\`mermaid
flowchart TD
    Q["Query"] --> P["Planner"]
    P --> S1{"How many rows<br/>match?"}
    S1 -->|"Few rows<br/>(< ~5%)"| IS["Index Scan"]
    S1 -->|"Medium<br/>(~5-20%)"| BIS["Bitmap Index Scan<br/>+ Bitmap Heap Scan"]
    S1 -->|"Many rows<br/>(> ~20%)"| SS["Sequential Scan"]
    S1 -->|"All columns<br/>in index"| IOS["Index Only Scan"]
\`\`\`

### Join Algorithms

The planner chooses between three join algorithms based on table sizes, available indexes, and sort order.

\`\`\`sql
-- Nested Loop Join
-- For each row in the outer table, scan the inner table.
-- Best when: outer table is small, inner table has an index on the join column.
-- Cost: O(N * M) without index, O(N * log M) with index
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_id = 12345;
-- Nested Loop (cost=0.86..16.90 rows=1 width=36)
--   -> Index Scan using orders_pkey on orders o (cost=0.43..8.45 rows=1)
--        Index Cond: (order_id = 12345)
--   -> Index Scan using customers_pkey on customers c (cost=0.43..8.45 rows=1)
--        Index Cond: (customer_id = o.customer_id)

-- Hash Join
-- Builds a hash table from the smaller table, then probes it with rows
-- from the larger table. Best for: large tables without useful indexes.
-- Cost: O(N + M) but needs memory for the hash table
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
-- Hash Join (cost=25.00..2000.00 rows=50000 width=36)
--   Hash Cond: (o.customer_id = c.customer_id)
--   -> Seq Scan on orders o (cost=0.00..1500.00 rows=50000)
--   -> Hash (cost=15.00..15.00 rows=800)
--        -> Seq Scan on customers c (cost=0.00..15.00 rows=800)

-- Merge Join
-- Both inputs must be sorted on the join key. Walks through both
-- sorted lists simultaneously. Best for: pre-sorted data or large datasets.
-- Cost: O(N log N + M log M) for sorting, O(N + M) for merging
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.customer_id;
-- Merge Join (cost=500.00..1500.00 rows=50000 width=36)
--   Merge Cond: (o.customer_id = c.customer_id)
--   -> Index Scan using idx_orders_customer on orders o
--   -> Index Scan using customers_pkey on customers c
\`\`\`

### Cost Model

\`\`\`sql
-- Understanding cost numbers:
-- cost=startup_cost..total_cost
-- startup_cost: cost before the first row can be returned
-- total_cost: cost to return all rows

-- Rows: estimated number of rows
-- Width: estimated average row size in bytes
-- Actual time: real execution time in milliseconds
-- Loops: number of times this node was executed

-- Force specific join strategies for testing (never in production):
SET enable_hashjoin = off;
SET enable_mergejoin = off;
SET enable_nestloop = off;

-- Reset to defaults
RESET enable_hashjoin;
RESET enable_mergejoin;
RESET enable_nestloop;

-- Check planner cost constants
SHOW seq_page_cost;       -- Default: 1.0
SHOW random_page_cost;    -- Default: 4.0 (SSD: set to 1.1-1.5)
SHOW cpu_tuple_cost;      -- Default: 0.01
SHOW effective_cache_size; -- Hint about OS cache size
\`\`\`

**Why it matters:** When you see a slow query in production, the execution plan is your diagnostic tool. Understanding scan types, join algorithms, and cost estimates lets you identify the bottleneck and choose the right fix — whether it is adding an index, rewriting the query, or adjusting database configuration.

### EXERCISE: Execution Plans

\`\`\`sql
-- EXERCISE:
-- 1. Take a complex query with 3+ JOINs and run EXPLAIN ANALYZE.
--    Identify: which join algorithm is used for each join, which
--    tables use index scans vs. seq scans, and where the most time is spent.
-- 2. Force the planner to use a different join strategy (disable one type).
--    Compare the execution time. Why did the planner choose the original strategy?
-- 3. Find a query where estimated rows differ significantly from actual rows.
--    Run ANALYZE on the affected tables and re-check.
\`\`\`

---

## 2. Index Internals

### B-tree Structure

The B-tree is the default and most commonly used index type in PostgreSQL. Understanding its internal structure helps you design better indexes.

\`\`\`sql
-- B-tree properties:
-- - Balanced tree: all leaf nodes are at the same depth
-- - Leaf nodes contain pointers to table rows (heap tuples)
-- - Internal nodes contain separator keys for navigation
-- - Doubly-linked leaf nodes enable efficient range scans
-- - Default fill factor: 90% (10% reserved for updates)

-- Create a B-tree index (explicit — btree is the default)
CREATE INDEX idx_orders_date ON orders USING btree (order_date);

-- B-tree supports these operations efficiently:
-- =, <, >, <=, >=, BETWEEN, IN
-- IS NULL, IS NOT NULL
-- Pattern matching with LIKE 'prefix%' (not '%suffix')
-- ORDER BY (can return results in sorted order)

-- Inspect index size and properties
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS index_size,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'orders'
ORDER BY pg_relation_size(indexname::regclass) DESC;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "B-tree Index Structure"
        R["Root Node<br/>[40, 80]"]
        R --> N1["Internal Node<br/>[10, 20, 30]"]
        R --> N2["Internal Node<br/>[50, 60, 70]"]
        R --> N3["Internal Node<br/>[90, 100]"]
        N1 --> L1["Leaf: 1-10<br/>-> heap"]
        N1 --> L2["Leaf: 11-20<br/>-> heap"]
        N1 --> L3["Leaf: 21-30<br/>-> heap"]
        N2 --> L4["Leaf: 41-50<br/>-> heap"]
        L1 ---|"linked list"| L2
        L2 ---|"linked list"| L3
    end
\`\`\`

### Hash Indexes

\`\`\`sql
-- Hash indexes: O(1) lookup for equality only
-- Since PostgreSQL 10, hash indexes are WAL-logged and crash-safe
CREATE INDEX idx_users_email_hash ON users USING hash (email);

-- Hash indexes support ONLY equality (=) operations
-- They do NOT support: <, >, range scans, ORDER BY, pattern matching
-- Use when: you only need exact-match lookups and the column has high cardinality

-- When to use hash vs. B-tree:
-- B-tree: range queries, ORDER BY, LIKE prefix, general purpose
-- Hash: equality-only lookups, potentially smaller for very large values
\`\`\`

### GIN (Generalized Inverted Index)

GIN indexes map values to sets of rows. They are ideal for multi-valued data types.

\`\`\`sql
-- GIN for full-text search
CREATE INDEX idx_products_search ON products
USING gin (to_tsvector('english', product_name || ' ' || description));

SELECT * FROM products
WHERE to_tsvector('english', product_name || ' ' || description)
    @@ to_tsquery('english', 'wireless & bluetooth');

-- GIN for JSONB
CREATE INDEX idx_events_data ON events USING gin (data);

-- Contains key
SELECT * FROM events WHERE data ? 'error_code';

-- Contains key-value pair
SELECT * FROM events WHERE data @> '{"status": "failed"}';

-- GIN for array columns
CREATE INDEX idx_posts_tags ON posts USING gin (tags);

SELECT * FROM posts WHERE tags @> ARRAY['sql', 'performance'];
SELECT * FROM posts WHERE tags && ARRAY['sql', 'postgresql'];
\`\`\`

### GiST (Generalized Search Tree)

GiST supports more complex data types like geometric data, ranges, and full-text search.

\`\`\`sql
-- GiST for range types
CREATE INDEX idx_events_during ON events USING gist (during);

-- Find overlapping time ranges
SELECT * FROM events
WHERE during && tsrange('2025-06-01', '2025-06-30');

-- GiST for geometric data
CREATE INDEX idx_locations_point ON locations USING gist (coordinates);

-- Find locations within a radius
SELECT * FROM locations
WHERE coordinates <-> point(40.7128, -74.0060) < 0.1;

-- GiST for nearest-neighbor search (KNN)
SELECT *, coordinates <-> point(40.7128, -74.0060) AS distance
FROM locations
ORDER BY coordinates <-> point(40.7128, -74.0060)
LIMIT 10;
\`\`\`

### Partial Indexes

A partial index covers only rows matching a WHERE condition. Smaller index = faster lookups and less write overhead.

\`\`\`sql
-- Index only pending orders (tiny fraction of all orders)
CREATE INDEX idx_orders_pending ON orders (order_date)
WHERE status = 'pending';

-- This query uses the partial index:
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'pending' AND order_date > '2025-01-01';

-- Index only active users (most queries filter for active)
CREATE INDEX idx_users_active_email ON users (email)
WHERE is_active = true;

-- Partial unique index (unique email only among active users)
CREATE UNIQUE INDEX idx_users_unique_active_email ON users (email)
WHERE is_active = true;
-- Allows: same email for an active and a deactivated user
\`\`\`

### Expression Indexes

\`\`\`sql
-- Index on a computed expression
CREATE INDEX idx_users_lower_email ON users (LOWER(email));

-- Now this query uses the index:
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- Index on date part
CREATE INDEX idx_orders_year ON orders (EXTRACT(YEAR FROM order_date));

-- Index on JSON field
CREATE INDEX idx_events_error_code ON events ((data->>'error_code'));

SELECT * FROM events WHERE data->>'error_code' = 'E404';
\`\`\`

### Covering Indexes (INCLUDE)

\`\`\`sql
-- A covering index includes extra columns that are not part of the
-- search key but are needed by the query. This enables Index Only Scans.

CREATE INDEX idx_orders_customer_covering ON orders (customer_id)
INCLUDE (order_date, total, status);

-- This query can be answered entirely from the index:
SELECT customer_id, order_date, total, status
FROM orders
WHERE customer_id = 100;
-- Index Only Scan — no heap (table) access needed

-- Without INCLUDE, those extra columns would require a heap fetch
-- for every matching row, which is much slower.
\`\`\`

**Why it matters:** Index selection is one of the highest-leverage performance decisions in database design. The wrong index wastes disk space and slows writes without speeding reads. The right index turns a 30-second query into a 3-millisecond query.

### EXERCISE: Index Internals

\`\`\`sql
-- EXERCISE:
-- 1. Create a GIN index on a JSONB column and demonstrate queries
--    that use it vs. queries that cannot use it.
-- 2. Create a partial index for "recent orders" (last 30 days).
--    Show the size difference vs. a full index on the same column.
-- 3. Design a covering index for a query used in your application's
--    most-viewed page. Verify it produces an Index Only Scan.
-- 4. Compare the size and performance of a B-tree vs. hash index
--    on a UUID column with equality-only queries.
\`\`\`

---

## 3. Partitioning

Partitioning splits a large table into smaller physical pieces (partitions) while maintaining a single logical table interface. It is essential for managing tables with hundreds of millions or billions of rows.

### Range Partitioning

\`\`\`sql
-- Create a partitioned table (range by date)
CREATE TABLE events (
    event_id    BIGSERIAL,
    event_type  VARCHAR(50) NOT NULL,
    payload     JSONB,
    created_at  TIMESTAMP NOT NULL,
    PRIMARY KEY (event_id, created_at)  -- Partition key must be in PK
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE events_2024 PARTITION OF events
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE events_2025_q1 PARTITION OF events
    FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');

CREATE TABLE events_2025_q2 PARTITION OF events
    FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');

CREATE TABLE events_2025_q3 PARTITION OF events
    FOR VALUES FROM ('2025-07-01') TO ('2025-10-01');

CREATE TABLE events_2025_q4 PARTITION OF events
    FOR VALUES FROM ('2025-10-01') TO ('2026-01-01');

-- Create a default partition for data outside defined ranges
CREATE TABLE events_default PARTITION OF events DEFAULT;

-- Indexes are created per-partition
CREATE INDEX idx_events_type ON events (event_type);
-- This creates an index on EACH partition automatically
\`\`\`

### List Partitioning

\`\`\`sql
-- Partition by discrete values (e.g., region)
CREATE TABLE sales (
    sale_id     BIGSERIAL,
    region      VARCHAR(20) NOT NULL,
    amount      DECIMAL(12, 2),
    sale_date   DATE NOT NULL,
    PRIMARY KEY (sale_id, region)
) PARTITION BY LIST (region);

CREATE TABLE sales_north_america PARTITION OF sales
    FOR VALUES IN ('US', 'CA', 'MX');

CREATE TABLE sales_europe PARTITION OF sales
    FOR VALUES IN ('UK', 'DE', 'FR', 'IT', 'ES');

CREATE TABLE sales_asia PARTITION OF sales
    FOR VALUES IN ('JP', 'CN', 'KR', 'IN');

CREATE TABLE sales_other PARTITION OF sales DEFAULT;
\`\`\`

### Hash Partitioning

\`\`\`sql
-- Hash partitioning for even data distribution
CREATE TABLE user_sessions (
    session_id  UUID NOT NULL,
    user_id     INTEGER NOT NULL,
    data        JSONB,
    created_at  TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id)
) PARTITION BY HASH (session_id);

-- Create 8 hash partitions
CREATE TABLE user_sessions_0 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 0);
CREATE TABLE user_sessions_1 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 1);
CREATE TABLE user_sessions_2 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 2);
CREATE TABLE user_sessions_3 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 3);
CREATE TABLE user_sessions_4 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 4);
CREATE TABLE user_sessions_5 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 5);
CREATE TABLE user_sessions_6 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 6);
CREATE TABLE user_sessions_7 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 7);
\`\`\`

### Partition Pruning

\`\`\`sql
-- The planner automatically skips irrelevant partitions
-- when the query filter matches the partition key

EXPLAIN ANALYZE
SELECT * FROM events
WHERE created_at >= '2025-04-01' AND created_at < '2025-07-01';

-- Output shows only events_2025_q2 is scanned:
-- Append
--   -> Seq Scan on events_2025_q2
--        Filter: (created_at >= '2025-04-01' AND created_at < '2025-07-01')
-- (Other partitions are pruned — not even mentioned in the plan)

-- Verify partition pruning is enabled
SHOW enable_partition_pruning;  -- Should be 'on'
\`\`\`

### Partition Maintenance

\`\`\`sql
-- Drop old partitions (much faster than DELETE)
DROP TABLE events_2023;

-- Detach a partition (keeps the data in a standalone table)
ALTER TABLE events DETACH PARTITION events_2024;

-- Attach an existing table as a partition
ALTER TABLE events ATTACH PARTITION events_2024_reloaded
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Automated partition management with pg_partman
-- (extension, not built-in)
-- CREATE EXTENSION pg_partman;
-- SELECT partman.create_parent(
--     p_parent_table => 'public.events',
--     p_control => 'created_at',
--     p_type => 'native',
--     p_interval => '1 month'
-- );

-- Split a partition (PostgreSQL 17+)
-- ALTER TABLE events SPLIT PARTITION events_2025_q1 INTO
--     (PARTITION events_2025_01 FOR VALUES FROM ('2025-01-01') TO ('2025-02-01'),
--      PARTITION events_2025_02 FOR VALUES FROM ('2025-02-01') TO ('2025-03-01'),
--      PARTITION events_2025_03 FOR VALUES FROM ('2025-03-01') TO ('2025-04-01'));
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Partitioned Table: events"
        PT["events (logical)"]
        PT --> P1["events_2024<br/>Range: 2024"]
        PT --> P2["events_2025_q1<br/>Range: Jan-Mar 2025"]
        PT --> P3["events_2025_q2<br/>Range: Apr-Jun 2025"]
        PT --> P4["events_2025_q3<br/>Range: Jul-Sep 2025"]
        PT --> P5["events_2025_q4<br/>Range: Oct-Dec 2025"]
        PT --> PD["events_default<br/>Everything else"]
    end
    Q["Query: WHERE created_at<br/>BETWEEN Apr 1 and Jun 30"] -.->|"Partition Pruning"| P3
\`\`\`

**Why it matters:** Partitioning is critical for tables that grow without bound — event logs, time-series data, audit trails. Without partitioning, these tables become unmanageable: indexes grow huge, VACUUM takes hours, and DROP TABLE is the only fast way to remove old data.

### EXERCISE: Partitioning

\`\`\`sql
-- EXERCISE:
-- 1. Design a partitioning strategy for a table that stores
--    100 million log entries per month
-- 2. Create monthly partitions for 2025 and a default partition
-- 3. Write a query that benefits from partition pruning and verify
--    with EXPLAIN ANALYZE
-- 4. Write a script to detach and archive partitions older than 1 year
\`\`\`

---

## 4. Locking & Concurrency

### Row-Level Locks

\`\`\`sql
-- SELECT ... FOR UPDATE: exclusive lock on selected rows
-- Other transactions that try to UPDATE/DELETE/FOR UPDATE these rows will WAIT
BEGIN;
SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE;
-- Now this row is locked until COMMIT or ROLLBACK
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;

-- SELECT ... FOR SHARE: shared lock (allows other FOR SHARE, blocks FOR UPDATE)
BEGIN;
SELECT * FROM products WHERE product_id = 42 FOR SHARE;
-- Other transactions can read and FOR SHARE, but cannot UPDATE or FOR UPDATE
COMMIT;

-- NOWAIT: fail immediately if the row is locked
BEGIN;
SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE NOWAIT;
-- ERROR: could not obtain lock on row

-- SKIP LOCKED: skip rows that are already locked
-- Useful for job queues
SELECT * FROM job_queue
WHERE status = 'pending'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
\`\`\`

### Table-Level Locks

\`\`\`sql
-- PostgreSQL table lock modes (from weakest to strongest):
-- ACCESS SHARE          — acquired by SELECT
-- ROW SHARE             — acquired by SELECT FOR UPDATE/SHARE
-- ROW EXCLUSIVE         — acquired by INSERT/UPDATE/DELETE
-- SHARE UPDATE EXCLUSIVE — acquired by VACUUM, CREATE INDEX CONCURRENTLY
-- SHARE                 — acquired by CREATE INDEX (non-concurrent)
-- SHARE ROW EXCLUSIVE   — not auto-acquired, used explicitly
-- EXCLUSIVE             — blocks ROW SHARE and above
-- ACCESS EXCLUSIVE      — acquired by ALTER TABLE, DROP TABLE, VACUUM FULL

-- Explicit table lock
BEGIN;
LOCK TABLE products IN SHARE MODE;
-- Now no one can INSERT/UPDATE/DELETE products until we commit
-- But they can still SELECT
COMMIT;

-- Check current locks
SELECT
    l.locktype,
    l.relation::regclass AS table_name,
    l.mode,
    l.granted,
    a.pid,
    a.query,
    a.state
FROM pg_locks l
JOIN pg_stat_activity a ON l.pid = a.pid
WHERE l.relation IS NOT NULL
ORDER BY l.relation;
\`\`\`

### Advisory Locks

Advisory locks are application-level locks managed by PostgreSQL but not tied to any table or row.

\`\`\`sql
-- Session-level advisory lock (held until session ends or explicit unlock)
SELECT pg_advisory_lock(12345);  -- Lock with ID 12345
-- ... do work ...
SELECT pg_advisory_unlock(12345);

-- Transaction-level advisory lock (released at COMMIT/ROLLBACK)
BEGIN;
SELECT pg_advisory_xact_lock(12345);
-- ... do work ...
COMMIT;  -- Lock automatically released

-- Try lock (non-blocking)
SELECT pg_try_advisory_lock(12345);  -- Returns true if acquired, false if not

-- Two-argument form (for more granular locking)
-- e.g., lock "orders" table (OID) + specific order_id
SELECT pg_advisory_lock(
    'orders'::regclass::integer,
    42  -- order_id
);

-- Use case: prevent duplicate processing of the same job
-- Application code:
-- if pg_try_advisory_lock(hash_of_job_id):
--     process_job()
--     pg_advisory_unlock(hash_of_job_id)
-- else:
--     skip (another worker is processing this job)
\`\`\`

### MVCC (Multi-Version Concurrency Control)

\`\`\`sql
-- PostgreSQL uses MVCC: readers never block writers, writers never block readers.
-- Each transaction sees a snapshot of the database.

-- How MVCC works internally:
-- Every row has hidden system columns:
--   xmin: transaction ID that inserted this row
--   xmax: transaction ID that deleted/updated this row (0 if still alive)
--   ctid: physical location of the row on disk

-- See MVCC columns
SELECT xmin, xmax, ctid, * FROM employees WHERE employee_id = 1;

-- When you UPDATE a row in PostgreSQL:
-- 1. The old row version gets xmax set to the current transaction ID
-- 2. A NEW row version is created with xmin = current transaction ID
-- 3. The old version becomes a "dead tuple" (cleaned up by VACUUM)

-- This means:
-- - Updates create new row versions (write amplification)
-- - Dead tuples accumulate until VACUUM runs
-- - Indexes may point to dead tuples (index bloat)
-- - Long-running transactions prevent VACUUM from cleaning up
\`\`\`

### Optimistic vs. Pessimistic Locking

\`\`\`sql
-- PESSIMISTIC LOCKING: lock the row before reading
-- Use when: conflicts are frequent, or the cost of retry is high
BEGIN;
SELECT * FROM products WHERE product_id = 42 FOR UPDATE;
-- ... compute new values in application ...
UPDATE products SET stock = stock - 1 WHERE product_id = 42;
COMMIT;

-- OPTIMISTIC LOCKING: use a version number, detect conflicts at write time
-- Use when: conflicts are rare, or you want maximum concurrency

-- Table has a "version" column
-- Step 1: Read the current version
SELECT product_id, stock, version FROM products WHERE product_id = 42;
-- Returns: stock=10, version=5

-- Step 2: Update with version check
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE product_id = 42 AND version = 5;

-- Step 3: Check if the update affected any rows
-- If 0 rows affected, someone else modified the row — retry!

-- Alternative: use updated_at timestamp instead of version number
UPDATE products
SET stock = stock - 1, updated_at = NOW()
WHERE product_id = 42
  AND updated_at = '2025-06-15 10:30:00';
\`\`\`

> **Role connection:** Every backend developer needs to understand locking. The difference between a system that handles 100 concurrent users and one that handles 10,000 often comes down to locking strategy. Pessimistic locking is simpler but creates contention. Optimistic locking scales better but requires retry logic.

### EXERCISE: Locking & Concurrency

\`\`\`sql
-- EXERCISE:
-- 1. Implement a job queue using SELECT ... FOR UPDATE SKIP LOCKED
-- 2. Demonstrate a deadlock scenario and fix it with consistent lock ordering
-- 3. Implement optimistic locking for a shopping cart checkout that
--    decrements product stock
-- 4. Use advisory locks to prevent duplicate cron job execution
\`\`\`

---

## 5. Performance Tuning

### Connection Pooling

\`\`\`sql
-- PostgreSQL creates a new process for each connection.
-- Without pooling, opening 500 connections = 500 OS processes.
-- Each process uses ~5-10MB of memory.

-- PgBouncer configuration (pgbouncer.ini):
-- [databases]
-- myapp = host=localhost port=5432 dbname=myapp
--
-- [pgbouncer]
-- listen_port = 6432
-- pool_mode = transaction  -- Most common: connection returned after each transaction
-- max_client_conn = 1000   -- Accept up to 1000 client connections
-- default_pool_size = 20   -- But only 20 actual database connections

-- Pool modes:
-- session:      Connection dedicated to client for the session (safest)
-- transaction:  Connection returned to pool after each transaction (most efficient)
-- statement:    Connection returned after each statement (most aggressive, limited use)

-- Check connection usage
SELECT
    state,
    COUNT(*) AS connections,
    MAX(NOW() - state_change) AS longest_duration
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY state;

-- Kill idle connections that have been idle too long
-- (better handled by pooler, but useful in emergencies)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle'
  AND state_change < NOW() - INTERVAL '1 hour'
  AND pid != pg_backend_pid();
\`\`\`

### Query Plan Caching (Prepared Statements)

\`\`\`sql
-- Prepared statements cache the query plan, avoiding re-planning overhead

-- Create a prepared statement
PREPARE get_customer_orders(INTEGER) AS
SELECT order_id, order_date, total
FROM orders
WHERE customer_id = $1
ORDER BY order_date DESC;

-- Execute it multiple times (plan is cached)
EXECUTE get_customer_orders(100);
EXECUTE get_customer_orders(200);

-- After 5 executions, PostgreSQL generates a "generic" plan
-- if it is not significantly worse than custom plans

-- Deallocate
DEALLOCATE get_customer_orders;

-- In application code, most ORMs and database drivers handle
-- prepared statements automatically. E.g., in Python with psycopg2:
-- cursor.execute("SELECT * FROM orders WHERE customer_id = %s", (100,))
\`\`\`

### Bulk Operations

\`\`\`sql
-- COPY is the fastest way to bulk load/export data

-- Load data from a CSV file
COPY products (product_name, category, price, stock_quantity)
FROM '/tmp/products.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Export data to CSV
COPY (SELECT * FROM orders WHERE order_date >= '2025-01-01')
TO '/tmp/orders_2025.csv'
WITH (FORMAT csv, HEADER true);

-- From application code, use COPY protocol (e.g., psycopg2.copy_from)
-- This is 10-100x faster than individual INSERTs

-- Bulk insert optimization: disable indexes, then rebuild
BEGIN;
ALTER TABLE large_import_table DISABLE TRIGGER ALL;
-- ... COPY or bulk INSERT ...
ALTER TABLE large_import_table ENABLE TRIGGER ALL;
COMMIT;

REINDEX TABLE large_import_table;
ANALYZE large_import_table;

-- Batch updates (better than updating one row at a time)
UPDATE products
SET price = new_prices.price
FROM (
    VALUES
        (1, 29.99),
        (2, 39.99),
        (3, 49.99)
) AS new_prices(product_id, price)
WHERE products.product_id = new_prices.product_id;
\`\`\`

### VACUUM

\`\`\`sql
-- VACUUM reclaims space from dead tuples (old row versions from MVCC)

-- Standard VACUUM: marks dead tuple space as reusable, does not shrink file
VACUUM orders;

-- VACUUM ANALYZE: reclaim space AND update statistics
VACUUM ANALYZE orders;

-- VACUUM FULL: rewrites the entire table, reclaims disk space
-- WARNING: acquires ACCESS EXCLUSIVE lock (blocks everything)
VACUUM FULL orders;

-- Monitor vacuum needs
SELECT
    relname,
    n_live_tup,
    n_dead_tup,
    ROUND(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) AS dead_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Autovacuum tuning (per-table settings)
ALTER TABLE high_churn_table SET (
    autovacuum_vacuum_scale_factor = 0.05,   -- Vacuum when 5% dead (default: 20%)
    autovacuum_analyze_scale_factor = 0.02,  -- Analyze when 2% changed
    autovacuum_vacuum_cost_delay = 10        -- Less aggressive throttling
);
\`\`\`

### pg_stat_statements

\`\`\`sql
-- pg_stat_statements tracks execution statistics for all SQL queries
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find the slowest queries by total time
SELECT
    LEFT(query, 100) AS query_preview,
    calls,
    ROUND(total_exec_time::numeric, 2) AS total_ms,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms,
    ROUND(stddev_exec_time::numeric, 2) AS stddev_ms,
    rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Find queries with the most I/O
SELECT
    LEFT(query, 100) AS query_preview,
    calls,
    shared_blks_hit,
    shared_blks_read,
    ROUND(
        shared_blks_hit::numeric /
        NULLIF(shared_blks_hit + shared_blks_read, 0) * 100, 2
    ) AS cache_hit_pct
FROM pg_stat_statements
ORDER BY shared_blks_read DESC
LIMIT 20;

-- Reset statistics
SELECT pg_stat_statements_reset();
\`\`\`

**Why it matters:** Performance tuning is the difference between a database that costs $100/month and one that costs $10,000/month. Connection pooling, COPY for bulk operations, proper VACUUM, and pg_stat_statements are the tools that keep production databases healthy.

### EXERCISE: Performance Tuning

\`\`\`sql
-- EXERCISE:
-- 1. Set up pg_stat_statements and identify the top 5 slowest
--    queries in your application
-- 2. Implement COPY-based data import and compare performance
--    to individual INSERTs (try 100,000 rows)
-- 3. Check your tables for autovacuum configuration and dead tuple
--    ratios. Tune a high-churn table.
-- 4. Set up PgBouncer in transaction mode and measure the difference
--    in max connections your application can handle.
\`\`\`

---

## 6. Migration Strategies

### Zero-Downtime Migrations

The key principle: every migration step must be backward-compatible with the currently running application code. This is the "expand and contract" pattern.

\`\`\`sql
-- BAD: Renaming a column in one step (breaks existing application code)
ALTER TABLE users RENAME COLUMN name TO full_name;  -- Instant downtime!

-- GOOD: Expand and contract pattern (3 deployments)

-- Step 1 (Migration): Add new column
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

-- Step 2 (Migration): Backfill data
UPDATE users SET full_name = name WHERE full_name IS NULL;

-- Step 3 (Code deploy): Application writes to BOTH columns
-- Application reads from full_name (falling back to name)

-- Step 4 (Migration): Add NOT NULL constraint once backfill is complete
ALTER TABLE users ALTER COLUMN full_name SET NOT NULL;

-- Step 5 (Code deploy): Application only uses full_name

-- Step 6 (Migration): Drop old column
ALTER TABLE users DROP COLUMN name;
\`\`\`

### Safe Schema Changes

\`\`\`sql
-- Adding a column with a default (PostgreSQL 11+: instant, no table rewrite)
ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT false;

-- Adding a NOT NULL column safely
-- Step 1: Add nullable column
ALTER TABLE orders ADD COLUMN processed_at TIMESTAMP;
-- Step 2: Backfill in batches
UPDATE orders SET processed_at = completed_at
WHERE processed_at IS NULL AND order_id BETWEEN 1 AND 100000;
-- Repeat for all batches...
-- Step 3: Add constraint
ALTER TABLE orders ALTER COLUMN processed_at SET NOT NULL;

-- Creating an index without blocking writes
CREATE INDEX CONCURRENTLY idx_orders_customer ON orders (customer_id);
-- CONCURRENTLY: does not lock the table for writes
-- Trade-off: takes longer, runs in its own transaction, can fail and
-- leave an INVALID index that you must DROP and recreate

-- Check for invalid indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE indexname IN (
    SELECT indexrelid::regclass::text
    FROM pg_index
    WHERE NOT indisvalid
);

-- Adding a foreign key without blocking
-- Step 1: Add constraint as NOT VALID (instant, does not check existing rows)
ALTER TABLE orders ADD CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    NOT VALID;
-- Step 2: Validate existing rows in background (takes ShareUpdateExclusiveLock)
ALTER TABLE orders VALIDATE CONSTRAINT fk_orders_customer;
\`\`\`

### Backfill Patterns

\`\`\`sql
-- Batched backfill to avoid long-running transactions
DO $$
DECLARE
    batch_start INTEGER := 0;
    batch_size INTEGER := 10000;
    affected INTEGER;
BEGIN
    LOOP
        UPDATE orders
        SET normalized_email = LOWER(email)
        WHERE order_id > batch_start
          AND order_id <= batch_start + batch_size
          AND normalized_email IS NULL;

        GET DIAGNOSTICS affected = ROW_COUNT;

        -- Commit each batch (in a procedure) or give MVCC a break
        PERFORM pg_sleep(0.1);  -- Let autovacuum breathe

        batch_start := batch_start + batch_size;
        EXIT WHEN affected = 0;
    END LOOP;
END $$;

-- Backfill with progress tracking
CREATE TABLE migration_progress (
    migration_name VARCHAR(100) PRIMARY KEY,
    last_processed_id BIGINT DEFAULT 0,
    total_processed BIGINT DEFAULT 0,
    started_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Migration Tools

\`\`\`sql
-- Flyway (Java ecosystem)
-- Migrations are versioned SQL files: V1__create_users.sql, V2__add_email.sql
-- Flyway tracks which migrations have been applied in a schema_history table

-- Alembic (Python/SQLAlchemy ecosystem)
-- Migrations are Python files with upgrade() and downgrade() functions
-- Tracks state in an alembic_version table

-- Liquibase (XML/YAML/SQL changesets)
-- Supports multiple database vendors
-- Tracks state in DATABASECHANGELOG table

-- Rails Migrations (Ruby on Rails)
-- Ruby files with up/down methods
-- Tracks state in schema_migrations table

-- General best practices:
-- 1. Every migration must be idempotent (safe to run twice)
-- 2. Never edit a migration that has been applied to production
-- 3. Separate schema changes from data migrations
-- 4. Test migrations against a copy of production data
-- 5. Have a rollback plan for every migration
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Expand and Contract Pattern"
        E1["Step 1: Expand<br/>Add new column/table"]
        E2["Step 2: Migrate<br/>Backfill data"]
        E3["Step 3: Transition<br/>Code uses both old and new"]
        E4["Step 4: Contract<br/>Remove old column/table"]
    end
    E1 --> E2 --> E3 --> E4
    E1 -.->|"Backward compatible"| E2
    E2 -.->|"Backward compatible"| E3
    E3 -.->|"Backward compatible"| E4
\`\`\`

> **Role connection:** Migration strategy is one of the most critical skills for senior backend developers and platform engineers. A botched migration can cause extended downtime, data loss, or corruption. The expand/contract pattern should be second nature.

### EXERCISE: Migration Strategies

\`\`\`sql
-- EXERCISE:
-- 1. Design a zero-downtime migration to split a "name" column into
--    "first_name" and "last_name" columns
-- 2. Write a batched backfill script with progress tracking
-- 3. Create an index concurrently on a large table and handle the
--    scenario where it fails partway through
-- 4. Add a foreign key constraint to an existing table with
--    millions of rows without blocking writes
\`\`\`

---

## 7. Advanced Patterns

### Temporal Tables (System-Versioned)

Temporal tables track the history of every row change, enabling "time travel" queries.

\`\`\`sql
-- Manual temporal table pattern (works in any PostgreSQL version)
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price        DECIMAL(10, 2) NOT NULL,
    valid_from   TIMESTAMP NOT NULL DEFAULT NOW(),
    valid_to     TIMESTAMP NOT NULL DEFAULT 'infinity'
);

-- Current products view
CREATE VIEW products_current AS
SELECT * FROM products
WHERE valid_to = 'infinity';

-- "Close" the old record and insert a new one on update
CREATE OR REPLACE FUNCTION products_update_temporal()
RETURNS TRIGGER AS $$
BEGIN
    -- Close the old version
    UPDATE products
    SET valid_to = NOW()
    WHERE product_id = OLD.product_id AND valid_to = 'infinity';

    -- Insert the new version
    INSERT INTO products (product_id, product_name, price, valid_from, valid_to)
    VALUES (OLD.product_id, NEW.product_name, NEW.price, NOW(), 'infinity');

    RETURN NULL;  -- Prevent the original UPDATE
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_temporal
INSTEAD OF UPDATE ON products_current
FOR EACH ROW
EXECUTE FUNCTION products_update_temporal();

-- Time travel query: what was the price on a specific date?
SELECT * FROM products
WHERE product_id = 42
  AND valid_from <= '2025-03-15'
  AND valid_to > '2025-03-15';

-- Full history of a product
SELECT * FROM products
WHERE product_id = 42
ORDER BY valid_from;
\`\`\`

### Soft Deletes

\`\`\`sql
-- Soft delete: mark rows as deleted instead of removing them
CREATE TABLE users (
    user_id     SERIAL PRIMARY KEY,
    username    VARCHAR(50) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    deleted_at  TIMESTAMP,
    deleted_by  INTEGER
);

-- Partial index for fast "active only" queries
CREATE INDEX idx_users_active_email ON users (email)
WHERE deleted_at IS NULL;

-- Partial unique constraint (unique email only among active users)
CREATE UNIQUE INDEX idx_users_unique_email ON users (email)
WHERE deleted_at IS NULL;

-- View for active users
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;

-- Soft delete operation
UPDATE users
SET deleted_at = NOW(), deleted_by = current_user_id()
WHERE user_id = 42;

-- Restore a soft-deleted user
UPDATE users
SET deleted_at = NULL, deleted_by = NULL
WHERE user_id = 42;

-- Row-Level Security to automatically filter soft-deleted rows
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY active_users_only ON users
    FOR SELECT
    USING (deleted_at IS NULL);
-- Now all SELECT queries automatically exclude soft-deleted users
-- (unless the role has BYPASSRLS)
\`\`\`

### Audit Logging

\`\`\`sql
-- Generic audit log table
CREATE TABLE audit_log (
    audit_id     BIGSERIAL PRIMARY KEY,
    table_name   VARCHAR(100) NOT NULL,
    record_id    TEXT NOT NULL,
    action       VARCHAR(10) NOT NULL,  -- INSERT, UPDATE, DELETE
    old_data     JSONB,
    new_data     JSONB,
    changed_by   VARCHAR(100) DEFAULT current_user,
    changed_at   TIMESTAMP DEFAULT NOW(),
    ip_address   INET
);

CREATE INDEX idx_audit_table_record ON audit_log (table_name, record_id);
CREATE INDEX idx_audit_changed_at ON audit_log (changed_at);

-- Generic audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_data)
        VALUES (TG_TABLE_NAME, NEW.id::TEXT, 'INSERT', to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_data, new_data)
        VALUES (TG_TABLE_NAME, OLD.id::TEXT, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_data)
        VALUES (TG_TABLE_NAME, OLD.id::TEXT, 'DELETE', to_jsonb(OLD));
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Attach audit logging to any table
CREATE TRIGGER trg_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER trg_users_audit
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Query the audit log
SELECT * FROM audit_log
WHERE table_name = 'orders' AND record_id = '12345'
ORDER BY changed_at DESC;

-- Find all changes by a specific user
SELECT * FROM audit_log
WHERE changed_by = 'admin_user'
  AND changed_at >= NOW() - INTERVAL '24 hours'
ORDER BY changed_at DESC;
\`\`\`

### JSONB Operations

\`\`\`sql
-- JSONB is a powerful semi-structured data type in PostgreSQL

-- Insert JSONB data
INSERT INTO events (event_type, payload)
VALUES ('user_signup', '{
    "user_id": 42,
    "email": "user@example.com",
    "source": "google_ads",
    "metadata": {
        "campaign_id": "summer2025",
        "utm_params": {"source": "google", "medium": "cpc"}
    }
}'::jsonb);

-- Access nested fields
SELECT
    payload->>'user_id' AS user_id,                    -- Text
    (payload->>'user_id')::INTEGER AS user_id_int,     -- Cast to int
    payload->'metadata'->>'campaign_id' AS campaign,   -- Nested access
    payload->'metadata'->'utm_params' AS utm,          -- Returns JSONB
    payload #>> '{metadata,utm_params,source}' AS utm_source  -- Path access
FROM events;

-- JSONB containment (@>) with GIN index
CREATE INDEX idx_events_payload ON events USING gin (payload);

SELECT * FROM events
WHERE payload @> '{"source": "google_ads"}';

-- JSONB modification
UPDATE events
SET payload = payload || '{"processed": true}'::jsonb
WHERE event_id = 1;

-- Remove a key
UPDATE events
SET payload = payload - 'temporary_field'
WHERE event_id = 1;

-- Set a nested value
UPDATE events
SET payload = jsonb_set(payload, '{metadata,processed_at}', '"2025-06-15T10:00:00Z"')
WHERE event_id = 1;

-- Aggregate JSONB
SELECT
    payload->>'source' AS source,
    COUNT(*) AS event_count,
    jsonb_agg(DISTINCT payload->>'event_type') AS event_types
FROM events
GROUP BY payload->>'source';

-- Expand JSONB array to rows
SELECT
    event_id,
    jsonb_array_elements_text(payload->'tags') AS tag
FROM events
WHERE payload ? 'tags';
\`\`\`

### Full-Text Search

\`\`\`sql
-- Full-text search in PostgreSQL

-- Add tsvector column and index
ALTER TABLE articles ADD COLUMN search_vector tsvector;

UPDATE articles
SET search_vector = to_tsvector('english',
    COALESCE(title, '') || ' ' ||
    COALESCE(body, '') || ' ' ||
    COALESCE(author_name, '')
);

CREATE INDEX idx_articles_search ON articles USING gin (search_vector);

-- Keep the vector updated via trigger
CREATE OR REPLACE FUNCTION articles_search_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english',
        COALESCE(NEW.title, '') || ' ' ||
        COALESCE(NEW.body, '') || ' ' ||
        COALESCE(NEW.author_name, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_search
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION articles_search_trigger();

-- Search with ranking
SELECT
    title,
    ts_rank(search_vector, query) AS rank,
    ts_headline('english', body, query,
        'StartSel=<mark>, StopSel=</mark>, MaxFragments=3'
    ) AS snippet
FROM articles,
     to_tsquery('english', 'postgresql & performance & tuning') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;

-- Phrase search
SELECT * FROM articles
WHERE search_vector @@ phraseto_tsquery('english', 'database performance');

-- Weighted search (title matches matter more)
ALTER TABLE articles ADD COLUMN weighted_search tsvector;

UPDATE articles
SET weighted_search =
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(body, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(author_name, '')), 'C');

CREATE INDEX idx_articles_weighted_search ON articles USING gin (weighted_search);
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Advanced SQL Patterns"
        T["Temporal Tables<br/>Track history of changes"]
        SD["Soft Deletes<br/>Reversible deletions"]
        AL["Audit Logging<br/>Who changed what, when"]
        J["JSONB Operations<br/>Semi-structured data"]
        FTS["Full-Text Search<br/>Ranked document search"]
    end
    T -.->|"Time travel queries"| AL
    SD -.->|"Compliance and recovery"| AL
    J -.->|"Flexible schemas"| FTS
\`\`\`

**Why it matters:** These patterns appear in virtually every production system. Audit logging is often legally required (GDPR, SOX, HIPAA). Soft deletes prevent accidental data loss and enable undo functionality. JSONB gives you schema flexibility where you need it. Full-text search saves you from deploying Elasticsearch for simpler search requirements.

### EXERCISE: Advanced Patterns

\`\`\`sql
-- EXERCISE:
-- 1. Implement a temporal table for products with time-travel query support
-- 2. Add audit logging to your orders table and query "who changed
--    order #12345 in the last 7 days"
-- 3. Store user preferences as JSONB and write queries to:
--    a. Find users with a specific preference set
--    b. Update a nested preference value
--    c. Aggregate preferences across all users
-- 4. Implement full-text search for a blog with weighted ranking
--    (title 3x, body 1x, tags 2x)
-- 5. Design a soft-delete system with Row-Level Security that
--    automatically hides deleted records
\`\`\`

---

## Summary — Senior Level

You now have deep expertise in SQL performance, architecture, and advanced patterns:
- **Execution plans** — reading and interpreting scan types, join algorithms, and cost estimates
- **Index internals** — B-tree, hash, GIN, GiST, partial, expression, and covering indexes
- **Partitioning** — range, list, and hash partitioning with pruning and maintenance
- **Locking and concurrency** — row locks, table locks, advisory locks, MVCC, optimistic vs pessimistic
- **Performance tuning** — connection pooling, COPY, VACUUM, pg_stat_statements
- **Migration strategies** — zero-downtime changes, expand/contract, backfilling, safe DDL
- **Advanced patterns** — temporal tables, soft deletes, audit logging, JSONB, full-text search

These are the skills that enable you to design, maintain, and scale production database systems that handle millions of transactions per day.

---

## Recommended Videos — Senior Level

- **Kai Sassnowski** — "Things every developer absolutely, positively needs to know about database indexing" — https://www.youtube.com/watch?v=HubezKbFL7E
- **freeCodeCamp** — "Database Design Course – Learn how to design and plan a database" — https://www.youtube.com/watch?v=ztHopE5Wnpc
- **Fireship** — "SQL Explained in 100 Seconds" — https://www.youtube.com/watch?v=zsjvFFKOm3c
`
  },
  'TypeScript': {
    beginner: `# TypeScript Deep Dive — Beginner Level

## 1. Type Annotations — Primitives

TypeScript adds a type system on top of JavaScript. The most fundamental concept is the **type annotation**: you tell the compiler what type a variable, parameter, or return value should be.

### Primitive Types

TypeScript has the same primitive types as JavaScript, but you can annotate them explicitly.

\`\`\`typescript
// Explicit type annotations
let username: string = "alice";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// BigInt and Symbol
let bigNum: bigint = 9007199254740991n;
let uniqueKey: symbol = Symbol("id");

// Type inference — TypeScript figures out the type automatically
let city = "Berlin"; // TypeScript infers: string
let count = 42;      // TypeScript infers: number

// This will cause a compile error:
// city = 100; // Error: Type 'number' is not assignable to type 'string'
\`\`\`

**Why it matters:** Type annotations catch bugs at compile time rather than at runtime. A misspelled property or a wrong argument type is caught instantly in your editor, saving hours of debugging.

**Key things to understand:**
- TypeScript **erases** all type annotations at compile time — they produce zero runtime overhead
- Type inference means you do not need to annotate everything; TypeScript is smart enough to figure out most types
- The \`any\` type opts out of type checking — avoid it whenever possible

> **Role connection:** Frontend Developers use TypeScript in React, Angular, and Vue projects. Backend Developers use it with Node.js and frameworks like NestJS. Full-Stack Developers benefit from shared types between client and server.

### Arrays and Tuples

\`\`\`typescript
// Array types — two equivalent syntaxes
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Readonly arrays — cannot be mutated
let frozen: readonly number[] = [1, 2, 3];
// frozen.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'

// Tuples — fixed-length arrays with specific types at each position
let coordinate: [number, number] = [40.7128, -74.0060];
let record: [string, number, boolean] = ["Alice", 30, true];

// Named tuples (TypeScript 4.0+) for documentation
let user: [name: string, age: number] = ["Alice", 30];

// Destructuring tuples
const [lat, lng] = coordinate;
console.log(lat); // 40.7128

// Tuple with optional elements
let flexible: [string, number?] = ["hello"];

// Tuple with rest elements
let atLeastOne: [string, ...number[]] = ["scores", 95, 87, 92];
\`\`\`

**Common pitfalls:**
- Tuples look like arrays at runtime — TypeScript only enforces their structure at compile time
- \`const\` assertions can create readonly tuple types: \`const point = [1, 2] as const\`
- Array destructuring works with tuples but loses type narrowing if you spread

### Object Types

\`\`\`typescript
// Inline object type
let person: { name: string; age: number; email?: string } = {
    name: "Alice",
    age: 30
};

// Optional properties use ?
// person.email is string | undefined

// Readonly properties
let config: { readonly host: string; readonly port: number } = {
    host: "localhost",
    port: 3000
};
// config.port = 8080; // Error: Cannot assign to 'port' because it is a read-only property

// Index signatures — when you don't know all property names
let scores: { [studentName: string]: number } = {};
scores["Alice"] = 95;
scores["Bob"] = 87;

// Nested objects
let company: {
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    employees: number;
} = {
    name: "Tech Corp",
    address: {
        street: "123 Main St",
        city: "Berlin",
        country: "Germany"
    },
    employees: 500
};
\`\`\`

**Why it matters:** Object types model the shape of your data. In a real application, almost everything — API responses, database records, component props — is an object. Getting the types right means your editor auto-completes every property and catches every typo.

---

## 2. Interfaces vs Type Aliases

TypeScript gives you two ways to name an object type: \`interface\` and \`type\`. They overlap significantly but have important differences.

### Interfaces

\`\`\`typescript
// Basic interface
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

// Using the interface
function greet(user: User): string {
    return "Hello, " + user.name + "!";
}

// Extending interfaces — like class inheritance for types
interface AdminUser extends User {
    role: "admin";
    permissions: string[];
}

// Multiple extension
interface SuperAdmin extends AdminUser {
    canDeleteUsers: boolean;
}

// Interface merging — unique to interfaces
// Two declarations with the same name merge automatically
interface Window {
    myCustomProperty: string;
}
// Now the global Window interface includes myCustomProperty

// Implementing interfaces in classes
interface Serializable {
    serialize(): string;
    deserialize(data: string): void;
}

class UserModel implements Serializable {
    constructor(public name: string, public age: number) {}

    serialize(): string {
        return JSON.stringify({ name: this.name, age: this.age });
    }

    deserialize(data: string): void {
        const parsed = JSON.parse(data);
        this.name = parsed.name;
        this.age = parsed.age;
    }
}
\`\`\`

### Type Aliases

\`\`\`typescript
// Basic type alias — looks similar to interface
type User = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
};

// But type aliases can represent ANY type, not just objects
type ID = string | number;
type Callback = (data: string) => void;
type Pair<T> = [T, T];
type StringOrNull = string | null;

// Intersection types — the type alias version of "extends"
type AdminUser = User & {
    role: "admin";
    permissions: string[];
};

// Mapped and conditional types only work with type aliases
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
\`\`\`

### When to Use Which

\`\`\`mermaid
graph TD
    A[Need to name a type?] --> B{Object shape?}
    B -->|Yes| C{Will it be extended/merged?}
    B -->|No| D[Use type alias]
    C -->|Yes, by classes or declaration merging| E[Use interface]
    C -->|No, or using intersections| F[Either works — be consistent]
    D --> G[Unions, tuples, primitives, mapped types]
    E --> H[API contracts, class shapes, library augmentation]
\`\`\`

**Key things to understand:**
- **Interfaces** support declaration merging — two interfaces with the same name combine. Type aliases cannot merge.
- **Type aliases** can represent unions, tuples, primitives, and computed types. Interfaces cannot.
- For object shapes, both work. Pick one convention and stick with it across your project.
- The TypeScript team generally recommends \`interface\` for public API shapes and \`type\` for everything else.

> **Role connection:** Frontend Developers define component prop interfaces. Backend Developers define API request/response interfaces. Full-Stack Developers share interfaces between client and server code.

### EXERCISE: Interfaces and Types

\`\`\`typescript
// EXERCISE:
// 1. Define an interface "Product" with: id, name, price, category, inStock
// 2. Extend it to create "DigitalProduct" that adds: downloadUrl, fileSizeMB
// 3. Create a type alias "CartItem" that combines Product with a quantity field
// 4. Write a function that takes a CartItem[] and returns the total price
// 5. Make the function handle both physical and digital products
\`\`\`

---

## 3. Enums

Enums let you define a set of named constants. TypeScript supports both numeric and string enums.

### Numeric Enums

\`\`\`typescript
// Numeric enum — values auto-increment from 0
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

// Custom starting value
enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}

// Using enums
function handleResponse(status: HttpStatus): void {
    if (status === HttpStatus.OK) {
        console.log("Success!");
    } else if (status === HttpStatus.NotFound) {
        console.log("Not found!");
    }
}

handleResponse(HttpStatus.OK);

// Reverse mapping — numeric enums support this
console.log(HttpStatus[200]); // "OK"
console.log(HttpStatus.OK);    // 200
\`\`\`

### String Enums

\`\`\`typescript
// String enums — every member must be explicitly initialized
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
    Yellow = "YELLOW"
}

enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}

function log(message: string, level: LogLevel): void {
    console.log("[" + level + "] " + message);
}

log("Application started", LogLevel.Info);
// [INFO] Application started
\`\`\`

### const Enums and Alternatives

\`\`\`typescript
// const enums are inlined at compile time — no runtime object
const enum MathConstants {
    Pi = 3.14159,
    E = 2.71828,
    Phi = 1.61803
}

// At compile time, this becomes: let circle = 2 * 3.14159 * 10;
let circumference = 2 * MathConstants.Pi * 10;

// Modern alternative: use "as const" objects (often preferred)
const DIRECTIONS = {
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT"
} as const;

// Derive a union type from the const object
type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];
// type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
\`\`\`

**Common pitfalls:**
- Numeric enums have reverse mappings, which bloat the compiled JavaScript
- \`const enum\` cannot be used with \`--isolatedModules\` (required by many bundlers)
- Many teams prefer union types of string literals over enums for simplicity
- String enums do NOT have reverse mappings

> **Role connection:** Backend Developers use enums for status codes, roles, and configuration options. Frontend Developers use them for component variants and theme values. DevOps Engineers encounter them in infrastructure-as-code tools like Pulumi.

---

## 4. Union and Intersection Types

Unions and intersections are the core of TypeScript's type algebra. They let you compose types from simpler building blocks.

### Union Types

\`\`\`typescript
// A union type allows a value to be one of several types
type StringOrNumber = string | number;

function formatId(id: StringOrNumber): string {
    // You must narrow the type before using type-specific methods
    if (typeof id === "string") {
        return id.toUpperCase();
    } else {
        return "#" + id.toString().padStart(6, "0");
    }
}

console.log(formatId("abc"));  // "ABC"
console.log(formatId(42));      // "#000042"

// Literal unions — extremely powerful for domain modeling
type Status = "pending" | "active" | "inactive" | "deleted";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function setStatus(userId: number, status: Status): void {
    // status can ONLY be one of the four literal values
    console.log("Setting user " + userId + " to " + status);
}

setStatus(1, "active");  // OK
// setStatus(1, "unknown"); // Error: Argument of type '"unknown"' is not assignable

// Union of object types
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return 0.5 * shape.base * shape.height;
    }
}
\`\`\`

### Intersection Types

\`\`\`typescript
// Intersection types combine multiple types into one
type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };

type Person = HasName & HasAge & HasEmail;

// A Person must have ALL properties from all three types
const alice: Person = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
};

// Practical example: adding metadata to any type
type Timestamped<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};

type WithId<T> = T & {
    id: number;
};

interface Product {
    name: string;
    price: number;
}

// Compose multiple enhancements
type DBProduct = WithId<Timestamped<Product>>;
// Equivalent to:
// {
//   id: number;
//   name: string;
//   price: number;
//   createdAt: Date;
//   updatedAt: Date;
// }
\`\`\`

\`\`\`mermaid
graph LR
    A[Union A | B] --> A1[Value is A]
    A --> A2[Value is B]
    B[Intersection A & B] --> B1[Value has all of A AND all of B]

    style A fill:#e3f2fd
    style B fill:#e8f5e9
\`\`\`

**Key things to understand:**
- **Union** = "either this OR that" (widens the type)
- **Intersection** = "this AND that" (narrows / combines the type)
- Unions of object types with a shared discriminant field (like \`kind\`) enable **discriminated unions** — one of TypeScript's most powerful patterns

### EXERCISE: Union and Intersection Types

\`\`\`typescript
// EXERCISE:
// 1. Define a type "Result<T>" as a union:
//    { success: true; data: T } | { success: false; error: string }
// 2. Write a function "parseJSON" that takes a string and returns Result<unknown>
// 3. Create an intersection type "AuditableEntity" that adds
//    createdBy, updatedBy, createdAt, updatedAt to any type
// 4. Use AuditableEntity with a "BlogPost" type
\`\`\`

---

## 5. Generics Basics

Generics allow you to write reusable code that works with any type while preserving type safety. Think of them as "type parameters" — like function parameters, but for types.

### Generic Functions

\`\`\`typescript
// Without generics — loses type information
function firstElementAny(arr: any[]): any {
    return arr[0];
}
const val = firstElementAny([1, 2, 3]); // val is "any" — no type safety

// With generics — preserves the type
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const num = firstElement([1, 2, 3]);           // num is number
const str = firstElement(["a", "b", "c"]);     // str is string
const user = firstElement([{ name: "Alice" }]); // user is { name: string }

// Multiple type parameters
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

const p = pair("hello", 42); // p is [string, number]

// Generic with constraints
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

longest("hello", "hi");       // OK — strings have .length
longest([1, 2, 3], [4, 5]);   // OK — arrays have .length
// longest(10, 20);            // Error: number doesn't have .length
\`\`\`

### Generic Interfaces and Types

\`\`\`typescript
// Generic interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}

// Use with different data types
type UserResponse = ApiResponse<{ id: number; name: string; email: string }>;
type ProductListResponse = ApiResponse<{ id: number; name: string; price: number }[]>;

// Generic type alias
type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return { ok: false, error: "Division by zero" };
    }
    return { ok: true, value: a / b };
}

const result = divide(10, 3);
if (result.ok) {
    console.log(result.value); // TypeScript knows this is number
} else {
    console.log(result.error); // TypeScript knows this is string
}

// Generic class
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const top = numberStack.pop(); // top is number | undefined
\`\`\`

\`\`\`mermaid
graph TD
    A["Generic Function<br/>identity&lt;T&gt;(arg: T): T"] --> B["Called with string<br/>identity('hello')"]
    A --> C["Called with number<br/>identity(42)"]
    A --> D["Called with User<br/>identity(user)"]
    B --> E["Returns: string"]
    C --> F["Returns: number"]
    D --> G["Returns: User"]

    style A fill:#fff3e0
    style E fill:#e3f2fd
    style F fill:#e3f2fd
    style G fill:#e3f2fd
\`\`\`

**Why it matters:** Without generics, you would either lose type safety (using \`any\`) or duplicate code for every type. Generics give you both flexibility and safety. Every major TypeScript library — React, Express, Prisma — uses generics extensively.

> **Role connection:** Frontend Developers use generics with React component props and hooks. Backend Developers use them with ORM models and API handlers. Library authors use generics to make their APIs flexible yet type-safe.

---

## 6. Function Types and Overloads

Functions are first-class citizens in TypeScript. You can type parameters, return values, and even the function itself.

### Function Type Annotations

\`\`\`typescript
// Parameter and return type annotations
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function greet(name: string, greeting?: string): string {
    return (greeting || "Hello") + ", " + name + "!";
}

greet("Alice");             // "Hello, Alice!"
greet("Alice", "Bonjour");  // "Bonjour, Alice!"

// Default parameters
function createUser(name: string, role: string = "viewer"): { name: string; role: string } {
    return { name, role };
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4, 5); // 15

// Function type as a variable
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;

// Function type in an interface
interface EventHandler {
    (event: string, data: unknown): void;
}

const handleClick: EventHandler = (event, data) => {
    console.log("Event:", event, "Data:", data);
};
\`\`\`

### Function Overloads

\`\`\`typescript
// Overloads let a function have multiple call signatures
// Overload signatures (what callers see):
function parse(input: string): number;
function parse(input: number): string;
// Implementation signature (must be compatible with all overloads):
function parse(input: string | number): string | number {
    if (typeof input === "string") {
        return parseInt(input, 10);
    } else {
        return input.toString();
    }
}

const num = parse("42");   // TypeScript knows this returns number
const str = parse(42);      // TypeScript knows this returns string

// Practical overload example: DOM event listener
function addEventListener(event: "click", handler: (e: MouseEvent) => void): void;
function addEventListener(event: "keydown", handler: (e: KeyboardEvent) => void): void;
function addEventListener(event: "scroll", handler: (e: Event) => void): void;
function addEventListener(event: string, handler: (e: Event) => void): void {
    document.addEventListener(event, handler);
}

// Each call knows the exact event type
addEventListener("click", (e) => {
    console.log(e.clientX, e.clientY); // e is MouseEvent
});

addEventListener("keydown", (e) => {
    console.log(e.key); // e is KeyboardEvent
});
\`\`\`

**Common pitfalls:**
- The implementation signature is NOT visible to callers — only the overload signatures are
- Overloads are checked in order — put more specific signatures first
- Often, generics or union types are simpler than overloads

### Void, Never, and Unknown

\`\`\`typescript
// void — function doesn't return a value
function logMessage(msg: string): void {
    console.log(msg);
}

// never — function never returns (throws or infinite loop)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // runs forever
    }
}

// unknown — the type-safe counterpart of any
function processInput(input: unknown): string {
    // Must narrow the type before using it
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    if (typeof input === "number") {
        return input.toFixed(2);
    }
    if (input instanceof Date) {
        return input.toISOString();
    }
    return String(input);
}

// any vs unknown
let dangerous: any = "hello";
dangerous.nonExistent.method(); // No error at compile time — crashes at runtime!

let safe: unknown = "hello";
// safe.nonExistent.method(); // Error: Object is of type 'unknown'
\`\`\`

**Key things to understand:**
- Use \`void\` for functions that perform side effects and return nothing
- Use \`never\` for functions that always throw or never terminate — it also represents the empty type (no possible values)
- Use \`unknown\` instead of \`any\` when you do not know the type — it forces you to check before using it
- \`any\` disables type checking; \`unknown\` preserves it

---

## 7. tsconfig.json Essentials

The \`tsconfig.json\` file configures the TypeScript compiler. Understanding its key options is essential for every TypeScript project.

### Core Configuration

\`\`\`json
{
    "compilerOptions": {
        // Target JavaScript version
        "target": "ES2022",

        // Module system
        "module": "ESNext",
        "moduleResolution": "bundler",

        // Output directory
        "outDir": "./dist",
        "rootDir": "./src",

        // Strict mode — ALWAYS enable this
        "strict": true,

        // Additional strict checks
        "noUncheckedIndexedAccess": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,

        // Interop settings
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,

        // Source maps for debugging
        "sourceMap": true,
        "declaration": true,

        // Skip type checking node_modules
        "skipLibCheck": true,

        // Resolve JSON imports
        "resolveJsonModule": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
\`\`\`

**Why it matters:** A misconfigured \`tsconfig.json\` can silently disable important type checks or cause hard-to-debug module resolution issues. The \`strict\` flag alone enables seven sub-flags that catch common bugs.

### What "strict" Enables

\`\`\`typescript
// strict: true enables ALL of these:
// 1. strictNullChecks — null and undefined are separate types
let name: string = "Alice";
// name = null; // Error with strictNullChecks

// 2. noImplicitAny — must explicitly type parameters
// function greet(name) {} // Error: parameter 'name' implicitly has 'any' type
function greet(name: string) {} // OK

// 3. strictFunctionTypes — stricter function type checking
// 4. strictBindCallApply — type-checks bind, call, apply
// 5. strictPropertyInitialization — class properties must be initialized
// 6. noImplicitThis — must declare 'this' type in functions
// 7. alwaysStrict — emits "use strict" in every file

// Always start with strict: true and NEVER turn it off
\`\`\`

> **Role connection:** DevOps Engineers configure TypeScript builds in CI/CD pipelines. Full-Stack Developers maintain shared tsconfig files in monorepos. Library authors use declaration: true to generate .d.ts files for consumers.

### EXERCISE: tsconfig.json

\`\`\`typescript
// EXERCISE:
// 1. Create a tsconfig.json for a Node.js backend project
//    - Target Node 20 (ES2022)
//    - Use CommonJS modules
//    - Enable strict mode and all additional checks
//    - Output to dist/ with source maps and declarations
// 2. Create a tsconfig.json for a React frontend project
//    - Target modern browsers (ES2020)
//    - Use ESNext modules with bundler resolution
//    - Enable JSX with react-jsx transform
//    - Extend a shared base config
\`\`\`

---

## 8. Type Inference and Type Narrowing

TypeScript's type inference and narrowing system means you write fewer annotations while maintaining full type safety.

### Type Inference

\`\`\`typescript
// Variable inference
let message = "hello";     // string
let count = 42;            // number
let items = [1, 2, 3];    // number[]
let mixed = [1, "two"];   // (string | number)[]

// Return type inference
function add(a: number, b: number) {
    return a + b; // TypeScript infers return type: number
}

// Object literal inference
let user = {
    name: "Alice",
    age: 30,
    isAdmin: false
};
// Type: { name: string; age: number; isAdmin: boolean }

// const inference — literals become narrow types
const direction = "north"; // Type: "north" (not string)
const count2 = 42;          // Type: 42 (not number)
let mutable = "north";     // Type: string (can be reassigned)

// as const — deeply readonly with literal types
const config = {
    api: "https://api.example.com",
    timeout: 5000,
    retries: 3
} as const;
// Type: { readonly api: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3 }

// Contextual typing — TypeScript infers parameter types from context
const names = ["Alice", "Bob", "Charlie"];
names.forEach((name) => {
    // TypeScript knows name is string — no annotation needed
    console.log(name.toUpperCase());
});

document.addEventListener("click", (event) => {
    // TypeScript knows event is MouseEvent
    console.log(event.clientX, event.clientY);
});
\`\`\`

### Type Narrowing

Type narrowing is how TypeScript refines a broad type to a more specific one inside a conditional block.

\`\`\`typescript
// typeof narrowing
function processValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        return value.toUpperCase(); // value is string here
    }
    if (typeof value === "number") {
        return value.toFixed(2); // value is number here
    }
    return value ? "true" : "false"; // value is boolean here
}

// instanceof narrowing
function formatDate(input: string | Date): string {
    if (input instanceof Date) {
        return input.toISOString(); // input is Date here
    }
    return new Date(input).toISOString(); // input is string here
}

// "in" operator narrowing
interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; color: string; }

function petSound(pet: Dog | Cat): void {
    if ("bark" in pet) {
        pet.bark(); // pet is Dog here
    } else {
        pet.meow(); // pet is Cat here
    }
}

// Truthiness narrowing
function printLength(str: string | null | undefined): void {
    if (str) {
        console.log(str.length); // str is string here (not null/undefined)
    } else {
        console.log("No string provided");
    }
}

// Discriminated union narrowing
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "rectangle":
            return shape.width * shape.height;
    }
}
\`\`\`

\`\`\`mermaid
graph TD
    A["value: string | number | Date | null"] -->|typeof === 'string'| B["value: string"]
    A -->|typeof === 'number'| C["value: number"]
    A -->|instanceof Date| D["value: Date"]
    A -->|=== null| E["value: null"]
    A -->|truthiness check| F["value: string | number | Date"]

    style A fill:#fff3e0
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#e8f5e9
    style E fill:#e8f5e9
    style F fill:#e8f5e9
\`\`\`

### Custom Type Guards

\`\`\`typescript
// Type predicate — a function that narrows a type
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isUser(value: unknown): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "email" in value
    );
}

interface User {
    name: string;
    email: string;
}

function processInput(input: unknown): void {
    if (isUser(input)) {
        // TypeScript knows input is User here
        console.log(input.name, input.email);
    }
}

// Assertion functions (TypeScript 3.7+)
function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
        throw new Error("Expected a number, got " + typeof value);
    }
}

function double(input: unknown): number {
    assertIsNumber(input);
    // After the assertion, TypeScript knows input is number
    return input * 2;
}
\`\`\`

**Why it matters:** Type narrowing means TypeScript tracks the type of a variable as it flows through your code. You rarely need type assertions (\`as\`) when you use narrowing correctly. This is one of the features that makes TypeScript dramatically more powerful than simple type annotations.

**Common pitfalls:**
- \`typeof null === "object"\` — this JavaScript quirk means typeof narrowing does not filter out null
- Narrowing only works in the same scope — assign to a variable if you need to narrow across function calls
- Array.filter does not narrow types by default — use a type predicate: \`arr.filter((x): x is string => typeof x === "string")\`

### EXERCISE: Type Narrowing

\`\`\`typescript
// EXERCISE:
// 1. Write a function "stringify" that accepts string | number | boolean | null | undefined
//    and returns a human-readable string for each case
// 2. Create a discriminated union "NetworkState" with states:
//    "idle", "loading", "success" (with data), "error" (with message)
//    Write a render function that handles each state
// 3. Write a type guard "isNonEmpty" that narrows string to a branded NonEmptyString type
\`\`\`

---

## 9. Recommended Resources — Beginner

- **freeCodeCamp** — "Learn TypeScript – Full Tutorial" — https://www.youtube.com/watch?v=30LWjhZzg50
- **Fireship** — "TypeScript in 100 Seconds" — https://www.youtube.com/watch?v=zQnBQ4tB3ZA
- **Jack Herrington** — "No BS TS" series — https://www.youtube.com/watch?v=LKVHFHJsiO0
- **The TypeScript Handbook** — https://www.typescriptlang.org/docs/handbook/

---

## Summary — Beginner Level

You now understand the core building blocks of TypeScript:
- **Type annotations** — primitives, arrays, tuples, and objects
- **Interfaces vs type aliases** — when to use each and how they differ
- **Enums** — numeric and string enums, plus modern alternatives
- **Union and intersection types** — composing types with | and &
- **Generics basics** — writing reusable, type-safe functions and classes
- **Function types** — parameters, return types, overloads, void, never, unknown
- **tsconfig.json** — essential compiler options and strict mode
- **Type inference and narrowing** — letting TypeScript work for you

These foundations prepare you for the Mid level, where you will explore advanced generics, utility types, conditional types, and more.
`,
    mid: `# TypeScript Deep Dive — Mid Level

## 1. Advanced Generics

At the beginner level you learned to write generic functions and interfaces. Now we go deeper: constraints, defaults, inference patterns, and real-world generic architectures.

### Generic Constraints

\`\`\`typescript
// Constrain T to types that have a specific shape
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// getProperty(user, "phone"); // Error: '"phone"' is not assignable to keyof User

// Constrain to types with a specific method
interface Printable {
    toString(): string;
}

function printAll<T extends Printable>(items: T[]): void {
    items.forEach(item => console.log(item.toString()));
}

// Constrain with multiple requirements
function merge<T extends object, U extends object>(a: T, b: U): T & U {
    return { ...a, ...b };
}

const merged = merge({ name: "Alice" }, { age: 30 });
// Type: { name: string } & { age: number }
\`\`\`

### Generic Defaults

\`\`\`typescript
// Default type parameters — like default function arguments
interface ApiResponse<T = unknown, E = Error> {
    data: T | null;
    error: E | null;
    status: number;
}

// Use with explicit type
const userResponse: ApiResponse<User> = {
    data: { name: "Alice", age: 30, email: "a@b.com" },
    error: null,
    status: 200
};

// Use with default (T = unknown, E = Error)
const genericResponse: ApiResponse = {
    data: null,
    error: new Error("Something went wrong"),
    status: 500
};

// Default with constraint
type EventMap<T extends Record<string, unknown> = Record<string, unknown>> = {
    [K in keyof T]: (payload: T[K]) => void;
};

interface AppEvents {
    login: { userId: string };
    logout: { reason: string };
    error: { code: number; message: string };
}

type AppEventHandlers = EventMap<AppEvents>;
// { login: (payload: { userId: string }) => void; logout: ...; error: ... }
\`\`\`

### Generic Inference Patterns

\`\`\`typescript
// TypeScript can infer generics from function arguments
function createPair<A, B>(a: A, b: B) {
    return { first: a, second: b };
}

// No need to specify <string, number> — inferred from arguments
const pair = createPair("hello", 42);
// Type: { first: string; second: number }

// Infer from callback return type
function transform<T, R>(value: T, fn: (input: T) => R): R {
    return fn(value);
}

const length = transform("hello", (s) => s.length);
// TypeScript infers T = string, R = number

// Builder pattern with inference chaining
class QueryBuilder<T extends object> {
    private conditions: string[] = [];
    private selectedFields: string[] = [];

    where<K extends keyof T>(field: K, value: T[K]): this {
        this.conditions.push(String(field) + " = " + String(value));
        return this;
    }

    select<K extends keyof T>(...fields: K[]): QueryBuilder<Pick<T, K>> {
        this.selectedFields = fields.map(String);
        return this as unknown as QueryBuilder<Pick<T, K>>;
    }

    build(): string {
        const fields = this.selectedFields.length > 0
            ? this.selectedFields.join(", ")
            : "*";
        const where = this.conditions.length > 0
            ? " WHERE " + this.conditions.join(" AND ")
            : "";
        return "SELECT " + fields + " FROM table" + where;
    }
}

interface User {
    name: string;
    age: number;
    email: string;
}

const query = new QueryBuilder<User>()
    .select("name", "email")
    .where("age", 30)
    .build();
\`\`\`

**Why it matters:** Advanced generics are the backbone of every major TypeScript library. React's component types, Prisma's query builder, tRPC's end-to-end type safety — all rely on sophisticated generic patterns. Mastering these lets you build APIs that are both flexible and fully type-safe.

> **Role connection:** Full-Stack Developers use generic inference in tRPC and Zod. Backend Developers use constrained generics in ORM type definitions. Library authors build entire APIs around generic inference chains.

### EXERCISE: Advanced Generics

\`\`\`typescript
// EXERCISE:
// 1. Write a generic function "pluck" that takes an array of objects
//    and a key, returning an array of the values at that key
//    pluck([{name: "Alice", age: 30}], "name") => ["Alice"]
// 2. Create a generic "Cache<K, V>" class with get, set, has, delete methods
//    where K is constrained to string | number | symbol
// 3. Build a type-safe event emitter class:
//    class Emitter<Events extends Record<string, unknown>>
//    with on(event, handler) and emit(event, payload) methods
\`\`\`

---

## 2. Utility Types

TypeScript ships with built-in utility types that transform existing types. These are essential tools you will use daily.

### Partial, Required, Readonly

\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: "admin" | "user" | "moderator";
}

// Partial<T> — makes all properties optional
type UpdateUserPayload = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; role?: ... }

function updateUser(id: number, updates: Partial<User>): User {
    const existing = getUserById(id);
    return { ...existing, ...updates };
}

updateUser(1, { name: "Bob" }); // Only update the name

// Required<T> — makes all properties required
interface Config {
    host?: string;
    port?: number;
    debug?: boolean;
}

type StrictConfig = Required<Config>;
// { host: string; port: number; debug: boolean }

// Readonly<T> — makes all properties readonly
type FrozenUser = Readonly<User>;
// All properties are readonly — cannot be reassigned

function freeze<T extends object>(obj: T): Readonly<T> {
    return Object.freeze(obj);
}
\`\`\`

### Pick, Omit, Record

\`\`\`typescript
// Pick<T, K> — select specific properties
type UserPreview = Pick<User, "id" | "name" | "role">;
// { id: number; name: string; role: "admin" | "user" | "moderator" }

// Omit<T, K> — exclude specific properties
type CreateUserPayload = Omit<User, "id">;
// { name: string; email: string; age: number; role: ... }

// Record<K, V> — create an object type with keys K and values V
type UserRoles = Record<string, "admin" | "user" | "moderator">;

const roles: UserRoles = {
    alice: "admin",
    bob: "user",
    charlie: "moderator"
};

// Record with union keys — ensures all keys are present
type StatusMessages = Record<"success" | "error" | "loading", string>;

const messages: StatusMessages = {
    success: "Operation completed",
    error: "Something went wrong",
    loading: "Please wait..."
};

// Combining utility types
type PublicUserProfile = Readonly<Pick<User, "name" | "role">>;
// { readonly name: string; readonly role: "admin" | "user" | "moderator" }
\`\`\`

### Exclude, Extract, NonNullable, ReturnType, Parameters

\`\`\`typescript
// Exclude<T, U> — remove types from a union
type AllStatuses = "pending" | "active" | "inactive" | "deleted";
type ActiveStatuses = Exclude<AllStatuses, "deleted" | "inactive">;
// "pending" | "active"

// Extract<T, U> — keep only types assignable to U
type StringOrNumber = string | number | boolean | null;
type OnlyStrOrNum = Extract<StringOrNumber, string | number>;
// string | number

// NonNullable<T> — remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

// ReturnType<T> — extract the return type of a function
function createUser(name: string, age: number) {
    return { id: Math.random(), name, age, createdAt: new Date() };
}

type NewUser = ReturnType<typeof createUser>;
// { id: number; name: string; age: number; createdAt: Date }

// Parameters<T> — extract parameter types as a tuple
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number]

// Awaited<T> — unwrap Promise types (TypeScript 4.5+)
type UserPromise = Promise<User>;
type ResolvedUser = Awaited<UserPromise>;
// User

// Deeply nested promises
type DeepPromise = Promise<Promise<Promise<string>>>;
type DeepResolved = Awaited<DeepPromise>;
// string
\`\`\`

\`\`\`mermaid
graph TD
    A["User<br/>{id, name, email, age, role}"] --> B["Partial&lt;User&gt;<br/>all optional"]
    A --> C["Required&lt;User&gt;<br/>all required"]
    A --> D["Pick&lt;User, 'name' | 'email'&gt;<br/>{name, email}"]
    A --> E["Omit&lt;User, 'id'&gt;<br/>{name, email, age, role}"]
    A --> F["Readonly&lt;User&gt;<br/>all readonly"]

    style A fill:#fff3e0
    style B fill:#e3f2fd
    style C fill:#e3f2fd
    style D fill:#e3f2fd
    style E fill:#e3f2fd
    style F fill:#e3f2fd
\`\`\`

**Common pitfalls:**
- \`Omit\` does not verify the key exists — \`Omit<User, "nonexistent">\` compiles without error
- \`Partial\` only affects top-level properties — use a custom \`DeepPartial\` for nested objects
- \`ReturnType\` requires \`typeof\` when used with a value: \`ReturnType<typeof myFunction>\`

---

## 3. Mapped Types and Conditional Types

Mapped types and conditional types are the programmable layer of TypeScript's type system. They let you transform types algorithmically.

### Mapped Types

\`\`\`typescript
// A mapped type iterates over keys and transforms values
// This is how Partial<T> works internally:
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

// Make all properties nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

interface User {
    name: string;
    age: number;
    email: string;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; email: string | null }

// Key remapping (TypeScript 4.1+)
type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Filtering keys with remapping
type OnlyStringProperties<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type StringUserProps = OnlyStringProperties<User>;
// { name: string; email: string }

// Adding and removing modifiers
type Mutable<T> = {
    -readonly [K in keyof T]: T[K]; // remove readonly
};

type RequiredProps<T> = {
    [K in keyof T]-?: T[K]; // remove optional
};
\`\`\`

### Conditional Types

\`\`\`typescript
// Conditional types use the ternary pattern: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false
type C = IsString<"hello">;  // true

// Practical: extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

type NumArrayEl = ElementType<number[]>;   // number
type StrArrayEl = ElementType<string[]>;   // string
type NotArray = ElementType<string>;       // never

// Extract function return type (how ReturnType works)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type RT = MyReturnType<(x: number) => string>; // string

// Distributive conditional types — unions are distributed
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]  (NOT (string | number)[])

// Prevent distribution by wrapping in tuple
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;

type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]

// Practical: deep readonly
type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

interface NestedConfig {
    server: {
        host: string;
        port: number;
        ssl: {
            enabled: boolean;
            cert: string;
        };
    };
    database: {
        url: string;
    };
}

type FrozenConfig = DeepReadonly<NestedConfig>;
// All nested properties are readonly
\`\`\`

\`\`\`mermaid
graph TD
    A["Conditional Type<br/>T extends U ? X : Y"] --> B{Does T extend U?}
    B -->|Yes| C["Result: X"]
    B -->|No| D["Result: Y"]

    E["Mapped Type<br/>{[K in keyof T]: ...}"] --> F["Iterates over each key K"]
    F --> G["Transforms the value type T[K]"]
    F --> H["Can remap keys with 'as'"]
    F --> I["Can add/remove modifiers"]

    style A fill:#e3f2fd
    style E fill:#e8f5e9
\`\`\`

**Key things to understand:**
- \`infer\` in conditional types lets you extract a type from a pattern — like regex capture groups for types
- Conditional types are **distributive** over unions by default — each member is evaluated separately
- Mapped types with \`as never\` filtering and conditional types together enable powerful type transformations
- These are the building blocks for the utility types you already use (Partial, Pick, ReturnType, etc.)

> **Role connection:** Library authors use mapped and conditional types to build type-safe APIs. Frontend Developers encounter them in React's component type utilities. Backend Developers use them in ORM type builders.

### EXERCISE: Mapped and Conditional Types

\`\`\`typescript
// EXERCISE:
// 1. Create a mapped type "EventHandlers<T>" that takes an interface and creates
//    handler function types: { onChange: (value: string) => void } from { change: string }
// 2. Create a conditional type "Flatten<T>" that:
//    - If T is an array, returns the element type
//    - If T is a Promise, returns the resolved type
//    - Otherwise returns T
// 3. Create "DeepPartial<T>" that makes ALL nested properties optional
\`\`\`

---

## 4. Strict Mode and Compiler Flags

Understanding compiler flags beyond \`strict: true\` gives you fine-grained control over type safety.

### Beyond strict: true

\`\`\`typescript
// noUncheckedIndexedAccess — one of the most valuable non-strict flags
// Without it:
const arr: string[] = ["a", "b", "c"];
const item = arr[10]; // string (no error — but it's undefined at runtime!)

// With noUncheckedIndexedAccess: true:
const safeItem = arr[10]; // string | undefined (forces you to check)

// noPropertyAccessFromIndexSignature
interface Dict {
    [key: string]: string;
    knownProp: string;
}

declare const dict: Dict;
dict.knownProp;     // OK — known property
// dict.unknownProp; // Error with this flag — must use dict["unknownProp"]
dict["unknownProp"]; // OK — bracket notation acknowledges dynamic access

// exactOptionalPropertyTypes (TypeScript 4.4+)
interface Settings {
    theme?: "light" | "dark";
}

// Without exactOptionalPropertyTypes:
const s1: Settings = { theme: undefined }; // OK

// With exactOptionalPropertyTypes:
// const s2: Settings = { theme: undefined }; // Error!
// You must either omit the property or provide a valid value
const s3: Settings = {};           // OK
const s4: Settings = { theme: "dark" }; // OK
\`\`\`

### isolatedModules and verbatimModuleSyntax

\`\`\`typescript
// isolatedModules — required for most bundlers (esbuild, Vite, SWC)
// Ensures each file can be compiled independently

// This FAILS with isolatedModules because const enums need cross-file info:
// const enum Direction { Up, Down, Left, Right }
// export { Direction }; // Error with isolatedModules

// verbatimModuleSyntax (TypeScript 5.0+) — replaces isolatedModules
// Requires explicit "type" keyword for type-only imports/exports
import type { User } from "./types";     // Erased at compile time
import { createUser } from "./factory";  // Kept in output

// Mixed imports
import { type User, createUser } from "./module";
// "User" is erased, "createUser" is kept
\`\`\`

**Why it matters:** Modern build tools like esbuild, Vite, and SWC transpile each file independently — they cannot do cross-file type analysis. Flags like \`isolatedModules\` and \`verbatimModuleSyntax\` ensure your code works with these tools.

---

## 5. Discriminated Unions and Exhaustive Checking

Discriminated unions are arguably TypeScript's most important pattern for modeling real-world domain logic.

### Building Discriminated Unions

\`\`\`typescript
// Each variant has a common "discriminant" field with a literal type
type RequestState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: Error; retryCount: number };

// TypeScript narrows based on the discriminant
function renderState<T>(state: RequestState<T>): string {
    switch (state.status) {
        case "idle":
            return "Ready to fetch";
        case "loading":
            return "Loading...";
        case "success":
            return "Got data: " + JSON.stringify(state.data);
        case "error":
            return "Error: " + state.error.message +
                " (retried " + state.retryCount + " times)";
    }
}

// Real-world example: form validation
type ValidationResult =
    | { valid: true; value: string }
    | { valid: false; errors: string[] };

function validateEmail(input: string): ValidationResult {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (emailRegex.test(input)) {
        return { valid: true, value: input.toLowerCase() };
    }
    return { valid: false, errors: ["Invalid email format"] };
}

// Payment processing example
type PaymentMethod =
    | { type: "credit_card"; cardNumber: string; expiry: string; cvv: string }
    | { type: "bank_transfer"; iban: string; bic: string }
    | { type: "paypal"; email: string }
    | { type: "crypto"; walletAddress: string; chain: "ethereum" | "bitcoin" };

function processPayment(method: PaymentMethod): void {
    switch (method.type) {
        case "credit_card":
            console.log("Charging card ending in " + method.cardNumber.slice(-4));
            break;
        case "bank_transfer":
            console.log("Transferring to IBAN " + method.iban);
            break;
        case "paypal":
            console.log("PayPal payment to " + method.email);
            break;
        case "crypto":
            console.log("Sending to " + method.chain + " wallet " + method.walletAddress);
            break;
    }
}
\`\`\`

### Exhaustive Checking

\`\`\`typescript
// The "never" trick ensures you handle all cases
function assertNever(value: never): never {
    throw new Error("Unexpected value: " + JSON.stringify(value));
}

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "triangle":
            return 0.5 * shape.base * shape.height;
        default:
            // If you add a new shape and forget to handle it,
            // TypeScript will error here because shape won't be "never"
            return assertNever(shape);
    }
}

// If someone adds { kind: "pentagon"; ... } to Shape but forgets
// to add a case, the default branch gets type error:
// Argument of type '{ kind: "pentagon"; ... }' is not assignable to type 'never'
\`\`\`

**Why it matters:** Exhaustive checking turns your switch statements into compile-time-verified state machines. When you add a new variant, the compiler tells you every place in the codebase that needs updating. This is a massive improvement over string comparisons in plain JavaScript.

> **Role connection:** Frontend Developers model UI state machines (loading, error, success). Backend Developers model request processing pipelines. Full-Stack Developers share domain types with exhaustive patterns across the stack.

---

## 6. Declaration Files (.d.ts)

Declaration files describe the shape of JavaScript code to TypeScript without providing implementations.

### Writing Declaration Files

\`\`\`typescript
// types/analytics.d.ts
// Declare types for a JavaScript analytics library

declare module "analytics-lib" {
    interface AnalyticsConfig {
        apiKey: string;
        endpoint?: string;
        debug?: boolean;
    }

    interface EventProperties {
        [key: string]: string | number | boolean;
    }

    export function init(config: AnalyticsConfig): void;
    export function track(event: string, properties?: EventProperties): void;
    export function identify(userId: string, traits?: Record<string, unknown>): void;
    export function page(name?: string): void;

    export default {
        init: typeof init;
        track: typeof track;
        identify: typeof identify;
        page: typeof page;
    };
}

// Declaring global variables (e.g., injected by a script tag)
declare global {
    interface Window {
        analytics: {
            track(event: string, data?: Record<string, unknown>): void;
        };
        __APP_VERSION__: string;
    }

    // Global variable without Window
    var API_BASE_URL: string;
}

// Declaring a JSON module
declare module "*.json" {
    const value: Record<string, unknown>;
    export default value;
}

// Declaring CSS modules
declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

// Declaring image imports
declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    const content: string;
    export default content;
}
\`\`\`

### Triple-Slash Directives and Type Roots

\`\`\`typescript
// Triple-slash directives reference other declaration files
/// <reference types="node" />
/// <reference path="./custom-types.d.ts" />

// tsconfig.json type roots
// {
//   "compilerOptions": {
//     "typeRoots": ["./node_modules/@types", "./src/types"],
//     "types": ["node", "jest"]  // Only include these @types packages
//   }
// }
\`\`\`

**Common pitfalls:**
- Declaration files (.d.ts) should never contain implementations — only types
- \`declare global\` requires the file to have at least one import or export (to be a module)
- \`typeRoots\` replaces the default type lookup — if you set it, you must include \`node_modules/@types\`
- Ambient module declarations (\`declare module "x"\`) should be in .d.ts files, not .ts files

---

## 7. Module Augmentation and Ambient Modules

Module augmentation lets you extend existing types from libraries without modifying their source code.

### Augmenting Third-Party Libraries

\`\`\`typescript
// Augmenting Express with custom request properties
import "express";

declare module "express" {
    interface Request {
        userId?: string;
        sessionToken?: string;
        permissions?: string[];
    }
}

// Now in your middleware:
import { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    if (token) {
        req.userId = decodeToken(token).userId;
        req.permissions = decodeToken(token).permissions;
    }
    next();
}

// Augmenting a React library
declare module "react" {
    interface CSSProperties {
        // Allow custom CSS properties
        [key: \`--\${string}\`]: string | number;
    }
}

// Augmenting a Prisma client
declare module "@prisma/client" {
    interface PrismaClient {
        \$softDelete<T>(model: string, id: number): Promise<T>;
    }
}
\`\`\`

### Ambient Modules for Untyped Libraries

\`\`\`typescript
// When a library has no types and no @types package,
// create a .d.ts file with an ambient module declaration

// src/types/untyped-lib.d.ts
declare module "legacy-chart-lib" {
    interface ChartOptions {
        width: number;
        height: number;
        title?: string;
        data: number[];
    }

    export class Chart {
        constructor(element: HTMLElement, options: ChartOptions);
        render(): void;
        update(data: number[]): void;
        destroy(): void;
    }

    export function createChart(element: HTMLElement, options: ChartOptions): Chart;
}

// Quick escape hatch — type everything as any (use as last resort)
declare module "totally-untyped-lib";
// Now you can import anything from it, but nothing is type-checked
\`\`\`

**Why it matters:** In real projects you will always encounter libraries that need type adjustments — Express middleware, custom Prisma extensions, environment variables. Module augmentation lets you add type safety without forking the library.

> **Role connection:** Backend Developers augment Express, Fastify, and Prisma types. Frontend Developers augment React, CSS, and component library types. DevOps Engineers augment environment and configuration types.

---

## 8. Testing Typed Code

TypeScript introduces unique testing considerations: type-level tests, generics mocking, and test utilities.

### Type-Level Testing with Expect-Type

\`\`\`typescript
// Install: npm install -D expect-type
import { expectTypeOf } from "expect-type";

// Test that a function returns the right type
function add(a: number, b: number): number {
    return a + b;
}

expectTypeOf(add).returns.toBeNumber();
expectTypeOf(add).parameters.toEqualTypeOf<[number, number]>();

// Test generic types
interface ApiResponse<T> {
    data: T;
    status: number;
}

expectTypeOf<ApiResponse<string>>().toMatchTypeOf<{ data: string; status: number }>();

// Test that a type is assignable
type User = { name: string; age: number };
type PartialUser = Partial<User>;

expectTypeOf<{ name: string }>().toMatchTypeOf<PartialUser>();
expectTypeOf<{ name: string; invalid: boolean }>().not.toMatchTypeOf<User>();
\`\`\`

### Testing with Type-Safe Mocks

\`\`\`typescript
// Use Partial<T> for test mocks that only need some properties
interface UserService {
    getUser(id: number): Promise<User>;
    updateUser(id: number, data: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<void>;
    listUsers(page: number, limit: number): Promise<User[]>;
}

// Create a type-safe mock
function createMockUserService(overrides: Partial<UserService> = {}): UserService {
    return {
        getUser: async () => ({ name: "Test User", age: 25, email: "test@test.com" }),
        updateUser: async (_, data) => ({ name: "Test User", age: 25, email: "test@test.com", ...data }),
        deleteUser: async () => {},
        listUsers: async () => [],
        ...overrides
    } as UserService;
}

// In your test:
const mockService = createMockUserService({
    getUser: async (id) => ({
        name: "Alice",
        age: 30,
        email: "alice@test.com"
    })
});

// Testing discriminated unions
type Result<T> =
    | { ok: true; value: T }
    | { ok: false; error: string };

function assertOk<T>(result: Result<T>): asserts result is { ok: true; value: T } {
    if (!result.ok) {
        throw new Error("Expected ok result, got error: " + result.error);
    }
}

// In your test:
async function testDivide(): Promise<void> {
    const result = divide(10, 2);
    assertOk(result);
    // TypeScript now knows result.value exists
    console.assert(result.value === 5);
}
\`\`\`

### Testing Patterns Summary

\`\`\`typescript
// 1. Use satisfies for test data validation (TypeScript 4.9+)
const testUser = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
} satisfies User;
// TypeScript verifies the shape but keeps the narrow literal types

// 2. Use as const for test fixtures
const TEST_USERS = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
] as const;

// 3. Use generics in test helpers
function createTestData<T>(defaults: T, overrides: Partial<T> = {}): T {
    return { ...defaults, ...overrides };
}
\`\`\`

**Key things to understand:**
- Type-level tests verify your generic types and utility types work correctly — they run at compile time, not runtime
- \`satisfies\` is excellent for test data — it validates the type without widening
- Assertion functions (\`asserts x is Y\`) make tests cleaner by narrowing types after validation
- Mock factories using \`Partial<T>\` keep tests type-safe while allowing overrides

---

## 9. Recommended Resources — Mid Level

- **Matt Pocock** — "Advanced TypeScript" series — https://www.youtube.com/watch?v=dLPgQRbVquo
- **Jack Herrington** — "TypeScript Generics" — https://www.youtube.com/watch?v=nViEqpgwxHE
- **Theo (t3dotgg)** — "Why I Don't Use Enums" — https://www.youtube.com/watch?v=jjMbPt_H3RQ
- **TypeScript Deep Dive** by Basarat — https://basarat.gitbook.io/typescript/

---

## Summary — Mid Level

You now have intermediate mastery of TypeScript's type system:
- **Advanced generics** — constraints, defaults, and inference patterns for building flexible APIs
- **Utility types** — Partial, Required, Pick, Omit, Record, Exclude, Extract, ReturnType and when to use each
- **Mapped types** — transforming object types programmatically with key remapping and modifier changes
- **Conditional types** — type-level branching with infer, distribution, and recursive patterns
- **Compiler flags** — noUncheckedIndexedAccess, isolatedModules, verbatimModuleSyntax
- **Discriminated unions** — modeling domain logic with exhaustive checking
- **Declaration files** — typing untyped JavaScript and module augmentation
- **Testing typed code** — type-level tests, typed mocks, and assertion functions

The Senior level covers type-level programming, branded types, variance, monorepo configuration, and migration strategies.
`,
    senior: `# TypeScript Deep Dive — Senior Level

## 1. Template Literal Types

Template literal types bring string manipulation into the type system. Combined with mapped types, they enable type-safe string transformations that were previously impossible.

### Basics of Template Literal Types

\`\`\`typescript
// Template literal types use the same syntax as JavaScript template literals
type Greeting = \`Hello, \${string}\`;

const valid: Greeting = "Hello, World";   // OK
const valid2: Greeting = "Hello, Alice";  // OK
// const invalid: Greeting = "Hi, Alice"; // Error

// Combining literal unions — creates all combinations
type Color = "red" | "green" | "blue";
type Shade = "light" | "dark";

type ColorVariant = \`\${Shade}-\${Color}\`;
// "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"

// CSS unit types
type CSSUnit = "px" | "em" | "rem" | "vh" | "vw" | "%";
type CSSLength = \`\${number}\${CSSUnit}\`;

const width: CSSLength = "100px";   // OK
const height: CSSLength = "50vh";   // OK
// const invalid: CSSLength = "wide"; // Error

// Event strings
type DOMEvent = "click" | "focus" | "blur" | "input" | "change";
type EventHandler = \`on\${Capitalize<DOMEvent>}\`;
// "onClick" | "onFocus" | "onBlur" | "onInput" | "onChange"
\`\`\`

### String Manipulation Types

\`\`\`typescript
// TypeScript has built-in string manipulation types
type Upper = Uppercase<"hello">;       // "HELLO"
type Lower = Lowercase<"HELLO">;       // "hello"
type Cap = Capitalize<"hello">;         // "Hello"
type Uncap = Uncapitalize<"Hello">;     // "hello"

// Build a type-safe event system
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type EventMap<Events extends string> = {
    [E in Events as EventName<E>]: (event: E) => void;
};

type ButtonEvents = EventMap<"click" | "hover" | "focus">;
// { onClick: (event: "click") => void; onHover: ...; onFocus: ... }

// Object path types (dotted path notation)
type PathOf<T, Prefix extends string = ""> = T extends object
    ? {
        [K in keyof T & string]:
            | \`\${Prefix}\${K}\`
            | PathOf<T[K], \`\${Prefix}\${K}.\`>
    }[keyof T & string]
    : never;

interface Config {
    server: {
        host: string;
        port: number;
    };
    database: {
        url: string;
        pool: {
            min: number;
            max: number;
        };
    };
}

type ConfigPath = PathOf<Config>;
// "server" | "server.host" | "server.port" | "database" | "database.url" |
// "database.pool" | "database.pool.min" | "database.pool.max"

// Type-safe get function
function get<T, P extends PathOf<T>>(obj: T, path: P): unknown {
    return (path as string).split(".").reduce((o: any, k) => o?.[k], obj);
}
\`\`\`

### Advanced Template Literal Parsing

\`\`\`typescript
// Parse a route string into parameter types
type ExtractParams<T extends string> =
    T extends \`\${string}:\${infer Param}/\${infer Rest}\`
        ? Param | ExtractParams<Rest>
        : T extends \`\${string}:\${infer Param}\`
            ? Param
            : never;

type RouteParams = ExtractParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"

type ParamRecord<T extends string> = Record<ExtractParams<T>, string>;

// Type-safe route handler
function createRoute<T extends string>(
    path: T,
    handler: (params: ParamRecord<T>) => void
): void {
    // implementation
}

createRoute("/users/:userId/posts/:postId", (params) => {
    console.log(params.userId);  // OK — TypeScript knows these exist
    console.log(params.postId);  // OK
    // console.log(params.invalid); // Error
});

// SQL query parameter extraction
type ExtractSQLParams<T extends string> =
    T extends \`\${string}@\${infer Param} \${infer Rest}\`
        ? Param | ExtractSQLParams<Rest>
        : T extends \`\${string}@\${infer Param}\`
            ? Param
            : never;

type QueryParams = ExtractSQLParams<"SELECT * FROM users WHERE id = @id AND name = @name">;
// "id" | "name"
\`\`\`

**Why it matters:** Template literal types enable type-safe string APIs — route parameters, CSS values, SQL queries, event names. Libraries like Hono, tRPC, and Prisma use these techniques to provide auto-complete for string-based APIs.

> **Role connection:** Full-Stack Developers use template literal types in route definitions (Hono, Express). Backend Developers use them for type-safe query builders. Library authors use them to build string-aware APIs.

---

## 2. Type-Level Programming

TypeScript's type system is Turing-complete. You can write recursive types, perform arithmetic, and build complex type computations.

### Recursive Types

\`\`\`typescript
// Deep readonly — recursively makes everything immutable
type DeepReadonly<T> = T extends Function
    ? T
    : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

// Deep partial — recursively makes everything optional
type DeepPartial<T> = T extends Function
    ? T
    : T extends object
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : T;

// Flatten nested arrays
type DeepFlatten<T> = T extends readonly (infer E)[]
    ? DeepFlatten<E>
    : T;

type Nested = number[][][];
type Flat = DeepFlatten<Nested>; // number

// JSON-compatible types
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

// Recursive path type with value extraction
type GetFieldType<T, P extends string> =
    P extends \`\${infer Head}.\${infer Rest}\`
        ? Head extends keyof T
            ? GetFieldType<T[Head], Rest>
            : never
        : P extends keyof T
            ? T[P]
            : never;

interface DeepObject {
    a: {
        b: {
            c: number;
            d: string;
        };
        e: boolean;
    };
}

type Result = GetFieldType<DeepObject, "a.b.c">; // number
type Result2 = GetFieldType<DeepObject, "a.e">;   // boolean
\`\`\`

### Tuple Manipulation

\`\`\`typescript
// Type-level tuple operations
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : [];
type Last<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : never;

type H = Head<[1, 2, 3]>;  // 1
type T2 = Tail<[1, 2, 3]>;  // [2, 3]
type L = Last<[1, 2, 3]>;  // 3

// Reverse a tuple
type Reverse<T extends readonly unknown[]> =
    T extends readonly [infer Head, ...infer Tail]
        ? [...Reverse<Tail>, Head]
        : [];

type Reversed = Reverse<[1, 2, 3, 4]>; // [4, 3, 2, 1]

// Type-level length
type Length<T extends readonly unknown[]> = T["length"];

type Len = Length<[string, number, boolean]>; // 3

// Concatenate tuples
type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];

type Combined = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// Zip two tuples
type Zip<A extends readonly unknown[], B extends readonly unknown[]> =
    A extends readonly [infer AH, ...infer AT]
        ? B extends readonly [infer BH, ...infer BT]
            ? [[AH, BH], ...Zip<AT, BT>]
            : []
        : [];

type Zipped = Zip<["a", "b", "c"], [1, 2, 3]>;
// [["a", 1], ["b", 2], ["c", 3]]
\`\`\`

### Type Arithmetic

\`\`\`typescript
// Build a tuple of length N (helper for arithmetic)
type BuildTuple<N extends number, T extends unknown[] = []> =
    T["length"] extends N ? T : BuildTuple<N, [...T, unknown]>;

// Addition
type Add<A extends number, B extends number> =
    [...BuildTuple<A>, ...BuildTuple<B>]["length"];

type Sum = Add<3, 4>; // 7

// Subtraction (only non-negative results)
type Subtract<A extends number, B extends number> =
    BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
        ? R["length"]
        : never;

type Diff = Subtract<7, 3>; // 4

// Comparison
type IsGreaterThan<A extends number, B extends number> =
    A extends B ? false
    : BuildTuple<A> extends [...BuildTuple<B>, ...infer R]
        ? R extends [] ? false : true
        : false;

type GT = IsGreaterThan<5, 3>; // true
type EQ = IsGreaterThan<3, 3>; // false
\`\`\`

**Key things to understand:**
- TypeScript has a recursion depth limit (~1000 for most operations) — deep recursive types can hit it
- Use \`tail-call style\` recursion with accumulators to go deeper
- Type-level arithmetic is fun but rarely needed in production — use it sparingly
- The real value is in recursive utility types (DeepPartial, DeepReadonly, path types)

---

## 3. Branded / Nominal Types

TypeScript uses structural typing — if two types have the same shape, they are interchangeable. Branded types add a unique "tag" to prevent accidental mixing.

### The Problem

\`\`\`typescript
// Without branding — these are interchangeable
type UserId = number;
type ProductId = number;
type OrderId = number;

function getUser(id: UserId): void { /* ... */ }

const userId: UserId = 42;
const productId: ProductId = 42;

// This compiles but is a logical bug:
getUser(productId); // No error! Both are just "number"
\`\`\`

### The Solution: Branded Types

\`\`\`typescript
// Create a brand using intersection with a unique symbol
declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;
type OrderId = Brand<number, "OrderId">;

// Factory functions to create branded values
function userId(id: number): UserId {
    return id as UserId;
}

function productId(id: number): ProductId {
    return id as ProductId;
}

function getUser(id: UserId): void {
    console.log("Getting user:", id);
}

const uid = userId(42);
const pid = productId(42);

getUser(uid);  // OK
// getUser(pid); // Error: Argument of type 'ProductId' is not assignable to type 'UserId'
// getUser(42);  // Error: Argument of type '42' is not assignable to type 'UserId'

// Branded strings for validated data
type Email = Brand<string, "Email">;
type URL = Brand<string, "URL">;
type NonEmptyString = Brand<string, "NonEmptyString">;

function validateEmail(input: string): Email | null {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(input) ? (input as Email) : null;
}

function sendEmail(to: Email, subject: string, body: string): void {
    // "to" is guaranteed to be a validated email
    console.log("Sending to:", to);
}

const email = validateEmail("alice@example.com");
if (email) {
    sendEmail(email, "Hello", "World"); // OK — email is validated
}
// sendEmail("not-validated", "Hello", "World"); // Error
\`\`\`

### Branded Types with Zod

\`\`\`typescript
// Combine branded types with runtime validation using Zod
import { z } from "zod";

const EmailSchema = z.string().email().brand("Email");
type Email = z.infer<typeof EmailSchema>;

const PositiveIntSchema = z.number().int().positive().brand("PositiveInt");
type PositiveInt = z.infer<typeof PositiveIntSchema>;

// Parse creates branded values with runtime validation
const email = EmailSchema.parse("alice@example.com"); // Email
const count = PositiveIntSchema.parse(42);              // PositiveInt

// This throws at runtime:
// const invalid = EmailSchema.parse("not-an-email");
\`\`\`

**Why it matters:** Branded types prevent an entire class of bugs — passing the wrong ID to a function, using unvalidated strings where validated ones are expected, confusing amounts in different currencies. They encode business rules in the type system.

\`\`\`mermaid
graph LR
    A["number"] --> B["UserId<br/>(branded)"]
    A --> C["ProductId<br/>(branded)"]
    A --> D["OrderId<br/>(branded)"]

    B -->|"Accepted"| E["getUser()"]
    C -->|"Rejected at compile time"| E
    D -->|"Rejected at compile time"| E

    style B fill:#e8f5e9
    style C fill:#ffebee
    style D fill:#ffebee
\`\`\`

> **Role connection:** Backend Developers use branded types for IDs, validated inputs, and monetary amounts. Full-Stack Developers use them with Zod for end-to-end type safety. Security-conscious teams brand sensitive data (PII, tokens) to prevent accidental logging.

---

## 4. Variance (Covariance and Contravariance)

Variance describes how subtype relationships in generic types relate to the subtype relationships of their parameters.

### Understanding Variance

\`\`\`typescript
// Setup: a type hierarchy
class Animal {
    name: string = "";
}
class Dog extends Animal {
    breed: string = "";
}
class GoldenRetriever extends Dog {
    isGolden: true = true;
}

// COVARIANCE (out) — if Dog extends Animal, then Box<Dog> extends Box<Animal>
// Read-only containers are covariant
type ReadonlyBox<T> = { readonly value: T };

const dogBox: ReadonlyBox<Dog> = { value: new Dog() };
const animalBox: ReadonlyBox<Animal> = dogBox; // OK — covariant

// CONTRAVARIANCE (in) — if Dog extends Animal, then Handler<Animal> extends Handler<Dog>
// Function parameters are contravariant
type Handler<T> = (value: T) => void;

const handleAnimal: Handler<Animal> = (a: Animal) => console.log(a.name);
const handleDog: Handler<Dog> = handleAnimal; // OK — contravariant
// A function that handles any Animal can handle a Dog

// INVARIANCE — neither covariant nor contravariant
// Mutable containers are invariant (they are both read and written)
type MutableBox<T> = { value: T };

const mutableDogBox: MutableBox<Dog> = { value: new Dog() };
// const mutableAnimalBox: MutableBox<Animal> = mutableDogBox; // Error with strict mode!
// Because someone could write an Animal (not a Dog) to it
\`\`\`

### Explicit Variance Annotations (TypeScript 4.7+)

\`\`\`typescript
// Use "in" and "out" keywords to declare variance explicitly
// This improves type-checking performance and documents intent

// Covariant — T is only used in output positions
interface Producer<out T> {
    get(): T;
}

// Contravariant — T is only used in input positions
interface Consumer<in T> {
    accept(value: T): void;
}

// Invariant — T is used in both input and output positions
interface Processor<in out T> {
    process(value: T): T;
}

// Bivariant — TypeScript methods are bivariant by default (for compatibility)
// This is why strictFunctionTypes exists
interface EventHandler {
    // Method syntax — bivariant (less safe)
    handleEvent(event: Event): void;
}

interface StrictEventHandler {
    // Property syntax — contravariant (safer)
    handleEvent: (event: Event) => void;
}
\`\`\`

\`\`\`mermaid
graph TD
    subgraph Covariance["Covariance (out)"]
        A1["Dog extends Animal"] --> A2["Producer&lt;Dog&gt; extends Producer&lt;Animal&gt;"]
    end

    subgraph Contravariance["Contravariance (in)"]
        B1["Dog extends Animal"] --> B2["Consumer&lt;Animal&gt; extends Consumer&lt;Dog&gt;"]
    end

    subgraph Invariance["Invariance (in out)"]
        C1["Dog extends Animal"] --> C2["MutableBox&lt;Dog&gt; ≠ MutableBox&lt;Animal&gt;"]
    end

    style Covariance fill:#e8f5e9
    style Contravariance fill:#e3f2fd
    style Invariance fill:#fff3e0
\`\`\`

**Key things to understand:**
- **Covariance**: safe for read-only access. Outputs preserve subtype direction.
- **Contravariance**: safe for write-only access. Inputs reverse subtype direction.
- **Invariance**: required for read-write access. No subtype relationship.
- \`strictFunctionTypes\` enables correct contravariance for function types — always keep it on
- Explicit variance annotations (\`in\`, \`out\`) help the compiler check faster and catch incorrect usage

---

## 5. Monorepo TypeScript Configuration

Large TypeScript projects use project references and composite builds to manage compilation across packages.

### Project References

\`\`\`json
// packages/shared/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`json
// packages/api/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../shared" }
    ],
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`json
// packages/web/tsconfig.json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "jsx": "react-jsx"
    },
    "references": [
        { "path": "../shared" },
        { "path": "../api" }
    ],
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`json
// Root tsconfig.json — orchestrates the build
{
    "files": [],
    "references": [
        { "path": "./packages/shared" },
        { "path": "./packages/api" },
        { "path": "./packages/web" }
    ]
}
\`\`\`

### Build Orchestration

\`\`\`bash
# Build all packages in dependency order
tsc --build

# Build with verbose output to see what gets rebuilt
tsc --build --verbose

# Clean all build outputs
tsc --build --clean

# Force rebuild everything
tsc --build --force

# Watch mode — only rebuilds changed packages
tsc --build --watch
\`\`\`

### Shared Base Configuration

\`\`\`json
// tsconfig.base.json — shared across all packages
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "noImplicitReturns": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "composite": true
    }
}
\`\`\`

\`\`\`json
// packages/api/tsconfig.json — extends the base
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../shared" }
    ],
    "include": ["src/**/*"]
}
\`\`\`

**Why it matters:** Without project references, a monorepo with 20 packages would type-check ALL code on every build. With project references, TypeScript only rebuilds changed packages and their dependents. This can reduce build times from minutes to seconds.

**Common pitfalls:**
- \`composite: true\` requires \`declaration: true\` — the compiler needs .d.ts files for cross-project references
- \`declarationMap: true\` enables "Go to Definition" to jump to source instead of .d.ts files
- Path aliases (\`@shared/...\`) need both tsconfig paths AND a bundler/runtime resolver (tsconfig-paths, Vite config, etc.)
- \`tsc --build\` is different from \`tsc\` — it uses project references, while \`tsc\` alone does not

> **Role connection:** DevOps Engineers configure monorepo build pipelines with project references. Architecture-focused Seniors design the package dependency graph. Full-Stack Developers maintain shared type packages consumed by both frontend and backend.

---

## 6. JavaScript-to-TypeScript Migration Strategies

Migrating a large JavaScript codebase to TypeScript is one of the most impactful things a senior engineer can lead.

### The Incremental Approach

\`\`\`json
// Step 1: Add tsconfig.json with allowJs
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": false,
        "strict": false,
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "noEmit": true
    },
    "include": ["src/**/*"]
}
\`\`\`

\`\`\`typescript
// Step 2: Rename files .js -> .ts one at a time
// Start with leaf modules (no internal imports) and work up

// Step 3: Add JSDoc types to JS files before converting (optional)
/**
 * @param {string} name
 * @param {number} age
 * @returns {{ name: string, age: number, id: string }}
 */
function createUser(name, age) {
    return { name, age, id: crypto.randomUUID() };
}

// Step 4: Convert to TypeScript
interface User {
    name: string;
    age: number;
    id: string;
}

function createUser(name: string, age: number): User {
    return { name, age, id: crypto.randomUUID() };
}
\`\`\`

### Progressive Strict Mode

\`\`\`json
// Phase 1: Minimal TypeScript (just rename files)
{
    "compilerOptions": {
        "strict": false,
        "allowJs": true
    }
}

// Phase 2: Enable individual strict checks one at a time
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true
        // Fix all "implicitly has an 'any' type" errors, then move on
    }
}

// Phase 3: Add strictNullChecks
{
    "compilerOptions": {
        "strict": false,
        "noImplicitAny": true,
        "strictNullChecks": true
        // This is the hardest step — fix all null/undefined errors
    }
}

// Phase 4: Full strict mode
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true
    }
}
\`\`\`

### Migration Automation

\`\`\`typescript
// Use ts-migrate for automated conversion (from Airbnb)
// npx ts-migrate-full <path-to-project>

// Use @ts-expect-error for known issues during migration
function legacyCode(data: any): void {
    // @ts-expect-error — will fix in JIRA-1234
    const result = data.someUntypedMethod();
}

// Track migration progress
// packages/scripts/migration-progress.ts

import * as fs from "fs";
import * as path from "path";

function countFiles(dir: string): { ts: number; js: number } {
    let ts = 0;
    let js = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== "node_modules") {
            const sub = countFiles(path.join(dir, entry.name));
            ts += sub.ts;
            js += sub.js;
        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
            ts++;
        } else if (entry.name.endsWith(".js") || entry.name.endsWith(".jsx")) {
            js++;
        }
    }
    return { ts, js };
}

const result = countFiles("./src");
const total = result.ts + result.js;
const percentage = ((result.ts / total) * 100).toFixed(1);
console.log("TypeScript: " + result.ts + "/" + total + " (" + percentage + "%)");
console.log("JavaScript: " + result.js + "/" + total);
\`\`\`

**Why it matters:** Migration is a multi-month effort that must not block feature development. The incremental approach lets you migrate one file at a time while the rest of the team continues shipping. Progressive strict mode prevents a flood of thousands of errors on day one.

**Common pitfalls:**
- Do NOT try to enable \`strict: true\` on a large codebase all at once — you will get thousands of errors
- \`strictNullChecks\` is the hardest flag to enable — it typically requires the most code changes
- \`@ts-ignore\` suppresses the next line's errors silently — prefer \`@ts-expect-error\` which errors if there is nothing to suppress
- Avoid the temptation to use \`any\` everywhere — it defeats the purpose of the migration

---

## 7. Performance — Type Checking Speed

As TypeScript projects grow, type checking can become a bottleneck. Understanding what makes types slow is critical.

### Measuring Type Check Performance

\`\`\`bash
# Generate a trace of the type checker
tsc --generateTrace ./trace-output

# Analyze the trace with @typescript/analyze-trace
npx @typescript/analyze-trace ./trace-output

# Quick performance measurement
time tsc --noEmit

# Watch for type instantiation count
tsc --noEmit --extendedDiagnostics
# Look for:
#   Types:  xxxxx
#   Instantiations:  xxxxxxx  <-- high numbers indicate complex generics
#   Check time:  x.xxs
\`\`\`

### Common Performance Issues

\`\`\`typescript
// SLOW: Deeply nested conditional types
type DeepCheck<T> =
    T extends string ? "string"
    : T extends number ? "number"
    : T extends boolean ? "boolean"
    : T extends null ? "null"
    : T extends undefined ? "undefined"
    : T extends Array<infer E> ? DeepCheck<E>
    : T extends object ? { [K in keyof T]: DeepCheck<T[K]> }
    : "unknown";

// FAST: Use interface extension instead of complex intersections
// SLOW:
type SlowConfig = BaseConfig & DatabaseConfig & CacheConfig & LogConfig & AuthConfig;

// FAST:
interface FastConfig extends BaseConfig, DatabaseConfig, CacheConfig, LogConfig, AuthConfig {}

// SLOW: Large union types (>25 members) in mapped types
type AllPermissions = "read" | "write" | "delete" | "admin" | /* 50 more */;
type PermissionMap = Record<AllPermissions, boolean>; // Slow to check

// FAST: Use a Record with string keys and validate at runtime
type PermissionMap = Record<string, boolean>;

// isolatedDeclarations (TypeScript 5.5+) — enables parallel declaration emit
// Requires explicit return type annotations on exported functions
// {
//   "compilerOptions": {
//     "isolatedDeclarations": true
//   }
// }

// This is REQUIRED with isolatedDeclarations:
export function createUser(name: string): { id: string; name: string } {
    return { id: crypto.randomUUID(), name };
}

// This would ERROR with isolatedDeclarations (no explicit return type):
// export function createUser(name: string) {
//     return { id: crypto.randomUUID(), name };
// }
\`\`\`

### Performance Best Practices

\`\`\`typescript
// 1. Prefer interfaces over type intersections for object shapes
interface Good {
    a: string;
    b: number;
}

// 2. Use type aliases for unions and computed types
type Status = "active" | "inactive";

// 3. Avoid deeply recursive generic types in hot paths
// If you need deep recursion, add a depth limiter:
type DeepReadonly<T, Depth extends unknown[] = []> =
    Depth["length"] extends 10
        ? T // Stop recursion at depth 10
        : T extends object
            ? { readonly [K in keyof T]: DeepReadonly<T[K], [...Depth, unknown]> }
            : T;

// 4. Use project references to split large projects
// Each package is type-checked independently

// 5. Use skipLibCheck: true in development (always)
// Checking node_modules types is expensive and rarely finds real bugs

// 6. Consider using --incremental for faster rebuilds
// {
//   "compilerOptions": {
//     "incremental": true,
//     "tsBuildInfoFile": "./.tsbuildinfo"
//   }
// }
\`\`\`

**Key things to understand:**
- Interface extends is faster than type intersection (\`&\`) for the compiler
- Large union types (30+ members) in mapped positions can cause exponential type instantiation
- \`--generateTrace\` is your primary diagnostic tool — learn to read the trace output
- \`isolatedDeclarations\` enables parallelized declaration generation, dramatically speeding up builds in large monorepos
- Incremental builds (\`--incremental\`) cache type-checking results between builds

> **Role connection:** Tech Leads monitor type-check times as part of CI performance. Architecture Seniors design type structures that scale. DevOps Engineers configure incremental and parallel builds in CI/CD.

---

## 8. Advanced Patterns

### Builder Pattern with Types

\`\`\`typescript
// A type-safe builder that tracks which fields have been set
interface BuilderState {
    host: boolean;
    port: boolean;
    database: boolean;
}

type ServerConfig = {
    host: string;
    port: number;
    database: string;
    ssl?: boolean;
    maxConnections?: number;
};

class ServerConfigBuilder<State extends BuilderState = { host: false; port: false; database: false }> {
    private config: Partial<ServerConfig> = {};

    host(host: string): ServerConfigBuilder<State & { host: true }> {
        this.config.host = host;
        return this as any;
    }

    port(port: number): ServerConfigBuilder<State & { port: true }> {
        this.config.port = port;
        return this as any;
    }

    database(db: string): ServerConfigBuilder<State & { database: true }> {
        this.config.database = db;
        return this as any;
    }

    ssl(enabled: boolean): this {
        this.config.ssl = enabled;
        return this;
    }

    maxConnections(max: number): this {
        this.config.maxConnections = max;
        return this;
    }

    // build() is ONLY available when all required fields are set
    build(
        this: ServerConfigBuilder<{ host: true; port: true; database: true }>
    ): ServerConfig {
        return this.config as ServerConfig;
    }
}

// Usage:
const config = new ServerConfigBuilder()
    .host("localhost")
    .port(5432)
    .database("mydb")
    .ssl(true)
    .build(); // OK — all required fields are set

// const incomplete = new ServerConfigBuilder()
//     .host("localhost")
//     .build(); // Error: 'build' does not exist (port and database are missing)
\`\`\`

### State Machines with Types

\`\`\`typescript
// Model a state machine where transitions are enforced at compile time
type OrderState = "draft" | "submitted" | "approved" | "shipped" | "delivered" | "cancelled";

// Define valid transitions
type TransitionMap = {
    draft: "submitted" | "cancelled";
    submitted: "approved" | "cancelled";
    approved: "shipped" | "cancelled";
    shipped: "delivered";
    delivered: never;
    cancelled: never;
};

// Order type is parameterized by its current state
interface Order<S extends OrderState> {
    id: string;
    state: S;
    items: string[];
    transition<Next extends TransitionMap[S]>(to: Next): Order<Next>;
}

function createOrder(id: string, items: string[]): Order<"draft"> {
    return {
        id,
        state: "draft",
        items,
        transition<Next extends TransitionMap["draft"]>(to: Next): Order<Next> {
            return { ...this, state: to } as Order<Next>;
        }
    };
}

// Usage — transitions are type-checked
const order = createOrder("ORD-001", ["Widget"]);
const submitted = order.transition("submitted");   // OK
const approved = submitted.transition("approved");  // OK
const shipped = approved.transition("shipped");     // OK
const delivered = shipped.transition("delivered");   // OK

// These would be compile errors:
// order.transition("shipped");     // Error: "shipped" not in "submitted" | "cancelled"
// delivered.transition("draft");   // Error: never — no transitions from "delivered"

// Practical: authentication state machine
type AuthState =
    | { status: "unauthenticated" }
    | { status: "authenticating"; provider: string }
    | { status: "authenticated"; user: { id: string; name: string }; token: string }
    | { status: "error"; message: string; retryable: boolean };

type AuthTransitions = {
    unauthenticated: "authenticating";
    authenticating: "authenticated" | "error";
    authenticated: "unauthenticated";
    error: "authenticating" | "unauthenticated";
};

// The state machine type ensures only valid transitions are possible
function transition<
    Current extends AuthState,
    NextStatus extends AuthTransitions[Current["status"]]
>(
    current: Current,
    nextStatus: NextStatus,
    payload: Extract<AuthState, { status: NextStatus }>
): Extract<AuthState, { status: NextStatus }> {
    return payload;
}
\`\`\`

### Type-Safe Dependency Injection

\`\`\`typescript
// A simple DI container with full type safety
type ServiceMap = {
    logger: { log(message: string): void };
    database: { query(sql: string): Promise<unknown[]> };
    cache: { get(key: string): unknown; set(key: string, value: unknown): void };
    auth: { verify(token: string): Promise<{ userId: string }> };
};

class Container {
    private services = new Map<string, unknown>();

    register<K extends keyof ServiceMap>(key: K, service: ServiceMap[K]): void {
        this.services.set(key, service);
    }

    resolve<K extends keyof ServiceMap>(key: K): ServiceMap[K] {
        const service = this.services.get(key);
        if (!service) {
            throw new Error("Service not registered: " + String(key));
        }
        return service as ServiceMap[K];
    }
}

const container = new Container();

container.register("logger", {
    log(message: string) { console.log(message); }
});

container.register("cache", {
    get(key: string) { return null; },
    set(key: string, value: unknown) { /* ... */ }
});

const logger = container.resolve("logger"); // Typed as { log(message: string): void }
logger.log("Hello");

// container.register("logger", { invalid: true }); // Error — wrong shape
// container.resolve("nonexistent"); // Error — not a valid key
\`\`\`

### Opaque Type Modules

\`\`\`typescript
// Module-level encapsulation with opaque types
// file: money.ts

declare const currencyBrand: unique symbol;

export type Money<Currency extends string = string> = {
    readonly amount: number;
    readonly currency: Currency;
    readonly [currencyBrand]: Currency;
};

export function money<C extends string>(amount: number, currency: C): Money<C> {
    return { amount, currency } as Money<C>;
}

export function add<C extends string>(a: Money<C>, b: Money<C>): Money<C> {
    return money(a.amount + b.amount, a.currency);
}

// This prevents adding different currencies:
const usd = money(100, "USD");
const eur = money(50, "EUR");

const total = add(usd, money(50, "USD")); // OK — same currency
// const invalid = add(usd, eur); // Error: Money<"EUR"> not assignable to Money<"USD">
\`\`\`

**Why it matters:** These advanced patterns encode business rules directly into the type system. A state machine type prevents invalid state transitions. A builder type prevents incomplete construction. Branded money types prevent currency mixing. Bugs that would otherwise require careful runtime checks or code review are caught instantly by the compiler.

---

## 9. Recommended Resources — Senior Level

- **Matt Pocock** — "Type-Level TypeScript" — https://www.youtube.com/watch?v=vGVvJuazs84
- **Matt Pocock** — Total TypeScript workshop — https://www.totaltypescript.com/
- **Jack Herrington** — "Advanced TypeScript Patterns" — https://www.youtube.com/watch?v=dLPgQRbVquo
- **Theo (t3dotgg)** — "TypeScript Performance" — https://www.youtube.com/watch?v=RmGHnYUqQ4k
- **TypeScript Performance wiki** — https://github.com/microsoft/TypeScript/wiki/Performance

---

## Summary — Senior Level

You now have expert-level TypeScript knowledge spanning:
- **Template literal types** — type-safe string manipulation, route parsing, and event naming
- **Type-level programming** — recursive types, tuple manipulation, and type arithmetic
- **Branded/nominal types** — preventing accidental type mixing with compile-time brands
- **Variance** — covariance, contravariance, invariance, and explicit variance annotations
- **Monorepo configuration** — project references, composite builds, and shared base configs
- **Migration strategies** — incremental adoption, progressive strict mode, and automation
- **Performance** — measuring type-check speed, avoiding expensive patterns, isolatedDeclarations
- **Advanced patterns** — type-safe builders, state machines, dependency injection, and opaque types

These are the skills that enable you to design type systems for large-scale applications, guide migration efforts, and build libraries that provide exceptional developer experience through TypeScript's type system.
`
  }
}
