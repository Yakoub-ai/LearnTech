# Secure Development Environment

A secure development environment is the foundation of every trustworthy software project. If your local machine, credentials, dependencies, or network are compromised, nothing you ship can be trusted either. This guide covers the essential practices and tools every developer at Tech-Hubben should adopt before writing production code.

---

## 1. SSH Key Management & GPG Commit Signing

### Why it matters

SSH keys replace passwords for authenticating with remote Git hosts, CI servers, and cloud VMs. GPG signing proves that a commit was actually authored by you and not someone who happened to have push access. GitHub marks signed commits with a **Verified** badge, and many organisations now require signature verification on protected branches.

### 1.1 Generating an SSH Key

Use the Ed25519 algorithm — it is shorter, faster, and more secure than RSA-2048.

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "your.name@company.com" -f ~/.ssh/id_ed25519

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add the key to the agent
ssh-add ~/.ssh/id_ed25519
```

On Windows with Git Bash the same commands work. If you use the Windows OpenSSH agent, start it from Services first:

```powershell
# PowerShell (run as Administrator)
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add "$env:USERPROFILE\.ssh\id_ed25519"
```

### 1.2 Adding the SSH Key to GitHub

```bash
# Copy the public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy the public key to clipboard (Linux)
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Copy the public key to clipboard (Windows Git Bash)
cat ~/.ssh/id_ed25519.pub | clip
```

Then navigate to **GitHub → Settings → SSH and GPG keys → New SSH key**, paste the key, and save.

Verify the connection:

```bash
ssh -T git@github.com
# Expected: Hi <username>! You've successfully authenticated...
```

### 1.3 SSH Config for Multiple Accounts

If you work with more than one GitHub account (personal and work), create an SSH config:

```bash
# ~/.ssh/config

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes

Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
```

Then clone using the host alias:

```bash
git clone git@github-work:org/repo.git
```

### 1.4 Generating a GPG Key

```bash
# Generate a GPG key (choose RSA 4096 or Ed25519)
gpg --full-generate-key

# List your keys to find the key ID
gpg --list-secret-keys --keyid-format=long

# Example output:
# sec   ed25519/ABC123DEF456 2026-03-20 [SC]
#       FINGERPRINT1234567890
# uid           [ultimate] Your Name <your.name@company.com>

# Export the public key for GitHub
gpg --armor --export ABC123DEF456
```

Copy the output (including `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----`) and add it at **GitHub → Settings → SSH and GPG keys → New GPG key**.

### 1.5 Configuring Git to Sign Commits

```bash
# Tell Git which GPG key to use
git config --global user.signingkey ABC123DEF456

# Sign all commits by default
git config --global commit.gpgsign true

# Sign all tags by default
git config --global tag.gpgSign true

# If using GPG on Windows, point Git to the correct binary
git config --global gpg.program "C:/Program Files (x86)/GnuPG/bin/gpg.exe"
```

Verify a signed commit:

```bash
git log --show-signature -1
```

### 1.6 Common Mistakes

- **Leaving SSH keys without a passphrase.** Always set a passphrase. The SSH agent caches it so you only type it once per session.
- **Committing with the wrong email.** Your GPG key email must match your Git `user.email`. Check with `git config user.email`.
- **Forgetting to back up GPG keys.** Export your private key and store it in a password manager: `gpg --export-secret-keys --armor ABC123DEF456 > gpg-private.asc`.

> **Security tip:** Rotate SSH keys annually and revoke any key that may have been exposed. GitHub lets you set expiry dates on SSH keys.

---

## 2. Environment Variable Security

### Why it matters

Hard-coded secrets in source code are the single most common cause of credential leaks. Once a secret is committed, it lives in Git history forever — even if you delete the file in a later commit. Environment variables keep secrets out of code and make configuration portable across environments.

### 2.1 The .env Pattern

Most frameworks support `.env` files via a `dotenv` library:

```bash
# .env (never commit this file)
DATABASE_URL=postgres://user:password@localhost:5432/mydb
API_KEY=sk-live-abc123def456
JWT_SECRET=supersecretvalue
REDIS_URL=redis://localhost:6379
```

### 2.2 Loading .env in Node.js

```javascript
// Install: npm install dotenv
require('dotenv').config();

// Access variables
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

// Validate required variables at startup
const required = ['DATABASE_URL', 'API_KEY', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}
```

### 2.3 Loading .env in Python

```python
# Install: pip install python-dotenv
from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv("DATABASE_URL")
api_key = os.getenv("API_KEY")

# Validate at startup
required_vars = ["DATABASE_URL", "API_KEY", "JWT_SECRET"]
missing = [var for var in required_vars if not os.getenv(var)]
if missing:
    raise EnvironmentError(f"Missing required env vars: {', '.join(missing)}")
```

### 2.4 .gitignore Rules for Secrets

```gitignore
# Environment files
.env
.env.local
.env.*.local
.env.production
.env.staging

# Key files
*.pem
*.key
*.p12
*.pfx

# IDE credential caches
.idea/dataSources/
.vscode/settings.json
```

### 2.5 Providing a Template

Create a `.env.example` file that is committed to the repo:

```bash
# .env.example — copy to .env and fill in real values
DATABASE_URL=postgres://user:password@localhost:5432/mydb
API_KEY=your-api-key-here
JWT_SECRET=generate-a-random-string
REDIS_URL=redis://localhost:6379
```

### 2.6 Detecting Committed Secrets

Use `git-secrets` or `trufflehog` to scan history:

```bash
# Install git-secrets (macOS)
brew install git-secrets

# Register AWS patterns
git secrets --register-aws

# Install the pre-commit hook
git secrets --install

# Scan the entire repo history
git secrets --scan-history
```

Using trufflehog:

```bash
# Scan a local repo
trufflehog git file://. --only-verified

# Scan a remote repo
trufflehog git https://github.com/org/repo.git --only-verified
```

### 2.7 Common Mistakes

- **Committing `.env` and then adding it to `.gitignore`.** The file is already in history. You must rotate every secret in that file immediately.
- **Using the same secrets across environments.** Production, staging, and development should each have unique credentials.
- **Logging environment variables.** Never log `process.env` or `os.environ` in production — it will leak every secret.

> **Security tip:** Use a pre-commit hook (see Section 5) that blocks commits containing high-entropy strings or known secret patterns.

---

## 3. Dependency Scanning

### Why it matters

Your application is only as secure as its weakest dependency. A single vulnerable package in `node_modules` or your Python virtualenv can expose your users to remote code execution, data exfiltration, or supply-chain attacks. Automated scanning catches known vulnerabilities before they reach production.

### 3.1 npm audit (Node.js)

```bash
# Run an audit
npm audit

# See only high and critical vulnerabilities
npm audit --audit-level=high

# Automatically fix where possible
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force

# Generate a JSON report for CI
npm audit --json > audit-report.json
```

### 3.2 pip-audit (Python)

```bash
# Install
pip install pip-audit

# Audit the current environment
pip-audit

# Audit a requirements file
pip-audit -r requirements.txt

# Output in JSON for CI integration
pip-audit --format=json --output=audit-report.json

# Fix vulnerabilities automatically
pip-audit --fix
```

### 3.3 Snyk CLI

Snyk supports multiple ecosystems (npm, pip, NuGet, Maven, Docker images):

```bash
# Install
npm install -g snyk

# Authenticate
snyk auth

# Test a project
snyk test

# Monitor a project (sends alerts on new vulnerabilities)
snyk monitor

# Test a Docker image
snyk container test node:20-alpine

# Test infrastructure-as-code files
snyk iac test terraform/
```

### 3.4 GitHub Dependabot

Add this file to your repo:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "security"

  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "monthly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### 3.5 CI Integration Example

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'  # Every Monday at 06:00 UTC

jobs:
  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=high

      - name: Run Snyk test
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### 3.6 Lock File Hygiene

```bash
# Always commit lock files
git add package-lock.json  # npm
git add yarn.lock           # yarn
git add pnpm-lock.yaml      # pnpm
git add Pipfile.lock         # pipenv
git add poetry.lock          # poetry

# Use ci install in pipelines (respects lock file exactly)
npm ci        # not npm install
pip install -r requirements.txt --require-hashes
```

### 3.7 Common Mistakes

- **Ignoring lock files in `.gitignore`.** Lock files ensure reproducible builds and prevent supply-chain attacks.
- **Running `npm audit fix --force` blindly.** This can upgrade major versions and break your application. Review changes first.
- **Not scanning transitive dependencies.** A vulnerability five levels deep in your dependency tree is still your problem.

> **Security tip:** Pin exact versions in production (`"express": "4.18.2"` not `"express": "^4.18.2"`) and let Dependabot handle updates via PRs you can review.

---

## 4. Container Isolation for Development

### Why it matters

Containers give every project an isolated filesystem, network, and set of dependencies. This prevents "works on my machine" problems and stops a compromised project from affecting your host system. Dev containers also make onboarding instant — clone, open, and code.

### 4.1 Basic Dockerfile for Development

```dockerfile
# Dockerfile.dev
FROM node:20-alpine

# Create a non-root user
RUN addgroup -S devgroup && adduser -S devuser -G devgroup

# Set working directory
WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Switch to non-root user
USER devuser

# Expose dev server port
EXPOSE 3000

# Start dev server with hot reload
CMD ["npm", "run", "dev"]
```

### 4.2 Docker Compose for Multi-Service Development

```yaml
# docker-compose.yml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules  # Prevent overwriting container node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://devuser:devpass@db:5432/devdb
    depends_on:
      db:
        condition: service_healthy
    networks:
      - dev-network

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: devdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - dev-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - dev-network

volumes:
  pgdata:

networks:
  dev-network:
    driver: bridge
```

### 4.3 VS Code Dev Containers

Create a `.devcontainer` folder in your project:

```json
// .devcontainer/devcontainer.json
{
  "name": "Project Dev Container",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/app",

  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker",
        "GitHub.copilot"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "terminal.integrated.defaultProfile.linux": "bash"
      }
    }
  },

  "forwardPorts": [3000, 5432, 6379],

  "postCreateCommand": "npm ci",
  "remoteUser": "devuser"
}
```

Alternatively, use a standalone Dockerfile:

```json
// .devcontainer/devcontainer.json (standalone)
{
  "name": "Node.js Dev",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    "ghcr.io/devcontainers/features/git:1": {},
    "ghcr.io/devcontainers/features/github-cli:1": {}
  },
  "postCreateCommand": "npm ci",
  "forwardPorts": [3000]
}
```

### 4.4 Security Best Practices for Containers

```dockerfile
# Always use specific image tags, never :latest
FROM node:20.11.1-alpine

# Scan the image for vulnerabilities
# Run: docker scout cves node:20.11.1-alpine

# Never run as root in the container
USER node

# Drop all capabilities and add only what you need
# (in docker-compose.yml or docker run)
```

```yaml
# docker-compose.yml security hardening
services:
  app:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
```

### 4.5 Common Mistakes

- **Running containers as root.** Always create and switch to a non-root user.
- **Using `:latest` tags.** Pin image versions for reproducibility and security.
- **Mounting the Docker socket into dev containers.** This gives the container full control of your host. Use Docker-in-Docker features instead.
- **Storing secrets in Dockerfiles or images.** Use environment variables or mounted secret files.

> **Security tip:** Run `docker scout cves <image>` or `snyk container test <image>` regularly to catch vulnerabilities in your base images.

---

## 5. IDE Security Extensions

### Why it matters

Your IDE is the first line of defence. Security-focused extensions catch vulnerabilities, secrets, and misconfigurations as you type — before the code ever reaches a commit or a CI pipeline. Shifting security left to the editor saves time and prevents embarrassing leaks.

### 5.1 ESLint Security Plugins

```bash
# Install ESLint with security rules
npm install -D eslint eslint-plugin-security eslint-plugin-no-secrets
```

```javascript
// eslint.config.js (flat config, ESLint 9+)
import security from 'eslint-plugin-security';
import noSecrets from 'eslint-plugin-no-secrets';

export default [
  {
    plugins: {
      security,
      'no-secrets': noSecrets,
    },
    rules: {
      // Detect potential security issues
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',

      // Detect hardcoded secrets
      'no-secrets/no-secrets': ['error', { tolerance: 4.5 }],
    },
  },
];
```

### 5.2 Semgrep

Semgrep is a fast, open-source static analysis tool that supports 30+ languages:

```bash
# Install
pip install semgrep

# Run with the default security ruleset
semgrep --config=auto .

# Run specific rulesets
semgrep --config=p/javascript .
semgrep --config=p/python .
semgrep --config=p/owasp-top-ten .
semgrep --config=p/secrets .

# Run and output SARIF for GitHub Code Scanning
semgrep --config=auto --sarif --output=semgrep.sarif .
```

VS Code extension: Install **Semgrep** from the marketplace. It runs scans in the background as you edit.

### 5.3 CodeQL

CodeQL is GitHub's semantic code analysis engine. It is available as a GitHub Action and as a VS Code extension:

```yaml
# .github/workflows/codeql.yml
name: CodeQL Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 4 * * 1'

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    strategy:
      matrix:
        language: ['javascript', 'python']
    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

### 5.4 Recommended VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "Semgrep.semgrep",
    "GitHub.vscode-codeql",
    "GitGuardian.gitguardian",
    "SonarSource.sonarlint-vscode",
    "snyk-security.snyk-vulnerability-scanner",
    "redhat.vscode-yaml",
    "ms-azuretools.vscode-docker"
  ]
}
```

### 5.5 Pre-Commit Hooks

Combine multiple checks using `husky` and `lint-staged`:

```bash
# Install husky and lint-staged
npm install -D husky lint-staged

# Initialise husky
npx husky init
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --fix",
      "semgrep --config=auto"
    ],
    "*.{json,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged
npx git-secrets --scan
```

### 5.6 Common Mistakes

- **Disabling security warnings instead of fixing them.** `// eslint-disable` for security rules should require a code review comment explaining why.
- **Not sharing extension recommendations.** Add `.vscode/extensions.json` so the whole team gets prompted to install security tools.
- **Running Semgrep only in CI.** Run it locally too — the feedback loop is faster.

> **Security tip:** Configure your IDE to treat security rule violations as errors, not warnings. Developers are trained to ignore warnings.

---

## 6. Network Security for Development

### Why it matters

Development servers often run with permissive defaults — no authentication, debug mode enabled, verbose error messages. If these services are exposed to an untrusted network, attackers can exploit them to access your code, environment variables, or connected databases.

### 6.1 VPN for Development

Always connect to your organisation's VPN when accessing internal services:

```bash
# Example: connecting with OpenConnect (Cisco AnyConnect compatible)
sudo openconnect vpn.company.com --user=your.username

# Example: WireGuard
sudo wg-quick up wg0
```

### 6.2 Firewall Rules for Dev Servers

Bind development servers to localhost only:

```bash
# Node.js — bind to localhost
node server.js --host 127.0.0.1

# Vite
npx vite --host 127.0.0.1

# Django
python manage.py runserver 127.0.0.1:8000

# Flask
flask run --host=127.0.0.1
```

```javascript
// Express.js — bind explicitly
const app = require('express')();
app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://127.0.0.1:3000');
});
```

On macOS, use the built-in firewall:

```bash
# Enable the firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Block incoming connections to a specific port
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
```

On Linux with `ufw`:

```bash
# Allow only localhost access to port 3000
sudo ufw deny 3000
sudo ufw allow from 127.0.0.1 to any port 3000
```

### 6.3 Using ngrok Safely

ngrok creates public tunnels to your local machine. This is useful for testing webhooks, but dangerous if misconfigured:

```bash
# Install ngrok
# Download from https://ngrok.com or use brew/snap

# Basic tunnel (creates a public URL)
ngrok http 3000

# Require authentication on the tunnel
ngrok http 3000 --basic-auth="user:password"

# Restrict to specific IPs (paid plan)
ngrok http 3000 --cidr-allow="203.0.113.0/24"

# Use a custom domain (paid plan)
ngrok http 3000 --domain=dev.yourdomain.com
```

```yaml
# ngrok.yml — configuration file
version: 2
authtoken: your-auth-token
tunnels:
  webapp:
    proto: http
    addr: 3000
    basic_auth:
      - "user:password"
    inspect: false  # Disable the inspection UI in production-like testing
```

### 6.4 HTTPS for Local Development

```bash
# Generate a self-signed certificate with mkcert
# Install mkcert first: brew install mkcert (macOS) or choco install mkcert (Windows)
mkcert -install
mkcert localhost 127.0.0.1 ::1

# This creates localhost+2.pem and localhost+2-key.pem
```

```javascript
// Express.js with HTTPS
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const options = {
  key: fs.readFileSync('localhost+2-key.pem'),
  cert: fs.readFileSync('localhost+2.pem'),
};

https.createServer(options, app).listen(3000, '127.0.0.1', () => {
  console.log('HTTPS server running on https://127.0.0.1:3000');
});
```

### 6.5 DNS Rebinding Protection

```javascript
// Express.js — validate Host header
app.use((req, res, next) => {
  const allowedHosts = ['localhost', '127.0.0.1'];
  const host = req.hostname;
  if (!allowedHosts.includes(host)) {
    return res.status(403).send('Invalid host');
  }
  next();
});
```

### 6.6 Common Mistakes

- **Binding dev servers to `0.0.0.0`.** This makes them accessible to every device on your network, including potentially hostile ones on public Wi-Fi.
- **Leaving ngrok tunnels running.** Kill tunnels when you are done. Use `ngrok http --inspect=false` to prevent data leaks through the inspect UI.
- **Running `DEBUG=*` in production-like environments.** Debug mode exposes stack traces, environment variables, and internal paths.
- **Connecting to production databases from a development machine.** Use separate credentials with minimal permissions.

> **Security tip:** Add `0.0.0.0` binding detection to your CI linting. A Semgrep rule can catch `app.listen(PORT, '0.0.0.0')` patterns.

---

## 7. Secrets Management

### Why it matters

Environment variables in `.env` files work for local development, but they do not scale to teams, CI/CD pipelines, or production. Dedicated secrets managers provide encryption at rest, access control, audit logging, automatic rotation, and central revocation. If a secret is leaked, you can rotate it in one place instead of hunting through dozens of servers.

### 7.1 HashiCorp Vault Basics

```bash
# Start a development server (not for production)
vault server -dev

# Set the address and token
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='hvs.dev-root-token'

# Store a secret
vault kv put secret/myapp/config \
  db_password="supersecret" \
  api_key="sk-live-abc123"

# Read a secret
vault kv get secret/myapp/config

# Read a specific field
vault kv get -field=db_password secret/myapp/config

# Delete a secret
vault kv delete secret/myapp/config
```

Using Vault in application code (Node.js):

```javascript
// npm install node-vault
const vault = require('node-vault')({
  apiVersion: 'v1',
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

async function getSecrets() {
  const result = await vault.read('secret/data/myapp/config');
  const { db_password, api_key } = result.data.data;
  return { db_password, api_key };
}
```

### 7.2 1Password CLI

```bash
# Install: https://developer.1password.com/docs/cli/get-started/

# Sign in
op signin

# Read a secret
op read "op://Development/API Key/credential"

# Inject secrets into a command
op run --env-file=.env.tpl -- npm start

# Use secret references in .env.tpl
# DATABASE_URL=op://Development/Database/url
# API_KEY=op://Development/API Key/credential
```

```bash
# .env.tpl (committed to repo — contains references, not values)
DATABASE_URL=op://Vault/PostgreSQL/connection-string
API_KEY=op://Vault/ExternalAPI/api-key
JWT_SECRET=op://Vault/Auth/jwt-secret
```

```bash
# Run the app with secrets injected
op run --env-file=.env.tpl -- node server.js
```

### 7.3 Azure Key Vault

```bash
# Login to Azure
az login

# Create a Key Vault
az keyvault create \
  --name my-dev-vault \
  --resource-group my-rg \
  --location northeurope

# Store a secret
az keyvault secret set \
  --vault-name my-dev-vault \
  --name "DatabasePassword" \
  --value "supersecret"

# Retrieve a secret
az keyvault secret show \
  --vault-name my-dev-vault \
  --name "DatabasePassword" \
  --query "value" -o tsv
```

Using Azure Key Vault in Node.js:

```javascript
// npm install @azure/keyvault-secrets @azure/identity
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const vaultUrl = 'https://my-dev-vault.vault.azure.net';
const client = new SecretClient(vaultUrl, new DefaultAzureCredential());

async function getSecret(name) {
  const secret = await client.getSecret(name);
  return secret.value;
}

// Usage
const dbPassword = await getSecret('DatabasePassword');
```

### 7.4 AWS Secrets Manager

```bash
# Store a secret
aws secretsmanager create-secret \
  --name myapp/production/db \
  --description "Production database credentials" \
  --secret-string '{"username":"admin","password":"supersecret","host":"db.example.com"}'

# Retrieve a secret
aws secretsmanager get-secret-value \
  --secret-id myapp/production/db \
  --query SecretString --output text

# Rotate a secret (requires a Lambda function)
aws secretsmanager rotate-secret \
  --secret-id myapp/production/db \
  --rotation-lambda-arn arn:aws:lambda:eu-north-1:123456:function:rotate-db
```

Using AWS Secrets Manager in Python:

```python
import boto3
import json

def get_secret(secret_name: str, region: str = "eu-north-1") -> dict:
    client = boto3.client("secretsmanager", region_name=region)
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])

# Usage
creds = get_secret("myapp/production/db")
db_host = creds["host"]
db_password = creds["password"]
```

### 7.5 Choosing the Right Tool

| Tool | Best For | Cost |
|------|----------|------|
| `.env` files | Local development only | Free |
| 1Password CLI | Small teams, individual developers | Subscription |
| HashiCorp Vault | Self-hosted, multi-cloud, advanced policies | Free (OSS) / Paid (Enterprise) |
| Azure Key Vault | Azure-native projects | Pay-per-use |
| AWS Secrets Manager | AWS-native projects | Pay-per-use |
| GitHub Actions Secrets | CI/CD pipelines on GitHub | Free with GitHub |

### 7.6 Common Mistakes

- **Storing Vault tokens in `.env` files.** Use machine identity (IAM roles, managed identities) instead.
- **Not rotating secrets after a team member leaves.** Automate rotation schedules.
- **Using the same secret across all environments.** Each environment should have unique secrets.
- **Granting broad access.** Apply least-privilege: developers need read access to dev secrets only, not production.

> **Security tip:** Enable audit logging on every secrets manager. You should be able to answer "who accessed which secret, when, and from where?" at any time.

---

## 8. Backup & Disaster Recovery

### Why it matters

Hardware fails, files get accidentally deleted, and ransomware exists. A reliable backup strategy means the difference between losing an hour of work and losing months. For developers, backups span code (Git), configuration (dotfiles), secrets (password managers), and local data (databases, documents).

### 8.1 Git Stash — Saving Work in Progress

```bash
# Stash current changes (tracked files only)
git stash

# Stash with a descriptive message
git stash push -m "WIP: refactoring auth module"

# Stash including untracked files
git stash push -u -m "WIP: new feature with new files"

# List all stashes
git stash list

# Apply the most recent stash (keeps it in the stash list)
git stash apply

# Apply and remove the most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Show what is in a stash
git stash show -p stash@{0}

# Drop a specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### 8.2 Git Reflog — Recovering Lost Commits

```bash
# View the reflog (list of all HEAD movements)
git reflog

# Example output:
# abc1234 HEAD@{0}: commit: fix login bug
# def5678 HEAD@{1}: reset: moving to HEAD~1
# ghi9012 HEAD@{2}: commit: add feature X  <-- "lost" commit

# Recover a "lost" commit
git checkout ghi9012
# or
git cherry-pick ghi9012
# or create a branch from it
git branch recovered-feature ghi9012
```

### 8.3 Git Worktrees — Parallel Work Without Stashing

```bash
# Create a worktree for a hotfix without leaving your current branch
git worktree add ../hotfix-branch hotfix/critical-bug

# Work in the new directory
cd ../hotfix-branch
# ... make changes, commit, push ...

# Remove the worktree when done
git worktree remove ../hotfix-branch
```

### 8.4 Automated Local Backups

macOS Time Machine:

```bash
# Verify Time Machine is running
tmutil status

# Start a backup manually
tmutil startbackup

# Exclude node_modules and build artifacts from backups
tmutil addexclusion ~/projects/myapp/node_modules
tmutil addexclusion ~/projects/myapp/dist
tmutil addexclusion ~/projects/myapp/.next
```

Windows File History:

```powershell
# Enable File History via Settings > Update & Security > Backup
# Or via PowerShell
Enable-ComputerRestore -Drive "C:\"
Checkpoint-Computer -Description "Before major refactor"
```

Linux with `restic`:

```bash
# Install restic
sudo apt install restic

# Initialise a local backup repository
restic -r /mnt/backup/dev init

# Backup your projects directory
restic -r /mnt/backup/dev backup ~/projects \
  --exclude="node_modules" \
  --exclude=".next" \
  --exclude="dist" \
  --exclude="__pycache__" \
  --exclude=".venv"

# List snapshots
restic -r /mnt/backup/dev snapshots

# Restore a specific snapshot
restic -r /mnt/backup/dev restore latest --target ~/restored
```

### 8.5 Cloud Sync Best Practices

```yaml
# Example rclone config for syncing to cloud storage
# rclone config (interactive setup) or edit ~/.config/rclone/rclone.conf

# Sync projects to cloud (excluding build artifacts)
# rclone sync ~/projects remote:dev-backup \
#   --exclude="node_modules/**" \
#   --exclude=".next/**" \
#   --exclude="dist/**" \
#   --exclude="__pycache__/**" \
#   --exclude=".venv/**" \
#   --exclude=".env" \
#   --exclude="*.pem" \
#   --exclude="*.key"
```

**Important:** Never sync `.env` files, private keys, or credentials to cloud storage that is not end-to-end encrypted. Use a password manager for secrets backup.

### 8.6 Database Backup for Local Development

```bash
# PostgreSQL
pg_dump -h localhost -U devuser devdb > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql -h localhost -U devuser devdb < backup_20260320_143000.sql

# MySQL
mysqldump -u root -p devdb > backup_$(date +%Y%m%d_%H%M%S).sql

# SQLite (just copy the file)
cp dev.sqlite3 "backups/dev_$(date +%Y%m%d_%H%M%S).sqlite3"

# MongoDB
mongodump --db devdb --out "backups/$(date +%Y%m%d_%H%M%S)"
```

### 8.7 Dotfiles Backup

```bash
# Create a bare Git repo for dotfiles
git init --bare ~/.dotfiles

# Set up an alias
alias dotfiles='git --git-dir=$HOME/.dotfiles --work-tree=$HOME'

# Ignore untracked files (so it does not list your entire home directory)
dotfiles config --local status.showUntrackedFiles no

# Add your dotfiles
dotfiles add ~/.bashrc
dotfiles add ~/.gitconfig
dotfiles add ~/.ssh/config
dotfiles add ~/.config/nvim/init.lua

# Commit and push
dotfiles commit -m "Initial dotfiles backup"
dotfiles remote add origin git@github.com:username/dotfiles.git
dotfiles push -u origin main
```

### 8.8 The 3-2-1 Backup Rule

Follow the **3-2-1 rule** for any data you cannot afford to lose:

- **3** copies of your data
- **2** different storage media (e.g., SSD + external drive)
- **1** offsite copy (cloud storage or a remote server)

```
┌─────────────────────────────────────────────────┐
│                3-2-1 Backup Strategy             │
├─────────────────────────────────────────────────┤
│                                                  │
│  Copy 1: Local machine (SSD)                    │
│    └── Your active working files                │
│                                                  │
│  Copy 2: External drive / NAS                   │
│    └── Time Machine, restic, or manual backup   │
│                                                  │
│  Copy 3: Cloud / offsite                        │
│    └── GitHub (code), rclone (files),           │
│        password manager (secrets)               │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 8.9 Common Mistakes

- **Assuming GitHub is a backup.** GitHub is a collaboration tool. If you force-push over history or delete a repo, the data is gone.
- **Never testing restores.** A backup that cannot be restored is not a backup. Test your restore process quarterly.
- **Backing up `node_modules`.** Exclude build artifacts — they can be regenerated from lock files.
- **Not backing up local databases.** If you have spent hours seeding a development database, dump it to a file and version it.

> **Security tip:** Encrypt all backups at rest. Both `restic` and `rclone` support encryption. Never back up to unencrypted cloud storage.

---

## Quick Reference Checklist

Use this checklist to verify your development environment is secure:

```
[ ] SSH keys generated with Ed25519 and protected by passphrase
[ ] GPG key created and configured for commit signing
[ ] .env files listed in .gitignore
[ ] .env.example committed as a template
[ ] Pre-commit hook installed to scan for secrets
[ ] npm audit / pip-audit runs in CI pipeline
[ ] Dependabot or Snyk configured for dependency updates
[ ] Dev containers configured (or Docker Compose for multi-service)
[ ] ESLint security plugin installed and configured
[ ] Semgrep or CodeQL running locally and in CI
[ ] Dev servers bound to 127.0.0.1, not 0.0.0.0
[ ] ngrok tunnels use authentication when active
[ ] Secrets stored in a secrets manager, not in code
[ ] Backups follow the 3-2-1 rule
[ ] Backup restores tested within the last quarter
```

---

## Further Reading

- [GitHub SSH Key Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub GPG Signing Documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [Semgrep Rules Registry](https://semgrep.dev/explore)
- [HashiCorp Vault Getting Started](https://developer.hashicorp.com/vault/tutorials/getting-started)
- [1Password CLI Documentation](https://developer.1password.com/docs/cli/)
- [Azure Key Vault Documentation](https://learn.microsoft.com/en-us/azure/key-vault/)
- [AWS Secrets Manager Documentation](https://docs.aws.amazon.com/secretsmanager/)

---

Return to the [Prerequisites index](../Prerequisites).
