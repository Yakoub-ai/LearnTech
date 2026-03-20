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
