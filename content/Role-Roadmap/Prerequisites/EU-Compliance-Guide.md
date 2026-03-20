# EU Compliance Guide for Developers

This guide covers the key EU regulations that every developer in a marketing technology and advertising technology team must understand. It provides practical implementation guidance, code examples, and checklists to help you build compliant systems from day one.

---

## Why EU Compliance Matters

The European Union has enacted some of the world's most comprehensive digital regulations. Non-compliance carries severe consequences:

- **GDPR**: Fines up to €20 million or 4% of global annual turnover (whichever is higher)
- **NIS2**: Fines up to €10 million or 2% of global annual turnover
- **EU AI Act**: Fines up to €35 million or 7% of global turnover for prohibited practices
- **DORA**: Fines and potential suspension of operations for financial entities

Beyond fines, non-compliance damages customer trust, blocks market access, and creates legal liability for individuals (including developers and managers under NIS2).

> **Why it matters:** As a developer, the code you write directly determines whether your organisation is compliant. Privacy by design and security by default are not optional — they are legal requirements.

---

## GDPR (General Data Protection Regulation)

The GDPR is the foundation of EU data protection law, in effect since May 2018. It applies to any organisation processing personal data of EU residents, regardless of where the organisation is based.

### Core Principles

1. **Lawfulness, fairness, and transparency** — You must have a legal basis for processing data and be transparent about it
2. **Purpose limitation** — Collect data only for specified, explicit purposes
3. **Data minimization** — Process only the data you actually need
4. **Accuracy** — Keep personal data accurate and up to date
5. **Storage limitation** — Don't keep data longer than necessary
6. **Integrity and confidentiality** — Protect data with appropriate security measures
7. **Accountability** — Be able to demonstrate compliance

### Data Subject Rights

EU residents have the following rights that your systems must support:

| Right | Article | What It Means for Developers |
|-------|---------|------------------------------|
| Right of access | Art. 15 | Export all data held about a user |
| Right to rectification | Art. 16 | Allow users to correct their data |
| Right to erasure | Art. 17 | Delete all user data on request |
| Right to restrict processing | Art. 18 | Flag data as restricted |
| Right to data portability | Art. 20 | Export data in machine-readable format |
| Right to object | Art. 21 | Stop processing for specific purposes |
| Automated decision-making | Art. 22 | Allow opt-out of fully automated decisions |

### Consent Management

For marketing and advertising technology, consent is typically the legal basis for processing. Valid consent must be:

- **Freely given** — not bundled with terms of service
- **Specific** — separate consent per purpose
- **Informed** — clear explanation of what data is collected and why
- **Unambiguous** — requires affirmative action (no pre-ticked boxes)
- **Withdrawable** — as easy to withdraw as to give

**Code walkthrough:**

```python
# GDPR-Compliant Consent Management System
from datetime import datetime, timezone
from dataclasses import dataclass, field
from typing import Optional
from enum import Enum

class ConsentPurpose(Enum):
    ANALYTICS = "analytics"
    MARKETING = "marketing"
    PERSONALISATION = "personalisation"
    THIRD_PARTY_ADS = "third_party_advertising"

@dataclass
class ConsentRecord:
    """Immutable record of consent — never delete, only append new records."""
    user_id: str
    purpose: ConsentPurpose
    granted: bool
    timestamp: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    source: str = "web_banner"  # How consent was collected
    version: str = "2.1"        # Consent policy version

class ConsentManager:
    def __init__(self):
        self.consent_log = []  # Append-only audit trail

    def record_consent(self, user_id: str, purpose: ConsentPurpose, granted: bool, source: str = "web_banner"):
        """Record a consent decision. Never overwrite — always append."""
        record = ConsentRecord(
            user_id=user_id,
            purpose=purpose,
            granted=granted,
            source=source
        )
        self.consent_log.append(record)
        return record

    def has_consent(self, user_id: str, purpose: ConsentPurpose) -> bool:
        """Check the LATEST consent status for a user+purpose pair."""
        relevant = [r for r in self.consent_log
                    if r.user_id == user_id and r.purpose == purpose]
        if not relevant:
            return False  # No consent = no processing (GDPR default)
        return relevant[-1].granted

    def withdraw_all(self, user_id: str):
        """Withdraw consent for all purposes — must be as easy as granting."""
        for purpose in ConsentPurpose:
            self.record_consent(user_id, purpose, granted=False, source="user_withdrawal")

# Usage
manager = ConsentManager()
manager.record_consent("user-123", ConsentPurpose.ANALYTICS, granted=True)
manager.record_consent("user-123", ConsentPurpose.MARKETING, granted=False)

# Always check before processing
if manager.has_consent("user-123", ConsentPurpose.ANALYTICS):
    print("OK to track analytics")
if not manager.has_consent("user-123", ConsentPurpose.MARKETING):
    print("Do NOT send marketing emails")
```

### Data Protection Impact Assessments (DPIAs)

A DPIA is required before any processing that is likely to result in a high risk to individuals. This includes:

- Large-scale profiling or automated decision-making
- Processing sensitive data (health, biometrics, political opinions)
- Systematic monitoring of public areas
- New technologies applied to personal data

For marketing technology, DPIAs are typically required for: customer profiling, ad targeting based on behaviour, recommendation engines, and cross-device tracking.

### Cross-Border Data Transfers

Since the Schrems II ruling (2020), transferring personal data outside the EU/EEA requires:

1. **Adequacy decision** — The destination country has equivalent protections (e.g., EU-US Data Privacy Framework)
2. **Standard Contractual Clauses (SCCs)** — Contractual safeguards between parties
3. **Binding Corporate Rules** — For intra-group transfers
4. **Transfer Impact Assessments** — Document that the destination provides adequate protection

> **Key things to understand:** Every API call to a US-based service that includes personal data is a cross-border transfer. This includes analytics platforms, ad networks, CRM systems, and cloud services.

### Data Breach Notification

Under GDPR Article 33, you must notify the supervisory authority within **72 hours** of becoming aware of a personal data breach. If the breach poses a high risk to individuals, you must also notify the affected data subjects (Article 34).

**Code walkthrough:**

```python
# GDPR Breach Notification Tracker
from datetime import datetime, timezone, timedelta

class BreachTracker:
    NOTIFICATION_DEADLINE_HOURS = 72

    def __init__(self):
        self.incidents = []

    def report_breach(self, description: str, data_categories: list,
                      affected_count: int, severity: str):
        """Log a breach and calculate notification deadline."""
        now = datetime.now(timezone.utc)
        deadline = now + timedelta(hours=self.NOTIFICATION_DEADLINE_HOURS)

        incident = {
            "id": f"BREACH-{len(self.incidents)+1:04d}",
            "detected_at": now.isoformat(),
            "notification_deadline": deadline.isoformat(),
            "description": description,
            "data_categories": data_categories,
            "affected_count": affected_count,
            "severity": severity,
            "dpa_notified": False,
            "subjects_notified": False,
        }
        self.incidents.append(incident)

        hours_remaining = self.NOTIFICATION_DEADLINE_HOURS
        print(f"BREACH DETECTED: {incident['id']}")
        print(f"  Deadline to notify DPA: {deadline.isoformat()} ({hours_remaining}h)")
        print(f"  Affected individuals: {affected_count}")
        print(f"  Severity: {severity}")

        if severity == "high":
            print("  ⚠ HIGH RISK — Must also notify affected data subjects (Art. 34)")

        return incident

# Example
tracker = BreachTracker()
tracker.report_breach(
    description="Unauthorised access to customer email database",
    data_categories=["email", "name", "purchase_history"],
    affected_count=15000,
    severity="high"
)
```

> **Common pitfalls:**
> - Failing to detect breaches quickly (invest in monitoring and alerting)
> - Not documenting ALL breaches, even minor ones (Art. 33(5) requires a register)
> - Assuming encryption means no notification is needed (it depends on the key compromise)

---

## NIS2 Directive (Network and Information Security)

NIS2 came into force in January 2023 with member state transposition deadline of October 2024. It significantly expands the scope of cybersecurity obligations across the EU.

### Who It Applies To

NIS2 categorises organisations as **essential** or **important** entities:

- **Essential entities**: Energy, transport, banking, health, digital infrastructure, ICT service management, public administration
- **Important entities**: Postal services, waste management, chemicals, food, manufacturing, digital providers, research

Marketing and advertising technology companies typically fall under "digital providers" if they operate platforms or provide digital services at scale.

### Risk Management Requirements

Article 21 requires organisations to implement at minimum:

1. Risk analysis and information system security policies
2. Incident handling procedures
3. Business continuity and crisis management
4. Supply chain security
5. Security in network and system acquisition, development, and maintenance
6. Vulnerability handling and disclosure
7. Cybersecurity training and basic cyber hygiene
8. Cryptography and encryption policies
9. Human resources security and access control
10. Multi-factor authentication

### Incident Reporting Timeline

NIS2 imposes a strict multi-stage reporting obligation:

| Timeline | Requirement | To Whom |
|----------|-------------|---------|
| **24 hours** | Early warning — is the incident suspected malicious? Cross-border impact? | National CSIRT/authority |
| **72 hours** | Incident notification — initial assessment, severity, impact, indicators of compromise | National CSIRT/authority |
| **1 month** | Final report — root cause, mitigation, cross-border impact | National CSIRT/authority |

**Code walkthrough:**

```python
# NIS2 Incident Reporting System
from datetime import datetime, timezone, timedelta
from enum import Enum

class IncidentSeverity(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class NIS2IncidentReport:
    def __init__(self, title: str, severity: IncidentSeverity):
        self.detected_at = datetime.now(timezone.utc)
        self.title = title
        self.severity = severity

        # NIS2 deadlines
        self.early_warning_deadline = self.detected_at + timedelta(hours=24)
        self.notification_deadline = self.detected_at + timedelta(hours=72)
        self.final_report_deadline = self.detected_at + timedelta(days=30)

        self.early_warning_sent = False
        self.notification_sent = False
        self.final_report_sent = False

    def status(self):
        now = datetime.now(timezone.utc)
        print(f"Incident: {self.title} [{self.severity.value}]")
        print(f"Detected: {self.detected_at.isoformat()}")
        print(f"")
        print(f"24h Early Warning:  {'SENT' if self.early_warning_sent else 'PENDING'}")
        print(f"  Deadline: {self.early_warning_deadline.isoformat()}")
        print(f"72h Notification:   {'SENT' if self.notification_sent else 'PENDING'}")
        print(f"  Deadline: {self.notification_deadline.isoformat()}")
        print(f"30d Final Report:   {'SENT' if self.final_report_sent else 'PENDING'}")
        print(f"  Deadline: {self.final_report_deadline.isoformat()}")

incident = NIS2IncidentReport("Ransomware attack on ad platform", IncidentSeverity.CRITICAL)
incident.status()
```

### Supply Chain Security

NIS2 requires you to assess and manage risks from your entire supply chain. For marketing technology teams, this means:

- Audit third-party ad tech vendors (DSPs, SSPs, DMPs, CDPs)
- Require security standards in vendor contracts
- Monitor for vulnerabilities in third-party libraries
- Maintain a software bill of materials (SBOM) for all production systems

---

## EU AI Act

The EU AI Act is the world's first comprehensive AI regulation, entering into force in stages from 2024 to 2027. It takes a risk-based approach to regulating artificial intelligence systems.

### Risk Tiers

| Risk Level | Examples | Requirements |
|------------|----------|-------------|
| **Unacceptable** | Social scoring, real-time biometric ID in public spaces, manipulation of vulnerable groups | **Prohibited** |
| **High-risk** | Credit scoring, recruitment tools, critical infrastructure AI, law enforcement | Conformity assessment, registration, monitoring |
| **Limited risk** | Chatbots, emotion recognition, deepfakes | Transparency obligations |
| **Minimal risk** | Spam filters, AI in video games, search suggestions | No specific requirements (voluntary codes) |

### Marketing AI Implications

For marketing and advertising technology, the following AI uses require attention:

- **Recommendation engines** — Generally limited risk, requiring transparency disclosures
- **Programmatic ad targeting using profiling** — May be high-risk if it significantly affects individuals
- **AI-powered content generation** — Limited risk, requires disclosure that content is AI-generated
- **Sentiment analysis on customer data** — Limited risk, transparency required
- **Automated pricing algorithms** — Could be high-risk if discriminatory

**Code walkthrough:**

```python
# EU AI Act Risk Classification for Marketing AI Systems
from dataclasses import dataclass
from enum import Enum

class AIRiskLevel(Enum):
    UNACCEPTABLE = "unacceptable"
    HIGH = "high"
    LIMITED = "limited"
    MINIMAL = "minimal"

@dataclass
class AISystemAssessment:
    name: str
    description: str
    risk_level: AIRiskLevel
    requires_conformity: bool
    transparency_required: bool
    documentation_required: bool

def classify_marketing_ai(system_type: str, uses_profiling: bool,
                           affects_access: bool, uses_biometric: bool) -> AISystemAssessment:
    """Classify a marketing AI system under EU AI Act risk tiers."""

    # Unacceptable: manipulative techniques targeting vulnerable groups
    if uses_biometric and system_type == "real_time_identification":
        return AISystemAssessment(
            name=system_type, description="Prohibited practice",
            risk_level=AIRiskLevel.UNACCEPTABLE,
            requires_conformity=False, transparency_required=True,
            documentation_required=True
        )

    # High-risk: affects access to essential services or uses extensive profiling
    if affects_access or (uses_profiling and system_type in ["credit_scoring", "recruitment"]):
        return AISystemAssessment(
            name=system_type, description="High-risk AI system",
            risk_level=AIRiskLevel.HIGH,
            requires_conformity=True, transparency_required=True,
            documentation_required=True
        )

    # Limited risk: chatbots, recommendation engines, content generation
    if system_type in ["chatbot", "recommendation_engine", "content_generation", "sentiment_analysis"]:
        return AISystemAssessment(
            name=system_type, description="Limited risk — transparency obligations",
            risk_level=AIRiskLevel.LIMITED,
            requires_conformity=False, transparency_required=True,
            documentation_required=False
        )

    # Minimal risk: spam filters, basic automation
    return AISystemAssessment(
        name=system_type, description="Minimal risk — no specific obligations",
        risk_level=AIRiskLevel.MINIMAL,
        requires_conformity=False, transparency_required=False,
        documentation_required=False
    )

# Classify common marketing AI systems
systems = [
    ("recommendation_engine", True, False, False),
    ("chatbot", False, False, False),
    ("credit_scoring", True, True, False),
    ("content_generation", False, False, False),
]

for sys_type, profiling, access, biometric in systems:
    result = classify_marketing_ai(sys_type, profiling, access, biometric)
    print(f"{result.name}: {result.risk_level.value} — {result.description}")
    if result.transparency_required:
        print(f"  → Transparency disclosure required")
    if result.requires_conformity:
        print(f"  → Conformity assessment required")
    print()
```

### Transparency Requirements

For limited-risk AI systems (most marketing AI), you must:

1. **Inform users** they are interacting with an AI system (e.g., chatbots)
2. **Label AI-generated content** — users must know when content is AI-generated
3. **Disclose emotion recognition** — if using sentiment/emotion analysis, inform the data subject
4. **Provide opt-out mechanisms** for AI-driven personalisation

### Documentation Requirements

For high-risk AI systems, maintain:

- Technical documentation describing the system's purpose, capabilities, limitations
- Risk management system documentation
- Data governance procedures for training data
- Logs of system operation for traceability
- Accuracy, robustness, and cybersecurity metrics
- Human oversight measures

---

## DORA (Digital Operational Resilience Act)

DORA applies to financial entities and their critical ICT service providers. If your marketing technology platform serves financial services clients, DORA may apply to you as a third-party ICT service provider.

### ICT Risk Management Framework

DORA requires organisations to:

1. Identify and classify all ICT-supported business functions
2. Map ICT dependencies and interconnections
3. Conduct regular risk assessments
4. Implement protection, detection, and response capabilities
5. Maintain and test business continuity plans

### Incident Reporting

DORA incident reporting follows a similar timeline to NIS2:

| Timeline | Requirement |
|----------|-------------|
| **4 hours** | Initial notification (after classifying as major) |
| **72 hours** | Intermediate report with root cause analysis |
| **1 month** | Final report with full analysis and remediation |

### Resilience Testing

DORA requires two types of testing:

1. **Basic testing** (annually): Vulnerability assessments, network security, gap analyses, source code reviews, performance testing
2. **Advanced testing** (every 3 years for critical entities): Threat-Led Penetration Testing (TLPT) — scenario-based red team exercises

**Code walkthrough:**

```python
# DORA ICT Risk Assessment
from dataclasses import dataclass, field
from typing import List

@dataclass
class ICTAsset:
    name: str
    category: str  # "infrastructure", "application", "data", "service"
    criticality: str  # "critical", "important", "standard"
    vendor: str
    data_classification: str  # "public", "internal", "confidential", "restricted"

@dataclass
class RiskAssessment:
    asset: ICTAsset
    threats: List[str]
    likelihood: int  # 1-5
    impact: int      # 1-5
    risk_score: int = 0
    mitigations: List[str] = field(default_factory=list)

    def __post_init__(self):
        self.risk_score = self.likelihood * self.impact

    def status(self):
        level = "LOW" if self.risk_score <= 6 else "MEDIUM" if self.risk_score <= 12 else "HIGH" if self.risk_score <= 19 else "CRITICAL"
        return level

# Assess marketing technology stack
assets = [
    ICTAsset("Ad Server", "application", "critical", "Google", "confidential"),
    ICTAsset("CDP Platform", "application", "critical", "Segment", "restricted"),
    ICTAsset("Analytics DB", "data", "important", "Internal", "confidential"),
    ICTAsset("Tag Manager", "service", "standard", "Google", "internal"),
]

print("=== DORA ICT Risk Assessment ===\n")
for asset in assets:
    assessment = RiskAssessment(
        asset=asset,
        threats=["data_breach", "service_outage", "vendor_lock_in"],
        likelihood=3 if asset.criticality == "critical" else 2,
        impact=4 if asset.data_classification in ["confidential", "restricted"] else 2,
        mitigations=["encryption", "backup", "monitoring"]
    )
    print(f"{asset.name} ({asset.category})")
    print(f"  Criticality: {asset.criticality} | Vendor: {asset.vendor}")
    print(f"  Risk Score: {assessment.risk_score}/25 [{assessment.status()}]")
    print(f"  Mitigations: {', '.join(assessment.mitigations)}")
    print()
```

### Third-Party Risk Management

DORA requires you to:

- Maintain a register of all ICT third-party service providers
- Conduct due diligence before contracting
- Include specific contractual provisions (data location, audit rights, exit strategies)
- Monitor concentration risk (over-reliance on single providers)
- Have exit strategies for critical service providers

---

## Practical Compliance Checklist for Developers

### Pre-Development Checklist

- [ ] Identify what personal data will be processed
- [ ] Determine the legal basis for processing (consent, legitimate interest, contract)
- [ ] Conduct a DPIA if processing is high-risk
- [ ] Design data model with privacy by design (minimization, pseudonymization)
- [ ] Plan data retention periods and deletion mechanisms
- [ ] Assess if AI components require EU AI Act classification
- [ ] Document data flows including cross-border transfers

### During Development Checklist

- [ ] Implement consent collection before any data processing
- [ ] Build data subject rights endpoints (access, erasure, portability, rectification)
- [ ] Add audit logging for all data access and modifications
- [ ] Encrypt personal data at rest and in transit
- [ ] Implement access controls (principle of least privilege)
- [ ] Add input validation and output encoding (OWASP Top 10)
- [ ] Label AI-generated content where required
- [ ] Implement breach detection and alerting

### Pre-Deployment Checklist

- [ ] Security testing (SAST, DAST, dependency scanning)
- [ ] Privacy review of all data flows
- [ ] Verify consent mechanisms work correctly
- [ ] Test data subject rights endpoints
- [ ] Verify breach notification workflow
- [ ] Document the system for compliance records
- [ ] Review third-party services for adequacy decisions / SCCs

### Ongoing Operations Checklist

- [ ] Monitor for data breaches (72-hour GDPR deadline, 24-hour NIS2 deadline)
- [ ] Review and update DPIAs when processing changes
- [ ] Audit consent records periodically
- [ ] Update vendor risk assessments
- [ ] Conduct regular security testing (DORA requires annual minimum)
- [ ] Review data retention — delete data past its retention period
- [ ] Monitor AI systems for drift, bias, and accuracy degradation
- [ ] Keep compliance documentation current

---

## Resources and References

| Regulation | Official Source | Key Dates |
|-----------|----------------|-----------|
| GDPR | [Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | In force since May 2018 |
| NIS2 | [Directive (EU) 2022/2555](https://eur-lex.europa.eu/eli/dir/2022/2555) | Transposition deadline Oct 2024 |
| EU AI Act | [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | Phased: Feb 2025 – Aug 2027 |
| DORA | [Regulation (EU) 2022/2554](https://eur-lex.europa.eu/eli/reg/2022/2554/oj) | Applicable from Jan 2025 |
| ePrivacy | [Directive 2002/58/EC](https://eur-lex.europa.eu/eli/dir/2002/58/oj) | In force (regulation pending) |
| TCF 2.2 | [IAB Europe TCF](https://iabeurope.eu/transparency-consent-framework/) | Industry standard for consent |

> **Why it matters:** These regulations interact with each other. A data breach may trigger obligations under GDPR (72h notification), NIS2 (24h early warning), and DORA (4h initial notification) simultaneously. Your incident response procedures must account for all applicable deadlines.
