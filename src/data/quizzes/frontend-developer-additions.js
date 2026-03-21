export const additions = {
  beginner: [
    {
      question: 'According to the "HTML in 100 Seconds" video, what was the primary reason Tim Berners-Lee created HTML?',
      options: [
        'To build a programming language that could run in browsers',
        'To create a publishing language for displaying content within his newly invented web browser',
        'To replace existing database query languages with a simpler syntax',
        'To provide a way to style text documents for print media'
      ],
      correctIndex: 1,
      explanation: 'The video explains that Berners-Lee had just invented the world\'s first web browser at CERN in 1989 and needed a publishing language to display content within it. He based HTML on SGML, using opening and closing tags to give meaning to unorganised text.'
    },
    {
      question: 'In the "JavaScript in 100 Seconds" video, Fireship describes JavaScript as a "single-threaded language with a non-blocking event loop." What practical benefit does this event loop provide?',
      options: [
        'It allows JavaScript to run on multiple CPU cores simultaneously',
        'It enables JavaScript to queue I/O-intensive work in the background without blocking the main thread',
        'It prevents JavaScript from executing more than one function at a time, making it safer',
        'It automatically distributes HTTP requests across multiple servers'
      ],
      correctIndex: 1,
      explanation: 'The video explains that despite being single-threaded, JavaScript is excellent at handling I/O-intensive jobs because the non-blocking event loop can queue work in the background — such as fetching data or reading files — without blocking the main thread from executing other code.'
    },
    {
      question: 'Kevin Powell\'s "Learn flexbox the easy way" video explains that writing `flex: 1` on flex children produces equal-width columns. Which three CSS properties does `flex: 1` actually set, and what makes the columns equal?',
      options: [
        'flex-direction, flex-wrap, and flex-grow; items grow in the same direction',
        'flex-grow: 1, flex-shrink: 1, and flex-basis: 0; starting from zero, all items grow equally into available space',
        'flex-grow: 1, align-items: stretch, and justify-content: space-evenly; the parent distributes space evenly',
        'flex-grow: 1, flex-shrink: 0, and flex-basis: auto; items keep their natural size and share leftover space'
      ],
      correctIndex: 1,
      explanation: 'The video explains that `flex: 1` is shorthand for flex-grow: 1, flex-shrink: 1, and flex-basis: 0. Setting flex-basis to 0 (rather than the default auto) means all items start from the same zero baseline. With flex-grow: 1, each item then grows by an equal share of the available space, producing equal-width columns regardless of their content.'
    },
  ],
  mid: [
    {
      question: 'According to the "Every Popular API Style Explained" video, what core problem did Facebook build GraphQL to solve, and what trade-off does that solution introduce?',
      options: [
        'Slow XML parsing in SOAP APIs; GraphQL solves this by using binary protocol buffers, but they are harder to read',
        'REST\'s over-fetching and under-fetching; GraphQL lets clients specify exactly what they need, but shifts complexity to the server to limit and manage queries',
        'WebSocket connection overhead; GraphQL maintains persistent connections, but this uses more server memory',
        'HTTP request latency; GraphQL batches all requests into one, but this increases response payload size'
      ],
      correctIndex: 1,
      explanation: 'The video explains that REST returns a fixed data shape per endpoint, forcing clients to either receive too much data (over-fetching) or make multiple requests (under-fetching). GraphQL lets the client specify exactly which fields it wants in a single request. The trade-off is that the server must carefully limit query depth and field counts to prevent clients from accidentally or intentionally overloading it — client freedom equals server responsibility.'
    },
    {
      question: 'The NeetCode "System Design Concepts" video explains horizontal vs vertical scaling. Which statement correctly describes why horizontal scaling is generally preferred for large-scale applications?',
      options: [
        'Horizontal scaling upgrades the hardware of a single server, which is simpler to manage than multiple servers',
        'Horizontal scaling adds replica servers that each handle a subset of requests, enabling near-infinite scale and adding redundancy so no single server failure brings down the system',
        'Horizontal scaling requires fewer load balancers than vertical scaling, reducing infrastructure cost',
        'Horizontal scaling compresses data into binary format to reduce the amount of memory each server needs'
      ],
      correctIndex: 1,
      explanation: 'The video contrasts vertical scaling (adding more RAM/CPU to one machine — limited and has a single point of failure) with horizontal scaling (adding replica servers). Horizontal scaling is more powerful because it can scale almost infinitely using commodity hardware, and it eliminates the single point of failure: if one server goes down, the others continue to fulfil requests.'
    },
    {
      question: 'In the "Every Popular API Style Explained" video, WebSockets are described as different from all other HTTP-based API styles. What is the key architectural difference, and which use cases does it enable?',
      options: [
        'WebSockets use binary encoding rather than JSON, making them faster for large payloads',
        'WebSockets open a persistent two-way connection so both client and server can send messages at any time, enabling live chat, multiplayer games, and real-time dashboards',
        'WebSockets reverse the client-server model so the server initiates all requests, like a webhook but with acknowledgement',
        'WebSockets cache API responses in the browser, eliminating the need for repeated HTTP requests'
      ],
      correctIndex: 1,
      explanation: 'Traditional HTTP is request-response: the client asks, the server answers, and the connection closes. WebSockets change this by opening a persistent two-way (bidirectional) connection. Once connected, either side can send messages at any moment without a new request. This powers real-time experiences — live chat apps, multiplayer games, collaborative editors, and live dashboards — that would require constant polling over regular HTTP.'
    },
  ],
  senior: [
    {
      question: 'The "Design APIs Like a Senior Engineer" video emphasises consistency as the most valuable property of an API. From a frontend senior\'s perspective, which of the following best illustrates the cost of API inconsistency?',
      options: [
        'Inconsistent APIs force the frontend to use GraphQL instead of REST, which requires additional client libraries',
        'Inconsistent error response shapes mean the frontend cannot handle errors generically — each endpoint needs custom error-handling logic, increasing complexity and the risk of user-facing failures going unhandled',
        'Inconsistent naming conventions make API documentation harder to write, slowing down backend development',
        'Inconsistent pagination styles require the frontend to support multiple rendering frameworks simultaneously'
      ],
      correctIndex: 1,
      explanation: 'When error responses have different shapes across endpoints (some use `message`, others use `error`, others return a string), the frontend cannot write a single error handler. Each integration point needs its own logic, which means more code, more testing, and higher risk that a new endpoint\'s error format goes unhandled in production. Consistent contracts are a force multiplier for the entire frontend codebase.'
    },
    {
      question: 'When applying Cumulative Layout Shift (CLS) knowledge to a production frontend, which of the following changes would most directly reduce CLS for a page that loads images from an external CDN?',
      options: [
        'Adding `loading="lazy"` to all images so they load after the initial render',
        'Serving images in WebP format to reduce file size and download time',
        'Adding explicit `width` and `height` attributes to all image elements so the browser reserves the correct space before the image loads',
        'Adding `fetchpriority="high"` to the hero image to make it load before other resources'
      ],
      correctIndex: 2,
      explanation: 'CLS measures unexpected layout shifts caused by elements moving after they load. When an image has no declared dimensions, the browser allocates zero space until the file arrives, then expands the layout — shifting content below it. Adding explicit `width` and `height` attributes (or equivalent via CSS aspect-ratio) tells the browser exactly how much space to reserve, preventing the shift entirely. The other options improve load speed or LCP but do not address the layout reservation problem.'
    },
    {
      question: 'A senior frontend developer is reviewing a proposed micro-frontend architecture for a team of eight engineers maintaining a single customer-facing application. What is the strongest argument against adopting micro-frontends in this context?',
      options: [
        'Micro-frontends cannot share a CSS design system, so each team would need to build their own component library',
        'Micro-frontends require all teams to use the same JavaScript framework, which eliminates technology flexibility',
        'Micro-frontends solve an organisational problem — independent deployment across large teams — not a technical one; for a small team on one application the complexity of runtime composition, shared dependency management, and cross-team contracts far outweighs the benefits',
        'Micro-frontends have poor browser support and require polyfills that increase bundle size significantly'
      ],
      correctIndex: 2,
      explanation: 'Micro-frontends are an architectural response to organisational scale: when many independent teams need to deploy their pieces of a UI without coordinating releases. For a single team of eight maintaining one application, feature-based folder structure achieves code separation without the operational overhead of runtime composition, independent deployment pipelines, shared dependency versioning conflicts, and the need for a shell application to orchestrate everything. Adopting micro-frontends here would add complexity without solving a real problem the team has.'
    },
  ],
}
