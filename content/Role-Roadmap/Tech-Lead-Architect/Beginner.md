# Tech Lead / Architect – Beginner Concept Reference


This document provides detailed explanations of the foundational concepts covered in the Beginner level of the Tech Lead / Architect learning path. Each section expands on the ideas behind the resources and gives you the vocabulary and mental models you need before moving to the Mid level.

---

## System Design Fundamentals – Components, Responsibilities and Trade-offs

System design is the process of defining the architecture, components, data flows and interactions of a system to satisfy a given set of requirements. For a tech lead or architect, understanding system design is not optional — it is the core skill that separates a senior individual contributor from someone who can guide an entire team or programme.

A distributed system is a collection of independent components that work together and appear to the user as a single coherent system. Common components include clients (browsers, mobile apps, CLI tools), load balancers (which distribute traffic across servers), application servers (which execute business logic), databases (which persist state), caches (which store frequently read data in fast memory), message queues (which decouple producers and consumers), and content delivery networks (which serve static assets close to users).

Each component has a clear responsibility, and part of an architect's job is to ensure that responsibilities are not mixed inappropriately — for example, having business logic leak into the database tier, or allowing the client to make decisions that belong on the server.

System design always involves trade-offs. There is no universally correct architecture. Choosing a relational database gives you strong consistency and mature tooling but may limit horizontal scalability. Choosing an eventually consistent NoSQL store gives you write throughput but complicates application logic. Understanding the CAP theorem — which states that a distributed system can guarantee at most two of consistency (all nodes see the same data at the same time), availability (every request receives a response) and partition tolerance (the system continues operating despite network partitions between nodes) — gives you a framework for reasoning about these trade-offs honestly. In practice, network partitions are an unavoidable reality in any distributed system, so partition tolerance is not negotiable. The genuine trade-off is between consistency and availability: during a partition, do you refuse requests to protect data integrity, or do you serve potentially stale data to remain available? Importantly, CAP is a per-partition-event trade-off, not a permanent architectural choice — a system can favour consistency for some operations and availability for others, and the trade-off only materialises when a partition actually occurs.

**Code walkthrough:**

```text
# Step 1: System component diagram — map the data flow for a typical request
# Why: a tech lead must be able to draw this on a whiteboard and explain every component

[Browser] ──HTTPS──▶ [Load Balancer]
                          │
                    ┌─────┴─────┐
                    ▼           ▼
              [App Server 1] [App Server 2]    ◀── Horizontal scaling
                    │           │
                    └─────┬─────┘
                          ▼
                  [Redis Cache]                ◀── Reduces DB load for hot reads
                     │ (miss)
                     ▼
              [PostgreSQL Primary]             ◀── Source of truth for state
                     │
                     ▼
              [PostgreSQL Replica]             ◀── Offloads read-heavy queries

# Step 2: Request flow for "GET /orders/123"
# 1. Browser sends HTTPS request
# 2. Load balancer routes to an available app server (round-robin)
# 3. App server checks Redis cache for order 123
# 4. Cache HIT  → return cached data (latency: ~2ms)
#    Cache MISS → query PostgreSQL replica (latency: ~15ms)
# 5. On cache miss, populate cache with TTL of 60 seconds
# 6. Return JSON response to browser

# Step 3: Trade-off analysis — CAP theorem applied to this design
# During a network partition between the primary DB and replica:
#   - Reads from the replica may return stale data (availability over consistency)
#   - Writes to the primary still succeed (consistency for writes)
#   - This is acceptable for order reads but NOT for payment processing
# Decision: use the primary for payment writes, replica for order listing reads
```

**Why it matters:** As a tech lead, every significant technical conversation eventually becomes a conversation about trade-offs. You need a shared vocabulary for these discussions — one that lets you articulate why a design choice has costs, not just benefits. The moment you can walk a team through a whiteboard diagram explaining what each component does and why it is there, you stop being a senior developer and start being an architect.

**Key things to understand:**
- The purpose of each major component type and when to use each
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

Vertical scaling (scaling up) means giving an existing machine more resources: a faster CPU, more RAM, or faster storage. It is simple to implement because the application does not need to change. However, it has a hard ceiling — there is a maximum machine size — and it introduces a single point of failure if that one machine goes down.

Horizontal scaling (scaling out) means adding more machines and distributing load across them. A load balancer sits in front of the pool of servers and routes incoming requests, typically using strategies such as round-robin, least-connections, or consistent hashing. Horizontal scaling removes the ceiling and improves resilience because losing one node does not take the whole system down. The cost is complexity: the application must be stateless or externalise state so that any instance can serve any request.

Caching is one of the most effective scalability tools available. Storing the results of expensive computations or database reads in memory (for example with Redis) dramatically reduces the load on downstream systems. The main challenge is cache invalidation — knowing when a cached value is stale. Three common strategies are: time-to-live (the cached value expires after a fixed duration), write-through (the cache is updated whenever the source data is written) and cache-aside (the application checks the cache first and populates it on a miss).

Database scaling has its own vocabulary. Read replicas serve read traffic from copies of the primary database. Sharding splits data across multiple database instances by a key such as user ID. Both approaches add operational complexity and require careful design.

Reliability and availability are improved by eliminating single points of failure, adding redundancy, implementing health checks and graceful degradation, and designing for failure recovery rather than failure prevention. An architect distinguishes between mean time between failures (MTBF) and mean time to recovery (MTTR): a reliable system fails rarely; a resilient system recovers quickly when it does fail.

**Code walkthrough:**

```python
# Step 1: Capacity estimation — back-of-envelope calculations every architect must do
# Why: "can this scale?" needs a concrete answer, not a guess

# --- Current system metrics ---
daily_active_users = 50_000
requests_per_user_per_day = 20
average_request_size_kb = 5
average_response_size_kb = 15

# Step 2: Calculate requests per second at peak
# Why: peak load is typically 3-5x average; design for peak, not average
total_requests_per_day = daily_active_users * requests_per_user_per_day  # 1,000,000
average_rps = total_requests_per_day / 86_400  # ~11.6 req/s
peak_rps = average_rps * 4  # ~46 req/s (4x peak factor)

# Step 3: Calculate bandwidth requirements
# Why: network bandwidth can become a bottleneck before CPU or memory
bandwidth_mbps = peak_rps * (average_request_size_kb + average_response_size_kb) * 8 / 1000
# ~7.4 Mbps — well within a standard cloud instance's network capacity

# Step 4: Calculate storage growth
# Why: storage costs compound; plan for 2-3 years of growth
new_records_per_day = 10_000
average_record_size_kb = 2
daily_storage_growth_gb = (new_records_per_day * average_record_size_kb) / 1_000_000  # 0.02 GB
yearly_storage_growth_gb = daily_storage_growth_gb * 365  # ~7.3 GB/year
storage_with_indexes_gb = yearly_storage_growth_gb * 3  # Indexes add 2-3x overhead

# Step 5: Determine if caching can keep us on a single database
# Why: a cache hit rate of 80%+ often means you can defer sharding for years
cache_hit_rate = 0.85
db_reads_per_second = peak_rps * (1 - cache_hit_rate)  # ~7 req/s to the database
# A single PostgreSQL instance handles 5,000-10,000 simple reads/s
# Verdict: single instance with Redis cache is sufficient for 10x current load
print(f"Peak: {peak_rps:.0f} req/s | DB load with cache: {db_reads_per_second:.0f} req/s")
print(f"Storage: {storage_with_indexes_gb:.1f} GB/year | Bandwidth: {bandwidth_mbps:.1f} Mbps")
```

**Why it matters:** Your team will regularly ask "can this scale?" or "what happens when the database goes down?" You need concrete answers grounded in architecture choices, not reassurances. Understanding these concepts lets you design systems that are robust by construction rather than by accident.

**Key things to understand:**
- When vertical scaling is appropriate and where its limits lie
- What statelessness means and why it is a prerequisite for horizontal scaling
- How load balancers distribute traffic and why session affinity complicates horizontal scaling
- The role of caching and the challenges of cache invalidation
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

REST (Representational State Transfer) is the most widely used style for public-facing web APIs. It uses standard HTTP methods (GET, POST, PUT, DELETE) and URLs that represent resources. REST is stateless, cacheable and well understood, making it a safe default for most web integrations. Its main limitation is over-fetching (the client receives more data than it needs) or under-fetching (the client must make multiple requests to assemble a complete view).

GraphQL is a query language that allows the client to specify exactly what data it needs in a single request. This solves the over- and under-fetching problems of REST and is particularly valuable for complex UIs that aggregate data from many resources. The trade-off is a more complex server implementation and less natural use of HTTP caching.

gRPC is a high-performance remote procedure call framework that uses Protocol Buffers for serialisation. It is strongly typed and generates client and server code from a schema. gRPC is well suited for internal service-to-service communication where performance and type safety matter more than human readability.

Event-driven APIs decouple producers and consumers through a message broker such as Kafka or Azure Service Bus. Instead of one service calling another synchronously, it emits an event and any interested consumer processes it asynchronously. This improves resilience and scalability but makes the system harder to trace and debug.

**Code walkthrough:**

```yaml
# Step 1: API contract design using OpenAPI (Swagger) specification
# Why: an explicit contract is a team agreement — consumers and producers share it

openapi: "3.1.0"
info:
  title: Order Service API
  version: "1.0.0"
  description: "Manages order creation, retrieval and lifecycle"

paths:
  /orders:
    # Step 2: POST for creating resources — returns 201, not 200
    post:
      summary: Create a new order
      operationId: createOrder
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateOrderRequest"
      responses:
        "201":
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Order"
        "400":
          description: Validation error
        "401":
          description: Authentication required

  /orders/{orderId}:
    # Step 3: GET is idempotent and cacheable — safe for read operations
    get:
      summary: Get order by ID
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        "200":
          description: Order found
          headers:
            # Step 4: Cache-Control header — REST's built-in caching mechanism
            Cache-Control:
              schema:
                type: string
                example: "max-age=60, must-revalidate"
        "404":
          description: Order not found

components:
  schemas:
    # Step 5: Explicit schema prevents misunderstandings between teams
    CreateOrderRequest:
      type: object
      required: [customerId, items]
      properties:
        customerId:
          type: string
          format: uuid
        items:
          type: array
          minItems: 1
          items:
            $ref: "#/components/schemas/OrderItem"
```

**Why it matters:** A tech lead who defaults to REST for every integration will create the wrong tool for the job repeatedly. The choice of API style shapes the coupling between services, the performance characteristics of the system and the experience of the teams that consume your APIs. Understanding when each style is appropriate — and being able to explain that reasoning to a team — is a core architectural responsibility.

**Key things to understand:**
- The fundamental model of each API style and the problem it solves
- When to choose each style based on consumer type, latency requirements and coupling tolerance
- The difference between synchronous and asynchronous communication and the implications for error handling
- Why event-driven communication introduces eventual consistency and what that means for the application

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

**Code walkthrough:**

```yaml
# Step 1: A code review checklist expressed as a CI pipeline configuration
# Why: automated quality gates enforce standards consistently, not just when reviewers remember

name: Quality Gates
on:
  pull_request:
    branches: [main]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      # Step 2: Static analysis — catch bugs without running the code
      # Why: cheaper than integration tests; gives feedback in seconds
      - name: Lint and format check
        run: |
          dotnet format --verify-no-changes
          dotnet build /warnaserror

      # Step 3: Unit tests with coverage threshold
      # Why: the tech lead sets the minimum coverage bar; the pipeline enforces it
      - name: Run tests with coverage
        run: |
          dotnet test --collect:"XPlat Code Coverage"
          # Fail if coverage drops below 80% — the team agreed on this threshold
          reportgenerator -reports:**/coverage.cobertura.xml \
            -targetdir:coverage -reporttypes:TextSummary
          COVERAGE=$(grep "Line coverage" coverage/Summary.txt | grep -oP '\d+\.\d+')
          if (( $(echo "$COVERAGE < 80.0" | bc -l) )); then
            echo "Coverage is $COVERAGE% — below 80% threshold" >&2
            exit 1
          fi

      # Step 4: Security scan — shift security left into the development workflow
      - name: Dependency vulnerability check
        run: dotnet list package --vulnerable --include-transitive

      # Step 5: Architecture fitness function — prevent structural drift
      # Why: code that violates module boundaries today becomes technical debt tomorrow
      - name: Architecture rules
        run: dotnet test --filter "Category=ArchitectureTests"
        # These tests verify: no circular dependencies, domain layer has no infra imports,
        # all API controllers use the authorisation attribute
```

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

**Code walkthrough:**

```python
# Step 1: A decision framework for evaluating "should we use AI here?"
# Why: tech leads need a structured way to assess AI proposals, not just intuition

def evaluate_ai_proposal(use_case: dict) -> dict:
    """
    Step 2: Score each dimension that matters for the decision.
    Why: without a framework, teams default to 'AI is cool' instead of 'AI is appropriate'
    """
    scores = {}

    # Step 3: Is the task tolerant of non-deterministic outputs?
    # Why: LLMs produce different outputs for the same input — if exactness is required,
    # a rules engine or traditional ML is more appropriate
    scores["determinism_tolerance"] = use_case["accepts_variable_outputs"]  # True/False

    # Step 4: Is there a simpler solution that would work?
    # Why: an LLM for sentiment analysis is overkill if a fine-tuned BERT model does it
    scores["simpler_alternative_exists"] = use_case["has_labelled_training_data"]

    # Step 5: What is the cost at the expected scale?
    tokens_per_request = use_case["avg_input_tokens"] + use_case["avg_output_tokens"]
    daily_requests = use_case["expected_daily_volume"]
    cost_per_1k_tokens = 0.01  # Example: GPT-4o pricing
    monthly_cost = (tokens_per_request * daily_requests * 30 * cost_per_1k_tokens) / 1000
    scores["monthly_llm_cost"] = monthly_cost

    # Step 6: Does the data classification allow sending it to an external model?
    # Why: sensitive data may require on-premises models or approved endpoints only
    scores["data_can_leave_boundary"] = use_case["data_classification"] != "confidential"

    # Step 7: What is the blast radius of a wrong answer?
    # Why: AI summarising meeting notes (low risk) vs AI approving insurance claims (high risk)
    scores["risk_level"] = use_case["impact_of_wrong_output"]  # "low", "medium", "high"

    return {
        "recommendation": "proceed" if _passes_threshold(scores) else "reconsider",
        "scores": scores,
        "monthly_cost_estimate": f"${monthly_cost:,.2f}",
    }
```

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

**Code walkthrough:**

```markdown
# Step 1: Architecture Decision Record (ADR) template
# Why: ADRs capture the reasoning behind decisions so future engineers understand "why"

# ADR-007: Use trunk-based development with short-lived feature branches

## Status
Accepted — 2026-01-15

## Context
<!-- Step 2: Describe the forces at play BEFORE stating the decision -->
<!-- Why: reviewers need to understand the constraints to evaluate the choice -->
The team has 8 engineers working on a single monolith. We currently use Gitflow
with long-lived develop and release branches. Merge conflicts are frequent,
releases require dedicated "merge days", and CI feedback is delayed because
feature branches diverge from main for 1-2 weeks.

Our CI pipeline runs in 8 minutes. We deploy to production 2-3 times per week.
We have 85% automated test coverage.

## Considered Alternatives
<!-- Step 3: Show what else was evaluated and why it was rejected -->
1. **Keep Gitflow** — rejected because the merge overhead scales with team size
2. **GitHub Flow** — similar to our decision but less prescriptive about branch lifetime
3. **Trunk-based (no branches)** — rejected; we need PR reviews for knowledge sharing

## Decision
<!-- Step 4: State what was decided clearly and concisely -->
Adopt trunk-based development. All feature branches must:
- Branch from main
- Live for no more than 2 working days
- Be merged via pull request with at least 1 reviewer
- Pass all CI checks before merge

## Consequences
<!-- Step 5: Be honest about both positive and negative consequences -->
**Positive:** Fewer merge conflicts, faster CI feedback, simpler release process.
**Negative:** Requires feature flags for work-in-progress features that span
multiple days. Team must learn to decompose work into small increments.
**Revisit when:** Team grows beyond 15 engineers or we split into multiple repos.
```

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
