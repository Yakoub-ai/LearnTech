export const additions = {
  beginner: [
    {
      question: 'What is the key difference between ETL and ELT?',
      options: [
        'ETL transforms data before loading it into the target system; ELT loads raw data first and transforms it inside the target system',
        'ETL is used for batch processing only; ELT is used for streaming only',
        'ETL requires a data warehouse; ELT requires a data lake',
        'ETL is a newer pattern than ELT'
      ],
      correctIndex: 0,
      explanation: 'ETL (Extract-Transform-Load) transforms data before it reaches the target, while ELT (Extract-Load-Transform) loads raw data into the target first and uses the target system\'s compute power for transformations. ELT has become popular with powerful cloud data warehouses.'
    },
    {
      question: 'Why is idempotency critical for data pipelines?',
      options: [
        'It makes pipelines run faster by caching results',
        'It ensures the same input always produces the same output regardless of how many times the pipeline runs, enabling safe retries',
        'It prevents pipelines from running concurrently',
        'It automatically detects and fixes data quality issues'
      ],
      correctIndex: 1,
      explanation: 'An idempotent pipeline produces the same result whether it runs once or multiple times for the same input. This is essential for safe retries after failures — without idempotency, retrying a failed pipeline can cause duplicate records or inconsistent data.'
    },
    {
      question: 'What is the difference between OLTP and OLAP database designs?',
      options: [
        'OLTP uses SQL; OLAP uses NoSQL',
        'OLTP is optimised for fast individual transactions; OLAP is optimised for fast aggregation across large datasets',
        'OLTP stores historical data; OLAP stores current data',
        'OLTP runs in the cloud; OLAP runs on-premises'
      ],
      correctIndex: 1,
      explanation: 'OLTP (Online Transaction Processing) databases are normalised and optimised for fast individual row operations like inserting an order or updating a customer record. OLAP (Online Analytical Processing) databases are often denormalised and optimised for aggregations across millions of rows, such as total sales by region by month.'
    },
    {
      question: 'Which SQL clause is used to filter results AFTER aggregation, as opposed to filtering individual rows before aggregation?',
      options: ['WHERE', 'HAVING', 'FILTER', 'QUALIFY'],
      correctIndex: 1,
      explanation: '`HAVING` filters groups produced by `GROUP BY`, whereas `WHERE` filters individual rows before grouping occurs.'
    },
    {
      question: 'What is the execution order of SQL clauses in a standard SELECT statement?',
      options: [
        'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
        'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
        'FROM → SELECT → WHERE → GROUP BY → ORDER BY → HAVING',
        'WHERE → FROM → GROUP BY → SELECT → HAVING → ORDER BY'
      ],
      correctIndex: 1,
      explanation: 'SQL executes clauses in the order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. Understanding this prevents errors like referencing aliases in WHERE clauses.'
    },
    {
      question: 'What is a data warehouse, and how does it differ from a transactional database?',
      options: [
        'A data warehouse is a central analytical repository that stores historical data from multiple sources in a schema optimised for queries and reporting, unlike transactional databases which are optimised for fast individual writes',
        'A data warehouse is a backup copy of the transactional database used for disaster recovery',
        'A data warehouse stores only unstructured data like documents and images, while transactional databases store structured data',
        'A data warehouse and a transactional database are the same thing accessed through different query languages'
      ],
      correctIndex: 0,
      explanation: 'A data warehouse consolidates data from multiple operational systems into a single repository optimised for analytical queries. Unlike transactional databases (optimised for fast row-level inserts and updates with normalised schemas), warehouses use denormalised schemas (like star schemas) designed for fast aggregations across large datasets.'
    },
    {
      question: 'Why is `SELECT *` considered bad practice in production data pipeline queries?',
      options: [
        'It is slower than SELECT on indexed columns only',
        'It returns columns in an undefined order',
        'It retrieves unnecessary columns, wasting compute and bandwidth, and breaks when the source schema changes',
        'It prevents the use of WHERE clauses'
      ],
      correctIndex: 2,
      explanation: 'SELECT * pulls all columns regardless of whether they are needed. It also creates fragile pipelines that break silently when columns are added, renamed, or reordered in the source.'
    }
  ],
  mid: [
    {
      question: 'In a star schema, what is the "grain" of a fact table?',
      options: [
        'The number of dimension tables that surround the fact table',
        'The level of detail represented by a single row in the fact table',
        'The size of the fact table in gigabytes',
        'The primary key column of the fact table'
      ],
      correctIndex: 1,
      explanation: 'The grain defines what a single row in the fact table represents — for example, one row per transaction, per day, or per customer-product combination. Defining the grain is the most important design decision when building a fact table because it determines what questions the table can answer and prevents mixing different levels of detail.'
    },
    {
      question: 'What does the dbt `ref()` function do?',
      options: [
        'It runs a SQL query against the data warehouse',
        'It references another dbt model, creating a dependency that dbt uses to determine execution order',
        'It connects dbt to an external data source',
        'It formats a column value as a reference key'
      ],
      correctIndex: 1,
      explanation: 'The `ref()` function is how dbt models reference each other. When model B uses `ref(\'model_a\')`, dbt records this as a dependency and ensures model A is built before model B. All `ref()` calls together define the DAG that dbt uses to determine the correct execution order.'
    },
    {
      question: 'Why should Airflow tasks be idempotent?',
      options: [
        'To allow multiple DAGs to share the same task definition',
        'To ensure that re-running a DAG for the same date always produces the same result, enabling safe backfills and retries',
        'To prevent tasks from using too much memory',
        'To make the Airflow scheduler run more efficiently'
      ],
      correctIndex: 1,
      explanation: 'Idempotent Airflow tasks produce the same output regardless of how many times they are run for the same input parameters. This is critical because pipelines fail and need to be retried, and backfills require running historical DAG runs. A non-idempotent task can create duplicate data or inconsistent results when re-run.'
    },
    {
      question: 'What is the key structural difference between a star schema and a snowflake schema?',
      options: [
        'Star schemas use fact tables; snowflake schemas do not',
        'In a star schema, dimension tables are denormalised; in a snowflake schema, dimensions are normalised into sub-tables',
        'Star schemas are for OLTP; snowflake schemas are for OLAP',
        'Snowflake schemas have one fact table; star schemas can have many'
      ],
      correctIndex: 1,
      explanation: 'A star schema has flat, denormalised dimension tables joined directly to the fact table. A snowflake schema normalises dimensions into related sub-tables. Star schemas are generally preferred in modern warehouses because they are faster to query.'
    },
    {
      question: 'Which dbt materialisation strategy rebuilds the entire table from scratch on every run?',
      options: ['view', 'incremental', 'table', 'ephemeral'],
      correctIndex: 2,
      explanation: 'The `table` materialisation drops and recreates the table on every dbt run. `view` creates a view, `incremental` only processes new/changed data, and `ephemeral` creates a CTE that is never materialised.'
    },
    {
      question: 'What is Apache Spark\'s key advantage over traditional ETL tools for large-scale data processing?',
      options: [
        'Spark distributes data and computation across a cluster of machines, enabling parallel processing of datasets that exceed the memory and compute capacity of any single node',
        'Spark uses SQL exclusively, which makes it faster than tools that support other query languages',
        'Spark automatically fixes data quality issues during processing, eliminating the need for manual validation',
        'Spark stores all data in memory permanently, so queries never need to read from disk'
      ],
      correctIndex: 0,
      explanation: 'Spark\'s core innovation is distributed computation. It partitions data across cluster nodes and executes transformations in parallel. This enables processing of datasets far larger than any single machine can handle. Spark also keeps intermediate results in memory between stages when possible (lazy evaluation with in-memory caching), which is faster than writing to disk between each step as traditional MapReduce does.'
    },
    {
      question: 'What is the difference between batch processing and stream processing in data engineering?',
      options: [
        'Batch processing operates on bounded datasets at scheduled intervals (e.g., hourly, daily); stream processing operates on unbounded data continuously as events arrive in real time',
        'Batch processing is used for small datasets; stream processing is used for large datasets',
        'Batch processing uses SQL; stream processing uses only Python or Java',
        'Batch processing is more expensive because it requires dedicated hardware; stream processing runs on shared infrastructure'
      ],
      correctIndex: 0,
      explanation: 'Batch processing collects data over a period and processes it as a complete, bounded set — typical for nightly warehouse loads and daily reports. Stream processing handles data as it arrives in real time — typical for fraud detection, live dashboards, and event-driven architectures. Many modern architectures combine both (the "lambda" or "kappa" pattern).'
    }
  ],
  senior: [
    {
      question: 'What is the medallion architecture in a lakehouse?',
      options: [
        'A security model for controlling access to data lake storage',
        'A three-layer pattern with Bronze (raw), Silver (cleaned), and Gold (aggregated) layers that progressively refine data',
        'A Kafka topic naming convention for streaming data',
        'A Delta Lake feature for compacting small files'
      ],
      correctIndex: 1,
      explanation: 'The medallion architecture organises lakehouse data into three layers: Bronze stores raw ingested data exactly as received from sources, Silver contains cleaned and conformed data with consistent schemas and quality checks applied, and Gold contains aggregated business-ready datasets optimised for specific analytical use cases. This progressive refinement makes data lineage clear and pipelines easier to maintain.'
    },
    {
      question: 'What is a data contract in the context of Data Mesh?',
      options: [
        'A legal agreement between a vendor and an organisation for data licensing',
        'An explicit agreement between a data producer and its consumers specifying the schema, semantics, and quality guarantees of a data product',
        'A dbt test that validates referential integrity between tables',
        'A Kafka schema registry entry that enforces Avro compatibility'
      ],
      correctIndex: 1,
      explanation: 'In Data Mesh, a data contract is a formal agreement that a domain team makes about the data product it publishes. It specifies the schema, the semantics of each field, SLAs for freshness and availability, and quality guarantees. Contracts enable consumers to build pipelines against a stable interface and give producers clear accountability for the data they own.'
    },
    {
      question: 'Under GDPR, why is the "right to erasure" particularly challenging to implement in a lakehouse?',
      options: [
        'Lakehouse storage is too expensive to delete data from',
        'Delta Lake time travel and append-only log structures mean deleted rows can still be accessed from historical versions until VACUUM is run with appropriate retention settings',
        'GDPR only applies to operational databases, not analytical storage',
        'Lakehouses do not support the DELETE statement'
      ],
      correctIndex: 1,
      explanation: 'Delta Lake\'s time travel feature stores historical versions of the table in the transaction log and Parquet files. A `DELETE` statement creates a new version removing the row, but older versions containing the personal data remain accessible until `VACUUM` is run. Engineers must configure appropriate retention periods and run VACUUM to fully purge personal data, and must also consider whether time travel history itself constitutes a retention of personal data under GDPR.'
    },
    {
      question: 'What is the unit of parallelism within a Kafka topic?',
      options: ['Topic', 'Partition', 'Consumer group', 'Broker'],
      correctIndex: 1,
      explanation: 'Partitions are the unit of parallelism in Kafka. A topic is divided into partitions, and each partition can be consumed independently by one consumer in a consumer group, enabling parallel processing.'
    },
    {
      question: 'What is the key innovation that table formats (Delta Lake, Iceberg, Hudi) add on top of plain Parquet files?',
      options: [
        'Better compression than native Parquet encoding',
        'ACID transactions, time travel, schema enforcement, and efficient upserts — making the data lake reliable like a warehouse',
        'The ability to store unstructured data like images and audio',
        'Native SQL query execution without requiring a compute engine'
      ],
      correctIndex: 1,
      explanation: 'Plain Parquet files on cloud storage are just files — they have no transaction semantics, no way to roll back, and concurrent writes can corrupt data. Table formats add a transaction log that provides ACID guarantees, time travel, and schema enforcement.'
    },
    {
      question: 'In the Data Mesh paradigm, what is the key organisational shift compared to a centralised data team?',
      options: [
        'Data Mesh replaces the data warehouse with a data lake, eliminating the need for a central platform',
        'Data Mesh decentralises data ownership to domain teams who treat their data as a product, while a central platform team provides self-serve infrastructure',
        'Data Mesh requires every engineer to become a data engineer, eliminating the need for specialised data roles',
        'Data Mesh mandates that all data be stored in a single cloud provider to ensure consistency'
      ],
      correctIndex: 1,
      explanation: 'Data Mesh shifts data ownership from a central data team to the domain teams that generate the data. Each domain team is responsible for publishing their data as a product with clear contracts, SLAs, and quality guarantees. A central platform team provides the self-serve tools and infrastructure that enable domain teams to do this without each building their own platform from scratch.'
    },
    {
      question: 'Why is data lineage critical for data governance in a large organisation?',
      options: [
        'Data lineage tracks the origin, transformations, and downstream consumers of every dataset, enabling impact analysis when sources change and providing auditability for regulatory compliance',
        'Data lineage improves query performance by caching the results of upstream transformations',
        'Data lineage automatically detects and corrects data quality issues without human intervention',
        'Data lineage is a visualisation tool that generates ER diagrams of the data warehouse schema'
      ],
      correctIndex: 0,
      explanation: 'Data lineage documents the full journey of data: where it came from (source systems), how it was transformed (ETL/ELT steps), and where it goes (downstream tables, dashboards, models). This is essential for impact analysis (what breaks if this source changes?), debugging (where did this incorrect value originate?), and regulatory compliance (proving to auditors that a reported number can be traced back to its authoritative source).'
    }
  ],
}
