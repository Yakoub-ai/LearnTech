
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
