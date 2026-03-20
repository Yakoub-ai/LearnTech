# Backend Developer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Backend Developer learning path.

---

## Programming Fundamentals – Variables, Data Types and Control Flow

Programming fundamentals are the building blocks that every software developer must understand before writing useful code. A variable is a named location in memory that stores a value. The type of that value — whether it is a whole number, a decimal, a piece of text, or a true/false flag — is its data type. Control flow determines the order in which a program's instructions execute: rather than always running top to bottom, a program can branch (execute one block of code or another depending on a condition) or loop (repeat a block of code until a condition is met).

Understanding these concepts is necessary before tackling any framework, library or system design problem. Every piece of server-side logic — from validating a user's input to deciding which database query to run — is built from these primitives.

**Code walkthrough:**

```python
# Step 1: Variables store values; Python infers the type automatically
username = "alice"          # str — a piece of text
request_count = 0           # int — a whole number
is_authenticated = False    # bool — a true/false flag
response_time_ms = 12.5     # float — a decimal number

# Step 2: Control flow — decide what to do based on conditions
# Why: every API handler must inspect input and branch accordingly
if not is_authenticated:
    # Early return pattern — handle the "bad" case first, keep code flat
    print("401 Unauthorized")
elif request_count > 100:
    print("429 Too Many Requests")
else:
    print(f"200 OK — welcome, {username}")

# Step 3: Loops — process collections of data
status_codes = [200, 201, 400, 404, 500]
error_codes = []

for code in status_codes:
    # Why: we often need to filter or transform lists of results
    if code >= 400:
        error_codes.append(code)

print(f"Errors found: {error_codes}")  # [400, 404, 500]

# Step 4: Functions — encapsulate reusable logic
# Why: without functions, you copy-paste the same validation everywhere
def is_valid_email(email: str) -> bool:
    """Check that an email contains exactly one @ and at least one dot after it."""
    return "@" in email and "." in email.split("@")[-1]

print(is_valid_email("alice@example.com"))  # True
print(is_valid_email("not-an-email"))       # False
```

**Why it matters:** A backend developer who cannot reason clearly about types and control flow will write code that produces subtle bugs, behaves unpredictably under edge cases, or crashes when given unexpected input. These fundamentals never stop being relevant; they underpin every layer of more advanced work.

**Key things to understand:**

- Primitive types (integers, floats, booleans, strings) and the operations each supports
- The difference between mutable and immutable values
- How `if`/`else` branching works and how to compose conditions using `and`, `or` and `not`
- How `for` and `while` loops work, including how to break out of them early
- What a function is, how parameters and return values work, and why functions improve reuse and readability
- What scope is and why a variable defined inside a function is not accessible outside it

**Common pitfalls:**

- Confusing assignment (`=`) with equality comparison (`==`).
- Assuming a variable always holds the type you expect, especially when data comes from user input or an external source.
- Writing deeply nested control flow that becomes unreadable; flat code with early returns is usually clearer.
- Infinite loops caused by a loop condition that never becomes false.

---

## Object-Oriented Programming – Classes, Inheritance and Encapsulation

Object-Oriented Programming (OOP) is a way of organising code around objects — bundles that combine data (attributes) and behaviour (methods). A class is the blueprint that defines what data an object holds and what it can do. When you create an instance of a class you get a concrete object based on that blueprint.

Inheritance allows a new class (the child) to reuse and extend the attributes and methods of an existing class (the parent). Encapsulation is the principle of hiding the internal details of an object and exposing only what is necessary through a well-defined interface. Together, these mechanisms help developers manage complexity in large codebases by grouping related logic together and preventing one part of a program from reaching into and corrupting the internals of another.

**Code walkthrough:**

```python
# Step 1: Define a base class — the blueprint for all database models
# Why: classes group data (attributes) and behaviour (methods) together
class DatabaseRecord:
    def __init__(self, record_id: int):
        self._record_id = record_id   # _prefix signals "internal, don't touch"
        self._is_persisted = False

    def save(self):
        # Why: encapsulation — callers use save() without knowing the SQL
        print(f"INSERT INTO records (id) VALUES ({self._record_id})")
        self._is_persisted = True

    @property
    def id(self) -> int:
        return self._record_id

# Step 2: Inherit and extend — a User IS-A DatabaseRecord
# Why: inheritance lets us reuse save() while adding user-specific logic
class User(DatabaseRecord):
    def __init__(self, record_id: int, email: str, role: str = "viewer"):
        super().__init__(record_id)   # call the parent __init__
        self.email = email
        self.role = role

    def promote(self, new_role: str):
        """Change the user's role — business logic lives on the object."""
        allowed_roles = {"viewer", "editor", "admin"}
        if new_role not in allowed_roles:
            raise ValueError(f"Invalid role: {new_role}")
        self.role = new_role

    def __repr__(self) -> str:
        return f"User(id={self.id}, email={self.email}, role={self.role})"

# Step 3: Use the objects — the caller doesn't need to know SQL exists
user = User(record_id=1, email="alice@example.com")
user.promote("editor")
user.save()
print(user)  # User(id=1, email=alice@example.com, role=editor)
```

**Why it matters:** OOP underpins most backend frameworks, ORM libraries and the way services model real-world entities such as users, orders or products. Understanding these concepts is essential for reading, extending and contributing to any substantial codebase.

**Key things to understand:**

- How to define a class, add attributes via `__init__`, and write methods
- The meaning of `self` and why it is required
- How inheritance works and when to use it versus composition
- What encapsulation means in practice and how access modifiers signal intent
- The four pillars of OOP: encapsulation, abstraction, inheritance and polymorphism

**Common pitfalls:**

- Over-using inheritance and creating deep hierarchies that are hard to follow; prefer composition when the relationship is not a clear "is-a".
- Treating classes as nothing more than data containers with no behaviour (these are better expressed as plain data structures).
- Forgetting that child classes inherit all parent methods, including ones that may not make sense in the child context.

---

## Python – Syntax, Built-in Types and Standard Library

Python is the primary language for many backend systems, data pipelines and scripting tasks at this organisation. Its design philosophy emphasises readability and conciseness, which makes it well-suited to learning programming concepts without fighting verbose syntax.

Python's rich standard library means that common tasks — reading files, working with dates, parsing JSON, building HTTP servers — are handled by well-tested modules rather than requiring third-party dependencies. Learning the standard library reduces the risk of reinventing tools that already exist.

**Code walkthrough:**

```python
# Step 1: Working with JSON — the data format of REST APIs
# Why: every backend reads and writes JSON; the standard library handles it
import json
from pathlib import Path
from datetime import datetime, timezone

config_data = {"db_host": "localhost", "db_port": 5432, "debug": True}
json_string = json.dumps(config_data, indent=2)   # dict → JSON string
parsed_back = json.loads(json_string)              # JSON string → dict
print(parsed_back["db_host"])  # "localhost"

# Step 2: Reading files safely with context managers
# Why: "with" guarantees the file is closed even if an error occurs
config_path = Path("config.json")
if config_path.exists():
    with open(config_path, encoding="utf-8") as f:
        app_config = json.load(f)  # parse JSON directly from a file

# Step 3: List comprehensions — Pythonic way to transform data
raw_inputs = ["  Alice ", "BOB", " charlie"]
# Why: comprehensions are more readable than manual for-loop-append
cleaned = [name.strip().lower() for name in raw_inputs]
print(cleaned)  # ['alice', 'bob', 'charlie']

# Step 4: Working with dates — timestamps appear everywhere in APIs
now = datetime.now(timezone.utc)
print(now.isoformat())  # e.g. "2025-06-15T09:30:00+00:00"

# Step 5: Collections for counting and grouping
from collections import Counter
status_log = [200, 200, 200, 404, 500, 200, 404]
counts = Counter(status_log)
print(counts.most_common(2))  # [(200, 4), (404, 2)]
```

**Why it matters:** Code written in an un-Pythonic style is harder for other Python developers to read and maintain. Understanding Python's idioms and standard library makes you productive quickly and keeps your code consistent with the ecosystem around it.

**Key things to understand:**

- Python uses indentation to define code blocks rather than braces; mixing tabs and spaces causes errors
- Built-in types: `int`, `float`, `str`, `bool`, `list`, `tuple`, `dict`, `set` and the methods each provides
- List comprehensions as a concise, idiomatic way to build lists from iterables
- How to read, write and process files using `open()` and the `with` statement
- Commonly used standard library modules: `os`, `sys`, `json`, `datetime`, `pathlib`, `collections`, `re`
- Virtual environments and why dependencies should be isolated per project

**Common pitfalls:**

- Modifying a list while iterating over it leads to skipped or duplicated elements.
- Using mutable default arguments in function signatures (e.g., `def foo(items=[])`) causes the default to be shared across all calls.
- Forgetting that strings are immutable; operations like `replace` return a new string rather than modifying the original.
- Assuming `==` and `is` are interchangeable; `is` checks object identity, not value equality.

---

## HTTP – The Request/Response Cycle

HTTP (Hypertext Transfer Protocol) is the communication protocol used by clients and servers to exchange data on the web. Every time a browser loads a page or a mobile app fetches data, it sends an HTTP request and waits for an HTTP response.

An HTTP request consists of a method (what action to perform), a URL (which resource to act on), headers (metadata such as content type or authentication tokens) and optionally a body (data sent to the server). The server processes the request and returns a response containing a status code (a three-digit number indicating success or failure), response headers and optionally a body.

**Code walkthrough:**

```python
# Step 1: FastAPI turns Python functions into HTTP endpoints
# Why: this is the simplest possible server — one route, one response
from fastapi import FastAPI, HTTPException

app = FastAPI()

# Step 2: GET request — the client asks for data
# Why: GET is the most common method; it should never modify server state
@app.get("/health")
async def health_check():
    # Return a dict — FastAPI converts it to a JSON response with status 200
    return {"status": "healthy", "version": "1.0.0"}

# Step 3: Route parameters — identify which resource the client wants
# Why: /users/42 is how REST APIs address a specific user
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    # FastAPI automatically validates that user_id is an integer
    if user_id == 42:
        return {"id": 42, "name": "Alice", "email": "alice@example.com"}
    # Step 4: Use the correct HTTP status code for the situation
    # Why: 404 tells the client "this resource doesn't exist"
    raise HTTPException(status_code=404, detail="User not found")

# Step 5: POST request with a JSON body — the client sends data
# Why: POST is used when the client creates a new resource
@app.post("/users", status_code=201)
async def create_user(user: dict):
    # 201 Created tells the client the resource was successfully created
    return {"id": 1, "name": user.get("name"), "created": True}

# Run with: uvicorn main:app --reload
```

**Why it matters:** HTTP is fundamental for any backend developer because every API, web framework and network service operates on top of it. Misunderstanding status codes, methods or the stateless nature of HTTP leads to poorly designed APIs and hard-to-diagnose bugs.

**Key things to understand:**

- The most common HTTP methods: GET (retrieve), POST (create or submit data), PUT/PATCH (update), DELETE (remove)
- Status code classes: 2xx success, 3xx redirection, 4xx client errors, 5xx server errors
- Key status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error
- What HTTP headers are and examples of commonly used ones: `Content-Type`, `Authorization`, `Accept`, `Cache-Control`
- The stateless nature of HTTP: each request is independent; the server does not automatically remember previous requests

**Common pitfalls:**

- Returning a 200 status code even when an error has occurred (putting error information in the body instead of using the correct status code).
- Confusing 401 Unauthorized (the request lacks valid authentication credentials) with 403 Forbidden (the request is authenticated but the user does not have permission).
- Overlooking the role of headers in content negotiation and caching.
- Using POST for every operation instead of choosing the semantically correct method.

---

## REST APIs – What They Are and How They Work

A REST (Representational State Transfer) API is a style of building web services that uses HTTP as the transport and treats everything the server exposes as a resource identified by a URL. A client interacts with resources by sending standard HTTP requests; the server responds with a representation of that resource — typically formatted as JSON.

REST defines a set of architectural constraints — statelessness, a uniform interface, a client-server separation — rather than a protocol. An API that follows these constraints is said to be RESTful. REST is the dominant style for backend APIs because it is simple, works with every HTTP client and requires no special tooling to consume.

**Code walkthrough:**

```python
# Step 1: Define a Pydantic model for request validation
# Why: Pydantic validates incoming data automatically and returns clear errors
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, EmailStr

app = FastAPI()

class CreateUserRequest(BaseModel):
    email: EmailStr                                 # validates email format
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=18, le=150)            # ge = greater or equal

# Step 2: In-memory store (replaced by a database in real apps)
users_db: dict[int, dict] = {}
next_id = 1

# Step 3: RESTful CRUD — each endpoint maps to a resource + HTTP verb
@app.post("/users", status_code=201)
async def create_user(user: CreateUserRequest):
    global next_id
    # Why: Pydantic already validated the data before this line runs
    users_db[next_id] = user.model_dump()
    users_db[next_id]["id"] = next_id
    next_id += 1
    return users_db[next_id - 1]

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    if user_id not in users_db:
        # Why: 404 is the correct status when the resource doesn't exist
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[user_id]

@app.get("/users")
async def list_users():
    # Why: a collection endpoint returns all resources as a JSON array
    return list(users_db.values())

@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del users_db[user_id]
    # Why: 204 No Content — the delete succeeded, nothing to return
```

**Why it matters:** Understanding what makes an API RESTful and how to consume one is the foundation for everything else in backend API work. Almost every external service you integrate with will expose a REST API, and almost every internal service you build will be expected to follow REST conventions.

**Key things to understand:**

- Resources are identified by URLs (e.g., `/users`, `/users/42`)
- HTTP methods map to CRUD operations: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- Requests and responses typically use JSON as the data format
- REST is stateless: all information needed to process a request must be contained within the request itself
- How to read API documentation and understand endpoint definitions, expected inputs and response shapes
- How to make HTTP requests in Python using the `requests` library

**Common pitfalls:**

- Confusing REST with HTTP itself; REST is a set of constraints on how to use HTTP, not a protocol of its own.
- Assuming every API that returns JSON is RESTful; REST implies specific constraints around resource identification and statelessness.
- Ignoring error responses; a well-behaved client must handle non-2xx status codes gracefully.

---

## Client-Server Architecture

Client-server architecture is the fundamental model for how modern web and mobile applications are structured. The client is the part of the system that a user interacts with directly — a browser, a mobile app, or a desktop application. The server is a program running on a remote machine that stores data, enforces business rules and responds to client requests.

This separation of concerns is what defines backend development as a discipline. Backend code runs on the server; it is never directly visible to the user. Because the client is outside your control, the server must never blindly trust what the client sends.

**Code walkthrough:**

```python
# Step 1: Environment configuration — settings differ between environments
# Why: you never hard-code secrets or host names; they change per environment
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./dev.db"
    secret_key: str = "change-me-in-production"
    debug: bool = False
    allowed_origins: list[str] = ["http://localhost:3000"]

    class Config:
        # Why: .env files keep secrets out of source code
        env_file = ".env"

settings = Settings()

# Step 2: The server validates everything — never trust the client
# Why: a client can send any data; only the server enforces rules
from fastapi import FastAPI, Header, HTTPException

app = FastAPI(debug=settings.debug)

@app.post("/transfer")
async def transfer_money(
    amount: float,
    authorization: str = Header(...),
):
    # Step 3: Server-side validation the client cannot bypass
    # Why: a browser's JavaScript can be disabled or modified
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    if amount > 10_000:
        raise HTTPException(status_code=400, detail="Amount exceeds limit")
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")

    # Step 4: Only after validation does business logic run
    return {"status": "transferred", "amount": amount}
```

**Why it matters:** Understanding where backend code runs and what it is responsible for prevents an entire class of security mistakes. Backend developers must know that any logic or validation placed only on the client can be trivially bypassed.

**Key things to understand:**

- The client initiates requests; the server responds — the server does not push data to the client unprompted in the basic model
- Multiple clients can connect to the same server simultaneously
- The server is responsible for validating all data it receives, regardless of any validation the client performs
- Backend code controls access to the database and enforces business logic; this must not be delegated to the client
- In a typical web request: DNS resolves the domain to an IP address, a TCP connection is established, the HTTP request is sent, the server processes it and returns a response

**Common pitfalls:**

- Assuming that because a client sends a well-formed request, the data inside it is trustworthy.
- Implementing security checks only on the client side (e.g., in JavaScript); these can be bypassed trivially by anyone with a browser's developer tools or a tool like curl.
- Confusing the web server (the program handling HTTP) with the application server (the program running business logic); in small applications these are often the same process, but the distinction matters as systems grow.

---

## Databases – What They Are and Why Backends Need Them

A database is a structured system for storing, retrieving and managing data persistently. Without a database, any data a server processes lives only in memory and is lost the moment the process stops. Databases provide durable storage, efficient querying and mechanisms to ensure data integrity.

For a backend developer, the database is where the state of the application lives. User accounts, product catalogues, transaction records, configuration — all of this is stored in and retrieved from a database. Understanding what databases are, what types exist and why you need them is the starting point before learning SQL or database design.

**Code walkthrough:**

```python
# Step 1: Connect to a SQLite database — the simplest way to get started
# Why: SQLite requires no server; the database is a single file
import sqlite3

def get_connection():
    # Why: the "with" pattern ensures the connection is properly closed
    conn = sqlite3.connect("app.db")
    conn.row_factory = sqlite3.Row  # rows behave like dicts
    return conn

# Step 2: Create a table — define the structure of your data
# Why: a schema enforces that every row has the same shape and types
def init_db():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id    INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT    NOT NULL UNIQUE,
                name  TEXT    NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

# Step 3: Basic CRUD operations — Create, Read, Update, Delete
def create_user(email: str, name: str) -> int:
    with get_connection() as conn:
        # Why: parameterised queries prevent SQL injection attacks
        cursor = conn.execute(
            "INSERT INTO users (email, name) VALUES (?, ?)",
            (email, name),
        )
        return cursor.lastrowid

def get_user(user_id: int) -> dict | None:
    with get_connection() as conn:
        row = conn.execute(
            "SELECT * FROM users WHERE id = ?", (user_id,)
        ).fetchone()
        return dict(row) if row else None

# Step 4: Use it
init_db()
new_id = create_user("alice@example.com", "Alice")
print(get_user(new_id))  # {'id': 1, 'email': 'alice@example.com', ...}
```

**Why it matters:** Every meaningful backend application needs persistent storage. Choosing the wrong type of database for the problem, or misunderstanding what guarantees a database provides, leads to data loss, correctness bugs and performance problems that are difficult to fix after the fact.

**Key things to understand:**

- The difference between a relational database (data stored in structured tables with defined relationships) and a non-relational database (flexible schemas, varied storage models such as documents or key-value pairs)
- What persistence means: data written to a database survives server restarts
- What a query is: a request to read or modify data in the database
- The role of the database in the typical three-tier architecture: presentation layer (client), application layer (backend server), data layer (database)
- Common relational databases: PostgreSQL and MySQL; common non-relational databases: MongoDB (document store) and Redis (in-memory key-value store)
- What a primary key is and why every row needs a unique identifier

**Common pitfalls:**

- Storing all data in a single large table without thought for structure, making queries slow and maintenance difficult.
- Using a database as a message queue or cache when dedicated tools (Redis, RabbitMQ) are better suited to those tasks.
- Ignoring that databases have their own access controls; the backend should connect with the minimum permissions needed (principle of least privilege).
- Assuming that because data was written it was committed; understanding transactions matters even at this level.

---

## Web Frameworks -- FastAPI and Django

A web framework provides the structure and tools for building web applications and APIs. Instead of handling HTTP parsing, routing, and response formatting from scratch, a framework handles these concerns so you can focus on your application's business logic. For Python backend development, FastAPI and Django are the two most important frameworks to understand.

FastAPI is a modern, high-performance framework designed specifically for building APIs. It uses Python type hints to automatically generate API documentation, validate request data, and provide editor autocompletion. FastAPI is an excellent choice when your primary goal is building a REST API -- it is fast to develop with, fast at runtime, and produces self-documenting endpoints.

Django is a full-featured web framework that follows the "batteries included" philosophy. It provides an ORM (Object-Relational Mapper), an admin interface, authentication, form handling, and much more out of the box. Django is the right choice when you need a complete web application with server-rendered pages, user management, and database interaction -- or when your project will grow to need these features over time.

**Code walkthrough:**

```python
# Step 1: A complete FastAPI application with middleware and error handling
# Why: real apps need request logging, CORS, and structured error responses
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="User Service", version="1.0.0")

# Step 2: Middleware — code that runs on EVERY request and response
# Why: cross-cutting concerns (logging, timing) belong in middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info(
        f"{request.method} {request.url.path} → {response.status_code} "
        f"({duration_ms:.1f}ms)"
    )
    return response

# Step 3: CORS — allow the frontend (different origin) to call the API
# Why: browsers block cross-origin requests by default for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Step 4: Global error handler — catch unhandled exceptions cleanly
# Why: users should never see a raw Python traceback
@app.exception_handler(Exception)
async def global_error_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on {request.url.path}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )

@app.get("/")
async def root():
    return {"message": "Hello, world!"}
```

**Why it matters:** Nearly every backend role involves building or maintaining web APIs. Understanding how web frameworks work -- how they receive requests, route them to your code, and send responses -- is foundational knowledge for any backend developer.

**Key things to understand:**

- The request lifecycle: a client sends an HTTP request, the framework matches the URL to a route, your handler function runs, and the framework sends the HTTP response back to the client
- FastAPI uses Python type hints and Pydantic models to validate request bodies and query parameters automatically. If the client sends invalid data, FastAPI returns a clear error response without you writing validation code
- Django follows the Model-View-Template (MVT) pattern: Models define database tables, Views handle request logic, and Templates render HTML. For API-only projects, Django REST Framework adds serialisers and API views
- Both frameworks have excellent documentation and large communities. FastAPI's interactive docs (Swagger UI at /docs) are particularly useful during development
- For LF's stack, FastAPI is typically used for microservices and API-first projects, while Django may be used for internal tools that need an admin interface

**Common pitfalls:**

- Trying to build an API by handling raw HTTP without a framework -- this leads to reinventing routing, validation, serialisation, and error handling.
- Choosing Django for a simple API when FastAPI would be faster to develop and deploy, or choosing FastAPI for a full web application when Django's built-in features would save significant development time.
- Not reading the framework's documentation and instead relying solely on AI-generated code -- framework docs explain the "why" behind design decisions, which is essential for making good architectural choices.
