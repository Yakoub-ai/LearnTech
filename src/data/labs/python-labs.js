// Python interactive labs
// Source: interactiveLabs.js (py-lab-1) + languageCodeSandboxExamples.js (py-1 through py-5)

export const labs = [
  // ============================================================
  // PY-LAB-1: Python Fundamentals Workout (from interactiveLabs.js)
  // ============================================================
  {
    id: 'py-lab-1',
    languageId: 'python',
    level: 'beginner',
    title: 'Python Fundamentals Workout',
    description: 'Master Python basics through progressive exercises covering variables, control flow, functions, and data structures.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Variables and String Manipulation',
        instruction: 'Practice Python string methods and f-string formatting. Build a function that formats user profile data.',
        starterCode: `# Python Fundamentals — Variables & Strings

def format_profile(first_name, last_name, age, city):
    """Format a user profile string.

    Rules:
    - Names should be title case
    - If age < 18, add "(minor)" tag
    - Return formatted string: "Name (age) — City"
    """
    # TODO: Implement formatting
    pass

def count_words(text):
    """Count unique words in text (case-insensitive).
    Returns dict of {word: count}.
    """
    # TODO: Implement word counter
    pass

# Test
print(format_profile("  alice  ", "SMITH", 25, "stockholm"))
print(format_profile("bob", "jones", 16, "gothenburg"))
print(count_words("the cat sat on the mat the cat"))`,
        hints: [
          'Use .strip().title() to clean and capitalize names',
          'f-strings: f"{name} ({age}){" (minor)" if age < 18 else ""} — {city}"',
          'For word counting: split(), lower(), and use a dict or Counter'
        ],
        expectedOutput: `Alice Smith (25) — Stockholm
Bob Jones (16) (minor) — Gothenburg
{'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}`,
        solution: `def format_profile(first_name, last_name, age, city):
    name = f"{first_name.strip().title()} {last_name.strip().title()}"
    minor_tag = " (minor)" if age < 18 else ""
    return f"{name} ({age}){minor_tag} — {city.strip().title()}"

def count_words(text):
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

print(format_profile("  alice  ", "SMITH", 25, "stockholm"))
print(format_profile("bob", "jones", 16, "gothenburg"))
print(count_words("the cat sat on the mat the cat"))`
      },
      {
        title: 'Step 2: Lists and Dictionaries',
        instruction: 'Work with Python collections: filter, transform, and aggregate data in lists and dicts.',
        starterCode: `# Python Fundamentals — Collections

students = [
    {"name": "Alice", "grade": 92, "subject": "Math"},
    {"name": "Bob", "grade": 78, "subject": "Science"},
    {"name": "Charlie", "grade": 95, "subject": "Math"},
    {"name": "Diana", "grade": 88, "subject": "Science"},
    {"name": "Eve", "grade": 67, "subject": "Math"},
    {"name": "Frank", "grade": 91, "subject": "Science"},
]

def get_honor_roll(students, threshold=90):
    """Return names of students with grade >= threshold, sorted."""
    # TODO: Filter and sort
    pass

def average_by_subject(students):
    """Return dict of {subject: average_grade}."""
    # TODO: Group by subject and compute averages
    pass

def grade_distribution(students):
    """Return dict of grade bands: A (90+), B (80-89), C (70-79), F (<70)."""
    # TODO: Count students in each band
    pass

print("Honor Roll:", get_honor_roll(students))
print("By Subject:", average_by_subject(students))
print("Distribution:", grade_distribution(students))`,
        hints: [
          'Honor roll: sorted([s["name"] for s in students if s["grade"] >= threshold])',
          'For grouping, use setdefault to build lists per subject',
          'Grade bands: use if/elif to classify each grade'
        ],
        expectedOutput: `Honor Roll: ['Alice', 'Charlie', 'Frank']
By Subject: {'Math': 84.67, 'Science': 85.67}
Distribution: {'A': 3, 'B': 1, 'C': 1, 'F': 1}`,
        solution: `def get_honor_roll(students, threshold=90):
    return sorted([s["name"] for s in students if s["grade"] >= threshold])

def average_by_subject(students):
    groups = {}
    for s in students:
        groups.setdefault(s["subject"], []).append(s["grade"])
    return {subj: round(sum(grades)/len(grades), 2) for subj, grades in groups.items()}

def grade_distribution(students):
    bands = {"A": 0, "B": 0, "C": 0, "F": 0}
    for s in students:
        g = s["grade"]
        if g >= 90: bands["A"] += 1
        elif g >= 80: bands["B"] += 1
        elif g >= 70: bands["C"] += 1
        else: bands["F"] += 1
    return bands

print("Honor Roll:", get_honor_roll(students))
print("By Subject:", average_by_subject(students))
print("Distribution:", grade_distribution(students))`
      },
      {
        title: 'Step 3: Functions and Error Handling',
        instruction: 'Build a mini calculator that handles errors gracefully and supports operation chaining.',
        starterCode: `# Python Fundamentals — Functions & Error Handling

class Calculator:
    def __init__(self):
        self.result = 0
        self.history = []

    def add(self, value):
        """Add value to result. Chain: calc.add(5).add(3)"""
        # TODO: Update result, log to history, return self
        pass

    def subtract(self, value):
        # TODO
        pass

    def multiply(self, value):
        # TODO
        pass

    def divide(self, value):
        """Divide. Raise ValueError if dividing by zero."""
        # TODO: Handle division by zero
        pass

    def reset(self):
        # TODO: Reset result to 0
        pass

    def __repr__(self):
        return f"Calculator(result={self.result})"

# Test chaining
calc = Calculator()
calc.add(10).subtract(3).multiply(2)
print(calc)  # Calculator(result=14)
print("History:", calc.history)

# Test error handling
try:
    calc.divide(0)
except ValueError as e:
    print(f"Error: {e}")`,
        hints: [
          'Return self from each method to enable chaining',
          'History: self.history.append(f"+ {value} = {self.result}")',
          'Division: if value == 0: raise ValueError("Cannot divide by zero")'
        ],
        expectedOutput: `Calculator(result=14)
History: ['+ 10 = 10', '- 3 = 7', '* 2 = 14']
Error: Cannot divide by zero`,
        solution: `class Calculator:
    def __init__(self):
        self.result = 0
        self.history = []

    def _log(self, op, value):
        self.history.append(f"{op} {value} = {self.result}")

    def add(self, value):
        self.result += value
        self._log("+", value)
        return self

    def subtract(self, value):
        self.result -= value
        self._log("-", value)
        return self

    def multiply(self, value):
        self.result *= value
        self._log("*", value)
        return self

    def divide(self, value):
        if value == 0:
            raise ValueError("Cannot divide by zero")
        self.result /= value
        self._log("/", value)
        return self

    def reset(self):
        self.result = 0
        self.history = []
        return self

    def __repr__(self):
        return f"Calculator(result={self.result})"

calc = Calculator()
calc.add(10).subtract(3).multiply(2)
print(calc)
print("History:", calc.history)

try:
    calc.divide(0)
except ValueError as e:
    print(f"Error: {e}")`
      }
    ]
  },

  // ============================================================
  // PY-LAB-2: Data Types & Variables Explorer (from py-1, beginner)
  // ============================================================
  {
    id: 'py-lab-2',
    languageId: 'python',
    level: 'beginner',
    title: 'Data Types & Variables Deep Dive',
    description: 'Explore Python\'s core data types, type conversion, and modern f-string formatting through hands-on exercises. Build intuition for when to use lists, dicts, tuples, and sets.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Python Environment',
        setupReference: true,
        instruction: 'Before writing Python code, ensure your environment is properly configured. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, pip or uv package manager, a virtual environment (venv or conda), and your IDE configured with a Python extension. Complete all setup steps and activate your virtual environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to verify Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\npip 24.x.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Primitives and Type Inspection',
        instruction: 'Python has a rich set of built-in types. WHY this matters: choosing the right type prevents bugs and improves readability. HOW: use type(), isinstance(), and f-strings to inspect and format values. Write a function that takes any value and returns a formatted description of its type and content.',
        starterCode: `# Data Types & Variables — Primitives

def describe_value(value: object) -> str:
    """Return a human-readable description of a value and its type.

    Examples:
        describe_value(42)        -> "42 is an int"
        describe_value(3.14)      -> "3.14 is a float"
        describe_value("hello")   -> "'hello' is a str (length: 5)"
        describe_value(True)      -> "True is a bool"
        describe_value(None)      -> "None (NoneType)"
    """
    # TODO: Use type(value).__name__ and isinstance() to build the description
    # Tip: check bool before int — bool is a subclass of int in Python!
    pass

# Test your function
print(describe_value(42))
print(describe_value(3.14))
print(describe_value("hello"))
print(describe_value(True))
print(describe_value(None))

# BONUS: What does type(True).__name__ return?
# Why does isinstance(True, int) return True?`,
        hints: [
          'Check for bool first: if isinstance(value, bool) — otherwise True would be described as int',
          "For strings, include the length: f\"'{value}' is a str (length: {len(value)})\"",
          'Use type(value).__name__ to get the type name as a string without angle brackets'
        ],
        expectedOutput: `42 is an int
3.14 is a float
'hello' is a str (length: 5)
True is a bool
None (NoneType)`,
        solution: `def describe_value(value: object) -> str:
    if value is None:
        return "None (NoneType)"
    elif isinstance(value, bool):
        return f"{value} is a bool"
    elif isinstance(value, int):
        return f"{value} is an int"
    elif isinstance(value, float):
        return f"{value} is a float"
    elif isinstance(value, str):
        return f"'{value}' is a str (length: {len(value)})"
    else:
        return f"{value!r} is a {type(value).__name__}"

print(describe_value(42))
print(describe_value(3.14))
print(describe_value("hello"))
print(describe_value(True))
print(describe_value(None))`
      },
      {
        title: 'Step 3: Collections — Lists, Dicts, Tuples, Sets',
        instruction: 'WHAT: Python\'s four core collection types each serve different purposes. WHY: lists for ordered sequences, dicts for key-value lookups, tuples for immutable records, sets for unique membership. HOW: build a book catalogue using all four types and perform common operations on each.',
        starterCode: `# Collections — Practical Usage

from typing import TypedDict

class Book(TypedDict):
    title: str
    author: str
    pages: int
    is_available: bool
    genres: list[str]  # ordered, mutable

# Build a catalogue
catalogue: list[Book] = [
    {"title": "Clean Code", "author": "Robert Martin", "pages": 464, "is_available": True, "genres": ["programming", "best-practices"]},
    {"title": "The Pragmatic Programmer", "author": "Hunt & Thomas", "pages": 352, "is_available": False, "genres": ["programming", "career"]},
    {"title": "Fluent Python", "author": "Luciano Ramalho", "pages": 792, "is_available": True, "genres": ["python", "programming"]},
    {"title": "Designing Data-Intensive Applications", "author": "Martin Kleppmann", "pages": 600, "is_available": True, "genres": ["databases", "distributed-systems"]},
]

# TODO 1: Create a dict mapping title -> Book for O(1) lookups
title_index: dict[str, Book] = {}

# TODO 2: Create a set of all unique genres across all books
all_genres: set[str] = set()

# TODO 3: Create a tuple of (title, pages) for the longest book (immutable record)
longest_book: tuple[str, int] = ()

# TODO 4: Filter to available books and sort by pages descending
available_sorted: list[Book] = []

print("Index keys:", list(title_index.keys()))
print("Unique genres:", sorted(all_genres))
print("Longest book:", longest_book)
print("Available (by pages):", [b["title"] for b in available_sorted])`,
        hints: [
          'title_index = {book["title"]: book for book in catalogue}',
          'all_genres = {genre for book in catalogue for genre in book["genres"]}',
          'Use max(catalogue, key=lambda b: b["pages"]) to find the longest book',
          'sorted(..., key=lambda b: b["pages"], reverse=True) for descending sort'
        ],
        expectedOutput: `Index keys: ['Clean Code', 'The Pragmatic Programmer', 'Fluent Python', 'Designing Data-Intensive Applications']
Unique genres: ['best-practices', 'career', 'databases', 'distributed-systems', 'programming', 'python']
Longest book: ('Fluent Python', 792)
Available (by pages): ['Fluent Python', 'Designing Data-Intensive Applications', 'Clean Code']`,
        solution: `from typing import TypedDict

class Book(TypedDict):
    title: str
    author: str
    pages: int
    is_available: bool
    genres: list[str]

catalogue: list[Book] = [
    {"title": "Clean Code", "author": "Robert Martin", "pages": 464, "is_available": True, "genres": ["programming", "best-practices"]},
    {"title": "The Pragmatic Programmer", "author": "Hunt & Thomas", "pages": 352, "is_available": False, "genres": ["programming", "career"]},
    {"title": "Fluent Python", "author": "Luciano Ramalho", "pages": 792, "is_available": True, "genres": ["python", "programming"]},
    {"title": "Designing Data-Intensive Applications", "author": "Martin Kleppmann", "pages": 600, "is_available": True, "genres": ["databases", "distributed-systems"]},
]

title_index = {book["title"]: book for book in catalogue}
all_genres = {genre for book in catalogue for genre in book["genres"]}
longest = max(catalogue, key=lambda b: b["pages"])
longest_book = (longest["title"], longest["pages"])
available_sorted = sorted([b for b in catalogue if b["is_available"]], key=lambda b: b["pages"], reverse=True)

print("Index keys:", list(title_index.keys()))
print("Unique genres:", sorted(all_genres))
print("Longest book:", longest_book)
print("Available (by pages):", [b["title"] for b in available_sorted])`
      },
      {
        title: 'Step 4: Type Conversion and Safe Parsing',
        instruction: 'WHAT: type conversion is inevitable when reading user input, files, or APIs. WHY: unchecked int("abc") raises ValueError — your code must handle bad data gracefully. HOW: write a safe_parse function using try/except and return typed results with a fallback default.',
        starterCode: `# Type Conversion — Safe Parsing

def safe_int(value: object, default: int = 0) -> int:
    """Convert value to int, returning default on failure."""
    # TODO: try int(value), return default on ValueError/TypeError
    pass

def safe_float(value: object, default: float = 0.0) -> float:
    """Convert value to float, returning default on failure."""
    # TODO: try float(value), return default on ValueError/TypeError
    pass

def parse_record(raw: dict[str, str]) -> dict[str, object]:
    """Convert a raw string dict (e.g., from CSV) to typed values.

    Input:  {"name": "Alice", "age": "29", "score": "94.5", "active": "true"}
    Output: {"name": "Alice", "age": 29, "score": 94.5, "active": True}
    """
    # TODO: Convert age to int, score to float, active to bool
    # active is True if raw value is "true" (case-insensitive)
    pass

# Tests
print(safe_int("42"))          # 42
print(safe_int("abc"))         # 0
print(safe_int(None, -1))      # -1
print(safe_float("3.14"))      # 3.14
print(safe_float("bad", 1.0))  # 1.0

record = parse_record({"name": "Alice", "age": "29", "score": "94.5", "active": "true"})
print(record)
print(type(record["age"]), type(record["score"]), type(record["active"]))`,
        hints: [
          'Wrap int(value) in try/except (ValueError, TypeError) to handle both bad strings and None',
          'bool("true".lower() == "true") converts the string — note: bool("false") is True!',
          'Chain all three conversions in parse_record using your safe_int and safe_float helpers'
        ],
        expectedOutput: `42
0
-1
3.14
1.0
{'name': 'Alice', 'age': 29, 'score': 94.5, 'active': True}
<class 'int'> <class 'float'> <class 'bool'>`,
        solution: `def safe_int(value: object, default: int = 0) -> int:
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

def safe_float(value: object, default: float = 0.0) -> float:
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def parse_record(raw: dict[str, str]) -> dict[str, object]:
    return {
        "name": raw.get("name", ""),
        "age": safe_int(raw.get("age")),
        "score": safe_float(raw.get("score")),
        "active": raw.get("active", "").lower() == "true",
    }

print(safe_int("42"))
print(safe_int("abc"))
print(safe_int(None, -1))
print(safe_float("3.14"))
print(safe_float("bad", 1.0))

record = parse_record({"name": "Alice", "age": "29", "score": "94.5", "active": "true"})
print(record)
print(type(record["age"]), type(record["score"]), type(record["active"]))`
      },
      {
        title: 'Step 5: Putting It All Together — Data Pipeline',
        instruction: 'WHAT: combine type inspection, collections, and safe parsing into a small data pipeline. WHY: real Python scripts constantly transform raw data through typed structures. HOW: process a list of raw CSV-like records into a typed summary report, using all the patterns from this lab.',
        starterCode: `# Data Pipeline — End-to-End

def process_students(raw_records: list[dict[str, str]]) -> dict[str, object]:
    """Process raw student records into a typed summary.

    Returns:
        {
            "total": int,
            "passing": int,           # score >= 60
            "average_score": float,
            "top_student": str,       # name of highest scorer
            "grade_counts": dict,     # {"A": n, "B": n, "C": n, "F": n}
        }
    """
    # TODO: Parse each record, compute stats, return summary
    pass

raw_data = [
    {"name": "Alice", "score": "92", "active": "true"},
    {"name": "Bob", "score": "74", "active": "true"},
    {"name": "Charlie", "score": "55", "active": "false"},
    {"name": "Diana", "score": "88", "active": "true"},
    {"name": "Eve", "score": "61", "active": "true"},
    {"name": "Frank", "score": "bad_data", "active": "true"},  # handle gracefully
]

result = process_students(raw_data)
for key, value in result.items():
    print(f"{key}: {value}")`,
        hints: [
          'Parse scores with safe_float(record["score"], default=0.0) to handle "bad_data"',
          'Grade bands: A=90+, B=80-89, C=60-79, F<60',
          'top_student = max(parsed, key=lambda r: r["score"])["name"]'
        ],
        expectedOutput: `total: 6
passing: 5
average_score: 61.67
top_student: Alice
grade_counts: {'A': 1, 'B': 2, 'C': 2, 'F': 1}`,
        solution: `def safe_float(value: object, default: float = 0.0) -> float:
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def process_students(raw_records: list[dict[str, str]]) -> dict[str, object]:
    parsed = [
        {"name": r["name"], "score": safe_float(r.get("score"), 0.0)}
        for r in raw_records
    ]
    scores = [p["score"] for p in parsed]
    total = len(parsed)
    passing = sum(1 for s in scores if s >= 60)
    average_score = round(sum(scores) / total, 2) if total else 0.0
    top_student = max(parsed, key=lambda r: r["score"])["name"]

    grade_counts: dict[str, int] = {"A": 0, "B": 0, "C": 0, "F": 0}
    for s in scores:
        if s >= 90: grade_counts["A"] += 1
        elif s >= 80: grade_counts["B"] += 1
        elif s >= 60: grade_counts["C"] += 1
        else: grade_counts["F"] += 1

    return {
        "total": total,
        "passing": passing,
        "average_score": average_score,
        "top_student": top_student,
        "grade_counts": grade_counts,
    }

raw_data = [
    {"name": "Alice", "score": "92", "active": "true"},
    {"name": "Bob", "score": "74", "active": "true"},
    {"name": "Charlie", "score": "55", "active": "false"},
    {"name": "Diana", "score": "88", "active": "true"},
    {"name": "Eve", "score": "61", "active": "true"},
    {"name": "Frank", "score": "bad_data", "active": "true"},
]

result = process_students(raw_data)
for key, value in result.items():
    print(f"{key}: {value}")`
      }
    ]
  },

  // ============================================================
  // PY-LAB-3: List Comprehension Patterns (from py-2, beginner)
  // ============================================================
  {
    id: 'py-lab-3',
    languageId: 'python',
    level: 'beginner',
    title: 'List Comprehension Mastery',
    description: 'Replace verbose loops with Pythonic list, dict, and set comprehensions. Learn filtering, transformation, and nested patterns that make your code more readable and faster.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Python Environment',
        setupReference: true,
        instruction: 'Before writing Python code, ensure your environment is properly configured. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, pip or uv package manager, a virtual environment (venv or conda), and your IDE configured with a Python extension. Complete all setup steps and activate your virtual environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to verify Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\npip 24.x.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Basic List and Dict Comprehensions',
        instruction: 'WHAT: comprehensions are one-liners that replace for-loops for building collections. WHY: they are more readable, faster (CPython optimises them), and idiomatic Python. HOW: convert a set of explicit loops to comprehensions without changing their output.',
        starterCode: `# Comprehensions — Rewrite these loops

# LOOP 1: squares of 1–10
squares_loop = []
for x in range(1, 11):
    squares_loop.append(x ** 2)

# TODO: rewrite as a list comprehension
squares: list[int] = []
print("Squares:", squares)

# LOOP 2: even numbers 0–19
evens_loop = []
for x in range(20):
    if x % 2 == 0:
        evens_loop.append(x)

# TODO: rewrite with a condition inside the comprehension
evens: list[int] = []
print("Evens:", evens)

# LOOP 3: word -> length mapping
words = ["hello", "world", "hi", "python", "go"]
lengths_loop = {}
for w in words:
    lengths_loop[w] = len(w)

# TODO: rewrite as a dict comprehension
word_lengths: dict[str, int] = {}
print("Lengths:", word_lengths)

# LOOP 4: first letters (unique)
first_loop = set()
for w in words:
    first_loop.add(w[0])

# TODO: rewrite as a set comprehension
first_letters: set[str] = set()
print("First letters:", sorted(first_letters))`,
        hints: [
          'List comprehension syntax: [expression for item in iterable if condition]',
          'Dict comprehension: {key_expr: value_expr for item in iterable}',
          'Set comprehension uses curly braces like dict but without a colon: {expr for item in iterable}'
        ],
        expectedOutput: `Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Evens: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
Lengths: {'hello': 5, 'world': 5, 'hi': 2, 'python': 6, 'go': 2}
First letters: ['g', 'h', 'p', 'w']`,
        solution: `words = ["hello", "world", "hi", "python", "go"]

squares = [x ** 2 for x in range(1, 11)]
print("Squares:", squares)

evens = [x for x in range(20) if x % 2 == 0]
print("Evens:", evens)

word_lengths = {w: len(w) for w in words}
print("Lengths:", word_lengths)

first_letters = {w[0] for w in words}
print("First letters:", sorted(first_letters))`
      },
      {
        title: 'Step 3: Filtering and Transformation Together',
        instruction: 'WHAT: comprehensions can filter AND transform in a single expression. WHY: combining filter + map into one comprehension avoids two passes over the data. HOW: work with a list of user records to produce several derived views in one line each.',
        starterCode: `# Filter + Transform Comprehensions

users = [
    {"name": "alice", "age": 28, "role": "engineer", "score": 91},
    {"name": "bob", "age": 35, "role": "designer", "score": 74},
    {"name": "charlie", "age": 22, "role": "engineer", "score": 88},
    {"name": "diana", "age": 31, "role": "manager", "score": 95},
    {"name": "eve", "age": 26, "role": "engineer", "score": 62},
]

# TODO 1: Names (title-cased) of engineers with score > 80
top_engineers: list[str] = []
print("Top engineers:", top_engineers)

# TODO 2: Dict of name -> score for users aged 25–32 (inclusive)
mid_age_scores: dict[str, int] = {}
print("Mid-age scores:", mid_age_scores)

# TODO 3: Ternary label per user — "senior" if score >= 85 else "junior"
# Output: list of "Name: senior/junior" strings (title-cased names)
labels: list[str] = []
print("Labels:", labels)

# TODO 4: Celsius temps [-10, 0, 5, 20, 35] -> Fahrenheit, keep only those >= 32F
celsius = [-10, 0, 5, 20, 35]
warm_f: list[float] = []
print("Warm Fahrenheit:", warm_f)`,
        hints: [
          'Combine filter and transform: [u["name"].title() for u in users if u["role"] == "engineer" and u["score"] > 80]',
          'Ternary in comprehension: f\'{u["name"].title()}: {"senior" if u["score"] >= 85 else "junior"}\' for u in users',
          'Celsius to Fahrenheit: (c * 9/5) + 32 — filter with if ((c * 9/5) + 32) >= 32'
        ],
        expectedOutput: `Top engineers: ['Alice', 'Charlie']
Mid-age scores: {'alice': 91, 'bob': 74, 'eve': 62}
Labels: ['Alice: senior', 'Bob: junior', 'Charlie: senior', 'Diana: senior', 'Eve: junior']
Warm Fahrenheit: [32.0, 41.0, 68.0, 95.0]`,
        solution: `users = [
    {"name": "alice", "age": 28, "role": "engineer", "score": 91},
    {"name": "bob", "age": 35, "role": "designer", "score": 74},
    {"name": "charlie", "age": 22, "role": "engineer", "score": 88},
    {"name": "diana", "age": 31, "role": "manager", "score": 95},
    {"name": "eve", "age": 26, "role": "engineer", "score": 62},
]

top_engineers = [u["name"].title() for u in users if u["role"] == "engineer" and u["score"] > 80]
print("Top engineers:", top_engineers)

mid_age_scores = {u["name"]: u["score"] for u in users if 25 <= u["age"] <= 32}
print("Mid-age scores:", mid_age_scores)

labels = [f'{u["name"].title()}: {"senior" if u["score"] >= 85 else "junior"}' for u in users]
print("Labels:", labels)

celsius = [-10, 0, 5, 20, 35]
warm_f = [(c * 9/5) + 32 for c in celsius if (c * 9/5) + 32 >= 32]
print("Warm Fahrenheit:", warm_f)`
      },
      {
        title: 'Step 4: Nested Comprehensions and Matrix Operations',
        instruction: 'WHAT: comprehensions can be nested to process 2D data structures like matrices. WHY: flattening, transposing, and filtering nested data is a common operation in data processing. HOW: implement matrix flatten, transpose, and element-wise filtering using nested comprehensions.',
        starterCode: `# Nested Comprehensions — Matrix Operations

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

# TODO 1: Flatten the matrix to a single list [1, 2, 3, 4, ..., 9]
flat: list[int] = []
print("Flat:", flat)

# TODO 2: Transpose — rows become columns
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
transposed: list[list[int]] = []
print("Transposed:", transposed)

# TODO 3: Keep only odd numbers from the matrix (flattened)
odds: list[int] = []
print("Odds:", odds)

# TODO 4: Create a multiplication table (1-5) as a dict
# {(row, col): row * col} for row in 1..5, col in 1..5
times_table: dict[tuple[int, int], int] = {}
print("3x4 =", times_table.get((3, 4)))
print("5x5 =", times_table.get((5, 5)))`,
        hints: [
          'Flatten: [num for row in matrix for num in row] — outer loop first, inner loop second',
          'Transpose: [[matrix[row][col] for row in range(len(matrix))] for col in range(len(matrix[0]))]',
          'Multiplication table: {(r, c): r * c for r in range(1, 6) for c in range(1, 6)}'
        ],
        expectedOutput: `Flat: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Transposed: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
Odds: [1, 3, 5, 7, 9]
3x4 = 12
5x5 = 25`,
        solution: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

flat = [num for row in matrix for num in row]
print("Flat:", flat)

transposed = [[matrix[row][col] for row in range(len(matrix))] for col in range(len(matrix[0]))]
print("Transposed:", transposed)

odds = [num for row in matrix for num in row if num % 2 != 0]
print("Odds:", odds)

times_table = {(r, c): r * c for r in range(1, 6) for c in range(1, 6)}
print("3x4 =", times_table.get((3, 4)))
print("5x5 =", times_table.get((5, 5)))`
      },
      {
        title: 'Step 5: Generator Expressions for Memory Efficiency',
        instruction: 'WHAT: generator expressions look like list comprehensions but use parentheses and produce values lazily. WHY: for large datasets, a generator uses O(1) memory vs O(n) for a list. HOW: refactor a pipeline that processes 10,000 records to use generators, then measure the difference with sys.getsizeof().',
        starterCode: `# Generators — Memory-Efficient Comprehensions

import sys

# Simulate 10,000 raw score records
raw_scores = [str(i % 100) for i in range(10_000)]

# List approach (builds everything in memory)
scores_list = [int(s) for s in raw_scores if int(s) >= 60]
print(f"List size: {sys.getsizeof(scores_list):,} bytes")
print(f"List passing count: {len(scores_list)}")

# TODO: Rewrite as a generator expression (parentheses instead of brackets)
scores_gen = None  # replace None with generator expression

# Generators don't support len() — consume with sum() and count manually
passing_count = 0
total_score = 0
# TODO: Iterate over scores_gen to count passing scores and sum them
# (you can only iterate a generator once!)

print(f"Generator passing count: {passing_count}")
print(f"Generator average: {total_score / passing_count:.2f}" if passing_count else "No scores")

# BONUS: Use any() with a generator to check if any score is exactly 99
# This short-circuits — stops as soon as one match is found
has_99 = any(int(s) == 99 for s in raw_scores)
print(f"Has score 99: {has_99}")`,
        hints: [
          'Generator expression: (int(s) for s in raw_scores if int(s) >= 60) — parentheses, not brackets',
          'Consume a generator with a for loop: for score in scores_gen: passing_count += 1; total_score += score',
          'any() and all() accept generator expressions and short-circuit — they never materialise the full list'
        ],
        expectedOutput: `List size: 87,624 bytes
List passing count: 4,000
Generator passing count: 4000
Generator average: 79.50
Has score 99: True`,
        solution: `import sys

raw_scores = [str(i % 100) for i in range(10_000)]

scores_list = [int(s) for s in raw_scores if int(s) >= 60]
print(f"List size: {sys.getsizeof(scores_list):,} bytes")
print(f"List passing count: {len(scores_list)}")

scores_gen = (int(s) for s in raw_scores if int(s) >= 60)

passing_count = 0
total_score = 0
for score in scores_gen:
    passing_count += 1
    total_score += score

print(f"Generator passing count: {passing_count}")
print(f"Generator average: {total_score / passing_count:.2f}" if passing_count else "No scores")

has_99 = any(int(s) == 99 for s in raw_scores)
print(f"Has score 99: {has_99}")`
      }
    ]
  },

  // ============================================================
  // PY-LAB-4: Decorator Factory Pattern (from py-3, mid)
  // ============================================================
  {
    id: 'py-lab-4',
    languageId: 'python',
    level: 'mid',
    title: 'Decorator Factory Pattern',
    description: 'Build production-grade Python decorators: from simple wrappers to parameterised factories with retry logic, type validation, and result caching. Master functools.wraps for metadata preservation.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Python Environment',
        setupReference: true,
        instruction: 'Before writing Python code, ensure your environment is properly configured. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, pip or uv package manager, a virtual environment (venv or conda), and your IDE configured with a Python extension. Complete all setup steps and activate your virtual environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to verify Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\npip 24.x.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Simple Decorator with functools.wraps',
        instruction: 'WHAT: a decorator wraps a function to add behaviour before or after it runs. WHY: without functools.wraps, the wrapper replaces __name__ and __doc__ — breaking introspection and tooling. HOW: build a timing decorator that preserves the wrapped function\'s metadata and returns its result unchanged.',
        starterCode: `# Decorators — Timing with Metadata Preservation

import functools
import time
from typing import Callable, TypeVar, ParamSpec

P = ParamSpec("P")
T = TypeVar("T")

def timer(func: Callable[P, T]) -> Callable[P, T]:
    """Decorator: prints how long func took to run."""
    # TODO: Use @functools.wraps(func) on the wrapper
    # TODO: Record start time, call func, record end time, print elapsed
    # TODO: Return the original result
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        pass
    return wrapper

@timer
def slow_sum(n: int) -> int:
    """Sum integers from 0 to n-1."""
    time.sleep(0.05)
    return sum(range(n))

result = slow_sum(1000)
print(f"Result: {result}")

# Verify metadata is preserved (functools.wraps is required for this)
print(f"Function name: {slow_sum.__name__}")
print(f"Docstring: {slow_sum.__doc__}")`,
        hints: [
          'Add @functools.wraps(func) immediately above def wrapper(...) — this copies __name__, __doc__, etc.',
          'start = time.perf_counter() before calling func, elapsed = time.perf_counter() - start after',
          'Return the result of func(*args, **kwargs) so the caller gets the original return value'
        ],
        expectedOutput: `slow_sum took 0.0502s
Result: 499500
Function name: slow_sum
Docstring: Sum integers from 0 to n-1.`,
        solution: `import functools
import time
from typing import Callable, TypeVar, ParamSpec

P = ParamSpec("P")
T = TypeVar("T")

def timer(func: Callable[P, T]) -> Callable[P, T]:
    """Decorator: prints how long func took to run."""
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n: int) -> int:
    """Sum integers from 0 to n-1."""
    time.sleep(0.05)
    return sum(range(n))

result = slow_sum(1000)
print(f"Result: {result}")
print(f"Function name: {slow_sum.__name__}")
print(f"Docstring: {slow_sum.__doc__}")`
      },
      {
        title: 'Step 3: Decorator Factory with retry Logic',
        instruction: 'WHAT: a decorator factory is a function that takes configuration parameters and returns a decorator. WHY: hard-coded behaviour limits reuse — factories let callers tune retry counts, delays, and exception types. HOW: implement @retry(max_attempts=3, delay=0.1) that catches specified exceptions and re-runs the function.',
        starterCode: `# Decorator Factory — Parameterised Retry

import functools
import time
from typing import Callable, TypeVar, ParamSpec, Type

P = ParamSpec("P")
T = TypeVar("T")

def retry(
    max_attempts: int = 3,
    delay: float = 0.1,
    exceptions: tuple[Type[Exception], ...] = (Exception,),
) -> Callable[[Callable[P, T]], Callable[P, T]]:
    """Decorator factory: retry func up to max_attempts times on failure.

    Usage:
        @retry(max_attempts=3, delay=0.05, exceptions=(ConnectionError,))
        def fetch_data(): ...
    """
    # TODO: Return a decorator that wraps func
    # TODO: On each attempt, call func — if it raises one of 'exceptions',
    #       print "Attempt N failed: <error>. Retrying..." and sleep(delay)
    # TODO: On the final attempt, re-raise the exception
    def decorator(func: Callable[P, T]) -> Callable[P, T]:
        pass
    return decorator

# Test: simulate a flaky function
import random
random.seed(42)
attempt_count = 0

@retry(max_attempts=4, delay=0.01, exceptions=(ValueError,))
def flaky_parse(data: str) -> int:
    global attempt_count
    attempt_count += 1
    if random.random() < 0.6:
        raise ValueError(f"Parse failed for: {data!r}")
    return int(data)

try:
    value = flaky_parse("42")
    print(f"Parsed: {value} (took {attempt_count} attempt(s))")
except ValueError:
    print(f"All attempts exhausted after {attempt_count} tries")`,
        hints: [
          'Three levels of nesting: retry() returns decorator, decorator wraps func into wrapper, wrapper has the retry loop',
          'Use for attempt in range(1, max_attempts + 1): try: return func(...) except exceptions as e: if attempt == max_attempts: raise',
          'Don\'t forget @functools.wraps(func) on the wrapper function'
        ],
        expectedOutput: `Attempt 1 failed: Parse failed for: '42'. Retrying...
Attempt 2 failed: Parse failed for: '42'. Retrying...
Parsed: 42 (took 3 attempt(s))`,
        solution: `import functools
import time
import random
from typing import Callable, TypeVar, ParamSpec, Type

P = ParamSpec("P")
T = TypeVar("T")

def retry(
    max_attempts: int = 3,
    delay: float = 0.1,
    exceptions: tuple[Type[Exception], ...] = (Exception,),
) -> Callable[[Callable[P, T]], Callable[P, T]]:
    def decorator(func: Callable[P, T]) -> Callable[P, T]:
        @functools.wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

random.seed(42)
attempt_count = 0

@retry(max_attempts=4, delay=0.01, exceptions=(ValueError,))
def flaky_parse(data: str) -> int:
    global attempt_count
    attempt_count += 1
    if random.random() < 0.6:
        raise ValueError(f"Parse failed for: {data!r}")
    return int(data)

try:
    value = flaky_parse("42")
    print(f"Parsed: {value} (took {attempt_count} attempt(s))")
except ValueError:
    print(f"All attempts exhausted after {attempt_count} tries")`
      },
      {
        title: 'Step 4: Memoisation Cache Decorator',
        instruction: 'WHAT: memoisation stores function results so repeated calls with the same arguments return immediately. WHY: recursive algorithms like Fibonacci are exponential without caching — memoisation makes them linear. HOW: implement @cache_result(max_size=128) that stores results in an OrderedDict and evicts the oldest entry when full.',
        starterCode: `# Memoisation — LRU Cache Decorator Factory

import functools
from collections import OrderedDict
from typing import Callable, TypeVar, ParamSpec, Any

P = ParamSpec("P")
T = TypeVar("T")

def cache_result(max_size: int = 128) -> Callable[[Callable[P, T]], Callable[P, T]]:
    """Decorator factory: memoize function results up to max_size entries.

    Uses an OrderedDict as an LRU cache — evicts the oldest entry when full.
    Adds a .cache_info() method to the wrapper that returns hit/miss counts.
    """
    # TODO: Create an OrderedDict cache, hit/miss counters
    # TODO: On each call, build a hashable cache key from args + sorted(kwargs.items())
    # TODO: If key in cache, move_to_end() and return cached value (hit)
    # TODO: Otherwise compute, store (popitem(last=False) if over limit), return (miss)
    # TODO: Attach .cache_info() method returning {"hits": n, "misses": n, "size": n}
    def decorator(func: Callable[P, T]) -> Callable[P, T]:
        pass
    return decorator

# Test with Fibonacci — O(2^n) without cache, O(n) with
call_count = 0

@cache_result(max_size=50)
def fib(n: int) -> int:
    global call_count
    call_count += 1
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

result = fib(30)
print(f"fib(30) = {result}")
print(f"Actual calls to fib body: {call_count}")
info = fib.cache_info()
print(f"Cache hits: {info['hits']}, misses: {info['misses']}, size: {info['size']}")`,
        hints: [
          'Cache key: key = (args, tuple(sorted(kwargs.items()))) — must be hashable',
          'LRU eviction: if len(cache) >= max_size: cache.popitem(last=False)  # removes oldest',
          'Attach method after definition: wrapper.cache_info = lambda: {"hits": hits, ...}'
        ],
        expectedOutput: `fib(30) = 832040
Actual calls to fib body: 31
Cache hits: 28, misses: 31, size: 31`,
        solution: `import functools
from collections import OrderedDict
from typing import Callable, TypeVar, ParamSpec, Any

P = ParamSpec("P")
T = TypeVar("T")

def cache_result(max_size: int = 128) -> Callable[[Callable[P, T]], Callable[P, T]]:
    def decorator(func: Callable[P, T]) -> Callable[P, T]:
        cache: OrderedDict[Any, T] = OrderedDict()
        hits = 0
        misses = 0

        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> T:
            nonlocal hits, misses
            key = (args, tuple(sorted(kwargs.items())))
            if key in cache:
                cache.move_to_end(key)
                hits += 1
                return cache[key]
            result = func(*args, **kwargs)
            cache[key] = result
            cache.move_to_end(key)
            if len(cache) > max_size:
                cache.popitem(last=False)
            misses += 1
            return result

        wrapper.cache_info = lambda: {"hits": hits, "misses": misses, "size": len(cache)}
        return wrapper
    return decorator

call_count = 0

@cache_result(max_size=50)
def fib(n: int) -> int:
    global call_count
    call_count += 1
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

result = fib(30)
print(f"fib(30) = {result}")
print(f"Actual calls to fib body: {call_count}")
info = fib.cache_info()
print(f"Cache hits: {info['hits']}, misses: {info['misses']}, size: {info['size']}")`
      },
      {
        title: 'Step 5: Stacking Decorators',
        instruction: 'WHAT: multiple decorators can be stacked on a single function — they apply bottom-up. WHY: composing small, focused decorators (timing + retry + cache) is cleaner than one monolithic wrapper. HOW: apply all three decorators you built to a mock API call and verify they interact correctly.',
        starterCode: `# Stacking Decorators — Composition

import functools, time, random
from collections import OrderedDict

# Paste or import your timer, retry, cache_result decorators here
# (abbreviated versions are provided below for the exercise)

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"  [{func.__name__}] took {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

def retry(max_attempts=3, delay=0.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Retry {attempt}: {e}")
            return None
        return wrapper
    return decorator

def cache_result(max_size=128):
    def decorator(func):
        cache = {}
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            key = args
            if key not in cache:
                cache[key] = func(*args, **kwargs)
            return cache[key]
        return wrapper
    return decorator

# TODO: Stack all three decorators on fetch_user_data
# Order matters — think about which should be outermost
# Hint: cache should be outermost (avoids retrying cached hits)
#       retry in the middle (retries the actual network call)
#       timer innermost (measures only the real call time)

random.seed(0)

def fetch_user_data(user_id: int) -> dict:
    """Simulate a flaky API call."""
    time.sleep(0.02)
    if random.random() < 0.5:
        raise ConnectionError("Timeout")
    return {"id": user_id, "name": f"User {user_id}"}

# Call twice with the same id — second call should be instant (cached)
print("Call 1:")
data = fetch_user_data(42)
print(f"  Got: {data}")

print("Call 2 (should be cached):")
data = fetch_user_data(42)
print(f"  Got: {data}")`,
        hints: [
          'Stack decorators bottom-up: @cache_result() on top, @retry() in the middle, @timer at the bottom',
          'The decorator closest to the function def executes first (innermost wrapper)',
          'A cached result skips @retry and @timer entirely — the second call returns instantly'
        ],
        expectedOutput: `Call 1:
  Retry 1: Timeout
  [fetch_user_data] took 0.0401s
  Got: {'id': 42, 'name': 'User 42'}
Call 2 (should be cached):
  Got: {'id': 42, 'name': 'User 42'}`,
        solution: `import functools, time, random
from collections import OrderedDict

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"  [{func.__name__}] took {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

def retry(max_attempts=3, delay=0.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Retry {attempt}: {e}")
            return None
        return wrapper
    return decorator

def cache_result(max_size=128):
    def decorator(func):
        cache = {}
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            key = args
            if key not in cache:
                cache[key] = func(*args, **kwargs)
            return cache[key]
        return wrapper
    return decorator

random.seed(0)

@cache_result()
@retry(max_attempts=3, delay=0.0)
@timer
def fetch_user_data(user_id: int) -> dict:
    """Simulate a flaky API call."""
    time.sleep(0.02)
    if random.random() < 0.5:
        raise ConnectionError("Timeout")
    return {"id": user_id, "name": f"User {user_id}"}

print("Call 1:")
data = fetch_user_data(42)
print(f"  Got: {data}")

print("Call 2 (should be cached):")
data = fetch_user_data(42)
print(f"  Got: {data}")`
      }
    ]
  },

  // ============================================================
  // PY-LAB-5: Context Manager for Resources (from py-4, mid)
  // ============================================================
  {
    id: 'py-lab-5',
    languageId: 'python',
    level: 'mid',
    title: 'Context Managers for Resource Management',
    description: 'Build Pythonic context managers using both the class-based __enter__/__exit__ protocol and the @contextmanager generator shortcut. Handle exceptions, measure performance, and manage files safely.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Python Environment',
        setupReference: true,
        instruction: 'Before writing Python code, ensure your environment is properly configured. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, pip or uv package manager, a virtual environment (venv or conda), and your IDE configured with a Python extension. Complete all setup steps and activate your virtual environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to verify Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\npip 24.x.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Class-Based Context Manager',
        instruction: 'WHAT: the context manager protocol requires __enter__ (setup, returns the resource) and __exit__ (teardown, receives exception info). WHY: it guarantees cleanup even if an exception occurs — no finally blocks scattered around caller code. HOW: build a Timer class context manager that measures elapsed time and records it for programmatic access.',
        starterCode: `# Context Managers — Class-Based Protocol

import time

class Timer:
    """Measure elapsed time for a block of code.

    Usage:
        with Timer("my operation") as t:
            do_work()
        print(f"Elapsed: {t.elapsed:.4f}s")
    """

    def __init__(self, label: str = "Operation") -> None:
        self.label = label
        self.elapsed: float = 0.0
        self._start: float = 0.0

    def __enter__(self) -> "Timer":
        # TODO: Record start time and return self
        pass

    def __exit__(
        self,
        exc_type: type | None,
        exc_val: Exception | None,
        exc_tb: object | None,
    ) -> bool:
        # TODO: Record elapsed time, print label + elapsed
        # TODO: Return False (do not suppress exceptions)
        pass

# Test
with Timer("list comprehension") as t:
    result = [x**2 for x in range(100_000)]

print(f"Captured elapsed: {t.elapsed:.4f}s")
print(f"Sum: {sum(result)}")

# Verify exceptions are NOT suppressed
try:
    with Timer("failing block"):
        raise ValueError("Something went wrong")
except ValueError as e:
    print(f"Exception correctly propagated: {e}")`,
        hints: [
          '__enter__ should set self._start = time.perf_counter() and return self',
          '__exit__ receives (exc_type, exc_val, exc_tb) — these are None if no exception occurred',
          'Return False (or None) from __exit__ to let exceptions propagate; return True to suppress them'
        ],
        expectedOutput: `list comprehension: 0.0123s
Captured elapsed: 0.0123s
Sum: 333328333350000
failing block: 0.0000s
Exception correctly propagated: Something went wrong`,
        solution: `import time

class Timer:
    def __init__(self, label: str = "Operation") -> None:
        self.label = label
        self.elapsed: float = 0.0
        self._start: float = 0.0

    def __enter__(self) -> "Timer":
        self._start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        self.elapsed = time.perf_counter() - self._start
        print(f"{self.label}: {self.elapsed:.4f}s")
        return False

with Timer("list comprehension") as t:
    result = [x**2 for x in range(100_000)]

print(f"Captured elapsed: {t.elapsed:.4f}s")
print(f"Sum: {sum(result)}")

try:
    with Timer("failing block"):
        raise ValueError("Something went wrong")
except ValueError as e:
    print(f"Exception correctly propagated: {e}")`
      },
      {
        title: 'Step 3: Generator-Based Context Manager',
        instruction: 'WHAT: @contextmanager lets you write a context manager as a generator with a single yield — everything before yield is __enter__, everything after (in finally) is __exit__. WHY: far less boilerplate than a class for simple cases. HOW: implement temp_config that temporarily overrides a config dict and restores it on exit, even if an exception is raised.',
        starterCode: `# Context Managers — @contextmanager Generator

from contextlib import contextmanager
from typing import Generator

# Simulated global config
_config: dict[str, object] = {
    "debug": False,
    "log_level": "INFO",
    "max_retries": 3,
}

@contextmanager
def temp_config(overrides: dict[str, object]) -> Generator[dict[str, object], None, None]:
    """Temporarily override config keys, restore originals on exit.

    Usage:
        with temp_config({"debug": True}) as cfg:
            print(cfg["debug"])  # True
        print(_config["debug"])  # False (restored)
    """
    # TODO: Save the original values for any key in overrides
    # TODO: Apply overrides to _config
    # TODO: yield _config (the modified config)
    # TODO: In a finally block, restore original values
    pass

# Test normal usage
print("Before:", dict(_config))

with temp_config({"debug": True, "log_level": "DEBUG"}) as cfg:
    print("Inside:", cfg["debug"], cfg["log_level"])

print("After:", dict(_config))

# Test that restoration happens even after an exception
try:
    with temp_config({"max_retries": 99}):
        print("Retries inside:", _config["max_retries"])
        raise RuntimeError("Oops")
except RuntimeError:
    pass

print("Retries restored:", _config["max_retries"])`,
        hints: [
          'Save originals before applying: originals = {k: _config[k] for k in overrides if k in _config}',
          'Apply overrides: _config.update(overrides)',
          'Use try/finally around yield: finally: _config.update(originals) — this runs even if an exception occurs'
        ],
        expectedOutput: `Before: {'debug': False, 'log_level': 'INFO', 'max_retries': 3}
Inside: True DEBUG
After: {'debug': False, 'log_level': 'INFO', 'max_retries': 3}
Retries inside: 99
Retries restored: 3`,
        solution: `from contextlib import contextmanager
from typing import Generator

_config: dict[str, object] = {
    "debug": False,
    "log_level": "INFO",
    "max_retries": 3,
}

@contextmanager
def temp_config(overrides: dict[str, object]) -> Generator[dict[str, object], None, None]:
    originals = {k: _config[k] for k in overrides if k in _config}
    _config.update(overrides)
    try:
        yield _config
    finally:
        _config.update(originals)

print("Before:", dict(_config))

with temp_config({"debug": True, "log_level": "DEBUG"}) as cfg:
    print("Inside:", cfg["debug"], cfg["log_level"])

print("After:", dict(_config))

try:
    with temp_config({"max_retries": 99}):
        print("Retries inside:", _config["max_retries"])
        raise RuntimeError("Oops")
except RuntimeError:
    pass

print("Retries restored:", _config["max_retries"])`
      },
      {
        title: 'Step 4: Database Transaction Context Manager',
        instruction: 'WHAT: database operations must be atomic — either all succeed (COMMIT) or all fail (ROLLBACK). WHY: without a transaction guard, a crash mid-operation leaves the database in an inconsistent state. HOW: implement a database_transaction context manager that prints BEGIN/COMMIT on success and ROLLBACK on exception, then use it in a mock save pipeline.',
        starterCode: `# Context Managers — Transaction Guard

from contextlib import contextmanager
from typing import Generator

# Simulated in-memory "database"
_db: dict[str, object] = {}
_transaction_log: list[str] = []

@contextmanager
def database_transaction(label: str = "transaction") -> Generator[dict[str, object], None, None]:
    """Simulate a database transaction.

    - Prints "BEGIN <label>"
    - Yields a staging dict for writes
    - On success: merges staging into _db, prints "COMMIT <label>"
    - On exception: discards staging dict, prints "ROLLBACK <label>"
    """
    # TODO: Print BEGIN, create a staging dict, yield it
    # TODO: On success (no exception): merge staging into _db, log, print COMMIT
    # TODO: On exception: print ROLLBACK, re-raise
    pass

# Test: successful transaction
with database_transaction("create_user") as staging:
    staging["user:1"] = {"name": "Alice", "email": "alice@example.com"}
    staging["user:1:settings"] = {"theme": "dark"}

print("DB after success:", _db)
print("Log:", _transaction_log)

# Test: failed transaction (DB should not be modified)
print()
try:
    with database_transaction("bad_insert") as staging:
        staging["user:2"] = {"name": "Bob"}
        raise ValueError("Validation failed")
except ValueError:
    pass

print("DB after failure:", _db)  # user:2 should NOT be in DB`,
        hints: [
          'Use try/except/else: yield staging in the try block; the else block runs only if no exception was raised',
          'Alternatively use a committed flag: set it to True before the yield exits normally, check in finally',
          'Re-raise in the except block: except Exception: print(f"ROLLBACK {label}"); raise'
        ],
        expectedOutput: `BEGIN create_user
COMMIT create_user
DB after success: {'user:1': {'name': 'Alice', 'email': 'alice@example.com'}, 'user:1:settings': {'theme': 'dark'}}
Log: ['COMMIT create_user']

BEGIN bad_insert
ROLLBACK bad_insert
DB after failure: {'user:1': {'name': 'Alice', 'email': 'alice@example.com'}, 'user:1:settings': {'theme': 'dark'}}`,
        solution: `from contextlib import contextmanager
from typing import Generator

_db: dict[str, object] = {}
_transaction_log: list[str] = []

@contextmanager
def database_transaction(label: str = "transaction") -> Generator[dict[str, object], None, None]:
    print(f"BEGIN {label}")
    staging: dict[str, object] = {}
    try:
        yield staging
    except Exception:
        print(f"ROLLBACK {label}")
        raise
    else:
        _db.update(staging)
        _transaction_log.append(f"COMMIT {label}")
        print(f"COMMIT {label}")

with database_transaction("create_user") as staging:
    staging["user:1"] = {"name": "Alice", "email": "alice@example.com"}
    staging["user:1:settings"] = {"theme": "dark"}

print("DB after success:", _db)
print("Log:", _transaction_log)
print()

try:
    with database_transaction("bad_insert") as staging:
        staging["user:2"] = {"name": "Bob"}
        raise ValueError("Validation failed")
except ValueError:
    pass

print("DB after failure:", _db)`
      },
      {
        title: 'Step 5: Composing Context Managers',
        instruction: 'WHAT: Python 3.10+ supports nested with statements on one line. WHY: managing multiple resources (file + timer + config) is common and nesting with statements is cleaner than indenting three levels deep. HOW: build a JSON file handler context manager and combine it with Timer and temp_config in a single with statement.',
        starterCode: `# Composing Context Managers

import json
import os
import time
from contextlib import contextmanager
from typing import Generator

@contextmanager
def json_file(path: str, default: dict | None = None) -> Generator[dict, None, None]:
    """Load JSON on enter, auto-save on exit.

    - If file exists: load it
    - Yield the dict for modification
    - Always save back to path on exit (even after exceptions)
    """
    # TODO: Load or initialise data
    # TODO: yield data
    # TODO: In finally: write data back to path with json.dump(..., indent=2)
    pass

# Timer context manager (simplified)
from contextlib import contextmanager

@contextmanager
def timed(label: str):
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"[{label}] {elapsed:.4f}s")

# TODO: Use both context managers together in a single 'with' statement
# 1. Open "users.json" with json_file (default={})
# 2. Time the operation with timed("save users")
# Add two users inside, verify the file was written

TEST_PATH = "/tmp/users_lab.json"

# Clean up previous run
if os.path.exists(TEST_PATH):
    os.remove(TEST_PATH)

with timed("save users"), json_file(TEST_PATH, default={}) as data:
    data["user:1"] = {"name": "Alice"}
    data["user:2"] = {"name": "Bob"}

# Verify file was written
with open(TEST_PATH) as f:
    saved = json.load(f)
print("Saved:", saved)
os.remove(TEST_PATH)`,
        hints: [
          'In json_file: data = json.load(f) if os.path.exists(path) else (default or {})',
          'Use try/finally in json_file so the file is always saved: finally: with open(path, "w") as f: json.dump(data, f, indent=2)',
          'Combine with: with timed("label"), json_file(path) as data: — comma-separated managers share one with'
        ],
        expectedOutput: `[save users] 0.0003s
Saved: {'user:1': {'name': 'Alice'}, 'user:2': {'name': 'Bob'}}`,
        solution: `import json
import os
import time
from contextlib import contextmanager

@contextmanager
def json_file(path: str, default: dict | None = None):
    if os.path.exists(path):
        with open(path) as f:
            data = json.load(f)
    else:
        data = default if default is not None else {}
    try:
        yield data
    finally:
        with open(path, "w") as f:
            json.dump(data, f, indent=2)

@contextmanager
def timed(label: str):
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"[{label}] {elapsed:.4f}s")

TEST_PATH = "/tmp/users_lab.json"
if os.path.exists(TEST_PATH):
    os.remove(TEST_PATH)

with timed("save users"), json_file(TEST_PATH, default={}) as data:
    data["user:1"] = {"name": "Alice"}
    data["user:2"] = {"name": "Bob"}

with open(TEST_PATH) as f:
    saved = json.load(f)
print("Saved:", saved)
os.remove(TEST_PATH)`
      }
    ]
  },

  // ============================================================
  // PY-LAB-6: Async Producer-Consumer Pattern (from py-5, senior)
  // ============================================================
  {
    id: 'py-lab-6',
    languageId: 'python',
    level: 'senior',
    title: 'Async Producer-Consumer with asyncio',
    description: 'Implement concurrent Python programs using asyncio: async/await syntax, asyncio.Queue for back-pressure, TaskGroup for structured concurrency, and graceful shutdown patterns.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Python Environment',
        setupReference: true,
        instruction: 'Before writing Python code, ensure your environment is properly configured. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, pip or uv package manager, a virtual environment (venv or conda), and your IDE configured with a Python extension. Complete all setup steps and activate your virtual environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to verify Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\npip 24.x.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Async/Await Fundamentals',
        instruction: 'WHAT: asyncio enables concurrent I/O-bound work in a single thread using cooperative multitasking. WHY: threads have OS overhead and GIL contention; async coroutines are lightweight and ideal for network or file I/O. HOW: convert a sequential fetch loop into concurrent tasks with asyncio.gather() and observe the speedup.',
        starterCode: `# asyncio Fundamentals — Sequential vs Concurrent

import asyncio
import time

# Simulated async I/O (e.g., HTTP request)
async def fetch(url: str, delay: float) -> dict[str, object]:
    """Simulate fetching a URL with a network delay."""
    await asyncio.sleep(delay)
    return {"url": url, "status": 200, "delay": delay}

# Sequential — each fetch waits for the previous one
async def fetch_sequential(urls: list[tuple[str, float]]) -> list[dict]:
    results = []
    for url, delay in urls:
        result = await fetch(url, delay)
        results.append(result)
    return results

# TODO: Implement fetch_concurrent using asyncio.gather()
# All fetches should run concurrently — total time ≈ max(delays)
async def fetch_concurrent(urls: list[tuple[str, float]]) -> list[dict]:
    # TODO: Create a coroutine for each (url, delay) pair
    # TODO: Run them all concurrently with asyncio.gather()
    pass

async def main() -> None:
    urls = [
        ("https://api.example.com/users", 0.1),
        ("https://api.example.com/posts", 0.15),
        ("https://api.example.com/comments", 0.05),
    ]

    start = time.perf_counter()
    seq_results = await fetch_sequential(urls)
    seq_time = time.perf_counter() - start
    print(f"Sequential: {seq_time:.3f}s ({len(seq_results)} results)")

    start = time.perf_counter()
    con_results = await fetch_concurrent(urls)
    con_time = time.perf_counter() - start
    print(f"Concurrent: {con_time:.3f}s ({len(con_results)} results)")
    print(f"Speedup: {seq_time / con_time:.1f}x")

asyncio.run(main())`,
        hints: [
          'asyncio.gather(*coroutines) runs coroutines concurrently and returns a list of results in order',
          'Create coroutines with a list comprehension: coros = [fetch(url, d) for url, d in urls]',
          'Sequential total time ≈ sum of delays; concurrent total time ≈ max of delays'
        ],
        expectedOutput: `Sequential: 0.301s (3 results)
Concurrent: 0.151s (3 results)
Speedup: 2.0x`,
        solution: `import asyncio
import time

async def fetch(url: str, delay: float) -> dict[str, object]:
    await asyncio.sleep(delay)
    return {"url": url, "status": 200, "delay": delay}

async def fetch_sequential(urls: list[tuple[str, float]]) -> list[dict]:
    results = []
    for url, delay in urls:
        result = await fetch(url, delay)
        results.append(result)
    return results

async def fetch_concurrent(urls: list[tuple[str, float]]) -> list[dict]:
    coros = [fetch(url, delay) for url, delay in urls]
    return list(await asyncio.gather(*coros))

async def main() -> None:
    urls = [
        ("https://api.example.com/users", 0.1),
        ("https://api.example.com/posts", 0.15),
        ("https://api.example.com/comments", 0.05),
    ]

    start = time.perf_counter()
    seq_results = await fetch_sequential(urls)
    seq_time = time.perf_counter() - start
    print(f"Sequential: {seq_time:.3f}s ({len(seq_results)} results)")

    start = time.perf_counter()
    con_results = await fetch_concurrent(urls)
    con_time = time.perf_counter() - start
    print(f"Concurrent: {con_time:.3f}s ({len(con_results)} results)")
    print(f"Speedup: {seq_time / con_time:.1f}x")

asyncio.run(main())`
      },
      {
        title: 'Step 3: Producer-Consumer with asyncio.Queue',
        instruction: 'WHAT: asyncio.Queue decouples producers (data generators) from consumers (data processors) and provides back-pressure via maxsize. WHY: without a queue, a fast producer overwhelms a slow consumer; maxsize blocks the producer until the consumer catches up. HOW: implement a two-producer, three-consumer pipeline that processes work items and reports total throughput.',
        starterCode: `# Producer-Consumer with asyncio.Queue

import asyncio
import random

async def producer(
    queue: asyncio.Queue[str],
    producer_id: int,
    num_items: int,
) -> None:
    """Generate num_items work items and put them in the queue."""
    for i in range(num_items):
        item = f"item-{producer_id}-{i}"
        await asyncio.sleep(random.uniform(0.01, 0.04))
        await queue.put(item)
        print(f"  Producer {producer_id}: queued {item}")
    print(f"  Producer {producer_id}: finished")

async def consumer(
    queue: asyncio.Queue[str],
    consumer_id: int,
) -> int:
    """Process items from the queue until it times out (no new items).

    Returns the count of items processed.
    """
    # TODO: Loop forever, waiting up to 0.2s for the next item
    # TODO: If asyncio.TimeoutError: break (queue is drained)
    # TODO: After getting an item: simulate processing with asyncio.sleep(0.02)
    # TODO: Call queue.task_done() after processing each item
    # TODO: Return the total count of processed items
    processed = 0
    while True:
        try:
            item = await asyncio.wait_for(queue.get(), timeout=0.2)
            # TODO: process item
            pass
        except asyncio.TimeoutError:
            break
    print(f"  Consumer {consumer_id}: processed {processed} items")
    return processed

async def main() -> None:
    queue: asyncio.Queue[str] = asyncio.Queue(maxsize=5)

    # TODO: Create 2 producer tasks (3 items each) and 3 consumer tasks
    # TODO: Wait for all producers to finish with asyncio.gather()
    # TODO: Wait for the queue to drain with await queue.join()
    # TODO: Gather consumer results and print total items processed
    pass

asyncio.run(main())`,
        hints: [
          'await asyncio.sleep(0.02) inside the consumer simulates processing time',
          'queue.task_done() must be called after each item is fully processed (pairs with queue.join())',
          'Create tasks with asyncio.create_task(producer(...)) in a list, then await asyncio.gather(*producer_tasks)'
        ],
        expectedOutput: `  Producer 0: queued item-0-0
  Producer 1: queued item-1-0
  Consumer 0: processed item-0-0
  ...
  Total items processed: 6`,
        solution: `import asyncio
import random

async def producer(queue: asyncio.Queue[str], producer_id: int, num_items: int) -> None:
    for i in range(num_items):
        item = f"item-{producer_id}-{i}"
        await asyncio.sleep(random.uniform(0.01, 0.04))
        await queue.put(item)
        print(f"  Producer {producer_id}: queued {item}")
    print(f"  Producer {producer_id}: finished")

async def consumer(queue: asyncio.Queue[str], consumer_id: int) -> int:
    processed = 0
    while True:
        try:
            item = await asyncio.wait_for(queue.get(), timeout=0.2)
            await asyncio.sleep(0.02)
            print(f"  Consumer {consumer_id}: processed {item}")
            queue.task_done()
            processed += 1
        except asyncio.TimeoutError:
            break
    print(f"  Consumer {consumer_id}: processed {processed} items")
    return processed

async def main() -> None:
    random.seed(42)
    queue: asyncio.Queue[str] = asyncio.Queue(maxsize=5)

    producer_tasks = [asyncio.create_task(producer(queue, i, 3)) for i in range(2)]
    consumer_tasks = [asyncio.create_task(consumer(queue, i)) for i in range(3)]

    await asyncio.gather(*producer_tasks)
    await queue.join()

    results = await asyncio.gather(*consumer_tasks)
    print(f"\nTotal items processed: {sum(results)}")

asyncio.run(main())`
      },
      {
        title: 'Step 4: Error Handling and Graceful Shutdown',
        instruction: 'WHAT: production async systems must handle task failures without crashing the entire pipeline, and shut down cleanly when signalled. WHY: asyncio.gather() propagates the first exception by default — return_exceptions=True lets you inspect individual failures. HOW: build a resilient batch processor that isolates failures per task and reports a summary.',
        starterCode: `# Graceful Error Handling in asyncio

import asyncio
import random
from dataclasses import dataclass, field

@dataclass
class BatchResult:
    succeeded: list[str] = field(default_factory=list)
    failed: list[tuple[str, str]] = field(default_factory=list)

    @property
    def success_rate(self) -> float:
        total = len(self.succeeded) + len(self.failed)
        return len(self.succeeded) / total if total else 0.0

async def process_item(item: str, failure_rate: float = 0.3) -> str:
    """Simulate processing — fails with probability failure_rate."""
    await asyncio.sleep(0.01)
    if random.random() < failure_rate:
        raise ValueError(f"Processing failed for {item!r}")
    return f"processed:{item}"

async def batch_process(items: list[str], failure_rate: float = 0.3) -> BatchResult:
    """Process all items concurrently, isolating failures.

    Uses asyncio.gather(return_exceptions=True) so one failure
    does not cancel other tasks.
    """
    # TODO: Create coroutines for all items
    # TODO: Run with asyncio.gather(return_exceptions=True)
    # TODO: Separate results from exceptions into BatchResult
    result = BatchResult()
    # ...
    return result

async def main() -> None:
    random.seed(7)
    items = [f"record-{i}" for i in range(10)]

    result = await batch_process(items, failure_rate=0.3)
    print(f"Succeeded: {len(result.succeeded)}")
    print(f"Failed:    {len(result.failed)}")
    print(f"Success rate: {result.success_rate:.0%}")
    if result.failed:
        print("Failures:")
        for item, reason in result.failed:
            print(f"  {item}: {reason}")

asyncio.run(main())`,
        hints: [
          'asyncio.gather(*coros, return_exceptions=True) returns a list where exceptions are values, not raised',
          'Iterate with zip(items, outcomes) to pair each item with its result or exception',
          'Check: if isinstance(outcome, Exception): result.failed.append((item, str(outcome))) else: result.succeeded.append(outcome)'
        ],
        expectedOutput: `Succeeded: 7
Failed:    3
Success rate: 70%
Failures:
  record-2: Processing failed for 'record-2'
  record-5: Processing failed for 'record-5'
  record-8: Processing failed for 'record-8'`,
        solution: `import asyncio
import random
from dataclasses import dataclass, field

@dataclass
class BatchResult:
    succeeded: list[str] = field(default_factory=list)
    failed: list[tuple[str, str]] = field(default_factory=list)

    @property
    def success_rate(self) -> float:
        total = len(self.succeeded) + len(self.failed)
        return len(self.succeeded) / total if total else 0.0

async def process_item(item: str, failure_rate: float = 0.3) -> str:
    await asyncio.sleep(0.01)
    if random.random() < failure_rate:
        raise ValueError(f"Processing failed for {item!r}")
    return f"processed:{item}"

async def batch_process(items: list[str], failure_rate: float = 0.3) -> BatchResult:
    coros = [process_item(item, failure_rate) for item in items]
    outcomes = await asyncio.gather(*coros, return_exceptions=True)
    result = BatchResult()
    for item, outcome in zip(items, outcomes):
        if isinstance(outcome, Exception):
            result.failed.append((item, str(outcome)))
        else:
            result.succeeded.append(outcome)
    return result

async def main() -> None:
    random.seed(7)
    items = [f"record-{i}" for i in range(10)]
    result = await batch_process(items, failure_rate=0.3)
    print(f"Succeeded: {len(result.succeeded)}")
    print(f"Failed:    {len(result.failed)}")
    print(f"Success rate: {result.success_rate:.0%}")
    if result.failed:
        print("Failures:")
        for item, reason in result.failed:
            print(f"  {item}: {reason}")

asyncio.run(main())`
      },
      {
        title: 'Step 5: Priority Queue and Structured Concurrency',
        instruction: 'WHAT: asyncio.PriorityQueue orders items by a numeric priority (lowest number = highest priority). Python 3.11+ TaskGroup provides structured concurrency — all tasks in the group are cancelled if one fails. HOW: extend the producer-consumer pipeline to use a priority queue so urgent items are processed first, and use TaskGroup for cleaner task management.',
        starterCode: `# Priority Queue + TaskGroup (Python 3.11+)

import asyncio
import random
from dataclasses import dataclass, field

@dataclass(order=True)
class PriorityItem:
    priority: int           # Lower = higher priority (0 = urgent)
    item: str = field(compare=False)

async def priority_producer(
    queue: asyncio.PriorityQueue[PriorityItem],
    producer_id: int,
    num_items: int,
) -> None:
    """Produce items with random priorities 0 (urgent) to 2 (low)."""
    for i in range(num_items):
        priority = random.randint(0, 2)
        work = PriorityItem(priority=priority, item=f"p{producer_id}-item{i}")
        await asyncio.sleep(0.01)
        await queue.put(work)
        label = ["URGENT", "NORMAL", "LOW"][priority]
        print(f"  Produced [{label}] {work.item}")

async def priority_consumer(
    queue: asyncio.PriorityQueue[PriorityItem],
    consumer_id: int,
    results: list[str],
) -> None:
    """Process items; append to results in processing order."""
    # TODO: get items with timeout, process, track order
    while True:
        try:
            work = await asyncio.wait_for(queue.get(), timeout=0.3)
            await asyncio.sleep(0.02)
            label = ["URGENT", "NORMAL", "LOW"][work.priority]
            print(f"  Consumer {consumer_id}: [{label}] {work.item}")
            results.append(work.item)
            queue.task_done()
        except asyncio.TimeoutError:
            break

async def main() -> None:
    random.seed(5)
    queue: asyncio.PriorityQueue[PriorityItem] = asyncio.PriorityQueue(maxsize=10)
    results: list[str] = []

    # TODO: Use async with asyncio.TaskGroup() as tg: to launch producers and consumers
    # tg.create_task(priority_producer(...)) — 2 producers, 4 items each
    # tg.create_task(priority_consumer(...)) — 3 consumers sharing the results list
    # TaskGroup automatically waits for all tasks to complete

    print(f"\nProcessed {len(results)} items total")
    print("First 3 processed:", results[:3])

asyncio.run(main())`,
        hints: [
          'async with asyncio.TaskGroup() as tg: creates a group; tg.create_task(coro) adds tasks',
          'PriorityQueue dequeues the smallest PriorityItem first — @dataclass(order=True) enables comparison by priority field',
          'All tasks in a TaskGroup are awaited automatically when the with block exits'
        ],
        expectedOutput: `  Produced [URGENT] p0-item0
  Produced [NORMAL] p1-item0
  Consumer 0: [URGENT] p0-item0
  ...
Processed 8 items total
First 3 processed: ['p0-item0', ...]`,
        solution: `import asyncio
import random
from dataclasses import dataclass, field

@dataclass(order=True)
class PriorityItem:
    priority: int
    item: str = field(compare=False)

async def priority_producer(queue: asyncio.PriorityQueue, producer_id: int, num_items: int) -> None:
    for i in range(num_items):
        priority = random.randint(0, 2)
        work = PriorityItem(priority=priority, item=f"p{producer_id}-item{i}")
        await asyncio.sleep(0.01)
        await queue.put(work)
        label = ["URGENT", "NORMAL", "LOW"][priority]
        print(f"  Produced [{label}] {work.item}")

async def priority_consumer(queue: asyncio.PriorityQueue, consumer_id: int, results: list[str]) -> None:
    while True:
        try:
            work = await asyncio.wait_for(queue.get(), timeout=0.3)
            await asyncio.sleep(0.02)
            label = ["URGENT", "NORMAL", "LOW"][work.priority]
            print(f"  Consumer {consumer_id}: [{label}] {work.item}")
            results.append(work.item)
            queue.task_done()
        except asyncio.TimeoutError:
            break

async def main() -> None:
    random.seed(5)
    queue: asyncio.PriorityQueue = asyncio.PriorityQueue(maxsize=10)
    results: list[str] = []

    async with asyncio.TaskGroup() as tg:
        for i in range(2):
            tg.create_task(priority_producer(queue, i, 4))
        for i in range(3):
            tg.create_task(priority_consumer(queue, i, results))

    print(f"\nProcessed {len(results)} items total")
    print("First 3 processed:", results[:3])

asyncio.run(main())`
      }
    ]
  }
]
