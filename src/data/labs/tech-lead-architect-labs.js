export const labs = [
  // ============================================================
  // tl-lab-1 — System Design Review (from interactiveLabs.js)
  // ============================================================
  {
    id: 'tl-lab-1',
    roleId: 'tech-lead-architect',
    level: 'beginner',
    title: 'System Design Review',
    description: 'Practice structured system design by defining requirements, components, data flow, and trade-offs.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before conducting a system design review, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Gather Requirements',
        instruction: 'Create a structured requirements document for a URL shortener service. Separate functional and non-functional requirements.',
        starterCode: `# System Design — Step 2: Requirements Template

def gather_requirements(system_name):
    """Create a structured requirements document.

    Returns a dict with:
    - functional: list of functional requirements
    - non_functional: list of NFRs (performance, scale, availability)
    - constraints: known constraints
    - assumptions: assumptions we're making
    """
    # TODO: Fill in requirements for a URL shortener service
    return {
        "system": system_name,
        "functional": [
            # TODO: List 5+ functional requirements
            # e.g., "Given a long URL, generate a short URL"
        ],
        "non_functional": [
            # TODO: List 4+ non-functional requirements
            # e.g., "p99 latency under 100ms for redirects"
        ],
        "constraints": [
            # TODO: List constraints
        ],
        "assumptions": [
            # TODO: List assumptions
        ],
    }

reqs = gather_requirements("URL Shortener")
for section, items in reqs.items():
    if isinstance(items, list):
        print(f"\\n{section.upper()}:")
        for item in items:
            print(f"  - {item}")`,
        hints: [
          'Functional: create short URL, redirect, custom aliases, expiration, analytics',
          'Non-functional: latency, availability (99.9%), read-heavy ratio (100:1)',
          'Constraints: short URLs should be 7 chars max, no offensive words'
        ],
        expectedOutput: `FUNCTIONAL:
  - Given a long URL, generate a unique short URL
  - Redirect short URL to original URL
  - Allow custom aliases
  - Track click analytics
  - Support URL expiration

NON_FUNCTIONAL:
  - p99 redirect latency < 100ms
  - 99.9% availability
  - Support 100M URLs, 10B redirects/month
  ...`,
        solution: `def gather_requirements(system_name):
    return {
        "system": system_name,
        "functional": [
            "Given a long URL, generate a unique short URL (7 chars)",
            "Redirect short URL to the original long URL",
            "Allow users to specify custom short aliases",
            "Track click analytics (count, referrer, geography)",
            "Support URL expiration (TTL)",
            "Provide API for programmatic access",
        ],
        "non_functional": [
            "p99 redirect latency under 100ms",
            "99.9% availability (8.7 hours downtime/year max)",
            "Support 100M URLs stored, 10B redirects per month",
            "Read-to-write ratio approximately 100:1",
            "Short URLs should be unguessable (no sequential IDs)",
        ],
        "constraints": [
            "Short URL max 7 characters (base62 encoding)",
            "No offensive words in generated URLs",
            "HTTPS only for all endpoints",
        ],
        "assumptions": [
            "Average URL length is 200 characters",
            "Storage per URL record ~500 bytes (URL + metadata)",
            "Total storage: 100M * 500B = ~50GB",
            "Read QPS: ~3,800 (10B / 30 days / 86400 seconds)",
        ],
    }

reqs = gather_requirements("URL Shortener")
for section, items in reqs.items():
    if isinstance(items, list):
        print(f"\\n{section.upper()}:")
        for item in items:
            print(f"  - {item}")`
      },
      {
        title: 'Step 3: Design Components',
        instruction: 'Define the high-level system components, their responsibilities, and how they communicate.',
        starterCode: `# System Design — Step 3: Component Design

def design_components():
    """Define system components for the URL shortener.

    For each component, specify:
    - name: Component name
    - responsibility: What it does
    - technology: Suggested tech choice
    - interfaces: APIs it exposes or consumes
    """
    # TODO: Define 5+ components
    components = []

    # TODO: Define communication patterns between components
    communications = []

    return {"components": components, "communications": communications}

design = design_components()
print("=== Components ===")
for c in design["components"]:
    print(f"  [{c['name']}] — {c['responsibility']}")
    print(f"    Tech: {c['technology']}")
print("\\n=== Communications ===")
for comm in design["communications"]:
    print(f"  {comm['from']} → {comm['to']}: {comm['protocol']}")`,
        hints: [
          'Components: API Gateway, URL Service, Redirect Service, Analytics Service, Cache, Database',
          'Technology choices: Express/FastAPI, Redis, PostgreSQL, Kafka',
          'Communications: REST between services, pub/sub for analytics, cache reads for redirects'
        ],
        expectedOutput: `=== Components ===
  [API Gateway] — Route requests, rate limiting, auth
    Tech: Nginx / Kong
  [URL Service] — Create and manage short URLs
    Tech: Node.js / FastAPI
  [Redirect Service] — Handle redirects with cache
    Tech: Node.js + Redis
  ...`,
        solution: `def design_components():
    components = [
        {
            "name": "API Gateway",
            "responsibility": "Route requests, rate limiting, authentication, SSL termination",
            "technology": "Nginx or Kong",
            "interfaces": ["POST /api/shorten", "GET /:shortCode", "GET /api/stats/:shortCode"]
        },
        {
            "name": "URL Service",
            "responsibility": "Generate short URLs, validate custom aliases, manage CRUD operations",
            "technology": "Node.js with Express or Python FastAPI",
            "interfaces": ["createShortUrl()", "getUrl()", "deleteUrl()"]
        },
        {
            "name": "Redirect Service",
            "responsibility": "Resolve short codes to long URLs, serve 301/302 redirects",
            "technology": "Node.js + Redis cache",
            "interfaces": ["resolve(shortCode) → longUrl"]
        },
        {
            "name": "Analytics Service",
            "responsibility": "Track clicks, aggregate stats, serve analytics dashboards",
            "technology": "Python + ClickHouse",
            "interfaces": ["recordClick()", "getStats()"]
        },
        {
            "name": "Cache Layer",
            "responsibility": "Cache hot URLs for fast redirect lookups",
            "technology": "Redis Cluster",
            "interfaces": ["get(key)", "set(key, value, ttl)"]
        },
        {
            "name": "Database",
            "responsibility": "Persistent storage for URL mappings and user data",
            "technology": "PostgreSQL with read replicas",
            "interfaces": ["SQL queries via connection pool"]
        },
    ]

    communications = [
        {"from": "API Gateway", "to": "URL Service", "protocol": "REST/HTTP"},
        {"from": "API Gateway", "to": "Redirect Service", "protocol": "REST/HTTP"},
        {"from": "Redirect Service", "to": "Cache Layer", "protocol": "Redis protocol"},
        {"from": "Redirect Service", "to": "Database", "protocol": "SQL"},
        {"from": "Redirect Service", "to": "Analytics Service", "protocol": "Kafka (async)"},
        {"from": "URL Service", "to": "Database", "protocol": "SQL"},
        {"from": "URL Service", "to": "Cache Layer", "protocol": "Redis protocol"},
    ]

    return {"components": components, "communications": communications}

design = design_components()
print("=== Components ===")
for c in design["components"]:
    print(f"  [{c['name']}] — {c['responsibility']}")
    print(f"    Tech: {c['technology']}")
print("\\n=== Communications ===")
for comm in design["communications"]:
    print(f"  {comm['from']} → {comm['to']}: {comm['protocol']}")`
      }
    ]
  },

  // ============================================================
  // tl-lab-2 — System Design Template (converted from tla-1)
  // ============================================================
  {
    id: 'tl-lab-2',
    roleId: 'tech-lead-architect',
    level: 'beginner',
    title: 'System Design Document Builder',
    description: 'Build a reusable system design document programmatically — capturing requirements, components, data flow, capacity estimations, and trade-offs in a structured, reviewable format.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a system design document generator, ensure your JavaScript environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ and npm. This lab uses only JavaScript built-in features — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to confirm Node.js 20+',
          'Test: `node -e "console.log(\'Node.js ready\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nNode.js ready',
        solution: null
      },
      {
        title: 'Step 2: Model the System Design Class',
        instruction: `WHY: Before writing code, architects must structure their thinking. A SystemDesign class gives you a repeatable, reviewable template that forces explicit decisions about requirements, components, data flow, and trade-offs.

WHAT: Create a SystemDesign class with builder methods for each section of a design doc: functional requirements, non-functional requirements, components, data flow connections, trade-off analysis, and capacity estimations.

HOW: Use the method-chaining (fluent) pattern so callers can build a complete design in a readable sequence. Each method should push to an internal array and return \`this\`.`,
        starterCode: `// System Design Document Builder
// Goal: Create a reusable class for documenting system designs.

class SystemDesign {
  constructor(name, author) {
    this.name = name;
    this.author = author;
    this.createdAt = new Date().toISOString();
    this.requirements = { functional: [], nonFunctional: [] };
    this.components = [];
    this.dataFlow = [];
    this.tradeOffs = [];
    this.estimations = {};
  }

  // TODO: Add addFunctionalRequirement(requirement) — returns this
  // TODO: Add addNonFunctionalRequirement(requirement, target) — returns this
  // TODO: Add addComponent(name, responsibility, technology) — returns this
  // TODO: Add addDataFlow(from, to, protocol, description) — returns this
  // TODO: Add addTradeOff(decision, pros, cons) — returns this
  //   pros and cons are arrays of strings
  // TODO: Add setEstimations({ dailyActiveUsers, peakRPS, storageGB, bandwidthGBPerDay }) — returns this

  generateSummary() {
    // TODO: Build and return a multi-line string with all sections
    // Format: header, then each section with its items
    return 'Not implemented';
  }
}

// Test: design a URL Shortener
const design = new SystemDesign('URL Shortener Service', 'Tech Lead');
// Chain your calls here, then:
console.log(design.generateSummary());`,
        hints: [
          'Each add* method pushes an object to the matching array, then returns this for chaining',
          'generateSummary() should iterate each array and format human-readable lines',
          'For capacity: only render that section if estimations.dailyActiveUsers is defined'
        ],
        expectedOutput: `============================================================
SYSTEM DESIGN: URL Shortener Service
Author: Tech Lead | Date: 2025-01-15
============================================================

FUNCTIONAL REQUIREMENTS:
  1. Shorten a long URL to a unique short URL
  2. Redirect short URL to the original URL
  3. Track click analytics per short URL

NON-FUNCTIONAL REQUIREMENTS:
  - Latency: p99 < 100ms for redirects
  - Availability: 99.99% uptime

COMPONENTS:
  [API Gateway] Rate limiting, auth, routing (Tech: Nginx / Kong)
  [Shortener Service] Generate and resolve short codes (Tech: Node.js)

DATA FLOW:
  Client --(HTTPS)--> API Gateway: Short URL creation or redirect request

TRADE-OFF ANALYSIS:
  Decision: SQL vs NoSQL for storage
    Pros: ACID guarantees, Mature tooling
    Cons: Horizontal scaling is harder

CAPACITY ESTIMATIONS:
  DAU: 1,000,000
  Peak RPS: 5,000
  Storage: 50 GB
  Bandwidth: 10 GB/day`,
        solution: `class SystemDesign {
  constructor(name, author) {
    this.name = name;
    this.author = author;
    this.createdAt = new Date().toISOString();
    this.requirements = { functional: [], nonFunctional: [] };
    this.components = [];
    this.dataFlow = [];
    this.tradeOffs = [];
    this.estimations = {};
  }

  addFunctionalRequirement(requirement) {
    this.requirements.functional.push(requirement);
    return this;
  }

  addNonFunctionalRequirement(requirement, target) {
    this.requirements.nonFunctional.push({ requirement, target });
    return this;
  }

  addComponent(name, responsibility, technology) {
    this.components.push({ name, responsibility, technology });
    return this;
  }

  addDataFlow(from, to, protocol, description) {
    this.dataFlow.push({ from, to, protocol, description });
    return this;
  }

  addTradeOff(decision, pros, cons) {
    this.tradeOffs.push({ decision, pros, cons });
    return this;
  }

  setEstimations({ dailyActiveUsers, peakRPS, storageGB, bandwidthGBPerDay }) {
    this.estimations = { dailyActiveUsers, peakRPS, storageGB, bandwidthGBPerDay };
    return this;
  }

  generateSummary() {
    const lines = [];
    lines.push('='.repeat(60));
    lines.push(\`SYSTEM DESIGN: \${this.name}\`);
    lines.push(\`Author: \${this.author} | Date: \${this.createdAt.split('T')[0]}\`);
    lines.push('='.repeat(60));

    lines.push('\\nFUNCTIONAL REQUIREMENTS:');
    this.requirements.functional.forEach((r, i) => lines.push(\`  \${i + 1}. \${r}\`));

    lines.push('\\nNON-FUNCTIONAL REQUIREMENTS:');
    this.requirements.nonFunctional.forEach(r =>
      lines.push(\`  - \${r.requirement}: \${r.target}\`)
    );

    lines.push('\\nCOMPONENTS:');
    this.components.forEach(c =>
      lines.push(\`  [\${c.name}] \${c.responsibility} (Tech: \${c.technology})\`)
    );

    lines.push('\\nDATA FLOW:');
    this.dataFlow.forEach(f =>
      lines.push(\`  \${f.from} --(\${f.protocol})--> \${f.to}: \${f.description}\`)
    );

    lines.push('\\nTRADE-OFF ANALYSIS:');
    this.tradeOffs.forEach(t => {
      lines.push(\`  Decision: \${t.decision}\`);
      lines.push(\`    Pros: \${t.pros.join(', ')}\`);
      lines.push(\`    Cons: \${t.cons.join(', ')}\`);
    });

    if (this.estimations.dailyActiveUsers) {
      lines.push('\\nCAPACITY ESTIMATIONS:');
      lines.push(\`  DAU: \${this.estimations.dailyActiveUsers.toLocaleString()}\`);
      lines.push(\`  Peak RPS: \${this.estimations.peakRPS.toLocaleString()}\`);
      lines.push(\`  Storage: \${this.estimations.storageGB} GB\`);
      lines.push(\`  Bandwidth: \${this.estimations.bandwidthGBPerDay} GB/day\`);
    }

    return lines.join('\\n');
  }
}

const design = new SystemDesign('URL Shortener Service', 'Tech Lead');

design
  .addFunctionalRequirement('Shorten a long URL to a unique short URL')
  .addFunctionalRequirement('Redirect short URL to the original URL')
  .addFunctionalRequirement('Track click analytics per short URL')
  .addNonFunctionalRequirement('Latency', 'p99 < 100ms for redirects')
  .addNonFunctionalRequirement('Availability', '99.99% uptime')
  .addComponent('API Gateway', 'Rate limiting, auth, routing', 'Nginx / Kong')
  .addComponent('Shortener Service', 'Generate and resolve short codes', 'Node.js')
  .addComponent('Database', 'Store URL mappings', 'PostgreSQL + Redis cache')
  .addComponent('Analytics Service', 'Record and aggregate click events', 'Kafka + ClickHouse')
  .addDataFlow('Client', 'API Gateway', 'HTTPS', 'Short URL creation or redirect request')
  .addDataFlow('API Gateway', 'Shortener Service', 'gRPC', 'Forward validated request')
  .addDataFlow('Shortener Service', 'Database', 'SQL/Redis', 'Read/write URL mappings')
  .addTradeOff('SQL vs NoSQL for storage', ['ACID guarantees', 'Mature tooling'], ['Horizontal scaling is harder'])
  .setEstimations({ dailyActiveUsers: 1000000, peakRPS: 5000, storageGB: 50, bandwidthGBPerDay: 10 });

console.log(design.generateSummary());`
      },
      {
        title: 'Step 3: Add Mermaid Diagram Generation',
        instruction: `WHY: Architecture documents age quickly when diagrams live in separate tools. Generating Mermaid syntax from your data model keeps diagrams in sync with the code and lets you version-control them.

WHAT: Add a generateMermaidDiagram() method to SystemDesign that produces a valid Mermaid flowchart string from the dataFlow array.

HOW: Mermaid flowchart syntax starts with \`flowchart LR\`, then each edge is written as \`NodeA -->|label| NodeB\`. Node names with spaces need to be quoted: \`["API Gateway"]\`. Return the full diagram string.`,
        starterCode: `// Extend your SystemDesign class with Mermaid output.
// Paste your completed class from Step 2 here, then add the method below.

// Inside SystemDesign, add:
generateMermaidDiagram() {
  // TODO: Return a Mermaid flowchart string
  // Start with: 'flowchart LR\\n'
  // For each dataFlow entry, emit a line:
  //   NodeA["Node A"] -->|protocol| NodeB["Node B"]
  // Handle node names with spaces by wrapping in ["..."]
  return 'Not implemented';
}

// Then call:
const design = new SystemDesign('URL Shortener Service', 'Tech Lead');
design
  .addDataFlow('Client', 'API Gateway', 'HTTPS', 'Incoming request')
  .addDataFlow('API Gateway', 'Shortener Service', 'gRPC', 'Validated request')
  .addDataFlow('Shortener Service', 'Redis Cache', 'Redis', 'Cache lookup')
  .addDataFlow('Shortener Service', 'PostgreSQL', 'SQL', 'Persistent read/write')
  .addDataFlow('Shortener Service', 'Kafka', 'Event', 'Publish click event')
  .addDataFlow('Kafka', 'Analytics Service', 'Consumer', 'Process click event');

console.log(design.generateMermaidDiagram());`,
        hints: [
          'Safe node IDs: replace spaces with underscores and strip special chars: name.replace(/\\s+/g, "_").replace(/[^\\w]/g, "")',
          'Edge format: \`  NodeA["Node A"] -->|protocol| NodeB["Node B"]\`',
          'Collect unique nodes first, then emit edges — avoids duplicate node declarations'
        ],
        expectedOutput: `flowchart LR
  Client["Client"] -->|HTTPS| API_Gateway["API Gateway"]
  API_Gateway["API Gateway"] -->|gRPC| Shortener_Service["Shortener Service"]
  Shortener_Service["Shortener Service"] -->|Redis| Redis_Cache["Redis Cache"]
  Shortener_Service["Shortener Service"] -->|SQL| PostgreSQL["PostgreSQL"]
  Shortener_Service["Shortener Service"] -->|Event| Kafka["Kafka"]
  Kafka["Kafka"] -->|Consumer| Analytics_Service["Analytics Service"]`,
        solution: `generateMermaidDiagram() {
  const toId = (name) => name.replace(/\\s+/g, '_').replace(/[^\\w]/g, '');
  const lines = ['flowchart LR'];
  this.dataFlow.forEach(f => {
    const fromId = toId(f.from);
    const toId2 = toId(f.to);
    lines.push(\`  \${fromId}["\${f.from}"] -->|\${f.protocol}| \${toId2}["\${f.to}"]\`);
  });
  return lines.join('\\n');
}`
      },
      {
        title: 'Step 4: Capacity Estimation Calculator',
        instruction: `WHY: Back-of-the-envelope capacity estimation is a core system design skill. Architects who can quickly derive storage, QPS, and bandwidth figures make better technology choices and avoid over- or under-engineering.

WHAT: Add a static calculateEstimations() method that derives all capacity figures from just three inputs: daily active users, average requests per user per day, and average payload size in bytes.

HOW: Derive peak RPS assuming 10% of traffic hits in 10% of the day (peak-hour factor ~10x average). Calculate storage from write percentage and retention days. Calculate bandwidth from total daily requests times payload.`,
        starterCode: `// Capacity Estimation Calculator
// Given high-level inputs, derive all key capacity figures.

class CapacityEstimator {
  /**
   * @param {number} dau - Daily active users
   * @param {number} requestsPerUserPerDay - Average requests per user
   * @param {number} payloadBytes - Average payload size per request in bytes
   * @param {number} writePercentage - Fraction of requests that are writes (0–1)
   * @param {number} retentionDays - How long data is retained
   */
  static calculate(dau, requestsPerUserPerDay, payloadBytes, writePercentage = 0.1, retentionDays = 365) {
    const totalDailyRequests = dau * requestsPerUserPerDay;

    // TODO: Calculate averageRPS (requests per second, daily average)
    const averageRPS = 0;

    // TODO: Calculate peakRPS (assume peak = 10x average)
    const peakRPS = 0;

    // TODO: Calculate dailyWriteRequests
    const dailyWriteRequests = 0;

    // TODO: Calculate storageBytesPerDay (writes * payload)
    const storageBytesPerDay = 0;

    // TODO: Calculate totalStorageGB (storageBytesPerDay * retentionDays / 1e9)
    const totalStorageGB = 0;

    // TODO: Calculate bandwidthGBPerDay (totalDailyRequests * payloadBytes / 1e9)
    const bandwidthGBPerDay = 0;

    return {
      dau,
      totalDailyRequests,
      averageRPS: Math.round(averageRPS),
      peakRPS: Math.round(peakRPS),
      dailyWriteRequests: Math.round(dailyWriteRequests),
      totalStorageGB: Math.round(totalStorageGB * 10) / 10,
      bandwidthGBPerDay: Math.round(bandwidthGBPerDay * 10) / 10
    };
  }

  static printReport(estimates) {
    console.log('=== Capacity Estimation ===');
    console.log(\`  DAU:                 \${estimates.dau.toLocaleString()}\`);
    console.log(\`  Total daily requests:\${estimates.totalDailyRequests.toLocaleString()}\`);
    console.log(\`  Average RPS:         \${estimates.averageRPS.toLocaleString()}\`);
    console.log(\`  Peak RPS (10x):      \${estimates.peakRPS.toLocaleString()}\`);
    console.log(\`  Daily writes:        \${estimates.dailyWriteRequests.toLocaleString()}\`);
    console.log(\`  Total storage:       \${estimates.totalStorageGB} GB\`);
    console.log(\`  Bandwidth/day:       \${estimates.bandwidthGBPerDay} GB/day\`);
  }
}

// URL Shortener: 10M DAU, 5 requests/day, 500B payload, 1% writes
const estimates = CapacityEstimator.calculate(10_000_000, 5, 500, 0.01, 365);
CapacityEstimator.printReport(estimates);`,
        hints: [
          'averageRPS = totalDailyRequests / 86400 (seconds in a day)',
          'peakRPS = averageRPS * 10 (assume 10x spike during peak hour)',
          'storageBytesPerDay = dailyWriteRequests * payloadBytes'
        ],
        expectedOutput: `=== Capacity Estimation ===
  DAU:                 10,000,000
  Total daily requests:50,000,000
  Average RPS:         579
  Peak RPS (10x):      5,787
  Daily writes:        500,000
  Total storage:       91.3 GB
  Bandwidth/day:       25 GB/day`,
        solution: `static calculate(dau, requestsPerUserPerDay, payloadBytes, writePercentage = 0.1, retentionDays = 365) {
  const totalDailyRequests = dau * requestsPerUserPerDay;
  const averageRPS = totalDailyRequests / 86400;
  const peakRPS = averageRPS * 10;
  const dailyWriteRequests = totalDailyRequests * writePercentage;
  const storageBytesPerDay = dailyWriteRequests * payloadBytes;
  const totalStorageGB = (storageBytesPerDay * retentionDays) / 1e9;
  const bandwidthGBPerDay = (totalDailyRequests * payloadBytes) / 1e9;

  return {
    dau,
    totalDailyRequests,
    averageRPS: Math.round(averageRPS),
    peakRPS: Math.round(peakRPS),
    dailyWriteRequests: Math.round(dailyWriteRequests),
    totalStorageGB: Math.round(totalStorageGB * 10) / 10,
    bandwidthGBPerDay: Math.round(bandwidthGBPerDay * 10) / 10
  };
}`
      },
      {
        title: 'Step 5: Complete Design with Trade-Off ADR',
        instruction: `WHY: A design document without recorded trade-offs is incomplete. Future engineers need to understand not just what was decided, but why alternatives were rejected. Combining your SystemDesign model with an inline ADR for the most significant decision closes the loop.

WHAT: Create a complete system design for the URL Shortener that includes all sections and finishes with a short inline ADR entry for the most impactful architectural decision (base62 ID generation strategy).

HOW: Use the SystemDesign class from Step 2. Add at least 3 functional requirements, 3 NFRs, 4 components, 4 data flow links, 2 trade-offs, and capacity estimations derived from Step 4 outputs. Then write a brief ADR comment below the generated summary.`,
        starterCode: `// Final step: produce a complete, publication-ready design document.
// Use your SystemDesign class and CapacityEstimator from previous steps.

// TODO: Instantiate SystemDesign for 'URL Shortener Service'
// TODO: Add 3+ functional requirements
// TODO: Add 3+ non-functional requirements (with specific targets)
// TODO: Add 4+ components
// TODO: Add 4+ data flow connections
// TODO: Add 2 trade-offs with clear pros/cons
// TODO: Set capacity estimations (use CapacityEstimator to derive them: 10M DAU, 5 req/user/day)
// TODO: Print the summary
// TODO: Print the Mermaid diagram

// Below the output, add an inline ADR comment:
// ADR-0001: ID Generation Strategy
//   Options: Hash (MD5/SHA), Counter + Base62, NanoID
//   Decision: Counter + Base62 with distributed ID service (Snowflake-style)
//   Reason: Avoids hash collisions without lookup, supports ~3.5 trillion URLs with 7 chars`,
        hints: [
          'Copy your working classes from Steps 2 and 4 into this file first',
          'NFR targets should be specific: "p99 < 50ms", "99.99% uptime (52 min downtime/year)", "10B redirects/month"',
          'For the ID generation ADR: hash approaches require DB lookup to detect collisions; counter + base62 avoids that at the cost of a coordination service'
        ],
        expectedOutput: `============================================================
SYSTEM DESIGN: URL Shortener Service
...all sections populated...
============================================================

flowchart LR
  Client["Client"] -->|HTTPS| API_Gateway["API Gateway"]
  ...

// ADR-0001: ID Generation Strategy
// Decision: Counter + Base62 with Snowflake-style distributed ID service
// Reason: No collision lookup needed; 62^7 = 3.5T unique IDs supports years of growth`,
        solution: `// Complete solution combining all previous steps
class SystemDesign { /* ... paste from Step 2 with generateMermaidDiagram from Step 3 */ }
class CapacityEstimator { /* ... paste from Step 4 */ }

const est = CapacityEstimator.calculate(10_000_000, 5, 500, 0.01, 365);

const design = new SystemDesign('URL Shortener Service', 'Tech Lead');
design
  .addFunctionalRequirement('Shorten a long URL to a globally unique 7-char code')
  .addFunctionalRequirement('Redirect short URL to origin with 301/302')
  .addFunctionalRequirement('Track click analytics (count, referrer, geo)')
  .addFunctionalRequirement('Support custom aliases and TTL expiration')
  .addNonFunctionalRequirement('Redirect latency', 'p99 < 50ms')
  .addNonFunctionalRequirement('Availability', '99.99% (52 min downtime/year)')
  .addNonFunctionalRequirement('Scale', '10B redirects/month, 100M stored URLs')
  .addComponent('API Gateway', 'Rate limiting, auth, SSL termination', 'Kong')
  .addComponent('ID Service', 'Distributed Snowflake-style ID generation', 'Go microservice')
  .addComponent('Shortener Service', 'Create/resolve short URLs', 'Node.js + Fastify')
  .addComponent('Redis Cache', 'Hot URL cache (LRU)', 'Redis Cluster')
  .addComponent('PostgreSQL', 'Persistent URL storage with read replicas', 'PostgreSQL 16')
  .addComponent('Analytics Service', 'Async click aggregation', 'Python + ClickHouse')
  .addDataFlow('Client', 'API Gateway', 'HTTPS', 'All inbound traffic')
  .addDataFlow('API Gateway', 'Shortener Service', 'gRPC', 'Validated request')
  .addDataFlow('Shortener Service', 'Redis Cache', 'Redis', 'Cache-first URL lookup')
  .addDataFlow('Shortener Service', 'PostgreSQL', 'SQL', 'Cache miss or write')
  .addDataFlow('Shortener Service', 'Kafka', 'Event', 'Publish click event async')
  .addDataFlow('Kafka', 'Analytics Service', 'Consumer', 'Process click events')
  .addTradeOff(
    'ID generation: Hash vs Counter+Base62',
    ['Counter+Base62: no collision lookup, predictable length', 'Snowflake IDs sortable by time'],
    ['Requires coordination service (SPOF risk)', 'Adds network hop for each write']
  )
  .addTradeOff(
    'Cache invalidation: TTL vs event-driven',
    ['TTL simple to implement', 'Event-driven always consistent'],
    ['TTL: stale data window', 'Event-driven: complexity of cache-busting events']
  )
  .setEstimations({
    dailyActiveUsers: est.dau,
    peakRPS: est.peakRPS,
    storageGB: est.totalStorageGB,
    bandwidthGBPerDay: est.bandwidthGBPerDay
  });

console.log(design.generateSummary());
console.log('\\n' + design.generateMermaidDiagram());

// ADR-0001: ID Generation Strategy
// Options: MD5 Hash, Sequential Counter + Base62, NanoID, Snowflake
// Decision: Snowflake-style distributed counter encoded as Base62
// Reason: 62^7 = 3.52 trillion unique IDs; no collision check DB lookup;
//         time-sortable IDs aid debugging; coordination service (etcd/ZK) provides HA`
      }
    ]
  },

  // ============================================================
  // tl-lab-3 — ADR Template Generator (converted from tla-2)
  // ============================================================
  {
    id: 'tl-lab-3',
    roleId: 'tech-lead-architect',
    level: 'beginner',
    title: 'Architecture Decision Records (ADR) Workshop',
    description: 'Learn to create, format, and manage Architecture Decision Records — the foundational practice for capturing why decisions were made, enabling future teams to understand and evolve the system with confidence.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building an ADR generator, ensure your JavaScript environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ and npm. This lab uses only JavaScript built-in features — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to confirm Node.js 20+',
          'Test: `node -e "console.log(\'Node.js ready\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nNode.js ready',
        solution: null
      },
      {
        title: 'Step 2: Build the ADR Generator Class',
        instruction: `WHY: Architecture Decision Records (ADRs) are the most effective way to onboard new engineers and prevent repeated debates. Without them, context lives only in Slack threads and engineers' memories.

WHAT: Build an ADRGenerator class that creates structured ADR objects, formats them as readable documents, and produces an index of all decisions.

HOW: Each ADR needs: a zero-padded sequential ID, title, date, status (Proposed | Accepted | Deprecated | Superseded), context (why this decision was needed), evaluated options with pros/cons, the chosen decision, and positive/negative consequences. The formatADR() method should produce a human-readable document string.`,
        starterCode: `// Architecture Decision Records Generator
// ADRs capture architectural decisions with full context so future
// engineers understand WHY, not just WHAT was decided.

class ADRGenerator {
  constructor(outputDir = './docs/adr') {
    this.outputDir = outputDir;
    this.decisions = [];
  }

  /**
   * Create a new ADR. Auto-assigns a zero-padded ID and today's date.
   * @param {{ title, context, options, decision, consequences, status }} params
   *   options: Array of { name, pros: string[], cons: string[] }
   *   consequences: { positive: string[], negative: string[] }
   *   status: 'Proposed' | 'Accepted' | 'Deprecated' | 'Superseded'
   */
  createADR({ title, context, options, decision, consequences, status = 'Proposed' }) {
    // TODO: Auto-assign ID (zero-padded, 4 digits, sequential)
    // TODO: Set today's date as YYYY-MM-DD
    // TODO: Build and push the ADR object
    // TODO: Return the created ADR
  }

  /**
   * Format an ADR as a readable multi-line string.
   */
  formatADR(adr) {
    // TODO: Return formatted string with all sections:
    // # ADR-NNNN: Title
    // Date | Status
    // ## Context
    // ## Options Considered (numbered, with pros/cons)
    // ## Decision
    // ## Consequences (Positive / Negative)
    return 'Not implemented';
  }

  /** Print all ADRs separated by dividers. */
  printAll() {
    this.decisions.forEach(adr => {
      console.log(this.formatADR(adr));
      console.log('='.repeat(60));
    });
  }

  /** Generate a markdown-style index table of all ADRs. */
  generateIndex() {
    // TODO: Return a markdown table string with columns: ID, Title, Date, Status
    return 'Not implemented';
  }
}

const generator = new ADRGenerator();
// TODO: Create two ADRs (see hints for content ideas)
generator.printAll();
console.log(generator.generateIndex());`,
        hints: [
          'ID: const paddedId = String(this.decisions.length + 1).padStart(4, "0")',
          'Date: new Date().toISOString().split("T")[0]',
          'Options loop: adr.options.forEach((opt, i) => { /* name, pros, cons */ })'
        ],
        expectedOutput: `# ADR-0001: Use PostgreSQL as primary database
Date: 2025-01-15  |  Status: Accepted

## Context
We need a relational database for our e-commerce platform...

## Options Considered
  1. PostgreSQL
     Pros: ACID compliant, Rich JSON support, Strong community
     Cons: Vertical scaling limits, Slightly higher memory usage
  2. MySQL
     ...

## Decision
We will use PostgreSQL 15+...

## Consequences
Positive:
  + Strong consistency for financial data
Negative:
  - Need to plan sharding strategy early

# Architecture Decision Records
| ID | Title | Date | Status |
|----|-------|------|--------|
| ADR-0001 | Use PostgreSQL as primary database | 2025-01-15 | Accepted |`,
        solution: `class ADRGenerator {
  constructor(outputDir = './docs/adr') {
    this.outputDir = outputDir;
    this.decisions = [];
  }

  createADR({ title, context, options, decision, consequences, status = 'Proposed' }) {
    const id = this.decisions.length + 1;
    const paddedId = String(id).padStart(4, '0');
    const date = new Date().toISOString().split('T')[0];
    const adr = { id: paddedId, title, date, status, context, options, decision, consequences };
    this.decisions.push(adr);
    return adr;
  }

  formatADR(adr) {
    const lines = [];
    lines.push(\`# ADR-\${adr.id}: \${adr.title}\`);
    lines.push(\`Date: \${adr.date}  |  Status: \${adr.status}\`);
    lines.push('');
    lines.push('## Context');
    lines.push(adr.context);
    lines.push('');
    lines.push('## Options Considered');
    adr.options.forEach((opt, i) => {
      lines.push(\`  \${i + 1}. \${opt.name}\`);
      lines.push(\`     Pros: \${opt.pros.join(', ')}\`);
      lines.push(\`     Cons: \${opt.cons.join(', ')}\`);
    });
    lines.push('');
    lines.push('## Decision');
    lines.push(adr.decision);
    lines.push('');
    lines.push('## Consequences');
    lines.push('Positive:');
    adr.consequences.positive.forEach(c => lines.push(\`  + \${c}\`));
    lines.push('Negative:');
    adr.consequences.negative.forEach(c => lines.push(\`  - \${c}\`));
    return lines.join('\\n');
  }

  printAll() {
    this.decisions.forEach(adr => {
      console.log(this.formatADR(adr));
      console.log('='.repeat(60));
    });
  }

  generateIndex() {
    const lines = ['# Architecture Decision Records\\n'];
    lines.push('| ID | Title | Date | Status |');
    lines.push('|----|-------|------|--------|');
    this.decisions.forEach(adr => {
      lines.push(\`| ADR-\${adr.id} | \${adr.title} | \${adr.date} | \${adr.status} |\`);
    });
    return lines.join('\\n');
  }
}`
      },
      {
        title: 'Step 3: Record Real Architectural Decisions',
        instruction: `WHY: The value of an ADR system is the decisions stored in it, not the tooling. Practice writing complete, honest ADRs by recording two real architectural decisions with nuanced trade-off analysis.

WHAT: Use your ADRGenerator to create two ADRs: one for the primary database choice (SQL vs NoSQL) and one for the messaging system choice (Kafka vs RabbitMQ). Both should reflect genuine trade-offs rather than post-hoc justifications.

HOW: For each ADR, write the context as a problem statement (not a solution description), list at least two real alternatives with honest pros/cons, state the decision with a reason tied to current constraints, and list measurable consequences.`,
        starterCode: `// Use your ADRGenerator class from Step 2.
// Goal: Write two complete, honest architectural ADRs.

const generator = new ADRGenerator();

// ADR 1: Database choice
generator.createADR({
  title: 'Use PostgreSQL as primary database',
  status: 'Accepted',
  context: \`TODO: Describe the problem — what does the system need,
    what are the scale/consistency requirements, and why can't you
    just pick any database?\`,
  options: [
    {
      name: 'PostgreSQL',
      pros: [/* TODO: 3 genuine pros */],
      cons: [/* TODO: 2 genuine cons */]
    },
    {
      name: 'MongoDB',
      pros: [/* TODO */],
      cons: [/* TODO */]
    },
    {
      name: 'MySQL',
      pros: [/* TODO */],
      cons: [/* TODO */]
    }
  ],
  decision: \`TODO: State what was chosen and the primary reason
    tied to the context (not a generic "it's better" statement)\`,
  consequences: {
    positive: [/* TODO: 3 specific positive outcomes */],
    negative: [/* TODO: 2 specific costs or risks */]
  }
});

// ADR 2: Messaging system
generator.createADR({
  // TODO: Fill out a complete ADR for Kafka vs RabbitMQ
  // Context: monolithic notification system is blocking the main thread
  // Options: Apache Kafka, RabbitMQ, AWS SQS
  title: 'TODO',
  status: 'Proposed',
  context: 'TODO',
  options: [],
  decision: 'TODO',
  consequences: { positive: [], negative: [] }
});

generator.printAll();
console.log('\\n' + generator.generateIndex());`,
        hints: [
          'Context tip: start with "Our system handles X at Y scale. We need Z guarantee. Currently we lack..."',
          'Kafka pros: replay, ordered partitions, handles millions of events/sec. Cons: complex ops, Zookeeper/KRaft setup',
          'RabbitMQ pros: simple routing, low latency, AMQP standard. Cons: no native replay, lower throughput ceiling'
        ],
        expectedOutput: `# ADR-0001: Use PostgreSQL as primary database
Date: 2025-01-15  |  Status: Accepted

## Context
Our e-commerce platform requires complex relational queries (orders,
inventory, payments), ACID transactions for financial data, and strong
consistency. We need a database the team knows well that can handle
our current 50K DAU with a path to 500K.
...
# ADR-0002: Adopt event-driven architecture for notifications
...
# Architecture Decision Records
| ID | Title | Date | Status |
| ADR-0001 | Use PostgreSQL as primary database | 2025-01-15 | Accepted |
| ADR-0002 | Adopt event-driven architecture for notifications | 2025-01-15 | Proposed |`,
        solution: `generator.createADR({
  title: 'Use PostgreSQL as primary database',
  status: 'Accepted',
  context: 'Our e-commerce platform requires ACID transactions for payments, complex JOINs across orders/inventory/users, and strong consistency. The team has deep PostgreSQL expertise. Current scale is 50K DAU with projections to 500K within 18 months.',
  options: [
    {
      name: 'PostgreSQL',
      pros: ['ACID compliant — critical for financial transactions', 'Rich JSONB support covers semi-structured product data', 'Strong community, mature tooling, team expertise'],
      cons: ['Horizontal write scaling requires sharding (complex)', 'Higher memory footprint vs MySQL at equivalent load']
    },
    {
      name: 'MongoDB',
      pros: ['Flexible schema for varied product attributes', 'Horizontal scaling via native sharding'],
      cons: ['No ACID across multiple documents until v4 (complex to use)', 'Eventual consistency concerns for payment records']
    },
    {
      name: 'MySQL',
      pros: ['Widely adopted, strong read performance', 'Lower memory usage'],
      cons: ['Weaker JSON support than PostgreSQL', 'Less extensible (no custom types, limited window functions)']
    }
  ],
  decision: 'We will use PostgreSQL 16 as our primary database. Its JSONB support handles flexible product attributes without sacrificing the ACID guarantees required for financial data. Team expertise reduces operational risk.',
  consequences: {
    positive: [
      'Strong consistency guarantees for all financial transactions',
      'JSONB covers product catalog flexibility without a separate document store',
      'Team can be productive immediately — no learning curve'
    ],
    negative: [
      'Must implement connection pooling (PgBouncer) before reaching 1K concurrent connections',
      'Sharding strategy must be designed before exceeding ~5TB data or 100K write TPS'
    ]
  }
});

generator.createADR({
  title: 'Adopt event-driven architecture for notifications',
  status: 'Proposed',
  context: 'Our monolithic notification system (email, SMS, push) executes synchronously in the main request thread. At 50K DAU this adds 200–800ms latency to order placement. At 500K DAU this will be a critical bottleneck.',
  options: [
    {
      name: 'Apache Kafka',
      pros: ['Handles millions of events/sec', 'Message replay for auditing and reprocessing', 'Durable, partitioned, ordered delivery'],
      cons: ['High operational complexity (KRaft/Zookeeper)', 'Steep learning curve — team has no Kafka experience']
    },
    {
      name: 'RabbitMQ',
      pros: ['Simple setup and operation', 'Flexible routing via exchanges', 'Lower latency than Kafka for small volumes'],
      cons: ['No native message replay', 'Lower throughput ceiling (~100K msg/sec)']
    },
    {
      name: 'AWS SQS',
      pros: ['Fully managed, zero ops burden', 'Scales automatically'],
      cons: ['Vendor lock-in', 'No ordering guarantee on standard queues', 'At-least-once delivery requires idempotent consumers']
    }
  ],
  decision: 'Use RabbitMQ for the notification service. Our projected volume (< 50K notifications/day) is well within RabbitMQ limits. Kafka complexity is not justified at current scale. This ADR should be revisited if daily notification volume exceeds 5M.',
  consequences: {
    positive: [
      'Notification processing fully decoupled from request thread',
      'API response time for order placement drops by 200–800ms',
      'New notification channels (WhatsApp, Slack) can subscribe without API changes'
    ],
    negative: [
      'Must implement dead-letter queues and retry logic for failed notifications',
      'Additional infrastructure component to monitor and maintain'
    ]
  }
});`
      },
      {
        title: 'Step 4: Implement ADR Lifecycle — Supersede and Deprecate',
        instruction: `WHY: Decisions evolve. A PostgreSQL choice made at 50K DAU may be superseded by a sharding strategy at 5M DAU. Without a formal supersession process, old ADRs mislead future engineers. Tracking the lineage of decisions is as important as recording them.

WHAT: Add two methods to ADRGenerator: supersede(oldId, newADR) which marks the old ADR as "Superseded by ADR-XXXX" and creates the new one with a back-reference, and deprecate(id, reason) which marks an ADR as Deprecated with a reason.

HOW: supersede() should call createADR() internally (so the new ADR gets a proper ID), then mutate the old ADR's status field to "Superseded by ADR-NNNN". deprecate() simply updates the status and appends the reason to the context.`,
        starterCode: `// Extend ADRGenerator with lifecycle management.
// Paste your class from Step 2, then add these methods.

// Inside ADRGenerator, add:

/**
 * Supersede an existing ADR with a new one.
 * @param {string} oldId - Zero-padded ID of the ADR to supersede (e.g., '0001')
 * @param {object} newADRParams - Same params as createADR()
 * @returns {{ old: ADR, new: ADR }}
 */
supersede(oldId, newADRParams) {
  // TODO: Find the old ADR by id
  // TODO: Create the new ADR (use this.createADR())
  // TODO: Mark old ADR status as \`Superseded by ADR-NNNN\`
  // TODO: Add to newADR.context: "Supersedes ADR-NNNN: [old title]"
  // TODO: Return { old, new: newADR }
}

/**
 * Mark an ADR as deprecated.
 * @param {string} id - Zero-padded ADR ID
 * @param {string} reason - Why it was deprecated
 */
deprecate(id, reason) {
  // TODO: Find ADR, set status to 'Deprecated', append reason to context
}

// Test it:
const generator = new ADRGenerator();

// Create original DB choice ADR
const dbADR = generator.createADR({
  title: 'Use PostgreSQL as primary database',
  status: 'Accepted',
  context: 'System at 50K DAU needs relational DB with ACID guarantees.',
  options: [
    { name: 'PostgreSQL', pros: ['ACID', 'JSON support'], cons: ['Hard to shard'] },
    { name: 'MongoDB', pros: ['Flexible schema'], cons: ['No cross-doc ACID'] }
  ],
  decision: 'Use PostgreSQL 16.',
  consequences: { positive: ['Strong consistency'], negative: ['Sharding complexity later'] }
});

// Two years later, supersede with a distributed strategy
generator.supersede('0001', {
  title: 'Adopt Citus for horizontally sharded PostgreSQL',
  status: 'Accepted',
  context: 'System has grown to 5M DAU. Single PostgreSQL node is at 80% write capacity.',
  options: [
    { name: 'Citus (distributed PostgreSQL)', pros: ['SQL compatibility', 'Automatic sharding'], cons: ['Operational complexity increase'] },
    { name: 'Migrate to CockroachDB', pros: ['True distributed SQL'], cons: ['Higher cost, team retraining'] }
  ],
  decision: 'Adopt Citus extension to shard PostgreSQL horizontally across 4 nodes.',
  consequences: { positive: ['10x write throughput'], negative: ['Cross-shard queries require careful design'] }
});

generator.printAll();
console.log(generator.generateIndex());`,
        hints: [
          'Find old ADR: const old = this.decisions.find(d => d.id === oldId)',
          'After createADR(), update: old.status = `Superseded by ADR-${newADR.id}`',
          'Prepend to new ADR context: newADR.context = `Supersedes ADR-${oldId}: ${old.title}.\\n` + newADR.context'
        ],
        expectedOutput: `# ADR-0001: Use PostgreSQL as primary database
Date: 2025-01-15  |  Status: Superseded by ADR-0002

...

# ADR-0002: Adopt Citus for horizontally sharded PostgreSQL
Date: 2025-01-15  |  Status: Accepted

## Context
Supersedes ADR-0001: Use PostgreSQL as primary database.
System has grown to 5M DAU...

# Architecture Decision Records
| ID | Title | Date | Status |
| ADR-0001 | Use PostgreSQL as primary database | 2025-01-15 | Superseded by ADR-0002 |
| ADR-0002 | Adopt Citus for horizontally sharded PostgreSQL | 2025-01-15 | Accepted |`,
        solution: `supersede(oldId, newADRParams) {
  const old = this.decisions.find(d => d.id === oldId);
  if (!old) throw new Error(\`ADR-\${oldId} not found\`);

  const newADR = this.createADR(newADRParams);
  old.status = \`Superseded by ADR-\${newADR.id}\`;
  newADR.context = \`Supersedes ADR-\${oldId}: \${old.title}.\\n\${newADR.context}\`;

  return { old, new: newADR };
}

deprecate(id, reason) {
  const adr = this.decisions.find(d => d.id === id);
  if (!adr) throw new Error(\`ADR-\${id} not found\`);
  adr.status = 'Deprecated';
  adr.context = adr.context + \`\\n\\nDEPRECATED: \${reason}\`;
  return adr;
}`
      }
    ]
  },

  // ============================================================
  // tl-lab-4 — Code Review Checklist Automation (converted from tla-3)
  // ============================================================
  {
    id: 'tl-lab-4',
    roleId: 'tech-lead-architect',
    level: 'mid',
    title: 'Automated Code Review Checklist System',
    description: 'Build a programmable code review system that enforces team standards consistently — covering general quality, security, testing, documentation, and performance — and produces scored approval recommendations.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building an automated code review system, ensure your JavaScript environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ and npm. This lab uses only JavaScript built-in features — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to confirm Node.js 20+',
          'Test: `node -e "console.log(\'Node.js ready\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nNode.js ready',
        solution: null
      },
      {
        title: 'Step 2: Build the Code Review Checker Engine',
        instruction: `WHY: Manual code reviews are inconsistent. Different reviewers catch different things. Automating the structural checklist frees reviewers to focus on logic and architecture, while ensuring the baseline is always checked.

WHAT: Build a CodeReviewChecker class that accepts PR metadata (title, description, changed files), supports registering named validator checks by category, runs all checks, and produces a categorized report with a pass/fail recommendation.

HOW: Each check is a function that receives the checker context and returns \`{ passed: boolean, note: string }\`. The engine runs all checks, groups results by category, calculates a score, and recommends APPROVE if score >= 80%.`,
        starterCode: `// Code Review Checker — enforce team standards automatically

class CodeReviewChecker {
  constructor(prTitle, prDescription, changedFiles) {
    this.prTitle = prTitle;
    this.prDescription = prDescription;
    this.changedFiles = changedFiles; // [{ path, additions, deletions }]
    this.checks = [];
    this.results = [];
  }

  /**
   * Register a named check in a category.
   * @param {string} category - e.g. 'general', 'security', 'testing'
   * @param {string} name - Human-readable check name
   * @param {function} validator - (ctx) => { passed: boolean, note: string }
   */
  addCheck(category, name, validator) {
    // TODO: Push to this.checks, return this for chaining
  }

  /**
   * Run all registered checks. Catches errors and marks them as failed.
   * @returns {Array} results array
   */
  runAll() {
    // TODO: Map this.checks, call each validator(this), handle errors
    // Each result: { category, name, passed, note }
    this.results = [];
    return this.results;
  }

  /**
   * Print a formatted, categorized report with final score and recommendation.
   */
  printReport() {
    // TODO: Group results by category
    // TODO: Print each group with [PASS]/[FAIL] icons
    // TODO: Calculate score (passed/total * 100)
    // TODO: Print "APPROVE" if score >= 80, else "REQUEST CHANGES"
  }

  // Utility getters used by validators
  get totalChanges() {
    return this.changedFiles.reduce((sum, f) => sum + f.additions + f.deletions, 0);
  }

  hasFileType(extension) {
    return this.changedFiles.some(f => f.path.endsWith(extension));
  }
}

// Test with a sample PR
const checker = new CodeReviewChecker(
  'Add user authentication with JWT tokens',
  'Implements JWT-based auth including login, logout, and token refresh. Includes unit and integration tests.',
  [
    { path: 'src/auth/jwt.service.ts', additions: 85, deletions: 0 },
    { path: 'src/auth/auth.controller.ts', additions: 60, deletions: 5 },
    { path: 'src/auth/__tests__/jwt.test.ts', additions: 120, deletions: 0 },
    { path: 'docs/auth.md', additions: 30, deletions: 0 }
  ]
);

// TODO: Register at least 5 checks across 3+ categories
// TODO: Run and print
checker.runAll();
checker.printReport();`,
        hints: [
          'PR title length check: passed if title.length >= 10 && title.length <= 72',
          'Secrets check: flag files containing ".env", "secret", or "credential" in the path',
          'Tests check: look for ".test.", ".spec.", or "__tests__" in file paths'
        ],
        expectedOutput: `============================================================
CODE REVIEW REPORT
PR: Add user authentication with JWT tokens
============================================================

[GENERAL]
  [PASS] PR title is descriptive -- Title length: 45 chars
  [PASS] PR description is provided
  [PASS] PR is not too large -- 300 lines changed (max 400 recommended)

[SECURITY]
  [PASS] No secrets in changed files

[TESTING]
  [PASS] Tests are included

[DOCUMENTATION]
  [PASS] README or docs updated if needed

Score: 6/6 (100%)
Recommendation: APPROVE`,
        solution: `class CodeReviewChecker {
  constructor(prTitle, prDescription, changedFiles) {
    this.prTitle = prTitle;
    this.prDescription = prDescription;
    this.changedFiles = changedFiles;
    this.checks = [];
    this.results = [];
  }

  addCheck(category, name, validator) {
    this.checks.push({ category, name, validator });
    return this;
  }

  runAll() {
    this.results = this.checks.map(check => {
      try {
        const result = check.validator(this);
        return { category: check.category, name: check.name, passed: result.passed, note: result.note || '' };
      } catch (err) {
        return { category: check.category, name: check.name, passed: false, note: \`Error: \${err.message}\` };
      }
    });
    return this.results;
  }

  printReport() {
    const grouped = {};
    this.results.forEach(r => {
      if (!grouped[r.category]) grouped[r.category] = [];
      grouped[r.category].push(r);
    });

    console.log('='.repeat(60));
    console.log('CODE REVIEW REPORT');
    console.log(\`PR: \${this.prTitle}\`);
    console.log('='.repeat(60));

    for (const [category, checks] of Object.entries(grouped)) {
      console.log(\`\\n[\${category.toUpperCase()}]\`);
      checks.forEach(c => {
        const icon = c.passed ? 'PASS' : 'FAIL';
        const noteStr = c.note ? \` -- \${c.note}\` : '';
        console.log(\`  [\${icon}] \${c.name}\${noteStr}\`);
      });
    }

    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    const score = Math.round((passed / total) * 100);
    console.log(\`\\nScore: \${passed}/\${total} (\${score}%)\`);
    console.log(score >= 80 ? 'Recommendation: APPROVE' : 'Recommendation: REQUEST CHANGES');
  }

  get totalChanges() {
    return this.changedFiles.reduce((sum, f) => sum + f.additions + f.deletions, 0);
  }

  hasFileType(extension) {
    return this.changedFiles.some(f => f.path.endsWith(extension));
  }
}`
      },
      {
        title: 'Step 3: Build a Standard Check Suite',
        instruction: `WHY: Individual checks only become a code review standard when they are curated into a reusable suite. A well-designed suite catches the 80% of common issues while remaining fast enough to run on every PR.

WHAT: Build a buildStandardChecker() factory function that configures a CodeReviewChecker with checks across five categories: general (title, description, size), security (no secrets, no hardcoded IPs), testing (test files included), documentation (docs updated for large changes), and performance (no committed build artifacts).

HOW: Each check uses the checker context properties (prTitle, prDescription, changedFiles, totalChanges, hasFileType) and returns a clear note explaining what it found.`,
        starterCode: `// Build the standard check suite used across your team.

function buildStandardChecker(prTitle, prDescription, changedFiles) {
  const checker = new CodeReviewChecker(prTitle, prDescription, changedFiles);

  // --- General ---
  checker.addCheck('general', 'PR title is descriptive', (ctx) => ({
    passed: ctx.prTitle.length >= 10 && ctx.prTitle.length <= 72,
    note: \`Title length: \${ctx.prTitle.length} chars\`
  }));

  checker.addCheck('general', 'PR description is provided', (ctx) => ({
    // TODO: Pass if description length > 20
  }));

  checker.addCheck('general', 'PR is not too large', (ctx) => ({
    // TODO: Pass if totalChanges <= 400
  }));

  // --- Security ---
  checker.addCheck('security', 'No secrets in changed files', (ctx) => {
    // TODO: Flag files with .env, secret, or credential in their path
  });

  checker.addCheck('security', 'No hardcoded IP addresses', (ctx) => {
    // TODO: Flag files with "config" or "constants" in path AND additions > 0
    // (approximation — in real life you'd grep file contents)
    // For this exercise, just check if any .env files were added
    const envFiles = ctx.changedFiles.filter(f => f.path.endsWith('.env'));
    return { passed: envFiles.length === 0, note: envFiles.map(f => f.path).join(', ') };
  });

  // --- Testing ---
  checker.addCheck('testing', 'Tests are included', (ctx) => {
    // TODO: Pass if any file path contains .test., .spec., or __tests__
  });

  // --- Documentation ---
  checker.addCheck('documentation', 'README or docs updated if needed', (ctx) => {
    // TODO: If any file has > 50 additions, check that a docs/README file is also changed
  });

  // --- Performance ---
  checker.addCheck('performance', 'No large generated files committed', (ctx) => {
    // TODO: Flag .min.js or .bundle.js files with > 100 additions
  });

  return checker;
}

// Test with two PRs: one clean, one problematic
const cleanPR = buildStandardChecker(
  'Add JWT authentication middleware',
  'Implements stateless JWT auth with refresh token rotation. All endpoints updated. Tests added.',
  [
    { path: 'src/middleware/auth.ts', additions: 80, deletions: 0 },
    { path: 'src/middleware/__tests__/auth.test.ts', additions: 95, deletions: 0 },
    { path: 'docs/auth-guide.md', additions: 25, deletions: 0 }
  ]
);
cleanPR.runAll();
cleanPR.printReport();`,
        hints: [
          'Description check: passed: ctx.prDescription.length > 20',
          'Large files: ctx.changedFiles.filter(f => (f.path.endsWith(".min.js") || f.path.endsWith(".bundle.js")) && f.additions > 100)',
          'Docs check: const hasNewFiles = ctx.changedFiles.some(f => f.additions > 50); const hasDocs = ctx.changedFiles.some(f => f.path.includes("README") || f.path.includes("/docs/"))'
        ],
        expectedOutput: `============================================================
CODE REVIEW REPORT
PR: Add JWT authentication middleware
============================================================

[GENERAL]
  [PASS] PR title is descriptive -- Title length: 34 chars
  [PASS] PR description is provided
  [PASS] PR is not too large -- 200 lines changed (max 400 recommended)

[SECURITY]
  [PASS] No secrets in changed files
  [PASS] No hardcoded IP addresses

[TESTING]
  [PASS] Tests are included

[DOCUMENTATION]
  [PASS] README or docs updated if needed

[PERFORMANCE]
  [PASS] No large generated files committed

Score: 8/8 (100%)
Recommendation: APPROVE`,
        solution: `checker.addCheck('general', 'PR description is provided', (ctx) => ({
  passed: ctx.prDescription.length > 20,
  note: ctx.prDescription.length <= 20 ? 'Description too short or missing' : ''
}));

checker.addCheck('general', 'PR is not too large', (ctx) => ({
  passed: ctx.totalChanges <= 400,
  note: \`\${ctx.totalChanges} lines changed (max 400 recommended)\`
}));

checker.addCheck('security', 'No secrets in changed files', (ctx) => {
  const sensitiveFiles = ctx.changedFiles.filter(f =>
    f.path.includes('.env') || f.path.includes('secret') || f.path.includes('credential')
  );
  return { passed: sensitiveFiles.length === 0, note: sensitiveFiles.map(f => f.path).join(', ') };
});

checker.addCheck('testing', 'Tests are included', (ctx) => {
  const hasTests = ctx.changedFiles.some(f =>
    f.path.includes('.test.') || f.path.includes('.spec.') || f.path.includes('__tests__')
  );
  return { passed: hasTests, note: hasTests ? '' : 'No test files in this PR' };
});

checker.addCheck('documentation', 'README or docs updated if needed', (ctx) => {
  const hasNewFiles = ctx.changedFiles.some(f => f.additions > 50);
  const hasDocs = ctx.changedFiles.some(f =>
    f.path.includes('README') || f.path.includes('/docs/')
  );
  return { passed: !hasNewFiles || hasDocs, note: hasNewFiles && !hasDocs ? 'Large additions without doc updates' : '' };
});

checker.addCheck('performance', 'No large generated files committed', (ctx) => {
  const largeFiles = ctx.changedFiles.filter(f =>
    (f.path.endsWith('.min.js') || f.path.endsWith('.bundle.js')) && f.additions > 100
  );
  return { passed: largeFiles.length === 0, note: largeFiles.map(f => f.path).join(', ') };
});`
      },
      {
        title: 'Step 4: Add Migration-Aware Checks and Multi-PR Reporting',
        instruction: `WHY: Database migrations are high-risk changes. A migration without a rollback file is a production incident waiting to happen. Extending the review system with domain-specific checks (like migration safety) shows how a code review system evolves from generic to team-specific.

WHAT: Add a 'migration' category check that (1) detects if any migration files are present in the PR and (2) verifies a corresponding rollback/down migration file also exists. Then build a runBatch() utility that processes multiple PRs and summarizes team-wide compliance.

HOW: Migration files typically live in \`migrations/\` or \`db/migrate/\` and follow patterns like \`001_add_users.up.sql\` paired with \`001_add_users.down.sql\`. Check that for every \`.up.\` file there is a matching \`.down.\` file in the changed files list.`,
        starterCode: `// Extend your checker with migration safety and batch reporting.

// Add this check to buildStandardChecker():
checker.addCheck('migration', 'Migration has a rollback file', (ctx) => {
  const upMigrations = ctx.changedFiles.filter(f =>
    // TODO: Detect .up.sql, .up.js, or files in migrations/ directory
    f.path.includes('migrations/') || f.path.includes('.up.')
  );

  if (upMigrations.length === 0) {
    return { passed: true, note: 'No migration files in this PR' };
  }

  // TODO: For each up migration, check if a corresponding down/rollback file exists
  const missingRollbacks = upMigrations.filter(f => {
    // e.g., '001_add_users.up.sql' → look for '001_add_users.down.sql'
    const rollbackPath = f.path.replace('.up.', '.down.');
    return !ctx.changedFiles.some(df => df.path === rollbackPath);
  });

  return {
    passed: missingRollbacks.length === 0,
    note: missingRollbacks.length > 0
      ? \`Missing rollback for: \${missingRollbacks.map(f => f.path).join(', ')}\`
      : 'All migrations have rollback files'
  };
});

// Batch reporter
function runBatch(prs) {
  // TODO: For each PR, build a checker, run it, collect { prTitle, score, recommendation }
  // TODO: Print a summary table showing all PRs and their scores
  // TODO: Print team compliance rate (% of PRs that would be approved)
}

// Test with three PRs
runBatch([
  {
    title: 'Add users table migration',
    description: 'Adds the users table with email, password_hash, and created_at.',
    files: [
      { path: 'migrations/001_add_users.up.sql', additions: 12, deletions: 0 },
      { path: 'migrations/001_add_users.down.sql', additions: 5, deletions: 0 },
      { path: 'src/models/user.ts', additions: 40, deletions: 0 },
      { path: 'src/models/__tests__/user.test.ts', additions: 60, deletions: 0 }
    ]
  },
  {
    title: 'Hotfix payment rounding bug',
    description: 'Fix decimal rounding in payment calculation.',
    files: [
      { path: 'src/payment/calculator.ts', additions: 5, deletions: 3 },
      { path: 'src/payment/__tests__/calculator.test.ts', additions: 8, deletions: 0 }
    ]
  },
  {
    title: 'WIP',
    description: '',
    files: [
      { path: 'migrations/002_add_roles.up.sql', additions: 20, deletions: 0 }
      // Missing rollback!
    ]
  }
]);`,
        hints: [
          'Replace .up. with .down. to find the expected rollback path',
          'For batch scoring: const score = Math.round((passed/total)*100); recommendation = score >= 80 ? "APPROVE" : "CHANGES"',
          'Team compliance rate: (PRs approved / total PRs) * 100'
        ],
        expectedOutput: `=== BATCH CODE REVIEW SUMMARY ===
  PR                                        Score   Recommendation
  Add users table migration                  100%   APPROVE
  Hotfix payment rounding bug               100%   APPROVE
  WIP                                        50%   REQUEST CHANGES

Team compliance rate: 67% (2/3 PRs would be approved)
Action required: 1 PR needs changes before merge`,
        solution: `function runBatch(prs) {
  const summaries = prs.map(pr => {
    const checker = buildStandardChecker(pr.title, pr.description, pr.files);
    checker.runAll();
    const passed = checker.results.filter(r => r.passed).length;
    const total = checker.results.length;
    const score = total > 0 ? Math.round((passed / total) * 100) : 0;
    return {
      title: pr.title,
      score,
      recommendation: score >= 80 ? 'APPROVE' : 'REQUEST CHANGES'
    };
  });

  console.log('=== BATCH CODE REVIEW SUMMARY ===');
  console.log(\`  \${'PR'.padEnd(42)} Score   Recommendation\`);
  summaries.forEach(s => {
    console.log(\`  \${s.title.substring(0, 40).padEnd(42)} \${String(s.score + '%').padEnd(8)}\${s.recommendation}\`);
  });

  const approved = summaries.filter(s => s.recommendation === 'APPROVE').length;
  const compliance = Math.round((approved / summaries.length) * 100);
  console.log(\`\\nTeam compliance rate: \${compliance}% (\${approved}/\${summaries.length} PRs would be approved)\`);
  if (approved < summaries.length) {
    console.log(\`Action required: \${summaries.length - approved} PR(s) need changes before merge\`);
  }
}`
      }
    ]
  },

  // ============================================================
  // tl-lab-5 — Architecture Fitness Functions (converted from tla-4)
  // ============================================================
  {
    id: 'tl-lab-5',
    roleId: 'tech-lead-architect',
    level: 'mid',
    title: 'Architecture Fitness Functions and Governance',
    description: 'Implement automated architecture fitness functions that continuously validate system health — catching coupling violations, coverage regressions, dependency staleness, and API governance issues before they accumulate into architectural drift.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before implementing architecture fitness functions, ensure your JavaScript environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ and npm. This lab uses only JavaScript built-in features — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to confirm Node.js 20+',
          'Test: `node -e "console.log(\'Node.js ready\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nNode.js ready',
        solution: null
      },
      {
        title: 'Step 2: Build the Fitness Function Engine',
        instruction: `WHY: "Evolutionary architecture" (Ford et al., 2017) defines fitness functions as objective integrity checks for architectural properties. Without them, architectural decay is invisible until it causes an outage or a painful refactor.

WHAT: Build two classes: FitnessFunction encapsulates a named check with a numeric threshold, and ArchitectureGovernor runs a suite of fitness functions against codebase metrics and produces a health report.

HOW: Each FitnessFunction has a name, description, threshold ({ min, max, or both }), and an evaluator function that takes a context object and returns a numeric score. The governor runs all functions, compares scores to thresholds, and reports pass/fail.`,
        starterCode: `// Architecture Fitness Functions
// Automatically enforce architectural properties on every build.

/**
 * FitnessFunction — a measurable check on an architectural property.
 */
class FitnessFunction {
  /**
   * @param {string} name
   * @param {string} description
   * @param {{ min?: number, max?: number }} threshold
   * @param {function} evaluator - (context) => number
   */
  constructor(name, description, threshold, evaluator) {
    this.name = name;
    this.description = description;
    this.threshold = threshold;
    this.evaluator = evaluator;
  }

  /**
   * Run this function against a context object.
   * @returns {{ name, score, passed, threshold }}
   */
  run(context) {
    // TODO: Call this.evaluator(context) to get the score
    // TODO: Check score against threshold.min and threshold.max
    // TODO: Return { name, score, passed, threshold }
  }
}

/**
 * ArchitectureGovernor — run a suite of fitness functions.
 */
class ArchitectureGovernor {
  constructor() {
    this.functions = [];
  }

  /** Register a FitnessFunction. Returns this for chaining. */
  register(fitnessFunction) {
    // TODO
  }

  /** Run all registered functions against context. Returns results array. */
  evaluate(context) {
    // TODO: Return array of run() results
  }

  /** Print a formatted report. Returns true if all passed. */
  printReport(results) {
    // TODO: Print each result with [PASS]/[FAIL], score, and threshold
    // TODO: Print overall health summary
    // TODO: Return true if all passed
  }
}

// Test with mock codebase metrics
const governor = new ArchitectureGovernor();

// TODO: Register 3 fitness functions:
// 1. Test coverage >= 75%
// 2. Cyclic dependencies <= 0
// 3. Service coupling (max direct dependencies) <= 5

const metrics = {
  testCoverage: 82,
  cyclicDependencies: 1,
  services: [
    { name: 'auth-service', directDependencies: 2 },
    { name: 'order-service', directDependencies: 4 },
    { name: 'notification-service', directDependencies: 6 }
  ]
};

const results = governor.evaluate(metrics);
governor.printReport(results);`,
        hints: [
          'Threshold check: if (threshold.min !== undefined && score < threshold.min) passed = false',
          'Service coupling evaluator: (ctx) => Math.max(...ctx.services.map(s => s.directDependencies))',
          'Threshold display: min-only → "[min: N]", max-only → "[max: N]", both → "[N-N]"'
        ],
        expectedOutput: `============================================================
ARCHITECTURE FITNESS REPORT
============================================================
  [PASS] Test Coverage: 82 [min: 75]
  [FAIL] Cyclic Dependencies: 1 [max: 0]
  [FAIL] Service Coupling: 6 [max: 5]

Health: 1/3 passed
Overall: ACTION REQUIRED`,
        solution: `class FitnessFunction {
  constructor(name, description, threshold, evaluator) {
    this.name = name;
    this.description = description;
    this.threshold = threshold;
    this.evaluator = evaluator;
  }

  run(context) {
    const score = this.evaluator(context);
    let passed = true;
    if (this.threshold.min !== undefined && score < this.threshold.min) passed = false;
    if (this.threshold.max !== undefined && score > this.threshold.max) passed = false;
    return { name: this.name, score, passed, threshold: this.threshold };
  }
}

class ArchitectureGovernor {
  constructor() { this.functions = []; }

  register(fn) { this.functions.push(fn); return this; }

  evaluate(context) { return this.functions.map(fn => fn.run(context)); }

  printReport(results) {
    console.log('='.repeat(60));
    console.log('ARCHITECTURE FITNESS REPORT');
    console.log('='.repeat(60));
    results.forEach(r => {
      const status = r.passed ? 'PASS' : 'FAIL';
      const t = r.threshold;
      const threshStr = t.min !== undefined && t.max !== undefined
        ? \`[\${t.min}-\${t.max}]\`
        : t.max !== undefined ? \`[max: \${t.max}]\` : \`[min: \${t.min}]\`;
      console.log(\`  [\${status}] \${r.name}: \${r.score} \${threshStr}\`);
    });
    const passed = results.filter(r => r.passed).length;
    console.log(\`\\nHealth: \${passed}/\${results.length} passed\`);
    const healthy = results.every(r => r.passed);
    console.log(\`Overall: \${healthy ? 'HEALTHY' : 'ACTION REQUIRED'}\`);
    return healthy;
  }
}`
      },
      {
        title: 'Step 3: Define a Comprehensive Fitness Suite',
        instruction: `WHY: Six well-chosen fitness functions cover the most common sources of architectural decay in microservice systems: stale dependencies, circular imports, insufficient tests, over-coupled services, unversioned APIs, and slow CI builds.

WHAT: Register all six fitness functions from the example system against your ArchitectureGovernor: dependency freshness, cyclic dependencies, test coverage, service coupling, API versioning compliance, and build time.

HOW: For dependency freshness, calculate the percentage of packages within 1 major version of latest. For API versioning, check that endpoint paths match the regex \`/^\/v\\d+\//\` (all paths starting with /vN/). Evaluate against provided codebase metrics.`,
        starterCode: `// Register all 6 fitness functions against the codebase metrics below.
// Use your FitnessFunction and ArchitectureGovernor classes from Step 2.

const governor = new ArchitectureGovernor();

// 1. Dependency freshness: % of deps within 1 major version of latest >= 80
governor.register(new FitnessFunction(
  'Dependency Freshness',
  'Percentage of dependencies within 1 major version of latest',
  { min: 80 },
  (ctx) => {
    // TODO: Calculate % of ctx.dependencies where majorsBehind <= 1
  }
));

// 2. Cyclic dependencies: must be 0
governor.register(new FitnessFunction(
  'Cyclic Dependencies',
  'Number of circular dependency chains detected',
  { max: 0 },
  (ctx) => ctx.cyclicDependencies
));

// 3. Test coverage: >= 75%
governor.register(new FitnessFunction(
  'Test Coverage',
  'Overall line coverage percentage',
  { min: 75 },
  (ctx) => ctx.testCoverage
));

// 4. Service coupling: max direct deps per service <= 5
governor.register(new FitnessFunction(
  'Service Coupling',
  'Maximum direct dependencies any single service has',
  { max: 5 },
  (ctx) => {
    // TODO: Return the max directDependencies across all services
  }
));

// 5. API versioning: 100% of public endpoints must be versioned (/v1/, /v2/, etc.)
governor.register(new FitnessFunction(
  'API Versioning',
  'Percentage of public endpoints with version prefix',
  { min: 100 },
  (ctx) => {
    // TODO: Calculate % of ctx.endpoints where path matches /^\\/v\\d+\\//
  }
));

// 6. Build time: CI build must complete in <= 300 seconds
governor.register(new FitnessFunction(
  'Build Time',
  'CI build time in seconds',
  { max: 300 },
  (ctx) => ctx.buildTimeSeconds
));

const codebaseMetrics = {
  dependencies: [
    { name: 'express', majorsBehind: 0 },
    { name: 'lodash', majorsBehind: 1 },
    { name: 'moment', majorsBehind: 3 }, // outdated
    { name: 'axios', majorsBehind: 0 },
    { name: 'pg', majorsBehind: 0 }
  ],
  cyclicDependencies: 1,
  testCoverage: 82,
  services: [
    { name: 'auth-service', directDependencies: 2 },
    { name: 'order-service', directDependencies: 4 },
    { name: 'notification-service', directDependencies: 6 }
  ],
  endpoints: [
    { path: '/v1/users', method: 'GET' },
    { path: '/v1/orders', method: 'POST' },
    { path: '/health', method: 'GET' } // not versioned — intentional
  ],
  buildTimeSeconds: 240
};

const results = governor.evaluate(codebaseMetrics);
const healthy = governor.printReport(results);
console.log(\`\\nOverall: \${healthy ? 'HEALTHY' : 'ACTION REQUIRED'}\`);`,
        hints: [
          'Freshness: const upToDate = ctx.dependencies.filter(d => d.majorsBehind <= 1).length; return Math.round((upToDate / ctx.dependencies.length) * 100)',
          'Coupling: Math.max(...ctx.services.map(s => s.directDependencies))',
          'Versioning: /^\\/v\\d+\\//.test(endpoint.path) — note: /health is intentionally unversioned, so 2/3 = 67%'
        ],
        expectedOutput: `============================================================
ARCHITECTURE FITNESS REPORT
============================================================
  [PASS] Dependency Freshness: 80 [min: 80]
  [FAIL] Cyclic Dependencies: 1 [max: 0]
  [PASS] Test Coverage: 82 [min: 75]
  [FAIL] Service Coupling: 6 [max: 5]
  [FAIL] API Versioning: 67 [min: 100]
  [PASS] Build Time: 240 [max: 300]

Health: 3/6 passed
Overall: ACTION REQUIRED`,
        solution: `// Dependency freshness
(ctx) => {
  const upToDate = ctx.dependencies.filter(d => d.majorsBehind <= 1).length;
  return Math.round((upToDate / ctx.dependencies.length) * 100);
}

// Service coupling
(ctx) => Math.max(...ctx.services.map(s => s.directDependencies))

// API versioning
(ctx) => {
  const versioned = ctx.endpoints.filter(e => /^\\/v\\d+\\//.test(e.path)).length;
  return Math.round((versioned / ctx.endpoints.length) * 100);
}`
      },
      {
        title: 'Step 4: Trend Analysis — Detect Architectural Drift Over Time',
        instruction: `WHY: A single snapshot of architectural health is only marginally useful. What matters is the trend: is the system getting healthier or drifting further from its intended architecture? Trend analysis turns fitness functions into an early-warning system.

WHAT: Build a HealthTrendTracker that records weekly governance snapshots and calculates whether each fitness function's score is improving, stable, or degrading over the last N weeks.

HOW: Store snapshots as \`{ week: string, results: FitnessResult[] }\`. For each function, compare the most recent score to the average of the prior weeks. Flag as "IMPROVING" if score improved by > 2 points, "DEGRADING" if it worsened by > 2, otherwise "STABLE". Print a trend summary.`,
        starterCode: `// Track architectural health trends over time.

class HealthTrendTracker {
  constructor(governor) {
    this.governor = governor;
    this.snapshots = []; // [{ week: string, results: [] }]
  }

  /**
   * Record a new weekly snapshot.
   * @param {string} week - e.g. '2025-W01'
   * @param {object} metrics - codebase metrics to evaluate
   */
  record(week, metrics) {
    const results = this.governor.evaluate(metrics);
    this.snapshots.push({ week, results });
    return results;
  }

  /**
   * For each fitness function, calculate trend over last N snapshots.
   * @param {number} windowSize - number of recent snapshots to compare
   * @returns {Array} trend objects: { name, currentScore, trend: 'IMPROVING'|'STABLE'|'DEGRADING', delta }
   */
  analyzeTrends(windowSize = 4) {
    if (this.snapshots.length < 2) return [];

    const recent = this.snapshots.slice(-windowSize);
    const current = recent[recent.length - 1];
    const prior = recent.slice(0, -1);

    return current.results.map(result => {
      // TODO: Find this function's scores in prior snapshots
      // TODO: Calculate average prior score
      // TODO: Calculate delta = currentScore - priorAvg
      // TODO: Classify: IMPROVING if delta > 2, DEGRADING if delta < -2, else STABLE
      return {
        name: result.name,
        currentScore: result.score,
        passed: result.passed,
        trend: 'STABLE', // TODO: replace with actual trend
        delta: 0         // TODO: replace with actual delta
      };
    });
  }

  printTrendReport() {
    const trends = this.analyzeTrends();
    console.log('=== ARCHITECTURAL HEALTH TRENDS ===');
    console.log(\`Snapshots tracked: \${this.snapshots.length}\`);
    console.log(\`Latest: \${this.snapshots[this.snapshots.length - 1].week}\\n\`);

    trends.forEach(t => {
      const arrow = t.trend === 'IMPROVING' ? '↑' : t.trend === 'DEGRADING' ? '↓' : '→';
      const deltaStr = t.delta > 0 ? \`+\${t.delta.toFixed(1)}\` : t.delta.toFixed(1);
      const status = t.passed ? 'PASS' : 'FAIL';
      console.log(\`  [\${status}] \${arrow} \${t.name}: \${t.currentScore} (\${deltaStr})\`);
    });
  }
}

// Simulate 4 weeks of governance data
const tracker = new HealthTrendTracker(governor); // reuse governor from Step 3

tracker.record('2025-W01', { ...codebaseMetrics, testCoverage: 68, cyclicDependencies: 3 });
tracker.record('2025-W02', { ...codebaseMetrics, testCoverage: 72, cyclicDependencies: 2 });
tracker.record('2025-W03', { ...codebaseMetrics, testCoverage: 78, cyclicDependencies: 1 });
tracker.record('2025-W04', { ...codebaseMetrics, testCoverage: 82, cyclicDependencies: 1 });

tracker.printTrendReport();`,
        hints: [
          'Prior scores for a function: prior.map(snap => snap.results.find(r => r.name === result.name)?.score ?? result.score)',
          'Average: priorScores.reduce((a, b) => a + b, 0) / priorScores.length',
          'Delta threshold of 2 points prevents noise from triggering trend alerts'
        ],
        expectedOutput: `=== ARCHITECTURAL HEALTH TRENDS ===
Snapshots tracked: 4
Latest: 2025-W04

  [PASS] ↑ Test Coverage: 82 (+14.0)
  [FAIL] → Cyclic Dependencies: 1 (-1.0)
  [PASS] → Dependency Freshness: 80 (+0.0)
  [FAIL] → Service Coupling: 6 (+0.0)
  [FAIL] → API Versioning: 67 (+0.0)
  [PASS] → Build Time: 240 (+0.0)`,
        solution: `analyzeTrends(windowSize = 4) {
  if (this.snapshots.length < 2) return [];
  const recent = this.snapshots.slice(-windowSize);
  const current = recent[recent.length - 1];
  const prior = recent.slice(0, -1);

  return current.results.map(result => {
    const priorScores = prior.map(
      snap => snap.results.find(r => r.name === result.name)?.score ?? result.score
    );
    const priorAvg = priorScores.reduce((a, b) => a + b, 0) / priorScores.length;
    const delta = result.score - priorAvg;
    const trend = delta > 2 ? 'IMPROVING' : delta < -2 ? 'DEGRADING' : 'STABLE';
    return { name: result.name, currentScore: result.score, passed: result.passed, trend, delta };
  });
}`
      }
    ]
  },

  // ============================================================
  // tl-lab-6 — Tech Debt Tracker and Scorer (converted from tla-5)
  // ============================================================
  {
    id: 'tl-lab-6',
    roleId: 'tech-lead-architect',
    level: 'senior',
    title: 'Technical Debt Management System',
    description: 'Build a systematic technical debt tracker that scores, prioritizes, and generates sprint recommendations — turning vague "we should fix this someday" notes into a quantified, actionable backlog that teams can actually act on.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a technical debt tracker, ensure your JavaScript environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Node.js 20+ and npm. This lab uses only JavaScript built-in features — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `node --version` to confirm Node.js 20+',
          'Test: `node -e "console.log(\'Node.js ready\')"` in your terminal'
        ],
        expectedOutput: 'Node.js v20.x.x\nnpm 10.x.x\nNode.js ready',
        solution: null
      },
      {
        title: 'Step 2: Model Technical Debt Items with Priority Scoring',
        instruction: `WHY: "Tech debt" is meaningless without scoring. Teams that track debt as a list of vague TODOs never pay it down because they can't justify prioritizing it over features. A numeric priority score makes debt legible to product managers and engineers alike.

WHAT: Build a TechDebtItem class that holds debt metadata and computes a priority score using the formula: \`(impact + risk) * 2 - effort\`. Higher scores should be fixed first — they represent high-impact, high-risk debt that is relatively easy to address.

HOW: Impact, effort, and risk are rated 1–5. The formula rewards items that cause significant pain (high impact + risk) but are cheap to fix (low effort). Items that are important but very expensive score lower and surface after quick wins.`,
        starterCode: `// Technical Debt Item — model and score debt systematically

class TechDebtItem {
  /**
   * @param {{ id, title, category, description, component, createdBy }} params
   * category: 'code' | 'architecture' | 'infrastructure' | 'testing' | 'documentation'
   */
  constructor({ id, title, category, description, component, createdBy }) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.component = component;
    this.createdBy = createdBy;
    this.createdAt = new Date().toISOString();
    this.resolvedAt = null;

    // Scoring dimensions (1–5 scale, set via score())
    this.impact = 0;  // How much does this hurt velocity or quality?
    this.effort = 0;  // How hard to fix? (1=hours, 5=quarter)
    this.risk = 0;    // What's the risk if we don't fix it?
  }

  /**
   * Set scoring dimensions. Values are clamped to [1, 5].
   */
  score({ impact, effort, risk }) {
    // TODO: Clamp each to Math.min(5, Math.max(1, value))
    // TODO: Return this for chaining
  }

  /**
   * Priority score: higher means fix sooner.
   * Formula: (impact + risk) * 2 - effort
   */
  get priorityScore() {
    // TODO: Implement
    return 0;
  }

  /** Mark as resolved. */
  resolve() {
    this.resolvedAt = new Date().toISOString();
  }
}

// Test the scoring model
const item1 = new TechDebtItem({
  id: 'TD-001',
  title: 'Add integration tests for payment flow',
  category: 'testing',
  description: 'Payment flow has 0% integration coverage.',
  component: 'payment-service',
  createdBy: 'alice'
}).score({ impact: 5, effort: 3, risk: 5 });

const item2 = new TechDebtItem({
  id: 'TD-002',
  title: 'Migrate from Moment.js to date-fns',
  category: 'code',
  description: 'Moment.js is deprecated, adds 70KB to bundle.',
  component: 'frontend',
  createdBy: 'bob'
}).score({ impact: 3, effort: 2, risk: 2 });

console.log(\`\${item1.title}: priority=\${item1.priorityScore}\`);
console.log(\`\${item2.title}: priority=\${item2.priorityScore}\`);
console.log('Higher priority item:', item1.priorityScore > item2.priorityScore ? item1.title : item2.title);`,
        hints: [
          'Clamp: this.impact = Math.min(5, Math.max(1, impact))',
          'Priority formula: (this.impact + this.risk) * 2 - this.effort',
          'item1 score: (5+5)*2 - 3 = 17. item2 score: (3+2)*2 - 2 = 8. item1 is higher priority'
        ],
        expectedOutput: `Add integration tests for payment flow: priority=17
Migrate from Moment.js to date-fns: priority=8
Higher priority item: Add integration tests for payment flow`,
        solution: `score({ impact, effort, risk }) {
  this.impact = Math.min(5, Math.max(1, impact));
  this.effort = Math.min(5, Math.max(1, effort));
  this.risk = Math.min(5, Math.max(1, risk));
  return this;
}

get priorityScore() {
  return (this.impact + this.risk) * 2 - this.effort;
}`
      },
      {
        title: 'Step 3: Build the Debt Tracker with Sprint Suggestions',
        instruction: `WHY: A debt tracker that can't suggest what to fix next is just a complaint log. Sprint suggestion — selecting the highest-priority items that fit within an effort budget — transforms the tracker into a planning tool product managers can engage with.

WHAT: Build a TechDebtTracker that stores items, supports resolution, provides category breakdowns, calculates a team debt score, and implements a greedy sprint selection algorithm.

HOW: The suggestForSprint() method should take an effort budget (story points) and greedily select the highest-priority items that fit. Iterate the prioritized list in order; include an item if its effort fits within the remaining budget.`,
        starterCode: `// Tech Debt Tracker with sprint planning capabilities

class TechDebtTracker {
  constructor(teamName) {
    this.teamName = teamName;
    this.items = [];
    this.nextId = 1;
  }

  /** Add a new debt item. Auto-assigns a zero-padded ID. Returns the item for scoring. */
  add(params) {
    const item = new TechDebtItem({
      id: \`TD-\${String(this.nextId++).padStart(3, '0')}\`,
      ...params
    });
    this.items.push(item);
    return item;
  }

  /** Mark an item as resolved by ID. Returns the item. */
  resolve(id) {
    // TODO: Find item by id, call .resolve(), return it
  }

  get openItems() {
    return this.items.filter(i => !i.resolvedAt);
  }

  get resolvedItems() {
    return this.items.filter(i => i.resolvedAt);
  }

  /** Return open items sorted by priorityScore descending. */
  getPrioritized() {
    // TODO: Sort openItems by priorityScore descending
  }

  /** Return breakdown of open items by category. */
  getCategoryBreakdown() {
    // TODO: Group openItems by category
    // Each entry: { count, totalImpact, avgPriority }
  }

  /**
   * Overall debt score — sum of all open item priority scores.
   * Higher = more debt. 0 = no debt.
   */
  get debtScore() {
    return this.openItems.reduce((sum, item) => sum + item.priorityScore, 0);
  }

  /**
   * Greedy sprint selection: pick highest-priority items that fit the effort budget.
   * @param {number} effortBudget - total effort points available
   * @returns {{ selected: TechDebtItem[], effortUsed: number, effortBudget: number }}
   */
  suggestForSprint(effortBudget) {
    // TODO: Iterate prioritized items, include if effort fits remaining budget
  }
}

// Populate with realistic debt items
const tracker = new TechDebtTracker('Platform Team');

tracker.add({ title: 'Migrate from Moment.js to date-fns', category: 'code', description: 'Deprecated library, 70KB bundle cost.', component: 'frontend', createdBy: 'alice' }).score({ impact: 3, effort: 2, risk: 2 });
tracker.add({ title: 'Split monolithic auth service', category: 'architecture', description: 'Auth, profiles, and permissions in one service.', component: 'auth-service', createdBy: 'bob' }).score({ impact: 5, effort: 5, risk: 4 });
tracker.add({ title: 'Add integration tests for payment flow', category: 'testing', description: '0% integration coverage on payments.', component: 'payment-service', createdBy: 'carol' }).score({ impact: 5, effort: 3, risk: 5 });
tracker.add({ title: 'Upgrade PostgreSQL from 12 to 16', category: 'infrastructure', description: 'PG 12 EOL Nov 2024, missing security patches.', component: 'database', createdBy: 'dave' }).score({ impact: 4, effort: 3, risk: 5 });
tracker.add({ title: 'Document API rate limiting strategy', category: 'documentation', description: 'Clients hit 429s with no explanation.', component: 'api-gateway', createdBy: 'eve' }).score({ impact: 2, effort: 1, risk: 1 });

const sprint = tracker.suggestForSprint(8);
console.log('Sprint suggestion (budget: 8):');
sprint.selected.forEach(item => console.log(\`  [\${item.id}] \${item.title} (effort: \${item.effort}, priority: \${item.priorityScore})\`));
console.log(\`Effort used: \${sprint.effortUsed}/\${sprint.effortBudget}\`);`,
        hints: [
          'getPrioritized: [...this.openItems].sort((a, b) => b.priorityScore - a.priorityScore)',
          'suggestForSprint: for (const item of prioritized) { if (item.effort <= remaining) { selected.push(item); remaining -= item.effort; } }',
          'Category breakdown: use a Map or object; calculate avgPriority = sum(priorityScore) / count'
        ],
        expectedOutput: `Sprint suggestion (budget: 8):
  [TD-003] Add integration tests for payment flow (effort: 3, priority: 17)
  [TD-004] Upgrade PostgreSQL from 12 to 16 (effort: 3, priority: 16)
  [TD-005] Document API rate limiting strategy (effort: 1, priority: 4)
Effort used: 7/8`,
        solution: `resolve(id) {
  const item = this.items.find(i => i.id === id);
  if (item) item.resolve();
  return item;
}

getPrioritized() {
  return [...this.openItems].sort((a, b) => b.priorityScore - a.priorityScore);
}

getCategoryBreakdown() {
  const breakdown = {};
  this.openItems.forEach(item => {
    if (!breakdown[item.category]) {
      breakdown[item.category] = { count: 0, totalImpact: 0, avgPriority: 0, items: [] };
    }
    breakdown[item.category].count++;
    breakdown[item.category].totalImpact += item.impact;
    breakdown[item.category].items.push(item);
  });
  for (const cat of Object.values(breakdown)) {
    cat.avgPriority = cat.items.reduce((sum, i) => sum + i.priorityScore, 0) / cat.count;
  }
  return breakdown;
}

suggestForSprint(effortBudget) {
  const prioritized = this.getPrioritized();
  const selected = [];
  let remaining = effortBudget;
  for (const item of prioritized) {
    if (item.effort <= remaining) {
      selected.push(item);
      remaining -= item.effort;
    }
  }
  return { selected, effortUsed: effortBudget - remaining, effortBudget };
}`
      },
      {
        title: 'Step 4: Full Debt Report and Trend Tracking',
        instruction: `WHY: A debt report that updates every sprint creates accountability. When the team sees the debt score going up week over week, it creates the organizational impetus to allocate 20% of sprint capacity to debt reduction.

WHAT: Add a printReport() method to TechDebtTracker that outputs a complete debt status report, and add a trend() method that accepts an array of weekly debt scores and determines whether debt is increasing, stable, or decreasing.

HOW: The report should show: total open/resolved counts and debt score, category breakdown with average priority, top 5 priority items in tabular format, and the sprint suggestion. The trend() method compares the last snapshot to the first in a window; if the score increased by > 5 it is "INCREASING", decreased by > 5 it is "DECREASING", otherwise "STABLE".`,
        starterCode: `// Complete the TechDebtTracker with full reporting and trend analysis.
// Add these methods to your class from Step 3.

printReport() {
  console.log('='.repeat(65));
  console.log(\`TECH DEBT REPORT - \${this.teamName}\`);
  console.log(\`Date: \${new Date().toISOString().split('T')[0]}\`);
  console.log('='.repeat(65));
  console.log(\`Open items: \${this.openItems.length}  |  Resolved: \${this.resolvedItems.length}  |  Debt Score: \${this.debtScore}\`);

  // TODO: Print category breakdown (category: count items, avg priority X.X)

  // TODO: Print top 5 priority items as a table:
  // ID         TITLE                          PRI  IMP  EFF  RISK

  // TODO: Print sprint suggestion with effort budget of 8
}

/**
 * Analyze debt score trend over a series of weekly snapshots.
 * @param {number[]} weeklyScores - Array of debt scores, oldest first
 * @returns {{ trend: 'INCREASING'|'STABLE'|'DECREASING', delta: number, message: string }}
 */
trend(weeklyScores) {
  if (weeklyScores.length < 2) return { trend: 'STABLE', delta: 0, message: 'Not enough data' };

  // TODO: Compare last score to first score in the window
  // TODO: If delta > 5: INCREASING (debt is growing)
  // TODO: If delta < -5: DECREASING (debt is being paid down)
  // TODO: Otherwise: STABLE
  // TODO: Include a human-readable message
}

// Test the full report
tracker.printReport();

// Simulate 6 weeks of debt tracking
const weeklyScores = [45, 52, 58, 61, 55, 48]; // debt score over 6 weeks
const trendResult = tracker.trend(weeklyScores);
console.log(\`\\nDebt Trend: \${trendResult.trend} (delta: \${trendResult.delta})\`);
console.log(trendResult.message);`,
        hints: [
          'Category breakdown: Object.entries(this.getCategoryBreakdown()).forEach(([cat, data]) => console.log(...))',
          'Top 5 table: this.getPrioritized().slice(0, 5).forEach(item => console.log(...))',
          'Trend delta: weeklyScores[weeklyScores.length - 1] - weeklyScores[0]'
        ],
        expectedOutput: `=================================================================
TECH DEBT REPORT - Platform Team
Date: 2025-01-15
=================================================================
Open items: 5  |  Resolved: 0  |  Debt Score: 61

BREAKDOWN BY CATEGORY:
  architecture: 1 items (avg priority: 14.0)
  testing: 1 items (avg priority: 17.0)
  infrastructure: 1 items (avg priority: 16.0)
  code: 1 items (avg priority: 8.0)
  documentation: 1 items (avg priority: 4.0)

TOP PRIORITY ITEMS:
  ID         TITLE                          PRI  IMP  EFF  RISK
  ---------------------------------------------------------------
  TD-003     Add integration tests...       17   5    3    5
  TD-004     Upgrade PostgreSQL 12→16       16   4    3    5
  ...

SPRINT SUGGESTION (budget: 8 effort points):
  [TD-003] Add integration tests for payment flow (effort: 3)
  [TD-004] Upgrade PostgreSQL from 12 to 16 (effort: 3)
  [TD-005] Document API rate limiting strategy (effort: 1)
  Effort used: 7/8

Debt Trend: STABLE (delta: 3)
Debt is growing slowly. Consider allocating 20% sprint capacity to debt reduction.`,
        solution: `printReport() {
  console.log('='.repeat(65));
  console.log(\`TECH DEBT REPORT - \${this.teamName}\`);
  console.log(\`Date: \${new Date().toISOString().split('T')[0]}\`);
  console.log('='.repeat(65));
  console.log(\`Open items: \${this.openItems.length}  |  Resolved: \${this.resolvedItems.length}  |  Debt Score: \${this.debtScore}\`);

  console.log('\\nBREAKDOWN BY CATEGORY:');
  const breakdown = this.getCategoryBreakdown();
  for (const [cat, data] of Object.entries(breakdown)) {
    console.log(\`  \${cat}: \${data.count} items (avg priority: \${data.avgPriority.toFixed(1)})\`);
  }

  console.log('\\nTOP PRIORITY ITEMS:');
  console.log(\`  \${'ID'.padEnd(10)} \${'TITLE'.padEnd(32)} \${'PRI'.padEnd(5)} \${'IMP'.padEnd(5)} \${'EFF'.padEnd(5)} RISK\`);
  console.log('  ' + '-'.repeat(62));
  this.getPrioritized().slice(0, 5).forEach(item => {
    console.log(\`  \${item.id.padEnd(10)} \${item.title.substring(0, 30).padEnd(32)} \${String(item.priorityScore).padEnd(5)} \${String(item.impact).padEnd(5)} \${String(item.effort).padEnd(5)} \${item.risk}\`);
  });

  const sprint = this.suggestForSprint(8);
  console.log(\`\\nSPRINT SUGGESTION (budget: \${sprint.effortBudget} effort points):\`);
  sprint.selected.forEach(item => {
    console.log(\`  [\${item.id}] \${item.title} (effort: \${item.effort})\`);
  });
  console.log(\`  Effort used: \${sprint.effortUsed}/\${sprint.effortBudget}\`);
}

trend(weeklyScores) {
  if (weeklyScores.length < 2) return { trend: 'STABLE', delta: 0, message: 'Not enough data' };
  const delta = weeklyScores[weeklyScores.length - 1] - weeklyScores[0];
  let trend, message;
  if (delta > 5) {
    trend = 'INCREASING';
    message = \`Debt grew by \${delta} points over \${weeklyScores.length} weeks. Allocate 20% sprint capacity to debt reduction.\`;
  } else if (delta < -5) {
    trend = 'DECREASING';
    message = \`Debt reduced by \${Math.abs(delta)} points. Good progress — maintain dedicated debt sprints.\`;
  } else {
    trend = 'STABLE';
    message = \`Debt is growing slowly. Consider allocating 20% sprint capacity to debt reduction.\`;
  }
  return { trend, delta, message };
}`
      }
    ]
  }
];
