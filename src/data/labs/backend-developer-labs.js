export const labs = [
  // ============================================================
  // EXISTING LAB — copied exactly from interactiveLabs.js
  // ============================================================
  {
    id: 'be-lab-1',
    roleId: 'backend-developer',
    level: 'beginner',
    title: 'Build a REST API',
    description: 'Build a complete REST API step by step, learning HTTP methods, routing, validation, and error handling.',
    estimatedMinutes: 35,
    steps: [
      {
        title: 'Step 1: Create a Basic Server',
        instruction: 'Set up a minimal Express.js server that listens on port 3000 and responds to a health check endpoint.',
        starterCode: `// Basic Express server setup
const express = require('express');
const app = express();

// TODO: Add JSON body parsing middleware

// TODO: Create a GET /health endpoint that returns { status: 'ok' }

// TODO: Start the server on port 3000
// Print "Server running on port 3000" when ready`,
        hints: [
          'Use app.use(express.json()) for body parsing',
          'Use app.get(\'/health\', (req, res) => ...) for the endpoint',
          'Use app.listen(3000, () => console.log(...))'
        ],
        expectedOutput: `Server running on port 3000
GET /health → { "status": "ok" }`,
        solution: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
      },
      {
        title: 'Step 2: Add GET Endpoints',
        instruction: 'Create an in-memory data store and add GET endpoints to list all users and get a single user by ID.',
        starterCode: `// In-memory data store
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// TODO: GET /api/users — return all users

// TODO: GET /api/users/:id — return a single user by ID
// Return 404 with { error: 'User not found' } if not found`,
        hints: [
          'Use req.params.id to get the URL parameter',
          'parseInt(req.params.id) converts the string to a number',
          'Use users.find(u => u.id === id) to look up a user'
        ],
        expectedOutput: `GET /api/users → [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
GET /api/users/2 → { id: 2, name: "Bob", email: "bob@example.com" }
GET /api/users/99 → 404 { error: "User not found" }`,
        solution: `app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});`
      },
      {
        title: 'Step 3: Add POST Endpoint',
        instruction: 'Create a POST endpoint to add new users. Validate that name and email are provided in the request body.',
        starterCode: `// TODO: POST /api/users — create a new user
// Request body: { name: string, email: string }
// Validate: name and email are required
// Return 400 with { error: '...' } if validation fails
// Auto-increment the ID
// Return 201 with the created user

let nextId = 4; // Next available ID`,
        hints: [
          'Access the body with req.body.name and req.body.email',
          'Check if (!name || !email) for validation',
          'Use res.status(201).json(newUser) for the success response'
        ],
        expectedOutput: `POST /api/users { name: "Diana", email: "diana@example.com" }
→ 201 { id: 4, name: "Diana", email: "diana@example.com" }

POST /api/users { name: "Diana" }
→ 400 { error: "Name and email are required" }`,
        solution: `let nextId = 4;

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});`
      },
      {
        title: 'Step 4: Add PUT and DELETE',
        instruction: 'Add endpoints to update and delete users. PUT should replace the user data, DELETE should remove the user from the array.',
        starterCode: `// TODO: PUT /api/users/:id — update a user
// Find user by ID, update name and email from body
// Return 404 if not found, 200 with updated user on success

// TODO: DELETE /api/users/:id — delete a user
// Find user by ID, remove from array
// Return 404 if not found, 204 (no content) on success`,
        hints: [
          'For PUT, find the user index with users.findIndex(u => u.id === id)',
          'Update with Object.assign or spread: users[index] = { ...users[index], name, email }',
          'For DELETE, use users.splice(index, 1) to remove the user'
        ],
        expectedOutput: `PUT /api/users/2 { name: "Bobby", email: "bobby@example.com" }
→ 200 { id: 2, name: "Bobby", email: "bobby@example.com" }

DELETE /api/users/2 → 204 No Content
GET /api/users/2 → 404 Not Found`,
        solution: `app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  users[index] = { ...users[index], name, email };
  res.json(users[index]);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});`
      },
      {
        title: 'Step 5: Add Error Handling Middleware',
        instruction: 'Add a global error handler and a 404 catch-all route. Wrap async routes safely and add request logging.',
        starterCode: `// TODO: Add request logging middleware
// Log: METHOD PATH — e.g., "GET /api/users"

// TODO: Add a 404 catch-all route (must be AFTER all other routes)
// Return { error: 'Route not found' }

// TODO: Add global error handling middleware
// Express error handlers have 4 parameters: (err, req, res, next)
// Log the error and return 500 with { error: 'Internal server error' }`,
        hints: [
          'Logging middleware: app.use((req, res, next) => { console.log(...); next(); })',
          'The 404 handler should be app.use((req, res) => ...) placed after all routes',
          'Error middleware must have exactly 4 params: app.use((err, req, res, next) => ...)'
        ],
        expectedOutput: `GET /api/users → logged, returns user list
GET /unknown → 404 { error: "Route not found" }
Errors → 500 { error: "Internal server error" }`,
        solution: `// Request logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// ... (all your routes go here) ...

// 404 catch-all (after all routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});`
      }
    ]
  },

  // ============================================================
  // be-lab-2 — converted from codeSandboxExamples be-1
  // FastAPI Endpoint with Pydantic Validation
  // ============================================================
  {
    id: 'be-lab-2',
    roleId: 'backend-developer',
    level: 'beginner',
    title: 'FastAPI Endpoint with Pydantic Validation',
    description: 'Build a fully-typed FastAPI endpoint that validates incoming request bodies using Pydantic models. You will learn how schema-first API design catches bad data at the boundary before it ever touches your business logic, reducing bugs and improving API contracts.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing backend code, ensure your development environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+, pip, a virtual environment, and FastAPI with Uvicorn installed. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Run `pip install fastapi uvicorn` then `python -c "import fastapi; print(fastapi.__version__)"` to verify'
        ],
        expectedOutput: `Python 3.12.x
fastapi 0.x.x
uvicorn installed`,
        solution: null
      },
      {
        title: 'Step 2: Define a Pydantic Request Model',
        instruction: 'WHY: Pydantic models serve as the contract between your API and its callers. They enforce types, provide auto-coercion, and generate OpenAPI schema automatically — all at zero runtime cost when data is valid. HOW: Create a `User` Pydantic model with required and optional fields, then wire it to a POST endpoint.',
        starterCode: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# TODO: Define a User model with:
#   - name: str (required)
#   - email: str (required)
#   - age: Optional[int] = None

# class User(BaseModel):
#     ...

# TODO: Create POST /users/ that accepts a User body
# and returns { "message": "User {name} created", "user": <the user object> }`,
        hints: [
          'Pydantic BaseModel fields with no default are required; use `= None` for optional',
          'FastAPI automatically reads the request body when you type-hint a parameter with a Pydantic model',
          'Return a plain dict — FastAPI serialises it to JSON automatically'
        ],
        expectedOutput: `POST /users/ {"name":"Alice","email":"alice@example.com","age":30}
→ 200 {"message":"User Alice created","user":{"name":"Alice","email":"alice@example.com","age":30}}

POST /users/ {"name":"Bob","email":"bob@example.com"}
→ 200 {"message":"User Bob created","user":{"name":"Bob","email":"bob@example.com","age":null}}

POST /users/ {"name":"Charlie"}
→ 422 Unprocessable Entity (email is required)`,
        solution: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

@app.post("/users/")
async def create_user(user: User):
    return {"message": f"User {user.name} created", "user": user}`
      },
      {
        title: 'Step 3: Add a GET Endpoint with Path Parameters',
        instruction: 'WHY: Path parameters let callers address a specific resource by its identifier — a core REST principle. FastAPI validates and coerces them automatically, turning the raw string "/users/42" into a Python int before your function runs. HOW: Add a GET /users/{user_id} route that returns a placeholder user object.',
        starterCode: `# Add below your existing POST endpoint

# TODO: GET /users/{user_id}
# FastAPI will coerce user_id to int automatically
# Return {"user_id": user_id, "name": "John Doe"}

# BONUS: What happens if the caller sends /users/abc?`,
        hints: [
          'Declare the path param in the decorator string AND as a function argument: `async def get_user(user_id: int)`',
          'FastAPI returns a 422 automatically when the path param cannot be coerced to the declared type',
          'Add `response_model` to the decorator to document the return shape in OpenAPI'
        ],
        expectedOutput: `GET /users/42
→ 200 {"user_id":42,"name":"John Doe"}

GET /users/abc
→ 422 Unprocessable Entity`,
        solution: `@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}`
      },
      {
        title: 'Step 4: Add Email Validation with Pydantic',
        instruction: 'WHY: Accepting any string as an email leads to bad data in your database that is expensive to clean up later. Pydantic v2 ships with `EmailStr` which validates RFC-5322 format at the model boundary — catching errors before they reach the database layer. HOW: Upgrade the email field type and observe the automatic 422 response for malformed emails.',
        starterCode: `# pip install "pydantic[email]" first

from fastapi import FastAPI
from pydantic import BaseModel, EmailStr  # import EmailStr
from typing import Optional

app = FastAPI()

# TODO: Update the User model to use EmailStr for the email field
# instead of plain str

class User(BaseModel):
    name: str
    email: str        # change this to EmailStr
    age: Optional[int] = None

@app.post("/users/")
async def create_user(user: User):
    return {"message": f"User {user.name} created", "user": user}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}`,
        hints: [
          'Install the extras: `pip install "pydantic[email]"`',
          'Replace `str` with `EmailStr` — no other change needed',
          'Check the auto-generated docs at http://localhost:8000/docs to see the updated schema'
        ],
        expectedOutput: `POST /users/ {"name":"Alice","email":"not-an-email"}
→ 422 {"detail":[{"type":"value_error","loc":["body","email"],"msg":"value is not a valid email address",...}]}

POST /users/ {"name":"Alice","email":"alice@example.com"}
→ 200 {"message":"User Alice created","user":{...}}`,
        solution: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from typing import Optional
import uvicorn

app = FastAPI()

class User(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int] = None

@app.post("/users/")
async def create_user(user: User):
    return {"message": f"User {user.name} created", "user": user}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      },
      {
        title: 'Step 5: Start the Server and Explore the Auto-Docs',
        instruction: 'WHY: FastAPI generates interactive OpenAPI documentation (Swagger UI) from your code with zero extra configuration. This replaces manual API documentation and lets front-end developers and QA engineers test endpoints without writing curl commands. HOW: Start the server with Uvicorn and explore the /docs and /redoc pages.',
        starterCode: `# Save your complete main.py file, then run:
# uvicorn main:app --reload

# Then open:
# http://localhost:8000/docs       (Swagger UI — interactive)
# http://localhost:8000/redoc      (ReDoc — readable)
# http://localhost:8000/openapi.json  (raw OpenAPI schema)

# TODO: Using the Swagger UI at /docs:
# 1. Expand POST /users/ and click "Try it out"
# 2. Submit a valid user — observe the 200 response
# 3. Submit an invalid email — observe the 422 response
# 4. Check that "age" shows as optional in the schema`,
        hints: [
          'The --reload flag restarts the server on every file save during development',
          'The OpenAPI JSON can be imported directly into Postman or Insomnia',
          'Add `title`, `description`, and `version` to `FastAPI()` to customise the docs header'
        ],
        expectedOutput: `INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
Swagger UI visible at http://localhost:8000/docs
ReDoc visible at http://localhost:8000/redoc`,
        solution: `# Complete main.py — run with: uvicorn main:app --reload
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from typing import Optional
import uvicorn

app = FastAPI(
    title="User API",
    description="Demo FastAPI app with Pydantic validation",
    version="1.0.0"
)

class User(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int] = None

@app.post("/users/", summary="Create a new user")
async def create_user(user: User):
    return {"message": f"User {user.name} created", "user": user}

@app.get("/users/{user_id}", summary="Get a user by ID")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      }
    ]
  },

  // ============================================================
  // be-lab-3 — converted from codeSandboxExamples be-2
  // SQLAlchemy ORM Model and Query
  // ============================================================
  {
    id: 'be-lab-3',
    roleId: 'backend-developer',
    level: 'mid',
    title: 'SQLAlchemy ORM Model and Database Queries',
    description: 'Define database models using SQLAlchemy ORM and perform create, query, update, and delete operations against a SQLite database. You will learn how the ORM abstracts raw SQL while still giving you full control over queries — a critical skill for building data-driven backend services that are easy to maintain and migrate.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing backend code, ensure your development environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+, a virtual environment, and SQLAlchemy installed. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install sqlalchemy` then `python -c "import sqlalchemy; print(sqlalchemy.__version__)"` to verify',
          'SQLite is built into Python — no separate database server is required for this lab'
        ],
        expectedOutput: `Python 3.12.x
SQLAlchemy 2.x.x installed
SQLite: built-in`,
        solution: null
      },
      {
        title: 'Step 2: Configure the Engine and Session Factory',
        instruction: 'WHY: The SQLAlchemy engine manages the connection pool to your database. The session factory creates sessions — the unit-of-work objects through which you stage changes before committing them. Separating engine configuration from session creation makes it easy to swap databases (SQLite → PostgreSQL) by changing one URL string. HOW: Create the engine, session factory, and declarative base.',
        starterCode: `from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# TODO: Set DATABASE_URL to "sqlite:///./test.db"
DATABASE_URL = "..."

# TODO: Create the engine
# For SQLite, pass connect_args={"check_same_thread": False}
engine = ...

# TODO: Create the SessionLocal factory
# bind it to the engine; set autocommit=False, autoflush=False
SessionLocal = ...

# TODO: Create the Base class for all ORM models
Base = ...

print("Engine and session factory configured")`,
        hints: [
          'Use `create_engine(DATABASE_URL, connect_args={"check_same_thread": False})`',
          '`sessionmaker(autocommit=False, autoflush=False, bind=engine)` is the standard pattern',
          '`declarative_base()` returns the class your models will inherit from'
        ],
        expectedOutput: `Engine and session factory configured`,
        solution: `from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

print("Engine and session factory configured")`
      },
      {
        title: 'Step 3: Define the User ORM Model',
        instruction: 'WHY: ORM models are the single source of truth for your database schema inside your Python codebase. Defining columns with correct types and constraints (unique, nullable) enforces data integrity at the database level — the last line of defence after application-layer validation. HOW: Create a User model mapped to a "users" table.',
        starterCode: `from sqlalchemy import Column, Integer, String

# TODO: Define a User model that inherits from Base
# Table name: "users"
# Columns:
#   id    — Integer, primary key
#   name  — String, not nullable
#   email — String, unique, not nullable

class User(Base):
    pass  # replace with column definitions

# TODO: Create the table in the database
Base.metadata.create_all(engine)
print("Table 'users' created")`,
        hints: [
          'Use `__tablename__ = "users"` to set the table name',
          '`Column(Integer, primary_key=True, index=True)` for the auto-increment id',
          '`Column(String, unique=True, nullable=False)` enforces uniqueness at DB level'
        ],
        expectedOutput: `Table 'users' created`,
        solution: `from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = "users"

    id    = Column(Integer, primary_key=True, index=True)
    name  = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)

Base.metadata.create_all(engine)
print("Table 'users' created")`
      },
      {
        title: 'Step 4: Create and Query Records',
        instruction: 'WHY: Using sessions correctly — opening, committing, and closing them — prevents connection leaks and ensures your writes are atomic. Filtering at the database level (not in Python) is critical for performance at scale: a `WHERE` clause in SQL avoids loading thousands of rows into memory. HOW: Insert a user, commit, then query with a filter.',
        starterCode: `# Open a session
db = SessionLocal()

try:
    # TODO: Create a User instance and add it to the session
    # name="Alice", email="alice@example.com"
    user = ...
    db.add(user)
    db.commit()
    db.refresh(user)  # load the auto-generated id
    print(f"Created user id={user.id}")

    # TODO: Query all users where name == "Alice"
    # Use db.query(User).filter(User.name == "Alice").all()
    users = ...
    for u in users:
        print(f"  Found: id={u.id} name={u.name} email={u.email}")

finally:
    db.close()`,
        hints: [
          '`db.refresh(user)` is needed to load server-generated values like auto-increment id',
          '`db.query(User).filter(User.email == "alice@example.com").first()` returns one or None',
          'Always close the session in a `finally` block (or use a context manager) to return the connection to the pool'
        ],
        expectedOutput: `Created user id=1
  Found: id=1 name=Alice email=alice@example.com`,
        solution: `db = SessionLocal()

try:
    user = User(name="Alice", email="alice@example.com")
    db.add(user)
    db.commit()
    db.refresh(user)
    print(f"Created user id={user.id}")

    users = db.query(User).filter(User.name == "Alice").all()
    for u in users:
        print(f"  Found: id={u.id} name={u.name} email={u.email}")

finally:
    db.close()`
      },
      {
        title: 'Step 5: Update and Delete Records',
        instruction: 'WHY: Mutations (UPDATE, DELETE) must always be guarded — first verify the record exists, then modify or remove it, then commit. Rolling back on error leaves the database in a consistent state and prevents partial writes from corrupting your data. HOW: Update a user\'s name and then delete the record, with proper error handling.',
        starterCode: `db = SessionLocal()

try:
    # TODO: Fetch Alice by email (use .first() — returns None if not found)
    user = db.query(User).filter(User.email == "alice@example.com").first()

    if user is None:
        print("User not found")
    else:
        # TODO: Update the name to "Alice Smith" and commit
        user.name = ...
        db.commit()
        db.refresh(user)
        print(f"Updated: id={user.id} name={user.name}")

        # TODO: Delete the user and commit
        db.delete(user)
        db.commit()
        print("User deleted")

        # TODO: Confirm deletion — should print 0
        count = db.query(User).count()
        print(f"Remaining users: {count}")

except Exception as e:
    db.rollback()
    print(f"Error: {e}")
    raise
finally:
    db.close()`,
        hints: [
          'Assign directly to the model attribute: `user.name = "Alice Smith"` — SQLAlchemy tracks changes automatically',
          '`db.commit()` persists the changes; `db.refresh(user)` reloads the row from the DB',
          '`db.rollback()` in the except block undoes any uncommitted changes on error'
        ],
        expectedOutput: `Updated: id=1 name=Alice Smith
User deleted
Remaining users: 0`,
        solution: `db = SessionLocal()

try:
    user = db.query(User).filter(User.email == "alice@example.com").first()

    if user is None:
        print("User not found")
    else:
        user.name = "Alice Smith"
        db.commit()
        db.refresh(user)
        print(f"Updated: id={user.id} name={user.name}")

        db.delete(user)
        db.commit()
        print("User deleted")

        count = db.query(User).count()
        print(f"Remaining users: {count}")

except Exception as e:
    db.rollback()
    print(f"Error: {e}")
    raise
finally:
    db.close()`
      }
    ]
  },

  // ============================================================
  // be-lab-4 — converted from codeSandboxExamples be-3
  // JWT Authentication
  // ============================================================
  {
    id: 'be-lab-4',
    roleId: 'backend-developer',
    level: 'senior',
    title: 'JWT Authentication for FastAPI',
    description: 'Implement stateless JWT-based authentication to protect FastAPI routes. You will learn how tokens encode identity without server-side session storage, why expiry and signature verification matter for security, and how to wire FastAPI\'s dependency injection system to enforce authentication on any route.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing backend code, ensure your development environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+, FastAPI, Uvicorn, and the PyJWT library installed. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install fastapi uvicorn pyjwt` then `python -c "import jwt; print(jwt.__version__)"` to verify',
          'Never hard-code SECRET_KEY in production — load it from an environment variable'
        ],
        expectedOutput: `Python 3.12.x
fastapi installed
PyJWT 2.x.x installed`,
        solution: null
      },
      {
        title: 'Step 2: Create and Sign a JWT Token',
        instruction: 'WHY: JWTs are self-contained tokens — the server does not store session state anywhere. The payload encodes the user\'s identity (the `sub` claim) and an expiry timestamp (`exp`). The HMAC-SHA256 signature ensures the token cannot be tampered with without invalidating it. HOW: Write a `create_token` function using PyJWT.',
        starterCode: `import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "change-me-in-production"
ALGORITHM = "HS256"

def create_token(data: dict) -> str:
    """Sign and return a JWT that expires in 1 hour."""
    # TODO: Copy data to avoid mutating the caller's dict
    to_encode = ...

    # TODO: Add an "exp" claim: current UTC time + 1 hour
    # Use datetime.now(timezone.utc) — avoid deprecated utcnow()
    expire = ...
    to_encode.update({"exp": expire})

    # TODO: Encode and return the JWT
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Test it
token = create_token({"sub": "alice"})
print("Token:", token[:40], "...")`,
        hints: [
          'Use `datetime.now(timezone.utc)` instead of the deprecated `datetime.utcnow()`',
          '`timedelta(hours=1)` adds one hour to the current time',
          'PyJWT returns a str in v2.x — no need to call `.decode()`'
        ],
        expectedOutput: `Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (truncated)`,
        solution: `import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "change-me-in-production"
ALGORITHM = "HS256"

def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

token = create_token({"sub": "alice"})
print("Token:", token[:40], "...")`
      },
      {
        title: 'Step 3: Verify a Token and Extract the Payload',
        instruction: 'WHY: Verification is the security-critical step. PyJWT checks three things automatically: (1) the signature matches, proving no tampering; (2) the token has not expired; (3) the algorithm matches what the server expects. Any mismatch raises `InvalidTokenError` — your code must handle this and return a 401, not a 500. HOW: Write a `verify_token` dependency for FastAPI.',
        starterCode: `from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """Decode the Bearer token and return its payload.

    Raises HTTP 401 if the token is missing, expired, or tampered with.
    """
    try:
        # TODO: Decode credentials.credentials using SECRET_KEY and ALGORITHM
        # jwt.decode returns the payload dict
        payload = ...
        return payload

    except jwt.ExpiredSignatureError:
        # TODO: Raise HTTP 401 with detail "Token has expired"
        raise ...

    except jwt.InvalidTokenError:
        # TODO: Raise HTTP 401 with detail "Invalid token"
        raise ...`,
        hints: [
          '`jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])` — note the plural `algorithms`',
          'Catch `ExpiredSignatureError` separately so the client gets a clear expiry message',
          '`HTTPException(status_code=401, detail="...")` is the FastAPI way to return 4xx responses'
        ],
        expectedOutput: `Valid token → payload dict returned
Expired token → HTTP 401 "Token has expired"
Tampered token → HTTP 401 "Invalid token"`,
        solution: `from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")`
      },
      {
        title: 'Step 4: Wire Up the Login and Protected Routes',
        instruction: 'WHY: FastAPI\'s dependency injection (`Depends`) cleanly separates authentication from business logic. Any route that declares `Depends(verify_token)` will reject unauthenticated requests before your handler runs — with zero repetition across routes. HOW: Create a /login endpoint that issues a token and a /protected endpoint that requires one.',
        starterCode: `from fastapi import FastAPI

app = FastAPI()

# TODO: POST /login
# Accept a query parameter: username: str
# Return {"access_token": <signed JWT with sub=username>, "token_type": "bearer"}

# TODO: GET /protected
# Use Depends(verify_token) to require authentication
# Return {"message": "Hello {username}"} using payload["sub"]`,
        hints: [
          'Query params are declared as plain function arguments: `async def login(username: str)`',
          'Inject the token payload with `payload: dict = Depends(verify_token)`',
          'Test with curl: first POST /login to get a token, then GET /protected with `Authorization: Bearer <token>`'
        ],
        expectedOutput: `POST /login?username=alice
→ 200 {"access_token":"eyJ...","token_type":"bearer"}

GET /protected  (with valid token)
→ 200 {"message":"Hello alice"}

GET /protected  (no token)
→ 403 Forbidden`,
        solution: `from fastapi import FastAPI

app = FastAPI()

@app.post("/login")
async def login(username: str):
    token = create_token({"sub": username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
async def protected_route(payload: dict = Depends(verify_token)):
    return {"message": f"Hello {payload['sub']}"}`
      },
      {
        title: 'Step 5: Run and Test the Full Authentication Flow',
        instruction: 'WHY: Testing the complete login → token → protected-route flow end-to-end confirms that all pieces integrate correctly. Using curl (or the Swagger UI) to verify the 401 and 200 responses gives you confidence the security boundary is working before you connect a real user store. HOW: Start the server, issue a token, and exercise all three security cases.',
        starterCode: `# Save as main.py and run: uvicorn main:app --reload
# Then test with curl:

# 1. Get a token
# curl -X POST "http://localhost:8000/login?username=alice"

# 2. Copy the access_token value, then call the protected route:
# curl -H "Authorization: Bearer <YOUR_TOKEN>" http://localhost:8000/protected

# 3. Test with an invalid token:
# curl -H "Authorization: Bearer tampered.token.here" http://localhost:8000/protected

# TODO: Add a /me endpoint that returns the full decoded payload
# (all claims, not just sub) for debugging in development`,
        hints: [
          'The Swagger UI at /docs has a built-in "Authorize" button — paste the Bearer token there to test interactively',
          'Decode a token without verifying it using `jwt.decode(..., options={"verify_signature": False})` for debugging only',
          'In production, replace SECRET_KEY with `os.environ["JWT_SECRET"]` and rotate it on a schedule'
        ],
        expectedOutput: `# Step 1
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","token_type":"bearer"}

# Step 2
{"message":"Hello alice"}

# Step 3
{"detail":"Invalid token"}`,
        solution: `# Complete main.py
import jwt
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import uvicorn

SECRET_KEY = "change-me-in-production"
ALGORITHM = "HS256"
security = HTTPBearer()

app = FastAPI(title="JWT Auth Demo")

def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        return jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/login")
async def login(username: str):
    return {"access_token": create_token({"sub": username}), "token_type": "bearer"}

@app.get("/protected")
async def protected_route(payload: dict = Depends(verify_token)):
    return {"message": f"Hello {payload['sub']}"}

@app.get("/me")
async def me(payload: dict = Depends(verify_token)):
    return {"payload": payload}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      }
    ]
  },

  // ============================================================
  // be-lab-5 — converted from codeSandboxExamples be-4
  // Database Migration Script
  // ============================================================
  {
    id: 'be-lab-5',
    roleId: 'backend-developer',
    level: 'mid',
    title: 'Database Migration Runner',
    description: 'Build a lightweight database migration runner that tracks which schema changes have been applied, supports forward and rollback operations, and wraps every change in a transaction. You will learn why versioned migrations are essential for reliable deployments and how the same pattern underlies production tools like Alembic and Flyway.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing backend code, ensure your development environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and access to SQLite (built-in). No additional packages are required for this lab. Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'SQLite is included with Python — verify with `python -c "import sqlite3; print(sqlite3.sqlite_version)"`'
        ],
        expectedOutput: `Python 3.12.x
SQLite 3.x.x (built-in)`,
        solution: null
      },
      {
        title: 'Step 2: Create the Migration Tracking Table',
        instruction: 'WHY: Every migration system needs a way to remember which migrations have already been applied. Without a tracking table you cannot know whether to run or skip a migration on a given environment — leading to "table already exists" errors in production. HOW: Build the `MigrationRunner.__init__` and `_ensure_migration_table` methods.',
        starterCode: `import sqlite3
from datetime import datetime

class MigrationRunner:
    """A lightweight migration runner for SQLite."""

    def __init__(self, db_path: str):
        # TODO: Open the SQLite connection and create a cursor
        self.conn = ...
        self.cursor = ...
        self._ensure_migration_table()

    def _ensure_migration_table(self):
        """Create the schema_migrations tracking table if it doesn't exist."""
        # TODO: Execute CREATE TABLE IF NOT EXISTS schema_migrations
        # Columns: id (PK autoincrement), name TEXT UNIQUE NOT NULL, applied_at TEXT NOT NULL
        ...
        self.conn.commit()

    def close(self):
        self.conn.close()

# Test it
runner = MigrationRunner(":memory:")  # use in-memory DB for testing
runner.cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
print("Tables:", [r[0] for r in runner.cursor.fetchall()])
runner.close()`,
        hints: [
          'Use `sqlite3.connect(db_path)` — pass `":memory:"` for a temporary in-memory database during testing',
          'The `UNIQUE` constraint on `name` prevents the same migration from being recorded twice',
          '`AUTOINCREMENT` is only needed if you must guarantee no id reuse after deletions — `PRIMARY KEY` alone is usually sufficient'
        ],
        expectedOutput: `Tables: ['schema_migrations']`,
        solution: `import sqlite3
from datetime import datetime

class MigrationRunner:
    def __init__(self, db_path: str):
        self.conn = sqlite3.connect(db_path)
        self.cursor = self.conn.cursor()
        self._ensure_migration_table()

    def _ensure_migration_table(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT    NOT NULL UNIQUE,
                applied_at TEXT    NOT NULL
            )
        """)
        self.conn.commit()

    def close(self):
        self.conn.close()

runner = MigrationRunner(":memory:")
runner.cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
print("Tables:", [r[0] for r in runner.cursor.fetchall()])
runner.close()`
      },
      {
        title: 'Step 3: Implement is_applied and apply',
        instruction: 'WHY: Idempotent migrations — migrations that are safe to attempt multiple times — are essential for CI/CD pipelines where deployments may be re-run. The `is_applied` guard makes every migration idempotent. Wrapping the SQL execution in a transaction means a half-applied migration either fully succeeds or fully rolls back, never leaving the schema in a corrupt intermediate state. HOW: Add the `is_applied` and `apply` methods to `MigrationRunner`.',
        starterCode: `    def is_applied(self, name: str) -> bool:
        """Return True if the migration has already been applied."""
        # TODO: Query schema_migrations WHERE name = ?
        # Return True if a row exists, False otherwise
        ...

    def apply(self, name: str, up_sql: str) -> None:
        """Apply a migration if it has not been run yet."""
        if self.is_applied(name):
            print(f"  SKIP  {name}")
            return

        try:
            # TODO: Execute the up_sql using executescript
            # TODO: Record the migration in schema_migrations with the current UTC timestamp
            # TODO: Commit the transaction
            ...
            print(f"  UP    {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise`,
        hints: [
          '`self.cursor.execute("SELECT 1 FROM schema_migrations WHERE name = ?", (name,))` then `.fetchone() is not None`',
          '`executescript` runs multiple SQL statements separated by semicolons — use it for DDL like CREATE TABLE',
          'Record the timestamp with `datetime.utcnow().isoformat()` so the history is human-readable'
        ],
        expectedOutput: `  UP    001_create_users
  SKIP  001_create_users  (second run)`,
        solution: `    def is_applied(self, name: str) -> bool:
        self.cursor.execute(
            "SELECT 1 FROM schema_migrations WHERE name = ?", (name,)
        )
        return self.cursor.fetchone() is not None

    def apply(self, name: str, up_sql: str) -> None:
        if self.is_applied(name):
            print(f"  SKIP  {name}")
            return
        try:
            self.cursor.executescript(up_sql)
            self.cursor.execute(
                "INSERT INTO schema_migrations (name, applied_at) VALUES (?, ?)",
                (name, datetime.utcnow().isoformat())
            )
            self.conn.commit()
            print(f"  UP    {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise`
      },
      {
        title: 'Step 4: Add Rollback Support',
        instruction: 'WHY: Deployments fail. A rollback method lets you undo a migration surgically — removing just the latest change without wiping the entire database. This is standard practice in professional teams: every migration ships with a matching `down_sql` that reverses its effect. HOW: Implement the `rollback` method and wire it to a down-migration.',
        starterCode: `    def rollback(self, name: str, down_sql: str) -> None:
        """Roll back a previously applied migration."""
        if not self.is_applied(name):
            print(f"  SKIP  {name} (not applied)")
            return

        try:
            # TODO: Execute down_sql using executescript
            # TODO: Remove the migration record from schema_migrations
            # TODO: Commit
            ...
            print(f"  DOWN  {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise

# Test the full up → down cycle
runner = MigrationRunner(":memory:")
runner.apply(
    "001_create_users",
    "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT);"
)
runner.rollback(
    "001_create_users",
    "DROP TABLE IF EXISTS users;"
)
# Rolling back again should print SKIP
runner.rollback(
    "001_create_users",
    "DROP TABLE IF EXISTS users;"
)
runner.close()`,
        hints: [
          '`DELETE FROM schema_migrations WHERE name = ?` removes the tracking record',
          'After rollback, `is_applied` should return False so re-applying works correctly',
          'SQLite does not support `DROP COLUMN` easily — the workaround is to recreate the table; document this in your down_sql comments'
        ],
        expectedOutput: `  UP    001_create_users
  DOWN  001_create_users
  SKIP  001_create_users (not applied)`,
        solution: `    def rollback(self, name: str, down_sql: str) -> None:
        if not self.is_applied(name):
            print(f"  SKIP  {name} (not applied)")
            return
        try:
            self.cursor.executescript(down_sql)
            self.cursor.execute(
                "DELETE FROM schema_migrations WHERE name = ?", (name,)
            )
            self.conn.commit()
            print(f"  DOWN  {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise

runner = MigrationRunner(":memory:")
runner.apply(
    "001_create_users",
    "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT);"
)
runner.rollback("001_create_users", "DROP TABLE IF EXISTS users;")
runner.rollback("001_create_users", "DROP TABLE IF EXISTS users;")
runner.close()`
      },
      {
        title: 'Step 5: Run a Full Migration Sequence',
        instruction: 'WHY: Production databases evolve through many sequential migrations. Running them as an ordered list — and skipping any already applied — lets you deploy the same migration set idempotently across development, staging, and production environments. HOW: Define a migrations list and run them all forward, then add a new migration to simulate a schema extension.',
        starterCode: `# Define your migrations as (name, up_sql, down_sql) tuples
migrations = [
    (
        "001_create_users",
        "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL);",
        "DROP TABLE IF EXISTS users;"
    ),
    (
        "002_add_created_at",
        "ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP;",
        None  # SQLite limitation: ALTER TABLE DROP COLUMN not supported
    ),
    # TODO: Add "003_create_posts"
    # up_sql: CREATE TABLE posts with id, user_id (foreign key), title, body
    # down_sql: DROP TABLE IF EXISTS posts;
]

runner = MigrationRunner("app.db")
print("=== Running migrations ===")
for name, up, down in migrations:
    runner.apply(name, up)

print("\\n=== Running again (all should SKIP) ===")
for name, up, down in migrations:
    runner.apply(name, up)

runner.close()`,
        hints: [
          'Foreign keys in SQLite: `user_id INTEGER NOT NULL REFERENCES users(id)` — enable enforcement with `PRAGMA foreign_keys = ON`',
          'Number migrations with zero-padded prefixes (001, 002) so they sort lexicographically in the correct order',
          'Delete `app.db` between test runs to start with a clean state: `import os; os.remove("app.db")`'
        ],
        expectedOutput: `=== Running migrations ===
  UP    001_create_users
  UP    002_add_created_at
  UP    003_create_posts

=== Running again (all should SKIP) ===
  SKIP  001_create_users
  SKIP  002_add_created_at
  SKIP  003_create_posts`,
        solution: `import sqlite3
import os
from datetime import datetime

class MigrationRunner:
    def __init__(self, db_path):
        self.conn = sqlite3.connect(db_path)
        self.cursor = self.conn.cursor()
        self._ensure_migration_table()

    def _ensure_migration_table(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS schema_migrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                applied_at TEXT NOT NULL
            )
        """)
        self.conn.commit()

    def is_applied(self, name):
        self.cursor.execute("SELECT 1 FROM schema_migrations WHERE name = ?", (name,))
        return self.cursor.fetchone() is not None

    def apply(self, name, up_sql):
        if self.is_applied(name):
            print(f"  SKIP  {name}")
            return
        try:
            self.cursor.executescript(up_sql)
            self.cursor.execute(
                "INSERT INTO schema_migrations (name, applied_at) VALUES (?, ?)",
                (name, datetime.utcnow().isoformat())
            )
            self.conn.commit()
            print(f"  UP    {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise

    def rollback(self, name, down_sql):
        if not self.is_applied(name):
            print(f"  SKIP  {name} (not applied)")
            return
        try:
            self.cursor.executescript(down_sql)
            self.cursor.execute("DELETE FROM schema_migrations WHERE name = ?", (name,))
            self.conn.commit()
            print(f"  DOWN  {name}")
        except Exception as e:
            self.conn.rollback()
            print(f"  FAIL  {name}: {e}")
            raise

    def close(self):
        self.conn.close()

migrations = [
    (
        "001_create_users",
        "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL);",
        "DROP TABLE IF EXISTS users;"
    ),
    (
        "002_add_created_at",
        "ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP;",
        None
    ),
    (
        "003_create_posts",
        """CREATE TABLE posts (
            id      INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title   TEXT    NOT NULL,
            body    TEXT    NOT NULL
        );""",
        "DROP TABLE IF EXISTS posts;"
    ),
]

if os.path.exists("app.db"):
    os.remove("app.db")

runner = MigrationRunner("app.db")
print("=== Running migrations ===")
for name, up, down in migrations:
    runner.apply(name, up)

print("\\n=== Running again (all should SKIP) ===")
for name, up, down in migrations:
    runner.apply(name, up)

runner.close()`
      }
    ]
  },

  // ============================================================
  // be-lab-6 — converted from codeSandboxExamples be-5
  // Rate Limiter Middleware
  // ============================================================
  {
    id: 'be-lab-6',
    roleId: 'backend-developer',
    level: 'senior',
    title: 'Sliding-Window Rate Limiter Middleware',
    description: 'Implement a sliding-window rate limiter as FastAPI ASGI middleware that tracks requests per client IP, returns standard rate-limit headers, and responds with HTTP 429 when a client exceeds the limit. You will learn why rate limiting is a fundamental reliability and security control, and how the sliding-window algorithm provides a smoother limit than the simpler fixed-window approach.',
    estimatedMinutes: 30,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing backend code, ensure your development environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+, FastAPI, Uvicorn, and Starlette (installed automatically with FastAPI). Complete all setup steps and verify your environment before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `pip install fastapi uvicorn` — Starlette is a FastAPI dependency and installs automatically',
          'Verify with `python -c "from starlette.middleware.base import BaseHTTPMiddleware; print(\'ok\')"`'
        ],
        expectedOutput: `Python 3.12.x
fastapi installed
starlette BaseHTTPMiddleware: ok`,
        solution: null
      },
      {
        title: 'Step 2: Implement the Sliding-Window RateLimiter',
        instruction: 'WHY: The sliding-window algorithm keeps a list of timestamps for each client. When a request arrives, timestamps older than the window are pruned (cleanup), then the remaining count is compared to the limit. Unlike a fixed-window counter, this prevents a burst of requests at the window boundary from doubling the effective limit. HOW: Build the `RateLimiter` class with `_cleanup` and `is_allowed` methods.',
        starterCode: `import time
from collections import defaultdict

class RateLimiter:
    """Sliding-window rate limiter backed by in-memory storage."""

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        # key (e.g. IP address) -> list of request timestamps (float)
        self.requests: dict[str, list[float]] = defaultdict(list)

    def _cleanup(self, key: str) -> None:
        """Remove timestamps that fall outside the current sliding window."""
        # TODO: Calculate the cutoff time (now - window_seconds)
        # TODO: Keep only timestamps AFTER the cutoff
        cutoff = ...
        self.requests[key] = [ts for ts in self.requests[key] if ts > cutoff]

    def is_allowed(self, key: str) -> tuple[bool, dict]:
        """Return (allowed, headers) where headers contain X-RateLimit-* values."""
        self._cleanup(key)
        current_count = len(self.requests[key])

        # TODO: If current_count >= max_requests, return (False, headers)
        # Headers: X-RateLimit-Limit, X-RateLimit-Remaining: "0", Retry-After (seconds)
        # Retry-After = time when the oldest request in the window expires

        # TODO: Otherwise, record the current timestamp and return (True, headers)
        # Headers: X-RateLimit-Limit, X-RateLimit-Remaining (max - count - 1)`,
        hints: [
          '`time.time()` returns the current Unix timestamp as a float',
          'Retry-After: `self.requests[key][0] + self.window_seconds - time.time()` — round up with `int(...) + 1`',
          'All header values must be strings — wrap numbers in `str()`'
        ],
        expectedOutput: `First 3 requests → (True, {"X-RateLimit-Limit": "3", "X-RateLimit-Remaining": "2"/"1"/"0"})
4th request → (False, {"X-RateLimit-Limit": "3", "X-RateLimit-Remaining": "0", "Retry-After": "..."})`,
        solution: `import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: dict[str, list[float]] = defaultdict(list)

    def _cleanup(self, key: str) -> None:
        cutoff = time.time() - self.window_seconds
        self.requests[key] = [ts for ts in self.requests[key] if ts > cutoff]

    def is_allowed(self, key: str) -> tuple[bool, dict]:
        self._cleanup(key)
        current_count = len(self.requests[key])
        remaining = max(0, self.max_requests - current_count)

        if current_count >= self.max_requests:
            retry_after = self.requests[key][0] + self.window_seconds - time.time()
            return False, {
                "X-RateLimit-Limit": str(self.max_requests),
                "X-RateLimit-Remaining": "0",
                "Retry-After": str(int(retry_after) + 1),
            }

        self.requests[key].append(time.time())
        return True, {
            "X-RateLimit-Limit": str(self.max_requests),
            "X-RateLimit-Remaining": str(remaining - 1),
        }`
      },
      {
        title: 'Step 3: Build the ASGI Middleware',
        instruction: 'WHY: ASGI middleware intercepts every request before it reaches any route handler. Implementing rate limiting at the middleware layer means it applies uniformly across all endpoints with a single `add_middleware` call — no per-route decoration needed, and it cannot be accidentally omitted on a new endpoint. HOW: Subclass `BaseHTTPMiddleware` and implement the `dispatch` method.',
        starterCode: `from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class RateLimitMiddleware(BaseHTTPMiddleware):
    """FastAPI middleware that applies per-IP sliding-window rate limiting."""

    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        # TODO: Create a RateLimiter instance with the given params
        self.limiter = ...

    async def dispatch(self, request: Request, call_next):
        # TODO: Extract the client IP from request.client.host
        client_ip = ...

        # TODO: Call self.limiter.is_allowed(client_ip)
        allowed, headers = ...

        if not allowed:
            # TODO: Return a JSONResponse with status 429
            # body: {"detail": "Too many requests. Please slow down."}
            # Add all rate-limit headers to the response
            ...

        # TODO: Call call_next(request) to forward to the route handler
        # Add the rate-limit headers to the successful response too
        response = await call_next(request)
        for key, value in headers.items():
            response.headers[key] = value
        return response`,
        hints: [
          '`request.client.host` returns the client IP string (e.g., "127.0.0.1")',
          'For the 429 response: `JSONResponse(status_code=429, content={...})`',
          'Add headers to a JSONResponse via `response.headers[key] = value` after construction'
        ],
        expectedOutput: `Allowed request → 200 + X-RateLimit-* headers
Rate-limited request → 429 {"detail":"Too many requests. Please slow down."} + Retry-After header`,
        solution: `from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.limiter = RateLimiter(max_requests, window_seconds)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        allowed, headers = self.limiter.is_allowed(client_ip)

        if not allowed:
            response = JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please slow down."}
            )
            for key, value in headers.items():
                response.headers[key] = value
            return response

        response = await call_next(request)
        for key, value in headers.items():
            response.headers[key] = value
        return response`
      },
      {
        title: 'Step 4: Wire the Middleware to a FastAPI App',
        instruction: 'WHY: `add_middleware` registers the middleware in the ASGI stack. The order matters — middleware added last wraps the outermost layer (runs first on the way in, last on the way out). Setting a low limit (e.g., 10 requests per minute) is safe for development testing; production limits are typically per-route and configured via environment variables. HOW: Create the FastAPI app, add the middleware, and define two test routes.',
        starterCode: `from fastapi import FastAPI

# TODO: Create the FastAPI app
app = FastAPI()

# TODO: Add RateLimitMiddleware with max_requests=10, window_seconds=60
app.add_middleware(...)

# TODO: Add GET / that returns {"message": "Hello, you are within the rate limit!"}

# TODO: Add GET /health that returns {"status": "ok"}`,
        hints: [
          '`app.add_middleware(RateLimitMiddleware, max_requests=10, window_seconds=60)` passes kwargs to `__init__`',
          'Test locally by sending 11 rapid requests: `for i in {1..11}; do curl -s http://localhost:8000/ | python -m json.tool; done`',
          'Check the response headers for X-RateLimit-Remaining to watch the counter decrease'
        ],
        expectedOutput: `GET / (requests 1-10) → 200 {"message":"Hello, you are within the rate limit!"}
GET / (request 11)   → 429 {"detail":"Too many requests. Please slow down."}
Response headers include X-RateLimit-Limit, X-RateLimit-Remaining`,
        solution: `from fastapi import FastAPI

app = FastAPI()
app.add_middleware(RateLimitMiddleware, max_requests=10, window_seconds=60)

@app.get("/")
async def root():
    return {"message": "Hello, you are within the rate limit!"}

@app.get("/health")
async def health():
    return {"status": "ok"}`
      },
      {
        title: 'Step 5: Run and Stress-Test the Rate Limiter',
        instruction: 'WHY: Observing the rate limiter under load confirms the sliding-window logic works correctly and the headers communicate the correct state to clients. Seeing the `Retry-After` header tells you exactly when a client can retry — a professional API contract that enables exponential backoff in client code. HOW: Start the server and send a burst of requests to trigger the 429 response.',
        starterCode: `# Save as main.py and run: uvicorn main:app --reload
# Then test with a bash loop (macOS / Linux):

# curl loop — watch X-RateLimit-Remaining decrease to 0
# for i in $(seq 1 12); do
#   echo -n "Request $i: "
#   curl -si http://localhost:8000/ | grep -E "HTTP|X-Rate|Retry|detail"
# done

# TODO: Modify the middleware to skip rate limiting for the /health endpoint
# (health checks should never be rate-limited — they need to reach the server
# to prove it is alive, even during a traffic spike)

# BONUS: How would you replace the in-memory dict with Redis?
# Hint: use a Redis sorted set with timestamps as scores per key`,
        hints: [
          'To exempt /health: check `if request.url.path == "/health": return await call_next(request)` at the top of `dispatch`',
          'For Redis: `redis.zadd(key, {str(now): now})` then `redis.zremrangebyscore(key, 0, cutoff)` then `redis.zcard(key)`',
          'Set a Redis key TTL equal to the window so memory is freed automatically when the window expires'
        ],
        expectedOutput: `Request 1:  HTTP/1.1 200 OK  X-RateLimit-Remaining: 9
Request 2:  HTTP/1.1 200 OK  X-RateLimit-Remaining: 8
...
Request 10: HTTP/1.1 200 OK  X-RateLimit-Remaining: 0
Request 11: HTTP/1.1 429 Too Many Requests  Retry-After: 58`,
        solution: `# Complete main.py — run with: uvicorn main:app --reload
import time
from collections import defaultdict
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import uvicorn

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: dict[str, list[float]] = defaultdict(list)

    def _cleanup(self, key: str) -> None:
        cutoff = time.time() - self.window_seconds
        self.requests[key] = [ts for ts in self.requests[key] if ts > cutoff]

    def is_allowed(self, key: str) -> tuple[bool, dict]:
        self._cleanup(key)
        current_count = len(self.requests[key])
        remaining = max(0, self.max_requests - current_count)

        if current_count >= self.max_requests:
            retry_after = self.requests[key][0] + self.window_seconds - time.time()
            return False, {
                "X-RateLimit-Limit": str(self.max_requests),
                "X-RateLimit-Remaining": "0",
                "Retry-After": str(int(retry_after) + 1),
            }

        self.requests[key].append(time.time())
        return True, {
            "X-RateLimit-Limit": str(self.max_requests),
            "X-RateLimit-Remaining": str(remaining - 1),
        }

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.limiter = RateLimiter(max_requests, window_seconds)

    async def dispatch(self, request: Request, call_next):
        # Health checks are never rate-limited
        if request.url.path == "/health":
            return await call_next(request)

        client_ip = request.client.host
        allowed, headers = self.limiter.is_allowed(client_ip)

        if not allowed:
            response = JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please slow down."}
            )
            for key, value in headers.items():
                response.headers[key] = value
            return response

        response = await call_next(request)
        for key, value in headers.items():
            response.headers[key] = value
        return response

app = FastAPI(title="Rate Limiter Demo")
app.add_middleware(RateLimitMiddleware, max_requests=10, window_seconds=60)

@app.get("/")
async def root():
    return {"message": "Hello, you are within the rate limit!"}

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      }
    ]
  }
];
