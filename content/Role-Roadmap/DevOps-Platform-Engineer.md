# DevOps / Platform Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

DevOps and Platform Engineers build and maintain the infrastructure, pipelines, and tooling that enable teams to ship software reliably. The role covers CI/CD, cloud infrastructure, containerisation, scripting, observability, and platform security.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| DevOps Overview | [Every DevOps Tool Explained in 8 min](https://www.youtube.com/watch?v=EY1hsh-HCjo) | Video |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| DevOps Roadmap | [roadmap.sh – DevOps](https://roadmap.sh/devops) | Interactive |
| DevOps Literacy | [DevOps Literacy – Pluralsight](https://app.pluralsight.com/paths/skills/devops-literacy) | Course |
| Linux Fundamentals | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |
| Bash Scripting | [Bash Scripting Tutorial – Ryan's Tutorials](https://ryanstutorials.net/bash-scripting-tutorial/) | Interactive |
| Git | [Git Fundamentals](Prerequisites/git.md) and [Branching Strategy](Prerequisites/Branching-Strategy.md) | Guide |

### After completing Beginner you should be able to:

- Explain the DevOps philosophy and the CALMS framework (Culture, Automation, Lean, Measurement, Sharing)
- Explain the difference between CI, Continuous Delivery, and Continuous Deployment
- Build and run a Docker container from a Dockerfile
- Navigate the Linux file system and manage processes from the command line
- Write basic Bash scripts (variables, loops, conditionals, exit codes)

For deep explanations of each concept, see the [Beginner Concept Reference](DevOps-Platform-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| System Design | [System Design Concepts in 10 min](https://www.youtube.com/watch?v=i53Gi_K3o7I) | Video |
| CI/CD and Pipelines | [GitHub Actions – Understanding workflows](https://docs.github.com/en/actions/using-workflows) | Docs |
| Azure Fundamentals | [Microsoft Learn – Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/) | Interactive |
| Infrastructure as Code | [Microsoft Learn – Bicep Fundamentals](https://learn.microsoft.com/en-us/training/paths/fundamentals-bicep/) | Interactive |
| Terraform | [HashiCorp – Get Started with Terraform on Azure](https://developer.hashicorp.com/terraform/tutorials/azure-get-started) | Interactive |
| PowerShell | [Automate Tasks with PowerShell – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/powershell/) | Interactive |
| Kubernetes Basics | [roadmap.sh – Kubernetes](https://roadmap.sh/kubernetes) | Interactive |
| Observability | [Monitor Resources with Azure Monitor – Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/) | Interactive |
| OpenTelemetry | [OpenTelemetry – Getting Started](https://opentelemetry.io/docs/getting-started/) | Docs |
| Generative AI for IT | [Generative AI for IT Pros – Pluralsight](https://app.pluralsight.com/paths/skill/generative-ai-for-it-pros) | Course |
| Azure Policy | [Microsoft Learn – Intro to Azure Policy](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-policy/) | Interactive |
| Cost Management | [Microsoft Learn – Control Azure Spending](https://learn.microsoft.com/en-us/training/paths/control-spending-manage-bills/) | Interactive |

### After completing Mid you should be able to:

- Build a YAML-based CI/CD pipeline with stages, jobs, and steps
- Deploy infrastructure with Bicep and Terraform using plan/apply and what-if workflows
- Write PowerShell automation scripts for Azure management tasks
- Explain the difference between a Pod, Deployment, and Service in Kubernetes
- Configure Kubernetes deployments, services, and basic ingress
- Set up Azure Monitor diagnostic settings, KQL alert rules, and dashboards
- Instrument an application with OpenTelemetry and explain the three pillars of observability
- Define and assign Azure Policy rules to enforce organisational standards across subscriptions

For deep explanations of each concept, see the [Mid Concept Reference](DevOps-Platform-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| System Design – 30 Concepts | [System Design was HARD until I Learned these 30 Concepts](https://www.youtube.com/watch?v=s9Qh9fWeOAk) | Video |
| Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| Domain-Driven Design | [DDD – Pluralsight Path](https://app.pluralsight.com/paths/skills/domain-driven-design) | Course |
| Enterprise GenAI Strategy | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) | Internal |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |
| Platform Engineering / Cloud Architecture | [Microsoft Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/) — Landing zones, governance, and cloud strategy | Docs |
| Architecture | [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) — Operational excellence, security, reliability, performance, cost | Docs |
| Pipeline Security | [Microsoft Learn – Secure DevOps (AZ-400)](https://learn.microsoft.com/en-us/training/paths/az-400-develop-security-compliance-plan/) — Security in pipelines, SAST, DAST, compliance | Course |
| Platform Engineering | [CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) — Industry definition of platform engineering | Paper |
| GitOps | [Flux – Getting Started](https://fluxcd.io/flux/get-started/) | Docs |
| Container Security | [Microsoft Learn – Container Image Security in ACR](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-best-practices#manage-image-vulnerability) | Docs |

### After completing Senior you should be able to:

- Design a multi-environment infrastructure strategy using landing zones and hub-and-spoke topology
- Define platform engineering standards and golden paths for a development organisation
- Apply cloud-native architecture patterns (microservices, event-driven, circuit breaker, sidecar) and evaluate their operational trade-offs
- Evaluate and harden the security posture of a pipeline: secrets management, SAST/DAST gates, supply chain integrity, and least-privilege service principal scoping
- Apply Domain-Driven Design to draw team and platform boundaries that reduce coupling
- Design and operate enterprise GenAI infrastructure on Azure, including private networking, quota management, and cost observability

For deep explanations of each concept, see the [Senior Concept Reference](DevOps-Platform-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
