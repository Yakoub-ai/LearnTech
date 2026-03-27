export const topicQuizzes = {
  beginner: [
    {
      topicId: 'python-foundations',
      topicTitle: 'Python Foundations – Syntax, Data Structures and File I/O',
      objectiveIndex: 0,
      questions: [
        {
          question: "Which Python data structure is best suited for storing a collection of unique values where order does not matter?",
          options: ["list", "tuple", "set", "dict"],
          correctIndex: 2,
          explanation: "A set stores only unique values and is unordered. Lists and tuples allow duplicates; dicts map keys to values."
        },
        {
          question: "What is the recommended Python pattern for opening a file to ensure it is automatically closed even if an exception occurs?",
          options: [
            "open() then close() in a finally block",
            "Using the `with` statement",
            "Using try/except around open()",
            "Calling file.flush() after writing"
          ],
          correctIndex: 1,
          explanation: "The `with` statement is a context manager that automatically closes the file when the block exits, even if an exception is raised."
        },
        {
          question: "What is a generator expression in Python and why is it preferred over a list comprehension for large datasets?",
          options: [
            "It produces the same result as a list but uses more memory",
            "It is a syntax shortcut that compiles to faster bytecode",
            "It yields values one at a time, making it memory-efficient for large data",
            "It caches results to avoid recomputation"
          ],
          correctIndex: 2,
          explanation: "Generator expressions yield values lazily one at a time rather than building the entire result in memory, which is essential for processing large data files."
        },
        {
          question: "Which of the following is a common pitfall when defining Python functions with mutable default arguments?",
          options: [
            "The function cannot be called without arguments",
            "The mutable default is shared across all calls, causing unintended state accumulation",
            "Python raises a SyntaxError at definition time",
            "The argument is converted to an immutable type automatically"
          ],
          correctIndex: 1,
          explanation: "Mutable default arguments like `def process(items=[])` share the same object across all calls. Mutations in one call persist to the next, which is rarely the intended behaviour."
        },
        {
          question: "What is the purpose of a virtual environment (`venv`) in Python data engineering projects?",
          options: [
            "To run Python code faster by isolating it from the OS",
            "To isolate project dependencies so different projects can use different package versions",
            "To encrypt source code before deployment",
            "To enable parallel execution of Python scripts"
          ],
          correctIndex: 1,
          explanation: "A virtual environment creates an isolated Python environment with its own installed packages, preventing version conflicts between projects."
        },
        {
          question: "When reading a text file in Python, why should you always specify the `encoding` parameter explicitly?",
          options: [
            "It is required by the Python language specification",
            "Without it, Python reads the file in binary mode",
            "The default encoding varies by platform, which can cause silent data corruption or errors on non-ASCII characters",
            "It improves file read performance"
          ],
          correctIndex: 2,
          explanation: "Python's default encoding depends on the OS locale, which differs between platforms. Explicitly specifying `encoding='utf-8'` ensures consistent behaviour across environments."
        },
        {
          question: "What is the risk of modifying a list while iterating over it in Python?",
          options: [
            "Python raises an IndexError immediately",
            "Elements may be skipped or processed multiple times",
            "The list is silently converted to a tuple",
            "Memory usage doubles during the iteration"
          ],
          correctIndex: 1,
          explanation: "Modifying a list during iteration shifts the indices of remaining elements, causing the iterator to skip or revisit elements unexpectedly."
        },
        {
          question: "Which Python module from the standard library is used to handle CSV files?",
          options: ["json", "csv", "io", "struct"],
          correctIndex: 1,
          explanation: "The `csv` module in Python's standard library provides reader and writer objects for parsing and writing CSV-formatted data."
        },
        {
          question: "In a data engineering context, what is the primary advantage of using `pathlib.Path` over string concatenation for file paths?",
          options: [
            "pathlib paths are faster to read from disk",
            "pathlib provides cross-platform path handling, avoiding Windows/Linux separator issues",
            "pathlib automatically creates missing directories",
            "pathlib compresses file paths to save memory"
          ],
          correctIndex: 1,
          explanation: "`pathlib.Path` abstracts OS-specific path separators (backslash on Windows, forward slash on Linux), making path handling code portable across platforms."
        },
        {
          question: "What is the difference between a Python list and a tuple?",
          options: [
            "Lists are faster than tuples for iteration",
            "Tuples are mutable; lists are immutable",
            "Lists are mutable (can be changed after creation); tuples are immutable (cannot be changed)",
            "There is no practical difference — they are interchangeable"
          ],
          correctIndex: 2,
          explanation: "Lists support mutation (append, remove, reassign elements) while tuples are immutable once created. Tuples are used for fixed collections and are hashable (usable as dict keys), while lists are used when the collection will change."
        },
        {
          question: "What does the `json.loads()` function do in Python?",
          options: [
            "Writes a Python object to a JSON file on disk",
            "Parses a JSON-formatted string and returns a Python dictionary or list",
            "Validates that a string is valid JSON without returning the parsed result",
            "Loads a JSON file from a URL over HTTP"
          ],
          correctIndex: 1,
          explanation: "`json.loads()` deserialises a JSON string into a Python object (dict, list, etc.). Its counterpart `json.dumps()` serialises a Python object into a JSON string. For file I/O, use `json.load()` and `json.dump()` (without the 's')."
        }
      ]
    },
    {
      topicId: 'sql-fundamentals',
      topicTitle: 'SQL Fundamentals – Querying, Filtering and Aggregation',
      objectiveIndex: 1,
      questions: [
        {
          question: "Which SQL clause is used to filter results AFTER aggregation, as opposed to filtering individual rows before aggregation?",
          options: ["WHERE", "HAVING", "FILTER", "QUALIFY"],
          correctIndex: 1,
          explanation: "`HAVING` filters groups produced by `GROUP BY`, whereas `WHERE` filters individual rows before grouping occurs."
        },
        {
          question: "What is the correct way to check for NULL values in a SQL WHERE clause?",
          options: [
            "WHERE column = NULL",
            "WHERE column != NULL",
            "WHERE column IS NULL",
            "WHERE ISNULL(column)"
          ],
          correctIndex: 2,
          explanation: "NULL comparisons using `=` always evaluate to UNKNOWN (not TRUE), so `IS NULL` must be used to correctly identify NULL values."
        },
        {
          question: "Which type of SQL JOIN returns all rows from the left table and matching rows from the right table, with NULLs for non-matching right rows?",
          options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
          correctIndex: 1,
          explanation: "A LEFT JOIN returns all rows from the left table. Where no match exists in the right table, the right-side columns are filled with NULL."
        },
        {
          question: "What does a Common Table Expression (CTE) using the `WITH` keyword provide?",
          options: [
            "A permanent view that is saved to the database",
            "A named temporary result set that improves query readability for multi-step queries",
            "An index that speeds up repeated subqueries",
            "A way to define stored procedures inline"
          ],
          correctIndex: 1,
          explanation: "CTEs define named subqueries scoped to a single statement. They improve readability by breaking complex queries into clearly named steps."
        },
        {
          question: "What is the execution order of SQL clauses in a standard SELECT statement?",
          options: [
            "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
            "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
            "FROM → SELECT → WHERE → GROUP BY → ORDER BY → HAVING",
            "WHERE → FROM → GROUP BY → SELECT → HAVING → ORDER BY"
          ],
          correctIndex: 1,
          explanation: "SQL executes clauses in the order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. Understanding this prevents errors like referencing aliases in WHERE clauses."
        },
        {
          question: "Why is `SELECT *` considered bad practice in production data pipeline queries?",
          options: [
            "It is slower than SELECT on indexed columns only",
            "It returns columns in an undefined order",
            "It retrieves unnecessary columns, wasting compute and bandwidth, and breaks when the source schema changes",
            "It prevents the use of WHERE clauses"
          ],
          correctIndex: 2,
          explanation: "SELECT * pulls all columns regardless of whether they are needed. It also creates fragile pipelines that break silently when columns are added, renamed, or reordered in the source."
        },
        {
          question: "What does the `COALESCE` function do in SQL?",
          options: [
            "Concatenates two string columns",
            "Returns the first non-NULL value from a list of expressions",
            "Converts NULL to zero for numeric calculations",
            "Checks if two values are equal including NULL comparison"
          ],
          correctIndex: 1,
          explanation: "`COALESCE` returns the first non-NULL value in its argument list, making it useful for providing default values when a column may be NULL."
        },
        {
          question: "Which aggregate function would you use to count all rows in a table, including rows where a specific column is NULL?",
          options: ["COUNT(column_name)", "COUNT(*)", "SUM(1)", "COUNT(DISTINCT column_name)"],
          correctIndex: 1,
          explanation: "`COUNT(*)` counts all rows regardless of NULL values. `COUNT(column_name)` counts only rows where that column is not NULL."
        },
        {
          question: "What is the difference between `UNION` and `UNION ALL` in SQL?",
          options: [
            "UNION combines results from two queries and removes duplicates; UNION ALL keeps all rows including duplicates",
            "UNION ALL combines results and removes duplicates; UNION keeps all rows",
            "UNION works only with matching column types; UNION ALL handles any column types",
            "There is no difference — they produce identical results"
          ],
          correctIndex: 0,
          explanation: "`UNION` deduplicates the combined result set, which requires sorting or hashing to detect duplicates. `UNION ALL` simply concatenates the results, making it faster. Use `UNION ALL` when you know there are no duplicates or when duplicates are acceptable."
        },
        {
          question: "What does the `GROUP BY` clause do in SQL?",
          options: [
            "Sorts the result set by the specified columns",
            "Groups rows that share the same values in the specified columns so aggregate functions can be applied to each group",
            "Limits the number of rows returned by the query",
            "Joins two tables based on matching column values"
          ],
          correctIndex: 1,
          explanation: "`GROUP BY` partitions rows into groups based on column values. Aggregate functions like `COUNT()`, `SUM()`, and `AVG()` then operate on each group independently, producing one result row per group."
        }
      ]
    },
    {
      topicId: 'relational-databases',
      topicTitle: 'Relational Databases – Tables, Keys and Schema Design',
      objectiveIndex: 2,
      questions: [
        {
          question: "What is the purpose of a foreign key constraint in a relational database?",
          options: [
            "To speed up queries on the referenced column",
            "To enforce referential integrity by ensuring a value in one table exists in the referenced table",
            "To prevent NULL values in the column",
            "To create a unique index on the column"
          ],
          correctIndex: 1,
          explanation: "A foreign key constraint ensures that a value in the child table references an existing row in the parent table, preventing orphaned records."
        },
        {
          question: "Which Normal Form is violated when a single column contains comma-separated values (e.g., storing multiple tags in one field)?",
          options: ["Second Normal Form (2NF)", "Third Normal Form (3NF)", "First Normal Form (1NF)", "Boyce-Codd Normal Form (BCNF)"],
          correctIndex: 2,
          explanation: "First Normal Form requires atomic (indivisible) values in each column. Storing multiple values in a single field violates 1NF and makes querying individual values very difficult."
        },
        {
          question: "What is the trade-off of adding an index to a database column?",
          options: [
            "Indexes improve read performance but slow down write operations",
            "Indexes improve both read and write performance",
            "Indexes slow down reads but improve write performance",
            "Indexes have no effect on performance, only on data integrity"
          ],
          correctIndex: 0,
          explanation: "Indexes speed up SELECT queries by allowing the database to locate rows without a full table scan, but they must be updated on every INSERT, UPDATE, and DELETE, adding write overhead."
        },
        {
          question: "When should you use a UUID as a primary key instead of an auto-incrementing integer?",
          options: [
            "Always — UUIDs are faster than integers",
            "When tables will be merged or synchronised across multiple independent systems",
            "When the table has fewer than 1000 rows",
            "When you want the primary key to be human-readable"
          ],
          correctIndex: 1,
          explanation: "Auto-incrementing integers can collide when merging data from multiple systems (two systems may independently generate ID=1). UUIDs are globally unique, making cross-system merges safe."
        },
        {
          question: "What does Third Normal Form (3NF) eliminate from a database schema?",
          options: [
            "Repeating groups within a single column",
            "Partial dependencies on composite primary keys",
            "Transitive dependencies where a non-key column depends on another non-key column",
            "Many-to-many relationships"
          ],
          correctIndex: 2,
          explanation: "3NF eliminates transitive dependencies — where column C depends on column B, and column B depends on the primary key A. Every non-key attribute should depend directly on the primary key."
        },
        {
          question: "What is the difference between OLTP and OLAP database designs?",
          options: [
            "OLTP uses SQL; OLAP uses NoSQL",
            "OLTP is optimised for fast individual transactions; OLAP is optimised for aggregation across large datasets",
            "OLTP is for analytical workloads; OLAP is for transactional workloads",
            "OLTP stores data in columns; OLAP stores data in rows"
          ],
          correctIndex: 1,
          explanation: "OLTP (Online Transaction Processing) systems are optimised for fast individual row operations. OLAP (Online Analytical Processing) systems are optimised for aggregating millions of rows for reporting and analysis."
        },
        {
          question: "What is a surrogate key and how does it differ from a natural key?",
          options: [
            "A surrogate key is a composite key; a natural key is a single column key",
            "A surrogate key is system-generated with no business meaning; a natural key is a business-meaningful identifier like an email or product code",
            "A surrogate key is stored as a string; a natural key is always an integer",
            "A surrogate key enforces uniqueness; a natural key does not"
          ],
          correctIndex: 1,
          explanation: "Surrogate keys (e.g., auto-increment IDs, UUIDs) are generated by the system and have no business meaning. Natural keys (e.g., email, product code) come from the business domain."
        },
        {
          question: "What is a composite primary key?",
          options: [
            "A primary key that references multiple foreign tables",
            "A primary key made up of two or more columns whose combined values uniquely identify each row",
            "A primary key that is encrypted for security purposes",
            "A primary key that automatically generates a hash value"
          ],
          correctIndex: 1,
          explanation: "A composite primary key uses two or more columns together to form a unique identifier. For example, an order_items table might use (order_id, product_id) as a composite key when neither column alone is unique."
        },
        {
          question: "What is database denormalisation and when is it used?",
          options: [
            "Removing all constraints from a database to improve write speed",
            "Intentionally introducing redundancy by combining tables to reduce join complexity and improve read performance",
            "Converting a relational database to a NoSQL database",
            "Splitting a large table into smaller tables for better organisation"
          ],
          correctIndex: 1,
          explanation: "Denormalisation deliberately adds redundancy (duplicates data across tables) to eliminate expensive joins at query time. It is commonly used in OLAP/analytical systems where read performance matters more than storage efficiency."
        }
      ]
    },
    {
      topicId: 'data-pipelines-etl',
      topicTitle: 'Data Pipelines – Extract, Transform, Load',
      objectiveIndex: 3,
      questions: [
        {
          question: "What is the key difference between ETL and ELT patterns?",
          options: [
            "ETL uses SQL; ELT uses Python",
            "ETL transforms data before loading into the target; ELT loads raw data first and transforms inside the target system",
            "ETL is for batch processing; ELT is for streaming",
            "ETL is used for cloud systems; ELT is used for on-premises systems"
          ],
          correctIndex: 1,
          explanation: "In ETL, data is transformed before it reaches the warehouse. In ELT, raw data is loaded first and transformations happen inside the powerful analytical system, which is the modern approach with cloud warehouses."
        },
        {
          question: "What does pipeline idempotency mean and why is it critical for data engineering?",
          options: [
            "The pipeline runs faster on repeated executions",
            "Running the pipeline multiple times for the same input produces the same result, enabling safe retries",
            "The pipeline can process data from multiple sources simultaneously",
            "The pipeline uses the same transformation logic for all data types"
          ],
          correctIndex: 1,
          explanation: "An idempotent pipeline produces identical output regardless of how many times it runs for the same input. This is essential for safely retrying failed pipelines without creating duplicate or inconsistent data."
        },
        {
          question: "What is incremental loading and why is it important at scale?",
          options: [
            "Loading data in alphabetical order to improve query performance",
            "Processing only new or changed data since the last run, rather than reprocessing everything",
            "Splitting large files into smaller chunks before loading",
            "Gradually increasing the compute resources used by a pipeline"
          ],
          correctIndex: 1,
          explanation: "Incremental loading processes only data that has changed since the previous run. As data volumes grow, full reloads become prohibitively slow and expensive, making incremental patterns essential."
        },
        {
          question: "Which of the following is NOT a common source system for a data pipeline?",
          options: [
            "Relational databases via JDBC/ODBC",
            "REST APIs",
            "A data warehouse's analytical query results",
            "Message queues"
          ],
          correctIndex: 2,
          explanation: "Common sources include operational databases, REST APIs, flat files, and message queues. Data warehouses are typically pipeline targets (destinations), not sources."
        },
        {
          question: "What is the difference between batch processing and real-time streaming in data pipelines?",
          options: [
            "Batch uses SQL; streaming uses Python",
            "Batch runs on a schedule processing accumulated data; streaming processes data continuously as it arrives",
            "Batch is more accurate; streaming is faster but less reliable",
            "Batch requires a data warehouse; streaming requires a data lake"
          ],
          correctIndex: 1,
          explanation: "Batch pipelines collect data over a period and process it on a schedule (hourly, daily). Streaming pipelines process each event as it arrives, enabling near-real-time data availability."
        },
        {
          question: "Why is silent failure in a data pipeline worse than a loud failure?",
          options: [
            "Silent failures consume more compute resources",
            "A pipeline that fails silently produces incorrect data while appearing successful, causing downstream consumers to trust bad data",
            "Silent failures are harder to restart",
            "Silent failures always result in data loss"
          ],
          correctIndex: 1,
          explanation: "A pipeline that fails loudly (with errors and alerts) can be investigated and fixed. A silent failure produces corrupted or incomplete data while reporting success, causing consumers to make decisions on bad data."
        },
        {
          question: "What is the common file format for storing structured data in a data lake that is optimised for analytical reads?",
          options: ["CSV", "XML", "Parquet", "YAML"],
          correctIndex: 2,
          explanation: "Parquet is a columnar, compressed file format optimised for analytical workloads. Unlike CSV or XML, it allows query engines to read only the columns needed and benefits from efficient compression."
        },
        {
          question: "What is a data pipeline 'watermark' used for in incremental loading?",
          options: [
            "A visible label added to output files for traceability",
            "A timestamp or value that marks the last successfully processed point, so the next run can pick up only new data from that point forward",
            "A security feature that prevents unauthorised data access",
            "A threshold that triggers an alert when data volume exceeds expectations"
          ],
          correctIndex: 1,
          explanation: "A watermark (often a timestamp like `last_modified >= '2024-01-15 08:00:00'`) tracks where the previous pipeline run stopped. The next run uses this value to process only rows changed after that point, enabling efficient incremental loading."
        },
        {
          question: "What is data lineage in the context of data pipelines?",
          options: [
            "The age of data measured from when it was first created",
            "A record of where data came from, how it was transformed, and where it ended up — enabling traceability from source to destination",
            "The number of pipeline stages data passes through",
            "A versioning system for data pipeline source code"
          ],
          correctIndex: 1,
          explanation: "Data lineage tracks the full journey of data through a pipeline — its origin, every transformation applied, and its final destination. This is critical for debugging data quality issues, auditing, and understanding the impact of upstream changes."
        }
      ]
    },
    {
      topicId: 'linux-and-command-line',
      topicTitle: 'Linux and Command Line – Navigating the Data Engineering Environment',
      objectiveIndex: 4,
      questions: [
        {
          question: "What is the difference between `>` and `>>` when redirecting output in Linux?",
          options: [
            "`>` appends to a file; `>>` overwrites a file",
            "`>` overwrites a file; `>>` appends to a file",
            "Both overwrite, but `>>` creates the file if it does not exist",
            "`>` redirects stdout; `>>` redirects stderr"
          ],
          correctIndex: 1,
          explanation: "`>` redirects output and overwrites the file if it exists. `>>` appends output to the end of an existing file, preserving previous content."
        },
        {
          question: "Which Linux command would you use to search for a pattern within a file's contents?",
          options: ["find", "ls", "grep", "cat"],
          correctIndex: 2,
          explanation: "`grep` searches for a text pattern within file contents. `find` searches for files by name or attributes; `ls` lists directory contents; `cat` displays file contents."
        },
        {
          question: "What does the pipe operator `|` do in Linux?",
          options: [
            "Runs two commands simultaneously in parallel",
            "Redirects output to a file",
            "Passes the standard output of one command as the standard input to the next command",
            "Separates multiple commands that run independently"
          ],
          correctIndex: 2,
          explanation: "The pipe `|` chains commands by feeding the stdout of the left command into the stdin of the right command, enabling powerful command composition."
        },
        {
          question: "Why should data engineers avoid running commands as root (superuser) unnecessarily?",
          options: [
            "Root commands run slower due to additional security checks",
            "Root access applies the minimum-privilege principle — using root when not needed expands the blast radius of mistakes or security breaches",
            "Some commands are unavailable to the root user",
            "Root access is only available on local machines, not cloud VMs"
          ],
          correctIndex: 1,
          explanation: "The principle of least privilege requires using only the permissions needed for a task. Unnecessary root access means a mistake or exploit can affect the entire system rather than just the current user's files."
        },
        {
          question: "Which command displays the tail of a log file and follows it in real-time as new lines are appended?",
          options: ["head -20 logfile", "tail -f logfile", "cat logfile | tail", "less +F logfile"],
          correctIndex: 1,
          explanation: "`tail -f` follows a file, continuously displaying new lines as they are appended. This is the standard command for monitoring live log output."
        },
        {
          question: "What is an environment variable and why are they used in data engineering pipelines?",
          options: [
            "A variable stored in a database for pipeline configuration",
            "A named value in the shell environment used to inject configuration (database credentials, API keys) at runtime without hardcoding them",
            "A Python variable that persists between script runs",
            "A system variable that tracks CPU and memory usage"
          ],
          correctIndex: 1,
          explanation: "Environment variables let you inject configuration values (credentials, endpoints, feature flags) at runtime. This keeps secrets out of source code and allows the same pipeline to behave differently in dev/staging/production."
        },
        {
          question: "What does the `chmod` command do in Linux?",
          options: [
            "Changes the owner of a file or directory",
            "Changes the file permissions (read, write, execute) for the owner, group, and others",
            "Changes the name of a file or directory",
            "Checks whether a file has been modified recently"
          ],
          correctIndex: 1,
          explanation: "`chmod` (change mode) modifies file permissions. For example, `chmod 755 script.sh` gives the owner read/write/execute, and group/others read/execute. This is essential for making pipeline scripts executable."
        },
        {
          question: "What is a cron job and why is it relevant to data engineering?",
          options: [
            "A Python library for scheduling tasks within a script",
            "A time-based scheduler in Linux that runs commands or scripts at specified intervals, commonly used for scheduling batch data pipeline runs",
            "A monitoring tool that tracks system performance over time",
            "A Docker container that runs on a fixed schedule"
          ],
          correctIndex: 1,
          explanation: "Cron is a Linux daemon that executes scheduled commands. Data engineers use cron expressions (e.g., `0 2 * * *` for 2 AM daily) to trigger pipeline runs. This same syntax is used in Airflow and other orchestration tools."
        }
      ]
    },
    {
      topicId: 'data-modelling-basics',
      topicTitle: 'Data Modelling Basics – Structuring Data for Purpose',
      objectiveIndex: 5,
      questions: [
        {
          question: "What is the key difference between OLTP and OLAP data models?",
          options: [
            "OLTP models use star schemas; OLAP models use ER diagrams",
            "OLTP models are optimised for fast individual transactions; OLAP models are optimised for fast aggregation across large datasets",
            "OLTP models store data in Parquet; OLAP models store in CSV",
            "OLTP is used for data lakes; OLAP is used for operational databases"
          ],
          correctIndex: 1,
          explanation: "OLTP (row-oriented, normalised) is designed for fast individual inserts and updates. OLAP (column-oriented, often denormalised) is designed for fast aggregation queries over large volumes of data."
        },
        {
          question: "What does cardinality describe in a data model?",
          options: [
            "The number of indexes on a table",
            "The nature of the relationship between entities — one-to-one, one-to-many, or many-to-many",
            "The number of columns in a table",
            "The storage size of a column's data type"
          ],
          correctIndex: 1,
          explanation: "Cardinality describes how many instances of one entity relate to instances of another — for example, one customer can have many orders (one-to-many), or many students can enrol in many courses (many-to-many)."
        },
        {
          question: "What is a 'source of truth' in data modelling?",
          options: [
            "The oldest version of a dataset",
            "The data warehouse where all data is centralised",
            "The authoritative system of record for a specific piece of data",
            "A backup copy of the production database"
          ],
          correctIndex: 2,
          explanation: "A source of truth is the authoritative system where a given piece of data originates and is considered correct. When the same data exists in multiple systems, defining the source of truth prevents conflicts and confusion."
        },
        {
          question: "Why is designing a data model without understanding who will consume it a common pitfall?",
          options: [
            "Consumers may write queries that corrupt the model",
            "A model designed without knowing the questions it must answer will likely be structured in a way that makes those questions slow or impossible to answer",
            "Consumer requirements are always identical, so this assumption is usually safe",
            "Consumers can always reshape data in their own tools"
          ],
          correctIndex: 1,
          explanation: "The purpose of a data model is to serve specific analytical or operational needs. Without understanding those needs upfront, the resulting model may require complex, brittle transformations that do not serve consumers effectively."
        },
        {
          question: "What is an Entity-Relationship (ER) diagram used for?",
          options: [
            "Visualising the execution plan of a SQL query",
            "Documenting the entities in a data domain, their attributes, and how they relate to each other",
            "Showing the flow of data through a pipeline",
            "Mapping network traffic between database servers"
          ],
          correctIndex: 1,
          explanation: "ER diagrams are a standard tool for visualising data models — they show entities (tables), their attributes (columns), and the relationships (foreign keys) between them."
        },
        {
          question: "What is the difference between a surrogate key and a natural key in data modelling?",
          options: [
            "Surrogate keys are always strings; natural keys are always integers",
            "Surrogate keys are system-generated with no business meaning; natural keys are business identifiers like email or product code",
            "Surrogate keys span multiple columns; natural keys are single columns",
            "Surrogate keys enforce referential integrity; natural keys do not"
          ],
          correctIndex: 1,
          explanation: "Surrogate keys (auto-incremented IDs, UUIDs) are generated by the system and have no meaning outside the database. Natural keys (email, product code, tax ID) are meaningful business identifiers that come from the domain."
        },
        {
          question: "Why is data modelling NOT a one-time activity?",
          options: [
            "Database engines require periodic schema rebuilds for performance",
            "Business requirements change over time, requiring models to evolve to reflect new entities, relationships, and analytical needs",
            "Models must be rebuilt whenever indexes are updated",
            "Regulatory requirements force annual model redesigns"
          ],
          correctIndex: 1,
          explanation: "Data models reflect the current understanding of a business domain and its analytical requirements. As the business evolves — new products, new questions, new regulations — models must be updated accordingly."
        },
        {
          question: "What is a many-to-many relationship and how is it implemented in a relational database?",
          options: [
            "It is handled by storing comma-separated IDs in a single column",
            "It requires a junction (bridge) table containing foreign keys to both related tables",
            "It is implemented by adding a foreign key column to both tables pointing at each other",
            "Relational databases cannot represent many-to-many relationships"
          ],
          correctIndex: 1,
          explanation: "A many-to-many relationship (e.g., students enrolled in courses) is implemented using a junction table (e.g., student_courses) that contains foreign keys to both tables. Each row in the junction table represents one association."
        },
        {
          question: "What is the difference between a logical data model and a physical data model?",
          options: [
            "A logical model includes indexes and partitions; a physical model does not",
            "A logical model describes entities, attributes, and relationships independent of technology; a physical model defines the actual tables, columns, data types, and indexes for a specific database",
            "A logical model is created after the physical model to document the implementation",
            "There is no meaningful difference — they are two names for the same artefact"
          ],
          correctIndex: 1,
          explanation: "The logical model captures what data exists and how it relates — independent of any database engine. The physical model translates this into concrete implementation: table names, column types, indexes, partitioning strategies, and constraints for a specific platform."
        }
      ]
    }
  ],
  mid: [
    {
      topicId: 'data-warehousing-dimensional-modelling',
      topicTitle: 'Data Warehousing – Dimensional Modelling and Star Schema',
      objectiveIndex: 0,
      questions: [
        {
          question: "In dimensional modelling, what is the 'grain' of a fact table?",
          options: [
            "The number of rows in the fact table",
            "The level of detail each row represents — the single most important design decision",
            "The primary key column of the fact table",
            "The compression ratio of the fact table storage"
          ],
          correctIndex: 1,
          explanation: "The grain defines what one row in the fact table represents (e.g., one transaction, one line item, one daily summary). Defining the grain upfront is the most critical decision because mixing grains causes incorrect aggregations."
        },
        {
          question: "What is the key structural difference between a star schema and a snowflake schema?",
          options: [
            "Star schemas use fact tables; snowflake schemas do not",
            "In a star schema, dimension tables are denormalised; in a snowflake schema, dimensions are normalised into sub-tables",
            "Star schemas are for OLTP; snowflake schemas are for OLAP",
            "Snowflake schemas have one fact table; star schemas can have many"
          ],
          correctIndex: 1,
          explanation: "A star schema has flat, denormalised dimension tables joined directly to the fact table. A snowflake schema normalises dimensions into related sub-tables. Star schemas are generally preferred in modern warehouses because they are faster to query."
        },
        {
          question: "What type of fact is 'revenue' in dimensional modelling terminology?",
          options: [
            "Semi-additive fact",
            "Non-additive fact",
            "Additive fact",
            "Derived fact"
          ],
          correctIndex: 2,
          explanation: "An additive fact can be meaningfully summed across all dimension combinations. Revenue is fully additive — you can sum it across time, geography, and product dimensions."
        },
        {
          question: "Which Slowly Changing Dimension (SCD) strategy adds a new row with versioning to preserve the full history of attribute changes?",
          options: ["Type 1 — Overwrite", "Type 2 — Add new row", "Type 3 — Add new column", "Type 4 — History table"],
          correctIndex: 1,
          explanation: "SCD Type 2 preserves history by adding a new row for each change, with effective date and current flag columns to identify the current version. This allows point-in-time analysis of dimension attributes."
        },
        {
          question: "Why are dimension tables typically denormalised in a star schema even though normalisation reduces redundancy?",
          options: [
            "Denormalisation is required by the SQL standard for analytical queries",
            "Denormalised dimensions reduce the number of joins at query time, improving analytical query performance",
            "Denormalisation reduces storage costs significantly",
            "Normalised dimensions cannot store NULL values"
          ],
          correctIndex: 1,
          explanation: "Analytical queries join fact tables to multiple dimensions frequently. Denormalised dimensions eliminate the additional joins that a snowflake schema requires, trading storage for query speed."
        },
        {
          question: "What is an 'account balance' an example of in dimensional modelling?",
          options: [
            "An additive fact — it can be summed across all dimensions",
            "A semi-additive fact — it can be summed across some dimensions (e.g., accounts) but not others (e.g., time)",
            "A non-additive fact — it cannot be meaningfully summed at all",
            "A degenerate dimension — it belongs in a dimension table"
          ],
          correctIndex: 1,
          explanation: "Account balance is semi-additive. Summing balances across accounts makes sense (total portfolio balance), but summing the same account's balance across multiple days is meaningless — it would double-count."
        },
        {
          question: "What is the risk of ignoring Slowly Changing Dimensions in a data warehouse?",
          options: [
            "Dimension tables will grow too large to query",
            "Historical reports will silently reflect current attribute values instead of the values that existed at the time of the transaction",
            "Fact table joins will produce duplicate rows",
            "The data warehouse will fail to load new records"
          ],
          correctIndex: 1,
          explanation: "Without SCD handling, when a dimension attribute changes (e.g., a customer moves regions), historical transactions are retrospectively associated with the new value, corrupting historical analysis."
        },
        {
          question: "What is a 'degenerate dimension' in dimensional modelling?",
          options: [
            "A dimension that has been deprecated and should be removed",
            "A dimension key stored directly in the fact table without a corresponding dimension table, such as an order number or invoice number",
            "A dimension with only one attribute besides the primary key",
            "A dimension table that references another dimension table"
          ],
          correctIndex: 1,
          explanation: "A degenerate dimension is a dimension key (e.g., order number, invoice number) stored directly in the fact table because creating a separate dimension table for it would add no useful attributes. It is used for grouping or filtering fact rows."
        },
        {
          question: "What is a 'factless fact table' and when is it used?",
          options: [
            "A fact table that has been emptied for testing purposes",
            "A fact table that records events without numeric measures — capturing only the occurrence of an event through dimension key relationships",
            "A staging table used during ETL before metrics are calculated",
            "A fact table where all numeric columns contain NULL values"
          ],
          correctIndex: 1,
          explanation: "A factless fact table captures events that have no associated measurements — for example, student attendance (who attended which class on which date). It contains only dimension foreign keys, recording the fact that an event occurred."
        }
      ]
    },
    {
      topicId: 'dbt-transformations-as-code',
      topicTitle: 'dbt (data build tool) – Transformations as Code',
      objectiveIndex: 1,
      questions: [
        {
          question: "What does a dbt model consist of?",
          options: [
            "A Python script that extracts and loads data",
            "A SQL SELECT statement stored in a .sql file that produces a table or view in the warehouse",
            "A YAML configuration file that defines data sources",
            "A Jinja template that generates Python pipeline code"
          ],
          correctIndex: 1,
          explanation: "Each dbt model is a .sql file containing a SELECT statement. dbt handles materialisation — creating the resulting table or view in the warehouse based on the configured strategy."
        },
        {
          question: "What is the purpose of the `ref()` function in dbt?",
          options: [
            "It references an external database table not managed by dbt",
            "It references another dbt model, establishing a dependency that dbt uses to build the execution DAG",
            "It references a Jinja macro for reuse across models",
            "It references a test definition in the schema.yml file"
          ],
          correctIndex: 1,
          explanation: "`ref()` is how one dbt model declares a dependency on another. dbt uses these references to build a directed acyclic graph (DAG) and determine the correct execution order."
        },
        {
          question: "Which dbt materialisation strategy rebuilds the entire table from scratch on every run?",
          options: ["view", "incremental", "table", "ephemeral"],
          correctIndex: 2,
          explanation: "The `table` materialisation drops and recreates the table on every dbt run. `view` creates a view, `incremental` only processes new/changed data, and `ephemeral` creates a CTE that is never materialised."
        },
        {
          question: "What is the dbt `incremental` materialisation used for?",
          options: [
            "To gradually increase query performance over multiple runs",
            "To append or merge only new or changed data rather than rebuilding the entire table on each run",
            "To incrementally add columns to an existing table schema",
            "To run models in priority order from smallest to largest"
          ],
          correctIndex: 1,
          explanation: "The `incremental` materialisation is designed for large tables where rebuilding everything would be expensive. It processes only rows that are new or changed since the last run."
        },
        {
          question: "Which built-in dbt test verifies that no two rows in a model have the same value for a column?",
          options: ["not_null", "accepted_values", "unique", "relationships"],
          correctIndex: 2,
          explanation: "The `unique` test asserts that every value in the specified column appears only once. Combined with `not_null`, it verifies that a column functions as a valid primary key."
        },
        {
          question: "What does dbt use Jinja templating for?",
          options: [
            "To write Python functions that transform data before SQL is executed",
            "To add logic (if/else, loops, macros) to SQL, enabling DRY and reusable transformations",
            "To generate HTML documentation from SQL models",
            "To validate SQL syntax before running against the warehouse"
          ],
          correctIndex: 1,
          explanation: "dbt uses Jinja to add programming constructs to SQL — conditionals, loops, and reusable macros. This enables DRY (Don't Repeat Yourself) patterns and dynamic SQL generation."
        },
        {
          question: "What is the role of a dbt `source` declaration?",
          options: [
            "It defines a new table that dbt will create in the warehouse",
            "It declares an external table that dbt reads from but does not manage, enabling freshness checks and lineage tracking",
            "It specifies the source code repository for the dbt project",
            "It defines the connection credentials for the data warehouse"
          ],
          correctIndex: 1,
          explanation: "Sources declare tables in the warehouse that dbt reads but does not own (e.g., raw tables loaded by an ingestion tool). This enables freshness alerting and ensures lineage tracking covers the full data flow."
        },
        {
          question: "Why is materialising every dbt model as a `table` considered a pitfall?",
          options: [
            "Tables cannot be queried directly in most data warehouses",
            "It wastes warehouse compute and storage when views would provide the same results without the overhead",
            "Table materialisation breaks the dependency DAG",
            "Downstream models cannot reference models materialised as tables"
          ],
          correctIndex: 1,
          explanation: "Many intermediate or rarely queried models can be views that run their SQL at query time. Materialising them as tables consumes compute on every dbt run and wastes storage when the underlying data changes infrequently."
        },
        {
          question: "What is the purpose of the `source()` function in dbt, and how does it differ from `ref()`?",
          options: [
            "source() references raw tables defined in a YAML file and enables freshness checks; ref() references other dbt models within the project",
            "source() is an alias for ref() used in older dbt versions",
            "source() loads data from external APIs; ref() loads data from the warehouse",
            "source() is used only in dbt Cloud; ref() is used in dbt Core"
          ],
          correctIndex: 0,
          explanation: "`source()` references raw tables from upstream systems declared in a sources YAML file. It enables dbt to track source freshness and warn when data is stale. `ref()` references transformed dbt models, building the internal DAG."
        },
        {
          question: "What is an incremental model in dbt, and when should you use one?",
          options: [
            "A model that automatically increases the warehouse compute allocation as data grows",
            "A model that only processes new or changed rows since the last run, reducing build time for large tables",
            "A model that incrementally adds columns to a table based on schema evolution",
            "A model that runs once per hour instead of once per day"
          ],
          correctIndex: 1,
          explanation: "Incremental models use a filter (typically a timestamp) to process only rows that arrived since the last successful run. This avoids rebuilding the entire table every time dbt runs, dramatically reducing compute cost and build time for large datasets."
        }
      ]
    },
    {
      topicId: 'apache-spark',
      topicTitle: 'Apache Spark – Distributed Data Processing',
      objectiveIndex: 2,
      questions: [
        {
          question: "What is lazy evaluation in Apache Spark?",
          options: [
            "Spark delays processing until the cluster has available resources",
            "Transformations build a logical plan but are not executed until an action is called",
            "Spark caches results to avoid re-executing transformations",
            "DataFrames are not loaded into memory until explicitly materialised"
          ],
          correctIndex: 1,
          explanation: "Spark's lazy evaluation means transformation operations (filter, join, select) only define a plan. Execution happens when an action (count, write, collect) is triggered, allowing Spark to optimise the full plan before running."
        },
        {
          question: "In Spark's driver-executor model, what is the role of the driver?",
          options: [
            "The driver stores and processes data partitions",
            "The driver orchestrates the job — it compiles the plan and coordinates executors on worker nodes",
            "The driver manages cluster resource allocation",
            "The driver handles fault tolerance and task retries"
          ],
          correctIndex: 1,
          explanation: "The Spark driver runs the user's application code, builds the execution plan, and coordinates executors. Executors run on worker nodes and perform the actual data processing on their assigned partitions."
        },
        {
          question: "What is a Spark 'shuffle' and why is it expensive?",
          options: [
            "A shuffle randomly reorders partitions to improve parallelism",
            "A shuffle is data redistribution across partitions, required by operations like join and groupBy, involving network I/O between executors",
            "A shuffle compresses data before writing to storage",
            "A shuffle rebalances executors when one worker node fails"
          ],
          correctIndex: 1,
          explanation: "A shuffle occurs when Spark must redistribute data across partitions — for example, to bring all rows with the same key together for a groupBy. This involves network I/O between executors and is the most expensive Spark operation."
        },
        {
          question: "Why should you avoid calling `collect()` on a large Spark DataFrame?",
          options: [
            "collect() is deprecated in modern versions of Spark",
            "collect() pulls all data from distributed executors to the driver, which can cause out-of-memory errors",
            "collect() converts the DataFrame to an RDD, losing schema information",
            "collect() writes data to disk instead of returning it in memory"
          ],
          correctIndex: 1,
          explanation: "`collect()` moves all distributed data to the driver's memory. For large DataFrames, this exhausts driver memory and crashes the job. Data should remain distributed; only small results should be collected."
        },
        {
          question: "What is the 'small file problem' in Spark and how is it addressed?",
          options: [
            "Input files under 1MB cannot be read by Spark; use coalesce() to merge them before reading",
            "Writing many small output files degrades downstream read performance; use coalesce() or repartition() to reduce output file count",
            "Small files cause shuffle operations to fail; partition the data before joining",
            "Spark cannot read files smaller than its default block size"
          ],
          correctIndex: 1,
          explanation: "When Spark writes many small files (one per partition), downstream systems must open thousands of files per query, creating significant overhead. `coalesce()` or `repartition()` reduces the number of output files."
        },
        {
          question: "Which file format is the default standard for analytical data in Spark workloads?",
          options: ["CSV", "JSON", "Parquet", "Avro"],
          correctIndex: 2,
          explanation: "Parquet is the default analytical format for Spark. It is columnar and compressed, allowing Spark to read only the columns needed and benefiting from efficient encoding, dramatically reducing I/O."
        },
        {
          question: "What is the difference between a Spark transformation and a Spark action?",
          options: [
            "Transformations write data; actions read data",
            "Transformations are lazy and build the execution plan; actions trigger execution and return results or write output",
            "Transformations run on the driver; actions run on executors",
            "Transformations use DataFrames; actions use RDDs"
          ],
          correctIndex: 1,
          explanation: "Transformations (filter, select, join) are lazy — they add steps to Spark's execution plan without running anything. Actions (count, show, write) trigger the physical execution of the accumulated plan."
        },
        {
          question: "What is the purpose of `broadcast()` in Apache Spark, and when should it be used?",
          options: [
            "It sends log messages to all executor nodes for debugging",
            "It replicates a small DataFrame to every executor so large-to-small joins avoid a full shuffle",
            "It distributes a DataFrame evenly across all partitions",
            "It broadcasts the Spark driver's configuration to all workers"
          ],
          correctIndex: 1,
          explanation: "A broadcast join copies a small DataFrame to every executor's memory. When joining a large DataFrame with a small lookup table, this eliminates the expensive shuffle of the large DataFrame across the network."
        },
        {
          question: "Why does repartitioning a Spark DataFrame before writing improve downstream read performance?",
          options: [
            "Repartitioning compresses the data more efficiently",
            "Repartitioning by a frequently filtered column aligns the physical file layout with query patterns, enabling partition pruning to skip irrelevant files",
            "Repartitioning forces Spark to use columnar storage format",
            "Repartitioning removes duplicate rows before writing"
          ],
          correctIndex: 1,
          explanation: "When you repartition by a column (e.g., date or region) before writing to storage, each partition becomes a separate directory or file. Queries that filter on that column can skip entire partitions, reading far less data from disk."
        }
      ]
    },
    {
      topicId: 'apache-airflow',
      topicTitle: 'Apache Airflow – Workflow Orchestration',
      objectiveIndex: 3,
      questions: [
        {
          question: "What is a DAG in Apache Airflow?",
          options: [
            "A type of database used to store Airflow metadata",
            "A Directed Acyclic Graph — a Python file defining a workflow as tasks with ordered dependencies",
            "A Docker container that runs Airflow tasks in isolation",
            "A configuration file for Airflow's scheduler"
          ],
          correctIndex: 1,
          explanation: "A DAG (Directed Acyclic Graph) is the core Airflow concept. It is a Python file that defines a workflow as a collection of tasks and the dependencies between them, ensuring tasks run in the correct order."
        },
        {
          question: "In Airflow, what does `task_a >> task_b` express?",
          options: [
            "task_a and task_b run in parallel",
            "task_b runs only after task_a has succeeded",
            "task_a receives the output of task_b",
            "task_a has higher priority than task_b"
          ],
          correctIndex: 1,
          explanation: "The `>>` operator sets a downstream dependency — task_b will not start until task_a completes successfully. This is Airflow's primary mechanism for expressing task ordering."
        },
        {
          question: "What are XComs in Airflow and what are they NOT designed for?",
          options: [
            "XComs store task execution logs; they are not designed for inter-task communication",
            "XComs pass small values between tasks; they are not designed for passing large datasets like DataFrames",
            "XComs define task dependencies; they are not designed for scheduling",
            "XComs store DAG configurations; they are not designed for runtime data"
          ],
          correctIndex: 1,
          explanation: "XComs (Cross-Communications) allow tasks to share small values like file paths or status flags. They are stored in Airflow's metadata database and are not suitable for large datasets — passing DataFrames via XCom will overload the database."
        },
        {
          question: "Why should heavy data processing logic NOT be placed directly inside Airflow task functions?",
          options: [
            "Airflow task functions do not support Python code",
            "Airflow is an orchestrator — it should trigger work in dedicated systems (Spark, dbt, SQL) rather than performing heavy processing itself",
            "Airflow tasks cannot access external data sources",
            "Heavy logic prevents Airflow from scheduling tasks in parallel"
          ],
          correctIndex: 1,
          explanation: "Airflow's role is orchestration — deciding when and in what order to run tasks. Heavy processing inside Airflow tasks starves the scheduler of resources. Delegate compute to Spark, dbt, or cloud services and use Airflow only to trigger and monitor them."
        },
        {
          question: "What is the consequence of writing non-idempotent Airflow DAGs?",
          options: [
            "The DAG cannot be scheduled with a cron expression",
            "Re-running a DAG for the same date produces different or duplicated results, making backfills and retries unsafe",
            "Non-idempotent DAGs cannot use the PythonOperator",
            "The Airflow scheduler will refuse to execute the DAG"
          ],
          correctIndex: 1,
          explanation: "If a DAG is not idempotent, re-running it for a past date (backfill) or retrying a failed run produces incorrect or duplicate data. Idempotent DAGs are essential for reliable data pipelines."
        },
        {
          question: "What is the purpose of setting `retries` and `retry_delay` on Airflow tasks?",
          options: [
            "To limit the maximum runtime of each task",
            "To automatically retry failed tasks after a delay, handling transient errors without human intervention",
            "To set the execution priority relative to other tasks",
            "To schedule tasks to run at regular intervals within a DAG run"
          ],
          correctIndex: 1,
          explanation: "Transient failures (network timeouts, temporary service unavailability) are common in distributed systems. Setting `retries` and `retry_delay` allows Airflow to automatically recover from these without requiring manual intervention."
        },
        {
          question: "What is the purpose of Airflow's `TaskGroup` and how does it improve DAG organisation?",
          options: [
            "It runs all grouped tasks in parallel regardless of dependencies",
            "It visually and logically groups related tasks in the DAG UI without creating a separate sub-DAG, improving readability of complex workflows",
            "It assigns grouped tasks to a dedicated worker pool for isolation",
            "It merges multiple tasks into a single task to reduce scheduler overhead"
          ],
          correctIndex: 1,
          explanation: "`TaskGroup` organises related tasks into collapsible sections in the Airflow UI. Unlike the deprecated SubDAG, TaskGroups run within the same DAG and do not create a separate DagRun, avoiding the deadlock and performance issues SubDAGs had."
        }
      ]
    },
    {
      topicId: 'azure-data-services',
      topicTitle: 'Azure Data Services – Data Factory and Synapse',
      objectiveIndex: 4,
      questions: [
        {
          question: "What is Azure Data Factory's primary purpose?",
          options: [
            "A SQL database service for storing analytical data",
            "A cloud-based data integration service for orchestrating and automating data movement and transformation",
            "A machine learning platform for training models on large datasets",
            "A streaming service for processing real-time event data"
          ],
          correctIndex: 1,
          explanation: "Azure Data Factory (ADF) is a managed ETL/ELT orchestration service. It connects to 100+ data sources, moves and transforms data, and schedules pipeline runs — serving a similar role to Apache Airflow in the Azure ecosystem."
        },
        {
          question: "What is the difference between an Azure Synapse dedicated SQL pool and a serverless SQL pool?",
          options: [
            "Dedicated SQL pools use SQL; serverless pools use Python",
            "Dedicated pools provision compute that charges per hour regardless of usage; serverless pools charge per TB of data scanned",
            "Dedicated pools are for streaming; serverless pools are for batch",
            "Dedicated pools support external tables; serverless pools do not"
          ],
          correctIndex: 1,
          explanation: "Dedicated SQL pools provision fixed compute and are billed continuously. Serverless SQL pools are pay-per-query (per TB scanned), making them cost-effective for ad hoc exploration but potentially expensive for large scans."
        },
        {
          question: "What is an Azure Data Factory Integration Runtime?",
          options: [
            "The SQL engine that executes ADF Data Flows",
            "The compute infrastructure ADF uses to connect to data sources; Self-Hosted IR is required for on-premises sources",
            "The scheduling component that triggers ADF pipeline runs",
            "The monitoring dashboard for ADF pipeline execution"
          ],
          correctIndex: 1,
          explanation: "The Integration Runtime (IR) is the compute ADF uses to execute activities. The Azure IR handles cloud-to-cloud connections. The Self-Hosted IR must be installed in your network to reach on-premises or private network data sources."
        },
        {
          question: "Why is storing database connection passwords directly in ADF linked services a security pitfall?",
          options: [
            "ADF linked services cannot store string values, only references",
            "Credentials in linked services are visible in deployment templates and not rotated automatically; Azure Key Vault should be used instead",
            "Direct credentials prevent ADF from using the Copy Activity",
            "Hardcoded credentials prevent pipeline parameterisation"
          ],
          correctIndex: 1,
          explanation: "Credentials stored directly in linked services appear in ARM templates and activity logs. Using Azure Key Vault references keeps secrets out of pipeline definitions and enables centralised rotation without redeploying pipelines."
        },
        {
          question: "What does Azure Data Factory's Copy Activity do?",
          options: [
            "Copies an entire ADF pipeline to another region for disaster recovery",
            "ADF's primary data movement tool — connects to 100+ sources and sinks with built-in format conversion",
            "Creates a replica of a Synapse SQL pool for testing",
            "Copies data between two Azure Blob Storage accounts"
          ],
          correctIndex: 1,
          explanation: "The Copy Activity is ADF's workhorse for data movement. It supports over 100 connectors (databases, cloud storage, SaaS apps) and handles format conversion (CSV to Parquet, etc.) without custom code."
        },
        {
          question: "What is a Managed Private Endpoint in Azure Data Factory, and why is it important for enterprise data pipelines?",
          options: [
            "It provides a public URL that is managed by Azure for external API access",
            "It creates a private network connection from the ADF managed virtual network to a data source, ensuring traffic never traverses the public internet",
            "It automatically rotates access keys for connected data sources",
            "It is a DNS endpoint that routes traffic to the nearest Azure region"
          ],
          correctIndex: 1,
          explanation: "Managed Private Endpoints use Azure Private Link to establish network-level isolation between ADF and data sources. This ensures sensitive data (database connections, storage access) travels only over the Azure backbone, meeting enterprise security and compliance requirements."
        }
      ]
    },
    {
      topicId: 'data-quality',
      topicTitle: 'Data Quality – Validation, Testing and Trust',
      objectiveIndex: 5,
      questions: [
        {
          question: "Which of the following is NOT one of the five core dimensions of data quality described in the content?",
          options: ["Accuracy", "Completeness", "Consistency", "Scalability"],
          correctIndex: 3,
          explanation: "The five dimensions of data quality are: accuracy (correctness), completeness (all expected records present), consistency (agreement across systems), timeliness (freshness), and uniqueness (no duplicates). Scalability is a system property, not a data quality dimension."
        },
        {
          question: "What is the difference between data quality testing and data quality monitoring?",
          options: [
            "Testing uses automated tools; monitoring is done manually",
            "Testing catches issues during pipeline execution; monitoring tracks quality metrics over time to detect gradual degradation",
            "Testing applies to raw data; monitoring applies to transformed data",
            "Testing is for developers; monitoring is for business users"
          ],
          correctIndex: 1,
          explanation: "Data quality tests run as part of pipeline execution to catch immediate failures. Monitoring observes quality metrics continuously over time, detecting trends like slowly increasing NULL rates or drifting row counts."
        },
        {
          question: "Why should data quality checks be added early in the pipeline rather than only at the end?",
          options: [
            "End-of-pipeline checks are technically not possible in most frameworks",
            "Bad data caught early is easier to trace to its source; bad data that reaches the end has already been transformed and is harder to diagnose",
            "Early checks improve pipeline execution speed",
            "End-of-pipeline checks require more compute resources"
          ],
          correctIndex: 1,
          explanation: "The earlier bad data is caught, the easier it is to identify the source and remediate. Data that passes through multiple transformation stages before being checked has lost its original context, making root cause analysis far harder."
        },
        {
          question: "What does Great Expectations provide for data engineering pipelines?",
          options: [
            "A SQL query optimiser for data warehouses",
            "An open-source framework for defining, running, and documenting data quality expectations against datasets",
            "A data cataloguing tool for discovering datasets across an organisation",
            "A CI/CD platform for deploying dbt transformations"
          ],
          correctIndex: 1,
          explanation: "Great Expectations is an open-source data quality framework. It allows teams to define expectations (e.g., column X is never null, values are within a range), run them against data, and generate documentation of the results."
        },
        {
          question: "A pipeline runs without errors but produces incorrect row counts. What does this illustrate about data quality?",
          options: [
            "Row count discrepancies are expected and acceptable",
            "Pipeline execution success (no runtime errors) does not guarantee that the output data is correct or complete",
            "The issue is in the source system, not the pipeline",
            "This is a scheduling problem, not a data quality problem"
          ],
          correctIndex: 1,
          explanation: "A pipeline can execute without throwing errors while producing logically incorrect results (wrong aggregations, missing rows, duplicates). Data quality checks must validate the output, not just confirm that the pipeline ran."
        },
        {
          question: "What is a 'data contract' in the context of data quality, and what problem does it solve?",
          options: [
            "A legal agreement between a data provider and a consumer organisation",
            "A formal specification of expected schema, semantics, and quality guarantees between a data producer and consumer, enabling early detection of breaking changes",
            "A database constraint like NOT NULL or UNIQUE applied at the table level",
            "A service-level agreement (SLA) that guarantees pipeline uptime"
          ],
          correctIndex: 1,
          explanation: "Data contracts define the interface between producers and consumers: expected columns, data types, allowed values, freshness guarantees, and ownership. When a producer breaks the contract (e.g., renames a column), automated validation catches it before downstream systems fail silently."
        },
        {
          question: "What is Great Expectations in the context of data quality, and how does it fit into a pipeline?",
          options: [
            "A Python library for generating synthetic test data",
            "A data validation framework that lets you define expectations (rules) about your data and run them as automated checks inside pipelines",
            "A monitoring dashboard for tracking pipeline execution times",
            "A SQL linter that checks query syntax before execution"
          ],
          correctIndex: 1,
          explanation: "Great Expectations allows data engineers to write declarative expectations (e.g., 'this column should never be NULL', 'row count should be within 10% of yesterday'). These expectations run as pipeline steps, failing the pipeline if data does not meet quality thresholds."
        }
      ]
    },
    {
      topicId: 'docker-containerising-pipelines',
      topicTitle: 'Docker – Containerising Data Pipelines',
      objectiveIndex: 6,
      questions: [
        {
          question: "What problem does Docker solve for data engineering pipelines?",
          options: [
            "It makes Python scripts run faster by compiling them to native code",
            "It packages an application and all its dependencies into a container that runs consistently across all environments",
            "It provides a managed database for storing pipeline metadata",
            "It automatically scales pipelines based on data volume"
          ],
          correctIndex: 1,
          explanation: "Docker eliminates the 'it works on my machine' problem by packaging code, dependencies, and configuration into a container image that runs identically in development, testing, and production."
        },
        {
          question: "What is the purpose of a `.dockerignore` file?",
          options: [
            "It lists Docker images that should not be pulled from Docker Hub",
            "It excludes specified files and directories from being included in the Docker build context",
            "It defines which containers are not allowed to communicate over the network",
            "It prevents certain Dockerfile instructions from being executed"
          ],
          correctIndex: 1,
          explanation: "The `.dockerignore` file tells Docker which files to exclude from the build context sent to the daemon. Without it, large directories like `.git`, `node_modules`, or test data are included, slowing builds and potentially leaking sensitive files."
        },
        {
          question: "Why should secrets (passwords, API keys) never be baked into a Docker image?",
          options: [
            "Docker images cannot store string values larger than 256 characters",
            "Secrets in image layers are visible in the image history and to anyone with access to the image",
            "Hardcoded secrets prevent Docker Compose from starting the container",
            "Docker automatically rotates secrets that are hardcoded in images"
          ],
          correctIndex: 1,
          explanation: "Docker image layers are immutable and their contents can be inspected with `docker history`. A secret baked into any layer is permanently exposed. Secrets should be injected at runtime via environment variables or a secrets manager."
        },
        {
          question: "What does a Docker volume provide?",
          options: [
            "Additional CPU allocation for compute-intensive containers",
            "Persistent storage that survives container restarts and deletions",
            "Network isolation between containers",
            "A shared memory space between multiple containers"
          ],
          correctIndex: 1,
          explanation: "Without a volume, data written inside a container is lost when the container stops or is removed. Volumes mount external storage into the container, persisting data across container lifecycle events."
        },
        {
          question: "What is the purpose of Docker Compose for data engineering?",
          options: [
            "To push Docker images to a container registry",
            "To define and run multi-container applications (e.g., database + Airflow + pipeline service) with a single command",
            "To compile Python scripts into Docker images automatically",
            "To monitor container resource usage in production"
          ],
          correctIndex: 1,
          explanation: "Docker Compose defines multi-container environments in a `compose.yaml` file. For data engineering, this enables local development environments with all dependencies (databases, Airflow, etc.) started with `docker compose up`."
        },
        {
          question: "What is the benefit of ordering Dockerfile instructions from least to most frequently changing?",
          options: [
            "Later instructions run faster due to CPU cache warm-up",
            "Docker caches layers — placing stable instructions (e.g., OS dependencies) early means they are reused across builds, speeding up rebuild times",
            "Containers start faster when instructions are in dependency order",
            "It prevents Docker from re-downloading the base image on each build"
          ],
          correctIndex: 1,
          explanation: "Docker builds images layer by layer and caches each layer. If a layer's instruction has not changed, Docker reuses the cached layer. Placing frequently changing instructions (e.g., COPY source code) after stable ones (e.g., RUN apt-get install) maximises cache reuse."
        },
        {
          question: "What is a multi-stage Docker build, and why is it useful for data engineering containers?",
          options: [
            "It builds the same image for multiple CPU architectures simultaneously",
            "It uses multiple FROM statements to separate build dependencies from the final runtime image, producing smaller and more secure containers",
            "It runs multiple containers in sequence as part of a pipeline",
            "It builds the image in stages across multiple CI/CD pipeline steps"
          ],
          correctIndex: 1,
          explanation: "Multi-stage builds use a first stage to install compilers, build tools, and compile dependencies, then copy only the final artefacts into a slim runtime image. This keeps the production container small (no build tools) and reduces the attack surface."
        }
      ]
    },
    {
      topicId: 'advanced-sql',
      topicTitle: 'Advanced SQL – Window Functions, CTEs and Performance',
      objectiveIndex: 7,
      questions: [
        {
          question: "What is the key difference between `PARTITION BY` in a window function and `GROUP BY`?",
          options: [
            "PARTITION BY uses indexes; GROUP BY does not",
            "PARTITION BY defines groups for window calculation without collapsing rows; GROUP BY collapses each group into a single output row",
            "PARTITION BY is for string columns; GROUP BY is for numeric columns",
            "PARTITION BY requires an ORDER BY clause; GROUP BY does not"
          ],
          correctIndex: 1,
          explanation: "`GROUP BY` aggregates rows into one row per group. `PARTITION BY` in a window function divides rows into partitions for calculation but keeps every individual row in the result — allowing both the row detail and the windowed aggregate to appear together."
        },
        {
          question: "What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` when there are ties?",
          options: [
            "They are identical — all three produce sequential numbers",
            "ROW_NUMBER() is always unique; RANK() leaves gaps after ties; DENSE_RANK() has no gaps after ties",
            "ROW_NUMBER() leaves gaps; RANK() and DENSE_RANK() are identical",
            "DENSE_RANK() resets to 1 for each partition; RANK() does not"
          ],
          correctIndex: 1,
          explanation: "For rows with equal values: ROW_NUMBER() assigns unique numbers regardless of ties. RANK() assigns the same number to ties but skips subsequent numbers (1,1,3). DENSE_RANK() assigns the same number to ties without skipping (1,1,2)."
        },
        {
          question: "What SQL command is used to view a query's execution plan without running the full query?",
          options: ["DESCRIBE", "EXPLAIN", "ANALYSE", "PROFILE"],
          correctIndex: 1,
          explanation: "`EXPLAIN` (or `EXPLAIN ANALYZE` in PostgreSQL) shows the query execution plan — how the database will retrieve data, which indexes it will use, and where the cost lies. This is essential for diagnosing slow queries."
        },
        {
          question: "Which pattern is more efficient for deduplication: a correlated subquery or a window function?",
          options: [
            "Correlated subqueries are always more efficient because they stop as soon as a match is found",
            "Window functions are generally more efficient because they scan the table once and calculate row numbers in a single pass",
            "Both are equivalent; choose based on readability",
            "Correlated subqueries use indexes; window functions do not"
          ],
          correctIndex: 1,
          explanation: "Correlated subqueries execute once per row in the outer query, scaling poorly. Window functions (e.g., ROW_NUMBER() OVER (PARTITION BY ...)) compute rankings in a single table scan, making them far more efficient at scale."
        },
        {
          question: "What does the `LAG()` window function return?",
          options: [
            "The running total up to and including the current row",
            "The value of a column from a preceding row within the partition",
            "The difference between the current row and the next row",
            "The rank of the current row within its partition"
          ],
          correctIndex: 1,
          explanation: "`LAG(column, n)` returns the value of the specified column from n rows before the current row within the partition. It is commonly used to compare a row with a previous period (e.g., comparing this month's revenue to last month's)."
        },
        {
          question: "What is a recursive CTE and when would a data engineer use one?",
          options: [
            "A CTE that references a temporary table created in a previous query",
            "A CTE that references itself to traverse hierarchical or graph-like data such as organisational trees or bill-of-materials structures",
            "A CTE that automatically retries failed queries until they succeed",
            "A CTE that is cached in memory for repeated use within the same session"
          ],
          correctIndex: 1,
          explanation: "A recursive CTE has an anchor member (base case) and a recursive member that references the CTE itself. Each iteration processes the next level of the hierarchy until no new rows are produced. It is essential for querying tree structures like manager-employee relationships or category hierarchies."
        }
      ]
    }
  ],
  senior: [
    {
      topicId: 'streaming-and-apache-kafka',
      topicTitle: 'Streaming and Apache Kafka – Real-Time Data Pipelines',
      objectiveIndex: 0,
      questions: [
        {
          question: "What is the unit of parallelism within a Kafka topic?",
          options: ["Topic", "Partition", "Consumer group", "Broker"],
          correctIndex: 1,
          explanation: "Partitions are the unit of parallelism in Kafka. A topic is divided into partitions, and each partition can be consumed independently by one consumer in a consumer group, enabling parallel processing."
        },
        {
          question: "In a Kafka consumer group, how are partitions assigned to consumers?",
          options: [
            "Each consumer reads from all partitions simultaneously",
            "Each partition is assigned to exactly one consumer in the group; Kafka rebalances when consumers join or leave",
            "Partitions are assigned randomly to consumers on each read",
            "The first consumer to connect receives all partitions"
          ],
          correctIndex: 1,
          explanation: "Kafka guarantees that each partition in a topic is consumed by exactly one consumer within a group. This enables parallel processing while preserving ordering within partitions. Kafka automatically rebalances assignments when the group membership changes."
        },
        {
          question: "What are the three delivery semantics in Kafka and what do they mean?",
          options: [
            "Fast, medium, slow — describing consumer read speed",
            "At-least-once (possible duplicates), at-most-once (possible data loss), exactly-once (no duplicates, no loss)",
            "Push, pull, and subscribe — describing how consumers receive data",
            "Sync, async, and batch — describing producer write modes"
          ],
          correctIndex: 1,
          explanation: "At-least-once guarantees delivery but may produce duplicates on retry. At-most-once avoids duplicates but may lose messages on failure. Exactly-once is the strongest guarantee with no duplicates and no loss, but at higher complexity and cost."
        },
        {
          question: "What is the purpose of a schema registry in a Kafka architecture?",
          options: [
            "To store Kafka broker configuration and topic metadata",
            "To enforce compatibility between producers and consumers by centralising event schema definitions (Avro, Protobuf)",
            "To register consumer groups and track their offsets",
            "To manage Kafka connector configurations"
          ],
          correctIndex: 1,
          explanation: "A schema registry (e.g., Confluent Schema Registry) stores event schemas and enforces compatibility rules. This prevents producers from publishing schema changes that break existing consumers — a critical safeguard in large organisations."
        },
        {
          question: "What is Kafka Connect used for?",
          options: [
            "Connecting Kafka brokers in a multi-region cluster",
            "Streaming data between Kafka and external systems (databases, cloud storage) without writing custom consumer/producer code",
            "Connecting Kafka to Kubernetes for container orchestration",
            "Establishing TLS connections between producers and brokers"
          ],
          correctIndex: 1,
          explanation: "Kafka Connect provides a framework of pre-built connectors for integrating Kafka with external systems — databases (via Debezium), cloud storage, search indexes, and more. This eliminates the need to write custom producer/consumer code for common integrations."
        },
        {
          question: "What is the consequence of using Kafka as a database for random-access queries?",
          options: [
            "Kafka's consumer API is optimised for random access, making this an acceptable use case",
            "Kafka is a log, not a query engine — it lacks indexes and is designed for sequential reads, making random access extremely inefficient",
            "Using Kafka as a database causes partition rebalancing on every query",
            "Kafka's retention policy will delete query results before they can be read"
          ],
          correctIndex: 1,
          explanation: "Kafka is designed as an ordered, append-only log optimised for sequential reads. It has no indexing for random access. Queries that need to find specific records by key require a purpose-built storage system like a database or search index."
        },
        {
          question: "How does Azure Event Hubs relate to Apache Kafka?",
          options: [
            "Event Hubs is Microsoft's competitor to Kafka with an incompatible API",
            "Event Hubs is a Kafka-compatible managed service in Azure that can serve as a drop-in alternative",
            "Event Hubs is a wrapper around Kafka that adds Azure Active Directory authentication",
            "Event Hubs and Kafka are identical products rebranded for different clouds"
          ],
          correctIndex: 1,
          explanation: "Azure Event Hubs provides a Kafka-compatible endpoint, meaning Kafka clients (producers, consumers, Kafka Connect) can connect to Event Hubs without code changes. It offers a managed alternative to running your own Kafka cluster in Azure."
        },
        {
          question: "What is a Kafka consumer group, and how does it enable parallel processing of a topic?",
          options: [
            "A security group that controls which consumers can access a topic",
            "A set of consumers that jointly read from a topic — each partition is assigned to exactly one consumer in the group, enabling parallel processing",
            "A feature that groups related messages together before delivering them to a consumer",
            "A monitoring dashboard that tracks consumer lag across topics"
          ],
          correctIndex: 1,
          explanation: "Within a consumer group, Kafka assigns each partition to exactly one consumer. If a topic has 12 partitions and the group has 4 consumers, each consumer reads from 3 partitions. Adding consumers (up to the partition count) increases parallelism linearly."
        }
      ]
    },
    {
      topicId: 'lakehouse-architecture',
      topicTitle: 'Lakehouse Architecture – Unifying the Data Warehouse and Data Lake',
      objectiveIndex: 1,
      questions: [
        {
          question: "What problem does the lakehouse architecture solve compared to maintaining a separate data lake and data warehouse?",
          options: [
            "It eliminates the need for SQL in analytical workloads",
            "It removes data duplication, complex ETL between the two systems, and inconsistency from having the same data in different forms in different places",
            "It reduces cloud storage costs by compressing all data automatically",
            "It allows unstructured data to be queried with SQL without any schema definition"
          ],
          correctIndex: 1,
          explanation: "Traditional dual-architecture organisations maintained a data lake for raw data and a warehouse for curated data, requiring ETL between them and accepting data duplication. The lakehouse combines reliability of warehouses with the scalability and openness of lakes."
        },
        {
          question: "What is the Medallion Architecture in the context of a lakehouse?",
          options: [
            "A security model with gold, silver, and bronze access tiers",
            "A layered data organisation pattern: Bronze (raw ingested data), Silver (cleaned/conformed), Gold (aggregated, business-ready)",
            "A Databricks-specific billing tier for compute resources",
            "A data quality scoring system for rating dataset reliability"
          ],
          correctIndex: 1,
          explanation: "The Medallion Architecture organises lakehouse data into Bronze (raw source data), Silver (cleaned and conformed data), and Gold (aggregated, business-ready data) layers. Each layer adds increasing data quality and specificity."
        },
        {
          question: "What is the key innovation that table formats (Delta Lake, Iceberg, Hudi) add on top of plain Parquet files?",
          options: [
            "Better compression than native Parquet encoding",
            "ACID transactions, time travel, schema enforcement, and efficient upserts — making the data lake reliable like a warehouse",
            "The ability to store unstructured data like images and audio",
            "Native SQL query execution without requiring a compute engine"
          ],
          correctIndex: 1,
          explanation: "Plain Parquet files on cloud storage are just files — they have no transaction semantics, no way to roll back, and concurrent writes can corrupt data. Table formats add a transaction log that provides ACID guarantees, time travel, and schema enforcement."
        },
        {
          question: "What does 'separation of storage and compute' mean in a lakehouse architecture?",
          options: [
            "Data is stored in RAM (compute); indexes are stored on disk (storage)",
            "Data lives in cheap cloud object storage; compute engines are provisioned and scaled independently of where the data lives",
            "Storage is managed by a separate team from the engineers who write queries",
            "SQL compute handles storage; Spark handles the analytical compute layer"
          ],
          correctIndex: 1,
          explanation: "In a lakehouse, data is stored in cloud object storage (Azure Data Lake, S3) which is cheap and virtually unlimited. Compute engines (Spark, Synapse, Databricks SQL) are separate and can be scaled up, down, or shut off independently."
        },
        {
          question: "What is Parquet's key advantage over CSV for analytical workloads?",
          options: [
            "Parquet is human-readable, making debugging easier",
            "Parquet is columnar and compressed — query engines read only the columns needed, dramatically reducing I/O",
            "Parquet supports embedded JSON for semi-structured data",
            "Parquet files can be directly edited in text editors"
          ],
          correctIndex: 1,
          explanation: "Parquet stores data by column rather than by row. Analytical queries that touch only a few columns (e.g., SELECT revenue, region FROM ...) only read those columns from disk, ignoring the rest. Combined with efficient compression, this makes Parquet far faster than CSV for analytical workloads."
        },
        {
          question: "How do open table formats like Delta Lake, Apache Iceberg, and Apache Hudi prevent vendor lock-in in a lakehouse?",
          options: [
            "They use proprietary APIs that all cloud vendors have agreed to support",
            "They store data in open file formats (Parquet) with metadata layers, allowing any compatible engine to read and write without being tied to one vendor's platform",
            "They replicate data across multiple cloud providers automatically",
            "They encrypt data so that only open-source tools can decrypt it"
          ],
          correctIndex: 1,
          explanation: "Open table formats store data as Parquet files in object storage with an open metadata layer. Any engine that understands the format (Spark, Trino, Flink, DuckDB) can read and write the data, preventing dependence on a single vendor's proprietary storage."
        },
        {
          question: "What role does a metastore (such as Unity Catalog or Hive Metastore) play in a lakehouse architecture?",
          options: [
            "It stores the actual data files in a compressed format",
            "It provides a centralised catalog of table metadata — schema definitions, file locations, access controls, and lineage — enabling multiple engines to discover and query the same tables",
            "It replaces the need for a query engine by executing SQL directly",
            "It monitors query performance and automatically tunes cluster resources"
          ],
          correctIndex: 1,
          explanation: "A metastore acts as the central registry for all lakehouse tables. It maps logical table names to physical file locations, stores schema information, enforces access policies, and provides a shared catalog so different engines (Spark, SQL, BI tools) all see the same tables."
        }
      ]
    },
    {
      topicId: 'delta-lake',
      topicTitle: 'Delta Lake – Reliable Data Storage at Scale',
      objectiveIndex: 2,
      questions: [
        {
          question: "What is the Delta Lake transaction log (`_delta_log/`) and what role does it play?",
          options: [
            "A directory of Parquet files that stores a backup of the table",
            "A sequence of JSON commit files recording every change to the table; it is the source of truth for the table's current and historical state",
            "A configuration file that stores the table's schema definition",
            "A cache directory that speeds up frequently accessed partitions"
          ],
          correctIndex: 1,
          explanation: "Every write to a Delta table creates a new JSON commit file in `_delta_log/`. The log records exactly what changed in each commit. Delta Lake reads this log to determine the current state of the table and to reconstruct historical versions."
        },
        {
          question: "How does Delta Lake's time travel feature work?",
          options: [
            "It creates snapshots of the table on a fixed schedule",
            "It allows querying historical versions of a table by version number or timestamp, using the transaction log to reconstruct the table's state at that point",
            "It rewinds all changes made within the last 24 hours",
            "It creates a copy of the table before any MERGE operation"
          ],
          correctIndex: 1,
          explanation: "Delta Lake's transaction log records every change as a versioned commit. Time travel queries (`VERSION AS OF 5` or `TIMESTAMP AS OF '2024-01-01'`) use this log to reconstruct the exact state of the table at that point in time."
        },
        {
          question: "What does the `MERGE INTO` command in Delta Lake do?",
          options: [
            "Merges two Delta Lake tables into a single table permanently",
            "Performs an upsert — matching rows between source and target to insert new rows, update changed rows, or delete removed rows in one atomic transaction",
            "Merges multiple small Parquet files into larger files for performance",
            "Merges schema changes from a staging table into the production table schema"
          ],
          correctIndex: 1,
          explanation: "`MERGE INTO` is Delta Lake's upsert command. It matches source rows to target rows on a condition and applies conditional logic (INSERT when no match, UPDATE when matched, DELETE when matched with a condition) atomically."
        },
        {
          question: "What is the purpose of running `OPTIMIZE` on a Delta Lake table?",
          options: [
            "To update table statistics for the query planner",
            "To compact many small files into fewer larger files, improving read performance",
            "To rebuild the transaction log after corruption",
            "To enforce the table's schema against new incoming data"
          ],
          correctIndex: 1,
          explanation: "Frequent small writes (e.g., streaming micro-batches) produce many small Parquet files. `OPTIMIZE` compacts these into fewer, larger files. ZORDER can be combined with OPTIMIZE to co-locate related data by commonly filtered columns."
        },
        {
          question: "What does the `VACUUM` command do in Delta Lake and why is it needed?",
          options: [
            "It removes duplicate rows from the table",
            "It deletes old data files no longer referenced by the transaction log, preventing indefinite storage growth from time travel history",
            "It rebuilds indexes on the Delta table for faster queries",
            "It compresses the transaction log to reduce metadata overhead"
          ],
          correctIndex: 1,
          explanation: "Time travel retains old versions of data files. Without `VACUUM`, these files accumulate indefinitely. `VACUUM` deletes files older than the configured retention period (default 7 days), freeing storage while preserving the configured history window."
        },
        {
          question: "What is schema enforcement in Delta Lake, and how does it differ from schema evolution?",
          options: [
            "Schema enforcement validates data types at read time; schema evolution validates at write time",
            "Schema enforcement rejects writes that do not match the table's schema; schema evolution allows the schema to change automatically when new columns appear in incoming data",
            "Schema enforcement is for batch loads; schema evolution is for streaming loads",
            "They are the same feature with different names in different Delta Lake versions"
          ],
          correctIndex: 1,
          explanation: "Schema enforcement (schema on write) rejects data that does not match the table's current schema, preventing accidental corruption. Schema evolution (`mergeSchema` option) allows controlled addition of new columns when the incoming data has extra fields, enabling the schema to grow safely over time."
        },
        {
          question: "What is Z-Ordering in Delta Lake, and how does it improve query performance?",
          options: [
            "It sorts data alphabetically by table name for easier cataloguing",
            "It co-locates related data within the same files by the specified columns, allowing the query engine to skip files that do not contain matching values",
            "It compresses files using a Z-algorithm for better storage efficiency",
            "It creates secondary indexes on the specified columns"
          ],
          correctIndex: 1,
          explanation: "Z-Ordering rearranges data within files so that rows with similar values in the Z-Ordered columns are physically close together. Combined with Delta Lake's file-level statistics, the query engine can skip entire files that do not contain relevant values, dramatically reducing I/O for filtered queries."
        }
      ]
    },
    {
      topicId: 'data-mesh',
      topicTitle: 'Data Mesh – Decentralised Data Architecture',
      objectiveIndex: 3,
      questions: [
        {
          question: "What are the four principles of Data Mesh as proposed by Zhamak Dehghani?",
          options: [
            "Centralisation, standardisation, automation, and monitoring",
            "Domain ownership, data as a product, self-serve data platform, and federated computational governance",
            "Decentralisation, open source, cloud-native, and real-time processing",
            "Data lake, data warehouse, streaming, and governance"
          ],
          correctIndex: 1,
          explanation: "Data Mesh is built on four principles: domain ownership (domains own their data), data as a product (data has owners, SLAs, and documentation), self-serve platform (central team provides infrastructure tooling), and federated governance (policies defined centrally, enforced by the platform)."
        },
        {
          question: "What problem does Data Mesh solve that traditional centralised data architectures struggle with?",
          options: [
            "The high cost of cloud data storage",
            "The central data team bottleneck — it cannot keep up with all domains' needs, domain knowledge is lost in translation, and data quality suffers",
            "The inability of SQL to handle unstructured data",
            "The latency of batch ETL pipelines"
          ],
          correctIndex: 1,
          explanation: "In centralised architectures, a single team must ingest and serve data for all domains. This creates a bottleneck, slows delivery, and separates data ownership from domain knowledge. Data Mesh moves ownership to the teams who best understand the data."
        },
        {
          question: "In Data Mesh, what does 'data as a product' mean?",
          options: [
            "Selling data to external customers as a revenue stream",
            "Treating each domain's data output with the same rigour as a customer-facing product — with an owner, SLA, documentation, schema, and quality guarantees",
            "Packaging data into commercial database products",
            "Converting raw data into a standardised product catalogue format"
          ],
          correctIndex: 1,
          explanation: "'Data as a product' means domain teams take responsibility for their data the same way software teams own their APIs — with clear ownership, defined quality standards, documentation, and SLAs for consumers."
        },
        {
          question: "What is a 'data contract' in the context of Data Mesh?",
          options: [
            "A legal agreement between the organisation and its data vendors",
            "An explicit agreement between data producers and consumers about the schema, semantics, and quality of a data product",
            "A configuration file that defines data pipeline schedules",
            "A regulatory document required for GDPR compliance"
          ],
          correctIndex: 1,
          explanation: "Data contracts formalise the interface between data producers and consumers. They specify the schema, data types, quality standards, and SLAs. Breaking a contract is a signal to negotiate and version the interface, similar to API versioning."
        },
        {
          question: "What is the role of federated computational governance in Data Mesh?",
          options: [
            "Each domain independently defines its own governance policies without central oversight",
            "Policies (naming conventions, security standards, privacy rules) are defined centrally but enforced automatically through the platform rather than manually by a central team",
            "A committee of domain representatives votes on governance decisions",
            "Governance is outsourced to an external compliance vendor"
          ],
          correctIndex: 1,
          explanation: "Federated governance balances domain autonomy with organisational consistency. Central policy teams define standards (e.g., PII handling, naming conventions), but enforcement is automated via the self-serve platform, eliminating manual gatekeeping."
        },
        {
          question: "What is a 'data product' in Data Mesh, and what qualities must it have?",
          options: [
            "A commercial SaaS tool used by domain teams for analytics",
            "A domain-owned dataset that is discoverable, addressable, trustworthy, self-describing, and governed — treated as a product with its consumers as customers",
            "A pre-built machine learning model that domains can deploy without modification",
            "A data pipeline that produces output consumed only within the owning domain"
          ],
          correctIndex: 1,
          explanation: "A data product is the core unit of Data Mesh. It must be discoverable (catalogued), addressable (stable access endpoint), trustworthy (with SLAs and quality guarantees), self-describing (documented schema and semantics), and interoperable (adhering to organisational standards). Domain teams own them end-to-end."
        },
        {
          question: "What is 'domain-oriented data ownership' in Data Mesh, and how does it change the data engineer's role?",
          options: [
            "A single central data team owns all data assets but delegates query access to domains",
            "Each business domain owns, produces, and maintains its own data products — data engineers embed within domains rather than sitting in a centralised team",
            "Domain ownership means business analysts write their own pipelines without engineering support",
            "Domains own the data catalog entries but a central team owns the actual data infrastructure"
          ],
          correctIndex: 1,
          explanation: "Domain-oriented ownership shifts data responsibility from a central team to the domains that generate and understand the data best. Data engineers work within domain teams, building and maintaining data products with deep business context rather than acting as a shared service fulfilling tickets from all domains."
        }
      ]
    },
    {
      topicId: 'dataops-cicd',
      topicTitle: 'DataOps – CI/CD and Engineering Practices for Data',
      objectiveIndex: 4,
      questions: [
        {
          question: "What does DataOps apply to data engineering, and what is its goal?",
          options: [
            "DataOps applies machine learning techniques to automate data pipeline development",
            "DataOps applies DevOps principles (version control, CI/CD, testing, monitoring) to data pipelines, making them reliable and rapidly deployable",
            "DataOps applies database administration practices to cloud data services",
            "DataOps applies agile project management to data engineering team organisation"
          ],
          correctIndex: 1,
          explanation: "DataOps brings DevOps engineering discipline to data pipelines. Pipeline code is version-controlled, changes are reviewed and tested in CI, deployments are automated via CD, and production is monitored — just like application code."
        },
        {
          question: "What does 'data observability' monitor in a DataOps practice?",
          options: [
            "The CPU and memory usage of data pipeline compute clusters",
            "Data freshness, volume, schema changes, and quality — detecting when data deviates from expected behaviour",
            "User access logs to identify unauthorised data queries",
            "Network latency between data sources and the data warehouse"
          ],
          correctIndex: 1,
          explanation: "Data observability monitors the health of data itself — whether it arrived on time (freshness), whether the expected volume is present, whether the schema has changed unexpectedly, and whether values meet quality expectations."
        },
        {
          question: "Why is monitoring only pipeline execution status (success/failure) insufficient in DataOps?",
          options: [
            "Execution status monitoring is too expensive to implement at scale",
            "A pipeline can execute successfully while producing incorrect, incomplete, or stale data — data quality must also be monitored",
            "Execution status is already captured by cloud infrastructure monitoring",
            "Success/failure status does not provide enough detail for debugging"
          ],
          correctIndex: 1,
          explanation: "A pipeline that finishes without exceptions has only proved it ran — not that it produced correct data. DataOps requires monitoring data quality metrics (row counts, NULL rates, value distributions) separately from execution status."
        },
        {
          question: "What is 'infrastructure as code' in a DataOps context?",
          options: [
            "Writing data transformation logic in Python instead of SQL",
            "Defining data platform infrastructure (storage, clusters, databases) in code (Terraform/Bicep) for reproducibility, version control, and auditability",
            "Auto-generating pipeline code from infrastructure diagrams",
            "Storing infrastructure passwords in a code repository"
          ],
          correctIndex: 1,
          explanation: "Infrastructure as code (IaC) means defining cloud resources in files (Terraform, Bicep) that are stored in Git, reviewed via pull requests, and deployed through CI/CD. This makes environments reproducible and changes auditable."
        },
        {
          question: "What is the risk of applying CI/CD to application code but NOT to data pipeline code?",
          options: [
            "It creates compliance issues because all code must be treated equally",
            "It creates a two-tier system where data pipelines are deployed manually, tested ad hoc, and are less reliable than application code",
            "It forces data engineers to use the same deployment tools as software engineers",
            "It makes data pipeline deployments faster than application deployments"
          ],
          correctIndex: 1,
          explanation: "When data pipelines lack CI/CD, changes are deployed manually (error-prone), tests are run inconsistently (if at all), and rollbacks are difficult. This creates lower reliability for the data platform compared to application software in the same organisation."
        },
        {
          question: "What is a 'data pipeline integration test' in a DataOps CI pipeline, and why is it harder than a typical application unit test?",
          options: [
            "It tests that the pipeline code compiles without errors",
            "It runs the pipeline against a representative test dataset and validates output correctness — harder because it requires test data, target infrastructure, and idempotent execution",
            "It checks that the pipeline's YAML configuration follows a naming convention",
            "It verifies that the pipeline's dependencies are pinned to exact versions"
          ],
          correctIndex: 1,
          explanation: "Unlike stateless application unit tests, data pipeline integration tests require realistic input data, a target database or storage to write to, and deterministic validation of the output. Managing test fixtures and ensuring tests are idempotent (repeatable) adds significant complexity."
        }
      ]
    },
    {
      topicId: 'genai-for-data-engineering',
      topicTitle: 'GenAI for Data Engineering – AI-Assisted Development and Architecture',
      objectiveIndex: 5,
      questions: [
        {
          question: "What is a RAG (Retrieval-Augmented Generation) architecture and what is the data engineer's role in building it?",
          options: [
            "RAG is a Spark optimisation technique; data engineers configure cluster settings",
            "RAG grounds LLM responses in retrieved documents; data engineers build the embedding pipeline, vector database, and retrieval infrastructure",
            "RAG is a data quality framework; data engineers define retrieval rules for bad records",
            "RAG is an Airflow DAG pattern; data engineers write the retrieval operators"
          ],
          correctIndex: 1,
          explanation: "RAG architectures retrieve relevant documents to ground LLM responses in factual content. Data engineers build the pipeline that generates embeddings, stores them in a vector database, and serves them to the retrieval layer."
        },
        {
          question: "What is a vector database used for in AI data pipelines?",
          options: [
            "Storing pipeline metadata as multi-dimensional matrices",
            "Storing dense numerical embeddings (vector representations of text) and enabling similarity search across them",
            "Executing SQL queries on geospatial data",
            "Caching LLM responses to reduce API call costs"
          ],
          correctIndex: 1,
          explanation: "Embeddings are dense numerical representations of text generated by embedding models. Vector databases (Pinecone, Weaviate, Azure AI Search) index these vectors and support similarity search — finding the most semantically similar content to a query."
        },
        {
          question: "Why must AI-generated SQL and pipeline code always be reviewed and tested before deployment?",
          options: [
            "AI tools are not licensed for production use without review",
            "LLMs produce plausible-looking but potentially incorrect code — subtle join, aggregation, or filter errors may produce wrong results without runtime errors",
            "AI-generated code uses deprecated APIs that need to be updated",
            "Review is required only for compliance, not for correctness"
          ],
          correctIndex: 1,
          explanation: "LLMs are trained to produce syntactically correct, plausible-looking code. However, they can make subtle logical errors (wrong join conditions, off-by-one in date ranges, incorrect aggregation groupings) that produce incorrect data without throwing any errors."
        },
        {
          question: "According to the content, for which tasks are AI tools POORLY suited in data engineering?",
          options: [
            "Writing data quality tests and generating documentation",
            "Designing data models and writing security-sensitive data handling code without thorough review",
            "Generating dbt model boilerplate and translating between SQL dialects",
            "Explaining complex queries and writing Airflow DAG definitions"
          ],
          correctIndex: 1,
          explanation: "AI tools lack knowledge of your specific business domain and production data characteristics. Data model design requires deep business understanding. Security-sensitive code requires careful review AI cannot substitute for."
        },
        {
          question: "What data privacy rule applies when using AI assistants for data engineering tasks?",
          options: [
            "All data can be shared with AI tools if the vendor has signed a data processing agreement",
            "Do not paste production data, customer records, or sensitive business data into AI assistants — follow the organisation's AI Policy for approved tools",
            "AI tools may only process data that has already been anonymised",
            "Data privacy rules do not apply to AI tools used for development purposes"
          ],
          correctIndex: 1,
          explanation: "AI assistant inputs may be used for model training or logged by the vendor. Pasting production customer data, PII, or sensitive business data into an external AI tool risks regulatory violations and data breaches."
        },
        {
          question: "How can a data engineer use GenAI to accelerate data pipeline documentation, and what risk must be mitigated?",
          options: [
            "GenAI can auto-generate complete architecture diagrams; no risks as diagrams are always accurate",
            "GenAI can draft column descriptions, lineage summaries, and README files from code context, but outputs must be reviewed for accuracy because the model may hallucinate business logic it has not seen",
            "GenAI can replace the need for documentation by making code self-explanatory",
            "GenAI can generate documentation only for Python pipelines, not SQL-based ones"
          ],
          correctIndex: 1,
          explanation: "GenAI excels at generating first drafts of documentation from code: column descriptions, transformation logic summaries, and onboarding guides. However, it may invent plausible but incorrect business context, so human review is essential to ensure accuracy."
        }
      ]
    },
    {
      topicId: 'data-governance-and-gdpr',
      topicTitle: 'Data Governance and GDPR – Compliance-Driven Pipeline Design',
      objectiveIndex: 6,
      questions: [
        {
          question: "What is the GDPR principle of 'data minimisation' and how does it affect pipeline design?",
          options: [
            "Pipelines should use as little compute as possible to minimise costs",
            "Only collect and process personal data strictly necessary for the stated purpose — pipelines must not carry forward fields 'just in case'",
            "Data should be compressed to minimise storage footprint",
            "Pipelines should process the minimum number of records per run to avoid overloading source systems"
          ],
          correctIndex: 1,
          explanation: "Data minimisation requires that every personal data field in a pipeline has a documented, lawful purpose. Carrying forward personal data 'in case it's useful later' is a GDPR violation — pipelines must be deliberately scoped."
        },
        {
          question: "What does 'purpose limitation' under GDPR require of data engineering pipelines?",
          options: [
            "Pipelines must complete within a defined time limit",
            "Personal data collected for one purpose cannot be reused for a different purpose without consent — a marketing pipeline must not access claims health data",
            "Pipeline code must be limited in complexity to allow regulatory review",
            "Data must be stored in purpose-built systems rather than general-purpose data lakes"
          ],
          correctIndex: 1,
          explanation: "Purpose limitation means data collected for a specific reason cannot be repurposed without the data subject's knowledge and consent. Engineers must design access controls so pipelines can only access data relevant to their stated purpose."
        },
        {
          question: "Why is implementing the 'right to erasure' (right to be forgotten) particularly challenging in data lake and Delta Lake architectures?",
          options: [
            "Data lakes use proprietary formats that cannot be modified once written",
            "Append-only systems like data lakes accumulate data across many files, and Delta Lake's time travel history also holds copies — deletion requires tracking every location where personal data exists",
            "GDPR erasure only applies to operational databases, not analytical systems",
            "Deletion from large datasets is computationally impossible within the GDPR's 30-day deadline"
          ],
          correctIndex: 1,
          explanation: "Data lakes append files rather than update in place. A single person's data may exist in raw files, transformed layers, and Delta Lake time travel snapshots. Engineers must design data lineage tracking to find all copies and purge them, including expiring time travel history."
        },
        {
          question: "What is the difference between pseudonymised and anonymised data under GDPR?",
          options: [
            "They are legally equivalent — both are exempt from GDPR requirements",
            "Pseudonymised data can be re-linked to an individual (still personal data under GDPR); anonymised data cannot be re-identified (not personal data)",
            "Pseudonymised data uses encryption; anonymised data uses hashing",
            "Pseudonymisation removes names only; anonymisation removes all identifiers"
          ],
          correctIndex: 1,
          explanation: "Pseudonymisation replaces direct identifiers with tokens but keeps a mapping that allows re-identification — it remains personal data under GDPR. True anonymisation makes re-identification practically impossible, placing the data outside GDPR's scope."
        },
        {
          question: "What does Microsoft Purview provide for data governance in Azure?",
          options: [
            "A managed Kafka service for streaming personal data securely",
            "A unified data catalog for discovering and classifying data, automated sensitive data scanning, data lineage tracking, and policy management",
            "A GDPR compliance certification that covers all data processed in Azure",
            "An encryption service for securing data at rest and in transit"
          ],
          correctIndex: 1,
          explanation: "Microsoft Purview provides the governance tooling layer in Azure: cataloguing what data exists and where it lives, automatically scanning for sensitive data, tracking lineage through transformations, and managing access policies."
        },
        {
          question: "What are the maximum GDPR fines for non-compliance?",
          options: [
            "Up to €1 million or 1% of global annual turnover",
            "Up to €20 million or 4% of global annual turnover, whichever is higher",
            "A fixed fine of €500,000 per violation",
            "Fines are determined by each EU member state independently with no defined maximum"
          ],
          correctIndex: 1,
          explanation: "GDPR's maximum penalties are €20 million or 4% of global annual turnover (whichever is greater) for the most serious violations. For a large organisation, 4% of global turnover can far exceed €20 million."
        },
        {
          question: "What is a Data Protection Impact Assessment (DPIA), and when is it required under GDPR?",
          options: [
            "A quarterly report on data storage costs submitted to the data protection authority",
            "A mandatory assessment required before processing that is likely to result in high risk to individuals — it identifies risks and mitigation measures for new data processing activities",
            "A technical audit of database encryption performed by an external vendor",
            "A self-certification form that data engineers sign before accessing production data"
          ],
          correctIndex: 1,
          explanation: "A DPIA is required under Article 35 of GDPR when processing is likely to result in high risk to individuals (e.g., large-scale profiling, systematic monitoring, processing sensitive categories). It documents the processing purpose, necessity, risks, and safeguards — and must be completed before processing begins."
        }
      ]
    },
    {
      topicId: 'change-data-capture',
      topicTitle: 'Change Data Capture (CDC) – Real-Time Data Synchronisation',
      objectiveIndex: 6,
      questions: [
        {
          question: "What is the key advantage of CDC over traditional batch ETL for data synchronisation?",
          options: [
            "CDC requires less storage than batch ETL",
            "CDC captures only inserts, updates, and deletes as they happen — reducing data latency from hours to seconds/minutes and avoiding full table scans",
            "CDC supports more data formats than batch ETL",
            "CDC is easier to implement than batch ETL pipelines"
          ],
          correctIndex: 1,
          explanation: "Batch ETL polls the source at intervals, introducing hours of latency and requiring full or incremental scans. CDC reads the database transaction log and streams changes as they occur, providing near-real-time data with minimal source load."
        },
        {
          question: "How does Debezium implement log-based CDC?",
          options: [
            "It polls source tables on a schedule and compares with a watermark timestamp",
            "It reads the database transaction log (WAL in PostgreSQL, binlog in MySQL) and streams change events to Kafka without modifying the source application",
            "It installs database triggers that capture changes and write them to a staging table",
            "It makes periodic full snapshots and computes the diff between successive snapshots"
          ],
          correctIndex: 1,
          explanation: "Log-based CDC (Debezium's approach) reads the database's write-ahead log — which records every committed change — and publishes those changes as events to Kafka. It is non-invasive (no triggers, no schema changes) and captures all changes including deletes."
        },
        {
          question: "What information does a typical CDC event contain?",
          options: [
            "Only the new state of the row after the change",
            "The operation type (insert/update/delete), the before and after state of the row, a timestamp, and transaction metadata",
            "A diff showing which bytes in the row changed",
            "Only the primary key of the changed row and the timestamp"
          ],
          correctIndex: 1,
          explanation: "A CDC event carries the full context of the change: what operation occurred, the complete row state before the change, the complete row state after the change, and metadata like timestamp and transaction ID. This enables downstream systems to apply changes accurately."
        },
        {
          question: "What is the purpose of an 'initial snapshot' in Debezium CDC setup?",
          options: [
            "To test the CDC connection before switching to live streaming",
            "To capture the full existing dataset before switching to log-based streaming, ensuring downstream systems start with complete data",
            "To create a backup of the source database before CDC begins",
            "To measure baseline performance of the source database before adding CDC overhead"
          ],
          correctIndex: 1,
          explanation: "When CDC is first configured, the transaction log only contains recent changes. Debezium performs an initial snapshot — a consistent read of all existing rows — before switching to log-based streaming. This ensures the downstream system has the full historical dataset."
        },
        {
          question: "Is CDC a complete replacement for batch ETL, or are they complementary patterns?",
          options: [
            "CDC completely replaces batch ETL in all scenarios",
            "They are complementary — CDC is ideal for real-time change propagation, but large historical backfills and complex aggregations are still better served by batch ETL",
            "CDC and batch ETL serve identical purposes and either can be used for any workload",
            "Batch ETL is deprecated in favour of CDC for all new data engineering projects"
          ],
          correctIndex: 1,
          explanation: "CDC excels at propagating row-level changes in near real-time. However, large historical backfills, complex multi-table aggregations, and full recalculations are still better served by batch processing. The two patterns are complementary, not mutually exclusive."
        },
        {
          question: "What is Debezium, and why is it widely adopted for CDC in data engineering?",
          options: [
            "A proprietary ETL tool by Databricks for batch data loading",
            "An open-source distributed platform that captures row-level changes from database transaction logs and streams them as events to Kafka",
            "A cloud-managed CDC service available only on AWS",
            "A SQL extension that adds change tracking columns to existing tables"
          ],
          correctIndex: 1,
          explanation: "Debezium is an open-source CDC platform built on Kafka Connect. It reads the transaction log of source databases (PostgreSQL, MySQL, SQL Server, MongoDB, etc.) and publishes change events to Kafka topics. Its non-invasive, log-based approach avoids impacting source database performance."
        }
      ]
    },
    {
      topicId: 'ai-powered-development',
      topicTitle: 'AI-Powered Development for Data Engineers',
      objectiveIndex: 7,
      questions: [
        {
          question: "What context should a data engineer provide to an AI assistant to get the best results when generating pipeline code?",
          options: [
            "A description of the desired output format only",
            "The schema of source and target tables, transformation requirements, existing naming conventions, and data quality constraints",
            "The name of the target database and the programming language",
            "A sample of the expected output data"
          ],
          correctIndex: 1,
          explanation: "AI assistants generate much better code when given rich context. Providing table schemas, transformation rules, naming conventions, and quality constraints grounds the model in your specific domain and reduces generic or incorrect output."
        },
        {
          question: "According to the content, what is the risk of using AI to generate complex transformations without understanding the underlying logic?",
          options: [
            "The generated code will always be functionally incorrect",
            "It creates a maintenance burden — when the generated code needs to be modified later, no one understands it well enough to change it safely",
            "The AI will not generate complex transformations without human review",
            "Complex transformations generated by AI cannot be tested"
          ],
          correctIndex: 1,
          explanation: "Code that nobody understands is a maintenance liability. When requirements change or bugs are found, engineers who relied on AI to write code they did not understand cannot safely modify it — creating technical debt and risk."
        },
        {
          question: "What team convention risk is associated with AI tool use for data pipeline development?",
          options: [
            "AI tools are too expensive for team-wide adoption",
            "Without established conventions, different team members using AI tools produce inconsistent pipeline patterns and code quality",
            "AI tools prevent code review because they generate too much code",
            "AI tools require specialised training that most data engineers lack"
          ],
          correctIndex: 1,
          explanation: "AI tools accelerate code generation but also amplify inconsistency if teams have no conventions. Without agreement on patterns (naming, structure, testing approach), AI-assisted teams can produce highly inconsistent codebases quickly."
        },
        {
          question: "What is the 'inner loop' and 'outer loop' of AI-powered data engineering development?",
          options: [
            "Inner loop refers to model training; outer loop refers to model deployment",
            "Inner loop is the rapid local development cycle (code, test, iterate with AI assistance); outer loop is the CI/CD pipeline that validates, builds, and deploys to production",
            "Inner loop processes data in memory; outer loop writes results to disk",
            "Inner loop handles structured data; outer loop handles unstructured data"
          ],
          correctIndex: 1,
          explanation: "The inner loop is where AI assistants have the most impact: quickly generating code, writing tests, and iterating locally. The outer loop (CI/CD, automated testing, deployment) ensures that AI-generated code meets production standards before reaching users."
        }
      ]
    }
  ],
  exams: {
    beginner: [
      {
        question: "A data engineer writes `def process(records=[])`. What is wrong with this code?",
        options: [
          "Lists cannot be used as function parameters",
          "The mutable default argument is shared across all calls, causing records from one call to persist into the next",
          "The function name conflicts with a Python built-in",
          "Python functions cannot have default arguments"
        ],
        correctIndex: 1,
        explanation: "Mutable default arguments (lists, dicts) are created once at function definition time. All calls that rely on the default share the same object, so mutations accumulate across calls."
      },
      {
        question: "Which SQL clause filters groups AFTER aggregation, rather than filtering individual rows before grouping?",
        options: ["WHERE", "FILTER", "HAVING", "QUALIFY"],
        correctIndex: 2,
        explanation: "HAVING filters the result of GROUP BY aggregations. WHERE filters rows before grouping happens. HAVING is required when filtering on aggregate values like COUNT or SUM."
      },
      {
        question: "What does a LEFT JOIN return for rows in the left table that have no match in the right table?",
        options: [
          "Those rows are excluded from the result",
          "Those rows appear with NULL values for all right-table columns",
          "Those rows appear with empty strings for right-table columns",
          "The query raises an error"
        ],
        correctIndex: 1,
        explanation: "A LEFT JOIN returns all rows from the left table. Where no matching row exists in the right table, the right-side columns are populated with NULL."
      },
      {
        question: "What is the primary difference between ETL and ELT?",
        options: [
          "ETL is for batch; ELT is for streaming",
          "ETL transforms data before loading; ELT loads raw data first and transforms inside the target system",
          "ETL uses SQL; ELT uses Python",
          "ETL is for on-premises; ELT is for cloud"
        ],
        correctIndex: 1,
        explanation: "ETL transforms data in an intermediate layer before loading to the destination. ELT loads raw data first into a powerful warehouse and runs transformations there, leveraging the warehouse's compute."
      },
      {
        question: "What does the pipe operator `|` do on the Linux command line?",
        options: [
          "Redirects output to a file",
          "Passes the stdout of one command as stdin to the next command",
          "Runs two commands simultaneously in parallel",
          "Separates multiple independent commands"
        ],
        correctIndex: 1,
        explanation: "The pipe `|` chains commands by feeding the standard output of the left command into the standard input of the right command. For example, `cat file.log | grep ERROR`."
      },
      {
        question: "Which normalisation form eliminates transitive dependencies, where a non-key column depends on another non-key column?",
        options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
        correctIndex: 2,
        explanation: "3NF requires that every non-key attribute depends directly on the primary key, not through another non-key attribute. Transitive dependencies (A → B → C where B is non-key) violate 3NF."
      },
      {
        question: "What is idempotency in the context of data pipelines?",
        options: [
          "The ability to process data from multiple sources in parallel",
          "Running the pipeline multiple times for the same input always produces the same result",
          "The pipeline automatically scales based on data volume",
          "The pipeline logs every execution for audit purposes"
        ],
        correctIndex: 1,
        explanation: "An idempotent pipeline produces the same output regardless of how many times it runs for the same input period. This is critical for safe retries after failures without duplicating data."
      },
      {
        question: "What is the difference between OLTP and OLAP data models?",
        options: [
          "OLTP uses SQL; OLAP uses NoSQL",
          "OLTP is optimised for fast individual row operations; OLAP is optimised for aggregation across large datasets",
          "OLTP stores data in columns; OLAP stores in rows",
          "OLTP is for data lakes; OLAP is for operational databases"
        ],
        correctIndex: 1,
        explanation: "OLTP (Online Transaction Processing) is row-oriented and normalised for fast individual inserts and updates. OLAP (Online Analytical Processing) is column-oriented and often denormalised for fast aggregation over millions of rows."
      },
      {
        question: "Why should you avoid loading an entire large file into memory at once in Python?",
        options: [
          "Python's file reading API does not support large files",
          "Loading the entire file can exhaust available memory; processing line by line or in chunks is more memory-efficient",
          "Large file loads are automatically rejected by the Python interpreter",
          "It prevents the use of list comprehensions"
        ],
        correctIndex: 1,
        explanation: "For large files (gigabytes), reading the entire contents into memory at once can exceed available RAM. Processing files line by line or in chunks with generators keeps memory usage constant regardless of file size."
      },
      {
        question: "What does a foreign key enforce in a relational database?",
        options: [
          "That the column has no duplicate values",
          "That values in the child table reference an existing row in the parent table, enforcing referential integrity",
          "That the column cannot contain NULL values",
          "That the column is indexed for fast lookup"
        ],
        correctIndex: 1,
        explanation: "Foreign keys enforce referential integrity — they prevent creating rows that reference non-existent parent rows (and optionally prevent deleting parent rows that have child references)."
      },
      {
        question: "Which Python built-in should be used to check if a value in a pipeline is None before processing it?",
        options: ["value == None", "value is None", "not value", "value != False"],
        correctIndex: 1,
        explanation: "`is None` is the idiomatic Python check for None — it tests object identity. `== None` can be overridden by a class's `__eq__` method. `not value` incorrectly returns True for zero, empty string, and empty list, not just None."
      },
      {
        question: "What does a Common Table Expression (CTE) with `WITH` improve in SQL?",
        options: [
          "Query execution speed by caching intermediate results",
          "Query readability by breaking complex queries into named, reusable steps",
          "Security by restricting which tables can be accessed in the query",
          "Performance by materialising results as a temporary indexed table"
        ],
        correctIndex: 1,
        explanation: "CTEs improve readability and maintainability by allowing complex queries to be written as a sequence of named steps. They do not inherently improve performance — some databases materialise them as temp tables, others inline them."
      },
      {
        question: "In data modelling, what is a surrogate key?",
        options: [
          "A composite key made up of multiple business columns",
          "A system-generated identifier with no business meaning, used as the primary key",
          "A key that duplicates data from another table for denormalisation",
          "A natural key derived from the business domain like email address"
        ],
        correctIndex: 1,
        explanation: "Surrogate keys are system-generated (auto-increment integers, UUIDs) with no business meaning. They are stable, unique, and unaffected by business attribute changes — unlike natural keys which can change."
      },
      {
        question: "What is the correct way to handle NULL comparison in SQL?",
        options: [
          "WHERE column = NULL",
          "WHERE column == NULL",
          "WHERE column IS NULL",
          "WHERE ISNULL(column) = 1"
        ],
        correctIndex: 2,
        explanation: "NULL comparisons using `=` or `==` always return UNKNOWN in SQL three-valued logic. `IS NULL` is the only correct operator for testing whether a value is NULL."
      },
      {
        question: "What does an index in a relational database trade off to speed up read queries?",
        options: [
          "Disk space — indexes consume additional storage and slow down write operations",
          "Query correctness — indexes may return stale results",
          "Concurrency — indexed tables cannot be written to concurrently",
          "SQL compatibility — indexes are only supported in specific SQL dialects"
        ],
        correctIndex: 0,
        explanation: "Indexes improve read performance by allowing the database to find rows without a full table scan. The trade-off is storage space for the index structure and slower writes because the index must be updated on every INSERT, UPDATE, and DELETE."
      },
      {
        question: "Which command in Linux displays the contents of a file one page at a time?",
        options: ["cat", "head", "less", "grep"],
        correctIndex: 2,
        explanation: "`less` is an interactive pager that displays file contents one screen at a time, allowing navigation forward and backward. `cat` dumps the entire file at once; `head` shows only the first lines; `grep` searches for patterns."
      },
      {
        question: "A pipeline loads all rows from a 100GB database table every night to a data warehouse. As the table grows to 1TB, what is the likely impact?",
        options: [
          "No impact — the pipeline scales automatically",
          "The pipeline becomes increasingly slow and expensive; incremental loading should be implemented to process only new or changed rows",
          "The pipeline will automatically switch to incremental mode",
          "The data warehouse will reject loads above a certain size"
        ],
        correctIndex: 1,
        explanation: "Full-load pipelines that reprocess everything do not scale. As tables grow, runtime and cost grow proportionally. Incremental loading — processing only data changed since the last run — is essential for sustainable pipeline performance."
      }
    ],
    mid: [
      {
        question: "In a star schema, what is the 'grain' of a fact table?",
        options: [
          "The number of dimension tables connected to the fact table",
          "The level of detail each row represents — the most important design decision",
          "The primary key of the fact table",
          "The smallest unit of storage used by the table"
        ],
        correctIndex: 1,
        explanation: "The grain defines what one row represents (e.g., one transaction line item, one daily summary per store). Mixing grains in one fact table produces incorrect aggregations."
      },
      {
        question: "What SCD Type 2 does when a customer's region attribute changes?",
        options: [
          "It updates the existing row, overwriting the old region",
          "It adds a new column for the previous region value",
          "It adds a new row with the new region and version dates, preserving the original row for historical analysis",
          "It deletes the old row and inserts a new one"
        ],
        correctIndex: 2,
        explanation: "SCD Type 2 preserves history by inserting a new dimension row with the new attribute value and effective dates. The old row remains with its expiry date set, enabling point-in-time analysis."
      },
      {
        question: "What is the purpose of the `ref()` function in dbt?",
        options: [
          "To reference a column in another table via a JOIN",
          "To reference another dbt model, establishing a dependency that builds the execution DAG",
          "To reference a schema.yml test definition",
          "To reference an external database not managed by dbt"
        ],
        correctIndex: 1,
        explanation: "`ref()` declares a dependency between dbt models. dbt collects all `ref()` calls to build a directed acyclic graph (DAG) and determine the correct execution order."
      },
      {
        question: "What happens in Apache Spark when you call `collect()` on a large DataFrame?",
        options: [
          "Spark writes the data to disk in Parquet format",
          "All data from distributed executors is pulled to the driver's memory, potentially causing out-of-memory errors",
          "Spark triggers a shuffle to redistribute data optimally",
          "Spark saves a snapshot of the DataFrame to the cluster's HDFS"
        ],
        correctIndex: 1,
        explanation: "`collect()` moves all distributed data to the driver node. For large DataFrames, this exhausts driver memory. Use actions like `write()` or `show(n)` to avoid collecting large datasets to the driver."
      },
      {
        question: "What does lazy evaluation mean in Apache Spark?",
        options: [
          "Spark defers execution until the cluster is not busy",
          "Transformation operations build a logical plan; actual computation only happens when an action is called",
          "Spark processes the smallest partitions first for efficiency",
          "Results are cached to avoid re-executing the same transformations"
        ],
        correctIndex: 1,
        explanation: "Transformations like `filter`, `select`, and `join` are lazy — they add steps to Spark's plan without executing anything. When an action (`count`, `write`, `show`) is called, Spark optimises and executes the full plan."
      },
      {
        question: "In Apache Airflow, why should you NOT use XComs to pass DataFrames between tasks?",
        options: [
          "Airflow does not support Python DataFrames",
          "XComs are stored in the Airflow metadata database and are meant for small values; passing large datasets overloads the database",
          "DataFrames cannot be serialised to JSON",
          "XComs only support string values"
        ],
        correctIndex: 1,
        explanation: "XComs are stored in Airflow's metadata database. They are designed for small values like file paths, status codes, or row counts. Passing DataFrames or large objects via XCom overloads the metadata database."
      },
      {
        question: "What does Azure Data Factory's Copy Activity do?",
        options: [
          "Copies an entire ADF instance to another Azure region",
          "ADF's primary data movement tool that connects to 100+ sources and sinks with built-in format conversion",
          "Creates a backup copy of a Synapse SQL pool",
          "Copies dbt transformation logic from GitHub to Synapse"
        ],
        correctIndex: 1,
        explanation: "Copy Activity is the core data movement component of ADF. It connects to 100+ data sources and destinations, handles format conversion, and supports incremental loading patterns."
      },
      {
        question: "What is the difference between data quality testing and monitoring?",
        options: [
          "Testing is automated; monitoring requires human review",
          "Testing catches issues during pipeline execution; monitoring tracks quality metrics over time to detect gradual degradation",
          "Testing applies to raw data; monitoring applies only to aggregated data",
          "Testing is run ad hoc; monitoring runs on a fixed daily schedule"
        ],
        correctIndex: 1,
        explanation: "Quality testing runs as part of the pipeline and catches immediate violations. Monitoring observes quality metrics (row counts, NULL rates, value distributions) continuously over time, detecting slow degradation that point-in-time tests might miss."
      },
      {
        question: "What problem does Docker solve for data engineering?",
        options: [
          "It accelerates Python execution on large datasets",
          "It packages an application and dependencies into a container that runs consistently across all environments, eliminating 'it works on my machine'",
          "It provides a managed database for pipeline metadata storage",
          "It automatically provisions cloud compute resources for pipelines"
        ],
        correctIndex: 1,
        explanation: "Docker creates reproducible execution environments. A containerised pipeline runs identically on a developer's laptop, a CI server, and a production cluster — eliminating environment-specific failures."
      },
      {
        question: "What is a Spark shuffle and why is it expensive?",
        options: [
          "A shuffle reorders tasks in the execution queue for better parallelism",
          "A shuffle redistributes data across partitions (required by joins and groupBy), involving network I/O between all executors",
          "A shuffle compresses data before writing to storage",
          "A shuffle rebalances the cluster when a worker node fails"
        ],
        correctIndex: 1,
        explanation: "Shuffles redistribute rows across the cluster so operations like groupBy or join can bring matching keys together. This requires all executors to exchange data over the network — the most expensive operation in Spark."
      },
      {
        question: "Which window function ranking assigns 1,1,3 (skipping 2) for two tied rows?",
        options: ["ROW_NUMBER()", "DENSE_RANK()", "RANK()", "NTILE()"],
        correctIndex: 2,
        explanation: "`RANK()` assigns the same rank to tied rows but skips subsequent positions, producing gaps (1, 1, 3). `DENSE_RANK()` also ties but does not skip (1, 1, 2). `ROW_NUMBER()` is always unique regardless of ties."
      },
      {
        question: "Why should dbt models NOT all be materialised as tables?",
        options: [
          "Tables cannot be referenced by other dbt models",
          "Materialising everything as tables wastes compute and storage when views would be lighter and sufficient for infrequently queried intermediate models",
          "Table materialisation breaks the `ref()` dependency graph",
          "dbt has a limit on the number of tables per project"
        ],
        correctIndex: 1,
        explanation: "Table materialisation rebuilds the entire table on every dbt run. Many intermediate models are better served as views (lightweight, always current). Only frequently queried or expensive-to-compute models benefit from table materialisation."
      },
      {
        question: "What does 'snowflake schema' mean, and why is it generally less preferred than star schema in modern data warehouses?",
        options: [
          "A snowflake schema uses cloud-native storage; a star schema uses on-premises storage",
          "A snowflake schema normalises dimension tables into sub-tables — more storage-efficient but requiring more joins, which reduces query performance",
          "A snowflake schema is exclusive to the Snowflake platform",
          "A snowflake schema stores facts in multiple tables; a star schema stores all facts in one"
        ],
        correctIndex: 1,
        explanation: "Snowflake schema normalises dimensions to reduce redundancy but requires additional joins at query time. Modern analytical warehouses are fast enough that the join overhead is significant, making the simpler star schema preferred."
      },
      {
        question: "What does `EXPLAIN ANALYZE` show in SQL, and why is it useful?",
        options: [
          "It shows which users have run the query before",
          "It shows the actual execution plan including costs, row estimates, and time taken — essential for diagnosing slow queries",
          "It explains the SQL syntax for a beginner audience",
          "It analyses data types and suggests more efficient alternatives"
        ],
        correctIndex: 1,
        explanation: "`EXPLAIN ANALYZE` executes the query and returns the actual execution plan with real timing and row counts. This reveals where the cost lies — full table scans, expensive joins, poor estimates — enabling targeted optimisation."
      },
      {
        question: "In Airflow, what is the consequence of not setting `retries` on tasks in a production DAG?",
        options: [
          "Airflow will default to 10 retries for all tasks",
          "Transient failures (network timeouts, temporary service issues) cause the entire pipeline to fail permanently with no automatic recovery",
          "The DAG will pause and wait for a manual trigger to resume",
          "Airflow will send an alert but continue executing downstream tasks"
        ],
        correctIndex: 1,
        explanation: "Without retries, the first transient failure permanently fails the task and halts the pipeline. Setting `retries` and `retry_delay` allows Airflow to automatically recover from temporary issues without human intervention."
      },
      {
        question: "What does the dbt `unique` test validate?",
        options: [
          "That every value in the column appears exactly once — no duplicates",
          "That the column contains at least one non-NULL value",
          "That values in the column match a predefined list of accepted values",
          "That the column's values match a reference column in another model"
        ],
        correctIndex: 0,
        explanation: "The `unique` test checks that no two rows have the same value for the specified column. Combined with `not_null`, it validates that the column can serve as a primary key."
      },
      {
        question: "Why should Docker containers not be run as the root user?",
        options: [
          "Running as root prevents Docker Compose from starting related services",
          "A process running as root inside a container has elevated privileges — if compromised, it can affect the host system",
          "Root containers cannot access mounted volumes",
          "Docker Hub rejects images configured to run as root"
        ],
        correctIndex: 1,
        explanation: "Running containers as root violates the principle of least privilege. If a vulnerability is exploited in a root container, the attacker may gain root-level access to the host. Always specify a non-root user with `USER` in the Dockerfile."
      },
      {
        question: "What is Azure Synapse's serverless SQL pool best suited for?",
        options: [
          "High-concurrency, fixed-latency production reporting workloads",
          "Ad hoc exploration and pay-per-query analytics over data in Azure Data Lake Storage",
          "Running Spark transformations on large datasets",
          "Streaming real-time event data from Azure Event Hubs"
        ],
        correctIndex: 1,
        explanation: "Serverless SQL pools are pay-per-query (billed per TB scanned) with no fixed compute to provision. They are ideal for ad hoc exploration. Dedicated SQL pools are better for predictable, high-concurrency production workloads."
      }
    ],
    senior: [
      {
        question: "What is the key architectural difference between a data lake, a data warehouse, and a lakehouse?",
        options: [
          "Data lakes use SQL; data warehouses use Python; lakehouses use Java",
          "Data lakes offer scalable open-format storage but lack reliability; warehouses offer reliability but use proprietary formats; lakehouses combine both by adding transaction layers to object storage",
          "Data warehouses support streaming; data lakes support only batch; lakehouses support only structured data",
          "Data lakes are on-premises; warehouses are cloud; lakehouses are hybrid"
        ],
        correctIndex: 1,
        explanation: "Traditional data lakes are cheap and flexible but unreliable (no ACID). Warehouses are reliable but expensive and proprietary. Lakehouses add table formats (Delta Lake, Iceberg) to object storage to get reliability, openness, and scalability."
      },
      {
        question: "In Kafka, what delivery semantic is most appropriate for financial transaction processing where duplicates could cause incorrect billing?",
        options: [
          "At-most-once — avoids duplicates even at the cost of potential data loss",
          "At-least-once — acceptable for financial data because duplicates can be filtered",
          "Exactly-once — guarantees no duplicates and no data loss, essential for financial accuracy",
          "Best-effort — sufficient because downstream systems can reconcile"
        ],
        correctIndex: 2,
        explanation: "Financial transactions require exactly-once semantics — a transaction must be processed precisely once. At-least-once risks double-billing (duplicate processing); at-most-once risks lost transactions (missed billing)."
      },
      {
        question: "What does Delta Lake's `MERGE INTO` command enable that a plain `INSERT OVERWRITE` does not?",
        options: [
          "Merge INTO runs faster than INSERT OVERWRITE for all table sizes",
          "MERGE INTO performs conditional upserts — updating matched rows, inserting new rows, and optionally deleting rows — all in one atomic transaction",
          "MERGE INTO can combine data from multiple source tables simultaneously",
          "MERGE INTO enforces schema validation before writing"
        ],
        correctIndex: 1,
        explanation: "`INSERT OVERWRITE` replaces the entire table or partition. `MERGE INTO` applies row-level logic: matched rows can be updated or deleted; unmatched rows can be inserted. All changes happen atomically."
      },
      {
        question: "In Data Mesh, what is the role of the 'self-serve data platform' principle?",
        options: [
          "It replaces all central data teams with automated tools",
          "A central platform team provides infrastructure and tooling (storage, compute, cataloguing, access control) so domain teams can own their data products without building infrastructure from scratch",
          "It enables end users to self-serve data without needing any data engineers",
          "It automates all data pipeline development using AI"
        ],
        correctIndex: 1,
        explanation: "Without a self-serve platform, domain teams that own their data products would spend most of their time on infrastructure rather than data. The central platform team removes this burden by providing reusable, well-abstracted infrastructure."
      },
      {
        question: "What is the GDPR principle of 'purpose limitation' and how does it constrain pipeline design?",
        options: [
          "Pipelines must be limited in their computational complexity",
          "Personal data collected for one purpose cannot be used for a different purpose without consent — access controls must enforce this separation",
          "Data must be deleted after the original processing purpose is fulfilled",
          "Pipelines must limit their personal data footprint to fewer than 10 fields"
        ],
        correctIndex: 1,
        explanation: "Purpose limitation requires that personal data is only used for the purpose it was collected for. A claims health data pipeline cannot feed marketing analytics. Engineers must enforce this through access controls and documented data flows."
      },
      {
        question: "What distinguishes log-based CDC from polling-based CDC approaches?",
        options: [
          "Log-based CDC requires changes to the source application; polling-based does not",
          "Log-based CDC reads the database transaction log (non-invasive, captures all changes including deletes); polling compares timestamps (invasive, misses deletes)",
          "Polling-based CDC is more reliable because it does not depend on transaction log availability",
          "Log-based CDC only works with PostgreSQL; polling works with any database"
        ],
        correctIndex: 1,
        explanation: "Log-based CDC reads the write-ahead log without touching the source application or running queries against it. Polling-based CDC uses watermark timestamps but cannot capture deletes and puts load on the source database with repeated queries."
      },
      {
        question: "What is DataOps and what does it apply to data engineering?",
        options: [
          "DataOps is a data processing optimisation technique using in-memory computing",
          "DataOps applies DevOps practices (version control, CI/CD, automated testing, monitoring) to data pipelines to make them reliable and rapidly deployable",
          "DataOps is a cloud vendor certification for data engineering teams",
          "DataOps is a Python framework for running data quality checks in production"
        ],
        correctIndex: 1,
        explanation: "DataOps treats data pipelines as software: version-controlled, tested in CI, deployed via CD, and monitored in production. The goal is the same reliability and deployment velocity that DevOps brings to application code."
      },
      {
        question: "What is the 'right to erasure' (right to be forgotten) under GDPR, and what makes it technically challenging?",
        options: [
          "It requires organisations to erase all data annually; technically trivial with a DELETE statement",
          "Data subjects can request deletion of their personal data; challenging because personal data may exist in many files, transformed layers, and time travel history across a data lake",
          "It requires organisations to erase metadata about data subjects; technically trivial with a metadata update",
          "It only applies to data held in operational databases, not analytical systems"
        ],
        correctIndex: 1,
        explanation: "GDPR right to erasure requires finding and deleting all copies of a person's data. In a data lake, this data may be distributed across raw files, multiple transformation layers, and Delta Lake time travel snapshots — requiring robust lineage tracking and deletion pipelines."
      },
      {
        question: "What is the Medallion Architecture and what does each layer represent?",
        options: [
          "A three-tier security model: Bronze (public), Silver (internal), Gold (restricted)",
          "A lakehouse data organisation pattern: Bronze (raw ingested data), Silver (cleaned/conformed), Gold (aggregated, business-ready data)",
          "A Databricks billing tier: Bronze, Silver, and Gold compute plans",
          "A data quality scoring system for datasets in a data catalog"
        ],
        correctIndex: 1,
        explanation: "The Medallion Architecture organises data in progressive refinement layers. Bronze contains raw source data as-ingested. Silver applies cleaning, conforming, and joining. Gold produces aggregated, domain-specific datasets ready for business consumption."
      },
      {
        question: "What does 'data observability' monitor and why is it different from pipeline execution monitoring?",
        options: [
          "Observability monitors who accesses data; execution monitoring tracks when pipelines run",
          "Observability monitors the health of data itself (freshness, volume, schema, quality) detecting issues that pipelines can succeed through; execution monitoring only tracks whether the pipeline ran",
          "Observability is real-time; execution monitoring is historical",
          "They are the same concept, just different terms"
        ],
        correctIndex: 1,
        explanation: "A pipeline can succeed (exit code 0) while producing stale, incomplete, or incorrect data. Data observability independently monitors data characteristics — detecting gradual quality degradation that execution monitoring cannot see."
      },
      {
        question: "What does Delta Lake's `VACUUM` command do and what retention risk must be balanced?",
        options: [
          "VACUUM removes duplicate rows; the risk is accidentally deleting valid records",
          "VACUUM deletes old data files no longer referenced by the current table state; setting too short a retention period removes time travel history still needed for auditing or debugging",
          "VACUUM compresses Parquet files; the risk is data corruption during compression",
          "VACUUM removes orphaned transaction log files; the risk is losing the table's change history"
        ],
        correctIndex: 1,
        explanation: "`VACUUM` removes data files that are no longer part of the table's current state or within the retention window. Setting retention too aggressively removes time travel history that might be needed for compliance, auditing, or rolling back a recent bad load."
      },
      {
        question: "How does a schema registry prevent breaking changes in a Kafka pipeline?",
        options: [
          "It automatically converts event schemas on the consumer side",
          "It stores schema versions and enforces compatibility rules so producers cannot publish schema changes that would break existing consumers",
          "It rejects any schema changes until all consumers are updated",
          "It creates separate topics for each schema version automatically"
        ],
        correctIndex: 1,
        explanation: "The schema registry enforces compatibility modes (backward, forward, full) between schema versions. A producer that tries to publish an incompatible schema change gets an error, preventing silent breakage of downstream consumers."
      },
      {
        question: "When should an organisation consider implementing Data Mesh?",
        options: [
          "For all organisations as it is the universal best practice for data architecture",
          "When a centralised data team has become a bottleneck — unable to keep up with all domains' data needs — and the organisation has the engineering maturity to support domain data ownership",
          "When an organisation has fewer than 10 data engineers and needs to scale quickly",
          "As the first step in building a new data platform from scratch"
        ],
        correctIndex: 1,
        explanation: "Data Mesh solves a scaling problem specific to large organisations with many data-producing domains. Small to mid-size data teams may not have the bottleneck that justifies the significant organisational change Data Mesh requires."
      },
      {
        question: "What is the data engineer's role in building a RAG (Retrieval-Augmented Generation) AI system?",
        options: [
          "Training the LLM on organisation-specific data",
          "Building the embedding pipeline that converts documents to vectors, the vector database for similarity search, and the retrieval infrastructure that serves the LLM",
          "Writing the prompts that ground the LLM's responses",
          "Fine-tuning the LLM's parameters on domain-specific datasets"
        ],
        correctIndex: 1,
        explanation: "In a RAG architecture, data engineers build the data infrastructure: processing documents into embeddings, storing them in a vector database, and serving the retrieval layer that finds relevant context for each LLM query."
      },
      {
        question: "What does 'infrastructure as code' mean in a DataOps context, and what benefit does it provide?",
        options: [
          "Writing pipeline transformation logic in Python instead of SQL",
          "Defining cloud infrastructure (storage, clusters, databases) in code (Terraform/Bicep) stored in Git, enabling reproducible environments, version-controlled changes, and automated deployments",
          "Auto-generating infrastructure diagrams from existing cloud configurations",
          "Storing infrastructure passwords in a version-controlled configuration file"
        ],
        correctIndex: 1,
        explanation: "Infrastructure as code ensures environments can be recreated exactly from source files. Changes are reviewed via pull requests, versions are tracked in Git, and deployments are automated — applying the same rigour to infrastructure that DataOps applies to pipeline code."
      },
      {
        question: "What is the difference between pseudonymised data and anonymised data under GDPR?",
        options: [
          "They are legally equivalent and both exempt from GDPR",
          "Pseudonymised data retains a key that allows re-identification (still personal data under GDPR); truly anonymised data is irreversibly de-identified and falls outside GDPR's scope",
          "Pseudonymisation uses encryption; anonymisation uses hashing",
          "Pseudonymisation removes only names; anonymisation removes all identifiable attributes"
        ],
        correctIndex: 1,
        explanation: "GDPR defines pseudonymisation as processing that still allows re-identification using additional information. It reduces risk but is still considered personal data. Anonymisation that is practically irreversible removes data from GDPR's scope entirely."
      },
      {
        question: "What is Change Data Capture's primary advantage over full-table batch ETL for operational data synchronisation?",
        options: [
          "CDC supports more target systems than batch ETL",
          "CDC captures changes continuously from the transaction log — providing near-real-time data availability with minimal source load and without full table scans",
          "CDC is simpler to implement and operate than batch ETL",
          "CDC uses less network bandwidth than batch ETL for the initial data load"
        ],
        correctIndex: 1,
        explanation: "CDC reads the database transaction log to capture every change as it happens. This eliminates the latency of scheduled batch runs, avoids expensive full table scans on the source, and provides downstream systems with data in seconds rather than hours."
      }
    ]
  }
}
