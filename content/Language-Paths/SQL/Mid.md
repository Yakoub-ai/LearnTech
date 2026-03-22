# SQL — Mid-Level Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/sql/mid)

## Topics Covered

- Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, NTILE, SUM OVER)
- Common Table Expressions (CTEs) — basic, chained, and recursive
- LATERAL Joins (correlated subqueries in FROM)
- MERGE Statement (PostgreSQL 15+ upsert/sync)
- Transactions, ACID, Isolation Levels, and Deadlocks
- Views and Materialized Views (with refresh strategies)
- Query Optimization (EXPLAIN ANALYZE, index strategies, query rewriting)
- Normalization (1NF through BCNF, 4NF, 5NF, denormalization trade-offs)
- Stored Procedures and Functions (PL/pgSQL)

## Prerequisites

- Completion of the SQL Beginner guide or equivalent knowledge
- Comfortable writing JOINs, subqueries, and aggregate queries
- Experience working with a relational database

## Estimated Time

45 hours

---

## 1. Window Functions

Window functions perform calculations across a set of related rows without collapsing them. Unlike GROUP BY, every row remains in the output — you get both the detail and the aggregate.

### Syntax

```sql
function_name() OVER (
    [PARTITION BY col1, col2, ...]
    [ORDER BY col3 [ASC|DESC], ...]
    [frame_clause]
)
```

### ROW_NUMBER, RANK, DENSE_RANK

```sql
SELECT
    department,
    first_name,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS drnk
FROM employees;
```

| Function | Ties | After Two Ties at Rank 1 |
|----------|------|--------------------------|
| `ROW_NUMBER()` | Assigns unique numbers (arbitrary for ties) | 1, 2, 3 |
| `RANK()` | Same rank for ties, then skips | 1, 1, 3 |
| `DENSE_RANK()` | Same rank for ties, no gap | 1, 1, 2 |

### Top-N Per Group Pattern

```sql
-- Top 3 highest-paid employees per department
WITH ranked AS (
    SELECT
        department, first_name, salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
)
SELECT department, first_name, salary
FROM ranked
WHERE rn <= 3;
```

### LAG and LEAD — Accessing Adjacent Rows

```sql
-- Month-over-month revenue change
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month,
    revenue - LAG(revenue) OVER (ORDER BY month) AS change,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        / LAG(revenue) OVER (ORDER BY month) * 100, 1
    ) AS pct_change
FROM monthly_revenue;
```

`LAG(value, offset, default)` looks at previous rows. `LEAD` looks at following rows.

### Running Totals and Moving Averages

```sql
-- Running total
SELECT
    order_date,
    total,
    SUM(total) OVER (ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;

-- 7-day moving average
SELECT
    order_date,
    daily_revenue,
    AVG(daily_revenue) OVER (ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM daily_sales;
```

### Frame Clauses

| Frame | Meaning |
|-------|---------|
| `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` | All rows from start to current (running total) |
| `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` | Current row plus 6 before it (7-day window) |
| `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` | Entire partition |
| `RANGE BETWEEN ...` | Based on value ranges, not row counts |

### NTILE — Bucketing

```sql
-- Divide customers into quartiles by spending
SELECT
    customer_id,
    total_spent,
    NTILE(4) OVER (ORDER BY total_spent DESC) AS spending_quartile
FROM customer_spending;
-- Quartile 1 = top 25% spenders, Quartile 4 = bottom 25%
```

### FIRST_VALUE, LAST_VALUE, NTH_VALUE

```sql
SELECT
    department,
    first_name,
    salary,
    FIRST_VALUE(first_name) OVER (
        PARTITION BY department ORDER BY salary DESC
    ) AS highest_paid_in_dept
FROM employees;
```

---

## 2. Common Table Expressions (CTEs)

CTEs name a temporary result set within a single query using the `WITH` clause. They make complex queries readable by breaking them into logical steps.

### Basic CTE

```sql
WITH active_customers AS (
    SELECT customer_id, customer_name, email
    FROM customers
    WHERE status = 'active' AND last_order_date >= '2025-01-01'
)
SELECT ac.customer_name, COUNT(o.order_id) AS order_count
FROM active_customers ac
JOIN orders o ON ac.customer_id = o.customer_id
GROUP BY ac.customer_name;
```

### Chained CTEs

Later CTEs can reference earlier ones — like a pipeline:

```sql
WITH
customer_spending AS (
    SELECT customer_id, SUM(total) AS total_spent
    FROM orders
    WHERE order_date >= '2025-01-01'
    GROUP BY customer_id
),
customer_tiers AS (
    SELECT
        customer_id,
        total_spent,
        CASE
            WHEN total_spent >= 10000 THEN 'Platinum'
            WHEN total_spent >= 5000  THEN 'Gold'
            WHEN total_spent >= 1000  THEN 'Silver'
            ELSE 'Bronze'
        END AS tier
    FROM customer_spending
)
SELECT tier, COUNT(*) AS customer_count, AVG(total_spent) AS avg_spend
FROM customer_tiers
GROUP BY tier
ORDER BY avg_spend DESC;
```

### Recursive CTEs — Traversing Hierarchies

Recursive CTEs have two parts: an anchor (base case) and a recursive step, combined with `UNION ALL`.

```sql
-- Org chart: find all reports under a manager
WITH RECURSIVE org_tree AS (
    -- Anchor: start with the CEO
    SELECT employee_id, first_name, manager_id, 1 AS depth
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive step: find direct reports
    SELECT e.employee_id, e.first_name, e.manager_id, ot.depth + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.employee_id
)
SELECT * FROM org_tree ORDER BY depth, first_name;
```

### Cycle Detection in Recursive CTEs

For graph data where cycles are possible:

```sql
WITH RECURSIVE graph_walk AS (
    SELECT node_id, ARRAY[node_id] AS path, false AS is_cycle
    FROM nodes WHERE node_id = 1

    UNION ALL

    SELECT n.node_id, gw.path || n.node_id, n.node_id = ANY(gw.path)
    FROM edges e
    JOIN nodes n ON e.target_id = n.node_id
    JOIN graph_walk gw ON e.source_id = gw.node_id
    WHERE NOT gw.is_cycle
)
SELECT * FROM graph_walk WHERE NOT is_cycle;
```

### CTE Materialization (PostgreSQL 12+)

```sql
-- Force or prevent materialization
WITH expensive_query AS MATERIALIZED (
    SELECT ... -- result is computed once and stored
)
SELECT * FROM expensive_query WHERE ...;

WITH simple_filter AS NOT MATERIALIZED (
    SELECT ... -- inlined into the outer query for optimization
)
SELECT * FROM simple_filter WHERE ...;
```

---

## 3. LATERAL Joins

LATERAL allows a subquery in the FROM clause to reference columns from preceding tables — like a correlated subquery that returns multiple rows.

```sql
-- Top 3 orders per customer
SELECT c.customer_name, top_orders.*
FROM customers c
CROSS JOIN LATERAL (
    SELECT order_id, total, order_date
    FROM orders o
    WHERE o.customer_id = c.customer_id
    ORDER BY o.total DESC
    LIMIT 3
) AS top_orders;
```

Without LATERAL, the subquery in FROM cannot reference `c.customer_id`.

---

## 4. MERGE Statement (PostgreSQL 15+)

MERGE combines INSERT, UPDATE, and DELETE in a single statement based on whether rows match:

```sql
MERGE INTO products AS target
USING staging_products AS source
ON target.sku = source.sku
WHEN MATCHED AND source.discontinued = true THEN
    DELETE
WHEN MATCHED THEN
    UPDATE SET price = source.price, stock = source.stock
WHEN NOT MATCHED THEN
    INSERT (sku, product_name, price, stock)
    VALUES (source.sku, source.product_name, source.price, source.stock);
```

---

## 5. Transactions, ACID, and Isolation Levels

### ACID Properties

| Property | Meaning |
|----------|---------|
| **Atomicity** | All operations succeed or all are rolled back |
| **Consistency** | Database moves from one valid state to another |
| **Isolation** | Concurrent transactions do not interfere |
| **Durability** | Committed data survives crashes |

### Transaction Syntax

```sql
BEGIN;
    UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;
COMMIT;
-- If anything fails, both updates are rolled back
```

### SAVEPOINTs

```sql
BEGIN;
    INSERT INTO orders (customer_id, total) VALUES (1, 100);
    SAVEPOINT before_items;

    INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 999, 1);
    -- Product 999 does not exist, FK violation

    ROLLBACK TO SAVEPOINT before_items;
    -- Order is still inserted, only order_items rolled back

    INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 42, 1);
COMMIT;
```

### Isolation Levels

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|-----------|-------------------|-------------|
| Read Uncommitted | Possible | Possible | Possible |
| **Read Committed** (PG default) | No | Possible | Possible |
| Repeatable Read | No | No | No (in PG) |
| Serializable | No | No | No |

```sql
-- Set isolation level
BEGIN ISOLATION LEVEL REPEATABLE READ;
    SELECT balance FROM accounts WHERE account_id = 1;
    -- This will always return the same value within this transaction
COMMIT;
```

**Read Committed:** Each statement sees the latest committed data. Two SELECT statements in the same transaction might see different data if another transaction commits between them.

**Repeatable Read:** The transaction sees a snapshot from its start. Concurrent commits are invisible.

**Serializable:** Strongest level. Transactions behave as if executed one at a time. PostgreSQL detects conflicts and aborts one transaction with a serialization failure (retry needed).

### Deadlocks

```sql
-- Transaction A:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- locks row 1
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- waits for B

-- Transaction B:
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;   -- locks row 2
UPDATE accounts SET balance = balance + 50 WHERE id = 1;   -- waits for A
-- DEADLOCK! PostgreSQL detects it and aborts one transaction.
```

**Prevention:** Always acquire locks in a consistent order (e.g., by ascending ID).

---

## 6. Views and Materialized Views

### Regular Views

A view is a named query — it stores no data and re-executes each time:

```sql
CREATE VIEW active_products AS
SELECT product_id, product_name, price, category
FROM products
WHERE discontinued = false AND stock > 0;

-- Query it like a table
SELECT * FROM active_products WHERE price < 50;

-- Updatable views
UPDATE active_products SET price = 44.99 WHERE product_id = 7;

-- WITH CHECK OPTION prevents updates that would make rows invisible
CREATE VIEW active_products AS
SELECT * FROM products WHERE discontinued = false
WITH CHECK OPTION;
-- UPDATE active_products SET discontinued = true WHERE ...  -> ERROR
```

### Materialized Views

Materialized views store query results physically — fast reads, but stale data:

```sql
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT DATE_TRUNC('month', order_date) AS month, SUM(total) AS revenue
FROM orders
GROUP BY 1;

-- Index it for fast queries
CREATE UNIQUE INDEX ON monthly_sales (month);

-- Refresh (blocks reads)
REFRESH MATERIALIZED VIEW monthly_sales;

-- Concurrent refresh (requires unique index, does not block reads)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
```

**When to use:** Expensive aggregation queries where slightly stale data is acceptable (dashboards, reports).

---

## 7. Query Optimization

### EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT c.customer_name, SUM(o.total)
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01'
GROUP BY c.customer_name;
```

Key things to check:
- **Seq Scan on large table:** Missing index or function on indexed column
- **Estimated vs. actual rows diverge:** Run `ANALYZE tablename` to update statistics
- **Nested Loop with large outer set:** Consider index on join column
- **Sort node:** Consider adding an index that provides the needed order

### Common Index Strategies

```sql
-- Covering index: avoids heap access
CREATE INDEX idx_orders_cover ON orders (customer_id)
INCLUDE (order_date, total);

-- Partial index: index only relevant rows
CREATE INDEX idx_pending_orders ON orders (order_date)
WHERE status = 'pending';

-- Expression index: index a function result
CREATE INDEX idx_users_email_lower ON users (LOWER(email));
```

### Query Rewriting Tips

```sql
-- OR on different columns -> use UNION instead
-- Slow:
SELECT * FROM orders WHERE customer_id = 42 OR order_date = '2025-06-01';

-- Fast:
SELECT * FROM orders WHERE customer_id = 42
UNION
SELECT * FROM orders WHERE order_date = '2025-06-01';

-- Implicit type conversion breaks indexes
-- Slow (phone is VARCHAR):
SELECT * FROM contacts WHERE phone = 5551234;
-- Fast:
SELECT * FROM contacts WHERE phone = '5551234';
```

### ANALYZE — Updating Planner Statistics

```sql
-- Update statistics for a specific table
ANALYZE orders;

-- The planner uses these statistics to estimate row counts and choose plans
-- Autovacuum normally handles this, but run manually after large data loads
```

---

## 8. Normalization

### Normal Forms

**1NF (First Normal Form):** Every column contains atomic (single) values. No arrays or comma-separated lists in a cell.

**2NF (Second Normal Form):** 1NF + every non-key column depends on the entire primary key. Violations happen with composite keys when a column depends on only part of the key.

```
-- Violates 2NF: product_name depends only on product_id, not (order_id, product_id)
order_items(order_id, product_id, product_name, quantity)
-- Fix: move product_name to the products table
```

**3NF (Third Normal Form):** 2NF + no transitive dependencies. Non-key columns must depend only on the primary key.

```
-- Violates 3NF: department_location depends on department_id, not employee_id
employees(employee_id, department_id, department_location)
-- Fix: create a departments table with (department_id, department_location)
```

**BCNF (Boyce-Codd Normal Form):** Every determinant is a candidate key. Resolves edge cases that 3NF does not.

**4NF:** No multi-valued dependencies. If a student has multiple hobbies and multiple phones independently, store them in separate tables.

### When to Denormalize

Denormalization is justified when:
- JOINs are a proven performance bottleneck (measure first)
- Read-heavy workloads (analytics, dashboards)
- Data changes infrequently
- Materialized views can serve as a controlled denormalization layer

---

## 9. Stored Procedures and Functions (PL/pgSQL)

### Functions

```sql
CREATE OR REPLACE FUNCTION calculate_discount(
    p_total DECIMAL,
    p_tier TEXT
) RETURNS DECIMAL
LANGUAGE plpgsql AS $$
DECLARE
    discount_rate DECIMAL;
BEGIN
    CASE p_tier
        WHEN 'Platinum' THEN discount_rate := 0.15;
        WHEN 'Gold'     THEN discount_rate := 0.10;
        WHEN 'Silver'   THEN discount_rate := 0.05;
        ELSE discount_rate := 0;
    END CASE;

    RETURN ROUND(p_total * discount_rate, 2);
END;
$$;

-- Call it
SELECT calculate_discount(250.00, 'Gold');  -- Returns 25.00
```

### Table-Returning Functions

```sql
CREATE OR REPLACE FUNCTION get_department_report(p_dept TEXT)
RETURNS TABLE (employee_name TEXT, salary DECIMAL, rank INT)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        first_name || ' ' || last_name,
        e.salary,
        DENSE_RANK() OVER (ORDER BY e.salary DESC)::INT
    FROM employees e
    WHERE e.department = p_dept;
END;
$$;

SELECT * FROM get_department_report('Engineering');
```

### Stored Procedures (PostgreSQL 11+)

Procedures can manage transactions — functions cannot:

```sql
CREATE OR REPLACE PROCEDURE transfer_funds(
    p_from INT, p_to INT, p_amount DECIMAL
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE accounts SET balance = balance - p_amount WHERE account_id = p_from;
    UPDATE accounts SET balance = balance + p_amount WHERE account_id = p_to;

    IF (SELECT balance FROM accounts WHERE account_id = p_from) < 0 THEN
        RAISE EXCEPTION 'Insufficient funds in account %', p_from;
    END IF;

    COMMIT;
END;
$$;

CALL transfer_funds(1, 2, 500.00);
```

### Error Handling

```sql
BEGIN
    INSERT INTO orders (...) VALUES (...);
EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Duplicate order detected';
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Referenced customer does not exist';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Unexpected error: %', SQLERRM;
END;
```

### Trade-offs of Stored Procedures

| Advantage | Disadvantage |
|-----------|-------------|
| Reduce network round trips | Harder to version control (SQL vs. app code) |
| Transaction management | Harder to unit test |
| Encapsulate complex logic | Vendor lock-in to specific database |
| Run close to the data | Debugging tooling is limited |

---

## Practice Exercises

1. Use window functions to calculate a running total of revenue by month, partitioned by product category.
2. Write a recursive CTE to traverse a category hierarchy (categories with a parent_category_id column) and display the full path for each category.
3. Create a materialized view for a dashboard showing monthly active users, refresh it concurrently.
4. Write a PL/pgSQL function that accepts a date range and returns a summary table of orders grouped by status.
5. Given a table with an index on `(user_id, created_at)`, explain why `WHERE created_at > '2025-01-01'` cannot use this index and how to fix it.
6. Implement a LATERAL join to get the 3 most recent orders for each customer.

---

## Key Takeaways

- Window functions calculate across rows without collapsing them — essential for ranking, running totals, and comparisons
- CTEs improve readability; chained CTEs build pipelines; recursive CTEs traverse hierarchies
- LATERAL joins enable correlated subqueries in FROM that return multiple rows
- Understand all four ACID properties and when each isolation level is appropriate
- Materialized views trade freshness for speed — use CONCURRENTLY to avoid blocking reads
- Normalize to 3NF by default; denormalize only when JOIN cost is a proven bottleneck
- EXPLAIN ANALYZE shows actual execution — compare estimated vs. actual rows to find stale statistics
- Stored procedures manage transactions; functions cannot commit or rollback

---

## Next Steps

After completing this level, proceed to [SQL Senior](../SQL/Senior.md).
