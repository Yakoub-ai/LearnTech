/**
 * Additional SQL quiz questions — supplements the base set in languageQuizzes.js
 * Keyed by level: beginner / mid / senior
 */
export const additions = {
  beginner: [
    {
      question: 'You have an index on the `order_date` column, but the following query still performs a full table scan. What is the most likely cause?\n\nSELECT SUM(total) FROM orders WHERE YEAR(order_date) = 2025;',
      options: [
        'The index needs to be rebuilt with REINDEX before it can be used',
        'Applying a function to an indexed column prevents the database from using the index',
        'SUM() aggregate functions always force a full table scan',
        'The index is on the wrong data type for year comparisons',
      ],
      correctIndex: 1,
      explanation:
        'When you wrap an indexed column in a function such as YEAR(), the database cannot use a B-tree index on that column. The index stores the raw date values in sorted order; after applying a function the result has no connection to those stored values. The fix is to rewrite the filter as an explicit date range: WHERE order_date >= \'2025-01-01\' AND order_date < \'2026-01-01\'.',
    },
    {
      question: 'Which of the following correctly explains why `SELECT *` is considered an anti-pattern in production queries?',
      options: [
        'SELECT * is slower because the SQL parser takes longer to expand the wildcard',
        'SELECT * fetches all columns, increasing network transfer and memory use, and can break application code if the schema changes',
        'SELECT * cannot be used with WHERE clauses',
        'SELECT * always forces the database to perform a sequential scan',
      ],
      correctIndex: 1,
      explanation:
        'SELECT * retrieves every column in the table, which increases the amount of data transferred over the network and loaded into memory. More importantly, if a column is added, removed, or reordered, application code that relies on column position or assumes a fixed set of columns can silently break. Naming only the columns you need makes queries self-documenting and resilient to schema changes.',
    },
    {
      question: 'A query uses `WHERE status = \'cancelled\' AND order_date < \'2024-01-01\'`. You have a composite index on `(status, order_date)`. Which of the following statements about this index is correct?',
      options: [
        'The index cannot be used because the query has two conditions',
        'The index is used for both conditions: equality on status narrows the set, then the range on order_date filters within it',
        'The index is only used for the order_date condition because date columns are more selective',
        'Composite indexes are only useful when both conditions use equality operators',
      ],
      correctIndex: 1,
      explanation:
        'A composite index on (status, order_date) is used left to right. The leading equality condition on status eliminates all rows with other statuses, then the inequality on order_date further narrows the result within the matching status group. This is the ideal use of a composite index: equality filters first, range filters last.',
    },
    {
      question: 'Why does `WHERE email = NULL` return no rows, even when NULL values exist in the email column?',
      options: [
        'NULL is a reserved keyword and cannot be used in WHERE clauses',
        'NULL values are not stored in the table; they are represented as empty strings',
        'The = operator cannot compare NULL because NULL represents an unknown value, and unknown = unknown is itself unknown, not TRUE',
        'You must cast the column to TEXT before comparing with NULL',
      ],
      correctIndex: 2,
      explanation:
        'In SQL, NULL represents an unknown or missing value. Any comparison involving NULL — including NULL = NULL — evaluates to NULL (unknown), not TRUE or FALSE. Because WHERE only passes rows where the condition is TRUE, no rows match. The correct syntax is WHERE email IS NULL (or IS NOT NULL). This is a core part of SQL\'s three-valued logic: TRUE, FALSE, and UNKNOWN.',
    },
    {
      question: 'What does COALESCE(discount, 0) do?',
      options: [
        'It removes all NULL rows from the result set',
        'It returns the first non-NULL value in its argument list, so NULL discounts become 0',
        'It converts the discount column to an integer type',
        'It raises an error if the discount column contains NULL',
      ],
      correctIndex: 1,
      explanation:
        'COALESCE evaluates its arguments left to right and returns the first one that is not NULL. COALESCE(discount, 0) returns discount when it has a value, or 0 when discount is NULL. This is useful for treating missing values as a default in calculations, since arithmetic with NULL propagates NULL (e.g., price * NULL = NULL).',
    },
    {
      question: 'What is the difference between WHERE and HAVING in a query that uses GROUP BY?',
      options: [
        'WHERE filters rows before grouping; HAVING filters groups after aggregation',
        'HAVING filters rows before grouping; WHERE filters after aggregation',
        'They are interchangeable — both can reference aggregate functions',
        'WHERE works only on numeric columns; HAVING works on all data types',
      ],
      correctIndex: 0,
      explanation:
        'WHERE is evaluated before GROUP BY, so it filters individual rows based on column values. HAVING is evaluated after GROUP BY and aggregation, so it can filter groups using aggregate results like COUNT(*) or SUM(amount). You cannot reference aggregate functions in a WHERE clause because aggregation has not happened yet at that stage.',
    },
    {
      question: 'You are paginating results with LIMIT 20 OFFSET 10000 on a table with millions of rows. A colleague says this will get slower as the page number increases. Why?',
      options: [
        'OFFSET values above 1000 trigger a different, slower code path in PostgreSQL',
        'The database must read and discard all rows up to the offset before returning the desired page',
        'LIMIT and OFFSET cannot be used together on large tables',
        'The index stops being used once OFFSET exceeds the number of index entries per page',
      ],
      correctIndex: 1,
      explanation:
        'With OFFSET, the database must locate, read, and discard every row before the offset value, even though none of those rows appear in the result. OFFSET 10000 means reading 10,000 rows only to throw them away. The further into the result set you paginate, the more work is wasted. A common alternative is keyset pagination: WHERE id > :last_seen_id ORDER BY id LIMIT 20, which uses an index seek and avoids the wasted work entirely.',
    },
    {
      question: 'In PostgreSQL, which data type should you choose for a column that stores arbitrary-length text such as article body content?',
      options: [
        'CHAR(255) — fixed-length storage is faster for reads',
        'VARCHAR(255) — the 255-character limit prevents excessive storage use',
        'TEXT — it stores unlimited length strings with no performance penalty compared to VARCHAR in PostgreSQL',
        'BLOB — binary types are more efficient for large strings',
      ],
      correctIndex: 2,
      explanation:
        'In PostgreSQL, TEXT, VARCHAR(n), and VARCHAR are all stored identically under the hood. There is no performance difference between them for storage or retrieval. TEXT is the idiomatic choice for variable-length strings without a known maximum length. CHAR(n) pads values to exactly n characters and is almost never the right choice. Arbitrary length limits like VARCHAR(255) are a habit carried over from other databases and provide no benefit in PostgreSQL.',
    },
    {
      question: 'Which of the following correctly uses a CASE expression to label order sizes?',
      options: [
        'SELECT CASE total WHEN total < 50 THEN \'small\' WHEN total < 200 THEN \'medium\' ELSE \'large\' END FROM orders',
        'SELECT CASE WHEN total < 50 THEN \'small\' WHEN total < 200 THEN \'medium\' ELSE \'large\' END FROM orders',
        'SELECT CASE(total < 50, \'small\', total < 200, \'medium\', \'large\') FROM orders',
        'SELECT IF(total < 50, \'small\', IF(total < 200, \'medium\', \'large\')) FROM orders',
      ],
      correctIndex: 1,
      explanation:
        'The searched CASE form uses CASE WHEN <condition> THEN <value> ... ELSE <default> END, where each WHEN clause is an arbitrary boolean expression. The simple CASE form (CASE column WHEN value THEN ...) only tests for equality against a single column, so it cannot handle range conditions like total < 50. IF() is a MySQL-specific function and is not standard SQL or PostgreSQL syntax.',
    },
    {
      question: 'What does `EXTRACT(YEAR FROM created_at)` return when `created_at` is `2024-07-15 09:30:00`?',
      options: [
        '2024-07-15',
        '2024',
        '07',
        'A timestamp truncated to midnight on January 1st of that year',
      ],
      correctIndex: 1,
      explanation:
        'EXTRACT pulls a single date/time field out of a timestamp and returns it as a numeric value. EXTRACT(YEAR FROM created_at) returns the integer 2024. Other common fields are MONTH, DAY, HOUR, MINUTE, DOW (day of week), and EPOCH (seconds since 1970-01-01). It is different from DATE_TRUNC, which truncates a timestamp to a given precision while keeping it as a timestamp type.',
    },
    {
      question: 'Which query correctly finds all customers who have never placed an order, given a `customers` table and an `orders` table with a `customer_id` foreign key?',
      options: [
        'SELECT * FROM customers WHERE customer_id != (SELECT customer_id FROM orders)',
        'SELECT * FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.customer_id IS NULL',
        'SELECT * FROM customers EXCEPT orders',
        'SELECT * FROM customers WHERE NOT orders.customer_id = customers.customer_id',
      ],
      correctIndex: 1,
      explanation:
        'A LEFT JOIN returns all rows from the left table (customers) and matching rows from the right table (orders). Where no match exists, the right-side columns are NULL. Filtering WHERE o.customer_id IS NULL isolates exactly the customers with no orders. The subquery approach with != would fail because comparing a value to a multi-row subquery requires IN/NOT IN, and NOT IN has tricky behavior with NULLs.',
    },
  ],
  mid: [
    {
      question: 'You add an index to a column but the database\'s query planner still chooses a full table scan over the index. According to the indexing talk by Kai Sassnowski, what is the most likely reason?',
      options: [
        'The index was created with incorrect syntax and is invalid',
        'The query needs columns that are not in the index, so fetching each row individually via the index costs more than batch-reading the whole table',
        'Full table scans are always chosen when the table has more than one million rows',
        'The database requires a VACUUM before newly created indexes become active',
      ],
      correctIndex: 1,
      explanation:
        'An index only stores values for its indexed columns plus a row ID. If the query needs additional columns not in the index, the database must perform a separate heap fetch for each matching row. When the matching set is large, those individual random reads can be slower than a sequential full table scan that reads everything in batches. The solution is a covering index (using INCLUDE in PostgreSQL) that adds the extra columns so the query can be satisfied entirely from the index — an index-only scan.',
    },
    {
      question: 'You have a composite index on `(user_id, created_at)` and want to query: `WHERE user_id = 136 AND created_at BETWEEN \'2013-01-01\' AND \'2013-12-31\'`. How does the index column order affect this query?',
      options: [
        'Column order does not matter; the optimizer will use whichever column is more selective',
        'user_id should be second because created_at is used for range filtering and must lead the index',
        'user_id as the leading column is correct: equality on user_id narrows rows first, then the range on created_at filters within those rows',
        'The index cannot be used because BETWEEN operators require a separate index',
      ],
      correctIndex: 2,
      explanation:
        'A composite index is usable from left to right. Placing user_id first with an equality condition is ideal: the database jumps directly to all rows for that user, then uses the sorted created_at values within that group to apply the range filter. If created_at were leading, the range condition would prevent the database from using user_id for filtering at all, because inequality operators stop further index use on subsequent columns.',
    },
    {
      question: 'Which window function correctly returns the rank of each product by price within its category, assigning the same rank to ties but NOT skipping subsequent rank numbers?',
      options: [
        'ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)',
        'RANK() OVER (PARTITION BY category ORDER BY price DESC)',
        'DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC)',
        'NTILE(1) OVER (PARTITION BY category ORDER BY price DESC)',
      ],
      correctIndex: 2,
      explanation:
        'DENSE_RANK() assigns the same rank to tied values and does not skip numbers after a tie. For example, two products priced at $100 both receive rank 1, and the next product receives rank 2. RANK() also handles ties but skips numbers — those two $100 products still both get rank 1, but the next product gets rank 3 (skipping 2). ROW_NUMBER() never assigns the same number to two rows even if their values are identical.',
    },
    {
      question: 'When would you prefer a CTE (WITH clause) over an inline subquery?',
      options: [
        'Always — CTEs are always faster because PostgreSQL materializes them and caches the result',
        'When the same derived result is referenced multiple times in the query, or when readability and step-by-step structure matter more than raw performance',
        'Only when the subquery returns more than 1000 rows',
        'When the subquery contains an aggregate function, since subqueries cannot use GROUP BY',
      ],
      correctIndex: 1,
      explanation:
        'CTEs improve readability by naming intermediate result sets and allowing the same result to be referenced more than once without repeating the logic. In PostgreSQL 12+, CTEs are inlined by default (treated like subqueries), so there is no guaranteed caching benefit — the planner may or may not materialize them. Use WITH MATERIALIZED to force caching when you know the subresult is expensive and referenced multiple times. For simple single-use cases, an inline subquery is equally performant.',
    },
    {
      question: 'What is the purpose of a LATERAL join in PostgreSQL?',
      options: [
        'It joins tables from left to right using a hash algorithm instead of a nested loop',
        'It allows a subquery on the right side to reference columns from tables on the left side of the join, evaluated once per left-side row',
        'It creates a cross join between all rows in both tables',
        'It is an alias for a LEFT OUTER JOIN with an ON clause',
      ],
      correctIndex: 1,
      explanation:
        'A LATERAL subquery (or LATERAL join) can reference columns from tables that appear earlier in the FROM clause. Without LATERAL, a subquery is evaluated once and cannot see its "context" from outer rows. With LATERAL, the subquery runs once per row from the left side, making it possible to call set-returning functions per row, implement top-N-per-group queries efficiently, or pass values from one table into a derived table expression.',
    },
    {
      question: 'You see this in EXPLAIN ANALYZE output:\n\nSeq Scan on orders (cost=0.00..45231.00 rows=2000000 ...) (actual rows=3 ...)\n\nWhat does the large discrepancy between estimated and actual rows most likely indicate?',
      options: [
        'The query has a bug and is returning incorrect results',
        'The table statistics are stale — the planner estimated 2,000,000 rows but only 3 matched, leading it to potentially choose a worse plan',
        'Seq Scan is always the fastest plan for this table size',
        'The cost estimate is irrelevant; only actual time matters in EXPLAIN ANALYZE',
      ],
      correctIndex: 1,
      explanation:
        'The rows estimate in the cost section comes from table statistics collected by ANALYZE. A huge gap between estimated rows (2,000,000) and actual rows (3) means the statistics are outdated or the column distribution is unusual. Bad row estimates cause the planner to pick suboptimal join strategies and access methods. Running ANALYZE on the table (or letting autovacuum do it) refreshes the statistics and typically improves plan quality.',
    },
    {
      question: 'Which PostgreSQL transaction isolation level should you use when you need to ensure that a series of reads within the same transaction always sees the same snapshot, preventing non-repeatable reads?',
      options: [
        'READ UNCOMMITTED — it reads the most recent data at all times',
        'READ COMMITTED — each statement sees a fresh snapshot, which prevents stale reads',
        'REPEATABLE READ — the transaction sees a consistent snapshot from its start time, so rows it has read cannot change under it',
        'SERIALIZABLE — required for all multi-statement transactions',
      ],
      correctIndex: 2,
      explanation:
        'REPEATABLE READ gives the transaction a snapshot taken at its first query. Any rows read once will appear the same if read again, even if another committed transaction modifies them concurrently. READ COMMITTED (the PostgreSQL default) takes a fresh snapshot per statement, so a value read in statement 1 may look different in statement 2 of the same transaction. SERIALIZABLE adds further protection against phantom reads and write skew, but at higher lock contention cost.',
    },
    {
      question: 'What is the key difference between a materialized view and a regular (non-materialized) view in PostgreSQL?',
      options: [
        'A regular view stores data on disk; a materialized view computes results on demand each time it is queried',
        'A materialized view stores the query result on disk and must be refreshed explicitly; a regular view always runs its underlying query at access time',
        'Materialized views support indexes; regular views do not support any constraints or indexes',
        'A materialized view can only be used with SELECT; a regular view supports INSERT, UPDATE, and DELETE',
      ],
      correctIndex: 1,
      explanation:
        'A regular view is essentially a named query — every time you SELECT from it, the underlying SQL runs. A materialized view computes the result once and saves it to disk like a table. This makes reads very fast, but data can become stale until you run REFRESH MATERIALIZED VIEW. You can add indexes to materialized views, making them useful for expensive aggregations that are read frequently but only need periodic freshness.',
    },
    {
      question: 'You want to insert a new user record but update the email if a user with the same username already exists. Which PostgreSQL syntax achieves this?',
      options: [
        'INSERT INTO users (username, email) VALUES ($1, $2) ON DUPLICATE KEY UPDATE email = $2',
        'MERGE INTO users USING (VALUES ($1, $2)) AS src(username, email) ON users.username = src.username WHEN MATCHED THEN UPDATE SET email = src.email WHEN NOT MATCHED THEN INSERT',
        'INSERT INTO users (username, email) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email',
        'UPDATE users SET email = $2 WHERE username = $1; INSERT INTO users (username, email) VALUES ($1, $2) WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = $1)',
      ],
      correctIndex: 2,
      explanation:
        'PostgreSQL\'s upsert syntax is INSERT ... ON CONFLICT (conflict_target) DO UPDATE SET .... The special EXCLUDED table alias refers to the row that was proposed for insertion but conflicted. ON DUPLICATE KEY UPDATE is MySQL syntax and does not work in PostgreSQL. The two-statement approach has a race condition between the UPDATE and INSERT. MERGE is valid in PostgreSQL 15+ but the ON CONFLICT form is the idiomatic choice.',
    },
    {
      question: 'What is a partial index in PostgreSQL and when is it most useful?',
      options: [
        'An index that covers only the first N bytes of a text column, used to reduce index size',
        'An index created with a WHERE clause that only indexes rows matching the condition, reducing size and maintenance cost',
        'An index on a subset of columns in a table, equivalent to a composite index with fewer columns',
        'A temporary index that is automatically dropped after the current session ends',
      ],
      correctIndex: 1,
      explanation:
        'A partial index uses a WHERE clause to index only the rows that satisfy a condition. For example, CREATE INDEX ON orders (customer_id) WHERE status = \'pending\' creates a small, focused index for a common query pattern. This is ideal when queries almost always filter on a low-cardinality value (like a status flag) and only a small fraction of rows match. The index is smaller, faster to maintain, and can enable index-only scans for that specific query pattern.',
    },
    {
      question: 'You need to update the `status` column in the `orders` table for all orders whose `customer_id` matches a customer in the `vip_customers` table. Which PostgreSQL syntax is correct?',
      options: [
        'UPDATE orders SET status = \'vip\' JOIN vip_customers ON orders.customer_id = vip_customers.customer_id',
        'UPDATE orders SET status = \'vip\' FROM vip_customers WHERE orders.customer_id = vip_customers.customer_id',
        'UPDATE orders o, vip_customers v SET o.status = \'vip\' WHERE o.customer_id = v.customer_id',
        'UPDATE orders SET status = \'vip\' WHERE customer_id IN SELECT customer_id FROM vip_customers',
      ],
      correctIndex: 1,
      explanation:
        'PostgreSQL uses UPDATE ... FROM to join another table in an update statement. The FROM clause introduces the additional table, and the WHERE clause specifies the join condition. This is PostgreSQL-specific syntax; standard SQL uses MERGE or a subquery for the same result. The comma syntax is MySQL-style and invalid in PostgreSQL. The IN subquery approach works but is less efficient than the FROM join for large sets.',
    },
  ],
  senior: [
    {
      question: 'In PostgreSQL\'s MVCC implementation, what happens internally when you UPDATE a row?',
      options: [
        'The existing row is modified in place and the old value is stored in a separate undo log',
        'The old row version has its xmax set to the current transaction ID, and a new row version is written with xmin set to the current transaction ID',
        'The row is locked and written to a write-ahead log; the heap page is not changed until COMMIT',
        'A copy of the row is written to a temporary buffer and swapped atomically with the original at COMMIT',
      ],
      correctIndex: 1,
      explanation:
        'PostgreSQL\'s MVCC model never modifies rows in place. Instead, an UPDATE marks the old row version as expired by setting its hidden xmax column to the current transaction ID, then inserts a brand-new row version with xmin set to the current transaction ID. Concurrent readers see whichever version matches their transaction snapshot. The old "dead tuple" remains on disk until VACUUM reclaims the space, which is why long-running transactions and high-churn tables require careful autovacuum tuning.',
    },
    {
      question: 'You need to add a foreign key constraint to an `orders` table with 50 million rows without blocking application writes. What is the correct PostgreSQL approach?',
      options: [
        'Use a transaction-level table lock and add the constraint inside a single long transaction',
        'Add the constraint as NOT VALID (instant, skips existing rows), then validate it separately with ALTER TABLE ... VALIDATE CONSTRAINT',
        'Drop and recreate the orders table with the constraint defined in CREATE TABLE',
        'Use CREATE INDEX CONCURRENTLY on the foreign key column before adding the constraint',
      ],
      correctIndex: 1,
      explanation:
        'The two-step approach keeps writes unblocked throughout. NOT VALID adds the constraint immediately without scanning existing rows — new rows are checked from that point on. The subsequent VALIDATE CONSTRAINT scans existing rows holding only a ShareUpdateExclusiveLock, which blocks neither reads nor writes (only other DDL). This is the standard zero-downtime pattern for adding referential integrity to large existing tables.',
    },
    {
      question: 'When choosing between a Nested Loop Join, Hash Join, and Merge Join, which combination of conditions makes a Hash Join the best choice?',
      options: [
        'Both tables are small and one has an index on the join column',
        'Both tables are large, there are no indexes on the join columns, and memory is sufficient to build a hash table from the smaller table',
        'Both inputs are already sorted on the join key and the query requires the result in sorted order',
        'The outer table returns only a few rows after filtering and the inner table has an index on the join key',
      ],
      correctIndex: 1,
      explanation:
        'A Hash Join builds an in-memory hash table from the smaller relation, then probes it with each row from the larger relation — O(N + M) cost with no index requirement. It is optimal when both tables are large, no useful index exists on the join columns, and the smaller table fits in work_mem. A Nested Loop is best when the outer side is small and the inner has an index (O(N log M)). A Merge Join wins when both inputs arrive pre-sorted, avoiding the sort cost and enabling a single linear pass through each.',
    },
    {
      question: 'Two concurrent transactions each hold a lock on resource A and are waiting for a lock on resource B held by the other. PostgreSQL detects this situation and aborts one transaction. What is this called, and what is the best application-level strategy to prevent it?',
      options: [
        'A livelock; prevent it by retrying transactions with exponential backoff',
        'A deadlock; prevent it by always acquiring locks on multiple resources in the same consistent order across all transactions',
        'A phantom read; prevent it by using SERIALIZABLE isolation',
        'Lock escalation; prevent it by keeping transactions as short as possible',
      ],
      correctIndex: 1,
      explanation:
        'This is a deadlock: a circular wait between transactions that can never resolve on its own. PostgreSQL detects it via a deadlock detector and rolls back one of the transactions. The most reliable prevention strategy is lock ordering — if all code paths that touch resources A and B always acquire them in the same order (e.g., always A before B), the circular wait condition cannot arise. Keeping transactions short reduces the window for conflicts but does not eliminate the root cause.',
    },
    {
      question: 'In PgBouncer, what is the difference between session mode and transaction mode, and why does transaction mode require application changes?',
      options: [
        'Session mode reuses connections across transactions; transaction mode opens a new connection for every transaction',
        'Session mode assigns a server connection for the client\'s entire session; transaction mode returns the connection to the pool after each transaction, but features like prepared statements and SET variables are not preserved across transactions',
        'Transaction mode is faster because it uses connection multiplexing; session mode is identical to a direct connection',
        'There is no functional difference; the mode only affects connection pool size limits',
      ],
      correctIndex: 1,
      explanation:
        'In session mode, each client gets a dedicated server connection for the lifetime of its session, offering full compatibility but limited connection reuse. Transaction mode (the most efficient) releases the server connection back to the pool after each COMMIT or ROLLBACK, allowing many clients to share few server connections. The trade-off is that session-level state — prepared statements, SET parameters, advisory locks, and temp tables — does not survive across transactions, so applications must avoid relying on these features.',
    },
    {
      question: 'You have a large `events` table partitioned by month using range partitioning on `event_date`. A query runs `WHERE event_date BETWEEN \'2024-03-01\' AND \'2024-03-31\'`. What PostgreSQL optimization does partitioning enable for this query?',
      options: [
        'Parallel query execution across all partitions simultaneously',
        'Partition pruning — the planner skips all partitions whose range does not overlap the filter, scanning only the March 2024 partition',
        'Automatic index creation on event_date for each partition',
        'Partition-wise joins — the query joins partition to partition instead of scanning the whole table',
      ],
      correctIndex: 1,
      explanation:
        'Partition pruning lets the query planner eliminate partitions that cannot possibly contain matching rows based on their partition bounds. A query filtering a single month\'s date range will scan only the corresponding monthly partition instead of the entire table. This can reduce I/O dramatically on large time-series tables. Range partitioning is the natural fit for date/time data; list partitioning suits categorical columns like region or status; hash partitioning distributes rows evenly when no natural range exists.',
    },
    {
      question: 'What does `pg_try_advisory_lock(key)` do, and how does it differ from a regular row-level lock?',
      options: [
        'It locks a specific row by its primary key; unlike SELECT FOR UPDATE, it does not block concurrent reads',
        'It acquires an application-defined lock identified by an integer key that has no connection to any table row, and returns FALSE immediately instead of blocking if the lock is already held',
        'It attempts to promote a shared lock to an exclusive lock without blocking',
        'It is identical to SELECT FOR UPDATE NOWAIT but works across multiple tables',
      ],
      correctIndex: 1,
      explanation:
        'Advisory locks are cooperative, application-level locks managed by PostgreSQL but not tied to any table or row. They are identified by a user-chosen integer (or pair of integers). pg_try_advisory_lock returns TRUE if it acquires the lock or FALSE if another session holds it — it never blocks. This is useful for distributed leader election, preventing duplicate cron job execution, or serializing access to an external resource, where the lock semantics need to be defined by the application rather than by table rows.',
    },
    {
      question: 'Which PostgreSQL system view is the standard starting point for identifying the most expensive queries in a running database, and what must be enabled first?',
      options: [
        'pg_stat_activity — it is enabled by default and shows currently running queries with their execution time',
        'pg_stat_statements — it requires loading the pg_stat_statements extension, after which it accumulates query statistics (total time, calls, rows) across all executions',
        'pg_locks — it shows all current lock waits and is enabled by default',
        'pg_stat_user_tables — it shows sequential vs index scan counts per table and requires no configuration',
      ],
      correctIndex: 1,
      explanation:
        'pg_stat_statements tracks cumulative execution statistics for every normalized query shape: total time, number of calls, rows returned, and more. It requires the extension to be added to shared_preload_libraries and CREATE EXTENSION pg_stat_statements run once. pg_stat_activity shows only currently running queries, not historical aggregates. After identifying slow query patterns with pg_stat_statements, you use EXPLAIN ANALYZE on specific queries to understand their execution plans.',
    },
    {
      question: 'What is logical replication in PostgreSQL, and how does it differ from streaming (physical) replication?',
      options: [
        'Logical replication copies the WAL byte stream to a replica; physical replication replays individual SQL statements',
        'Logical replication publishes row-level changes for specific tables to subscribers, allowing selective replication and cross-version upgrades; physical replication copies entire data files block by block and requires identical PostgreSQL versions',
        'Logical replication is only available within the same server; physical replication supports cross-server setups',
        'They are identical in behavior; "logical" is just the newer term for the same mechanism',
      ],
      correctIndex: 1,
      explanation:
        'Physical (streaming) replication sends raw WAL bytes that reconstruct the exact on-disk state of the primary, making replicas exact binary copies. This requires the same PostgreSQL major version and same architecture. Logical replication operates at the row-change level (INSERT/UPDATE/DELETE events) for selected tables, using a publish/subscribe model. Because it sends logical changes rather than physical blocks, subscribers can run a different PostgreSQL version, have additional indexes, or include only a subset of tables — making it essential for zero-downtime major version upgrades.',
    },
    {
      question: 'You have a JSONB column `metadata` and need to efficiently query rows where `metadata @> \'{"type": "premium"}\'`. What index type should you create?',
      options: [
        'B-tree index on metadata — B-tree supports all operators including @>',
        'GIN index on metadata — GIN indexes the key-value pairs inside the JSONB document and supports the @> containment operator',
        'Hash index on metadata — hash indexes are the most space-efficient for equality checks',
        'BRIN index on metadata — BRIN is the best choice for document stores',
      ],
      correctIndex: 1,
      explanation:
        'GIN (Generalized Inverted Index) indexes the internal structure of composite types like JSONB, tsvector, and arrays. For JSONB, it indexes every key-value pair and element, making the @> (containment), ? (key exists), and @? (jsonpath) operators index-accelerated. A B-tree index on a JSONB column would only support equality on the entire document, not partial-document containment queries. Use CREATE INDEX ON table USING GIN (metadata) or GIN (metadata jsonb_path_ops) for a smaller, write-faster index limited to containment operators.',
    },
    {
      question: 'What is table bloat in PostgreSQL, and which process is responsible for reclaiming the space left by dead tuples?',
      options: [
        'Bloat is caused by inserting rows with NULL values; the REINDEX command removes them',
        'Bloat is the accumulation of dead tuple versions left by MVCC updates and deletes; VACUUM (and autovacuum) reclaims those pages so they can be reused, while VACUUM FULL physically rewrites the table to return space to the OS',
        'Bloat is index fragmentation caused by out-of-order inserts; CLUSTER reorganizes the table to fix it',
        'Bloat refers to oversized WAL files; checkpoint frequency controls it',
      ],
      correctIndex: 1,
      explanation:
        'Every UPDATE and DELETE in PostgreSQL leaves behind dead tuples — the old row versions that MVCC requires for concurrent readers with older snapshots. Over time these accumulate and inflate table size (bloat). Regular VACUUM marks dead tuple space as reusable within the table\'s existing pages but does not shrink the file on disk. VACUUM FULL rewrites the entire table to reclaim disk space, but it holds an exclusive lock during the operation. Autovacuum runs VACUUM automatically based on configurable thresholds to keep bloat in check.',
    },
    {
      question: 'You enable Row-Level Security (RLS) on a `documents` table and create a policy. A user queries the table but sees no rows despite RLS being enabled. What is the most likely cause?',
      options: [
        'RLS policies only apply to INSERT and UPDATE, not SELECT statements',
        'No permissive policy matches their role, so the default-deny behavior of RLS returns an empty result set rather than an error',
        'The user needs SUPERUSER privileges to see any rows when RLS is enabled',
        'RLS requires a PRIMARY KEY on the table before it can return results',
      ],
      correctIndex: 1,
      explanation:
        'When RLS is enabled on a table, access is denied by default — a user sees only rows for which at least one permissive policy evaluates to TRUE for their role. If no policy matches (perhaps the current_user value does not appear in the expected column), the user sees zero rows silently instead of receiving a permission error. Table owners and superusers bypass RLS unless FORCE ROW LEVEL SECURITY is set. Always verify that the policy expression correctly identifies the executing role, e.g., USING (owner_id = current_user_id()).',
    },
  ],
}
