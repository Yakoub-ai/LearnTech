# Data Engineer – Senior Concept Reference


This document explains the advanced concepts covered in the Senior level of the Data Engineer learning path.

---

## Streaming and Apache Kafka – Real-Time Data Pipelines

Apache Kafka is a distributed event streaming platform designed for high-throughput, low-latency data pipelines. Unlike batch processing (where data is collected and processed on a schedule), streaming processes data continuously as it arrives. Kafka acts as a durable, distributed commit log: producers write events to topics, and consumers read from those topics, each at their own pace and position.

Kafka's architecture consists of brokers (servers that store and serve data), topics (logical categories of events), partitions (the unit of parallelism within a topic), producers (applications that write events), and consumers (applications that read events). Events are immutable and ordered within a partition. Consumer groups enable parallel processing: each partition is assigned to exactly one consumer in a group, and Kafka automatically rebalances when consumers join or leave.

For a Data Engineer, Kafka enables architectures where data is processed as soon as it is produced — enabling real-time dashboards, fraud detection, live recommendations, and event-driven microservices. Azure Event Hubs provides a Kafka-compatible managed alternative in the Azure ecosystem.

**Why it matters:** Batch processing introduces latency — hours or even days between when data is generated and when it is available for analysis. Streaming eliminates this latency for use cases where timeliness is critical. Understanding Kafka and stream processing is essential for building modern data platforms that serve both batch and real-time consumers.

**Key things to understand:**

- Topics and partitions: topics are logical groupings; partitions provide parallelism and ordering guarantees within a partition (not across partitions)
- Producers and consumers: producers write events (key-value pairs with optional headers); consumers read events from a specific offset and track their position
- Consumer groups: multiple consumers in a group share the partitions of a topic; each partition is consumed by exactly one group member
- At-least-once, at-most-once, and exactly-once delivery semantics: understand the trade-offs and when each is appropriate
- Event schemas: use a schema registry (e.g., Confluent Schema Registry) with Avro or Protobuf to enforce compatibility between producers and consumers
- Kafka Connect: a framework for streaming data between Kafka and external systems (databases, cloud storage, search indexes) without writing custom code

**Code walkthrough:**

```python
# Step 1: Real-time pipeline — consume Kafka events and write to Delta Lake
# Why: streaming enables near-real-time analytics instead of daily batch delays
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder \
    .appName("realtime_claims") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .getOrCreate()

# Step 2: Read from Kafka as a structured stream
# Why: Spark Structured Streaming provides exactly-once semantics
raw_stream = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "kafka:9092")
    .option("subscribe", "raw.claims")
    .option("startingOffsets", "earliest")
    .load()
)

# Step 3: Parse the JSON events and apply schema
from pyspark.sql.types import StructType, StructField, StringType, DoubleType

claim_schema = StructType([
    StructField("claim_id", StringType()),
    StructField("customer_id", StringType()),
    StructField("amount", DoubleType()),
    StructField("claim_type", StringType()),
    StructField("event_time", StringType()),
])

parsed = (
    raw_stream
    .selectExpr("CAST(value AS STRING)")
    .select(F.from_json("value", claim_schema).alias("data"))
    .select("data.*")
    .withColumn("event_time", F.to_timestamp("event_time"))
    .withColumn("processed_at", F.current_timestamp())
)

# Step 4: Write to Delta Lake with checkpointing
# Why: checkpointing ensures exactly-once delivery and recovery after failures
query = (
    parsed.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "/data/checkpoints/claims")
    .start("/data/bronze/claims")
)

query.awaitTermination()
```

**Common pitfalls:**

- Choosing too few partitions, limiting consumer parallelism; choosing too many, creating overhead. Start with the expected peak throughput and adjust.
- Not handling consumer rebalancing gracefully; when partitions are reassigned, in-progress processing must be handled to avoid data loss or duplication.
- Using Kafka as a database; Kafka is a log, not a query engine. Store data in a purpose-built system for random access queries.
- Ignoring schema evolution; changing event schemas without a compatibility strategy breaks consumers.

---

## Lakehouse Architecture – Unifying the Data Warehouse and Data Lake

The lakehouse architecture combines the best features of data warehouses (structured data, ACID transactions, SQL analytics) with data lakes (scalable storage, support for unstructured data, open formats). The core idea is to store all data in open file formats (Parquet, ORC) on cheap cloud object storage (Azure Data Lake Storage, S3) while adding a metadata and transaction layer (Delta Lake, Apache Iceberg, Apache Hudi) that provides the reliability and query performance traditionally associated with data warehouses.

Before the lakehouse, organisations maintained two separate systems: a data lake for raw, unstructured data and a data warehouse for curated, structured data. This led to data duplication, complex ETL between the two systems, and inconsistency when the same data existed in different forms in different places. The lakehouse eliminates this dual architecture by making the lake reliable enough to serve as the warehouse.

**Why it matters:** The lakehouse is the dominant architectural pattern for modern data platforms. Databricks, Microsoft Fabric, and most cloud data strategies are converging on this model. Understanding the lakehouse — and the tradeoffs it makes compared to traditional warehouses and lakes — is essential for making sound architectural decisions.

**Key things to understand:**

- Open file formats: Parquet (columnar, compressed, the standard for analytical data), ORC (similar to Parquet, common in Hadoop ecosystems)
- Table formats: Delta Lake, Apache Iceberg, and Apache Hudi add ACID transactions, time travel, schema enforcement, and efficient upserts on top of Parquet files
- Separation of storage and compute: data lives in cloud object storage; compute engines (Spark, SQL engines) are provisioned independently and scaled as needed
- Medallion architecture: a common lakehouse pattern with Bronze (raw ingested data), Silver (cleaned and conformed data), and Gold (aggregated, business-ready data) layers
- Schema enforcement and schema evolution: Delta Lake can enforce that writes conform to a defined schema and evolve the schema safely without breaking readers
- Time travel: query historical versions of a table by timestamp or version number; essential for debugging, auditing, and reproducibility

**Code walkthrough:**

```python
# Step 1: Medallion architecture — Bronze, Silver, Gold layers
# Why: layered processing separates raw ingestion from business-ready data
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from delta.tables import DeltaTable

spark = SparkSession.builder.appName("lakehouse").getOrCreate()

# --- BRONZE: raw data, as-is from the source ---
bronze_df = spark.read.parquet("/data/raw/policies/")
bronze_df.write.format("delta").mode("append").save("/data/bronze/policies")

# --- SILVER: cleaned, deduplicated, typed correctly ---
bronze = spark.read.format("delta").load("/data/bronze/policies")
silver = (
    bronze
    .dropDuplicates(["policy_id"])
    .withColumn("start_date", F.to_date("start_date"))
    .withColumn("premium", F.col("premium").cast("decimal(10,2)"))
    .filter(F.col("premium") > 0)
)
silver.write.format("delta").mode("overwrite").save("/data/silver/policies")

# --- GOLD: aggregated, business-ready data ---
gold = (
    spark.read.format("delta").load("/data/silver/policies")
    .groupBy("product_type", F.year("start_date").alias("year"))
    .agg(
        F.count("*").alias("policy_count"),
        F.sum("premium").alias("total_premium"),
        F.avg("premium").alias("avg_premium"),
    )
)
gold.write.format("delta").mode("overwrite").save("/data/gold/policy_summary")

# Step 2: Time travel — query a previous version for debugging
# Why: if today's load introduced bad data, you can compare against yesterday
previous_version = (
    spark.read.format("delta")
    .option("versionAsOf", 5)  # or timestampAsOf
    .load("/data/silver/policies")
)
```

**Common pitfalls:**

- Treating the lakehouse as "just a data lake with a fancy name"; the transaction and metadata layer is what makes it reliable, and skipping it means you still have an unreliable lake.
- Not implementing the medallion architecture (or a similar layered approach), resulting in a flat lake where raw and curated data are indistinguishable.
- Ignoring file compaction; Delta Lake and Iceberg accumulate small files over time that degrade query performance. Schedule regular `OPTIMIZE` / compaction operations.
- Assuming that lakehouse performance matches a dedicated data warehouse for all query patterns; complex interactive queries may still benefit from a dedicated SQL engine.

---

## Delta Lake – Reliable Data Storage at Scale

Delta Lake is an open-source storage layer that brings ACID transactions, scalable metadata handling, and time travel to cloud data lakes. Built on top of Parquet files, Delta Lake uses a transaction log (`_delta_log/`) to track every change to a table, enabling features that plain Parquet files cannot provide: atomic writes, consistent reads, schema enforcement, and the ability to roll back to previous versions.

For a Data Engineer, Delta Lake solves the fundamental reliability problem of data lakes. Without a transaction layer, concurrent writes can corrupt data, failed jobs can leave partial results, and there is no way to roll back a bad load. Delta Lake makes the data lake transactionally reliable, bringing it closer to the guarantees that traditional data warehouses provide.

**Why it matters:** Delta Lake is the default table format for Databricks and is widely supported across the Spark ecosystem. Understanding how Delta Lake works — transactions, versioning, merge operations — is essential for building reliable data pipelines on any lakehouse platform.

**Key things to understand:**

- Transaction log: every write to a Delta table creates a new JSON commit file in `_delta_log/`; the log is the source of truth for the table's state
- ACID transactions: writes are atomic (all or nothing) and isolated (concurrent readers see a consistent snapshot)
- Time travel: `SELECT * FROM table VERSION AS OF 5` or `TIMESTAMP AS OF '2024-01-01'`; enables auditing, debugging, and rollback
- `MERGE INTO`: Delta Lake's upsert command; matches rows between a source and target and performs insert, update, or delete operations in a single atomic transaction
- Schema enforcement (`mergeSchema` and `overwriteSchema`): prevents writes with incompatible schemas from corrupting the table
- `OPTIMIZE` and `ZORDER`: compact small files and co-locate related data for faster queries

**Code walkthrough:**

```python
# Step 1: Delta Lake MERGE (upsert) — the core CDC-to-lake operation
# Why: MERGE atomically inserts new rows and updates existing ones
from pyspark.sql import SparkSession
from delta.tables import DeltaTable

spark = SparkSession.builder.appName("delta_ops").getOrCreate()

# Existing table in the lakehouse
target = DeltaTable.forPath(spark, "/data/silver/customers")

# New batch of changes from the source system
source = spark.read.parquet("/data/staging/customer_changes/")

# Step 2: MERGE — match on business key, update if changed, insert if new
# Why: this is idempotent — running it twice produces the same result
target.alias("t").merge(
    source.alias("s"),
    "t.customer_id = s.customer_id"
).whenMatchedUpdate(
    condition="s.updated_at > t.updated_at",
    set={
        "name": "s.name",
        "email": "s.email",
        "updated_at": "s.updated_at",
    }
).whenNotMatchedInsertAll().execute()

# Step 3: OPTIMIZE — compact small files for faster reads
# Why: streaming and frequent appends create many small files
spark.sql("OPTIMIZE delta.`/data/silver/customers`")

# Step 4: ZORDER — co-locate data by frequently queried columns
# Why: queries filtering on customer_id will read fewer files
spark.sql("""
    OPTIMIZE delta.`/data/silver/customers`
    ZORDER BY (customer_id)
""")

# Step 5: VACUUM — remove old files to reclaim storage
# Why: time travel keeps old versions; VACUUM cleans up beyond retention
spark.sql("VACUUM delta.`/data/silver/customers` RETAIN 168 HOURS")
```

**Common pitfalls:**

- Not running `OPTIMIZE` regularly, allowing small files to accumulate and degrade read performance.
- Using `overwrite` mode when `merge` would be more appropriate; overwrite replaces the entire table, while merge updates only the changed rows.
- Not setting a retention period for time travel; keeping all history indefinitely consumes storage. Use `VACUUM` to clean up old files.
- Ignoring partition strategy; over-partitioning creates many small files, while under-partitioning creates few large files — both degrade performance.

---

## Data Mesh – Decentralised Data Architecture

Data Mesh is an architectural and organisational paradigm proposed by Zhamak Dehghani that decentralises data ownership from a central data team to the domain teams that produce the data. It is built on four principles: domain ownership (each domain owns and serves its data as a product), data as a product (data is treated with the same rigour as a customer-facing product — discoverable, documented, reliable), self-serve data platform (a central platform team provides the infrastructure and tooling that domain teams use), and federated computational governance (policies are defined centrally but enforced computationally through the platform).

Data Mesh is a response to the scaling limitations of centralised data architectures. In traditional architectures, a central data team is responsible for ingesting, transforming, and serving data from all domains. This creates a bottleneck: the central team cannot keep up with the demands of all consumers, domain knowledge is lost in translation, and data quality suffers because the team that knows the data best is not responsible for it.

**Why it matters:** Data Mesh is increasingly adopted by large organisations as a strategy for scaling their data platforms. Whether you adopt Data Mesh fully or selectively apply its principles, understanding the model helps you reason about the organisational and architectural challenges of data at scale.

**Key things to understand:**

- Domain ownership: the team that produces the data is responsible for making it available as a reliable, well-documented data product
- Data as a product: each data product has an owner, an SLA, documentation, a schema, and quality guarantees — just like a software product
- Self-serve data platform: a central platform team provides tooling for storage, compute, pipeline orchestration, cataloguing, and access control so domain teams do not need to build infrastructure from scratch
- Federated governance: policies (naming conventions, security standards, privacy rules) are defined centrally but enforced automatically through the platform
- Data contracts: explicit agreements between data producers and consumers about the schema, semantics, and quality of a data product
- Data Mesh does not mean no central team; it means the central team's role shifts from building all pipelines to building the platform that enables domain teams

**Code walkthrough:**

```python
# Step 1: Data contract — explicit agreement between producer and consumer
# Why: data contracts prevent breaking changes from propagating downstream
from dataclasses import dataclass, field
from typing import Optional
import json

@dataclass
class DataContract:
    """A machine-readable agreement for a data product."""
    name: str
    owner: str
    description: str
    schema: dict                    # expected columns and types
    sla: dict                       # freshness and availability guarantees
    quality_rules: list[dict]       # automated quality expectations
    version: str = "1.0.0"

# Step 2: Define a contract for the "claims" data product
claims_contract = DataContract(
    name="claims.completed",
    owner="claims-domain-team",
    description="Completed insurance claims, updated within 1 hour of source",
    schema={
        "claim_id": {"type": "string", "nullable": False},
        "customer_id": {"type": "string", "nullable": False},
        "amount": {"type": "decimal(12,2)", "nullable": False},
        "status": {"type": "string", "nullable": False},
        "completed_at": {"type": "timestamp", "nullable": False},
    },
    sla={
        "freshness_minutes": 60,     # data must be < 1 hour old
        "availability": "99.5%",
        "update_frequency": "streaming",
    },
    quality_rules=[
        {"rule": "amount > 0", "severity": "critical"},
        {"rule": "status IN ('completed')", "severity": "critical"},
        {"rule": "claim_id IS UNIQUE", "severity": "critical"},
    ],
)

# Step 3: Validate data against the contract before publishing
# Why: the producing team is responsible for data quality at the boundary
def validate_against_contract(df, contract: DataContract) -> list[str]:
    violations = []
    for col, spec in contract.schema.items():
        if col not in df.columns:
            violations.append(f"Missing required column: {col}")
        if not spec["nullable"] and df[col].isna().any():
            violations.append(f"NULL values in non-nullable column: {col}")
    return violations

print(json.dumps(claims_contract.__dict__, indent=2, default=str))
```

**Common pitfalls:**

- Adopting Data Mesh terminology without changing the organisational structure; Data Mesh is an organisational change as much as a technical one.
- Assuming every organisation needs Data Mesh; it solves scaling problems that small or mid-size data teams may not have.
- Neglecting the self-serve platform; without robust tooling, domain teams cannot realistically own their data products.
- Treating Data Mesh as a justification for removing all central oversight; federated governance is still governance.

---

## DataOps – CI/CD and Engineering Practices for Data

DataOps applies the principles of DevOps — version control, CI/CD, automated testing, monitoring, and collaboration — to data engineering. The goal is to make data pipelines as reliable, reproducible, and rapidly deployable as application code. DataOps treats data pipelines as software: they are version-controlled, tested, reviewed, and deployed through automated pipelines.

In practice, DataOps means: pipeline code (dbt models, Spark jobs, Airflow DAGs) is stored in Git and reviewed through pull requests. Automated tests (unit tests for transformation logic, data quality tests for output datasets) run in CI on every change. Deployments to staging and production are automated through CD pipelines. Monitoring and alerting detect data quality issues, pipeline failures, and SLA breaches in real time.

**Why it matters:** Without DataOps, data pipelines are deployed manually, tested ad hoc, and monitored by checking dashboards occasionally. This leads to frequent breakages, slow recovery, and a data platform that cannot keep pace with business demands. DataOps brings the engineering discipline that turns a fragile data platform into a reliable one.

**Key things to understand:**

- Version control for everything: dbt models, Airflow DAGs, Spark jobs, infrastructure-as-code (Terraform/Bicep), schema definitions, and data quality expectations
- CI for data: run linting, unit tests, and dbt `compile`/`test` on every pull request; catch errors before they reach production
- CD for data: automated deployment of pipeline changes to staging environments with integration tests, followed by promotion to production
- Data observability: monitoring data freshness (is data arriving on time?), volume (is the expected number of rows present?), schema changes (have columns been added/removed/renamed?), and quality (do values meet expectations?)
- Infrastructure as code: define data platform infrastructure (storage accounts, Spark clusters, databases) in code for reproducibility and auditability
- Automated rollback: when a deployment causes data quality issues, the ability to quickly roll back to the previous version is essential

**Code walkthrough:**

```python
# Step 1: Data lineage tracking — know where every piece of data came from
# Why: lineage answers "what data was used to produce this output?"
#      and "what downstream reports break if this source changes?"
from dataclasses import dataclass, field
from datetime import datetime, timezone

@dataclass
class LineageNode:
    name: str
    node_type: str  # "source", "transformation", "target"
    upstream: list[str] = field(default_factory=list)
    downstream: list[str] = field(default_factory=list)

class LineageTracker:
    def __init__(self):
        self.nodes: dict[str, LineageNode] = {}

    def register(self, name: str, node_type: str, depends_on: list[str] = None):
        node = LineageNode(name=name, node_type=node_type)
        if depends_on:
            node.upstream = depends_on
            for parent in depends_on:
                if parent in self.nodes:
                    self.nodes[parent].downstream.append(name)
        self.nodes[name] = node

    def impact_analysis(self, source_name: str) -> list[str]:
        """Find all downstream assets affected if a source changes."""
        affected = []
        to_visit = [source_name]
        while to_visit:
            current = to_visit.pop(0)
            for child in self.nodes.get(current, LineageNode("", "")).downstream:
                if child not in affected:
                    affected.append(child)
                    to_visit.append(child)
        return affected

# Step 2: Register the lineage for a claims pipeline
lineage = LineageTracker()
lineage.register("raw.claims_db", "source")
lineage.register("bronze.claims", "transformation", depends_on=["raw.claims_db"])
lineage.register("silver.claims", "transformation", depends_on=["bronze.claims"])
lineage.register("gold.claims_summary", "target", depends_on=["silver.claims"])
lineage.register("dashboard.claims_kpi", "target", depends_on=["gold.claims_summary"])

# Step 3: Impact analysis — what breaks if the source schema changes?
impact = lineage.impact_analysis("raw.claims_db")
print(f"Affected assets: {impact}")
# ['bronze.claims', 'silver.claims', 'gold.claims_summary', 'dashboard.claims_kpi']
```

**Common pitfalls:**

- Applying CI/CD to application code but not to data pipeline code, creating a two-tier system where data pipelines are less reliable.
- Not testing data transformations; "it ran without errors" is not the same as "it produced correct output."
- Monitoring only pipeline execution status (success/failure) without monitoring data quality; a pipeline can succeed while producing incorrect data.
- Over-engineering the DataOps platform before the team has the basics (version control, code review, basic testing) in place.

---

## GenAI for Data Engineering – AI-Assisted Development and Architecture

Generative AI is transforming data engineering in two ways: as a tool that assists Data Engineers in their daily work (writing SQL, generating pipeline code, debugging, documentation) and as a workload that data engineers must build infrastructure to support (vector databases, embedding pipelines, RAG systems, LLM serving).

As an assistive tool, GenAI accelerates routine tasks: writing dbt models from specifications, generating Spark transformations, explaining complex SQL queries, and creating documentation. As a workload, GenAI introduces new data engineering challenges: managing unstructured data at scale, building embedding and indexing pipelines, implementing retrieval-augmented generation (RAG) architectures, and ensuring data governance over AI training data.

**Why it matters:** Senior Data Engineers must understand both sides: how to use GenAI tools to be more productive, and how to build the data infrastructure that GenAI applications require. The organisations that can build reliable data foundations for GenAI will have a significant competitive advantage.

**Key things to understand:**

- AI-assisted SQL and pipeline development: use LLM tools to generate first drafts of dbt models, Spark jobs, and SQL queries from natural language specifications; always review and test the output
- RAG (Retrieval-Augmented Generation): an architecture where an LLM's response is grounded in retrieved documents; Data Engineers build the embedding pipeline, vector database, and retrieval infrastructure
- Vector databases and embeddings: embeddings are dense numerical representations of text; vector databases (Pinecone, Weaviate, Azure AI Search) enable similarity search over embeddings
- Data governance for AI: tracking data lineage through AI pipelines, ensuring training data complies with privacy regulations, and documenting what data was used to build AI features
- Cost management: GenAI workloads (embedding generation, LLM inference) can be expensive at scale; understanding token costs, batching strategies, and caching is important
- The organisation's AI Policy, AI Checklist, and Secure AI Framework define the governance requirements for any project involving GenAI

**Code walkthrough:**

```python
# Step 1: Cost optimization — analyse query costs and resource usage
# Why: cloud data platforms charge per compute hour and per TB scanned;
#      small optimisations multiply across thousands of daily queries
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("cost_analysis").getOrCreate()

# Step 2: Partition pruning check — ensure queries filter on partition columns
# Why: without partition filters, the query scans ALL data (expensive)
def analyse_query_cost(table_path: str, filter_col: str, filter_val: str):
    """Compare scan size with and without partition filter."""
    # Full scan — reads every file
    full_df = spark.read.format("delta").load(table_path)
    full_count = full_df.count()

    # Filtered scan — reads only matching partitions
    filtered_df = full_df.filter(f"{filter_col} = '{filter_val}'")
    filtered_count = filtered_df.count()

    print(f"Full table: {full_count} rows")
    print(f"Filtered: {filtered_count} rows")
    print(f"Scan reduction: {(1 - filtered_count/full_count)*100:.1f}%")

# Step 3: Orchestration pattern — fan-out/fan-in for parallel processing
# Why: processing domains independently and merging results is faster
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

with DAG("parallel_domain_processing", start_date=datetime(2025, 1, 1)) as dag:
    # Fan-out: process each domain in parallel
    domains = ["claims", "policies", "customers"]
    domain_tasks = []
    for domain in domains:
        task = PythonOperator(
            task_id=f"process_{domain}",
            python_callable=lambda d=domain: print(f"Processing {d}..."),
        )
        domain_tasks.append(task)

    # Fan-in: merge results after all domains complete
    merge = PythonOperator(
        task_id="merge_results",
        python_callable=lambda: print("Merging all domain results..."),
    )

    # All domain tasks run in parallel, then merge runs
    domain_tasks >> merge
```

**Common pitfalls:**

- Trusting AI-generated SQL or pipeline code without thorough review and testing; LLMs produce plausible but potentially incorrect code.
- Building GenAI infrastructure without a clear use case and business justification; the infrastructure is expensive and complex.
- Ignoring data governance when building AI pipelines; training data provenance, PII handling, and model transparency are regulatory requirements, not optional extras.
- Not involving the security team when building RAG systems; prompt injection and data leakage are real risks that require security review.

---

## Data Governance and GDPR – Compliance-Driven Pipeline Design

Data governance is the set of policies, processes, and standards that ensure data is managed as a strategic asset — discoverable, trustworthy, secure, and compliant with regulations. For data engineers, governance is not an abstract management concept; it directly shapes how pipelines are designed, how data is stored and accessed, and what metadata must be captured.

Microsoft Purview provides the governance tooling in Azure: a unified data catalog for discovering and classifying data across the estate, automated sensitive data scanning, data lineage tracking, and policy management. For LF, Purview is the central tool for understanding what data exists, where it lives, who owns it, and how it flows through the organisation.

GDPR (General Data Protection Regulation) is the EU regulation that governs how personal data is collected, processed, stored, and deleted. For a Swedish insurance company handling sensitive personal data — health information, financial records, claims history — GDPR compliance is not optional and carries penalties of up to 4% of global turnover or 20 million EUR.

**Why it matters:** Data engineers build the pipelines that move and transform personal data. If those pipelines do not implement GDPR requirements — data minimisation, purpose limitation, storage limitation, and the right to erasure — the organisation is exposed to regulatory risk. Governance and compliance must be built into pipeline design from the start, not bolted on afterwards.

**Key things to understand:**

- Data minimisation: only collect and process the personal data that is strictly necessary for the stated purpose. Pipelines should not carry forward fields "just in case" — every personal data field must have a documented purpose
- Purpose limitation: personal data collected for one purpose cannot be reused for a different purpose without consent. Pipeline design must enforce this — a marketing analytics pipeline should not have access to claims health data
- Storage limitation: personal data must not be kept longer than necessary. Pipelines must implement retention policies — automated deletion or anonymisation after the retention period expires
- Right to erasure (right to be forgotten): data subjects can request deletion of their personal data. Data engineers must design pipelines and storage to support deletion requests, which is non-trivial in append-only systems like data lakes and Delta Lake (where time travel must also be addressed)
- Data lineage: Purview tracks how data flows from source through transformations to downstream consumers. This is essential for impact analysis (what breaks if a source changes?), compliance (where does personal data end up?), and debugging (where did this data come from?)
- Data classification: automatically or manually label data by sensitivity (public, internal, confidential, restricted). Classification drives access control — confidential data requires stricter access policies than internal data

**Code walkthrough:**

```python
# Step 1: GDPR right-to-erasure implementation in Delta Lake
# Why: data subjects can request deletion of their personal data;
#      this is non-trivial in append-only systems like data lakes
from pyspark.sql import SparkSession
from delta.tables import DeltaTable

spark = SparkSession.builder.appName("gdpr_erasure").getOrCreate()

def process_erasure_request(customer_id: str, tables: list[str]):
    """Delete a customer's personal data from all Delta Lake tables."""
    for table_path in tables:
        delta_table = DeltaTable.forPath(spark, table_path)
        # Step 2: DELETE removes the data from the current version
        delta_table.delete(f"customer_id = '{customer_id}'")
        print(f"Deleted customer {customer_id} from {table_path}")

    # Step 3: VACUUM removes old files so time travel can't recover the data
    # Why: without VACUUM, deleted data remains accessible via time travel
    for table_path in tables:
        spark.sql(f"VACUUM delta.`{table_path}` RETAIN 0 HOURS")

# Step 4: Automated retention policy — delete data older than the retention period
def enforce_retention(table_path: str, retention_days: int):
    """Delete records older than the retention period."""
    delta_table = DeltaTable.forPath(spark, table_path)
    delta_table.delete(
        f"created_at < current_date() - INTERVAL {retention_days} DAYS"
    )
    print(f"Enforced {retention_days}-day retention on {table_path}")

# Step 5: Data classification tags for access control
# Why: classification determines who can access the data
DATA_CLASSIFICATION = {
    "customer_name": "confidential",
    "email": "confidential",
    "claim_amount": "internal",
    "product_type": "public",
}

# Use classification to mask sensitive columns in non-privileged views
def create_masked_view(spark, table_path: str, classification: dict):
    df = spark.read.format("delta").load(table_path)
    for col_name, level in classification.items():
        if level == "confidential" and col_name in df.columns:
            df = df.withColumn(col_name, F.lit("***MASKED***"))
    return df
```

**Common pitfalls:**

- Treating governance as a one-time cataloguing exercise rather than an ongoing practice integrated into pipeline development
- Building pipelines that copy personal data into multiple locations without tracking where it ends up, making deletion requests nearly impossible to fulfil
- Implementing retention policies in documentation but not in code — retention must be automated, not dependent on manual cleanup
- Ignoring pseudonymisation and anonymisation as engineering techniques. Pseudonymised data (where the identifier can be re-linked) is still personal data under GDPR; anonymised data (where re-identification is practically impossible) is not

---

## Change Data Capture (CDC) – Real-Time Data Synchronisation

Change Data Capture (CDC) is a pattern for identifying and capturing changes made to data in a source system and delivering those changes to downstream systems in near real-time. Instead of periodically extracting a full snapshot of a table (batch ETL), CDC captures only the inserts, updates, and deletes as they happen, dramatically reducing data latency and processing overhead.

Debezium is the leading open-source CDC platform. It works by reading the database's transaction log (Write-Ahead Log in PostgreSQL, binlog in MySQL, change feed in CosmosDB) and streaming change events to Apache Kafka or other message systems. This approach is non-invasive — it does not require changes to the source application or queries against the source database.

**Why it matters:** Many data engineering use cases require fresher data than daily batch ETL can provide. Real-time dashboards, fraud detection, event-driven microservices, and operational analytics all benefit from CDC. For an insurance company, CDC enables near-real-time claims tracking, instant policy change propagation, and timely fraud detection — moving from "we see yesterday's data" to "we see what just happened."

**Key things to understand:**

- CDC vs batch ETL: batch ETL extracts full snapshots at intervals (hourly, daily). CDC captures changes continuously. CDC reduces load on the source database (no full table scans), reduces latency (seconds to minutes vs hours), and reduces downstream processing (only changes need to be processed)
- Log-based CDC (Debezium's approach) reads the database transaction log, which records every change. This is the most reliable CDC method because it captures all changes without modifying the source application and handles deletes correctly
- Event structure: CDC events typically contain the operation type (insert/update/delete), the before and after state of the row, a timestamp, and transaction metadata. This enables downstream systems to apply changes accurately
- Kafka as the CDC transport: Debezium publishes change events to Kafka topics (one topic per table). Downstream consumers (data lake ingestion, stream processing, search index updates) subscribe to the relevant topics
- CosmosDB Change Feed: Azure's native CDC mechanism for CosmosDB. It provides an ordered sequence of changes that can be processed by Azure Functions or consumed directly
- Initial snapshot: when first setting up CDC, Debezium performs an initial snapshot of the existing data before switching to log-based streaming. This ensures downstream systems have the complete dataset

**Code walkthrough:**

```python
# Step 1: CDC implementation — apply change events to Delta Lake
# Why: CDC captures only inserts, updates, and deletes from the source,
#      eliminating the need for full table scans
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from delta.tables import DeltaTable

spark = SparkSession.builder.appName("cdc_pipeline").getOrCreate()

# Step 2: Read CDC events from Kafka (produced by Debezium)
cdc_events = (
    spark.read.format("kafka")
    .option("kafka.bootstrap.servers", "kafka:9092")
    .option("subscribe", "dbserver.public.policies")
    .load()
    .selectExpr("CAST(value AS STRING) AS json_value")
)

# Step 3: Parse Debezium event structure
from pyspark.sql.types import StructType, StructField, StringType

parsed = (
    cdc_events
    .withColumn("payload", F.from_json("json_value", "struct<op:string,after:string,before:string>"))
    .select(
        F.col("payload.op").alias("operation"),     # c=create, u=update, d=delete
        F.from_json("payload.after", policy_schema).alias("after"),
        F.from_json("payload.before", policy_schema).alias("before"),
    )
)

# Step 4: Apply CDC events to the target Delta table
target = DeltaTable.forPath(spark, "/data/silver/policies")

# Filter to just creates and updates (after is not null)
upserts = parsed.filter("operation IN ('c', 'u')").select("after.*")
deletes = parsed.filter("operation = 'd'").select("before.policy_id")

# Step 5: MERGE handles upserts atomically
target.alias("t").merge(
    upserts.alias("s"), "t.policy_id = s.policy_id"
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()

# Step 6: Process deletes separately
for row in deletes.collect():
    target.delete(f"policy_id = '{row.policy_id}'")

print("CDC batch applied successfully")
```

**Common pitfalls:**

- Not planning for schema evolution — when source tables change (new columns, type changes), CDC events change too. Downstream consumers must handle schema changes gracefully
- Ignoring the ordering guarantees of CDC events. Events within a single partition are ordered, but events across partitions may arrive out of order. Pipeline design must account for this
- Underestimating the operational complexity of running Debezium and Kafka in production — these are distributed systems that require monitoring, capacity planning, and incident response
- Treating CDC as a replacement for all batch ETL. Some workloads (large historical backfills, complex aggregations) are still better served by batch processing. CDC and batch are complementary patterns

---

## AI Policy — Organisational Principles

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) (Internal -- requires company access) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English for accessibility.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from data engineers building pipelines that feed AI systems to engineers using AI-assisted development tools.

**Why it matters:** The AI Policy directly affects data engineering work. Data engineers build the pipelines that prepare training data, serve features to models, and store AI-generated outputs. The policy's requirements around data classification, lineage tracking, and purpose limitation translate directly into pipeline design decisions.

**Code walkthrough:**

```python
# Step 1: AI Policy compliance in data pipelines
# Why: the AI Policy requires registration, classification, and traceability
#      for any pipeline that feeds data into or stores output from AI systems
import json
from datetime import datetime, timezone

def create_ai_pipeline_metadata(
    use_case_id: str,
    risk_classification: str,
    data_sources: list[str],
    personal_data_fields: list[str],
    retention_days: int,
) -> dict:
    """Generate metadata required by the AI Policy for every AI data pipeline."""
    metadata = {
        "use_case_id": use_case_id,
        "risk_classification": risk_classification,  # "low", "limited", "high"
        "registered_in_ai_register": True,
        "data_sources": data_sources,
        "personal_data_fields": personal_data_fields,
        # Step 2: GDPR data minimisation — document why each field is needed
        "purpose": "Claims fraud detection model training data",
        "retention_policy": {
            "retention_days": retention_days,
            "deletion_method": "automated_vacuum",
        },
        "lineage_tracked": True,  # Purview integration enabled
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    # Step 3: Validate that high-risk use cases have conformity assessments
    if risk_classification == "high" and not metadata.get("conformity_assessment"):
        raise ValueError("High-risk AI use cases require a conformity assessment")
    return metadata

pipeline_meta = create_ai_pipeline_metadata(
    use_case_id="UC-2025-FRAUD-01",
    risk_classification="high",
    data_sources=["bronze.claims", "silver.customers"],
    personal_data_fields=["customer_id", "claim_description"],
    retention_days=365,
)
print(json.dumps(pipeline_meta, indent=2))
```

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- GDPR obligations apply to data pipelines that process personal data for AI purposes — training data, feature stores, and model outputs all fall under scope.
- Data lineage through AI pipelines must be traceable, ensuring that the organisation can answer the question "what data was used to produce this AI output?"

**Common pitfalls:**
- Building data pipelines for AI workloads without verifying that the use case has been registered and classified in the AI Register.
- Not applying GDPR data minimisation to AI training datasets — collecting and retaining more personal data than necessary for the stated purpose.
- Treating the AI Policy as an application-level concern only; data pipeline design decisions around retention, access control, and lineage are directly governed.

---

## AI-Powered Development for Data Engineers

AI-assisted development tools are changing how data engineers write and maintain pipeline code, SQL transformations, and infrastructure definitions. These tools can generate first drafts of dbt models, Spark jobs, SQL queries, and Airflow DAGs from natural language specifications — tasks that often follow well-documented patterns and are well-suited to AI assistance.

AI assistants are most effective for data engineering tasks when given precise context: the schema of the source and target tables, the transformation requirements, the existing naming conventions, and any data quality constraints. They can also help explain complex SQL queries, debug pipeline errors, and generate documentation for existing transformations.

**Why it matters:** Senior data engineers who use AI tools effectively can accelerate the development of routine pipeline components — particularly for boilerplate-heavy tasks like writing dbt staging models, creating Spark DataFrame transformations, or generating Airflow DAG definitions. Understanding the limitations is equally important: AI-generated SQL or pipeline code can contain subtle errors that produce incorrect data without raising runtime errors.

**Key things to understand:**
- AI-generated SQL and pipeline code must always be reviewed and tested before deployment. Plausible-looking queries can produce incorrect results due to subtle join, aggregation, or filter errors.
- Providing rich context (table schemas, sample data, transformation rules) dramatically improves the quality of AI-generated pipeline code.
- AI tools are well-suited for: generating dbt model boilerplate, writing data quality tests, translating between SQL dialects, explaining complex queries, and drafting documentation.
- AI tools are poorly suited for: designing data models (they lack knowledge of your specific business domain), writing security-sensitive data handling code without review, and tasks requiring deep understanding of production data volumes and performance characteristics.
- Data privacy applies to AI tool use: do not paste production data, customer records, or sensitive business data into AI assistants. Follow the organisation's AI Policy for approved tools.

**Code walkthrough:**

```python
# Step 1: AI-assisted dbt model generation — prompt, generate, verify
# Why: AI tools can generate boilerplate dbt models quickly, but the output
#      must always be reviewed against the actual schema and business rules

# Example prompt to an AI assistant:
# "Generate a dbt staging model for a 'policies' table with columns:
#  policy_id (varchar), customer_id (varchar), product_type (varchar),
#  premium (decimal), start_date (date), status (varchar).
#  Clean column names, cast types, filter out test records."

# AI-generated output (to be reviewed by the engineer):
GENERATED_DBT_MODEL = """
-- models/staging/stg_policies.sql
-- Generated by AI assistant, reviewed by: [engineer name]
WITH source AS (
    SELECT * FROM {{ source('raw', 'policies') }}
)
SELECT
    CAST(policy_id AS VARCHAR(50))     AS policy_id,
    CAST(customer_id AS VARCHAR(50))   AS customer_id,
    TRIM(product_type)                 AS product_type,
    CAST(premium AS DECIMAL(10, 2))    AS premium_amount,
    CAST(start_date AS DATE)           AS policy_start_date,
    LOWER(TRIM(status))               AS status
FROM source
WHERE LOWER(status) != 'test'
  AND policy_id IS NOT NULL
"""

# Step 2: What to verify after AI generates the model
# Why: AI may miss business rules, use wrong column names, or apply
#      incorrect type casting
REVIEW_CHECKLIST = [
    "Does the model use ref() or source() correctly?",
    "Are column names consistent with our naming conventions?",
    "Are type casts appropriate for the target warehouse?",
    "Are all business-rule filters included?",
    "Does the WHERE clause match what 'test' data looks like in production?",
    "Run: dbt run --select stg_policies && dbt test --select stg_policies",
]

for i, check in enumerate(REVIEW_CHECKLIST, 1):
    print(f"  [{i}] {check}")
```

**Common pitfalls:**
- Accepting AI-generated SQL without running it against test data and verifying the results match expectations.
- Using AI to generate complex transformations without understanding the underlying logic — this creates a maintenance burden when the generated code needs to be modified.
- Not establishing team conventions around AI tool use, leading to inconsistent pipeline patterns and code quality.

---

## EU Compliance for Data Engineers

Senior Data Engineers are directly responsible for implementing GDPR compliance at the data infrastructure level. The pipelines, storage systems, and transformation logic that Data Engineers build are where personal data physically resides and flows — making this role the primary technical enforcer of EU data protection requirements. GDPR compliance is not a feature that can be bolted onto pipelines after they are built; it must be a design constraint from the first architecture decision. For a Swedish insurance company handling sensitive personal data — health records, financial information, claims history, and Swedish personnummer — the stakes are significant: GDPR penalties of up to 4% of global turnover or 20 million EUR, and reputational damage that can persist long after a fine is paid.

Data lineage is a critical GDPR requirement for Data Engineers. Article 30 of the GDPR requires organisations to maintain records of processing activities, including the categories of data processed, the purposes of processing, and the recipients of data. In practice, this means Data Engineers must implement end-to-end lineage tracking through every pipeline — from source ingestion through transformation to downstream consumption. Microsoft Purview provides the tooling for this in Azure environments, but the lineage must be designed into the pipeline architecture. When a data subject exercises their right to access (Article 15), the organisation must be able to answer: "Where is this person's data, how did it get there, and who has access to it?" Without lineage, this question is unanswerable in a complex data platform.

The right to erasure (Article 17) presents a specific technical challenge for Data Engineers working with lakehouse architectures. In append-only systems like Delta Lake, deleted data remains accessible through time travel unless explicit steps are taken. Implementing erasure requires not only deleting records from the current version of all affected tables but also running VACUUM operations to remove historical file versions that contain the deleted data. This must be coordinated across all tables and storage locations where the individual's data exists — which is only possible if lineage tracking is comprehensive. Data Engineers must build automated erasure workflows that can process deletion requests across the entire data estate within the GDPR's 30-day response window.

Data retention policies are a GDPR storage limitation requirement that must be implemented as automated pipeline logic, not as manual processes documented in a policy. Every table containing personal data must have a defined retention period based on the lawful basis for processing, and pipelines must automatically delete or anonymise records that exceed the retention period. For insurance data, retention periods vary by data type and legal requirement — claims data may need to be retained for years for regulatory reasons, while marketing consent data may have shorter retention windows. The key engineering principle is that retention must be enforced in code, not left to periodic manual review.

**Code walkthrough:**

```python
# GDPR data lineage and right-to-erasure pipeline for Delta Lake
# Implements Article 17 (erasure) and Article 30 (records of processing)
from pyspark.sql import SparkSession
from delta.tables import DeltaTable
from dataclasses import dataclass, field
from datetime import datetime, timezone
import json

@dataclass
class GDPRErasureRequest:
    request_id: str
    data_subject_id: str
    requested_at: datetime
    deadline: datetime  # Must complete within 30 days

@dataclass
class ErasureResult:
    request_id: str
    tables_processed: list[str]
    rows_deleted: dict[str, int]
    vacuum_completed: bool
    completed_at: datetime

def process_gdpr_erasure(
    spark: SparkSession,
    request: GDPRErasureRequest,
    personal_data_tables: dict[str, str],  # table_name -> path
    id_column: str = "customer_id",
) -> ErasureResult:
    """Process a GDPR right-to-erasure request across all personal data tables.
    Why automated? Manual deletion across dozens of tables is error-prone
    and cannot meet the 30-day deadline reliably."""
    rows_deleted = {}

    for table_name, table_path in personal_data_tables.items():
        delta_table = DeltaTable.forPath(spark, table_path)

        # Count affected rows for audit trail
        count_before = spark.read.format("delta").load(table_path) \
            .filter(f"{id_column} = '{request.data_subject_id}'").count()

        # Delete from current version
        delta_table.delete(f"{id_column} = '{request.data_subject_id}'")
        rows_deleted[table_name] = count_before

    # VACUUM to remove deleted data from time travel history
    # Why: without VACUUM, deleted data is recoverable via time travel
    for table_path in personal_data_tables.values():
        spark.sql(f"VACUUM delta.`{table_path}` RETAIN 0 HOURS")

    result = ErasureResult(
        request_id=request.request_id,
        tables_processed=list(personal_data_tables.keys()),
        rows_deleted=rows_deleted,
        vacuum_completed=True,
        completed_at=datetime.now(timezone.utc),
    )

    # Audit log — proof of compliance for regulatory review
    print(json.dumps({
        "event": "gdpr_erasure_completed",
        "request_id": result.request_id,
        "tables": result.tables_processed,
        "total_rows_deleted": sum(result.rows_deleted.values()),
        "completed_at": result.completed_at.isoformat(),
    }))
    return result
```

> **Why it matters:** Data Engineers build the infrastructure where personal data lives. If that infrastructure does not support lineage tracking, automated erasure, and retention enforcement, the organisation cannot comply with GDPR — regardless of what policies are written. Fines from the Swedish supervisory authority (IMY) and EU data protection authorities have increasingly targeted organisations with inadequate technical implementation of data subject rights, not just those with missing privacy policies.
