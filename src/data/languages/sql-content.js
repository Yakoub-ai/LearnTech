export const content = {
  beginner: `# SQL Deep Dive — Beginner Level

## 1. SELECT Fundamentals

The \`SELECT\` statement is the cornerstone of SQL. Every time you retrieve data from a database, you use \`SELECT\`. Understanding its clauses deeply is the foundation for everything else in SQL.

### The Basic SELECT

At its simplest, \`SELECT\` retrieves columns from a table. The \`FROM\` clause tells the database which table to query.

\`\`\`sql
-- Select specific columns
SELECT first_name, last_name, email
FROM employees;

-- Select all columns (use sparingly in production)
SELECT *
FROM employees;

-- Select with column aliases for readability
SELECT
    first_name AS "First Name",
    last_name AS "Last Name",
    hire_date AS "Date Hired"
FROM employees;
\`\`\`

**Why it matters:** Selecting only the columns you need reduces network transfer, memory usage, and makes your queries self-documenting. \`SELECT *\` in production code is an anti-pattern because schema changes can break your application.

> **Role connection:** Backend developers write SELECT queries thousands of times. Data engineers use them to build ETL pipelines. Frontend developers consume the data these queries return through APIs.

### WHERE — Filtering Rows

The \`WHERE\` clause filters which rows are returned. It evaluates a condition for each row and only includes rows where the condition is true.

\`\`\`sql
-- Simple equality filter
SELECT first_name, last_name, department
FROM employees
WHERE department = 'Engineering';

-- Numeric comparison
SELECT product_name, price
FROM products
WHERE price > 50.00;

-- Date comparison
SELECT order_id, order_date, total
FROM orders
WHERE order_date >= '2025-01-01';

-- Combining conditions
SELECT first_name, last_name, salary
FROM employees
WHERE department = 'Engineering'
  AND salary > 80000;
\`\`\`

**Why it matters:** Without \`WHERE\`, you fetch every row in the table — potentially millions of records. Proper filtering is the first line of defense against slow queries and wasted resources.

### ORDER BY — Sorting Results

\`ORDER BY\` controls the order of your result set. Without it, the database returns rows in an arbitrary order (often insertion order, but never guaranteed).

\`\`\`sql
-- Sort ascending (default)
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary;

-- Sort descending
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- Multi-column sort
SELECT first_name, last_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;

-- Sort by column position (less readable, but useful in UNION queries)
SELECT first_name, last_name, salary
FROM employees
ORDER BY 3 DESC;

-- Sort by alias
SELECT
    first_name,
    last_name,
    salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;
\`\`\`

### LIMIT and OFFSET — Pagination

\`LIMIT\` restricts the number of rows returned. \`OFFSET\` skips a number of rows before starting to return results.

\`\`\`sql
-- Get top 10 highest-paid employees
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;

-- Pagination: page 2 with 20 items per page
SELECT product_name, price
FROM products
ORDER BY product_name
LIMIT 20 OFFSET 20;

-- PostgreSQL also supports FETCH FIRST syntax (SQL standard)
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 10 ROWS ONLY;
\`\`\`

**Why it matters:** APIs almost always paginate results. Understanding LIMIT/OFFSET is essential for building any list or table UI. Note that OFFSET-based pagination becomes slow on large datasets — cursor-based pagination is preferred at scale.

### DISTINCT — Removing Duplicates

\`DISTINCT\` eliminates duplicate rows from results.

\`\`\`sql
-- Get unique departments
SELECT DISTINCT department
FROM employees
ORDER BY department;

-- DISTINCT on multiple columns (unique combinations)
SELECT DISTINCT department, job_title
FROM employees
ORDER BY department, job_title;

-- Count distinct values
SELECT COUNT(DISTINCT department) AS department_count
FROM employees;
\`\`\`

\`\`\`mermaid
flowchart TD
    A[SELECT Statement] --> B[FROM - Which table?]
    B --> C[WHERE - Filter rows]
    C --> D[GROUP BY - Aggregate]
    D --> E[HAVING - Filter groups]
    E --> F[ORDER BY - Sort results]
    F --> G[LIMIT/OFFSET - Paginate]
\`\`\`

> The order above is the **logical processing order** of a SQL query. The database processes FROM first, then WHERE, then GROUP BY, and so on. Understanding this order helps you debug queries.

### EXERCISE: SELECT Fundamentals

\`\`\`sql
-- EXERCISE: Given a "products" table with columns:
-- product_id, product_name, category, price, stock_quantity, created_at

-- 1. Select all products in the 'Electronics' category, sorted by price descending
-- 2. Get the 5 most recently created products
-- 3. Find all unique categories
-- 4. Select products priced between $10 and $50, showing only name and price
\`\`\`

---

## 2. Filtering & Sorting

### Comparison Operators

SQL provides standard comparison operators that work on numbers, strings, and dates.

\`\`\`sql
-- Equality and inequality
SELECT * FROM products WHERE price = 29.99;
SELECT * FROM products WHERE category != 'Clothing';
SELECT * FROM products WHERE category <> 'Clothing'; -- Same as !=

-- Greater/less than
SELECT * FROM orders WHERE total > 100;
SELECT * FROM employees WHERE hire_date < '2024-01-01';

-- Greater/less than or equal
SELECT * FROM products WHERE stock_quantity >= 10;
SELECT * FROM orders WHERE total <= 500;
\`\`\`

### AND, OR, NOT — Logical Operators

Logical operators combine multiple conditions. Understanding operator precedence is critical.

\`\`\`sql
-- AND: both conditions must be true
SELECT * FROM employees
WHERE department = 'Engineering'
  AND salary > 90000;

-- OR: at least one condition must be true
SELECT * FROM employees
WHERE department = 'Engineering'
   OR department = 'Marketing';

-- NOT: negates a condition
SELECT * FROM products
WHERE NOT category = 'Discontinued';

-- IMPORTANT: AND has higher precedence than OR
-- This query is ambiguous without parentheses:
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Books'
  AND price > 20;

-- The above is actually evaluated as:
-- category = 'Electronics' OR (category = 'Books' AND price > 20)

-- Use parentheses to be explicit:
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Books')
  AND price > 20;
\`\`\`

**Why it matters:** Operator precedence bugs are among the most common SQL mistakes. Always use parentheses when mixing AND and OR. A missing parenthesis can silently return wrong results.

### IN — Matching Against a List

\`IN\` tests whether a value matches any value in a list. It is cleaner than chaining multiple \`OR\` conditions.

\`\`\`sql
-- Instead of multiple OR conditions
SELECT * FROM employees
WHERE department IN ('Engineering', 'Marketing', 'Sales');

-- NOT IN
SELECT * FROM employees
WHERE department NOT IN ('HR', 'Legal');

-- IN with a subquery
SELECT * FROM orders
WHERE customer_id IN (
    SELECT customer_id
    FROM customers
    WHERE country = 'Germany'
);
\`\`\`

### BETWEEN — Range Filtering

\`BETWEEN\` is inclusive on both ends. It works with numbers, dates, and strings.

\`\`\`sql
-- Numeric range (inclusive)
SELECT product_name, price
FROM products
WHERE price BETWEEN 10 AND 50;
-- Equivalent to: price >= 10 AND price <= 50

-- Date range
SELECT order_id, order_date
FROM orders
WHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';

-- NOT BETWEEN
SELECT * FROM products
WHERE price NOT BETWEEN 100 AND 500;
\`\`\`

### LIKE — Pattern Matching

\`LIKE\` performs pattern matching using wildcards: \`%\` (any sequence of characters) and \`_\` (single character).

\`\`\`sql
-- Starts with 'John'
SELECT * FROM employees WHERE first_name LIKE 'John%';

-- Ends with 'son'
SELECT * FROM employees WHERE last_name LIKE '%son';

-- Contains 'tech'
SELECT * FROM products WHERE product_name LIKE '%tech%';

-- Single character wildcard
SELECT * FROM products WHERE sku LIKE 'A_B__';
-- Matches: A1B23, AXB99, etc.

-- Case-insensitive matching (PostgreSQL)
SELECT * FROM employees WHERE first_name ILIKE 'john%';

-- Escape special characters
SELECT * FROM products WHERE description LIKE '%50\\%%' ESCAPE '\\';
-- Matches descriptions containing "50%"
\`\`\`

### IS NULL / IS NOT NULL

\`NULL\` represents the absence of a value. You cannot use \`=\` to check for NULL — you must use \`IS NULL\`.

\`\`\`sql
-- Find rows with NULL values
SELECT first_name, last_name, phone
FROM employees
WHERE phone IS NULL;

-- Find rows with non-NULL values
SELECT first_name, last_name, phone
FROM employees
WHERE phone IS NOT NULL;

-- Common mistake — this NEVER returns rows:
SELECT * FROM employees WHERE phone = NULL;  -- WRONG!

-- COALESCE: provide a default for NULL values
SELECT
    first_name,
    COALESCE(phone, 'No phone on file') AS phone
FROM employees;

-- NULLIF: return NULL if two values are equal
SELECT NULLIF(discount, 0) AS effective_discount
FROM orders;
\`\`\`

**Why it matters:** NULL handling is one of the trickiest parts of SQL. NULL propagates through expressions: \`NULL + 5 = NULL\`, \`NULL = NULL\` is not true (it is unknown). This "three-valued logic" causes subtle bugs in WHERE clauses and aggregations.

### EXERCISE: Filtering & Sorting

\`\`\`sql
-- EXERCISE: Given an "orders" table with columns:
-- order_id, customer_id, order_date, status, total, shipping_address, notes

-- 1. Find all orders with status 'pending' or 'processing' placed in 2025
-- 2. Find orders where notes contain the word 'urgent' (case-insensitive)
-- 3. Find orders with a total between $100 and $500, excluding cancelled orders
-- 4. Find orders where shipping_address is not provided
-- 5. List orders sorted by status (ascending) then total (descending)
\`\`\`

---

## 3. INSERT, UPDATE, DELETE

### INSERT — Adding Data

\`INSERT\` adds new rows to a table. Always specify column names for clarity and resilience to schema changes.

\`\`\`sql
-- Insert a single row with explicit columns
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES ('Jane', 'Smith', 'jane.smith@company.com', 'Engineering', 95000);

-- Insert multiple rows at once (much faster than separate INSERTs)
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES
    ('Widget A', 'Hardware', 29.99, 100),
    ('Widget B', 'Hardware', 39.99, 75),
    ('Gadget X', 'Electronics', 149.99, 50);

-- Insert with RETURNING (PostgreSQL) — get the generated ID back
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES ('Bob', 'Jones', 'bob.jones@company.com', 'Marketing', 72000)
RETURNING employee_id, first_name, last_name;

-- Insert from a SELECT (copy data between tables)
INSERT INTO employee_archive (first_name, last_name, email, department)
SELECT first_name, last_name, email, department
FROM employees
WHERE terminated_date IS NOT NULL;

-- Insert with ON CONFLICT (upsert in PostgreSQL)
INSERT INTO products (sku, product_name, price)
VALUES ('WIDGET-001', 'Widget A', 34.99)
ON CONFLICT (sku) DO UPDATE
SET price = EXCLUDED.price,
    updated_at = NOW();
\`\`\`

**Why it matters:** Understanding INSERT patterns is essential for any application that writes data. Bulk inserts (multi-row VALUES) are dramatically faster than inserting one row at a time. RETURNING eliminates the need for a follow-up SELECT.

### UPDATE — Modifying Data

\`UPDATE\` changes existing rows. Always include a \`WHERE\` clause unless you intentionally want to update every row.

\`\`\`sql
-- Update a single row
UPDATE employees
SET salary = 100000
WHERE employee_id = 42;

-- Update multiple columns
UPDATE employees
SET
    salary = 105000,
    department = 'Senior Engineering',
    updated_at = NOW()
WHERE employee_id = 42;

-- Update with a calculation
UPDATE products
SET price = price * 1.10  -- 10% price increase
WHERE category = 'Electronics';

-- Update with RETURNING
UPDATE employees
SET salary = salary * 1.05
WHERE department = 'Engineering'
RETURNING employee_id, first_name, salary AS new_salary;

-- Update from another table (PostgreSQL syntax)
UPDATE orders
SET status = 'vip_processing'
FROM customers
WHERE orders.customer_id = customers.customer_id
  AND customers.tier = 'VIP';

-- DANGEROUS: Update without WHERE affects ALL rows!
-- UPDATE employees SET salary = 0;  -- DO NOT RUN THIS!
\`\`\`

**Why it matters:** An UPDATE without a WHERE clause is one of the most common destructive mistakes in SQL. In production, always test your WHERE clause with a SELECT first.

### DELETE — Removing Data

\`DELETE\` removes rows from a table. Like UPDATE, always use a WHERE clause unless you mean to delete everything.

\`\`\`sql
-- Delete specific rows
DELETE FROM orders
WHERE status = 'cancelled'
  AND order_date < '2024-01-01';

-- Delete with RETURNING
DELETE FROM expired_sessions
WHERE expires_at < NOW()
RETURNING session_id, user_id;

-- Delete using a subquery
DELETE FROM products
WHERE product_id IN (
    SELECT product_id FROM products
    WHERE stock_quantity = 0
      AND last_sold_date < NOW() - INTERVAL '1 year'
);

-- TRUNCATE: faster than DELETE for removing all rows
-- Resets auto-increment, cannot be rolled back in some databases
TRUNCATE TABLE temp_import_data;

-- Safe deletion pattern: SELECT first, then DELETE
-- Step 1: Verify what will be deleted
SELECT * FROM orders
WHERE status = 'cancelled' AND order_date < '2024-01-01';
-- Step 2: If the results look correct, run the DELETE
DELETE FROM orders
WHERE status = 'cancelled' AND order_date < '2024-01-01';
\`\`\`

> **Role connection:** In production systems, many teams avoid hard DELETE and instead use "soft deletes" — setting a \`deleted_at\` timestamp column. This preserves data for auditing and makes recovery possible.

### EXERCISE: DML Operations

\`\`\`sql
-- EXERCISE:
-- 1. Insert 3 new products into a products table
-- 2. Increase the price of all 'Electronics' products by 15%
-- 3. Delete all orders older than 2 years with status 'cancelled'
-- 4. Write an upsert that updates a product's price if the SKU exists,
--    or inserts a new product if it does not
\`\`\`

---

## 4. JOINs

JOINs combine rows from two or more tables based on a related column. They are the fundamental mechanism for working with relational data.

### INNER JOIN

An \`INNER JOIN\` returns only rows that have matching values in both tables.

\`\`\`sql
-- Basic INNER JOIN
SELECT
    e.first_name,
    e.last_name,
    d.department_name,
    d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Multi-table JOIN
SELECT
    o.order_id,
    c.customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;
\`\`\`

\`\`\`mermaid
flowchart LR
    subgraph "INNER JOIN"
        A[Table A] --- C{Matching Rows}
        B[Table B] --- C
        C --> D[Result: Only matches]
    end
\`\`\`

### LEFT JOIN (LEFT OUTER JOIN)

A \`LEFT JOIN\` returns all rows from the left table and matching rows from the right table. Non-matching rows get NULL for the right table's columns.

\`\`\`sql
-- Find all employees, including those without a department
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- Find employees who are NOT in any department
SELECT
    e.first_name,
    e.last_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE d.department_id IS NULL;

-- Find customers who have never placed an order
SELECT
    c.customer_name,
    c.email
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
\`\`\`

**Why it matters:** LEFT JOIN with a NULL check is one of the most useful patterns in SQL. It efficiently finds "orphan" records — customers without orders, users without profiles, products without sales.

### RIGHT JOIN and FULL OUTER JOIN

\`\`\`sql
-- RIGHT JOIN: all rows from the right table
-- (less common; you can usually rewrite as a LEFT JOIN)
SELECT
    e.first_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- FULL OUTER JOIN: all rows from both tables
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- Find unmatched rows on EITHER side
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id IS NULL OR d.department_id IS NULL;
\`\`\`

### CROSS JOIN

A \`CROSS JOIN\` produces the Cartesian product — every combination of rows from both tables.

\`\`\`sql
-- Every combination of size and color
SELECT
    s.size_name,
    c.color_name
FROM sizes s
CROSS JOIN colors c
ORDER BY s.size_name, c.color_name;

-- Useful for generating date series with categories
SELECT
    d.date,
    cat.category_name
FROM generate_series('2025-01-01'::date, '2025-12-31'::date, '1 day') AS d(date)
CROSS JOIN categories cat;
\`\`\`

### Self-Joins

A self-join joins a table to itself. Common for hierarchical data like org charts.

\`\`\`sql
-- Find employees and their managers
SELECT
    emp.first_name AS employee,
    emp.last_name AS employee_last,
    mgr.first_name AS manager,
    mgr.last_name AS manager_last
FROM employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.employee_id;

-- Find products in the same category with a higher price
SELECT
    p1.product_name AS product,
    p2.product_name AS more_expensive_alternative,
    p1.price AS current_price,
    p2.price AS alternative_price
FROM products p1
INNER JOIN products p2
    ON p1.category = p2.category
    AND p2.price > p1.price
ORDER BY p1.product_name, p2.price;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "JOIN Types Visual"
        direction LR
        IJ["INNER JOIN<br/>Only matching rows"]
        LJ["LEFT JOIN<br/>All left + matching right"]
        RJ["RIGHT JOIN<br/>All right + matching left"]
        FJ["FULL OUTER JOIN<br/>All rows from both"]
        CJ["CROSS JOIN<br/>Every combination"]
    end
\`\`\`

### EXERCISE: JOINs

\`\`\`sql
-- EXERCISE: Given tables: customers, orders, order_items, products

-- 1. List all customers with their order count (include customers with 0 orders)
-- 2. Find products that have never been ordered
-- 3. Show each order with the customer name and total item count
-- 4. Find employees who report to the same manager
-- 5. Generate a report showing every product-month combination for 2025
\`\`\`

---

## 5. Aggregate Functions

Aggregate functions compute a single result from a set of input rows. They are essential for reporting and analytics.

### COUNT, SUM, AVG, MIN, MAX

\`\`\`sql
-- COUNT: number of rows
SELECT COUNT(*) AS total_employees FROM employees;

-- COUNT with column name skips NULLs
SELECT COUNT(phone) AS employees_with_phone FROM employees;

-- COUNT DISTINCT
SELECT COUNT(DISTINCT department) AS dept_count FROM employees;

-- SUM: total of numeric values
SELECT SUM(total) AS revenue
FROM orders
WHERE order_date >= '2025-01-01';

-- AVG: arithmetic mean
SELECT AVG(salary) AS avg_salary FROM employees;

-- MIN and MAX
SELECT
    MIN(price) AS cheapest,
    MAX(price) AS most_expensive,
    AVG(price) AS average_price
FROM products;

-- Combine multiple aggregates
SELECT
    COUNT(*) AS total_orders,
    SUM(total) AS total_revenue,
    AVG(total) AS avg_order_value,
    MIN(total) AS smallest_order,
    MAX(total) AS largest_order
FROM orders
WHERE status = 'completed';
\`\`\`

### GROUP BY

\`GROUP BY\` divides rows into groups and applies aggregate functions to each group.

\`\`\`sql
-- Revenue by department
SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    SUM(salary) AS total_payroll
FROM employees
GROUP BY department
ORDER BY total_payroll DESC;

-- Orders per month
SELECT
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*) AS order_count,
    SUM(total) AS monthly_revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- Multi-column GROUP BY
SELECT
    department,
    job_title,
    COUNT(*) AS headcount,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department, job_title
ORDER BY department, avg_salary DESC;
\`\`\`

**Why it matters:** GROUP BY is the basis of every business report: sales by region, users by signup month, errors by type. Understanding it well is non-negotiable for any database work.

### HAVING — Filtering Groups

\`HAVING\` filters groups after aggregation. \`WHERE\` filters rows before aggregation.

\`\`\`sql
-- Find departments with more than 10 employees
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;

-- Find products with total sales over $10,000
SELECT
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS total_sales
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.product_name
HAVING SUM(oi.quantity * oi.unit_price) > 10000
ORDER BY total_sales DESC;

-- WHERE vs HAVING
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2023-01-01'   -- Filters ROWS before grouping
GROUP BY department
HAVING AVG(salary) > 80000        -- Filters GROUPS after aggregation
ORDER BY avg_salary DESC;
\`\`\`

> **Role connection:** Data analysts spend most of their time writing GROUP BY queries for dashboards and reports. Backend developers use them for summary endpoints. Understanding the WHERE vs HAVING distinction prevents a whole class of bugs.

### EXERCISE: Aggregate Functions

\`\`\`sql
-- EXERCISE:
-- 1. Find the total revenue per product category
-- 2. List months where total revenue exceeded $50,000
-- 3. Find the top 5 customers by total spending
-- 4. Calculate the average order value per customer,
--    but only for customers with at least 3 orders
-- 5. Show the percentage of total revenue each category represents
\`\`\`

---

## 6. Subqueries

A subquery is a query nested inside another query. They enable powerful multi-step logic within a single SQL statement.

### Scalar Subqueries

A scalar subquery returns a single value and can be used anywhere a value is expected.

\`\`\`sql
-- Find employees earning above average
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Use scalar subquery in SELECT
SELECT
    first_name,
    last_name,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS above_avg
FROM employees
ORDER BY above_avg DESC;

-- Scalar subquery with MAX
SELECT *
FROM orders
WHERE total = (SELECT MAX(total) FROM orders);
\`\`\`

### Column and Table Subqueries

\`\`\`sql
-- IN with subquery (column subquery)
SELECT customer_name, email
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE total > 500
);

-- Table subquery (derived table) in FROM
SELECT
    dept_stats.department,
    dept_stats.avg_salary,
    dept_stats.employee_count
FROM (
    SELECT
        department,
        AVG(salary) AS avg_salary,
        COUNT(*) AS employee_count
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE dept_stats.avg_salary > 75000;
\`\`\`

### Correlated Subqueries

A correlated subquery references a column from the outer query. It executes once for each row of the outer query.

\`\`\`sql
-- Find employees earning more than their department average
SELECT e.first_name, e.last_name, e.salary, e.department
FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e.department
);

-- Find the most recent order for each customer
SELECT o.*
FROM orders o
WHERE o.order_date = (
    SELECT MAX(o2.order_date)
    FROM orders o2
    WHERE o2.customer_id = o.customer_id
);
\`\`\`

### EXISTS

\`EXISTS\` tests whether a subquery returns any rows. It is often more efficient than \`IN\` for large datasets.

\`\`\`sql
-- Find customers who have placed at least one order
SELECT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
);

-- Find products never ordered
SELECT p.product_name
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.product_id
);
\`\`\`

**Why it matters:** EXISTS often outperforms IN when the subquery returns many rows, because EXISTS can short-circuit — it stops as soon as it finds one matching row. NOT EXISTS is particularly useful and handles NULLs correctly, unlike NOT IN.

### EXERCISE: Subqueries

\`\`\`sql
-- EXERCISE:
-- 1. Find all products priced above the average product price
-- 2. Find customers whose total spending is in the top 10%
-- 3. For each department, find the employee with the highest salary
--    (use a correlated subquery)
-- 4. Find orders that contain at least one product from the 'Electronics' category
--    (use EXISTS)
\`\`\`

---

## 7. Basic Indexing

Indexes are data structures that speed up data retrieval. Without indexes, the database must scan every row in a table to find matches — a "sequential scan" or "full table scan."

### Creating Indexes

\`\`\`sql
-- Create a basic index on a single column
CREATE INDEX idx_employees_department
ON employees (department);

-- Create a unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_employees_email
ON employees (email);

-- Composite index (multi-column)
CREATE INDEX idx_orders_customer_date
ON orders (customer_id, order_date);

-- Drop an index
DROP INDEX idx_employees_department;
\`\`\`

### When to Index

\`\`\`mermaid
flowchart TD
    A[Should I add an index?] --> B{Is the column in WHERE, JOIN, or ORDER BY?}
    B -->|Yes| C{Is the table large?}
    B -->|No| D[Probably not needed]
    C -->|Yes| E{Is the column selective?}
    C -->|No| D
    E -->|Yes| F[Add an index]
    E -->|No| G[Index may not help much]
    F --> H{Heavy writes on this table?}
    H -->|Yes| I[Monitor write performance]
    H -->|No| J[Good to go]
\`\`\`

**Guidelines for indexing:**
- Index columns used in \`WHERE\`, \`JOIN\`, and \`ORDER BY\` clauses
- Index foreign key columns (they are not indexed automatically in PostgreSQL)
- High-selectivity columns benefit most (e.g., email vs. boolean status)
- Every index adds overhead to INSERT, UPDATE, and DELETE operations
- Composite indexes should list the most selective column first

### B-tree Concept

The default index type is a B-tree (balanced tree). It keeps data sorted, enabling efficient lookups, range scans, and ordering.

The B-tree is *balanced* — all leaf nodes live at the same depth. This guarantees that finding any value takes the same number of steps regardless of where it falls in the distribution. Leaf nodes form a doubly-linked list, which is what makes range scans efficient: the database finds the starting value via tree traversal, then walks through the linked leaf nodes until the range ends.

\`\`\`sql
-- B-tree indexes support these operations efficiently:
-- Equality: WHERE email = 'user@example.com'
-- Range: WHERE price BETWEEN 10 AND 50
-- Prefix: WHERE name LIKE 'John%' (but NOT '%John')
-- Ordering: ORDER BY created_at DESC

-- B-tree index on created_at enables efficient sorting
CREATE INDEX idx_orders_created ON orders (created_at DESC);
\`\`\`

**Why it matters:** An index only stores the values of the indexed columns plus a row ID pointing back to the full row. It is not a copy of the table ordered differently. If your query needs columns that are not in the index, the database must fetch those extra columns from the table for each matching row. In some cases — when the match set is large — a full table scan batches those reads more efficiently than millions of individual heap fetches.

### Function Calls Break Indexes

One of the most common indexing mistakes is wrapping an indexed column inside a function. When a function is applied to a column in a WHERE clause, the database cannot use a standard index on that column — the output of the function has no connection to the index's sorted values.

\`\`\`sql
-- BAD: function on indexed column prevents index use
SELECT SUM(total) FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2025;
-- Performs a full table scan even when order_date is indexed!

-- GOOD: rewrite as an explicit range so the B-tree is usable
SELECT SUM(total) FROM orders
WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';

-- The same trap applies to LOWER(), UPPER(), date parts, and any transformation:
-- BAD:  WHERE LOWER(email) = 'user@example.com'
-- GOOD: Create an expression index, or store the value pre-lowercased
CREATE INDEX idx_users_email_lower ON users (LOWER(email));
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';  -- Uses index
\`\`\`

### Column Order in Composite Indexes

When an index covers multiple columns, the order determines which queries it can accelerate. A composite index is usable only from left to right — you cannot skip the leading column.

\`\`\`sql
-- Index on (status, order_date)
CREATE INDEX idx_orders_status_date ON orders (status, order_date);

-- Uses both columns (equality on leading column, range on second)
SELECT * FROM orders WHERE status = 'pending' AND order_date > '2025-01-01';

-- Uses only the leading column
SELECT * FROM orders WHERE status = 'pending';

-- CANNOT use this index: skips the leading column
SELECT * FROM orders WHERE order_date > '2025-01-01';
-- For this query you need a separate index on order_date alone
\`\`\`

A column with an inequality operator (\`>\`, \`<\`, \`BETWEEN\`) acts as the last usable column in the index — the database cannot filter on subsequent columns after an inequality. Rule of thumb: put equality filters first, inequality filters last in a composite index.

### EXPLAIN Basics

\`EXPLAIN\` shows you the query plan — how the database will execute your query.

\`\`\`sql
-- Show the query plan
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

-- Show the plan with actual execution times
EXPLAIN ANALYZE SELECT * FROM employees WHERE department = 'Engineering';

-- Example output (simplified):
-- Seq Scan on employees  (cost=0.00..25.00 rows=5 width=100)
--   Filter: (department = 'Engineering')

-- After creating an index:
-- Index Scan using idx_employees_department on employees
--   Index Cond: (department = 'Engineering')
\`\`\`

Key things to look for in EXPLAIN output:
- **Seq Scan** on a large table where you expected an index scan — often a missing index, a function masking the column, or wrong column order in a composite index
- **rows** estimate: if the estimated rows are far off from actual rows, run \`ANALYZE\` to refresh planner statistics
- **key** (MySQL) / **Index Cond** (PostgreSQL): confirms which index is actually used; NULL or absent means no index is being used

**Why it matters:** EXPLAIN is how you diagnose slow queries methodically. A developer who can read an execution plan can fix a 30-second query in minutes; without it, performance tuning is guesswork.

### EXERCISE: Indexing

\`\`\`sql
-- EXERCISE:
-- 1. Create indexes to speed up these queries:
--    a. SELECT * FROM orders WHERE customer_id = 123 AND status = 'pending';
--    b. SELECT * FROM products WHERE category = 'Electronics' ORDER BY price;
-- 2. Run EXPLAIN on both queries before and after adding indexes
-- 3. Why would an index on a boolean column (like is_active) be less useful?
\`\`\`

---

## 8. Data Types & Constraints

### Common Data Types

\`\`\`sql
-- Numeric types
CREATE TABLE example_numbers (
    id          SERIAL PRIMARY KEY,       -- Auto-incrementing integer
    quantity    INTEGER NOT NULL,          -- Whole numbers
    price       DECIMAL(10, 2),           -- Exact decimal (10 digits, 2 after point)
    rating      NUMERIC(3, 2),            -- Same as DECIMAL
    big_number  BIGINT,                   -- Large integers
    is_active   BOOLEAN DEFAULT true      -- true/false
);

-- String types
CREATE TABLE example_strings (
    id          SERIAL PRIMARY KEY,
    code        CHAR(5),                  -- Fixed-length (padded with spaces)
    name        VARCHAR(255),             -- Variable-length with max
    description TEXT,                     -- Variable-length, no max
    sku         VARCHAR(50) NOT NULL
);

-- Date/time types
CREATE TABLE example_dates (
    id           SERIAL PRIMARY KEY,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    birth_date   DATE,                    -- Date only, no time
    start_time   TIME,                    -- Time only, no date
    duration     INTERVAL                 -- A span of time
);

-- Other useful types (PostgreSQL)
CREATE TABLE example_other (
    id           SERIAL PRIMARY KEY,
    metadata     JSONB,                   -- JSON data (binary, indexable)
    tags         TEXT[],                   -- Array of text
    ip_address   INET,                    -- IP address
    price_range  INT4RANGE,               -- Range type
    unique_id    UUID DEFAULT gen_random_uuid()
);
\`\`\`

### Constraints

Constraints enforce data integrity at the database level. They prevent invalid data from ever entering your tables.

\`\`\`sql
-- PRIMARY KEY: uniquely identifies each row
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL
);

-- Composite primary key
CREATE TABLE order_items (
    order_id    INTEGER,
    product_id  INTEGER,
    quantity    INTEGER NOT NULL,
    unit_price  DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

-- FOREIGN KEY: enforces referential integrity
CREATE TABLE orders (
    order_id     SERIAL PRIMARY KEY,
    customer_id  INTEGER NOT NULL,
    order_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    total        DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- UNIQUE: no duplicate values
CREATE TABLE users (
    user_id  SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email    VARCHAR(255) UNIQUE NOT NULL
);

-- CHECK: custom validation
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price        DECIMAL(10, 2) CHECK (price >= 0),
    stock        INTEGER CHECK (stock >= 0),
    category     VARCHAR(50),
    created_at   TIMESTAMP DEFAULT NOW(),
    CONSTRAINT valid_category CHECK (
        category IN ('Electronics', 'Clothing', 'Books', 'Food', 'Other')
    )
);

-- NOT NULL: prevents NULL values
-- DEFAULT: provides a value when none is specified
CREATE TABLE audit_log (
    log_id      SERIAL PRIMARY KEY,
    action      VARCHAR(50) NOT NULL,
    table_name  VARCHAR(100) NOT NULL,
    record_id   INTEGER NOT NULL,
    changed_by  VARCHAR(100) NOT NULL,
    changed_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
\`\`\`

\`\`\`mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : "appears in"
    CUSTOMERS {
        int customer_id PK
        varchar email UK
        varchar name
    }
    ORDERS {
        int order_id PK
        int customer_id FK
        date order_date
        decimal total
    }
    ORDER_ITEMS {
        int order_id PK
        int product_id PK
        int quantity
        decimal unit_price
    }
    PRODUCTS {
        int product_id PK
        varchar product_name
        decimal price
        int stock
    }
\`\`\`

**Why it matters:** Constraints are your safety net. They catch bugs at the database level before bad data propagates through your application. A missing FOREIGN KEY can lead to orphaned records. A missing NOT NULL can cause NullPointerExceptions in your application code.

> **Role connection:** Schema design with proper types and constraints is a critical skill for backend developers, data engineers, and DBAs. Getting the schema right at the start saves enormous refactoring effort later.

### EXERCISE: Data Types & Constraints

\`\`\`sql
-- EXERCISE:
-- 1. Design a schema for a blog application with tables:
--    users, posts, comments, tags, post_tags (many-to-many)
-- 2. Include appropriate data types, primary keys, foreign keys,
--    NOT NULL, UNIQUE, CHECK, and DEFAULT constraints
-- 3. Add an index on posts.author_id and comments.post_id
-- 4. What happens when you try to delete a user who has posts?
--    How should you handle this with ON DELETE?
\`\`\`

---

## Summary — Beginner Level

You now have a solid foundation in SQL:
- **SELECT** to retrieve data with filtering, sorting, and pagination
- **Filtering** with comparison operators, logical operators, and pattern matching
- **DML** operations to insert, update, and delete data safely
- **JOINs** to combine data across related tables
- **Aggregations** for summarizing data into reports
- **Subqueries** for multi-step logic within a single query
- **Indexes** to speed up queries on large tables
- **Data types and constraints** to design robust schemas

Next up in the Mid level: window functions, CTEs, transactions, views, and query optimization.

---

## Recommended Videos — Beginner

- **freeCodeCamp** — "SQL Tutorial – Full Database Course for Beginners" — https://www.youtube.com/watch?v=HXV3zeQKqGY
`,
  mid: `# SQL Deep Dive — Mid Level

## 1. Window Functions

Window functions perform calculations across a set of rows that are related to the current row — without collapsing them into a single output row like GROUP BY does. They are one of the most powerful features in SQL.

### ROW_NUMBER, RANK, DENSE_RANK

These functions assign a number to each row within a partition.

\`\`\`sql
-- ROW_NUMBER: unique sequential number, no ties
SELECT
    employee_id,
    first_name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS dept_rank
FROM employees;

-- RANK: same rank for ties, skips numbers after ties
-- DENSE_RANK: same rank for ties, does NOT skip numbers
SELECT
    product_name,
    category,
    price,
    RANK() OVER (ORDER BY price DESC) AS price_rank,
    DENSE_RANK() OVER (ORDER BY price DESC) AS price_dense_rank
FROM products;

-- Example output:
-- Product     | Price  | RANK | DENSE_RANK
-- Widget A    | 100.00 |    1 |          1
-- Widget B    | 100.00 |    1 |          1
-- Widget C    |  90.00 |    3 |          2   <-- RANK skips 2, DENSE_RANK does not
-- Widget D    |  80.00 |    4 |          3
\`\`\`

**Why it matters:** Window functions solve problems that are extremely cumbersome with subqueries — like "get the top N per group" or "find the second highest salary per department."

### Top-N Per Group

\`\`\`sql
-- Get the top 3 highest-paid employees per department
WITH ranked AS (
    SELECT
        first_name,
        last_name,
        department,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS rn
    FROM employees
)
SELECT first_name, last_name, department, salary
FROM ranked
WHERE rn <= 3;
\`\`\`

### LEAD and LAG

\`LEAD\` looks at the next row, \`LAG\` looks at the previous row within the partition.

\`\`\`sql
-- Compare each month's revenue with the previous month
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue,
    LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC('month', order_date)) AS prev_month,
    SUM(total) - LAG(SUM(total)) OVER (
        ORDER BY DATE_TRUNC('month', order_date)
    ) AS month_over_month_change,
    ROUND(
        (SUM(total) - LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC('month', order_date)))
        / LAG(SUM(total)) OVER (ORDER BY DATE_TRUNC('month', order_date)) * 100,
        2
    ) AS pct_change
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- Track employee salary history changes
SELECT
    employee_id,
    effective_date,
    salary,
    LAG(salary) OVER (PARTITION BY employee_id ORDER BY effective_date) AS prev_salary,
    salary - LAG(salary) OVER (
        PARTITION BY employee_id ORDER BY effective_date
    ) AS salary_change
FROM salary_history;
\`\`\`

### NTILE

\`NTILE\` distributes rows into a specified number of roughly equal groups (buckets).

\`\`\`sql
-- Divide customers into quartiles by total spending
SELECT
    customer_id,
    customer_name,
    total_spent,
    NTILE(4) OVER (ORDER BY total_spent DESC) AS spending_quartile
FROM (
    SELECT
        c.customer_id,
        c.customer_name,
        SUM(o.total) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.customer_name
) customer_totals;

-- Percentile ranking
SELECT
    product_name,
    price,
    NTILE(100) OVER (ORDER BY price) AS price_percentile
FROM products;
\`\`\`

### SUM OVER — Running Totals and Moving Averages

\`\`\`sql
-- Running total of revenue
SELECT
    order_date,
    total,
    SUM(total) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders
ORDER BY order_date;

-- 7-day moving average
SELECT
    order_date,
    daily_revenue,
    AVG(daily_revenue) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM (
    SELECT
        order_date,
        SUM(total) AS daily_revenue
    FROM orders
    GROUP BY order_date
) daily;

-- Cumulative percentage
SELECT
    department,
    salary_total,
    SUM(salary_total) OVER (ORDER BY salary_total DESC) AS cumulative,
    ROUND(
        SUM(salary_total) OVER (ORDER BY salary_total DESC) * 100.0
        / SUM(salary_total) OVER (),
        2
    ) AS cumulative_pct
FROM (
    SELECT department, SUM(salary) AS salary_total
    FROM employees
    GROUP BY department
) dept_salaries;
\`\`\`

\`\`\`mermaid
flowchart LR
    subgraph "Window Function Frame"
        A["UNBOUNDED PRECEDING"]
        B["3 PRECEDING"]
        C["CURRENT ROW"]
        D["3 FOLLOWING"]
        E["UNBOUNDED FOLLOWING"]
    end
    A --> B --> C --> D --> E
\`\`\`

**Why it matters:** Running totals and moving averages are essential for financial reporting, dashboards, and time-series analysis. Without window functions, these calculations require self-joins or application-level code that is both slower and harder to maintain.

### EXERCISE: Window Functions

\`\`\`sql
-- EXERCISE:
-- 1. Rank products within each category by sales volume
-- 2. Calculate month-over-month growth percentage for revenue
-- 3. Find the 2nd most recent order for each customer
-- 4. Compute a 30-day moving average of daily signups
-- 5. Assign customers to deciles (10 groups) by lifetime value
\`\`\`

---

## 2. Common Table Expressions (CTEs)

CTEs (using the \`WITH\` clause) create named temporary result sets that exist only for the duration of a single query. They improve readability and enable complex multi-step logic.

### Basic CTEs

\`\`\`sql
-- Simple CTE
WITH active_customers AS (
    SELECT customer_id, customer_name, email
    FROM customers
    WHERE status = 'active'
)
SELECT
    ac.customer_name,
    COUNT(o.order_id) AS order_count
FROM active_customers ac
LEFT JOIN orders o ON ac.customer_id = o.customer_id
GROUP BY ac.customer_name;

-- Multiple CTEs
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', order_date)
),
monthly_costs AS (
    SELECT
        DATE_TRUNC('month', expense_date) AS month,
        SUM(amount) AS costs
    FROM expenses
    GROUP BY DATE_TRUNC('month', expense_date)
)
SELECT
    r.month,
    r.revenue,
    c.costs,
    r.revenue - COALESCE(c.costs, 0) AS profit
FROM monthly_revenue r
LEFT JOIN monthly_costs c ON r.month = c.month
ORDER BY r.month;
\`\`\`

**Why it matters:** CTEs make complex queries readable. Instead of deeply nested subqueries that are hard to parse, CTEs let you name each logical step and build on it sequentially — like writing well-factored functions.

> **Role connection:** In data engineering, CTEs are the bread and butter of building data transformation pipelines within SQL (especially in tools like dbt). Backend developers use them for complex business logic queries.

### Chained CTEs

CTEs can reference earlier CTEs in the same WITH block.

\`\`\`sql
WITH
-- Step 1: Calculate total spending per customer
customer_spending AS (
    SELECT
        customer_id,
        SUM(total) AS total_spent,
        COUNT(*) AS order_count,
        MAX(order_date) AS last_order_date
    FROM orders
    GROUP BY customer_id
),
-- Step 2: Classify customers into tiers
customer_tiers AS (
    SELECT
        cs.*,
        CASE
            WHEN total_spent >= 10000 THEN 'Platinum'
            WHEN total_spent >= 5000 THEN 'Gold'
            WHEN total_spent >= 1000 THEN 'Silver'
            ELSE 'Bronze'
        END AS tier
    FROM customer_spending cs
),
-- Step 3: Aggregate by tier
tier_summary AS (
    SELECT
        tier,
        COUNT(*) AS customer_count,
        AVG(total_spent) AS avg_spending,
        AVG(order_count) AS avg_orders
    FROM customer_tiers
    GROUP BY tier
)
SELECT * FROM tier_summary ORDER BY avg_spending DESC;
\`\`\`

### EXERCISE: CTEs

\`\`\`sql
-- EXERCISE:
-- 1. Write a CTE-based query to find "churned" customers
--    (no order in the last 90 days, but had orders before)
-- 2. Build a multi-step CTE that:
--    a. Calculates daily revenue
--    b. Adds 7-day and 30-day moving averages
--    c. Flags days where revenue dropped more than 20% from the 7-day average
\`\`\`

---

## 3. Recursive Queries

Recursive CTEs allow a query to reference itself, enabling traversal of hierarchical or graph-like data structures.

### Basic Recursive CTE Structure

\`\`\`sql
-- Recursive CTE has two parts:
-- 1. Base case (anchor): the starting point
-- 2. Recursive case: references the CTE itself

-- Generate a sequence of numbers 1-10
WITH RECURSIVE numbers AS (
    -- Base case
    SELECT 1 AS n
    UNION ALL
    -- Recursive case
    SELECT n + 1
    FROM numbers
    WHERE n < 10
)
SELECT n FROM numbers;
\`\`\`

### Organizational Hierarchy (Tree Traversal)

\`\`\`sql
-- Org chart: find all reports under a manager (direct and indirect)
WITH RECURSIVE org_tree AS (
    -- Base case: start with the CEO (or target manager)
    SELECT
        employee_id,
        first_name,
        last_name,
        manager_id,
        0 AS depth,
        first_name || ' ' || last_name AS path
    FROM employees
    WHERE manager_id IS NULL  -- CEO has no manager

    UNION ALL

    -- Recursive case: find direct reports
    SELECT
        e.employee_id,
        e.first_name,
        e.last_name,
        e.manager_id,
        ot.depth + 1,
        ot.path || ' > ' || e.first_name || ' ' || e.last_name
    FROM employees e
    INNER JOIN org_tree ot ON e.manager_id = ot.employee_id
)
SELECT
    REPEAT('  ', depth) || first_name || ' ' || last_name AS org_chart,
    depth,
    path
FROM org_tree
ORDER BY path;
\`\`\`

### Bill of Materials

\`\`\`sql
-- BOM: find all components of a product, including sub-components
WITH RECURSIVE bom AS (
    -- Base case: top-level product
    SELECT
        component_id,
        component_name,
        parent_id,
        quantity,
        1 AS level,
        ARRAY[component_id] AS path
    FROM components
    WHERE parent_id IS NULL AND component_id = 1  -- Product #1

    UNION ALL

    -- Recursive: sub-components
    SELECT
        c.component_id,
        c.component_name,
        c.parent_id,
        c.quantity * bom.quantity AS quantity,  -- Multiply quantities down
        bom.level + 1,
        bom.path || c.component_id
    FROM components c
    INNER JOIN bom ON c.parent_id = bom.component_id
    WHERE NOT c.component_id = ANY(bom.path)  -- Cycle detection!
)
SELECT
    REPEAT('  ', level - 1) || component_name AS component,
    quantity,
    level
FROM bom
ORDER BY path;
\`\`\`

### Cycle Detection

\`\`\`sql
-- Detect cycles in a graph (e.g., circular references)
WITH RECURSIVE graph_walk AS (
    SELECT
        node_id,
        connected_to,
        ARRAY[node_id] AS visited,
        false AS has_cycle
    FROM edges
    WHERE node_id = 1

    UNION ALL

    SELECT
        e.node_id,
        e.connected_to,
        gw.visited || e.connected_to,
        e.connected_to = ANY(gw.visited) AS has_cycle
    FROM edges e
    INNER JOIN graph_walk gw ON e.node_id = gw.connected_to
    WHERE NOT e.connected_to = ANY(gw.visited)
)
SELECT * FROM graph_walk;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Recursive CTE Execution"
        A["Anchor Query<br/>(Base Case)"] --> B["Working Table<br/>(Current iteration)"]
        B --> C{"More rows?"}
        C -->|Yes| D["Recursive Query<br/>(References CTE)"]
        D --> B
        C -->|No| E["Final Result Set"]
    end
\`\`\`

**Why it matters:** Recursive queries handle hierarchical data that would otherwise require multiple round trips to the database or complex application logic. Org charts, category trees, file systems, and dependency graphs all benefit from recursive CTEs.

### EXERCISE: Recursive Queries

\`\`\`sql
-- EXERCISE:
-- 1. Build an org chart query that shows each employee's
--    full chain of command from CEO to them
-- 2. Given a "categories" table with parent_id, build a breadcrumb
--    path for each category (e.g., "Electronics > Computers > Laptops")
-- 3. Write a recursive query that generates a date series
--    from 2025-01-01 to 2025-12-31
\`\`\`

---

## 4. Transactions & ACID

### What is ACID?

\`\`\`mermaid
flowchart LR
    A["<b>A</b>tomicity<br/>All or nothing"] --> B["<b>C</b>onsistency<br/>Valid state to valid state"]
    B --> C["<b>I</b>solation<br/>Concurrent transactions<br/>don't interfere"]
    C --> D["<b>D</b>urability<br/>Committed data<br/>survives crashes"]
\`\`\`

### BEGIN, COMMIT, ROLLBACK

\`\`\`sql
-- Basic transaction
BEGIN;
    UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;
COMMIT;

-- If something goes wrong, rollback
BEGIN;
    UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
    -- Oops, target account does not exist
    UPDATE accounts SET balance = balance + 500 WHERE account_id = 999;
    -- Check if the update affected any rows
    -- If not, rollback
ROLLBACK;

-- Practical pattern in application code (pseudocode):
-- try {
--     BEGIN;
--     ... multiple operations ...
--     COMMIT;
-- } catch (error) {
--     ROLLBACK;
--     throw error;
-- }
\`\`\`

**Why it matters:** Without transactions, a failure between two related operations (like a money transfer) can leave your data in an inconsistent state — money debited from one account but never credited to another.

### Savepoints

Savepoints allow partial rollbacks within a transaction.

\`\`\`sql
BEGIN;
    INSERT INTO orders (customer_id, total) VALUES (1, 100.00);
    SAVEPOINT order_created;

    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (currval('orders_order_id_seq'), 42, 2);

    -- Something goes wrong with the item
    ROLLBACK TO SAVEPOINT order_created;

    -- The order INSERT is preserved, try a different item
    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (currval('orders_order_id_seq'), 43, 1);

COMMIT;
\`\`\`

### Isolation Levels

\`\`\`sql
-- Read Uncommitted (PostgreSQL treats this as Read Committed)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- Read Committed (PostgreSQL default) — each statement sees
-- only data committed before the statement began
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read — the transaction sees a snapshot from
-- its start; no phantom reads
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable — strongest isolation; transactions behave
-- as if executed one at a time
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

| Isolation Level  | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
|-----------------|-------------|---------------------|---------------|
| Read Uncommitted | Possible    | Possible            | Possible      |
| Read Committed   | Prevented   | Possible            | Possible      |
| Repeatable Read  | Prevented   | Prevented           | Possible*     |
| Serializable     | Prevented   | Prevented           | Prevented     |

*PostgreSQL's Repeatable Read actually prevents phantom reads too.

### Deadlocks

\`\`\`sql
-- Deadlock scenario:
-- Transaction 1:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- waits for Transaction 2 to release lock on account_id = 2
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Transaction 2 (concurrent):
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE account_id = 2;
-- waits for Transaction 1 to release lock on account_id = 1
UPDATE accounts SET balance = balance + 50 WHERE account_id = 1;
-- DEADLOCK! The database will detect this and abort one transaction.

-- Prevention: always lock resources in a consistent order
-- (e.g., always lock the lower account_id first)
BEGIN;
UPDATE accounts SET balance = balance - 100
WHERE account_id = 1;  -- Lock 1 first
UPDATE accounts SET balance = balance + 100
WHERE account_id = 2;  -- Then lock 2
COMMIT;
\`\`\`

> **Role connection:** Every backend developer who works with databases must understand transactions. Mishandled transactions cause data corruption, lost updates, and race conditions that are extremely hard to debug in production.

### EXERCISE: Transactions

\`\`\`sql
-- EXERCISE:
-- 1. Write a transaction that transfers money between accounts,
--    verifying sufficient balance before the transfer
-- 2. Write a transaction with a savepoint that inserts an order
--    and its items, rolling back only the items if they fail
-- 3. Describe a scenario where Repeatable Read prevents a bug
--    that Read Committed would allow
\`\`\`

---

## 5. Views & Materialized Views

### Creating Views

A view is a named query that acts like a virtual table. It does not store data — it re-executes the query each time it is accessed.

\`\`\`sql
-- Create a view for active customer summary
CREATE VIEW active_customer_summary AS
SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total) AS total_spent,
    MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE c.status = 'active'
GROUP BY c.customer_id, c.customer_name, c.email;

-- Use the view like a table
SELECT * FROM active_customer_summary
WHERE total_spent > 1000
ORDER BY total_spent DESC;

-- Views can reference other views
CREATE VIEW vip_customers AS
SELECT *
FROM active_customer_summary
WHERE total_spent >= 10000;
\`\`\`

**Why it matters:** Views encapsulate complex queries, provide a stable interface to changing schemas, and can enforce security by exposing only certain columns to certain users.

### Updatable Views

Some views allow INSERT, UPDATE, and DELETE operations to pass through to the underlying table.

\`\`\`sql
-- Simple views on a single table are automatically updatable
CREATE VIEW active_employees AS
SELECT employee_id, first_name, last_name, email, department, salary
FROM employees
WHERE status = 'active';

-- This UPDATE modifies the underlying employees table
UPDATE active_employees
SET salary = 95000
WHERE employee_id = 42;

-- WITH CHECK OPTION prevents rows from "disappearing" from the view
CREATE VIEW active_employees_checked AS
SELECT employee_id, first_name, last_name, email, department, salary, status
FROM employees
WHERE status = 'active'
WITH CHECK OPTION;

-- This would FAIL because the row would no longer match the view's WHERE:
UPDATE active_employees_checked
SET status = 'inactive'
WHERE employee_id = 42;
-- ERROR: new row violates check option for view
\`\`\`

### Materialized Views

Materialized views store the query result physically. They are faster to read but need to be refreshed to stay current.

\`\`\`sql
-- Create a materialized view for a slow dashboard query
CREATE MATERIALIZED VIEW monthly_sales_report AS
SELECT
    DATE_TRUNC('month', o.order_date) AS month,
    p.category,
    COUNT(DISTINCT o.order_id) AS order_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.status = 'completed'
GROUP BY DATE_TRUNC('month', o.order_date), p.category;

-- Create an index on the materialized view for fast queries
CREATE INDEX idx_msr_month ON monthly_sales_report (month);

-- Query it like a regular table (fast — reads stored data)
SELECT * FROM monthly_sales_report
WHERE month >= '2025-01-01'
ORDER BY month, category;

-- Refresh the materialized view (re-runs the query and replaces data)
REFRESH MATERIALIZED VIEW monthly_sales_report;

-- Concurrent refresh (does not lock reads while refreshing)
-- Requires a UNIQUE index
CREATE UNIQUE INDEX idx_msr_unique ON monthly_sales_report (month, category);
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_report;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "View Types"
        V["Regular View<br/>Re-executes query each time<br/>Always fresh data<br/>No storage overhead"]
        MV["Materialized View<br/>Stores result physically<br/>Fast reads<br/>Must be refreshed"]
    end
    V -->|"Too slow?"| MV
    MV -->|"Need real-time?"| V
\`\`\`

### Refresh Strategies

\`\`\`sql
-- Strategy 1: Cron job (refresh on a schedule)
-- Run via pg_cron or external scheduler
-- REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_report;

-- Strategy 2: Trigger-based (refresh after data changes)
CREATE OR REPLACE FUNCTION refresh_sales_report()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_report;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_refresh_sales
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_sales_report();
-- WARNING: This can be slow for high-write tables

-- Strategy 3: Lazy refresh (track staleness, refresh on read if stale)
-- Implemented in application logic
\`\`\`

### EXERCISE: Views

\`\`\`sql
-- EXERCISE:
-- 1. Create a view that shows each product with its total sales,
--    average rating, and stock status
-- 2. Create a materialized view for a monthly revenue dashboard
-- 3. Add a unique index and set up concurrent refresh
-- 4. When would you choose a regular view vs. a materialized view?
\`\`\`

---

## 6. Query Optimization

### EXPLAIN ANALYZE

\`EXPLAIN ANALYZE\` actually runs the query and shows both the planned and actual execution metrics.

\`\`\`sql
-- Basic explain
EXPLAIN ANALYZE
SELECT c.customer_name, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01'
GROUP BY c.customer_name
ORDER BY total_spent DESC;

-- Key things to look for in the output:
-- 1. Seq Scan vs Index Scan (Index is usually better for selective queries)
-- 2. Actual rows vs estimated rows (large difference = stale statistics)
-- 3. Nested Loop vs Hash Join vs Merge Join
-- 4. Sort method: quicksort vs top-N heapsort vs external merge
-- 5. Total execution time
\`\`\`

### Reading an Execution Plan

\`\`\`sql
-- Example execution plan (annotated):
-- Sort  (cost=150.23..152.12 rows=750 width=48)
--        (actual time=5.123..5.234 rows=750 loops=1)
--   Sort Key: total_spent DESC
--   Sort Method: quicksort  Memory: 80kB
--   -> HashAggregate  (cost=100.00..120.00 rows=750 width=48)
--          (actual time=4.012..4.567 rows=750 loops=1)
--        Group Key: c.customer_name
--        -> Hash Join  (cost=25.00..85.00 rows=5000 width=36)
--               (actual time=0.456..3.012 rows=5000 loops=1)
--             Hash Cond: (o.customer_id = c.customer_id)
--             -> Seq Scan on orders o  (cost=0.00..45.00 rows=5000 width=12)
--                    (actual time=0.012..1.234 rows=5000 loops=1)
--                  Filter: (order_date >= '2025-01-01')
--                  Rows Removed by Filter: 3000
--             -> Hash  (cost=15.00..15.00 rows=800 width=28)
--                    (actual time=0.234..0.234 rows=800 loops=1)
--                  -> Seq Scan on customers c  ...
-- Planning Time: 0.234 ms
-- Execution Time: 5.456 ms
\`\`\`

### Index Selection Strategies

\`\`\`sql
-- Composite index for multi-column queries
-- Column order matters! Most selective first, or match your WHERE clause
CREATE INDEX idx_orders_status_date ON orders (status, order_date);

-- This query uses the index efficiently:
SELECT * FROM orders WHERE status = 'pending' AND order_date > '2025-01-01';

-- This query can use the index (leading column matches):
SELECT * FROM orders WHERE status = 'pending';

-- This query CANNOT use the index (skips the leading column):
SELECT * FROM orders WHERE order_date > '2025-01-01';
-- For this query, you need a separate index on order_date

-- Covering index (includes all needed columns, avoids table lookup)
CREATE INDEX idx_orders_covering ON orders (customer_id)
INCLUDE (order_date, total, status);

-- Index for LIKE queries
CREATE INDEX idx_products_name_pattern ON products
USING btree (product_name varchar_pattern_ops);
-- Now this is fast: WHERE product_name LIKE 'Widget%'
\`\`\`

### Query Rewriting

\`\`\`sql
-- Anti-pattern: OR on different columns prevents index use
SELECT * FROM orders
WHERE customer_id = 123 OR order_date = '2025-06-01';

-- Rewrite with UNION for better index usage
SELECT * FROM orders WHERE customer_id = 123
UNION
SELECT * FROM orders WHERE order_date = '2025-06-01';

-- Anti-pattern: function on indexed column prevents index use
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2025;

-- Rewrite to use range instead
SELECT * FROM orders
WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';

-- Anti-pattern: implicit type conversion
SELECT * FROM users WHERE phone = 5551234;  -- phone is VARCHAR

-- Fix: use matching type
SELECT * FROM users WHERE phone = '5551234';

-- Anti-pattern: SELECT * with JOIN (fetches unnecessary data)
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.customer_id;

-- Fix: select only needed columns
SELECT o.order_id, o.total, c.customer_name
FROM orders o JOIN customers c ON o.customer_id = c.customer_id;
\`\`\`

### Statistics

\`\`\`sql
-- Update statistics for the query planner
ANALYZE orders;
ANALYZE customers;

-- Update statistics for all tables
ANALYZE;

-- Check current statistics
SELECT
    schemaname,
    tablename,
    n_live_tup,
    n_dead_tup,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
\`\`\`

**Why it matters:** Query optimization is a critical skill for anyone working with databases at scale. A single slow query can bring down an entire application. Understanding execution plans lets you fix performance problems methodically rather than guessing.

### EXERCISE: Query Optimization

\`\`\`sql
-- EXERCISE:
-- 1. Run EXPLAIN ANALYZE on a query with and without an index.
--    Compare the execution times and scan types.
-- 2. Find a query that uses Seq Scan and rewrite it or add an
--    index to switch it to Index Scan.
-- 3. Identify which of these queries can use an index on (status, order_date):
--    a. WHERE status = 'active'
--    b. WHERE order_date = '2025-01-01'
--    c. WHERE status = 'active' AND order_date > '2025-01-01'
--    d. WHERE status IN ('active', 'pending') AND order_date > '2025-01-01'
\`\`\`

---

## 7. Normalization

Normalization is the process of organizing data to reduce redundancy and improve integrity. Understanding normal forms helps you design efficient, reliable schemas.

### First Normal Form (1NF)

A table is in 1NF if every column contains only atomic (indivisible) values and there are no repeating groups.

\`\`\`sql
-- VIOLATION of 1NF: multiple values in one column
-- | order_id | products            |
-- | 1        | Widget, Gadget, Bolt|

-- FIXED: one value per cell
-- order_items table:
-- | order_id | product_id |
-- | 1        | 10         |
-- | 1        | 20         |
-- | 1        | 30         |
\`\`\`

### Second Normal Form (2NF)

1NF + every non-key column depends on the entire primary key (no partial dependencies). Relevant for composite primary keys.

\`\`\`sql
-- VIOLATION of 2NF (composite key: order_id, product_id)
-- | order_id | product_id | product_name | quantity |
-- product_name depends only on product_id, not the full key

-- FIXED: separate into two tables
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL
);

CREATE TABLE order_items (
    order_id   INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity   INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
\`\`\`

### Third Normal Form (3NF)

2NF + no transitive dependencies (non-key columns depend only on the primary key, not on other non-key columns).

\`\`\`sql
-- VIOLATION of 3NF:
-- employees: employee_id, department_id, department_name, department_location
-- department_name depends on department_id, not on employee_id

-- FIXED: move department info to its own table
CREATE TABLE departments (
    department_id   SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location        VARCHAR(100)
);

CREATE TABLE employees (
    employee_id   SERIAL PRIMARY KEY,
    first_name    VARCHAR(50) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id)
);
\`\`\`

### Beyond 3NF — BCNF, 4NF, 5NF

\`\`\`sql
-- Boyce-Codd Normal Form (BCNF):
-- Every determinant is a candidate key.
-- Rarely violated if you are already in 3NF.

-- 4NF: No multi-valued dependencies
-- Example violation: a student can have multiple hobbies AND multiple
-- phone numbers, stored in one table:
-- | student_id | hobby    | phone      |
-- This creates spurious combinations.

-- FIXED: separate tables
CREATE TABLE student_hobbies (
    student_id INTEGER REFERENCES students(student_id),
    hobby      VARCHAR(100),
    PRIMARY KEY (student_id, hobby)
);

CREATE TABLE student_phones (
    student_id INTEGER REFERENCES students(student_id),
    phone      VARCHAR(20),
    PRIMARY KEY (student_id, phone)
);

-- 5NF: Join dependencies — very rare in practice.
-- The table cannot be decomposed into smaller tables and
-- reconstructed via joins without loss.
\`\`\`

### Denormalization Trade-offs

\`\`\`sql
-- Normalized (3NF): requires JOIN at query time
SELECT
    o.order_id,
    c.customer_name,
    c.email
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- Denormalized: customer_name stored directly on orders
-- Faster reads, but data can become inconsistent
SELECT order_id, customer_name, customer_email
FROM orders_denormalized;

-- When to denormalize:
-- 1. Read-heavy workloads with rare writes
-- 2. Reporting/analytics tables
-- 3. When JOIN performance is a proven bottleneck
-- 4. Caching layers (materialized views)

-- When to stay normalized:
-- 1. Write-heavy workloads (updates in one place)
-- 2. Data integrity is critical
-- 3. Storage efficiency matters
-- 4. The schema is still evolving
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Unnormalized Data"] --> B["1NF: Atomic values"]
    B --> C["2NF: No partial dependencies"]
    C --> D["3NF: No transitive dependencies"]
    D --> E["BCNF: Every determinant is a key"]
    E --> F["4NF: No multi-valued dependencies"]
    F --> G["5NF: No join dependencies"]

    D -.->|"Most applications<br/>stop here"| H["Good enough<br/>for production"]
    E -.->|"Denormalize for<br/>read performance"| I["Strategic<br/>denormalization"]
\`\`\`

### EXERCISE: Normalization

\`\`\`sql
-- EXERCISE:
-- 1. Identify the normal form violations in this table:
--    | student_id | name    | courses          | advisor_name | advisor_dept |
--    | 1          | Alice   | Math, Physics    | Dr. Smith    | Science      |
-- 2. Normalize it to 3NF, creating appropriate tables
-- 3. For a high-traffic e-commerce product page, what data would
--    you denormalize and why?
\`\`\`

---

## 8. Stored Procedures & Functions

### Creating Functions

\`\`\`sql
-- Simple function returning a scalar value
CREATE OR REPLACE FUNCTION calculate_tax(subtotal DECIMAL, tax_rate DECIMAL DEFAULT 0.08)
RETURNS DECIMAL AS $$
BEGIN
    RETURN ROUND(subtotal * tax_rate, 2);
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT
    order_id,
    total,
    calculate_tax(total) AS tax,
    total + calculate_tax(total) AS total_with_tax
FROM orders;

-- Function returning a table
CREATE OR REPLACE FUNCTION get_department_report(dept_name VARCHAR)
RETURNS TABLE (
    employee_name TEXT,
    salary DECIMAL,
    hire_date DATE,
    years_of_service DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.first_name || ' ' || e.last_name,
        e.salary,
        e.hire_date,
        ROUND(EXTRACT(EPOCH FROM (NOW() - e.hire_date)) / 86400 / 365.25, 1)
    FROM employees e
    WHERE e.department = dept_name
    ORDER BY e.salary DESC;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM get_department_report('Engineering');
\`\`\`

### Control Flow

\`\`\`sql
CREATE OR REPLACE FUNCTION categorize_customer(customer_id_param INTEGER)
RETURNS TEXT AS $$
DECLARE
    total_spent DECIMAL;
    order_count INTEGER;
    last_order DATE;
    result TEXT;
BEGIN
    -- Get customer metrics
    SELECT
        COALESCE(SUM(total), 0),
        COUNT(*),
        MAX(order_date)
    INTO total_spent, order_count, last_order
    FROM orders
    WHERE customer_id = customer_id_param;

    -- IF/ELSIF/ELSE
    IF order_count = 0 THEN
        result := 'No Orders';
    ELSIF total_spent >= 10000 AND last_order >= CURRENT_DATE - INTERVAL '90 days' THEN
        result := 'VIP Active';
    ELSIF total_spent >= 10000 THEN
        result := 'VIP Inactive';
    ELSIF total_spent >= 1000 THEN
        result := 'Regular';
    ELSE
        result := 'Low Value';
    END IF;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- LOOP example: process items in batches
CREATE OR REPLACE FUNCTION archive_old_orders(cutoff_date DATE, batch_size INTEGER DEFAULT 1000)
RETURNS INTEGER AS $$
DECLARE
    total_archived INTEGER := 0;
    batch_count INTEGER;
BEGIN
    LOOP
        -- Move a batch of old orders to archive
        WITH moved AS (
            DELETE FROM orders
            WHERE order_id IN (
                SELECT order_id FROM orders
                WHERE order_date < cutoff_date
                AND status = 'completed'
                LIMIT batch_size
            )
            RETURNING *
        )
        INSERT INTO orders_archive SELECT * FROM moved;

        GET DIAGNOSTICS batch_count = ROW_COUNT;
        total_archived := total_archived + batch_count;

        -- Exit when no more rows to process
        EXIT WHEN batch_count = 0;

        -- Give other transactions a chance
        PERFORM pg_sleep(0.1);
    END LOOP;

    RETURN total_archived;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Error Handling

\`\`\`sql
CREATE OR REPLACE FUNCTION safe_transfer(
    from_account INTEGER,
    to_account INTEGER,
    amount DECIMAL
)
RETURNS TEXT AS $$
DECLARE
    from_balance DECIMAL;
BEGIN
    -- Validate amount
    IF amount <= 0 THEN
        RAISE EXCEPTION 'Transfer amount must be positive: %', amount;
    END IF;

    -- Check balance
    SELECT balance INTO from_balance
    FROM accounts
    WHERE account_id = from_account
    FOR UPDATE;  -- Lock the row

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Source account % not found', from_account;
    END IF;

    IF from_balance < amount THEN
        RAISE EXCEPTION 'Insufficient funds. Balance: %, Requested: %',
            from_balance, amount;
    END IF;

    -- Perform transfer
    UPDATE accounts SET balance = balance - amount WHERE account_id = from_account;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_account;

    -- Log the transfer
    INSERT INTO transfer_log (from_account, to_account, amount, transferred_at)
    VALUES (from_account, to_account, amount, NOW());

    RETURN 'Transfer successful';

EXCEPTION
    WHEN OTHERS THEN
        -- Log the error
        INSERT INTO error_log (error_message, error_detail, occurred_at)
        VALUES (SQLERRM, SQLSTATE, NOW());
        -- Re-raise the exception
        RAISE;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Stored Procedures (PostgreSQL 11+)

Procedures differ from functions in that they can manage transactions (COMMIT/ROLLBACK within the body).

\`\`\`sql
CREATE OR REPLACE PROCEDURE process_pending_orders()
LANGUAGE plpgsql AS $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT order_id, customer_id, total
        FROM orders
        WHERE status = 'pending'
        ORDER BY order_date
    LOOP
        BEGIN
            -- Process each order
            UPDATE orders SET status = 'processing' WHERE order_id = rec.order_id;
            INSERT INTO order_events (order_id, event_type, created_at)
            VALUES (rec.order_id, 'processing_started', NOW());

            -- Commit each order independently
            COMMIT;
        EXCEPTION
            WHEN OTHERS THEN
                ROLLBACK;
                INSERT INTO order_errors (order_id, error, occurred_at)
                VALUES (rec.order_id, SQLERRM, NOW());
                COMMIT;
        END;
    END LOOP;
END;
$$;

-- Call a procedure
CALL process_pending_orders();
\`\`\`

> **Role connection:** Stored procedures and functions move business logic into the database. This can be beneficial for performance (no network round trips) and for enforcing rules regardless of which application accesses the database. However, it can make testing and version control harder, so many teams prefer application-level logic with transactions.

### EXERCISE: Stored Procedures & Functions

\`\`\`sql
-- EXERCISE:
-- 1. Write a function that takes a product_id and returns its
--    total sales, average order quantity, and number of orders
-- 2. Write a function with error handling that creates a user
--    account, checking for duplicate email and username
-- 3. Write a procedure that processes refunds in batches,
--    committing after each batch
\`\`\`

---

## Summary — Mid Level

You have now mastered intermediate SQL concepts:
- **Window functions** for row-by-row calculations without collapsing groups
- **CTEs** for readable, composable multi-step queries
- **Recursive queries** for hierarchical data traversal
- **Transactions** for safe, atomic multi-operation changes
- **Views** and **materialized views** for query encapsulation and caching
- **Query optimization** using EXPLAIN, indexes, and rewriting patterns
- **Normalization** principles for designing clean schemas
- **Stored procedures** and **functions** for database-level logic

Next up in the Senior level: execution plan internals, index internals, partitioning, locking, performance tuning, migrations, and advanced patterns.

---

## Recommended Videos — Mid Level

- **Kai Sassnowski** — "Things every developer absolutely, positively needs to know about database indexing" — https://www.youtube.com/watch?v=HubezKbFL7E
- **freeCodeCamp** — "SQL Tutorial – Full Database Course for Beginners" — https://www.youtube.com/watch?v=HXV3zeQKqGY
`,
  senior: `# SQL Deep Dive — Senior Level

## 1. Execution Plans Deep Dive

Understanding execution plans in depth is what separates developers who can write queries from developers who can make queries fast. The query planner translates your SQL into a physical execution plan — a tree of operations that fetches, filters, joins, and sorts data.

### Scan Types

\`\`\`sql
-- Sequential Scan (Seq Scan)
-- Reads every row in the table. Used when no suitable index exists
-- or when a large percentage of rows need to be read.
EXPLAIN ANALYZE
SELECT * FROM orders WHERE total > 10;
-- Seq Scan on orders (cost=0.00..1500.00 rows=45000 width=64)
--   Filter: (total > 10)

-- Index Scan
-- Traverses the B-tree index to find matching rows, then fetches
-- the actual row data from the table (heap).
EXPLAIN ANALYZE
SELECT * FROM orders WHERE order_id = 12345;
-- Index Scan using orders_pkey on orders (cost=0.43..8.45 rows=1 width=64)
--   Index Cond: (order_id = 12345)

-- Index Only Scan
-- All needed columns are in the index. No table (heap) access needed.
-- This is the fastest scan type.
CREATE INDEX idx_orders_covering ON orders (customer_id) INCLUDE (total, order_date);

EXPLAIN ANALYZE
SELECT customer_id, total, order_date FROM orders WHERE customer_id = 100;
-- Index Only Scan using idx_orders_covering on orders
--   Index Cond: (customer_id = 100)
--   Heap Fetches: 0  <-- No table access!

-- Bitmap Index Scan + Bitmap Heap Scan
-- For medium-selectivity queries. Builds a bitmap of matching pages,
-- then reads those pages in physical order (reduces random I/O).
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'pending';
-- Bitmap Heap Scan on orders (cost=25.00..500.00 rows=2000 width=64)
--   Recheck Cond: (status = 'pending')
--   -> Bitmap Index Scan on idx_orders_status (cost=0.00..24.50 rows=2000)
--        Index Cond: (status = 'pending')
\`\`\`

\`\`\`mermaid
flowchart TD
    Q["Query"] --> P["Planner"]
    P --> S1{"How many rows<br/>match?"}
    S1 -->|"Few rows<br/>(< ~5%)"| IS["Index Scan"]
    S1 -->|"Medium<br/>(~5-20%)"| BIS["Bitmap Index Scan<br/>+ Bitmap Heap Scan"]
    S1 -->|"Many rows<br/>(> ~20%)"| SS["Sequential Scan"]
    S1 -->|"All columns<br/>in index"| IOS["Index Only Scan"]
\`\`\`

### Join Algorithms

The planner chooses between three join algorithms based on table sizes, available indexes, and sort order.

\`\`\`sql
-- Nested Loop Join
-- For each row in the outer table, scan the inner table.
-- Best when: outer table is small, inner table has an index on the join column.
-- Cost: O(N * M) without index, O(N * log M) with index
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_id = 12345;
-- Nested Loop (cost=0.86..16.90 rows=1 width=36)
--   -> Index Scan using orders_pkey on orders o (cost=0.43..8.45 rows=1)
--        Index Cond: (order_id = 12345)
--   -> Index Scan using customers_pkey on customers c (cost=0.43..8.45 rows=1)
--        Index Cond: (customer_id = o.customer_id)

-- Hash Join
-- Builds a hash table from the smaller table, then probes it with rows
-- from the larger table. Best for: large tables without useful indexes.
-- Cost: O(N + M) but needs memory for the hash table
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
-- Hash Join (cost=25.00..2000.00 rows=50000 width=36)
--   Hash Cond: (o.customer_id = c.customer_id)
--   -> Seq Scan on orders o (cost=0.00..1500.00 rows=50000)
--   -> Hash (cost=15.00..15.00 rows=800)
--        -> Seq Scan on customers c (cost=0.00..15.00 rows=800)

-- Merge Join
-- Both inputs must be sorted on the join key. Walks through both
-- sorted lists simultaneously. Best for: pre-sorted data or large datasets.
-- Cost: O(N log N + M log M) for sorting, O(N + M) for merging
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.customer_id;
-- Merge Join (cost=500.00..1500.00 rows=50000 width=36)
--   Merge Cond: (o.customer_id = c.customer_id)
--   -> Index Scan using idx_orders_customer on orders o
--   -> Index Scan using customers_pkey on customers c
\`\`\`

### Cost Model

\`\`\`sql
-- Understanding cost numbers:
-- cost=startup_cost..total_cost
-- startup_cost: cost before the first row can be returned
-- total_cost: cost to return all rows

-- Rows: estimated number of rows
-- Width: estimated average row size in bytes
-- Actual time: real execution time in milliseconds
-- Loops: number of times this node was executed

-- Force specific join strategies for testing (never in production):
SET enable_hashjoin = off;
SET enable_mergejoin = off;
SET enable_nestloop = off;

-- Reset to defaults
RESET enable_hashjoin;
RESET enable_mergejoin;
RESET enable_nestloop;

-- Check planner cost constants
SHOW seq_page_cost;       -- Default: 1.0
SHOW random_page_cost;    -- Default: 4.0 (SSD: set to 1.1-1.5)
SHOW cpu_tuple_cost;      -- Default: 0.01
SHOW effective_cache_size; -- Hint about OS cache size
\`\`\`

**Why it matters:** When you see a slow query in production, the execution plan is your diagnostic tool. Understanding scan types, join algorithms, and cost estimates lets you identify the bottleneck and choose the right fix — whether it is adding an index, rewriting the query, or adjusting database configuration.

### EXERCISE: Execution Plans

\`\`\`sql
-- EXERCISE:
-- 1. Take a complex query with 3+ JOINs and run EXPLAIN ANALYZE.
--    Identify: which join algorithm is used for each join, which
--    tables use index scans vs. seq scans, and where the most time is spent.
-- 2. Force the planner to use a different join strategy (disable one type).
--    Compare the execution time. Why did the planner choose the original strategy?
-- 3. Find a query where estimated rows differ significantly from actual rows.
--    Run ANALYZE on the affected tables and re-check.
\`\`\`

---

## 2. Index Internals

### B-tree Structure

The B-tree is the default and most commonly used index type in PostgreSQL. Understanding its internal structure helps you design better indexes.

\`\`\`sql
-- B-tree properties:
-- - Balanced tree: all leaf nodes are at the same depth
-- - Leaf nodes contain pointers to table rows (heap tuples)
-- - Internal nodes contain separator keys for navigation
-- - Doubly-linked leaf nodes enable efficient range scans
-- - Default fill factor: 90% (10% reserved for updates)

-- Create a B-tree index (explicit — btree is the default)
CREATE INDEX idx_orders_date ON orders USING btree (order_date);

-- B-tree supports these operations efficiently:
-- =, <, >, <=, >=, BETWEEN, IN
-- IS NULL, IS NOT NULL
-- Pattern matching with LIKE 'prefix%' (not '%suffix')
-- ORDER BY (can return results in sorted order)

-- Inspect index size and properties
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS index_size,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'orders'
ORDER BY pg_relation_size(indexname::regclass) DESC;
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "B-tree Index Structure"
        R["Root Node<br/>[40, 80]"]
        R --> N1["Internal Node<br/>[10, 20, 30]"]
        R --> N2["Internal Node<br/>[50, 60, 70]"]
        R --> N3["Internal Node<br/>[90, 100]"]
        N1 --> L1["Leaf: 1-10<br/>-> heap"]
        N1 --> L2["Leaf: 11-20<br/>-> heap"]
        N1 --> L3["Leaf: 21-30<br/>-> heap"]
        N2 --> L4["Leaf: 41-50<br/>-> heap"]
        L1 ---|"linked list"| L2
        L2 ---|"linked list"| L3
    end
\`\`\`

### Hash Indexes

\`\`\`sql
-- Hash indexes: O(1) lookup for equality only
-- Since PostgreSQL 10, hash indexes are WAL-logged and crash-safe
CREATE INDEX idx_users_email_hash ON users USING hash (email);

-- Hash indexes support ONLY equality (=) operations
-- They do NOT support: <, >, range scans, ORDER BY, pattern matching
-- Use when: you only need exact-match lookups and the column has high cardinality

-- When to use hash vs. B-tree:
-- B-tree: range queries, ORDER BY, LIKE prefix, general purpose
-- Hash: equality-only lookups, potentially smaller for very large values
\`\`\`

### GIN (Generalized Inverted Index)

GIN indexes map values to sets of rows. They are ideal for multi-valued data types.

\`\`\`sql
-- GIN for full-text search
CREATE INDEX idx_products_search ON products
USING gin (to_tsvector('english', product_name || ' ' || description));

SELECT * FROM products
WHERE to_tsvector('english', product_name || ' ' || description)
    @@ to_tsquery('english', 'wireless & bluetooth');

-- GIN for JSONB
CREATE INDEX idx_events_data ON events USING gin (data);

-- Contains key
SELECT * FROM events WHERE data ? 'error_code';

-- Contains key-value pair
SELECT * FROM events WHERE data @> '{"status": "failed"}';

-- GIN for array columns
CREATE INDEX idx_posts_tags ON posts USING gin (tags);

SELECT * FROM posts WHERE tags @> ARRAY['sql', 'performance'];
SELECT * FROM posts WHERE tags && ARRAY['sql', 'postgresql'];
\`\`\`

### GiST (Generalized Search Tree)

GiST supports more complex data types like geometric data, ranges, and full-text search.

\`\`\`sql
-- GiST for range types
CREATE INDEX idx_events_during ON events USING gist (during);

-- Find overlapping time ranges
SELECT * FROM events
WHERE during && tsrange('2025-06-01', '2025-06-30');

-- GiST for geometric data
CREATE INDEX idx_locations_point ON locations USING gist (coordinates);

-- Find locations within a radius
SELECT * FROM locations
WHERE coordinates <-> point(40.7128, -74.0060) < 0.1;

-- GiST for nearest-neighbor search (KNN)
SELECT *, coordinates <-> point(40.7128, -74.0060) AS distance
FROM locations
ORDER BY coordinates <-> point(40.7128, -74.0060)
LIMIT 10;
\`\`\`

### Partial Indexes

A partial index covers only rows matching a WHERE condition. Smaller index = faster lookups and less write overhead.

\`\`\`sql
-- Index only pending orders (tiny fraction of all orders)
CREATE INDEX idx_orders_pending ON orders (order_date)
WHERE status = 'pending';

-- This query uses the partial index:
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'pending' AND order_date > '2025-01-01';

-- Index only active users (most queries filter for active)
CREATE INDEX idx_users_active_email ON users (email)
WHERE is_active = true;

-- Partial unique index (unique email only among active users)
CREATE UNIQUE INDEX idx_users_unique_active_email ON users (email)
WHERE is_active = true;
-- Allows: same email for an active and a deactivated user
\`\`\`

### Expression Indexes

\`\`\`sql
-- Index on a computed expression
CREATE INDEX idx_users_lower_email ON users (LOWER(email));

-- Now this query uses the index:
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- Index on date part
CREATE INDEX idx_orders_year ON orders (EXTRACT(YEAR FROM order_date));

-- Index on JSON field
CREATE INDEX idx_events_error_code ON events ((data->>'error_code'));

SELECT * FROM events WHERE data->>'error_code' = 'E404';
\`\`\`

### Covering Indexes (INCLUDE)

\`\`\`sql
-- A covering index includes extra columns that are not part of the
-- search key but are needed by the query. This enables Index Only Scans.

CREATE INDEX idx_orders_customer_covering ON orders (customer_id)
INCLUDE (order_date, total, status);

-- This query can be answered entirely from the index:
SELECT customer_id, order_date, total, status
FROM orders
WHERE customer_id = 100;
-- Index Only Scan — no heap (table) access needed

-- Without INCLUDE, those extra columns would require a heap fetch
-- for every matching row, which is much slower.
\`\`\`

**Why it matters:** Index selection is one of the highest-leverage performance decisions in database design. The wrong index wastes disk space and slows writes without speeding reads. The right index turns a 30-second query into a 3-millisecond query.

### EXERCISE: Index Internals

\`\`\`sql
-- EXERCISE:
-- 1. Create a GIN index on a JSONB column and demonstrate queries
--    that use it vs. queries that cannot use it.
-- 2. Create a partial index for "recent orders" (last 30 days).
--    Show the size difference vs. a full index on the same column.
-- 3. Design a covering index for a query used in your application's
--    most-viewed page. Verify it produces an Index Only Scan.
-- 4. Compare the size and performance of a B-tree vs. hash index
--    on a UUID column with equality-only queries.
\`\`\`

---

## 3. Partitioning

Partitioning splits a large table into smaller physical pieces (partitions) while maintaining a single logical table interface. It is essential for managing tables with hundreds of millions or billions of rows.

### Range Partitioning

\`\`\`sql
-- Create a partitioned table (range by date)
CREATE TABLE events (
    event_id    BIGSERIAL,
    event_type  VARCHAR(50) NOT NULL,
    payload     JSONB,
    created_at  TIMESTAMP NOT NULL,
    PRIMARY KEY (event_id, created_at)  -- Partition key must be in PK
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE events_2024 PARTITION OF events
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE events_2025_q1 PARTITION OF events
    FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');

CREATE TABLE events_2025_q2 PARTITION OF events
    FOR VALUES FROM ('2025-04-01') TO ('2025-07-01');

CREATE TABLE events_2025_q3 PARTITION OF events
    FOR VALUES FROM ('2025-07-01') TO ('2025-10-01');

CREATE TABLE events_2025_q4 PARTITION OF events
    FOR VALUES FROM ('2025-10-01') TO ('2026-01-01');

-- Create a default partition for data outside defined ranges
CREATE TABLE events_default PARTITION OF events DEFAULT;

-- Indexes are created per-partition
CREATE INDEX idx_events_type ON events (event_type);
-- This creates an index on EACH partition automatically
\`\`\`

### List Partitioning

\`\`\`sql
-- Partition by discrete values (e.g., region)
CREATE TABLE sales (
    sale_id     BIGSERIAL,
    region      VARCHAR(20) NOT NULL,
    amount      DECIMAL(12, 2),
    sale_date   DATE NOT NULL,
    PRIMARY KEY (sale_id, region)
) PARTITION BY LIST (region);

CREATE TABLE sales_north_america PARTITION OF sales
    FOR VALUES IN ('US', 'CA', 'MX');

CREATE TABLE sales_europe PARTITION OF sales
    FOR VALUES IN ('UK', 'DE', 'FR', 'IT', 'ES');

CREATE TABLE sales_asia PARTITION OF sales
    FOR VALUES IN ('JP', 'CN', 'KR', 'IN');

CREATE TABLE sales_other PARTITION OF sales DEFAULT;
\`\`\`

### Hash Partitioning

\`\`\`sql
-- Hash partitioning for even data distribution
CREATE TABLE user_sessions (
    session_id  UUID NOT NULL,
    user_id     INTEGER NOT NULL,
    data        JSONB,
    created_at  TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id)
) PARTITION BY HASH (session_id);

-- Create 8 hash partitions
CREATE TABLE user_sessions_0 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 0);
CREATE TABLE user_sessions_1 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 1);
CREATE TABLE user_sessions_2 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 2);
CREATE TABLE user_sessions_3 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 3);
CREATE TABLE user_sessions_4 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 4);
CREATE TABLE user_sessions_5 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 5);
CREATE TABLE user_sessions_6 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 6);
CREATE TABLE user_sessions_7 PARTITION OF user_sessions
    FOR VALUES WITH (MODULUS 8, REMAINDER 7);
\`\`\`

### Partition Pruning

\`\`\`sql
-- The planner automatically skips irrelevant partitions
-- when the query filter matches the partition key

EXPLAIN ANALYZE
SELECT * FROM events
WHERE created_at >= '2025-04-01' AND created_at < '2025-07-01';

-- Output shows only events_2025_q2 is scanned:
-- Append
--   -> Seq Scan on events_2025_q2
--        Filter: (created_at >= '2025-04-01' AND created_at < '2025-07-01')
-- (Other partitions are pruned — not even mentioned in the plan)

-- Verify partition pruning is enabled
SHOW enable_partition_pruning;  -- Should be 'on'
\`\`\`

### Partition Maintenance

\`\`\`sql
-- Drop old partitions (much faster than DELETE)
DROP TABLE events_2023;

-- Detach a partition (keeps the data in a standalone table)
ALTER TABLE events DETACH PARTITION events_2024;

-- Attach an existing table as a partition
ALTER TABLE events ATTACH PARTITION events_2024_reloaded
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Automated partition management with pg_partman
-- (extension, not built-in)
-- CREATE EXTENSION pg_partman;
-- SELECT partman.create_parent(
--     p_parent_table => 'public.events',
--     p_control => 'created_at',
--     p_type => 'native',
--     p_interval => '1 month'
-- );

-- Split a partition (PostgreSQL 17+)
-- ALTER TABLE events SPLIT PARTITION events_2025_q1 INTO
--     (PARTITION events_2025_01 FOR VALUES FROM ('2025-01-01') TO ('2025-02-01'),
--      PARTITION events_2025_02 FOR VALUES FROM ('2025-02-01') TO ('2025-03-01'),
--      PARTITION events_2025_03 FOR VALUES FROM ('2025-03-01') TO ('2025-04-01'));
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Partitioned Table: events"
        PT["events (logical)"]
        PT --> P1["events_2024<br/>Range: 2024"]
        PT --> P2["events_2025_q1<br/>Range: Jan-Mar 2025"]
        PT --> P3["events_2025_q2<br/>Range: Apr-Jun 2025"]
        PT --> P4["events_2025_q3<br/>Range: Jul-Sep 2025"]
        PT --> P5["events_2025_q4<br/>Range: Oct-Dec 2025"]
        PT --> PD["events_default<br/>Everything else"]
    end
    Q["Query: WHERE created_at<br/>BETWEEN Apr 1 and Jun 30"] -.->|"Partition Pruning"| P3
\`\`\`

**Why it matters:** Partitioning is critical for tables that grow without bound — event logs, time-series data, audit trails. Without partitioning, these tables become unmanageable: indexes grow huge, VACUUM takes hours, and DROP TABLE is the only fast way to remove old data.

### EXERCISE: Partitioning

\`\`\`sql
-- EXERCISE:
-- 1. Design a partitioning strategy for a table that stores
--    100 million log entries per month
-- 2. Create monthly partitions for 2025 and a default partition
-- 3. Write a query that benefits from partition pruning and verify
--    with EXPLAIN ANALYZE
-- 4. Write a script to detach and archive partitions older than 1 year
\`\`\`

---

## 4. Locking & Concurrency

### Row-Level Locks

\`\`\`sql
-- SELECT ... FOR UPDATE: exclusive lock on selected rows
-- Other transactions that try to UPDATE/DELETE/FOR UPDATE these rows will WAIT
BEGIN;
SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE;
-- Now this row is locked until COMMIT or ROLLBACK
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;

-- SELECT ... FOR SHARE: shared lock (allows other FOR SHARE, blocks FOR UPDATE)
BEGIN;
SELECT * FROM products WHERE product_id = 42 FOR SHARE;
-- Other transactions can read and FOR SHARE, but cannot UPDATE or FOR UPDATE
COMMIT;

-- NOWAIT: fail immediately if the row is locked
BEGIN;
SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE NOWAIT;
-- ERROR: could not obtain lock on row

-- SKIP LOCKED: skip rows that are already locked
-- Useful for job queues
SELECT * FROM job_queue
WHERE status = 'pending'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
\`\`\`

### Table-Level Locks

\`\`\`sql
-- PostgreSQL table lock modes (from weakest to strongest):
-- ACCESS SHARE          — acquired by SELECT
-- ROW SHARE             — acquired by SELECT FOR UPDATE/SHARE
-- ROW EXCLUSIVE         — acquired by INSERT/UPDATE/DELETE
-- SHARE UPDATE EXCLUSIVE — acquired by VACUUM, CREATE INDEX CONCURRENTLY
-- SHARE                 — acquired by CREATE INDEX (non-concurrent)
-- SHARE ROW EXCLUSIVE   — not auto-acquired, used explicitly
-- EXCLUSIVE             — blocks ROW SHARE and above
-- ACCESS EXCLUSIVE      — acquired by ALTER TABLE, DROP TABLE, VACUUM FULL

-- Explicit table lock
BEGIN;
LOCK TABLE products IN SHARE MODE;
-- Now no one can INSERT/UPDATE/DELETE products until we commit
-- But they can still SELECT
COMMIT;

-- Check current locks
SELECT
    l.locktype,
    l.relation::regclass AS table_name,
    l.mode,
    l.granted,
    a.pid,
    a.query,
    a.state
FROM pg_locks l
JOIN pg_stat_activity a ON l.pid = a.pid
WHERE l.relation IS NOT NULL
ORDER BY l.relation;
\`\`\`

### Advisory Locks

Advisory locks are application-level locks managed by PostgreSQL but not tied to any table or row.

\`\`\`sql
-- Session-level advisory lock (held until session ends or explicit unlock)
SELECT pg_advisory_lock(12345);  -- Lock with ID 12345
-- ... do work ...
SELECT pg_advisory_unlock(12345);

-- Transaction-level advisory lock (released at COMMIT/ROLLBACK)
BEGIN;
SELECT pg_advisory_xact_lock(12345);
-- ... do work ...
COMMIT;  -- Lock automatically released

-- Try lock (non-blocking)
SELECT pg_try_advisory_lock(12345);  -- Returns true if acquired, false if not

-- Two-argument form (for more granular locking)
-- e.g., lock "orders" table (OID) + specific order_id
SELECT pg_advisory_lock(
    'orders'::regclass::integer,
    42  -- order_id
);

-- Use case: prevent duplicate processing of the same job
-- Application code:
-- if pg_try_advisory_lock(hash_of_job_id):
--     process_job()
--     pg_advisory_unlock(hash_of_job_id)
-- else:
--     skip (another worker is processing this job)
\`\`\`

### MVCC (Multi-Version Concurrency Control)

\`\`\`sql
-- PostgreSQL uses MVCC: readers never block writers, writers never block readers.
-- Each transaction sees a snapshot of the database.

-- How MVCC works internally:
-- Every row has hidden system columns:
--   xmin: transaction ID that inserted this row
--   xmax: transaction ID that deleted/updated this row (0 if still alive)
--   ctid: physical location of the row on disk

-- See MVCC columns
SELECT xmin, xmax, ctid, * FROM employees WHERE employee_id = 1;

-- When you UPDATE a row in PostgreSQL:
-- 1. The old row version gets xmax set to the current transaction ID
-- 2. A NEW row version is created with xmin = current transaction ID
-- 3. The old version becomes a "dead tuple" (cleaned up by VACUUM)

-- This means:
-- - Updates create new row versions (write amplification)
-- - Dead tuples accumulate until VACUUM runs
-- - Indexes may point to dead tuples (index bloat)
-- - Long-running transactions prevent VACUUM from cleaning up
\`\`\`

### Optimistic vs. Pessimistic Locking

\`\`\`sql
-- PESSIMISTIC LOCKING: lock the row before reading
-- Use when: conflicts are frequent, or the cost of retry is high
BEGIN;
SELECT * FROM products WHERE product_id = 42 FOR UPDATE;
-- ... compute new values in application ...
UPDATE products SET stock = stock - 1 WHERE product_id = 42;
COMMIT;

-- OPTIMISTIC LOCKING: use a version number, detect conflicts at write time
-- Use when: conflicts are rare, or you want maximum concurrency

-- Table has a "version" column
-- Step 1: Read the current version
SELECT product_id, stock, version FROM products WHERE product_id = 42;
-- Returns: stock=10, version=5

-- Step 2: Update with version check
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE product_id = 42 AND version = 5;

-- Step 3: Check if the update affected any rows
-- If 0 rows affected, someone else modified the row — retry!

-- Alternative: use updated_at timestamp instead of version number
UPDATE products
SET stock = stock - 1, updated_at = NOW()
WHERE product_id = 42
  AND updated_at = '2025-06-15 10:30:00';
\`\`\`

> **Role connection:** Every backend developer needs to understand locking. The difference between a system that handles 100 concurrent users and one that handles 10,000 often comes down to locking strategy. Pessimistic locking is simpler but creates contention. Optimistic locking scales better but requires retry logic.

### EXERCISE: Locking & Concurrency

\`\`\`sql
-- EXERCISE:
-- 1. Implement a job queue using SELECT ... FOR UPDATE SKIP LOCKED
-- 2. Demonstrate a deadlock scenario and fix it with consistent lock ordering
-- 3. Implement optimistic locking for a shopping cart checkout that
--    decrements product stock
-- 4. Use advisory locks to prevent duplicate cron job execution
\`\`\`

---

## 5. Performance Tuning

### Connection Pooling

\`\`\`sql
-- PostgreSQL creates a new process for each connection.
-- Without pooling, opening 500 connections = 500 OS processes.
-- Each process uses ~5-10MB of memory.

-- PgBouncer configuration (pgbouncer.ini):
-- [databases]
-- myapp = host=localhost port=5432 dbname=myapp
--
-- [pgbouncer]
-- listen_port = 6432
-- pool_mode = transaction  -- Most common: connection returned after each transaction
-- max_client_conn = 1000   -- Accept up to 1000 client connections
-- default_pool_size = 20   -- But only 20 actual database connections

-- Pool modes:
-- session:      Connection dedicated to client for the session (safest)
-- transaction:  Connection returned to pool after each transaction (most efficient)
-- statement:    Connection returned after each statement (most aggressive, limited use)

-- Check connection usage
SELECT
    state,
    COUNT(*) AS connections,
    MAX(NOW() - state_change) AS longest_duration
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY state;

-- Kill idle connections that have been idle too long
-- (better handled by pooler, but useful in emergencies)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle'
  AND state_change < NOW() - INTERVAL '1 hour'
  AND pid != pg_backend_pid();
\`\`\`

### Query Plan Caching (Prepared Statements)

\`\`\`sql
-- Prepared statements cache the query plan, avoiding re-planning overhead

-- Create a prepared statement
PREPARE get_customer_orders(INTEGER) AS
SELECT order_id, order_date, total
FROM orders
WHERE customer_id = $1
ORDER BY order_date DESC;

-- Execute it multiple times (plan is cached)
EXECUTE get_customer_orders(100);
EXECUTE get_customer_orders(200);

-- After 5 executions, PostgreSQL generates a "generic" plan
-- if it is not significantly worse than custom plans

-- Deallocate
DEALLOCATE get_customer_orders;

-- In application code, most ORMs and database drivers handle
-- prepared statements automatically. E.g., in Python with psycopg2:
-- cursor.execute("SELECT * FROM orders WHERE customer_id = %s", (100,))
\`\`\`

### Bulk Operations

\`\`\`sql
-- COPY is the fastest way to bulk load/export data

-- Load data from a CSV file
COPY products (product_name, category, price, stock_quantity)
FROM '/tmp/products.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- Export data to CSV
COPY (SELECT * FROM orders WHERE order_date >= '2025-01-01')
TO '/tmp/orders_2025.csv'
WITH (FORMAT csv, HEADER true);

-- From application code, use COPY protocol (e.g., psycopg2.copy_from)
-- This is 10-100x faster than individual INSERTs

-- Bulk insert optimization: disable indexes, then rebuild
BEGIN;
ALTER TABLE large_import_table DISABLE TRIGGER ALL;
-- ... COPY or bulk INSERT ...
ALTER TABLE large_import_table ENABLE TRIGGER ALL;
COMMIT;

REINDEX TABLE large_import_table;
ANALYZE large_import_table;

-- Batch updates (better than updating one row at a time)
UPDATE products
SET price = new_prices.price
FROM (
    VALUES
        (1, 29.99),
        (2, 39.99),
        (3, 49.99)
) AS new_prices(product_id, price)
WHERE products.product_id = new_prices.product_id;
\`\`\`

### VACUUM

\`\`\`sql
-- VACUUM reclaims space from dead tuples (old row versions from MVCC)

-- Standard VACUUM: marks dead tuple space as reusable, does not shrink file
VACUUM orders;

-- VACUUM ANALYZE: reclaim space AND update statistics
VACUUM ANALYZE orders;

-- VACUUM FULL: rewrites the entire table, reclaims disk space
-- WARNING: acquires ACCESS EXCLUSIVE lock (blocks everything)
VACUUM FULL orders;

-- Monitor vacuum needs
SELECT
    relname,
    n_live_tup,
    n_dead_tup,
    ROUND(n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100, 2) AS dead_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Autovacuum tuning (per-table settings)
ALTER TABLE high_churn_table SET (
    autovacuum_vacuum_scale_factor = 0.05,   -- Vacuum when 5% dead (default: 20%)
    autovacuum_analyze_scale_factor = 0.02,  -- Analyze when 2% changed
    autovacuum_vacuum_cost_delay = 10        -- Less aggressive throttling
);
\`\`\`

### pg_stat_statements

\`\`\`sql
-- pg_stat_statements tracks execution statistics for all SQL queries
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find the slowest queries by total time
SELECT
    LEFT(query, 100) AS query_preview,
    calls,
    ROUND(total_exec_time::numeric, 2) AS total_ms,
    ROUND(mean_exec_time::numeric, 2) AS avg_ms,
    ROUND(stddev_exec_time::numeric, 2) AS stddev_ms,
    rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Find queries with the most I/O
SELECT
    LEFT(query, 100) AS query_preview,
    calls,
    shared_blks_hit,
    shared_blks_read,
    ROUND(
        shared_blks_hit::numeric /
        NULLIF(shared_blks_hit + shared_blks_read, 0) * 100, 2
    ) AS cache_hit_pct
FROM pg_stat_statements
ORDER BY shared_blks_read DESC
LIMIT 20;

-- Reset statistics
SELECT pg_stat_statements_reset();
\`\`\`

**Why it matters:** Performance tuning is the difference between a database that costs $100/month and one that costs $10,000/month. Connection pooling, COPY for bulk operations, proper VACUUM, and pg_stat_statements are the tools that keep production databases healthy.

### EXERCISE: Performance Tuning

\`\`\`sql
-- EXERCISE:
-- 1. Set up pg_stat_statements and identify the top 5 slowest
--    queries in your application
-- 2. Implement COPY-based data import and compare performance
--    to individual INSERTs (try 100,000 rows)
-- 3. Check your tables for autovacuum configuration and dead tuple
--    ratios. Tune a high-churn table.
-- 4. Set up PgBouncer in transaction mode and measure the difference
--    in max connections your application can handle.
\`\`\`

---

## 6. Migration Strategies

### Zero-Downtime Migrations

The key principle: every migration step must be backward-compatible with the currently running application code. This is the "expand and contract" pattern.

\`\`\`sql
-- BAD: Renaming a column in one step (breaks existing application code)
ALTER TABLE users RENAME COLUMN name TO full_name;  -- Instant downtime!

-- GOOD: Expand and contract pattern (3 deployments)

-- Step 1 (Migration): Add new column
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

-- Step 2 (Migration): Backfill data
UPDATE users SET full_name = name WHERE full_name IS NULL;

-- Step 3 (Code deploy): Application writes to BOTH columns
-- Application reads from full_name (falling back to name)

-- Step 4 (Migration): Add NOT NULL constraint once backfill is complete
ALTER TABLE users ALTER COLUMN full_name SET NOT NULL;

-- Step 5 (Code deploy): Application only uses full_name

-- Step 6 (Migration): Drop old column
ALTER TABLE users DROP COLUMN name;
\`\`\`

### Safe Schema Changes

\`\`\`sql
-- Adding a column with a default (PostgreSQL 11+: instant, no table rewrite)
ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT false;

-- Adding a NOT NULL column safely
-- Step 1: Add nullable column
ALTER TABLE orders ADD COLUMN processed_at TIMESTAMP;
-- Step 2: Backfill in batches
UPDATE orders SET processed_at = completed_at
WHERE processed_at IS NULL AND order_id BETWEEN 1 AND 100000;
-- Repeat for all batches...
-- Step 3: Add constraint
ALTER TABLE orders ALTER COLUMN processed_at SET NOT NULL;

-- Creating an index without blocking writes
CREATE INDEX CONCURRENTLY idx_orders_customer ON orders (customer_id);
-- CONCURRENTLY: does not lock the table for writes
-- Trade-off: takes longer, runs in its own transaction, can fail and
-- leave an INVALID index that you must DROP and recreate

-- Check for invalid indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE indexname IN (
    SELECT indexrelid::regclass::text
    FROM pg_index
    WHERE NOT indisvalid
);

-- Adding a foreign key without blocking
-- Step 1: Add constraint as NOT VALID (instant, does not check existing rows)
ALTER TABLE orders ADD CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    NOT VALID;
-- Step 2: Validate existing rows in background (takes ShareUpdateExclusiveLock)
ALTER TABLE orders VALIDATE CONSTRAINT fk_orders_customer;
\`\`\`

### Backfill Patterns

\`\`\`sql
-- Batched backfill to avoid long-running transactions
DO $$
DECLARE
    batch_start INTEGER := 0;
    batch_size INTEGER := 10000;
    affected INTEGER;
BEGIN
    LOOP
        UPDATE orders
        SET normalized_email = LOWER(email)
        WHERE order_id > batch_start
          AND order_id <= batch_start + batch_size
          AND normalized_email IS NULL;

        GET DIAGNOSTICS affected = ROW_COUNT;

        -- Commit each batch (in a procedure) or give MVCC a break
        PERFORM pg_sleep(0.1);  -- Let autovacuum breathe

        batch_start := batch_start + batch_size;
        EXIT WHEN affected = 0;
    END LOOP;
END $$;

-- Backfill with progress tracking
CREATE TABLE migration_progress (
    migration_name VARCHAR(100) PRIMARY KEY,
    last_processed_id BIGINT DEFAULT 0,
    total_processed BIGINT DEFAULT 0,
    started_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Migration Tools

\`\`\`sql
-- Flyway (Java ecosystem)
-- Migrations are versioned SQL files: V1__create_users.sql, V2__add_email.sql
-- Flyway tracks which migrations have been applied in a schema_history table

-- Alembic (Python/SQLAlchemy ecosystem)
-- Migrations are Python files with upgrade() and downgrade() functions
-- Tracks state in an alembic_version table

-- Liquibase (XML/YAML/SQL changesets)
-- Supports multiple database vendors
-- Tracks state in DATABASECHANGELOG table

-- Rails Migrations (Ruby on Rails)
-- Ruby files with up/down methods
-- Tracks state in schema_migrations table

-- General best practices:
-- 1. Every migration must be idempotent (safe to run twice)
-- 2. Never edit a migration that has been applied to production
-- 3. Separate schema changes from data migrations
-- 4. Test migrations against a copy of production data
-- 5. Have a rollback plan for every migration
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Expand and Contract Pattern"
        E1["Step 1: Expand<br/>Add new column/table"]
        E2["Step 2: Migrate<br/>Backfill data"]
        E3["Step 3: Transition<br/>Code uses both old and new"]
        E4["Step 4: Contract<br/>Remove old column/table"]
    end
    E1 --> E2 --> E3 --> E4
    E1 -.->|"Backward compatible"| E2
    E2 -.->|"Backward compatible"| E3
    E3 -.->|"Backward compatible"| E4
\`\`\`

> **Role connection:** Migration strategy is one of the most critical skills for senior backend developers and platform engineers. A botched migration can cause extended downtime, data loss, or corruption. The expand/contract pattern should be second nature.

### EXERCISE: Migration Strategies

\`\`\`sql
-- EXERCISE:
-- 1. Design a zero-downtime migration to split a "name" column into
--    "first_name" and "last_name" columns
-- 2. Write a batched backfill script with progress tracking
-- 3. Create an index concurrently on a large table and handle the
--    scenario where it fails partway through
-- 4. Add a foreign key constraint to an existing table with
--    millions of rows without blocking writes
\`\`\`

---

## 7. Advanced Patterns

### Temporal Tables (System-Versioned)

Temporal tables track the history of every row change, enabling "time travel" queries.

\`\`\`sql
-- Manual temporal table pattern (works in any PostgreSQL version)
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price        DECIMAL(10, 2) NOT NULL,
    valid_from   TIMESTAMP NOT NULL DEFAULT NOW(),
    valid_to     TIMESTAMP NOT NULL DEFAULT 'infinity'
);

-- Current products view
CREATE VIEW products_current AS
SELECT * FROM products
WHERE valid_to = 'infinity';

-- "Close" the old record and insert a new one on update
CREATE OR REPLACE FUNCTION products_update_temporal()
RETURNS TRIGGER AS $$
BEGIN
    -- Close the old version
    UPDATE products
    SET valid_to = NOW()
    WHERE product_id = OLD.product_id AND valid_to = 'infinity';

    -- Insert the new version
    INSERT INTO products (product_id, product_name, price, valid_from, valid_to)
    VALUES (OLD.product_id, NEW.product_name, NEW.price, NOW(), 'infinity');

    RETURN NULL;  -- Prevent the original UPDATE
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_temporal
INSTEAD OF UPDATE ON products_current
FOR EACH ROW
EXECUTE FUNCTION products_update_temporal();

-- Time travel query: what was the price on a specific date?
SELECT * FROM products
WHERE product_id = 42
  AND valid_from <= '2025-03-15'
  AND valid_to > '2025-03-15';

-- Full history of a product
SELECT * FROM products
WHERE product_id = 42
ORDER BY valid_from;
\`\`\`

### Soft Deletes

\`\`\`sql
-- Soft delete: mark rows as deleted instead of removing them
CREATE TABLE users (
    user_id     SERIAL PRIMARY KEY,
    username    VARCHAR(50) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    deleted_at  TIMESTAMP,
    deleted_by  INTEGER
);

-- Partial index for fast "active only" queries
CREATE INDEX idx_users_active_email ON users (email)
WHERE deleted_at IS NULL;

-- Partial unique constraint (unique email only among active users)
CREATE UNIQUE INDEX idx_users_unique_email ON users (email)
WHERE deleted_at IS NULL;

-- View for active users
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;

-- Soft delete operation
UPDATE users
SET deleted_at = NOW(), deleted_by = current_user_id()
WHERE user_id = 42;

-- Restore a soft-deleted user
UPDATE users
SET deleted_at = NULL, deleted_by = NULL
WHERE user_id = 42;

-- Row-Level Security to automatically filter soft-deleted rows
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY active_users_only ON users
    FOR SELECT
    USING (deleted_at IS NULL);
-- Now all SELECT queries automatically exclude soft-deleted users
-- (unless the role has BYPASSRLS)
\`\`\`

### Audit Logging

\`\`\`sql
-- Generic audit log table
CREATE TABLE audit_log (
    audit_id     BIGSERIAL PRIMARY KEY,
    table_name   VARCHAR(100) NOT NULL,
    record_id    TEXT NOT NULL,
    action       VARCHAR(10) NOT NULL,  -- INSERT, UPDATE, DELETE
    old_data     JSONB,
    new_data     JSONB,
    changed_by   VARCHAR(100) DEFAULT current_user,
    changed_at   TIMESTAMP DEFAULT NOW(),
    ip_address   INET
);

CREATE INDEX idx_audit_table_record ON audit_log (table_name, record_id);
CREATE INDEX idx_audit_changed_at ON audit_log (changed_at);

-- Generic audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_data)
        VALUES (TG_TABLE_NAME, NEW.id::TEXT, 'INSERT', to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_data, new_data)
        VALUES (TG_TABLE_NAME, OLD.id::TEXT, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_data)
        VALUES (TG_TABLE_NAME, OLD.id::TEXT, 'DELETE', to_jsonb(OLD));
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Attach audit logging to any table
CREATE TRIGGER trg_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER trg_users_audit
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Query the audit log
SELECT * FROM audit_log
WHERE table_name = 'orders' AND record_id = '12345'
ORDER BY changed_at DESC;

-- Find all changes by a specific user
SELECT * FROM audit_log
WHERE changed_by = 'admin_user'
  AND changed_at >= NOW() - INTERVAL '24 hours'
ORDER BY changed_at DESC;
\`\`\`

### JSONB Operations

\`\`\`sql
-- JSONB is a powerful semi-structured data type in PostgreSQL

-- Insert JSONB data
INSERT INTO events (event_type, payload)
VALUES ('user_signup', '{
    "user_id": 42,
    "email": "user@example.com",
    "source": "google_ads",
    "metadata": {
        "campaign_id": "summer2025",
        "utm_params": {"source": "google", "medium": "cpc"}
    }
}'::jsonb);

-- Access nested fields
SELECT
    payload->>'user_id' AS user_id,                    -- Text
    (payload->>'user_id')::INTEGER AS user_id_int,     -- Cast to int
    payload->'metadata'->>'campaign_id' AS campaign,   -- Nested access
    payload->'metadata'->'utm_params' AS utm,          -- Returns JSONB
    payload #>> '{metadata,utm_params,source}' AS utm_source  -- Path access
FROM events;

-- JSONB containment (@>) with GIN index
CREATE INDEX idx_events_payload ON events USING gin (payload);

SELECT * FROM events
WHERE payload @> '{"source": "google_ads"}';

-- JSONB modification
UPDATE events
SET payload = payload || '{"processed": true}'::jsonb
WHERE event_id = 1;

-- Remove a key
UPDATE events
SET payload = payload - 'temporary_field'
WHERE event_id = 1;

-- Set a nested value
UPDATE events
SET payload = jsonb_set(payload, '{metadata,processed_at}', '"2025-06-15T10:00:00Z"')
WHERE event_id = 1;

-- Aggregate JSONB
SELECT
    payload->>'source' AS source,
    COUNT(*) AS event_count,
    jsonb_agg(DISTINCT payload->>'event_type') AS event_types
FROM events
GROUP BY payload->>'source';

-- Expand JSONB array to rows
SELECT
    event_id,
    jsonb_array_elements_text(payload->'tags') AS tag
FROM events
WHERE payload ? 'tags';
\`\`\`

### Full-Text Search

\`\`\`sql
-- Full-text search in PostgreSQL

-- Add tsvector column and index
ALTER TABLE articles ADD COLUMN search_vector tsvector;

UPDATE articles
SET search_vector = to_tsvector('english',
    COALESCE(title, '') || ' ' ||
    COALESCE(body, '') || ' ' ||
    COALESCE(author_name, '')
);

CREATE INDEX idx_articles_search ON articles USING gin (search_vector);

-- Keep the vector updated via trigger
CREATE OR REPLACE FUNCTION articles_search_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english',
        COALESCE(NEW.title, '') || ' ' ||
        COALESCE(NEW.body, '') || ' ' ||
        COALESCE(NEW.author_name, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_search
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION articles_search_trigger();

-- Search with ranking
SELECT
    title,
    ts_rank(search_vector, query) AS rank,
    ts_headline('english', body, query,
        'StartSel=<mark>, StopSel=</mark>, MaxFragments=3'
    ) AS snippet
FROM articles,
     to_tsquery('english', 'postgresql & performance & tuning') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;

-- Phrase search
SELECT * FROM articles
WHERE search_vector @@ phraseto_tsquery('english', 'database performance');

-- Weighted search (title matches matter more)
ALTER TABLE articles ADD COLUMN weighted_search tsvector;

UPDATE articles
SET weighted_search =
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(body, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(author_name, '')), 'C');

CREATE INDEX idx_articles_weighted_search ON articles USING gin (weighted_search);
\`\`\`

\`\`\`mermaid
flowchart TD
    subgraph "Advanced SQL Patterns"
        T["Temporal Tables<br/>Track history of changes"]
        SD["Soft Deletes<br/>Reversible deletions"]
        AL["Audit Logging<br/>Who changed what, when"]
        J["JSONB Operations<br/>Semi-structured data"]
        FTS["Full-Text Search<br/>Ranked document search"]
    end
    T -.->|"Time travel queries"| AL
    SD -.->|"Compliance and recovery"| AL
    J -.->|"Flexible schemas"| FTS
\`\`\`

**Why it matters:** These patterns appear in virtually every production system. Audit logging is often legally required (GDPR, SOX, HIPAA). Soft deletes prevent accidental data loss and enable undo functionality. JSONB gives you schema flexibility where you need it. Full-text search saves you from deploying Elasticsearch for simpler search requirements.

### EXERCISE: Advanced Patterns

\`\`\`sql
-- EXERCISE:
-- 1. Implement a temporal table for products with time-travel query support
-- 2. Add audit logging to your orders table and query "who changed
--    order #12345 in the last 7 days"
-- 3. Store user preferences as JSONB and write queries to:
--    a. Find users with a specific preference set
--    b. Update a nested preference value
--    c. Aggregate preferences across all users
-- 4. Implement full-text search for a blog with weighted ranking
--    (title 3x, body 1x, tags 2x)
-- 5. Design a soft-delete system with Row-Level Security that
--    automatically hides deleted records
\`\`\`

---

## Summary — Senior Level

You now have deep expertise in SQL performance, architecture, and advanced patterns:
- **Execution plans** — reading and interpreting scan types, join algorithms, and cost estimates
- **Index internals** — B-tree, hash, GIN, GiST, partial, expression, and covering indexes
- **Partitioning** — range, list, and hash partitioning with pruning and maintenance
- **Locking and concurrency** — row locks, table locks, advisory locks, MVCC, optimistic vs pessimistic
- **Performance tuning** — connection pooling, COPY, VACUUM, pg_stat_statements
- **Migration strategies** — zero-downtime changes, expand/contract, backfilling, safe DDL
- **Advanced patterns** — temporal tables, soft deletes, audit logging, JSONB, full-text search

These are the skills that enable you to design, maintain, and scale production database systems that handle millions of transactions per day.

---

## Recommended Videos — Senior Level

- **Kai Sassnowski** — "Things every developer absolutely, positively needs to know about database indexing" — https://www.youtube.com/watch?v=HubezKbFL7E
`,
}
