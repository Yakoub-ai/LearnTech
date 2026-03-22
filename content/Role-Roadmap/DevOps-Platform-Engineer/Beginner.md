
# DevOps / Platform Engineer – Beginner Concept Reference

This document provides in-depth explanations of the core concepts covered at the Beginner level. Use it alongside the resources in the learning path to build a solid foundation before moving on to the Mid level.

---

## 1. DevOps Philosophy – Culture, Automation and Feedback Loops

DevOps is a set of cultural and technical practices that brings development and operations teams together with a shared goal: delivering software reliably and frequently. It is not a tool or a job title. At its core, DevOps rests on three ideas – culture, automation, and feedback. Culture means that teams share responsibility for the full software lifecycle, from writing code to running it in production. Automation means removing manual, error-prone steps wherever possible. Feedback means measuring outcomes and using those measurements to improve continuously.

A useful framework for understanding DevOps in practice is CALMS: Culture (shared ownership and blameless learning), Automation (eliminating manual steps), Lean (small batch sizes and fast flow), Measurement (using data to understand system behaviour), and Sharing (transparency of knowledge and tooling across teams).

**Code walkthrough:**

```bash
#!/usr/bin/env bash
# Step 1: A simple feedback loop script that embodies DevOps philosophy
# Why: DevOps is about shortening the cycle from code change to production insight
# This script automates the build-test-deploy-measure loop for a single service

set -euo pipefail

SERVICE="order-api"
BRANCH="main"

# Step 2: Automate the build — no manual steps means no manual errors
echo "=== Building $SERVICE from $BRANCH ==="
docker build -t "$SERVICE:latest" .

# Step 3: Automate the test — fast feedback catches problems early
echo "=== Running automated tests ==="
docker run --rm "$SERVICE:latest" npm test

# Step 4: Deploy — a single command, not a 15-step runbook
echo "=== Deploying to staging ==="
docker tag "$SERVICE:latest" "registry.example.com/$SERVICE:staging"
docker push "registry.example.com/$SERVICE:staging"

# Step 5: Measure — close the feedback loop by checking health after deploy
echo "=== Verifying deployment health ==="
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://staging.example.com/health)
if [[ "$HTTP_STATUS" -ne 200 ]]; then
  echo "ERROR: Health check failed with status $HTTP_STATUS" >&2
  exit 1
fi
echo "Deployment healthy — feedback loop complete"
```

**Why it matters:**

A DevOps engineer exists to remove the friction between writing code and running code in production. Without a clear understanding of the underlying philosophy, it is easy to implement tools without achieving the actual goal. Knowing that DevOps is about shortening feedback loops helps you design pipelines, infrastructure, and processes that serve that purpose rather than adding ceremony.

**Key things to understand:**

- The Three Ways: Flow (work moves fast from dev to ops), Feedback (problems surface quickly), Continual Learning (failures become learning opportunities).
- DevOps is not about a specific toolset; tools serve the philosophy.
- Shared ownership means both developers and operations engineers are accountable for reliability.
- A blameless culture encourages reporting and learning from incidents rather than hiding them.
- CALMS: Culture, Automation, Lean, Measurement, Sharing – a concrete framework for assessing DevOps maturity.

**Common pitfalls:**

- Treating DevOps as purely a tooling exercise and neglecting the cultural dimension.
- Siloing the "DevOps team" as a separate unit rather than embedding practices across all teams.
- Skipping feedback mechanisms and only focusing on delivery speed.
- Confusing DevOps with Agile; they are complementary but distinct.

---

## 2. Continuous Integration and Continuous Delivery (CI/CD)

Continuous Integration (CI) is the practice of merging code changes into a shared branch frequently – typically multiple times per day – and validating each merge with automated builds and tests. The goal is to surface integration problems as early and cheaply as possible.

Continuous Delivery (CD) extends CI by ensuring that the validated code is always in a deployable state, ready to be released to production at any time. A human still decides when to trigger the release. Continuous Deployment goes one step further: every validated change is released to production automatically, without manual approval. The distinction matters because Continuous Deployment requires a much higher level of automated test coverage and organisational confidence.

**Code walkthrough:**

```yaml
# Step 1: Define WHEN the pipeline triggers
# Why: CI runs on every push so integration problems surface immediately
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Step 2: The CI job — build and test on every change
  # Why: Fail fast with cheap checks first, expensive checks later
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      # Step 3: Linting is the cheapest check — run it first
      - name: Lint
        run: npm run lint

      # Step 4: Unit tests are fast — run before integration tests
      - name: Unit tests
        run: npm test

      # Step 5: Build the artifact ONCE — this same artifact goes to every environment
      - name: Build container image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Push to registry
        run: |
          docker tag myapp:${{ github.sha }} registry.example.com/myapp:${{ github.sha }}
          docker push registry.example.com/myapp:${{ github.sha }}

  # Step 6: The CD job — deploy the validated artifact
  # Why: "needs" ensures we only deploy if build-and-test passed
  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: staging
    steps:
      - name: Deploy to staging
        run: |
          echo "Deploying myapp:${{ github.sha }} to staging"
```

**Why it matters:**

CI/CD is the backbone of modern software delivery. As a DevOps engineer you will design, build, and maintain the pipelines that implement these practices. Understanding the distinction between CI, Continuous Delivery, and Continuous Deployment helps you design pipelines that match the organisation's risk appetite and release cadence.

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

Docker is a platform for packaging, distributing, and running applications inside containers. A container is an isolated process running on the host operating system: it shares the host kernel but has its own isolated file system, network stack, and process namespace. Containers are not virtual machines – there is no hypervisor and no guest OS; they are lightweight and start in milliseconds. An image is the read-only blueprint from which containers are created. A Dockerfile is a text file containing the instructions to build an image layer by layer. Docker Compose is a tool for defining and running multi-container applications using a single YAML file.

A minimal Dockerfile looks like this:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Each instruction (`FROM`, `RUN`, `COPY`) adds a cached layer. If only `app.py` changes, Docker reuses all previous layers and only rebuilds from the `COPY . .` instruction onwards, keeping builds fast.

**Why it matters:**

Containers solve the classic "it works on my machine" problem. By packaging the application and its environment together, you guarantee that what runs locally is identical to what runs in staging and production. DevOps engineers use Docker to build images in CI pipelines, push them to container registries, and deploy them to orchestration platforms such as Kubernetes.

**Key things to understand:**

- Images are immutable and layered; each instruction in a Dockerfile adds a layer that is cached independently.
- Containers share the host kernel – they are isolated processes, not full virtual machines.
- Containers are ephemeral; persistent data must be stored in volumes or external storage.
- The base image matters: using a minimal base image (such as a slim or distroless variant) reduces attack surface and image size.
- Multi-stage builds allow you to compile code in one stage and copy only the final artifact into a smaller production image.
- Docker Compose is suited for local development environments; it is not a production orchestration tool.

**Common pitfalls:**

- Running containers as root, which creates an unnecessary security risk.
- Storing secrets in environment variables baked into the image rather than injecting them at runtime.
- Ignoring the `.dockerignore` file and copying unnecessary files (node_modules, .git) into the build context.
- Not pinning base image versions, which leads to non-reproducible builds.

---

## 4. Linux – File System, Permissions and Process Management

Linux is the operating system that underlies the vast majority of cloud infrastructure, containers, and CI/CD agents. Understanding Linux means knowing how the file system is organised, how file permissions work, and how to inspect and control running processes. These are not advanced skills; they are the baseline required to work confidently on any server or inside any container.

**Code walkthrough:**

```bash
#!/usr/bin/env bash
# Step 1: Inspect running processes to diagnose a slow application
# Why: Understanding processes is the first skill for troubleshooting production issues

set -euo pipefail

# Step 2: Check disk space — full disks are a common cause of service failures
echo "=== Disk Usage ==="
df -h / /var /tmp
# Why: /var/log can fill up and crash services; /tmp may be its own mount

# Step 3: Check who owns the application process and its resource usage
echo "=== Application Processes ==="
ps aux | grep "[n]ode" | head -5
# Why: the [n] trick avoids matching the grep command itself

# Step 4: Inspect file permissions on a config file
echo "=== Config file permissions ==="
ls -la /etc/myapp/config.yaml
# Expected: -rw-r----- 1 appuser appgroup
# Why: config files should be readable by the app user, not world-readable

# Step 5: Check recent log entries for errors
echo "=== Recent errors in application log ==="
tail -20 /var/log/myapp/error.log
# Why: logs in /var/log are the first place to look during an incident

# Step 6: Check which ports are listening
echo "=== Listening ports ==="
ss -tlnp
# Why: confirms the application is actually bound to the expected port

# Step 7: Check memory usage — OOM kills are silent service killers
echo "=== Memory Usage ==="
free -h
# Why: if available memory is near zero, the OOM killer may terminate your process
```

**Why it matters:**

Almost every pipeline, container, and cloud virtual machine runs on Linux. When something breaks in production, you need to be able to SSH into a host, inspect logs, check running processes, and understand file ownership issues without relying on a graphical interface. These skills are the foundation of every other operational task.

**Key things to understand:**

- The Linux file system hierarchy: `/etc` for system configuration files, `/var` for variable data and logs (e.g. `/var/log`), `/home` for user home directories, `/usr/bin` and `/bin` for executable programs, `/tmp` for temporary files that are cleared on reboot.
- File permissions are expressed as three sets of read/write/execute bits for owner, group, and others. The `chmod` and `chown` commands control them.
- Every process has a PID (process ID) and runs under a user. `ps`, `top`, and `htop` are essential tools for inspection.
- Signals control processes: `SIGTERM` requests graceful shutdown; `SIGKILL` forces immediate termination without cleanup.
- Standard streams: stdin (0), stdout (1), stderr (2). Redirecting (`>`, `2>`) and piping (`|`) these is fundamental to scripting.

**Common pitfalls:**

- Setting permissions too broadly (e.g. `chmod 777`) to solve a problem quickly, creating security vulnerabilities.
- Forgetting that processes inside containers run as a user; root inside a container can still be dangerous if the container escapes.
- Confusing hard links and symbolic links.
- Not understanding that file descriptors remain open even after a file is deleted, which can cause disk space issues.

---

## 5. Bash Scripting – Variables, Loops, Conditionals and Scripts

Bash (Bourne Again Shell) is both a command-line interpreter and a scripting language. A Bash script is a plain text file containing a sequence of shell commands that the interpreter executes in order. Bash supports variables, conditionals, loops, functions, and input/output redirection, making it a powerful tool for automating repetitive tasks on Linux systems.

Here is a concrete example that shows the core building blocks together:

```bash
#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-staging}"

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
```

Note: variables are assigned without spaces around `=` (`ENVIRONMENT="staging"`), and always referenced with double quotes (`"$ENVIRONMENT"`) to prevent word splitting when values contain spaces.

**Why it matters:**

Bash scripts are the glue of automation. Pipeline steps, infrastructure setup scripts, and deployment helpers are routinely written in Bash because it is available on virtually every Linux system without installation. Understanding Bash lets you read, debug, and write the scripts that CI/CD systems execute.

**Key things to understand:**

- Always start a script with a shebang line: `#!/usr/bin/env bash`.
- Use `set -euo pipefail` at the top of scripts: `-e` exits on error, `-u` treats unset variables as errors, `-o pipefail` propagates pipe failures.
- Variables are assigned without spaces around `=` and referenced with `$`: `name="world"` then `echo "$name"`.
- Single quotes prevent all expansion (`'$VAR'` is literal). Double quotes allow variable and command substitution (`"$VAR"` expands).
- Exit codes: 0 means success; any non-zero value means failure. Check with `$?` or use `||` and `&&` for inline control flow.
- `if [[ condition ]]`, `for item in list; do ... done`, and `while [[ condition ]]; do ... done` cover most control flow needs.

**Common pitfalls:**

- Not quoting variables, leading to subtle bugs when values contain spaces.
- Forgetting `set -e`, allowing scripts to continue after a command fails silently.
- Using `ls` output in loops, which breaks on filenames with spaces; use globs (`for f in /path/*`) instead.
- Writing overly long scripts in Bash when a language like Python would be more maintainable and testable.

---

## 6. Version Control in a DevOps Context – Branching, Tagging and Release Flow

Version control – almost universally Git in modern environments – is the system that tracks changes to code over time, enables collaboration, and provides the audit trail required for controlled releases. In a DevOps context, version control is not just a storage mechanism; it is the trigger for automated pipelines and the source of truth for both application code and infrastructure definitions.

**Code walkthrough:**

```bash
#!/usr/bin/env bash
# Step 1: A realistic Git workflow for a DevOps engineer
# Why: Git is the trigger for pipelines and the source of truth for infrastructure

set -euo pipefail

# Step 2: Create a feature branch from the latest main
# Why: short-lived branches reduce merge conflicts and enable frequent integration
git checkout main
git pull origin main
git checkout -b feature/add-health-endpoint

# Step 3: Make changes and commit with a conventional commit message
# Why: conventional commits enable automated changelog generation
git add src/health.js
git commit -m "feat: add /health endpoint for load balancer checks"

# Step 4: Push the branch and create a pull request
# Why: PRs are the gate where CI runs and peers review before code enters main
git push -u origin feature/add-health-endpoint
# At this point, a push event triggers the CI pipeline automatically

# Step 5: After PR is approved and merged, tag the release
# Why: tags mark deployable versions; semantic versioning communicates change scope
git checkout main
git pull origin main
git tag -a v1.4.0 -m "Release v1.4.0 — health endpoint for LB integration"
git push origin v1.4.0
# The tag event can trigger a release pipeline that deploys to production

# Step 6: Verify the tag points to the right commit
git log --oneline -3 --decorate
# Example output:
# a1b2c3d (HEAD -> main, tag: v1.4.0) feat: add /health endpoint
# d4e5f6g fix: correct timeout in retry logic
# g7h8i9j chore: update CI pipeline to use Node 20
```

**Why it matters:**

Every CI/CD pipeline is driven by events in version control: a push, a pull request, or a tag. DevOps engineers need to understand branching strategies because they directly affect pipeline design. They also manage infrastructure-as-code and pipeline definitions in the same repository, so Git skills are inseparable from day-to-day work.

**Key things to understand:**

- Trunk-based development keeps a single long-lived branch and uses short-lived feature branches, enabling frequent integration.
- GitFlow uses longer-lived branches (develop, release, hotfix) and suits teams with fixed release schedules.
- Tags mark specific commits as significant – typically a release version. Semantic versioning (MAJOR.MINOR.PATCH) is the standard convention.
- Pull requests (or merge requests) are the gate through which code enters the main branch; they are the natural point to trigger CI.
- `.gitignore` prevents committing secrets, build artifacts, and IDE configuration files.
- Commit messages should be descriptive and follow a convention (such as Conventional Commits) to support automated changelog generation.

**Common pitfalls:**

- Committing secrets or credentials to a repository; once pushed, they must be considered compromised even if deleted later.
- Long-lived feature branches that accumulate large diffs and cause painful merge conflicts.
- Not using tags for releases, making it difficult to reproduce a specific deployed version.
- Force-pushing to shared branches, which rewrites history and disrupts collaborators.

---

## 7. Networking Fundamentals for DevOps – DNS, HTTP, TCP/IP and Ports

Networking is the invisible fabric that connects every component in a modern system: browsers to web servers, containers to databases, CI runners to cloud APIs, and microservices to each other. A DevOps engineer does not need to be a network engineer, but a solid grasp of DNS, HTTP, TCP/IP, and port mechanics is essential for debugging connectivity issues, configuring firewalls, and understanding how traffic flows from user to application.

**Code walkthrough:**

```bash
#!/usr/bin/env bash
# Step 1: Practical networking diagnostics a beginner DevOps engineer should know
set -euo pipefail

# Step 2: DNS resolution — translate a domain to an IP address
echo "=== DNS Lookup ==="
dig +short example.com
# Why: if DNS returns nothing, the application cannot reach the target service

# Step 3: Test TCP connectivity to a specific host and port
echo "=== TCP Connectivity Check ==="
nc -zv database.internal 5432 2>&1 || echo "Connection FAILED — check firewall rules"
# Why: a closed port often means a firewall rule is missing or the service is not running

# Step 4: Trace the network path to a remote host
echo "=== Network Path ==="
traceroute -m 10 api.example.com
# Why: identifies where in the network path packets are being dropped or delayed

# Step 5: Inspect HTTP response headers from a web server
echo "=== HTTP Response Headers ==="
curl -sI https://api.example.com/health
# Why: status codes (200 OK, 301 Redirect, 502 Bad Gateway) tell you immediately
#      whether the issue is in the application, the load balancer, or the backend

# Step 6: Check which local ports are in use
echo "=== Listening Ports ==="
ss -tlnp
# Why: confirms your application is actually bound to the expected port and interface
```

**Why it matters:**

When a deployment fails with "connection refused" or an application cannot reach its database, the root cause is almost always a networking problem: a wrong DNS record, a missing firewall rule, a port not exposed, or an application binding to the wrong interface. Without basic networking skills, these issues take hours to diagnose instead of minutes.

**Key things to understand:**

- **IP addresses** uniquely identify a device on a network. IPv4 addresses (e.g. `10.0.1.5`) are still dominant in most cloud infrastructure. Private ranges (`10.x.x.x`, `172.16-31.x.x`, `192.168.x.x`) are used inside VNets.
- **DNS** translates human-readable domain names to IP addresses. A records map a domain to an IPv4 address. CNAME records alias one domain to another. TTL (Time to Live) controls how long DNS results are cached.
- **TCP/IP** is the foundational protocol suite. TCP provides reliable, ordered delivery (used by HTTP, SSH, database connections). UDP provides fast, unreliable delivery (used by DNS queries, video streaming).
- **Ports** identify specific services on a host. Well-known ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 5432 (PostgreSQL), 3306 (MySQL), 6379 (Redis). Containers expose ports that must be mapped to host ports.
- **HTTP** is the application-level protocol used by web APIs. It follows a request-response model with methods (GET, POST, PUT, DELETE) and status codes (2xx success, 3xx redirect, 4xx client error, 5xx server error).
- **Firewalls and Security Groups** control which traffic is allowed in and out. In cloud environments, Network Security Groups (NSGs) or security groups define allow/deny rules by port, protocol, and source IP.

**Common pitfalls:**

- Assuming DNS changes propagate instantly; TTL means old records can persist for hours.
- Opening port 0.0.0.0 (all interfaces) when the application should only listen on a private interface.
- Confusing `localhost` (127.0.0.1, the loopback interface) with the container's actual network address; a service bound to localhost inside a container is unreachable from outside.
- Not understanding that containers have their own network namespace; `localhost` inside a container does not mean the host machine.

---

## 8. Python for DevOps – Scripting Beyond Bash

While Bash is ideal for short automation tasks and glue scripts, Python is the go-to language when scripts grow beyond simple command execution. Python's standard library, readability, error handling, and ecosystem of libraries (such as `requests`, `boto3`, `azure-identity`) make it the better choice for API integrations, data processing, cloud automation, and any script that needs to be testable and maintainable.

**Code walkthrough:**

```python
#!/usr/bin/env python3
"""
Step 1: A Python script that automates a common DevOps task —
checking the health of multiple services and reporting status.
Why: Python is better than Bash when dealing with JSON APIs and structured data.
"""

import sys
import json
import urllib.request
import urllib.error

# Step 2: Define the services to check — externalise this to a config file in production
SERVICES = [
    {"name": "order-api", "url": "https://order-api.internal/health"},
    {"name": "payment-service", "url": "https://payment.internal/health"},
    {"name": "notification-service", "url": "https://notify.internal/health"},
]

def check_service(name: str, url: str, timeout: int = 5) -> dict:
    """
    Step 3: Check a single service and return structured status.
    Why: functions with clear signatures and return types make scripts testable.
    """
    try:
        req = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            status_code = resp.status
            body = json.loads(resp.read().decode())
            return {"name": name, "status": "healthy", "code": status_code, "detail": body}
    except urllib.error.HTTPError as e:
        return {"name": name, "status": "unhealthy", "code": e.code, "detail": str(e)}
    except Exception as e:
        return {"name": name, "status": "unreachable", "code": None, "detail": str(e)}

def main():
    # Step 4: Check all services and collect results
    results = [check_service(svc["name"], svc["url"]) for svc in SERVICES]

    # Step 5: Report results as structured JSON — pipelines can parse this
    print(json.dumps(results, indent=2))

    # Step 6: Exit with non-zero if any service is unhealthy
    # Why: exit codes drive pipeline pass/fail decisions
    unhealthy = [r for r in results if r["status"] != "healthy"]
    if unhealthy:
        print(f"\nERROR: {len(unhealthy)} service(s) unhealthy", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
```

**Why it matters:**

DevOps automation frequently involves interacting with REST APIs, parsing JSON responses, handling errors gracefully, and producing structured output that pipelines can consume. Bash can do this with `curl` and `jq`, but the resulting scripts are fragile and hard to test. Python lets you write automation that is readable, maintainable, and testable — the same qualities you expect from application code.

**Key things to understand:**

- Use `#!/usr/bin/env python3` as the shebang line to ensure the system Python 3 interpreter is used.
- Structure scripts with functions and a `main()` entry point guarded by `if __name__ == "__main__":`; this enables both direct execution and importing for unit testing.
- Use `sys.exit(0)` for success and `sys.exit(1)` for failure, matching the exit code convention Bash and CI pipelines expect.
- The `json` module (standard library) parses and serialises JSON without external dependencies.
- Use `try/except` blocks around network calls and file operations; unhandled exceptions crash scripts without actionable error messages.
- Virtual environments (`python -m venv .venv`) isolate dependencies per project, preventing version conflicts.

**Common pitfalls:**

- Using Python 2 syntax or assuming `python` points to Python 3; always use `python3` explicitly or check the version in the shebang.
- Not handling exceptions in scripts that call external APIs; network failures are the norm, not the exception.
- Installing packages globally with `pip install` instead of using a virtual environment, causing dependency conflicts across projects.
- Writing scripts without functions, making them impossible to unit test or reuse.

---

## 9. Multi-Stage Docker Builds and Container Best Practices

A multi-stage build is a Dockerfile technique where you use multiple `FROM` instructions, each starting a new stage. The first stage builds or compiles the application; the final stage copies only the finished artifact into a minimal production image. This dramatically reduces the final image size and attack surface by excluding build tools, source code, and development dependencies from the production image.

**Code walkthrough:**

```dockerfile
# Stage 1: Build — includes all build tools and dependencies
# Why: the build stage can be large; it is discarded after the artifact is extracted
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Stage 2: Production — minimal image with only the compiled output
# Why: the production image is small, secure, and contains only what is needed to run
FROM node:20-alpine AS production
WORKDIR /app

# Step 1: Create a non-root user — never run containers as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Step 2: Copy only the build output and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Step 3: Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080

# Step 4: Expose the port the application listens on
EXPOSE 8080

# Step 5: Switch to non-root user before starting the application
USER appuser

# Step 6: Use exec form for CMD — allows proper signal handling (SIGTERM)
CMD ["node", "dist/server.js"]
```

**Docker Compose for local development:**

```yaml
# docker-compose.yml — for local development only, not production orchestration
services:
  app:
    build: .
    ports:
      - "3000:8080"
    volumes:
      - ./src:/app/src    # Mount source code for hot-reload
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - db-data:/var/lib/postgresql/data    # Persist database across restarts

volumes:
  db-data:
```

**Why it matters:**

Production container images should be as small and secure as possible. Multi-stage builds achieve this by separating the build environment from the runtime environment. A Go application built in a multi-stage Dockerfile can produce a final image as small as 10-20 MB (using `scratch` or `distroless` as the final base), compared to hundreds of megabytes if the build tools are included. Smaller images mean faster pulls, faster deployments, and fewer vulnerabilities.

**Key things to understand:**

- Multi-stage builds use `FROM ... AS <name>` for each stage and `COPY --from=<name>` to transfer artifacts between stages.
- The final stage determines the production image. Only layers in the final stage are included in the shipped image.
- Always run containers as a non-root user. Create a dedicated user with `adduser` and switch to it with the `USER` instruction before `CMD`.
- Pin base image versions (`node:20-alpine`, not `node:latest`) to ensure reproducible builds. The `latest` tag can change at any time.
- Use `.dockerignore` to exclude `node_modules`, `.git`, `Dockerfile`, `docker-compose.yml`, and other files from the build context.
- Use `EXPOSE` to document which port the application listens on; it does not publish the port — that requires `-p` at runtime or `ports` in Compose.
- Prefer `CMD` in exec form (`["node", "server.js"]`) over shell form (`node server.js`) to ensure the process receives signals directly (e.g. SIGTERM for graceful shutdown).

**Common pitfalls:**

- Not using multi-stage builds, shipping development tools and source code in the production image.
- Forgetting to add a `.dockerignore` file, which copies `node_modules` and `.git` into the build context, making builds slow and images bloated.
- Using `ENTRYPOINT` and `CMD` incorrectly; `ENTRYPOINT` defines the executable, `CMD` provides default arguments. Misuse makes containers hard to override at runtime.
- Not leveraging the Docker build cache; changing a file early in the Dockerfile invalidates all subsequent layers.

---

## 10. Introduction to Cloud Concepts and Infrastructure

Cloud computing is the delivery of computing resources (servers, storage, networking, databases) over the internet, on demand, with pay-as-you-go pricing. The three major public cloud providers are Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). As a beginner DevOps engineer, you need to understand the fundamental cloud service models and how they map to the infrastructure you will manage.

**Key concepts:**

**Service Models (IaaS, PaaS, SaaS):**

- **IaaS (Infrastructure as a Service)**: The cloud provider manages the physical hardware, virtualisation, and networking. You manage the operating system, middleware, runtime, and application. Examples: AWS EC2, Azure Virtual Machines, GCP Compute Engine. You have full control but also full responsibility for patching, scaling, and securing the OS.
- **PaaS (Platform as a Service)**: The provider also manages the OS, middleware, and runtime. You manage only the application code and data. Examples: Azure App Service, AWS Elastic Beanstalk, Google App Engine. PaaS reduces operational burden but limits customisation.
- **SaaS (Software as a Service)**: The provider manages everything. You consume a fully running application. Examples: Microsoft 365, GitHub, Slack.

**Shared Responsibility Model:**

In cloud computing, security and operational responsibility are shared between the provider and the customer. The provider secures the underlying infrastructure (physical data centres, hypervisors, network fabric). The customer secures their workloads (data, identity, application configuration, access controls). The exact boundary depends on the service model: with IaaS, the customer is responsible for more; with SaaS, the provider handles most of it.

**Regions and Availability Zones:**

Cloud providers operate data centres in regions around the world (e.g. West Europe, US East). Each region contains multiple availability zones — physically separate data centres with independent power and networking. Deploying across availability zones protects against single data centre failures. Deploying across regions protects against regional outages but adds complexity and cost.

**Code walkthrough:**

```bash
#!/usr/bin/env bash
# Step 1: Basic cloud CLI commands — understanding the mapping between CLI and IaC
set -euo pipefail

# Step 2: List available regions — know where your infrastructure can live
az account list-locations --output table | head -10
# Why: choosing the right region affects latency, compliance, and cost

# Step 3: Create a resource group — the logical container for related resources
az group create \
  --name my-first-rg \
  --location westeurope
# Why: every Azure resource must belong to a resource group

# Step 4: Create a simple web app to understand PaaS
az webapp create \
  --resource-group my-first-rg \
  --plan my-first-plan \
  --name my-first-webapp \
  --runtime "NODE:20-lts"
# Why: PaaS abstracts away the OS and runtime; you deploy code, not servers

# Step 5: Clean up — always delete resources when experimenting
az group delete --name my-first-rg --yes --no-wait
# Why: cloud resources cost money; leaving test resources running is wasteful
```

**Why it matters:**

Every DevOps role in 2025-2026 involves cloud infrastructure. Even if you start by managing on-premises servers, you need to understand cloud concepts because CI/CD runners, container registries, and monitoring tools are increasingly cloud-hosted. Understanding the service models helps you choose the right level of abstraction for each workload and communicate effectively with architects and developers.

**Key things to understand:**

- Cloud resources are billed by usage (compute hours, storage GB, network egress). Forgetting to delete test resources is a real cost risk.
- Resource groups (Azure), projects (GCP), or accounts (AWS) are the organisational boundaries for managing related resources together.
- Tags on resources enable cost tracking, ownership identification, and automated governance (e.g. shutting down untagged resources).
- The cloud CLI (`az`, `aws`, `gcloud`) is the command-line interface for managing cloud resources. CLI commands map directly to API calls and to IaC resource definitions.
- Cloud shell environments (Azure Cloud Shell, AWS CloudShell) provide a browser-based terminal with pre-installed tools for quick experimentation.

**Common pitfalls:**

- Leaving test resources running and incurring unexpected charges.
- Not understanding the shared responsibility model, assuming the cloud provider handles all security.
- Choosing the wrong service model (e.g. using IaaS when PaaS would reduce operational burden).
- Deploying to a single availability zone, creating a single point of failure for the entire workload.

---
