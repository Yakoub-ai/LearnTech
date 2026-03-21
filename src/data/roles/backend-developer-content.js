export const content = {
  overview: `# Backend Developer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Backend developers build the server-side logic, APIs, and data layers that power applications. The role covers programming, databases, API design, security, performance, and system reliability.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Programming Fundamentals | [CS50x – Harvard (Free)](https://cs50.harvard.edu/x/) | Interactive |
| Python | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| Backend + APIs | [freeCodeCamp – Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/) (Note: this course uses JavaScript/Node.js — valuable for understanding backend concepts in another ecosystem) | Interactive |
| Backend Roadmap | [roadmap.sh – Backend](https://roadmap.sh/backend) | Interactive |
| Web Framework (FastAPI) | [FastAPI – Official Tutorial](https://fastapi.tiangolo.com/tutorial/) | Docs |
| Web Framework (Django) | [Django – Getting Started](https://www.djangoproject.com/start/) | Docs |

### After completing Beginner you should be able to:

- Explain what variables, data types and control flow are and use them to write simple programs
- Describe the core principles of Object-Oriented Programming, including classes, inheritance and encapsulation
- Write Python scripts using built-in types, functions and standard library modules
- Explain the HTTP request/response cycle and identify the role of methods, headers and status codes
- Explain what a REST API is and consume one using a tool or code
- Describe the client-server architecture and identify where backend code runs within it
- Explain why databases are needed and what problem they solve for a backend application
- Build a basic web API endpoint using a Python web framework

For deep explanations of each concept, see the [Beginner Concept Reference](Backend-Developer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| API Design | [Design APIs Like a Senior Engineer](https://www.youtube.com/watch?v=7iHl71nt49o) | Video |
| GraphQL | [GraphQL Foundations – Pluralsight](https://www.pluralsight.com/courses/graphql-foundations) | Course |
| Relational Databases | [freeCodeCamp – Relational Databases](https://www.freecodecamp.org/learn/relational-databases-v9/) | Interactive |
| Web Security Basics | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Docs |
| API Security | [Web Security Academy – PortSwigger](https://portswigger.net/web-security) | Interactive |
| Auth Patterns | [OAuth 2.0 and OpenID Connect in Plain English](https://www.youtube.com/watch?v=996OiexHze0) | Video |
| Algorithms and Data Structures | [Algorithms and Data Structures Pt.1 – Pluralsight](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) | Course |
| System Design Basics | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| Testing | [Python Testing with pytest](https://docs.pytest.org/) — The standard testing framework for Python | Docs |
| ORM | [SQLAlchemy – Official Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/) | Docs |
| CI/CD | [Microsoft Learn – Create Your First Pipeline](https://learn.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline) | Docs |

### After completing Mid you should be able to:

- Design and document a RESTful API using correct resource naming, HTTP verbs and status codes
- Apply API versioning strategies and write clear API documentation
- Write SQL queries including joins, aggregations and transactions against a relational database
- Identify and explain at least five OWASP Top 10 vulnerabilities and describe how to mitigate them
- Implement OAuth2 and JWT-based authentication and explain the difference between authentication and authorisation
- Explain the trade-offs between GraphQL and REST and choose appropriately for a given use case
- Containerise an application using Docker and define a multi-service setup with Docker Compose
- Analyse a basic system design problem and propose a solution involving load balancing, caching or message queues
- Use an ORM to define models and query a database without writing raw SQL

For deep explanations of each concept, see the [Mid Concept Reference](Backend-Developer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| Real-world System Design | [Uber – System Design Interview](https://www.youtube.com/watch?v=DGtalg5efCw) | Video |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Algorithms and Data Structures | [Part 1](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-one/course-overview) / [Part 2](https://app.pluralsight.com/ilx/video-courses/algorithms-data-structures-part-two/course-overview) | Course |
| Dynamic Programming | [Dynamic Programming – Full Course](https://www.youtube.com/watch?v=66hDgWottdA) | Video |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |

### After completing Senior you should be able to:

- Design distributed systems while articulating the trade-offs described by the CAP theorem
- Define appropriate service boundaries in a microservices architecture and justify the choice between microservices and a monolith
- Apply Domain-Driven Design concepts — bounded contexts and aggregates — to a real problem
- Recognise algorithm complexity issues in production code and propose solutions with a better Big O profile
- Identify dynamic programming patterns and implement memoisation to avoid redundant computation
- Design observability into a system using structured logging, metrics and distributed tracing
- Lead a security review of an API, identify risks and present remediation recommendations
- Describe how AI-assisted development tools change backend workflows and apply them appropriately
- Apply AI governance requirements (Secure AI Framework, AI Policy, AI Checklist) when building backend systems that integrate AI components

For deep explanations of each concept, see the [Senior Concept Reference](Backend-Developer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
  beginner: `# Backend Developer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Backend Developer learning path.

---

## Programming Fundamentals – Variables, Data Types and Control Flow

Programming fundamentals are the building blocks that every software developer must understand before writing useful code. A variable is a named location in memory that stores a value. The type of that value — whether it is a whole number, a decimal, a piece of text, or a true/false flag — is its data type. Control flow determines the order in which a program's instructions execute: rather than always running top to bottom, a program can branch (execute one block of code or another depending on a condition) or loop (repeat a block of code until a condition is met).

Understanding these concepts is necessary before tackling any framework, library or system design problem. Every piece of server-side logic — from validating a user's input to deciding which database query to run — is built from these primitives.

**Why it matters:** A backend developer who cannot reason clearly about types and control flow will write code that produces subtle bugs, behaves unpredictably under edge cases, or crashes when given unexpected input. These fundamentals never stop being relevant; they underpin every layer of more advanced work.

**Key things to understand:**

- Primitive types (integers, floats, booleans, strings) and the operations each supports
- The difference between mutable and immutable values
- How \`if\`/\`else\` branching works and how to compose conditions using \`and\`, \`or\` and \`not\`
- How \`for\` and \`while\` loops work, including how to break out of them early
- What a function is, how parameters and return values work, and why functions improve reuse and readability
- What scope is and why a variable defined inside a function is not accessible outside it

**Common pitfalls:**

- Confusing assignment (\`=\`) with equality comparison (\`==\`).
- Assuming a variable always holds the type you expect, especially when data comes from user input or an external source.
- Writing deeply nested control flow that becomes unreadable; flat code with early returns is usually clearer.
- Infinite loops caused by a loop condition that never becomes false.

---

## Object-Oriented Programming – Classes, Inheritance and Encapsulation

Object-Oriented Programming (OOP) is a way of organising code around objects — bundles that combine data (attributes) and behaviour (methods). A class is the blueprint that defines what data an object holds and what it can do. When you create an instance of a class you get a concrete object based on that blueprint.

Inheritance allows a new class (the child) to reuse and extend the attributes and methods of an existing class (the parent). Encapsulation is the principle of hiding the internal details of an object and exposing only what is necessary through a well-defined interface. Together, these mechanisms help developers manage complexity in large codebases by grouping related logic together and preventing one part of a program from reaching into and corrupting the internals of another.

**Why it matters:** OOP underpins most backend frameworks, ORM libraries and the way services model real-world entities such as users, orders or products. Understanding these concepts is essential for reading, extending and contributing to any substantial codebase.

**Key things to understand:**

- How to define a class, add attributes via \`__init__\`, and write methods
- The meaning of \`self\` and why it is required
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

**Why it matters:** Code written in an un-Pythonic style is harder for other Python developers to read and maintain. Understanding Python's idioms and standard library makes you productive quickly and keeps your code consistent with the ecosystem around it.

**Key things to understand:**

- Python uses indentation to define code blocks rather than braces; mixing tabs and spaces causes errors
- Built-in types: \`int\`, \`float\`, \`str\`, \`bool\`, \`list\`, \`tuple\`, \`dict\`, \`set\` and the methods each provides
- List comprehensions as a concise, idiomatic way to build lists from iterables
- How to read, write and process files using \`open()\` and the \`with\` statement
- Commonly used standard library modules: \`os\`, \`sys\`, \`json\`, \`datetime\`, \`pathlib\`, \`collections\`, \`re\`
- Virtual environments and why dependencies should be isolated per project

**Common pitfalls:**

- Modifying a list while iterating over it leads to skipped or duplicated elements.
- Using mutable default arguments in function signatures (e.g., \`def foo(items=[])\`) causes the default to be shared across all calls.
- Forgetting that strings are immutable; operations like \`replace\` return a new string rather than modifying the original.
- Assuming \`==\` and \`is\` are interchangeable; \`is\` checks object identity, not value equality.

---

## HTTP – The Request/Response Cycle

HTTP (Hypertext Transfer Protocol) is the communication protocol used by clients and servers to exchange data on the web. Every time a browser loads a page or a mobile app fetches data, it sends an HTTP request and waits for an HTTP response.

An HTTP request consists of a method (what action to perform), a URL (which resource to act on), headers (metadata such as content type or authentication tokens) and optionally a body (data sent to the server). The server processes the request and returns a response containing a status code (a three-digit number indicating success or failure), response headers and optionally a body.

**Why it matters:** HTTP is fundamental for any backend developer because every API, web framework and network service operates on top of it. Misunderstanding status codes, methods or the stateless nature of HTTP leads to poorly designed APIs and hard-to-diagnose bugs.

**Key things to understand:**

- The most common HTTP methods: GET (retrieve), POST (create or submit data), PUT/PATCH (update), DELETE (remove)
- Status code classes: 2xx success, 3xx redirection, 4xx client errors, 5xx server errors
- Key status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error
- What HTTP headers are and examples of commonly used ones: \`Content-Type\`, \`Authorization\`, \`Accept\`, \`Cache-Control\`
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

**Why it matters:** Understanding what makes an API RESTful and how to consume one is the foundation for everything else in backend API work. Almost every external service you integrate with will expose a REST API, and almost every internal service you build will be expected to follow REST conventions.

**Key things to understand:**

- Resources are identified by URLs (e.g., \`/users\`, \`/users/42\`)
- HTTP methods map to CRUD operations: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- Requests and responses typically use JSON as the data format
- REST is stateless: all information needed to process a request must be contained within the request itself
- How to read API documentation and understand endpoint definitions, expected inputs and response shapes
- How to make HTTP requests in Python using the \`requests\` library

**Common pitfalls:**

- Confusing REST with HTTP itself; REST is a set of constraints on how to use HTTP, not a protocol of its own.
- Assuming every API that returns JSON is RESTful; REST implies specific constraints around resource identification and statelessness.
- Ignoring error responses; a well-behaved client must handle non-2xx status codes gracefully.

---

## Client-Server Architecture

Client-server architecture is the fundamental model for how modern web and mobile applications are structured. The client is the part of the system that a user interacts with directly — a browser, a mobile app, or a desktop application. The server is a program running on a remote machine that stores data, enforces business rules and responds to client requests.

This separation of concerns is what defines backend development as a discipline. Backend code runs on the server; it is never directly visible to the user. Because the client is outside your control, the server must never blindly trust what the client sends.

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
`,
  mid: `# Backend Developer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Backend Developer learning path.

---

## RESTful API Design – Resources, Verbs and Status Codes

Designing a RESTful API well is different from simply making one that works. A well-designed REST API is predictable, consistent and easy for other developers to consume without reading extensive documentation. It treats server-managed entities as resources, uses URLs to identify those resources, and relies on standard HTTP verbs and status codes to communicate intent and outcome.

Resources should be nouns, not verbs. The URL \`/orders\` refers to the collection of orders; \`/orders/42\` refers to the specific order with identifier 42. Actions are expressed through HTTP methods, not embedded in the path (avoid \`/createOrder\`).

**Why it matters:** A consistent, well-structured API reduces integration bugs, lowers the cognitive load for API consumers and makes the system easier to evolve over time. Poorly designed APIs accumulate workarounds and undocumented conventions that slow down every team that integrates with them.

**Key things to understand:**

- Use plural nouns for collection endpoints: \`/users\`, \`/products\`, \`/invoices\`
- Map CRUD operations to methods: GET (read), POST (create), PUT (full replacement update), PATCH (partial update), DELETE (remove)
- Return meaningful status codes: 200 for successful reads, 201 for successful creates (include a \`Location\` header pointing to the new resource), 204 for successful deletes with no body, 400 for validation errors, 404 for missing resources, 409 for conflicts, 422 for semantically invalid input
- Nest resources only one level deep to avoid overly complex URLs: \`/orders/42/items\` is fine; \`/orders/42/items/7/details/history\` is not
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

**Why it matters:** Breaking changes in a published API break every consumer simultaneously. A versioning strategy and clear documentation are what allow a backend team to evolve a service without disrupting the teams and applications that depend on it.

**Key things to understand:**

- Common versioning strategies: URL path versioning (\`/v1/users\`), query parameter versioning (\`?version=1\`) and header versioning (\`Accept: application/vnd.api.v1+json\`); URL versioning is the most visible and easiest to test
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

**Why it matters:** SQL is the lingua franca of data. An inability to write correct, efficient queries is a constant drag on productivity — every feature that touches the database takes longer, and performance problems go undiagnosed because the engineer cannot read an execution plan.

**Key things to understand:**

- \`SELECT\`, \`FROM\`, \`WHERE\`, \`GROUP BY\`, \`HAVING\`, \`ORDER BY\`, \`LIMIT\` and how they compose; \`WHERE\` filters individual rows before grouping, \`HAVING\` filters groups after aggregation
- Aggregate functions: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`
- Join types: \`INNER JOIN\` (returns only rows that match in both tables), \`LEFT JOIN\` (all rows from the left table plus matched rows from the right; unmatched right-side columns are NULL), \`RIGHT JOIN\` (the reverse), \`FULL OUTER JOIN\` (all rows from both tables)
- Subqueries and common table expressions (CTEs) using \`WITH\` for breaking complex queries into readable steps
- \`INSERT\`, \`UPDATE\` and \`DELETE\` statements; an \`UPDATE\` or \`DELETE\` without a \`WHERE\` clause modifies every row in the table — always double-check
- Transactions: wrap related statements in \`BEGIN\` / \`COMMIT\`; use \`ROLLBACK\` to undo on error; the ACID properties (Atomicity, Consistency, Isolation, Durability) define the guarantees a transaction provides
- Indexes: creating an index on a column used frequently in \`WHERE\` or \`JOIN\` conditions can reduce query time from seconds to milliseconds; each index adds overhead to \`INSERT\`, \`UPDATE\` and \`DELETE\`
- How to read a query execution plan (\`EXPLAIN\` / \`EXPLAIN ANALYZE\`) to understand whether indexes are being used and where the cost lies

**Common pitfalls:**

- Writing \`SELECT *\` in application code; always select only the columns you need to reduce data transfer and prevent breakage when columns are added or removed.
- N+1 query problems: loading a list of records and then issuing one additional query per record to fetch a related field; solve with a single query using a JOIN or a batched query.
- Not using parameterised queries; string-concatenating user input directly into SQL is the root cause of SQL injection vulnerabilities.
- Forgetting that \`NULL\` comparisons require \`IS NULL\` / \`IS NOT NULL\` rather than \`= NULL\`; \`= NULL\` always evaluates to unknown, never true.

---

## Web Security – OWASP Top 10 for Backend Developers

The Open Web Application Security Project (OWASP) publishes a regularly updated list of the ten most critical security risks for web applications. The OWASP Top 10 is updated periodically; always refer to the current list on the OWASP website. As a backend developer you are responsible for preventing these vulnerabilities in the code and infrastructure you write and configure.

Security is not a feature to be added at the end; it must be considered throughout design and development. A single exploited vulnerability can expose all user data, give attackers control of the server, or allow fraudulent transactions.

**Why it matters:** The OWASP Top 10 represents the most commonly exploited vulnerability classes across real-world applications. Being familiar with each category and its mitigations means you can identify and prevent them during design and code review rather than discovering them after a breach.

**Key things to understand:**

- **A01 – Broken Access Control:** Users able to access resources or actions they should not; the most common critical finding. Enforce authorisation checks server-side on every request; never rely on the client to hide or restrict functionality.
- **A02 – Cryptographic Failures:** Transmitting or storing sensitive data (credentials, personal data, payment information) without adequate encryption; enforce HTTPS, hash passwords with bcrypt or Argon2, never store plaintext secrets, avoid weak or deprecated algorithms (MD5, SHA-1 for security purposes).
- **A03 – Injection:** Unsanitised user input interpreted as a command by a database (SQL injection), shell, or other interpreter; prevent with parameterised queries and strict input validation. SQL injection remains one of the most damaging attack types.
- **A04 – Insecure Design:** Security flaws baked into the design of a system before a line of code is written; no amount of hardening fixes a fundamentally insecure design. Threat modelling and security requirements must be part of design, not an afterthought.
- **A05 – Security Misconfiguration:** Default credentials left in place, unnecessary services exposed, verbose error messages leaking stack traces to clients, missing security headers. Applies across every layer from the OS to the application.
- **A06 – Vulnerable and Outdated Components:** Outdated dependencies with published CVEs; use automated dependency scanning in CI (e.g., \`npm audit\`, \`pip-audit\`, Dependabot) and apply updates regularly.
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

OAuth 2.0 is an authorisation framework — it defines how a user can grant a third-party application limited access to their account on another service without sharing their password. OAuth 2.0 is not an authentication protocol; it does not tell you who the user is, only that they have granted access. OpenID Connect (OIDC) is a thin identity layer built on top of OAuth 2.0 that adds authentication by introducing the ID token, which carries the user's identity. JWT (JSON Web Token) is a token format used by both OAuth 2.0 and OIDC — it is not a protocol itself.

**Why it matters:** Authentication and authorisation failures are the second most common cause of breaches after access control issues. Getting these right requires understanding the purpose and limits of each tool — using OAuth 2.0 for authentication without OIDC, or mishandling JWTs, creates serious security holes.

**Key things to understand:**

- JWT structure: header (specifies the signing algorithm), payload (claims such as \`sub\`, \`exp\`, \`iat\`, \`roles\`), signature (verified with a secret or public key); a JWT can be read by anyone — do not put sensitive data in the payload
- The difference between access tokens (short-lived, used to access protected resources) and refresh tokens (longer-lived, used to obtain new access tokens without re-authenticating)
- Why you should not store JWTs in \`localStorage\` on a web client; prefer \`HttpOnly\` cookies to reduce XSS exposure
- The OAuth 2.0 grant types and when to use each: Authorization Code with PKCE (web and native apps, the recommended flow), Client Credentials (machine-to-machine, no user involved), Implicit (deprecated — do not use)
- OpenID Connect adds an \`id_token\` to the OAuth 2.0 flow that contains the user's identity; this is what makes OIDC an authentication protocol
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

An image is the immutable blueprint for a container. It is built from a \`Dockerfile\` — a text file with instructions for assembling the filesystem layer by layer. A running instance of an image is a container. Because containers share the host OS kernel (rather than emulating hardware), they start in milliseconds and have negligible overhead compared to VMs.

**Why it matters:** Containerisation is the standard unit of deployment in modern backend infrastructure. Understanding Docker is a prerequisite for working with any container orchestration platform (Kubernetes, ECS), for setting up consistent local development environments, and for writing CI/CD pipelines.

**Key things to understand:**

- \`Dockerfile\` instructions: \`FROM\` (base image), \`WORKDIR\`, \`COPY\`, \`RUN\` (execute a command during the image build), \`EXPOSE\`, \`ENV\`, \`CMD\` / \`ENTRYPOINT\` (command to run when the container starts)
- Image layers: each instruction in a Dockerfile creates a cached layer; put infrequently changing instructions (installing dependencies) before frequently changing ones (copying application code) for faster incremental builds
- Core CLI commands: \`docker build\`, \`docker run\`, \`docker ps\`, \`docker logs\`, \`docker exec\`, \`docker stop\`, \`docker rm\`
- Docker Compose defines a multi-container application in a \`compose.yaml\` file (the modern naming convention since Compose V2; older projects may still use \`docker-compose.yml\`); services reference each other by service name, which Docker resolves via an internal DNS
- Volumes persist data outside the container's writable layer; without a volume, data written inside a running container is lost when the container is removed
- Environment variables should be injected at runtime (via \`-e\` flags or \`.env\` files), not baked into the image, to keep the image portable across environments

**Common pitfalls:**

- Running containers as root; specify a non-root user in the Dockerfile to limit the blast radius of a container escape.
- Storing secrets (passwords, API keys) in the \`Dockerfile\` or as image layers; they become visible in the image history. Use runtime environment variables or a secrets manager.
- Building monolithic images with every tool installed rather than using multi-stage builds to keep the final image small and reduce the attack surface.
- Ignoring the \`.dockerignore\` file, causing large \`node_modules\`, \`.git\` directories or local config files to be copied into the build context unnecessarily.

---

## Testing – Unit Tests, Integration Tests and the Test Pyramid

Testing is the practice of verifying that your code behaves as expected. A unit test targets a single function or method in isolation — it calls the function with known inputs and asserts that the output matches what is expected. An integration test verifies that multiple components work together correctly: for example, that an API endpoint correctly reads from the database and returns the expected response.

The test pyramid is a model for balancing the types of tests you write. At the base are many fast, focused unit tests. Above those are fewer integration tests that verify component interactions. At the top are a small number of end-to-end tests that exercise the full system as a user would. The pyramid shape reflects the ideal ratio: many unit tests, fewer integration tests, even fewer end-to-end tests.

**Why it matters:** Code without tests can only be verified by running it manually, which is slow, error-prone and does not scale. Tests catch regressions before they reach production, document the expected behaviour of the code and give developers the confidence to refactor without fear of breaking things they cannot see.

**Key things to understand:**

- Unit tests verify individual functions in isolation; they should be fast, deterministic and independent of external systems (databases, APIs, filesystems)
- Integration tests verify that components work together — for example, that a request to an API endpoint returns the correct response after interacting with a database
- pytest is the standard testing framework for Python; it uses simple \`assert\` statements, automatic test discovery and a powerful fixture system for setup and teardown
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

Error handling is the practice of anticipating, detecting and responding to problems that occur during program execution. In Python, this is done using \`try\`/\`except\` blocks that catch exceptions and allow the program to respond gracefully rather than crashing. Logging is the practice of recording events that happen during execution — requests received, actions taken, errors encountered — so that developers and operators can understand what the system is doing and diagnose problems after the fact.

**Why it matters:** Unhandled errors crash the application and produce unhelpful error messages for users. Missing or poorly structured logs make production incidents impossible to diagnose. Together, error handling and logging are what separate a service that can be operated and debugged from one that fails silently or noisily without giving anyone the information needed to fix it.

**Key things to understand:**

- Python's \`try\`/\`except\` blocks catch exceptions; catch specific exception types rather than bare \`except:\` to avoid silently swallowing unexpected errors
- Python's built-in \`logging\` module provides a standard way to emit log messages at different severity levels: \`DEBUG\` (detailed diagnostic information), \`INFO\` (confirmation that things are working), \`WARNING\` (something unexpected but not yet broken), \`ERROR\` (a failure that prevented an operation from completing), \`CRITICAL\` (a severe failure that may require the application to stop)
- Log what is useful for diagnosing problems: request identifiers, operation names, relevant entity IDs, error messages and stack traces
- Never log sensitive data: passwords, API keys, tokens, credit card numbers or personally identifiable information (PII) must not appear in logs
- Use structured logging (key-value pairs or JSON) rather than free-form strings so that logs can be searched, filtered and aggregated by log management tools
- Configure log levels appropriately per environment: \`DEBUG\` during local development, \`INFO\` or \`WARNING\` in production to avoid noise and performance overhead

**Common pitfalls:**

- Using bare \`except:\` or catching \`Exception\` too broadly, which hides bugs by swallowing errors the developer did not anticipate.
- Logging errors without enough context to reproduce the problem; "an error occurred" is not useful — include what operation failed, what input caused it and what the error was.
- Logging at \`DEBUG\` level in production without a way to adjust the level dynamically, flooding storage and degrading performance.
- Raising exceptions for expected control flow (e.g., using exceptions instead of a simple conditional check); exceptions should represent exceptional conditions.

---

## System Design Basics – Load Balancing, Caching and Queues

System design is the process of defining the architecture of a software system to meet functional requirements (what it does) and non-functional requirements (how reliably, how fast, at what scale). At the Mid level, understanding three fundamental building blocks — load balancers, caches and message queues — is essential.

A load balancer distributes incoming requests across multiple instances of a service. This improves availability (if one instance fails, the others continue serving traffic) and allows horizontal scaling (adding more instances to handle more load). A cache stores the result of an expensive operation (a database query, an external API call) so that subsequent requests for the same result can be served faster without repeating the work. A message queue decouples the component that produces work from the component that performs it: the producer places a message on the queue and continues without waiting; one or more consumers read from the queue and process messages at their own pace.

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
`,
  senior: `# Backend Developer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the Backend Developer learning path.

---

## Distributed Systems – CAP Theorem, Consistency and Availability Trade-offs

A distributed system is a collection of independent computers that appear to the user as a single coherent system. Distributed systems unlock horizontal scalability and fault tolerance, but they introduce a fundamental challenge: the network between nodes is unreliable, and any two nodes may disagree about the current state of the world.

The CAP theorem, formulated by Eric Brewer, states that a distributed data store can guarantee at most two of the following three properties simultaneously: Consistency (every read returns the most recent write or an error), Availability (every request receives a non-error response, though it may not reflect the most recent write) and Partition Tolerance (the system continues to operate even when network messages between nodes are lost or delayed). Because network partitions are a reality rather than an edge case, the practical design choice is between favouring Consistency (CP) or Availability (AP) when a partition occurs.

**Why it matters:** Every backend system of sufficient scale becomes a distributed system — through read replicas, caches, CDNs or microservices — even if it was not designed as one. Understanding CAP and its implications is essential for making correct trade-offs in database selection, replication strategy and system design, and for communicating those trade-offs clearly to stakeholders.

**Key things to understand:**

- CP systems (e.g., traditional relational databases with synchronous replication, ZooKeeper) will refuse to serve requests if they cannot guarantee they have the latest data; they prefer consistency over uptime during a partition
- AP systems (e.g., DynamoDB, Cassandra, CouchDB) will serve potentially stale data rather than return an error; this is acceptable for many use cases where eventual correctness is sufficient
- Eventual consistency means all replicas will converge to the same state given enough time with no new writes; this is a weaker guarantee than strong consistency but allows higher availability and lower latency
- The PACELC model extends CAP by recognising that even when there is no partition, you trade off latency against consistency; a system's behaviour during normal operation is as important as its behaviour during failure
- Distributed transactions (two-phase commit, Saga pattern) are complex and introduce failure modes; design systems to minimise the need for cross-service transactions wherever possible

**Common pitfalls:**

- Assuming that because a system uses a single relational database, it does not need to reason about distributed system properties; read replicas, caches and CDNs introduce distribution even in seemingly simple architectures.
- Choosing CP or AP without clearly understanding the business requirement; the correct choice depends on what stale or inconsistent data means in your specific domain.
- Conflating CAP consistency (read-your-writes across nodes) with ACID consistency (data integrity constraints within a database); these are different concepts that use the same word.

---

## Microservices – Boundaries, Communication and Trade-offs vs Monolith

A microservices architecture decomposes a system into small, independently deployable services, each responsible for a narrow slice of business capability. Each service owns its own data store, communicates over the network and can be deployed, scaled and updated independently of the others.

A monolith is a single deployable unit that contains all application logic. This is not inherently bad; many successful, high-scale systems are well-structured monoliths. Starting with a monolith and splitting into services only when boundaries become clear and team scale demands it is often the right approach — a path sometimes called the "modular monolith first" strategy.

**Why it matters:** Choosing between these architectural styles has profound implications for team structure, deployment complexity, operational overhead and the speed at which the system can evolve. Microservices solve real problems but introduce a class of distributed-systems complexity that a monolith simply does not have. The decision must be made deliberately.

**Key things to understand:**

- Service boundaries should align with business capabilities (Domain-Driven Design bounded contexts), not technical layers; splitting by "database layer" and "API layer" creates a distributed monolith, not microservices
- Inter-service communication patterns: synchronous (REST, gRPC) vs asynchronous (events, message queues); prefer asynchronous for operations that do not require an immediate response to reduce coupling and improve resilience
- The distributed systems problems introduced by microservices: network latency, partial failure, eventual consistency and the need for distributed tracing to follow a request across service boundaries
- The Strangler Fig pattern for gradually migrating a monolith to microservices without a risky big-bang rewrite; new functionality is built as services while the monolith handles legacy paths
- Conway's Law: the architecture of a system tends to mirror the communication structure of the organisation that builds it; align team boundaries with service boundaries deliberately
- Shared databases between services create tight coupling and defeat the purpose of independent deployment; each service must own its data exclusively

**Common pitfalls:**

- Splitting into microservices prematurely, before the domain boundaries are well understood; this creates a distributed monolith with all the complexity of microservices but none of the benefits — changes still require coordinating multiple services.
- Sharing a database between services and calling it microservices; this is a monolith with extra network hops.
- Neglecting operational concerns: service discovery, centralised logging, distributed tracing and health checks are not optional in a microservices environment — the operational overhead is a genuine cost.
- Building a chatty architecture where a single user action triggers many synchronous calls between services, creating high latency and cascading failure risk.

---

## Domain-Driven Design – Bounded Contexts and Aggregates

Domain-Driven Design (DDD) is a set of principles and patterns for building software that closely reflects the domain it models. Codified by Eric Evans, DDD places the primary project focus on the core domain and domain logic, basing complex designs on a model developed collaboratively with domain experts.

At the strategic design level, DDD introduces the Bounded Context: an explicit boundary within which a particular domain model is defined and applicable. The same concept (e.g., "customer") may mean something different in the Sales context than in the Support context; each context has its own model and its own persistence, and should not share a database schema with other contexts.

At the tactical design level, the Aggregate is the key building block: a cluster of domain objects treated as a single unit for the purposes of data changes. The Aggregate Root is the only entry point into the cluster; all changes must go through it, ensuring that business invariants are always maintained.

**Why it matters:** DDD provides a vocabulary and a set of tools for tackling the most difficult part of software engineering — understanding and modelling a complex business domain correctly. For senior engineers, it is the bridge between business requirements and technical architecture, and the foundation for defining sensible microservice boundaries.

**Key things to understand:**

- The Ubiquitous Language: a shared vocabulary developed collaboratively with domain experts and used consistently in code, documentation and conversation; when code uses the same terms as the business, misunderstandings are surfaced earlier and reduced over time
- Context Maps document the relationships between bounded contexts: Shared Kernel (both contexts share part of the model), Customer/Supplier (one context depends on the other's API), Conformist (the downstream accepts the upstream's model), Anti-Corruption Layer (a translation layer that prevents a legacy or foreign model from polluting the new one)
- Aggregates enforce consistency boundaries; choose aggregate boundaries to ensure all invariants can be checked and enforced within a single transaction
- Repository pattern: abstracts the mechanism for loading and saving aggregates; application code works with domain objects and does not need to know about SQL or HTTP
- Domain Events: immutable records of things that happened in the domain that other parts of the system may need to react to; they decouple bounded contexts and are the natural integration point between services

**Common pitfalls:**

- Making aggregates too large, turning them into a god object that is slow to load, contended under concurrent writes, and difficult to change.
- Applying DDD tactical patterns (Aggregates, Repositories, Domain Events) without the strategic foundation; the patterns have real cost in complexity, and that cost is only justified when the domain is genuinely complex.
- Leaking infrastructure concerns (SQL queries, HTTP calls) into the domain model; the domain layer should be free of framework and persistence dependencies to remain independently testable.

---

## Algorithms – Complexity, Big O and When It Matters in Production

Algorithm complexity analysis is the practice of describing how an algorithm's resource usage (time or memory) grows as the input size increases. Big O notation expresses this growth as a function of input size n, discarding constant factors and lower-order terms to focus on the dominant scaling behaviour.

In most business applications, algorithmic complexity is not the primary performance bottleneck — database queries and network calls dominate. However, when it does matter, a poorly chosen algorithm can make a system completely unusable as data volume grows, with no infrastructure investment capable of fixing it.

**Why it matters:** Senior engineers encounter algorithm complexity in two ways: in technical interviews where it is tested directly, and in production systems where identifying an O(n²) hot path or replacing a linear scan with a hash-map lookup can eliminate a performance crisis. Understanding complexity analysis is also essential for evaluating the scalability of a proposed design.

**Key things to understand:**

- Common complexity classes in increasing order of cost: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential
- O(log n) is typical of binary search and balanced tree lookups; O(n log n) is typical of efficient sorting algorithms such as merge sort and quicksort (average case)
- Amortised complexity: an operation may be occasionally expensive but cheap on average (e.g., appending to a dynamic array that occasionally resizes)
- Space complexity matters alongside time complexity; an algorithm can trade time for space and vice versa, and both resources are finite
- How to identify an O(n²) problem in code: a nested loop where both loops iterate over the same collection is the classic pattern
- Hash maps provide O(1) average-case lookup and insertion; knowing when to reach for a hash map can transform an O(n²) algorithm into O(n)

**When it matters in production:**

- Processing large files or data sets on a single node (batch jobs, ETL pipelines)
- Report generation queries that grow with the number of rows
- Real-time systems where latency guarantees must be met regardless of input size
- APIs called at high volume where a small per-request inefficiency multiplies across millions of calls

**Common pitfalls:**

- Over-optimising code that is not on the hot path; premature optimisation wastes time and produces harder-to-read code. Profile first.
- Assuming that the Big O class with the smaller exponent is always faster in practice; for small inputs, constants matter more than asymptotic behaviour.
- Fixing algorithm complexity in application code when the real fix is adding an index to the database query that drives the computation.

---

## Dynamic Programming – Pattern Recognition and Memoisation

Dynamic programming (DP) is an algorithmic technique for solving problems by breaking them into overlapping subproblems, solving each subproblem once and storing the result to avoid redundant computation. It applies when a problem exhibits two properties: optimal substructure (the optimal solution to the whole problem can be built from optimal solutions to its subproblems) and overlapping subproblems (the same subproblems are solved repeatedly in a naive recursive approach).

Memoisation is the top-down approach: write a recursive solution and cache the result of each subproblem as it is computed. Tabulation is the bottom-up approach: build a table of results iteratively, starting from the smallest subproblems and working upward. Both approaches convert an exponential naive solution into a polynomial one.

**Why it matters:** DP problems appear regularly in technical interviews and are a reliable signal of algorithmic maturity. More practically, recognising the DP pattern helps when designing algorithms for pricing engines, recommendation systems, resource scheduling and combinatorial optimisation problems that arise in real backend work.

**Key things to understand:**

- The classic DP problems and patterns to internalise: Fibonacci sequence (the simplest introduction), 0/1 Knapsack, Longest Common Subsequence, Edit Distance, Coin Change
- How to identify a DP problem: if a naive recursive solution recomputes the same subproblem multiple times, DP likely applies; draw the recursion tree to see the overlap
- State definition is the hardest part: clearly define what information the state must capture to uniquely describe a subproblem; a poorly defined state produces incorrect or inefficient solutions
- Memoisation with a dictionary (hash map) is often the easiest starting point; switch to tabulation if recursion depth causes stack overflow or if better cache locality improves performance
- Reconstructing the actual solution (not just computing the optimal value) requires storing the decisions made at each step, not just the optimal values

**Common pitfalls:**

- Jumping to DP when a simpler greedy algorithm would suffice; always verify whether a greedy approach yields optimal results before adding DP complexity.
- Defining state too broadly — capturing more information than necessary — causing the memoisation table to be enormous and negating the efficiency gain.
- Confusing top-down memoisation with general caching; memoisation is specific to pure functions with no side effects and deterministic outputs.

---

## Observability – Structured Logging, Metrics and Distributed Tracing

Observability is the degree to which you can understand the internal state of a system by examining its external outputs. In a production backend system, the three pillars of observability are logs, metrics and distributed traces.

Logs are time-stamped records of discrete events: a request arrived, a database query was executed, an error occurred. Structured logs (formatted as JSON rather than free-form text) are machine-parseable and can be queried and aggregated by log management tools. Metrics are numerical measurements aggregated over time: request rate, error rate, latency percentiles, CPU usage — they answer "how is the system behaving right now?" Traces record the end-to-end journey of a single request as it flows through multiple services, capturing the time spent in each operation and the causal relationships between them.

**Why it matters:** In a distributed system, failures are invisible without observability. Logs tell you what happened; metrics tell you how often and how fast; traces tell you where time was spent and which service caused a failure. Without all three, on-call engineers are debugging production incidents blind.

**Key things to understand:**

- The RED method for service metrics: Rate (requests per second), Errors (error rate as a percentage), Duration (latency distribution — especially p50, p95 and p99 percentiles, not just averages)
- Structured logging: always emit logs as JSON with consistent fields — at minimum: timestamp, log level, service name, trace ID, message, and relevant domain context (e.g., order ID, user ID)
- Correlation IDs (trace IDs): a unique identifier generated at the entry point of a request and propagated through every downstream service call, log entry and outgoing message; essential for reconstructing the full journey of a single request in a distributed system
- Distributed tracing tools (Jaeger, Zipkin, Honeycomb, or the vendor-neutral OpenTelemetry standard) visualise the call graph of a request across services as a series of spans, showing which service was slowest and which call failed
- Alerting should be based on symptoms (high error rate, high latency) rather than causes (high CPU); alert on what users experience, not on what the infrastructure is doing
- Cardinality: high-cardinality labels (e.g., user ID as a metric dimension) can cause metric systems to run out of memory; use distributed traces for high-cardinality data, not metric labels

**Common pitfalls:**

- Logging at DEBUG level in production without a mechanism for dynamically adjusting log levels; excessive logging degrades performance, fills storage and makes finding relevant entries harder.
- Writing log messages that describe what the code is doing ("entering processPayment()") rather than what is happening in the domain ("payment declined for order 42: insufficient funds").
- Not propagating trace context through asynchronous boundaries (message queue consumers, scheduled jobs, async tasks); the trace breaks and the end-to-end journey becomes invisible.
- Treating observability as something to retrofit after a production incident rather than designing for it from the start.

---

## AI-Assisted Development for Backend Engineers

AI-assisted development refers to the use of large language model (LLM) based tools integrated into the development workflow to accelerate and improve the quality of code and documentation. For backend engineers, these tools are most valuable when applied to well-understood, bounded tasks within a larger problem.

AI coding assistants can generate boilerplate, suggest completions, explain unfamiliar code, write tests for existing functions, translate code between languages and help diagnose error messages. They work best when given precise, context-rich prompts and when the engineer evaluates the output critically rather than accepting it uncritically.

**Why it matters:** AI-assisted development tools are changing the pace at which code is produced and the skills that provide the most leverage. Senior engineers who understand how to use these tools effectively — and equally importantly, where their limits are — will be more productive and will help their teams establish conventions that prevent the quality and security risks these tools can introduce.

**Key things to understand:**

- AI tools are statistical text-completion engines, not reasoning engines; they produce plausible-looking code, not necessarily correct code. Always review generated code for logic errors, security issues and adherence to your codebase's conventions
- Effective prompting for backend tasks: provide the function signature, the expected behaviour, example inputs and outputs, and any constraints (performance requirements, error handling expectations, existing interfaces to conform to)
- AI assistants are well-suited for: generating CRUD endpoints, writing unit tests, producing SQL queries for well-defined schemas, explaining unfamiliar libraries, converting code between languages, and drafting documentation from code
- AI assistants are poorly suited for: designing system architecture (they lack knowledge of your specific constraints and history), writing security-sensitive code without thorough review, and tasks requiring deep context about the entire codebase
- Test-driven prompting: ask the assistant to write the tests first, then the implementation; this forces the specification to be made explicit and provides an immediate way to validate the output
- Data privacy: do not paste proprietary business logic, credentials, or personal data into a public AI tool; check your organisation's policy on approved tools before use

**Common pitfalls:**

- Accepting generated code without understanding it; if you cannot explain what the code does, you cannot maintain, debug or review it in a pull request.
- Over-relying on AI for boilerplate and underinvesting in understanding the underlying concepts; tools change rapidly, but foundational understanding persists.
- Using AI to generate security-sensitive components (authentication, authorisation, cryptography) without independent expert review; the model may produce code that looks correct but has subtle vulnerabilities.
- Not establishing team conventions around AI tool use, leading to inconsistent code styles, unpredictable quality and unclear accountability across the codebase.

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from developers building AI-integrated backend services to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy is the organisation's binding commitment to responsible AI use. For backend engineers, this matters whenever you build APIs that call AI models, store AI-generated content, or process data that feeds into AI systems. The policy's requirements — data classification, logging, transparency — translate directly into backend design decisions.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to all AI systems that process personal data — this includes inference inputs, model outputs, and logged interactions.
- The policy requires transparency: users must be informed when they are interacting with an AI system or when AI has influenced a decision affecting them.

**Common pitfalls:**
- Building a backend integration with an AI model without registering the use case, creating compliance exposure.
- Treating the AI Policy as a legal concern rather than a design constraint — requirements like logging, data classification, and human oversight must be designed into the backend from the start.
- Assuming that internal-only AI tools are exempt from the policy; the governance requirements apply to all AI use.

---

## Language Deep Dives

Strengthen your foundations with these language-specific learning paths:

- [Python Deep Dive](/language/python) — Build APIs, scripts, and backend services
- [SQL Deep Dive](/language/sql) — Master database queries and data modelling
- [TypeScript Deep Dive](/language/typescript) — Type-safe Node.js backend development
- [JavaScript Deep Dive](/language/javascript) — Core language for full-stack development
`,
}
