# Data Engineer – Mid Concept Reference


This document explains the intermediate-level concepts covered in the Mid level of the Data Engineer learning path.

---

## Data Warehousing – Dimensional Modelling and Star Schema

A data warehouse is a central repository of structured data optimised for analytical queries. Unlike operational databases that are designed for fast individual transactions (insert one order, update one customer), a data warehouse is designed for fast aggregation across millions of rows (total sales by region by month, average claim processing time by product type).

Dimensional modelling, pioneered by Ralph Kimball, is the dominant technique for designing data warehouse schemas. The core building blocks are fact tables and dimension tables. A fact table stores the measurements of a business process (sales amount, number of claims, page views) along with foreign keys to dimension tables. Dimension tables store the descriptive context (who, what, where, when) that gives meaning to the facts. The star schema — a fact table surrounded by dimension tables — is called "star" because of its visual shape in an entity-relationship diagram.

**Why it matters:** Dimensional modelling is the foundation of every analytical data warehouse. Whether you use Snowflake, BigQuery, Synapse, or Redshift, the underlying design principles are the same. A well-designed dimensional model makes queries simple and fast; a poorly designed one forces complex joins, produces incorrect aggregations, and confuses every downstream consumer.

**Key things to understand:**

- Fact tables contain numeric measurements (additive facts like revenue, semi-additive facts like account balance, non-additive facts like ratios) and foreign keys to dimension tables
- Dimension tables contain descriptive attributes (customer name, product category, date, geography) and are typically denormalised for query performance
- Star schema: fact table at the centre, dimension tables radiating out; queries join the fact table to one or more dimensions
- Snowflake schema: dimensions are normalised into sub-tables; more storage-efficient but slower to query — star schema is preferred in most modern warehouses
- Slowly Changing Dimensions (SCD): strategies for handling changes to dimension attributes over time — Type 1 (overwrite), Type 2 (add new row with versioning), Type 3 (add column for previous value)
- Grain: the level of detail in a fact table (one row per transaction, per day, per customer-product combination); defining the grain is the single most important design decision

**Code walkthrough:**

```sql
-- Step 1: Star schema design — fact table surrounded by dimension tables
-- Why: star schemas are optimised for analytical queries with simple JOINs

-- Dimension: date (one row per calendar day)
CREATE TABLE dim_date (
    date_key     INT PRIMARY KEY,       -- e.g., 20250115
    full_date    DATE NOT NULL,
    year         INT NOT NULL,
    quarter      INT NOT NULL,
    month        INT NOT NULL,
    month_name   VARCHAR(10) NOT NULL,
    day_of_week  VARCHAR(10) NOT NULL,
    is_weekend   BOOLEAN NOT NULL
);

-- Dimension: product (SCD Type 2 for tracking changes over time)
CREATE TABLE dim_product (
    product_key  INT PRIMARY KEY,       -- surrogate key
    product_id   VARCHAR(50) NOT NULL,  -- natural key from source
    product_name VARCHAR(200) NOT NULL,
    category     VARCHAR(100),
    valid_from   DATE NOT NULL,
    valid_to     DATE,                  -- NULL means current version
    is_current   BOOLEAN DEFAULT TRUE
);

-- Fact: sales (grain = one row per transaction line item)
-- Why: defining the grain first prevents mixing levels of detail
CREATE TABLE fact_sales (
    sale_id       BIGINT PRIMARY KEY,
    date_key      INT REFERENCES dim_date(date_key),
    product_key   INT REFERENCES dim_product(product_key),
    customer_key  INT,
    quantity      INT NOT NULL,
    unit_price    DECIMAL(10,2) NOT NULL,
    total_amount  DECIMAL(12,2) NOT NULL  -- additive fact
);

-- Step 2: Analytical query — total sales by category and quarter
-- Why: the star schema makes this query simple and fast
SELECT
    p.category,
    d.year, d.quarter,
    SUM(f.total_amount) AS revenue,
    COUNT(DISTINCT f.sale_id) AS num_transactions
FROM fact_sales f
JOIN dim_date d    ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
WHERE p.is_current = TRUE
GROUP BY p.category, d.year, d.quarter
ORDER BY d.year, d.quarter;
```

**Common pitfalls:**

- Not defining the grain of the fact table upfront, leading to a table that mixes different levels of detail and produces incorrect aggregations.
- Over-normalising dimension tables (snowflake schema) when a star schema would be simpler and faster.
- Storing calculated metrics in the fact table instead of computing them at query time; this creates maintenance burden and risks inconsistency.
- Ignoring Slowly Changing Dimensions, causing historical data to silently update when dimension attributes change.

---

## dbt (data build tool) – Transformations as Code

dbt is an open-source tool that enables Data Engineers to write data transformations as SQL SELECT statements and manage them with software engineering best practices: version control, testing, documentation, and modular design. dbt runs inside the data warehouse — it does not extract or load data; it transforms data that is already there (the T in ELT).

Each dbt model is a SQL file that defines a transformation. dbt handles the materialisation strategy (whether the result is a table, a view, an incremental table, or an ephemeral CTE), the dependency graph between models (which models depend on which), and the execution order. dbt also provides built-in testing (not null, unique, referential integrity, accepted values) and auto-generates documentation from the models and their descriptions.

**Why it matters:** dbt has become the industry standard for analytical transformations. It brings software engineering discipline — version control, code review, testing, CI/CD — to SQL transformations that were historically managed as ad hoc scripts or GUI-based ETL workflows. Understanding dbt is a core competency for any modern Data Engineer.

**Key things to understand:**

- Models: SQL SELECT statements stored in `.sql` files; each model produces a table or view in the warehouse
- Materialisation strategies: `view` (lightweight, always up to date), `table` (fast queries, rebuilt from scratch each run), `incremental` (appends or merges only new/changed data), `ephemeral` (CTE, never materialised)
- The `ref()` function: references another model, establishing a dependency; dbt uses these references to build the DAG (directed acyclic graph) and determine execution order
- Tests: `schema.yml` files define tests like `not_null`, `unique`, `relationships`, and `accepted_values`; custom tests can be written as SQL queries that return failing rows
- Sources: declare external tables that dbt reads from but does not manage; source freshness checks can alert when data has not been updated
- Jinja templating: dbt uses Jinja to add logic (if/else, loops, macros) to SQL, enabling DRY (Don't Repeat Yourself) transformations

**Code walkthrough:**

```sql
-- File: models/staging/stg_orders.sql
-- Step 1: Staging model — clean and rename raw source columns
-- Why: staging models create a consistent interface over messy source data
WITH source AS (
    SELECT * FROM {{ source('raw', 'orders') }}
)
SELECT
    id              AS order_id,
    customer_id,
    CAST(amount AS DECIMAL(10,2)) AS order_amount,
    CAST(created_at AS TIMESTAMP) AS ordered_at,
    status
FROM source
WHERE status != 'test'  -- filter out test data at the earliest stage
```

```sql
-- File: models/marts/fct_daily_revenue.sql
-- Step 2: Mart model — business-ready aggregation using ref()
-- Why: ref() establishes the dependency so dbt runs models in the right order
{{ config(materialized='incremental', unique_key='revenue_date') }}

SELECT
    DATE_TRUNC('day', ordered_at) AS revenue_date,
    COUNT(*)                      AS order_count,
    SUM(order_amount)             AS total_revenue
FROM {{ ref('stg_orders') }}
WHERE status = 'completed'
{% if is_incremental() %}
  -- Step 3: Incremental — only process new data since the last run
  -- Why: reprocessing everything daily becomes too slow as data grows
  AND ordered_at > (SELECT MAX(revenue_date) FROM {{ this }})
{% endif %}
GROUP BY 1
```

```yaml
# File: models/staging/schema.yml
# Step 4: dbt tests — data quality checks integrated into the build
# Why: catch bad data before it reaches dashboards and reports
version: 2
models:
  - name: stg_orders
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: order_amount
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
              max_value: 1000000
      - name: status
        tests:
          - accepted_values:
              values: ['pending', 'completed', 'cancelled', 'refunded']
```

**Common pitfalls:**

- Materialising everything as tables when views would be sufficient, wasting warehouse compute and storage.
- Not writing tests, defeating one of dbt's primary benefits; at minimum, test primary keys for uniqueness and not-null.
- Creating deeply nested model dependencies without clear staging/intermediate/mart layers, making the DAG hard to understand.
- Not using `ref()` consistently, which breaks the dependency graph and causes models to run in the wrong order.

---

## Apache Spark – Distributed Data Processing

Apache Spark is an open-source distributed computing engine designed for processing large datasets across a cluster of machines. Spark can handle batch processing, streaming, machine learning, and graph computation, but its primary use in data engineering is large-scale data transformation — processing datasets that are too large for a single machine.

Spark distributes data across the cluster as partitions and executes transformations in parallel across those partitions. The core abstraction is the DataFrame (and its predecessor, the RDD): a distributed collection of data organised into named columns, similar to a table in a relational database. Transformations (filter, join, aggregate) are lazy — they build up a plan of what to do. Actions (count, write, collect) trigger the actual execution of that plan.

**Why it matters:** Spark is the de facto standard for large-scale data processing. Whether you are running it on Databricks, Amazon EMR, Azure HDInsight, or a self-managed cluster, Spark is the engine behind most big data pipelines. Understanding how Spark distributes and processes data is essential for writing jobs that are correct and performant.

**Key things to understand:**

- Driver and executor model: the driver orchestrates the job; executors run on worker nodes and process partitions of data in parallel
- Lazy evaluation: transformations build a logical plan; only when an action is called does Spark create a physical plan and execute it
- DataFrames: the primary API; use named columns and support SQL-like operations (select, filter, groupBy, join, agg)
- Partitioning: data is split into partitions distributed across executors; the number and size of partitions affects parallelism and performance
- Shuffle: a shuffle occurs when data must be redistributed across partitions (e.g., during a join or groupBy); shuffles are the most expensive operation in Spark
- Reading and writing data in common formats: Parquet (columnar, compressed, the default for analytical data), CSV, JSON, Delta Lake

**Code walkthrough:**

```python
# Step 1: PySpark DataFrame transformations — distributed data processing
# Why: Spark distributes data across a cluster for parallel processing
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("sales_etl").getOrCreate()

# Step 2: Read Parquet files — the standard format for analytical data
# Why: Parquet is columnar and compressed; Spark reads only needed columns
df = spark.read.parquet("data/raw/transactions/")

# Step 3: Transformations — filter, derive columns, aggregate
# Why: transformations are lazy; Spark builds a plan but doesn't execute yet
cleaned = (
    df
    .filter(F.col("amount") > 0)                          # remove invalid rows
    .withColumn("year_month", F.date_format("txn_date", "yyyy-MM"))
    .withColumn("amount_usd", F.col("amount") * F.col("exchange_rate"))
)

# Step 4: Aggregation with groupBy
monthly_summary = (
    cleaned
    .groupBy("year_month", "product_category")
    .agg(
        F.sum("amount_usd").alias("total_revenue"),
        F.count("*").alias("transaction_count"),
        F.avg("amount_usd").alias("avg_order_value"),
    )
)

# Step 5: Write the result — coalesce to control output file count
# Why: too many small files degrade read performance downstream
monthly_summary.coalesce(4).write.mode("overwrite").parquet(
    "data/processed/monthly_summary/"
)

# Step 6: Action triggers execution — check the Spark UI for performance
monthly_summary.show(5)
```

**Common pitfalls:**

- Calling `collect()` on a large DataFrame, pulling all data to the driver and causing out-of-memory errors; keep data distributed.
- Not understanding partitioning, resulting in too few partitions (underutilised cluster) or too many (excessive scheduling overhead).
- Writing jobs that create many small files ("small file problem"), degrading downstream read performance; use `coalesce()` or `repartition()` to control output file count.
- Ignoring the Spark UI when diagnosing performance issues; the UI shows stage execution, shuffle sizes, and skewed partitions.

---

## Apache Airflow – Workflow Orchestration

Apache Airflow is an open-source platform for authoring, scheduling, and monitoring workflows. In data engineering, Airflow is the most widely used tool for orchestrating data pipelines — defining the order in which tasks run, handling dependencies between tasks, retrying failed tasks, and providing visibility into pipeline execution.

An Airflow workflow is defined as a DAG (Directed Acyclic Graph): a collection of tasks with defined dependencies that determines execution order. Each task is an instance of an operator — a predefined template for a specific type of work (run a Python function, execute a SQL query, trigger a Spark job, call an API). DAGs are written in Python, which gives full flexibility to dynamically generate tasks, parameterise workflows, and integrate with any system that has a Python client.

**Why it matters:** Data pipelines are not single scripts — they are sequences of dependent steps that must run in the right order, on the right schedule, with proper error handling and monitoring. Airflow provides the orchestration layer that turns a collection of scripts into a reliable, observable production system.

**Key things to understand:**

- DAGs: Python files that define a workflow as a graph of tasks and their dependencies; DAGs are not the data processing logic themselves — they orchestrate it
- Operators: `PythonOperator` (run a Python function), `BashOperator` (run a shell command), `SQLOperator` (execute SQL), `SparkSubmitOperator`, and provider-specific operators for cloud services
- Task dependencies: `task_a >> task_b` means task_b runs only after task_a succeeds
- Scheduling: cron-based schedule definitions (`@daily`, `@hourly`, or explicit cron expressions); Airflow triggers DAG runs based on the schedule
- XComs: a mechanism for tasks to pass small amounts of data between each other; not designed for passing large datasets
- The Airflow UI: monitor DAG runs, inspect task logs, manually trigger runs, clear failed tasks for retry

**Code walkthrough:**

```python
# Step 1: Airflow DAG with task dependencies and error handling
# Why: real pipelines have branching, retries, and inter-task communication
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from airflow.utils.trigger_rule import TriggerRule
from datetime import datetime, timedelta

default_args = {
    "owner": "data-team",
    "retries": 3,
    "retry_delay": timedelta(minutes=10),
    "email_on_failure": True,
    "email": ["data-alerts@company.com"],
}

with DAG(
    dag_id="daily_claims_pipeline",
    default_args=default_args,
    start_date=datetime(2025, 1, 1),
    schedule="0 6 * * *",  # 6:00 AM daily
    catchup=False,
    tags=["claims", "production"],
) as dag:

    # Step 2: Extract — pull data from the source database
    extract = PythonOperator(
        task_id="extract_claims",
        python_callable=lambda **ctx: print(
            f"Extracting claims for {ctx['ds']}"  # ds = execution date
        ),
    )

    # Step 3: Transform — run a Spark job for heavy processing
    # Why: Airflow orchestrates; Spark does the heavy lifting
    transform = SparkSubmitOperator(
        task_id="transform_claims",
        application="/opt/spark_jobs/transform_claims.py",
        conn_id="spark_default",
    )

    # Step 4: Data quality check — runs AFTER transform
    quality_check = PythonOperator(
        task_id="run_quality_checks",
        python_callable=lambda: print("Running Great Expectations suite..."),
    )

    # Step 5: Load and notify — both depend on quality passing
    load = PythonOperator(
        task_id="load_to_warehouse",
        python_callable=lambda: print("Loading to Synapse..."),
    )

    notify = PythonOperator(
        task_id="notify_stakeholders",
        python_callable=lambda: print("Pipeline complete!"),
        # Why: trigger_rule ensures this runs even if upstream tasks fail
        trigger_rule=TriggerRule.ALL_DONE,
    )

    # Step 6: Define the dependency graph
    extract >> transform >> quality_check >> load >> notify
```

**Common pitfalls:**

- Putting heavy data processing logic directly inside Airflow tasks; Airflow should orchestrate work, not perform it — delegate processing to Spark, dbt, or cloud services.
- Passing large datasets between tasks via XComs; XComs are stored in the Airflow metadata database and are meant for small values (file paths, status flags), not dataframes.
- Not setting `retries` and `retry_delay` on tasks, causing the entire pipeline to fail permanently on transient errors.
- Writing DAGs that are not idempotent; re-running a DAG for the same date should produce the same result, enabling safe backfills and retries.

---

## Azure Data Services – Data Factory and Synapse

Microsoft Azure provides a suite of managed data services for building data pipelines and analytical platforms. Azure Data Factory (ADF) is a cloud-based data integration service that orchestrates and automates the movement and transformation of data. Azure Synapse Analytics combines enterprise data warehousing with big data analytics in a single service, providing both dedicated SQL pools (for traditional warehousing) and Spark pools (for big data processing).

For a Data Engineer working in the Azure ecosystem, ADF is typically the orchestration layer (similar to Airflow but GUI-driven) and Synapse is the compute and storage layer for analytical workloads. Together, they form the backbone of a modern Azure data platform.

**Why it matters:** Cloud data services are where most new data platforms are built. Understanding how to provision, configure, and use Azure Data Factory and Synapse Analytics is a practical skill that directly translates to building production data pipelines. These services handle scaling, availability, and infrastructure management so the Data Engineer can focus on the data itself.

**Key things to understand:**

- Azure Data Factory: pipelines, activities, datasets, linked services, triggers; a visual orchestration tool for data movement and transformation
- Copy Activity: ADF's primary data movement tool; connects to 100+ data sources and sinks with built-in format conversion
- Data Flows: ADF's visual transformation engine for code-free ETL; runs on Spark under the hood
- Azure Synapse Analytics: dedicated SQL pools (provisioned compute for large-scale SQL analytics) and serverless SQL pools (pay-per-query for ad hoc exploration)
- Synapse Spark pools: managed Spark clusters integrated with the Synapse workspace for big data processing
- Integration Runtimes: the compute infrastructure that ADF uses to connect to data sources; Self-Hosted IR is needed for on-premises data sources
- Azure Blob Storage and Azure Data Lake Storage Gen2: the primary storage layers for raw and processed data in Azure

**Code walkthrough:**

```python
# Step 1: Azure Data Factory pipeline interaction via Python SDK
# Why: Data Engineers automate ADF pipeline triggers and monitoring programmatically
from azure.identity import DefaultAzureCredential
from azure.mgmt.datafactory import DataFactoryManagementClient
from datetime import datetime, timezone

# Step 2: Authenticate using managed identity or Azure CLI credentials
# Why: DefaultAzureCredential works in local dev (CLI) and production (managed identity)
credential = DefaultAzureCredential()
adf_client = DataFactoryManagementClient(credential, subscription_id="your-sub-id")

# Step 3: Trigger an ADF pipeline run
# Why: programmatic triggers enable integration with external orchestrators
def trigger_pipeline(
    resource_group: str,
    factory_name: str,
    pipeline_name: str,
    parameters: dict = None,
) -> str:
    """Trigger an Azure Data Factory pipeline and return the run ID."""
    run_response = adf_client.pipelines.create_run(
        resource_group_name=resource_group,
        factory_name=factory_name,
        pipeline_name=pipeline_name,
        parameters=parameters or {},
    )
    print(f"Pipeline run started: {run_response.run_id}")
    return run_response.run_id

# Step 4: Monitor pipeline run status
# Why: automated monitoring enables alerting on failures and SLA tracking
def check_pipeline_status(resource_group: str, factory_name: str, run_id: str) -> str:
    """Check the status of a pipeline run."""
    run = adf_client.pipeline_runs.get(
        resource_group_name=resource_group,
        factory_name=factory_name,
        run_id=run_id,
    )
    print(f"Pipeline status: {run.status} (started: {run.run_start})")
    return run.status

# Step 5: Example — trigger daily ingestion pipeline
run_id = trigger_pipeline(
    resource_group="rg-data-platform",
    factory_name="adf-prod",
    pipeline_name="daily_claims_ingestion",
    parameters={"load_date": datetime.now(timezone.utc).strftime("%Y-%m-%d")},
)
```

**Common pitfalls:**

- Using ADF Data Flows for every transformation when dbt or Spark would be more maintainable and testable for complex logic.
- Not understanding the cost model; dedicated SQL pools charge per hour regardless of usage, while serverless pools charge per TB scanned.
- Storing sensitive connection details (passwords, keys) directly in linked services instead of using Azure Key Vault.
- Not implementing incremental loading patterns in Copy Activities, causing full table copies on every pipeline run.

---

## Data Quality – Validation, Testing and Trust

Data quality is the degree to which data is accurate, complete, consistent, timely, and fit for its intended purpose. For a Data Engineer, data quality is not a nice-to-have — it is a core responsibility. If the data in the warehouse is wrong, every report, dashboard, and model built on it is wrong, and the entire data function loses the trust of its consumers.

Data quality must be built into pipelines, not checked after the fact. This means defining expectations for each dataset (expected row counts, not-null constraints, value ranges, referential integrity), implementing automated checks at each stage of the pipeline, and alerting when expectations are violated. Tools like Great Expectations, dbt tests, and custom validation scripts make this practical.

**Why it matters:** Data that cannot be trusted is worse than no data, because it leads to confident wrong decisions. Data quality issues are insidious — they often go unnoticed until someone makes a decision based on bad data and the consequences surface weeks or months later. Building data quality checks into pipelines is the Data Engineer's primary defence.

**Key things to understand:**

- Dimensions of data quality: accuracy (is the data correct?), completeness (are all expected records present?), consistency (does the data agree across systems?), timeliness (is the data fresh enough?), uniqueness (are there duplicates?)
- Schema validation: does the data conform to the expected structure (column names, data types)?
- Expectation-based testing: define explicit expectations (e.g., "column X is never null", "row count is within 10% of yesterday") and fail the pipeline when they are violated
- Great Expectations: an open-source framework for defining, running, and documenting data quality expectations
- dbt tests: `not_null`, `unique`, `relationships`, `accepted_values` — lightweight quality checks integrated into the transformation layer
- Data quality monitoring vs data quality testing: testing catches issues in the pipeline; monitoring tracks quality metrics over time to detect gradual degradation

**Code walkthrough:**

```python
# Step 1: Data quality checks with Great Expectations (GX 1.x API)
# Why: automated expectations catch data issues before they reach dashboards
import great_expectations as gx
import great_expectations.expectations as gxe
import pandas as pd

context = gx.get_context()

# Step 2: Create a data source and add a CSV asset
# Why: GX 1.x uses a fluent API for data source configuration
data_source = context.data_sources.add_pandas("orders_source")
data_asset = data_source.add_csv_asset("orders", filepath_or_buffer="data/processed/orders.csv")
batch_definition = data_asset.add_batch_definition_whole_dataframe("full_orders")

# Step 3: Define an Expectation Suite with quality rules
# Why: each expectation is a specific, testable quality rule
suite = context.suites.add(gx.ExpectationSuite(name="orders_quality"))

# Completeness — are required fields present?
suite.add_expectation(gxe.ExpectColumnValuesToNotBeNull(column="order_id"))
suite.add_expectation(gxe.ExpectColumnValuesToNotBeNull(column="customer_id"))

# Uniqueness — no duplicate primary keys
suite.add_expectation(gxe.ExpectColumnValuesToBeUnique(column="order_id"))

# Range — amounts must be positive and reasonable
suite.add_expectation(gxe.ExpectColumnValuesToBeBetween(
    column="total_amount", min_value=0, max_value=1_000_000
))

# Consistency — only known statuses allowed
suite.add_expectation(gxe.ExpectColumnValuesToBeInSet(
    column="status", value_set=["pending", "completed", "cancelled", "refunded"]
))

# Volume — row count should be within expected range
# Why: a sudden drop in rows suggests a source outage or extraction failure
suite.add_expectation(gxe.ExpectTableRowCountToBeBetween(
    min_value=1000, max_value=500_000
))

# Step 4: Create a validation definition and run it
# Why: validation definitions connect a batch of data to a suite of expectations
validation_definition = context.validation_definitions.add(
    gx.ValidationDefinition(
        name="orders_validation",
        data=batch_definition,
        suite=suite,
    )
)
results = validation_definition.run()

if not results.success:
    print("Data quality checks FAILED")
    raise ValueError("Data quality checks failed — see results for details")

print("All data quality checks passed")
```

**Common pitfalls:**

- Adding data quality checks only at the end of the pipeline; by then, bad data has already been processed and is harder to trace back to its source.
- Not alerting on data quality failures; a check that fails silently is no better than no check at all.
- Setting expectations too loosely (accepting any data) or too tightly (alerting on normal variation); calibrate expectations based on actual data behaviour.
- Assuming that if the pipeline ran without errors, the data is correct; a pipeline can succeed while producing incorrect or incomplete results.

---

## Docker – Containerising Data Pipelines

Docker packages an application and all its dependencies into a container — a lightweight, isolated execution environment that runs consistently across development, testing, and production. For a Data Engineer, Docker solves the persistent problem of environment inconsistency: "it works on my machine" becomes "it works in any environment that runs Docker."

A Dockerfile defines the blueprint for a container image: the base operating system, the dependencies to install, the code to include, and the command to run. Docker Compose extends this to multi-container setups, allowing a Data Engineer to run a local development environment that includes a database, an Airflow instance, and a custom pipeline service — all with a single command.

**Why it matters:** Modern data platforms run on containers. Airflow runs in Docker, Spark can run in Docker, dbt projects are packaged as Docker images for CI/CD, and cloud services like Azure Container Instances and Kubernetes all run containers. Understanding Docker is a prerequisite for deploying and operating data pipelines in any modern environment.

**Key things to understand:**

- `Dockerfile` instructions: `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `ENV`, `CMD`/`ENTRYPOINT`
- Image layers: each instruction creates a cached layer; order instructions from least to most frequently changing for faster builds
- Docker Compose: define multi-container applications in a `compose.yaml` file; services reference each other by name
- Volumes: persist data outside the container; without a volume, data inside a running container is lost when it stops
- Environment variables: inject configuration at runtime rather than baking it into the image
- Multi-stage builds: use one stage to build dependencies and another for the final image, keeping images small and secure

**Code walkthrough:**

```dockerfile
# Step 1: Dockerfile for a Python data pipeline application
# Why: containerising pipelines ensures consistent execution across environments
FROM python:3.12-slim AS base

# Step 2: Create a non-root user for security
# Why: running as root inside containers is a security risk
RUN groupadd -r pipeline && useradd -r -g pipeline pipeline

# Step 3: Install dependencies in a separate layer for caching
# Why: dependencies change less often than code; separate layers speed up builds
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 4: Copy application code
COPY src/ ./src/

# Step 5: Switch to non-root user
USER pipeline

# Step 6: Define the entry point
CMD ["python", "src/pipeline.py"]
```

```yaml
# Step 7: Docker Compose for a local data engineering environment
# Why: a single command brings up the entire local development stack
# File: compose.yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: analytics
      POSTGRES_USER: data_engineer
      POSTGRES_PASSWORD: local-dev-only
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  pipeline:
    build: .
    environment:
      DATABASE_URL: postgresql://data_engineer:local-dev-only@postgres:5432/analytics
    depends_on:
      - postgres

volumes:
  pgdata:
```

**Common pitfalls:**

- Running containers as root; always specify a non-root user in the Dockerfile.
- Baking secrets (passwords, API keys) into the Docker image; they become visible in the image history. Use environment variables or secrets managers at runtime.
- Not using `.dockerignore`, causing large directories (`.git`, `node_modules`, test data) to be included in the build context.
- Building monolithic images with everything installed rather than creating focused, minimal images.

---

## Advanced SQL – Window Functions, CTEs and Performance

Beyond basic SELECT queries, a Data Engineer needs advanced SQL skills for building complex transformations, writing efficient analytical queries, and understanding query performance. Window functions, CTEs, and performance tuning are the tools that separate a basic SQL user from a data engineering professional.

Window functions perform calculations across a set of rows that are related to the current row, without collapsing the result into a single row (as GROUP BY does). Common Table Expressions (CTEs) allow you to write modular, readable SQL by breaking complex queries into named steps. Query performance tuning involves understanding how the database engine executes your query and optimising it through better query structure, appropriate indexes, and statistics maintenance.

**Why it matters:** Data engineering SQL is not simple SELECT/WHERE queries — it involves complex multi-step transformations, deduplication, gap-filling, running totals, and ranking operations. Window functions and CTEs are the tools that make these transformations possible and readable. Performance tuning ensures they run in minutes, not hours.

**Key things to understand:**

- Window functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, `SUM() OVER()`, `AVG() OVER()` with `PARTITION BY` and `ORDER BY`
- CTEs (`WITH` clause): named subqueries for readability; recursive CTEs for hierarchical data
- `PARTITION BY` in window functions: defines the groups within which the window function operates; different from `GROUP BY` because it does not collapse rows
- Query execution plans: `EXPLAIN` / `EXPLAIN ANALYZE` to see how the database executes a query and where the cost lies
- Index usage: understanding when the query engine uses an index versus a full table scan and why
- Common optimization patterns: avoid `SELECT *`, push filters early, minimise data before joining, use appropriate join strategies

**Code walkthrough:**

```sql
-- Step 1: Window functions — analytical queries without collapsing rows
-- Why: GROUP BY collapses rows; window functions add calculations alongside them

-- Deduplicate: keep only the latest record per customer (common ETL pattern)
WITH ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY updated_at DESC
        ) AS rn
    FROM raw_customers
)
-- Step 2: Filter to keep only rank 1 — the most recent version
SELECT * FROM ranked WHERE rn = 1;

-- Step 3: Running totals and comparisons using LAG/LEAD
SELECT
    order_date,
    daily_revenue,
    -- Compare today's revenue to yesterday's
    LAG(daily_revenue, 1) OVER (ORDER BY order_date) AS prev_day_revenue,
    -- Percentage change from previous day
    ROUND(
        (daily_revenue - LAG(daily_revenue) OVER (ORDER BY order_date))
        / NULLIF(LAG(daily_revenue) OVER (ORDER BY order_date), 0) * 100,
        2
    ) AS pct_change,
    -- 7-day moving average for trend analysis
    AVG(daily_revenue) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM daily_revenue_summary
ORDER BY order_date;

-- Step 4: Query performance — check the execution plan
-- Why: EXPLAIN shows whether indexes are used and where the cost lies
EXPLAIN ANALYZE
SELECT c.name, SUM(o.total_amount)
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.order_date >= '2025-01-01'
GROUP BY c.name;
```

**Common pitfalls:**

- Confusing `ROW_NUMBER()` (always unique), `RANK()` (gaps after ties), and `DENSE_RANK()` (no gaps); choose the right one for your deduplication or ranking logic.
- Writing CTEs that materialise unnecessarily large intermediate results; some databases materialise CTEs as temporary tables.
- Not checking execution plans for production queries; a query that works on small data may become unacceptably slow at scale.
- Using correlated subqueries when a JOIN or window function would be more efficient.
