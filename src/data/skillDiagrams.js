export const skillDiagrams = {
  'ai-engineer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["AI vs ML vs Deep Learning"]
      B2["Python Essentials"]
      B3["APIs Overview"]
      B4["Prompt Basics"]
      B5["ML Literacy"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B2 --> B5
    end

    subgraph Mid["Mid"]
      M1["ML Foundations"]
      M2["Context Engineering"]
      M3["RAG Development"]
      M4["LangGraph & Agents"]
      M5["Embeddings & Search"]
      M1 --> M2
      M2 --> M3
      M3 --> M5
      M1 --> M4
    end

    subgraph Senior["Senior"]
      S1["LLM Agent Architecture"]
      S2["Prompt Injection Security"]
      S3["RAG Pipeline Evaluation"]
      S4["Fine-Tuning & PEFT"]
      S5["Enterprise GenAI Strategy"]
      S1 --> S2
      S1 --> S3
      S3 --> S4
      S2 --> S5
    end

    B4 --> M1
    B5 --> M1
    M4 --> S1
    M3 --> S3`,

  'backend-developer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Programming Fundamentals"]
      B2["Python"]
      B3["APIs & HTTP"]
      B4["REST Concepts"]
      B5["Databases Intro"]
      B6["Web Framework Basics"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B2 --> B5
      B4 --> B6
    end

    subgraph Mid["Mid"]
      M1["API Design & Versioning"]
      M2["GraphQL"]
      M3["SQL Queries & Joins"]
      M4["OWASP Security"]
      M5["OAuth2 & JWT"]
      M6["Docker & Containerization"]
      M7["ORM & SQLAlchemy"]
      M8["System Design Basics"]
      M1 --> M2
      M3 --> M7
      M4 --> M5
      M6 --> M8
    end

    subgraph Senior["Senior"]
      S1["System Design - 30 Concepts"]
      S2["Microservices Architecture"]
      S3["Domain-Driven Design"]
      S4["Algorithm Optimization"]
      S5["Dynamic Programming"]
      S6["Observability & Logging"]
      S7["Security Review Leadership"]
      S1 --> S2
      S2 --> S3
      S1 --> S4
      S4 --> S5
      S1 --> S6
      S3 --> S7
    end

    B6 --> M1
    B5 --> M3
    M7 --> S1
    M5 --> S7`,

  'data-engineer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Python Fundamentals"]
      B2["SQL Fundamentals"]
      B3["Data Pipelines Overview"]
      B4["Relational Databases"]
      B5["Linux & CLI"]
      B6["Data Modelling"]
      B1 --> B2
      B2 --> B3
      B1 --> B4
      B4 --> B6
      B1 --> B5
    end

    subgraph Mid["Mid"]
      M1["Dimensional Modelling"]
      M2["dbt (data build tool)"]
      M3["Apache Spark"]
      M4["Apache Airflow"]
      M5["Azure Data Services"]
      M6["Docker Containerization"]
      M7["Data Quality & Testing"]
      M1 --> M2
      M3 --> M4
      M4 --> M5
      M6 --> M3
      M2 --> M7
    end

    subgraph Senior["Senior"]
      S1["Streaming & Kafka"]
      S2["Lakehouse Architecture"]
      S3["Delta Lake"]
      S4["Data Mesh Principles"]
      S5["DataOps & CI/CD"]
      S6["GDPR Compliance"]
      S7["Data Governance"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
      S5 --> S6
      S2 --> S7
    end

    B2 --> M1
    B4 --> M1
    M2 --> S2
    M3 --> S1`,

  'data-scientist': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Python Foundations"]
      B2["NumPy"]
      B3["Pandas Data Manipulation"]
      B4["Data Visualization"]
      B5["Statistics Basics"]
      B6["ML Overview"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B1 --> B5
      B5 --> B6
    end

    subgraph Mid["Mid"]
      M1["Feature Engineering"]
      M2["ML Algorithms"]
      M3["Intermediate ML"]
      M4["Relational Databases"]
      M5["SQL for Analytics"]
      M6["Time-Series Analysis"]
      M7["Class Imbalance"]
      M1 --> M3
      M2 --> M3
      M3 --> M6
      M4 --> M5
      M3 --> M7
    end

    subgraph Senior["Senior"]
      S1["MLOps Pipeline"]
      S2["RAG Systems"]
      S3["Context Engineering"]
      S4["LangGraph Agents"]
      S5["Explainable AI"]
      S6["Survival Analysis"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S1 --> S5
      S1 --> S6
    end

    B3 --> M1
    B6 --> M2
    M3 --> S1
    M6 --> S6`,

  'devops-platform-engineer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["DevOps Overview"]
      B2["Docker Basics"]
      B3["Linux Fundamentals"]
      B4["Bash Scripting"]
      B5["CI/CD Concepts"]
      B6["Git Fundamentals"]
      B1 --> B2
      B1 --> B3
      B3 --> B4
      B1 --> B5
      B6 --> B5
    end

    subgraph Mid["Mid"]
      M1["CI/CD Pipelines"]
      M2["Infrastructure as Code"]
      M3["Terraform & Bicep"]
      M4["PowerShell Automation"]
      M5["Kubernetes Basics"]
      M6["Azure Fundamentals"]
      M7["Observability & Monitoring"]
      M8["Azure Policy"]
      M1 --> M2
      M2 --> M3
      M3 --> M6
      M6 --> M7
      M5 --> M7
    end

    subgraph Senior["Senior"]
      S1["System Design"]
      S2["Multi-Environment Strategy"]
      S3["Platform Engineering Standards"]
      S4["Cloud-Native Patterns"]
      S5["Pipeline Security"]
      S6["GitOps"]
      S7["Container Security"]
      S1 --> S2
      S2 --> S3
      S4 --> S5
      S5 --> S7
      S3 --> S6
    end

    B2 --> M1
    B5 --> M1
    M3 --> S1
    M5 --> S4
    M7 --> S5`,

  'frontend-developer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["HTML Semantics"]
      B2["CSS Fundamentals"]
      B3["Flexbox & Grid"]
      B4["Responsive Design"]
      B5["JavaScript Basics"]
      B6["DOM Manipulation"]
      B7["Async & Promises"]
      B1 --> B2
      B2 --> B3
      B3 --> B4
      B5 --> B6
      B6 --> B7
    end

    subgraph Mid["Mid"]
      M1["React Fundamentals"]
      M2["Hooks - useState & useEffect"]
      M3["useContext & Custom Hooks"]
      M4["TypeScript"]
      M5["Jest Testing"]
      M6["React Testing Library"]
      M7["Playwright E2E"]
      M8["REST APIs"]
      M9["GraphQL"]
      M1 --> M2
      M2 --> M3
      M4 --> M5
      M5 --> M6
      M6 --> M7
      M8 --> M9
    end

    subgraph Senior["Senior"]
      S1["Web Performance"]
      S2["Core Web Vitals"]
      S3["Code Splitting & Lazy Loading"]
      S4["Caching Strategies"]
      S5["Web Accessibility - WCAG"]
      S6["ARIA Attributes"]
      S7["Next.js & SSR"]
      S8["Micro-frontends"]
      S9["API Design - Frontend Perspective"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S5 --> S6
      S5 --> S7
      S7 --> S8
    end

    B4 --> M1
    B7 --> M8
    M3 --> S1
    M4 --> S9`,

  'ml-engineer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["ML Fundamentals"]
      B2["Python for ML"]
      B3["NumPy"]
      B4["Pandas"]
      B5["Data Visualization"]
      B6["scikit-learn Basics"]
      B7["Supervised vs Unsupervised"]
      B2 --> B3
      B3 --> B4
      B4 --> B5
      B6 --> B7
      B1 --> B6
    end

    subgraph Mid["Mid"]
      M1["ML Algorithms"]
      M2["Feature Engineering"]
      M3["Intermediate ML"]
      M4["Neural Networks & PyTorch"]
      M5["MLflow Tracking"]
      M6["MLOps Pipeline"]
      M7["Model Deployment"]
      M1 --> M3
      M2 --> M3
      M3 --> M4
      M4 --> M5
      M5 --> M6
      M6 --> M7
    end

    subgraph Senior["Senior"]
      S1["Advanced MLOps"]
      S2["Model Monitoring"]
      S3["Data Drift Detection"]
      S4["Fairness & Bias"]
      S5["Algorithm Optimization"]
      S6["AI Governance"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S1 --> S5
      S5 --> S6
    end

    B7 --> M1
    M7 --> S1`,

  'marketing-technology-developer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Python Fundamentals"]
      B2["SQL Basics"]
      B3["APIs Overview"]
      B4["ML Overview"]
      B5["Generative AI Intro"]
      B1 --> B2
      B2 --> B3
      B1 --> B4
      B4 --> B5
    end

    subgraph Mid["Mid"]
      M1["Data Visualization"]
      M2["A/B Testing"]
      M3["Feature Engineering"]
      M4["ML Algorithms"]
      M5["Prompt Engineering"]
      M6["Context Engineering"]
      M7["Customer Data Platforms"]
      M8["Google Analytics 4"]
      M2 --> M8
      M3 --> M4
      M4 --> M5
      M5 --> M6
      M7 --> M8
    end

    subgraph Senior["Senior"]
      S1["RAG Systems"]
      S2["LangGraph Agents"]
      S3["AI Architecture Patterns"]
      S4["System Design"]
      S5["LLM Security"]
      S6["MLOps for Marketing"]
      S1 --> S2
      S2 --> S3
      S3 --> S4
      S4 --> S5
      S5 --> S6
    end

    B5 --> M5
    M6 --> S1`,

  'qa-test-engineer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["QA Fundamentals"]
      B2["Test Pyramid"]
      B3["Functional Testing"]
      B4["Bug Reporting"]
      B5["Test Case Design"]
      B6["HTTP & Network"]
      B7["Browser DevTools"]
      B1 --> B2
      B1 --> B3
      B1 --> B4
      B3 --> B5
      B6 --> B7
    end

    subgraph Mid["Mid"]
      M1["Playwright E2E"]
      M2["API Testing & Postman"]
      M3["Cypress"]
      M4["Python for Testing"]
      M5["Performance Testing - k6"]
      M6["BDD & Gherkin"]
      M7["CI/CD Integration"]
      M8["Contract Testing - Pact"]
      M1 --> M6
      M2 --> M7
      M4 --> M5
      M6 --> M7
    end

    subgraph Senior["Senior"]
      S1["Test Strategy & Architecture"]
      S2["Shift-Left Testing"]
      S3["Accessibility Testing - WCAG"]
      S4["Security Testing - OWASP"]
      S5["Visual Regression Testing"]
      S6["Quality Metrics"]
      S7["AI-Assisted Testing"]
      S1 --> S2
      S1 --> S3
      S1 --> S4
      S3 --> S5
      S2 --> S6
      S4 --> S7
    end

    B5 --> M1
    B5 --> M2
    M1 --> S1
    M2 --> S4`,

  'security-engineer': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["Security Fundamentals"]
      B2["CIA Triad"]
      B3["OWASP Top 10"]
      B4["Web Attacks"]
      B5["Network Fundamentals"]
      B6["Linux Security"]
      B7["Cryptography Basics"]
      B8["Hands-on Labs"]
      B1 --> B3
      B1 --> B4
      B1 --> B5
      B5 --> B6
      B1 --> B7
      B3 --> B8
    end

    subgraph Mid["Mid"]
      M1["Penetration Testing"]
      M2["Threat Modelling"]
      M3["Secure SDLC"]
      M4["Azure Security"]
      M5["Identity & Access Mgmt"]
      M6["Container Security"]
      M7["API Security"]
      M8["SAST/DAST"]
      M2 --> M3
      M1 --> M3
      M4 --> M5
      M6 --> M7
      M8 --> M7
    end

    subgraph Senior["Senior"]
      S1["Zero Trust Architecture"]
      S2["MITRE ATT&CK"]
      S3["Incident Response"]
      S4["Supply Chain Security"]
      S5["LLM Security"]
      S6["Security Architecture"]
      S7["Kubernetes Security"]
      S8["Compliance - DORA/NIS2"]
      S1 --> S6
      S2 --> S3
      S4 --> S1
      S5 --> S6
      S6 --> S8
    end

    B3 --> M2
    B7 --> M4
    M5 --> S1
    M1 --> S2`,

  'tech-lead-architect': `flowchart LR
    subgraph Beginner["Beginner"]
      B1["System Design Intro"]
      B2["Distributed Systems"]
      B3["DevOps Literacy"]
      B4["API Styles"]
      B5["LLM Fundamentals"]
      B6["Branching Strategy"]
      B7["Code Review"]
      B1 --> B2
      B1 --> B3
      B4 --> B1
      B2 --> B5
    end

    subgraph Mid["Mid"]
      M1["System Design - 30 Concepts"]
      M2["Domain-Driven Design"]
      M3["Architecture Patterns"]
      M4["Prompt Engineering"]
      M5["Leading Teams"]
      M6["Security Architecture"]
      M7["Well-Architected Framework"]
      M8["Architecture Decision Records"]
      M1 --> M2
      M2 --> M3
      M1 --> M6
      M3 --> M7
      M7 --> M8
    end

    subgraph Senior["Senior"]
      S1["Enterprise GenAI Strategy"]
      S2["LLM Agent Architecture"]
      S3["LLM Security Patterns"]
      S4["Context Engineering"]
      S5["Incident Management"]
      S6["Blameless Post-mortems"]
      S1 --> S2
      S2 --> S3
      S3 --> S5
      S4 --> S2
      S5 --> S6
    end

    B1 --> M1
    B5 --> S1
    M3 --> S2`
};
