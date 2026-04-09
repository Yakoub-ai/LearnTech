export const additions = {
  beginner: [
    {
      question: 'According to the "Every Popular API Style Explained" video, what is the key reason REST became the dominant API style and why is its statelessness important for scaling?',
      options: [
        'REST is the fastest protocol available — statelessness avoids network round trips',
        'REST was invented by Google and is enforced by browser standards',
        'REST organises data as resources at URLs and its statelessness means any server replica can handle any request, making horizontal scaling straightforward',
        'REST uses binary encoding which makes it more efficient than XML-based protocols'
      ],
      correctIndex: 2,
      explanation: 'The video explains REST as resource-based (each noun — users, orders, photos — gets its own URL) and stateless (the server keeps no memory between requests; every request carries all the information needed to process it). This statelessness is precisely what makes horizontal scaling easy: if the server remembers nothing, it does not matter which server replica handles the next request.'
    },
    {
      question: 'When a server receives an HTTP request that is syntactically valid but contains data that violates a business rule (for example, a negative quantity in an order), which HTTP status code should it return?',
      options: [
        '200 OK — the request was received successfully',
        '404 Not Found — the requested resource does not exist',
        '422 Unprocessable Entity — the request is well-formed but semantically invalid',
        '500 Internal Server Error — the server could not process the request'
      ],
      correctIndex: 2,
      explanation: '422 Unprocessable Entity is the correct code for a request that is syntactically valid (the server can parse it) but semantically invalid (the data violates business rules or constraints). 400 Bad Request is for malformed requests (missing required fields, wrong data type). 500 means the server itself failed, which should not be used to report a client-supplied invalid value.'
    },
    {
      question: 'A frontend developer adds JavaScript validation that prevents users from submitting an order form with a negative quantity. Why is it still essential for the backend to validate the same data?',
      options: [
        'It is not essential — if the frontend validates, the backend can trust the data',
        'Because client-side validation can be trivially bypassed by anyone using browser developer tools or a tool like curl to send a request directly to the server',
        'Because JavaScript validation is slower and less accurate than server-side validation',
        'Because frontend developers are less experienced than backend developers'
      ],
      correctIndex: 1,
      explanation: 'Client-server architecture means the server never controls the client. Anyone can bypass JavaScript validation by sending a crafted HTTP request directly to the API endpoint — browser dev tools, curl, Postman, or a custom script all make this trivial. The backend is the enforcer of all business rules and must validate every input it receives, regardless of what the client claims to have already checked.'
    },
    {
      question: 'What does an HTTP 404 status code indicate?',
      options: [
        'The requested resource was not found on the server',
        'The server encountered an unexpected internal error',
        'The request succeeded and a new resource was created',
        'The client sent a request without valid authentication credentials'
      ],
      correctIndex: 0,
      explanation: '404 Not Found is a 4xx client error indicating that the server cannot locate the requested resource. Understanding status code classes (2xx success, 4xx client error, 5xx server error) is the first step to diagnosing production bugs from logs.'
    },
    {
      question: 'What is the purpose of rate limiting on an API?',
      options: [
        'To prevent server overload by restricting how many requests a client can make within a time window',
        'To limit the size of the JSON response payload returned to the client',
        'To throttle the API so it responds no faster than a minimum latency',
        'To restrict which HTTP methods a client is allowed to use'
      ],
      correctIndex: 0,
      explanation: 'Rate limiting caps the number of requests a client can make in a given period (e.g., 100 requests per minute). This protects the server from abuse, accidental flooding from buggy clients, and denial-of-service scenarios where one consumer could degrade the experience for all others.'
    },
    {
      question: 'What is the difference between a relational database and a NoSQL document store?',
      options: [
        'Relational databases store data in structured tables with enforced schemas and support SQL joins; document stores store data as flexible JSON-like documents and optimise for reads of self-contained records',
        'Relational databases are always slower than document stores because of the overhead of enforcing schemas',
        'NoSQL document stores do not support queries — they can only retrieve documents by their primary key',
        'Relational databases can only run on-premises while document stores are cloud-only'
      ],
      correctIndex: 0,
      explanation: 'Relational databases (PostgreSQL, MySQL) enforce schemas, support complex joins, and guarantee ACID transactions — ideal for structured data with relationships. Document stores (MongoDB, DynamoDB) store flexible, schema-less documents and excel at reading self-contained records. The choice depends on data structure, query patterns, and consistency requirements.'
    },
    {
      question: 'Why is using HTTPS instead of HTTP essential for any production backend service?',
      options: [
        'HTTPS encrypts data in transit using TLS, preventing attackers from reading or tampering with the data exchanged between client and server',
        'HTTPS makes API responses load faster because encrypted data is compressed more efficiently',
        'HTTPS is only required for payment processing and has no benefit for other types of API traffic',
        'HTTPS replaces the need for authentication because the encrypted connection already verifies the user\'s identity'
      ],
      correctIndex: 0,
      explanation: 'HTTPS wraps HTTP in a TLS (Transport Layer Security) layer that encrypts all data in transit. Without it, any network intermediary (Wi-Fi router, ISP, attacker) can read passwords, tokens, and sensitive data in plaintext. HTTPS also verifies server identity through certificates, preventing man-in-the-middle attacks.'
    },
  ],
  mid: [
    {
      question: 'According to the "OAuth 2.0 and OpenID Connect in Plain English" video, what is the fundamental difference between OAuth 2.0 and OpenID Connect, and why does that difference matter for authentication?',
      options: [
        'OAuth 2.0 is newer than OpenID Connect and replaces it for most use cases',
        'OAuth 2.0 is an authorisation framework that grants access without identifying the user; OpenID Connect adds an ID token on top of OAuth 2.0 that proves who the user is — making OIDC an authentication protocol',
        'OAuth 2.0 handles passwords; OpenID Connect handles tokens',
        'They are interchangeable — both protocols serve the same purpose'
      ],
      correctIndex: 1,
      explanation: 'The video is explicit on this point: OAuth 2.0 answers "has this user granted access?" but does not tell you who the user is. Using an OAuth 2.0 access token to identify a user (without OIDC) is a common and dangerous mistake — the token proves authorisation, not identity. OpenID Connect adds the ID token, a signed JWT that contains the user\'s identity (sub claim), which is what makes it an authentication protocol.'
    },
    {
      question: 'In the "Learn Docker in 7 Easy Steps" video, why does the presenter deliberately copy package.json and install dependencies BEFORE copying the application source code into the Docker image?',
      options: [
        'Because npm requires the package.json to be installed before it can read source files',
        'Because Docker builds images in parallel and this order is required for thread safety',
        'Because Docker caches each layer — if dependencies are installed in an earlier layer, they are not reinstalled when only source code changes, making rebuilds much faster',
        'Because running npm install after copying source code would overwrite the application files'
      ],
      correctIndex: 2,
      explanation: 'Docker builds images layer by layer and caches each layer. When you rebuild, Docker reuses cached layers up to the first changed instruction. Dependencies (installed via npm install or pip install) change rarely; application code changes with every commit. By installing dependencies first, their layer stays cached across rebuilds. Copying source code second means only the code-copy and subsequent layers are invalidated on each change — not the expensive dependency installation step.'
    },
    {
      question: 'The NeetCode "System Design Concepts in 10 min" video explains that when a database partition occurs in a distributed system, you can only choose to favour one of two properties. Which are they, and what does each choice mean in practice?',
      options: [
        'Speed vs storage — CP systems are faster; AP systems store more data',
        'Security vs performance — CP systems are more secure; AP systems are faster',
        'Consistency vs Availability — CP systems refuse to serve potentially stale data (may return errors during a partition); AP systems always respond but may return stale data',
        'Read performance vs write performance — CP systems optimise reads; AP systems optimise writes'
      ],
      correctIndex: 2,
      explanation: 'The CAP theorem states that a distributed data store can guarantee at most two of Consistency, Availability, and Partition Tolerance. Since network partitions always happen, the practical design choice is between CP (refuse to answer rather than give stale data — used by systems like ZooKeeper or strongly-consistent databases) and AP (always answer, even if the data might be slightly stale — used by systems like DynamoDB or Cassandra). The right choice depends on the business requirement: financial transactions typically require CP; social media feeds can tolerate AP.'
    },
    {
      question: 'Why is gRPC preferred over REST for high-throughput microservice-to-microservice communication?',
      options: [
        'gRPC uses Protocol Buffers (a binary format faster than JSON) and code generation, making it more efficient for internal service communication where human readability is less important',
        'gRPC uses plain text encoding which is faster to parse than JSON\'s nested structure',
        'gRPC runs over UDP instead of TCP, eliminating the overhead of connection establishment',
        'gRPC automatically encrypts all messages using AES-256, whereas REST transmits data in plain text'
      ],
      correctIndex: 0,
      explanation: 'gRPC uses Protocol Buffers — a compact binary format — instead of JSON, and generates typed client/server code from a schema definition. This makes it significantly faster and more efficient than REST for internal service communication where developer ergonomics matter less than throughput.'
    },
    {
      question: 'Which status code should be returned after successfully creating a new resource, and what additional header should accompany it?',
      options: [
        '201 Created, with a Location header pointing to the URL of the new resource',
        '200 OK, with the new resource\'s ID included in the response body',
        '204 No Content, because the server has nothing to return after a creation operation',
        '202 Accepted, to indicate the creation is being processed asynchronously'
      ],
      correctIndex: 0,
      explanation: '201 Created signals successful resource creation and should include a Location header pointing to the new resource\'s URL (e.g., `Location: /orders/43`). Returning 200 for creates is a common API design mistake that makes it harder for clients to distinguish creation from retrieval.'
    },
    {
      question: 'What is a cache invalidation strategy and why is it described as one of the hardest problems in computer science?',
      options: [
        'Cache invalidation is the process of removing or updating stale data in a cache when the underlying data changes — it is difficult because the cache and the database can fall out of sync, serving incorrect data to users',
        'Cache invalidation means clearing the entire cache periodically to prevent memory overflow — it is difficult because the optimal interval varies by workload',
        'Cache invalidation involves encrypting cached data to prevent unauthorised access — it is difficult because encryption adds latency',
        'Cache invalidation is a strategy for choosing which cache entries to evict when the cache is full — it is difficult because the optimal eviction policy depends on future access patterns'
      ],
      correctIndex: 0,
      explanation: 'Cache invalidation ensures that when the source of truth (typically the database) changes, the cache is updated or cleared so users do not receive stale data. This is notoriously difficult because distributed systems introduce race conditions: a write to the database and an invalidation of the cache can arrive out of order, or the cache can be re-populated with stale data between a write and its invalidation.'
    },
    {
      question: 'What is the fundamental difference between authentication and authorisation?',
      options: [
        'Authentication verifies who the user is (identity); authorisation determines what the user is allowed to do (permissions)',
        'Authentication uses passwords; authorisation uses tokens — they are two steps in the same protocol',
        'Authentication happens on the client side; authorisation happens on the server side',
        'Authentication is required for public APIs; authorisation is only needed for internal APIs'
      ],
      correctIndex: 0,
      explanation: 'Authentication (AuthN) answers "who are you?" — verifying identity through credentials like passwords, tokens, or certificates. Authorisation (AuthZ) answers "what are you allowed to do?" — checking whether the authenticated identity has permission to perform the requested action. They are distinct concerns: a user can be authenticated (we know who they are) but not authorised (they lack permission for a specific action).'
    },
  ],
  senior: [
    {
      question: 'According to the "Uber System Design Interview" video, why does the presenter evaluate WebSockets as the preferred approach for the driver location update flow, compared to long polling?',
      options: [
        'WebSockets are easier to implement and require less server configuration',
        'WebSockets are the only protocol that works on mobile networks',
        'WebSockets establish a persistent bidirectional connection, eliminating the repeated HTTP overhead of long polling and reducing both latency and server load when millions of drivers are sending frequent updates',
        'WebSockets are cheaper to operate because they use UDP instead of TCP'
      ],
      correctIndex: 2,
      explanation: 'The video walks through the trade-offs explicitly: long polling works by the client repeatedly requesting updates from the server, holding the connection until new data is available, then immediately repeating. At Uber\'s scale (millions of drivers sending location updates every few seconds), the overhead of establishing repeated HTTP connections is significant. WebSockets open a single persistent connection per client over which both sides can send messages at any time — no polling overhead, lower latency, and less server load for continuous data streams.'
    },
    {
      question: 'In the "Dynamic Programming – Full Course" video, the presenter argues that you do not need to memorise hundreds of DP problems. What is the alternative approach to mastering dynamic programming that the video advocates?',
      options: [
        'Memorise the ten most common DP algorithms and apply them to every problem',
        'Recognise the small set of underlying DP patterns (linear, grid, interval, knapsack variants) — because most DP problems are variations of these patterns, pattern recognition is more valuable than memorising individual solutions',
        'Focus only on memoisation, since tabulation is an advanced optimisation not needed in interviews',
        'Learn one DP problem per day for 30 days to build intuition through volume'
      ],
      correctIndex: 1,
      explanation: 'The video explicitly states this as its central thesis. The presenter argues that trying to memorise individual DP solutions is the wrong approach — there are too many problems. Instead, once you can recognise the structural pattern a problem fits (e.g., "this is a 1D linear DP where state is the index", or "this is a 0/1 knapsack variant"), the solution structure follows. The animations are designed to build this visual pattern recognition rather than recipe-following.'
    },
    {
      question: 'A senior backend engineer reviewing a microservices migration notices that three new services all read and write to the same database schema. Which fundamental microservices principle does this violate, and what risk does it introduce?',
      options: [
        'It violates the single responsibility principle — each service should expose exactly one endpoint',
        'It violates service data ownership — each service must own its data exclusively. Sharing a database creates tight coupling: changes to the schema require coordinating all three services simultaneously, defeating the independent deployability that microservices are supposed to provide',
        'It violates the RESTful API principle — microservices should communicate only over HTTP, not through a database',
        'It violates the statelessness principle — services should store state in memory, not in a database'
      ],
      correctIndex: 1,
      explanation: 'Service data ownership is one of the foundational constraints of microservices: each service must own its own data store and be the only writer to that store. When services share a database schema, a schema change in one service can break the others — you have to deploy all services together, which means they are not independently deployable. This is the "distributed monolith" anti-pattern: all the operational complexity of microservices with none of the deployment independence. The fix is to give each service its own schema (or database) and define explicit API contracts for data that needs to cross service boundaries.'
    },
    {
      question: 'What is the key difference between database sharding and database replication?',
      options: [
        'Sharding splits data across multiple nodes by a shard key to scale writes; replication copies data to read-only replicas to scale reads',
        'Sharding encrypts data before storage; replication compresses it to reduce storage costs',
        'Sharding is a backup strategy for disaster recovery; replication is for distributing load to geographically close users',
        'Sharding uses synchronous writes; replication uses asynchronous writes — they are the same technique with different consistency guarantees'
      ],
      correctIndex: 0,
      explanation: 'Sharding distributes different rows of data across multiple nodes using a shard key — it scales write throughput because each shard handles a subset of writes. Replication copies the same data to read-only replicas — it scales read throughput. These are two distinct and complementary strategies.'
    },
    {
      question: 'Why are message queues more than just a performance optimisation in distributed systems?',
      options: [
        'Queues decouple the rate of production from the rate of consumption, acting as a resilience buffer that absorbs spikes and prevents cascading failure when a downstream service is slow or unavailable',
        'Queues provide guaranteed message ordering across all consumers, removing the need for distributed locking',
        'Queues encrypt messages in transit, making them the only safe communication channel between microservices',
        'Queues replace the need for a database by persisting all application state as a stream of immutable messages'
      ],
      correctIndex: 0,
      explanation: 'A message queue decouples the producer from the consumer in both time and rate. If the consuming service goes down, the queue holds messages until it recovers. If a traffic spike occurs, the queue absorbs the burst rather than overwhelming the downstream service — this is a resilience mechanism, not just a throughput one.'
    },
    {
      question: 'What are the "three pillars of observability" in a production backend system?',
      options: [
        'Logs (discrete events), metrics (aggregated measurements over time), and traces (end-to-end request paths across services)',
        'CPU usage, memory usage, and disk I/O — the three resources that determine system health',
        'Unit tests, integration tests, and end-to-end tests — the three levels that ensure code correctness',
        'Authentication, authorisation, and encryption — the three controls that secure a production system'
      ],
      correctIndex: 0,
      explanation: 'Observability relies on three complementary signals. Logs record discrete events with full context (what happened). Metrics aggregate numerical measurements over time (how much is happening). Traces follow a single request across multiple services (where time is spent). Together, they allow engineers to diagnose issues they did not anticipate — the defining characteristic of an observable system versus one that is merely monitored.'
    },
    {
      question: 'A production service experiences intermittent 5-second latency spikes that do not appear in unit or integration tests. What system design concept most likely explains why the spikes only appear in production?',
      options: [
        'Tail latency — the slowest percentiles (p99, p99.9) are caused by garbage collection pauses, network retries, or cache misses that are invisible in average-based metrics and low-traffic test environments',
        'The test environment uses a different programming language runtime, so performance characteristics differ fundamentally',
        'The spikes are caused by DNS resolution, which only happens in production environments with public-facing domains',
        'The production database is larger, so every query is proportionally slower regardless of indexing or caching'
      ],
      correctIndex: 0,
      explanation: 'Tail latency (high-percentile response times) is a production-specific phenomenon. At low traffic in test environments, garbage collection pauses, cold caches, network retries, and resource contention are rare or absent. At production scale, these events become statistically certain for some fraction of requests. Monitoring p50 (median) alone hides these spikes — engineers must track p99 and p99.9 to detect them.'
    },
  ],
}
