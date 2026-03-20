# Tech Lead / Architect – Mid Concept Reference


This document provides detailed explanations of the concepts covered in the Mid level of the Tech Lead / Architect learning path. At this level the focus shifts from understanding individual technologies to designing systems deliberately and leading the people who build them.

---

## Domain-Driven Design – Strategic Patterns (Bounded Contexts, Ubiquitous Language, Context Maps)

Domain-Driven Design (DDD) is an approach to software development that centres the design process on the business domain — the real-world subject area the software supports. Eric Evans introduced DDD in 2003, and it remains the most influential body of thinking for architects working on complex business systems. Strategic DDD deals with how to divide a large domain into manageable pieces and how those pieces relate to each other.

A bounded context is an explicit boundary within which a particular domain model is defined and applicable. Inside the boundary, terms have precise meanings and the model is internally consistent. Outside it, the same word may mean something different. For example, "account" in a banking system means something different in the lending context than in the payments context. Defining bounded contexts forces the team to make these distinctions explicit rather than allowing a single tangled model to grow without limit.

Ubiquitous language is the shared vocabulary that domain experts and developers use within a bounded context. It should appear in code: class names, method names, variable names and database column names should reflect the language the business uses. When ubiquitous language is maintained rigorously, business stakeholders can read the code at a high level and the distance between business intent and implementation narrows.

A context map is a diagram showing the relationships between bounded contexts and how they integrate. Integration patterns include shared kernel (two contexts share a subset of the model), customer-supplier (one context serves another), conformist (the downstream context accepts the upstream model without translation) and anti-corruption layer (the downstream context translates the upstream model into its own terms). The context map is not a one-time diagram — it is a living record of the relationships and dependencies between the teams and systems that make up the organisation.

**Code walkthrough:**

```text
# Step 1: Context map diagram — visualising bounded context relationships
# Why: a context map makes integration patterns and team dependencies explicit

┌─────────────────────┐         ┌─────────────────────┐
│   CLAIMS CONTEXT    │         │  UNDERWRITING CONTEXT│
│   (Team: Claims)    │         │  (Team: Underwriting)│
│                     │         │                      │
│  "Claim" = a filed  │         │  "Claim" = a risk    │
│  insurance request  │ ──ACL──▶│  assessment event    │
│                     │         │                      │
│  Ubiquitous lang:   │         │  Ubiquitous lang:    │
│  - claimant         │         │  - applicant         │
│  - incident date    │         │  - risk score        │
│  - settlement       │         │  - premium           │
└────────┬────────────┘         └──────────────────────┘
         │
         │ Customer-Supplier
         ▼
┌─────────────────────┐
│  PAYMENTS CONTEXT   │
│  (Team: Finance)    │
│                     │
│  "Claim" does not   │
│  exist here — only  │
│  "PaymentOrder"     │
│                     │
│  Anti-corruption    │
│  layer translates   │
│  ClaimSettled event  │
│  → PaymentOrder     │
└─────────────────────┘

# Step 2: Key insight — the word "claim" means different things in each context
# Why: if you build a single Claim model shared across all three teams,
# every change requires coordination between three teams — coupling kills autonomy

# Step 3: Integration patterns used:
# Claims → Underwriting: Anti-Corruption Layer (ACL)
#   Why: underwriting has its own model; it translates claims data into its own terms
# Claims → Payments: Customer-Supplier with domain events
#   Why: claims team publishes ClaimSettled; payments team subscribes independently
```

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

A repository is an abstraction over the persistence mechanism for a given aggregate. Application code retrieves and stores aggregates through the repository interface, which hides the details of the underlying database. This keeps the domain model independent of infrastructure choices and makes the domain testable in isolation. A repository typically offers operations like `findById`, `save` and `findBySpecification`, but does not expose SQL or ORM internals.

Domain events represent something that happened in the domain that other parts of the system may need to react to. They are named in the past tense (OrderPlaced, PaymentReceived) and are immutable records of fact. Publishing domain events allows bounded contexts to react to each other without direct coupling.

**Code walkthrough:**

```csharp
// Step 1: Aggregate root with invariant enforcement
// Why: the aggregate root is the ONLY entry point — it protects business rules

public class Order  // Aggregate Root
{
    public OrderId Id { get; private set; }
    public CustomerId CustomerId { get; private set; }
    private readonly List<OrderLine> _lines = new();  // Internal entities
    public OrderStatus Status { get; private set; }

    // Step 2: Factory method enforces creation rules
    // Why: an Order cannot exist without at least one line item
    public static Order Create(CustomerId customerId, OrderLine firstLine)
    {
        var order = new Order
        {
            Id = OrderId.NewId(),
            CustomerId = customerId,
            Status = OrderStatus.Draft
        };
        order._lines.Add(firstLine);
        // Step 3: Domain event — other contexts react without direct coupling
        order.AddDomainEvent(new OrderCreated(order.Id, customerId));
        return order;
    }

    // Step 4: All state changes go through the root, which enforces invariants
    // Why: no external code can add a line to a confirmed order
    public void AddLine(ProductId product, Quantity quantity, Money unitPrice)
    {
        if (Status != OrderStatus.Draft)
            throw new DomainException("Cannot modify a confirmed order");

        _lines.Add(new OrderLine(product, quantity, unitPrice));
    }

    // Step 5: Value Object — defined by its attributes, not by identity
    // Why: two Money(100, "SEK") instances are equal and interchangeable
    public Money TotalAmount => _lines
        .Select(l => l.UnitPrice.Multiply(l.Quantity.Value))
        .Aggregate(Money.Zero("SEK"), (sum, price) => sum.Add(price));
}

// Step 6: Repository interface — domain code has no knowledge of the database
// Why: this keeps the domain testable in isolation from infrastructure
public interface IOrderRepository
{
    Task<Order?> FindById(OrderId id);
    Task Save(Order order);
}
```

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

**Code walkthrough:**

```csharp
// Step 1: Event-driven architecture — producer and consumer are fully decoupled
// Why: the order service does not know (or care) which services react to its events

// --- Producer: Order Service ---
public class OrderService
{
    private readonly IMessageBus _bus;

    public async Task ConfirmOrder(OrderId orderId)
    {
        var order = await _repo.FindById(orderId);
        order.Confirm();
        await _repo.Save(order);

        // Step 2: Publish a domain event — consumers subscribe independently
        // Why: adding a new consumer (e.g., analytics) requires zero changes here
        await _bus.Publish(new OrderConfirmed
        {
            OrderId = orderId.Value,
            CustomerId = order.CustomerId.Value,
            TotalAmount = order.TotalAmount.Amount,
            ConfirmedAt = DateTimeOffset.UtcNow
        });
    }
}

// --- Consumer 1: Payment Service ---
// Step 3: Each consumer handles the event in its own bounded context
// Why: payment service translates the event into its own domain language
public class OrderConfirmedHandler : IHandleMessage<OrderConfirmed>
{
    public async Task Handle(OrderConfirmed evt)
    {
        var paymentRequest = new PaymentRequest(
            referenceId: evt.OrderId,
            amount: evt.TotalAmount
        );
        await _paymentGateway.InitiatePayment(paymentRequest);
    }
}

// --- Consumer 2: Notification Service ---
// Step 4: Fan-out — multiple consumers process the same event independently
public class OrderConfirmedNotifier : IHandleMessage<OrderConfirmed>
{
    public async Task Handle(OrderConfirmed evt)
    {
        await _emailService.SendOrderConfirmation(evt.CustomerId, evt.OrderId);
    }
}

// Step 5: Key trade-off — eventual consistency
// Why: the payment and notification happen asynchronously; the order is confirmed
// before payment is initiated. The system must handle payment failures gracefully
// (compensating actions, retries, dead-letter queues)
```

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

**Code walkthrough:**

```text
# Step 1: STRIDE threat model for an API endpoint — "POST /claims"
# Why: walking through STRIDE for each endpoint surfaces risks before they reach production

┌──────────────┐    HTTPS     ┌──────────────┐      ┌────────────┐
│   Browser     │────────────▶│  API Gateway  │─────▶│ Claims API │
└──────────────┘              └──────────────┘      └─────┬──────┘
                                                          │
                                                    ┌─────▼──────┐
                                                    │ Claims DB   │
                                                    └────────────┘

Threat Analysis for POST /claims:

| STRIDE Category      | Threat                                      | Mitigation                              |
|----------------------|---------------------------------------------|-----------------------------------------|
| Spoofing             | Attacker submits claim as another customer  | OAuth 2.0 + verify token sub == caller  |
| Tampering            | Attacker modifies claim amount in transit   | TLS everywhere; validate server-side    |
| Repudiation          | User denies submitting a claim              | Audit log with timestamp + user ID      |
| Info Disclosure      | Error responses leak DB schema or stack     | Generic error messages; log details     |
| Denial of Service    | Flood endpoint with large payloads          | Rate limiting; max request body 1MB     |
| Elevation of Priv.   | User changes role claim in JWT              | Validate JWT signature; never trust     |
|                      |                                             | client-supplied roles without server    |
|                      |                                             | verification                            |

# Step 2: The architect's checklist after STRIDE
# - [ ] Authentication: OAuth 2.0 / OIDC at the API gateway
# - [ ] Authorisation: policy-based access control (not just role checks)
# - [ ] Input validation: reject unexpected fields, enforce types and ranges
# - [ ] Audit logging: every state-changing request is logged with actor identity
# - [ ] Rate limiting: per-user and per-IP limits at the gateway
# - [ ] Error handling: never expose internal details in HTTP responses
```

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

**Code walkthrough:**

```yaml
# Step 1: SLO definition document — what "healthy" means for a service
# Why: without SLOs, reliability discussions become opinion-based arguments

service: order-api
owner: team-orders

slos:
  # Step 2: Availability SLO — what percentage of requests succeed?
  - name: availability
    description: "Proportion of non-error responses"
    sli:
      # Why: SLIs use the ratio of good events to total events
      good_events: "http_requests_total{status!~'5..'}"
      total_events: "http_requests_total"
    target: 99.9%          # 43.8 minutes of downtime allowed per month
    window: rolling_30d

  # Step 3: Latency SLO — how fast do requests complete?
  - name: latency-p99
    description: "99th percentile response time under 500ms"
    sli:
      good_events: "http_requests_total{le='0.5'}"
      total_events: "http_requests_total"
    target: 99.5%
    window: rolling_30d

  # Step 4: Error budget — the difference between 100% and the SLO target
  # Why: the error budget tells you HOW MUCH unreliability you can tolerate
  # 100% - 99.9% = 0.1% error budget = ~43 minutes per month
  # If error budget is exhausted: freeze deployments, focus on reliability

# Step 5: Alerting based on error budget burn rate
alerts:
  - name: high-burn-rate
    # Why: alert on burn rate, not raw errors — this reduces false positives
    condition: "error_budget_consumption_rate > 14.4x over 1 hour"
    severity: critical
    action: page-on-call

  - name: slow-burn-rate
    condition: "error_budget_consumption_rate > 6x over 6 hours"
    severity: warning
    action: create-ticket
```

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

An Architecture Decision Record (ADR) is a short document that captures an architectural decision, the context in which it was made, the options that were considered and the rationale for the choice. ADRs are stored in version control alongside the code (typically in a `docs/adr/` directory), so future developers can understand why the system is the way it is without having to reconstruct the reasoning from memory or tribal knowledge. The format is deliberately lightweight: a title, status (proposed, accepted, deprecated, superseded), context, decision and consequences.

The act of writing an ADR often improves the decision itself. Forcing the author to articulate the trade-offs in writing frequently reveals assumptions that had not been examined. The record also makes it easier to revisit a decision when circumstances change — you can see what the original constraints were and whether they still apply.

When proposing a significant architectural change, a tech lead will often write a draft ADR first, share it for asynchronous review and then use the design review session to resolve outstanding objections. This sequence — written proposal, async comments, synchronous discussion — is more efficient than arriving at a meeting with only a verbal proposal and expecting the team to make a good decision in real time.

**Code walkthrough:**

```text
# Step 1: Design review facilitation script — how to run an effective 30-minute review
# Why: without structure, design reviews become open-ended debates with no decision

DESIGN REVIEW AGENDA — [Feature/Component Name]
Duration: 30 minutes
Facilitator: Tech Lead
Author: [Engineer presenting the design]

[0-5 min] PROBLEM STATEMENT
  Author presents:
  - What problem are we solving?
  - What are the constraints? (time, budget, existing systems, compliance)
  - What does success look like?
  Facilitator enforces: NO solution discussion yet — understand the problem first

[5-15 min] PROPOSED SOLUTION
  Author presents:
  - Architecture diagram with component responsibilities
  - Data flow for the primary use case
  - Key trade-offs and what was considered but rejected
  Reviewers: ask clarifying questions only (no critiques yet)

[15-25 min] STRUCTURED CRITIQUE
  Walk through each concern category:
  - Reliability: What happens when [component X] fails?
  - Security: Run STRIDE on the main data flow
  - Scalability: What is the expected load? Where is the bottleneck?
  - Operability: How do we deploy, monitor, and roll back?
  - Cost: What are the ongoing costs? Any surprises at scale?
  Facilitator: capture each concern and whether it is blocking or not

[25-30 min] DECISION
  Options:
  ✅ Approved — proceed to implementation
  🔄 Approved with conditions — proceed, address [specific items] before merge
  ❌ Revisit — fundamental concerns need resolution; schedule follow-up

  ACTION: Author writes ADR capturing the decision and posts as PR within 24 hours
```

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

**Code walkthrough:**

```text
# Step 1: Technical debt tracking — making invisible debt visible and actionable
# Why: without tracking, tech debt accumulates silently until it blocks delivery

# --- tech-debt-register.yaml (stored in the repository alongside ADRs) ---
items:
  - id: TD-042
    title: "Order API uses synchronous DB calls in the hot path"
    severity: high           # high/medium/low
    impact: |
      p99 latency spikes to 2s under load because all 3 DB queries
      run sequentially. Affects the checkout flow directly.
    effort: medium           # small (< 1 day), medium (1-3 days), large (> 3 days)
    created: 2026-01-10
    owner: team-orders
    related_adr: ADR-015     # Links to the original decision that created this debt
    status: prioritised      # identified | prioritised | in-progress | resolved
    plan: |
      Refactor to async/parallel DB calls. Requires updating the repository
      layer. Estimated 2 story points. Scheduled for sprint 14.

  - id: TD-043
    title: "Shared database between Order and Inventory services"
    severity: high
    impact: |
      Schema changes require coordinated deployments across two teams.
      Blocks independent deployment — a key microservices prerequisite.
    effort: large
    created: 2026-02-01
    owner: team-platform
    status: identified
    plan: |
      Step 1: Add an API layer in front of shared tables.
      Step 2: Migrate Inventory to its own database behind the API.
      Step 3: Remove direct DB access. Estimated 3 sprints.

# Step 2: Tech debt budget — the tech lead allocates capacity for debt reduction
# Why: if debt work is never prioritised, it will never get done
sprint_allocation:
  feature_work: 70%
  tech_debt: 20%        # Non-negotiable — agreed with product owner
  operational_toil: 10%
```

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

**Code walkthrough:**

```python
# Step 1: A production prompt construction pipeline with versioning and testing
# Why: prompts are code — they need version control, testing, and observability

from dataclasses import dataclass
from typing import List

@dataclass
class RetrievedChunk:
    content: str
    source: str
    relevance_score: float

class PromptBuilder:
    """
    Step 2: Separate system prompt from user prompt — they have different lifecycles
    Why: the system prompt changes rarely (reviewed by the team);
    the user prompt changes every request
    """
    SYSTEM_PROMPT_V2 = """You are a claims assistant for an insurance company.
    Rules:
    - Only answer questions about claims using the provided context
    - If the context does not contain the answer, say "I don't have that information"
    - Never reveal internal policy numbers or employee names
    - Respond in the same language as the user's question"""

    def build(self, user_query: str, chunks: List[RetrievedChunk]) -> list:
        # Step 3: Filter and rank retrieved context — not all chunks are useful
        # Why: irrelevant context degrades output quality more than no context
        relevant = [c for c in chunks if c.relevance_score > 0.75]
        relevant.sort(key=lambda c: c.relevance_score, reverse=True)
        top_chunks = relevant[:5]  # Token budget: keep top 5

        # Step 4: Format context with clear delimiters for the model
        context_block = "\n---\n".join(
            f"Source: {c.source}\n{c.content}" for c in top_chunks
        )

        # Step 5: Assemble the final prompt — structured for reliable parsing
        return [
            {"role": "system", "content": self.SYSTEM_PROMPT_V2},
            {"role": "user", "content": f"Context:\n{context_block}\n\nQuestion: {user_query}"}
        ]

# Step 6: Test prompt reliability — prompts need regression tests like any code
def test_prompt_refuses_out_of_scope():
    builder = PromptBuilder()
    messages = builder.build("What is the weather today?", chunks=[])
    # Assert: model response contains "I don't have that information"
    # Why: without tests, a prompt change could silently break guardrails
```

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

The Azure Well-Architected Framework (WAF) is Microsoft's set of guiding principles for designing and operating cloud workloads. It defines five pillars — Reliability, Security, Cost Optimisation, Operational Excellence, and Performance Efficiency — that provide a structured approach to evaluating architectural decisions. For LF, where Azure is the primary cloud platform and a defined set of approved services exists, WAF provides the framework for making consistent, defensible architectural choices.

WAF is not just a Microsoft checklist — it codifies principles that apply to any cloud architecture. The framework includes design principles, design review checklists, Azure Advisor recommendations, and reference architectures. The Well-Architected Review is a structured assessment that evaluates a workload against all five pillars and produces prioritised recommendations.

The Cloud Adoption Framework (CAF) complements WAF by providing guidance for the organisational and strategic aspects of cloud adoption: strategy, planning, readiness, migration, governance, and management. While WAF focuses on individual workload quality, CAF addresses the broader enterprise cloud journey.

**Code walkthrough:**

```yaml
# Step 1: A WAF design review checklist applied to a real workload
# Why: walking through each pillar ensures you don't optimise one at the expense of others

workload: claims-processing-api
review_date: 2026-03-15

pillars:
  reliability:
    # Step 2: What happens when this component fails?
    - question: "Is the service deployed across availability zones?"
      answer: "Yes — 3 AZs via Container Apps"
      status: pass
    - question: "Are health probes configured for all endpoints?"
      answer: "Readiness and liveness probes on /health"
      status: pass
    - question: "What is the DR plan if the primary region fails?"
      answer: "No DR plan exists yet"
      status: fail
      action: "ADR needed — evaluate active-passive in North Europe"

  security:
    # Step 3: Defence in depth — multiple layers of protection
    - question: "Are all secrets in Key Vault (not env vars or config files)?"
      answer: "Yes — managed identity authenticates to Key Vault"
      status: pass
    - question: "Is network access restricted to private endpoints?"
      answer: "SQL Database still uses service endpoints"
      status: fail
      action: "Migrate to private endpoints — tracked in TD-051"

  cost_optimisation:
    # Step 4: Right-size resources based on actual usage, not guesswork
    - question: "Are resources right-sized based on usage data?"
      answer: "Container Apps auto-scales 2-10 replicas; SQL is S2 tier"
      status: pass
    - question: "Are non-production environments scaled down outside hours?"
      answer: "No — staging runs 24/7 at production scale"
      status: fail
      action: "Implement scheduled scaling for staging — est. saving 40%"

  operational_excellence:
    - question: "Can the team that inherits this system operate it?"
      answer: "Runbooks exist for top 5 incidents; ADRs cover key decisions"
      status: pass

  performance_efficiency:
    - question: "Where is the bottleneck at 10x current load?"
      answer: "SQL database — no read replicas; no caching layer"
      status: warning
      action: "Add Redis cache for claim lookups before Q3 traffic spike"
```

**Why it matters:** As a Tech Lead or Architect, every system design decision involves trade-offs across the five pillars. Understanding WAF gives you a shared vocabulary for discussing these trade-offs with stakeholders, a structured approach for design reviews, and alignment with the cloud platform your organisation has chosen. It also ensures you consider dimensions (cost, operational excellence) that are easy to overlook when focused on features.

**Key things to understand:**
- Reliability: the ability of a system to recover from failures and continue to function. Design for failure: use availability zones, implement health probes, design retry policies, plan for disaster recovery. Key question: what happens when this component fails?
- Security: protect the workload from threats through defence in depth. Identity-based access control (Azure Entra ID), network segmentation, encryption at rest and in transit, security monitoring. At LF, this aligns with the approved security services (Key Vault for secrets, PIM for privileged access, LF Root CA for certificates)
- Cost Optimisation: deliver business value while minimising unnecessary spending. Right-size resources, use auto-scaling, choose appropriate pricing tiers, implement cost alerts. For LF, this means using approved services (Container Apps instead of full AKS where appropriate, Functions for event-driven workloads) which are pre-negotiated and well-understood
- Operational Excellence: the processes and practices that keep a workload running in production. Infrastructure as code, CI/CD, monitoring and alerting, incident management, documentation. Key question: can the team that inherits this system operate it successfully?
- Performance Efficiency: the ability of a workload to scale and meet demand. Identify bottlenecks, implement caching, choose appropriate compute (Container Apps for HTTP workloads, Functions for event-driven), use CDN for static content, design for horizontal scaling
- LF approved services alignment: architectural decisions should prioritise approved Azure services. Container Apps for containerised workloads, Azure Functions for event-driven compute, Azure SQL Database and CosmosDB for data, Key Vault for secrets and certificates, Azure Monitor for observability. Using approved services reduces operational burden and security risk
- Design reviews: use the WAF design review checklists as a structured approach for evaluating system designs in architecture reviews. Walk through each pillar and assess how the design addresses reliability, security, cost, operations, and performance

**Common pitfalls:**
- Optimising for one pillar at the expense of others — a maximally reliable system may be prohibitively expensive. WAF is about finding the right balance for your specific workload and business requirements
- Treating WAF as a one-time assessment rather than a continuous practice. Workloads evolve, and the architectural trade-offs should be reassessed as requirements and usage patterns change
- Ignoring Cost Optimisation during initial design ("we will optimise costs later") — cost-efficient architecture is much easier to achieve from the start than to retrofit
- Not involving the operations team in architectural decisions — Operational Excellence requires that the people who will run the system can actually operate it effectively
