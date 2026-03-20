# Backend Developer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Backend Developer learning path.

---

## RESTful API Design – Resources, Verbs and Status Codes

Designing a RESTful API well is different from simply making one that works. A well-designed REST API is predictable, consistent and easy for other developers to consume without reading extensive documentation. It treats server-managed entities as resources, uses URLs to identify those resources, and relies on standard HTTP verbs and status codes to communicate intent and outcome.

Resources should be nouns, not verbs. The URL `/orders` refers to the collection of orders; `/orders/42` refers to the specific order with identifier 42. Actions are expressed through HTTP methods, not embedded in the path (avoid `/createOrder`).

**Code walkthrough:**

```python
# Step 1: Define SQLAlchemy models with relationships
# Why: models map Python classes to database tables and express relationships
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import DeclarativeBase, relationship, Session

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    # Why: relationship() lets you access user.orders as a Python list
    orders = relationship("Order", back_populates="user", lazy="selectin")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product = Column(String, nullable=False)
    quantity = Column(Integer, default=1)
    # Why: back_populates keeps both sides of the relationship in sync
    user = relationship("User", back_populates="orders")

# Step 2: RESTful CRUD with proper status codes and pagination
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    email: EmailStr
    name: str

@app.get("/users")
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    # Why: pagination prevents returning millions of rows in one response
    # In production, use a database session here
    return {"skip": skip, "limit": limit, "data": []}

@app.post("/users", status_code=201)
async def create_user(payload: UserCreate):
    return {"id": 1, **payload.model_dump()}

@app.get("/users/{user_id}/orders")
async def get_user_orders(user_id: int):
    # Why: nested resource — orders belong to a user, one level deep
    return {"user_id": user_id, "orders": []}
```

**Why it matters:** A consistent, well-structured API reduces integration bugs, lowers the cognitive load for API consumers and makes the system easier to evolve over time. Poorly designed APIs accumulate workarounds and undocumented conventions that slow down every team that integrates with them.

**Key things to understand:**

- Use plural nouns for collection endpoints: `/users`, `/products`, `/invoices`
- Map CRUD operations to methods: GET (read), POST (create), PUT (full replacement update), PATCH (partial update), DELETE (remove)
- Return meaningful status codes: 200 for successful reads, 201 for successful creates (include a `Location` header pointing to the new resource), 204 for successful deletes with no body, 400 for validation errors, 404 for missing resources, 409 for conflicts, 422 for semantically invalid input
- Nest resources only one level deep to avoid overly complex URLs: `/orders/42/items` is fine; `/orders/42/items/7/details/history` is not
- Design for the consumer: include only the fields the client needs, avoid leaking internal implementation details in field names

**Common pitfalls:**

- Using GET requests that modify server state; GET must be safe and idempotent.
- Returning a 200 with an error message in the body instead of an appropriate 4xx or 5xx status code.
- Inconsistent naming conventions across endpoints (camelCase in some fields, snake_case in others).
- Designing endpoints around your database tables rather than the domain concepts your consumers care about.

---

## API Versioning and Documentation

As an API evolves, you will need to make changes that could break existing consumers. API versioning is the practice of managing those changes so that existing clients continue to work while new clients can take advantage of improvements.

Documentation is the contract between the API and its consumers. Without accurate, up-to-date documentation, consumers cannot integrate reliably, and your team will spend time answering questions that the docs should answer.

**Code walkthrough:**

```python
# Step 1: API versioning via URL path prefix
# Why: versioning lets you evolve the API without breaking existing clients
from fastapi import FastAPI, APIRouter

app = FastAPI(title="Order Service", version="2.0.0")

# Step 2: Group endpoints by version using routers
# Why: routers keep each version's code isolated and maintainable
v1_router = APIRouter(prefix="/v1")
v2_router = APIRouter(prefix="/v2")

@v1_router.get("/orders/{order_id}")
async def get_order_v1(order_id: int):
    """V1 returns a flat structure — kept for backward compatibility."""
    return {"order_id": order_id, "product": "Widget", "qty": 3}

@v2_router.get("/orders/{order_id}")
async def get_order_v2(order_id: int):
    """V2 returns a richer structure with nested line items."""
    # Why: adding fields or nesting is a non-breaking change in a new version
    return {
        "order_id": order_id,
        "line_items": [{"product": "Widget", "qty": 3, "unit_price": 9.99}],
        "total": 29.97,
    }

app.include_router(v1_router)
app.include_router(v2_router)

# Step 3: OpenAPI schema is generated automatically by FastAPI
# Why: /docs (Swagger UI) and /openapi.json let consumers explore the API
# without reading separate documentation — docs and code stay in sync
# Visit http://localhost:8000/docs after starting the server
```

**Why it matters:** Breaking changes in a published API break every consumer simultaneously. A versioning strategy and clear documentation are what allow a backend team to evolve a service without disrupting the teams and applications that depend on it.

**Key things to understand:**

- Common versioning strategies: URL path versioning (`/v1/users`), query parameter versioning (`?version=1`) and header versioning (`Accept: application/vnd.api.v1+json`); URL versioning is the most visible and easiest to test
- What constitutes a breaking change: removing a field, changing a field's type, changing a status code's meaning, removing an endpoint
- Non-breaking changes can be introduced without a version bump: adding new optional fields, adding new endpoints
- OpenAPI (formerly Swagger) is the standard for describing REST APIs in a machine-readable format; it enables automatic documentation generation, client code generation and contract testing
- Good documentation includes: endpoint URL and method, required and optional parameters, request body schema with examples, response schemas for each status code, authentication requirements

**Common pitfalls:**

- Incrementing the version number for every small change, fragmenting the API unnecessarily.
- Maintaining multiple versions indefinitely without a deprecation and sunset policy.
- Writing documentation separately from the code so that the two drift apart; prefer generating docs from annotations or schema definitions in the code.
- Forgetting to document error responses, which are often the most important thing a consumer needs to handle.

---

## Relational Databases – Tables, Keys and Normalisation

A relational database organises data into tables (also called relations). Each table has a fixed set of columns, each with a defined data type, and stores data in rows. Relationships between tables are expressed through keys.

A primary key uniquely identifies each row in a table. A foreign key is a column in one table that references the primary key of another, establishing a link between the two. Normalisation is the process of structuring tables to reduce redundancy and improve data integrity, typically by decomposing wide tables into smaller, focused ones connected by foreign keys.

**Code walkthrough:**

```python
# Step 1: Define a full SQLAlchemy model with relationships and constraints
# Why: the ORM maps Python classes to normalised tables with foreign keys
from sqlalchemy import (
    create_engine, Column, Integer, String, Numeric,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import DeclarativeBase, relationship, sessionmaker

class Base(DeclarativeBase):
    pass

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    # Why: relationship lets you traverse customer.orders in Python
    orders = relationship("Order", back_populates="customer")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    total = Column(Numeric(10, 2), nullable=False)
    # Why: an index on customer_id speeds up "all orders for customer X"
    __table_args__ = (Index("ix_orders_customer", "customer_id"),)
    customer = relationship("Customer", back_populates="orders")

# Step 2: Database migrations with Alembic (the standard tool for SQLAlchemy)
# Why: migrations version-control schema changes so every environment matches
# In terminal:
#   alembic init migrations
#   alembic revision --autogenerate -m "add customers and orders"
#   alembic upgrade head

# Step 3: Create engine and session
engine = create_engine("sqlite:///app.db", echo=True)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
```

**Why it matters:** A poorly designed schema creates compounding problems: duplicate data falls out of sync, queries become slow, and adding new features requires reworking the data model from scratch. Understanding normalisation, keys and indexes is what separates a schema that scales from one that causes constant production incidents.

**Key things to understand:**

- First Normal Form (1NF): each column holds atomic (indivisible) values; no repeating groups
- Second Normal Form (2NF): every non-key column depends on the whole primary key, not just part of it
- Third Normal Form (3NF): no non-key column depends on another non-key column (no transitive dependencies)
- Indexes allow the database engine to find rows matching a condition without scanning the entire table; they speed up reads at the cost of slightly slower writes and additional storage
- Foreign key constraints enforce referential integrity: you cannot insert a row that references a non-existent parent row, and you cannot delete a parent row that has dependent children (unless cascade rules are defined)
- Joins connect rows from different tables based on a matching condition

**Common pitfalls:**

- Over-normalising to the point where every query requires many joins, hurting read performance; sometimes deliberate denormalisation for read-heavy tables is the right trade-off.
- Forgetting to add indexes on columns used frequently in WHERE clauses or JOIN conditions.
- Using wide VARCHAR columns for everything rather than choosing appropriate types; types enforce data integrity and affect storage efficiency.
- Storing comma-separated values in a single column to avoid creating a related table; this violates 1NF and makes querying painful.

---

## SQL – Queries, Joins, Indexes and Transactions

SQL (Structured Query Language) is the standard language for interacting with relational databases. Despite many databases having proprietary extensions, the core SQL syntax is portable across PostgreSQL, MySQL, SQLite and others.

A backend developer uses SQL directly when writing migrations, debugging data issues or building queries that an ORM cannot express efficiently. Understanding SQL well also makes it easier to understand what an ORM is doing on your behalf.

**Code walkthrough:**

```python
# Step 1: Authentication middleware — validate JWT on every request
# Why: middleware centralises auth so you don't repeat it in every endpoint
from fastapi import FastAPI, Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "use-a-real-secret-from-env"
ALGORITHM = "HS256"

app = FastAPI()
bearer_scheme = HTTPBearer()

# Step 2: Create a JWT token with expiry and claims
# Why: JWTs are stateless — the server doesn't need a session store
def create_access_token(user_id: int, role: str) -> str:
    payload = {
        "sub": str(user_id),
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=30),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Step 3: Decode and validate the token
# Why: always verify signature, expiry, and claims server-side
def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Step 4: Dependency that extracts the current user from the token
from fastapi import Depends

async def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    return verify_token(creds.credentials)

@app.get("/me")
async def read_profile(user: dict = Depends(get_current_user)):
    # Why: Depends() injects the validated user into every protected route
    return {"user_id": user["sub"], "role": user["role"]}
```

**Why it matters:** SQL is the lingua franca of data. An inability to write correct, efficient queries is a constant drag on productivity — every feature that touches the database takes longer, and performance problems go undiagnosed because the engineer cannot read an execution plan.

**Key things to understand:**

- `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT` and how they compose; `WHERE` filters individual rows before grouping, `HAVING` filters groups after aggregation
- Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`
- Join types: `INNER JOIN` (returns only rows that match in both tables), `LEFT JOIN` (all rows from the left table plus matched rows from the right; unmatched right-side columns are NULL), `RIGHT JOIN` (the reverse), `FULL OUTER JOIN` (all rows from both tables)
- Subqueries and common table expressions (CTEs) using `WITH` for breaking complex queries into readable steps
- `INSERT`, `UPDATE` and `DELETE` statements; an `UPDATE` or `DELETE` without a `WHERE` clause modifies every row in the table — always double-check
- Transactions: wrap related statements in `BEGIN` / `COMMIT`; use `ROLLBACK` to undo on error; the ACID properties (Atomicity, Consistency, Isolation, Durability) define the guarantees a transaction provides
- Indexes: creating an index on a column used frequently in `WHERE` or `JOIN` conditions can reduce query time from seconds to milliseconds; each index adds overhead to `INSERT`, `UPDATE` and `DELETE`
- How to read a query execution plan (`EXPLAIN` / `EXPLAIN ANALYZE`) to understand whether indexes are being used and where the cost lies

**Common pitfalls:**

- Writing `SELECT *` in application code; always select only the columns you need to reduce data transfer and prevent breakage when columns are added or removed.
- N+1 query problems: loading a list of records and then issuing one additional query per record to fetch a related field; solve with a single query using a JOIN or a batched query.
- Not using parameterised queries; string-concatenating user input directly into SQL is the root cause of SQL injection vulnerabilities.
- Forgetting that `NULL` comparisons require `IS NULL` / `IS NOT NULL` rather than `= NULL`; `= NULL` always evaluates to unknown, never true.

---

## Web Security – OWASP Top 10 for Backend Developers

The Open Web Application Security Project (OWASP) publishes a regularly updated list of the ten most critical security risks for web applications. The OWASP Top 10 is updated periodically; always refer to the current list on the OWASP website. As a backend developer you are responsible for preventing these vulnerabilities in the code and infrastructure you write and configure.

Security is not a feature to be added at the end; it must be considered throughout design and development. A single exploited vulnerability can expose all user data, give attackers control of the server, or allow fraudulent transactions.

**Code walkthrough:**

```python
# Step 1: Async endpoint with Redis caching
# Why: caching avoids hitting the database for frequently requested data
from fastapi import FastAPI
import redis.asyncio as redis
import json

app = FastAPI()
cache = redis.from_url("redis://localhost:6379", decode_responses=True)

async def get_cached_or_fetch(key: str, fetch_fn, ttl: int = 300):
    """Check cache first; on miss, call fetch_fn and cache the result."""
    # Why: cache-aside pattern — the app controls when to read/write cache
    cached = await cache.get(key)
    if cached:
        return json.loads(cached)
    data = await fetch_fn()
    await cache.set(key, json.dumps(data), ex=ttl)  # expire after ttl seconds
    return data

async def fetch_product_from_db(product_id: int) -> dict:
    """Simulate an async database call."""
    # Why: async endpoints free the event loop while waiting on I/O
    return {"id": product_id, "name": "Widget", "price": 9.99}

@app.get("/products/{product_id}")
async def get_product(product_id: int):
    return await get_cached_or_fetch(
        key=f"product:{product_id}",
        fetch_fn=lambda: fetch_product_from_db(product_id),
        ttl=600,  # cache for 10 minutes
    )

# Step 2: Rate limiting — protect endpoints from abuse
# Why: without rate limits, attackers can brute-force login or overload the API
from fastapi import HTTPException

async def check_rate_limit(client_ip: str, limit: int = 60):
    key = f"rate:{client_ip}"
    current = await cache.incr(key)
    if current == 1:
        await cache.expire(key, 60)  # 60-second window
    if current > limit:
        raise HTTPException(status_code=429, detail="Too many requests")
```

**Why it matters:** The OWASP Top 10 represents the most commonly exploited vulnerability classes across real-world applications. Being familiar with each category and its mitigations means you can identify and prevent them during design and code review rather than discovering them after a breach.

**Key things to understand:**

- **A01 – Broken Access Control:** Users able to access resources or actions they should not; the most common critical finding. Enforce authorisation checks server-side on every request; never rely on the client to hide or restrict functionality.
- **A02 – Cryptographic Failures:** Transmitting or storing sensitive data (credentials, personal data, payment information) without adequate encryption; enforce HTTPS, hash passwords with bcrypt or Argon2, never store plaintext secrets, avoid weak or deprecated algorithms (MD5, SHA-1 for security purposes).
- **A03 – Injection:** Unsanitised user input interpreted as a command by a database (SQL injection), shell, or other interpreter; prevent with parameterised queries and strict input validation. SQL injection remains one of the most damaging attack types.
- **A04 – Insecure Design:** Security flaws baked into the design of a system before a line of code is written; no amount of hardening fixes a fundamentally insecure design. Threat modelling and security requirements must be part of design, not an afterthought.
- **A05 – Security Misconfiguration:** Default credentials left in place, unnecessary services exposed, verbose error messages leaking stack traces to clients, missing security headers. Applies across every layer from the OS to the application.
- **A06 – Vulnerable and Outdated Components:** Outdated dependencies with published CVEs; use automated dependency scanning in CI (e.g., `npm audit`, `pip-audit`, Dependabot) and apply updates regularly.
- **A07 – Identification and Authentication Failures:** Weak session management, predictable tokens, missing rate limiting on login endpoints, allowing weak passwords. Use proven auth libraries rather than rolling your own.
- **A08 – Software and Data Integrity Failures:** Code and infrastructure pipelines that do not verify the integrity of software updates, CI/CD pipelines with insufficient access control, or deserialising untrusted data without validation.
- **A09 – Security Logging and Monitoring Failures:** Insufficient logging of authentication events, access control failures and high-value transactions; without logs, breaches go undetected. Avoid logging sensitive data (passwords, tokens).
- **A10 – Server-Side Request Forgery (SSRF):** The server makes HTTP requests to a URL supplied or influenced by the user, which can be used to reach internal services, cloud metadata endpoints or other infrastructure not intended to be public.

**Common pitfalls:**

- Treating security as a checklist to complete once rather than an ongoing practice.
- Over-relying on the framework to handle security automatically without understanding what it does and does not cover.
- Logging sensitive data (passwords, tokens, credit card numbers) in plain text, creating a secondary breach vector.

---

## Authentication and Authorisation – OAuth 2.0, JWT and Sessions

Authentication is the process of verifying who a user is. Authorisation is the process of deciding what an authenticated user is allowed to do. These are distinct concepts that are frequently conflated.

Session-based authentication stores a server-side session record after login and issues the client an opaque session cookie. Token-based authentication issues the client a signed token (typically a JWT) that encodes the user's identity and optionally their permissions; the server validates the token's signature on each request without looking up a server-side record.

**Code walkthrough:**

```python
# Step 1: File uploads with validation
# Why: file uploads need size and type checks to prevent abuse
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi import BackgroundTasks

app = FastAPI()

ALLOWED_TYPES = {"image/png", "image/jpeg", "application/pdf"}
MAX_SIZE_MB = 10

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = BackgroundTasks(),
):
    # Why: validate content type to prevent uploading executables
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, detail=f"Type {file.content_type} not allowed")

    contents = await file.read()
    if len(contents) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(400, detail="File too large")

    # Step 2: Background tasks — do slow work after returning the response
    # Why: the user shouldn't wait while we process the file
    background_tasks.add_task(process_upload, file.filename, contents)
    return {"filename": file.filename, "size": len(contents), "status": "processing"}

async def process_upload(filename: str, data: bytes):
    """Simulate slow processing (virus scan, thumbnail generation, etc.)."""
    import asyncio
    await asyncio.sleep(2)  # stands in for real processing
    print(f"Finished processing {filename} ({len(data)} bytes)")

# Step 3: Pagination helper — reusable across all list endpoints
# Why: pagination prevents loading millions of rows into memory
from pydantic import BaseModel
from typing import Generic, TypeVar, Sequence
T = TypeVar("T")

class Page(BaseModel, Generic[T]):
    items: Sequence[T]
    total: int
    page: int
    size: int
    pages: int
```

OAuth 2.0 is an authorisation framework — it defines how a user can grant a third-party application limited access to their account on another service without sharing their password. OAuth 2.0 is not an authentication protocol; it does not tell you who the user is, only that they have granted access. OpenID Connect (OIDC) is a thin identity layer built on top of OAuth 2.0 that adds authentication by introducing the ID token, which carries the user's identity. JWT (JSON Web Token) is a token format used by both OAuth 2.0 and OIDC — it is not a protocol itself.

**Why it matters:** Authentication and authorisation failures are the second most common cause of breaches after access control issues. Getting these right requires understanding the purpose and limits of each tool — using OAuth 2.0 for authentication without OIDC, or mishandling JWTs, creates serious security holes.

**Key things to understand:**

- JWT structure: header (specifies the signing algorithm), payload (claims such as `sub`, `exp`, `iat`, `roles`), signature (verified with a secret or public key); a JWT can be read by anyone — do not put sensitive data in the payload
- The difference between access tokens (short-lived, used to access protected resources) and refresh tokens (longer-lived, used to obtain new access tokens without re-authenticating)
- Why you should not store JWTs in `localStorage` on a web client; prefer `HttpOnly` cookies to reduce XSS exposure
- The OAuth 2.0 grant types and when to use each: Authorization Code with PKCE (web and native apps, the recommended flow), Client Credentials (machine-to-machine, no user involved), Implicit (deprecated — do not use)
- OpenID Connect adds an `id_token` to the OAuth 2.0 flow that contains the user's identity; this is what makes OIDC an authentication protocol
- Role-Based Access Control (RBAC): assigning permissions to roles rather than individual users; check roles on the server side on every request
- Always validate tokens server-side on every request; never trust a client that claims to be authenticated

**Common pitfalls:**

- Storing passwords in plain text or hashing them with a fast algorithm (MD5, SHA-1); use a dedicated password hashing algorithm with a work factor (bcrypt, Argon2).
- Using the same secret key across all environments; rotate secrets between environments and store production secrets in a secrets manager, not in code or environment files committed to version control.
- Not setting token expiry short enough; a compromised access token should have a limited window of usefulness.
- Confusing OAuth 2.0 (authorisation) with authentication; using an OAuth access token to identify a user without an OIDC ID token means you may be acting on an unverified identity.
- Confusing authentication middleware with authorisation; middleware may confirm a valid token without checking whether that user has permission for the specific resource being requested.

---

## GraphQL – Schema, Resolvers and When to Use It

GraphQL is an API query language and runtime developed by Meta. Rather than exposing a fixed set of endpoints each returning a fixed shape, GraphQL exposes a single endpoint and lets the client specify exactly which fields it needs. The server responds with precisely the requested data — no more, no less.

A GraphQL schema defines all the types, queries, mutations and subscriptions the API supports. Resolvers are the functions that fetch the actual data for each field in the schema. The schema is the contract; the resolvers are the implementation. By default, GraphQL APIs receive queries via HTTP POST requests to a single endpoint.

**Code walkthrough:**

```python
# Step 1: GraphQL schema with Strawberry (a modern Python GraphQL library)
# Why: Strawberry uses Python type hints — same philosophy as FastAPI
import strawberry
from typing import Optional

@strawberry.type
class User:
    id: int
    name: str
    email: str

@strawberry.type
class Order:
    id: int
    product: str
    quantity: int
    # Why: this resolver fetches the user only when the client asks for it
    @strawberry.field
    def user(self) -> User:
        # In production, use DataLoader to batch these calls
        return User(id=1, name="Alice", email="alice@example.com")

@strawberry.type
class Query:
    @strawberry.field
    def orders(self, limit: int = 10) -> list[Order]:
        # Why: the client specifies exactly which fields they need
        # Query: { orders(limit: 2) { id product user { name } } }
        return [Order(id=1, product="Widget", quantity=3)]

# Step 2: Mount GraphQL inside FastAPI
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

schema = strawberry.Schema(query=Query)
app = FastAPI()
app.include_router(GraphQLRouter(schema), prefix="/graphql")
# Why: /graphql is a single endpoint; the query in the POST body
# determines what data is returned — no over-fetching, no under-fetching
```

**Why it matters:** GraphQL solves specific problems — over-fetching (getting more data than you need) and under-fetching (needing to call multiple endpoints to build one screen) — that REST struggles with in complex, multi-client environments. Understanding when it is the right choice and what trade-offs it introduces prevents adopting it as a default when REST would be simpler.

**Key things to understand:**

- A query fetches data; a mutation modifies data; a subscription sets up a real-time event stream
- The schema is strongly typed; every field has a declared type, making the contract between client and server explicit and enabling powerful tooling
- GraphQL uses a single endpoint and typically sends all requests via HTTP POST; this means standard HTTP GET-based caching does not apply by default
- The N+1 problem is particularly acute in GraphQL because each field resolver runs independently; the DataLoader pattern batches and caches database calls to solve this
- Introspection allows clients to query the schema itself, enabling self-documented APIs and code generation
- GraphQL is not a replacement for REST in all cases; it shines when multiple clients (web, mobile) need different shapes of the same data and when you want to avoid over-fetching

**When to prefer REST over GraphQL:**

- Simple CRUD APIs with a small number of consumer types
- When HTTP caching is important (GraphQL queries over POST are not cached by default)
- When the team is small and the added complexity of schema management and resolver implementation is not justified

**Common pitfalls:**

- Exposing the entire data model through GraphQL without field-level authorisation, allowing clients to request data they should not access.
- Not implementing query depth or complexity limits, leaving the API vulnerable to expensive deeply nested queries.
- Treating GraphQL as always better than REST; the right tool depends on the problem.

---

## Docker – Containers, Images and Compose

Docker is a platform for packaging applications and their dependencies into containers. A container is an isolated process that runs on the host operating system's kernel — unlike a virtual machine, it does not include a full guest OS, making it much lighter. Containers have their own filesystem, network interface and process space. They solve the "it works on my machine" problem by ensuring the application runs in the same environment everywhere from a developer's laptop to production.

An image is the immutable blueprint for a container. It is built from a `Dockerfile` — a text file with instructions for assembling the filesystem layer by layer. A running instance of an image is a container. Because containers share the host OS kernel (rather than emulating hardware), they start in milliseconds and have negligible overhead compared to VMs.

**Code walkthrough:**

```dockerfile
# Step 1: Multi-stage build — keep the final image small and secure
# Why: the build stage installs compilers and dev tools the runtime doesn't need
FROM python:3.12-slim AS builder

WORKDIR /app
COPY requirements.txt .
# Why: install dependencies BEFORE copying code — Docker caches this layer
RUN pip install --no-cache-dir -r requirements.txt

# Step 2: Runtime stage — only what the application needs to run
FROM python:3.12-slim

WORKDIR /app
# Why: run as non-root to limit damage if the container is compromised
RUN adduser --disabled-password --no-create-home appuser

# Copy installed packages from the builder stage
COPY --from=builder /usr/local/lib/python3.12/site-packages \
     /usr/local/lib/python3.12/site-packages
COPY . .

# Step 3: Switch to non-root user before running the app
USER appuser
EXPOSE 8000

# Step 4: CMD defines the default command when the container starts
# Why: use exec form (JSON array) so signals reach the Python process
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# compose.yaml — define the full local dev environment
# Why: one command (docker compose up) starts the API, database, and cache
services:
  api:
    build: .
    ports: ["8000:8000"]
    environment:
      DATABASE_URL: postgresql://postgres:secret@db:5432/app
      REDIS_URL: redis://cache:6379
    depends_on: [db, cache]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes: [pgdata:/var/lib/postgresql/data]

  cache:
    image: redis:7-alpine

volumes:
  pgdata:
```

**Why it matters:** Containerisation is the standard unit of deployment in modern backend infrastructure. Understanding Docker is a prerequisite for working with any container orchestration platform (Kubernetes, ECS), for setting up consistent local development environments, and for writing CI/CD pipelines.

**Key things to understand:**

- `Dockerfile` instructions: `FROM` (base image), `WORKDIR`, `COPY`, `RUN` (execute a command during the image build), `EXPOSE`, `ENV`, `CMD` / `ENTRYPOINT` (command to run when the container starts)
- Image layers: each instruction in a Dockerfile creates a cached layer; put infrequently changing instructions (installing dependencies) before frequently changing ones (copying application code) for faster incremental builds
- Core CLI commands: `docker build`, `docker run`, `docker ps`, `docker logs`, `docker exec`, `docker stop`, `docker rm`
- Docker Compose defines a multi-container application in a `compose.yaml` file (the modern naming convention since Compose V2; older projects may still use `docker-compose.yml`); services reference each other by service name, which Docker resolves via an internal DNS
- Volumes persist data outside the container's writable layer; without a volume, data written inside a running container is lost when the container is removed
- Environment variables should be injected at runtime (via `-e` flags or `.env` files), not baked into the image, to keep the image portable across environments

**Common pitfalls:**

- Running containers as root; specify a non-root user in the Dockerfile to limit the blast radius of a container escape.
- Storing secrets (passwords, API keys) in the `Dockerfile` or as image layers; they become visible in the image history. Use runtime environment variables or a secrets manager.
- Building monolithic images with every tool installed rather than using multi-stage builds to keep the final image small and reduce the attack surface.
- Ignoring the `.dockerignore` file, causing large `node_modules`, `.git` directories or local config files to be copied into the build context unnecessarily.

---

## Testing – Unit Tests, Integration Tests and the Test Pyramid

Testing is the practice of verifying that your code behaves as expected. A unit test targets a single function or method in isolation — it calls the function with known inputs and asserts that the output matches what is expected. An integration test verifies that multiple components work together correctly: for example, that an API endpoint correctly reads from the database and returns the expected response.

The test pyramid is a model for balancing the types of tests you write. At the base are many fast, focused unit tests. Above those are fewer integration tests that verify component interactions. At the top are a small number of end-to-end tests that exercise the full system as a user would. The pyramid shape reflects the ideal ratio: many unit tests, fewer integration tests, even fewer end-to-end tests.

**Code walkthrough:**

```python
# Step 1: Unit test — test a single function in isolation
# Why: unit tests are fast, deterministic, and pinpoint failures precisely
import pytest

def calculate_discount(price: float, tier: str) -> float:
    """Apply discount based on customer tier."""
    rates = {"bronze": 0.05, "silver": 0.10, "gold": 0.20}
    return price * rates.get(tier, 0.0)

def test_gold_discount():
    assert calculate_discount(100.0, "gold") == 20.0

def test_unknown_tier_gets_no_discount():
    assert calculate_discount(100.0, "unknown") == 0.0

# Step 2: Integration test — test the API endpoint with a real HTTP call
# Why: integration tests verify that routing, validation, and DB work together
from fastapi.testclient import TestClient
from main import app  # your FastAPI application

client = TestClient(app)

def test_create_and_read_user():
    # Create
    resp = client.post("/users", json={"email": "a@b.com", "name": "A"})
    assert resp.status_code == 201
    user_id = resp.json()["id"]
    # Read back
    resp = client.get(f"/users/{user_id}")
    assert resp.status_code == 200
    assert resp.json()["email"] == "a@b.com"

# Step 3: Mocking — replace a real dependency with a controlled substitute
# Why: you don't want tests to call a real payment API
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
async def test_process_payment_success():
    with patch("services.payment.charge", new_callable=AsyncMock) as mock:
        mock.return_value = {"status": "ok", "transaction_id": "abc"}
        result = await process_payment(amount=50.0, card_token="tok_test")
        assert result["status"] == "ok"
        mock.assert_called_once_with(amount=50.0, card_token="tok_test")
```

**Why it matters:** Code without tests can only be verified by running it manually, which is slow, error-prone and does not scale. Tests catch regressions before they reach production, document the expected behaviour of the code and give developers the confidence to refactor without fear of breaking things they cannot see.

**Key things to understand:**

- Unit tests verify individual functions in isolation; they should be fast, deterministic and independent of external systems (databases, APIs, filesystems)
- Integration tests verify that components work together — for example, that a request to an API endpoint returns the correct response after interacting with a database
- pytest is the standard testing framework for Python; it uses simple `assert` statements, automatic test discovery and a powerful fixture system for setup and teardown
- Mocking replaces a real dependency (a database call, an HTTP request, a system clock) with a controlled substitute so the test can focus on the code under test without relying on external systems
- The test pyramid: many unit tests (fast, cheap, isolated), fewer integration tests (slower, test real interactions), even fewer end-to-end tests (slowest, most brittle, but closest to real user experience)
- Tests should be treated as production code: kept clean, well-named and maintained alongside the code they test

**Common pitfalls:**

- Writing tests that depend on execution order or shared mutable state; each test should set up its own preconditions and clean up after itself.
- Over-mocking to the point where the test only verifies that the mocks were called correctly, not that the code actually works.
- Writing only happy-path tests and ignoring edge cases, error conditions and boundary values.
- Treating slow or flaky tests as acceptable; a test suite that developers stop trusting is a test suite that stops being run.

---

## Error Handling and Logging

Error handling is the practice of anticipating, detecting and responding to problems that occur during program execution. In Python, this is done using `try`/`except` blocks that catch exceptions and allow the program to respond gracefully rather than crashing. Logging is the practice of recording events that happen during execution — requests received, actions taken, errors encountered — so that developers and operators can understand what the system is doing and diagnose problems after the fact.

**Code walkthrough:**

```python
# Step 1: Structured logging with Python's logging module
# Why: structured (JSON) logs can be searched, filtered, and aggregated
import logging
import json
import sys
from uuid import uuid4
from fastapi import FastAPI, Request

class JSONFormatter(logging.Formatter):
    """Emit each log record as a single JSON line."""
    def format(self, record):
        return json.dumps({
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "message": record.getMessage(),
            "service": "order-service",
            "trace_id": getattr(record, "trace_id", None),
        })

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JSONFormatter())
logger = logging.getLogger("app")
logger.addHandler(handler)
logger.setLevel(logging.INFO)

app = FastAPI()

# Step 2: Attach a trace ID to every request for cross-service correlation
# Why: when debugging, you need to find all logs for a single request
@app.middleware("http")
async def add_trace_id(request: Request, call_next):
    trace_id = request.headers.get("X-Trace-ID", str(uuid4()))
    logger.info("Request started", extra={"trace_id": trace_id})
    response = await call_next(request)
    response.headers["X-Trace-ID"] = trace_id
    return response

# Step 3: Catch specific exceptions — never use bare except
# Why: bare except swallows errors you didn't anticipate, hiding bugs
@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    try:
        order = await fetch_order(order_id)
        return order
    except OrderNotFoundError:
        logger.warning(f"Order {order_id} not found")
        raise HTTPException(status_code=404, detail="Order not found")
    except DatabaseConnectionError as exc:
        logger.error(f"DB connection failed: {exc}", exc_info=True)
        raise HTTPException(status_code=503, detail="Service unavailable")
```

**Why it matters:** Unhandled errors crash the application and produce unhelpful error messages for users. Missing or poorly structured logs make production incidents impossible to diagnose. Together, error handling and logging are what separate a service that can be operated and debugged from one that fails silently or noisily without giving anyone the information needed to fix it.

**Key things to understand:**

- Python's `try`/`except` blocks catch exceptions; catch specific exception types rather than bare `except:` to avoid silently swallowing unexpected errors
- Python's built-in `logging` module provides a standard way to emit log messages at different severity levels: `DEBUG` (detailed diagnostic information), `INFO` (confirmation that things are working), `WARNING` (something unexpected but not yet broken), `ERROR` (a failure that prevented an operation from completing), `CRITICAL` (a severe failure that may require the application to stop)
- Log what is useful for diagnosing problems: request identifiers, operation names, relevant entity IDs, error messages and stack traces
- Never log sensitive data: passwords, API keys, tokens, credit card numbers or personally identifiable information (PII) must not appear in logs
- Use structured logging (key-value pairs or JSON) rather than free-form strings so that logs can be searched, filtered and aggregated by log management tools
- Configure log levels appropriately per environment: `DEBUG` during local development, `INFO` or `WARNING` in production to avoid noise and performance overhead

**Common pitfalls:**

- Using bare `except:` or catching `Exception` too broadly, which hides bugs by swallowing errors the developer did not anticipate.
- Logging errors without enough context to reproduce the problem; "an error occurred" is not useful — include what operation failed, what input caused it and what the error was.
- Logging at `DEBUG` level in production without a way to adjust the level dynamically, flooding storage and degrading performance.
- Raising exceptions for expected control flow (e.g., using exceptions instead of a simple conditional check); exceptions should represent exceptional conditions.

---

## System Design Basics – Load Balancing, Caching and Queues

System design is the process of defining the architecture of a software system to meet functional requirements (what it does) and non-functional requirements (how reliably, how fast, at what scale). At the Mid level, understanding three fundamental building blocks — load balancers, caches and message queues — is essential.

A load balancer distributes incoming requests across multiple instances of a service. This improves availability (if one instance fails, the others continue serving traffic) and allows horizontal scaling (adding more instances to handle more load). A cache stores the result of an expensive operation (a database query, an external API call) so that subsequent requests for the same result can be served faster without repeating the work. A message queue decouples the component that produces work from the component that performs it: the producer places a message on the queue and continues without waiting; one or more consumers read from the queue and process messages at their own pace.

**Code walkthrough:**

```python
# Step 1: Cache-aside pattern with Redis
# Why: check cache first → on miss, fetch from DB → store in cache
import redis.asyncio as redis
import json

cache = redis.from_url("redis://localhost:6379", decode_responses=True)

async def get_product(product_id: int) -> dict:
    cache_key = f"product:{product_id}"
    # Step 2: Try the cache first
    cached = await cache.get(cache_key)
    if cached:
        return json.loads(cached)  # cache hit — skip the database

    # Step 3: Cache miss — fetch from the database
    product = await db.fetch_product(product_id)  # slow I/O
    # Store in cache with a TTL so stale data expires automatically
    await cache.set(cache_key, json.dumps(product), ex=300)
    return product

# Step 4: Message queue — decouple producer from consumer
# Why: the API returns immediately; heavy work happens asynchronously
import pika  # RabbitMQ client

def publish_order_event(order_id: int):
    """Producer: place a message on the queue and return."""
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()
    channel.queue_declare(queue="order_events", durable=True)
    channel.basic_publish(
        exchange="",
        routing_key="order_events",
        body=json.dumps({"order_id": order_id, "action": "created"}),
        properties=pika.BasicProperties(delivery_mode=2),  # persistent
    )
    connection.close()

# Step 5: Consumer — processes messages at its own pace
def consume_orders():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()
    # Why: auto_ack=False means the message stays in the queue until we
    # explicitly acknowledge it — safe retry if the consumer crashes
    def callback(ch, method, properties, body):
        event = json.loads(body)
        print(f"Processing order {event['order_id']}")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_consume(queue="order_events", on_message_callback=callback)
    channel.start_consuming()
```

**Why it matters:** These three patterns appear repeatedly in system design interviews and in real production architectures. Understanding what problem each one solves — and when not to reach for them — is the foundation for discussing and designing scalable, resilient systems.

**Key things to understand:**

- Load balancing algorithms: round-robin, least connections, IP hash (for session stickiness)
- Common caching strategies: cache-aside (the application checks the cache and populates it on a miss), write-through (writes go to both cache and database), TTL-based expiry
- The difference between a cache hit and a cache miss, and why cache hit rate matters for latency
- Message queue vs pub/sub event bus: a queue delivers each message to exactly one consumer; a pub/sub bus delivers each message to all subscribers
- Idempotency in message consumers: a message may be delivered more than once; the consumer must handle duplicates safely without producing duplicate side effects

**Common pitfalls:**

- Caching data that changes frequently without a sufficiently short TTL, causing stale data to be served.
- Not considering what happens when the cache is cold (after a restart or flush); a cache stampede can send a flood of simultaneous requests to the database.
- Building synchronous dependencies between services where a queue would make the system more resilient to downstream slowdowns.
- Ignoring backpressure: if a queue grows without bound because consumers are slower than producers, the system will eventually exhaust memory or disk space.
