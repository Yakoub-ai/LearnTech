# Python — Senior Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/python/senior)

## Topics Covered

- Async/Await and asyncio (TaskGroup, semaphores, async generators)
- Metaclasses, Descriptors, and `__init_subclass__`
- Memory Management and Garbage Collection (`__slots__`, weak references, tracemalloc)
- Profiling and Benchmarking (cProfile, line_profiler, timeit)
- Packaging and Distribution (pyproject.toml, build, uv)
- Design Patterns in Python (Singleton, Factory, Observer, Strategy)
- Concurrency (threading, multiprocessing, concurrent.futures)
- The GIL and PEP 703 (free-threaded Python)
- Modern Python 3.12-3.13 features (exception groups, tomllib, StrEnum, PEP 695)

## Prerequisites

- Completion of the Python Mid guide or equivalent knowledge
- Strong understanding of OOP, decorators, generators, and type hints
- Experience building and testing Python applications
- Familiarity with async/await concepts

## Estimated Time

60 hours

---

## 1. Async/Await and asyncio

Asynchronous programming enables concurrent I/O-bound code without threads. When a coroutine hits `await`, it suspends and returns control to the event loop, which can run other coroutines. This is cooperative multitasking.

### Core Pattern

```python
import asyncio

async def fetch_data(url: str, delay: float) -> dict:
    print(f"Fetching {url}...")
    await asyncio.sleep(delay)  # Non-blocking
    return {"url": url, "status": 200}

async def main():
    # Run concurrently — total time is max(delays), not sum
    results = await asyncio.gather(
        fetch_data("/users", 1.0),
        fetch_data("/posts", 1.5),
        fetch_data("/comments", 0.8),
    )
    return results

asyncio.run(main())
```

### TaskGroup (Python 3.11+ — Structured Concurrency)

```python
async def fetch_with_task_group():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_data("/a", 1.0))
        task2 = tg.create_task(fetch_data("/b", 0.5))
    # All tasks guaranteed complete here
    # If any task raises, remaining are cancelled
    return [task1.result(), task2.result()]
```

### Rate Limiting with Semaphore

```python
async def rate_limited_fetch(urls, max_concurrent=3):
    sem = asyncio.Semaphore(max_concurrent)

    async def fetch_one(url):
        async with sem:
            return await fetch_data(url, 0.5)

    return await asyncio.gather(*(fetch_one(u) for u in urls))
```

### Timeouts (Python 3.11+)

```python
async with asyncio.timeout(2.0):
    result = await fetch_data("/slow", 5.0)
# Raises TimeoutError if not done in 2 seconds
```

### Async Generators

```python
async def paginated_fetch(total_pages: int):
    for page in range(1, total_pages + 1):
        await asyncio.sleep(0.3)
        yield [{"id": i, "page": page} for i in range(10)]

async for page_items in paginated_fetch(3):
    process(page_items)
```

### Async Context Managers

Implement `__aenter__` and `__aexit__` (both `async def`) for use with `async with`.

### When to Use asyncio vs threading vs multiprocessing

| Use Case                  | Best Choice        |
|---------------------------|--------------------|
| I/O-bound, async libs     | `asyncio`          |
| I/O-bound, sync libs      | `threading`        |
| CPU-bound                 | `multiprocessing`  |
| Mix of I/O and CPU        | `asyncio` + `ProcessPoolExecutor` |

### Practice Exercises

1. Build an async web scraper with semaphore-limited concurrency.
2. Implement async producer-consumer using `asyncio.Queue`.
3. Write an async retry decorator for async functions.
4. Create an async context manager for a file-based lock.

---

## 2. Metaclasses and Descriptors

Metaclasses are "classes of classes" — they control how classes themselves are created. The default metaclass is `type`.

### Creating Classes Dynamically

```python
# These are equivalent:
class MyClass:
    x = 10

MyClass = type("MyClass", (), {"x": 10})
```

### Custom Metaclass

```python
class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace, **kwargs):
        cls = super().__new__(mcs, name, bases, namespace)
        # Enforce that all public methods have docstrings
        for attr_name, attr_value in namespace.items():
            if callable(attr_value) and not attr_name.startswith("_"):
                if not attr_value.__doc__:
                    raise TypeError(f"{name}.{attr_name}() needs a docstring")
        return cls
```

### `__init_subclass__` (Lightweight Alternative)

For most use cases, `__init_subclass__` is simpler than a full metaclass:

```python
class Plugin:
    _registry: dict[str, type] = {}

    def __init_subclass__(cls, plugin_name="", **kwargs):
        super().__init_subclass__(**kwargs)
        name = plugin_name or cls.__name__.lower()
        Plugin._registry[name] = cls

class JSONPlugin(Plugin, plugin_name="json"):
    ...

print(Plugin._registry)  # {"json": JSONPlugin}
```

### Descriptors

Descriptors control attribute access via `__get__`, `__set__`, and `__delete__`:

```python
class Validated:
    def __init__(self, validator, error_msg="Invalid"):
        self.validator = validator
        self.error_msg = error_msg

    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.private_name, None) if obj else self

    def __set__(self, obj, value):
        if not self.validator(value):
            raise ValueError(f"{self.name}: {self.error_msg}")
        setattr(obj, self.private_name, value)

class Product:
    name = Validated(lambda v: isinstance(v, str) and len(v) > 0, "non-empty string required")
    price = Validated(lambda v: isinstance(v, (int, float)) and v > 0, "positive number required")
```

### When to Use Each

| Tool                  | Use Case                                    |
|-----------------------|---------------------------------------------|
| `__init_subclass__`   | Registration, simple validation             |
| Descriptors           | Attribute-level validation, computed attrs   |
| Full metaclass        | Framework-level class manipulation           |

### Practice Exercises

1. Create a metaclass enforcing all attributes are type-annotated.
2. Build a command registry CLI using `__init_subclass__`.
3. Implement a descriptor that logs all attribute access.
4. Build a simple ORM where field definitions become table columns.

---

## 3. Memory Management

Python uses **reference counting** as its primary mechanism, supplemented by a **cyclic garbage collector** for reference cycles.

### Reference Counting

Every object tracks how many references point to it. When the count reaches zero, memory is freed immediately.

```python
import sys
a = [1, 2, 3]
print(sys.getrefcount(a))  # 2 (a + getrefcount's temp ref)
b = a
print(sys.getrefcount(a))  # 3
del b
print(sys.getrefcount(a))  # 2
```

### `__slots__`: Memory Optimization

```python
class SlottedPoint:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

# ~50-70% less memory per instance than a regular class
# Trade-off: cannot add arbitrary attributes
```

### Weak References

A weak reference does not keep an object alive:

```python
import weakref

class Resource:
    pass

r = Resource()
weak = weakref.ref(r)
print(weak() is not None)  # True

del r
print(weak() is not None)  # False — object was collected
```

Use `WeakValueDictionary` for caches that should not prevent garbage collection.

### The Garbage Collector

The cyclic GC handles reference cycles (A references B, B references A):

```python
import gc
gc.collect()              # Force collection
gc.get_threshold()        # (700, 10, 10) — generation thresholds
gc.get_count()            # Objects in each generation
```

### tracemalloc: Memory Profiling

```python
import tracemalloc
tracemalloc.start()
data = [i ** 2 for i in range(100_000)]
current, peak = tracemalloc.get_traced_memory()
print(f"Current: {current / 1024:.1f} KB, Peak: {peak / 1024:.1f} KB")
tracemalloc.stop()
```

### Integer and String Interning

- Integers -5 to 256 are cached (same object identity)
- Short strings without special characters may be interned
- Always use `==` for value comparison, `is` only for `None`, `True`, `False`

### Practice Exercises

1. Benchmark `__slots__` vs regular class with 1 million instances.
2. Implement a WeakSet-based observer pattern.
3. Use tracemalloc to find the top 10 memory-consuming lines.
4. Create a reference cycle and verify `gc.collect()` handles it.

---

## 4. Profiling and Optimization

**The workflow**: Write correct code first, measure with profiling tools, identify the bottleneck, optimize that specific part, measure again.

### cProfile: Function-Level Profiling

```bash
python -m cProfile -s cumulative your_script.py
```

```python
import cProfile
import pstats

profiler = cProfile.Profile()
profiler.enable()
result = your_function()
profiler.disable()
stats = pstats.Stats(profiler)
stats.sort_stats("cumulative").print_stats(10)
```

### timeit: Micro-Benchmarks

```python
import timeit
time = timeit.timeit("sum(range(1000))", number=10000)
```

### Key Optimization Patterns

1. **Use built-in functions** (implemented in C): `sum()`, `min()`, `max()`, `sorted()`
2. **Avoid repeated attribute lookups in loops**: `append = results.append`
3. **String joining**: `"".join(parts)` instead of `result += s` in a loop
4. **Use `collections.Counter`** instead of manual counting
5. **Dict-based dispatch** instead of long if/elif chains
6. **`@functools.lru_cache`** for memoization
7. **Generator expressions** instead of list comprehensions when you only need to iterate

### line_profiler and memory_profiler

```bash
pip install line-profiler memory-profiler
kernprof -l -v your_script.py        # Line-level timing
python -m memory_profiler your_script.py  # Line-level memory
```

### Practice Exercises

1. Profile a data processing script and identify the top 3 bottlenecks.
2. Rewrite a slow function using optimization patterns and measure improvement.
3. Compare list vs deque for append/pop operations with timeit.
4. Use tracemalloc to compare memory usage of different data structures.

---

## 5. Packaging and Distribution

### pyproject.toml (The Modern Standard)

```toml
[build-system]
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-library"
version = "1.0.0"
requires-python = ">=3.12"
dependencies = ["requests>=2.28.0", "pydantic>=2.0"]

[project.optional-dependencies]
dev = ["pytest>=7.0", "mypy>=1.0", "ruff>=0.1.0"]

[project.scripts]
my-cli = "my_library.cli:main"

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.mypy]
python_version = "3.12"
strict = true

[tool.ruff]
target-version = "py312"
line-length = 88
```

### Project Structure

```
my-library/
    pyproject.toml
    README.md
    LICENSE
    src/
        my_library/
            __init__.py
            core.py
            cli.py
            py.typed          # PEP 561 typed package marker
    tests/
        conftest.py
        test_core.py
```

### Build and Publish Commands

```bash
# Build
pip install build twine
python -m build

# Upload to PyPI
twine check dist/*
twine upload dist/*

# Development install
pip install -e ".[dev]"

# Modern alternative: uv (Rust-based, much faster)
uv venv .venv
uv pip install -e ".[dev]"
uv pip compile pyproject.toml -o requirements.txt
```

### Version Management

```python
import importlib.metadata
version = importlib.metadata.version("my-library")
```

### Practice Exercises

1. Create a complete package with pyproject.toml, source, and tests.
2. Build the package and install locally with `pip install -e .`.
3. Add a CLI entry point and verify it works.
4. Publish to Test PyPI and install from there.

---

## 6. Design Patterns

Python's dynamic nature makes many patterns simpler than in statically typed languages.

### Singleton

```python
class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                cls._instances[cls] = super().__call__(*args, **kwargs)
            return cls._instances[cls]

class AppConfig(metaclass=SingletonMeta):
    ...
```

Note: In Python, modules are natural singletons. A module-level object is often simpler.

### Factory

```python
class SerializerFactory:
    _serializers = {"json": JSONSerializer, "xml": XMLSerializer}

    @classmethod
    def create(cls, fmt: str) -> Serializer:
        serializer_class = cls._serializers.get(fmt)
        if not serializer_class:
            raise ValueError(f"Unknown format: {fmt}")
        return serializer_class()
```

### Observer (Event System)

```python
class Event:
    def __init__(self):
        self._handlers = []

    def subscribe(self, handler): self._handlers.append(handler)
    def emit(self, *args, **kwargs):
        for handler in self._handlers:
            handler(*args, **kwargs)
```

### Strategy

Use `Protocol` for the interface, swap implementations at runtime:

```python
class CompressionStrategy(Protocol):
    def compress(self, data: bytes) -> bytes: ...
    def decompress(self, data: bytes) -> bytes: ...

@dataclass
class DataStore:
    strategy: CompressionStrategy
    # Switch strategy without changing DataStore code
```

### Patterns Summary

| Pattern   | Python Idiom                                          |
|-----------|-------------------------------------------------------|
| Singleton | Module-level instance or metaclass                    |
| Factory   | Class with registry dict + `create()` classmethod     |
| Observer  | Event class with subscribe/emit                       |
| Strategy  | Protocol + dependency injection                       |
| Decorator | `@decorator` syntax (language-level support)          |

### Practice Exercises

1. Implement a Builder pattern for SQL query construction.
2. Create a Chain of Responsibility for request middleware.
3. Build a plugin system using Factory + `__init_subclass__`.
4. Implement the Repository pattern with swappable storage backends.

---

## 7. Concurrency

### The GIL (Global Interpreter Lock)

The GIL ensures only one thread executes Python bytecode at a time. This means:
- **Threads do NOT provide CPU parallelism** for Python code
- **Threads DO release the GIL during I/O**, making them useful for I/O-bound tasks
- **Multiprocessing bypasses the GIL** by using separate processes

### PEP 703: Free-Threaded Python (Python 3.13+)

Python 3.13 includes an experimental build with the GIL disabled (`-X gil=0` or `--disable-gil`). This enables true multi-threaded parallelism. As of 2026, it is experimental and opt-in. Key libraries like NumPy are progressively adding support.

### ThreadPoolExecutor (I/O-Bound)

```python
from concurrent.futures import ThreadPoolExecutor, as_completed

with ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(download, url): url for url in urls}
    for future in as_completed(futures):
        result = future.result()
```

### ProcessPoolExecutor (CPU-Bound)

```python
from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(cpu_intensive, items))
```

### Thread Synchronization

```python
import threading

class ThreadSafeCounter:
    def __init__(self):
        self._count = 0
        self._lock = threading.Lock()

    def increment(self):
        with self._lock:
            self._count += 1
```

### Producer-Consumer Pattern

```python
import queue

task_queue = queue.Queue(maxsize=10)
# Producer: task_queue.put(item)
# Consumer: item = task_queue.get()
```

### Decision Matrix

| Task Type  | Threads Work? | Processes Work? | asyncio Work? |
|------------|---------------|-----------------|---------------|
| CPU-bound  | No (GIL)      | Yes             | No            |
| I/O-bound  | Yes           | Overkill        | Best          |
| Mixed      | Partial       | Yes             | With executor |

### Practice Exercises

1. Build a parallel scraper: ThreadPoolExecutor for downloads, ProcessPoolExecutor for parsing.
2. Implement a thread-safe LRU cache.
3. Benchmark threading vs multiprocessing vs asyncio for the same I/O task.
4. Create a worker pool with `multiprocessing.Queue`.

---

## 8. Modern Python 3.12-3.13 Features

### Exception Groups (PEP 654, Python 3.11+)

Handle multiple exceptions simultaneously:

```python
try:
    process_batch(["1", "abc", "3", "def"])
except* ValueError as eg:
    print(f"Caught {len(eg.exceptions)} ValueErrors")
```

### tomllib (Python 3.11+)

TOML parsing in the standard library:

```python
import tomllib
with open("pyproject.toml", "rb") as f:
    config = tomllib.load(f)
```

### StrEnum (Python 3.11+)

Members are strings — ideal for API status codes and config values:

```python
from enum import StrEnum

class Color(StrEnum):
    RED = "red"
    GREEN = "green"

assert Color.RED == "red"  # True
```

### PEP 695 Type Parameter Syntax (Python 3.12+)

```python
def first[T](items: list[T]) -> T | None:
    return items[0] if items else None

class Stack[T]:
    def push(self, item: T) -> None: ...

type Vector = list[float]
```

### Python 3.12 f-string Improvements

f-strings now support backslashes, nested quotes, and multi-line expressions:

```python
# Python 3.12+ — these were previously syntax errors
print(f"{'hello'!r}")
print(f"{'\n'.join(items)}")
```

### Python 3.13 Improved Error Messages

Python 3.13 provides even more helpful error messages with suggestions for common mistakes (typos in variable names, missing imports, etc.).

### Python 3.13 Free-Threaded Mode

```bash
# Build or install the free-threaded variant
python3.13t -X gil=0 your_script.py
```

Experimental as of 2026. Test thoroughly before production use. Not all C extensions are thread-safe yet.

---

## Summary

| Topic               | Key Takeaway                                                              |
|---------------------|---------------------------------------------------------------------------|
| Async/Await         | Cooperative multitasking for I/O; `TaskGroup` for structured concurrency  |
| Metaclasses         | Classes of classes; prefer `__init_subclass__` for simpler cases          |
| Memory Management   | Reference counting + GC; `__slots__` and weak refs for optimization       |
| Profiling           | Measure first, optimize second; cProfile for functions, timeit for micro  |
| Packaging           | `pyproject.toml` is the standard; use `build`, `twine`, or `uv`          |
| Design Patterns     | Singleton, Factory, Observer, Strategy — simpler in Python                |
| Concurrency         | Threading for I/O, multiprocessing for CPU; PEP 703 is emerging           |
| Modern Features     | Exception groups, tomllib, StrEnum, PEP 695, free-threaded Python         |

## Recommended Resources

- **Computerphile** — "Secret Key Exchange (Diffie-Hellman)" — https://www.youtube.com/watch?v=NmM9HA2MQGI
- **CPython Internals** — https://realpython.com/cpython-source-code-guide/
- **Python Packaging User Guide** — https://packaging.python.org/
- **asyncio documentation** — https://docs.python.org/3/library/asyncio.html

---

This is the final level of the Python path. Consider exploring related paths such as [TypeScript Senior](../TypeScript/Senior.md) or role-specific learning tracks on the platform.
