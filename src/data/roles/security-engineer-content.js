export const content = {
  overview: `# Security Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Security Engineers protect systems, applications, and data by identifying vulnerabilities, implementing defences, and building security into the development lifecycle. The role covers application security, threat modelling, secure coding, penetration testing, cloud security, identity management, incident response, and security operations.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Security Fundamentals | [Cybersecurity Roadmap](https://roadmap.sh/cyber-security) | Interactive |
| OWASP Top 10 | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Docs |
| Web Security Basics | [Web Security Academy – PortSwigger](https://portswigger.net/web-security) | Interactive |
| Networking Fundamentals | [Computer Networking Full Course (9h)](https://www.youtube.com/watch?v=qiQR5rTSshw) | Video |
| Cryptography Explained | [Secret Key Exchange (Diffie-Hellman) – Computerphile](https://www.youtube.com/watch?v=NmM9HA2MQGI) | Video |
| Linux Security Basics | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |
| Security+ Foundations | [Professor Messer – CompTIA Security+ Course](https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/) | Video |
| Hands-on Security Labs | [TryHackMe – Introduction to Cyber Security](https://tryhackme.com/path/outline/introtocyber) | Interactive |
| Cryptography Basics | [Khan Academy – Cryptography](https://www.khanacademy.org/computing/computer-science/cryptography) | Interactive |
| Public Key Cryptography | [Public Key Cryptography – Art of the Problem](https://www.youtube.com/watch?v=YEBfamv-_do) | Video |

> **What you'll learn watching this:** How Diffie-Hellman key exchange allows two parties to agree on a shared secret over a public channel using modular arithmetic, without ever transmitting the secret itself — illustrated first with colours, then with the discrete logarithm problem.

**Why it matters:**
- The paint-colour analogy makes the core insight immediately intuitive: mixing is easy, un-mixing is hard — this asymmetry is the foundation of all public-key cryptography
- You will see exactly why the discrete logarithm problem is computationally hard for large prime moduli, giving you a genuine understanding of why RSA and Diffie-Hellman are secure
- The video explains why two people who have never met can nonetheless establish a shared encryption key — a prerequisite to understanding TLS, HTTPS, and every secure internet connection
- Understanding this mechanism lets you explain to developers why key length matters and what "breaking encryption" would actually require
- The historical framing (NORAD, early networking) shows why this was a revolutionary breakthrough and why the problem it solves is fundamental to the internet

### After completing Beginner you should be able to:

- Explain the CIA triad (Confidentiality, Integrity, Availability) and apply it to evaluate the security posture of a system
- Identify and describe the OWASP Top 10 vulnerability categories and explain why each is dangerous
- Explain how common web attacks work — SQL injection, XSS, CSRF — and describe their mitigations
- Describe the fundamentals of TCP/IP, DNS, HTTP/HTTPS, and how network traffic flows between client and server
- Navigate a Linux system, manage file permissions, and explain the principle of least privilege
- Explain the difference between symmetric and asymmetric encryption and describe when each is used
- Use a hands-on security lab environment to complete basic security challenges

For deep explanations of each concept, see the [Beginner Concept Reference](Security-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Penetration Testing | [PortSwigger Web Security Academy – All Labs](https://portswigger.net/web-security/all-labs) | Interactive |
| Threat Modelling | [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/) | Docs |
| Threat Modelling | [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) | Docs |
| Secure SDLC | [OWASP SAMM – Software Assurance Maturity Model](https://owaspsamm.org/) | Docs |
| Azure Security | [Microsoft Learn – Azure Security](https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/) | Interactive |
| Identity & Access Management | [OAuth 2.0 and OpenID Connect in Plain English](https://www.youtube.com/watch?v=996OiexHze0) | Video |
| Docker Security | [Learn Docker in 7 Easy Steps – Fireship](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| Container Security | [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) | Docs |
| API Security | [OWASP API Security Top 10](https://owasp.org/API-Security/) | Docs |
| SAST/DAST | [OWASP Source Code Analysis Tools](https://owasp.org/www-community/Source_Code_Analysis_Tools) | Docs |
| Hands-on Practice | [Hack The Box Academy](https://academy.hackthebox.com/) | Interactive |
| SIEM / Sentinel | [Microsoft Learn – Microsoft Sentinel Fundamentals](https://learn.microsoft.com/en-us/training/paths/security-ops-sentinel/) | Interactive |
| Secrets Management | [Microsoft Learn – Azure Key Vault](https://learn.microsoft.com/en-us/training/modules/configure-and-manage-azure-key-vault/) | Interactive |
| GDPR | [GDPR Overview – gdpr-info.eu](https://gdpr-info.eu/) | Reference |
| TLS / HTTPS Deep Dive | [SSL, TLS, HTTPS Explained – ByteByteGo](https://www.youtube.com/watch?v=j9QmMEWmcfo) | Video |

> **What you'll learn watching this:** How the TLS handshake works step by step — from TCP connection through cipher-suite negotiation, certificate exchange, asymmetric key exchange, and symmetric session encryption — and why HTTPS is not just HTTP with a padlock.

**Why it matters:**
- The video walks through each phase of the TLS 1.2 handshake in order, letting you trace exactly where each security property (authentication, confidentiality, integrity) is established
- The explanation of asymmetric vs symmetric encryption and why TLS switches between them (asymmetric is computationally expensive) is directly relevant to designing secure APIs and understanding performance trade-offs
- Understanding the session key exchange via RSA or Diffie-Hellman makes certificate pinning, MITM attack vectors, and downgrade attacks comprehensible at a mechanical level
- The comparison of TLS 1.2 (two round trips) with TLS 1.3 (one round trip) explains why upgrading TLS versions improves both security and performance
- Security engineers who can explain the TLS handshake can reason about misconfigurations, weak cipher suites, expired certificates, and what information an attacker could extract from intercepted traffic

### After completing Mid you should be able to:

- Perform a structured threat model using STRIDE and produce a prioritised list of threats with mitigations
- Execute web application penetration tests using manual techniques and tools like Burp Suite
- Integrate SAST and DAST scanning into a CI/CD pipeline and triage the findings
- Configure Azure security services including Defender for Cloud, Key Vault, and network security groups
- Explain OAuth 2.0 and OpenID Connect flows and identify common implementation mistakes that lead to vulnerabilities
- Assess the security posture of containerised applications and apply Docker security best practices
- Identify and explain the OWASP API Security Top 10 risks and describe mitigations for each

For deep explanations of each concept, see the [Mid Concept Reference](Security-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Zero Trust Architecture | [Microsoft Zero Trust Documentation](https://learn.microsoft.com/en-us/security/zero-trust/) | Docs |
| MITRE ATT&CK | [MITRE ATT&CK Framework](https://attack.mitre.org/) | Docs |
| Incident Response | [NIST Incident Response Recommendations (SP 800-61 Rev 3)](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | Docs |
| Supply Chain Security | [SLSA Framework – Supply-chain Levels for Software Artifacts](https://slsa.dev/) | Docs |
| LLM Security | [OWASP Top 10 for LLM Applications (2025)](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Docs |
| LLM Security | [Architecting Resilient LLM Agents](https://arxiv.org/abs/2509.08646) | Paper |
| Security Architecture | [NIST Cybersecurity Framework (CSF 2.0)](https://www.nist.gov/cyberframework) | Docs |
| AI Security Framework | [Google Secure AI Framework (SAIF)](https://safety.google/cybersecurity-advancements/saif/) | Docs |
| Enterprise GenAI Security | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal (Internal – requires company access) |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal (Internal – requires company access) |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| DORA | [EUR-Lex – Digital Operational Resilience Act](https://eur-lex.europa.eu/eli/reg/2022/2554/oj) | Reference |
| NIS2 Directive | [EUR-Lex – NIS 2 Directive](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) | Reference |
| Kubernetes Security | [OWASP Kubernetes Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Kubernetes_Security_Cheat_Sheet.html) | Docs |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Senior you should be able to:

- Design a Zero Trust architecture and explain how identity, device, network, and data controls work together to enforce least-privilege access
- Map real-world attack techniques to the MITRE ATT&CK framework and use it to identify detection gaps
- Lead an incident response process following the NIST SP 800-61r3 recommendations: preparation, detection and reporting, response coordination, and post-incident activities
- Evaluate and implement supply chain security controls using frameworks like SLSA to protect build and deployment pipelines
- Identify the OWASP Top 10 risks for LLM applications and design mitigations for prompt injection, data leakage, and insecure plugin execution
- Define a security governance programme that integrates threat modelling, security testing, and compliance into the SDLC
- Apply AI governance and policy requirements to projects involving GenAI components
- Explain the requirements of DORA, NIS2, and Finansinspektionen regulations and their implications for ICT risk management in insurance

For deep explanations of each concept, see the [Senior Concept Reference](Security-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
`,
  beginner: `# Security Engineer – Beginner Concept Reference


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

- SQL Injection: attacker supplies input like \`' OR 1=1 --\` that is concatenated into a SQL query, allowing data extraction or manipulation; prevented by parameterised queries
- Cross-Site Scripting (XSS): attacker injects JavaScript that executes in other users' browsers; Stored XSS persists in the database, Reflected XSS is in the URL; prevented by output encoding and Content Security Policy
- Cross-Site Request Forgery (CSRF): attacker tricks an authenticated user's browser into submitting a request (e.g., changing their email address); prevented by CSRF tokens and SameSite cookies
- The same-origin policy and how it restricts cross-origin interactions in the browser
- HTTPS and TLS: how encryption in transit prevents eavesdropping and tampering; why HTTP without TLS is inherently insecure
- Security headers: \`Content-Security-Policy\`, \`X-Content-Type-Options\`, \`Strict-Transport-Security\`, \`X-Frame-Options\`

**Common pitfalls:**

- Believing that input validation alone prevents injection; validation helps but is not sufficient — parameterised queries are the definitive fix for SQL injection.
- Confusing encoding, escaping, and sanitisation; each serves a different purpose and is appropriate in different contexts.
- Assuming HTTPS means the application is secure; HTTPS encrypts the transport but does nothing about application-level vulnerabilities.
- Testing only with a browser and missing vulnerabilities that require intercepting and modifying requests with a proxy tool like Burp Suite.

---

## Networking Fundamentals – TCP/IP, DNS and How Traffic Flows

Networking is the physical and logical infrastructure that connects systems. Every web request, API call, database connection, and file transfer depends on the network. For a Security Engineer, understanding how networks work is essential because most attacks either traverse the network or exploit network protocols.

The TCP/IP model is the foundation: the Network Interface layer handles physical connections, the Internet layer (IP) handles addressing and routing, the Transport layer (TCP/UDP) handles reliable delivery and port-based multiplexing, and the Application layer (HTTP, DNS, SSH) handles the protocols that applications use. DNS translates human-readable domain names into IP addresses. Firewalls filter traffic based on source, destination, port, and protocol.

The full 9-hour "Computer Networking Full Course" (available via YouTube) covers every concept that underpins modern network security. The depth of coverage — from physical layer signalling, through ARP and routing protocols, to TLS and application-layer protocols — builds the mental model you need for offensive and defensive security work. Even if you already understand the basics, the course is valuable for filling in gaps in your mental model of how packets traverse the internet.

**Why it matters:** A Security Engineer who does not understand networking cannot analyse traffic, configure firewalls, understand VPN topologies, investigate network-based attacks, or explain how a man-in-the-middle attack works. Networking is the infrastructure layer upon which all application security sits. When an attacker exploits a vulnerability, the attack almost always arrives over the network — and the first indicator of compromise is frequently an anomalous network pattern.

**Key things to understand:**

- The TCP/IP four-layer model and how data encapsulation works (application data → TCP segment → IP packet → Ethernet frame); understanding encapsulation is essential for reading packet captures
- TCP three-way handshake (SYN → SYN-ACK → ACK) and why it matters for understanding connection-based attacks such as SYN flooding and TCP session hijacking
- IP addressing: IPv4 addresses, subnets, CIDR notation (\`/24\`, \`/16\`), private vs public address ranges (RFC 1918: 10.x.x.x, 172.16-31.x.x, 192.168.x.x)
- DNS resolution: recursive and iterative queries, A records, CNAME records, MX records, and why DNS is a common attack vector (DNS spoofing/cache poisoning, DNS tunnelling for data exfiltration, DNS-based C2)
- Common ports and protocols: 80/443 (HTTP/HTTPS), 22 (SSH), 53 (DNS), 25/587 (SMTP), 3389 (RDP), 445 (SMB — a frequent attack target); knowing which ports should be open on a given server is prerequisite for firewall configuration
- Firewalls: packet filtering (stateless, based on headers only), stateful inspection (tracks connection state), and application-layer firewalls (inspect payload); the concept of explicit allow/deny rules with default-deny as the baseline
- TLS and how it secures application-layer protocols: TLS encrypts the TCP payload, protecting HTTP (making it HTTPS), SMTP (STARTTLS), and other protocols from eavesdropping and tampering
- Wireshark and tcpdump: essential tools for capturing and analysing network traffic; understanding what a normal packet capture looks like is prerequisite for identifying anomalous traffic

**Common pitfalls:**

- Assuming that being on a "private" network means traffic is secure; internal networks are frequently compromised and lateral movement is a standard attack technique.
- Confusing encryption in transit (TLS) with network segmentation; they solve different problems and both are needed.
- Not understanding NAT (Network Address Translation) and how it affects the ability to identify the true source of traffic in logs.
- Ignoring UDP: many attacks and C2 channels use UDP (DNS tunnelling, ICMP tunnelling) precisely because organisations focus their monitoring on TCP.

---

## Linux Security – Permissions, Users and Hardening

Linux is the operating system that runs the majority of servers, cloud infrastructure, and security tools. For a Security Engineer, Linux proficiency is non-negotiable — both for securing Linux systems and for using the offensive and defensive tools that run on Linux.

Linux security starts with the user and permission model. Every file and process has an owner and group, and permissions define who can read, write, or execute. The root user has unrestricted access, which makes it both powerful and dangerous. Beyond file permissions, Linux security involves managing services (disabling unnecessary ones), configuring firewalls (iptables, ufw), monitoring logs, and applying security updates.

**Why it matters:** Most security tools run on Linux (Burp Suite, Nmap, Wireshark, Metasploit, and countless others). Most servers that Security Engineers are asked to protect run Linux. And most attackers target Linux servers. Understanding Linux security is essential for both offence and defence.

**Key things to understand:**

- User management: creating users, managing groups, \`sudo\` and why root login should be disabled
- File permissions: the \`rwx\` model for user/group/other, \`chmod\`, \`chown\`, and understanding octal notation (e.g., 755, 644)
- The principle of least privilege applied to Linux: run services as non-root users, restrict file permissions to the minimum needed
- Firewall configuration: \`ufw\` or \`iptables\` for controlling inbound and outbound traffic
- SSH security: key-based authentication instead of passwords, disabling root login, changing the default port
- Log files: \`/var/log/auth.log\` for authentication events, \`/var/log/syslog\` for system events, and how to use \`journalctl\`

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

### Diffie-Hellman Key Exchange – How Two Parties Create a Shared Secret

One of the most important cryptographic primitives you will encounter is the Diffie-Hellman key exchange, first published in 1976. As explained in the Computerphile "Secret Key Exchange" video by Dr Mike Pound, it solves a fundamental problem: how can two parties who have never met agree on a shared secret key over a public channel, without an eavesdropper being able to determine that secret?

The insight is that Diffie-Hellman does not exchange a key — it creates one. Both parties agree on two public values: a generator \`g\` (typically a small prime number) and a large prime \`n\`. Each party then independently generates a private value (Alice's \`a\`, Bob's \`b\`) that they never share with anyone. Alice computes \`g^a mod n\` and sends it to Bob; Bob computes \`g^b mod n\` and sends it to Alice. Both can then combine the received value with their own private value to arrive at the same shared secret \`g^(ab) mod n\`. An attacker watching the public channel sees \`g\`, \`n\`, \`g^a mod n\`, and \`g^b mod n\` — but extracting \`a\` or \`b\` from these values requires solving the discrete logarithm problem, which is computationally infeasible for large enough values of \`n\` (2048 bits or 4096 bits in practice).

The colour-mixing analogy used in teaching Diffie-Hellman captures this well: combining two colours is easy, but separating a mixture back into its original components is extremely difficult. The mathematics provides the same one-way property. The phone you use right now almost certainly performs a Diffie-Hellman (or its elliptic curve variant, ECDH) key exchange every time it connects to a server — it is the mechanism that establishes the symmetric session key used by TLS for your HTTPS connections.

**Key things to understand:**

- Symmetric encryption (AES): fast, used for encrypting large amounts of data; the challenge is securely sharing the key — solved by Diffie-Hellman
- Asymmetric encryption (RSA, ECDSA): slower, used for key exchange and digital signatures; the public key is shared, the private key is secret
- Diffie-Hellman / ECDH: the key exchange algorithm that allows two parties to establish a shared symmetric key over a public channel; the foundation of the TLS handshake
- Hashing (SHA-256, bcrypt, Argon2): one-way, deterministic, fixed-size output; used for password storage and integrity verification
- The difference between encryption (reversible with the key) and hashing (one-way, not reversible)
- TLS handshake: asymmetric cryptography (or Diffie-Hellman) negotiates a symmetric session key, which is then used for the actual communication
- Certificate authorities and how HTTPS trust works: the browser trusts a CA, the CA signs the server's certificate, the browser verifies the signature

**Common pitfalls:**

- Using MD5 or SHA-1 for any security purpose; both have known collision vulnerabilities and should be considered broken for security use.
- Storing passwords with a fast hash (SHA-256) instead of a slow, salted password hash (bcrypt, Argon2); fast hashes can be brute-forced.
- Confusing encoding (Base64) with encryption; encoding is trivially reversible and provides zero security.
- Implementing custom cryptography instead of using well-tested libraries; cryptography is extraordinarily easy to get wrong and the consequences of getting it wrong are catastrophic.
- Using Diffie-Hellman with parameters that are too small; DH with \`n\` shorter than 2048 bits is vulnerable to the Logjam attack and should not be used.
`,
  mid: `# Security Engineer – Mid Concept Reference


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
- OpenID Connect: adds the \`id_token\` which contains the authenticated user's identity claims; this is what makes OIDC an authentication protocol
- JWT structure: header (algorithm), payload (claims: \`sub\`, \`iss\`, \`aud\`, \`exp\`, \`iat\`), signature; the payload is Base64-encoded, not encrypted — do not put secrets in it
- Token validation: verify the signature, check the issuer (\`iss\`), check the audience (\`aud\`), check the expiration (\`exp\`), check the algorithm
- The difference between access tokens (used to access protected resources, short-lived) and refresh tokens (used to obtain new access tokens without re-authentication, longer-lived)
- Common implementation mistakes: not validating tokens server-side, accepting tokens with \`alg: none\`, storing tokens in localStorage (XSS risk), not checking audience claims

**Common pitfalls:**

- Confusing OAuth 2.0 (authorisation) with authentication; using an access token to identify a user without an OIDC ID token is insecure.
- Not validating the \`aud\` (audience) claim, allowing tokens intended for a different service to be accepted.
- Setting token expiry too long; a compromised token should have a limited window of usefulness.
- Implementing custom token validation logic instead of using a well-tested library; subtle bugs in validation lead to authentication bypass.

---

## Container Security – Securing Docker and Container Environments

Containers share the host operating system kernel, which makes them lighter than virtual machines but also means that a container escape — an attacker breaking out of the container's isolation — gives them access to the host and potentially all other containers running on it. Container security involves securing the image (what goes into the container), the runtime (how the container is configured and executed), and the orchestration layer (how containers are managed at scale).

For a mid-level Security Engineer, the focus is on understanding the Docker-specific security risks and applying the hardening practices that prevent the most common container-based attacks.

**Why it matters:** Containers are the standard deployment unit for modern applications. An insecure container image, an over-privileged container runtime, or an exposed container API can compromise the entire application and infrastructure. Container security must be addressed at every stage: build, deploy, and run.

**Key things to understand:**

- Image security: use minimal base images (e.g., Alpine, distroless), scan images for known CVEs using tools like Trivy or Snyk, pin dependency versions
- Never run containers as root; use the \`USER\` instruction in the Dockerfile to specify a non-root user
- Read-only file systems: mount the container's filesystem as read-only where possible to prevent attackers from writing to disk
- Secrets management: never bake secrets into images; use environment variables, Docker secrets, or external secrets managers
- Resource limits: set CPU and memory limits to prevent a compromised container from consuming all host resources
- Network policies: restrict container-to-container communication to only what is necessary; default-deny network policies in Kubernetes

**Common pitfalls:**

- Using \`latest\` tags for base images, which makes builds non-reproducible and may pull in unverified changes.
- Running containers with \`--privileged\` flag, which disables most security features and gives the container nearly full host access.
- Not scanning images in CI/CD pipelines, allowing images with known critical vulnerabilities to be deployed to production.
- Exposing the Docker daemon API without authentication, which is equivalent to giving anyone root access to the host.

---

## API Security – OWASP API Security Top 10

APIs are the connective tissue of modern applications — they connect frontends to backends, services to services, and organisations to partners. Because APIs expose data and functionality directly, they are high-value targets for attackers. The OWASP API Security Top 10 identifies the most critical security risks specific to APIs.

API security differs from web application security because APIs are designed for machine-to-machine communication, often lack the browser-based protections (same-origin policy, CSRF tokens) that web applications benefit from, and expose structured data that is easier for attackers to enumerate and manipulate.

**Why it matters:** API breaches are among the most damaging security incidents because APIs often provide direct access to backend data and business logic. A single broken authorisation check on an API endpoint can expose millions of records. Understanding API-specific security risks and how to test for them is essential for any mid-level Security Engineer.

**Key things to understand:**

- **API1 – Broken Object Level Authorization (BOLA):** The most common API vulnerability; the API does not verify that the authenticated user has permission to access the specific object they are requesting (e.g., changing \`/api/users/42\` to \`/api/users/43\`)
- **API2 – Broken Authentication:** Weak authentication mechanisms, missing rate limiting, or flawed token management
- **API3 – Broken Object Property Level Authorization:** The API exposes properties that the user should not be able to read or write (mass assignment, excessive data exposure)
- **API4 – Unrestricted Resource Consumption:** No rate limiting, pagination, or size restrictions, allowing abuse and denial of service
- **API5 – Broken Function Level Authorization:** Regular users able to access admin endpoints
- Rate limiting, input validation, output filtering, and authentication enforcement must be applied at the API gateway and application level
- Test APIs using tools like Burp Suite, Postman (for functional testing), and purpose-built API security tools

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
- SCA (Software Composition Analysis): scans dependencies for known vulnerabilities (CVEs); examples include Snyk, Dependabot, and \`pip-audit\`
- False positives: both SAST and DAST produce findings that are not real vulnerabilities; triage and contextual analysis are essential to avoid alert fatigue
- Integration: run SAST on every pull request, run SCA on every build, run DAST against staging environments; fail builds only for high/critical findings to avoid blocking development
- Findings must be triaged, prioritised, and tracked to resolution; a tool that produces findings no one acts on provides no security value

**Common pitfalls:**

- Enabling SAST/DAST tools without triaging findings, resulting in thousands of unreviewed alerts that everyone ignores.
- Treating automated scan results as the definitive security assessment; these tools find patterns, not all vulnerabilities.
- Running DAST against production without approval; dynamic scanners can cause unintended side effects (data creation, service disruption).
- Not suppressing confirmed false positives, causing the same irrelevant findings to appear in every scan.
`,
  senior: `# Security Engineer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the Security Engineer learning path.

---

## Zero Trust Architecture – Identity as the New Perimeter

Zero Trust is a security model based on the principle "never trust, always verify." Traditional security architectures assume that everything inside the corporate network is trusted and everything outside is untrusted. Zero Trust eliminates this assumption: every request — regardless of where it originates — must be authenticated, authorised, and continuously validated before access is granted.

The shift to Zero Trust is driven by the reality that the traditional network perimeter has dissolved. Cloud services, remote work, mobile devices, and partner integrations mean that users and applications routinely access resources from outside the corporate network. Attackers who breach the perimeter (via phishing, compromised credentials, or supply chain attacks) can move laterally with minimal resistance in a traditional model. Zero Trust limits this lateral movement by requiring verification at every access point.

Microsoft's Zero Trust model is built on three principles: verify explicitly (always authenticate and authorise based on all available data points — identity, location, device health, service, data classification, anomalies), use least-privilege access (limit access with just-in-time and just-enough-access policies), and assume breach (minimise blast radius through segmentation and monitor for anomalous behaviour to detect breaches early).

**Why it matters:** Zero Trust is the security architecture that modern organisations are adopting. Understanding how to design and implement Zero Trust controls — identity verification, conditional access, micro-segmentation, continuous monitoring — is essential for any senior Security Engineer responsible for the security posture of an organisation.

**Key things to understand:**

- Identity is the control plane: use Azure Entra ID (Azure AD) Conditional Access to enforce policies based on user identity, device compliance, location, risk level, and application sensitivity
- Micro-segmentation: divide the network into small zones and enforce policies at each boundary; even if an attacker compromises one zone, they cannot move to others without re-authenticating
- Device trust: verify that the device accessing a resource is managed, compliant, and free of known vulnerabilities before granting access
- Least-privilege access: implement just-in-time (JIT) privileged access using Azure PIM (Privileged Identity Management); administrators must request elevated access for a limited time window
- Continuous monitoring: use SIEM (Security Information and Event Management) and UEBA (User and Entity Behaviour Analytics) to detect anomalous behaviour in real time
- Data-centric security: classify data by sensitivity and apply protection controls (encryption, DLP, access policies) based on classification rather than network location

**Common pitfalls:**

- Treating Zero Trust as a product to buy rather than an architecture to implement; no single vendor provides "Zero Trust in a box."
- Implementing Zero Trust for external access but not for internal service-to-service communication; internal traffic must also be authenticated and authorised.
- Making Zero Trust so restrictive that legitimate users cannot do their work, causing them to find workarounds that bypass security controls.
- Not investing in identity infrastructure (MFA, conditional access, device management) before implementing network-level Zero Trust controls.

---

## MITRE ATT&CK – Understanding Adversary Behaviour

MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations. It documents how attackers operate — from initial access through execution, persistence, privilege escalation, defence evasion, credential access, discovery, lateral movement, collection, command and control, exfiltration, and impact.

ATT&CK provides a common language for describing adversary behaviour. Each technique has a unique identifier (e.g., T1059 – Command and Scripting Interpreter), a description of how it works, examples of real-world use, and documented mitigations and detections. Security teams use ATT&CK to evaluate their detection coverage, design threat-informed defences, and communicate about threats in a precise, unambiguous way.

**Why it matters:** ATT&CK transforms security from a reactive discipline ("we detected an alert") to a proactive one ("we have detection coverage for 80% of the techniques used by our most relevant threat actors, and here are the gaps we need to close"). For a senior Security Engineer, ATT&CK is the framework for evaluating and improving an organisation's detection and response capabilities.

**Key things to understand:**

- Tactics (the "why"): the adversary's objective at each stage (e.g., Initial Access, Persistence, Lateral Movement)
- Techniques (the "how"): the specific methods used to achieve each tactic (e.g., Phishing for Initial Access, Pass-the-Hash for Lateral Movement)
- Sub-techniques: more granular descriptions of how a technique is implemented (e.g., T1566.001 – Spearphishing Attachment is a sub-technique of T1566 – Phishing)
- ATT&CK Navigator: a tool for visualising coverage — colour-code techniques by detection status to identify gaps
- Threat-informed defence: prioritise detection engineering based on the techniques used by the threat actors most relevant to your organisation and industry
- Purple teaming: collaborative exercises where red team (offensive) and blue team (defensive) work together, using ATT&CK techniques to test and improve detection capabilities

**Common pitfalls:**

- Trying to achieve coverage of every technique simultaneously; prioritise based on threat intelligence relevant to your organisation and industry.
- Mapping detections to ATT&CK techniques without testing them; a detection rule that triggers on the right log event but has never been validated against a real technique execution provides false confidence.
- Treating ATT&CK as a compliance checklist rather than a living tool for continuous improvement.
- Ignoring sub-techniques and mapping everything to top-level techniques, losing the granularity that makes ATT&CK useful.

---

## Incident Response – Detection, Containment and Recovery

Incident response (IR) is the structured process for detecting, investigating, containing, eradicating, and recovering from security incidents. The NIST Incident Response Recommendations (SP 800-61 Rev 3) provides updated guidance on incident response, restructured from the previous revision's four-phase lifecycle into a recommendations-based format covering preparation, detection, response coordination, and post-incident activities.

A security incident is any event that compromises the confidentiality, integrity, or availability of information or systems. This includes malware infections, unauthorised access, data breaches, denial-of-service attacks, and insider threats. The IR process ensures that incidents are handled consistently, damage is minimised, evidence is preserved, and lessons are learned to prevent recurrence.

**Why it matters:** Every organisation will experience security incidents. The difference between a minor disruption and a catastrophic breach often comes down to how quickly and effectively the incident is detected and contained. A senior Security Engineer must be able to lead incident response, coordinate across teams, and make time-critical decisions under pressure.

**Key things to understand:**

- Preparation: incident response plan, contact lists, communication templates, forensic toolkits, log collection and retention policies, tabletop exercises
- Detection and Analysis: monitoring (SIEM, EDR, network analysis), alert triage (true positive vs false positive), severity classification, initial scoping (what systems are affected?)
- Containment: short-term (isolate affected systems to stop the spread) and long-term (apply patches, disable compromised accounts, block malicious IPs) containment strategies
- Eradication: remove the root cause (malware, backdoors, compromised credentials); verify that all instances are removed, not just the ones found initially
- Recovery: restore systems from clean backups, validate integrity, monitor for signs of re-compromise during and after restoration
- Post-incident activity: root cause analysis, lessons learned, process improvements, stakeholder communication, regulatory notification (if required)

**Common pitfalls:**

- Not having an incident response plan before an incident occurs; creating a plan during a crisis is too late.
- Focusing on containment without preserving evidence for forensic analysis; volatile evidence (memory, network connections) must be captured before it is lost.
- Declaring an incident resolved without thorough eradication; attackers frequently maintain multiple persistence mechanisms.
- Not conducting post-incident reviews; without lessons learned, the same type of incident will happen again.

---

## Supply Chain Security – Protecting the Build and Deployment Pipeline

Software supply chain security addresses the risks introduced by the components, tools, and processes used to build and deploy software. Supply chain attacks target the weakest link in the chain: compromising a widely-used library, a build tool, or a CI/CD pipeline to inject malicious code into the final product. High-profile incidents like SolarWinds (compromised build pipeline) and Log4Shell (vulnerable dependency) have demonstrated the devastating impact of supply chain attacks.

SLSA (Supply-chain Levels for Software Artifacts, pronounced "salsa") is a framework for ensuring the integrity of software artifacts throughout the supply chain. SLSA v1.0 organises requirements into tracks: the Build track (levels L0–L3) focuses on build integrity and provenance, while the Source track addresses source code integrity. Each level adds stronger guarantees about the build process.

**Why it matters:** Modern software is built from hundreds of open-source dependencies, compiled by CI/CD systems, and deployed by automated pipelines. Each of these components is a potential attack vector. A senior Security Engineer must understand supply chain risks and implement controls to detect and prevent supply chain compromises.

**Key things to understand:**

- Software Bill of Materials (SBOM): a machine-readable inventory of all components in a software product; essential for vulnerability tracking and incident response
- Dependency management: pin dependency versions, use lock files, verify checksums, scan for known vulnerabilities (Dependabot, Snyk, pip-audit)
- Build integrity: ensure that the build process is reproducible and that the build output matches the source code; use signed commits and signed build artifacts
- SLSA v1.0 Build track: L0 (no guarantees), L1 (provenance exists — the build process produces attestations documenting how the artifact was built), L2 (hosted build service — the build runs on a hosted platform that generates authenticated provenance), L3 (hardened build platform — the build platform provides strong isolation and tamper protection). The Source track (under development) will address source code integrity requirements
- Container image security: scan images for vulnerabilities, sign images with cosign/Notary, use trusted base images, verify image provenance before deployment
- CI/CD pipeline security: restrict who can modify pipelines, use separate build and deployment credentials, audit pipeline changes, prevent secret leakage in build logs

**Common pitfalls:**

- Trusting all open-source dependencies without verification; popularity is not a security guarantee.
- Not monitoring for new CVEs in existing dependencies; a library that was safe when you adopted it may have a critical vulnerability discovered later.
- Securing the application code but not the pipeline that builds and deploys it; a compromised pipeline can inject arbitrary code.
- Generating SBOMs without using them for vulnerability tracking and incident response; an SBOM that is not maintained is a compliance artifact, not a security tool.

---

## LLM Security – OWASP Top 10 for Large Language Model Applications

The OWASP Top 10 for LLM Applications identifies the most critical security risks specific to applications that incorporate large language models. As organisations integrate LLMs into their products and internal tools, a new class of vulnerabilities has emerged that traditional application security testing does not cover.

LLM applications introduce unique risks because they process natural language input that can be crafted to manipulate the model's behaviour (prompt injection), they may have access to sensitive data through retrieval systems (data leakage), and they may be connected to external tools and APIs that can be triggered by model output (insecure plugin/tool execution).

**Why it matters:** LLM adoption is accelerating across every industry. Security Engineers must understand the LLM-specific attack surface to evaluate, secure, and monitor these applications. The OWASP LLM Top 10 provides a structured framework for this, analogous to the traditional OWASP Top 10 for web applications.

**Key things to understand:**

- **Prompt Injection:** The most critical LLM risk; attacker-crafted input causes the model to ignore its system instructions and perform unintended actions. Direct injection (user sends malicious prompt) and indirect injection (malicious content in retrieved documents)
- **Insecure Output Handling:** LLM output is used unsafely — passed to a shell command, rendered as HTML, or used in a SQL query without sanitisation
- **Sensitive Information Disclosure:** The LLM reveals confidential data from its training data, system prompt, or retrieved documents
- **Excessive Agency:** The LLM is given access to tools, APIs, or data that it should not be able to invoke; combined with prompt injection, this creates high-impact attack chains
- **Model Denial of Service:** Crafted inputs that cause the model to consume excessive resources or produce extremely long outputs
- Defence layers: input validation, output filtering, privilege separation (limit what tools the LLM can invoke), human-in-the-loop for high-risk actions, monitoring for anomalous LLM behaviour

**Common pitfalls:**

- Treating LLM output as trusted data; LLM output should be treated with the same suspicion as user input — always validate and sanitise before using it in downstream operations.
- Relying solely on system prompts for security ("you must never reveal the system prompt"); prompt injection can override system instructions.
- Giving LLMs direct access to production databases, file systems, or APIs without mediation and access controls.
- Not monitoring LLM interactions; without logging and analysis of prompts and responses, attacks and data leakage go undetected.

---

## Security Governance – Building a Security Programme

Security governance is the framework of policies, standards, processes, and organisational structures that ensures security is managed as a strategic business function rather than an ad hoc technical activity. For a senior Security Engineer, governance means defining what "good" looks like, ensuring compliance, measuring progress, and continuously improving the organisation's security posture.

A security programme typically includes: a security policy (the top-level document that defines the organisation's security principles and commitments), standards (specific technical requirements derived from the policy), procedures (step-by-step instructions for implementing standards), guidelines (recommended best practices), and metrics (measurements that track the programme's effectiveness).

**Why it matters:** Technical security controls are necessary but not sufficient. Without governance, security efforts are fragmented, inconsistent, and unmeasured. A senior Security Engineer must be able to design and operate a security programme that aligns security investment with business risk, ensures compliance with regulatory requirements, and demonstrates value to leadership.

**Key things to understand:**

- Risk management frameworks: NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover), ISO 27001 (information security management system), CIS Controls (prioritised set of security actions)
- Security metrics: vulnerability remediation time, mean time to detect (MTTD), mean time to respond (MTTR), patching compliance, security training completion, phishing simulation click rates
- Compliance vs security: compliance (meeting regulatory requirements) is a subset of security (protecting the organisation); being compliant does not guarantee being secure
- Security awareness training: the most technically secure system is still vulnerable to social engineering; training must be ongoing, relevant, and measured
- Third-party risk management: assessing and monitoring the security posture of vendors, partners, and SaaS providers that have access to your data or systems
- AI governance requirements for GenAI projects: the organisation's Secure AI Framework (see the Prerequisites guide) defines technical security controls, while the AI Policy provides the governance layer including risk classification, the AI Register, and compliance requirements under the EU AI Act

**Common pitfalls:**

- Writing policies that no one reads or follows; policies must be practical, specific, and enforced through technical controls where possible.
- Measuring security by the number of tools deployed rather than by outcomes (reduction in risk, faster detection, fewer incidents).
- Treating governance as a one-time project rather than an ongoing programme; the threat landscape, technology stack, and regulatory environment change continuously.
- Separating security governance from engineering; governance that is disconnected from how software is actually built and operated produces compliance theater, not security.

---

## Regulatory Landscape — DORA, NIS2 and Finansinspektionen

The regulatory landscape for ICT security in European financial services has undergone a significant transformation. Three overlapping regulatory frameworks now define the security obligations for insurance companies operating in Sweden and the EU: DORA (Digital Operational Resilience Act), NIS2 (Network and Information Security Directive), and Finansinspektionen's (FI) national regulations.

DORA is an EU regulation that became applicable in January 2025. It establishes uniform requirements for the security of ICT systems used by financial entities, including insurance companies. Unlike previous regulations that addressed ICT risk as a subset of operational risk, DORA treats digital operational resilience as a distinct regulatory domain with specific, detailed requirements.

NIS2 is the updated EU directive on network and information security, expanding the scope of the original NIS directive to cover more sectors and imposing stricter requirements. Financial services, including insurance, are classified as "essential entities" under NIS2, subject to the highest tier of obligations. EU member states were required to transpose NIS2 into national law by October 2024.

Finansinspektionen (FI) is Sweden's financial supervisory authority. FI's regulations (FFFS) and general guidelines set national requirements for IT governance, outsourcing, and operational risk management in financial institutions. FFFS 2014:5 (governance, risk management and control) is the primary regulation covering IT risk for Swedish insurance companies.

**Why it matters:** Security engineers in insurance must understand the regulatory framework because it defines the minimum acceptable security posture. Non-compliance carries significant consequences: DORA penalties can reach 1% of average daily worldwide turnover (applied daily until compliance is achieved), NIS2 penalties up to 10 million EUR or 2% of global turnover, and FI can impose sanctions including operational restrictions. More importantly, these regulations codify genuine security best practices that protect the organisation and its customers.

**Key things to understand:**

- DORA ICT risk management framework: requires financial entities to establish a comprehensive ICT risk management framework covering identification, protection, detection, response, and recovery. This must be documented, regularly reviewed, and approved by the management body
- DORA incident reporting: significant ICT-related incidents must be reported to the competent authority (FI in Sweden) using standardised templates and within defined timelines (initial notification within 4 hours of classification, intermediate report within 72 hours, final report within one month)
- DORA third-party risk: financial entities must manage ICT third-party risk, including maintaining a register of all ICT third-party service providers, conducting due diligence before engagement, including contractual exit strategies, and monitoring providers continuously. Critical ICT third-party providers are subject to direct oversight by EU supervisory authorities
- DORA digital operational resilience testing: requires regular testing of ICT systems including vulnerability assessments, network security testing, and — for significant entities — advanced threat-led penetration testing (TLPT) at least every three years
- NIS2 obligations for essential entities: risk management measures (risk analysis, incident handling, business continuity, supply chain security, security in acquisition and development, vulnerability handling), incident reporting within 24 hours (early warning) and 72 hours (full notification), management body accountability (senior management must approve and oversee cybersecurity risk management)
- FFFS 2014:5 (FI): requires financial institutions to have documented IT strategy, IT risk management processes, and incident management procedures. Outsourcing arrangements must maintain the same level of control as internal operations. FI conducts regular supervisory reviews and can require corrective actions
- Overlap and alignment: DORA, NIS2, and FI regulations overlap significantly. DORA takes precedence for financial entities on ICT-specific matters (lex specialis). A well-designed security programme that satisfies DORA will largely satisfy NIS2 and FI requirements, but gaps must be explicitly assessed

**Common pitfalls:**

- Treating DORA as a compliance checkbox rather than an opportunity to genuinely improve digital operational resilience — the regulation's requirements are substantive and reflect real security needs
- Not maintaining the ICT third-party register — DORA requires a complete, up-to-date register of all ICT service providers with details of the services provided, criticality assessments, and contractual arrangements
- Underestimating the incident reporting timelines — 4 hours for initial classification and notification is very tight and requires pre-established processes, templates, and communication channels
- Assuming that existing FI compliance automatically satisfies DORA — while there is significant overlap, DORA introduces new requirements (particularly around testing and third-party risk) that go beyond existing FI regulations
- Not involving senior management — both DORA and NIS2 explicitly require management body accountability for ICT risk management, including personal liability provisions

---

## AI Policy — Organisational Principles

The organisation's AI Policy establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from security engineers evaluating AI system risks to analysts using AI-assisted security tools.

**Why it matters:** The AI Policy is directly relevant to security engineering in two ways. First, security engineers must understand the policy to evaluate whether AI systems comply with it — the policy defines the security, privacy, and governance requirements that AI systems must meet. Second, security tools and workflows increasingly incorporate AI, and those uses must themselves comply with the policy.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- Security engineers should verify that AI systems implement the policy's requirements for data classification, access control, logging, and transparency as part of security reviews.
- The policy's requirements complement (and reference) the Secure AI Framework — the SAIF provides the technical security controls while the policy provides the governance framework.

**Common pitfalls:**
- Reviewing AI systems only against the Secure AI Framework without also verifying compliance with the AI Policy's broader governance requirements.
- Assuming that AI-powered security tools (SIEM analytics, threat detection) are exempt from the policy; any AI use must comply.
- Not including AI Policy compliance in the security review checklist for AI-powered applications.

---

## AI-Powered Development for Security Engineers

AI-assisted development tools are becoming relevant to security engineering workflows. These tools can help write detection rules, generate SIEM queries (KQL, SPL), draft incident response playbooks, explain complex log patterns, and assist with security documentation — tasks where AI can accelerate routine work while the security engineer provides the judgment and domain expertise.

AI assistants are most effective for security tasks when given precise context: the log format, the detection objective, the SIEM platform syntax, and the threat model being addressed. They can also help explain unfamiliar attack techniques, translate between query languages, and generate documentation for security controls.

**Why it matters:** Senior security engineers who use AI tools effectively can accelerate security operations — particularly for writing detection rules, analysing log patterns, and creating documentation. Understanding the limitations is critical: AI-generated detection rules may have gaps that miss real attacks, and AI-generated security assessments may overlook risks that require domain-specific knowledge.

**Key things to understand:**
- AI-generated detection rules and SIEM queries must be validated against real attack data before deployment. A rule that looks correct may miss edge cases or produce excessive false positives.
- AI tools are effective for: generating KQL/SPL queries, drafting detection rules from ATT&CK technique descriptions, explaining log entries, translating between security tool formats, and creating documentation.
- AI tools are poorly suited for: threat modelling (which requires understanding your specific environment and adversaries), evaluating the completeness of security controls, and making risk decisions that require business context.
- Data privacy and operational security apply to AI tool use: never paste sensitive log data, credentials, or internal network details into external AI tools. Follow the organisation's AI Policy for approved tools.

**Common pitfalls:**
- Trusting AI-generated detection rules without testing them against known attack samples and benign traffic.
- Using AI to generate security assessments without applying independent expert judgment — the AI may miss context-specific risks.
- Not establishing team conventions around what security data can and cannot be shared with AI tools.

---

## Language Deep Dives

- [Python Deep Dive](/language/python) — Security tooling, automation, and scripting
- [JavaScript Deep Dive](/language/javascript) — Understanding web vulnerabilities and XSS
- [SQL Deep Dive](/language/sql) — SQL injection testing and database security
`,
}
