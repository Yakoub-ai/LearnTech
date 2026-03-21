# Security Engineer – Learning Path

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
