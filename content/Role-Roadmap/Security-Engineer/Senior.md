# Security Engineer – Senior Concept Reference


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

**Code walkthrough:**

```python
# Step 1: Zero Trust — mTLS (mutual TLS) for service-to-service authentication
# Why: in Zero Trust, even internal services must prove their identity;
#      mTLS ensures BOTH client and server present valid certificates
import ssl
import httpx

def create_mtls_client(
    client_cert: str,
    client_key: str,
    ca_bundle: str,
) -> httpx.AsyncClient:
    """Create an HTTP client that presents a client certificate."""
    # Step 2: The server verifies the client cert; the client verifies the server cert
    # Why: this prevents impersonation in both directions
    ssl_context = ssl.create_default_context(cafile=ca_bundle)
    ssl_context.load_cert_chain(certfile=client_cert, keyfile=client_key)
    return httpx.AsyncClient(verify=ssl_context)

# Step 3: Conditional Access policy enforcement (pseudo-code for Azure)
# Why: Zero Trust requires evaluating multiple signals before granting access
def evaluate_access_request(request_context: dict) -> dict:
    """Evaluate a request against Zero Trust policy signals."""
    signals = {
        "identity_verified": request_context.get("mfa_completed", False),
        "device_compliant": request_context.get("device_managed", False),
        "location_trusted": request_context.get("ip") in TRUSTED_IP_RANGES,
        "risk_level": request_context.get("risk_score", "high"),
    }
    # Step 4: All signals must pass — any failure blocks access
    # Why: "verify explicitly" means checking every available signal
    if not signals["identity_verified"]:
        return {"allow": False, "reason": "MFA required"}
    if not signals["device_compliant"]:
        return {"allow": False, "reason": "Non-compliant device"}
    if signals["risk_level"] == "high":
        return {"allow": False, "reason": "High-risk session detected"}
    return {"allow": True, "access_level": "standard"}

TRUSTED_IP_RANGES = {"10.0.0.0/8", "172.16.0.0/12"}
```

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

**Code walkthrough:**

```python
# Step 1: SIEM integration — send structured security events to Azure Sentinel
# Why: centralised logging enables correlation, alerting, and investigation
import json
import httpx
from datetime import datetime, timezone

class SIEMClient:
    """Send security events to Azure Log Analytics (Sentinel backend)."""
    def __init__(self, workspace_id: str, shared_key: str):
        self.url = f"https://{workspace_id}.ods.opinsights.azure.com/api/logs"
        self.shared_key = shared_key

    async def send_event(self, log_type: str, event: dict):
        """Post a security event to the SIEM for correlation and alerting."""
        # Why: structured events with consistent fields enable KQL queries
        event["TimeGenerated"] = datetime.now(timezone.utc).isoformat()
        headers = {
            "Content-Type": "application/json",
            "Log-Type": log_type,
            # Authorization header computed from shared_key (simplified)
        }
        async with httpx.AsyncClient() as client:
            await client.post(self.url, json=[event], headers=headers)

# Step 2: Security monitoring alert — detect brute-force login attempts
# Why: automated detection catches attacks faster than manual log review
class BruteForceDetector:
    def __init__(self, threshold: int = 10, window_seconds: int = 300):
        self.threshold = threshold
        self.window = window_seconds
        self.attempts: dict[str, list[float]] = {}

    async def record_failed_login(self, username: str, source_ip: str, siem: SIEMClient):
        from time import time
        now = time()
        key = f"{username}:{source_ip}"
        self.attempts.setdefault(key, [])
        self.attempts[key] = [t for t in self.attempts[key] if now - t < self.window]
        self.attempts[key].append(now)

        if len(self.attempts[key]) >= self.threshold:
            # Step 3: Trigger alert — this appears in the SIEM dashboard
            await siem.send_event("SecurityAlert", {
                "AlertType": "BruteForceDetected",
                "Username": username,
                "SourceIP": source_ip,
                "FailedAttempts": len(self.attempts[key]),
                "Severity": "High",
                # Why: include ATT&CK mapping for threat-informed response
                "MitreAttackTechnique": "T1110 — Brute Force",
            })
```

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

**Code walkthrough:**

```python
# Step 1: Incident response automation — auto-contain compromised accounts
# Why: manual containment takes minutes-to-hours; automation takes seconds
import httpx
from datetime import datetime, timezone
from dataclasses import dataclass

@dataclass
class SecurityIncident:
    incident_id: str
    severity: str
    affected_user: str
    description: str
    detected_at: str

class IncidentResponder:
    """Automated playbook for common incident types."""

    async def handle_compromised_account(self, incident: SecurityIncident):
        """Auto-containment: disable account, revoke sessions, notify team."""

        # Step 2: Disable the compromised account immediately
        # Why: every second the account stays active, the attacker can do damage
        await self.disable_user(incident.affected_user)

        # Step 3: Revoke all active sessions and tokens
        # Why: the attacker may have valid tokens that survive a password reset
        await self.revoke_all_sessions(incident.affected_user)

        # Step 4: Block the source IP at the WAF level
        await self.block_ip_at_waf(incident)

        # Step 5: Create a ticket and notify the security team
        await self.notify_security_team(incident)

        # Step 6: Preserve evidence for forensic analysis
        # Why: volatile evidence (active sessions, memory) disappears quickly
        await self.capture_forensic_snapshot(incident)

    async def disable_user(self, user_id: str):
        print(f"[CONTAIN] Disabled user account: {user_id}")

    async def revoke_all_sessions(self, user_id: str):
        print(f"[CONTAIN] Revoked all sessions for: {user_id}")

    async def block_ip_at_waf(self, incident: SecurityIncident):
        print(f"[CONTAIN] WAF rule created for incident {incident.incident_id}")

    async def notify_security_team(self, incident: SecurityIncident):
        print(f"[NOTIFY] Incident {incident.incident_id}: {incident.description}")

    async def capture_forensic_snapshot(self, incident: SecurityIncident):
        # Why: log the incident timeline before evidence is lost
        print(f"[FORENSICS] Snapshot captured for {incident.incident_id}")
```

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

**Code walkthrough:**

```python
# Step 1: Secret management with HashiCorp Vault
# Why: secrets (passwords, keys, certificates) must be centrally managed,
#      rotated, and audited — never stored in code, config files, or env vars
import hvac  # HashiCorp Vault Python client

def get_vault_client() -> hvac.Client:
    """Connect to Vault using AppRole authentication."""
    client = hvac.Client(url="https://vault.internal:8200")
    # Why: AppRole gives each service a unique identity in Vault
    client.auth.approle.login(
        role_id="my-service-role-id",
        secret_id="my-service-secret-id",  # rotated automatically
    )
    return client

def get_database_credentials() -> dict:
    """Fetch dynamic database credentials from Vault."""
    client = get_vault_client()
    # Step 2: Dynamic secrets — Vault creates a unique DB user per request
    # Why: if credentials leak, they expire automatically (short TTL)
    creds = client.secrets.database.generate_credentials(name="orders-db")
    return {
        "username": creds["data"]["username"],
        "password": creds["data"]["password"],
        "ttl": creds["lease_duration"],  # auto-expires after TTL
    }

# Step 3: Penetration testing script — automated BOLA check
# Why: BOLA is the #1 API vulnerability; automated tests ensure it stays fixed
import httpx

async def test_bola_vulnerability(base_url: str, tokens: dict[str, str]):
    """Test that user A cannot access user B's resources."""
    async with httpx.AsyncClient() as client:
        # User A requests their own order — should succeed
        resp = await client.get(
            f"{base_url}/api/orders/1",
            headers={"Authorization": f"Bearer {tokens['user_a']}"},
        )
        assert resp.status_code == 200, "User A should access own order"

        # User A requests user B's order — should be forbidden
        resp = await client.get(
            f"{base_url}/api/orders/2",  # belongs to user B
            headers={"Authorization": f"Bearer {tokens['user_a']}"},
        )
        assert resp.status_code == 403, f"BOLA DETECTED: got {resp.status_code}"
        print("[PASS] BOLA test passed — object-level auth enforced")
```

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

**Code walkthrough:**

```python
# Step 1: WAF-style input validation for LLM applications
# Why: prompt injection is the #1 LLM risk — malicious input can override
#      system instructions and trigger unintended actions
import re
from dataclasses import dataclass

@dataclass
class ValidationResult:
    safe: bool
    reason: str = ""

class LLMInputValidator:
    """Defence layer: filter known prompt injection patterns."""

    SUSPICIOUS_PATTERNS = [
        r"ignore\s+(previous|above|all)\s+instructions",
        r"you\s+are\s+now\s+",
        r"system\s*:\s*",
        r"<\|im_start\|>",
        r"do\s+not\s+follow\s+your\s+(rules|guidelines)",
    ]

    def validate(self, user_input: str) -> ValidationResult:
        # Step 2: Check for known injection patterns
        for pattern in self.SUSPICIOUS_PATTERNS:
            if re.search(pattern, user_input, re.IGNORECASE):
                return ValidationResult(
                    safe=False,
                    reason=f"Blocked: matches injection pattern '{pattern}'",
                )
        # Step 3: Enforce length limits to prevent resource exhaustion
        if len(user_input) > 10_000:
            return ValidationResult(safe=False, reason="Input too long")
        return ValidationResult(safe=True)

# Step 4: Output filtering — never trust LLM output
# Why: LLM output should be treated like user input for downstream operations
class LLMOutputSanitiser:
    def sanitise_for_html(self, output: str) -> str:
        """Prevent XSS if LLM output is rendered in a browser."""
        import html
        return html.escape(output)

    def sanitise_for_sql(self, output: str) -> str:
        """Never concatenate LLM output into SQL — use parameterised queries."""
        # Why: an LLM could generate output containing SQL injection payloads
        raise NotImplementedError("Use parameterised queries instead")

# Step 5: Privilege separation — limit what tools the LLM can invoke
ALLOWED_TOOLS = {"search_knowledge_base", "get_current_time"}
def execute_tool(tool_name: str, params: dict) -> dict:
    if tool_name not in ALLOWED_TOOLS:
        return {"error": f"Tool '{tool_name}' is not permitted"}
    # Only safe, read-only tools are available to the LLM
    return {"result": f"Executed {tool_name}"}
```

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
- The organisation's AI Policy, AI Checklist, and Secure AI Framework define governance requirements for GenAI projects specifically

**Code walkthrough:**

```python
# Step 1: Compliance-as-code — enforce security policies programmatically
# Why: policies that exist only in documents drift from reality;
#      code-enforced policies are always checked and always current
from dataclasses import dataclass

@dataclass
class ComplianceCheck:
    rule_id: str
    description: str
    passed: bool
    evidence: str

def check_encryption_at_rest(storage_config: dict) -> ComplianceCheck:
    """Verify that storage accounts have encryption enabled (DORA/NIS2)."""
    encrypted = storage_config.get("encryption_enabled", False)
    return ComplianceCheck(
        rule_id="DORA-ICT-03",
        description="Data at rest must be encrypted with AES-256",
        passed=encrypted,
        evidence=f"encryption_enabled={encrypted}",
    )

def check_mfa_enforced(identity_config: dict) -> ComplianceCheck:
    """Verify MFA is required for all privileged accounts."""
    mfa = identity_config.get("mfa_required", False)
    return ComplianceCheck(
        rule_id="NIS2-AUTH-01",
        description="MFA must be enforced for privileged access",
        passed=mfa,
        evidence=f"mfa_required={mfa}",
    )

# Step 2: Run all compliance checks and generate a report
def run_compliance_audit(configs: dict) -> list[ComplianceCheck]:
    checks = [
        check_encryption_at_rest(configs.get("storage", {})),
        check_mfa_enforced(configs.get("identity", {})),
    ]
    for check in checks:
        status = "PASS" if check.passed else "FAIL"
        print(f"[{status}] {check.rule_id}: {check.description}")
    # Step 3: Failed checks trigger remediation workflows
    # Why: automated remediation closes the gap between detection and fix
    failures = [c for c in checks if not c.passed]
    if failures:
        print(f"\n{len(failures)} compliance failures require remediation")
    return checks

run_compliance_audit({
    "storage": {"encryption_enabled": True},
    "identity": {"mfa_required": False},
})
```

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

**Code walkthrough:**

```python
# Step 1: DORA incident reporting automation
# Why: DORA requires initial notification within 4 hours of classification —
#      this is too tight for manual processes; automation is essential
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
from enum import Enum

class DORASeverity(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class DORAIncidentReport:
    incident_id: str
    classification_time: datetime
    severity: DORASeverity
    affected_services: list[str]
    description: str
    initial_impact: str

    @property
    def initial_notification_deadline(self) -> datetime:
        """DORA: 4 hours from classification for initial notification."""
        return self.classification_time + timedelta(hours=4)

    @property
    def intermediate_report_deadline(self) -> datetime:
        """DORA: 72 hours from classification for intermediate report."""
        return self.classification_time + timedelta(hours=72)

    def is_overdue(self) -> bool:
        return datetime.now(timezone.utc) > self.initial_notification_deadline

# Step 2: ICT third-party register — DORA requires a complete register
# Why: DORA mandates tracking all ICT service providers with criticality
@dataclass
class ICTThirdParty:
    provider_name: str
    services_provided: list[str]
    criticality: str  # "critical", "important", "standard"
    contract_end_date: str
    exit_strategy_documented: bool
    last_due_diligence: str

def validate_third_party_register(providers: list[ICTThirdParty]) -> list[str]:
    """Check the register for DORA compliance gaps."""
    issues = []
    for p in providers:
        if p.criticality == "critical" and not p.exit_strategy_documented:
            issues.append(f"{p.provider_name}: critical provider missing exit strategy")
    return issues
```

**Common pitfalls:**

- Treating DORA as a compliance checkbox rather than an opportunity to genuinely improve digital operational resilience — the regulation's requirements are substantive and reflect real security needs
- Not maintaining the ICT third-party register — DORA requires a complete, up-to-date register of all ICT service providers with details of the services provided, criticality assessments, and contractual arrangements
- Underestimating the incident reporting timelines — 4 hours for initial classification and notification is very tight and requires pre-established processes, templates, and communication channels
- Assuming that existing FI compliance automatically satisfies DORA — while there is significant overlap, DORA introduces new requirements (particularly around testing and third-party risk) that go beyond existing FI regulations
- Not involving senior management — both DORA and NIS2 explicitly require management body accountability for ICT risk management, including personal liability provisions

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

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

**Code walkthrough:**

```python
# Step 1: AI system security review checklist — automated policy compliance
# Why: security engineers must verify AI systems meet both the AI Policy
#      and the Secure AI Framework requirements
from dataclasses import dataclass

@dataclass
class AISecurityReview:
    use_case_id: str
    system_name: str
    risk_classification: str

    def run_policy_checks(self) -> list[dict]:
        """Verify AI Policy compliance during security review."""
        checks = [
            {
                "check": "AI Register entry exists",
                "requirement": "AI Policy — mandatory registration",
                "status": self._check_register_entry(),
            },
            {
                "check": "Data classification applied to all inputs/outputs",
                "requirement": "AI Policy — data protection",
                "status": self._check_data_classification(),
            },
            {
                "check": "User transparency implemented",
                "requirement": "AI Policy — users must know when AI is used",
                "status": self._check_transparency(),
            },
            {
                "check": "AI interaction logging enabled",
                "requirement": "AI Policy + SAIF — auditability",
                "status": self._check_logging(),
            },
            {
                "check": "Human oversight for high-risk decisions",
                "requirement": "AI Policy — high-risk AI requires human review",
                "status": "REQUIRED" if self.risk_classification == "high" else "N/A",
            },
        ]
        return checks

    def _check_register_entry(self) -> str:
        return "PASS" if self.use_case_id else "FAIL"

    def _check_data_classification(self) -> str:
        return "PASS"  # In production, verify Purview labels exist

    def _check_transparency(self) -> str:
        return "PASS"  # Verify API responses include AI disclosure

    def _check_logging(self) -> str:
        return "PASS"  # Verify audit logs capture AI interactions

review = AISecurityReview("UC-2025-042", "Claims AI Assistant", "high")
for check in review.run_policy_checks():
    print(f"  [{check['status']}] {check['check']}")
```

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

**Code walkthrough:**

```python
# Step 1: AI-assisted KQL detection rule generation
# Why: AI can generate first-draft detection rules from ATT&CK descriptions,
#      but they MUST be tested against real attack data before deployment

# Example prompt to an AI assistant:
# "Write a KQL query for Azure Sentinel that detects T1110 (Brute Force)
#  by alerting when a single IP has more than 20 failed sign-ins in 10 minutes."

# AI-generated KQL (to be reviewed and tested by the engineer):
GENERATED_KQL = """
// Detection: Brute Force — T1110
// Generated by AI, reviewed by: [engineer name], tested: [date]
SigninLogs
| where ResultType != "0"  // non-zero = failed sign-in
| where TimeGenerated > ago(10m)
| summarize
    FailedAttempts = count(),
    TargetAccounts = dcount(UserPrincipalName),
    FirstAttempt = min(TimeGenerated),
    LastAttempt = max(TimeGenerated)
  by IPAddress
| where FailedAttempts > 20
| project
    IPAddress,
    FailedAttempts,
    TargetAccounts,
    TimeWindow = LastAttempt - FirstAttempt,
    FirstAttempt,
    LastAttempt
"""

# Step 2: Validation checklist — what to verify before deploying the rule
VALIDATION_STEPS = [
    "Run against 30 days of historical logs to measure false positive rate",
    "Test against known brute-force attack samples (red team data)",
    "Verify ResultType mapping — is '0' always success in your tenant?",
    "Check if the threshold (20) is appropriate for your environment",
    "Add exclusions for service accounts and known scanning tools",
    "Verify the alert triggers the correct incident severity and playbook",
]

# Step 3: Never paste these into external AI tools
SENSITIVE_DATA_RULES = [
    "Do NOT paste actual log entries (they contain usernames and IPs)",
    "Do NOT share internal network ranges or domain names",
    "Do NOT include API keys, tokens, or credentials",
    "Use the organisation's approved AI tools only (see AI Policy)",
]
```

**Common pitfalls:**
- Trusting AI-generated detection rules without testing them against known attack samples and benign traffic.
- Using AI to generate security assessments without applying independent expert judgment — the AI may miss context-specific risks.
- Not establishing team conventions around what security data can and cannot be shared with AI tools.

---

## EU Compliance for Security Engineers

Senior Security Engineers in EU financial services must design and operate security programmes that satisfy the overlapping requirements of NIS2 and DORA — the two regulations that most directly define the security obligations for insurance companies. NIS2 (Directive 2022/2555) establishes cybersecurity risk management and incident reporting obligations for essential entities, which includes financial services. DORA (Regulation 2022/2554) goes further, establishing uniform requirements for digital operational resilience specifically in the financial sector. Both regulations became applicable in 2025, and both impose direct accountability on senior management for ICT security — meaning that Security Engineers who design the security programme are building the controls that protect the organisation's leadership from personal liability.

NIS2 implementation requires Security Engineers to establish comprehensive cybersecurity risk management measures covering: risk analysis and information system security policies, incident handling procedures, business continuity and crisis management, supply chain security (including security aspects of relationships with direct suppliers and service providers), security in network and information system acquisition and development, vulnerability handling and disclosure, and policies for the assessment of cybersecurity risk management effectiveness. The regulation also requires that management bodies approve the cybersecurity risk management measures and oversee their implementation — which means Security Engineers must produce regular reporting that demonstrates the security posture to the board in a format that non-technical executives can understand and act upon.

NIS2 incident reporting imposes the tightest timelines in European cybersecurity regulation. Essential entities must submit an early warning within 24 hours of becoming aware of a significant incident, a full notification within 72 hours, and a final report within one month. A "significant incident" is one that has caused or is capable of causing severe operational disruption, financial loss, or material damage to other parties. For Security Engineers, this means building automated incident detection and classification systems that can identify significant incidents within hours, not days. The early warning must include whether the incident is suspected to be caused by unlawful or malicious acts and whether it has or may have cross-border impact. Pre-established templates, communication channels, and escalation procedures are essential — 24 hours is too tight for manual processes.

DORA's digital operational resilience testing requirements (Articles 24-27) are the most technically detailed testing mandate in European financial regulation. Article 25 requires regular testing including vulnerability assessments, open-source analyses, network security assessments, gap analyses, physical security reviews, questionnaires and scanning software solutions, source code reviews, scenario-based tests, compatibility testing, performance testing, and end-to-end testing. For significant financial entities, Article 26 requires threat-led penetration testing (TLPT) at least every three years according to the TIBER-EU framework. Security Engineers must build a testing framework that covers all these requirements, produces documented evidence for regulatory audit, and integrates with the organisation's remediation workflow so that findings are tracked to resolution.

**Code walkthrough:**

```python
# NIS2 + DORA security compliance testing framework
# Implements NIS2 risk management measures and DORA Article 25 testing requirements
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
from enum import Enum
import json

class DORATestType(Enum):
    VULNERABILITY_SCAN = "vulnerability_assessment"
    NETWORK_SECURITY = "network_security_assessment"
    SOURCE_CODE_REVIEW = "source_code_review"
    SCENARIO_BASED = "scenario_based_test"
    PENETRATION_TEST = "penetration_test"
    TLPT = "threat_led_penetration_test"  # Article 26 — every 3 years

@dataclass
class DORATestResult:
    test_id: str
    test_type: DORATestType
    target_system: str
    executed_at: datetime
    findings: list[dict]  # Each finding: severity, description, remediation
    evidence_path: str
    regulatory_reference: str  # e.g., "DORA Art.25(1)(a)"

class DORAComplianceFramework:
    """Automated framework for DORA and NIS2 security testing compliance."""

    REQUIRED_ANNUAL_TESTS = [
        DORATestType.VULNERABILITY_SCAN,
        DORATestType.NETWORK_SECURITY,
        DORATestType.SOURCE_CODE_REVIEW,
        DORATestType.SCENARIO_BASED,
    ]

    def __init__(self):
        self.test_history: list[DORATestResult] = []

    def check_testing_coverage(self) -> dict:
        """Verify all DORA Article 25 mandated tests have been completed.
        Why automate? DORA requires evidence of regular testing for regulatory audit."""
        one_year_ago = datetime.now(timezone.utc) - timedelta(days=365)
        recent_tests = {r.test_type for r in self.test_history
                       if r.executed_at > one_year_ago}

        coverage = {}
        for required_type in self.REQUIRED_ANNUAL_TESTS:
            covered = required_type in recent_tests
            coverage[required_type.value] = {
                "completed": covered,
                "status": "COMPLIANT" if covered else "OVERDUE",
                "reference": "DORA Article 25",
            }

        # TLPT required every 3 years for significant entities
        three_years_ago = datetime.now(timezone.utc) - timedelta(days=1095)
        tlpt_done = any(r.test_type == DORATestType.TLPT
                       and r.executed_at > three_years_ago
                       for r in self.test_history)
        coverage["tlpt"] = {
            "completed": tlpt_done,
            "status": "COMPLIANT" if tlpt_done else "OVERDUE",
            "reference": "DORA Article 26",
        }

        return coverage

    def generate_regulatory_report(self) -> str:
        """Generate compliance evidence for Finansinspektionen audit."""
        coverage = self.check_testing_coverage()
        overdue = [k for k, v in coverage.items() if v["status"] == "OVERDUE"]
        return json.dumps({
            "report_type": "DORA_resilience_testing_compliance",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "overall_status": "COMPLIANT" if not overdue else "GAPS_IDENTIFIED",
            "overdue_tests": overdue,
            "coverage": coverage,
        }, indent=2)
```

> **Why it matters:** NIS2 penalties for essential entities can reach 10 million EUR or 2% of global turnover, and DORA penalties can reach 1% of average daily worldwide turnover applied daily until compliance is achieved. Both regulations explicitly hold senior management accountable — board members can face personal consequences for inadequate ICT risk management. Security Engineers who build comprehensive, automated testing frameworks and incident response capabilities protect both the organisation and its leadership from regulatory sanctions that carry both financial and operational consequences.
