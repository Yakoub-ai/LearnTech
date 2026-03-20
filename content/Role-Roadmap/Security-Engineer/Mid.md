# Security Engineer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Security Engineer learning path.

---

## Penetration Testing – Structured Offensive Security

Penetration testing (pentesting) is the practice of simulating real-world attacks against a system to identify vulnerabilities before malicious actors do. Unlike vulnerability scanning (which is automated), penetration testing involves human creativity, judgement, and the ability to chain multiple low-severity findings into a high-impact attack path.

A penetration test follows a methodology: reconnaissance (gathering information about the target), enumeration (discovering services, endpoints, and potential entry points), exploitation (attempting to leverage vulnerabilities), post-exploitation (determining the impact of a successful compromise), and reporting (documenting findings with severity, evidence, and remediation recommendations). The goal is not to break things but to provide a realistic assessment of the system's defensive capabilities.

**Why it matters:** Automated tools find known vulnerability patterns, but real attackers combine findings, think creatively, and exploit business logic flaws that scanners miss. Penetration testing bridges the gap between "we ran a scanner and it came back clean" and "we are confident a skilled attacker cannot compromise this system."

**Key things to understand:**

- Methodology: reconnaissance → enumeration → vulnerability analysis → exploitation → post-exploitation → reporting
- Burp Suite: the industry-standard web application testing proxy; intercept and modify requests, scan for vulnerabilities, test authentication flows
- Common attack types to practice: SQL injection (error-based, blind, time-based), XSS (stored, reflected, DOM-based), authentication bypass, IDOR (Insecure Direct Object References), SSRF, path traversal
- The difference between black-box (no knowledge of the system), grey-box (partial knowledge), and white-box (full access to source code) testing
- Rules of engagement: defined scope, authorised targets, testing windows, and escalation procedures; testing without authorisation is illegal
- PortSwigger Web Security Academy provides free, structured labs for practising every major web vulnerability category

**Code walkthrough:**

```python
# Step 1: JWT implementation — create and validate tokens securely
# Why: JWTs are the standard for stateless API authentication
import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "rotate-this-per-environment"  # in production, load from Key Vault
ALGORITHM = "HS256"

def create_token(user_id: str, role: str, expires_minutes: int = 30) -> str:
    """Create a signed JWT with standard claims."""
    payload = {
        "sub": user_id,             # subject — who this token represents
        "role": role,
        "iat": datetime.now(timezone.utc),  # issued at
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_minutes),
    }
    # Why: the signature ensures the token hasn't been tampered with
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def validate_token(token: str) -> dict:
    """Decode and validate a JWT — reject expired or tampered tokens."""
    try:
        # Why: always specify algorithms to prevent algorithm confusion attacks
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise PermissionError("Token has expired")
    except jwt.InvalidTokenError:
        raise PermissionError("Invalid token")

# Step 2: RBAC middleware — check role on every request
# Why: authentication tells you WHO; authorisation tells you WHAT they can do
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI()
bearer = HTTPBearer()

def require_role(*allowed_roles: str):
    """Dependency that enforces role-based access control."""
    async def checker(creds: HTTPAuthorizationCredentials = Depends(bearer)):
        payload = validate_token(creds.credentials)
        if payload["role"] not in allowed_roles:
            raise HTTPException(403, "Insufficient permissions")
        return payload
    return checker

@app.delete("/users/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(user_id: int):
    # Why: only admins can reach this — the dependency rejects everyone else
    return {"deleted": user_id}
```

**Common pitfalls:**

- Running automated scanners and calling it a penetration test; scanners are a starting point, not a substitute for human analysis.
- Testing outside the agreed scope; even in a test, accessing systems that are not in scope can have legal and operational consequences.
- Focusing only on technical exploitation while ignoring business logic flaws (e.g., manipulating a discount code to get negative prices).
- Writing reports that are too technical for the audience; findings must be communicated in terms of business risk, not just technical details.

---

## Threat Modelling – Identifying Risks Before Writing Code

Threat modelling is a structured process for identifying what can go wrong in a system, how likely it is, and what to do about it. It happens during the design phase — before code is written — making it one of the most cost-effective security activities because it prevents vulnerabilities from being built in the first place.

The most widely used framework is STRIDE, developed by Microsoft, which categorises threats into six types: Spoofing (pretending to be someone else), Tampering (modifying data or code), Repudiation (denying an action occurred), Information Disclosure (exposing data to unauthorised parties), Denial of Service (making the system unavailable), and Elevation of Privilege (gaining unauthorised access levels). A threat model typically involves creating a data flow diagram of the system, identifying trust boundaries, and systematically applying STRIDE to each component and data flow.

**Why it matters:** Security vulnerabilities found in design are orders of magnitude cheaper to fix than those found in production. Threat modelling forces the team to think about security before writing code, surfaces risks that might otherwise go unnoticed, and produces a prioritised list of threats that guides security investment.

**Key things to understand:**

- STRIDE categories and what each means in practice
- Data Flow Diagrams (DFDs): visual representation of how data moves through the system, including processes, data stores, external entities, and trust boundaries
- Trust boundaries: the lines between components with different levels of trust (e.g., between the internet and the application, between the application and the database)
- Risk rating: use a framework like DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability) or a simple likelihood × impact matrix to prioritise threats
- Threat modelling is not a one-time activity; it should be updated when the system architecture changes significantly
- The Threat Modeling Manifesto provides guiding principles: "A threat model is a tool for making security decisions, not a compliance artefact"

**Code walkthrough:**

```python
# Step 1: CSRF protection — prevent forged cross-site requests
# Why: without CSRF tokens, an attacker's website can submit forms
#      on behalf of an authenticated user
from fastapi import FastAPI, Request, HTTPException, Form
from fastapi.responses import HTMLResponse
import secrets

app = FastAPI()
# In production, store tokens in a session store (Redis) per user
csrf_tokens: set[str] = set()

@app.get("/form", response_class=HTMLResponse)
async def show_form():
    """Generate a form with a hidden CSRF token."""
    token = secrets.token_urlsafe(32)
    csrf_tokens.add(token)
    # Why: the token is unique per form render — an attacker cannot guess it
    return f"""
    <form method="POST" action="/transfer">
        <input type="hidden" name="csrf_token" value="{token}">
        <input name="amount" placeholder="Amount">
        <button type="submit">Transfer</button>
    </form>"""

@app.post("/transfer")
async def transfer(csrf_token: str = Form(...), amount: float = Form(...)):
    # Step 2: Validate the CSRF token before processing the request
    if csrf_token not in csrf_tokens:
        raise HTTPException(403, "Invalid CSRF token")
    csrf_tokens.discard(csrf_token)  # one-time use
    return {"status": "transferred", "amount": amount}

# Step 3: Audit logging — record security-relevant events
# Why: without audit logs, breaches and policy violations go undetected
import logging
import json
from datetime import datetime, timezone

audit_logger = logging.getLogger("audit")
audit_logger.setLevel(logging.INFO)

def audit_log(action: str, user_id: str, resource: str, outcome: str):
    """Structured audit log — who did what, when, and what happened."""
    audit_logger.info(json.dumps({
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "action": action,
        "user_id": user_id,
        "resource": resource,
        "outcome": outcome,
        # Why: never log passwords, tokens, or PII in audit logs
    }))

audit_log("delete_user", user_id="admin-1", resource="user/42", outcome="success")
```

**Common pitfalls:**

- Creating overly detailed threat models that take weeks and produce documents no one reads; focus on the highest-risk areas.
- Only threat modelling new systems and ignoring existing ones that have never been analysed.
- Identifying threats without assigning owners or mitigations; a threat model that produces no action is a waste of time.
- Treating threat modelling as a security team activity rather than a collaborative exercise involving architects, developers, and product owners.

---

## Secure SDLC – Building Security into the Development Lifecycle

A Secure Software Development Lifecycle (Secure SDLC) integrates security activities into every phase of software development — requirements, design, implementation, testing, deployment, and maintenance — rather than treating security as a final gate before release.

OWASP SAMM (Software Assurance Maturity Model) provides a framework for assessing and improving an organisation's secure development practices across five business functions: Governance, Design, Implementation, Verification, and Operations. Each function has activities at three maturity levels, allowing organisations to incrementally improve their security posture.

**Why it matters:** Adding security only at the end of development (via a penetration test before release) catches some issues but misses fundamental design flaws, leaves developers without guidance on secure coding practices, and creates a bottleneck where the security team becomes a gate for every release. A Secure SDLC distributes security responsibility across the entire team and catches issues when they are cheapest to fix.

**Key things to understand:**

- Security requirements: define security needs alongside functional requirements (e.g., "passwords must be hashed with bcrypt", "API endpoints must enforce authorisation")
- Threat modelling during design (see previous section)
- Secure coding practices during implementation: input validation, parameterised queries, output encoding, secure authentication patterns
- Security testing during verification: SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), SCA (Software Composition Analysis for dependency vulnerabilities)
- Security review before deployment: final review of high-risk changes, configuration verification, secrets management check
- OWASP SAMM maturity levels provide a roadmap for gradual improvement rather than demanding perfection immediately

**Code walkthrough:**

```python
# Step 1: Secure file upload validation
# Why: file uploads are a common attack vector — executables, oversized files,
#      and files with spoofed extensions can compromise the server
import magic  # python-magic library for content-type detection
from pathlib import Path

ALLOWED_MIME_TYPES = {"image/png", "image/jpeg", "application/pdf"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def validate_upload(file_path: str, declared_content_type: str) -> dict:
    """Validate a file upload beyond what the client claims."""
    path = Path(file_path)

    # Step 2: Check actual file content, not just the extension
    # Why: an attacker can rename malware.exe to document.pdf
    actual_mime = magic.from_file(file_path, mime=True)
    if actual_mime not in ALLOWED_MIME_TYPES:
        return {"valid": False, "reason": f"MIME type {actual_mime} not allowed"}

    # Step 3: Verify the declared type matches the actual type
    # Why: mismatches suggest tampering or client-side bugs
    if actual_mime != declared_content_type:
        return {"valid": False, "reason": "Content-Type mismatch"}

    # Step 4: Enforce file size limits
    # Why: oversized uploads can exhaust disk space or memory
    size = path.stat().st_size
    if size > MAX_FILE_SIZE:
        return {"valid": False, "reason": f"File too large: {size} bytes"}

    # Step 5: Sanitise the filename
    # Why: filenames like "../../etc/passwd" can cause path traversal
    safe_name = path.name.replace("..", "").replace("/", "").replace("\\", "")
    return {"valid": True, "safe_filename": safe_name, "mime": actual_mime}

# Step 6: Dependency scanning configuration (pip-audit)
# Why: outdated dependencies with known CVEs are a top attack vector
# In CI/CD pipeline (e.g., GitHub Actions):
# - run: pip-audit --requirement requirements.txt --strict
#   This fails the build if any dependency has a known vulnerability
```

**Common pitfalls:**

- Implementing a Secure SDLC as a set of mandatory gates that slow down delivery without providing value; security activities should be integrated, not imposed.
- Making the security team solely responsible; secure development is a shared responsibility, with the security team providing tools, training, and guidance.
- Assuming that following a Secure SDLC eliminates all vulnerabilities; it reduces risk but does not eliminate it.

---

## Cloud Security – Azure Security Services and Configuration

Cloud security in Azure involves configuring and operating the security services that protect cloud resources, networks, identities, and data. Azure provides a layered security model: identity and access management (Azure Active Directory / Entra ID), network security (NSGs, firewalls, private endpoints), data protection (encryption at rest and in transit, Key Vault), and threat protection (Microsoft Defender for Cloud).

For a mid-level Security Engineer, the focus is on understanding how to configure these services correctly and how to detect and respond to misconfigurations and threats in a cloud environment. Cloud security is different from on-premises security because the shared responsibility model means the cloud provider secures the infrastructure while the customer secures the configuration, data, and identities.

**Why it matters:** Misconfigured cloud resources are the leading cause of cloud security breaches. A storage account left publicly accessible, a network security group with overly permissive rules, or an identity with excessive permissions — these misconfigurations are the cloud equivalent of leaving the front door unlocked. Understanding Azure security services is essential for preventing these exposures.

**Key things to understand:**

- Shared responsibility model: Microsoft secures the physical infrastructure, network, and hypervisor; the customer secures identity, data, application configuration, and access policies
- Azure Entra ID (formerly Azure AD): the identity provider; manages users, groups, service principals, and conditional access policies
- Network Security Groups (NSGs): stateful firewalls for controlling inbound and outbound traffic to Azure resources
- Azure Key Vault: centrally manages secrets, keys, and certificates; applications should retrieve secrets from Key Vault at runtime rather than storing them in configuration files
- Microsoft Defender for Cloud: provides security posture management (identifies misconfigurations) and threat protection (detects active attacks)
- Private endpoints: connect Azure PaaS services to a virtual network privately, eliminating public internet exposure

**Code walkthrough:**

```python
# Step 1: Encryption at rest using Azure Key Vault secrets
# Why: secrets (DB passwords, API keys) must never be in source code or env files
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

# Step 2: DefaultAzureCredential uses managed identity in Azure, CLI locally
# Why: managed identity means no passwords to manage at all
credential = DefaultAzureCredential()
vault_url = "https://my-vault.vault.azure.net/"
client = SecretClient(vault_url=vault_url, credential=credential)

# Step 3: Retrieve the secret at runtime — never bake it into the image
db_password = client.get_secret("database-password").value
api_key = client.get_secret("external-api-key").value

# Step 4: Encrypt sensitive data at the application level before storing
# Why: database-level encryption protects at rest, but app-level encryption
#      ensures data stays encrypted even if the DB is accessed directly
from cryptography.fernet import Fernet

# Load the encryption key from Key Vault (not hardcoded)
encryption_key = client.get_secret("data-encryption-key").value
cipher = Fernet(encryption_key.encode())

def encrypt_pii(value: str) -> str:
    """Encrypt personally identifiable information before storage."""
    return cipher.encrypt(value.encode()).decode()

def decrypt_pii(encrypted: str) -> str:
    """Decrypt PII when authorised access is needed."""
    return cipher.decrypt(encrypted.encode()).decode()

ssn_encrypted = encrypt_pii("123-45-6789")
# Store ssn_encrypted in the database — even a DB admin can't read it
ssn_decrypted = decrypt_pii(ssn_encrypted)
assert ssn_decrypted == "123-45-6789"
```

**Common pitfalls:**

- Granting Owner or Contributor roles at the subscription level when a more specific, lower-privilege role would suffice.
- Leaving storage accounts with public access enabled; default to private and use managed identities or SAS tokens for authorised access.
- Not enabling diagnostic logging on critical resources; without logs, security incidents cannot be investigated.
- Relying solely on network security (firewalls, NSGs) without implementing identity-based access controls; identity is the new perimeter.

---

## Identity and Access Management – OAuth 2.0 and OpenID Connect

Identity and Access Management (IAM) is the framework of policies and technologies that ensures the right people and machines have the right access to the right resources at the right time. For web applications and APIs, OAuth 2.0 and OpenID Connect (OIDC) are the dominant standards.

OAuth 2.0 is an authorisation framework — it defines how a user can grant a third-party application limited access to their resources without sharing their password. OpenID Connect is an identity layer built on top of OAuth 2.0 that adds authentication — it tells the application who the user is via an ID token. JWT (JSON Web Token) is the token format used by both standards.

**Why it matters:** Authentication and authorisation failures are the most common cause of security breaches (OWASP A01 and A07). Implementing these correctly requires understanding the protocols, their intended use, and the common mistakes that create vulnerabilities. Security Engineers must be able to review OAuth/OIDC implementations and identify weaknesses.

**Key things to understand:**

- OAuth 2.0 grant types: Authorization Code with PKCE (recommended for web and mobile apps), Client Credentials (machine-to-machine), Implicit (deprecated — do not use)
- OpenID Connect: adds the `id_token` which contains the authenticated user's identity claims; this is what makes OIDC an authentication protocol
- JWT structure: header (algorithm), payload (claims: `sub`, `iss`, `aud`, `exp`, `iat`), signature; the payload is Base64-encoded, not encrypted — do not put secrets in it
- Token validation: verify the signature, check the issuer (`iss`), check the audience (`aud`), check the expiration (`exp`), check the algorithm
- The difference between access tokens (used to access protected resources, short-lived) and refresh tokens (used to obtain new access tokens without re-authentication, longer-lived)
- Common implementation mistakes: not validating tokens server-side, accepting tokens with `alg: none`, storing tokens in localStorage (XSS risk), not checking audience claims

**Code walkthrough:**

```python
# Step 1: OAuth 2.0 Authorization Code flow with PKCE
# Why: PKCE prevents authorization code interception attacks;
#      it is the recommended flow for all public clients
import hashlib
import base64
import secrets
import httpx

# Step 2: Generate PKCE code verifier and challenge
# Why: the verifier is a secret the client creates; the challenge is its hash
code_verifier = secrets.token_urlsafe(64)  # random string, 43-128 chars
code_challenge = base64.urlsafe_b64encode(
    hashlib.sha256(code_verifier.encode()).digest()
).rstrip(b"=").decode()

# Step 3: Build the authorization URL — redirect the user's browser here
auth_url = (
    "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize"
    f"?client_id=YOUR_CLIENT_ID"
    f"&response_type=code"
    f"&redirect_uri=http://localhost:8000/callback"
    f"&scope=openid profile email"
    f"&code_challenge={code_challenge}"
    f"&code_challenge_method=S256"
)

# Step 4: After the user logs in, exchange the code for tokens
async def exchange_code(authorization_code: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
            data={
                "client_id": "YOUR_CLIENT_ID",
                "grant_type": "authorization_code",
                "code": authorization_code,
                "redirect_uri": "http://localhost:8000/callback",
                "code_verifier": code_verifier,  # proves we started the flow
            },
        )
        tokens = response.json()
        # Step 5: tokens contains access_token, id_token, refresh_token
        # Why: id_token tells you WHO the user is (authentication)
        #      access_token tells you WHAT they can do (authorisation)
        return tokens
```

**Common pitfalls:**

- Confusing OAuth 2.0 (authorisation) with authentication; using an access token to identify a user without an OIDC ID token is insecure.
- Not validating the `aud` (audience) claim, allowing tokens intended for a different service to be accepted.
- Setting token expiry too long; a compromised token should have a limited window of usefulness.
- Implementing custom token validation logic instead of using a well-tested library; subtle bugs in validation lead to authentication bypass.

---

## Container Security – Securing Docker and Container Environments

Containers share the host operating system kernel, which makes them lighter than virtual machines but also means that a container escape — an attacker breaking out of the container's isolation — gives them access to the host and potentially all other containers running on it. Container security involves securing the image (what goes into the container), the runtime (how the container is configured and executed), and the orchestration layer (how containers are managed at scale).

For a mid-level Security Engineer, the focus is on understanding the Docker-specific security risks and applying the hardening practices that prevent the most common container-based attacks.

**Why it matters:** Containers are the standard deployment unit for modern applications. An insecure container image, an over-privileged container runtime, or an exposed container API can compromise the entire application and infrastructure. Container security must be addressed at every stage: build, deploy, and run.

**Key things to understand:**

- Image security: use minimal base images (e.g., Alpine, distroless), scan images for known CVEs using tools like Trivy or Snyk, pin dependency versions
- Never run containers as root; use the `USER` instruction in the Dockerfile to specify a non-root user
- Read-only file systems: mount the container's filesystem as read-only where possible to prevent attackers from writing to disk
- Secrets management: never bake secrets into images; use environment variables, Docker secrets, or external secrets managers
- Resource limits: set CPU and memory limits to prevent a compromised container from consuming all host resources
- Network policies: restrict container-to-container communication to only what is necessary; default-deny network policies in Kubernetes

**Code walkthrough:**

```dockerfile
# Step 1: Secure Dockerfile — minimal base image and non-root user
# Why: a smaller image has fewer packages and therefore fewer vulnerabilities
FROM python:3.12-alpine AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 2: Final stage — distroless-style minimal image
FROM python:3.12-alpine

# Why: remove the package manager to prevent attackers from installing tools
RUN apk --no-cache add libpq && \
    rm -rf /var/cache/apk/* /usr/bin/apk

# Step 3: Create non-root user before copying app files
# Why: if the container is compromised, the attacker gets minimal permissions
RUN adduser -D -H -s /sbin/nologin appuser
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY . .
RUN chown -R appuser:appuser /app

USER appuser

# Step 4: Health check lets the orchestrator detect unhealthy containers
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

EXPOSE 8000
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Step 5: Scan the image for CVEs before deploying
# Why: known vulnerabilities in dependencies can be exploited in production
trivy image --severity HIGH,CRITICAL myapp:latest

# Step 6: Run with security constraints
# Why: read-only filesystem prevents attackers from writing malware to disk
docker run --read-only \
    --tmpfs /tmp \
    --memory=512m --cpus=1.0 \
    --security-opt=no-new-privileges \
    myapp:latest
```

**Common pitfalls:**

- Using `latest` tags for base images, which makes builds non-reproducible and may pull in unverified changes.
- Running containers with `--privileged` flag, which disables most security features and gives the container nearly full host access.
- Not scanning images in CI/CD pipelines, allowing images with known critical vulnerabilities to be deployed to production.
- Exposing the Docker daemon API without authentication, which is equivalent to giving anyone root access to the host.

---

## API Security – OWASP API Security Top 10

APIs are the connective tissue of modern applications — they connect frontends to backends, services to services, and organisations to partners. Because APIs expose data and functionality directly, they are high-value targets for attackers. The OWASP API Security Top 10 identifies the most critical security risks specific to APIs.

API security differs from web application security because APIs are designed for machine-to-machine communication, often lack the browser-based protections (same-origin policy, CSRF tokens) that web applications benefit from, and expose structured data that is easier for attackers to enumerate and manipulate.

**Why it matters:** API breaches are among the most damaging security incidents because APIs often provide direct access to backend data and business logic. A single broken authorisation check on an API endpoint can expose millions of records. Understanding API-specific security risks and how to test for them is essential for any mid-level Security Engineer.

**Key things to understand:**

- **API1 – Broken Object Level Authorization (BOLA):** The most common API vulnerability; the API does not verify that the authenticated user has permission to access the specific object they are requesting (e.g., changing `/api/users/42` to `/api/users/43`)
- **API2 – Broken Authentication:** Weak authentication mechanisms, missing rate limiting, or flawed token management
- **API3 – Broken Object Property Level Authorization:** The API exposes properties that the user should not be able to read or write (mass assignment, excessive data exposure)
- **API4 – Unrestricted Resource Consumption:** No rate limiting, pagination, or size restrictions, allowing abuse and denial of service
- **API5 – Broken Function Level Authorization:** Regular users able to access admin endpoints
- Rate limiting, input validation, output filtering, and authentication enforcement must be applied at the API gateway and application level
- Test APIs using tools like Burp Suite, Postman (for functional testing), and purpose-built API security tools

**Code walkthrough:**

```python
# Step 1: Prevent BOLA (Broken Object Level Authorization)
# Why: the #1 API vulnerability — users accessing other users' data
from fastapi import FastAPI, Depends, HTTPException, Path

app = FastAPI()

# Simulated data
orders_db = {
    1: {"id": 1, "owner_id": "user-42", "product": "Widget", "total": 99.99},
    2: {"id": 2, "owner_id": "user-99", "product": "Gadget", "total": 49.99},
}

async def get_current_user_id() -> str:
    """Extract user ID from validated JWT (simplified for clarity)."""
    return "user-42"

@app.get("/api/orders/{order_id}")
async def get_order(
    order_id: int = Path(...),
    current_user: str = Depends(get_current_user_id),
):
    order = orders_db.get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    # Step 2: Check that the authenticated user OWNS this specific order
    # Why: without this check, user-42 could access user-99's orders
    if order["owner_id"] != current_user:
        raise HTTPException(403, "You do not have access to this order")
    return order

# Step 3: Rate limiting — prevent brute-force and abuse
# Why: without rate limits, attackers can enumerate all order IDs
from collections import defaultdict
from time import time

request_counts: dict[str, list[float]] = defaultdict(list)

async def rate_limit(user_id: str, max_requests: int = 100, window: int = 60):
    """Sliding window rate limiter."""
    now = time()
    # Remove expired timestamps
    request_counts[user_id] = [
        ts for ts in request_counts[user_id] if now - ts < window
    ]
    if len(request_counts[user_id]) >= max_requests:
        raise HTTPException(429, "Rate limit exceeded")
    request_counts[user_id].append(now)
```

**Common pitfalls:**

- Relying on the frontend to enforce authorisation; if the API does not check permissions, an attacker can bypass the frontend entirely.
- Returning all object properties in API responses and relying on the frontend to hide sensitive fields.
- Not implementing rate limiting, allowing brute-force attacks against authentication endpoints.
- Treating internal APIs as inherently trusted; internal APIs should enforce authentication and authorisation as rigorously as public APIs.

---

## SAST and DAST – Automated Security Testing in the Pipeline

Static Application Security Testing (SAST) analyses source code without executing it, looking for patterns that indicate vulnerabilities (e.g., SQL queries built by string concatenation, hardcoded credentials, missing output encoding). Dynamic Application Security Testing (DAST) tests the running application by sending crafted requests and analysing the responses for signs of vulnerabilities (e.g., error messages revealing stack traces, reflected XSS in responses).

SAST and DAST are complementary. SAST finds issues in the code before it is deployed — it can identify the exact line of code where a vulnerability exists. DAST finds issues in the running application — it can identify misconfigurations and runtime behaviours that SAST cannot see. Both should be integrated into the CI/CD pipeline as automated quality gates.

**Why it matters:** Manual code review and penetration testing are essential but do not scale to every commit on every project. SAST and DAST provide continuous, automated security feedback that catches common vulnerabilities before they reach production. They are the foundation of a "shift-left" security programme.

**Key things to understand:**

- SAST: analyses source code or bytecode; produces results mapped to specific code lines; examples include SonarQube, Semgrep, CodeQL, and Checkmarx
- DAST: tests the running application over HTTP; does not require access to source code; examples include OWASP ZAP, Burp Suite (automated scan mode), and Nuclei
- SCA (Software Composition Analysis): scans dependencies for known vulnerabilities (CVEs); examples include Snyk, Dependabot, and `pip-audit`
- False positives: both SAST and DAST produce findings that are not real vulnerabilities; triage and contextual analysis are essential to avoid alert fatigue
- Integration: run SAST on every pull request, run SCA on every build, run DAST against staging environments; fail builds only for high/critical findings to avoid blocking development
- Findings must be triaged, prioritised, and tracked to resolution; a tool that produces findings no one acts on provides no security value

**Code walkthrough:**

```yaml
# Step 1: Semgrep SAST configuration — catch vulnerabilities in code
# Why: SAST runs on every PR to catch issues before they reach production
# File: .semgrep.yml
rules:
  - id: sql-injection-detection
    patterns:
      - pattern: |
          cursor.execute(f"... {$USER_INPUT} ...")
      - pattern: |
          cursor.execute("..." + $USER_INPUT + "...")
    message: "Possible SQL injection — use parameterised queries instead"
    severity: ERROR
    languages: [python]

  - id: hardcoded-secret
    pattern: |
      $VAR = "sk_live_..."
    message: "Hardcoded API key detected — use environment variables or Key Vault"
    severity: ERROR
    languages: [python]
```

```yaml
# Step 2: GitHub Actions CI pipeline with SAST, SCA, and DAST
# Why: automated security testing on every pull request catches issues early
# File: .github/workflows/security.yml
name: Security Checks
on: [pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Semgrep SAST
        uses: returntocorp/semgrep-action@v1
        with:
          config: .semgrep.yml

  dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install pip-audit
      # Why: fail the build if any dependency has a known CVE
      - run: pip-audit --requirement requirements.txt --strict
```

**Common pitfalls:**

- Enabling SAST/DAST tools without triaging findings, resulting in thousands of unreviewed alerts that everyone ignores.
- Treating automated scan results as the definitive security assessment; these tools find patterns, not all vulnerabilities.
- Running DAST against production without approval; dynamic scanners can cause unintended side effects (data creation, service disruption).
- Not suppressing confirmed false positives, causing the same irrelevant findings to appear in every scan.
