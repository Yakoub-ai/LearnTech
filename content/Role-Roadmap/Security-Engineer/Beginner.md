# Security Engineer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Security Engineer learning path.

---

## Security Fundamentals – The CIA Triad

The CIA triad is the foundational model for information security. It defines three core objectives that every security control aims to protect: Confidentiality (ensuring that information is accessible only to those authorised to access it), Integrity (ensuring that information is accurate and has not been tampered with), and Availability (ensuring that information and systems are accessible when needed by authorised users).

These three properties are often in tension. Encrypting all data at rest and in transit improves confidentiality but may reduce availability if key management fails. Allowing unrestricted public access maximises availability but destroys confidentiality. Security engineering is the discipline of finding the right balance for the specific system, data sensitivity, and business context.

**Why it matters:** The CIA triad is the lens through which all security decisions are evaluated. When assessing a vulnerability, you ask: does this compromise confidentiality, integrity, or availability? When designing a control, you ask: which of these properties does this protect? Without this framework, security work becomes a disconnected collection of tools and checklists rather than a coherent discipline.

**Key things to understand:**

- Confidentiality: encryption, access controls, data classification, need-to-know principle
- Integrity: hashing, digital signatures, checksums, audit logs, input validation
- Availability: redundancy, backups, DDoS protection, capacity planning, disaster recovery
- Defence in depth: layering multiple security controls so that the failure of one does not compromise the entire system
- The principle of least privilege: every user, process, and system should have only the minimum permissions needed to perform its function
- Risk = Threat × Vulnerability × Impact: a threat exploits a vulnerability to cause impact; security controls reduce one or more of these factors

**Code walkthrough:**

```python
# Step 1: Input validation and sanitisation
# Why: untrusted input is the root cause of most web vulnerabilities
import re
from pydantic import BaseModel, Field, field_validator

class UserRegistration(BaseModel):
    username: str = Field(..., min_length=3, max_length=30)
    email: str
    age: int = Field(..., ge=13, le=150)

    @field_validator("username")
    @classmethod
    def username_must_be_safe(cls, v: str) -> str:
        # Why: reject characters that could be used in injection attacks
        if not re.match(r"^[a-zA-Z0-9_-]+$", v):
            raise ValueError("Username may only contain letters, digits, _ and -")
        return v

    @field_validator("email")
    @classmethod
    def email_must_be_valid(cls, v: str) -> str:
        # Why: basic structural check before further processing
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Invalid email format")
        return v.lower().strip()

# Step 2: Pydantic rejects bad input before your code ever sees it
try:
    bad = UserRegistration(username="<script>alert(1)</script>", email="x", age=10)
except Exception as e:
    print(e)  # validation errors for username, email, and age

good = UserRegistration(username="alice_01", email="Alice@Example.com", age=25)
print(good.email)  # "alice@example.com" — normalised
```

**Common pitfalls:**

- Focusing exclusively on confidentiality (encryption, firewalls) while ignoring integrity (can the data be tampered with?) and availability (can the system be denied to legitimate users?).
- Treating security as a binary state ("we are secure" vs "we are not secure") rather than as a continuous spectrum of risk management.
- Applying the same security controls to all data regardless of sensitivity; not all data requires the same level of protection, and over-protecting low-sensitivity data wastes resources.

---

## OWASP Top 10 – The Most Critical Web Application Security Risks

The Open Web Application Security Project (OWASP) publishes a regularly updated list of the ten most critical security risks for web applications. The OWASP Top 10 is the most widely referenced baseline for web application security and is used by security teams, auditors, and regulators worldwide. The 2021 edition is the current stable reference, with a 2025 update available.

For a beginner Security Engineer, the OWASP Top 10 serves as a structured introduction to the vulnerability classes that are most commonly exploited in real-world attacks. Each category describes what the vulnerability is, why it is dangerous, and how to prevent it.

**Why it matters:** The OWASP Top 10 represents the consensus of the security community on what matters most. Being able to identify, explain, and mitigate each category is the baseline expectation for any security professional. These are not theoretical risks — they are the vulnerabilities that are actively exploited in breaches every day.

**Key things to understand:**

- **A01 – Broken Access Control:** Users accessing resources or actions they should not; enforce authorisation server-side on every request
- **A02 – Cryptographic Failures:** Sensitive data exposed due to weak or missing encryption; enforce HTTPS, hash passwords with bcrypt/Argon2
- **A03 – Injection:** Unsanitised input interpreted as commands (SQL injection, command injection); use parameterised queries
- **A04 – Insecure Design:** Security flaws in the architecture itself, not just the implementation; threat modelling must happen before code
- **A05 – Security Misconfiguration:** Default credentials, unnecessary services, verbose errors; harden every layer
- **A06 – Vulnerable Components:** Outdated dependencies with known CVEs; automate dependency scanning
- **A07 – Authentication Failures:** Weak passwords, missing rate limiting, predictable tokens; use proven auth libraries
- **A08 – Software and Data Integrity Failures:** Unverified updates, insecure CI/CD, unsafe deserialisation
- **A09 – Logging and Monitoring Failures:** Insufficient logging means breaches go undetected; log security events without logging secrets
- **A10 – Server-Side Request Forgery (SSRF):** Server makes requests to attacker-controlled or internal URLs

**Code walkthrough:**

```python
# Step 1: SQL injection prevention with parameterised queries
# Why: parameterised queries separate data from SQL commands,
#      making injection impossible regardless of what the user sends
import sqlite3

def get_user_UNSAFE(username: str):
    """VULNERABLE — never do this! User input is part of the SQL string."""
    conn = sqlite3.connect("app.db")
    # An attacker sends: username = "' OR 1=1 --"
    # The query becomes: SELECT * FROM users WHERE name = '' OR 1=1 --'
    query = f"SELECT * FROM users WHERE name = '{username}'"  # BAD
    return conn.execute(query).fetchall()

def get_user_safe(username: str):
    """SAFE — the ? placeholder keeps input separate from the query."""
    conn = sqlite3.connect("app.db")
    # Why: the database engine treats the parameter as data, never as SQL
    return conn.execute(
        "SELECT * FROM users WHERE name = ?", (username,)
    ).fetchall()

# Step 2: Password hashing with bcrypt
# Why: bcrypt is intentionally slow, making brute-force attacks impractical
import bcrypt

def hash_password(plain_password: str) -> str:
    # Why: salt is generated automatically — each hash is unique
    salt = bcrypt.gensalt(rounds=12)  # rounds = work factor
    return bcrypt.hashpw(plain_password.encode(), salt).decode()

def verify_password(plain_password: str, hashed: str) -> bool:
    # Why: bcrypt handles salt extraction internally — you just compare
    return bcrypt.checkpw(plain_password.encode(), hashed.encode())

stored_hash = hash_password("s3cur3P@ssw0rd")
print(verify_password("s3cur3P@ssw0rd", stored_hash))  # True
print(verify_password("wrong", stored_hash))            # False
```

**Common pitfalls:**

- Treating the OWASP Top 10 as a checklist to complete once rather than a framework for ongoing awareness.
- Assuming that a web framework automatically prevents all OWASP Top 10 issues; frameworks help but do not eliminate the need for secure design and testing.
- Focusing only on injection (the historically most famous category) while ignoring broken access control, which is now the most prevalent critical finding.

---

## Web Security Basics – How Web Attacks Work

Understanding how web attacks work requires understanding how the web itself works. A web application consists of a client (browser) and a server communicating over HTTP. The browser sends requests, the server processes them and returns responses. Attackers exploit weaknesses in this cycle: injecting malicious input that the server processes unsafely, manipulating the browser into performing unintended actions, or intercepting communication between client and server.

The three most fundamental web attacks every Security Engineer must understand are SQL injection (injecting SQL commands through user input), Cross-Site Scripting (XSS, injecting JavaScript that executes in other users' browsers), and Cross-Site Request Forgery (CSRF, tricking an authenticated user's browser into making requests they did not intend). These three attacks have existed for decades and remain among the most commonly exploited vulnerabilities.

**Why it matters:** You cannot defend against attacks you do not understand. A Security Engineer must be able to recognise, demonstrate, and explain these attacks before they can effectively test for them, design mitigations, or review code for vulnerabilities. Hands-on practice in lab environments like PortSwigger Web Security Academy makes these concepts concrete.

**Key things to understand:**

- SQL Injection: attacker supplies input like `' OR 1=1 --` that is concatenated into a SQL query, allowing data extraction or manipulation; prevented by parameterised queries
- Cross-Site Scripting (XSS): attacker injects JavaScript that executes in other users' browsers; Stored XSS persists in the database, Reflected XSS is in the URL; prevented by output encoding and Content Security Policy
- Cross-Site Request Forgery (CSRF): attacker tricks an authenticated user's browser into submitting a request (e.g., changing their email address); prevented by CSRF tokens and SameSite cookies
- The same-origin policy and how it restricts cross-origin interactions in the browser
- HTTPS and TLS: how encryption in transit prevents eavesdropping and tampering; why HTTP without TLS is inherently insecure
- Security headers: `Content-Security-Policy`, `X-Content-Type-Options`, `Strict-Transport-Security`, `X-Frame-Options`

**Code walkthrough:**

```python
# Step 1: XSS prevention — output encoding and Content Security Policy
# Why: XSS lets attackers run JavaScript in other users' browsers
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import html

app = FastAPI()

# Step 2: Add security headers via middleware
# Why: these headers tell the browser to enable built-in protections
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    # Why: HSTS forces HTTPS — prevents downgrade attacks
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    # Why: CSP restricts where scripts can load from — blocks inline XSS
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'"
    # Why: prevents the browser from MIME-sniffing a response as executable
    response.headers["X-Content-Type-Options"] = "nosniff"
    # Why: prevents the page from being embedded in an iframe (clickjacking)
    response.headers["X-Frame-Options"] = "DENY"
    return response

@app.get("/greet", response_class=HTMLResponse)
async def greet(name: str = "World"):
    # Step 3: Always escape user input before rendering in HTML
    # Why: without escaping, name="<script>alert(1)</script>" would execute
    safe_name = html.escape(name)
    return f"<h1>Hello, {safe_name}!</h1>"

# Step 4: HTTPS enforcement in FastAPI
# Why: HTTP transmits everything in plaintext — passwords, tokens, data
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
# app.add_middleware(HTTPSRedirectMiddleware)  # uncomment in production
```

**Common pitfalls:**

- Believing that input validation alone prevents injection; validation helps but is not sufficient — parameterised queries are the definitive fix for SQL injection.
- Confusing encoding, escaping, and sanitisation; each serves a different purpose and is appropriate in different contexts.
- Assuming HTTPS means the application is secure; HTTPS encrypts the transport but does nothing about application-level vulnerabilities.
- Testing only with a browser and missing vulnerabilities that require intercepting and modifying requests with a proxy tool like Burp Suite.

---

## Networking Fundamentals – TCP/IP, DNS and How Traffic Flows

Networking is the physical and logical infrastructure that connects systems. Every web request, API call, database connection, and file transfer depends on the network. For a Security Engineer, understanding how networks work is essential because most attacks either traverse the network or exploit network protocols.

The TCP/IP model is the foundation: the Network Interface layer handles physical connections, the Internet layer (IP) handles addressing and routing, the Transport layer (TCP/UDP) handles reliable delivery and port-based multiplexing, and the Application layer (HTTP, DNS, SSH) handles the protocols that applications use. DNS translates human-readable domain names into IP addresses. Firewalls filter traffic based on source, destination, port, and protocol.

**Why it matters:** A Security Engineer who does not understand networking cannot analyse traffic, configure firewalls, understand VPN topologies, investigate network-based attacks, or explain how a man-in-the-middle attack works. Networking is the infrastructure layer upon which all application security sits.

**Key things to understand:**

- The TCP/IP four-layer model and how data encapsulation works (application data → TCP segment → IP packet → frame)
- TCP three-way handshake (SYN → SYN-ACK → ACK) and why it matters for understanding connection-based attacks
- IP addressing: IPv4 addresses, subnets, CIDR notation, private vs public address ranges
- DNS resolution: recursive and iterative queries, A records, CNAME records, and why DNS is a common attack vector (DNS spoofing, DNS exfiltration)
- Common ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), 3389 (RDP)
- Firewalls: packet filtering, stateful inspection, and the concept of allow/deny rules based on source, destination, and port

**Code walkthrough:**

```python
# Step 1: DNS lookup — understand what happens before an HTTP request
# Why: DNS translates domain names to IP addresses; attackers exploit this
import socket

def resolve_domain(domain: str):
    """Demonstrate the DNS resolution that precedes every HTTP request."""
    try:
        # Why: getaddrinfo returns all address records for a domain
        results = socket.getaddrinfo(domain, 443, proto=socket.IPPROTO_TCP)
        for family, kind, proto, canonname, sockaddr in results:
            ip, port = sockaddr[:2]
            print(f"{domain} → {ip}:{port} (IPv{'6' if family == socket.AF_INET6 else '4'})")
    except socket.gaierror as e:
        print(f"DNS resolution failed: {e}")

resolve_domain("example.com")

# Step 2: TCP connection — the three-way handshake at the Python level
# Why: understanding TCP helps you analyse connection-based attacks
def check_port_open(host: str, port: int, timeout: float = 3.0) -> bool:
    """Check if a TCP port is accepting connections (SYN → SYN-ACK → ACK)."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        result = sock.connect_ex((host, port))
        return result == 0  # 0 means the connection succeeded
    finally:
        sock.close()

# Step 3: Scan common ports — a basic network reconnaissance technique
# Why: security engineers must know what services are exposed
common_ports = {22: "SSH", 80: "HTTP", 443: "HTTPS", 3306: "MySQL", 5432: "PostgreSQL"}
for port, service in common_ports.items():
    status = "OPEN" if check_port_open("127.0.0.1", port) else "closed"
    print(f"  Port {port} ({service}): {status}")
```

**Common pitfalls:**

- Assuming that being on a "private" network means traffic is secure; internal networks are frequently compromised and lateral movement is a standard attack technique.
- Confusing encryption in transit (TLS) with network segmentation; they solve different problems and both are needed.
- Not understanding NAT (Network Address Translation) and how it affects the ability to identify the true source of traffic.

---

## Linux Security – Permissions, Users and Hardening

Linux is the operating system that runs the majority of servers, cloud infrastructure, and security tools. For a Security Engineer, Linux proficiency is non-negotiable — both for securing Linux systems and for using the offensive and defensive tools that run on Linux.

Linux security starts with the user and permission model. Every file and process has an owner and group, and permissions define who can read, write, or execute. The root user has unrestricted access, which makes it both powerful and dangerous. Beyond file permissions, Linux security involves managing services (disabling unnecessary ones), configuring firewalls (iptables, ufw), monitoring logs, and applying security updates.

**Why it matters:** Most security tools run on Linux (Burp Suite, Nmap, Wireshark, Metasploit, and countless others). Most servers that Security Engineers are asked to protect run Linux. And most attackers target Linux servers. Understanding Linux security is essential for both offence and defence.

**Key things to understand:**

- User management: creating users, managing groups, `sudo` and why root login should be disabled
- File permissions: the `rwx` model for user/group/other, `chmod`, `chown`, and understanding octal notation (e.g., 755, 644)
- The principle of least privilege applied to Linux: run services as non-root users, restrict file permissions to the minimum needed
- Firewall configuration: `ufw` or `iptables` for controlling inbound and outbound traffic
- SSH security: key-based authentication instead of passwords, disabling root login, changing the default port
- Log files: `/var/log/auth.log` for authentication events, `/var/log/syslog` for system events, and how to use `journalctl`

**Code walkthrough:**

```bash
#!/bin/bash
# Step 1: Create a non-root user for running applications
# Why: if the application is compromised, the attacker gets limited permissions
sudo useradd --system --no-create-home --shell /usr/sbin/nologin appuser

# Step 2: Set restrictive file permissions
# Why: 750 means owner=rwx, group=r-x, others=nothing
sudo chmod 750 /opt/myapp
sudo chown -R appuser:appuser /opt/myapp

# Step 3: Configure SSH securely
# Why: password authentication is vulnerable to brute-force attacks
sudo tee /etc/ssh/sshd_config.d/hardened.conf <<EOF
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers deployer
EOF
sudo systemctl restart sshd

# Step 4: Configure the firewall — allow only what is needed
# Why: default-deny means only explicitly allowed traffic gets through
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
sudo ufw status verbose

# Step 5: Check authentication logs for suspicious activity
# Why: failed login attempts may indicate a brute-force attack
sudo grep "Failed password" /var/log/auth.log | tail -20
```

**Common pitfalls:**

- Running applications as root because it is easier; this gives an attacker full system access if the application is compromised.
- Setting permissions to 777 (world-readable, writable, executable) to "fix" a permission error without understanding why the error occurred.
- Not updating the system regularly; unpatched Linux servers are one of the most common entry points for attackers.
- Leaving default SSH configuration (root login enabled, password authentication enabled) on internet-facing servers.

---

## Cryptography Basics – Encryption, Hashing and Digital Signatures

Cryptography is the science of protecting information through mathematical transformations. For a Security Engineer, cryptography provides the tools for three fundamental capabilities: keeping data secret (encryption), verifying that data has not been modified (hashing), and proving the identity of the sender (digital signatures).

There are two families of encryption: symmetric (the same key encrypts and decrypts, e.g., AES) and asymmetric (a public key encrypts, a private key decrypts, e.g., RSA). Hashing is a one-way function that produces a fixed-size fingerprint of input data; it is used for password storage, file integrity verification, and digital signatures. A digital signature combines hashing with asymmetric encryption to prove both the identity of the signer and the integrity of the signed data.

**Why it matters:** Cryptography underpins TLS/HTTPS, password storage, API authentication, code signing, and data protection at rest. A Security Engineer who does not understand cryptography cannot evaluate whether a system's protections are adequate, cannot identify cryptographic weaknesses, and cannot make informed recommendations.

**Key things to understand:**

- Symmetric encryption (AES): fast, used for encrypting large amounts of data; the challenge is securely sharing the key
- Asymmetric encryption (RSA, ECDSA): slower, used for key exchange and digital signatures; the public key is shared, the private key is secret
- Hashing (SHA-256, bcrypt, Argon2): one-way, deterministic, fixed-size output; used for password storage and integrity verification
- The difference between encryption (reversible with the key) and hashing (one-way, not reversible)
- TLS handshake: how asymmetric encryption is used to exchange a symmetric session key, which is then used for the actual communication
- Certificate authorities and how HTTPS trust works: the browser trusts a CA, the CA signs the server's certificate, the browser verifies the signature

**Code walkthrough:**

```python
# Step 1: Symmetric encryption with AES (Fernet wraps AES-128-CBC + HMAC)
# Why: encryption keeps data confidential even if storage is compromised
from cryptography.fernet import Fernet

# Step 2: Generate a key — this must be stored securely (e.g., Key Vault)
key = Fernet.generate_key()
cipher = Fernet(key)

# Encrypt sensitive data at rest
plaintext = b"SSN: 123-45-6789"
ciphertext = cipher.encrypt(plaintext)
print(f"Encrypted: {ciphertext[:40]}...")  # unreadable bytes

# Decrypt when needed
decrypted = cipher.decrypt(ciphertext)
assert decrypted == plaintext

# Step 3: Hashing for integrity verification
# Why: hashing produces a fixed-size fingerprint — any change to the
#      input produces a completely different hash
import hashlib

def verify_file_integrity(file_path: str, expected_sha256: str) -> bool:
    """Check that a downloaded file hasn't been tampered with."""
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            sha256.update(chunk)
    actual = sha256.hexdigest()
    return actual == expected_sha256

# Step 4: Digital signatures — prove who created the data
# Why: encryption hides data; signatures prove authenticity and integrity
from cryptography.hazmat.primitives.asymmetric import ec, utils
from cryptography.hazmat.primitives import hashes

private_key = ec.generate_private_key(ec.SECP256R1())
public_key = private_key.public_key()

message = b"Transfer $500 to account 12345"
signature = private_key.sign(message, ec.ECDSA(hashes.SHA256()))
# Anyone with the public key can verify the sender and integrity
public_key.verify(signature, message, ec.ECDSA(hashes.SHA256()))  # no error = valid
```

**Common pitfalls:**

- Using MD5 or SHA-1 for any security purpose; both have known collision vulnerabilities and should be considered broken for security use.
- Storing passwords with a fast hash (SHA-256) instead of a slow, salted password hash (bcrypt, Argon2); fast hashes can be brute-forced.
- Confusing encoding (Base64) with encryption; encoding is trivially reversible and provides zero security.
- Implementing custom cryptography instead of using well-tested libraries; cryptography is extraordinarily easy to get wrong and the consequences of getting it wrong are catastrophic.

---

## Authentication Fundamentals – Proving Identity Securely

Authentication is the process of proving that a user, device, or service is who it claims to be. Authorisation — a separate but related concept — determines what an authenticated entity is allowed to do. Confusing the two is one of the most common mistakes in application security.

Modern authentication relies on one or more factors: something you know (password, PIN), something you have (phone, hardware key), or something you are (fingerprint, face). Multi-factor authentication (MFA) requires at least two of these categories and is now the minimum standard for any system that handles sensitive data or provides administrative access.

Passwords remain the most common authentication factor despite decades of known weaknesses. Users reuse passwords, choose predictable ones, and are vulnerable to phishing. Passkeys (FIDO2/WebAuthn) represent the industry shift away from passwords entirely — they use public-key cryptography bound to a specific device, making phishing and credential-stuffing attacks structurally impossible.

**Why it matters:** Broken authentication is one of the top two most exploited vulnerability classes (OWASP A07). A Security Engineer must understand how authentication works at a protocol level to evaluate implementations, identify weaknesses, and recommend appropriate controls. As the industry moves from passwords to passkeys and OAuth 2.1, understanding both legacy and modern authentication mechanisms is essential.

**Key things to understand:**

- Multi-factor authentication (MFA): combines two or more factor categories; SMS-based MFA is better than nothing but vulnerable to SIM-swapping — TOTP (authenticator apps) or FIDO2 hardware keys are preferred
- Session management: after authentication, the server creates a session token (typically a cookie) that identifies the user on subsequent requests; session tokens must be random, sufficiently long, HttpOnly, Secure, and have appropriate expiry
- Password policies: length is more important than complexity; minimum 12 characters, check against breached password lists (Have I Been Pwned API), never store in plaintext
- Passkeys and FIDO2/WebAuthn: public-key authentication where the private key never leaves the user's device; phishing-resistant because the credential is bound to the origin (domain)
- OAuth 2.1 and OpenID Connect: the modern standard for delegated authorisation and authentication in web applications; replaces direct password handling with token-based flows (covered in depth at the Mid level)
- Credential stuffing: attackers use lists of breached username/password pairs to attempt login on other services; rate limiting, account lockout, and MFA are the primary defences
- Brute-force protection: rate limiting login attempts, implementing exponential backoff, CAPTCHA after repeated failures, and account lockout policies

**Code walkthrough:**

```python
# Step 1: Secure session management fundamentals
# Why: after authentication, the session token IS the user's identity;
#      a leaked or predictable session token is equivalent to a stolen password
import secrets
from datetime import datetime, timezone, timedelta

class SessionManager:
    """Minimal secure session manager demonstrating key principles."""

    def __init__(self):
        self.sessions: dict[str, dict] = {}

    def create_session(self, user_id: str) -> str:
        # Step 2: Generate a cryptographically random session token
        # Why: predictable tokens can be guessed; secrets.token_urlsafe
        # uses the OS CSPRNG (cryptographically secure PRNG)
        token = secrets.token_urlsafe(32)  # 256 bits of entropy
        self.sessions[token] = {
            "user_id": user_id,
            "created_at": datetime.now(timezone.utc),
            "expires_at": datetime.now(timezone.utc) + timedelta(hours=1),
        }
        return token

    def validate_session(self, token: str) -> dict | None:
        session = self.sessions.get(token)
        if not session:
            return None
        # Step 3: Check expiry — expired sessions must be rejected
        # Why: long-lived sessions increase the window for token theft
        if datetime.now(timezone.utc) > session["expires_at"]:
            del self.sessions[token]
            return None
        return session

    def destroy_session(self, token: str) -> None:
        # Step 4: Logout must destroy the session server-side
        # Why: deleting the client cookie alone is insufficient;
        #      the token could still be used if stolen before logout
        self.sessions.pop(token, None)


# Step 5: Brute-force protection with rate limiting
from collections import defaultdict

class LoginRateLimiter:
    """Prevent brute-force attacks by limiting failed login attempts."""

    def __init__(self, max_attempts: int = 5, lockout_minutes: int = 15):
        self.max_attempts = max_attempts
        self.lockout_minutes = lockout_minutes
        self.attempts: dict[str, list[datetime]] = defaultdict(list)

    def is_locked(self, username: str) -> bool:
        now = datetime.now(timezone.utc)
        cutoff = now - timedelta(minutes=self.lockout_minutes)
        # Remove old attempts outside the window
        self.attempts[username] = [
            t for t in self.attempts[username] if t > cutoff
        ]
        return len(self.attempts[username]) >= self.max_attempts

    def record_failure(self, username: str) -> None:
        self.attempts[username].append(datetime.now(timezone.utc))

    def reset(self, username: str) -> None:
        # Why: reset on successful login so legitimate users are not penalised
        self.attempts.pop(username, None)
```

**Common pitfalls:**

- Implementing "remember me" by storing passwords in cookies or localStorage; use long-lived refresh tokens with proper rotation instead.
- Relying on client-side session expiry only (e.g., deleting the cookie); the server must also invalidate the session to prevent token reuse.
- Not implementing rate limiting on login endpoints; without it, attackers can try millions of password combinations.
- Using SMS-based MFA as the only second factor; SIM-swapping attacks can intercept SMS codes. TOTP or FIDO2 hardware keys are more resistant.
- Allowing users to set passwords without checking against known breached password lists; the password "P@ssw0rd123!" satisfies most complexity rules but has been leaked in millions of breaches.

---

## Secure Coding Fundamentals – Writing Code That Resists Attack

Secure coding is the practice of writing software that continues to behave correctly even when an attacker provides unexpected, malicious, or crafted input. It is not a separate activity from development — it is a quality attribute of well-written code, just like performance and readability.

The core principle is simple: never trust input. Any data that originates outside the system boundary — user input, API responses, file uploads, database records, environment variables — must be validated, sanitised, or escaped before it is used. The specific technique depends on the context: parameterised queries for SQL, output encoding for HTML, allowlist validation for file paths, and schema validation for structured data.

**Why it matters:** The majority of exploitable vulnerabilities stem from code that handles input incorrectly. SQL injection, XSS, command injection, path traversal, and deserialisation attacks all exploit the same fundamental error: treating untrusted input as trusted code or data. A Security Engineer must be able to identify insecure code patterns in reviews and recommend secure alternatives.

**Key things to understand:**

- Input validation: check that input conforms to expected format, length, type, and range before processing; use allowlists (define what is permitted) rather than denylists (try to block what is dangerous)
- Output encoding: transform data for the output context — HTML encoding for web pages, URL encoding for query parameters, JSON encoding for API responses; prevents injection in the output channel
- Parameterised queries: the definitive fix for SQL injection; separate data from commands at the database driver level
- Secure defaults: systems should be secure out of the box; features that weaken security (debug mode, verbose errors, open CORS) must be opt-in, not opt-out
- Error handling: never expose internal details (stack traces, database schema, file paths) in error messages; log detailed errors server-side and return generic messages to users
- Dependency management: keep third-party libraries updated; use `pip-audit`, `npm audit`, or Snyk to scan for known vulnerabilities in dependencies
- Secrets management: never hardcode secrets (API keys, database passwords, encryption keys) in source code; use environment variables, secret managers (Azure Key Vault, HashiCorp Vault), or `.env` files excluded from version control

**Code walkthrough:**

```python
# Step 1: Secure vs insecure error handling
# Why: detailed error messages help attackers understand your system's internals
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import logging

app = FastAPI()
logger = logging.getLogger("security")

# INSECURE — leaks internal details to the attacker
@app.get("/user-unsafe/{user_id}")
async def get_user_unsafe(user_id: int):
    try:
        user = db.query(f"SELECT * FROM users WHERE id = {user_id}")
        return user
    except Exception as e:
        # BAD: returns the full exception to the client
        return {"error": str(e)}  # "OperationalError: no such table: users"

# SECURE — generic error to client, detailed log server-side
@app.get("/user-safe/{user_id}")
async def get_user_safe(user_id: int):
    try:
        user = db.execute(
            "SELECT id, name, email FROM users WHERE id = ?", (user_id,)
        ).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"id": user[0], "name": user[1], "email": user[2]}
    except HTTPException:
        raise  # Re-raise known HTTP errors
    except Exception as e:
        # Log the real error for debugging
        logger.error(f"Database error fetching user {user_id}: {e}")
        # Return a generic error to the client
        raise HTTPException(status_code=500, detail="Internal server error")


# Step 2: Path traversal prevention
# Why: if user input controls a file path, attackers can read
#      arbitrary files like ../../etc/passwd
from pathlib import Path

UPLOAD_DIR = Path("/app/uploads")

def safe_file_read(filename: str) -> bytes:
    """Read a file from the uploads directory, preventing path traversal."""
    # Step 3: Resolve the full path and verify it stays within UPLOAD_DIR
    requested_path = (UPLOAD_DIR / filename).resolve()
    # Why: .resolve() normalises the path, collapsing ".." sequences
    if not requested_path.is_relative_to(UPLOAD_DIR):
        raise PermissionError("Access denied: path traversal detected")
    if not requested_path.is_file():
        raise FileNotFoundError("File not found")
    return requested_path.read_bytes()

# Step 4: Command injection prevention
# Why: never pass user input to shell commands via string concatenation
import subprocess

def ping_host_UNSAFE(host: str):
    """VULNERABLE — shell injection via user input."""
    # An attacker sends: host = "8.8.8.8; cat /etc/passwd"
    import os
    os.system(f"ping -c 1 {host}")  # BAD — executes arbitrary commands

def ping_host_safe(host: str):
    """SAFE — pass arguments as a list, shell=False (the default)."""
    import re
    # Step 5: Validate input format before use
    if not re.match(r"^[\d.]+$", host):
        raise ValueError("Invalid host format")
    # Why: subprocess with a list separates the command from arguments
    result = subprocess.run(
        ["ping", "-c", "1", host],
        capture_output=True, text=True, timeout=5
    )
    return result.stdout
```

**Common pitfalls:**

- Validating input on the client side only (JavaScript in the browser) without server-side validation; client-side checks can be bypassed trivially.
- Using denylists (blocking known bad patterns) instead of allowlists (permitting only known good patterns); attackers constantly find new ways to bypass denylists.
- Concatenating user input into shell commands, SQL queries, or HTML output; always use the language's safe API (parameterised queries, subprocess lists, output encoding).
- Logging sensitive data (passwords, credit card numbers, session tokens) in application logs; logs are often stored with weaker access controls than the application itself.
- Disabling security features in production that were only intended to be disabled in development (debug mode, CORS wildcard, verbose error pages).

---

## Security Tools and Reconnaissance – Building Your Toolkit

A Security Engineer's effectiveness depends on understanding the tools available for both offensive testing and defensive monitoring. At the beginner level, the focus is on understanding what each tool does, when to use it, and how to interpret its output — rather than mastering every feature.

The essential categories of security tools are: network scanning and reconnaissance (discovering what is exposed), traffic analysis (understanding what is happening on the network), web application testing (finding application-level vulnerabilities), and vulnerability scanning (identifying known weaknesses in systems and software).

**Why it matters:** Security is a practical discipline. Reading about vulnerabilities is necessary but insufficient — you must be able to discover them using real tools. Hands-on labs (TryHackMe, Hack The Box, PortSwigger Web Security Academy) provide safe environments to practice. Understanding these tools also helps when interpreting findings from automated scanners and penetration test reports.

**Key things to understand:**

- **Nmap**: the standard network scanner; discovers hosts, open ports, running services, and OS versions; `nmap -sV -sC target` runs version detection and default scripts; understanding Nmap output is prerequisite for network security assessment
- **Wireshark/tcpdump**: packet capture and analysis; inspect individual packets to understand protocols, detect anomalies, and investigate incidents; Wireshark provides a GUI, tcpdump works on the command line
- **Burp Suite**: the industry-standard web application testing proxy; intercepts HTTP requests between your browser and the server, allowing you to modify and replay them; essential for testing web vulnerabilities
- **OWASP ZAP**: an open-source alternative to Burp Suite for automated web scanning; good for CI/CD integration
- **CyberChef**: a web-based tool for encoding, decoding, encryption, hashing, and data transformation; useful for analysing suspicious data during investigations
- **Vulnerability scanners**: tools like Nessus, OpenVAS, and Qualys scan systems for known CVEs and misconfigurations; they complement manual testing by covering breadth

**Code walkthrough:**

```bash
#!/bin/bash
# Step 1: Basic network reconnaissance with Nmap
# Why: before testing security, you must know what is exposed
# -sV: detect service versions (what software is running on each port)
# -sC: run default NSE scripts (basic vulnerability checks)
# -oN: save output to a file for documentation
nmap -sV -sC -oN scan_results.txt 192.168.1.0/24

# Step 2: Quick port scan of a specific host
# Why: identify which services are listening before deep testing
nmap -p 1-1000 -T4 192.168.1.100

# Step 3: Capture network traffic with tcpdump
# Why: traffic analysis reveals unencrypted credentials, unusual
#      connections, and attack patterns
# -i eth0: capture on the eth0 interface
# -w: write to a pcap file for later analysis in Wireshark
sudo tcpdump -i eth0 -w capture.pcap -c 1000

# Step 4: Filter for HTTP traffic (unencrypted)
# Why: any HTTP (not HTTPS) traffic may contain credentials in cleartext
sudo tcpdump -i eth0 port 80 -A | grep -i "password\|cookie\|session"

# Step 5: Check SSL/TLS configuration of a web server
# Why: weak TLS configurations allow downgrade attacks and eavesdropping
openssl s_client -connect example.com:443 -tls1_2 </dev/null 2>/dev/null | \
    openssl x509 -noout -subject -dates -issuer

# Step 6: Generate file hashes for integrity verification
# Why: compare hashes before and after to detect file tampering
sha256sum /usr/bin/sshd > baseline_hashes.txt
# Later: verify nothing has changed
sha256sum -c baseline_hashes.txt
```

**Common pitfalls:**

- Running Nmap or vulnerability scanners against systems you do not own or have written authorisation to test; unauthorised scanning is illegal in most jurisdictions.
- Relying entirely on automated vulnerability scanners and treating the absence of findings as proof of security; scanners find known patterns but miss custom vulnerabilities and business logic flaws.
- Ignoring Wireshark and packet analysis skills; understanding network traffic at the packet level is essential for incident investigation and understanding how attacks work.
- Not documenting scan results; security assessments must be reproducible and auditable, especially when reporting findings to development teams or management.
- Using security tools without understanding the underlying protocols; tools are more effective when you understand what they are testing and why.
