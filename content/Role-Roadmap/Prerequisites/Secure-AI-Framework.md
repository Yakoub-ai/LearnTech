# Secure AI Framework

This guide provides a platform-neutral baseline for securing AI systems. It summarises the control areas that repeatedly appear in strong public guidance such as [Google Secure AI Framework (SAIF)](https://saif.google/), the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), and the [OWASP Top 10 for LLM Applications](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/).

Use it as a practical checklist when designing, building, reviewing, and operating AI-enabled products.

---

## Core Control Areas

### 1. User Awareness

People using or operating AI systems must understand the system's capabilities, limitations, and failure modes. Users should know when human review is required and what kinds of outputs must never be trusted without verification.

### 2. Prompt and Output Validation

AI inputs and outputs must be treated as untrusted data. Validate prompts, retrieved context, tool inputs, and generated responses. Apply content filtering, data loss prevention, structured output validation, and business-rule checks where needed.

### 3. Context and Memory Management

Control what information is stored in chat history, vector stores, caches, and long-term memory. Retain only what is necessary, classify stored data appropriately, and ensure sensitive information is not exposed to later users or sessions.

### 4. Secure Development Pipelines

Apply normal secure software delivery practices to AI systems: code review, dependency scanning, secret handling, SBOM generation, reproducible builds, and environment separation. AI apps expand the supply chain, so pipeline hygiene matters more, not less.

### 5. Identity and Access for Agents and Tools

Agents, workflows, and connected tools should operate with least privilege. Every tool call should be attributable, and credentials should be scoped narrowly enough that a prompt injection or logic flaw cannot escalate into broad system access.

### 6. Separation of Duties

High-impact actions should not rely on a single model response or a single unchecked workflow. Build approval steps, human review, or dual-control patterns where the risk of incorrect execution is material.

### 7. Traceability and Observability

Log model versions, prompts, tool calls, policy decisions, evaluation outcomes, and user-visible outputs to the level appropriate for privacy and compliance needs. Good observability is required for debugging, auditing, and incident response.

### 8. Secure Compute and Runtime

Harden the infrastructure running AI systems: network isolation, patching, runtime security, secrets management, access controls, and workload identity. Model-serving infrastructure should meet the same operational security bar as other production services.

### 9. Secure Model Selection and Training

Evaluate models, datasets, and third-party AI providers for security, licensing, provenance, privacy, and known risks. Review fine-tuning data sources, model update processes, and vendor terms before adopting a model in production.

---

## How to Apply the Framework

For each AI use case, ask:

1. What could go wrong technically?
2. What is the business impact if it goes wrong?
3. Which control areas above reduce that risk?
4. Which controls must be preventive, detective, or both?
5. What evidence will prove the controls are working?

This turns AI security from a vague principle into a repeatable engineering practice.

---

## Public Reference Material

- [Google Secure AI Framework (SAIF)](https://saif.google/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [MITRE ATLAS](https://atlas.mitre.org/)

---

## EU AI Act Alignment

The Secure AI Framework's nine control areas map directly to the obligations imposed by the EU AI Act (Regulation 2024/1689) on providers and deployers of high-risk AI systems. This section makes those mappings explicit so that teams implementing SAIF controls can simultaneously generate evidence of EU AI Act compliance.

**Article 9 — Risk Management System** requires providers of high-risk AI systems to establish, implement, document and maintain a risk management system throughout the AI system's lifecycle. SAIF Control Areas 1 (User Awareness), 6 (Separation of Duties) and 7 (Traceability and Observability) contribute directly: user awareness ensures that operators understand system limitations and failure modes, separation of duties prevents single points of failure in high-impact decisions, and traceability provides the audit trail that demonstrates the risk management system is functioning. The risk management system must identify and analyse known and reasonably foreseeable risks, estimate and evaluate those risks, and adopt suitable risk management measures — all of which require the observability infrastructure described in Control Area 7.

**Article 10 — Data and Data Governance** requires that training, validation and testing datasets are subject to appropriate data governance and management practices. SAIF Control Areas 4 (Secure Development Pipelines) and 9 (Secure Model Selection and Training) address this: pipeline hygiene ensures data provenance is maintained, and model selection practices include reviewing training data sources for bias, licensing and privacy compliance. For organisations that fine-tune models, this means documenting data sources, applying data quality checks and maintaining records that demonstrate compliance with data governance requirements.

**Articles 11-12 — Technical Documentation and Record Keeping** require comprehensive documentation and automatic logging of events during the AI system's operation. SAIF Control Area 7 (Traceability and Observability) is the primary technical implementation: logging model versions, prompts, tool calls, policy decisions and user-visible outputs provides the event records that Article 12 demands. Control Area 4 (Secure Development Pipelines) contributes through SBOM generation and reproducible builds, which support the technical documentation requirements of Article 11.

**Article 13 — Transparency** requires that high-risk AI systems are designed and developed so that their operation is sufficiently transparent to enable deployers to interpret the system's output and use it appropriately. SAIF Control Area 1 (User Awareness) directly supports this: users must know when they are interacting with an AI system, what its capabilities and limitations are, and when human review is required.

**Article 14 — Human Oversight** requires that high-risk AI systems can be effectively overseen by natural persons. SAIF Control Area 6 (Separation of Duties) provides the architectural pattern: human review gates, approval steps and dual-control patterns ensure that high-impact AI-assisted decisions include meaningful human oversight rather than rubber-stamp approval.

**Article 15 — Accuracy, Robustness and Cybersecurity** requires that high-risk AI systems achieve an appropriate level of accuracy, are resilient to errors and inconsistencies, and are protected against attempts by unauthorised third parties to exploit system vulnerabilities. SAIF Control Areas 2 (Prompt and Output Validation), 5 (Identity and Access for Agents and Tools) and 8 (Secure Compute and Runtime) collectively address this: input/output validation ensures robustness against adversarial inputs, least-privilege identity controls prevent exploitation through prompt injection, and hardened infrastructure protects against external threats.

**Code walkthrough:**

```python
# Step 1: SAIF-to-EU-AI-Act mapping — automated compliance evidence generation
# Why: teams implementing SAIF controls should automatically generate EU AI Act evidence

from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime

@dataclass
class SAIFControl:
    id: int
    name: str
    eu_ai_act_articles: List[str]
    evidence_sources: List[str]

# Step 2: Define the mapping between SAIF control areas and EU AI Act articles
# Why: this mapping lets a single control implementation satisfy multiple requirements
SAIF_EU_MAPPING: List[SAIFControl] = [
    SAIFControl(1, "User Awareness", ["Art 9 (Risk Mgmt)", "Art 13 (Transparency)"],
                ["user_training_records", "ui_disclosure_audit", "onboarding_checklist"]),
    SAIFControl(2, "Prompt and Output Validation", ["Art 15 (Accuracy/Robustness)"],
                ["input_filter_logs", "output_validation_results", "adversarial_test_reports"]),
    SAIFControl(3, "Context and Memory Management", ["Art 10 (Data Governance)"],
                ["data_retention_policy", "memory_purge_logs", "classification_audit"]),
    SAIFControl(4, "Secure Development Pipelines", ["Art 10 (Data Governance)", "Art 11 (Technical Docs)"],
                ["sbom_artifacts", "pipeline_scan_results", "build_reproducibility_report"]),
    SAIFControl(5, "Identity and Access for Agents", ["Art 15 (Cybersecurity)"],
                ["iam_policy_audit", "tool_permission_matrix", "credential_rotation_logs"]),
    SAIFControl(6, "Separation of Duties", ["Art 9 (Risk Mgmt)", "Art 14 (Human Oversight)"],
                ["approval_gate_logs", "dual_control_evidence", "human_review_statistics"]),
    SAIFControl(7, "Traceability and Observability", ["Art 9 (Risk Mgmt)", "Art 12 (Record Keeping)"],
                ["inference_logs", "model_version_registry", "audit_trail_export"]),
    SAIFControl(8, "Secure Compute and Runtime", ["Art 15 (Cybersecurity)"],
                ["vulnerability_scan_results", "network_isolation_proof", "patch_compliance_report"]),
    SAIFControl(9, "Secure Model Selection and Training", ["Art 10 (Data Governance)"],
                ["model_evaluation_report", "training_data_provenance", "license_compliance_check"]),
]

@dataclass
class ComplianceEvidenceReport:
    """Step 3: Generate a compliance evidence report from SAIF control assessments
    Why: auditors and regulators need evidence organised by EU AI Act article"""
    system_name: str
    assessed_at: datetime
    article_coverage: Dict[str, List[str]]  # article -> list of evidence artefacts

def generate_eu_ai_act_evidence(system_name: str, implemented_controls: List[int]) -> ComplianceEvidenceReport:
    """
    Step 4: Map implemented SAIF controls to EU AI Act article evidence
    Why: organisations already doing SAIF can demonstrate EU AI Act compliance
    without a separate compliance programme
    """
    article_evidence: Dict[str, List[str]] = {}

    for control in SAIF_EU_MAPPING:
        if control.id in implemented_controls:
            for article in control.eu_ai_act_articles:
                if article not in article_evidence:
                    article_evidence[article] = []
                article_evidence[article].extend(control.evidence_sources)

    # Step 5: Identify gaps — articles with no evidence from implemented controls
    all_articles = {"Art 9 (Risk Mgmt)", "Art 10 (Data Governance)",
                    "Art 11 (Technical Docs)", "Art 12 (Record Keeping)",
                    "Art 13 (Transparency)", "Art 14 (Human Oversight)",
                    "Art 15 (Accuracy/Robustness)", "Art 15 (Cybersecurity)"}
    uncovered = all_articles - set(article_evidence.keys())
    if uncovered:
        print(f"WARNING: No evidence for {', '.join(sorted(uncovered))}")
        print("Action required: implement additional SAIF controls to close gaps")

    return ComplianceEvidenceReport(
        system_name=system_name,
        assessed_at=datetime.now(),
        article_coverage=article_evidence,
    )
```

**Why it matters:** The EU AI Act's August 2026 deadline for high-risk AI system compliance is approaching. Organisations that have already implemented SAIF controls have a significant head start — but only if the connection between those controls and EU AI Act requirements is made explicit. This mapping ensures that SAIF implementation effort translates directly into regulatory compliance evidence, avoiding duplicate work and reducing the risk of gaps discovered during a conformity assessment.

---

## GDPR Considerations for AI/ML

AI and machine learning systems interact with GDPR obligations at every stage of their lifecycle — from training data collection through model inference to the storage of logged inputs and outputs. This section addresses the GDPR requirements that are specific to or amplified by AI/ML workloads and maps them to SAIF control areas.

**Training data and lawful basis.** Any personal data used to train, fine-tune or evaluate a model must have a lawful basis under GDPR Article 6. Legitimate interest (Article 6(1)(f)) is commonly cited but requires a documented balancing test demonstrating that the organisation's interest does not override the data subject's rights. Consent (Article 6(1)(a)) is stronger but harder to maintain at scale, particularly if the training data is repurposed for a use case not covered by the original consent. SAIF Control Area 9 (Secure Model Selection and Training) requires reviewing training data sources — this review must include a GDPR lawful basis assessment for any personal data in the training set.

**Article 22 — Automated individual decision-making.** When an AI system makes decisions that produce legal effects or similarly significant effects on individuals — such as credit scoring, insurance underwriting or employment screening — GDPR Article 22 gives data subjects the right not to be subject to a decision based solely on automated processing. This means that high-stakes AI decisions must include meaningful human involvement (not just a human rubber-stamping the model's output), and the data subject must be informed that automated processing is taking place and given the right to contest the decision. SAIF Control Area 6 (Separation of Duties) provides the architectural pattern for human oversight, and Control Area 1 (User Awareness) ensures that data subjects receive the required transparency.

**Right to erasure (Article 17) and model unlearning.** Data subjects have the right to request erasure of their personal data. For traditional databases, this is straightforward. For AI/ML systems, the question is more complex: if personal data was used to train a model, does deleting the training record satisfy the erasure obligation, or must the model itself be retrained without that data? Current regulatory guidance generally accepts that deleting the training data and documenting that the model cannot practically regenerate the specific data is sufficient, provided the model does not memorise or reproduce individual training examples. SAIF Control Area 3 (Context and Memory Management) addresses the runtime aspect — ensuring that personal data in conversation histories, vector stores and caches is purged when an erasure request is received.

**Data minimisation (Article 5(1)(c)) and purpose limitation (Article 5(1)(b)).** AI systems are data-hungry by nature, which creates tension with GDPR's data minimisation principle. The architect must ensure that only the personal data strictly necessary for the AI system's stated purpose is collected and processed. Purpose limitation requires that data collected for one purpose is not repurposed for AI training without a compatible legal basis. SAIF Control Area 3 (Context and Memory Management) enforces data minimisation at runtime by controlling what information is retained in memory and caches.

**Data Protection Impact Assessment (Article 35).** Processing that is likely to result in a high risk to the rights and freedoms of natural persons requires a DPIA before processing begins. AI systems that profile individuals, process sensitive categories of data or make automated decisions affecting individuals almost always trigger this requirement. The DPIA must describe the processing, assess its necessity and proportionality, and evaluate risks to data subjects. SAIF Control Area 7 (Traceability and Observability) provides the technical infrastructure needed to conduct and maintain DPIAs — without observability into what data the AI system processes and how, a DPIA is guesswork.

**Code walkthrough:**

```python
# Step 1: GDPR compliance checks for AI/ML systems
# Why: AI systems amplify GDPR obligations; automated checks prevent violations

from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime, timedelta
from enum import Enum

class LawfulBasis(Enum):
    CONSENT = "consent"                       # Art 6(1)(a)
    CONTRACT = "contract"                     # Art 6(1)(b)
    LEGAL_OBLIGATION = "legal_obligation"     # Art 6(1)(c)
    VITAL_INTEREST = "vital_interest"         # Art 6(1)(d)
    PUBLIC_INTEREST = "public_interest"       # Art 6(1)(e)
    LEGITIMATE_INTEREST = "legitimate_interest"  # Art 6(1)(f)

@dataclass
class TrainingDataSource:
    source_id: str
    contains_personal_data: bool
    lawful_basis: Optional[LawfulBasis]
    balancing_test_documented: bool  # Required for legitimate interest
    consent_covers_ai_training: Optional[bool]  # Required for consent basis
    data_subjects_informed: bool  # Art 13/14 transparency

@dataclass
class AISystemGDPRProfile:
    system_id: str
    makes_automated_decisions: bool  # Art 22 trigger
    processes_special_categories: bool  # Art 9 — health, biometric, etc.
    profiles_individuals: bool  # Recital 71 — profiling trigger
    training_data_sources: List[TrainingDataSource]
    dpia_conducted: bool
    dpia_date: Optional[datetime]
    erasure_procedure_documented: bool
    human_oversight_for_decisions: bool

def assess_gdpr_compliance(profile: AISystemGDPRProfile) -> dict:
    """
    Step 2: Automated GDPR compliance assessment for an AI system
    Why: manual assessments miss edge cases; automated checks run on every deployment
    """
    findings = []

    # Step 3: Check training data lawful basis (Art 6)
    for source in profile.training_data_sources:
        if source.contains_personal_data:
            if source.lawful_basis is None:
                findings.append({
                    "severity": "critical",
                    "article": "Art 6",
                    "finding": f"Source {source.source_id}: no lawful basis documented",
                })
            elif source.lawful_basis == LawfulBasis.LEGITIMATE_INTEREST:
                if not source.balancing_test_documented:
                    findings.append({
                        "severity": "critical",
                        "article": "Art 6(1)(f)",
                        "finding": f"Source {source.source_id}: legitimate interest "
                                   f"claimed but balancing test not documented",
                    })
            elif source.lawful_basis == LawfulBasis.CONSENT:
                if not source.consent_covers_ai_training:
                    findings.append({
                        "severity": "critical",
                        "article": "Art 6(1)(a)",
                        "finding": f"Source {source.source_id}: consent does not "
                                   f"explicitly cover AI/ML training use",
                    })

    # Step 4: Article 22 — automated decision-making
    # Why: decisions with legal/significant effect require human oversight + data subject rights
    if profile.makes_automated_decisions:
        if not profile.human_oversight_for_decisions:
            findings.append({
                "severity": "critical",
                "article": "Art 22",
                "finding": "System makes automated decisions with significant effect "
                           "but lacks meaningful human oversight",
            })

    # Step 5: DPIA requirement (Art 35)
    # Why: high-risk AI processing MUST have a DPIA before deployment
    needs_dpia = (profile.makes_automated_decisions or
                  profile.processes_special_categories or
                  profile.profiles_individuals)
    if needs_dpia and not profile.dpia_conducted:
        findings.append({
            "severity": "critical",
            "article": "Art 35",
            "finding": "DPIA required but not conducted — processing cannot begin",
        })
    elif needs_dpia and profile.dpia_date:
        if profile.dpia_date < datetime.now() - timedelta(days=365):
            findings.append({
                "severity": "warning",
                "article": "Art 35",
                "finding": "DPIA is older than 12 months — review recommended",
            })

    # Step 6: Right to erasure readiness (Art 17)
    if any(s.contains_personal_data for s in profile.training_data_sources):
        if not profile.erasure_procedure_documented:
            findings.append({
                "severity": "high",
                "article": "Art 17",
                "finding": "No documented procedure for handling erasure requests "
                           "affecting AI training data and runtime caches",
            })

    critical_count = sum(1 for f in findings if f["severity"] == "critical")
    return {
        "system_id": profile.system_id,
        "gdpr_compliant": critical_count == 0,
        "total_findings": len(findings),
        "critical_findings": critical_count,
        "findings": findings,
        "assessed_at": datetime.now().isoformat(),
        "recommendation": "Block deployment" if critical_count > 0
                         else "Proceed with noted actions",
    }
```

**Why it matters:** GDPR fines for AI-related violations are increasing — the Swedish Authority for Privacy Protection (IMY) and other EU data protection authorities are actively investigating AI systems that process personal data without adequate safeguards. An AI system that lacks a documented lawful basis for its training data, makes automated decisions without meaningful human oversight, or cannot handle erasure requests is a regulatory liability. By mapping GDPR obligations to SAIF control areas and automating compliance checks, organisations can catch violations before deployment rather than discovering them during a regulatory investigation.
