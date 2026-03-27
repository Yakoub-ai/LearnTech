export const labs = [
  // ============================================================
  // LAB 1 — Dockerize an Application (copied from interactiveLabs.js)
  // ============================================================
  {
    id: 'do-lab-1',
    roleId: 'devops-platform-engineer',
    level: 'beginner',
    title: 'Dockerize an Application',
    description: 'Learn Docker fundamentals by containerizing a Node.js application step by step.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before containerizing an application, ensure your DevOps environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Docker Desktop (with Docker Compose included), Node.js 22 LTS, and a terminal. Verify Docker is running and you can pull images before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `docker --version` and `docker compose version` to verify Docker',
          'Run `node --version` to confirm Node.js 22 LTS is available'
        ],
        expectedOutput: 'Docker version 25.x.x\nDocker Compose version v2.x.x\nnode v22.x.x',
        solution: null
      },
      {
        title: 'Step 2: Write a Dockerfile',
        instruction: 'Create a Dockerfile for a simple Node.js application. Use multi-stage concepts: choose a base image, copy files, install dependencies, and set the startup command.',
        starterCode: `# Dockerfile for a Node.js application
# TODO: Choose a base image (node:20-alpine is recommended)

# TODO: Set the working directory to /app

# TODO: Copy package.json and package-lock.json first (for layer caching)

# TODO: Run npm ci --production

# TODO: Copy the rest of the application code

# TODO: Expose port 3000

# TODO: Set the command to start the app: node server.js`,
        hints: [
          'FROM node:20-alpine sets a lightweight base image',
          'COPY package*.json ./ copies both package.json and package-lock.json',
          'Copying package files before source code means npm install layer is cached unless deps change'
        ],
        expectedOutput: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
        solution: `FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy application source code
COPY . .

# Document the port the app uses
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]`
      },
      {
        title: 'Step 3: Build and Run the Container',
        instruction: 'Write the Docker commands to build the image, run the container, and verify it is working.',
        starterCode: `# Docker CLI commands — fill in the blanks

# TODO: Build the image with tag "myapp:1.0"
docker build ___

# TODO: Run the container:
#   - Detached mode (-d)
#   - Map port 3000 on host to 3000 in container
#   - Name it "myapp-container"
#   - Use the image "myapp:1.0"
docker run ___

# TODO: Check if the container is running
docker ___

# TODO: View the container logs
docker ___

# TODO: Stop and remove the container
docker ___`,
        hints: [
          'Build: docker build -t myapp:1.0 .',
          'Run: docker run -d -p 3000:3000 --name myapp-container myapp:1.0',
          'Check: docker ps, Logs: docker logs myapp-container'
        ],
        expectedOutput: `$ docker build -t myapp:1.0 .
Successfully built abc123
$ docker run -d -p 3000:3000 --name myapp-container myapp:1.0
$ docker ps
CONTAINER ID  IMAGE      STATUS   PORTS                    NAMES
abc123        myapp:1.0  Up 5s    0.0.0.0:3000->3000/tcp   myapp-container`,
        solution: `# Build the image
docker build -t myapp:1.0 .

# Run the container
docker run -d -p 3000:3000 --name myapp-container myapp:1.0

# Check if running
docker ps

# View logs
docker logs myapp-container

# Stop and remove
docker stop myapp-container && docker rm myapp-container`
      },
      {
        title: 'Step 4: Create a Docker Compose File',
        instruction: 'Write a docker-compose.yml that runs the app with a PostgreSQL database. Use environment variables, volumes, and a health check.',
        starterCode: `# docker-compose.yml
# TODO: Define two services: app and db

# version: '3.8'  (optional in modern Docker Compose)
services:
  # TODO: app service
  #   - Build from current directory
  #   - Map port 3000
  #   - Set environment variable DATABASE_URL
  #   - Depend on db service

  # TODO: db service
  #   - Use postgres:16-alpine image
  #   - Set POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
  #   - Persist data with a named volume
  #   - Add a health check

# TODO: Define named volumes`,
        hints: [
          'Use depends_on with condition: service_healthy for proper startup order',
          'Database URL format: postgres://user:password@db:5432/dbname',
          'Health check: pg_isready -U postgres'
        ],
        expectedOutput: `docker compose up -d
Creating network...
Creating volume...
Starting db... healthy
Starting app... done`,
        solution: `services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://appuser:secret@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d myapp"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:`
      },
      {
        title: 'Step 5: Add a Health Check Endpoint',
        instruction: 'Add a health check to the Dockerfile and create a simple health endpoint in the application that checks database connectivity.',
        starterCode: `# Add to Dockerfile — health check instruction
# TODO: Add a HEALTHCHECK that curls the /health endpoint every 30s

# In your server.js — add a health check that tests DB connection
app.get('/health', async (req, res) => {
  // TODO: Check database connection
  // Return 200 { status: 'healthy', db: 'connected', uptime: process.uptime() }
  // Return 503 { status: 'unhealthy', db: 'disconnected', error: message }
});`,
        hints: [
          'HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health || exit 1',
          'Use a try/catch around the DB query to catch connection errors',
          'process.uptime() gives seconds since the process started'
        ],
        expectedOutput: `GET /health → 200 { status: "healthy", db: "connected", uptime: 45.2 }
docker ps → shows (healthy) in STATUS column`,
        solution: `# Dockerfile addition
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# server.js health endpoint
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'healthy',
      db: 'connected',
      uptime: process.uptime()
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      db: 'disconnected',
      error: err.message
    });
  }
});`
      }
    ]
  },

  // ============================================================
  // LAB 2 — Production Docker Image for Python (from devops-1)
  // ============================================================
  {
    id: 'do-lab-2',
    roleId: 'devops-platform-engineer',
    level: 'beginner',
    title: 'Production Docker Image for Python',
    description: 'Build a production-ready Docker image for a FastAPI application with health checks, non-root user, and minimal attack surface.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a production Docker image for a Python app, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Docker Desktop installed and running. The Python runtime (3.11+) is used inside the Docker image — you do not need Python installed locally.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `docker --version` to verify Docker Desktop is installed',
          'Run `docker pull python:3.11-slim` to pre-pull the base image'
        ],
        expectedOutput: 'Docker version 25.x.x\npython:3.11-slim image pulled successfully',
        solution: null
      },
      {
        title: 'Step 2: Write a Slim Python Dockerfile',
        instruction: `Write a Dockerfile for a FastAPI application. Use python:3.11-slim as the base image and apply production best practices: set PYTHONUNBUFFERED so logs stream immediately, copy and install requirements before copying source code for layer caching, and define the startup command using uvicorn.

WHY: python:3.11-slim strips test tools and documentation, cutting the image size by ~60% vs the full image. PYTHONUNBUFFERED=1 ensures stdout/stderr are not buffered — critical in containers where buffered output can be lost on crash.`,
        starterCode: `# Dockerfile — FastAPI production image
# TODO: Use python:3.11-slim base image

# TODO: Set working directory to /app

# TODO: Copy requirements.txt first

# TODO: Install dependencies (no cache to keep image small)
# pip install --no-cache-dir -r requirements.txt

# TODO: Copy application source

# TODO: Set PYTHONUNBUFFERED=1 environment variable

# TODO: Start with uvicorn on 0.0.0.0:8000`,
        hints: [
          'FROM python:3.11-slim — the slim variant omits dev tools and test files',
          'COPY requirements.txt . then RUN pip install before COPY . . improves build cache hits',
          'CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] — bind to all interfaces in a container'
        ],
        expectedOutput: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        solution: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
      },
      {
        title: 'Step 3: Add a HEALTHCHECK Instruction',
        instruction: `Add a Docker HEALTHCHECK that verifies the application is responsive by calling the /health endpoint. Configure it to check every 30 seconds, allow a 10-second grace period on startup, and mark the container unhealthy after 3 consecutive failures.

WHY: Container orchestrators (Docker Compose, Kubernetes, ECS) rely on health status to route traffic and restart failed instances. A container that starts but cannot serve requests should be automatically replaced.`,
        starterCode: `# Add to your Dockerfile after the CMD instruction

# TODO: Add HEALTHCHECK with:
#   --interval=30s       (how often to check)
#   --timeout=10s        (max time for the check command)
#   --start-period=5s    (grace period before failures count)
#   --retries=3          (failures before marking unhealthy)
#
# The check command should use Python to GET http://localhost:8000/health
# Hint: python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"`,
        hints: [
          'HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\',
          '    CMD python -c "import urllib.request; urllib.request.urlopen(\'http://localhost:8000/health\')"',
          'You can also use curl if it is installed: CMD curl -f http://localhost:8000/health || exit 1'
        ],
        expectedOutput: `HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# After docker build and docker run:
$ docker ps
CONTAINER ID  STATUS
abc123        Up 45s (healthy)`,
        solution: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
      },
      {
        title: 'Step 4: Run as a Non-Root User',
        instruction: `Harden the image by creating a non-root system user and switching to it before the CMD. This is a critical security practice: if the application is compromised, the attacker cannot write to system directories or install packages.

WHY: By default Docker containers run as root (uid 0), which matches root on the host. A container escape vulnerability would give an attacker full host access. Running as a dedicated user limits blast radius.`,
        starterCode: `# Add user creation and USER switch to your Dockerfile

# TODO: After installing dependencies and copying source,
# create a non-root system user named "appuser" (no login shell, no home dir)
# RUN useradd --system --no-create-home --shell /bin/false appuser

# TODO: Change ownership of /app to appuser
# RUN chown -R appuser:appuser /app

# TODO: Switch to the non-root user before CMD
# USER appuser`,
        hints: [
          'RUN useradd --system --no-create-home --shell /bin/false appuser',
          'RUN chown -R appuser:appuser /app — ensure the user can read app files',
          'USER appuser — place this just before CMD so all subsequent commands run as this user'
        ],
        expectedOutput: `# Verify the running user inside the container:
$ docker run --rm myapp:secure whoami
appuser

$ docker run --rm myapp:secure id
uid=999(appuser) gid=999(appuser) groups=999(appuser)`,
        solution: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

# Create a non-root user for security
RUN useradd --system --no-create-home --shell /bin/false appuser
RUN chown -R appuser:appuser /app

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

USER appuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
      },
      {
        title: 'Step 5: Build, Scan, and Push the Image',
        instruction: `Build the final image, scan it for known vulnerabilities using Docker Scout (or Trivy), tag it for a registry, and push it. Use semantic versioning for tags and also tag as latest.

WHY: Vulnerability scanning catches CVEs in base images and dependencies before they reach production. Semantic tags (v1.2.3) enable rollbacks; latest is a convenience alias.`,
        starterCode: `# Build the image
# TODO: Build with two tags: myapp:1.0.0 and myapp:latest
docker build ___

# Scan for vulnerabilities (Docker Scout)
# TODO: Run a quick CVE scan on myapp:1.0.0
docker scout ___

# Tag for a registry (replace with your registry URL)
# TODO: Tag myapp:1.0.0 for registry.example.com/team/myapp:1.0.0
docker tag ___

# Push to registry
# TODO: Push the tagged image
docker push ___`,
        hints: [
          'docker build -t myapp:1.0.0 -t myapp:latest . — multiple -t flags in one build',
          'docker scout cves myapp:1.0.0 — shows CVEs found in the image layers',
          'docker tag myapp:1.0.0 registry.example.com/team/myapp:1.0.0'
        ],
        expectedOutput: `Successfully built d4e5f6g7
Successfully tagged myapp:1.0.0
Successfully tagged myapp:latest

✓ SBOM generated (312 packages)
✓ 0 critical vulnerabilities found
⚠ 2 medium vulnerabilities found (see report)

The push refers to repository [registry.example.com/team/myapp]
1.0.0: digest: sha256:abc... size: 1234`,
        solution: `# Build with multiple tags
docker build -t myapp:1.0.0 -t myapp:latest .

# Scan for vulnerabilities
docker scout cves myapp:1.0.0

# Tag for remote registry
docker tag myapp:1.0.0 registry.example.com/team/myapp:1.0.0
docker tag myapp:latest registry.example.com/team/myapp:latest

# Push both tags
docker push registry.example.com/team/myapp:1.0.0
docker push registry.example.com/team/myapp:latest`
      }
    ]
  },

  // ============================================================
  // LAB 3 — Docker Compose Multi-Service Setup (from devops-2)
  // ============================================================
  {
    id: 'do-lab-3',
    roleId: 'devops-platform-engineer',
    level: 'mid',
    title: 'Docker Compose Multi-Service Stack',
    description: 'Orchestrate a web application with PostgreSQL and Redis using Docker Compose, including health checks, named volumes, and environment-based configuration.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a Docker Compose stack, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Docker Desktop (which includes Docker Compose). Verify that both `docker` and `docker compose` commands are available in your terminal.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `docker --version` to verify Docker Desktop',
          'Run `docker compose version` to verify Docker Compose is included'
        ],
        expectedOutput: 'Docker version 25.x.x\nDocker Compose version v2.x.x',
        solution: null
      },
      {
        title: 'Step 2: Define the Web Service',
        instruction: `Write the web service section of docker-compose.yml. The web service builds from the current directory, exposes port 8000, sets DATABASE_URL and REDIS_URL environment variables, and declares dependencies on postgres and redis.

WHY: Docker Compose dependency ordering (depends_on) ensures infrastructure services start before the application. Environment variables decouple configuration from code — the same image runs in dev, staging, and production with different values.`,
        starterCode: `# docker-compose.yml — start with the web service
services:
  web:
    # TODO: Build from the current directory (build: .)

    # TODO: Map host port 8000 to container port 8000

    # TODO: Set two environment variables:
    #   DATABASE_URL=postgresql://user:password@postgres:5432/app
    #   REDIS_URL=redis://redis:6379

    # TODO: Declare dependencies on postgres and redis services

    # TODO: Mount ./app directory to /app in the container (for hot reload)`,
        hints: [
          'build: . tells Compose to build from the Dockerfile in the current directory',
          'ports: - "8000:8000" maps host:container',
          'depends_on: - postgres\\n  - redis — Compose starts those services first'
        ],
        expectedOutput: `services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./app:/app`,
        solution: `services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./app:/app`
      },
      {
        title: 'Step 3: Add PostgreSQL with Health Check',
        instruction: `Add the postgres service using the postgres:16-alpine image. Configure it with environment variables for credentials, a named volume for persistent data, and a health check using pg_isready. Update the web service to wait for postgres to be healthy (not just started).

WHY: Without a health check condition, Compose marks postgres "started" when the process launches — but the database may need several seconds to accept connections. service_healthy waits for the health check to pass before starting dependent services.`,
        starterCode: `# Add to docker-compose.yml (below the web service)
  postgres:
    # TODO: Use postgres:16-alpine image

    # TODO: Set environment variables:
    #   POSTGRES_USER: user
    #   POSTGRES_PASSWORD: password
    #   POSTGRES_DB: app

    # TODO: Mount a named volume "postgres_data" to /var/lib/postgresql/data

    # TODO: Add healthcheck:
    #   test: pg_isready -U user
    #   interval: 5s, timeout: 5s, retries: 5

# Also update depends_on in the web service to use condition: service_healthy`,
        hints: [
          'healthcheck test: ["CMD-SHELL", "pg_isready -U user"] — use CMD-SHELL for shell expansion',
          'Update web.depends_on: postgres: condition: service_healthy',
          'Named volumes must also be declared under a top-level volumes: key'
        ],
        expectedOutput: `  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5`,
        solution: `  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

# Updated web service depends_on:
  web:
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started`
      },
      {
        title: 'Step 4: Add Redis and Named Volumes',
        instruction: `Add the redis service (redis:7-alpine) and declare all named volumes at the top level. Then write the complete docker-compose.yml file combining all sections.

WHY: Named volumes persist data across container restarts and recreations. Unlike bind mounts they are managed by Docker and can be backed up, migrated, or mounted to multiple containers.`,
        starterCode: `# Complete docker-compose.yml — put it all together

services:
  web:
    # ... (your web service from Step 2 with updated depends_on)

  postgres:
    # ... (your postgres service from Step 3)

  redis:
    # TODO: Add redis:7-alpine image
    # TODO: Expose port 6379 (optional, for local debugging)

# TODO: Declare top-level named volumes
volumes:
  # TODO: postgres_data`,
        hints: [
          'redis:7-alpine — use the alpine variant for a smaller footprint',
          'Top-level volumes: postgres_data: (with a colon and empty value) lets Docker manage the volume',
          'Run docker compose up -d to start all services in detached mode'
        ],
        expectedOutput: `$ docker compose up -d
[+] Running 4/4
 ✔ Network app_default      Created
 ✔ Container app-postgres-1 Healthy
 ✔ Container app-redis-1    Started
 ✔ Container app-web-1      Started

$ docker compose ps
NAME             STATUS          PORTS
app-postgres-1   Up (healthy)    5432/tcp
app-redis-1      Up              0.0.0.0:6379->6379/tcp
app-web-1        Up              0.0.0.0:8000->8000/tcp`,
        solution: `services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./app:/app

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`
      },
      {
        title: 'Step 5: Override Configuration for Production',
        instruction: `Create a docker-compose.override.yml for local development and a docker-compose.prod.yml for production. The override enables hot reload and debug logging. The prod file removes bind mounts, sets restart: always, and adds resource limits.

WHY: Compose file layering (override files) lets you share a base configuration while customising per environment. Production containers should always restart on failure and should have memory/CPU limits to prevent a single runaway container from starving the host.`,
        starterCode: `# docker-compose.override.yml  (auto-loaded in development)
services:
  web:
    # TODO: Override command to enable hot reload (uvicorn --reload)
    # TODO: Set LOG_LEVEL=debug environment variable
    # TODO: Mount source code for live editing

---

# docker-compose.prod.yml  (use with: docker compose -f docker-compose.yml -f docker-compose.prod.yml up)
services:
  web:
    # TODO: Set restart: always
    # TODO: Remove the ./app bind mount (use image code only)
    # TODO: Add deploy.resources.limits: cpus '0.5', memory: 512M`,
        hints: [
          'command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload — override the CMD from Dockerfile',
          'restart: always — restarts on crash or daemon restart; use unless-stopped in some setups',
          'deploy.resources.limits is the modern replacement for the old mem_limit / cpu_shares fields'
        ],
        expectedOutput: `# docker-compose.override.yml
services:
  web:
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    environment:
      - LOG_LEVEL=debug
    volumes:
      - ./app:/app

# docker-compose.prod.yml
services:
  web:
    restart: always
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M`,
        solution: `# docker-compose.override.yml
services:
  web:
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    environment:
      - LOG_LEVEL=debug
    volumes:
      - ./app:/app

# docker-compose.prod.yml
services:
  web:
    restart: always
    volumes: []    # remove bind mount
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
  postgres:
    restart: always
  redis:
    restart: always`
      }
    ]
  },

  // ============================================================
  // LAB 4 — GitHub Actions CI/CD Pipeline (from devops-3)
  // ============================================================
  {
    id: 'do-lab-4',
    roleId: 'devops-platform-engineer',
    level: 'senior',
    title: 'GitHub Actions CI/CD Pipeline',
    description: 'Build a production-grade CI/CD pipeline with automated testing, Docker image builds, vulnerability scanning, and environment-gated deployments.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a GitHub Actions pipeline, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Git installed, a GitHub account with a repository, and Python 3.12+ with pytest for the test workflow. The pipeline runs on GitHub\'s servers — no local CI runner needed.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `git --version` to confirm Git is installed',
          'Run `pip install pytest` and verify with `pytest --version`'
        ],
        expectedOutput: 'git version 2.x.x\npytest 8.x.x\nGitHub account and repository ready',
        solution: null
      },
      {
        title: 'Step 2: Define Triggers and the Test Job',
        instruction: `Write the workflow triggers and the test job. The workflow runs on push to main and develop, and on pull requests targeting main. The test job sets up a PostgreSQL service container, installs Python 3.11, installs dependencies from requirements.txt, and runs pytest.

WHY: Running tests against a real database service container (not a mock) catches integration bugs that unit tests miss. The service container shares the job's Docker network, so your tests connect on localhost with the mapped port.`,
        starterCode: `# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

# TODO: Set up triggers:
#   - push to branches: [main, develop]
#   - pull_request targeting branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    # TODO: Add a postgres service container
    # services:
    #   postgres:
    #     image: postgres:16
    #     env: POSTGRES_PASSWORD=postgres, POSTGRES_DB=testdb
    #     ports: 5432:5432
    #     options: health check for pg_isready

    steps:
      # TODO: Checkout the repository

      # TODO: Set up Python 3.11 using actions/setup-python@v5

      # TODO: Cache pip dependencies (optional but good practice)

      # TODO: Install dependencies from requirements.txt

      # TODO: Run pytest with verbose output`,
        hints: [
          'on: push: branches: [main, develop]\\n  pull_request: branches: [main]',
          'services: postgres: image: postgres:16\\n    env: { POSTGRES_PASSWORD: postgres }\\n    options: --health-cmd pg_isready',
          'uses: actions/setup-python@v5\\n  with: python-version: "3.11"'
        ],
        expectedOutput: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest -v`,
        solution: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest -v
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb`
      },
      {
        title: 'Step 3: Build and Push the Docker Image',
        instruction: `Add a build job that runs only after tests pass and only on pushes to main (not pull requests). Use docker/build-push-action to build a multi-platform image (linux/amd64 and linux/arm64), tag it with the git SHA for traceability, and push it to Docker Hub.

WHY: Multi-platform builds ensure the image runs on both x86 servers and ARM instances (AWS Graviton, Apple Silicon). Tagging with the git SHA creates an immutable, traceable link between the image and the commit that produced it — essential for auditing and rollbacks.`,
        starterCode: `# Add below the test job in ci-cd.yml

  build:
    runs-on: ubuntu-latest
    # TODO: Make this job depend on the test job passing
    needs: ___

    # TODO: Only run on pushes to main (skip PRs)
    if: ___

    steps:
      - uses: actions/checkout@v4

      # TODO: Set up QEMU for multi-platform builds
      # uses: docker/setup-qemu-action@v3

      # TODO: Set up Docker Buildx
      # uses: docker/setup-buildx-action@v3

      # TODO: Log in to Docker Hub using secrets
      # uses: docker/login-action@v3
      # with: username and password from secrets

      # TODO: Build and push multi-platform image
      # uses: docker/build-push-action@v5
      # with:
      #   platforms: linux/amd64,linux/arm64
      #   push: true
      #   tags: myrepo/app:latest and myrepo/app:<git-sha>`,
        hints: [
          'needs: test — the build job only runs if the test job succeeds',
          'if: github.event_name == \'push\' && github.ref == \'refs/heads/main\'',
          'tags: \${{ secrets.DOCKERHUB_USERNAME }}/app:latest,\${{ secrets.DOCKERHUB_USERNAME }}/app:\${{ github.sha }}'
        ],
        expectedOutput: `  build:
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-qemu-action@v3
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            \${{ secrets.DOCKERHUB_USERNAME }}/app:latest
            \${{ secrets.DOCKERHUB_USERNAME }}/app:\${{ github.sha }}`,
        solution: `  build:
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-qemu-action@v3
      - uses: docker/setup-buildx-action@v3
      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build and push multi-platform image
        uses: docker/build-push-action@v5
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          cache-from: type=gha
          cache-to: type=gha,mode=max
          tags: |
            \${{ secrets.DOCKERHUB_USERNAME }}/app:latest
            \${{ secrets.DOCKERHUB_USERNAME }}/app:\${{ github.sha }}`
      },
      {
        title: 'Step 4: Add a Deploy Job with Environment Protection',
        instruction: `Add a deploy job that triggers after a successful build, uses a GitHub Environment named "production" (which can require manual approval), and runs a deployment script or calls a cloud CLI to update the running service.

WHY: GitHub Environments with required reviewers create a mandatory approval gate before production deployments. This implements the four-eyes principle — no code reaches production without a human sign-off, even if CI is fully automated.`,
        starterCode: `# Add below the build job

  deploy:
    runs-on: ubuntu-latest
    # TODO: Depend on the build job

    # TODO: Pin this job to the "production" GitHub Environment
    # environment: production

    steps:
      - uses: actions/checkout@v4

      # TODO: Configure AWS credentials from secrets
      # uses: aws-actions/configure-aws-credentials@v4
      # with: aws-access-key-id, aws-secret-access-key, aws-region

      # TODO: Update the ECS service to use the new image
      # Run: aws ecs update-service to force a new deployment
      # The image tag to use is the git SHA: \${{ github.sha }}`,
        hints: [
          'environment: production — configure this environment in GitHub repo Settings > Environments',
          'aws ecs update-service --cluster prod --service app --force-new-deployment',
          'Pass the image tag as an environment variable: IMAGE_TAG: \${{ github.sha }}'
        ],
        expectedOutput: `  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster prod \\
            --service app \\
            --force-new-deployment
        env:
          IMAGE_TAG: \${{ github.sha }}`,
        solution: `  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster prod \\
            --service app \\
            --force-new-deployment
        env:
          IMAGE_TAG: \${{ github.sha }}`
      },
      {
        title: 'Step 5: Add Notifications and Status Badges',
        instruction: `Add a Slack notification step that runs after the deploy job (regardless of success or failure) to report deployment status. Then generate a README badge that shows the current workflow status.

WHY: Observability of the pipeline itself is as important as observability of the application. Instant Slack notifications close the feedback loop — the team knows within seconds whether a deployment succeeded or failed, without polling GitHub.`,
        starterCode: `# Add a notification step to the deploy job

      # TODO: Add a step that always runs (even on failure) to post to Slack
      # uses: slackapi/slack-github-action@v1
      # with: payload containing job status, commit SHA, actor, and run URL
      # if: always()

# README badge (add to your README.md):
# TODO: Write the Markdown badge syntax for a GitHub Actions workflow status badge
# Format: ![CI/CD](https://github.com/OWNER/REPO/actions/workflows/WORKFLOW_FILE/badge.svg)`,
        hints: [
          'if: always() — ensures the notification step runs even when previous steps fail',
          'uses: slackapi/slack-github-action@v1.26.0 with slack-message containing \${{ job.status }}',
          'Badge: ![CI/CD](https://github.com/your-org/your-repo/actions/workflows/ci-cd.yml/badge.svg)'
        ],
        expectedOutput: `# Notification step in deploy job:
      - name: Notify Slack
        if: always()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          slack-message: |
            Deployment \${{ job.status }}
            Commit: \${{ github.sha }}
            Actor: \${{ github.actor }}
            Run: \${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}

# README.md badge:
![CI/CD](https://github.com/your-org/your-repo/actions/workflows/ci-cd.yml/badge.svg)`,
        solution: `      - name: Notify Slack on deployment result
        if: always()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          slack-message: |
            *Deployment \${{ job.status }}* :rocket:
            *Commit:* \`\${{ github.sha }}\`
            *Actor:* \${{ github.actor }}
            *Run:* \${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}

# README.md status badge:
# ![CI/CD](https://github.com/your-org/your-repo/actions/workflows/ci-cd.yml/badge.svg)`
      }
    ]
  },

  // ============================================================
  // LAB 5 — Terraform Infrastructure as Code (from dv-4)
  // ============================================================
  {
    id: 'do-lab-5',
    roleId: 'devops-platform-engineer',
    level: 'mid',
    title: 'Terraform Module: Auto-Scaling Web App',
    description: 'Build a reusable Terraform module that provisions an AWS Auto Scaling Group with validated input variables, resource tagging, and exported outputs for downstream use.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing Terraform infrastructure code, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Terraform CLI and a cloud provider CLI (AWS CLI, gcloud, or Azure CLI) configured with valid credentials. Run `terraform init` to initialise your working directory.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `terraform --version` to verify Terraform CLI',
          'Run `aws sts get-caller-identity` (or equivalent for GCP/Azure) to verify cloud credentials'
        ],
        expectedOutput: 'Terraform v1.x.x\nCloud provider CLI authenticated\nterraform init: Initializing provider plugins...',
        solution: null
      },
      {
        title: 'Step 2: Define Variables with Validation',
        instruction: `Create variables.tf for the web-app module. Define variables for app_name, environment, instance_type, min_instances, and max_instances. Add validation blocks to enforce allowed values and prevent invalid configurations.

WHY: Terraform validation blocks catch configuration errors at plan time — before any infrastructure is created. This prevents costly mistakes like deploying to the wrong environment or using an unsupported instance type.`,
        starterCode: `# variables.tf — Module input variables

# TODO: app_name variable
#   - type: string
#   - description: "Name of the application"
#   - validation: length must be 1–32 characters

variable "app_name" {
  description = "Name of the application"
  type        = string
  # TODO: Add validation block
}

# TODO: environment variable
#   - type: string, default: "staging"
#   - validation: must be one of ["dev", "staging", "production"]

# TODO: instance_type variable
#   - type: string, default: "t3.micro"

# TODO: min_instances and max_instances variables
#   - type: number
#   - defaults: 1 and 4 respectively`,
        hints: [
          'validation { condition = length(var.app_name) > 0 && length(var.app_name) <= 32 }',
          'condition = contains(["dev", "staging", "production"], var.environment)',
          'error_message must end with a period and describe what the valid values are'
        ],
        expectedOutput: `variable "app_name" {
  description = "Name of the application"
  type        = string
  validation {
    condition     = length(var.app_name) > 0 && length(var.app_name) <= 32
    error_message = "app_name must be between 1 and 32 characters."
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "staging"
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "environment must be dev, staging, or production."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "min_instances" {
  description = "Minimum number of instances in the ASG"
  type        = number
  default     = 1
}

variable "max_instances" {
  description = "Maximum number of instances in the ASG"
  type        = number
  default     = 4
}

variable "subnet_ids" {
  description = "List of subnet IDs for the Auto Scaling Group"
  type        = list(string)
}

variable "alb_security_group_ids" {
  description = "Security group IDs for the ALB"
  type        = list(string)
}`,
        solution: `variable "app_name" {
  description = "Name of the application"
  type        = string
  validation {
    condition     = length(var.app_name) > 0 && length(var.app_name) <= 32
    error_message = "app_name must be between 1 and 32 characters."
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "staging"
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "environment must be dev, staging, or production."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "min_instances" {
  description = "Minimum number of instances in the ASG"
  type        = number
  default     = 1
}

variable "max_instances" {
  description = "Maximum number of instances in the ASG"
  type        = number
  default     = 4
}

variable "subnet_ids" {
  description = "List of subnet IDs for the Auto Scaling Group"
  type        = list(string)
}

variable "alb_security_group_ids" {
  description = "Security group IDs for the ALB"
  type        = list(string)
}`
      },
      {
        title: 'Step 3: Define the Launch Template and ASG',
        instruction: `Write main.tf with a locals block for common tags, an aws_launch_template resource, and an aws_autoscaling_group resource. Use the template literal syntax for user_data to bootstrap Docker on the instance.

WHY: A locals block centralises tags so every resource gets consistent metadata — this is critical for cost allocation and resource tracking in AWS. Launch templates are the modern replacement for launch configurations, supporting versioning and immutable deployments.`,
        starterCode: `# main.tf — Core infrastructure resources

# TODO: Define locals with common_tags map
# Include: Application = var.app_name, Environment = var.environment, ManagedBy = "terraform"
locals {
  common_tags = {
    # TODO: fill in tags
  }
}

# TODO: aws_launch_template "app"
#   - name_prefix using app_name and environment
#   - image_id from data.aws_ami.amazon_linux.id
#   - instance_type from variable
#   - tag_specifications for resource_type = "instance"
#   - user_data (base64) that installs Docker and pulls the app image

# TODO: aws_autoscaling_group "app"
#   - name using app_name and environment
#   - min_size, max_size, desired_capacity from variables
#   - vpc_zone_identifier = var.subnet_ids
#   - launch_template block referencing the template above`,
        hints: [
          'user_data = base64encode(<<-EOF\\n  #!/bin/bash\\n  yum install -y docker\\nEOF\\n)',
          'tag_specifications { resource_type = "instance"\\n  tags = local.common_tags }',
          'launch_template { id = aws_launch_template.app.id\\n  version = "$Latest" }'
        ],
        expectedOutput: `locals {
  common_tags = {
    Application = var.app_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_launch_template" "app" {
  name_prefix   = "\${var.app_name}-\${var.environment}-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type

  tag_specifications {
    resource_type = "instance"
    tags          = local.common_tags
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker
    systemctl start docker
    docker pull myrepo/\${var.app_name}:latest
    docker run -d -p 80:8000 myrepo/\${var.app_name}:latest
  EOF
  )
}

resource "aws_autoscaling_group" "app" {
  name                = "\${var.app_name}-\${var.environment}-asg"
  min_size            = var.min_instances
  max_size            = var.max_instances
  desired_capacity    = var.min_instances
  vpc_zone_identifier = var.subnet_ids

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }
}`,
        solution: `locals {
  common_tags = {
    Application = var.app_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_launch_template" "app" {
  name_prefix   = "\${var.app_name}-\${var.environment}-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type

  tag_specifications {
    resource_type = "instance"
    tags          = local.common_tags
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker
    systemctl start docker
    docker pull myrepo/\${var.app_name}:latest
    docker run -d -p 80:8000 myrepo/\${var.app_name}:latest
  EOF
  )
}

resource "aws_autoscaling_group" "app" {
  name                = "\${var.app_name}-\${var.environment}-asg"
  min_size            = var.min_instances
  max_size            = var.max_instances
  desired_capacity    = var.min_instances
  vpc_zone_identifier = var.subnet_ids

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "\${var.app_name}-\${var.environment}"
    propagate_at_launch = true
  }
}`
      },
      {
        title: 'Step 4: Define Module Outputs',
        instruction: `Write outputs.tf to expose the ASG name and launch template ID to callers of this module. Also add an Application Load Balancer resource that distributes traffic across ASG instances.

WHY: Module outputs are the contract between a module and its caller. Exposing the ASG name allows a root module to attach scaling policies or monitoring. The ALB decouples DNS from instance IDs, enabling zero-downtime deployments.`,
        starterCode: `# outputs.tf — Values exposed to callers of this module

# TODO: Output "asg_name"
#   description: "Name of the Auto Scaling Group"
#   value: the ASG resource name

# TODO: Output "launch_template_id"
#   description: "ID of the launch template"
#   value: the launch template resource ID

# TODO: Add to main.tf — an aws_lb (Application Load Balancer)
#   - name: "\${var.app_name}-\${var.environment}-alb"
#   - internal: false (internet-facing)
#   - load_balancer_type: "application"
#   - tags: local.common_tags`,
        hints: [
          'output "asg_name" { value = aws_autoscaling_group.app.name }',
          'output "alb_dns_name" — expose the ALB DNS so callers can configure Route53',
          'aws_lb requires security_groups and subnets arguments to be valid'
        ],
        expectedOutput: `output "asg_name" {
  description = "Name of the Auto Scaling Group"
  value       = aws_autoscaling_group.app.name
}

output "launch_template_id" {
  description = "ID of the launch template"
  value       = aws_launch_template.app.id
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.app.dns_name
}`,
        solution: `# outputs.tf
output "asg_name" {
  description = "Name of the Auto Scaling Group"
  value       = aws_autoscaling_group.app.name
}

output "launch_template_id" {
  description = "ID of the launch template"
  value       = aws_launch_template.app.id
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.app.dns_name
}

# Addition to main.tf — Application Load Balancer
resource "aws_lb" "app" {
  name               = "\${var.app_name}-\${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.alb_security_group_ids
  subnets            = var.subnet_ids
  tags               = local.common_tags
}`
      },
      {
        title: 'Step 5: Plan, Apply, and Manage State',
        instruction: `Write the Terraform CLI commands to initialise the module, run a plan, apply to staging, and then promote to production by changing the environment variable. Configure remote state using an S3 backend with DynamoDB state locking.

WHY: Remote state in S3 with DynamoDB locking prevents two engineers from running apply simultaneously — a race condition that can corrupt infrastructure state. State locking is non-negotiable on teams of more than one person.`,
        starterCode: `# backend.tf — Remote state configuration
terraform {
  backend "s3" {
    # TODO: bucket name for Terraform state
    bucket = "___"
    # TODO: key path within the bucket
    key    = "___/terraform.tfstate"
    region = "us-east-1"
    # TODO: DynamoDB table for state locking
    dynamodb_table = "___"
    encrypt        = true
  }
}

# CLI commands — fill in the blanks

# TODO: Initialise Terraform (download providers, configure backend)
terraform ___

# TODO: Plan for staging environment
terraform plan -var="environment=staging" -var="app_name=myapp" ___

# TODO: Apply to staging (auto-approve for CI use)
terraform apply ___

# TODO: Plan for production (review before applying)
terraform plan -var="environment=production" ___`,
        hints: [
          'terraform init — downloads the AWS provider and configures the S3 backend',
          'terraform plan -var="environment=staging" -out=staging.tfplan — save the plan for deterministic apply',
          'terraform apply -auto-approve staging.tfplan — apply the saved plan without interactive confirmation'
        ],
        expectedOutput: `# backend.tf
terraform {
  backend "s3" {
    bucket         = "mycompany-tf-state"
    key            = "web-app/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

# Commands:
$ terraform init
Initializing the backend... Successfully configured the backend "s3"!

$ terraform plan -var="environment=staging" -var="app_name=myapp" -out=staging.tfplan
Plan: 3 to add, 0 to change, 0 to destroy.

$ terraform apply -auto-approve staging.tfplan
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.`,
        solution: `# backend.tf
terraform {
  required_version = ">= 1.9"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "mycompany-tf-state"
    key            = "web-app/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

# CLI workflow:
# 1. Initialise
terraform init

# 2. Plan and save for staging
terraform plan \\
  -var="environment=staging" \\
  -var="app_name=myapp" \\
  -out=staging.tfplan

# 3. Apply saved plan
terraform apply -auto-approve staging.tfplan

# 4. Plan for production (always review before applying to prod)
terraform plan \\
  -var="environment=production" \\
  -var="app_name=myapp" \\
  -out=prod.tfplan

# 5. Apply production after review
terraform apply prod.tfplan`
      }
    ]
  },

  // ============================================================
  // LAB 6 — Kubernetes Deployment (from dv-5)
  // ============================================================
  {
    id: 'do-lab-6',
    roleId: 'devops-platform-engineer',
    level: 'senior',
    title: 'Production Kubernetes Deployment',
    description: 'Write and apply production-grade Kubernetes manifests: Deployment with rolling updates and resource limits, ConfigMap, Secret, HorizontalPodAutoscaler, and PodDisruptionBudget.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing Kubernetes manifests, ensure your environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Docker Desktop, kubectl, and a local Kubernetes cluster (minikube or kind). Start your cluster and verify kubectl can connect before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `kubectl version --client` to verify kubectl is installed',
          'Run `kubectl cluster-info` to confirm your cluster is running and reachable'
        ],
        expectedOutput: 'kubectl version: v1.x.x\nKubernetes cluster running\nkubectl cluster-info: control plane at https://...',
        solution: null
      },
      {
        title: 'Step 2: Create a ConfigMap and Secret',
        instruction: `Write a ConfigMap for non-sensitive configuration (LOG_LEVEL, MAX_CONNECTIONS, FEATURE_FLAGS) and a Secret for sensitive values (DATABASE_URL, API_KEY). Both live in the production namespace.

WHY: Separating config from code enables the same image to run in dev, staging, and production with different settings. ConfigMaps for non-sensitive data, Secrets for sensitive data — Secrets are base64-encoded and can be encrypted at rest with KMS in managed Kubernetes clusters.`,
        starterCode: `# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  # TODO: name: webapp-config, namespace: production, label app: webapp
data:
  # TODO: LOG_LEVEL: "info"
  # TODO: MAX_CONNECTIONS: "100"
  # TODO: FEATURE_FLAGS: "new-dashboard=true,beta-api=false"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  # TODO: name: webapp-secrets, namespace: production
type: Opaque
# Note: values must be base64 encoded
# echo -n "your-value" | base64
data:
  # TODO: DATABASE_URL (base64 encoded postgresql connection string)
  # TODO: API_KEY (base64 encoded key)`,
        hints: [
          'ConfigMap data values are plain strings — no base64 encoding needed',
          'Secret data values must be base64: echo -n "postgres://user:pass@host/db" | base64',
          'Use stringData: instead of data: in Secrets to write plain text (Kubernetes encodes it on apply)'
        ],
        expectedOutput: `apiVersion: v1
kind: ConfigMap
metadata:
  name: webapp-config
  namespace: production
  labels:
    app: webapp
data:
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
  FEATURE_FLAGS: "new-dashboard=true,beta-api=false"
---
apiVersion: v1
kind: Secret
metadata:
  name: webapp-secrets
  namespace: production
type: Opaque
stringData:
  DATABASE_URL: "postgresql://user:password@postgres:5432/app"
  API_KEY: "your-api-key-here"`,
        solution: `apiVersion: v1
kind: ConfigMap
metadata:
  name: webapp-config
  namespace: production
  labels:
    app: webapp
data:
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
  FEATURE_FLAGS: "new-dashboard=true,beta-api=false"
---
apiVersion: v1
kind: Secret
metadata:
  name: webapp-secrets
  namespace: production
  labels:
    app: webapp
type: Opaque
stringData:
  DATABASE_URL: "postgresql://user:password@postgres:5432/app"
  API_KEY: "your-api-key-here"`
      },
      {
        title: 'Step 3: Write the Deployment Manifest',
        instruction: `Write a Deployment for webapp in the production namespace with 3 replicas, a RollingUpdate strategy (maxSurge: 1, maxUnavailable: 0), resource requests/limits, readiness and liveness probes, and references to the ConfigMap and Secret from Step 2.

WHY: maxUnavailable: 0 guarantees zero downtime during rollouts — Kubernetes must bring up the new pod before terminating the old one. Resource limits prevent a memory leak from taking down the entire node. The readiness probe keeps traffic away from a pod until it is actually ready to serve.`,
        starterCode: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: production
  labels:
    app: webapp
    version: v1.2.0
spec:
  replicas: 3
  # TODO: Add revisionHistoryLimit: 5 (for rollback history)

  # TODO: RollingUpdate strategy
  #   maxSurge: 1 (one extra pod during rollout)
  #   maxUnavailable: 0 (no pods removed before new ones are ready)

  selector:
    matchLabels:
      app: webapp

  template:
    metadata:
      labels:
        app: webapp
        version: v1.2.0
    spec:
      # TODO: Set terminationGracePeriodSeconds: 60
      containers:
        - name: webapp
          image: registry.example.com/webapp:v1.2.0
          ports:
            - containerPort: 8000
          # TODO: Load all keys from webapp-config ConfigMap as env vars (envFrom)
          # TODO: Load all keys from webapp-secrets Secret as env vars (envFrom)
          # TODO: resource requests: cpu 250m, memory 256Mi
          # TODO: resource limits: cpu 500m, memory 512Mi
          # TODO: readinessProbe: GET /healthz:8000, delay 5s, period 10s, failThreshold 3
          # TODO: livenessProbe: GET /healthz:8000, delay 15s, period 20s, failThreshold 3`,
        hints: [
          'envFrom: - configMapRef: name: webapp-config\\n  - secretRef: name: webapp-secrets',
          'resources: requests: cpu: "250m"\\n  memory: "256Mi"\\nlimits: cpu: "500m"\\n  memory: "512Mi"',
          'readinessProbe: httpGet: path: /healthz\\n  port: 8000\\ninitialDelaySeconds: 5'
        ],
        expectedOutput: `spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      terminationGracePeriodSeconds: 60
      containers:
        - name: webapp
          envFrom:
            - configMapRef:
                name: webapp-config
            - secretRef:
                name: webapp-secrets
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
            failureThreshold: 3`,
        solution: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: production
  labels:
    app: webapp
    version: v1.2.0
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
        version: v1.2.0
    spec:
      serviceAccountName: webapp-sa
      terminationGracePeriodSeconds: 60
      containers:
        - name: webapp
          image: registry.example.com/webapp:v1.2.0
          ports:
            - containerPort: 8000
              protocol: TCP
          envFrom:
            - configMapRef:
                name: webapp-config
            - secretRef:
                name: webapp-secrets
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8000
            initialDelaySeconds: 15
            periodSeconds: 20
            failureThreshold: 3
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 10"]`
      },
      {
        title: 'Step 4: Add HorizontalPodAutoscaler and Service',
        instruction: `Add a ClusterIP Service that exposes the Deployment on port 80 (targeting container port 8000), and a HorizontalPodAutoscaler that scales between 3 and 10 replicas based on 70% CPU utilisation.

WHY: The HPA watches real CPU metrics and adjusts replica count automatically — this is reactive autoscaling. Combined with cluster-level node autoscaling (e.g., Karpenter or Cluster Autoscaler), your infrastructure scales both vertically (nodes) and horizontally (pods) without manual intervention.`,
        starterCode: `# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  namespace: production
spec:
  # TODO: selector matching app: webapp
  # TODO: port 80 targeting containerPort 8000
  # TODO: type: ClusterIP (internal service — expose via Ingress)

---
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
  namespace: production
spec:
  # TODO: scaleTargetRef pointing to the webapp Deployment
  # TODO: minReplicas: 3, maxReplicas: 10
  # TODO: CPU metric: averageUtilization 70%`,
        hints: [
          'Service selector: app: webapp — must match the pod template labels exactly',
          'scaleTargetRef: apiVersion: apps/v1\\n  kind: Deployment\\n  name: webapp',
          'metrics: - type: Resource\\n  resource: name: cpu\\n  target: type: Utilization\\n  averageUtilization: 70'
        ],
        expectedOutput: `apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  namespace: production
spec:
  selector:
    app: webapp
  ports:
    - port: 80
      targetPort: 8000
      protocol: TCP
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70`,
        solution: `apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  namespace: production
  labels:
    app: webapp
spec:
  selector:
    app: webapp
  ports:
    - port: 80
      targetPort: 8000
      protocol: TCP
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70`
      },
      {
        title: 'Step 5: Add a PodDisruptionBudget and Apply All Manifests',
        instruction: `Write a PodDisruptionBudget that guarantees at least 2 webapp pods are available during voluntary disruptions (node drains, cluster upgrades). Then write the kubectl commands to apply all manifests and verify the deployment.

WHY: PDBs prevent cluster operations from taking down too many pods at once. Without a PDB, a node drain during a cluster upgrade could terminate all pods on that node simultaneously — even if you have 3 replicas, they might all be on the same node. A PDB enforces a minimum availability floor.`,
        starterCode: `# pdb.yaml — PodDisruptionBudget
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: webapp-pdb
  namespace: production
spec:
  # TODO: Set minAvailable: 2 (always keep at least 2 pods running)
  # TODO: selector matching app: webapp

---
# kubectl commands — apply all resources and verify

# TODO: Apply all manifests in the production directory
kubectl apply ___

# TODO: Watch the rollout status
kubectl rollout ___

# TODO: Check the HPA status (should show current vs desired replicas)
kubectl get hpa ___

# TODO: Simulate a node drain to test the PDB (replace NODE_NAME)
kubectl drain ___ --ignore-daemonsets --delete-emptydir-data`,
        hints: [
          'minAvailable: 2 — at least 2 pods must be up during voluntary disruptions (use 80% for percentage-based)',
          'kubectl apply -f ./production/ — applies all .yaml files in the directory',
          'kubectl rollout status deployment/webapp -n production — watches until rollout completes'
        ],
        expectedOutput: `# pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: webapp-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: webapp

# Verification output:
$ kubectl apply -f ./production/
configmap/webapp-config created
secret/webapp-secrets created
deployment.apps/webapp created
service/webapp-service created
horizontalpodautoscaler.autoscaling/webapp-hpa created
poddisruptionbudget.policy/webapp-pdb created

$ kubectl rollout status deployment/webapp -n production
deployment "webapp" successfully rolled out

$ kubectl get hpa webapp-hpa -n production
NAME        REFERENCE           TARGETS   MINPODS   MAXPODS   REPLICAS
webapp-hpa  Deployment/webapp   12%/70%   3         10        3`,
        solution: `# pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: webapp-pdb
  namespace: production
  labels:
    app: webapp
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: webapp

# kubectl commands:

# Apply all manifests
kubectl apply -f ./production/

# Watch rollout progress
kubectl rollout status deployment/webapp -n production

# Check HPA metrics
kubectl get hpa webapp-hpa -n production

# Describe the PDB to verify it is enforced
kubectl describe pdb webapp-pdb -n production

# Test the PDB by draining a node (will respect minAvailable: 2)
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data`
      }
    ]
  }
];
