export const additions = {
  beginner: [
    {
      question: 'In the "20 System Design Concepts in 10 Minutes" video, what problem does horizontal scaling introduce that vertical scaling does not?',
      options: [
        'Horizontal scaling requires more expensive hardware than vertical scaling',
        'Horizontal scaling removes fault tolerance by adding more machines',
        'Horizontal scaling requires a load balancer and forces the application to be stateless so that any instance can serve any request',
        'Horizontal scaling only works for read-heavy workloads'
      ],
      correctIndex: 2,
      explanation: 'The video explains that while vertical scaling is simple (just upgrade the machine), horizontal scaling requires distributing requests across servers — which means you need a load balancer. It also means the application must be stateless or externalise state, because a load balancer may route subsequent requests from the same user to a different server. This statelessness requirement is the key architectural implication.'
    },
    {
      question: 'According to the "System Design for Beginners" course, what is the purpose of the Domain Name System (DNS)?',
      options: [
        'It encrypts HTTP requests so that data cannot be intercepted in transit',
        'It translates human-readable domain names into IP addresses so that clients can locate and connect to the correct server',
        'It routes requests to the nearest server to reduce latency',
        'It assigns unique identifiers to each HTTP request for tracking purposes'
      ],
      correctIndex: 1,
      explanation: 'DNS acts as the internet\'s phone book. When you type a domain name into your browser, your computer queries a DNS server to get the corresponding IP address. Without DNS, users would have to memorise and type raw IP addresses to reach any website. Once the IP address is resolved, the browser can establish a TCP connection and send an HTTP request to the server.'
    },
    {
      question: 'What is the key difference between REST and GraphQL described in the system design beginner resources?',
      options: [
        'REST is newer and more performant; GraphQL is a legacy protocol maintained for backwards compatibility',
        'REST returns a fixed set of data per endpoint, which can lead to over-fetching or under-fetching; GraphQL lets the client specify exactly what data it needs in a single request',
        'REST supports bidirectional communication; GraphQL only supports one-way data retrieval',
        'REST requires binary serialisation; GraphQL uses plain text JSON'
      ],
      correctIndex: 1,
      explanation: 'REST organises APIs around resources and uses fixed endpoints that return a predefined shape of data. If a UI needs only a subset of that data, it over-fetches; if it needs data from multiple resources, it must make multiple requests (under-fetching). GraphQL, introduced by Facebook in 2015, solves both problems by allowing clients to declare exactly which fields they need across any number of resources in a single query — though this comes with more complex server-side processing and reduced HTTP cache effectiveness.'
    },
  ],
  mid: [
    {
      question: 'In the "30 System Design Concepts" video, why should indexing be applied before considering sharding when a database becomes slow?',
      options: [
        'Indexes are only useful for small databases; sharding is always more effective at scale',
        'Indexing improves read performance with low complexity, while sharding distributes both storage and writes but adds cross-shard query complexity and resharding overhead — simpler techniques should be exhausted first',
        'Sharding requires indexes to function correctly, so they must be added first',
        'Indexes replace the need for primary keys, which sharding depends on'
      ],
      correctIndex: 1,
      explanation: 'The video establishes a hierarchy of database scaling techniques. Indexing is the first lever: it adds a lookup structure that lets the database jump directly to matching rows rather than scanning the full table, dramatically improving read performance with relatively simple implementation. Sharding splits data across multiple database instances, which resolves storage and write constraints but introduces complex cross-shard queries, hotspot risks and difficult resharding operations. A senior engineer exhausts simpler options — indexing, then replication, then caching — before introducing the operational complexity of sharding.'
    },
    {
      question: 'According to the Uber system design video, why was PostgreSQL chosen for the core transactional data (rides, fares, payments) rather than a NoSQL database?',
      options: [
        'PostgreSQL scales horizontally more easily than NoSQL databases',
        'PostgreSQL supports geospatial indexing, which NoSQL databases cannot provide',
        'The financial and ride-status data requires ACID guarantees — atomicity, consistency, isolation and durability — to ensure that transactions such as ride creation and payment are processed reliably and without data corruption',
        'NoSQL databases do not support the status fields required by the rides table'
      ],
      correctIndex: 2,
      explanation: 'The Uber design video explicitly states that SQL databases with ACID properties are appropriate for financial operations. Atomicity ensures that a ride creation and its associated payment record either both succeed or both fail — there is no partial state. Consistency enforces referential integrity between tables. Isolation prevents concurrent transactions from interfering with each other. Durability guarantees that committed data survives system failures. These guarantees are essential for payment systems; NoSQL databases that trade consistency for scalability would introduce unacceptable risks of duplicate charges or lost transaction records.'
    },
    {
      question: 'The Uber system design video compares geohashing, quadtrees and H3 hexagonal indexing for finding nearby drivers. Which approach does the video recommend for a new ride-sharing system and why?',
      options: [
        'H3, because its hexagonal tiles provide the most accurate proximity searches',
        'Quadtrees, because they adapt to varying driver density in urban versus rural areas',
        'Geohashing, because it is simple to implement using Redis prefix queries, correct for the scale needed and easier to debug — while H3 and quadtrees are noted as valid alternatives for more demanding requirements',
        'Long polling, because it allows the server to push driver locations without a persistent connection'
      ],
      correctIndex: 2,
      explanation: 'The video recommends geohashing for its simplicity: latitude and longitude are encoded into a hierarchical alphanumeric string, and finding nearby drivers becomes a Redis prefix query on adjacent geohash cells. The video explicitly notes that Uber uses H3 in production for its better geometric uniformity and K-nearest-neighbour efficiency, and explains the trade-off: H3 is more accurate but more complex to implement and integrate. Quadtrees adapt to data density but are more complex. The recommendation to start with geohashing reflects the principle that complexity should be introduced only when simpler approaches are demonstrably insufficient.'
    },
  ],
  senior: [
    {
      question: 'In a distributed ride-sharing system like Uber, why is a Redis-based distributed lock necessary when assigning a driver to a ride request?',
      options: [
        'Redis locks prevent the location cache from becoming stale during the assignment process',
        'Without a distributed lock, multiple instances of the driver assignment service could simultaneously offer the same ride to different drivers or allow the same driver to accept multiple rides concurrently, creating double-assignment race conditions',
        'Redis locks ensure that driver location updates are processed in the correct chronological order',
        'The lock prevents read replicas from returning outdated driver availability data during high traffic'
      ],
      correctIndex: 1,
      explanation: 'The Uber design video identifies race conditions in driver assignment as a critical problem at scale. When the driver assignment service runs as multiple horizontal replicas (which it must at 100M+ daily users), two instances can independently identify the same driver as the best candidate and send ride offers simultaneously. A Redis distributed lock on the ride ID ensures that only one service instance holds the lock at a time. The instance that acquires the lock proceeds with the assignment; any other instance that tries to acquire the same lock fails and moves to the next candidate. The lock is released when the driver accepts or declines, or when a timeout expires.'
    },
    {
      question: 'When designing an LLM agent with tool access, why is least-privilege tool design more important than in traditional software systems?',
      options: [
        'LLM agents are slower than traditional software, so limiting tool access improves performance',
        'An LLM agent\'s reasoning can be hijacked through prompt injection, meaning that an attacker who successfully redirects the agent\'s instructions can invoke any tool the agent has access to — making over-broad permissions a direct path to destructive actions at machine speed',
        'Least-privilege is a compliance requirement specific to AI systems under the EU AI Act',
        'LLM agents cannot reason about tool permissions, so the only way to enforce boundaries is through access controls'
      ],
      correctIndex: 1,
      explanation: 'In traditional software, privilege escalation requires exploiting a code vulnerability. In LLM agent systems, the "vulnerability" can be a crafted prompt embedded in a document the agent processes — indirect prompt injection. If an attacker successfully overrides the agent\'s instructions, the agent will use whatever tools it has access to carry out those instructions. An agent with read-only database access can leak data; an agent with write access can corrupt or delete records; an agent with email-send access can exfiltrate information to arbitrary addresses. The principle of least privilege limits the blast radius of a successful injection attack to only the operations the agent legitimately needs.'
    },
    {
      question: 'What distinguishes "context engineering" from "prompt engineering" at the senior architect level?',
      options: [
        'Context engineering applies only to multi-agent systems; prompt engineering applies to single-model deployments',
        'Prompt engineering is a craft focused on individual prompt design; context engineering treats the entire context construction pipeline as a versioned, tested, observable software system that must be maintained with the same rigour as any production code path',
        'Context engineering optimises token costs; prompt engineering optimises output accuracy',
        'They are interchangeable terms for the same discipline, with context engineering being the newer name'
      ],
      correctIndex: 1,
      explanation: 'Prompt engineering focuses on crafting effective individual prompts — the right instructions, examples and format to elicit good outputs from a model. Context engineering elevates this to a systems concern: at production scale, the context is assembled dynamically from multiple sources (retrieved documents, conversation history, tool results, user input, system instructions), and that assembly logic is code that must be versioned, tested against golden datasets, monitored for quality regressions and updated with the same discipline as any other production service. A change to context ordering or compression logic can silently degrade output quality across all users; without engineering rigour around context construction, these regressions are invisible until user complaints surface them.'
    },
  ],
}
