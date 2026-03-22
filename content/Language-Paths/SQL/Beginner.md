# SQL — Beginner Guide

> Full interactive version available on the [Tech Hub Learning Platform](/language/sql/beginner)

## Topics Covered

- SELECT Statements and Filtering
- WHERE Clauses and Operators
- INSERT, UPDATE, DELETE (DML operations)
- SQL Injection Prevention (parameterized queries)
- JOINs (INNER, LEFT, RIGHT, FULL — explicit JOIN ... ON syntax)
- Aggregate Functions (COUNT, SUM, AVG, MIN, MAX) and GROUP BY/HAVING
- NULL Handling (three-valued logic, IS NULL, COALESCE)
- Subqueries (scalar, column, correlated, EXISTS)
- Indexes (basic concepts, B-tree, composite indexes, EXPLAIN)
- Data Types and Constraints

## Prerequisites

- No prior database experience required
- Access to a relational database (PostgreSQL, MySQL, or SQLite)
- Basic understanding of tabular data

## Estimated Time

30 hours

---

## 1. SELECT Fundamentals

The `SELECT` statement is the foundation of SQL. Every query you write to retrieve data starts here.

### Basic SELECT Syntax

```sql
-- Select specific columns (recommended in production)
SELECT first_name, last_name, email
FROM employees;

-- Select all columns (avoid in production code)
SELECT * FROM employees;

-- Aliases improve readability
SELECT
    first_name AS "First Name",
    salary * 12 AS annual_salary
FROM employees;
```

**Key rule:** Always list the columns you need explicitly. `SELECT *` is an anti-pattern in production because it fetches unnecessary data, increases network transfer, and breaks when columns are added or reordered.

### ORDER BY — Sorting Results

```sql
-- ASC is the default sort direction
SELECT first_name, salary FROM employees ORDER BY salary;

-- Descending sort
SELECT first_name, salary FROM employees ORDER BY salary DESC;

-- Multi-column sort
SELECT first_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;
```

Without `ORDER BY`, the database returns rows in an arbitrary order. Never rely on insertion order.

### LIMIT and OFFSET — Pagination

```sql
-- First 10 results
SELECT product_name, price FROM products
ORDER BY price DESC
LIMIT 10;

-- Page 2 (items 11-20)
SELECT product_name, price FROM products
ORDER BY price
LIMIT 10 OFFSET 10;

-- SQL-standard syntax (PostgreSQL)
SELECT first_name, salary FROM employees
ORDER BY salary DESC
FETCH FIRST 10 ROWS ONLY;
```

**Performance note:** OFFSET-based pagination becomes slow on large tables because the database must scan and discard all preceding rows. Cursor-based (keyset) pagination is preferred at scale.

### DISTINCT — Removing Duplicates

```sql
SELECT DISTINCT department FROM employees;

-- Distinct combinations of multiple columns
SELECT DISTINCT department, job_title FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) AS dept_count FROM employees;
```

### SQL Logical Processing Order

Understanding this order helps you debug errors like "column alias not found in WHERE":

```
1. FROM        — identify source tables
2. WHERE       — filter individual rows
3. GROUP BY    — group rows for aggregation
4. HAVING      — filter groups
5. SELECT      — compute output columns and aliases
6. DISTINCT    — remove duplicates
7. ORDER BY    — sort result set
8. LIMIT/OFFSET — paginate
```

Because SELECT runs after WHERE, you cannot use a column alias in WHERE. You can use it in ORDER BY because ORDER BY runs last.

---

## 2. Filtering and Sorting

### Comparison Operators

```sql
SELECT * FROM products WHERE price = 29.99;
SELECT * FROM products WHERE category <> 'Clothing';   -- not equal
SELECT * FROM orders WHERE total > 100;
SELECT * FROM employees WHERE hire_date >= '2025-01-01';
```

### AND, OR, NOT — Logical Operators

```sql
-- AND: both conditions must be true
SELECT * FROM employees
WHERE department = 'Engineering' AND salary > 90000;

-- OR: at least one must be true
SELECT * FROM employees
WHERE department = 'Engineering' OR department = 'Marketing';
```

**Critical:** AND has higher precedence than OR. Without parentheses:

```sql
-- This is evaluated as: Electronics OR (Books AND price > 20)
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Books' AND price > 20;

-- Use parentheses to be explicit:
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Books') AND price > 20;
```

Always use parentheses when mixing AND and OR. Missing parentheses silently return wrong results.

### IN, BETWEEN, LIKE

```sql
-- IN: cleaner than multiple ORs
SELECT * FROM employees
WHERE department IN ('Engineering', 'Marketing', 'Sales');

-- BETWEEN: inclusive on both ends
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
-- Equivalent to: price >= 10 AND price <= 50

-- LIKE: pattern matching (% = any characters, _ = single character)
SELECT * FROM employees WHERE first_name LIKE 'John%';
SELECT * FROM products WHERE sku LIKE 'A_B__';

-- PostgreSQL case-insensitive matching
SELECT * FROM employees WHERE first_name ILIKE 'john%';
```

### NULL Handling — Three-Valued Logic

NULL represents the absence of a value. It is not zero, not an empty string — it is unknown.

```sql
-- WRONG: this never returns true
SELECT * FROM employees WHERE phone = NULL;

-- CORRECT:
SELECT * FROM employees WHERE phone IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;

-- NULL propagates through expressions
-- NULL + 5 = NULL, NULL = NULL is UNKNOWN (not TRUE)

-- COALESCE: returns first non-NULL argument
SELECT COALESCE(phone, 'No phone on file') AS contact FROM employees;

-- NULLIF: returns NULL if two values are equal (useful to avoid division by zero)
SELECT revenue / NULLIF(sessions, 0) AS revenue_per_session FROM metrics;
```

---

## 3. INSERT, UPDATE, DELETE

### INSERT — Adding Rows

```sql
-- Always name your columns explicitly
INSERT INTO employees (first_name, last_name, department, salary)
VALUES ('Alice', 'Chen', 'Engineering', 95000);

-- Multi-row insert (much faster than individual inserts)
INSERT INTO products (product_name, category, price)
VALUES
    ('Widget A', 'Hardware', 12.99),
    ('Widget B', 'Hardware', 14.99),
    ('Gadget C', 'Electronics', 29.99);

-- RETURNING captures generated values (PostgreSQL)
INSERT INTO orders (customer_id, total)
VALUES (42, 199.99)
RETURNING order_id, created_at;
```

### UPDATE — Modifying Rows

```sql
-- Always include a WHERE clause to avoid updating every row
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Engineering' AND performance_rating >= 4;

-- Safe pattern: SELECT first to verify affected rows
SELECT * FROM employees
WHERE department = 'Engineering' AND performance_rating >= 4;
-- Then run the UPDATE after verifying

-- UPDATE with RETURNING
UPDATE products SET price = price * 0.90
WHERE category = 'Clearance'
RETURNING product_id, product_name, price;
```

**Danger:** `UPDATE employees SET salary = 0;` without WHERE updates every row in the table.

### DELETE — Removing Rows

```sql
-- Always verify with SELECT first
DELETE FROM orders WHERE status = 'cancelled' AND order_date < '2023-01-01';

-- DELETE vs TRUNCATE
-- DELETE: logs each row, supports WHERE, fires triggers
-- TRUNCATE: removes all rows instantly, resets auto-increment, no WHERE
TRUNCATE TABLE temp_import_data;
```

### Upsert (INSERT ... ON CONFLICT)

```sql
-- PostgreSQL upsert: insert or update if exists
INSERT INTO products (sku, product_name, price, stock)
VALUES ('WDG-001', 'Widget A', 14.99, 100)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price,
    stock = products.stock + EXCLUDED.stock;

-- ON CONFLICT DO NOTHING: silently skip duplicates
INSERT INTO email_subscriptions (email)
VALUES ('user@example.com')
ON CONFLICT (email) DO NOTHING;
```

### Soft Deletes

Instead of physically removing rows, mark them as deleted:

```sql
-- Soft delete pattern
UPDATE orders SET deleted_at = NOW() WHERE order_id = 12345;

-- All queries must filter:
SELECT * FROM orders WHERE deleted_at IS NULL;
```

This preserves data for auditing, compliance, and recovery.

---

## 4. SQL Injection Prevention

Never concatenate user input directly into SQL strings:

```python
# DANGEROUS — SQL injection vulnerability
query = f"SELECT * FROM users WHERE email = '{user_input}'"

# SAFE — parameterized query
cursor.execute("SELECT * FROM users WHERE email = %s", (user_input,))
```

Parameterized queries send the SQL structure and data separately. The database treats parameters as literal values, never as SQL code.

```sql
-- Prepared statements (PostgreSQL)
PREPARE get_user (TEXT) AS
SELECT user_id, email FROM users WHERE email = $1;

EXECUTE get_user('alice@example.com');
```

---

## 5. JOINs

### INNER JOIN — Matching Rows Only

```sql
SELECT c.customer_name, o.order_id, o.total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;
```

Returns only rows where a match exists in both tables.

### LEFT JOIN — All Left Rows, Matching Right

```sql
SELECT c.customer_name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;
```

Returns all customers, even those with no orders (order columns are NULL).

### Anti-Join Pattern — Finding Missing Matches

```sql
-- Customers who have never placed an order
SELECT c.customer_name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```

### RIGHT JOIN and FULL OUTER JOIN

```sql
-- RIGHT JOIN: all rows from right table, matching left
SELECT c.customer_name, o.order_id
FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;

-- FULL OUTER JOIN: all rows from both tables
SELECT c.customer_name, o.order_id
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;
```

### CROSS JOIN — Cartesian Product

```sql
-- Every combination of size and color
SELECT s.size_name, c.color_name
FROM sizes s
CROSS JOIN colors c;
-- 5 sizes x 4 colors = 20 rows
```

### Self-Join — Joining a Table to Itself

```sql
-- Find employees and their managers
SELECT
    e.first_name AS employee,
    m.first_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

### Multi-Table Joins

```sql
SELECT
    c.customer_name,
    o.order_id,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2025-01-01';
```

Chain multiple JOIN clauses, each with its own ON condition.

---

## 6. Aggregate Functions and GROUP BY

### Core Aggregates

```sql
SELECT
    COUNT(*) AS total_employees,       -- counts all rows (including NULLs)
    COUNT(phone) AS with_phone,        -- counts non-NULL values only
    COUNT(DISTINCT department) AS depts,
    SUM(salary) AS total_payroll,
    AVG(salary) AS avg_salary,         -- ignores NULLs
    MIN(hire_date) AS earliest_hire,
    MAX(salary) AS highest_salary
FROM employees;
```

**Important:** Aggregate functions ignore NULL values. `AVG(salary)` averages only non-NULL rows.

### GROUP BY — Grouping Rows

```sql
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
```

Every column in SELECT that is not inside an aggregate function must appear in GROUP BY.

### HAVING — Filtering Groups

```sql
-- Departments with more than 10 employees
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
```

WHERE filters individual rows before grouping. HAVING filters groups after aggregation. You cannot use aggregate functions in WHERE.

### Combining WHERE and HAVING

```sql
-- Active departments with more than 5 senior engineers
SELECT department, COUNT(*) AS senior_count
FROM employees
WHERE job_level = 'Senior'        -- filters rows BEFORE grouping
GROUP BY department
HAVING COUNT(*) > 5               -- filters groups AFTER aggregation
ORDER BY senior_count DESC;
```

---

## 7. Subqueries

### Scalar Subquery — Returns One Value

```sql
-- Employees earning above the company average
SELECT first_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### Column Subquery — Returns Multiple Values

```sql
-- Orders from German customers
SELECT * FROM orders
WHERE customer_id IN (
    SELECT customer_id FROM customers WHERE country = 'Germany'
);
```

### Correlated Subquery — References Outer Query

```sql
-- Employees earning above their department average
SELECT e.first_name, e.department, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e.department   -- references outer query
);
```

A correlated subquery is re-evaluated for each row in the outer query.

### EXISTS — Short-Circuit Existence Check

```sql
-- Customers who have placed at least one order
SELECT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- Customers with NO orders (NOT EXISTS handles NULLs correctly, unlike NOT IN)
SELECT c.customer_name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
```

EXISTS short-circuits: it stops as soon as the first matching row is found.

### Derived Table — Subquery in FROM

```sql
SELECT dept_stats.department, dept_stats.avg_salary
FROM (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE dept_stats.avg_salary > 80000;
```

---

## 8. Basic Indexing

### What Is an Index?

An index is a data structure (usually a B-tree) that speeds up data retrieval by avoiding full table scans. Think of it like a book's index — you look up a topic and jump to the right page.

```sql
-- Create an index on a frequently queried column
CREATE INDEX idx_orders_customer ON orders (customer_id);

-- Composite index (multi-column)
CREATE INDEX idx_orders_status_date ON orders (status, order_date);
```

### How B-Tree Indexes Work

A B-tree stores values in sorted order. For a query like `WHERE customer_id = 42`, the database traverses the tree in O(log N) instead of scanning all rows.

### Composite Index Column Order

A composite index on `(status, order_date)` supports:
- `WHERE status = 'pending'` — uses the index
- `WHERE status = 'pending' AND order_date > '2025-01-01'` — uses the index fully
- `WHERE order_date > '2025-01-01'` — CANNOT use this index (leading column skipped)

**Rule:** Composite indexes work left to right. Place equality columns first, range columns last.

### When Indexes Cannot Be Used

```sql
-- Function on indexed column prevents index use
SELECT * FROM orders WHERE YEAR(order_date) = 2025;  -- full scan

-- Fix: rewrite as a range
SELECT * FROM orders
WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';  -- uses index
```

### EXPLAIN — Reading Query Plans

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;

-- Output shows: Index Scan, rows estimated vs. actual, execution time
-- EXPLAIN = plan only (estimates)
-- EXPLAIN ANALYZE = runs the query and shows actual numbers
```

### Index Trade-offs

Indexes speed up reads but slow down writes (INSERT, UPDATE, DELETE), because every index must be updated. Only create indexes that your queries actually need.

Low-selectivity columns (like a boolean `is_active` with ~50% each) are poor index candidates — a table scan is often faster.

---

## 9. Data Types and Constraints

### Common Data Types (PostgreSQL)

| Type | Use Case |
|------|----------|
| `INTEGER` / `BIGINT` | Whole numbers, IDs |
| `DECIMAL(10,2)` / `NUMERIC` | Exact values (money) |
| `FLOAT` / `DOUBLE PRECISION` | Approximate values (science) |
| `VARCHAR(n)` / `TEXT` | Strings (identical performance in PostgreSQL) |
| `BOOLEAN` | True/false |
| `DATE` / `TIMESTAMP` | Date and time |
| `TIMESTAMPTZ` | Timestamp with timezone (stores as UTC) |
| `UUID` | Universally unique identifiers |
| `JSONB` | Semi-structured data |
| `SERIAL` / `BIGSERIAL` | Auto-incrementing integer (legacy) |
| `GENERATED ALWAYS AS IDENTITY` | Modern auto-increment (SQL standard) |

**Financial data:** Always use `DECIMAL` or `NUMERIC`, never `FLOAT`. Floating-point math introduces rounding errors.

**Timestamps:** Always use `TIMESTAMPTZ` (timestamp with time zone) for anything involving real-world time. It normalizes to UTC on storage and converts on display.

### Constraints

```sql
CREATE TABLE products (
    product_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sku          VARCHAR(50) NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    price        DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category_id  INTEGER REFERENCES categories(category_id) ON DELETE RESTRICT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

| Constraint | Purpose |
|------------|---------|
| `PRIMARY KEY` | Unique row identifier, implicitly NOT NULL + UNIQUE |
| `NOT NULL` | Column must have a value |
| `UNIQUE` | No duplicate values (NULL is allowed multiple times) |
| `CHECK` | Custom validation (e.g., `price >= 0`) |
| `FOREIGN KEY` / `REFERENCES` | Referential integrity to another table |
| `DEFAULT` | Value used when not specified on INSERT |

### Foreign Key Actions

```sql
-- ON DELETE CASCADE: delete children when parent is deleted
-- ON DELETE RESTRICT: prevent deletion if children exist
-- ON DELETE SET NULL: set child FK column to NULL
-- ON DELETE SET DEFAULT: set child FK to its DEFAULT value
```

---

## 10. Basic DDL (Data Definition Language)

### CREATE TABLE

```sql
CREATE TABLE orders (
    order_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
    order_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    status      VARCHAR(20) NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total       DECIMAL(12,2) NOT NULL CHECK (total >= 0)
);
```

### ALTER TABLE

```sql
-- Add a column
ALTER TABLE orders ADD COLUMN notes TEXT;

-- Add a constraint
ALTER TABLE orders ADD CONSTRAINT chk_status
    CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'));

-- Rename a column
ALTER TABLE employees RENAME COLUMN name TO full_name;

-- Change a column type
ALTER TABLE products ALTER COLUMN price TYPE DECIMAL(12,2);

-- Drop a column
ALTER TABLE orders DROP COLUMN notes;
```

### DROP TABLE

```sql
-- Drop a table (irreversible)
DROP TABLE IF EXISTS temp_data;

-- Drop with cascade (also drops dependent objects like views)
DROP TABLE IF EXISTS categories CASCADE;
```

---

## Practice Exercises

1. Write a query to find the top 5 highest-paid employees in each department.
2. Find all customers who placed more than 3 orders in 2025.
3. Write a query using LEFT JOIN to find products that have never been ordered.
4. Create a table with appropriate data types and constraints for a blog system (posts, authors, tags).
5. Explain why `WHERE UPPER(email) = 'ALICE@EXAMPLE.COM'` prevents index use and how to fix it.

---

## Key Takeaways

- Always name columns explicitly in SELECT and INSERT
- Use parameterized queries to prevent SQL injection
- Understand NULL behavior: three-valued logic, IS NULL, COALESCE
- Use explicit JOIN ... ON syntax, never comma-separated FROM
- WHERE filters rows; HAVING filters groups
- NOT EXISTS handles NULLs correctly; NOT IN does not
- Composite indexes work left to right — column order matters
- Functions on indexed columns prevent index use
- Use DECIMAL for money, TIMESTAMPTZ for real-world time
- Always verify DELETE/UPDATE with SELECT first

---

## Next Steps

After completing this level, proceed to [SQL Mid](../SQL/Mid.md).
