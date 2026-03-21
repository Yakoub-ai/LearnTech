
# DevOps / Platform Engineer – Senior Concept Reference

This document provides in-depth explanations of the core concepts covered at the Senior level. Use it alongside the resources in the learning path to develop the strategic and architectural thinking expected of a senior DevOps or platform engineer.

---

## 1. Platform Engineering – Internal Developer Platforms and Golden Paths

Platform engineering is the discipline of building and operating internal developer platforms (IDPs) that reduce cognitive load for application teams. An IDP abstracts away the complexity of infrastructure, pipelines, and operational tooling behind self-service interfaces. A golden path is an opinionated, pre-approved, well-supported route for accomplishing a common task – creating a new service, deploying to a specific environment, or setting up observability – that teams can follow without needing deep platform expertise.

The key mental shift is treating the platform as a product. This means understanding who uses it (developers), what problems they face (slow provisioning, inconsistent environments, security toil), and continuously improving based on their feedback – exactly as a product team would.

**Code walkthrough:**

```yaml
# Step 1: A Backstage software catalog entity — the core of an internal developer portal
# Why: Backstage gives developers a single pane of glass for all services and tooling
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: order-api
  description: "Handles order creation, validation and lifecycle management"
  annotations:
    # Step 2: Link to the CI/CD pipeline so developers can see build status
    github.com/project-slug: "myorg/order-api"
    # Step 3: Link to monitoring dashboards for one-click observability
    grafana/dashboard-selector: "order-api"
    # Step 4: Link to the on-call schedule for incident response
    pagerduty.com/service-id: "P1234AB"
  tags:
    - dotnet
    - production
spec:
  type: service
  lifecycle: production
  owner: team-orders
  # Step 5: Declare dependencies so the catalog shows the full service graph
  # Why: knowing what depends on what is critical for change impact analysis
  dependsOn:
    - component:payment-service
    - resource:orders-database
  providesApis:
    - order-api-rest

---
# Step 6: A golden path template — self-service scaffolding for new services
# Why: golden paths let teams create new services without platform team involvement
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: dotnet-service-template
  title: ".NET Microservice (Golden Path)"
  description: "Creates a new .NET service with CI/CD, monitoring and K8s manifests"
spec:
  owner: platform-team
  type: service
  parameters:
    - title: Service Details
      properties:
        serviceName:
          type: string
          description: "Name of the new service"
        teamOwner:
          type: string
          description: "Owning team (must match a Backstage team)"
  steps:
    - id: scaffold
      name: Generate project from template
      action: fetch:template
      input:
        url: ./skeleton
        values:
          serviceName: ${{ parameters.serviceName }}
```

**Why it matters:**

At the senior level, the goal shifts from doing DevOps work yourself to enabling other engineers to do it correctly and efficiently. Platform engineering operationalises this shift. Instead of being a bottleneck – approving every pipeline change or infrastructure request – you build the guardrails, templates, and automation that let teams move independently while still meeting compliance, security, and reliability standards.

**Key things to understand:**

- A platform is a product; it requires product thinking, user research (developer experience), roadmaps, and support.
- Golden paths are not mandates; they are designed to be the easiest option, not the only option.
- Platform APIs (REST, CLI, portal) allow teams to request resources without opening tickets or waiting for manual provisioning.
- Backstage (by Spotify) is a widely adopted open-source framework for building software catalogues and IDP portals.
- Measuring platform adoption, time-to-first-deployment, and developer satisfaction is as important as measuring uptime.
- The team topologies model (Stream-aligned, Platform, Enabling, Complicated-subsystem) provides vocabulary for positioning a platform team relative to delivery teams.

**Common pitfalls:**

- Building a platform without talking to its users, resulting in golden paths nobody actually wants to follow.
- Treating the platform as infrastructure rather than a product, leading to poor documentation and no support model.
- Over-standardising too early, before understanding the real diversity of team needs.
- Neglecting the migration path for teams already using non-standard approaches.

---

## 2. Advanced System Design for Infrastructure

System design for infrastructure means making deliberate architectural decisions about how cloud resources are structured, how they communicate, how they scale, and how they recover from failures. At the senior level, this goes beyond deploying individual resources and encompasses multi-region topologies, network segmentation, landing zone design, capacity planning, and the trade-offs between availability, cost, and operational complexity.

**Code walkthrough:**

```hcl
# Step 1: Terraform configuration for a hub-and-spoke network topology
# Why: hub-and-spoke centralises shared services while isolating workloads

# Step 2: The hub VNet — hosts shared services (firewall, DNS, VPN gateway)
resource "azurerm_virtual_network" "hub" {
  name                = "hub-vnet"
  resource_group_name = azurerm_resource_group.networking.name
  location            = "westeurope"
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "firewall" {
  name                 = "AzureFirewallSubnet"  # Name is required by Azure
  resource_group_name  = azurerm_resource_group.networking.name
  virtual_network_name = azurerm_virtual_network.hub.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Step 3: A spoke VNet for the orders workload — isolated from other workloads
resource "azurerm_virtual_network" "spoke_orders" {
  name                = "spoke-orders-vnet"
  resource_group_name = azurerm_resource_group.orders.name
  location            = "westeurope"
  address_space       = ["10.1.0.0/16"]
}

# Step 4: Peer spoke to hub — traffic flows through the hub's firewall
# Why: peering connects VNets; routing through the firewall enforces security policy
resource "azurerm_virtual_network_peering" "spoke_to_hub" {
  name                      = "spoke-orders-to-hub"
  resource_group_name       = azurerm_resource_group.orders.name
  virtual_network_name      = azurerm_virtual_network.spoke_orders.name
  remote_virtual_network_id = azurerm_virtual_network.hub.id
  allow_forwarded_traffic   = true
}

resource "azurerm_virtual_network_peering" "hub_to_spoke" {
  name                      = "hub-to-spoke-orders"
  resource_group_name       = azurerm_resource_group.networking.name
  virtual_network_name      = azurerm_virtual_network.hub.name
  remote_virtual_network_id = azurerm_virtual_network.spoke_orders.id
  allow_forwarded_traffic   = true
}

# Step 5: Apply tags for cost allocation and incident scoping
# Why: without tags, cost attribution and ownership are impossible at scale
locals {
  common_tags = {
    environment  = var.environment
    cost_centre  = var.cost_centre
    managed_by   = "terraform"
    landing_zone = "orders"
  }
}
```

**Why it matters:**

Senior engineers are expected to own architectural decisions that affect the entire organisation. Poor infrastructure design leads to outages, security breaches, runaway costs, and teams blocked on shared bottlenecks. Good design creates a foundation that is safe to change, easy to operate, and capable of absorbing growth.

**Key things to understand:**

- Landing zones are the pre-configured, policy-enforced Azure environments into which workloads are deployed. They implement network topology, IAM baselines, logging, and cost guardrails at the subscription level.
- Hub-and-spoke network topology centralises shared services (firewalls, DNS, connectivity) in a hub VNet; workload VNets peer to the hub.
- Availability zones and regions provide different levels of fault isolation. Design for zone redundancy before region redundancy; region failover is expensive and complex.
- Capacity planning requires understanding both current usage and the growth trajectory. Autoscaling handles short-term bursts; capacity planning handles structural growth.
- Cost allocation – tagging resources with team, environment, and application identifiers – enables chargeback and identifies waste.
- Change management for infrastructure must account for dependencies; a shared database change can affect dozens of services.

**Common pitfalls:**

- Designing for maximum availability without considering the operational cost of maintaining that design.
- Not enforcing landing zone guardrails through policy, relying on documentation and trust instead.
- Underestimating the complexity of cross-region failover; it requires data replication, DNS failover, and application-level support.
- Treating tagging as optional, making cost attribution and incident scoping impossible later.

**Disaster Recovery and Business Continuity:**

For an insurance organisation, disaster recovery (DR) and business continuity are non-negotiable. A DR strategy defines how systems are restored after a major failure, and it is governed by two key metrics: Recovery Point Objective (RPO) – the maximum acceptable data loss measured in time – and Recovery Time Objective (RTO) – the maximum acceptable downtime before services must be operational again. Key considerations include:

- **Azure Site Recovery** replicates virtual machines and workloads to a secondary region, enabling automated failover when the primary region becomes unavailable.
- **Backup strategies** should cover databases (geo-redundant backups, point-in-time restore), storage accounts (geo-redundant storage with failover), and infrastructure definitions (stored in version control and deployable to any region).
- **Failover testing** must be practised regularly, not only documented. Untested DR plans fail when they are needed most. Schedule periodic failover drills and document the results.
- **Data sovereignty and compliance** requirements may constrain which Azure regions can serve as failover targets; verify this before designing the DR topology.

---

## 3. Security in Pipelines – Secrets Management, SAST, DAST and Supply Chain

Pipeline security encompasses the practices and controls that prevent pipelines from becoming a vector for compromising systems. This includes how secrets are managed and injected into builds, how code and dependencies are analysed for vulnerabilities, and how the integrity of the software supply chain – from source code to production artifact – is verified. SAST (Static Application Security Testing) analyses source code without executing it. DAST (Dynamic Application Security Testing) tests a running application by sending it crafted requests.

A compromised pipeline is a high-value attack target because it runs with elevated permissions, has access to production secrets, and can push code to production without a human reviewing the change. Pipeline security is therefore not optional hygiene – it is a core engineering responsibility.

**Code walkthrough:**

```yaml
# Step 1: A CI/CD pipeline with integrated security scanning gates
# Why: security checks must be pipeline gates, not optional scans run separately

name: Secure CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Step 2: SAST — scan source code for vulnerabilities before building
      # Why: catching insecure patterns early is cheaper than fixing them in production
      - name: Run SAST with Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: "p/owasp-top-ten"

      # Step 3: Dependency scanning — check third-party libraries for known CVEs
      # Why: most code in a modern app comes from dependencies, not your team
      - name: Dependency audit
        run: npm audit --audit-level=high

      # Step 4: Secret scanning — ensure no credentials leaked into source code
      - name: Scan for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified

  build-and-push:
    needs: security-scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build container image
        run: docker build -t myapp:${{ github.sha }} .

      # Step 5: Container image scanning — find vulnerabilities in the final artifact
      # Why: the base image and installed packages may have CVEs even if your code is clean
      - name: Scan container image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: "myapp:${{ github.sha }}"
          severity: "CRITICAL,HIGH"
          exit-code: "1"

      # Step 6: Generate SBOM — document every component in the release
      # Why: when a new CVE is announced, you need to know which services are affected
      - name: Generate SBOM
        run: |
          syft myapp:${{ github.sha }} -o spdx-json > sbom.json

      - name: Push image to registry
        run: |
          docker push registry.example.com/myapp:${{ github.sha }}
```

**Why it matters:**

As the person who builds and owns pipelines, a senior DevOps engineer is directly responsible for preventing pipeline compromise. Regulators and security teams increasingly audit pipeline configurations, and a weak pipeline can block certification or cause compliance failures.

**Key things to understand:**

- Secrets must never appear in pipeline logs, environment variables baked into images, or version control. Use Azure Key Vault, HashiCorp Vault, or pipeline-native secret variable groups with masked output.
- SAST tools (such as Semgrep, CodeQL, or SonarQube) run against source code and flag known vulnerability patterns, insecure API usage, and hardcoded credentials. Integrate them as pipeline gates, not optional scans.
- DAST tools (such as OWASP ZAP) probe a deployed application for injection, authentication, and configuration vulnerabilities.
- Software Bill of Materials (SBOM) documents all components in a release artifact; it enables rapid response when a CVE affects a dependency.
- Dependency scanning checks third-party libraries against vulnerability databases; pin dependency versions and review updates deliberately.
- Build provenance (SLSA framework levels) provides a verifiable record of how an artifact was built, linking a production image back to a specific source commit and pipeline run.

**Common pitfalls:**

- Treating SAST and DAST as one-time audits rather than continuous pipeline gates.
- Granting pipeline service principals overly broad permissions (Contributor at subscription scope is a common mistake).
- Not reviewing third-party pipeline tasks or GitHub Actions before using them; they execute in a trusted context and can exfiltrate secrets.
- Ignoring the dependency update backlog, allowing known vulnerabilities to remain in production indefinitely.

---

## 4. Domain-Driven Design Applied to Platform Boundaries

Domain-Driven Design (DDD) is a software design approach that aligns the structure of a system with the business domains it serves. Key concepts include bounded contexts (explicit boundaries within which a specific model is valid), ubiquitous language (shared vocabulary used consistently by both technical and business stakeholders), aggregates (clusters of objects treated as a unit), and context maps (diagrams that show how bounded contexts relate to one another). Applied to infrastructure and platform design, DDD helps define where platform boundaries should be drawn and how teams should own and interface with services.

**Code walkthrough:**

```yaml
# Step 1: A context map expressed as a structured YAML document
# Why: context maps make team boundaries and integration patterns explicit

domain: insurance-platform
bounded_contexts:

  # Step 2: The platform team's bounded context — owns shared infrastructure
  - name: platform-services
    owner: platform-team
    type: generic          # Generic subdomain — buy or standardise, don't custom-build
    provides:
      - service: container-platform    # AKS clusters, namespaces, RBAC
      - service: ci-cd-pipelines       # Shared pipeline templates
      - service: observability-stack   # Prometheus, Grafana, Loki

  # Step 3: A stream-aligned team's bounded context — owns a business capability
  - name: claims-processing
    owner: team-claims
    type: core             # Core subdomain — this is where competitive advantage lives
    provides:
      - service: claims-api
      - service: claims-workflow-engine

  # Step 4: Integration patterns between contexts
  integrations:
    # Step 5: Customer-supplier — platform serves claims team
    # Why: the platform team (supplier) builds what consuming teams (customers) need
    - upstream: platform-services
      downstream: claims-processing
      pattern: customer-supplier
      contract: "Platform API v2 — Terraform modules + Helm charts"

    # Step 6: Anti-corruption layer — claims team translates external partner's model
    # Why: ACL prevents a poorly designed upstream API from contaminating your domain
    - upstream: external-partner-api
      downstream: claims-processing
      pattern: anti-corruption-layer
      contract: "Partner adapter translates XML to domain events"
```

**Why it matters:**

At scale, the hardest problems in platform engineering are not technical – they are organisational. Where does one team's responsibility end and another's begin? Which services should be shared and which should be owned per team? DDD provides a disciplined vocabulary and set of patterns for answering these questions in a way that reduces coupling and enables autonomous team operation.

**Key things to understand:**

- A bounded context is the natural unit of platform ownership; each team owns the services within its context and exposes them through a well-defined interface.
- Context maps reveal integration patterns: shared kernel (shared code or schema), customer-supplier (upstream/downstream dependency), and anti-corruption layer (translation between incompatible models).
- The ubiquitous language of a platform team includes terms like environment, deployment, artifact, and pipeline; aligning on these terms with consuming teams prevents misunderstandings.
- Strategic design decisions (which contexts are core, supporting, or generic) guide where to invest engineering effort and what to buy or reuse rather than build.
- Microservice decomposition boundaries should follow bounded context boundaries, not technical layers.

**Common pitfalls:**

- Drawing service boundaries along technical layers (database service, API service, UI service) rather than business capability boundaries.
- Allowing bounded contexts to become entangled through shared databases or tight API coupling, undermining autonomy.
- Applying tactical DDD patterns (aggregates, repositories) without the strategic layer (bounded contexts, context maps), which provides most of the value at the platform level.
- Skipping the collaborative modelling step (event storming, context mapping workshops) and designing boundaries in isolation.

---

## 5. Architecture Patterns for Cloud-Native Systems

Cloud-native architecture patterns are design approaches that exploit the characteristics of cloud infrastructure – elasticity, managed services, distributed execution, and pay-per-use pricing – rather than treating the cloud as a virtualised data centre. Key patterns include microservices, event-driven architecture, the strangler fig (migrating from monolith to services), CQRS (Command Query Responsibility Segregation), the sidecar pattern, and the circuit breaker pattern.

**Code walkthrough:**

```yaml
# Step 1: Kubernetes sidecar pattern — attach a proxy to every service pod
# Why: the sidecar handles cross-cutting concerns without modifying the application

apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-api
spec:
  replicas: 3
  template:
    spec:
      containers:
        # Step 2: The application container — knows nothing about the mesh
        - name: order-api
          image: myregistry.azurecr.io/order-api:v2.1.0
          ports:
            - containerPort: 8080

        # Step 3: The sidecar proxy — handles mTLS, retries, circuit breaking
        # Why: the app communicates over localhost; the sidecar handles everything else
        - name: envoy-proxy
          image: envoyproxy/envoy:v1.30-latest
          ports:
            - containerPort: 15001
          volumeMounts:
            - name: envoy-config
              mountPath: /etc/envoy

      volumes:
        - name: envoy-config
          configMap:
            name: order-api-envoy

---
# Step 4: Circuit breaker configuration in the Envoy sidecar
# Why: when a downstream service fails, stop calling it to prevent cascade failures
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-api-envoy
data:
  envoy.yaml: |
    clusters:
      - name: payment-service
        connect_timeout: 2s
        circuit_breakers:
          thresholds:
            # Step 5: Open the circuit after 5 consecutive failures
            - max_connections: 100
              max_pending_requests: 50
              max_retries: 3
        outlier_detection:
          # Step 6: Eject unhealthy hosts for 30 seconds before retrying
          consecutive_5xx: 5
          interval: 10s
          base_ejection_time: 30s
```

**Why it matters:**

Senior DevOps engineers participate in architecture reviews and are expected to evaluate whether proposed designs are operationally sound. A pattern that looks elegant on a whiteboard can be operationally nightmarish if it produces excessive inter-service latency, complicates deployment ordering, or makes tracing difficult. Understanding these patterns lets you contribute meaningfully to design decisions and anticipate operational challenges before they reach production.

**Key things to understand:**

- Microservices decompose a system into small, independently deployable services. The operational overhead per service (pipeline, monitoring, on-call) must be justified by the independence gained.
- Event-driven architecture decouples producers from consumers via a message broker (Azure Service Bus, Event Hub, Kafka). It improves scalability and resilience but complicates debugging and consistency.
- The strangler fig pattern wraps an existing monolith and gradually moves functionality to new services without a big-bang rewrite.
- CQRS separates read and write models, allowing each to be optimised independently; it is a good fit for high-read, high-write workloads but adds complexity.
- The circuit breaker pattern prevents cascading failures by stopping calls to a failing downstream service and allowing it time to recover.
- The sidecar pattern attaches a secondary container to an application container to provide cross-cutting concerns (logging, proxy, secrets) without modifying the application.

**Common pitfalls:**

- Adopting microservices prematurely, before team and operational maturity can support the overhead.
- Using synchronous HTTP calls between services where asynchronous messaging would provide better decoupling and resilience.
- Not designing for eventual consistency in event-driven systems, leading to incorrect assumptions about data freshness.
- Implementing CQRS without a genuine need, adding complexity without a commensurate benefit.

---

## 6. Enterprise GenAI – Infrastructure and Operational Considerations

Generative AI (GenAI) workloads – large language models, embedding models, image generation systems – have unique infrastructure characteristics. They require access to GPU-enabled compute (or dedicated AI accelerator instances), high-bandwidth storage for model weights, low-latency access to embedding stores (vector databases), and robust content safety and access control layers. On Azure, the primary managed service for deploying LLMs is Azure OpenAI Service; Azure AI Foundry provides a broader platform for building and deploying AI applications.

**Code walkthrough:**

```hcl
# Step 1: Terraform for provisioning Azure OpenAI with private networking
# Why: AI endpoints must be as secure as any other production API

resource "azurerm_cognitive_account" "openai" {
  name                  = "myorg-openai-prod"
  resource_group_name   = azurerm_resource_group.ai.name
  location              = "swedencentral"
  kind                  = "OpenAI"
  sku_name              = "S0"
  # Step 2: Disable public access — all traffic goes through the private endpoint
  # Why: prevents data exfiltration over the public internet
  public_network_access_enabled = false

  tags = {
    environment = "production"
    cost_centre = "ai-platform"
  }
}

# Step 3: Deploy a specific model version — pin it like any other dependency
# Why: a model upgrade is a production change requiring testing and rollback capability
resource "azurerm_cognitive_deployment" "gpt4" {
  name                 = "gpt-4o"
  cognitive_account_id = azurerm_cognitive_account.openai.id
  model {
    format  = "OpenAI"
    name    = "gpt-4o"
    version = "2024-11-20"
  }
  # Step 4: Set token-per-minute quota to control cost and prevent abuse
  sku {
    name     = "Standard"
    capacity = 80  # 80K tokens per minute
  }
}

# Step 5: Private endpoint — keeps traffic on the Azure backbone network
resource "azurerm_private_endpoint" "openai" {
  name                = "openai-pe"
  resource_group_name = azurerm_resource_group.ai.name
  location            = "swedencentral"
  subnet_id           = azurerm_subnet.ai_subnet.id

  private_service_connection {
    name                           = "openai-connection"
    private_connection_resource_id = azurerm_cognitive_account.openai.id
    subresource_names              = ["account"]
    is_manual_connection           = false
  }
}

# Step 6: Budget alert — AI costs accumulate quickly at per-token pricing
resource "azurerm_consumption_budget_resource_group" "ai_budget" {
  name              = "ai-monthly-budget"
  resource_group_id = azurerm_resource_group.ai.id
  amount            = 5000
  time_grain        = "Monthly"

  notification {
    threshold      = 80
    operator       = "GreaterThanOrEqualTo"
    contact_emails = ["platform-team@example.com"]
  }
}
```

**Why it matters:**

As organisations adopt GenAI, DevOps and platform engineers are responsible for the infrastructure that hosts, scales, and secures these workloads. GenAI systems have distinct operational characteristics: they are stateless at inference time but require careful model version management, they produce probabilistic outputs that require human-in-the-loop review or content filtering, and they have different cost profiles (per-token billing) compared to traditional workloads.

**Key things to understand:**

- Model deployment and versioning: models must be version-pinned in infrastructure definitions; a model upgrade is a production change requiring testing and rollback capability.
- Private networking: deploy Azure OpenAI endpoints inside a VNet with private endpoints to prevent data exfiltration over the public internet.
- Content filtering and responsible AI controls must be configured as platform guardrails, not left to individual application teams.
- Rate limiting and quota management: Azure OpenAI has per-deployment token-per-minute (TPM) quotas; platform engineers must model usage and request quota increases proactively.
- Vector databases (Azure AI Search with vector indexes, or dedicated services) require their own availability, backup, and access control considerations.
- Cost observability: per-token costs accumulate quickly; tag deployments by team and application, set budget alerts, and instrument token usage in application telemetry.

**Common pitfalls:**

- Not applying the same security standards to AI endpoints as to other production APIs (authentication, rate limiting, audit logging).
- Underestimating GPU/TPM quota lead times; requesting capacity increases takes days to weeks and must be planned ahead.
- Storing chat history or user-generated content in the same storage account as model weights without appropriate access controls and data classification.
- Treating GenAI as a black box and not instrumenting token usage, latency, and error rates, making it impossible to detect degradation or unexpected cost spikes.

---

## 7. GitOps – Git as the Source of Truth for Infrastructure

GitOps is an operational model where the desired state of infrastructure and applications is declared in Git, and automated tooling continuously reconciles the actual state of the environment with the declared state. Instead of making changes by running imperative commands (kubectl apply, az deployment create), you make changes by committing to a Git repository. An agent running in the cluster detects the change and applies it automatically.

Flux is the CNCF-graduated GitOps toolkit for Kubernetes, and the most common choice in Azure environments. Flux runs inside the cluster, watches one or more Git repositories, and automatically applies changes when it detects drift between the declared state in Git and the actual state in the cluster. ArgoCD is the other major GitOps tool, offering a web UI and more opinionated workflow.

**Why it matters:**

GitOps solves a fundamental operational problem: configuration drift. When changes are made imperatively (someone runs kubectl commands directly), the actual state of the cluster diverges from what is documented. GitOps eliminates drift by making Git the single source of truth — every change is version-controlled, auditable, and reversible. For a regulated environment like insurance, the audit trail that GitOps provides is particularly valuable.

**Key things to understand:**

- Pull vs push deployment: traditional CI/CD pushes changes to the environment (pipeline runs kubectl apply). GitOps pulls: an agent in the cluster watches Git and pulls changes. Pull-based deployment is more secure because the cluster does not need to expose credentials to external CI systems.
- Flux components: Source Controller (watches Git repos), Kustomize Controller (applies Kustomize overlays), Helm Controller (manages Helm releases), Notification Controller (sends alerts on reconciliation events).
- Repository structure: separate application code repos from infrastructure/config repos. Application repos trigger image builds; config repos declare the desired cluster state. Flux watches the config repo.
- Sealed Secrets / SOPS: secrets cannot be stored in Git as plaintext. Sealed Secrets (Bitnami) encrypts secrets with a cluster-specific key so they can be safely committed. Mozilla SOPS provides age/GPG-based encryption. Azure Key Vault integration via External Secrets Operator is another option.
- Drift detection and remediation: Flux continuously checks (every configurable interval) whether the cluster state matches Git. If someone makes a manual change, Flux reverts it. This enforces consistency but requires the team to commit to the GitOps workflow — manual changes will be overwritten.
- Multi-environment promotion: use Git branches or directory structures (base + overlays) with Kustomize to manage dev/staging/production differences. Promote changes by merging or copying between environments.

**Code walkthrough:**

```yaml
# Step 1: Flux GitOps configuration — Git as the single source of truth for a cluster
# Why: every change is version-controlled, auditable and automatically reconciled

# --- flux-system/gitrepository.yaml ---
# Step 2: Tell Flux where to find the desired cluster state
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: platform-config
  namespace: flux-system
spec:
  interval: 1m
  url: https://github.com/myorg/platform-config
  ref:
    branch: main
  secretRef:
    name: git-credentials

---
# Step 3: Apply Kustomize overlays from the Git repo
# Why: Kustomize lets you keep a shared base and patch per-environment differences
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: order-api-production
  namespace: flux-system
spec:
  interval: 5m
  sourceRef:
    kind: GitRepository
    name: platform-config
  # Step 4: Path to the production overlay in the repo
  path: ./clusters/production/order-api
  prune: true     # Remove resources deleted from Git
  # Step 5: Health checks — Flux verifies the deployment is actually healthy
  healthChecks:
    - apiVersion: apps/v1
      kind: Deployment
      name: order-api
      namespace: production

---
# Step 6: Sealed Secret — encrypt secrets so they can be stored safely in Git
# Why: plaintext secrets in Git are a security risk even in private repos
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: order-api-secrets
  namespace: production
spec:
  encryptedData:
    # Step 7: Only the cluster's Sealed Secrets controller can decrypt this
    DATABASE_URL: AgBy3i4OJSWK+PiTySYZZA9rO...truncated...
    API_KEY: AgCtr8HGFSD2+LkTy5RRZA7pQ...truncated...
```

**Common pitfalls:**

- Storing secrets in Git without encryption — even in a private repo, plaintext secrets in version control are a security risk. Use Sealed Secrets, SOPS, or External Secrets Operator from day one.
- Not establishing a clear Git workflow (branch protection, PR reviews, automated validation) for the config repo. The config repo IS your infrastructure — it deserves the same rigour as application code.
- Trying to GitOps everything immediately instead of starting with a single application and expanding. GitOps requires changes to team workflows and tooling — adopt incrementally.
- Ignoring the feedback loop: Flux reconciliation errors, failed deployments, and drift alerts must be monitored and acted upon. Without observability of the GitOps process itself, failures go unnoticed.

---

## 8. AI Policy — Organisational Principles

> **Note:** The link below points to an internal SharePoint site and is only accessible to employees on the corporate network.

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from platform engineers building infrastructure for AI workloads to engineers using AI-assisted development tools.

**Code walkthrough:**

```hcl
# Step 1: Terraform module that enforces AI Policy requirements at the infra level
# Why: policy compliance must be verifiable through infrastructure, not just documentation

# Step 2: Azure Policy assignment — enforce private endpoints on all AI services
# Why: the AI Policy requires private networking for AI endpoints processing sensitive data
resource "azurerm_resource_group_policy_assignment" "ai_private_only" {
  name                 = "ai-require-private-endpoints"
  resource_group_id    = azurerm_resource_group.ai.id
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/xxx"
  display_name         = "AI Policy: Require private endpoints for Cognitive Services"
  enforcement_mode     = "Default"
}

# Step 3: Diagnostic settings — enable audit logging on all AI endpoints
# Why: the AI Policy requires logging which model was used for each inference
resource "azurerm_monitor_diagnostic_setting" "openai_audit" {
  name                       = "openai-audit-logs"
  target_resource_id         = azurerm_cognitive_account.openai.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.central.id

  enabled_log {
    category = "Audit"
  }
  enabled_log {
    category = "RequestResponse"
  }
  metric {
    category = "AllMetrics"
  }
}

# Step 4: Tag resources with AI Register classification
# Why: every AI use case must be registered and classified by risk level
resource "azurerm_cognitive_account" "openai" {
  # ... (other config) ...
  tags = {
    ai_register_id     = "AIR-2024-042"
    risk_classification = "high"
    data_classification = "confidential"
    policy_review_date  = "2026-06-01"
  }
}
```

**Why it matters:** The AI Policy directly affects platform engineering decisions. When provisioning infrastructure for AI workloads, configuring model endpoints, or building deployment pipelines for AI applications, the policy's requirements around data classification, network isolation, logging, and access control translate into concrete infrastructure design decisions.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Platform engineers must ensure that AI infrastructure enforces the policy's data classification requirements — for example, ensuring that AI endpoints processing sensitive data are deployed with private networking.
- Logging and audit trail requirements from the policy must be implemented at the infrastructure level.

**Common pitfalls:**
- Provisioning AI infrastructure without verifying that the use case has been registered and classified in the AI Register.
- Treating AI Policy compliance as an application-level concern only; infrastructure configuration (networking, access control, logging) is equally governed.
- Not applying the same security standards to AI endpoints as to other production APIs.

---

## 9. AI-Powered Development for DevOps and Platform Engineers

AI-assisted development tools are changing how infrastructure code, pipeline definitions, and automation scripts are written and maintained. For DevOps and platform engineers, these tools can accelerate the creation of Bicep/Terraform modules, Kubernetes manifests, pipeline YAML, PowerShell scripts, and documentation — tasks that often involve repetitive patterns and well-documented syntax.

AI assistants are most effective for infrastructure work when given precise context: the target cloud provider, the existing naming conventions, the required compliance constraints, and the specific resource types involved. They can generate first drafts of infrastructure-as-code templates, suggest pipeline stages, explain unfamiliar Kubernetes error messages, and help translate between IaC languages.

**Code walkthrough:**

```bash
#!/usr/bin/env bash
# Step 1: A script that uses AI to assist with infrastructure code generation
# Why: AI accelerates boilerplate-heavy tasks but output must always be validated

set -euo pipefail

# Step 2: Use AI to generate a first draft of a Terraform module
# Why: Terraform modules follow predictable patterns — good for AI generation
cat <<'PROMPT' > /tmp/ai-prompt.txt
Generate a Terraform module for an Azure Container App with:
- Private VNet integration
- Managed identity for Key Vault access
- Minimum 2 replicas, max 10 with HTTP scaling
- Resource naming follows pattern: {project}-{environment}-{resource}
- Include all required variables and outputs
PROMPT

# Step 3: Send to approved AI endpoint (respecting organisational AI Policy)
# Why: never use unapproved AI services; follow data classification rules
RESPONSE=$(curl -s https://myorg-openai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-10-21 \
  -H "Authorization: Bearer $AI_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @- <<EOF
{
  "messages": [{"role": "user", "content": "$(cat /tmp/ai-prompt.txt)"}],
  "temperature": 0.2
}
EOF
)

# Step 4: ALWAYS validate AI-generated infrastructure code through pipeline gates
# Why: AI can generate plausible-looking code with security misconfigurations
echo "=== Running validation on generated Terraform ==="
terraform fmt -check
terraform validate
tflint --module

# Step 5: Run policy checks — AI does not know your organisational standards
# Why: AI-generated code may use overly permissive access controls or wrong SKUs
conftest test . --policy ../policies/
echo "=== All validation passed — code is ready for human review ==="
```

**Why it matters:** Senior DevOps engineers who understand how to use AI tools effectively can significantly accelerate platform development — particularly for boilerplate-heavy tasks like writing Bicep modules, Helm charts, or pipeline definitions. Equally important is understanding the limitations: AI-generated infrastructure code can contain subtle misconfigurations that create security vulnerabilities or cost overruns.

**Key things to understand:**
- AI tools are effective for generating infrastructure boilerplate, but every generated template must be reviewed for security misconfigurations, overly permissive access controls, and compliance with organisational standards.
- Infrastructure-as-code generated by AI must be validated through the same pipeline gates (linting, policy checks, plan/what-if review) as human-written code.
- AI assistants can help explain and debug complex Kubernetes, Terraform, or pipeline configurations, reducing the time to diagnose issues.
- Data privacy applies to AI tool use: do not paste production secrets, connection strings, or customer data into AI assistants. Follow the organisation's AI Policy for approved tools.

**Common pitfalls:**
- Accepting AI-generated infrastructure code without reviewing it against organisational security policies and naming conventions.
- Using AI to generate Kubernetes manifests or Helm charts without verifying resource limits, security contexts, and network policies.
- Over-relying on AI for troubleshooting without developing the underlying understanding of the systems being managed.
- Not establishing team conventions around AI tool use in infrastructure work, leading to inconsistent patterns across the platform.

---

## EU Compliance for DevOps / Platform Engineers

Senior DevOps and Platform Engineers operating infrastructure for EU financial services must understand and implement the requirements of NIS2 (Network and Information Security Directive 2) and DORA (Digital Operational Resilience Act). These regulations establish legally binding obligations for the security, resilience, and incident reporting capabilities of ICT systems — and platform engineers are the people who build and operate the infrastructure that must satisfy these requirements. NIS2 classifies financial services as "essential entities" subject to the highest tier of obligations, while DORA specifically targets digital operational resilience in the financial sector with detailed technical requirements that became applicable in January 2025.

NIS2 incident reporting requirements are among the most operationally demanding obligations for platform engineers. Essential entities must submit an early warning to the competent authority (MSB — the Swedish Civil Contingencies Agency — for NIS2 in Sweden) within 24 hours of becoming aware of a significant incident, followed by a full notification within 72 hours. This is significantly tighter than GDPR's 72-hour window and requires pre-established automation, templates, and communication channels. Platform engineers must build monitoring and alerting systems that can detect significant incidents rapidly, automatically classify their severity, and trigger the notification workflow with minimal manual intervention.

DORA imposes specific requirements for digital operational resilience testing that directly affect platform engineering. Article 25 requires regular testing of ICT systems, including vulnerability assessments, open-source analysis, network security assessments, gap analyses, physical security reviews, and compliance scanning. For significant financial entities, Article 26 requires advanced threat-led penetration testing (TLPT) at least every three years, conducted according to the TIBER-EU framework. Platform engineers must design infrastructure that supports these testing requirements — including isolated testing environments, comprehensive logging for test evidence, and the ability to simulate failure scenarios without affecting production services.

DORA's ICT third-party risk management (Article 28-30) requires financial entities to maintain a complete register of all ICT service providers, assess their criticality, include contractual exit strategies, and conduct ongoing monitoring. For platform engineers who provision cloud infrastructure, this means every Azure service, SaaS tool, and managed platform component must be documented in the ICT third-party register with its criticality classification, contractual terms, and exit strategy. Critical ICT providers are subject to direct oversight by EU supervisory authorities (the ESAs), and platform engineers must be prepared to demonstrate that their infrastructure dependencies can be migrated or replaced if required.

**Code walkthrough:**

```python
# DORA resilience testing automation for platform infrastructure
# Implements Article 25 (ICT testing) and NIS2 incident classification
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
from enum import Enum
import json

class NIS2IncidentSeverity(Enum):
    LOW = "low"
    SIGNIFICANT = "significant"        # Triggers 24-hour early warning
    SUBSTANTIAL_IMPACT = "substantial"  # Triggers individual notification

@dataclass
class DORAResilienceTest:
    """Track DORA-mandated resilience testing activities."""
    test_id: str
    test_type: str  # "vulnerability_scan", "penetration_test", "failover_drill"
    target_system: str
    executed_at: datetime
    passed: bool
    findings: list[str]
    evidence_path: str  # Path to test report for regulatory audit

@dataclass
class NIS2IncidentReport:
    incident_id: str
    detected_at: datetime
    severity: NIS2IncidentSeverity
    affected_services: list[str]
    description: str

    @property
    def early_warning_deadline(self) -> datetime:
        """NIS2: 24 hours for early warning to competent authority (MSB)."""
        return self.detected_at + timedelta(hours=24)

    @property
    def full_notification_deadline(self) -> datetime:
        """NIS2: 72 hours for full incident notification."""
        return self.detected_at + timedelta(hours=72)

def run_dora_resilience_suite(infrastructure_config: dict) -> list[DORAResilienceTest]:
    """Execute DORA Article 25 mandated resilience tests.
    Why automate? DORA requires regular testing — manual processes miss schedules."""
    results = []
    now = datetime.now(timezone.utc)

    # Vulnerability assessment — required by DORA Article 25
    results.append(DORAResilienceTest(
        test_id=f"DORA-VULN-{now.strftime('%Y%m%d')}",
        test_type="vulnerability_scan",
        target_system="production-aks-cluster",
        executed_at=now,
        passed=True,
        findings=["CVE-2025-1234: low severity, patched in next cycle"],
        evidence_path="/audit/dora/vuln-scan-report.pdf",
    ))

    # Failover drill — validates disaster recovery capability
    results.append(DORAResilienceTest(
        test_id=f"DORA-FAILOVER-{now.strftime('%Y%m%d')}",
        test_type="failover_drill",
        target_system="claims-api-westeurope",
        executed_at=now,
        passed=True,
        findings=["RTO achieved: 4 minutes (target: 15 minutes)"],
        evidence_path="/audit/dora/failover-drill-report.pdf",
    ))

    # Generate compliance summary for regulatory reporting
    print(json.dumps({
        "dora_test_suite": "quarterly_resilience",
        "date": now.isoformat(),
        "tests_run": len(results),
        "all_passed": all(r.passed for r in results),
        "findings_count": sum(len(r.findings) for r in results),
    }, indent=2))
    return results
```

> **Why it matters:** DORA penalties can reach 1% of average daily worldwide turnover applied daily until compliance is achieved. NIS2 penalties for essential entities can reach 10 million EUR or 2% of global turnover. Both regulations hold senior management personally accountable for ICT risk management. Platform engineers who build automated resilience testing, incident detection, and regulatory reporting into the infrastructure ensure that the organisation can demonstrate compliance under audit — not just claim it in documentation.
