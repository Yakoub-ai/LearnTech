# Backend Developer – Senior Concept Reference


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

**Code walkthrough:**

```python
# Step 1: Microservice communication via HTTP with a circuit breaker
# Why: when a downstream service is failing, you must stop calling it
#      to prevent cascading failures across the entire system
import httpx
import asyncio
from enum import Enum
from datetime import datetime, timezone, timedelta

class CircuitState(Enum):
    CLOSED = "closed"      # normal — requests flow through
    OPEN = "open"          # tripped — requests fail immediately
    HALF_OPEN = "half_open"  # testing — one request allowed to check recovery

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, reset_timeout: int = 30):
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.reset_timeout = timedelta(seconds=reset_timeout)
        self.last_failure_time: datetime | None = None

    async def call(self, url: str) -> dict:
        # Step 2: If the circuit is OPEN, fail fast without making a request
        # Why: this protects both your service and the struggling downstream
        if self.state == CircuitState.OPEN:
            if datetime.now(timezone.utc) - self.last_failure_time > self.reset_timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit is OPEN — failing fast")

        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.get(url)
                resp.raise_for_status()
                # Step 3: Success — reset the failure counter
                self.failure_count = 0
                self.state = CircuitState.CLOSED
                return resp.json()
        except (httpx.HTTPStatusError, httpx.ConnectTimeout) as exc:
            self.failure_count += 1
            self.last_failure_time = datetime.now(timezone.utc)
            if self.failure_count >= self.failure_threshold:
                # Step 4: Too many failures — trip the circuit
                self.state = CircuitState.OPEN
            raise

# Usage: each downstream service gets its own circuit breaker instance
order_service_cb = CircuitBreaker(failure_threshold=5, reset_timeout=30)
```

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

**Code walkthrough:**

```python
# Step 1: Event-driven architecture — services communicate via events
# Why: async events decouple services; the publisher doesn't wait for consumers
import json
import asyncio
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from typing import Callable, Awaitable

@dataclass
class DomainEvent:
    event_type: str
    aggregate_id: str
    occurred_at: str
    payload: dict

class EventBus:
    """In-process event bus (replace with Kafka/RabbitMQ in production)."""
    def __init__(self):
        self._handlers: dict[str, list[Callable]] = {}

    def subscribe(self, event_type: str, handler: Callable[[DomainEvent], Awaitable]):
        self._handlers.setdefault(event_type, []).append(handler)

    async def publish(self, event: DomainEvent):
        # Why: all subscribers receive the event independently
        for handler in self._handlers.get(event.event_type, []):
            # Step 2: Each handler runs independently — one failure doesn't
            # block the others (in production, use a dead-letter queue)
            try:
                await handler(event)
            except Exception as e:
                print(f"Handler failed for {event.event_type}: {e}")

bus = EventBus()

# Step 3: Order service publishes an event when an order is placed
async def place_order(order_id: str, customer_id: str, amount: float):
    # ... save order to the order service's own database ...
    event = DomainEvent(
        event_type="order.placed",
        aggregate_id=order_id,
        occurred_at=datetime.now(timezone.utc).isoformat(),
        payload={"customer_id": customer_id, "amount": amount},
    )
    await bus.publish(event)

# Step 4: Other services subscribe to react — no direct coupling
async def send_confirmation_email(event: DomainEvent):
    print(f"Emailing customer {event.payload['customer_id']}")

async def update_inventory(event: DomainEvent):
    print(f"Reserving stock for order {event.aggregate_id}")

bus.subscribe("order.placed", send_confirmation_email)
bus.subscribe("order.placed", update_inventory)
```

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

**Code walkthrough:**

```python
# Step 1: CQRS pattern — separate the write model from the read model
# Why: reads and writes have different performance needs and can be
#      optimised independently (e.g., denormalised read views)
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Protocol

# --- WRITE SIDE (Commands) ---
# Why: the write model enforces business invariants
@dataclass
class OrderAggregate:
    """Aggregate root — all changes go through this object."""
    order_id: str
    status: str = "pending"
    items: list[dict] = field(default_factory=list)
    _events: list[dict] = field(default_factory=list)

    def add_item(self, product_id: str, qty: int, price: float):
        # Step 2: Business invariant — can't modify a shipped order
        if self.status == "shipped":
            raise ValueError("Cannot modify a shipped order")
        self.items.append({"product_id": product_id, "qty": qty, "price": price})
        self._events.append({"type": "item_added", "product_id": product_id})

    def ship(self):
        if not self.items:
            raise ValueError("Cannot ship an empty order")
        self.status = "shipped"
        self._events.append({"type": "order_shipped", "order_id": self.order_id})

# --- READ SIDE (Queries) ---
# Why: the read model is denormalised for fast lookups — no joins needed
class OrderReadModel(Protocol):
    async def get_order_summary(self, order_id: str) -> dict: ...

class InMemoryOrderReadModel:
    def __init__(self):
        self._store: dict[str, dict] = {}

    async def project(self, event: dict):
        """Update the read model from domain events (event projection)."""
        # Step 3: The read side subscribes to events from the write side
        # Why: this decoupling lets you rebuild read models without
        #      touching the write database
        if event["type"] == "order_shipped":
            oid = event["order_id"]
            self._store.setdefault(oid, {})["status"] = "shipped"

    async def get_order_summary(self, order_id: str) -> dict:
        return self._store.get(order_id, {})
```

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

**Code walkthrough:**

```python
# Step 1: The O(n²) problem — identify it by looking for nested loops over the same data
# Why: quadratic growth makes this unusable at scale; 1000 items = 1,000,000 iterations
def find_common_naive(list_a: list[str], list_b: list[str]) -> list[str]:
    """O(n²) — for each item in A, scan all of B."""
    common = []
    for item_a in list_a:
        for item_b in list_b:           # nested loop = quadratic
            if item_a == item_b and item_a not in common:
                common.append(item_a)
    return common

# Step 2: The O(n) fix — convert one list to a set for O(1) lookups
# Why: set membership test is O(1) average case; eliminates the inner loop entirely
def find_common_fast(list_a: list[str], list_b: list[str]) -> list[str]:
    set_b = set(list_b)                 # O(n) to build, O(1) per lookup
    return [x for x in list_a if x in set_b]   # single pass = O(n)

# Step 3: Demonstrate the difference with timing
import time

data_a = [f"user:{i}" for i in range(5_000)]
data_b = [f"user:{i}" for i in range(2_500, 7_500)]  # 2500 overlap

start = time.perf_counter()
find_common_naive(data_a, data_b)
print(f"Naive: {time.perf_counter() - start:.3f}s")   # ~3–5 seconds

start = time.perf_counter()
find_common_fast(data_a, data_b)
print(f"Fast:  {time.perf_counter() - start:.4f}s")   # ~0.001 seconds

# Step 4: Hash map pattern generalises to many problems
# Why: whenever you see "for each A, find matching B", reach for a dict or set
from collections import Counter

def most_frequent(items: list[str]) -> str:
    """O(n) frequency count using a hash map."""
    counts = Counter(items)             # O(n) to build
    return counts.most_common(1)[0][0] # O(1) lookup
```

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

**Code walkthrough:**

```python
# Step 1: The naive recursive solution — correct but exponentially slow
# Why: fib(5) calls fib(3) twice, fib(2) four times — same work repeated
def fib_naive(n: int) -> int:
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)  # O(2ⁿ) — unusable for n > 40

# Step 2: Memoisation (top-down DP) — cache results to avoid recomputation
# Why: each subproblem is solved exactly once; complexity drops to O(n)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Step 3: Tabulation (bottom-up DP) — fill the table iteratively, no recursion
# Why: avoids recursion stack overhead; same O(n) time, O(n) space
def fib_table(n: int) -> int:
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]  # build from smallest subproblem up
    return dp[n]

# Step 4: Space-optimised tabulation — O(1) space since we only need last two values
# Why: the full table is unnecessary once we only need dp[i-1] and dp[i-2]
def fib_optimal(n: int) -> int:
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr

# The pattern generalises: whenever a recursive function recomputes the same
# arguments, DP applies. State definition is the hard part — ask:
# "what information uniquely identifies this subproblem?"
```

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

**Code walkthrough:**

```python
# Step 1: Structured logging — emit JSON with consistent fields every time
# Why: free-form text is unsearchable; structured fields let log tools query and aggregate
import logging
import json
import time

class StructuredLogger:
    def __init__(self, service_name: str):
        self.service = service_name
        logging.basicConfig(level=logging.INFO)
        self.log = logging.getLogger(service_name)

    def info(self, message: str, **context):
        # Why: always include service, timestamp, and trace_id so log lines join across services
        record = {"level": "INFO", "service": self.service,
                  "message": message, **context}
        self.log.info(json.dumps(record))

logger = StructuredLogger("order-service")

# Step 2: Metrics — track rate, errors, and duration (the RED method)
# Why: metrics answer "is the system healthy right now?" — logs answer "what just happened?"
from collections import defaultdict

class RedMetrics:
    def __init__(self):
        self.request_count = 0
        self.error_count = 0
        self.durations: list[float] = []

    def record(self, duration: float, error: bool = False):
        self.request_count += 1
        self.durations.append(duration)
        if error:
            self.error_count += 1

    def summary(self) -> dict:
        sorted_d = sorted(self.durations)
        n = len(sorted_d)
        return {
            "rate": self.request_count,
            "error_rate": self.error_count / max(self.request_count, 1),
            "p50_ms": sorted_d[n // 2] * 1000 if n else 0,
            "p99_ms": sorted_d[int(n * 0.99)] * 1000 if n else 0,
        }

metrics = RedMetrics()

# Step 3: Distributed tracing — propagate a trace ID across every service call
# Why: without a shared trace_id, you cannot reconstruct the journey of one request
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor, ConsoleSpanExporter

provider = TracerProvider()
provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("order-service")

# Step 4: Combine all three pillars in a single request handler
async def handle_order(order_id: str):
    start = time.perf_counter()
    with tracer.start_as_current_span("handle_order") as span:
        span.set_attribute("order.id", order_id)
        try:
            # ... process order ...
            logger.info("order processed", order_id=order_id,
                        trace_id=span.get_span_context().trace_id)
            metrics.record(time.perf_counter() - start)
        except Exception as exc:
            logger.info("order failed", order_id=order_id, error=str(exc))
            metrics.record(time.perf_counter() - start, error=True)
            raise
```

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

**Code walkthrough:**

```python
# Step 1: Using AI to generate a test suite — then reviewing it critically
# Why: AI assistants excel at generating boilerplate tests, but you must
#      verify correctness, edge cases, and that tests actually test something

# Example prompt to an AI assistant:
# "Write pytest tests for this function. Include edge cases."
def calculate_shipping_cost(weight_kg: float, distance_km: float) -> float:
    if weight_kg <= 0 or distance_km <= 0:
        raise ValueError("Weight and distance must be positive")
    base_rate = 5.0
    per_kg = 0.50
    per_km = 0.10
    return base_rate + (weight_kg * per_kg) + (distance_km * per_km)

# Step 2: AI-generated tests (reviewed and verified by the engineer)
import pytest

def test_normal_shipment():
    assert calculate_shipping_cost(2.0, 100.0) == 5.0 + 1.0 + 10.0

def test_heavy_short_distance():
    assert calculate_shipping_cost(50.0, 1.0) == 5.0 + 25.0 + 0.1

def test_zero_weight_raises():
    with pytest.raises(ValueError):
        calculate_shipping_cost(0, 100)

def test_negative_distance_raises():
    with pytest.raises(ValueError):
        calculate_shipping_cost(1.0, -5.0)

# Step 3: What the AI might MISS — you must add these manually
# Why: AI often generates happy-path tests but overlooks domain-specific edges
def test_floating_point_precision():
    """AI rarely tests for floating point issues."""
    result = calculate_shipping_cost(0.1, 0.1)
    assert round(result, 2) == 5.06  # verify rounding behaviour
```

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

**Code walkthrough:**

```python
# Step 1: AI Policy compliance — logging and transparency for AI endpoints
# Why: the organisation's AI Policy requires that AI interactions are logged
#      and users are informed when AI influences decisions
from fastapi import FastAPI, Request
from datetime import datetime, timezone
import logging
import json

app = FastAPI()
ai_audit_logger = logging.getLogger("ai_audit")

@app.post("/api/ai/recommend")
async def get_ai_recommendation(request: Request, query: str):
    # Step 2: Log the AI interaction for the AI Register
    # Why: GDPR and the AI Policy require traceability of AI-influenced decisions
    ai_audit_logger.info(json.dumps({
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "use_case_id": "UC-2025-042",  # registered in the AI Register
        "risk_classification": "limited",
        "action": "recommendation_generated",
        "input_type": "user_query",  # never log the actual input if it contains PII
        "model": "gpt-4o",
        "user_notified": True,  # transparency requirement
    }))

    # Step 3: The response must disclose AI involvement
    # Why: the AI Policy requires transparency — users must know AI was used
    recommendation = await call_ai_model(query)
    return {
        "recommendation": recommendation,
        "ai_disclosure": "This recommendation was generated by an AI system.",
        "use_case_id": "UC-2025-042",
        "model_version": "gpt-4o-2025-01",
    }

async def call_ai_model(query: str) -> str:
    # Placeholder — in production, call the actual model API
    return "Based on your query, we recommend..."
```

**Common pitfalls:**
- Building a backend integration with an AI model without registering the use case, creating compliance exposure.
- Treating the AI Policy as a legal concern rather than a design constraint — requirements like logging, data classification, and human oversight must be designed into the backend from the start.
- Assuming that internal-only AI tools are exempt from the policy; the governance requirements apply to all AI use.

---

## EU Compliance for Backend Developers

Senior Backend Developers working in the EU must design systems that comply with GDPR from the architecture level, not as a bolt-on feature. GDPR (General Data Protection Regulation) establishes legally binding requirements for how personal data is collected, processed, stored, and deleted. For backend engineers in a Swedish insurance company, this means every API endpoint, database schema, and data pipeline that touches personal data must be designed with privacy by design and privacy by default — principles codified in GDPR Article 25. Personal data includes any information relating to an identifiable individual: names, email addresses, Swedish personnummer, IP addresses, and even behavioural data such as browsing patterns or claim histories.

The core GDPR principles that directly affect backend architecture are: data minimisation (collect and store only the personal data strictly necessary for the stated purpose — no "just in case" fields), purpose limitation (data collected for one purpose cannot be repurposed without a new lawful basis), storage limitation (personal data must be deleted or anonymised when no longer needed — implement automated retention policies), and the right to erasure (individuals can request deletion of their personal data, which must be fulfilled within 30 days). Backend systems must also support the right to data portability (export a user's data in a machine-readable format) and the right to access (provide a complete record of what personal data is held about an individual).

Breach notification is a critical backend engineering responsibility under GDPR. Article 33 requires that personal data breaches are reported to the supervisory authority (Integritetsskyddsmyndigheten, IMY, in Sweden) within 72 hours of becoming aware of the breach. Article 34 requires that affected individuals are notified without undue delay when the breach is likely to result in a high risk to their rights. Backend systems must therefore implement comprehensive audit logging, anomaly detection on data access patterns, and automated breach detection mechanisms. The logging must itself be GDPR-compliant — log enough to detect breaches but avoid logging unnecessary personal data.

For backend services that integrate with AI systems, additional GDPR obligations apply. When personal data is sent to AI model endpoints for inference, the data processing must have a lawful basis, the data flow must be documented, and the AI interaction must be logged for traceability. If the AI system makes or significantly influences decisions about individuals (such as claims assessment or pricing), GDPR Article 22 requires meaningful human oversight and the right for individuals to obtain an explanation of the decision.

The EU AI Act adds further obligations for backend systems that serve as the infrastructure for high-risk AI applications. Backend engineers must ensure that AI system interactions are logged with sufficient detail for regulatory audit (Article 12), that human oversight mechanisms are technically implementable (Article 14), and that the system can provide transparency information to users (Article 13).

**Code walkthrough:**

```python
# GDPR-compliant breach detection and notification for backend systems
# Implements Article 33 (72-hour notification) and Article 34 (individual notification)
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
from enum import Enum
import logging

class BreachSeverity(Enum):
    LOW = "low"             # No personal data exposed
    MEDIUM = "medium"       # Limited personal data, encrypted
    HIGH = "high"           # Unencrypted personal data exposed
    CRITICAL = "critical"   # Sensitive data (health, financial) exposed

@dataclass
class GDPRBreachReport:
    incident_id: str
    detected_at: datetime
    severity: BreachSeverity
    data_categories_affected: list[str]
    estimated_individuals_affected: int
    description: str

    @property
    def imy_notification_deadline(self) -> datetime:
        """GDPR Article 33: notify supervisory authority within 72 hours."""
        return self.detected_at + timedelta(hours=72)

    @property
    def requires_individual_notification(self) -> bool:
        """GDPR Article 34: notify individuals if high risk to rights."""
        return self.severity in (BreachSeverity.HIGH, BreachSeverity.CRITICAL)

class GDPRBreachDetector:
    """Monitor data access patterns for potential breaches."""
    def __init__(self, alert_threshold: int = 100):
        self.alert_threshold = alert_threshold
        self.logger = logging.getLogger("gdpr_breach_detection")

    def detect_bulk_export_anomaly(self, user_id: str, records_accessed: int,
                                    time_window_minutes: int) -> bool:
        """Flag when a single user accesses unusually many personal records.
        Why: bulk data exfiltration is a common breach pattern."""
        if records_accessed > self.alert_threshold:
            self.logger.critical(
                f"GDPR ALERT: User {user_id} accessed {records_accessed} "
                f"personal records in {time_window_minutes} minutes"
            )
            return True
        return False

    def create_breach_report(self, incident_id: str, severity: BreachSeverity,
                              data_categories: list[str], count: int,
                              description: str) -> GDPRBreachReport:
        report = GDPRBreachReport(
            incident_id=incident_id,
            detected_at=datetime.now(timezone.utc),
            severity=severity,
            data_categories_affected=data_categories,
            estimated_individuals_affected=count,
            description=description,
        )
        deadline = report.imy_notification_deadline.isoformat()
        self.logger.info(f"Breach report {incident_id} created. IMY deadline: {deadline}")
        if report.requires_individual_notification:
            self.logger.warning(f"Individual notification REQUIRED for {incident_id}")
        return report
```

> **Why it matters:** GDPR non-compliance carries penalties of up to 20 million EUR or 4% of global annual turnover — whichever is higher. Beyond fines, a personal data breach that is not detected or reported within 72 hours compounds regulatory, reputational, and legal exposure. Backend developers who build privacy by design into their systems — automated retention, breach detection, erasure support — protect the organisation at the most fundamental infrastructure level.
