export const content = {
  overview: `# DevOps / Platform Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

DevOps and Platform Engineers build and maintain the infrastructure, pipelines, and tooling that enable teams to ship software reliably. The role covers CI/CD, cloud infrastructure, containerisation, scripting, observability, and platform security.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| DevOps Overview | [Every DevOps Tool Explained in 8 min](https://www.youtube.com/watch?v=EY1hsh-HCjo) | Video |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| DevOps Roadmap | [roadmap.sh – DevOps](https://roadmap.sh/devops) | Interactive |
| DevOps Literacy | [DevOps Literacy – Pluralsight](https://app.pluralsight.com/paths/skills/devops-literacy) | Course |
| Linux Fundamentals | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |
| Bash Scripting | [Bash Scripting Tutorial – Ryan's Tutorials](https://ryanstutorials.net/bash-scripting-tutorial/) | Interactive |
| Git | [Git Fundamentals](Prerequisites/git.md) and [Branching Strategy](Prerequisites/Branching-Strategy.md) | Guide |

### After completing Beginner you should be able to:

- Explain the DevOps philosophy and the CALMS framework (Culture, Automation, Lean, Measurement, Sharing)
- Explain the difference between CI, Continuous Delivery, and Continuous Deployment
- Build and run a Docker container from a Dockerfile, including multi-stage builds
- Navigate the Linux file system and manage processes from the command line
- Write basic Bash scripts (variables, loops, conditionals, exit codes)
- Diagnose basic networking issues using DNS lookups, port checks, and HTTP status codes
- Write simple Python scripts for DevOps automation tasks
- Explain IaaS, PaaS, and SaaS and the shared responsibility model

For deep explanations of each concept, see the [Beginner Concept Reference](DevOps-Platform-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| System Design | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| System Design Beginner | [System Design for Beginners](https://www.youtube.com/watch?v=m8Icp_Cid5o) | Video |
| CI/CD and Pipelines | [GitHub Actions – Understanding workflows](https://docs.github.com/en/actions/using-workflows) | Docs |
| Azure Fundamentals | [Microsoft Learn – Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/) | Interactive |
| Infrastructure as Code | [Microsoft Learn – Bicep Fundamentals](https://learn.microsoft.com/en-us/training/paths/fundamentals-bicep/) | Interactive |
| Terraform | [HashiCorp – Get Started with Terraform on Azure](https://developer.hashicorp.com/terraform/tutorials/azure-get-started) | Interactive |
| PowerShell | [Automate Tasks with PowerShell – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/powershell/) | Interactive |
| Kubernetes Basics | [roadmap.sh – Kubernetes](https://roadmap.sh/kubernetes) | Interactive |
| Observability | [Monitor Resources with Azure Monitor – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/) | Interactive |
| OpenTelemetry | [OpenTelemetry – Getting Started](https://opentelemetry.io/docs/getting-started/) | Docs |
| Generative AI for IT | [Generative AI for IT Pros – Pluralsight](https://app.pluralsight.com/paths/skill/generative-ai-for-it-pros) | Course |
| Azure Policy | [Microsoft Learn – Intro to Azure Policy](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-policy/) | Interactive |
| Cost Management | [Microsoft Learn – Control Azure Spending](https://learn.microsoft.com/en-us/training/paths/control-spending-manage-bills/) | Interactive |

### After completing Mid you should be able to:

- Build a YAML-based CI/CD pipeline with stages, jobs, and steps
- Deploy infrastructure with Bicep and Terraform using plan/apply and what-if workflows
- Write PowerShell automation scripts for Azure management tasks
- Explain the difference between a Pod, Deployment, and Service in Kubernetes
- Configure Kubernetes deployments, services, and basic ingress
- Set up Azure Monitor diagnostic settings, KQL alert rules, and dashboards
- Instrument an application with OpenTelemetry and explain the three pillars of observability
- Define and assign Azure Policy rules to enforce organisational standards across subscriptions
- Apply horizontal and vertical scaling strategies and explain the trade-offs between them
- Describe the CAP theorem and how it influences database selection and replication design

For deep explanations of each concept, see the [Mid Concept Reference](DevOps-Platform-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| AI/ML for Platform Engineers | [AI, ML, Deep Learning and GenAI Explained](https://www.youtube.com/watch?v=qYNweeDHiyU) | Video |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | 🔒 Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | 🔒 Internal |
| AI-Assisted Development | [GitHub Copilot – Getting Started](https://docs.github.com/en/copilot/getting-started-with-github-copilot) | Docs |
| Platform Engineering / Cloud Architecture | [Microsoft Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/) — Landing zones, governance, and cloud strategy | Docs |
| Architecture | [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) — Operational excellence, security, reliability, performance, cost | Docs |
| Pipeline Security | [Microsoft Learn – Secure DevOps (AZ-400)](https://learn.microsoft.com/en-us/training/paths/az-400-develop-security-compliance-plan/) — Security in pipelines, SAST, DAST, compliance | Course |
| Platform Engineering | [CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) — Industry definition of platform engineering | Paper |
| GitOps | [Flux – Getting Started](https://fluxcd.io/flux/get-started/) | Docs |
| Container Security | [Microsoft Learn – Container Image Security in ACR](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-best-practices#manage-image-vulnerability) | Docs |

### After completing Senior you should be able to:

- Design a multi-environment infrastructure strategy using landing zones and hub-and-spoke topology
- Define platform engineering standards and golden paths for a development organisation
- Apply cloud-native architecture patterns (microservices, event-driven, circuit breaker, sidecar) and evaluate their operational trade-offs
- Evaluate and harden the security posture of a pipeline: secrets management, SAST/DAST gates, supply chain integrity, and least-privilege service principal scoping
- Apply Domain-Driven Design to draw team and platform boundaries that reduce coupling
- Design and operate enterprise GenAI infrastructure on Azure, including private networking, quota management, and cost observability
- Explain the distinction between AI, machine learning, deep learning, and generative AI, and articulate the infrastructure implications of each

For deep explanations of each concept, see the [Senior Concept Reference](DevOps-Platform-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
  beginner: `
# DevOps / Platform Engineer – Beginner Concept Reference

This document provides in-depth explanations of the core concepts covered at the Beginner level. Use it alongside the resources in the learning path to build a solid foundation before moving on to the Mid level.

---

## 1. DevOps Philosophy – Culture, Automation and Feedback Loops

DevOps is a set of cultural and technical practices that brings development and operations teams together with a shared goal: delivering software reliably and frequently. It is not a tool or a job title. At its core, DevOps rests on three ideas – culture, automation, and feedback. Culture means that teams share responsibility for the full software lifecycle, from writing code to running it in production. Automation means removing manual, error-prone steps wherever possible. Feedback means measuring outcomes and using those measurements to improve continuously.

A useful framework for understanding DevOps in practice is CALMS: Culture (shared ownership and blameless learning), Automation (eliminating manual steps), Lean (small batch sizes and fast flow), Measurement (using data to understand system behaviour), and Sharing (transparency of knowledge and tooling across teams).

The "Every DevOps Tool Explained" video captures this landscape concisely: it demonstrates that tools like Git, GitHub, Docker, Kubernetes, Terraform, Ansible, Jenkins, Prometheus, and Grafana each solve a specific problem in the lifecycle — from source control and collaboration, through packaging and orchestration, to infrastructure provisioning and observability. Understanding which tool solves which problem is the first step to reasoning about a DevOps toolchain.

**Why it matters:** A DevOps engineer exists to remove the friction between writing code and running code in production. Without a clear understanding of the underlying philosophy, it is easy to implement tools without achieving the actual goal. Knowing that DevOps is about shortening feedback loops helps you design pipelines, infrastructure, and processes that serve that purpose rather than adding ceremony.

**Key things to understand:**

- The Three Ways: Flow (work moves fast from dev to ops), Feedback (problems surface quickly), Continual Learning (failures become learning opportunities).
- DevOps is not about a specific toolset; tools serve the philosophy.
- Shared ownership means both developers and operations engineers are accountable for reliability.
- A blameless culture encourages reporting and learning from incidents rather than hiding them.
- CALMS: Culture, Automation, Lean, Measurement, Sharing – a concrete framework for assessing DevOps maturity.
- The DevOps toolchain spans source control (Git/GitHub/GitLab), CI/CD (GitHub Actions, Jenkins, CircleCI), containerisation (Docker, Kubernetes), IaC (Terraform, Ansible), and observability (Prometheus, Grafana, ELK stack).

**Common pitfalls:**

- Treating DevOps as purely a tooling exercise and neglecting the cultural dimension.
- Siloing the "DevOps team" as a separate unit rather than embedding practices across all teams.
- Skipping feedback mechanisms and only focusing on delivery speed.
- Confusing DevOps with Agile; they are complementary but distinct.

---

## 2. Continuous Integration and Continuous Delivery (CI/CD)

### CI/CD Pipeline Overview

\`\`\`mermaid
flowchart LR
    A[Code] --> B[Build]
    B --> C[Test]
    C --> D[Stage]
    D --> E[Deploy]
    E --> F[Monitor]
    F -->|Feedback| A
\`\`\`

Continuous Integration (CI) is the practice of merging code changes into a shared branch frequently – typically multiple times per day – and validating each merge with automated builds and tests. The goal is to surface integration problems as early and cheaply as possible.

Continuous Delivery (CD) extends CI by ensuring that the validated code is always in a deployable state, ready to be released to production at any time. A human still decides when to trigger the release. Continuous Deployment goes one step further: every validated change is released to production automatically, without manual approval. The distinction matters because Continuous Deployment requires a much higher level of automated test coverage and organisational confidence.

**Why it matters:** CI/CD is the backbone of modern software delivery. As a DevOps engineer you will design, build, and maintain the pipelines that implement these practices. Understanding the distinction between CI, Continuous Delivery, and Continuous Deployment helps you design pipelines that match the organisation's risk appetite and release cadence.

**Key things to understand:**

- CI requires a trigger – typically a push or pull request to a branch – that kicks off a build and test run.
- A pipeline should fail fast: run the cheapest and quickest checks first so developers get feedback in seconds, not hours.
- Continuous Delivery means the artifact is production-ready; a human still decides when to ship.
- Continuous Deployment removes that human gate; it requires high automated test coverage and confidence.
- Artifacts (compiled binaries, container images) should be built once and promoted through environments, not rebuilt per environment.

**Common pitfalls:**

- Long-running pipelines that discourage frequent commits.
- Testing only in one environment and skipping integration or end-to-end tests.
- Conflating Continuous Delivery with Continuous Deployment.
- Allowing pipeline scripts to differ between environments, which breaks the "build once, deploy many" principle.

---

## 3. Docker – Containers, Images, Dockerfile and Compose

### Container Lifecycle

\`\`\`mermaid
flowchart TB
    A[Dockerfile] --> B[docker build]
    B --> C[Image]
    C --> D[docker run]
    D --> E[Container Running]
    E --> F[docker stop]
    F --> G[Container Stopped]
    G --> D
    C --> H[Registry Push/Pull]
\`\`\`

Docker is a platform for packaging, distributing, and running applications inside containers. A container is an isolated process running on the host operating system: it shares the host kernel but has its own isolated file system, network stack, and process namespace. Containers are not virtual machines – there is no hypervisor and no guest OS; they are lightweight and start in milliseconds. An image is the read-only blueprint from which containers are created. A Dockerfile is a text file containing the instructions to build an image layer by layer. Docker Compose is a tool for defining and running multi-container applications using a single YAML file.

The "Learn Docker in 7 Easy Steps" video makes this concrete: a Dockerfile is a blueprint for building an image; an image is a template for running containers; a container is a running process of that image. One image can be used to spawn the same process multiple times in multiple places — which is exactly what orchestration tools like Kubernetes leverage. A key insight from the video is layer caching: because Docker caches each instruction as a layer, you should install dependencies (e.g., \`npm install\`) before copying application source code, so that dependency layers are reused on every build where only application code changed.

A minimal Dockerfile looks like this:

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
\`\`\`

Each instruction (\`FROM\`, \`RUN\`, \`COPY\`) adds a cached layer. If only \`app.py\` changes, Docker reuses all previous layers and only rebuilds from the \`COPY . .\` instruction onwards, keeping builds fast.

**Why it matters:** Containers solve the classic "it works on my machine" problem. By packaging the application and its environment together, you guarantee that what runs locally is identical to what runs in staging and production. DevOps engineers use Docker to build images in CI pipelines, push them to container registries, and deploy them to orchestration platforms such as Kubernetes.

**Key things to understand:**

- Images are immutable and layered; each instruction in a Dockerfile adds a layer that is cached independently.
- Containers share the host kernel – they are isolated processes, not full virtual machines.
- Containers are ephemeral; persistent data must be stored in volumes or external storage.
- The base image matters: using a minimal base image (such as a slim or distroless variant) reduces attack surface and image size.
- Multi-stage builds allow you to compile code in one stage and copy only the final artifact into a smaller production image.
- Docker Compose is suited for local development environments; it is not a production orchestration tool.
- Port forwarding (\`-p host:container\`) maps a container port to a host port; containers do not expose ports to the outside world by default.
- A \`.dockerignore\` file prevents unnecessary files (like \`node_modules\` or \`.git\`) from being copied into the build context, keeping builds fast and images lean.

**Common pitfalls:**

- Running containers as root, which creates an unnecessary security risk.
- Storing secrets in environment variables baked into the image rather than injecting them at runtime.
- Ignoring the \`.dockerignore\` file and copying unnecessary files (node_modules, .git) into the build context.
- Not pinning base image versions, which leads to non-reproducible builds.

---

## 4. Linux – File System, Permissions and Process Management

Linux is the operating system that underlies the vast majority of cloud infrastructure, containers, and CI/CD agents. Understanding Linux means knowing how the file system is organised, how file permissions work, and how to inspect and control running processes. These are not advanced skills; they are the baseline required to work confidently on any server or inside any container.

**Why it matters:** Almost every pipeline, container, and cloud virtual machine runs on Linux. When something breaks in production, you need to be able to SSH into a host, inspect logs, check running processes, and understand file ownership issues without relying on a graphical interface. These skills are the foundation of every other operational task.

**Key things to understand:**

- The Linux file system hierarchy: \`/etc\` for system configuration files, \`/var\` for variable data and logs (e.g. \`/var/log\`), \`/home\` for user home directories, \`/usr/bin\` and \`/bin\` for executable programs, \`/tmp\` for temporary files that are cleared on reboot.
- File permissions are expressed as three sets of read/write/execute bits for owner, group, and others. The \`chmod\` and \`chown\` commands control them.
- Every process has a PID (process ID) and runs under a user. \`ps\`, \`top\`, and \`htop\` are essential tools for inspection.
- Signals control processes: \`SIGTERM\` requests graceful shutdown; \`SIGKILL\` forces immediate termination without cleanup.
- Standard streams: stdin (0), stdout (1), stderr (2). Redirecting (\`>\`, \`2>\`) and piping (\`|\`) these is fundamental to scripting.

**Common pitfalls:**

- Setting permissions too broadly (e.g. \`chmod 777\`) to solve a problem quickly, creating security vulnerabilities.
- Forgetting that processes inside containers run as a user; root inside a container can still be dangerous if the container escapes.
- Confusing hard links and symbolic links.
- Not understanding that file descriptors remain open even after a file is deleted, which can cause disk space issues.

---

## 5. Bash Scripting – Variables, Loops, Conditionals and Scripts

Bash (Bourne Again Shell) is both a command-line interpreter and a scripting language. A Bash script is a plain text file containing a sequence of shell commands that the interpreter executes in order. Bash supports variables, conditionals, loops, functions, and input/output redirection, making it a powerful tool for automating repetitive tasks on Linux systems.

Here is a concrete example that shows the core building blocks together:

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="\${1:-staging}"

if [[ "$ENVIRONMENT" == "production" ]]; then
  echo "Deploying to production – proceeding with caution"
elif [[ "$ENVIRONMENT" == "staging" ]]; then
  echo "Deploying to staging"
else
  echo "Unknown environment: $ENVIRONMENT" >&2
  exit 1
fi

for SERVICE in api worker scheduler; do
  echo "Restarting $SERVICE..."
  # systemctl restart "$SERVICE"
done
\`\`\`

Note: variables are assigned without spaces around \`=\` (\`ENVIRONMENT="staging"\`), and always referenced with double quotes (\`"$ENVIRONMENT"\`) to prevent word splitting when values contain spaces.

**Why it matters:** Bash scripts are the glue of automation. Pipeline steps, infrastructure setup scripts, and deployment helpers are routinely written in Bash because it is available on virtually every Linux system without installation. Understanding Bash lets you read, debug, and write the scripts that CI/CD systems execute.

**Key things to understand:**

- Always start a script with a shebang line: \`#!/usr/bin/env bash\`.
- Use \`set -euo pipefail\` at the top of scripts: \`-e\` exits on error, \`-u\` treats unset variables as errors, \`-o pipefail\` propagates pipe failures.
- Variables are assigned without spaces around \`=\` and referenced with \`$\`: \`name="world"\` then \`echo "$name"\`.
- Single quotes prevent all expansion (\`'$VAR'\` is literal). Double quotes allow variable and command substitution (\`"$VAR"\` expands).
- Exit codes: 0 means success; any non-zero value means failure. Check with \`$?\` or use \`||\` and \`&&\` for inline control flow.
- \`if [[ condition ]]\`, \`for item in list; do ... done\`, and \`while [[ condition ]]; do ... done\` cover most control flow needs.

**Common pitfalls:**

- Not quoting variables, leading to subtle bugs when values contain spaces.
- Forgetting \`set -e\`, allowing scripts to continue after a command fails silently.
- Using \`ls\` output in loops, which breaks on filenames with spaces; use globs (\`for f in /path/*\`) instead.
- Writing overly long scripts in Bash when a language like Python would be more maintainable and testable.

---

## 6. Version Control in a DevOps Context – Branching, Tagging and Release Flow

Version control – almost universally Git in modern environments – is the system that tracks changes to code over time, enables collaboration, and provides the audit trail required for controlled releases. In a DevOps context, version control is not just a storage mechanism; it is the trigger for automated pipelines and the source of truth for both application code and infrastructure definitions.

The "Every DevOps Tool Explained" video highlights the ecosystem built on top of Git: GitHub adds social collaboration features (pull requests, issues, forks, marketplace integrations), GitLab provides a complete DevOps platform with built-in CI/CD out of the box, and GitHub Actions transforms GitHub repositories into CI/CD engines by triggering workflows on pushes or pull requests. Understanding these layers — Git as the foundation, platforms as the collaboration layer, and pipeline tools as the automation layer — helps you choose and configure the right tools for a team.

**Why it matters:** Every CI/CD pipeline is driven by events in version control: a push, a pull request, or a tag. DevOps engineers need to understand branching strategies because they directly affect pipeline design. They also manage infrastructure-as-code and pipeline definitions in the same repository, so Git skills are inseparable from day-to-day work.

**Key things to understand:**

- Trunk-based development keeps a single long-lived branch and uses short-lived feature branches, enabling frequent integration.
- GitFlow uses longer-lived branches (develop, release, hotfix) and suits teams with fixed release schedules.
- Tags mark specific commits as significant – typically a release version. Semantic versioning (MAJOR.MINOR.PATCH) is the standard convention.
- Pull requests (or merge requests) are the gate through which code enters the main branch; they are the natural point to trigger CI.
- \`.gitignore\` prevents committing secrets, build artifacts, and IDE configuration files.
- Commit messages should be descriptive and follow a convention (such as Conventional Commits) to support automated changelog generation.

**Common pitfalls:**

- Committing secrets or credentials to a repository; once pushed, they must be considered compromised even if deleted later.
- Long-lived feature branches that accumulate large diffs and cause painful merge conflicts.
- Not using tags for releases, making it difficult to reproduce a specific deployed version.
- Force-pushing to shared branches, which rewrites history and disrupts collaborators.

---

## 7. Networking Fundamentals for DevOps – DNS, HTTP, TCP/IP and Ports

Networking is the invisible fabric that connects every component in a modern system. A DevOps engineer does not need to be a network engineer, but a solid grasp of DNS, HTTP, TCP/IP, and port mechanics is essential for debugging connectivity issues, configuring firewalls, and understanding how traffic flows from user to application.

**Why it matters:** When a deployment fails with "connection refused" or an application cannot reach its database, the root cause is almost always a networking problem: a wrong DNS record, a missing firewall rule, a port not exposed, or an application binding to the wrong interface.

**Key things to understand:**

- **IP addresses** uniquely identify a device on a network. IPv4 addresses (e.g. \`10.0.1.5\`) are still dominant in cloud infrastructure. Private ranges (\`10.x.x.x\`, \`172.16-31.x.x\`, \`192.168.x.x\`) are used inside VNets.
- **DNS** translates domain names to IP addresses. A records map a domain to an IPv4 address. CNAME records alias one domain to another. TTL controls caching duration.
- **TCP/IP** is the foundational protocol suite. TCP provides reliable, ordered delivery. UDP provides fast, unreliable delivery.
- **Ports** identify specific services on a host. Well-known ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 5432 (PostgreSQL), 6379 (Redis).
- **HTTP** follows a request-response model with methods (GET, POST, PUT, DELETE) and status codes (2xx success, 3xx redirect, 4xx client error, 5xx server error).
- **Firewalls and Security Groups** control traffic by port, protocol, and source IP.

**Common pitfalls:**

- Assuming DNS changes propagate instantly; TTL means old records can persist for hours.
- Confusing \`localhost\` inside a container with the host machine's address.
- Not understanding that containers have their own network namespace.

---

## 8. Python for DevOps – Scripting Beyond Bash

While Bash is ideal for short automation tasks, Python is the go-to language when scripts grow beyond simple command execution. Python's readability, error handling, and ecosystem make it the better choice for API integrations, data processing, cloud automation, and testable scripts.

**Why it matters:** DevOps automation frequently involves interacting with REST APIs, parsing JSON responses, and producing structured output that pipelines can consume.

**Key things to understand:**

- Use \`#!/usr/bin/env python3\` as the shebang line.
- Structure scripts with functions and a \`main()\` entry point guarded by \`if __name__ == "__main__":\`.
- Use \`sys.exit(0)\` for success and \`sys.exit(1)\` for failure.
- The \`json\` module parses and serialises JSON without external dependencies.
- Use \`try/except\` blocks around network calls and file operations.
- Virtual environments (\`python -m venv .venv\`) isolate dependencies per project.

**Common pitfalls:**

- Not handling exceptions in scripts that call external APIs.
- Installing packages globally instead of using a virtual environment.
- Writing scripts without functions, making them impossible to unit test.

---

## 9. Multi-Stage Docker Builds and Container Best Practices

A multi-stage build uses multiple \`FROM\` instructions. The first stage builds the application; the final stage copies only the finished artifact into a minimal production image. This reduces image size and attack surface.

**Why it matters:** Smaller images mean faster pulls, faster deployments, and fewer vulnerabilities. Multi-stage builds separate the build environment from the runtime environment.

**Key things to understand:**

- Multi-stage builds use \`FROM ... AS <name>\` and \`COPY --from=<name>\` to transfer artifacts between stages.
- Only the final stage layers are included in the shipped image.
- Always run containers as a non-root user with the \`USER\` instruction.
- Pin base image versions (\`node:20-alpine\`, not \`node:latest\`).
- Prefer \`CMD\` in exec form (\`["node", "server.js"]\`) for proper signal handling.

**Common pitfalls:**

- Shipping development tools in the production image.
- Misusing \`ENTRYPOINT\` and \`CMD\`; \`ENTRYPOINT\` defines the executable, \`CMD\` provides default arguments.
- Not leveraging the Docker build cache.

---

## 10. Introduction to Cloud Concepts and Infrastructure

Cloud computing delivers computing resources over the internet, on demand, with pay-as-you-go pricing. The three major providers are AWS, Azure, and GCP.

**Why it matters:** Every DevOps role in 2025-2026 involves cloud infrastructure. Understanding service models helps you choose the right abstraction level.

**Key things to understand:**

- **IaaS**: You manage the OS and up. Examples: AWS EC2, Azure VMs.
- **PaaS**: You manage application code and data only. Examples: Azure App Service.
- **SaaS**: You consume a fully managed application. Examples: Microsoft 365, GitHub.
- **Shared Responsibility Model**: The provider secures infrastructure; you secure workloads, data, and access controls.
- **Regions and Availability Zones**: Deploying across zones protects against single data centre failures.
- Cloud resources are billed by usage. Tags enable cost tracking and ownership identification.

**Common pitfalls:**

- Leaving test resources running and incurring unexpected charges.
- Not understanding the shared responsibility model.
- Deploying to a single availability zone.

---
`,
  mid: `
# DevOps / Platform Engineer – Mid Concept Reference

This document provides in-depth explanations of the core concepts covered at the Mid level. Use it alongside the resources in the learning path to deepen your technical knowledge before moving on to the Senior level.

---

## 1. YAML CI/CD Pipelines – Structure, Jobs and Steps

Modern CI/CD platforms commonly define pipelines in YAML files stored alongside application code. The exact filename varies by platform — for example \`.github/workflows/ci.yml\`, \`.gitlab-ci.yml\`, or another repository-local pipeline file. Regardless of platform, the core concepts are similar: a pipeline is triggered by repository events, contains one or more jobs, and each job contains a sequence of steps. Some platforms also group jobs into higher-level stages for approval or environment flow.

Here is a minimal platform-neutral example showing the hierarchy:

\`\`\`yaml
on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - run: dotnet build
      - run: dotnet test --no-build

  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo "Deploying to staging"
\`\`\`

The exact keywords vary by platform, but the same ideas appear everywhere: one block defines what events start the pipeline, one defines where jobs run, and dependency keys control sequencing.

**Why it matters:** YAML pipelines are the primary mechanism for automating builds, tests, and deployments in modern delivery platforms. Being able to read, write, debug, and refactor pipeline definitions is a core daily skill. Understanding the structural hierarchy prevents common mistakes around variable scoping, parallelism, and environment targeting.

**Key things to understand:**

- The hierarchy is typically: pipeline > stage (optional) > job > step. Each level can define its own variables and conditions.
- Dependency keys such as \`needs\` or \`dependsOn\` control sequencing between stages and jobs.
- Templates allow you to extract reusable stage, job, or step definitions into separate files and reference them with parameters.
- Shared variables and secret stores let you inject runtime configuration without hardcoding values in the pipeline definition.
- Environments represent deployment targets (such as staging or production) and often support approvals, protection rules, and deployment history.
- Hosted runners are ephemeral and reset between runs; self-hosted runners persist state between runs.

**Common pitfalls:**

- Hardcoding environment-specific values instead of using variables or parameters.
- Not using templates, leading to duplicated pipeline code across repositories.
- Storing secrets as plain-text pipeline variables instead of linking to a secret store or cloud vault.
- Forgetting that jobs in the same stage share no file system state unless artifacts are explicitly published and downloaded.

---

## 2. System Design Fundamentals – Scaling, Networking and Databases

System design is the discipline of making deliberate architectural choices about how components fit together, communicate, scale, and handle failures. For a DevOps or platform engineer, system design knowledge is not optional — it determines whether the infrastructure you build can actually support the workloads it is supposed to serve.

The "System Design Concepts in 10 min" video provides a tightly structured overview of the core vocabulary. Starting from a single server, it traces the path to scalable distributed systems through vertical scaling (adding resources to one machine), horizontal scaling (adding more machines), load balancers, CDNs, caching hierarchies, DNS, HTTP and API patterns, SQL and NoSQL databases, sharding, replication, the CAP theorem, and message queues. Each concept builds on the previous one.

Key mental models to internalise:

- **Vertical vs horizontal scaling**: Vertical scaling (bigger machine) is simple but has a hard ceiling. Horizontal scaling (more machines) is more complex — it requires a load balancer, stateless application design, and consistency decisions — but scales nearly infinitely and eliminates single points of failure.
- **Load balancers**: A load balancer is a reverse proxy that distributes incoming requests across a pool of servers. Algorithms like round-robin or consistent hashing ensure no single server becomes a bottleneck.
- **Caching**: Data is expensive to fetch repeatedly. Browsers cache to disk; applications cache in memory; CDNs cache static assets globally close to users. Each level trades freshness for speed.
- **DNS**: The Domain Name System translates human-readable domain names to IP addresses. DNS A records map a domain to a server IP. Your OS caches DNS results so it does not make a query on every request.
- **API patterns**: REST is stateless and uses standard HTTP methods and status codes. GraphQL (developed by Facebook) lets clients specify exactly the data they need, eliminating over-fetching. gRPC uses Protocol Buffers (binary, more efficient than JSON) and is primarily used for server-to-server communication. WebSockets enable bi-directional, real-time communication — appropriate for chat applications and live dashboards.
- **SQL vs NoSQL**: Relational databases are ACID-compliant (Atomic, Consistent, Isolated, Durable) and enforce data relationships. NoSQL databases drop the consistency constraint to enable horizontal scaling through sharding.
- **CAP theorem**: In a distributed database, you can only guarantee two of: Consistency (every read returns the latest write), Availability (every request gets a response), and Partition tolerance (the system continues operating despite network partitions). This forces trade-offs in database selection.
- **Message queues**: Decouple producers from consumers, absorb traffic spikes, and enable reliable asynchronous processing. Azure Service Bus, RabbitMQ, and Kafka are common choices.

**Why it matters:** DevOps engineers provision and scale the infrastructure that systems run on. If you do not understand the difference between vertical and horizontal scaling, you cannot make informed decisions about when to resize a VM versus add replicas. If you do not understand the CAP theorem, you cannot advise on database selection for a high-availability workload.

**Key things to understand:**

- Stateless application design is a prerequisite for horizontal scaling; session state must live in a shared store (Redis, database), not in process memory.
- A single point of failure in any layer — server, database, load balancer — can cause complete system unavailability; design for redundancy at each layer.
- Caching is most effective for read-heavy, slowly-changing data; it introduces staleness risk and cache invalidation complexity.
- Sharding and replication solve different problems: sharding distributes write load across partitions; replication scales reads and provides redundancy.

**Common pitfalls:**

- Scaling vertically until the ceiling is hit, then having to redesign the application for horizontal scaling under pressure.
- Introducing caching without a cache invalidation strategy, leading to stale data bugs.
- Choosing a NoSQL database for a use case that genuinely requires relational integrity, then rebuilding the constraints in application code.
- Neglecting network partitions in distributed system design; they are not hypothetical — they happen in cloud environments.

---

## 3. Azure Cloud Fundamentals – Compute, Storage, Networking and IAM

Azure is Microsoft's public cloud platform. Its core building blocks are compute (virtual machines, App Service, Azure Kubernetes Service, Azure Functions), storage (Blob Storage, Azure Files, managed disks), networking (Virtual Networks, subnets, Network Security Groups, Azure Load Balancer, DNS), and identity and access management (Microsoft Entra ID (formerly Azure Active Directory), role-based access control). Understanding these primitives is prerequisite knowledge for designing and deploying any workload on Azure.

Resources are always contained within a resource group, which in turn belongs to a subscription. Subscriptions sit within a management group hierarchy. This three-level nesting (management group > subscription > resource group) is where policies, budgets, and RBAC assignments are applied.

**Why it matters:** As a DevOps or platform engineer on Azure, you provision and configure these resources using infrastructure-as-code tools. You need to understand what each resource type does, how resources communicate with each other, and how access is controlled before you can write correct Bicep or Terraform definitions.

**Key things to understand:**

- Resources are organised into resource groups; resource groups are organised into subscriptions; subscriptions belong to a management group hierarchy.
- Virtual Networks (VNets) isolate network traffic. Subnets segment VNets. Network Security Groups (NSGs) apply inbound and outbound rules at the subnet or NIC level.
- Azure RBAC assigns roles (Owner, Contributor, Reader, or custom roles) to security principals (users, groups, managed identities, service principals) at a specific scope.
- Managed identities allow Azure resources to authenticate to other Azure services without storing credentials.
- Azure regions and availability zones are distinct failure domains; deploying across zones improves resilience.

**Common pitfalls:**

- Granting Contributor or Owner scope at the subscription level when a narrower scope would suffice.
- Not using managed identities for service-to-service authentication, and using client secrets instead.
- Overlooking egress costs when designing storage and networking topologies.
- Confusing service endpoints with private endpoints; private endpoints are the preferred approach for securing PaaS services.

**Azure Key Vault:**

Azure Key Vault is the managed service for storing and accessing secrets, certificates, and encryption keys. Pipelines and applications should retrieve secrets from Key Vault at runtime rather than storing them in configuration files or pipeline variables. In Bicep you can reference Key Vault secrets as secure parameters; in Terraform you use the \`azurerm_key_vault_secret\` data source. Most CI/CD platforms can inject secrets from their own secret store or from a cloud vault during pipeline execution. Access to Key Vault should be granted through managed identities and scoped RBAC roles (Key Vault Secrets User, Key Vault Crypto User) rather than broad access policies.

---

## 4. Infrastructure as Code – Principles and Why It Matters

### IaC Workflow

\`\`\`mermaid
flowchart TB
    A[Write IaC Code] --> B[Plan / Preview]
    B --> C{Changes OK?}
    C -->|Yes| D[Apply]
    C -->|No| A
    D --> E[State Updated]
    E --> F[Infrastructure Live]
    F -->|New Change| A
\`\`\`

Infrastructure as Code (IaC) is the practice of defining and managing infrastructure resources – servers, networks, databases, and more – using machine-readable definition files rather than manual configuration or interactive tools. The definition files are stored in version control, reviewed like application code, and applied by automated tools that reconcile the desired state with the actual state of the infrastructure.

The key property that distinguishes good IaC from a bag of scripts is idempotency: applying the same definition multiple times must produce the same result. This is what makes IaC safe to run in automated pipelines without human supervision.

**Why it matters:** IaC is the foundation of repeatable, auditable, and scalable infrastructure management. Without it, environments drift apart over time, incidents are hard to reproduce, and changes have no audit trail. With IaC, every change to infrastructure goes through a pull request, is reviewed, and is applied consistently across environments.

**Key things to understand:**

- Declarative IaC (Bicep, Terraform, ARM) describes the desired end state; the tool works out the sequence of API calls needed to reach it.
- Imperative IaC (scripts) describes the exact sequence of steps; it requires the author to handle ordering and idempotency manually.
- Idempotency means applying the same definition multiple times produces the same result; this is a required property of good IaC.
- Treat IaC code with the same quality standards as application code: review, testing, linting, and modularisation.
- Separate environment-specific values (subscriptions, names, sizes) from the structural template using parameter files or variable inputs.

**Common pitfalls:**

- Making manual changes to resources outside the IaC tool, causing state drift.
- Not storing state securely (relevant for Terraform); state files can contain sensitive values.
- Writing monolithic templates that are difficult to maintain; prefer small, composable modules.
- Skipping a plan or preview step before applying changes in production.

---

## 5. Bicep – Templates, Modules and Deployment

Bicep is a domain-specific language (DSL) developed by Microsoft for deploying Azure resources declaratively. It compiles to Azure Resource Manager (ARM) JSON templates, giving access to the full ARM API surface while providing a cleaner, more readable syntax. Bicep supports modules (reusable template fragments), parameters, variables, outputs, and conditions.

A minimal Bicep resource definition looks like this:

\`\`\`bicep
param location string = resourceGroup().location
param storageAccountName string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

output storageAccountId string = storageAccount.id
\`\`\`

Every resource block specifies a \`type\` (the ARM resource type and API version), a \`name\`, a \`location\`, and the resource-specific \`properties\`. Parameters supply environment-specific values; outputs expose values for use in other templates or pipelines.

**Why it matters:** Bicep is the first-class IaC language for Azure. It is tightly integrated with Azure CLI and modern CI/CD platforms, making it the natural choice for Azure-native teams. Understanding Bicep lets you define, review, and deploy Azure resources reproducibly.

**Key things to understand:**

- A Bicep file declares resources with \`resource\` blocks, inputs with \`param\`, computed values with \`var\`, and return values with \`output\`.
- Modules split large templates into smaller, reusable files referenced with the \`module\` keyword.
- The \`targetScope\` determines whether the template deploys to a resource group, subscription, management group, or tenant.
- The \`az deployment\` command family deploys Bicep; the \`--what-if\` flag previews changes without applying them.
- Parameter files (\`.bicepparam\` or JSON) supply environment-specific values to a template at deployment time.
- Conditions (\`if\`) and loops (\`for\`) allow dynamic resource definitions within a single template.

**Common pitfalls:**

- Not using \`--what-if\` before applying changes to production, leading to unexpected resource modifications or deletions.
- Embedding secrets as plain-text parameters instead of referencing Key Vault secrets.
- Creating deep module nesting that makes the template hard to follow.
- Forgetting that some Azure resource properties are not idempotent; re-deploying can cause downtime if not handled carefully.

---

## 6. Terraform – Providers, State, Plan and Apply

Terraform is an open-source IaC tool by HashiCorp that uses a declarative configuration language (HCL – HashiCorp Configuration Language) to define infrastructure across multiple cloud providers and services. Terraform tracks the current state of managed infrastructure in a state file (\`terraform.tfstate\`) and calculates the difference between the current state and the desired configuration to produce a plan of changes before applying them.

A minimal Terraform configuration for an Azure resource group and storage account:

\`\`\`hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstateaccount"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  # The features block is optional in v4 of the AzureRM provider
}

resource "azurerm_resource_group" "main" {
  name     = "my-app-rg"
  location = "West Europe"
}

resource "azurerm_storage_account" "main" {
  name                     = "myappstore001"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
\`\`\`

The workflow is always: \`terraform init\` (download providers) → \`terraform plan\` (preview changes) → \`terraform apply\` (execute changes). Never skip \`plan\` in production.

**Why it matters:** Terraform is the dominant multi-cloud IaC tool and is widely used even in Azure-primary environments, particularly when infrastructure spans multiple providers. Understanding Terraform's state model, provider ecosystem, and plan/apply workflow is essential for operating it safely at scale.

**Key things to understand:**

- Providers are plugins that define the resource types available; the AzureRM provider covers Azure resources.
- State is stored in a backend (locally by default; remotely in Azure Blob Storage or Terraform Cloud in team environments). Remote state is required for collaboration.
- \`terraform plan\` computes the change set; \`terraform apply\` executes it. Never skip the plan step in production workflows.
- State locking prevents concurrent modifications; remote backends support locking natively.
- Modules group related resources for reuse; input variables and output values define their interface.
- \`terraform import\` brings existing resources under Terraform management without recreating them.

**Common pitfalls:**

- Using local state in team environments, causing state conflicts when multiple engineers run Terraform simultaneously.
- Not protecting the state file; it can contain sensitive values such as connection strings and passwords.
- Running \`terraform apply\` without reviewing the plan output, risking accidental resource destruction.
- Overusing \`depends_on\` instead of relying on implicit dependencies through resource attribute references.

---

## 7. PowerShell – Automation and Azure Management

PowerShell is a cross-platform scripting language and shell built on .NET. It is object-oriented: commands (called cmdlets) output structured objects rather than text, making it easier to filter, sort, and transform data without fragile string parsing. The \`Az\` PowerShell module provides cmdlets for managing every Azure resource type. PowerShell is the dominant scripting language in Windows-centric and Azure-heavy environments.

**Why it matters:** Many organisations use PowerShell for Azure management tasks, release automation, and operational scripts. Most CI/CD platforms support PowerShell steps natively. Being able to write, read, and debug PowerShell scripts is necessary for working in these environments and for understanding existing automation.

**Key things to understand:**

- Cmdlets follow a Verb-Noun naming convention: \`Get-AzResourceGroup\`, \`New-AzStorageAccount\`, \`Remove-AzWebApp\`.
- The pipeline (\`|\`) passes objects, not text, between cmdlets. \`Where-Object\` filters, \`Select-Object\` projects, \`ForEach-Object\` iterates.
- Variables are prefixed with \`$\`. Arrays use \`@()\`. Hash tables (dictionaries) use \`@{}\`.
- \`try / catch / finally\` handles errors; \`$_\` inside a catch block refers to the current exception.
- \`Connect-AzAccount\` authenticates to Azure; in pipelines, use a service principal or managed identity instead of interactive login.
- Always use \`Write-Verbose\` and \`Write-Error\` rather than \`Write-Host\` in reusable scripts to support proper output handling.

**Common pitfalls:**

- Using \`Write-Host\` in scripts that are consumed programmatically; its output cannot be captured in a pipeline.
- Ignoring error handling, allowing scripts to continue silently after failures.
- Hardcoding credentials or subscription IDs in scripts instead of using parameters or environment variables.
- Not using \`-ErrorAction Stop\` when calling cmdlets that do not throw terminating errors by default.

---

## 8. Kubernetes – Pods, Deployments, Services and Ingress

\`\`\`interactive-flow
k8sPodLifecycle
\`\`\`

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerised applications. It introduces a set of resource types with distinct roles: the Pod is the smallest deployable unit; a Deployment manages a fleet of identical Pods; a Service provides a stable network address for reaching those Pods; an Ingress exposes HTTP/HTTPS routes from outside the cluster to Services.

Understanding the difference between these four resource types is the foundation of working with Kubernetes:

| Resource | Role |
|---|---|
| **Pod** | One or more containers that share a network namespace, storage volumes, and lifecycle. The atomic unit Kubernetes schedules and restarts. |
| **Deployment** | Declares a desired number of Pod replicas and manages rolling updates and rollbacks. You almost never create Pods directly; you create Deployments. |
| **Service** | A stable virtual IP and DNS name that load-balances traffic across all healthy Pods matching a label selector. Pods come and go; the Service address stays constant. |
| **Ingress** | Routes external HTTP/HTTPS traffic to Services based on hostname or path rules. Requires an Ingress controller (such as NGINX or the Azure Application Gateway Ingress Controller) to be installed in the cluster. |

The \`kubectl\` command-line tool is used to interact with a cluster: \`kubectl apply -f manifest.yaml\`, \`kubectl get pods\`, \`kubectl describe deployment\`, \`kubectl logs\`.

**Why it matters:** Kubernetes is the standard platform for running containerised workloads in production. DevOps engineers provision clusters, write manifest files, configure deployments, manage secrets, and troubleshoot running workloads. Azure Kubernetes Service (AKS) is the managed offering on Azure, but understanding the underlying Kubernetes concepts is necessary to use it effectively.

**Key things to understand:**

- A Pod wraps one or more containers that share a network namespace and storage. Pods are ephemeral; when a Pod dies, its local storage is lost.
- A Deployment manages a ReplicaSet of Pods and performs rolling updates by default; \`maxUnavailable\` and \`maxSurge\` control the update strategy.
- A Service selects Pods by label and provides a stable cluster-internal DNS name and virtual IP; type \`LoadBalancer\` exposes it externally.
- Namespaces partition a cluster into logical groups; use them to separate environments or teams on shared clusters.
- ConfigMaps and Secrets inject configuration and sensitive values into Pods without baking them into images.
- Resource requests and limits control how much CPU and memory a Pod can use; setting them correctly is required for reliable scheduling.
- Liveness and readiness probes tell Kubernetes when to restart a container and when to send it traffic.

**Common pitfalls:**

- Creating Pods directly instead of using a Deployment; bare Pods are not restarted if they fail.
- Running Pods with no resource requests or limits, allowing one workload to starve others on the node.
- Storing secrets in ConfigMaps (plain text) instead of Kubernetes Secrets, or not integrating with an external secrets manager.
- Not setting readiness probes, causing traffic to be routed to Pods that are not yet ready to serve.
- Applying manifests directly to production clusters without a pipeline, bypassing audit and approval controls.

**Azure Container Registry (ACR):**

Azure Container Registry is a managed Docker registry for storing and distributing container images. ACR integrates natively with AKS – you can attach an ACR instance to a cluster so that nodes pull images without separate credentials. ACR supports automated vulnerability scanning through Microsoft Defender for Containers, image signing for supply chain integrity, and geo-replication for multi-region deployments. In a typical workflow, the CI pipeline builds an image, pushes it to ACR, and the CD pipeline deploys from ACR to AKS.

---

## 9. Observability – Metrics, Logs, Traces and the Three Pillars

Observability is the ability to understand the internal state of a system from its external outputs. The three pillars are metrics, logs, and traces. Each pillar answers a different kind of question: metrics tell you something is wrong, logs tell you what happened, and traces tell you where it happened across service boundaries.

- **Metrics** are numerical measurements aggregated over time (request rate, error rate, CPU usage, latency percentiles). They are cheap to store at scale and ideal for alerting on known failure modes.
- **Logs** are timestamped event records emitted by running software. Structured logs (formatted as JSON) are far easier to query and filter than unstructured text lines.
- **Traces** record the journey of a single request through a distributed system. Each operation is a span; spans are linked by a shared trace ID propagated through HTTP headers. Traces are essential in microservice architectures where a single user action touches many services.

Together these three signals allow engineers to detect problems (metrics), understand their context (logs), and identify where in the call graph they originated (traces).

**Why it matters:** You cannot operate a system you cannot observe. A DevOps engineer is responsible for ensuring that production systems emit sufficient telemetry and that the tooling to collect, store, and query that telemetry is in place. Without observability, incidents take longer to detect and resolve.

**Key things to understand:**

- Metrics are cheap to store and query at scale; they are ideal for alerting on known failure modes (error rate, latency, saturation).
- Logs provide context for individual events; structured logs (JSON) are far easier to query than unstructured text.
- Traces correlate work across service boundaries using a trace ID propagated through requests; they are essential in microservice architectures.
- The RED method for services: Rate (requests per second), Errors (error rate), Duration (latency).
- The USE method for resources: Utilisation, Saturation, Errors.
- Service Level Indicators (SLIs), Service Level Objectives (SLOs), and error budgets provide a principled framework for reliability targets.

**Common pitfalls:**

- Logging too much (noise) or too little (blindness); aim for actionable, structured events.
- Alerting on symptoms that are not user-facing, generating alert fatigue without improving reliability.
- Not propagating trace context across service calls, producing disconnected traces.
- Collecting metrics and logs but never defining SLOs, leaving no shared definition of "good enough".

---

## 10. Azure Monitor and Application Insights

Azure Monitor is the unified observability platform for Azure. It collects metrics and logs from Azure resources, virtual machines, containers, and custom applications. Log Analytics workspaces store log data and expose it via the Kusto Query Language (KQL) for ad hoc analysis and alerting. Application Insights is a feature of Azure Monitor focused on application performance monitoring: it collects request rates, dependency calls, exceptions, and custom events from instrumented applications.

**Why it matters:** Azure Monitor is the first place to look when something is wrong with a workload running on Azure. DevOps engineers configure diagnostic settings to route resource logs to Log Analytics, write KQL queries to investigate incidents, create alert rules to notify on-call engineers, and build dashboards to communicate system health to stakeholders.

**Key things to understand:**

- Diagnostic settings on each Azure resource control which categories of metrics and logs are sent to which destinations (Log Analytics, Storage, Event Hub).
- KQL is the query language for Log Analytics; understanding \`where\`, \`summarize\`, \`project\`, \`join\`, and \`render\` covers most operational needs.
- Alert rules define a condition (a KQL query or a metric threshold), an evaluation frequency, and an action group (email, webhook, PagerDuty).
- Application Insights uses a connection string (not an instrumentation key in modern SDKs) to identify where to send telemetry.
- Workbooks provide interactive, parameterised dashboards built on KQL queries and Azure resource data.
- Availability tests in Application Insights run synthetic HTTP checks against public endpoints and alert on failures.

**Common pitfalls:**

- Not enabling diagnostic settings, leaving resources with no log data in Log Analytics.
- Writing alert rules on raw log counts without accounting for periods of low traffic, causing false positives or false negatives.
- Sampling telemetry too aggressively in Application Insights, losing rare but important events.
- Treating dashboards as a one-time setup; they need to evolve as the system and its failure modes change.

---

## 11. OpenTelemetry – Instrumentation and Vendor-Neutral Telemetry

OpenTelemetry is a CNCF (Cloud Native Computing Foundation) project that provides a vendor-neutral set of APIs, SDKs, and tooling for generating, collecting, and exporting telemetry data – traces, metrics, and logs – from applications and infrastructure. It emerged from the merger of OpenTracing and OpenCensus and is now the standard approach to instrumentation. Applications are instrumented with the OpenTelemetry SDK; telemetry is collected by the OpenTelemetry Collector and exported to any compatible backend.

The separation between instrumentation (SDK in the application) and export (Collector to backend) is the key design decision. You instrument code once and then route the telemetry to any backend – Azure Monitor, Jaeger, Prometheus, Grafana – by reconfiguring the Collector, with no code changes needed.

**Why it matters:** OpenTelemetry decouples instrumentation from the observability backend. For a DevOps engineer, this means less vendor lock-in and the ability to change observability tooling independently of application releases.

**Key things to understand:**

- The OpenTelemetry SDK instruments application code; automatic instrumentation libraries handle common frameworks (HTTP clients, database drivers) without code changes.
- The OpenTelemetry Collector is a standalone agent or gateway that receives, processes, and exports telemetry. It supports multiple receivers, processors, and exporters.
- Context propagation carries trace context (trace ID, span ID) across process boundaries via HTTP headers (W3C TraceContext standard).
- The Azure Monitor Exporter sends OpenTelemetry data to Application Insights; this is the recommended integration path for Azure workloads.
- Semantic conventions define standard attribute names for common concepts (HTTP method, database name, error type), enabling consistent querying across services.
- Resource attributes describe the source of telemetry: service name, version, environment. These are attached to all spans and metrics from a service.

**Common pitfalls:**

- Confusing the OpenTelemetry SDK (instrumentation in the application) with the Collector (collection and export pipeline); they are separate components with different deployment patterns.
- Not setting the service name resource attribute, making it impossible to filter telemetry by service in the backend.
- Sampling traces at the SDK level without considering the impact on tail-latency analysis and rare error investigation.
- Overlooking log correlation; structured logs need to include the trace ID to be joinable with trace data in the backend.

---
`,
  senior: `
# DevOps / Platform Engineer – Senior Concept Reference

This document provides in-depth explanations of the core concepts covered at the Senior level. Use it alongside the resources in the learning path to develop the strategic and architectural thinking expected of a senior DevOps or platform engineer.

---

## 1. Platform Engineering – Internal Developer Platforms and Golden Paths

### Platform Engineering Layers

\`\`\`mermaid
flowchart TB
    A[Developer Self-Service Portal] --> B[Golden Path Templates]
    B --> C[CI/CD Pipelines]
    C --> D[Infrastructure as Code]
    D --> E[Cloud Provider APIs]
    F[Observability] --> C
    F --> D
    G[Security & Policy] --> B
    G --> C
    G --> D
\`\`\`

Platform engineering is the discipline of building and operating internal developer platforms (IDPs) that reduce cognitive load for application teams. An IDP abstracts away the complexity of infrastructure, pipelines, and operational tooling behind self-service interfaces. A golden path is an opinionated, pre-approved, well-supported route for accomplishing a common task – creating a new service, deploying to a specific environment, or setting up observability – that teams can follow without needing deep platform expertise.

The key mental shift is treating the platform as a product. This means understanding who uses it (developers), what problems they face (slow provisioning, inconsistent environments, security toil), and continuously improving based on their feedback – exactly as a product team would.

**Why it matters:** At the senior level, the goal shifts from doing DevOps work yourself to enabling other engineers to do it correctly and efficiently. Platform engineering operationalises this shift. Instead of being a bottleneck – approving every pipeline change or infrastructure request – you build the guardrails, templates, and automation that let teams move independently while still meeting compliance, security, and reliability standards.

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

**Why it matters:** Senior engineers are expected to own architectural decisions that affect the entire organisation. Poor infrastructure design leads to outages, security breaches, runaway costs, and teams blocked on shared bottlenecks. Good design creates a foundation that is safe to change, easy to operate, and capable of absorbing growth.

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

**Why it matters:** As the person who builds and owns pipelines, a senior DevOps engineer is directly responsible for preventing pipeline compromise. Regulators and security teams increasingly audit pipeline configurations, and a weak pipeline can block certification or cause compliance failures.

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

**Why it matters:** At scale, the hardest problems in platform engineering are not technical – they are organisational. Where does one team's responsibility end and another's begin? Which services should be shared and which should be owned per team? DDD provides a disciplined vocabulary and set of patterns for answering these questions in a way that reduces coupling and enables autonomous team operation.

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

**Why it matters:** Senior DevOps engineers participate in architecture reviews and are expected to evaluate whether proposed designs are operationally sound. A pattern that looks elegant on a whiteboard can be operationally nightmarish if it produces excessive inter-service latency, complicates deployment ordering, or makes tracing difficult. Understanding these patterns lets you contribute meaningfully to design decisions and anticipate operational challenges before they reach production.

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

The "AI, ML, Deep Learning and GenAI Explained" video provides the conceptual grounding needed to understand what you are building infrastructure for. The key distinction is the hierarchy: AI is the broadest field; machine learning is a subset using data-driven pattern recognition; deep learning is a subset of ML using layered neural networks; and generative AI — built on foundation models and large language models — is the most recent and commercially impactful layer. Understanding this hierarchy matters because each layer has different infrastructure requirements: traditional ML workloads are CPU-bound batch jobs; deep learning training requires GPU clusters; LLM inference requires optimised GPU instances with high memory bandwidth; and generative AI applications require vector databases, content filtering layers, and token-based cost management.

**Why it matters:** As organisations adopt GenAI, DevOps and platform engineers are responsible for the infrastructure that hosts, scales, and secures these workloads. GenAI systems have distinct operational characteristics: they are stateless at inference time but require careful model version management, they produce probabilistic outputs that require human-in-the-loop review or content filtering, and they have different cost profiles (per-token billing) compared to traditional workloads.

**Key things to understand:**

- Model deployment and versioning: models must be version-pinned in infrastructure definitions; a model upgrade is a production change requiring testing and rollback capability.
- Private networking: deploy Azure OpenAI endpoints inside a VNet with private endpoints to prevent data exfiltration over the public internet.
- Content filtering and responsible AI controls must be configured as platform guardrails, not left to individual application teams.
- Rate limiting and quota management: Azure OpenAI has per-deployment token-per-minute (TPM) quotas; platform engineers must model usage and request quota increases proactively.
- Vector databases (Azure AI Search with vector indexes, or dedicated services) require their own availability, backup, and access control considerations.
- Cost observability: per-token costs accumulate quickly; tag deployments by team and application, set budget alerts, and instrument token usage in application telemetry.
- The distinction between AI, ML, deep learning, and generative AI is not academic — it determines which Azure services, compute SKUs, and operational patterns apply to a given workload.

**Common pitfalls:**

- Not applying the same security standards to AI endpoints as to other production APIs (authentication, rate limiting, audit logging).
- Underestimating GPU/TPM quota lead times; requesting capacity increases takes days to weeks and must be planned ahead.
- Storing chat history or user-generated content in the same storage account as model weights without appropriate access controls and data classification.
- Treating GenAI as a black box and not instrumenting token usage, latency, and error rates, making it impossible to detect degradation or unexpected cost spikes.

---

## 7. GitOps – Git as the Source of Truth for Infrastructure

### GitOps Flow

\`\`\`mermaid
flowchart LR
    A[Developer] --> B[Git Commit]
    B --> C[Config Repo]
    C --> D[ArgoCD / Flux]
    D --> E[K8s Cluster]
    E --> F[Reconciliation Loop]
    F -->|Drift Detected| D
\`\`\`

GitOps is an operational model where the desired state of infrastructure and applications is declared in Git, and automated tooling continuously reconciles the actual state of the environment with the declared state. Instead of making changes by running imperative commands (kubectl apply, az deployment create), you make changes by committing to a Git repository. An agent running in the cluster detects the change and applies it automatically.

Flux is the CNCF-graduated GitOps toolkit for Kubernetes, and the most common choice in Azure environments. Flux runs inside the cluster, watches one or more Git repositories, and automatically applies changes when it detects drift between the declared state in Git and the actual state in the cluster. ArgoCD is the other major GitOps tool, offering a web UI and more opinionated workflow.

**Why it matters:** GitOps solves a fundamental operational problem: configuration drift. When changes are made imperatively (someone runs kubectl commands directly), the actual state of the cluster diverges from what is documented. GitOps eliminates drift by making Git the single source of truth — every change is version-controlled, auditable, and reversible. For a regulated environment like insurance, the audit trail that GitOps provides is particularly valuable.

**Key things to understand:**

- Pull vs push deployment: traditional CI/CD pushes changes to the environment (pipeline runs kubectl apply). GitOps pulls: an agent in the cluster watches Git and pulls changes. Pull-based deployment is more secure because the cluster does not need to expose credentials to external CI systems.
- Flux components: Source Controller (watches Git repos), Kustomize Controller (applies Kustomize overlays), Helm Controller (manages Helm releases), Notification Controller (sends alerts on reconciliation events).
- Repository structure: separate application code repos from infrastructure/config repos. Application repos trigger image builds; config repos declare the desired cluster state. Flux watches the config repo.
- Sealed Secrets / SOPS: secrets cannot be stored in Git as plaintext. Sealed Secrets (Bitnami) encrypts secrets with a cluster-specific key so they can be safely committed. Mozilla SOPS provides age/GPG-based encryption. Azure Key Vault integration via External Secrets Operator is another option.
- Drift detection and remediation: Flux continuously checks (every configurable interval) whether the cluster state matches Git. If someone makes a manual change, Flux reverts it. This enforces consistency but requires the team to commit to the GitOps workflow — manual changes will be overwritten.
- Multi-environment promotion: use Git branches or directory structures (base + overlays) with Kustomize to manage dev/staging/production differences. Promote changes by merging or copying between environments.

**Common pitfalls:**

- Storing secrets in Git without encryption — even in a private repo, plaintext secrets in version control are a security risk. Use Sealed Secrets, SOPS, or External Secrets Operator from day one.
- Not establishing a clear Git workflow (branch protection, PR reviews, automated validation) for the config repo. The config repo IS your infrastructure — it deserves the same rigour as application code.
- Trying to GitOps everything immediately instead of starting with a single application and expanding. GitOps requires changes to team workflows and tooling — adopt incrementally.
- Ignoring the feedback loop: Flux reconciliation errors, failed deployments, and drift alerts must be monitored and acted upon. Without observability of the GitOps process itself, failures go unnoticed.

---

## 8. AI-Powered Development for DevOps and Platform Engineers

AI-assisted development tools are changing how infrastructure code, pipeline definitions, and automation scripts are written and maintained. For DevOps and platform engineers, these tools can accelerate the creation of Bicep/Terraform modules, Kubernetes manifests, pipeline YAML, PowerShell scripts, and documentation — tasks that often involve repetitive patterns and well-documented syntax.

AI assistants are most effective for infrastructure work when given precise context: the target cloud provider, the existing naming conventions, the required compliance constraints, and the specific resource types involved. They can generate first drafts of infrastructure-as-code templates, suggest pipeline stages, explain unfamiliar Kubernetes error messages, and help translate between IaC languages.

Understanding the foundation of these tools — from the "AI, ML, Deep Learning and GenAI Explained" video — helps calibrate expectations. AI coding assistants are built on large language models: they predict statistically plausible code completions based on patterns in their training data. They are not reasoning engines. They excel at syntactically correct boilerplate and well-documented patterns; they struggle with novel constraints, organisation-specific naming rules, and security requirements they have never seen. Knowing this, the right approach is to use AI tools to generate a first draft quickly, then review the output against security policies, compliance requirements, and organisational standards before accepting it.

**Why it matters:** Senior DevOps engineers who understand how to use AI tools effectively can significantly accelerate platform development — particularly for boilerplate-heavy tasks like writing Bicep modules, Helm charts, or pipeline definitions. Equally important is understanding the limitations: AI-generated infrastructure code can contain subtle misconfigurations that create security vulnerabilities or cost overruns.

**Key things to understand:**

- AI tools are effective for generating infrastructure boilerplate, but every generated template must be reviewed for security misconfigurations, overly permissive access controls, and compliance with organisational standards.
- Infrastructure-as-code generated by AI must be validated through the same pipeline gates (linting, policy checks, plan/what-if review) as human-written code.
- AI assistants can help explain and debug complex Kubernetes, Terraform, or pipeline configurations, reducing the time to diagnose issues.
- Data privacy applies to AI tool use: do not paste production secrets, connection strings, or customer data into AI assistants. Follow the organisation's AI Policy for approved tools.
- The hierarchy of AI → ML → deep learning → generative AI explains why different tools have different capabilities; LLM-based coding assistants are generative AI tools that predict plausible code, not tools that reason about correctness.

**Common pitfalls:**

- Accepting AI-generated infrastructure code without reviewing it against organisational security policies and naming conventions.
- Using AI to generate Kubernetes manifests or Helm charts without verifying resource limits, security contexts, and network policies.
- Over-relying on AI for troubleshooting without developing the underlying understanding of the systems being managed.
- Not establishing team conventions around AI tool use in infrastructure work, leading to inconsistent patterns across the platform.

---

## 9. AI Policy — Organisational Principles

> **Note:** The link below points to an internal SharePoint site and is only accessible to employees on the corporate network.

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy is built on several pillars: legal compliance (EU AI Act, GDPR), responsible AI principles (diversity, transparency, robustness, security, privacy), and an AI Register requiring all AI use cases to be registered and classified by risk level.

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

## EU Compliance for DevOps / Platform Engineers

Senior DevOps and Platform Engineers operating infrastructure for EU financial services must understand and implement the requirements of NIS2 (Network and Information Security Directive 2) and DORA (Digital Operational Resilience Act). These regulations establish legally binding obligations for the security, resilience, and incident reporting capabilities of ICT systems. NIS2 classifies financial services as "essential entities" subject to the highest tier of obligations, while DORA specifically targets digital operational resilience in the financial sector with detailed technical requirements that became applicable in January 2025.

**Key things to understand:**
- NIS2 requires early warning to competent authorities within 24 hours and full notification within 72 hours of a significant incident.
- DORA Article 25 requires regular resilience testing including vulnerability assessments, open-source analysis, and compliance scanning.
- DORA Article 26 requires threat-led penetration testing (TLPT) at least every three years for significant financial entities.
- DORA Articles 28-30 require a complete register of ICT service providers with criticality classifications and contractual exit strategies.
- DORA penalties can reach 1% of average daily worldwide turnover applied daily. NIS2 penalties for essential entities can reach 10 million EUR or 2% of global turnover.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — Scripting, automation, and infrastructure tooling
`,
}
