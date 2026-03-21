# Data Engineer – Learning Path

Make sure you have completed the [Prerequisites](Prerequisites.md) before starting this path.

Data Engineers design, build, and maintain the infrastructure and pipelines that move, transform, and store data at scale. The role covers data modelling, ETL/ELT pipelines, data warehousing, streaming, orchestration, data quality, and platform tooling.

---

## Beginner

| Topic | Resource | Type |
|---|---|---|
| Python Foundations | [Python Essentials – Pluralsight](https://app.pluralsight.com/paths/skills/python-essentials) | Course |
| Python Foundations | [freeCodeCamp – Python](https://www.freecodecamp.org/learn/python-v9/) | Interactive |
| SQL Fundamentals | [SQLBolt – Interactive SQL Tutorial](https://sqlbolt.com/) | Interactive |
| SQL Fundamentals | [Kaggle Learn – Intro to SQL](https://www.kaggle.com/learn/intro-to-sql) | Interactive |
| Data Engineering Overview | [Data Engineering Roadmap](https://roadmap.sh/dataengineering) | Interactive |
| Relational Databases | [freeCodeCamp – Relational Databases](https://www.freecodecamp.org/learn/relational-databases-v9/) | Interactive |
| Data Pipelines Overview | [What is a Data Pipeline?](https://www.youtube.com/watch?v=VtzvF17ysbc) | Video |
| Linux & CLI Basics | [roadmap.sh – Linux](https://roadmap.sh/linux) | Interactive |

### After completing Beginner you should be able to:

- Write Python scripts to read, transform, and write structured data using built-in types and standard library modules
- Write SQL queries including SELECT, WHERE, JOIN, GROUP BY, and ORDER BY against a relational database
- Explain the difference between relational and non-relational databases and identify when each is appropriate
- Describe what a data pipeline is and identify the stages of extract, transform, and load (ETL)
- Navigate the Linux file system and use the command line for basic file operations
- Explain what data modelling means and why a well-structured schema matters for downstream consumers
- Describe the role of a Data Engineer within a data team and how it differs from Data Scientist and Data Analyst

For deep explanations of each concept, see the [Beginner Concept Reference](Data-Engineer/Beginner.md).

---

## Mid

| Topic | Resource | Type |
|---|---|---|
| Data Warehousing | [Kimball Dimensional Modelling – Overview](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/) | Docs |
| Data Warehousing | [Data Warehouse Toolkit Concepts (30 min)](https://www.youtube.com/watch?v=lWPiSZf7-uQ) | Video |
| dbt (data build tool) | [dbt – Getting Started](https://docs.getdbt.com/guides) | Interactive |
| Apache Spark | [Apache Spark – Quick Start](https://spark.apache.org/docs/latest/quick-start.html) | Docs |
| Apache Spark | [Apache Spark – Official Documentation](https://spark.apache.org/docs/latest/) | Docs |
| Apache Airflow | [Apache Airflow – Official Tutorial](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html) | Docs |
| Azure Data Services | [Microsoft Learn – Azure Data Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/) | Interactive |
| Docker | [Learn Docker in 7 Easy Steps](https://www.youtube.com/watch?v=gAkwW2tuIqE) | Video |
| Data Quality | [Great Expectations – Getting Started](https://docs.greatexpectations.io/docs/) | Docs |
| Data Manipulation | [Kaggle Learn – Advanced SQL](https://www.kaggle.com/learn/advanced-sql) | Interactive |

### After completing Mid you should be able to:

- Design a dimensional model using star schema with fact and dimension tables appropriate for analytical workloads
- Build and schedule data transformation pipelines using dbt with tests and documentation
- Write PySpark jobs to process large datasets using transformations, actions, and DataFrames
- Define and schedule DAGs in Apache Airflow to orchestrate multi-step data pipelines
- Provision and configure Azure data services (Data Factory, Synapse) for a basic data integration workflow
- Implement data quality checks using validation frameworks and explain why data quality must be built into pipelines
- Containerise a data pipeline application using Docker

For deep explanations of each concept, see the [Mid Concept Reference](Data-Engineer/Mid.md).

---

## Senior

| Topic | Resource | Type |
|---|---|---|
| Streaming & Kafka | [Confluent – Apache Kafka Fundamentals](https://developer.confluent.io/courses/apache-kafka/events/) | Course |
| Streaming & Kafka | [Kafka in 100 Seconds](https://www.youtube.com/watch?v=uvb00oaa3k8) | Video |
| Lakehouse Architecture | [Databricks – Lakehouse Fundamentals](https://www.databricks.com/learn/training/lakehouse-fundamentals) | Course |
| Delta Lake | [Delta Lake – Official Documentation](https://docs.delta.io/latest/index.html) | Docs |
| Data Mesh | [Data Mesh Principles – Zhamak Dehghani](https://martinfowler.com/articles/data-mesh-principles.html) | Docs |
| DataOps & CI/CD | [Microsoft Learn – DataOps for Azure](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/dataops) | Docs |
| GenAI for Data Engineering | [Enterprise Strategy for GenAI – Pluralsight](https://app.pluralsight.com/paths/skills/enterprise-strategy-for-generative-ai-adoption) | Course |
| AI Architecture Patterns | [Architecture Patterns for AI Systems – Pluralsight](https://www.pluralsight.com/courses/architecture-patterns-ai-systems) | Course |
| AI Policy | [AI Policy – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) (Internal -- requires company access) | Internal |
| AI Checklist | [AI Checklista – Internal](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/SitePages/AI-Checklista.aspx) (Internal -- requires company access) | Internal |
| Secure AI Framework | [Secure AI Framework](Prerequisites/Secure-AI-Framework.md) | Guide |
| Data Governance | [Microsoft Learn – Data Governance with Microsoft Purview](https://learn.microsoft.com/en-us/training/paths/governance-purview/) | Interactive |
| GDPR for Data Engineers | [GDPR Overview – gdpr-info.eu](https://gdpr-info.eu/) | Reference |
| Microsoft Fabric | [Microsoft Learn – Get Started with Microsoft Fabric](https://learn.microsoft.com/en-us/training/paths/get-started-fabric/) | Interactive |
| Change Data Capture | [Debezium – Getting Started](https://debezium.io/documentation/reference/stable/tutorial.html) | Docs |
| AI-Assisted Development | [Advanced AI-Assisted Development – Pluralsight](https://www.pluralsight.com/courses/advanced-ai-assisted-development) | Course |

### After completing Senior you should be able to:

- Design and implement a real-time streaming pipeline using Kafka or Azure Event Hubs for event-driven data ingestion
- Evaluate the trade-offs between a traditional data warehouse, a data lake, and a lakehouse architecture and recommend the appropriate pattern for a given use case
- Apply Delta Lake features — ACID transactions, time travel, schema enforcement — to build reliable data lakehouse storage
- Articulate the principles of Data Mesh (domain ownership, data as a product, self-serve platform, federated governance) and assess organisational readiness
- Design and implement DataOps practices including version-controlled pipelines, automated testing, and CI/CD for data workflows
- Apply AI governance and policy requirements to data engineering projects involving GenAI components
- Design data pipelines that comply with GDPR requirements including data minimisation, purpose limitation, and right to erasure

For deep explanations of each concept, see the [Senior Concept Reference](Data-Engineer/Senior.md).

---

Return to the [Role Roadmap index](README.md).
