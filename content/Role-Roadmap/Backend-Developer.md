# Backend Developer – Learning Path

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
