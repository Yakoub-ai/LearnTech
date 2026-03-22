export const content = {
  overview: `# Tech Lead / Architect – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Tech Leads and Architects guide technical direction, system design, and engineering quality across a team or programme. This path is intended for experienced developers — typically with three or more years of hands-on development experience — who are growing into a technical leadership or architecture role. Foundational programming knowledge is assumed.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| System Design Intro | [System Design for Beginners Course](https://www.youtube.com/watch?v=m8Icp_Cid5o) | Video |
| System Design – 20 Concepts | [20 System Design Concepts in 10 Minutes](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| AI / ML Literacy | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| DevOps Literacy | [DevOps Literacy – Pluralsight](https://app.pluralsight.com/paths/skills/devops-literacy) | Course |
| APIs Overview | [Every Popular API Style Explained](https://www.youtube.com/watch?v=xJFzPSAw4Fo) | Video |
| Generative AI for IT | [Generative AI for IT Pros – Pluralsight](https://app.pluralsight.com/paths/skill/generative-ai-for-it-pros) | Course |
| Branching Strategy | [Branching Strategy](Prerequisites/Branching-Strategy.md) | Guide |
| Code Review | [Code Review](Prerequisites/Code-Review.md) | Guide |

### After completing Beginner you should be able to:

- Describe the main components of a distributed system and their responsibilities
- Explain the difference between vertical and horizontal scaling, and when to use each
- Explain what DevOps is and how CI/CD pipelines enable reliable delivery
- Compare REST, GraphQL, gRPC and event-driven API styles
- Explain what large language models are and where they fit in a system architecture
- Apply the branching strategy and conduct a code review
- Explain the SOLID principles and identify violations in a code review
- Recognise common design patterns (Factory, Adapter, Observer, Strategy) and when to apply them

For deep explanations of each concept, see the [Beginner Concept Reference](Tech-Lead-Architect/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Prompt Engineering | [Prompt Engineering and GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/prompt-engineering-and-generative-ai) | Course |
| Leading Teams | [Leading Teams and Individuals – Pluralsight](https://app.pluralsight.com/paths/skills/leading-teams-and-individuals) | Course |
| System Design Case Study | [Uber – System Design Interview](https://www.youtube.com/watch?v=DGtalg5efCw) | Video |
| Security Architecture | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Docs |
| Azure Well-Architected Framework | [Microsoft Learn – Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) | Docs |
| Cloud Adoption Framework | [Microsoft Learn – Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/) | Docs |
| Observability | [OpenTelemetry – Getting Started](https://opentelemetry.io/docs/getting-started/) | Docs |

### After completing Mid you should be able to:

- Break down a complex system into bounded contexts using DDD
- Select appropriate architecture patterns for given requirements
- Facilitate a system design discussion with a team
- Lead a code review effectively
- Identify and articulate security risks in a system design
- Apply prompt engineering to improve AI integrations
- Apply the five pillars of the Azure Well-Architected Framework to evaluate a system design
- Write and maintain Architecture Decision Records (ADRs) to document significant technical choices

For deep explanations of each concept, see the [Mid Concept Reference](Tech-Lead-Architect/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| LLM Agent Architecture | [Architecting Resilient LLM Agents](https://arxiv.org/abs/2509.08646) | Paper |
| LLM Security Patterns | [Design Patterns for Securing LLM Agents](https://arxiv.org/abs/2506.08837) | Paper |
| LLM Security Reference | [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — Industry-standard security reference for LLM systems | Reference |
| Context Engineering | [Context Engineering – Pluralsight](https://app.pluralsight.com/paths/skills/context-engineering) | Course |
| Advanced AI-Assisted Dev | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) (Internal – requires company access) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) (Internal – requires company access) | Internal |
| Incident Management | [PagerDuty Incident Response Documentation](https://response.pagerduty.com/) | Docs |

### After completing Senior you should be able to:

- Define and communicate a GenAI adoption strategy for an enterprise
- Evaluate the security posture of an LLM-powered system
- Design an LLM agent architecture with appropriate guardrails
- Apply context engineering to production AI systems
- Lead an incident response process and facilitate blameless post-mortems
- Apply cost optimisation strategies and build performance budgets for cloud workloads
- Design internal developer platforms that reduce cognitive load and improve engineering productivity

For deep explanations of each concept, see the [Senior Concept Reference](Tech-Lead-Architect/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
  beginner: `# Tech Lead / Architect – Beginner Concept Reference


This document provides detailed explanations of the foundational concepts covered in the Beginner level of the Tech Lead / Architect learning path. Each section expands on the ideas behind the resources and gives you the vocabulary and mental models you need before moving to the Mid level.

---

## System Design Fundamentals – Components, Responsibilities and Trade-offs

System design is the process of defining the architecture, components, data flows and interactions of a system to satisfy a given set of requirements. For a tech lead or architect, understanding system design is not optional — it is the core skill that separates a senior individual contributor from someone who can guide an entire team or programme.

A distributed system is a collection of independent components that work together and appear to the user as a single coherent system. The "System Design for Beginners" video walks through the essential building blocks that appear again and again in real systems: clients (browsers, mobile apps, CLI tools), load balancers (which distribute traffic across servers), application servers (which execute business logic), databases (which persist state), caches (which store frequently read data in fast memory), message queues (which decouple producers and consumers), and content delivery networks (which serve static assets close to users).

Each component has a clear responsibility, and part of an architect's job is to ensure that responsibilities are not mixed inappropriately — for example, having business logic leak into the database tier, or allowing the client to make decisions that belong on the server.

A request's journey through a typical web system begins when a client types a domain name. The Domain Name System (DNS) translates that human-readable name into an IP address — the unique identifier that lets the client locate and connect to the correct server. Once the IP address is known, the client establishes a TCP connection and sends an HTTP request, which includes a header (containing metadata such as the request type and authentication tokens) and optionally a body (containing the payload). The server processes the request, interacts with downstream services such as a database or cache, and returns an HTTP response. This request/response cycle is the backbone of almost every web application.

System design always involves trade-offs. There is no universally correct architecture. Choosing a relational database gives you strong consistency and mature tooling but may limit horizontal scalability. Choosing an eventually consistent NoSQL store gives you write throughput but complicates application logic. Understanding the CAP theorem — which states that a distributed system can guarantee at most two of consistency (all nodes see the same data at the same time), availability (every request receives a response) and partition tolerance (the system continues operating despite network partitions between nodes) — gives you a framework for reasoning about these trade-offs honestly. In practice, network partitions are an unavoidable reality in any distributed system, so partition tolerance is not negotiable. The genuine trade-off is between consistency and availability: during a partition, do you refuse requests to protect data integrity, or do you serve potentially stale data to remain available?

**Why it matters:** As a tech lead, every significant technical conversation eventually becomes a conversation about trade-offs. You need a shared vocabulary for these discussions — one that lets you articulate why a design choice has costs, not just benefits. The moment you can walk a team through a whiteboard diagram explaining what each component does and why it is there, you stop being a senior developer and start being an architect.

**Key things to understand:**
- The purpose of each major component type and when to use each
- How DNS resolves a domain name and why this matters for system design
- How data flows through a system end-to-end for a typical request
- What trade-offs exist between consistency, availability, performance and cost
- Why requirements drive architecture, not the other way around
- The CAP theorem and why the real trade-off in practice is consistency versus availability

**Common pitfalls:**
- Over-engineering early: building for scale before you have evidence you need it
- Ignoring operational concerns: a system that cannot be monitored or deployed safely is not production-ready
- Treating architecture as a one-time decision rather than something that evolves with the product

---

## Scalability – Vertical vs Horizontal Scaling, Caching and Reliability

Scalability is the ability of a system to handle increased load without a proportional increase in cost or degradation in performance. Reliability is the ability of a system to perform its intended function correctly and consistently over time. Availability is the proportion of time a system is operational and accessible. These three properties are related but distinct, and a tech lead must be able to reason about all of them when evaluating a design.

The "20 System Design Concepts" video gives a concise mental model: start with a single server, add load. The first instinct is vertical scaling — give the machine more RAM, upgrade the CPU. It works, it is simple, and it has no code changes. But it hits a ceiling fast, and it is a single point of failure. The better long-term answer is horizontal scaling: add more machines, distribute the load with a load balancer, and accept that you now need to manage a pool of servers rather than one.

Vertical scaling (scaling up) means giving an existing machine more resources: a faster CPU, more RAM, or faster storage. It is simple to implement because the application does not need to change. However, it has a hard ceiling — there is a maximum machine size — and it introduces a single point of failure if that one machine goes down.

Horizontal scaling (scaling out) means adding more machines and distributing load across them. A load balancer sits in front of the pool of servers and routes incoming requests, typically using strategies such as round-robin (cycling through servers in sequence), least-connections (routing to whichever server has the fewest active requests) or consistent hashing (mapping a request to a server based on a hash of a key, which is useful when session affinity is needed). Horizontal scaling removes the ceiling and improves resilience because losing one node does not take the whole system down. The cost is complexity: the application must be stateless or externalise state so that any instance can serve any request.

Caching is one of the most effective scalability tools available. Storing the results of expensive computations or database reads in memory (for example with Redis) dramatically reduces the load on downstream systems. The main challenge is cache invalidation — knowing when a cached value is stale. Three common strategies are: time-to-live (the cached value expires after a fixed duration), write-through (the cache is updated whenever the source data is written) and cache-aside (the application checks the cache first and populates it on a miss). The "20 System Design Concepts" video illustrates the cache hierarchy from CDN down to CPU cache — each layer trades capacity for speed, and every layer follows the same principle.

Content Delivery Networks (CDNs) apply the same caching principle at a geographic scale. Static assets such as images, JavaScript files and videos are replicated to CDN servers distributed around the world. A user in Tokyo receives files from a Tokyo CDN node rather than waiting for data to travel from a data centre in Europe — reducing latency significantly without changing the application.

Database scaling has its own vocabulary. Read replicas serve read traffic from copies of the primary database. Sharding splits data across multiple database instances by a key such as user ID. Both approaches add operational complexity and require careful design.

Reliability and availability are improved by eliminating single points of failure, adding redundancy, implementing health checks and graceful degradation, and designing for failure recovery rather than failure prevention. An architect distinguishes between mean time between failures (MTBF) and mean time to recovery (MTTR): a reliable system fails rarely; a resilient system recovers quickly when it does fail.

**Why it matters:** Your team will regularly ask "can this scale?" or "what happens when the database goes down?" You need concrete answers grounded in architecture choices, not reassurances. Understanding these concepts lets you design systems that are robust by construction rather than by accident.

**Key things to understand:**
- When vertical scaling is appropriate and where its limits lie
- What statelessness means and why it is a prerequisite for horizontal scaling
- How load balancers distribute traffic using round-robin, least-connections and consistent hashing
- The role of caching and the challenges of cache invalidation
- How CDNs extend caching to a global geographic scale
- The difference between reliability (correct behaviour) and availability (uptime)
- Basic database scaling strategies: read replicas and sharding

**Common pitfalls:**
- Scaling prematurely before profiling to find the actual bottleneck
- Ignoring the database when scaling the application tier — the database often becomes the constraint first
- Assuming horizontal scaling is always cheaper — coordination overhead grows with node count
- Designing only for the happy path and not for partial failures or degraded modes

---

## API Styles – REST, GraphQL, gRPC and Event-Driven

An API (application programming interface) defines how two software components communicate. Choosing the right API style for a given integration is an architectural decision with long-term consequences, and tech leads are routinely called on to make or ratify this choice.

The "System Design for Beginners" course frames this clearly: HTTP is too low-level for most developers to work with directly — it handles individual data packets. We use higher-level application protocols like REST, GraphQL and gRPC to agree on how requests and responses are structured, what formats are used and how errors are communicated.

REST (Representational State Transfer) is the most widely used style for public-facing web APIs. It uses standard HTTP methods (GET, POST, PUT, DELETE) and URLs that represent resources. REST is stateless, cacheable and well understood, making it a safe default for most web integrations. Response codes carry meaning: 200 for success, 400-level codes for client errors, 500-level codes for server errors. REST's main limitation is over-fetching (the client receives more data than it needs) or under-fetching (the client must make multiple requests to assemble a complete view).

GraphQL is a query language that allows the client to specify exactly what data it needs in a single request. Introduced by Facebook in 2015, it solves the over- and under-fetching problems of REST and is particularly valuable for complex UIs that aggregate data from many resources. The trade-off is a more complex server implementation and less natural use of HTTP caching.

gRPC is a high-performance remote procedure call framework released by Google in 2016 that uses Protocol Buffers for serialisation. Protocol Buffers encode data in binary, making them more compact and faster to transmit than JSON. gRPC is strongly typed and generates client and server code from a schema. It is well suited for internal service-to-service communication where performance and type safety matter more than human readability.

Event-driven APIs decouple producers and consumers through a message broker such as Kafka or Azure Service Bus. Instead of one service calling another synchronously, it emits an event and any interested consumer processes it asynchronously. WebSockets take a different approach to the synchronous/asynchronous distinction: they establish a persistent, bidirectional connection between client and server, enabling real-time push communication without polling. WebHooks provide server-to-server event notification via an HTTP POST to a pre-registered URL.

**Why it matters:** A tech lead who defaults to REST for every integration will create the wrong tool for the job repeatedly. The choice of API style shapes the coupling between services, the performance characteristics of the system and the experience of the teams that consume your APIs. Understanding when each style is appropriate — and being able to explain that reasoning to a team — is a core architectural responsibility.

**Key things to understand:**
- The fundamental model of each API style and the problem it solves
- How HTTP response codes communicate success and failure in REST APIs
- When to choose each style based on consumer type, latency requirements and coupling tolerance
- The difference between synchronous and asynchronous communication and the implications for error handling
- Why event-driven communication introduces eventual consistency and what that means for the application
- How WebSockets enable real-time bidirectional communication

**Common pitfalls:**
- Choosing GraphQL for simple CRUD APIs where REST is sufficient
- Using REST for high-frequency internal service calls where gRPC would be more efficient
- Treating event-driven as inherently better — it introduces eventual consistency and operational complexity that must be justified

---

## DevOps and CI/CD – What It Means for a Technical Leader

DevOps is a culture and set of practices that brings development and operations together to shorten the delivery cycle and improve reliability. For a tech lead, DevOps literacy means understanding how the software you design actually gets built, tested and deployed — and taking responsibility for making that process as smooth and reliable as possible.

Continuous Integration (CI) is the practice of merging code changes into a shared branch frequently (at least daily) and validating each merge with an automated build and test run. The goal is to catch integration problems early, when they are cheap to fix. A CI pipeline typically checks out the code, compiles it, runs unit and integration tests, performs static analysis and produces a build artefact.

Continuous Delivery (CD) extends CI by automatically deploying the validated artefact to one or more environments. Continuous Deployment goes one step further by deploying to production automatically whenever all checks pass. The distinction matters: continuous delivery still requires a human approval gate before production; continuous deployment removes it.

As a tech lead, you influence the pipeline by setting quality gates: minimum test coverage thresholds, required security scans, mandatory code review approvals. You are also responsible for ensuring the team treats a broken pipeline as the highest priority — a red build that sits unresolved for hours is a sign of a team that has not yet internalised DevOps thinking.

Infrastructure as Code (IaC) — managing infrastructure through version-controlled configuration files rather than manual console clicks — is a key DevOps practice. It makes environments reproducible and reduces the gap between development and production.

**Why it matters:** A team that cannot deploy reliably cannot deliver value reliably. As a tech lead, the pipeline is part of the product. If deployments are manual, slow or error-prone, you will spend more time on incidents and less time on features. Understanding CI/CD at a leadership level means you can set standards, diagnose bottlenecks and hold the team accountable for delivery health — not just code quality.

**Key things to understand:**
- The difference between CI, continuous delivery and continuous deployment
- What a typical pipeline stage does and why each stage exists
- How quality gates work and why they matter for team discipline
- The relationship between IaC and environment consistency
- How deployment frequency, lead time and change failure rate signal the health of a delivery process

**Common pitfalls:**
- Treating the pipeline as someone else's responsibility — the tech lead owns delivery health
- Adding too many gates without fixing the underlying code quality issues, making pipelines slow and frustrating
- Not investing in test automation early, which makes CD impossible to achieve safely later

---

## AI and ML Literacy – What Every Tech Lead Should Understand

Artificial intelligence and machine learning are no longer specialist topics. Tech leads are increasingly asked to evaluate whether AI should be part of a system, which type of AI is appropriate and what the architectural implications are. You do not need to implement models, but you do need to understand the landscape well enough to make sound decisions.

Machine learning is the practice of training statistical models on data so that the model can make predictions or decisions on new, unseen data. Traditional ML models (regression, classification, clustering) are trained on structured tabular data and produce narrow predictions. They are interpretable, relatively lightweight and appropriate for many business problems.

Deep learning uses neural networks with many layers to learn representations from unstructured data such as images, audio and text. Large language models (LLMs) are a class of deep learning model trained on vast amounts of text. They generate coherent text and can follow natural language instructions, which makes them useful for tasks like summarisation, question answering, code generation and conversation.

Generative AI refers to models that produce new content — text, images, code, audio — rather than simply classifying or predicting. LLMs such as frontier models from OpenAI and Anthropic are generative AI models. They are stateless by default (they have no persistent memory across conversations) and produce probabilistic outputs, meaning the same input can produce different outputs.

For a tech lead, the key architectural consideration is where an LLM sits in the system: is it a standalone feature, a component in a larger pipeline, or a decision-making agent? Each placement has different implications for latency, cost, reliability and data governance.

**Why it matters:** Engineers on your team will propose using AI for increasingly more tasks. Business stakeholders will ask whether a feature "can use AI." Without a clear mental model of how these systems work, you cannot evaluate those proposals, identify risks or make architecture decisions about where AI fits. Literacy here is not about being able to train models — it is about being able to ask the right questions.

**Key things to understand:**
- The difference between traditional ML, deep learning and generative AI
- What an LLM is and how it generates output (token prediction, not reasoning from first principles)
- The concepts of temperature, context window and prompt as they apply to LLM behaviour
- Why LLM outputs are non-deterministic and what that means for testing and reliability
- The difference between using a hosted model API (OpenAI, Azure OpenAI) and deploying a model yourself

**Common pitfalls:**
- Treating LLM outputs as deterministic facts — they hallucinate and must be validated
- Choosing an LLM for a problem that a simpler, cheaper model would solve reliably
- Ignoring data privacy implications when sending sensitive data to a hosted model API

---

## Branching Strategy and Code Review – Leadership Responsibilities

A branching strategy defines how a team uses version control branches to manage parallel development, integrate changes and release software. Code review is the practice of having peers examine code changes before they are merged. Together, these two practices form the backbone of engineering quality at the team level, and the tech lead is responsible for establishing and upholding both.

A common branching strategy is trunk-based development, in which all developers integrate into a single main branch (trunk) frequently — ideally at least once per day. Short-lived feature branches are created, worked on briefly and merged back quickly. This keeps integration costs low and prevents long-lived divergence. An alternative is the Gitflow model, which uses separate branches for features, releases and hotfixes. Gitflow gives more structure for teams with infrequent releases but can create integration complexity in teams that deploy continuously.

The tech lead's role in branching strategy is to define the team convention, ensure it is documented and hold the team to it. When a developer opens a pull request that has been open for a week against a branch that is months behind main, that is a failure of process that the tech lead should address.

Code review is not primarily about finding bugs — automated tests do that better. It is about knowledge sharing, maintaining consistency with team standards and catching design problems before they are embedded in the codebase. As a tech lead, you set the tone: if your reviews are nitpicky and discouraging, the team will follow. If they are constructive, curious and focused on understanding intent, the team will adopt that culture.

**Why it matters:** The branching strategy and code review process are the most visible expressions of how a team works together. A tech lead who neglects these areas will see integration pain, knowledge silos, inconsistent quality and a codebase that gradually drifts from its intended design. Establishing good habits here early pays compounding returns over the life of the project.

**Key things to understand:**
- The trade-offs between trunk-based development and Gitflow
- What a good pull request description contains and why it matters
- How to give feedback that is specific, actionable and kind
- The tech lead's role in unblocking stale pull requests promptly
- How to set and communicate code review norms so the whole team aligns

**Common pitfalls:**
- Using code review as a gatekeeping ritual rather than a learning opportunity
- Allowing large pull requests that are impossible to review meaningfully — set a norm for small, focused changes
- Letting the branching strategy drift — inconsistency creates confusion and integration pain

---

## Software Design Principles – SOLID, DRY, KISS and Clean Code

Before an aspiring tech lead can design systems, they must master the principles that govern the quality of individual components. These principles are the vocabulary of code-level design discussions and the foundation on which architecture is built.

**SOLID** is an acronym for five object-oriented design principles that guide class and module design:

- **Single Responsibility Principle (SRP):** A class should have one, and only one, reason to change. When a class handles both business logic and database access, a change to either concern forces a change to the class — increasing the risk of unintended side effects.
- **Open/Closed Principle (OCP):** Software entities should be open for extension but closed for modification. New behaviour should be added by writing new code (e.g. a new implementation of an interface), not by modifying existing code that is already tested and deployed.
- **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types without altering the correctness of the programme. If a method accepts a base class, it must work correctly with any derived class — no surprises.
- **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. Prefer many small, focused interfaces over one large general-purpose interface.
- **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules; both should depend on abstractions. This is the principle that makes hexagonal architecture possible — the domain depends on interfaces, not on specific database or HTTP implementations.

**DRY (Don't Repeat Yourself)** states that every piece of knowledge must have a single, unambiguous, authoritative representation within a system. Duplication is not just wasted effort — it is a bug waiting to happen, because two copies of the same logic will inevitably diverge.

**KISS (Keep It Simple, Stupid)** reminds us that the simplest solution that meets the requirements is almost always the best. Complexity has a maintenance cost that compounds over time.

**YAGNI (You Aren't Gonna Need It)** is the agile counterpart: do not build features or abstractions until they are actually needed. Speculative generalisation wastes effort and creates unnecessary complexity.

**Why it matters:** Every architecture decision eventually manifests as code. If the code-level design is poor — classes with tangled responsibilities, duplicated logic, unnecessary abstractions — the architecture above it will be undermined regardless of how elegant the system diagram looks. A tech lead who can identify SRP violations in a code review and explain why they matter is more effective than one who only thinks at the whiteboard level.

**Key things to understand:**
- How each SOLID principle prevents a specific category of design problem
- Why DIP is the bridge between code-level design and system-level architecture
- How DRY applies not just to code but to configuration, infrastructure and documentation
- When KISS and YAGNI should override the desire for elegant abstraction
- How to recognise violations of these principles during code review

**Common pitfalls:**
- Applying DRY too aggressively — extracting shared code between two unrelated features creates coupling worse than the duplication it removed
- Over-abstracting in the name of OCP — not every piece of code needs to be extensible; apply the principle where change is likely
- Treating SOLID as a checklist rather than a set of guidelines — the principles sometimes conflict and require judgement

---

## Design Patterns – Foundational Patterns Every Tech Lead Should Recognise

Design patterns are reusable solutions to commonly occurring problems in software design. They provide a shared vocabulary for design discussions and reduce the time needed to understand a codebase.

**Creational patterns** control how objects are created: Factory Method (lets subclasses decide which class to instantiate), Builder (separates complex construction from representation), Singleton (single instance — use sparingly).

**Structural patterns** describe how objects are composed: Adapter (converts interfaces — the pattern behind anti-corruption layers in DDD), Decorator (adds behaviour dynamically — middleware pipelines are decorators), Facade (simplified interface to a complex subsystem — API gateways are facades).

**Behavioural patterns** manage communication: Observer (one-to-many notification — event-driven architectures at system scale), Strategy (interchangeable algorithms — load balancing strategies), Repository (collection-like interface mediating domain and data layers — central to DDD).

**Why it matters:** When a tech lead says "we should use an adapter here" or "this is a classic observer pattern," the team immediately understands the intent without lengthy explanation. Patterns are a shared design language that accelerates code reviews and design discussions.

**Key things to understand:**
- The purpose and trade-offs of each pattern listed above
- How design patterns map to architecture patterns at a larger scale (observer to event-driven, adapter to anti-corruption layer, facade to API gateway)
- That patterns are tools, not goals — do not force a pattern where a simpler solution exists

**Common pitfalls:**
- Pattern obsession — applying patterns for their own sake rather than to solve a concrete problem
- Using Singleton as a convenience for global state rather than addressing the underlying design issue
- Choosing inheritance-based patterns when composition would be simpler and more flexible
`,
  mid: `# Tech Lead / Architect – Mid Concept Reference


This document provides detailed explanations of the concepts covered in the Mid level of the Tech Lead / Architect learning path. At this level the focus shifts from understanding individual technologies to designing systems deliberately and leading the people who build them.

---

## System Design at Scale – The 30 Concepts That Separate Good from Great

The "System Design was HARD until I Learned these 30 Concepts" video provides a comprehensive taxonomy of the patterns and techniques that appear in every large-scale system. Rather than treating these as independent facts, a tech lead should understand how they compose: each concept solves a specific problem, and real systems combine many of them.

**Client-server architecture and the network layer.** Every web application rests on the client-server model. The client sends requests; the server processes and responds. DNS translates domain names to IP addresses. Reverse proxies (including load balancers) intercept requests before they reach application servers. HTTPS encrypts all traffic in transit using TLS, preventing interception of data in plain text. These primitives are the foundation; everything else builds on top.

**Database scaling techniques.** The video enumerates five key database scaling techniques that a tech lead must be able to reason about:
- *Indexing* is the first lever to pull. A database index — like the index at the back of a book — allows the engine to jump directly to matching rows without scanning the entire table. Indexes accelerate reads at the cost of slower writes and additional storage; they should be created on columns used frequently in queries.
- *Replication* creates read replicas — copies of the primary database that handle read traffic. A primary replica accepts all writes and propagates changes to the read replicas. This improves read throughput and availability; if the primary fails, a replica can be promoted. Replication is the right tool for read-heavy workloads.
- *Sharding* (horizontal partitioning) splits data across multiple database instances using a shard key such as user ID. Each shard handles a subset of the data, distributing both storage and write load. Sharding is complex — it complicates cross-shard queries and resharding — and should be a last resort after simpler techniques are exhausted.
- *Vertical partitioning* splits a wide table into narrower ones, each containing a logically related subset of columns. This reduces the amount of data scanned per query when different workloads access different column subsets.
- *Denormalisation* pre-joins frequently combined data into a single table, trading write overhead and storage for faster reads. It is commonly used in read-heavy analytical workloads where join latency is the bottleneck.

**Caching and CDNs.** The video reinforces the cache-aside pattern: check the cache first; on a miss, fetch from the database and populate the cache with a TTL. This simple pattern, consistently applied, can absorb the majority of read load for many workloads. CDNs extend the same principle geographically for static content.

**Blob storage and large files.** Traditional databases are not suited to storing large unstructured files. Object storage (such as Azure Blob Storage or Amazon S3) stores files in logical containers, assigns each a unique URL and replicates them automatically. This is the standard pattern for images, videos and documents in any cloud-native system. Pairing blob storage with a CDN eliminates latency for static media delivery.

**Distributed system fundamentals.** The video connects these scaling techniques to the CAP theorem — at scale, you must choose between consistency and availability when a network partition occurs. This is not an abstract theorem; it surfaces in real architectural decisions such as whether a write that cannot reach a replica should block or succeed with eventual propagation.

**Rate limiting and idempotency.** As systems grow, protecting them from overload and duplicate requests becomes critical. Rate limiting assigns a request quota per client (e.g. 100 requests per minute) and rejects requests that exceed it. Common algorithms include fixed window, sliding window and token bucket — each with different burst-handling characteristics. Idempotency ensures that retried requests produce the same outcome as the original: a payment retried due to a network timeout should not charge the customer twice. Implementing idempotency requires assigning a unique ID to each request and checking whether it has already been processed before acting on it.

**API gateway.** A centralised API gateway handles cross-cutting concerns — authentication, rate limiting, logging, monitoring, request routing — for a suite of microservices. Rather than exposing each service directly to the internet and duplicating these concerns in every service, the gateway acts as a single entry point. This is the standard pattern in any microservices architecture.

**Message queues and async communication.** Direct synchronous API calls between services create tight coupling and cascading failures. A message queue (such as Kafka or Azure Service Bus) introduces asynchronous decoupling: the producer places a message in the queue and returns; the consumer retrieves and processes it independently. This absorbs traffic spikes, prevents overload propagation and enables fan-out to multiple consumers.

**Why it matters:** A tech lead who has internalised these 30 concepts can hold an intelligent technical conversation about any layer of a large system — from DNS resolution to database sharding to rate limiting to blob storage. More importantly, they can sequence these solutions correctly: do not shard before you have indexed; do not cache before you have profiled; do not go async before you understand the consistency implications.

**Key things to understand:**
- The five database scaling techniques and when to apply each in sequence
- The CAP theorem as it applies to real sharding and replication decisions
- Rate limiting algorithms and why idempotency is a prerequisite for safe retries
- How an API gateway centralises cross-cutting concerns for microservices
- When to introduce message queues and what consistency trade-offs they entail

**Common pitfalls:**
- Reaching for sharding or denormalisation before exhausting simpler techniques like indexing and replication
- Implementing caching without a cache invalidation strategy, leading to stale data being served indefinitely
- Adding rate limiting without first ensuring idempotency — a rate-limited retry can still cause duplicates if the original request partially succeeded

---

## Domain-Driven Design – Strategic Patterns (Bounded Contexts, Ubiquitous Language, Context Maps)

Domain-Driven Design (DDD) is an approach to software development that centres the design process on the business domain — the real-world subject area the software supports. Eric Evans introduced DDD in 2003, and it remains the most influential body of thinking for architects working on complex business systems. Strategic DDD deals with how to divide a large domain into manageable pieces and how those pieces relate to each other.

A bounded context is an explicit boundary within which a particular domain model is defined and applicable. Inside the boundary, terms have precise meanings and the model is internally consistent. Outside it, the same word may mean something different. For example, "account" in a banking system means something different in the lending context than in the payments context. Defining bounded contexts forces the team to make these distinctions explicit rather than allowing a single tangled model to grow without limit.

Ubiquitous language is the shared vocabulary that domain experts and developers use within a bounded context. It should appear in code: class names, method names, variable names and database column names should reflect the language the business uses. When ubiquitous language is maintained rigorously, business stakeholders can read the code at a high level and the distance between business intent and implementation narrows.

A context map is a diagram showing the relationships between bounded contexts and how they integrate. Integration patterns include shared kernel (two contexts share a subset of the model), customer-supplier (one context serves another), conformist (the downstream context accepts the upstream model without translation) and anti-corruption layer (the downstream context translates the upstream model into its own terms). The context map is not a one-time diagram — it is a living record of the relationships and dependencies between the teams and systems that make up the organisation.

**Why it matters:** Most large system failures are not caused by bad code — they are caused by a bad model. When two teams use the same word to mean different things, or when a single model tries to serve every part of the business, complexity compounds rapidly. Strategic DDD gives a tech lead the vocabulary and tools to draw explicit boundaries, reduce the cost of change and align technical structure with organisational structure.

**Key things to understand:**
- How to identify bounded context boundaries by looking for where vocabulary changes or teams differ
- Why ubiquitous language reduces translation costs between business and engineering
- Which context map integration patterns protect autonomy and which introduce coupling
- How bounded contexts map to team and service boundaries

**Common pitfalls:**
- Drawing bounded context boundaries along technical layers (frontend, backend, database) rather than domain lines
- Allowing ubiquitous language to degrade over time as terminology drifts between business and code
- Treating the context map as a one-time exercise rather than a living document

---

## Domain-Driven Design – Tactical Patterns (Aggregates, Entities, Value Objects, Repositories, Domain Events)

Tactical DDD provides a set of building blocks for implementing the domain model inside a bounded context. These patterns give the development team a shared vocabulary for discussing design decisions and a set of rules that protect the integrity of domain state.

An entity is an object that has a unique identity that persists over time. A customer is an entity: even if the customer's name and address change, the customer record remains the same object because it has a stable identifier. The identity is what matters, not the current attribute values.

A value object has no identity — it is defined entirely by its attributes. A monetary amount of 100 SEK is a value object. Two amounts of 100 SEK are interchangeable. Value objects should be immutable: rather than changing a value object, you replace it with a new one. This immutability makes them safe to share and easy to reason about.

An aggregate is a cluster of entities and value objects treated as a single unit for data changes. The aggregate root is the only entry point to the cluster; nothing outside the aggregate may hold a direct reference to an internal entity. All state changes go through the root, which enforces invariants — the business rules that must always be true. Aggregates define the consistency boundary: everything inside one aggregate is always consistent; between aggregates, eventual consistency is acceptable.

A repository is an abstraction over the persistence mechanism for a given aggregate. Application code retrieves and stores aggregates through the repository interface, which hides the details of the underlying database. This keeps the domain model independent of infrastructure choices and makes the domain testable in isolation. A repository typically offers operations like \`findById\`, \`save\` and \`findBySpecification\`, but does not expose SQL or ORM internals.

Domain events represent something that happened in the domain that other parts of the system may need to react to. They are named in the past tense (OrderPlaced, PaymentReceived) and are immutable records of fact. Publishing domain events allows bounded contexts to react to each other without direct coupling.

**Why it matters:** Without these building blocks, domain logic tends to scatter across services, controllers and database procedures, making it impossible to reason about business rules in one place. Tactical patterns give a team a shared language for design conversations — you can discuss whether something is an entity or a value object, whether an aggregate boundary is too wide, or whether a behaviour belongs to the domain or the application layer, and everyone understands what the question means.

**Key things to understand:**
- The difference between entity identity and value object equality
- How aggregate boundaries enforce invariants and why they should be kept small
- Why the aggregate root is the only public interface to an aggregate
- The role of the repository in separating domain logic from infrastructure concerns
- How domain events enable loose coupling between bounded contexts

**Common pitfalls:**
- Creating God aggregates that own too much state — large aggregates cause contention and slow writes
- Using database IDs as aggregate roots without thinking about domain identity
- Confusing value objects with entities because both happen to be stored in the database
- Leaking persistence details (ORM annotations, SQL queries) into the domain model itself

---

## Architecture Patterns – Monolith, Microservices, Hexagonal, Event-Driven and CQRS

Architecture patterns are proven solutions to recurring structural problems in software systems. A tech lead needs to understand at least a handful of these patterns deeply enough to recommend them, explain their trade-offs and — critically — know when each one is and is not appropriate.

A monolith is a single deployable unit containing all of the application's functionality. It is the correct starting point for most new systems. A well-structured monolith — sometimes called a modular monolith — organises code into clear modules with explicit boundaries, uses dependency inversion between modules and avoids circular dependencies. This structure preserves the option to extract services later, once you understand the domain well enough to draw the right boundaries. The mistake is not starting with a monolith; the mistake is letting it become an unstructured big ball of mud.

Microservices architecture decomposes a system into independently deployable services, each owning its own data and exposing a well-defined interface. This enables independent scaling, independent deployment and technology diversity across services. The trade-offs are significant: network latency replaces in-process calls, distributed transactions are hard to reason about, operational complexity increases substantially (service discovery, health checks, distributed tracing, multiple deployment pipelines) and a team must be mature enough to manage that complexity before the benefits outweigh the costs. A good heuristic: extract a service when you have a clear, stable domain boundary, an independent scaling requirement, or a team that needs to deploy independently. Do not extract services prematurely.

Layered (or N-tier) architecture organises code into horizontal layers — typically presentation, application, domain and infrastructure — where each layer may only depend on the layer beneath it. It is the most familiar pattern and a reasonable default for simple applications. The risk is that over time layers leak into each other, leading to the "big ball of mud" anti-pattern.

Hexagonal architecture (also called ports and adapters) inverts the dependency rule: the domain sits at the centre and all external concerns (databases, HTTP, message queues, UI) connect to it through defined ports (interfaces) with adapters (implementations). This makes the domain independently testable and allows infrastructure to be swapped without touching business logic. Use it when the domain is complex enough to justify the abstraction overhead — it is the natural complement to DDD bounded contexts.

Event-driven architecture builds systems around the production and consumption of events rather than synchronous request-response calls. Services are decoupled — a producer does not know which consumers exist. This improves scalability and resilience but introduces eventual consistency and makes tracing a complete business transaction more complex. Use it when services need to react to things that happen in other services without tight coupling, when you need to fan out to multiple consumers, or when you need an audit trail of domain state changes.

CQRS (Command Query Responsibility Segregation) separates the write model (commands that change state) from the read model (queries that return data). This allows each model to be optimised independently — for example, the write model enforces strict invariants while the read model uses denormalised projections optimised for UI needs. CQRS is often combined with event sourcing, where state is stored as a sequence of immutable events rather than a current snapshot, giving a full audit trail and the ability to replay history. Use CQRS when the read and write workloads have significantly different shapes or scale requirements; it is overkill for simple CRUD applications.

**Why it matters:** Choosing the wrong architecture pattern for a system's maturity, team size or domain complexity is one of the most expensive mistakes a tech lead can make. An architecture that is too sophisticated creates unnecessary complexity; one that is too simple becomes a bottleneck as the system grows. The value of knowing these patterns is not in picking the most impressive one — it is in being able to justify a choice with concrete reasoning about the team's current situation.

**Key things to understand:**
- When a modular monolith is the right choice and when to extract services
- The operational prerequisites for microservices (CI/CD per service, distributed tracing, service discovery)
- Which pattern suits which category of problem: layered for simple CRUD, hexagonal for complex domains, event-driven for decoupled reactions, CQRS for differentiated read/write workloads
- How hexagonal architecture protects the domain from infrastructure concerns
- Why CQRS is not appropriate for every system and what complexity it introduces

**Common pitfalls:**
- Jumping to microservices before the domain boundaries are well understood — premature extraction creates distributed monoliths
- Applying CQRS to simple systems where a single model would suffice — the overhead is not justified
- Implementing hexagonal architecture by name but still allowing infrastructure imports inside the domain
- Designing event-driven systems without addressing event ordering, idempotency and dead-letter handling

---

## Security Architecture – Threat Modelling and OWASP for Architects

Security architecture is not a separate track layered on top of a design — it is embedded in the design from the start. A tech lead who treats security as an afterthought will repeatedly find that critical issues surface late, when they are expensive to fix.

Threat modelling is the practice of systematically identifying potential threats to a system before building it. The most widely used framework is STRIDE, which categorises threats as Spoofing (claiming a false identity), Tampering (modifying data or code), Repudiation (denying an action occurred), Information Disclosure (exposing data to unauthorised parties), Denial of Service (making the system unavailable) and Elevation of Privilege (gaining access beyond what is permitted). Walking through STRIDE for each component and data flow produces a prioritised list of risks that can be addressed in the design.

OWASP (Open Web Application Security Project) publishes the Top Ten list — a consensus ranking of the most critical web application security risks. As an architect, you need to understand not just the names but the mechanisms: why SQL injection works, how broken access control manifests, what insecure design means at the architecture level. The OWASP Top Ten shapes your design decisions: do you enforce authentication at the gateway or at each service? Do you use parameterised queries everywhere? Are secrets managed through a vault rather than environment variables?

Authentication and authorisation are two distinct concerns that are frequently confused. Authentication answers "who are you?" Authorisation answers "what are you allowed to do?" An architect defines the authentication mechanism (OAuth 2.0 / OIDC with an identity provider, for example) and the authorisation model (role-based, attribute-based or policy-based access control).

A tech lead's role in security is not to be the team's only security expert but to ensure security thinking is embedded in every design conversation. Running a lightweight STRIDE exercise as part of a design review, asking "what can go wrong if this endpoint is misconfigured?" during a code review, and referencing the OWASP Top Ten when evaluating a proposed data flow are practical habits that prevent expensive late-stage fixes.

**Why it matters:** Security vulnerabilities discovered after deployment can destroy user trust, trigger regulatory penalties and require emergency remediation work that derails the team's roadmap. A tech lead who normalises security thinking as part of design — rather than treating it as a pre-launch checklist — dramatically reduces the probability of these outcomes and builds a team that thinks about attack surfaces as naturally as it thinks about performance.

**Key things to understand:**
- How to run a STRIDE threat model for a system design diagram
- The mechanisms behind the most common OWASP Top Ten vulnerabilities
- The difference between authentication and authorisation and how to design for both
- The principle of least privilege and how to apply it to service identities and data access
- How to facilitate a security review as a team activity rather than a solo expert audit

**Common pitfalls:**
- Leaving security to a penetration test at the end of the project — by then, fixes are expensive
- Designing a single authentication perimeter and assuming everything inside is trusted
- Conflating encryption at rest with encryption in transit — both are necessary and independent

---

## Observability for Architects – Logs, Metrics, Traces and Service Level Objectives

Observability is the ability to understand what a system is doing and why, based on the data it emits. For a tech lead, observability is not an operational add-on — it is a design concern that must be built in from the start.

The three pillars of observability are logs, metrics and traces. Logs are timestamped records of discrete events — errors, state changes, user actions. Metrics are numeric measurements aggregated over time — request rate, error rate, latency percentiles, CPU utilisation. Traces follow a single request as it traverses multiple services, showing where time is spent and where failures occur. Each pillar answers different questions, and a well-observed system uses all three.

Service Level Indicators (SLIs) are the specific measurements you use to quantify system health — for example, the proportion of requests that complete in under 300 milliseconds, or the percentage of requests that return a non-error response. SLIs answer the question "what do we measure?"

Service Level Objectives (SLOs) define what acceptable looks like by setting a target for an SLI — for example, "99.5% of requests complete in under 300 milliseconds over a rolling 30-day window." SLOs answer the question "what is good enough?" and give the team an objective basis for deciding when to invest in reliability versus features.

Service Level Agreements (SLAs) are formal commitments made to external customers, typically with contractual consequences if they are breached. SLAs are derived from SLOs but are intentionally set with more headroom — an SLO of 99.9% might back an SLA of 99.5%. The architect's role is to ensure the internal SLO is ambitious enough that breaching the external SLA is unlikely.

An architect's responsibility is to define what "healthy" means for a system and ensure the observability infrastructure exists to detect when it is not. This means deciding which SLIs matter for each service, setting SLOs before launch, instrumenting code to emit the right logs, metrics and traces, and ensuring dashboards and alerts are in place from day one — not added after the first incident.

**Why it matters:** Systems without observability are systems you cannot reason about under pressure. When an incident occurs, you need to know what changed, where the failure is and how users are affected — in minutes, not hours. A tech lead who designs observability into the architecture from the start turns incidents from chaotic firefights into structured investigations with clear data.

**Key things to understand:**
- The three pillars of observability and the distinct questions each answers
- The relationship between SLIs, SLOs and SLAs and who owns each
- How distributed tracing connects logs and metrics across service boundaries
- Why observability must be a design-time concern, not an afterthought

**Common pitfalls:**
- Logging everything without structure — high-volume unstructured logs are expensive and difficult to query
- Setting SLOs without historical data or user expectations, making them arbitrary rather than meaningful
- Confusing monitoring (alerting when a threshold is breached) with observability (the ability to ask arbitrary questions about system behaviour)
- Treating observability as the platform team's responsibility — the team that builds the service must instrument the service

---

## Technical Leadership – Running Design Reviews and Decision Records

A tech lead's value is not just technical knowledge — it is the ability to channel that knowledge into good decisions made by the team, not just by the tech lead alone. Two tools that make this concrete are design reviews and architecture decision records.

A design review is a structured conversation in which the team examines a proposed solution before committing to it. The goal is not to find fault with the author but to surface assumptions, identify risks and share knowledge. A well-run design review begins with the author presenting the problem and constraints before the solution, so reviewers can evaluate whether the proposed approach actually fits. The tech lead facilitates, ensures that dissenting voices are heard and steers the conversation toward a decision rather than an open-ended discussion. After the review, someone records the outcome — the decision, the key objections raised and the conditions under which the decision should be revisited.

An Architecture Decision Record (ADR) is a short document that captures an architectural decision, the context in which it was made, the options that were considered and the rationale for the choice. ADRs are stored in version control alongside the code (typically in a \`docs/adr/\` directory), so future developers can understand why the system is the way it is without having to reconstruct the reasoning from memory or tribal knowledge. The format is deliberately lightweight: a title, status (proposed, accepted, deprecated, superseded), context, decision and consequences.

The act of writing an ADR often improves the decision itself. Forcing the author to articulate the trade-offs in writing frequently reveals assumptions that had not been examined. The record also makes it easier to revisit a decision when circumstances change — you can see what the original constraints were and whether they still apply.

When proposing a significant architectural change, a tech lead will often write a draft ADR first, share it for asynchronous review and then use the design review session to resolve outstanding objections. This sequence — written proposal, async comments, synchronous discussion — is more efficient than arriving at a meeting with only a verbal proposal and expecting the team to make a good decision in real time.

**Why it matters:** Teams that skip design reviews and never write down their decisions accumulate invisible technical debt — not in the code, but in their heads. When the engineer who made a key decision leaves the team, the reasoning leaves with them. The next team member who touches the same component has no way to know whether the design was intentional, accidental or a known compromise. ADRs are cheap insurance against this kind of institutional memory loss.

**Key things to understand:**
- How to structure a design review so it produces a decision rather than a debate
- The core fields of an ADR and why each one matters
- How to propose an ADR via a pull request and manage the review process
- How to create a team habit of writing ADRs without making it feel bureaucratic
- The difference between a design review and a code review

**Common pitfalls:**
- Running design reviews as approval ceremonies rather than genuine collaborative explorations
- Writing ADRs only for major decisions — small decisions accumulate into large constraints
- Storing ADRs in a wiki that drifts from the codebase rather than in the repository itself

---

## Leading Teams – Giving Feedback, Delegation and Growing Engineers

Technical leadership is inseparable from people leadership. A tech lead who is technically excellent but who hoards decisions, gives crushing feedback or fails to develop the engineers around them will limit the team's ability to grow and deliver. The skills in this section are as important as any architecture pattern.

Feedback is the mechanism by which engineers improve. Effective feedback is specific (tied to an observable behaviour or artifact, not a character judgement), timely (given close to the event rather than saved for a quarterly review), actionable (it suggests what to do differently) and kind (it assumes positive intent and treats the recipient as capable of improvement). The SBI model (Situation, Behaviour, Impact) is a useful framework: describe the situation, the specific behaviour you observed and the impact it had, then invite the recipient to respond.

Delegation is not the same as task assignment. When you delegate, you transfer ownership of an outcome to another person and give them the authority and support they need to achieve it. Effective delegation requires matching the level of autonomy to the engineer's readiness: a junior engineer needs clear instructions and frequent check-ins; a senior engineer needs context and a goal, then space to work. The Situational Leadership model describes four leadership styles (directing, coaching, supporting, delegating) and maps them to the follower's development level.

Growing engineers means creating the conditions in which people can stretch beyond their current capability. This includes giving stretch assignments that are challenging but achievable, pairing junior engineers with seniors on meaningful work, sponsoring engineers for opportunities that raise their visibility and giving timely, specific developmental feedback.

Hiring is also a tech lead responsibility. Writing good job descriptions, designing technical interviews that assess the skills actually needed on the team, providing structured and consistent feedback after interviews and making hiring decisions based on evidence rather than instinct are all part of the role. A single poor hire affects the whole team; a single great hire can raise the bar for everyone.

**Why it matters:** A tech lead who is also a great individual contributor but a poor people leader creates a ceiling. The team's output is bounded by what the tech lead can personally review, decide and unblock. The only way to scale impact beyond what one person can do is to develop the team around you — which requires investing in feedback, delegation, growth and hiring as deliberately as you invest in technical design.

**Key things to understand:**
- The SBI model for giving feedback and how to apply it in practice
- The difference between delegation and task assignment
- How to calibrate autonomy to an engineer's readiness level
- What it means to be a sponsor (not just a mentor) for engineers on your team
- How to structure a fair and effective technical hiring process

**Common pitfalls:**
- Delegating outcomes without authority — engineers cannot succeed if they cannot make decisions
- Giving only positive feedback to avoid conflict — this deprives engineers of information they need to grow
- Holding onto complex work because it is easier to do it yourself than to coach someone through it

---

## Prompt Engineering – Architectural Perspective on AI Integration

Prompt engineering is the practice of designing inputs to language models to produce useful, reliable outputs. For a tech lead, the interest is not in prompting as a creative skill but in understanding how prompt design affects system behaviour and what architectural choices enable or constrain it.

A prompt is the text (or combination of text, data and instructions) that is sent to an LLM to elicit a response. The system prompt sets the model's role and constraints; the user prompt is the specific request. In a production system, the prompt is constructed programmatically — it combines static instructions with dynamic content from databases, user input and tool outputs. This construction logic is part of the system architecture and needs to be treated as such: versioned, tested and observable.

Prompt patterns are reusable structures that solve common problems. A few that matter architecturally: chain-of-thought prompting asks the model to reason step by step before giving an answer, which improves accuracy on complex tasks; few-shot prompting provides examples of the desired input-output format, which improves consistency; output format instructions (asking for JSON, for example) make downstream parsing reliable and reduce error handling complexity.

Retrieval-Augmented Generation (RAG) is an architectural pattern in which relevant context is retrieved from a knowledge base and injected into the prompt at inference time. This allows an LLM to answer questions about private or recent data without retraining. The retrieval mechanism (typically vector search) and the quality of the injected context are as important as the prompt itself.

**Why it matters:** As AI components become part of more systems, prompt construction logic will increasingly sit in codebases your team owns. Without treating it as engineering artefact — with tests, version history and observability — changes to prompts will silently break behaviour and be impossible to diagnose. A tech lead who understands prompt engineering can set standards for how AI components are built, reviewed and operated, rather than treating them as a black box that someone else manages.

**Key things to understand:**
- How the system prompt and user prompt interact and why their separation matters
- Why prompt construction logic belongs in version control and must be tested
- The RAG pattern and when to use it instead of fine-tuning
- How to measure prompt reliability (consistency, correctness, format adherence) in a production context

**Common pitfalls:**
- Hardcoding prompts in application code with no versioning or testing strategy
- Assuming longer, more detailed prompts always produce better results — brevity and clarity often outperform length
- Ignoring token costs when designing prompts for high-traffic systems — verbose prompts become expensive at scale

---

## Azure Well-Architected Framework

The Azure Well-Architected Framework (WAF) is Microsoft's set of guiding principles for designing and operating cloud workloads. It defines five pillars — Reliability, Security, Cost Optimisation, Operational Excellence, and Performance Efficiency — that provide a structured approach to evaluating architectural decisions.

WAF is not just a Microsoft checklist — it codifies principles that apply to any cloud architecture. The framework includes design principles, design review checklists, Azure Advisor recommendations, and reference architectures. The Well-Architected Review is a structured assessment that evaluates a workload against all five pillars and produces prioritised recommendations.

The Cloud Adoption Framework (CAF) complements WAF by providing guidance for the organisational and strategic aspects of cloud adoption: strategy, planning, readiness, migration, governance, and management. While WAF focuses on individual workload quality, CAF addresses the broader enterprise cloud journey.

**Why it matters:** As a Tech Lead or Architect, every system design decision involves trade-offs across the five pillars. Understanding WAF gives you a shared vocabulary for discussing these trade-offs with stakeholders, a structured approach for design reviews, and alignment with the cloud platform your organisation has chosen. It also ensures you consider dimensions (cost, operational excellence) that are easy to overlook when focused on features.

**Key things to understand:**
- Reliability: the ability of a system to recover from failures and continue to function. Design for failure: use availability zones, implement health probes, design retry policies, plan for disaster recovery. Key question: what happens when this component fails?
- Security: protect the workload from threats through defence in depth. Identity-based access control, network segmentation, encryption at rest and in transit, security monitoring.
- Cost Optimisation: deliver business value while minimising unnecessary spending. Right-size resources, use auto-scaling, choose appropriate pricing tiers, implement cost alerts.
- Operational Excellence: the processes and practices that keep a workload running in production. Infrastructure as code, CI/CD, monitoring and alerting, incident management, documentation. Key question: can the team that inherits this system operate it successfully?
- Performance Efficiency: the ability of a workload to scale and meet demand. Identify bottlenecks, implement caching, choose appropriate compute, use CDN for static content, design for horizontal scaling.

**Common pitfalls:**
- Optimising for one pillar at the expense of others — a maximally reliable system may be prohibitively expensive. WAF is about finding the right balance for your specific workload and business requirements
- Treating WAF as a one-time assessment rather than a continuous practice. Workloads evolve, and the architectural trade-offs should be reassessed as requirements and usage patterns change
- Ignoring Cost Optimisation during initial design ("we will optimise costs later") — cost-efficient architecture is much easier to achieve from the start than to retrofit
- Not involving the operations team in architectural decisions — Operational Excellence requires that the people who will run the system can actually operate it effectively
`,
  senior: `# Tech Lead / Architect – Senior Concept Reference


This document provides detailed explanations of the concepts covered in the Senior level of the Tech Lead / Architect learning path. At this level the focus is on enterprise-scale decision-making, the architecture of AI-powered systems and the organisational practices that let those systems be built and governed responsibly.

---

## Real-World System Design – Lessons from the Uber Case Study

The Uber system design video is one of the most instructive publicly available breakdowns of a production-scale, real-time system. Working through it rigorously provides a template for how senior architects approach any complex system design problem: start with requirements, model the data, define APIs, walk the key flows, then dive into the hard technical problems that the flows expose.

**Requirements-first design.** The video begins not with components but with functional requirements (what the system must do) and non-functional requirements (how well it must do it). For Uber, the functional requirements are: ride requests with fare estimates, driver matching, real-time driver tracking and push notifications. The non-functional requirements are: support 100 million+ daily active users, high availability (24/7, minimal downtime), low latency (fast even on poor networks). This decomposition discipline prevents the most common system design error: jumping to solutions before understanding the problem.

**Data modelling shapes the entire system.** The data model in the video — Riders, Drivers, Vehicles, Fares, Rides, Payments — is not an afterthought. The Rides table has a status field (requested, accepted, completed, cancelled) and a transactional integrity requirement (ride creation and payment must be atomic). This immediately points to a relational database with ACID guarantees (PostgreSQL) for the core transactional data, rather than a NoSQL store — because the operations that modify this data are financial in nature and consistency cannot be traded away.

**Protocol selection is a design decision, not an implementation detail.** The video explicitly compares four real-time communication approaches for driver location updates — long polling, Server-Sent Events, WebSockets and QUIC — and selects WebSockets for two reasons: bidirectional communication (the driver sends location, the rider receives updates) and widespread understanding. The analysis matters more than the conclusion: a senior architect should be able to walk through this comparison for any real-time requirement, articulating the trade-offs of each option rather than defaulting to WebSockets automatically.

**Geospatial indexing is a first-class concern.** Matching a rider to a nearby driver requires answering the question "which drivers are within X km of this location?" efficiently. The video compares three approaches:
- *Geohashing* encodes latitude and longitude into a short alphanumeric string. The world is divided into a hierarchical grid; the longer the geohash prefix, the more granular the cell. Finding nearby drivers means searching the same geohash cell and its neighbours — a simple prefix query in Redis. It is straightforward to implement and sufficient for most ride-sharing use cases, though cell shapes become distorted at high latitudes.
- *Quadtrees* use a hierarchical tree structure that recursively divides space into four quadrants. They adapt naturally to data density — a dense city block gets finer subdivision than a rural area — making them efficient when driver density varies significantly. The trade-off is higher implementation complexity.
- *H3 (Uber's hexagonal index)* tessellates the globe with hexagons, which have better geometric properties than rectangles (more uniform area, better K-nearest-neighbour search behaviour). Uber uses H3 in production for this reason, but its implementation complexity is higher than geohashing.

A senior architect chooses geohashing for a new system because it is simple, correct for the scale and debuggable. They know about H3 and can explain why Uber uses it — and they can describe the conditions under which migrating to H3 would be justified.

**Distributed locking prevents race conditions at the critical path.** When the driver assignment service identifies candidate drivers and attempts to assign a ride, a race condition exists: two driver assignment service instances could simultaneously offer the same ride to the same driver. The solution is a Redis-based distributed lock. Before making a ride offer, the service acquires a lock on the ride ID. If the lock acquisition fails, another instance already holds it and the current instance moves to the next candidate. The lock is released when the driver accepts or declines. This pattern — acquire lock, perform critical section, release — is fundamental to distributed systems and appears in payment processing, inventory management and any scenario where duplicate action would be harmful.

**Scaling a system like Uber.** The video's additional discussion points map to the same scaling techniques from the 30 Concepts video, now applied to a concrete system:
- The location Redis cluster is sharded by region or driver ID with master-replica configurations and Redis Sentinel for failover.
- The PostgreSQL database uses read replicas for reads and partitioning or sharding for write scaling.
- WebSocket servers require sticky sessions or TCP-level load balancing to maintain persistent connections, along with heartbeat mechanisms to detect and clean up stale connections.
- Monitoring uses Prometheus and Grafana for real-time metrics; centralised logging aggregates from all services; structured JSON logs enable fast querying.

**Why it matters:** A senior architect does not just understand the building blocks of distributed systems in the abstract — they can apply them to a specific, constrained design problem under time pressure. The Uber case study demonstrates how requirements constrain technology choices, how data models interact with consistency requirements, how protocol selection follows from communication patterns and how the same scaling primitives (sharding, replication, caching, distributed locking) appear at every layer of a real system.

**Key things to understand:**
- How to decompose a system design problem into functional requirements, non-functional requirements, data model, API and key flows before touching implementation
- Why ACID-compliant relational databases are the right choice for financial data, even in a high-scale system
- The trade-offs between geohashing, quadtrees and H3 hexagonal indexing for geospatial proximity queries
- How distributed locking with Redis prevents race conditions in concurrent distributed workflows
- The scaling properties of WebSocket servers and why they require different load balancing strategies than HTTP servers
- How to structure the monitoring and observability of a real-time, multi-service system

**Common pitfalls:**
- Beginning a system design with the technology stack rather than the requirements — the choice of database, protocol and data structure should follow from what the system must do
- Treating geospatial indexing as a solved problem without understanding the accuracy vs. performance trade-offs of each approach
- Using a single database for both transactional and location data — they have very different access patterns and scaling requirements
- Designing distributed systems without a locking strategy for shared, mutable state

---

## Enterprise GenAI Strategy – Build vs Buy, ROI and Governance

Deploying generative AI at enterprise scale is not primarily a technology problem — it is a governance, organisational and change management challenge. A senior architect or tech lead is expected to contribute to (and often to drive) the definition of how their organisation adopts AI responsibly, consistently and in a way that creates durable value rather than isolated experiments.

The first strategic question is build vs buy. Buying a hosted capability (calling an API provided by OpenAI, Azure OpenAI, Anthropic or a similar vendor) reduces time to market and offloads model maintenance but raises questions about data privacy, vendor lock-in, cost at scale and the ability to customise model behaviour. Building or fine-tuning your own model gives greater control but requires significant data, compute and ML expertise. For most enterprise use cases, the right answer is to buy the foundation model and build the integration layer — owning the prompt design, the retrieval pipeline, the evaluation harness and the guardrails, while treating the model itself as a commodity. The build vs buy decision should be revisited as the technology landscape evolves.

Return on investment for AI initiatives is harder to measure than for traditional software because the value is often diffuse (developer productivity, reduced handling time, improved search quality) and the costs include not just compute but data preparation, evaluation, governance overhead and change management. A senior architect contributes to the ROI framework by defining what success looks like before deployment: which metrics will be measured, what the baseline is, what improvement constitutes success and over what time horizon. AI initiatives that lack this upfront definition tend to be evaluated on whether they shipped, rather than whether they delivered value.

An adoption framework gives the organisation a structured way to evaluate, pilot, scale and govern AI use cases. A common structure moves through four stages: explore (identify candidate use cases and assess feasibility), experiment (run time-boxed pilots with clear success criteria), scale (productionise validated use cases with proper engineering rigour) and govern (apply controls, monitor and continuously evaluate). Without a framework, organisations tend to accumulate disconnected pilots that never reach production, creating technical debt and eroding confidence.

Governance of AI systems involves several distinct concerns. Model governance asks which models are approved for use, under what conditions and who owns the decision to adopt a new model. Data governance asks what data can be sent to which models, how consent and privacy are maintained and what logging is required. Output governance asks how model outputs are reviewed, who is accountable for decisions made with AI assistance and how errors are reported and remediated.

**Why it matters:** An organisation without a coherent AI strategy will either move too slowly — paralysed by governance debates while competitors ship — or too fast, accumulating unmanaged risk that eventually forces a costly halt. A senior architect shapes the strategy rather than waiting for it to be handed down. That means being able to articulate the build vs buy trade-offs in a steering committee, propose a governance structure to a CISO, and define an ROI framework for a product owner — not just design the technical architecture.

**Key things to understand:**
- The build vs buy decision framework and the factors that shift it in each direction
- How to define an ROI framework for an AI initiative before deployment, not after
- The stages of an AI adoption lifecycle and what governance gates belong at each stage
- The distinction between model governance, data governance and output governance
- How to evaluate AI use cases against a consistent value and risk framework
- The role of a centre of excellence or AI guild in maintaining consistency across teams

**Common pitfalls:**
- Treating each AI initiative as independent rather than establishing shared infrastructure, standards and learnings
- Allowing business enthusiasm to bypass governance — speed of adoption without controls creates liability
- Measuring success only by deployment (did we ship it?) rather than by outcome (did it deliver the expected value?)
- Defaulting to build when buy would be faster and cheaper, or defaulting to buy without considering data privacy and lock-in

---

## LLM Agent Architecture – Orchestration, Memory, Tools and Guardrails

An LLM agent is a system in which a language model acts as a reasoning engine that can plan, use tools, observe the results of tool use and iterate until a goal is achieved. This is a significant architectural step beyond a simple question-and-answer interface, and it introduces complexity that must be managed deliberately.

The orchestrator is the component that coordinates the agent loop. It receives the goal, maintains the current state of the task, selects which tool to invoke next based on the model's output and feeds the tool result back to the model for the next reasoning step. The orchestrator may be implemented as a framework (LangGraph, AutoGen, Semantic Kernel) or as custom code. The choice affects how much control you have over the loop, how observable the system is and how easy it is to debug.

Memory in an agent system takes several forms. In-context memory is the content currently in the model's context window — it is fast to access but limited in size and lost when the session ends. External memory stores information in a retrievable form outside the context window. Common external memory stores include a vector database for semantic retrieval of unstructured content, a key-value store for structured ephemeral state such as the current step in a multi-step workflow, and a relational or document database for long-term structured history such as past conversations or user preferences. The architecture must decide what is stored, when and how it is retrieved and what happens when retrieved context conflicts with the model's parametric knowledge.

Tools (also called function calls or actions) give the agent the ability to interact with the world: querying databases, calling APIs, reading files, executing code. Each tool is a potential source of side effects. An architect must define which tools are available to which agents, what permissions those tools require and how tool failures are handled without causing the agent to loop or hallucinate a successful outcome.

Guardrails are constraints that prevent the agent from producing harmful, incorrect or out-of-scope outputs. They operate at multiple layers: input filtering (blocking prohibited queries before they reach the model), output filtering (reviewing model outputs before they are acted upon or shown to the user), tool permission boundaries (preventing the agent from invoking tools it should not have access to) and human-in-the-loop gates (requiring human approval before the agent takes high-stakes actions).

**Why it matters:** Agent architectures are becoming the dominant pattern for complex AI-powered features — everything from automated research assistants to code review agents to process automation. The failure modes are severe: an agent with over-broad tool access and no guardrails can take destructive actions at machine speed. A senior architect who understands the agent loop, memory trade-offs and guardrail layers can design these systems to be capable without being dangerous.

**Key things to understand:**
- The agent loop: observe, plan, act, observe — and how the orchestrator manages it
- The difference between in-context memory and external memory, and the trade-offs between them
- The three common external memory store types (vector, key-value, relational) and when each is appropriate
- How tool definitions affect model behaviour and what a well-designed tool interface looks like
- The layers at which guardrails can be applied and why multiple layers are necessary

**Common pitfalls:**
- Building agents without visibility into the reasoning trace — observability is essential for debugging and auditing
- Giving agents broad tool access because it is convenient — least-privilege applies to agents as much as to human users
- Assuming guardrails at one layer are sufficient — a single layer can be circumvented; defence in depth is required

---

## LLM Security – Prompt Injection, Data Exfiltration and Mitigation

LLM-powered systems introduce a class of security vulnerabilities that do not exist in traditional software. A senior architect must understand these threats at a mechanistic level, not just by name, in order to design systems that are resilient to them.

Prompt injection is the most significant LLM-specific attack. It occurs when an attacker embeds instructions in content that the model processes — such as a document being summarised, a web page being retrieved or a user message in a multi-turn conversation — and those instructions cause the model to behave in ways that override the system prompt or the developer's intent. Direct prompt injection comes directly from the user, who crafts their input to manipulate the model's behaviour. Indirect prompt injection comes from external content the model processes on the user's behalf — for example, a malicious instruction embedded in a document that an agent retrieves from a web search. Mitigations include separating instructions from data through structured input formats, treating all external content as untrusted, using output filtering to detect policy violations and applying privilege separation so the model cannot act on injected instructions that require elevated permissions.

Data exfiltration through an LLM occurs when the model reveals information from its context — including system prompts, retrieved documents or other users' data — in response to crafted queries. This is particularly dangerous in RAG systems where sensitive documents are injected into the context. Mitigations include strict access control on what documents can be retrieved for a given user, prompt designs that instruct the model not to quote source material verbatim and output scanning for patterns that suggest confidential data leakage.

Insecure tool use is another critical risk. If an agent is given tools that can write to databases, send emails or execute code, and the agent can be prompted to invoke those tools with attacker-controlled inputs, the consequences can be severe. The mitigation is a combination of least-privilege tool design (tools accept only validated, typed parameters rather than free-text instructions), human-in-the-loop gates for high-impact actions and audit logging of every tool invocation with its parameters.

Model denial of service — crafting inputs that consume excessive tokens, trigger long reasoning chains or cause the model to loop — is also a concern for production systems. Rate limiting, token budget enforcement and circuit breakers on agent loops are standard mitigations.

**Why it matters:** LLM security cannot be bolted on after deployment. The attack surfaces are novel — traditional WAF rules and input sanitisation do not defend against prompt injection — and the blast radius of a successful attack can be large when agents have tool access. A senior architect who can articulate these threat models to a security team, design mitigations into the system architecture and include LLM-specific risks in threat modelling exercises is operating at the level the role demands.

**Key things to understand:**
- The mechanism of direct and indirect prompt injection and why it is difficult to prevent entirely
- How data exfiltration through LLMs differs from traditional data leakage and what controls apply
- Why tool invocation requires the same security rigour as any other privileged API call
- The [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) as the industry-standard reference for LLM-specific risks — this is the essential starting point for any LLM security review. The OWASP Top 10 for Agentic Applications, released in 2026, extends this work to cover risks specific to autonomous AI agents with tool access

**Common pitfalls:**
- Relying on the system prompt alone to prevent prompt injection — it is necessary but not sufficient
- Treating LLM security as a model problem rather than a system design problem — most mitigations are architectural
- Logging prompts and completions without redacting sensitive data — the logs themselves become a liability

---

## Context Engineering at Scale – Managing AI System Complexity

Context engineering is the discipline of designing and managing the information that flows into an LLM's context window to produce reliable, high-quality outputs at production scale. It extends prompt engineering from a craft applied to individual prompts into a systems engineering concern applied across an entire AI product.

The context window is the model's working memory — everything the model can attend to in a single inference call. Effective context engineering maximises the relevance and quality of information in the context while staying within token budget constraints. This involves decisions about what to include (retrieved documents, conversation history, tool results, persona instructions), in what order (models tend to weight content at the beginning and end of the context more heavily) and how to format it (structured formats like XML or JSON can improve model adherence to instructions).

At scale, context construction becomes a software engineering problem. The code that assembles a context from dynamic components — user query, retrieved chunks, conversation history, system instructions — must be versioned, tested and observable. Changes to context construction logic can silently degrade output quality, so regression testing of context pipelines against a golden dataset of expected outputs is essential.

Context compression is a set of techniques for fitting more relevant information into a fixed token budget. Strategies include summarising conversation history instead of including it verbatim, ranking retrieved chunks by relevance score and discarding low-ranked ones, filtering retrieved content to remove boilerplate and using structured extraction to pull only the fields relevant to the current query.

Multi-agent systems, where multiple LLMs collaborate on a task, amplify context engineering complexity: each agent has its own context, and the information passed between agents must be designed as carefully as an API contract. Poorly designed inter-agent communication leads to information loss, hallucination amplification and debugging nightmares.

**Why it matters:** Output quality degradation in AI systems is often traced back to context construction problems, not model problems. A context that includes irrelevant documents, stale conversation history or poorly formatted instructions produces worse outputs regardless of how capable the underlying model is. Senior architects who understand context engineering can diagnose these problems, set engineering standards for how context pipelines are built and tested, and prevent the silent quality regressions that erode user trust over time.

**Key things to understand:**
- How context window position affects model attention and what implications that has for context ordering
- Why context construction pipelines need the same engineering rigour as any other production code path
- The standard techniques for context compression and when each is appropriate
- How context engineering concerns multiply in multi-agent architectures

**Common pitfalls:**
- Treating context construction as a one-time configuration rather than an evolving, tested code path
- Including all available context on the assumption that more information is always better — irrelevant context degrades output quality
- Failing to instrument context pipelines, making it impossible to diagnose why output quality changed after a deployment

---

## Incident Management – Leading Through Failure

Incidents are inevitable in production systems. A senior architect's value during an incident is not in writing code faster — it is in structuring the response so the team can diagnose the problem efficiently, communicate status clearly and prevent the same failure from recurring.

A structured incident response process has four phases: detection (automated alerting based on SLOs), triage (classify severity, assemble the team, establish a communication channel), mitigation (restore service as quickly as possible — rollback, failover, feature toggle — even if the root cause is unknown) and resolution (fix the underlying issue and verify in production).

Severity levels determine response urgency: SEV-1 (complete outage — all-hands response), SEV-2 (major feature degraded — on-call plus tech lead), SEV-3 (minor degradation — team priority) and SEV-4 (low-impact — normal backlog).

Blameless post-mortems focus on systemic causes: what was the chain of events? What detection gaps existed? What process or tooling changes would prevent recurrence? A good post-mortem produces concrete action items with owners and deadlines.

**Why it matters:** An organisation's reliability culture is defined by how it responds to failure. A senior architect who leads structured incident responses and facilitates blameless post-mortems builds a team that improves with every failure.

**Key things to understand:**
- The four phases of incident response: detection, triage, mitigation, resolution
- How severity classification drives response urgency and communication
- The principles of blameless post-mortems
- How DORA metrics (change failure rate, time to restore) measure incident management effectiveness

**Common pitfalls:**
- Skipping mitigation to pursue root cause — restore service first, investigate second
- Post-mortems that identify a person rather than a systemic cause
- Action items with no owners or deadlines

---

## Cost Optimisation and Platform Engineering

At the senior level, architecture is inseparable from economics. Cost optimisation is about spending deliberately with visibility into what drives costs.

Cloud cost management begins with visibility through resource tagging by team, service and environment. Right-sizing is the most impactful cost lever — most workloads are over-provisioned. Auto-scaling, reserved instances and spot instances offer 30-90% savings for appropriate workloads.

Platform engineering builds internal developer platforms (IDPs) that provide golden paths — opinionated, pre-approved patterns — reducing cognitive load on product teams. Developer experience (DevEx) metrics measure onboarding time, build time, deployment frequency and cognitive load. DORA metrics (deployment frequency, lead time, change failure rate, time to restore) provide engineering productivity indicators.

**Why it matters:** Cloud costs grow with usage, and platform engineering multiplies architectural decisions across the organisation. A senior architect who can articulate cost trade-offs and build enabling platforms operates at enterprise scale.

**Key things to understand:**
- Resource tagging and cost attribution for informed cost decisions
- Trade-offs between on-demand, reserved, savings plans and spot pricing
- What an internal developer platform provides and how it reduces cognitive load
- DORA metrics as engineering productivity indicators

**Common pitfalls:**
- Treating cost optimisation as a one-time exercise
- Building platforms too opinionated for teams to adopt
- Ignoring developer experience until productivity problems are severe

---

## AI Policy and the Secure AI Framework – Architect Responsibilities

Every organisation that uses AI in production systems operates within a policy environment — internal policies set by the organisation, external regulations set by governments and regulators, and frameworks provided by standards bodies. A senior architect must understand this environment well enough to design systems that comply with it and to advise the organisation when a proposed use case creates policy risk.

Internal AI policy defines what AI tools and models are approved for use, under what conditions, by whom and for what purposes. It typically addresses data classification (which data may be sent to which models), model approval (which models are on the approved list and how new models are evaluated), output use (whether AI-generated outputs may be used without human review) and incident response (how AI-related incidents are reported and investigated). The architect's role is to ensure that systems are designed to make policy compliance verifiable — for example, logging which model was used for each inference, enforcing data classification at the API level and building human review checkpoints where policy requires them.

The Secure AI Framework (SAIF) provides a set of principles for building AI systems that are secure by design. Its core principles cover securing the AI supply chain (models, training data, third-party components), protecting AI systems at runtime (access controls, monitoring, adversarial input detection), ensuring model outputs are monitored and validated and maintaining the ability to detect and respond to model misbehaviour. As an architect, you translate SAIF principles into concrete design requirements: which threat models apply, which controls are implemented in infrastructure versus application code and how compliance is demonstrated.

Regulatory context is evolving rapidly. The EU AI Act introduces risk-based obligations: high-risk AI systems (those that affect access to credit, employment, education or public services) face requirements around transparency, human oversight, data governance and conformity assessment. An architect working in a regulated industry must understand which risk tier applies to each system and what technical obligations follow.

**Why it matters:** Policy and regulation are not the legal team's problem alone — they translate directly into architecture decisions. A system that cannot demonstrate which model version made a given decision, or that sends customer data to an unapproved model API, is both a compliance risk and a reputational one. A senior architect who understands the policy landscape can design compliance in from the start rather than retrofitting it under pressure before an audit.

**Key things to understand:**
- How to read an internal AI policy and identify the architectural implications of each clause
- The core principles of the Secure AI Framework and how they translate to design decisions
- The risk-tier model of the EU AI Act and what obligations attach to each tier
- How to build audit trails that demonstrate policy compliance for AI-assisted decisions

**Common pitfalls:**
- Treating policy compliance as a legal concern rather than an architectural one — compliance must be built in, not checked at the end
- Failing to account for policy drift — policies evolve, and systems must be designed to adapt without a complete rebuild
- Conflating security controls with compliance controls — they overlap but are not the same, and both are required

---

## Architecture Decision Records – Structure, Process and Culture

Architecture Decision Records (ADRs) are the mechanism by which a team creates and preserves the institutional memory of its technical decisions. At the senior level, the question is not whether to use ADRs — it is how to embed them into team culture so that they are written consistently, kept current and actually consulted when decisions are revisited.

The standard ADR structure includes a title (short, imperative: "Use PostgreSQL as the primary data store"), a status (proposed, accepted, deprecated, superseded — with a reference to the superseding ADR if applicable), a context section that describes the forces at play when the decision was made, a decision section that states what was decided and why, and a consequences section that describes the implications — both positive and negative — of the decision. Some teams add a "considered alternatives" section to capture why other options were rejected.

The process of creating an ADR should be lightweight enough that engineers actually do it. A good target is that any decision which would take more than a day to reverse warrants an ADR. The author drafts the ADR, shares it for asynchronous review (comments on a pull request work well), the team discusses any objections and the ADR is merged with accepted status. For significant decisions, a synchronous design review complements the written record but does not replace it.

Culture is the hardest part. ADRs fail when they are written after the fact as documentation (rather than as part of the decision process), when they are stored somewhere that nobody reads, when the team treats them as optional or when outdated ADRs are left in accepted status after the decision has been reversed. A senior tech lead models the behaviour: writing ADRs for their own decisions, referencing existing ADRs in design discussions and updating or deprecating records when circumstances change.

The long-term value of ADRs is disproportionate to the effort of writing them. New team members can understand the reasoning behind the system without a lengthy onboarding interview. Post-incident reviews can identify whether a decision was made with known risks that materialised. Architectural drift — the gradual accumulation of small decisions that undermine the intended structure — becomes visible when compared against the ADR record.

**Why it matters:** A senior tech lead or architect works across multiple teams or systems. Without a systematic practice of recording decisions, the organisation's technical strategy exists only in the minds of the people who made it. When those people change roles or leave, the rationale disappears. Embedding ADRs as a cultural norm — not just a personal habit — is an act of organisational care that pays dividends for every engineer who joins the team in the future.

**Key things to understand:**
- The five core fields of an ADR and the purpose of each
- How to calibrate the threshold for when a decision warrants an ADR
- The process for proposing, reviewing and accepting an ADR in a pull-request-based workflow
- How to keep ADRs current and what to do when a decision is reversed
- How to champion ADR adoption across teams that do not yet have the habit

**Common pitfalls:**
- Writing ADRs as retrospective documentation rather than as part of the decision process — the value is in the thinking, not just the record
- Storing ADRs in a wiki that is not co-located with the code — they become disconnected from the system they describe
- Allowing the ADR backlog to grow stale without a regular review cycle, eroding trust in the records

---

## Language Deep Dives

- [TypeScript Deep Dive](/language/typescript) — Type-safe architecture for scalable applications
- [Python Deep Dive](/language/python) — Backend and data architecture patterns
- [SQL Deep Dive](/language/sql) — Database design and performance at scale
`,
}
