export const additions = {
  beginner: [
    {
      question: 'According to the "Every DevOps Tool Explained" video, which tool is described as packaging your application and all its dependencies into a standardised unit that eliminates the "it works on my machine" problem?',
      options: [
        'Ansible',
        'Jenkins',
        'Docker',
        'Prometheus'
      ],
      correctIndex: 2,
      explanation: 'The video explains that Docker packages an application and all its dependencies into a container — a lightweight, portable, consistent unit. Unlike virtual machines, containers share the host kernel and start in milliseconds. This directly solves environment inconsistency: what runs on a developer\'s laptop is identical to what runs in staging and production.'
    },
    {
      question: 'In the "Learn Docker in 7 Easy Steps" video, why does the presenter recommend copying the package.json and running npm install BEFORE copying the full application source code into the Docker image?',
      options: [
        'Because Docker requires dependencies to be installed before any other files are present',
        'To take advantage of layer caching — dependencies change rarely, so their layer is reused on every build where only application code changed',
        'Because npm install must be run as the root user before other files are copied',
        'Because Docker cannot copy both package.json and source code in the same instruction'
      ],
      correctIndex: 1,
      explanation: 'Each Dockerfile instruction creates an immutable cached layer. Dependencies (npm install) take the most time but rarely change. By copying package.json and installing dependencies first, that expensive layer is cached and reused on every subsequent build where only application code changed. If source code and dependencies were copied together, npm install would re-run on every single code change — making builds unnecessarily slow.'
    },
    {
      question: 'The "Every DevOps Tool Explained" video covers three tools for code hosting and CI/CD: GitHub, GitLab, and GitHub Actions. Which statement correctly distinguishes them?',
      options: [
        'GitHub and GitLab are identical products; GitHub Actions is used to switch between them',
        'GitHub focuses on social coding and pull requests; GitLab is a complete DevOps platform with built-in CI/CD; GitHub Actions extends GitHub with CI/CD pipeline automation',
        'GitLab is only for private repositories; GitHub is only for public ones; GitHub Actions is a paid add-on',
        'GitHub Actions replaces GitHub for enterprise use cases; GitLab is used exclusively for self-hosting'
      ],
      correctIndex: 1,
      explanation: 'The video distinguishes the three clearly: GitHub\'s strength is collaboration — pull requests, issues, forks, and integrations. GitLab takes a different approach by bundling code hosting with built-in CI/CD, security scanning, and Kubernetes integration in a single platform. GitHub Actions fills the gap by turning GitHub repositories into CI/CD engines through workflow YAML files — so teams that already use GitHub can add CI/CD automation without switching platforms.'
    },
  ],
  mid: [
    {
      question: 'In the "System Design Concepts in 10 min" video, what is described as the key difference between horizontal scaling and vertical scaling, and which approach provides fault tolerance?',
      options: [
        'Horizontal scaling upgrades a single machine; vertical scaling adds identical machines. Vertical scaling provides fault tolerance.',
        'Vertical scaling adds resources (RAM, CPU) to one machine; horizontal scaling adds more machines. Horizontal scaling provides fault tolerance because if one server fails, the others continue serving requests.',
        'They achieve the same result; the difference is only in cost.',
        'Horizontal scaling is for databases only; vertical scaling is for web servers only.'
      ],
      correctIndex: 1,
      explanation: 'The video explains that vertical scaling (bigger machine) is easy but has a hard limit — you cannot scale beyond the largest available machine. Horizontal scaling (more machines with a load balancer) is more complex but scales nearly infinitely and eliminates the single point of failure: if one server goes down, the others continue handling requests. This redundancy is why cloud-native architectures favour horizontal scaling despite the added complexity.'
    },
    {
      question: 'According to the "System Design Concepts in 10 min" video, what does the CAP theorem state about distributed databases, and what is the trade-off it forces?',
      options: [
        'Distributed databases can achieve Consistency, Availability, and Partition tolerance simultaneously if designed carefully enough',
        'Given a network partition, a distributed database can only guarantee either Consistency (every read returns the latest write) or Availability (every request gets a response) — not both',
        'CAP theorem only applies to NoSQL databases; SQL databases are exempt because they are ACID compliant',
        'CAP theorem states that the cost, availability, and performance of a database cannot all be maximised at the same time'
      ],
      correctIndex: 1,
      explanation: 'The video explains that the CAP theorem states you can only guarantee two of three properties in a distributed database: Consistency (every read returns the latest write), Availability (every request gets a response), and Partition tolerance (the system keeps running during network partitions). Since network partitions happen in real cloud environments, you must choose to prioritise either consistency or availability. This is why NoSQL databases (which favour availability and partition tolerance) exist alongside relational databases (which prioritise consistency) — different use cases require different trade-offs.'
    },
    {
      question: 'In the "System Design Concepts in 10 min" video, what problem do message queues solve, and what additional architectural benefit do they provide beyond handling traffic spikes?',
      options: [
        'Message queues speed up database queries by batching writes; they do not provide any architectural benefits beyond performance',
        'Message queues absorb bursts of incoming data that a system cannot immediately process, while also decoupling producers from consumers so different parts of the application can scale and fail independently',
        'Message queues replace databases entirely; they are the preferred storage mechanism for all cloud applications',
        'Message queues are only used for email delivery and have no application in infrastructure design'
      ],
      correctIndex: 1,
      explanation: 'The video describes two distinct benefits of message queues: first, they act as a buffer — if data arrives faster than the system can process it, the queue persists it until processing capacity is available. Second, they decouple producers and consumers: the service producing events does not need to know about the services consuming them, and each can scale, update, or fail without directly impacting the other. This decoupling is one of the foundational patterns in resilient distributed systems design.'
    },
  ],
  senior: [
    {
      question: 'Based on the "AI, ML, Deep Learning and GenAI Explained" video, how does the presenter describe the relationship between AI, machine learning, deep learning, and generative AI?',
      options: [
        'They are four separate fields that do not overlap; each was developed independently',
        'They are nested subsets: machine learning is a subset of AI; deep learning is a subset of ML using layered neural networks; generative AI (including LLMs) is the most recent layer built on deep learning foundation models',
        'AI and machine learning are the same thing; deep learning and generative AI are newer replacements',
        'Generative AI is the broadest category; AI is a narrower specialisation within it'
      ],
      correctIndex: 1,
      explanation: 'The video uses a Venn diagram structure to show the nesting relationship: AI is the broadest field (simulating human intelligence). Machine learning is a subset — the machine learns from data rather than following explicit rules. Deep learning is a subset of ML that uses layered neural networks, enabling it to discover patterns that simpler ML cannot. Generative AI — powered by foundation models like large language models — is the most recent and commercially impactful layer, built on deep learning. Understanding this hierarchy helps a platform engineer know which Azure services, compute SKUs, and operational patterns apply to a given AI workload.'
    },
    {
      question: 'The "AI, ML, Deep Learning and GenAI Explained" video explains why large language models are described as "generative." A critic argues they are just "regurgitating existing information." How does the presenter respond to this argument, and what does this imply for platform engineers provisioning LLM infrastructure?',
      options: [
        'The presenter agrees — LLMs cannot create anything new, so their infrastructure requirements are identical to traditional search systems',
        'The presenter uses the analogy of music: every note already exists, yet new compositions are still genuinely creative. LLMs similarly combine patterns in novel ways — and this generative capability drives the unpredictable output variability that makes content filtering and human oversight guardrails a required infrastructure concern',
        'The presenter dismisses the criticism without engaging with it',
        'The presenter argues LLMs are fully deterministic and therefore do not require content filtering infrastructure'
      ],
      correctIndex: 1,
      explanation: 'The presenter uses the analogy that every musical note already exists, yet new music is genuinely composed — not merely regurgitated. LLMs operate similarly: they recombine learned patterns to produce outputs that have never existed before. This has a direct infrastructure implication: because LLM outputs are probabilistic and can include unexpected, incorrect, or harmful content, platform engineers must treat content filtering, responsible AI controls, and human oversight mechanisms as non-optional infrastructure concerns — not application-layer nice-to-haves. You cannot audit or rate-limit a model\'s imagination at deploy time; you must build the guardrails into the platform.'
    },
    {
      question: 'A senior platform engineer is designing a GitOps workflow for a Kubernetes cluster. A team member proposes storing Kubernetes Secrets directly in the Git config repository alongside other manifests. What is the correct response, and which solutions does the GitOps community recommend?',
      options: [
        'Storing secrets in Git is acceptable if the repository is private and access is restricted to the engineering team',
        'Secrets must never be stored in Git as plaintext. Recommended approaches include Sealed Secrets (encrypts secrets with a cluster-specific key so only the target cluster can decrypt), Mozilla SOPS (age/GPG-based encryption for secret files), or the External Secrets Operator (retrieves secrets from Azure Key Vault at runtime). The config repo is treated as public-readable infrastructure — any secret committed to it must be encrypted.',
        'Secrets should be stored in the CI/CD pipeline environment variables instead of the Git repo',
        'The only safe approach is to never use Kubernetes Secrets at all; use ConfigMaps with base64 encoding instead'
      ],
      correctIndex: 1,
      explanation: 'This is a fundamental GitOps security requirement. Even in private repositories, committing plaintext secrets to version control creates persistent risk: git history is difficult to fully purge, repository access is harder to control than key management systems, and secrets may be exposed through CI logs or forks. Sealed Secrets, SOPS, and External Secrets Operator are the three canonical solutions: Sealed Secrets encrypts a secret so only the specific cluster can decrypt it; SOPS encrypts the file contents using age or GPG keys; External Secrets Operator fetches secrets from external vaults (like Azure Key Vault) at runtime, so the secret never lives in Git at all. Starting with one of these from day one is far less painful than retrofitting it later.'
    },
  ],
}
