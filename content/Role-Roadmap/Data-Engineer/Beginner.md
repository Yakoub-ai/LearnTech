# Data Engineer – Beginner Concept Reference


This document explains the foundational concepts covered in the Beginner level of the Data Engineer learning path.

---

## Python Foundations – Syntax, Data Structures and File I/O

Python is the primary language for data engineering. Its readable syntax, rich standard library and mature ecosystem of data libraries make it the default choice for writing ETL scripts, pipeline logic, and data transformations. A Data Engineer uses Python daily — not to build web applications or train models, but to move, clean, reshape and validate data.

The standard library covers file I/O, JSON parsing, CSV handling, date manipulation and HTTP requests. Beyond the standard library, the data engineering ecosystem relies heavily on libraries like Pandas for tabular data manipulation, requests for API integration, and SQLAlchemy for database connectivity. Understanding Python's core data structures — lists, dictionaries, sets and tuples — is essential because every transformation you write operates on these primitives.

**Why it matters:** A Data Engineer who cannot write clean, efficient Python will struggle with every tool in the stack. Spark jobs are written in PySpark, Airflow DAGs are Python files, dbt uses Jinja-templated SQL orchestrated by Python, and most cloud SDK interactions happen through Python clients. Python fluency is the foundation everything else builds on.

**Key things to understand:**

- Built-in types: `int`, `float`, `str`, `bool`, `list`, `tuple`, `dict`, `set` and the operations each supports
- List comprehensions and generator expressions for memory-efficient data processing
- Reading and writing files: `open()`, `with` statement, CSV module, JSON module
- Error handling with `try`/`except` and why specific exception types matter
- Virtual environments (`venv`) and dependency management (`pip`, `requirements.txt`)
- f-strings for readable string formatting and `pathlib` for cross-platform file paths

**Code walkthrough:**

```python
# Step 1: CSV processing with pandas — the workhorse of tabular data
# Why: pandas provides fast, expressive operations on tabular data
import pandas as pd
from pathlib import Path

# Step 2: Read a CSV file and inspect its shape
# Why: always check row counts and data types before processing
df = pd.read_csv("transactions.csv", encoding="utf-8")
print(f"Rows: {len(df)}, Columns: {list(df.columns)}")
print(df.dtypes)  # verify types — dates often load as strings

# Step 3: Clean and transform the data
# Why: raw data always needs cleaning before it's useful
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")  # convert to float
df["date"] = pd.to_datetime(df["date"])                       # parse dates
df = df.dropna(subset=["amount"])                              # remove bad rows

# Step 4: Data type validation — catch problems early
# Why: a pipeline that silently passes bad data creates downstream errors
def validate_dataframe(df: pd.DataFrame) -> list[str]:
    errors = []
    if df["amount"].min() < 0:
        errors.append("Negative amounts found")
    if df["customer_id"].isna().any():
        errors.append("Missing customer IDs")
    if df.duplicated(subset=["transaction_id"]).any():
        errors.append("Duplicate transaction IDs")
    return errors

issues = validate_dataframe(df)
if issues:
    raise ValueError(f"Data quality issues: {issues}")

# Step 5: Write the cleaned data to a Parquet file
# Why: Parquet is columnar, compressed, and much faster than CSV for analytics
df.to_parquet("transactions_clean.parquet", index=False)
```

**Common pitfalls:**

- Modifying a list while iterating over it, causing skipped or duplicated elements.
- Loading an entire large file into memory at once instead of processing it line by line or in chunks.
- Using mutable default arguments (e.g., `def process(items=[])`) which share state across calls.
- Ignoring encoding issues when reading text files; always specify encoding explicitly (e.g., `encoding='utf-8'`).

---

## SQL Fundamentals – Querying, Filtering and Aggregation

SQL (Structured Query Language) is the universal language for working with relational data. For a Data Engineer, SQL is not just a query tool — it is the primary language for defining transformations, building data models, and validating data quality. Every data warehouse, every analytics engine, and most pipeline tools use SQL or a SQL-like dialect as the core interface.

A solid understanding of SQL means being able to retrieve data from multiple tables, filter and aggregate it, and reshape it for downstream use. Beyond simple queries, Data Engineers use SQL to define views, create tables, manage schemas, and write the transformation logic that turns raw data into reliable analytical datasets.

**Why it matters:** SQL is the language your entire data stack speaks. Spark SQL, dbt, BigQuery, Synapse, Snowflake, PostgreSQL — they all use SQL. An inability to write correct, efficient SQL is the single biggest bottleneck for a Data Engineer, because every pipeline, every model, and every dashboard depends on it.

**Key things to understand:**

- `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT` and how they compose
- Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`
- Join types: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN` and when to use each
- Subqueries and Common Table Expressions (CTEs) using `WITH` for readable multi-step queries
- `INSERT`, `UPDATE`, `DELETE` statements and the importance of `WHERE` clauses to avoid unintended data modification
- The difference between `NULL` handling (`IS NULL`, `COALESCE`) and empty values

**Code walkthrough:**

```sql
-- Step 1: Multi-table JOIN — combine customers with their orders
-- Why: real-world questions ("top customers by revenue") always span tables
SELECT
    c.name,
    c.email,
    COUNT(o.id)         AS order_count,
    SUM(o.total_amount) AS total_spent
FROM customers c
-- Step 2: LEFT JOIN keeps all customers, even those with zero orders
-- Why: INNER JOIN would silently drop customers who haven't ordered yet
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.created_at >= '2025-01-01'     -- filter rows BEFORE grouping
GROUP BY c.id, c.name, c.email
-- Step 3: HAVING filters groups AFTER aggregation
-- Why: WHERE can't reference aggregate functions like SUM()
HAVING SUM(o.total_amount) > 100
ORDER BY total_spent DESC
LIMIT 20;

-- Step 4: CTE for readable multi-step queries
-- Why: CTEs break complex logic into named, testable steps
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY 1
)
SELECT
    month,
    revenue,
    -- Step 5: Use COALESCE to handle NULL safely
    revenue - COALESCE(LAG(revenue) OVER (ORDER BY month), 0) AS month_over_month_change
FROM monthly_revenue
ORDER BY month;
```

**Common pitfalls:**

- Writing `SELECT *` in production queries; always select only the columns you need.
- Forgetting that `NULL` comparisons require `IS NULL` rather than `= NULL`.
- Using `GROUP BY` without understanding which columns must be grouped and which must be aggregated.
- Not understanding the order of SQL clause execution (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY).

---

## Relational Databases – Tables, Keys and Schema Design

A relational database organises data into tables with defined columns and data types. Each table represents an entity — customers, transactions, products — and relationships between entities are expressed through keys. A primary key uniquely identifies each row; a foreign key in one table references the primary key of another, creating the relationships that give relational databases their name.

Schema design is the process of deciding which tables to create, what columns each table has, and how tables relate to each other. Good schema design minimises redundancy (the same data stored in multiple places) and maximises integrity (constraints that prevent invalid data from being stored). For a Data Engineer, understanding relational schema design is the foundation for both operational databases and analytical data models.

**Why it matters:** Data Engineers work with relational databases constantly — as sources to extract from, as targets to load into, and as the foundation for data warehouse schemas. A poor understanding of relational concepts leads to pipelines that produce duplicate data, violate constraints, or build analytical models on an unstable foundation.

**Key things to understand:**

- Primary keys uniquely identify rows; composite keys use multiple columns together
- Foreign keys enforce referential integrity between tables
- Data types matter: choosing the right type (INTEGER, VARCHAR, TIMESTAMP, DECIMAL) affects storage, performance and correctness
- Normalisation basics: First Normal Form (atomic values), Second Normal Form (no partial dependencies), Third Normal Form (no transitive dependencies)
- Indexes speed up reads at the cost of slower writes; every table needs at least one index on its primary key
- Constraints (`NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`) enforce data quality at the database level

**Code walkthrough:**

```python
# Step 1: Connect to PostgreSQL from Python using psycopg2
# Why: Data Engineers frequently need to extract data from operational databases
import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    return psycopg2.connect(
        host="localhost",
        dbname="analytics",
        user="data_engineer",
        password="from-env-or-vault",  # never hardcode in production
        cursor_factory=RealDictCursor,  # rows returned as dicts
    )

# Step 2: Extract data using parameterised queries
# Why: parameterised queries prevent SQL injection and handle escaping
def extract_recent_orders(since_date: str) -> list[dict]:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT order_id, customer_id, total_amount, order_date
                FROM orders
                WHERE order_date >= %s
                ORDER BY order_date
                """,
                (since_date,),
            )
            return cur.fetchall()

# Step 3: Write extracted data to a file for loading into the warehouse
import json
from pathlib import Path

orders = extract_recent_orders("2025-01-01")
output = Path("staging/orders.json")
output.parent.mkdir(parents=True, exist_ok=True)
with open(output, "w", encoding="utf-8") as f:
    json.dump(orders, f, default=str)  # default=str handles dates

print(f"Extracted {len(orders)} orders to {output}")
```

**Common pitfalls:**

- Storing comma-separated values in a single column instead of creating a related table; this violates First Normal Form and makes querying painful.
- Forgetting to add foreign key constraints, allowing orphaned records to accumulate.
- Over-normalising to the point where every query requires five or more joins; pragmatic denormalisation is sometimes the right trade-off.
- Using auto-incrementing integers as primary keys for tables that will be merged across systems; UUIDs are often more appropriate.

---

## Data Pipelines – Extract, Transform, Load

A data pipeline is a series of automated steps that move data from one or more source systems to a destination where it can be analysed, reported on, or used by other applications. The classic pattern is ETL: Extract data from sources (databases, APIs, files), Transform it (clean, reshape, aggregate, enrich), and Load it into a target system (data warehouse, data lake, analytical database).

The alternative pattern is ELT: Extract and Load the raw data first into a powerful analytical system, then Transform it inside that system using SQL. ELT has become increasingly popular because modern cloud data warehouses (Snowflake, BigQuery, Synapse) have enough compute power to handle transformations at scale, and storing raw data first preserves the original source of truth.

**Why it matters:** Data pipelines are the core deliverable of a Data Engineer. Every report, dashboard, machine learning model, and business decision depends on data that was moved and transformed by a pipeline. A broken or unreliable pipeline means downstream consumers — analysts, data scientists, business users — cannot trust the data, which undermines the entire data function.

**Key things to understand:**

- The difference between ETL (transform before loading) and ELT (load first, transform in the warehouse)
- Batch processing (run on a schedule — hourly, daily) versus real-time/streaming processing (process data continuously as it arrives)
- Idempotency: a pipeline should produce the same result whether it runs once or multiple times for the same input; this is critical for safe retries after failures
- Incremental loading: processing only new or changed data since the last run, rather than reprocessing everything; this is essential for performance at scale
- Common sources: relational databases (via JDBC/ODBC), REST APIs, flat files (CSV, JSON, Parquet), message queues
- Common targets: data warehouses, data lakes (cloud storage like Azure Blob/S3 with structured formats), operational databases

**Code walkthrough:**

```python
# Step 1: A basic ETL script — Extract, Transform, Load
# Why: this is the fundamental pattern every data pipeline follows
import pandas as pd
from datetime import datetime, timezone

def extract(source_path: str) -> pd.DataFrame:
    """Extract: read raw data from the source system."""
    # Why: always specify dtypes and encoding to avoid silent type coercion
    df = pd.read_csv(source_path, encoding="utf-8")
    print(f"[EXTRACT] Read {len(df)} rows from {source_path}")
    return df

def transform(df: pd.DataFrame) -> pd.DataFrame:
    """Transform: clean, reshape, and enrich the data."""
    # Step 2: Standardise column names
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
    # Step 3: Remove duplicates
    before = len(df)
    df = df.drop_duplicates(subset=["transaction_id"])
    print(f"[TRANSFORM] Removed {before - len(df)} duplicate rows")
    # Step 4: Add a processing timestamp for auditability
    # Why: downstream consumers need to know when the data was processed
    df["loaded_at"] = datetime.now(timezone.utc).isoformat()
    return df

def load(df: pd.DataFrame, target_path: str):
    """Load: write the transformed data to the target."""
    # Why: Parquet is the standard format for analytical data — columnar & compressed
    df.to_parquet(target_path, index=False)
    print(f"[LOAD] Wrote {len(df)} rows to {target_path}")

# Step 5: Run the pipeline — idempotent if the source data hasn't changed
raw = extract("data/raw/sales_2025_01.csv")
clean = transform(raw)
load(clean, "data/processed/sales_2025_01.parquet")
```

**Common pitfalls:**

- Building pipelines that are not idempotent, causing duplicate data when retried after a failure.
- Not implementing incremental loading from the start, resulting in pipelines that become too slow as data volume grows.
- Ignoring error handling and monitoring; a pipeline that fails silently is worse than one that fails loudly.
- Coupling pipeline logic tightly to a specific source schema without an abstraction layer, causing breakage when the source changes.

---

## Linux and Command Line – Navigating the Data Engineering Environment

Data engineering tools run on Linux. Spark clusters, Airflow schedulers, Docker containers, cloud VMs — the vast majority of the infrastructure a Data Engineer interacts with runs on a Linux operating system. The command line interface (CLI) is the primary way to interact with these systems: starting and stopping services, inspecting logs, transferring files, and debugging pipeline failures.

Even when working on a Windows or macOS laptop, Data Engineers frequently SSH into remote Linux machines or interact with containers that run Linux. Understanding the file system structure, process management, and basic shell scripting is a prerequisite for working with any data infrastructure tool.

**Why it matters:** A Data Engineer who cannot navigate Linux is locked out of their own infrastructure. When a pipeline fails at 3 AM, the first step is usually to SSH into a server and inspect logs, check disk space, verify that a process is running, or examine a data file. These tasks require command line fluency.

**Key things to understand:**

- File system navigation: `ls`, `cd`, `pwd`, `mkdir`, `rm`, `cp`, `mv` and understanding absolute vs relative paths
- File inspection: `cat`, `head`, `tail`, `less`, `wc`, `grep` for searching content within files
- Permissions: `chmod`, `chown`, and understanding the read/write/execute model for user, group, and other
- Process management: `ps`, `top`, `kill`, and understanding background processes
- Pipes and redirection: `|` to chain commands, `>` and `>>` for output redirection, `<` for input redirection
- Environment variables and how to set them temporarily and persistently

**Code walkthrough:**

```bash
#!/bin/bash
# Step 1: Inspect a data file — check size, line count, and first rows
# Why: before writing any pipeline code, understand what the data looks like
ls -lh data/raw/claims.csv          # file size
wc -l data/raw/claims.csv           # row count (including header)
head -5 data/raw/claims.csv         # first 5 rows — inspect columns

# Step 2: Search for patterns in data files
# Why: quickly find data quality issues without opening a GUI
grep -c "NULL" data/raw/claims.csv  # count rows containing the string NULL
grep -i "error" logs/pipeline.log   # search logs for errors (case-insensitive)

# Step 3: Pipes — chain commands for quick analysis
# Why: pipes let you build ad-hoc data processing without writing a script
cat data/raw/claims.csv \
  | cut -d',' -f3 \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -10
# Breakdown: extract column 3 → sort → count unique values → show top 10

# Step 4: Monitor disk space — pipelines fail when disk is full
df -h /data                   # check available disk space
du -sh /data/raw/*            # size of each directory in /data/raw

# Step 5: Environment variables — configure pipelines without hardcoding
export DATABASE_URL="postgresql://user:pass@host:5432/analytics"
echo $DATABASE_URL
# Why: environment variables change per environment (dev, staging, prod)
# without modifying code
```

**Common pitfalls:**

- Running commands as root when not necessary; always use the minimum permissions required.
- Deleting files or directories without confirming what will be removed; `rm -rf` is irreversible.
- Not understanding the difference between `>` (overwrite) and `>>` (append) when redirecting output.
- Ignoring file encoding issues when transferring files between Windows and Linux (line endings, character encoding).

---

## Data Modelling Basics – Structuring Data for Purpose

Data modelling is the process of defining how data is organised, stored, and related. A data model is an abstraction that describes the entities in a domain, their attributes, and the relationships between them. There are different types of data models for different purposes: conceptual models describe what entities exist, logical models describe how entities relate, and physical models describe how data is actually stored in a database.

For a Data Engineer at the beginner level, the most important distinction is between operational (OLTP) and analytical (OLAP) data models. Operational models are optimised for fast individual transactions — inserting an order, updating a customer record. Analytical models are optimised for fast aggregation across large datasets — total sales by region, average response time by month.

**Why it matters:** Data modelling is the blueprint for everything a Data Engineer builds. A well-designed data model makes pipelines simpler, queries faster, and data consumers more productive. A poorly designed model forces complex, brittle transformations and produces confusing, unreliable outputs.

**Key things to understand:**

- Entity-Relationship (ER) diagrams as a visual tool for describing data models
- The difference between OLTP (operational, row-oriented, normalised) and OLAP (analytical, column-oriented, often denormalised)
- Cardinality: one-to-one, one-to-many, many-to-many relationships and how to implement each
- The concept of a source of truth: which system is the authoritative source for each piece of data
- Why the same data may need to be modelled differently depending on who consumes it and for what purpose
- Surrogate keys (system-generated identifiers) versus natural keys (business-meaningful identifiers like email or product code)

**Code walkthrough:**

```python
# Step 1: Define entities and relationships as Python dataclasses
# Why: understanding entities and their relationships is the core of data modelling
from dataclasses import dataclass
from datetime import date

@dataclass
class Customer:
    """Entity: represents a customer in the operational system."""
    customer_id: int        # primary key — uniquely identifies this customer
    name: str
    email: str
    created_at: date

@dataclass
class Product:
    """Entity: represents a product that can be purchased."""
    product_id: int         # primary key
    product_name: str
    category: str
    price: float

@dataclass
class Order:
    """Entity: represents a transaction linking a customer to a product."""
    order_id: int           # primary key
    customer_id: int        # foreign key → Customer
    product_id: int         # foreign key → Product
    quantity: int
    order_date: date

# Step 2: Demonstrate cardinality
# Why: understanding one-to-many and many-to-many is essential for schema design
# One customer can place many orders (one-to-many)
# One order references one product (many-to-one)
# Customers to Products is many-to-many (through the Order table)

# Step 3: Simple validation — check referential integrity
def validate_referential_integrity(
    orders: list[Order],
    customer_ids: set[int],
    product_ids: set[int],
) -> list[str]:
    """Check that all foreign keys reference existing entities."""
    errors = []
    for order in orders:
        if order.customer_id not in customer_ids:
            errors.append(f"Order {order.order_id}: unknown customer {order.customer_id}")
        if order.product_id not in product_ids:
            errors.append(f"Order {order.order_id}: unknown product {order.product_id}")
    return errors

# Step 4: Example usage
customers = {1, 2, 3}
products = {101, 102}
orders = [
    Order(1, 1, 101, 2, date(2025, 3, 1)),
    Order(2, 2, 999, 1, date(2025, 3, 2)),  # bad product_id
]

issues = validate_referential_integrity(orders, customers, products)
for issue in issues:
    print(f"INTEGRITY ERROR: {issue}")
# Output: INTEGRITY ERROR: Order 2: unknown product 999
```

**Common pitfalls:**

- Designing a data model without understanding who will consume the data and what questions they need to answer.
- Using the same model for both operational and analytical workloads, resulting in a design that is suboptimal for both.
- Neglecting to document the data model; a model that exists only in someone's head is a single point of failure.
- Assuming data modelling is a one-time activity; models evolve as business requirements change.

---

## File Formats – CSV, JSON and Parquet

Data engineers work with data stored in files as frequently as they work with databases. Understanding the trade-offs between common file formats is a fundamental skill that affects pipeline performance, storage costs, and compatibility with downstream tools. The three formats every beginner must know are CSV (row-oriented text), JSON (nested text), and Parquet (columnar binary).

**CSV (Comma-Separated Values)** is the simplest tabular format — human-readable, universally supported, and easy to produce from spreadsheets and legacy systems. However, CSV has no built-in schema (column types are ambiguous), no compression, and requires reading the entire file even when only a few columns are needed. CSV is fine for small datasets and data exchange with non-technical stakeholders, but it is a poor choice for production analytical pipelines.

**JSON (JavaScript Object Notation)** supports nested and semi-structured data — objects within objects, arrays of varying length. This makes it the default format for REST API responses and event logs. JSON is human-readable but verbose (field names repeat on every record), and like CSV it has no columnar access — every record must be parsed to extract a single field. JSONL (JSON Lines, one JSON object per line) is the preferred variant for data pipelines because it supports line-by-line streaming without loading the entire file.

**Parquet** is a columnar, binary, compressed file format designed for analytical workloads. It stores data column by column rather than row by row, which means a query that needs only three columns out of fifty reads only those three columns from disk. Parquet supports schema metadata (column names and types are embedded in the file), efficient encoding (run-length encoding, dictionary encoding), and compression (Snappy, Zstandard). Parquet is the default output format for Spark, dbt, and most cloud data platforms.

**Why it matters:** Choosing the wrong file format in a pipeline creates compounding problems — slow reads, bloated storage, silent type errors, and compatibility issues. Data engineers who understand the trade-offs choose the right format for each stage: CSV or JSON for ingestion from external sources, Parquet for internal storage and analytical processing.

**Key things to understand:**

- CSV: simple, universal, no schema, no compression, row-oriented — read the entire file for any query
- JSON/JSONL: supports nested data, verbose, no columnar access — ideal for APIs and event logs
- Parquet: columnar, compressed, schema-embedded, binary — the standard for analytical data in modern pipelines
- Apache Avro: a row-oriented binary format with embedded schema, commonly used for streaming data in Kafka due to compact serialisation and schema evolution support
- Compression trade-offs: Snappy (fast, moderate compression) vs Zstandard/gzip (slower, higher compression) — choose based on whether the workload is CPU-bound or I/O-bound
- Schema-on-read (CSV/JSON — schema is inferred at read time) vs schema-on-write (Parquet/Avro — schema is enforced when data is written)

**Code walkthrough:**

```python
# Step 1: Compare file formats — write the same data in CSV, JSON, and Parquet
# Why: understanding the practical differences helps choose the right format
import pandas as pd
from pathlib import Path

df = pd.DataFrame({
    "customer_id": range(1, 10001),
    "name": [f"Customer {i}" for i in range(1, 10001)],
    "revenue": [round(i * 1.5, 2) for i in range(1, 10001)],
})

# CSV — human-readable but no schema, no compression
df.to_csv("customers.csv", index=False)

# JSON Lines — one record per line, supports streaming
df.to_json("customers.jsonl", orient="records", lines=True)

# Parquet — columnar, compressed, schema embedded
df.to_parquet("customers.parquet", index=False)

# Step 2: Compare file sizes
for fmt in ["customers.csv", "customers.jsonl", "customers.parquet"]:
    size_kb = Path(fmt).stat().st_size / 1024
    print(f"{fmt:>25s}: {size_kb:.1f} KB")
# Typical output:  CSV ~250 KB, JSONL ~350 KB, Parquet ~50 KB

# Step 3: Columnar read — Parquet reads only requested columns
# Why: reading 1 column from a 50-column Parquet file skips 98% of I/O
df_parquet = pd.read_parquet("customers.parquet", columns=["revenue"])
print(f"Read {len(df_parquet)} rows, {list(df_parquet.columns)} columns only")
```

**Common pitfalls:**

- Using CSV for intermediate pipeline storage — it has no schema, no compression, and forces full file reads on every downstream step.
- Storing nested JSON in a data warehouse column and attempting to query it with SQL — flatten it during ingestion instead.
- Not specifying compression when writing Parquet — the default in most libraries is Snappy, which is a good starting point, but verify it is applied.
- Assuming all Parquet files have the same schema — different batches may have different columns if schema enforcement is not configured.
