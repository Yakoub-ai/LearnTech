export const labs = [
  // ============================================================
  // de-lab-1: Build an ETL Pipeline (copied from interactiveLabs.js)
  // ============================================================
  {
    id: 'de-lab-1',
    roleId: 'data-engineer',
    level: 'beginner',
    title: 'Build an ETL Pipeline',
    description: 'Learn the Extract-Transform-Load pattern by building a pipeline that processes CSV data, transforms it, and loads it into a structured format.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building an ETL pipeline, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Extract — Read Raw Data',
        instruction: 'Create a function that parses CSV-formatted text into a list of dictionaries. Each row becomes a dictionary with column headers as keys.',
        starterCode: `# ETL Pipeline — Step 2: Extract
# Parse CSV text into structured data

def extract_csv(csv_text):
    """Parse CSV text into a list of dictionaries.

    Args:
        csv_text: String containing CSV data with headers
    Returns:
        List of dicts, one per row
    """
    # TODO: Split into lines, extract headers from first line
    # Then create a dict for each data row
    pass

csv_data = """name,age,city,salary
Alice,30,Stockholm,55000
Bob,25,Gothenburg,42000
Charlie,35,Malmö,68000
Diana,28,Uppsala,49000
Eve,,Stockholm,51000"""

records = extract_csv(csv_data)
print(f"Extracted {len(records)} records")
for r in records:
    print(r)`,
        hints: [
          'Use csv_text.strip().split("\\n") to get lines',
          'First line is headers: headers = lines[0].split(",")',
          'zip(headers, values) pairs headers with each row\'s values'
        ],
        expectedOutput: `Extracted 5 records
{'name': 'Alice', 'age': '30', 'city': 'Stockholm', 'salary': '55000'}
...`,
        solution: `def extract_csv(csv_text):
    lines = csv_text.strip().split("\\n")
    headers = lines[0].split(",")
    records = []
    for line in lines[1:]:
        values = line.split(",")
        record = dict(zip(headers, values))
        records.append(record)
    return records

csv_data = """name,age,city,salary
Alice,30,Stockholm,55000
Bob,25,Gothenburg,42000
Charlie,35,Malmö,68000
Diana,28,Uppsala,49000
Eve,,Stockholm,51000"""

records = extract_csv(csv_data)
print(f"Extracted {len(records)} records")
for r in records:
    print(r)`
      },
      {
        title: 'Step 3: Transform — Clean and Enrich',
        instruction: 'Add transformation logic: convert types, handle missing values, and add computed fields.',
        starterCode: `# ETL Pipeline — Step 3: Transform

def transform(records):
    """Clean and enrich records.

    Rules:
    - Convert age to int (default 0 if missing/empty)
    - Convert salary to float
    - Add 'salary_band' field: 'junior' (<45000), 'mid' (45000-60000), 'senior' (>60000)
    - Skip records where name is empty

    Returns:
        List of cleaned, enriched dicts
    """
    # TODO: Implement transformation rules
    pass

# Test with extracted data
cleaned = transform(records)
print(f"Transformed: {len(records)} → {len(cleaned)} records")
for r in cleaned:
    print(f"  {r['name']}: age={r['age']}, band={r['salary_band']}")`,
        hints: [
          'Use int(r["age"]) if r["age"] else 0 for safe conversion',
          'Check salary thresholds with if/elif for salary_band',
          'Use a list comprehension or filter to skip empty names'
        ],
        expectedOutput: `Transformed: 5 → 5 records
  Alice: age=30, band=mid
  Bob: age=25, band=junior
  Charlie: age=35, band=senior
  Diana: age=28, band=mid
  Eve: age=0, band=mid`,
        solution: `def transform(records):
    cleaned = []
    for r in records:
        if not r.get('name', '').strip():
            continue

        age = int(r['age']) if r.get('age', '').strip() else 0
        salary = float(r['salary']) if r.get('salary', '').strip() else 0

        if salary < 45000:
            band = 'junior'
        elif salary <= 60000:
            band = 'mid'
        else:
            band = 'senior'

        cleaned.append({
            'name': r['name'].strip(),
            'age': age,
            'city': r.get('city', '').strip(),
            'salary': salary,
            'salary_band': band
        })
    return cleaned

cleaned = transform(records)
print(f"Transformed: {len(records)} → {len(cleaned)} records")
for r in cleaned:
    print(f"  {r['name']}: age={r['age']}, band={r['salary_band']}")`
      },
      {
        title: 'Step 4: Load — Write to Structured Output',
        instruction: 'Create a load function that writes the transformed data to a JSON-like structure grouped by city, simulating a data warehouse load.',
        starterCode: `# ETL Pipeline — Step 4: Load

def load_grouped(records, group_by='city'):
    """Group records by a key and return structured output.

    Args:
        records: List of transformed dicts
        group_by: Field name to group by
    Returns:
        Dict with group keys mapping to lists of records
    """
    # TODO: Group records by the specified field
    pass

def generate_summary(grouped):
    """Generate a summary report from grouped data."""
    # TODO: For each group, show count, avg salary, salary bands
    pass

# Run the load step
grouped = load_grouped(cleaned, group_by='city')
print("=== Data Warehouse Output ===")
for city, people in grouped.items():
    print(f"\\n{city} ({len(people)} employees):")
    for p in people:
        print(f"  - {p['name']}: {p['salary_band']}")`,
        hints: [
          'Use a defaultdict(list) or regular dict with setdefault()',
          'grouped.setdefault(record[group_by], []).append(record)',
          'For avg salary: sum(r["salary"] for r in people) / len(people)'
        ],
        expectedOutput: `=== Data Warehouse Output ===

Stockholm (2 employees):
  - Alice: mid
  - Eve: mid

Gothenburg (1 employees):
  - Bob: junior
...`,
        solution: `def load_grouped(records, group_by='city'):
    grouped = {}
    for record in records:
        key = record.get(group_by, 'Unknown')
        grouped.setdefault(key, []).append(record)
    return grouped

grouped = load_grouped(cleaned, group_by='city')
print("=== Data Warehouse Output ===")
for city, people in grouped.items():
    print(f"\\n{city} ({len(people)} employees):")
    for p in people:
        print(f"  - {p['name']}: {p['salary_band']}")`
      },
      {
        title: 'Step 5: Orchestrate the Full Pipeline',
        instruction: 'Tie everything together into a reusable pipeline function with logging, error handling, and a summary report.',
        starterCode: `# ETL Pipeline — Step 5: Orchestrate

import time

def run_pipeline(csv_text, group_by='city'):
    """Run the full ETL pipeline with logging.

    Steps:
    1. Extract CSV data
    2. Transform and clean records
    3. Load into grouped structure
    4. Print summary report

    Returns:
        Dict with pipeline results and metadata
    """
    # TODO: Implement the full pipeline with timing and logging
    # Track: start_time, records_extracted, records_transformed, groups_created
    pass

# Run it!
result = run_pipeline(csv_data, group_by='city')
print(f"\\nPipeline completed in {result['duration_ms']:.0f}ms")
print(f"Records: {result['extracted']} → {result['transformed']}")
print(f"Groups: {result['groups']}")`,
        hints: [
          'Use time.time() before and after to measure duration',
          'Call extract_csv(), transform(), load_grouped() in sequence',
          'Return a metadata dict with counts and timing'
        ],
        expectedOutput: `[EXTRACT] Parsing CSV data...
[EXTRACT] Found 5 records
[TRANSFORM] Cleaning and enriching...
[TRANSFORM] 5 → 5 records
[LOAD] Grouping by city...
[LOAD] Created 4 groups

Pipeline completed in Xms
Records: 5 → 5
Groups: 4`,
        solution: `import time

def run_pipeline(csv_text, group_by='city'):
    start = time.time()

    print("[EXTRACT] Parsing CSV data...")
    records = extract_csv(csv_text)
    print(f"[EXTRACT] Found {len(records)} records")

    print("[TRANSFORM] Cleaning and enriching...")
    cleaned = transform(records)
    print(f"[TRANSFORM] {len(records)} → {len(cleaned)} records")

    print(f"[LOAD] Grouping by {group_by}...")
    grouped = load_grouped(cleaned, group_by=group_by)
    print(f"[LOAD] Created {len(grouped)} groups")

    duration = (time.time() - start) * 1000

    return {
        'extracted': len(records),
        'transformed': len(cleaned),
        'groups': len(grouped),
        'data': grouped,
        'duration_ms': duration
    }

result = run_pipeline(csv_data, group_by='city')
print(f"\\nPipeline completed in {result['duration_ms']:.0f}ms")
print(f"Records: {result['extracted']} → {result['transformed']}")
print(f"Groups: {result['groups']}")`
      }
    ]
  },

  // ============================================================
  // de-lab-2: SQL Query with Joins and Aggregation (from de-1)
  // ============================================================
  {
    id: 'de-lab-2',
    roleId: 'data-engineer',
    level: 'beginner',
    title: 'SQL Analytics: Joins, Aggregations, and Window Functions',
    description: 'Master the SQL patterns used daily in data warehouses — multi-table joins, GROUP BY aggregations, HAVING filters, and window functions for running totals and rankings.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before writing analytical SQL, ensure your database environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: PostgreSQL 16+ (or SQLite via sqliteonline.com for zero install) and a database client (psql, DBeaver, or TablePlus). Load your sample data and verify your connection before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Beginners: visit https://sqliteonline.com/ — no install required',
          'Advanced: run `psql -U postgres -c "SELECT version();"` to test your PostgreSQL connection'
        ],
        expectedOutput: 'PostgreSQL 16.x installed (or SQLite Online open in browser)\nDatabase connection verified\nReady to write analytical SQL',
        solution: null
      },
      {
        title: 'Step 2: Write a Multi-Table JOIN with Aggregation',
        instruction: `Build a query that answers: "Who are our top 10 customers by total spending over the last year, with at least 5 orders?"

WHY: Aggregated JOIN queries are the foundation of business intelligence. They combine relational data (customers + orders) into actionable summaries that power dashboards and reports.

HOW: Use LEFT JOIN to keep all customers even with no orders, aggregate with GROUP BY, post-aggregate filter with HAVING, and sort with ORDER BY. Important: put the date range filter in the JOIN's ON clause (not in WHERE) so that customers with no recent orders still appear as rows with NULL values rather than being eliminated entirely.`,
        starterCode: `-- SQL Analytics — Step 2: Aggregation with JOIN
-- Tables available:
--   customers(customer_id, customer_name, email, signup_date)
--   orders(order_id, customer_id, amount, order_date)

-- TODO: Write a query that returns:
-- customer_id, customer_name, total_orders, total_spent, avg_order_value
-- Filter: orders in the last 1 year, customers with more than 5 orders
-- Sort: by total_spent descending, limit 10

SELECT
    -- your columns here
FROM customers c
-- your LEFT JOIN here, with date filter in ON clause
-- e.g.: LEFT JOIN orders o ON c.customer_id = o.customer_id AND o.order_date >= ...
GROUP BY -- your grouping
HAVING -- your post-aggregate filter
ORDER BY -- your sort
LIMIT 10;`,
        hints: [
          'JOIN orders on customer_id with date filter in ON clause: LEFT JOIN orders o ON c.customer_id = o.customer_id AND o.order_date >= NOW() - INTERVAL \'1 year\'',
          'Putting the date filter in ON (not WHERE) preserves LEFT JOIN semantics — customers with no recent orders still appear with NULL aggregates instead of being eliminated',
          'Aggregate functions: COUNT(o.order_id) as total_orders, SUM(o.amount) as total_spent, AVG(o.amount) as avg_order_value'
        ],
        expectedOutput: `customer_id | customer_name | total_orders | total_spent | avg_order_value
------------|---------------|--------------|-------------|----------------
1042        | Acme Corp     | 24           | 48200.00    | 2008.33
0891        | NovaTech AB   | 18           | 36750.00    | 2041.67
...
(10 rows returned)`,
        solution: `SELECT
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS total_orders,
    SUM(o.amount) AS total_spent,
    AVG(o.amount) AS avg_order_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
  AND o.order_date >= NOW() - INTERVAL '1 year'
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) > 5
ORDER BY total_spent DESC
LIMIT 10;`
      },
      {
        title: 'Step 3: Add Window Functions for Rankings and Running Totals',
        instruction: `Extend your analysis with window functions to rank customers within their region and compute a running total of revenue over time.

WHY: Window functions perform calculations across a set of rows related to the current row without collapsing them like GROUP BY does. They are essential for ranking, percentiles, and time-series analysis.

HOW: Use RANK() OVER (PARTITION BY ... ORDER BY ...) for per-group rankings, and SUM() OVER (ORDER BY date) for a cumulative sum.`,
        starterCode: `-- SQL Analytics — Step 3: Window Functions
-- Add to your previous query:
-- 1. Rank each customer by total_spent within their signup_year
-- 2. Compute a cumulative revenue column (running total of total_spent ordered by total_spent desc)

WITH customer_summary AS (
    SELECT
        c.customer_id,
        c.customer_name,
        EXTRACT(YEAR FROM c.signup_date) AS signup_year,
        COUNT(o.order_id) AS total_orders,
        SUM(o.amount) AS total_spent
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.order_date >= NOW() - INTERVAL '1 year'
    GROUP BY c.customer_id, c.customer_name, c.signup_date
    HAVING COUNT(o.order_id) > 5
)
SELECT
    customer_id,
    customer_name,
    signup_year,
    total_orders,
    total_spent,
    -- TODO: Add rank within signup_year partitioned by total_spent desc
    -- TODO: Add running total of total_spent ordered by total_spent desc
FROM customer_summary
ORDER BY total_spent DESC
LIMIT 10;`,
        hints: [
          'Rank: RANK() OVER (PARTITION BY signup_year ORDER BY total_spent DESC) AS year_rank',
          'Running total: SUM(total_spent) OVER (ORDER BY total_spent DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_revenue',
          'CTEs (WITH clause) let you build readable layered queries — use them instead of nested subqueries'
        ],
        expectedOutput: `customer_id | customer_name | signup_year | total_orders | total_spent | year_rank | cumulative_revenue
------------|---------------|-------------|--------------|-------------|-----------|-------------------
1042        | Acme Corp     | 2022        | 24           | 48200.00    | 1         | 48200.00
0891        | NovaTech AB   | 2023        | 18           | 36750.00    | 1         | 84950.00
...`,
        solution: `WITH customer_summary AS (
    SELECT
        c.customer_id,
        c.customer_name,
        EXTRACT(YEAR FROM c.signup_date) AS signup_year,
        COUNT(o.order_id) AS total_orders,
        SUM(o.amount) AS total_spent
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.order_date >= NOW() - INTERVAL '1 year'
    GROUP BY c.customer_id, c.customer_name, c.signup_date
    HAVING COUNT(o.order_id) > 5
)
SELECT
    customer_id,
    customer_name,
    signup_year,
    total_orders,
    total_spent,
    RANK() OVER (PARTITION BY signup_year ORDER BY total_spent DESC) AS year_rank,
    SUM(total_spent) OVER (
        ORDER BY total_spent DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue
FROM customer_summary
ORDER BY total_spent DESC
LIMIT 10;`
      },
      {
        title: 'Step 4: Detect Anomalies with Statistical SQL',
        instruction: `Use SQL to flag orders that deviate significantly from each customer's average — a classic data quality and fraud detection pattern.

WHY: Outlier detection at the query layer catches data issues before they propagate to downstream models. Flagging records with z-scores or IQR thresholds is a standard ELT data quality technique.

HOW: Compute per-customer statistics with window functions (AVG, STDDEV), then flag rows where the value deviates more than 2 standard deviations.`,
        starterCode: `-- SQL Analytics — Step 4: Anomaly Detection
-- Flag orders where amount deviates > 2 std deviations from the customer's average

WITH order_stats AS (
    SELECT
        order_id,
        customer_id,
        amount,
        order_date,
        -- TODO: Compute avg and stddev of amount per customer using window functions
        AVG(amount) OVER (PARTITION BY customer_id) AS customer_avg,
        -- add stddev here
    FROM orders
),
flagged AS (
    SELECT
        order_id,
        customer_id,
        amount,
        order_date,
        customer_avg,
        customer_stddev,
        -- TODO: Compute z_score = (amount - customer_avg) / NULLIF(customer_stddev, 0)
        -- TODO: Add is_anomaly flag: ABS(z_score) > 2
    FROM order_stats
)
SELECT *
FROM flagged
WHERE is_anomaly = TRUE
ORDER BY ABS(z_score) DESC;`,
        hints: [
          'STDDEV: STDDEV(amount) OVER (PARTITION BY customer_id) AS customer_stddev',
          'Z-score: (amount - customer_avg) / NULLIF(customer_stddev, 0) AS z_score — NULLIF prevents divide-by-zero',
          'Boolean flag: ABS((amount - customer_avg) / NULLIF(customer_stddev, 0)) > 2 AS is_anomaly'
        ],
        expectedOutput: `order_id | customer_id | amount   | customer_avg | customer_stddev | z_score | is_anomaly
---------|-------------|----------|--------------|-----------------|---------|----------
9041     | 1042        | 15000.00 | 2008.33      | 612.45          | 21.2    | true
7823     | 0891        | 8900.00  | 2041.67      | 589.20          | 11.6    | true
...`,
        solution: `WITH order_stats AS (
    SELECT
        order_id,
        customer_id,
        amount,
        order_date,
        AVG(amount) OVER (PARTITION BY customer_id) AS customer_avg,
        STDDEV(amount) OVER (PARTITION BY customer_id) AS customer_stddev
    FROM orders
),
flagged AS (
    SELECT
        order_id,
        customer_id,
        amount,
        order_date,
        customer_avg,
        customer_stddev,
        (amount - customer_avg) / NULLIF(customer_stddev, 0) AS z_score,
        ABS((amount - customer_avg) / NULLIF(customer_stddev, 0)) > 2 AS is_anomaly
    FROM order_stats
)
SELECT *
FROM flagged
WHERE is_anomaly = TRUE
ORDER BY ABS(z_score) DESC;`
      },
      {
        title: 'Step 5: Persist Results as a Materialized View',
        instruction: `Create a materialized view that pre-computes the customer summary so downstream queries don't re-run expensive joins and aggregations each time.

WHY: Materialized views cache the result of complex queries. In data warehouses like Redshift, BigQuery, and Snowflake (and PostgreSQL), they dramatically reduce query time for frequently accessed analytical results.

HOW: Use CREATE MATERIALIZED VIEW, then REFRESH MATERIALIZED VIEW CONCURRENTLY for zero-downtime refreshes that don't lock reads.`,
        starterCode: `-- SQL Analytics — Step 5: Materialized View
-- Persist the customer summary as a materialized view for fast downstream access

-- TODO: Create a materialized view named mv_customer_annual_summary
-- that contains: customer_id, customer_name, signup_year,
-- total_orders, total_spent, avg_order_value, year_rank
-- Use your CTE query from Step 3 as the SELECT body

-- CREATE MATERIALIZED VIEW mv_customer_annual_summary AS
-- ... your query here ...
-- WITH DATA;

-- TODO: Create an index to speed up lookups by customer_id
-- CREATE INDEX ...

-- Refresh command (run after new data arrives in orders):
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_customer_annual_summary;

-- Verify:
SELECT * FROM mv_customer_annual_summary ORDER BY total_spent DESC LIMIT 5;`,
        hints: [
          'Syntax: CREATE MATERIALIZED VIEW mv_name AS SELECT ... WITH DATA;',
          'Index: CREATE INDEX idx_mv_customer ON mv_customer_annual_summary (customer_id);',
          'REFRESH MATERIALIZED VIEW CONCURRENTLY requires a unique index on the view — add one on customer_id'
        ],
        expectedOutput: `Materialized view "mv_customer_annual_summary" created
Index "idx_mv_customer" created
Materialized view refreshed (CONCURRENTLY — no read locks)

customer_id | customer_name | total_orders | total_spent | year_rank
------------|---------------|--------------|-------------|----------
1042        | Acme Corp     | 24           | 48200.00    | 1
0891        | NovaTech AB   | 18           | 36750.00    | 1
(5 rows)`,
        solution: `CREATE MATERIALIZED VIEW mv_customer_annual_summary AS
WITH customer_summary AS (
    SELECT
        c.customer_id,
        c.customer_name,
        EXTRACT(YEAR FROM c.signup_date) AS signup_year,
        COUNT(o.order_id) AS total_orders,
        SUM(o.amount) AS total_spent,
        AVG(o.amount) AS avg_order_value
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.order_date >= NOW() - INTERVAL '1 year'
    GROUP BY c.customer_id, c.customer_name, c.signup_date
    HAVING COUNT(o.order_id) > 5
)
SELECT
    customer_id,
    customer_name,
    signup_year,
    total_orders,
    total_spent,
    avg_order_value,
    RANK() OVER (PARTITION BY signup_year ORDER BY total_spent DESC) AS year_rank
FROM customer_summary
WITH DATA;

CREATE UNIQUE INDEX idx_mv_customer ON mv_customer_annual_summary (customer_id);

-- Refresh with zero read-locks after new orders arrive:
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_customer_annual_summary;

SELECT * FROM mv_customer_annual_summary ORDER BY total_spent DESC LIMIT 5;`
      }
    ]
  },

  // ============================================================
  // de-lab-3: PySpark ETL Pipeline (from de-2)
  // ============================================================
  {
    id: 'de-lab-3',
    roleId: 'data-engineer',
    level: 'mid',
    title: 'PySpark ETL Pipeline: Scalable Distributed Processing',
    description: 'Build a production-grade PySpark ETL pipeline that reads raw CSV data, applies distributed transformations with data quality checks, and writes clean Parquet output partitioned for efficient downstream queries.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'PySpark requires Java and the pyspark package. Click "Go to Dev Setup" below for complete instructions. You will need: Python 3.12+, Java 8+ installed and JAVA_HOME set, pyspark installed via pip, and sufficient memory (at least 4 GB free RAM recommended for local Spark sessions). Verify your setup before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Check Java: java -version (must be 8+)',
          'Test PySpark: python -c "from pyspark.sql import SparkSession; spark = SparkSession.builder.appName(\'test\').getOrCreate(); print(\'Spark ready\')"'
        ],
        expectedOutput: `java version "11.0.x"
PySpark version: 3.5.x
Spark session created: local[*]
Spark ready`,
        solution: null
      },
      {
        title: 'Step 2: Create a SparkSession and Extract Data',
        instruction: `Initialize a SparkSession and read raw CSV data into a Spark DataFrame.

WHY: The SparkSession is the entry point to all Spark functionality. Reading into a DataFrame (rather than an RDD) gives you a query-optimized, column-based API that Spark's Catalyst optimizer can plan efficiently.

HOW: Use SparkSession.builder with sensible local configs, then spark.read.csv with inferSchema and header options. Always call printSchema() and show() to verify the shape before transforming.`,
        starterCode: `# PySpark ETL — Step 2: Create Session and Extract
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

# TODO: Build a SparkSession named "ETL_Pipeline"
# Configure for local mode with 2 cores and 2g driver memory
# Enable adaptive query execution (spark.sql.adaptive.enabled = true)
spark = (
    SparkSession.builder
    # .appName(...)
    # .master(...)
    # .config(...)
    .getOrCreate()
)

# TODO: Read 'data/transactions.csv' with header=True and inferSchema=True
# Assign to variable: raw_df
raw_df = None

# Inspect the data
print(f"Row count: {raw_df.count()}")
raw_df.printSchema()
raw_df.show(5, truncate=False)`,
        hints: [
          'Builder chain: SparkSession.builder.appName("ETL_Pipeline").master("local[2]").config("spark.driver.memory", "2g").config("spark.sql.adaptive.enabled", "true").getOrCreate()',
          'Read CSV: spark.read.option("header", True).option("inferSchema", True).csv("data/transactions.csv")',
          'Always call .cache() before multiple actions on the same DataFrame to avoid re-reading the source'
        ],
        expectedOutput: `Row count: 125000
root
 |-- transaction_id: string (nullable = true)
 |-- customer_id: string (nullable = true)
 |-- amount: double (nullable = true)
 |-- timestamp: timestamp (nullable = true)
 |-- category: string (nullable = true)

+---------------+-----------+-------+-------------------+----------+
|transaction_id |customer_id|amount |timestamp          |category  |
+---------------+-----------+-------+-------------------+----------+
|TXN-0001       |C-1042     |245.50 |2024-03-15 09:12:00|retail    |
...`,
        solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = (
    SparkSession.builder
    .appName("ETL_Pipeline")
    .master("local[2]")
    .config("spark.driver.memory", "2g")
    .config("spark.sql.adaptive.enabled", "true")
    .getOrCreate()
)

raw_df = (
    spark.read
    .option("header", True)
    .option("inferSchema", True)
    .csv("data/transactions.csv")
)

raw_df.cache()
print(f"Row count: {raw_df.count()}")
raw_df.printSchema()
raw_df.show(5, truncate=False)`
      },
      {
        title: 'Step 3: Transform — Filter, Enrich, and Aggregate',
        instruction: `Apply distributed transformations: drop invalid rows, derive new columns, and aggregate by customer and date.

WHY: Transformations in Spark are lazy — they build a logical plan but don't execute until an action (count, write, show) is called. This lets Spark's optimizer reorder and merge operations for maximum efficiency.

HOW: Chain .filter(), .withColumn(), and .groupBy().agg() calls. Use Spark SQL functions (not Python built-ins) for column expressions so they run on the Spark executors, not the driver.`,
        starterCode: `# PySpark ETL — Step 3: Transform
from pyspark.sql.functions import col, sum as spark_sum, avg, date_format, when, lit

# TODO 1: Filter out rows where amount <= 0 or customer_id is null
filtered_df = raw_df  # replace with filter chain

# TODO 2: Add derived columns:
#   - transaction_date: format timestamp as 'yyyy-MM-dd'
#   - amount_tier: 'small' (<100), 'medium' (100-999), 'large' (>=1000)
enriched_df = filtered_df  # replace with withColumn chain

# TODO 3: Aggregate by customer_id and transaction_date
#   - daily_total: sum of amount
#   - daily_avg: avg of amount
#   - transaction_count: count of rows
aggregated_df = enriched_df  # replace with groupBy().agg()

aggregated_df.orderBy("customer_id", "transaction_date").show(10)
print(f"Aggregated rows: {aggregated_df.count()}")`,
        hints: [
          'Filter: .filter((col("amount") > 0) & col("customer_id").isNotNull())',
          'Date format: .withColumn("transaction_date", date_format(col("timestamp"), "yyyy-MM-dd"))',
          'Amount tier: .withColumn("amount_tier", when(col("amount") < 100, "small").when(col("amount") < 1000, "medium").otherwise("large"))',
          'Aggregate: .groupBy("customer_id", "transaction_date").agg(spark_sum("amount").alias("daily_total"), avg("amount").alias("daily_avg"), count("*").alias("transaction_count"))'
        ],
        expectedOutput: `+-----------+----------------+-----------+---------+-----------------+
|customer_id|transaction_date|daily_total|daily_avg|transaction_count|
+-----------+----------------+-----------+---------+-----------------+
|C-1001     |2024-01-01      |1245.50    |415.17   |3                |
|C-1001     |2024-01-02      |892.00     |446.00   |2                |
...
Aggregated rows: 48320`,
        solution: `from pyspark.sql.functions import col, sum as spark_sum, avg, count, date_format, when

filtered_df = raw_df.filter(
    (col("amount") > 0) & col("customer_id").isNotNull()
)

enriched_df = (
    filtered_df
    .withColumn("transaction_date", date_format(col("timestamp"), "yyyy-MM-dd"))
    .withColumn(
        "amount_tier",
        when(col("amount") < 100, "small")
        .when(col("amount") < 1000, "medium")
        .otherwise("large")
    )
)

aggregated_df = (
    enriched_df
    .groupBy("customer_id", "transaction_date")
    .agg(
        spark_sum("amount").alias("daily_total"),
        avg("amount").alias("daily_avg"),
        count("*").alias("transaction_count")
    )
)

aggregated_df.orderBy("customer_id", "transaction_date").show(10)
print(f"Aggregated rows: {aggregated_df.count()}")`
      },
      {
        title: 'Step 4: Load — Write Partitioned Parquet with Mode Control',
        instruction: `Write the transformed DataFrame to Parquet, partitioned by transaction_date, so downstream queries can skip irrelevant partitions (partition pruning).

WHY: Writing partitioned Parquet is the standard for data lake storage. Parquet's columnar format enables fast predicate pushdown; partitioning by date means a query for a single day reads only that partition's files instead of the full dataset.

HOW: Use .write.mode("overwrite").partitionBy("transaction_date").parquet(path). Always verify the output with a read-back count.`,
        starterCode: `# PySpark ETL — Step 4: Load
output_path = "output/transactions_daily"

# TODO 1: Write aggregated_df as Parquet, partitioned by transaction_date
# Use overwrite mode so re-runs are idempotent
aggregated_df  # chain .write... here

# TODO 2: Read it back and verify row count matches
verify_df = spark.read.parquet(output_path)
print(f"Written rows: {verify_df.count()}")
print(f"Partitions found: {verify_df.select('transaction_date').distinct().count()}")

# TODO 3: Demonstrate partition pruning — read only Jan 2024
jan_df = spark.read.parquet(output_path).filter(
    col("transaction_date").startswith("2024-01")
)
jan_df.explain(mode="formatted")  # look for PartitionFilters in the plan
print(f"January rows: {jan_df.count()}")

spark.stop()`,
        hints: [
          'Write: aggregated_df.write.mode("overwrite").partitionBy("transaction_date").parquet(output_path)',
          'The filesystem creates one directory per partition: output/transactions_daily/transaction_date=2024-01-01/',
          'In explain() output, look for "PartitionFilters" to confirm Spark is skipping non-matching partitions'
        ],
        expectedOutput: `Written rows: 48320
Partitions found: 365
January rows: 4012

== Physical Plan ==
*(1) ColumnarToRow
+- AQEShuffleRead
   +- ...
      PartitionFilters: [isnotnull(transaction_date), StartsWith(transaction_date, 2024-01)]
      ...`,
        solution: `output_path = "output/transactions_daily"

aggregated_df.write.mode("overwrite").partitionBy("transaction_date").parquet(output_path)

verify_df = spark.read.parquet(output_path)
print(f"Written rows: {verify_df.count()}")
print(f"Partitions found: {verify_df.select('transaction_date').distinct().count()}")

jan_df = spark.read.parquet(output_path).filter(
    col("transaction_date").startswith("2024-01")
)
jan_df.explain(mode="formatted")
print(f"January rows: {jan_df.count()}")

spark.stop()`
      },
      {
        title: 'Step 5: Add Pipeline Observability with Metrics',
        instruction: `Wrap the pipeline in a metrics harness that tracks row counts, processing duration, and data quality KPIs — the minimum observability needed for production pipelines.

WHY: A pipeline that runs silently is invisible when something goes wrong. Tracking input vs output row counts, null rates, and timing at each stage makes anomalies detectable in your monitoring system (Prometheus, Datadog, CloudWatch).

HOW: Build a PipelineMetrics dataclass, capture counts before and after each stage, compute drop rates, and print a structured summary that could be emitted to a monitoring endpoint.`,
        starterCode: `# PySpark ETL — Step 5: Observability
import time
from dataclasses import dataclass, field

@dataclass
class PipelineMetrics:
    pipeline_name: str
    start_time: float = field(default_factory=time.time)
    stage_counts: dict = field(default_factory=dict)
    stage_durations: dict = field(default_factory=dict)

    def record_stage(self, stage_name: str, df, start: float):
        """Record row count and duration for a pipeline stage."""
        # TODO: Store df.count() in stage_counts[stage_name]
        # Store elapsed seconds in stage_durations[stage_name]
        pass

    def drop_rate(self, from_stage: str, to_stage: str) -> float:
        """Compute the fraction of rows dropped between two stages."""
        # TODO: Return (from_count - to_count) / from_count
        pass

    def report(self):
        """Print a structured metrics report."""
        # TODO: Print each stage's count, duration, and cumulative drop rate from 'extract'
        pass

# TODO: Re-run the pipeline with metrics instrumentation
metrics = PipelineMetrics("daily_transactions_etl")
# ... instrument each stage ...
metrics.report()`,
        hints: [
          'Record stage: self.stage_counts[stage_name] = df.count(); self.stage_durations[stage_name] = time.time() - start',
          'Drop rate: (self.stage_counts[from_stage] - self.stage_counts[to_stage]) / self.stage_counts[from_stage]',
          'Call df.cache() before df.count() to avoid recomputing the DataFrame — then record_stage() after the count'
        ],
        expectedOutput: `=== Pipeline Metrics: daily_transactions_etl ===
Stage             Rows     Duration   Drop Rate
extract           125000   2.1s       -
filter            123450   0.8s       1.24% dropped
enrich            123450   0.5s       0.00% dropped
aggregate          48320   1.2s       60.88% (expected — aggregation)
Total duration: 4.6s`,
        solution: `import time
from dataclasses import dataclass, field

@dataclass
class PipelineMetrics:
    pipeline_name: str
    start_time: float = field(default_factory=time.time)
    stage_counts: dict = field(default_factory=dict)
    stage_durations: dict = field(default_factory=dict)
    _stage_order: list = field(default_factory=list)

    def record_stage(self, stage_name: str, df, start: float):
        df.cache()
        self.stage_counts[stage_name] = df.count()
        self.stage_durations[stage_name] = time.time() - start
        self._stage_order.append(stage_name)

    def drop_rate(self, from_stage: str, to_stage: str) -> float:
        f = self.stage_counts.get(from_stage, 0)
        t = self.stage_counts.get(to_stage, 0)
        return (f - t) / f if f > 0 else 0.0

    def report(self):
        total = time.time() - self.start_time
        first = self._stage_order[0] if self._stage_order else None
        print(f"\\n=== Pipeline Metrics: {self.pipeline_name} ===")
        print(f"{'Stage':<18} {'Rows':<10} {'Duration':<12} {'Drop Rate'}")
        print("-" * 55)
        for stage in self._stage_order:
            rows = self.stage_counts[stage]
            dur = self.stage_durations[stage]
            dr = self.drop_rate(first, stage) if first and stage != first else 0.0
            label = f"{dr:.2%} dropped" if dr > 0 else "-"
            print(f"{stage:<18} {rows:<10} {dur:<12.1f}s {label}")
        print(f"Total duration: {total:.1f}s")

metrics = PipelineMetrics("daily_transactions_etl")

t0 = time.time()
raw_df = spark.read.option("header", True).option("inferSchema", True).csv("data/transactions.csv")
metrics.record_stage("extract", raw_df, t0)

t1 = time.time()
filtered_df = raw_df.filter((col("amount") > 0) & col("customer_id").isNotNull())
metrics.record_stage("filter", filtered_df, t1)

t2 = time.time()
enriched_df = (
    filtered_df
    .withColumn("transaction_date", date_format(col("timestamp"), "yyyy-MM-dd"))
    .withColumn("amount_tier", when(col("amount") < 100, "small").when(col("amount") < 1000, "medium").otherwise("large"))
)
metrics.record_stage("enrich", enriched_df, t2)

t3 = time.time()
aggregated_df = enriched_df.groupBy("customer_id", "transaction_date").agg(
    spark_sum("amount").alias("daily_total"),
    avg("amount").alias("daily_avg"),
    count("*").alias("transaction_count")
)
metrics.record_stage("aggregate", aggregated_df, t3)

metrics.report()`
      }
    ]
  },

  // ============================================================
  // de-lab-4: Apache Airflow DAG (from de-3)
  // ============================================================
  {
    id: 'de-lab-4',
    roleId: 'data-engineer',
    level: 'senior',
    title: 'Apache Airflow: Production DAG Design and Orchestration',
    description: 'Design and build a production-ready Airflow DAG with proper dependency chaining, retry strategies, SLA monitoring, sensor-based triggering, and alerting — covering the patterns that separate reliable pipelines from fragile ones.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Airflow requires Python and a running metadata database. Click "Go to Dev Setup" below for complete instructions. You will need: Python 3.12+, apache-airflow installed (pip install apache-airflow), a PostgreSQL database for the Airflow metadata store, airflow db init run to initialize the schema, and airflow webserver + airflow scheduler running. Verify by accessing the Airflow UI at http://localhost:8080.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Quick start: pip install "apache-airflow[postgres]" then airflow db init',
          'Check scheduler: airflow scheduler --daemon; check webserver: airflow webserver --port 8080 --daemon'
        ],
        expectedOutput: `Apache Airflow version: 2.x.x
Database: postgresql+psycopg2://airflow@localhost/airflow
Scheduler: running
Webserver: http://localhost:8080 (HTTP 200)`,
        solution: null
      },
      {
        title: 'Step 2: Define a DAG with Robust default_args',
        instruction: `Create the DAG skeleton with production-grade default_args — retry policy, SLA, email alerting, and a meaningful schedule.

WHY: The default_args dict is inherited by every task in the DAG. Setting retries, retry_delay, email_on_failure, and sla at the DAG level ensures consistent failure behavior without duplicating config on each operator.

HOW: Use a catchup=False DAG to prevent backfill on first deployment, set retries=2 with exponential-style delay, and attach an on_failure_callback for Slack/PagerDuty hooks.`,
        starterCode: `# Airflow DAG — Step 2: DAG Definition
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

# TODO: Define default_args with:
#   - owner: 'data-engineering-team'
#   - retries: 2, retry_delay: timedelta(minutes=5)
#   - email_on_failure: True, email: ['data-alerts@company.com']
#   - sla: timedelta(hours=2)  — alert if task runs > 2h
default_args = {
    # fill in
}

def on_failure_callback(context):
    """Called when any task fails — hook for Slack/PagerDuty."""
    dag_id = context['dag'].dag_id
    task_id = context['task_instance'].task_id
    execution_date = context['execution_date']
    print(f"ALERT: {dag_id}.{task_id} failed at {execution_date}")
    # In production: post to Slack or PagerDuty here

# TODO: Create the DAG
#   - dag_id: 'daily_etl_pipeline'
#   - schedule: '0 2 * * *' (2 AM UTC daily)
#   - start_date: datetime(2025, 1, 1)
#   - catchup: False
#   - on_failure_callback: on_failure_callback
with DAG(
    # fill in
) as dag:
    pass  # tasks added in next steps`,
        hints: [
          'default_args keys: owner, retries, retry_delay, email_on_failure, email, sla',
          'DAG args: dag_id, default_args, schedule_interval (or schedule in Airflow 2.4+), start_date, catchup=False, tags',
          'Use tags=[\'etl\', \'daily\'] to make the DAG discoverable in the Airflow UI'
        ],
        expectedOutput: `DAG 'daily_etl_pipeline' registered
  Schedule: 0 2 * * * (daily at 02:00 UTC)
  Start date: 2025-01-01
  Catchup: False
  Default retries: 2 with 5-min delay
  SLA: 2 hours`,
        solution: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-engineering-team',
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
    'email_on_failure': True,
    'email': ['data-alerts@company.com'],
    'sla': timedelta(hours=2),
}

def on_failure_callback(context):
    dag_id = context['dag'].dag_id
    task_id = context['task_instance'].task_id
    execution_date = context['execution_date']
    print(f"ALERT: {dag_id}.{task_id} failed at {execution_date}")

with DAG(
    dag_id='daily_etl_pipeline',
    default_args=default_args,
    schedule='0 2 * * *',
    start_date=datetime(2025, 1, 1),
    catchup=False,
    on_failure_callback=on_failure_callback,
    tags=['etl', 'daily'],
) as dag:
    pass`
      },
      {
        title: 'Step 3: Build Tasks with XCom for Data Passing',
        instruction: `Add three Python tasks (extract, transform, load) and use XCom to pass summary metadata between them.

WHY: XCom (cross-communication) lets Airflow tasks share small messages — like row counts, file paths, or status flags — without writing to an external store. Downstream tasks can branch or alert based on upstream XCom values.

HOW: Return a value from a PythonOperator callable (Airflow auto-pushes it as XCom). Pull it in the next task using ti.xcom_pull(task_ids='upstream_task_id').`,
        starterCode: `# Airflow DAG — Step 3: Tasks with XCom
# Add inside your 'with DAG(...) as dag:' block

def extract_data(**context):
    """Simulate extracting data and return metadata via XCom."""
    print("Extracting data from source database...")
    # Simulate work
    rows_extracted = 15000
    source_file = f"s3://data-lake/raw/orders/{context['ds']}/extract.parquet"
    print(f"Extracted {rows_extracted} rows → {source_file}")
    # TODO: Return a dict with rows_extracted and source_file
    # Airflow will auto-push this as XCom under key 'return_value'
    pass

def transform_data(**context):
    """Pull extract metadata from XCom, simulate transform."""
    ti = context['ti']
    # TODO: Pull extract result from XCom (task_ids='extract')
    extract_result = None  # replace with ti.xcom_pull(...)
    print(f"Transforming {extract_result['rows_extracted']} rows from {extract_result['source_file']}")
    rows_transformed = int(extract_result['rows_extracted'] * 0.98)  # 2% filtered
    return {'rows_transformed': rows_transformed}

def load_data(**context):
    """Pull transform metadata, simulate load, print summary."""
    ti = context['ti']
    # TODO: Pull from both 'extract' and 'transform' tasks
    extract_result = None
    transform_result = None
    print(f"Loading {transform_result['rows_transformed']} rows to warehouse")
    drop_rate = 1 - transform_result['rows_transformed'] / extract_result['rows_extracted']
    print(f"Pipeline complete. Drop rate: {drop_rate:.2%}")

# TODO: Create three PythonOperator tasks: extract, transform, load
# Set task_id, python_callable, and provide_context=True (Airflow < 2.0) or just use **context
# TODO: Chain them: extract >> transform >> load`,
        hints: [
          'Return dict from extract_data: return {"rows_extracted": rows_extracted, "source_file": source_file}',
          'Pull XCom: ti.xcom_pull(task_ids="extract") returns the dict returned by extract_data',
          'Operator: PythonOperator(task_id="extract", python_callable=extract_data) — **context is injected automatically in Airflow 2.x'
        ],
        expectedOutput: `Task 'extract' succeeded
  XCom pushed: {'rows_extracted': 15000, 'source_file': 's3://...'}
Task 'transform' succeeded
  XCom pulled from extract: 15000 rows
  XCom pushed: {'rows_transformed': 14700}
Task 'load' succeeded
  Loaded 14700 rows
  Drop rate: 2.00%`,
        solution: `def extract_data(**context):
    print("Extracting data from source database...")
    rows_extracted = 15000
    source_file = f"s3://data-lake/raw/orders/{context['ds']}/extract.parquet"
    print(f"Extracted {rows_extracted} rows → {source_file}")
    return {'rows_extracted': rows_extracted, 'source_file': source_file}

def transform_data(**context):
    ti = context['ti']
    extract_result = ti.xcom_pull(task_ids='extract')
    print(f"Transforming {extract_result['rows_extracted']} rows from {extract_result['source_file']}")
    rows_transformed = int(extract_result['rows_extracted'] * 0.98)
    return {'rows_transformed': rows_transformed}

def load_data(**context):
    ti = context['ti']
    extract_result = ti.xcom_pull(task_ids='extract')
    transform_result = ti.xcom_pull(task_ids='transform')
    print(f"Loading {transform_result['rows_transformed']} rows to warehouse")
    drop_rate = 1 - transform_result['rows_transformed'] / extract_result['rows_extracted']
    print(f"Pipeline complete. Drop rate: {drop_rate:.2%}")

with DAG(dag_id='daily_etl_pipeline', default_args=default_args,
         schedule='0 2 * * *', start_date=datetime(2025, 1, 1),
         catchup=False, tags=['etl', 'daily']) as dag:

    extract = PythonOperator(task_id='extract', python_callable=extract_data)
    transform = PythonOperator(task_id='transform', python_callable=transform_data)
    load = PythonOperator(task_id='load', python_callable=load_data)

    extract >> transform >> load`
      },
      {
        title: 'Step 4: Add a FileSensor and Branching Logic',
        instruction: `Add a FileSensor that waits for the source file to land before extracting, and a BranchPythonOperator that skips the load if the row count is too low.

WHY: Sensors decouple your pipeline from upstream timing — the DAG waits until data is ready rather than failing on a missing file. Branching prevents loading partial or empty datasets into the warehouse, protecting data consumers from incomplete data.

HOW: Use FileSensor with poke_interval and timeout, then BranchPythonOperator returning a task_id to execute or skip.`,
        starterCode: `# Airflow DAG — Step 4: Sensor + Branching
from airflow.sensors.filesystem import FileSensor
from airflow.operators.python import BranchPythonOperator
from airflow.operators.empty import EmptyOperator

def check_row_count(**context):
    """Branch: load if rows > threshold, else skip to notify."""
    ti = context['ti']
    transform_result = ti.xcom_pull(task_ids='transform')
    rows = transform_result.get('rows_transformed', 0)
    MIN_ROWS = 1000
    if rows >= MIN_ROWS:
        print(f"Row count {rows} >= {MIN_ROWS} — proceeding to load")
        return 'load'  # task_id of the load task
    else:
        print(f"Row count {rows} < {MIN_ROWS} — skipping load, alerting")
        return 'notify_low_count'

with DAG(dag_id='daily_etl_pipeline', default_args=default_args,
         schedule='0 2 * * *', start_date=datetime(2025, 1, 1),
         catchup=False, tags=['etl', 'daily']) as dag:

    # TODO: Add a FileSensor that waits for today's source file
    # poke_interval=60 (check every 60s), timeout=3600 (fail after 1h)
    wait_for_file = None  # replace with FileSensor(...)

    extract = PythonOperator(task_id='extract', python_callable=extract_data)
    transform = PythonOperator(task_id='transform', python_callable=transform_data)

    # TODO: Add BranchPythonOperator that calls check_row_count
    branch = None  # replace

    load = PythonOperator(task_id='load', python_callable=load_data)
    notify_low_count = EmptyOperator(task_id='notify_low_count')  # placeholder for Slack alert

    # TODO: Chain: wait_for_file >> extract >> transform >> branch >> [load, notify_low_count]`,
        hints: [
          'FileSensor: FileSensor(task_id="wait_for_file", filepath="/data/source/{{ ds }}/extract.parquet", poke_interval=60, timeout=3600)',
          'BranchPythonOperator: BranchPythonOperator(task_id="check_row_count", python_callable=check_row_count)',
          'Fan-out syntax: branch >> [load, notify_low_count] — Airflow handles the branching automatically'
        ],
        expectedOutput: `DAG 'daily_etl_pipeline' task graph:
wait_for_file → extract → transform → check_row_count
                                              ├─ load          (if rows >= 1000)
                                              └─ notify_low_count (if rows < 1000)

Run log:
[wait_for_file] Poking: /data/source/2025-01-15/extract.parquet ... found after 60s
[extract] Extracted 15000 rows
[transform] Transformed 14700 rows
[check_row_count] Row count 14700 >= 1000 — proceeding to load
[load] Loaded 14700 rows. Drop rate: 2.00%`,
        solution: `from airflow.sensors.filesystem import FileSensor
from airflow.operators.python import BranchPythonOperator
from airflow.operators.empty import EmptyOperator

def check_row_count(**context):
    ti = context['ti']
    transform_result = ti.xcom_pull(task_ids='transform')
    rows = transform_result.get('rows_transformed', 0)
    MIN_ROWS = 1000
    if rows >= MIN_ROWS:
        return 'load'
    return 'notify_low_count'

with DAG(dag_id='daily_etl_pipeline', default_args=default_args,
         schedule='0 2 * * *', start_date=datetime(2025, 1, 1),
         catchup=False, on_failure_callback=on_failure_callback,
         tags=['etl', 'daily']) as dag:

    wait_for_file = FileSensor(
        task_id='wait_for_file',
        filepath='/data/source/{{ ds }}/extract.parquet',
        poke_interval=60,
        timeout=3600,
    )

    extract = PythonOperator(task_id='extract', python_callable=extract_data)
    transform = PythonOperator(task_id='transform', python_callable=transform_data)

    branch = BranchPythonOperator(
        task_id='check_row_count',
        python_callable=check_row_count,
    )

    load = PythonOperator(task_id='load', python_callable=load_data)
    notify_low_count = EmptyOperator(task_id='notify_low_count')

    wait_for_file >> extract >> transform >> branch >> [load, notify_low_count]`
      }
    ]
  },

  // ============================================================
  // de-lab-5: Data Quality Checks (from de-4)
  // ============================================================
  {
    id: 'de-lab-5',
    roleId: 'data-engineer',
    level: 'mid',
    title: 'Data Quality Framework: Validation, Profiling, and Alerting',
    description: 'Build a production data quality framework in Python that runs null checks, uniqueness checks, range validation, schema drift detection, and freshness checks — with a structured report that can be integrated into any pipeline.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'This lab uses pandas and Python dataclasses. Click "Go to Dev Setup" below for complete instructions. You will need: Python 3.12+, pandas and numpy installed (pip install pandas numpy), and a virtual environment activated. No database connection is required for this lab — all checks run in-memory.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Install: pip install pandas numpy',
          'Verify: python -c "import pandas; print(pandas.__version__)"'
        ],
        expectedOutput: `Python 3.12.x verified
pandas 2.x.x
numpy 1.x.x
Data tools ready`,
        solution: null
      },
      {
        title: 'Step 2: Build the Core Quality Checker',
        instruction: `Implement a DataQualityChecker class with null, uniqueness, value range, and schema checks.

WHY: Data quality issues — nulls in required fields, duplicate primary keys, out-of-range values, unexpected columns — are the most common cause of broken downstream models and dashboards. Catching them at ingestion prevents cascading failures.

HOW: Each check method appends a QualityResult to a results list. The report() method prints a structured summary table and returns a boolean (all passed or not) that can be used as a pipeline gate.`,
        starterCode: `# Data Quality — Step 2: Core Checker
import pandas as pd
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class QualityResult:
    check_name: str
    passed: bool
    details: str

class DataQualityChecker:
    """Run a suite of quality checks against a pandas DataFrame."""

    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.results: list[QualityResult] = []

    def check_nulls(self, columns: list[str], max_null_pct: float = 0.0):
        """Ensure null percentage stays below threshold for each column."""
        # TODO: For each col in columns:
        #   - If col not in df, add a FAIL result with 'Column missing'
        #   - Compute null_pct = df[col].isnull().mean()
        #   - passed = null_pct <= max_null_pct
        #   - Append QualityResult with name f"null_check:{col}"
        pass

    def check_unique(self, columns: list[str]):
        """Ensure no duplicate rows on the given key columns."""
        # TODO: Count duplicates with df.duplicated(subset=columns, keep=False).sum()
        # passed = dup_count == 0
        # Append one QualityResult with name f"unique_check:{','.join(columns)}"
        pass

    def check_value_range(self, column: str, min_val=None, max_val=None):
        """Ensure values fall within expected range."""
        # TODO: Count rows outside [min_val, max_val]
        # Append QualityResult with name f"range_check:{column}"
        pass

    def check_schema(self, expected_columns: list[str]):
        """Verify the DataFrame has exactly the expected columns."""
        # TODO: Compare set(df.columns) with set(expected_columns)
        # Report missing and extra columns in details
        pass

    def report(self) -> bool:
        """Print a formatted report. Returns True if all checks passed."""
        # TODO: Print a table with CHECK, STATUS, DETAILS columns
        # Return True if zero failures, False otherwise
        pass

# Test it
import io
csv_data = """order_id,customer_id,amount,order_date
1,C001,250.00,2024-01-15
2,C002,0.00,2024-01-16
2,C003,150.00,2024-01-17
4,,99.00,2024-01-18
5,C005,999999.00,2024-01-19"""

df = pd.read_csv(io.StringIO(csv_data))
checker = DataQualityChecker(df)
checker.check_schema(["order_id", "customer_id", "amount", "order_date"])
checker.check_nulls(["order_id", "customer_id", "amount"], max_null_pct=0.0)
checker.check_unique(["order_id"])
checker.check_value_range("amount", min_val=0.01, max_val=100000)
all_passed = checker.report()
print(f"\\nAll checks passed: {all_passed}")`,
        hints: [
          'Null pct: self.df[col].isnull().mean() — returns a float 0.0–1.0',
          'Duplicates: self.df.duplicated(subset=columns, keep=False).sum()',
          'Range violations: count rows where (df[col] < min_val) or (df[col] > max_val) — use .sum() on boolean Series'
        ],
        expectedOutput: `CHECK                               STATUS   DETAILS
--------------------------------------------------------------------------------
schema_check                        PASS     Missing: none, Extra: none
null_check:order_id                 PASS     Null%=0.00% (max=0.00%)
null_check:customer_id              FAIL     Null%=20.00% (max=0.00%)
null_check:amount                   PASS     Null%=0.00% (max=0.00%)
unique_check:order_id               FAIL     Duplicate rows: 2
range_check:amount                  FAIL     Out-of-range rows: 2

Total: 6 checks, 3 failed
All checks passed: False`,
        solution: `import pandas as pd
from dataclasses import dataclass, field
import io

@dataclass
class QualityResult:
    check_name: str
    passed: bool
    details: str

class DataQualityChecker:
    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.results: list[QualityResult] = []

    def check_nulls(self, columns: list[str], max_null_pct: float = 0.0):
        for col in columns:
            if col not in self.df.columns:
                self.results.append(QualityResult(f"null_check:{col}", False, f"Column '{col}' missing"))
                continue
            null_pct = self.df[col].isnull().mean()
            passed = null_pct <= max_null_pct
            self.results.append(QualityResult(
                f"null_check:{col}", passed,
                f"Null%={null_pct:.2%} (max={max_null_pct:.2%})"
            ))

    def check_unique(self, columns: list[str]):
        dup_count = self.df.duplicated(subset=columns, keep=False).sum()
        passed = dup_count == 0
        self.results.append(QualityResult(
            f"unique_check:{','.join(columns)}", passed,
            f"Duplicate rows: {dup_count}"
        ))

    def check_value_range(self, column: str, min_val=None, max_val=None):
        violations = 0
        if min_val is not None:
            violations += (self.df[column] < min_val).sum()
        if max_val is not None:
            violations += (self.df[column] > max_val).sum()
        passed = violations == 0
        self.results.append(QualityResult(
            f"range_check:{column}", passed,
            f"Out-of-range rows: {violations}"
        ))

    def check_schema(self, expected_columns: list[str]):
        actual = set(self.df.columns)
        expected = set(expected_columns)
        missing = expected - actual
        extra = actual - expected
        passed = not missing and not extra
        self.results.append(QualityResult(
            "schema_check", passed,
            f"Missing: {missing or 'none'}, Extra: {extra or 'none'}"
        ))

    def report(self) -> bool:
        print(f"{'CHECK':<35} {'STATUS':<8} DETAILS")
        print("-" * 80)
        for r in self.results:
            status = "PASS" if r.passed else "FAIL"
            print(f"{r.check_name:<35} {status:<8} {r.details}")
        failed = sum(1 for r in self.results if not r.passed)
        print(f"\\nTotal: {len(self.results)} checks, {failed} failed")
        return failed == 0`
      },
      {
        title: 'Step 3: Add Freshness and Statistical Checks',
        instruction: `Extend the checker with two advanced checks: freshness (is the data recent enough?) and statistical distribution (are column statistics within expected bounds?).

WHY: Freshness checks catch silent pipeline failures where data stops updating but no error is raised. Statistical checks detect data drift — subtle shifts in value distributions that indicate upstream schema or business logic changes before they break downstream models.

HOW: Freshness: parse the date column and check max date against today. Stats: compute mean and stddev, compare against expected bounds. Both produce QualityResult entries like the simpler checks.`,
        starterCode: `# Data Quality — Step 3: Freshness and Statistical Checks
from datetime import datetime, date, timedelta
import numpy as np

# Add these methods to DataQualityChecker:

def check_freshness(self, date_column: str, max_age_days: int = 1):
    """Verify the most recent date in date_column is within max_age_days of today."""
    # TODO:
    # 1. Parse df[date_column] to datetime
    # 2. Find the max date
    # 3. Compute age_days = (today - max_date.date()).days
    # 4. passed = age_days <= max_age_days
    # 5. Append QualityResult(f"freshness_check:{date_column}", ...)
    pass

def check_statistics(self, column: str, expected_mean: float, expected_stddev: float,
                     tolerance: float = 0.2):
    """Check that column mean and stddev are within tolerance of expected values."""
    # TODO:
    # 1. Compute actual mean and stddev
    # 2. mean_ok = abs(actual_mean - expected_mean) / expected_mean <= tolerance
    # 3. std_ok = abs(actual_stddev - expected_stddev) / expected_stddev <= tolerance
    # 4. passed = mean_ok and std_ok
    # 5. Append QualityResult(f"stats_check:{column}", ...)
    pass

# Monkey-patch onto the class (or redefine class — your choice)
DataQualityChecker.check_freshness = check_freshness
DataQualityChecker.check_statistics = check_statistics

# Test
checker2 = DataQualityChecker(df)
checker2.check_freshness("order_date", max_age_days=730)   # 2 years — should pass on test data
checker2.check_statistics("amount", expected_mean=300.0, expected_stddev=400.0, tolerance=0.5)
checker2.report()`,
        hints: [
          'Parse dates: pd.to_datetime(self.df[date_column], errors="coerce").max()',
          'Age: (date.today() - max_date.date()).days — compare with max_age_days',
          'Stddev: self.df[column].std() — pandas uses ddof=1 by default (sample stddev)'
        ],
        expectedOutput: `CHECK                               STATUS   DETAILS
--------------------------------------------------------------------------------
freshness_check:order_date          PASS     Max date: 2024-01-19, Age: 435 days (max=730)
stats_check:amount                  PASS     Mean=299.8 (exp=300.0±50%), Std=391.2 (exp=400.0±50%)

Total: 2 checks, 0 failed`,
        solution: `from datetime import datetime, date, timedelta
import numpy as np

def check_freshness(self, date_column: str, max_age_days: int = 1):
    try:
        max_date = pd.to_datetime(self.df[date_column], errors='coerce').max()
        if pd.isna(max_date):
            self.results.append(QualityResult(f"freshness_check:{date_column}", False, "No valid dates found"))
            return
        age_days = (date.today() - max_date.date()).days
        passed = age_days <= max_age_days
        self.results.append(QualityResult(
            f"freshness_check:{date_column}", passed,
            f"Max date: {max_date.date()}, Age: {age_days} days (max={max_age_days})"
        ))
    except Exception as e:
        self.results.append(QualityResult(f"freshness_check:{date_column}", False, str(e)))

def check_statistics(self, column: str, expected_mean: float, expected_stddev: float,
                     tolerance: float = 0.2):
    actual_mean = self.df[column].mean()
    actual_std = self.df[column].std()
    mean_ok = abs(actual_mean - expected_mean) / expected_mean <= tolerance if expected_mean != 0 else True
    std_ok = abs(actual_std - expected_stddev) / expected_stddev <= tolerance if expected_stddev != 0 else True
    passed = mean_ok and std_ok
    self.results.append(QualityResult(
        f"stats_check:{column}", passed,
        f"Mean={actual_mean:.1f} (exp={expected_mean}±{tolerance:.0%}), Std={actual_std:.1f} (exp={expected_stddev}±{tolerance:.0%})"
    ))

DataQualityChecker.check_freshness = check_freshness
DataQualityChecker.check_statistics = check_statistics`
      },
      {
        title: 'Step 4: Integrate Quality Checks as a Pipeline Gate',
        instruction: `Wrap the full checker into a run_quality_gate() function that raises an exception if critical checks fail — making it a hard stop in any pipeline.

WHY: A quality report that only prints is useless in automation. A pipeline gate that raises an exception when critical checks fail will stop the load step from writing bad data to the warehouse, protecting data consumers.

HOW: Separate checks into "critical" (must pass) and "advisory" (log warnings). If any critical check fails, raise a DataQualityError with a summary of failures. Catch and handle gracefully in the caller.`,
        starterCode: `# Data Quality — Step 4: Pipeline Gate
class DataQualityError(Exception):
    """Raised when one or more critical data quality checks fail."""
    pass

def run_quality_gate(df: pd.DataFrame, config: dict) -> dict:
    """
    Run quality checks defined in config and raise DataQualityError if critical checks fail.

    Config format:
    {
        'schema': {'expected_columns': [...]},
        'nulls': {'columns': [...], 'max_null_pct': 0.01},
        'unique': {'columns': [...]},
        'ranges': [{'column': '...', 'min_val': ..., 'max_val': ...}],
        'freshness': {'date_column': '...', 'max_age_days': 1},
        'critical_checks': ['schema_check', 'unique_check:order_id']  # names that must pass
    }

    Returns:
        dict with 'passed', 'failed', 'warnings', 'all_passed'
    """
    checker = DataQualityChecker(df)

    # TODO: Run each check from config
    # TODO: Separate results into critical failures vs warnings
    # TODO: If any critical check failed, raise DataQualityError
    # TODO: Return summary dict

    pass

# Test the gate
config = {
    'schema': {'expected_columns': ['order_id', 'customer_id', 'amount', 'order_date']},
    'nulls': {'columns': ['order_id', 'amount'], 'max_null_pct': 0.0},
    'unique': {'columns': ['order_id']},
    'ranges': [{'column': 'amount', 'min_val': 0.01, 'max_val': 100000}],
    'freshness': {'date_column': 'order_date', 'max_age_days': 730},
    'critical_checks': ['schema_check', 'unique_check:order_id']
}

try:
    summary = run_quality_gate(df, config)
    print(f"Gate passed. Summary: {summary}")
except DataQualityError as e:
    print(f"PIPELINE BLOCKED: {e}")`,
        hints: [
          'Run checks in order: schema → nulls → unique → ranges → freshness',
          'Critical check names come from config["critical_checks"] — match against result.check_name',
          'Raise: raise DataQualityError(f"Critical checks failed: {[r.check_name for r in critical_failures]}")'
        ],
        expectedOutput: `CHECK                               STATUS   DETAILS
--------------------------------------------------------------------------------
schema_check                        PASS     Missing: none, Extra: none
null_check:order_id                 PASS     Null%=0.00% (max=0.00%)
null_check:amount                   PASS     Null%=0.00% (max=0.00%)
unique_check:order_id               FAIL     Duplicate rows: 2
range_check:amount                  FAIL     Out-of-range rows: 2
freshness_check:order_date          PASS     Max date: 2024-01-19, Age: 435 days (max=730)

Total: 6 checks, 2 failed
PIPELINE BLOCKED: Critical checks failed: ['unique_check:order_id']`,
        solution: `class DataQualityError(Exception):
    pass

def run_quality_gate(df: pd.DataFrame, config: dict) -> dict:
    checker = DataQualityChecker(df)

    if 'schema' in config:
        checker.check_schema(config['schema']['expected_columns'])
    if 'nulls' in config:
        checker.check_nulls(config['nulls']['columns'], config['nulls'].get('max_null_pct', 0.0))
    if 'unique' in config:
        checker.check_unique(config['unique']['columns'])
    for range_cfg in config.get('ranges', []):
        checker.check_value_range(range_cfg['column'], range_cfg.get('min_val'), range_cfg.get('max_val'))
    if 'freshness' in config:
        checker.check_freshness(config['freshness']['date_column'], config['freshness'].get('max_age_days', 1))

    checker.report()

    critical_check_names = set(config.get('critical_checks', []))
    critical_failures = [r for r in checker.results if not r.passed and r.check_name in critical_check_names]
    warnings = [r for r in checker.results if not r.passed and r.check_name not in critical_check_names]

    if critical_failures:
        raise DataQualityError(f"Critical checks failed: {[r.check_name for r in critical_failures]}")

    return {
        'passed': sum(1 for r in checker.results if r.passed),
        'failed': len([r for r in checker.results if not r.passed]),
        'warnings': [r.check_name for r in warnings],
        'all_passed': all(r.passed for r in checker.results)
    }`
      }
    ]
  },

  // ============================================================
  // de-lab-6: Incremental Load Pattern (from de-5)
  // ============================================================
  {
    id: 'de-lab-6',
    roleId: 'data-engineer',
    level: 'senior',
    title: 'Incremental Load Pattern: Watermarks, Upserts, and Idempotency',
    description: 'Implement a production-grade incremental data loader using watermark-based change detection, safe upserts, and idempotent run semantics — the pattern behind efficient data lake and warehouse synchronization.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'This lab uses SQLite (built into Python) and requires no external database. Click "Go to Dev Setup" below to confirm your Python environment. You will need: Python 3.12+ with the standard library (sqlite3 is included). No additional packages are required for the core lab. Optional: pip install pandas for the validation step.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Verify Python: python --version (must be 3.9+)',
          'Verify sqlite3: python -c "import sqlite3; print(sqlite3.sqlite_version)"'
        ],
        expectedOutput: `Python 3.12.x verified
SQLite version: 3.x.x
No additional packages required`,
        solution: null
      },
      {
        title: 'Step 2: Build the IncrementalLoader Foundation',
        instruction: `Implement the IncrementalLoader class with watermark tracking and delta extraction.

WHY: Full table refreshes are simple but do not scale — loading 1 billion rows nightly to update 10,000 changed rows is wasteful. Watermark-based incremental loads read only rows created or updated since the last successful run, reducing load by 99%+ on stable tables.

HOW: Store the last-seen watermark value (usually an updated_at timestamp or auto-increment ID) in a metadata table. On each run, extract only rows where the watermark column exceeds the stored value, ordered ascending so the new watermark is always the last row's value.`,
        starterCode: `# Incremental Load — Step 2: Foundation
import sqlite3
from datetime import datetime, timezone

class IncrementalLoader:
    """Load only new or updated rows from source to target using a watermark."""

    def __init__(self, source_db: str, target_db: str):
        self.source = sqlite3.connect(source_db)
        self.target = sqlite3.connect(target_db)
        self._ensure_watermark_table()

    def _ensure_watermark_table(self):
        """Create the watermark tracking table if it doesn't exist."""
        # TODO: CREATE TABLE IF NOT EXISTS _watermarks
        # Columns: table_name TEXT PRIMARY KEY, last_value TEXT NOT NULL, updated_at TEXT NOT NULL
        pass

    def get_watermark(self, table_name: str) -> str:
        """Retrieve the last watermark value. Default to epoch if not set."""
        # TODO: SELECT last_value FROM _watermarks WHERE table_name = ?
        # Return '1970-01-01T00:00:00' if no row found
        pass

    def set_watermark(self, table_name: str, value: str):
        """Update the watermark after a successful load."""
        # TODO: INSERT OR REPLACE (upsert) into _watermarks
        # Set updated_at to datetime.now(timezone.utc).isoformat()
        pass

    def extract_delta(self, table_name: str, watermark_col: str):
        """Pull rows from source where watermark_col > last watermark, ordered ascending."""
        # TODO:
        # 1. Get current watermark via get_watermark()
        # 2. Query: SELECT * FROM {table_name} WHERE {watermark_col} > ? ORDER BY {watermark_col}
        # 3. Get column names from cursor.description
        # 4. Print how many rows extracted and current watermark
        # 5. Return (columns, rows)
        pass

# Test foundation
import os
for db in ['test_source.db', 'test_target.db']:
    if os.path.exists(db): os.remove(db)

loader = IncrementalLoader('test_source.db', 'test_target.db')
print("Watermark table created")
print(f"Default watermark: {loader.get_watermark('orders')}")
loader.set_watermark('orders', '2024-06-01T00:00:00')
print(f"After set: {loader.get_watermark('orders')}")`,
        hints: [
          'CREATE TABLE: self.target.execute("CREATE TABLE IF NOT EXISTS _watermarks (table_name TEXT PRIMARY KEY, last_value TEXT NOT NULL, updated_at TEXT NOT NULL)")',
          'Upsert: INSERT INTO _watermarks ... ON CONFLICT(table_name) DO UPDATE SET last_value=excluded.last_value, updated_at=excluded.updated_at',
          'Column names from cursor: cursor.description returns list of (name, ...) tuples — use [d[0] for d in cursor.description]'
        ],
        expectedOutput: `Watermark table created
Default watermark: 1970-01-01T00:00:00
After set: 2024-06-01T00:00:00`,
        solution: `import sqlite3
from datetime import datetime, timezone

class IncrementalLoader:
    def __init__(self, source_db: str, target_db: str):
        self.source = sqlite3.connect(source_db)
        self.target = sqlite3.connect(target_db)
        self._ensure_watermark_table()

    def _ensure_watermark_table(self):
        self.target.execute("""
            CREATE TABLE IF NOT EXISTS _watermarks (
                table_name TEXT PRIMARY KEY,
                last_value TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        self.target.commit()

    def get_watermark(self, table_name: str) -> str:
        row = self.target.execute(
            "SELECT last_value FROM _watermarks WHERE table_name = ?",
            (table_name,)
        ).fetchone()
        return row[0] if row else "1970-01-01T00:00:00"

    def set_watermark(self, table_name: str, value: str):
        self.target.execute("""
            INSERT INTO _watermarks (table_name, last_value, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(table_name) DO UPDATE SET
                last_value = excluded.last_value,
                updated_at = excluded.updated_at
        """, (table_name, value, datetime.now(timezone.utc).isoformat()))
        self.target.commit()

    def extract_delta(self, table_name: str, watermark_col: str):
        wm = self.get_watermark(table_name)
        cursor = self.source.execute(
            f"SELECT * FROM {table_name} WHERE {watermark_col} > ? ORDER BY {watermark_col}",
            (wm,)
        )
        columns = [d[0] for d in cursor.description]
        rows = cursor.fetchall()
        print(f"  Extracted {len(rows)} new rows from {table_name} (watermark > {wm})")
        return columns, rows`
      },
      {
        title: 'Step 3: Implement Upsert and the Full Run Cycle',
        instruction: `Complete the IncrementalLoader with upsert logic and a run() method that ties extraction, upsert, and watermark update into an atomic cycle.

WHY: Upsert (INSERT OR REPLACE in SQLite, MERGE in standard SQL) handles both new rows and updates to existing rows in a single operation. This is critical for correctness: if the pipeline reruns due to a failure, it should produce the same result (idempotency) rather than creating duplicates.

HOW: Use INSERT OR REPLACE which works on the primary key. After a successful upsert, advance the watermark to the highest value from the extracted rows — so the next run starts exactly where this one left off.`,
        starterCode: `# Incremental Load — Step 3: Upsert and Run
# Add these methods to IncrementalLoader:

def upsert(self, table_name: str, columns: list, rows: list):
    """Insert or replace rows into the target table."""
    # TODO:
    # 1. If no rows, print 'No new data' and return
    # 2. Build: INSERT OR REPLACE INTO {table_name} ({col_list}) VALUES ({placeholders})
    # 3. Use executemany for batch insert
    # 4. Commit and print rows upserted
    pass

def run(self, table_name: str, watermark_col: str, key_col: str):
    """Execute a full incremental load cycle for one table."""
    # TODO:
    # 1. Print "Loading {table_name}..."
    # 2. Call extract_delta()
    # 3. Call upsert()
    # 4. If rows exist, advance watermark to rows[-1][wm_col_index]
    # 5. Print new watermark
    pass

def close(self):
    self.source.close()
    self.target.close()

# Set up test data
def seed_source(db_path: str):
    """Create source tables with sample data."""
    conn = sqlite3.connect(db_path)
    conn.execute("""CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY,
        customer_id TEXT,
        amount REAL,
        updated_at TEXT
    )""")
    conn.executemany("INSERT OR REPLACE INTO orders VALUES (?,?,?,?)", [
        (1, 'C001', 150.00, '2024-01-10T10:00:00'),
        (2, 'C002', 220.00, '2024-01-11T12:00:00'),
        (3, 'C003', 80.00,  '2024-01-12T09:00:00'),
    ])
    conn.execute("""CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY,
        customer_id TEXT, amount REAL, updated_at TEXT
    )""" if False else "SELECT 1")  # already created
    conn.commit()
    conn.close()

seed_source('test_source.db')

# Also create target orders table
loader.target.execute("""CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY, customer_id TEXT, amount REAL, updated_at TEXT
)""")
loader.target.commit()

# Run once — should load all 3 rows
loader.run('orders', watermark_col='updated_at', key_col='order_id')

# Run again — should load 0 rows (idempotency check)
loader.run('orders', watermark_col='updated_at', key_col='order_id')
loader.close()`,
        hints: [
          'Placeholders: ", ".join(["?"] * len(columns)) — SQLite uses ? for parameters',
          'Batch insert: self.target.executemany(f"INSERT OR REPLACE INTO {table_name} ({col_list}) VALUES ({placeholders})", rows)',
          'New watermark: wm_idx = columns.index(watermark_col); new_wm = rows[-1][wm_idx]'
        ],
        expectedOutput: `Loading orders...
  Extracted 3 new rows from orders (watermark > 1970-01-01T00:00:00)
  Upserted 3 rows into target.orders
  New watermark: 2024-01-12T09:00:00

Loading orders...
  Extracted 0 new rows from orders (watermark > 2024-01-12T09:00:00)
  No new data for orders`,
        solution: `def upsert(self, table_name: str, columns: list, rows: list):
    if not rows:
        print(f"  No new data for {table_name}")
        return
    placeholders = ", ".join(["?"] * len(columns))
    col_list = ", ".join(columns)
    self.target.executemany(
        f"INSERT OR REPLACE INTO {table_name} ({col_list}) VALUES ({placeholders})",
        rows
    )
    self.target.commit()
    print(f"  Upserted {len(rows)} rows into target.{table_name}")

def run(self, table_name: str, watermark_col: str, key_col: str):
    print(f"Loading {table_name}...")
    columns, rows = self.extract_delta(table_name, watermark_col)
    self.upsert(table_name, columns, rows)
    if rows:
        wm_idx = columns.index(watermark_col)
        new_wm = rows[-1][wm_idx]
        self.set_watermark(table_name, str(new_wm))
        print(f"  New watermark: {new_wm}")

def close(self):
    self.source.close()
    self.target.close()

IncrementalLoader.upsert = upsert
IncrementalLoader.run = run
IncrementalLoader.close = close`
      },
      {
        title: 'Step 4: Handle Late-Arriving Data and Dry-Run Mode',
        instruction: `Add two production features: a dry-run mode for safe testing, and a late-arriving data window that re-scans a configurable lookback period to catch records with delayed updated_at timestamps.

WHY: Late-arriving data is a common issue — records can arrive hours or days after the event they describe due to upstream delays. A fixed watermark misses these records. Adding a lookback window (e.g. re-scan the last 24 hours) catches them at the cost of a slightly larger extract, while still being far cheaper than a full refresh.

HOW: Subtract the lookback_hours from the stored watermark before querying. In dry-run mode, extract and log the delta but skip upsert and watermark update.`,
        starterCode: `# Incremental Load — Step 4: Late Data and Dry Run
from datetime import datetime, timedelta, timezone

def extract_delta_with_lookback(self, table_name: str, watermark_col: str,
                                 lookback_hours: int = 0):
    """Extract delta, optionally extending lookback for late-arriving data."""
    raw_wm = self.get_watermark(table_name)
    if lookback_hours > 0:
        # TODO: Parse raw_wm as datetime, subtract lookback_hours, convert back to ISO string
        effective_wm = raw_wm  # replace with adjusted watermark
    else:
        effective_wm = raw_wm

    cursor = self.source.execute(
        f"SELECT * FROM {table_name} WHERE {watermark_col} > ? ORDER BY {watermark_col}",
        (effective_wm,)
    )
    columns = [d[0] for d in cursor.description]
    rows = cursor.fetchall()
    if lookback_hours > 0:
        print(f"  Extracted {len(rows)} rows (lookback={lookback_hours}h, effective_wm={effective_wm})")
    else:
        print(f"  Extracted {len(rows)} new rows from {table_name} (watermark > {raw_wm})")
    return columns, rows

def run_with_options(self, table_name: str, watermark_col: str, key_col: str,
                     dry_run: bool = False, lookback_hours: int = 0):
    """Run with optional dry-run and late-data lookback."""
    mode = "[DRY RUN] " if dry_run else ""
    print(f"{mode}Loading {table_name}...")
    columns, rows = self.extract_delta_with_lookback(table_name, watermark_col, lookback_hours)

    if dry_run:
        # TODO: Log what would be upserted, but skip upsert and watermark update
        print(f"  [DRY RUN] Would upsert {len(rows)} rows — no changes made")
        return

    self.upsert(table_name, columns, rows)
    if rows:
        wm_idx = columns.index(watermark_col)
        new_wm = rows[-1][wm_idx]
        self.set_watermark(table_name, str(new_wm))
        print(f"  New watermark: {new_wm}")

IncrementalLoader.extract_delta_with_lookback = extract_delta_with_lookback
IncrementalLoader.run_with_options = run_with_options

# Test dry run — should not change state
import os
for db in ['test_source2.db', 'test_target2.db']:
    if os.path.exists(db): os.remove(db)

loader2 = IncrementalLoader('test_source2.db', 'test_target2.db')
# seed_source creates the same test data
seed_source('test_source2.db')
loader2.target.execute("CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY, customer_id TEXT, amount REAL, updated_at TEXT)")
loader2.target.commit()

print("=== Dry run ===")
loader2.run_with_options('orders', 'updated_at', 'order_id', dry_run=True)
print(f"Watermark after dry run: {loader2.get_watermark('orders')}")  # should be epoch

print("\\n=== Real run with lookback ===")
loader2.run_with_options('orders', 'updated_at', 'order_id', lookback_hours=24)
loader2.close()`,
        hints: [
          'Parse watermark: datetime.fromisoformat(raw_wm) — then subtract timedelta(hours=lookback_hours)',
          'Adjusted watermark ISO: (parsed_wm - timedelta(hours=lookback_hours)).isoformat()',
          'Dry run: just return after logging — do not call self.upsert() or self.set_watermark()'
        ],
        expectedOutput: `=== Dry run ===
[DRY RUN] Loading orders...
  Extracted 3 new rows from orders (watermark > 1970-01-01T00:00:00)
  [DRY RUN] Would upsert 3 rows — no changes made
Watermark after dry run: 1970-01-01T00:00:00

=== Real run with lookback ===
Loading orders...
  Extracted 3 rows (lookback=24h, effective_wm=1970-01-01T00:00:00)
  Upserted 3 rows into target.orders
  New watermark: 2024-01-12T09:00:00`,
        solution: `from datetime import datetime, timedelta, timezone

def extract_delta_with_lookback(self, table_name: str, watermark_col: str,
                                 lookback_hours: int = 0):
    raw_wm = self.get_watermark(table_name)
    if lookback_hours > 0:
        parsed = datetime.fromisoformat(raw_wm)
        effective_wm = (parsed - timedelta(hours=lookback_hours)).isoformat()
    else:
        effective_wm = raw_wm

    cursor = self.source.execute(
        f"SELECT * FROM {table_name} WHERE {watermark_col} > ? ORDER BY {watermark_col}",
        (effective_wm,)
    )
    columns = [d[0] for d in cursor.description]
    rows = cursor.fetchall()
    if lookback_hours > 0:
        print(f"  Extracted {len(rows)} rows (lookback={lookback_hours}h, effective_wm={effective_wm})")
    else:
        print(f"  Extracted {len(rows)} new rows from {table_name} (watermark > {raw_wm})")
    return columns, rows

def run_with_options(self, table_name: str, watermark_col: str, key_col: str,
                     dry_run: bool = False, lookback_hours: int = 0):
    mode = "[DRY RUN] " if dry_run else ""
    print(f"{mode}Loading {table_name}...")
    columns, rows = self.extract_delta_with_lookback(table_name, watermark_col, lookback_hours)

    if dry_run:
        print(f"  [DRY RUN] Would upsert {len(rows)} rows — no changes made")
        return

    self.upsert(table_name, columns, rows)
    if rows:
        wm_idx = columns.index(watermark_col)
        new_wm = rows[-1][wm_idx]
        self.set_watermark(table_name, str(new_wm))
        print(f"  New watermark: {new_wm}")

IncrementalLoader.extract_delta_with_lookback = extract_delta_with_lookback
IncrementalLoader.run_with_options = run_with_options`
      },
      {
        title: 'Step 5: Add Audit Logging and Run History',
        instruction: `Add an _audit_log table to the target database that records every pipeline run — rows extracted, rows upserted, duration, and outcome — creating a full lineage trail.

WHY: Audit logs are required for regulated industries and invaluable for debugging. When a stakeholder says "the numbers changed on Tuesday", an audit log tells you exactly what ran, when, how many rows were affected, and whether it succeeded. This is the foundation of data lineage.

HOW: Before each run, insert a row with status 'running'. After completion, update it to 'success' or 'failure' with row counts and duration. Use a try/except to ensure failed runs are also recorded.`,
        starterCode: `# Incremental Load — Step 5: Audit Logging
import time

def _ensure_audit_log(self):
    """Create the audit log table if it doesn't exist."""
    self.target.execute("""
        CREATE TABLE IF NOT EXISTS _audit_log (
            run_id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_name TEXT,
            started_at TEXT,
            completed_at TEXT,
            status TEXT,
            rows_extracted INTEGER,
            rows_upserted INTEGER,
            watermark_before TEXT,
            watermark_after TEXT,
            error_message TEXT
        )
    """)
    self.target.commit()

def run_audited(self, table_name: str, watermark_col: str, key_col: str,
                dry_run: bool = False, lookback_hours: int = 0):
    """Run incremental load with full audit logging."""
    self._ensure_audit_log()
    started_at = datetime.now(timezone.utc).isoformat()
    wm_before = self.get_watermark(table_name)

    # TODO: Insert initial audit row with status='running'
    # TODO: Capture the run_id (cursor.lastrowid)
    run_id = None

    try:
        # TODO: Run the load (reuse extract_delta_with_lookback and upsert)
        # TODO: On success, update audit row: status='success', rows counts, watermark_after, completed_at
        pass
    except Exception as e:
        # TODO: Update audit row: status='failure', error_message=str(e)
        # Re-raise so the caller knows the run failed
        raise

    # Show audit entry
    row = self.target.execute(
        "SELECT * FROM _audit_log WHERE run_id = ?", (run_id,)
    ).fetchone()
    print(f"\\nAudit log entry: {row}")

IncrementalLoader._ensure_audit_log = _ensure_audit_log
IncrementalLoader.run_audited = run_audited

# Test
# Re-create loader (closed at end of Step 3) against the same databases
loader = IncrementalLoader('test_source.db', 'test_target.db')
loader.target.execute("DROP TABLE IF EXISTS _audit_log")
loader.target.commit()
loader.set_watermark('orders', '1970-01-01T00:00:00')  # reset watermark for demo

loader.run_audited('orders', 'updated_at', 'order_id')
loader.run_audited('orders', 'updated_at', 'order_id')  # second run: 0 new rows`,
        hints: [
          'Insert initial row: cursor = self.target.execute("INSERT INTO _audit_log (table_name, started_at, status, watermark_before) VALUES (?, ?, \'running\', ?)", (table_name, started_at, wm_before)); run_id = cursor.lastrowid; self.target.commit()',
          'Update on success: self.target.execute("UPDATE _audit_log SET status=\'success\', completed_at=?, rows_extracted=?, rows_upserted=?, watermark_after=? WHERE run_id=?", (completed_at, len(rows), len(rows), new_wm, run_id))',
          'Update on failure: self.target.execute("UPDATE _audit_log SET status=\'failure\', completed_at=?, error_message=? WHERE run_id=?", (datetime.now(timezone.utc).isoformat(), str(e), run_id))'
        ],
        expectedOutput: `Loading orders...
  Extracted 3 new rows from orders (watermark > 1970-01-01T00:00:00)
  Upserted 3 rows into target.orders
  New watermark: 2024-01-12T09:00:00

Audit log entry: (1, 'orders', '2025-01-15T02:00:00', '2025-01-15T02:00:01', 'success', 3, 3, '1970-01-01T00:00:00', '2024-01-12T09:00:00', None)

Loading orders...
  Extracted 0 new rows from orders (watermark > 2024-01-12T09:00:00)
  No new data for orders

Audit log entry: (2, 'orders', '2025-01-15T02:00:01', '2025-01-15T02:00:01', 'success', 0, 0, '2024-01-12T09:00:00', '2024-01-12T09:00:00', None)`,
        solution: `import time
from datetime import datetime, timezone

def _ensure_audit_log(self):
    self.target.execute("""
        CREATE TABLE IF NOT EXISTS _audit_log (
            run_id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_name TEXT,
            started_at TEXT,
            completed_at TEXT,
            status TEXT,
            rows_extracted INTEGER,
            rows_upserted INTEGER,
            watermark_before TEXT,
            watermark_after TEXT,
            error_message TEXT
        )
    """)
    self.target.commit()

def run_audited(self, table_name: str, watermark_col: str, key_col: str,
                dry_run: bool = False, lookback_hours: int = 0):
    self._ensure_audit_log()
    started_at = datetime.now(timezone.utc).isoformat()
    wm_before = self.get_watermark(table_name)

    cursor = self.target.execute(
        "INSERT INTO _audit_log (table_name, started_at, status, watermark_before) VALUES (?, ?, 'running', ?)",
        (table_name, started_at, wm_before)
    )
    run_id = cursor.lastrowid
    self.target.commit()

    try:
        mode = "[DRY RUN] " if dry_run else ""
        print(f"{mode}Loading {table_name}...")
        columns, rows = self.extract_delta_with_lookback(table_name, watermark_col, lookback_hours)

        rows_upserted = 0
        new_wm = wm_before
        if not dry_run:
            self.upsert(table_name, columns, rows)
            rows_upserted = len(rows)
            if rows:
                wm_idx = columns.index(watermark_col)
                new_wm = str(rows[-1][wm_idx])
                self.set_watermark(table_name, new_wm)
                print(f"  New watermark: {new_wm}")
        else:
            print(f"  [DRY RUN] Would upsert {len(rows)} rows — no changes made")

        completed_at = datetime.now(timezone.utc).isoformat()
        self.target.execute(
            "UPDATE _audit_log SET status='success', completed_at=?, rows_extracted=?, rows_upserted=?, watermark_after=? WHERE run_id=?",
            (completed_at, len(rows), rows_upserted, new_wm, run_id)
        )
        self.target.commit()

    except Exception as e:
        self.target.execute(
            "UPDATE _audit_log SET status='failure', completed_at=?, error_message=? WHERE run_id=?",
            (datetime.now(timezone.utc).isoformat(), str(e), run_id)
        )
        self.target.commit()
        raise

    row = self.target.execute(
        "SELECT * FROM _audit_log WHERE run_id = ?", (run_id,)
    ).fetchone()
    print(f"\\nAudit log entry: {row}")

IncrementalLoader._ensure_audit_log = _ensure_audit_log
IncrementalLoader.run_audited = run_audited`
      }
    ]
  }
]
