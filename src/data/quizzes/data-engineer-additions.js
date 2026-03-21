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
    }
  ],
}
