# SQL — Senior Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/sql/senior)

## Topics Covered

- Execution Plans Deep Dive (scan types, join algorithms, cost model)
- Index Internals (B-tree, hash, GIN, GiST, partial, expression, covering indexes)
- Partitioning Strategies (range, list, hash, pruning, maintenance)
- Locking and Concurrency (row locks, table locks, advisory locks, MVCC, optimistic vs pessimistic)
- Performance Tuning (connection pooling, COPY, VACUUM, pg_stat_statements, pg_stat_io)
- Zero-Downtime Migration Strategies (expand/contract, batched backfills, safe DDL)
- Advanced Patterns (temporal tables, soft deletes, audit logging, JSONB, full-text search)

## Prerequisites

- Completion of the SQL Mid guide or equivalent knowledge
- Strong understanding of CTEs, window functions, and transactions
- Experience optimizing queries in production environments

## Estimated Time

55 hours

---

## 1. Execution Plans Deep Dive

### Scan Types

| Scan Type | When Used | Performance |
|-----------|-----------|-------------|
| **Seq Scan** | No useful index, or large portion of table needed | Reads every row sequentially |
| **Index Scan** | Selective query with matching index | Traverses B-tree, then fetches from heap |
| **Index Only Scan** | All needed columns are in the index | Fastest — no heap access (Heap Fetches: 0) |
| **Bitmap Index Scan** | Medium selectivity (5-20% of rows) | Builds bitmap of pages, reads in physical order |

### Reading EXPLAIN ANALYZE Output

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT c.customer_name, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01'
GROUP BY c.customer_name
ORDER BY total_spent DESC
LIMIT 10;
```

Key metrics to examine:
- **cost=startup..total** — Startup cost is the work before the first row can be returned. Total cost is the estimated cost of the entire operation.
- **rows=N** — Estimated rows vs. actual rows. Large discrepancies mean stale statistics (run `ANALYZE`).
- **actual time=X..Y** — Time in milliseconds to first row and to last row.
- **Buffers: shared hit=N read=M** — Pages found in cache vs. read from disk.

### Join Algorithms

| Algorithm | Best When | Cost |
|-----------|-----------|------|
| **Nested Loop** | Outer set is small, inner has index on join column | O(N * log M) with index |
| **Hash Join** | Both tables large, no index, smaller table fits in work_mem | O(N + M) |
| **Merge Join** | Both inputs pre-sorted on join key | O(N + M), but sort cost may apply |

```sql
-- Force a specific join method (for testing only — do not use in production)
SET enable_hashjoin = off;
SET enable_nestloop = off;
```

### Tuning Planner Cost Parameters

```sql
-- SSD-optimized settings
SET random_page_cost = 1.1;    -- default 4.0 (penalizes random I/O for HDDs)
SET seq_page_cost = 1.0;       -- default 1.0
SET effective_cache_size = '8GB';  -- hint about OS cache size
SET work_mem = '256MB';        -- memory for sorts and hash tables per operation
```

Lowering `random_page_cost` on SSDs makes the planner more willing to choose index scans.

### Identifying Slow Nodes

Look for:
- Nodes where actual time is much higher than children — that node is the bottleneck
- Sort nodes with large row counts — consider an index that provides the order
- Hash or Sort that spills to disk (visible in BUFFERS output) — increase `work_mem`

---

## 2. Index Internals

### B-Tree Index Structure

A B-tree stores values in sorted order across a balanced tree:
- **Root and internal nodes:** routing — direct the search left or right
- **Leaf nodes:** contain the indexed values + heap tuple IDs (ctid)
- **Leaf nodes form a doubly-linked list:** enables efficient range scans

For a query like `WHERE id = 42`, the database traverses root -> internal -> leaf in O(log N). For `WHERE id BETWEEN 10 AND 50`, it finds 10 via tree traversal, then walks the linked list to 50.

### Hash Index

- Supports only equality (`=`) lookups
- O(1) lookup vs. B-tree's O(log N)
- Cannot do range scans, ORDER BY, or LIKE prefix matching
- Smaller than B-tree for large values (e.g., long strings)
- WAL-logged since PostgreSQL 10

```sql
CREATE INDEX idx_sessions_token ON sessions USING hash (session_token);
```

### GIN Index (Generalized Inverted Index)

Maps individual values to the set of rows containing them. Ideal for multi-valued types:

```sql
-- JSONB containment queries
CREATE INDEX idx_events_payload ON events USING gin (payload);
SELECT * FROM events WHERE payload @> '{"status": "failed"}';

-- Array containment
CREATE INDEX idx_tags ON articles USING gin (tags);
SELECT * FROM articles WHERE tags @> ARRAY['postgresql', 'performance'];

-- Full-text search
CREATE INDEX idx_search ON articles USING gin (search_vector);
SELECT * FROM articles WHERE search_vector @@ to_tsquery('database & tuning');
```

GIN indexes are slower to update than B-tree (each value creates multiple index entries) but excel at containment and membership queries.

### GiST Index (Generalized Search Tree)

Supports complex data types and operations:

```sql
-- Range type overlap
CREATE INDEX idx_reservations ON reservations USING gist (date_range);
SELECT * FROM reservations WHERE date_range && '[2025-06-01, 2025-06-07]';

-- PostGIS geographic queries
CREATE INDEX idx_locations ON stores USING gist (location);
SELECT * FROM stores WHERE ST_DWithin(location, ST_MakePoint(-73.9, 40.7), 1000);

-- KNN (nearest-neighbor) search
SELECT * FROM stores ORDER BY location <-> ST_MakePoint(-73.9, 40.7) LIMIT 5;
```

### Partial Indexes

Index only the rows that matter:

```sql
-- Only pending orders (much smaller than indexing all orders)
CREATE INDEX idx_pending_orders ON orders (created_at)
WHERE status = 'pending';

-- Only active users
CREATE INDEX idx_active_users ON users (email)
WHERE deleted_at IS NULL;
```

Benefits: smaller index, less write overhead, faster scans on the subset.

### Expression Indexes

```sql
-- Index a function result
CREATE INDEX idx_users_lower_email ON users (LOWER(email));

-- Now this query uses the index:
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';

-- Date extraction
CREATE INDEX idx_orders_year ON orders ((EXTRACT(YEAR FROM order_date)));
```

### Covering Indexes (INCLUDE)

```sql
-- Add non-key columns to leaf nodes for Index Only Scans
CREATE INDEX idx_orders_customer_cover ON orders (customer_id)
INCLUDE (order_date, total, status);

-- This query is now an Index Only Scan:
SELECT order_date, total, status
FROM orders
WHERE customer_id = 42;
```

INCLUDE columns are stored in leaf nodes only — they are not search keys and do not affect index ordering.

---

## 3. Partitioning Strategies

### When to Partition

Partition tables with hundreds of millions to billions of rows where:
- Queries naturally filter on a specific column (dates, tenant IDs)
- Maintenance (archiving, purging) needs to be fast
- Index sizes are becoming problematic

### Range Partitioning (Most Common)

```sql
CREATE TABLE orders (
    order_id    BIGINT GENERATED ALWAYS AS IDENTITY,
    customer_id INTEGER NOT NULL,
    order_date  DATE NOT NULL,
    total       DECIMAL(12,2),
    PRIMARY KEY (order_id, order_date)  -- partition key must be in PK
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2025_q1 PARTITION OF orders
    FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');
CREATE TABLE orders_2025_q2 PARTITION OF orders
    FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');
```

### List Partitioning

```sql
CREATE TABLE events (
    event_id BIGINT GENERATED ALWAYS AS IDENTITY,
    region   TEXT NOT NULL,
    payload  JSONB,
    PRIMARY KEY (event_id, region)
) PARTITION BY LIST (region);

CREATE TABLE events_us PARTITION OF events FOR VALUES IN ('us-east', 'us-west');
CREATE TABLE events_eu PARTITION OF events FOR VALUES IN ('eu-west', 'eu-central');
```

### Hash Partitioning

```sql
CREATE TABLE sessions (
    session_id UUID PRIMARY KEY,
    user_id    INTEGER,
    data       JSONB
) PARTITION BY HASH (session_id);

CREATE TABLE sessions_0 PARTITION OF sessions FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE sessions_1 PARTITION OF sessions FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE sessions_2 PARTITION OF sessions FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE sessions_3 PARTITION OF sessions FOR VALUES WITH (MODULUS 4, REMAINDER 3);
```

Hash partitioning distributes evenly when there is no natural range key.

### Partition Pruning

```sql
-- Only scans orders_2025_q1 — other partitions are skipped
SELECT * FROM orders WHERE order_date BETWEEN '2025-02-01' AND '2025-03-15';
```

The planner eliminates irrelevant partitions at plan time. Verify with EXPLAIN.

### Partition Maintenance

```sql
-- Drop old data instantly (vs. DELETE on millions of rows)
ALTER TABLE orders DETACH PARTITION orders_2023_q1;
DROP TABLE orders_2023_q1;

-- Add new partition for next quarter
CREATE TABLE orders_2026_q1 PARTITION OF orders
    FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');

-- Default partition catches rows that don't match any partition
CREATE TABLE orders_default PARTITION OF orders DEFAULT;
```

Dropping a partition is a metadata-only operation — instant, no VACUUM needed.

---

## 4. Locking and Concurrency

### Row-Level Locks

```sql
-- Exclusive lock on selected rows
SELECT * FROM inventory WHERE product_id = 42 FOR UPDATE;
-- Other transactions wait until this transaction commits

-- NOWAIT: fail immediately instead of waiting
SELECT * FROM inventory WHERE product_id = 42 FOR UPDATE NOWAIT;

-- SKIP LOCKED: skip locked rows (job queue pattern)
SELECT * FROM job_queue
WHERE status = 'pending'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
```

### MVCC (Multi-Version Concurrency Control)

PostgreSQL never modifies rows in place. On UPDATE:
1. The old row version has `xmax` set to the current transaction ID
2. A new row version is written with `xmin` set to the current transaction ID
3. Readers see whichever version matches their transaction snapshot
4. Dead tuples remain on disk until VACUUM reclaims them

**Key benefit:** Readers never block writers. Writers never block readers.

### Optimistic vs. Pessimistic Locking

**Pessimistic (SELECT FOR UPDATE):**
```sql
BEGIN;
SELECT * FROM products WHERE product_id = 42 FOR UPDATE;  -- lock row
UPDATE products SET stock = stock - 1 WHERE product_id = 42;
COMMIT;
```

**Optimistic (version column):**
```sql
-- Read without locking
SELECT product_id, stock, version FROM products WHERE product_id = 42;
-- version = 5, stock = 10

-- Update with version check
UPDATE products
SET stock = 9, version = 6
WHERE product_id = 42 AND version = 5;
-- If 0 rows affected: someone else modified it — retry
```

Optimistic locking scales better in low-conflict scenarios. Pessimistic locking is safer in high-conflict scenarios.

### Advisory Locks

```sql
-- Prevent duplicate cron job execution
SELECT pg_try_advisory_lock(12345);  -- returns true if lock acquired

-- Release when done
SELECT pg_advisory_unlock(12345);

-- Session-level: released at disconnect
-- Transaction-level: released at COMMIT/ROLLBACK
SELECT pg_advisory_xact_lock(12345);
```

### Dead Tuples and VACUUM

```sql
-- Check table bloat
SELECT relname, n_dead_tup, n_live_tup,
       ROUND(n_dead_tup::numeric / GREATEST(n_live_tup, 1) * 100, 1) AS dead_pct
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Regular VACUUM: marks dead space as reusable (does not shrink file)
VACUUM orders;

-- VACUUM FULL: rewrites table compactly but takes ACCESS EXCLUSIVE lock
-- Use only during maintenance windows — blocks ALL operations
VACUUM FULL orders;

-- Autovacuum tuning for high-churn tables
ALTER TABLE orders SET (
    autovacuum_vacuum_scale_factor = 0.01,    -- trigger at 1% dead tuples
    autovacuum_analyze_scale_factor = 0.005
);
```

Long-running transactions prevent VACUUM from cleaning up old versions. Monitor with:
```sql
SELECT pid, age(backend_xmin), query
FROM pg_stat_activity
WHERE backend_xmin IS NOT NULL
ORDER BY age(backend_xmin) DESC;
```

---

## 5. Performance Tuning

### Connection Pooling (PgBouncer)

PostgreSQL creates one OS process per connection (~5-10 MB RAM each). Without pooling, 500 connections = 500 processes.

PgBouncer modes:
- **Session pooling:** connection held for entire client session
- **Transaction pooling:** connection returned after each transaction (most common)
- **Statement pooling:** connection returned after each statement (most restrictive)

Transaction mode is preferred — it maximizes connection reuse.

### Bulk Loading with COPY

```sql
-- 10-100x faster than INSERT for bulk data
COPY orders (customer_id, order_date, total, status)
FROM '/tmp/orders.csv' WITH (FORMAT csv, HEADER true);

-- From application (stdin)
COPY orders FROM STDIN WITH (FORMAT csv);

-- Optimization: disable indexes and constraints during load, then re-enable
```

### pg_stat_statements — Finding Slow Queries

```sql
-- Enable the extension
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Top 10 slowest queries by total time
SELECT
    calls,
    ROUND(total_exec_time::numeric, 1) AS total_ms,
    ROUND(mean_exec_time::numeric, 1) AS avg_ms,
    ROUND((100 * total_exec_time / SUM(total_exec_time) OVER ())::numeric, 1) AS pct,
    LEFT(query, 100) AS query_preview
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

### pg_stat_io (PostgreSQL 16+)

```sql
-- I/O statistics by backend type
SELECT * FROM pg_stat_io
WHERE reads > 0 OR writes > 0
ORDER BY reads DESC;
```

### Key Configuration Parameters

| Parameter | Purpose | SSD Recommendation |
|-----------|---------|-------------------|
| `shared_buffers` | PostgreSQL buffer cache | 25% of total RAM |
| `effective_cache_size` | Hint about OS cache size | 50-75% of total RAM |
| `work_mem` | Memory per sort/hash operation | 256MB-1GB (depends on concurrency) |
| `maintenance_work_mem` | Memory for VACUUM, CREATE INDEX | 1-2 GB |
| `random_page_cost` | Cost of random page read | 1.1-1.5 for SSD |
| `max_parallel_workers_per_gather` | Parallel query workers | 2-4 |

---

## 6. Zero-Downtime Migration Strategies

### The Expand-and-Contract Pattern

1. **Expand:** Add new column/table alongside old
2. **Backfill:** Populate new column in batches
3. **Dual-write:** Application writes to both old and new
4. **Cut-over:** Application reads from new only
5. **Contract:** Drop old column/table

Each step is backward-compatible with running application code.

### Safe DDL Operations

```sql
-- Adding a column with DEFAULT is instant in PostgreSQL 11+
ALTER TABLE orders ADD COLUMN priority INTEGER DEFAULT 0;

-- Adding NOT NULL without default requires rewrite — unsafe on large tables
-- Safe pattern:
ALTER TABLE orders ADD COLUMN priority INTEGER;                          -- 1. nullable
UPDATE orders SET priority = 0 WHERE priority IS NULL;                   -- 2. backfill
ALTER TABLE orders ALTER COLUMN priority SET DEFAULT 0;                  -- 3. default
ALTER TABLE orders ALTER COLUMN priority SET NOT NULL;                   -- 4. constraint

-- Safe index creation
CREATE INDEX CONCURRENTLY idx_orders_priority ON orders (priority);
-- Does NOT block writes (regular CREATE INDEX does)

-- Safe foreign key
ALTER TABLE orders ADD CONSTRAINT fk_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) NOT VALID;
-- Instant: skips existing rows

ALTER TABLE orders VALIDATE CONSTRAINT fk_customer;
-- Validates existing rows with ShareUpdateExclusiveLock (allows writes)
```

### Batched Backfills

```sql
-- Backfill in batches to avoid long-running transactions
DO $$
DECLARE
    batch_size INT := 10000;
    affected INT;
BEGIN
    LOOP
        UPDATE orders
        SET priority = 0
        WHERE order_id IN (
            SELECT order_id FROM orders
            WHERE priority IS NULL
            LIMIT batch_size
        );

        GET DIAGNOSTICS affected = ROW_COUNT;
        RAISE NOTICE 'Updated % rows', affected;

        IF affected = 0 THEN EXIT; END IF;

        COMMIT;  -- release locks between batches
    END LOOP;
END $$;
```

### Renaming Columns Safely

Never rename a column directly — it breaks running application code:
1. Add new column
2. Backfill and dual-write
3. Deploy code reading from new column
4. Drop old column

---

## 7. Advanced Patterns

### Temporal Tables (History Tracking)

```sql
CREATE TABLE products_history (
    product_id   INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    price        DECIMAL(10,2),
    valid_from   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_to     TIMESTAMPTZ NOT NULL DEFAULT 'infinity',
    PRIMARY KEY (product_id, valid_from)
);

-- Time-travel query: what was the price on a specific date?
SELECT * FROM products_history
WHERE product_id = 42
  AND valid_from <= '2025-03-01'
  AND valid_to   >  '2025-03-01';

-- Current records
SELECT * FROM products_history WHERE valid_to = 'infinity';
```

### Audit Logging with Triggers

```sql
CREATE TABLE audit_log (
    audit_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    table_name TEXT NOT NULL,
    operation  TEXT NOT NULL,
    old_data   JSONB,
    new_data   JSONB,
    changed_by TEXT DEFAULT current_user,
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION audit_trigger_fn()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (table_name, operation, old_data, new_data)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE WHEN TG_OP IN ('UPDATE','DELETE') THEN to_jsonb(OLD) END,
        CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN to_jsonb(NEW) END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_trigger_fn();
```

### Soft Deletes with Row-Level Security

```sql
-- RLS automatically filters soft-deleted rows
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY hide_deleted ON orders
    FOR SELECT
    USING (deleted_at IS NULL);

-- Application queries never see deleted rows — no WHERE clause needed
SELECT * FROM orders;  -- automatically excludes soft-deleted
```

### JSONB Operations

```sql
-- Access operators
SELECT
    payload->>'user_id' AS user_id,            -- returns TEXT
    payload->'metadata' AS metadata_jsonb,     -- returns JSONB
    payload #>> '{metadata,source}' AS source  -- path access as TEXT
FROM events;

-- Containment (uses GIN index)
SELECT * FROM events WHERE payload @> '{"status": "error"}';

-- Key existence
SELECT * FROM events WHERE payload ? 'error_code';

-- Modification
UPDATE events
SET payload = payload || '{"processed": true}'::jsonb
WHERE event_id = 1;

-- Remove a key
UPDATE events SET payload = payload - 'temp_field';

-- Set nested value
UPDATE events
SET payload = jsonb_set(payload, '{metadata,processed_at}', '"2025-06-15"')
WHERE event_id = 1;

-- Expand array to rows
SELECT event_id, jsonb_array_elements_text(payload->'tags') AS tag
FROM events;
```

### Full-Text Search

```sql
-- Add search vector and GIN index
ALTER TABLE articles ADD COLUMN search_vector tsvector;

UPDATE articles SET search_vector =
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(body, '')), 'B');

CREATE INDEX idx_articles_fts ON articles USING gin (search_vector);

-- Search with ranking
SELECT title,
       ts_rank(search_vector, query) AS rank,
       ts_headline('english', body, query, 'MaxFragments=3') AS snippet
FROM articles,
     to_tsquery('english', 'postgresql & performance') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;
```

### Row-Level Security for Multi-Tenant Applications

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Tenants can only see their own data
CREATE POLICY tenant_isolation ON orders
    USING (tenant_id = current_setting('app.tenant_id')::INTEGER);

-- Set tenant context per request
SET app.tenant_id = '42';
SELECT * FROM orders;  -- only sees tenant 42's orders
```

### Generated Columns (PostgreSQL 12+)

```sql
CREATE TABLE products (
    product_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    price      DECIMAL(10,2),
    tax_rate   DECIMAL(5,4),
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (price * (1 + tax_rate)) STORED
);
-- total_price is automatically computed and stored
```

---

## Practice Exercises

1. Read an EXPLAIN ANALYZE plan for a 3-table join and identify the bottleneck node.
2. Design a partitioning strategy for an events table receiving 10 million rows per day.
3. Implement optimistic locking with a version column and demonstrate conflict detection.
4. Create a covering index that enables an Index Only Scan for a specific query.
5. Write a zero-downtime migration to rename a column from `name` to `full_name`.
6. Implement full audit logging with triggers and query "who changed order #12345 in the last 7 days."
7. Set up Row-Level Security for a multi-tenant SaaS application.
8. Use pg_stat_statements to identify the top 5 slowest queries and propose index optimizations.

---

## Key Takeaways

- Read EXPLAIN ANALYZE output: compare estimated vs. actual rows, check for Seq Scans on large tables
- Choose the right index type: B-tree for ranges, GIN for JSONB/arrays/FTS, GiST for geometry/ranges
- Partial indexes and covering indexes dramatically reduce I/O
- Partition tables with hundreds of millions of rows — enables pruning and instant archival
- MVCC means readers never block writers; dead tuples require VACUUM
- Use connection pooling (PgBouncer) — PostgreSQL's process-per-connection model does not scale
- COPY is 10-100x faster than INSERT for bulk loading
- pg_stat_statements is the primary tool for identifying slow queries in production
- Zero-downtime migrations: expand/contract, CREATE INDEX CONCURRENTLY, NOT VALID constraints
- Row-Level Security enforces tenant isolation and soft-delete filtering at the database level

---

This is the final level of the SQL path. Consider exploring related paths such as [Python Beginner](../Python/Beginner.md) for database scripting or role-specific learning tracks on the platform.
