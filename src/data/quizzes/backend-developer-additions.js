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
  ],
}
